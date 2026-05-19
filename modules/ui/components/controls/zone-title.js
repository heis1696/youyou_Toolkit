/**
 * Prefab: zoneTitle
 *
 * 区块副标题，常用于把 flow-section 内部分成更细的小区域（如"提示词模板" / "提取配置"）。
 *
 * 用法:
 *   zoneTitle({ title: '提取配置', desc: '决定如何从 AI 回复中抽取内容' })
 */

import { el, baseControl } from './_internal.js';

export function zoneTitle(options = {}) {
  const {
    id = null,
    title = '',
    desc = ''
  } = options;

  const wrap = el('div', {
    style: {
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    }
  });

  const titleEl = el('div', {
    text: title,
    style: {
      fontSize: '12px',
      fontWeight: '700',
      color: 'var(--yyt-text)',
      letterSpacing: '0.2px'
    }
  });
  wrap.appendChild(titleEl);

  let descEl = null;
  if (desc) {
    descEl = el('div', {
      text: desc,
      style: {
        fontSize: '11px',
        color: 'var(--yyt-text-muted)',
        lineHeight: '1.6'
      }
    });
    wrap.appendChild(descEl);
  }

  return {
    ...baseControl({ id, kind: 'zoneTitle', el: wrap,
      style: options.style, className: options.className, attrs: options.attrs }),
    el: wrap,
    setTitle(t) { titleEl.textContent = t == null ? '' : String(t); },
    setDesc(d) {
      if (descEl) descEl.textContent = d == null ? '' : String(d);
    }
  };
}

export default zoneTitle;
