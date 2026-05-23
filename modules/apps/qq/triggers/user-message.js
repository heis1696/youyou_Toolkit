/**
 * YouYou Toolkit - QQ App Phase C1 user-message Trigger
 *
 * USER_MESSAGE_RENDERED 事件源 payload 解析。ST 实际 payload 是 message_id（number），
 * 内容需要从 chat 数组按 id 取。此文件隔离 ST schema 假设，将来变化时单点修改。
 */

import { getHostApi, getHostContext } from '../../../core/host-event-service.js';

function getCurrentChatMessages() {
  const api = getHostApi();
  const ctx = getHostContext(api);
  if (Array.isArray(ctx?.chat)) return ctx.chat;
  if (Array.isArray(api?.chat)) return api.chat;
  return [];
}

function readMessageContentByIndex(messageId) {
  const idx = Number(messageId);
  if (!Number.isFinite(idx) || idx < 0) return '';
  const chat = getCurrentChatMessages();
  if (idx >= chat.length) return '';
  const m = chat[idx];
  if (!m) return '';
  return String(m.mes || m.content || m.message || '').trim();
}

function pickStringField(obj, keys) {
  if (!obj || typeof obj !== 'object') return '';
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

/**
 * 从 USER_MESSAGE_RENDERED 的 payload 提取用户消息文本。
 * 支持三种形态：
 *   - payload 是 number（message_id）→ 查 chat[id].mes
 *   - payload 是 object 且含 message_id/messageId/id 字段 → 查 chat 数组
 *   - payload 是 object 且直接含 mes/message/content/text → 直接取
 * 兜底：从 chat 数组取最后一条 user 消息。
 * @param {*} payload
 * @returns {string}
 */
export function extractUserMessageContent(payload) {
  if (typeof payload === 'number' || typeof payload === 'string') {
    const byIdx = readMessageContentByIndex(payload);
    if (byIdx) return byIdx;
  }

  if (payload && typeof payload === 'object') {
    const direct = pickStringField(payload, ['mes', 'message', 'content', 'text', 'message_text']);
    if (direct) return direct;

    const id = payload.message_id ?? payload.messageId ?? payload.id ?? payload.index;
    if (id !== undefined && id !== null) {
      const byIdx = readMessageContentByIndex(id);
      if (byIdx) return byIdx;
    }
  }

  const chat = getCurrentChatMessages();
  for (let i = chat.length - 1; i >= 0; i--) {
    const m = chat[i];
    if (!m) continue;
    const isUser =
      m.is_user === true ||
      String(m.role || '').toLowerCase() === 'user' ||
      String(m.name || '').toLowerCase() === 'user';
    if (isUser) {
      return String(m.mes || m.content || '').trim();
    }
  }

  return '';
}
