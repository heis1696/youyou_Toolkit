/**
 * YouYou Toolkit - Floating Ball Menu (Phone Shell)
 * @description 菜单四象限自适应 + 开关控制
 *              分组渲染拆为 screen（图标网格）+ dock（底部常驻），
 *              dock 项独立、screen 项按 group 聚合
 */

import { PID, MENU_HEIGHT_HINT, ORB_SIZE } from './constants.js';

/**
 * 创建菜单控制器
 *
 * @param {Object} deps
 * @param {HTMLElement} deps.root
 * @param {HTMLElement} deps.menu
 * @param {Window} deps.targetWindow
 * @param {Function} deps.onOpen
 * @param {Function} deps.onClose
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
 * 按 dock=true/false 把项分流为 { screen, dock }
 * 并对 screen 项按 group 聚合，按 order 排序
 *
 * @returns {{
 *   screenGroups: Array<{ groupId: string, groupTitle: string, items: Array }>,
 *   dockItems: Array
 * }}
 */
export function partitionItemsForRender(items) {
  const dockItems = [];
  const screenItems = [];

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    if (typeof item.visible === 'function') {
      try {
        if (!item.visible()) continue;
      } catch (_) {
        continue;
      }
    }
    if (item.dock === true) {
      dockItems.push(item);
    } else {
      screenItems.push(item);
    }
  }

  dockItems.sort((a, b) => (a.order ?? 100) - (b.order ?? 100));

  // screen 按 group 聚合
  const groupMap = new Map();
  const insertOrder = [];
  for (const item of screenItems) {
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
  const screenGroups = insertOrder.map((gid) => groupMap.get(gid));

  return { screenGroups, dockItems };
}

const HTML_ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => HTML_ESCAPE_MAP[ch]);
}

/**
 * 渲染屏幕区一个分组：标题 + 4 列图标网格
 */
export function buildScreenGroupContainer(doc, { groupTitle }, itemElements) {
  const frag = doc.createDocumentFragment();
  if (groupTitle) {
    const title = doc.createElement('div');
    title.className = 'phone-group-title';
    title.textContent = groupTitle;
    frag.appendChild(title);
  }
  const grid = doc.createElement('div');
  grid.className = 'phone-icon-grid';
  itemElements.forEach((node) => grid.appendChild(node));
  frag.appendChild(grid);
  return frag;
}

/**
 * 空状态
 */
export function buildEmptyState(doc, text = '暂无菜单项') {
  const div = doc.createElement('div');
  div.className = 'phone-empty';
  div.textContent = text;
  return div;
}

export { PID };
