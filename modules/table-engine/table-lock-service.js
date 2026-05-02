/**
 * YouYou Toolkit - 表格锁定服务
 * @description 管理单元格/行/列级别的锁定，存储于 bound state 的 meta.locks
 */
import { computeCellHash, TABLE_LOCK_SCOPE } from './table-types.js';

function normalizeLocks(value) {
  if (!value || typeof value !== 'object') return {};
  const result = {};
  for (const [key, entry] of Object.entries(value)) {
    if (!entry || typeof entry !== 'object') continue;
    if (!entry.scope || !Object.values(TABLE_LOCK_SCOPE).includes(entry.scope)) continue;
    result[key] = {
      scope: entry.scope,
      lockedAt: Number.isFinite(entry.lockedAt) ? entry.lockedAt : Date.now()
    };
  }
  return result;
}

export function getLocks(boundState) {
  if (!boundState || !boundState.meta) return {};
  return normalizeLocks(boundState.meta.locks);
}

export function setLock(boundState, tableIndex, rowIndex, columnKey, scope) {
  if (!boundState || !boundState.meta) return false;
  if (!Object.values(TABLE_LOCK_SCOPE).includes(scope)) return false;

  const locks = normalizeLocks(boundState.meta.locks);
  const hash = computeCellHash(tableIndex, rowIndex, columnKey);
  locks[hash] = { scope, lockedAt: Date.now() };
  boundState.meta.locks = locks;
  return true;
}

export function removeLock(boundState, tableIndex, rowIndex, columnKey) {
  if (!boundState || !boundState.meta) return false;
  const locks = normalizeLocks(boundState.meta.locks);
  const hash = computeCellHash(tableIndex, rowIndex, columnKey);
  if (!locks[hash]) return false;
  delete locks[hash];
  boundState.meta.locks = locks;
  return true;
}

export function isLocked(locks, tableIndex, rowIndex, columnKey) {
  if (!locks || typeof locks !== 'object') return false;
  return !!(
    locks[computeCellHash(tableIndex, rowIndex, columnKey)] ||
    locks[computeCellHash(tableIndex, rowIndex, '*')] ||
    locks[computeCellHash(tableIndex, -1, columnKey)]
  );
}

export function isRowLocked(locks, tableIndex, rowIndex) {
  if (!locks || typeof locks !== 'object') return false;
  return Object.entries(locks).some(([hash, entry]) => {
    if (entry.scope !== TABLE_LOCK_SCOPE.ROW) return false;
    const parts = hash.split(':');
    return Number(parts[0]) === tableIndex && Number(parts[1]) === rowIndex;
  });
}

export function isColumnLocked(locks, tableIndex, columnKey) {
  if (!locks || typeof locks !== 'object') return false;
  return Object.entries(locks).some(([hash, entry]) => {
    if (entry.scope !== TABLE_LOCK_SCOPE.COLUMN) return false;
    const parts = hash.split(':');
    return Number(parts[0]) === tableIndex && parts[2] === columnKey;
  });
}
