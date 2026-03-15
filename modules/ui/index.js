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
import { BypassPanel } from './components/bypass-panel.js';

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
export { BypassPanel } from './components/bypass-panel.js';

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
  uiManager.register(BypassPanel.id, BypassPanel);
  
  console.log('[UI] 组件注册完成');
}

/**
 * 初始化UI模块
 * @param {Object} options - 初始化选项
 */
export function initUI(options = {}) {
  // 初始化管理器
  uiManager.init(options);
  
  // 注册组件
  registerComponents();
  
  // 注入样式
  uiManager.injectStyles();
  
  console.log('[UI] 模块初始化完成');
}

// ============================================================
// 便捷渲染函数
// ============================================================

/**
 * 渲染API预设面板
 * @param {Object} container - 容器
 */
export function renderApiPanel(container) {
  uiManager.render(ApiPresetPanel.id, container);
}

/**
 * 渲染正则提取面板
 * @param {Object} container - 容器
 */
export function renderRegexPanel(container) {
  uiManager.render(RegexExtractPanel.id, container);
}

/**
 * 渲染工具管理面板
 * @param {Object} container - 容器
 */
export function renderToolPanel(container) {
  uiManager.render(ToolManagePanel.id, container);
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
  registerComponents,
  initUI,
  renderApiPanel,
  renderRegexPanel,
  renderToolPanel,
  getAllStyles
};