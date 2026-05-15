/**
 * Prefab: divider
 *
 * 用法:
 *   divider({ style: 'hairline' })  // border-top hairline
 *   divider({ style: 'dashed' })    // dashed divider
 *   divider({ style: 'hairline', label: '提取配置' })  // 带文字标签
 */

import { el, baseControl } from './_internal.js';

export function divider(options = {}) {
  const {
    id = null,
    style = 'hairline',     // 'hairline' | 'dashed'
    label = null,
    spacing = 'normal'      // 'normal' | 'tight' | 'loose'
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
    const line1 = el('span', { style: { flex: '1', height: '0', borderTop: lineStyle(style) } });
    const text = el('span', {
      text: label,
      style: { fontSize: '11px', color: 'var(--yyt-text-muted)', whiteSpace: 'nowrap' }
    });
    const line2 = el('span', { style: { flex: '1', height: '0', borderTop: lineStyle(style) } });
    wrap.appendChild(line1);
    wrap.appendChild(text);
    wrap.appendChild(line2);

    return {
      ...baseControl({ id, kind: 'divider' }),
      el: wrap,
      setLabel(t) { text.textContent = t == null ? '' : String(t); }
    };
  }

  const node = el('hr', {
    style: {
      border: 'none',
      borderTop: lineStyle(style),
      margin,
      height: '0'
    }
  });

  return {
    ...baseControl({ id, kind: 'divider' }),
    el: node
  };
}

function lineStyle(style) {
  if (style === 'dashed') return '1px dashed rgba(255,255,255,0.10)';
  return '1px solid var(--yyt-border)';
}

export default divider;
