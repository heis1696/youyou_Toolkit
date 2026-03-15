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
 * @property {Object} config.trigger - 触发配置
 * @property {string} config.trigger.type - 触发类型 (manual, event, scheduled)
 * @property {string[]} config.trigger.events - 触发事件列表
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
  category: 'utility',
  config: {
    trigger: {
      type: 'manual',
      events: []
    },
    execution: {
      timeout: 60000,
      retries: 3
    },
    api: {
      preset: '',
      useBypass: true,
      bypassPreset: 'standard'
    },
    messages: [],
    context: {
      depth: 3,
      includeTags: [],
      excludeTags: []
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

// ============================================================
// 默认工具预设（初始为空，用户自行创建工具）
// ============================================================

const DEFAULT_TOOL_PRESETS = {};

// ============================================================
// 存储键（保持向后兼容）
// ============================================================

const TOOL_STORAGE_KEYS = {
  TOOLS: 'tools',
  PRESETS: 'tool_presets',
  CURRENT_PRESET: 'current_tool_preset'
};

// ============================================================
// 工具管理API
// ============================================================

/**
 * 获取所有工具定义
 * @returns {Object} 工具定义对象 { id: ToolDefinition }
 */
export function getAllTools() {
  const saved = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS);
  
  if (saved && typeof saved === 'object') {
    return { ...DEFAULT_TOOL_PRESETS, ...saved };
  }
  
  return { ...DEFAULT_TOOL_PRESETS };
}

/**
 * 获取单个工具定义
 * @param {string} toolId 工具ID
 * @returns {ToolDefinition|null}
 */
export function getTool(toolId) {
  const tools = getAllTools();
  return tools[toolId] || null;
}

/**
 * 创建或更新工具定义
 * @param {string} toolId 工具ID
 * @param {ToolDefinition} toolDef 工具定义
 * @returns {boolean} 是否成功
 */
export function saveTool(toolId, toolDef) {
  if (!toolId || !toolDef) {
    return false;
  }
  
  const customTools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  const isNewTool = !customTools[toolId] && !DEFAULT_TOOL_PRESETS[toolId];
  
  // 合并默认结构
  const validatedTool = {
    ...DEFAULT_TOOL_STRUCTURE,
    ...toolDef,
    id: toolId,
    metadata: {
      ...DEFAULT_TOOL_STRUCTURE.metadata,
      ...toolDef.metadata,
      updatedAt: new Date().toISOString()
    }
  };
  
  // 如果是新建，设置创建时间
  if (!customTools[toolId]) {
    validatedTool.metadata.createdAt = new Date().toISOString();
  }
  
  customTools[toolId] = validatedTool;
  toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, customTools);
  
  // 发送事件
  eventBus.emit(isNewTool ? EVENTS.TOOL_REGISTERED : EVENTS.TOOL_UPDATED, {
    toolId,
    tool: validatedTool
  });
  
  return true;
}

/**
 * 删除工具定义
 * @param {string} toolId 工具ID
 * @returns {boolean} 是否成功
 */
export function deleteTool(toolId) {
  // 不允许删除默认工具
  if (DEFAULT_TOOL_PRESETS[toolId]) {
    return false;
  }
  
  const customTools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  
  if (customTools[toolId]) {
    delete customTools[toolId];
    toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, customTools);
    
    // 发送事件
    eventBus.emit(EVENTS.TOOL_UNREGISTERED, { toolId });
    
    return true;
  }
  
  return false;
}

/**
 * 启用/禁用工具
 * @param {string} toolId 工具ID
 * @param {boolean} enabled 是否启用
 * @returns {boolean} 是否成功
 */
export function setToolEnabled(toolId, enabled) {
  const tool = getTool(toolId);
  if (!tool) return false;
  
  const customTools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  
  // 如果是默认工具，创建一个覆盖条目
  if (!customTools[toolId]) {
    customTools[toolId] = { ...tool };
  }
  
  customTools[toolId].enabled = enabled;
  customTools[toolId].metadata = {
    ...customTools[toolId].metadata,
    updatedAt: new Date().toISOString()
  };
  
  toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, customTools);
  
  // 发送事件
  eventBus.emit(enabled ? EVENTS.TOOL_ENABLED : EVENTS.TOOL_DISABLED, { toolId });
  
  return true;
}

/**
 * 克隆工具
 * @param {string} toolId 要克隆的工具ID
 * @param {string} newId 新工具ID
 * @param {string} newName 新工具名称
 * @returns {boolean} 是否成功
 */
export function cloneTool(toolId, newId, newName) {
  const tool = getTool(toolId);
  if (!tool) return false;
  
  const clonedTool = JSON.parse(JSON.stringify(tool));
  clonedTool.name = newName || `${tool.name} (副本)`;
  clonedTool.metadata = {
    ...clonedTool.metadata,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return saveTool(newId, clonedTool);
}

// ============================================================
// 工具预设管理
// ============================================================

/**
 * 获取所有工具预设
 * @returns {Object} 预设对象
 */
export function getAllToolPresets() {
  const saved = toolStorage.get(TOOL_STORAGE_KEYS.PRESETS);
  
  if (saved && typeof saved === 'object') {
    return { ...DEFAULT_TOOL_PRESETS, ...saved };
  }
  
  return { ...DEFAULT_TOOL_PRESETS };
}

/**
 * 获取单个工具预设
 * @param {string} presetId 预设ID
 * @returns {Object|null}
 */
export function getToolPreset(presetId) {
  const presets = getAllToolPresets();
  return presets[presetId] || null;
}

/**
 * 保存工具预设
 * @param {string} presetId 预设ID
 * @param {Object} preset 预设配置
 * @returns {boolean}
 */
export function saveToolPreset(presetId, preset) {
  if (!presetId || !preset) return false;
  
  const customPresets = toolStorage.get(TOOL_STORAGE_KEYS.PRESETS) || {};
  
  customPresets[presetId] = {
    ...preset,
    metadata: {
      ...preset.metadata,
      updatedAt: new Date().toISOString()
    }
  };
  
  toolStorage.set(TOOL_STORAGE_KEYS.PRESETS, customPresets);
  return true;
}

/**
 * 删除工具预设
 * @param {string} presetId 预设ID
 * @returns {boolean}
 */
export function deleteToolPreset(presetId) {
  if (DEFAULT_TOOL_PRESETS[presetId]) return false;
  
  const customPresets = toolStorage.get(TOOL_STORAGE_KEYS.PRESETS) || {};
  
  if (customPresets[presetId]) {
    delete customPresets[presetId];
    toolStorage.set(TOOL_STORAGE_KEYS.PRESETS, customPresets);
    return true;
  }
  
  return false;
}

/**
 * 获取当前使用的预设ID
 * @returns {string|null}
 */
export function getCurrentToolPresetId() {
  return toolStorage.get(TOOL_STORAGE_KEYS.CURRENT_PRESET) || null;
}

/**
 * 设置当前使用的预设
 * @param {string} presetId 预设ID
 * @returns {boolean}
 */
export function setCurrentToolPreset(presetId) {
  const presets = getAllToolPresets();
  if (!presets[presetId]) return false;
  
  toolStorage.set(TOOL_STORAGE_KEYS.CURRENT_PRESET, presetId);
  return true;
}

// ============================================================
// 导入导出
// ============================================================

/**
 * 导出所有自定义工具和预设
 * @returns {string} JSON字符串
 */
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

/**
 * 导入工具和预设
 * @param {string} jsonString JSON字符串
 * @param {boolean} overwrite 是否覆盖
 * @returns {Object} { success: boolean, toolsImported: number, presetsImported: number, message: string }
 */
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
    
    let toolsCount = 0;
    let presetsCount = 0;
    
    // 导入工具
    if (imported.tools && typeof imported.tools === 'object') {
      for (const [id, tool] of Object.entries(imported.tools)) {
        if (DEFAULT_TOOL_PRESETS[id] && !shouldOverwrite) continue;
        if (tool && typeof tool === 'object') {
          existingTools[id] = tool;
          toolsCount++;
        }
      }
      toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, existingTools);
    }
    
    // 导入预设
    if (imported.presets && typeof imported.presets === 'object') {
      for (const [id, preset] of Object.entries(imported.presets)) {
        if (DEFAULT_TOOL_PRESETS[id] && !shouldOverwrite) continue;
        if (preset && typeof preset === 'object') {
          existingPresets[id] = preset;
          presetsCount++;
        }
      }
      toolStorage.set(TOOL_STORAGE_KEYS.PRESETS, existingPresets);
    }
    
    return {
      success: true,
      toolsImported: toolsCount,
      presetsImported: presetsCount,
      message: `成功导入 ${toolsCount} 个工具和 ${presetsCount} 个预设`
    };
  } catch (e) {
    return { success: false, toolsImported: 0, presetsImported: 0, message: `导入失败: ${e.message}` };
  }
}

/**
 * 重置为默认工具和预设
 */
export function resetTools() {
  toolStorage.remove(TOOL_STORAGE_KEYS.TOOLS);
  toolStorage.remove(TOOL_STORAGE_KEYS.PRESETS);
  toolStorage.remove(TOOL_STORAGE_KEYS.CURRENT_PRESET);
}

// ============================================================
// 工具验证
// ============================================================

/**
 * 验证工具定义
 * @param {ToolDefinition} toolDef 工具定义
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateTool(toolDef) {
  const errors = [];
  
  if (!toolDef) {
    return { valid: false, errors: ['工具定义为空'] };
  }
  
  if (!toolDef.name || typeof toolDef.name !== 'string') {
    errors.push('工具名称无效');
  }
  
  if (!toolDef.category || typeof toolDef.category !== 'string') {
    errors.push('工具分类无效');
  }
  
  if (toolDef.config) {
    const { trigger, execution, api, context } = toolDef.config;
    
    if (trigger && !['manual', 'event', 'scheduled'].includes(trigger.type)) {
      errors.push('触发类型无效');
    }
    
    if (execution) {
      if (typeof execution.timeout !== 'number' || execution.timeout < 0) {
        errors.push('超时时间必须为正数');
      }
      if (typeof execution.retries !== 'number' || execution.retries < 0) {
        errors.push('重试次数必须为正数');
      }
    }
    
    if (context && typeof context.depth !== 'number') {
      errors.push('上下文深度必须为数字');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// 导出常量
export { DEFAULT_TOOL_STRUCTURE, DEFAULT_TOOL_PRESETS, TOOL_STORAGE_KEYS };