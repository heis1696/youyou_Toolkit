/**
 * YouYou Toolkit - 自动化生命周期服务 (MVU Transaction Rework)
 * @description 基于 generation-aware 事务模型的自动触发服务
 *
 * 核心改动（相对旧版）：
 *   1. 引入 Transaction 主模型，每次触发对应一个贯穿全链的事务对象
 *   2. generationKey = messageId + contentHash，同楼层 reroll/swipe 产生新内容视为新事务
 *   3. 宿主事件名统一归一化为大写，消除格式不匹配
 *   4. isEnabled() 增加首次失败诊断
 *   5. 提交点单一化，明确区分数据提交 vs UI 刷新确认
 */

import { settingsService } from './core/settings-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';
import { getAllToolFullConfigs, patchToolRuntime } from './tool-registry.js';
import { toolOutputService } from './tool-output-service.js';
import {
  buildExecutionContextForMessage
} from './tool-execution-context.js';

// ─── 工具函数 ───────────────────────────────────────────────

function normalizeIdentityValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function getTopWindow() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent;
    }
  } catch (_) { /* cross-origin */ }
  return window;
}

function getHostApi() {
  try {
    return getTopWindow()?.SillyTavern || null;
  } catch (_) {
    return null;
  }
}

function getHostContext(api) {
  try {
    return api?.getContext?.() || null;
  } catch (_) {
    return null;
  }
}

function describeEventSource(eventSource, label) {
  if (!eventSource) return null;
  const hasSubscribe = typeof eventSource?.on === 'function' || typeof eventSource?.addListener === 'function';
  const hasUnsubscribe = typeof eventSource?.off === 'function' || typeof eventSource?.removeListener === 'function';

  if (!hasSubscribe || !hasUnsubscribe) {
    return null;
  }

  return {
    eventSource,
    source: label,
    capabilities: {
      on: typeof eventSource?.on === 'function',
      off: typeof eventSource?.off === 'function',
      addListener: typeof eventSource?.addListener === 'function',
      removeListener: typeof eventSource?.removeListener === 'function'
    }
  };
}

function getHostEventSource(api) {
  const topWindow = getTopWindow();
  const context = getHostContext(api);
  const candidates = [
    describeEventSource(api?.eventSource, 'SillyTavern.eventSource'),
    describeEventSource(topWindow?.eventSource, 'topWindow.eventSource'),
    describeEventSource(context?.eventSource, 'SillyTavern.getContext().eventSource')
  ].filter(Boolean);

  return candidates[0] || {
    eventSource: null,
    source: 'unavailable',
    capabilities: {
      on: false,
      off: false,
      addListener: false,
      removeListener: false
    }
  };
}

function getHostEventTypes(api) {
  const context = getHostContext(api);
  return api?.eventTypes || context?.eventTypes || getTopWindow()?.event_types || {};
}

function getCurrentChatId(api) {
  const ctx = getHostContext(api);
  return normalizeIdentityValue(
    ctx?.chatId ?? ctx?.chat_id ?? api?.chatId ?? api?.chat_id
    ?? api?.chat_filename ?? api?.this_chid ?? 'chat_default'
  ) || 'chat_default';
}

function getCurrentChatMessages(api) {
  const context = getHostContext(api);
  if (Array.isArray(context?.chat)) {
    return context.chat;
  }

  if (Array.isArray(api?.chat)) {
    return api.chat;
  }

  return [];
}

function isAssistantMessage(message) {
  if (!message) return false;
  if (message?.is_user === true || message?.is_system === true) return false;

  const role = String(message?.role || '').trim().toLowerCase();
  if (role === 'user' || role === 'system') return false;
  return role === 'assistant' || role === 'ai' || !role;
}

function getChatMessageById(api, messageId) {
  const normalizedMessageId = normalizeIdentityValue(messageId);
  if (!normalizedMessageId) return null;

  const messages = getCurrentChatMessages(api);
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    const candidates = [
      message?.messageId,
      message?.message_id,
      message?.id,
      message?.mesid,
      message?.mid,
      message?.chat_index,
      index
    ].map((value) => normalizeIdentityValue(value));

    if (candidates.includes(normalizedMessageId)) {
      return message || null;
    }
  }

  return null;
}

function getLatestAssistantTarget(api) {
  const messages = getCurrentChatMessages(api);
  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  const lastIndex = messages.length - 1;
  const lastMessage = messages[lastIndex] || null;
  if (!isAssistantMessage(lastMessage)) {
    return null;
  }

  const resolvedMessageId = normalizeIdentityValue(
    lastMessage?.messageId
    ?? lastMessage?.message_id
    ?? lastMessage?.id
    ?? lastMessage?.mesid
    ?? lastMessage?.mid
    ?? lastMessage?.chat_index
    ?? lastIndex
  );

  if (!resolvedMessageId) {
    return null;
  }

  return {
    messageId: resolvedMessageId,
    swipeId: normalizeIdentityValue(
      lastMessage?.swipeId
      ?? lastMessage?.swipe_id
      ?? lastMessage?.swipe
      ?? lastMessage?.swipeIndex
    ),
    message: lastMessage
  };
}

/**
 * 将任意事件名归一化为 UPPER_SNAKE_CASE
 * 例：'message_received' → 'MESSAGE_RECEIVED'
 *     'messageReceived'  → 'MESSAGE_RECEIVED'
 *     'MESSAGE_RECEIVED' → 'MESSAGE_RECEIVED'
 */
function normalizeEventName(raw) {
  if (!raw) return '';
  let s = String(raw).trim();
  // camelCase / PascalCase → UPPER_SNAKE_CASE
  s = s.replace(/([a-z0-9])([A-Z])/g, '$1_$2');
  return s.toUpperCase();
}

/**
 * 简易内容哈希（djb2），用于区分同一 messageId 下不同 generation 的内容
 */
function quickContentHash(text) {
  const s = String(text || '');
  if (s.length === 0) return '0';
  let hash = 5381;
  const len = Math.min(s.length, 2000); // 只取前 2000 字符，性能保护
  for (let i = 0; i < len; i++) {
    hash = ((hash << 5) + hash + s.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

/**
 * 生成唯一 traceId
 */
function generateTraceId() {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `tx_${ts}_${rand}`;
}

// ─── 事务生命周期阶段 ──────────────────────────────────────

const TX_PHASE = Object.freeze({
  RECEIVED: 'received',
  CONFIRMED: 'confirmed',
  CONTEXT_BUILT: 'context_built',
  REQUEST_STARTED: 'request_started',
  REQUEST_FINISHED: 'request_finished',
  WRITEBACK_STARTED: 'writeback_started',
  WRITEBACK_COMMITTED: 'writeback_committed',
  REFRESH_CONFIRMED: 'refresh_confirmed',
  SKIPPED: 'skipped',
  FAILED: 'failed'
});

// ─── Transaction 事务对象 ───────────────────────────────────

class Transaction {
  constructor({ chatId, messageId, swipeId, sourceEvent, generationKey }) {
    this.traceId = generateTraceId();
    this.chatId = chatId || '';
    this.messageId = messageId || '';
    this.swipeId = swipeId || '';
    this.sourceEvent = sourceEvent || '';
    this.generationKey = generationKey || '';
    this.phase = TX_PHASE.RECEIVED;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.verdict = '';
    this.error = null;
    this.toolResults = [];
    this.writebackState = null;
    this.refreshState = null;
  }

  transition(phase, extra = {}) {
    this.phase = phase;
    this.updatedAt = Date.now();
    Object.assign(this, extra);
    return this;
  }

  toSnapshot() {
    return { ...this };
  }
}

// ─── 主服务 ─────────────────────────────────────────────────

class ToolAutomationService {
  constructor() {
    this._stopCallbacks = [];
    this._pendingTimers = new Map();
    this._completedGenerationKeys = new Map(); // generationKey → timestamp
    this._cancelledGenerationKeys = new Map(); // generationKey → timestamp
    this._slotQueues = new Map();
    this._activeTransactions = new Map(); // traceId -> transaction state
    this._isProcessing = false;
    this._currentChatId = '';
    this._enabled = false;
    this._enabledCheckedOnce = false; // 用于首次诊断
    this.debugMode = false;

    // 事务历史（最近 N 条），用于诊断
    this._transactionHistory = [];
    this._maxHistorySize = 30;
    this._hostBindingStatus = {
      initialized: false,
      initAttempts: 0,
      lastInitAt: 0,
      lastInitResult: 'idle',
      source: 'unavailable',
      hasEventSource: false,
      hasEventTypes: false,
      eventBindings: [],
      retryScheduled: false,
      retryDelayMs: 0,
      lastError: ''
    };
    this._initRetryTimer = null;
    this._messageReceivedThrottleUntil = 0;
  }

  // ── 公开方法 ──────────────────────────────────────────────

  setDebugMode(enabled) {
    this.debugMode = enabled === true;
  }

  init(options = {}) {
    this.stop();

    const api = getHostApi();
    const retryOnFailure = options.retryOnFailure !== false;
    const retryDelayMs = Number.isFinite(options.retryDelayMs) ? options.retryDelayMs : 1500;
    const attempt = Number.isFinite(options.attempt) ? options.attempt : 1;

    this._hostBindingStatus.initAttempts = attempt;
    this._hostBindingStatus.lastInitAt = Date.now();

    if (!api) {
      this._hostBindingStatus = {
        ...this._hostBindingStatus,
        initialized: false,
        lastInitResult: 'missing_api',
        source: 'unavailable',
        hasEventSource: false,
        hasEventTypes: false,
        eventBindings: [],
        lastError: '未找到宿主 API (SillyTavern)',
        retryScheduled: false,
        retryDelayMs: 0
      };
      this._log('初始化失败: 未找到宿主 API (SillyTavern)');
      return false;
    }

    this._currentChatId = getCurrentChatId(api);
    const hostEventSource = getHostEventSource(api);
    const eventSource = hostEventSource?.eventSource || null;
    const eventTypes = getHostEventTypes(api);
    const subscribe = typeof eventSource?.on === 'function'
      ? eventSource.on.bind(eventSource)
      : (typeof eventSource?.addListener === 'function' ? eventSource.addListener.bind(eventSource) : null);
    const unsubscribe = typeof eventSource?.off === 'function'
      ? eventSource.off.bind(eventSource)
      : (typeof eventSource?.removeListener === 'function' ? eventSource.removeListener.bind(eventSource) : null);

    const hasEventTypes = !!(eventTypes && Object.keys(eventTypes).length > 0);
    this._hostBindingStatus = {
      ...this._hostBindingStatus,
      source: hostEventSource?.source || 'unavailable',
      hasEventSource: !!eventSource,
      hasEventTypes,
      eventBindings: [],
      lastError: '',
      retryScheduled: false,
      retryDelayMs: 0,
      initialized: false,
      lastInitResult: 'binding'
    };

    if (!subscribe || !unsubscribe) {
      const lastError = '宿主 eventSource 缺少 on/off 方法';
      this._hostBindingStatus = {
        ...this._hostBindingStatus,
        lastInitResult: 'missing_event_source',
        lastError
      };
      this._log(`初始化失败: ${lastError}`, { source: this._hostBindingStatus.source });
      if (retryOnFailure) {
        this._scheduleInitRetry(retryDelayMs, attempt + 1);
      }
      return false;
    }

    // 打印宿主事件类型映射，帮助排查
    this._log('宿主 eventTypes 映射:', JSON.stringify(eventTypes, null, 2));

    const bindHostEvent = (rawEventName, handler) => {
      if (!rawEventName || typeof handler !== 'function') return;
      const actualName = rawEventName;
      subscribe(actualName, handler);
      this._hostBindingStatus.eventBindings = [
        ...this._hostBindingStatus.eventBindings,
        `${actualName} -> ${normalizeEventName(actualName)}`
      ];
      this._stopCallbacks.push(() => {
        try { unsubscribe(actualName, handler); } catch (e) { this._log('取消事件失败', actualName, e); }
      });
      this._log(`已绑定宿主事件: "${actualName}" (归一化: ${normalizeEventName(actualName)})`);
    };

    // 统一的调度入口：异步获取最新 assistant 消息，通过前置守卫后进入处理队列。
    // 不再使用 generation gate / fallback 等复杂门控，仅依赖内容去重 + 互斥锁。
    const scheduleFromEvent = (rawEventName, ...args) => {
      const normalizedEvent = normalizeEventName(rawEventName);
      const { messageId, swipeId } = this._extractIdentitiesFromArgs(args);

      this._log(`收到宿主事件 "${rawEventName}" → "${normalizedEvent}"`, { messageId, swipeId, argCount: args.length });

      if (!this._checkEnabled()) return;

      // MESSAGE_RECEIVED 3 秒节流（参考 MagVarUpdate-beta）
      if (normalizedEvent === 'MESSAGE_RECEIVED') {
        const now = Date.now();
        if (now < this._messageReceivedThrottleUntil) {
          this._log(`MESSAGE_RECEIVED 在节流窗口内，跳过（剩余 ${this._messageReceivedThrottleUntil - now}ms）`);
          return;
        }
        this._messageReceivedThrottleUntil = now + 3000;
      }

      // 解析目标消息
      let targetMessage = null;
      let targetMessageId = messageId;
      let targetSwipeId = swipeId;

      if (targetMessageId) {
        targetMessage = getChatMessageById(api, targetMessageId);
      }

      // 没有 messageId 时回退到最新 assistant
      if (!targetMessage) {
        const latestTarget = getLatestAssistantTarget(api);
        if (latestTarget?.messageId) {
          targetMessage = latestTarget.message;
          targetMessageId = latestTarget.messageId;
          targetSwipeId = latestTarget.swipeId || targetSwipeId;
        }
      }

      if (!targetMessageId || !targetMessage) {
        this._log(`事件 "${normalizedEvent}" 无 assistant 目标，跳过`);
        return;
      }

      if (!isAssistantMessage(targetMessage)) {
        this._log(`事件 "${normalizedEvent}" 命中非 assistant 消息，跳过`, { messageId: targetMessageId });
        return;
      }

      // 简单内容守卫（参考 MVU：过滤流式占位符及空内容）
      const messageText = String(targetMessage.content || targetMessage.mes || '').trim();
      if (!messageText || messageText.length < 5) {
        this._log(`事件 "${normalizedEvent}" 消息过短（${messageText.length} 字符），跳过`);
        return;
      }

      // 互斥锁
      if (this._isProcessing) {
        this._log(`事件 "${normalizedEvent}" 正在处理中，跳过`);
        return;
      }

      this._scheduleMessageProcessing(targetMessageId, targetSwipeId, {
        settleMs: this._getSettleMs(),
        sourceEvent: normalizedEvent
      });
    };

    bindHostEvent(eventTypes.MESSAGE_SENT || 'message_sent', () => {
      this._log('MESSAGE_SENT → 清理调度队列');
      this._pendingTimers.forEach(id => clearTimeout(id));
      this._pendingTimers.clear();
    });

    bindHostEvent(eventTypes.MESSAGE_RECEIVED || 'message_received', (...args) => {
      scheduleFromEvent(eventTypes.MESSAGE_RECEIVED || 'message_received', ...args);
    });

    bindHostEvent(eventTypes.GENERATION_ENDED || 'generation_ended', (...args) => {
      scheduleFromEvent(eventTypes.GENERATION_ENDED || 'generation_ended', ...args);
    });

    bindHostEvent(eventTypes.CHAT_CHANGED || 'chat_changed', () => {
      this._resetForChatChange();
    });

    bindHostEvent(eventTypes.MESSAGE_DELETED || 'message_deleted', (messageId) => {
      this._clearMessageState(normalizeIdentityValue(messageId));
    });

    this._stopCallbacks.push(eventBus.on(EVENTS.SETTINGS_UPDATED, () => {
      const wasEnabled = this._enabled;
      this._enabled = this._evaluateEnabled();
      if (wasEnabled !== this._enabled) {
        this._log(`自动化状态变更: ${wasEnabled} → ${this._enabled}`);
      }
    }));

    this._enabled = this._evaluateEnabled();
    this._enabledCheckedOnce = false;
    this._hostBindingStatus = {
      ...this._hostBindingStatus,
      initialized: true,
      lastInitResult: 'ready',
      retryScheduled: false,
      retryDelayMs: 0,
      lastError: ''
    };
    this._log('自动化服务已初始化', {
      enabled: this._enabled,
      chatId: this._currentChatId,
      source: this._hostBindingStatus.source
    });
    return true;
  }

  stop() {
    this._stopCallbacks.forEach(fn => { try { fn(); } catch (e) { this._log('停止回调失败', e); } });
    this._stopCallbacks = [];
    this._pendingTimers.forEach(id => clearTimeout(id));
    this._pendingTimers.clear();
    this._slotQueues.clear();
    this._completedGenerationKeys.clear();
    this._cancelledGenerationKeys.clear();
    this._cancelActiveTransactions('service_stopped');
    this._activeTransactions.clear();
    this._isProcessing = false;
    this._enabled = false;
    this._enabledCheckedOnce = false;
    if (this._initRetryTimer) {
      clearTimeout(this._initRetryTimer);
      this._initRetryTimer = null;
    }
    this._hostBindingStatus = {
      initialized: false,
      initAttempts: 0,
      lastInitAt: 0,
      lastInitResult: 'idle',
      source: 'unavailable',
      hasEventSource: false,
      hasEventTypes: false,
      eventBindings: [],
      retryScheduled: false,
      retryDelayMs: 0,
      lastError: ''
    };
  }

  isEnabled() {
    return this._enabled;
  }

  getRuntimeSnapshot() {
    this._pruneCompletedKeys();
    this._pruneCancelledKeys();
    return {
      currentChatId: this._currentChatId,
      enabled: this._enabled,
      isProcessing: this._isProcessing,
      pendingTimerCount: this._pendingTimers.size,
      queuedSlotCount: this._slotQueues.size,
      completedGenerationKeyCount: this._completedGenerationKeys.size,
      cancelledGenerationKeyCount: this._cancelledGenerationKeys.size,
      activeTransactionCount: this._activeTransactions.size,
      recentTransactions: this._transactionHistory.slice(-10).map(tx => tx.toSnapshot()),
      hostBinding: {
        ...this._hostBindingStatus,
        eventBindings: Array.isArray(this._hostBindingStatus?.eventBindings)
          ? [...this._hostBindingStatus.eventBindings]
          : []
      },
      settings: this._getAutomationSettings()
    };
  }

  /**
   * 手动触发处理当前最新 assistant 楼层
   */
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
    return this.processAssistantMessage(targetMessageId, {
      force: options.force === true,
      swipeId: normalizeIdentityValue(context?.sourceSwipeId),
      sourceEvent: options.sourceEvent || 'MANUAL_CURRENT_ASSISTANT'
    });
  }

  /**
   * 核心处理入口：处理指定 assistant 消息
   * 
   * 借鉴 MVU 的额外模型解析机制：
   * 1. 自动触发：通过事件监听在 AI 回复后自动执行
   * 2. 自动写回：将工具输出结果追加到原消息（类似 MVU 的 setChatMessages）
   * 3. 自动刷新：更新消息的 variables 字段（类似 MVU 的 handleVariablesInMessage）
   */
  async processAssistantMessage(messageId, {
    force = false,
    swipeId = '',
    sourceEvent = 'AUTO'
  } = {}) {
    const tx = new Transaction({
      chatId: this._currentChatId,
      messageId,
      swipeId,
      sourceEvent
    });

    try {
      // ── Phase: RECEIVED ──
      if (!messageId) {
        return this._skipTransaction(tx, 'missing_message_id');
      }

      if (!this._checkEnabled() && !force) {
        return this._skipTransaction(tx, 'automation_disabled');
      }

      // ── Phase: CONFIRMED → 构建上下文 ──
      tx.transition(TX_PHASE.CONFIRMED);

      const context = await buildExecutionContextForMessage({
        messageId,
        swipeId,
        runSource: 'AUTO'
      });

      const targetMessage = context?.targetAssistantMessage || null;
      if (!targetMessage || !context?.sourceMessageId) {
        return this._skipTransaction(tx, 'assistant_message_not_found');
      }

      const messageText = String(targetMessage.content || targetMessage.mes || '').trim();
      if (!messageText || messageText.length < 5) {
        return this._skipTransaction(tx, 'assistant_message_too_short');
      }

      // ── Phase: CONTEXT_BUILT → generation-aware 去重 ──
      tx.transition(TX_PHASE.CONTEXT_BUILT);

      // 生成 generationKey = messageId::contentHash
      const contentHash = quickContentHash(messageText);
      const generationKey = `${normalizeIdentityValue(context.sourceMessageId)}::${contentHash}`;
      tx.generationKey = generationKey;

      if (!force && this._hasCompletedGeneration(generationKey)) {
        return this._skipTransaction(tx, 'duplicate_generation', { generationKey });
      }

      if (!force && this._isGenerationCancelled(generationKey)) {
        return this._skipTransaction(tx, 'cancelled_generation', { generationKey });
      }

      // 获取需要自动运行的工具
      const tools = toolOutputService.filterAutoPostResponseTools(getAllToolFullConfigs());
      if (!tools.length) {
        return this._skipTransaction(tx, 'no_auto_tools', { tools });
      }

      // ── Phase: REQUEST_STARTED → 排队执行 ──
      const slotKey = `${normalizeIdentityValue(context.sourceMessageId)}::${normalizeIdentityValue(context.sourceSwipeId || swipeId)}`;

      tx.slotKey = slotKey;
      tx.slotRevisionKey = context.slotRevisionKey || '';
      tx.sourceMessageId = context.sourceMessageId || messageId;
      tx.sourceSwipeId = context.sourceSwipeId || swipeId || '';

      return this._enqueueSlot(slotKey, async () => {
        // 进入排他执行区域前再次检查（防止排队期间状态变化）
        if (this._hasCompletedGeneration(generationKey) && !force) {
          return this._skipTransaction(tx, 'duplicate_generation_after_queue', { generationKey });
        }

        if (this._isGenerationCancelled(generationKey) && !force) {
          return this._skipTransaction(tx, 'cancelled_generation_after_queue', { generationKey });
        }

        this._isProcessing = true;
        tx.transition(TX_PHASE.REQUEST_STARTED);
        const controller = new AbortController();
        this._registerActiveTransaction(tx, {
          controller,
          generationKey,
          slotKey,
          sourceMessageId: context.sourceMessageId || messageId,
          sourceSwipeId: context.sourceSwipeId || swipeId || ''
        });

        try {
          const results = [];
          let hasWriteback = false;

          // ── 执行工具并收集结果 ──
          for (const tool of tools) {
            const toolContext = {
              ...context,
              signal: controller.signal,
              isAutoRun: true,
              abortMeta: {
                traceId: tx.traceId,
                generationKey,
                slotKey,
                sourceMessageId: context.sourceMessageId || messageId,
                sourceSwipeId: context.sourceSwipeId || swipeId || ''
              },
              shouldAbortWriteback: () => this._shouldAbortAutoWriteback({
                traceId: tx.traceId,
                generationKey
              }),
              input: {
                ...(context.input || {}),
                lastAiMessage: context.lastAiMessage,
                assistantBaseText: context.assistantBaseText
              }
            };

            const result = await toolOutputService.runToolPostResponse(tool, toolContext);
            results.push(result);

            if (result?.writebackState || result?.output) {
              hasWriteback = true;
            }
          }

          // ── Phase: REQUEST_FINISHED ──
          tx.transition(TX_PHASE.REQUEST_FINISHED, { toolResults: results });

          if (hasWriteback) {
            tx.transition(TX_PHASE.WRITEBACK_STARTED);
            tx.writebackState = {
              messageId: context.sourceMessageId,
              swipeId: context.sourceSwipeId,
              hasOutput: true
            };
          }

          this._markGenerationCompleted(generationKey);

          // ── Phase: WRITEBACK_COMMITTED ──
          const allSuccess = results.every(r => r?.success !== false);
          const aborted = results.some(r => r?.meta?.aborted === true || r?.meta?.stale === true || r?.error === '请求已取消');
          if (allSuccess) {
            tx.transition(TX_PHASE.WRITEBACK_COMMITTED);
          }

          const finalPhase = allSuccess ? TX_PHASE.REFRESH_CONFIRMED : TX_PHASE.FAILED;
          tx.transition(finalPhase, {
            verdict: aborted ? 'aborted' : (allSuccess ? 'success' : 'partial_failure')
          });

          this._recordTransaction(tx);
          this._updateAutoRuntimeForResults(tools, context, tx, results);

          return {
            success: allSuccess,
            traceId: tx.traceId,
            generationKey,
            sourceEvent,
            messageId: context.sourceMessageId || messageId,
            phase: tx.phase,
            results
          };
        } finally {
          this._unregisterActiveTransaction(tx.traceId);
          this._isProcessing = false;
        }
      });
    } catch (error) {
      tx.transition(TX_PHASE.FAILED, { error: error?.message || String(error) });
      this._recordTransaction(tx);
      this._unregisterActiveTransaction(tx.traceId);
      this._isProcessing = false;
      this._log('processAssistantMessage 异常', error);
      return { success: false, traceId: tx.traceId, error: tx.error, phase: tx.phase };
    }
  }

  // ── 内部方法 ──────────────────────────────────────────────

  /**
   * 从事件回调参数中提取 messageId 和 swipeId
   * SillyTavern 事件的参数格式不固定，需要多路径提取
   */
  _extractIdentitiesFromArgs(args) {
    let messageId = '';
    let swipeId = '';

    for (const arg of args) {
      if (arg === null || arg === undefined) continue;

      if (typeof arg === 'number' && Number.isFinite(arg) && !messageId) {
        messageId = normalizeIdentityValue(arg);
        continue;
      }

      if (typeof arg === 'string') {
        const normalized = normalizeIdentityValue(arg);
        if (!messageId && /^\d+$/.test(normalized)) {
          messageId = normalized;
        }
        continue;
      }

      if (typeof arg === 'object') {
        if (!messageId) {
          messageId = normalizeIdentityValue(
            arg.messageId ?? arg.message_id ?? arg.id ?? arg.mesid ?? arg.chat_index
            ?? arg.message?.messageId ?? arg.message?.message_id ?? arg.message?.id
            ?? arg.message?.mesid ?? arg.message?.chat_index
            ?? arg.data?.messageId ?? arg.data?.message_id ?? arg.data?.id
            ?? arg.target?.messageId ?? arg.target?.message_id ?? arg.target?.id
          );
        }
        if (!swipeId) {
          swipeId = normalizeIdentityValue(
            arg.swipeId ?? arg.swipe_id ?? arg.swipe ?? arg.swipeIndex ?? arg.currentSwipe
            ?? arg.message?.swipeId ?? arg.message?.swipe_id ?? arg.message?.swipe
            ?? arg.data?.swipeId ?? arg.data?.swipe_id ?? arg.data?.swipe
            ?? arg.target?.swipeId ?? arg.target?.swipe_id ?? arg.target?.swipe
          );
        }
      }
    }

    return { messageId, swipeId };
  }

  _scheduleMessageProcessing(messageId, swipeId = '', options = {}) {
    const settleMs = options.settleMs ?? this._getSettleMs();
    const timerKey = `msg::${normalizeIdentityValue(messageId)}::${normalizeIdentityValue(swipeId)}`;

    // 取消同一目标的旧定时器（防抖）
    const existing = this._pendingTimers.get(timerKey);
    if (existing) clearTimeout(existing);

    const timerId = setTimeout(() => {
      this._pendingTimers.delete(timerKey);
      this.processAssistantMessage(messageId, {
        swipeId,
        sourceEvent: options.sourceEvent || 'AUTO'
      }).catch(error => {
        this._log('调度执行失败', { messageId, error });
      });
    }, Math.max(0, settleMs));

    this._pendingTimers.set(timerKey, timerId);
    this._log('已调度消息处理', { timerKey, settleMs, sourceEvent: options.sourceEvent });
  }

  cancelAutomation(options = {}) {
    const reason = options.reason || 'manual_cancel';
    const messageId = normalizeIdentityValue(options.messageId);
    const slotKey = normalizeIdentityValue(options.slotKey);
    const traceId = normalizeIdentityValue(options.traceId);
    let cancelledCount = 0;

    for (const [timerKey, timerId] of this._pendingTimers) {
      const matchesMessage = messageId && timerKey.includes(`::${messageId}::`);
      const matchesSlot = slotKey && timerKey.includes(slotKey);
      const matchesAll = !messageId && !slotKey && !traceId;
      if (matchesMessage || matchesSlot || matchesAll) {
        clearTimeout(timerId);
        this._pendingTimers.delete(timerKey);
        cancelledCount += 1;
      }
    }

    cancelledCount += this._cancelActiveTransactions(reason, { messageId, slotKey, traceId });
    return { success: cancelledCount > 0, cancelledCount, reason };
  }

  // ── Generation-Aware 去重 ────────────────────────────────

  _hasCompletedGeneration(generationKey) {
    if (!generationKey) return false;
    this._pruneCompletedKeys();
    const completedAt = this._completedGenerationKeys.get(generationKey);
    if (!completedAt) return false;
    return (Date.now() - completedAt) < this._getDedupeWindowMs();
  }

  _markGenerationCompleted(generationKey) {
    if (!generationKey) return;
    this._completedGenerationKeys.set(generationKey, Date.now());
    this._pruneCompletedKeys();
  }

  _markGenerationCancelled(generationKey) {
    if (!generationKey) return;
    this._cancelledGenerationKeys.set(generationKey, Date.now());
    this._pruneCancelledKeys();
  }

  _isGenerationCancelled(generationKey) {
    if (!generationKey) return false;
    this._pruneCancelledKeys();
    const cancelledAt = this._cancelledGenerationKeys.get(generationKey);
    if (!cancelledAt) return false;
    return (Date.now() - cancelledAt) < this._getDedupeWindowMs();
  }

  _pruneCompletedKeys() {
    const cutoff = Date.now() - this._getDedupeWindowMs();
    for (const [key, ts] of this._completedGenerationKeys) {
      if (!Number.isFinite(ts) || ts < cutoff) {
        this._completedGenerationKeys.delete(key);
      }
    }
  }

  _pruneCancelledKeys() {
    const cutoff = Date.now() - this._getDedupeWindowMs();
    for (const [key, ts] of this._cancelledGenerationKeys) {
      if (!Number.isFinite(ts) || ts < cutoff) {
        this._cancelledGenerationKeys.delete(key);
      }
    }
  }

  // ── 事务历史 ─────────────────────────────────────────────

  _recordTransaction(tx) {
    this._transactionHistory.push(tx);
    if (this._transactionHistory.length > this._maxHistorySize) {
      this._transactionHistory = this._transactionHistory.slice(-this._maxHistorySize);
    }
    this._log(`事务 [${tx.traceId}] → ${tx.phase}`, {
      messageId: tx.messageId,
      generationKey: tx.generationKey,
      verdict: tx.verdict,
      sourceEvent: tx.sourceEvent,
      error: tx.error
    });
  }

  _skipTransaction(tx, reason, extra = {}) {
    tx.transition(TX_PHASE.SKIPPED, { verdict: reason, ...extra });
    this._recordTransaction(tx);
    if (Array.isArray(extra?.tools) && extra.tools.length > 0) {
      this._updateAutoRuntimeForSkip(extra.tools, tx, reason, extra);
    }
    return { success: false, skipped: true, reason, traceId: tx.traceId, ...extra };
  }

  // ── 槽位队列 ─────────────────────────────────────────────

  _enqueueSlot(slotKey, runner) {
    const previous = this._slotQueues.get(slotKey) || Promise.resolve();
    const next = previous
      .catch(() => { })
      .then(runner)
      .finally(() => {
        if (this._slotQueues.get(slotKey) === next) {
          this._slotQueues.delete(slotKey);
        }
      });
    this._slotQueues.set(slotKey, next);
    return next;
  }

  _registerActiveTransaction(tx, state = {}) {
    if (!tx?.traceId) return;
    this._activeTransactions.set(tx.traceId, {
      traceId: tx.traceId,
      generationKey: state.generationKey || tx.generationKey || '',
      slotKey: state.slotKey || tx.slotKey || '',
      sourceMessageId: state.sourceMessageId || tx.sourceMessageId || '',
      sourceSwipeId: state.sourceSwipeId || tx.sourceSwipeId || '',
      slotRevisionKey: state.slotRevisionKey || tx.slotRevisionKey || '',
      assistantBaseFingerprint: state.assistantBaseFingerprint || '',
      assistantBaseText: state.assistantBaseText || '',
      controller: state.controller || null,
      cancelled: false,
      cancelReason: ''
    });
  }

  _unregisterActiveTransaction(traceId) {
    if (!traceId) return;
    this._activeTransactions.delete(traceId);
  }

  _cancelActiveTransactions(reason = 'manual_cancel', filters = {}) {
    const targetMessageId = normalizeIdentityValue(filters.messageId);
    const targetSlotKey = normalizeIdentityValue(filters.slotKey);
    const targetTraceId = normalizeIdentityValue(filters.traceId);
    let cancelledCount = 0;

    for (const [traceId, state] of this._activeTransactions) {
      const matchesTrace = targetTraceId && traceId === targetTraceId;
      const matchesMessage = targetMessageId && normalizeIdentityValue(state?.sourceMessageId) === targetMessageId;
      const matchesSlot = targetSlotKey && normalizeIdentityValue(state?.slotKey) === targetSlotKey;
      const matchesAll = !targetTraceId && !targetMessageId && !targetSlotKey;
      if (!matchesTrace && !matchesMessage && !matchesSlot && !matchesAll) {
        continue;
      }

      state.cancelled = true;
      state.cancelReason = reason;
      if (state?.generationKey) {
        this._markGenerationCancelled(state.generationKey);
      }
      try {
        state?.controller?.abort?.();
      } catch (_) {
        // ignore abort errors
      }
      cancelledCount += 1;
    }

    return cancelledCount;
  }

  _shouldAbortAutoWriteback(meta = {}) {
    const traceId = normalizeIdentityValue(meta.traceId);
    const generationKey = normalizeIdentityValue(meta.generationKey);

    if (traceId) {
      const activeState = this._activeTransactions.get(traceId);
      if (!activeState || activeState.cancelled) {
        return { aborted: true, reason: 'cancelled_before_host_commit' };
      }
    }

    if (generationKey && this._isGenerationCancelled(generationKey)) {
      return { aborted: true, reason: 'cancelled_before_host_commit' };
    }

    return false;
  }

  _updateAutoRuntimeForSkip(tools, tx, reason, extra = {}) {
    tools.forEach((tool) => {
      if (!tool?.id) return;
      patchToolRuntime(tool.id, {
        lastAutoRunAt: Date.now(),
        lastAutoStatus: 'skipped',
        lastAutoMessageId: tx?.sourceMessageId || tx?.messageId || '',
        lastAutoSwipeId: tx?.sourceSwipeId || tx?.swipeId || '',
        lastAutoRevisionKey: tx?.slotRevisionKey || extra?.slotRevisionKey || '',
        lastAutoWritebackStatus: '',
        lastAutoRefreshConfirmed: false,
        lastAutoSkipReason: reason || ''
      }, {
        touchLastRunAt: false,
        emitEvent: false,
        emitRuntimeEvent: true
      });
    });
  }

  _updateAutoRuntimeForResults(tools, context, tx, results = []) {
    tools.forEach((tool, index) => {
      if (!tool?.id) return;
      const result = results[index] || {};
      const writebackDetails = result?.meta?.writebackDetails || {};
          const autoStatus = result?.meta?.aborted === true || result?.meta?.stale === true
        ? 'aborted'
        : (result?.success === false ? 'failed' : 'success');
      const skipReason = result?.meta?.aborted === true
        ? (result?.meta?.abortReason || (result?.meta?.stale === true ? 'stale_base_changed' : 'cancelled_before_host_commit'))
        : '';

      patchToolRuntime(tool.id, {
        lastAutoRunAt: Date.now(),
        lastAutoStatus: autoStatus,
        lastAutoMessageId: context?.sourceMessageId || tx?.sourceMessageId || tx?.messageId || '',
        lastAutoSwipeId: context?.sourceSwipeId || tx?.sourceSwipeId || tx?.swipeId || '',
        lastAutoRevisionKey: context?.slotRevisionKey || tx?.slotRevisionKey || '',
        lastAutoWritebackStatus: result?.meta?.writebackStatus || '',
        lastAutoRefreshConfirmed: !!writebackDetails.refreshConfirmed,
        lastAutoSkipReason: skipReason
      }, {
        touchLastRunAt: false,
        emitEvent: false,
        emitRuntimeEvent: true
      });
    });
  }

  // ── 状态管理 ──────────────────────────────────────────────

  _resetForChatChange() {
    const api = getHostApi();
    const newChatId = getCurrentChatId(api);
    this._log('聊天切换', { from: this._currentChatId, to: newChatId });
    this._currentChatId = newChatId;
    this._pendingTimers.forEach(id => clearTimeout(id));
    this._pendingTimers.clear();
    this._slotQueues.clear();
    this._completedGenerationKeys.clear();
    this._cancelledGenerationKeys.clear();
    this._cancelActiveTransactions('chat_changed');
    this._activeTransactions.clear();
    this._isProcessing = false;
    this._messageReceivedThrottleUntil = 0;
  }

  _scheduleInitRetry(retryDelayMs, attempt) {
    if (this._initRetryTimer) {
      clearTimeout(this._initRetryTimer);
    }

    this._hostBindingStatus = {
      ...this._hostBindingStatus,
      retryScheduled: true,
      retryDelayMs
    };

    this._initRetryTimer = setTimeout(() => {
      this._initRetryTimer = null;
      this.init({
        retryOnFailure: false,
        retryDelayMs,
        attempt
      });
    }, Math.max(200, retryDelayMs));
  }

  _clearMessageState(messageId) {
    if (!messageId) return;
    // 清理与该消息相关的定时器
    for (const [key, timerId] of this._pendingTimers) {
      if (key.includes(`::${messageId}::`) || key.startsWith(`msg::${messageId}::`)) {
        clearTimeout(timerId);
        this._pendingTimers.delete(key);
      }
    }
    // 清理相关的已完成 generationKey
    for (const key of this._completedGenerationKeys.keys()) {
      if (key.startsWith(`${messageId}::`)) {
        this._completedGenerationKeys.delete(key);
      }
    }
  }

  // ── 启用状态 ──────────────────────────────────────────────

  _evaluateEnabled() {
    const s = this._getAutomationSettings();
    return s.enabled === true;
  }

  /**
   * 检查是否启用，首次失败时输出诊断信息
   */
  _checkEnabled() {
    if (this._enabled) return true;

    if (!this._enabledCheckedOnce) {
      this._enabledCheckedOnce = true;
      const s = this._getAutomationSettings();
      this._log('⚠ 自动化未启用，首次诊断:', {
        'automation.enabled': s.enabled,
        '完整 automation 设置': s,
        '提示': '请确保 settings.automation.enabled === true'
      });
    }
    return false;
  }

  // ── 设置读取 ──────────────────────────────────────────────

  _getAutomationSettings() {
    const automation = settingsService.getSettings()?.automation || {};
    const settleMs = Number.isFinite(automation.settleMs) ? automation.settleMs : 800;
    return {
      enabled: automation.enabled === true,
      settleMs,
      dedupeWindowMs: Number.isFinite(automation.dedupeWindowMs)
        ? automation.dedupeWindowMs
        : Math.max(1200, settleMs + 600)
    };
  }

  _getSettleMs() {
    return this._getAutomationSettings().settleMs;
  }

  _getDedupeWindowMs() {
    return this._getAutomationSettings().dedupeWindowMs;
  }

  // ── 日志 ──────────────────────────────────────────────────

  _log(...args) {
    console.log('[ToolAutomation]', ...args);
  }
}

export const toolAutomationService = new ToolAutomationService();
export { ToolAutomationService, TX_PHASE, Transaction };
export default toolAutomationService;
