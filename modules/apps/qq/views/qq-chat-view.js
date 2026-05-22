/**
 * YouYou Toolkit - QQ App Chat View (Phase B)
 *
 * 群聊页：消息流（user 靠右、其他靠左）+ 底部输入框 + 顶部群信息条
 * B11：append 新消息走增量更新（不全重渲）；onEnter 时 scroll 到底
 * B10：Enter 发送 / Shift+Enter 换行
 */

import { dialog } from '../../../ui/components/controls/index.js';
import { createDefaultMessage, MESSAGE_SENDER_USER } from '../qq-types.js';

function formatMsgTime(ts) {
  if (!ts || !Number.isFinite(ts)) return '';
  const d = new Date(ts);
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const pad = (n) => String(n).padStart(2, '0');
  if (sameDay) return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function firstChar(name) {
  const s = String(name || '').trim();
  return s ? Array.from(s)[0] : '?';
}

function resolveSenderInfo(message, qqStorage) {
  if (message.type === 'system') {
    return { label: '', kind: 'system' };
  }
  if (message.sender === MESSAGE_SENDER_USER) {
    return { label: '我', kind: 'self' };
  }
  const friend = qqStorage.getFriend?.(message.sender);
  return { label: friend?.name || '未知', kind: 'other' };
}

function buildMessageNode(doc, message, qqStorage) {
  const info = resolveSenderInfo(message, qqStorage);

  const row = doc.createElement('div');
  row.className = 'yyt-qq-chat-msg';
  if (info.kind === 'self') row.classList.add('is-self');
  else if (info.kind === 'system') row.classList.add('is-system');
  else row.classList.add('is-other');

  if (info.kind !== 'system') {
    const avatar = doc.createElement('div');
    avatar.className = 'yyt-qq-chat-msg-avatar';
    avatar.textContent = firstChar(info.label);
    row.appendChild(avatar);
  }

  const body = doc.createElement('div');
  body.className = 'yyt-qq-chat-msg-body';

  if (info.kind === 'other' && info.label) {
    const sender = doc.createElement('div');
    sender.className = 'yyt-qq-chat-msg-sender';
    sender.textContent = info.label;
    body.appendChild(sender);
  }

  const bubble = doc.createElement('div');
  bubble.className = 'yyt-qq-chat-msg-bubble';
  bubble.textContent = String(message.content || '');
  body.appendChild(bubble);

  const time = doc.createElement('div');
  time.className = 'yyt-qq-chat-msg-time';
  time.textContent = formatMsgTime(message.timestamp);
  body.appendChild(time);

  row.appendChild(body);
  return row;
}

function buildMembersBody(doc, group, qqStorage) {
  const wrap = doc.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;min-width:260px;';

  const memberIds = Array.isArray(group.memberIds) ? group.memberIds : [];
  const friends = qqStorage.listFriends();

  if (friends.length === 0) {
    const empty = doc.createElement('div');
    empty.style.cssText = 'padding:14px 4px;color:var(--yyt-text-secondary,#9aa0a8);font-size:12.5px;line-height:1.6;text-align:center;';
    empty.textContent = '尚无好友。B 阶段暂不支持新建好友，请等待后续版本。';
    wrap.appendChild(empty);
    return wrap;
  }

  const title = doc.createElement('div');
  title.style.cssText = 'font-size:11.5px;color:var(--yyt-text-secondary,#9aa0a8);';
  title.textContent = `已添加 ${memberIds.length} / ${friends.length}`;
  wrap.appendChild(title);

  const list = doc.createElement('div');
  list.style.cssText = 'display:flex;flex-direction:column;gap:4px;max-height:320px;overflow-y:auto;';
  for (const friend of friends) {
    const inMember = memberIds.includes(friend.id);
    const item = doc.createElement('div');
    item.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.04);';
    const dot = doc.createElement('span');
    dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${inMember ? '#4ade80' : 'rgba(255,255,255,0.2)'};`;
    item.appendChild(dot);
    const name = doc.createElement('span');
    name.style.cssText = 'font-size:12.5px;color:var(--yyt-text,#f2f2f2);';
    name.textContent = friend.name || '未命名';
    item.appendChild(name);
    list.appendChild(item);
  }
  wrap.appendChild(list);

  const note = doc.createElement('div');
  note.style.cssText = 'font-size:11px;color:var(--yyt-text-secondary,#9aa0a8);line-height:1.5;';
  note.textContent = '成员勾选 UI 将在 Phase C/D 加入。';
  wrap.appendChild(note);

  return wrap;
}

export function createChatView({ groupId, qqStorage, logger, targetDoc }) {
  let streamEl = null;
  let inputEl = null;
  let sendBtnEl = null;
  let keydownHandler = null;
  let sendClickHandler = null;
  let membersClickHandler = null;
  let membersBtnEl = null;

  function scrollToBottom() {
    if (streamEl) streamEl.scrollTop = streamEl.scrollHeight;
  }

  function appendMessageDom(doc, message) {
    if (!streamEl) return;
    const empty = streamEl.querySelector('.yyt-qq-chat-empty');
    if (empty && empty.parentNode === streamEl) {
      streamEl.removeChild(empty);
    }
    streamEl.appendChild(buildMessageNode(doc, message, qqStorage));
    scrollToBottom();
  }

  return {
    id: `qq-chat:${groupId}`,
    get title() {
      const g = qqStorage.getGroup(groupId);
      return g?.name || '群聊';
    },
    render(ctx) {
      const doc = targetDoc || globalThis.document || document;
      const group = qqStorage.getGroup(groupId);

      const wrap = doc.createElement('div');
      wrap.className = 'yyt-qq-chat';

      if (!group) {
        const err = doc.createElement('div');
        err.className = 'yyt-qq-empty';
        const t = doc.createElement('div');
        t.className = 'yyt-qq-empty-title';
        t.textContent = '群不存在';
        err.appendChild(t);
        const hint = doc.createElement('div');
        hint.textContent = '正在返回……';
        err.appendChild(hint);
        wrap.appendChild(err);
        logger?.error?.(`chatView 找不到 groupId=${groupId}`);
        setTimeout(() => {
          try { ctx.popView(); } catch (_) {}
        }, 50);
        return wrap;
      }

      // 顶部群信息条
      const infoBar = doc.createElement('div');
      infoBar.className = 'yyt-qq-group-info-bar';
      const meta = doc.createElement('div');
      meta.className = 'yyt-qq-group-info-meta';
      const nameEl = doc.createElement('div');
      nameEl.className = 'yyt-qq-group-info-name';
      nameEl.textContent = group.name;
      meta.appendChild(nameEl);
      const countEl = doc.createElement('div');
      countEl.className = 'yyt-qq-group-info-count';
      const memberCount = Array.isArray(group.memberIds) ? group.memberIds.length : 0;
      countEl.textContent = `${memberCount} 成员`;
      meta.appendChild(countEl);
      infoBar.appendChild(meta);

      membersBtnEl = doc.createElement('button');
      membersBtnEl.type = 'button';
      membersBtnEl.className = 'yyt-qq-group-info-btn';
      membersBtnEl.textContent = '成员';
      membersClickHandler = (e) => {
        e.stopPropagation();
        try {
          const latest = qqStorage.getGroup(groupId) || group;
          const body = buildMembersBody(doc, latest, qqStorage);
          dialog.custom({
            title: `${latest.name} - 成员`,
            body,
            buttons: [{
              label: '关闭',
              variant: 'primary',
              onClick: (close) => close(null),
            }],
          });
        } catch (err) {
          logger?.error?.(`打开成员弹窗异常: ${err?.message || err}`, err);
        }
      };
      membersBtnEl.addEventListener('click', membersClickHandler);
      infoBar.appendChild(membersBtnEl);

      wrap.appendChild(infoBar);

      // 消息流
      streamEl = doc.createElement('div');
      streamEl.className = 'yyt-qq-chat-stream';
      const messages = qqStorage.listMessages(groupId);
      if (messages.length === 0) {
        const empty = doc.createElement('div');
        empty.className = 'yyt-qq-chat-empty';
        empty.textContent = '消息流为空。在下方输入并发送消息开始吧～';
        streamEl.appendChild(empty);
      } else {
        for (const msg of messages) {
          streamEl.appendChild(buildMessageNode(doc, msg, qqStorage));
        }
      }
      wrap.appendChild(streamEl);

      // 输入栏
      const inputBar = doc.createElement('div');
      inputBar.className = 'yyt-qq-chat-input-bar';

      inputEl = doc.createElement('textarea');
      inputEl.className = 'yyt-qq-chat-input';
      inputEl.rows = 1;
      inputEl.placeholder = '输入消息，回车发送，Shift+Enter 换行';
      inputBar.appendChild(inputEl);

      sendBtnEl = doc.createElement('button');
      sendBtnEl.type = 'button';
      sendBtnEl.className = 'yyt-qq-chat-send-btn';
      sendBtnEl.textContent = '发送';
      inputBar.appendChild(sendBtnEl);

      wrap.appendChild(inputBar);

      const doSend = () => {
        if (!inputEl) return;
        const raw = inputEl.value;
        const text = String(raw ?? '').trim();
        if (!text) return;
        try {
          const msg = createDefaultMessage({
            groupId,
            sender: MESSAGE_SENDER_USER,
            content: text,
          });
          const stamped = qqStorage.appendMessage(groupId, msg);
          if (!stamped) {
            logger?.warn?.('appendMessage 失败');
            return;
          }
          qqStorage.updateGroup(groupId, { updatedAt: Date.now() });
          appendMessageDom(doc, stamped);
          inputEl.value = '';
          inputEl.focus();
        } catch (err) {
          logger?.error?.(`发送消息异常: ${err?.message || err}`, err);
        }
      };

      sendClickHandler = (e) => {
        e.stopPropagation();
        doSend();
      };
      sendBtnEl.addEventListener('click', sendClickHandler);

      keydownHandler = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
          e.preventDefault();
          e.stopPropagation();
          doSend();
        }
      };
      inputEl.addEventListener('keydown', keydownHandler);

      return wrap;
    },
    onEnter() {
      scrollToBottom();
      try { inputEl?.focus(); } catch (_) {}
    },
    destroy() {
      try {
        if (sendBtnEl && sendClickHandler) sendBtnEl.removeEventListener('click', sendClickHandler);
        if (inputEl && keydownHandler) inputEl.removeEventListener('keydown', keydownHandler);
        if (membersBtnEl && membersClickHandler) membersBtnEl.removeEventListener('click', membersClickHandler);
      } catch (_) {}
      streamEl = null;
      inputEl = null;
      sendBtnEl = null;
      membersBtnEl = null;
      keydownHandler = null;
      sendClickHandler = null;
      membersClickHandler = null;
    },
  };
}
