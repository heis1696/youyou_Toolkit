/**
 * YouYou Toolkit - 表格锁定服务
 *
 * 议题 #15 §C：对标 shujuku helpers-table-lock.ts 实现四级锁。
 *
 * 锁定语义：
 *   - 行锁 (ROW)         : 整行不可被 AI 修改/删除
 *   - 列锁 (COLUMN)      : 整列不可被 AI 修改
 *   - 单元格锁 (CELL)     : 单点不可被 AI 修改
 *   - 索引列锁 (INDEX_COLUMN) : 自增编号列由插件强制重写，AI 写入立刻被覆盖（纪要表专用）
 *
 * 存储位置（shujuku 风格 — 不依赖消息绑定）：
 *   storage.namespace('tableLocks').get('scopes') = {
 *     [scopeKey]: {                   // scopeKey = `${chatKey}::${isolationKey}`
 *       [sheetUid]: {
 *         rows: number[],             // 锁定数据行索引（0 基，不含表头）
 *         cols: string[],             // 锁定列 key 列表
 *         cells: string[],            // ["rowIndex:columnKey", ...]
 *         indexColumn: boolean
 *       }
 *     }
 *   }
 *
 * v1.0.168 以下版本的 boundState.meta.locks 数据不做迁移（议题 #15 §I：旧测试数据已清空）。
 *
 * 设计约束（memory project_table_workbench_gaps esbuild __esm 陷阱）：
 *   - 顶层不调用 logger.createScope()，用 lazy getLog()
 *   - 顶层只暴露常量 + 函数；storage 单例延迟在调用时取
 */

import { storage } from '../core/storage-service.js';
import { logger } from '../core/logger-service.js';
import {
  TABLE_LOCK_SCOPE,
  createEmptySheetLockState,
  makeCellLockKey,
  makeLockScopeKey,
  normalizeIsolationKey
} from './table-types.js';
import { tableIsolation } from './table-isolation-service.js';

const STORAGE_NAMESPACE = 'tableLocks';
const SCOPES_KEY = 'scopes';

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableLock');
  return _log;
}

const lockStorage = storage.namespace(STORAGE_NAMESPACE);

// ════════════════════════════════════════════════════════════════
// Internal helpers
// ════════════════════════════════════════════════════════════════

function isObject(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }

function _readAllScopes() {
  const data = lockStorage.get(SCOPES_KEY, {});
  return isObject(data) ? data : {};
}

function _writeAllScopes(map) {
  lockStorage.set(SCOPES_KEY, map);
}

function _getScopeMap(scopeKey) {
  const all = _readAllScopes();
  return isObject(all[scopeKey]) ? all[scopeKey] : {};
}

function _setScopeMap(scopeKey, sheetMap) {
  const all = _readAllScopes();
  all[scopeKey] = sheetMap;
  _writeAllScopes(all);
}

/**
 * 标准化 Sheet 的锁状态 — 去重 + 排序 + 类型对齐
 */
function normalizeSheetLockState(value) {
  const base = createEmptySheetLockState();
  if (!isObject(value)) return base;
  if (Array.isArray(value.rows)) {
    base.rows = Array.from(new Set(value.rows.filter((n) => Number.isFinite(n)).map((n) => Math.floor(n))));
    base.rows.sort((a, b) => a - b);
  }
  if (Array.isArray(value.cols)) {
    base.cols = Array.from(new Set(value.cols.filter((c) => typeof c === 'string' && c.length > 0)));
  }
  if (Array.isArray(value.cells)) {
    base.cells = Array.from(new Set(value.cells.filter((c) => typeof c === 'string' && c.includes(':'))));
  }
  base.indexColumn = value.indexColumn === true;
  return base;
}

/**
 * 把外部传入 boundStateOrScopeKey 解析为 scopeKey
 *   - string → 直接当 scopeKey 用
 *   - {scopeKey: string} → 取
 *   - {chatId, isolationKey?} → 用 makeLockScopeKey 算
 *   - 其他 → 用当前 isolation + 空 chatKey
 */
function _resolveScopeKey(input) {
  if (typeof input === 'string') return input;
  if (isObject(input)) {
    if (typeof input.scopeKey === 'string' && input.scopeKey.includes('::')) return input.scopeKey;
    if (input.chatId !== undefined) {
      const iso = input.isolationKey !== undefined ? input.isolationKey : tableIsolation.getKey();
      return makeLockScopeKey(input.chatId, iso);
    }
  }
  // 兜底：用当前 isolation + 空 chatKey（旧 boundState.meta 调用方走到这里时返回空 scope）
  return makeLockScopeKey('', tableIsolation.getKey());
}

/**
 * 解析 boundStateOrScopeKey + tables，返回 indexedLockMap（按 tableIndex 索引）
 *   indexedLockMap[tableIndex] = SheetLockState
 *
 * 用于兼容旧 isLocked / isRowLocked / isColumnLocked 签名。
 */
function _buildIndexedLockMap(scopeKey, tables) {
  const scopeMap = _getScopeMap(scopeKey);
  const indexed = {};
  if (!Array.isArray(tables)) return indexed;
  for (let ti = 0; ti < tables.length; ti++) {
    const table = tables[ti];
    if (!table) continue;
    const sheetUid = table.uid || table.id || '';
    if (!sheetUid) continue;
    if (scopeMap[sheetUid]) {
      indexed[ti] = normalizeSheetLockState(scopeMap[sheetUid]);
    }
  }
  return indexed;
}

// ════════════════════════════════════════════════════════════════
// 新 API（per-sheet 操作）
// ════════════════════════════════════════════════════════════════

/**
 * 读取单 sheet 锁状态
 * @param {string|Object} scopeOrContext - scopeKey 字符串或 {chatId, isolationKey?}
 * @param {string} sheetUid
 * @returns {{rows: number[], cols: string[], cells: string[], indexColumn: boolean}}
 */
export function getSheetLockState(scopeOrContext, sheetUid) {
  const scopeKey = _resolveScopeKey(scopeOrContext);
  const scope = _getScopeMap(scopeKey);
  return normalizeSheetLockState(scope[sheetUid]);
}

/**
 * 设置 / 取消 行锁
 */
export function setRowLock(scopeOrContext, sheetUid, rowIndex, locked = true) {
  if (!sheetUid || !Number.isFinite(rowIndex)) return false;
  const scopeKey = _resolveScopeKey(scopeOrContext);
  const scope = _getScopeMap(scopeKey);
  const sheet = normalizeSheetLockState(scope[sheetUid]);
  const idx = Math.floor(rowIndex);
  const has = sheet.rows.includes(idx);
  if (locked && !has) {
    sheet.rows.push(idx);
    sheet.rows.sort((a, b) => a - b);
  } else if (!locked && has) {
    sheet.rows = sheet.rows.filter((r) => r !== idx);
  } else {
    return false;
  }
  scope[sheetUid] = sheet;
  _setScopeMap(scopeKey, scope);
  return true;
}

/**
 * 设置 / 取消 列锁
 */
export function setColLock(scopeOrContext, sheetUid, columnKey, locked = true) {
  if (!sheetUid || !columnKey) return false;
  const scopeKey = _resolveScopeKey(scopeOrContext);
  const scope = _getScopeMap(scopeKey);
  const sheet = normalizeSheetLockState(scope[sheetUid]);
  const has = sheet.cols.includes(columnKey);
  if (locked && !has) sheet.cols.push(columnKey);
  else if (!locked && has) sheet.cols = sheet.cols.filter((c) => c !== columnKey);
  else return false;
  scope[sheetUid] = sheet;
  _setScopeMap(scopeKey, scope);
  return true;
}

/**
 * 设置 / 取消 单元格锁
 */
export function setCellLock(scopeOrContext, sheetUid, rowIndex, columnKey, locked = true) {
  if (!sheetUid || !columnKey || !Number.isFinite(rowIndex)) return false;
  const scopeKey = _resolveScopeKey(scopeOrContext);
  const scope = _getScopeMap(scopeKey);
  const sheet = normalizeSheetLockState(scope[sheetUid]);
  const cellKey = makeCellLockKey(rowIndex, columnKey === '*' ? -1 : -1) === '-1:-1'
    ? `${rowIndex}:${columnKey}`
    : `${rowIndex}:${columnKey}`;
  // 使用 "rowIndex:columnKey" 形式（不是 colIndex 数字）以贴近旧 cellHash 风格
  const formattedKey = `${Math.floor(rowIndex)}:${columnKey}`;
  const has = sheet.cells.includes(formattedKey);
  if (locked && !has) sheet.cells.push(formattedKey);
  else if (!locked && has) sheet.cells = sheet.cells.filter((c) => c !== formattedKey);
  else return false;
  scope[sheetUid] = sheet;
  _setScopeMap(scopeKey, scope);
  return true;
}

/**
 * 设置 / 取消 索引列锁（纪要表自增编号专用）
 */
export function setIndexColumnLock(scopeOrContext, sheetUid, locked = true) {
  if (!sheetUid) return false;
  const scopeKey = _resolveScopeKey(scopeOrContext);
  const scope = _getScopeMap(scopeKey);
  const sheet = normalizeSheetLockState(scope[sheetUid]);
  if (sheet.indexColumn === !!locked) return false;
  sheet.indexColumn = !!locked;
  scope[sheetUid] = sheet;
  _setScopeMap(scopeKey, scope);
  return true;
}

/**
 * 清空指定 sheet 的所有锁
 */
export function clearSheetLocks(scopeOrContext, sheetUid) {
  const scopeKey = _resolveScopeKey(scopeOrContext);
  const scope = _getScopeMap(scopeKey);
  if (!scope[sheetUid]) return false;
  delete scope[sheetUid];
  _setScopeMap(scopeKey, scope);
  return true;
}

/**
 * 清空整个 scope 的所有锁
 */
export function clearScopeLocks(scopeOrContext) {
  const scopeKey = _resolveScopeKey(scopeOrContext);
  const all = _readAllScopes();
  if (!all[scopeKey]) return false;
  delete all[scopeKey];
  _writeAllScopes(all);
  return true;
}

// ════════════════════════════════════════════════════════════════
// 兼容旧 API（供 update-service 等老调用方使用，签名不变）
// ════════════════════════════════════════════════════════════════

/**
 * 旧 API：读取 lockMap 用于喂给 isLocked / isRowLocked
 *
 * 旧签名：getLocks(boundState) → object
 * 新签名（推荐）：getLocks(boundStateOrScopeKey, tables) → indexedLockMap by tableIndex
 *
 * 返回值是按 tableIndex 索引的 SheetLockState 对象，与新 isLocked 兼容
 */
export function getLocks(boundStateOrScopeKey, tables = []) {
  const scopeKey = _resolveScopeKey(boundStateOrScopeKey);
  return _buildIndexedLockMap(scopeKey, tables);
}

/**
 * 兼容旧 API：基于 indexedLockMap 检查单元格是否被锁
 *   - 行锁 / 列锁 / 单元格锁三种 fallback
 */
export function isLocked(locks, tableIndex, rowIndex, columnKey) {
  if (!isObject(locks)) return false;
  const sheet = locks[tableIndex];
  if (!sheet) return false;
  if (Number.isFinite(rowIndex) && sheet.rows.includes(rowIndex)) return true;
  if (typeof columnKey === 'string' && columnKey.length > 0 && sheet.cols.includes(columnKey)) return true;
  if (Number.isFinite(rowIndex) && typeof columnKey === 'string' && columnKey.length > 0) {
    const cellKey = `${rowIndex}:${columnKey}`;
    if (sheet.cells.includes(cellKey)) return true;
  }
  return false;
}

/**
 * 兼容旧 API：检查行锁
 */
export function isRowLocked(locks, tableIndex, rowIndex) {
  if (!isObject(locks)) return false;
  const sheet = locks[tableIndex];
  if (!sheet) return false;
  return Number.isFinite(rowIndex) && sheet.rows.includes(rowIndex);
}

/**
 * 兼容旧 API：检查列锁
 */
export function isColumnLocked(locks, tableIndex, columnKey) {
  if (!isObject(locks)) return false;
  const sheet = locks[tableIndex];
  if (!sheet) return false;
  return typeof columnKey === 'string' && columnKey.length > 0 && sheet.cols.includes(columnKey);
}

/**
 * 检查索引列锁（新增）
 */
export function isIndexColumnLocked(locks, tableIndex) {
  if (!isObject(locks)) return false;
  return locks[tableIndex]?.indexColumn === true;
}

/**
 * 旧 setLock API — 兼容签名，但内部走新存储
 * scope: TABLE_LOCK_SCOPE 之一
 *
 * @deprecated 推荐用 setRowLock / setColLock / setCellLock
 */
export function setLock(scopeOrContext, tableIndexOrSheetUid, rowIndex, columnKey, scope) {
  // 旧签名：setLock(boundState, tableIndex, rowIndex, columnKey, scope)
  // 新调用方应使用 setRowLock / setColLock / setCellLock 等具体函数。
  // 这里给一个兼容垫片：如果 tableIndexOrSheetUid 是字符串就当 sheetUid 用，否则期望已经把 boundState
  // 中的 tableIndex 提前映射为 sheetUid（旧调用方暂时不可用）。
  if (typeof tableIndexOrSheetUid !== 'string') {
    getLog().warn('setLock 旧签名已废弃；请改用 setRowLock / setColLock / setCellLock 并传 sheetUid');
    return false;
  }
  switch (scope) {
    case TABLE_LOCK_SCOPE.ROW:    return setRowLock(scopeOrContext, tableIndexOrSheetUid, rowIndex, true);
    case TABLE_LOCK_SCOPE.COLUMN: return setColLock(scopeOrContext, tableIndexOrSheetUid, columnKey, true);
    case TABLE_LOCK_SCOPE.CELL:   return setCellLock(scopeOrContext, tableIndexOrSheetUid, rowIndex, columnKey, true);
    case TABLE_LOCK_SCOPE.INDEX_COLUMN: return setIndexColumnLock(scopeOrContext, tableIndexOrSheetUid, true);
    default: return false;
  }
}

/**
 * 旧 removeLock API — 兼容签名
 * @deprecated 推荐用具体函数 + locked=false
 */
export function removeLock(scopeOrContext, tableIndexOrSheetUid, rowIndex, columnKey, scope) {
  if (typeof tableIndexOrSheetUid !== 'string') {
    getLog().warn('removeLock 旧签名已废弃；请改用 setRowLock / setColLock / setCellLock 传 locked=false');
    return false;
  }
  switch (scope) {
    case TABLE_LOCK_SCOPE.ROW:    return setRowLock(scopeOrContext, tableIndexOrSheetUid, rowIndex, false);
    case TABLE_LOCK_SCOPE.COLUMN: return setColLock(scopeOrContext, tableIndexOrSheetUid, columnKey, false);
    case TABLE_LOCK_SCOPE.CELL:   return setCellLock(scopeOrContext, tableIndexOrSheetUid, rowIndex, columnKey, false);
    case TABLE_LOCK_SCOPE.INDEX_COLUMN: return setIndexColumnLock(scopeOrContext, tableIndexOrSheetUid, false);
    default: return false;
  }
}

export { STORAGE_NAMESPACE as TABLE_LOCK_STORAGE_NAMESPACE };
