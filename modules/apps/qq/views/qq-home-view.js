/**
 * YouYou Toolkit - QQ App Home View (Phase B)
 *
 * 主页：群列表（按 updatedAt desc 排序）+ "新建群"浮动按钮
 * 不持久化"当前打开的群"（B11）；重开默认回主页
 */

import { dialog } from '../../../ui/components/controls/index.js';
import { createDefaultGroup } from '../qq-types.js';
import { createChatView } from './qq-chat-view.js';

function formatTime(ts) {
  if (!ts || !Number.isFinite(ts)) return '';
  const d = new Date(ts);
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const pad = (n) => String(n).padStart(2, '0');
  if (sameDay) return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (d.getFullYear() === now.getFullYear()) return `${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  return `${String(d.getFullYear()).slice(2)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function firstChar(name) {
  const s = String(name || '').trim();
  return s ? Array.from(s)[0] : '?';
}

export function createHomeView({ qqStorage, logger, targetDoc }) {
  return {
    id: 'qq-home',
    title: 'QQ',
    render(ctx) {
      const doc = targetDoc || globalThis.document || document;
      const wrap = doc.createElement('div');
      wrap.className = 'yyt-qq-home';

      const list = doc.createElement('div');
      list.className = 'yyt-qq-home-list';
      wrap.appendChild(list);

      const groups = qqStorage.listGroups()
        .slice()
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

      if (groups.length === 0) {
        const empty = doc.createElement('div');
        empty.className = 'yyt-qq-empty';
        const t = doc.createElement('div');
        t.className = 'yyt-qq-empty-title';
        t.textContent = '还没有群';
        empty.appendChild(t);
        const hint = doc.createElement('div');
        hint.textContent = '点击右下角 + 新建一个群';
        empty.appendChild(hint);
        list.appendChild(empty);
      } else {
        for (const group of groups) {
          list.appendChild(buildGroupRow(doc, group, qqStorage, ctx));
        }
      }

      const addBtn = doc.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'yyt-qq-home-new-btn';
      addBtn.setAttribute('aria-label', '新建群');
      addBtn.textContent = '+';
      addBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
          const name = await dialog.prompt({
            title: '新建群',
            placeholder: '群名',
            confirmText: '创建',
            validate: (v) => {
              const t = String(v || '').trim();
              if (!t) return '群名不能为空';
              if (t.length > 30) return '群名最多 30 字';
              return null;
            },
          });
          if (!name) return;
          const created = qqStorage.addGroup(createDefaultGroup({ name }));
          if (!created) {
            logger?.warn?.('新建群失败');
            return;
          }
          // 重渲主页（B11）
          ctx.replaceView(createHomeView({ qqStorage, logger, targetDoc }));
        } catch (err) {
          logger?.error?.(`新建群异常: ${err?.message || err}`, err);
        }
      });
      wrap.appendChild(addBtn);

      return wrap;
    },
  };
}

function buildGroupRow(doc, group, qqStorage, ctx) {
  const row = doc.createElement('div');
  row.className = 'yyt-qq-home-item';
  row.setAttribute('data-group-id', group.id);

  const avatar = doc.createElement('div');
  avatar.className = 'yyt-qq-home-item-avatar';
  avatar.textContent = firstChar(group.name);
  row.appendChild(avatar);

  const body = doc.createElement('div');
  body.className = 'yyt-qq-home-item-body';

  const topRow = doc.createElement('div');
  topRow.className = 'yyt-qq-home-item-row';
  const nameEl = doc.createElement('div');
  nameEl.className = 'yyt-qq-home-item-name';
  const memberCount = Array.isArray(group.memberIds) ? group.memberIds.length : 0;
  nameEl.textContent = memberCount > 0 ? group.name : `${group.name} (0 成员)`;
  topRow.appendChild(nameEl);

  const timeEl = doc.createElement('div');
  timeEl.className = 'yyt-qq-home-item-time';
  topRow.appendChild(timeEl);

  body.appendChild(topRow);

  const previewEl = doc.createElement('div');
  previewEl.className = 'yyt-qq-home-item-preview';
  body.appendChild(previewEl);

  const messages = qqStorage.listMessages(group.id);
  const last = messages[messages.length - 1] || null;
  if (last) {
    timeEl.textContent = formatTime(last.timestamp || group.updatedAt);
    const senderLabel = last.sender === 'user'
      ? '我'
      : (qqStorage.getFriend?.(last.sender)?.name || '?');
    previewEl.textContent = `${senderLabel}：${String(last.content || '')}`;
  } else {
    timeEl.textContent = formatTime(group.updatedAt);
    previewEl.classList.add('is-empty');
    previewEl.textContent = '暂无消息';
  }

  row.appendChild(body);

  row.addEventListener('click', (e) => {
    e.stopPropagation();
    try {
      ctx.pushView(createChatView({
        groupId: group.id,
        qqStorage,
        logger: ctx.logger,
        targetDoc: doc,
      }));
    } catch (err) {
      ctx.logger?.error?.(`进入群聊失败: ${err?.message || err}`, err);
    }
  });

  return row;
}
