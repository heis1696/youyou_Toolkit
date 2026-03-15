/**
 * YouYou Toolkit - UI组件模块（兼容层）
 * @description 向后兼容层，重新导出新的模块化组件
 * @version 1.1.0
 * @deprecated 请使用 modules/ui/index.js 中的新模块化组件
 */

// ============================================================
// 从新的模块化结构导入
// ============================================================

import { 
  uiManager,
  ApiPresetPanel,
  RegexExtractPanel,
  ToolManagePanel,
  SummaryToolPanel,
  StatusBlockPanel,
  registerComponents,
  initUI,
  SCRIPT_ID,
  escapeHtml,
  showToast,
  getJQuery,
  isContainerValid,
  getFormApiConfig,
  fillFormWithConfig
} from './ui/index.js';

// ============================================================
// 状态管理（向后兼容）
// ============================================================

let $container = null;
let $regexContainer = null;
let $toolContainer = null;

function resolveContainer(container, currentContainer) {
  const $ = getJQuery();
  if (!$) {
    console.error('[YouYouToolkit] jQuery not available');
    return null;
  }

  if (!container) {
    return currentContainer;
  }

  if (typeof container === 'string') {
    return $(container);
  }

  if (container?.jquery) {
    return container;
  }

  return $(container);
}

// ============================================================
// 主面板渲染（向后兼容）
// ============================================================

/**
 * 渲染主面板（API预设面板）
 * @param {Object} container - 容器
 */
export function render(container) {
  $container = resolveContainer(container, $container);
  
  if (!$container || !$container.length) {
    console.error('[YouYouToolkit] Container not found or invalid');
    return;
  }
  
  // 使用新的组件
  ApiPresetPanel.renderTo($container);
}

// ============================================================
// 正则面板渲染（向后兼容）
// ============================================================

/**
 * 渲染正则提取面板
 * @param {Object} container - 容器
 */
export function renderRegex(container) {
  $regexContainer = resolveContainer(container, $regexContainer);
  
  if (!$regexContainer || !$regexContainer.length) {
    console.error('[YouYouToolkit] Regex container not found');
    return;
  }
  
  // 使用新的组件
  RegexExtractPanel.renderTo($regexContainer);
}

// ============================================================
// 工具面板渲染（向后兼容）
// ============================================================

/**
 * 渲染工具管理面板
 * @param {Object} container - 容器
 */
export function renderTool(container) {
  $toolContainer = resolveContainer(container, $toolContainer);
  
  if (!$toolContainer || !$toolContainer.length) {
    console.error('[YouYouToolkit] Tool container not found');
    return;
  }
  
  // 使用新的组件
  ToolManagePanel.renderTo($toolContainer);
}

// ============================================================
// 样式获取（向后兼容）
// ============================================================

/**
 * 获取主面板样式
 * @returns {string}
 */
export function getStyles() {
  return ApiPresetPanel.getStyles();
}

/**
 * 获取正则面板样式
 * @returns {string}
 */
export function getRegexStyles() {
  return RegexExtractPanel.getStyles();
}

/**
 * 获取工具面板样式
 * @returns {string}
 */
export function getToolStyles() {
  return [
    ToolManagePanel.getStyles(),
    SummaryToolPanel.getStyles()
  ].join('\n');
}

// ============================================================
// 标签页管理（向后兼容）
// ============================================================

/**
 * 获取当前标签页
 * @returns {string}
 */
export function getCurrentTab() {
  return uiManager.getCurrentTab();
}

/**
 * 设置当前标签页
 * @param {string} tab
 */
export function setCurrentTab(tab) {
  uiManager.switchTab(tab);
}

// ============================================================
// 导出所有新模块的API
// ============================================================

export {
  uiManager,
  ApiPresetPanel,
  RegexExtractPanel,
  ToolManagePanel,
  SummaryToolPanel,
  StatusBlockPanel,
  registerComponents,
  initUI,
  SCRIPT_ID,
  escapeHtml,
  showToast,
  getJQuery,
  isContainerValid,
  getFormApiConfig,
  fillFormWithConfig
};

// ============================================================
// 默认导出
// ============================================================

export default {
  // 渲染函数
  render,
  renderRegex,
  renderTool,
  
  // 样式函数
  getStyles,
  getRegexStyles,
  getToolStyles,
  
  // 标签页管理
  getCurrentTab,
  setCurrentTab,
  
  // 新模块API
  uiManager,
  ApiPresetPanel,
  RegexExtractPanel,
  ToolManagePanel,
  SummaryToolPanel,
  StatusBlockPanel,
  registerComponents,
  initUI,
  
  // 工具函数
  SCRIPT_ID,
  escapeHtml,
  showToast,
  getJQuery,
  isContainerValid,
  getFormApiConfig,
  fillFormWithConfig
};
