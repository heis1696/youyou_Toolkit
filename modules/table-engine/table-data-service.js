/**
 * YouYou Toolkit - 填表数据 Provider 适配层
 *
 * 议题 #15 Phase A（修订 PLAN D5）：表格行数据按议题 #9 接入 IToolDataProvider 双轨。
 * Authority SQLite 装了用真 SQL；没装走 FallbackProvider（迷你 SQL 解释器 + JSON）。
 *
 * Schema 设计（自己精简，不抄 shujuku 5 张系统表）：
 *   - table_sheets       — 每 slot × isolation × sheet 一行的元数据（name / columns_json / meta_json）
 *   - table_rows         — sheet 的行数据，按 row_index 主键
 *   - table_locks        — 四级锁（row / column / cell / index_column），按 chat × isolation × sheet × type × target
 *   - table_chat_scope   — chat 级 ScopedConfig 容器（template 三模式 + archives）
 *
 * 约束（fallback-provider 支持的 SQL 子集）：
 *   - WHERE 只能 AND，不能 OR
 *   - 不能 JOIN / GROUP BY / 函数调用
 *   - INSERT 命中 PK 视为 upsert（fallback 行为，跟原生 SQL 不一样但好用）
 *
 * 接入策略：本服务做"镜像 + 未来扩展接入点"。state-service / lock-service / chat-scope-service
 *   会做双写（主路径仍走 message 字段 / storage namespace，同时调本服务持久化到 SQL）。
 *   Authority 用户的 SQLite 会累积数据，未来 #11 数据编辑器 / 剧情推进 / 小剧场 可直接读 SQL。
 */

import { logger } from '../core/logger-service.js';
import { getToolDataProvider, getCurrentProvider, PROVIDER_KIND } from '../core/tool-data-provider.js';
import { DEFAULT_ISOLATION_KEY, normalizeIsolationKey, cloneTableValue } from './table-types.js';

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableDataService');
  return _log;
}

// ════════════════════════════════════════════════════════════════
// Schema migrations
// ════════════════════════════════════════════════════════════════

const MIGRATIONS = Object.freeze([
  {
    id: 'table_engine_v1__sheets',
    statement: `
      CREATE TABLE IF NOT EXISTS table_sheets (
        chat_id TEXT NOT NULL,
        message_id TEXT NOT NULL,
        swipe_id TEXT NOT NULL DEFAULT '0',
        isolation_key TEXT NOT NULL DEFAULT '',
        sheet_uid TEXT NOT NULL,
        name TEXT NOT NULL,
        columns_json TEXT NOT NULL,
        meta_json TEXT,
        order_no INTEGER DEFAULT 0,
        updated_at INTEGER,
        PRIMARY KEY (chat_id, message_id, swipe_id, isolation_key, sheet_uid)
      )
    `.replace(/\s+/g, ' ').trim()
  },
  {
    id: 'table_engine_v1__rows',
    statement: `
      CREATE TABLE IF NOT EXISTS table_rows (
        chat_id TEXT NOT NULL,
        message_id TEXT NOT NULL,
        swipe_id TEXT NOT NULL DEFAULT '0',
        isolation_key TEXT NOT NULL DEFAULT '',
        sheet_uid TEXT NOT NULL,
        row_index INTEGER NOT NULL,
        row_id TEXT,
        row_name TEXT,
        cells_json TEXT NOT NULL,
        PRIMARY KEY (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index)
      )
    `.replace(/\s+/g, ' ').trim()
  },
  {
    id: 'table_engine_v1__locks',
    statement: `
      CREATE TABLE IF NOT EXISTS table_locks (
        chat_id TEXT NOT NULL,
        isolation_key TEXT NOT NULL DEFAULT '',
        sheet_uid TEXT NOT NULL,
        lock_type TEXT NOT NULL,
        target TEXT NOT NULL DEFAULT '',
        PRIMARY KEY (chat_id, isolation_key, sheet_uid, lock_type, target)
      )
    `.replace(/\s+/g, ' ').trim()
  },
  {
    id: 'table_engine_v1__chat_scope',
    statement: `
      CREATE TABLE IF NOT EXISTS table_chat_scope (
        chat_id TEXT NOT NULL,
        scoped_config_json TEXT NOT NULL,
        updated_at INTEGER,
        PRIMARY KEY (chat_id)
      )
    `.replace(/\s+/g, ' ').trim()
  }
]);

// ════════════════════════════════════════════════════════════════
// Init
// ════════════════════════════════════════════════════════════════

let _migrated = false;
let _migratePromise = null;

/**
 * 确保 Provider 已初始化并完成 migration。
 * 幂等，并发调用共享一个 Promise。
 */
export async function ensureTableDataReady() {
  if (_migrated) return getCurrentProvider();
  if (_migratePromise) return _migratePromise;

  _migratePromise = (async () => {
    try {
      const provider = await getToolDataProvider();
      if (!provider) {
        getLog().error('Provider 不可用，跳过 migration');
        return null;
      }
      const result = await provider.migrate({ migrations: [...MIGRATIONS] });
      _migrated = true;
      getLog().info('表格数据 migration 完成', {
        kind: provider.kind,
        applied: result?.applied?.length || 0,
        skipped: result?.skipped?.length || 0
      });
      return provider;
    } catch (err) {
      getLog().error('table-data-service migration 失败', err);
      return null;
    } finally {
      _migratePromise = null;
    }
  })();

  return _migratePromise;
}

/**
 * 同步访问当前 provider（未初始化返回 null）— 用于诊断 / 状态检查
 */
export function getCurrentTableDataProvider() {
  return getCurrentProvider();
}

// ════════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════════

function nowMs() { return Date.now(); }

function safeJsonStringify(value) {
  try { return JSON.stringify(value); } catch (_) { return '{}'; }
}

function safeJsonParse(text, fallback = null) {
  if (typeof text !== 'string') return fallback;
  try { return JSON.parse(text); } catch (_) { return fallback; }
}

function normalizeSlot(slot = {}) {
  return {
    chatId: String(slot.chatId ?? '').trim(),
    messageId: String(slot.messageId ?? '').trim(),
    swipeId: String(slot.swipeId ?? '0').trim() || '0',
    isolationKey: normalizeIsolationKey(slot.isolationKey)
  };
}

function isValidSlot(slot) {
  return slot && slot.chatId && slot.messageId;
}

// ════════════════════════════════════════════════════════════════
// Sheets CRUD
// ════════════════════════════════════════════════════════════════

/**
 * Upsert 单个 sheet 元数据（不含 rows）
 * @param {{chatId, messageId, swipeId?, isolationKey?}} slot
 * @param {{uid, name, columns, meta?, orderNo?}} sheet
 */
export async function upsertSheetMeta(slot, sheet) {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const s = normalizeSlot(slot);
  if (!isValidSlot(s) || !sheet?.uid) return false;

  await provider.execute({
    statement: `INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    params: [
      s.chatId, s.messageId, s.swipeId, s.isolationKey, String(sheet.uid),
      String(sheet.name ?? sheet.uid),
      safeJsonStringify(Array.isArray(sheet.columns) ? sheet.columns : []),
      safeJsonStringify(sheet.meta || sheet.sourceData || {}),
      Number.isFinite(sheet.orderNo) ? sheet.orderNo : 0,
      nowMs()
    ]
  });
  return true;
}

/**
 * 获取 slot 的所有 sheets 元数据
 */
export async function getSheetsBySlot(slot) {
  const provider = await ensureTableDataReady();
  if (!provider) return [];
  const s = normalizeSlot(slot);
  if (!isValidSlot(s)) return [];

  const result = await provider.query({
    statement: `SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,
    params: [s.chatId, s.messageId, s.swipeId, s.isolationKey]
  });
  return (result?.rows || []).map((r) => ({
    uid: r.sheet_uid,
    name: r.name,
    columns: safeJsonParse(r.columns_json, []),
    meta: safeJsonParse(r.meta_json, {}),
    orderNo: r.order_no || 0,
    updatedAt: r.updated_at || 0
  }));
}

/**
 * 删除 slot 的所有 sheets
 */
export async function deleteSheetsBySlot(slot) {
  const provider = await ensureTableDataReady();
  if (!provider) return 0;
  const s = normalizeSlot(slot);
  if (!isValidSlot(s)) return 0;

  const res = await provider.execute({
    statement: `DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,
    params: [s.chatId, s.messageId, s.swipeId, s.isolationKey]
  });
  return res?.rowsAffected || 0;
}

// ════════════════════════════════════════════════════════════════
// Rows CRUD
// ════════════════════════════════════════════════════════════════

/**
 * 批量 upsert sheet 的 rows
 * @param {Slot} slot
 * @param {string} sheetUid
 * @param {Array<{id?, name?, cells?}>} rows
 */
export async function upsertSheetRows(slot, sheetUid, rows) {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const s = normalizeSlot(slot);
  if (!isValidSlot(s) || !sheetUid) return false;
  if (!Array.isArray(rows)) return false;

  // 先删该 sheet 的旧 rows（避免遗留行号 mismatch）
  await provider.execute({
    statement: `DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,
    params: [s.chatId, s.messageId, s.swipeId, s.isolationKey, String(sheetUid)]
  });

  if (rows.length === 0) return true;

  // 批量插入
  const stmts = rows.map((row, idx) => ({
    statement: `INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    params: [
      s.chatId, s.messageId, s.swipeId, s.isolationKey, String(sheetUid),
      idx,
      String(row?.id ?? ''),
      String(row?.name ?? ''),
      safeJsonStringify(row?.cells || {})
    ]
  }));

  // 事务批量提交（Authority 支持，Fallback 顺序执行）
  if (typeof provider.transaction === 'function') {
    await provider.transaction({ statements: stmts });
  } else {
    await provider.batch({ statements: stmts });
  }
  return true;
}

export async function getRowsBySheet(slot, sheetUid) {
  const provider = await ensureTableDataReady();
  if (!provider) return [];
  const s = normalizeSlot(slot);
  if (!isValidSlot(s) || !sheetUid) return [];

  const result = await provider.query({
    statement: `SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,
    params: [s.chatId, s.messageId, s.swipeId, s.isolationKey, String(sheetUid)]
  });
  return (result?.rows || []).map((r) => ({
    id: r.row_id || '',
    name: r.row_name || '',
    cells: safeJsonParse(r.cells_json, {}),
    rowIndex: r.row_index
  }));
}

export async function deleteRowsBySheet(slot, sheetUid) {
  const provider = await ensureTableDataReady();
  if (!provider) return 0;
  const s = normalizeSlot(slot);
  if (!isValidSlot(s) || !sheetUid) return 0;

  const res = await provider.execute({
    statement: `DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,
    params: [s.chatId, s.messageId, s.swipeId, s.isolationKey, String(sheetUid)]
  });
  return res?.rowsAffected || 0;
}

// ════════════════════════════════════════════════════════════════
// Slot 高层 API（组合 sheets + rows）
// ════════════════════════════════════════════════════════════════

/**
 * 加载 slot 的完整 runtime tables（sheets 元数据 + rows 组装）
 * @returns {Promise<Array>} runtime tables [{id, name, columns, rows, meta, orderNo}]
 */
export async function loadSlotTables(slot) {
  const sheets = await getSheetsBySlot(slot);
  if (sheets.length === 0) return [];

  const tables = [];
  for (const sheet of sheets) {
    const rows = await getRowsBySheet(slot, sheet.uid);
    tables.push({
      id: sheet.uid,
      uid: sheet.uid,
      name: sheet.name,
      columns: sheet.columns,
      rows,
      meta: sheet.meta,
      orderNo: sheet.orderNo,
      updatedAt: sheet.updatedAt
    });
  }
  return tables;
}

/**
 * 提交 slot 的完整 tables（重置 sheets + rows）
 * @param {Slot} slot
 * @param {Array<{uid?, id?, name, columns, rows, meta?}>} tables
 */
export async function commitSlotTables(slot, tables) {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const s = normalizeSlot(slot);
  if (!isValidSlot(s)) return false;
  if (!Array.isArray(tables)) return false;

  // 删除 slot 旧数据（sheets + 关联 rows 都会清）
  await deleteSheetsBySlot(s);
  // 由于 rows 外键不存在（fallback 不支持外键），手动清 rows
  await provider.execute({
    statement: `DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,
    params: [s.chatId, s.messageId, s.swipeId, s.isolationKey]
  });

  // 逐表写入
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const uid = String(table?.uid || table?.id || `sheet_${i + 1}`);
    await upsertSheetMeta(s, {
      uid,
      name: table?.name || uid,
      columns: table?.columns || [],
      meta: table?.meta || {},
      orderNo: Number.isFinite(table?.orderNo) ? table.orderNo : i
    });
    await upsertSheetRows(s, uid, Array.isArray(table?.rows) ? table.rows : []);
  }
  return true;
}

/**
 * 清空 slot 的所有表数据（sheets + rows）
 */
export async function clearSlot(slot) {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const s = normalizeSlot(slot);
  if (!isValidSlot(s)) return false;

  await deleteSheetsBySlot(s);
  await provider.execute({
    statement: `DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,
    params: [s.chatId, s.messageId, s.swipeId, s.isolationKey]
  });
  return true;
}

// ════════════════════════════════════════════════════════════════
// Locks CRUD
// ════════════════════════════════════════════════════════════════

/**
 * 获取指定 sheet 在某 scope 的全部锁
 * @returns {Array<{lockType, target}>}
 */
export async function getLocksForSheet(scope, sheetUid) {
  const provider = await ensureTableDataReady();
  if (!provider) return [];
  const chatId = String(scope?.chatId ?? '').trim();
  const isolationKey = normalizeIsolationKey(scope?.isolationKey);
  if (!chatId || !sheetUid) return [];

  const result = await provider.query({
    statement: `SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,
    params: [chatId, isolationKey, String(sheetUid)]
  });
  return (result?.rows || []).map((r) => ({ lockType: r.lock_type, target: r.target || '' }));
}

/**
 * 设置一个锁条目（行 / 列 / 单元格 / 索引列）
 * @param {string} lockType - 'row' | 'column' | 'cell' | 'index_column'
 * @param {string} target - rowIndex 字符串 / columnKey / "rowIndex:columnKey" / ''
 */
export async function setLockEntry(scope, sheetUid, lockType, target = '') {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const chatId = String(scope?.chatId ?? '').trim();
  const isolationKey = normalizeIsolationKey(scope?.isolationKey);
  if (!chatId || !sheetUid || !lockType) return false;

  await provider.execute({
    statement: `INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)`,
    params: [chatId, isolationKey, String(sheetUid), String(lockType), String(target)]
  });
  return true;
}

export async function clearLockEntry(scope, sheetUid, lockType, target = '') {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const chatId = String(scope?.chatId ?? '').trim();
  const isolationKey = normalizeIsolationKey(scope?.isolationKey);
  if (!chatId || !sheetUid || !lockType) return false;

  await provider.execute({
    statement: `DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,
    params: [chatId, isolationKey, String(sheetUid), String(lockType), String(target)]
  });
  return true;
}

export async function clearSheetLocks(scope, sheetUid) {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const chatId = String(scope?.chatId ?? '').trim();
  const isolationKey = normalizeIsolationKey(scope?.isolationKey);
  if (!chatId || !sheetUid) return false;

  await provider.execute({
    statement: `DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,
    params: [chatId, isolationKey, String(sheetUid)]
  });
  return true;
}

export async function clearScopeLocks(scope) {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const chatId = String(scope?.chatId ?? '').trim();
  const isolationKey = normalizeIsolationKey(scope?.isolationKey);
  if (!chatId) return false;

  await provider.execute({
    statement: `DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?`,
    params: [chatId, isolationKey]
  });
  return true;
}

// ════════════════════════════════════════════════════════════════
// Chat Scope CRUD
// ════════════════════════════════════════════════════════════════

export async function getChatScopeConfig(chatId) {
  const provider = await ensureTableDataReady();
  if (!provider) return null;
  const c = String(chatId ?? '').trim();
  if (!c) return null;

  const result = await provider.query({
    statement: `SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?`,
    params: [c]
  });
  const row = result?.rows?.[0];
  if (!row) return null;
  return safeJsonParse(row.scoped_config_json, null);
}

export async function setChatScopeConfig(chatId, scopedConfig) {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const c = String(chatId ?? '').trim();
  if (!c) return false;

  await provider.execute({
    statement: `INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)`,
    params: [c, safeJsonStringify(scopedConfig || {}), nowMs()]
  });
  return true;
}

export async function clearChatScopeConfig(chatId) {
  const provider = await ensureTableDataReady();
  if (!provider) return false;
  const c = String(chatId ?? '').trim();
  if (!c) return false;

  await provider.execute({
    statement: `DELETE FROM table_chat_scope WHERE chat_id = ?`,
    params: [c]
  });
  return true;
}

// ════════════════════════════════════════════════════════════════
// Default export
// ════════════════════════════════════════════════════════════════

export default {
  ensureTableDataReady,
  getCurrentTableDataProvider,
  // sheets
  upsertSheetMeta,
  getSheetsBySlot,
  deleteSheetsBySlot,
  // rows
  upsertSheetRows,
  getRowsBySheet,
  deleteRowsBySheet,
  // slot 高层
  loadSlotTables,
  commitSlotTables,
  clearSlot,
  // locks
  getLocksForSheet,
  setLockEntry,
  clearLockEntry,
  clearSheetLocks,
  clearScopeLocks,
  // chat scope
  getChatScopeConfig,
  setChatScopeConfig,
  clearChatScopeConfig
};
