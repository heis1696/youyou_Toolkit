/**
 * YouYou Toolkit - 工具执行上下文构建模块
 * @description 为手动执行与自动执行提供统一的 assistant 楼层快照与上下文构建能力
 */

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

function getSillyTavernAPI() {
  const topWindow = getTopWindow();
  return topWindow?.SillyTavern || null;
}

function normalizeMessageIdentityValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function getMessageContent(message) {
  if (!message) return '';

  const candidates = [
    message.content,
    message.mes,
    message.message,
    message.text,
    message?.data?.content
  ];

  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
}

function normalizeMessageRole(message) {
  const explicitRole = String(message?.role || '').trim().toLowerCase();
  if (explicitRole === 'assistant' || explicitRole === 'ai') return 'assistant';
  if (explicitRole === 'system') return 'system';
  if (explicitRole === 'user') return 'user';
  if (message?.is_user === true) return 'user';
  if (message?.is_system === true) return 'system';
  return 'assistant';
}

function buildAssistantContentFingerprint(content = '') {
  const text = String(content || '').trim();
  if (!text) return 'empty';

  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(index);
    hash |= 0;
  }

  return `fp_${Math.abs(hash).toString(36)}`;
}

function buildSlotBindingKey(slot = {}) {
  const chatId = normalizeMessageIdentityValue(slot.chatId) || 'chat_default';
  const messageId = normalizeMessageIdentityValue(slot.messageId) || 'latest';
  return `${chatId}::${messageId}`;
}

function buildSlotRevisionKey(slot = {}) {
  const slotBindingKey = buildSlotBindingKey(slot);
  const effectiveSwipeId = normalizeMessageIdentityValue(slot.effectiveSwipeId) || 'swipe:current';
  const assistantContentFingerprint = normalizeMessageIdentityValue(slot.assistantContentFingerprint) || 'empty';
  return `${slotBindingKey}::${effectiveSwipeId}::${assistantContentFingerprint}`;
}

function buildSlotTransactionId(slot = {}) {
  const slotRevisionKey = buildSlotRevisionKey(slot);
  const eventType = normalizeMessageIdentityValue(slot.eventType) || 'MANUAL';
  const traceId = normalizeMessageIdentityValue(slot.traceId) || createTraceId('manual');
  return `${slotRevisionKey}::${eventType}::${traceId}`;
}

function createTraceId(prefix = 'trace') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getRawChatMessages() {
  const api = getSillyTavernAPI();

  try {
    const context = api?.getContext?.() || null;
    if (Array.isArray(context?.chat)) {
      return context.chat;
    }
  } catch (error) {
    // ignore and fall back
  }

  if (Array.isArray(api?.chat)) {
    return api.chat;
  }

  return [];
}

function buildConversationSnapshot(rawMessages = []) {
  const normalizedMessages = [];
  let lastUserMessage = null;
  let lastAiMessage = null;

  rawMessages.forEach((message, index) => {
    const role = normalizeMessageRole(message);
    const content = getMessageContent(message);
    if (!content) return;

    const sourceId = normalizeMessageIdentityValue(
      message?.messageId
      ?? message?.message_id
      ?? message?.id
      ?? message?.mid
      ?? message?.mesid
      ?? message?.chat_index
      ?? index
    );
    const swipeId = normalizeMessageIdentityValue(
      message?.swipe_id
      ?? message?.swipeId
      ?? message?.swipe
      ?? ''
    );

    const entry = {
      role,
      content,
      sourceId,
      swipeId,
      raw: message,
      index
    };

    normalizedMessages.push(entry);

    if (role === 'user') {
      lastUserMessage = entry;
    }

    if (role === 'assistant') {
      lastAiMessage = entry;
    }
  });

  return {
    messages: normalizedMessages,
    lastUserMessage,
    lastAiMessage
  };
}

function resolveStableChatId(api, stContext, character) {
  return normalizeMessageIdentityValue(
    stContext?.chatId
    ?? stContext?.chat_id
    ?? api?.chatId
    ?? api?.chat_id
    ?? api?.this_chid
    ?? character?.id
    ?? 'chat_default'
  ) || 'chat_default';
}

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
        name: char?.name || '',
        description: char?.description || '',
        personality: char?.personality || '',
        scenario: char?.scenario || '',
        firstMes: char?.first_mes || '',
        mesExample: char?.mes_example || ''
      };
    }
  } catch (error) {
    console.error('[YouYouToolkit:ExecutionContext] 获取角色信息失败:', error);
  }

  return null;
}

function stripKnownToolBlocks(text = '', message = null) {
  let result = String(text || '');
  const toolOutputs = message?.YouYouToolkit_toolOutputs;

  if (toolOutputs && typeof toolOutputs === 'object') {
    Object.values(toolOutputs).forEach((entry) => {
      const blockText = String(entry?.blockText || entry?.content || '').trim();
      if (blockText && result.includes(blockText)) {
        result = result.replace(blockText, '').trimEnd();
      }
    });
  }

  return result.trim();
}

function resolveAssistantTarget(conversation, options = {}) {
  const messages = Array.isArray(conversation?.messages) ? conversation.messages : [];
  const normalizedMessageId = normalizeMessageIdentityValue(options.messageId);
  const normalizedSwipeId = normalizeMessageIdentityValue(options.swipeId);

  if (!normalizedMessageId) {
    return conversation?.lastAiMessage || null;
  }

  const assistantMessages = messages.filter((message) => message.role === 'assistant');
  const exactMatch = assistantMessages.find((message) => {
    if (message.sourceId !== normalizedMessageId) return false;
    if (!normalizedSwipeId) return true;
    return normalizeMessageIdentityValue(message.swipeId) === normalizedSwipeId;
  });

  if (exactMatch) {
    return exactMatch;
  }

  return assistantMessages.find((message) => message.sourceId === normalizedMessageId) || null;
}

function buildExecutionContext({
  api,
  stContext,
  character,
  conversation,
  targetAssistantMessage,
  runSource = 'MANUAL'
} = {}) {
  const messages = conversation?.messages || [];
  const lastUserMessage = conversation?.lastUserMessage || null;
  const messageId = normalizeMessageIdentityValue(targetAssistantMessage?.sourceId) || '';
  const confirmedAssistantSwipeId = normalizeMessageIdentityValue(targetAssistantMessage?.swipeId) || 'swipe:current';
  const assistantText = targetAssistantMessage?.content || '';
  const assistantBaseText = stripKnownToolBlocks(assistantText, targetAssistantMessage?.raw || null);
  const assistantContentFingerprint = buildAssistantContentFingerprint(assistantText);
  const assistantBaseFingerprint = buildAssistantContentFingerprint(assistantBaseText);
  const chatId = resolveStableChatId(api, stContext, character);
  const traceId = createTraceId(String(runSource || 'manual').toLowerCase());
  const slotBindingKey = buildSlotBindingKey({ chatId, messageId });
  const slotRevisionKey = buildSlotRevisionKey({
    chatId,
    messageId,
    effectiveSwipeId: confirmedAssistantSwipeId,
    assistantContentFingerprint: assistantBaseFingerprint
  });

  return {
    startedAt: Date.now(),
    runSource,
    traceId,
    chatId,
    messageId,
    confirmedAssistantMessageId: messageId,
    slotBindingKey,
    slotRevisionKey,
    slotTransactionId: buildSlotTransactionId({
      chatId,
      messageId,
      effectiveSwipeId: confirmedAssistantSwipeId,
      assistantContentFingerprint: assistantBaseFingerprint,
      eventType: runSource,
      traceId
    }),
    executionKey: slotRevisionKey,
    lastAiMessage: assistantText,
    assistantContentFingerprint,
    assistantBaseText,
    assistantBaseFingerprint,
    lastAiMessageSwipeId: confirmedAssistantSwipeId,
    confirmedAssistantSwipeId,
    effectiveSwipeId: confirmedAssistantSwipeId,
    sourceMessageId: messageId,
    sourceSwipeId: confirmedAssistantSwipeId,
    lastUserMessage: lastUserMessage?.content || '',
    userMessage: lastUserMessage?.content || '',
    targetAssistantMessage,
    chatMessages: messages,
    characterCard: character,
    chatHistory: messages,
    input: {
      userMessage: lastUserMessage?.content || '',
      lastAiMessage: assistantText,
      assistantBaseText,
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

export async function buildExecutionContextForLatestAssistant({ runSource = 'MANUAL' } = {}) {
  const api = getSillyTavernAPI();
  const stContext = api?.getContext?.() || null;
  const character = await getCurrentCharacter();
  const rawMessages = getRawChatMessages();
  const conversation = buildConversationSnapshot(rawMessages);
  const targetAssistantMessage = conversation?.lastAiMessage || null;

  return buildExecutionContext({
    api,
    stContext,
    character,
    conversation,
    targetAssistantMessage,
    runSource
  });
}

export async function buildExecutionContextForMessage({ messageId, swipeId = '', runSource = 'AUTO' } = {}) {
  const api = getSillyTavernAPI();
  const stContext = api?.getContext?.() || null;
  const character = await getCurrentCharacter();
  const rawMessages = getRawChatMessages();
  const conversation = buildConversationSnapshot(rawMessages);
  const targetAssistantMessage = resolveAssistantTarget(conversation, { messageId, swipeId });

  return buildExecutionContext({
    api,
    stContext,
    character,
    conversation,
    targetAssistantMessage,
    runSource
  });
}

export {
  getTopWindow,
  getSillyTavernAPI,
  normalizeMessageIdentityValue,
  getMessageContent,
  normalizeMessageRole,
  buildAssistantContentFingerprint,
  buildSlotBindingKey,
  buildSlotRevisionKey,
  buildSlotTransactionId,
  createTraceId,
  getRawChatMessages,
  buildConversationSnapshot,
  resolveStableChatId,
  stripKnownToolBlocks
};

export default {
  getTopWindow,
  getSillyTavernAPI,
  normalizeMessageIdentityValue,
  getMessageContent,
  normalizeMessageRole,
  buildAssistantContentFingerprint,
  buildSlotBindingKey,
  buildSlotRevisionKey,
  buildSlotTransactionId,
  createTraceId,
  getRawChatMessages,
  buildConversationSnapshot,
  resolveStableChatId,
  getCurrentCharacter,
  stripKnownToolBlocks,
  buildExecutionContextForLatestAssistant,
  buildExecutionContextForMessage
};