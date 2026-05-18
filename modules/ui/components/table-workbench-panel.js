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
 * v1.0.208 #3 修复：CSS height chain 在宿主环境下不可靠
 * （.yyt-content-inner 在 flex column 父 .yyt-content 里 height:100% 因 flex item main-axis
 *  规则被解析为内容高度，导致 .yyt-tab-content 被撑大，真正滚动的容器跑到外层 .yyt-content，
 *  hero 跟着外层一起滚走，sticky 没机会生效）。
 *
 * 这里用 JS 测最稳的滚动祖先 .yyt-content 的 clientHeight，强制写到 .yyt-tww.style.height，
 * 让 .yyt-tww 自己接管滚动；hero position:sticky 即可在 .yyt-tww 视口内钉顶。
 */
function pinWorkbenchHeight($container) {
  const tabContent = $container?.[0];
  if (!tabContent) return;
  const yyContent = tabContent.closest('.yyt-content');
  if (!yyContent) return;

  const apply = () => {
    const tww = tabContent.querySelector('.yyt-tww');
    if (!tww) return;
    let h = yyContent.clientHeight;
    try {
      const cs = getComputedStyle(yyContent);
      const padTop = parseFloat(cs.paddingTop) || 0;
      const padBottom = parseFloat(cs.paddingBottom) || 0;
      h -= padTop + padBottom;
    } catch { /* ignore */ }
    if (h > 0) {
      tww.style.height = `${h}px`;
    }
  };

  apply();
  // 双 RAF 等 DOM 渲染稳定
  requestAnimationFrame(() => requestAnimationFrame(apply));

  if (typeof ResizeObserver === 'undefined') return;

  // 同一个 yyContent 不重建 RO；popup 关闭重开 yyContent 是新元素，需要重建
  if (tabContent.__yytwwROTarget === yyContent && tabContent.__yytwwRO) return;
  if (tabContent.__yytwwRO) {
    try { tabContent.__yytwwRO.disconnect(); } catch { /* ignore */ }
  }
  const ro = new ResizeObserver(() => apply());
  ro.observe(yyContent);
  tabContent.__yytwwRO = ro;
  tabContent.__yytwwROTarget = yyContent;
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
        $container.html(self.render());
        // 重新 bind events（off + on 在 bindWorkbenchEvents 内做）
        bindWorkbenchEvents($container, refresh);
        pinWorkbenchHeight($container);
      } catch (err) {
        log.error('refresh 异常', err);
      }
    };

    bindWorkbenchEvents($container, refresh);
    pinWorkbenchHeight($container);
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
