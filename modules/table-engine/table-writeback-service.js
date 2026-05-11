/**
 * YouYou Toolkit - 填表写回服务
 * @description 负责结构化 table state commit 与可选正文镜像
 */

import { contextInjector } from '../context-injector.js';
import { cloneTableValue } from './table-types.js';
import { commitBoundState } from './table-state-service.js';
import { normalizeTableWorkbenchConfig } from './table-schema-service.js';
import { syncTablesToWorldbook } from './table-worldbook-sync-service.js';

const TABLE_WORKBENCH_MIRROR_TOOL_ID = 'tableWorkbenchMirror';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function hasAnyDataRows(tables = []) {
  return Array.isArray(tables) && tables.some(t =>
    Array.isArray(t?.rows) && t.rows.length > 0
  );
}

function buildMirrorPayload(boundState = {}) {
  return {
    tables: Array.isArray(boundState?.tables) ? cloneTableValue(boundState.tables) : []
  };
}

export function buildTableMirrorContent(boundState = {}, options = {}) {
  const mirrorTag = normalizeString(options.mirrorTag, 'yyt-table-workbench');
  const payload = buildMirrorPayload(boundState);

  return [
    `<${mirrorTag}>`,
    '[填表工作台]',
    '```json',
    JSON.stringify(payload, null, 2),
    '```',
    `</${mirrorTag}>`
  ].join('\n');
}

export async function writeTableState({ targetSnapshot, nextTables, config, loadResult = null, diff = null, fillMode = '' } = {}) {
  if (!hasAnyDataRows(nextTables)) {
    return {
      success: false,
      error: 'AI 返回的表格数据为空，已跳过写入以保护现有数据。',
      commitResult: null,
      mirrorResult: null,
      warning: 'AI 返回的表格数据为空，已跳过写入以保护现有数据。'
    };
  }

  const normalizedConfig = normalizeTableWorkbenchConfig(config);
  const commitResult = await commitBoundState(targetSnapshot, {
    tables: Array.isArray(nextTables) ? cloneTableValue(nextTables) : [],
    meta: {
      lastLoadMode: normalizeString(loadResult?.loadMode, ''),
      lastFillMode: normalizeString(fillMode),
      mergeBaseOnly: false,
      updatedBy: normalizeString(targetSnapshot?.runSource, 'MANUAL_TABLE')
    }
  });

  if (!commitResult?.success) {
    return {
      success: false,
      error: commitResult?.error || 'table_state_commit_failed',
      commitResult,
      mirrorResult: null,
      warning: ''
    };
  }

  let mirrorResult = null;
  let worldbookSyncResult = null;
  let warning = '';

  if (normalizedConfig.mirrorToMessage) {
    const mirrorContent = buildTableMirrorContent(commitResult.state, {
      mirrorTag: normalizedConfig.mirrorTag
    });

    mirrorResult = await contextInjector.injectDetailed(TABLE_WORKBENCH_MIRROR_TOOL_ID, mirrorContent, {
      overwrite: true,
      extractionSelectors: [normalizedConfig.mirrorTag],
      sourceMessageId: commitResult.sourceMessageId,
      sourceSwipeId: targetSnapshot?.sourceSwipeId || targetSnapshot?.effectiveSwipeId,
      effectiveSwipeId: targetSnapshot?.effectiveSwipeId || targetSnapshot?.sourceSwipeId,
      slotBindingKey: targetSnapshot?.slotBindingKey,
      slotRevisionKey: targetSnapshot?.slotRevisionKey,
      slotTransactionId: targetSnapshot?.slotTransactionId,
      traceId: targetSnapshot?.traceId
    });

    if (!mirrorResult?.success) {
      warning = mirrorResult?.error || '正文镜像写回失败';
    }
  }

  if (normalizedConfig.worldbookSync?.enabled) {
    worldbookSyncResult = await syncTablesToWorldbook(
      Array.isArray(nextTables) ? nextTables : [],
      normalizedConfig
    );
    if (worldbookSyncResult && !worldbookSyncResult.success && !worldbookSyncResult.skipped) {
      warning = warning ? `${warning}; ${worldbookSyncResult.error}` : (worldbookSyncResult.error || '世界书同步失败');
    }
  }

  return {
    success: true,
    state: commitResult.state,
    bindings: commitResult.bindings,
    diff,
    fillMode,
    commitResult,
    mirrorResult,
    worldbookSyncResult,
    warning
  };
}

export default {
  buildTableMirrorContent,
  writeTableState
};
