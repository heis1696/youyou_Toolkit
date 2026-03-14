/**
 * YouYou Toolkit - SillyTavern 工具插件
 * @version 0.5.0
 * @description 一个轻量级的 SillyTavern 工具插件框架，支持API连接、预设管理、正则提取、独立窗口系统、工具提示词、破限词和上下文注入
 * @author YouYou
 */

// ============================================================
// 常量定义
// ============================================================
const SCRIPT_ID = 'youyou_toolkit';
const SCRIPT_VERSION = '0.5.0';
const MENU_ITEM_ID = `${SCRIPT_ID}-menu-item`;
const MENU_CONTAINER_ID = `${SCRIPT_ID}-menu-container`;
const POPUP_ID = `${SCRIPT_ID}-popup`;

// 获取顶层窗口
const topLevelWindow = (typeof window.parent !== 'undefined' ? window.parent : window);

// ============================================================
// 模块导入（动态加载）
// ============================================================
let storageModule = null;
let apiConnectionModule = null;
let presetManagerModule = null;
let uiComponentsModule = null;
let regexExtractorModule = null;
let toolManagerModule = null;
let toolExecutorModule = null;
let toolTriggerModule = null;
let windowManagerModule = null;
let toolRegistryModule = null;
let promptEditorModule = null;

// v0.5 新模块
let settingsServiceModule = null;
let bypassManagerModule = null;
let variableResolverModule = null;
let contextInjectorModule = null;
let toolPromptServiceModule = null;
let toolOutputServiceModule = null;

async function loadModules() {
  try {
    // 在浏览器环境中，这些模块需要通过相对路径加载
    storageModule = await import('./modules/storage.js');
    apiConnectionModule = await import('./modules/api-connection.js');
    presetManagerModule = await import('./modules/preset-manager.js');
    uiComponentsModule = await import('./modules/ui-components.js');
    regexExtractorModule = await import('./modules/regex-extractor.js');
    toolManagerModule = await import('./modules/tool-manager.js');
    toolExecutorModule = await import('./modules/tool-executor.js');
    toolTriggerModule = await import('./modules/tool-trigger.js');
    
    // 新模块
    windowManagerModule = await import('./modules/window-manager.js');
    toolRegistryModule = await import('./modules/tool-registry.js');
    promptEditorModule = await import('./modules/prompt-editor.js');
    
    // v0.5 新模块
    settingsServiceModule = await import('./modules/core/settings-service.js');
    bypassManagerModule = await import('./modules/bypass-manager.js');
    variableResolverModule = await import('./modules/variable-resolver.js');
    contextInjectorModule = await import('./modules/context-injector.js');
    toolPromptServiceModule = await import('./modules/tool-prompt-service.js');
    toolOutputServiceModule = await import('./modules/tool-output-service.js');
    
    return true;
  } catch (error) {
    console.warn(`[${SCRIPT_ID}] 模块加载失败，使用内置功能:`, error);
    return false;
  }
}

// ============================================================
// 工具函数
// ============================================================

function log(...args) {
  console.log(`[${SCRIPT_ID}]`, ...args);
}

function logError(...args) {
  console.error(`[${SCRIPT_ID}]`, ...args);
}

function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

// ============================================================
// 样式注入
// ============================================================

async function injectStyles() {
  const styleId = `${SCRIPT_ID}-styles`;
  const targetDoc = topLevelWindow.document || document;

  // 检查是否已注入
  if (targetDoc.getElementById(styleId)) return;

  // 尝试加载外部样式文件
  let css = '';
  try {
    const response = await fetch('./styles/main.css');
    if (response.ok) {
      css = await response.text();
    }
  } catch (e) {
    log('无法加载外部样式文件，使用内置样式');
  }

  // 如果外部样式加载失败，使用基础样式
  if (!css) {
    css = getBaseStyles();
  }

  const style = targetDoc.createElement('style');
  style.id = styleId;
  style.textContent = css;
  (targetDoc.head || targetDoc.documentElement).appendChild(style);

  log('样式已注入');
}

function getBaseStyles() {
  return `
    /* CSS变量 */
    :root {
      --yyt-accent: #7bb7ff;
      --yyt-accent-glow: rgba(123, 183, 255, 0.4);
      --yyt-accent-soft: rgba(123, 183, 255, 0.15);
      --yyt-success: #4ade80;
      --yyt-success-glow: rgba(74, 222, 128, 0.3);
      --yyt-error: #f87171;
      --yyt-error-glow: rgba(248, 113, 113, 0.3);
      --yyt-warning: #fbbf24;
      --yyt-surface: rgba(255, 255, 255, 0.03);
      --yyt-surface-hover: rgba(255, 255, 255, 0.06);
      --yyt-surface-active: rgba(255, 255, 255, 0.08);
      --yyt-border: rgba(255, 255, 255, 0.08);
      --yyt-border-strong: rgba(255, 255, 255, 0.15);
      --yyt-text: rgba(255, 255, 255, 0.95);
      --yyt-text-secondary: rgba(255, 255, 255, 0.7);
      --yyt-text-muted: rgba(255, 255, 255, 0.45);
      --yyt-radius: 12px;
      --yyt-radius-sm: 8px;
    }
    
    /* 菜单项 */
    #${MENU_CONTAINER_ID} { display: flex; align-items: center; }
    
    #${MENU_ITEM_ID} {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px; cursor: pointer;
      transition: all 0.2s ease; border-radius: 8px; margin: 2px;
    }
    
    #${MENU_ITEM_ID}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${MENU_ITEM_ID} .fa-fw {
      font-size: 16px; color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
    }
    
    #${MENU_ITEM_ID} span { font-weight: 500; letter-spacing: 0.3px; }
    
    /* 主弹窗遮罩 */
    .yyt-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
    }
    
    /* 主弹窗 */
    .yyt-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      width: 950px;
      max-width: 95vw;
      height: 85vh;
      max-height: 90vh;
      background:
        radial-gradient(1200px 600px at 10% -10%, rgba(123, 183, 255, 0.12), transparent 60%),
        radial-gradient(900px 500px at 100% 0%, rgba(155, 123, 255, 0.10), transparent 55%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
        #0b0f15;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65), 0 0 60px rgba(123, 183, 255, 0.1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
      z-index: 10000;
    }
    
    /* 弹窗头部 */
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px 16px 0 0;
      flex-shrink: 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-popup-title i {
      color: rgba(123, 183, 255, 0.85);
      font-size: 18px;
    }
    
    .yyt-popup-close {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
    
    .yyt-popup-close:hover {
      background: rgba(255, 107, 107, 0.25);
      color: #ff6b6b;
    }
    
    /* 弹窗主体 */
    .yyt-popup-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: 16px 20px;
      overflow: hidden;
    }
    
    /* 弹窗底部 */
    .yyt-popup-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 14px 20px;
      background: rgba(255, 255, 255, 0.02);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0 0 16px 16px;
      flex-shrink: 0;
    }
    
    /* 主顶栏 */
    .yyt-main-nav {
      display: flex;
      gap: 4px;
      padding: 8px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 14px;
      margin-bottom: 16px;
      border: 1px solid var(--yyt-border);
      flex-shrink: 0;
    }
    
    .yyt-main-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.25s ease;
      color: var(--yyt-text-secondary);
      font-weight: 500;
      font-size: 14px;
    }
    
    .yyt-main-nav-item:hover {
      color: var(--yyt-text);
      background: var(--yyt-surface-hover);
    }
    
    .yyt-main-nav-item.active {
      color: #0b0f15;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
    }
    
    /* 次级顶栏 */
    .yyt-sub-nav {
      display: flex;
      gap: 4px;
      padding: 6px;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 10px;
      margin-bottom: 16px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      flex-shrink: 0;
    }
    
    .yyt-sub-nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--yyt-text-secondary);
      font-weight: 500;
      font-size: 13px;
    }
    
    .yyt-sub-nav-item:hover {
      color: var(--yyt-text);
      background: rgba(255, 255, 255, 0.05);
    }
    
    .yyt-sub-nav-item.active {
      color: var(--yyt-accent);
      background: rgba(123, 183, 255, 0.1);
    }
    
    /* 内容区域 */
    .yyt-content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 0 4px;
    }
    
    /* 标签内容 */
    .yyt-tab-content {
      display: none;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
    
    .yyt-tab-content.active {
      display: block;
    }
    
    /* 面板样式 */
    .yyt-panel {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .yyt-panel-section {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 18px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, transparent 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius);
    }
    
    .yyt-section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 14px;
      color: var(--yyt-text);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .yyt-section-title i {
      color: var(--yyt-accent);
      font-size: 16px;
    }
    
    /* 按钮样式 */
    .yyt-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 16px;
      border: none;
      border-radius: var(--yyt-radius-sm);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    
    .yyt-btn-primary {
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      color: #0b0f15;
    }
    
    .yyt-btn-primary:hover {
      transform: translateY(-1px);
    }
    
    .yyt-btn-secondary {
      background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text);
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-btn-secondary:hover {
      border-color: var(--yyt-border-strong);
    }
    
    .yyt-btn-danger {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
      color: var(--yyt-error);
      border: 1px solid rgba(248, 113, 113, 0.25);
    }
    
    .yyt-btn-small {
      padding: 6px 10px;
      font-size: 11px;
    }
    
    /* 表单样式 */
    .yyt-form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .yyt-form-group label {
      font-size: 12px;
      font-weight: 600;
      color: var(--yyt-text-secondary);
    }
    
    .yyt-form-row {
      display: flex;
      gap: 12px;
    }
    
    .yyt-flex-1 {
      flex: 1;
    }
    
    .yyt-input,
    .yyt-select,
    .yyt-textarea {
      padding: 10px 14px;
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      background: rgba(255, 255, 255, 0.03);
      color: var(--yyt-text);
      font-size: 13px;
    }
    
    .yyt-input:focus,
    .yyt-select:focus,
    .yyt-textarea:focus {
      outline: none;
      border-color: var(--yyt-accent);
    }
    
    .yyt-input::placeholder,
    .yyt-textarea::placeholder {
      color: var(--yyt-text-muted);
    }
    
    .yyt-textarea {
      resize: vertical;
      min-height: 80px;
    }
    
    /* 面板底部 */
    .yyt-panel-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding-top: 16px;
      margin-top: 4px;
      border-top: 1px solid var(--yyt-border);
    }
    
    .yyt-footer-left,
    .yyt-footer-right {
      display: flex;
      gap: 8px;
    }
    
    /* 空状态 */
    .yyt-empty-state-small {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      color: var(--yyt-text-muted);
      gap: 8px;
    }
    
    .yyt-empty-state-small i {
      font-size: 24px;
      opacity: 0.4;
    }
    
    .yyt-empty-state-small span {
      font-size: 12px;
    }
    
    /* 子内容区域 */
    .yyt-sub-content {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
    
    /* 工具窗口容器 */
    .yyt-tool-window {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    /* 响应式 */
    @media screen and (max-width: 1100px) {
      .yyt-popup {
        width: 98vw;
        height: 90vh;
      }
    }
    
    @media screen and (max-width: 768px) {
      .yyt-popup {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        border: none;
      }
    }
  `;
}

// ============================================================
// 弹窗管理（新架构）
// ============================================================

let currentPopup = null;
let currentOverlay = null;
let currentMainTab = 'apiPresets';
let currentSubTab = {};

function closePopup() {
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
  }
  if (currentOverlay) {
    currentOverlay.remove();
    currentOverlay = null;
  }
  log('弹窗已关闭');
}

function switchMainTab(tabName) {
  currentMainTab = tabName;
  
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup) return;
  
  // 更新主顶栏状态
  $(currentPopup).find('.yyt-main-nav-item').removeClass('active');
  $(currentPopup).find(`.yyt-main-nav-item[data-tab="${tabName}"]`).addClass('active');
  
  // 更新次级顶栏显示
  const toolConfig = toolRegistryModule?.getToolConfig(tabName);
  if (toolConfig?.hasSubTabs) {
    $(currentPopup).find('.yyt-sub-nav').show();
    renderSubNav(tabName, toolConfig.subTabs);
  } else {
    $(currentPopup).find('.yyt-sub-nav').hide();
  }
  
  // 更新内容区域
  $(currentPopup).find('.yyt-tab-content').removeClass('active');
  $(currentPopup).find(`.yyt-tab-content[data-tab="${tabName}"]`).addClass('active');
  
  // 渲染对应内容
  renderTabContent(tabName);
}

function switchSubTab(mainTab, subTab) {
  currentSubTab[mainTab] = subTab;
  
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup) return;
  
  // 更新次级顶栏状态
  $(currentPopup).find('.yyt-sub-nav-item').removeClass('active');
  $(currentPopup).find(`.yyt-sub-nav-item[data-subtab="${subTab}"]`).addClass('active');
  
  // 更新次级内容
  renderSubTabContent(mainTab, subTab);
}

function renderSubNav(mainTab, subTabs) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup || !subTabs) return;
  
  const currentSub = currentSubTab[mainTab] || subTabs[0]?.id;
  
  const subNavHtml = subTabs.map(tab => `
    <div class="yyt-sub-nav-item ${tab.id === currentSub ? 'active' : ''}" data-subtab="${tab.id}">
      <i class="fa-solid ${tab.icon || 'fa-file'}"></i>
      <span>${tab.name}</span>
    </div>
  `).join('');
  
  $(currentPopup).find('.yyt-sub-nav').html(subNavHtml);
  
  // 绑定点击事件
  $(currentPopup).find('.yyt-sub-nav-item').on('click', function() {
    const subTab = $(this).data('subtab');
    switchSubTab(mainTab, subTab);
  });
}

async function renderTabContent(tabName) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup) return;
  
  const $content = $(currentPopup).find(`.yyt-tab-content[data-tab="${tabName}"]`);
  if (!$content.length) return;
  
  const toolConfig = toolRegistryModule?.getToolConfig(tabName);
  
  switch (tabName) {
    case 'apiPresets':
      if (uiComponentsModule) {
        uiComponentsModule.render($content);
      }
      break;
      
    case 'regexExtract':
      if (uiComponentsModule) {
        uiComponentsModule.renderRegex($content);
      }
      break;
      
    case 'tools':
      // 工具集合 - 渲染次级顶栏和内容
      if (toolConfig?.hasSubTabs && toolConfig.subTabs?.length > 0) {
        const defaultSubTab = toolConfig.subTabs[0].id;
        renderSubTabContent(tabName, defaultSubTab);
      } else {
        $content.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>工具配置加载失败</span></div>');
      }
      break;
      
    // v0.5 新增页面
    case 'bypass':
      await renderBypassPanel($content);
      break;
      
    case 'settings':
      await renderSettingsPanel($content);
      break;
      
    default:
      // 工具窗口 - 使用独立窗口系统
      renderToolWindow(tabName, $content);
      break;
  }
}

/**
 * 渲染破限词面板
 */
async function renderBypassPanel($container) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$) return;
  
  try {
    // 动态导入 BypassPanel 组件
    const { BypassPanel } = await import('./modules/ui/components/bypass-panel.js');
    
    // 注入样式
    const styleId = `${SCRIPT_ID}-bypass-styles`;
    const targetDoc = topLevelWindow.document || document;
    if (!targetDoc.getElementById(styleId) && BypassPanel.getStyles) {
      const style = targetDoc.createElement('style');
      style.id = styleId;
      style.textContent = BypassPanel.getStyles();
      (targetDoc.head || targetDoc.documentElement).appendChild(style);
    }
    
    // 渲染组件
    BypassPanel.renderTo($container);
  } catch (error) {
    console.error(`[${SCRIPT_ID}] 破限词面板加载失败:`, error);
    $container.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>破限词面板加载失败</span></div>`);
  }
}

/**
 * 渲染设置面板
 */
async function renderSettingsPanel($container) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$) return;
  
  try {
    // 动态导入 SettingsPanel 组件
    const { SettingsPanel } = await import('./modules/ui/components/settings-panel.js');
    
    // 注入样式
    const styleId = `${SCRIPT_ID}-settings-styles`;
    const targetDoc = topLevelWindow.document || document;
    if (!targetDoc.getElementById(styleId) && SettingsPanel.getStyles) {
      const style = targetDoc.createElement('style');
      style.id = styleId;
      style.textContent = SettingsPanel.getStyles();
      (targetDoc.head || targetDoc.documentElement).appendChild(style);
    }
    
    // 渲染组件
    SettingsPanel.renderTo($container);
  } catch (error) {
    console.error(`[${SCRIPT_ID}] 设置面板加载失败:`, error);
    $container.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>设置面板加载失败</span></div>`);
  }
}

function renderSubTabContent(mainTab, subTab) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup) return;
  
  // 获取主标签的内容容器
  const $mainContent = $(currentPopup).find(`.yyt-tab-content[data-tab="${mainTab}"]`);
  if (!$mainContent.length) return;
  
  // 获取主工具配置，检查是否是子工具ID
  const mainToolConfig = toolRegistryModule?.getToolConfig(mainTab);
  
  // 如果是子工具ID（如summaryTool, statusBlock），直接渲染对应的组件
  if (mainToolConfig?.hasSubTabs) {
    // 主工具有次级标签，找到对应的子工具配置
    const subToolConfig = mainToolConfig.subTabs?.find(st => st.id === subTab);
    
    if (subToolConfig) {
      // 确保 $mainContent 有内容结构
      let $subContent = $mainContent.find('.yyt-sub-content');
      if (!$subContent.length) {
        $mainContent.html(`<div class="yyt-sub-content"></div>`);
        $subContent = $mainContent.find('.yyt-sub-content');
      }
      
      // 根据子工具组件渲染
      switch (subToolConfig.component) {
        case 'SummaryToolPanel':
          if (uiComponentsModule?.SummaryToolPanel) {
            uiComponentsModule.SummaryToolPanel.renderTo($subContent);
          } else {
            $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>摘要工具加载失败</span></div>');
          }
          break;
          
        case 'StatusBlockPanel':
          if (uiComponentsModule?.StatusBlockPanel) {
            uiComponentsModule.StatusBlockPanel.renderTo($subContent);
          } else {
            $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>主角状态栏加载失败</span></div>');
          }
          break;
          
        default:
          $subContent.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>功能开发中...</span></div>`);
      }
    }
    return;
  }
  
  // 查找子内容容器
  const $content = $mainContent.find('.yyt-sub-content');
  if (!$content.length) return;
  
  // 根据工具和子标签渲染内容
  switch (subTab) {
    case 'config':
      renderToolConfig(mainTab, $content);
      break;
    case 'prompts':
      renderPromptEditor(mainTab, $content);
      break;
    case 'presets':
      renderToolPresets(mainTab, $content);
      break;
    default:
      $content.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>功能开发中...</span></div>`);
  }
}

function renderToolWindow(toolId, $container) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$) return;
  
  const toolConfig = toolRegistryModule?.getToolConfig(toolId);
  if (!toolConfig) {
    $container.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>工具配置不存在</span></div>`);
    return;
  }
  
  const currentSub = currentSubTab[toolId] || toolConfig.subTabs?.[0]?.id || 'config';
  
  $container.html(`
    <div class="yyt-tool-window">
      <div class="yyt-sub-content" data-subtab="${currentSub}">
        <!-- 子内容将在此渲染 -->
      </div>
    </div>
  `);
  
  renderSubTabContent(toolId, currentSub);
}

function renderToolConfig(toolId, $container) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$) return;
  
  const tool = toolManagerModule?.getTool(toolId);
  const apiPresets = presetManagerModule?.getAllPresets() || [];
  const boundPreset = toolRegistryModule?.getToolApiPreset(toolId) || '';
  
  const presetOptions = apiPresets.map(p => 
    `<option value="${escapeHtml(p.name)}" ${p.name === boundPreset ? 'selected' : ''}>${escapeHtml(p.name)}</option>`
  ).join('');
  
  $container.html(`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-plug"></i>
          <span>API预设绑定</span>
        </div>
        <div class="yyt-form-group">
          <label>选择API预设</label>
          <select class="yyt-select" id="yyt-tool-api-preset">
            <option value="">使用当前配置</option>
            ${presetOptions}
          </select>
        </div>
        <button class="yyt-btn yyt-btn-primary" id="yyt-save-tool-preset">
          <i class="fa-solid fa-save"></i> 保存绑定
        </button>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-cog"></i>
          <span>执行配置</span>
        </div>
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>超时时间 (ms)</label>
            <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${tool?.config?.execution?.timeout || 60000}">
          </div>
          <div class="yyt-form-group yyt-flex-1">
            <label>重试次数</label>
            <input type="number" class="yyt-input" id="yyt-tool-retries" value="${tool?.config?.execution?.retries || 3}">
          </div>
        </div>
      </div>
    </div>
  `);
  
  // 绑定保存事件
  $container.find('#yyt-save-tool-preset').on('click', function() {
    const presetName = $container.find('#yyt-tool-api-preset').val();
    toolRegistryModule?.setToolApiPreset(toolId, presetName);
    const toastr = topLevelWindow.toastr;
    if (toastr) {
      toastr.success(`API预设绑定已保存`, 'YouYou 工具箱');
    }
  });
}

function renderPromptEditor(toolId, $container) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !promptEditorModule) {
    $container.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>提示词编辑器模块未加载</span></div>`);
    return;
  }
  
  const tool = toolManagerModule?.getTool(toolId);
  const messages = tool?.config?.messages || [];
  
  // 将消息转换为提示词段落
  const segments = promptEditorModule.messagesToSegments ? 
    promptEditorModule.messagesToSegments(messages) : 
    promptEditorModule.DEFAULT_PROMPT_SEGMENTS;
  
  // 创建编辑器实例
  const editor = new promptEditorModule.PromptEditor({
    containerId: `yyt-prompt-editor-${toolId}`,
    segments: segments,
    onChange: (newSegments) => {
      // 将段落转换回消息并保存
      const newMessages = promptEditorModule.segmentsToMessages ? 
        promptEditorModule.segmentsToMessages(newSegments) : [];
      // TODO: 保存到工具配置
      log('提示词已更新:', newMessages.length, '条消息');
    }
  });
  
  // 渲染编辑器
  $container.html(`<div id="yyt-prompt-editor-${toolId}" class="yyt-prompt-editor-container"></div>`);
  editor.init($container.find(`#yyt-prompt-editor-${toolId}`));
  
  // 注入提示词编辑器样式
  const editorStyles = promptEditorModule.getPromptEditorStyles ? 
    promptEditorModule.getPromptEditorStyles() : '';
  if (editorStyles) {
    const styleId = `yyt-prompt-editor-styles`;
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = editorStyles;
      document.head.appendChild(style);
    }
  }
}

function renderToolPresets(toolId, $container) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$) return;
  
  $container.html(`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-bookmark"></i>
          <span>工具预设</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" style="margin-left: auto;">
            <i class="fa-solid fa-plus"></i> 新建
          </button>
        </div>
        <div class="yyt-empty-state-small">
          <i class="fa-solid fa-bookmark"></i>
          <span>暂无保存的预设</span>
        </div>
      </div>
    </div>
  `);
}

function openPopup() {
  // 如果弹窗已存在，直接返回
  if (currentPopup) {
    log('弹窗已存在');
    return;
  }

  const $ = topLevelWindow.jQuery || window.jQuery;
  const targetDoc = topLevelWindow.document || document;
  
  if (!$) {
    logError('jQuery 未找到，无法创建弹窗');
    return;
  }

  // 获取工具列表
  const tools = toolRegistryModule?.getToolList() || [];

  // 创建遮罩层
  currentOverlay = targetDoc.createElement('div');
  currentOverlay.className = 'yyt-popup-overlay';
  currentOverlay.addEventListener('click', (e) => {
    if (e.target === currentOverlay) {
      closePopup();
    }
  });
  targetDoc.body.appendChild(currentOverlay);

  // 主顶栏HTML
  const mainNavHtml = tools.map(tool => `
    <div class="yyt-main-nav-item ${tool.id === currentMainTab ? 'active' : ''}" data-tab="${tool.id}">
      <i class="fa-solid ${tool.icon}"></i>
      <span>${tool.name}</span>
    </div>
  `).join('');

  // 内容区域HTML
  const contentHtml = tools.map(tool => `
    <div class="yyt-tab-content ${tool.id === currentMainTab ? 'active' : ''}" data-tab="${tool.id}">
      <!-- 内容将动态渲染 -->
    </div>
  `).join('');

  // 创建弹窗HTML
  const popupHtml = `
    <div class="yyt-popup" id="${POPUP_ID}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou 工具箱</span>
          <span style="font-size: 12px; opacity: 0.6;">v${SCRIPT_VERSION}</span>
        </div>
        <button class="yyt-popup-close" title="关闭">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="yyt-popup-body">
        <div class="yyt-main-nav">
          ${mainNavHtml}
        </div>
        
        <div class="yyt-sub-nav" style="display: none;">
          <!-- 次级顶栏将动态渲染 -->
        </div>
        
        <div class="yyt-content">
          ${contentHtml}
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-close-btn">关闭</button>
      </div>
    </div>
  `;

  const tempDiv = targetDoc.createElement('div');
  tempDiv.innerHTML = popupHtml;
  currentPopup = tempDiv.firstElementChild;
  targetDoc.body.appendChild(currentPopup);

  // 绑定关闭按钮
  $(currentPopup).find('.yyt-popup-close').on('click', closePopup);
  $(currentPopup).find(`#${SCRIPT_ID}-close-btn`).on('click', closePopup);
  
  // 绑定主顶栏点击
  $(currentPopup).find('.yyt-main-nav-item').on('click', function() {
    const tab = $(this).data('tab');
    if (tab) {
      switchMainTab(tab);
    }
  });

  // 渲染初始内容
  renderTabContent(currentMainTab);
  
  // 如果当前工具有次级顶栏，渲染它
  const currentToolConfig = toolRegistryModule?.getToolConfig(currentMainTab);
  if (currentToolConfig?.hasSubTabs) {
    $(currentPopup).find('.yyt-sub-nav').show();
    renderSubNav(currentMainTab, currentToolConfig.subTabs);
  }

  log('弹窗已打开');
}

// ============================================================
// 菜单项注册
// ============================================================

function addMenuItem() {
  const $ = topLevelWindow.jQuery || window.jQuery;

  if (!$) {
    logError('jQuery 未找到，延迟重试...');
    setTimeout(addMenuItem, 1000);
    return;
  }

  const parentDoc = topLevelWindow.document || document;

  // 查找魔棒菜单
  const extensionsMenu = $('#extensionsMenu', parentDoc);

  if (!extensionsMenu.length) {
    log('魔棒菜单未找到，延迟重试...');
    setTimeout(addMenuItem, 2000);
    return;
  }

  // 检查是否已添加
  const existingItem = $(`#${MENU_CONTAINER_ID}`, extensionsMenu);
  if (existingItem.length > 0) {
    log('菜单项已存在');
    return;
  }

  // 创建菜单项容器
  const $menuContainer = $(`<div class="extension_container interactable" id="${MENU_CONTAINER_ID}" tabindex="0"></div>`);

  // 创建菜单项
  const menuItemHtml = `
    <div class="list-group-item flex-container flexGap5 interactable" id="${MENU_ITEM_ID}" title="打开 YouYou 工具箱">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou 工具箱</span>
    </div>
  `;

  const $menuItem = $(menuItemHtml);

  // 绑定点击事件
  $menuItem.on('click', async function(e) {
    e.stopPropagation();
    log('菜单项被点击');

    // 关闭魔棒菜单
    const exMenuBtn = $('#extensionsMenuButton', parentDoc);
    if (exMenuBtn.length && extensionsMenu.is(':visible')) {
      exMenuBtn.trigger('click');
    }

    // 打开弹窗
    openPopup();
  });

  // 将菜单项添加到容器
  $menuContainer.append($menuItem);

  // 将容器添加到魔棒菜单
  extensionsMenu.append($menuContainer);

  log('菜单项已添加到魔棒区');
}

// ============================================================
// API（供外部调用）
// ============================================================

const YouYouToolkit = {
  version: SCRIPT_VERSION,
  id: SCRIPT_ID,
  
  // 初始化
  init,
  
  // 弹窗控制
  openPopup,
  closePopup,
  
  // 标签切换
  switchMainTab,
  switchSubTab,
  
  // 菜单管理
  addMenuItem,
  
  // 模块访问（异步）
  getStorage: () => storageModule,
  getApiConnection: () => apiConnectionModule,
  getPresetManager: () => presetManagerModule,
  getUiComponents: () => uiComponentsModule,
  getRegexExtractor: () => regexExtractorModule,
  getToolManager: () => toolManagerModule,
  getToolExecutor: () => toolExecutorModule,
  getToolTrigger: () => toolTriggerModule,
  getWindowManager: () => windowManagerModule,
  getToolRegistry: () => toolRegistryModule,
  getPromptEditor: () => promptEditorModule,
  
  // v0.5 新模块访问
  getSettingsService: () => settingsServiceModule,
  getBypassManager: () => bypassManagerModule,
  getVariableResolver: () => variableResolverModule,
  getContextInjector: () => contextInjectorModule,
  getToolPromptService: () => toolPromptServiceModule,
  getToolOutputService: () => toolOutputServiceModule,
  
  // 便捷方法
  async getApiConfig() {
    await loadModules();
    return storageModule ? storageModule.loadSettings().apiConfig : null;
  },
  
  async saveApiConfig(config) {
    await loadModules();
    if (apiConnectionModule) {
      apiConnectionModule.updateApiConfig(config);
      return true;
    }
    return false;
  },
  
  async getPresets() {
    await loadModules();
    return presetManagerModule ? presetManagerModule.getAllPresets() : [];
  },
  
  async sendApiRequest(messages, options) {
    await loadModules();
    if (apiConnectionModule) {
      return apiConnectionModule.sendApiRequest(messages, options);
    }
    throw new Error('API模块未加载');
  },
  
  async testApiConnection() {
    await loadModules();
    if (apiConnectionModule) {
      return apiConnectionModule.testApiConnection();
    }
    return { success: false, message: 'API模块未加载' };
  },
  
  // 工具注册
  registerTool(id, config) {
    return toolRegistryModule?.registerTool(id, config) || false;
  },
  
  unregisterTool(id) {
    return toolRegistryModule?.unregisterTool(id) || false;
  },
  
  getToolList() {
    return toolRegistryModule?.getToolList() || [];
  },
  
  // 窗口管理
  createWindow(options) {
    return windowManagerModule?.createWindow(options) || null;
  },
  
  closeWindow(id) {
    windowManagerModule?.closeWindow(id);
  }
};

// ============================================================
// 初始化函数
// ============================================================

async function init() {
  log(`初始化开始... 版本: ${SCRIPT_VERSION}`);

  // 注入样式
  await injectStyles();

  // 加载模块
  const modulesLoaded = await loadModules();
  
  if (modulesLoaded) {
    log('所有模块加载成功');
    
    // 注入UI组件样式
    const targetDoc = topLevelWindow.document || document;
    
    if (uiComponentsModule) {
      const uiStyleId = `${SCRIPT_ID}-ui-styles`;
      if (!targetDoc.getElementById(uiStyleId)) {
        const uiStyle = targetDoc.createElement('style');
        uiStyle.id = uiStyleId;
        uiStyle.textContent = uiComponentsModule.getStyles();
        (targetDoc.head || targetDoc.documentElement).appendChild(uiStyle);
      }
      
      // 注入正则提取面板样式
      const regexStyleId = `${SCRIPT_ID}-regex-styles`;
      if (!targetDoc.getElementById(regexStyleId) && uiComponentsModule.getRegexStyles) {
        const regexStyle = targetDoc.createElement('style');
        regexStyle.id = regexStyleId;
        regexStyle.textContent = uiComponentsModule.getRegexStyles();
        (targetDoc.head || targetDoc.documentElement).appendChild(regexStyle);
      }
      
      // 注入工具管理面板样式
      const toolStyleId = `${SCRIPT_ID}-tool-styles`;
      if (!targetDoc.getElementById(toolStyleId) && uiComponentsModule.getToolStyles) {
        const toolStyle = targetDoc.createElement('style');
        toolStyle.id = toolStyleId;
        toolStyle.textContent = uiComponentsModule.getToolStyles();
        (targetDoc.head || targetDoc.documentElement).appendChild(toolStyle);
      }
    }
    
    // 注入窗口管理器样式
    if (windowManagerModule) {
      const windowStyleId = `${SCRIPT_ID}-window-styles`;
      if (!targetDoc.getElementById(windowStyleId)) {
        // 窗口管理器会自动注入样式
      }
    }
    
    // 注入提示词编辑器样式
    if (promptEditorModule && promptEditorModule.getPromptEditorStyles) {
      const promptStyleId = `${SCRIPT_ID}-prompt-styles`;
      if (!targetDoc.getElementById(promptStyleId)) {
        const promptStyle = targetDoc.createElement('style');
        promptStyle.id = promptStyleId;
        promptStyle.textContent = promptEditorModule.getPromptEditorStyles();
        (targetDoc.head || targetDoc.documentElement).appendChild(promptStyle);
      }
    }
  } else {
    log('部分模块加载失败，使用基础功能');
  }

  // 等待页面加载完成
  const targetDoc = topLevelWindow.document || document;
  if (targetDoc.readyState === 'loading') {
    targetDoc.addEventListener('DOMContentLoaded', () => {
      setTimeout(addMenuItem, 1000);
    });
  } else {
    setTimeout(addMenuItem, 1000);
  }

  log('初始化完成');
}

// ============================================================
// 导出
// ============================================================

// 导出到全局
if (typeof window !== 'undefined') {
  window.YouYouToolkit = YouYouToolkit;
  
  // 兼容：同时暴露到顶层窗口
  if (typeof window.parent !== 'undefined' && window.parent !== window) {
    try {
      window.parent.YouYouToolkit = YouYouToolkit;
    } catch (e) {
      // 跨域情况下可能会失败，忽略
    }
  }
}

// ES Module 默认导出
export default YouYouToolkit;

// 自动初始化
init();

log('模块加载完成');