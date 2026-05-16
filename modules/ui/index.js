/**
 * YouYou Toolkit - UI模块入口
 * @description 注册和管理所有UI组件
 * @version 1.1.0
 */

import { logger } from '../core/logger-service.js';
import { uiManager } from './ui-manager.js';
import { escapeHtml } from './utils.js';

const log = logger.createScope('UI');

const PANEL_MODULE_LOADERS = Object.freeze({
  ApiPresetPanel: () => import('./components/api-preset-panel.js'),
  WorldbookPresetPanel: () => import('./components/worldbook-preset-panel.js'),
  RegexExtractPanel: () => import('./components/regex-extract-panel.js'),
  TableTemplatePanel: () => import('./components/table-template-panel.js'),
  ToolManagePanel: () => import('./components/tool-manage-panel.js'),
  SummaryToolPanel: () => import('./components/summary-tool-panel.js'),
  StatusBlockPanel: () => import('./components/status-block-panel.js'),
  YouyouReviewPanel: () => import('./components/youyou-review-panel.js'),
  EscapeTransformToolPanel: () => import('./components/escape-transform-tool-panel.js'),
  PunctuationTransformToolPanel: () => import('./components/punctuation-transform-tool-panel.js'),
  BypassPanel: () => import('./components/bypass-panel.js'),
  SettingsPanel: () => import('./components/settings-panel.js'),
  TableWorkbenchPanel: () => import('./components/table-workbench-panel.js'),
  LoggerPanel: () => import('./components/logger-panel.js')
});

const panelModuleCache = new Map();

async function loadPanel(panelName) {
  if (!panelModuleCache.has(panelName)) {
    const loader = PANEL_MODULE_LOADERS[panelName];
    if (typeof loader !== 'function') {
      throw new Error(`unknown_panel:${panelName}`);
    }
    panelModuleCache.set(panelName, loader().then((module) => {
      const panel = module?.[panelName] || module?.default;
      if (!panel?.id) {
        throw new Error(`invalid_panel:${panelName}`);
      }
      return panel;
    }).catch((error) => {
      panelModuleCache.delete(panelName);
      throw error;
    }));
  }

  return panelModuleCache.get(panelName);
}

function panelErrorHtml(message, error = null) {
  const detail = error?.message ? `：${escapeHtml(error.message)}` : '';
  return `<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${escapeHtml(message)}${detail}</span></div>`;
}

// ============================================================
// 工具导出
// ============================================================

export * from './utils.js';

// ============================================================
// 管理器导出
// ============================================================

export { uiManager, UIManager } from './ui-manager.js';

// ============================================================
// 组件注册
// ============================================================

/**
 * 注册所有UI组件
 */
export async function registerComponents() {
  const results = await Promise.allSettled(Object.keys(PANEL_MODULE_LOADERS).map(async (panelName) => {
    const panel = await loadPanel(panelName);
    uiManager.register(panel.id, panel);
    return panel.id;
  }));

  const failed = results.filter(result => result.status === 'rejected');
  if (failed.length) {
    failed.forEach((result) => log.error('组件注册失败', result.reason));
  }

  log.log(`组件注册完成，成功 ${results.length - failed.length} 个，失败 ${failed.length} 个`);
}

/**
 * 初始化UI模块
 * @param {Object} options - 初始化选项
 */
export async function initUI(options = {}) {
  const {
    autoInjectStyles = true,
    targetDocument,
    ...managerOptions
  } = options;

  // 初始化管理器
  uiManager.init(managerOptions);

  // 注册组件
  await registerComponents();

  // 注入样式
  if (autoInjectStyles) {
    uiManager.injectStyles(targetDocument);
  }

  log.log('模块初始化完成');
}

async function ensurePanelRegistered(panelName) {
  const cachedPanel = await loadPanel(panelName);
  if (!uiManager.getComponent(cachedPanel.id)) {
    uiManager.register(cachedPanel.id, cachedPanel);
  }
  return cachedPanel;
}

async function renderRegisteredPanel(panelName, container, props = {}) {
  const panel = await ensurePanelRegistered(panelName);
  uiManager.render(panel.id, container, props);
}

// ============================================================
// 便捷渲染函数
// ============================================================

/**
 * 渲染API预设面板
 * @param {Object} container - 容器
 */
export function renderApiPanel(container) {
  return renderRegisteredPanel('ApiPresetPanel', container);
}

/**
 * 渲染世界书预设面板
 * @param {Object} container - 容器
 */
export function renderWorldbookPresetPanel(container) {
  return renderRegisteredPanel('WorldbookPresetPanel', container);
}

/**
 * 渲染正则提取面板
 * @param {Object} container - 容器
 */
export function renderRegexPanel(container) {
  return renderRegisteredPanel('RegexExtractPanel', container);
}

/**
 * 渲染表格模板预设面板
 */
export function renderTableTemplatePanel(container) {
  return renderRegisteredPanel('TableTemplatePanel', container);
}

/**
 * 渲染工具管理面板
 * @param {Object} container - 容器
 */
export function renderToolPanel(container) {
  return renderRegisteredPanel('ToolManagePanel', container);
}

/**
 * 渲染摘要工具面板
 * @param {Object} container - 容器
 */
export function renderSummaryToolPanel(container) {
  return renderRegisteredPanel('SummaryToolPanel', container);
}

/**
 * 渲染主角状态栏面板
 * @param {Object} container - 容器
 */
export function renderStatusBlockPanel(container) {
  return renderRegisteredPanel('StatusBlockPanel', container);
}

/**
 * 渲染小幽点评面板
 * @param {Object} container - 容器
 */
export function renderYouyouReviewPanel(container) {
  return renderRegisteredPanel('YouyouReviewPanel', container);
}

export function renderEscapeTransformToolPanel(container) {
  return renderRegisteredPanel('EscapeTransformToolPanel', container);
}

export function renderPunctuationTransformToolPanel(container) {
  return renderRegisteredPanel('PunctuationTransformToolPanel', container);
}

/**
 * 渲染 Ai指令预设面板
 * @param {Object} container - 容器
 */
export function renderBypassPanel(container) {
  return renderRegisteredPanel('BypassPanel', container);
}

/**
 * 渲染设置面板
 * @param {Object} container - 容器
 */
export function renderSettingsPanel(container) {
  return renderRegisteredPanel('SettingsPanel', container);
}

export function renderTableWorkbenchPanel(container) {
  return renderRegisteredPanel('TableWorkbenchPanel', container);
}

export function renderLoggerPanel(container) {
  return renderRegisteredPanel('LoggerPanel', container);
}

// ============================================================
// 路由表（Phase B：路由解耦）
// ============================================================

/**
 * 主 tab 路由表：tabId → { render, failMessage }
 * 壳层通过查表调用，不再硬编码 switch-case。
 * tools / presetManagement 不在此表中——它们由 sub-tab 路由处理。
 */
export const MAIN_TAB_RENDERERS = Object.freeze({
  // 议题 #37：toolManage 主 tab 已删，工具列表融入 tools sub-nav 工具栏
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
 * 子 tab 组件路由表：componentName → { render, failMessage }
 * 包含内置工具子 tab 和预设管理 sub-nav 的 4 个面板。
 * GenericToolConfigPanel 不在此表中——它由 popup-shell 的 panel factory 动态创建。
 */
export const SUB_TAB_RENDERERS = Object.freeze({
  // 预设管理 sub-nav
  ApiPresetPanel: {
    render: (container) => renderApiPanel(container),
    failMessage: 'API 预设面板加载失败'
  },
  RegexExtractPanel: {
    render: (container) => renderRegexPanel(container),
    failMessage: '正则提取面板加载失败'
  },
  WorldbookPresetPanel: {
    render: (container) => renderWorldbookPresetPanel(container),
    failMessage: '世界书预设面板加载失败'
  },
  TableTemplatePanel: {
    render: (container) => renderTableTemplatePanel(container),
    failMessage: '表格模板面板加载失败'
  },
  // 工具 sub-nav
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
export async function renderMainTab(tabId, $container) {
  const route = MAIN_TAB_RENDERERS[tabId];
  if (!route) return false;

  try {
    await route.render($container);
  } catch (error) {
    log.error(route.failMessage, error);
    $container.html(panelErrorHtml(route.failMessage, error));
  }
  return true;
}

/**
 * 渲染内置工具子 tab 组件。
 * 返回渲染用的 hostKey（供壳层 registerActivePanelHost），null 表示未匹配。
 */
export async function renderSubTabComponent(componentName, $container) {
  const route = SUB_TAB_RENDERERS[componentName];
  if (!route) return null;

  try {
    await route.render($container);
  } catch (error) {
    log.error(route.failMessage, error);
    $container.html(panelErrorHtml(route.failMessage, error));
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
  registerComponents,
  initUI,
  renderApiPanel,
  renderWorldbookPresetPanel,
  renderRegexPanel,
  renderTableTemplatePanel,
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