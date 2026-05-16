/**
 * Prefab: presetListItem
 *
 * listRow 的预设专用 thin wrapper：
 *   - active 状态点（左侧 dot）
 *   - meta chip 区（右侧 chip 信息，如 "3 规则" "已启用"）
 *   - builtin 标识（自动加灰底 chip + 禁用编辑）
 *   - readonly 标记（同 builtin，传 readonly: true 也生效）
 *
 * 用法：
 *   presetListItem({
 *     id: preset.id,
 *     name: preset.name,
 *     desc: preset.description,
 *     active: preset.id === currentId,
 *     builtin: preset.id.startsWith('builtin_'),
 *     metaChips: ['3 规则', '2 黑名单'],
 *     onClick: () => switchTo(preset.id),
 *     actions: [
 *       button({ label: '复制', size: 'small', variant: 'ghost' }),
 *       button({ label: '×', size: 'small', variant: 'ghost' })  // builtin 时自动隐藏
 *     ]
 *   })
 */

import { el, baseControl, appendChild } from './_internal.js';

export function presetListItem(options = {}) {
  const {
    id = null,
    name = '',
    desc = '',
    active = false,
    disabled = false,
    builtin = false,
    readonly = false,
    metaChips = [],
    actions = [],
    onClick = null
  } = options;

  const isReadonly = builtin || readonly;

  const classes = ['yyt-list-row', 'yyt-preset-list-item'];
  if (active) classes.push('yyt-list-row-active');
  if (disabled) classes.push('yyt-list-row-disabled');
  if (isReadonly) classes.push('yyt-preset-list-item-readonly');

  const row = el('div', {
    className: classes.join(' '),
    style: disabled ? { opacity: '0.5', pointerEvents: 'none' } : null
  });

  // active dot（左侧状态指示）
  const dot = el('span', {
    className: 'yyt-preset-dot',
    style: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      flexShrink: '0',
      marginRight: '8px',
      background: active ? 'var(--yyt-accent, #7bb7ff)' : 'transparent',
      border: active ? 'none' : '1px solid var(--yyt-border, rgba(255,255,255,0.15))',
      transition: 'background 0.15s ease'
    }
  });
  row.appendChild(dot);

  // main 区（name + desc）
  const mainCell = el('div', { className: 'yyt-list-row-main', style: { flex: '1', minWidth: '0' } });
  const nameRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } });
  const nameEl = el('div', {
    className: 'yyt-list-row-name',
    text: name,
    style: { fontWeight: '600' }
  });
  nameRow.appendChild(nameEl);
  if (builtin) {
    nameRow.appendChild(el('span', {
      className: 'yyt-preset-badge yyt-preset-badge-builtin',
      text: '内置',
      style: {
        fontSize: '10px',
        padding: '2px 6px',
        borderRadius: '999px',
        background: 'var(--yyt-surface-3, rgba(255,255,255,0.06))',
        color: 'var(--yyt-text-muted, rgba(255,255,255,0.5))',
        border: '1px solid var(--yyt-border, rgba(255,255,255,0.1))'
      }
    }));
  }
  mainCell.appendChild(nameRow);

  let descEl = null;
  if (desc) {
    descEl = el('div', { className: 'yyt-list-row-desc', text: desc });
    mainCell.appendChild(descEl);
  }
  row.appendChild(mainCell);

  // meta chips 区
  let metaCell = null;
  if (Array.isArray(metaChips) && metaChips.length) {
    metaCell = el('div', {
      className: 'yyt-preset-meta-chips',
      style: { display: 'flex', gap: '6px', flexWrap: 'wrap' }
    });
    for (const chip of metaChips) {
      if (!chip) continue;
      metaCell.appendChild(el('span', {
        className: 'yyt-preset-meta-chip',
        text: String(chip),
        style: {
          fontSize: '11px',
          padding: '2px 8px',
          borderRadius: '999px',
          background: 'var(--yyt-surface-2, rgba(255,255,255,0.04))',
          color: 'var(--yyt-text-secondary, rgba(255,255,255,0.6))',
          border: '1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))'
        }
      }));
    }
    row.appendChild(metaCell);
  }

  // actions 区
  let actionsCell = null;
  const visibleActions = isReadonly
    ? actions.filter((a) => a?._kind !== 'button' || !a._destructive)
    : actions;
  if (visibleActions && visibleActions.length) {
    actionsCell = el('div', { className: 'yyt-list-row-actions' });
    for (const action of visibleActions) appendChild(actionsCell, action);
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
    ...baseControl({ id, kind: 'presetListItem' }),
    el: row,
    _children: actions || [],
    setActive(v) {
      if (v) row.classList.add('yyt-list-row-active');
      else row.classList.remove('yyt-list-row-active');
      dot.style.background = v ? 'var(--yyt-accent, #7bb7ff)' : 'transparent';
      dot.style.border = v ? 'none' : '1px solid var(--yyt-border, rgba(255,255,255,0.15))';
    },
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

export default presetListItem;
