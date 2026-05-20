/**
 * YouYou Toolkit - Floating Ball Registry & Item Renderers
 * @description 项注册表 + Promise mutex 串行化 onClick + 5 种内置渲染器
 *              kind: toggle | button | slider | labelValue | custom
 */

import { escapeHtml } from './floating-ball-menu.js';

/**
 * 创建项注册表
 *
 * @param {Object} deps
 * @param {Function} deps.onChange   () => void  注册表变化时触发（菜单需要重新渲染）
 * @param {Function} deps.onRefresh  (id: string) => void  单项状态刷新请求（仅修改 DOM，不重渲）
 * @returns {Object}
 */
export function createItemRegistry({ onChange, onRefresh }) {
  /** @type {Map<string, Object>} */
  const items = new Map();

  function _emitChange() {
    if (typeof onChange === 'function') {
      try { onChange(); } catch (_) {}
    }
  }

  function _emitRefresh(id) {
    if (typeof onRefresh === 'function') {
      try { onRefresh(id); } catch (_) {}
    }
  }

  function validate(item) {
    if (!item || typeof item !== 'object') return '项必须是对象';
    if (!item.id || typeof item.id !== 'string') return '项必须包含字符串 id';
    if (!item.label || typeof item.label !== 'string') return '项必须包含字符串 label';
    if (item.kind && !['toggle', 'button', 'slider', 'labelValue', 'custom'].includes(item.kind)) {
      return `未知 kind: ${item.kind}`;
    }
    if (item.kind === 'custom' && typeof item.render !== 'function') {
      return 'kind=custom 必须提供 render 函数';
    }
    return null;
  }

  function registerItem(item) {
    const err = validate(item);
    if (err) {
      throw new Error(`[FloatingBall] registerItem 失败: ${err}`);
    }
    if (items.has(item.id)) {
      // 已存在 → 等同 update 语义
      const prev = items.get(item.id);
      if (typeof prev.destroy === 'function') {
        try { prev.destroy(); } catch (_) {}
      }
    }
    items.set(item.id, { kind: 'toggle', order: 100, ...item });
    _emitChange();
    return () => unregisterItem(item.id);
  }

  function unregisterItem(id) {
    const prev = items.get(id);
    if (!prev) return false;
    if (typeof prev.destroy === 'function') {
      try { prev.destroy(); } catch (_) {}
    }
    items.delete(id);
    _emitChange();
    return true;
  }

  function updateItem(id, partial) {
    const prev = items.get(id);
    if (!prev) return false;
    items.set(id, { ...prev, ...partial });
    _emitChange();
    return true;
  }

  function refresh(id) {
    if (id === undefined) {
      for (const k of items.keys()) _emitRefresh(k);
    } else {
      _emitRefresh(id);
    }
  }

  function getAll() {
    return Array.from(items.values());
  }

  function getItem(id) {
    return items.get(id) || null;
  }

  function destroyAll() {
    for (const item of items.values()) {
      if (typeof item.destroy === 'function') {
        try { item.destroy(); } catch (_) {}
      }
    }
    items.clear();
  }

  return {
    registerItem,
    unregisterItem,
    updateItem,
    refresh,
    getAll,
    getItem,
    destroyAll,
  };
}

/**
 * 创建 Promise 链 Mutex —— 串行化 onClick 调用
 * 借自 dash-deck enqueueUpdate 模式
 */
export function createMutex() {
  let chain = Promise.resolve();

  function run(task) {
    chain = chain.catch(() => {}).then(async () => {
      return await task();
    });
    return chain;
  }

  return { run };
}

/**
 * 渲染单项为 HTMLElement
 *
 * @param {Document} doc
 * @param {Object} item
 * @param {Object} ctxBase  渲染上下文（不包含 item，由本函数补全）
 * @returns {{ el: HTMLElement, sync: () => void }}
 *   el  — DOM 节点
 *   sync — 重新拉取 getState/badge 并更新 DOM（不重建节点）
 */
export function renderItem(doc, item, ctxBase) {
  const ctx = { ...ctxBase, item };

  switch (item.kind) {
    case 'button': return renderButton(doc, item, ctx);
    case 'slider': return renderSlider(doc, item, ctx);
    case 'labelValue': return renderLabelValue(doc, item, ctx);
    case 'custom': return renderCustom(doc, item, ctx);
    case 'toggle':
    default:
      return renderToggle(doc, item, ctx);
  }
}

function renderToggle(doc, item, ctx) {
  const node = doc.createElement('div');
  node.className = 'fab-item fab-item-toggle';
  node.setAttribute('data-id', item.id);
  if (item.radioGroup) node.setAttribute('data-radio-group', item.radioGroup);
  node.innerHTML = `
    <div class="fab-item-label">${escapeHtml(item.label)}</div>
    <div class="fab-item-suffix">
      <span class="fab-badge" style="display:none;"></span>
      <span class="fab-led"></span>
    </div>
  `;

  const ledEl = node.querySelector('.fab-led');
  const labelEl = node.querySelector('.fab-item-label');
  const badgeEl = node.querySelector('.fab-badge');

  function sync() {
    let state = 'off';
    if (typeof item.getState === 'function') {
      try { state = item.getState() || 'off'; } catch (_) { state = 'off'; }
    }
    node.classList.toggle('is-on', state === 'on');
    node.classList.toggle('is-missing', state === 'missing');
    syncBadge(item, badgeEl);
  }

  node.addEventListener('click', (e) => {
    if (node.classList.contains('is-disabled')) return;
    e.stopPropagation();
    if (typeof item.onClick === 'function') {
      ctx.mutex.run(async () => {
        try {
          await item.onClick(ctx);
        } catch (err) {
          ctx.logger?.error?.(`项 ${item.id} onClick 异常: ${err?.message || err}`, err);
        } finally {
          sync();
        }
      });
    } else {
      ctx.logger?.warn?.(`toggle 项 ${item.id} 未提供 onClick`);
    }
  });

  sync();
  return { el: node, sync };
}

function renderButton(doc, item, ctx) {
  const node = doc.createElement('div');
  node.className = 'fab-item fab-item-button';
  node.setAttribute('data-id', item.id);
  node.innerHTML = `
    <div class="fab-item-label">${escapeHtml(item.label)}</div>
    <div class="fab-item-suffix">
      <span class="fab-badge" style="display:none;"></span>
    </div>
  `;
  const badgeEl = node.querySelector('.fab-badge');

  function sync() {
    syncBadge(item, badgeEl);
  }

  node.addEventListener('click', (e) => {
    if (node.classList.contains('is-disabled')) return;
    e.stopPropagation();
    if (typeof item.onClick === 'function') {
      ctx.mutex.run(async () => {
        try {
          await item.onClick(ctx);
        } catch (err) {
          ctx.logger?.error?.(`项 ${item.id} onClick 异常: ${err?.message || err}`, err);
        }
      });
    }
  });

  sync();
  return { el: node, sync };
}

function renderSlider(doc, item, ctx) {
  const node = doc.createElement('div');
  node.className = 'fab-item-slider';
  node.setAttribute('data-id', item.id);

  const min = Number.isFinite(item.min) ? item.min : 0;
  const max = Number.isFinite(item.max) ? item.max : 100;
  const step = Number.isFinite(item.step) ? item.step : 1;

  function readValue() {
    if (typeof item.value === 'function') {
      try { return Number(item.value()); } catch (_) { return min; }
    }
    return Number.isFinite(item.value) ? Number(item.value) : min;
  }

  node.innerHTML = `
    <div class="fab-slider-row">
      <span>${escapeHtml(item.label)}</span>
      <span class="fab-slider-value">${readValue()}</span>
    </div>
    <input type="range" min="${min}" max="${max}" step="${step}" value="${readValue()}"/>
  `;

  const valueEl = node.querySelector('.fab-slider-value');
  const inputEl = node.querySelector('input[type="range"]');

  inputEl.addEventListener('input', (e) => {
    const v = Number(e.target.value);
    valueEl.textContent = String(v);
    if (typeof item.onChange === 'function') {
      ctx.mutex.run(async () => {
        try {
          await item.onChange({ ...ctx, value: v });
        } catch (err) {
          ctx.logger?.error?.(`项 ${item.id} onChange 异常: ${err?.message || err}`, err);
        }
      });
    }
  });

  function sync() {
    const v = readValue();
    inputEl.value = String(v);
    valueEl.textContent = String(v);
  }

  return { el: node, sync };
}

function renderLabelValue(doc, item, ctx) {
  const node = doc.createElement('div');
  node.className = 'fab-item fab-item-label-value';
  node.setAttribute('data-id', item.id);
  node.innerHTML = `
    <div class="fab-item-label">${escapeHtml(item.label)}</div>
    <div class="fab-item-suffix">
      <span class="fab-item-value"></span>
      <span class="fab-badge" style="display:none;"></span>
    </div>
  `;
  const valueEl = node.querySelector('.fab-item-value');
  const badgeEl = node.querySelector('.fab-badge');

  function sync() {
    let v = '';
    if (typeof item.value === 'function') {
      try { v = item.value(); } catch (_) { v = ''; }
    } else if (item.value !== undefined) {
      v = item.value;
    }
    valueEl.textContent = String(v ?? '');
    syncBadge(item, badgeEl);
  }

  if (typeof item.onClick === 'function') {
    node.style.cursor = 'pointer';
    node.addEventListener('click', (e) => {
      if (node.classList.contains('is-disabled')) return;
      e.stopPropagation();
      ctx.mutex.run(async () => {
        try {
          await item.onClick(ctx);
        } catch (err) {
          ctx.logger?.error?.(`项 ${item.id} onClick 异常: ${err?.message || err}`, err);
        } finally {
          sync();
        }
      });
    });
  } else {
    node.style.cursor = 'default';
  }

  sync();
  return { el: node, sync };
}

function renderCustom(doc, item, ctx) {
  const wrap = doc.createElement('div');
  wrap.className = 'fab-custom-wrap';
  wrap.setAttribute('data-id', item.id);

  let renderedNode = null;
  try {
    renderedNode = item.render(ctx);
  } catch (err) {
    ctx.logger?.error?.(`custom 项 ${item.id} render 异常: ${err?.message || err}`, err);
    renderedNode = doc.createTextNode(`[渲染失败: ${item.id}]`);
  }

  if (renderedNode instanceof Node) {
    wrap.appendChild(renderedNode);
  } else if (renderedNode != null) {
    wrap.innerHTML = String(renderedNode);
  }

  function sync() {
    if (typeof item.onSync === 'function') {
      try { item.onSync({ ...ctx, container: wrap }); } catch (_) {}
    }
  }

  return { el: wrap, sync };
}

function syncBadge(item, badgeEl) {
  if (!badgeEl) return;
  if (typeof item.badge !== 'function') {
    badgeEl.style.display = 'none';
    return;
  }
  let val = null;
  try { val = item.badge(); } catch (_) { val = null; }
  if (val == null || val === '' || val === 0 || val === '0') {
    badgeEl.style.display = 'none';
    badgeEl.textContent = '';
    return;
  }
  badgeEl.style.display = '';
  badgeEl.textContent = String(val);
}
