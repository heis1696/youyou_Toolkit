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
import { getAllToolFullConfigs } from './tool-registry.js';
import { toolOutputService } from './tool-output-service.js';
import { buildExecutionContextForMessage } from './tool-execution-context.js';

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
  return getTopWindow()?.SillyTavern || null;
}

function getHostEventSource(api) {
  return api?.eventSource || null;
}

function getHostEventTypes(api) {
  return api?.eventTypes || {};
}

function getCurrentChatId(api) {
  const ctx = api?.getContext?.() || null;
  return normalizeIdentityValue(
    ctx?.chatId ?? ctx?.chat_id ?? api?.chatId ?? api?.chat_id
    ?? api?.chat_filename ?? api?.this_chid ?? 'chat_default'
  ) || 'chat_default';
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

// 判断事件是否属于"同楼层可能产生新内容"的类别
const SAME_SLOT_EVENTS = new Set([
  'MESSAGE_UPDATED',
  'MESSAGE_SWIPED',
  'GENERATION_AFTER_COMMANDS',
  'GENERATION_ENDED'
]);

function isSameSlotEvent(eventName) {
  return SAME_SLOT_EVENTS.has(normalizeEventName(eventName));
}

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
    this._slotQueues = new Map();
    this._currentChatId = '';
    this._isDuringExtraAnalysis = false;
    this._isProcessingMessage = false;
    this._enabled = false;
    this._enabledCheckedOnce = false; // 用于首次诊断
    this.debugMode = false;

    // 事务历史（最近 N 条），用于诊断
    this._transactionHistory = [];
    this._maxHistorySize = 30;
  }

  // ── 公开方法 ──────────────────────────────────────────────

  setDebugMode(enabled) {
    this.debugMode = enabled === true;
  }

  init() {
    this.stop();

    const api = getHostApi();
    if (!api) {
      this._log('初始化失败: 未找到宿主 API (SillyTavern)');
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
      this._log('初始化失败: 宿主 eventSource 缺少 on/off 方法');
      return false;
    }

    // 打印宿主事件类型映射，帮助排查
    this._log('宿主 eventTypes 映射:', JSON.stringify(eventTypes, null, 2));

    const bindHostEvent = (rawEventName, handler) => {
      if (!rawEventName || typeof handler !== 'function') return;
      const actualName = rawEventName; // 绑定时使用宿主原始值
      subscribe(actualName, handler);
      this._stopCallbacks.push(() => {
        try { unsubscribe(actualName, handler); } catch (e) { this._log('取消事件失败', actualName, e); }
      });
      this._log(`已绑定宿主事件: "${actualName}" (归一化: ${normalizeEventName(actualName)})`);
    };

    // 核心调度入口
    const scheduleFromEvent = (rawEventName, ...args) => {
      const normalizedEvent = normalizeEventName(rawEventName);
      const { messageId, swipeId } = this._extractIdentitiesFromArgs(args);

      this._log(`收到宿主事件 "${rawEventName}" → "${normalizedEvent}"`, { messageId, swipeId, argCount: args.length });

      if (!this._checkEnabled()) return;

      if (messageId) {
        this._scheduleMessageProcessing(messageId, swipeId, {
          settleMs: this._getSettleMs(),
          sourceEvent: normalizedEvent
        });
      } else if (isSameSlotEvent(normalizedEvent)) {
        // 事件没有给出明确 messageId，回退到处理当前最新 assistant 楼层
        this._scheduleCurrentAssistantProcessing({
          settleMs: this._getSettleMs(),
          sourceEvent: normalizedEvent
        });
      } else {
        this._log(`事件 "${normalizedEvent}" 无 messageId 且非 same-slot 类型，跳过`);
      }
    };

    // ── 绑定宿主事件 ──

    // 用户发送消息 → 重置分析状态
    bindHostEvent(eventTypes.MESSAGE_SENT || 'message_sent', () => {
      this._log('MESSAGE_SENT → 重置 extra analysis 状态');
      this._isDuringExtraAnalysis = false;
    });

    // 收到 AI 回复
    bindHostEvent(eventTypes.MESSAGE_RECEIVED || 'message_received', (...args) => {
      scheduleFromEvent(eventTypes.MESSAGE_RECEIVED || 'message_received', ...args);
    });

    // 消息更新（含 streaming 结束后的最终更新）
    bindHostEvent(eventTypes.MESSAGE_UPDATED || 'message_updated', (...args) => {
      scheduleFromEvent(eventTypes.MESSAGE_UPDATED || 'message_updated', ...args);
    });

    // Swipe
    bindHostEvent(eventTypes.MESSAGE_SWIPED || 'message_swiped', (...args) => {
      scheduleFromEvent(eventTypes.MESSAGE_SWIPED || 'message_swiped', ...args);
    });

    // Generation 结束后命令处理
    bindHostEvent(eventTypes.GENERATION_AFTER_COMMANDS || 'generation_after_commands', (...args) => {
      scheduleFromEvent(eventTypes.GENERATION_AFTER_COMMANDS || 'generation_after_commands', ...args);
    });

    // Generation 结束
    bindHostEvent(eventTypes.GENERATION_ENDED || 'generation_ended', (...args) => {
      scheduleFromEvent(eventTypes.GENERATION_ENDED || 'generation_ended', ...args);
    });

    // 聊天切换
    bindHostEvent(eventTypes.CHAT_CHANGED || 'chat_changed', () => {
      this._resetForChatChange();
    });

    // 消息删除
    bindHostEvent(eventTypes.MESSAGE_DELETED || 'message_deleted', (messageId) => {
      this._clearMessageState(normalizeIdentityValue(messageId));
    });

    // 设置变更
    this._stopCallbacks.push(eventBus.on(EVENTS.SETTINGS_UPDATED, () => {
      const wasEnabled = this._enabled;
      this._enabled = this._evaluateEnabled();
      if (wasEnabled !== this._enabled) {
        this._log(`自动化状态变更: ${wasEnabled} → ${this._enabled}`);
      }
    }));

    this._enabled = this._evaluateEnabled();
    this._enabledCheckedOnce = false;
    this._log('自动化服务已初始化', { enabled: this._enabled, chatId: this._currentChatId });
    return true;
  }

  stop() {
    this._stopCallbacks.forEach(fn => { try { fn(); } catch (e) { this._log('停止回调失败', e); } });
    this._stopCallbacks = [];
    this._pendingTimers.forEach(id => clearTimeout(id));
    this._pendingTimers.clear();
    this._slotQueues.clear();
    this._completedGenerationKeys.clear();
    this._isDuringExtraAnalysis = false;
    this._isProcessingMessage = false;
    this._enabled = false;
    this._enabledCheckedOnce = false;
  }

  isEnabled() {
    return this._enabled;
  }

  getRuntimeSnapshot() {
    this._pruneCompletedKeys();
    return {
      currentChatId: this._currentChatId,
      enabled: this._enabled,
      isDuringExtraAnalysis: this._isDuringExtraAnalysis,
      isProcessingMessage: this._isProcessingMessage,
      pendingTimerCount: this._pendingTimers.size,
      queuedSlotCount: this._slotQueues.size,
      completedGenerationKeyCount: this._completedGenerationKeys.size,
      recentTransactions: this._transactionHistory.slice(-10).map(tx => tx.toSnapshot()),
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
   */
  async processAssistantMessage(messageId, { force = false, swipeId = '', sourceEvent = 'AUTO' } = {}) {
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

      if (this._isDuringExtraAnalysis && !force) {
        return this._skipTransaction(tx, 'during_extra_analysis');
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

      // 获取需要自动运行的工具
      const tools = toolOutputService.filterAutoPostResponseTools(getAllToolFullConfigs());
      if (!tools.length) {
        return this._skipTransaction(tx, 'no_auto_tools');
      }

      // ── Phase: REQUEST_STARTED → 排队执行 ──
      const slotKey = `${normalizeIdentityValue(context.sourceMessageId)}::${normalizeIdentityValue(context.sourceSwipeId || swipeId)}`;

      return this._enqueueSlot(slotKey, async () => {
        // 进入排他执行区域前再次检查（防止排队期间状态变化）
        if (this._hasCompletedGeneration(generationKey) && !force) {
          return this._skipTransaction(tx, 'duplicate_generation_after_queue', { generationKey });
        }

        this._isProcessingMessage = true;
        this._isDuringExtraAnalysis = true;
        tx.transition(TX_PHASE.REQUEST_STARTED);

        try {
          const results = [];

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
            results.push(result);
          }

          // ── Phase: REQUEST_FINISHED ──
          tx.transition(TX_PHASE.REQUEST_FINISHED, { toolResults: results });

          // 标记此 generationKey 已完成
          this._markGenerationCompleted(generationKey);

          // ── Phase: WRITEBACK_COMMITTED (写回由 toolOutputService 内部处理) ──
          const allSuccess = results.every(r => r?.success !== false);
          if (allSuccess) {
            tx.transition(TX_PHASE.WRITEBACK_COMMITTED);
          }

          // ── 最终阶段 ──
          const finalPhase = allSuccess ? TX_PHASE.REFRESH_CONFIRMED : TX_PHASE.FAILED;
          tx.transition(finalPhase, {
            verdict: allSuccess ? 'success' : 'partial_failure'
          });

          this._recordTransaction(tx);

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
          this._isDuringExtraAnalysis = false;
          this._isProcessingMessage = false;
        }
      });
    } catch (error) {
      tx.transition(TX_PHASE.FAILED, { error: error?.message || String(error) });
      this._recordTransaction(tx);
      this._isDuringExtraAnalysis = false;
      this._isProcessingMessage = false;
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

      // 直接是数字或字符串 → 可能是 messageId
      if ((typeof arg === 'number' || typeof arg === 'string') && !messageId) {
        messageId = normalizeIdentityValue(arg);
        continue;
      }

      // 对象 → 尝试从多个字段提取
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

  _scheduleCurrentAssistantProcessing(options = {}) {
    const settleMs = options.settleMs ?? this._getSettleMs();
    const sourceEvent = options.sourceEvent || 'CURRENT_ASSISTANT_FALLBACK';
    const timerKey = `current::${sourceEvent}`;

    const existing = this._pendingTimers.get(timerKey);
    if (existing) clearTimeout(existing);

    const timerId = setTimeout(() => {
      this._pendingTimers.delete(timerKey);
      this.processCurrentAssistantMessage({ sourceEvent }).catch(error => {
        this._log('当前 assistant 处理失败', error);
      });
    }, Math.max(0, settleMs));

    this._pendingTimers.set(timerKey, timerId);
    this._log('已调度当前 assistant 处理', { timerKey, settleMs, sourceEvent });
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

  _pruneCompletedKeys() {
    const cutoff = Date.now() - this._getDedupeWindowMs();
    for (const [key, ts] of this._completedGenerationKeys) {
      if (!Number.isFinite(ts) || ts < cutoff) {
        this._completedGenerationKeys.delete(key);
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
    this._isDuringExtraAnalysis = false;
    this._isProcessingMessage = false;
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
    return s.enabled === true && s.autoRequestEnabled === true;
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
        'automation.autoRequestEnabled': s.autoRequestEnabled,
        '完整 automation 设置': s,
        '提示': '请确保 settings.automation.enabled === true 且 settings.automation.autoRequestEnabled === true'
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
      autoRequestEnabled: automation.autoRequestEnabled !== false,
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
    if (this.debugMode || settingsService.getDebugSettings?.()?.enableDebugLog) {
      console.log('[ToolAutomation]', ...args);
    }
  }
}

export const toolAutomationService = new ToolAutomationService();
export { ToolAutomationService, TX_PHASE, Transaction };
export default toolAutomationService;
