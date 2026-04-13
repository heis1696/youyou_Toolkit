/**
 * YouYou Toolkit - 填表更新服务
 * @description 负责最小手动填表请求构建、响应解析与执行主链
 */

import { buildExecutionContextForLatestAssistant } from '../tool-execution-context.js';
import { contextInjector } from '../context-injector.js';
import { hasEffectiveApiPreset, sendApiRequest, sendWithPreset } from '../api-connection.js';
import { toolPromptService } from '../tool-prompt-service.js';
import { cloneTableValue, TABLE_RUN_SOURCES } from './table-types.js';
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
  TABLE_WORKBENCH_RUNTIME_STATUS
} from './table-schema-service.js';
import { writeTableState } from './table-writeback-service.js';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function formatRecentMessages(messages = [], limit = 8) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return '';
  }

  return messages
    .slice(Math.max(messages.length - limit, 0))
    .map((message) => `[${normalizeString(message?.role, 'unknown')}] ${String(message?.content || '').trim()}`)
    .filter(Boolean)
    .join('\n\n');
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

function extractJsonCandidates(responseText = '') {
  const text = String(responseText || '').trim();
  if (!text) return [];

  const candidates = [];
  const pushCandidate = (value) => {
    const normalized = String(value || '').trim();
    if (!normalized) return;
    if (!candidates.includes(normalized)) {
      candidates.push(normalized);
    }
  };

  const fencedBlocks = text.match(/```(?:json)?\s*([\s\S]*?)```/gi) || [];
  fencedBlocks.forEach((block) => {
    const inner = block.replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
    pushCandidate(inner);
  });

  pushCandidate(text);

  const firstObjectStart = text.indexOf('{');
  const lastObjectEnd = text.lastIndexOf('}');
  if (firstObjectStart >= 0 && lastObjectEnd > firstObjectStart) {
    pushCandidate(text.slice(firstObjectStart, lastObjectEnd + 1));
  }

  const firstArrayStart = text.indexOf('[');
  const lastArrayEnd = text.lastIndexOf(']');
  if (firstArrayStart >= 0 && lastArrayEnd > firstArrayStart) {
    pushCandidate(text.slice(firstArrayStart, lastArrayEnd + 1));
  }

  return candidates;
}

function parseTablesFromJson(parsed) {
  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (parsed && typeof parsed === 'object') {
    if (Array.isArray(parsed.tables)) {
      return parsed.tables;
    }

    if (parsed.data && typeof parsed.data === 'object' && Array.isArray(parsed.data.tables)) {
      return parsed.data.tables;
    }
  }

  return null;
}

export function parsePatch(responseText = '') {
  const candidates = extractJsonCandidates(responseText);
  const errors = [];

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      const tables = parseTablesFromJson(parsed);
      if (!Array.isArray(tables)) {
        errors.push('JSON 中缺少 tables 数组。');
        continue;
      }

      return {
        tables: cloneTableValue(tables),
        parsed
      };
    } catch (error) {
      errors.push(error?.message || String(error));
    }
  }

  throw new Error(errors[0] || '无法从模型响应中解析 tables JSON。');
}

export async function buildRequest({ executionContext, targetSnapshot, loadResult, config, assistantSnapshot } = {}) {
  const normalizedConfig = normalizeTableWorkbenchConfig(config);
  const toolConfig = buildTableWorkbenchToolConfig(normalizedConfig);
  const requestPayload = buildRequestPayload(targetSnapshot, loadResult);
  const previousTables = Array.isArray(assistantSnapshot?.tableState?.tables)
    ? cloneTableValue(assistantSnapshot.tableState.tables)
    : [];

  const context = {
    ...executionContext,
    toolName: '填表工作台',
    toolId: 'tableWorkbench',
    lastAiMessage: executionContext?.assistantBaseText || executionContext?.lastAiMessage || '',
    recentMessagesText: formatRecentMessages(executionContext?.chatHistory || executionContext?.chatMessages || []),
    rawRecentMessagesText: formatRecentMessages(executionContext?.chatHistory || executionContext?.chatMessages || [], 20),
    injectedContext: assistantSnapshot?.injectedContext || contextInjector.getLatestMessageInjectedContext(targetSnapshot?.sourceMessageId),
    toolContentMacro: JSON.stringify(requestPayload, null, 2),
    extractedContent: JSON.stringify(requestPayload, null, 2),
    previousToolOutput: JSON.stringify(previousTables, null, 2)
  };

  const messages = await toolPromptService.buildToolMessages(toolConfig, context);
  const promptText = await toolPromptService.buildPromptText(toolConfig, context);

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('填表请求消息构建失败。');
  }

  return {
    toolConfig,
    context,
    requestPayload,
    promptText,
    messages
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
  if (!validation.valid) {
    return {
      success: false,
      error: validation.errors.join('\n'),
      errors: validation.errors
    };
  }

  const runtime = config.runtime || {};
  const startedAt = Date.now();
  updateTableWorkbenchRuntime({
    lastStatus: TABLE_WORKBENCH_RUNTIME_STATUS.RUNNING,
    lastError: ''
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
    const request = await buildRequest({
      executionContext,
      targetSnapshot,
      loadResult,
      config,
      assistantSnapshot
    });
    const responseText = await sendRequest(request.messages, config);
    const parsed = parsePatch(responseText);
    const writeback = await writeTableState({
      targetSnapshot,
      nextTables: parsed.tables,
      config,
      loadResult
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
      successCount: (Number(runtime.successCount) || 0) + 1,
      errorCount: Number(runtime.errorCount) || 0,
      lastSourceMessageId: normalizeString(targetSnapshot.sourceMessageId),
      lastSlotRevisionKey: normalizeString(targetSnapshot.slotRevisionKey),
      lastLoadMode: normalizeString(loadResult.loadMode),
      lastMirrorApplied: writeback?.mirrorResult?.success === true
    });

    return {
      success: true,
      targetSnapshot,
      loadResult,
      request,
      responseText,
      parsed,
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
      successCount: Number(runtime.successCount) || 0,
      errorCount: (Number(runtime.errorCount) || 0) + 1
    });

    return {
      success: false,
      error: error?.message || String(error)
    };
  }
}

export default {
  buildRequest,
  sendRequest,
  parsePatch,
  runManualTableUpdate
};
