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

export const TABLE_FILL_MODE = Object.freeze({
  INCREMENTAL: 'incremental',
  FULL: 'full'
});

export const DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE = `请根据当前对话与当前表格基底，更新结构化 tables 数据。

要求：
1. 只依据当前对话内容更新，不要臆造未出现的信息。
2. 保持原有表结构；没有依据时保留原值。
3. 如果某字段需要清空，请显式输出空字符串、空数组或 null。
4. 优先参考当前 assistant 回复：{{lastAiMessage}}
5. 表格级 AI 操作说明：
{{tableGuidance}}
6. 当前表格基底 JSON：
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

export const DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID = 'default_story_state';
export const DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME = '默认剧情状态模板';

function createDefaultColumn(key, title, description = '', type = DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE) {
  return {
    key,
    title,
    description,
    type,
    required: false
  };
}

function createDefaultTable({ id, name, note, aiInstructions, columns }) {
  return {
    id,
    name,
    note,
    enabled: true,
    aiInstructions: {
      init: aiInstructions?.init || '',
      create: aiInstructions?.create || '',
      update: aiInstructions?.update || '',
      delete: aiInstructions?.delete || ''
    },
    columns,
    rows: []
  };
}

export const DEFAULT_TABLE_WORKBENCH_TABLES = Object.freeze([
  createDefaultTable({
    id: 'default_global_state',
    name: '全局数据表',
    note: '记录当前主角所在地点及时间相关参数。此表通常有且仅有一行。',
    aiInstructions: {
      init: '插入一条关于当前世界状态的记录。',
      create: '通常禁止新增；除非表为空且需要初始化。',
      update: '当地点或时间发生变化时更新此表；每轮应根据剧情更新时间相关字段。',
      delete: '禁止删除。'
    },
    columns: [
      createDefaultColumn('location', '主角当前所在地点', '主角当前所在的具体场景名称。'),
      createDefaultColumn('current_time', '当前时间', '游戏世界的当前时间；如剧情没有明确时间，可根据世界观给出合理时间。'),
      createDefaultColumn('previous_scene_time', '上轮场景时间', '上一轮交互结束时的时间。'),
      createDefaultColumn('elapsed_time', '经过的时间', '根据当前与上轮时间计算出的文本描述。')
    ]
  }),
  createDefaultTable({
    id: 'default_protagonist_profile',
    name: '主角信息',
    note: '记录主角的核心身份信息。此表通常有且仅有一行。',
    aiInstructions: {
      init: '初始化时插入主角的唯一条目。',
      create: '禁止新增多名主角；除非表为空且需要初始化。',
      update: '当主角身份、外貌、经历或性格有明确变化时更新。',
      delete: '禁止删除。'
    },
    columns: [
      createDefaultColumn('name', '人物名称', '主角的名字。'),
      createDefaultColumn('gender_age', '性别/年龄', '主角的性别与年龄。'),
      createDefaultColumn('appearance', '外貌特征', '对主角外貌的客观文字描写。'),
      createDefaultColumn('identity', '职业/身份', '主角在社会或剧情中的主要身份。'),
      createDefaultColumn('history', '过往经历', '主角背景故事与关键经历，随剧情增量更新。'),
      createDefaultColumn('personality', '性格特点', '对主角核心性格的概括。')
    ]
  }),
  createDefaultTable({
    id: 'default_important_characters',
    name: '重要角色表',
    note: '记录关键 NPC 或重要角色的信息和动态状态。',
    aiInstructions: {
      init: '初始化时为当前在场的重要人物分别插入条目。',
      create: '剧情中有未记录的重要人物登场时新增。',
      update: '已有角色的状态、关系、想法、经历或持有物变化时更新。',
      delete: '通常禁止删除；角色离场时优先更新“是否离场”。'
    },
    columns: [
      createDefaultColumn('name', '姓名', '角色姓名。'),
      createDefaultColumn('gender_age', '性别/年龄', '角色的性别与年龄。'),
      createDefaultColumn('summary', '一句话介绍', '用简短文字概括角色身份背景。'),
      createDefaultColumn('appearance', '外貌特征', '对角色外貌和当前衣着的客观描写。'),
      createDefaultColumn('important_items', '持有的重要物品', '角色拥有的关键物品，用分号分隔。'),
      createDefaultColumn('offstage', '是否离场', '判断该角色当前是否已经离场，填写“是”或“否”。', 'boolean'),
      createDefaultColumn('history', '过往经历', '角色背景与关键事件，随剧情增量更新。')
    ]
  }),
  createDefaultTable({
    id: 'default_protagonist_skills',
    name: '主角技能表',
    note: '记录主角获得的技能、能力或阶段性成长。',
    aiInstructions: {
      init: '初始化时根据设定添加主角的初始技能。',
      create: '主角获得新技能或新能力时新增。',
      update: '已有技能升级、降级或效果变化时更新。',
      delete: '技能被剧情剥夺、替换或失效时删除。'
    },
    columns: [
      createDefaultColumn('skill_name', '技能名称', '技能或能力名称。'),
      createDefaultColumn('skill_type', '技能类型', '技能类别，例如主动、被动、天赋等。'),
      createDefaultColumn('level', '等级/阶段', '技能当前等级、熟练度或阶段。'),
      createDefaultColumn('effect', '效果描述', '技能在当前阶段下的具体效果。')
    ]
  }),
  createDefaultTable({
    id: 'default_inventory',
    name: '背包物品表',
    note: '记录主角拥有的物品、装备或消耗品。',
    aiInstructions: {
      init: '初始化时根据剧情与设定添加主角的初始携带物品。',
      create: '主角获得背包中没有的全新物品时新增。',
      update: '已有物品数量、状态或描述变化时更新。',
      delete: '物品被完全消耗、丢弃或摧毁时删除。'
    },
    columns: [
      createDefaultColumn('item_name', '物品名称', '物品名称。'),
      createDefaultColumn('quantity', '数量', '拥有数量。', 'number'),
      createDefaultColumn('description', '描述/效果', '物品功能、效果或背景描述。'),
      createDefaultColumn('category', '类别', '物品类别，例如武器、消耗品、杂物等。')
    ]
  }),
  createDefaultTable({
    id: 'default_quests_events',
    name: '任务与事件表',
    note: '记录当前正在进行或需要持续追踪的任务与事件。',
    aiInstructions: {
      init: '初始化时根据剧情与设定添加主要任务或关键事件。',
      create: '主角接取、触发或发现新的任务与事件时新增。',
      update: '任务取得关键进展、目标变化或时限变化时更新。',
      delete: '任务完成、失败、过期或不再需要追踪时删除。'
    },
    columns: [
      createDefaultColumn('quest_name', '任务名称', '任务或事件标题。'),
      createDefaultColumn('quest_type', '任务类型', '主线、支线、个人、突发事件等。'),
      createDefaultColumn('issuer', '发布者', '发布任务或触发事件的角色、地点或势力。'),
      createDefaultColumn('detail', '详细描述', '任务目标、事件背景和要求。'),
      createDefaultColumn('progress', '当前进度', '对完成度或当前阶段的简要描述。'),
      createDefaultColumn('deadline', '任务时限', '完成任务的剩余时间或截止条件。'),
      createDefaultColumn('reward', '奖励', '完成后可能获得的奖励。'),
      createDefaultColumn('penalty', '惩罚', '失败或错过后的后果。')
    ]
  }),
  createDefaultTable({
    id: 'default_memo_log',
    name: '纪要表',
    note: '记录每轮或关键片段发生的事件纪要，用于后续回顾。',
    aiInstructions: {
      init: '故事初始化时插入一条记录，用于记录初始化剧情。',
      create: '每轮交互结束后，若发生了值得记录的新事件，则插入一条新纪要。',
      update: '通常禁止更新历史纪要；只有明显事实错误时才修正。',
      delete: '禁止删除。'
    },
    columns: [
      createDefaultColumn('time_span', '时间跨度', '本轮事件发生的时间范围。'),
      createDefaultColumn('location', '地点', '本轮事件发生地点。'),
      createDefaultColumn('memo', '纪要', '以第三方视角客观记录本轮发生的事实。'),
      createDefaultColumn('summary', '概览', '一句话概括纪要内容。'),
      createDefaultColumn('index_code', '编码索引', '用于后续检索的简短编码。')
    ]
  }),
  createDefaultTable({
    id: 'default_options',
    name: '选项表',
    note: '记录每轮主角可以采取的行动选项。此表通常有且仅有一行。所有选项使用第三人称，不代替主角发言，并紧扣当前剧情。',
    aiInstructions: {
      init: '初始化时生成四个初始行动选项。',
      create: '通常禁止新增；除非表为空且需要初始化。',
      update: '每轮交互后根据当前剧情生成新的四个选项并覆盖原有内容。',
      delete: '禁止删除。'
    },
    columns: [
      createDefaultColumn('option_1', '选项一', '偏向策略、推进剧情或解决当前问题的行动。'),
      createDefaultColumn('option_2', '选项二', '偏向谨慎观察、收集信息或保持中立的行动。'),
      createDefaultColumn('option_3', '选项三', '偏向帮助、保护、沟通或安抚的行动。'),
      createDefaultColumn('option_4', '选项四', '偏向冒险、试探、改变局势或关系互动的行动。')
    ]
  })
]);

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function normalizeBoolean(value, fallback = false) {
  if (value === undefined || value === null) return fallback;
  return value === true;
}

function normalizeTables(value, { seedDefaultWhenMissing = false } = {}) {
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
    id: normalizeString(sourceValue.id, ''),
    name: normalizeString(sourceValue.name || sourceValue.title, `表${index + 1}`),
    note: normalizeString(sourceValue.note || sourceValue.description, ''),
    enabled: sourceValue.enabled !== false,
    aiInstructions: normalizeTableAiInstructions(sourceValue.aiInstructions),
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
    id: '',
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
  return [
    {
      id: DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID,
      name: DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME,
      description: '包含全局数据、主角、重要角色、技能、背包、任务、纪要和选项表。',
      tables: cloneTableValue(DEFAULT_TABLE_WORKBENCH_TABLES)
    }
  ];
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
    runScope: 'enabled',
    fillMode: TABLE_FILL_MODE.INCREMENTAL,
    mirrorToMessage: false,
    mirrorTag: 'yyt-table-workbench',
    runtime: normalizeRuntime()
  };
}

export function normalizeTableWorkbenchConfig(value = {}) {
  const defaults = getTableWorkbenchDefaultConfig();
  const nextValue = value && typeof value === 'object' ? value : {};
  const bypass = normalizeBypassConfig(nextValue.bypass, nextValue.promptPreset);

  return {
    tables: normalizeTables(nextValue.tables, { seedDefaultWhenMissing: !Object.prototype.hasOwnProperty.call(nextValue, 'tables') }),
    promptTemplate: normalizeString(nextValue.promptTemplate, defaults.promptTemplate),
    apiPreset: normalizeString(nextValue.apiPreset, ''),
    promptPreset: bypass.presetId,
    bypass,
    activeTemplate: normalizeString(nextValue.activeTemplate, defaults.activeTemplate),
    autoUpdateEnabled: normalizeBoolean(nextValue.autoUpdateEnabled, defaults.autoUpdateEnabled),
    autoUpdateTrigger: normalizeString(nextValue.autoUpdateTrigger, defaults.autoUpdateTrigger),
    runScope: normalizeString(nextValue.runScope, defaults.runScope),
    fillMode: nextValue.fillMode === TABLE_FILL_MODE.FULL ? TABLE_FILL_MODE.FULL : defaults.fillMode,
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
  const normalized = normalizeTableWorkbenchConfig(config);

  return {
    id: 'tableWorkbench',
    name: '填表工作台',
    promptTemplate: buildTableWorkbenchPromptTemplate(normalized),
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
  updateTableWorkbenchRuntime,
  buildTableWorkbenchPromptTemplate,
  buildTableWorkbenchToolConfig,
  getTableWorkbenchFormSchema
};