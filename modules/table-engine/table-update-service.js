/**
 * YouYou Toolkit - 填表更新服务
 * @description 手动填表请求构建、增量/全量双模式解析、操作排序与应用执行主链
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
  recordResolvedTarget
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
import { buildSelectedWorldbookContent } from '../tool-worldbook-service.js';
import { extractTagContent, getTagRules, getContentBlacklist } from '../regex-extractor.js';

function getLog() {
  return logger.createScope('TableUpdate');
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

function applyContextExtractionRules(text, { extractTags = [], useGlobalRules = false } = {}) {
  if (!text) return text;
  const hasCustomTags = Array.isArray(extractTags) && extractTags.length > 0;
  if (!hasCustomTags && !useGlobalRules) return text;
  try {
    let rules = [];
    let blacklist = [];

    if (hasCustomTags) {
      rules = extractTags.map(tag => {
        const t = String(tag || '').trim();
        if (t.startsWith('regex:')) {
          return { type: 'regex_include', value: t.slice(6).trim(), enabled: true };
        }
        return { type: 'include', value: t, enabled: true };
      }).filter(r => r.value);
    }

    if (useGlobalRules) {
      const globalRules = getTagRules() || [];
      rules = [...rules, ...globalRules.filter(r => r?.enabled)];
      blacklist = getContentBlacklist() || [];
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
      '字段:'
    ];
    columns.forEach((column) => {
      lines.push(`- ${normalizeString(column?.title || column?.key, '未命名字段')} (${normalizeString(column?.key, '')}): ${normalizeString(column?.description, '无')}`);
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

1. 插入新行：insertRow(表索引, {"列键": "值", ...})
2. 更新现有行：updateRow(表索引, 行索引, {"列键": "新值", ...})
3. 删除行：deleteRow(表索引, 行索引)

其中表索引从0开始，行索引也是从0开始。
一次可以包含多个操作，每个操作一行。
如果不需要修改表格，返回空的 <tableEdit></tableEdit>。

示例：
<tableEdit>
insertRow(0, {"name": "新角色", "age": "25", "role": "战士"})
updateRow(0, 1, {"age": "26"})
deleteRow(1, 0)
</tableEdit>

只返回 <tableEdit> 标签，不要附加其他内容。`;

function buildIncrementalPromptSuffix() {
  return INCREMENTAL_PROMPT_SUFFIX;
}

export function parsePatch(responseText = '') {
  const result = sanitizeAIResponse(responseText);
  if (result.mode === 'full' && result.tables) {
    return { tables: cloneTableValue(result.tables), parsed: result.tables };
  }
  throw new Error('无法从模型响应中解析 tables JSON。');
}

export function sortEdits(edits) {
  if (!Array.isArray(edits)) return [];
  const priority = {
    [TABLE_EDIT_OPERATIONS.UPDATE_ROW]: 0,
    [TABLE_EDIT_OPERATIONS.INSERT_ROW]: 1,
    [TABLE_EDIT_OPERATIONS.DELETE_ROW]: 2
  };
  return [...edits].sort((a, b) => {
    const pa = priority[a.op] ?? 99;
    const pb = priority[b.op] ?? 99;
    if (pa === 2 && pb === 2) {
      return (b.rowIndex ?? 0) - (a.rowIndex ?? 0);
    }
    return pa - pb;
  });
}

export function applyIncrementalEdits(tables, edits, locks, runScope = null) {
  const result = normalizeRuntimeTables(tables || []);
  const lockMap = locks || {};

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
        for (const col of columns) {
          const key = col.key;
          if (edit.data[key] !== undefined) {
            newRow.cells[key] = normalizeString(edit.data[key]);
          }
        }
        for (const [key, val] of Object.entries(edit.data)) {
          if (key !== 'name' && newRow.cells[key] === undefined) {
            newRow.cells[key] = normalizeString(val);
          }
        }
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
        for (const [key, val] of Object.entries(edit.data)) {
          if (key === 'name') continue;
          if (isLocked(lockMap, ti, ri, key)) continue;
          row.cells[key] = normalizeString(val);
        }
        if (edit.data.name !== undefined) {
          row.name = normalizeString(edit.data.name, row.name);
        }
      }
    }
  }

  return normalizeRuntimeTables(result);
}

export async function buildRequest({ executionContext, targetSnapshot, loadResult, config, assistantSnapshot, fillMode, runScope } = {}) {
  const normalizedConfig = normalizeTableWorkbenchConfig(config);
  const toolConfig = buildTableWorkbenchToolConfig(normalizedConfig);
  const requestPayload = buildRequestPayload(targetSnapshot, loadResult, runScope);
  const previousTables = Array.isArray(assistantSnapshot?.tableState?.tables)
    ? normalizeRuntimeTables(assistantSnapshot.tableState.tables)
    : [];

  const isIncremental = fillMode === 'incremental' || (!fillMode && normalizedConfig.fillMode !== 'full');

  const rawMessages = executionContext?.chatHistory || executionContext?.chatMessages || [];
  const { contextDepth, contextRoles, contextExtractTags, contextUseGlobalRules, sendLatestRows } = normalizedConfig;

  const recentText = formatRecentMessages(rawMessages, contextDepth, contextRoles);
  const rawRecentText = formatRecentMessages(rawMessages, contextDepth, 'all');

  const processedRecentText = applyContextExtractionRules(recentText, {
    extractTags: contextExtractTags,
    useGlobalRules: contextUseGlobalRules
  });
  const processedRawRecentText = applyContextExtractionRules(rawRecentText, {
    extractTags: contextExtractTags,
    useGlobalRules: contextUseGlobalRules
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

export async function runManualTableUpdate(configInput = null) {
  return runTableUpdate({
    configInput,
    runSource: TABLE_RUN_SOURCES.MANUAL,
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
  autoMeta = null
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
  const runScope = resolveTableRunScope(config.scope || config, config.tables);
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

    const assistantSnapshot = getAssistantTableSnapshot(targetSnapshot.sourceMessageId);
    const loadResult = loadBoundStateOrTemplate(targetSnapshot, {
      templateTables: config.tables
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
    const responseText = await provider.sendRequest({ sendRequest }, request, {
      config,
      abortSignal
    });
    getLog().info('API 响应已收到', { responseLength: responseText?.length || 0 });
    const parsed = provider.parseResponse({ parseResponse: sanitizeAIResponse }, responseText);
    getLog().info('响应已解析', { mode: parsed?.mode, hasEdits: !!parsed?.edits, hasTables: !!parsed?.tables });

    let nextTables;
    let diff = null;
    let fillMode = request.fillMode || 'full';
    let scopeStats = null;

    if (parsed.mode === 'incremental' && parsed.edits) {
      const locks = getLocks(loadResult?.state);
      const filterResult = filterIncrementalEditsByScope(parsed.edits, previousTables, runScope, locks);
      scopeStats = filterResult.stats;
      const sortedEdits = sortEdits(filterResult.edits);
      nextTables = applyIncrementalEdits(previousTables, sortedEdits, locks, runScope);
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
  parsePatch,
  sortEdits,
  applyIncrementalEdits,
  runManualTableUpdate,
  runAutoTableUpdate
};
