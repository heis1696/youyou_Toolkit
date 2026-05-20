/**
 * YouYou Toolkit - Floating Ball Styles
 * @description PID 强前缀 CSS，避免与 SillyTavern / 其他扩展冲突
 *              z-index 9998 故意低于 popup-shell (10000)，主弹窗打开时浮球被压在下方但不卸载
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
    #${PID} .orb-emoji {
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: block;
    }
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

    #${PID} .menu {
      position: absolute; width: 370px; pointer-events: none;
      transform: scale(0.95) translateY(-4px); opacity: 0;
      transition: transform 0.2s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.15s ease;
      will-change: opacity, transform;
    }
    @media (max-width: 768px) {
      #${PID} .menu { width: min(330px, calc(100vw - 20px)); }
    }
    #${PID}.is-open .menu {
      pointer-events: all; transform: scale(1) translateY(0); opacity: 1;
    }
    #${PID}.is-open-up .menu { transform: scale(0.95) translateY(4px); }
    #${PID}.is-open.is-open-up .menu { transform: scale(1) translateY(0); }

    #${PID} .menu-shell {
      border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
      overflow: hidden; isolation: isolate; transform: translateZ(0);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      background: var(--yyt-surface, rgba(22, 22, 22, 1));
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    }

    #${PID} .menu-head {
      display: flex; align-items: center; gap: 10px; padding: 12px 14px;
      background: rgba(0, 0, 0, 0.25);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      cursor: grab; flex-shrink: 0;
    }
    #${PID} .menu-head:active { cursor: grabbing; }
    #${PID} .menu-title {
      font-size: 14px; font-weight: 600; color: var(--yyt-text, #eee);
      flex: 1; letter-spacing: 0.04em;
    }
    #${PID} .menu-close {
      width: 26px; height: 26px; border-radius: 5px; border: none;
      background: transparent; color: rgba(255, 255, 255, 0.5);
      cursor: pointer; font-size: 15px; padding: 0;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    #${PID} .menu-close:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }

    #${PID} .menu-list {
      padding: 10px; display: flex; flex-direction: column; gap: 6px;
      overflow-y: auto; max-height: 65vh;
      scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
      overscroll-behavior: contain;
    }
    #${PID} .menu-list::-webkit-scrollbar { width: 5px; }
    #${PID} .menu-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }

    #${PID} details { margin: 0; }
    #${PID} summary {
      font-size: 12.5px; font-weight: 600; color: rgba(255, 255, 255, 0.75);
      padding: 8px 11px; background: rgba(0, 0, 0, 0.2); border-radius: 6px;
      cursor: pointer; list-style: none; user-select: none;
      display: flex; justify-content: space-between; align-items: center;
      letter-spacing: 0.04em; transition: background 0.18s;
    }
    #${PID} summary:hover { background: rgba(255, 255, 255, 0.05); }
    #${PID} summary::-webkit-details-marker { display: none; }
    #${PID} summary::after {
      content: "▼"; font-size: 9px; opacity: 0.5; transition: transform 0.2s;
    }
    #${PID} details[open] > summary::after { transform: rotate(180deg); }
    #${PID} .group-body {
      padding: 8px 0 4px 0; display: flex; flex-direction: column; gap: 6px;
    }

    #${PID} .fab-item {
      display: flex; align-items: center; gap: 8px;
      padding: 0 10px; min-height: 34px; border-radius: 6px;
      background: rgba(0, 0, 0, 0.32);
      border: 1px solid rgba(255, 255, 255, 0.06);
      cursor: pointer; transition: all 0.15s ease;
      box-sizing: border-box; color: var(--yyt-text, rgba(255, 255, 255, 0.75));
    }
    #${PID} .fab-item:hover { background: rgba(255, 255, 255, 0.06); }
    #${PID} .fab-item.is-disabled { opacity: 0.52; filter: grayscale(0.35); cursor: not-allowed; }

    #${PID} .fab-item-label {
      flex: 1; font-size: 12.5px; line-height: 1.3;
      color: var(--yyt-text-secondary, rgba(255, 255, 255, 0.72));
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    #${PID} .fab-item-suffix {
      display: flex; align-items: center; gap: 8px; flex-shrink: 0;
    }

    #${PID} .fab-led {
      width: 7px; height: 7px; border-radius: 50%;
      background: rgba(255, 255, 255, 0.15);
      transition: all 0.2s ease;
      border: 1px solid rgba(0, 0, 0, 0.5);
      flex-shrink: 0;
    }
    #${PID} .fab-item.is-on { background: var(--yyt-accent-soft, rgba(123, 183, 255, 0.15)); border-color: rgba(123, 183, 255, 0.4); }
    #${PID} .fab-item.is-on .fab-item-label { color: #fff; }
    #${PID} .fab-item.is-on .fab-led { background: var(--yyt-accent, #7bb7ff); box-shadow: 0 0 8px var(--yyt-accent-glow, rgba(123, 183, 255, 0.7)); border-color: transparent; }
    #${PID} .fab-item.is-missing { opacity: 0.55; filter: grayscale(0.4); }

    #${PID} .fab-badge {
      min-width: 18px; height: 18px; padding: 0 6px;
      border-radius: 9px; font-size: 10.5px; font-weight: 700;
      background: var(--yyt-accent, #7bb7ff); color: #0a0d13;
      display: flex; align-items: center; justify-content: center;
      line-height: 1; flex-shrink: 0;
    }

    #${PID} .fab-item-slider {
      display: flex; flex-direction: column; gap: 4px;
      padding: 8px 10px; min-height: 50px;
      background: rgba(0, 0, 0, 0.32);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 6px; cursor: default;
    }
    #${PID} .fab-item-slider .fab-slider-row {
      display: flex; align-items: center; justify-content: space-between;
      font-size: 12.5px; color: var(--yyt-text-secondary, rgba(255, 255, 255, 0.72));
    }
    #${PID} .fab-item-slider input[type="range"] {
      width: 100%; margin: 0; height: 4px; accent-color: var(--yyt-accent, #7bb7ff);
    }

    #${PID} .fab-custom-wrap {
      padding: 0; background: transparent; border: none;
      min-height: auto; cursor: default;
    }

    #${PID} .fab-empty {
      padding: 18px 12px; text-align: center; font-size: 12px;
      color: var(--yyt-text-muted, rgba(255, 255, 255, 0.4));
    }

    #${PID} .menu-foot {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 14px; font-size: 11.5px;
      color: rgba(255, 255, 255, 0.4);
      background: rgba(0, 0, 0, 0.22);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      flex-shrink: 0;
    }
    #${PID} .foot-brand {
      color: var(--yyt-accent, #7bb7ff); font-weight: 600; letter-spacing: 0.04em;
    }
  `;
}
