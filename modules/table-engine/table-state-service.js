/**
 * YouYou Toolkit - 填表状态服务
 *
 * 议题 #15 修订版（v1.0.169+）：
 *   - 状态按 isolationKey 分桶存储（对标 shujuku TavernDB_ACU_IsolatedData[isolationKey]）
 *   - 兼容旧无 isolation 数据 → 视为 DEFAULT_ISOLATION_KEY = '' 桶
 *   - 新增 clearStateAtMessageIndex（#23 重填三段式用）
 *
 * 存储布局：
 *   message.YouYouToolkit_tableState = {
 *     [isolationKey]: TableBoundState
 *   }
 *
 *   message.YouYouToolkit_tableBindings = {
 *     [isolationKey]: TableBindings
 *   }
 *
 * 兼容旧格式：当 message[KEY] 直接是 TableBoundState（有 tables/chatId 字段）时，
 *           视为 DEFAULT_ISOLATION_KEY 桶。第一次写入时自动迁移到新结构。
 */

import { contextInjector } from '../context-injector.js';
import {
  TABLE_MESSAGE_STATE_KEY,
  TABLE_MESSAGE_BINDINGS_KEY,
  DEFAULT_ISOLATION_KEY,
  cloneTableValue,
  createEmptyTableBoundState,
  createTableTargetPointer,
  normalizeIsolationKey,
  normalizeTableBindings,
  normalizeTableBoundState
} from './table-types.js';
import { tableIsolation } from './table-isolation-service.js';
import { resolveHistoricalTableState } from './table-history-service.js';
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
  } catch (_) { /* ignore */ }
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
    return { topWindow, api, context, chat, contextChat, apiChat };
  } catch (_) {
    return { topWindow: null, api: null, context: null, chat: [], contextChat: [], apiChat: [] };
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
  if (!Array.isArray(chatMessages) || !normalizedMessageId) return -1;

  for (let index = chatMessages.length - 1; index >= 0; index -= 1) {
    const message = chatMessages[index];
    if (!isAssistantMessage(message)) continue;
    const candidates = [
      message?.sourceId, message?.message_id, message?.messageId,
      message?.id, message?.mes_id, message?.mid, message?.mesid,
      message?.chat_index, message?.index, index
    ].map((value) => normalizeIdentityValue(value));
    if (candidates.includes(normalizedMessageId)) return index;
  }
  return -1;
}

function getMessageForTarget(targetSnapshot) {
  const runtime = getChatRuntime();
  const messageIndex = findAssistantMessageIndex(runtime.chat, targetSnapshot?.sourceMessageId);
  if (messageIndex < 0) return { runtime, messageIndex, message: null };
  return { runtime, messageIndex, message: runtime.chat[messageIndex] || null };
}

function syncMessageToRuntimeChats(runtime, messageIndex, updatedMessage) {
  const apply = (chatArray) => {
    if (!Array.isArray(chatArray) || messageIndex < 0 || messageIndex >= chatArray.length) return;
    chatArray[messageIndex] = { ...(chatArray[messageIndex] || {}), ...updatedMessage };
  };
  apply(runtime?.contextChat);
  apply(runtime?.apiChat);
}

async function persistChat(runtime) {
  const context = runtime?.context || null;
  const api = runtime?.api || null;
  const saveChatDebounced = context?.saveChatDebounced || api?.saveChatDebounced || null;
  const saveChat = context?.saveChat || api?.saveChat || null;
  if (typeof saveChatDebounced === 'function') saveChatDebounced.call(context || api);
  if (typeof saveChat === 'function') await saveChat.call(context || api);
}

// ════════════════════════════════════════════════════════════════
// Isolation buckets helpers（议题 #15 新增）
// ════════════════════════════════════════════════════════════════

/**
 * 判断 value 是否为"旧格式 TableBoundState"（非 bucket）
 * 旧格式有 tables 数组或 chatId 字段；新格式是 {[isolationKey]: state} 对象
 */
function isLegacyBoundState(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  if (Array.isArray(value.tables)) return true;
  if (typeof value.chatId === 'string' && value.chatId.length > 0) return true;
  if (typeof value.slotBindingKey === 'string' && value.slotBindingKey.length > 0) return true;
  return false;
}

/**
 * 判断 value 是否为"旧格式 TableBindings"
 */
function isLegacyBindings(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  // 旧 TableBindings 有 lastResolvedTarget / lastCommittedTarget 字段
  return ('lastResolvedTarget' in value) || ('lastCommittedTarget' in value);
}

/**
 * 从 message 字段读取指定 isolation 的桶值
 * 旧格式自动视为 DEFAULT_ISOLATION_KEY 桶
 */
function readIsolationBucket(message, fieldKey, isolationKey, legacyDetector) {
  if (!message) return null;
  const raw = message[fieldKey];
  if (!raw) return null;
  const iso = normalizeIsolationKey(isolationKey);

  // 兼容旧格式：直接是 state/bindings 对象 → 视为 DEFAULT_ISOLATION_KEY 桶
  if (typeof legacyDetector === 'function' && legacyDetector(raw)) {
    return iso === DEFAULT_ISOLATION_KEY ? raw : null;
  }
  return raw[iso] || null;
}

/**
 * 写入指定 isolation 的桶值（自动迁移旧格式）
 */
function writeIsolationBucket(message, fieldKey, isolationKey, value, legacyDetector) {
  if (!message) return;
  const iso = normalizeIsolationKey(isolationKey);
  const current = message[fieldKey];

  if (typeof legacyDetector === 'function' && legacyDetector(current)) {
    // 旧格式 → 迁移：旧 value 放到 DEFAULT_ISOLATION_KEY 桶
    const migrated = { [DEFAULT_ISOLATION_KEY]: current };
    migrated[iso] = value;
    message[fieldKey] = migrated;
  } else if (current && typeof current === 'object' && !Array.isArray(current)) {
    message[fieldKey] = { ...current, [iso]: value };
  } else {
    message[fieldKey] = { [iso]: value };
  }
}

/**
 * 删除指定 isolation 的桶
 */
function deleteIsolationBucket(message, fieldKey, isolationKey, legacyDetector) {
  if (!message) return false;
  const iso = normalizeIsolationKey(isolationKey);
  const current = message[fieldKey];
  if (!current) return false;

  if (typeof legacyDetector === 'function' && legacyDetector(current)) {
    // 旧格式：仅 DEFAULT_ISOLATION_KEY 时清空
    if (iso === DEFAULT_ISOLATION_KEY) {
      delete message[fieldKey];
      return true;
    }
    return false;
  }
  if (current && typeof current === 'object' && !Array.isArray(current)) {
    if (current[iso] === undefined) return false;
    const next = { ...current };
    delete next[iso];
    if (Object.keys(next).length === 0) {
      delete message[fieldKey];
    } else {
      message[fieldKey] = next;
    }
    return true;
  }
  return false;
}

// ════════════════════════════════════════════════════════════════
// Public API
// ════════════════════════════════════════════════════════════════

export function getBoundTableState(targetSnapshot, opts = {}) {
  const { message } = getMessageForTarget(targetSnapshot);
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;
  const raw = readIsolationBucket(message, TABLE_MESSAGE_STATE_KEY, iso, isLegacyBoundState);
  return normalizeTableBoundState(raw);
}

export function getTableBindings(targetSnapshot, opts = {}) {
  const { message } = getMessageForTarget(targetSnapshot);
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;
  const raw = readIsolationBucket(message, TABLE_MESSAGE_BINDINGS_KEY, iso, isLegacyBindings);
  return normalizeTableBindings(raw);
}

export function loadBoundStateOrTemplate(targetSnapshot, options = {}) {
  const { runtime, messageIndex } = getMessageForTarget(targetSnapshot);
  return resolveHistoricalTableState({
    runtime,
    targetSnapshot,
    currentMessageIndex: messageIndex,
    templateTables: Array.isArray(options.templateTables) ? options.templateTables : [],
    isolationKey: options.isolationKey === undefined ? tableIsolation.getKey() : options.isolationKey
  });
}

export async function recordResolvedTarget(targetSnapshot, opts = {}) {
  const { runtime, messageIndex, message } = getMessageForTarget(targetSnapshot);
  if (!message || messageIndex < 0) {
    return { success: false, error: 'target_message_not_found' };
  }
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;

  const existing = readIsolationBucket(message, TABLE_MESSAGE_BINDINGS_KEY, iso, isLegacyBindings);
  const nextBindings = {
    ...normalizeTableBindings(existing),
    lastResolvedTarget: createTableTargetPointer(targetSnapshot),
    updatedAt: Date.now()
  };

  writeIsolationBucket(message, TABLE_MESSAGE_BINDINGS_KEY, iso, nextBindings, isLegacyBindings);
  syncMessageToRuntimeChats(runtime, messageIndex, message);
  await persistChat(runtime);

  return { success: true, bindings: nextBindings };
}

export async function commitBoundState(targetSnapshot, nextState, options = {}) {
  const currentTarget = options.skipFreshValidation === true
    ? targetSnapshot
    : await resolveFreshTableTarget(targetSnapshot, options);
  const validation = options.skipFreshValidation === true
    ? { valid: true, reason: 'skipped' }
    : validateTableTargetSnapshot(targetSnapshot, currentTarget);

  if (!validation.valid) {
    return { success: false, error: 'target_changed_before_commit', validation };
  }

  const targetForCommit = currentTarget || targetSnapshot;
  const { runtime, messageIndex, message } = getMessageForTarget(targetForCommit);
  if (!message || messageIndex < 0) {
    return { success: false, error: 'target_message_not_found', validation };
  }

  const iso = options.isolationKey === undefined ? tableIsolation.getKey() : options.isolationKey;
  const baseState = createEmptyTableBoundState(targetForCommit);
  const mergedMeta = {
    ...(baseState.meta || {}),
    ...(nextState.meta || {}),
    ...(options.locks ? { locks: options.locks } : {}),
    ...(options.previousSnapshot ? { previousSnapshot: options.previousSnapshot } : {}),
    isolationKey: iso
  };

  const normalizedState = normalizeTableBoundState({
    ...baseState,
    ...nextState,
    meta: mergedMeta,
    slotBindingKey: targetForCommit.slotBindingKey,
    slotRevisionKey: targetForCommit.slotRevisionKey,
    sourceMessageId: targetForCommit.sourceMessageId,
    sourceSwipeId: targetForCommit.sourceSwipeId || targetForCommit.effectiveSwipeId,
    updatedAt: Date.now()
  });

  const existingBindings = readIsolationBucket(message, TABLE_MESSAGE_BINDINGS_KEY, iso, isLegacyBindings);
  const nextBindings = {
    ...normalizeTableBindings(existingBindings),
    lastResolvedTarget: createTableTargetPointer(targetForCommit),
    lastCommittedTarget: createTableTargetPointer(targetForCommit),
    updatedAt: Date.now()
  };

  writeIsolationBucket(message, TABLE_MESSAGE_STATE_KEY, iso, normalizedState, isLegacyBoundState);
  writeIsolationBucket(message, TABLE_MESSAGE_BINDINGS_KEY, iso, nextBindings, isLegacyBindings);

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

export function getAssistantTableSnapshot(sourceMessageId = null, opts = {}) {
  const assistantSnapshot = contextInjector.getAssistantMessageSnapshot(sourceMessageId);
  if (!assistantSnapshot?.message) return null;
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;

  return {
    ...assistantSnapshot,
    tableState: normalizeTableBoundState(
      readIsolationBucket(assistantSnapshot.message, TABLE_MESSAGE_STATE_KEY, iso, isLegacyBoundState)
    ),
    tableBindings: normalizeTableBindings(
      readIsolationBucket(assistantSnapshot.message, TABLE_MESSAGE_BINDINGS_KEY, iso, isLegacyBindings)
    )
  };
}

/**
 * 倒序遍历找最近的非空表状态（按 isolation 过滤）
 * 议题 #15 #24 任务：loadBaseData 倒序遍历的核心实现
 */
export function getPreviousTableState(targetSnapshot, opts = {}) {
  const { runtime, messageIndex } = getMessageForTarget(targetSnapshot);
  if (messageIndex < 0) return null;
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;

  for (let i = messageIndex - 1; i >= 0; i--) {
    const msg = runtime.chat[i];
    if (!msg || msg.is_user === true) continue;
    const raw = readIsolationBucket(msg, TABLE_MESSAGE_STATE_KEY, iso, isLegacyBoundState);
    const state = normalizeTableBoundState(raw);
    if (state && Array.isArray(state.tables) && state.tables.length > 0) {
      return {
        state,
        messageIndex: i,
        sourceMessageId: state.sourceMessageId || ''
      };
    }
  }
  return null;
}

/**
 * 清空指定 messageIndex 的表状态（议题 #15 #23 重填三段式的第 1 步）
 *
 * @param {number} messageIndex
 * @param {Object} [opts] - { isolationKey?, clearBindings? = true }
 * @returns {Promise<{success, cleared, messageIndex}>}
 */
export async function clearStateAtMessageIndex(messageIndex, opts = {}) {
  const runtime = getChatRuntime();
  if (!Array.isArray(runtime.chat) || messageIndex < 0 || messageIndex >= runtime.chat.length) {
    return { success: false, error: 'invalid_message_index', messageIndex };
  }
  const message = runtime.chat[messageIndex];
  if (!message) return { success: false, error: 'message_not_found', messageIndex };

  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;
  const clearedState = deleteIsolationBucket(message, TABLE_MESSAGE_STATE_KEY, iso, isLegacyBoundState);
  const clearedBindings = opts.clearBindings === false
    ? false
    : deleteIsolationBucket(message, TABLE_MESSAGE_BINDINGS_KEY, iso, isLegacyBindings);

  if (clearedState || clearedBindings) {
    syncMessageToRuntimeChats(runtime, messageIndex, message);
    await persistChat(runtime);
  }
  return {
    success: true,
    cleared: clearedState || clearedBindings,
    messageIndex,
    isolationKey: iso
  };
}

/**
 * 清空一个 chat 内某 isolationKey 的全部表状态（议题 #15 #23 全量重填）
 *
 * @param {Object} [opts] - { isolationKey?, fromMessageIndex? = 0, toMessageIndex? }
 */
export async function clearStateInChat(opts = {}) {
  const runtime = getChatRuntime();
  const from = Number.isFinite(opts.fromMessageIndex) ? opts.fromMessageIndex : 0;
  const to = Number.isFinite(opts.toMessageIndex) ? opts.toMessageIndex : (runtime.chat?.length || 0) - 1;
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;

  let touched = 0;
  for (let i = from; i <= to; i++) {
    const message = runtime.chat[i];
    if (!message) continue;
    const a = deleteIsolationBucket(message, TABLE_MESSAGE_STATE_KEY, iso, isLegacyBoundState);
    const b = deleteIsolationBucket(message, TABLE_MESSAGE_BINDINGS_KEY, iso, isLegacyBindings);
    if (a || b) {
      syncMessageToRuntimeChats(runtime, i, message);
      touched++;
    }
  }
  if (touched > 0) await persistChat(runtime);
  return { success: true, touched, from, to, isolationKey: iso };
}

// 内部 helpers 供 history-service 使用
export const __internal__ = {
  readIsolationBucket,
  isLegacyBoundState,
  isLegacyBindings
};

export default {
  getBoundTableState,
  getTableBindings,
  loadBoundStateOrTemplate,
  recordResolvedTarget,
  commitBoundState,
  getAssistantTableSnapshot,
  getPreviousTableState,
  clearStateAtMessageIndex,
  clearStateInChat
};
