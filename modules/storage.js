/**
 * YouYou Toolkit - 存储管理模块
 * @description 处理设置的持久化存储
 */

// ============================================================
// 常量定义
// ============================================================

const STORAGE_KEYS = {
  SETTINGS: 'youyou_toolkit_settings',
  API_PRESETS: 'youyou_toolkit_api_presets',
  CURRENT_PRESET: 'youyou_toolkit_current_preset'
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
// 存储后端
// ============================================================

/**
 * 获取SillyTavern的extensionSettings对象
 * @returns {Object|null}
 */
function getTavernExtensionSettings() {
  try {
    // 尝试从顶层窗口获取
    const topWindow = (typeof window.parent !== 'undefined' ? window.parent : window);
    
    // 方法1: 通过SillyTavern API
    if (topWindow.SillyTavern?.getContext) {
      const context = topWindow.SillyTavern.getContext();
      if (context?.extensionSettings) {
        return context.extensionSettings;
      }
    }
    
    // 方法2: 直接访问全局变量
    if (topWindow.extension_settings) {
      return topWindow.extension_settings;
    }
    
    // 方法3: 通过jQuery数据
    const $ = topWindow.jQuery || window.jQuery;
    if ($) {
      // 尝试从script.js模块获取
      // 这是SillyTavern常用的方式
    }
    
    return null;
  } catch (e) {
    console.warn('[YouYouToolkit] 无法获取SillyTavern extensionSettings:', e);
    return null;
  }
}

/**
 * 获取saveSettings函数
 * @returns {Function|null}
 */
function getSaveSettingsFunction() {
  try {
    const topWindow = (typeof window.parent !== 'undefined' ? window.parent : window);
    
    // 方法1: 从全局获取
    if (typeof topWindow.saveSettings === 'function') {
      return topWindow.saveSettings;
    }
    
    // 方法2: 从SillyTavern模块获取
    if (topWindow.SillyTavern?.getContext) {
      const context = topWindow.SillyTavern.getContext();
      if (typeof context.saveSettings === 'function') {
        return context.saveSettings;
      }
      if (typeof context.saveSettingsDebounced === 'function') {
        return context.saveSettingsDebounced;
      }
    }
    
    return null;
  } catch (e) {
    return null;
  }
}

// ============================================================
// 存储操作
// ============================================================

/**
 * 获取存储对象
 * @returns {Object} 存储对象，包含getItem/setItem/removeItem方法
 */
function getStorage() {
  const tavernSettings = getTavernExtensionSettings();
  const namespace = 'youyou_toolkit';
  
  if (tavernSettings) {
    // 确保命名空间存在
    if (!tavernSettings[namespace]) {
      tavernSettings[namespace] = {};
    }
    
    return {
      getItem: (key) => {
        const value = tavernSettings[namespace][key];
        return typeof value === 'string' ? value : (value ? JSON.stringify(value) : null);
      },
      setItem: (key, value) => {
        tavernSettings[namespace][key] = value;
        // 触发保存
        const saveFn = getSaveSettingsFunction();
        if (saveFn) {
          try {
            saveFn();
          } catch (e) {
            console.warn('[YouYouToolkit] 保存设置失败:', e);
          }
        }
      },
      removeItem: (key) => {
        delete tavernSettings[namespace][key];
        const saveFn = getSaveSettingsFunction();
        if (saveFn) {
          try {
            saveFn();
          } catch (e) {}
        }
      },
      _isTavern: true
    };
  }
  
  // 回退到localStorage
  console.warn('[YouYouToolkit] 使用localStorage作为回退存储');
  return {
    getItem: (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error('[YouYouToolkit] localStorage写入失败:', e);
      }
    },
    removeItem: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (e) {}
    },
    _isTavern: false
  };
}

/**
 * 安全解析JSON
 * @param {string} str 
 * @param {*} fallback 
 * @returns {*}
 */
function safeJsonParse(str, fallback = null) {
  if (!str || typeof str !== 'string') return fallback;
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
}

/**
 * 安全序列化JSON
 * @param {*} obj 
 * @param {string} fallback 
 * @returns {string}
 */
function safeJsonStringify(obj, fallback = '{}') {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return fallback;
  }
}

// ============================================================
// 设置读写
// ============================================================

/**
 * 加载设置
 * @returns {Object}
 */
export function loadSettings() {
  const storage = getStorage();
  const savedSettings = storage.getItem(STORAGE_KEYS.SETTINGS);
  
  if (savedSettings) {
    const parsed = safeJsonParse(savedSettings, null);
    if (parsed && typeof parsed === 'object') {
      // 深度合并默认设置和保存的设置
      return deepMerge(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)), parsed);
    }
  }
  
  return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

/**
 * 保存设置
 * @param {Object} settings 
 */
export function saveSettings(settings) {
  const storage = getStorage();
  storage.setItem(STORAGE_KEYS.SETTINGS, safeJsonStringify(settings));
}

/**
 * 加载API预设列表
 * @returns {Array}
 */
export function loadApiPresets() {
  const storage = getStorage();
  const saved = storage.getItem(STORAGE_KEYS.API_PRESETS);
  
  if (saved) {
    const parsed = safeJsonParse(saved, null);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  }
  
  return JSON.parse(JSON.stringify(DEFAULT_API_PRESETS));
}

/**
 * 保存API预设列表
 * @param {Array} presets 
 */
export function saveApiPresets(presets) {
  const storage = getStorage();
  storage.setItem(STORAGE_KEYS.API_PRESETS, safeJsonStringify(presets));
}

/**
 * 获取当前使用的预设名称
 * @returns {string}
 */
export function getCurrentPresetName() {
  const storage = getStorage();
  return storage.getItem(STORAGE_KEYS.CURRENT_PRESET) || '';
}

/**
 * 设置当前使用的预设名称
 * @param {string} name 
 */
export function setCurrentPresetName(name) {
  const storage = getStorage();
  storage.setItem(STORAGE_KEYS.CURRENT_PRESET, name || '');
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