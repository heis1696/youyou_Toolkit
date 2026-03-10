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
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
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
  // 尝试使用SillyTavern的toastr
  const topWindow = (typeof window.parent !== 'undefined' && window.parent !== window) ? window.parent : window;
  
  if (topWindow.toastr) {
    topWindow.toastr[type](message, 'YouYou 工具箱', {
      timeOut: duration,
      progressBar: true
    });
    return;
  }
  
  // 回退到console
  console.log(`[${type.toUpperCase()}] ${message}`);
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
    wide = false
  } = options;
  
  return `
    <div class="yyt-dialog-overlay" id="${id}-overlay">
      <div class="yyt-dialog ${wide ? 'yyt-dialog-wide' : ''}" style="${width !== '380px' ? `width: ${width}` : ''}">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${title}</span>
          <button class="yyt-dialog-close" id="${id}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          ${body}
        </div>
        <div class="yyt-dialog-footer">
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