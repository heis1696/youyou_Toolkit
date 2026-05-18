/**
 * YouYou Toolkit - 填表工作台配置服务
 * @description 管理 tableWorkbench 的最小配置、schema 与运行时状态
 *
 * 议题 #15 #16 重构（v1.0.191+）：
 *   - 默认值与常量已拆到 ./table-defaults.js（无逻辑、纯数据）
 *   - 本文件 re-export 这些常量以向后兼容
 */

import { storage } from '../core/storage-service.js';
import {
  cloneTableValue,
  createRuntimeTableId,
  createRuntimeTableRowId,
  ensureTableId,
  ensureTableRowId,
  TABLE_RUN_SCOPE
} from './table-types.js';
import {
  getAllTableTemplates,
  getTableTemplate,
  saveTableTemplate
} from './table-template-service.js';
import { normalizeRunScopeConfig } from './table-scope-service.js';
import { applyGuideToConfig, getCurrentTableGuide, saveCurrentTableGuide } from './table-guide-service.js';
import {
  TABLE_WORKBENCH_RUNTIME_STATUS,
  TABLE_FILL_MODE,
  DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE,
  TABLE_WORKBENCH_RESPONSE_CONTRACT,
  DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE,
  TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS,
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID,
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME,
  DEFAULT_TABLE_WORKBENCH_TABLES
} from './table-defaults.js';

// 向后兼容 re-export
export {
  TABLE_WORKBENCH_RUNTIME_STATUS,
  TABLE_FILL_MODE,
  DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE,
  TABLE_WORKBENCH_RESPONSE_CONTRACT,
  DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE,
  TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS,
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID,
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME,
  DEFAULT_TABLE_WORKBENCH_TABLES
};

const tableWorkbenchStorage = storage.namespace('tableWorkbench');
const TABLE_WORKBENCH_CONFIG_KEY = 'config';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function normalizeBoolean(value, fallback = false) {
  if (value === undefined || value === null) return fallback;
  return value === true;
}

function isLegacyPlaceholderTables(value) {
  if (!Array.isArray(value) || value.length !== 1) return false;

  const table = value[0] && typeof value[0] === 'object' ? value[0] : null;
  if (!table) return false;

  const name = normalizeString(table.name || table.title, '');
  const note = normalizeString(table.note || table.description, '');
  const columns = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];

  if (name && !['表1', '表格 1', '表格1'].includes(name)) return false;
  if (note || columns.length !== 1 || rows.length > 1) return false;

  const column = columns[0] && typeof columns[0] === 'object' ? columns[0] : {};
  const columnKey = normalizeString(column.key || column.id, '');
  const columnTitle = normalizeString(column.title || column.name || column.label, '');
  const columnDescription = normalizeString(column.description || column.note, '');
  if (columnDescription) return false;
  if (columnKey && columnKey !== 'col_1') return false;
  if (columnTitle && !['列1', 'col_1'].includes(columnTitle)) return false;

  if (rows.length === 0) return true;

  const row = rows[0] && typeof rows[0] === 'object' ? rows[0] : {};
  const rowName = normalizeString(row.name || row.title || row.label, '');
  const cells = row.cells && typeof row.cells === 'object' && !Array.isArray(row.cells) ? row.cells : {};
  const values = Array.isArray(row.values) ? row.values : [];
  const hasCellValue = Object.values(cells).some((cellValue) => normalizeString(cellValue, ''))
    || values.some((cellValue) => normalizeString(cellValue, ''));

  return (!rowName || rowName === '行1') && !hasCellValue;
}

function normalizeTables(value, { seedDefaultWhenMissing = false } = {}) {
  if (isLegacyPlaceholderTables(value)) {
    return cloneTableValue(DEFAULT_TABLE_WORKBENCH_TABLES);
  }

  if (Array.isArray(value)) {
    return cloneTableValue(value);
  }

  if (value && typeof value === 'object') {
    return convertShujukuTemplateToTables(value);
  }

  return seedDefaultWhenMissing ? cloneTableValue(DEFAULT_TABLE_WORKBENCH_TABLES) : [];
}

function parseShujukuNoteColumns(note = '') {
  const columns = [];
  const text = normalizeString(note, '');
  const pattern = /-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g;
  let match;

  while ((match = pattern.exec(text))) {
    columns.push({
      title: normalizeString(match[1], ''),
      description: normalizeString(match[2], '')
    });
  }

  return columns;
}

function convertShujukuTemplateToTables(value = {}) {
  const sourceValue = value && typeof value === 'object' ? value : {};
  const sheetEntries = Object.keys(sourceValue)
    .filter((key) => key.startsWith('sheet_') && sourceValue[key] && typeof sourceValue[key] === 'object')
    .map((key, index) => ({ key, table: sourceValue[key], fallbackOrder: index }))
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
        type: DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE,
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

function parseTableTemplateValue(value) {
  if (Array.isArray(value)) {
    return normalizeTables(value);
  }

  if (value && typeof value === 'object') {
    return normalizeTables(value);
  }

  const source = normalizeString(value, '');
  if (!source) return [];

  const withoutComments = source.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
  const candidates = [withoutComments];

  try {
    const parsed = JSON.parse(withoutComments);
    candidates.push(parsed);
  } catch (_) {
    try {
      const innerContent = withoutComments.startsWith('"') && withoutComments.endsWith('"')
        ? withoutComments.slice(1, -1)
        : withoutComments;
      const escapedContent = innerContent
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      candidates.push(JSON.parse(`"${escapedContent}"`));
    } catch (_) {}
  }

  for (const candidate of candidates) {
    if (Array.isArray(candidate) || (candidate && typeof candidate === 'object')) {
      const tables = normalizeTables(candidate);
      if (tables.length) return tables;
      continue;
    }

    if (typeof candidate === 'string' && candidate !== withoutComments) {
      try {
        const parsed = JSON.parse(candidate);
        const tables = normalizeTables(parsed);
        if (tables.length) return tables;
      } catch (_) {}
    }
  }

  return [];
}

function normalizeCellValue(value) {
  if (value === undefined || value === null) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch (_) {
    return String(value);
  }
}

function sanitizeColumnKey(value, fallback = 'col') {
  const normalized = normalizeString(value, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return normalized || fallback;
}

function ensureUniqueColumnKey(baseKey, usedKeys = new Set()) {
  const base = sanitizeColumnKey(baseKey, 'col');
  let candidate = base;
  let suffix = 2;

  while (usedKeys.has(candidate)) {
    candidate = `${base}_${suffix}`;
    suffix += 1;
  }

  usedKeys.add(candidate);
  return candidate;
}

// 议题 #15 Bug #33-E：template-adapters 复用这些 helper
export { sanitizeColumnKey, ensureUniqueColumnKey, normalizeCellValue, parseShujukuNoteColumns };

function getSourceColumnsFromRows(rows = []) {
  const keys = [];
  let maxArrayLength = 0;

  rows.forEach((row) => {
    const sourceRow = row && typeof row === 'object' ? row : {};
    const objectCells = sourceRow.cells && typeof sourceRow.cells === 'object' && !Array.isArray(sourceRow.cells)
      ? sourceRow.cells
      : null;
    const arrayCells = Array.isArray(sourceRow.cells)
      ? sourceRow.cells
      : (Array.isArray(sourceRow.values) ? sourceRow.values : null);

    if (objectCells) {
      Object.keys(objectCells).forEach((key) => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
    }

    if (arrayCells && arrayCells.length > maxArrayLength) {
      maxArrayLength = arrayCells.length;
    }
  });

  if (keys.length > 0) {
    return keys.map((key) => ({
      key,
      title: String(key)
    }));
  }

  if (maxArrayLength > 0) {
    return Array.from({ length: maxArrayLength }, (_, index) => ({
      key: `col_${index + 1}`,
      title: `列${index + 1}`
    }));
  }

  return [];
}

function normalizeColumnType(value, fallback = DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE) {
  const normalized = normalizeString(value, fallback);
  return TABLE_WORKBENCH_COLUMN_TYPES.some((option) => option.value === normalized)
    ? normalized
    : fallback;
}

function normalizeDraftColumnDescriptor(value = {}, index = 0, usedKeys = new Set()) {
  const sourceValue = value && typeof value === 'object' ? value : {};
  const title = normalizeString(
    sourceValue.title || sourceValue.name || sourceValue.label,
    `列${index + 1}`
  );
  const rawKey = normalizeString(sourceValue.key || sourceValue.id, '');
  const key = ensureUniqueColumnKey(rawKey || title || `col_${index + 1}`, usedKeys);
  const sourceKeys = [
    rawKey,
    normalizeString(sourceValue.title, ''),
    normalizeString(sourceValue.name, ''),
    normalizeString(sourceValue.label, '')
  ].filter(Boolean);

  return {
    key,
    title,
    description: normalizeString(sourceValue.description || sourceValue.note, ''),
    type: normalizeColumnType(sourceValue.type),
    required: sourceValue.required === true,
    sourceKeys
  };
}

function readCellValueForColumn(sourceRow = {}, columnDescriptor = {}, columnIndex = 0) {
  const objectCells = sourceRow.cells && typeof sourceRow.cells === 'object' && !Array.isArray(sourceRow.cells)
    ? sourceRow.cells
    : null;
  const arrayCells = Array.isArray(sourceRow.cells)
    ? sourceRow.cells
    : (Array.isArray(sourceRow.values) ? sourceRow.values : null);

  if (objectCells) {
    const candidates = [
      ...(Array.isArray(columnDescriptor.sourceKeys) ? columnDescriptor.sourceKeys : []),
      columnDescriptor.key,
      columnDescriptor.title
    ].filter(Boolean);

    for (const candidate of candidates) {
      if (objectCells[candidate] !== undefined) {
        return normalizeCellValue(objectCells[candidate]);
      }
    }
  }

  if (arrayCells && arrayCells[columnIndex] !== undefined) {
    return normalizeCellValue(arrayCells[columnIndex]);
  }

  return '';
}

function normalizeDraftRow(value = {}, columns = [], index = 0) {
  const sourceValue = value && typeof value === 'object' ? value : {};
  const cells = {};

  columns.forEach((column, columnIndex) => {
    cells[column.key] = readCellValueForColumn(sourceValue, column, columnIndex);
  });

  return {
    id: ensureTableRowId(sourceValue.id || sourceValue.rowId, index),
    name: normalizeString(sourceValue.name || sourceValue.title || sourceValue.label, `行${index + 1}`),
    cells
  };
}

function normalizeTableAiInstructions(value = {}) {
  const sourceValue = value && typeof value === 'object' ? value : {};

  return {
    init: normalizeString(sourceValue.init, ''),
    create: normalizeString(sourceValue.create, ''),
    update: normalizeString(sourceValue.update, ''),
    delete: normalizeString(sourceValue.delete, '')
  };
}

function normalizeBypassConfig(value = {}, legacyPromptPreset = '') {
  const sourceValue = value && typeof value === 'object' ? value : {};
  const presetId = normalizeString(sourceValue.presetId, normalizeString(legacyPromptPreset, ''));

  return {
    enabled: sourceValue.enabled === true,
    presetId
  };
}

function normalizeExportConfig(value = {}, tableName = '') {
  const src = value && typeof value === 'object' ? value : {};
  return {
    enabled: normalizeBoolean(src.enabled, false),
    entryName: normalizeString(src.entryName, tableName),
    entryType: src.entryType === 'keyword' ? 'keyword' : 'constant',
    splitByRow: normalizeBoolean(src.splitByRow, false),
    keywords: normalizeString(src.keywords, ''),
    injectionTemplate: normalizeString(src.injectionTemplate, ''),
    preventRecursion: normalizeBoolean(src.preventRecursion, true),
    entryPlacement: {
      position: normalizeString(src.entryPlacement?.position || src.placement?.position, 'before_character_definition'),
      depth: Number.isFinite(Number(src.entryPlacement?.depth ?? src.placement?.depth)) ? Math.floor(Number(src.entryPlacement?.depth ?? src.placement?.depth)) : 2,
      order: Number.isFinite(Number(src.entryPlacement?.order ?? src.placement?.order)) ? Math.floor(Number(src.entryPlacement?.order ?? src.placement?.order)) : 0
    }
  };
}

function normalizeDraftTable(value = {}, index = 0) {
  const sourceValue = value && typeof value === 'object' ? value : {};
  const usedKeys = new Set();
  const sourceColumns = Array.isArray(sourceValue.columns) && sourceValue.columns.length > 0
    ? sourceValue.columns
    : getSourceColumnsFromRows(Array.isArray(sourceValue.rows) ? sourceValue.rows : []);
  const columns = sourceColumns.map((column, columnIndex) => normalizeDraftColumnDescriptor(column, columnIndex, usedKeys));
  const rows = Array.isArray(sourceValue.rows)
    ? sourceValue.rows.map((row, rowIndex) => normalizeDraftRow(row, columns, rowIndex))
    : [];
  const tableName = normalizeString(sourceValue.name || sourceValue.title, `表${index + 1}`);

  return {
    id: ensureTableId(sourceValue.id || sourceValue.key, index),
    name: tableName,
    note: normalizeString(sourceValue.note || sourceValue.description, ''),
    enabled: sourceValue.enabled !== false,
    aiInstructions: normalizeTableAiInstructions(sourceValue.aiInstructions),
    exportConfig: normalizeExportConfig(sourceValue.exportConfig, tableName),
    columns: columns.map((column) => ({
      key: column.key,
      title: column.title,
      description: normalizeString(column.description, ''),
      type: normalizeColumnType(column.type),
      required: column.required === true
    })),
    rows
  };
}

function normalizeRuntime(runtime = {}) {
  const value = runtime && typeof runtime === 'object' ? runtime : {};
  const lastErrorDetails = Array.isArray(value.lastErrorDetails)
    ? value.lastErrorDetails
      .map((item) => normalizeString(item, ''))
      .filter(Boolean)
    : [];
  const lastValidationSummary = value.lastValidationSummary && typeof value.lastValidationSummary === 'object'
    ? {
      errorCount: Number.isFinite(value.lastValidationSummary.errorCount) ? value.lastValidationSummary.errorCount : 0,
      warningCount: Number.isFinite(value.lastValidationSummary.warningCount) ? value.lastValidationSummary.warningCount : 0
    }
    : { errorCount: 0, warningCount: 0 };

  return {
    lastStatus: normalizeString(value.lastStatus, TABLE_WORKBENCH_RUNTIME_STATUS.IDLE),
    lastRunAt: Number.isFinite(value.lastRunAt) ? value.lastRunAt : 0,
    lastDurationMs: Number.isFinite(value.lastDurationMs) ? value.lastDurationMs : 0,
    lastError: normalizeString(value.lastError, ''),
    lastErrorDetails,
    lastValidationSummary,
    successCount: Number.isFinite(value.successCount) ? value.successCount : 0,
    errorCount: Number.isFinite(value.errorCount) ? value.errorCount : 0,
    lastSourceMessageId: normalizeString(value.lastSourceMessageId, ''),
    lastSlotRevisionKey: normalizeString(value.lastSlotRevisionKey, ''),
    lastLoadMode: normalizeString(value.lastLoadMode, ''),
    lastFillMode: normalizeString(value.lastFillMode, ''),
    lastMirrorApplied: value.lastMirrorApplied === true,
    lastResolvedFromMessageId: normalizeString(value.lastResolvedFromMessageId, ''),
    lastResolvedFromRevisionKey: normalizeString(value.lastResolvedFromRevisionKey, ''),
    lastSourceKind: normalizeString(value.lastSourceKind, ''),
    lastScopeMode: normalizeString(value.lastScopeMode, ''),
    lastAutoRunAt: Number.isFinite(value.lastAutoRunAt) ? value.lastAutoRunAt : 0,
    lastAutoStatus: normalizeString(value.lastAutoStatus, TABLE_WORKBENCH_RUNTIME_STATUS.IDLE),
    lastAutoMessageId: normalizeString(value.lastAutoMessageId, ''),
    lastAutoRevisionKey: normalizeString(value.lastAutoRevisionKey, ''),
    lastAutoSkipReason: normalizeString(value.lastAutoSkipReason, '')
  };
}

export function createEmptyTableColumn(columnIndex = 1, existingColumns = []) {
  const usedKeys = new Set(
    (Array.isArray(existingColumns) ? existingColumns : [])
      .map((column) => normalizeString(column?.key, ''))
      .filter(Boolean)
  );
  const key = ensureUniqueColumnKey(`col_${columnIndex}`, usedKeys);

  return {
    key,
    title: `列${columnIndex}`,
    description: '',
    type: DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE,
    required: false
  };
}

export function createEmptyTableRow(columns = [], rowIndex = 1) {
  const cells = {};

  (Array.isArray(columns) ? columns : []).forEach((column) => {
    const key = normalizeString(column?.key, '');
    if (!key) {
      return;
    }

    cells[key] = '';
  });

  return {
    id: createRuntimeTableRowId('row'),
    name: `行${rowIndex}`,
    cells
  };
}

export function createEmptyTableDefinition(tableIndex = 1) {
  const firstColumn = createEmptyTableColumn(1);

  return {
    id: createRuntimeTableId('table'),
    name: `表${tableIndex}`,
    note: '',
    enabled: true,
    aiInstructions: normalizeTableAiInstructions(),
    columns: [firstColumn],
    rows: [createEmptyTableRow([firstColumn], 1)]
  };
}

export function createEmptyTableDraft() {
  return {
    tables: []
  };
}

export function deriveTableDraftFromTables(tables = []) {
  if (!Array.isArray(tables) || tables.length === 0) {
    return createEmptyTableDraft();
  }

  return {
    tables: tables.map((table, index) => normalizeDraftTable(table, index))
  };
}

export function compileTableDraftToTables(draft = {}) {
  const sourceDraft = draft && typeof draft === 'object' ? draft : {};
  const sourceTables = Array.isArray(sourceDraft.tables) ? sourceDraft.tables : [];

  return sourceTables.map((table, index) => normalizeDraftTable(table, index));
}

function validateCellByColumn(value = '', column = {}, location = {}) {
  const type = normalizeColumnType(column?.type);
  const trimmedValue = String(value ?? '').trim();
  const label = normalizeString(
    location?.label,
    `${normalizeString(location?.tableName, '表格')} / ${normalizeString(location?.rowName, '行')} / ${normalizeString(column?.title || column?.key, '单元格')}`
  );
  const errors = [];
  const warnings = [];

  if (column?.required === true && !trimmedValue) {
    errors.push(`${label} 为必填，当前为空。`);
  }

  if (!trimmedValue) {
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  if (type === 'number' && !Number.isFinite(Number(trimmedValue))) {
    errors.push(`${label} 需要填写数字。`);
  }

  if (type === 'boolean' && !['true', 'false', '1', '0', 'yes', 'no'].includes(trimmedValue.toLowerCase())) {
    errors.push(`${label} 需要填写布尔值（true / false）。`);
  }

  if (type === 'date' && Number.isNaN(Date.parse(trimmedValue))) {
    errors.push(`${label} 需要填写可解析的日期。`);
  }

  if (type === 'json') {
    try {
      JSON.parse(trimmedValue);
    } catch (error) {
      errors.push(`${label} 需要填写合法 JSON：${error?.message || '解析失败'}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateTableDraft(draft = {}) {
  const normalizedDraft = draft && typeof draft === 'object' ? draft : {};
  const tables = compileTableDraftToTables(normalizedDraft);
  const errors = [];

  tables.forEach((table, tableIndex) => {
    const tableName = normalizeString(table?.name, `表${tableIndex + 1}`);
    const columns = Array.isArray(table?.columns) ? table.columns : [];
    const rows = Array.isArray(table?.rows) ? table.rows : [];

    if (!tableName) {
      errors.push(`表 ${tableIndex + 1} 缺少名称。`);
    }

    if (columns.length === 0) {
      errors.push(`${tableName} 至少需要一列。`);
    }

    const seenKeys = new Set();
    columns.forEach((column, columnIndex) => {
      const columnKey = normalizeString(column?.key, '');
      const columnTitle = normalizeString(column?.title, `列${columnIndex + 1}`);

      if (!columnKey) {
        errors.push(`${tableName} / ${columnTitle} 缺少内部名。`);
        return;
      }

      if (seenKeys.has(columnKey)) {
        errors.push(`${tableName} 中存在重复列内部名：${columnKey}`);
        return;
      }

      seenKeys.add(columnKey);
    });

    rows.forEach((row, rowIndex) => {
      const rowName = normalizeString(row?.name, `行${rowIndex + 1}`);
      const rowCells = row?.cells && typeof row.cells === 'object' && !Array.isArray(row.cells)
        ? row.cells
        : {};

      columns.forEach((column, columnIndex) => {
        const columnKey = normalizeString(column?.key, '');
        const columnLabel = normalizeString(column?.title || columnKey, `列${columnIndex + 1}`);
        const cellValue = columnKey ? normalizeCellValue(rowCells[columnKey]) : '';
        const validation = validateCellByColumn(cellValue, column, {
          label: `${tableName} / ${rowName} / ${columnLabel}`,
          tableName,
          rowName
        });

        errors.push(...validation.errors);
      });
    });
  });

  return {
    valid: errors.length === 0,
    errors,
    tables
  };
}

function buildValidationIssue({
  severity = 'error',
  message = '',
  tableIndex = -1,
  tableName = '',
  columnIndex = -1,
  columnKey = '',
  rowIndex = -1,
  rowName = '',
  cellKey = ''
} = {}) {
  return {
    severity,
    message: normalizeString(message, severity === 'warning' ? '存在警告。' : '存在错误。'),
    tableIndex,
    tableName: normalizeString(tableName, ''),
    columnIndex,
    columnKey: normalizeString(columnKey, ''),
    rowIndex,
    rowName: normalizeString(rowName, ''),
    cellKey: normalizeString(cellKey, '')
  };
}

export function validateTableDraftDeep(draft = {}) {
  const baseValidation = validateTableDraft(draft);
  const issues = [];

  if (!baseValidation.valid) {
    return {
      ...baseValidation,
      warnings: [],
      issues,
      summary: {
        errorCount: baseValidation.errors.length,
        warningCount: 0
      }
    };
  }

  const tables = Array.isArray(baseValidation.tables) ? baseValidation.tables : [];

  tables.forEach((table, tableIndex) => {
    const tableName = normalizeString(table?.name, `表${tableIndex + 1}`);
    const columns = Array.isArray(table?.columns) ? table.columns : [];
    const rows = Array.isArray(table?.rows) ? table.rows : [];
    const usedKeys = new Set();

    if (!tableName) {
      issues.push(buildValidationIssue({
        severity: 'error',
        message: `表 ${tableIndex + 1} 缺少名称。`,
        tableIndex,
        tableName
      }));
    }

    columns.forEach((column, columnIndex) => {
      const columnKey = normalizeString(column?.key, '');
      const columnTitle = normalizeString(column?.title, `列${columnIndex + 1}`);

      if (!columnKey) {
        issues.push(buildValidationIssue({
          severity: 'error',
          message: `${tableName} / ${columnTitle} 缺少内部名。`,
          tableIndex,
          tableName,
          columnIndex,
          columnKey,
          cellKey: columnKey
        }));
      }

      if (columnKey) {
        if (usedKeys.has(columnKey)) {
          issues.push(buildValidationIssue({
            severity: 'error',
            message: `${tableName} 中存在重复列内部名：${columnKey}`,
            tableIndex,
            tableName,
            columnIndex,
            columnKey,
            cellKey: columnKey
          }));
        }
        usedKeys.add(columnKey);
      }
    });

    rows.forEach((row, rowIndex) => {
      const rowName = normalizeString(row?.name, `行${rowIndex + 1}`);
      const rowCells = row?.cells && typeof row.cells === 'object' && !Array.isArray(row.cells)
        ? row.cells
        : {};
      const rowKeys = Object.keys(rowCells);

      rowKeys.forEach((rowKey) => {
        if (!columns.some((column) => normalizeString(column?.key, '') === rowKey)) {
          issues.push(buildValidationIssue({
            severity: 'warning',
            message: `${tableName} / ${rowName} 包含未定义列 ${rowKey}，保存后会被忽略。`,
            tableIndex,
            tableName,
            rowIndex,
            rowName,
            cellKey: rowKey
          }));
        }
      });

      columns.forEach((column, columnIndex) => {
        const columnKey = normalizeString(column?.key, '');
        const columnLabel = normalizeString(column?.title || columnKey, `列${columnIndex + 1}`);
        const cellValue = columnKey ? normalizeCellValue(rowCells[columnKey]) : '';
        const validation = validateCellByColumn(cellValue, column, {
          label: `${tableName} / ${rowName} / ${columnLabel}`,
          tableName,
          rowName
        });

        validation.errors.forEach((message) => {
          issues.push(buildValidationIssue({
            severity: 'error',
            message,
            tableIndex,
            tableName,
            columnIndex,
            columnKey,
            rowIndex,
            rowName,
            cellKey: columnKey
          }));
        });

        validation.warnings.forEach((message) => {
          issues.push(buildValidationIssue({
            severity: 'warning',
            message,
            tableIndex,
            tableName,
            columnIndex,
            columnKey,
            rowIndex,
            rowName,
            cellKey: columnKey
          }));
        });
      });
    });
  });

  const errors = issues.filter((issue) => issue.severity !== 'warning').map((issue) => issue.message);
  const warnings = issues.filter((issue) => issue.severity === 'warning').map((issue) => issue.message);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    issues,
    tables,
    summary: {
      errorCount: errors.length,
      warningCount: warnings.length
    }
  };
}

export function parseTableWorkbenchTemplate(value) {
  return parseTableTemplateValue(value);
}

export function getTableWorkbenchBuiltinTemplates() {
  return getAllTableTemplates();
}

export function getTableWorkbenchDefaultConfig() {
  return {
    tables: cloneTableValue(DEFAULT_TABLE_WORKBENCH_TABLES),
    promptTemplate: DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE,
    apiPreset: '',
    promptPreset: '',
    bypass: {
      enabled: false,
      presetId: ''
    },
    activeTemplate: DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID,
    autoUpdateEnabled: false,
    autoUpdateTrigger: 'assistantMessage',
    runScope: TABLE_RUN_SCOPE.ENABLED,
    scope: {
      mode: TABLE_RUN_SCOPE.ENABLED,
      selectedTableIds: [],
      activeTableId: ''
    },
    fillMode: TABLE_FILL_MODE.INCREMENTAL,
    contextDepth: 8,
    contextRoles: 'all',
    contextExtractTags: [],
    contextUseGlobalRules: false,
    worldbooks: { enabled: false, selected: [] },
    sendLatestRows: -1,
    mirrorToMessage: false,
    mirrorTag: 'yyt-table-workbench',
    worldbookSync: { enabled: false, targetBook: '', entryComment: 'YYT-填表数据' },
    wrapperConfig: {
      enabled: true,
      wrapperTag: '最新数据与记录',
      wrapperHint: '以下是在这个时间点，当前场景下剧情相关的最新数据与记录，你在进行剧情分析时必须以此最新的数据为准，以下数据与记录的优先级高于其他任何背景设定：',
      wrapperPlacement: { position: 'before_character_definition', depth: 2, order: 0 }
    },
    runtime: normalizeRuntime()
  };
}

export function normalizeTableWorkbenchConfig(value = {}) {
  const defaults = getTableWorkbenchDefaultConfig();
  const nextValue = value && typeof value === 'object' ? value : {};
  // v1.0.178 hotfix Bug 3：兼容 UI 工作台保存的顶层 bypassPresetId 字段
  const bypassInput = nextValue.bypass
    ? nextValue.bypass
    : (nextValue.bypassPresetId ? { presetId: nextValue.bypassPresetId, enabled: !!nextValue.bypassPresetId } : undefined);
  const bypass = normalizeBypassConfig(bypassInput, nextValue.promptPreset);
  const tables = normalizeTables(nextValue.tables, { seedDefaultWhenMissing: !Object.prototype.hasOwnProperty.call(nextValue, 'tables') });
  // v1.0.190：顶层 runScope 优先于嵌套 scope.mode（防 H7 类型 bug：
  // UI select 单独保存 runScope 时若 scope.mode 是旧值，normalize 会用旧 scope.mode）
  const incomingScope = nextValue.scope && typeof nextValue.scope === 'object' ? nextValue.scope : {};
  const effectiveScopeInput = (typeof nextValue.runScope === 'string' && nextValue.runScope)
    ? { ...incomingScope, mode: nextValue.runScope }
    : incomingScope;
  const scope = normalizeRunScopeConfig(effectiveScopeInput, {
    mode: nextValue.runScope,
    selectedTableIds: nextValue.selectedTableIds,
    activeTableId: nextValue.activeTableId
  });
  // v1.0.178 hotfix Bug 3：兼容工作台 UI 写入 config.automation.enabled
  const autoUpdateEnabled = normalizeBoolean(
    nextValue.autoUpdateEnabled !== undefined ? nextValue.autoUpdateEnabled : nextValue.automation?.enabled,
    defaults.autoUpdateEnabled
  );

  return {
    tables,
    promptTemplate: normalizeString(nextValue.promptTemplate, defaults.promptTemplate),
    apiPreset: normalizeString(nextValue.apiPreset, ''),
    promptPreset: bypass.presetId,
    bypass,
    activeTemplate: normalizeString(nextValue.activeTemplate, defaults.activeTemplate),
    autoUpdateEnabled,
    autoUpdateTrigger: normalizeString(nextValue.autoUpdateTrigger, defaults.autoUpdateTrigger),
    runScope: scope.mode,
    scope,
    fillMode: nextValue.fillMode === TABLE_FILL_MODE.FULL ? TABLE_FILL_MODE.FULL : defaults.fillMode,
    contextDepth: Number.isFinite(Number(nextValue.contextDepth)) && Number(nextValue.contextDepth) > 0
      ? Math.floor(Number(nextValue.contextDepth)) : defaults.contextDepth,
    contextRoles: nextValue.contextRoles === 'assistant_only' ? 'assistant_only' : 'all',
    contextExtractTags: Array.isArray(nextValue.contextExtractTags)
      ? nextValue.contextExtractTags.filter(v => typeof v === 'string' && v.trim())
      : (typeof nextValue.contextExtractTags === 'string' && nextValue.contextExtractTags.trim()
        ? nextValue.contextExtractTags.split('\n').map(l => l.trim()).filter(Boolean)
        : []),
    contextUseGlobalRules: normalizeBoolean(nextValue.contextUseGlobalRules ?? nextValue.contextUseExtractRules ?? nextValue.contextUseExcludeRules, false),
    // v1.0.178 hotfix Bug 3：接收 extraction.regexPresetId（之前 normalize 完全不保留 extraction 字段）
    extraction: {
      regexPresetId: normalizeString(nextValue.extraction?.regexPresetId, '')
    },
    worldbooks: {
      enabled: normalizeBoolean(nextValue.worldbooks?.enabled, false),
      selected: Array.isArray(nextValue.worldbooks?.selected)
        ? nextValue.worldbooks.selected.filter(v => typeof v === 'string' && v.trim())
        : [],
      // v1.0.178 hotfix Bug 3：worldbooks.presetId 之前没保留
      presetId: normalizeString(nextValue.worldbooks?.presetId, '')
    },
    sendLatestRows: Number.isFinite(Number(nextValue.sendLatestRows))
      ? Math.floor(Number(nextValue.sendLatestRows)) : -1,
    mirrorToMessage: normalizeBoolean(nextValue.mirrorToMessage, defaults.mirrorToMessage),
    mirrorTag: normalizeString(nextValue.mirrorTag, defaults.mirrorTag),
    worldbookSync: {
      enabled: normalizeBoolean(nextValue.worldbookSync?.enabled, false),
      targetBook: normalizeString(nextValue.worldbookSync?.targetBook, ''),
      entryComment: normalizeString(nextValue.worldbookSync?.entryComment, defaults.worldbookSync.entryComment),
      // v1.0.178 hotfix Bug 3：worldbookSync.wrapperConfig 也保留（UI 工作台保存路径）
      wrapperConfig: nextValue.worldbookSync?.wrapperConfig ? {
        enabled: normalizeBoolean(nextValue.worldbookSync.wrapperConfig?.enabled, true),
        wrapperTag: normalizeString(nextValue.worldbookSync.wrapperConfig?.wrapperTag, defaults.wrapperConfig.wrapperTag),
        wrapperHint: normalizeString(nextValue.worldbookSync.wrapperConfig?.wrapperHint, ''),
        wrapperPlacement: {
          position: normalizeString(nextValue.worldbookSync.wrapperConfig?.wrapperPlacement?.position, defaults.wrapperConfig.wrapperPlacement.position),
          depth: Number.isFinite(Number(nextValue.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)) ? Math.floor(Number(nextValue.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)) : defaults.wrapperConfig.wrapperPlacement.depth,
          order: Number.isFinite(Number(nextValue.worldbookSync.wrapperConfig?.wrapperPlacement?.order)) ? Math.floor(Number(nextValue.worldbookSync.wrapperConfig?.wrapperPlacement?.order)) : defaults.wrapperConfig.wrapperPlacement.order
        }
      } : undefined
    },
    wrapperConfig: {
      enabled: normalizeBoolean(nextValue.wrapperConfig?.enabled, defaults.wrapperConfig.enabled),
      wrapperTag: normalizeString(nextValue.wrapperConfig?.wrapperTag, defaults.wrapperConfig.wrapperTag),
      wrapperHint: normalizeString(nextValue.wrapperConfig?.wrapperHint, defaults.wrapperConfig.wrapperHint),
      wrapperPlacement: {
        position: normalizeString(nextValue.wrapperConfig?.wrapperPlacement?.position, defaults.wrapperConfig.wrapperPlacement.position),
        depth: Number.isFinite(Number(nextValue.wrapperConfig?.wrapperPlacement?.depth)) ? Math.floor(Number(nextValue.wrapperConfig?.wrapperPlacement?.depth)) : defaults.wrapperConfig.wrapperPlacement.depth,
        order: Number.isFinite(Number(nextValue.wrapperConfig?.wrapperPlacement?.order)) ? Math.floor(Number(nextValue.wrapperConfig?.wrapperPlacement?.order)) : defaults.wrapperConfig.wrapperPlacement.order
      }
    },
    runtime: normalizeRuntime({
      ...defaults.runtime,
      ...(nextValue.runtime || {})
    })
  };
}

export function validateTableWorkbenchConfig(config = {}) {
  const normalized = normalizeTableWorkbenchConfig(config);
  const errors = [];

  if (!Array.isArray(normalized.tables)) {
    errors.push('表定义必须是 JSON 数组。');
  }

  if (!normalized.promptTemplate) {
    errors.push('填表 Prompt 不能为空。');
  }

  if (!normalized.mirrorTag) {
    errors.push('正文镜像标签不能为空。');
  }

  return {
    valid: errors.length === 0,
    errors,
    config: normalized
  };
}

export function getTableWorkbenchConfig() {
  const stored = tableWorkbenchStorage.get(TABLE_WORKBENCH_CONFIG_KEY, getTableWorkbenchDefaultConfig());
  const normalized = normalizeTableWorkbenchConfig(stored);
  const guide = getCurrentTableGuide();
  return {
    ...applyGuideToConfig(normalized, guide),
    guide
  };
}

function stripRowsForConfigSave(config) {
  const tables = Array.isArray(config?.tables) ? config.tables : [];
  const cleanedTables = tables.map(t => ({
    ...t,
    rows: []
  }));
  return { ...config, tables: cleanedTables };
}

export function saveTableWorkbenchConfig(config = {}) {
  const currentConfig = getTableWorkbenchConfig();
  const mergedConfig = normalizeTableWorkbenchConfig({
    ...currentConfig,
    ...(config || {}),
    runtime: config?.runtime === undefined
      ? currentConfig.runtime
      : config.runtime
  });
  const validation = validateTableWorkbenchConfig(mergedConfig);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.errors.join('\n'),
      errors: validation.errors,
      config: validation.config
    };
  }

  const configToSave = stripRowsForConfigSave(validation.config);
  tableWorkbenchStorage.set(TABLE_WORKBENCH_CONFIG_KEY, configToSave);
  saveCurrentTableGuide({
    templateId: validation.config.activeTemplate,
    scope: validation.config.scope,
    worldbookSync: validation.config.worldbookSync
  });
  return {
    success: true,
    config: validation.config
  };
}

export function applyTableWorkbenchTemplate(templateId) {
  const template = getTableTemplate(templateId);
  if (!template) {
    return { success: false, error: '模板不存在。' };
  }
  const config = getTableWorkbenchConfig();
  return saveTableWorkbenchConfig({
    ...config,
    tables: cloneTableValue(template.tables),
    activeTemplate: template.id,
    promptTemplate: template.promptTemplate || config.promptTemplate
  });
}

export function saveCurrentTableWorkbenchAsTemplate({ name = '', description = '' } = {}) {
  const config = getTableWorkbenchConfig();
  return saveTableTemplate({
    name: normalizeString(name, `${DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME}副本`),
    description,
    tables: cloneTableValue(config.tables),
    promptTemplate: config.promptTemplate
  });
}

export function updateTableWorkbenchRuntime(runtimePatch = {}) {
  const currentConfig = getTableWorkbenchConfig();
  const nextConfig = normalizeTableWorkbenchConfig({
    ...currentConfig,
    runtime: {
      ...currentConfig.runtime,
      ...(runtimePatch || {})
    }
  });

  tableWorkbenchStorage.set(TABLE_WORKBENCH_CONFIG_KEY, nextConfig);
  return nextConfig.runtime;
}

export function buildTableWorkbenchPromptTemplate(config = {}, options = {}) {
  const normalized = normalizeTableWorkbenchConfig(config);
  const basePrompt = normalizeString(normalized.promptTemplate, DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE);
  if (options.skipResponseContract) return basePrompt.trim();
  return `${basePrompt}\n\n${TABLE_WORKBENCH_RESPONSE_CONTRACT}`.trim();
}

export function buildTableWorkbenchToolConfig(config = {}, options = {}) {
  const normalized = normalizeTableWorkbenchConfig(config);

  return {
    id: 'tableWorkbench',
    name: '填表工作台',
    promptTemplate: buildTableWorkbenchPromptTemplate(normalized, options),
    bypass: {
      enabled: normalized.bypass?.enabled === true,
      presetId: normalized.bypass?.presetId || normalized.promptPreset || ''
    }
  };
}

export function getTableWorkbenchFormSchema({ apiPresets = [] } = {}) {
  const presetOptions = [
    { value: '', label: '当前 API 配置' },
    ...apiPresets.map((preset) => ({
      value: String(preset?.name || ''),
      label: String(preset?.name || '')
    })).filter((option) => option.value)
  ];

  return [
    {
      name: 'tables',
      type: 'tableDefinitions',
      label: '表定义',
      description: '通过结构化编辑器维护 tables。首次执行或当前消息尚无绑定 state 时，会以编译后的 tables 作为 merge base。',
      emptyValue: []
    },
    {
      name: 'promptTemplate',
      type: 'textarea',
      label: '填表 Prompt',
      rows: 12,
      description: '可使用 {{lastUserMessage}}、{{lastAiMessage}}、{{chatHistory}}、{{toolContentMacro}} 等变量。系统会自动追加 JSON 输出约束。'
    },
    {
      name: 'apiPreset',
      type: 'select',
      label: 'API 预设',
      description: '为空时使用当前全局 API 配置。',
      options: presetOptions
    },
    {
      name: 'mirrorToMessage',
      type: 'checkbox',
      label: '镜像写回正文',
      description: '把当前 tables 的 JSON 预览镜像到目标 assistant 消息正文中。'
    }
  ];
}

export default {
  TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS,
  DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE,
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID,
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME,
  DEFAULT_TABLE_WORKBENCH_TABLES,
  TABLE_WORKBENCH_RUNTIME_STATUS,
  TABLE_FILL_MODE,
  DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE,
  TABLE_WORKBENCH_RESPONSE_CONTRACT,
  createEmptyTableColumn,
  createEmptyTableRow,
  createEmptyTableDefinition,
  createEmptyTableDraft,
  deriveTableDraftFromTables,
  compileTableDraftToTables,
  validateTableDraft,
  validateTableDraftDeep,
  getTableWorkbenchBuiltinTemplates,
  parseTableWorkbenchTemplate,
  getTableWorkbenchDefaultConfig,
  normalizeTableWorkbenchConfig,
  validateTableWorkbenchConfig,
  getTableWorkbenchConfig,
  saveTableWorkbenchConfig,
  applyTableWorkbenchTemplate,
  saveCurrentTableWorkbenchAsTemplate,
  updateTableWorkbenchRuntime,
  buildTableWorkbenchPromptTemplate,
  buildTableWorkbenchToolConfig,
  getTableWorkbenchFormSchema
};