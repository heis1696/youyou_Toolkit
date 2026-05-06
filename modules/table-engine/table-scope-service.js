/**
 * YouYou Toolkit - 填表范围服务
 * @description 规范 runScope 输入并解析本次允许运行的表范围
 */

import {
  TABLE_RUN_SCOPE,
  cloneTableValue,
  ensureTableId
} from './table-types.js';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function normalizeBoolean(value, fallback = false) {
  if (value === undefined || value === null) return fallback;
  return value === true;
}

function tableId(table = {}, index = 0) {
  return ensureTableId(table?.id || table?.key, index);
}

export function normalizeRunScopeConfig(value = {}, fallback = {}) {
  const source = value && typeof value === 'object' ? value : {};
  const base = fallback && typeof fallback === 'object' ? fallback : {};
  const mode = normalizeString(source.mode || source.runScope || base.mode || base.runScope, TABLE_RUN_SCOPE.ENABLED);
  const selectedTableIds = Array.isArray(source.selectedTableIds)
    ? source.selectedTableIds.map((item) => normalizeString(item, '')).filter(Boolean)
    : (Array.isArray(base.selectedTableIds) ? base.selectedTableIds.map((item) => normalizeString(item, '')).filter(Boolean) : []);
  const activeTableId = normalizeString(source.activeTableId || base.activeTableId, '');

  return {
    mode: Object.values(TABLE_RUN_SCOPE).includes(mode) ? mode : TABLE_RUN_SCOPE.ENABLED,
    selectedTableIds,
    activeTableId
  };
}

export function resolveTableRunScope(config = {}, tables = []) {
  const normalized = normalizeRunScopeConfig(config, config?.scope || {});
  const sourceTables = Array.isArray(tables) ? tables : [];
  const allTableIds = sourceTables.map((table, index) => tableId(table, index));
  let allowedTableIds = [];

  if (normalized.mode === TABLE_RUN_SCOPE.CURRENT) {
    allowedTableIds = normalized.activeTableId ? [normalized.activeTableId] : [];
  } else if (normalized.mode === TABLE_RUN_SCOPE.SELECTED) {
    allowedTableIds = normalized.selectedTableIds.filter((id) => allTableIds.includes(id));
  } else {
    allowedTableIds = sourceTables
      .map((table, index) => ({ table, id: tableId(table, index) }))
      .filter(({ table }) => normalizeBoolean(table?.enabled, true))
      .map(({ id }) => id);
  }

  const allowedIdSet = new Set(allowedTableIds);
  const effectiveTableIds = allowedTableIds.length > 0 ? allowedTableIds : allTableIds;

  return {
    ...normalized,
    allTableIds,
    allowedTableIds: effectiveTableIds,
    allowedIdSet,
    includes(table = {}, index = -1) {
      return allowedIdSet.has(tableId(table, index));
    },
    filterTables(inputTables = []) {
      const nextTables = Array.isArray(inputTables) ? inputTables : [];
      return nextTables.filter((table, index) => allowedIdSet.has(tableId(table, index)));
    },
    toJSON() {
      return {
        mode: normalized.mode,
        selectedTableIds: cloneTableValue(normalized.selectedTableIds),
        activeTableId: normalized.activeTableId,
        allowedTableIds: [...effectiveTableIds]
      };
    }
  };
}

export default {
  normalizeRunScopeConfig,
  resolveTableRunScope
};
