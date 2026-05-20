/**
 * Prefab: flowSection (容器 — 标题 + 操作区 + 内容数组)
 *
 * 顶层分区，最常用的容器。
 *
 * 用法:
 *   flowSection({
 *     id: 'basic',
 *     heading: '基本信息',
 *     icon: 'ⓘ',
 *     actions: [
 *       button({ label: '+ 新建', size: 'small' })
 *     ],
 *     content: [
 *       formRow({ id: 'nameRow', label: '预设名', control: textInput({ id: 'name' }) }),
 *       formRow({ id: 'descRow', label: '描述', control: textInput({ id: 'desc' }) })
 *     ]
 *   })
 *
 * panel.getControl('name') 会沿 _children 链找到内嵌的 textInput。
 *
 * 公开 API: appendContent / clearContent / setHeading / getControl(id)
 */

import { el, baseControl, appendChild } from './_internal.js';

export function flowSection(options = {}) {
  const {
    id = null,
    heading = '',
    icon = null,
    actions = [],
    content = []
  } = options;

  const section = el('div', { className: 'yyt-flow-section' });

  let headingEl = null;
  let iconEl = null;
  let actionsEl = null;
  if (heading || icon || (actions && actions.length)) {
    headingEl = el('div', { className: 'yyt-flow-heading' });
    if (icon) {
      iconEl = el('span', { className: 'yyt-flow-heading-icon' });
      appendChild(iconEl, icon);
      headingEl.appendChild(iconEl);
    }
    if (heading) {
      headingEl.appendChild(el('span', { text: heading }));
    }
    if (actions && actions.length) {
      actionsEl = el('div', { className: 'yyt-flow-heading-action' });
      for (const a of actions) appendChild(actionsEl, a);
      headingEl.appendChild(actionsEl);
    }
    section.appendChild(headingEl);
  }

  const contentEl = el('div', { className: 'yyt-flow-content' });
  const childArr = [];
  for (const c of content || []) {
    if (!c) continue;
    appendChild(contentEl, c);
    childArr.push(c);
  }
  // 把 actions 也作为 children 注册（便于 getControl 找到它们里的子控件）
  for (const a of actions || []) {
    if (a && typeof a === 'object' && a.el) childArr.push(a);
  }
  section.appendChild(contentEl);

  const ctrl = {
    ...baseControl({ id, kind: 'flowSection', el: section,
      style: options.style, className: options.className, attrs: options.attrs }),
    el: section,
    _children: childArr,
    appendContent(child) {
      if (!child) return;
      appendChild(contentEl, child);
      if (child && typeof child === 'object' && child.el) childArr.push(child);
    },
    clearContent() {
      contentEl.innerHTML = '';
      // 只清非 actions 的 children
      const keep = childArr.filter((c) => (actions || []).includes(c));
      childArr.length = 0;
      for (const a of keep) childArr.push(a);
    },
    setHeading(text) {
      if (!headingEl) return;
      const span = headingEl.querySelector('span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)');
      if (span) span.textContent = text == null ? '' : String(text);
    },
    setIcon(text) {
      if (iconEl) iconEl.textContent = text == null ? '' : String(text);
    }
  };

  return ctrl;
}

export default flowSection;
