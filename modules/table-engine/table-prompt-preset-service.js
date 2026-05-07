/**
 * YouYou Toolkit - 填表提示词预设服务
 * @description 管理 tableWorkbench 的 YouYou / shujuku 填表提示词组资产
 */

import { storage } from '../core/storage-service.js';

const promptPresetStorage = storage.namespace('tableWorkbenchPromptPresets');
const PRESET_LIST_KEY = 'presets';

export const TABLE_PROMPT_PRESET_SOURCE = Object.freeze({
  YOUYOU: 'youyou',
  SHUJUKU_PROMPT_GROUP: 'shujuku_prompt_group'
});

export const TABLE_PROMPT_RESPONSE_FORMAT = Object.freeze({
  JSON: 'json',
  TABLE_EDIT: 'tableEdit',
  UNKNOWN: 'unknown'
});

export const SHUJUKU_NATIVE_PROMPT_PRESET_ID = 'shujuku_native_table_prompt';

const SHUJUKU_PLACEHOLDER_MAP = Object.freeze({
  $0: '{{toolContentMacro}}',
  $1: '{{rawRecentMessagesText}}',
  $4: '{{toolWorldbookContent}}',
  $8: '{{userMessage}}',
  $C: '{{characterCard}}'
});

const UNSUPPORTED_SHUJUKU_PLACEHOLDERS = Object.freeze(['$6', '$U']);

const SHUJUKU_NATIVE_SEGMENTS = Object.freeze([
  { role: 'SYSTEM', content: '你是一个助手，负责听从用户的指令完成你的工作', deletable: true },
  { role: 'assistant', content: '收到，我将充分描绘主人的意志，毫不偷懒，并且我一定会遵照主人的要求', deletable: true },
  { role: 'USER', content: '以下是你可能需要用到的背景设定，注意你只需要其中关于剧情以及人设方面的数据，不需要思考里边除此之外的任何格式或者思维链方面的要求：\n<背景设定>\n<User基础设定>\n$U\n</User基础设定>\n$C\n$4\n</背景设定>\n\n<正文数据>\n$1\n</正文数据>\n\n\n', deletable: true },
  { role: 'assistant', content: '收到，我将按照要求认真阅读背景设定，并将其中关于剧情以及人设方面的数据运用到后续思考当中。', deletable: true },
  { role: 'USER', content: '你是【填表AI】，负责根据用户提供的资料对表格数据执行增删改操作。\n\n## 核心任务\n依据三类资料来源执行表格编辑：\n- <背景设定>：故事及人物设定\n- <正文数据>：上轮发生的故事\n- <当前表格数据>：之前的数据作为填表基础\n\n## 输出格式（严格执行）\n\n<thought>\n[分析当前轮次的剧情变化]\n[阅读所有填表相关规则]\n[根据填表规则确定需要修改的表格和字段]\n[逐步推理每个修改操作，说明理由]\n针对纪要表的额外规则：如果<当前表格数据>里存在纪要表，那么本轮就必须对其进行插入一条新的总结记录。\n日志与纪要语气校准：你在思考纪要时，必须区分“正常恋爱互动”与“暗黑主从文风”。你可以使用正常的交流词汇（如：提议、要求、同意、拒绝、引导、配合、安抚），但【绝对禁止】将情侣间的普通调情与互动过度解读为“权力掌控”、“剥夺反抗”、“精神支配”、“屈服”等单向压迫词汇！</thought>\n\n<content>\n<tableEdit>\ninsertRow(表格ID, {"0":"字段0值","1":"字段1值","2":"字段2值"})\nupdateRow(表格ID, 行号, {"0":"字段0值","1":"字段1值","2":"字段2值"})\ndeleteRow(表格ID, 行号)\n</tableEdit>\n</content>\n\n## 关键规则\n1. 必须逐表阅读每个表格的note部分，严格遵守其中的约束\n2. note的约束优先级最高，高于通用填表经验\n3. 若note要求禁止修改/格式固定/编码规则，必须严格执行\n4.除了note外，可能还存在某些存放特殊填表规则的表格，填表前需先进行阅读，并严格遵守其中的约束。\n5. 使用insertRow添加新行，updateRow更新已有行，deleteRow删除行\n\n## 格式要点\n- 必须使用双引号\n- 逗号后不加空格\n- `insertRow(表格ID, {...})` 和 `updateRow(表格ID, 行号, {...})` 里的表格ID、行号必须输出纯数字，不要写成字符串\n- 对象里的每一列都必须显式写成 `"数字键":"值"`，禁止省略键名后只连续输出裸字符串\n- 如果字段值内部需要出现双引号，必须转义为\\"，例如："秉持\\"谁欺负我就打谁\\"的信念"\n- 如果字段值内部需要换行，必须写成\\n，不能直接输出真实换行\n- 如果一句话里含有很多引号，优先改写措辞，尽量避免在JSON值里直接嵌套引号\n\n现在开始按此格式执行填表任务。', deletable: false, mainSlot: 'A' },
  { role: 'assistant', content: '收到命令，我将严格按照用户要求执行填表任务，并仅输出符合格式约束的内容。', deletable: true },
  { role: 'USER', content: '现在请按照我的要求立刻开始你的工作 \n========================\n\n以下是当前的<当前表格数据>,记录有本轮之前的数据，你的一切操作指令都必须在这个<当前表格数据>的基础与指导上进行：\n<当前表格数据>\n$0\n</当前表格数据>\n\n$8', deletable: false, mainSlot: 'B' },
  { role: 'assistant', content: '<thought>\n收到指令，我将一步一步开始思考，并完成填表，首先我要分析当前轮次的剧情变化', deletable: true }
]);

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function createPresetId(prefix = 'table_prompt') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function createSegmentId(index = 0) {
  return `segment_${index + 1}_${Math.random().toString(36).slice(2, 7)}`;
}

function normalizeRole(role) {
  const normalized = normalizeString(role, 'user').toLowerCase();
  if (normalized === 'system') return 'system';
  if (normalized === 'assistant' || normalized === 'ai') return 'assistant';
  return 'user';
}

function normalizeMainSlot(segment = {}) {
  const explicit = normalizeString(segment.mainSlot, '').toUpperCase();
  if (explicit === 'A' || explicit === 'B') return explicit;
  if (segment.isMain === true) return 'A';
  if (segment.isMain2 === true) return 'B';
  return '';
}

function mapShujukuPlaceholders(content = '') {
  let nextContent = String(content || '');
  Object.entries(SHUJUKU_PLACEHOLDER_MAP).forEach(([from, to]) => {
    nextContent = nextContent.split(from).join(to);
  });
  return nextContent;
}

function collectWarnings(segments = []) {
  const warnings = [];
  const joined = segments.map(segment => segment.content || '').join('\n');
  UNSUPPORTED_SHUJUKU_PLACEHOLDERS.forEach((placeholder) => {
    if (joined.includes(placeholder)) {
      warnings.push(`保留未映射 shujuku 占位符 ${placeholder}，当前宿主没有稳定来源。`);
    }
  });
  if (joined.includes('<tableEdit>')) {
    warnings.push('该预设要求 tableEdit 输出；当前 YouYou 原生解析链仍以 JSON / incremental edits 为准。');
  }
  return warnings;
}

export function normalizeTablePromptSegment(segment = {}, index = 0, { mapPlaceholders = false } = {}) {
  const content = mapPlaceholders ? mapShujukuPlaceholders(segment.content || '') : String(segment.content || '');
  const mainSlot = normalizeMainSlot(segment);
  return {
    id: normalizeString(segment.id, createSegmentId(index)),
    role: normalizeRole(segment.role || segment.type),
    content,
    deletable: mainSlot ? segment.deletable !== false : segment.deletable !== false,
    mainSlot
  };
}

export function normalizeTablePromptPreset(value = {}) {
  const now = new Date().toISOString();
  const source = value && typeof value === 'object' ? value : {};
  const sourceFormat = normalizeString(source.sourceFormat, TABLE_PROMPT_PRESET_SOURCE.YOUYOU);
  const responseFormat = normalizeString(source.responseFormat, TABLE_PROMPT_RESPONSE_FORMAT.JSON);
  const recommendedFillMode = normalizeString(source.recommendedFillMode, '');
  const segments = Array.isArray(source.segments)
    ? source.segments.map((segment, index) => normalizeTablePromptSegment(segment, index))
    : [];
  return {
    id: normalizeString(source.id, createPresetId()),
    name: normalizeString(source.name, '未命名填表提示词预设'),
    description: normalizeString(source.description, ''),
    sourceFormat,
    responseFormat: Object.values(TABLE_PROMPT_RESPONSE_FORMAT).includes(responseFormat) ? responseFormat : TABLE_PROMPT_RESPONSE_FORMAT.UNKNOWN,
    recommendedFillMode: ['incremental', 'full', ''].includes(recommendedFillMode) ? recommendedFillMode : '',
    segments,
    warnings: Array.isArray(source.warnings) ? source.warnings.map(item => normalizeString(item, '')).filter(Boolean) : [],
    createdAt: normalizeString(source.createdAt, now),
    updatedAt: normalizeString(source.updatedAt, now)
  };
}

export function importShujukuPromptGroup(value, { name = '', description = '' } = {}) {
  const rawSegments = Array.isArray(value)
    ? value
    : (Array.isArray(value?.segments) ? value.segments : []);
  if (!rawSegments.length) {
    return { success: false, error: 'shujuku 填表提示词 JSON 必须是非空数组。' };
  }
  const segments = rawSegments.map((segment, index) => normalizeTablePromptSegment(segment, index, { mapPlaceholders: true }));
  const preset = normalizeTablePromptPreset({
    name: normalizeString(name || value?.name, 'shujuku 填表提示词'),
    description: normalizeString(description || value?.description, '从 shujuku prompt group 导入。'),
    sourceFormat: TABLE_PROMPT_PRESET_SOURCE.SHUJUKU_PROMPT_GROUP,
    responseFormat: segments.some(segment => segment.content.includes('<tableEdit>'))
      ? TABLE_PROMPT_RESPONSE_FORMAT.TABLE_EDIT
      : TABLE_PROMPT_RESPONSE_FORMAT.UNKNOWN,
    recommendedFillMode: 'incremental',
    segments,
    warnings: collectWarnings(segments)
  });
  return saveTablePromptPreset(preset);
}

export function exportShujukuPromptGroup(presetInput = {}) {
  const preset = normalizeTablePromptPreset(presetInput);
  return preset.segments.map((segment) => ({
    role: segment.role === 'system' ? 'SYSTEM' : (segment.role === 'assistant' ? 'assistant' : 'USER'),
    content: segment.content || '',
    deletable: segment.deletable !== false,
    ...(segment.mainSlot ? { mainSlot: segment.mainSlot } : {}),
    ...(segment.mainSlot === 'A' ? { isMain: true } : {}),
    ...(segment.mainSlot === 'B' ? { isMain2: true } : {})
  }));
}

function buildBuiltinShujukuPreset() {
  const segments = SHUJUKU_NATIVE_SEGMENTS.map((segment, index) => normalizeTablePromptSegment(segment, index, { mapPlaceholders: true }));
  return normalizeTablePromptPreset({
    id: SHUJUKU_NATIVE_PROMPT_PRESET_ID,
    name: 'shujuku 默认填表提示词',
    description: '从 shujuku 默认 native 填表 prompt group 迁移；当前保留 tableEdit 兼容警告。',
    sourceFormat: TABLE_PROMPT_PRESET_SOURCE.SHUJUKU_PROMPT_GROUP,
    responseFormat: TABLE_PROMPT_RESPONSE_FORMAT.TABLE_EDIT,
    recommendedFillMode: 'incremental',
    segments,
    warnings: collectWarnings(segments)
  });
}

export function getBuiltinTablePromptPresets() {
  return [{ ...buildBuiltinShujukuPreset(), readonly: true }];
}

export function getUserTablePromptPresets() {
  const stored = promptPresetStorage.get(PRESET_LIST_KEY, []);
  return Array.isArray(stored) ? stored.map(normalizeTablePromptPreset) : [];
}

export function getAllTablePromptPresets() {
  const builtin = getBuiltinTablePromptPresets();
  const ids = new Set(builtin.map(preset => preset.id));
  return [...builtin, ...getUserTablePromptPresets().filter(preset => !ids.has(preset.id))];
}

export function getTablePromptPreset(presetId) {
  const id = normalizeString(presetId, '');
  return getAllTablePromptPresets().find(preset => preset.id === id) || null;
}

export function saveTablePromptPreset(presetInput = {}) {
  const now = new Date().toISOString();
  const preset = normalizeTablePromptPreset({
    ...presetInput,
    id: normalizeString(presetInput.id, createPresetId()),
    createdAt: normalizeString(presetInput.createdAt, now),
    updatedAt: now
  });
  const nextPresets = getUserTablePromptPresets().filter(item => item.id !== preset.id);
  nextPresets.push(preset);
  promptPresetStorage.set(PRESET_LIST_KEY, nextPresets);
  return { success: true, preset };
}

export function deleteTablePromptPreset(presetId) {
  const id = normalizeString(presetId, '');
  if (!id || id === SHUJUKU_NATIVE_PROMPT_PRESET_ID) {
    return { success: false, error: '内置提示词预设不能删除。' };
  }
  promptPresetStorage.set(PRESET_LIST_KEY, getUserTablePromptPresets().filter(preset => preset.id !== id));
  return { success: true };
}

export default {
  normalizeTablePromptSegment,
  normalizeTablePromptPreset,
  importShujukuPromptGroup,
  exportShujukuPromptGroup,
  getBuiltinTablePromptPresets,
  getUserTablePromptPresets,
  getAllTablePromptPresets,
  getTablePromptPreset,
  saveTablePromptPreset,
  deleteTablePromptPreset
};
