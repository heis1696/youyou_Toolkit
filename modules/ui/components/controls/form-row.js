/**
 * Prefab: formRow (容器 — 标签 + 控件 + hint)
 *
 * 用法:
 *   formRow({
 *     id: 'nameRow',
 *     label: '预设名',
 *     hint: '便于辨识',
 *     control: textInput({ id: 'presetName', placeholder: '...' })
 *   })
 *
 * getControl('presetName') 会沿 _children 找到内嵌的 textInput。
 * 容器自身的 get/set 透传到内嵌控件（如果有的话）。
 */

import { el, baseControl, appendChild } from './_internal.js';

export function formRow(options = {}) {
  const {
    id = null,
    label = '',
    hint = '',
    control = null,
    inline = false        // inline=true 时 label 和 control 同行
  } = options;

  const wrap = el('div', {
    className: 'yyt-form-group',
    style: inline
      ? { flexDirection: 'row', alignItems: 'center', gap: '12px' }
      : null
  });

  if (label) {
    wrap.appendChild(el('label', {
      text: label,
      style: inline ? { flex: '0 0 auto', minWidth: '120px' } : null
    }));
  }

  const slot = el('div', {
    style: inline ? { flex: '1', minWidth: '0' } : null
  });
  if (control) appendChild(slot, control);
  wrap.appendChild(slot);

  if (hint) {
    wrap.appendChild(el('div', { className: 'yyt-form-hint', text: hint }));
  }

  const childArr = control ? [control] : [];

  return {
    ...baseControl({ id, kind: 'formRow', el: wrap,
      style: options.style, className: options.className, attrs: options.attrs }),
    el: wrap,
    _children: childArr,
    get() { return control?.get?.(); },
    set(v, opts) { control?.set?.(v, opts); },
    /**
     * 替换内嵌控件
     */
    setControl(newControl) {
      slot.innerHTML = '';
      childArr.length = 0;
      if (newControl) {
        appendChild(slot, newControl);
        childArr.push(newControl);
      }
    }
  };
}

export default formRow;
