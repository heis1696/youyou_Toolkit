/**
 * YouYou Toolkit - 填表更新服务
 * @description 手动填表请求构建、增量/全量双模式解析、操作排序与应用执行主链
 */

import { buildExecutionContextForLatestAssistant } from '../tool-execution-context.js';
import { contextInjector } from '../context-injector.js';
import { hasEffectiveApiPreset, sendApiRequest, sendWithPreset } from '../api-connection.js';
import { toolPromptService } from '../tool-prompt-service.js';
import { cloneTableValue, TABLE_RUN_SOURCES, TABLE_EDIT_OPERATIONS } from './table-types.js';
import { resolveTableTargetFromExecutionContext } from './table-target-resolver.js';
import {
  getAssistantTableSnapshot,
  getPreviousTableState,
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
import { getLocks, isLocked } from './table-lock-service.js';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function formatRecentMessages(messages = [], limit = 8) {
  if (!Array.isArray(messages) || messages.length === 0) return '';
  return messages
    .slice(Math.max(messages.length - limit, 0))
    .map((message) => `[${normalizeString(message?.role, 'unknown')}] ${String(message?.content || '').trim()}`)
    .filter(Boolean)
    .join('\n\n');
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

function buildRequestPayload(targetSnapshot, loadResult) {
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
    tables: Array.isArray(loadResult?.state?.tables)
      ? cloneTableValue(loadResult.state.tables)
      : []
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

export function applyIncrementalEdits(tables, edits, locks) {
  const result = cloneTableValue(tables || []);
  const lockMap = locks || {};

  for (const edit of edits) {
    const ti = edit.tableIndex;
    if (ti < 0 || ti >= result.length) continue;

    const table = result[ti];
    if (!table || !Array.isArray(table.rows)) continue;

    if (edit.op === TABLE_EDIT_OPERATIONS.INSERT_ROW) {
      const newRow = { name: '', cells: {} };
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
          if (key !== 'name' && !(newRow.cells[key] !== undefined)) {
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
      table.rows.splice(ri, 1);
      continue;
    }

    if (edit.op === TABLE_EDIT_OPERATIONS.UPDATE_ROW) {
      const row = table.rows[ri];
      if (!row) continue;
      row.cells = row.cells || {};
      if (edit.data && typeof edit.data === 'object') {
        for (const [key, val] of Object.entries(edit.data)) {
          if (isLocked(lockMap, ti, ri, key)) continue;
          row.cells[key] = normalizeString(val);
        }
        if (edit.data.name !== undefined) {
          row.name = normalizeString(edit.data.name, row.name);
        }
      }
    }
  }

  return result;
}

export async function buildRequest({ executionContext, targetSnapshot, loadResult, config, assistantSnapshot, fillMode } = {}) {
  const normalizedConfig = normalizeTableWorkbenchConfig(config);
  const toolConfig = buildTableWorkbenchToolConfig(normalizedConfig);
  const requestPayload = buildRequestPayload(targetSnapshot, loadResult);
  const previousTables = Array.isArray(assistantSnapshot?.tableState?.tables)
    ? cloneTableValue(assistantSnapshot.tableState.tables)
    : [];

  const isIncremental = fillMode === 'incremental' || (!fillMode && normalizedConfig.fillMode !== 'full');

  const context = {
    ...executionContext,
    toolName: '填表工作台',
    toolId: 'tableWorkbench',
    lastAiMessage: executionContext?.assistantBaseText || executionContext?.lastAiMessage || '',
    recentMessagesText: formatRecentMessages(executionContext?.chatHistory || executionContext?.chatMessages || []),
    rawRecentMessagesText: formatRecentMessages(executionContext?.chatHistory || executionContext?.chatMessages || [], 20),
    tableGuidance: formatTableGuidance(normalizedConfig.tables),
    injectedContext: assistantSnapshot?.injectedContext || contextInjector.getLatestMessageInjectedContext(targetSnapshot?.sourceMessageId),
    toolContentMacro: JSON.stringify(requestPayload, null, 2),
    extractedContent: JSON.stringify(requestPayload, null, 2),
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
    fillMode: isIncremental ? 'incremental' : 'full'
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

export async function runManualTableUpdate(configInput = null) {
  const config = normalizeTableWorkbenchConfig(configInput || getTableWorkbenchConfig());
  const validation = validateTableWorkbenchConfig(config);
  const draftValidation = validateTableDraftDeep({
    tables: Array.isArray(config.tables) ? config.tables : []
  });
  if (!validation.valid || !draftValidation.valid) {
    const errors = [...validation.errors, ...draftValidation.errors];
    updateTableWorkbenchRuntime({
      lastStatus: TABLE_WORKBENCH_RUNTIME_STATUS.ERROR,
      lastRunAt: Date.now(),
      lastDurationMs: 0,
      lastError: errors[0] || '填表配置无效。',
      lastErrorDetails: errors,
      lastValidationSummary: draftValidation.summary || { errorCount: errors.length, warningCount: 0 },
      errorCount: Number(config?.runtime?.errorCount) || 0
    });
    return { success: false, error: errors.join('\n'), errors };
  }

  const runtime = config.runtime || {};
  const startedAt = Date.now();
  updateTableWorkbenchRuntime({
    lastStatus: TABLE_WORKBENCH_RUNTIME_STATUS.RUNNING,
    lastError: '',
    lastErrorDetails: [],
    lastValidationSummary: draftValidation.summary || { errorCount: 0, warningCount: 0 }
  });

  try {
    const executionContext = await buildExecutionContextForLatestAssistant({
      runSource: TABLE_RUN_SOURCES.MANUAL
    });
    const targetSnapshot = resolveTableTargetFromExecutionContext(executionContext, {
      runSource: TABLE_RUN_SOURCES.MANUAL
    });

    if (!targetSnapshot) {
      throw new Error('当前没有可用的 assistant 目标楼层。');
    }

    const resolvedResult = await recordResolvedTarget(targetSnapshot);
    if (!resolvedResult?.success) {
      throw new Error(resolvedResult?.error || '目标解析记录失败');
    }

    const assistantSnapshot = getAssistantTableSnapshot(targetSnapshot.sourceMessageId);
    const loadResult = loadBoundStateOrTemplate(targetSnapshot, {
      templateTables: config.tables
    });

    const previousResult = getPreviousTableState(targetSnapshot);
    const previousTables = previousResult?.state?.tables || loadResult?.state?.tables || [];

    const request = await buildRequest({
      executionContext,
      targetSnapshot,
      loadResult,
      config,
      assistantSnapshot
    });
    const responseText = await sendRequest(request.messages, config);

    const parsed = sanitizeAIResponse(responseText);

    let nextTables;
    let diff = null;
    let fillMode = request.fillMode || 'full';

    if (parsed.mode === 'incremental' && parsed.edits) {
      const locks = getLocks(loadResult?.state);
      const sortedEdits = sortEdits(parsed.edits);
      nextTables = applyIncrementalEdits(previousTables, sortedEdits, locks);
      fillMode = 'incremental';
    } else if (parsed.mode === 'full' && parsed.tables) {
      nextTables = cloneTableValue(parsed.tables);
      fillMode = 'full';
    } else {
      nextTables = previousTables;
    }

    diff = computeTableDiff(previousTables, nextTables);

    const writeback = await writeTableState({
      targetSnapshot,
      nextTables,
      config,
      loadResult,
      diff,
      fillMode
    });

    if (!writeback?.success) {
      throw new Error(writeback?.error || '结构化写回失败');
    }

    const durationMs = Date.now() - startedAt;
    updateTableWorkbenchRuntime({
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
      lastFillMode: fillMode
    });

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
      state: writeback.state,
      bindings: writeback.bindings,
      mirrorResult: writeback.mirrorResult,
      warning: writeback.warning || ''
    };
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    updateTableWorkbenchRuntime({
      lastStatus: TABLE_WORKBENCH_RUNTIME_STATUS.ERROR,
      lastRunAt: Date.now(),
      lastDurationMs: durationMs,
      lastError: error?.message || String(error),
      lastErrorDetails: [error?.message || String(error)],
      lastValidationSummary: draftValidation.summary || { errorCount: 0, warningCount: 0 },
      successCount: Number(runtime.successCount) || 0,
      errorCount: (Number(runtime.errorCount) || 0) + 1
    });

    return {
      success: false,
      error: error?.message || String(error),
      errors: [error?.message || String(error)]
    };
  }
}

export default {
  buildRequest,
  sendRequest,
  parsePatch,
  sortEdits,
  applyIncrementalEdits,
  runManualTableUpdate
};
