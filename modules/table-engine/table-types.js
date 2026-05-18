/**
 * YouYou Toolkit - 填表工作台类型与常量
 * @description 为 table domain 提供基础数据模型定义
 *
 * 议题 #15 修订（v2026-05-18）：在保留旧 API 的前提下，新增 shujuku 对标抽象：
 *   - Sheet 数据结构（content[][] 严格 string|null）+ helpers
 *   - sourceData 5 段 AI 指令模板
 *   - updateConfig sentinel 值（-1 沿用全局 / 0 禁用）
 *   - 锁定类型扩展（行/列/单元格/索引列）+ scopeKey 复合
 *   - 模板作用域三模式（inherit_global / chat_override / preset_link）
 *   - isolationKey + chat[0] ScopedConfig + per-message IsolatedData 容器 key
 *   - 表 ID 双层（container key sheet_xxxx + uid）
 *
 * 设计约束：
 *   - 顶层仅常量定义 + 纯函数；不 import logger/storage（避免 esbuild __esm 循环依赖陷阱）
 *   - 所有现有 export 保持不动（12 个下游模块依赖）
 */

// ════════════════════════════════════════════════════════════════
// 旧 API（保留，下游 12 个模块依赖）
// ════════════════════════════════════════════════════════════════

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
  COLUMN: 'column',
  INDEX_COLUMN: 'index_column'  // 议题 #15 新增：索引列锁（纪要表专用，可选实现）
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

// ════════════════════════════════════════════════════════════════
// 新增（议题 #15 修订）：shujuku 对标抽象
// ════════════════════════════════════════════════════════════════

// ----- isolationKey 维度 -----
// 议题 #15 §B：每条消息按 isolationKey 分桶，切换 isolation 整库销毁重建。
// 默认空串 = 无 isolation，与 shujuku 一致。

export const DEFAULT_ISOLATION_KEY = '';

export function normalizeIsolationKey(value) {
  if (value === undefined || value === null) return DEFAULT_ISOLATION_KEY;
  const str = String(value).trim();
  return str === '' ? DEFAULT_ISOLATION_KEY : str;
}

// ----- chat-scope / per-message 存储字段 key -----
// shujuku 用 TavernDB_ACU_*；youyou 用 YouYouToolkit_* 前缀避免冲突。
// chat[0] 容器：YouYouToolkit_ScopedConfig（模板/Guide/archives）
// 每条消息：YouYouToolkit_IsolatedData[isolationKey].independentData[sheet_xxx]

export const TABLE_SCOPED_CONFIG_KEY = 'YouYouToolkit_ScopedConfig';
export const TABLE_ISOLATED_DATA_KEY = 'YouYouToolkit_IsolatedData';

// ----- 模板作用域三模式 -----
// 议题 #15 §A 修正：shujuku 实际是三模式（不是议题文档说的"双"）

export const TABLE_TEMPLATE_SCOPE_MODE = Object.freeze({
  INHERIT_GLOBAL: 'inherit_global',   // 用全局预设
  CHAT_OVERRIDE: 'chat_override',     // chat 内存完整快照
  PRESET_LINK: 'preset_link'          // chat 内仅存预设名，运行时解引用
});

// 每个 isolationKey 内最多保留多少份模板历史归档（shujuku 默认 8）
export const MAX_TEMPLATE_ARCHIVES_PER_ISOLATION = 8;

// ----- Sheet 数据结构（shujuku Sheet_ACU 对标）-----
// 议题 #15 §3：content 严格 (string | null)[][]，content[0][0] 固定 'row_id'
// 表 ID 双层：容器 key = 'sheet_xxxx'（字典序位置由此） + uid（脱离 key 的真正 ID）

export const SHEET_ROW_ID_COLUMN = 'row_id';
export const SHEET_CONTAINER_KEY_PREFIX = 'sheet_';

export function makeSheetContainerKey(seedOrUid) {
  const seed = normalizeIdentityValue(seedOrUid);
  if (seed) return `${SHEET_CONTAINER_KEY_PREFIX}${seed.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 16) || Math.random().toString(36).slice(2, 8)}`;
  return `${SHEET_CONTAINER_KEY_PREFIX}${Math.random().toString(36).slice(2, 8)}`;
}

export function isSheetContainerKey(value) {
  return typeof value === 'string' && value.startsWith(SHEET_CONTAINER_KEY_PREFIX);
}

export function createSheetUid() {
  return createRuntimeId('sheet');
}

// sourceData 5 段 AI 指令（shujuku 严格对标）
export const SHEET_SOURCE_DATA_KEYS = Object.freeze({
  NOTE: 'note',               // 表说明
  INIT_NODE: 'initNode',      // 初始化指令
  INSERT_NODE: 'insertNode',  // 新增指令
  UPDATE_NODE: 'updateNode',  // 更新指令
  DELETE_NODE: 'deleteNode'   // 删除指令
});

export function createEmptySheetSourceData() {
  return {
    [SHEET_SOURCE_DATA_KEYS.NOTE]: '',
    [SHEET_SOURCE_DATA_KEYS.INIT_NODE]: '',
    [SHEET_SOURCE_DATA_KEYS.INSERT_NODE]: '',
    [SHEET_SOURCE_DATA_KEYS.UPDATE_NODE]: '',
    [SHEET_SOURCE_DATA_KEYS.DELETE_NODE]: ''
  };
}

// updateConfig sentinel 值（shujuku 约定）
export const SHEET_UPDATE_CONFIG_SENTINEL = Object.freeze({
  INHERIT_GLOBAL: -1,  // 沿用全局设置
  DISABLED: 0          // 禁用该项
});

export function createDefaultSheetUpdateConfig() {
  return {
    uiSentinel: SHEET_UPDATE_CONFIG_SENTINEL.INHERIT_GLOBAL,
    contextDepth: SHEET_UPDATE_CONFIG_SENTINEL.INHERIT_GLOBAL,
    updateFrequency: SHEET_UPDATE_CONFIG_SENTINEL.INHERIT_GLOBAL,
    batchSize: SHEET_UPDATE_CONFIG_SENTINEL.INHERIT_GLOBAL,
    skipFloors: SHEET_UPDATE_CONFIG_SENTINEL.DISABLED
  };
}

export function createDefaultSheetExportConfig() {
  return {
    enabled: false,
    entryName: '',
    entryType: 'constant',
    keywords: [],
    injectionTemplate: '',
    position: 0,
    depth: 0,
    order: 100
  };
}

/**
 * 创建一个空 Sheet（shujuku Sheet_ACU 对标）
 * @param {Object} options
 * @param {string} [options.uid] - 表唯一 ID
 * @param {string} options.name - 表显示名
 * @param {string[]} [options.columns] - 列名列表（不含 row_id）
 * @param {Array<Array<string|null>>} [options.dataRows] - 数据行（不含表头）
 * @param {number} [options.orderNo]
 * @returns {Object} Sheet
 */
export function createSheet({ uid, name, columns = [], dataRows = [], orderNo = 0 } = {}) {
  const sheetUid = normalizeIdentityValue(uid) || createSheetUid();
  const sheetName = normalizeIdentityValue(name) || sheetUid;
  const header = [SHEET_ROW_ID_COLUMN, ...columns.map((c) => normalizeIdentityValue(c))];
  const rows = Array.isArray(dataRows) ? dataRows.map((row) => normalizeSheetRow(row, header.length)) : [];

  return {
    uid: sheetUid,
    name: sheetName,
    content: [header, ...rows],
    sourceData: createEmptySheetSourceData(),
    updateConfig: createDefaultSheetUpdateConfig(),
    exportConfig: createDefaultSheetExportConfig(),
    orderNo: Number.isFinite(orderNo) ? orderNo : 0,
    seedRows: undefined
  };
}

/**
 * 规范化 Sheet 对象，兜底默认字段
 */
export function normalizeSheet(value) {
  if (!value || typeof value !== 'object') return null;

  const uid = normalizeIdentityValue(value.uid) || createSheetUid();
  const name = normalizeIdentityValue(value.name) || uid;
  const rawContent = Array.isArray(value.content) ? value.content : [];

  // 表头规范化：content[0] 必须存在，第一列必须是 'row_id'
  const header = Array.isArray(rawContent[0]) ? rawContent[0].slice() : [SHEET_ROW_ID_COLUMN];
  if (header[0] !== SHEET_ROW_ID_COLUMN) header.unshift(SHEET_ROW_ID_COLUMN);
  const colCount = header.length;

  // 数据行规范化
  const dataRows = rawContent.slice(1).map((row) => normalizeSheetRow(row, colCount));

  return {
    uid,
    name,
    content: [header, ...dataRows],
    sourceData: normalizeSheetSourceData(value.sourceData),
    updateConfig: normalizeSheetUpdateConfig(value.updateConfig),
    exportConfig: normalizeSheetExportConfig(value.exportConfig),
    orderNo: Number.isFinite(value.orderNo) ? value.orderNo : 0,
    seedRows: Array.isArray(value.seedRows) ? value.seedRows.map((r) => normalizeSheetRow(r, colCount)) : undefined
  };
}

function normalizeSheetRow(row, colCount) {
  const out = new Array(colCount).fill(null);
  if (!Array.isArray(row)) return out;
  for (let i = 0; i < colCount; i++) {
    const v = row[i];
    if (v === undefined || v === null) {
      out[i] = null;
    } else {
      out[i] = String(v);
    }
  }
  return out;
}

function normalizeSheetSourceData(value) {
  const base = createEmptySheetSourceData();
  if (!value || typeof value !== 'object') return base;
  for (const key of Object.values(SHEET_SOURCE_DATA_KEYS)) {
    if (value[key] !== undefined && value[key] !== null) {
      base[key] = String(value[key]);
    }
  }
  return base;
}

function normalizeSheetUpdateConfig(value) {
  const base = createDefaultSheetUpdateConfig();
  if (!value || typeof value !== 'object') return base;
  for (const k of Object.keys(base)) {
    if (Number.isFinite(value[k])) base[k] = value[k];
  }
  return base;
}

function normalizeSheetExportConfig(value) {
  const base = createDefaultSheetExportConfig();
  if (!value || typeof value !== 'object') return base;
  if (typeof value.enabled === 'boolean') base.enabled = value.enabled;
  if (typeof value.entryName === 'string') base.entryName = value.entryName;
  if (typeof value.entryType === 'string') base.entryType = value.entryType;
  if (Array.isArray(value.keywords)) base.keywords = value.keywords.map((k) => String(k));
  if (typeof value.injectionTemplate === 'string') base.injectionTemplate = value.injectionTemplate;
  if (Number.isFinite(value.position)) base.position = value.position;
  if (Number.isFinite(value.depth)) base.depth = value.depth;
  if (Number.isFinite(value.order)) base.order = value.order;
  return base;
}

export function cloneSheet(sheet) {
  return cloneTableValue(sheet);
}

// ----- Sheet 数据访问 helpers -----

export function getSheetHeader(sheet) {
  return Array.isArray(sheet?.content?.[0]) ? sheet.content[0] : [];
}

export function getSheetDataRows(sheet) {
  return Array.isArray(sheet?.content) ? sheet.content.slice(1) : [];
}

export function getSheetColumnCount(sheet) {
  return getSheetHeader(sheet).length;
}

export function getSheetRowCount(sheet) {
  return Math.max(0, (Array.isArray(sheet?.content) ? sheet.content.length : 1) - 1);
}

export function getSheetCell(sheet, rowIndex, colIndex) {
  // rowIndex 0 基（不含表头），colIndex 0 基
  if (!sheet || !Array.isArray(sheet.content)) return null;
  const row = sheet.content[rowIndex + 1];
  if (!Array.isArray(row)) return null;
  return row[colIndex] ?? null;
}

export function setSheetCell(sheet, rowIndex, colIndex, value) {
  if (!sheet || !Array.isArray(sheet.content)) return false;
  const row = sheet.content[rowIndex + 1];
  if (!Array.isArray(row)) return false;
  row[colIndex] = value === null || value === undefined ? null : String(value);
  return true;
}

// ----- DSL 操作（议题 #15 §4 修正版语法）-----
// shujuku DSL 实际格式（不是议题文档说的数组语法）：
//   insertRow(tableIndex, {"0":"v1","1":"v2"})    — tableIndex 0 基整数；data 键 = 列索引字符串
//   updateRow(tableIndex, rowIndex, {"1":"新值"})  — 只列要改的键 = "null=字段不变"
//   deleteRow(tableIndex, rowIndex)

/**
 * 创建一个标准化的 DSL 解析结果
 */
export function createDslEdit({ op, tableIndex, rowIndex = -1, data = {} } = {}) {
  return {
    op: normalizeIdentityValue(op),
    tableIndex: Number.isFinite(tableIndex) ? tableIndex : -1,
    rowIndex: Number.isFinite(rowIndex) ? rowIndex : -1,
    data: data && typeof data === 'object' ? cloneTableValue(data) : {}
  };
}

// ----- 锁定 scopeKey 复合（shujuku `${chatKey}::${isolationKey}`）-----

export function makeLockScopeKey(chatKey, isolationKey) {
  const c = normalizeIdentityValue(chatKey);
  const i = normalizeIsolationKey(isolationKey);
  return `${c}::${i}`;
}

export function parseLockScopeKey(scopeKey) {
  const str = normalizeIdentityValue(scopeKey);
  const idx = str.indexOf('::');
  if (idx === -1) return { chatKey: str, isolationKey: DEFAULT_ISOLATION_KEY };
  return {
    chatKey: str.slice(0, idx),
    isolationKey: str.slice(idx + 2) || DEFAULT_ISOLATION_KEY
  };
}

/**
 * 创建一个空的锁状态（四级锁分桶）
 * shujuku helpers-table-lock.ts 风格：rows[] / cols[] / cells[] + specialIndex toggle
 */
export function createEmptySheetLockState() {
  return {
    rows: [],          // 锁定行索引集合（数据行 0 基）
    cols: [],          // 锁定列索引集合（不含 row_id 列）
    cells: [],         // 单元格集合 ["rowIndex:colIndex", ...]
    indexColumn: false // 索引列锁（纪要表自增编号专用）
  };
}

export function makeCellLockKey(rowIndex, colIndex) {
  return `${Number.isFinite(rowIndex) ? rowIndex : -1}:${Number.isFinite(colIndex) ? colIndex : -1}`;
}

export function parseCellLockKey(key) {
  const str = normalizeIdentityValue(key);
  const [r, c] = str.split(':').map((n) => Number.parseInt(n, 10));
  return {
    rowIndex: Number.isFinite(r) ? r : -1,
    colIndex: Number.isFinite(c) ? c : -1
  };
}

// ════════════════════════════════════════════════════════════════
// Default export — 保留旧 API + 加入新 API（向后兼容）
// ════════════════════════════════════════════════════════════════

export default {
  // 旧 API（不动）
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
  computeCellHash,

  // 新 API（议题 #15 修订）
  DEFAULT_ISOLATION_KEY,
  TABLE_SCOPED_CONFIG_KEY,
  TABLE_ISOLATED_DATA_KEY,
  TABLE_TEMPLATE_SCOPE_MODE,
  MAX_TEMPLATE_ARCHIVES_PER_ISOLATION,
  SHEET_ROW_ID_COLUMN,
  SHEET_CONTAINER_KEY_PREFIX,
  SHEET_SOURCE_DATA_KEYS,
  SHEET_UPDATE_CONFIG_SENTINEL,
  normalizeIsolationKey,
  makeSheetContainerKey,
  isSheetContainerKey,
  createSheetUid,
  createEmptySheetSourceData,
  createDefaultSheetUpdateConfig,
  createDefaultSheetExportConfig,
  createSheet,
  normalizeSheet,
  cloneSheet,
  getSheetHeader,
  getSheetDataRows,
  getSheetColumnCount,
  getSheetRowCount,
  getSheetCell,
  setSheetCell,
  createDslEdit,
  makeLockScopeKey,
  parseLockScopeKey,
  createEmptySheetLockState,
  makeCellLockKey,
  parseCellLockKey
};
