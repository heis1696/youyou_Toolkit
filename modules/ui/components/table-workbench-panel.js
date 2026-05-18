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
      } catch (err) {
        log.error('refresh 异常', err);
      }
    };

    bindWorkbenchEvents($container, refresh);
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
