/**
 * YouYou Toolkit - 事件触发模块
 * @description 处理SillyTavern事件监听、门控检查和上下文获取
 */

import { eventBus, EVENTS } from './core/event-bus.js';
import { settingsService } from './core/settings-service.js';
import {
  getToolFullConfig,
  getEnabledTools,
  updateToolRuntime,
  patchToolRuntime,
  appendToolRuntimeHistory
} from './tool-registry.js';
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
  MESSAGE_SWIPED: 'MESSAGE_SWIPED',
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
    lastNormalizedGenerationType: '',
    lastGenerationAction: '',
    lastGenerationActionSource: '',
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
  WRITEBACK_ECHO_EVENT: 'writeback_echo_event',
  SLOT_EVENT_OUTSIDE_WINDOW: 'slot_event_outside_window',
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

const TRANSACTION_PHASES = {
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
const AUTO_TRIGGER_HANDLED_EXECUTION_RETENTION_MS = 60000;
const SLOT_EVENT_ACCEPT_WINDOW_MS = 12000;
const SLOT_WRITEBACK_GUARD_MS = 2500;
const EXPLICIT_USER_GENERATION_ACTIONS = new Set([
  'reroll',
  'regenerate',
  'swipe'
]);
const SAME_SLOT_REVISION_ACTIONS = new Set([
  'reroll',
  'regenerate',
  'swipe'
]);

const GENERATION_ACTION_PARAM_KEYS = [
  'type',
  'action',
  'name',
  'mode',
  'source',
  'reason',
  'kind',
  'command',
  'operation',
  'event',
  'trigger',
  'generationType',
  'generation_type',
  'regenType',
  'regen_type'
];

let toolExecutorCompatibilityModulePromise = null;

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
    swipeId: normalizeMessageIdentityValue(
      message?.swipe_id
      ?? message?.swipeId
      ?? message?.swipeID
    ),
    swipeCount: Array.isArray(message?.swipes) && message.swipes.length > 0
      ? message.swipes.length
      : 1,
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
    || eventType === EVENT_TYPES.MESSAGE_SWIPED
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

  if (
    triggerEvent === EVENT_TYPES.MESSAGE_RECEIVED
    || triggerEvent === EVENT_TYPES.MESSAGE_UPDATED
    || triggerEvent === EVENT_TYPES.MESSAGE_SWIPED
  ) {
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

function normalizeGenerationActionHint(value) {
  const normalizedValue = String(value || '').trim().toLowerCase();
  if (!normalizedValue) {
    return '';
  }

  if (/re\s*-?\s*roll|reroll|重\s*roll/.test(normalizedValue)) {
    return 'reroll';
  }

  if (/regenerat|\bregen\b|重新生成/.test(normalizedValue)) {
    return 'regenerate';
  }

  if (/\bswipe\b|swipe[_-]?id/.test(normalizedValue)) {
    return 'swipe';
  }

  if (/\bquiet\b/.test(normalizedValue)) {
    return 'quiet';
  }

  return '';
}

function resolveGenerationAction(type = '', params = null) {
  const rawGenerationType = typeof type === 'string'
    ? type.trim()
    : String(type || '').trim();
  const rawGenerationParams = params ?? null;
  const normalizedGenerationType = normalizeGenerationType(type, params);

  if (params?.swipeId !== undefined || params?.swipe_id !== undefined || params?.swipe === true || params?.isSwipe === true) {
    return {
      rawGenerationType,
      rawGenerationParams,
      normalizedGenerationType,
      generationAction: 'swipe',
      generationActionSource: 'params.swipe',
      explicitGenerationAction: 'swipe'
    };
  }

  const candidates = [
    {
      source: 'type',
      value: rawGenerationType
    }
  ];

  for (const key of GENERATION_ACTION_PARAM_KEYS) {
    const value = params?.[key];
    if (value === undefined || value === null || value === '') {
      continue;
    }

    candidates.push({
      source: `params.${key}`,
      value: String(value)
    });
  }

  for (const candidate of candidates) {
    const action = normalizeGenerationActionHint(candidate.value);
    if (!action) {
      continue;
    }

    return {
      rawGenerationType,
      rawGenerationParams,
      normalizedGenerationType,
      generationAction: action,
      generationActionSource: candidate.source,
      explicitGenerationAction: EXPLICIT_USER_GENERATION_ACTIONS.has(action) ? action : ''
    };
  }

  return {
    rawGenerationType,
    rawGenerationParams,
    normalizedGenerationType,
    generationAction: normalizedGenerationType || '',
    generationActionSource: normalizedGenerationType ? 'normalized_generation_type' : '',
    explicitGenerationAction: EXPLICIT_USER_GENERATION_ACTIONS.has(normalizedGenerationType)
      ? normalizedGenerationType
      : ''
  };
}

function buildAssistantContentFingerprint(content = '') {
  const normalizedContent = String(content || '').trim();
  if (!normalizedContent) {
    return '';
  }

  let hash = 0;
  for (let index = 0; index < normalizedContent.length; index += 1) {
    hash = ((hash << 5) - hash) + normalizedContent.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash).toString(36);
}

function resolveGenerationUserIntent(type, params = null, now = Date.now()) {
  const latestIntentAt = getLatestUserTriggerIntentTimestamp();
  const generationAction = resolveGenerationAction(type, params);

  if (latestIntentAt > 0 && (now - latestIntentAt) <= AUTO_TRIGGER_USER_INTENT_TTL_MS) {
    return {
      startedByUserIntent: true,
      userIntentDetectedAt: latestIntentAt,
      userIntentSource: 'recent_user_trigger_intent',
      userIntentDetail: 'recent_user_send_or_message'
    };
  }

  if (generationAction.explicitGenerationAction) {
    return {
      startedByUserIntent: true,
      userIntentDetectedAt: now,
      userIntentSource: `explicit_generation_action:${generationAction.explicitGenerationAction}`,
      userIntentDetail: `generation_action_${generationAction.explicitGenerationAction}`
    };
  }

  return {
    startedByUserIntent: false,
    userIntentDetectedAt: latestIntentAt,
    userIntentSource: 'none',
    userIntentDetail: 'no_recent_user_intent_or_explicit_generation_action'
  };
}

function getCurrentGenerationBaseline(chatId = resolveCurrentChatIdForTransaction()) {
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
  for (const timer of toolTriggerManagerState.pendingTransactionTimers.values()) {
    clearTimeout(timer);
  }

  toolTriggerManagerState.pendingTransactionTimers.clear();

  if (reason) {
    traceAlways('info', '已清理待执行自动触发定时器', { reason });
  }
}

function buildGenerationTransactionBaseline(rawMessages = [], metadata = {}) {
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
    lastAssistantContentFingerprint: buildAssistantContentFingerprint(lastAssistantMessage?.content || ''),
    lastAssistantSwipeId: normalizeMessageIdentityValue(lastAssistantMessage?.swipeId),
    lastAssistantSwipeCount: Number.isFinite(lastAssistantMessage?.swipeCount)
      ? Math.max(0, Number(lastAssistantMessage.swipeCount))
      : 0,
    lastAssistantPreview: String(lastAssistantMessage?.content || '').slice(0, 160),
    dryRun: !!metadata.dryRun,
    generationType: metadata.rawGenerationType || metadata.type || '',
    generationParams: metadata.rawGenerationParams || metadata.params || null,
    rawGenerationType: metadata.rawGenerationType || metadata.type || '',
    rawGenerationParams: metadata.rawGenerationParams || metadata.params || null,
    normalizedGenerationType: metadata.normalizedGenerationType || normalizeGenerationType(metadata.type, metadata.params),
    generationAction: metadata.generationAction || '',
    generationActionSource: metadata.generationActionSource || '',
    explicitGenerationAction: metadata.explicitGenerationAction || '',
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

async function captureGenerationTransactionBaseline(metadata = {}) {
  const rawMessages = await getRawChatMessages();
  return buildGenerationTransactionBaseline(rawMessages, {
    ...metadata,
    baselineResolved: metadata.baselineResolved !== undefined ? metadata.baselineResolved : true,
    baselineResolutionAt: Number(metadata.baselineResolutionAt) || Date.now(),
    provisional: metadata.provisional === true ? true : false,
    baselineSource: metadata.baselineSource || 'captured_chat_snapshot'
  });
}

function createProvisionalTransactionBaseline(metadata = {}) {
  return buildGenerationTransactionBaseline(getImmediateRawChatMessages(), {
    ...metadata,
    baselineResolved: false,
    baselineResolutionAt: 0,
    provisional: true,
    baselineSource: metadata.baselineSource || 'provisional_immediate_snapshot'
  });
}

async function waitForResolvedTransactionBaseline(options = {}) {
  const {
    chatId = resolveCurrentChatIdForTransaction(),
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

function resolveSameSlotRevisionAction(baseline = getCurrentGenerationBaseline()) {
  const candidates = [
    baseline?.explicitGenerationAction,
    baseline?.generationAction,
    triggerState.gateState.lastGenerationAction
  ];

  for (const candidate of candidates) {
    const normalizedCandidate = normalizeGenerationActionHint(candidate)
      || String(candidate || '').trim().toLowerCase();

    if (SAME_SLOT_REVISION_ACTIONS.has(normalizedCandidate)) {
      return normalizedCandidate;
    }
  }

  return '';
}

function isSameSlotRevisionActionFamily(action = '') {
  const normalizedAction = normalizeGenerationActionHint(action)
    || String(action || '').trim().toLowerCase();
  return SAME_SLOT_REVISION_ACTIONS.has(normalizedAction);
}

function resolveGenerationMessageBinding(preferredMessageId = '') {
  const normalizedPreferredMessageId = normalizeMessageIdentityValue(preferredMessageId);
  if (normalizedPreferredMessageId) {
    return {
      preferredMessageId: normalizedPreferredMessageId,
      bindingSource: 'event_message_id',
      forceSameSlotRevision: true,
      forcedSameSlotSource: 'message_id_bound_in_place'
    };
  }

  return {
    preferredMessageId: '',
    bindingSource: '',
    forceSameSlotRevision: false,
    forcedSameSlotSource: ''
  };
}

function isSameAssistantMessageSlot(message, baseline) {
  if (!message || !baseline) {
    return false;
  }

  const baselineMessageId = normalizeMessageIdentityValue(baseline.lastAssistantMessageId);
  const messageId = normalizeMessageIdentityValue(message.sourceId);
  const sameMessageId = !!baselineMessageId && !!messageId && baselineMessageId === messageId;
  const sameChatIndex = Number.isInteger(baseline.lastAssistantIndex)
    && baseline.lastAssistantIndex >= 0
    && message.chatIndex === baseline.lastAssistantIndex;

  if (sameMessageId) {
    return true;
  }

  if (!baselineMessageId && sameChatIndex) {
    return true;
  }

  return sameChatIndex;
}

function getSameSlotRevisionEvidence(message, baseline) {
  const baselineFingerprint = String(baseline?.lastAssistantContentFingerprint || '').trim();
  const messageFingerprint = buildAssistantContentFingerprint(message?.content || '');
  const baselineSwipeId = normalizeMessageIdentityValue(baseline?.lastAssistantSwipeId);
  const currentSwipeId = normalizeMessageIdentityValue(message?.swipeId);
  const baselineSwipeCount = Number.isFinite(baseline?.lastAssistantSwipeCount)
    ? Math.max(0, Number(baseline.lastAssistantSwipeCount))
    : 0;
  const currentSwipeCount = Number.isFinite(message?.swipeCount)
    ? Math.max(0, Number(message.swipeCount))
    : 0;

  const fingerprintChanged = !!baselineFingerprint && !!messageFingerprint && baselineFingerprint !== messageFingerprint;
  const swipeIdChanged = !!baselineSwipeId && !!currentSwipeId && baselineSwipeId !== currentSwipeId;
  const swipeCountChanged = baselineSwipeCount > 0 && currentSwipeCount > 0 && baselineSwipeCount !== currentSwipeCount;

  return {
    baselineFingerprint,
    messageFingerprint,
    baselineSwipeId,
    currentSwipeId,
    baselineSwipeCount,
    currentSwipeCount,
    fingerprintChanged,
    swipeIdChanged,
    swipeCountChanged,
    observedRevision: fingerprintChanged || swipeIdChanged || swipeCountChanged
  };
}

function buildSameSlotRevisionSource(evidence = {}, fallback = 'same_slot_revision') {
  const sources = [];

  if (evidence.fingerprintChanged) {
    sources.push('content_fingerprint_changed');
  }

  if (evidence.swipeIdChanged) {
    sources.push('swipe_id_changed');
  }

  if (evidence.swipeCountChanged) {
    sources.push('swipe_count_changed');
  }

  return sources.length > 0 ? sources.join('+') : fallback;
}

function evaluateAssistantMessageConfirmation(message, baseline, options = {}) {
  const {
    allowSameSlotRevision = false,
    requireObservedSameSlotRevision = true,
    forceSameSlotRevision = false,
    forcedSameSlotSource = ''
  } = options;

  if (!message || message.role !== 'assistant' || !isMeaningfulAssistantContent(message.content)) {
    return {
      allowed: false,
      confirmationMode: 'none',
      reason: 'invalid_assistant_message',
      sameSlotRevisionAction: '',
      sameSlotRevisionCandidate: false,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: '',
      observedSameSlotRevision: false,
      baselineAssistantContentFingerprint: '',
      confirmedAssistantContentFingerprint: '',
      baselineAssistantSwipeId: '',
      confirmedAssistantSwipeId: '',
      baselineAssistantSwipeCount: 0,
      confirmedAssistantSwipeCount: 0
    };
  }

  if (!baseline) {
    return {
      allowed: true,
      confirmationMode: 'no_baseline',
      reason: '',
      sameSlotRevisionAction: '',
      sameSlotRevisionCandidate: false,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: '',
      observedSameSlotRevision: false,
      baselineAssistantContentFingerprint: '',
      confirmedAssistantContentFingerprint: buildAssistantContentFingerprint(message.content || ''),
      baselineAssistantSwipeId: '',
      confirmedAssistantSwipeId: normalizeMessageIdentityValue(message.swipeId),
      baselineAssistantSwipeCount: 0,
      confirmedAssistantSwipeCount: Number.isFinite(message?.swipeCount)
        ? Math.max(0, Number(message.swipeCount))
        : 0
    };
  }

  if (isAssistantMessageConfirmedForCurrentGeneration(message, baseline)) {
    return {
      allowed: true,
      confirmationMode: 'slot_revision',
      reason: '',
      sameSlotRevisionAction: '',
      sameSlotRevisionCandidate: false,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: '',
      observedSameSlotRevision: false,
      baselineAssistantContentFingerprint: String(baseline.lastAssistantContentFingerprint || '').trim(),
      confirmedAssistantContentFingerprint: buildAssistantContentFingerprint(message.content || ''),
      baselineAssistantSwipeId: normalizeMessageIdentityValue(baseline.lastAssistantSwipeId),
      confirmedAssistantSwipeId: normalizeMessageIdentityValue(message.swipeId),
      baselineAssistantSwipeCount: Number.isFinite(baseline.lastAssistantSwipeCount)
        ? Math.max(0, Number(baseline.lastAssistantSwipeCount))
        : 0,
      confirmedAssistantSwipeCount: Number.isFinite(message?.swipeCount)
        ? Math.max(0, Number(message.swipeCount))
        : 0
    };
  }

  const resolvedSameSlotRevisionAction = resolveSameSlotRevisionAction(baseline);
  const sameSlotRevisionAction = forceSameSlotRevision
    ? (resolvedSameSlotRevisionAction || 'same_slot_in_place')
    : resolvedSameSlotRevisionAction;
  const sameSlotRevisionCandidate = isSameAssistantMessageSlot(message, baseline);
  const sameSlotRevisionEvidence = getSameSlotRevisionEvidence(message, baseline);

  if (!allowSameSlotRevision || !sameSlotRevisionCandidate || (!forceSameSlotRevision && !sameSlotRevisionAction)) {
    return {
      allowed: false,
      confirmationMode: 'none',
      reason: sameSlotRevisionCandidate
        ? 'same_slot_revision_action_unavailable'
        : 'assistant_slot_not_confirmed_for_generation',
      sameSlotRevisionAction,
      sameSlotRevisionCandidate,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: '',
      observedSameSlotRevision: sameSlotRevisionEvidence.observedRevision,
      baselineAssistantContentFingerprint: sameSlotRevisionEvidence.baselineFingerprint,
      confirmedAssistantContentFingerprint: sameSlotRevisionEvidence.messageFingerprint,
      baselineAssistantSwipeId: sameSlotRevisionEvidence.baselineSwipeId,
      confirmedAssistantSwipeId: sameSlotRevisionEvidence.currentSwipeId,
      baselineAssistantSwipeCount: sameSlotRevisionEvidence.baselineSwipeCount,
      confirmedAssistantSwipeCount: sameSlotRevisionEvidence.currentSwipeCount
    };
  }

  if (!forceSameSlotRevision && requireObservedSameSlotRevision && !sameSlotRevisionEvidence.observedRevision) {
    return {
      allowed: false,
      confirmationMode: 'none',
      reason: 'same_slot_revision_not_observed',
      sameSlotRevisionAction,
      sameSlotRevisionCandidate: true,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: '',
      observedSameSlotRevision: false,
      baselineAssistantContentFingerprint: sameSlotRevisionEvidence.baselineFingerprint,
      confirmedAssistantContentFingerprint: sameSlotRevisionEvidence.messageFingerprint,
      baselineAssistantSwipeId: sameSlotRevisionEvidence.baselineSwipeId,
      confirmedAssistantSwipeId: sameSlotRevisionEvidence.currentSwipeId,
      baselineAssistantSwipeCount: sameSlotRevisionEvidence.baselineSwipeCount,
      confirmedAssistantSwipeCount: sameSlotRevisionEvidence.currentSwipeCount
    };
  }

  const sameSlotRevisionSource = forceSameSlotRevision
    ? buildSameSlotRevisionSource(
        sameSlotRevisionEvidence,
        forcedSameSlotSource || 'same_slot_in_place'
      )
    : buildSameSlotRevisionSource(
        sameSlotRevisionEvidence,
        requireObservedSameSlotRevision
          ? 'same_slot_observed_revision'
          : 'same_slot_generation_confirmed'
      );

  return {
    allowed: true,
    confirmationMode: 'same_slot_revision',
    reason: '',
    sameSlotRevisionAction,
    sameSlotRevisionCandidate: true,
    sameSlotRevisionConfirmed: true,
    sameSlotRevisionSource,
    observedSameSlotRevision: sameSlotRevisionEvidence.observedRevision,
    baselineAssistantContentFingerprint: sameSlotRevisionEvidence.baselineFingerprint,
    confirmedAssistantContentFingerprint: sameSlotRevisionEvidence.messageFingerprint,
    baselineAssistantSwipeId: sameSlotRevisionEvidence.baselineSwipeId,
    confirmedAssistantSwipeId: sameSlotRevisionEvidence.currentSwipeId,
    baselineAssistantSwipeCount: sameSlotRevisionEvidence.baselineSwipeCount,
    confirmedAssistantSwipeCount: sameSlotRevisionEvidence.currentSwipeCount
  };
}

function normalizeResolvedMessageEntry(entry) {
  if (!entry?.message) {
    return null;
  }

  return {
    role: normalizeMessageRole(entry.message),
    content: getMessageContent(entry.message),
    chatIndex: entry.index,
    sourceId: normalizeMessageIdentityValue(getMessageIdentity(entry.message, entry.index)),
    swipeId: normalizeMessageIdentityValue(
      entry.message?.swipe_id
      ?? entry.message?.swipeId
      ?? entry.message?.swipeID
    ),
    swipeCount: Array.isArray(entry.message?.swipes) && entry.message.swipes.length > 0
      ? entry.message.swipes.length
      : 1
  };
}

async function evaluateMessageReceivedConfirmationCandidate(resolvedMessageEntry, options = {}) {
  const now = Date.now();
  const traceId = options?.traceId || triggerState.gateState.lastGenerationTraceId || '';
  const messageEntry = normalizeResolvedMessageEntry(resolvedMessageEntry);
  const boundMessageId = normalizeMessageIdentityValue(options?.messageId || messageEntry?.sourceId);
  const baseline = await waitForResolvedTransactionBaseline({
    traceId,
    retries: 4,
    retryDelayMs: 80
  }) || getCurrentGenerationBaseline();
  const withinGenerationWindow = isWithinGenerationConfirmationWindow(now, baseline);
  const confirmation = evaluateAssistantMessageConfirmation(messageEntry, baseline, {
    allowSameSlotRevision: true,
    requireObservedSameSlotRevision: !boundMessageId,
    forceSameSlotRevision: !!boundMessageId,
    forcedSameSlotSource: boundMessageId ? 'message_id_bound_in_place' : ''
  });
  const eventBelongsToCurrentGeneration = !!(messageEntry && baseline && confirmation.allowed);
  const traceMatches = !traceId || !baseline?.traceId || baseline.traceId === traceId;

  if (!messageEntry) {
    return {
      allowed: false,
      baseline,
      eventBelongsToCurrentGeneration: false,
      historicalReplayBlocked: false,
      historicalReplayReason: '',
      reason: AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
      detail: 'message_received_identity_not_resolved',
      confirmationMode: 'none',
      sameSlotRevisionCandidate: false,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: ''
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
      detail: 'message_received_without_generation_baseline',
      confirmationMode: 'none',
      sameSlotRevisionCandidate: false,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: ''
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
      detail: 'generation_baseline_pending_resolution',
      confirmationMode: 'none',
      sameSlotRevisionCandidate: false,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: ''
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
      detail: 'message_received_trace_mismatch',
      confirmationMode: 'none',
      sameSlotRevisionCandidate: false,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: ''
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
      detail: 'message_received_outside_active_generation',
      confirmationMode: 'none',
      sameSlotRevisionCandidate: false,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: ''
    };
  }

  if (!confirmation.allowed) {
    const sameSlotWaitingForRevision = confirmation.sameSlotRevisionCandidate
      && confirmation.reason === 'same_slot_revision_not_observed';

    return {
      allowed: false,
      baseline,
      eventBelongsToCurrentGeneration: false,
      historicalReplayBlocked: !sameSlotWaitingForRevision,
      historicalReplayReason: sameSlotWaitingForRevision
        ? ''
        : (confirmation.sameSlotRevisionCandidate
          ? 'message_received_same_slot_without_confirmed_revision'
          : 'message_received_not_confirmed_for_generation_slot'),
      reason: sameSlotWaitingForRevision
        ? AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE
        : AUTO_TRIGGER_SKIP_REASONS.HISTORICAL_REPLAY_MESSAGE_RECEIVED,
      detail: sameSlotWaitingForRevision
        ? 'same_slot_revision_not_observed_yet'
        : (confirmation.sameSlotRevisionCandidate
          ? 'message_received_same_slot_without_confirmed_revision'
          : 'message_received_not_confirmed_for_generation_slot'),
      confirmationMode: confirmation.confirmationMode,
      sameSlotRevisionCandidate: confirmation.sameSlotRevisionCandidate,
      sameSlotRevisionConfirmed: false,
      sameSlotRevisionSource: confirmation.sameSlotRevisionSource,
      sameSlotRevisionAction: confirmation.sameSlotRevisionAction,
      baselineAssistantContentFingerprint: confirmation.baselineAssistantContentFingerprint,
      confirmedAssistantContentFingerprint: confirmation.confirmedAssistantContentFingerprint,
      baselineAssistantSwipeId: confirmation.baselineAssistantSwipeId,
      confirmedAssistantSwipeId: confirmation.confirmedAssistantSwipeId,
      baselineAssistantSwipeCount: confirmation.baselineAssistantSwipeCount,
      confirmedAssistantSwipeCount: confirmation.confirmedAssistantSwipeCount
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
    messageEntry,
    confirmationMode: confirmation.confirmationMode,
    sameSlotRevisionCandidate: confirmation.sameSlotRevisionCandidate,
    sameSlotRevisionConfirmed: confirmation.sameSlotRevisionConfirmed,
    sameSlotRevisionSource: confirmation.sameSlotRevisionSource,
    sameSlotRevisionAction: confirmation.sameSlotRevisionAction,
    baselineAssistantContentFingerprint: confirmation.baselineAssistantContentFingerprint,
    confirmedAssistantContentFingerprint: confirmation.confirmedAssistantContentFingerprint,
    baselineAssistantSwipeId: confirmation.baselineAssistantSwipeId,
    confirmedAssistantSwipeId: confirmation.confirmedAssistantSwipeId,
    baselineAssistantSwipeCount: confirmation.baselineAssistantSwipeCount,
    confirmedAssistantSwipeCount: confirmation.confirmedAssistantSwipeCount
  };
}

function isAssistantMessageConfirmedForCurrentGeneration(message, baseline) {
  if (!message || message.role !== 'assistant' || !isMeaningfulAssistantContent(message.content)) {
    return false;
  }

  if (!baseline) {
    return true;
  }

  const messageId = normalizeMessageIdentityValue(message.sourceId);
  const baselineMessageId = normalizeMessageIdentityValue(baseline.lastAssistantMessageId);

  if (messageId) {
    return !baselineMessageId || messageId !== baselineMessageId;
  }

  return false;
}

async function resolveConfirmedAssistantMessage(preferredMessageId = '', options = {}) {
  const {
    allowSameSlotRevision = false,
    requireObservedSameSlotRevision = true,
    forceSameSlotRevision = false,
    forcedSameSlotSource = ''
  } = options;
  const normalizedPreferredMessageId = normalizeMessageIdentityValue(preferredMessageId);
  const api = getSillyTavernAPI();
  const context = api?.getContext?.() || null;
  const currentChatId = resolveStableChatId(api, context, null);
  const rawMessages = await getRawChatMessages();
  const normalizedMessages = normalizeChatMessages(rawMessages);
  const baseline = triggerState.gateState.lastGenerationBaseline?.chatId === currentChatId
    ? triggerState.gateState.lastGenerationBaseline
    : null;

  if (!normalizedPreferredMessageId) {
    return null;
  }

  const matched = normalizedMessages.find((message) => {
    const sourceId = normalizeMessageIdentityValue(message.sourceId);
    return sourceId === normalizedPreferredMessageId
      || String(message.chatIndex) === normalizedPreferredMessageId;
  });

  if (!matched) {
    return null;
  }

  const confirmation = evaluateAssistantMessageConfirmation(matched, baseline, {
    allowSameSlotRevision,
    requireObservedSameSlotRevision,
    forceSameSlotRevision: allowSameSlotRevision && (forceSameSlotRevision || Boolean(normalizedPreferredMessageId)),
    forcedSameSlotSource: forcedSameSlotSource || (normalizedPreferredMessageId ? 'message_id_bound_in_place' : '')
  });

  return confirmation.allowed
    ? {
        ...matched,
        confirmationMode: confirmation.confirmationMode,
        sameSlotRevisionCandidate: confirmation.sameSlotRevisionCandidate,
        sameSlotRevisionConfirmed: confirmation.sameSlotRevisionConfirmed,
        sameSlotRevisionSource: confirmation.sameSlotRevisionSource,
        sameSlotRevisionAction: confirmation.sameSlotRevisionAction,
        baselineAssistantContentFingerprint: confirmation.baselineAssistantContentFingerprint,
        confirmedAssistantContentFingerprint: confirmation.confirmedAssistantContentFingerprint,
        baselineAssistantSwipeId: confirmation.baselineAssistantSwipeId,
        confirmedAssistantSwipeId: confirmation.confirmedAssistantSwipeId,
        baselineAssistantSwipeCount: confirmation.baselineAssistantSwipeCount,
        confirmedAssistantSwipeCount: confirmation.confirmedAssistantSwipeCount
      }
    : null;
}

async function getConfirmedAssistantMessageWithRetries(preferredMessageId = '', options = {}) {
  const {
    retries = 0,
    retryDelayMs = 250,
    allowSameSlotRevision = false,
    requireObservedSameSlotRevision = true,
    forceSameSlotRevision = false,
    forcedSameSlotSource = ''
  } = options;

  let confirmedMessage = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    confirmedMessage = await resolveConfirmedAssistantMessage(preferredMessageId, {
      allowSameSlotRevision,
      requireObservedSameSlotRevision,
      forceSameSlotRevision,
      forcedSameSlotSource
    });
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
    rawGenerationType: baseline?.rawGenerationType || triggerState.gateState.lastGenerationType || '',
    rawGenerationParams: baseline?.rawGenerationParams ?? triggerState.gateState.lastGenerationParams ?? null,
    normalizedGenerationType: baseline?.normalizedGenerationType || triggerState.gateState.lastNormalizedGenerationType || '',
    generationAction: baseline?.generationAction || triggerState.gateState.lastGenerationAction || '',
    generationActionSource: baseline?.generationActionSource || triggerState.gateState.lastGenerationActionSource || '',
    explicitGenerationAction: baseline?.explicitGenerationAction || '',
    baselineAssistantContentFingerprint: baseline?.lastAssistantContentFingerprint || '',
    baselineAssistantSwipeId: normalizeMessageIdentityValue(baseline?.lastAssistantSwipeId),
    baselineAssistantSwipeCount: Number.isFinite(baseline?.lastAssistantSwipeCount)
      ? Math.max(0, Number(baseline.lastAssistantSwipeCount))
      : 0,
    lastUserIntentSource: triggerState.gateState.lastUserIntentSource || ''
  };
}

function getCurrentTransactionFrozenGenerationFields() {
  const baseline = triggerState.gateState.lastGenerationBaseline;

  return {
    frozenGenerationTraceId: triggerState.gateState.lastGenerationTraceId || '',
    frozenGenerationStartedAt: baseline?.startedAt || 0,
    frozenBaselineResolvedAtCreation: baseline?.baselineResolved ?? false,
    frozenBaselineResolutionAtCreation: baseline?.baselineResolutionAt || 0,
    frozenProvisionalBaselineAtCreation: !!baseline?.provisional,
    frozenGenerationStartedByUserIntent: !!baseline?.startedByUserIntent,
    frozenGenerationUserIntentSource: baseline?.userIntentSource || '',
    frozenGenerationUserIntentDetail: baseline?.userIntentDetail || '',
    frozenGenerationActionAtCreation: baseline?.generationAction || triggerState.gateState.lastGenerationAction || '',
    frozenGenerationActionSourceAtCreation: baseline?.generationActionSource || triggerState.gateState.lastGenerationActionSource || '',
    frozenExplicitGenerationActionAtCreation: baseline?.explicitGenerationAction || '',
    frozenNormalizedGenerationTypeAtCreation: baseline?.normalizedGenerationType || triggerState.gateState.lastNormalizedGenerationType || '',
    frozenRawGenerationTypeAtCreation: baseline?.rawGenerationType || triggerState.gateState.lastGenerationType || '',
    frozenLastUserIntentSourceAtCreation: triggerState.gateState.lastUserIntentSource || '',
    frozenGenerationCapturedAt: Date.now()
  };
}

async function loadToolExecutorCompatibilityModule() {
  if (!toolExecutorCompatibilityModulePromise) {
    toolExecutorCompatibilityModulePromise = import('./tool-executor.js')
      .catch((error) => {
        toolExecutorCompatibilityModulePromise = null;
        throw error;
      });
  }

  return toolExecutorCompatibilityModulePromise;
}

function createEventDebugSnapshot(snapshot = {}) {
  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();

  return {
    stage: '',
    eventType: '',
    traceId: '',
    transactionKey: '',
    messageId: '',
    messageKey: '',
    executionKey: '',
    slotBindingKey: '',
    slotRevisionKey: '',
    slotTransactionId: '',
    messageRole: '',
    reason: '',
    skipReasonDetailed: '',
    confirmedAssistantMessageId: '',
    sourceMessageId: '',
    confirmationMode: '',
    generationMessageBindingSource: '',
    sourceSwipeId: '',
    confirmedAssistantSwipeId: '',
    effectiveSwipeId: '',
    sameSlotRevisionCandidate: false,
    sameSlotRevisionConfirmed: false,
    sameSlotRevisionSource: '',
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
    isSpeculativeTransaction: false,
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
    transactionKey: '',
    messageId: '',
    messageKey: '',
    executionKey: '',
    slotBindingKey: '',
    slotRevisionKey: '',
    slotTransactionId: '',
    confirmationMode: '',
    generationMessageBindingSource: '',
    sourceMessageId: '',
    sourceSwipeId: '',
    confirmedAssistantSwipeId: '',
    effectiveSwipeId: '',
    sameSlotRevisionCandidate: false,
    sameSlotRevisionConfirmed: false,
    sameSlotRevisionSource: '',
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
      lastExecutionKey: '',
      lastContentCommitted: false,
      lastHostCommitApplied: false,
      lastRefreshRequested: false,
      lastRefreshConfirmed: false,
      lastPreferredCommitMethod: '',
      lastAppliedCommitMethod: '',
      lastRefreshMethodCount: 0,
      lastRefreshMethods: [],
      lastRefreshConfirmChecks: 0,
      lastRefreshConfirmedBy: '',
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
    lastNormalizedGenerationType: '',
    lastGenerationAction: '',
    lastGenerationActionSource: '',
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
  activeTransactions: new Map(),
  handledExecutionKeys: new Map(),
  writebackGuards: new Map(),
  recentTransactionHistory: [],
  recentEventTimeline: [],
  lastExecutionContext: null,
  lastHandledMessageKey: '',
  lastHandledExecutionKey: '',
  lastHandledSlotRevisionKey: '',
  pendingTransactionTimers: new Map(),
  lastAutoTriggerSnapshot: null,
  lastEventDebugSnapshot: null,
  lastDuplicateMessageKey: '',
  lastDuplicateExecutionKey: '',
  lastDuplicateMessageAt: 0,
  internalSubscriptions: []
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

function resolveCurrentChatIdForTransaction() {
  const api = getSillyTavernAPI();
  const context = api?.getContext?.() || null;
  return resolveStableChatId(api, context, null);
}

function buildTransactionStateKey(chatId, messageId, eventType = '', generationTraceId = '', slotRevisionKey = '') {
  const resolvedChatId = chatId || resolveCurrentChatIdForTransaction();
  const normalizedSlotRevisionKey = String(slotRevisionKey || '').trim();
  if (normalizedSlotRevisionKey) {
    return `slot::${normalizedSlotRevisionKey}`;
  }

  const normalizedMessageId = normalizeMessageIdentityValue(messageId);
  const normalizedGenerationTraceId = String(generationTraceId || '').trim();

  if (normalizedMessageId) {
    return [
      resolvedChatId,
      normalizedMessageId,
      normalizedGenerationTraceId || 'trace:pending',
      'slot_revision:pending'
    ].join('::');
  }

  return [
    resolvedChatId,
    normalizedGenerationTraceId || `event:${eventType || 'unknown'}:trace_pending`,
    'message:no_message',
    'slot_revision:pending'
  ].join('::');
}

function buildResolvedTransactionKey(chatId, messageId, eventType = '', generationTraceId = '', slotRevisionKey = '') {
  return buildTransactionStateKey(chatId, messageId, eventType, generationTraceId, slotRevisionKey);
}

function getAutoTriggerExecutionKey(context = {}) {
  const explicitSlotRevisionKey = String(context?.slotRevisionKey || '').trim();
  if (explicitSlotRevisionKey) {
    return explicitSlotRevisionKey;
  }

  return buildSlotRevisionKey({
    chatId: context?.chatId,
    messageId: context?.messageId,
    effectiveSwipeId: context?.effectiveSwipeId
      || context?.confirmedAssistantSwipeId
      || context?.lastAiMessageSwipeId,
    assistantContentFingerprint: context?.assistantContentFingerprint
      || buildAssistantContentFingerprint(context?.lastAiMessage || context?.input?.lastAiMessage || '')
  });
}

function buildTransactionKey({
  chatId = '',
  messageId = '',
  eventType = '',
  generationTraceId = '',
  slotRevisionKey = '',
  executionKey = ''
} = {}) {
  const normalizedExecutionKey = String(executionKey || slotRevisionKey || '').trim();
  if (normalizedExecutionKey) {
    return `txn::${normalizedExecutionKey}`;
  }

  return buildTransactionStateKey(chatId, messageId, eventType, generationTraceId, slotRevisionKey);
}

function resolveTransactionIdentity(eventType, data, snapshot = {}) {
  const messageId = normalizeMessageIdentityValue(snapshot?.messageId || extractEventMessageId(data, eventType));
  const chatId = snapshot?.chatId || resolveCurrentChatIdForTransaction();
  const generationTraceId = String(snapshot?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '').trim();
  const slotRevisionKey = String(snapshot?.slotRevisionKey || '').trim();
  const executionKey = String(snapshot?.executionKey || slotRevisionKey || '').trim();
  const transactionKey = snapshot?.transactionKey || buildTransactionKey({
    chatId,
    messageId,
    eventType,
    generationTraceId,
    slotRevisionKey,
    executionKey
  });

  return {
    messageId,
    chatId,
    generationTraceId,
    slotRevisionKey,
    executionKey,
    transactionKey,
    transactionId: String(snapshot?.slotTransactionId || '').trim()
  };
}

function buildTransactionDiagnostics(activeTransactions = [], recentTransactionHistory = []) {
  const normalizedActiveTransactions = Array.isArray(activeTransactions)
    ? activeTransactions.map(cloneDiagnosticEntryForOutput).filter(Boolean)
    : [];
  const normalizedRecentTransactionHistory = Array.isArray(recentTransactionHistory)
    ? recentTransactionHistory.map(cloneDiagnosticEntryForOutput).filter(Boolean)
    : [];

  return {
    activeTransactionCount: toolTriggerManagerState.activeTransactions.size,
    activeTransactions: normalizedActiveTransactions,
    recentTransactionHistory: normalizedRecentTransactionHistory,
    lastHandledExecutionKey: toolTriggerManagerState.lastHandledExecutionKey || '',
    lastHandledSlotRevisionKey: toolTriggerManagerState.lastHandledSlotRevisionKey || '',
    handledExecutionKeyCount: toolTriggerManagerState.handledExecutionKeys.size,
    pendingTransactionCount: toolTriggerManagerState.pendingTransactionTimers.size,
    lastExecutionContext: cloneDiagnosticEntryForOutput(toolTriggerManagerState.lastExecutionContext),
    lastEventDebugSnapshot: cloneDiagnosticEntryForOutput(toolTriggerManagerState.lastEventDebugSnapshot),
    lastAutoTriggerSnapshot: cloneDiagnosticEntryForOutput(toolTriggerManagerState.lastAutoTriggerSnapshot),
    recentHandledExecutionKeys: getRecentHandledExecutionKeys(8)
  };
}

function createTransactionRecord(eventType, data, snapshot = {}) {
  const identity = resolveTransactionIdentity(eventType, data, snapshot);
  const messageId = identity.messageId;
  const chatId = identity.chatId;
  const generationTraceId = identity.generationTraceId;
  const transactionKey = identity.transactionKey;
  const now = Date.now();
  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();
  const frozenGenerationFields = getCurrentTransactionFrozenGenerationFields();

  return {
    transactionKey,
    transactionId: snapshot?.transactionId || identity.transactionId || snapshot?.slotTransactionId || '',
    traceId: snapshot?.traceId || createTraceId('txn'),
    chatId,
    messageId,
    messageKey: snapshot?.messageKey || '',
    executionKey: snapshot?.executionKey || identity.executionKey || identity.slotRevisionKey || '',
    slotBindingKey: snapshot?.slotBindingKey || '',
    slotRevisionKey: snapshot?.slotRevisionKey || identity.slotRevisionKey || '',
    slotTransactionId: snapshot?.slotTransactionId || identity.transactionId || '',
    messageRole: snapshot?.messageRole || '',
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    sourceMessageId: snapshot?.sourceMessageId || '',
    confirmationSource: snapshot?.confirmationSource || '',
    confirmationMode: snapshot?.confirmationMode || '',
    sourceSwipeId: snapshot?.sourceSwipeId || '',
    sameSlotRevisionCandidate: !!snapshot?.sameSlotRevisionCandidate,
    sameSlotRevisionConfirmed: !!snapshot?.sameSlotRevisionConfirmed,
    sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || '',
    isSpeculativeTransaction: !!snapshot?.isSpeculativeTransaction,
    eventBelongsToCurrentGeneration: !!snapshot?.eventBelongsToCurrentGeneration,
    historicalReplayBlocked: !!snapshot?.historicalReplayBlocked,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    skipReasonDetailed: snapshot?.skipReasonDetailed || '',
    firstEventType: snapshot?.eventType || eventType || '',
    receivedEvents: eventType ? [eventType] : [],
    phase: snapshot?.phase || TRANSACTION_PHASES.RECEIVED,
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
    generationAction: snapshot?.generationAction || generationDiagnosticFields.generationAction,
    generationActionSource: snapshot?.generationActionSource || generationDiagnosticFields.generationActionSource,
    explicitGenerationAction: snapshot?.explicitGenerationAction || generationDiagnosticFields.explicitGenerationAction,
    lastUserIntentSource: snapshot?.lastUserIntentSource || generationDiagnosticFields.lastUserIntentSource,
    frozenGenerationTraceId: snapshot?.frozenGenerationTraceId || frozenGenerationFields.frozenGenerationTraceId,
    frozenGenerationStartedAt: snapshot?.frozenGenerationStartedAt ?? frozenGenerationFields.frozenGenerationStartedAt,
    frozenBaselineResolvedAtCreation: snapshot?.frozenBaselineResolvedAtCreation ?? frozenGenerationFields.frozenBaselineResolvedAtCreation,
    frozenBaselineResolutionAtCreation: snapshot?.frozenBaselineResolutionAtCreation ?? frozenGenerationFields.frozenBaselineResolutionAtCreation,
    frozenProvisionalBaselineAtCreation: snapshot?.frozenProvisionalBaselineAtCreation ?? frozenGenerationFields.frozenProvisionalBaselineAtCreation,
    frozenGenerationStartedByUserIntent: snapshot?.frozenGenerationStartedByUserIntent ?? frozenGenerationFields.frozenGenerationStartedByUserIntent,
    frozenGenerationUserIntentSource: snapshot?.frozenGenerationUserIntentSource || frozenGenerationFields.frozenGenerationUserIntentSource,
    frozenGenerationUserIntentDetail: snapshot?.frozenGenerationUserIntentDetail || frozenGenerationFields.frozenGenerationUserIntentDetail,
    frozenGenerationActionAtCreation: snapshot?.frozenGenerationActionAtCreation || frozenGenerationFields.frozenGenerationActionAtCreation,
    frozenGenerationActionSourceAtCreation: snapshot?.frozenGenerationActionSourceAtCreation || frozenGenerationFields.frozenGenerationActionSourceAtCreation,
    frozenExplicitGenerationActionAtCreation: snapshot?.frozenExplicitGenerationActionAtCreation || frozenGenerationFields.frozenExplicitGenerationActionAtCreation,
    frozenNormalizedGenerationTypeAtCreation: snapshot?.frozenNormalizedGenerationTypeAtCreation || frozenGenerationFields.frozenNormalizedGenerationTypeAtCreation,
    frozenRawGenerationTypeAtCreation: snapshot?.frozenRawGenerationTypeAtCreation || frozenGenerationFields.frozenRawGenerationTypeAtCreation,
    frozenLastUserIntentSourceAtCreation: snapshot?.frozenLastUserIntentSourceAtCreation || frozenGenerationFields.frozenLastUserIntentSourceAtCreation,
    frozenGenerationCapturedAt: snapshot?.frozenGenerationCapturedAt ?? frozenGenerationFields.frozenGenerationCapturedAt,
    createdAt: now,
    updatedAt: now
  };
}

function pruneExpiredTransactions(now = Date.now()) {

  const identity = resolveTransactionIdentity(eventType, data, snapshot);
  const provisionalMessageId = identity.messageId;
  const chatId = identity.chatId;
  const generationTraceId = identity.generationTraceId;
  const transactionKey = identity.transactionKey;
  let transaction = toolTriggerManagerState.activeTransactions.get(transactionKey);

  if (!transaction && identity.executionKey) {
    transaction = Array.from(toolTriggerManagerState.activeTransactions.values()).find((entry) => entry?.executionKey === identity.executionKey) || null;
    if (transaction && transaction.transactionKey !== transactionKey) {
      rekeyTransactionRecord(transaction, transactionKey);
    }
  }

  if (!transaction && provisionalMessageId) {
    transaction = Array.from(toolTriggerManagerState.activeTransactions.values()).find((entry) => {
      if (!entry) return false;
      if (entry.chatId !== chatId) return false;
      if (normalizeMessageIdentityValue(entry.messageId) !== provisionalMessageId) return false;
      if (generationTraceId && entry.frozenGenerationTraceId && entry.frozenGenerationTraceId !== generationTraceId) {
        return false;
      }
      return true;
    }) || null;
    if (transaction && transaction.transactionKey !== transactionKey) {
      rekeyTransactionRecord(transaction, transactionKey);
    }
  }

  if (!transaction) {
    transaction = createTransactionRecord(eventType, data, {
      ...snapshot,
      chatId,
      generationTraceId,
      transactionKey,
      messageId: provisionalMessageId,
      executionKey: snapshot?.executionKey || identity.executionKey || identity.slotRevisionKey || '',
      slotRevisionKey: snapshot?.slotRevisionKey || identity.slotRevisionKey || ''
    });
    toolTriggerManagerState.activeTransactions.set(transactionKey, transaction);
    return transaction;
  }

  if (eventType && !transaction.receivedEvents.includes(eventType)) {
    transaction.receivedEvents.push(eventType);
  }

  if (provisionalMessageId && !transaction.messageId) {
    transaction.messageId = provisionalMessageId;
    transaction.sourceMessageLocked = true;
  }

  if (snapshot?.messageRole) {
    transaction.messageRole = snapshot.messageRole;
  }

  if (identity.executionKey) {
    transaction.executionKey = identity.executionKey;
  }

  if (snapshot?.slotBindingKey) {
    transaction.slotBindingKey = snapshot.slotBindingKey;
  }

  if (snapshot?.slotRevisionKey || identity.slotRevisionKey) {
    transaction.slotRevisionKey = snapshot?.slotRevisionKey || identity.slotRevisionKey;
  }

  if (snapshot?.slotTransactionId || identity.transactionId) {
    transaction.slotTransactionId = snapshot?.slotTransactionId || identity.transactionId;
    transaction.transactionId = snapshot?.transactionId || snapshot?.slotTransactionId || identity.transactionId;
  }

  if (snapshot?.confirmedAssistantMessageId) {
    transaction.confirmedAssistantMessageId = snapshot.confirmedAssistantMessageId;
  }

  if (snapshot?.sourceMessageId) {
    transaction.sourceMessageId = snapshot.sourceMessageId;
  }

  if (snapshot?.sourceSwipeId) {
    transaction.sourceSwipeId = snapshot.sourceSwipeId;
  }

  if (snapshot?.confirmationSource) {
    transaction.confirmationSource = snapshot.confirmationSource;
  }

  if (snapshot?.confirmationMode) {
    transaction.confirmationMode = snapshot.confirmationMode;
  }

  if (snapshot?.sameSlotRevisionCandidate !== undefined) {
    transaction.sameSlotRevisionCandidate = !!snapshot.sameSlotRevisionCandidate;
  }

  if (snapshot?.sameSlotRevisionConfirmed !== undefined) {
    transaction.sameSlotRevisionConfirmed = !!snapshot.sameSlotRevisionConfirmed;
  }

  if (snapshot?.sameSlotRevisionSource) {
    transaction.sameSlotRevisionSource = snapshot.sameSlotRevisionSource;
  }

  if (snapshot?.skipReasonDetailed) {
    transaction.skipReasonDetailed = snapshot.skipReasonDetailed;
  }

  if (snapshot?.eventBelongsToCurrentGeneration !== undefined) {
    transaction.eventBelongsToCurrentGeneration = !!snapshot.eventBelongsToCurrentGeneration;
  }

  if (snapshot?.historicalReplayBlocked !== undefined) {
    transaction.historicalReplayBlocked = !!snapshot.historicalReplayBlocked;
  }

  if (snapshot?.historicalReplayReason) {
    transaction.historicalReplayReason = snapshot.historicalReplayReason;
  }

  if (snapshot?.isSpeculativeTransaction !== undefined) {
    transaction.isSpeculativeTransaction = !!snapshot.isSpeculativeTransaction;
  }

  return updateTransactionRecord(transaction, {});
}

function updateTransactionRecord(transaction, partial = {}) {
  if (!transaction) return null;

  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();

  Object.assign(transaction, generationDiagnosticFields, partial, {
    updatedAt: Date.now()
  });

  transaction.transactionId = transaction.transactionId || transaction.slotTransactionId || '';
  transaction.executionKey = String(transaction.executionKey || transaction.slotRevisionKey || '').trim();

  return transaction;
}

function rekeyTransactionRecord(transaction, nextTransactionKey) {
  if (!transaction || !nextTransactionKey || transaction.transactionKey === nextTransactionKey) {
    return transaction;
  }

  toolTriggerManagerState.activeTransactions.delete(transaction.transactionKey);
  transaction.transactionKey = nextTransactionKey;
  transaction.updatedAt = Date.now();
  toolTriggerManagerState.activeTransactions.set(nextTransactionKey, transaction);
  return transaction;
}

function appendTransactionHistory(transaction, historyPartial = {}) {
  if (!transaction) return null;

  const { historyRetentionLimit } = getResolvedListenerSettings();
  const generationDiagnosticFields = getCurrentGenerationDiagnosticFields();
  const entry = {
    id: historyPartial?.id || createTraceId('txn_hist'),
    at: historyPartial?.at || Date.now(),
    traceId: transaction.traceId,
    transactionKey: historyPartial?.transactionKey || transaction.transactionKey,
    transactionId: historyPartial?.transactionId || transaction.transactionId || transaction.slotTransactionId || '',
    phase: historyPartial?.phase || transaction.phase,
    eventType: historyPartial?.eventType || transaction.firstEventType,
    messageId: historyPartial?.messageId || transaction.messageId,
    messageKey: historyPartial?.messageKey || transaction.messageKey,
    executionKey: historyPartial?.executionKey || transaction.executionKey || '',
    slotBindingKey: historyPartial?.slotBindingKey || transaction.slotBindingKey || '',
    slotRevisionKey: historyPartial?.slotRevisionKey || transaction.slotRevisionKey || '',
    slotTransactionId: historyPartial?.slotTransactionId || transaction.slotTransactionId || '',
    messageRole: historyPartial?.messageRole || transaction.messageRole,
    confirmedAssistantMessageId: historyPartial?.confirmedAssistantMessageId || transaction.confirmedAssistantMessageId || '',
    sourceMessageId: historyPartial?.sourceMessageId || transaction.sourceMessageId || '',
    confirmationSource: historyPartial?.confirmationSource || transaction.confirmationSource || '',
    confirmationMode: historyPartial?.confirmationMode || transaction.confirmationMode || '',
    sourceSwipeId: historyPartial?.sourceSwipeId || transaction.sourceSwipeId || '',
    sameSlotRevisionCandidate: historyPartial?.sameSlotRevisionCandidate ?? transaction.sameSlotRevisionCandidate ?? false,
    sameSlotRevisionConfirmed: historyPartial?.sameSlotRevisionConfirmed ?? transaction.sameSlotRevisionConfirmed ?? false,
    sameSlotRevisionSource: historyPartial?.sameSlotRevisionSource || transaction.sameSlotRevisionSource || '',
    isSpeculativeTransaction: historyPartial?.isSpeculativeTransaction ?? transaction.isSpeculativeTransaction ?? false,
    eventBelongsToCurrentGeneration: historyPartial?.eventBelongsToCurrentGeneration ?? transaction.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: historyPartial?.historicalReplayBlocked ?? transaction.historicalReplayBlocked ?? false,
    historicalReplayReason: historyPartial?.historicalReplayReason || transaction.historicalReplayReason || '',
    generationTraceId: historyPartial?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '',
    generationStartedAt: historyPartial?.generationStartedAt || triggerState.gateState.lastGenerationBaseline?.startedAt || 0,
    generationDryRun: historyPartial?.generationDryRun ?? !!triggerState.gateState.lastGenerationDryRun,
    baselineResolved: historyPartial?.baselineResolved ?? transaction.baselineResolved ?? generationDiagnosticFields.baselineResolved,
    baselineResolutionAt: historyPartial?.baselineResolutionAt ?? transaction.baselineResolutionAt ?? generationDiagnosticFields.baselineResolutionAt,
    provisionalBaseline: historyPartial?.provisionalBaseline ?? transaction.provisionalBaseline ?? generationDiagnosticFields.provisionalBaseline,
    generationStartedByUserIntent: historyPartial?.generationStartedByUserIntent ?? transaction.generationStartedByUserIntent ?? generationDiagnosticFields.generationStartedByUserIntent,
    generationUserIntentSource: historyPartial?.generationUserIntentSource || transaction.generationUserIntentSource || generationDiagnosticFields.generationUserIntentSource,
    generationUserIntentDetail: historyPartial?.generationUserIntentDetail || transaction.generationUserIntentDetail || generationDiagnosticFields.generationUserIntentDetail,
    generationAction: historyPartial?.generationAction || transaction.generationAction || generationDiagnosticFields.generationAction,
    generationActionSource: historyPartial?.generationActionSource || transaction.generationActionSource || generationDiagnosticFields.generationActionSource,
    explicitGenerationAction: historyPartial?.explicitGenerationAction || transaction.explicitGenerationAction || generationDiagnosticFields.explicitGenerationAction,
    lastUserIntentSource: historyPartial?.lastUserIntentSource || transaction.lastUserIntentSource || generationDiagnosticFields.lastUserIntentSource,
    frozenGenerationTraceId: historyPartial?.frozenGenerationTraceId || transaction.frozenGenerationTraceId || '',
    frozenGenerationStartedAt: historyPartial?.frozenGenerationStartedAt ?? transaction.frozenGenerationStartedAt ?? 0,
    frozenBaselineResolvedAtCreation: historyPartial?.frozenBaselineResolvedAtCreation ?? transaction.frozenBaselineResolvedAtCreation ?? false,
    frozenBaselineResolutionAtCreation: historyPartial?.frozenBaselineResolutionAtCreation ?? transaction.frozenBaselineResolutionAtCreation ?? 0,
    frozenProvisionalBaselineAtCreation: historyPartial?.frozenProvisionalBaselineAtCreation ?? transaction.frozenProvisionalBaselineAtCreation ?? false,
    frozenGenerationStartedByUserIntent: historyPartial?.frozenGenerationStartedByUserIntent ?? transaction.frozenGenerationStartedByUserIntent ?? false,
    frozenGenerationUserIntentSource: historyPartial?.frozenGenerationUserIntentSource || transaction.frozenGenerationUserIntentSource || '',
    frozenGenerationUserIntentDetail: historyPartial?.frozenGenerationUserIntentDetail || transaction.frozenGenerationUserIntentDetail || '',
    frozenGenerationActionAtCreation: historyPartial?.frozenGenerationActionAtCreation || transaction.frozenGenerationActionAtCreation || '',
    frozenGenerationActionSourceAtCreation: historyPartial?.frozenGenerationActionSourceAtCreation || transaction.frozenGenerationActionSourceAtCreation || '',
    frozenExplicitGenerationActionAtCreation: historyPartial?.frozenExplicitGenerationActionAtCreation || transaction.frozenExplicitGenerationActionAtCreation || '',
    frozenNormalizedGenerationTypeAtCreation: historyPartial?.frozenNormalizedGenerationTypeAtCreation || transaction.frozenNormalizedGenerationTypeAtCreation || '',
    frozenRawGenerationTypeAtCreation: historyPartial?.frozenRawGenerationTypeAtCreation || transaction.frozenRawGenerationTypeAtCreation || '',
    frozenLastUserIntentSourceAtCreation: historyPartial?.frozenLastUserIntentSourceAtCreation || transaction.frozenLastUserIntentSourceAtCreation || '',
    frozenGenerationCapturedAt: historyPartial?.frozenGenerationCapturedAt ?? transaction.frozenGenerationCapturedAt ?? Date.now(),
    skipReason: historyPartial?.skipReason || transaction.skipReason || '',
    skipReasonDetailed: historyPartial?.skipReasonDetailed || transaction.skipReasonDetailed || '',
    candidateToolIds: Array.isArray(historyPartial?.candidateToolIds)
      ? [...historyPartial.candidateToolIds]
      : [...(transaction.candidateToolIds || [])],
    executionPathIds: Array.isArray(historyPartial?.executionPathIds)
      ? [...historyPartial.executionPathIds]
      : [...(transaction.executionPathIds || [])]
  };

  toolTriggerManagerState.recentTransactionHistory = trimManagerHistoryEntries([
    ...toolTriggerManagerState.recentTransactionHistory,
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
      generationActionDrifted: false,
      generationUserIntentDrifted: false,
      baselineResolvedStateChanged: false,
      baselineResolutionAdvancedSinceTransactionCreation: false,
      driftReasons: []
    };
  }

  const hasFrozenGenerationFields = entry.frozenGenerationCapturedAt !== undefined
    || entry.frozenGenerationTraceId !== undefined
    || entry.frozenBaselineResolvedAtCreation !== undefined
    || entry.frozenGenerationStartedByUserIntent !== undefined
    || entry.frozenGenerationUserIntentSource !== undefined
    || entry.frozenGenerationUserIntentDetail !== undefined;

  if (!hasFrozenGenerationFields) {
    return {
      driftDetected: false,
      generationTraceDrifted: false,
      generationActionDrifted: false,
      generationUserIntentDrifted: false,
      baselineResolvedStateChanged: false,
      baselineResolutionAdvancedSinceTransactionCreation: false,
      driftReasons: []
    };
  }

  const frozenGenerationTraceId = normalizeDiagnosticString(entry.frozenGenerationTraceId);
  const generationTraceId = normalizeDiagnosticString(entry.generationTraceId);
  const frozenGenerationUserIntentSource = normalizeDiagnosticString(entry.frozenGenerationUserIntentSource);
  const generationUserIntentSource = normalizeDiagnosticString(entry.generationUserIntentSource);
  const frozenGenerationUserIntentDetail = normalizeDiagnosticString(entry.frozenGenerationUserIntentDetail);
  const generationUserIntentDetail = normalizeDiagnosticString(entry.generationUserIntentDetail);
  const frozenGenerationAction = normalizeDiagnosticString(entry.frozenGenerationActionAtCreation);
  const generationAction = normalizeDiagnosticString(entry.generationAction);
  const frozenGenerationActionSource = normalizeDiagnosticString(entry.frozenGenerationActionSourceAtCreation);
  const generationActionSource = normalizeDiagnosticString(entry.generationActionSource);
  const frozenExplicitGenerationAction = normalizeDiagnosticString(entry.frozenExplicitGenerationActionAtCreation);
  const explicitGenerationAction = normalizeDiagnosticString(entry.explicitGenerationAction);
  const frozenNormalizedGenerationType = normalizeDiagnosticString(entry.frozenNormalizedGenerationTypeAtCreation);
  const normalizedGenerationType = normalizeDiagnosticString(entry.normalizedGenerationType);

  const generationTraceDrifted = !!frozenGenerationTraceId
    && !!generationTraceId
    && frozenGenerationTraceId !== generationTraceId;

  const generationActionDrifted = ((frozenGenerationAction || generationAction)
    ? frozenGenerationAction !== generationAction
    : false)
    || ((frozenGenerationActionSource || generationActionSource)
      ? frozenGenerationActionSource !== generationActionSource
      : false)
    || ((frozenExplicitGenerationAction || explicitGenerationAction)
      ? frozenExplicitGenerationAction !== explicitGenerationAction
      : false)
    || ((frozenNormalizedGenerationType || normalizedGenerationType)
      ? frozenNormalizedGenerationType !== normalizedGenerationType
      : false);

  const generationUserIntentDrifted = Boolean(entry.frozenGenerationStartedByUserIntent) !== Boolean(entry.generationStartedByUserIntent)
    || ((frozenGenerationUserIntentSource || generationUserIntentSource)
      ? frozenGenerationUserIntentSource !== generationUserIntentSource
      : false)
    || ((frozenGenerationUserIntentDetail || generationUserIntentDetail)
      ? frozenGenerationUserIntentDetail !== generationUserIntentDetail
      : false);

  const baselineResolvedStateChanged = Boolean(entry.frozenBaselineResolvedAtCreation) !== Boolean(entry.baselineResolved);
  const baselineResolutionAdvancedSinceTransactionCreation = (Number(entry.baselineResolutionAt) || 0)
    > (Number(entry.frozenBaselineResolutionAtCreation) || 0);

  const driftReasons = [];

  if (generationTraceDrifted) {
    driftReasons.push('generation_trace_changed');
  }

  if (generationActionDrifted) {
    driftReasons.push('generation_action_changed');
  }

  if (generationUserIntentDrifted) {
    driftReasons.push('generation_user_intent_changed');
  }

  if (baselineResolvedStateChanged) {
    driftReasons.push('baseline_resolved_state_changed');
  }

  if (baselineResolutionAdvancedSinceTransactionCreation) {
    driftReasons.push('baseline_resolution_advanced');
  }

  return {
    driftDetected: driftReasons.length > 0,
    generationTraceDrifted,
    generationActionDrifted,
    generationUserIntentDrifted,
    baselineResolvedStateChanged,
    baselineResolutionAdvancedSinceTransactionCreation,
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
    generationActionDriftCount: 0,
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

    if (driftFlags.generationActionDrifted) {
      summary.generationActionDriftCount += 1;
    }

    if (driftFlags.generationUserIntentDrifted) {
      summary.generationUserIntentDriftCount += 1;
    }

    if (driftFlags.baselineResolvedStateChanged) {
      summary.baselineResolvedStateChangedCount += 1;
    }

    if (driftFlags.baselineResolutionAdvancedSinceTransactionCreation) {
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
    transactionKey: partial?.transactionKey || '',
    messageId: normalizeMessageIdentityValue(partial?.messageId),
    executionKey: partial?.executionKey || '',
    slotBindingKey: partial?.slotBindingKey || '',
    slotRevisionKey: partial?.slotRevisionKey || '',
    slotTransactionId: partial?.slotTransactionId || '',
    phase: partial?.phase || '',
    reason: partial?.reason || '',
    detail: partial?.detail || '',
    sourceMessageId: normalizeMessageIdentityValue(partial?.sourceMessageId),
    confirmationSource: partial?.confirmationSource || '',
    sourceSwipeId: partial?.sourceSwipeId || '',
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

function buildAutoTriggerVerdictHint(flagged = false, reasons = [], relatedTransactionKeys = []) {
  return {
    flagged: !!flagged,
    reasons: [...new Set((Array.isArray(reasons) ? reasons : []).filter(Boolean))],
    relatedTransactionKeys: [...new Set((Array.isArray(relatedTransactionKeys) ? relatedTransactionKeys : []).filter(Boolean))]
  };
}

function buildAutoTriggerVerdictHints(payload = {}) {
  const summary = payload?.summary || {};
  const entries = [
    ...(Array.isArray(payload?.activeTransactions) ? payload.activeTransactions : []),
    ...(Array.isArray(payload?.recentTransactionHistory) ? payload.recentTransactionHistory : []),
    payload?.lastEventDebugSnapshot,
    payload?.lastAutoTriggerSnapshot
  ].filter(Boolean);

  const a10Reasons = [];
  const a10TransactionKeys = [];
  const a11Reasons = [];
  const a11TransactionKeys = [];
  const a12Reasons = [];
  const a12TransactionKeys = [];
  const a13Reasons = [];
  const a13TransactionKeys = [];

  for (const entry of entries) {
    const reason = String(entry?.reason || entry?.skipReason || '').trim();
    const detail = String(entry?.detail || entry?.skipReasonDetailed || '').trim();
    const transactionKey = String(entry?.transactionKey || '').trim();
    const phase = String(entry?.phase || entry?.stage || '').trim();
    const confirmationSource = String(entry?.confirmationSource || '').trim();
    const generationUserIntentSource = String(entry?.generationUserIntentSource || '').trim();
    const generationStartedByUserIntent = !!entry?.generationStartedByUserIntent;

    if (
      detail === 'missing_generation_baseline'
      || detail === 'generation_baseline_pending_resolution'
    ) {
      a10Reasons.push(detail);
      a10TransactionKeys.push(transactionKey);
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
      a11TransactionKeys.push(transactionKey);
    }

    if (
      reason === AUTO_TRIGGER_SKIP_REASONS.IGNORED_AUTO_TRIGGER
      && (
        generationStartedByUserIntent
        || generationUserIntentSource.startsWith('explicit_generation_action:')
      )
    ) {
      a12Reasons.push(`ignored_auto_trigger_with_${generationUserIntentSource || 'user_intent'}`);
      a12TransactionKeys.push(transactionKey);
    }

    if (
      summary?.listenerSettings?.ignoreAutoTrigger
      && !generationStartedByUserIntent
      && !entry?.isSpeculativeTransaction
      && (
        phase === TRANSACTION_PHASES.COMPLETED
        || phase === TRANSACTION_PHASES.HANDLING
        || phase === TRANSACTION_PHASES.DISPATCHING
        || confirmationSource === 'generation_ended'
        || confirmationSource === 'message_received'
        || confirmationSource === 'generation_after_commands'
      )
    ) {
      a13Reasons.push('non_user_intent_generation_reached_execution_path');
      a13TransactionKeys.push(transactionKey);
    }
  }

  return {
    a10BaselineRaceSuspicious: buildAutoTriggerVerdictHint(a10Reasons.length > 0, a10Reasons, a10TransactionKeys),
    a11ReplaySuspicious: buildAutoTriggerVerdictHint(a11Reasons.length > 0, a11Reasons, a11TransactionKeys),
    a12UserIntentSuspicious: buildAutoTriggerVerdictHint(a12Reasons.length > 0, a12Reasons, a12TransactionKeys),
    a13AutoTriggerLeakSuspicious: buildAutoTriggerVerdictHint(a13Reasons.length > 0, a13Reasons, a13TransactionKeys)
  };
}

function shouldReportDuplicateSkip(messageKey) {
  return shouldReportDuplicateSkipWithExecutionKey(messageKey, messageKey);
}

function shouldReportDuplicateSkipWithExecutionKey(messageKey, executionKey = '') {
  const now = Date.now();
  if (
    toolTriggerManagerState.lastDuplicateExecutionKey === (executionKey || messageKey)
    && (now - toolTriggerManagerState.lastDuplicateMessageAt) < DUPLICATE_SKIP_LOG_WINDOW_MS
  ) {
    return false;
  }

  toolTriggerManagerState.lastDuplicateMessageKey = messageKey;
  toolTriggerManagerState.lastDuplicateExecutionKey = executionKey || messageKey;
  toolTriggerManagerState.lastDuplicateMessageAt = now;
  return true;
}

function pruneHandledExecutionKeys(now = Date.now()) {
  for (const [executionKey, entry] of toolTriggerManagerState.handledExecutionKeys.entries()) {
    const handledAt = Number(entry?.at) || 0;
    if (handledAt <= 0 || (now - handledAt) > AUTO_TRIGGER_HANDLED_EXECUTION_RETENTION_MS) {
      toolTriggerManagerState.handledExecutionKeys.delete(executionKey);
    }
  }
}

function hasHandledExecutionKey(executionKey, now = Date.now()) {
  const normalizedExecutionKey = String(executionKey || '').trim();
  if (!normalizedExecutionKey) {
    return false;
  }

  pruneHandledExecutionKeys(now);
  return toolTriggerManagerState.handledExecutionKeys.has(normalizedExecutionKey);
}

function markHandledExecutionKey(executionKey, partial = {}) {
  const normalizedExecutionKey = String(executionKey || '').trim();
  if (!normalizedExecutionKey) {
    return null;
  }

  const entry = {
    executionKey: normalizedExecutionKey,
    at: Number(partial?.at) || Date.now(),
    messageKey: String(partial?.messageKey || '').trim(),
    messageId: normalizeMessageIdentityValue(partial?.messageId),
    generationTraceId: String(partial?.generationTraceId || '').trim(),
    eventType: String(partial?.eventType || '').trim(),
    transactionKey: String(partial?.transactionKey || '').trim()
  };

  toolTriggerManagerState.handledExecutionKeys.set(normalizedExecutionKey, entry);
  pruneHandledExecutionKeys(entry.at);
  return entry;
}

function getRecentHandledExecutionKeys(limit = 8) {
  pruneHandledExecutionKeys();

  return trimManagerHistoryEntries(
    Array.from(toolTriggerManagerState.handledExecutionKeys.values())
      .sort((left, right) => (Number(left?.at) || 0) - (Number(right?.at) || 0)),
    limit
  ).map((entry) => ({ ...entry }));
}

function buildWritebackGuardKey(chatId = '', messageId = '', swipeId = '') {
  return [
    String(chatId || 'chat_default').trim() || 'chat_default',
    normalizeMessageIdentityValue(messageId) || 'message:unknown',
    normalizeMessageIdentityValue(swipeId) || 'swipe:current'
  ].join('::');
}

function pruneWritebackGuards(now = Date.now()) {
  for (const [guardKey, guard] of toolTriggerManagerState.writebackGuards.entries()) {
    const createdAt = Number(guard?.at) || 0;
    if (createdAt <= 0 || (now - createdAt) > SLOT_WRITEBACK_GUARD_MS) {
      toolTriggerManagerState.writebackGuards.delete(guardKey);
    }
  }
}

function markWritebackGuard(partial = {}) {
  const guardKey = buildWritebackGuardKey(
    partial?.chatId,
    partial?.messageId,
    partial?.effectiveSwipeId || partial?.swipeId
  );

  const entry = {
    guardKey,
    at: Date.now(),
    chatId: String(partial?.chatId || '').trim() || 'chat_default',
    messageId: normalizeMessageIdentityValue(partial?.messageId),
    effectiveSwipeId: normalizeMessageIdentityValue(partial?.effectiveSwipeId || partial?.swipeId),
    traceId: String(partial?.traceId || '').trim(),
    toolId: String(partial?.toolId || '').trim()
  };

  toolTriggerManagerState.writebackGuards.set(guardKey, entry);
  pruneWritebackGuards(entry.at);
  return entry;
}

function hasActiveWritebackGuard(chatId = '', messageId = '', swipeId = '', now = Date.now()) {
  pruneWritebackGuards(now);
  return toolTriggerManagerState.writebackGuards.has(buildWritebackGuardKey(chatId, messageId, swipeId));
}

function getMessageSwipeId(message) {
  return normalizeMessageIdentityValue(
    message?.swipe_id
    ?? message?.swipeId
    ?? message?.swipeID
  );
}

function getMessageSwipeCount(message) {
  return Array.isArray(message?.swipes) && message.swipes.length > 0
    ? message.swipes.length
    : 1;
}

function buildSlotRevisionKey(slot = {}) {
  return [
    String(slot?.chatId || 'chat_default').trim() || 'chat_default',
    normalizeMessageIdentityValue(slot?.messageId) || 'message:unknown',
    normalizeMessageIdentityValue(slot?.effectiveSwipeId || slot?.swipeId) || 'swipe:current',
    String(slot?.assistantContentFingerprint || '').trim() || 'content:na'
  ].join('::');
}

function buildSlotBindingKey(slot = {}) {
  return [
    String(slot?.chatId || 'chat_default').trim() || 'chat_default',
    normalizeMessageIdentityValue(slot?.messageId) || 'message:unknown'
  ].join('::');
}

function buildSlotTransactionId(slot = {}) {
  return [
    buildSlotRevisionKey(slot),
    String(slot?.eventType || 'slot_event').trim() || 'slot_event',
    String(slot?.traceId || slot?.generationTraceId || createTraceId('slot_tx')).trim() || createTraceId('slot_tx')
  ].join('::');
}

function buildSlotExecutionKey(slot = {}) {
  return buildSlotRevisionKey(slot);
}

function hasRecentGenerationActivity(now = Date.now()) {
  if (triggerState.gateState.isGenerating) {
    return true;
  }

  const lastGenerationAt = Number(triggerState.gateState.lastGenerationAt) || 0;
  return lastGenerationAt > 0 && (now - lastGenerationAt) <= SLOT_EVENT_ACCEPT_WINDOW_MS;
}

function buildAssistantSlotFromEntry(entry, eventType = '', data = {}, options = {}) {
  if (!entry?.message) {
    return null;
  }

  const api = getSillyTavernAPI();
  const context = api?.getContext?.() || null;
  const message = entry.message;
  const messageId = normalizeMessageIdentityValue(getMessageIdentity(message, entry.index));
  const content = getMessageContent(message);
  const swipeId = normalizeMessageIdentityValue(
    options?.effectiveSwipeId
    || data?.effectiveSwipeId
    || data?.sourceSwipeId
    || data?.swipeId
    || data?.swipe_id
    || getMessageSwipeId(message)
  );
  const generationTraceId = String(
    options?.generationTraceId
    || data?.generationTraceId
    || triggerState.gateState.lastGenerationTraceId
    || ''
  ).trim();
  const baseline = getCurrentGenerationBaseline(resolveStableChatId(api, context, null));

  const slot = {
    eventType,
    chatId: resolveStableChatId(api, context, null),
    messageId,
    messageIndex: entry.index,
    role: normalizeMessageRole(message),
    content,
    assistantContentFingerprint: buildAssistantContentFingerprint(content),
    swipeId,
    effectiveSwipeId: swipeId,
    swipeCount: getMessageSwipeCount(message),
    generationTraceId,
    generationAction: baseline?.generationAction || triggerState.gateState.lastGenerationAction || '',
    generationActionSource: baseline?.generationActionSource || triggerState.gateState.lastGenerationActionSource || '',
    generationStartedByUserIntent: !!(baseline?.startedByUserIntent || hasRecentUserTriggerIntent()),
    dryRun: !!(baseline?.dryRun || triggerState.gateState.lastGenerationDryRun),
    bindingSource: options?.bindingSource || '',
    baselineAssistantMessageId: normalizeMessageIdentityValue(baseline?.lastAssistantMessageId),
    baselineAssistantSwipeId: normalizeMessageIdentityValue(baseline?.lastAssistantSwipeId),
    rawMessage: message
  };

  return {
    ...slot,
    slotBindingKey: buildSlotBindingKey(slot),
    slotRevisionKey: buildSlotRevisionKey(slot),
    slotTransactionId: buildSlotTransactionId({
      ...slot,
      traceId: options?.traceId || data?.traceId || ''
    })
  };
}

async function resolveAssistantSlotFromEvent(eventType, data, options = {}) {
  const incomingMessageId = normalizeMessageIdentityValue(
    options?.messageId || extractEventMessageId(data, eventType)
  );
  const generationTraceId = String(
    options?.generationTraceId
    || data?.generationTraceId
    || triggerState.gateState.lastGenerationTraceId
    || ''
  ).trim();
  const baseline = await waitForResolvedTransactionBaseline({
    traceId: generationTraceId,
    retries: 2,
    retryDelayMs: 50
  }) || getCurrentGenerationBaseline();

  if (!incomingMessageId) {
    return null;
  }

  const resolvedEntry = await findRawChatMessageByIdentityWithRetries(incomingMessageId, {
    retries: 3,
    retryDelayMs: 80
  });

  if (resolvedEntry) {
    return buildAssistantSlotFromEntry(resolvedEntry, eventType, data, {
      generationTraceId,
      bindingSource: 'event_message_id',
      traceId: options?.traceId || data?.traceId || ''
    });
  }

  return null;
}

function evaluateAssistantSlotEvent(slot, eventType = '', data = {}) {
  const now = Date.now();

  if (!slot) {
    return {
      allowed: false,
      reason: AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
      detail: 'assistant_slot_not_resolved'
    };
  }

  if (slot.role !== 'assistant') {
    return {
      allowed: false,
      reason: AUTO_TRIGGER_SKIP_REASONS.NON_ASSISTANT_MESSAGE,
      detail: 'resolved_slot_not_assistant'
    };
  }

  if (!isMeaningfulAssistantContent(slot.content)) {
    return {
      allowed: false,
      reason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      detail: 'assistant_slot_content_not_meaningful'
    };
  }

  if (slot.dryRun) {
    return {
      allowed: false,
      reason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      detail: 'slot_event_dry_run_generation'
    };
  }

  if (isUiTransitionGuardActive(now) && !hasConfirmedUserTriggerIntent(now)) {
    return {
      allowed: false,
      reason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      detail: 'ui_transition_guard_active'
    };
  }

  if (eventType === EVENT_TYPES.MESSAGE_UPDATED || eventType === EVENT_TYPES.MESSAGE_SWIPED) {
    if (hasActiveWritebackGuard(slot.chatId, slot.messageId, slot.effectiveSwipeId, now)) {
      return {
        allowed: false,
        reason: AUTO_TRIGGER_SKIP_REASONS.WRITEBACK_ECHO_EVENT,
        detail: 'message_update_caused_by_tool_writeback'
      };
    }
  }

  if (eventType === EVENT_TYPES.MESSAGE_SWIPED) {
    return {
      allowed: true,
      reason: '',
      detail: ''
    };
  }

  if (
    eventType === EVENT_TYPES.MESSAGE_RECEIVED
    || eventType === EVENT_TYPES.MESSAGE_UPDATED
  ) {
    if (!hasRecentGenerationActivity(now) && !hasConfirmedUserTriggerIntent(now)) {
      return {
        allowed: false,
        reason: eventType === EVENT_TYPES.MESSAGE_RECEIVED
          ? AUTO_TRIGGER_SKIP_REASONS.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION
          : AUTO_TRIGGER_SKIP_REASONS.SLOT_EVENT_OUTSIDE_WINDOW,
        detail: 'slot_event_without_recent_generation_activity'
      };
    }
  }

  return {
    allowed: true,
    reason: '',
    detail: ''
  };
}

async function routeAssistantSlotEvent(eventType, data, options = {}) {
  const slot = await resolveAssistantSlotFromEvent(eventType, data, options);
  const evaluation = evaluateAssistantSlotEvent(slot, eventType, data);

  if (!evaluation.allowed) {
    const transaction = scheduleSpeculativeTransaction(eventType, data, {
      messageId: slot?.messageId || options?.messageId || extractEventMessageId(data, eventType),
      generationTraceId: slot?.generationTraceId || options?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '',
      reason: evaluation.reason,
      skipReasonDetailed: evaluation.detail,
      confirmationSource: 'none',
      confirmationMode: 'none',
      eventBelongsToCurrentGeneration: false,
      historicalReplayBlocked: evaluation.reason === AUTO_TRIGGER_SKIP_REASONS.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,
      historicalReplayReason: evaluation.reason === AUTO_TRIGGER_SKIP_REASONS.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION
        ? 'slot_event_without_recent_generation_activity'
        : ''
    });

    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId: slot?.messageId || '',
      generationMessageBindingSource: slot?.bindingSource || '',
      confirmedAssistantSwipeId: slot?.swipeId || '',
      effectiveSwipeId: slot?.effectiveSwipeId || '',
      skipReason: evaluation.reason,
      skipReasonDetailed: evaluation.detail,
      confirmedAssistantMessageId: slot?.messageId || '',
      confirmationSource: 'none',
      slotRevisionKey: slot ? buildSlotRevisionKey(slot) : ''
    });
    return false;
  }

  const snapshot = {
    generationTraceId: slot.generationTraceId,
    messageId: slot.messageId,
    confirmedAssistantMessageId: slot.messageId,
    confirmationSource: slot.bindingSource || eventType.toLowerCase(),
    confirmationMode: 'slot_revision',
    generationMessageBindingSource: slot.bindingSource || '',
    slotBindingKey: slot.slotBindingKey || buildSlotBindingKey(slot),
    confirmedAssistantSwipeId: slot.swipeId || '',
    effectiveSwipeId: slot.effectiveSwipeId || '',
    sourceMessageId: slot.messageId,
    sourceSwipeId: slot.effectiveSwipeId || '',
    slotRevisionKey: buildSlotRevisionKey(slot),
    slotTransactionId: slot.slotTransactionId || buildSlotTransactionId(slot),
    sameSlotRevisionCandidate: isSameSlotRevisionActionFamily(slot.generationAction),
    sameSlotRevisionConfirmed: isSameSlotRevisionActionFamily(slot.generationAction),
    sameSlotRevisionSource: isSameSlotRevisionActionFamily(slot.generationAction)
      ? (slot.bindingSource || 'slot_revision')
      : '',
    eventBelongsToCurrentGeneration: true,
    historicalReplayBlocked: false,
    historicalReplayReason: ''
  };

  const delayMs = eventType === EVENT_TYPES.GENERATION_ENDED
    ? 0
    : getResolvedListenerSettings().debounceMs;

  if (delayMs > 0) {
    scheduleAutoTrigger(eventType, data, delayMs, snapshot);
  } else {
    await handleAutoTrigger(eventType, {
      ...(typeof data === 'object' && data ? data : {}),
      ...snapshot,
      messageId: slot.messageId,
      confirmedAssistantMessageId: slot.messageId
    });
  }

  return true;
}

function installInternalTriggerSubscriptions() {
  if (toolTriggerManagerState.internalSubscriptions.length > 0) {
    return;
  }

  const unsubscribeInjected = eventBus.on(EVENTS.TOOL_CONTEXT_INJECTED, (payload = {}) => {
    const sourceMessageId = normalizeMessageIdentityValue(payload?.sourceMessageId || payload?.options?.sourceMessageId);
    if (!sourceMessageId) {
      return;
    }

    markWritebackGuard({
      chatId: payload?.chatId || resolveCurrentChatIdForTransaction(),
      messageId: sourceMessageId,
      effectiveSwipeId: payload?.effectiveSwipeId || payload?.sourceSwipeId || payload?.options?.sourceSwipeId || '',
      traceId: payload?.traceId || payload?.options?.traceId || '',
      toolId: payload?.toolId || ''
    });
  });

  toolTriggerManagerState.internalSubscriptions.push(unsubscribeInjected);
}

async function buildToolExecutionContextFromMessageEntry(entry, options = {}) {
  const character = await getCurrentCharacter();
  const api = getSillyTavernAPI();
  const stContext = api?.getContext?.() || null;
  const resolvedMessage = entry?.message || null;
  const resolvedIndex = Number.isInteger(entry?.index) ? entry.index : -1;
  const messageId = normalizeMessageIdentityValue(getMessageIdentity(resolvedMessage, resolvedIndex));
  const content = getMessageContent(resolvedMessage);
  const effectiveSwipeId = normalizeMessageIdentityValue(
    options?.effectiveSwipeId
    || options?.confirmedAssistantSwipeId
    || getMessageSwipeId(resolvedMessage)
  );
  const generationTraceId = String(
    options?.generationTraceId
    || triggerState.gateState.lastGenerationTraceId
    || ''
  ).trim();
  const chatId = resolveStableChatId(api, stContext, character);
  const assistantContentFingerprint = buildAssistantContentFingerprint(content);
  const slotBindingKey = buildSlotBindingKey({
    chatId,
    messageId
  });
  const slotRevisionKey = buildSlotRevisionKey({
    chatId,
    messageId,
    effectiveSwipeId,
    assistantContentFingerprint
  });
  const slotTransactionId = buildSlotTransactionId({
    chatId,
    messageId,
    effectiveSwipeId,
    assistantContentFingerprint,
    eventType: options?.triggerEvent || '',
    generationTraceId,
    traceId: options?.traceId || ''
  });
  const conversation = await getConversationSnapshot({
    preferredMessageId: messageId || null,
    retries: Number.isFinite(options?.retries) ? options.retries : 2,
    retryDelayMs: Number.isFinite(options?.retryDelayMs) ? options.retryDelayMs : 120,
    lockToMessageId: true
  });
  const messages = conversation.messages || [];
  const lastUserMessage = conversation.lastUserMessage;

  return {
    triggeredAt: Date.now(),
    triggerEvent: options?.triggerEvent || '',
    traceId: options?.traceId || '',
    transactionKey: options?.transactionKey || '',
    confirmationSource: String(options?.confirmationSource || '').trim(),
    confirmedAssistantMessageId: messageId,
    chatId,
    messageId,
    generationTraceId,
    confirmationMode: String(options?.confirmationMode || 'slot_revision').trim(),
    sameSlotRevisionCandidate: !!options?.sameSlotRevisionCandidate,
    sameSlotRevisionConfirmed: !!options?.sameSlotRevisionConfirmed,
    sameSlotRevisionSource: String(options?.sameSlotRevisionSource || '').trim(),
    rawGenerationType: triggerState.gateState.lastGenerationBaseline?.rawGenerationType || triggerState.gateState.lastGenerationType || '',
    rawGenerationParams: triggerState.gateState.lastGenerationBaseline?.rawGenerationParams ?? triggerState.gateState.lastGenerationParams ?? null,
    normalizedGenerationType: triggerState.gateState.lastGenerationBaseline?.normalizedGenerationType || triggerState.gateState.lastNormalizedGenerationType || '',
    generationAction: triggerState.gateState.lastGenerationBaseline?.generationAction || triggerState.gateState.lastGenerationAction || '',
    generationActionSource: triggerState.gateState.lastGenerationBaseline?.generationActionSource || triggerState.gateState.lastGenerationActionSource || '',
    generationMessageBindingSource: String(options?.generationMessageBindingSource || '').trim(),
    slotBindingKey,
    slotRevisionKey,
    slotTransactionId,
    lastAiMessage: content,
    assistantContentFingerprint,
    lastAiMessageSwipeId: effectiveSwipeId,
    confirmedAssistantSwipeId: effectiveSwipeId,
    effectiveSwipeId,
    sourceMessageId: messageId,
    sourceSwipeId: effectiveSwipeId,
    userMessage: lastUserMessage?.content || triggerState.gateState.lastUserMessageText || '',
    chatMessages: messages,
    input: {
      userMessage: lastUserMessage?.content || triggerState.gateState.lastUserMessageText || '',
      lastAiMessage: content,
      extractedContent: '',
      previousToolOutput: '',
      context: {
        character: character?.name || '',
        chatLength: messages.length || 0
      }
    },
    config: {},
    status: 'pending',
    executionKey: slotRevisionKey
  };
}

/**
 * 自动工具主链说明：
 * 1. tool-trigger 负责监听宿主事件、门控、上下文构建
 * 2. tool-output-service 负责构建额外模型请求、执行请求、处理输出并写回楼层
 * 3. executeToolWithConfig 仅保留为兼容执行回退路径，主要用于非 post_response_api 的 legacy/manual 场景
 */

function scheduleSpeculativeTransaction(eventType, data, snapshot = {}) {
  const messageId = normalizeMessageIdentityValue(snapshot?.messageId || extractEventMessageId(data, eventType));
  const transaction = getOrCreateTransactionRecord(eventType, data, {
    eventType,
    messageId,
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    confirmationSource: snapshot?.confirmationSource || 'none',
    confirmationMode: snapshot?.confirmationMode || '',
    sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? false,
    sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? false,
    sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || '',
    generationTraceId: snapshot?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '',
    skipReasonDetailed: snapshot?.skipReasonDetailed || 'speculative_transaction_only',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    isSpeculativeTransaction: true
  });
  const reason = snapshot?.reason || AUTO_TRIGGER_SKIP_REASONS.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE;
  const detail = snapshot?.skipReasonDetailed || 'speculative_transaction_only';

  traceAlways('info', '记录 speculative transaction，未进入执行调度', {
    eventType,
    traceId: transaction?.traceId || '',
    transactionKey: transaction?.transactionKey || '',
    messageId,
    reason,
    detail
  });

  saveEventDebugSnapshot({
    stage: 'speculative_observed',
    eventType,
    traceId: transaction?.traceId || '',
    transactionKey: transaction?.transactionKey || '',
    messageId,
    reason,
    skipReasonDetailed: detail,
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    confirmationSource: snapshot?.confirmationSource || 'none',
    confirmationMode: snapshot?.confirmationMode || '',
    sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? false,
    sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? false,
    sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || '',
    isSpeculativeTransaction: true,
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    handledAt: Date.now()
  });

  updateTransactionRecord(transaction, {
    phase: TRANSACTION_PHASES.IGNORED,
    skipReason: reason,
    skipReasonDetailed: detail,
    confirmationSource: snapshot?.confirmationSource || 'none',
    confirmationMode: snapshot?.confirmationMode || '',
    sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? false,
    sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? false,
    sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || '',
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    isSpeculativeTransaction: true,
    completedAt: Date.now()
  });
  appendTransactionHistory(transaction, {
    phase: TRANSACTION_PHASES.IGNORED,
    eventType,
    messageId,
    skipReason: reason,
    skipReasonDetailed: detail,
    confirmedAssistantMessageId: snapshot?.confirmedAssistantMessageId || '',
    confirmationSource: snapshot?.confirmationSource || 'none',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    isSpeculativeTransaction: true
  });

  return transaction;
}

function buildPendingTransactionTimerKey(transaction, snapshot = {}, confirmedAssistantMessageId = '') {
  const explicitExecutionKey = String(
    snapshot?.executionKey
    || snapshot?.slotRevisionKey
    || transaction?.executionKey
    || transaction?.slotRevisionKey
    || ''
  ).trim();

  if (explicitExecutionKey) {
    return `txn::${explicitExecutionKey}`;
  }

  const explicitTransactionId = String(
    snapshot?.slotTransactionId
    || snapshot?.transactionId
    || transaction?.slotTransactionId
    || transaction?.transactionId
    || ''
  ).trim();

  if (explicitTransactionId) {
    return `txn_id::${explicitTransactionId}`;
  }

  return transaction?.transactionKey || `message::${confirmedAssistantMessageId}`;
}

function scheduleAutoTrigger(eventType, data, delayMs = 0, snapshot = {}) {
  const confirmedAssistantMessageId = normalizeMessageIdentityValue(
    snapshot?.confirmedAssistantMessageId
    || snapshot?.messageId
    || extractEventMessageId(data, eventType)
  );

  if (!confirmedAssistantMessageId) {
    return scheduleSpeculativeTransaction(eventType, data, {
      ...snapshot,
      reason: snapshot?.reason || AUTO_TRIGGER_SKIP_REASONS.NO_CONFIRMED_ASSISTANT_MESSAGE,
      skipReasonDetailed: snapshot?.skipReasonDetailed || 'missing_confirmed_message_identity',
      confirmationSource: snapshot?.confirmationSource || 'none'
    });
  }

  const enrichedData = typeof data === 'object' && data
    ? {
        ...data,
        generationTraceId: snapshot?.generationTraceId || data?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '',
        messageId: confirmedAssistantMessageId,
        confirmedAssistantMessageId,
        confirmationSource: snapshot?.confirmationSource || data?.confirmationSource || '',
        confirmationMode: snapshot?.confirmationMode || data?.confirmationMode || '',
        slotBindingKey: snapshot?.slotBindingKey || data?.slotBindingKey || '',
        slotRevisionKey: snapshot?.slotRevisionKey || data?.slotRevisionKey || '',
        slotTransactionId: snapshot?.slotTransactionId || data?.slotTransactionId || '',
        executionKey: snapshot?.executionKey || data?.executionKey || snapshot?.slotRevisionKey || data?.slotRevisionKey || '',
        sourceMessageId: snapshot?.sourceMessageId || data?.sourceMessageId || confirmedAssistantMessageId,
        sourceSwipeId: snapshot?.sourceSwipeId || data?.sourceSwipeId || data?.effectiveSwipeId || '',
        sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? data?.sameSlotRevisionCandidate ?? false,
        sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? data?.sameSlotRevisionConfirmed ?? false,
        sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || data?.sameSlotRevisionSource || '',
        eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? data?.eventBelongsToCurrentGeneration ?? false,
        historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? data?.historicalReplayBlocked ?? false,
        historicalReplayReason: snapshot?.historicalReplayReason || data?.historicalReplayReason || ''
      }
    : {
        generationTraceId: snapshot?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '',
        messageId: confirmedAssistantMessageId,
        confirmedAssistantMessageId,
        confirmationSource: snapshot?.confirmationSource || '',
        confirmationMode: snapshot?.confirmationMode || '',
        slotBindingKey: snapshot?.slotBindingKey || '',
        slotRevisionKey: snapshot?.slotRevisionKey || '',
        slotTransactionId: snapshot?.slotTransactionId || '',
        executionKey: snapshot?.executionKey || snapshot?.slotRevisionKey || '',
        sourceMessageId: snapshot?.sourceMessageId || confirmedAssistantMessageId,
        sourceSwipeId: snapshot?.sourceSwipeId || snapshot?.effectiveSwipeId || '',
        sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? false,
        sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? false,
        sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || '',
        eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
        historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
        historicalReplayReason: snapshot?.historicalReplayReason || ''
      };

  const transactionIdentity = resolveTransactionIdentity(eventType, enrichedData, {
    ...snapshot,
    chatId: snapshot?.chatId || enrichedData.chatId || resolveCurrentChatIdForTransaction(),
    messageId: confirmedAssistantMessageId,
    generationTraceId: snapshot?.generationTraceId || enrichedData.generationTraceId || '',
    slotRevisionKey: snapshot?.slotRevisionKey || enrichedData.slotRevisionKey || '',
    executionKey: snapshot?.executionKey || enrichedData.executionKey || enrichedData.slotRevisionKey || '',
    slotTransactionId: snapshot?.slotTransactionId || enrichedData.slotTransactionId || ''
  });

  const transaction = getOrCreateTransactionRecord(eventType, enrichedData, {
    ...snapshot,
    ...transactionIdentity,
    eventType,
    messageId: confirmedAssistantMessageId,
    confirmedAssistantMessageId,
    executionKey: transactionIdentity.executionKey || enrichedData.executionKey || enrichedData.slotRevisionKey || '',
    slotRevisionKey: transactionIdentity.slotRevisionKey || enrichedData.slotRevisionKey || '',
    transactionKey: transactionIdentity.transactionKey,
    transactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
    slotTransactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    confirmationMode: snapshot?.confirmationMode || enrichedData.confirmationMode || '',
    sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? enrichedData.sameSlotRevisionCandidate ?? false,
    sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? enrichedData.sameSlotRevisionConfirmed ?? false,
    sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || enrichedData.sameSlotRevisionSource || '',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? enrichedData.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? enrichedData.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || enrichedData.historicalReplayReason || '',
    isSpeculativeTransaction: false
  });
  const resolvedDelayMs = Number.isFinite(delayMs)
    ? Math.max(0, delayMs)
    : getResolvedListenerSettings().debounceMs;
  const timerKey = buildPendingTransactionTimerKey(transaction, {
    ...snapshot,
    executionKey: transactionIdentity.executionKey || enrichedData.executionKey || '',
    slotRevisionKey: transactionIdentity.slotRevisionKey || enrichedData.slotRevisionKey || '',
    slotTransactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
    transactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || ''
  }, confirmedAssistantMessageId);
  const existingTimer = toolTriggerManagerState.pendingTransactionTimers.get(timerKey);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  updateTransactionRecord(transaction, {
    phase: TRANSACTION_PHASES.SCHEDULED,
    transactionKey: transactionIdentity.transactionKey,
    transactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
    executionKey: transactionIdentity.executionKey || enrichedData.executionKey || '',
    slotRevisionKey: transactionIdentity.slotRevisionKey || enrichedData.slotRevisionKey || '',
    slotTransactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
    messageId: confirmedAssistantMessageId,
    confirmedAssistantMessageId,
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    confirmationMode: snapshot?.confirmationMode || enrichedData.confirmationMode || '',
    sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? enrichedData.sameSlotRevisionCandidate ?? false,
    sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? enrichedData.sameSlotRevisionConfirmed ?? false,
    sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || enrichedData.sameSlotRevisionSource || '',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? enrichedData.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? enrichedData.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || enrichedData.historicalReplayReason || '',
    isSpeculativeTransaction: false,
    scheduledAt: Date.now()
  });
  appendTransactionHistory(transaction, {
    phase: TRANSACTION_PHASES.SCHEDULED,
    eventType,
    messageId: confirmedAssistantMessageId,
    transactionKey: transactionIdentity.transactionKey,
    transactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
    executionKey: transactionIdentity.executionKey || enrichedData.executionKey || '',
    slotRevisionKey: transactionIdentity.slotRevisionKey || enrichedData.slotRevisionKey || '',
    confirmedAssistantMessageId,
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? enrichedData.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? enrichedData.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || enrichedData.historicalReplayReason || '',
    isSpeculativeTransaction: false
  });

  saveEventDebugSnapshot({
    stage: 'scheduled',
    eventType,
    traceId: transaction?.traceId || '',
    transactionKey: transactionIdentity.transactionKey || transaction?.transactionKey || '',
    transactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
    executionKey: transactionIdentity.executionKey || enrichedData.executionKey || '',
    messageId: confirmedAssistantMessageId,
    slotBindingKey: snapshot?.slotBindingKey || enrichedData.slotBindingKey || '',
    slotRevisionKey: transactionIdentity.slotRevisionKey || enrichedData.slotRevisionKey || '',
    slotTransactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
    sourceMessageId: snapshot?.sourceMessageId || enrichedData.sourceMessageId || confirmedAssistantMessageId,
    confirmedAssistantMessageId,
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    confirmationMode: snapshot?.confirmationMode || enrichedData.confirmationMode || '',
    sourceSwipeId: snapshot?.sourceSwipeId || enrichedData.sourceSwipeId || '',
    sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? enrichedData.sameSlotRevisionCandidate ?? false,
    sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? enrichedData.sameSlotRevisionConfirmed ?? false,
    sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || enrichedData.sameSlotRevisionSource || '',
    isSpeculativeTransaction: false,
    eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
    historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
    historicalReplayReason: snapshot?.historicalReplayReason || '',
    scheduledDelayMs: resolvedDelayMs
  });
  traceAlways('info', '已调度确认后的自动触发', {
    eventType,
    messageId: confirmedAssistantMessageId,
    executionKey: transactionIdentity.executionKey || enrichedData.executionKey || '',
    transactionKey: transactionIdentity.transactionKey || transaction?.transactionKey || '',
    confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
    delayMs: resolvedDelayMs
  });

  const timer = setTimeout(async () => {
    toolTriggerManagerState.pendingTransactionTimers.delete(timerKey);
    updateTransactionRecord(transaction, {
      phase: TRANSACTION_PHASES.DISPATCHING,
      transactionKey: transactionIdentity.transactionKey,
      transactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
      executionKey: transactionIdentity.executionKey || enrichedData.executionKey || '',
      slotRevisionKey: transactionIdentity.slotRevisionKey || enrichedData.slotRevisionKey || '',
      slotTransactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
      confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
      confirmationMode: snapshot?.confirmationMode || enrichedData.confirmationMode || '',
      sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? enrichedData.sameSlotRevisionCandidate ?? false,
      sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? enrichedData.sameSlotRevisionConfirmed ?? false,
      sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || enrichedData.sameSlotRevisionSource || '',
      confirmedAssistantMessageId,
      isSpeculativeTransaction: false
    });
    appendTransactionHistory(transaction, {
      phase: TRANSACTION_PHASES.DISPATCHING,
      eventType,
      messageId: confirmedAssistantMessageId,
      transactionKey: transactionIdentity.transactionKey,
      transactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
      executionKey: transactionIdentity.executionKey || enrichedData.executionKey || '',
      slotRevisionKey: transactionIdentity.slotRevisionKey || enrichedData.slotRevisionKey || '',
      confirmedAssistantMessageId,
      confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
      confirmationMode: snapshot?.confirmationMode || enrichedData.confirmationMode || '',
      sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? enrichedData.sameSlotRevisionCandidate ?? false,
      sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? enrichedData.sameSlotRevisionConfirmed ?? false,
      sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || enrichedData.sameSlotRevisionSource || '',
      isSpeculativeTransaction: false
    });
    saveEventDebugSnapshot({
      stage: 'dispatching',
      eventType,
      traceId: transaction?.traceId || '',
      transactionKey: transactionIdentity.transactionKey || transaction?.transactionKey || '',
      transactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
      executionKey: transactionIdentity.executionKey || enrichedData.executionKey || '',
      messageId: confirmedAssistantMessageId,
      slotBindingKey: snapshot?.slotBindingKey || enrichedData.slotBindingKey || '',
      slotRevisionKey: transactionIdentity.slotRevisionKey || enrichedData.slotRevisionKey || '',
      slotTransactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
      sourceMessageId: snapshot?.sourceMessageId || enrichedData.sourceMessageId || confirmedAssistantMessageId,
      confirmedAssistantMessageId,
      confirmationSource: snapshot?.confirmationSource || enrichedData.confirmationSource || '',
      isSpeculativeTransaction: false,
      confirmationMode: snapshot?.confirmationMode || enrichedData.confirmationMode || '',
      sourceSwipeId: snapshot?.sourceSwipeId || enrichedData.sourceSwipeId || '',
      sameSlotRevisionCandidate: snapshot?.sameSlotRevisionCandidate ?? enrichedData.sameSlotRevisionCandidate ?? false,
      sameSlotRevisionConfirmed: snapshot?.sameSlotRevisionConfirmed ?? enrichedData.sameSlotRevisionConfirmed ?? false,
      sameSlotRevisionSource: snapshot?.sameSlotRevisionSource || enrichedData.sameSlotRevisionSource || '',
      eventBelongsToCurrentGeneration: snapshot?.eventBelongsToCurrentGeneration ?? false,
      historicalReplayBlocked: snapshot?.historicalReplayBlocked ?? false,
      historicalReplayReason: snapshot?.historicalReplayReason || '',
      scheduledDelayMs: resolvedDelayMs
    });
    await handleAutoTrigger(eventType, {
      ...enrichedData,
      transactionKey: transactionIdentity.transactionKey,
      transactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || '',
      executionKey: transactionIdentity.executionKey || enrichedData.executionKey || '',
      slotRevisionKey: transactionIdentity.slotRevisionKey || enrichedData.slotRevisionKey || '',
      slotTransactionId: transactionIdentity.transactionId || enrichedData.slotTransactionId || ''
    });
  }, resolvedDelayMs);

  toolTriggerManagerState.pendingTransactionTimers.set(timerKey, timer);
  return transaction;
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
  const currentGenerationTraceId = typeof data === 'object' && data
    ? String(data?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '').trim()
    : String(triggerState.gateState.lastGenerationTraceId || '').trim();
  const currentGenerationBaseline = await waitForResolvedTransactionBaseline({
    traceId: currentGenerationTraceId,
    retries: 2,
    retryDelayMs: 40
  }) || getCurrentGenerationBaseline();
  const currentGenerationType = currentGenerationBaseline?.rawGenerationType
    || currentGenerationBaseline?.generationType
    || triggerState.gateState.lastGenerationType
    || '';
  const currentGenerationParams = currentGenerationBaseline?.rawGenerationParams
    ?? currentGenerationBaseline?.generationParams
    ?? triggerState.gateState.lastGenerationParams
    ?? null;
  const isCurrentGenerationDryRun = !!currentGenerationBaseline?.dryRun;
  const confirmationSource = typeof data === 'object' && data
    ? String(data?.confirmationSource || '').trim()
    : '';
  const confirmationMode = typeof data === 'object' && data
    ? String(data?.confirmationMode || '').trim()
    : '';
  const sameSlotRevisionCandidate = !!(typeof data === 'object' && data ? data?.sameSlotRevisionCandidate : false);
  const sameSlotRevisionConfirmed = !!(typeof data === 'object' && data ? data?.sameSlotRevisionConfirmed : false);
  const sameSlotRevisionSource = typeof data === 'object' && data
    ? String(data?.sameSlotRevisionSource || '').trim()
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
  const transaction = getOrCreateTransactionRecord(eventType, data, {
    eventType,
    messageId: incomingMessageId,
    confirmedAssistantMessageId,
    confirmationSource,
    confirmationMode,
    sameSlotRevisionCandidate,
    sameSlotRevisionConfirmed,
    sameSlotRevisionSource,
    eventBelongsToCurrentGeneration,
    historicalReplayBlocked,
    historicalReplayReason,
    candidateToolIds
  });

  updateTransactionRecord(transaction, {
    phase: TRANSACTION_PHASES.HANDLING,
    handledAt: Date.now(),
    confirmedAssistantMessageId,
    confirmationSource,
    confirmationMode,
    sameSlotRevisionCandidate,
    sameSlotRevisionConfirmed,
    sameSlotRevisionSource,
    isSpeculativeTransaction: false,
    eventBelongsToCurrentGeneration,
    historicalReplayBlocked,
    historicalReplayReason,
    candidateToolIds
  });
  appendTransactionHistory(transaction, {
    phase: TRANSACTION_PHASES.HANDLING,
    eventType,
    messageId: incomingMessageId,
    confirmedAssistantMessageId,
    confirmationSource,
    confirmationMode,
    sameSlotRevisionCandidate,
    sameSlotRevisionConfirmed,
    sameSlotRevisionSource,
    isSpeculativeTransaction: false,
    eventBelongsToCurrentGeneration,
    historicalReplayBlocked,
    historicalReplayReason,
    candidateToolIds
  });

  saveEventDebugSnapshot({
    stage: 'handling',
    eventType,
    traceId: transaction?.traceId || '',
    transactionKey: transaction?.transactionKey || '',
    messageId: incomingMessageId,
    confirmedAssistantMessageId,
    confirmationSource,
    isSpeculativeTransaction: false,
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
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
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
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId: incomingMessageId,
      reason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      skipReasonDetailed: 'ui_transition_guard_active',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateTransactionRecord(transaction, {
      phase: TRANSACTION_PHASES.IGNORED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      skipReasonDetailed: 'ui_transition_guard_active',
      confirmedAssistantMessageId,
      confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendTransactionHistory(transaction, {
      phase: TRANSACTION_PHASES.IGNORED,
      eventType,
      messageId: incomingMessageId,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.UNRELATED_UI_EVENT,
      skipReasonDetailed: 'ui_transition_guard_active',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: transaction?.traceId || '',
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

  if (isCurrentGenerationDryRun) {
    traceAlways('warn', '当前 generation 为 dryRun，自动触发直接阻断', {
      eventType,
      candidateToolIds,
      generationTraceId: currentGenerationTraceId || ''
    });
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
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
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId: incomingMessageId,
      reason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      skipReasonDetailed: 'dry_run_generation',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateTransactionRecord(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      skipReasonDetailed: 'dry_run_generation',
      confirmedAssistantMessageId,
      confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendTransactionHistory(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
      eventType,
      messageId: incomingMessageId,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.DRY_RUN_GENERATION,
      skipReasonDetailed: 'dry_run_generation',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: transaction?.traceId || '',
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
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
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
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId: incomingMessageId,
      reason: listenerDecision.reason,
      skipReasonDetailed: `listener_setting_${listenerDecision.reason}`,
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateTransactionRecord(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
      skipReason: listenerDecision.reason,
      skipReasonDetailed: `listener_setting_${listenerDecision.reason}`,
      confirmedAssistantMessageId,
      confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendTransactionHistory(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
      eventType,
      messageId: incomingMessageId,
      skipReason: listenerDecision.reason,
      skipReasonDetailed: `listener_setting_${listenerDecision.reason}`,
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: transaction?.traceId || '',
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
    currentGenerationType,
    currentGenerationParams,
    isCurrentGenerationDryRun
  )) {
    log('检测到 quiet / dryRun 生成，跳过工具自动执行');
    traceAlways('warn', '检测到 quiet/dryRun，跳过自动触发', {
      eventType,
      candidateToolIds
    });
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
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
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId: incomingMessageId,
      reason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      skipReasonDetailed: 'quiet_generation_listener_filter',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateTransactionRecord(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      skipReasonDetailed: 'quiet_generation_listener_filter',
      confirmedAssistantMessageId,
      confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendTransactionHistory(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
      eventType,
      messageId: incomingMessageId,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      skipReasonDetailed: 'quiet_generation_listener_filter',
      confirmedAssistantMessageId,
      confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: transaction?.traceId || '',
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
    traceId: transaction?.traceId || '',
    transactionKey: transaction?.transactionKey || ''
  });

  context.traceId = transaction?.traceId || context.traceId || createTraceId('exec');
  context.transactionKey = transaction?.transactionKey || context.transactionKey || '';
  const executionKey = context?.executionKey || getAutoTriggerExecutionKey(context || {});
  context.executionKey = executionKey;

  const resolvedTransactionKey = buildResolvedTransactionKey(context.chatId, context.messageId, eventType, context.generationTraceId);
  rekeyTransactionRecord(transaction, resolvedTransactionKey);
  updateTransactionRecord(transaction, {
    messageId: context.messageId || incomingMessageId,
    messageKey: getAutoTriggerMessageKey(context),
    executionKey,
    confirmedAssistantMessageId: context.confirmedAssistantMessageId || confirmedAssistantMessageId,
    slotBindingKey: context.slotBindingKey || '',
    slotRevisionKey: context.slotRevisionKey || '',
    slotTransactionId: context.slotTransactionId || '',
    confirmationSource: context.confirmationSource || confirmationSource,
      confirmationMode: context?.confirmationMode || confirmationMode,
      sameSlotRevisionCandidate: context?.sameSlotRevisionCandidate ?? sameSlotRevisionCandidate,
      sameSlotRevisionConfirmed: context?.sameSlotRevisionConfirmed ?? sameSlotRevisionConfirmed,
      sameSlotRevisionSource: context?.sameSlotRevisionSource || sameSlotRevisionSource,
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
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId: context?.messageId || '',
      messageKey,
      executionKey,
      slotBindingKey: context?.slotBindingKey || '',
      generationMessageBindingSource: context?.generationMessageBindingSource || '',
      sourceMessageId: context?.sourceMessageId || context?.messageId || '',
      sourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
      confirmedAssistantSwipeId: context?.confirmedAssistantSwipeId || '',
      effectiveSwipeId: context?.effectiveSwipeId || '',
      slotRevisionKey: context?.slotRevisionKey || '',
      slotTransactionId: context?.slotTransactionId || '',
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
      lastExecutionKey: executionKey,
      lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: ''
    });
    saveEventDebugSnapshot({
      stage: 'skipped',
      eventType,
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId: context?.messageId || incomingMessageId,
      messageKey,
      executionKey,
      slotBindingKey: context?.slotBindingKey || '',
      generationMessageBindingSource: context?.generationMessageBindingSource || '',
      sourceMessageId: context?.sourceMessageId || context?.messageId || '',
      sourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
      confirmedAssistantSwipeId: context?.confirmedAssistantSwipeId || '',
      effectiveSwipeId: context?.effectiveSwipeId || '',
      slotRevisionKey: context?.slotRevisionKey || '',
      slotTransactionId: context?.slotTransactionId || '',
      reason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      skipReasonDetailed: 'missing_confirmed_assistant_content_in_context',
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      candidateToolIds,
      handledAt: Date.now()
    });
    updateTransactionRecord(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      skipReasonDetailed: 'missing_confirmed_assistant_content_in_context',
      messageKey,
      executionKey,
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      completedAt: Date.now(),
      candidateToolIds
    });
    appendTransactionHistory(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
      eventType,
      messageId: context?.messageId || incomingMessageId,
      messageKey,
      executionKey,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
      skipReasonDetailed: 'missing_confirmed_assistant_content_in_context',
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      candidateToolIds
    });
    appendTriggerHistoryForTools(candidateTools, {
      traceId: transaction?.traceId || '',
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
  if (hasHandledExecutionKey(executionKey)) {
    if (shouldReportDuplicateSkipWithExecutionKey(messageKey, executionKey)) {
      log(`检测到重复自动触发，跳过: ${messageKey}`);
      traceAlways('warn', '命中自动去重，跳过执行', {
        eventType,
        messageKey,
        executionKey,
        candidateToolIds
      });
      saveAutoTriggerSnapshot({
        triggerEvent: eventType,
        traceId: transaction?.traceId || '',
        transactionKey: transaction?.transactionKey || '',
        messageId: context?.messageId || '',
        messageKey,
        executionKey,
        slotBindingKey: context?.slotBindingKey || '',
        generationMessageBindingSource: context?.generationMessageBindingSource || '',
        sourceMessageId: context?.sourceMessageId || context?.messageId || '',
        sourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
        confirmedAssistantSwipeId: context?.confirmedAssistantSwipeId || '',
        effectiveSwipeId: context?.effectiveSwipeId || '',
        slotRevisionKey: context?.slotRevisionKey || '',
        slotTransactionId: context?.slotTransactionId || '',
        selectedToolIds: candidateToolIds,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        skipReasonDetailed: 'execution_key_already_handled',
        confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
        confirmationSource: context?.confirmationSource || confirmationSource,
        lockedAiMessageId: context?.messageId || ''
      });
      patchToolsDiagnostics(candidateTools, {
        lastTriggerEvent: eventType,
        lastMessageKey: messageKey,
        lastExecutionKey: executionKey,
        lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        lastExecutionPath: '',
        lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
        lastFailureStage: ''
      });
      saveEventDebugSnapshot({
        stage: 'skipped',
        eventType,
        traceId: transaction?.traceId || '',
        transactionKey: transaction?.transactionKey || '',
        messageId: context?.messageId || incomingMessageId,
        messageKey,
        executionKey,
        slotBindingKey: context?.slotBindingKey || '',
        generationMessageBindingSource: context?.generationMessageBindingSource || '',
        sourceMessageId: context?.sourceMessageId || context?.messageId || '',
        sourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
        confirmedAssistantSwipeId: context?.confirmedAssistantSwipeId || '',
        effectiveSwipeId: context?.effectiveSwipeId || '',
        slotRevisionKey: context?.slotRevisionKey || '',
        slotTransactionId: context?.slotTransactionId || '',
        reason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        skipReasonDetailed: 'execution_key_already_handled',
        confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
        confirmationSource: context?.confirmationSource || confirmationSource,
        candidateToolIds,
        handledAt: Date.now()
      });
      updateTransactionRecord(transaction, {
        phase: TRANSACTION_PHASES.SKIPPED,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        skipReasonDetailed: 'execution_key_already_handled',
        messageKey,
        executionKey,
        confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
        confirmationSource: context?.confirmationSource || confirmationSource,
        completedAt: Date.now(),
        candidateToolIds
      });
      appendTransactionHistory(transaction, {
        phase: TRANSACTION_PHASES.SKIPPED,
        eventType,
        messageId: context?.messageId || incomingMessageId,
        messageKey,
        executionKey,
        skipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
        skipReasonDetailed: 'execution_key_already_handled',
        confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
        confirmationSource: context?.confirmationSource || confirmationSource,
        candidateToolIds
      });
      appendTriggerHistoryForTools(candidateTools, {
        traceId: transaction?.traceId || '',
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
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId: context?.messageId || '',
      messageKey,
      generationMessageBindingSource: context?.generationMessageBindingSource || '',
      confirmedAssistantSwipeId: context?.confirmedAssistantSwipeId || '',
      effectiveSwipeId: context?.effectiveSwipeId || '',
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
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId: context?.messageId || incomingMessageId,
      messageKey,
      generationMessageBindingSource: context?.generationMessageBindingSource || '',
      confirmedAssistantSwipeId: context?.confirmedAssistantSwipeId || '',
      effectiveSwipeId: context?.effectiveSwipeId || '',
      reason: AUTO_TRIGGER_SKIP_REASONS.NO_ELIGIBLE_TOOLS,
      skipReasonDetailed: 'no_tools_configured_for_auto_post_response',
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      candidateToolIds: [],
      handledAt: Date.now()
    });
    updateTransactionRecord(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.NO_ELIGIBLE_TOOLS,
      skipReasonDetailed: 'no_tools_configured_for_auto_post_response',
      messageKey,
      confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
      confirmationSource: context?.confirmationSource || confirmationSource,
      completedAt: Date.now(),
      candidateToolIds: []
    });
    appendTransactionHistory(transaction, {
      phase: TRANSACTION_PHASES.SKIPPED,
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
  toolTriggerManagerState.lastHandledExecutionKey = executionKey;
  toolTriggerManagerState.lastHandledSlotRevisionKey = context?.slotRevisionKey || executionKey;
  markHandledExecutionKey(executionKey, {
    messageKey,
    messageId: context?.messageId || incomingMessageId,
    generationTraceId: context?.generationTraceId || '',
    eventType,
    transactionKey: transaction?.transactionKey || ''
  });
  toolTriggerManagerState.lastDuplicateMessageKey = '';
  toolTriggerManagerState.lastDuplicateExecutionKey = '';
  toolTriggerManagerState.lastDuplicateMessageAt = 0;
  context.messageKey = messageKey;
  saveAutoTriggerSnapshot({
    triggerEvent: eventType,
    traceId: transaction?.traceId || '',
    transactionKey: transaction?.transactionKey || '',
    messageId: context?.messageId || '',
    messageKey,
    executionKey,
    slotBindingKey: context?.slotBindingKey || '',
    generationMessageBindingSource: context?.generationMessageBindingSource || '',
    sourceMessageId: context?.sourceMessageId || context?.messageId || '',
    sourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
    confirmedAssistantSwipeId: context?.confirmedAssistantSwipeId || '',
    effectiveSwipeId: context?.effectiveSwipeId || '',
    slotRevisionKey: context?.slotRevisionKey || '',
    slotTransactionId: context?.slotTransactionId || '',
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
    executionKey,
    toolIds: toolsToExecute.map(t => t.id)
  });
  showTopNotice('info', `检测到 AI 回复，开始自动执行 ${toolsToExecute.length} 个工具`, {
    duration: 2400,
    noticeId: 'yyt-tool-batch-start'
  });

  updateTransactionRecord(transaction, {
    messageKey,
    executionKey,
    candidateToolIds: toolsToExecute.map(tool => tool.id),
    executionPathIds: [],
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    phase: TRANSACTION_PHASES.DISPATCHING
  });
  appendTransactionHistory(transaction, {
    phase: TRANSACTION_PHASES.DISPATCHING,
    eventType,
    messageId: context?.messageId || incomingMessageId,
    messageKey,
    executionKey,
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    candidateToolIds: toolsToExecute.map(tool => tool.id)
  });
  appendTriggerHistoryForTools(toolsToExecute, {
    traceId: transaction?.traceId || '',
    eventType,
    messageId: context?.messageId || incomingMessageId,
    messageKey,
    executionKey,
    skipReason: '',
    executionPath: TOOL_EXECUTION_PATHS.AUTO_POST_RESPONSE_API,
    writebackStatus: '',
    failureStage: ''
  });

  for (const tool of toolsToExecute) {
    try {
      const result = await executeTriggeredTool(tool, context);

      const executionPathForTool = resolveExecutionPath(tool, context);
      if (!transaction.executionPathIds.includes(executionPathForTool)) {
        transaction.executionPathIds.push(executionPathForTool);
      }
      appendWritebackHistoryForTool(tool.id, {
        traceId: transaction?.traceId || '',
        eventType,
        messageId: context?.messageId || incomingMessageId,
        messageKey,
        executionKey,
        executionPath: executionPathForTool,
        writebackStatus: result?.result?.meta?.writebackStatus || result?.meta?.writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
        failureStage: result?.result?.meta?.failureStage || result?.meta?.failureStage || '',
        contentCommitted: !!(result?.result?.meta?.writebackDetails?.contentCommitted || result?.meta?.writebackDetails?.contentCommitted),
        hostCommitApplied: !!(result?.result?.meta?.writebackDetails?.hostCommitApplied || result?.meta?.writebackDetails?.hostCommitApplied),
        refreshRequested: !!(result?.result?.meta?.writebackDetails?.refreshRequested || result?.meta?.writebackDetails?.refreshRequested),
        refreshConfirmed: !!(result?.result?.meta?.writebackDetails?.refreshConfirmed || result?.meta?.writebackDetails?.refreshConfirmed),
        preferredCommitMethod: result?.result?.meta?.writebackDetails?.commit?.preferredMethod || result?.meta?.writebackDetails?.commit?.preferredMethod || '',
        appliedCommitMethod: result?.result?.meta?.writebackDetails?.commit?.appliedMethod || result?.meta?.writebackDetails?.commit?.appliedMethod || '',
        refreshMethodCount: (result?.result?.meta?.writebackDetails?.refresh?.requestMethods || result?.meta?.writebackDetails?.refresh?.requestMethods || []).length,
        refreshMethods: [...(result?.result?.meta?.writebackDetails?.refresh?.requestMethods || result?.meta?.writebackDetails?.refresh?.requestMethods || [])],
        refreshConfirmChecks: result?.result?.meta?.writebackDetails?.refresh?.confirmChecks || result?.meta?.writebackDetails?.refresh?.confirmChecks || 0,
        refreshConfirmedBy: result?.result?.meta?.writebackDetails?.refresh?.confirmedBy || result?.meta?.writebackDetails?.refresh?.confirmedBy || '',
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
    traceId: transaction?.traceId || '',
    transactionKey: transaction?.transactionKey || '',
    messageId: context?.messageId || incomingMessageId,
    messageKey,
    executionKey,
    slotBindingKey: context?.slotBindingKey || '',
    generationMessageBindingSource: context?.generationMessageBindingSource || '',
    sourceMessageId: context?.sourceMessageId || context?.messageId || '',
    sourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
    confirmedAssistantSwipeId: context?.confirmedAssistantSwipeId || '',
    effectiveSwipeId: context?.effectiveSwipeId || '',
    slotRevisionKey: context?.slotRevisionKey || '',
    slotTransactionId: context?.slotTransactionId || '',
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    candidateToolIds: toolsToExecute.map(tool => tool.id),
    handledAt: Date.now()
  });
  updateTransactionRecord(transaction, {
    phase: TRANSACTION_PHASES.COMPLETED,
    messageKey,
    executionKey,
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    completedAt: Date.now(),
    candidateToolIds: toolsToExecute.map(tool => tool.id)
  });
  appendTransactionHistory(transaction, {
    phase: TRANSACTION_PHASES.COMPLETED,
    eventType,
    messageId: context?.messageId || incomingMessageId,
    messageKey,
    executionKey,
    confirmedAssistantMessageId: context?.confirmedAssistantMessageId || confirmedAssistantMessageId,
    confirmationSource: context?.confirmationSource || confirmationSource,
    candidateToolIds: toolsToExecute.map(tool => tool.id),
    executionPathIds: [...(transaction.executionPathIds || [])]
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

  const compatibilityModule = await loadToolExecutorCompatibilityModule();
  return compatibilityModule.executeToolWithConfig(tool.id, context);
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
  
  registerSlotDrivenListeners();
  installInternalTriggerSubscriptions();
  
  toolTriggerManagerState.initialized = true;
  log('工具触发管理器已初始化');
  
  // 发送事件
  eventBus.emit(EVENTS.TOOL_TRIGGER_INITIALIZED);
}

function registerSlotDrivenListeners() {
  const registerIgnoredFallback = (eventType, messageId, reason) => {
    const transaction = getOrCreateTransactionRecord(eventType, { messageId }, {
      eventType,
      messageId
    });
    updateTransactionRecord(transaction, {
      phase: TRANSACTION_PHASES.IGNORED,
      skipReason: reason,
      completedAt: Date.now()
    });
    appendTransactionHistory(transaction, {
      phase: TRANSACTION_PHASES.IGNORED,
      eventType,
      messageId,
      skipReason: reason
    });
    saveEventDebugSnapshot({
      stage: 'ignored',
      eventType,
      traceId: transaction?.traceId || '',
      transactionKey: transaction?.transactionKey || '',
      messageId,
      reason,
      handledAt: Date.now()
    });
  };

  const generationEndedListener = registerEventListener(EVENT_TYPES.GENERATION_ENDED, async (data) => {
    await routeAssistantSlotEvent(EVENT_TYPES.GENERATION_ENDED, data);
  });

  const generationAfterCommandsListener = registerEventListener(EVENT_TYPES.GENERATION_AFTER_COMMANDS, async (data) => {
    const messageId = extractEventMessageId(data, EVENT_TYPES.GENERATION_AFTER_COMMANDS);
    if (!getResolvedListenerSettings().useGenerationAfterCommandsFallback) {
      registerIgnoredFallback(EVENT_TYPES.GENERATION_AFTER_COMMANDS, messageId, 'generation_after_commands_fallback_disabled');
      return;
    }

    await routeAssistantSlotEvent(EVENT_TYPES.GENERATION_AFTER_COMMANDS, data);
  });

  const messageReceivedListener = registerEventListener(EVENT_TYPES.MESSAGE_RECEIVED, async (data) => {
    const messageId = extractEventMessageId(data, EVENT_TYPES.MESSAGE_RECEIVED);
    if (!getResolvedListenerSettings().useMessageReceivedFallback) {
      registerIgnoredFallback(EVENT_TYPES.MESSAGE_RECEIVED, messageId, 'message_received_fallback_disabled');
      return;
    }

    await routeAssistantSlotEvent(EVENT_TYPES.MESSAGE_RECEIVED, data);
  });

  const messageUpdatedListener = registerEventListener(EVENT_TYPES.MESSAGE_UPDATED, async (data) => {
    const messageId = extractEventMessageId(data, EVENT_TYPES.MESSAGE_UPDATED);
    if (!getResolvedListenerSettings().useMessageReceivedFallback) {
      registerIgnoredFallback(EVENT_TYPES.MESSAGE_UPDATED, messageId, 'message_received_fallback_disabled');
      return;
    }

    await routeAssistantSlotEvent(EVENT_TYPES.MESSAGE_UPDATED, data);
  });

  const messageSwipedListener = registerEventListener(EVENT_TYPES.MESSAGE_SWIPED, async (data) => {
    const messageId = extractEventMessageId(data, EVENT_TYPES.MESSAGE_SWIPED);
    if (!getResolvedListenerSettings().useMessageReceivedFallback) {
      registerIgnoredFallback(EVENT_TYPES.MESSAGE_SWIPED, messageId, 'message_received_fallback_disabled');
      return;
    }

    await routeAssistantSlotEvent(EVENT_TYPES.MESSAGE_SWIPED, data);
  });

  toolTriggerManagerState.listeners.set(EVENT_TYPES.GENERATION_ENDED, generationEndedListener);
  toolTriggerManagerState.listeners.set(EVENT_TYPES.GENERATION_AFTER_COMMANDS, generationAfterCommandsListener);
  toolTriggerManagerState.listeners.set(EVENT_TYPES.MESSAGE_RECEIVED, messageReceivedListener);
  toolTriggerManagerState.listeners.set(EVENT_TYPES.MESSAGE_UPDATED, messageUpdatedListener);
  toolTriggerManagerState.listeners.set(EVENT_TYPES.MESSAGE_SWIPED, messageSwipedListener);
}

/**
 * 注册GENERATION_ENDED事件监听
 */

/**
 * 构建工具执行上下文
 * @param {Object} eventData 事件数据
 * @returns {Promise<Object>} 执行上下文
 */
async function buildToolExecutionContext(eventData) {
  const triggerEvent = eventData?.triggerEvent || 'GENERATION_ENDED';
  const explicitMessageId = normalizeMessageIdentityValue(
    eventData?.confirmedAssistantMessageId
    || eventData?.messageId
    || extractEventMessageId(eventData, triggerEvent)
  );
  const isManual = triggerEvent === 'MANUAL' || triggerEvent === 'MANUAL_PREVIEW';

  if (!isManual && explicitMessageId) {
    const directEntry = await findRawChatMessageByIdentityWithRetries(explicitMessageId, {
      retries: 3,
      retryDelayMs: 80
    });

    if (
      directEntry?.message
      && normalizeMessageRole(directEntry.message) === 'assistant'
      && isMeaningfulAssistantContent(getMessageContent(directEntry.message))
    ) {
      return buildToolExecutionContextFromMessageEntry(directEntry, {
        triggerEvent,
        traceId: eventData?.traceId || '',
        transactionKey: eventData?.transactionKey || '',
        confirmationSource: eventData?.confirmationSource || '',
        confirmationMode: eventData?.confirmationMode || 'slot_revision',
        generationTraceId: eventData?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '',
        sameSlotRevisionCandidate: eventData?.sameSlotRevisionCandidate,
        sameSlotRevisionConfirmed: eventData?.sameSlotRevisionConfirmed,
        sameSlotRevisionSource: eventData?.sameSlotRevisionSource || '',
        generationMessageBindingSource: eventData?.generationMessageBindingSource || eventData?.confirmationSource || '',
        confirmedAssistantSwipeId: eventData?.confirmedAssistantSwipeId || eventData?.effectiveSwipeId || '',
        effectiveSwipeId: eventData?.effectiveSwipeId || eventData?.confirmedAssistantSwipeId || '',
        retries: 2,
        retryDelayMs: 120
      });
    }

    const character = await getCurrentCharacter();
    const api = getSillyTavernAPI();
    const stContext = api?.getContext?.() || null;
    const chatId = resolveStableChatId(api, stContext, character);
    const effectiveSwipeId = normalizeMessageIdentityValue(
      eventData?.effectiveSwipeId
      || eventData?.confirmedAssistantSwipeId
      || eventData?.sourceSwipeId
    ) || 'swipe:current';
    const slotBindingKey = buildSlotBindingKey({ chatId, messageId: explicitMessageId });
    const slotRevisionKey = buildSlotRevisionKey({
      chatId,
      messageId: explicitMessageId,
      effectiveSwipeId,
      assistantContentFingerprint: ''
    });

    return {
      triggeredAt: Date.now(),
      triggerEvent,
      traceId: eventData?.traceId || '',
      transactionKey: eventData?.transactionKey || '',
      confirmationSource: String(eventData?.confirmationSource || '').trim(),
      confirmedAssistantMessageId: explicitMessageId,
      chatId,
      messageId: explicitMessageId,
      generationTraceId: String(eventData?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '').trim(),
      confirmationMode: String(eventData?.confirmationMode || 'slot_revision').trim(),
      sameSlotRevisionCandidate: !!eventData?.sameSlotRevisionCandidate,
      sameSlotRevisionConfirmed: !!eventData?.sameSlotRevisionConfirmed,
      sameSlotRevisionSource: String(eventData?.sameSlotRevisionSource || '').trim(),
      rawGenerationType: triggerState.gateState.lastGenerationBaseline?.rawGenerationType || triggerState.gateState.lastGenerationType || '',
      rawGenerationParams: triggerState.gateState.lastGenerationBaseline?.rawGenerationParams ?? triggerState.gateState.lastGenerationParams ?? null,
      normalizedGenerationType: triggerState.gateState.lastGenerationBaseline?.normalizedGenerationType || triggerState.gateState.lastNormalizedGenerationType || '',
      generationAction: triggerState.gateState.lastGenerationBaseline?.generationAction || triggerState.gateState.lastGenerationAction || '',
      generationActionSource: triggerState.gateState.lastGenerationBaseline?.generationActionSource || triggerState.gateState.lastGenerationActionSource || '',
      generationMessageBindingSource: String(eventData?.generationMessageBindingSource || eventData?.confirmationSource || 'event_message_id').trim(),
      slotBindingKey,
      slotRevisionKey,
      slotTransactionId: buildSlotTransactionId({
        chatId,
        messageId: explicitMessageId,
        effectiveSwipeId,
        assistantContentFingerprint: '',
        eventType: triggerEvent,
        generationTraceId: String(eventData?.generationTraceId || triggerState.gateState.lastGenerationTraceId || '').trim(),
        traceId: eventData?.traceId || ''
      }),
      lastAiMessage: '',
      assistantContentFingerprint: '',
      lastAiMessageSwipeId: effectiveSwipeId,
      confirmedAssistantSwipeId: effectiveSwipeId,
      effectiveSwipeId,
      sourceMessageId: explicitMessageId,
      sourceSwipeId: effectiveSwipeId,
      userMessage: triggerState.gateState.lastUserMessageText || '',
      chatMessages: [],
      input: {
        userMessage: triggerState.gateState.lastUserMessageText || '',
        lastAiMessage: '',
        extractedContent: '',
        previousToolOutput: '',
        context: {
          character: character?.name || '',
          chatLength: 0
        }
      },
      config: {},
      status: 'pending',
      executionKey: slotRevisionKey
    };
  }

  const character = await getCurrentCharacter();
  const api = getSillyTavernAPI();
  const stContext = api?.getContext?.() || null;
  const preferredMessageId = normalizeMessageIdentityValue(
    eventData?.confirmedAssistantMessageId || extractEventMessageId(eventData, triggerEvent)
  );
  const confirmationSource = String(eventData?.confirmationSource || '').trim();
  const generationTraceId = String(
    eventData?.generationTraceId
    || triggerState.gateState.lastGenerationTraceId
    || ''
  ).trim();
  const resolvedBaseline = !isManual
    ? (await waitForResolvedTransactionBaseline({
        traceId: generationTraceId,
        retries: 2,
        retryDelayMs: 40
      }) || getCurrentGenerationBaseline())
    : getCurrentGenerationBaseline();
  const messageBinding = resolveGenerationMessageBinding(preferredMessageId);

  let confirmedAssistantMessage = null;
  let targetMessageId = normalizeMessageIdentityValue(messageBinding.preferredMessageId);

  if (!isManual) {
    confirmedAssistantMessage = await getConfirmedAssistantMessageWithRetries(targetMessageId, {
      retries: targetMessageId ? 3 : 8,
      retryDelayMs: targetMessageId ? 120 : 260,
      allowSameSlotRevision: true,
      requireObservedSameSlotRevision: !messageBinding.forceSameSlotRevision,
      forceSameSlotRevision: messageBinding.forceSameSlotRevision,
      forcedSameSlotSource: messageBinding.forcedSameSlotSource
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
  const assistantContentFingerprint = buildAssistantContentFingerprint(lastAiMessage?.content || '');
  const confirmedAssistantSwipeId = normalizeMessageIdentityValue(
    confirmedAssistantMessage?.swipeId
    || lastAiMessage?.swipeId
  );
  const slotBindingKey = buildSlotBindingKey({
    chatId: resolveStableChatId(api, stContext, character),
    messageId
  });
  const slotRevisionKey = buildSlotRevisionKey({
    chatId: resolveStableChatId(api, stContext, character),
    messageId,
    effectiveSwipeId: confirmedAssistantSwipeId,
    assistantContentFingerprint
  });
  const slotTransactionId = buildSlotTransactionId({
    chatId: resolveStableChatId(api, stContext, character),
    messageId,
    effectiveSwipeId: confirmedAssistantSwipeId,
    assistantContentFingerprint,
    eventType: triggerEvent,
    generationTraceId,
    traceId: eventData?.traceId || ''
  });
  
  return {
    triggeredAt: Date.now(),
    triggerEvent,
    traceId: eventData?.traceId || '',
    transactionKey: eventData?.transactionKey || '',
    confirmationSource,
    confirmedAssistantMessageId: messageId,
    chatId: resolveStableChatId(api, stContext, character),
    messageId,
    generationTraceId,
    confirmationMode: String(eventData?.confirmationMode || confirmedAssistantMessage?.confirmationMode || '').trim(),
    sameSlotRevisionCandidate: !!(eventData?.sameSlotRevisionCandidate ?? confirmedAssistantMessage?.sameSlotRevisionCandidate),
    sameSlotRevisionConfirmed: !!(eventData?.sameSlotRevisionConfirmed ?? confirmedAssistantMessage?.sameSlotRevisionConfirmed),
    sameSlotRevisionSource: String(eventData?.sameSlotRevisionSource || confirmedAssistantMessage?.sameSlotRevisionSource || '').trim(),
    rawGenerationType: triggerState.gateState.lastGenerationBaseline?.rawGenerationType || triggerState.gateState.lastGenerationType || '',
    rawGenerationParams: triggerState.gateState.lastGenerationBaseline?.rawGenerationParams ?? triggerState.gateState.lastGenerationParams ?? null,
    normalizedGenerationType: triggerState.gateState.lastGenerationBaseline?.normalizedGenerationType || triggerState.gateState.lastNormalizedGenerationType || '',
    generationAction: triggerState.gateState.lastGenerationBaseline?.generationAction || triggerState.gateState.lastGenerationAction || '',
    generationActionSource: triggerState.gateState.lastGenerationBaseline?.generationActionSource || triggerState.gateState.lastGenerationActionSource || '',
    generationMessageBindingSource: messageBinding.bindingSource || '',
    slotBindingKey,
    slotRevisionKey,
    slotTransactionId,
    lastAiMessage: lastAiMessage?.content || '',
    assistantContentFingerprint,
    lastAiMessageSwipeId: confirmedAssistantSwipeId,
    confirmedAssistantSwipeId,
    effectiveSwipeId: confirmedAssistantSwipeId,
    sourceMessageId: messageId,
    sourceSwipeId: confirmedAssistantSwipeId,
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
    status: 'pending',
    executionKey: slotRevisionKey
  };
}

/**
 * 获取需要执行的工具列表
 * @param {string} eventType 事件类型
 * @returns {Array} 需要执行的工具配置列表
 */
function getToolsToExecute(eventType) {
  const enabledTools = getEnabledTools();

  return enabledTools.filter((tool) => {
    const matchesNewTrigger = tool?.trigger?.enabled && tool?.trigger?.event === eventType;
    const matchesLegacyTrigger = Array.isArray(tool?.triggerEvents) && tool.triggerEvents.includes(eventType);

    return (matchesNewTrigger || matchesLegacyTrigger)
      && toolOutputService.shouldRunPostResponse(tool);
  });
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
  const executionKey = context?.executionKey || '';

  updateRuntime(toolId, {
    lastStatus: 'running',
    lastError: '',
    lastDurationMs: 0,
    lastTraceId: context?.traceId || '',
    lastTriggerAt: startedAt,
    lastTriggerEvent: context?.triggerEvent || EVENT_TYPES.GENERATION_ENDED,
    lastMessageKey: messageKey,
    lastExecutionKey: executionKey,
    lastSkipReason: '',
    lastExecutionPath: executionPath,
    lastWritebackStatus: '',
    lastFailureStage: '',
    lastSlotBindingKey: context?.slotBindingKey || '',
    lastSlotRevisionKey: context?.slotRevisionKey || '',
    lastSlotTransactionId: context?.slotTransactionId || '',
    lastSourceMessageId: context?.sourceMessageId || context?.messageId || '',
    lastSourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
    lastContentCommitted: false,
    lastHostCommitApplied: false,
    lastRefreshRequested: false,
    lastRefreshConfirmed: false,
    lastPreferredCommitMethod: '',
    lastAppliedCommitMethod: '',
    lastRefreshMethodCount: 0,
    lastRefreshMethods: [],
    lastRefreshConfirmChecks: 0,
    lastRefreshConfirmedBy: ''
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
      const writebackDetails = result?.meta?.writebackDetails || {};
      updateRuntime(toolId, {
        lastStatus: 'success',
        lastError: '',
        lastDurationMs: duration,
        lastTraceId: context?.traceId || '',
        successCount: (config?.runtime?.successCount || 0) + 1,
        lastTriggerAt: startedAt,
        lastTriggerEvent: context?.triggerEvent || EVENT_TYPES.GENERATION_ENDED,
        lastMessageKey: messageKey,
        lastExecutionKey: executionKey,
        lastSkipReason: '',
        lastExecutionPath: executionPath,
        lastWritebackStatus: result?.meta?.writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
        lastFailureStage: result?.meta?.failureStage || '',
        lastSlotBindingKey: context?.slotBindingKey || '',
        lastSlotRevisionKey: context?.slotRevisionKey || '',
        lastSlotTransactionId: context?.slotTransactionId || '',
        lastSourceMessageId: context?.sourceMessageId || context?.messageId || '',
        lastSourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
        lastContentCommitted: !!writebackDetails.contentCommitted,
        lastHostCommitApplied: !!writebackDetails.hostCommitApplied,
        lastRefreshRequested: !!writebackDetails.refreshRequested,
        lastRefreshConfirmed: !!writebackDetails.refreshConfirmed,
        lastPreferredCommitMethod: writebackDetails?.commit?.preferredMethod || '',
        lastAppliedCommitMethod: writebackDetails?.commit?.appliedMethod || '',
        lastRefreshMethodCount: Array.isArray(writebackDetails?.refresh?.requestMethods)
          ? writebackDetails.refresh.requestMethods.length
          : 0,
        lastRefreshMethods: Array.isArray(writebackDetails?.refresh?.requestMethods)
          ? [...writebackDetails.refresh.requestMethods]
          : [],
        lastRefreshConfirmChecks: Number(writebackDetails?.refresh?.confirmChecks) || 0,
        lastRefreshConfirmedBy: writebackDetails?.refresh?.confirmedBy || ''
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
    const writebackDetails = result?.meta?.writebackDetails || {};

    updateRuntime(toolId, {
      lastStatus: 'error',
      lastError: errorMessage,
      lastDurationMs: duration,
      lastTraceId: context?.traceId || '',
      errorCount: (config?.runtime?.errorCount || 0) + 1,
      lastTriggerAt: startedAt,
      lastTriggerEvent: context?.triggerEvent || EVENT_TYPES.GENERATION_ENDED,
      lastMessageKey: messageKey,
      lastExecutionKey: executionKey,
      lastSkipReason: '',
      lastExecutionPath: executionPath,
      lastWritebackStatus: result?.meta?.writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: result?.meta?.failureStage || (executionPath === TOOL_EXECUTION_PATHS.MANUAL_COMPATIBILITY
        ? TOOL_FAILURE_STAGES.COMPATIBILITY_EXECUTE
        : TOOL_FAILURE_STAGES.UNKNOWN),
      lastSlotBindingKey: context?.slotBindingKey || '',
      lastSlotRevisionKey: context?.slotRevisionKey || '',
      lastSlotTransactionId: context?.slotTransactionId || '',
      lastSourceMessageId: context?.sourceMessageId || context?.messageId || '',
      lastSourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
      lastContentCommitted: !!writebackDetails.contentCommitted,
      lastHostCommitApplied: !!writebackDetails.hostCommitApplied,
      lastRefreshRequested: !!writebackDetails.refreshRequested,
      lastRefreshConfirmed: !!writebackDetails.refreshConfirmed,
      lastPreferredCommitMethod: writebackDetails?.commit?.preferredMethod || '',
      lastAppliedCommitMethod: writebackDetails?.commit?.appliedMethod || '',
      lastRefreshMethodCount: Array.isArray(writebackDetails?.refresh?.requestMethods)
        ? writebackDetails.refresh.requestMethods.length
        : 0,
      lastRefreshMethods: Array.isArray(writebackDetails?.refresh?.requestMethods)
        ? [...writebackDetails.refresh.requestMethods]
        : [],
      lastRefreshConfirmChecks: Number(writebackDetails?.refresh?.confirmChecks) || 0,
      lastRefreshConfirmedBy: writebackDetails?.refresh?.confirmedBy || ''
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
      lastExecutionKey: executionKey,
      lastSkipReason: '',
      lastExecutionPath: executionPath,
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: executionPath === TOOL_EXECUTION_PATHS.MANUAL_COMPATIBILITY
        ? TOOL_FAILURE_STAGES.COMPATIBILITY_EXECUTE
        : TOOL_FAILURE_STAGES.UNKNOWN,
      lastSlotBindingKey: context?.slotBindingKey || '',
      lastSlotRevisionKey: context?.slotRevisionKey || '',
      lastSlotTransactionId: context?.slotTransactionId || '',
      lastSourceMessageId: context?.sourceMessageId || context?.messageId || '',
      lastSourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
      lastContentCommitted: false,
      lastHostCommitApplied: false,
      lastRefreshRequested: false,
      lastRefreshConfirmed: false,
      lastPreferredCommitMethod: '',
      lastAppliedCommitMethod: '',
      lastRefreshMethodCount: 0,
      lastRefreshMethods: [],
      lastRefreshConfirmChecks: 0,
      lastRefreshConfirmedBy: ''
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
      lastExecutionKey: '',
      lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.TOOL_DISABLED,
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: '',
      lastContentCommitted: false,
      lastHostCommitApplied: false,
      lastRefreshRequested: false,
      lastRefreshConfirmed: false,
      lastPreferredCommitMethod: '',
      lastAppliedCommitMethod: '',
      lastRefreshMethodCount: 0,
      lastRefreshMethods: [],
      lastRefreshConfirmChecks: 0,
      lastRefreshConfirmedBy: ''
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
  for (const timer of toolTriggerManagerState.pendingTransactionTimers.values()) {
    clearTimeout(timer);
  }
  toolTriggerManagerState.pendingTransactionTimers.clear();

  for (const unregister of toolTriggerManagerState.listeners.values()) {
    if (typeof unregister === 'function') {
      unregister();
    }
  }
  toolTriggerManagerState.listeners.clear();
  for (const unsubscribe of toolTriggerManagerState.internalSubscriptions) {
    if (typeof unsubscribe === 'function') {
      unsubscribe();
    }
  }
  toolTriggerManagerState.internalSubscriptions = [];
  toolTriggerManagerState.activeTransactions.clear();
  toolTriggerManagerState.handledExecutionKeys.clear();
  toolTriggerManagerState.writebackGuards.clear();
  toolTriggerManagerState.recentTransactionHistory = [];
  toolTriggerManagerState.recentEventTimeline = [];
  toolTriggerManagerState.initialized = false;
  toolTriggerManagerState.lastExecutionContext = null;
  toolTriggerManagerState.lastHandledMessageKey = '';
  toolTriggerManagerState.lastHandledExecutionKey = '';
  toolTriggerManagerState.lastHandledSlotRevisionKey = '';
  toolTriggerManagerState.lastAutoTriggerSnapshot = null;
  toolTriggerManagerState.lastEventDebugSnapshot = null;
  toolTriggerManagerState.lastDuplicateMessageKey = '';
  toolTriggerManagerState.lastDuplicateExecutionKey = '';
  toolTriggerManagerState.lastDuplicateMessageAt = 0;

  log('工具触发管理器已销毁');
}

/**
 * 获取工具触发管理器状态
 * @returns {Object} 状态对象
 */
export function getToolTriggerManagerState() {
  const recentHandledExecutionKeys = getRecentHandledExecutionKeys(8);
  const activeTransactions = Array.from(toolTriggerManagerState.activeTransactions.values())
    .map(cloneDiagnosticEntryForOutput)
    .filter(Boolean)
    .sort((left, right) => (Number(left?.updatedAt) || 0) - (Number(right?.updatedAt) || 0));
  const recentTransactionHistory = [...toolTriggerManagerState.recentTransactionHistory]
    .map(cloneDiagnosticEntryForOutput)
    .filter(Boolean);
  const recentEventTimeline = [...toolTriggerManagerState.recentEventTimeline]
    .map(cloneTimelineEntryForOutput)
    .filter(Boolean);

  return {
    initialized: toolTriggerManagerState.initialized,
    listenersCount: toolTriggerManagerState.listeners.size,
    activeSessionCount: toolTriggerManagerState.activeTransactions.size,
    activeSessions: activeTransactions,
    activeTransactionCount: toolTriggerManagerState.activeTransactions.size,
    activeTransactions,
    recentSessionHistory: recentTransactionHistory,
    recentTransactionHistory,
    recentEventTimeline,
    lastExecutionContext: toolTriggerManagerState.lastExecutionContext,
    lastAutoTriggerSnapshot: toolTriggerManagerState.lastAutoTriggerSnapshot,
    lastEventDebugSnapshot: toolTriggerManagerState.lastEventDebugSnapshot,
    registeredEvents: Array.from(toolTriggerManagerState.listeners.keys()),
    pendingTimerCount: toolTriggerManagerState.pendingTransactionTimers.size,
    pendingTransactionCount: toolTriggerManagerState.pendingTransactionTimers.size,
    lastHandledMessageKey: toolTriggerManagerState.lastHandledMessageKey,
    lastHandledExecutionKey: toolTriggerManagerState.lastHandledExecutionKey,
    lastHandledSlotRevisionKey: toolTriggerManagerState.lastHandledSlotRevisionKey,
    lastDuplicateExecutionKey: toolTriggerManagerState.lastDuplicateExecutionKey,
    writebackGuardCount: toolTriggerManagerState.writebackGuards.size,
    handledExecutionKeyCount: toolTriggerManagerState.handledExecutionKeys.size,
    recentHandledExecutionKeys,
    lastSlotBindingKey: toolTriggerManagerState.lastExecutionContext?.slotBindingKey || '',
    lastSlotTransactionId: toolTriggerManagerState.lastExecutionContext?.slotTransactionId || '',
    lastSourceMessageId: toolTriggerManagerState.lastExecutionContext?.sourceMessageId || '',
    lastSourceSwipeId: toolTriggerManagerState.lastExecutionContext?.sourceSwipeId || '',
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
  const recentHandledExecutionKeys = getRecentHandledExecutionKeys(historyLimit);
  const baseline = triggerState.gateState.lastGenerationBaseline;

  const activeTransactions = Array.from(toolTriggerManagerState.activeTransactions.values())
    .map(cloneDiagnosticEntryForOutput)
    .filter(Boolean)
    .sort((left, right) => (Number(left?.updatedAt) || 0) - (Number(right?.updatedAt) || 0));

  const recentTransactionHistory = trimManagerHistoryEntries([
    ...toolTriggerManagerState.recentTransactionHistory
  ], historyLimit).map(cloneDiagnosticEntryForOutput);
  const recentEventTimeline = trimManagerHistoryEntries([
    ...toolTriggerManagerState.recentEventTimeline
  ], Math.max(historyLimit * 3, historyLimit)).map(cloneTimelineEntryForOutput);

  const phaseCounts = {
    activeSessions: buildDiagnosticPhaseCounts(activeTransactions),
    recentSessionHistory: buildDiagnosticPhaseCounts(recentTransactionHistory)
  };

  const consistency = {
    activeSessions: buildDiagnosticDriftSummary(activeTransactions),
    recentSessionHistory: buildDiagnosticDriftSummary(recentTransactionHistory)
  };

  const verdictHints = buildAutoTriggerVerdictHints({
    summary: {
      listenerSettings: getResolvedListenerSettings()
    },
    activeSessions: activeTransactions,
    recentSessionHistory: recentTransactionHistory,
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
      activeSessionCount: toolTriggerManagerState.activeTransactions.size,
      activeTransactionCount: toolTriggerManagerState.activeTransactions.size,
      pendingTimerCount: toolTriggerManagerState.pendingTransactionTimers.size,
      pendingTransactionCount: toolTriggerManagerState.pendingTransactionTimers.size,
      lastHandledMessageKey: toolTriggerManagerState.lastHandledMessageKey || '',
      lastHandledExecutionKey: toolTriggerManagerState.lastHandledExecutionKey || '',
      lastHandledSlotRevisionKey: toolTriggerManagerState.lastHandledSlotRevisionKey || '',
      lastDuplicateMessageKey: toolTriggerManagerState.lastDuplicateMessageKey || '',
      lastDuplicateExecutionKey: toolTriggerManagerState.lastDuplicateExecutionKey || '',
      handledExecutionKeyCount: toolTriggerManagerState.handledExecutionKeys.size,
      recentHandledExecutionKeys,
      writebackGuardCount: toolTriggerManagerState.writebackGuards.size,
      lastSlotBindingKey: toolTriggerManagerState.lastExecutionContext?.slotBindingKey || '',
      lastSlotRevisionKey: toolTriggerManagerState.lastExecutionContext?.slotRevisionKey || '',
      lastSlotTransactionId: toolTriggerManagerState.lastExecutionContext?.slotTransactionId || '',
      lastGenerationMessageBindingSource: toolTriggerManagerState.lastExecutionContext?.generationMessageBindingSource || '',
      lastSourceMessageId: toolTriggerManagerState.lastExecutionContext?.sourceMessageId || '',
      lastSourceSwipeId: toolTriggerManagerState.lastExecutionContext?.sourceSwipeId || '',
      lastConfirmedAssistantSwipeId: toolTriggerManagerState.lastExecutionContext?.confirmedAssistantSwipeId || '',
      lastEffectiveSwipeId: toolTriggerManagerState.lastExecutionContext?.effectiveSwipeId || '',
      lastConfirmedAssistantMessageId: toolTriggerManagerState.lastExecutionContext?.confirmedAssistantMessageId || '',
      registeredEvents: Array.from(toolTriggerManagerState.listeners.keys()),
      listenerSettings: getResolvedListenerSettings(),
      eventBridge: buildEventBridgeDiagnosticSummary(),
      gateState: buildGateStateDiagnosticSummary(),
      phaseCounts,
      consistency,
      verdictHints,
      ...getCurrentGenerationDiagnosticFields()
    },
    activeSessions: activeTransactions,
    activeTransactions,
    recentSessionHistory: recentTransactionHistory,
    recentTransactionHistory,
    recentEventTimeline,
    recentHandledExecutionKeys,
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

export function getGenerationTransactionDiagnostics(options = {}) {
  const autoDiagnostics = getAutoTriggerDiagnostics(options);
  const transactionDiagnostics = buildTransactionDiagnostics(
    autoDiagnostics.activeTransactions,
    autoDiagnostics.recentTransactionHistory
  );

  return {
    summary: {
      generationTraceId: autoDiagnostics.summary?.generationTraceId || '',
      generationType: autoDiagnostics.summary?.generationType || '',
      generationDryRun: !!autoDiagnostics.summary?.generationDryRun,
      isGenerating: !!autoDiagnostics.summary?.isGenerating,
      activeTransactionCount: transactionDiagnostics.activeTransactionCount,
      pendingTransactionCount: transactionDiagnostics.pendingTransactionCount,
      lastHandledExecutionKey: transactionDiagnostics.lastHandledExecutionKey,
      lastHandledSlotRevisionKey: transactionDiagnostics.lastHandledSlotRevisionKey,
      handledExecutionKeyCount: transactionDiagnostics.handledExecutionKeyCount,
      recentHandledExecutionKeys: transactionDiagnostics.recentHandledExecutionKeys,
      lastExecutionContext: transactionDiagnostics.lastExecutionContext,
      lastEventDebugSnapshot: transactionDiagnostics.lastEventDebugSnapshot,
      lastAutoTriggerSnapshot: transactionDiagnostics.lastAutoTriggerSnapshot,
      listenerSettings: autoDiagnostics.summary?.listenerSettings || getResolvedListenerSettings(),
      eventBridge: autoDiagnostics.summary?.eventBridge || buildEventBridgeDiagnosticSummary(),
      gateState: autoDiagnostics.summary?.gateState || buildGateStateDiagnosticSummary(),
      phaseCounts: autoDiagnostics.summary?.phaseCounts || {},
      consistency: autoDiagnostics.summary?.consistency || {},
      verdictHints: autoDiagnostics.verdictHints || autoDiagnostics.summary?.verdictHints || [],
      ...getCurrentGenerationDiagnosticFields()
    },
    activeTransactions: transactionDiagnostics.activeTransactions,
    recentTransactionHistory: transactionDiagnostics.recentTransactionHistory,
    recentEventTimeline: autoDiagnostics.recentEventTimeline,
    recentHandledExecutionKeys: transactionDiagnostics.recentHandledExecutionKeys,
    verdictHints: autoDiagnostics.verdictHints,
    lastExecutionContext: transactionDiagnostics.lastExecutionContext,
    lastEventDebugSnapshot: transactionDiagnostics.lastEventDebugSnapshot,
    lastAutoTriggerSnapshot: transactionDiagnostics.lastAutoTriggerSnapshot,
    compatibility: {
      activeSessions: autoDiagnostics.activeSessions,
      recentSessionHistory: autoDiagnostics.recentSessionHistory
    }
  };
}

export function exportGenerationTransactionDiagnostics(options = {}) {
  const diagnostics = getGenerationTransactionDiagnostics(options);
  return JSON.parse(JSON.stringify({
    exportedAt: Date.now(),
    schemaVersion: 'generation-transaction-diagnostics.v1',
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
      const generationAction = resolveGenerationAction(type, params || null);
      const generationUserIntent = resolveGenerationUserIntent(type, params || null, startedAt);
      const startedByUserIntent = generationUserIntent.startedByUserIntent;
      const userIntentDetectedAt = generationUserIntent.userIntentDetectedAt;
      const userIntentSource = generationUserIntent.userIntentSource;
      const userIntentDetail = generationUserIntent.userIntentDetail;
      const provisionalBaseline = createProvisionalTransactionBaseline({
        traceId,
        startedAt,
        type,
        params: params || null,
        rawGenerationType: generationAction.rawGenerationType,
        rawGenerationParams: generationAction.rawGenerationParams,
        normalizedGenerationType: generationAction.normalizedGenerationType,
        generationAction: generationAction.generationAction,
        generationActionSource: generationAction.generationActionSource,
        explicitGenerationAction: generationAction.explicitGenerationAction,
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
        lastGenerationType: generationAction.rawGenerationType || type,
        lastGenerationParams: params || null,
        lastNormalizedGenerationType: generationAction.normalizedGenerationType || '',
        lastGenerationAction: generationAction.generationAction || '',
        lastGenerationActionSource: generationAction.generationActionSource || '',
        lastGenerationDryRun: !!dryRun,
        isGenerating: true,
        lastGenerationBaseline: provisionalBaseline
      });
      log(`生成开始: ${type}`);
      traceAlways('info', '收到生成开始事件', {
        type,
        dryRun: !!dryRun,
        params: params || null,
        generationAction: generationAction.generationAction,
        generationActionSource: generationAction.generationActionSource,
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
        detail: generationAction.generationAction || normalizeGenerationType(type, params || null),
        generationTraceId: traceId,
        baselineResolved: false,
        generationStartedByUserIntent: startedByUserIntent,
        generationUserIntentSource: userIntentSource
      });

      captureGenerationTransactionBaseline({
        traceId,
        startedAt,
        type,
        params: params || null,
        rawGenerationType: generationAction.rawGenerationType,
        rawGenerationParams: generationAction.rawGenerationParams,
        normalizedGenerationType: generationAction.normalizedGenerationType,
        generationAction: generationAction.generationAction,
        generationActionSource: generationAction.generationActionSource,
        explicitGenerationAction: generationAction.explicitGenerationAction,
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
        generationTraceId: triggerState.gateState.lastGenerationTraceId || '',
        detail: triggerState.gateState.lastGenerationAction || triggerState.gateState.lastNormalizedGenerationType || ''
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