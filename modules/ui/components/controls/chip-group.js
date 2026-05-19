/**
 * Prefab: chipGroup
 *
 * 输入式标签组：用户输入文本，回车/逗号添加为 chip；点击 × 删除。
 * 支持 datalist suggestions（自动补全候选）。
 *
 * 用法：
 *   chipGroup({
 *     id: 'blacklist',
 *     values: ['敏感词1', '敏感词2'],
 *     placeholder: '输入后按回车',
 *     suggestions: ['suggestion1', 'suggestion2'],
 *     allowDuplicates: false,
 *     onChange: (values) => { ... }
 *   })
 *
 * 公开 API: get() / set([]) / addChip(v) / removeChip(v) / clear()
 */

import { el, baseControl } from './_internal.js';

let _chipCounter = 0;

export function chipGroup(options = {}) {
  const {
    id = null,
    values = [],
    placeholder = '输入后回车添加',
    suggestions = null,
    allowDuplicates = false,
    maxChips = 0,            // 0 = 不限
    chipVariant = 'default', // 'default' | 'soft' | 'danger'
    onChange = null,
    onAdd = null,
    onRemove = null
  } = options;

  const datalistId = suggestions && suggestions.length ? `yyt-chip-dl-${++_chipCounter}` : null;

  const wrapper = el('div', {
    className: 'yyt-chip-group',
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      padding: '6px 8px',
      borderRadius: 'var(--yyt-radius-sm, 6px)',
      border: '1px solid var(--yyt-control-border, rgba(255,255,255,0.08))',
      background: 'var(--yyt-control-bg, transparent)',
      minHeight: '36px',
      alignItems: 'center'
    }
  });

  let chipValues = [];

  const inputAttrs = {
    type: 'text',
    placeholder,
    autocomplete: 'off'
  };
  if (datalistId) inputAttrs.list = datalistId;

  const input = el('input', {
    className: 'yyt-chip-input',
    attrs: inputAttrs,
    style: {
      flex: '1 1 auto',
      minWidth: '120px',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'var(--yyt-text, inherit)',
      fontSize: '12px',
      padding: '4px 0'
    }
  });

  let datalist = null;
  if (datalistId) {
    datalist = el('datalist', { attrs: { id: datalistId } });
    for (const s of suggestions) {
      datalist.appendChild(el('option', { attrs: { value: String(s) } }));
    }
    wrapper.appendChild(datalist);
  }

  function chipBgColor() {
    if (chipVariant === 'danger') return 'rgba(248,113,113,0.12)';
    if (chipVariant === 'soft') return 'var(--yyt-surface-2, rgba(255,255,255,0.04))';
    return 'var(--yyt-accent-soft, rgba(123,183,255,0.15))';
  }
  function chipBorderColor() {
    if (chipVariant === 'danger') return 'rgba(248,113,113,0.25)';
    return 'var(--yyt-border, rgba(255,255,255,0.1))';
  }
  function chipTextColor() {
    if (chipVariant === 'danger') return '#f87171';
    return 'var(--yyt-text, inherit)';
  }

  function buildChipNode(value) {
    const chip = el('span', {
      className: 'yyt-chip',
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 4px 3px 10px',
        borderRadius: '999px',
        background: chipBgColor(),
        border: `1px solid ${chipBorderColor()}`,
        color: chipTextColor(),
        fontSize: '11px',
        fontWeight: '500'
      }
    });
    chip.appendChild(el('span', { text: value, style: { lineHeight: '1' } }));

    const removeBtn = el('button', {
      attrs: { type: 'button', 'aria-label': 'remove' },
      text: '×',
      style: {
        border: 'none',
        background: 'transparent',
        color: 'inherit',
        cursor: 'pointer',
        padding: '0 4px',
        fontSize: '14px',
        lineHeight: '1',
        opacity: '0.7'
      }
    });
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeChip(value);
    });
    removeBtn.addEventListener('mouseenter', () => { removeBtn.style.opacity = '1'; });
    removeBtn.addEventListener('mouseleave', () => { removeBtn.style.opacity = '0.7'; });
    chip.appendChild(removeBtn);
    return chip;
  }

  function rerenderChips() {
    // 移除 wrapper 内除了 input/datalist 之外的所有 chip
    const toRemove = [];
    for (const child of wrapper.children) {
      if (child === input || child === datalist) continue;
      toRemove.push(child);
    }
    for (const c of toRemove) wrapper.removeChild(c);

    // chip 插入到 input 之前
    for (const v of chipValues) {
      wrapper.insertBefore(buildChipNode(v), input);
    }
  }

  function addChip(rawValue) {
    const v = String(rawValue || '').trim();
    if (!v) return false;
    if (!allowDuplicates && chipValues.includes(v)) return false;
    if (maxChips > 0 && chipValues.length >= maxChips) return false;
    chipValues.push(v);
    rerenderChips();
    try { onAdd?.(v, chipValues.slice()); } catch (err) { console.error('[chipGroup] onAdd 异常', err); }
    try { onChange?.(chipValues.slice()); } catch (err) { console.error('[chipGroup] onChange 异常', err); }
    ctrl._emitter.emit('change', chipValues.slice());
    return true;
  }

  function removeChip(value) {
    const idx = chipValues.indexOf(value);
    if (idx < 0) return false;
    chipValues.splice(idx, 1);
    rerenderChips();
    try { onRemove?.(value, chipValues.slice()); } catch (err) { console.error('[chipGroup] onRemove 异常', err); }
    try { onChange?.(chipValues.slice()); } catch (err) { console.error('[chipGroup] onChange 异常', err); }
    ctrl._emitter.emit('change', chipValues.slice());
    return true;
  }

  function clear() {
    if (chipValues.length === 0) return;
    chipValues = [];
    rerenderChips();
    try { onChange?.([]); } catch (err) { console.error('[chipGroup] onChange 异常', err); }
    ctrl._emitter.emit('change', []);
  }

  // 初始值
  for (const v of values) {
    const s = String(v || '').trim();
    if (!s) continue;
    if (!allowDuplicates && chipValues.includes(s)) continue;
    chipValues.push(s);
  }

  wrapper.appendChild(input);
  rerenderChips();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = input.value.trim();
      if (val && addChip(val)) input.value = '';
    } else if (e.key === 'Backspace' && !input.value && chipValues.length) {
      removeChip(chipValues[chipValues.length - 1]);
    }
  });

  input.addEventListener('blur', () => {
    const val = input.value.trim();
    if (val && addChip(val)) input.value = '';
  });

  // 点击 wrapper 任意位置时聚焦 input
  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) input.focus();
  });

  const ctrl = {
    ...baseControl({ id, kind: 'chipGroup' }),
    el: wrapper,
    get() { return chipValues.slice(); },
    set(newValues) {
      chipValues = [];
      for (const v of (Array.isArray(newValues) ? newValues : [])) {
        const s = String(v || '').trim();
        if (!s) continue;
        if (!allowDuplicates && chipValues.includes(s)) continue;
        chipValues.push(s);
      }
      rerenderChips();
      try { onChange?.(chipValues.slice()); } catch (err) { console.error('[chipGroup] onChange 异常', err); }
      ctrl._emitter.emit('change', chipValues.slice());
    },
    addChip,
    removeChip,
    clear,
    setSuggestions(newSuggestions) {
      if (!datalist) return;
      while (datalist.firstChild) datalist.removeChild(datalist.firstChild);
      for (const s of (newSuggestions || [])) {
        datalist.appendChild(el('option', { attrs: { value: String(s) } }));
      }
    }
  };

  return ctrl;
}

export default chipGroup;
