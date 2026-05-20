/**
 * YouYou Toolkit - Floating Ball Drag
 * @description 5px 阈值 + dragMoved 标记 + mouse/touch/跨 iframe 三套监听
 *              拖拽时关闭 CSS transition；菜单打开时拖拽同步翻转方向
 */

import { DRAG_THRESHOLD, ORB_SIZE, VIEWPORT_PADDING } from './constants.js';

/**
 * 创建拖拽控制器
 *
 * @param {Object} deps
 * @param {HTMLElement} deps.root              根 DOM
 * @param {HTMLElement} deps.orb               浮球本体（可短按打开菜单）
 * @param {HTMLElement} deps.menuHead          菜单顶部条（只拖、不切换菜单）
 * @param {Document} deps.targetDocument
 * @param {Window} deps.targetWindow
 * @param {Function} deps.on                   listenerRegistry.on
 * @param {Function} deps.savePosition         (pos: {x,y}) => void
 * @param {Function} deps.onTapWhenNotDragged  () => void  浮球短按时调（菜单 toggle）
 * @param {Function} deps.onDragMove           (pos: {x,y}) => void  拖拽中实时回调（用于菜单方向同步）
 * @returns {{ isDragging: () => boolean, consumeDragMoved: () => boolean }}
 */
export function createDragController({
  root,
  orb,
  menuHead,
  targetDocument,
  targetWindow,
  on,
  savePosition,
  onTapWhenNotDragged,
  onDragMove,
}) {
  const doc = targetDocument || document;
  const win = targetWindow || window;

  let dragging = false;
  let dragMoved = false;
  let dragTapToggles = false;
  let offsetX = 0;
  let offsetY = 0;
  let dragStartX = 0;
  let dragStartY = 0;

  function start(cx, cy, tapToggles) {
    dragging = true;
    dragMoved = false;
    dragTapToggles = !!tapToggles;
    dragStartX = cx;
    dragStartY = cy;
    const rect = root.getBoundingClientRect();
    offsetX = cx - rect.left;
    offsetY = cy - rect.top;
    root.style.transition = 'none';
  }

  function move(cx, cy) {
    if (!dragging) return false;
    if (!dragMoved) {
      if (Math.hypot(cx - dragStartX, cy - dragStartY) <= DRAG_THRESHOLD) return false;
      dragMoved = true;
    }
    const nx = Math.max(VIEWPORT_PADDING, Math.min(cx - offsetX, win.innerWidth - ORB_SIZE - 2));
    const ny = Math.max(VIEWPORT_PADDING, Math.min(cy - offsetY, win.innerHeight - ORB_SIZE - 2));
    root.style.left = `${nx}px`;
    root.style.top = `${ny}px`;
    if (typeof onDragMove === 'function') {
      try { onDragMove({ x: nx, y: ny }); } catch (_) {}
    }
    return true;
  }

  function end() {
    if (!dragging) return;
    dragging = false;
    root.style.transition = '';
    if (dragMoved && typeof savePosition === 'function') {
      try {
        savePosition({
          x: parseInt(root.style.left, 10) || 0,
          y: parseInt(root.style.top, 10) || 0,
        });
      } catch (_) {}
    }
  }

  const startTargets = [
    { target: orb, tapToggles: true },
    { target: menuHead, tapToggles: false },
  ];

  startTargets.forEach(({ target, tapToggles }) => {
    on(target, 'mousedown', (e) => {
      if (e.target?.closest?.('.menu-close')) return;
      start(e.clientX, e.clientY, tapToggles);
      e.preventDefault();
    });

    on(target, 'touchstart', (e) => {
      if (e.target?.closest?.('.menu-close')) return;
      const t = e.touches?.[0];
      if (!t) return;
      start(t.clientX, t.clientY, tapToggles);
    }, { passive: false });
  });

  on(doc, 'mousemove', (e) => move(e.clientX, e.clientY));
  on(doc, 'mouseup', () => end());

  on(doc, 'touchmove', (e) => {
    if (!dragging) return;
    const t = e.touches?.[0];
    if (!t) return;
    if (move(t.clientX, t.clientY)) {
      e.preventDefault();
    }
  }, { passive: false });

  on(doc, 'touchend', (e) => {
    if (!dragging) return;
    const wasMoved = dragMoved;
    const shouldToggle = dragTapToggles;
    end();
    if (!wasMoved && shouldToggle && typeof onTapWhenNotDragged === 'function') {
      onTapWhenNotDragged();
    }
    dragTapToggles = false;
    if (e.cancelable) {
      try { e.preventDefault(); } catch (_) {}
    }
  }, { passive: false });

  // 跨 iframe 兜底：若运行在 iframe 内，鼠标飞出 iframe 范围后继续监听 parent.document
  try {
    const parentDoc = win.parent?.document;
    if (parentDoc && parentDoc !== doc) {
      on(parentDoc, 'mousemove', (e) => move(e.clientX, e.clientY));
      on(parentDoc, 'mouseup', () => end());
    }
  } catch (_) {
    // 跨域 parent 访问会抛错，忽略
  }

  // 浮球短按 click（鼠标场景；touch 由 touchend 自己处理 tap）
  on(orb, 'click', () => {
    if (dragMoved) {
      dragMoved = false;
      return;
    }
    if (typeof onTapWhenNotDragged === 'function') onTapWhenNotDragged();
  });

  return {
    isDragging: () => dragging,
    consumeDragMoved: () => {
      const v = dragMoved;
      dragMoved = false;
      return v;
    },
  };
}
