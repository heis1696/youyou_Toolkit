/**
 * YouYou Toolkit - 统一存储服务
 * @description 提供命名空间隔离的统一存储接口
 * @version 1.0.0
 */

// ============================================================
// 存储服务类
// ============================================================

class StorageService {
  /**
   * @param {string} namespace - 存储命名空间
   */
  constructor(namespace = 'youyou_toolkit') {
    this.namespace = namespace;
    this._storage = null;
    this._cache = new Map();
  }

  // ============================================================
  // 存储后端获取
  // ============================================================

  /**
   * 获取存储后端
   * @private
   * @returns {Object} 存储对象 { getItem, setItem, removeItem }
   */
  _getStorage() {
    if (this._storage) return this._storage;

    try {
      // 尝试从顶层窗口获取SillyTavern设置
      const topWindow = (typeof window.parent !== 'undefined' && window.parent !== window) 
        ? window.parent 
        : window;

      // 方法1: 通过SillyTavern API
      if (topWindow.SillyTavern?.getContext) {
        const context = topWindow.SillyTavern.getContext();
        if (context?.extensionSettings) {
          // 确保命名空间存在
          if (!context.extensionSettings[this.namespace]) {
            context.extensionSettings[this.namespace] = {};
          }
          
          this._storage = {
            _target: context.extensionSettings[this.namespace],
            getItem: (key) => {
              const value = context.extensionSettings[this.namespace][key];
              return typeof value === 'string' ? value : (value ? JSON.stringify(value) : null);
            },
            setItem: (key, value) => {
              context.extensionSettings[this.namespace][key] = value;
              this._saveSettings(context);
            },
            removeItem: (key) => {
              delete context.extensionSettings[this.namespace][key];
              this._saveSettings(context);
            },
            _isTavern: true
          };
          return this._storage;
        }
      }
    } catch (e) {
      console.warn(`[${this.namespace}] SillyTavern存储不可用，使用localStorage`);
    }

    // 回退到localStorage
    this._storage = {
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
          console.error(`[${this.namespace}] localStorage写入失败:`, e);
        }
      },
      removeItem: (key) => {
        try {
          localStorage.removeItem(key);
        } catch (e) {}
      },
      _isTavern: false
    };

    return this._storage;
  }

  /**
   * 触发SillyTavern设置保存
   * @private
   */
  _saveSettings(context) {
    if (typeof context.saveSettings === 'function') {
      try {
        context.saveSettings();
      } catch (e) {}
    } else if (typeof context.saveSettingsDebounced === 'function') {
      try {
        context.saveSettingsDebounced();
      } catch (e) {}
    }
  }

  // ============================================================
  // 公共API
  // ============================================================

  /**
   * 获取存储值
   * @param {string} key - 键名
   * @param {*} defaultValue - 默认值
   * @returns {*}
   */
  get(key, defaultValue = null) {
    const cacheKey = `${this.namespace}:${key}`;
    if (this._cache.has(cacheKey)) {
      return this._cache.get(cacheKey);
    }

    const storage = this._getStorage();
    const fullKey = this._getFullKey(key);
    const value = storage.getItem(fullKey);
    
    if (value === null) return defaultValue;
    
    try {
      const parsed = JSON.parse(value);
      this._cache.set(cacheKey, parsed);
      return parsed;
    } catch (e) {
      return value;
    }
  }

  /**
   * 设置存储值
   * @param {string} key - 键名
   * @param {*} value - 值
   */
  set(key, value) {
    const storage = this._getStorage();
    const fullKey = this._getFullKey(key);
    
    // 更新缓存
    const cacheKey = `${this.namespace}:${key}`;
    this._cache.set(cacheKey, value);
    
    // 持久化
    try {
      storage.setItem(fullKey, JSON.stringify(value));
    } catch (e) {
      console.error(`[${this.namespace}] 存储失败:`, e);
    }
  }

  /**
   * 删除存储值
   * @param {string} key - 键名
   */
  remove(key) {
    const storage = this._getStorage();
    const fullKey = this._getFullKey(key);
    
    // 清除缓存
    const cacheKey = `${this.namespace}:${key}`;
    this._cache.delete(cacheKey);
    
    storage.removeItem(fullKey);
  }

  /**
   * 检查键是否存在
   * @param {string} key - 键名
   * @returns {boolean}
   */
  has(key) {
    const storage = this._getStorage();
    const fullKey = this._getFullKey(key);
    return storage.getItem(fullKey) !== null;
  }

  /**
   * 清除命名空间下所有数据
   */
  clear() {
    const storage = this._getStorage();
    
    // 如果是SillyTavern存储
    if (storage._isTavern) {
      const topWindow = (typeof window.parent !== 'undefined') ? window.parent : window;
      if (topWindow.SillyTavern?.getContext) {
        const context = topWindow.SillyTavern.getContext();
        if (context?.extensionSettings?.[this.namespace]) {
          context.extensionSettings[this.namespace] = {};
          this._saveSettings(context);
        }
      }
    } else {
      // localStorage - 需要遍历删除
      const prefix = `${this.namespace}_`;
      const keysToRemove = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
    
    // 清除缓存
    this._cache.clear();
  }

  /**
   * 获取完整键名
   * @private
   */
  _getFullKey(key) {
    // SillyTavern存储不需要前缀（已有命名空间）
    if (this._getStorage()._isTavern) {
      return key;
    }
    // localStorage需要前缀
    return `${this.namespace}_${key}`;
  }

  /**
   * 创建子命名空间存储
   * @param {string} subNamespace - 子命名空间
   * @returns {StorageService}
   */
  namespace(subNamespace) {
    return new StorageService(`${this.namespace}:${subNamespace}`);
  }

  // ============================================================
  // 工具方法
  // ============================================================

  /**
   * 批量获取
   * @param {string[]} keys - 键名数组
   * @returns {Object}
   */
  getMultiple(keys) {
    const result = {};
    keys.forEach(key => {
      result[key] = this.get(key);
    });
    return result;
  }

  /**
   * 批量设置
   * @param {Object} data - 键值对对象
   */
  setMultiple(data) {
    Object.entries(data).forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  /**
   * 导出所有数据
   * @returns {Object}
   */
  exportAll() {
    const storage = this._getStorage();
    const result = {};
    
    if (storage._isTavern) {
      const topWindow = (typeof window.parent !== 'undefined') ? window.parent : window;
      if (topWindow.SillyTavern?.getContext) {
        const context = topWindow.SillyTavern.getContext();
        const data = context?.extensionSettings?.[this.namespace] || {};
        Object.entries(data).forEach(([key, value]) => {
          result[key] = typeof value === 'string' ? JSON.parse(value) : value;
        });
      }
    } else {
      const prefix = `${this.namespace}_`;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          const shortKey = key.slice(prefix.length);
          try {
            result[shortKey] = JSON.parse(localStorage.getItem(key));
          } catch (e) {
            result[shortKey] = localStorage.getItem(key);
          }
        }
      }
    }
    
    return result;
  }
}

// ============================================================
// 单例实例
// ============================================================

/** 主存储实例 */
export const storage = new StorageService('youyou_toolkit');

/** 工具存储实例 */
export const toolStorage = new StorageService('youyou_toolkit:tools');

/** 预设存储实例 */
export const presetStorage = new StorageService('youyou_toolkit:presets');

/** 窗口状态存储实例 */
export const windowStorage = new StorageService('youyou_toolkit:windows');

// ============================================================
// 兼容层 - 保持与旧API的兼容性
// ============================================================

/**
 * 获取存储对象（兼容旧API）
 * @deprecated 使用 storage 实例替代
 * @returns {Object}
 */
export function getStorage() {
  const instance = storage;
  instance._getStorage();
  return instance._storage;
}

/**
 * 加载设置（兼容旧API）
 * @deprecated 使用 storage.get('settings') 替代
 */
export function loadSettings() {
  return storage.get('settings', {
    apiConfig: {
      url: '',
      apiKey: '',
      model: '',
      useMainApi: true,
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 0.9
    },
    currentPreset: '',
    uiSettings: {
      theme: 'dark',
      lastTab: 'api'
    }
  });
}

/**
 * 保存设置（兼容旧API）
 * @deprecated 使用 storage.set('settings', settings) 替代
 */
export function saveSettings(settings) {
  storage.set('settings', settings);
}

// 导出类和实例
export { StorageService };
export default storage;