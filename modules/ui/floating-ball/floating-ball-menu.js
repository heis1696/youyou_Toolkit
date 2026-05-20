/**
 * YouYou Toolkit - Floating Ball Menu
 * @description 菜单四象限自适应 + 开关控制
 */

import { PID, MENU_HEIGHT_HINT, ORB_SIZE } from './constants.js';

/**
 * 创建菜单控制器
 *
 * @param {Object} deps
 * @param {HTMLElement} deps.root
 * @param {HTMLElement} deps.menu
 * @param {Window} deps.targetWindow
 * @param {Function} deps.onOpen   () => void  打开时回调（菜单 list 重新渲染 + 拉状态）
 * @param {Function} deps.onClose  () => void
 */
export function createMenuController({ root, menu, targetWindow, onOpen, onClose }) {
  const win = targetWindow || window;
  let isOpen = false;

  function updateDirection() {
    const orbX = parseInt(root.style.left, 10) || 0;
    const orbY = parseInt(root.style.top, 10) || 0;

    if (orbX < win.innerWidth / 2) {
      menu.style.left = '0';
      menu.style.right = 'auto';
    } else {
      menu.style.left = 'auto';
      menu.style.right = '0';
    }

    const spaceBelow = win.innerHeight - orbY - (ORB_SIZE + 12);
    if (spaceBelow < MENU_HEIGHT_HINT && orbY > MENU_HEIGHT_HINT / 2) {
      menu.style.top = 'auto';
      menu.style.bottom = `${ORB_SIZE + 4}px`;
      root.classList.add('is-open-up');
      menu.style.transformOrigin = orbX < win.innerWidth / 2 ? 'bottom left' : 'bottom right';
    } else {
      menu.style.top = `${ORB_SIZE + 4}px`;
      menu.style.bottom = 'auto';
      root.classList.remove('is-open-up');
      menu.style.transformOrigin = orbX < win.innerWidth / 2 ? 'top left' : 'top right';
    }
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    updateDirection();
    root.classList.add('is-open');
    if (typeof onOpen === 'function') {
      try { onOpen(); } catch (_) {}
    }
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    root.classList.remove('is-open', 'is-open-up');
    if (typeof onClose === 'function') {
      try { onClose(); } catch (_) {}
    }
  }

  function toggle() {
    if (isOpen) close(); else open();
  }

  return {
    open,
    close,
    toggle,
    isOpen: () => isOpen,
    updateDirection,
  };
}

/**
 * 把项按 group 聚合成 [{ groupId, groupTitle, items: [...] }] 数组
 * 未指定 group 的项归入 `_default` 组（不显示折叠头，扁平列出）
 *
 * @param {Array} items
 * @returns {Array<{ groupId: string, groupTitle: string, items: Array }>}
 */
export function groupItemsForRender(items) {
  const groupMap = new Map();
  const insertOrder = [];

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    if (typeof item.visible === 'function') {
      try {
        if (!item.visible()) continue;
      } catch (_) {
        continue;
      }
    }
    const gid = String(item.group || '_default');
    if (!groupMap.has(gid)) {
      groupMap.set(gid, {
        groupId: gid,
        groupTitle: item.groupTitle || (gid === '_default' ? '' : gid),
        items: [],
      });
      insertOrder.push(gid);
    } else if (item.groupTitle && !groupMap.get(gid).groupTitle) {
      groupMap.get(gid).groupTitle = item.groupTitle;
    }
    groupMap.get(gid).items.push(item);
  }

  for (const g of groupMap.values()) {
    g.items.sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
  }

  return insertOrder.map((gid) => groupMap.get(gid));
}

const HTML_ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => HTML_ESCAPE_MAP[ch]);
}

/**
 * 渲染一个分组容器（含折叠头），并把 itemElements 塞进去
 */
export function buildGroupContainer(doc, { groupTitle }, itemElements) {
  if (!groupTitle) {
    const wrap = doc.createElement('div');
    wrap.className = 'fab-group';
    itemElements.forEach((node) => wrap.appendChild(node));
    return wrap;
  }
  const details = doc.createElement('details');
  details.open = true;
  details.className = 'fab-group';
  const summary = doc.createElement('summary');
  summary.textContent = groupTitle;
  details.appendChild(summary);
  const body = doc.createElement('div');
  body.className = 'group-body';
  itemElements.forEach((node) => body.appendChild(node));
  details.appendChild(body);
  return details;
}

/**
 * 渲染空状态
 */
export function buildEmptyState(doc, text = '暂无菜单项') {
  const div = doc.createElement('div');
  div.className = 'fab-empty';
  div.textContent = text;
  return div;
}

export { PID };
