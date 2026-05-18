/**
 * YouYou Toolkit - 填表 isolationKey 抽象层
 *
 * 议题 #15 §B 共同基座：
 *   - shujuku 的 dataIsolationEnabled / dataIsolationCode 风格全局配置
 *   - 每条消息按 isolationKey 分桶存表数据
 *   - 切换 isolation 时数据库等本地工作集应整库销毁重建（不靠 SQL WHERE 隔离）
 *
 * 存储位置：走 storage-service 全局命名空间 `tableEngine.isolation`
 *   { enabled: boolean, key: string }
 *
 * 订阅模型：内部维护订阅列表 + 启动时初始化、状态变化时通知；
 *           下游（table-state-service / table-workbench UI / SQLite provider）
 *           监听 isolation 切换以重建工作集。
 *
 * 设计约束（memory project_table_workbench_gaps esbuild __esm 陷阱）：
 *   - 不在顶层 const 调用 importedVar.method()，logger 用 lazy 函数
 *   - 顶层只暴露常量 + 工厂函数 + 单例
 */

import { storage } from '../core/storage-service.js';
import { logger } from '../core/logger-service.js';
import {
  DEFAULT_ISOLATION_KEY,
  normalizeIsolationKey,
  makeLockScopeKey
} from './table-types.js';

const STORAGE_KEY = 'tableEngine.isolation';

const DEFAULT_STATE = Object.freeze({
  enabled: false,
  key: DEFAULT_ISOLATION_KEY
});

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableIsolation');
  return _log;
}

class TableIsolationService {
  constructor() {
    this._cache = null;
    this._subscribers = new Set();
  }

  // ──────────────────────────────────────────────────────────
  // 状态读取
  // ──────────────────────────────────────────────────────────

  /**
   * 获取完整状态 { enabled, key }
   */
  getState() {
    if (this._cache) return this._cache;
    const stored = storage.get(STORAGE_KEY, null);
    this._cache = this._normalize(stored);
    return this._cache;
  }

  /**
   * 当前 isolation 是否启用
   */
  isEnabled() {
    return this.getState().enabled === true;
  }

  /**
   * 当前生效的 isolationKey
   *   - enabled=false 或 key 为空 → 返回 '' (DEFAULT_ISOLATION_KEY)
   *   - 否则 → 返回规范化后的 key
   */
  getKey() {
    const state = this.getState();
    if (!state.enabled) return DEFAULT_ISOLATION_KEY;
    return state.key || DEFAULT_ISOLATION_KEY;
  }

  /**
   * 配置的 key 原始值（即使 enabled=false 也返回，便于 UI 显示）
   */
  getConfiguredKey() {
    return this.getState().key;
  }

  // ──────────────────────────────────────────────────────────
  // 状态写入
  // ──────────────────────────────────────────────────────────

  /**
   * 切换启用状态
   * @param {boolean} enabled
   */
  setEnabled(enabled) {
    const next = this._normalize({ ...this.getState(), enabled: !!enabled });
    this._commit(next, { reason: 'enabled' });
  }

  /**
   * 设置 isolationKey 当前值（不影响 enabled 标志）
   * @param {string} key
   */
  setKey(key) {
    const next = this._normalize({ ...this.getState(), key });
    this._commit(next, { reason: 'key' });
  }

  /**
   * 一次性原子更新
   * @param {{enabled?: boolean, key?: string}} patch
   */
  updateState(patch = {}) {
    const cur = this.getState();
    const next = this._normalize({
      enabled: patch.enabled !== undefined ? !!patch.enabled : cur.enabled,
      key: patch.key !== undefined ? patch.key : cur.key
    });
    this._commit(next, { reason: 'patch' });
  }

  /**
   * 重置为默认（关闭 isolation，清空 key）
   */
  reset() {
    this._commit({ ...DEFAULT_STATE }, { reason: 'reset' });
  }

  // ──────────────────────────────────────────────────────────
  // scopeKey helper（shujuku `${chatKey}::${isolationKey}` 复合）
  // ──────────────────────────────────────────────────────────

  /**
   * 获取与当前 isolation 复合的 scopeKey，用于锁定 / 状态分桶等。
   * @param {string} chatKey - 当前 chat 的标识（通常是 chatId / chatFileName）
   * @returns {string}
   */
  getScopeKey(chatKey) {
    return makeLockScopeKey(chatKey, this.getKey());
  }

  // ──────────────────────────────────────────────────────────
  // 订阅 / 通知
  // ──────────────────────────────────────────────────────────

  /**
   * 订阅 isolation 状态变化
   * 切换 isolation 时整库销毁重建（SQLite provider）/ UI 刷新都走这里
   * @param {(state: {enabled: boolean, key: string, prev: {enabled,key}, reason: string}) => void} handler
   * @returns {() => void} unsubscribe
   */
  subscribe(handler) {
    if (typeof handler !== 'function') return () => {};
    this._subscribers.add(handler);
    return () => this._subscribers.delete(handler);
  }

  // ──────────────────────────────────────────────────────────
  // 私有
  // ──────────────────────────────────────────────────────────

  _normalize(value) {
    if (!value || typeof value !== 'object') return { ...DEFAULT_STATE };
    return {
      enabled: value.enabled === true,
      key: normalizeIsolationKey(value.key)
    };
  }

  _commit(next, meta = {}) {
    const prev = this.getState();
    // 短路：状态完全相同则不重复 emit
    if (prev.enabled === next.enabled && prev.key === next.key) return;

    this._cache = next;
    try {
      storage.set(STORAGE_KEY, next);
    } catch (err) {
      getLog().error('isolation 状态落盘失败', err);
    }

    getLog().info('isolation 状态变化', { prev, next, reason: meta.reason || '' });

    const payload = { ...next, prev, reason: meta.reason || '' };
    for (const handler of this._subscribers) {
      try {
        handler(payload);
      } catch (err) {
        getLog().error('isolation 订阅者回调异常', err);
      }
    }
  }
}

// 单例 + 命名导出
const tableIsolation = new TableIsolationService();

export { tableIsolation, STORAGE_KEY as TABLE_ISOLATION_STORAGE_KEY };
export default tableIsolation;
