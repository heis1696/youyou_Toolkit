/**
 * Prefab: textInput
 *
 * 用法:
 *   const nameInput = textInput({
 *     id: 'presetName',
 *     placeholder: '预设名',
 *     value: '默认',
 *     onChange: (v) => { ... }
 *   });
 *
 * 公开 API: get / set / setPlaceholder / setDisabled / focus / on('input'|'change'|'blur')
 */

import { el, baseControl } from './_internal.js';

export function textInput(options = {}) {
  const {
    id = null,
    placeholder = '',
    value = '',
    type = 'text',        // 'text' | 'password' | 'number' | 'email' | 'search'
    disabled = false,
    maxLength = null,
    onInput = null,
    onChange = null
  } = options;

  const node = el('input', {
    className: 'yyt-input',
    attrs: {
      type,
      placeholder,
      disabled: disabled ? 'disabled' : null,
      maxlength: maxLength != null ? String(maxLength) : null
    }
  });
  node.value = value == null ? '' : String(value);

  const ctrl = {
    ...baseControl({ id, kind: 'textInput' }),
    el: node,
    get() { return node.value; },
    set(v, { silent = false } = {}) {
      node.value = v == null ? '' : String(v);
      if (!silent) ctrl._emitter.emit('change', node.value);
    },
    setPlaceholder(p) { node.placeholder = p == null ? '' : String(p); },
    setDisabled(v) { node.disabled = !!v; },
    focus() { node.focus(); },
    select() { node.select(); }
  };

  node.addEventListener('input', () => {
    if (typeof onInput === 'function') {
      try { onInput(node.value, ctrl); } catch (_) {}
    }
    ctrl._emitter.emit('input', node.value);
  });
  node.addEventListener('change', () => {
    if (typeof onChange === 'function') {
      try { onChange(node.value, ctrl); } catch (_) {}
    }
    ctrl._emitter.emit('change', node.value);
  });
  node.addEventListener('blur', () => ctrl._emitter.emit('blur', node.value));

  return ctrl;
}

export default textInput;
