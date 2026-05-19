/**
 * YouYou Toolkit - 宿主事件订阅服务 (host-event-service)
 *
 * 职责（详见 docs/PHASE3_ARCHITECTURE.md #10）：
 *   1. 统一宿主 API / eventSource / eventTypes 发现
 *   2. 提供 subscribe / emit / ready / describe 接口
 *   3. 宿主未就绪时排队订阅 + 自动重试
 *
 * 不负责：防抖 / 去重 / 节流 / 事务管理（业务侧自行处理）。
 */

import { logger } from './logger-service.js';

const log = logger.createScope('HostEvents');

// ────────── HOST_EVENTS 常量集合 ──────────
// 调用方使用 UPPER_SNAKE_CASE key；内部优先用宿主 eventTypes[key] 解析为原始名。
export const HOST_EVENTS = Object.freeze({
  // 应用生命周期
  APP_READY: 'APP_READY',

  // 消息
  MESSAGE_SENT: 'MESSAGE_SENT',
  MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
  MESSAGE_UPDATED: 'MESSAGE_UPDATED',
  MESSAGE_DELETED: 'MESSAGE_DELETED',
  MESSAGE_EDITED: 'MESSAGE_EDITED',
  MESSAGE_SWIPED: 'MESSAGE_SWIPED',
  USER_MESSAGE_RENDERED: 'USER_MESSAGE_RENDERED',
  CHARACTER_MESSAGE_RENDERED: 'CHARACTER_MESSAGE_RENDERED',
  IMPERSONATE_READY: 'IMPERSONATE_READY',

  // 生成
  GENERATION_STARTED: 'GENERATION_STARTED',
  GENERATION_STOPPED: 'GENERATION_STOPPED',
  GENERATION_ENDED: 'GENERATION_ENDED',
  GENERATION_AFTER_COMMANDS: 'GENERATION_AFTER_COMMANDS',

  // 聊天
  CHAT_CHANGED: 'CHAT_CHANGED',
  CHAT_CREATED: 'CHAT_CREATED',
  CHAT_DELETED: 'CHAT_DELETED',

  // 角色
  CHARACTER_PAGE_LOADED: 'CHARACTER_PAGE_LOADED',
  CHARACTER_EDITOR_OPENED: 'CHARACTER_EDITOR_OPENED',
  CHARACTER_EDITED: 'CHARACTER_EDITED',

  // 世界书
  WORLDINFO_UPDATED: 'WORLDINFO_UPDATED'
});

// ────────── 私有：事件名归一化 ──────────
function normalizeEventName(raw) {
  if (!raw) return '';
  let s = String(raw).trim();
  // camelCase / PascalCase → UPPER_SNAKE_CASE
  s = s.replace(/([a-z0-9])([A-Z])/g, '$1_$2');
  return s.toUpperCase();
}

// ────────── 私有：宿主发现 ──────────
function getTopWindow() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent;
    }
  } catch (_) { /* cross-origin */ }
  return window;
}

function getHostApi() {
  try {
    return getTopWindow()?.SillyTavern || null;
  } catch (_) {
    return null;
  }
}

function getHostContext(api) {
  try {
    return (api || getHostApi())?.getContext?.() || null;
  } catch (_) {
    return null;
  }
}

function _describeCandidate(candidate, label) {
  if (!candidate) return null;
  const hasSubscribe = typeof candidate?.on === 'function' || typeof candidate?.addListener === 'function';
  const hasUnsubscribe = typeof candidate?.off === 'function' || typeof candidate?.removeListener === 'function';
  if (!hasSubscribe || !hasUnsubscribe) return null;
  return {
    source: label,
    eventSource: candidate,
    capabilities: {
      on: typeof candidate?.on === 'function',
      off: typeof candidate?.off === 'function',
      addListener: typeof candidate?.addListener === 'function',
      removeListener: typeof candidate?.removeListener === 'function'
    }
  };
}

function resolveHostBridge() {
  const topWindow = getTopWindow();
  const api = getHostApi();
  const context = getHostContext(api);

  const candidates = [
    _describeCandidate(api?.eventSource, 'SillyTavern.eventSource'),
    _describeCandidate(context?.eventSource, 'SillyTavern.getContext().eventSource'),
    _describeCandidate(topWindow?.eventSource, 'topWindow.eventSource')
  ].filter(Boolean);

  const chosen = candidates[0] || null;
  const eventTypes =
    api?.eventTypes ||
    api?.event_types ||
    context?.eventTypes ||
    context?.event_types ||
    topWindow?.eventTypes ||
    topWindow?.event_types ||
    {};

  return {
    topWindow,
    api,
    context,
    eventSource: chosen?.eventSource || null,
    eventTypes,
    source: chosen?.source || 'unavailable',
    capabilities: chosen?.capabilities || null,
    hasBridge: !!chosen?.eventSource
  };
}

// ────────── 服务主体 ──────────

const DEFAULT_RETRY_DELAY_MS = 1500;
const MAX_RETRY_ATTEMPTS = 20;

class HostEventService {
  constructor() {
    this._bridge = null;
    this._pending = [];
    this._initAttempts = 0;
    this._retryTimer = null;
    this._readyResolvers = [];
    this._initialized = false;
    this._disposed = false;
  }

  // ───── 公开接口 ─────

  /**
   * 订阅宿主事件
   * @param {string} eventKey  HOST_EVENTS 中的 key 或宿主原始事件名
   * @param {Function} handler 事件处理回调
   * @param {Object} [options] 暂留扩展
   * @returns {Function} unsubscribe
   */
  subscribe(eventKey, handler, options = {}) {
    if (!eventKey || typeof handler !== 'function') {
      log.warn('subscribe 无效参数', { eventKey, handlerType: typeof handler });
      return () => {};
    }
    if (this._disposed) {
      log.warn('subscribe 在 dispose 之后被调用', { eventKey });
      return () => {};
    }

    const entry = {
      key: normalizeEventName(eventKey),
      rawKey: eventKey,
      handler,
      options,
      attached: false,
      _hostName: '',
      _hostUnsubscribe: null,
      _disposed: false
    };

    this._pending.push(entry);
    this._ensureInitialized();
    if (this._bridge?.hasBridge) {
      this._attachEntry(entry);
    }

    return () => {
      if (entry._disposed) return;
      entry._disposed = true;

      const idx = this._pending.indexOf(entry);
      if (idx >= 0) this._pending.splice(idx, 1);

      if (entry.attached && typeof entry._hostUnsubscribe === 'function') {
        try { entry._hostUnsubscribe(); } catch (e) {
          log.warn('取消宿主订阅失败', { event: entry._hostName, error: e });
        }
      }
    };
  }

  /**
   * 触发宿主事件（宿主支持 emit/dispatch 时）
   */
  async emit(eventKey, ...payload) {
    this._ensureInitialized();
    if (!this._bridge?.hasBridge) {
      log.debug('emit 时宿主桥未就绪，跳过', { eventKey });
      return false;
    }
    const hostName = this._resolveHostEventName(eventKey);
    if (!hostName) return false;

    const { eventSource } = this._bridge;
    try {
      if (typeof eventSource?.emit === 'function') {
        await eventSource.emit(hostName, ...payload);
        return true;
      }
      if (typeof eventSource?.dispatch === 'function') {
        await eventSource.dispatch(hostName, ...payload);
        return true;
      }
    } catch (e) {
      log.warn('emit 抛错', { eventKey, hostName, error: e });
    }
    return false;
  }

  /**
   * 等待桥就绪
   * @param {Object} [options]
   * @param {number} [options.timeoutMs=10000]  传 0 则无限等待
   * @returns {Promise<boolean>}
   */
  ready({ timeoutMs = 10000 } = {}) {
    this._ensureInitialized();
    if (this._bridge?.hasBridge) return Promise.resolve(true);

    return new Promise((resolve) => {
      let settled = false;
      const settle = (ok) => {
        if (settled) return;
        settled = true;
        resolve(ok);
      };
      const timer = timeoutMs > 0 ? setTimeout(() => settle(false), timeoutMs) : null;
      this._readyResolvers.push((ok) => {
        if (timer) clearTimeout(timer);
        settle(ok);
      });
    });
  }

  /**
   * 返回当前桥状态描述
   */
  describe() {
    this._ensureInitialized();
    const eventTypes = this._bridge?.eventTypes || {};
    return {
      initialized: this._initialized,
      source: this._bridge?.source || 'unavailable',
      hasBridge: !!this._bridge?.hasBridge,
      initAttempts: this._initAttempts,
      retryScheduled: !!this._retryTimer,
      pendingCount: this._pending.filter((e) => !e.attached).length,
      attachedCount: this._pending.filter((e) => e.attached).length,
      availableEvents: Object.keys(eventTypes).slice(0, 100)
    };
  }

  /**
   * 强制重新探测宿主桥并重新挂载已订阅项
   * 用途：宿主热替换 eventSource、热重载等
   */
  reinit() {
    if (this._disposed) return false;
    for (const entry of this._pending) {
      if (entry.attached && typeof entry._hostUnsubscribe === 'function') {
        try { entry._hostUnsubscribe(); } catch (_) {}
      }
      entry.attached = false;
      entry._hostUnsubscribe = null;
      entry._hostName = '';
    }
    this._bridge = null;
    this._initialized = false;
    this._initAttempts = 0;
    if (this._retryTimer) {
      clearTimeout(this._retryTimer);
      this._retryTimer = null;
    }
    return this._ensureInitialized();
  }

  /**
   * 销毁服务（测试 / 卸载用）
   */
  dispose() {
    if (this._retryTimer) {
      clearTimeout(this._retryTimer);
      this._retryTimer = null;
    }
    for (const entry of this._pending) {
      if (entry.attached && typeof entry._hostUnsubscribe === 'function') {
        try { entry._hostUnsubscribe(); } catch (_) {}
      }
      entry._disposed = true;
    }
    this._pending = [];
    this._readyResolvers = [];
    this._bridge = null;
    this._initialized = false;
    this._disposed = true;
  }

  // ───── 内部 ─────

  _ensureInitialized() {
    if (this._disposed) return false;
    if (this._initialized && this._bridge?.hasBridge) return true;

    this._initAttempts += 1;
    const bridge = resolveHostBridge();
    this._bridge = bridge;
    this._initialized = true;

    if (!bridge.hasBridge) {
      log.debug(`宿主桥未就绪 (attempt ${this._initAttempts})`, { source: bridge.source });
      this._scheduleRetry();
      return false;
    }

    log.info('宿主桥已就绪', {
      source: bridge.source,
      eventTypesCount: Object.keys(bridge.eventTypes).length
    });

    for (const entry of this._pending) {
      if (!entry.attached && !entry._disposed) this._attachEntry(entry);
    }

    const resolvers = this._readyResolvers.slice();
    this._readyResolvers = [];
    for (const fn of resolvers) {
      try { fn(true); } catch (_) {}
    }
    return true;
  }

  _scheduleRetry() {
    if (this._retryTimer) return;
    if (this._initAttempts >= MAX_RETRY_ATTEMPTS) {
      log.warn(`已达最大重试次数 (${MAX_RETRY_ATTEMPTS})，停止重试`);
      const resolvers = this._readyResolvers.slice();
      this._readyResolvers = [];
      for (const fn of resolvers) {
        try { fn(false); } catch (_) {}
      }
      return;
    }
    this._retryTimer = setTimeout(() => {
      this._retryTimer = null;
      this._initialized = false;
      this._ensureInitialized();
    }, DEFAULT_RETRY_DELAY_MS);
  }

  _resolveHostEventName(eventKey) {
    const upperKey = normalizeEventName(eventKey);
    const eventTypes = this._bridge?.eventTypes || {};

    if (eventTypes[upperKey]) return eventTypes[upperKey];
    const lower = upperKey.toLowerCase();
    if (eventTypes[lower]) return eventTypes[lower];

    const raw = String(eventKey).trim();
    if (raw && raw === raw.toLowerCase()) return raw;

    return lower;
  }

  _attachEntry(entry) {
    if (!this._bridge?.hasBridge || entry.attached || entry._disposed) return;

    const hostName = this._resolveHostEventName(entry.rawKey);
    if (!hostName) {
      log.warn('无法解析宿主事件名', { rawKey: entry.rawKey });
      return;
    }

    const { eventSource } = this._bridge;
    const subscribe = typeof eventSource?.on === 'function'
      ? eventSource.on.bind(eventSource)
      : (typeof eventSource?.addListener === 'function' ? eventSource.addListener.bind(eventSource) : null);
    const unsubscribe = typeof eventSource?.off === 'function'
      ? eventSource.off.bind(eventSource)
      : (typeof eventSource?.removeListener === 'function' ? eventSource.removeListener.bind(eventSource) : null);

    if (!subscribe || !unsubscribe) {
      log.warn('宿主 eventSource 缺少 on/off 方法');
      return;
    }

    try {
      subscribe(hostName, entry.handler);
      entry.attached = true;
      entry._hostName = hostName;
      entry._hostUnsubscribe = () => {
        try { unsubscribe(hostName, entry.handler); } catch (e) {
          log.warn('取消宿主订阅失败', { event: hostName, error: e });
        }
      };
      log.debug(`绑定宿主事件: "${hostName}" (key=${entry.key})`);
    } catch (e) {
      log.error(`绑定宿主事件失败: "${hostName}"`, { error: e });
    }
  }
}

// ───── 单例 + 工具导出 ─────
export const hostEvents = new HostEventService();

export {
  normalizeEventName,
  getTopWindow,
  getHostApi,
  getHostContext,
  resolveHostBridge
};

export default hostEvents;
