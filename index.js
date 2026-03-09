/**
 * YouYou Toolkit - SillyTavern 工具插件
 * @version 0.3.0
 * @description 一个轻量级的 SillyTavern 工具插件框架，支持API连接、预设管理与正则提取
 * @author YouYou
 */

// ============================================================
// 常量定义
// ============================================================
const SCRIPT_ID = 'youyou_toolkit';
const SCRIPT_VERSION = '0.3.0';
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

async function loadModules() {
  try {
    // 在浏览器环境中，这些模块需要通过相对路径加载
    // 由于SillyTavern的特殊环境，我们使用动态导入
    storageModule = await import('./modules/storage.js');
    apiConnectionModule = await import('./modules/api-connection.js');
    presetManagerModule = await import('./modules/preset-manager.js');
    uiComponentsModule = await import('./modules/ui-components.js');
    regexExtractorModule = await import('./modules/regex-extractor.js');
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

function injectStyles() {
  const styleId = `${SCRIPT_ID}-styles`;
  const targetDoc = topLevelWindow.document || document;

  // 检查是否已注入
  if (targetDoc.getElementById(styleId)) return;

  const css = `
    /* ============================================================
       YouYou Toolkit - 现代化弹窗样式
       ============================================================ */
    
    /* CSS变量 */
    :root {
      --yyt-accent: #7bb7ff;
      --yyt-accent-glow: rgba(123, 183, 255, 0.4);
      --yyt-accent-soft: rgba(123, 183, 255, 0.15);
      --yyt-success: #4ade80;
      --yyt-error: #f87171;
      --yyt-surface: rgba(255, 255, 255, 0.03);
      --yyt-surface-hover: rgba(255, 255, 255, 0.06);
      --yyt-border: rgba(255, 255, 255, 0.08);
      --yyt-border-strong: rgba(255, 255, 255, 0.15);
      --yyt-text: rgba(255, 255, 255, 0.95);
      --yyt-text-secondary: rgba(255, 255, 255, 0.7);
      --yyt-text-muted: rgba(255, 255, 255, 0.45);
    }
    
    /* 菜单项样式 */
    #${MENU_CONTAINER_ID} {
      display: flex;
      align-items: center;
    }
    
    #${MENU_ITEM_ID} {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
      margin: 2px;
    }
    
    #${MENU_ITEM_ID}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${MENU_ITEM_ID} .fa-fw {
      font-size: 16px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      transition: transform 0.2s ease;
    }
    
    #${MENU_ITEM_ID}:hover .fa-fw {
      transform: scale(1.1);
    }
    
    #${MENU_ITEM_ID} span {
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    
    /* 弹窗遮罩 */
    .yyt-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9999;
      animation: yytFadeIn 0.25s ease-out;
    }
    
    @keyframes yytFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* 弹窗主体 */
    .yyt-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: 
        radial-gradient(ellipse at top, rgba(123, 183, 255, 0.08) 0%, transparent 50%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 30%),
        #0d1117;
      border: 1px solid var(--yyt-border-strong);
      border-radius: 20px;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 25px 80px rgba(0, 0, 0, 0.7),
        0 0 60px rgba(123, 183, 255, 0.1);
      width: 680px;
      min-height: 480px;
      max-width: 92vw;
      max-height: 88vh;
      z-index: 10000;
      animation: yytSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: var(--yyt-text);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    @keyframes yytSlideIn {
      from { 
        opacity: 0; 
        transform: translate(-50%, -50%) scale(0.92) translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translate(-50%, -50%) scale(1) translateY(0); 
      }
    }
    
    /* 弹窗头部 */
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
      border-bottom: 1px solid var(--yyt-border);
      flex-shrink: 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 17px;
      font-weight: 700;
      color: var(--yyt-text);
      letter-spacing: 0.3px;
    }
    
    .yyt-popup-title i {
      font-size: 18px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 10px var(--yyt-accent-glow));
    }
    
    .yyt-popup-close {
      width: 32px;
      height: 32px;
      border: 1px solid var(--yyt-border);
      border-radius: 10px;
      background: var(--yyt-surface);
      color: var(--yyt-text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      font-size: 14px;
    }
    
    .yyt-popup-close:hover {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.2) 0%, rgba(248, 113, 113, 0.08) 100%);
      border-color: rgba(248, 113, 113, 0.35);
      color: #f87171;
      transform: rotate(90deg);
    }
    
    /* 弹窗内容 */
    .yyt-popup-body {
      flex: 1;
      padding: 24px;
      overflow: auto;
    }
    
    .yyt-popup-body::-webkit-scrollbar {
      width: 8px;
    }
    
    .yyt-popup-body::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .yyt-popup-body::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 4px;
    }
    
    .yyt-popup-body::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    /* 弹窗底部 */
    .yyt-popup-footer {
      padding: 18px 24px;
      background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%);
      border-top: 1px solid var(--yyt-border);
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    
    /* 按钮 */
    .yyt-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      letter-spacing: 0.3px;
      position: relative;
      overflow: hidden;
    }
    
    .yyt-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .yyt-btn-primary {
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      color: #0b0f15;
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    
    .yyt-btn-secondary {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text);
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-btn-secondary:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, var(--yyt-surface-hover) 100%);
      border-color: var(--yyt-border-strong);
      transform: translateY(-1px);
    }
    
    /* 主导航样式 */
    .yyt-nav {
      display: flex;
      gap: 8px;
      padding: 6px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 14px;
      margin-bottom: 24px;
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--yyt-text-secondary);
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }
    
    .yyt-nav-item:hover {
      color: var(--yyt-text);
      background: var(--yyt-surface-hover);
    }
    
    .yyt-nav-item.active {
      color: #0b0f15;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-nav-item i {
      font-size: 15px;
      transition: transform 0.25s ease;
    }
    
    .yyt-nav-item:hover i {
      transform: scale(1.15);
    }
    
    /* 页面内容 */
    .yyt-page {
      display: none;
      animation: yytPageIn 0.3s ease-out;
    }
    
    @keyframes yytPageIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .yyt-page.active {
      display: block;
    }
    
    /* 欢迎页面 */
    .yyt-welcome {
      text-align: center;
      padding: 50px 30px;
    }
    
    .yyt-welcome h2 {
      margin: 0 0 12px 0;
      font-size: 26px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 50%, var(--yyt-accent) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: yytGradient 3s linear infinite;
    }
    
    @keyframes yytGradient {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }
    
    .yyt-welcome p {
      color: var(--yyt-text-secondary);
      line-height: 1.7;
      margin: 0 0 20px 0;
      font-size: 15px;
    }
    
    .yyt-version {
      font-size: 12px;
      color: var(--yyt-text-muted);
      margin-top: 35px;
      padding: 10px 20px;
      background: var(--yyt-surface);
      border-radius: 20px;
      display: inline-block;
      border: 1px solid var(--yyt-border);
      letter-spacing: 0.5px;
    }
    
    .yyt-features {
      text-align: left;
      max-width: 450px;
      margin: 30px auto;
    }
    
    .yyt-feature-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 12px;
      margin-bottom: 10px;
      border: 1px solid var(--yyt-border);
      transition: all 0.25s ease;
    }
    
    .yyt-feature-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(123, 183, 255, 0.2);
      transform: translateX(6px);
    }
    
    .yyt-feature-item i {
      color: var(--yyt-accent);
      font-size: 22px;
      width: 28px;
      filter: drop-shadow(0 0 8px var(--yyt-accent-glow));
      transition: transform 0.25s ease;
    }
    
    .yyt-feature-item:hover i {
      transform: scale(1.1);
    }
    
    .yyt-feature-item span {
      color: var(--yyt-text);
      font-size: 14px;
      font-weight: 500;
    }
  `;

  const style = targetDoc.createElement('style');
  style.id = styleId;
  style.textContent = css;
  (targetDoc.head || targetDoc.documentElement).appendChild(style);

  log('样式已注入');
}

// ============================================================
// 弹窗管理
// ============================================================

let currentPopup = null;
let currentOverlay = null;
let currentPage = 'welcome';

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

function switchPage(pageName) {
  currentPage = pageName;
  
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup) return;
  
  // 更新导航状态
  $(currentPopup).find('.yyt-nav-item').removeClass('active');
  $(currentPopup).find(`.yyt-nav-item[data-page="${pageName}"]`).addClass('active');
  
  // 更新页面显示
  $(currentPopup).find('.yyt-page').removeClass('active');
  $(currentPopup).find(`.yyt-page[data-page="${pageName}"]`).addClass('active');
  
  // 如果切换到API管理页面，渲染组件
  if (pageName === 'api' && uiComponentsModule) {
    const $apiContainer = $(currentPopup).find('#youyou_toolkit-api-container');
    if ($apiContainer.length) {
      uiComponentsModule.render($apiContainer);
    }
  }
  
  // 如果切换到正则提取页面，渲染组件
  if (pageName === 'regex' && uiComponentsModule) {
    const $regexContainer = $(currentPopup).find('#youyou_toolkit-regex-container');
    if ($regexContainer.length) {
      uiComponentsModule.renderRegex($regexContainer);
    }
  }
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

  // 创建遮罩层
  currentOverlay = targetDoc.createElement('div');
  currentOverlay.className = 'yyt-popup-overlay';
  currentOverlay.addEventListener('click', (e) => {
    if (e.target === currentOverlay) {
      closePopup();
    }
  });
  targetDoc.body.appendChild(currentOverlay);

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
        <div class="yyt-nav">
          <div class="yyt-nav-item active" data-page="welcome">
            <i class="fa-solid fa-home"></i>
            <span>首页</span>
          </div>
          <div class="yyt-nav-item" data-page="api">
            <i class="fa-solid fa-plug"></i>
            <span>API管理</span>
          </div>
          <div class="yyt-nav-item" data-page="regex">
            <i class="fa-solid fa-regex"></i>
            <span>正则提取</span>
          </div>
        </div>
        
        <div class="yyt-page active" data-page="welcome">
          <div class="yyt-welcome">
            <h2>🛠️ 欢迎使用 YouYou 工具箱</h2>
            <p>这是一个为 SillyTavern 设计的工具插件框架。</p>
            
            <div class="yyt-features">
              <div class="yyt-feature-item">
                <i class="fa-solid fa-plug"></i>
                <span>API连接管理 - 支持自定义API和主API切换</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-bookmark"></i>
                <span>预设管理 - 保存和切换多套API配置</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-regex"></i>
                <span>正则提取 - 从消息中提取特定内容</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-file-import"></i>
                <span>导入导出 - 方便备份和分享配置</span>
              </div>
            </div>
            
            <div class="yyt-version">
              插件ID: ${SCRIPT_ID}
            </div>
          </div>
        </div>
        
        <div class="yyt-page" data-page="api">
          <div id="${SCRIPT_ID}-api-container"></div>
        </div>
        
        <div class="yyt-page" data-page="regex">
          <div id="${SCRIPT_ID}-regex-container"></div>
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
  
  // 绑定导航点击
  $(currentPopup).find('.yyt-nav-item').on('click', function() {
    const page = $(this).data('page');
    if (page) {
      switchPage(page);
    }
  });

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
  
  // 页面切换
  switchPage,
  
  // 菜单管理
  addMenuItem,
  
  // 模块访问（异步）
  getStorage: () => storageModule,
  getApiConnection: () => apiConnectionModule,
  getPresetManager: () => presetManagerModule,
  getUiComponents: () => uiComponentsModule,
  getRegexExtractor: () => regexExtractorModule,
  
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
  }
};

// ============================================================
// 初始化函数
// ============================================================

async function init() {
  log(`初始化开始... 版本: ${SCRIPT_VERSION}`);

  // 注入样式
  injectStyles();

  // 加载模块
  const modulesLoaded = await loadModules();
  
  if (modulesLoaded) {
    log('所有模块加载成功');
    
    // 注入UI组件样式
    if (uiComponentsModule) {
      const targetDoc = topLevelWindow.document || document;
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