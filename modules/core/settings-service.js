/**
 * YouYou Toolkit - 设置服务
 * @description 全局配置管理，包括执行器、调试和UI设置
 * @version 1.0.0
 */

import { storage } from './storage-service.js';
import { eventBus, EVENTS } from './event-bus.js';

// ============================================================
// 默认设置
// ============================================================

const DEFAULT_SETTINGS = {
  executor: {
    maxConcurrent: 3,
    maxRetries: 2,
    retryDelayMs: 5000,
    requestTimeoutMs: 90000,
    queueStrategy: 'fifo'
  },
  automation: {
    enabled: false,
    settleMs: 1200,
    cooldownMs: 5000,
    maxConcurrentSlots: 1
  },
  debug: {
    enableDebugLog: false,
    saveExecutionHistory: true,
    showRuntimeBadge: true
  },
  ui: {
    compactMode: false,
    animationEnabled: true,
    theme: 'dark-blue'
  }
};

const SETTINGS_STORAGE_KEY = 'settings_v2';

// ============================================================
// 设置服务类
// ============================================================

class SettingsService {
  constructor() {
    this._cache = null;
  }

  /**
   * 获取所有设置
   * @returns {Object}
   */
  getSettings() {
    if (this._cache) {
      return this._cache;
    }

    const saved = storage.get(SETTINGS_STORAGE_KEY, {});
    this._cache = this._mergeWithDefaults(saved);
    return this._cache;
  }

  /**
   * 保存设置
   * @param {Object} settings - 完整设置对象
   */
  saveSettings(settings) {
    this._cache = this._mergeWithDefaults(settings);
    storage.set(SETTINGS_STORAGE_KEY, this._cache);
    eventBus.emit(EVENTS.SETTINGS_UPDATED, { settings: this._cache });
  }

  /**
   * 更新部分设置
   * @param {Object} partial - 部分设置
   */
  updateSettings(partial) {
    const current = this.getSettings();
    const updated = this._deepMerge(current, partial);
    this.saveSettings(updated);
  }

  /**
   * 获取执行器设置
   * @returns {Object}
   */
  getExecutorSettings() {
    return this.getSettings().executor;
  }

  /**
   * 更新执行器设置
   * @param {Object} executorSettings
   */
  updateExecutorSettings(executorSettings) {
    this.updateSettings({ executor: executorSettings });
  }

  /**
   * 获取自动化设置
   * @returns {Object}
   */
  getAutomationSettings() {
    return this.getSettings().automation;
  }

  /**
   * 更新自动化设置
   * @param {Object} automationSettings
   */
  updateAutomationSettings(automationSettings) {
    this.updateSettings({ automation: automationSettings });
  }

  /**
   * 获取调试设置
   * @returns {Object}
   */
  getDebugSettings() {
    return this.getSettings().debug;
  }

  /**
   * 更新调试设置
   * @param {Object} debugSettings
   */
  updateDebugSettings(debugSettings) {
    this.updateSettings({ debug: debugSettings });
  }

  /**
   * 获取UI设置
   * @returns {Object}
   */
  getUiSettings() {
    return this.getSettings().ui;
  }

  /**
   * 更新UI设置
   * @param {Object} uiSettings
   */
  updateUiSettings(uiSettings) {
    this.updateSettings({ ui: uiSettings });
  }

  /**
   * 重置为默认设置
   */
  resetSettings() {
    this._cache = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    storage.set(SETTINGS_STORAGE_KEY, this._cache);
    eventBus.emit(EVENTS.SETTINGS_UPDATED, { settings: this._cache, reset: true });
  }

  /**
   * 获取单个设置值
   * @param {string} path - 点分隔的路径，如 'executor.maxConcurrent'
   * @param {*} defaultValue
   * @returns {*}
   */
  get(path, defaultValue = null) {
    const settings = this.getSettings();
    const keys = path.split('.');
    let value = settings;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return defaultValue;
      }
    }

    return value;
  }

  /**
   * 设置单个值
   * @param {string} path - 点分隔的路径
   * @param {*} value
   */
  set(path, value) {
    const settings = JSON.parse(JSON.stringify(this.getSettings()));
    const keys = path.split('.');
    let target = settings;

    for (let i = 0; i < keys.length - 1; i += 1) {
      const key = keys[i];
      if (!(key in target)) {
        target[key] = {};
      }
      target = target[key];
    }

    target[keys[keys.length - 1]] = value;
    this.saveSettings(settings);
  }

  // ============================================================
  // 私有方法
  // ============================================================

  /**
   * 与默认值合并
   * @private
   */
  _mergeWithDefaults(saved) {
    return this._deepMerge(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)), saved);
  }

  /**
   * 深度合并对象
   * @private
   */
  _deepMerge(target, source) {
    const result = { ...target };

    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this._deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }
}

// ============================================================
// 单例实例
// ============================================================

export const settingsService = new SettingsService();
export { DEFAULT_SETTINGS, SettingsService };
export default settingsService;
