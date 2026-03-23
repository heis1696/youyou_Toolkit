/**
 * YouYou Toolkit - 事件触发模块
 * @description 处理SillyTavern事件监听、门控检查和上下文获取
 */

import { eventBus, EVENTS } from './core/event-bus.js';
import { settingsService } from './core/settings-service.js';
import { getToolFullConfig, updateToolRuntime, patchToolRuntime } from './tool-registry.js';
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
    lastUserMessageId: null,
    lastUserMessageText: '',
    lastUserMessageAt: 0,
    lastGenerationType: null,
    lastGenerationParams: null,
    lastGenerationDryRun: false,
    lastGenerationAt: 0,
    isGenerating: false
  },
  
  // 是否已初始化
  isInitialized: false,
  
  // 调试模式
  debugMode: false
};

export const AUTO_TRIGGER_SKIP_REASONS = {
  QUIET_GENERATION: 'quiet_generation',
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
function buildConversationSnapshot(rawMessages, preferredMessageId = null) {
  const chat = Array.isArray(rawMessages) ? rawMessages : [];
  const normalizedMessages = chat.map((message, index) => ({
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

  const normalizedPreferredId = preferredMessageId === undefined || preferredMessageId === null || preferredMessageId === ''
    ? null
    : String(preferredMessageId).trim();

  let lastAiMessage = null;
  let lastUserMessage = null;

  for (let index = normalizedMessages.length - 1; index >= 0; index -= 1) {
    const message = normalizedMessages[index];

    if (!lastAiMessage && message.role === 'assistant' && isMeaningfulAssistantContent(message.content)) {
      if (!normalizedPreferredId || String(message.sourceId).trim() === normalizedPreferredId || message.chatIndex === Number(normalizedPreferredId)) {
        lastAiMessage = message;
      } else if (!lastAiMessage) {
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
    retryDelayMs = 250
  } = options;

  let snapshot = { messages: [], lastUserMessage: null, lastAiMessage: null };

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const rawMessages = await getRawChatMessages();
    snapshot = buildConversationSnapshot(rawMessages, preferredMessageId);

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
function markUserSendIntent() {
  updateGateState({
    lastUserSendIntentAt: Date.now()
  });
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

/**
 * 获取事件源
 */
function getEventSource() {
  const topWindow = getTopWindow();
  const api = topWindow.SillyTavern;
  
  if (api && api.eventSource) {
    return api.eventSource;
  }
  
  return null;
}

/**
 * 获取事件类型常量
 */
function getEventTypes() {
  const topWindow = getTopWindow();
  const api = topWindow.SillyTavern;
  
  if (api && api.eventTypes) {
    return api.eventTypes;
  }
  
  // 回退到本地定义
  return EVENT_TYPES;
}

/**
 * 日志输出
 */
function log(...args) {
  if (triggerState.debugMode || settingsService.getDebugSettings()?.enableDebugLog) {
    console.log('[YouYouToolkit:Trigger]', ...args);
  }
}

function createAutoTriggerSnapshot(snapshot = {}) {
  return {
    triggerEvent: '',
    messageId: '',
    messageKey: '',
    selectedToolIds: [],
    skipReason: '',
    lockedAiMessageId: '',
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
      // 门控检查
      if (options.gateCheck && !await checkGate(options.gateCheck)) {
        log(`门控检查失败，跳过事件: ${eventType}`);
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
  } else {
    // 回退到DOM事件
    const topWindow = getTopWindow();
    if (topWindow.addEventListener) {
      topWindow.addEventListener(stEventType, wrappedCallback);
      log(`已注册DOM事件监听器: ${eventType}`);
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
    
    if (eventSource && typeof eventSource.off === 'function') {
      eventSource.off(stEventType, callback);
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
      if (eventSource && typeof eventSource.off === 'function') {
        eventSource.off(stEventType, callback);
      } else {
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
    lastUserMessageId: null,
    lastUserMessageText: '',
    lastUserMessageAt: 0,
    lastGenerationType: null,
    lastGenerationParams: null,
    lastGenerationDryRun: false,
    lastGenerationAt: 0,
    isGenerating: false
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
  lastExecutionContext: null,
  lastHandledMessageKey: '',
  pendingMessageTimers: new Map(),
  lastAutoTriggerSnapshot: null
};

/**
 * 自动工具主链说明：
 * 1. tool-trigger 负责监听宿主事件、门控、上下文构建
 * 2. tool-output-service 负责构建额外模型请求、执行请求、处理输出并写回楼层
 * 3. executeToolWithConfig 仅保留为兼容执行回退路径，主要用于非 post_response_api 的 legacy/manual 场景
 */

function scheduleAutoTrigger(eventType, data, delayMs = 0) {
  const timerKey = `${eventType}::${typeof data === 'object' ? (data?.messageId || data?.id || 'latest') : String(data ?? 'latest')}`;
  const existingTimer = toolTriggerManagerState.pendingMessageTimers.get(timerKey);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  const timer = setTimeout(async () => {
    toolTriggerManagerState.pendingMessageTimers.delete(timerKey);
    await handleAutoTrigger(eventType, data);
  }, delayMs);

  toolTriggerManagerState.pendingMessageTimers.set(timerKey, timer);
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

  const candidateTools = getToolsToExecute(EVENT_TYPES.GENERATION_ENDED);
  const candidateToolIds = candidateTools.map(tool => tool.id);

  if (isQuietLikeGeneration(
    triggerState.gateState.lastGenerationType,
    triggerState.gateState.lastGenerationParams,
    triggerState.gateState.lastGenerationDryRun
  )) {
    log('检测到 quiet / dryRun 生成，跳过工具自动执行');
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      selectedToolIds: candidateToolIds,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION
    });
    patchToolsDiagnostics(candidateTools, {
      lastTriggerEvent: eventType,
      lastMessageKey: '',
      lastSkipReason: AUTO_TRIGGER_SKIP_REASONS.QUIET_GENERATION,
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: ''
    });
    return;
  }

  const context = await buildToolExecutionContext({
    ...(typeof data === 'object' && data ? data : {}),
    triggerEvent: eventType,
    messageId: (typeof data === 'string' || typeof data === 'number')
      ? data
      : (data?.messageId || data?.id || '')
  });

  if (!context?.lastAiMessage) {
    log(`${eventType} 后未读取到最新 AI 回复，跳过工具执行`);
    const messageKey = getAutoTriggerMessageKey(context || {});
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      messageId: context?.messageId || '',
      messageKey,
      selectedToolIds: candidateToolIds,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.MISSING_AI_MESSAGE,
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
    return;
  }

  const messageKey = getAutoTriggerMessageKey(context);
  if (toolTriggerManagerState.lastHandledMessageKey === messageKey) {
    log(`检测到重复自动触发，跳过: ${messageKey}`);
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      messageId: context?.messageId || '',
      messageKey,
      selectedToolIds: candidateToolIds,
      skipReason: AUTO_TRIGGER_SKIP_REASONS.DUPLICATE_MESSAGE,
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
    return;
  }

  const toolsToExecute = candidateTools;
  if (toolsToExecute.length === 0) {
    log('没有需要执行的工具');
    saveAutoTriggerSnapshot({
      triggerEvent: eventType,
      messageId: context?.messageId || '',
      messageKey,
      selectedToolIds: [],
      skipReason: AUTO_TRIGGER_SKIP_REASONS.NO_ELIGIBLE_TOOLS,
      lockedAiMessageId: context?.messageId || ''
    });
    return;
  }

  toolTriggerManagerState.lastHandledMessageKey = messageKey;
  context.messageKey = messageKey;
  saveAutoTriggerSnapshot({
    triggerEvent: eventType,
    messageId: context?.messageId || '',
    messageKey,
    selectedToolIds: toolsToExecute.map(tool => tool.id),
    skipReason: '',
    lockedAiMessageId: context?.messageId || ''
  });
  log(`需要执行 ${toolsToExecute.length} 个工具:`, toolsToExecute.map(t => t.id));
  showTopNotice('info', `检测到 AI 回复，开始自动执行 ${toolsToExecute.length} 个工具`, {
    duration: 2400,
    noticeId: 'yyt-tool-batch-start'
  });

  for (const tool of toolsToExecute) {
    try {
      const result = await executeTriggeredTool(tool, context);

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
    await handleAutoTrigger(EVENT_TYPES.GENERATION_ENDED, data);
  });

  const generationAfterCommandsListener = registerEventListener(EVENT_TYPES.GENERATION_AFTER_COMMANDS, async (data) => {
    scheduleAutoTrigger(EVENT_TYPES.GENERATION_AFTER_COMMANDS, data, 180);
  });

  const messageReceivedListener = registerEventListener(EVENT_TYPES.MESSAGE_RECEIVED, async (data) => {
    scheduleAutoTrigger(EVENT_TYPES.MESSAGE_RECEIVED, data, 420);
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
  const preferredMessageId = (typeof eventData === 'string' || typeof eventData === 'number')
    ? eventData
    : (eventData?.messageId || eventData?.id || '');
  const triggerEvent = eventData?.triggerEvent || 'GENERATION_ENDED';

  const conversation = await getConversationSnapshot({
    preferredMessageId,
    retries: triggerEvent === 'MANUAL' || triggerEvent === 'MANUAL_PREVIEW' ? 2 : 8,
    retryDelayMs: triggerEvent === 'MANUAL' || triggerEvent === 'MANUAL_PREVIEW' ? 120 : 260
  });

  const messages = conversation.messages || [];
  const lastUserMessage = conversation.lastUserMessage;
  const lastAiMessage = conversation.lastAiMessage;
  const messageId = lastAiMessage?.sourceId ?? preferredMessageId ?? '';
  
  return {
    triggeredAt: Date.now(),
    triggerEvent,
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
    triggerEvent: context?.triggerEvent || 'GENERATION_ENDED',
    context
  });

  showTopNotice('info', `${isManual ? '正在手动执行' : '已检测到 AI 回复，正在自动执行'} ${tool.name}`, {
    sticky: true,
    noticeId
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
      return { success: true, duration, result };
    }

    const config = getToolFullConfig(toolId);
    const errorMessage = result?.error || '工具执行失败';

    updateRuntime(toolId, {
      lastStatus: 'error',
      lastError: errorMessage,
      lastDurationMs: duration,
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
    return { success: false, duration, error: errorMessage, result };
  } catch (error) {
    const duration = Date.now() - startedAt;
    const config = getToolFullConfig(toolId);
    const errorMessage = error?.message || String(error);

    updateRuntime(toolId, {
      lastStatus: 'error',
      lastError: errorMessage,
      lastDurationMs: duration,
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

  for (const [eventType, listener] of toolTriggerManagerState.listeners) {
    unregisterEventListener(eventType, listener);
  }
  toolTriggerManagerState.listeners.clear();
  toolTriggerManagerState.initialized = false;
  toolTriggerManagerState.lastExecutionContext = null;
  toolTriggerManagerState.lastHandledMessageKey = '';
  toolTriggerManagerState.lastAutoTriggerSnapshot = null;
  
  log('工具触发管理器已销毁');
}

/**
 * 获取工具触发管理器状态
 * @returns {Object} 状态对象
 */
export function getToolTriggerManagerState() {
  return {
    initialized: toolTriggerManagerState.initialized,
    listenersCount: toolTriggerManagerState.listeners.size,
    lastExecutionContext: toolTriggerManagerState.lastExecutionContext,
    lastAutoTriggerSnapshot: toolTriggerManagerState.lastAutoTriggerSnapshot
  };
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
    return;
  }
  
  // 获取SillyTavern API
  const api = getSillyTavernAPI();
  if (!api) {
    log('无法获取SillyTavern API，延迟初始化');
    setTimeout(initTriggerModule, 1000);
    return;
  }

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
        lastUserMessageId: messageId,
        lastUserMessageAt: Date.now(),
        lastUserMessageText: lastUserMessage?.content || triggerState.gateState.lastUserMessageText || ''
      });
      log(`用户消息已发送: ${messageId}`);
    });
  
  // 监听生成开始事件
  registerEventListener(EVENT_TYPES.GENERATION_STARTED, (type, params, dryRun) => {
      updateGateState({
        lastGenerationType: type,
        lastGenerationParams: params || null,
        lastGenerationDryRun: !!dryRun,
        isGenerating: true
      });
      log(`生成开始: ${type}`);
    });
  
  // 监听生成结束事件
  registerEventListener(EVENT_TYPES.GENERATION_ENDED, () => {
      updateGateState({
        lastGenerationAt: Date.now(),
        isGenerating: false
      });
      log('生成结束');
    });
  
  // 初始化工具触发管理器
  initToolTriggerManager();
  
  triggerState.isInitialized = true;
  log('触发模块初始化完成');
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