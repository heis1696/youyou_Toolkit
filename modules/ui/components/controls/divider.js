/**
 * Prefab: divider
 *
 * 用法:
 *   divider({ variant: 'hairline' })  // border-top hairline
 *   divider({ variant: 'dashed' })    // dashed divider
 *   divider({ variant: 'hairline', label: '提取配置' })  // 带文字标签
 */

import { el, baseControl } from './_internal.js';

export function divider(options = {}) {
  const {
    id = null,
    variant = 'hairline',  // 'hairline' | 'dashed'
    label = null,
    spacing = 'normal'     // 'normal' | 'tight' | 'loose'
  } = options;

  const margin = spacing === 'tight' ? '8px 0' : (spacing === 'loose' ? '20px 0' : '14px 0');

  if (label) {
    const wrap = el('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin
      }
    });
    const line1 = el('span', { style: { flex: '1', height: '0', borderTop: lineStyle(variant) } });
    const text = el('span', {
      text: label,
      style: { fontSize: '11px', color: 'var(--yyt-text-muted)', whiteSpace: 'nowrap' }
    });
    const line2 = el('span', { style: { flex: '1', height: '0', borderTop: lineStyle(variant) } });
    wrap.appendChild(line1);
    wrap.appendChild(text);
    wrap.appendChild(line2);

    return {
      ...baseControl({ id, kind: 'divider', el: wrap,
        style: options.style, className: options.className, attrs: options.attrs }),
      el: wrap,
      setLabel(t) { text.textContent = t == null ? '' : String(t); }
    };
  }

  const node = el('hr', {
    style: {
      border: 'none',
      borderTop: lineStyle(variant),
      margin,
      height: '0'
    }
  });

  return {
    ...baseControl({ id, kind: 'divider', el: node,
      style: options.style, className: options.className, attrs: options.attrs }),
    el: node
  };
}

function lineStyle(style) {
  if (style === 'dashed') return '1px dashed rgba(255,255,255,0.10)';
  return '1px solid var(--yyt-border)';
}

export default divider;
