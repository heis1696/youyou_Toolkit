/**
 * YouYou Toolkit - 事件触发模块
 * @description 处理SillyTavern事件监听、门控检查和上下文获取
 */

import { eventBus, EVENTS } from './core/event-bus.js';
import { getToolFullConfig, updateToolRuntime } from './tool-registry.js';
import { executeToolWithConfig, getToolsForEvent } from './tool-executor.js';
import { toolOutputService, OUTPUT_MODES } from './tool-output-service.js';
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
    lastUserMessageId: null,
    lastUserMessageText: '',
    lastUserMessageAt: 0,
    lastGenerationType: null,
    lastGenerationAt: 0,
    isGenerating: false
  },
  
  // 是否已初始化
  isInitialized: false,
  
  // 调试模式
  debugMode: false
};

// ============================================================
// 工具函数
// ============================================================

/**
 * 获取顶层窗口
 */
function getTopWindow() {
  return (typeof window.parent !== 'undefined' ? window.parent : window);
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
  if (triggerState.debugMode) {
    console.log('[YouYouToolkit:Trigger]', ...args);
  }
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
    lastUserMessageId: null,
    lastUserMessageText: '',
    lastUserMessageAt: 0,
    lastGenerationType: null,
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
        messages.push({
          role,
          content: msg.mes || msg.content || '',
          name: msg.name || '',
          timestamp: msg.send_date || msg.timestamp,
          isSystem: !!msg.is_system,
          isUser: !!msg.is_user
        });
      } else {
        messages.push(msg.mes || msg.content || '');
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
  lastExecutionContext: null
};

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
  const eventType = EVENT_TYPES.GENERATION_ENDED;
  
  const listener = registerEventListener(eventType, async (data) => {
    log('GENERATION_ENDED触发:', data);
    
    // 获取上下文
    const context = await buildToolExecutionContext(data);
    
    // 获取需要触发的工具
    const toolsToExecute = getToolsToExecute(eventType);
    
    if (toolsToExecute.length === 0) {
      log('没有需要执行的工具');
      return;
    }
    
    log(`需要执行 ${toolsToExecute.length} 个工具:`, toolsToExecute.map(t => t.id));
    showTopNotice('info', `检测到 AI 回复，开始自动执行 ${toolsToExecute.length} 个工具`, {
      duration: 2400,
      noticeId: 'yyt-tool-batch-start'
    });
    
    // 执行工具
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
  });
  
  toolTriggerManagerState.listeners.set(eventType, listener);
}

/**
 * 构建工具执行上下文
 * @param {Object} eventData 事件数据
 * @returns {Promise<Object>} 执行上下文
 */
async function buildToolExecutionContext(eventData) {
  const chat = await getChatContext({ depth: 50 });
  const character = await getCurrentCharacter();
  const api = getSillyTavernAPI();
  const stContext = api?.getContext?.() || null;
  
  // 获取最后一条用户消息和AI消息
  const messages = chat?.messages || [];
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  const lastAiMessage = messages.filter(m => m.role === 'assistant').pop();
  
  return {
    triggeredAt: Date.now(),
    triggerEvent: eventData?.triggerEvent || 'GENERATION_ENDED',
    chatId: stContext?.chatId || stContext?.chat_id || stContext?.chat_filename || '',
    messageId: eventData?.messageId || eventData?.id || '',
    lastAiMessage: lastAiMessage?.content || '',
    userMessage: lastUserMessage?.content || '',
    chatMessages: messages,
    input: {
      userMessage: lastUserMessage?.content || '',
      lastAiMessage: lastAiMessage?.content || '',
      extractedContent: '',
      previousToolOutput: '',
      context: {
        character: character?.name || '',
        chatLength: chat?.totalMessages || 0
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

  updateRuntime(toolId, {
    lastStatus: 'running',
    lastError: '',
    lastDurationMs: 0
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
    let result;

    if (tool.output?.mode === OUTPUT_MODES.POST_RESPONSE_API) {
      result = await toolOutputService.runToolPostResponse(tool, context);
    } else {
      result = await executeToolWithConfig(toolId, context);
    }

    const duration = Date.now() - startedAt;

    if (result?.success) {
      const config = getToolFullConfig(toolId);
      updateRuntime(toolId, {
        lastStatus: 'success',
        lastError: '',
        lastDurationMs: duration,
        successCount: (config?.runtime?.successCount || 0) + 1
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
      errorCount: (config?.runtime?.errorCount || 0) + 1
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
      errorCount: (config?.runtime?.errorCount || 0) + 1
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
    showTopNotice('warning', `${tool.name} 未启用，无法手动执行`, {
      duration: 2800,
      noticeId: `yyt-tool-run-${toolId}`
    });
    return { success: false, error: '工具未启用' };
  }

  if (!toolOutputService.shouldRunPostResponse(tool)) {
    showTopNotice('warning', `${tool.name} 当前为“随 AI 输出”，不会执行额外解析`, {
      duration: 3200,
      noticeId: `yyt-tool-run-${toolId}`
    });
    return { success: false, error: '当前输出模式不执行额外解析' };
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
  for (const [eventType, listener] of toolTriggerManagerState.listeners) {
    unregisterEventListener(eventType, listener);
  }
  toolTriggerManagerState.listeners.clear();
  toolTriggerManagerState.initialized = false;
  toolTriggerManagerState.lastExecutionContext = null;
  
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
    lastExecutionContext: toolTriggerManagerState.lastExecutionContext
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
  
  // 注册核心事件监听器
  const eventTypes = getEventTypes();
  
  // 监听消息发送事件
  if (eventTypes.MESSAGE_SENT) {
    registerEventListener(eventTypes.MESSAGE_SENT, (messageId) => {
      updateGateState({
        lastUserMessageId: messageId,
        lastUserMessageAt: Date.now()
      });
      log(`用户消息已发送: ${messageId}`);
    });
  }
  
  // 监听生成开始事件
  if (eventTypes.GENERATION_STARTED) {
    registerEventListener(eventTypes.GENERATION_STARTED, (type, params) => {
      updateGateState({
        lastGenerationType: type,
        isGenerating: true
      });
      log(`生成开始: ${type}`);
    });
  }
  
  // 监听生成结束事件
  if (eventTypes.GENERATION_ENDED) {
    registerEventListener(eventTypes.GENERATION_ENDED, () => {
      updateGateState({
        lastGenerationAt: Date.now(),
        isGenerating: false
      });
      log('生成结束');
    });
  }
  
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