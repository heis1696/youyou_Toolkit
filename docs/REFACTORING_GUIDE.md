# YouYou Toolkit 重构施工文档

## 施工总览

本文档提供分阶段的重构实施指南，每个阶段都是独立可测试的，确保重构过程中系统保持可用状态。

---

## 阶段一：统一存储层

### 1.1 创建核心目录结构

```bash
mkdir -p modules/core
```

### 1.2 创建 StorageService

**文件**: `modules/core/storage-service.js`

```javascript
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
```

### 1.3 创建索引文件

**文件**: `modules/core/index.js`

```javascript
/**
 * Core模块入口
 */
export { storage, toolStorage, presetStorage, windowStorage, StorageService, getStorage, loadSettings, saveSettings } from './storage-service.js';
export { EventBus, eventBus, EVENTS } from './event-bus.js';
```

### 1.4 修改 tool-manager.js 使用 StorageService

**修改内容**:

```javascript
// 在文件顶部添加导入
import { toolStorage } from './core/storage-service.js';

// 删除原有的 getStorage, safeJsonParse, safeJsonStringify 函数

// 修改所有使用存储的地方，例如：
// 原: const storage = getStorage(); const saved = storage.getItem(TOOL_STORAGE_KEYS.TOOLS);
// 新: const saved = toolStorage.get('tools');

// 修改 getAllTools 函数
export function getAllTools() {
  const saved = toolStorage.get('tools');
  if (saved && typeof saved === 'object') {
    return { ...DEFAULT_TOOL_PRESETS, ...saved };
  }
  return { ...DEFAULT_TOOL_PRESETS };
}

// 修改 saveTool 函数
export function saveTool(toolId, toolDef) {
  if (!toolId || !toolDef) return false;
  
  const customTools = toolStorage.get('tools') || {};
  
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
  
  if (!customTools[toolId]) {
    validatedTool.metadata.createdAt = new Date().toISOString();
  }
  
  customTools[toolId] = validatedTool;
  toolStorage.set('tools', customTools);
  
  return true;
}

// 类似地修改其他存储相关函数...
```

### 1.5 测试存储服务

**文件**: `tests/storage-service.test.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>StorageService 测试</title>
</head>
<body>
  <h1>StorageService 测试</h1>
  <pre id="output"></pre>
  
  <script type="module">
    import { storage, StorageService } from '../modules/core/storage-service.js';
    
    const output = document.getElementById('output');
    let log = '';
    
    function test(name, fn) {
      try {
        fn();
        log += `✅ ${name}\n`;
      } catch (e) {
        log += `❌ ${name}: ${e.message}\n`;
      }
    }
    
    // 测试基本操作
    test('set/get', () => {
      storage.set('test_key', { value: 'test' });
      const result = storage.get('test_key');
      if (result.value !== 'test') throw new Error('值不匹配');
    });
    
    test('has', () => {
      if (!storage.has('test_key')) throw new Error('应该存在');
    });
    
    test('remove', () => {
      storage.remove('test_key');
      if (storage.has('test_key')) throw new Error('不应该存在');
    });
    
    test('namespace', () => {
      const subStorage = storage.namespace('test');
      subStorage.set('sub_key', 'sub_value');
      if (subStorage.get('sub_key') !== 'sub_value') throw new Error('子命名空间失败');
    });
    
    output.textContent = log;
  </script>
</body>
</html>
```

---

## 阶段二：事件总线解耦

### 2.1 创建 EventBus

**文件**: `modules/core/event-bus.js`

```javascript
/**
 * YouYou Toolkit - 事件总线
 * @description 用于模块间的松耦合通信
 * @version 1.0.0
 */

// ============================================================
// 事件类型定义
// ============================================================

export const EVENTS = {
  // ==================== 存储事件 ====================
  STORAGE_CHANGED: 'storage:changed',
  STORAGE_CLEARED: 'storage:cleared',
  
  // ==================== 预设事件 ====================
  PRESET_CREATED: 'preset:created',
  PRESET_UPDATED: 'preset:updated',
  PRESET_DELETED: 'preset:deleted',
  PRESET_ACTIVATED: 'preset:activated',
  PRESET_IMPORTED: 'preset:imported',
  PRESET_EXPORTED: 'preset:exported',
  
  // ==================== API事件 ====================
  API_CONFIG_UPDATED: 'api:configUpdated',
  API_REQUEST_START: 'api:requestStart',
  API_REQUEST_SUCCESS: 'api:requestSuccess',
  API_REQUEST_ERROR: 'api:requestError',
  API_CONNECTION_TESTED: 'api:connectionTested',
  
  // ==================== 工具事件 ====================
  TOOL_REGISTERED: 'tool:registered',
  TOOL_UNREGISTERED: 'tool:unregistered',
  TOOL_UPDATED: 'tool:updated',
  TOOL_ENABLED: 'tool:enabled',
  TOOL_DISABLED: 'tool:disabled',
  TOOL_EXECUTING: 'tool:executing',
  TOOL_EXECUTED: 'tool:executed',
  TOOL_ERROR: 'tool:error',
  
  // ==================== 正则提取事件 ====================
  REGEX_RULE_ADDED: 'regex:ruleAdded',
  REGEX_RULE_UPDATED: 'regex:ruleUpdated',
  REGEX_RULE_DELETED: 'regex:ruleDeleted',
  REGEX_RULES_CLEARED: 'regex:rulesCleared',
  REGEX_PRESET_LOADED: 'regex:presetLoaded',
  REGEX_EXTRACTED: 'regex:extracted',
  
  // ==================== 破限词事件 ====================
  BYPASS_ENABLED: 'bypass:enabled',
  BYPASS_DISABLED: 'bypass:disabled',
  BYPASS_PRESET_CREATED: 'bypass:presetCreated',
  BYPASS_PRESET_UPDATED: 'bypass:presetUpdated',
  BYPASS_PRESET_DELETED: 'bypass:presetDeleted',
  BYPASS_PRESET_ACTIVATED: 'bypass:presetActivated',
  
  // ==================== UI事件 ====================
  UI_INITIALIZED: 'ui:initialized',
  UI_RENDER_REQUESTED: 'ui:renderRequested',
  UI_TAB_CHANGED: 'ui:tabChanged',
  UI_SUBTAB_CHANGED: 'ui:subTabChanged',
  UI_POPUP_OPENED: 'ui:popupOpened',
  UI_POPUP_CLOSED: 'ui:popupClosed',
  UI_WINDOW_CREATED: 'ui:windowCreated',
  UI_WINDOW_CLOSED: 'ui:windowClosed',
  
  // ==================== 触发器事件 ====================
  TRIGGER_REGISTERED: 'trigger:registered',
  TRIGGER_UNREGISTERED: 'trigger:unregistered',
  TRIGGER_FIRED: 'trigger:fired',
  
  // ==================== 应用事件 ====================
  APP_INITIALIZING: 'app:initializing',
  APP_INITIALIZED: 'app:initialized',
  APP_ERROR: 'app:error'
};

// ============================================================
// 事件总线类
// ============================================================

class EventBus {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this.listeners = new Map();
    
    /** @type {Map<string, Function>} */
    this.onceCallbacks = new Map();
    
    /** 事件历史记录 */
    this.history = [];
    
    /** 最大历史记录数 */
    this.maxHistorySize = 100;
    
    /** 调试模式 */
    this.debugMode = false;
  }

  // ============================================================
  // 核心方法
  // ============================================================

  /**
   * 订阅事件
   * @param {string} event - 事件名
   * @param {Function} callback - 回调函数
   * @param {Object} options - 选项
   * @returns {Function} 取消订阅函数
   */
  on(event, callback, options = {}) {
    if (!event || typeof callback !== 'function') {
      console.warn('[EventBus] 无效的事件或回调');
      return () => {};
    }

    const { priority = 0 } = options;
    
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    const listener = { callback, priority };
    this.listeners.get(event).add(listener);
    
    if (this.debugMode) {
      console.log(`[EventBus] 订阅: ${event}`);
    }
    
    // 返回取消订阅函数
    return () => this.off(event, callback);
  }

  /**
   * 取消订阅
   * @param {string} event - 事件名
   * @param {Function} callback - 回调函数
   */
  off(event, callback) {
    const listeners = this.listeners.get(event);
    if (!listeners) return;
    
    for (const listener of listeners) {
      if (listener.callback === callback) {
        listeners.delete(listener);
        break;
      }
    }
    
    if (this.debugMode) {
      console.log(`[EventBus] 取消订阅: ${event}`);
    }
  }

  /**
   * 发布事件
   * @param {string} event - 事件名
   * @param {*} data - 事件数据
   */
  emit(event, data) {
    if (this.debugMode) {
      console.log(`[EventBus] 发布: ${event}`, data);
    }
    
    // 记录历史
    this._addToHistory(event, data);
    
    const listeners = this.listeners.get(event);
    if (!listeners || listeners.size === 0) return;
    
    // 按优先级排序
    const sortedListeners = Array.from(listeners)
      .sort((a, b) => b.priority - a.priority);
    
    for (const { callback } of sortedListeners) {
      try {
        callback(data);
      } catch (error) {
        console.error(`[EventBus] 事件处理错误 (${event}):`, error);
      }
    }
  }

  /**
   * 一次性订阅
   * @param {string} event - 事件名
   * @param {Function} callback - 回调函数
   * @returns {Function} 取消订阅函数
   */
  once(event, callback) {
    const wrapper = (data) => {
      this.off(event, wrapper);
      callback(data);
    };
    
    return this.on(event, wrapper);
  }

  /**
   * 等待事件
   * @param {string} event - 事件名
   * @param {number} timeout - 超时时间(ms)
   * @returns {Promise<*>}
   */
  wait(event, timeout = 0) {
    return new Promise((resolve, reject) => {
      let timer = null;
      
      const unsubscribe = this.once(event, (data) => {
        if (timer) clearTimeout(timer);
        resolve(data);
      });
      
      if (timeout > 0) {
        timer = setTimeout(() => {
          unsubscribe();
          reject(new Error(`等待事件超时: ${event}`));
        }, timeout);
      }
    });
  }

  // ============================================================
  // 工具方法
  // ============================================================

  /**
   * 检查是否有监听器
   * @param {string} event - 事件名
   * @returns {boolean}
   */
  hasListeners(event) {
    const listeners = this.listeners.get(event);
    return listeners && listeners.size > 0;
  }

  /**
   * 获取监听器数量
   * @param {string} event - 事件名
   * @returns {number}
   */
  listenerCount(event) {
    const listeners = this.listeners.get(event);
    return listeners ? listeners.size : 0;
  }

  /**
   * 移除所有监听器
   * @param {string} event - 事件名（可选，不传则清除所有）
   */
  removeAllListeners(event) {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * 设置调试模式
   * @param {boolean} enabled
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
  }

  /**
   * 添加到历史记录
   * @private
   */
  _addToHistory(event, data) {
    this.history.push({
      event,
      data,
      timestamp: Date.now()
    });
    
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
  }

  /**
   * 获取事件历史
   * @param {string} event - 事件名（可选）
   * @returns {Array}
   */
  getHistory(event) {
    if (event) {
      return this.history.filter(h => h.event === event);
    }
    return [...this.history];
  }

  /**
   * 清除历史
   */
  clearHistory() {
    this.history = [];
  }
}

// ============================================================
// 单例实例
// ============================================================

export const eventBus = new EventBus();

// 导出类
export { EventBus };
export default eventBus;
```

### 2.2 在各模块中集成事件总线

**修改 preset-manager.js**:

```javascript
import { eventBus, EVENTS } from './core/event-bus.js';

// 在 createPreset 函数末尾添加
export function createPreset(presetData) {
  // ... 原有逻辑 ...
  
  const preset = { ... };
  const presets = loadApiPresets();
  presets.push(preset);
  saveApiPresets(presets);
  
  // 发送事件
  eventBus.emit(EVENTS.PRESET_CREATED, { preset });
  
  return { success: true, message: `预设 "${trimmedName}" 创建成功`, preset };
}

// 在 deletePreset 函数中添加
export function deletePreset(name) {
  // ... 原有逻辑 ...
  
  // 发送事件
  eventBus.emit(EVENTS.PRESET_DELETED, { name });
  
  return { success: true, message: `预设 "${name}" 已删除` };
}
```

---

## 阶段三：拆分 ui-components.js

### 3.1 创建 UI 目录结构

```bash
mkdir -p modules/ui/components
```

### 3.2 创建 UI 管理器

**文件**: `modules/ui/ui-manager.js`

```javascript
/**
 * YouYou Toolkit - UI管理器
 * @description 统一管理UI组件的注册、渲染和销毁
 */

import { eventBus, EVENTS } from '../core/event-bus.js';
import { storage } from '../core/storage-service.js';

class UIManager {
  constructor() {
    /** @type {Map<string, Object>} 已注册的组件 */
    this.components = new Map();
    
    /** @type {Map<string, HTMLElement>} 活跃的组件实例 */
    this.activeInstances = new Map();
    
    /** @type {jQuery|null} */
    this.$ = null;
    
    /** @type {Object} 依赖注入 */
    this.dependencies = {};
    
    /** 当前标签页 */
    this.currentTab = 'apiPresets';
    
    /** 当前子标签页 */
    this.currentSubTab = {};
  }

  /**
   * 初始化UI管理器
   * @param {Object} options
   */
  init(options = {}) {
    this.$ = window.jQuery || window.parent?.jQuery;
    this.dependencies = options.services || {};
    
    // 注入基础样式
    this._injectBaseStyles();
    
    // 订阅事件
    this._subscribeEvents();
    
    eventBus.emit(EVENTS.UI_INITIALIZED);
  }

  /**
   * 注册组件
   * @param {string} id - 组件ID
   * @param {Object} component - 组件配置
   */
  register(id, component) {
    if (!id || !component) {
      console.warn('[UIManager] 无效的组件注册');
      return false;
    }
    
    this.components.set(id, {
      id,
      ...component,
      render: component.render || (() => ''),
      bindEvents: component.bindEvents || (() => {}),
      destroy: component.destroy || (() => {})
    });
    
    return true;
  }

  /**
   * 注销组件
   * @param {string} id
   */
  unregister(id) {
    this.destroyInstance(id);
    this.components.delete(id);
  }

  /**
   * 渲染组件
   * @param {string} id - 组件ID
   * @param {HTMLElement|jQuery} container - 容器
   * @param {Object} props - 属性
   */
  render(id, container, props = {}) {
    const component = this.components.get(id);
    if (!component) {
      console.warn(`[UIManager] 组件不存在: ${id}`);
      return;
    }
    
    const $container = this.$(container);
    if (!$container.length) {
      console.warn(`[UIManager] 容器不存在`);
      return;
    }
    
    // 销毁旧实例
    this.destroyInstance(id);
    
    // 渲染
    const html = component.render({ ...props, dependencies: this.dependencies });
    $container.html(html);
    
    // 绑定事件
    component.bindEvents($container, this.dependencies);
    
    // 保存实例
    this.activeInstances.set(id, {
      container: $container,
      component
    });
  }

  /**
   * 销毁组件实例
   * @param {string} id
   */
  destroyInstance(id) {
    const instance = this.activeInstances.get(id);
    if (!instance) return;
    
    instance.component.destroy(instance.container);
    this.activeInstances.delete(id);
  }

  /**
   * 切换标签页
   * @param {string} tabId
   */
  switchTab(tabId) {
    this.currentTab = tabId;
    eventBus.emit(EVENTS.UI_TAB_CHANGED, { tabId });
  }

  /**
   * 切换子标签页
   * @param {string} mainTab
   * @param {string} subTab
   */
  switchSubTab(mainTab, subTab) {
    this.currentSubTab[mainTab] = subTab;
    eventBus.emit(EVENTS.UI_SUBTAB_CHANGED, { mainTab, subTab });
  }

  /**
   * 注入基础样式
   * @private
   */
  _injectBaseStyles() {
    if (document.getElementById('yyt-ui-base-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'yyt-ui-base-styles';
    style.textContent = this._getBaseStyles();
    document.head.appendChild(style);
  }

  /**
   * 获取基础样式
   * @private
   */
  _getBaseStyles() {
    return `
      /* 基础变量 */
      :root {
        --yyt-accent: #7bb7ff;
        --yyt-accent-glow: rgba(123, 183, 255, 0.4);
        --yyt-success: #4ade80;
        --yyt-error: #f87171;
        --yyt-warning: #fbbf24;
        --yyt-surface: rgba(255, 255, 255, 0.03);
        --yyt-surface-hover: rgba(255, 255, 255, 0.06);
        --yyt-border: rgba(255, 255, 255, 0.08);
        --yyt-text: rgba(255, 255, 255, 0.95);
        --yyt-text-secondary: rgba(255, 255, 255, 0.7);
        --yyt-text-muted: rgba(255, 255, 255, 0.45);
        --yyt-radius: 12px;
        --yyt-radius-sm: 8px;
      }
      
      /* 通用组件样式 */
      .yyt-panel { ... }
      .yyt-btn { ... }
      .yyt-input { ... }
      /* ... 其他基础样式 */
    `;
  }

  /**
   * 订阅事件
   * @private
   */
  _subscribeEvents() {
    eventBus.on(EVENTS.PRESET_UPDATED, () => {
      // 重新渲染受影响的组件
    });
  }
}

// 单例
export const uiManager = new UIManager();
export { UIManager };
export default uiManager;
```

### 3.3 创建独立UI组件

**文件**: `modules/ui/components/api-preset-panel.js`

```javascript
/**
 * API预设面板组件
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';

export const ApiPresetPanel = {
  id: 'apiPresetPanel',
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const { dependencies } = props;
    const apiService = dependencies.apiService;
    const presetService = dependencies.presetService;
    
    const config = apiService.getApiConfig();
    const presets = presetService.getAllPresets();
    
    return `
      <div class="yyt-api-preset-panel">
        ${this._renderPresetSelector(presets)}
        ${this._renderApiConfig(config)}
        ${this._renderFooter()}
      </div>
    `;
  },
  
  /**
   * 绑定事件
   * @param {jQuery} $container
   * @param {Object} dependencies
   */
  bindEvents($container, dependencies) {
    const { apiService, presetService } = dependencies;
    
    // 保存配置
    $container.find('#yyt-save-api-config').on('click', () => {
      const config = this._getFormData($container);
      apiService.updateApiConfig(config);
      eventBus.emit(EVENTS.API_CONFIG_UPDATED, { config });
    });
    
    // 其他事件...
  },
  
  /**
   * 销毁组件
   * @param {jQuery} $container
   */
  destroy($container) {
    $container.find('*').off();
  },
  
  /**
   * 渲染预设选择器
   * @private
   */
  _renderPresetSelector(presets) {
    return `
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-bookmark"></i>
          <span>预设选择</span>
        </div>
        <!-- 预设选择器内容 -->
      </div>
    `;
  },
  
  /**
   * 渲染API配置
   * @private
   */
  _renderApiConfig(config) {
    return `
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>API配置</span>
        </div>
        <!-- API配置表单 -->
      </div>
    `;
  },
  
  /**
   * 渲染底部
   * @private
   */
  _renderFooter() {
    return `
      <div class="yyt-panel-footer">
        <button class="yyt-btn yyt-btn-primary" id="yyt-save-api-config">
          <i class="fa-solid fa-save"></i> 保存配置
        </button>
      </div>
    `;
  },
  
  /**
   * 获取表单数据
   * @private
   */
  _getFormData($container) {
    return {
      url: $container.find('#yyt-api-url').val(),
      apiKey: $container.find('#yyt-api-key').val(),
      model: $container.find('#yyt-model').val(),
      useMainApi: $container.find('#yyt-use-main-api').is(':checked'),
      max_tokens: parseInt($container.find('#yyt-max-tokens').val()) || 4096,
      temperature: parseFloat($container.find('#yyt-temperature').val()) ?? 0.7,
      top_p: parseFloat($container.find('#yyt-top-p').val()) ?? 0.9
    };
  }
};

export default ApiPresetPanel;
```

**文件**: `modules/ui/components/regex-extract-panel.js`

```javascript
/**
 * 正则提取面板组件
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';

export const RegexExtractPanel = {
  id: 'regexExtractPanel',
  
  render(props) {
    const { dependencies } = props;
    const regexService = dependencies.regexService;
    
    const rules = regexService.getTagRules();
    const blacklist = regexService.getContentBlacklist();
    
    return `
      <div class="yyt-regex-extract-panel">
        ${this._renderRulesEditor(rules)}
        ${this._renderTestSection()}
        ${this._renderFooter()}
      </div>
    `;
  },
  
  bindEvents($container, dependencies) {
    // 事件绑定逻辑
  },
  
  destroy($container) {
    $container.find('*').off();
  },
  
  // ... 其他私有方法
};

export default RegexExtractPanel;
```

### 3.4 注册所有组件

**文件**: `modules/ui/index.js`

```javascript
/**
 * UI模块入口
 */

import { uiManager } from './ui-manager.js';
import { ApiPresetPanel } from './components/api-preset-panel.js';
import { RegexExtractPanel } from './components/regex-extract-panel.js';
import { ToolManagePanel } from './components/tool-manage-panel.js';
import { BypassPanel } from './components/bypass-panel.js';
import { PromptEditorPanel } from './components/prompt-editor-panel.js';

// 注册组件
export function registerComponents() {
  uiManager.register(ApiPresetPanel.id, ApiPresetPanel);
  uiManager.register(RegexExtractPanel.id, RegexExtractPanel);
  uiManager.register(ToolManagePanel.id, ToolManagePanel);
  uiManager.register(BypassPanel.id, BypassPanel);
  uiManager.register(PromptEditorPanel.id, PromptEditorPanel);
}

export { uiManager };
export default uiManager;
```

---

## 阶段四：简化 index.js

### 4.1 重构后的 index.js

**文件**: `index.js`

```javascript
/**
 * YouYou Toolkit - 应用入口
 * @version 0.5.0
 */

// ============================================================
// 导入
// ============================================================

import { storage, eventBus, EVENTS } from './modules/core/index.js';
import { uiManager, registerComponents } from './modules/ui/index.js';
import { ApiService } from './modules/services/api-service.js';
import { PresetService } from './modules/services/preset-service.js';
import { RegexService } from './modules/services/regex-service.js';
import { ToolService } from './modules/services/tool-service.js';
import { BypassService } from './modules/services/bypass-service.js';

// ============================================================
// 应用类
// ============================================================

class YouYouToolkit {
  constructor() {
    this.version = '0.5.0';
    this.id = 'youyou_toolkit';
    this.services = {};
    this.initialized = false;
  }

  /**
   * 初始化应用
   */
  async init() {
    if (this.initialized) return;
    
    eventBus.emit(EVENTS.APP_INITIALIZING);
    
    // 1. 初始化服务
    this._initServices();
    
    // 2. 初始化UI
    this._initUI();
    
    // 3. 注册菜单
    this._registerMenu();
    
    this.initialized = true;
    eventBus.emit(EVENTS.APP_INITIALIZED);
    
    console.log(`[${this.id}] 初始化完成 v${this.version}`);
  }

  /**
   * 初始化服务
   * @private
   */
  _initServices() {
    this.services.storage = storage;
    this.services.eventBus = eventBus;
    
    this.services.apiService = new ApiService(this.services);
    this.services.presetService = new PresetService(this.services);
    this.services.regexService = new RegexService(this.services);
    this.services.toolService = new ToolService(this.services);
    this.services.bypassService = new BypassService(this.services);
  }

  /**
   * 初始化UI
   * @private
   */
  _initUI() {
    uiManager.init({ services: this.services });
    registerComponents();
  }

  /**
   * 注册菜单
   * @private
   */
  _registerMenu() {
    // 等待SillyTavern加载
    const checkAndRegister = () => {
      const $ = window.jQuery || window.parent?.jQuery;
      const $menu = $('#extensionsMenu', window.parent?.document || document);
      
      if (!$?.fn || !$menu.length) {
        setTimeout(checkAndRegister, 1000);
        return;
      }
      
      this._createMenuItem($, $menu);
    };
    
    checkAndRegister();
  }

  /**
   * 创建菜单项
   * @private
   */
  _createMenuItem($, $menu) {
    const menuItemHtml = `
      <div class="list-group-item flex-container flexGap5 interactable" 
           id="${this.id}-menu-item" title="打开 YouYou 工具箱">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles"></div>
        <span>YouYou 工具箱</span>
      </div>
    `;
    
    const $menuItem = $(menuItemHtml);
    $menuItem.on('click', () => this._openPopup());
    $menu.append($menuItem);
  }

  /**
   * 打开弹窗
   * @private
   */
  _openPopup() {
    eventBus.emit(EVENTS.UI_POPUP_OPENED);
    // 弹窗逻辑...
  }

  /**
   * 关闭弹窗
   */
  closePopup() {
    eventBus.emit(EVENTS.UI_POPUP_CLOSED);
  }

  // ============================================================
  // 公共API
  // ============================================================

  /**
   * 获取服务
   * @param {string} name
   */
  getService(name) {
    return this.services[name];
  }

  /**
   * 获取版本
   */
  getVersion() {
    return this.version;
  }
}

// ============================================================
// 创建并启动应用
// ============================================================

const app = new YouYouToolkit();

// 导出到全局
if (typeof window !== 'undefined') {
  window.YouYouToolkit = app;
  
  if (window.parent && window.parent !== window) {
    try {
      window.parent.YouYouToolkit = app;
    } catch (e) {}
  }
}

// 自动初始化
app.init();

// ES Module导出
export default app;
```

---

## 阶段五：统一样式管理

### 5.1 样式文件结构

```
styles/
├── base.css          # 基础变量和重置
├── components.css    # 组件样式
├── panels.css        # 面板样式
├── buttons.css       # 按钮样式
├── forms.css         # 表单样式
├── animations.css    # 动画效果
└── themes/
    ├── dark.css      # 暗色主题
    └── light.css     # 亮色主题
```

### 5.2 基础样式文件

**文件**: `styles/base.css`

```css
/**
 * YouYou Toolkit - 基础样式
 * CSS变量定义和基础重置
 */

:root {
  /* 主色调 */
  --yyt-accent: #7bb7ff;
  --yyt-accent-rgb: 123, 183, 255;
  --yyt-accent-glow: rgba(var(--yyt-accent-rgb), 0.4);
  --yyt-accent-soft: rgba(var(--yyt-accent-rgb), 0.15);
  
  /* 状态色 */
  --yyt-success: #4ade80;
  --yyt-error: #f87171;
  --yyt-warning: #fbbf24;
  --yyt-info: #60a5fa;
  
  /* 表面色 */
  --yyt-surface: rgba(255, 255, 255, 0.03);
  --yyt-surface-hover: rgba(255, 255, 255, 0.06);
  --yyt-surface-active: rgba(255, 255, 255, 0.08);
  
  /* 边框色 */
  --yyt-border: rgba(255, 255, 255, 0.08);
  --yyt-border-strong: rgba(255, 255, 255, 0.15);
  
  /* 文字色 */
  --yyt-text: rgba(255, 255, 255, 0.95);
  --yyt-text-secondary: rgba(255, 255, 255, 0.7);
  --yyt-text-muted: rgba(255, 255, 255, 0.45);
  
  /* 圆角 */
  --yyt-radius: 12px;
  --yyt-radius-sm: 8px;
  --yyt-radius-lg: 16px;
  
  /* 阴影 */
  --yyt-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  --yyt-shadow-glow: 0 0 20px var(--yyt-accent-glow);
  
  /* 过渡 */
  --yyt-transition-fast: 0.15s ease;
  --yyt-transition-normal: 0.25s ease;
  --yyt-transition-slow: 0.4s ease;
}

/* 全局重置 */
.yyt-container * {
  box-sizing: border-box;
}

.yyt-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  color: var(--yyt-text);
  line-height: 1.5;
}
```

### 5.3 样式注入器

**文件**: `modules/ui/style-injector.js`

```javascript
/**
 * 样式注入器
 */

const STYLE_FILES = [
  'styles/base.css',
  'styles/components.css',
  'styles/panels.css',
  'styles/buttons.css',
  'styles/forms.css',
  'styles/animations.css'
];

let injected = false;

/**
 * 注入所有样式
 */
export async function injectStyles() {
  if (injected) return;
  
  const results = await Promise.all(
    STYLE_FILES.map(file => loadStyle(file))
  );
  
  injected = true;
  console.log('[StyleInjector] 样式注入完成');
}

/**
 * 加载单个样式文件
 */
async function loadStyle(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) return null;
    
    const css = await response.text();
    const style = document.createElement('style');
    style.setAttribute('data-source', path);
    style.textContent = css;
    document.head.appendChild(style);
    
    return style;
  } catch (e) {
    console.warn(`[StyleInjector] 加载失败: ${path}`);
    return null;
  }
}

/**
 * 切换主题
 */
export function switchTheme(theme) {
  document.documentElement.setAttribute('data-yyt-theme', theme);
}

export default { injectStyles, switchTheme };
```

---

## 迁移检查清单

### 阶段一完成检查
- [ ] `modules/core/storage-service.js` 创建完成
- [ ] `modules/core/index.js` 创建完成
- [ ] `tool-manager.js` 改用 StorageService
- [ ] `bypass-prompts.js` 改用 StorageService
- [ ] `tool-registry.js` 改用 StorageService
- [ ] `window-manager.js` 改用 StorageService
- [ ] 存储测试通过

### 阶段二完成检查
- [ ] `modules/core/event-bus.js` 创建完成
- [ ] `preset-manager.js` 发送预设事件
- [ ] `api-connection.js` 发送API事件
- [ ] `tool-manager.js` 发送工具事件
- [ ] `regex-extractor.js` 发送提取事件
- [ ] 事件测试通过

### 阶段三完成检查
- [ ] `modules/ui/ui-manager.js` 创建完成
- [ ] `modules/ui/components/api-preset-panel.js` 创建完成
- [ ] `modules/ui/components/regex-extract-panel.js` 创建完成
- [ ] `modules/ui/components/tool-manage-panel.js` 创建完成
- [ ] `modules/ui/components/bypass-panel.js` 创建完成
- [ ] 所有组件注册完成
- [ ] UI渲染测试通过

### 阶段四完成检查
- [ ] `index.js` 简化完成
- [ ] 服务类创建完成
- [ ] 应用初始化流程正确
- [ ] 菜单注册正常
- [ ] 弹窗功能正常

### 阶段五完成检查
- [ ] 样式文件创建完成
- [ ] 样式注入器创建完成
- [ ] 主题切换功能正常
- [ ] 无样式冲突

---

## 风险控制

### 回滚方案
每个阶段完成后创建Git标签：
```bash
git tag -a "refactor-phase-1" -m "阶段一：统一存储层"
git tag -a "refactor-phase-2" -m "阶段二：事件总线"
git tag -a "refactor-phase-3" -m "阶段三：UI拆分"
git tag -a "refactor-phase-4" -m "阶段四：简化入口"
git tag -a "refactor-phase-5" -m "阶段五：样式统一"
```

### 数据迁移
提供迁移脚本确保旧数据兼容：
```javascript
// migration.js
function migrateOldData() {
  // 检查旧数据格式
  // 转换为新格式
  // 保存迁移后数据
}