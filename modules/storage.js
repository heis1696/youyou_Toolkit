/**
 * YouYou Toolkit - 存储管理模块
 * @description 处理设置的持久化存储
 * @deprecated 此模块已重构，请使用 core/storage-service.js 中的新服务
 */

// 导入核心存储服务
import { storage as _storage } from './core/storage-service.js';

// 重新导出 core 模块的存储服务，保持向后兼容
export { 
  storage, 
  toolStorage, 
  presetStorage, 
  windowStorage,
  StorageService,
  getStorage,
  loadSettings,
  saveSettings 
} from './core/storage-service.js';

// ============================================================
// 常量定义 - 保留用于向后兼容
// ============================================================

const STORAGE_KEYS = {
  SETTINGS: 'settings',
  API_PRESETS: 'api_presets',
  CURRENT_PRESET: 'current_preset',
  // 工具模块相关存储键
  TOOLS: 'tools',
  TOOL_PRESETS: 'tool_presets',
  CURRENT_TOOL_PRESET: 'current_tool_preset',
  BYPASS_PRESETS: 'bypass_presets',
  CURRENT_BYPASS_PRESET: 'current_bypass_preset',
  BYPASS_ENABLED: 'bypass_enabled'
};

// 默认设置
const DEFAULT_SETTINGS = {
  // API配置
  apiConfig: {
    url: '',
    apiKey: '',
    model: '',
    useMainApi: true,
    max_tokens: 4096,
    temperature: 0.7,
    top_p: 0.9
  },
  // 当前使用的预设名称（空表示使用当前配置）
  currentPreset: '',
  // UI设置
  uiSettings: {
    theme: 'dark',
    lastTab: 'api'
  }
};

// 默认API预设
const DEFAULT_API_PRESETS = [];

// ============================================================
// API预设相关函数 - 使用新的存储服务
// ============================================================

/**
 * 加载API预设列表
 * @returns {Array}
 */
export function loadApiPresets() {
  return _storage.get(STORAGE_KEYS.API_PRESETS) || [];
}

/**
 * 保存API预设列表
 * @param {Array} presets 
 */
export function saveApiPresets(presets) {
  _storage.set(STORAGE_KEYS.API_PRESETS, presets);
}

/**
 * 获取当前使用的预设名称
 * @returns {string}
 */
export function getCurrentPresetName() {
  return _storage.get(STORAGE_KEYS.CURRENT_PRESET) || '';
}

/**
 * 设置当前使用的预设名称
 * @param {string} name 
 */
export function setCurrentPresetName(name) {
  _storage.set(STORAGE_KEYS.CURRENT_PRESET, name || '');
}

// ============================================================
// 工具函数
// ============================================================

/**
 * 深度合并对象
 * @param {Object} target 
 * @param {Object} source 
 * @returns {Object}
 */
export function deepMerge(target, source) {
  const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);
  
  let output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

// 导出常量
export { STORAGE_KEYS, DEFAULT_SETTINGS, DEFAULT_API_PRESETS };