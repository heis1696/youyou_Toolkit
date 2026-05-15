/**
 * Prefab: listRow
 *
 * border-top hairline 风格的列表行（list-table 内单行）。
 *
 * 用法:
 *   listRow({
 *     icon: '⎘',          // 可选小图标
 *     name: '预设名',
 *     desc: '附属说明',
 *     active: false,
 *     onClick: () => {...},
 *     actions: [
 *       button({ label: '复制', size: 'small', variant: 'ghost' }),
 *       button({ label: '×', size: 'small', variant: 'ghost' })
 *     ]
 *   })
 */

import { el, baseControl, appendChild } from './_internal.js';

export function listRow(options = {}) {
  const {
    id = null,
    icon = null,
    name = '',
    desc = '',
    active = false,
    disabled = false,
    actions = [],
    onClick = null
  } = options;

  const classes = ['yyt-list-row'];
  if (active) classes.push('yyt-list-row-active');
  if (disabled) classes.push('yyt-list-row-disabled');

  const row = el('div', {
    className: classes.join(' '),
    style: disabled ? { opacity: '0.5', pointerEvents: 'none' } : null
  });

  if (icon) {
    row.appendChild(el('div', { className: 'yyt-list-row-icon', text: icon }));
  }

  const mainCell = el('div', { className: 'yyt-list-row-main' });
  const nameEl = el('div', { className: 'yyt-list-row-name', text: name });
  mainCell.appendChild(nameEl);
  let descEl = null;
  if (desc) {
    descEl = el('div', { className: 'yyt-list-row-desc', text: desc });
    mainCell.appendChild(descEl);
  }
  row.appendChild(mainCell);

  let actionsCell = null;
  if (actions && actions.length) {
    actionsCell = el('div', { className: 'yyt-list-row-actions' });
    for (const action of actions) appendChild(actionsCell, action);
    row.appendChild(actionsCell);
  }

  if (typeof onClick === 'function') {
    row.style.cursor = 'pointer';
    row.addEventListener('click', (e) => {
      if (e.target.closest('.yyt-list-row-actions')) return;
      onClick(e, ctrl);
      ctrl._emitter.emit('click', e);
    });
  }

  const ctrl = {
    ...baseControl({ id, kind: 'listRow' }),
    el: row,
    _children: actions || [],
    setName(v) { nameEl.textContent = v == null ? '' : String(v); },
    setDesc(v) {
      if (!descEl) {
        if (!v) return;
        descEl = el('div', { className: 'yyt-list-row-desc', text: v });
        mainCell.appendChild(descEl);
      } else {
        descEl.textContent = v == null ? '' : String(v);
      }
    },
    setActive(v) {
      if (v) row.classList.add('yyt-list-row-active');
      else row.classList.remove('yyt-list-row-active');
    },
    setDisabled(v) {
      if (v) {
        row.classList.add('yyt-list-row-disabled');
        row.style.opacity = '0.5';
        row.style.pointerEvents = 'none';
      } else {
        row.classList.remove('yyt-list-row-disabled');
        row.style.opacity = '';
        row.style.pointerEvents = '';
      }
    }
  };

  return ctrl;
}

export default listRow;
