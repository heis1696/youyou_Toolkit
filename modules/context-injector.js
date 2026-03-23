/**
 * YouYou Toolkit - 上下文注入服务
 * @description 管理工具输出如何进入上下文，支持按聊天隔离存储
 * @version 1.0.0
 */

import { eventBus, EVENTS } from './core/event-bus.js';

// ============================================================
// 存储键
// ============================================================

const MESSAGE_TOOL_OUTPUTS_KEY = 'YouYouToolkit_toolOutputs';
const MESSAGE_TOOL_CONTEXT_KEY = 'YouYouToolkit_injectedContext';

// ============================================================
// 默认配置
// ============================================================

const DEFAULT_INJECTION_OPTIONS = {
  overwrite: true,      // 是否覆盖现有内容
  enabled: true
};

// ============================================================
// 上下文注入器类
// ============================================================

class ContextInjector {
  constructor() {
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
    const chatId = this._getCurrentChatId();
    
    // 创建注入条目
    const injectionEntry = {
      toolId,
      content: String(content),
      updatedAt: Date.now(),
      sourceMessageId: options.sourceMessageId || null,
      options: mergedOptions
    };
    
    // 发送事件
    eventBus.emit(EVENTS.TOOL_CONTEXT_INJECTED, {
      toolId,
      chatId,
      content: injectionEntry.content,
      options: mergedOptions
    });

    const inserted = await this._insertToolOutputToLatestAssistantMessage(toolId, injectionEntry, mergedOptions);
    if (!inserted) {
      return false;
    }
    
    this._log(`注入成功: ${toolId} -> ${chatId}`);
    return true;
  }

  /**
   * 获取聚合的注入上下文
   * @param {string} chatId - 聊天ID（可选，默认当前聊天）
   * @returns {string} 聚合后的上下文文本
   */
  getAggregatedContext(chatId) {
    return this.getLatestMessageInjectedContext();
  }

  /**
   * 获取最新 AI 消息上的注入上下文文本
   * 这是工具链实际应读取的上下文来源，而不是历史缓存聚合。
   * @param {string|number|null} sourceMessageId
   * @returns {string}
   */
  getLatestMessageInjectedContext(sourceMessageId = null) {
    try {
      const { chat } = this._getChatRuntime();
      const messageIndex = this._findAssistantMessageIndex(chat, sourceMessageId);
      if (messageIndex < 0) {
        return '';
      }

      const targetMessage = chat[messageIndex] || {};
      const directContext = targetMessage[MESSAGE_TOOL_CONTEXT_KEY];
      if (typeof directContext === 'string' && directContext.trim()) {
        return directContext.trim();
      }

      const outputs = targetMessage[MESSAGE_TOOL_OUTPUTS_KEY];
      if (outputs && typeof outputs === 'object') {
        return this._buildMessageInjectedContext(outputs).trim();
      }

      return '';
    } catch (error) {
      this._log('读取最新 AI 消息 injectedContext 失败', error);
      return '';
    }
  }

  /**
   * 获取最新 AI 消息镜像写回的工具结果
   * @private
   */
  _getLatestAssistantMessageOutputs() {
    try {
      const { chat } = this._getChatRuntime();
      const messageIndex = this._findAssistantMessageIndex(chat, null);
      if (messageIndex < 0) {
        return {};
      }

      const targetMessage = chat[messageIndex] || {};
      const outputs = targetMessage[MESSAGE_TOOL_OUTPUTS_KEY];
      return outputs && typeof outputs === 'object' ? outputs : {};
    } catch (error) {
      this._log('读取最新 AI 消息上下文失败', error);
      return {};
    }
  }

  /**
   * 获取单个工具的注入上下文
   * @param {string} chatId - 聊天ID
   * @param {string} toolId - 工具ID
   * @returns {Object|null} 注入条目
   */
  getToolContext(chatId, toolId) {
    if (!toolId) return null;
    try {
      const { chat } = this._getChatRuntime();
      const messageIndex = this._findAssistantMessageIndex(chat, null);
      if (messageIndex < 0) return null;
      const outputs = chat[messageIndex]?.[MESSAGE_TOOL_OUTPUTS_KEY];
      return outputs?.[toolId] || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * 获取聊天下所有工具上下文
   * @param {string} chatId - 聊天ID
   * @returns {Object} 工具上下文对象
   */
  getAllToolContexts(chatId) {
    return this._getLatestAssistantMessageOutputs();
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
  async clearToolContext(chatId, toolId) {
    if (!toolId) return false;
    try {
      const { api, context, chat } = this._getChatRuntime();
      const messageIndex = this._findAssistantMessageIndex(chat, null);
      if (messageIndex < 0) return false;

      const targetMessage = chat[messageIndex];
      const outputs = targetMessage?.[MESSAGE_TOOL_OUTPUTS_KEY];
      if (!outputs || !outputs[toolId]) return false;

      delete outputs[toolId];
      targetMessage[MESSAGE_TOOL_OUTPUTS_KEY] = outputs;
      targetMessage[MESSAGE_TOOL_CONTEXT_KEY] = this._buildMessageInjectedContext(outputs);

      const saveChat = context?.saveChat || api?.saveChat || null;
      if (typeof saveChat === 'function') {
        await saveChat.call(context || api);
      }

      eventBus.emit(EVENTS.TOOL_CONTEXT_CLEARED, { chatId: chatId || this._getCurrentChatId(), toolId });
      return true;
    } catch (error) {
      this._log('清除工具上下文失败', error);
      return false;
    }
  }

  /**
   * 清除聊天的所有工具上下文
   * @param {string} chatId - 聊天ID
   * @returns {boolean} 是否成功
   */
  async clearAllContext(chatId) {
    try {
      const { api, context, chat } = this._getChatRuntime();
      const messageIndex = this._findAssistantMessageIndex(chat, null);
      if (messageIndex < 0) return false;

      const targetMessage = chat[messageIndex];
      delete targetMessage[MESSAGE_TOOL_OUTPUTS_KEY];
      delete targetMessage[MESSAGE_TOOL_CONTEXT_KEY];

      const saveChat = context?.saveChat || api?.saveChat || null;
      if (typeof saveChat === 'function') {
        await saveChat.call(context || api);
      }

      eventBus.emit(EVENTS.TOOL_CONTEXT_CLEARED, { chatId: chatId || this._getCurrentChatId(), allTools: true });
      return true;
    } catch (error) {
      this._log('清除所有工具上下文失败', error);
      return false;
    }
  }

  /**
   * 清除所有聊天的所有上下文
   */
  clearAllChatsContexts() {
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
    return !!this.getToolContext(chatId, toolId);
  }

  /**
   * 获取聊天的工具注入状态摘要
   * @param {string} chatId - 聊天ID
   * @returns {Object} 状态摘要
   */
  getContextSummary(chatId) {
    const outputs = this._getLatestAssistantMessageOutputs();
    const tools = Object.entries(outputs).map(([toolId, entry]) => ({
      toolId,
      updatedAt: entry.updatedAt,
      contentLength: entry.content?.length || 0
    }));

    return {
      chatId: chatId || this._getCurrentChatId(),
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
    return {
      chatId: chatId || this._getCurrentChatId(),
      contexts: this._getLatestAssistantMessageOutputs(),
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
    return false;
  }

  // ============================================================
  // 私有方法
  // ============================================================

  /**
   * 获取存储键
   * @private
   */
  _getChatRuntime() {
    try {
      const topWindow = (typeof window.parent !== 'undefined' && window.parent !== window)
        ? window.parent
        : window;
      const api = topWindow.SillyTavern || null;
      const context = api?.getContext?.() || null;
      const contextChat = Array.isArray(context?.chat) ? context.chat : [];
      const apiChat = Array.isArray(api?.chat) ? api.chat : [];
      const chat = contextChat.length ? contextChat : apiChat;

      return {
        topWindow,
        api,
        context,
        chat,
        contextChat,
        apiChat
      };
    } catch (error) {
      return {
        topWindow: null,
        api: null,
        context: null,
        chat: [],
        contextChat: [],
        apiChat: []
      };
    }
  }

  /**
   * 同步更新 context.chat / api.chat 中的同一条消息，提升界面即时刷新概率
   * @private
   */
  _syncMessageToRuntimeChats(runtime, messageIndex, updatedMessage) {
    const { contextChat, apiChat } = runtime || {};
    const apply = (chatArray) => {
      if (!Array.isArray(chatArray) || messageIndex < 0 || messageIndex >= chatArray.length) {
        return;
      }

      if (chatArray[messageIndex] !== updatedMessage) {
        chatArray[messageIndex] = {
          ...(chatArray[messageIndex] || {}),
          ...updatedMessage
        };
      }
    };

    apply(contextChat);
    apply(apiChat);
  }

  /**
   * 尝试触发聊天消息刷新
   * @private
   */
  _notifyMessageUpdated(runtime, messageIndex) {
    try {
      const { api, topWindow } = runtime || {};
      const eventSource = api?.eventSource || null;
      const eventTypes = api?.eventTypes || {};
      const messageUpdatedEvent = eventTypes.MESSAGE_UPDATED || 'MESSAGE_UPDATED';

      if (eventSource && typeof eventSource.emit === 'function') {
        eventSource.emit(messageUpdatedEvent, messageIndex);

        if (typeof topWindow?.requestAnimationFrame === 'function') {
          topWindow.requestAnimationFrame(() => {
            eventSource.emit(messageUpdatedEvent, messageIndex);
          });
        } else if (typeof topWindow?.setTimeout === 'function') {
          topWindow.setTimeout(() => {
            eventSource.emit(messageUpdatedEvent, messageIndex);
          }, 30);
        }
      }
    } catch (error) {
      this._log('触发消息刷新事件失败', error);
    }
  }

  /**
   * 判断是否为 AI / assistant 消息
   * @private
   */
  _isAssistantMessage(message) {
    if (!message) return false;
    if (message.is_user || message.is_system) return false;

    const role = String(message.role || '').toLowerCase();
    return role === 'assistant' || role === 'ai' || !role;
  }

  /**
   * 在聊天记录中寻找目标 AI 消息
   * @private
   */
  _findAssistantMessageIndex(chatMessages, sourceMessageId) {
    const chat = Array.isArray(chatMessages) ? chatMessages : [];
    if (!chat.length) return -1;

    const matchBySourceId = (message, index) => {
      if (!this._isAssistantMessage(message)) return false;
      if (sourceMessageId === undefined || sourceMessageId === null || sourceMessageId === '') {
        return false;
      }
      const normalizedSourceId = String(sourceMessageId).trim();
      if (!normalizedSourceId) return false;

      const candidates = [
        message.message_id,
        message.id,
        message.messageId,
        message.mes_id,
        message.swipe_id,
        index
      ].map(value => value === undefined || value === null ? '' : String(value).trim());

      return candidates.includes(normalizedSourceId);
    };

    for (let index = chat.length - 1; index >= 0; index -= 1) {
      if (matchBySourceId(chat[index], index)) {
        return index;
      }
    }

    for (let index = chat.length - 1; index >= 0; index -= 1) {
      if (this._isAssistantMessage(chat[index])) {
        return index;
      }
    }

    return -1;
  }

  /**
   * 构建写回到最新 AI 消息上的工具上下文文本
   * @private
   */
  _buildMessageInjectedContext(toolOutputs) {
    const outputs = toolOutputs && typeof toolOutputs === 'object' ? toolOutputs : {};
    const entries = Object.entries(outputs)
      .sort(([, a], [, b]) => (a?.updatedAt || 0) - (b?.updatedAt || 0));

    if (!entries.length) return '';

    const lines = ['[工具上下文注入]', ''];
    for (const [toolId, entry] of entries) {
      lines.push(`[${toolId}]`);
      lines.push(entry?.content || '');
      lines.push('');
    }

    return lines.join('\n');
  }

  /**
   * 获取可写入的消息字段及其文本内容
   * @private
   */
  _getWritableMessageField(message) {
    const candidates = ['mes', 'message', 'content', 'text'];
    for (const key of candidates) {
      if (typeof message?.[key] === 'string') {
        return {
          key,
          text: message[key]
        };
      }
    }

    return {
      key: 'mes',
      text: ''
    };
  }

  /**
   * 同步更新消息上的所有常见正文字段，尽量兼容不同前端渲染路径
   * @private
   */
  _applyMessageText(message, nextText) {
    const target = message && typeof message === 'object' ? message : {};
    const candidates = ['mes', 'message', 'content', 'text'];
    let applied = false;

    candidates.forEach((key) => {
      if (typeof target[key] === 'string') {
        target[key] = nextText;
        applied = true;
      }
    });

    if (!applied) {
      target.mes = nextText;
      target.message = nextText;
    }

    return target;
  }

  /**
   * 从消息原文中移除旧的工具输出块
   * @private
   */
  _stripExistingToolOutput(text, selectors = []) {
    let result = String(text || '');
    const normalizedSelectors = Array.isArray(selectors) ? selectors : [];

    normalizedSelectors.forEach((selector) => {
      const value = String(selector || '').trim();
      if (!value) return;

      if (value.startsWith('regex:')) {
        try {
          const regex = new RegExp(value.slice(6).trim(), 'gis');
          result = result.replace(regex, '');
        } catch (error) {
          this._log('移除旧工具输出时正则无效', value, error);
        }
        return;
      }

      const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const htmlBlock = new RegExp(`<${escaped}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${escaped}>\\s*`, 'gi');
      const curlyBlock = new RegExp(`\\{${escaped}\\|[\\s\\S]*?\\}\\s*`, 'gi');
      result = result.replace(htmlBlock, '');
      result = result.replace(curlyBlock, '');
    });

    return result.trimEnd();
  }

  /**
   * 额外移除当前工具上一次写回的纯文本内容，避免当工具结果并未带标签壳时无法覆盖
   * @private
   */
  _stripPreviousStoredToolContent(text, previousContent) {
    const sourceText = String(text || '');
    const stored = String(previousContent || '').trim();
    if (!stored) {
      return sourceText.trimEnd();
    }

    return sourceText.replace(stored, '').trimEnd();
  }

  /**
   * 将工具输出直接插入最新 AI 楼层原文
   * @private
   */
  async _insertToolOutputToLatestAssistantMessage(toolId, injectionEntry, options = {}) {
    try {
      const runtime = this._getChatRuntime();
      const { api, context, chat } = runtime;
      if (!Array.isArray(chat) || !chat.length) {
        this._log('未找到聊天消息，无法插入工具输出');
        return false;
      }

      const messageIndex = this._findAssistantMessageIndex(chat, options.sourceMessageId);
      if (messageIndex < 0) {
        this._log('未找到可写入的最新 AI 回复消息');
        return false;
      }

      const targetMessage = chat[messageIndex];
      const { key, text } = this._getWritableMessageField(targetMessage);
      const existingOutputs = targetMessage[MESSAGE_TOOL_OUTPUTS_KEY] && typeof targetMessage[MESSAGE_TOOL_OUTPUTS_KEY] === 'object'
        ? targetMessage[MESSAGE_TOOL_OUTPUTS_KEY]
        : {};
      const previousToolContent = existingOutputs?.[toolId]?.content || '';
      const baseText = options.overwrite === false
        ? String(text || '')
        : this._stripPreviousStoredToolContent(
            this._stripExistingToolOutput(text, options.extractionSelectors),
            previousToolContent
          );
      const appendContent = String(injectionEntry.content || '').trim();
      const nextText = [baseText.trimEnd(), appendContent].filter(Boolean).join('\n\n').trim();

      const mergedOutputs = {
        ...existingOutputs,
        [toolId]: {
          toolId,
          content: appendContent,
          updatedAt: injectionEntry.updatedAt,
          sourceMessageId: injectionEntry.sourceMessageId || null
        }
      };

      targetMessage[key] = nextText;
      this._applyMessageText(targetMessage, nextText);
      targetMessage[MESSAGE_TOOL_OUTPUTS_KEY] = mergedOutputs;
      targetMessage[MESSAGE_TOOL_CONTEXT_KEY] = this._buildMessageInjectedContext(mergedOutputs);

      this._syncMessageToRuntimeChats(runtime, messageIndex, targetMessage);

      const setChatMessages = context?.setChatMessages || api?.setChatMessages || runtime?.topWindow?.setChatMessages || null;
      const setChatMessage = context?.setChatMessage || api?.setChatMessage || runtime?.topWindow?.setChatMessage || null;

      if (typeof setChatMessages === 'function') {
        try {
          await setChatMessages.call(context || api || runtime?.topWindow, [{
            message_id: messageIndex,
            message: nextText,
            mes: nextText,
            content: nextText,
            text: nextText
          }], {
            refresh: 'affected'
          });
        } catch (error) {
          this._log('setChatMessages 写回失败，回退本地同步', error);
        }
      } else if (typeof setChatMessage === 'function') {
        try {
          await setChatMessage.call(context || api || runtime?.topWindow, {
            message: nextText,
            mes: nextText,
            content: nextText,
            text: nextText
          }, messageIndex);
        } catch (error) {
          this._log('setChatMessage 写回失败，回退本地同步', error);
        }
      }

      if (typeof setChatMessage === 'function') {
        try {
          await setChatMessage.call(context || api || runtime?.topWindow, {}, messageIndex);
        } catch (error) {
          this._log('使用空 setChatMessage 强制刷新失败', error);
        }
      }

      const saveChat = context?.saveChat || api?.saveChat || null;
      const saveChatDebounced = context?.saveChatDebounced || api?.saveChatDebounced || null;

      if (typeof saveChatDebounced === 'function') {
        saveChatDebounced.call(context || api);
      }

      if (typeof saveChat === 'function') {
        await saveChat.call(context || api);
      }

      this._notifyMessageUpdated(runtime, messageIndex);

      this._log(`已将工具输出插入最新 AI 回复原文: ${toolId} -> #${messageIndex}`);
      return true;
    } catch (error) {
      this._log('插入最新 AI 回复原文失败', error);
      return false;
    }
  }

  _getCurrentChatId() {
    try {
      const topWindow = (typeof window.parent !== 'undefined' && window.parent !== window) 
        ? window.parent 
        : window;

      // 尝试从SillyTavern获取
      if (topWindow.SillyTavern?.getContext) {
        const context = topWindow.SillyTavern.getContext();
        const candidates = [
          context?.chatId,
          context?.chat_id,
          context?.chat_filename,
          context?.chatMetadata?.chatId,
          context?.chatMetadata?.chat_id,
          context?.chatMetadata?.file_name,
          context?.chatMetadata?.name,
          topWindow.SillyTavern?.chatId,
          topWindow.SillyTavern?.chat_id,
          topWindow.SillyTavern?.chat_filename
        ];

        const stableChatId = candidates.find(value => typeof value === 'string' && value.trim());
        if (stableChatId) {
          return stableChatId;
        }

        const currentCharId = topWindow.SillyTavern?.this_chid;
        if (currentCharId !== undefined && currentCharId !== null) {
          return `chat_char_${currentCharId}`;
        }
      }

      return 'chat_default';
    } catch (e) {
      return 'chat_default';
    }
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