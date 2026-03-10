/**
 * YouYou Toolkit - 工具注册表
 * @description 管理工具列表、工具配置和工具-预设绑定
 */

import { storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';

// ============================================================
// 工具注册表常量
// ============================================================

/**
 * 工具注册表
 * 定义所有可用工具的基本信息
 */
export const TOOL_REGISTRY = {
  apiPresets: {
    id: 'apiPresets',
    name: 'API预设',
    icon: 'fa-database',
    hasSubTabs: false,
    description: '管理API配置和预设',
    component: 'ApiPresetPanel',
    order: 0
  },
  plotAdvance: {
    id: 'plotAdvance',
    name: '剧情推进',
    icon: 'fa-forward',
    hasSubTabs: true,
    subTabs: [
      { id: 'config', name: '配置', icon: 'fa-cog' },
      { id: 'prompts', name: '提示词', icon: 'fa-file-alt' },
      { id: 'presets', name: '预设', icon: 'fa-bookmark' }
    ],
    description: '自动分析剧情并生成建议',
    component: 'PlotAdvanceWindow',
    order: 1,
    defaultConfig: {
      trigger: { type: 'manual', events: [] },
      execution: { timeout: 120000, retries: 3 },
      api: { preset: '', useBypass: true, bypassPreset: 'standard' },
      messages: [],
      context: { depth: 5, includeTags: [], excludeTags: [] }
    }
  },
  dbUpdate: {
    id: 'dbUpdate',
    name: '数据库',
    icon: 'fa-table',
    hasSubTabs: true,
    subTabs: [
      { id: 'config', name: '配置', icon: 'fa-cog' },
      { id: 'templates', name: '模板', icon: 'fa-file-code' },
      { id: 'rules', name: '规则', icon: 'fa-gavel' }
    ],
    description: '更新SillyTavern数据库条目',
    component: 'DbUpdateWindow',
    order: 2,
    defaultConfig: {
      trigger: { type: 'event', events: ['GENERATION_ENDED'] },
      execution: { timeout: 90000, retries: 3 },
      api: { preset: '', useBypass: true, bypassPreset: 'standard' },
      messages: [],
      context: { depth: 2, includeTags: [], excludeTags: [] }
    }
  },
  regexExtract: {
    id: 'regexExtract',
    name: '正则提取',
    icon: 'fa-filter',
    hasSubTabs: true,
    subTabs: [
      { id: 'rules', name: '规则', icon: 'fa-gavel' },
      { id: 'test', name: '测试', icon: 'fa-flask' },
      { id: 'presets', name: '预设', icon: 'fa-bookmark' }
    ],
    description: '从消息中提取特定内容',
    component: 'RegexExtractWindow',
    order: 3,
    defaultConfig: {
      trigger: { type: 'manual', events: [] },
      execution: { timeout: 30000, retries: 1 },
      api: { preset: '' },
      extractRules: [],
      excludeRules: []
    }
  }
};

/**
 * 工具分类
 */
export const TOOL_CATEGORIES = {
  api: {
    name: 'API工具',
    icon: 'fa-plug',
    order: 0
  },
  prompt: {
    name: '提示词工具',
    icon: 'fa-file-alt',
    order: 1
  },
  utility: {
    name: '实用工具',
    icon: 'fa-wrench',
    order: 2
  }
};

// ============================================================
// 工具注册表管理
// ============================================================

/**
 * 已注册的工具列表（运行时可修改）
 */
let registeredTools = { ...TOOL_REGISTRY };

/**
 * 注册新工具
 * @param {string} id - 工具ID
 * @param {object} toolConfig - 工具配置
 * @returns {boolean} 是否成功
 */
export function registerTool(id, toolConfig) {
  if (!id || typeof id !== 'string') {
    console.error('[ToolRegistry] 工具ID无效');
    return false;
  }
  
  if (!toolConfig || typeof toolConfig !== 'object') {
    console.error('[ToolRegistry] 工具配置无效');
    return false;
  }
  
  // 验证必需字段
  const requiredFields = ['name', 'icon', 'component'];
  for (const field of requiredFields) {
    if (!toolConfig[field]) {
      console.error(`[ToolRegistry] 工具缺少必需字段: ${field}`);
      return false;
    }
  }
  
  registeredTools[id] = {
    id,
    ...toolConfig,
    order: toolConfig.order ?? Object.keys(registeredTools).length
  };
  
  console.log(`[ToolRegistry] 工具已注册: ${id}`);
  return true;
}

/**
 * 注销工具
 * @param {string} id - 工具ID
 * @returns {boolean} 是否成功
 */
export function unregisterTool(id) {
  if (!registeredTools[id]) {
    console.warn(`[ToolRegistry] 工具不存在: ${id}`);
    return false;
  }
  
  delete registeredTools[id];
  console.log(`[ToolRegistry] 工具已注销: ${id}`);
  return true;
}

/**
 * 获取工具列表
 * @param {boolean} sorted - 是否按order排序
 * @returns {Array} 工具列表
 */
export function getToolList(sorted = true) {
  const tools = Object.values(registeredTools);
  
  if (sorted) {
    return tools.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  
  return tools;
}

/**
 * 获取单个工具配置
 * @param {string} id - 工具ID
 * @returns {object|null} 工具配置
 */
export function getToolConfig(id) {
  return registeredTools[id] || null;
}

/**
 * 检查工具是否存在
 * @param {string} id - 工具ID
 * @returns {boolean}
 */
export function hasTool(id) {
  return !!registeredTools[id];
}

/**
 * 获取工具的次级标签页
 * @param {string} toolId - 工具ID
 * @returns {Array} 次级标签页列表
 */
export function getToolSubTabs(toolId) {
  const tool = registeredTools[toolId];
  if (!tool || !tool.hasSubTabs) {
    return [];
  }
  return tool.subTabs || [];
}

/**
 * 重置工具注册表到默认状态
 */
export function resetToolRegistry() {
  registeredTools = { ...TOOL_REGISTRY };
  console.log('[ToolRegistry] 工具注册表已重置');
}

// ============================================================
// 工具-API预设绑定管理
// ============================================================

const TOOL_API_PRESET_BINDING_KEY = 'tool_api_bindings';

/**
 * 设置工具的API预设绑定
 * @param {string} toolId - 工具ID
 * @param {string} presetName - API预设名称（空字符串表示使用当前配置）
 */
export function setToolApiPreset(toolId, presetName) {
  if (!hasTool(toolId)) {
    console.warn(`[ToolRegistry] 工具不存在: ${toolId}`);
    return false;
  }
  
  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  bindings[toolId] = presetName || '';
  storage.set(TOOL_API_PRESET_BINDING_KEY, bindings);
  
  console.log(`[ToolRegistry] 工具 "${toolId}" 绑定到预设 "${presetName || '当前配置'}"`);
  return true;
}

/**
 * 获取工具的API预设绑定
 * @param {string} toolId - 工具ID
 * @returns {string} API预设名称（空字符串表示使用当前配置）
 */
export function getToolApiPreset(toolId) {
  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  return bindings[toolId] || '';
}

/**
 * 清除工具的API预设绑定
 * @param {string} toolId - 工具ID
 */
export function clearToolApiPreset(toolId) {
  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  delete bindings[toolId];
  storage.set(TOOL_API_PRESET_BINDING_KEY, bindings);
  console.log(`[ToolRegistry] 工具 "${toolId}" 的API预设绑定已清除`);
}

/**
 * 获取所有工具-API预设绑定
 * @returns {object} 绑定数据
 */
export function getAllToolApiBindings() {
  return storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
}

/**
 * 当API预设被删除时，清理相关工具绑定
 * @param {string} presetName - 被删除的预设名称
 */
export function onPresetDeleted(presetName) {
  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  let changed = false;
  
  for (const toolId in bindings) {
    if (bindings[toolId] === presetName) {
      bindings[toolId] = '';
      changed = true;
      console.log(`[ToolRegistry] 工具 "${toolId}" 的API预设绑定已清除（预设被删除）`);
    }
  }
  
  if (changed) {
    storage.set(TOOL_API_PRESET_BINDING_KEY, bindings);
  }
}

// ============================================================
// 工具窗口状态管理
// ============================================================

const TOOL_WINDOW_STATE_KEY = 'tool_window_states';

/**
 * 保存工具窗口状态
 * @param {string} toolId - 工具ID
 * @param {object} state - 窗口状态（如当前标签页等）
 */
export function saveToolWindowState(toolId, state) {
  const states = storage.get(TOOL_WINDOW_STATE_KEY) || {};
  states[toolId] = {
    ...state,
    updatedAt: Date.now()
  };
  storage.set(TOOL_WINDOW_STATE_KEY, states);
}

/**
 * 获取工具窗口状态
 * @param {string} toolId - 工具ID
 * @returns {object|null} 窗口状态
 */
export function getToolWindowState(toolId) {
  const states = storage.get(TOOL_WINDOW_STATE_KEY) || {};
  return states[toolId] || null;
}

// ============================================================
// 导出
// ============================================================

export default {
  TOOL_REGISTRY,
  TOOL_CATEGORIES,
  registerTool,
  unregisterTool,
  getToolList,
  getToolConfig,
  hasTool,
  getToolSubTabs,
  resetToolRegistry,
  setToolApiPreset,
  getToolApiPreset,
  clearToolApiPreset,
  getAllToolApiBindings,
  onPresetDeleted,
  saveToolWindowState,
  getToolWindowState
};