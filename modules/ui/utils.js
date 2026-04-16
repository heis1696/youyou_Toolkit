/**
 * YouYou Toolkit - UI工具函数
 * @description 提供UI组件共享的工具函数
 * @version 1.0.0
 */

// ============================================================
// 常量定义
// ============================================================

export const SCRIPT_ID = 'youyou_toolkit';

export function getTargetDocument() {
  if (typeof window.parent !== 'undefined' && window.parent !== window && window.parent.document) {
    return window.parent.document;
  }
  return document;
}

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

  const targetDoc = getTargetDocument();

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
  const targetDoc = getTargetDocument();
  
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
// 自定义下拉框
// ============================================================

function mergeClassNames(...values) {
  return values
    .flat(Infinity)
    .flatMap((value) => String(value || '').split(/\s+/))
    .map((value) => value.trim())
    .filter(Boolean)
    .join(' ');
}

function buildAttributeString(attributes = {}) {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => {
      if (value === true) {
        return key;
      }
      return `${key}="${escapeHtml(String(value))}"`;
    })
    .join(' ');
}

function resolveSelectedOption(options = [], selectedValue = '', placeholder = '') {
  const resolvedValue = String(selectedValue ?? '');
  const selectedOption = options.find((option) => option.value === resolvedValue)
    || options.find((option) => option.disabled !== true)
    || null;

  if (selectedOption) {
    return selectedOption;
  }

  return {
    value: resolvedValue,
    label: placeholder || resolvedValue || '请选择',
    disabled: false
  };
}

function extractSelectClasses(className = '') {
  return String(className || '')
    .split(/\s+/)
    .map((value) => value.trim())
    .filter((value) => value && value !== 'yyt-select' && value !== 'yyt-native-select-bridge');
}

function getCustomSelectRoot($container, $native) {
  const $ = getJQuery();
  if (!$ || !$native?.length) {
    return null;
  }

  const targetSelector = $native.attr('id')
    ? `#${$native.attr('id')}`
    : ($native.attr('data-yyt-select-key') ? `[data-yyt-select-key="${$native.attr('data-yyt-select-key')}"]` : '');

  if (!targetSelector) {
    return null;
  }

  const $roots = $container.find('[data-yyt-custom-select]');
  const $root = $roots.filter((_, element) => String($(element).attr('data-yyt-select-target') || '') === targetSelector);
  return $root.length ? $root.first() : null;
}

function resolveCustomSelectEventDocument($container) {
  const containerElement = $container?.[0];
  if (containerElement?.ownerDocument) {
    return containerElement.ownerDocument;
  }

  if (typeof window.parent !== 'undefined' && window.parent !== window && window.parent.document) {
    return window.parent.document;
  }

  return document;
}

function resolveCustomSelectRoots($container) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return null;
  }

  const $roots = $container.find('[data-yyt-custom-select]');
  return $roots.length ? $roots : null;
}

function resolveCustomSelectNative($container, $root) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return null;
  }

  const $embeddedNative = $root.find('[data-yyt-select-native]').first();
  if ($embeddedNative.length) {
    return $embeddedNative;
  }

  const targetSelector = String($root.attr('data-yyt-select-target') || '').trim();
  if (!targetSelector) {
    return null;
  }

  const $native = $container.find(targetSelector).first();
  return $native.length ? $native : null;
}

const customSelectPortalStates = new WeakMap();
const CUSTOM_SELECT_PORTAL_LAYER_ID = 'yyt-select-portal-layer';

function resolveOwnerDocument(subject = null) {
  if (subject?.jquery && subject[0]?.ownerDocument) {
    return subject[0].ownerDocument;
  }

  if (subject?.ownerDocument) {
    return subject.ownerDocument;
  }

  if (subject?.nodeType === 9) {
    return subject;
  }

  return getTargetDocument();
}

function getCustomSelectPortalState(subject = null) {
  const targetDoc = resolveOwnerDocument(subject);
  let state = customSelectPortalStates.get(targetDoc);
  if (!state) {
    state = {
      targetDoc,
      layer: null,
      activeRoot: null,
      activeDropdown: null,
      placeholder: null,
      cleanup: null
    };
    customSelectPortalStates.set(targetDoc, state);
  }
  return state;
}

function ensureCustomSelectPortalLayer(subject = null) {
  const targetDoc = resolveOwnerDocument(subject);
  if (!targetDoc?.body) {
    return null;
  }

  const state = getCustomSelectPortalState(targetDoc);
  if (state.layer && state.layer.isConnected) {
    return state.layer;
  }

  let layer = targetDoc.getElementById(CUSTOM_SELECT_PORTAL_LAYER_ID);
  if (!layer) {
    layer = targetDoc.createElement('div');
    layer.id = CUSTOM_SELECT_PORTAL_LAYER_ID;
    layer.className = 'yyt-select-portal-layer';
    targetDoc.body.appendChild(layer);
  }

  state.layer = layer;
  return layer;
}

function resolveCustomSelectTrigger($root) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return null;
  }

  const $trigger = $root.find('[data-yyt-select-trigger]').first();
  return $trigger.length ? $trigger : $root.find('.yyt-select-trigger').first();
}

function resolveCustomSelectDropdown($root) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return null;
  }

  const state = getCustomSelectPortalState($root);
  if (state.activeRoot === $root[0] && state.activeDropdown) {
    return $(state.activeDropdown);
  }

  const $dropdown = $root.find('[data-yyt-select-dropdown]').first();
  return $dropdown.length ? $dropdown : $root.find('.yyt-select-dropdown').first();
}

function clearFloatingDropdownPresentation(dropdownElement) {
  if (!dropdownElement) {
    return;
  }

  dropdownElement.classList.remove('yyt-floating-open');
  dropdownElement.removeAttribute('data-yyt-floating');
  dropdownElement.removeAttribute('data-yyt-floating-placement');
  dropdownElement.style.position = '';
  dropdownElement.style.top = '';
  dropdownElement.style.left = '';
  dropdownElement.style.right = '';
  dropdownElement.style.width = '';
  dropdownElement.style.maxHeight = '';
  dropdownElement.style.zIndex = '';
}

function isEventInsideCustomSelect(target, subject = null) {
  if (!target) {
    return false;
  }

  const state = getCustomSelectPortalState(subject || target);
  if (state.activeRoot?.contains?.(target) || state.activeDropdown?.contains?.(target)) {
    return true;
  }

  return Boolean(target.closest?.('[data-yyt-custom-select], .yyt-select-portal-layer'));
}

function attachCustomSelectPortalListeners(state) {
  if (!state?.targetDoc || typeof state.cleanup === 'function') {
    return;
  }

  const targetDoc = state.targetDoc;
  const targetWindow = targetDoc.defaultView || window;

  const onMouseDown = (event) => {
    if (!state.activeRoot || !state.activeDropdown) {
      return;
    }

    if (isEventInsideCustomSelect(event.target, targetDoc)) {
      return;
    }

    closeActiveCustomSelectDropdown(targetDoc);
  };

  const onKeyDown = (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    const activeRoot = state.activeRoot;
    closeActiveCustomSelectDropdown(targetDoc);

    const $ = getJQuery();
    if ($ && activeRoot) {
      resolveCustomSelectTrigger($(activeRoot))?.trigger('focus');
    }
  };

  const onResize = () => {
    repositionActiveCustomSelectDropdown(targetDoc);
  };

  const onScroll = () => {
    repositionActiveCustomSelectDropdown(targetDoc);
  };

  targetDoc.addEventListener('mousedown', onMouseDown, true);
  targetDoc.addEventListener('keydown', onKeyDown, true);
  targetWindow.addEventListener('resize', onResize);
  targetDoc.addEventListener('scroll', onScroll, true);

  state.cleanup = () => {
    targetDoc.removeEventListener('mousedown', onMouseDown, true);
    targetDoc.removeEventListener('keydown', onKeyDown, true);
    targetWindow.removeEventListener('resize', onResize);
    targetDoc.removeEventListener('scroll', onScroll, true);
  };
}

function detachCustomSelectPortalListeners(state) {
  if (typeof state?.cleanup === 'function') {
    state.cleanup();
  }
  if (state) {
    state.cleanup = null;
  }
}

function positionFloatingCustomSelectDropdown(state) {
  const $ = getJQuery();
  if (!$ || !state?.activeRoot || !state?.activeDropdown) {
    return;
  }

  const targetDoc = state.targetDoc;
  if (!targetDoc?.body?.contains?.(state.activeRoot)) {
    closeActiveCustomSelectDropdown(targetDoc);
    return;
  }

  const $root = $(state.activeRoot);
  const $trigger = resolveCustomSelectTrigger($root);
  const dropdownElement = state.activeDropdown;
  const targetWindow = targetDoc?.defaultView || window;

  if (!$trigger?.length || !dropdownElement?.isConnected || !$root[0]?.isConnected) {
    closeActiveCustomSelectDropdown(targetDoc);
    return;
  }

  const rect = $trigger[0].getBoundingClientRect();
  const viewportWidth = targetWindow.innerWidth || targetDoc.documentElement?.clientWidth || 0;
  const viewportHeight = targetWindow.innerHeight || targetDoc.documentElement?.clientHeight || 0;
  const margin = 12;
  const gap = 8;
  const availableBelow = Math.max(0, viewportHeight - rect.bottom - margin - gap);
  const availableAbove = Math.max(0, rect.top - margin - gap);
  const openAbove = availableBelow < 220 && availableAbove > availableBelow;
  const availableHeight = openAbove ? availableAbove : availableBelow;
  const maxHeight = Math.max(120, Math.floor(availableHeight || 0));

  dropdownElement.setAttribute('data-yyt-floating', 'true');
  dropdownElement.setAttribute('data-yyt-floating-placement', openAbove ? 'top' : 'bottom');
  dropdownElement.classList.add('yyt-floating-open');

  const contentHeight = Math.min(dropdownElement.scrollHeight || maxHeight, maxHeight);
  const width = Math.ceil(rect.width);
  let left = Math.round(rect.left);
  if (left + width > viewportWidth - margin) {
    left = Math.max(margin, Math.round(viewportWidth - margin - width));
  }
  left = Math.max(margin, left);

  let top = openAbove
    ? Math.round(rect.top - gap - contentHeight)
    : Math.round(rect.bottom + gap);
  top = Math.max(margin, Math.min(top, Math.round(viewportHeight - margin - contentHeight)));

  dropdownElement.style.position = 'fixed';
  dropdownElement.style.top = `${top}px`;
  dropdownElement.style.left = `${left}px`;
  dropdownElement.style.right = 'auto';
  dropdownElement.style.width = `${Math.ceil(width)}px`;
  dropdownElement.style.maxHeight = `${Math.floor(maxHeight)}px`;
  dropdownElement.style.zIndex = '10050';
}

export function closeActiveCustomSelectDropdown(subject = null) {
  const $ = getJQuery();
  const state = getCustomSelectPortalState(subject);
  if (!$ || !state?.activeRoot) {
    return;
  }

  const rootElement = state.activeRoot;
  const dropdownElement = state.activeDropdown;
  const placeholder = state.placeholder;
  const $root = $(rootElement);
  const $trigger = resolveCustomSelectTrigger($root);

  if (dropdownElement) {
    clearFloatingDropdownPresentation(dropdownElement);

    if (placeholder?.parentNode) {
      placeholder.parentNode.insertBefore(dropdownElement, placeholder);
    } else if (rootElement?.isConnected) {
      rootElement.appendChild(dropdownElement);
    } else {
      dropdownElement.remove();
    }
  }

  placeholder?.parentNode?.removeChild(placeholder);

  $root.removeClass('yyt-open');
  $trigger?.attr('aria-expanded', 'false');

  state.activeRoot = null;
  state.activeDropdown = null;
  state.placeholder = null;
  detachCustomSelectPortalListeners(state);
}

export function repositionActiveCustomSelectDropdown(subject = null) {
  const state = getCustomSelectPortalState(subject);
  if (!state?.activeRoot || !state?.activeDropdown) {
    return;
  }

  positionFloatingCustomSelectDropdown(state);
}

export function openCustomSelectDropdown($root) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return;
  }

  const $resolvedRoot = $root.first();
  const $trigger = resolveCustomSelectTrigger($resolvedRoot);
  const $dropdown = resolveCustomSelectDropdown($resolvedRoot);
  if (!$trigger?.length || !$dropdown?.length || $trigger.prop('disabled')) {
    return;
  }

  const state = getCustomSelectPortalState($resolvedRoot);
  if (state.activeRoot === $resolvedRoot[0]) {
    positionFloatingCustomSelectDropdown(state);
    return;
  }

  closeActiveCustomSelectDropdown($resolvedRoot);

  const layer = ensureCustomSelectPortalLayer($resolvedRoot);
  if (!layer) {
    return;
  }

  const dropdownElement = $dropdown[0];
  const placeholder = state.targetDoc.createComment('yyt-select-dropdown-placeholder');
  dropdownElement.parentNode?.insertBefore(placeholder, dropdownElement);
  layer.appendChild(dropdownElement);

  state.activeRoot = $resolvedRoot[0];
  state.activeDropdown = dropdownElement;
  state.placeholder = placeholder;

  $resolvedRoot.addClass('yyt-open');
  $trigger.attr('aria-expanded', 'true');

  attachCustomSelectPortalListeners(state);
  positionFloatingCustomSelectDropdown(state);
}

function resolveCustomSelectRootFromOption($container, $option) {
  const $ = getJQuery();
  if (!$ || !$option?.length) {
    return null;
  }

  const $inlineRoot = $option.closest('[data-yyt-custom-select]');
  if ($inlineRoot.length) {
    return $inlineRoot.first();
  }

  const state = getCustomSelectPortalState($option);
  if (state.activeRoot && state.activeDropdown?.contains?.($option[0])) {
    const $root = $(state.activeRoot);
    return $container.has(state.activeRoot).length ? $root : null;
  }

  return null;
}

export function closeCustomSelectDropdown($root) {
  const state = getCustomSelectPortalState($root);
  if ($root?.length && state.activeRoot && state.activeRoot !== $root[0]) {
    return;
  }

  closeActiveCustomSelectDropdown($root);
}

export function toggleCustomSelectDropdown($root) {
  const state = getCustomSelectPortalState($root);
  if ($root?.length && state.activeRoot === $root[0]) {
    closeActiveCustomSelectDropdown($root);
    return;
  }

  openCustomSelectDropdown($root);
}

function updateCustomSelectUi($container, $root, $native = null) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return;
  }

  const $resolvedNative = $native || resolveCustomSelectNative($container, $root);
  if (!$resolvedNative?.length) {
    return;
  }

  const options = Array.isArray($resolvedNative.data('yytCustomSelectOptions'))
    ? $resolvedNative.data('yytCustomSelectOptions')
    : [];
  const selectedOption = resolveSelectedOption(options, $resolvedNative.val(), $root.attr('data-yyt-select-placeholder') || '');
  const selectedValue = String(selectedOption.value ?? '');
  const selectedLabel = String(selectedOption.label ?? '');
  const disabled = $resolvedNative.is(':disabled');

  $root.find('.yyt-select-value')
    .text(selectedLabel)
    .attr('data-value', selectedValue)
    .data('value', selectedValue);

  const $dropdown = resolveCustomSelectDropdown($root);
  const $options = $dropdown?.length ? $dropdown.find('[data-yyt-select-option]') : $root.find('[data-yyt-select-option]');
  $options.each((_, element) => {
    const $option = $(element);
    const isSelected = String($option.attr('data-value') || '') === selectedValue;
    $option.toggleClass('yyt-selected', isSelected).attr('aria-selected', String(isSelected));
  });

  const $trigger = $root.find('[data-yyt-select-trigger]').first();
  $trigger.prop('disabled', disabled);
  if (disabled) {
    closeCustomSelectDropdown($root);
    $root.removeClass('yyt-open');
    $trigger.attr('aria-expanded', 'false');
  }
}

export function normalizeCustomSelectOptions(options = []) {
  return Array.isArray(options)
    ? options.map((option) => {
      if (option && typeof option === 'object' && !Array.isArray(option)) {
        const optionValue = String(option.value ?? '');
        const optionLabel = String(option.label ?? option.text ?? option.name ?? optionValue);
        return {
          value: optionValue,
          label: optionLabel,
          disabled: option.disabled === true
        };
      }

      const optionValue = String(option ?? '');
      return {
        value: optionValue,
        label: optionValue,
        disabled: false
      };
    })
    : [];
}

export function renderCustomSelectControl(config = {}) {
  const {
    selectedValue = '',
    options = [],
    placeholder = '请选择',
    disabled = false,
    includeNative = true,
    nativeTag = 'input',
    nativeType = 'hidden',
    rootAttributes = {},
    nativeAttributes = {},
    triggerAttributes = {},
    dropdownAttributes = {},
    optionAttributes = {},
    optionClass = '',
    optionTextClass = ''
  } = config;

  const normalizedOptions = normalizeCustomSelectOptions(options);
  const selectedOption = resolveSelectedOption(normalizedOptions, selectedValue, placeholder);
  const resolvedDisabled = disabled === true || normalizedOptions.length === 0;

  const rootAttributeString = buildAttributeString({
    ...rootAttributes,
    class: mergeClassNames('yyt-custom-select', rootAttributes.class),
    'data-yyt-custom-select': rootAttributes['data-yyt-custom-select'] ?? 'true',
    'data-yyt-select-placeholder': placeholder
  });

  const triggerAttributeString = buildAttributeString({
    type: 'button',
    ...triggerAttributes,
    class: mergeClassNames('yyt-select-trigger', triggerAttributes.class),
    'data-yyt-select-trigger': triggerAttributes['data-yyt-select-trigger'] ?? 'true',
    'aria-haspopup': triggerAttributes['aria-haspopup'] ?? 'listbox',
    'aria-expanded': triggerAttributes['aria-expanded'] ?? 'false',
    disabled: resolvedDisabled ? true : triggerAttributes.disabled
  });

  const dropdownAttributeString = buildAttributeString({
    ...dropdownAttributes,
    class: mergeClassNames('yyt-select-dropdown', dropdownAttributes.class),
    'data-yyt-select-dropdown': dropdownAttributes['data-yyt-select-dropdown'] ?? 'true',
    role: dropdownAttributes.role ?? 'listbox'
  });

  const nativeMarkup = includeNative
    ? (() => {
        const commonAttributes = {
          ...nativeAttributes,
          class: mergeClassNames(nativeAttributes.class),
          'data-yyt-select-native': nativeAttributes['data-yyt-select-native'] ?? 'true',
          disabled: resolvedDisabled ? true : nativeAttributes.disabled
        };

        if (nativeTag === 'select') {
          const nativeAttributeString = buildAttributeString(commonAttributes);
          return `<select ${nativeAttributeString}>${normalizedOptions.map((option) => `
            <option value="${escapeHtml(option.value)}" ${option.value === String(selectedOption.value ?? '') ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}>${escapeHtml(option.label)}</option>
          `).join('')}</select>`;
        }

        const nativeAttributeString = buildAttributeString({
          type: nativeType,
          value: selectedOption.value,
          ...commonAttributes
        });
        return `<input ${nativeAttributeString}>`;
      })()
    : '';

  return `
    <div ${rootAttributeString}>
      ${nativeMarkup}
      <button ${triggerAttributeString}>
        <span class="${escapeHtml(mergeClassNames('yyt-select-value'))}" data-value="${escapeHtml(selectedOption.value)}">${escapeHtml(selectedOption.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${dropdownAttributeString}>
        ${normalizedOptions.map((option) => {
          const isSelected = option.value === String(selectedOption.value ?? '');
          const optionAttributeString = buildAttributeString({
            type: 'button',
            ...optionAttributes,
            class: mergeClassNames('yyt-select-option', optionClass, optionAttributes.class, isSelected ? 'yyt-selected' : ''),
            'data-yyt-select-option': optionAttributes['data-yyt-select-option'] ?? 'true',
            'data-value': option.value,
            role: optionAttributes.role ?? 'option',
            'aria-selected': isSelected ? 'true' : 'false',
            disabled: option.disabled ? true : optionAttributes.disabled
          });
          return `
            <button ${optionAttributeString}>
              <span class="${escapeHtml(mergeClassNames('yyt-option-text', optionTextClass))}">${escapeHtml(option.label)}</span>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function destroyEnhancedCustomSelects($container, namespace = 'yytCustomSelect') {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return;
  }

  const eventDocument = resolveCustomSelectEventDocument($container);
  const state = getCustomSelectPortalState(eventDocument);
  if (state.activeRoot && $container.has(state.activeRoot).length) {
    closeActiveCustomSelectDropdown(eventDocument);
  }

  $container.off(`.${namespace}`);
  $(eventDocument).off(`click.${namespace}`);
  $(eventDocument).off(`mousedown.${namespace}`);

  $container.find('[data-yyt-enhanced-select="true"]').remove();
  $container.find('.yyt-native-select-bridge').each((_, element) => {
    const $native = $(element);
    const originalStyle = $native.attr('data-yyt-original-style');
    if (originalStyle !== undefined) {
      if (originalStyle) {
        $native.attr('style', originalStyle);
      } else {
        $native.removeAttr('style');
      }
    } else {
      $native.removeAttr('style');
    }

    $native
      .removeClass('yyt-native-select-bridge')
      .removeAttr('data-yyt-original-style')
      .removeAttr('data-yyt-select-key')
      .removeData('yytCustomSelectOptions');
  });
}

export function enhanceNativeSelects($container, config = {}) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return;
  }

  const {
    namespace = 'yytCustomSelect',
    selectors = []
  } = config;
  const selectorList = Array.isArray(selectors) ? selectors.filter(Boolean) : [selectors].filter(Boolean);
  if (selectorList.length === 0) {
    return;
  }

  destroyEnhancedCustomSelects($container, namespace);

  const selector = selectorList.join(', ');
  const eventDocument = resolveCustomSelectEventDocument($container);

  $container.find(selector).each((index, element) => {
    const $native = $(element);
    const selectId = String($native.attr('id') || '').trim();
    const selectKey = selectId || `yyt-select-${Date.now()}-${index}`;
    const targetSelector = selectId ? `#${selectId}` : `[data-yyt-select-key="${selectKey}"]`;
    const dropdownId = `${selectKey}-dropdown`;
    const extraClasses = extractSelectClasses($native.attr('class'));
    const originalStyle = $native.attr('style');
    const options = $native.find('option').map((_, optionElement) => {
      const $option = $(optionElement);
      return {
        value: String($option.attr('value') ?? $option.val() ?? ''),
        label: $option.text(),
        disabled: $option.is(':disabled')
      };
    }).get();

    $native
      .attr('data-yyt-original-style', originalStyle ?? '')
      .attr('data-yyt-select-key', selectKey)
      .addClass('yyt-native-select-bridge')
      .css('display', 'none')
      .data('yytCustomSelectOptions', options);

    const customHtml = renderCustomSelectControl({
      includeNative: false,
      selectedValue: $native.val(),
      options,
      disabled: $native.is(':disabled'),
      placeholder: options[0]?.label || '请选择',
      rootAttributes: {
        class: mergeClassNames(extraClasses),
        style: originalStyle || undefined,
        'data-yyt-enhanced-select': 'true',
        'data-yyt-select-target': targetSelector
      },
      triggerAttributes: {
        id: `${selectKey}-trigger`,
        'aria-controls': dropdownId
      },
      dropdownAttributes: {
        id: dropdownId
      }
    });

    $native.after(customHtml);
    const $root = getCustomSelectRoot($container, $native);
    updateCustomSelectUi($container, $root, $native);
  });

  $container.on(`click.${namespace}`, '[data-yyt-select-trigger]', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const $trigger = $(event.currentTarget);
    if ($trigger.prop('disabled')) {
      return;
    }

    const $root = $trigger.closest('[data-yyt-custom-select]');
    toggleCustomSelectDropdown($root);
  });

  $container.on(`change.${namespace}`, selector, (event) => {
    const $native = $(event.currentTarget);
    const options = $native.find('option').map((_, optionElement) => {
      const $option = $(optionElement);
      return {
        value: String($option.attr('value') ?? $option.val() ?? ''),
        label: $option.text(),
        disabled: $option.is(':disabled')
      };
    }).get();
    $native.data('yytCustomSelectOptions', options);
    const $root = getCustomSelectRoot($container, $native);
    updateCustomSelectUi($container, $root, $native);
  });

  $(eventDocument).off(`click.${namespace}`).on(`click.${namespace}`, (event) => {
    if (isEventInsideCustomSelect(event.target, eventDocument)) {
      return;
    }

    const $roots = resolveCustomSelectRoots($container);
    if (!$roots?.length) {
      return;
    }

    closeActiveCustomSelectDropdown(eventDocument);
    $roots.filter('.yyt-open')
      .removeClass('yyt-open')
      .find('[data-yyt-select-trigger]')
      .attr('aria-expanded', 'false');
  });

  $(eventDocument).off(`mousedown.${namespace}`, '.yyt-select-portal-layer [data-yyt-select-option]')
    .on(`mousedown.${namespace}`, '.yyt-select-portal-layer [data-yyt-select-option]', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const $option = $(event.currentTarget);
      if ($option.prop('disabled')) {
        return;
      }

      const $root = resolveCustomSelectRootFromOption($container, $option);
      if (!$root?.length) {
        return;
      }

      const $native = resolveCustomSelectNative($container, $root);
      if (!$native?.length) {
        return;
      }

      const value = String($option.attr('data-value') || '');
      $native.val(value).trigger('change');
      updateCustomSelectUi($container, $root, $native);
      closeCustomSelectDropdown($root);
    });
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
      stream: false,
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
    stream: $container.find(`#${scriptId}-stream`).is(':checked'),
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
  $container.find(`#${scriptId}-stream`).prop('checked', config.stream === true);
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