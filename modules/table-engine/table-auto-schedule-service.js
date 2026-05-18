/**
 * YouYou Toolkit - 填表自动调度服务
 *
 * 议题 #15 G2+ 完整版（v1.0.205+）：
 *   跟踪每张表的 lastUpdatedMessageIndex，让 updateConfig.updateFrequency=N
 *   实现「每 N 条消息触发一次」。
 *
 * 存储：storage namespace 'tableAutoSchedule'
 *   key: `${chatId}::${isolationKey}::${sheetUid}`
 *   value: { lastMessageIndex: number, lastUpdatedAt: ISO string }
 *
 * 工作流：
 *   1. runAutoTableUpdate 入口调 buildAutoSchedulePlan(scopeTables, currentMessageIndex)
 *   2. plan 返回 { shouldUpdateTableIds: Set, skipReasons: { uid: reason } }
 *   3. 主链按 plan 临时禁用不需要更新的表
 *   4. writeback 成功后调 recordTableUpdated(scopeKey, sheetUid, messageIndex)
 *
 * updateFrequency 语义：
 *   undefined / -1  → 沿用全局（每轮都触发）
 *   0               → 永不自动触发（手动不受影响）
 *   N (N>=1)        → 每 N 条消息触发一次（当前 messageIndex - lastUpdated >= N 时）
 */

import { storage } from '../core/storage-service.js';
import { logger } from '../core/logger-service.js';
import { normalizeIsolationKey, DEFAULT_ISOLATION_KEY } from './table-types.js';

const scheduleStorage = storage.namespace('tableAutoSchedule');

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableAutoSchedule');
  return _log;
}

function _key(chatId, isolationKey, sheetUid) {
  const iso = normalizeIsolationKey(isolationKey || DEFAULT_ISOLATION_KEY);
  return `${String(chatId || '')}::${iso}::${String(sheetUid || '')}`;
}

/**
 * 读取一张表的上次更新状态
 */
export function getTableLastUpdated(chatId, isolationKey, sheetUid) {
  if (!sheetUid) return null;
  const entry = scheduleStorage.get(_key(chatId, isolationKey, sheetUid), null);
  return entry && typeof entry === 'object' ? entry : null;
}

/**
 * 记录一张表已更新到指定 messageIndex
 */
export function recordTableUpdated(chatId, isolationKey, sheetUid, messageIndex) {
  if (!sheetUid) return;
  const idx = Number.isFinite(messageIndex) ? messageIndex : -1;
  scheduleStorage.set(_key(chatId, isolationKey, sheetUid), {
    lastMessageIndex: idx,
    lastUpdatedAt: new Date().toISOString()
  });
}

/**
 * 批量记录多张表（writeback 后用）
 */
export function recordTablesUpdated(chatId, isolationKey, sheetUids = [], messageIndex) {
  for (const uid of sheetUids) {
    recordTableUpdated(chatId, isolationKey, uid, messageIndex);
  }
}

/**
 * 计算 plan：哪些表本轮需要更新
 *
 * @param {Object} ctx
 * @param {string} ctx.chatId
 * @param {string} ctx.isolationKey
 * @param {number} ctx.currentMessageIndex - 当前 assistant message 的索引
 * @param {Array} ctx.scopeTables - 当前 enabled 的表 [{id, uid, updateConfig:{updateFrequency}}]
 * @returns {{shouldUpdate: Set<string>, skipReasons: Object<string,string>}}
 */
export function buildAutoSchedulePlan({ chatId, isolationKey, currentMessageIndex, scopeTables = [] }) {
  const shouldUpdate = new Set();
  const skipReasons = {};

  for (const t of scopeTables) {
    const uid = t?.id || t?.uid || '';
    if (!uid) continue;
    if (t?.enabled === false) {
      skipReasons[uid] = 'disabled';
      continue;
    }

    const freq = t?.updateConfig?.updateFrequency;
    // 沿用全局（undefined / -1）→ 每轮都触发
    if (!Number.isFinite(freq) || freq === -1) {
      shouldUpdate.add(uid);
      continue;
    }
    // 0 → 永不
    if (freq === 0) {
      skipReasons[uid] = 'frequency_zero';
      continue;
    }
    // N >= 1 → 检查 lastUpdated
    if (freq >= 1) {
      const last = getTableLastUpdated(chatId, isolationKey, uid);
      if (!last || !Number.isFinite(last.lastMessageIndex)) {
        // 没记录 → 首次触发
        shouldUpdate.add(uid);
        continue;
      }
      const delta = currentMessageIndex - last.lastMessageIndex;
      if (delta >= freq) {
        shouldUpdate.add(uid);
      } else {
        skipReasons[uid] = `frequency_not_met (${delta}/${freq})`;
      }
    } else {
      shouldUpdate.add(uid);
    }
  }

  getLog().info('buildAutoSchedulePlan', {
    chatId,
    isolationKey,
    currentMessageIndex,
    shouldUpdateCount: shouldUpdate.size,
    skipReasonsCount: Object.keys(skipReasons).length,
    shouldUpdateTables: [...shouldUpdate],
    skipReasons
  });

  return { shouldUpdate, skipReasons };
}

/**
 * 清空一个 chat × isolation 的所有调度记录（chat 重置时用）
 */
export function clearScheduleForChat(chatId, isolationKey) {
  const iso = normalizeIsolationKey(isolationKey || DEFAULT_ISOLATION_KEY);
  const prefix = `${String(chatId || '')}::${iso}::`;
  // storage namespace 没提供前缀清空，遍历 keys 自己删
  try {
    const all = scheduleStorage.getAll ? scheduleStorage.getAll() : {};
    let cleared = 0;
    for (const k of Object.keys(all)) {
      if (k.startsWith(prefix)) {
        scheduleStorage.remove ? scheduleStorage.remove(k) : scheduleStorage.set(k, null);
        cleared++;
      }
    }
    if (cleared > 0) getLog().info('clearScheduleForChat', { chatId, isolationKey: iso, cleared });
  } catch (err) {
    getLog().warn('clearScheduleForChat 失败', err);
  }
}

export default {
  getTableLastUpdated,
  recordTableUpdated,
  recordTablesUpdated,
  buildAutoSchedulePlan,
  clearScheduleForChat
};
