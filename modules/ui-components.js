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
  registerComponents,
  initUI,
  getAllStyles,
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

// ============================================================
// 主面板渲染（向后兼容）
// ============================================================

/**
 * 渲染主面板（API预设面板）
 * @param {Object} container - 容器
 */
export function render(container) {
  const $ = getJQuery();
  if (!$) {
    console.error('[YouYouToolkit] jQuery not available');
    return;
  }
  
  // 更新容器引用
  if (container) {
    if (typeof container === 'string') {
      $container = $(container);
    } else if (container && container.jquery) {
      $container = container;
    } else if (container) {
      $container = $(container);
    }
  }
  
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
  const $ = getJQuery();
  if (!$) {
    console.error('[YouYouToolkit] jQuery not available');
    return;
  }
  
  // 更新容器引用
  if (container) {
    if (typeof container === 'string') {
      $regexContainer = $(container);
    } else if (container && container.jquery) {
      $regexContainer = container;
    } else if (container) {
      $regexContainer = $(container);
    }
  }
  
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
  const $ = getJQuery();
  if (!$) {
    console.error('[YouYouToolkit] jQuery not available');
    return;
  }
  
  // 更新容器引用
  if (container) {
    if (typeof container === 'string') {
      $toolContainer = $(container);
    } else if (container && container.jquery) {
      $toolContainer = container;
    } else if (container) {
      $toolContainer = $(container);
    }
  }
  
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
  return ToolManagePanel.getStyles();
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