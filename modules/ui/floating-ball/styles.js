/**
 * YouYou Toolkit - Floating Ball Styles (Phone Shell)
 * @description PID 强前缀 CSS。完整手机壳形态：notch + 状态栏 + 屏幕区 + dock + home indicator
 *              z-index 9998 故意低于 popup-shell (10000)
 */

import { PID } from './constants.js';

export function buildStyles() {
  return `
    #${PID} {
      position: fixed !important;
      z-index: 9998 !important;
      width: 52px; height: 52px;
      font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
      user-select: none; -webkit-user-select: none; touch-action: auto;
      transform: translateZ(0);
      animation: ${PID}-pop 0.22s cubic-bezier(0.34, 1.3, 0.64, 1) both;
    }
    #${PID}.is-hidden { display: none !important; }

    @keyframes ${PID}-pop {
      from { opacity: 0; transform: scale(0.5); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes ${PID}-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes ${PID}-twinkle {
      0%, 100% { opacity: 0.2; transform: scale(0.7); }
      50%      { opacity: 1;   transform: scale(1.15); }
    }

    #${PID} .orb {
      position: absolute; top: 0; left: 0;
      width: 52px; height: 52px; border-radius: 14px; cursor: pointer; z-index: 2;
      background: linear-gradient(180deg, rgba(36, 36, 36, 0.88), rgba(8, 8, 8, 0.92));
      backdrop-filter: blur(18px) saturate(135%) brightness(0.78);
      -webkit-backdrop-filter: blur(18px) saturate(135%) brightness(0.78);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.48), 0 0 18px rgba(123, 183, 255, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.13);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
      border: none; padding: 0; color: var(--yyt-text, #f2f2f2);
      -webkit-tap-highlight-color: transparent;
    }
    #${PID} .orb:hover {
      background: linear-gradient(180deg, rgba(58, 58, 58, 0.92), rgba(14, 14, 14, 0.95));
      box-shadow: 0 8px 30px rgba(123, 183, 255, 0.28), 0 6px 26px rgba(0, 0, 0, 0.52), inset 0 1px 0 rgba(255, 255, 255, 0.16);
      transform: scale(1.08);
    }
    #${PID} .orb-emoji { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); display: block; }
    #${PID} .orb:hover .orb-emoji { transform: scale(1.16); }
    #${PID}.is-open .orb-emoji { transform: rotate(18deg) scale(1.1); }

    #${PID} .orb-badge {
      position: absolute; top: -5px; right: -5px; min-width: 20px; height: 20px;
      background: var(--yyt-accent, #7bb7ff); color: #0a0d13;
      font-size: 11px; font-weight: 800; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      padding: 0 5px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      opacity: 0; transform: scale(0);
      transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
      font-family: 'Consolas', 'Monaco', monospace; pointer-events: none;
    }
    #${PID} .orb-badge.has-count { opacity: 1; transform: scale(1); }

    /* ─── 手机外壳 ─────────────────────────────────────────────── */
    #${PID} .menu {
      position: absolute; width: 300px; pointer-events: none;
      transform: scale(0.92) translateY(-4px); opacity: 0;
      transition: transform 0.22s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.18s ease;
      will-change: opacity, transform;
    }
    @media (max-width: 768px) {
      #${PID} .menu { width: min(280px, calc(100vw - 28px)); }
    }
    #${PID}.is-open .menu { pointer-events: all; transform: scale(1) translateY(0); opacity: 1; }
    #${PID}.is-open-up .menu { transform: scale(0.92) translateY(4px); }
    #${PID}.is-open.is-open-up .menu { transform: scale(1) translateY(0); }

    #${PID} .menu-shell {
      position: relative;
      border-radius: 36px;
      padding: 8px;
      background: linear-gradient(160deg, #2c2c2e 0%, #1a1a1c 50%, #0a0a0c 100%);
      box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(255, 255, 255, 0.06),
        inset 0 0 0 1px rgba(255, 255, 255, 0.04),
        inset 0 2px 0 rgba(255, 255, 255, 0.08);
      isolation: isolate;
      transform: translateZ(0);
    }

    /* 物理按键描边 (右上电源、左上音量) */
    #${PID} .menu-shell::before {
      content: '';
      position: absolute; right: -2px; top: 84px;
      width: 3px; height: 56px;
      background: linear-gradient(90deg, #2a2a2c, #1a1a1c);
      border-radius: 0 2px 2px 0;
    }
    #${PID} .menu-shell::after {
      content: '';
      position: absolute; left: -2px; top: 70px;
      width: 3px; height: 32px;
      background: linear-gradient(270deg, #2a2a2c, #1a1a1c);
      border-radius: 2px 0 0 2px;
      box-shadow: 0 44px 0 0 #1a1a1c, 0 44px 0 1px rgba(0,0,0,0.4);
    }

    /* 屏幕区域 (黑色玻璃，圆角内嵌) */
    #${PID} .phone-screen {
      position: relative;
      border-radius: 30px;
      background: linear-gradient(180deg, #0d0e12 0%, #14151a 100%);
      overflow: hidden;
      min-height: 380px;
      max-height: 70vh;
      display: flex; flex-direction: column;
    }

    /* notch (动态岛风格) */
    #${PID} .phone-notch {
      position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
      width: 70px; height: 18px;
      background: #000;
      border-radius: 12px;
      z-index: 3;
      box-shadow: inset 0 0 0 0.5px rgba(255,255,255,0.04);
    }
    #${PID} .phone-notch::after {
      content: ''; position: absolute;
      right: 8px; top: 50%; transform: translateY(-50%);
      width: 4px; height: 4px; border-radius: 50%;
      background: radial-gradient(circle, #1a3a4a 30%, #0a1a2a 100%);
      box-shadow: 0 0 2px rgba(123,183,255,0.4);
    }

    /* 状态栏 */
    #${PID} .phone-statusbar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 22px 8px 22px;
      font-size: 11px; font-weight: 600;
      color: rgba(255,255,255,0.85);
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }
    #${PID} .phone-statusbar-left { display: flex; align-items: center; gap: 4px; }
    #${PID} .phone-statusbar-right { display: flex; align-items: center; gap: 5px; }
    #${PID} .phone-signal {
      display: inline-flex; align-items: flex-end; gap: 1.5px;
    }
    #${PID} .phone-signal span {
      width: 2.5px; background: rgba(255,255,255,0.85); border-radius: 0.5px;
    }
    #${PID} .phone-signal span:nth-child(1) { height: 3px; }
    #${PID} .phone-signal span:nth-child(2) { height: 5px; }
    #${PID} .phone-signal span:nth-child(3) { height: 7px; }
    #${PID} .phone-signal span:nth-child(4) { height: 9px; }
    #${PID} .phone-battery {
      width: 22px; height: 11px; border: 1px solid rgba(255,255,255,0.5);
      border-radius: 3px; padding: 1px; position: relative;
    }
    #${PID} .phone-battery::after {
      content: ''; position: absolute; right: -3px; top: 3px;
      width: 1.5px; height: 4px; background: rgba(255,255,255,0.5);
      border-radius: 0 1px 1px 0;
    }
    #${PID} .phone-battery-fill {
      height: 100%; background: rgba(255,255,255,0.85); border-radius: 1.5px;
    }

    /* 应用区域 */
    #${PID} .phone-content {
      flex: 1;
      padding: 14px 14px 6px 14px;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: none;
    }
    #${PID} .phone-content::-webkit-scrollbar { display: none; }

    /* 拖拽抓手 (代替顶部 menu-head) */
    #${PID} .phone-drag-handle {
      position: absolute; top: 0; left: 0; right: 0; height: 32px;
      cursor: grab; z-index: 4; -webkit-tap-highlight-color: transparent;
    }
    #${PID} .phone-drag-handle:active { cursor: grabbing; }

    /* 关闭按钮 (右上角圆形) */
    #${PID} .menu-close {
      position: absolute; top: 36px; right: 16px;
      width: 22px; height: 22px; border-radius: 50%;
      background: rgba(255,255,255,0.08); border: none;
      color: rgba(255,255,255,0.55); font-size: 11px; padding: 0;
      cursor: pointer; z-index: 5;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    #${PID} .menu-close:hover {
      background: rgba(255,255,255,0.16); color: #fff; transform: scale(1.08);
    }

    /* 分组标题 (轻量化) */
    #${PID} .phone-group-title {
      font-size: 10.5px; font-weight: 600;
      color: rgba(255,255,255,0.45);
      padding: 8px 6px 6px 6px; letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    /* 图标网格 */
    #${PID} .phone-icon-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px 8px;
      padding: 4px 4px 14px 4px;
    }

    /* 单个 APP 图标 */
    #${PID} .phone-app {
      display: flex; flex-direction: column; align-items: center; gap: 5px;
      cursor: pointer; -webkit-tap-highlight-color: transparent;
      transition: transform 0.15s;
    }
    #${PID} .phone-app:active { transform: scale(0.92); }
    #${PID} .phone-app.is-disabled { opacity: 0.4; cursor: not-allowed; filter: grayscale(0.6); }

    #${PID} .phone-app-icon {
      position: relative;
      width: 48px; height: 48px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; line-height: 1;
      background: linear-gradient(140deg, #3a3d4a 0%, #1f2128 100%);
      box-shadow: 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
      transition: all 0.2s ease;
      color: #fff;
    }
    #${PID} .phone-app:hover .phone-app-icon {
      transform: translateY(-2px);
      box-shadow: 0 8px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
    }

    /* on 态: 蓝色发光 */
    #${PID} .phone-app.is-on .phone-app-icon {
      background: linear-gradient(140deg, #5b9bd9 0%, #3a6db5 100%);
      box-shadow:
        0 4px 16px rgba(123, 183, 255, 0.45),
        0 0 0 1px rgba(123, 183, 255, 0.3),
        inset 0 1px 0 rgba(255,255,255,0.2);
    }
    #${PID} .phone-app.is-on .phone-app-icon::after {
      content: ''; position: absolute; inset: 0; border-radius: 12px;
      background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%);
      pointer-events: none;
    }

    #${PID} .phone-app.is-missing .phone-app-icon { opacity: 0.5; }

    /* APP 内部图标 (SVG 或 emoji) */
    #${PID} .phone-app-icon svg { width: 24px; height: 24px; }

    /* badge 红点 */
    #${PID} .phone-app-badge {
      position: absolute; top: -4px; right: -4px;
      min-width: 16px; height: 16px; padding: 0 4px;
      border-radius: 8px; background: #ff453a; color: #fff;
      font-size: 9.5px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      line-height: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.5);
      border: 1.5px solid #14151a;
    }

    /* APP 文字标签 */
    #${PID} .phone-app-label {
      font-size: 10.5px; line-height: 1.2;
      color: rgba(255,255,255,0.85);
      text-align: center; max-width: 60px;
      overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap;
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    }
    #${PID} .phone-app.is-on .phone-app-label { color: #fff; font-weight: 600; }

    /* 空状态 */
    #${PID} .phone-empty {
      padding: 32px 16px; text-align: center; font-size: 11.5px;
      color: rgba(255,255,255,0.4);
    }

    /* dock 区 */
    #${PID} .phone-dock {
      margin: 4px 12px 8px 12px;
      padding: 10px 12px;
      background: rgba(255,255,255,0.06);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 22px;
      display: flex; justify-content: space-around; align-items: center;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
      flex-shrink: 0;
    }
    #${PID} .phone-dock .phone-app-icon {
      width: 44px; height: 44px;
    }
    #${PID} .phone-dock .phone-app-label { display: none; }

    /* home indicator */
    #${PID} .phone-home-indicator {
      display: flex; justify-content: center; align-items: center;
      padding: 6px 0 8px 0;
      flex-shrink: 0;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    #${PID} .phone-home-indicator::before {
      content: ''; display: block;
      width: 100px; height: 4px; border-radius: 2px;
      background: rgba(255,255,255,0.32);
      transition: background 0.15s, transform 0.15s;
    }
    #${PID} .phone-home-indicator:hover::before {
      background: rgba(255,255,255,0.5);
    }
    #${PID} .phone-home-indicator:active::before {
      transform: scaleX(0.85);
    }

    /* ─── Phase A1: App 接管 + 视图栈 ─────────────────────────── */

    /* App 接管期间的 phoneContent 布局（覆盖默认 padding/scroll） */
    #${PID} .phone-content.is-app-active {
      padding: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* App 顶部 bar */
    #${PID} .phone-app-topbar {
      display: flex; align-items: center;
      height: 40px; min-height: 40px;
      padding: 0 8px; gap: 6px;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      flex-shrink: 0;
      position: relative;
      z-index: 2;
    }
    #${PID} .phone-app-topbar-back {
      width: 30px; height: 30px;
      border-radius: 8px;
      background: transparent; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.85);
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.15s, color 0.15s;
    }
    #${PID} .phone-app-topbar-back:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }
    #${PID} .phone-app-topbar-back:active {
      background: rgba(255, 255, 255, 0.14);
    }
    #${PID} .phone-app-topbar-title {
      flex: 1;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.92);
      padding-right: 30px; /* 与左侧返回按钮等宽，让标题居中 */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      letter-spacing: 0.01em;
    }

    /* App 视图容器 */
    #${PID} .phone-app-view {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: none;
      position: relative;
      will-change: transform, opacity;
    }
    #${PID} .phone-app-view::-webkit-scrollbar { display: none; }

    /* 动画 */
    @keyframes ${PID}-app-push-in {
      from { opacity: 0; transform: translateX(60%); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes ${PID}-app-pop-out {
      from { opacity: 1; transform: translateX(0); }
      to   { opacity: 0; transform: translateX(60%); }
    }
    #${PID} .phone-app-view.is-pushing-in {
      animation: ${PID}-app-push-in 240ms cubic-bezier(0.4, 0, 0.2, 1) both;
    }
    #${PID} .phone-app-view.is-popping-out {
      animation: ${PID}-app-pop-out 220ms cubic-bezier(0.4, 0, 0.2, 1) both;
    }
  `;
}
