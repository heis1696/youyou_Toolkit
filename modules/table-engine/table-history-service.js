/**
 * YouYou Toolkit - 填表历史重建服务
 *
 * 议题 #15 修订版（v1.0.169+）：
 *   - 倒序遍历按 isolationKey 过滤（对应议题 #15 #24 任务）
 *   - 兼容旧无 isolation 数据（视为 DEFAULT_ISOLATION_KEY 桶）
 *
 * 决议流程（对标 shujuku loadBatchBaseData）：
 *   1. EXACT — 当前楼层精确匹配 slotRevisionKey
 *   2. BINDING_FALLBACK — 当前楼层 slotBindingKey 匹配（不同 swipe 之间）
 *   3. HISTORY — 倒序遍历 chatHistory 找最近带数据的 assistant 消息（按 iso 过滤）
 *   4. TEMPLATE — 用传入模板兜底
 *   5. EMPTY — 全失败返回空状态
 */

import {
  TABLE_MESSAGE_STATE_KEY,
  TABLE_STATE_LOAD_MODE,
  TABLE_STATE_SOURCE_KIND,
  DEFAULT_ISOLATION_KEY,
  cloneTableValue,
  createEmptyTableBoundState,
  normalizeIsolationKey,
  normalizeTableBoundState
} from './table-types.js';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function isAssistantMessage(message) {
  if (!message) return false;
  if (message?.is_user === true || message?.is_system === true) return false;
  const role = String(message?.role || '').trim().toLowerCase();
  return role === 'assistant' || role === 'ai' || !role;
}

/**
 * 旧格式检测：直接是 TableBoundState（非 isolationBuckets）
 * 与 state-service.isLegacyBoundState 保持一致
 */
function isLegacyBoundState(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  if (Array.isArray(value.tables)) return true;
  if (typeof value.chatId === 'string' && value.chatId.length > 0) return true;
  if (typeof value.slotBindingKey === 'string' && value.slotBindingKey.length > 0) return true;
  return false;
}

/**
 * 从 message 读取指定 isolation 的 state 桶
 * 兼容旧格式：旧的视为 DEFAULT_ISOLATION_KEY 桶
 */
function readStateForIsolation(message, isolationKey) {
  if (!message) return null;
  const raw = message[TABLE_MESSAGE_STATE_KEY];
  if (!raw) return null;
  const iso = normalizeIsolationKey(isolationKey);
  if (isLegacyBoundState(raw)) {
    return iso === DEFAULT_ISOLATION_KEY ? raw : null;
  }
  return raw[iso] || null;
}

function buildLoadResult({
  loadMode = TABLE_STATE_LOAD_MODE.EMPTY,
  mergeBaseOnly = false,
  state = null,
  sourceKind = TABLE_STATE_SOURCE_KIND.EMPTY,
  resolvedFromMessageId = '',
  resolvedFromRevisionKey = ''
} = {}) {
  const normalizedState = normalizeTableBoundState(state) || null;
  return {
    loadMode,
    mergeBaseOnly,
    state: normalizedState,
    sourceKind,
    resolvedFromMessageId: normalizeString(resolvedFromMessageId, normalizedState?.sourceMessageId || ''),
    resolvedFromRevisionKey: normalizeString(resolvedFromRevisionKey, normalizedState?.slotRevisionKey || '')
  };
}

function withMeta(state, extraMeta = {}) {
  const normalizedState = normalizeTableBoundState(state);
  if (!normalizedState) return null;
  return normalizeTableBoundState({
    ...normalizedState,
    meta: {
      ...(normalizedState.meta || {}),
      ...(extraMeta || {})
    }
  });
}

/**
 * 按 isolationKey 解析当前 target 的历史状态
 *
 * @param {Object} params
 * @param {Object} params.runtime - { chat: [] }
 * @param {Object} params.targetSnapshot
 * @param {number} params.currentMessageIndex
 * @param {Array} [params.templateTables]
 * @param {string} [params.isolationKey] - 议题 #15 新增；默认 DEFAULT_ISOLATION_KEY
 */
export function resolveHistoricalTableState({
  runtime,
  targetSnapshot,
  currentMessageIndex = -1,
  templateTables = [],
  isolationKey
} = {}) {
  const chat = Array.isArray(runtime?.chat) ? runtime.chat : [];
  const targetRevisionKey = normalizeString(targetSnapshot?.slotRevisionKey, '');
  const targetBindingKey = normalizeString(targetSnapshot?.slotBindingKey, '');
  const iso = normalizeIsolationKey(isolationKey === undefined ? '' : isolationKey);

  // 1. EXACT — 当前楼层精确匹配
  if (currentMessageIndex >= 0 && currentMessageIndex < chat.length) {
    const currentRaw = readStateForIsolation(chat[currentMessageIndex], iso);
    const currentState = normalizeTableBoundState(currentRaw);

    if (currentState && normalizeString(currentState.slotRevisionKey, '') === targetRevisionKey) {
      return buildLoadResult({
        loadMode: TABLE_STATE_LOAD_MODE.EXACT,
        mergeBaseOnly: false,
        state: withMeta(currentState, {
          sourceKind: TABLE_STATE_SOURCE_KIND.EXACT,
          isolationKey: iso,
          resolvedFromMessageId: currentState.sourceMessageId,
          resolvedFromRevisionKey: currentState.slotRevisionKey
        }),
        sourceKind: TABLE_STATE_SOURCE_KIND.EXACT,
        resolvedFromMessageId: currentState.sourceMessageId,
        resolvedFromRevisionKey: currentState.slotRevisionKey
      });
    }

    // 2. BINDING_FALLBACK — 同 slot binding 但不同 revision（swipe 变化）
    if (currentState && normalizeString(currentState.slotBindingKey, '') === targetBindingKey) {
      const fallbackState = withMeta({
        ...currentState,
        slotRevisionKey: targetRevisionKey || currentState.slotRevisionKey,
        sourceSwipeId: normalizeString(targetSnapshot?.sourceSwipeId || targetSnapshot?.effectiveSwipeId, currentState.sourceSwipeId),
        meta: {
          ...(currentState.meta || {}),
          sourceKind: TABLE_STATE_SOURCE_KIND.BINDING,
          mergeBaseOnly: true,
          fallbackFromBinding: true,
          isolationKey: iso,
          fallbackFromRevisionKey: normalizeString(currentState.slotRevisionKey, ''),
          requestedRevisionKey: targetRevisionKey,
          resolvedFromMessageId: currentState.sourceMessageId,
          resolvedFromRevisionKey: currentState.slotRevisionKey
        }
      });
      return buildLoadResult({
        loadMode: TABLE_STATE_LOAD_MODE.BINDING_FALLBACK,
        mergeBaseOnly: true,
        state: fallbackState,
        sourceKind: TABLE_STATE_SOURCE_KIND.BINDING,
        resolvedFromMessageId: currentState.sourceMessageId,
        resolvedFromRevisionKey: currentState.slotRevisionKey
      });
    }
  }

  // 3. HISTORY — 倒序遍历 chat 找最近带数据的 assistant 消息（按 iso 过滤）
  // 议题 #15 #24 任务：shujuku loadBatchBaseData 风格倒序回溯
  if (currentMessageIndex > 0) {
    for (let index = currentMessageIndex - 1; index >= 0; index -= 1) {
      const message = chat[index];
      if (!isAssistantMessage(message)) continue;
      const previousRaw = readStateForIsolation(message, iso);
      const previousState = normalizeTableBoundState(previousRaw);
      if (!previousState || !Array.isArray(previousState.tables) || previousState.tables.length === 0) continue;

      const historyState = withMeta({
        ...previousState,
        slotBindingKey: targetBindingKey || previousState.slotBindingKey,
        slotRevisionKey: targetRevisionKey || previousState.slotRevisionKey,
        sourceSwipeId: normalizeString(targetSnapshot?.sourceSwipeId || targetSnapshot?.effectiveSwipeId, previousState.sourceSwipeId),
        meta: {
          ...(previousState.meta || {}),
          sourceKind: TABLE_STATE_SOURCE_KIND.HISTORY,
          mergeBaseOnly: true,
          reconstructedFromHistory: true,
          isolationKey: iso,
          resolvedFromMessageId: previousState.sourceMessageId,
          resolvedFromRevisionKey: previousState.slotRevisionKey
        }
      });
      return buildLoadResult({
        loadMode: TABLE_STATE_LOAD_MODE.HISTORY,
        mergeBaseOnly: true,
        state: historyState,
        sourceKind: TABLE_STATE_SOURCE_KIND.HISTORY,
        resolvedFromMessageId: previousState.sourceMessageId,
        resolvedFromRevisionKey: previousState.slotRevisionKey
      });
    }
  }

  // 4. TEMPLATE — 用模板兜底
  if (Array.isArray(templateTables) && templateTables.length > 0) {
    return buildLoadResult({
      loadMode: TABLE_STATE_LOAD_MODE.TEMPLATE,
      mergeBaseOnly: false,
      state: createEmptyTableBoundState(targetSnapshot, {
        tables: cloneTableValue(templateTables),
        meta: {
          fromTemplate: true,
          isolationKey: iso,
          sourceKind: TABLE_STATE_SOURCE_KIND.TEMPLATE,
          resolvedFromMessageId: '',
          resolvedFromRevisionKey: ''
        }
      }),
      sourceKind: TABLE_STATE_SOURCE_KIND.TEMPLATE
    });
  }

  // 5. EMPTY — 全部失败
  return buildLoadResult({
    loadMode: TABLE_STATE_LOAD_MODE.EMPTY,
    mergeBaseOnly: false,
    state: createEmptyTableBoundState(targetSnapshot, {
      meta: {
        isolationKey: iso,
        sourceKind: TABLE_STATE_SOURCE_KIND.EMPTY,
        resolvedFromMessageId: '',
        resolvedFromRevisionKey: ''
      }
    }),
    sourceKind: TABLE_STATE_SOURCE_KIND.EMPTY
  });
}

export default {
  resolveHistoricalTableState
};
