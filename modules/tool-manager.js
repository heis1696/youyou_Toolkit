/**
 * YouYou Toolkit - 工具管理核心模块
 * @description 管理工具定义、预设和执行配置
 */

import { toolStorage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';

// ============================================================
// 工具数据结构定义
// ============================================================

/**
 * @typedef {Object} ToolDefinition
 * @property {string} id - 工具唯一标识符
 * @property {string} name - 工具显示名称
 * @property {string} description - 工具描述
 * @property {string} category - 工具分类 (api, prompt, utility, etc.)
 * @property {Object} config - 工具配置
 * @property {Object} config.execution - 执行配置
 * @property {number} config.execution.timeout - 超时时间(ms)
 * @property {number} config.execution.retries - 重试次数
 * @property {Object} config.api - API配置
 * @property {string} config.api.preset - API预设名称
 * @property {Object[]} config.messages - 消息模板
 * @property {Object} config.context - 上下文配置
 * @property {number} config.context.depth - 上下文深度
 * @property {string[]} config.context.includeTags - 包含的标签
 * @property {string[]} config.context.excludeTags - 排除的标签
 * @property {boolean} enabled - 是否启用
 * @property {Object} metadata - 元数据
 */

/**
 * 默认工具定义结构
 */
const DEFAULT_TOOL_STRUCTURE = {
  id: '',
  name: '',
  description: '',
  icon: 'fa-screwdriver-wrench',
  order: 100,
  category: 'utility',
  promptTemplate: '',
  extractTags: [],
  config: {
    execution: {
      timeout: 60000,
      retries: 3
    },
    api: {
      preset: '',
      useBypass: false,
      bypassPreset: ''
    },
    messages: [],
    context: {
      depth: 3,
      includeTags: [],
      excludeTags: []
    },
    automation: {
      enabled: false,
      settleMs: 1200,
      cooldownMs: 5000
    },
    worldbooks: {
      enabled: false,
      selected: []
    }
  },
  enabled: true,
  metadata: {
    createdAt: null,
    updatedAt: null,
    author: '',
    version: '1.0.0'
  }
};

const DEFAULT_TOOL_PRESETS = {};

const TOOL_STORAGE_KEYS = {
  TOOLS: 'tools',
  PRESETS: 'tool_presets',
  CURRENT_PRESET: 'current_tool_preset'
};

function sanitizeStoredToolDefinitions(tools = {}) {
  if (!tools || typeof tools !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(tools).map(([toolId, toolDef]) => [
      toolId,
      createDefaultToolDefinition({
        ...(toolDef || {}),
        id: toolId
      })
    ])
  );
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map(item => String(item || '').trim()).filter(Boolean);
}

function normalizePositiveInteger(value, fallback) {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeNonNegativeInteger(value, fallback) {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function normalizeAutomationConfig(automation = {}) {
  return {
    enabled: automation?.enabled === true,
    settleMs: normalizeNonNegativeInteger(automation?.settleMs, 1200),
    cooldownMs: normalizeNonNegativeInteger(automation?.cooldownMs, 5000)
  };
}

function normalizeWorldbookConfig(worldbooks = {}) {
  return {
    enabled: worldbooks?.enabled === true,
    selected: normalizeStringArray(worldbooks?.selected)
  };
}

function buildPromptTemplateFromMessages(messages = []) {
  const normalizedMessages = Array.isArray(messages)
    ? messages
      .map(message => ({
        role: String(message?.role || 'user').trim().toUpperCase(),
        content: String(message?.content || '').trim()
      }))
      .filter(message => message.content)
    : [];

  if (normalizedMessages.length === 0) {
    return '';
  }

  if (normalizedMessages.length === 1) {
    return normalizedMessages[0].content;
  }

  return normalizedMessages
    .map(message => `【${message.role || 'USER'}】\n${message.content}`)
    .join('\n\n');
}

function buildToolPromptTemplate(toolId, toolDef = {}) {
  const explicitTemplate = typeof toolDef?.promptTemplate === 'string'
    ? toolDef.promptTemplate.trim()
    : '';

  if (explicitTemplate) {
    return explicitTemplate;
  }

  const messageTemplate = buildPromptTemplateFromMessages(toolDef?.config?.messages || []);
  if (messageTemplate) {
    return messageTemplate;
  }

  return `请基于最近的 AI 回复为工具“${toolDef?.name || toolId}”生成结构化输出。`;
}

export function createDefaultToolDefinition(input = {}) {
  const now = new Date().toISOString();
  const config = input?.config || {};

  return {
    ...DEFAULT_TOOL_STRUCTURE,
    ...input,
    id: input?.id || DEFAULT_TOOL_STRUCTURE.id,
    icon: input?.icon || DEFAULT_TOOL_STRUCTURE.icon,
    order: Number.isFinite(input?.order) ? input.order : DEFAULT_TOOL_STRUCTURE.order,
    promptTemplate: typeof input?.promptTemplate === 'string'
      ? input.promptTemplate
      : DEFAULT_TOOL_STRUCTURE.promptTemplate,
    extractTags: normalizeStringArray(input?.extractTags),
    config: {
      execution: {
        ...DEFAULT_TOOL_STRUCTURE.config.execution,
        ...(config.execution || {}),
        timeout: normalizePositiveInteger(config?.execution?.timeout, DEFAULT_TOOL_STRUCTURE.config.execution.timeout),
        retries: Math.max(0, parseInt(config?.execution?.retries, 10) || DEFAULT_TOOL_STRUCTURE.config.execution.retries)
      },
      api: {
        ...DEFAULT_TOOL_STRUCTURE.config.api,
        ...(config.api || {})
      },
      messages: Array.isArray(config?.messages) ? config.messages : [],
      context: {
        ...DEFAULT_TOOL_STRUCTURE.config.context,
        ...(config.context || {}),
        depth: normalizePositiveInteger(config?.context?.depth, DEFAULT_TOOL_STRUCTURE.config.context.depth),
        includeTags: normalizeStringArray(config?.context?.includeTags),
        excludeTags: normalizeStringArray(config?.context?.excludeTags)
      },
      automation: normalizeAutomationConfig(config?.automation),
      worldbooks: normalizeWorldbookConfig(config?.worldbooks)
    },
    enabled: input?.enabled !== false,
    metadata: {
      ...DEFAULT_TOOL_STRUCTURE.metadata,
      ...(input?.metadata || {}),
      createdAt: input?.metadata?.createdAt || now,
      updatedAt: input?.metadata?.updatedAt || now
    }
  };
}

export function normalizeToolDefinitionToRuntimeConfig(toolId, toolDef = {}, options = {}) {
  const normalizedDefinition = createDefaultToolDefinition({
    ...toolDef,
    id: toolId || toolDef?.id || ''
  });

  const extractionSelectors = normalizeStringArray(
    normalizedDefinition?.extractTags?.length
      ? normalizedDefinition.extractTags
      : normalizedDefinition?.config?.context?.includeTags
  );

  const apiPreset = String(
    toolDef?.output?.apiPreset
    || normalizedDefinition?.config?.api?.preset
    || ''
  ).trim();

  const promptTemplate = buildToolPromptTemplate(toolId, normalizedDefinition);
  const outputMode = typeof toolDef?.output?.mode === 'string' && toolDef.output.mode.trim()
    ? toolDef.output.mode.trim()
    : (options.defaultOutputMode || 'follow_ai');

  return {
    id: normalizedDefinition.id || toolId,
    name: normalizedDefinition.name || toolId,
    icon: normalizedDefinition.icon || 'fa-screwdriver-wrench',
    description: normalizedDefinition.description || '',
    enabled: normalizedDefinition.enabled !== false,
    order: Number.isFinite(normalizedDefinition.order) ? normalizedDefinition.order : 100,
    bypass: {
      enabled: normalizedDefinition?.config?.api?.useBypass === true && !!normalizedDefinition?.config?.api?.bypassPreset,
      presetId: normalizedDefinition?.config?.api?.bypassPreset || ''
    },
    output: {
      mode: outputMode,
      apiPreset,
      overwrite: true,
      enabled: true
    },
    automation: normalizeAutomationConfig(normalizedDefinition?.config?.automation),
    worldbooks: normalizeWorldbookConfig(normalizedDefinition?.config?.worldbooks),
    extraction: {
      enabled: true,
      maxMessages: normalizePositiveInteger(normalizedDefinition?.config?.context?.depth, 5),
      selectors: extractionSelectors
    },
    promptTemplate,
    runtime: {
      lastRunAt: 0,
      lastStatus: 'idle',
      lastError: '',
      lastDurationMs: 0,
      successCount: 0,
      errorCount: 0
    },
    apiPreset,
    extractTags: extractionSelectors,
    isCustom: true,
    category: normalizedDefinition.category || 'utility',
    metadata: {
      ...(normalizedDefinition.metadata || {})
    }
  };
}

export function getAllTools() {
  const saved = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS);
  const sanitizedSavedTools = sanitizeStoredToolDefinitions(saved);

  if (saved && JSON.stringify(saved) !== JSON.stringify(sanitizedSavedTools)) {
    toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, sanitizedSavedTools);
  }

  return {
    ...DEFAULT_TOOL_PRESETS,
    ...sanitizedSavedTools
  };
}

export function getTool(toolId) {
  const tools = getAllTools();
  return tools[toolId] || null;
}

export function saveTool(toolId, toolDef) {
  if (!toolId || !toolDef) {
    return false;
  }

  const customTools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  const isNewTool = !customTools[toolId] && !DEFAULT_TOOL_PRESETS[toolId];

  const validatedTool = createDefaultToolDefinition({
    ...(customTools[toolId] || {}),
    ...toolDef,
    id: toolId,
    metadata: {
      ...(customTools[toolId]?.metadata || {}),
      ...(toolDef.metadata || {}),
      createdAt: customTools[toolId]?.metadata?.createdAt || toolDef?.metadata?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  });

  customTools[toolId] = validatedTool;
  toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, customTools);

  eventBus.emit(isNewTool ? EVENTS.TOOL_REGISTERED : EVENTS.TOOL_UPDATED, {
    toolId,
    tool: validatedTool
  });

  return true;
}

export function deleteTool(toolId) {
  const customTools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};

  if (!customTools[toolId] && !DEFAULT_TOOL_PRESETS[toolId]) {
    return false;
  }

  if (DEFAULT_TOOL_PRESETS[toolId]) {
    return false;
  }

  delete customTools[toolId];
  toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, customTools);

  eventBus.emit(EVENTS.TOOL_UNREGISTERED, { toolId });
  return true;
}

export function getToolPresets() {
  return toolStorage.get(TOOL_STORAGE_KEYS.PRESETS) || {};
}

export function saveToolPreset(presetName, presetData) {
  if (!presetName || !presetData) return false;

  const presets = getToolPresets();
  const isNew = !presets[presetName];

  presets[presetName] = {
    ...presetData,
    name: presetName,
    updatedAt: new Date().toISOString()
  };

  toolStorage.set(TOOL_STORAGE_KEYS.PRESETS, presets);
  eventBus.emit(isNew ? EVENTS.PRESET_CREATED : EVENTS.PRESET_UPDATED, {
    type: 'tool',
    presetName,
    preset: presets[presetName]
  });

  return true;
}

export function deleteToolPreset(presetName) {
  const presets = getToolPresets();
  if (!presets[presetName]) return false;

  delete presets[presetName];
  toolStorage.set(TOOL_STORAGE_KEYS.PRESETS, presets);
  eventBus.emit(EVENTS.PRESET_DELETED, { type: 'tool', presetName });
  return true;
}

export function getCurrentToolPreset() {
  return toolStorage.get(TOOL_STORAGE_KEYS.CURRENT_PRESET) || '';
}

export function setCurrentToolPreset(presetName) {
  toolStorage.set(TOOL_STORAGE_KEYS.CURRENT_PRESET, presetName || '');
  eventBus.emit(EVENTS.PRESET_ACTIVATED, { type: 'tool', presetName });
  return true;
}

export function setToolEnabled(toolId, enabled) {
  const tool = getTool(toolId);
  if (!tool) return false;

  const customTools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  customTools[toolId] = createDefaultToolDefinition({
    ...tool,
    id: toolId,
    enabled,
    metadata: {
      ...(tool?.metadata || {}),
      createdAt: tool?.metadata?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  });

  toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, customTools);
  eventBus.emit(enabled ? EVENTS.TOOL_ENABLED : EVENTS.TOOL_DISABLED, { toolId, enabled });
  return true;
}

export function exportTools() {
  const tools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  const presets = toolStorage.get(TOOL_STORAGE_KEYS.PRESETS) || {};

  return JSON.stringify({
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    tools,
    presets
  }, null, 2);
}

export function importTools(jsonString, overwrite = false) {
  try {
    const shouldOverwrite = typeof overwrite === 'object'
      ? !!overwrite?.overwrite
      : !!overwrite;

    const imported = JSON.parse(jsonString);
    if (!imported || typeof imported !== 'object') {
      return { success: false, toolsImported: 0, presetsImported: 0, message: '无效的JSON格式' };
    }

    const existingTools = shouldOverwrite ? {} : (toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {});
    const existingPresets = shouldOverwrite ? {} : (toolStorage.get(TOOL_STORAGE_KEYS.PRESETS) || {});

    let toolsImported = 0;
    let presetsImported = 0;

    if (imported.tools && typeof imported.tools === 'object') {
      for (const [toolId, toolDef] of Object.entries(imported.tools)) {
        if (!toolDef || typeof toolDef !== 'object') continue;
        existingTools[toolId] = createDefaultToolDefinition({
          ...toolDef,
          id: toolId
        });
        toolsImported += 1;
      }
      toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, existingTools);
    }

    if (imported.presets && typeof imported.presets === 'object') {
      for (const [presetName, presetData] of Object.entries(imported.presets)) {
        if (!presetData || typeof presetData !== 'object') continue;
        existingPresets[presetName] = {
          ...presetData,
          name: presetName,
          updatedAt: new Date().toISOString()
        };
        presetsImported += 1;
      }
      toolStorage.set(TOOL_STORAGE_KEYS.PRESETS, existingPresets);
    }

    return {
      success: true,
      toolsImported,
      presetsImported,
      message: `成功导入 ${toolsImported} 个工具和 ${presetsImported} 个预设`
    };
  } catch (error) {
    return {
      success: false,
      toolsImported: 0,
      presetsImported: 0,
      message: `导入失败: ${error.message}`
    };
  }
}

export function resetTools() {
  toolStorage.remove(TOOL_STORAGE_KEYS.TOOLS);
  toolStorage.remove(TOOL_STORAGE_KEYS.PRESETS);
  toolStorage.remove(TOOL_STORAGE_KEYS.CURRENT_PRESET);
}

export default {
  getAllTools,
  getTool,
  saveTool,
  deleteTool,
  setToolEnabled,
  exportTools,
  importTools,
  resetTools,
  getToolPresets,
  saveToolPreset,
  deleteToolPreset,
  getCurrentToolPreset,
  setCurrentToolPreset,
  createDefaultToolDefinition,
  normalizeToolDefinitionToRuntimeConfig
};
