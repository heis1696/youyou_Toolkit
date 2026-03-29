/**
 * YouYou Toolkit - 自动化生命周期服务
 * @description 基于 MVU 简化版的自动触发、自动注入、自动刷新
 */

import { settingsService } from './core/settings-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';
import { getAllToolFullConfigs } from './tool-registry.js';
import { toolOutputService } from './tool-output-service.js';
import { buildExecutionContextForMessage } from './tool-execution-context.js';

function getTopWindow() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent;
    }
  } catch (error) {
    // ignore
  }
  return window;
}

function getHostApi() {
  return getTopWindow()?.SillyTavern || null;
}

class ToolAutomationService {
  constructor() {
    this._stopCallbacks = [];
    this._currentChatId = '';
    this._isDuringExtraAnalysis = false;
    this._enabled = false;
    this.debugMode = false;
  }

  setDebugMode(enabled) {
    this.debugMode = enabled === true;
  }

  init() {
    this.stop();

    const api = getHostApi();
    if (!api) {
      return false;
    }

    this._currentChatId = this._getCurrentChatId(api);
    const eventSource = api?.eventSource;
    const eventTypes = api?.eventTypes || {};

    if (!eventSource || typeof eventSource.on !== 'function') {
      return false;
    }

    const bindEvent = (eventName, handler) => {
      if (!eventName || typeof handler !== 'function') return;
      eventSource.on(eventName, handler);
      this._stopCallbacks.push(() => {
        try {
          if (typeof eventSource.off === 'function') {
            eventSource.off(eventName, handler);
          }
        } catch (error) {
          this._log('取消事件失败', eventName, error);
        }
      });
    };

    bindEvent(eventTypes.MESSAGE_RECEIVED || 'MESSAGE_RECEIVED', (messageId) => {
      this._onMessageReceived(messageId);
    });

    bindEvent(eventTypes.CHAT_CHANGED || 'CHAT_CHANGED', () => {
      this._onChatChanged();
    });

    this._stopCallbacks.push(eventBus.on(EVENTS.SETTINGS_UPDATED, () => {
      this._enabled = this.isEnabled();
    }));

    this._enabled = this.isEnabled();
    this._log('自动化服务已初始化');
    return true;
  }

  stop() {
    this._stopCallbacks.forEach((stop) => {
      try {
        stop();
      } catch (error) {
        this._log('停止回调失败', error);
      }
    });
    this._stopCallbacks = [];
    this._isDuringExtraAnalysis = false;
    this._enabled = false;
  }

  isEnabled() {
    const automation = settingsService.getSettings()?.automation || {};
    return automation.enabled === true && automation.autoRequestEnabled === true;
  }

  getRuntimeSnapshot() {
    return {
      currentChatId: this._currentChatId,
      isDuringExtraAnalysis: this._isDuringExtraAnalysis,
      enabled: this._enabled
    };
  }

  async _onMessageReceived(messageId) {
    if (!this.isEnabled()) {
      return;
    }

    if (this._isDuringExtraAnalysis) {
      this._log('正在进行额外分析，跳过');
      return;
    }

    const api = getHostApi();
    if (!api) return;

    const chat = api.chat || [];
    if (chat.length <= 1) {
      this._log('第一条消息，跳过自动触发');
      return;
    }

    const context = await buildExecutionContextForMessage({
      messageId: String(messageId || ''),
      swipeId: '',
      runSource: 'AUTO'
    });

    const targetMessage = context?.targetAssistantMessage;
    if (!targetMessage) {
      this._log('未找到目标消息');
      return;
    }

    const messageText = String(targetMessage.content || '').trim();
    if (messageText.length < 5) {
      this._log('消息太短，跳过');
      return;
    }

    const tools = toolOutputService.filterAutoPostResponseTools(getAllToolFullConfigs());
    if (!tools.length) {
      this._log('没有启用自动的工具');
      return;
    }

    this._isDuringExtraAnalysis = true;

    try {
      for (const tool of tools) {
        const toolContext = {
          ...context,
          input: {
            ...(context.input || {}),
            lastAiMessage: context.lastAiMessage,
            assistantBaseText: context.assistantBaseText
          }
        };

        const result = await toolOutputService.runToolPostResponse(tool, toolContext);

        if (result?.success && result?.output) {
          await this._injectToolOutput(context.sourceMessageId, result.output);
        }
      }
    } catch (error) {
      this._log('自动执行失败', error);
    } finally {
      this._isDuringExtraAnalysis = false;
    }
  }

  async _injectToolOutput(messageId, output) {
    const api = getHostApi();
    if (!api) return;

    const chat = api.chat || [];
    const msgIndex = this._findMessageIndex(chat, messageId);
    if (msgIndex < 0) {
      this._log('未找到消息索引');
      return;
    }

    const message = chat[msgIndex];
    const currentText = this._getMessageText(message);
    const newText = `${currentText.trimEnd()}\n\n${output}`;

    this._setMessageText(message, newText);

    if (typeof api.setChatMessages === 'function') {
      await api.setChatMessages([{
        message_id: msgIndex,
        message: newText
      }], {
        refresh: 'affected'
      });
    }

    if (typeof api.saveChat === 'function') {
      await api.saveChat();
    }

    this._log('工具输出已注入并刷新');
  }

  _findMessageIndex(chat, messageId) {
    if (!Array.isArray(chat)) return -1;

    const normalizedId = String(messageId || '').trim();
    if (!normalizedId) {
      for (let i = chat.length - 1; i >= 0; i--) {
        if (!chat[i].is_user && !chat[i].is_system) {
          return i;
        }
      }
      return -1;
    }

    for (let i = chat.length - 1; i >= 0; i--) {
      const msg = chat[i];
      const candidates = [
        msg.message_id,
        msg.id,
        msg.messageId,
        i
      ].map(v => String(v || '').trim());

      if (candidates.includes(normalizedId)) {
        return i;
      }
    }

    return -1;
  }

  _getMessageText(message) {
    if (!message) return '';
    return message.mes || message.message || message.content || message.text || '';
  }

  _setMessageText(message, text) {
    if (!message) return;
    message.mes = text;
    message.message = text;
    if (message.content !== undefined) message.content = text;
    if (message.text !== undefined) message.text = text;
  }

  _onChatChanged() {
    const api = getHostApi();
    this._currentChatId = this._getCurrentChatId(api);
    this._isDuringExtraAnalysis = false;
    this._log('聊天已切换', this._currentChatId);
  }

  _getCurrentChatId(api) {
    const context = api?.getContext?.() || null;
    return String(
      context?.chatId
      || context?.chat_id
      || api?.chatId
      || api?.chat_id
      || api?.this_chid
      || 'chat_default'
    ).trim() || 'chat_default';
  }

  _log(...args) {
    if (this.debugMode || settingsService.getDebugSettings()?.enableDebugLog) {
      console.log('[ToolAutomationService]', ...args);
    }
  }

  async processCurrentAssistantMessage() {
    return { success: false, error: '请使用手动执行' };
  }

  async processAssistantMessage() {
    return { success: false, error: '请使用手动执行' };
  }
}

export const toolAutomationService = new ToolAutomationService();
export { ToolAutomationService };
export default toolAutomationService;
