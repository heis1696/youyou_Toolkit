/**
 * YouYou Toolkit - Prefab Controls 内部工具
 *
 * 共享 DOM 构造 / 事件发射器 / 控件树查找等基础设施。
 * 详见 docs/PHASE3_ARCHITECTURE.md §1（UI 控件 Prefab 化）。
 */

/**
 * 创建 DOM 元素的便捷函数。
 * @param {string} tag
 * @param {Object} [options]
 *   - className: string
 *   - text: string (textContent)
 *   - html: string (innerHTML，慎用)
 *   - attrs: { [name]: string | boolean | null }
 *   - style: CSSStyleDeclaration partial
 *   - dataset: { [key]: string }
 * @param {...(Node|string|{ el: Node })} children
 * @returns {HTMLElement}
 */
export function el(tag, options = {}, ...children) {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined && options.text !== null) {
    node.textContent = String(options.text);
  }
  if (options.html !== undefined && options.html !== null) {
    node.innerHTML = String(options.html);
  }
  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      if (v === undefined || v === null || v === false) continue;
      node.setAttribute(k, v === true ? '' : String(v));
    }
  }
  if (options.style) Object.assign(node.style, options.style);
  if (options.dataset) {
    for (const [k, v] of Object.entries(options.dataset)) {
      node.dataset[k] = String(v);
    }
  }
  for (const child of children) {
    appendChild(node, child);
  }
  return node;
}

/**
 * 把任意子节点（DOM/control/string/数组）追加到父节点。
 *
 * 跨 realm 兼容：bundle 加载在 iframe，但 targetDoc 通常是 parent document，
 * 所以外部传进来的 Node 来自 parent realm，`instanceof Node`（iframe realm）会假阴。
 * 用 nodeType 鸭式检测代替，详见 memory feedback-iframe-dual-realm。
 */
export function appendChild(parent, child) {
  if (child === null || child === undefined || child === false) return;
  if (Array.isArray(child)) {
    for (const c of child) appendChild(parent, c);
    return;
  }
  if (typeof child === 'string' || typeof child === 'number') {
    const doc = parent?.ownerDocument || document;
    parent.appendChild(doc.createTextNode(String(child)));
    return;
  }
  if (child && typeof child.nodeType === 'number') {
    parent.appendChild(child);
    return;
  }
  if (child && child.el && typeof child.el.nodeType === 'number') {
    parent.appendChild(child.el);
    return;
  }
}

/**
 * 极简事件发射器。
 * 返回 on/off/emit/clear，on 返回 unsubscribe。
 */
export function createEmitter() {
  const listeners = new Map();
  return {
    on(event, handler) {
      if (!event || typeof handler !== 'function') return () => {};
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(handler);
      return () => this.off(event, handler);
    },
    off(event, handler) {
      const set = listeners.get(event);
      if (set) set.delete(handler);
    },
    emit(event, ...args) {
      const set = listeners.get(event);
      if (!set) return;
      for (const fn of [...set]) {
        try { fn(...args); } catch (_) { /* swallow */ }
      }
    },
    clear() { listeners.clear(); }
  };
}

/**
 * 在控件树中查找指定 id 的控件。
 * 容器控件需要把子控件存到 `_children`（数组或 Map）。
 */
export function findControl(control, id) {
  if (!control || !id) return null;
  if (control._id === id) return control;
  const kids = control._children;
  if (!kids) return null;
  const list = kids instanceof Map ? [...kids.values()] : (Array.isArray(kids) ? kids : []);
  for (const c of list) {
    const found = findControl(c, id);
    if (found) return found;
  }
  return null;
}

/**
 * 创建一个控件的公共基底字段。
 * 用法：
 *   const ctrl = { ...baseControl({ id, kind: 'textInput' }), el: node, get() {...}, set() {...} };
 *
 * 返回值已含 _id / _kind / _children=null / _emitter / on / off / getControl / destroy / get / set 占位。
 * 具体控件按需 override get/set/destroy（remember to call super destroy 或 clean emitter）。
 */
export function baseControl({ id = null, kind = 'control', el: ctrlEl = null,
                             style = null, className = null, attrs = null } = {}) {
  if (ctrlEl) {
    if (style) Object.assign(ctrlEl.style, style);
    if (className) {
      const parts = String(className).trim().split(/\s+/).filter(Boolean);
      if (parts.length) ctrlEl.classList.add(...parts);
    }
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === false || v == null) continue;
        ctrlEl.setAttribute(k, v === true ? '' : String(v));
      }
    }
  }
  const emitter = createEmitter();
  return {
    _id: id || null,
    _kind: kind,
    _children: null,
    _emitter: emitter,
    on(event, handler) { return emitter.on(event, handler); },
    off(event, handler) { emitter.off(event, handler); },
    getControl(idQuery) { return findControl(this, idQuery); },
    get() { return undefined; },
    set(_value) { /* no-op default */ },
    destroy() {
      emitter.clear();
      if (this._children) {
        const list = this._children instanceof Map
          ? [...this._children.values()]
          : (Array.isArray(this._children) ? this._children : []);
        for (const c of list) {
          try { c?.destroy?.(); } catch (_) {}
        }
        if (this._children instanceof Map) this._children.clear();
        else if (Array.isArray(this._children)) this._children.length = 0;
      }
      if (this.el?.parentNode) {
        try { this.el.parentNode.removeChild(this.el); } catch (_) {}
      }
    }
  };
}
