/**
 * YouYou Toolkit - Floating Ball Main Entry
 * @description 浮球模块公共 API + 生命周期
 *              负责 DOM 注入、控制器装配、内置项注册、重入保护
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
} from './floating-ball-core.js';
import { createDragController } from './floating-ball-drag.js';
import {
  createMenuController,
  groupItemsForRender,
  buildGroupContainer,
  buildEmptyState,
} from './floating-ball-menu.js';
import {
  createItemRegistry,
  createMutex,
  renderItem,
} from './floating-ball-registry.js';

const scopeLogger = logger.createScope('FloatingBall');
const fbStorage = storage.namespace(STORAGE_NS);

let state = {
  inited: false,
  destroyed: false,
  root: null,
  orb: null,
  menu: null,
  menuList: null,
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
};

function resetState() {
  state = {
    inited: false,
    destroyed: false,
    root: null,
    orb: null,
    menu: null,
    menuList: null,
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
  };
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
  if (!state.menuList) return;

  state.itemElCache.forEach(({ destroy }) => {
    if (typeof destroy === 'function') {
      try { destroy(); } catch (_) {}
    }
  });
  state.itemElCache.clear();
  state.menuList.innerHTML = '';

  const allItems = state.itemRegistry.getAll();
  const groups = groupItemsForRender(allItems);

  if (groups.length === 0) {
    state.menuList.appendChild(buildEmptyState(state.targetDoc, '暂无菜单项'));
    return;
  }

  const ctxBase = makeRenderContextBase();
  groups.forEach((group) => {
    const itemEls = [];
    group.items.forEach((item) => {
      const { el, sync } = renderItem(state.targetDoc, item, ctxBase);
      state.itemElCache.set(item.id, { el, sync, destroy: item.destroy });
      itemEls.push(el);
    });
    const groupContainer = buildGroupContainer(
      state.targetDoc,
      { groupTitle: group.groupTitle },
      itemEls
    );
    state.menuList.appendChild(groupContainer);
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

function registerBuiltinItems() {
  const itemRegistry = state.itemRegistry;

  itemRegistry.registerItem({
    id: 'open-main-ui',
    label: '打开主面板',
    group: 'shortcuts',
    groupTitle: '快捷入口',
    kind: 'button',
    order: 10,
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

  // 重入保护：旧实例先 cleanup
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
  state.menuList = dom.menuList;
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
    },
    onClose: () => {},
  });

  state.dragController = createDragController({
    root: state.root,
    orb: state.orb,
    menuHead: dom.menuHead,
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

  // 外部点击关闭（dragging 时短路 —— dash-deck-analysis 改进点 #3）
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

  // 窗口尺寸变化 → 重新 clamp + 同步菜单方向
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
