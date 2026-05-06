/**
 * YouYou Toolkit - 填表工作台类型与常量
 * @description 为 table domain 提供基础数据模型定义
 */

export const TABLE_MESSAGE_STATE_KEY = 'YouYouToolkit_tableState';
export const TABLE_MESSAGE_BINDINGS_KEY = 'YouYouToolkit_tableBindings';

export const TABLE_RUN_SOURCES = Object.freeze({
  MANUAL: 'MANUAL_TABLE',
  AUTO: 'AUTO_TABLE'
});

export const TABLE_RUN_SCOPE = Object.freeze({
  ENABLED: 'enabled',
  SELECTED: 'selected',
  CURRENT: 'current'
});

export const TABLE_STATE_LOAD_MODE = Object.freeze({
  EXACT: 'exact',
  BINDING_FALLBACK: 'binding_fallback',
  HISTORY: 'history',
  TEMPLATE: 'template',
  EMPTY: 'empty'
});

export const TABLE_STATE_SOURCE_KIND = Object.freeze({
  EXACT: 'exact',
  BINDING: 'binding',
  HISTORY: 'history',
  TEMPLATE: 'template',
  EMPTY: 'empty'
});

export const TABLE_EDIT_OPERATIONS = Object.freeze({
  INSERT_ROW: 'insertRow',
  UPDATE_ROW: 'updateRow',
  DELETE_ROW: 'deleteRow'
});

export const TABLE_LOCK_SCOPE = Object.freeze({
  CELL: 'cell',
  ROW: 'row',
  COLUMN: 'column'
});

function normalizeIdentityValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function createRuntimeId(prefix = 'table') {
  const normalizedPrefix = normalizeIdentityValue(prefix) || 'table';
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${normalizedPrefix}_${ts}_${rand}`;
}

export function createRuntimeTableId(prefix = 'table') {
  return createRuntimeId(prefix);
}

export function createRuntimeTableRowId(prefix = 'row') {
  return createRuntimeId(prefix);
}

export function ensureTableId(value, tableIndex = 0) {
  const normalized = normalizeIdentityValue(value);
  return normalized || `table_${Number.isFinite(tableIndex) ? tableIndex + 1 : 1}`;
}

export function ensureTableRowId(value, rowIndex = 0) {
  const normalized = normalizeIdentityValue(value);
  return normalized || `row_${Number.isFinite(rowIndex) ? rowIndex + 1 : 1}`;
}

export function createEditOperation(op, tableIndex, rowIndex, data) {
  return {
    op: normalizeIdentityValue(op),
    tableIndex: Number.isFinite(tableIndex) ? tableIndex : -1,
    rowIndex: Number.isFinite(rowIndex) ? rowIndex : -1,
    data: data && typeof data === 'object' ? cloneTableValue(data) : {}
  };
}

export function computeCellHash(tableIndex, rowIndex, columnKey) {
  return `${Number.isFinite(tableIndex) ? tableIndex : -1}:${Number.isFinite(rowIndex) ? rowIndex : -1}:${normalizeIdentityValue(columnKey) || '*'}`;
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
    chatId: normalizeIdentityValue(value.chatId),
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
  const overrideMeta = overrides.meta && typeof overrides.meta === 'object' ? cloneTableValue(overrides.meta) : {};

  return {
    chatId: snapshot.chatId,
    slotBindingKey: snapshot.slotBindingKey,
    slotRevisionKey: snapshot.slotRevisionKey,
    sourceMessageId: snapshot.sourceMessageId,
    sourceSwipeId: snapshot.sourceSwipeId || snapshot.effectiveSwipeId,
    tables: Array.isArray(overrides.tables) ? cloneTableValue(overrides.tables) : [],
    updatedAt: Number.isFinite(overrides.updatedAt) ? overrides.updatedAt : Date.now(),
    meta: {
      sourceKind: overrideMeta.sourceKind || TABLE_STATE_SOURCE_KIND.EMPTY,
      ...overrideMeta
    }
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
  TABLE_RUN_SCOPE,
  TABLE_STATE_LOAD_MODE,
  TABLE_STATE_SOURCE_KIND,
  TABLE_EDIT_OPERATIONS,
  TABLE_LOCK_SCOPE,
  cloneTableValue,
  createRuntimeTableId,
  createRuntimeTableRowId,
  ensureTableId,
  ensureTableRowId,
  createTableTargetPointer,
  createTableTargetSnapshot,
  normalizeTableBoundState,
  createEmptyTableBoundState,
  normalizeTableBindings,
  createEditOperation,
  computeCellHash
};
