/**
 * Prefab: toolbar
 *
 * 水平按钮组，用作面板 footer / 顶部 actions 区。
 * 自动处理子元素间距和右对齐选项。
 *
 * 用法：
 *   toolbar({
 *     items: [
 *       button({ label: '导入', icon: '⬆', onClick: ... }),
 *       button({ label: '导出', icon: '⬇', onClick: ... }),
 *       button({ label: '清空', variant: 'danger', onClick: ... })
 *     ],
 *     align: 'end',  // 'start' | 'end' | 'space-between'
 *     gap: '8px'
 *   })
 */

import { el, baseControl, appendChild } from './_internal.js';

export function toolbar(options = {}) {
  const {
    id = null,
    items = [],
    align = 'start',     // 'start' | 'end' | 'space-between' | 'center'
    gap = '8px',
    wrap = true
  } = options;

  const justifyMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-between': 'space-between'
  };

  const node = el('div', {
    className: 'yyt-toolbar',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: justifyMap[align] || 'flex-start',
      gap,
      flexWrap: wrap ? 'wrap' : 'nowrap'
    }
  });

  const children = [];
  for (const item of items) {
    if (!item) continue;
    appendChild(node, item);
    children.push(item);
  }

  return {
    ...baseControl({ id, kind: 'toolbar', el: node,
      style: options.style, className: options.className, attrs: options.attrs }),
    el: node,
    _children: children,
    addItem(item) {
      if (!item) return;
      appendChild(node, item);
      children.push(item);
    },
    clear() {
      while (node.firstChild) node.removeChild(node.firstChild);
      for (const c of children) {
        try { c?.destroy?.(); } catch (_) {}
      }
      children.length = 0;
    }
  };
}

export default toolbar;
