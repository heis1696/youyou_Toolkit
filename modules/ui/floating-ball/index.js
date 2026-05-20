/**
 * YouYou Toolkit - Floating Ball Main Entry (Phone Shell)
 * @description 浮球模块公共 API + 生命周期
 *              手机壳形态：状态栏时钟 + 图标网格(screen) + dock 区
 *              z-index 9998 < popup-shell 10000，主弹窗始终覆盖浮球
 */

import { storage } from '../../core/storage-service.js';
import { logger } from '../../core/logger-service.js';
import { eventBus, EVENTS } from '../../core/event-bus.js';
import { settingsService } from '../../core/settings-service.js';

import {
  PID,
  CLEANUP_KEY,
  STORAGE_NS,
  POS_KEY,
  ORB_SIZE,
} from './constants.js';
import { buildStyles } from './styles.js';
import {
  buildRootDom,
  injectStyleTag,
  purgeResidualDom,
  createListenerRegistry,
  computeDefaultPosition,
  clampPosition,
  formatStatusBarTime,
} from './floating-ball-core.js';
import { createDragController } from './floating-ball-drag.js';
import {
  createMenuController,
  partitionItemsForRender,
  buildScreenGroupContainer,
  buildEmptyState,
} from './floating-ball-menu.js';
import {
  createItemRegistry,
  createMutex,
  renderItem,
} from './floating-ball-registry.js';

const scopeLogger = logger.createScope('FloatingBall');
const fbStorage = storage.namespace(STORAGE_NS);

let state = createInitialState();

function createInitialState() {
  return {
    inited: false,
    destroyed: false,
    root: null,
    orb: null,
    menu: null,
    phoneScreen: null,
    phoneContent: null,
    phoneDock: null,
    phoneTime: null,
    dragHandle: null,
    menuClose: null,
    badge: null,
    styleEl: null,
    targetDoc: null,
    targetWin: null,
    cleanupRegistry: null,
    dragController: null,
    menuController: null,
    itemRegistry: null,
    mutex: null,
    itemElCache: new Map(),
    unsubscribers: [],
    openPopupRef: null,
    timeTimer: null,
  };
}

function resetState() {
  state = createInitialState();
}

function makeRenderContextBase() {
  return {
    storage: fbStorage,
    logger: scopeLogger,
    closeMenu: () => state.menuController?.close?.(),
    refresh: (id) => state.itemRegistry?.refresh?.(id),
    mutex: state.mutex,
    get isOpen() { return !!state.menuController?.isOpen?.(); },
  };
}

function renderList() {
  if (!state.phoneContent || !state.phoneDock) return;

  // 清理上一轮 DOM 与 destroy 钩子
  state.itemElCache.forEach(({ destroy }) => {
    if (typeof destroy === 'function') {
      try { destroy(); } catch (_) {}
    }
  });
  state.itemElCache.clear();
  state.phoneContent.innerHTML = '';
  state.phoneDock.innerHTML = '';

  const allItems = state.itemRegistry.getAll();
  const { screenGroups, dockItems } = partitionItemsForRender(allItems);

  const ctxBase = makeRenderContextBase();

  // 屏幕区分组
  if (screenGroups.length === 0 && dockItems.length === 0) {
    state.phoneContent.appendChild(buildEmptyState(state.targetDoc, '暂无菜单项'));
  } else if (screenGroups.length === 0) {
    state.phoneContent.appendChild(buildEmptyState(state.targetDoc, '所有项都在 Dock'));
  } else {
    screenGroups.forEach((group) => {
      const itemEls = [];
      group.items.forEach((item) => {
        const { el, sync } = renderItem(state.targetDoc, item, ctxBase);
        state.itemElCache.set(item.id, { el, sync, destroy: item.destroy });
        itemEls.push(el);
      });
      const groupFrag = buildScreenGroupContainer(
        state.targetDoc,
        { groupTitle: group.groupTitle },
        itemEls
      );
      state.phoneContent.appendChild(groupFrag);
    });
  }

  // dock 区
  dockItems.forEach((item) => {
    const { el, sync } = renderItem(state.targetDoc, item, ctxBase);
    state.itemElCache.set(item.id, { el, sync, destroy: item.destroy });
    state.phoneDock.appendChild(el);
  });
}

function syncItem(id) {
  const entry = state.itemElCache.get(id);
  if (entry?.sync) {
    try { entry.sync(); } catch (err) {
      scopeLogger.error(`项 ${id} sync 异常: ${err?.message || err}`, err);
    }
  }
  syncOrbBadge();
}

function syncAllItems() {
  state.itemElCache.forEach((_, id) => {
    syncItem(id);
  });
}

function syncOrbBadge() {
  if (!state.badge) return;
  let count = 0;
  const items = state.itemRegistry.getAll();
  for (const item of items) {
    if (typeof item.badge === 'function') {
      try {
        const v = item.badge();
        if (typeof v === 'number' && v > 0) count += v;
        else if (typeof v === 'string' && v && v !== '0') count += 1;
      } catch (_) {}
    }
  }
  if (count > 0) {
    state.badge.textContent = count > 99 ? '99+' : String(count);
    state.badge.classList.add('has-count');
  } else {
    state.badge.textContent = '0';
    state.badge.classList.remove('has-count');
  }
}

function updateStatusBarTime() {
  if (!state.phoneTime) return;
  state.phoneTime.textContent = formatStatusBarTime();
}

function startTimeTicker() {
  updateStatusBarTime();
  const now = new Date();
  // 对齐到下一个整分钟，之后每 60s 刷一次
  const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
  state.timeTimer = setTimeout(function tick() {
    updateStatusBarTime();
    state.timeTimer = setInterval(updateStatusBarTime, 60_000);
  }, Math.max(500, msToNextMinute));
}

function stopTimeTicker() {
  if (state.timeTimer != null) {
    clearTimeout(state.timeTimer);
    clearInterval(state.timeTimer);
    state.timeTimer = null;
  }
}

function applyPosition(pos) {
  if (!state.root) return;
  state.root.style.left = `${pos.x}px`;
  state.root.style.top = `${pos.y}px`;
}

function savePosition(pos) {
  try {
    fbStorage.set(POS_KEY, { x: pos.x, y: pos.y });
  } catch (err) {
    scopeLogger.warn(`位置持久化失败: ${err?.message || err}`);
  }
}

// 主面板图标 SVG —— 与浮球本体魔法棒呼应
const ICON_WAND_SVG = `
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <line x1="6" y1="18" x2="14" y2="10" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M15.5 4 L16.5 7.5 L20 8.5 L16.5 9.5 L15.5 13 L14.5 9.5 L11 8.5 L14.5 7.5 Z" fill="#fff"/>
  </svg>
`;

// 紧凑模式图标 —— 闪电
const ICON_BOLT_SVG = `
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M13 2 L4 14 L11 14 L10 22 L20 9 L13 9 Z" fill="currentColor" stroke="none"/>
  </svg>
`;

function registerBuiltinItems() {
  const itemRegistry = state.itemRegistry;

  itemRegistry.registerItem({
    id: 'open-main-ui',
    label: '主面板',
    group: 'shortcuts',
    kind: 'button',
    order: 10,
    dock: true,
    icon: ICON_WAND_SVG,
    iconColor: 'linear-gradient(140deg, #7bb7ff 0%, #4a7ec6 100%)',
    onClick: (ctx) => {
      if (typeof state.openPopupRef === 'function') {
        try { state.openPopupRef(); } catch (err) {
          scopeLogger.error(`打开主面板失败: ${err?.message || err}`, err);
        }
      } else {
        scopeLogger.warn('openPopup 未提供');
      }
      ctx.closeMenu();
    },
  });

  itemRegistry.registerItem({
    id: 'compact-mode',
    label: '紧凑模式',
    group: 'preferences',
    groupTitle: '偏好',
    kind: 'toggle',
    order: 10,
    icon: ICON_BOLT_SVG,
    iconColor: 'linear-gradient(140deg, #3a3d4a 0%, #1f2128 100%)',
    getState: () => {
      try {
        return settingsService.getUiSettings()?.compactMode ? 'on' : 'off';
      } catch (_) {
        return 'off';
      }
    },
    onClick: async () => {
      try {
        const current = settingsService.getUiSettings()?.compactMode === true;
        settingsService.updateUiSettings({ compactMode: !current });
      } catch (err) {
        scopeLogger.error(`切换紧凑模式失败: ${err?.message || err}`, err);
      }
    },
  });
}

function subscribeEvents() {
  const onSettingsUpdated = () => {
    state.itemRegistry?.refresh?.('compact-mode');
  };
  const offSettings = eventBus.on(EVENTS.SETTINGS_UPDATED, onSettingsUpdated);
  state.unsubscribers.push(() => {
    if (typeof offSettings === 'function') offSettings();
  });
}

function destroy() {
  if (!state.inited && !state.root) return;

  stopTimeTicker();

  state.itemElCache.forEach(({ destroy: itemDestroy }) => {
    if (typeof itemDestroy === 'function') {
      try { itemDestroy(); } catch (_) {}
    }
  });
  state.itemElCache.clear();

  state.unsubscribers.forEach((fn) => {
    try { fn(); } catch (_) {}
  });

  try { state.itemRegistry?.destroyAll?.(); } catch (_) {}
  try { state.cleanupRegistry?.removeAll?.(); } catch (_) {}

  if (state.root && typeof state.root.remove === 'function') {
    state.root.remove();
  }
  if (state.styleEl && typeof state.styleEl.remove === 'function') {
    state.styleEl.remove();
  }

  try {
    if (state.targetWin && state.targetWin[CLEANUP_KEY] === destroy) {
      delete state.targetWin[CLEANUP_KEY];
    }
  } catch (_) {}

  resetState();
  state.destroyed = true;
  scopeLogger.log('浮球已销毁');
}

function init(options = {}) {
  const targetDoc = options.targetDocument || document;
  const targetWin = options.targetWindow || window;

  // 重入保护
  try {
    if (typeof targetWin[CLEANUP_KEY] === 'function') {
      try { targetWin[CLEANUP_KEY](); } catch (_) {}
    }
  } catch (_) {}

  purgeResidualDom(targetDoc);

  resetState();
  state.targetDoc = targetDoc;
  state.targetWin = targetWin;
  state.openPopupRef = typeof options.openPopup === 'function' ? options.openPopup : null;

  state.styleEl = injectStyleTag(targetDoc, `${PID}-style`, buildStyles());

  const dom = buildRootDom(targetDoc);
  state.root = dom.root;
  state.orb = dom.orb;
  state.menu = dom.menu;
  state.phoneScreen = dom.phoneScreen;
  state.phoneContent = dom.phoneContent;
  state.phoneDock = dom.phoneDock;
  state.phoneTime = dom.phoneTime;
  state.dragHandle = dom.dragHandle;
  state.menuClose = dom.menuClose;
  state.badge = dom.badge;

  const saved = fbStorage.get(POS_KEY, null);
  const initialPos = saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)
    ? clampPosition(saved, targetWin)
    : computeDefaultPosition(targetWin);
  applyPosition(initialPos);

  (targetDoc.body || targetDoc.documentElement).appendChild(state.root);

  state.cleanupRegistry = createListenerRegistry();
  state.mutex = createMutex();

  state.menuController = createMenuController({
    root: state.root,
    menu: state.menu,
    targetWindow: targetWin,
    onOpen: () => {
      renderList();
      syncAllItems();
      updateStatusBarTime();
    },
    onClose: () => {},
  });

  state.dragController = createDragController({
    root: state.root,
    orb: state.orb,
    menuHead: state.dragHandle,
    targetDocument: targetDoc,
    targetWindow: targetWin,
    on: state.cleanupRegistry.on,
    savePosition,
    onTapWhenNotDragged: () => state.menuController.toggle(),
    onDragMove: () => {
      if (state.menuController.isOpen()) {
        state.menuController.updateDirection();
      }
    },
  });

  state.itemRegistry = createItemRegistry({
    onChange: () => {
      if (state.menuController.isOpen()) {
        renderList();
        syncAllItems();
      }
      syncOrbBadge();
    },
    onRefresh: (id) => {
      if (id == null) {
        syncAllItems();
      } else {
        syncItem(id);
      }
    },
  });

  // 外部点击关闭（dragging 时短路）
  state.cleanupRegistry.on(targetDoc, 'click', (e) => {
    if (!state.menuController.isOpen()) return;
    if (state.dragController.isDragging()) return;
    if (state.root.contains(e.target)) return;
    state.menuController.close();
  });

  // 关闭按钮
  state.cleanupRegistry.on(state.menuClose, 'click', (e) => {
    e.stopPropagation();
    state.menuController.close();
  });

  // 窗口尺寸变化
  state.cleanupRegistry.on(targetWin, 'resize', () => {
    if (!state.root) return;
    const cur = {
      x: parseInt(state.root.style.left, 10) || 0,
      y: parseInt(state.root.style.top, 10) || 0,
    };
    const clamped = clampPosition(cur, targetWin);
    applyPosition(clamped);
    if (state.menuController.isOpen()) {
      state.menuController.updateDirection();
    }
  });

  registerBuiltinItems();
  subscribeEvents();
  syncOrbBadge();
  startTimeTicker();

  try { targetWin[CLEANUP_KEY] = destroy; } catch (_) {}

  state.inited = true;
  scopeLogger.log('浮球已初始化');
}

function isReady() {
  return state.inited === true && !!state.root;
}

function ensureReady(action) {
  if (!isReady()) {
    scopeLogger.warn(`浮球未就绪，${action} 被忽略`);
    return false;
  }
  return true;
}

function registerItem(item) {
  if (!ensureReady('registerItem')) return () => {};
  return state.itemRegistry.registerItem(item);
}

function unregisterItem(id) {
  if (!ensureReady('unregisterItem')) return false;
  return state.itemRegistry.unregisterItem(id);
}

function updateItem(id, partial) {
  if (!ensureReady('updateItem')) return false;
  const ok = state.itemRegistry.updateItem(id, partial);
  if (ok && state.menuController.isOpen()) {
    renderList();
    syncAllItems();
  }
  return ok;
}

function refresh(id) {
  if (!ensureReady('refresh')) return;
  state.itemRegistry.refresh(id);
}

function setVisible(visible) {
  if (!ensureReady('setVisible')) return;
  state.root.classList.toggle('is-hidden', !visible);
}

function openMenu() {
  if (!ensureReady('openMenu')) return;
  state.menuController.open();
}

function closeMenu() {
  if (!ensureReady('closeMenu')) return;
  state.menuController.close();
}

function toggleMenu(open) {
  if (!ensureReady('toggleMenu')) return;
  if (open === true) state.menuController.open();
  else if (open === false) state.menuController.close();
  else state.menuController.toggle();
}

export const floatingBall = {
  init,
  destroy,
  isReady,
  registerItem,
  unregisterItem,
  updateItem,
  refresh,
  setVisible,
  openMenu,
  closeMenu,
  toggleMenu,
};

export default floatingBall;
