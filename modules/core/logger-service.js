/**
 * YouYou Toolkit - 统一日志服务
 * @description 集中式日志模块，内存持久化环形缓冲，支持作用域、级别过滤、EventBus 推送
 */

import { eventBus } from './event-bus.js';

// ============================================================
// 日志级别
// ============================================================

export const LOG_LEVEL = Object.freeze({
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
});

const LEVEL_LABELS = Object.freeze({
  [LOG_LEVEL.DEBUG]: 'DEBUG',
  [LOG_LEVEL.INFO]: 'INFO',
  [LOG_LEVEL.WARN]: 'WARN',
  [LOG_LEVEL.ERROR]: 'ERROR'
});

// ============================================================
// LoggerService
// ============================================================

class LoggerService {
  constructor() {
    this._entries = [];
    this._maxSize = 2000;
    this._nextId = 1;
    this._minLevel = LOG_LEVEL.INFO;

    this._eventKey = 'logger:entry';
    this._statsEventKey = 'logger:statsChanged';
    this._pendingFlush = false;
  }

  // ============================================================
  // 日志写入
  // ============================================================

  _write(level, scope, message, data) {
    const entry = {
      id: this._nextId++,
      timestamp: Date.now(),
      level,
      scope,
      message,
      data
    };

    this._entries.push(entry);
    if (this._entries.length > this._maxSize) {
      this._entries.shift();
    }

    this._forwardToConsole(entry);

    if (!this._pendingFlush) {
      this._pendingFlush = true;
      queueMicrotask(() => {
        this._pendingFlush = false;
        this._emitEntry(entry);
      });
    }
  }

  _forwardToConsole(entry) {
    const prefix = `[${entry.scope}]`;
    switch (entry.level) {
      case LOG_LEVEL.DEBUG:
        console.debug(prefix, entry.message, entry.data ?? '');
        break;
      case LOG_LEVEL.INFO:
        console.log(prefix, entry.message, entry.data ?? '');
        break;
      case LOG_LEVEL.WARN:
        console.warn(prefix, entry.message, entry.data ?? '');
        break;
      case LOG_LEVEL.ERROR:
        console.error(prefix, entry.message, entry.data ?? '');
        break;
    }
  }

  _emitEntry(entry) {
    try {
      eventBus?.emit(this._eventKey, entry);
    } catch (_) {}
  }

  debug(scope, message, data) {
    if (LOG_LEVEL.DEBUG < this._minLevel) return;
    this._write(LOG_LEVEL.DEBUG, scope, message, data);
  }

  info(scope, message, data) {
    if (LOG_LEVEL.INFO < this._minLevel) return;
    this._write(LOG_LEVEL.INFO, scope, message, data);
  }

  log(scope, message, data) {
    this.info(scope, message, data);
  }

  warn(scope, message, data) {
    if (LOG_LEVEL.WARN < this._minLevel) return;
    this._write(LOG_LEVEL.WARN, scope, message, data);
  }

  error(scope, message, data) {
    if (LOG_LEVEL.ERROR < this._minLevel) return;
    this._write(LOG_LEVEL.ERROR, scope, message, data);
  }

  // ============================================================
  // 作用域
  // ============================================================

  createScope(name) {
    return {
      debug: (msg, data) => this.debug(name, msg, data),
      info: (msg, data) => this.info(name, msg, data),
      log: (msg, data) => this.log(name, msg, data),
      warn: (msg, data) => this.warn(name, msg, data),
      error: (msg, data) => this.error(name, msg, data)
    };
  }

  // ============================================================
  // 查询
  // ============================================================

  getEntries(filter = {}) {
    const {
      level,
      scope,
      search,
      limit = 500,
      offset = 0
    } = filter;

    let result = this._entries;

    if (level !== undefined && level !== null) {
      result = result.filter(e => e.level >= level);
    }
    if (scope) {
      result = result.filter(e => e.scope === scope);
    }
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(e =>
        e.scope.toLowerCase().includes(lower) ||
        e.message.toLowerCase().includes(lower)
      );
    }

    const total = result.length;
    result = result.slice(offset, offset + limit);

    return { entries: result, total };
  }

  getStats() {
    const stats = {
      total: this._entries.length,
      byLevel: { DEBUG: 0, INFO: 0, WARN: 0, ERROR: 0 },
      byScope: {}
    };

    for (const e of this._entries) {
      const label = LEVEL_LABELS[e.level] || 'UNKNOWN';
      stats.byLevel[label] = (stats.byLevel[label] || 0) + 1;
      stats.byScope[e.scope] = (stats.byScope[e.scope] || 0) + 1;
    }

    return stats;
  }

  // ============================================================
  // 控制
  // ============================================================

  setLevel(level) {
    this._minLevel = level;
  }

  getLevel() {
    return this._minLevel;
  }

  setMaxSize(size) {
    this._maxSize = Math.max(100, Math.min(10000, size));
  }

  clear() {
    this._entries = [];
    this._nextId = 1;
  }

  // ============================================================
  // 工具方法
  // ============================================================

  levelLabel(level) {
    return LEVEL_LABELS[level] || 'UNKNOWN';
  }
}

// ============================================================
// 单例
// ============================================================

export const logger = new LoggerService();
export { LoggerService };
export default logger;
