/**
 * YouYou Toolkit - Floating Ball Core
 * @description DOM 创建 / listener registry / cleanup / 重入保护
 *              手机壳形态：notch + 状态栏 + 屏幕区(content) + dock + home indicator
 *              拖拽源由旧 .menu-head 改为 .phone-drag-handle
 */

import { PID, ORB_SIZE } from './constants.js';

/**
 * 构建浮球 root DOM（手机壳形态）
 * @returns {{
 *   root: HTMLElement,
 *   orb: HTMLElement,
 *   menu: HTMLElement,
 *   phoneScreen: HTMLElement,
 *   phoneContent: HTMLElement,
 *   phoneDock: HTMLElement,
 *   phoneTime: HTMLElement,
 *   dragHandle: HTMLElement,
 *   menuClose: HTMLElement,
 *   badge: HTMLElement,
 * }}
 */
export function buildRootDom(targetDocument) {
  const doc = targetDocument || document;

  const root = doc.createElement('div');
  root.id = PID;

  root.innerHTML = `
    <button class="orb" id="${PID}-orb" type="button" aria-label="YouYou 工具箱浮球">
      <svg class="orb-emoji" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
        <defs>
          <linearGradient id="${PID}-wand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#7bb7ff" stop-opacity="0.95"/>
          </linearGradient>
          <linearGradient id="${PID}-handle-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8a96b0"/>
            <stop offset="100%" stop-color="#d8e0ee"/>
          </linearGradient>
          <filter id="${PID}-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="0.9" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <line x1="5.5" y1="18.5" x2="14" y2="10" stroke="url(#${PID}-handle-grad)" stroke-width="2.1" stroke-linecap="round"/>

        <g filter="url(#${PID}-soft-glow)" style="transform-origin:15.5px 8.5px; animation: ${PID}-spin 18s linear infinite;">
          <path d="M15.5 4 L16.5 7.5 L20 8.5 L16.5 9.5 L15.5 13 L14.5 9.5 L11 8.5 L14.5 7.5 Z"
                fill="url(#${PID}-wand-grad)"/>
        </g>

        <circle cx="19.5" cy="5"  r="0.95" fill="#ffffff" opacity="0.85"
                style="animation: ${PID}-twinkle 2.6s ease-in-out infinite;"/>
        <circle cx="20"   cy="13" r="0.7"  fill="#7bb7ff" opacity="0.85"
                style="animation: ${PID}-twinkle 2.2s ease-in-out infinite 0.8s;"/>
        <circle cx="11"   cy="6"  r="0.6"  fill="#ffffff" opacity="0.7"
                style="animation: ${PID}-twinkle 3.1s ease-in-out infinite 1.4s;"/>
      </svg>
      <span class="orb-badge" id="${PID}-orb-badge">0</span>
    </button>

    <div class="menu" id="${PID}-menu">
      <div class="menu-shell">
        <div class="phone-screen">
          <div class="phone-notch"></div>
          <div class="phone-drag-handle" id="${PID}-drag-handle"></div>

          <div class="phone-statusbar">
            <div class="phone-statusbar-left">
              <span class="phone-time" id="${PID}-time">9:41</span>
            </div>
            <div class="phone-statusbar-right">
              <div class="phone-signal" aria-hidden="true">
                <span></span><span></span><span></span><span></span>
              </div>
              <div class="phone-battery" aria-hidden="true">
                <div class="phone-battery-fill" style="width: 78%;"></div>
              </div>
            </div>
          </div>

          <button class="menu-close" id="${PID}-close" type="button" aria-label="关闭菜单">✕</button>

          <div class="phone-content" id="${PID}-content"></div>
          <div class="phone-dock" id="${PID}-dock"></div>
          <div class="phone-home-indicator" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  `;

  return {
    root,
    orb: root.querySelector(`#${PID}-orb`),
    menu: root.querySelector(`#${PID}-menu`),
    phoneScreen: root.querySelector('.phone-screen'),
    phoneContent: root.querySelector(`#${PID}-content`),
    phoneDock: root.querySelector(`#${PID}-dock`),
    phoneTime: root.querySelector(`#${PID}-time`),
    dragHandle: root.querySelector(`#${PID}-drag-handle`),
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

/**
 * 格式化当前时间为状态栏样式 "H:MM"
 */
export function formatStatusBarTime(date) {
  const d = date instanceof Date ? date : new Date();
  const hour = d.getHours();
  const minute = String(d.getMinutes()).padStart(2, '0');
  return `${hour}:${minute}`;
}
