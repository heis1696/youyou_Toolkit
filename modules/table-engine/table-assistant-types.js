/**
 * YouYou Toolkit - AI 改表助手类型与常量
 *
 * 纯常量 + 纯函数，不 import logger/storage。
 * 操作协议（V1）对应 youyou 的 keyed 数据模型（column.key + row.id）。
 */

// ════════════════════════════════════════════════════════════════
// 操作类型常量
// ════════════════════════════════════════════════════════════════

export const ASSISTANT_OP = Object.freeze({
  ADD_TABLE: 'add_table',
  RENAME_TABLE: 'rename_table',
  DELETE_TABLE: 'delete_table',
  MOVE_TABLE: 'move_table',
  PATCH_AI_INSTRUCTIONS: 'patch_table_ai_instructions',
  PATCH_COLUMNS: 'patch_table_columns',
  PATCH_ROWS: 'patch_table_rows',
  PATCH_EXPORT_CONFIG: 'patch_table_export_config',
  PATCH_LOCKS: 'patch_table_locks',
  PATCH_WORKBENCH_CONFIG: 'patch_workbench_config',
});

export const ASSISTANT_PROTOCOL_VERSION = 1;
export const ASSISTANT_MODE = 'modify_current_workbench_incremental';
export const ASSISTANT_DRAFT_TAG = 'assistantDraft';

export const ASSISTANT_AI_INSTRUCTION_KEYS = Object.freeze([
  'note', 'init', 'create', 'update', 'delete',
]);
export const ASSISTANT_AI_INSTRUCTION_KEY_SET = new Set(ASSISTANT_AI_INSTRUCTION_KEYS);

export const ASSISTANT_WORKBENCH_PATCHABLE_KEYS = Object.freeze([
  'contextDepth', 'contextRoles', 'sendLatestRows', 'runScope',
  'mirrorToMessage', 'mirrorTag', 'fillMode', 'autoUpdateEnabled',
  'autoUpdateTrigger',
]);
export const ASSISTANT_WORKBENCH_PATCHABLE_KEY_SET = new Set(ASSISTANT_WORKBENCH_PATCHABLE_KEYS);

export const ASSISTANT_DEFAULT_MAX_ROUNDS = 3;
export const ASSISTANT_DEFAULT_MAX_REPAIR_RETRIES = 1;

// ════════════════════════════════════════════════════════════════
// 会话停止原因
// ════════════════════════════════════════════════════════════════

export const ASSISTANT_SESSION_STOP_REASON = Object.freeze({
  MAX_ROUNDS: 'max_rounds',
  EMPTY_OPERATIONS: 'empty_operations',
  REPEATED_FINGERPRINT: 'repeated_working_fingerprint',
  REPAIR_RETRY_CAPPED: 'repair_retry_capped',
});

export const ASSISTANT_SESSION_ABORT_REASON = Object.freeze({
  CANCELLED: 'cancelled',
  STALE: 'stale',
});

// ════════════════════════════════════════════════════════════════
// 工厂函数
// ════════════════════════════════════════════════════════════════

export function createAssistantEmptyDiff() {
  return {
    addedTables: [],
    deletedTables: [],
    renamedTables: [],
    movedTables: [],
    patchedAiInstructions: [],
    patchedColumns: [],
    patchedRows: [],
    patchedExportConfig: [],
    patchedLocks: [],
    patchedWorkbenchConfig: [],
  };
}

export function createAssistantNoopDraft(baseFingerprint, currentTableId = '') {
  return {
    protocolVersion: ASSISTANT_PROTOCOL_VERSION,
    mode: ASSISTANT_MODE,
    baseFingerprint: baseFingerprint || '',
    summary: '',
    warnings: [],
    operations: [],
    currentTableId: String(currentTableId || ''),
  };
}

/**
 * 创建 session guard controller。
 * version 计数器用于 stale 检测；cancelled 标志用于主动取消。
 */
export function createAssistantSessionGuard() {
  let version = 0;
  let cancelled = false;
  return {
    createRunGuard() {
      const capturedVersion = version;
      return {
        isCancelled: () => cancelled,
        isStale: () => !cancelled && capturedVersion !== version,
      };
    },
    invalidate() {
      version += 1;
    },
    cancel() {
      cancelled = true;
      version += 1;
    },
    reset() {
      cancelled = false;
      version += 1;
    },
  };
}

// ════════════════════════════════════════════════════════════════
// 纯工具函数
// ════════════════════════════════════════════════════════════════

export function cloneAssistantValue(value) {
  if (value === undefined) return value;
  return JSON.parse(JSON.stringify(value));
}

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return '';
  }
}

/**
 * 简单确定性指纹：对 tables 的结构做 JSON 序列化后哈希。
 * 只包含 schema（columns + aiInstructions + exportConfig），不含 rows。
 */
export async function buildAssistantFingerprint(config) {
  if (!config || !Array.isArray(config.tables)) return 'empty';
  const snapshot = config.tables.map((table) => ({
    id: table.id || '',
    name: table.name || '',
    note: table.note || '',
    enabled: table.enabled,
    columns: Array.isArray(table.columns)
      ? table.columns.map((col) => ({
          key: col.key || '',
          title: col.title || '',
          type: col.type || '',
        }))
      : [],
    aiInstructions: table.aiInstructions || {},
    exportConfig: table.exportConfig || {},
  }));
  const json = safeJsonStringify(snapshot);
  const encoder = new TextEncoder();
  const data = encoder.encode(json);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return `yyt-fp:${hashArray.slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('')}`;
}

export function normalizePositiveInt(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  const i = Math.floor(n);
  return i > 0 ? i : fallback;
}

export function normalizeNonNegativeInt(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  const i = Math.floor(n);
  return i >= 0 ? i : fallback;
}

export function trimDraftString(value) {
  return String(value ?? '').trim();
}
