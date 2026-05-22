/**
 * YouYou Toolkit - Floating Ball Registry & Item Renderers (Phone Shell)
 * @description 项注册表 + Promise mutex + 图标卡片渲染器
 *              kind: toggle | button | slider | labelValue | custom
 *              新增 icon / iconColor / dock 字段
 *              icon 缺省时根据 label 首字符自动取一个
 */

import { escapeHtml } from './floating-ball-menu.js';

/**
 * 创建项注册表
 *
 * @param {Object} deps
 * @param {Function} deps.onChange   注册表变化时触发（菜单需要重新渲染）
 * @param {Function} deps.onRefresh  单项状态刷新请求（仅修改 DOM，不重建）
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
    if (item.kind && !['toggle', 'button', 'slider', 'labelValue', 'custom', 'app'].includes(item.kind)) {
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
      const prev = items.get(item.id);
      if (typeof prev.destroy === 'function') {
        try { prev.destroy(); } catch (_) {}
      }
    }
    items.set(item.id, { kind: 'toggle', order: 100, dock: false, ...item });
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
 * 创建 Promise 链 Mutex —— 串行化 onClick
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
 * 自动选一个图标占位符（label 首字符）
 */
function fallbackIcon(label) {
  if (!label) return '·';
  const first = Array.from(String(label))[0] || '·';
  return first;
}

/**
 * 渲染单项为 HTMLElement（手机图标卡片样式）
 *
 * @param {Document} doc
 * @param {Object} item
 * @param {Object} ctxBase  不含 item，由本函数补全
 * @returns {{ el: HTMLElement, sync: () => void }}
 */
export function renderItem(doc, item, ctxBase) {
  const ctx = { ...ctxBase, item };

  switch (item.kind) {
    case 'custom':
      return renderCustom(doc, item, ctx);
    case 'app':
    case 'slider':
    case 'labelValue':
    case 'button':
    case 'toggle':
    default:
      return renderAppIcon(doc, item, ctx);
  }
}

/**
 * 统一的图标卡片渲染器（toggle/button/labelValue/slider 共用）
 * - toggle:    点击切换，is-on 加蓝色发光
 * - button:    点击执行 onClick
 * - labelValue: 显示数值/状态在 label 下方（用 value 函数）
 * - slider:    点击进入"长按调整"模式 —— v1 简化为点击 +step 步进，避免在手机图标上塞滑块
 */
function renderAppIcon(doc, item, ctx) {
  const node = doc.createElement('div');
  node.className = 'phone-app';
  node.setAttribute('data-id', item.id);
  node.setAttribute('data-kind', item.kind || 'toggle');
  if (item.radioGroup) node.setAttribute('data-radio-group', item.radioGroup);

  const iconHtml = renderIconContent(item);
  const labelText = escapeHtml(item.label);

  node.innerHTML = `
    <div class="phone-app-icon" ${item.iconColor ? `style="background: ${escapeHtml(item.iconColor)}"` : ''}>
      ${iconHtml}
      <span class="phone-app-badge" style="display:none;"></span>
    </div>
    <div class="phone-app-label">${labelText}</div>
  `;

  const iconEl = node.querySelector('.phone-app-icon');
  const badgeEl = node.querySelector('.phone-app-badge');
  const labelEl = node.querySelector('.phone-app-label');

  function sync() {
    // toggle / labelValue 都通过 getState 表达 on/off/missing
    let state = 'off';
    if (typeof item.getState === 'function') {
      try { state = item.getState() || 'off'; } catch (_) { state = 'off'; }
    } else if (item.kind === 'button') {
      state = 'off';
    }

    if (item.kind === 'toggle' || typeof item.getState === 'function') {
      node.classList.toggle('is-on', state === 'on');
      node.classList.toggle('is-missing', state === 'missing');
    }

    // labelValue: 把 value 拼到 label 后面
    if (item.kind === 'labelValue') {
      let v = '';
      if (typeof item.value === 'function') {
        try { v = item.value(); } catch (_) { v = ''; }
      } else if (item.value !== undefined) {
        v = item.value;
      }
      if (v !== '' && v != null) {
        labelEl.textContent = `${item.label} · ${v}`;
      } else {
        labelEl.textContent = item.label;
      }
    }

    syncBadge(item, badgeEl);

    // 禁用态
    const disabled = typeof item.disabled === 'function'
      ? safeBool(item.disabled, false)
      : !!item.disabled;
    node.classList.toggle('is-disabled', disabled);
  }

  node.addEventListener('click', (e) => {
    if (node.classList.contains('is-disabled')) return;
    e.stopPropagation();

    if (typeof item.onClick !== 'function' && item.kind === 'slider') {
      // slider 在图标网格里降级：点击触发 onChange(+step)
      if (typeof item.onChange === 'function') {
        const step = Number.isFinite(item.step) ? Number(item.step) : 1;
        const cur = readSliderValue(item);
        const max = Number.isFinite(item.max) ? Number(item.max) : 100;
        const min = Number.isFinite(item.min) ? Number(item.min) : 0;
        let next = cur + step;
        if (next > max) next = min;
        ctx.mutex.run(async () => {
          try {
            await item.onChange({ ...ctx, value: next });
          } catch (err) {
            ctx.logger?.error?.(`项 ${item.id} onChange 异常: ${err?.message || err}`, err);
          } finally {
            sync();
          }
        });
      }
      return;
    }

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
      ctx.logger?.warn?.(`项 ${item.id} (${item.kind}) 未提供 onClick`);
    }
  });

  sync();
  return { el: node, sync };
}

function readSliderValue(item) {
  if (typeof item.value === 'function') {
    try { return Number(item.value()) || 0; } catch (_) { return 0; }
  }
  return Number.isFinite(item.value) ? Number(item.value) : 0;
}

function safeBool(fn, fallback) {
  try { return !!fn(); } catch (_) { return fallback; }
}

/**
 * 渲染 icon 内容：支持 emoji 字符 / SVG 字符串 / DOM 节点函数 / 缺省 fallback
 */
function renderIconContent(item) {
  if (typeof item.icon === 'string' && item.icon.trim()) {
    const trimmed = item.icon.trim();
    // SVG 字符串
    if (trimmed.startsWith('<svg') || trimmed.startsWith('<SVG')) {
      return trimmed; // 直接 innerHTML，调用方需保证安全
    }
    // emoji / 单字
    return escapeHtml(trimmed);
  }
  return escapeHtml(fallbackIcon(item.label));
}

/**
 * custom 渲染：把 render() 的输出整块塞进图标卡片下方为完整一格
 * （仍占一格 phone-app 位置，但内部完全自定义）
 */
function renderCustom(doc, item, ctx) {
  const wrap = doc.createElement('div');
  wrap.className = 'phone-app phone-app-custom';
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
