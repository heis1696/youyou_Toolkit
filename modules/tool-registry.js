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
 * 默认工具配置 - v0.6 简化结构
 * 单提示词模板、两种输出模式、破限词绑定
 */
const DEFAULT_TOOL_CONFIGS = {
  summaryTool: {
    id: 'summaryTool',
    name: '摘要工具',
    icon: 'fa-file-lines',
    description: '生成剧情摘要块',
    enabled: true,
    order: 3,
    
    // 触发配置
    trigger: {
      event: 'GENERATION_ENDED',
      enabled: true
    },
    
    // 破限词绑定
    bypass: {
      enabled: false,
      presetId: ''
    },
    
    // 输出模式配置
    output: {
      mode: 'follow_ai', // follow_ai | post_response_api
      apiPreset: '',
      overwrite: true,
      enabled: true
    },
    
    // 提示词模板（单文本）
    promptTemplate: `请根据以下AI回复生成摘要块：

输出格式：
<boo_FM>
<pg>页码</pg>
<time>时间</time>
<scene>场景</scene>
<plot>剧情概要</plot>
<event>事件描述</event>
<defined>已定义元素</defined>
<status>状态</status>
<seeds>伏笔</seeds>
</boo_FM>`,
    
    // 运行时状态
    runtime: {
      lastRunAt: 0,
      lastStatus: 'idle',
      lastError: '',
      lastDurationMs: 0,
      successCount: 0,
      errorCount: 0
    },
    
    // 兼容字段
    apiPreset: '',
    extractTags: ['boo_FM']
  },
  
  statusBlock: {
    id: 'statusBlock',
    name: '主角状态栏',
    icon: 'fa-user-check',
    description: '生成主角状态代码块',
    enabled: true,
    order: 4,
    
    // 触发配置
    trigger: {
      event: 'GENERATION_ENDED',
      enabled: true
    },
    
    // 破限词绑定
    bypass: {
      enabled: false,
      presetId: ''
    },
    
    // 输出模式配置
    output: {
      mode: 'follow_ai',
      apiPreset: '',
      overwrite: true,
      enabled: true
    },
    
    // 提示词模板（单文本）
    promptTemplate: `请根据以下对话内容生成角色状态块：

输出格式：
<status_block>
<name>角色名</name>
<location>位置</location>
<condition>状态</condition>
<equipment>装备</equipment>
<skills>技能</skills>
</status_block>`,
    
    // 运行时状态
    runtime: {
      lastRunAt: 0,
      lastStatus: 'idle',
      lastError: '',
      lastDurationMs: 0,
      successCount: 0,
      errorCount: 0
    },
    
    // 兼容字段
    apiPreset: '',
    extractTags: ['status_block']
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
  tools: {
    id: 'tools',
    name: '工具',
    icon: 'fa-tools',
    hasSubTabs: true,
    description: '工具集合',
    order: 3,
    subTabs: [
      { id: 'summaryTool', name: '摘要工具', icon: 'fa-file-lines', component: 'SummaryToolPanel' },
      { id: 'statusBlock', name: '主角状态栏', icon: 'fa-user-check', component: 'StatusBlockPanel' }
    ]
  },
  // v0.5 新增页面
  bypass: {
    id: 'bypass',
    name: '破限词',
    icon: 'fa-shield-halved',
    hasSubTabs: false,
    description: '管理破限词预设',
    component: 'BypassPanel',
    order: 4
  },
  settings: {
    id: 'settings',
    name: '设置',
    icon: 'fa-cog',
    hasSubTabs: false,
    description: '全局设置',
    component: 'SettingsPanel',
    order: 5
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
  
  // v0.6 简化后的可保存字段
  const saveableFields = [
    'promptTemplate',      // 单提示词模板
    'enabled',             // 启用状态
    'extractTags',         // 提取标签（兼容）
    // 新结构
    'trigger',             // 触发配置
    'output',              // 输出配置（包含 mode, apiPreset, overwrite）
    'bypass',              // 破限词配置
    'runtime'              // 运行时状态
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
 * 设置工具的输出模式
 * @param {string} toolId - 工具ID
 * @param {string} mode - 输出模式 (follow_ai | post_response_api)
 * @returns {boolean} 是否成功
 */
export function setToolOutputMode(toolId, mode) {
  const config = getToolFullConfig(toolId);
  if (!config) return false;
  
  return saveToolConfig(toolId, {
    ...config,
    output: {
      ...config.output,
      mode
    }
  });
}

/**
 * 设置工具的API预设
 * @param {string} toolId - 工具ID
 * @param {string} presetName - API预设名称
 * @returns {boolean} 是否成功
 */
export function setToolApiPresetConfig(toolId, presetName) {
  const config = getToolFullConfig(toolId);
  if (!config) return false;
  
  return saveToolConfig(toolId, {
    ...config,
    output: {
      ...config.output,
      apiPreset: presetName
    }
  });
}

/**
 * 设置工具的破限词配置
 * @param {string} toolId - 工具ID
 * @param {Object} bypassConfig - 破限词配置 { enabled: boolean, presetId: string }
 * @returns {boolean} 是否成功
 */
export function setToolBypassConfig(toolId, bypassConfig) {
  const config = getToolFullConfig(toolId);
  if (!config) return false;
  
  return saveToolConfig(toolId, {
    ...config,
    bypass: {
      ...config.bypass,
      ...bypassConfig
    }
  });
}

/**
 * 设置工具的提示词模板
 * @param {string} toolId - 工具ID
 * @param {string} template - 提示词模板文本
 * @returns {boolean} 是否成功
 */
export function setToolPromptTemplate(toolId, template) {
  const config = getToolFullConfig(toolId);
  if (!config) return false;
  
  return saveToolConfig(toolId, {
    ...config,
    promptTemplate: template
  });
}

/**
 * 更新工具运行时状态
 * @param {string} toolId - 工具ID
 * @param {Object} runtimePartial - 部分运行时状态
 * @returns {boolean} 是否成功
 */
export function updateToolRuntime(toolId, runtimePartial) {
  const config = getToolFullConfig(toolId);
  if (!config) return false;
  
  return saveToolConfig(toolId, {
    ...config,
    runtime: {
      ...config.runtime,
      ...runtimePartial,
      lastRunAt: Date.now()
    }
  });
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
