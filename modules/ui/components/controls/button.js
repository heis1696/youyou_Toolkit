/**
 * Prefab: button
 *
 * 用法:
 *   const saveBtn = button({
 *     id: 'save',
 *     label: '保存',
 *     variant: 'primary',
 *     icon: '✓',
 *     onClick: (e, ctrl) => { ... }
 *   });
 *   panel.appendChild(saveBtn.el);
 *
 * 公开 API: setLabel / setDisabled / on('click', handler) / destroy
 */

import { el, baseControl } from './_internal.js';

export function button(options = {}) {
  const {
    id = null,
    label = '',
    icon = null,
    variant = 'default',  // 'default' | 'primary' | 'danger' | 'ghost'
    size = 'normal',      // 'normal' | 'small'
    disabled = false,
    title = null,
    onClick = null
  } = options;

  const classes = ['yyt-btn'];
  if (variant === 'primary') classes.push('yyt-btn-primary');
  else if (variant === 'danger') classes.push('yyt-btn-danger');
  else if (variant === 'ghost') classes.push('yyt-btn-secondary');
  if (size === 'small') classes.push('yyt-btn-small');

  const node = el('button', {
    className: classes.join(' '),
    attrs: {
      type: 'button',
      disabled: disabled ? 'disabled' : null,
      title
    }
  });

  let iconSpan = null;
  if (icon) {
    iconSpan = el('span', { className: 'yyt-btn-icon-glyph', text: icon });
    node.appendChild(iconSpan);
  }
  const labelSpan = el('span', { text: label });
  node.appendChild(labelSpan);

  const ctrl = {
    ...baseControl({ id, kind: 'button', el: node,
      style: options.style, className: options.className, attrs: options.attrs }),
    el: node,
    setLabel(newLabel) { labelSpan.textContent = String(newLabel || ''); },
    setIcon(newIcon) {
      if (iconSpan) iconSpan.textContent = String(newIcon || '');
    },
    setDisabled(value) {
      if (value) node.setAttribute('disabled', 'disabled');
      else node.removeAttribute('disabled');
    },
    isDisabled() { return node.hasAttribute('disabled'); },
    get() { return labelSpan.textContent; },
    set(newLabel) { this.setLabel(newLabel); }
  };

  node.addEventListener('click', (e) => {
    if (node.hasAttribute('disabled')) return;
    if (typeof onClick === 'function') {
      try { onClick(e, ctrl); } catch (err) { console.error('[button] onClick 异常', err); }
    }
    ctrl._emitter.emit('click', e);
  });

  return ctrl;
}

export default button;
