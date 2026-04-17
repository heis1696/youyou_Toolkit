/**
 * YouYou Toolkit - 填表工作台配置服务
 * @description 管理 tableWorkbench 的最小配置、schema 与运行时状态
 */

import { storage } from '../core/storage-service.js';
import { cloneTableValue } from './table-types.js';

const tableWorkbenchStorage = storage.namespace('tableWorkbench');
const TABLE_WORKBENCH_CONFIG_KEY = 'config';

export const TABLE_WORKBENCH_RUNTIME_STATUS = Object.freeze({
  IDLE: 'idle',
  RUNNING: 'running',
  SUCCESS: 'success',
  ERROR: 'error'
});

export const DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE = `请根据当前对话与当前表格基底，更新结构化 tables 数据。

要求：
1. 只依据当前对话内容更新，不要臆造未出现的信息。
2. 保持原有表结构；没有依据时保留原值。
3. 如果某字段需要清空，请显式输出空字符串、空数组或 null。
4. 优先参考当前 assistant 回复：{{lastAiMessage}}
5. 当前表格基底 JSON：
{{toolContentMacro}}`;

export const TABLE_WORKBENCH_RESPONSE_CONTRACT = `输出要求：
- 只返回 JSON
- 不要附加解释、标题或 Markdown
- JSON 结构必须是：
{
  "tables": []
}`;

const TABLE_WORKBENCH_COLUMN_TYPES = Object.freeze([
  { value: 'text', label: '文本' },
  { value: 'number', label: '数字' },
  { value: 'boolean', label: '布尔' },
  { value: 'date', label: '日期' },
  { value: 'json', label: 'JSON' }
]);

export const DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE = 'text';

export const TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS = Object.freeze(
  TABLE_WORKBENCH_COLUMN_TYPES.map((option) => Object.freeze({ ...option }))
);

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function normalizeBoolean(value, fallback = false) {
  if (value === undefined || value === null) return fallback;
  return value === true;
}

function normalizeTables(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return cloneTableValue(value);
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
    name: normalizeString(sourceValue.name || sourceValue.title || sourceValue.label, `行${index + 1}`),
    cells
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

  return {
    name: normalizeString(sourceValue.name || sourceValue.title, `表${index + 1}`),
    note: normalizeString(sourceValue.note || sourceValue.description, ''),
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

  return {
    lastStatus: normalizeString(value.lastStatus, TABLE_WORKBENCH_RUNTIME_STATUS.IDLE),
    lastRunAt: Number.isFinite(value.lastRunAt) ? value.lastRunAt : 0,
    lastDurationMs: Number.isFinite(value.lastDurationMs) ? value.lastDurationMs : 0,
    lastError: normalizeString(value.lastError, ''),
    successCount: Number.isFinite(value.successCount) ? value.successCount : 0,
    errorCount: Number.isFinite(value.errorCount) ? value.errorCount : 0,
    lastSourceMessageId: normalizeString(value.lastSourceMessageId, ''),
    lastSlotRevisionKey: normalizeString(value.lastSlotRevisionKey, ''),
    lastLoadMode: normalizeString(value.lastLoadMode, ''),
    lastMirrorApplied: value.lastMirrorApplied === true
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
    name: `行${rowIndex}`,
    cells
  };
}

export function createEmptyTableDefinition(tableIndex = 1) {
  const firstColumn = createEmptyTableColumn(1);

  return {
    name: `表${tableIndex}`,
    note: '',
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

export function validateTableDraft(draft = {}) {
  const errors = [];

  if (!draft || typeof draft !== 'object') {
    errors.push('表定义草稿无效。');
  }

  if (draft && draft.tables !== undefined && !Array.isArray(draft.tables)) {
    errors.push('表定义必须包含 tables 数组。');
  }

  let tables = [];
  if (errors.length === 0) {
    try {
      tables = compileTableDraftToTables(draft);
    } catch (error) {
      errors.push(error?.message || '表定义编译失败。');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    tables
  };
}

export function getTableWorkbenchDefaultConfig() {
  return {
    tables: [],
    promptTemplate: DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE,
    apiPreset: '',
    mirrorToMessage: false,
    mirrorTag: 'yyt-table-workbench',
    runtime: normalizeRuntime()
  };
}

export function normalizeTableWorkbenchConfig(value = {}) {
  const defaults = getTableWorkbenchDefaultConfig();
  const nextValue = value && typeof value === 'object' ? value : {};

  return {
    tables: normalizeTables(nextValue.tables),
    promptTemplate: normalizeString(nextValue.promptTemplate, defaults.promptTemplate),
    apiPreset: normalizeString(nextValue.apiPreset, ''),
    mirrorToMessage: normalizeBoolean(nextValue.mirrorToMessage, defaults.mirrorToMessage),
    mirrorTag: normalizeString(nextValue.mirrorTag, defaults.mirrorTag),
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
  return normalizeTableWorkbenchConfig(stored);
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

  tableWorkbenchStorage.set(TABLE_WORKBENCH_CONFIG_KEY, validation.config);
  return {
    success: true,
    config: validation.config
  };
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

export function buildTableWorkbenchPromptTemplate(config = {}) {
  const normalized = normalizeTableWorkbenchConfig(config);
  const basePrompt = normalizeString(normalized.promptTemplate, DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE);
  return `${basePrompt}\n\n${TABLE_WORKBENCH_RESPONSE_CONTRACT}`.trim();
}

export function buildTableWorkbenchToolConfig(config = {}) {
  return {
    id: 'tableWorkbench',
    name: '填表工作台',
    promptTemplate: buildTableWorkbenchPromptTemplate(config),
    bypass: {
      enabled: false
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
  TABLE_WORKBENCH_RUNTIME_STATUS,
  DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE,
  TABLE_WORKBENCH_RESPONSE_CONTRACT,
  createEmptyTableColumn,
  createEmptyTableRow,
  createEmptyTableDefinition,
  createEmptyTableDraft,
  deriveTableDraftFromTables,
  compileTableDraftToTables,
  validateTableDraft,
  getTableWorkbenchDefaultConfig,
  normalizeTableWorkbenchConfig,
  validateTableWorkbenchConfig,
  getTableWorkbenchConfig,
  saveTableWorkbenchConfig,
  updateTableWorkbenchRuntime,
  buildTableWorkbenchPromptTemplate,
  buildTableWorkbenchToolConfig,
  getTableWorkbenchFormSchema
};