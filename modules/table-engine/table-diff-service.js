/**
 * YouYou Toolkit - 表格差异服务
 * @description 对比前后表格状态，为 UI 变更高亮提供数据
 */
import { cloneTableValue } from './table-types.js';

function compareCells(prevRows, nextRows) {
  const prevRowMap = new Map();
  if (Array.isArray(prevRows)) {
    prevRows.forEach((row, idx) => {
      if (row && typeof row === 'object') prevRowMap.set(row.name || `__row_${idx}`, row);
    });
  }

  const nextRowMap = new Map();
  if (Array.isArray(nextRows)) {
    nextRows.forEach((row, idx) => {
      if (row && typeof row === 'object') nextRowMap.set(row.name || `__row_${idx}`, row);
    });
  }

  const result = {};

  for (const [rowName, nextRow] of nextRowMap) {
    const prevRow = prevRowMap.get(rowName);
    if (!prevRow) {
      result[rowName] = {};
      if (nextRow.cells && typeof nextRow.cells === 'object') {
        for (const key of Object.keys(nextRow.cells)) {
          result[rowName][key] = 'new';
        }
      }
      result[rowName].__rowStatus = 'new';
    } else {
      result[rowName] = {};
      const allKeys = new Set([
        ...Object.keys(prevRow.cells || {}),
        ...Object.keys(nextRow.cells || {})
      ]);
      for (const key of allKeys) {
        const prevVal = String((prevRow.cells && prevRow.cells[key]) ?? '');
        const nextVal = String((nextRow.cells && nextRow.cells[key]) ?? '');
        result[rowName][key] = prevVal === nextVal ? 'unchanged' : 'updated';
      }
      result[rowName].__rowStatus = 'kept';
    }
  }

  for (const [rowName] of prevRowMap) {
    if (!nextRowMap.has(rowName)) {
      result[rowName] = { __rowStatus: 'deleted' };
    }
  }

  return result;
}

export function computeTableDiff(previousTables, currentTables) {
  const prevTables = Array.isArray(previousTables) ? cloneTableValue(previousTables) : [];
  const nextTables = Array.isArray(currentTables) ? cloneTableValue(currentTables) : [];

  const diff = {};

  const maxLen = Math.max(prevTables.length, nextTables.length);
  for (let ti = 0; ti < maxLen; ti++) {
    const prev = prevTables[ti];
    const next = nextTables[ti];

    if (!prev && next) {
      diff[ti] = {};
      if (Array.isArray(next.rows)) {
        next.rows.forEach((row) => {
          const name = row.name || `__row_${next.rows.indexOf(row)}`;
          diff[ti][name] = { __rowStatus: 'new' };
        });
      }
    } else if (prev && !next) {
      diff[ti] = {};
      if (Array.isArray(prev.rows)) {
        prev.rows.forEach((row) => {
          const name = row.name || `__row_${prev.rows.indexOf(row)}`;
          diff[ti][name] = { __rowStatus: 'deleted' };
        });
      }
    } else if (prev && next) {
      diff[ti] = compareCells(prev.rows, next.rows);
    }
  }

  return diff;
}
