/**
 * YouYou Toolkit - 上下文注入服务
 * @description 管理工具输出如何进入上下文，支持按聊天隔离存储
 * @version 1.0.0
 */

import { storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';

// ============================================================
// 存储键
// ============================================================

const CONTEXT_INJECTION_KEY = 'context_injection';

// ============================================================
// 默认配置
// ============================================================

const DEFAULT_INJECTION_OPTIONS = {
  target: 'context',    // 注入目标：context, worldbook, message
  scope: 'chat',        // 作用域：chat, global, character
  overwrite: true,      // 是否覆盖现有内容
  enabled: true,
  worldbookTarget: '__character__',
  comment: '',
  position: 'at_depth_as_system',
  depth: 4,
  order: 10000
};

// ============================================================
// 上下文注入器类
// ============================================================

class ContextInjector {
  constructor() {
    /** 内存缓存 */
    this._cache = new Map();
    
    /** 调试模式 */
    this.debugMode = false;
  }

  // ============================================================
  // 核心注入方法
  // ============================================================

  /**
   * 注入工具上下文
   * @param {string} toolId - 工具ID
   * @param {string} content - 要注入的内容
   * @param {Object} options - 注入选项
   * @returns {boolean} 是否成功
   */
  async inject(toolId, content, options = {}) {
    if (!toolId || content === undefined || content === null) {
      this._log('注入失败: 参数无效');
      return false;
    }

    const mergedOptions = { ...DEFAULT_INJECTION_OPTIONS, ...options };
    const chatId = options.chatId || this._getCurrentChatId();
    
    if (!chatId) {
      this._log('注入失败: 无法获取聊天ID');
      return false;
    }

    // 获取或创建聊天上下文存储
    const storageKey = this._getStorageKey(chatId);
    let chatContexts = this._getChatContexts(chatId);
    
    // 创建注入条目
    const injectionEntry = {
      toolId,
      content: String(content),
      updatedAt: Date.now(),
      sourceMessageId: options.sourceMessageId || null,
      options: mergedOptions
    };

    // 根据overwrite策略处理
    if (mergedOptions.overwrite || !chatContexts[toolId]) {
      chatContexts[toolId] = injectionEntry;
    } else {
      // 追加模式
      chatContexts[toolId] = {
        ...injectionEntry,
        content: (chatContexts[toolId]?.content || '') + '\n\n' + content
      };
    }

    // 保存
    this._saveChatContexts(chatId, chatContexts);
    
    // 发送事件
    eventBus.emit(EVENTS.TOOL_CONTEXT_INJECTED, {
      toolId,
      chatId,
      content: injectionEntry.content,
      options: mergedOptions
    });

    if (mergedOptions.enabled !== false && mergedOptions.target === 'worldbook') {
      const synced = await this._syncWorldbookEntry(toolId, injectionEntry.content, mergedOptions);
      if (!synced) {
        this._log(`世界书注入失败: ${toolId}`);
        return false;
      }
    }
    
    this._log(`注入成功: ${toolId} -> ${chatId}`);
    return true;
  }

  /**
   * 获取可用世界书列表
   * @returns {Promise<Array<{value: string, label: string, kind: string, isPrimary?: boolean}>>}
   */
  async getAvailableLorebooks() {
    const helper = this._getTavernHelper();
    const result = [];
    const seen = new Set();

    result.push({
      value: '__character__',
      label: '当前角色绑定世界书',
      kind: 'character',
      isPrimary: true
    });
    seen.add('__character__');

    if (!helper) {
      return result;
    }

    try {
      let primary = '';
      if (typeof helper.getCurrentCharPrimaryLorebook === 'function') {
        primary = await helper.getCurrentCharPrimaryLorebook();
      } else if (typeof helper.getCharLorebooks === 'function') {
        const lorebooks = await helper.getCharLorebooks({ type: 'all' });
        primary = lorebooks?.primary || '';
      }

      if (primary && !seen.has(primary)) {
        result.push({
          value: primary,
          label: `${primary} [角色主世界书]`,
          kind: 'lorebook',
          isPrimary: true
        });
        seen.add(primary);
      }
    } catch (error) {
      this._log('获取角色主世界书失败', error);
    }

    try {
      if (typeof helper.getLorebooks === 'function') {
        const lorebooks = await Promise.resolve(helper.getLorebooks());
        const names = Array.isArray(lorebooks) ? lorebooks : [];
        names.forEach((name) => {
          if (!name || seen.has(name)) return;
          result.push({
            value: name,
            label: name,
            kind: 'lorebook'
          });
          seen.add(name);
        });
      }
    } catch (error) {
      this._log('获取世界书列表失败', error);
    }

    return result;
  }

  /**
   * 获取聚合的注入上下文
   * @param {string} chatId - 聊天ID（可选，默认当前聊天）
   * @returns {string} 聚合后的上下文文本
   */
  getAggregatedContext(chatId) {
    const actualChatId = chatId || this._getCurrentChatId();
    if (!actualChatId) return '';

    const chatContexts = this._getChatContexts(actualChatId);
    const entries = Object.entries(chatContexts);
    
    if (entries.length === 0) return '';

    // 构建聚合输出
    const lines = ['[工具上下文注入]', ''];
    
    for (const [toolId, entry] of entries) {
      lines.push(`[${toolId}]`);
      lines.push(entry.content || '');
      lines.push('');
    }

    return lines.join('\n');
  }

  /**
   * 获取单个工具的注入上下文
   * @param {string} chatId - 聊天ID
   * @param {string} toolId - 工具ID
   * @returns {Object|null} 注入条目
   */
  getToolContext(chatId, toolId) {
    const actualChatId = chatId || this._getCurrentChatId();
    if (!actualChatId || !toolId) return null;

    const chatContexts = this._getChatContexts(actualChatId);
    return chatContexts[toolId] || null;
  }

  /**
   * 获取聊天下所有工具上下文
   * @param {string} chatId - 聊天ID
   * @returns {Object} 工具上下文对象
   */
  getAllToolContexts(chatId) {
    const actualChatId = chatId || this._getCurrentChatId();
    if (!actualChatId) return {};
    
    return this._getChatContexts(actualChatId);
  }

  // ============================================================
  // 清除方法
  // ============================================================

  /**
   * 清除单个工具的上下文
   * @param {string} chatId - 聊天ID
   * @param {string} toolId - 工具ID
   * @returns {boolean} 是否成功
   */
  clearToolContext(chatId, toolId) {
    const actualChatId = chatId || this._getCurrentChatId();
    if (!actualChatId || !toolId) return false;

    const chatContexts = this._getChatContexts(actualChatId);
    
    if (chatContexts[toolId]) {
      delete chatContexts[toolId];
      this._saveChatContexts(actualChatId, chatContexts);
      
      eventBus.emit(EVENTS.TOOL_CONTEXT_CLEARED, { chatId: actualChatId, toolId });
      this._log(`清除工具上下文: ${toolId}`);
      return true;
    }

    return false;
  }

  /**
   * 清除聊天的所有工具上下文
   * @param {string} chatId - 聊天ID
   * @returns {boolean} 是否成功
   */
  clearAllContext(chatId) {
    const actualChatId = chatId || this._getCurrentChatId();
    if (!actualChatId) return false;

    const allContexts = this._getAllContexts();
    delete allContexts[actualChatId];
    
    storage.set(CONTEXT_INJECTION_KEY, allContexts);
    this._cache.delete(actualChatId);
    
    eventBus.emit(EVENTS.TOOL_CONTEXT_CLEARED, { chatId: actualChatId, allTools: true });
    this._log(`清除聊天所有上下文: ${actualChatId}`);
    return true;
  }

  /**
   * 清除所有聊天的所有上下文
   */
  clearAllChatsContexts() {
    storage.remove(CONTEXT_INJECTION_KEY);
    this._cache.clear();
    
    this._log('清除所有上下文');
  }

  // ============================================================
  // 状态查询
  // ============================================================

  /**
   * 检查工具是否有注入上下文
   * @param {string} chatId - 聊天ID
   * @param {string} toolId - 工具ID
   * @returns {boolean}
   */
  hasToolContext(chatId, toolId) {
    const actualChatId = chatId || this._getCurrentChatId();
    if (!actualChatId || !toolId) return false;
    
    const chatContexts = this._getChatContexts(actualChatId);
    return !!chatContexts[toolId];
  }

  /**
   * 获取聊天的工具注入状态摘要
   * @param {string} chatId - 聊天ID
   * @returns {Object} 状态摘要
   */
  getContextSummary(chatId) {
    const actualChatId = chatId || this._getCurrentChatId();
    if (!actualChatId) return { tools: [], totalCount: 0 };

    const chatContexts = this._getChatContexts(actualChatId);
    const tools = Object.entries(chatContexts).map(([toolId, entry]) => ({
      toolId,
      updatedAt: entry.updatedAt,
      contentLength: entry.content?.length || 0
    }));

    return {
      chatId: actualChatId,
      tools,
      totalCount: tools.length
    };
  }

  // ============================================================
  // 导入导出
  // ============================================================

  /**
   * 导出聊天的上下文数据
   * @param {string} chatId - 聊天ID
   * @returns {Object} 上下文数据
   */
  exportContext(chatId) {
    const actualChatId = chatId || this._getCurrentChatId();
    if (!actualChatId) return {};

    return {
      chatId: actualChatId,
      contexts: this._getChatContexts(actualChatId),
      exportedAt: Date.now()
    };
  }

  /**
   * 导入上下文数据
   * @param {Object} data - 导出的数据
   * @param {Object} options - 导入选项
   * @returns {boolean} 是否成功
   */
  importContext(data, options = {}) {
    if (!data || !data.chatId || !data.contexts) {
      return false;
    }

    const { overwrite = false } = options;
    
    if (overwrite) {
      this._saveChatContexts(data.chatId, data.contexts);
    } else {
      const existing = this._getChatContexts(data.chatId);
      const merged = { ...existing, ...data.contexts };
      this._saveChatContexts(data.chatId, merged);
    }

    this._log(`导入上下文: ${data.chatId}`);
    return true;
  }

  // ============================================================
  // 私有方法
  // ============================================================

  /**
   * 获取存储键
   * @private
   */
  _getStorageKey(chatId) {
    return `${CONTEXT_INJECTION_KEY}:${chatId}`;
  }

  /**
   * 获取 TavernHelper
   * @private
   */
  _getTavernHelper() {
    try {
      const topWindow = (typeof window.parent !== 'undefined' && window.parent !== window)
        ? window.parent
        : window;
      return topWindow.TavernHelper || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * 规范化世界书位置
   * @private
   */
  _normalizeWorldbookPosition(position) {
    const normalized = String(position || '').trim().toLowerCase();
    if (normalized === 'before_char' || normalized === 'after_char' || normalized === 'at_depth_as_system') {
      return normalized;
    }
    return 'at_depth_as_system';
  }

  /**
   * 解析注入目标世界书名称
   * @private
   */
  async _resolveWorldbookTarget(target) {
    const helper = this._getTavernHelper();
    if (!helper) return '';

    if (!target || target === '__character__') {
      if (typeof helper.getCurrentCharPrimaryLorebook === 'function') {
        return await helper.getCurrentCharPrimaryLorebook();
      }
      if (typeof helper.getCharLorebooks === 'function') {
        const lorebooks = await helper.getCharLorebooks({ type: 'all' });
        return lorebooks?.primary || '';
      }
      return '';
    }

    return target;
  }

  /**
   * 将内容同步到世界书条目
   * @private
   */
  async _syncWorldbookEntry(toolId, content, options) {
    const helper = this._getTavernHelper();
    if (!helper || typeof helper.getLorebookEntries !== 'function') {
      this._log('TavernHelper 不可用，无法写入世界书');
      return false;
    }

    const targetName = await this._resolveWorldbookTarget(options.worldbookTarget || options.targetName || options.target);
    if (!targetName) {
      this._log('未找到可用世界书，无法写入');
      return false;
    }

    const comment = options.comment || `YouYouToolkit:${toolId}`;
    const position = this._normalizeWorldbookPosition(options.position);
    const depth = Number.isFinite(Number(options.depth)) ? Number(options.depth) : 4;
    const order = Number.isFinite(Number(options.order)) ? Number(options.order) : 10000;

    try {
      const existingEntries = await helper.getLorebookEntries(targetName);
      const entries = Array.isArray(existingEntries) ? existingEntries : [];
      const existingEntry = entries.find((entry) => entry?.comment === comment || entry?.key === comment);

      let nextContent = String(content);
      if (existingEntry && options.overwrite === false) {
        nextContent = [existingEntry.content || '', content].filter(Boolean).join('\n\n');
      }

      const payload = {
        key: comment,
        comment,
        content: nextContent,
        type: 'constant',
        enabled: true,
        disable: false,
        prevent_recursion: true,
        position,
        order
      };

      if (position === 'at_depth_as_system') {
        payload.depth = depth;
      }

      if (existingEntry?.uid != null && typeof helper.setLorebookEntries === 'function') {
        await helper.setLorebookEntries(targetName, [{
          ...payload,
          uid: existingEntry.uid
        }]);
        return true;
      }

      if (typeof helper.createLorebookEntries === 'function') {
        await helper.createLorebookEntries(targetName, [payload]);
        return true;
      }
    } catch (error) {
      this._log('写入世界书失败', error);
    }

    return false;
  }

  /**
   * 获取当前聊天ID
   * @private
   */
  _getCurrentChatId() {
    try {
      const topWindow = (typeof window.parent !== 'undefined' && window.parent !== window) 
        ? window.parent 
        : window;

      // 尝试从SillyTavern获取
      if (topWindow.SillyTavern?.getContext) {
        const context = topWindow.SillyTavern.getContext();
        // 聊天ID可能是文件名或特定ID
        return context.chatId || context.chat_filename || `chat_${Date.now()}`;
      }

      // 回退到时间戳
      return `chat_${Date.now()}`;
    } catch (e) {
      return `chat_${Date.now()}`;
    }
  }

  /**
   * 获取所有上下文数据
   * @private
   */
  _getAllContexts() {
    return storage.get(CONTEXT_INJECTION_KEY, {});
  }

  /**
   * 获取聊天的工具上下文
   * @private
   */
  _getChatContexts(chatId) {
    // 先检查缓存
    if (this._cache.has(chatId)) {
      return this._cache.get(chatId);
    }

    const allContexts = this._getAllContexts();
    const chatContexts = allContexts[chatId] || {};
    
    // 更新缓存
    this._cache.set(chatId, chatContexts);
    
    return chatContexts;
  }

  /**
   * 保存聊天的工具上下文
   * @private
   */
  _saveChatContexts(chatId, contexts) {
    const allContexts = this._getAllContexts();
    allContexts[chatId] = contexts;
    
    storage.set(CONTEXT_INJECTION_KEY, allContexts);
    
    // 更新缓存
    this._cache.set(chatId, contexts);
  }

  /**
   * 日志输出
   * @private
   */
  _log(...args) {
    if (this.debugMode) {
      console.log('[ContextInjector]', ...args);
    }
  }
}

// ============================================================
// 单例实例
// ============================================================

export const contextInjector = new ContextInjector();
export { DEFAULT_INJECTION_OPTIONS, ContextInjector };
export default contextInjector;