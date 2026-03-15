/**
 * YouYou Toolkit - 破限词管理模块
 * @description 管理破限词预设的创建、编辑、删除和工具绑定
 * @version 1.0.0
 */

import { storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';

// ============================================================
// 存储键
// ============================================================

const BYPASS_PRESETS_KEY = 'bypass_presets';
const DEFAULT_BYPASS_KEY = 'default_bypass_preset';
const LEGACY_DEFAULT_BYPASS_KEY = 'current_bypass_preset';

// ============================================================
// 默认破限词预设
// ============================================================

const DEFAULT_BYPASS_PRESETS = {};
const LEGACY_SAMPLE_PRESET_NAMES = new Set([
  '标准破限词',
  '增强破限'
]);

// ============================================================
// 破限词管理器类
// ============================================================

class BypassManager {
  constructor() {
    /** 缓存 */
    this._cache = null;

    /** 是否已完成迁移 */
    this._migrated = false;
    
    /** 调试模式 */
    this.debugMode = false;
  }

  // ============================================================
  // 预设管理
  // ============================================================

  /**
   * 获取所有破限词预设
   * @returns {Object} 预设对象 { id: preset }
   */
  getAllPresets() {
    this._migrateLegacyData();

    if (this._cache) {
      return this._cache;
    }

    const saved = storage.get(BYPASS_PRESETS_KEY, {});
    this._cache = { ...DEFAULT_BYPASS_PRESETS, ...saved };
    return this._cache;
  }

  /**
   * 获取预设列表（数组形式）
   * @returns {Array} 预设列表
   */
  getPresetList() {
    const presets = this.getAllPresets();
    return Object.values(presets).sort((a, b) => 
      (b.updatedAt || 0) - (a.updatedAt || 0)
    );
  }

  /**
   * 获取单个预设
   * @param {string} presetId - 预设ID
   * @returns {Object|null} 预设对象
   */
  getPreset(presetId) {
    if (!presetId) return null;
    
    const presets = this.getAllPresets();
    return presets[presetId] || null;
  }

  /**
   * 检查预设是否存在
   * @param {string} presetId - 预设ID
   * @returns {boolean}
   */
  presetExists(presetId) {
    return !!this.getPreset(presetId);
  }

  /**
   * 创建新预设
   * @param {Object} presetData - 预设数据
   * @returns {Object} { success: boolean, message: string, preset?: Object }
   */
  createPreset(presetData) {
    const { id, name, description, messages } = presetData;

    if (!id || typeof id !== 'string' || !id.trim()) {
      return { success: false, message: '预设ID不能为空' };
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return { success: false, message: '预设名称不能为空' };
    }

    const trimmedId = id.trim();

    // 检查是否已存在
    if (this.presetExists(trimmedId)) {
      return { success: false, message: `预设 "${trimmedId}" 已存在` };
    }

    // 创建预设对象
    const preset = {
      id: trimmedId,
      name: name.trim(),
      description: description || '',
      enabled: true,
      messages: messages || [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    // 保存
    this._savePreset(trimmedId, preset);

    // 发送事件
    eventBus.emit(EVENTS.BYPASS_PRESET_CREATED, { presetId: trimmedId, preset });

    this._log(`预设已创建: ${trimmedId}`);
    return { success: true, message: `预设 "${name}" 创建成功`, preset };
  }

  /**
   * 更新预设
   * @param {string} presetId - 预设ID
   * @param {Object} updates - 更新内容
   * @returns {Object} { success: boolean, message: string, preset?: Object }
   */
  updatePreset(presetId, updates) {
    if (!presetId) {
      return { success: false, message: '预设ID不能为空' };
    }

    const preset = this.getPreset(presetId);
    if (!preset) {
      return { success: false, message: `预设 "${presetId}" 不存在` };
    }

    // 不允许修改ID
    if (updates.id && updates.id !== presetId) {
      return { success: false, message: '不允许修改预设ID' };
    }

    // 更新预设
    const updatedPreset = {
      ...preset,
      ...updates,
      id: presetId, // 保持原ID
      updatedAt: Date.now()
    };

    this._savePreset(presetId, updatedPreset);

    // 发送事件
    eventBus.emit(EVENTS.BYPASS_PRESET_UPDATED, { presetId, preset: updatedPreset });

    this._log(`预设已更新: ${presetId}`);
    return { success: true, message: `预设 "${preset.name}" 更新成功`, preset: updatedPreset };
  }

  /**
   * 删除预设
   * @param {string} presetId - 预设ID
   * @returns {Object} { success: boolean, message: string }
   */
  deletePreset(presetId) {
    if (!presetId) {
      return { success: false, message: '预设ID不能为空' };
    }

    // 不允许删除默认预设
    if (DEFAULT_BYPASS_PRESETS[presetId]) {
      return { success: false, message: '不允许删除默认预设' };
    }

    const preset = this.getPreset(presetId);
    if (!preset) {
      return { success: false, message: `预设 "${presetId}" 不存在` };
    }

    // 从存储中删除
    const saved = storage.get(BYPASS_PRESETS_KEY, {});
    delete saved[presetId];
    storage.set(BYPASS_PRESETS_KEY, saved);

    // 清除缓存
    this._cache = null;

    // 清除默认设置
    if (this.getDefaultPresetId() === presetId) {
      this.setDefaultPresetId(null);
    }

    // 发送事件
    eventBus.emit(EVENTS.BYPASS_PRESET_DELETED, { presetId });

    this._log(`预设已删除: ${presetId}`);
    return { success: true, message: `预设 "${preset.name}" 已删除` };
  }

  /**
   * 复制预设
   * @param {string} sourceId - 源预设ID
   * @param {string} newId - 新预设ID
   * @param {string} newName - 新预设名称
   * @returns {Object} { success: boolean, message: string, preset?: Object }
   */
  duplicatePreset(sourceId, newId, newName) {
    const source = this.getPreset(sourceId);
    if (!source) {
      return { success: false, message: `源预设 "${sourceId}" 不存在` };
    }

    if (!newId || !newId.trim()) {
      newId = `${sourceId}_copy_${Date.now()}`;
    }

    if (this.presetExists(newId)) {
      return { success: false, message: `预设 "${newId}" 已存在` };
    }

    const newPreset = {
      ...JSON.parse(JSON.stringify(source)),
      id: newId.trim(),
      name: newName || `${source.name} (副本)`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this._savePreset(newId.trim(), newPreset);

    eventBus.emit(EVENTS.BYPASS_PRESET_CREATED, { presetId: newId, preset: newPreset });

    return { success: true, message: `预设已复制为 "${newPreset.name}"`, preset: newPreset };
  }

  // ============================================================
  // 消息管理
  // ============================================================

  /**
   * 添加消息到预设
   * @param {string} presetId - 预设ID
   * @param {Object} message - 消息对象 { role, content, enabled }
   * @returns {Object} { success: boolean, message: string }
   */
  addMessage(presetId, message) {
    const preset = this.getPreset(presetId);
    if (!preset) {
      return { success: false, message: `预设 "${presetId}" 不存在` };
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      role: message.role || 'SYSTEM',
      content: message.content || '',
      enabled: message.enabled !== false,
      deletable: message.deletable !== false
    };

    const updatedMessages = [...(preset.messages || []), newMessage];
    
    return this.updatePreset(presetId, { messages: updatedMessages });
  }

  /**
   * 更新预设中的消息
   * @param {string} presetId - 预设ID
   * @param {string} messageId - 消息ID
   * @param {Object} updates - 更新内容
   * @returns {Object} { success: boolean, message: string }
   */
  updateMessage(presetId, messageId, updates) {
    const preset = this.getPreset(presetId);
    if (!preset) {
      return { success: false, message: `预设 "${presetId}" 不存在` };
    }

    const messages = preset.messages || [];
    const messageIndex = messages.findIndex(m => m.id === messageId);

    if (messageIndex === -1) {
      return { success: false, message: `消息 "${messageId}" 不存在` };
    }

    const updatedMessages = [...messages];
    updatedMessages[messageIndex] = {
      ...updatedMessages[messageIndex],
      ...updates
    };

    return this.updatePreset(presetId, { messages: updatedMessages });
  }

  /**
   * 删除预设中的消息
   * @param {string} presetId - 预设ID
   * @param {string} messageId - 消息ID
   * @returns {Object} { success: boolean, message: string }
   */
  deleteMessage(presetId, messageId) {
    const preset = this.getPreset(presetId);
    if (!preset) {
      return { success: false, message: `预设 "${presetId}" 不存在` };
    }

    const messages = preset.messages || [];
    const message = messages.find(m => m.id === messageId);

    if (!message) {
      return { success: false, message: `消息 "${messageId}" 不存在` };
    }

    if (message.deletable === false) {
      return { success: false, message: '该消息不可删除' };
    }

    const updatedMessages = messages.filter(m => m.id !== messageId);
    return this.updatePreset(presetId, { messages: updatedMessages });
  }

  /**
   * 获取预设的启用消息
   * @param {string} presetId - 预设ID
   * @returns {Array} 启用的消息数组
   */
  getEnabledMessages(presetId) {
    const preset = this.getPreset(presetId);
    if (!preset || !preset.enabled) {
      return [];
    }

    return (preset.messages || [])
      .filter(msg => msg.enabled !== false);
  }

  // ============================================================
  // 默认预设管理
  // ============================================================

  /**
   * 获取默认预设ID
   * @returns {string|null}
   */
  getDefaultPresetId() {
    this._migrateLegacyData();

    const presetId = storage.get(DEFAULT_BYPASS_KEY, null);
    if (presetId === 'undefined' || presetId === 'null' || presetId === '') {
      storage.remove(DEFAULT_BYPASS_KEY);
      return null;
    }

    return presetId;
  }

  /**
   * 设置默认预设
   * @param {string|null} presetId - 预设ID，null表示清除默认
   * @returns {boolean}
   */
  setDefaultPresetId(presetId) {
    if (presetId && !this.presetExists(presetId)) {
      return false;
    }

    storage.set(DEFAULT_BYPASS_KEY, presetId);
    
    eventBus.emit(EVENTS.BYPASS_PRESET_ACTIVATED, { presetId });
    
    this._log(`默认预设已设置: ${presetId}`);
    return true;
  }

  /**
   * 获取默认预设
   * @returns {Object|null}
   */
  getDefaultPreset() {
    const presetId = this.getDefaultPresetId();
    return presetId ? this.getPreset(presetId) : null;
  }

  // ============================================================
  // 导入导出
  // ============================================================

  /**
   * 导出预设
   * @param {string} presetId - 预设ID，不提供则导出所有
   * @returns {string} JSON字符串
   */
  exportPresets(presetId = null) {
    if (presetId) {
      const preset = this.getPreset(presetId);
      if (!preset) {
        throw new Error(`预设 "${presetId}" 不存在`);
      }
      return JSON.stringify(preset, null, 2);
    }

    const presets = this.getAllPresets();
    return JSON.stringify({
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      presets: Object.values(presets)
    }, null, 2);
  }

  /**
   * 导入预设
   * @param {string} jsonString - JSON字符串
   * @param {Object} options - 导入选项
   * @returns {Object} { success: boolean, message: string, imported: number }
   */
  importPresets(jsonString, options = {}) {
    const { overwrite = false } = options;

    let data;
    try {
      data = JSON.parse(jsonString);
    } catch (e) {
      return { success: false, message: 'JSON解析失败', imported: 0 };
    }

    // 支持单个预设或预设数组
    const presetsToImport = Array.isArray(data) ? data : 
      (data.presets ? data.presets : [data]);

    if (presetsToImport.length === 0) {
      return { success: false, message: '没有找到有效的预设数据', imported: 0 };
    }

    const saved = storage.get(BYPASS_PRESETS_KEY, {});
    let imported = 0;

    for (const preset of presetsToImport) {
      if (!preset.id || typeof preset.id !== 'string') continue;
      if (!preset.name) continue;

      // 跳过默认预设
      if (DEFAULT_BYPASS_PRESETS[preset.id] && !overwrite) continue;

      // 如果不覆盖且已存在，跳过
      if (!overwrite && saved[preset.id]) continue;

      saved[preset.id] = {
        ...preset,
        updatedAt: Date.now()
      };
      imported++;
    }

    if (imported > 0) {
      storage.set(BYPASS_PRESETS_KEY, saved);
      this._cache = null; // 清除缓存
    }

    return {
      success: true,
      message: `成功导入 ${imported} 个预设`,
      imported
    };
  }

  // ============================================================
  // 工具绑定辅助
  // ============================================================

  /**
   * 获取工具绑定的破限词预设
   * @param {Object} toolConfig - 工具配置
   * @returns {Object|null} 预设对象或null
   */
  getToolBypassPreset(toolConfig) {
    if (!toolConfig?.bypass?.enabled) {
      return null;
    }

    const presetId = toolConfig?.bypass?.presetId;
    if (!presetId) {
      // 如果没有指定预设，使用默认预设
      return this.getDefaultPreset();
    }

    return this.getPreset(presetId);
  }

  /**
   * 构建工具的破限词消息
   * @param {Object} toolConfig - 工具配置
   * @returns {Array} 消息数组
   */
  buildBypassMessages(toolConfig) {
    const preset = this.getToolBypassPreset(toolConfig);
    if (!preset) {
      return [];
    }

    return this.getEnabledMessages(preset.id);
  }

  // ============================================================
  // 私有方法
  // ============================================================

  /**
   * 保存预设
   * @private
   */
  _savePreset(presetId, preset) {
    const saved = storage.get(BYPASS_PRESETS_KEY, {});
    saved[presetId] = preset;
    storage.set(BYPASS_PRESETS_KEY, saved);
    this._cache = null; // 清除缓存
  }

  /**
   * 迁移旧版破限词存储数据
   * @private
   */
  _migrateLegacyData() {
    if (this._migrated) {
      return;
    }

    const rawSaved = storage.get(BYPASS_PRESETS_KEY, {});
    const normalizedPresets = {};
    let changed = false;

    const entries = Array.isArray(rawSaved)
      ? rawSaved.map((preset, index) => [preset?.id || preset?.name || `legacy_${index}`, preset])
      : Object.entries(rawSaved || {});

    for (const [key, value] of entries) {
      const normalized = this._normalizePreset(key, value, normalizedPresets);
      if (!normalized) {
        changed = true;
        continue;
      }

      normalizedPresets[normalized.id] = normalized;

      if (!rawSaved?.[normalized.id] || rawSaved?.[normalized.id]?.id !== normalized.id) {
        changed = true;
      }
    }

    if (changed) {
      storage.set(BYPASS_PRESETS_KEY, normalizedPresets);
    }

    this._migrateDefaultPreset(normalizedPresets);
    this._cache = null;
    this._migrated = true;
  }

  /**
   * 规范化旧预设
   * @private
   */
  _normalizePreset(key, preset, existingPresets = {}) {
    if (!preset || typeof preset !== 'object') {
      return null;
    }

    let name = typeof preset.name === 'string' ? preset.name.trim() : '';
    let id = typeof preset.id === 'string' ? preset.id.trim() : '';
    const normalizedKey = typeof key === 'string' ? key.trim() : '';

    if (!name && normalizedKey && normalizedKey !== 'undefined' && normalizedKey !== 'null') {
      name = normalizedKey;
    }

    const shouldDropLegacySample = this._isLegacySamplePreset(name, id);
    if (shouldDropLegacySample) {
      return null;
    }

    if (!id && normalizedKey && normalizedKey !== 'undefined' && normalizedKey !== 'null') {
      id = normalizedKey;
    }

    if (!id && name && name !== 'undefined' && name !== 'null') {
      id = this._generatePresetId(name, existingPresets);
    }

    if (!name || !id || id === 'undefined' || name === 'undefined') {
      return null;
    }

    const messages = Array.isArray(preset.messages)
      ? preset.messages
          .filter(msg => msg && typeof msg === 'object')
          .map((msg, index) => ({
            id: typeof msg.id === 'string' && msg.id.trim() ? msg.id.trim() : `${id}_msg_${index + 1}`,
            role: msg.role || 'SYSTEM',
            content: typeof msg.content === 'string' ? msg.content : '',
            enabled: msg.enabled !== false,
            deletable: msg.deletable !== false
          }))
      : [];

    return {
      ...preset,
      id,
      name,
      description: typeof preset.description === 'string' ? preset.description : '',
      enabled: preset.enabled !== false,
      messages,
      createdAt: preset.createdAt || Date.now(),
      updatedAt: preset.updatedAt || Date.now()
    };
  }

  /**
   * 迁移默认预设ID
   * @private
   */
  _migrateDefaultPreset(presets) {
    const defaultPresetId = storage.get(DEFAULT_BYPASS_KEY, null);
    const legacyDefaultPresetId = storage.get(LEGACY_DEFAULT_BYPASS_KEY, null);
    let effectiveId = defaultPresetId ?? legacyDefaultPresetId;

    if (effectiveId === 'undefined' || effectiveId === 'null' || effectiveId === '') {
      effectiveId = null;
    }

    if (effectiveId && !presets[effectiveId]) {
      const matchedPreset = Object.values(presets).find(preset => preset.name === effectiveId);
      effectiveId = matchedPreset?.id || null;
    }

    if (effectiveId) {
      storage.set(DEFAULT_BYPASS_KEY, effectiveId);
    } else {
      storage.remove(DEFAULT_BYPASS_KEY);
    }

    if (storage.has(LEGACY_DEFAULT_BYPASS_KEY)) {
      storage.remove(LEGACY_DEFAULT_BYPASS_KEY);
    }
  }

  /**
   * 判断是否为旧版样例预设
   * @private
   */
  _isLegacySamplePreset(name, id = '') {
    if (!name) {
      return false;
    }

    if (id === 'standard' || id === 'enhanced' || id === 'jailbreak') {
      return true;
    }

    if (LEGACY_SAMPLE_PRESET_NAMES.has(name)) {
      return true;
    }

    return /^增强破限（副本）(?:\s*\(\d+\))?$/.test(name);
  }

  /**
   * 生成预设ID
   * @private
   */
  _generatePresetId(name, existingPresets = {}) {
    const baseId = String(name)
      .trim()
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '_')
      .replace(/^_+|_+$/g, '') || `bypass_${Date.now()}`;

    let candidateId = baseId;
    let counter = 1;

    while (existingPresets[candidateId]) {
      candidateId = `${baseId}_${counter++}`;
    }

    return candidateId;
  }

  /**
   * 日志输出
   * @private
   */
  _log(...args) {
    if (this.debugMode) {
      console.log('[BypassManager]', ...args);
    }
  }
}

// ============================================================
// 单例实例
// ============================================================

export const bypassManager = new BypassManager();
export { DEFAULT_BYPASS_PRESETS, BypassManager };

// 导出便捷函数
export const getAllPresets = () => bypassManager.getAllPresets();
export const getPresetList = () => bypassManager.getPresetList();
export const getPreset = (presetId) => bypassManager.getPreset(presetId);
export const createPreset = (presetData) => bypassManager.createPreset(presetData);
export const updatePreset = (presetId, updates) => bypassManager.updatePreset(presetId, updates);
export const deletePreset = (presetId) => bypassManager.deletePreset(presetId);
export const duplicatePreset = (sourceId, newId, newName) => bypassManager.duplicatePreset(sourceId, newId, newName);
export const getDefaultPresetId = () => bypassManager.getDefaultPresetId();
export const setDefaultPresetId = (presetId) => bypassManager.setDefaultPresetId(presetId);
export const getEnabledMessages = (presetId) => bypassManager.getEnabledMessages(presetId);
export const addMessage = (presetId, message) => bypassManager.addMessage(presetId, message);
export const updateMessage = (presetId, messageId, updates) => bypassManager.updateMessage(presetId, messageId, updates);
export const deleteMessage = (presetId, messageId) => bypassManager.deleteMessage(presetId, messageId);
export const exportPresets = (presetId) => bypassManager.exportPresets(presetId);
export const importPresets = (jsonString, options) => bypassManager.importPresets(jsonString, options);
export const buildBypassMessages = (toolConfig) => bypassManager.buildBypassMessages(toolConfig);

export default bypassManager;
