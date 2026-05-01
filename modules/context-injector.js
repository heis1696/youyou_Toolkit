/**
 * YouYou Toolkit - 上下文注入服务
 * @description 管理工具输出如何进入上下文，支持按聊天隔离存储
 * @version 1.0.0
 */

import { eventBus, EVENTS } from './core/event-bus.js';
import { logger } from './core/logger-service.js';

const log = logger.createScope('ContextInjector');

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

function normalizeIdentityValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  return '';
}

function getTopWindow() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent;
    }
  } catch (_) {
    // ignore cross-origin
  }
  return window;
}

function getHostContext(topWindow) {
  try {
    return topWindow?.SillyTavern?.getContext?.() || null;
  } catch (_) {
    return null;
  }
}

function resolveHostEventBridge() {
  const topWindow = getTopWindow();
  const api = topWindow?.SillyTavern || null;
  const context = getHostContext(topWindow);
  const eventSource = api?.eventSource || topWindow?.eventSource || context?.eventSource || null;
  const eventTypes = api?.eventTypes || api?.event_types || context?.eventTypes || context?.event_types || topWindow?.eventTypes || topWindow?.event_types || {};

  return {
    topWindow,
    api,
    context,
    eventSource,
    eventTypes,
    source: api?.eventSource
      ? 'SillyTavern.eventSource'
      : (topWindow?.eventSource
        ? 'topWindow.eventSource'
        : (context?.eventSource ? 'SillyTavern.getContext().eventSource' : 'unavailable'))
  };
}

const WRITEBACK_RESULT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed'
};

const WRITEBACK_METHODS = {
  NONE: 'none',
  LOCAL_ONLY: 'local_only',
  SET_CHAT_MESSAGES: 'setChatMessages',
  SET_CHAT_MESSAGE: 'setChatMessage'
};

const WRITEBACK_REFRESH_CONFIRM_DELAY_MS = 60;
const WRITEBACK_REFRESH_CONFIRM_RETRIES = 3;

function appendUniqueMethod(list, method) {
  const normalizedMethod = String(method || '').trim();
  if (!normalizedMethod) {
    return list;
  }

  if (!Array.isArray(list)) {
    return [normalizedMethod];
  }

  if (!list.includes(normalizedMethod)) {
    list.push(normalizedMethod);
  }

  return list;
}

function getWritebackAbortError(options = {}) {
  if (options?.signal?.aborted) {
    return '工具结果已取消，跳过写回';
  }

  if (typeof options?.shouldAbortWriteback === 'function') {
    try {
      if (options.shouldAbortWriteback() === true) {
        return '工具结果已过期，跳过写回';
      }
    } catch (_) {
      return '工具结果已过期，跳过写回';
    }
  }

  return '';
}

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
   * @returns {boolean} 是否成功（兼容接口）
   */
  async inject(toolId, content, options = {}) {
    const result = await this.injectDetailed(toolId, content, options);
    return result.success;
  }

  /**
   * 注入工具上下文，并返回分层写回结果。
   * @param {string} toolId - 工具ID
   * @param {string} content - 要注入的内容
   * @param {Object} options - 注入选项
   * @returns {Object} 写回结果
   */
  async injectDetailed(toolId, content, options = {}) {
    const mergedOptions = { ...DEFAULT_INJECTION_OPTIONS, ...options };
    const writebackResult = this._createWritebackResult(toolId, mergedOptions);

    if (!toolId || content === undefined || content === null) {
      this._log('注入失败: 参数无效');
      writebackResult.error = '注入失败: 参数无效';
      return writebackResult;
    }

    if (!normalizeIdentityValue(mergedOptions.sourceMessageId)) {
      this._log('注入失败: 缺少 sourceMessageId');
      writebackResult.error = '注入失败: 缺少 sourceMessageId';
      return writebackResult;
    }

    if (mergedOptions?.signal?.aborted) {
      writebackResult.error = '工具结果已取消，跳过写回';
      return writebackResult;
    }

    if (typeof mergedOptions?.shouldAbortWriteback === 'function') {
      try {
        if (mergedOptions.shouldAbortWriteback() === true) {
          writebackResult.error = '工具结果已过期，跳过写回';
          return writebackResult;
        }
      } catch (_) {
        writebackResult.error = '工具结果已过期，跳过写回';
        return writebackResult;
      }
    }

    const chatId = writebackResult.chatId;
    
    // 创建注入条目
    const injectionEntry = {
      toolId,
      content: String(content),
      updatedAt: Date.now(),
      sourceMessageId: mergedOptions.sourceMessageId || null,
      sourceSwipeId: mergedOptions.sourceSwipeId || mergedOptions.effectiveSwipeId || null,
      options: mergedOptions
    };
    
    // 发送事件
    eventBus.emit(EVENTS.TOOL_CONTEXT_INJECTED, {
      toolId,
      chatId,
      content: injectionEntry.content,
      sourceMessageId: injectionEntry.sourceMessageId,
      sourceSwipeId: injectionEntry.sourceSwipeId,
      effectiveSwipeId: injectionEntry.sourceSwipeId,
      slotBindingKey: mergedOptions.slotBindingKey || '',
      slotRevisionKey: mergedOptions.slotRevisionKey || '',
      slotTransactionId: mergedOptions.slotTransactionId || '',
      traceId: mergedOptions.traceId || '',
      sessionKey: mergedOptions.sessionKey || '',
      options: mergedOptions
    });

    const inserted = await this._insertToolOutputToBoundAssistantSlot(toolId, injectionEntry, mergedOptions, writebackResult);
    
    if (inserted.success) {
      this._log(`注入成功: ${toolId} -> ${chatId}`, inserted);
    }

    return inserted;
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
   * 创建标准化写回结果。
   * @private
   */
  _createWritebackResult(toolId, options = {}) {
    const preferredCommitMethod = WRITEBACK_METHODS.SET_CHAT_MESSAGE;

    return {
      success: false,
      toolId,
      chatId: this._getCurrentChatId(),
      traceId: options.traceId || '',
      sessionKey: options.sessionKey || '',
      sourceMessageId: options.sourceMessageId || null,
      sourceSwipeId: options.sourceSwipeId || options.effectiveSwipeId || null,
      effectiveSwipeId: options.effectiveSwipeId || options.sourceSwipeId || null,
      slotBindingKey: options.slotBindingKey || '',
      slotRevisionKey: options.slotRevisionKey || '',
      slotTransactionId: options.slotTransactionId || '',
      messageIndex: -1,
      textField: '',
      blockIdentity: null,
      hostUpdateMethod: WRITEBACK_METHODS.NONE,
      commit: {
        preferredMethod: preferredCommitMethod,
        attemptedMethods: [],
        appliedMethod: WRITEBACK_METHODS.NONE,
        fallbackUsed: false,
        contentCommitted: false,
        hostCommitApplied: false
      },
      refresh: {
        requestMethods: [],
        requested: false,
        confirmChecks: 0,
        confirmed: false,
        confirmedBy: '',
        eventSource: '',
        eventName: ''
      },
      contentCommitted: false,
      hostCommitApplied: false,
      refreshRequested: false,
      refreshConfirmed: false,
      writebackStatus: WRITEBACK_RESULT_STATUS.FAILED,
      replacedExistingBlock: false,
      insertedNewBlock: false,
      conflictDetected: false,
      conflictReason: '',
      preservedOtherToolBlocks: true,
      error: '',
      errors: [],
      steps: {
        foundTargetMessage: false,
        contentCommitted: false,
        localTextApplied: false,
        runtimeSynced: false,
        hostSetChatMessages: false,
        hostSetChatMessage: false,
        refreshForceSetChatMessage: false,
        saveChatDebounced: false,
        saveChat: false,
        refreshRequested: false,
        notifiedMessageUpdated: false,
        verifiedAfterWrite: false,
        refreshConfirmed: false
      },
      verification: {
        textIncludesContent: false,
        mirrorStored: false,
        refreshConfirmed: false
      }
    };
  }

  async _wait(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  _collectWritebackVerification(runtime, chat, messageIndex, toolId, expectedContent, fallbackMessage = null) {
    const latestMessage = runtime?.contextChat?.[messageIndex]
      || runtime?.apiChat?.[messageIndex]
      || chat?.[messageIndex]
      || fallbackMessage
      || null;
    const latestText = this._getWritableMessageField(latestMessage).text || '';
    const mirroredEntry = latestMessage?.[MESSAGE_TOOL_OUTPUTS_KEY]?.[toolId];

    const textIncludesContent = expectedContent
      ? latestText.includes(expectedContent)
      : true;
    const mirrorStored = Boolean(
      mirroredEntry
      && String(mirroredEntry.content || '').trim() === expectedContent
    );

    return {
      latestMessage,
      latestText,
      textIncludesContent,
      mirrorStored
    };
  }

  async _confirmRefresh(runtime, chat, messageIndex, toolId, expectedContent, fallbackMessage = null) {
    let confirmChecks = 1;
    let verification = this._collectWritebackVerification(runtime, chat, messageIndex, toolId, expectedContent, fallbackMessage);

    for (let attempt = 0; attempt < WRITEBACK_REFRESH_CONFIRM_RETRIES; attempt += 1) {
      if (verification.textIncludesContent && verification.mirrorStored) {
        return {
          ...verification,
          refreshConfirmed: true,
          confirmChecks,
          confirmedBy: 'text_and_mirror_present'
        };
      }

      await this._wait(WRITEBACK_REFRESH_CONFIRM_DELAY_MS);
      confirmChecks += 1;
      verification = this._collectWritebackVerification(runtime, chat, messageIndex, toolId, expectedContent, fallbackMessage);
    }

    return {
      ...verification,
      refreshConfirmed: verification.textIncludesContent && verification.mirrorStored,
      confirmChecks,
      confirmedBy: verification.textIncludesContent && verification.mirrorStored
        ? 'text_and_mirror_present'
        : ''
    };
  }

  /**
   * 请求宿主刷新当前 assistant 消息。
   * 追加写回场景会在主提交通道之外额外补一次 affected refresh，
   * 尽量命中宿主的局部消息重渲染路径。
   * @private
   */
  async _requestAssistantMessageRefresh(runtime, messageIndex, nextText, options = {}, result = null) {
    const refreshResult = result || this._createWritebackResult('', options);
    const { api, context } = runtime || {};
    const setChatMessages = context?.setChatMessages || api?.setChatMessages || runtime?.topWindow?.setChatMessages || null;
    const setChatMessage = context?.setChatMessage || api?.setChatMessage || runtime?.topWindow?.setChatMessage || null;
    const prefersAppendRefreshAssist = options.replaceFullMessage !== true;

    refreshResult.commit.preferredMethod = typeof setChatMessage === 'function'
      ? WRITEBACK_METHODS.SET_CHAT_MESSAGE
      : (typeof setChatMessages === 'function' ? WRITEBACK_METHODS.SET_CHAT_MESSAGES : WRITEBACK_METHODS.LOCAL_ONLY);

    let hostWriteCompleted = false;

    const abortErrorBeforeCommit = getWritebackAbortError(options);
    if (abortErrorBeforeCommit) {
      refreshResult.error = abortErrorBeforeCommit;
      return refreshResult;
    }

    if (typeof setChatMessage === 'function') {
      appendUniqueMethod(refreshResult.commit.attemptedMethods, WRITEBACK_METHODS.SET_CHAT_MESSAGE);
      try {
        const abortError = getWritebackAbortError(options);
        if (abortError) {
          refreshResult.error = abortError;
          return refreshResult;
        }

        await setChatMessage.call(context || api || runtime?.topWindow, {
          message: nextText,
          mes: nextText,
          content: nextText,
          text: nextText
        }, messageIndex, {
          swipe_id: normalizeIdentityValue(options.sourceSwipeId || options.effectiveSwipeId) || 'current',
          refresh: 'display_and_render_current'
        });
        refreshResult.steps.hostSetChatMessage = true;
        refreshResult.hostUpdateMethod = WRITEBACK_METHODS.SET_CHAT_MESSAGE;
        refreshResult.hostCommitApplied = true;
        refreshResult.commit.appliedMethod = WRITEBACK_METHODS.SET_CHAT_MESSAGE;
        refreshResult.commit.hostCommitApplied = true;
        hostWriteCompleted = true;
      } catch (error) {
        this._log('setChatMessage 写回失败，回退本地同步', error);
        refreshResult.errors.push(`setChatMessage: ${error?.message || String(error)}`);
      }
    }

    if (!hostWriteCompleted && typeof setChatMessages === 'function') {
      appendUniqueMethod(refreshResult.commit.attemptedMethods, WRITEBACK_METHODS.SET_CHAT_MESSAGES);
      try {
        const abortError = getWritebackAbortError(options);
        if (abortError) {
          refreshResult.error = abortError;
          return refreshResult;
        }

        await setChatMessages.call(context || api || runtime?.topWindow, [{
          message_id: normalizeIdentityValue(options.sourceMessageId) || messageIndex,
          chat_index: messageIndex,
          message: nextText,
          mes: nextText,
          content: nextText,
          text: nextText
        }], {
          refresh: 'affected'
        });
        refreshResult.steps.hostSetChatMessages = true;
        refreshResult.hostUpdateMethod = WRITEBACK_METHODS.SET_CHAT_MESSAGES;
        refreshResult.hostCommitApplied = true;
        refreshResult.commit.appliedMethod = WRITEBACK_METHODS.SET_CHAT_MESSAGES;
        refreshResult.commit.hostCommitApplied = true;
        refreshResult.commit.fallbackUsed = true;
        hostWriteCompleted = true;
      } catch (error) {
        this._log('setChatMessages 写回失败，回退本地同步', error);
        refreshResult.errors.push(`setChatMessages: ${error?.message || String(error)}`);
      }
    }

    if (hostWriteCompleted) {
      refreshResult.refreshRequested = true;
      appendUniqueMethod(refreshResult.refresh.requestMethods, refreshResult.hostUpdateMethod);
    }

    if (prefersAppendRefreshAssist && typeof setChatMessages === 'function') {
      appendUniqueMethod(refreshResult.commit.attemptedMethods, 'setChatMessages_refresh_assist');
      try {
        const abortError = getWritebackAbortError(options);
        if (abortError) {
          refreshResult.error = abortError;
          return refreshResult;
        }

        await setChatMessages.call(context || api || runtime?.topWindow, [{
          message_id: normalizeIdentityValue(options.sourceMessageId) || messageIndex,
          chat_index: messageIndex,
          message: nextText,
          mes: nextText,
          content: nextText,
          text: nextText
        }], {
          refresh: 'affected'
        });
        refreshResult.refreshRequested = true;
        appendUniqueMethod(refreshResult.refresh.requestMethods, 'setChatMessages_refresh_assist');
      } catch (error) {
        this._log('append 写回补充刷新失败', error);
        refreshResult.errors.push(`setChatMessages_refresh_assist: ${error?.message || String(error)}`);
      }
    }

    if (!hostWriteCompleted) {
      appendUniqueMethod(refreshResult.commit.attemptedMethods, WRITEBACK_METHODS.LOCAL_ONLY);
      refreshResult.commit.appliedMethod = WRITEBACK_METHODS.LOCAL_ONLY;
      refreshResult.commit.fallbackUsed = refreshResult.commit.preferredMethod !== WRITEBACK_METHODS.LOCAL_ONLY;
      refreshResult.hostUpdateMethod = refreshResult.commit.appliedMethod;
    }

    return refreshResult;
  }

  /**
   * 识别工具输出块类型。
   * @private
   */
  _inferBlockType(text) {
    const value = String(text || '').trim();
    if (!value) return 'empty';

    const tagMatch = value.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);
    if (tagMatch?.[1]) {
      return tagMatch[1];
    }

    return 'plain_text';
  }

  /**
   * 优先按上次保存的完整块文本做精确替换。
   * @private
   */
  _stripExactStoredBlock(text, storedBlockText, replacementText = '') {
    const sourceText = String(text || '');
    const targetBlock = String(storedBlockText || '').trim();
    const nextBlock = String(replacementText || '').trim();
    if (!targetBlock) {
      return {
        text: sourceText,
        removed: false,
        replaced: false
      };
    }

    if (!sourceText.includes(targetBlock)) {
      return {
        text: sourceText,
        removed: false,
        replaced: false
      };
    }

    if (nextBlock) {
      return {
        text: sourceText.replace(targetBlock, nextBlock).trimEnd(),
        removed: true,
        replaced: true
      };
    }

    return {
      text: sourceText.replace(targetBlock, '').trimEnd(),
      removed: true,
      replaced: false
    };
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
      const hostBridge = resolveHostEventBridge();
      const topWindow = hostBridge?.topWindow || runtime?.topWindow;
      const eventSource = hostBridge?.eventSource || null;
      const eventTypes = hostBridge?.eventTypes || {};
      const messageUpdatedEvent = eventTypes.MESSAGE_UPDATED || eventTypes.message_updated || 'MESSAGE_UPDATED';

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

        return {
          emitted: true,
          source: hostBridge?.source || 'unavailable',
          eventName: messageUpdatedEvent
        };
      }

      return {
        emitted: false,
        source: hostBridge?.source || 'unavailable',
        eventName: messageUpdatedEvent
      };
    } catch (error) {
      this._log('触发消息刷新事件失败', error);
      return {
        emitted: false,
        source: 'error',
        eventName: '',
        error: error?.message || String(error)
      };
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
    const hasExplicitSourceMessageId = sourceMessageId !== undefined && sourceMessageId !== null && sourceMessageId !== '';

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
        index
      ].map(value => value === undefined || value === null ? '' : String(value).trim());

      return candidates.includes(normalizedSourceId);
    };

    for (let index = chat.length - 1; index >= 0; index -= 1) {
      if (matchBySourceId(chat[index], index)) {
        return index;
      }
    }

    if (hasExplicitSourceMessageId) {
      return -1;
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
      .filter(([, entry]) => entry?.blockType !== 'full_message')
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
  _applyMessageText(message, nextText, options = {}) {
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

    if (Array.isArray(target.swipes)) {
      const preferredSwipeIndex = Number.parseInt(
        normalizeIdentityValue(options?.sourceSwipeId || options?.effectiveSwipeId),
        10
      );
      const currentSwipeIndex = Number.isInteger(preferredSwipeIndex)
        ? preferredSwipeIndex
        : (Number.isInteger(target.swipe_id)
          ? target.swipe_id
          : (Number.isInteger(target.swipeId) ? target.swipeId : 0));

      if (currentSwipeIndex >= 0 && currentSwipeIndex < target.swipes.length) {
        target.swipes[currentSwipeIndex] = nextText;
        target.swipe_id = currentSwipeIndex;
        target.swipeId = currentSwipeIndex;
      }
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
  async _insertToolOutputToBoundAssistantSlot(toolId, injectionEntry, options = {}, writebackResult = null) {
    const result = writebackResult || this._createWritebackResult(toolId, options);

    try {
      const runtime = this._getChatRuntime();
      const { context, chat } = runtime;
      if (!Array.isArray(chat) || !chat.length) {
        this._log('未找到聊天消息，无法插入工具输出');
        result.error = '未找到聊天消息，无法插入工具输出';
        return result;
      }

      const messageIndex = this._findAssistantMessageIndex(chat, options.sourceMessageId);
      if (messageIndex < 0) {
        this._log('未找到可写入的最新 AI 回复消息');
        result.error = '未找到可写入的最新 AI 回复消息';
        return result;
      }

      if (options?.signal?.aborted) {
        result.error = '工具结果已取消，跳过写回';
        return result;
      }

      if (typeof options?.shouldAbortWriteback === 'function') {
        try {
          if (options.shouldAbortWriteback() === true) {
            result.error = '工具结果已过期，跳过写回';
            return result;
          }
        } catch (_) {
          result.error = '工具结果已过期，跳过写回';
          return result;
        }
      }

      result.messageIndex = messageIndex;
      result.steps.foundTargetMessage = true;

      const targetMessage = chat[messageIndex];
      const { key, text } = this._getWritableMessageField(targetMessage);
      result.textField = key;
      const existingOutputs = targetMessage[MESSAGE_TOOL_OUTPUTS_KEY] && typeof targetMessage[MESSAGE_TOOL_OUTPUTS_KEY] === 'object'
        ? targetMessage[MESSAGE_TOOL_OUTPUTS_KEY]
        : {};
      const previousToolEntry = existingOutputs?.[toolId] || {};
      const previousToolContent = previousToolEntry?.content || '';
      const previousBlockText = previousToolEntry?.blockText || previousToolContent || '';
      const otherToolEntries = Object.entries(existingOutputs)
        .filter(([id]) => id !== toolId)
        .map(([, entry]) => entry || {});
      const appendContent = String(injectionEntry.content || '').trim();
      const replaceFullMessage = options.replaceFullMessage === true;
      const blockType = replaceFullMessage ? 'full_message' : this._inferBlockType(appendContent);
      const blockIdentity = {
        toolId,
        messageId: options.sourceMessageId || targetMessage?.message_id || targetMessage?.messageId || messageIndex,
        blockType,
        insertedAt: injectionEntry.updatedAt,
        replaceable: options.overwrite !== false
      };
      result.blockIdentity = blockIdentity;

      const exactStripResult = (options.overwrite === false || replaceFullMessage)
        ? { text: String(text || ''), removed: false, replaced: false }
        : this._stripExactStoredBlock(text, previousBlockText, appendContent);
      let workingText = exactStripResult.text;
      let conflictReason = '';

      if (!replaceFullMessage && options.overwrite !== false && previousBlockText && !exactStripResult.removed) {
        conflictReason = 'previous_block_not_found';
      }

      const selectorStrippedText = (options.overwrite === false || exactStripResult.replaced || replaceFullMessage)
        ? workingText
        : this._stripExistingToolOutput(workingText, options.extractionSelectors);
      const removedBySelector = selectorStrippedText !== workingText;
      workingText = selectorStrippedText;

      const contentStrippedText = (options.overwrite === false || exactStripResult.replaced || replaceFullMessage)
        ? workingText
        : this._stripPreviousStoredToolContent(workingText, previousToolContent);
      const removedByContent = contentStrippedText !== workingText;
      workingText = contentStrippedText;

      result.replacedExistingBlock = replaceFullMessage || exactStripResult.removed || removedBySelector || removedByContent;

      const baseText = options.overwrite === false
        ? String(text || '')
        : workingText;
      const nextText = replaceFullMessage
        ? appendContent
        : (exactStripResult.replaced
          ? workingText.trim()
          : [baseText.trimEnd(), appendContent].filter(Boolean).join('\n\n').trim());
      result.insertedNewBlock = Boolean(appendContent);

      const preservedOtherToolBlocks = otherToolEntries.every((entry) => {
        if (entry?.blockType === 'full_message') {
          return true;
        }
        const expectedBlock = String(entry?.blockText || entry?.content || '').trim();
        if (!expectedBlock) return true;
        return nextText.includes(expectedBlock);
      });

      result.preservedOtherToolBlocks = preservedOtherToolBlocks;
      if (!preservedOtherToolBlocks) {
        result.conflictDetected = true;
        result.conflictReason = 'other_tool_block_removed';
      } else if (conflictReason) {
        result.conflictDetected = true;
        result.conflictReason = conflictReason;
      }

      const mergedOutputs = {
        ...existingOutputs,
        [toolId]: {
          toolId,
          content: appendContent,
          blockText: appendContent,
          blockType,
          blockIdentity,
          updatedAt: injectionEntry.updatedAt,
          sourceMessageId: injectionEntry.sourceMessageId || null
        }
      };

      const abortErrorBeforeLocalCommit = getWritebackAbortError(options);
      if (abortErrorBeforeLocalCommit) {
        result.error = abortErrorBeforeLocalCommit;
        return result;
      }

      targetMessage[key] = nextText;
      this._applyMessageText(targetMessage, nextText, options);
      targetMessage[MESSAGE_TOOL_OUTPUTS_KEY] = mergedOutputs;
      targetMessage[MESSAGE_TOOL_CONTEXT_KEY] = this._buildMessageInjectedContext(mergedOutputs);
      result.contentCommitted = true;
      result.commit.contentCommitted = true;
      result.steps.contentCommitted = true;
      result.steps.localTextApplied = true;

      this._syncMessageToRuntimeChats(runtime, messageIndex, targetMessage);
      result.steps.runtimeSynced = true;

      const abortErrorBeforeRefresh = getWritebackAbortError(options);
      if (abortErrorBeforeRefresh) {
        result.error = abortErrorBeforeRefresh;
        return result;
      }

      await this._requestAssistantMessageRefresh(runtime, messageIndex, nextText, options, result);

      const saveChat = context?.saveChat || runtime?.api?.saveChat || null;
      const saveChatDebounced = context?.saveChatDebounced || runtime?.api?.saveChatDebounced || null;

      if (typeof saveChatDebounced === 'function') {
        saveChatDebounced.call(context || api);
        result.steps.saveChatDebounced = true;
        result.refreshRequested = true;
        appendUniqueMethod(result.refresh.requestMethods, 'saveChatDebounced');
      }

      if (typeof saveChat === 'function') {
        await saveChat.call(context || api);
        result.steps.saveChat = true;
        result.refreshRequested = true;
        appendUniqueMethod(result.refresh.requestMethods, 'saveChat');
      }

      const notifyResult = this._notifyMessageUpdated(runtime, messageIndex);
      result.steps.notifiedMessageUpdated = notifyResult?.emitted === true;
      result.refresh.eventSource = notifyResult?.source || '';
      result.refresh.eventName = notifyResult?.eventName || '';
      if (notifyResult?.error) {
        result.errors.push(`MESSAGE_UPDATED: ${notifyResult.error}`);
      }
      const expectedContent = String(injectionEntry.content || '').trim();
      if (result.steps.hostSetChatMessages || result.steps.hostSetChatMessage) {
        result.refreshRequested = true;
        appendUniqueMethod(result.refresh.requestMethods, result.hostUpdateMethod);
      }
      if (result.steps.notifiedMessageUpdated) {
        result.refreshRequested = true;
        appendUniqueMethod(result.refresh.requestMethods, `MESSAGE_UPDATED:${result.refresh.eventName || 'MESSAGE_UPDATED'}`);
      }
      result.steps.refreshRequested = result.refreshRequested;
      result.refresh.requested = result.refreshRequested;

      const refreshVerification = await this._confirmRefresh(runtime, chat, messageIndex, toolId, expectedContent, targetMessage);

      result.verification.textIncludesContent = refreshVerification.textIncludesContent;
      result.verification.mirrorStored = refreshVerification.mirrorStored;
      result.verification.refreshConfirmed = refreshVerification.refreshConfirmed;
      result.steps.verifiedAfterWrite = result.verification.textIncludesContent && result.verification.mirrorStored;
      result.refreshConfirmed = result.verification.refreshConfirmed && result.refreshRequested;
      result.refresh.confirmChecks = Number(refreshVerification.confirmChecks) || 0;
      result.refresh.confirmedBy = refreshVerification.confirmedBy || '';
      result.refresh.confirmed = result.refreshConfirmed;
      result.steps.refreshConfirmed = result.refreshConfirmed;
      result.success = result.steps.localTextApplied
        && result.steps.runtimeSynced
        && result.steps.verifiedAfterWrite
        && result.refreshConfirmed;
      result.writebackStatus = result.success
        ? WRITEBACK_RESULT_STATUS.SUCCESS
        : WRITEBACK_RESULT_STATUS.FAILED;

      if (!result.success && !result.error) {
        result.error = result.refreshRequested
          ? '工具结果已提交，但宿主刷新确认未通过'
          : '工具结果已尝试写回，但最终校验未通过';
      }

      if (result.conflictDetected && !result.error) {
        result.error = `工具结果已写回，但检测到块冲突：${result.conflictReason}`;
      }

      this._log(`已将工具输出写入绑定 assistant 槽位: ${toolId} -> #${messageIndex}`);
      return result;
    } catch (error) {
      this._log('插入最新 AI 回复原文失败', error);
      result.error = error?.message || String(error);
      result.errors.push(result.error);
      return result;
    }
  }

  getAssistantMessageSnapshot(sourceMessageId = null) {
    try {
      const runtime = this._getChatRuntime();
      const { chat } = runtime;
      const messageIndex = this._findAssistantMessageIndex(chat, sourceMessageId);
      if (messageIndex < 0) {
        return null;
      }

      const message = chat[messageIndex] || null;
      const messageText = this._getWritableMessageField(message).text || '';
      const toolOutputs = message?.[MESSAGE_TOOL_OUTPUTS_KEY] && typeof message[MESSAGE_TOOL_OUTPUTS_KEY] === 'object'
        ? message[MESSAGE_TOOL_OUTPUTS_KEY]
        : {};
      const baseText = Object.values(toolOutputs).reduce((currentText, entry) => {
        const blockText = String(entry?.blockText || entry?.content || '').trim();
        if (!blockText || !currentText.includes(blockText)) {
          return currentText;
        }
        return currentText.replace(blockText, '').trimEnd();
      }, String(messageText || '')).trim();

      return {
        messageIndex,
        message,
        messageText,
        baseText,
        toolOutputs,
        injectedContext: typeof message?.[MESSAGE_TOOL_CONTEXT_KEY] === 'string'
          ? message[MESSAGE_TOOL_CONTEXT_KEY]
          : this._buildMessageInjectedContext(toolOutputs)
      };
    } catch (error) {
      this._log('读取 assistant 消息快照失败', error);
      return null;
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
    log.debug(args[0], args.length > 1 ? args.slice(1) : undefined);
  }
}

// ============================================================
// 单例实例
// ============================================================

export const contextInjector = new ContextInjector();
export {
  DEFAULT_INJECTION_OPTIONS,
  WRITEBACK_RESULT_STATUS,
  WRITEBACK_METHODS,
  ContextInjector
};
export default contextInjector;