/**
 * YouYou Toolkit - UI工具函数
 * @description 提供UI组件共享的工具函数
 * @version 1.0.0
 */

// ============================================================
// 常量定义
// ============================================================

export const SCRIPT_ID = 'youyou_toolkit';

// ============================================================
// HTML转义
// ============================================================

/**
 * HTML转义函数
 * @param {string} unsafe - 未转义的字符串
 * @returns {string} 转义后的字符串
 */
export function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================
// Toast通知
// ============================================================

/**
 * 显示Toast通知
 * @param {string} type - 类型 ('success', 'error', 'warning', 'info')
 * @param {string} message - 消息内容
 * @param {number} duration - 持续时间(ms)
 */
export function showToast(type, message, duration = 3000) {
  // 确保message不为空
  if (!message) {
    message = type === 'error' ? '操作失败' : '操作完成';
  }
  
  // 尝试使用SillyTavern的toastr
  const topWindow = (typeof window.parent !== 'undefined' && window.parent !== window) ? window.parent : window;
  
  if (topWindow.toastr) {
    topWindow.toastr[type](message, 'YouYou 工具箱', {
      timeOut: duration,
      progressBar: true
    });
    return;
  }
  
  // 回退到自定义Toast
  _showFallbackToast(type, message, duration);
  
  // 同时输出到console
  console.log(`[YouYou 工具箱] [${type.toUpperCase()}] ${message}`);
}

/**
 * 显示顶部通知
 * @param {string} type - 类型 ('success', 'error', 'warning', 'info')
 * @param {string} message - 消息内容
 * @param {Object} options - 显示选项
 * @param {number} options.duration - 持续时间(ms)
 * @param {boolean} options.sticky - 是否常驻，需手动关闭
 * @param {string} options.noticeId - 通知ID，相同ID会先移除旧通知
 */
export function showTopNotice(type, message, options = {}) {
  if (!message) {
    message = type === 'error' ? '操作失败' : '操作完成';
  }

  const {
    duration = 3500,
    sticky = false,
    noticeId = ''
  } = options;

  const targetDoc = (typeof window.parent !== 'undefined' && window.parent !== window)
    ? window.parent.document
    : document;

  if (!targetDoc?.body) {
    showToast(type, message, duration);
    return;
  }

  const containerId = 'yyt-top-notice-container';
  const styleId = 'yyt-top-notice-styles';

  let container = targetDoc.getElementById(containerId);
  if (!container) {
    container = targetDoc.createElement('div');
    container.id = containerId;
    container.style.cssText = `
      position: fixed;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: min(560px, calc(100vw - 24px));
      z-index: 100000;
      pointer-events: none;
    `;
    targetDoc.body.appendChild(container);
  }

  if (!targetDoc.getElementById(styleId)) {
    const style = targetDoc.createElement('style');
    style.id = styleId;
    style.textContent = `
      .yyt-top-notice {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: rgba(255, 255, 255, 0.95);
        background: rgba(11, 15, 21, 0.92);
        box-shadow: 0 10px 32px rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        pointer-events: auto;
        animation: yyt-top-notice-in 0.18s ease-out;
      }

      .yyt-top-notice__icon {
        width: 24px;
        height: 24px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 700;
      }

      .yyt-top-notice__content {
        flex: 1;
        min-width: 0;
        font-size: 13px;
        line-height: 1.5;
        word-break: break-word;
      }

      .yyt-top-notice__close {
        border: none;
        background: transparent;
        color: rgba(255, 255, 255, 0.72);
        cursor: pointer;
        width: 24px;
        height: 24px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s ease, color 0.15s ease;
      }

      .yyt-top-notice__close:hover {
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.95);
      }

      .yyt-top-notice--success {
        border-color: rgba(74, 222, 128, 0.35);
      }

      .yyt-top-notice--success .yyt-top-notice__icon {
        background: rgba(74, 222, 128, 0.18);
        color: #4ade80;
      }

      .yyt-top-notice--error {
        border-color: rgba(248, 113, 113, 0.38);
      }

      .yyt-top-notice--error .yyt-top-notice__icon {
        background: rgba(248, 113, 113, 0.18);
        color: #f87171;
      }

      .yyt-top-notice--warning {
        border-color: rgba(251, 191, 36, 0.38);
      }

      .yyt-top-notice--warning .yyt-top-notice__icon {
        background: rgba(251, 191, 36, 0.18);
        color: #fbbf24;
      }

      .yyt-top-notice--info {
        border-color: rgba(123, 183, 255, 0.38);
      }

      .yyt-top-notice--info .yyt-top-notice__icon {
        background: rgba(123, 183, 255, 0.18);
        color: #7bb7ff;
      }

      @keyframes yyt-top-notice-in {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes yyt-top-notice-out {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-8px);
        }
      }
    `;
    targetDoc.head.appendChild(style);
  }

  if (noticeId) {
    const existing = container.querySelector(`[data-notice-id="${noticeId}"]`);
    if (existing) {
      existing.remove();
    }
  }

  const iconMap = {
    success: '✓',
    error: '!',
    warning: '•',
    info: 'i'
  };

  const notice = targetDoc.createElement('div');
  notice.className = `yyt-top-notice yyt-top-notice--${type || 'info'}`;
  if (noticeId) {
    notice.dataset.noticeId = noticeId;
  }

  const icon = targetDoc.createElement('span');
  icon.className = 'yyt-top-notice__icon';
  icon.textContent = iconMap[type] || iconMap.info;

  const content = targetDoc.createElement('div');
  content.className = 'yyt-top-notice__content';
  content.textContent = message;

  const closeBtn = targetDoc.createElement('button');
  closeBtn.className = 'yyt-top-notice__close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', '关闭通知');
  closeBtn.textContent = '×';

  const removeNotice = () => {
    notice.style.animation = 'yyt-top-notice-out 0.18s ease forwards';
    setTimeout(() => notice.remove(), 180);
  };

  closeBtn.addEventListener('click', removeNotice);

  notice.appendChild(icon);
  notice.appendChild(content);
  notice.appendChild(closeBtn);
  container.appendChild(notice);

  if (!sticky) {
    setTimeout(removeNotice, duration);
  }
}

/**
 * 显示回退Toast（当toastr不可用时）
 * @private
 */
function _showFallbackToast(type, message, duration) {
  const targetDoc = (typeof window.parent !== 'undefined' && window.parent !== window) 
    ? window.parent.document 
    : document;
  
  if (!targetDoc) {
    return;
  }
  
  // 移除已有的toast
  const existingToast = targetDoc.getElementById('yyt-fallback-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // 颜色映射
  const colors = {
    success: { bg: 'rgba(74, 222, 128, 0.9)', border: '#22c55e' },
    error: { bg: 'rgba(248, 113, 113, 0.9)', border: '#ef4444' },
    warning: { bg: 'rgba(251, 191, 36, 0.9)', border: '#f59e0b' },
    info: { bg: 'rgba(123, 183, 255, 0.9)', border: '#7bb7ff' }
  };
  
  const color = colors[type] || colors.info;
  
  // 创建toast元素
  const toast = targetDoc.createElement('div');
  toast.id = 'yyt-fallback-toast';
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${color.bg};
    color: #0b0f15;
    border-radius: 8px;
    border: 2px solid ${color.border};
    font-size: 14px;
    font-weight: 500;
    z-index: 99999;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: yyt-toast-in 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  `;
  toast.textContent = message;
  
  // 添加动画样式
  if (!targetDoc.getElementById('yyt-toast-styles')) {
    const style = targetDoc.createElement('style');
    style.id = 'yyt-toast-styles';
    style.textContent = `
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `;
    targetDoc.head.appendChild(style);
  }
  
  targetDoc.body.appendChild(toast);
  
  // 自动移除
  setTimeout(() => {
    toast.style.animation = 'yyt-toast-out 0.3s ease forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// ============================================================
// jQuery获取
// ============================================================

let cachedJQuery = null;

/**
 * 获取jQuery实例
 * @returns {Function|null} jQuery函数
 */
export function getJQuery() {
  if (cachedJQuery) return cachedJQuery;
  
  // 优先从父窗口获取jQuery
  if (typeof window.parent !== 'undefined' && window.parent !== window) {
    try {
      if (window.parent.jQuery) {
        cachedJQuery = window.parent.jQuery;
        return cachedJQuery;
      }
    } catch (e) {
      // 跨域或其他错误，忽略
    }
  }
  
  // 回退到当前窗口的jQuery
  if (window.jQuery) {
    cachedJQuery = window.jQuery;
  }
  
  return cachedJQuery;
}

/**
 * 重置jQuery缓存（用于测试）
 */
export function resetJQueryCache() {
  cachedJQuery = null;
}

// ============================================================
// 容器验证
// ============================================================

/**
 * 检查容器是否有效
 * @param {Object} $container - jQuery容器对象
 * @returns {boolean}
 */
export function isContainerValid($container) {
  return $container && $container.length > 0;
}

// ============================================================
// 表单数据获取
// ============================================================

/**
 * 从表单获取API配置
 * @param {Object} $container - jQuery容器对象
 * @param {string} scriptId - 脚本ID
 * @returns {Object} API配置对象
 */
export function getFormApiConfig($container, scriptId = SCRIPT_ID) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return {
      url: '',
      apiKey: '',
      model: '',
      useMainApi: true,
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 0.9
    };
  }
  
  // 模型值可能来自输入框或下拉框
  let model = $container.find(`#${scriptId}-model`).val()?.trim() || '';
  const $modelSelect = $container.find(`#${scriptId}-model-select`);
  if ($modelSelect.is(':visible')) {
    model = $modelSelect.val() || model;
  }
  
  return {
    url: $container.find(`#${scriptId}-api-url`).val()?.trim() || '',
    apiKey: $container.find(`#${scriptId}-api-key`).val() || '',
    model: model,
    useMainApi: $container.find(`#${scriptId}-use-main-api`).is(':checked'),
    max_tokens: parseInt($container.find(`#${scriptId}-max-tokens`).val()) || 4096,
    temperature: parseFloat($container.find(`#${scriptId}-temperature`).val()) ?? 0.7,
    top_p: parseFloat($container.find(`#${scriptId}-top-p`).val()) ?? 0.9
  };
}

/**
 * 用配置填充表单
 * @param {Object} $container - jQuery容器对象
 * @param {Object} config - API配置对象
 * @param {string} scriptId - 脚本ID
 */
export function fillFormWithConfig($container, config, scriptId = SCRIPT_ID) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container) || !config) return;
  
  $container.find(`#${scriptId}-api-url`).val(config.url || '');
  $container.find(`#${scriptId}-api-key`).val(config.apiKey || '');
  $container.find(`#${scriptId}-model`).val(config.model || '');
  $container.find(`#${scriptId}-max-tokens`).val(config.max_tokens || 4096);
  $container.find(`#${scriptId}-temperature`).val(config.temperature ?? 0.7);
  $container.find(`#${scriptId}-top-p`).val(config.top_p ?? 0.9);
  
  const useMainApi = config.useMainApi ?? true;
  const $checkbox = $container.find(`#${scriptId}-use-main-api`);
  $checkbox.prop('checked', useMainApi);
  
  const $customFields = $container.find(`#${scriptId}-custom-api-fields`);
  if (useMainApi) {
    $customFields.addClass('yyt-disabled').find('input, button, select').prop('disabled', true);
  } else {
    $customFields.removeClass('yyt-disabled').find('input, button, select').prop('disabled', false);
  }
  
  // 重置模型选择器状态
  $container.find(`#${scriptId}-model`).show();
  $container.find(`#${scriptId}-model-select`).hide();
}

// ============================================================
// 对话框创建
// ============================================================

/**
 * 创建对话框HTML
 * @param {Object} options - 对话框选项
 * @returns {string} HTML字符串
 */
export function createDialogHtml(options) {
  const {
    id,
    title,
    body,
    width = '380px',
    wide = false,
    dialogClass = '',
    bodyClass = '',
    footerClass = ''
  } = options;

  return `
    <div class="yyt-dialog-overlay" id="${id}-overlay">
      <div class="yyt-dialog ${wide ? 'yyt-dialog-wide' : ''} ${dialogClass}" style="${width !== '380px' ? `width: ${width};` : ''} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${title}</span>
          <button class="yyt-dialog-close" id="${id}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body ${bodyClass}" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${body}
        </div>
        <div class="yyt-dialog-footer ${footerClass}">
          <button class="yyt-btn yyt-btn-secondary" id="${id}-cancel">取消</button>
          <button class="yyt-btn yyt-btn-primary" id="${id}-save">保存</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * 绑定对话框事件
 * @param {Object} $container - jQuery容器对象
 * @param {string} id - 对话框ID
 * @param {Object} callbacks - 回调函数
 * @returns {Function} 关闭对话框函数
 */
export function bindDialogEvents($container, id, callbacks = {}) {
  const $ = getJQuery();
  if (!$) return () => {};
  
  const $overlay = $container.find(`#${id}-overlay`);
  
  const closeDialog = () => {
    $overlay.remove();
    if (callbacks.onClose) callbacks.onClose();
  };
  
  $overlay.find(`#${id}-close, #${id}-cancel`).on('click', closeDialog);
  
  $overlay.on('click', function(e) {
    if (e.target === this) {
      closeDialog();
    }
  });
  
  $overlay.find(`#${id}-save`).on('click', function() {
    if (callbacks.onSave) {
      callbacks.onSave(closeDialog);
    }
  });
  
  return closeDialog;
}

// ============================================================
// 文件下载
// ============================================================

/**
 * 下载JSON文件
 * @param {string} json - JSON字符串
 * @param {string} filename - 文件名
 */
export function downloadJson(json, filename) {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * 读取文件内容
 * @param {File} file - 文件对象
 * @returns {Promise<string>} 文件内容
 */
export function readFileContent(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('文件读取失败'));
    reader.readAsText(file);
  });
}

// ============================================================
// 默认导出
// ============================================================

export default {
  SCRIPT_ID,
  escapeHtml,
  showToast,
  showTopNotice,
  getJQuery,
  resetJQueryCache,
  isContainerValid,
  getFormApiConfig,
  fillFormWithConfig,
  createDialogHtml,
  bindDialogEvents,
  downloadJson,
  readFileContent
};