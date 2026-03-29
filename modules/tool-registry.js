/**
 * YouYou Toolkit - 工具注册表
 * @description 管理工具列表、工具配置和工具-预设绑定
 */

import { storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';
import {
  getAllTools as getManagedTools,
  normalizeToolDefinitionToRuntimeConfig
} from './tool-manager.js';

// ============================================================
// 工具配置存储键
// ============================================================

const TOOL_CONFIG_STORAGE_KEY = 'tool_configs';
const TOOL_API_PRESET_BINDING_KEY = 'tool_api_bindings';
const TOOL_WINDOW_STATE_KEY = 'tool_window_states';

function createToolRuntimeState(runtime = {}) {
  const recentWritebackHistory = Array.isArray(runtime?.recentWritebackHistory)
    ? runtime.recentWritebackHistory.filter(Boolean)
    : [];

  return {
    lastRunAt: Number.isFinite(runtime?.lastRunAt) ? runtime.lastRunAt : 0,
    lastStatus: typeof runtime?.lastStatus === 'string' ? runtime.lastStatus : 'idle',
    lastError: typeof runtime?.lastError === 'string' ? runtime.lastError : '',
    lastDurationMs: Number.isFinite(runtime?.lastDurationMs) ? runtime.lastDurationMs : 0,
    successCount: Number.isFinite(runtime?.successCount) ? runtime.successCount : 0,
    errorCount: Number.isFinite(runtime?.errorCount) ? runtime.errorCount : 0,
    lastMessageKey: typeof runtime?.lastMessageKey === 'string' ? runtime.lastMessageKey : '',
    lastExecutionKey: typeof runtime?.lastExecutionKey === 'string' ? runtime.lastExecutionKey : '',
    lastExecutionPath: typeof runtime?.lastExecutionPath === 'string' ? runtime.lastExecutionPath : '',
    lastWritebackStatus: typeof runtime?.lastWritebackStatus === 'string' ? runtime.lastWritebackStatus : '',
    lastFailureStage: typeof runtime?.lastFailureStage === 'string' ? runtime.lastFailureStage : '',
    lastSlotBindingKey: typeof runtime?.lastSlotBindingKey === 'string' ? runtime.lastSlotBindingKey : '',
    lastSlotRevisionKey: typeof runtime?.lastSlotRevisionKey === 'string' ? runtime.lastSlotRevisionKey : '',
    lastSlotTransactionId: typeof runtime?.lastSlotTransactionId === 'string' ? runtime.lastSlotTransactionId : '',
    lastSourceMessageId: typeof runtime?.lastSourceMessageId === 'string' ? runtime.lastSourceMessageId : '',
    lastSourceSwipeId: typeof runtime?.lastSourceSwipeId === 'string' ? runtime.lastSourceSwipeId : '',
    lastContentCommitted: runtime?.lastContentCommitted === true,
    lastHostCommitApplied: runtime?.lastHostCommitApplied === true,
    lastRefreshRequested: runtime?.lastRefreshRequested === true,
    lastRefreshConfirmed: runtime?.lastRefreshConfirmed === true,
    lastPreferredCommitMethod: typeof runtime?.lastPreferredCommitMethod === 'string' ? runtime.lastPreferredCommitMethod : '',
    lastAppliedCommitMethod: typeof runtime?.lastAppliedCommitMethod === 'string' ? runtime.lastAppliedCommitMethod : '',
    lastRefreshMethodCount: Number.isFinite(runtime?.lastRefreshMethodCount) ? runtime.lastRefreshMethodCount : 0,
    lastRefreshMethods: Array.isArray(runtime?.lastRefreshMethods) ? runtime.lastRefreshMethods.filter(Boolean) : [],
    lastRefreshConfirmChecks: Number.isFinite(runtime?.lastRefreshConfirmChecks) ? runtime.lastRefreshConfirmChecks : 0,
    lastRefreshConfirmedBy: typeof runtime?.lastRefreshConfirmedBy === 'string' ? runtime.lastRefreshConfirmedBy : '',
    lastTraceId: typeof runtime?.lastTraceId === 'string' ? runtime.lastTraceId : '',
    lastAutoRunAt: Number.isFinite(runtime?.lastAutoRunAt) ? runtime.lastAutoRunAt : 0,
    lastAutoStatus: typeof runtime?.lastAutoStatus === 'string' ? runtime.lastAutoStatus : 'idle',
    lastAutoMessageId: typeof runtime?.lastAutoMessageId === 'string' ? runtime.lastAutoMessageId : '',
    lastAutoSwipeId: typeof runtime?.lastAutoSwipeId === 'string' ? runtime.lastAutoSwipeId : '',
    lastAutoRevisionKey: typeof runtime?.lastAutoRevisionKey === 'string' ? runtime.lastAutoRevisionKey : '',
    lastAutoWritebackStatus: typeof runtime?.lastAutoWritebackStatus === 'string' ? runtime.lastAutoWritebackStatus : '',
    lastAutoRefreshConfirmed: runtime?.lastAutoRefreshConfirmed === true,
    lastAutoSkipReason: typeof runtime?.lastAutoSkipReason === 'string' ? runtime.lastAutoSkipReason : '',
    recentWritebackHistory
  };
}

function trimRuntimeHistoryEntries(entries, limit = 10) {
  const normalizedLimit = Number.isFinite(limit)
    ? Math.max(1, Math.min(50, Math.floor(limit)))
    : 10;

  if (!Array.isArray(entries)) {
    return [];
  }

  if (entries.length <= normalizedLimit) {
    return entries;
  }

  return entries.slice(entries.length - normalizedLimit);
}

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

    automation: {
      enabled: false,
      settleMs: 1200,
      cooldownMs: 5000
    },

    // 提取配置
    extraction: {
      enabled: true,
      maxMessages: 5,
      selectors: ['boo_FM']
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

    automation: {
      enabled: false,
      settleMs: 1200,
      cooldownMs: 5000
    },

    // 提取配置
    extraction: {
      enabled: true,
      maxMessages: 5,
      selectors: ['status_block']
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
  },

  youyouReview: {
    id: 'youyouReview',
    name: '小幽点评',
    icon: 'fa-comment-dots',
    description: '在回复末尾生成小幽点评与剧情钩子',
    enabled: true,
    order: 5,

    bypass: {
      enabled: false,
      presetId: ''
    },

    output: {
      mode: 'follow_ai',
      apiPreset: '',
      overwrite: true,
      enabled: true
    },

    automation: {
      enabled: false,
      settleMs: 1200,
      cooldownMs: 5000
    },

    extraction: {
      enabled: true,
      maxMessages: 5,
      selectors: ['youyou']
    },

    promptTemplate: `请基于以下最新剧情回复，生成“小幽点评”。

硬性要求：
1. 只输出一个 <youyou>...</youyou> 块，不要输出其它说明。
2. <youyou> 内先写一整段“小幽点评”正文，正文不换行，必须使用小幽第一人称口吻，带一点自夸、吐槽、犀利点评的个性。
3. 点评内容必须覆盖：本次创作亮点与绝妙之处、剧情推进情况、伏笔埋设、后续注意事项。
4. 结尾单独追加一个 <gouzi>...</gouzi>，用于留下剧情钩子。
5. <gouzi> 必须放在 <youyou> 内部，并且单独成段，但整体仍只返回一个 <youyou> 块。

输出模板：
<youyou>
这里是一整段不换行点评正文
<gouzi>这里写剧情钩子</gouzi>
</youyou>`,

    runtime: {
      lastRunAt: 0,
      lastStatus: 'idle',
      lastError: '',
      lastDurationMs: 0,
      successCount: 0,
      errorCount: 0
    },

    apiPreset: '',
    extractTags: ['youyou']
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
      execution: { timeout: 30000, retries: 1 },
      api: { preset: '' },
      extractRules: [],
      excludeRules: []
    }
  },
  toolManage: {
    id: 'toolManage',
    name: '工具列表',
    icon: 'fa-screwdriver-wrench',
    hasSubTabs: false,
    description: '创建、编辑和管理自定义工具',
    component: 'ToolManagePanel',
    order: 3
  },
  tools: {
    id: 'tools',
    name: '工具',
    icon: 'fa-tools',
    hasSubTabs: true,
    description: '工具集合',
    order: 4,
    subTabs: [
      { id: 'summaryTool', name: '摘要工具', icon: 'fa-file-lines', component: 'SummaryToolPanel' },
      { id: 'statusBlock', name: '主角状态栏', icon: 'fa-user-check', component: 'StatusBlockPanel' },
      { id: 'youyouReview', name: '小幽点评', icon: 'fa-comment-dots', component: 'YouyouReviewPanel' }
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
    order: 5
  },
  settings: {
    id: 'settings',
    name: '设置',
    icon: 'fa-cog',
    hasSubTabs: false,
    description: '全局设置',
    component: 'SettingsPanel',
    order: 6
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

function getCustomManagedToolEntries() {
  const managedTools = getManagedTools() || {};
  return Object.entries(managedTools)
    .filter(([toolId]) => !DEFAULT_TOOL_CONFIGS[toolId])
    .map(([toolId, tool]) => [toolId, tool || {}]);
}

function buildToolsSubTabs() {
  const baseSubTabs = Array.isArray(TOOL_REGISTRY.tools?.subTabs)
    ? [...TOOL_REGISTRY.tools.subTabs]
    : [];

  const customSubTabs = getCustomManagedToolEntries().map(([toolId, tool], index) => {
    const runtimeConfig = normalizeToolDefinitionToRuntimeConfig(toolId, tool);

    return {
      id: toolId,
      name: runtimeConfig.name || toolId,
      icon: runtimeConfig.icon || 'fa-screwdriver-wrench',
      component: 'GenericToolConfigPanel',
      order: Number.isFinite(runtimeConfig.order) ? runtimeConfig.order : (100 + index),
      isCustom: true,
      description: runtimeConfig.description || ''
    };
  });

  return [...baseSubTabs, ...customSubTabs]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function createCustomToolDefaultConfig(toolId, toolDef = {}) {
  const normalizedConfig = normalizeToolDefinitionToRuntimeConfig(toolId, toolDef, {
    defaultOutputMode: 'follow_ai'
  });

  return {
    ...normalizedConfig,
    runtime: createToolRuntimeState(normalizedConfig.runtime)
  };
}

function getBaseToolRuntimeConfig(toolId) {
  const defaultConfig = DEFAULT_TOOL_CONFIGS[toolId];
  if (defaultConfig) {
    return {
      ...defaultConfig,
      output: { ...(defaultConfig.output || {}) },
      bypass: { ...(defaultConfig.bypass || {}) },
      extraction: { ...(defaultConfig.extraction || {}) },
      runtime: createToolRuntimeState(defaultConfig.runtime),
      extractTags: Array.isArray(defaultConfig.extractTags) ? [...defaultConfig.extractTags] : []
    };
  }

  const managedTools = getManagedTools() || {};
  const customToolDef = managedTools[toolId] || null;
  if (customToolDef) {
    return createCustomToolDefaultConfig(toolId, customToolDef);
  }

  return getToolConfig(toolId);
}

export function getToolBaseConfig(toolId) {
  const baseConfig = getBaseToolRuntimeConfig(toolId);
  if (!baseConfig) return null;

  return {
    ...baseConfig,
    output: { ...(baseConfig.output || {}) },
    automation: { ...(baseConfig.automation || {}) },
    bypass: { ...(baseConfig.bypass || {}) },
    extraction: {
      ...(baseConfig.extraction || {}),
      selectors: Array.isArray(baseConfig?.extraction?.selectors)
        ? [...baseConfig.extraction.selectors]
        : []
    },
    runtime: { ...(baseConfig.runtime || {}) },
    extractTags: Array.isArray(baseConfig.extractTags) ? [...baseConfig.extractTags] : []
  };
}

function mergeToolRuntimeConfig(baseConfig, userConfig = {}, legacyApiPresetBinding = '') {
  if (!baseConfig) return null;

  const mergedConfig = {
    ...baseConfig,
    ...userConfig,
    id: baseConfig.id || userConfig.id
  };

  mergedConfig.output = {
    ...(baseConfig.output || {}),
    ...(userConfig.output || {})
  };

  mergedConfig.automation = {
    enabled: baseConfig?.automation?.enabled === true || userConfig?.automation?.enabled === true,
    settleMs: Number.isFinite(userConfig?.automation?.settleMs)
      ? userConfig.automation.settleMs
      : (Number.isFinite(baseConfig?.automation?.settleMs) ? baseConfig.automation.settleMs : 1200),
    cooldownMs: Number.isFinite(userConfig?.automation?.cooldownMs)
      ? userConfig.automation.cooldownMs
      : (Number.isFinite(baseConfig?.automation?.cooldownMs) ? baseConfig.automation.cooldownMs : 5000)
  };

  mergedConfig.bypass = {
    ...(baseConfig.bypass || {}),
    ...(userConfig.bypass || {})
  };

  mergedConfig.runtime = createToolRuntimeState({
    ...(baseConfig.runtime || {}),
    ...(userConfig.runtime || {})
  });

  mergedConfig.extraction = {
    ...(baseConfig.extraction || {}),
    ...(userConfig.extraction || {})
  };

  const resolvedApiPreset = userConfig?.output?.apiPreset
    || userConfig?.apiPreset
    || mergedConfig.output?.apiPreset
    || mergedConfig.apiPreset
    || legacyApiPresetBinding
    || '';

  mergedConfig.output = {
    ...(mergedConfig.output || {}),
    apiPreset: resolvedApiPreset
  };

  mergedConfig.apiPreset = resolvedApiPreset;

  if ((!Array.isArray(mergedConfig.extraction.selectors) || mergedConfig.extraction.selectors.length === 0)
    && Array.isArray(mergedConfig.extractTags)
    && mergedConfig.extractTags.length > 0) {
    mergedConfig.extraction.selectors = [...mergedConfig.extractTags];
  }

  if (!Array.isArray(mergedConfig.extractTags) || mergedConfig.extractTags.length === 0) {
    mergedConfig.extractTags = Array.isArray(mergedConfig.extraction.selectors)
      ? [...mergedConfig.extraction.selectors]
      : [];
  }

  if (baseConfig.isCustom) {
    mergedConfig.enabled = baseConfig.enabled !== false;
  } else if (typeof userConfig.enabled === 'boolean') {
    mergedConfig.enabled = userConfig.enabled;
  } else {
    mergedConfig.enabled = baseConfig.enabled !== false;
  }

  return mergedConfig;
}

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
  const tools = Object.values(registeredTools).map((tool) => {
    if (tool.id === 'tools') {
      return {
        ...tool,
        subTabs: buildToolsSubTabs()
      };
    }

    return tool;
  });
  
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
  if (id === 'tools' && registeredTools[id]) {
    return {
      ...registeredTools[id],
      subTabs: buildToolsSubTabs()
    };
  }

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
  const tool = getToolConfig(toolId);
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
  const baseConfig = getBaseToolRuntimeConfig(toolId);
  if (!baseConfig) {
    const basicConfig = getToolConfig(toolId);
    return basicConfig;
  }
  
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  const userConfig = userConfigs[toolId] || {};
  const legacyApiPresetBinding = getToolApiPreset(toolId);

  return mergeToolRuntimeConfig({
    ...baseConfig,
    id: toolId
  }, userConfig, legacyApiPresetBinding);
}

/**
 * 确保工具存在首份完整运行态配置
 * @param {string} toolId - 工具ID
 * @returns {boolean}
 */
export function ensureToolRuntimeConfig(toolId) {
  if (!toolId) return false;

  const baseConfig = getBaseToolRuntimeConfig(toolId);
  if (!baseConfig) {
    return false;
  }

  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  if (userConfigs[toolId]) {
    return true;
  }

  const initialConfig = {
    promptTemplate: baseConfig.promptTemplate || '',
    enabled: baseConfig.enabled !== false,
    extractTags: Array.isArray(baseConfig.extractTags) ? [...baseConfig.extractTags] : [],
    apiPreset: baseConfig.apiPreset || '',
    output: { ...(baseConfig.output || {}) },
    automation: { ...(baseConfig.automation || {}) },
    bypass: { ...(baseConfig.bypass || {}) },
    extraction: {
      ...(baseConfig.extraction || {}),
      selectors: Array.isArray(baseConfig?.extraction?.selectors)
        ? [...baseConfig.extraction.selectors]
        : []
    },
    runtime: { ...(baseConfig.runtime || {}) }
  };

  userConfigs[toolId] = initialConfig;
  storage.set(TOOL_CONFIG_STORAGE_KEY, userConfigs);

  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  bindings[toolId] = initialConfig.output?.apiPreset || initialConfig.apiPreset || '';
  storage.set(TOOL_API_PRESET_BINDING_KEY, bindings);

  eventBus.emit(EVENTS.TOOL_UPDATED, { toolId, config: initialConfig });
  return true;
}

/**
 * 保存工具配置
 * @param {string} toolId - 工具ID
 * @param {object} config - 配置对象
 * @returns {boolean} 是否成功
 */
export function saveToolConfig(toolId, config, options = {}) {
  if (!toolId || !getToolFullConfig(toolId)) {
    console.warn('[ToolRegistry] 工具不存在:', toolId);
    return false;
  }

  const { emitEvent = true } = options;
  
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  const resolvedApiPreset = config?.output?.apiPreset ?? config?.apiPreset ?? '';
  
  // v0.6 简化后的可保存字段
  const saveableFields = [
    'promptTemplate',      // 单提示词模板
    'enabled',             // 启用状态
    'extractTags',         // 提取标签（兼容）
    'apiPreset',           // API预设（兼容）
    'output',              // 输出配置（包含 mode, apiPreset, overwrite）
    'automation',          // 自动化配置
    'bypass',              // 破限词配置
    'extraction',          // 提取配置
    'runtime'              // 运行时状态
  ];
  
  userConfigs[toolId] = {};
  saveableFields.forEach(field => {
    if (config[field] !== undefined) {
      if (field === 'output' && config.output) {
        userConfigs[toolId][field] = {
          ...config.output,
          apiPreset: resolvedApiPreset
        };
        return;
      }

      if (field === 'apiPreset') {
        userConfigs[toolId][field] = resolvedApiPreset;
        return;
      }

      userConfigs[toolId][field] = config[field];
    }
  });

  if (userConfigs[toolId].apiPreset === undefined) {
    userConfigs[toolId].apiPreset = resolvedApiPreset;
  }

  if (!userConfigs[toolId].output && config.output !== undefined) {
    userConfigs[toolId].output = {
      ...(config.output || {}),
      apiPreset: resolvedApiPreset
    };
  }
  
  storage.set(TOOL_CONFIG_STORAGE_KEY, userConfigs);

  bindings[toolId] = resolvedApiPreset;
  storage.set(TOOL_API_PRESET_BINDING_KEY, bindings);

  if (emitEvent) {
    eventBus.emit(EVENTS.TOOL_UPDATED, { toolId, config: userConfigs[toolId] });
  }
  
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
    apiPreset: presetName,
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
 * 轻量更新工具运行时诊断信息。
 * 默认不刷新 lastRunAt，也不广播 TOOL_UPDATED，避免高频触发导致 UI 抖动。
 * @param {string} toolId - 工具ID
 * @param {Object} runtimePartial - 运行时增量
 * @param {Object} options - 选项
 * @param {boolean} options.touchLastRunAt - 是否刷新 lastRunAt
 * @param {boolean} options.emitEvent - 是否广播 TOOL_UPDATED
 * @returns {boolean}
 */
export function patchToolRuntime(toolId, runtimePartial, options = {}) {
  const config = getToolFullConfig(toolId);
  if (!config) return false;

  const {
    touchLastRunAt = false,
    emitEvent = false
  } = options;

  const runtime = createToolRuntimeState({
    ...(config.runtime || {}),
    ...(runtimePartial || {})
  });

  if (touchLastRunAt) {
    runtime.lastRunAt = Date.now();
  }

  return saveToolConfig(toolId, {
    ...config,
    runtime
  }, { emitEvent });
}

/**
 * 追加工具运行时历史。
 * @param {string} toolId - 工具ID
 * @param {'writeback'} historyType - 历史类型
 * @param {Object} historyEntry - 历史记录
 * @param {Object} options - 选项
 * @param {number} options.limit - 保留条数
 * @param {boolean} options.emitEvent - 是否广播 TOOL_UPDATED
 * @returns {boolean}
 */
export function appendToolRuntimeHistory(toolId, historyType, historyEntry = {}, options = {}) {
  const config = getToolFullConfig(toolId);
  if (!config) return false;

  const {
    limit = 10,
    emitEvent = false
  } = options;

  const runtime = createToolRuntimeState(config.runtime || {});
  const fieldName = 'recentWritebackHistory';

  const nextEntry = {
    id: historyEntry?.id || `hist_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    at: historyEntry?.at || Date.now(),
    ...historyEntry
  };

  runtime[fieldName] = trimRuntimeHistoryEntries([
    ...(Array.isArray(runtime[fieldName]) ? runtime[fieldName] : []),
    nextEntry
  ], limit);

  if (nextEntry?.traceId) {
    runtime.lastTraceId = nextEntry.traceId;
  }

  return saveToolConfig(toolId, {
    ...config,
    runtime
  }, { emitEvent });
}

/**
 * 更新工具运行时状态
 * @param {string} toolId - 工具ID
 * @param {Object} runtimePartial - 部分运行时状态
 * @returns {boolean} 是否成功
 */
export function updateToolRuntime(toolId, runtimePartial) {
  return patchToolRuntime(toolId, runtimePartial, {
    touchLastRunAt: true,
    emitEvent: true
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
  const toolIds = new Set([
    ...Object.keys(DEFAULT_TOOL_CONFIGS),
    ...getCustomManagedToolEntries().map(([toolId]) => toolId)
  ]);

  return Array.from(toolIds)
    .map(toolId => getToolFullConfig(toolId))
    .filter(Boolean);
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
  getToolBaseConfig,
  ensureToolRuntimeConfig,
  getToolFullConfig,
  patchToolRuntime,
  appendToolRuntimeHistory,
  saveToolConfig,
  resetToolConfig,
  getAllDefaultToolConfigs,
  getAllToolFullConfigs,
  getEnabledTools
};
