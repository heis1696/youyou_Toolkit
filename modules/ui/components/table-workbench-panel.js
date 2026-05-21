/**
 * YouYou Toolkit - 填表工作台 popup tab 面板
 *
 * 议题 #15 #13 + hotfix（v1.0.171）：popup tab 直接内联渲染工作台 UI
 * （preview-table-workbench.html 里 .win 是 popup tab 内的展示区，不是独立浮窗）。
 *
 * 数据编辑器（#11）才走独立浮窗，从工作台内的"打开数据编辑器"按钮触发。
 */

import { getJQuery, isContainerValid } from '../utils.js';
import { logger } from '../../core/logger-service.js';
import {
  WORKBENCH_VIEW_STYLES,
  renderWorkbenchHtml,
  loadWorkbenchState,
  bindWorkbenchEvents
} from './table-workbench-window.js';

const log = logger.createScope('TableWorkbenchPanel');

let _stylesInjected = false;
function injectStyles() {
  if (_stylesInjected) return;
  try {
    const doc = (window.parent && window.parent.document) ? window.parent.document : document;
    const head = doc.head || doc.documentElement;
    if (head.querySelector('#yyt-tww-styles')) {
      _stylesInjected = true;
      return;
    }
    const style = doc.createElement('style');
    style.id = 'yyt-tww-styles';
    style.textContent = WORKBENCH_VIEW_STYLES;
    head.appendChild(style);
    _stylesInjected = true;
  } catch (err) {
    log.warn('注入工作台样式失败', err);
  }
}

/**
 * v1.0.211 #3 修复（再次）：v1.0.210 的 .yyt-content.clientHeight 测高在某些宿主下返回 0
 * 或 .yyt-content 不存在，导致 .yyt-tww 高度没被锁住，.yyt-tww-scroll flex:1 撑成内容高度
 * 不滚动，外层 .yyt-content 接管滚动 → hero 跟着滚走。
 *
 * 改用 .yyt-popup-body 作锚（这是 popup 的稳定结构，clientHeight 总是 definite），
 * 用 getBoundingClientRect 直接算从 tabContent 顶部到 popup-body 底部的可用高度。
 * 不依赖任何 height:100% chain。
 */
function pinWorkbenchHeight($container) {
  const tabContent = $container?.[0];
  if (!tabContent) return;
  const popupBody = tabContent.closest('.yyt-popup-body');
  if (!popupBody) {
    log.warn('pinWorkbenchHeight: 找不到 .yyt-popup-body 祖先');
    return;
  }

  const apply = () => {
    const tww = tabContent.querySelector('.yyt-tww');
    if (!tww) return;
    const popupRect = popupBody.getBoundingClientRect();
    const tabRect = tabContent.getBoundingClientRect();
    const h = popupRect.bottom - tabRect.top - 8;
    if (h > 100) {
      tww.style.height = `${h}px`;
    } else {
      log.warn(`pinWorkbenchHeight: 计算高度异常 h=${h}, popupBottom=${popupRect.bottom}, tabTop=${tabRect.top}`);
    }
  };

  apply();
  requestAnimationFrame(() => requestAnimationFrame(apply));

  if (typeof ResizeObserver === 'undefined') return;

  // 同一个 popupBody 不重建 RO；popup 关闭重开 popupBody 是新元素
  if (tabContent.__yytwwROTarget === popupBody && tabContent.__yytwwRO) return;
  if (tabContent.__yytwwRO) {
    try { tabContent.__yytwwRO.disconnect(); } catch { /* ignore */ }
  }
  const ro = new ResizeObserver(() => apply());
  ro.observe(popupBody);
  tabContent.__yytwwRO = ro;
  tabContent.__yytwwROTarget = popupBody;
}

/**
 * v1.0.209 #3 修复（最终方案）：hero 已物理提到 .yyt-tww-scroll 同级（不在滚动区内），
 * 不会被滚走。这里监听 .yyt-tww-scroll 的 scrollTop，> 0 时给 hero 加 compact class
 * 压缩 padding 并隐藏 desc/chips；= 0 时恢复完整 hero。
 *
 * refresh 时 .yyt-tww-scroll 是新元素，listener 随旧 DOM 自动 GC，每次重新 attach。
 */
function setupScrollCompact($container) {
  const tabContent = $container?.[0];
  if (!tabContent) return;
  const hero = tabContent.querySelector('.yyt-tww-hero');
  const scroll = tabContent.querySelector('.yyt-tww-scroll');
  if (!hero || !scroll) return;

  const onScroll = () => {
    if (scroll.scrollTop > 0) {
      hero.classList.add('yyt-tww-hero--compact');
    } else {
      hero.classList.remove('yyt-tww-hero--compact');
    }
  };
  onScroll();
  scroll.addEventListener('scroll', onScroll, { passive: true });
}

export const TableWorkbenchPanel = {
  id: 'tableWorkbenchPanel',

  render() {
    injectStyles();
    try {
      const state = loadWorkbenchState();
      return renderWorkbenchHtml(state);
    } catch (err) {
      log.error('渲染工作台 UI 异常', err);
      return `<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>工作台渲染失败：${err?.message || err}</span></div>`;
    }
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    const self = this;

    // refresh 函数：重渲染 $container 内容并重新 bind
    const refresh = () => {
      try {
        // preserve scroll position across DOM rebuild
        const prevScroll = $container[0]?.querySelector('.yyt-tww-scroll');
        const savedTop = prevScroll ? prevScroll.scrollTop : 0;

        $container.html(self.render());
        // 重新 bind events（off + on 在 bindWorkbenchEvents 内做）
        bindWorkbenchEvents($container, refresh);
        pinWorkbenchHeight($container);
        setupScrollCompact($container);

        if (savedTop > 0) {
          const nextScroll = $container[0]?.querySelector('.yyt-tww-scroll');
          if (nextScroll) nextScroll.scrollTop = savedTop;
        }
      } catch (err) {
        log.error('refresh 异常', err);
      }
    };

    bindWorkbenchEvents($container, refresh);
    pinWorkbenchHeight($container);
    setupScrollCompact($container);
  },

  /**
   * 兼容 ui-manager 的 renderTo 调用约定
   */
  renderTo($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    $container.html(this.render());
    this.bindEvents($container);
  }
};

export default TableWorkbenchPanel;
