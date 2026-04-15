/**
 * YouYou Toolkit - UI模块入口
 * @description 注册和管理所有UI组件
 * @version 1.1.0
 */

import { uiManager } from './ui-manager.js';
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

  console.log('[UI] 组件注册完成');
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
  
  console.log('[UI] 模块初始化完成');
}

function renderRegisteredPanel(componentId, container, props = {}) {
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
  getAllStyles
};