/**
 * YouYou Toolkit - 独立窗口管理器
 * @description 提供独立窗口系统，支持拖拽、调整大小、最大化等功能
 */

import { windowStorage } from './core/storage-service.js';

// ============================================================
// 常量定义
// ============================================================

const WINDOW_MANAGER_ID = 'youyou_toolkit_window_manager';
const WINDOW_STATE_STORAGE_KEY = 'window_states';

// ============================================================
// 窗口管理器类
// ============================================================

class WindowManager {
  constructor() {
    this.windows = new Map();
    this.baseZIndex = 10000;
    this.topZIndex = 10000;
    this.stylesInjected = false;
  }

  /**
   * 注册窗口
   * @param {string} id - 窗口ID
   * @param {jQuery} $el - 窗口jQuery对象
   */
  register(id, $el) {
    this.topZIndex++;
    this.windows.set(id, { $el, zIndex: this.topZIndex });
    $el.css('z-index', this.topZIndex);
  }

  /**
   * 注销窗口
   * @param {string} id - 窗口ID
   */
  unregister(id) {
    this.windows.delete(id);
  }

  /**
   * 将窗口置顶
   * @param {string} id - 窗口ID
   */
  bringToFront(id) {
    const win = this.windows.get(id);
    if (!win) return;
    this.topZIndex++;
    win.zIndex = this.topZIndex;
    win.$el.css('z-index', this.topZIndex);
  }

  /**
   * 获取窗口
   * @param {string} id - 窗口ID
   * @returns {jQuery|null}
   */
  getWindow(id) {
    return this.windows.get(id)?.$el || null;
  }

  /**
   * 检查窗口是否打开
   * @param {string} id - 窗口ID
   * @returns {boolean}
   */
  isOpen(id) {
    return this.windows.has(id);
  }

  /**
   * 关闭所有窗口
   */
  closeAll() {
    this.windows.forEach((win, id) => {
      if (win.$el) win.$el.remove();
    });
    this.windows.clear();
  }

  /**
   * 保存窗口状态
   * @param {string} windowId - 窗口ID
   * @param {object} state - 窗口状态
   */
  saveState(windowId, state) {
    const states = this.loadStates();
    states[windowId] = {
      ...state,
      updatedAt: Date.now()
    };
    windowStorage.set(WINDOW_STATE_STORAGE_KEY, states);
  }

  /**
   * 加载所有窗口状态
   * @returns {object}
   */
  loadStates() {
    return windowStorage.get(WINDOW_STATE_STORAGE_KEY) || {};
  }

  /**
   * 获取单个窗口状态
   * @param {string} windowId - 窗口ID
   * @returns {object|null}
   */
  getState(windowId) {
    const states = this.loadStates();
    return states[windowId] || null;
  }
}

// 单例实例
const windowManager = new WindowManager();

// ============================================================
// 样式注入
// ============================================================

function injectWindowStyles() {
  if (windowManager.stylesInjected) return;
  windowManager.stylesInjected = true;

  const css = `
    /* ============================================================
       YouYou Toolkit - 独立窗口系统样式
       ============================================================ */
    
    .yyt-window-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
      animation: yytWindowFadeIn 0.2s ease-out;
    }
    
    @keyframes yytWindowFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .yyt-window {
      position: fixed;
      display: flex;
      flex-direction: column;
      background:
        radial-gradient(1200px 600px at 10% -10%, rgba(123, 183, 255, 0.12), transparent 60%),
        radial-gradient(900px 500px at 100% 0%, rgba(155, 123, 255, 0.10), transparent 55%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
        #0b0f15;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 25px 80px rgba(0, 0, 0, 0.65),
        0 0 60px rgba(123, 183, 255, 0.1);
      min-width: 400px;
      min-height: 300px;
      animation: yytWindowSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
    }
    
    @keyframes yytWindowSlideIn {
      from { 
        opacity: 0; 
        transform: scale(0.95) translateY(-20px); 
      }
      to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    
    .yyt-window.maximized {
      top: 10px !important;
      left: 10px !important;
      width: calc(100vw - 20px) !important;
      height: calc(100vh - 20px) !important;
      border-radius: 12px;
    }
    
    /* 窄屏模式 */
    @media screen and (max-width: 1100px) {
      .yyt-window.maximized {
        top: 5px !important;
        left: 5px !important;
        width: calc(100vw - 10px) !important;
        height: calc(100vh - 10px) !important;
        border-radius: 8px;
      }
      
      .yyt-window-header {
        padding: 10px 12px;
      }
      
      .yyt-window-controls {
        gap: 6px;
        margin-right: 0;
      }
      
      .yyt-window-btn {
        width: 32px;
        height: 32px;
      }
      
      .yyt-window {
        min-width: 320px;
      }
    }
    
    /* 超窄屏模式 */
    @media screen and (max-width: 768px) {
      .yyt-window {
        min-width: 100vw !important;
        min-height: 100vh !important;
      }
      
      .yyt-window.maximized {
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0;
        border: none;
      }
      
      .yyt-window-header {
        padding: 8px 10px;
        min-height: 44px;
        flex-shrink: 0;
      }
      
      .yyt-window-controls {
        margin-right: 0;
      }
      
      .yyt-window-title {
        font-size: 13px;
      }
      
      .yyt-window-btn {
        width: 36px;
        height: 36px;
        font-size: 16px;
      }
      
      .yyt-window-body {
        max-width: 100vw;
        overflow-x: hidden;
        overflow-y: auto;
        flex: 1 1 0;
        min-height: 0;
      }
    }
    
    .yyt-window-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      cursor: move;
      user-select: none;
      flex-shrink: 0;
    }
    
    .yyt-window-title {
      font-size: 14px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
    
    .yyt-window-title i {
      color: rgba(123, 183, 255, 0.85);
      flex-shrink: 0;
    }
    
    .yyt-window-title span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .yyt-window-controls {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
      margin-left: 8px;
    }
    
    .yyt-window-btn {
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
    
    .yyt-window-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-window-btn.close:hover {
      background: rgba(255, 107, 107, 0.25);
      color: #ff6b6b;
    }
    
    .yyt-window-body {
      flex: 1 1 0;
      min-height: 0;
      overflow: auto;
      overflow-x: hidden;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    
    .yyt-window-body > * {
      flex: 1 1 0;
      min-height: 0;
      overflow-y: auto;
      box-sizing: border-box;
    }
    
    /* 窗口大小调整手柄 */
    .yyt-window-resize-handle {
      position: absolute;
      background: transparent;
    }
    
    .yyt-window-resize-handle.se {
      right: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
    }
    
    .yyt-window-resize-handle.se::after {
      content: '';
      position: absolute;
      right: 4px;
      bottom: 4px;
      width: 10px;
      height: 10px;
      border-right: 2px solid rgba(255, 255, 255, 0.25);
      border-bottom: 2px solid rgba(255, 255, 255, 0.25);
    }
    
    .yyt-window-resize-handle.e {
      right: 0;
      top: 40px;
      bottom: 20px;
      width: 6px;
      cursor: e-resize;
    }
    
    .yyt-window-resize-handle.s {
      left: 20px;
      right: 20px;
      bottom: 0;
      height: 6px;
      cursor: s-resize;
    }
    
    .yyt-window-resize-handle.w {
      left: 0;
      top: 40px;
      bottom: 20px;
      width: 6px;
      cursor: w-resize;
    }
    
    .yyt-window-resize-handle.n {
      left: 20px;
      right: 20px;
      top: 0;
      height: 6px;
      cursor: n-resize;
    }
    
    .yyt-window-resize-handle.nw {
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      cursor: nw-resize;
    }
    
    .yyt-window-resize-handle.ne {
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      cursor: ne-resize;
    }
    
    .yyt-window-resize-handle.sw {
      left: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      cursor: sw-resize;
    }
  `;

  const style = document.createElement('style');
  style.id = WINDOW_MANAGER_ID + '_styles';
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
}

// ============================================================
// 窗口创建函数
// ============================================================

/**
 * 创建独立浮动窗口
 * @param {object} options - 窗口选项
 * @param {string} options.id - 窗口唯一ID
 * @param {string} options.title - 窗口标题
 * @param {string} options.content - 窗口内容HTML
 * @param {number} [options.width=900] - 初始宽度
 * @param {number} [options.height=700] - 初始高度
 * @param {boolean} [options.modal=false] - 是否为模态窗口
 * @param {boolean} [options.resizable=true] - 是否可调整大小
 * @param {boolean} [options.maximizable=true] - 是否可最大化
 * @param {boolean} [options.startMaximized=false] - 是否启动时最大化
 * @param {boolean} [options.rememberState=true] - 是否记住窗口状态
 * @param {function} [options.onClose] - 关闭回调
 * @param {function} [options.onReady] - 窗口就绪回调
 * @returns {jQuery} 窗口jQuery对象
 */
export function createWindow(options) {
  const {
    id,
    title = '窗口',
    content = '',
    width = 900,
    height = 700,
    modal = false,
    resizable = true,
    maximizable = true,
    startMaximized = false,
    rememberState = true,
    onClose,
    onReady
  } = options;

  // 确保样式已注入
  injectWindowStyles();

  // 获取jQuery
  const $ = window.jQuery || window.parent?.jQuery;
  if (!$) {
    console.error('[WindowManager] jQuery not available');
    return null;
  }

  // 如果窗口已存在，直接显示并置顶
  if (windowManager.isOpen(id)) {
    windowManager.bringToFront(id);
    return windowManager.getWindow(id);
  }

  // 计算初始位置（居中）
  const viewW = window.innerWidth || 1200;
  const viewH = window.innerHeight || 800;

  // 窄屏检测
  const isNarrowScreen = viewW <= 1100;

  // 恢复上次保存的窗口状态
  let savedState = null;
  let useSavedState = false;
  if (rememberState) {
    savedState = windowManager.getState(id);
    if (savedState && !isNarrowScreen) {
      useSavedState = true;
    }
  }

  // 确保宽高至少为 400x300，且不超过视口
  let initialW, initialH;
  if (useSavedState && savedState.width && savedState.height) {
    initialW = Math.max(400, Math.min(savedState.width, viewW - 40));
    initialH = Math.max(300, Math.min(savedState.height, viewH - 40));
  } else {
    initialW = Math.max(400, Math.min(width, viewW - 40));
    initialH = Math.max(300, Math.min(height, viewH - 40));
  }

  // 居中
  const initialX = Math.max(20, Math.min((viewW - initialW) / 2, viewW - initialW - 20));
  const initialY = Math.max(20, Math.min((viewH - initialH) / 2, viewH - initialH - 20));

  // 窄屏模式下不显示最大化按钮
  const showMaximizeBtn = maximizable && !isNarrowScreen;

  // 构建窗口HTML
  const windowHtml = `
    <div class="yyt-window" id="${id}" style="left:${initialX}px; top:${initialY}px; width:${initialW}px; height:${initialH}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${escapeHtml(title)}</span>
        </div>
        <div class="yyt-window-controls">
          ${showMaximizeBtn ? '<button class="yyt-window-btn maximize" title="最大化/还原"><i class="fa-solid fa-expand"></i></button>' : ''}
          <button class="yyt-window-btn close" title="关闭"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${content}</div>
      ${resizable ? `
        <div class="yyt-window-resize-handle se"></div>
        <div class="yyt-window-resize-handle e"></div>
        <div class="yyt-window-resize-handle s"></div>
        <div class="yyt-window-resize-handle w"></div>
        <div class="yyt-window-resize-handle n"></div>
        <div class="yyt-window-resize-handle nw"></div>
        <div class="yyt-window-resize-handle ne"></div>
        <div class="yyt-window-resize-handle sw"></div>
      ` : ''}
    </div>
  `;

  // 创建遮罩层（模态窗口）
  let $overlay = null;
  if (modal) {
    $overlay = $(`<div class="yyt-window-overlay" data-for="${id}"></div>`);
    $(document.body).append($overlay);
  }

  // 插入窗口
  const $window = $(windowHtml);
  $(document.body).append($window);

  // 注册到窗口管理器
  windowManager.register(id, $window);

  // 点击窗口置顶
  $window.on('mousedown', () => windowManager.bringToFront(id));

  // 最大化/还原
  let isMaximized = false;
  let restoreState = { left: initialX, top: initialY, width: initialW, height: initialH };

  const doMaximize = () => {
    restoreState = {
      left: parseInt($window.css('left')),
      top: parseInt($window.css('top')),
      width: $window.width(),
      height: $window.height()
    };
    $window.addClass('maximized');
    $window.find('.yyt-window-btn.maximize i').removeClass('fa-expand').addClass('fa-compress');
    isMaximized = true;
  };

  const doRestore = () => {
    $window.removeClass('maximized');
    $window.css({
      left: restoreState.left + 'px',
      top: restoreState.top + 'px',
      width: restoreState.width + 'px',
      height: restoreState.height + 'px'
    });
    $window.find('.yyt-window-btn.maximize i').removeClass('fa-compress').addClass('fa-expand');
    isMaximized = false;
  };

  // 最大化按钮
  $window.find('.yyt-window-btn.maximize').on('click', () => {
    if (isMaximized) {
      doRestore();
    } else {
      doMaximize();
    }
  });

  // 启动时最大化逻辑
  if (isNarrowScreen && maximizable) {
    doMaximize();
  } else if (useSavedState && savedState.isMaximized && maximizable) {
    doMaximize();
  } else if (startMaximized && maximizable) {
    doMaximize();
  }

  // 关闭按钮
  $window.find('.yyt-window-btn.close').on('click', () => {
    // 保存窗口状态
    if (rememberState && maximizable) {
      const currentState = {
        width: isMaximized ? restoreState.width : $window.width(),
        height: isMaximized ? restoreState.height : $window.height(),
        isMaximized: isMaximized
      };
      windowManager.saveState(id, currentState);
    }

    if (onClose) onClose();
    if ($overlay) $overlay.remove();
    $window.remove();
    windowManager.unregister(id);
    $(document).off('.yytWindowDrag' + id);
    $(document).off('.yytWindowResize' + id);
  });

  // 遮罩层点击（可选关闭）
  if ($overlay) {
    $overlay.on('click', (e) => {
      if (e.target === $overlay[0]) {
        // 可以选择不关闭
      }
    });
  }

  // 拖拽移动
  let isDragging = false;
  let dragStartX, dragStartY, windowStartX, windowStartY;

  $window.find('.yyt-window-header').on('mousedown', (e) => {
    if ($(e.target).closest('.yyt-window-controls').length) return;
    if (isMaximized) return;

    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    windowStartX = parseInt($window.css('left'));
    windowStartY = parseInt($window.css('top'));

    $(document.body).css('user-select', 'none');
  });

  $(document).on('mousemove.yytWindowDrag' + id, (e) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    $window.css({
      left: Math.max(0, windowStartX + dx) + 'px',
      top: Math.max(0, windowStartY + dy) + 'px'
    });
  });

  $(document).on('mouseup.yytWindowDrag' + id, () => {
    if (isDragging) {
      isDragging = false;
      $(document.body).css('user-select', '');
    }
  });

  // 调整大小
  if (resizable) {
    let isResizing = false;
    let resizeType = '';
    let resizeStartX, resizeStartY, startWidth, startHeight, startLeft, startTop;

    $window.find('.yyt-window-resize-handle').on('mousedown', function(e) {
      if (isMaximized) return;

      isResizing = true;
      resizeType = '';
      if ($(this).hasClass('se')) resizeType = 'se';
      else if ($(this).hasClass('e')) resizeType = 'e';
      else if ($(this).hasClass('s')) resizeType = 's';
      else if ($(this).hasClass('w')) resizeType = 'w';
      else if ($(this).hasClass('n')) resizeType = 'n';
      else if ($(this).hasClass('nw')) resizeType = 'nw';
      else if ($(this).hasClass('ne')) resizeType = 'ne';
      else if ($(this).hasClass('sw')) resizeType = 'sw';

      resizeStartX = e.clientX;
      resizeStartY = e.clientY;
      startWidth = $window.width();
      startHeight = $window.height();
      startLeft = parseInt($window.css('left'));
      startTop = parseInt($window.css('top'));

      $(document.body).css('user-select', 'none');
      e.stopPropagation();
    });

    $(document).on('mousemove.yytWindowResize' + id, (e) => {
      if (!isResizing) return;

      const dx = e.clientX - resizeStartX;
      const dy = e.clientY - resizeStartY;
      const minW = 400, minH = 300;

      let newW = startWidth, newH = startHeight, newL = startLeft, newT = startTop;

      if (resizeType.includes('e')) newW = Math.max(minW, startWidth + dx);
      if (resizeType.includes('s')) newH = Math.max(minH, startHeight + dy);
      if (resizeType.includes('w')) {
        const proposedW = startWidth - dx;
        if (proposedW >= minW) {
          newW = proposedW;
          newL = startLeft + dx;
        }
      }
      if (resizeType.includes('n')) {
        const proposedH = startHeight - dy;
        if (proposedH >= minH) {
          newH = proposedH;
          newT = startTop + dy;
        }
      }

      $window.css({
        width: newW + 'px',
        height: newH + 'px',
        left: newL + 'px',
        top: newT + 'px'
      });
    });

    $(document).on('mouseup.yytWindowResize' + id, () => {
      if (isResizing) {
        isResizing = false;
        $(document.body).css('user-select', '');
      }
    });
  }

  // 清理事件（窗口关闭时）
  $window.on('remove', () => {
    $(document).off('.yytWindowDrag' + id);
    $(document).off('.yytWindowResize' + id);
  });

  // 回调
  if (onReady) {
    setTimeout(() => onReady($window), 50);
  }

  return $window;
}

/**
 * 关闭指定窗口
 * @param {string} id - 窗口ID
 */
export function closeWindow(id) {
  const $window = windowManager.getWindow(id);
  if ($window) {
    const $ = window.jQuery || window.parent?.jQuery;
    if ($) {
      $(`.yyt-window-overlay[data-for="${id}"]`).remove();
      $(document).off('.yytWindowDrag' + id);
      $(document).off('.yytWindowResize' + id);
    }
    $window.remove();
    windowManager.unregister(id);
  }
}

/**
 * HTML转义
 * @param {string} unsafe - 原始字符串
 * @returns {string}
 */
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

// 导出单例和管理器类
export { windowManager, WindowManager };