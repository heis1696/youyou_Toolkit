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
import { logger } from './core/logger-service.js';
import { hostEvents, HOST_EVENTS, getHostApi, getHostContext } from './core/host-event-service.js';

const log = logger.createScope('ToolAutomation');
import { getAllToolFullConfigs, patchToolRuntime } from './tool-registry.js';
import { toolOutputService } from './tool-output-service.js';
import { runLocalTransformTool } from './tool-local-transform-service.js';
import { buildExecutionContextForMessage } from './tool-execution-context.js';
import { runAutoTableUpdate } from './table-engine/table-update-service.js';
import { getTableWorkbenchConfig } from './table-engine/table-schema-service.js';

// ─── 工具函数 ───────────────────────────────────────────────

function normalizeIdentityValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
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
      message?.mid,
      message?.mesid,
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
    ?? lastMessage?.mid
    ?? lastMessage?.mesid
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

// ─── 命名常量 ─────────────────────────────────────────────────
const OWN_WRITE_TTL_MS = 10000;
const WRITEBACK_THROTTLE_MS = 15000;
const SETTLE_MS_FALLBACK = 800;

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
    this._recentlyProcessedSlots = new Map();
    this._ownWriteMessageIds = new Map();
    this._slotQueues = new Map();
    this._activeTransactions = new Map();
    this._isProcessing = false;
    this._currentChatId = '';
    this.debugMode = false;
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
    this._messageReceivedThrottleUntil = 0;
  }

  // ── 公开方法 ──────────────────────────────────────────────

  setDebugMode(enabled) {
    this.debugMode = enabled === true;
  }

  init(options = {}) {
    this.stop();

    this._hostBindingStatus.lastInitAt = Date.now();
    this._hostBindingStatus.initAttempts = (this._hostBindingStatus.initAttempts || 0) + 1;

    const api = getHostApi();
    this._currentChatId = getCurrentChatId(api);

    // 统一的调度入口：异步获取最新 assistant 消息，通过前置守卫后进入处理队列。
    // 不再使用 generation gate / fallback 等复杂门控，仅依赖内容去重 + 互斥锁。
    const scheduleFromEvent = (normalizedEvent, ...args) => {
      const apiNow = getHostApi();
      const { messageId, swipeId } = this._extractIdentitiesFromArgs(args);

      log.debug(`收到宿主事件 "${normalizedEvent}"`, { messageId, swipeId, argCount: args.length });

      // MESSAGE_RECEIVED 节流：覆盖 settle 等待期 + 处理周期
      if (normalizedEvent === HOST_EVENTS.MESSAGE_RECEIVED) {
        const now = Date.now();
        if (now < this._messageReceivedThrottleUntil) {
          log.debug(`MESSAGE_RECEIVED 在节流窗口内，跳过（剩余 ${this._messageReceivedThrottleUntil - now}ms）`);
          return;
        }
        this._messageReceivedThrottleUntil = now + this._getSettleMs() + 5000;
      }

      // 解析目标消息
      let targetMessage = null;
      let targetMessageId = messageId;
      let targetSwipeId = swipeId;

      if (targetMessageId) {
        targetMessage = getChatMessageById(apiNow, targetMessageId);
      }

      // 没有 messageId 时回退到最新 assistant
      if (!targetMessage) {
        const latestTarget = getLatestAssistantTarget(apiNow);
        if (latestTarget?.messageId) {
          targetMessage = latestTarget.message;
          targetMessageId = latestTarget.messageId;
          targetSwipeId = latestTarget.swipeId || targetSwipeId;
        }
      }

      if (!targetMessageId || !targetMessage) {
        log.debug(`事件 "${normalizedEvent}" 无 assistant 目标，跳过`);
        return;
      }

      if (!isAssistantMessage(targetMessage)) {
        log.debug(`事件 "${normalizedEvent}" 命中非 assistant 消息，跳过`, { messageId: targetMessageId });
        return;
      }

      // 简单内容守卫（参考 MVU：过滤流式占位符及空内容）
      const messageText = String(targetMessage.content || targetMessage.mes || '').trim();
      if (!messageText || messageText.length < 5) {
        log.debug(`事件 "${normalizedEvent}" 消息过短（${messageText.length} 字符），跳过`);
        return;
      }

      // 互斥锁
      if (this._isProcessing) {
        log.debug(`事件 "${normalizedEvent}" 正在处理中，跳过`);
        return;
      }

      // own-write 防自激：如果这个消息是自己刚写回的，跳过
      if (this._isOwnWrite(targetMessageId)) {
        log.debug(`事件 "${normalizedEvent}" 命中 own-write 黑名单，跳过`, { messageId: targetMessageId });
        return;
      }

      // 始终从 message 上拿真实 swipe_id，让重抽/swipe 切换能形成新的 slotKey
      const liveSwipeId = normalizeIdentityValue(
        targetMessage?.swipeId
        ?? targetMessage?.swipe_id
        ?? targetMessage?.swipe
        ?? targetMessage?.swipeIndex
      );
      if (liveSwipeId) {
        targetSwipeId = liveSwipeId;
      }

      // recently-processed 防重复：同一 slot 短期内不再处理
      const slotKey = `${targetMessageId}::${targetSwipeId}`;
      if (this._isRecentlyProcessed(slotKey)) {
        log.debug(`事件 "${normalizedEvent}" slot 已近期处理过，跳过`, { slotKey });
        return;
      }

      this._scheduleMessageProcessing(targetMessageId, targetSwipeId, {
        settleMs: this._getSettleMs(),
        sourceEvent: normalizedEvent
      });
      log.info(`事件 "${normalizedEvent}" 通过所有守卫，已调度处理`, {
        targetMessageId, targetSwipeId,
        throttleUntil: this._messageReceivedThrottleUntil,
        isProcessing: this._isProcessing
      });
    };

    this._stopCallbacks.push(hostEvents.subscribe(HOST_EVENTS.MESSAGE_SENT, () => {
      log.debug('MESSAGE_SENT → 清理调度队列');
      this._pendingTimers.forEach(id => clearTimeout(id));
      this._pendingTimers.clear();
    }));

    this._stopCallbacks.push(hostEvents.subscribe(HOST_EVENTS.MESSAGE_RECEIVED, (...args) => {
      scheduleFromEvent(HOST_EVENTS.MESSAGE_RECEIVED, ...args);
    }));

    this._stopCallbacks.push(hostEvents.subscribe(HOST_EVENTS.GENERATION_STOPPED, () => {
      log.info('GENERATION_STOPPED → 取消所有活跃事务');
      this._cancelActiveTransactions('generation_stopped');
      this._pendingTimers.forEach(id => clearTimeout(id));
      this._pendingTimers.clear();
      this._isProcessing = false;
    }));

    this._stopCallbacks.push(hostEvents.subscribe(HOST_EVENTS.CHAT_CHANGED, () => {
      this._resetForChatChange();
    }));

    this._stopCallbacks.push(hostEvents.subscribe(HOST_EVENTS.MESSAGE_DELETED, (messageId) => {
      this._clearMessageState(normalizeIdentityValue(messageId));
    }));

    this._refreshHostBindingStatus();
    this._seedKnownSlots();

    log.info('自动化服务已初始化', {
      chatId: this._currentChatId,
      source: this._hostBindingStatus.source
    });
    return true;
  }

  /**
   * 把当前聊天最新一条 AI 消息的 slot 标记为"已知"，避免：
   *   - 页面刷新 / 切换聊天 / 删除消息后，宿主重渲染时发出的 MESSAGE_RECEIVED 把旧消息当成新消息处理
   *   - 切换聊天后 SillyTavern 对新聊天的最新消息回放 MESSAGE_RECEIVED
   * 使用 Number.MAX_SAFE_INTEGER 作为时间戳让 _isRecentlyProcessed 永远命中，
   * 直到下一次 chat 切换 / 删除 / 真正的新 AI 消息把它替换。
   */
  _seedKnownSlots() {
    try {
      const api = getHostApi();
      const latest = getLatestAssistantTarget(api);
      if (!latest?.messageId) return;
      const slotKey = `${normalizeIdentityValue(latest.messageId)}::${normalizeIdentityValue(latest.swipeId)}`;
      this._recentlyProcessedSlots.set(slotKey, Number.MAX_SAFE_INTEGER);
      log.debug(`已将当前最新 slot "${slotKey}" 预标记为已知，跳过 MESSAGE_RECEIVED 重放`);
    } catch (error) {
      log.warn('_seedKnownSlots 失败', { error });
    }
  }

  _refreshHostBindingStatus() {
    const desc = hostEvents.describe();
    const subscribedEvents = [
      HOST_EVENTS.MESSAGE_SENT,
      HOST_EVENTS.MESSAGE_RECEIVED,
      HOST_EVENTS.GENERATION_STOPPED,
      HOST_EVENTS.CHAT_CHANGED,
      HOST_EVENTS.MESSAGE_DELETED
    ];
    this._hostBindingStatus = {
      ...this._hostBindingStatus,
      initialized: !!desc.hasBridge,
      lastInitResult: desc.hasBridge ? 'ready' : (desc.retryScheduled ? 'pending_retry' : 'pending'),
      source: desc.source,
      hasEventSource: !!desc.hasBridge,
      hasEventTypes: Array.isArray(desc.availableEvents) && desc.availableEvents.length > 0,
      eventBindings: subscribedEvents.map((e) => `subscribed: ${e}`),
      retryScheduled: !!desc.retryScheduled,
      retryDelayMs: 0,
      lastError: ''
    };
  }

  stop() {
    this._stopCallbacks.forEach(fn => { try { fn(); } catch (e) { log.warn('停止回调失败', { error: e }); } });
    this._stopCallbacks = [];
    this._pendingTimers.forEach(id => clearTimeout(id));
    this._pendingTimers.clear();
    this._slotQueues.clear();
    this._recentlyProcessedSlots.clear();
    this._ownWriteMessageIds.clear();
    this._cancelActiveTransactions('service_stopped');
    this._activeTransactions.clear();
    this._isProcessing = false;
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
    return true;
  }

  getRuntimeSnapshot() {
    this._pruneRecentSlots();
    this._pruneOwnWrites();
    this._refreshHostBindingStatus();
    return {
      currentChatId: this._currentChatId,
      enabled: true,
      isProcessing: this._isProcessing,
      pendingTimerCount: this._pendingTimers.size,
      queuedSlotCount: this._slotQueues.size,
      recentlyProcessedSlotCount: this._recentlyProcessedSlots.size,
      ownWriteMessageIdCount: this._ownWriteMessageIds.size,
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

      // ── Phase: CONTEXT_BUILT → 去重 ──
      tx.transition(TX_PHASE.CONTEXT_BUILT);

      const slotKey = `${normalizeIdentityValue(context.sourceMessageId)}::${normalizeIdentityValue(context.sourceSwipeId || swipeId)}`;
      tx.generationKey = slotKey;

      if (!force && this._isRecentlyProcessed(slotKey)) {
        return this._skipTransaction(tx, 'duplicate_slot', { slotKey });
      }

      // 获取需要自动运行的工具
      const allConfigs = getAllToolFullConfigs();
      const postResponseTools = toolOutputService.filterAutoPostResponseTools(allConfigs);
      const localTransformTools = allConfigs.filter((c) =>
        toolOutputService.shouldRunLocalTransform(c) && c.output?.autoTrigger !== false
      );
      // local transform 先执行（文本变换），post_response_api 后执行（追加 block）
      const tools = [...localTransformTools, ...postResponseTools];
      const tableWorkbenchConfig = getTableWorkbenchConfig();
      const shouldRunTableAuto = tableWorkbenchConfig?.autoUpdateEnabled === true
        && normalizeIdentityValue(tableWorkbenchConfig?.autoUpdateTrigger || 'assistantMessage') === 'assistantMessage';
      if (!tools.length && !shouldRunTableAuto) {
        return this._skipTransaction(tx, 'no_auto_tools', { tools });
      }

      // ── Phase: REQUEST_STARTED → 排队执行 ──
      tx.slotKey = slotKey;
      tx.slotRevisionKey = context.slotRevisionKey || '';
      tx.sourceMessageId = context.sourceMessageId || messageId;
      tx.sourceSwipeId = context.sourceSwipeId || swipeId || '';

      return this._enqueueSlot(slotKey, async () => {
        if (!force && this._isRecentlyProcessed(slotKey)) {
          return this._skipTransaction(tx, 'duplicate_slot_after_queue', { slotKey });
        }

        this._isProcessing = true;
        this._markSlotProcessed(slotKey);
        tx.transition(TX_PHASE.REQUEST_STARTED);
        const controller = new AbortController();
        this._registerActiveTransaction(tx, {
          controller,
          slotKey,
          sourceMessageId: context.sourceMessageId || messageId,
          sourceSwipeId: context.sourceSwipeId || swipeId || ''
        });

        try {
          // ── 执行工具并收集结果 ──
          const { results, hasWriteback: toolsHadWriteback } = await this._executeAutoTools(
            tools, context, controller, tx, { slotKey, messageId, swipeId }
          );

          // ── 执行表格自动更新 ──
          const { tableResult, hasWriteback: tableHadWriteback } = await this._executeAutoTableUpdate(
            context, controller, tx, {
              shouldRunTableAuto, tableWorkbenchConfig, messageId, swipeId, sourceEvent
            }
          );

          const hasWriteback = toolsHadWriteback || tableHadWriteback;

          // ── Phase: REQUEST_FINISHED ──
          tx.transition(TX_PHASE.REQUEST_FINISHED, { toolResults: results, tableResult });

          if (hasWriteback) {
            tx.transition(TX_PHASE.WRITEBACK_STARTED);
            tx.writebackState = {
              messageId: context.sourceMessageId,
              swipeId: context.sourceSwipeId,
              hasOutput: true
            };
            this._messageReceivedThrottleUntil = Date.now() + WRITEBACK_THROTTLE_MS;
          }

          this._markSlotProcessed(slotKey);

          // ── Phase: WRITEBACK_COMMITTED ──
          const toolSuccess = results.every(r => r?.success !== false);
          const tableSuccess = !shouldRunTableAuto
            || !!tableResult?.success
            || tableResult?.skipped === true
            || tableResult?.meta?.aborted === true
            || tableResult?.meta?.stale === true;
          const allSuccess = toolSuccess && tableSuccess;
          const aborted = results.some(r => r?.meta?.aborted === true || r?.meta?.stale === true || r?.error === '请求已取消')
            || tableResult?.meta?.aborted === true
            || tableResult?.meta?.stale === true;
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
            slotKey,
            sourceEvent,
            messageId: context.sourceMessageId || messageId,
            phase: tx.phase,
            results,
            tableResult
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
      log.error('processAssistantMessage 异常', { error });
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
            arg.messageId ?? arg.message_id ?? arg.id ?? arg.mid ?? arg.mesid ?? arg.chat_index
            ?? arg.message?.messageId ?? arg.message?.message_id ?? arg.message?.id
            ?? arg.message?.mid ?? arg.message?.mesid ?? arg.message?.chat_index
            ?? arg.data?.messageId ?? arg.data?.message_id ?? arg.data?.id
            ?? arg.data?.mid ?? arg.data?.mesid ?? arg.data?.chat_index
            ?? arg.target?.messageId ?? arg.target?.message_id ?? arg.target?.id
            ?? arg.target?.mid ?? arg.target?.mesid ?? arg.target?.chat_index
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
        log.error('调度执行失败', { messageId, error });
      });
    }, Math.max(0, settleMs));

    this._pendingTimers.set(timerKey, timerId);
    log.info('已调度消息处理', { timerKey, settleMs, sourceEvent: options.sourceEvent });
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

  // ── Slot-based 去重（替代旧 generationKey hash 去重）────────

  _isRecentlyProcessed(slotKey) {
    if (!slotKey) return false;
    this._pruneRecentSlots();
    const processedAt = this._recentlyProcessedSlots.get(slotKey);
    if (!processedAt) return false;
    return (Date.now() - processedAt) < this._getDedupeWindowMs();
  }

  _markSlotProcessed(slotKey) {
    if (!slotKey) return;
    this._recentlyProcessedSlots.set(slotKey, Date.now());
    this._pruneRecentSlots();
  }

  _pruneRecentSlots() {
    const cutoff = Date.now() - this._getDedupeWindowMs();
    for (const [key, ts] of this._recentlyProcessedSlots) {
      if (!Number.isFinite(ts) || ts < cutoff) {
        this._recentlyProcessedSlots.delete(key);
      }
    }
  }

  // ── 自动执行：工具链 ────────────────────────────────────────

  async _executeAutoTools(tools, context, controller, tx, { slotKey, messageId, swipeId }) {
    const results = [];
    let hasWriteback = false;
    let currentLastAiMessage = context.lastAiMessage;
    let currentAssistantBaseText = context.assistantBaseText;

    for (const tool of tools) {
      const toolContext = {
        ...context,
        signal: controller.signal,
        isAutoRun: true,
        abortMeta: {
          traceId: tx.traceId,
          slotKey,
          sourceMessageId: context.sourceMessageId || messageId,
          sourceSwipeId: context.sourceSwipeId || swipeId || ''
        },
        shouldAbortWriteback: () => this._shouldAbortAutoWriteback({
          traceId: tx.traceId
        }),
        skipNotify: true,
        lastAiMessage: currentLastAiMessage,
        assistantBaseText: currentAssistantBaseText,
        input: {
          ...(context.input || {}),
          lastAiMessage: currentLastAiMessage,
          assistantBaseText: currentAssistantBaseText
        }
      };

      const isLocalTransform = toolOutputService.shouldRunLocalTransform(tool);
      const result = isLocalTransform
        ? await runLocalTransformTool(tool, toolContext)
        : await toolOutputService.runToolPostResponse(tool, toolContext);
      results.push(result);

      if (result?.writebackState || result?.output) {
        hasWriteback = true;
        this._markOwnWrite(context.sourceMessageId || messageId);
        // 链式读取：刷新下一个工具的输入文本
        const refreshedText = this._readCurrentMessageText(context.sourceMessageId || messageId);
        if (refreshedText) {
          currentLastAiMessage = refreshedText;
          currentAssistantBaseText = refreshedText;
          // 同步更新 chatMessages 快照，使后续工具的 getExtractionSnapshot 读到最新文本
          const idx = Number(context.sourceMessageId || messageId);
          if (Array.isArray(context.chatMessages) && context.chatMessages[idx]) {
            context.chatMessages[idx].content = refreshedText;
            context.chatMessages[idx].mes = refreshedText;
          }
        }
      }
    }

    return { results, hasWriteback };
  }

  async _executeAutoTableUpdate(context, controller, tx, {
    shouldRunTableAuto, tableWorkbenchConfig, messageId, swipeId, sourceEvent
  }) {
    if (!shouldRunTableAuto) {
      return { tableResult: null, hasWriteback: false };
    }

    const tableResult = await runAutoTableUpdate({
      messageId: context.sourceMessageId || messageId,
      swipeId: context.sourceSwipeId || swipeId || '',
      sourceEvent,
      configInput: tableWorkbenchConfig,
      signal: controller.signal,
      shouldAbortWriteback: () => this._shouldAbortAutoWriteback({
        traceId: tx.traceId
      })
    });

    const hasWriteback = !!(tableResult?.state || tableResult?.mirrorResult?.success === true);
    if (hasWriteback) {
      this._markOwnWrite(context.sourceMessageId || messageId);
    }

    return { tableResult, hasWriteback };
  }

  _readCurrentMessageText(messageId) {
    const api = getHostApi();
    const chat = getCurrentChatMessages(api);
    const idx = Number(messageId);
    if (!Number.isFinite(idx) || idx < 0 || idx >= chat.length) return '';
    const msg = chat[idx];
    return String(msg?.mes || msg?.content || '').trim();
  }

  // ── Own-write 防自激 ─────────────────────────────────────────

  _markOwnWrite(messageId) {
    const key = normalizeIdentityValue(messageId);
    if (!key) return;
    this._ownWriteMessageIds.set(key, Date.now());
    this._pruneOwnWrites();
  }

  _isOwnWrite(messageId) {
    const key = normalizeIdentityValue(messageId);
    if (!key) return false;
    this._pruneOwnWrites();
    const writtenAt = this._ownWriteMessageIds.get(key);
    if (!writtenAt) return false;
    return (Date.now() - writtenAt) < OWN_WRITE_TTL_MS;
  }

  _pruneOwnWrites() {
    const cutoff = Date.now() - OWN_WRITE_TTL_MS;
    for (const [key, ts] of this._ownWriteMessageIds) {
      if (!Number.isFinite(ts) || ts < cutoff) {
        this._ownWriteMessageIds.delete(key);
      }
    }
  }

  // ── 事务历史 ─────────────────────────────────────────────

  _recordTransaction(tx) {
    this._transactionHistory.push(tx);
    if (this._transactionHistory.length > this._maxHistorySize) {
      this._transactionHistory = this._transactionHistory.slice(-this._maxHistorySize);
    }
    log.debug(`事务 [${tx.traceId}] → ${tx.phase}`, {
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

    if (traceId) {
      const activeState = this._activeTransactions.get(traceId);
      if (!activeState || activeState.cancelled) {
        return { aborted: true, reason: 'cancelled_before_host_commit' };
      }
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
    log.info('聊天切换', { from: this._currentChatId, to: newChatId });
    this._currentChatId = newChatId;
    this._pendingTimers.forEach(id => clearTimeout(id));
    this._pendingTimers.clear();
    this._slotQueues.clear();
    this._recentlyProcessedSlots.clear();
    this._ownWriteMessageIds.clear();
    this._cancelActiveTransactions('chat_changed');
    this._activeTransactions.clear();
    this._isProcessing = false;
    this._messageReceivedThrottleUntil = 0;
    this._seedKnownSlots();
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

    for (const key of this._recentlyProcessedSlots.keys()) {
      if (key.startsWith(`${messageId}::`)) {
        this._recentlyProcessedSlots.delete(key);
      }
    }

    this._ownWriteMessageIds.delete(normalizeIdentityValue(messageId));

    // 删除消息后，宿主可能针对新的"最新消息"再发一次 MESSAGE_RECEIVED；
    // 重新种入 known slots 把它盖住，避免触发自动工具。
    this._seedKnownSlots();
  }

  // ── 设置读取 ──────────────────────────────────────────────

  _getAutomationSettings() {
    const automation = settingsService.getSettings()?.automation || {};
    const settleMs = Number.isFinite(automation.settleMs) ? automation.settleMs : SETTLE_MS_FALLBACK;
    return {
      settleMs,
      dedupeWindowMs: Number.isFinite(automation.dedupeWindowMs)
        ? automation.dedupeWindowMs
        : Math.max(5000, settleMs + 600)
    };
  }

  _getSettleMs() {
    return this._getAutomationSettings().settleMs;
  }

  _getDedupeWindowMs() {
    return this._getAutomationSettings().dedupeWindowMs;
  }

}

export const toolAutomationService = new ToolAutomationService();
export { ToolAutomationService, TX_PHASE, Transaction };
export default toolAutomationService;
