/**
 * YouYou Toolkit - 工具注册表
 * @description 管理工具列表、工具配置和工具-预设绑定
 */

import { storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';

// ============================================================
// 工具配置存储键
// ============================================================

const TOOL_CONFIG_STORAGE_KEY = 'tool_configs';
const TOOL_API_PRESET_BINDING_KEY = 'tool_api_bindings';
const TOOL_WINDOW_STATE_KEY = 'tool_window_states';

// ============================================================
// 默认工具配置
// ============================================================

/**
 * 默认工具配置 - 包含提示词模板和执行配置
 */
const DEFAULT_TOOL_CONFIGS = {
  summaryTool: {
    id: 'summaryTool',
    name: '摘要工具',
    icon: 'fa-file-lines',
    description: '生成剧情摘要块',
    promptTemplate: `<boo_FM>
<pg>No.{{pg}}</pg>
<time>{{time}}</time>
<scene>{{scene}}</scene>

<plot>
{{plot}}
</plot>

<event>
MQ.{{mq}} | {{mqStatus}}
SQ.{{sq}} | {{sqStatus}}
本轮完成：{{completed}}
最新支线编号：SQ.{{latestSq}}
</event>

<defined>
{{defined}}
</defined>

<status>
{{status}}
</status>

<seeds>
{{seeds}}
</seeds>
</boo_FM>`,
    apiPreset: '',
    bypassPreset: '',
    outputMode: 'inline',
    extractTags: ['boo_FM'],
    triggerEvents: ['GENERATION_ENDED'],
    enabled: true,
    order: 3
  },
  
  statusBlock: {
    id: 'statusBlock',
    name: '主角状态栏',
    icon: 'fa-user-check',
    description: '生成主角状态代码块',
    promptTemplate: `<status_block>
<name>{{name}}</name>
<location>{{location}}</location>
<condition>{{condition}}</condition>
<equipment>{{equipment}}</equipment>
<skills>{{skills}}</skills>
</status_block>`,
    apiPreset: '',
    bypassPreset: '',
    outputMode: 'inline',
    extractTags: ['status_block'],
    triggerEvents: ['GENERATION_ENDED'],
    enabled: true,
    order: 4
  }
};

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
  bypassPanel: {
    id: 'bypassPanel',
    name: '破限词',
    icon: 'fa-shield-alt',
    hasSubTabs: false,
    description: '管理破限词预设',
    component: 'BypassPanel',
    order: 1
  },
  regexExtract: {
    id: 'regexExtract',
    name: '正则提取',
    icon: 'fa-filter',
    hasSubTabs: false,
    description: '从消息中提取特定内容',
    component: 'RegexExtractPanel',
    order: 2,
    defaultConfig: {
      trigger: { type: 'manual', events: [] },
      execution: { timeout: 30000, retries: 1 },
      api: { preset: '' },
      extractRules: [],
      excludeRules: []
    }
  },
  summaryTool: {
    id: 'summaryTool',
    name: '摘要工具',
    icon: 'fa-file-lines',
    hasSubTabs: false,
    description: '生成剧情摘要块',
    component: 'SummaryToolPanel',
    order: 3
  },
  statusBlock: {
    id: 'statusBlock',
    name: '主角状态栏',
    icon: 'fa-user-check',
    hasSubTabs: false,
    description: '生成主角状态代码块',
    component: 'StatusBlockPanel',
    order: 4
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
// 工具完整配置管理
// ============================================================

/**
 * 获取工具完整配置（合并默认配置和用户配置）
 * @param {string} toolId - 工具ID
 * @returns {object|null} 完整配置
 */
export function getToolFullConfig(toolId) {
  const defaultConfig = DEFAULT_TOOL_CONFIGS[toolId];
  if (!defaultConfig) {
    // 如果没有默认配置，返回基本注册信息
    const basicConfig = getToolConfig(toolId);
    return basicConfig;
  }
  
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  const userConfig = userConfigs[toolId] || {};
  
  return {
    ...defaultConfig,
    ...userConfig,
    id: toolId  // ID不可覆盖
  };
}

/**
 * 保存工具配置
 * @param {string} toolId - 工具ID
 * @param {object} config - 配置对象
 * @returns {boolean} 是否成功
 */
export function saveToolConfig(toolId, config) {
  if (!toolId || !DEFAULT_TOOL_CONFIGS[toolId]) {
    console.warn('[ToolRegistry] 工具不存在:', toolId);
    return false;
  }
  
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  
  // 只保存用户可修改的字段
  const saveableFields = [
    'promptTemplate', 'apiPreset', 'bypassPreset', 
    'outputMode', 'extractTags', 'enabled', 'triggerEvents'
  ];
  
  userConfigs[toolId] = {};
  saveableFields.forEach(field => {
    if (config[field] !== undefined) {
      userConfigs[toolId][field] = config[field];
    }
  });
  
  storage.set(TOOL_CONFIG_STORAGE_KEY, userConfigs);
  eventBus.emit(EVENTS.TOOL_UPDATED, { toolId, config: userConfigs[toolId] });
  
  console.log(`[ToolRegistry] 工具配置已保存: ${toolId}`);
  return true;
}

/**
 * 重置工具配置到默认
 * @param {string} toolId - 工具ID
 * @returns {boolean} 是否成功
 */
export function resetToolConfig(toolId) {
  if (!toolId || !DEFAULT_TOOL_CONFIGS[toolId]) {
    console.warn('[ToolRegistry] 工具不存在:', toolId);
    return false;
  }
  
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  delete userConfigs[toolId];
  storage.set(TOOL_CONFIG_STORAGE_KEY, userConfigs);
  
  eventBus.emit(EVENTS.TOOL_UPDATED, { toolId, config: null });
  console.log(`[ToolRegistry] 工具配置已重置: ${toolId}`);
  return true;
}

/**
 * 获取所有默认工具配置
 * @returns {object} 默认配置对象
 */
export function getAllDefaultToolConfigs() {
  return { ...DEFAULT_TOOL_CONFIGS };
}

/**
 * 获取所有工具的完整配置
 * @returns {Array} 配置数组
 */
export function getAllToolFullConfigs() {
  return Object.keys(DEFAULT_TOOL_CONFIGS).map(toolId => getToolFullConfig(toolId));
}

/**
 * 获取启用的工具列表（带有完整配置）
 * @returns {Array} 启用的工具配置数组
 */
export function getEnabledTools() {
  return getAllToolFullConfigs().filter(config => config && config.enabled);
}

// ============================================================
// 工具窗口状态管理
// ============================================================

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
  getToolWindowState,
  // 新增配置管理函数
  getToolFullConfig,
  saveToolConfig,
  resetToolConfig,
  getAllDefaultToolConfigs,
  getAllToolFullConfigs,
  getEnabledTools
};
