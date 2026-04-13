/**
 * YouYou Toolkit - 填表工作台类型与常量
 * @description 为 table domain 提供最小 Phase 1 数据模型定义
 */

export const TABLE_MESSAGE_STATE_KEY = 'YouYouToolkit_tableState';
export const TABLE_MESSAGE_BINDINGS_KEY = 'YouYouToolkit_tableBindings';

export const TABLE_RUN_SOURCES = Object.freeze({
  MANUAL: 'MANUAL_TABLE',
  AUTO: 'AUTO_TABLE'
});

export const TABLE_STATE_LOAD_MODE = Object.freeze({
  EXACT: 'exact',
  BINDING_FALLBACK: 'binding_fallback',
  TEMPLATE: 'template',
  EMPTY: 'empty'
});

function normalizeIdentityValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

export function cloneTableValue(value) {
  if (value === undefined) {
    return undefined;
  }

  try {
    return JSON.parse(JSON.stringify(value));
  } catch (_) {
    return value;
  }
}

export function createTableTargetPointer(snapshot = {}) {
  return {
    chatId: normalizeIdentityValue(snapshot.chatId),
    sourceMessageId: normalizeIdentityValue(snapshot.sourceMessageId || snapshot.messageId),
    sourceSwipeId: normalizeIdentityValue(snapshot.sourceSwipeId || snapshot.effectiveSwipeId),
    effectiveSwipeId: normalizeIdentityValue(snapshot.effectiveSwipeId || snapshot.sourceSwipeId),
    slotBindingKey: normalizeIdentityValue(snapshot.slotBindingKey),
    slotRevisionKey: normalizeIdentityValue(snapshot.slotRevisionKey),
    slotTransactionId: normalizeIdentityValue(snapshot.slotTransactionId),
    traceId: normalizeIdentityValue(snapshot.traceId),
    resolvedAt: Number.isFinite(snapshot.resolvedAt) ? snapshot.resolvedAt : Date.now()
  };
}

export function createTableTargetSnapshot(input = {}) {
  return {
    resolvedAt: Number.isFinite(input.resolvedAt) ? input.resolvedAt : Date.now(),
    runSource: normalizeIdentityValue(input.runSource) || TABLE_RUN_SOURCES.MANUAL,
    traceId: normalizeIdentityValue(input.traceId),
    chatId: normalizeIdentityValue(input.chatId),
    sourceMessageId: normalizeIdentityValue(input.sourceMessageId || input.messageId),
    sourceSwipeId: normalizeIdentityValue(input.sourceSwipeId || input.effectiveSwipeId),
    effectiveSwipeId: normalizeIdentityValue(input.effectiveSwipeId || input.sourceSwipeId) || 'swipe:current',
    slotBindingKey: normalizeIdentityValue(input.slotBindingKey),
    slotRevisionKey: normalizeIdentityValue(input.slotRevisionKey),
    slotTransactionId: normalizeIdentityValue(input.slotTransactionId),
    assistantContentFingerprint: normalizeIdentityValue(input.assistantContentFingerprint),
    assistantBaseFingerprint: normalizeIdentityValue(input.assistantBaseFingerprint),
    assistantText: String(input.assistantText || ''),
    assistantBaseText: String(input.assistantBaseText || ''),
    targetMessageIndex: Number.isFinite(input.targetMessageIndex) ? input.targetMessageIndex : -1
  };
}

export function normalizeTableBoundState(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return {
    slotBindingKey: normalizeIdentityValue(value.slotBindingKey),
    slotRevisionKey: normalizeIdentityValue(value.slotRevisionKey),
    sourceMessageId: normalizeIdentityValue(value.sourceMessageId),
    sourceSwipeId: normalizeIdentityValue(value.sourceSwipeId),
    tables: Array.isArray(value.tables) ? cloneTableValue(value.tables) : [],
    updatedAt: Number.isFinite(value.updatedAt) ? value.updatedAt : 0,
    meta: value.meta && typeof value.meta === 'object' ? cloneTableValue(value.meta) : {}
  };
}

export function createEmptyTableBoundState(targetSnapshot = {}, overrides = {}) {
  const snapshot = createTableTargetSnapshot(targetSnapshot);

  return {
    slotBindingKey: snapshot.slotBindingKey,
    slotRevisionKey: snapshot.slotRevisionKey,
    sourceMessageId: snapshot.sourceMessageId,
    sourceSwipeId: snapshot.sourceSwipeId || snapshot.effectiveSwipeId,
    tables: Array.isArray(overrides.tables) ? cloneTableValue(overrides.tables) : [],
    updatedAt: Number.isFinite(overrides.updatedAt) ? overrides.updatedAt : Date.now(),
    meta: overrides.meta && typeof overrides.meta === 'object' ? cloneTableValue(overrides.meta) : {}
  };
}

export function normalizeTableBindings(value) {
  if (!value || typeof value !== 'object') {
    return {
      lastResolvedTarget: null,
      lastCommittedTarget: null,
      updatedAt: 0
    };
  }

  return {
    lastResolvedTarget: value.lastResolvedTarget ? createTableTargetPointer(value.lastResolvedTarget) : null,
    lastCommittedTarget: value.lastCommittedTarget ? createTableTargetPointer(value.lastCommittedTarget) : null,
    updatedAt: Number.isFinite(value.updatedAt) ? value.updatedAt : 0
  };
}

export default {
  TABLE_MESSAGE_STATE_KEY,
  TABLE_MESSAGE_BINDINGS_KEY,
  TABLE_RUN_SOURCES,
  TABLE_STATE_LOAD_MODE,
  cloneTableValue,
  createTableTargetPointer,
  createTableTargetSnapshot,
  normalizeTableBoundState,
  createEmptyTableBoundState,
  normalizeTableBindings
};
