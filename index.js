/**
 * YouYou Toolkit - SillyTavern 工具插件
 * @version 0.1.0
 * @description 一个轻量级的 SillyTavern 工具插件框架
 * @author YouYou
 */

// ============================================================
// 常量定义
// ============================================================
const SCRIPT_ID = 'youyou_toolkit';
const SCRIPT_VERSION = '0.1.0';
const MENU_ITEM_ID = `${SCRIPT_ID}-menu-item`;
const MENU_CONTAINER_ID = `${SCRIPT_ID}-menu-container`;
const POPUP_ID = `${SCRIPT_ID}-popup`;

// 获取顶层窗口
const topLevelWindow = (typeof window.parent !== 'undefined' ? window.parent : window);

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
    /* YouYou Toolkit 样式 */
    
    /* 菜单项样式 */
    #${MENU_CONTAINER_ID} {
      display: flex;
      align-items: center;
    }
    
    #${MENU_ITEM_ID} {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    #${MENU_ITEM_ID}:hover {
      background-color: var(--hover-bg, rgba(255, 255, 255, 0.1));
    }
    
    #${MENU_ITEM_ID} .fa-icon {
      font-size: 16px;
      color: var(--accent-color, #7bb7ff);
    }
    
    /* 弹窗样式 */
    .yyt-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
      animation: yytFadeIn 0.2s ease-out;
    }
    
    @keyframes yytFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .yyt-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%), #0b0f15;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65);
      min-width: 400px;
      min-height: 300px;
      max-width: 90vw;
      max-height: 90vh;
      z-index: 10000;
      animation: yytSlideIn 0.25s ease-out;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
      display: flex;
      flex-direction: column;
    }
    
    @keyframes yytSlideIn {
      from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px 16px 0 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-popup-title i {
      color: rgba(123, 183, 255, 0.85);
    }
    
    .yyt-popup-close {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    
    .yyt-popup-close:hover {
      background: rgba(255, 107, 107, 0.25);
      color: #ff6b6b;
    }
    
    .yyt-popup-body {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
    
    .yyt-popup-footer {
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.02);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0 0 16px 16px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    .yyt-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s ease;
    }
    
    .yyt-btn-primary {
      background: rgba(123, 183, 255, 0.85);
      color: #0b0f15;
    }
    
    .yyt-btn-primary:hover {
      background: rgba(123, 183, 255, 1);
    }
    
    .yyt-btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
    }
    
    .yyt-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
    }
    
    /* 欢迎内容样式 */
    .yyt-welcome {
      text-align: center;
      padding: 40px 20px;
    }
    
    .yyt-welcome h2 {
      margin: 0 0 20px 0;
      color: rgba(123, 183, 255, 0.85);
    }
    
    .yyt-welcome p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
      margin: 0 0 15px 0;
    }
    
    .yyt-version {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 30px;
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

  // 创建弹窗
  const popupHtml = `
    <div class="yyt-popup" id="${POPUP_ID}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou 工具箱</span>
        </div>
        <button class="yyt-popup-close" title="关闭">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      <div class="yyt-popup-body">
        <div class="yyt-welcome">
          <h2>🛠️ 欢迎使用 YouYou 工具箱</h2>
          <p>这是一个 SillyTavern 工具插件框架。</p>
          <p>你可以在此基础之上开发各种实用工具。</p>
          <p>当前版本：<strong>v${SCRIPT_VERSION}</strong></p>
          <div class="yyt-version">
            插件ID: ${SCRIPT_ID}
          </div>
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
// 初始化函数
// ============================================================

async function init() {
  log(`初始化开始... 版本: ${SCRIPT_VERSION}`);

  // 注入样式
  injectStyles();

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
// 导出 API（供外部调用）
// ============================================================

const YouYouToolkit = {
  version: SCRIPT_VERSION,
  id: SCRIPT_ID,
  init,
  openPopup,
  closePopup,
  addMenuItem
};

// 导出到全局
if (typeof window !== 'undefined') {
  window.YouYouToolkit = YouYouToolkit;
}

// ES Module 默认导出
export default YouYouToolkit;

// 自动初始化
init();

log('模块加载完成');