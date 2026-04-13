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
      type: 'json',
      label: '表定义 / 初始 tables',
      rows: 14,
      description: '填写 tables 数组 JSON。首次执行或当前消息尚无绑定 state 时，会以它作为 merge base。',
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
  TABLE_WORKBENCH_RUNTIME_STATUS,
  DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE,
  TABLE_WORKBENCH_RESPONSE_CONTRACT,
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
