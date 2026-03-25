/**
 * YouYou Toolkit - 事件触发模块
 * @description 处理SillyTavern事件监听、门控检查和上下文获取
 */

import { eventBus, EVENTS } from './core/event-bus.js';
import { settingsService } from './core/settings-service.js';
import {
  getToolFullConfig,
  updateToolRuntime,
  patchToolRuntime,
  appendToolRuntimeHistory
} from './tool-registry.js';
import { executeToolWithConfig, getToolsForEvent } from './tool-executor.js';
import {
  toolOutputService,
  OUTPUT_MODES,
  TOOL_FAILURE_STAGES,
  TOOL_WRITEBACK_STATUS
} from './tool-output-service.js';
import { showToast, showTopNotice } from './ui/utils.js';

// ============================================================
// 事件类型定义
// ============================================================

/**
 * SillyTavern事件类型
 */
const EVENT_TYPES = {
  // 消息相关
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
  MESSAGE_SENT: 'MESSAGE_SENT',
  MESSAGE_UPDATED: 'MESSAGE_UPDATED',
  MESSAGE_DELETED: 'MESSAGE_DELETED',
  
  // 生成相关
  GENERATION_STARTED: 'GENERATION_STARTED',
  GENERATION_ENDED: 'GENERATION_ENDED',
  GENERATION_AFTER_COMMANDS: 'GENERATION_AFTER_COMMANDS',
  
  // 角色相关
  CHARACTER_LOADED: 'CHARACTER_LOADED',
  CHARACTER_DELETED: 'CHARACTER_DELETED',
  
  // 聊天相关
  CHAT_CHANGED: 'CHAT_CHANGED',
  CHAT_CREATED: 'CHAT_CREATED',
  
  // 世界书相关
  WORLDBOOK_UPDATED: 'WORLDBOOK_UPDATED',
  
  // 扩展相关
  EXTENSIONS_LOADED: 'EXTENSIONS_LOADED',
  SETTINGS_LOADED: 'SETTINGS_LOADED'
};

// ============================================================
// 触发器状态
// ============================================================

const triggerState = {
  // 已注册的监听器
  listeners: new Map(), // eventType -> Set<listener>
  
  // 事件处理器映射
  handlers: new Map(), // handlerId -> handlerConfig
  
  // 门控状态
  gateState: {
    lastUserSendIntentAt: 0,
    lastUserIntentSource: '',
    lastUserMessageId: null,
    lastUserMessageText: '',
    lastUserMessageAt: 0,
    lastGenerationTraceId: '',
    lastGenerationType: null,
    lastGenerationParams: null,
    lastGenerationDryRun: false,
    lastGenerationAt: 0,
    isGenerating: false,
    lastGenerationBaseline: null,
    uiTransitionGuardUntil: 0,
    lastUiTransitionAt: 0,
    lastUiTransitionSource: ''
  },
  
  // 是否已初始化
  isInitialized: false,
  
  // 调试模式
  debugMode: false
};

const EVENT_SOURCE_IMPORT_URL = '/script.js';

const eventBridgeState = {
  eventSource: null,
  eventTypes: null,
  source: '',
  scriptModule: null,
  loadingPromise: null,
  importError: null
};

export const AUTO_TRIGGER_SKIP_REASONS = {
  LISTENER_DISABLED: 'listener_disabled',
  QUIET_GENERATION: 'quiet_generation',
  DRY_RUN_GENERATION: 'dry_run_generation',
  IGNORED_AUTO_TRIGGER: 'ignored_auto_trigger',
  UNRELATED_UI_EVENT: 'ui_side_effect_event',
  SPECULATIVE_FALLBACK_WITHOUT_MESSAGE: 'speculative_generation_after_commands',
  NO_CONFIRMED_ASSISTANT_MESSAGE: 'no_confirmed_assistant_message',
  HISTORICAL_REPLAY_MESSAGE_RECEIVED: 'historical_replay_message_received',
  MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION: 'message_received_outside_active_generation',
  NON_ASSISTANT_MESSAGE: 'non_assistant_message',
  MISSING_AI_MESSAGE: 'missing_ai_message',
  DUPLICATE_MESSAGE: 'duplicate_message',
  NO_ELIGIBLE_TOOLS: 'no_eligible_tools',
  TOOL_DISABLED: 'tool_disabled'
};

export const TOOL_EXECUTION_PATHS = {
  AUTO_POST_RESPONSE_API: 'auto_post_response_api',
  MANUAL_POST_RESPONSE_API: 'manual_post_response_api',
  MANUAL_COMPATIBILITY: 'manual_compatibility'
};

const MESSAGE_SESSION_PHASES = {
  RECEIVED: 'received',
  SCHEDULED: 'scheduled',
  DISPATCHING: 'dispatching',
  HANDLING: 'handling',
  COMPLETED: 'completed',
  SKIPPED: 'skipped',
  IGNORED: 'ignored'
};

const AUTO_TRIGGER_USER_INTENT_TTL_MS = 15000;
const DUPLICATE_SKIP_LOG_WINDOW_MS = 1500;
const UI_TRANSITION_GUARD_MS = 1800;
const AUTO_TRIGGER_GENERATION_CONFIRM_WINDOW_MS = 5000;
const EXPLICIT_USER_GENERATION_TYPES = new Set([
  'regenerate',
  'swipe'
]);

// ============================================================
// 工具函数
// ============================================================

/**
 * 获取顶层窗口
 */
function getTopWindow() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent;
    }
  } catch (error) {
    // 忽略跨窗口访问异常，回退到当前窗口
  }

  return window;
}

/**
 * 获取消息文本内容（兼容 SillyTavern / TavernHelper 多种字段）
 * @param {Object} msg
 * @returns {string}
 */
function getMessageContent(msg) {
  if (!msg) return '';

  const candidates = [
    msg.mes,
    msg.message,
    msg.content,
    msg.text,
    msg?.data?.content
  ];

  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return '';
}

function normalizeMessageIdentityValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  return '';
}

/**
 * 等待指定时长
 * @param {number} ms
 * @returns {Promise<void>}
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 获取消息标识，优先使用消息自身ID，回退到聊天索引
 * @param {Object} msg
 * @param {number} index
 * @returns {string|number}
 */
function getMessageIdentity(msg, index) {
  const candidates = [
    msg?.message_id,
    msg?.messageId,
    msg?.id,
    msg?.mes_id,
    index
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'number' && Number.isFinite(candidate)) {
      return candidate;
    }

    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim();
    }
  }

  return index;
}

function normalizeChatMessages(rawMessages = []) {
  const chat = Array.isArray(rawMessages) ? rawMessages : [];
  return chat.map((message, index) => ({
    role: normalizeMessageRole(message),
    content: getMessageContent(message),
    name: message?.name || '',
    timestamp: message?.send_date || message?.timestamp || '',
    isSystem: !!message?.is_system,
    isUser: !!message?.is_user,
    sourceId: getMessageIdentity(message, index),
    chatIndex: index,
    originalMessage: message
  }));
}

/**
 * 判断 AI 消息是否已经具备“可供工具处理”的正文内容
 * 用于过滤 MESSAGE_RECEIVED 早期可能出现的 "..." 占位楼层。
 * @param {string} text
 * @returns {boolean}
 */
function isMeaningfulAssistantContent(text) {
  const value = String(text || '').trim();
  if (!value || value.length < 5) {
    return false;
  }

  if (/^[.。·•…\s]+$/.test(value)) {
    return false;
  }

  return true;
}

/**
 * 基于原始聊天消息构建最近会话快照
 * @param {Array} rawMessages
 * @param {string|number|null} preferredMessageId
 * @returns {{messages: Array, lastUserMessage: Object|null, lastAiMessage: Object|null}}
 */
function buildConversationSnapshot(rawMessages, preferredMessageId = null, options = {}) {
  const { lockToMessageId = false } = options;
  const normalizedMessages = normalizeChatMessages(rawMessages);

  const normalizedPreferredId = preferredMessageId === undefined || preferredMessageId === null || preferredMessageId === ''
    ? null
    : String(preferredMessageId).trim();

  let lastAiMessage = null;
  let lastUserMessage = null;

  for (let index = normalizedMessages.length - 1; index >= 0; index -= 1) {
    const message = normalizedMessages[index];
    const messageSourceId = normalizeMessageIdentityValue(message.sourceId);
    const matchesPreferredId = normalizedPreferredId
      && (
        messageSourceId === normalizedPreferredId
        || String(message.chatIndex) === normalizedPreferredId
      );

    if (!lastAiMessage && message.role === 'assistant' && isMeaningfulAssistantContent(message.content)) {
      if (!normalizedPreferredId || !lockToMessageId || matchesPreferredId) {
        lastAiMessage = message;
      }
    }

    if (!lastUserMessage && message.role === 'user' && message.content) {
      lastUserMessage = message;
    }

    if (lastAiMessage && lastUserMessage) {
      break;
    }
  }

  return {
    messages: normalizedMessages,
    lastUserMessage,
    lastAiMessage
  };
}

/**
 * 带重试地读取最近聊天快照，兼容生成结束事件与消息写回时序差异
 * @param {Object} options
 * @returns {Promise<{messages: Array, lastUserMessage: Object|null, lastAiMessage: Object|null}>}
 */
async function getConversationSnapshot(options = {}) {
  const {
    preferredMessageId = null,
    retries = 0,
    retryDelayMs = 250,
    lockToMessageId = false
  } = options;

  let snapshot = { messages: [], lastUserMessage: null, lastAiMessage: null };

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const rawMessages = await getRawChatMessages();
    snapshot = buildConversationSnapshot(rawMessages, preferredMessageId, {
      lockToMessageId
    });

    if (snapshot.lastAiMessage?.content) {
      return snapshot;
    }

    if (attempt < retries) {
      await wait(retryDelayMs);
    }
  }

  return snapshot;
}

/**
 * 标记用户发送意图
 */
function markUserTriggerIntent(source = 'user_trigger_intent') {
  updateGateState({
    lastUserSendIntentAt: Date.now(),
    lastUserIntentSource: source || 'user_trigger_intent'
  });
}

function markUserSendIntent() {
  markUserTriggerIntent('send_button_or_enter');
}

/**
 * 安装发送意图捕获钩子
 * 参考 shujuku，尽量在 SillyTavern 自身发送逻辑前记录一次“用户真实发送”意图
 */
function installSendIntentCaptureHooks() {
  const topWindow = getTopWindow();
  const targetDoc = topWindow?.document;

  if (!targetDoc?.body) {
    return false;
  }

  if (topWindow.__YYT_sendIntentHooksInstalled) {
    return true;
  }

  const sendButtonSelectors = [
    '#send_but',
    '#option_send',
    '#send_button',
    'button[title*="发送"]',
    'button[title*="Send"]'
  ];

  const textareaSelectors = [
    '#send_textarea',
    '#send_textarea textarea',
    'textarea#send_textarea',
    'textarea[data-testid="send_textarea"]'
  ];

  const bindOnce = (selectorList, eventName, handler) => {
    selectorList.forEach((selector) => {
      const element = targetDoc.querySelector(selector);
      if (!element) return;
      element.addEventListener(eventName, handler, true);
    });
  };

  bindOnce(sendButtonSelectors, 'click', () => markUserSendIntent());
  bindOnce(sendButtonSelectors, 'pointerup', () => markUserSendIntent());
  bindOnce(sendButtonSelectors, 'touchend', () => markUserSendIntent());
  bindOnce(textareaSelectors, 'keydown', (event) => {
    const key = event?.key || '';
    if ((key === 'Enter' || key === 'NumpadEnter') && !event.shiftKey) {
      markUserSendIntent();
    }
  });

  topWindow.__YYT_sendIntentHooksInstalled = true;
  log('已安装发送意图捕获钩子');
  return true;
}

/**
 * 判断是否为 quiet / 后台生成
 * @param {string} type
 * @param {Object} params
 * @param {boolean} dryRun
 * @returns {boolean}
 */
function isQuietLikeGeneration(type, params = {}, dryRun = false) {
  if (dryRun) return true;

  const normalizedType = String(type || params?.type || '').trim().toLowerCase();

  return normalizedType.includes('quiet')
    || params?.quiet === true
    || params?.isQuiet === true
    || params?.quiet_prompt === true;
}

/**
 * 获取SillyTavern API
 */
function getSillyTavernAPI() {
  const topWindow = getTopWindow();
  return topWindow.SillyTavern || null;
}

/**
 * 获取 TavernHelper API
 */
function getTavernHelperAPI() {
  const topWindow = getTopWindow();
  return topWindow.TavernHelper || null;
}

function getImmediateRawChatMessages() {
  const api = getSillyTavernAPI();

  try {
    const context = api?.getContext?.() || null;
    if (Array.isArray(context?.chat)) {
      return context.chat;
    }
  } catch (error) {
    // 忽略同步读取上下文失败，继续回退
  }

  if (Array.isArray(api?.chat)) {
    return api.chat;
  }

  return [];
}

function shouldTreatScalarEventPayloadAsMessageId(eventType = '') {
  return eventType === EVENT_TYPES.MESSAGE_RECEIVED
    || eventType === EVENT_TYPES.MESSAGE_SENT
    || eventType === EVENT_TYPES.MESSAGE_UPDATED
    || eventType === EVENT_TYPES.MESSAGE_DELETED;
}

function isValidEventSource(candidate) {
  return !!candidate
    && (
      typeof candidate.on === 'function'
      || typeof candidate.addEventListener === 'function'
    );
}

function detachEventSourceListener(eventSource, eventName, callback) {
  if (!eventSource || typeof callback !== 'function') {
    return false;
  }

  try {
    if (typeof eventSource.off === 'function') {
      eventSource.off(eventName, callback);
      return true;
    }

    if (typeof eventSource.removeListener === 'function') {
      eventSource.removeListener(eventName, callback);
      return true;
    }

    if (typeof eventSource.removeEventListener === 'function') {
      eventSource.removeEventListener(eventName, callback);
      return true;
    }
  } catch (error) {
    traceAlways('warn', '移除事件监听失败', {
      eventName,
      error: error?.message || String(error)
    });
  }

  return false;
}

function getEventTypesFromCandidate(candidate) {
  if (!candidate || typeof candidate !== 'object') {
    return null;
  }

  return candidate.eventTypes
    || candidate.event_types
    || null;
}

function cacheEventBridge(eventSource, eventTypes, source) {
  if (isValidEventSource(eventSource)) {
    eventBridgeState.eventSource = eventSource;
    eventBridgeState.eventTypes = eventTypes || eventBridgeState.eventTypes || null;
    eventBridgeState.source = source || eventBridgeState.source || 'unknown';
    traceAlways('info', '缓存事件桥接成功', {
      source: eventBridgeState.source,
      hasOff: typeof eventSource.off === 'function',
      hasRemoveListener: typeof eventSource.removeListener === 'function',
      hasAddEventListener: typeof eventSource.addEventListener === 'function'
    });
  }
}

function resolveDirectEventBridge() {
  const topWindow = getTopWindow();
  const api = topWindow.SillyTavern || null;
  const context = api?.getContext?.() || null;

  const candidates = [
    {
      source: 'SillyTavern.eventSource',
      eventSource: api?.eventSource,
      eventTypes: api?.eventTypes || api?.event_types || null
    },
    {
      source: 'topWindow.eventSource',
      eventSource: topWindow?.eventSource,
      eventTypes: topWindow?.event_types || topWindow?.eventTypes || null
    },
    {
      source: 'SillyTavern.getContext()',
      eventSource: context?.eventSource || null,
      eventTypes: context?.eventTypes || context?.event_types || null
    },
    {
      source: 'scriptModule exports',
      eventSource: eventBridgeState.scriptModule?.eventSource || null,
      eventTypes: eventBridgeState.scriptModule?.event_types || eventBridgeState.scriptModule?.eventTypes || null
    }
  ];

  for (const candidate of candidates) {
    if (isValidEventSource(candidate.eventSource)) {
      cacheEventBridge(candidate.eventSource, candidate.eventTypes, candidate.source);
      return candidate;
    }
  }

  return {
    source: '',
    eventSource: null,
    eventTypes: null
  };
}

async function ensureEventBridgeReady() {
  const directBridge = resolveDirectEventBridge();
  if (directBridge.eventSource) {
    return directBridge;
  }

  if (!eventBridgeState.loadingPromise) {
    eventBridgeState.loadingPromise = (async () => {
      try {
        const importUrl = EVENT_SOURCE_IMPORT_URL;
        eventBridgeState.scriptModule = await import(importUrl);
      } catch (error) {
        eventBridgeState.importError = error;
        traceAlways('warn', '加载 /script.js 事件桥接失败', error?.message || String(error));
      } finally {
        eventBridgeState.loadingPromise = null;
      }
    })();
  }

  await eventBridgeState.loadingPromise;

  const bridgeAfterImport = resolveDirectEventBridge();
  if (bridgeAfterImport.eventSource) {
    return bridgeAfterImport;
  }

  return {
    source: '',
    eventSource: null,
    eventTypes: null
  };
}

/**
 * 获取事件源
 */
function getEventSource() {
  const bridge = resolveDirectEventBridge();
  return bridge.eventSource || eventBridgeState.eventSource || null;
}

/**
 * 获取事件类型常量
 */
function getEventTypes() {
  const bridge = resolveDirectEventBridge();
  return bridge.eventTypes
    || eventBridgeState.eventTypes
    || EVENT_TYPES;
}

/**
 * 日志输出
 */
function log(...args) {
  if (triggerState.debugMode || settingsService.getDebugSettings()?.enableDebugLog) {
    console.log('[YouYouToolkit:Trigger]', ...args);
  }
}

function traceAlways(level = 'info', ...args) {
  const logger = typeof console[level] === 'function' ? console[level] : console.log;
  logger('[youyou_trigger]', ...args);
}

function getResolvedListenerSettings() {
  const listenerSettings = settingsService.getListenerSettings?.()
    || settingsService.getSettings?.()?.listener
    || {};

  const parsedDebounceMs = parseInt(listenerSettings?.debounceMs, 10);
  const parsedSessionWindowMs = parseInt(listenerSettings?.messageSessionWindowMs, 10);
  const parsedHistoryRetentionLimit = parseInt(listenerSettings?.historyRetentionLimit, 10);

  return {
    listenGenerationEnded: listenerSettings?.listenGenerationEnded !== false,
    ignoreQuietGeneration: listenerSettings?.ignoreQuietGeneration !== false,
    ignoreAutoTrigger: listenerSettings?.ignoreAutoTrigger === true,
    debounceMs: Number.isFinite(parsedDebounceMs) ? Math.max(0, parsedDebounceMs) : 300,
    useMessageReceivedFallback: listenerSettings?.useMessageReceivedFallback !== false,
    useGenerationAfterCommandsFallback: listenerSettings?.useGenerationAfterCommandsFallback !== false,
    messageSessionWindowMs: Number.isFinite(parsedSessionWindowMs) ? Math.max(300, parsedSessionWindowMs) : 1800,
    historyRetentionLimit: Number.isFinite(parsedHistoryRetentionLimit)
      ? Math.max(1, Math.min(50, parsedHistoryRetentionLimit))
      : 10
  };
}

function extractEventMessageId(data, eventType = '') {
  if (data && typeof data === 'object') {
    return normalizeMessageIdentityValue(
      data?.messageId
      ?? data?.id
      ?? data?.message_id
      ?? data?.mes_id
    );
  }

  if (eventType === EVENT_TYPES.GENERATION_ENDED) {
    if (typeof data === 'number' && Number.isFinite(data)) {
      return String(data);
    }

    if (typeof data === 'string' && /^\d+$/.test(data.trim())) {
      return data.trim();
    }
  }

  if (!shouldTreatScalarEventPayloadAsMessageId(eventType)) {
    return '';
  }

  return normalizeMessageIdentityValue(data);
}

function doesMessageMatchIdentity(message, index, candidateId) {
  const normalizedCandidateId = normalizeMessageIdentityValue(candidateId);
  if (!normalizedCandidateId) {
    return false;
  }

  const identity = normalizeMessageIdentityValue(getMessageIdentity(message, index));
  if (identity && identity === normalizedCandidateId) {
    return true;
  }

  const numericCandidateId = Number(normalizedCandidateId);
  return Number.isInteger(numericCandidateId) && index === numericCandidateId;
}

async function findRawChatMessageByIdentity(candidateId) {
  const normalizedCandidateId = normalizeMessageIdentityValue(candidateId);
  if (!normalizedCandidateId) {
    return null;
  }

  const rawMessages = await getRawChatMessages();
  for (let index = rawMessages.length - 1; index >= 0; index -= 1) {
    const message = rawMessages[index];
    if (doesMessageMatchIdentity(message, index, normalizedCandidateId)) {
      return {
        message,
        index
      };
    }
  }

  return null;
}

async function findRawChatMessageByIdentityWithRetries(candidateId, options = {}) {
  const {
    retries = 0,
    retryDelayMs = 80
  } = options;

  let entry = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    entry = await findRawChatMessageByIdentity(candidateId);
    if (entry) {
      return entry;
    }

    if (attempt < retries) {
      await wait(retryDelayMs);
    }
  }

  return null;
}

async function getLatestRawChatMessageEntry() {
  const rawMessages = await getRawChatMessages();
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return null;
  }

  const index = rawMessages.length - 1;
  return {
    message: rawMessages[index],
    index
  };
}

function shouldLockToEventMessageId(triggerEvent, eventData, preferredMessageId) {
  if (!normalizeMessageIdentityValue(preferredMessageId)) {
    return false;
  }

  if (triggerEvent === EVENT_TYPES.MESSAGE_RECEIVED || triggerEvent === EVENT_TYPES.MESSAGE_UPDATED) {
    return true;
  }

  return !!(eventData && typeof eventData === 'object' && (
    eventData?.messageId !== undefined
    || eventData?.message_id !== undefined
    || eventData?.id !== undefined
    || eventData?.mes_id !== undefined
  ));
}

function getLatestUserTriggerIntentTimestamp() {
  const candidates = [
    triggerState.gateState.lastUserSendIntentAt,
    triggerState.gateState.lastUserMessageAt
  ].filter(value => Number(value) > 0);

  return candidates.length > 0 ? Math.max(...candidates) : 0;
}

function hasRecentUserTriggerIntent(now = Date.now()) {
  const latestIntentAt = getLatestUserTriggerIntentTimestamp();
  return latestIntentAt > 0 && (now - latestIntentAt) <= AUTO_TRIGGER_USER_INTENT_TTL_MS;
}

function normalizeGenerationType(type = '', params = null) {
  return String(type || params?.type || '').trim().toLowerCase();
}

function resolveGenerationUserIntent(type, params = null, now = Date.now()) {
  const latestIntentAt = getLatestUserTriggerIntentTimestamp();
  const normalizedGenerationType = normalizeGenerationType(type, params);

  if (latestIntentAt > 0 && (now - latestIntentAt) <= AUTO_TRIGGER_USER_INTENT_TTL_MS) {
    return {
      startedByUserIntent: true,
      userIntentDetectedAt: latestIntentAt,
      userIntentSource: 'recent_user_trigger_intent',
      userIntentDetail: 'recent_user_send_or_message'
    };
  }

  if (EXPLICIT_USER_GENERATION_TYPES.has(normalizedGenerationType)) {
    return {
      startedByUserIntent: true,
      userIntentDetectedAt: now,
      userIntentSource: `explicit_generation_action:${normalizedGenerationType}`,
      userIntentDetail: `generation_type_${normalizedGenerationType}`
    };
  }

  return {
    startedByUserIntent: false,
    userIntentDetectedAt: latestIntentAt,
    userIntentSource: 'none',
    userIntentDetail: 'no_recent_user_intent_or_explicit_generation_action'
  };
}

function getCurrentGenerationBaseline(chatId = resolveCurrentChatIdForSession()) {
  const baseline = triggerState.gateState.lastGenerationBaseline;
  if (!baseline) {
    return null;
  }

  if (chatId && baseline.chatId && baseline.chatId !== chatId) {
    return null;
  }

  return baseline;
}

function hasConfirmedUserTriggerIntent(now = Date.now()) {
  if (hasRecentUserTriggerIntent(now)) {
    return true;
  }

  return !!getCurrentGenerationBaseline()?.startedByUserIntent;
}

function getGenerationConfirmationEligibility(baselineCandidate = null) {
  const baseline = baselineCandidate || getCurrentGenerationBaseline();

  if (!baseline) {
    return {
      eligible: false,
      baseline: null,
      reason: AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
      detail: 'missing_generation_baseline'
    };
  }

  if (triggerState.gateState.lastGenerationDryRun || baseline.dryRun) {
    return {
      eligible: false,
      baseline,
      reason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      detail: 'dry_run_generation'
    };
  }

  return {
    eligible: true,
    baseline,
    reason: '',
    detail: ''
  };
}

function isUiTransitionGuardActive(now = Date.now()) {
  return Number(triggerState.gateState.uiTransitionGuardUntil) > now;
}

function enterUiTransitionGuard(source = '') {
  const now = Date.now();
  updateGateState({
    uiTransitionGuardUntil: now + UI_TRANSITION_GUARD_MS,
    lastUiTransitionAt: now,
    lastUiTransitionSource: source || ''
  });

  traceAlways('info', '进入宿主 UI 过渡守卫', {
    source: source || 'unknown',
    guardUntil: now + UI_TRANSITION_GUARD_MS
  });
}

function clearPendingAutoTriggerTimers(reason = '') {
  for (const timer of toolTriggerManagerState.pendingMessageTimers.values()) {
    clearTimeout(timer);
  }

  toolTriggerManagerState.pendingMessageTimers.clear();

  if (reason) {
    traceAlways('info', '已清理待执行自动触发定时器', { reason });
  }
}

function buildGenerationBaseline(rawMessages = [], metadata = {}) {
  const api = getSillyTavernAPI();
  const context = api?.getContext?.() || null;
  const normalizedMessages = normalizeChatMessages(rawMessages);
  let lastAssistantMessage = null;

  for (let index = normalizedMessages.length - 1; index >= 0; index -= 1) {
    const message = normalizedMessages[index];
    if (message.role === 'assistant' && isMeaningfulAssistantContent(message.content)) {
      lastAssistantMessage = message;
      break;
    }
  }

  return {
    traceId: metadata.traceId || createTraceId('generation'),
    startedAt: Number(metadata.startedAt) || Date.now(),
    capturedAt: Date.now(),
    chatId: resolveStableChatId(api, context, null),
    messageCount: normalizedMessages.length,
    lastAssistantIndex: lastAssistantMessage?.chatIndex ?? -1,
    lastAssistantMessageId: normalizeMessageIdentityValue(lastAssistantMessage?.sourceId),
    lastAssistantPreview: String(lastAssistantMessage?.content || '').slice(0, 160),
    dryRun: !!metadata.dryRun,
    generationType: metadata.type || '',
    generationParams: metadata.params || null,
    startedByUserIntent: !!metadata.startedByUserIntent,
    userIntentDetectedAt: Number(metadata.userIntentDetectedAt) || 0,
    userIntentSource: metadata.userIntentSource || '',
    userIntentDetail: metadata.userIntentDetail || '',
    baselineResolved: metadata.baselineResolved !== undefined ? !!metadata.baselineResolved : true,
    baselineResolutionAt: Number(metadata.baselineResolutionAt) || 0,
    provisional: !!metadata.provisional,
    baselineSource: metadata.baselineSource || ''
  };
}

async function captureGenerationBaseline(metadata = {}) {
  const rawMessages = await getRawChatMessages();
  return buildGenerationBaseline(rawMessages, {
    ...metadata,
    baselineResolved: metadata.baselineResolved !== undefined ? metadata.baselineResolved : true,
    baselineResolutionAt: Number(metadata.baselineResolutionAt) || Date.now(),
    provisional: metadata.provisional === true ? true : false,
    baselineSource: metadata.baselineSource || 'captured_chat_snapshot'
  });
}

function createProvisionalGenerationBaseline(metadata = {}) {
  return buildGenerationBaseline(getImmediateRawChatMessages(), {
    ...metadata,
    baselineResolved: false,
    baselineResolutionAt: 0,
    provisional: true,
    baselineSource: metadata.baselineSource || 'provisional_immediate_snapshot'
  });
}

async function waitForResolvedGenerationBaseline(options = {}) {
  const {
    chatId = resolveCurrentChatIdForSession(),
    traceId = '',
    retries = 4,
    retryDelayMs = 80
  } = options;

  let baseline = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    baseline = getCurrentGenerationBaseline(chatId);

    const matchesTrace = !traceId || !baseline?.traceId || baseline.traceId === traceId;
    if (baseline && matchesTrace && baseline.baselineResolved !== false) {
      return baseline;
    }

    if (attempt < retries) {
      await wait(retryDelayMs);
    }
  }

  if (!baseline) {
    return null;
  }

  const matchesTrace = !traceId || !baseline?.traceId || baseline.traceId === traceId;
  return matchesTrace ? baseline : null;
}

function isWithinGenerationConfirmationWindow(now = Date.now(), baseline = getCurrentGenerationBaseline()) {
  if (triggerState.gateState.isGenerating) {
    return true;
  }

  if (!baseline) {
    return false;
  }

  const lastGenerationAt = Number(triggerState.gateState.lastGenerationAt) || 0;
  if (lastGenerationAt <= 0) {
    return false;
  }

  return (now - lastGenerationAt) <= AUTO_TRIGGER_GENERATION_CONFIRM_WINDOW_MS;
}

function normalizeResolvedMessageEntry(entry) {
  if (!entry?.message) {
    return null;
  }

  return {
    role: normalizeMessageRole(entry.message),
    content: getMessageContent(entry.message),
    chatIndex: entry.index,
    sourceId: normalizeMessageIdentityValue(getMessageIdentity(entry.message, entry.index))
  };
}

async function evaluateMessageReceivedConfirmationCandidate(resolvedMessageEntry, options = {}) {
  const now = Date.now();
  const traceId = options?.traceId || triggerState.gateState.lastGenerationTraceId || '';
  const messageEntry = normalizeResolvedMessageEntry(resolvedMessageEntry);
  const baseline = await waitForResolvedGenerationBaseline({
    traceId,
    retries: 4,
    retryDelayMs: 80
  }) || getCurrentGenerationBaseline();
  const withinGenerationWindow = isWithinGenerationConfirmationWindow(now, baseline);
  const eventBelongsToCurrentGeneration = !!(messageEntry && baseline && isAssistantMessageAfterBaseline(messageEntry, baseline));
  const traceMatches = !traceId || !baseline?.traceId || baseline.traceId === traceId;

  if (!messageEntry) {
    return {
      allowed: false,
      baseline,
      eventBelongsToCurrentGeneration: false,
      historicalReplayBlocked: false,
      historicalReplayReason: '',
      reason: AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
      detail: 'message_received_identity_not_resolved'
    };
  }

  if (!baseline) {
    return {
      allowed: false,
      baseline: null,
      eventBelongsToCurrentGeneration: false,
      historicalReplayBlocked: true,
      historicalReplayReason: 'message_received_without_generation_baseline',
      reason: AUTO_TRIGGER_SKIP_REASONS.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,
      detail: 'message_received_without_generation_baseline'
    };
  }

  if (baseline.baselineResolved === false) {
    return {
      allowed: false,
      baseline,
      eventBelongsToCurrentGeneration: false,
      historicalReplayBlocked: false,
      historicalReplayReason: '',
      reason: AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
      detail: 'generation_baseline_pending_resolution'
    };
  }

  if (!traceMatches) {
    return {
      allowed: false,
      baseline,
      eventBelongsToCurrentGeneration: false,
      historicalReplayBlocked: true,
      historicalReplayReason: 'message_received_trace_mismatch',
      reason: AUTO_TRIGGER_SKIP_REASONS.HISTORICAL_REPLAY_MESSAGE_RECEIVED,
      detail: 'message_received_trace_mismatch'
    };
  }

  if (!triggerState.gateState.isGenerating && !withinGenerationWindow) {
    return {
      allowed: false,
      baseline,
      eventBelongsToCurrentGeneration,
      historicalReplayBlocked: true,
      historicalReplayReason: 'message_received_outside_active_generation',
      reason: AUTO_TRIGGER_SKIP_REASONS.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,
      detail: 'message_received_outside_active_generation'
    };
  }

  if (!eventBelongsToCurrentGeneration) {
    return {
      allowed: false,
      baseline,
      eventBelongsToCurrentGeneration: false,
      historicalReplayBlocked: true,
      historicalReplayReason: 'message_received_before_generation_baseline',
      reason: AUTO_TRIGGER_SKIP_REASONS.HISTORICAL_REPLAY_MESSAGE_RECEIVED,
      detail: 'message_received_before_generation_baseline'
    };
  }

  return {
    allowed: true,
    baseline,
    eventBelongsToCurrentGeneration: true,
    historicalReplayBlocked: false,
    historicalReplayReason: '',
    reason: '',
    detail: '',
    messageEntry
  };
}

function isAssistantMessageAfterBaseline(message, baseline) {
  if (!message || message.role !== 'assistant' || !isMeaningfulAssistantContent(message.content)) {
    return false;
  }

  if (!baseline) {
    return true;
  }

  if (Number.isInteger(baseline.lastAssistantIndex) && baseline.lastAssistantIndex >= 0) {
    return message.chatIndex > baseline.lastAssistantIndex;
  }

  const baselineMessageCount = Number.isFinite(baseline.messageCount)
    ? baseline.messageCount
    : 0;

  return message.chatIndex >= baselineMessageCount;
}

async function resolveConfirmedAssistantMessage(preferredMessageId = '') {
  const normalizedPreferredMessageId = normalizeMessageIdentityValue(preferredMessageId);
  const api = getSillyTavernAPI();
  const context = api?.getContext?.() || null;
  const currentChatId = resolveStableChatId(api, context, null);
  const rawMessages = await getRawChatMessages();
  const normalizedMessages = normalizeChatMessages(rawMessages);
  const baseline = triggerState.gateState.lastGenerationBaseline?.chatId === currentChatId
    ? triggerState.gateState.lastGenerationBaseline
    : null;

  if (normalizedPreferredMessageId) {
    const matched = normalizedMessages.find((message) => {
      const sourceId = normalizeMessageIdentityValue(message.sourceId);
      return sourceId === normalizedPreferredMessageId
        || String(message.chatIndex) === normalizedPreferredMessageId;
    });

    if (!matched) {
      return null;
    }

    return isMeaningfulAssistantContent(matched.content)
      && matched.role === 'assistant'
      && (!baseline || isAssistantMessageAfterBaseline(matched, baseline))
      ? matched
      : null;
  }

  if (!baseline) {
    return null;
  }

  for (let index = normalizedMessages.length - 1; index >= 0; index -= 1) {
    const message = normalizedMessages[index];
    if (isAssistantMessageAfterBaseline(message, baseline)) {
      return message;
    }
  }

  return null;
}

async function getConfirmedAssistantMessageWithRetries(preferredMessageId = '', options = {}) {
  const {
    retries = 0,
    retryDelayMs = 250
  } = options;

  let confirmedMessage = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    confirmedMessage = await resolveConfirmedAssistantMessage(preferredMessageId);
    if (confirmedMessage) {
      return confirmedMessage;
    }

    if (attempt < retries) {
      await wait(retryDelayMs);
    }
  }

  return null;
}

function getCurrentGenerationDiagnosticFields() {
  const baseline = triggerState.gateState.lastGenerationBaseline;

  return {
    baselineResolved: baseline?.baselineResolved ?? false,
    baselineResolutionAt: baseline?.baselineResolutionAt || 0,
    provisionalBaseline: !!baseline?.provisional,
    generationStartedByUserIntent: !!baseline?.startedByUserIntent,
    generationUserIntentSource: baseline?.userIntentSource || '',
    generationUserIntentDetail: baseline?.userIntentDetail || '',
    lastUserIntentSource: triggerState.gateState.lastUserIntentSource || ''
  };
}

function getCurrentSessionGenerationFrozenFields() {
  const baseline = triggerState.gateState.lastGenerationBaseline;

  return {
    sessionGenerationTraceId: triggerState.gateState.lastGenerationTraceId || '',
    sessionGenerationStartedAt: baseline?.startedAt || 0,
    sessionBaselineResolvedAtCreation: baseline?.baselineResolved ?? false,
    sessionBaselineResolutionAtCreation: baseline?.baselineResolutionAt || 0,
    sessionProvisionalBaselineAtCreation: !!baseline?.provisional,
    sessionGenerationStartedByUserIntent: !!baseline?.startedByUserIntent,
    sessionGenerationUserIntentSource: baseline?.userIntentSource || '',
    sessionGenerationUserIntentDetail: baseline?.userIntentDetail || '',
    sessionLastUserIntentSourceAtCreation: triggerState.gateState.lastUserIntentSource || '',
    sessionGenerationCapturedAt: Date.now()
  };
}

function createEventDebugSnapshot(snapshot = {}) {
  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();

  return {
    stage: '',
    eventType: '',
    traceId: '',
    sessionKey: '',
    messageId: '',
    messageKey: '',
    messageRole: '',
    reason: '',
    skipReasonDetailed: '',
    confirmedAssistantMessageId: '',
    scheduledDelayMs: 0,
    candidateToolIds: [],
    receivedAt: Date.now(),
    handledAt: 0,
    generationTraceId: triggerState.gateState.lastGenerationTraceId || '',
    generationDryRun: !!triggerState.gateState.lastGenerationDryRun,
    generationStartedAt: triggerState.gateState.lastGenerationBaseline?.startedAt || 0,
    uiTransitionGuardActive: isUiTransitionGuardActive(),
    uiTransitionGuardUntil: triggerState.gateState.uiTransitionGuardUntil || 0,
    lastUiTransitionSource: triggerState.gateState.lastUiTransitionSource || '',
    baselineMessageCount: triggerState.gateState.lastGenerationBaseline?.messageCount || 0,
    baselineAssistantId: triggerState.gateState.lastGenerationBaseline?.lastAssistantMessageId || '',
    generationBaselineMessageCount: triggerState.gateState.lastGenerationBaseline?.messageCount || 0,
    generationBaselineAssistantId: triggerState.gateState.lastGenerationBaseline?.lastAssistantMessageId || '',
    confirmationSource: '',
    isSpeculativeSession: false,
    eventBelongsToCurrentGeneration: false,
    historicalReplayBlocked: false,
    historicalReplayReason: '',
    registeredEvents: Array.from(toolTriggerManagerState.listeners.keys()),
    listenerSettings: getResolvedListenerSettings(),
    hasRecentUserTriggerIntent: hasRecentUserTriggerIntent(),
    hasConfirmedUserTriggerIntent: hasConfirmedUserTriggerIntent(),
    ...generationDiagnosticFields,
    ...snapshot
  };
}

function saveEventDebugSnapshot(snapshot = {}) {
  const normalizedSnapshot = createEventDebugSnapshot(snapshot);
  toolTriggerManagerState.lastEventDebugSnapshot = normalizedSnapshot;
  log('自动触发事件快照:', normalizedSnapshot);
  return normalizedSnapshot;
}

function shouldSkipAutoTriggerByListenerSettings() {
  const listenerSettings = getResolvedListenerSettings();

  if (listenerSettings.listenGenerationEnded === false) {
    return {
      skip: true,
      reason: AUTO_TRIGGER_SKIP_REASONS.LISTENER_DISABLED,
      listenerSettings
    };
  }

  if (listenerSettings.ignoreAutoTrigger && !hasConfirmedUserTriggerIntent()) {
    return {
      skip: true,
      reason: AUTO_TRIGGER_SKIP_REASONS.IGNORED_AUTO_TRIGGER,
      listenerSettings
    };
  }

  return {
    skip: false,
    reason: '',
    listenerSettings
  };
}

function createAutoTriggerSnapshot(snapshot = {}) {
  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();

  return {
    triggerEvent: '',
    traceId: '',
    sessionKey: '',
    messageId: '',
    messageKey: '',
    selectedToolIds: [],
    skipReason: '',
    skipReasonDetailed: '',
    lockedAiMessageId: '',
    confirmedAssistantMessageId: '',
    confirmationSource: '',
    eventBelongsToCurrentGeneration: false,
    historicalReplayBlocked: false,
    historicalReplayReason: '',
    generationTraceId: triggerState.gateState.lastGenerationTraceId || '',
    ...generationDiagnosticFields,
    triggeredAt: Date.now(),
    ...snapshot
  };
}

function saveAutoTriggerSnapshot(snapshot = {}) {
  const normalizedSnapshot = createAutoTriggerSnapshot(snapshot);
  toolTriggerManagerState.lastAutoTriggerSnapshot = normalizedSnapshot;
  log('自动触发快照:', normalizedSnapshot);
  return normalizedSnapshot;
}

function patchToolsDiagnostics(tools, runtimePartial) {
  const toolList = Array.isArray(tools) ? tools : [];

  toolList.forEach((tool) => {
    if (!tool?.id) return;

    patchToolRuntime(tool.id, {
      lastTriggerAt: Date.now(),
      ...runtimePartial
    }, {
      touchLastRunAt: false,
      emitEvent: false
    });
  });
}

/**
 * 获取稳定的聊天ID，避免回退到时间戳导致上下文无法复用
 */
function resolveStableChatId(api, context, character) {
  const candidates = [
    context?.chatId,
    context?.chat_id,
    context?.chat_filename,
    context?.chatMetadata?.chatId,
    context?.chatMetadata?.chat_id,
    context?.chatMetadata?.file_name,
    context?.chatMetadata?.name,
    api?.chatId,
    api?.chat_id,
    api?.chat_filename
  ];

  const matched = candidates.find(value => typeof value === 'string' && value.trim());
  if (matched) {
    return matched;
  }

  if (character?.id !== undefined && character?.id !== null) {
    return `chat_char_${character.id}`;
  }

  if (api?.this_chid !== undefined && api?.this_chid !== null) {
    return `chat_char_${api.this_chid}`;
  }

  return 'chat_default';
}

// ============================================================
// 事件监听管理
// ============================================================

/**
 * 注册事件监听器
 * @param {string} eventType 事件类型
 * @param {Function} callback 回调函数
 * @param {Object} options 选项
 * @returns {Function} 取消注册函数
 */
export function registerEventListener(eventType, callback, options = {}) {
  if (!eventType || typeof callback !== 'function') {
    log('无效的事件类型或回调函数');
    traceAlways('warn', '注册事件监听失败：事件类型或回调无效', { eventType });
    return () => {};
  }
  
  const { once = false, priority = 0 } = options;
  
  // 获取SillyTavern事件源
  const eventSource = getEventSource();
  const eventTypes = getEventTypes();
  
  // 映射事件类型
  const stEventType = eventTypes[eventType] || eventType;
  
  // 创建包装回调
  const wrappedCallback = async (...args) => {
    try {
      traceAlways('info', '收到事件', eventType, args[0] ?? null);

      // 门控检查
      if (options.gateCheck && !await checkGate(options.gateCheck)) {
        log(`门控检查失败，跳过事件: ${eventType}`);
        traceAlways('warn', '门控检查失败，跳过事件', eventType);
        return;
      }
      
      // 执行回调
      await callback(...args);
      
      // 如果是一次性监听，自动取消注册
      if (once) {
        unregisterEventListener(eventType, wrappedCallback);
      }
    } catch (error) {
      console.error(`[YouYouToolkit:Trigger] 事件处理错误:`, error);
    }
  };
  
  // 存储监听器
  if (!triggerState.listeners.has(eventType)) {
    triggerState.listeners.set(eventType, new Set());
  }
  triggerState.listeners.get(eventType).add(wrappedCallback);
  
  // 注册到SillyTavern
  if (eventSource && typeof eventSource.on === 'function') {
    eventSource.on(stEventType, wrappedCallback);
    log(`已注册事件监听器: ${eventType}`);
    traceAlways('info', '已注册事件源监听', { eventType, stEventType });
  } else if (eventSource && typeof eventSource.addEventListener === 'function') {
    eventSource.addEventListener(stEventType, wrappedCallback);
    log(`已注册事件监听器: ${eventType}`);
    traceAlways('info', '已注册 addEventListener 事件监听', { eventType, stEventType });
  } else {
    // 回退到DOM事件
    const topWindow = getTopWindow();
    if (topWindow.addEventListener) {
      topWindow.addEventListener(stEventType, wrappedCallback);
      log(`已注册DOM事件监听器: ${eventType}`);
      traceAlways('warn', '事件源不可用，回退为 DOM 事件监听', { eventType, stEventType });
    }
  }
  
  // 返回取消注册函数
  return () => unregisterEventListener(eventType, wrappedCallback);
}

/**
 * 取消注册事件监听器
 * @param {string} eventType 事件类型
 * @param {Function} callback 回调函数
 */
export function unregisterEventListener(eventType, callback) {
  const listeners = triggerState.listeners.get(eventType);
  if (listeners && listeners.has(callback)) {
    listeners.delete(callback);
    
    // 从SillyTavern取消注册
    const eventSource = getEventSource();
    const eventTypes = getEventTypes();
    const stEventType = eventTypes[eventType] || eventType;
    
    if (detachEventSourceListener(eventSource, stEventType, callback)) {
      log(`已取消事件监听器: ${eventType}`);
    } else {
      // 回退到DOM事件
      const topWindow = getTopWindow();
      if (topWindow.removeEventListener) {
        topWindow.removeEventListener(stEventType, callback);
      }
    }
  }
}

/**
 * 移除所有事件监听器
 */
export function removeAllListeners() {
  const eventSource = getEventSource();
  const eventTypes = getEventTypes();
  
  for (const [eventType, listeners] of triggerState.listeners) {
    const stEventType = eventTypes[eventType] || eventType;
    
    for (const callback of listeners) {
      if (!detachEventSourceListener(eventSource, stEventType, callback)) {
        const topWindow = getTopWindow();
        if (topWindow.removeEventListener) {
          topWindow.removeEventListener(stEventType, callback);
        }
      }
    }
  }
  
  triggerState.listeners.clear();
  log('已移除所有事件监听器');
}

// ============================================================
// 门控检查
// ============================================================

/**
 * 定义门控条件
 * @typedef {Object} GateCondition
 * @property {number} minInterval - 最小间隔时间(ms)
 * @property {number} maxInterval - 最大间隔时间(ms)
 * @property {string[]} requireEvents - 需要先发生的事件
 * @property {Function} customCheck - 自定义检查函数
 * @property {boolean} requireUserMessage - 是否需要用户消息
 * @property {boolean} excludeQuietGeneration - 是否排除quiet生成
 */

/**
 * 检查门控条件
 * @param {GateCondition} condition 门控条件
 * @returns {Promise<boolean>}
 */
export async function checkGate(condition) {
  if (!condition) return true;
  
  const now = Date.now();
  const gate = triggerState.gateState;
  
  // 检查最小间隔
  if (condition.minInterval && gate.lastGenerationAt) {
    if (now - gate.lastGenerationAt < condition.minInterval) {
      log('门控检查失败: 间隔时间过短');
      return false;
    }
  }
  
  // 检查最大间隔
  if (condition.maxInterval && gate.lastUserMessageAt) {
    if (now - gate.lastUserMessageAt > condition.maxInterval) {
      log('门控检查失败: 间隔时间过长');
      return false;
    }
  }
  
  // 检查是否需要用户消息
  if (condition.requireUserMessage) {
    if (!gate.lastUserMessageId) {
      log('门控检查失败: 缺少用户消息');
      return false;
    }
  }
  
  // 检查是否排除quiet生成
  if (condition.excludeQuietGeneration) {
    if (gate.lastGenerationType === 'quiet') {
      log('门控检查失败: quiet生成被排除');
      return false;
    }
  }
  
  // 执行自定义检查
  if (condition.customCheck && typeof condition.customCheck === 'function') {
    try {
      const result = await condition.customCheck(gate);
      if (!result) {
        log('门控检查失败: 自定义检查返回false');
        return false;
      }
    } catch (error) {
      console.error('[YouYouToolkit:Trigger] 自定义门控检查错误:', error);
      return false;
    }
  }
  
  return true;
}

/**
 * 更新门控状态
 * @param {Object} update 更新内容
 */
export function updateGateState(update) {
  Object.assign(triggerState.gateState, update);
}

/**
 * 重置门控状态
 */
export function resetGateState() {
  triggerState.gateState = {
    lastUserSendIntentAt: 0,
    lastUserIntentSource: '',
    lastUserMessageId: null,
    lastUserMessageText: '',
    lastUserMessageAt: 0,
    lastGenerationTraceId: '',
    lastGenerationType: null,
    lastGenerationParams: null,
    lastGenerationDryRun: false,
    lastGenerationAt: 0,
    isGenerating: false,
    lastGenerationBaseline: null,
    uiTransitionGuardUntil: 0,
    lastUiTransitionAt: 0,
    lastUiTransitionSource: ''
  };
}

// ============================================================
// 上下文获取
// ============================================================

/**
 * 获取当前聊天上下文
 * @param {Object} options 选项
 * @returns {Promise<Object>}
 */
export async function getChatContext(options = {}) {
  const {
    depth = 3,
    includeUser = true,
    includeAssistant = true,
    includeSystem = false,
    format = 'messages' // 'messages' | 'text'
  } = options;
  
  const api = getSillyTavernAPI();
  if (!api) {
    log('无法获取SillyTavern API');
    return null;
  }
  
  try {
    // 优先使用 TavernHelper 获取完整聊天记录，回退到 SillyTavern 上下文
    const chat = await getRawChatMessages();
    
    // 提取指定深度的消息
    const messages = [];
    const startIndex = Math.max(0, chat.length - depth);
    
    for (let i = startIndex; i < chat.length; i++) {
      const msg = chat[i];
      if (!msg) continue;
      const role = normalizeMessageRole(msg);
      
      // 过滤消息类型
      if (role === 'user' && !includeUser) continue;
      if (role === 'system' && !includeSystem) continue;
      if (role === 'assistant' && !includeAssistant) continue;
      
      if (format === 'messages') {
        const content = getMessageContent(msg);
        messages.push({
          role,
          content,
          name: msg.name || '',
          timestamp: msg.send_date || msg.timestamp,
          isSystem: !!msg.is_system,
          isUser: !!msg.is_user
        });
      } else {
        messages.push(getMessageContent(msg));
      }
    }
    
    return {
      messages,
      totalMessages: chat.length,
      startIndex,
      endIndex: chat.length - 1
    };
  } catch (error) {
    console.error('[YouYouToolkit:Trigger] 获取聊天上下文失败:', error);
    return null;
  }
}

/**
 * 规范化消息角色
 * @param {Object} msg
 * @returns {'user'|'assistant'|'system'}
 */
function normalizeMessageRole(msg) {
  if (!msg) return 'assistant';

  if (msg.is_user) return 'user';
  if (msg.is_system) return 'system';

  const role = String(msg.role || '').toLowerCase();
  if (role === 'user' || role === 'assistant' || role === 'system') {
    return role;
  }

  return 'assistant';
}

/**
 * 获取原始聊天消息
 * @returns {Promise<Array>}
 */
async function getRawChatMessages() {
  const helper = getTavernHelperAPI();
  const api = getSillyTavernAPI();

  if (helper?.getChatMessages) {
    try {
      let lastMessageId = -1;

      if (typeof helper.getLastMessageId === 'function') {
        lastMessageId = helper.getLastMessageId();
      }

      if (!Number.isFinite(lastMessageId) || lastMessageId < 0) {
        const context = api?.getContext?.() || null;
        const contextChat = Array.isArray(context?.chat) ? context.chat : [];
        const apiChat = Array.isArray(api?.chat) ? api.chat : [];
        const fallbackChat = contextChat.length ? contextChat : apiChat;
        lastMessageId = fallbackChat.length - 1;
      }

      if (Number.isFinite(lastMessageId) && lastMessageId >= 0) {
        const messages = await helper.getChatMessages(`0-${lastMessageId}`, {
          include_swipes: false,
          include_hidden: true
        });

        if (Array.isArray(messages) && messages.length > 0) {
          return messages;
        }
      }
    } catch (error) {
      console.warn('[YouYouToolkit:Trigger] 通过 TavernHelper 读取聊天消息失败，回退到默认来源:', error);
    }
  }

  try {
    const context = api?.getContext?.() || null;
    if (Array.isArray(context?.chat) && context.chat.length > 0) {
      return context.chat;
    }
  } catch (error) {
    console.warn('[YouYouToolkit:Trigger] 通过 getContext() 读取聊天失败:', error);
  }

  if (Array.isArray(api?.chat)) {
    return api.chat;
  }

  return [];
}

/**
 * 获取当前角色信息
 * @returns {Promise<Object>}
 */
export async function getCurrentCharacter() {
  const api = getSillyTavernAPI();
  if (!api) return null;
  
  try {
    const charId = api.this_chid;
    const characters = api.characters || [];
    
    if (charId >= 0 && charId < characters.length) {
      const char = characters[charId];
      return {
        id: charId,
        name: char.name || '',
        description: char.description || '',
        personality: char.personality || '',
        scenario: char.scenario || '',
        firstMes: char.first_mes || '',
        mesExample: char.mes_example || ''
      };
    }
    
    return null;
  } catch (error) {
    console.error('[YouYouToolkit:Trigger] 获取角色信息失败:', error);
    return null;
  }
}

/**
 * 获取世界书内容
 * @param {Object} options 选项
 * @returns {Promise<string>}
 */
export async function getWorldbookContent(options = {}) {
  const {
    enabledOnly = true,
    maxLength = 10000
  } = options;
  
  const api = getSillyTavernAPI();
  if (!api) return '';
  
  try {
    // 获取世界书条目
    const lorebook = api.lorebook || [];
    const entries = lorebook.entries || [];
    
    const contents = [];
    let totalLength = 0;
    
    for (const entry of entries) {
      // 过滤禁用条目
      if (enabledOnly && !entry.enabled) continue;
      
      const content = entry.content || '';
      if (content && totalLength + content.length <= maxLength) {
        contents.push(content);
        totalLength += content.length;
      }
    }
    
    return contents.join('\n\n');
  } catch (error) {
    console.error('[YouYouToolkit:Trigger] 获取世界书内容失败:', error);
    return '';
  }
}

/**
 * 获取完整的执行上下文
 * @param {Object} options 选项
 * @returns {Promise<Object>}
 */
export async function getFullContext(options = {}) {
  const [chatContext, character, worldbook] = await Promise.all([
    getChatContext(options.chat || {}),
    getCurrentCharacter(),
    getWorldbookContent(options.worldbook || {})
  ]);
  
  return {
    chat: chatContext,
    character,
    worldbook,
    timestamp: Date.now()
  };
}

// ============================================================
// 触发处理器
// ============================================================

/**
 * 注册触发处理器
 * @param {string} handlerId 处理器ID
 * @param {Object} config 配置
 * @returns {Function} 取消注册函数
 */
export function registerTriggerHandler(handlerId, config) {
  if (!handlerId || !config) {
    log('无效的处理器ID或配置');
    return () => {};
  }
  
  const {
    eventType,
    handler,
    gateCondition,
    priority = 0
  } = config;
  
  if (!eventType || typeof handler !== 'function') {
    log('无效的事件类型或处理器函数');
    return () => {};
  }
  
  // 存储处理器配置
  triggerState.handlers.set(handlerId, {
    eventType,
    handler,
    gateCondition,
    priority,
    enabled: true
  });
  
  // 注册事件监听器
  const unregister = registerEventListener(eventType, async (...args) => {
    // 获取处理器配置
    const handlerConfig = triggerState.handlers.get(handlerId);
    if (!handlerConfig || !handlerConfig.enabled) return;
    
    // 执行门控检查
    if (handlerConfig.gateCondition) {
      const passed = await checkGate(handlerConfig.gateCondition);
      if (!passed) return;
    }
    
    // 执行处理器
    await handlerConfig.handler(...args);
  }, { priority });
  
  log(`已注册触发处理器: ${handlerId}`);
  
  // 返回取消注册函数
  return () => {
    unregister();
    triggerState.handlers.delete(handlerId);
    log(`已取消触发处理器: ${handlerId}`);
  };
}

/**
 * 启用/禁用触发处理器
 * @param {string} handlerId 处理器ID
 * @param {boolean} enabled 是否启用
 */
export function setTriggerHandlerEnabled(handlerId, enabled) {
  const config = triggerState.handlers.get(handlerId);
  if (config) {
    config.enabled = enabled;
    log(`触发处理器 ${handlerId} 已${enabled ? '启用' : '禁用'}`);
  }
}

/**
 * 移除所有触发处理器
 */
export function removeAllTriggerHandlers() {
  triggerState.handlers.clear();
  log('已移除所有触发处理器');
}

// ============================================================
// 工具触发管理器
// ============================================================

/**
 * 工具触发管理器状态
 */
const toolTriggerManagerState = {
  initialized: false,
  listeners: new Map(),
  messageSessions: new Map(),
  recentSessionHistory: [],
  recentEventTimeline: [],
  lastExecutionContext: null,
  lastHandledMessageKey: '',
  pendingMessageTimers: new Map(),
  lastAutoTriggerSnapshot: null,
  lastEventDebugSnapshot: null,
  lastDuplicateMessageKey: '',
  lastDuplicateMessageAt: 0
};

function createTraceId(prefix = 'trace') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function trimManagerHistoryEntries(entries, limit = 10) {
  const normalizedLimit = Number.isFinite(limit)
    ? Math.max(1, Math.min(50, Math.floor(limit)))
    : 10;

  if (!Array.isArray(entries)) {
    return [];
  }

  if (entries.length <= normalizedLimit) {
    return entries;
  }

  return entries.slice(entries.length - normalizedLimit);
}

function resolveCurrentChatIdForSession() {
  const api = getSillyTavernAPI();
  const context = api?.getContext?.() || null;
  return resolveStableChatId(api, context, null);
}

function buildMessageSessionKey(chatId, messageId, eventType = '') {
  const resolvedChatId = chatId || resolveCurrentChatIdForSession();
  const normalizedMessageId = normalizeMessageIdentityValue(messageId);
  return `${resolvedChatId}::${normalizedMessageId || `event:${eventType || 'unknown'}:latest`}`;
}

function createMessageSession(eventType, data, snapshot = {}) {
  const messageId = normalizeMessageIdentityValue(snapshot?.messageId || extractEventMessageId(data, eventType));
  const chatId = snapshot?.chatId || resolveCurrentChatIdForSession();
  const sessionKey = snapshot?.sessionKey || buildMessageSessionKey(chatId, messageId, eventType);
  const now = Date.now();
  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();
  const generationFrozenFields = getCurrentSessionGenerationFrozenFields();

  return {
    sessionKey,
    traceId: snapshot?.traceId || createTraceId('session'),
    chatId,
    messageId,
    messageKey: snapshot?.messageKey || '',
    messageRole: snapshot?.messageRole || '',
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    confirmationSource: snapshot?.confirmationSource || '',
    isSpeculativeSession: !!snapshot?.isSpeculativeSession,
    eventBelongsToCurrentGeneration: !!snapshot?.eventBelongsToCurrentGeneration,
    historicalReplayBlocked: !!snapshot?.historicalReplayBlocked,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    skipReasonDetailed: snapshot?.skipReasonDetailed || '',
    firstEventType: snapshot?.eventType || eventType || '',
    receivedEvents: eventType ? [eventType] : [],
    phase: snapshot?.phase || MESSAGE_SESSION_PHASES.RECEIVED,
    skipReason: snapshot?.skipReason || '',
    scheduledAt: 0,
    handledAt: 0,
    completedAt: 0,
    candidateToolIds: Array.isArray(snapshot?.candidateToolIds) ? [...snapshot.candidateToolIds] : [],
    executionPathIds: Array.isArray(snapshot?.executionPathIds) ? [...snapshot.executionPathIds] : [],
    sourceMessageLocked: !!messageId,
    baselineResolved: snapshot?.baselineResolved ?? generationDiagnosticFields.baselineResolved,
    baselineResolutionAt: snapshot?.baselineResolutionAt ?? generationDiagnosticFields.baselineResolutionAt,
    provisionalBaseline: snapshot?.provisionalBaseline ?? generationDiagnosticFields.provisionalBaseline,
    generationStartedByUserIntent: snapshot?.generationStartedByUserIntent ?? generationDiagnosticFields.generationStartedByUserIntent,
    generationUserIntentSource: snapshot?.generationUserIntentSource || generationDiagnosticFields.generationUserIntentSource,
    generationUserIntentDetail: snapshot?.generationUserIntentDetail || generationDiagnosticFields.generationUserIntentDetail,
    lastUserIntentSource: snapshot?.lastUserIntentSource || generationDiagnosticFields.lastUserIntentSource,
    sessionGenerationTraceId: snapshot?.sessionGenerationTraceId || generationFrozenFields.sessionGenerationTraceId,
    sessionGenerationStartedAt: snapshot?.sessionGenerationStartedAt ?? generationFrozenFields.sessionGenerationStartedAt,
    sessionBaselineResolvedAtCreation: snapshot?.sessionBaselineResolvedAtCreation ?? generationFrozenFields.sessionBaselineResolvedAtCreation,
    sessionBaselineResolutionAtCreation: snapshot?.sessionBaselineResolutionAtCreation ?? generationFrozenFields.sessionBaselineResolutionAtCreation,
    sessionProvisionalBaselineAtCreation: snapshot?.sessionProvisionalBaselineAtCreation ?? generationFrozenFields.sessionProvisionalBaselineAtCreation,
    sessionGenerationStartedByUserIntent: snapshot?.sessionGenerationStartedByUserIntent ?? generationFrozenFields.sessionGenerationStartedByUserIntent,
    sessionGenerationUserIntentSource: snapshot?.sessionGenerationUserIntentSource || generationFrozenFields.sessionGenerationUserIntentSource,
    sessionGenerationUserIntentDetail: snapshot?.sessionGenerationUserIntentDetail || generationFrozenFields.sessionGenerationUserIntentDetail,
    sessionLastUserIntentSourceAtCreation: snapshot?.sessionLastUserIntentSourceAtCreation || generationFrozenFields.sessionLastUserIntentSourceAtCreation,
    sessionGenerationCapturedAt: snapshot?.sessionGenerationCapturedAt ?? generationFrozenFields.sessionGenerationCapturedAt,
    createdAt: now,
    updatedAt: now
  };
}

function pruneExpiredMessageSessions(now = Date.now()) {
  const { messageSessionWindowMs } = getResolvedListenerSettings();
  for (const [sessionKey, session] of toolTriggerManagerState.messageSessions.entries()) {
    const anchor = session?.completedAt || session?.handledAt || session?.updatedAt || session?.createdAt || 0;
    if (anchor > 0 && (now - anchor) > messageSessionWindowMs) {
      toolTriggerManagerState.messageSessions.delete(sessionKey);
    }
  }
}

function getOrCreateMessageSession(eventType, data, snapshot = {}) {
  pruneExpiredMessageSessions();

  const provisionalMessageId = normalizeMessageIdentityValue(snapshot?.messageId || extractEventMessageId(data, eventType));
  const chatId = snapshot?.chatId || resolveCurrentChatIdForSession();
  const sessionKey = snapshot?.sessionKey || buildMessageSessionKey(chatId, provisionalMessageId, eventType);
  let session = toolTriggerManagerState.messageSessions.get(sessionKey);

  if (!session) {
    session = createMessageSession(eventType, data, {
      ...snapshot,
      chatId,
      sessionKey,
      messageId: provisionalMessageId
    });
    toolTriggerManagerState.messageSessions.set(sessionKey, session);
    return session;
  }

  if (eventType && !session.receivedEvents.includes(eventType)) {
    session.receivedEvents.push(eventType);
  }

  if (provisionalMessageId && !session.messageId) {
    session.messageId = provisionalMessageId;
    session.sourceMessageLocked = true;
  }

  if (snapshot?.messageRole) {
    session.messageRole = snapshot.messageRole;
  }

  if (snapshot?.confirmedAssistantMessageId) {
    session.confirmedAssistantMessageId = snapshot.confirmedAssistantMessageId;
  }

  if (snapshot?.confirmationSource) {
    session.confirmationSource = snapshot.confirmationSource;
  }

  if (snapshot?.skipReasonDetailed) {
    session.skipReasonDetailed = snapshot.skipReasonDetailed;
  }

  if (snapshot?.eventBelongsToCurrentGeneration !== undefined) {
    session.eventBelongsToCurrentGeneration = !!snapshot.eventBelongsToCurrentGeneration;
  }

  if (snapshot?.historicalReplayBlocked !== undefined) {
    session.historicalReplayBlocked = !!snapshot.historicalReplayBlocked;
  }

  if (snapshot?.historicalReplayReason) {
    session.historicalReplayReason = snapshot.historicalReplayReason;
  }

  if (snapshot?.isSpeculativeSession !== undefined) {
    session.isSpeculativeSession = !!snapshot.isSpeculativeSession;
  }

  if (snapshot?.candidateToolIds) {
    session.candidateToolIds = [...snapshot.candidateToolIds];
  }

  return updateMessageSession(session, {});
}

function updateMessageSession(session, partial = {}) {
  if (!session) return null;

  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();

  Object.assign(session, generationDiagnosticFields, partial, {
    updatedAt: Date.now()
  });

  return session;
}

function rekeyMessageSession(session, nextSessionKey) {
  if (!session || !nextSessionKey || session.sessionKey === nextSessionKey) {
    return session;
  }

  toolTriggerManagerState.messageSessions.delete(session.sessionKey);
  session.sessionKey = nextSessionKey;
  session.updatedAt = Date.now();
  toolTriggerManagerState.messageSessions.set(nextSessionKey, session);
  return session;
}

function appendMessageSessionHistory(session, historyPartial = {}) {
  if (!session) return null;

  const { historyRetentionLimit } = getResolvedListenerSettings();
  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();
  const entry = {
    id: historyPartial?.id || createTraceId('session_hist'),
    at: historyPartial?.at || Date.now(),
    traceId: session.traceId,
    sessionKey: session.sessionKey,
    phase: historyPartial?.phase || session.phase,
    eventType: historyPartial?.eventType || session.firstEventType,
    messageId: historyPartial?.messageId || session.messageId,
    messageKey: historyPartial?.messageKey || session.messageKey,
    messageRole: historyPartial?.messageRole || session.messageRole,
    confirmedAssistantMessageId: historyPartial?.confirmedAssistantMessageId || session.confirmedAssistantMessageId || '',
    confirmationSource: historyPartial?.confirmationSource || session.confirmationSource || '',
    isSpeculativeSession: historyPartial?.isSpeculativeSession ?? session.isSpeculativeSession ?? false,
    eventBelongsToCurrentGeneration: historyPartial?.eventBelongsToCurrentGeneration ?? session.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: historyPartial?.historicalReplayBlocked ?? session.historicalReplayBlocked ?? false,
    historicalReplayReason: historyPartial?.historicalReplayReason || session.historicalReplayReason || '',
    generationTraceId: historyPartial?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '',
    generationStartedAt: historyPartial?.generationStartedAt || triggerState.gateState.lastGenerationBaseline?.startedAt || 0,
    generationDryRun: historyPartial?.generationDryRun ?? !!triggerState.gateState.lastGenerationDryRun,
    baselineResolved: historyPartial?.baselineResolved ?? session.baselineResolved ?? generationDiagnosticFields.baselineResolved,
    baselineResolutionAt: historyPartial?.baselineResolutionAt ?? session.baselineResolutionAt ?? generationDiagnosticFields.baselineResolutionAt,
    provisionalBaseline: historyPartial?.provisionalBaseline ?? session.provisionalBaseline ?? generationDiagnosticFields.provisionalBaseline,
    generationStartedByUserIntent: historyPartial?.generationStartedByUserIntent ?? session.generationStartedByUserIntent ?? generationDiagnosticFields.generationStartedByUserIntent,
    generationUserIntentSource: historyPartial?.generationUserIntentSource || session.generationUserIntentSource || generationDiagnosticFields.generationUserIntentSource,
    generationUserIntentDetail: historyPartial?.generationUserIntentDetail || session.generationUserIntentDetail || generationDiagnosticFields.generationUserIntentDetail,
    lastUserIntentSource: historyPartial?.lastUserIntentSource || session.lastUserIntentSource || generationDiagnosticFields.lastUserIntentSource,
    sessionGenerationTraceId: historyPartial?.sessionGenerationTraceId || session.sessionGenerationTraceId || '',
    sessionGenerationStartedAt: historyPartial?.sessionGenerationStartedAt ?? session.sessionGenerationStartedAt ?? 0,
    sessionBaselineResolvedAtCreation: historyPartial?.sessionBaselineResolvedAtCreation ?? session.sessionBaselineResolvedAtCreation ?? false,
    sessionBaselineResolutionAtCreation: historyPartial?.sessionBaselineResolutionAtCreation ?? session.sessionBaselineResolutionAtCreation ?? 0,
    sessionProvisionalBaselineAtCreation: historyPartial?.sessionProvisionalBaselineAtCreation ?? session.sessionProvisionalBaselineAtCreation ?? false,
    sessionGenerationStartedByUserIntent: historyPartial?.sessionGenerationStartedByUserIntent ?? session.sessionGenerationStartedByUserIntent ?? false,
    sessionGenerationUserIntentSource: historyPartial?.sessionGenerationUserIntentSource || session.sessionGenerationUserIntentSource || '',
    sessionGenerationUserIntentDetail: historyPartial?.sessionGenerationUserIntentDetail || session.sessionGenerationUserIntentDetail || '',
    sessionLastUserIntentSourceAtCreation: historyPartial?.sessionLastUserIntentSourceAtCreation || session.sessionLastUserIntentSourceAtCreation || '',
    sessionGenerationCapturedAt: historyPartial?.sessionGenerationCapturedAt ?? session.sessionGenerationCapturedAt ?? Date.now(),
    skipReason: historyPartial?.skipReason || session.skipReason || '',
    skipReasonDetailed: historyPartial?.skipReasonDetailed || session.skipReasonDetailed || '',
    candidateToolIds: Array.isArray(historyPartial?.candidateToolIds)
      ? [...historyPartial.candidateToolIds]
      : [...(session.candidateToolIds || [])],
    executionPathIds: Array.isArray(historyPartial?.executionPathIds)
      ? [...historyPartial.executionPathIds]
      : [...(session.executionPathIds || [])]
  };

  toolTriggerManagerState.recentSessionHistory = trimManagerHistoryEntries([
    ...toolTriggerManagerState.recentSessionHistory,
    entry
  ], historyRetentionLimit);

  return entry;
}

function appendTriggerHistoryForTools(tools, historyEntry = {}) {
  const toolList = Array.isArray(tools) ? tools : [];
  const { historyRetentionLimit } = getResolvedListenerSettings();

  toolList.forEach((tool) => {
    if (!tool?.id) return;
    appendToolRuntimeHistory(tool.id, 'trigger', historyEntry, {
      limit: historyRetentionLimit,
      emitEvent: false
    });
  });
}

function appendWritebackHistoryForTool(toolId, historyEntry = {}) {
  if (!toolId) return;

  const { historyRetentionLimit } = getResolvedListenerSettings();
  appendToolRuntimeHistory(toolId, 'writeback', historyEntry, {
    limit: historyRetentionLimit,
    emitEvent: false
  });
}

function cloneDiagnosticEntryForOutput(entry) {
  if (!entry || typeof entry !== 'object') return entry;

  const driftFlags = buildDiagnosticEntryDriftFlags(entry);

  return {
    ...entry,
    ...driftFlags,
    receivedEvents: Array.isArray(entry.receivedEvents) ? [...entry.receivedEvents] : undefined,
    candidateToolIds: Array.isArray(entry.candidateToolIds) ? [...entry.candidateToolIds] : undefined,
    executionPathIds: Array.isArray(entry.executionPathIds) ? [...entry.executionPathIds] : undefined,
    driftReasons: Array.isArray(driftFlags.driftReasons) ? [...driftFlags.driftReasons] : []
  };
}

function normalizeDiagnosticString(value) {
  return String(value || '').trim();
}

function buildDiagnosticEntryDriftFlags(entry) {
  if (!entry || typeof entry !== 'object') {
    return {
      driftDetected: false,
      generationTraceDrifted: false,
      generationUserIntentDrifted: false,
      baselineResolvedStateChanged: false,
      baselineResolutionAdvancedSinceSessionCreation: false,
      driftReasons: []
    };
  }

  const hasSessionFrozenFields = entry.sessionGenerationCapturedAt !== undefined
    || entry.sessionGenerationTraceId !== undefined
    || entry.sessionBaselineResolvedAtCreation !== undefined
    || entry.sessionGenerationStartedByUserIntent !== undefined
    || entry.sessionGenerationUserIntentSource !== undefined
    || entry.sessionGenerationUserIntentDetail !== undefined;

  if (!hasSessionFrozenFields) {
    return {
      driftDetected: false,
      generationTraceDrifted: false,
      generationUserIntentDrifted: false,
      baselineResolvedStateChanged: false,
      baselineResolutionAdvancedSinceSessionCreation: false,
      driftReasons: []
    };
  }

  const sessionGenerationTraceId = normalizeDiagnosticString(entry.sessionGenerationTraceId);
  const generationTraceId = normalizeDiagnosticString(entry.generationTraceId);
  const sessionGenerationUserIntentSource = normalizeDiagnosticString(entry.sessionGenerationUserIntentSource);
  const generationUserIntentSource = normalizeDiagnosticString(entry.generationUserIntentSource);
  const sessionGenerationUserIntentDetail = normalizeDiagnosticString(entry.sessionGenerationUserIntentDetail);
  const generationUserIntentDetail = normalizeDiagnosticString(entry.generationUserIntentDetail);

  const generationTraceDrifted = !!sessionGenerationTraceId
    && !!generationTraceId
    && sessionGenerationTraceId !== generationTraceId;

  const generationUserIntentDrifted = Boolean(entry.sessionGenerationStartedByUserIntent) !== Boolean(entry.generationStartedByUserIntent)
    || ((sessionGenerationUserIntentSource || generationUserIntentSource)
      ? sessionGenerationUserIntentSource !== generationUserIntentSource
      : false)
    || ((sessionGenerationUserIntentDetail || generationUserIntentDetail)
      ? sessionGenerationUserIntentDetail !== generationUserIntentDetail
      : false);

  const baselineResolvedStateChanged = Boolean(entry.sessionBaselineResolvedAtCreation) !== Boolean(entry.baselineResolved);
  const baselineResolutionAdvancedSinceSessionCreation = (Number(entry.baselineResolutionAt) || 0)
    > (Number(entry.sessionBaselineResolutionAtCreation) || 0);

  const driftReasons = [];

  if (generationTraceDrifted) {
    driftReasons.push('generation_trace_changed');
  }

  if (generationUserIntentDrifted) {
    driftReasons.push('generation_user_intent_changed');
  }

  if (baselineResolvedStateChanged) {
    driftReasons.push('baseline_resolved_state_changed');
  }

  if (baselineResolutionAdvancedSinceSessionCreation) {
    driftReasons.push('baseline_resolution_advanced');
  }

  return {
    driftDetected: driftReasons.length > 0,
    generationTraceDrifted,
    generationUserIntentDrifted,
    baselineResolvedStateChanged,
    baselineResolutionAdvancedSinceSessionCreation,
    driftReasons
  };
}

function buildDiagnosticPhaseCounts(entries = []) {
  return (Array.isArray(entries) ? entries : []).reduce((accumulator, entry) => {
    const phase = normalizeDiagnosticString(entry?.phase) || 'unknown';
    accumulator[phase] = (accumulator[phase] || 0) + 1;
    return accumulator;
  }, {});
}

function buildDiagnosticDriftSummary(entries = []) {
  const summary = {
    entryCount: 0,
    driftDetectedCount: 0,
    generationTraceDriftCount: 0,
    generationUserIntentDriftCount: 0,
    baselineResolvedStateChangedCount: 0,
    baselineResolutionAdvancedCount: 0
  };

  for (const entry of Array.isArray(entries) ? entries : []) {
    const driftFlags = buildDiagnosticEntryDriftFlags(entry);
    summary.entryCount += 1;

    if (driftFlags.driftDetected) {
      summary.driftDetectedCount += 1;
    }

    if (driftFlags.generationTraceDrifted) {
      summary.generationTraceDriftCount += 1;
    }

    if (driftFlags.generationUserIntentDrifted) {
      summary.generationUserIntentDriftCount += 1;
    }

    if (driftFlags.baselineResolvedStateChanged) {
      summary.baselineResolvedStateChangedCount += 1;
    }

    if (driftFlags.baselineResolutionAdvancedSinceSessionCreation) {
      summary.baselineResolutionAdvancedCount += 1;
    }
  }

  return summary;
}

function buildEventBridgeDiagnosticSummary() {
  const directBridge = resolveDirectEventBridge();
  const resolvedEventSource = directBridge.eventSource || eventBridgeState.eventSource || null;

  return {
    source: directBridge.source || eventBridgeState.source || '',
    ready: isValidEventSource(resolvedEventSource),
    hasImportedScriptModule: !!eventBridgeState.scriptModule,
    importError: eventBridgeState.importError?.message || ''
  };
}

function buildGateStateDiagnosticSummary() {
  const baseline = triggerState.gateState.lastGenerationBaseline;

  return {
    lastUserSendIntentAt: triggerState.gateState.lastUserSendIntentAt || 0,
    lastUserIntentSource: triggerState.gateState.lastUserIntentSource || '',
    lastUserMessageId: normalizeMessageIdentityValue(triggerState.gateState.lastUserMessageId),
    lastUserMessageAt: triggerState.gateState.lastUserMessageAt || 0,
    lastGenerationTraceId: triggerState.gateState.lastGenerationTraceId || '',
    lastGenerationType: triggerState.gateState.lastGenerationType || '',
    lastGenerationDryRun: !!triggerState.gateState.lastGenerationDryRun,
    lastGenerationAt: triggerState.gateState.lastGenerationAt || 0,
    isGenerating: !!triggerState.gateState.isGenerating,
    uiTransitionGuardUntil: triggerState.gateState.uiTransitionGuardUntil || 0,
    lastUiTransitionAt: triggerState.gateState.lastUiTransitionAt || 0,
    lastUiTransitionSource: triggerState.gateState.lastUiTransitionSource || '',
    baselineMessageCount: baseline?.messageCount || 0,
    baselineAssistantId: baseline?.lastAssistantMessageId || '',
    ...getCurrentGenerationDiagnosticFields()
  };
}

function getResolvedEventTimelineLimit() {
  const { historyRetentionLimit } = getResolvedListenerSettings();
  return Math.max(20, Math.min(200, Number(historyRetentionLimit || 0) * 4 || 40));
}

function createRecentEventTimelineEntry(partial = {}) {
  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();

  return {
    id: partial?.id || createTraceId('timeline'),
    at: Number(partial?.at) || Date.now(),
    kind: partial?.kind || 'event',
    eventType: partial?.eventType || '',
    traceId: partial?.traceId || '',
    sessionKey: partial?.sessionKey || '',
    messageId: normalizeMessageIdentityValue(partial?.messageId),
    phase: partial?.phase || '',
    reason: partial?.reason || '',
    detail: partial?.detail || '',
    confirmationSource: partial?.confirmationSource || '',
    candidateToolIds: Array.isArray(partial?.candidateToolIds) ? [...partial.candidateToolIds] : [],
    generationTraceId: partial?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '',
    baselineResolved: partial?.baselineResolved ?? generationDiagnosticFields.baselineResolved,
    generationStartedByUserIntent: partial?.generationStartedByUserIntent ?? generationDiagnosticFields.generationStartedByUserIntent,
    generationUserIntentSource: partial?.generationUserIntentSource || generationDiagnosticFields.generationUserIntentSource,
    historicalReplayBlocked: partial?.historicalReplayBlocked ?? false
  };
}

function appendRecentEventTimeline(partial = {}) {
  const entry = createRecentEventTimelineEntry(partial);
  toolTriggerManagerState.recentEventTimeline = trimManagerHistoryEntries([
    ...toolTriggerManagerState.recentEventTimeline,
    entry
  ], getResolvedEventTimelineLimit());
  return entry;
}

function cloneTimelineEntryForOutput(entry) {
  if (!entry || typeof entry !== 'object') return entry;

  return {
    ...entry,
    candidateToolIds: Array.isArray(entry.candidateToolIds) ? [...entry.candidateToolIds] : []
  };
}

function buildAutoTriggerVerdictHint(flagged = false, reasons = [], relatedSessionKeys = []) {
  return {
    flagged: !!flagged,
    reasons: [...new Set((Array.isArray(reasons) ? reasons : []).filter(Boolean))],
    relatedSessionKeys: [...new Set((Array.isArray(relatedSessionKeys) ? relatedSessionKeys : []).filter(Boolean))]
  };
}

function buildAutoTriggerVerdictHints(payload = {}) {
  const summary = payload?.summary || {};
  const entries = [
    ...(Array.isArray(payload?.activeSessions) ? payload.activeSessions : []),
    ...(Array.isArray(payload?.recentSessionHistory) ? payload.recentSessionHistory : []),
    payload?.lastEventDebugSnapshot,
    payload?.lastAutoTriggerSnapshot
  ].filter(Boolean);

  const a10Reasons = [];
  const a10SessionKeys = [];
  const a11Reasons = [];
  const a11SessionKeys = [];
  const a12Reasons = [];
  const a12SessionKeys = [];
  const a13Reasons = [];
  const a13SessionKeys = [];

  for (const entry of entries) {
    const reason = String(entry?.reason || entry?.skipReason || '').trim();
    const detail = String(entry?.detail || entry?.skipReasonDetailed || '').trim();
    const sessionKey = String(entry?.sessionKey || '').trim();
    const phase = String(entry?.phase || entry?.stage || '').trim();
    const confirmationSource = String(entry?.confirmationSource || '').trim();
    const generationUserIntentSource = String(entry?.generationUserIntentSource || '').trim();
    const generationStartedByUserIntent = !!entry?.generationStartedByUserIntent;

    if (
      detail === 'missing_generation_baseline'
      || detail === 'generation_baseline_pending_resolution'
    ) {
      a10Reasons.push(detail);
      a10SessionKeys.push(sessionKey);
    }

    if (
      reason === AUTO_TRIGGER_SKIP_REASONS.HISTORICAL_REPLAY_MESSAGE_RECEIVED
      || reason === AUTO_TRIGGER_SKIP_REASONS.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION
      || !!entry?.historicalReplayBlocked
    ) {
      a11Reasons.push(
        entry?.historicalReplayReason
        || reason
        || detail
        || 'historical_replay_signal_detected'
      );
      a11SessionKeys.push(sessionKey);
    }

    if (
      reason === AUTO_TRIGGER_SKIP_REASONS.IGNORED_AUTO_TRIGGER
      && (
        generationStartedByUserIntent
        || generationUserIntentSource.startsWith('explicit_generation_action:')
      )
    ) {
      a12Reasons.push(`ignored_auto_trigger_with_${generationUserIntentSource || 'user_intent'}`);
      a12SessionKeys.push(sessionKey);
    }

    if (
      summary?.listenerSettings?.ignoreAutoTrigger
      && !generationStartedByUserIntent
      && !entry?.isSpeculativeSession
      && (
        phase === MESSAGE_SESSION_PHASES.COMPLETED
        || phase === MESSAGE_SESSION_PHASES.HANDLING
        || phase === MESSAGE_SESSION_PHASES.DISPATCHING
        || confirmationSource === 'generation_ended'
        || confirmationSource === 'message_received'
        || confirmationSource === 'generation_after_commands'
      )
    ) {
      a13Reasons.push('non_user_intent_generation_reached_execution_path');
      a13SessionKeys.push(sessionKey);
    }
  }

  return {
    a10BaselineRaceSuspicious: buildAutoTriggerVerdictHint(a10Reasons.length > 0, a10Reasons, a10SessionKeys),
    a11ReplaySuspicious: buildAutoTriggerVerdictHint(a11Reasons.length > 0, a11Reasons, a11SessionKeys),
    a12UserIntentSuspicious: buildAutoTriggerVerdictHint(a12Reasons.length > 0, a12Reasons, a12SessionKeys),
    a13AutoTriggerLeakSuspicious: buildAutoTriggerVerdictHint(a13Reasons.length > 0, a13Reasons, a13SessionKeys)
  };
}

function shouldReportDuplicateSkip(messageKey) {
  const now = Date.now();
  if (
    toolTriggerManagerState.lastDuplicateMessageKey === messageKey
    && (now - toolTriggerManagerState.lastDuplicateMessageAt) < DUPLICATE_SKIP_LOG_WINDOW_MS
  ) {
    return false;
  }

  toolTriggerManagerState.lastDuplicateMessageKey = messageKey;
  toolTriggerManagerState.lastDuplicateMessageAt = now;
  return true;
}

/**
 * 自动工具主链说明：
 * 1. tool-trigger 负责监听宿主事件、门控、上下文构建
 * 2. tool-output-service 负责构建额外模型请求、执行请求、处理输出并写回楼层
 * 3. executeToolWithConfig 仅保留为兼容执行回退路径，主要用于非 post_response_api 的 legacy/manual 场景
 */

function scheduleSpeculativeSession(eventType, data, snapshot = {}) {
  const messageId = normalizeMessageIdentityValue(snapshot?.messageId || extractEventMessageId(data, eventType));
  const session = getOrCreateMessageSession(eventType, data, {
    eventType,
    messageId,
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    confirmationSource: snapshot?.confirmationSource || 'none',
    skipReasonDetailed: snapshot?.skipReasonDetailed || 'speculative_session_only',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    isSpeculativeSession: true
  });
  const reason = snapshot?.reason || AUTO_TRIGGER_SKIP_REASONS.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE;
  const detail = snapshot?.skipReasonDetailed || 'speculative_session_only';

  traceAlways('info', '记录 speculative session，未进入执行调度', {
    eventType,
    traceId: session?.traceId || '',
    sessionKey: session?.sessionKey || '',
    messageId,
    reason,
    detail
  });

  saveEventDebugSnapshot({
    stage: 'speculative_observed',
    eventType,
    traceId: session?.traceId || '',
    sessionKey: session?.sessionKey || '',
    messageId,
    reason,
    skipReasonDetailed: detail,
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    confirmationSource: snapshot?.confirmationSource || 'none',
    isSpeculativeSession: true,
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    handledAt: Date.now()
  });

  updateMessageSession(session, {
    phase: MESSAGE_SESSION_PHASES.IGNORED,
    skipReason: reason,
    skipReasonDetailed: detail,
    confirmationSource: snapshot?.confirmationSource || 'none',
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    isSpeculativeSession: true,
    completedAt: Date.now()
  });
  appendMessageSessionHistory(session, {
    phase: MESSAGE_SESSION_PHASES.IGNORED,
    eventType,
    messageId,
    skipReason: reason,
    skipReasonDetailed: detail,
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    confirmationSource: snapshot?.confirmationSource || 'none',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    isSpeculativeSession: true
  });

  return session;
}

function scheduleAutoTrigger(eventType, data, delayMs = 0, snapshot = {}) {
  const confirmedAssistantMessageId = normalizeMessageIdentityValue(
    snapshot?.confirmedAssistantMessageId
    || snapshot?.messageId
    || extractEventMessageId(data, eventType)
  );

  if (!confirmedAssistantMessageId) {
    return scheduleSpeculativeSession(eventType, data, {
      ...snapshot,
      reason: snapshot?.reason || AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
      skipReasonDetailed: snapshot?.skipReasonDetailed || 'missing_confirmed_message_identity',
      confirmationSource: snapshot?.confirmationSource || 'none'
    });
  }

  const enrichedData = typeof data === 'object' && data
    ? {
        ...data,
        messageId: confirmedAssistantMessageId,
        confirmedAssistantMessageId,
        confirmationSource: snapshot?.confirmationSource || data?.confirmationSource || '',
        eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? data?.eventBelongsToCurrentGeneration ?? false,
        historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? data?.historicalReplayBlocked ?? false,
        historicalReplayReason: snapshot?.historicalReplayReason || data?.historicalReplayReason || ''
      }
    : {
        messageId: confirmedAssistantMessageId,
        confirmedAssistantMessageId,
        confirmationSource: snapshot?.confirmationSource || '',
        eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
        historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
        historicalReplayReason: snapshot?.historicalReplayReason || ''
      };

  const session = getOrCreateMessageSession(eventType, enrichedData, {
    ...snapshot,
    eventType,
    messageId: confirmedAssistantMessageId,
    confirmedAssistantMessageId,
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? enrichedData.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? enrichedData.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || enrichedData.historicalReplayReason || '',
    isSpeculativeSession: false
  });
  const resolvedDelayMs = Number.isFinite(delayMs)
    ? Math.max(0, delayMs)
    : getResolvedListenerSettings().debounceMs;
  const timerKey = session?.sessionKey || `message::${confirmedAssistantMessageId}`;
  const existingTimer = toolTriggerManagerState.pendingMessageTimers.get(timerKey);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  updateMessageSession(session, {
    phase: MESSAGE_SESSION_PHASES.SCHEDULED,
    messageId: confirmedAssistantMessageId,
    confirmedAssistantMessageId,
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? enrichedData.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? enrichedData.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || enrichedData.historicalReplayReason || '',
    isSpeculativeSession: false,
    scheduledAt: Date.now()
  });
  appendMessageSessionHistory(session, {
    phase: MESSAGE_SESSION_PHASES.SCHEDULED,
    eventType,
    messageId: confirmedAssistantMessageId,
    confirmedAssistantMessageId,
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? enrichedData.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? enrichedData.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || enrichedData.historicalReplayReason || '',
    isSpeculativeSession: false
  });

  saveEventDebugSnapshot({
    stage: 'scheduled',
    eventType,
    traceId: session?.traceId || '',
    sessionKey: session?.sessionKey || '',
    messageId: confirmedAssistantMessageId,
    confirmedAssistantMessageId,
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    isSpeculativeSession: false,
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    scheduledDelayMs: resolvedDelayMs
  });
  traceAlways('info', '已调度确认后的自动触发', {
    eventType,
    messageId: confirmedAssistantMessageId,
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    delayMs: resolvedDelayMs
  });

  const timer = setTimeout(async () => {
    toolTriggerManagerState.pendingMessageTimers.delete(timerKey);
    updateMessageSession(session, {
      phase: MESSAGE_SESSION_PHASES.DISPATCHING,
      confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
      confirmedAssistantMessageId,
      isSpeculativeSession: false
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.DISPATCHING,
      eventType,
      messageId: confirmedAssistantMessageId,
      confirmedAssistantMessageId,
      confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
      isSpeculativeSession: false
    });
    saveEventDebugSnapshot({
      stage: 'dispatching',
      eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: confirmedAssistantMessageId,
      confirmedAssistantMessageId,
      confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
      isSpeculativeSession: false,
      eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
      historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
      historicalReplayReason: snapshot?.historicalReplayReason || '',
      scheduledDelayMs: resolvedDelayMs
    });
    await handleAutoTrigger(eventType, enrichedData);
  }, resolvedDelayMs);

  toolTriggerManagerState.pendingMessageTimers.set(timerKey, timer);
  return session;
}

/**
 * 生成自动触发去重键
 * @param {Object} context
 * @returns {string}
 */
function getAutoTriggerMessageKey(context) {
  const chatId = context?.chatId || 'chat_default';
  const messageId = context?.messageId === undefined || context?.messageId === null || context?.messageId === ''
    ? 'latest'
    : String(context.messageId);
  return `${chatId}::${messageId}`;
}

function resolveExecutionPath(tool, context) {
  const isManual = context?.triggerEvent === 'MANUAL';
  if (isManual) {
    return tool.output?.mode === OUTPUT_MODES.POST_RESPONSE_API
      ? TOOL_EXECUTION_PATHS.MANUAL_POST_RESPONSE_API
      : TOOL_EXECUTION_PATHS.MANUAL_COMPATIBILITY;
  }

  return TOOL_EXECUTION_PATHS.AUTO_POST_RESPONSE_API;
}

/**
 * 统一处理自动触发链路
 * @param {string} eventType
 * @param {Object|string|number} data
 */
async function handleAutoTrigger(eventType, data) {
  log(`${eventType}触发:`, data);
  const confirmationSource = typeof data === 'object' && data
    ? String(data?.confirmationSource || '').trim()
    : '';
  traceAlways('info', '开始处理自动触发', {
    eventType,
    incomingMessageId: extractEventMessageId(data, eventType),
    confirmationSource
  });

  const candidateTools = getToolsToExecute(EVENT_TYPES.GENERATION_ENDED);
  const candidateToolIds = candidateTools.map(tool => tool.id);
  const listenerDecision = shouldSkipAutoTriggerByListenerSettings();
  const incomingMessageId = extractEventMessageId(data, eventType);
  const eventBelongsToCurrentGeneration = !!(typeof data === 'object' && data ? data?.eventBelongsToCurrentGeneration : false);
  const historicalReplayBlocked = !!(typeof data === 'object' && data ? data?.historicalReplayBlocked : false);
  const historicalReplayReason = typeof data === 'object' && data
    ? String(data?.historicalReplayReason || '').trim()
    : '';
  const confirmedAssistantMessageId = normalizeMessageIdentityValue(
    (typeof data === 'object' && data ? data?.confirmedAssistantMessageId : '')
    || incomingMessageId
  );
  const session = getOrCreateMessageSession(eventType, data, {
    eventType,
    messageId: incomingMessageId,
    confirmedAssistantMessageId,
    confirmationSource,
    eventBelongsToCurrentGeneration,
    historicalReplayBlocked,
    historicalReplayReason,
    candidateToolIds
  });

  updateMessageSession(session, {
    phase: MESSAGE_SESSION_PHASES.HANDLING,
    handledAt: Date.now(),
    confirmedAssistantMessageId,
    confirmationSource,
    isSpeculativeSession: false,
    eventBelongsToCurrentGeneration,
    historicalReplayBlocked,
    historicalReplayReason,
    candidateToolIds
  });
  appendMessageSessionHistory(session, {
    phase: MESSAGE_SESSION_PHASES.HANDLING,
    eventType,
    messageId: incomingMessageId,
    confirmedAssistantMessageId,
    confirmationSource,
    isSpeculativeSession: false,
    eventBelongsToCurrentGeneration,
    historicalReplayBlocked,
    historicalReplayReason,
    candidateToolIds
  });

  saveEventDebugSnapshot({
    stage: 'handling',
    eventType,
    traceId: session?.traceId || '',
    sessionKey: session?.sessionKey || '',
    messageId: incomingMessageId,
    confirmedAssistantMessageId,
    confirmationSource,
    isSpeculativeSession: false,
    eventBelongsToCurrentGeneration,
    historicalReplayBlocked,
    historicalReplayReason,
    candidateToolIds,
    handledAt: Date.now()
  });

  if (isUiTransitionGuardActive() && !hasConfirmedUserTriggerIntent()) {
    traceAlways('warn', '当前处于宿主 UI 过渡守卫窗口，自动触发直接忽略', {
      eventType,
      candidateToolIds,
      uiTransitionGuardUntil: triggerState.gateState.uiTransitionGuardUntil,
      lastUiTransitionSource: triggerState.gateState.lastUiTransitionSource || ''
    });
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: incomingMessageId,
      selectedToolIds: candidateToolIds,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      skipReasonDetailed: 'ui_transition_guard_active',
      confirmedAssistantMessageId,
      confirmationSource,
      lockedAiMessageId: incomingMessageId || ''
    });
    patchToolsDiagnostics(candidateTools, {
      lastTriggerEvent: eventType,
      lastMessageKey: '',
      lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: ''
    });
    saveEventDebugSnapshot({
      stage: 'ignored_ui_transition_guard',
      eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: incomingMessageId,
      reason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      skipReasonDetailed: 'ui_transition_guard_active',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateMessageSession(session, {
      phase: MESSAGE_SESSION_PHASES.IGNORED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      skipReasonDetailed: 'ui_transition_guard_active',
      confirmedAssistantMessageId,
      confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.IGNORED,
      eventType,
      messageId: incomingMessageId,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      skipReasonDetailed: 'ui_transition_guard_active',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: session?.traceId || '',
      eventType,
      messageId: incomingMessageId,
      messageKey: '',
      skipReason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      executionPath: '',
      writebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      failureStage: ''
    });
    return;
  }

  if (triggerState.gateState.lastGenerationDryRun) {
    traceAlways('warn', '当前 generation 为 dryRun，自动触发直接阻断', {
      eventType,
      candidateToolIds,
      generationTraceId: triggerState.gateState.lastGenerationTraceId || ''
    });
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: incomingMessageId,
      selectedToolIds: candidateToolIds,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      skipReasonDetailed: 'dry_run_generation',
      confirmedAssistantMessageId,
      confirmationSource,
      lockedAiMessageId: incomingMessageId || ''
    });
    patchToolsDiagnostics(candidateTools, {
      lastTriggerEvent: eventType,
      lastMessageKey: '',
      lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: ''
    });
    saveEventDebugSnapshot({
      stage: 'skipped',
      eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: incomingMessageId,
      reason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      skipReasonDetailed: 'dry_run_generation',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateMessageSession(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      skipReasonDetailed: 'dry_run_generation',
      confirmedAssistantMessageId,
      confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      eventType,
      messageId: incomingMessageId,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      skipReasonDetailed: 'dry_run_generation',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: session?.traceId || '',
      eventType,
      messageId: incomingMessageId,
      messageKey: '',
      skipReason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      executionPath: '',
      writebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      failureStage: ''
    });
    return;
  }

  if (listenerDecision.skip) {
    traceAlways('warn', '根据监听器设置跳过自动触发', {
      eventType,
      reason: listenerDecision.reason,
      listenerSettings: listenerDecision.listenerSettings,
      candidateToolIds
    });
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: incomingMessageId,
      selectedToolIds: candidateToolIds,
      skipReason: listenerDecision.reason,
      skipReasonDetailed: `listener_setting_${listenerDecision.reason}`,
      confirmedAssistantMessageId,
      confirmationSource,
      lockedAiMessageId: incomingMessageId || ''
    });
    patchToolsDiagnostics(candidateTools, {
      lastTriggerEvent: eventType,
      lastMessageKey: '',
      lastSkipReason: listenerDecision.reason,
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: ''
    });
    saveEventDebugSnapshot({
      stage: 'skipped',
      eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: incomingMessageId,
      reason: listenerDecision.reason,
      skipReasonDetailed: `listener_setting_${listenerDecision.reason}`,
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateMessageSession(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      skipReason: listenerDecision.reason,
      skipReasonDetailed: `listener_setting_${listenerDecision.reason}`,
      confirmedAssistantMessageId,
      confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      eventType,
      messageId: incomingMessageId,
      skipReason: listenerDecision.reason,
      skipReasonDetailed: `listener_setting_${listenerDecision.reason}`,
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: session?.traceId || '',
      eventType,
      messageId: incomingMessageId,
      messageKey: '',
      skipReason: listenerDecision.reason,
      executionPath: '',
      writebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      failureStage: ''
    });
    return;
  }

  if (listenerDecision.listenerSettings.ignoreQuietGeneration && isQuietLikeGeneration(
    triggerState.gateState.lastGenerationType,
    triggerState.gateState.lastGenerationParams,
    triggerState.gateState.lastGenerationDryRun
  )) {
    log('检测到 quiet / dryRun 生成，跳过工具自动执行');
    traceAlways('warn', '检测到 quiet/dryRun，跳过自动触发', {
      eventType,
      candidateToolIds
    });
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      selectedToolIds: candidateToolIds,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      skipReasonDetailed: 'quiet_generation_listener_filter',
      confirmedAssistantMessageId,
      confirmationSource
    });
    patchToolsDiagnostics(candidateTools, {
      lastTriggerEvent: eventType,
      lastMessageKey: '',
      lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: ''
    });
    saveEventDebugSnapshot({
      stage: 'skipped',
      eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: incomingMessageId,
      reason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      skipReasonDetailed: 'quiet_generation_listener_filter',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateMessageSession(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      skipReasonDetailed: 'quiet_generation_listener_filter',
      confirmedAssistantMessageId,
      confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      eventType,
      messageId: incomingMessageId,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      skipReasonDetailed: 'quiet_generation_listener_filter',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: session?.traceId || '',
      eventType,
      messageId: incomingMessageId,
      messageKey: '',
      skipReason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      executionPath: '',
      writebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      failureStage: ''
    });
    return;
  }

  const context = await buildToolExecutionContext({
    ...(typeof data === 'object' && data ? data : {}),
    triggerEvent: eventType,
    ...(incomingMessageId ? { messageId: incomingMessageId } : {}),
    ...(confirmedAssistantMessageId ? { confirmedAssistantMessageId } : {}),
    ...(confirmationSource ? { confirmationSource } : {}),
    traceId: session?.traceId || '',
    sessionKey: session?.sessionKey || ''
  });

  context.traceId = session?.traceId || context.traceId || createTraceId('exec');
  context.sessionKey = session?.sessionKey || context.sessionKey || '';

  const resolvedSessionKey = buildMessageSessionKey(context.chatId, context.messageId, eventType);
  rekeyMessageSession(session, resolvedSessionKey);
  updateMessageSession(session, {
    messageId: context.messageId || incomingMessageId,
    messageKey: getAutoTriggerMessageKey(context),
    confirmedAssistantMessageId: context.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context.confirmationSource || confirmationSource,
    sourceMessageLocked: !!context.messageId
  });

  if (!context?.lastAiMessage) {
    log(`${eventType} 后未读取到最新 AI 回复，跳过工具执行`);
    traceAlways('warn', '未读取到有效 AI 回复，自动触发中止', {
      eventType,
      preferredMessageId: incomingMessageId,
      candidateToolIds
    });
    const messageKey = getAutoTriggerMessageKey(context || {});
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: context?.messageId || '',
      messageKey,
      selectedToolIds: candidateToolIds,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      skipReasonDetailed: 'missing_confirmed_assistant_content_in_context',
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      lockedAiMessageId: context?.messageId || ''
    });
    patchToolsDiagnostics(candidateTools, {
      lastTriggerEvent: eventType,
      lastMessageKey: messageKey,
      lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: ''
    });
    saveEventDebugSnapshot({
      stage: 'skipped',
      eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: context?.messageId || incomingMessageId,
      messageKey,
      reason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      skipReasonDetailed: 'missing_confirmed_assistant_content_in_context',
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateMessageSession(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      skipReasonDetailed: 'missing_confirmed_assistant_content_in_context',
      messageKey,
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      eventType,
      messageId: context?.messageId || incomingMessageId,
      messageKey,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      skipReasonDetailed: 'missing_confirmed_assistant_content_in_context',
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: session?.traceId || '',
      eventType,
      messageId: context?.messageId || incomingMessageId,
      messageKey,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      executionPath: '',
      writebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      failureStage: ''
    });
    return;
  }

  const messageKey = getAutoTriggerMessageKey(context);
  if (toolTriggerManagerState.lastHandledMessageKey === messageKey) {
    if (shouldReportDuplicateSkip(messageKey)) {
      log(`检测到重复自动触发，跳过: ${messageKey}`);
      traceAlways('warn', '命中自动去重，跳过执行', {
        eventType,
        messageKey,
        candidateToolIds
      });
      saveAutoTriggerSnapshot({
        triggerEvent: eventType,
        traceId: session?.traceId || '',
        sessionKey: session?.sessionKey || '',
        messageId: context?.messageId || '',
        messageKey,
        selectedToolIds: candidateToolIds,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        skipReasonDetailed: 'message_key_already_handled',
        confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
        confirmationSource: context?.confirmationSource || confirmationSource,
        lockedAiMessageId: context?.messageId || ''
      });
      patchToolsDiagnostics(candidateTools, {
        lastTriggerEvent: eventType,
        lastMessageKey: messageKey,
        lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        lastExecutionPath: '',
        lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
        lastFailureStage: ''
      });
      saveEventDebugSnapshot({
        stage: 'skipped',
        eventType,
        traceId: session?.traceId || '',
        sessionKey: session?.sessionKey || '',
        messageId: context?.messageId || incomingMessageId,
        messageKey,
        reason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        skipReasonDetailed: 'message_key_already_handled',
        confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
        confirmationSource: context?.confirmationSource || confirmationSource,
        candidateToolIds,
        handledAt: Date.now()
      });
      updateMessageSession(session, {
        phase: MESSAGE_SESSION_PHASES.SKIPPED,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        skipReasonDetailed: 'message_key_already_handled',
        messageKey,
        confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
        confirmationSource: context?.confirmationSource || confirmationSource,
        completedAt: Date.now(),
        candidateToolIds
      });
      appendMessageSessionHistory(session, {
        phase: MESSAGE_SESSION_PHASES.SKIPPED,
        eventType,
        messageId: context?.messageId || incomingMessageId,
        messageKey,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        skipReasonDetailed: 'message_key_already_handled',
        confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
        confirmationSource: context?.confirmationSource || confirmationSource,
        candidateToolIds
      });
      appendTriggerHistoryForTools(candidateTools, {
        traceId: session?.traceId || '',
        eventType,
        messageId: context?.messageId || incomingMessageId,
        messageKey,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        executionPath: '',
        writebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
        failureStage: ''
      });
    }
    return;
  }

  const toolsToExecute = candidateTools;
  if (toolsToExecute.length === 0) {
    log('没有需要执行的工具');
    traceAlways('warn', '当前事件未命中任何可执行工具', {
      eventType,
      messageKey,
      candidateToolIds
    });
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: context?.messageId || '',
      messageKey,
      selectedToolIds: [],
      skipReason: AUTO_TRIGGER_SKIP_REASONS.NO_ELIGIBLE_TOOLS,
      skipReasonDetailed: 'no_tools_configured_for_auto_post_response',
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      lockedAiMessageId: context?.messageId || ''
    });
    saveEventDebugSnapshot({
      stage: 'skipped',
      eventType,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: context?.messageId || incomingMessageId,
      messageKey,
      reason: AUTO_TRIGGER_SKIP_REASONS.NO_ELIGIBLE_TOOLS,
      skipReasonDetailed: 'no_tools_configured_for_auto_post_response',
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      candidateToolIds: [],
      handledAt: Date.now()
    });
    updateMessageSession(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.NO_ELIGIBLE_TOOLS,
      skipReasonDetailed: 'no_tools_configured_for_auto_post_response',
      messageKey,
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      completedAt: Date.now(),
      candidateToolIds: []
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.SKIPPED,
      eventType,
      messageId: context?.messageId || incomingMessageId,
      messageKey,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.NO_ELIGIBLE_TOOLS,
      skipReasonDetailed: 'no_tools_configured_for_auto_post_response',
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      candidateToolIds: []
    });
    return;
  }

  toolTriggerManagerState.lastHandledMessageKey = messageKey;
  toolTriggerManagerState.lastDuplicateMessageKey = '';
  toolTriggerManagerState.lastDuplicateMessageAt = 0;
  context.messageKey = messageKey;
  saveAutoTriggerSnapshot({
    triggerEvent: eventType,
    traceId: session?.traceId || '',
    sessionKey: session?.sessionKey || '',
    messageId: context?.messageId || '',
    messageKey,
    selectedToolIds: toolsToExecute.map(tool => tool.id),
    skipReason: '',
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    lockedAiMessageId: context?.messageId || ''
  });
  log(`需要执行 ${toolsToExecute.length} 个工具:`, toolsToExecute.map(t => t.id));
  traceAlways('info', '自动触发命中工具', {
    eventType,
    messageKey,
    toolIds: toolsToExecute.map(t => t.id)
  });
  showTopNotice('info', `检测到 AI 回复，开始自动执行 ${toolsToExecute.length} 个工具`, {
    duration: 2400,
    noticeId: 'yyt-tool-batch-start'
  });

  updateMessageSession(session, {
    messageKey,
    candidateToolIds: toolsToExecute.map(tool => tool.id),
    executionPathIds: [],
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    phase: MESSAGE_SESSION_PHASES.DISPATCHING
  });
  appendMessageSessionHistory(session, {
    phase: MESSAGE_SESSION_PHASES.DISPATCHING,
    eventType,
    messageId: context?.messageId || incomingMessageId,
    messageKey,
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    candidateToolIds: toolsToExecute.map(tool => tool.id)
  });
  appendTriggerHistoryForTools(toolsToExecute, {
    traceId: session?.traceId || '',
    eventType,
    messageId: context?.messageId || incomingMessageId,
    messageKey,
    skipReason: '',
    executionPath: TOOL_EXECUTION_PATHS.AUTO_POST_RESPONSE_API,
    writebackStatus: '',
    failureStage: ''
  });

  for (const tool of toolsToExecute) {
    try {
      const result = await executeTriggeredTool(tool, context);

      const executionPathForTool = resolveExecutionPath(tool, context);
      if (!session.executionPathIds.includes(executionPathForTool)) {
        session.executionPathIds.push(executionPathForTool);
      }
      appendWritebackHistoryForTool(tool.id, {
        traceId: session?.traceId || '',
        eventType,
        messageId: context?.messageId || incomingMessageId,
        messageKey,
        executionPath: executionPathForTool,
        writebackStatus: result?.result?.meta?.writebackStatus || result?.meta?.writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
        failureStage: result?.result?.meta?.failureStage || result?.meta?.failureStage || '',
        success: !!result?.success
      });

      if (result.success) {
        log(`工具 ${tool.id} 执行成功`);
        eventBus.emit(EVENTS.TOOL_EXECUTED, {
          toolId: tool.id,
          result: result.result || result.data || result
        });
      } else {
        log(`工具 ${tool.id} 执行失败:`, result.error);
      }
    } catch (error) {
      console.error(`[ToolTrigger] 工具执行失败: ${tool.id}`, error);
    }
  }

  toolTriggerManagerState.lastExecutionContext = context;
  saveEventDebugSnapshot({
    stage: 'completed',
    eventType,
    traceId: session?.traceId || '',
    sessionKey: session?.sessionKey || '',
    messageId: context?.messageId || incomingMessageId,
    messageKey,
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    candidateToolIds: toolsToExecute.map(tool => tool.id),
    handledAt: Date.now()
  });
  updateMessageSession(session, {
    phase: MESSAGE_SESSION_PHASES.COMPLETED,
    messageKey,
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    completedAt: Date.now(),
    candidateToolIds: toolsToExecute.map(tool => tool.id)
  });
  appendMessageSessionHistory(session, {
    phase: MESSAGE_SESSION_PHASES.COMPLETED,
    eventType,
    messageId: context?.messageId || incomingMessageId,
    messageKey,
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    candidateToolIds: toolsToExecute.map(tool => tool.id),
    executionPathIds: [...(session.executionPathIds || [])]
  });
}

/**
 * 执行工具的主路径选择器。
 *
 * - 自动执行 / 手动 post_response_api：优先走当前主链 runToolPostResponse()
 * - 其余场景：回退到 executeToolWithConfig() 兼容入口
 */
async function executeToolByResolvedPath(tool, context, isManual) {
  if (isManual || tool.output?.mode === OUTPUT_MODES.POST_RESPONSE_API) {
    return toolOutputService.runToolPostResponse(tool, context);
  }

  return executeToolWithConfig(tool.id, context);
}

/**
 * 初始化工具触发管理器
 * @description 注册GENERATION_ENDED事件监听，自动触发工具执行
 */
export function initToolTriggerManager() {
  if (toolTriggerManagerState.initialized) {
    log('工具触发管理器已初始化');
    return;
  }
  
  // 注册GENERATION_ENDED事件监听
  registerGenerationEndedListener();
  
  toolTriggerManagerState.initialized = true;
  log('工具触发管理器已初始化');
  
  // 发送事件
  eventBus.emit(EVENTS.TOOL_TRIGGER_INITIALIZED);
}

/**
 * 注册GENERATION_ENDED事件监听
 */
function registerGenerationEndedListener() {
  const generationEndedListener = registerEventListener(EVENT_TYPES.GENERATION_ENDED, async (data) => {
    const incomingMessageId = extractEventMessageId(data, EVENT_TYPES.GENERATION_ENDED);
    const activeGenerationTraceId = triggerState.gateState.lastGenerationTraceId || '';
    const session = getOrCreateMessageSession(EVENT_TYPES.GENERATION_ENDED, data, {
      eventType: EVENT_TYPES.GENERATION_ENDED,
      messageId: incomingMessageId
    });
    saveEventDebugSnapshot({
      stage: 'received',
      eventType: EVENT_TYPES.GENERATION_ENDED,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: incomingMessageId,
      receivedAt: Date.now()
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.RECEIVED,
      eventType: EVENT_TYPES.GENERATION_ENDED,
      messageId: incomingMessageId
    });

    const resolvedBaseline = await waitForResolvedGenerationBaseline({
      traceId: activeGenerationTraceId,
      retries: 6,
      retryDelayMs: 80
    });
    const eligibility = getGenerationConfirmationEligibility(resolvedBaseline);
    if (!eligibility.eligible) {
      scheduleSpeculativeSession(EVENT_TYPES.GENERATION_ENDED, data, {
        messageId: incomingMessageId,
        reason: eligibility.reason,
        skipReasonDetailed: eligibility.detail,
        confirmationSource: 'none'
      });
      return;
    }

    const confirmedAssistantMessage = await getConfirmedAssistantMessageWithRetries(incomingMessageId, {
      retries: incomingMessageId ? 3 : 8,
      retryDelayMs: incomingMessageId ? 120 : 260
    });
    const confirmedAssistantMessageId = normalizeMessageIdentityValue(confirmedAssistantMessage?.sourceId);

    if (!confirmedAssistantMessageId) {
      scheduleSpeculativeSession(EVENT_TYPES.GENERATION_ENDED, data, {
        messageId: incomingMessageId,
        reason: AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
        skipReasonDetailed: 'missing_new_assistant_message_after_generation',
        confirmationSource: 'none',
        eventBelongsToCurrentGeneration: !!resolvedBaseline,
        historicalReplayBlocked: false,
        historicalReplayReason: ''
      });
      return;
    }

    await handleAutoTrigger(EVENT_TYPES.GENERATION_ENDED, {
      ...(typeof data === 'object' && data ? data : {}),
      messageId: confirmedAssistantMessageId,
      confirmedAssistantMessageId,
      confirmationSource: 'generation_ended',
      eventBelongsToCurrentGeneration: true,
      historicalReplayBlocked: false,
      historicalReplayReason: ''
    });
  });

  const generationAfterCommandsListener = registerEventListener(EVENT_TYPES.GENERATION_AFTER_COMMANDS, async (data) => {
    const incomingMessageId = extractEventMessageId(data, EVENT_TYPES.GENERATION_AFTER_COMMANDS);
    const activeGenerationTraceId = triggerState.gateState.lastGenerationTraceId || '';
    const { debounceMs } = getResolvedListenerSettings();
    const session = getOrCreateMessageSession(EVENT_TYPES.GENERATION_AFTER_COMMANDS, data, {
      eventType: EVENT_TYPES.GENERATION_AFTER_COMMANDS,
      messageId: incomingMessageId
    });
    saveEventDebugSnapshot({
      stage: 'received',
      eventType: EVENT_TYPES.GENERATION_AFTER_COMMANDS,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: incomingMessageId,
      receivedAt: Date.now(),
      scheduledDelayMs: debounceMs
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.RECEIVED,
      eventType: EVENT_TYPES.GENERATION_AFTER_COMMANDS,
      messageId: incomingMessageId
    });
    if (!getResolvedListenerSettings().useGenerationAfterCommandsFallback) {
      updateMessageSession(session, {
        phase: MESSAGE_SESSION_PHASES.IGNORED,
        skipReason: 'generation_after_commands_fallback_disabled',
        completedAt: Date.now()
      });
      appendMessageSessionHistory(session, {
        phase: MESSAGE_SESSION_PHASES.IGNORED,
        eventType: EVENT_TYPES.GENERATION_AFTER_COMMANDS,
        messageId: incomingMessageId,
        skipReason: 'generation_after_commands_fallback_disabled'
      });
      return;
    }

    const resolvedBaseline = await waitForResolvedGenerationBaseline({
      traceId: activeGenerationTraceId,
      retries: 6,
      retryDelayMs: 80
    });
    const eligibility = getGenerationConfirmationEligibility(resolvedBaseline);
    if (!incomingMessageId) {
      scheduleSpeculativeSession(EVENT_TYPES.GENERATION_AFTER_COMMANDS, data, {
        reason: AUTO_TRIGGER_SKIP_REASONS.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,
        skipReasonDetailed: eligibility.eligible
          ? 'generation_after_commands_without_message_identity'
          : eligibility.detail,
        confirmationSource: 'none'
      });
      return;
    }

    if (!eligibility.eligible) {
      scheduleSpeculativeSession(EVENT_TYPES.GENERATION_AFTER_COMMANDS, data, {
        messageId: incomingMessageId,
        reason: eligibility.reason,
        skipReasonDetailed: eligibility.detail,
        confirmationSource: 'none'
      });
      return;
    }

    const confirmedAssistantMessage = await getConfirmedAssistantMessageWithRetries(incomingMessageId, {
      retries: 2,
      retryDelayMs: 120
    });
    const confirmedAssistantMessageId = normalizeMessageIdentityValue(confirmedAssistantMessage?.sourceId);

    if (!confirmedAssistantMessageId) {
      scheduleSpeculativeSession(EVENT_TYPES.GENERATION_AFTER_COMMANDS, data, {
        messageId: incomingMessageId,
        reason: AUTO_TRIGGER_SKIP_REASONS.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,
        skipReasonDetailed: 'generation_after_commands_message_not_confirmed',
        confirmationSource: 'none',
        eventBelongsToCurrentGeneration: !!resolvedBaseline,
        historicalReplayBlocked: false,
        historicalReplayReason: ''
      });
      return;
    }

    scheduleAutoTrigger(EVENT_TYPES.GENERATION_AFTER_COMMANDS, data, debounceMs, {
      messageId: incomingMessageId,
      confirmedAssistantMessageId,
      confirmationSource: 'generation_after_commands',
      eventBelongsToCurrentGeneration: true,
      historicalReplayBlocked: false,
      historicalReplayReason: ''
    });
  });

  const messageReceivedListener = registerEventListener(EVENT_TYPES.MESSAGE_RECEIVED, async (data) => {
    const messageId = extractEventMessageId(data, EVENT_TYPES.MESSAGE_RECEIVED);
    const resolvedMessageEntry = messageId
      ? await findRawChatMessageByIdentityWithRetries(messageId, {
          retries: 3,
          retryDelayMs: 120
        })
      : null;
    const resolvedMessage = resolvedMessageEntry?.message || null;
    const resolvedRole = resolvedMessage ? normalizeMessageRole(resolvedMessage) : '';
    const resolvedMessageId = resolvedMessageEntry
      ? normalizeMessageIdentityValue(getMessageIdentity(resolvedMessage, resolvedMessageEntry.index))
      : '';
    const effectiveMessageId = messageId || resolvedMessageId;
    const { debounceMs } = getResolvedListenerSettings();
    const session = getOrCreateMessageSession(EVENT_TYPES.MESSAGE_RECEIVED, data, {
      eventType: EVENT_TYPES.MESSAGE_RECEIVED,
      messageId: effectiveMessageId,
      messageRole: resolvedRole
    });

    if (!messageId) {
      traceAlways('info', 'MESSAGE_RECEIVED 缺少消息身份，判定为宿主 UI 干扰事件，跳过', {
        rawEventData: data ?? null
      });
      saveEventDebugSnapshot({
        stage: 'ignored_ui_side_effect',
        eventType: EVENT_TYPES.MESSAGE_RECEIVED,
        traceId: session?.traceId || '',
        sessionKey: session?.sessionKey || '',
        messageId: '',
        messageRole: resolvedRole,
        reason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
        handledAt: Date.now()
      });
      updateMessageSession(session, {
        phase: MESSAGE_SESSION_PHASES.IGNORED,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
        completedAt: Date.now(),
        messageRole: resolvedRole
      });
      appendMessageSessionHistory(session, {
        phase: MESSAGE_SESSION_PHASES.IGNORED,
        eventType: EVENT_TYPES.MESSAGE_RECEIVED,
        messageId: '',
        messageRole: resolvedRole,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT
      });
      return;
    }

    saveEventDebugSnapshot({
      stage: 'received',
      eventType: EVENT_TYPES.MESSAGE_RECEIVED,
      traceId: session?.traceId || '',
      sessionKey: session?.sessionKey || '',
      messageId: effectiveMessageId,
      messageRole: resolvedRole,
      receivedAt: Date.now(),
      scheduledDelayMs: debounceMs
    });
    appendMessageSessionHistory(session, {
      phase: MESSAGE_SESSION_PHASES.RECEIVED,
      eventType: EVENT_TYPES.MESSAGE_RECEIVED,
      messageId: effectiveMessageId,
      messageRole: resolvedRole
    });

    if (!getResolvedListenerSettings().useMessageReceivedFallback) {
      updateMessageSession(session, {
        phase: MESSAGE_SESSION_PHASES.IGNORED,
        skipReason: 'message_received_fallback_disabled',
        completedAt: Date.now(),
        messageRole: resolvedRole
      });
      appendMessageSessionHistory(session, {
        phase: MESSAGE_SESSION_PHASES.IGNORED,
        eventType: EVENT_TYPES.MESSAGE_RECEIVED,
        messageId: effectiveMessageId,
        messageRole: resolvedRole,
        skipReason: 'message_received_fallback_disabled'
      });
      return;
    }

    if (!resolvedMessageEntry) {
      scheduleSpeculativeSession(EVENT_TYPES.MESSAGE_RECEIVED, data, {
        messageId,
        reason: AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
        skipReasonDetailed: 'message_received_identity_not_resolved',
        confirmationSource: 'none'
      });
      return;
    }

    if (resolvedMessage && resolvedRole !== 'assistant') {
      traceAlways('info', 'MESSAGE_RECEIVED 命中非 AI 消息，跳过自动触发调度', {
        messageId: effectiveMessageId,
        messageRole: resolvedRole
      });
      saveEventDebugSnapshot({
        stage: 'ignored_non_assistant',
        eventType: EVENT_TYPES.MESSAGE_RECEIVED,
        traceId: session?.traceId || '',
        sessionKey: session?.sessionKey || '',
        messageId: effectiveMessageId,
        messageRole: resolvedRole,
        reason: AUTO_TRIGGER_SKIP_REASONS.NON_ASSISTANT_MESSAGE,
        handledAt: Date.now()
      });
      updateMessageSession(session, {
        phase: MESSAGE_SESSION_PHASES.IGNORED,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.NON_ASSISTANT_MESSAGE,
        completedAt: Date.now(),
        messageRole: resolvedRole
      });
      appendMessageSessionHistory(session, {
        phase: MESSAGE_SESSION_PHASES.IGNORED,
        eventType: EVENT_TYPES.MESSAGE_RECEIVED,
        messageId: effectiveMessageId,
        messageRole: resolvedRole,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.NON_ASSISTANT_MESSAGE
      });
      return;
    }

    const confirmationCandidate = await evaluateMessageReceivedConfirmationCandidate(resolvedMessageEntry, {
      traceId: triggerState.gateState.lastGenerationTraceId || ''
    });

    if (!confirmationCandidate.allowed) {
      scheduleSpeculativeSession(EVENT_TYPES.MESSAGE_RECEIVED, data, {
        messageId: effectiveMessageId,
        reason: confirmationCandidate.reason,
        skipReasonDetailed: confirmationCandidate.detail,
        confirmationSource: 'none',
        eventBelongsToCurrentGeneration: confirmationCandidate.eventBelongsToCurrentGeneration,
        historicalReplayBlocked: confirmationCandidate.historicalReplayBlocked,
        historicalReplayReason: confirmationCandidate.historicalReplayReason
      });
      return;
    }

    const confirmedAssistantMessage = await getConfirmedAssistantMessageWithRetries(effectiveMessageId, {
      retries: 3,
      retryDelayMs: 120
    });
    const confirmedAssistantMessageId = normalizeMessageIdentityValue(confirmedAssistantMessage?.sourceId);

    if (!confirmedAssistantMessageId) {
      scheduleSpeculativeSession(EVENT_TYPES.MESSAGE_RECEIVED, data, {
        messageId: effectiveMessageId,
        reason: AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
        skipReasonDetailed: 'message_received_not_confirmed_as_new_assistant',
        confirmationSource: 'none',
        eventBelongsToCurrentGeneration: true,
        historicalReplayBlocked: false,
        historicalReplayReason: ''
      });
      return;
    }

    scheduleAutoTrigger(EVENT_TYPES.MESSAGE_RECEIVED, data, debounceMs, {
      messageId: effectiveMessageId,
      confirmedAssistantMessageId,
      confirmationSource: 'message_received',
      eventBelongsToCurrentGeneration: true,
      historicalReplayBlocked: false,
      historicalReplayReason: ''
    });
  });
  
  toolTriggerManagerState.listeners.set(EVENT_TYPES.GENERATION_ENDED, generationEndedListener);
  toolTriggerManagerState.listeners.set(EVENT_TYPES.GENERATION_AFTER_COMMANDS, generationAfterCommandsListener);
  toolTriggerManagerState.listeners.set(EVENT_TYPES.MESSAGE_RECEIVED, messageReceivedListener);
}

/**
 * 构建工具执行上下文
 * @param {Object} eventData 事件数据
 * @returns {Promise<Object>} 执行上下文
 */
async function buildToolExecutionContext(eventData) {
  const character = await getCurrentCharacter();
  const api = getSillyTavernAPI();
  const stContext = api?.getContext?.() || null;
  const triggerEvent = eventData?.triggerEvent || 'GENERATION_ENDED';
  const preferredMessageId = normalizeMessageIdentityValue(
    eventData?.confirmedAssistantMessageId || extractEventMessageId(eventData, triggerEvent)
  );
  const confirmationSource = String(eventData?.confirmationSource || '').trim();
  const isManual = triggerEvent === 'MANUAL' || triggerEvent === 'MANUAL_PREVIEW';

  let confirmedAssistantMessage = null;
  let targetMessageId = normalizeMessageIdentityValue(preferredMessageId);

  if (!isManual) {
    confirmedAssistantMessage = await getConfirmedAssistantMessageWithRetries(targetMessageId, {
      retries: targetMessageId ? 3 : 8,
      retryDelayMs: targetMessageId ? 120 : 260
    });

    if (confirmedAssistantMessage) {
      targetMessageId = normalizeMessageIdentityValue(confirmedAssistantMessage.sourceId);
    }
  }

  const lockToMessageId = shouldLockToEventMessageId(triggerEvent, eventData, targetMessageId)
    || Boolean(targetMessageId);

  const conversation = await getConversationSnapshot({
    preferredMessageId: targetMessageId || null,
    retries: isManual ? 2 : (targetMessageId ? 2 : 0),
    retryDelayMs: isManual ? 120 : 120,
    lockToMessageId
  });

  const messages = conversation.messages || [];
  const lastUserMessage = conversation.lastUserMessage;
  let lastAiMessage = conversation.lastAiMessage;

  if (!isManual) {
    if (!confirmedAssistantMessage) {
      lastAiMessage = null;
    } else if (normalizeMessageIdentityValue(lastAiMessage?.sourceId) !== targetMessageId) {
      lastAiMessage = confirmedAssistantMessage;
    }
  }

  const messageId = targetMessageId || normalizeMessageIdentityValue(lastAiMessage?.sourceId) || '';
  
  return {
    triggeredAt: Date.now(),
    triggerEvent,
    traceId: eventData?.traceId || '',
    sessionKey: eventData?.sessionKey || '',
    confirmationSource,
    confirmedAssistantMessageId: messageId,
    chatId: resolveStableChatId(api, stContext, character),
    messageId,
    lastAiMessage: lastAiMessage?.content || '',
    userMessage: lastUserMessage?.content || triggerState.gateState.lastUserMessageText || '',
    chatMessages: messages,
    input: {
      userMessage: lastUserMessage?.content || triggerState.gateState.lastUserMessageText || '',
      lastAiMessage: lastAiMessage?.content || '',
      extractedContent: '',
      previousToolOutput: '',
      context: {
        character: character?.name || '',
        chatLength: messages.length || 0
      }
    },
    config: {},
    status: 'pending'
  };
}

/**
 * 获取需要执行的工具列表
 * @param {string} eventType 事件类型
 * @returns {Array} 需要执行的工具配置列表
 */
function getToolsToExecute(eventType) {
  const tools = getToolsForEvent(eventType);
  return tools.filter(tool => toolOutputService.shouldRunPostResponse(tool));
}

/**
 * 更新工具运行时状态
 * @param {string} toolId
 * @param {Object} runtimePartial
 */
function updateRuntime(toolId, runtimePartial) {
  try {
    updateToolRuntime(toolId, runtimePartial);
  } catch (error) {
    console.warn('[ToolTrigger] 更新工具运行时状态失败:', toolId, error);
  }
}

/**
 * 执行单个工具
 * @param {Object} tool
 * @param {Object} context
 * @returns {Promise<Object>}
 */
async function executeTriggeredTool(tool, context) {
  const startedAt = Date.now();
  const toolId = tool.id;
  const isManual = context?.triggerEvent === 'MANUAL';
  const noticeId = `yyt-tool-run-${toolId}`;
  const executionPath = resolveExecutionPath(tool, context);
  const messageKey = context?.messageKey || getAutoTriggerMessageKey(context || {});

  updateRuntime(toolId, {
    lastStatus: 'running',
    lastError: '',
    lastDurationMs: 0,
    lastTraceId: context?.traceId || '',
    lastTriggerAt: startedAt,
    lastTriggerEvent: context?.triggerEvent || EVENT_TYPES.GENERATION_ENDED,
    lastMessageKey: messageKey,
    lastSkipReason: '',
    lastExecutionPath: executionPath,
    lastWritebackStatus: '',
    lastFailureStage: ''
  });

  eventBus.emit(EVENTS.TOOL_EXECUTION_REQUESTED, {
    toolId,
    traceId: context?.traceId || '',
    triggerEvent: context?.triggerEvent || 'GENERATION_ENDED',
    context
  });

  showTopNotice('info', `${isManual ? '正在手动执行' : '已检测到 AI 回复，正在自动执行'} ${tool.name}`, {
    sticky: true,
    noticeId
  });
  traceAlways('info', '开始执行工具', {
    toolId,
    toolName: tool.name,
    triggerEvent: context?.triggerEvent,
    executionPath,
    messageKey
  });

  try {
    const result = await executeToolByResolvedPath(tool, context, isManual);

    const duration = Date.now() - startedAt;

    if (result?.success) {
      const config = getToolFullConfig(toolId);
      updateRuntime(toolId, {
        lastStatus: 'success',
        lastError: '',
        lastDurationMs: duration,
        lastTraceId: context?.traceId || '',
        successCount: (config?.runtime?.successCount || 0) + 1,
        lastTriggerAt: startedAt,
        lastTriggerEvent: context?.triggerEvent || EVENT_TYPES.GENERATION_ENDED,
        lastMessageKey: messageKey,
        lastSkipReason: '',
        lastExecutionPath: executionPath,
        lastWritebackStatus: result?.meta?.writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
        lastFailureStage: result?.meta?.failureStage || ''
      });

      const message = isManual
        ? `${tool.name} 手动执行完成`
        : `已监听 AI 回复并执行 ${tool.name}`;

      showToast('success', message);
      showTopNotice('success', message, {
        duration: 3200,
        noticeId
      });
      traceAlways('info', '工具执行成功', {
        toolId,
        traceId: context?.traceId || '',
        executionPath,
        duration,
        writebackStatus: result?.meta?.writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE
      });
      return { success: true, duration, result };
    }

    const config = getToolFullConfig(toolId);
    const errorMessage = result?.error || '工具执行失败';

    updateRuntime(toolId, {
      lastStatus: 'error',
      lastError: errorMessage,
      lastDurationMs: duration,
      lastTraceId: context?.traceId || '',
      errorCount: (config?.runtime?.errorCount || 0) + 1,
      lastTriggerAt: startedAt,
      lastTriggerEvent: context?.triggerEvent || EVENT_TYPES.GENERATION_ENDED,
      lastMessageKey: messageKey,
      lastSkipReason: '',
      lastExecutionPath: executionPath,
      lastWritebackStatus: result?.meta?.writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: result?.meta?.failureStage || (executionPath === TOOL_EXECUTION_PATHS.MANUAL_COMPATIBILITY
        ? TOOL_FAILURE_STAGES.COMPATIBILITY_EXECUTE
        : TOOL_FAILURE_STAGES.UNKNOWN)
    });

    showToast('error', `${tool.name} 执行失败：${errorMessage}`);
    showTopNotice('error', `${tool.name} 执行失败：${errorMessage}`, {
      sticky: true,
      noticeId
    });
    traceAlways('error', '工具执行失败', {
      toolId,
      traceId: context?.traceId || '',
      executionPath,
      duration,
      error: errorMessage,
      failureStage: result?.meta?.failureStage || ''
    });
    return { success: false, duration, error: errorMessage, result };
  } catch (error) {
    const duration = Date.now() - startedAt;
    const config = getToolFullConfig(toolId);
    const errorMessage = error?.message || String(error);

    updateRuntime(toolId, {
      lastStatus: 'error',
      lastError: errorMessage,
      lastDurationMs: duration,
      lastTraceId: context?.traceId || '',
      errorCount: (config?.runtime?.errorCount || 0) + 1,
      lastTriggerAt: startedAt,
      lastTriggerEvent: context?.triggerEvent || EVENT_TYPES.GENERATION_ENDED,
      lastMessageKey: messageKey,
      lastSkipReason: '',
      lastExecutionPath: executionPath,
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: executionPath === TOOL_EXECUTION_PATHS.MANUAL_COMPATIBILITY
        ? TOOL_FAILURE_STAGES.COMPATIBILITY_EXECUTE
        : TOOL_FAILURE_STAGES.UNKNOWN
    });

    showToast('error', `${tool.name} 执行失败：${errorMessage}`);
    showTopNotice('error', `${tool.name} 执行失败：${errorMessage}`, {
      sticky: true,
      noticeId
    });
    traceAlways('error', '工具执行抛出异常', {
      toolId,
      traceId: context?.traceId || '',
      executionPath,
      duration,
      error: errorMessage
    });
    throw error;
  }
}

/**
 * 手动执行单个工具
 * @param {string} toolId
 * @returns {Promise<Object>}
 */
export async function runToolManually(toolId) {
  if (!toolId) {
    return { success: false, error: '缺少工具ID' };
  }

  const tool = getToolFullConfig(toolId);
  if (!tool) {
    return { success: false, error: '工具不存在' };
  }

  if (!tool.enabled) {
    patchToolRuntime(toolId, {
      lastTriggerAt: Date.now(),
      lastTriggerEvent: 'MANUAL',
      lastMessageKey: '',
      lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.TOOL_DISABLED,
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: ''
    }, {
      touchLastRunAt: false,
      emitEvent: false
    });

    showTopNotice('warning', `${tool.name} 未启用，无法手动执行`, {
      duration: 2800,
      noticeId: `yyt-tool-run-${toolId}`
    });
    return { success: false, error: '工具未启用' };
  }

  const context = await buildToolExecutionContext({ triggerEvent: 'MANUAL' });
  traceAlways('info', '手动执行工具', { toolId });
  return executeTriggeredTool(tool, context);
}

/**
 * 预览工具提取结果
 * @param {string} toolId
 * @returns {Promise<Object>}
 */
export async function previewToolExtraction(toolId) {
  if (!toolId) {
    return { success: false, error: '缺少工具ID' };
  }

  const tool = getToolFullConfig(toolId);
  if (!tool) {
    return { success: false, error: '工具不存在' };
  }

  const context = await buildToolExecutionContext({ triggerEvent: 'MANUAL_PREVIEW' });
  return toolOutputService.previewExtraction(tool, context);
}

/**
 * 销毁工具触发管理器
 */
export function destroyToolTriggerManager() {
  for (const timer of toolTriggerManagerState.pendingMessageTimers.values()) {
    clearTimeout(timer);
  }
  toolTriggerManagerState.pendingMessageTimers.clear();

  for (const unregister of toolTriggerManagerState.listeners.values()) {
    if (typeof unregister === 'function') {
      unregister();
    }
  }
  toolTriggerManagerState.listeners.clear();
  toolTriggerManagerState.messageSessions.clear();
  toolTriggerManagerState.recentSessionHistory = [];
  toolTriggerManagerState.recentEventTimeline = [];
  toolTriggerManagerState.initialized = false;
  toolTriggerManagerState.lastExecutionContext = null;
  toolTriggerManagerState.lastHandledMessageKey = '';
  toolTriggerManagerState.lastAutoTriggerSnapshot = null;
  toolTriggerManagerState.lastEventDebugSnapshot = null;
  toolTriggerManagerState.lastDuplicateMessageKey = '';
  toolTriggerManagerState.lastDuplicateMessageAt = 0;
  
  log('工具触发管理器已销毁');
}

/**
 * 获取工具触发管理器状态
 * @returns {Object} 状态对象
 */
export function getToolTriggerManagerState() {
  const activeSessions = Array.from(toolTriggerManagerState.messageSessions.values())
    .map(cloneDiagnosticEntryForOutput)
    .filter(Boolean)
    .sort((left, right) => (Number(left?.updatedAt) || 0) - (Number(right?.updatedAt) || 0));
  const recentSessionHistory = [...toolTriggerManagerState.recentSessionHistory]
    .map(cloneDiagnosticEntryForOutput)
    .filter(Boolean);
  const recentEventTimeline = [...toolTriggerManagerState.recentEventTimeline]
    .map(cloneTimelineEntryForOutput)
    .filter(Boolean);

  return {
    initialized: toolTriggerManagerState.initialized,
    listenersCount: toolTriggerManagerState.listeners.size,
    activeSessionCount: toolTriggerManagerState.messageSessions.size,
    activeSessions,
    recentSessionHistory,
    recentEventTimeline,
    lastExecutionContext: toolTriggerManagerState.lastExecutionContext,
    lastAutoTriggerSnapshot: toolTriggerManagerState.lastAutoTriggerSnapshot,
    lastEventDebugSnapshot: toolTriggerManagerState.lastEventDebugSnapshot,
    registeredEvents: Array.from(toolTriggerManagerState.listeners.keys()),
    pendingTimerCount: toolTriggerManagerState.pendingMessageTimers.size,
    lastHandledMessageKey: toolTriggerManagerState.lastHandledMessageKey,
    listenerSettings: getResolvedListenerSettings(),
    eventBridge: buildEventBridgeDiagnosticSummary(),
    gateState: buildGateStateDiagnosticSummary()
  };
}

export function getAutoTriggerDiagnostics(options = {}) {
  const parsedHistoryLimit = parseInt(options?.historyLimit, 10);
  const historyLimit = Number.isFinite(parsedHistoryLimit)
    ? Math.max(1, Math.min(50, parsedHistoryLimit))
    : 8;
  const baseline = triggerState.gateState.lastGenerationBaseline;

  const activeSessions = Array.from(toolTriggerManagerState.messageSessions.values())
    .map(cloneDiagnosticEntryForOutput)
    .filter(Boolean)
    .sort((left, right) => (Number(left?.updatedAt) || 0) - (Number(right?.updatedAt) || 0));

  const recentSessionHistory = trimManagerHistoryEntries([
    ...toolTriggerManagerState.recentSessionHistory
  ], historyLimit).map(cloneDiagnosticEntryForOutput);
  const recentEventTimeline = trimManagerHistoryEntries([
    ...toolTriggerManagerState.recentEventTimeline
  ], Math.max(historyLimit * 3, historyLimit)).map(cloneTimelineEntryForOutput);

  const phaseCounts = {
    activeSessions: buildDiagnosticPhaseCounts(activeSessions),
    recentSessionHistory: buildDiagnosticPhaseCounts(recentSessionHistory)
  };

  const consistency = {
    activeSessions: buildDiagnosticDriftSummary(activeSessions),
    recentSessionHistory: buildDiagnosticDriftSummary(recentSessionHistory)
  };

  const verdictHints = buildAutoTriggerVerdictHints({
    summary: {
      listenerSettings: getResolvedListenerSettings()
    },
    activeSessions,
    recentSessionHistory,
    lastEventDebugSnapshot: toolTriggerManagerState.lastEventDebugSnapshot,
    lastAutoTriggerSnapshot: toolTriggerManagerState.lastAutoTriggerSnapshot
  });

  return {
    summary: {
      generationTraceId: triggerState.gateState.lastGenerationTraceId || '',
      generationType: triggerState.gateState.lastGenerationType || '',
      generationDryRun: !!triggerState.gateState.lastGenerationDryRun,
      generationStartedAt: baseline?.startedAt || 0,
      generationEndedAt: triggerState.gateState.lastGenerationAt || 0,
      isGenerating: !!triggerState.gateState.isGenerating,
      baselineMessageCount: baseline?.messageCount || 0,
      baselineAssistantId: baseline?.lastAssistantMessageId || '',
      uiTransitionGuardActive: isUiTransitionGuardActive(),
      uiTransitionGuardUntil: triggerState.gateState.uiTransitionGuardUntil || 0,
      lastUiTransitionSource: triggerState.gateState.lastUiTransitionSource || '',
      activeSessionCount: toolTriggerManagerState.messageSessions.size,
      pendingTimerCount: toolTriggerManagerState.pendingMessageTimers.size,
      lastHandledMessageKey: toolTriggerManagerState.lastHandledMessageKey || '',
      lastDuplicateMessageKey: toolTriggerManagerState.lastDuplicateMessageKey || '',
      registeredEvents: Array.from(toolTriggerManagerState.listeners.keys()),
      listenerSettings: getResolvedListenerSettings(),
      eventBridge: buildEventBridgeDiagnosticSummary(),
      gateState: buildGateStateDiagnosticSummary(),
      phaseCounts,
      consistency,
      verdictHints,
      ...getCurrentGenerationDiagnosticFields()
    },
    activeSessions,
    recentSessionHistory,
    recentEventTimeline,
    verdictHints,
    lastEventDebugSnapshot: cloneDiagnosticEntryForOutput(toolTriggerManagerState.lastEventDebugSnapshot),
    lastAutoTriggerSnapshot: cloneDiagnosticEntryForOutput(toolTriggerManagerState.lastAutoTriggerSnapshot)
  };
}

export function exportAutoTriggerDiagnostics(options = {}) {
  const diagnostics = getAutoTriggerDiagnostics(options);
  return JSON.parse(JSON.stringify({
    exportedAt: Date.now(),
    schemaVersion: 'auto-trigger-diagnostics.v1',
    ...diagnostics
  }));
}

// ============================================================
// 初始化
// ============================================================

/**
 * 初始化触发模块
 */
export async function initTriggerModule() {
  if (triggerState.isInitialized) {
    log('触发模块已初始化');
    traceAlways('info', '触发模块已初始化，跳过重复初始化');
    return;
  }
  
  // 获取SillyTavern API
  const api = getSillyTavernAPI();
  if (!api) {
    log('无法获取SillyTavern API，延迟初始化');
    traceAlways('warn', '等待酒馆事件源就绪后再初始化触发模块', {
      hasApi: !!api,
      hasEventSource: false,
      hasEventTypes: false
    });
    setTimeout(initTriggerModule, 1000);
    return;
  }

  const bridge = await ensureEventBridgeReady();
  const eventSource = bridge?.eventSource || getEventSource();
  const eventTypes = bridge?.eventTypes || getEventTypes();

  if (!eventSource) {
    log('无法获取SillyTavern事件源，延迟初始化');
    traceAlways('warn', '等待酒馆事件源就绪后再初始化触发模块', {
      hasApi: !!api,
      hasEventSource: !!eventSource,
      hasEventTypes: !!eventTypes,
      importError: eventBridgeState.importError?.message || ''
    });
    setTimeout(initTriggerModule, 1000);
    return;
  }

  traceAlways('info', '开始初始化触发模块', {
    hasApi: !!api,
    hasEventSource: !!eventSource,
    hasEventTypes: !!eventTypes,
    listenerSettings: getResolvedListenerSettings()
  });
  traceAlways('info', '使用事件源', {
    source: bridge?.source || eventBridgeState.source || 'unknown'
  });

  installSendIntentCaptureHooks();
  
  // 注册核心事件监听器
  // 监听消息发送事件
  registerEventListener(EVENT_TYPES.MESSAGE_SENT, async (messageId) => {
      const chatContext = await getChatContext({
        depth: 10,
        includeAssistant: false,
        includeSystem: false
      });
      const lastUserMessage = chatContext?.messages?.filter(msg => msg.role === 'user').pop();

      updateGateState({
        lastUserSendIntentAt: Date.now(),
        lastUserIntentSource: 'message_sent',
        lastUserMessageId: messageId,
        lastUserMessageAt: Date.now(),
        lastUserMessageText: lastUserMessage?.content || triggerState.gateState.lastUserMessageText || ''
      });
      log(`用户消息已发送: ${messageId}`);
      traceAlways('info', '记录用户发送意图', {
        messageId,
        lastUserMessage: lastUserMessage?.content || ''
      });
      appendRecentEventTimeline({
        kind: 'gate_event',
        eventType: EVENT_TYPES.MESSAGE_SENT,
        messageId,
        phase: 'user_intent_recorded',
        detail: 'message_sent'
      });
    });
  
  // 监听生成开始事件
  registerEventListener(EVENT_TYPES.GENERATION_STARTED, async (type, params, dryRun) => {
      const startedAt = Date.now();
      const traceId = createTraceId('generation');
      const generationUserIntent = resolveGenerationUserIntent(type, params || null, startedAt);
      const startedByUserIntent = generationUserIntent.startedByUserIntent;
      const userIntentDetectedAt = generationUserIntent.userIntentDetectedAt;
      const userIntentSource = generationUserIntent.userIntentSource;
      const userIntentDetail = generationUserIntent.userIntentDetail;
      const provisionalBaseline = createProvisionalGenerationBaseline({
        traceId,
        startedAt,
        type,
        params: params || null,
        dryRun: !!dryRun,
        startedByUserIntent,
        userIntentDetectedAt,
        userIntentSource,
        userIntentDetail,
        baselineResolved: false,
        provisional: true,
        baselineSource: 'generation_started_sync_provisional'
      });

      updateGateState({
        lastGenerationTraceId: traceId,
        lastGenerationType: type,
        lastGenerationParams: params || null,
        lastGenerationDryRun: !!dryRun,
        isGenerating: true,
        lastGenerationBaseline: provisionalBaseline
      });
      log(`生成开始: ${type}`);
      traceAlways('info', '收到生成开始事件', {
        type,
        dryRun: !!dryRun,
        params: params || null,
        traceId,
        startedByUserIntent,
        userIntentSource,
        userIntentDetail,
        baseline: provisionalBaseline
      });
      appendRecentEventTimeline({
        kind: 'generation_event',
        eventType: EVENT_TYPES.GENERATION_STARTED,
        traceId,
        phase: 'generation_started',
        detail: normalizeGenerationType(type, params || null),
        generationTraceId: traceId,
        baselineResolved: false,
        generationStartedByUserIntent: startedByUserIntent,
        generationUserIntentSource: userIntentSource
      });

      captureGenerationBaseline({
        traceId,
        startedAt,
        type,
        params: params || null,
        dryRun: !!dryRun,
        startedByUserIntent,
        userIntentDetectedAt,
        userIntentSource,
        userIntentDetail,
        baselineResolved: true,
        provisional: false,
        baselineResolutionAt: Date.now(),
        baselineSource: 'generation_started_async_resolved'
      }).then((resolvedBaseline) => {
        const currentBaseline = triggerState.gateState.lastGenerationBaseline;
        if (!currentBaseline || currentBaseline.traceId !== traceId) {
          traceAlways('info', 'generation baseline 已过期，放弃回填', {
            traceId,
            currentTraceId: currentBaseline?.traceId || ''
          });
          return;
        }

        updateGateState({
          lastGenerationBaseline: resolvedBaseline
        });
        traceAlways('info', 'generation baseline 已完成解析', {
          traceId,
          baseline: resolvedBaseline
        });
        appendRecentEventTimeline({
          kind: 'generation_baseline',
          eventType: EVENT_TYPES.GENERATION_STARTED,
          traceId,
          phase: 'baseline_resolved',
          detail: resolvedBaseline?.baselineSource || 'generation_started_async_resolved',
          generationTraceId: traceId,
          baselineResolved: true,
          generationStartedByUserIntent: resolvedBaseline?.startedByUserIntent,
          generationUserIntentSource: resolvedBaseline?.userIntentSource || ''
        });
      }).catch((error) => {
        const currentBaseline = triggerState.gateState.lastGenerationBaseline;
        if (!currentBaseline || currentBaseline.traceId !== traceId) {
          return;
        }

        const fallbackBaseline = {
          ...currentBaseline,
          baselineResolved: true,
          baselineResolutionAt: Date.now(),
          provisional: false,
          baselineSource: 'generation_started_async_failed_fallback'
        };

        updateGateState({
          lastGenerationBaseline: fallbackBaseline
        });
        traceAlways('warn', 'generation baseline 解析失败，已回退到 provisional baseline', {
          traceId,
          error: error?.message || String(error),
          baseline: fallbackBaseline
        });
        appendRecentEventTimeline({
          kind: 'generation_baseline',
          eventType: EVENT_TYPES.GENERATION_STARTED,
          traceId,
          phase: 'baseline_fallback',
          reason: 'generation_baseline_async_failed',
          detail: error?.message || String(error),
          generationTraceId: traceId,
          baselineResolved: true,
          generationStartedByUserIntent: fallbackBaseline?.startedByUserIntent,
          generationUserIntentSource: fallbackBaseline?.userIntentSource || ''
        });
      });
    });
  
  // 监听生成结束事件
  registerEventListener(EVENT_TYPES.GENERATION_ENDED, () => {
      updateGateState({
        lastGenerationAt: Date.now(),
        isGenerating: false
      });
      log('生成结束');
      traceAlways('info', '收到生成结束事件');
      appendRecentEventTimeline({
        kind: 'generation_event',
        eventType: EVENT_TYPES.GENERATION_ENDED,
        traceId: triggerState.gateState.lastGenerationTraceId || '',
        phase: 'generation_ended',
        generationTraceId: triggerState.gateState.lastGenerationTraceId || ''
      });
    });

  registerEventListener(EVENT_TYPES.CHAT_CHANGED, (data) => {
      enterUiTransitionGuard(EVENT_TYPES.CHAT_CHANGED);
      clearPendingAutoTriggerTimers('chat_changed');
      traceAlways('info', '收到聊天切换事件', {
        data: data ?? null
      });
      appendRecentEventTimeline({
        kind: 'ui_guard',
        eventType: EVENT_TYPES.CHAT_CHANGED,
        phase: 'ui_transition_guard_entered',
        detail: 'chat_changed'
      });
    });

  registerEventListener(EVENT_TYPES.CHAT_CREATED, (data) => {
      enterUiTransitionGuard(EVENT_TYPES.CHAT_CREATED);
      clearPendingAutoTriggerTimers('chat_created');
      traceAlways('info', '收到聊天创建事件', {
        data: data ?? null
      });
      appendRecentEventTimeline({
        kind: 'ui_guard',
        eventType: EVENT_TYPES.CHAT_CREATED,
        phase: 'ui_transition_guard_entered',
        detail: 'chat_created'
      });
    });
  
  // 初始化工具触发管理器
  initToolTriggerManager();
  
  triggerState.isInitialized = true;
  log('触发模块初始化完成');
  traceAlways('info', '触发模块初始化完成', {
    listenerSettings: getResolvedListenerSettings()
  });
}

/**
 * 设置调试模式
 * @param {boolean} enabled
 */
export function setDebugMode(enabled) {
  triggerState.debugMode = enabled;
}

// 导出
export { EVENT_TYPES, triggerState };