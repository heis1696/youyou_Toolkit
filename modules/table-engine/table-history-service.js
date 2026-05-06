/**
 * YouYou Toolkit - 填表历史重建服务
 * @description 基于消息绑定态重建当前 assistant 目标的表状态来源
 */

import {
  TABLE_MESSAGE_STATE_KEY,
  TABLE_STATE_LOAD_MODE,
  TABLE_STATE_SOURCE_KIND,
  cloneTableValue,
  createEmptyTableBoundState,
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

export function resolveHistoricalTableState({ runtime, targetSnapshot, currentMessageIndex = -1, templateTables = [] } = {}) {
  const chat = Array.isArray(runtime?.chat) ? runtime.chat : [];
  const targetRevisionKey = normalizeString(targetSnapshot?.slotRevisionKey, '');
  const targetBindingKey = normalizeString(targetSnapshot?.slotBindingKey, '');

  if (currentMessageIndex >= 0 && currentMessageIndex < chat.length) {
    const currentState = normalizeTableBoundState(chat[currentMessageIndex]?.[TABLE_MESSAGE_STATE_KEY]);
    if (currentState && normalizeString(currentState.slotRevisionKey, '') === targetRevisionKey) {
      return buildLoadResult({
        loadMode: TABLE_STATE_LOAD_MODE.EXACT,
        mergeBaseOnly: false,
        state: withMeta(currentState, {
          sourceKind: TABLE_STATE_SOURCE_KIND.EXACT,
          resolvedFromMessageId: currentState.sourceMessageId,
          resolvedFromRevisionKey: currentState.slotRevisionKey
        }),
        sourceKind: TABLE_STATE_SOURCE_KIND.EXACT,
        resolvedFromMessageId: currentState.sourceMessageId,
        resolvedFromRevisionKey: currentState.slotRevisionKey
      });
    }

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

  if (currentMessageIndex > 0) {
    for (let index = currentMessageIndex - 1; index >= 0; index -= 1) {
      const message = chat[index];
      if (!isAssistantMessage(message)) continue;
      const previousState = normalizeTableBoundState(message?.[TABLE_MESSAGE_STATE_KEY]);
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

  if (Array.isArray(templateTables)) {
    return buildLoadResult({
      loadMode: TABLE_STATE_LOAD_MODE.TEMPLATE,
      mergeBaseOnly: false,
      state: createEmptyTableBoundState(targetSnapshot, {
        tables: cloneTableValue(templateTables),
        meta: {
          fromTemplate: true,
          sourceKind: TABLE_STATE_SOURCE_KIND.TEMPLATE,
          resolvedFromMessageId: '',
          resolvedFromRevisionKey: ''
        }
      }),
      sourceKind: TABLE_STATE_SOURCE_KIND.TEMPLATE
    });
  }

  return buildLoadResult({
    loadMode: TABLE_STATE_LOAD_MODE.EMPTY,
    mergeBaseOnly: false,
    state: createEmptyTableBoundState(targetSnapshot, {
      meta: {
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
