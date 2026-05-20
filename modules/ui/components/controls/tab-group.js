/**
 * Prefab: tabGroup (分段标签切换)
 *
 * 用法:
 *   tabGroup({
 *     id: 'settingsTabs',
 *     items: [
 *       { id: 'executor', label: '执行器', icon: '⚙' },
 *       { id: 'debug',    label: '调试',   icon: '🐛' }
 *     ],
 *     value: 'executor',
 *     onChange: (tabId) => { ... }
 *   })
 *
 * 公开 API: get / set / on('change') / setItemVisible
 */

import { el, baseControl } from './_internal.js';

export function tabGroup(options = {}) {
  const {
    id = null,
    items: rawItems = [],
    value = '',
    onChange = null
  } = options;

  const items = rawItems.map(item => ({
    ...item,
    _visible: true
  }));

  const container = el('div', {
    className: 'yyt-tab-group'
  });

  const btnMap = new Map();
  for (const item of items) {
    const btnClasses = ['yyt-tab-group-item'];
    if (item.id === value) btnClasses.push('yyt-active');

    const attrs = { type: 'button' };
    if (item.id === value) attrs['aria-pressed'] = 'true';

    const btn = el('button', { className: btnClasses.join(' '), attrs });
    if (item.icon) {
      btn.appendChild(el('i', { className: item.icon }));
      btn.appendChild(document.createTextNode(' '));
    }
    btn.appendChild(el('span', { text: item.label }));
    container.appendChild(btn);

    btnMap.set(item.id, btn);

    btn.addEventListener('click', () => {
      ctrl.set(item.id);
    });
  }

  function updateActive(newId) {
    for (const [itemId, btn] of btnMap) {
      const isActive = itemId === newId;
      btn.classList.toggle('yyt-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    }
  }

  const ctrl = {
    ...baseControl({ id, kind: 'tabGroup', el: container,
      style: options.style, className: options.className, attrs: options.attrs }),
    el: container,
    get() {
      for (const [itemId, btn] of btnMap) {
        if (btn.classList.contains('yyt-active') && items.find(i => i.id === itemId)?._visible !== false) {
          return itemId;
        }
      }
      return '';
    },
    set(newId, { silent = false } = {}) {
      updateActive(newId);
      if (!silent) {
        if (typeof onChange === 'function') {
          try { onChange(newId, ctrl); } catch (err) { console.error('[tabGroup] onChange 异常', err); }
        }
        ctrl._emitter.emit('change', newId);
      }
    },
    setItemVisible(itemId, visible) {
      const item = items.find(i => i.id === itemId);
      if (!item) return;
      item._visible = !!visible;
      const btn = btnMap.get(itemId);
      if (btn) btn.style.display = visible ? '' : 'none';
    }
  };

  return ctrl;
}

export default tabGroup;
