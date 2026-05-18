/**
 * YouYou Toolkit - 填表更新服务（Orchestrator 角色）
 *
 * 议题 #15 #8 整理（v1.0.193 完成）：
 *   本文件即对应 shujuku update-orchestrator.ts 的 youyou 实现，编排填表主链的
 *   7 步（buildBatchMergeBase → loadBatchBaseData → prepareAIInput → callAI →
 *   parseTableEdits → applyEdits → writeback+sync）。功能已全部对齐 shujuku，
 *   未做物理文件改名以避免破坏 3 个外部 import 路径。
 *
 * 主要导出：
 *   - runManualTableUpdate：手动填表入口（"立即填表" / "重填" 按钮）
 *   - runAutoTableUpdate：自动填表入口（automation 链路）
 *   - applyIncrementalEdits / buildRequest：内部步骤（独立可测）
 *
 * 关键步骤实现位置（按上述 7 步顺序）：
 *   1. buildBatchMergeBase   — scopeTables 合并 (templateTables + tableEnabledOverrides)
 *   2. loadBatchBaseData     — loadBoundStateOrTemplate (history-service 倒序遍历)
 *   3. prepareAIInput        — buildRequest / formatTableGuidance / formatScopeGuidance
 *   4. callAI                — provider.sendRequest（3 次重试 + 5s 退避 + tableEdit 缺失门控）
 *   5. parseTableEdits       — sanitizeAIResponse (parseIncrementalEdits + parseFullReplacement)
 *   6. applyEdits            — applyIncrementalEdits (按 AI 原始顺序 + 列 key 位置映射)
 *   7. writeback+sync        — writeTableState (commitBoundState + worldbook-sync)
 *
 * 重填三段式（议题 #15 #23 / C1/C2 修复）：
 *   clearStateAtMessageIndex → loadBoundStateOrTemplate 自动重读 → refreshData
 */

import { buildExecutionContextForLatestAssistant, buildExecutionContextForMessage } from '../tool-execution-context.js';
import { contextInjector } from '../context-injector.js';
import { hasEffectiveApiPreset, sendApiRequest, sendWithPreset } from '../api-connection.js';
import { toolPromptService } from '../tool-prompt-service.js';
import { logger } from '../core/logger-service.js';
import {
  cloneTableValue,
  TABLE_RUN_SOURCES,
  TABLE_EDIT_OPERATIONS,
  createRuntimeTableRowId,
  ensureTableId,
  ensureTableRowId
} from './table-types.js';
import { resolveTableTargetFromExecutionContext } from './table-target-resolver.js';
import {
  getAssistantTableSnapshot,
  loadBoundStateOrTemplate,
  recordResolvedTarget,
  clearStateAtMessageIndex
} from './table-state-service.js';
import {
  buildTableWorkbenchToolConfig,
  getTableWorkbenchConfig,
  normalizeTableWorkbenchConfig,
  updateTableWorkbenchRuntime,
  validateTableWorkbenchConfig,
  validateTableDraftDeep,
  TABLE_WORKBENCH_RUNTIME_STATUS
} from './table-schema-service.js';
import { writeTableState } from './table-writeback-service.js';
import { sanitizeAIResponse } from './table-json-sanitizer.js';
import { computeTableDiff } from './table-diff-service.js';
import { resolveTableRunScope } from './table-scope-service.js';
import { getTableProvider } from './table-provider-service.js';
import { getLocks, isLocked, isRowLocked } from './table-lock-service.js';
import { resolveActiveTemplate } from './table-template-service.js';
import { buildSelectedWorldbookContent } from '../tool-worldbook-service.js';
import { extractTagContent, getTagRules, getContentBlacklist } from '../regex-extractor.js';
import regexPresetStore from '../regex-preset-store.js';

function getLog() {
  return logger.createScope('TableUpdate');
}

// ════════════════════════════════════════════════════════════════
// 议题 #15 §B 重试常量 + sleepWithAbort
// shujuku update-orchestrator 风格：3 次重试 + 5s 退避 + abort 中途退出
// ════════════════════════════════════════════════════════════════

const CALL_AI_MAX_RETRIES = 3;
const CALL_AI_RETRY_DELAY_MS = 5000;

function sleepWithAbort(ms, abortSignal) {
  return new Promise((resolve) => {
    if (abortSignal?.aborted) { resolve(false); return; }
    let timer;
    const onAbort = () => {
      clearTimeout(timer);
      try { abortSignal?.removeEventListener?.('abort', onAbort); } catch (_) {}
      resolve(false);
    };
    timer = setTimeout(() => {
      try { abortSignal?.removeEventListener?.('abort', onAbort); } catch (_) {}
      resolve(true);
    }, ms);
    try { abortSignal?.addEventListener?.('abort', onAbort); } catch (_) {}
  });
}

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function formatRecentMessages(messages = [], limit = 8, roles = 'all') {
  if (!Array.isArray(messages) || messages.length === 0) return '';
  const filtered = roles === 'assistant_only'
    ? messages.filter(m => m?.role === 'assistant')
    : messages;
  return filtered
    .slice(Math.max(filtered.length - limit, 0))
    .map((message) => `[${normalizeString(message?.role, 'unknown')}] ${String(message?.content || '').trim()}`)
    .filter(Boolean)
    .join('\n\n');
}

function applyContextExtractionRules(text, { extractTags = [], useGlobalRules = false, regexPresetId = '' } = {}) {
  if (!text) return text;
  const hasCustomTags = Array.isArray(extractTags) && extractTags.length > 0;
  const hasPreset = typeof regexPresetId === 'string' && regexPresetId.trim().length > 0;
  if (!hasCustomTags && !useGlobalRules && !hasPreset) return text;
  try {
    let rules = [];
    let blacklist = [];

    // v1.0.197 修复：接入 extraction.regexPresetId（之前完全没读，工作台切预设无效）
    if (hasPreset) {
      try {
        const preset = regexPresetStore.getPreset(regexPresetId);
        if (preset) {
          const presetRules = Array.isArray(preset.rules)
            ? preset.rules.filter((r) => r && r.enabled !== false && r.value)
            : [];
          rules.push(...presetRules);
          if (Array.isArray(preset.blacklist)) {
            blacklist.push(...preset.blacklist
              .map((s) => String(s || '').trim())
              .filter(Boolean));
          }
        } else {
          getLog().warn('applyContextExtractionRules: 找不到正则预设', { regexPresetId });
        }
      } catch (err) {
        getLog().warn('applyContextExtractionRules: 加载正则预设失败', err);
      }
    }

    if (hasCustomTags) {
      rules.push(...extractTags.map((tag) => {
        const t = String(tag || '').trim();
        if (t.startsWith('regex:')) {
          return { type: 'regex_include', value: t.slice(6).trim(), enabled: true };
        }
        return { type: 'include', value: t, enabled: true };
      }).filter((r) => r.value));
    }

    if (useGlobalRules) {
      const globalRules = getTagRules() || [];
      rules = [...rules, ...globalRules.filter((r) => r?.enabled)];
      blacklist = [...blacklist, ...(getContentBlacklist() || [])];
    }

    if (rules.length === 0 && blacklist.length === 0) return text;
    return extractTagContent(text, rules, blacklist) || text;
  } catch (e) {
    getLog().warn('applyContextExtractionRules 失败，回退原始文本', e);
    return text;
  }
}

function buildSendLatestRowsTables(tables = [], sendLatestRows = -1) {
  if (!Number.isFinite(sendLatestRows) || sendLatestRows < 0) return tables;
  return tables.map(table => {
    const rows = Array.isArray(table?.rows) ? table.rows : [];
    if (sendLatestRows === 0 || rows.length <= sendLatestRows) return table;
    return { ...table, rows: rows.slice(rows.length - sendLatestRows) };
  });
}

function formatTableGuidance(tables = []) {
  if (!Array.isArray(tables) || tables.length === 0) return '';
  return tables.map((table, tableIndex) => {
    const instructions = table?.aiInstructions && typeof table.aiInstructions === 'object'
      ? table.aiInstructions
      : {};
    const columns = Array.isArray(table?.columns) ? table.columns : [];
    const lines = [
      `表 ${tableIndex}: ${normalizeString(table?.name, `表${tableIndex + 1}`)}`,
      `表格说明: ${normalizeString(table?.note, '无')}`,
      `初始化说明: ${normalizeString(instructions.init, '无')}`,
      `新增说明: ${normalizeString(instructions.create, '无')}`,
      `更新说明: ${normalizeString(instructions.update, '无')}`,
      `删除说明: ${normalizeString(instructions.delete, '无')}`,
      '字段（请用列索引作为 data key）:'
    ];
    // 议题 #15 Bug #33-E：改为 [idx]: title — description 形式，
    //   不再显示 column.key（避免 AI 用语义 key 而绕过位置映射）
    columns.forEach((column, columnIndex) => {
      lines.push(`- [${columnIndex}]: ${normalizeString(column?.title || column?.key, '未命名字段')} — ${normalizeString(column?.description, '无')}`);
    });
    return lines.join('\n');
  }).join('\n\n');
}

function formatScopeGuidance(runScope, tables = []) {
  if (!runScope || !Array.isArray(tables) || tables.length === 0) return '';
  const lines = tables.map((table, tableIndex) => {
    const tableName = normalizeString(table?.name, `表${tableIndex + 1}`);
    const editable = runScope.includes(table, tableIndex);
    return `表 ${tableIndex}: ${tableName} - ${editable ? '允许编辑' : '只读，禁止修改'}`;
  });
  const hasReadonly = tables.some((table, tableIndex) => !runScope.includes(table, tableIndex));
  if (hasReadonly) {
    lines.push('');
    lines.push('【重要约束】标记为"只读"的表格，你必须在输出中原样保留其所有行数据，不得新增、修改或删除任何行。');
    lines.push('全量输出时，只读表格的 rows 必须与输入中的完全一致。');
  }
  return lines.join('\n');
}

function normalizeRuntimeRow(row = {}, rowIndex = 0, columns = []) {
  const source = row && typeof row === 'object' ? row : {};
  const sourceCells = source.cells && typeof source.cells === 'object' && !Array.isArray(source.cells)
    ? source.cells
    : {};
  const normalizedCells = {};
  const columnKeys = Array.isArray(columns)
    ? columns.map((column) => normalizeString(column?.key, '')).filter(Boolean)
    : [];
  const allKeys = new Set([...Object.keys(sourceCells), ...columnKeys]);

  allKeys.forEach((key) => {
    normalizedCells[key] = normalizeString(sourceCells[key], '');
  });

  return {
    ...source,
    id: ensureTableRowId(source.id || source.rowId, rowIndex),
    name: normalizeString(source.name, ''),
    cells: normalizedCells
  };
}

function normalizeRuntimeTable(table = {}, tableIndex = 0) {
  const source = table && typeof table === 'object' ? table : {};
  const columns = Array.isArray(source.columns) ? cloneTableValue(source.columns) : [];
  const rows = Array.isArray(source.rows)
    ? source.rows.map((row, rowIndex) => normalizeRuntimeRow(row, rowIndex, columns))
    : [];

  return {
    ...source,
    id: ensureTableId(source.id || source.key, tableIndex),
    rows
  };
}

function normalizeRuntimeTables(tables = []) {
  return Array.isArray(tables)
    ? tables.map((table, tableIndex) => normalizeRuntimeTable(table, tableIndex))
    : [];
}

function mergeTablesByScope(baseTables = [], scopedTables = [], runScope) {
  const normalizedBase = normalizeRuntimeTables(baseTables);
  const normalizedScoped = normalizeRuntimeTables(scopedTables);
  if (!runScope) return normalizedScoped;

  const scopedById = new Map(
    normalizedScoped.map((table, tableIndex) => [ensureTableId(table?.id || table?.key, tableIndex), table])
  );

  const allowedScoped = normalizedBase
    .map((table, tableIndex) => ({ table, tableIndex, id: ensureTableId(table?.id || table?.key, tableIndex) }))
    .filter(({ table, tableIndex }) => runScope.includes(table, tableIndex));

  const usedScopedIds = new Set();
  const scopedByPosition = new Map();

  for (let si = 0; si < normalizedScoped.length; si++) {
    const st = normalizedScoped[si];
    const stId = ensureTableId(st?.id || st?.key, si);
    if (scopedById.has(stId)) {
      scopedByPosition.set(stId, st);
      usedScopedIds.add(stId);
    }
  }

  let positionFallbackIndex = 0;
  const unusedScoped = normalizedScoped.filter((st, si) => {
    const stId = ensureTableId(st?.id || st?.key, si);
    return !usedScopedIds.has(stId);
  });

  return normalizedBase.map((table, tableIndex) => {
    const id = ensureTableId(table?.id || table?.key, tableIndex);
    if (!runScope.includes(table, tableIndex)) {
      return normalizeRuntimeTable(table, tableIndex);
    }
    const nextTable = scopedByPosition.get(id);
    if (nextTable) return normalizeRuntimeTable(nextTable, tableIndex);

    const fallback = unusedScoped[positionFallbackIndex];
    if (fallback) {
      positionFallbackIndex++;
      return normalizeRuntimeTable({ ...fallback, id: table.id || fallback.id }, tableIndex);
    }
    return normalizeRuntimeTable(table, tableIndex);
  });
}

function filterIncrementalEditsByScope(edits = [], tables = [], runScope, locks = {}) {
  if (!Array.isArray(edits) || !runScope) return { edits: [], stats: { total: 0, passed: 0, droppedByScope: 0, droppedByLock: 0 } };
  const normalizedTables = normalizeRuntimeTables(tables);
  const filtered = [];
  let droppedByScope = 0;
  let droppedByLock = 0;

  for (const edit of edits) {
    const ti = Number.isFinite(edit?.tableIndex) ? edit.tableIndex : -1;
    if (ti < 0 || ti >= normalizedTables.length) { droppedByScope++; continue; }
    const table = normalizedTables[ti];
    if (!runScope.includes(table, ti)) { droppedByScope++; continue; }

    if (edit.op === TABLE_EDIT_OPERATIONS.INSERT_ROW) {
      filtered.push(edit);
      continue;
    }

    const ri = Number.isFinite(edit?.rowIndex) ? edit.rowIndex : -1;
    if (ri < 0 || ri >= (Array.isArray(table?.rows) ? table.rows.length : 0)) { droppedByScope++; continue; }

    if (edit.op === TABLE_EDIT_OPERATIONS.DELETE_ROW) {
      if (isRowLocked(locks, ti, ri)) { droppedByLock++; continue; }
      filtered.push(edit);
      continue;
    }

    filtered.push(edit);
  }

  return {
    edits: filtered,
    stats: { total: edits.length, passed: filtered.length, droppedByScope, droppedByLock }
  };
}

function buildScopedRequestTables(tables = [], runScope) {
  const normalizedTables = normalizeRuntimeTables(tables);
  if (!runScope) return normalizedTables;

  return normalizedTables.map((table, tableIndex) => {
    const columns = Array.isArray(table?.columns) ? table.columns : [];
    if (runScope.includes(table, tableIndex)) {
      return {
        ...normalizeRuntimeTable(table, tableIndex),
        scopeEditable: true,
        scopeStatus: 'editable'
      };
    }

    return {
      ...normalizeRuntimeTable(table, tableIndex),
      scopeEditable: false,
      scopeStatus: 'readonly',
      rows: Array.isArray(table?.rows)
        ? table.rows.map((row, rowIndex) => normalizeRuntimeRow(row, rowIndex, columns))
        : []
    };
  });
}

function buildRequestPayload(targetSnapshot, loadResult, runScope) {
  return {
    target: {
      sourceMessageId: normalizeString(targetSnapshot?.sourceMessageId),
      sourceSwipeId: normalizeString(targetSnapshot?.sourceSwipeId || targetSnapshot?.effectiveSwipeId),
      slotBindingKey: normalizeString(targetSnapshot?.slotBindingKey),
      slotRevisionKey: normalizeString(targetSnapshot?.slotRevisionKey),
      slotTransactionId: normalizeString(targetSnapshot?.slotTransactionId)
    },
    loadMode: normalizeString(loadResult?.loadMode),
    mergeBaseOnly: loadResult?.mergeBaseOnly === true,
    resolvedFromMessageId: normalizeString(loadResult?.resolvedFromMessageId),
    resolvedFromRevisionKey: normalizeString(loadResult?.resolvedFromRevisionKey),
    sourceKind: normalizeString(loadResult?.sourceKind || loadResult?.state?.meta?.sourceKind),
    scope: typeof runScope?.toJSON === 'function' ? runScope.toJSON() : null,
    tables: buildScopedRequestTables(loadResult?.state?.tables, runScope)
  };
}

const INCREMENTAL_PROMPT_SUFFIX = `

【表格编辑指令格式】
请使用 <tableEdit> 标签返回对表格的修改，支持三种操作：

1. 插入新行：insertRow(表索引, {"列索引": "值", ...})
2. 更新现有行：updateRow(表索引, 行索引, {"列索引": "新值", ...})
3. 删除行：deleteRow(表索引, 行索引)

约定：
- 表索引、行索引、列索引都从 0 开始（行索引不含表头行）
- data 对象的键统一用列索引字符串（"0"、"1"、"2" ...），不要用列名
- updateRow 只列要改的列，未提及的列保留原值
- 一次可以包含多个操作，每个操作一行
- 如果不需要修改表格，返回空的 <tableEdit></tableEdit>

示例（假设第 0 张表有 3 列）：
<tableEdit>
insertRow(0, {"0": "新角色", "1": "25", "2": "战士"})
updateRow(0, 1, {"1": "26"})
deleteRow(1, 0)
</tableEdit>

只返回 <tableEdit> 标签，不要附加其他内容。`;

function buildIncrementalPromptSuffix() {
  return INCREMENTAL_PROMPT_SUFFIX;
}

/**
 * 议题 #15 Bug #33-E：把 AI 返回的 data key 解析为 column.key（位置映射 + 别名容错）
 *
 * 优先级：
 *   1. 精确命中现有 column.key
 *   2. 纯数字索引 "0"/"1"/... → columns[N].key（议题 #15 文档约定）
 *   3. col / col_N 风格 → columns[N-1].key（shujuku 风格：第一列 col，第二列 col_2）
 *   4. 兜底 — 返回原始 rawKey（仍写入 cells，便于诊断）
 *
 * @returns {{ key: string, source: 'direct'|'index'|'col_n'|'fallback' }}
 */
function resolveColumnKeyFromRawKey(rawKey, columns) {
  if (!rawKey || typeof rawKey !== 'string') return { key: rawKey, source: 'fallback' };
  if (!Array.isArray(columns) || columns.length === 0) return { key: rawKey, source: 'fallback' };

  // 1. 精确命中
  for (const col of columns) {
    if (col?.key === rawKey) return { key: rawKey, source: 'direct' };
  }
  // 2. 纯数字索引
  if (/^\d+$/.test(rawKey)) {
    const idx = parseInt(rawKey, 10);
    if (idx >= 0 && idx < columns.length && columns[idx]?.key) {
      return { key: columns[idx].key, source: 'index' };
    }
  }
  // 3. col / col_N 风格
  const colMatch = rawKey.match(/^col(?:_(\d+))?$/i);
  if (colMatch) {
    const idx = colMatch[1] ? parseInt(colMatch[1], 10) - 1 : 0;
    if (idx >= 0 && idx < columns.length && columns[idx]?.key) {
      return { key: columns[idx].key, source: 'col_n' };
    }
  }
  // 4. 兜底
  return { key: rawKey, source: 'fallback' };
}

export function applyIncrementalEdits(tables, edits, locks, runScope = null) {
  const result = normalizeRuntimeTables(tables || []);
  const lockMap = locks || {};
  const keyResolveStats = { direct: 0, index: 0, col_n: 0, fallback: 0 };

  // 议题 #15 Bug #33-F：诊断 edits 在表间分布，定位"只第一张表有数据"类型问题
  const editsByTable = {};
  const editsByOp = {};
  if (Array.isArray(edits)) {
    for (const e of edits) {
      const ti = Number.isFinite(e?.tableIndex) ? e.tableIndex : -1;
      editsByTable[ti] = (editsByTable[ti] || 0) + 1;
      editsByOp[e?.op || 'unknown'] = (editsByOp[e?.op || 'unknown'] || 0) + 1;
    }
  }
  getLog().info('applyIncrementalEdits 总览', {
    totalEdits: edits?.length || 0,
    tableCount: result.length,
    editsByTable,
    editsByOp
  });

  for (const edit of edits) {
    const ti = edit.tableIndex;
    if (ti < 0 || ti >= result.length) continue;

    const table = result[ti];
    if (!table || !Array.isArray(table.rows)) continue;
    if (runScope && !runScope.includes(table, ti)) continue;

    if (edit.op === TABLE_EDIT_OPERATIONS.INSERT_ROW) {
      const newRow = {
        id: createRuntimeTableRowId('row'),
        name: '',
        cells: {}
      };
      if (edit.data && typeof edit.data === 'object') {
        newRow.name = normalizeString(edit.data.name, '');
        const columns = Array.isArray(table.columns) ? table.columns : [];
        for (const [rawKey, val] of Object.entries(edit.data)) {
          if (rawKey === 'name') continue;
          const { key: resolvedKey, source } = resolveColumnKeyFromRawKey(rawKey, columns);
          newRow.cells[resolvedKey] = normalizeString(val);
          keyResolveStats[source] = (keyResolveStats[source] || 0) + 1;
        }
      }
      // v1.0.192：诊断 — AI 返回了 insertRow 但 data 为空（parser fallback / 数据丢失）
      const cellCount = Object.keys(newRow.cells).length;
      if (cellCount === 0 && !newRow.name) {
        getLog().warn('applyIncrementalEdits: 插入空行（data 解析为空）', {
          tableIndex: ti,
          tableName: table.name,
          editDataKeys: edit.data ? Object.keys(edit.data) : [],
          editDataPreview: JSON.stringify(edit.data || {}).slice(0, 200)
        });
      }
      table.rows.push(newRow);
      continue;
    }

    const ri = edit.rowIndex;
    if (ri < 0 || ri >= table.rows.length) continue;

    if (edit.op === TABLE_EDIT_OPERATIONS.DELETE_ROW) {
      if (isRowLocked(lockMap, ti, ri)) continue;
      table.rows.splice(ri, 1);
      continue;
    }

    if (edit.op === TABLE_EDIT_OPERATIONS.UPDATE_ROW) {
      const row = table.rows[ri];
      if (!row) continue;
      row.id = ensureTableRowId(row.id || row.rowId, ri);
      row.cells = row.cells || {};
      if (edit.data && typeof edit.data === 'object') {
        const columns = Array.isArray(table.columns) ? table.columns : [];
        for (const [rawKey, val] of Object.entries(edit.data)) {
          if (rawKey === 'name') continue;
          const { key: resolvedKey, source } = resolveColumnKeyFromRawKey(rawKey, columns);
          if (isLocked(lockMap, ti, ri, resolvedKey)) continue;
          row.cells[resolvedKey] = normalizeString(val);
          keyResolveStats[source] = (keyResolveStats[source] || 0) + 1;
        }
        if (edit.data.name !== undefined) {
          row.name = normalizeString(edit.data.name, row.name);
        }
      }
    }
  }

  if (Object.values(keyResolveStats).some((v) => v > 0)) {
    getLog().info('列 key 解析统计', keyResolveStats);
  }

  return normalizeRuntimeTables(result);
}

export async function buildRequest({ executionContext, targetSnapshot, loadResult, config, assistantSnapshot, fillMode, runScope } = {}) {
  const normalizedConfig = normalizeTableWorkbenchConfig(config);
  const isIncremental = fillMode === 'incremental' || (!fillMode && normalizedConfig.fillMode !== 'full');
  const toolConfig = buildTableWorkbenchToolConfig(normalizedConfig, { skipResponseContract: isIncremental });
  const requestPayload = buildRequestPayload(targetSnapshot, loadResult, runScope);
  const previousTables = Array.isArray(assistantSnapshot?.tableState?.tables)
    ? normalizeRuntimeTables(assistantSnapshot.tableState.tables)
    : [];

  const rawMessages = executionContext?.chatHistory || executionContext?.chatMessages || [];
  const { contextDepth, contextRoles, contextExtractTags, contextUseGlobalRules, sendLatestRows } = normalizedConfig;
  const regexPresetId = normalizedConfig?.extraction?.regexPresetId || '';

  const recentText = formatRecentMessages(rawMessages, contextDepth, contextRoles);
  const rawRecentText = formatRecentMessages(rawMessages, contextDepth, 'all');

  const processedRecentText = applyContextExtractionRules(recentText, {
    extractTags: contextExtractTags,
    useGlobalRules: contextUseGlobalRules,
    regexPresetId
  });
  const processedRawRecentText = applyContextExtractionRules(rawRecentText, {
    extractTags: contextExtractTags,
    useGlobalRules: contextUseGlobalRules,
    regexPresetId
  });

  const worldbookContent = await buildSelectedWorldbookContent({ worldbooks: normalizedConfig.worldbooks });
  const slicedTables = buildSendLatestRowsTables(requestPayload.tables, sendLatestRows);
  const slicedPayload = { ...requestPayload, tables: slicedTables };

  const context = {
    ...executionContext,
    toolName: '填表工作台',
    toolId: 'tableWorkbench',
    lastAiMessage: executionContext?.assistantBaseText || executionContext?.lastAiMessage || '',
    recentMessagesText: processedRecentText,
    rawRecentMessagesText: processedRawRecentText,
    toolWorldbookContent: worldbookContent,
    tableGuidance: formatTableGuidance(normalizedConfig.tables),
    tableScopeGuidance: formatScopeGuidance(runScope, requestPayload.tables),
    injectedContext: assistantSnapshot?.injectedContext || contextInjector.getLatestMessageInjectedContext(targetSnapshot?.sourceMessageId),
    toolContentMacro: JSON.stringify(slicedPayload, null, 2),
    extractedContent: JSON.stringify(slicedPayload, null, 2),
    previousToolOutput: JSON.stringify(previousTables, null, 2)
  };

  const messages = await toolPromptService.buildToolMessages(toolConfig, context);
  let promptText = await toolPromptService.buildPromptText(toolConfig, context);

  if (isIncremental) {
    promptText += buildIncrementalPromptSuffix();

    if (Array.isArray(messages) && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && typeof lastMsg.content === 'string') {
        lastMsg.content += buildIncrementalPromptSuffix();
      }
    }
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('填表请求消息构建失败。');
  }

  return {
    toolConfig,
    context,
    requestPayload,
    promptText,
    messages,
    fillMode: isIncremental ? 'incremental' : 'full',
    runScope: typeof runScope?.toJSON === 'function' ? runScope.toJSON() : null
  };
}

export async function sendRequest(messages, config = {}, abortSignal = null) {
  const normalizedConfig = normalizeTableWorkbenchConfig(config);
  const presetName = normalizeString(normalizedConfig.apiPreset, '');

  if (presetName) {
    if (!hasEffectiveApiPreset(presetName)) {
      throw new Error(`API 预设不存在: ${presetName}`);
    }

    return sendWithPreset(presetName, messages, {}, abortSignal);
  }

  return sendApiRequest(messages, {}, abortSignal);
}

function buildAutoRuntimePatch({
  status = TABLE_WORKBENCH_RUNTIME_STATUS.IDLE,
  targetSnapshot = null,
  skipReason = '',
  startedAt = Date.now(),
  error = ''
} = {}) {
  return {
    lastAutoRunAt: startedAt,
    lastAutoStatus: normalizeString(status, TABLE_WORKBENCH_RUNTIME_STATUS.IDLE),
    lastAutoMessageId: normalizeString(targetSnapshot?.sourceMessageId, ''),
    lastAutoRevisionKey: normalizeString(targetSnapshot?.slotRevisionKey, ''),
    lastAutoSkipReason: normalizeString(skipReason, ''),
    ...(error ? { lastError: error, lastErrorDetails: [error] } : {})
  };
}

function applyRuntimePatch(runtimePatch = {}, runSource = TABLE_RUN_SOURCES.MANUAL) {
  const patch = runtimePatch && typeof runtimePatch === 'object' ? runtimePatch : {};
  if (!Object.keys(patch).length) return null;
  return updateTableWorkbenchRuntime(patch);
}

function buildAutoResultMeta({
  targetSnapshot = null,
  startedAt = Date.now(),
  status = 'idle',
  skipReason = '',
  warning = '',
  writeback = null,
  aborted = false,
  stale = false,
  abortReason = '',
  error = ''
} = {}) {
  return {
    isAutoRun: true,
    status,
    startedAt,
    targetSnapshot,
    sourceMessageId: normalizeString(targetSnapshot?.sourceMessageId, ''),
    sourceSwipeId: normalizeString(targetSnapshot?.sourceSwipeId || targetSnapshot?.effectiveSwipeId, ''),
    slotRevisionKey: normalizeString(targetSnapshot?.slotRevisionKey, ''),
    writebackStatus: writeback?.success === true ? 'success' : (warning ? 'warning' : ''),
    refreshConfirmed: writeback?.mirrorResult?.refreshConfirmed === true,
    warning: normalizeString(warning, ''),
    skipReason: normalizeString(skipReason, ''),
    aborted: aborted === true,
    stale: stale === true,
    abortReason: normalizeString(abortReason, ''),
    error: normalizeString(error, '')
  };
}

function resolveAutoAbortState(autoMeta = null) {
  if (autoMeta?.signal?.aborted) {
    return {
      aborted: true,
      stale: false,
      reason: 'cancelled_before_host_commit'
    };
  }

  if (typeof autoMeta?.shouldAbortWriteback === 'function') {
    try {
      return autoMeta.shouldAbortWriteback() || false;
    } catch (_) {
      return {
        aborted: true,
        stale: true,
        reason: 'stale_base_changed'
      };
    }
  }

  return false;
}

export async function runManualTableUpdate(configInput = null, options = {}) {
  return runTableUpdate({
    configInput,
    runSource: TABLE_RUN_SOURCES.MANUAL,
    clearBeforeUpdate: options?.clearBeforeUpdate === true,
    executionContextBuilder: () => buildExecutionContextForLatestAssistant({
      runSource: TABLE_RUN_SOURCES.MANUAL
    }),
    targetResolver: (executionContext) => resolveTableTargetFromExecutionContext(executionContext, {
      runSource: TABLE_RUN_SOURCES.MANUAL
    })
  });
}

export async function runAutoTableUpdate({
  messageId,
  swipeId = '',
  sourceEvent = 'AUTO_TABLE',
  configInput = null,
  signal = null,
  shouldAbortWriteback = null
} = {}) {
  return runTableUpdate({
    configInput,
    runSource: TABLE_RUN_SOURCES.AUTO,
    autoMeta: {
      sourceEvent,
      messageId: normalizeString(messageId, ''),
      swipeId: normalizeString(swipeId, ''),
      signal,
      shouldAbortWriteback
    },
    executionContextBuilder: () => buildExecutionContextForMessage({
      messageId,
      swipeId,
      runSource: TABLE_RUN_SOURCES.AUTO
    }),
    targetResolver: (executionContext) => resolveTableTargetFromExecutionContext(executionContext, {
      runSource: TABLE_RUN_SOURCES.AUTO
    })
  });
}

async function runTableUpdate({
  configInput = null,
  runSource = TABLE_RUN_SOURCES.MANUAL,
  executionContextBuilder,
  targetResolver,
  autoMeta = null,
  clearBeforeUpdate = false
} = {}) {
  const config = normalizeTableWorkbenchConfig(configInput || getTableWorkbenchConfig());
  const validation = validateTableWorkbenchConfig(config);
  const draftValidation = validateTableDraftDeep({
    tables: Array.isArray(config.tables) ? config.tables : []
  });
  const isAutoRun = runSource === TABLE_RUN_SOURCES.AUTO;
  const startedAt = Date.now();

  getLog().info(`开始填表 [${runSource}]`, { isAutoRun, fillMode: config.fillMode });

  if (!validation.valid || !draftValidation.valid) {
    const errors = [...validation.errors, ...draftValidation.errors];
    getLog().error('配置校验失败', { errors });
    applyRuntimePatch({
      lastStatus: TABLE_WORKBENCH_RUNTIME_STATUS.ERROR,
      lastRunAt: startedAt,
      lastDurationMs: 0,
      lastError: errors[0] || '填表配置无效。',
      lastErrorDetails: errors,
      lastValidationSummary: draftValidation.summary || { errorCount: errors.length, warningCount: 0 },
      errorCount: Number(config?.runtime?.errorCount) || 0,
      ...(isAutoRun ? buildAutoRuntimePatch({
        status: TABLE_WORKBENCH_RUNTIME_STATUS.ERROR,
        startedAt,
        skipReason: 'invalid_config',
        error: errors[0] || '填表配置无效。'
      }) : {})
    }, runSource);
    return {
      success: false,
      error: errors.join('\n'),
      errors,
      ...(isAutoRun ? {
        meta: buildAutoResultMeta({
          startedAt,
          status: TABLE_WORKBENCH_RUNTIME_STATUS.ERROR,
          skipReason: 'invalid_config',
          error: errors[0] || '填表配置无效。'
        })
      } : {})
    };
  }

  const runtime = config.runtime || {};

  // 议题 #15 #33-I (v1.0.192)：合并 config.tableEnabledOverrides 到激活模板
  //   UI toggle 关闭一张表后，状态保存到 config.tableEnabledOverrides[tableId]，
  //   独立于 config.tables（后者不跟激活模板同步）。
  //   主链合并：用户 toggle 优先于激活模板默认值，确保 disabled 表全链路被排除
  //   （runScope filter / buildScopedRequestTables / worldbook-sync 都看 scopeTables.enabled）。
  let scopeTables = Array.isArray(config.tables) ? config.tables : [];
  try {
    const activeTpl = resolveActiveTemplate({});
    const activeTables = activeTpl?.template?.tables;
    if (Array.isArray(activeTables) && activeTables.length > 0) {
      const overrides = (config.tableEnabledOverrides && typeof config.tableEnabledOverrides === 'object')
        ? config.tableEnabledOverrides
        : {};
      scopeTables = activeTables.map((t) => {
        const tid = t?.id;
        const userOverride = tid && Object.prototype.hasOwnProperty.call(overrides, tid)
          ? overrides[tid]
          : undefined;
        let enabled = userOverride !== undefined ? userOverride : (t.enabled !== false);
        // v1.0.201 Task G2：自动填表时，per-table updateConfig.updateFrequency === 0
        //   表示永不自动填，临时禁用（手动填表不受影响）
        if (isAutoRun && enabled) {
          const freq = t?.updateConfig?.updateFrequency;
          if (Number.isFinite(freq) && freq === 0) {
            enabled = false;
          }
        }
        return {
          ...t,
          enabled
        };
      });
      const disabledList = scopeTables.filter((t) => t.enabled === false).map((t) => t?.name || t?.id);
      if (disabledList.length > 0) {
        getLog().info('scopeTables: 用户禁用了部分表', {
          disabledCount: disabledList.length,
          disabledNames: disabledList
        });
      }
    }
  } catch (_) { /* fall back to config.tables */ }

  const runScope = resolveTableRunScope(config.scope || config, scopeTables);
  getLog().info('runScope 已解析', {
    mode: runScope.mode,
    requestedMode: runScope.requestedMode,
    staleScope: runScope.staleScope,
    scopeTablesCount: Array.isArray(scopeTables) ? scopeTables.length : 0,
    allowedTableIds: runScope.allowedTableIds,
    allTableIds: runScope.allTableIds,
    scopeTablesEnabled: Array.isArray(scopeTables) ? scopeTables.map((t) => ({ id: t?.id, name: t?.name, enabled: t?.enabled })) : []
  });
  if (runScope.staleScope) {
    getLog().warn('runScope: 检测到 stale scope（activeTableId/selectedTableIds 不在当前 tables 范围内），已自动 fallback 到 enabled', {
      requestedMode: runScope.requestedMode,
      requestedActiveTableId: runScope.activeTableId,
      requestedSelectedTableIds: runScope.selectedTableIds
    });
  }
  if ((runScope.mode === 'current' || runScope.mode === 'selected') && runScope.allowedTableIds.length === 0) {
    const scopeError = runScope.mode === 'current' ? '未指定当前表格，无法执行。' : '未选择任何表格，无法执行。';
    getLog().warn(scopeError, { mode: runScope.mode });
    applyRuntimePatch({
      lastStatus: TABLE_WORKBENCH_RUNTIME_STATUS.ERROR,
      lastRunAt: startedAt,
      lastDurationMs: 0,
      lastError: scopeError,
      lastErrorDetails: [scopeError]
    }, runSource);
    return { success: false, error: scopeError, errors: [scopeError] };
  }
  let activeTargetSnapshot = null;
  applyRuntimePatch({
    lastStatus: TABLE_WORKBENCH_RUNTIME_STATUS.RUNNING,
    lastError: '',
    lastErrorDetails: [],
    lastValidationSummary: draftValidation.summary || { errorCount: 0, warningCount: 0 },
    lastScopeMode: normalizeString(runScope.mode, ''),
    ...(isAutoRun ? buildAutoRuntimePatch({
      status: TABLE_WORKBENCH_RUNTIME_STATUS.RUNNING,
      startedAt,
      skipReason: ''
    }) : {})
  }, runSource);

  try {
    if (typeof executionContextBuilder !== 'function') {
      throw new Error('table_update_missing_execution_context_builder');
    }
    if (typeof targetResolver !== 'function') {
      throw new Error('table_update_missing_target_resolver');
    }

    const executionContext = await executionContextBuilder();
    getLog().info('执行上下文已构建');
    const targetSnapshot = targetResolver(executionContext);

    if (!targetSnapshot) {
      throw new Error('当前没有可用的 assistant 目标楼层。');
    }
    activeTargetSnapshot = targetSnapshot;
    getLog().info('目标消息已解析', { sourceMessageId: targetSnapshot.sourceMessageId, slotRevisionKey: targetSnapshot.slotRevisionKey });

    if (isAutoRun) {
      applyRuntimePatch(buildAutoRuntimePatch({
        status: TABLE_WORKBENCH_RUNTIME_STATUS.RUNNING,
        targetSnapshot,
        startedAt,
        skipReason: ''
      }), runSource);
    }

    const triggerMode = normalizeString(config.autoUpdateTrigger, 'assistantMessage');
    if (isAutoRun && (!config.autoUpdateEnabled || triggerMode !== 'assistantMessage')) {
      const skipReason = !config.autoUpdateEnabled ? 'auto_update_disabled' : 'auto_trigger_not_assistant_message';
      applyRuntimePatch(buildAutoRuntimePatch({
        status: TABLE_WORKBENCH_RUNTIME_STATUS.SKIPPED,
        targetSnapshot,
        startedAt,
        skipReason
      }), runSource);
      return {
        success: false,
        skipped: true,
        reason: skipReason,
        targetSnapshot,
        meta: buildAutoResultMeta({
          targetSnapshot,
          startedAt,
          status: TABLE_WORKBENCH_RUNTIME_STATUS.SKIPPED,
          skipReason
        })
      };
    }

    if (isAutoRun) {
      const abortState = resolveAutoAbortState(autoMeta);
      if (abortState) {
        applyRuntimePatch(buildAutoRuntimePatch({
          status: TABLE_WORKBENCH_RUNTIME_STATUS.ABORTED,
          targetSnapshot,
          startedAt,
          skipReason: abortState.reason,
          error: '请求已取消'
        }), runSource);
        return {
          success: false,
          error: '请求已取消',
          targetSnapshot,
          meta: buildAutoResultMeta({
            targetSnapshot,
            startedAt,
            status: TABLE_WORKBENCH_RUNTIME_STATUS.ABORTED,
            skipReason: abortState.reason,
            aborted: abortState.aborted === true,
            stale: abortState.stale === true,
            abortReason: abortState.reason,
            error: '请求已取消'
          })
        };
      }
    }

    const resolvedResult = await recordResolvedTarget(targetSnapshot);
    if (!resolvedResult?.success) {
      throw new Error(resolvedResult?.error || '目标解析记录失败');
    }

    // 议题 #15 #23：clearBeforeUpdate 重填三段式
    //   shujuku update-orchestrator clearTableDataAtFloors → loadAllChatMessages → refreshData
    //   1. 清空目标楼层数据（state + bindings）
    //   2. state-service 内部下次 getMessageForTarget 时自动重读最新 chat（runtime.chat 引用始终最新）
    //   3. 后续 loadBoundStateOrTemplate 会按倒序遍历找前驱（history-service 处理）
    if (clearBeforeUpdate && Number.isFinite(targetSnapshot?.targetMessageIndex) && targetSnapshot.targetMessageIndex >= 0) {
      getLog().info('clearBeforeUpdate 启用，清空目标楼层数据', {
        targetMessageIndex: targetSnapshot.targetMessageIndex
      });
      try {
        const clearResult = await clearStateAtMessageIndex(targetSnapshot.targetMessageIndex);
        getLog().info('clearBeforeUpdate 完成', clearResult);
      } catch (err) {
        getLog().error('clearBeforeUpdate 失败', err);
        // 不阻断主流程，让填表继续尝试（最差情况就是叠加在旧数据上）
      }
    }

    const assistantSnapshot = getAssistantTableSnapshot(targetSnapshot.sourceMessageId);

    // 议题 #15 Bug #33-B：templateTables 取自激活模板（与 runScope 用同一份 scopeTables）
    // 而不是 config.tables — 后者是工作台旧快照，切换激活模板后不同步。
    const templateTables = (Array.isArray(scopeTables) && scopeTables.length > 0)
      ? scopeTables
      : config.tables;
    getLog().info('templateTables 来源', {
      usingActiveTemplate: scopeTables !== (Array.isArray(config.tables) ? config.tables : []),
      tableCount: Array.isArray(templateTables) ? templateTables.length : 0,
      firstTableName: templateTables?.[0]?.name || '',
      firstTableId: templateTables?.[0]?.id || ''
    });

    const loadResult = loadBoundStateOrTemplate(targetSnapshot, {
      templateTables
    });
    const previousTables = normalizeRuntimeTables(loadResult?.state?.tables || []);
    const provider = getTableProvider();
    const abortSignal = autoMeta?.signal || executionContext?.signal || null;
    getLog().info('状态已加载', { loadMode: loadResult?.loadMode, sourceKind: loadResult?.sourceKind, tableCount: previousTables.length });

    const request = await provider.buildRequest({ buildRequest }, {
      executionContext,
      targetSnapshot,
      loadResult,
      config,
      assistantSnapshot,
      runScope
    });
    getLog().info('请求已构建', { messageCount: request?.messages?.length, fillMode: request?.fillMode });
    // ────────────────────────────────────────────────────────
    // 议题 #15 §B：sendRequest + parseResponse 套 3 次重试 + 5s 退避
    // tableEdit 缺失（parsed.mode === 'empty'）当作失败触发重试；
    // abort signal 中途取消立刻退出（不再等待重试）。
    // ────────────────────────────────────────────────────────
    let responseText = '';
    let parsed = null;
    let lastAttemptError = null;

    for (let attempt = 1; attempt <= CALL_AI_MAX_RETRIES; attempt++) {
      if (abortSignal?.aborted) {
        throw new Error('请求已取消');
      }
      try {
        responseText = await provider.sendRequest({ sendRequest }, request, {
          config,
          abortSignal
        });
        getLog().info('API 响应已收到', { attempt, responseLength: responseText?.length || 0 });

        parsed = provider.parseResponse({ parseResponse: sanitizeAIResponse }, responseText);
        getLog().info('响应已解析', { attempt, mode: parsed?.mode, hasEdits: !!parsed?.edits, hasTables: !!parsed?.tables });

        // tableEdit 缺失门控：mode 为 empty 或无 edits/tables 都视为失败
        const hasUsefulPayload = (parsed?.mode === 'incremental' && Array.isArray(parsed.edits) && parsed.edits.length > 0)
          || (parsed?.mode === 'full' && parsed?.tables);
        if (!hasUsefulPayload) {
          throw new Error('AI 响应中未找到有效的 <tableEdit> 标签或表格 JSON');
        }

        // 成功
        lastAttemptError = null;
        break;
      } catch (err) {
        lastAttemptError = err;
        getLog().warn(`填表 attempt ${attempt}/${CALL_AI_MAX_RETRIES} 失败`, {
          error: err?.message || String(err)
        });

        if (attempt < CALL_AI_MAX_RETRIES) {
          const completed = await sleepWithAbort(CALL_AI_RETRY_DELAY_MS, abortSignal);
          if (!completed) {
            throw new Error('请求已取消（重试等待期间）');
          }
        }
      }
    }

    if (lastAttemptError) {
      throw new Error(`填表失败（${CALL_AI_MAX_RETRIES} 次重试后仍失败）: ${lastAttemptError?.message || String(lastAttemptError)}`);
    }

    let nextTables;
    let diff = null;
    let fillMode = request.fillMode || 'full';
    let scopeStats = null;

    if (parsed.mode === 'incremental' && parsed.edits) {
      // 议题 #15：锁存储已迁移到 storage namespace `tableLocks`，按 scopeKey + sheetUid 索引。
      // 旧 boundState.meta.locks 不再使用；传 previousTables 给 getLocks 用于映射 tableIndex → sheetUid。
      const locks = getLocks(loadResult?.state, previousTables);
      const filterResult = filterIncrementalEditsByScope(parsed.edits, previousTables, runScope, locks);
      scopeStats = filterResult.stats;
      // 议题 #15 修复：按 AI 原始顺序应用 edits，不再重排。
      // shujuku update-orchestrator.ts 也是按原始顺序逐条 applyEdits。
      // 重排（update→insert→delete）会让 "AI 同轮内先 insert 再 update 新行" 失效。
      nextTables = applyIncrementalEdits(previousTables, filterResult.edits, locks, runScope);
      fillMode = 'incremental';
      if (scopeStats.droppedByScope > 0 || scopeStats.droppedByLock > 0) {
        getLog().info('scope 过滤', scopeStats);
      }
    } else if (parsed.mode === 'full' && parsed.tables) {
      const scopedTables = normalizeRuntimeTables(parsed.tables);
      nextTables = mergeTablesByScope(previousTables, scopedTables, runScope);
      fillMode = 'full';
    } else {
      nextTables = normalizeRuntimeTables(previousTables);
    }

    diff = computeTableDiff(previousTables, nextTables);
    getLog().info('差异已计算', { fillMode });

    if (isAutoRun) {
      const abortState = resolveAutoAbortState(autoMeta);
      if (abortState) {
        applyRuntimePatch(buildAutoRuntimePatch({
          status: TABLE_WORKBENCH_RUNTIME_STATUS.ABORTED,
          targetSnapshot,
          startedAt,
          skipReason: abortState.reason,
          error: '写回前已取消'
        }), runSource);
        return {
          success: false,
          error: '写回前已取消',
          targetSnapshot,
          meta: buildAutoResultMeta({
            targetSnapshot,
            startedAt,
            status: TABLE_WORKBENCH_RUNTIME_STATUS.ABORTED,
            aborted: abortState.aborted === true,
            stale: abortState.stale === true,
            abortReason: abortState.reason,
            error: '写回前已取消'
          })
        };
      }
    }

    const writeback = await writeTableState({
      targetSnapshot,
      nextTables,
      config,
      loadResult,
      diff,
      fillMode,
      skipNotify: isAutoRun
    });

    if (isAutoRun) {
      const abortState = resolveAutoAbortState(autoMeta);
      if (abortState) {
        applyRuntimePatch(buildAutoRuntimePatch({
          status: TABLE_WORKBENCH_RUNTIME_STATUS.ABORTED,
          targetSnapshot,
          startedAt,
          skipReason: abortState.reason,
          error: '请求已取消'
        }), runSource);
        return {
          success: false,
          error: '请求已取消',
          targetSnapshot,
          loadResult,
          request,
          responseText,
          parsed,
          fillMode,
          diff,
          previousTables,
          nextTables,
          runScope,
          state: writeback?.state,
          bindings: writeback?.bindings,
          mirrorResult: writeback?.mirrorResult,
          warning: writeback?.warning || '',
          meta: buildAutoResultMeta({
            targetSnapshot,
            startedAt,
            status: TABLE_WORKBENCH_RUNTIME_STATUS.ABORTED,
            warning: writeback?.warning || '',
            writeback,
            aborted: abortState.aborted === true,
            stale: abortState.stale === true,
            abortReason: abortState.reason,
            error: '请求已取消'
          })
        };
      }
    }

    if (!writeback?.success) {
      throw new Error(writeback?.error || '结构化写回失败');
    }

    const durationMs = Date.now() - startedAt;
    getLog().info(`填表完成 [${fillMode}] ${durationMs}ms`, { success: true, writebackSuccess: writeback?.success, mirrorSuccess: writeback?.mirrorResult?.success });
    const runtimePatch = {
      lastStatus: TABLE_WORKBENCH_RUNTIME_STATUS.SUCCESS,
      lastRunAt: Date.now(),
      lastDurationMs: durationMs,
      lastError: '',
      lastErrorDetails: [],
      lastValidationSummary: draftValidation.summary || { errorCount: 0, warningCount: 0 },
      successCount: (Number(runtime.successCount) || 0) + 1,
      errorCount: Number(runtime.errorCount) || 0,
      lastSourceMessageId: normalizeString(targetSnapshot.sourceMessageId),
      lastSlotRevisionKey: normalizeString(targetSnapshot.slotRevisionKey),
      lastLoadMode: normalizeString(loadResult.loadMode),
      lastMirrorApplied: writeback?.mirrorResult?.success === true,
      lastResolvedFromMessageId: normalizeString(loadResult?.resolvedFromMessageId),
      lastResolvedFromRevisionKey: normalizeString(loadResult?.resolvedFromRevisionKey),
      lastSourceKind: normalizeString(loadResult?.sourceKind || loadResult?.state?.meta?.sourceKind),
      lastScopeMode: normalizeString(runScope.mode, ''),
      lastFillMode: fillMode,
      ...(isAutoRun ? buildAutoRuntimePatch({
        status: TABLE_WORKBENCH_RUNTIME_STATUS.SUCCESS,
        targetSnapshot,
        startedAt,
        skipReason: ''
      }) : {})
    };
    applyRuntimePatch(runtimePatch, runSource);

    return {
      success: true,
      targetSnapshot,
      loadResult,
      request,
      responseText,
      parsed,
      fillMode,
      diff,
      previousTables,
      nextTables,
      runScope,
      scopeStats,
      state: writeback.state,
      bindings: writeback.bindings,
      mirrorResult: writeback.mirrorResult,
      warning: writeback.warning || '',
      ...(isAutoRun ? {
        meta: buildAutoResultMeta({
          targetSnapshot,
          startedAt,
          status: TABLE_WORKBENCH_RUNTIME_STATUS.SUCCESS,
          warning: writeback.warning || '',
          writeback
        })
      } : {})
    };
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    getLog().error(`填表失败 ${durationMs}ms: ${error?.message || error}`, { stack: error?.stack });
    const abortState = isAutoRun ? resolveAutoAbortState(autoMeta) : false;
    const isAbortError = error?.name === 'AbortError'
      || error?.message === '请求已取消'
      || abortState?.aborted === true
      || abortState?.stale === true;
    const runtimeStatus = isAbortError ? TABLE_WORKBENCH_RUNTIME_STATUS.ABORTED : TABLE_WORKBENCH_RUNTIME_STATUS.ERROR;
    const runtimePatch = {
      lastStatus: runtimeStatus,
      lastRunAt: Date.now(),
      lastDurationMs: durationMs,
      lastError: error?.message || String(error),
      lastErrorDetails: [error?.message || String(error)],
      lastValidationSummary: draftValidation.summary || { errorCount: 0, warningCount: 0 },
      successCount: Number(runtime.successCount) || 0,
      errorCount: isAbortError ? (Number(runtime.errorCount) || 0) : ((Number(runtime.errorCount) || 0) + 1),
      lastScopeMode: normalizeString(runScope.mode, ''),
      ...(isAutoRun ? buildAutoRuntimePatch({
        status: runtimeStatus,
        targetSnapshot: activeTargetSnapshot,
        startedAt,
        skipReason: isAbortError ? (abortState?.reason || 'cancelled_before_host_commit') : '',
        error: error?.message || String(error)
      }) : {})
    };
    applyRuntimePatch(runtimePatch, runSource);

    return {
      success: false,
      error: error?.message || String(error),
      errors: [error?.message || String(error)],
      ...(isAutoRun ? {
        meta: buildAutoResultMeta({
          targetSnapshot: activeTargetSnapshot,
          startedAt,
          status: runtimeStatus,
          skipReason: isAbortError ? (abortState?.reason || 'cancelled_before_host_commit') : '',
          aborted: isAbortError,
          stale: abortState?.stale === true,
          abortReason: isAbortError ? (abortState?.reason || 'cancelled_before_host_commit') : '',
          error: error?.message || String(error)
        })
      } : {})
    };
  }
}

export default {
  buildRequest,
  sendRequest,
  applyIncrementalEdits,
  runManualTableUpdate,
  runAutoTableUpdate
};
