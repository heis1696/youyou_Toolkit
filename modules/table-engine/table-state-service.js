/**
 * YouYou Toolkit - 填表状态服务
 * @description 负责按 assistant slot 读取/保存结构化 table state，并维护 resolved/committed target 指针
 */

import { contextInjector } from '../context-injector.js';
import {
  TABLE_MESSAGE_STATE_KEY,
  TABLE_MESSAGE_BINDINGS_KEY,
  TABLE_STATE_LOAD_MODE,
  cloneTableValue,
  createEmptyTableBoundState,
  createTableTargetPointer,
  normalizeTableBindings,
  normalizeTableBoundState
} from './table-types.js';
import { resolveFreshTableTarget, validateTableTargetSnapshot } from './table-target-resolver.js';

function normalizeIdentityValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function getTopWindow() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent;
    }
  } catch (_) {
    // ignore cross-window access errors
  }

  return window;
}

function getChatRuntime() {
  try {
    const topWindow = getTopWindow();
    const api = topWindow?.SillyTavern || null;
    const context = api?.getContext?.() || null;
    const contextChat = Array.isArray(context?.chat) ? context.chat : [];
    const apiChat = Array.isArray(api?.chat) ? api.chat : [];
    const chat = contextChat.length ? contextChat : apiChat;

    return {
      topWindow,
      api,
      context,
      chat,
      contextChat,
      apiChat
    };
  } catch (_) {
    return {
      topWindow: null,
      api: null,
      context: null,
      chat: [],
      contextChat: [],
      apiChat: []
    };
  }
}

function isAssistantMessage(message) {
  if (!message) return false;
  if (message?.is_user === true || message?.is_system === true) return false;

  const role = String(message?.role || '').trim().toLowerCase();
  return role === 'assistant' || role === 'ai' || !role;
}

function findAssistantMessageIndex(chatMessages = [], sourceMessageId = '') {
  const normalizedMessageId = normalizeIdentityValue(sourceMessageId);
  if (!Array.isArray(chatMessages) || !normalizedMessageId) {
    return -1;
  }

  for (let index = chatMessages.length - 1; index >= 0; index -= 1) {
    const message = chatMessages[index];
    if (!isAssistantMessage(message)) continue;

    const candidates = [
      message?.sourceId,
      message?.message_id,
      message?.messageId,
      message?.id,
      message?.mes_id,
      message?.mid,
      message?.mesid,
      message?.chat_index,
      message?.index,
      index
    ].map((value) => normalizeIdentityValue(value));

    if (candidates.includes(normalizedMessageId)) {
      return index;
    }
  }

  return -1;
}

function getMessageForTarget(targetSnapshot) {
  const runtime = getChatRuntime();
  const messageIndex = findAssistantMessageIndex(runtime.chat, targetSnapshot?.sourceMessageId);
  if (messageIndex < 0) {
    return {
      runtime,
      messageIndex,
      message: null
    };
  }

  return {
    runtime,
    messageIndex,
    message: runtime.chat[messageIndex] || null
  };
}

function syncMessageToRuntimeChats(runtime, messageIndex, updatedMessage) {
  const apply = (chatArray) => {
    if (!Array.isArray(chatArray) || messageIndex < 0 || messageIndex >= chatArray.length) {
      return;
    }

    chatArray[messageIndex] = {
      ...(chatArray[messageIndex] || {}),
      ...updatedMessage
    };
  };

  apply(runtime?.contextChat);
  apply(runtime?.apiChat);
}

async function persistChat(runtime) {
  const context = runtime?.context || null;
  const api = runtime?.api || null;
  const saveChatDebounced = context?.saveChatDebounced || api?.saveChatDebounced || null;
  const saveChat = context?.saveChat || api?.saveChat || null;

  if (typeof saveChatDebounced === 'function') {
    saveChatDebounced.call(context || api);
  }

  if (typeof saveChat === 'function') {
    await saveChat.call(context || api);
  }
}

export function getBoundTableState(targetSnapshot) {
  const { message } = getMessageForTarget(targetSnapshot);
  const state = normalizeTableBoundState(message?.[TABLE_MESSAGE_STATE_KEY]);
  return state;
}

export function getTableBindings(targetSnapshot) {
  const { message } = getMessageForTarget(targetSnapshot);
  return normalizeTableBindings(message?.[TABLE_MESSAGE_BINDINGS_KEY]);
}

export function loadBoundStateOrTemplate(targetSnapshot, options = {}) {
  const state = getBoundTableState(targetSnapshot);
  if (state && normalizeIdentityValue(state.slotRevisionKey) === normalizeIdentityValue(targetSnapshot?.slotRevisionKey)) {
    return {
      loadMode: TABLE_STATE_LOAD_MODE.EXACT,
      mergeBaseOnly: false,
      state
    };
  }

  if (state && normalizeIdentityValue(state.slotBindingKey) === normalizeIdentityValue(targetSnapshot?.slotBindingKey)) {
    return {
      loadMode: TABLE_STATE_LOAD_MODE.BINDING_FALLBACK,
      mergeBaseOnly: true,
      state: normalizeTableBoundState({
        ...state,
        slotRevisionKey: normalizeIdentityValue(targetSnapshot?.slotRevisionKey) || state.slotRevisionKey,
        sourceSwipeId: normalizeIdentityValue(targetSnapshot?.sourceSwipeId || targetSnapshot?.effectiveSwipeId) || state.sourceSwipeId,
        meta: {
          ...(state.meta || {}),
          mergeBaseOnly: true,
          fallbackFromBinding: true,
          fallbackFromRevisionKey: normalizeIdentityValue(state.slotRevisionKey),
          requestedRevisionKey: normalizeIdentityValue(targetSnapshot?.slotRevisionKey)
        }
      })
    };
  }

  if (Array.isArray(options.templateTables)) {
    return {
      loadMode: TABLE_STATE_LOAD_MODE.TEMPLATE,
      mergeBaseOnly: false,
      state: createEmptyTableBoundState(targetSnapshot, {
        tables: cloneTableValue(options.templateTables),
        meta: {
          fromTemplate: true
        }
      })
    };
  }

  return {
    loadMode: TABLE_STATE_LOAD_MODE.EMPTY,
    mergeBaseOnly: false,
    state: createEmptyTableBoundState(targetSnapshot)
  };
}

export async function recordResolvedTarget(targetSnapshot) {
  const { runtime, messageIndex, message } = getMessageForTarget(targetSnapshot);
  if (!message || messageIndex < 0) {
    return {
      success: false,
      error: 'target_message_not_found'
    };
  }

  const nextBindings = {
    ...normalizeTableBindings(message[TABLE_MESSAGE_BINDINGS_KEY]),
    lastResolvedTarget: createTableTargetPointer(targetSnapshot),
    updatedAt: Date.now()
  };

  message[TABLE_MESSAGE_BINDINGS_KEY] = nextBindings;
  syncMessageToRuntimeChats(runtime, messageIndex, message);
  await persistChat(runtime);

  return {
    success: true,
    bindings: nextBindings
  };
}

export async function commitBoundState(targetSnapshot, nextState, options = {}) {
  const currentTarget = options.skipFreshValidation === true
    ? targetSnapshot
    : await resolveFreshTableTarget(targetSnapshot, options);
  const validation = options.skipFreshValidation === true
    ? { valid: true, reason: 'skipped' }
    : validateTableTargetSnapshot(targetSnapshot, currentTarget);

  if (!validation.valid) {
    return {
      success: false,
      error: 'target_changed_before_commit',
      validation
    };
  }

  const targetForCommit = currentTarget || targetSnapshot;
  const { runtime, messageIndex, message } = getMessageForTarget(targetForCommit);
  if (!message || messageIndex < 0) {
    return {
      success: false,
      error: 'target_message_not_found',
      validation
    };
  }

  const normalizedState = normalizeTableBoundState({
    ...createEmptyTableBoundState(targetForCommit),
    ...nextState,
    slotBindingKey: targetForCommit.slotBindingKey,
    slotRevisionKey: targetForCommit.slotRevisionKey,
    sourceMessageId: targetForCommit.sourceMessageId,
    sourceSwipeId: targetForCommit.sourceSwipeId || targetForCommit.effectiveSwipeId,
    updatedAt: Date.now()
  });

  const nextBindings = {
    ...normalizeTableBindings(message[TABLE_MESSAGE_BINDINGS_KEY]),
    lastResolvedTarget: createTableTargetPointer(targetForCommit),
    lastCommittedTarget: createTableTargetPointer(targetForCommit),
    updatedAt: Date.now()
  };

  message[TABLE_MESSAGE_STATE_KEY] = normalizedState;
  message[TABLE_MESSAGE_BINDINGS_KEY] = nextBindings;

  syncMessageToRuntimeChats(runtime, messageIndex, message);
  await persistChat(runtime);

  return {
    success: true,
    state: normalizedState,
    bindings: nextBindings,
    validation,
    messageIndex,
    sourceMessageId: targetForCommit.sourceMessageId,
    slotRevisionKey: targetForCommit.slotRevisionKey
  };
}

export function getAssistantTableSnapshot(sourceMessageId = null) {
  const assistantSnapshot = contextInjector.getAssistantMessageSnapshot(sourceMessageId);
  if (!assistantSnapshot?.message) {
    return null;
  }

  return {
    ...assistantSnapshot,
    tableState: normalizeTableBoundState(assistantSnapshot.message[TABLE_MESSAGE_STATE_KEY]),
    tableBindings: normalizeTableBindings(assistantSnapshot.message[TABLE_MESSAGE_BINDINGS_KEY])
  };
}

export default {
  getBoundTableState,
  getTableBindings,
  loadBoundStateOrTemplate,
  recordResolvedTarget,
  commitBoundState,
  getAssistantTableSnapshot
};
