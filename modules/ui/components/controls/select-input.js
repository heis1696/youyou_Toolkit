/**
 * Prefab: selectInput (原生 <select>，复杂下拉日后再做)
 *
 * 用法:
 *   const sel = selectInput({
 *     id: 'mode',
 *     options: [
 *       { value: 'character_card', label: '跟随角色卡' },
 *       { value: 'custom', label: '自定义' }
 *     ],
 *     value: 'character_card',
 *     onChange: (v) => { ... }
 *   });
 *
 * 公开 API: get / set / setOptions / setDisabled / on('change')
 */

import { el, baseControl } from './_internal.js';

export function selectInput(options = {}) {
  const {
    id = null,
    options: items = [],
    value = '',
    placeholder = null,
    disabled = false,
    onChange = null
  } = options;

  const node = el('select', {
    className: 'yyt-select',
    attrs: { disabled: disabled ? 'disabled' : null }
  });

  function buildOptions(opts, currentValue) {
    node.innerHTML = '';
    if (placeholder !== null) {
      const phOpt = el('option', {
        text: placeholder,
        attrs: { value: '', disabled: 'disabled', selected: currentValue ? null : 'selected' }
      });
      node.appendChild(phOpt);
    }
    for (const item of opts) {
      const optEl = el('option', {
        text: item.label ?? String(item.value),
        attrs: {
          value: String(item.value),
          selected: String(item.value) === String(currentValue) ? 'selected' : null,
          disabled: item.disabled ? 'disabled' : null
        }
      });
      node.appendChild(optEl);
    }
  }
  buildOptions(items, value);

  const ctrl = {
    ...baseControl({ id, kind: 'select' }),
    el: node,
    get() { return node.value; },
    set(v, { silent = false } = {}) {
      node.value = v == null ? '' : String(v);
      if (!silent) ctrl._emitter.emit('change', node.value);
    },
    setOptions(newOptions, newValue) {
      buildOptions(newOptions || [], newValue != null ? newValue : node.value);
    },
    setDisabled(v) { node.disabled = !!v; }
  };

  node.addEventListener('change', () => {
    if (typeof onChange === 'function') {
      try { onChange(node.value, ctrl); } catch (err) {
        // 不再静默吞异常：日志输出便于排查（曾因此遮蔽 showToast 参数反向导致整个 onChange 中断）
        if (typeof console !== 'undefined' && console.error) {
          console.error('[selectInput] onChange 异常', err);
        }
      }
    }
    ctrl._emitter.emit('change', node.value);
  });

  return ctrl;
}

export default selectInput;
