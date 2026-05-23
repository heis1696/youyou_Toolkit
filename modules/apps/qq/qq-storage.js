/**
 * YouYou Toolkit - QQ App Storage Layer (Phase B)
 *
 * 数据结构（每个键存在 storage namespace 下）:
 *   friends: Friend[]
 *   groups:  Group[]
 *   messagesByChat: { [chatId]: { [groupId]: Message[] } }
 *
 * 设计要点:
 * - 好友 / 群 全局共享（不区分 chatId）
 * - 消息按当前 chatId 隔离存储；读写时实时 resolveCurrentChatId
 * - 同一个 qqStorage 实例在 registerQQApp 中创建一次，多 view 共享，cache 一致
 */

import {
  STORAGE_KEY_FRIENDS,
  STORAGE_KEY_GROUPS,
  STORAGE_KEY_MESSAGES_BY_CHAT,
} from './qq-types.js';
import { getHostApi, getHostContext } from '../../core/host-event-service.js';

function resolveCurrentChatId() {
  try {
    const api = getHostApi();
    const ctx = getHostContext(api);
    const candidates = [
      ctx?.chatId,
      ctx?.chat_id,
      ctx?.chat_filename,
      ctx?.chatMetadata?.chatId,
      ctx?.chatMetadata?.chat_id,
      ctx?.chatMetadata?.file_name,
      ctx?.chatMetadata?.name,
      api?.chatId,
      api?.chat_id,
      api?.chat_filename,
    ];
    for (const c of candidates) {
      const s = typeof c === 'string' ? c.trim() : '';
      if (s) return s;
    }
    const charId = api?.this_chid;
    if (charId !== undefined && charId !== null && String(charId).trim() !== '') {
      return `chat_char_${String(charId).trim()}`;
    }
  } catch (_) { /* fallthrough */ }
  return 'default_chat';
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function safeObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

export function createQQStorage({ storage, logger } = {}) {
  if (!storage || typeof storage.get !== 'function' || typeof storage.set !== 'function') {
    throw new Error('createQQStorage: storage 必填');
  }
  const log = logger || { log() {}, warn() {}, error() {} };

  // ─── 好友 ─────────────────────────────────────────────────
  function listFriends() {
    return safeArray(storage.get(STORAGE_KEY_FRIENDS, []));
  }

  function getFriend(id) {
    return listFriends().find((f) => f && f.id === id) || null;
  }

  function addFriend(friend) {
    if (!friend || !friend.id) {
      log.warn?.('addFriend: 缺少 id');
      return null;
    }
    const list = listFriends();
    if (list.some((f) => f && f.id === friend.id)) {
      log.warn?.(`addFriend: 重复 id ${friend.id}`);
      return null;
    }
    list.push(friend);
    storage.set(STORAGE_KEY_FRIENDS, list);
    return friend;
  }

  function updateFriend(id, patch) {
    const list = listFriends();
    const idx = list.findIndex((f) => f && f.id === id);
    if (idx < 0) return null;
    const next = { ...list[idx], ...patch, id: list[idx].id, updatedAt: Date.now() };
    list[idx] = next;
    storage.set(STORAGE_KEY_FRIENDS, list);
    return next;
  }

  function removeFriend(id) {
    const list = listFriends();
    const next = list.filter((f) => f && f.id !== id);
    if (next.length === list.length) return false;
    storage.set(STORAGE_KEY_FRIENDS, next);
    return true;
  }

  // ─── 群 ───────────────────────────────────────────────────
  function listGroups() {
    return safeArray(storage.get(STORAGE_KEY_GROUPS, []));
  }

  function getGroup(id) {
    return listGroups().find((g) => g && g.id === id) || null;
  }

  function addGroup(group) {
    if (!group || !group.id) {
      log.warn?.('addGroup: 缺少 id');
      return null;
    }
    const list = listGroups();
    if (list.some((g) => g && g.id === group.id)) {
      log.warn?.(`addGroup: 重复 id ${group.id}`);
      return null;
    }
    list.push(group);
    storage.set(STORAGE_KEY_GROUPS, list);
    return group;
  }

  function updateGroup(id, patch) {
    const list = listGroups();
    const idx = list.findIndex((g) => g && g.id === id);
    if (idx < 0) return null;
    const next = { ...list[idx], ...patch, id: list[idx].id, updatedAt: Date.now() };
    list[idx] = next;
    storage.set(STORAGE_KEY_GROUPS, list);
    return next;
  }

  function removeGroup(id) {
    const list = listGroups();
    const next = list.filter((g) => g && g.id !== id);
    if (next.length === list.length) return false;
    storage.set(STORAGE_KEY_GROUPS, next);
    // 同步清掉该群在所有 chat 下的消息
    const all = safeObject(storage.get(STORAGE_KEY_MESSAGES_BY_CHAT, {}));
    let changed = false;
    for (const chatId of Object.keys(all)) {
      if (all[chatId] && Object.prototype.hasOwnProperty.call(all[chatId], id)) {
        delete all[chatId][id];
        changed = true;
      }
    }
    if (changed) storage.set(STORAGE_KEY_MESSAGES_BY_CHAT, all);
    return true;
  }

  // ─── 消息（按 chatId 隔离） ────────────────────────────────
  function getCurrentChatId() {
    return resolveCurrentChatId();
  }

  function listMessages(groupId) {
    const chatId = resolveCurrentChatId();
    const all = safeObject(storage.get(STORAGE_KEY_MESSAGES_BY_CHAT, {}));
    const perChat = safeObject(all[chatId]);
    return safeArray(perChat[groupId]);
  }

  function appendMessage(groupId, message) {
    if (!groupId) {
      log.warn?.('appendMessage: 缺少 groupId');
      return null;
    }
    if (!message || !message.id) {
      log.warn?.('appendMessage: 缺少 message.id');
      return null;
    }
    const chatId = resolveCurrentChatId();
    const all = safeObject(storage.get(STORAGE_KEY_MESSAGES_BY_CHAT, {}));
    if (!all[chatId]) all[chatId] = {};
    if (!Array.isArray(all[chatId][groupId])) all[chatId][groupId] = [];
    const stamped = { ...message, groupId, chatId };
    all[chatId][groupId].push(stamped);
    storage.set(STORAGE_KEY_MESSAGES_BY_CHAT, all);
    return stamped;
  }

  function clearMessages(groupId) {
    const chatId = resolveCurrentChatId();
    const all = safeObject(storage.get(STORAGE_KEY_MESSAGES_BY_CHAT, {}));
    if (all[chatId] && Object.prototype.hasOwnProperty.call(all[chatId], groupId)) {
      delete all[chatId][groupId];
      storage.set(STORAGE_KEY_MESSAGES_BY_CHAT, all);
      return true;
    }
    return false;
  }

  return {
    // 好友
    listFriends,
    getFriend,
    addFriend,
    updateFriend,
    removeFriend,
    // 群
    listGroups,
    getGroup,
    addGroup,
    updateGroup,
    removeGroup,
    // 消息
    getCurrentChatId,
    listMessages,
    appendMessage,
    clearMessages,
  };
}
