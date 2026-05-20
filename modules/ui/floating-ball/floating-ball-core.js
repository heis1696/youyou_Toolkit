/**
 * YouYou Toolkit - Floating Ball Core
 * @description DOM 创建 / listener registry / cleanup / 重入保护
 *              所有 addEventListener 走 on() 包装，cleanup 时反向卸载
 */

import { PID, ORB_SIZE } from './constants.js';

/**
 * 构建浮球 root DOM
 * @returns {{ root: HTMLElement, orb: HTMLElement, menu: HTMLElement, menuHead: HTMLElement, menuList: HTMLElement, menuClose: HTMLElement, badge: HTMLElement }}
 */
export function buildRootDom(targetDocument) {
  const doc = targetDocument || document;

  const root = doc.createElement('div');
  root.id = PID;

  root.innerHTML = `
    <button class="orb" id="${PID}-orb" type="button" aria-label="YouYou 工具箱浮球">
      <svg class="orb-emoji" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
        <defs>
          <linearGradient id="${PID}-grad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="55%" stop-color="#d8d8d8"/>
            <stop offset="100%" stop-color="#9e9e9e"/>
          </linearGradient>
          <filter id="${PID}-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="${PID}-outer" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feFlood flood-color="#7bb7ff" flood-opacity="0.4" result="c"/>
            <feComposite in="c" in2="b" operator="in" result="d"/>
            <feMerge><feMergeNode in="d"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <circle cx="12" cy="12" r="9.4" fill="none" stroke="url(#${PID}-grad)" stroke-width="1.25" filter="url(#${PID}-outer)"/>
        <g filter="url(#${PID}-glow)" style="transform-origin:12px 12px; animation: ${PID}-spin 20s linear infinite;">
          <polygon points="12,4.6 18.4,15.65 5.6,15.65" fill="none" stroke="url(#${PID}-grad)" stroke-width="1.05" stroke-linejoin="round"/>
          <polygon points="12,19.4 5.6,8.35 18.4,8.35" fill="none" stroke="url(#${PID}-grad)" stroke-width="1.05" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="3.15" fill="none" stroke="url(#${PID}-grad)" stroke-width="0.55" opacity="0.5"/>
        </g>
        <circle cx="12" cy="12" r="1.3" fill="#7bb7ff" opacity="0.9" style="animation: ${PID}-pulse 3s ease-in-out infinite;"/>
      </svg>
      <span class="orb-badge" id="${PID}-orb-badge">0</span>
    </button>

    <div class="menu" id="${PID}-menu">
      <div class="menu-shell">
        <div class="menu-head" id="${PID}-head">
          <span style="font-size:16px;line-height:1;">🪄</span>
          <div class="menu-title">YouYou 工具箱</div>
          <button class="menu-close" id="${PID}-close" type="button" aria-label="关闭菜单">✕</button>
        </div>
        <div class="menu-list" id="${PID}-list"></div>
        <div class="menu-foot">
          <span>悬浮入口</span>
          <span class="foot-brand">YouYou Toolkit</span>
        </div>
      </div>
    </div>
  `;

  return {
    root,
    orb: root.querySelector(`#${PID}-orb`),
    menu: root.querySelector(`#${PID}-menu`),
    menuHead: root.querySelector(`#${PID}-head`),
    menuList: root.querySelector(`#${PID}-list`),
    menuClose: root.querySelector(`#${PID}-close`),
    badge: root.querySelector(`#${PID}-orb-badge`),
  };
}

/**
 * 注入样式
 */
export function injectStyleTag(targetDocument, styleId, cssText) {
  const doc = targetDocument || document;
  if (doc.getElementById(styleId)) return null;
  const style = doc.createElement('style');
  style.id = styleId;
  style.textContent = cssText;
  (doc.head || doc.documentElement).appendChild(style);
  return style;
}

/**
 * 清理可能残留的旧实例 DOM
 */
export function purgeResidualDom(targetDocument) {
  const doc = targetDocument || document;
  [PID, `${PID}-style`].forEach((id) => {
    const node = doc.getElementById(id);
    if (node && typeof node.remove === 'function') {
      node.remove();
    }
  });
}

/**
 * 创建 listenerRegistry + on() 包装
 * @returns {{ on: Function, removeAll: Function }}
 */
export function createListenerRegistry() {
  const registry = [];

  function on(target, event, handler, options) {
    if (!target || typeof target.addEventListener !== 'function') return;
    try {
      target.addEventListener(event, handler, options);
      registry.push({ target, event, handler, options });
    } catch (err) {
      // 跨域 / 已销毁 target 会抛错，吞掉但不阻塞流程
    }
  }

  function removeAll() {
    while (registry.length) {
      const { target, event, handler, options } = registry.pop();
      try { target.removeEventListener(event, handler, options); } catch (_) {}
    }
  }

  return { on, removeAll };
}

/**
 * 计算默认初始位置：移动端右下、桌面端左上
 */
export function computeDefaultPosition(targetWindow) {
  const win = targetWindow || window;
  const isMobile = win.innerWidth <= 768;
  return isMobile
    ? { x: win.innerWidth - ORB_SIZE - 12, y: win.innerHeight - ORB_SIZE - 80 }
    : { x: 40, y: 160 };
}

/**
 * clamp 位置到当前视口内
 */
export function clampPosition(pos, targetWindow) {
  const win = targetWindow || window;
  return {
    x: Math.max(4, Math.min(Number.isFinite(pos?.x) ? pos.x : 0, win.innerWidth - ORB_SIZE - 2)),
    y: Math.max(4, Math.min(Number.isFinite(pos?.y) ? pos.y : 0, win.innerHeight - ORB_SIZE - 2)),
  };
}
