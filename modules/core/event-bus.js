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
  TOOL_EXECUTION_STARTED: 'tool:executionStarted',
  TOOL_EXECUTION_FAILED: 'tool:executionFailed',
  TOOL_TRIGGER_INITIALIZED: 'tool:triggerInitialized',
  
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