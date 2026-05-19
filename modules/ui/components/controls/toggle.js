/**
 * Prefab: toggle (开关，含标签+hint+slider 的整行)
 *
 * 用法:
 *   const t = toggle({
 *     id: 'includeDisabled',
 *     label: '包含禁用词条',
 *     hint: '开启后被禁用的词条可强制注入',
 *     checked: false,
 *     onChange: (v) => { ... }
 *   });
 *
 * 公开 API: get / set / setDisabled / on('change')
 *
 * 复用样式 .yyt-toggle-row / .yyt-toggle-label / .yyt-toggle / .yyt-toggle-slider
 */

import { el, baseControl } from './_internal.js';

export function toggle(options = {}) {
  const {
    id = null,
    label = '',
    hint = '',
    checked = false,
    disabled = false,
    onChange = null
  } = options;

  const labelBlock = el('label', { className: 'yyt-toggle-label' });
  if (label) labelBlock.appendChild(el('span', { text: label }));
  if (hint) labelBlock.appendChild(el('span', { className: 'yyt-toggle-hint', text: hint }));

  const input = el('input', { attrs: { type: 'checkbox', disabled: disabled ? 'disabled' : null } });
  input.checked = !!checked;
  const slider = el('span', { className: 'yyt-toggle-slider' });
  const switchEl = el('label', { className: 'yyt-toggle' });
  switchEl.appendChild(input);
  switchEl.appendChild(slider);

  const row = el('div', { className: 'yyt-toggle-row' });
  row.appendChild(labelBlock);
  row.appendChild(switchEl);

  // 点击标签也能切换（label[for] 没用，因为没绑 id，只能 JS 桥）
  labelBlock.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.disabled) return;
    input.checked = !input.checked;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  const ctrl = {
    ...baseControl({ id, kind: 'toggle' }),
    el: row,
    get() { return !!input.checked; },
    set(v, { silent = false } = {}) {
      input.checked = !!v;
      if (!silent) ctrl._emitter.emit('change', !!v);
    },
    setDisabled(v) { input.disabled = !!v; }
  };

  input.addEventListener('change', () => {
    const v = !!input.checked;
    if (typeof onChange === 'function') {
      try { onChange(v, ctrl); } catch (err) { console.error('[toggle] onChange 异常', err); }
    }
    ctrl._emitter.emit('change', v);
  });

  return ctrl;
}

export default toggle;
