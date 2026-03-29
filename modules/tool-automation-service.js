/**
 * YouYou Toolkit - 自动化生命周期服务
 * @description 直接以宿主消息事件驱动自动触发、自动写回与刷新确认
 */

import { settingsService } from './core/settings-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';
import { getAllToolFullConfigs, patchToolRuntime } from './tool-registry.js';
import { toolOutputService, TOOL_WRITEBACK_STATUS } from './tool-output-service.js';
import { buildExecutionContextForMessage } from './tool-execution-context.js';

const AUTO_RUNTIME_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  SUCCESS: 'success',
  ERROR: 'error',
  SKIPPED: 'skipped'
};

function normalizeIdentityValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function getTopWindow() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent;
    }
  } catch (error) {
    // ignore cross-window access errors
  }

  return window;
}

function getHostApi() {
  return getTopWindow()?.SillyTavern || null;
}

function getHostEventSource(api) {
  return api?.eventSource || null;
}

function getHostEventTypes(api) {
  return api?.eventTypes || {};
}

function getCurrentChatId(api) {
  const context = api?.getContext?.() || null;
  return normalizeIdentityValue(
    context?.chatId
    ?? context?.chat_id
    ?? api?.chatId
    ?? api?.chat_id
    ?? api?.chat_filename
    ?? api?.this_chid
    ?? 'chat_default'
  ) || 'chat_default';
}

function createResolvedMessageKey(messageId, swipeId = '') {
  return `${normalizeIdentityValue(messageId) || 'latest'}::${normalizeIdentityValue(swipeId) || 'swipe:current'}`;
}

function isSameSlotEvent(eventName = '') {
  return [
    'MESSAGE_UPDATED',
    'MESSAGE_SWIPED',
    'GENERATION_AFTER_COMMANDS',
    'GENERATION_ENDED'
  ].includes(String(eventName || '').trim());
}

class ToolAutomationService {
  constructor() {
    this._stopCallbacks = [];
    this._pendingMessageTimers = new Map();
    this._handledGenerations = new Set();
    this._slotQueues = new Map();
    this._currentChatId = '';
    this._isDuringExtraAnalysis = false;
    this._isProcessingMessage = false;
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

    this._currentChatId = getCurrentChatId(api);
    const eventSource = getHostEventSource(api);
    const eventTypes = getHostEventTypes(api);
    const subscribe = typeof eventSource?.on === 'function'
      ? eventSource.on.bind(eventSource)
      : (typeof eventSource?.addListener === 'function' ? eventSource.addListener.bind(eventSource) : null);
    const unsubscribe = typeof eventSource?.off === 'function'
      ? eventSource.off.bind(eventSource)
      : (typeof eventSource?.removeListener === 'function' ? eventSource.removeListener.bind(eventSource) : null);

    if (!subscribe || !unsubscribe) {
      return false;
    }

    const bindHostEvent = (eventName, handler) => {
      if (!eventName || typeof handler !== 'function') return;
      subscribe(eventName, handler);
      this._stopCallbacks.push(() => {
        try {
          unsubscribe(eventName, handler);
        } catch (error) {
          this._log('取消宿主事件失败', eventName, error);
        }
      });
    };

    const scheduleFromEvent = (eventName, messageId, payload, options = {}) => {
      const resolvedMessageId = this._resolveIncomingMessageId(messageId, payload);
      const swipeId = this._resolveIncomingSwipeId(payload);
      const settleMs = Number.isFinite(options?.settleMs)
        ? options.settleMs
        : this._getAutomationSettings().settleMs;

      this._log(eventName, { messageId: resolvedMessageId, swipeId, payload });
      if (resolvedMessageId) {
        this._scheduleMessageProcessing(resolvedMessageId, swipeId, { settleMs });
        return;
      }

      if (isSameSlotEvent(eventName)) {
        this._scheduleCurrentAssistantProcessing({ settleMs, sourceEvent: eventName });
      }
    };

    bindHostEvent(eventTypes.MESSAGE_SENT || 'MESSAGE_SENT', (...args) => {
      this._log('MESSAGE_SENT', args);
    });

    bindHostEvent(eventTypes.MESSAGE_RECEIVED || 'MESSAGE_RECEIVED', (messageId, payload) => {
      scheduleFromEvent(eventTypes.MESSAGE_RECEIVED || 'MESSAGE_RECEIVED', messageId, payload);
    });

    bindHostEvent(eventTypes.MESSAGE_UPDATED || 'MESSAGE_UPDATED', (messageId, payload) => {
      scheduleFromEvent(eventTypes.MESSAGE_UPDATED || 'MESSAGE_UPDATED', messageId, payload, {
        settleMs: Math.max(0, this._getAutomationSettings().settleMs)
      });
    });

    bindHostEvent(eventTypes.MESSAGE_SWIPED || 'MESSAGE_SWIPED', (messageId, payload) => {
      scheduleFromEvent(eventTypes.MESSAGE_SWIPED || 'MESSAGE_SWIPED', messageId, payload);
    });

    bindHostEvent(eventTypes.GENERATION_AFTER_COMMANDS || 'GENERATION_AFTER_COMMANDS', (messageId, payload) => {
      scheduleFromEvent(eventTypes.GENERATION_AFTER_COMMANDS || 'GENERATION_AFTER_COMMANDS', messageId, payload);
    });

    bindHostEvent(eventTypes.GENERATION_ENDED || 'GENERATION_ENDED', (messageId, payload) => {
      scheduleFromEvent(eventTypes.GENERATION_ENDED || 'GENERATION_ENDED', messageId, payload);
    });

    bindHostEvent(eventTypes.CHAT_CHANGED || 'CHAT_CHANGED', () => {
      this._resetForChatChange();
    });

    bindHostEvent(eventTypes.MESSAGE_DELETED || 'MESSAGE_DELETED', (messageId) => {
      this._clearMessageState(messageId);
    });

    this._stopCallbacks.push(eventBus.on(EVENTS.SETTINGS_UPDATED, () => {
      this._enabled = this.isEnabled();
    }));

    this._enabled = this.isEnabled();
    return true;
  }

  stop() {
    this._stopCallbacks.forEach((stop) => {
      try {
        stop();
      } catch (error) {
        this._log('停止自动服务回调失败', error);
      }
    });
    this._stopCallbacks = [];

    this._pendingMessageTimers.forEach((timerId) => clearTimeout(timerId));
    this._pendingMessageTimers.clear();
    this._slotQueues.clear();
    this._handledGenerations.clear();
    this._isDuringExtraAnalysis = false;
    this._isProcessingMessage = false;
    this._enabled = false;
  }

  isEnabled() {
    const automation = this._getAutomationSettings();
    return automation.enabled === true && automation.autoRequestEnabled === true;
  }

  getRuntimeSnapshot() {
    return {
      currentChatId: this._currentChatId,
      isDuringExtraAnalysis: this._isDuringExtraAnalysis,
      isProcessingMessage: this._isProcessingMessage,
      pendingMessageCount: this._pendingMessageTimers.size,
      handledGenerationCount: this._handledGenerations.size,
      queuedSlotCount: this._slotQueues.size,
      enabled: this._enabled
    };
  }

  async processCurrentAssistantMessage(options = {}) {
    const context = await buildExecutionContextForMessage({
      messageId: '',
      swipeId: '',
      runSource: 'AUTO'
    });
    const targetMessageId = normalizeIdentityValue(context?.sourceMessageId || context?.messageId);
    if (!targetMessageId) {
      return { success: false, error: '未找到当前 assistant 楼层' };
    }
    return this.processAssistantMessage(targetMessageId, { force: options.force === true });
  }

  async processAssistantMessage(messageId, { force = false, swipeId = '' } = {}) {
    if (!messageId) {
      return { success: false, error: '缺少 messageId' };
    }

    if (!this.isEnabled() && !force) {
      return { success: false, skipped: true, reason: 'automation_disabled' };
    }

    const context = await buildExecutionContextForMessage({
      messageId,
      swipeId,
      runSource: 'AUTO'
    });
    const targetMessage = context?.targetAssistantMessage || null;
    if (!targetMessage || !context?.sourceMessageId) {
      return { success: false, skipped: true, reason: 'assistant_message_not_found' };
    }

    const messageText = String(targetMessage.content || '').trim();
    if (!messageText || messageText.length < 8) {
      return { success: false, skipped: true, reason: 'assistant_message_too_short' };
    }

    const generationKey = context.slotRevisionKey || '';
    if (!force && generationKey && this._handledGenerations.has(generationKey)) {
      return { success: false, skipped: true, reason: 'generation_already_handled' };
    }

    const tools = toolOutputService.filterAutoPostResponseTools(getAllToolFullConfigs());
    if (!tools.length) {
      return { success: false, skipped: true, reason: 'no_auto_tools' };
    }

    const queueKey = context.slotBindingKey || createResolvedMessageKey(context.sourceMessageId, context.sourceSwipeId);
    return this._enqueueSlot(queueKey, async () => {
      this._isProcessingMessage = true;
      this._isDuringExtraAnalysis = true;

      let allSucceeded = true;
      const results = [];

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

          this._markToolAutoRuntime(tool.id, {
            lastAutoStatus: AUTO_RUNTIME_STATUS.RUNNING,
            lastAutoMessageId: context.sourceMessageId || '',
            lastAutoSwipeId: context.sourceSwipeId || '',
            lastAutoRevisionKey: context.slotRevisionKey || '',
            lastAutoWritebackStatus: '',
            lastAutoRefreshConfirmed: false,
            lastAutoSkipReason: ''
          }, { touchLastRunAt: true });

          const result = await toolOutputService.runToolPostResponse(tool, toolContext);
          results.push(result);

          const success = result?.success === true
            && result?.meta?.writebackStatus === TOOL_WRITEBACK_STATUS.SUCCESS
            && result?.meta?.writebackDetails?.refreshConfirmed === true;

          this._markToolAutoRuntime(tool.id, {
            lastAutoStatus: success ? AUTO_RUNTIME_STATUS.SUCCESS : AUTO_RUNTIME_STATUS.ERROR,
            lastAutoMessageId: context.sourceMessageId || '',
            lastAutoSwipeId: context.sourceSwipeId || '',
            lastAutoRevisionKey: context.slotRevisionKey || '',
            lastAutoWritebackStatus: result?.meta?.writebackStatus || '',
            lastAutoRefreshConfirmed: result?.meta?.writebackDetails?.refreshConfirmed === true,
            lastAutoSkipReason: success ? '' : (result?.error || result?.meta?.failureStage || 'auto_execution_failed')
          }, { touchLastRunAt: true });

          if (!success) {
            allSucceeded = false;
          }
        }

        if (allSucceeded && generationKey) {
          this._handledGenerations.add(generationKey);
        }

        return {
          success: allSucceeded,
          results,
          generationKey,
          messageId: context.sourceMessageId || ''
        };
      } finally {
        this._isDuringExtraAnalysis = false;
        this._isProcessingMessage = false;
      }
    });
  }

  _markToolAutoRuntime(toolId, runtimePartial = {}, options = {}) {
    const nextRuntime = {
      ...(runtimePartial || {})
    };

    if (options.touchLastRunAt === true) {
      nextRuntime.lastAutoRunAt = Date.now();
    }

    patchToolRuntime(toolId, nextRuntime, {
      touchLastRunAt: false,
      emitEvent: true
    });
  }

  _resolveIncomingMessageId(messageId, payload) {
    return normalizeIdentityValue(
      messageId
      ?? payload?.messageId
      ?? payload?.message_id
      ?? payload?.id
      ?? payload?.message?.messageId
      ?? payload?.message?.message_id
      ?? payload?.message?.id
      ?? payload?.message?.mesid
      ?? payload?.message?.chat_index
      ?? payload?.data?.messageId
      ?? payload?.data?.message_id
      ?? payload?.data?.id
      ?? payload?.target?.messageId
      ?? payload?.target?.message_id
      ?? payload?.target?.id
      ?? ''
    );
  }

  _resolveIncomingSwipeId(payload) {
    return normalizeIdentityValue(
      payload?.swipeId
      ?? payload?.swipe_id
      ?? payload?.swipe
      ?? payload?.swipeIndex
      ?? payload?.currentSwipe
      ?? payload?.message?.swipeId
      ?? payload?.message?.swipe_id
      ?? payload?.message?.swipe
      ?? payload?.message?.swipeIndex
      ?? payload?.data?.swipeId
      ?? payload?.data?.swipe_id
      ?? payload?.data?.swipe
      ?? payload?.target?.swipeId
      ?? payload?.target?.swipe_id
      ?? payload?.target?.swipe
      ?? ''
    );
  }

  _scheduleCurrentAssistantProcessing(options = {}) {
    if (!this.isEnabled()) {
      return;
    }

    const settleMs = Number.isFinite(options?.settleMs)
      ? options.settleMs
      : this._getAutomationSettings().settleMs;
    const timerKey = `current-assistant::${normalizeIdentityValue(options?.sourceEvent) || 'unknown'}`;
    const existingTimer = this._pendingMessageTimers.get(timerKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timerId = setTimeout(() => {
      this._pendingMessageTimers.delete(timerKey);
      this.processCurrentAssistantMessage().catch((error) => {
        this._log('自动处理当前 assistant 消息失败', error);
      });
    }, Math.max(0, settleMs));

    this._pendingMessageTimers.set(timerKey, timerId);
  }

  _scheduleMessageProcessing(messageId, swipeId = '', options = {}) {
    if (!this.isEnabled()) {
      return;
    }

    const settleMs = Number.isFinite(options?.settleMs)
      ? options.settleMs
      : this._getAutomationSettings().settleMs;
    const timerKey = createResolvedMessageKey(messageId, swipeId);
    const existingTimer = this._pendingMessageTimers.get(timerKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timerId = setTimeout(() => {
      this._pendingMessageTimers.delete(timerKey);
      this.processAssistantMessage(messageId, { swipeId }).catch((error) => {
        this._log('自动处理 assistant 消息失败', error);
      });
    }, Math.max(0, settleMs));

    this._pendingMessageTimers.set(timerKey, timerId);
  }

  _resetForChatChange() {
    const api = getHostApi();
    this._currentChatId = getCurrentChatId(api);
    this._pendingMessageTimers.forEach((timerId) => clearTimeout(timerId));
    this._pendingMessageTimers.clear();
    this._slotQueues.clear();
    this._handledGenerations.clear();
    this._isDuringExtraAnalysis = false;
    this._isProcessingMessage = false;
  }

  _clearMessageState(messageId) {
    const normalizedMessageId = normalizeIdentityValue(messageId);
    if (!normalizedMessageId) return;

    Array.from(this._pendingMessageTimers.entries()).forEach(([key, timerId]) => {
      if (key.startsWith(`${normalizedMessageId}::`)) {
        clearTimeout(timerId);
        this._pendingMessageTimers.delete(key);
      }
    });

    Array.from(this._handledGenerations).forEach((generationKey) => {
      if (generationKey.includes(`::${normalizedMessageId}::`) || generationKey.includes(`${normalizedMessageId}::`)) {
        this._handledGenerations.delete(generationKey);
      }
    });
  }

  _enqueueSlot(slotKey, runner) {
    const previous = this._slotQueues.get(slotKey) || Promise.resolve();
    const next = previous
      .catch(() => {})
      .then(runner)
      .finally(() => {
        if (this._slotQueues.get(slotKey) === next) {
          this._slotQueues.delete(slotKey);
        }
      });

    this._slotQueues.set(slotKey, next);
    return next;
  }

  _getAutomationSettings() {
    const automation = settingsService.getSettings()?.automation || {};
    return {
      enabled: automation.enabled === true,
      autoRequestEnabled: automation.autoRequestEnabled !== false,
      settleMs: Number.isFinite(automation.settleMs) ? automation.settleMs : 1200,
      cooldownMs: Number.isFinite(automation.cooldownMs) ? automation.cooldownMs : 5000,
      maxConcurrentSlots: Number.isFinite(automation.maxConcurrentSlots) ? automation.maxConcurrentSlots : 1
    };
  }

  _log(...args) {
    if (this.debugMode || settingsService.getDebugSettings()?.enableDebugLog) {
      console.log('[ToolAutomationService]', ...args);
    }
  }
}

export const toolAutomationService = new ToolAutomationService();
export { AUTO_RUNTIME_STATUS, ToolAutomationService };
export default toolAutomationService;
