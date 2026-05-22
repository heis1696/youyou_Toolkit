/**
 * YouYou Toolkit - Floating Ball App Controller (Phase A1)
 * @description App 注册 + 视图栈基础设施。registerApp / openApp / closeApp /
 *              pushView / popView / replaceView。
 *              视图栈策略：只渲染栈顶 view DOM，pop 时销毁当前并重建上一层。
 */

const TOPBAR_CLASS = 'phone-app-topbar';
const TOPBAR_BACK_CLASS = 'phone-app-topbar-back';
const TOPBAR_TITLE_CLASS = 'phone-app-topbar-title';
const VIEW_CLASS = 'phone-app-view';
const PUSH_IN_CLASS = 'is-pushing-in';
const POP_OUT_CLASS = 'is-popping-out';
const ACTIVE_CLASS = 'is-app-active';
const ANIM_TIMEOUT_MS = 400;

const BACK_ICON_SVG = `
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M15 18 L9 12 L15 6" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>
`;

export function createAppController({
  targetDoc,
  mountPoint,
  mutex,
  storage: parentStorage,
  logger,
  closeMenu,
  onAppOpened,
  onAppClosed,
}) {
  if (!targetDoc) throw new Error('createAppController: targetDoc 必填');
  if (!mountPoint) throw new Error('createAppController: mountPoint 必填');
  if (!mutex || typeof mutex.run !== 'function') {
    throw new Error('createAppController: mutex 必填');
  }

  /** @type {Map<string, Object>} 已注册的 App 定义 */
  const registry = new Map();
  /** @type {Array<{ view: Object, container: HTMLElement }>} */
  const viewStack = [];
  let activeAppId = null;

  let topBarEl = null;
  let backButtonEl = null;
  let titleEl = null;

  function _resolveAppLogger(appId) {
    if (logger && typeof logger.createScope === 'function') {
      return logger.createScope(`App:${appId}`);
    }
    return logger;
  }

  function _resolveAppStorage(appId) {
    if (parentStorage && typeof parentStorage.namespace === 'function') {
      return parentStorage.namespace(`apps:${appId}`);
    }
    return parentStorage;
  }

  function _buildContext(appId) {
    return {
      appId,
      pushView,
      popView,
      replaceView,
      closeApp,
      closeMenu: () => {
        try { closeMenu?.(); } catch (_) {}
      },
      storage: _resolveAppStorage(appId),
      logger: _resolveAppLogger(appId),
      get isOpen() { return activeAppId === appId; },
      getStackDepth: () => viewStack.length,
    };
  }

  function _ensureTopBar() {
    if (topBarEl) return;
    topBarEl = targetDoc.createElement('div');
    topBarEl.className = TOPBAR_CLASS;

    backButtonEl = targetDoc.createElement('button');
    backButtonEl.type = 'button';
    backButtonEl.className = TOPBAR_BACK_CLASS;
    backButtonEl.setAttribute('aria-label', '返回');
    backButtonEl.innerHTML = BACK_ICON_SVG;
    backButtonEl.addEventListener('click', (e) => {
      e.stopPropagation();
      popView();
    });

    titleEl = targetDoc.createElement('div');
    titleEl.className = TOPBAR_TITLE_CLASS;

    topBarEl.appendChild(backButtonEl);
    topBarEl.appendChild(titleEl);
  }

  function _updateTopBar(view) {
    if (!topBarEl || !titleEl || !backButtonEl) return;
    const app = registry.get(activeAppId);
    const title = (view && view.title) || (app && (app.title || app.label)) || '';
    titleEl.textContent = title;

    const showBack = view && typeof view.showBackButton === 'boolean'
      ? view.showBackButton
      : viewStack.length > 1;
    backButtonEl.style.visibility = showBack ? 'visible' : 'hidden';
  }

  function _renderViewDOM(view, ctx) {
    let inner = null;
    try {
      inner = view.render(ctx);
    } catch (err) {
      logger?.error?.(`view ${view?.id || '?'} render 异常: ${err?.message || err}`, err);
      const fallback = targetDoc.createElement('div');
      fallback.style.cssText = 'padding:24px;color:#ff6b6b;font-size:12px;';
      fallback.textContent = `[渲染失败: ${view?.id || 'unknown'}]`;
      inner = fallback;
    }
    if (!(inner instanceof Node)) {
      const fallback = targetDoc.createElement('div');
      fallback.style.cssText = 'padding:24px;color:rgba(255,255,255,0.6);font-size:12px;';
      fallback.textContent = `[render 未返回 DOM Node: ${view?.id || 'unknown'}]`;
      inner = fallback;
    }

    const container = targetDoc.createElement('div');
    container.className = VIEW_CLASS;
    if (view?.id) container.setAttribute('data-view-id', String(view.id));
    container.appendChild(inner);
    return container;
  }

  function _waitAnimation(el) {
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        el.removeEventListener('animationend', onEnd);
        resolve();
      };
      const onEnd = () => finish();
      el.addEventListener('animationend', onEnd);
      // Safety net: animationend 不触发时（被 detach / display:none 等）兜底
      setTimeout(finish, ANIM_TIMEOUT_MS);
    });
  }

  async function _animatePushIn(container) {
    container.classList.add(PUSH_IN_CLASS);
    await _waitAnimation(container);
    container.classList.remove(PUSH_IN_CLASS);
  }

  async function _animatePopOut(container) {
    container.classList.add(POP_OUT_CLASS);
    await _waitAnimation(container);
    // class 不需移除：container 紧接着会从 DOM 移除
  }

  function _safeOnLeave(view, ctx) {
    if (typeof view?.onLeave !== 'function') return;
    try { view.onLeave(ctx); } catch (err) {
      logger?.error?.(`view ${view?.id} onLeave 异常: ${err?.message || err}`, err);
    }
  }

  function _safeOnEnter(view, ctx) {
    if (typeof view?.onEnter !== 'function') return;
    try { view.onEnter(ctx); } catch (err) {
      logger?.error?.(`view ${view?.id} onEnter 异常: ${err?.message || err}`, err);
    }
  }

  function _safeViewDestroy(view) {
    if (typeof view?.destroy !== 'function') return;
    try { view.destroy(); } catch (err) {
      logger?.error?.(`view ${view?.id} destroy 异常: ${err?.message || err}`, err);
    }
  }

  function _removeContainer(container) {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  function _validate(appDef) {
    if (!appDef || typeof appDef !== 'object') return 'App 必须是对象';
    if (!appDef.id || typeof appDef.id !== 'string') return 'App 必须包含字符串 id';
    if (!appDef.label || typeof appDef.label !== 'string') return 'App 必须包含字符串 label';
    if (!appDef.rootView || typeof appDef.rootView !== 'object') {
      return 'App 必须包含 rootView 对象';
    }
    if (typeof appDef.rootView.render !== 'function') {
      return 'rootView.render 必须是函数';
    }
    return null;
  }

  function registerApp(appDef) {
    const err = _validate(appDef);
    if (err) {
      throw new Error(`[FloatingBall] registerApp 失败: ${err}`);
    }
    // 同 id 替换：若当前正活跃则先关掉，避免旧 view 残留
    if (registry.has(appDef.id) && activeAppId === appDef.id) {
      closeApp();
    }
    registry.set(appDef.id, { ...appDef });
    logger?.log?.(`App 已注册: ${appDef.id}`);
  }

  function unregisterApp(id) {
    if (!registry.has(id)) return false;
    if (activeAppId === id) {
      closeApp();
    }
    registry.delete(id);
    logger?.log?.(`App 已卸载: ${id}`);
    return true;
  }

  function openApp(id) {
    return mutex.run(async () => {
      const app = registry.get(id);
      if (!app) {
        logger?.warn?.(`openApp: 找不到 App ${id}`);
        return false;
      }
      if (activeAppId === id) {
        return true;
      }
      if (activeAppId) {
        await _doCloseApp();
      }

      activeAppId = id;
      while (mountPoint.firstChild) {
        mountPoint.removeChild(mountPoint.firstChild);
      }
      mountPoint.classList.add(ACTIVE_CLASS);

      _ensureTopBar();
      mountPoint.appendChild(topBarEl);

      const ctx = _buildContext(id);
      if (typeof app.onOpen === 'function') {
        try { app.onOpen(ctx); } catch (err) {
          logger?.error?.(`App ${id} onOpen 异常: ${err?.message || err}`, err);
        }
      }

      const rootView = app.rootView;
      const container = _renderViewDOM(rootView, ctx);
      mountPoint.appendChild(container);
      viewStack.push({ view: rootView, container });
      _updateTopBar(rootView);

      await _animatePushIn(container);
      _safeOnEnter(rootView, ctx);

      try { onAppOpened?.(id); } catch (_) {}
      logger?.log?.(`App 打开: ${id}`);
      return true;
    });
  }

  // 内部 close（mutex 内调用，不再嵌套 mutex.run）
  async function _doCloseApp() {
    if (!activeAppId) return;
    const id = activeAppId;
    const app = registry.get(id);
    const ctx = _buildContext(id);

    while (viewStack.length > 0) {
      const top = viewStack.pop();
      _safeOnLeave(top.view, ctx);
      _safeViewDestroy(top.view);
      _removeContainer(top.container);
    }

    if (app && typeof app.onClose === 'function') {
      try { app.onClose(ctx); } catch (err) {
        logger?.error?.(`App ${id} onClose 异常: ${err?.message || err}`, err);
      }
    }

    if (topBarEl) _removeContainer(topBarEl);
    mountPoint.classList.remove(ACTIVE_CLASS);
    activeAppId = null;

    try { onAppClosed?.(id); } catch (_) {}
    logger?.log?.(`App 关闭: ${id}`);
  }

  function closeApp() {
    return mutex.run(async () => {
      if (!activeAppId) return false;
      await _doCloseApp();
      return true;
    });
  }

  function pushView(view) {
    return mutex.run(async () => {
      if (!activeAppId) {
        logger?.warn?.('pushView: 当前无活跃 App');
        return false;
      }
      if (!view || typeof view.render !== 'function') {
        logger?.warn?.('pushView: view.render 必须是函数');
        return false;
      }
      const ctx = _buildContext(activeAppId);

      const top = viewStack[viewStack.length - 1];
      if (top) {
        _safeOnLeave(top.view, ctx);
        _safeViewDestroy(top.view);
        _removeContainer(top.container);
      }

      const container = _renderViewDOM(view, ctx);
      mountPoint.appendChild(container);
      viewStack.push({ view, container });
      _updateTopBar(view);

      await _animatePushIn(container);
      _safeOnEnter(view, ctx);
      return true;
    });
  }

  function popView() {
    return mutex.run(async () => {
      if (!activeAppId) {
        logger?.warn?.('popView: 当前无活跃 App');
        return false;
      }
      if (viewStack.length <= 1) {
        await _doCloseApp();
        return true;
      }
      const ctx = _buildContext(activeAppId);

      const top = viewStack[viewStack.length - 1];
      if (top.container) {
        await _animatePopOut(top.container);
      }
      _safeOnLeave(top.view, ctx);
      _safeViewDestroy(top.view);
      _removeContainer(top.container);
      viewStack.pop();

      // D2: 只渲染栈顶 → 重建上一层 view
      const prev = viewStack[viewStack.length - 1];
      const newContainer = _renderViewDOM(prev.view, ctx);
      mountPoint.appendChild(newContainer);
      prev.container = newContainer;
      _updateTopBar(prev.view);
      _safeOnEnter(prev.view, ctx);
      return true;
    });
  }

  function replaceView(view) {
    return mutex.run(async () => {
      if (!activeAppId) {
        logger?.warn?.('replaceView: 当前无活跃 App');
        return false;
      }
      if (!view || typeof view.render !== 'function') {
        logger?.warn?.('replaceView: view.render 必须是函数');
        return false;
      }
      const ctx = _buildContext(activeAppId);

      const top = viewStack[viewStack.length - 1];
      if (top) {
        _safeOnLeave(top.view, ctx);
        _safeViewDestroy(top.view);
        _removeContainer(top.container);
        viewStack.pop();
      }

      const container = _renderViewDOM(view, ctx);
      mountPoint.appendChild(container);
      viewStack.push({ view, container });
      _updateTopBar(view);

      // replace 不走 push 滑入（depth 未变），直接出现 + onEnter
      _safeOnEnter(view, ctx);
      return true;
    });
  }

  function hasActiveApp() {
    return activeAppId !== null;
  }

  function getStackDepth() {
    return viewStack.length;
  }

  function getActiveApp() {
    return activeAppId ? registry.get(activeAppId) : null;
  }

  function destroyAll() {
    if (activeAppId) {
      // 同步清理（不走 mutex，destroy 路径要确定性）
      const id = activeAppId;
      const app = registry.get(id);
      const ctx = _buildContext(id);
      while (viewStack.length > 0) {
        const top = viewStack.pop();
        _safeOnLeave(top.view, ctx);
        _safeViewDestroy(top.view);
        _removeContainer(top.container);
      }
      if (app && typeof app.onClose === 'function') {
        try { app.onClose(ctx); } catch (_) {}
      }
      if (topBarEl) _removeContainer(topBarEl);
      mountPoint.classList.remove(ACTIVE_CLASS);
      activeAppId = null;
    }
    registry.clear();
    topBarEl = null;
    backButtonEl = null;
    titleEl = null;
  }

  return {
    registerApp,
    unregisterApp,
    openApp,
    closeApp,
    pushView,
    popView,
    replaceView,
    hasActiveApp,
    getStackDepth,
    getActiveApp,
    destroyAll,
  };
}
