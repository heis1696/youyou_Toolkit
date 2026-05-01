/**
 * YouYou Toolkit - UI模块入口
 * @description 注册和管理所有UI组件
 * @version 1.1.0
 */

import { logger } from '../core/logger-service.js';
import { uiManager } from './ui-manager.js';

const log = logger.createScope('UI');
import { ApiPresetPanel } from './components/api-preset-panel.js';
import { RegexExtractPanel } from './components/regex-extract-panel.js';
import { ToolManagePanel } from './components/tool-manage-panel.js';
import { SummaryToolPanel } from './components/summary-tool-panel.js';
import { StatusBlockPanel } from './components/status-block-panel.js';
import { YouyouReviewPanel } from './components/youyou-review-panel.js';
import { EscapeTransformToolPanel } from './components/escape-transform-tool-panel.js';
import { PunctuationTransformToolPanel } from './components/punctuation-transform-tool-panel.js';
import { BypassPanel } from './components/bypass-panel.js';
import { SettingsPanel } from './components/settings-panel.js';
import { TableWorkbenchPanel } from './components/table-workbench-panel.js';
import { LoggerPanel } from './components/logger-panel.js';

// ============================================================
// 工具导出
// ============================================================

export * from './utils.js';

// ============================================================
// 管理器导出
// ============================================================

export { uiManager, UIManager } from './ui-manager.js';

// ============================================================
// 组件导出
// ============================================================

export { ApiPresetPanel } from './components/api-preset-panel.js';
export { RegexExtractPanel } from './components/regex-extract-panel.js';
export { ToolManagePanel } from './components/tool-manage-panel.js';
export { SummaryToolPanel } from './components/summary-tool-panel.js';
export { StatusBlockPanel } from './components/status-block-panel.js';
export { YouyouReviewPanel } from './components/youyou-review-panel.js';
export { EscapeTransformToolPanel } from './components/escape-transform-tool-panel.js';
export { PunctuationTransformToolPanel } from './components/punctuation-transform-tool-panel.js';
export { BypassPanel } from './components/bypass-panel.js';
export { SettingsPanel } from './components/settings-panel.js';
export { TableWorkbenchPanel } from './components/table-workbench-panel.js';
export { LoggerPanel } from './components/logger-panel.js';

// ============================================================
// 组件注册
// ============================================================

/**
 * 注册所有UI组件
 */
export function registerComponents() {
  uiManager.register(ApiPresetPanel.id, ApiPresetPanel);
  uiManager.register(RegexExtractPanel.id, RegexExtractPanel);
  uiManager.register(ToolManagePanel.id, ToolManagePanel);
  uiManager.register(SummaryToolPanel.id, SummaryToolPanel);
  uiManager.register(StatusBlockPanel.id, StatusBlockPanel);
  uiManager.register(YouyouReviewPanel.id, YouyouReviewPanel);
  uiManager.register(EscapeTransformToolPanel.id, EscapeTransformToolPanel);
  uiManager.register(PunctuationTransformToolPanel.id, PunctuationTransformToolPanel);
  uiManager.register(BypassPanel.id, BypassPanel);
  uiManager.register(SettingsPanel.id, SettingsPanel);
  uiManager.register(TableWorkbenchPanel.id, TableWorkbenchPanel);
  uiManager.register(LoggerPanel.id, LoggerPanel);

  log.log('组件注册完成');
}

/**
 * 初始化UI模块
 * @param {Object} options - 初始化选项
 */
export function initUI(options = {}) {
  const {
    autoInjectStyles = true,
    targetDocument,
    ...managerOptions
  } = options;

  // 初始化管理器
  uiManager.init(managerOptions);
  
  // 注册组件
  registerComponents();
  
  // 注入样式
  if (autoInjectStyles) {
    uiManager.injectStyles(targetDocument);
  }
  
  log.log('模块初始化完成');
}

function ensureComponentsRegistered() {
  if (uiManager.getComponent(ApiPresetPanel.id)) {
    return;
  }

  registerComponents();
}

function renderRegisteredPanel(componentId, container, props = {}) {
  ensureComponentsRegistered();
  uiManager.render(componentId, container, props);
}

// ============================================================
// 便捷渲染函数
// ============================================================

/**
 * 渲染API预设面板
 * @param {Object} container - 容器
 */
export function renderApiPanel(container) {
  renderRegisteredPanel(ApiPresetPanel.id, container);
}

/**
 * 渲染正则提取面板
 * @param {Object} container - 容器
 */
export function renderRegexPanel(container) {
  renderRegisteredPanel(RegexExtractPanel.id, container);
}

/**
 * 渲染工具管理面板
 * @param {Object} container - 容器
 */
export function renderToolPanel(container) {
  renderRegisteredPanel(ToolManagePanel.id, container);
}

/**
 * 渲染摘要工具面板
 * @param {Object} container - 容器
 */
export function renderSummaryToolPanel(container) {
  renderRegisteredPanel(SummaryToolPanel.id, container);
}

/**
 * 渲染主角状态栏面板
 * @param {Object} container - 容器
 */
export function renderStatusBlockPanel(container) {
  renderRegisteredPanel(StatusBlockPanel.id, container);
}

/**
 * 渲染小幽点评面板
 * @param {Object} container - 容器
 */
export function renderYouyouReviewPanel(container) {
  renderRegisteredPanel(YouyouReviewPanel.id, container);
}

export function renderEscapeTransformToolPanel(container) {
  renderRegisteredPanel(EscapeTransformToolPanel.id, container);
}

export function renderPunctuationTransformToolPanel(container) {
  renderRegisteredPanel(PunctuationTransformToolPanel.id, container);
}

/**
 * 渲染 Ai指令预设面板
 * @param {Object} container - 容器
 */
export function renderBypassPanel(container) {
  renderRegisteredPanel(BypassPanel.id, container);
}

/**
 * 渲染设置面板
 * @param {Object} container - 容器
 */
export function renderSettingsPanel(container) {
  renderRegisteredPanel(SettingsPanel.id, container);
}

export function renderTableWorkbenchPanel(container) {
  renderRegisteredPanel(TableWorkbenchPanel.id, container);
}

export function renderLoggerPanel(container) {
  renderRegisteredPanel(LoggerPanel.id, container);
}

// ============================================================
// 路由表（Phase B：路由解耦）
// ============================================================

/**
 * 主 tab 路由表：tabId → { render, failMessage }
 * 壳层通过查表调用，不再硬编码 switch-case。
 * tools 页不在此表中——它由 sub-tab 路由处理。
 */
export const MAIN_TAB_RENDERERS = Object.freeze({
  apiPresets: {
    render: (container) => renderApiPanel(container),
    failMessage: 'API 预设面板加载失败'
  },
  toolManage: {
    render: (container) => renderToolPanel(container),
    failMessage: '工具管理面板加载失败'
  },
  regexExtract: {
    render: (container) => renderRegexPanel(container),
    failMessage: '正则提取面板加载失败'
  },
  tableWorkbench: {
    render: (container) => renderTableWorkbenchPanel(container),
    failMessage: '填表工作台加载失败'
  },
  bypass: {
    render: (container) => renderBypassPanel(container),
    failMessage: 'Ai指令预设面板加载失败'
  },
  settings: {
    render: (container) => renderSettingsPanel(container),
    failMessage: '设置面板加载失败'
  },
  logger: {
    render: (container) => renderLoggerPanel(container),
    failMessage: '日志面板加载失败'
  }
});

/**
 * 子 tab（内置工具）组件路由表：componentName → { render, failMessage }
 * GenericToolConfigPanel 不在此表中——它由 popup-shell 的 panel factory 动态创建。
 */
export const SUB_TAB_RENDERERS = Object.freeze({
  SummaryToolPanel: {
    render: (container) => renderSummaryToolPanel(container),
    failMessage: '摘要工具加载失败'
  },
  StatusBlockPanel: {
    render: (container) => renderStatusBlockPanel(container),
    failMessage: '主角状态栏加载失败'
  },
  YouyouReviewPanel: {
    render: (container) => renderYouyouReviewPanel(container),
    failMessage: '小幽点评加载失败'
  },
  EscapeTransformToolPanel: {
    render: (container) => renderEscapeTransformToolPanel(container),
    failMessage: '转义处理工具加载失败'
  },
  PunctuationTransformToolPanel: {
    render: (container) => renderPunctuationTransformToolPanel(container),
    failMessage: '中文标点替换工具加载失败'
  }
});

/**
 * 渲染主 tab 内容。
 * 返回 true 表示已处理；返回 false 表示 tabId 不在路由表中（交由调用方走 fallback）。
 */
export function renderMainTab(tabId, $container) {
  const route = MAIN_TAB_RENDERERS[tabId];
  if (!route) return false;

  ensureComponentsRegistered();
  try {
    route.render($container);
  } catch (_) {
    $container.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${route.failMessage}</span></div>`);
  }
  return true;
}

/**
 * 渲染内置工具子 tab 组件。
 * 返回渲染用的 hostKey（供壳层 registerActivePanelHost），null 表示未匹配。
 */
export function renderSubTabComponent(componentName, $container) {
  const route = SUB_TAB_RENDERERS[componentName];
  if (!route) return null;

  ensureComponentsRegistered();
  try {
    route.render($container);
  } catch (_) {
    $container.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${route.failMessage}</span></div>`);
  }
  return componentName;
}

// ============================================================
// 获取所有样式
// ============================================================

/**
 * 获取所有组件样式
 * @returns {string}
 */
export function getAllStyles() {
  return uiManager.getAllStyles();
}

// ============================================================
// 默认导出
// ============================================================

export default {
  uiManager,
  ApiPresetPanel,
  RegexExtractPanel,
  ToolManagePanel,
  SummaryToolPanel,
  StatusBlockPanel,
  YouyouReviewPanel,
  EscapeTransformToolPanel,
  PunctuationTransformToolPanel,
  BypassPanel,
  SettingsPanel,
  TableWorkbenchPanel,
  LoggerPanel,
  registerComponents,
  initUI,
  renderApiPanel,
  renderRegexPanel,
  renderToolPanel,
  renderSummaryToolPanel,
  renderStatusBlockPanel,
  renderYouyouReviewPanel,
  renderEscapeTransformToolPanel,
  renderPunctuationTransformToolPanel,
  renderBypassPanel,
  renderSettingsPanel,
  renderTableWorkbenchPanel,
  renderLoggerPanel,
  MAIN_TAB_RENDERERS,
  SUB_TAB_RENDERERS,
  renderMainTab,
  renderSubTabComponent,
  getAllStyles
};