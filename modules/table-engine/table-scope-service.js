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
  const allTableIdSet = new Set(allTableIds);

  // 议题 #15 #33-D：mode='current' 或 'selected' 但选中的 id 不在实际 tables 里
  //   → fallback 到 'enabled'。
  // 触发场景：用户切换激活模板（shujuku 模板）后，旧的 scope.activeTableId
  //   (例如 'default_global_state') 依然存在，但实际表 id 已变成 sheet_xxx，
  //   runScope.allowedTableIds 跟 allTableIds 没交集 → AI 填表全 droppedByScope。
  let effectiveMode = normalized.mode;
  let staleScope = false;
  if (effectiveMode === TABLE_RUN_SCOPE.CURRENT) {
    if (!normalized.activeTableId || !allTableIdSet.has(normalized.activeTableId)) {
      effectiveMode = TABLE_RUN_SCOPE.ENABLED;
      staleScope = true;
    }
  } else if (effectiveMode === TABLE_RUN_SCOPE.SELECTED) {
    const validSelected = normalized.selectedTableIds.filter((id) => allTableIdSet.has(id));
    if (validSelected.length === 0) {
      effectiveMode = TABLE_RUN_SCOPE.ENABLED;
      staleScope = true;
    }
  }

  let allowedTableIds = [];
  if (effectiveMode === TABLE_RUN_SCOPE.CURRENT) {
    allowedTableIds = normalized.activeTableId ? [normalized.activeTableId] : [];
  } else if (effectiveMode === TABLE_RUN_SCOPE.SELECTED) {
    allowedTableIds = normalized.selectedTableIds.filter((id) => allTableIdSet.has(id));
  } else {
    allowedTableIds = sourceTables
      .map((table, index) => ({ table, id: tableId(table, index) }))
      .filter(({ table }) => normalizeBoolean(table?.enabled, true))
      .map(({ id }) => id);
  }

  const allowedIdSet = new Set(allowedTableIds);

  return {
    ...normalized,
    mode: effectiveMode,
    requestedMode: normalized.mode,
    staleScope,
    allTableIds,
    allowedTableIds,
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
        mode: effectiveMode,
        requestedMode: normalized.mode,
        staleScope,
        selectedTableIds: cloneTableValue(normalized.selectedTableIds),
        activeTableId: normalized.activeTableId,
        allowedTableIds: [...allowedTableIds]
      };
    }
  };
}

export default {
  normalizeRunScopeConfig,
  resolveTableRunScope
};
