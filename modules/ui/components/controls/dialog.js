/**
 * Prefab: dialog
 *
 * 通用对话框工具集合（纯原生 DOM，不依赖 jQuery）。
 * 复用 styles/main.css 中的 yyt-dialog-* 类。
 *
 * 用法：
 *   const ok = await dialog.confirm({ title: '删除？', message: '此操作不可撤销', danger: true });
 *   const name = await dialog.prompt({ title: '新建预设', placeholder: '预设名' });
 *   const inst = dialog.custom({
 *     title: '自定义',
 *     body: someDomNode,
 *     buttons: [
 *       { label: '取消', variant: 'ghost', onClick: (close) => close(null) },
 *       { label: '保存', variant: 'primary', onClick: (close, getResult) => close(getResult()) }
 *     ]
 *   });
 *   const result = await inst.result;
 */

import { el, appendChild } from './_internal.js';
import { logger } from '../../../core/logger-service.js';

const log = logger.createScope('Dialog');

let _dialogCounter = 0;

function getTargetDocument() {
  try {
    if (window.parent && window.parent !== window && window.parent.document) {
      return window.parent.document;
    }
  } catch (_) {}
  return document;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * 内部：组装 dialog DOM。返回 { overlay, body, footer, close, focusable }。
 */
function buildDialogShell({ title, width, wide }) {
  const id = `yyt-ctrl-dialog-${++_dialogCounter}`;
  const overlay = el('div', {
    className: 'yyt-dialog-overlay',
    attrs: { 'data-dialog-id': id }
  });

  const dialogStyle = {};
  if (width && width !== '380px') dialogStyle.width = width;
  dialogStyle.maxHeight = 'calc(100vh - 32px)';

  const dialog = el('div', {
    className: `yyt-dialog${wide ? ' yyt-dialog-wide' : ''}`,
    style: dialogStyle
  });

  const header = el('div', { className: 'yyt-dialog-header' });
  header.appendChild(el('span', { className: 'yyt-dialog-title', text: title || '' }));
  const closeBtn = el('button', {
    className: 'yyt-dialog-close',
    attrs: { type: 'button', 'aria-label': 'close' },
    html: '<i class="fa-solid fa-times"></i>'
  });
  header.appendChild(closeBtn);
  dialog.appendChild(header);

  const body = el('div', { className: 'yyt-dialog-body' });
  dialog.appendChild(body);

  const footer = el('div', { className: 'yyt-dialog-footer' });
  dialog.appendChild(footer);

  overlay.appendChild(dialog);

  return { overlay, body, footer, closeBtn, id };
}

function mount(overlay) {
  const targetDoc = getTargetDocument();
  if (!targetDoc?.body) return false;
  targetDoc.body.appendChild(overlay);
  return true;
}

function unmount(overlay) {
  if (overlay?.parentNode) {
    try { overlay.parentNode.removeChild(overlay); } catch (_) {}
  }
}

/**
 * confirm({ title, message, confirmText, cancelText, danger, width }) → Promise<boolean>
 */
export function confirm(options = {}) {
  const {
    title = '请确认',
    message = '',
    confirmText = '确定',
    cancelText = '取消',
    danger = false,
    width = '380px'
  } = options;

  return new Promise((resolve) => {
    const { overlay, body, footer, closeBtn } = buildDialogShell({ title, width, wide: false });
    const triggerEl = (getTargetDocument() || document).activeElement;

    const messageEl = el('div', {
      style: { color: 'var(--yyt-text-secondary)', fontSize: '13px', lineHeight: '1.6' },
      text: message
    });
    body.appendChild(messageEl);

    const cancelBtn = el('button', {
      className: 'yyt-btn yyt-btn-secondary',
      attrs: { type: 'button' },
      text: cancelText
    });
    const confirmBtn = el('button', {
      className: `yyt-btn ${danger ? 'yyt-btn-danger' : 'yyt-btn-primary'}`,
      attrs: { type: 'button' },
      text: confirmText
    });
    footer.appendChild(cancelBtn);
    footer.appendChild(confirmBtn);

    let resolved = false;
    const finish = (value) => {
      if (resolved) return;
      resolved = true;
      unmount(overlay);
      try { triggerEl?.focus(); } catch (_) {}
      resolve(value);
    };

    confirmBtn.addEventListener('click', () => finish(true));
    cancelBtn.addEventListener('click', () => finish(false));
    closeBtn.addEventListener('click', () => finish(false));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) finish(false); });
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); finish(false); }
      else if (e.key === 'Enter') { e.stopPropagation(); finish(true); }
    });

    if (!mount(overlay)) {
      resolve(false);
      return;
    }
    (danger ? cancelBtn : confirmBtn).focus();
  });
}

/**
 * prompt({ title, message, defaultValue, placeholder, confirmText, cancelText, validate, width })
 *   validate: (value) => string | null  返回 string 表示错误信息阻止提交；null 通过
 *   → Promise<string | null>
 */
export function prompt(options = {}) {
  const {
    title = '输入',
    message = '',
    defaultValue = '',
    placeholder = '',
    confirmText = '确定',
    cancelText = '取消',
    validate = null,
    width = '380px'
  } = options;

  return new Promise((resolve) => {
    const { overlay, body, footer, closeBtn } = buildDialogShell({ title, width, wide: false });
    const triggerEl = (getTargetDocument() || document).activeElement;

    if (message) {
      body.appendChild(el('div', {
        style: { color: 'var(--yyt-text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '8px' },
        text: message
      }));
    }
    const input = el('input', {
      className: 'yyt-input',
      attrs: { type: 'text', placeholder }
    });
    input.value = String(defaultValue || '');
    body.appendChild(input);

    const errEl = el('div', {
      style: { color: 'var(--yyt-danger, #f87171)', fontSize: '12px', marginTop: '6px', minHeight: '14px' }
    });
    body.appendChild(errEl);

    const cancelBtn = el('button', {
      className: 'yyt-btn yyt-btn-secondary',
      attrs: { type: 'button' },
      text: cancelText
    });
    const confirmBtn = el('button', {
      className: 'yyt-btn yyt-btn-primary',
      attrs: { type: 'button' },
      text: confirmText
    });
    footer.appendChild(cancelBtn);
    footer.appendChild(confirmBtn);

    let resolved = false;
    const finish = (value) => {
      if (resolved) return;
      resolved = true;
      unmount(overlay);
      try { triggerEl?.focus(); } catch (_) {}
      resolve(value);
    };

    const tryConfirm = () => {
      const val = input.value.trim();
      if (typeof validate === 'function') {
        const errMsg = validate(val);
        if (errMsg) {
          errEl.textContent = errMsg;
          input.focus();
          return;
        }
      }
      finish(val || null);
    };

    confirmBtn.addEventListener('click', tryConfirm);
    cancelBtn.addEventListener('click', () => finish(null));
    closeBtn.addEventListener('click', () => finish(null));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) finish(null); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.stopPropagation(); tryConfirm(); }
    });
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); finish(null); }
    });

    if (!mount(overlay)) {
      resolve(null);
      return;
    }
    input.focus();
    input.select();
  });
}

/**
 * custom({ title, body, buttons, width, wide, onMounted })
 *   body: DOM Node | control（{ el }）
 *   buttons: [{ label, variant, onClick: (close, getBody) => void }]
 *           其中 onClick 接收 close(result) 函数手动关闭并返回结果
 *   → { el, body, close, result: Promise<any> }
 */
export function custom(options = {}) {
  const {
    title = '',
    body: bodyContent = null,
    buttons = [],
    width = '480px',
    wide = false,
    onMounted = null
  } = options;

  const { overlay, body, footer, closeBtn } = buildDialogShell({ title, width, wide });
  const triggerEl = (getTargetDocument() || document).activeElement;
  if (bodyContent) appendChild(body, bodyContent);

  let resolved = false;
  let resolveFn;
  const result = new Promise((resolve) => { resolveFn = resolve; });

  const close = (value) => {
    if (resolved) return;
    resolved = true;
    unmount(overlay);
    try { triggerEl?.focus(); } catch (_) {}
    resolveFn(value);
  };

  for (const cfg of buttons) {
    const variantCls = cfg.variant === 'primary' ? 'yyt-btn-primary'
      : cfg.variant === 'danger' ? 'yyt-btn-danger'
      : 'yyt-btn-secondary';
    const btn = el('button', {
      className: `yyt-btn ${variantCls}`,
      attrs: { type: 'button' },
      text: cfg.label || ''
    });
    btn.addEventListener('click', () => {
      try {
        cfg.onClick?.(close, body);
      } catch (err) {
        log.error('button onClick error', err);
        close(null);
      }
    });
    footer.appendChild(btn);
  }

  closeBtn.addEventListener('click', () => close(null));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(null); });
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); close(null); }
  });

  if (!mount(overlay)) {
    resolveFn(null);
  } else if (typeof onMounted === 'function') {
    try { onMounted({ overlay, body, close }); } catch (_) {}
  }

  return { el: overlay, body, close, result };
}

export const dialog = { confirm, prompt, custom };
export default dialog;
