/**
 * YouYou Toolkit - 破限词管理模块
 * @description 管理破限词预设的创建、编辑、删除和工具绑定
 * @version 1.0.0
 */

import { storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';
import { logger } from './core/logger-service.js';

const log = logger.createScope('BypassManager');

// ============================================================
// 存储键
// ============================================================

const BYPASS_PRESETS_KEY = 'bypass_presets';
const DEFAULT_BYPASS_KEY = 'default_bypass_preset';
const LEGACY_DEFAULT_BYPASS_KEY = 'current_bypass_preset';

// ============================================================
// 默认破限词预设
// ============================================================

const TABLE_FILL_PRESET_MESSAGES = Object.freeze([
  {
    id: 'table_fill_default_msg_1',
    role: 'SYSTEM',
    content: '你是一个助手，负责听从用户的指令完成你的工作',
    enabled: true,
    deletable: true
  },
  {
    id: 'table_fill_default_msg_2',
    role: 'assistant',
    content: '收到，我将充分描绘用户的意志，毫不偷懒，并且我一定会遵照用户的要求',
    enabled: true,
    deletable: true
  },
  {
    id: 'table_fill_default_msg_3',
    role: 'USER',
    content: '以下是你可能需要用到的背景设定，注意你只需要其中关于剧情以及人设方面的数据，不需要思考里边除此之外的任何格式或者思维链方面的要求：\n<背景设定>\n{{characterCard}}\n{{toolWorldbookContent}}\n</背景设定>\n\n<正文数据>\n{{rawRecentMessagesText}}\n</正文数据>\n\n',
    enabled: true,
    deletable: true
  },
  {
    id: 'table_fill_default_msg_4',
    role: 'assistant',
    content: '收到，我将按照要求认真阅读背景设定，并将其中关于剧情以及人设方面的数据运用到后续思考当中。',
    enabled: true,
    deletable: true
  },
  {
    id: 'table_fill_default_msg_5',
    role: 'USER',
    content: '你是【填表AI】，负责根据用户提供的资料对表格数据执行增删改操作。\n\n## 核心任务\n依据三类资料来源执行表格编辑：\n- <背景设定>：故事及人物设定\n- <正文数据>：上轮发生的故事\n- <当前表格数据>：之前的数据作为填表基础\n\n## 输出格式（严格执行）\n只返回 JSON，不要附加解释、标题或 Markdown。JSON 结构必须是：\n{\n  "tables": []\n}\n\n## 关键规则\n1. 必须逐表阅读每个表格的 note 部分，严格遵守其中的约束。\n2. note 的约束优先级最高，高于通用填表经验。\n3. 若 note 要求禁止修改、格式固定或编码规则，必须严格执行。\n4. 除了 note 外，可能还存在某些存放特殊填表规则的表格，填表前需先进行阅读，并严格遵守其中的约束。\n5. 没有依据时保留原值，不要臆造未出现的信息。\n\n现在开始按此格式执行填表任务。',
    enabled: true,
    deletable: false,
    mainSlot: 'A',
    isMain: true
  },
  {
    id: 'table_fill_default_msg_6',
    role: 'assistant',
    content: '收到命令，我将严格按照用户要求执行填表任务，并仅输出符合格式约束的内容。',
    enabled: true,
    deletable: true
  },
  {
    id: 'table_fill_default_msg_7',
    role: 'USER',
    content: '现在请按照我的要求立刻开始你的工作\n========================\n\n以下是当前的<当前表格数据>，记录有本轮之前的数据，你的一切操作指令都必须在这个<当前表格数据>的基础与指导上进行：\n<当前表格数据>\n{{toolContentMacro}}\n</当前表格数据>\n\n{{userMessage}}',
    enabled: true,
    deletable: false,
    mainSlot: 'B',
    isMain2: true
  },
  {
    id: 'table_fill_default_msg_8',
    role: 'assistant',
    content: '收到指令，我将一步一步开始思考，并完成填表，首先我要分析当前轮次的剧情变化。',
    enabled: true,
    deletable: true
  }
]);

const DEFAULT_BYPASS_PRESETS = {
  table_workbench_fill_default: {
    id: 'table_workbench_fill_default',
    name: '默认填表 Ai 指令预设',
    description: '用于填表工作台的内置 Ai 指令预设，可复制后按需编辑。',
    enabled: true,
    messages: TABLE_FILL_PRESET_MESSAGES.map(message => ({ ...message })),
    createdAt: 0,
    updatedAt: 0
  }
};
const LEGACY_SAMPLE_PRESET_NAMES = new Set([
  '标准破限词',
  '增强破限'
]);

function normalizeImportedRole(role) {
  const normalized = String(role || '').trim().toLowerCase();
  if (normalized === 'system') return 'SYSTEM';
  if (normalized === 'assistant' || normalized === 'ai') return 'assistant';
  return 'USER';
}

function looksLikePromptGroupMessage(item) {
  return item
    && typeof item === 'object'
    && typeof item.content === 'string'
    && !item.name
    && !Array.isArray(item.messages);
}

function normalizeImportedContent(content) {
  return String(content || '')
    .replace(/\$0/g, '{{toolContentMacro}}')
    .replace(/\$1/g, '{{rawRecentMessagesText}}')
    .replace(/\$4/g, '{{toolWorldbookContent}}')
    .replace(/\$8/g, '{{userMessage}}')
    .replace(/\$C/g, '{{characterCard}}');
}

function normalizeImportedMessage(message, index, presetId) {
  const mainSlot = message.mainSlot || (message.isMain ? 'A' : (message.isMain2 ? 'B' : ''));
  return {
    id: typeof message.id === 'string' && message.id.trim() ? message.id.trim() : `${presetId}_msg_${index + 1}`,
    role: normalizeImportedRole(message.role),
    content: normalizeImportedContent(message.content),
    enabled: message.enabled !== false,
    deletable: message.deletable !== false,
    ...(mainSlot ? { mainSlot, isMain: mainSlot === 'A', isMain2: mainSlot === 'B' } : {})
  };
}

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
      role: normalizeImportedRole(message.role || 'SYSTEM'),
      content: message.content || '',
      enabled: message.enabled !== false,
      deletable: message.deletable !== false,
      ...(message.mainSlot ? { mainSlot: message.mainSlot } : {})
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
    const { overwrite = false, name = '' } = options;

    let data;
    try {
      data = JSON.parse(jsonString);
    } catch (e) {
      return { success: false, message: 'JSON解析失败', imported: 0 };
    }

    const saved = storage.get(BYPASS_PRESETS_KEY, {});
    const rawPromptGroup = Array.isArray(data) && data.every(looksLikePromptGroupMessage);
    const presetsToImport = rawPromptGroup
      ? [{
        id: this._generatePresetId(name || '导入填表指令预设', saved),
        name: name || '导入填表指令预设',
        description: '由外部填表提示词组导入。',
        enabled: true,
        messages: data
      }]
      : (Array.isArray(data) ? data : (data.presets ? data.presets : [data]));

    if (presetsToImport.length === 0) {
      return { success: false, message: '没有找到有效的预设数据', imported: 0 };
    }

    let imported = 0;

    for (const preset of presetsToImport) {
      const normalized = this._normalizePreset(preset?.id, preset, saved);
      if (!normalized) continue;

      // 跳过默认预设
      if (DEFAULT_BYPASS_PRESETS[normalized.id] && !overwrite) continue;

      // 如果不覆盖且已存在，跳过
      if (!overwrite && saved[normalized.id]) continue;

      saved[normalized.id] = {
        ...normalized,
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
          .map((msg, index) => normalizeImportedMessage(msg, index, id))
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
    log.debug(args[0], args.length > 1 ? args.slice(1) : undefined);
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
