/**
 * YouYou Toolkit - shujuku 数据库模板导入适配器
 *
 * 议题 #15 模板适配器架构（v1.0.186+）：
 *   - 迁移自 table-schema-service.convertShujukuTemplateToTables
 *   - 兼容两种 shujuku 模板布局：
 *     a. 嵌套：{ tables: { sheet_0: {...}, sheet_1: {...} } }
 *     b. 根对象：{ mate: { type:'chatSheets', ... }, sheet_0: {...}, sheet_1: {...} }
 *
 * shujuku 单 sheet 结构（来自 shared/models/table-data.ts:58-68）：
 *   {
 *     uid: string,                       // 真正 ID
 *     name: string,                      // 中文显示名
 *     content: (string|null)[][],        // 二维数组：[0]=表头，[1+]=数据行
 *     sourceData: {
 *       note: string,                    // 表说明（含 "- 列N: title - description" 格式）
 *       initNode, insertNode, updateNode, deleteNode: string  // 4 段 AI 指令
 *     },
 *     orderNo: number,                   // 排序号
 *     enabled?: boolean
 *   }
 *
 * 列 key 生成规则（保留 v1.0.181-185 行为）：
 *   - 优先用 sourceData.note 解析出的 title 做 key 种子
 *   - sanitizeColumnKey 把中文 → '_'（全替换后空）→ fallback 到 'col'
 *   - 中文 header 会全部变成 col/col_2/col_3/...（位置映射在下游兜底）
 */

import { cloneTableValue } from '../table-types.js';
import {
  sanitizeColumnKey,
  ensureUniqueColumnKey,
  normalizeCellValue,
  parseShujukuNoteColumns
} from '../table-schema-service.js';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function isSheetEntry(value) {
  return value && typeof value === 'object' && Array.isArray(value.content);
}

function findSheetContainer(raw) {
  if (!raw || typeof raw !== 'object') return null;
  // a. 嵌套：raw.tables 是对象且有 sheet_xxx
  if (raw.tables && typeof raw.tables === 'object' && !Array.isArray(raw.tables)) {
    const keys = Object.keys(raw.tables).filter((k) => k.startsWith('sheet_') && isSheetEntry(raw.tables[k]));
    if (keys.length > 0) return raw.tables;
  }
  // b. 根对象：raw 自己有 sheet_xxx
  const rootKeys = Object.keys(raw).filter((k) => k.startsWith('sheet_') && isSheetEntry(raw[k]));
  if (rootKeys.length > 0) return raw;
  return null;
}

function convertSheetEntriesToTables(container) {
  if (!container || typeof container !== 'object') return [];

  const sheetEntries = Object.keys(container)
    .filter((key) => key.startsWith('sheet_') && container[key] && typeof container[key] === 'object')
    .map((key, index) => ({ key, table: container[key], fallbackOrder: index }))
    .sort((left, right) => {
      const leftOrder = Number.isFinite(left.table.orderNo) ? left.table.orderNo : left.fallbackOrder;
      const rightOrder = Number.isFinite(right.table.orderNo) ? right.table.orderNo : right.fallbackOrder;
      return leftOrder - rightOrder;
    });

  return sheetEntries.map(({ key, table }, index) => {
    const sourceData = table.sourceData && typeof table.sourceData === 'object' ? table.sourceData : {};
    const content = Array.isArray(table.content) ? table.content : [];
    const headerRow = Array.isArray(content[0]) ? content[0] : [];
    const noteColumns = parseShujukuNoteColumns(sourceData.note);
    const usedKeys = new Set();
    const columns = headerRow.slice(1).map((title, columnIndex) => {
      const noteColumn = noteColumns[columnIndex] || {};
      const safeTitle = normalizeString(title || noteColumn.title, `列${columnIndex + 1}`);
      return {
        key: ensureUniqueColumnKey(safeTitle || `col_${columnIndex + 1}`, usedKeys),
        title: safeTitle,
        description: normalizeString(noteColumn.description, ''),
        type: 'text',
        required: false
      };
    });

    const rows = content.slice(1).map((row, rowIndex) => {
      const sourceRow = Array.isArray(row) ? row : [];
      const cells = {};
      columns.forEach((column, columnIndex) => {
        cells[column.key] = normalizeCellValue(sourceRow[columnIndex + 1]);
      });
      return {
        name: normalizeString(sourceRow[0], `行${rowIndex + 1}`),
        cells
      };
    });

    return {
      id: normalizeString(table.uid || key, `sheet_${index + 1}`),
      name: normalizeString(table.name, `表${index + 1}`),
      note: normalizeString(sourceData.note, ''),
      enabled: table.enabled !== false,
      aiInstructions: {
        init: normalizeString(sourceData.initNode, ''),
        create: normalizeString(sourceData.insertNode, ''),
        update: normalizeString(sourceData.updateNode, ''),
        delete: normalizeString(sourceData.deleteNode, '')
      },
      columns,
      rows
    };
  });
}

export const shujukuImporter = Object.freeze({
  formatId: 'shujuku',
  displayName: 'shujuku 数据库格式 (sheet_x)',

  /**
   * 探测能否处理：raw 是对象，且有 sheet_xxx 入口（嵌套或根对象都行）。
   */
  detect(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return false;
    return findSheetContainer(raw) !== null;
  },

  /**
   * 解析为 youyou 标准模板对象。
   */
  parse(raw) {
    const container = findSheetContainer(raw);
    if (!container) {
      throw new Error('shujuku-importer: 未找到 sheet_xxx 入口');
    }
    const tables = convertSheetEntriesToTables(container);
    return {
      tables,
      name: typeof raw.name === 'string' ? raw.name : '',
      description: typeof raw.description === 'string' ? raw.description : ''
    };
  }
});

export default shujukuImporter;
