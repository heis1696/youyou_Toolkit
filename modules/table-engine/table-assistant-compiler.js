/**
 * YouYou Toolkit - AI 改表助手操作编译器
 *
 * 接收 AI 输出的 draft（结构化操作列表），校验并应用到工作台配置的深拷贝上，
 * 产出 candidateConfig + diff + highRiskItems + lockChanges。
 */

import {
  ASSISTANT_OP,
  ASSISTANT_PROTOCOL_VERSION,
  ASSISTANT_MODE,
  ASSISTANT_AI_INSTRUCTION_KEY_SET,
  ASSISTANT_WORKBENCH_PATCHABLE_KEY_SET,
  ASSISTANT_DRAFT_TAG,
  cloneAssistantValue,
  createAssistantEmptyDiff,
  createAssistantNoopDraft,
} from './table-assistant-types.js';

import {
  createRuntimeTableId,
  createRuntimeTableRowId,
} from './table-types.js';

import {
  sanitizeColumnKey,
  ensureUniqueColumnKey,
} from './table-schema-helpers.js';

// ════════════════════════════════════════════════════════════════
// 内部工具
// ════════════════════════════════════════════════════════════════

function isObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function assertObject(value, label) {
  if (!isObject(value)) throw new Error(`${label} 必须是对象`);
}

function assertNonEmptyString(value, label) {
  const s = String(value ?? '').trim();
  if (!s) throw new Error(`${label} 必须是非空字符串`);
  return s;
}

function ensureTable(config, tableId) {
  const table = config.tables.find((t) => t.id === tableId);
  if (!table) throw new Error(`找不到目标表: ${tableId}`);
  return table;
}

function getColumnKeySet(table) {
  return new Set((table.columns || []).map((c) => c.key).filter(Boolean));
}

function buildDefaultAiInstructions() {
  return { init: '', create: '', update: '', delete: '' };
}

// ════════════════════════════════════════════════════════════════
// Draft 解析 & 校验
// ════════════════════════════════════════════════════════════════

function extractDraftJson(aiText) {
  const tag = ASSISTANT_DRAFT_TAG;
  const pattern = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g');
  const matches = Array.from(String(aiText || '').matchAll(pattern));
  if (!matches.length) {
    throw new Error(`AI 响应中未找到 <${tag}> 标签`);
  }
  return String(matches[matches.length - 1][1] || '').trim();
}

export function parseAssistantDraft(aiText) {
  const jsonText = extractDraftJson(aiText);
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err) {
    throw new Error(`assistant draft JSON 解析失败: ${err?.message || '未知错误'}`);
  }
  return validateAssistantDraft(parsed);
}

export function validateAssistantDraft(draft) {
  assertObject(draft, 'assistant draft');
  if (draft.protocolVersion !== ASSISTANT_PROTOCOL_VERSION) {
    throw new Error(`assistant draft.protocolVersion 必须为 ${ASSISTANT_PROTOCOL_VERSION}`);
  }
  if (draft.mode !== ASSISTANT_MODE) {
    throw new Error(`assistant draft.mode 非法: ${draft.mode}`);
  }
  if (typeof draft.baseFingerprint !== 'string' || !draft.baseFingerprint.trim()) {
    throw new Error('assistant draft.baseFingerprint 缺失');
  }
  if (typeof draft.summary !== 'string') {
    throw new Error('assistant draft.summary 必须是字符串');
  }
  if (!Array.isArray(draft.warnings)) {
    throw new Error('assistant draft.warnings 必须是数组');
  }
  if (!Array.isArray(draft.operations)) {
    throw new Error('assistant draft.operations 必须是数组');
  }

  const allowedOps = new Set(Object.values(ASSISTANT_OP));
  draft.operations.forEach((op, index) => {
    assertObject(op, `operations[${index}]`);
    const opName = String(op.op || '');
    if (!allowedOps.has(opName)) {
      throw new Error(`operations[${index}] 包含不支持的操作: ${opName}`);
    }
    if (opName.startsWith('patch_table_') || opName === ASSISTANT_OP.MOVE_TABLE) {
      assertNonEmptyString(op.tableId, `${opName}.tableId`);
    }
    if (opName === ASSISTANT_OP.RENAME_TABLE) {
      assertNonEmptyString(op.newName, `${opName}.newName`);
    }
    if (opName === ASSISTANT_OP.ADD_TABLE) {
      assertNonEmptyString(op.name, `${opName}.name`);
      if (!Array.isArray(op.columns) || op.columns.length === 0) {
        throw new Error(`${opName} 至少需要一个 column`);
      }
    }
    if (opName.startsWith('patch_table_') && opName !== ASSISTANT_OP.PATCH_LOCKS) {
      assertObject(op.patch, `${opName}.patch`);
    }
  });

  return {
    protocolVersion: ASSISTANT_PROTOCOL_VERSION,
    mode: ASSISTANT_MODE,
    baseFingerprint: String(draft.baseFingerprint || ''),
    summary: String(draft.summary || ''),
    warnings: (draft.warnings || []).map((w) => String(w ?? '')),
    operations: cloneAssistantValue(draft.operations),
    currentTableId: String(draft.currentTableId || ''),
  };
}

// ════════════════════════════════════════════════════════════════
// 操作应用函数
// ════════════════════════════════════════════════════════════════

function applyAddTable(config, op, diff) {
  const name = assertNonEmptyString(op.name, 'add_table.name');
  if (!Array.isArray(op.columns) || op.columns.length === 0) {
    throw new Error('add_table 至少需要一个 column');
  }
  const usedKeys = new Set();
  const columns = op.columns.map((colDesc, idx) => {
    const title = assertNonEmptyString(colDesc.title || colDesc.name, `add_table.columns[${idx}].title`);
    const key = ensureUniqueColumnKey(
      sanitizeColumnKey(title, `col_${idx + 1}`),
      usedKeys
    );
    return {
      key,
      title,
      description: String(colDesc.description ?? ''),
      type: String(colDesc.type || 'text'),
      required: !!colDesc.required,
    };
  });

  const instructions = op.aiInstructions && typeof op.aiInstructions === 'object'
    ? { note: String(op.aiInstructions.note ?? op.note ?? ''),
        init: String(op.aiInstructions.init ?? ''),
        create: String(op.aiInstructions.create ?? ''),
        update: String(op.aiInstructions.update ?? ''),
        delete: String(op.aiInstructions.delete ?? '') }
    : { note: String(op.note ?? ''), ...buildDefaultAiInstructions() };

  const newTable = {
    id: createRuntimeTableId('table'),
    name,
    note: instructions.note,
    enabled: true,
    aiInstructions: {
      init: instructions.init,
      create: instructions.create,
      update: instructions.update,
      delete: instructions.delete,
    },
    columns,
    rows: [],
    exportConfig: {
      enabled: false,
      entryName: name,
      entryType: 'constant',
      splitByRow: false,
      keywords: '',
      injectionTemplate: '',
      preventRecursion: true,
      entryPlacement: { position: 'before_character_definition', depth: 2, order: 0 },
    },
  };

  const insertAfterId = String(op.insertAfterTableId || '').trim();
  if (insertAfterId) {
    const anchorIndex = config.tables.findIndex((t) => t.id === insertAfterId);
    if (anchorIndex === -1) throw new Error(`add_table 的 insertAfterTableId 不存在: ${insertAfterId}`);
    config.tables.splice(anchorIndex + 1, 0, newTable);
  } else {
    config.tables.push(newTable);
  }

  diff.addedTables.push({ tableId: newTable.id, name });
  return newTable.id;
}

function applyRenameTable(config, op, diff) {
  const table = ensureTable(config, op.tableId);
  const beforeName = table.name;
  const afterName = assertNonEmptyString(op.newName, 'rename_table.newName');
  table.name = afterName;
  diff.renamedTables.push({ tableId: op.tableId, beforeName, afterName });
}

function applyDeleteTable(config, op, diff, highRiskItems) {
  const idx = config.tables.findIndex((t) => t.id === op.tableId);
  if (idx === -1) throw new Error(`找不到目标表: ${op.tableId}`);
  const table = config.tables[idx];
  diff.deletedTables.push({ tableId: op.tableId, name: table.name });
  highRiskItems.push({ type: 'delete_table', label: `删除表: ${table.name}` });
  config.tables.splice(idx, 1);
}

function applyMoveTable(config, op, diff) {
  const beforeIndex = config.tables.findIndex((t) => t.id === op.tableId);
  if (beforeIndex === -1) throw new Error(`找不到目标表: ${op.tableId}`);
  const anchorCount = Number(!!op.beforeTableId) + Number(!!op.afterTableId);
  if (anchorCount !== 1) {
    throw new Error('move_table 必须且只能提供 beforeTableId 或 afterTableId 之一');
  }
  const anchorId = op.beforeTableId || op.afterTableId;
  const anchorIndex = config.tables.findIndex((t) => t.id === anchorId);
  if (anchorIndex === -1) throw new Error(`move_table 锚点不存在: ${anchorId}`);
  if (anchorId === op.tableId) throw new Error('move_table 不能以自身为锚点');

  const [table] = config.tables.splice(beforeIndex, 1);
  const nextAnchorIndex = config.tables.findIndex((t) => t.id === anchorId);
  const insertIndex = op.beforeTableId ? nextAnchorIndex : nextAnchorIndex + 1;
  config.tables.splice(insertIndex, 0, table);
  const afterIndex = config.tables.indexOf(table);
  diff.movedTables.push({ tableId: op.tableId, name: table.name, fromIndex: beforeIndex, toIndex: afterIndex });
}

function applyPatchAiInstructions(config, op, diff) {
  const table = ensureTable(config, op.tableId);
  assertObject(op.patch, `${op.op}.patch`);
  const keys = [];
  Object.keys(op.patch).forEach((key) => {
    if (!ASSISTANT_AI_INSTRUCTION_KEY_SET.has(key)) {
      throw new Error(`patch_table_ai_instructions.patch 包含未知字段: ${key}`);
    }
  });
  if (!table.aiInstructions || typeof table.aiInstructions !== 'object') {
    table.aiInstructions = buildDefaultAiInstructions();
  }
  if ('note' in op.patch) {
    table.note = String(op.patch.note ?? '');
    keys.push('note');
  }
  ['init', 'create', 'update', 'delete'].forEach((key) => {
    if (key in op.patch) {
      table.aiInstructions[key] = String(op.patch[key] ?? '');
      keys.push(key);
    }
  });
  if (keys.length) {
    diff.patchedAiInstructions.push({ tableId: op.tableId, name: table.name, keys });
  }
}

function applyPatchColumns(config, op, diff, highRiskItems) {
  const table = ensureTable(config, op.tableId);
  assertObject(op.patch, `${op.op}.patch`);
  const allowedKeys = new Set(['renameColumns', 'addColumns', 'deleteColumns']);
  Object.keys(op.patch).forEach((key) => {
    if (!allowedKeys.has(key)) throw new Error(`patch_table_columns.patch 包含未知字段: ${key}`);
  });

  const changes = [];
  const highRiskLabels = [];

  // rename
  const renames = Array.isArray(op.patch.renameColumns) ? op.patch.renameColumns : [];
  renames.forEach((item, i) => {
    assertObject(item, `renameColumns[${i}]`);
    const fromKey = assertNonEmptyString(item.columnKey, `renameColumns[${i}].columnKey`);
    const col = table.columns.find((c) => c.key === fromKey);
    if (!col) throw new Error(`renameColumns[${i}] 指向不存在的列: ${fromKey}`);
    const newTitle = assertNonEmptyString(item.newTitle, `renameColumns[${i}].newTitle`);
    changes.push(`列改名: ${col.title} -> ${newTitle}`);
    col.title = newTitle;
  });

  // delete
  const deletes = Array.isArray(op.patch.deleteColumns) ? op.patch.deleteColumns : [];
  const deleteKeys = deletes.map((key, i) => {
    const k = assertNonEmptyString(key, `deleteColumns[${i}]`);
    if (!table.columns.some((c) => c.key === k)) throw new Error(`deleteColumns[${i}] 指向不存在的列: ${k}`);
    return k;
  });
  deleteKeys.forEach((key) => {
    table.columns = table.columns.filter((c) => c.key !== key);
    (table.rows || []).forEach((row) => {
      if (row.cells && key in row.cells) delete row.cells[key];
    });
    changes.push(`删除列: ${key}`);
    highRiskLabels.push(`删除列: ${table.name}.${key}`);
  });

  // add
  const adds = Array.isArray(op.patch.addColumns) ? op.patch.addColumns : [];
  const usedKeys = getColumnKeySet(table);
  adds.forEach((item, i) => {
    assertObject(item, `addColumns[${i}]`);
    const title = assertNonEmptyString(item.title || item.name, `addColumns[${i}].title`);
    const key = ensureUniqueColumnKey(
      sanitizeColumnKey(title, `col_${table.columns.length + 1}`),
      usedKeys
    );
    table.columns.push({
      key,
      title,
      description: String(item.description ?? ''),
      type: String(item.type || 'text'),
      required: !!item.required,
    });
    (table.rows || []).forEach((row) => {
      if (row.cells) row.cells[key] = '';
    });
    changes.push(`新增列: ${title} (${key})`);
  });

  if (changes.length) {
    diff.patchedColumns.push({ tableId: op.tableId, name: table.name, changes });
  }
  highRiskLabels.forEach((label) => {
    highRiskItems.push({ type: 'patch_table_columns', label });
  });
}

function applyPatchRows(config, op, diff) {
  const table = ensureTable(config, op.tableId);
  assertObject(op.patch, `${op.op}.patch`);
  const allowedKeys = new Set(['updateCells', 'addRows', 'deleteRowIds']);
  Object.keys(op.patch).forEach((key) => {
    if (!allowedKeys.has(key)) throw new Error(`patch_table_rows.patch 包含未知字段: ${key}`);
  });

  const changes = [];
  const colKeys = (table.columns || []).map((c) => c.key);
  if (!Array.isArray(table.rows)) table.rows = [];

  // updateCells
  const updates = Array.isArray(op.patch.updateCells) ? op.patch.updateCells : [];
  updates.forEach((item, i) => {
    assertObject(item, `updateCells[${i}]`);
    const rowId = assertNonEmptyString(item.rowId, `updateCells[${i}].rowId`);
    const colKey = assertNonEmptyString(item.columnKey, `updateCells[${i}].columnKey`);
    const row = table.rows.find((r) => r.id === rowId);
    if (!row) throw new Error(`updateCells[${i}] 指向不存在的行: ${rowId}`);
    if (!colKeys.includes(colKey)) throw new Error(`updateCells[${i}] 指向不存在的列: ${colKey}`);
    if (!row.cells) row.cells = {};
    row.cells[colKey] = cloneAssistantValue(item.value ?? '');
    changes.push(`改单元格: ${rowId}.${colKey}`);
  });

  // addRows
  const adds = Array.isArray(op.patch.addRows) ? op.patch.addRows : [];
  adds.forEach((item, i) => {
    assertObject(item, `addRows[${i}]`);
    if (!item.cells || typeof item.cells !== 'object') throw new Error(`addRows[${i}].cells 必须是对象`);
    Object.keys(item.cells).forEach((k) => {
      if (!colKeys.includes(k)) throw new Error(`addRows[${i}] 包含未知列: ${k}`);
    });
    const newRow = {
      id: createRuntimeTableRowId('row'),
      name: `行${table.rows.length + 1}`,
      cells: {},
    };
    colKeys.forEach((key) => {
      newRow.cells[key] = key in item.cells ? cloneAssistantValue(item.cells[key]) : '';
    });
    table.rows.push(newRow);
    changes.push(`新增行: ${newRow.id}`);
  });

  // deleteRowIds
  const deletes = Array.isArray(op.patch.deleteRowIds) ? op.patch.deleteRowIds : [];
  const deleteSet = new Set(deletes.map((id) => String(id)));
  if (deleteSet.size) {
    const before = table.rows.length;
    table.rows = table.rows.filter((r) => !deleteSet.has(r.id));
    const removed = before - table.rows.length;
    if (removed > 0) changes.push(`删除 ${removed} 行`);
  }

  if (changes.length) {
    diff.patchedRows.push({ tableId: op.tableId, name: table.name, changes });
  }
}

function applyPatchExportConfig(config, op, diff) {
  const table = ensureTable(config, op.tableId);
  assertObject(op.patch, `${op.op}.patch`);
  if (!table.exportConfig || typeof table.exportConfig !== 'object') {
    table.exportConfig = { enabled: false, entryName: table.name, entryType: 'constant' };
  }
  const allowedKeys = new Set([
    'enabled', 'entryName', 'entryType', 'splitByRow',
    'keywords', 'injectionTemplate', 'preventRecursion',
  ]);
  Object.keys(op.patch).forEach((key) => {
    if (!allowedKeys.has(key)) throw new Error(`patch_table_export_config.patch 包含未知字段: ${key}`);
  });
  Object.entries(op.patch).forEach(([key, value]) => {
    table.exportConfig[key] = cloneAssistantValue(value);
  });
  const keys = Object.keys(op.patch);
  diff.patchedExportConfig.push({ tableId: op.tableId, name: table.name, keys });
}

function applyPatchLocks(config, op, diff) {
  assertObject(op.patch, `${op.op}.patch`);
  const allowedKeys = new Set(['rows', 'columns', 'cells']);
  Object.keys(op.patch).forEach((key) => {
    if (!allowedKeys.has(key)) throw new Error(`patch_table_locks.patch 包含未知字段: ${key}`);
  });

  const table = ensureTable(config, op.tableId);
  const changes = [];
  const lockChange = { tableId: op.tableId, name: table.name, rows: [], columns: [], cells: [] };

  const rowCount = Array.isArray(table.rows) ? table.rows.length : 0;
  const colKeys = getColumnKeySet(table);

  (Array.isArray(op.patch.rows) ? op.patch.rows : []).forEach((item, i) => {
    assertObject(item, `rows[${i}]`);
    if (typeof item.rowIndex !== 'number' || item.rowIndex < 0 || item.rowIndex >= rowCount) {
      throw new Error(`rows[${i}].rowIndex 越界`);
    }
    if (typeof item.locked !== 'boolean') throw new Error(`rows[${i}].locked 必须是布尔值`);
    lockChange.rows.push({ rowIndex: item.rowIndex, locked: item.locked });
    changes.push(`${item.locked ? '锁定' : '解锁'}第${item.rowIndex}行`);
  });

  (Array.isArray(op.patch.columns) ? op.patch.columns : []).forEach((item, i) => {
    assertObject(item, `columns[${i}]`);
    const key = assertNonEmptyString(item.columnKey, `columns[${i}].columnKey`);
    if (!colKeys.has(key)) throw new Error(`columns[${i}] 指向不存在的列: ${key}`);
    if (typeof item.locked !== 'boolean') throw new Error(`columns[${i}].locked 必须是布尔值`);
    lockChange.columns.push({ columnKey: key, locked: item.locked });
    changes.push(`${item.locked ? '锁定' : '解锁'}列: ${key}`);
  });

  (Array.isArray(op.patch.cells) ? op.patch.cells : []).forEach((item, i) => {
    assertObject(item, `cells[${i}]`);
    if (typeof item.rowIndex !== 'number' || item.rowIndex < 0 || item.rowIndex >= rowCount) {
      throw new Error(`cells[${i}].rowIndex 越界`);
    }
    const key = assertNonEmptyString(item.columnKey, `cells[${i}].columnKey`);
    if (!colKeys.has(key)) throw new Error(`cells[${i}] 指向不存在的列: ${key}`);
    if (typeof item.locked !== 'boolean') throw new Error(`cells[${i}].locked 必须是布尔值`);
    lockChange.cells.push({ rowIndex: item.rowIndex, columnKey: key, locked: item.locked });
    changes.push(`${item.locked ? '锁定' : '解锁'}单元格: 行${item.rowIndex}.${key}`);
  });

  if (changes.length) {
    diff.patchedLocks.push({ tableId: op.tableId, name: table.name, changes });
  }
  return lockChange;
}

function applyPatchWorkbenchConfig(config, op, diff, highRiskItems) {
  assertObject(op.patch, `${op.op}.patch`);
  const keys = [];
  Object.keys(op.patch).forEach((key) => {
    if (!ASSISTANT_WORKBENCH_PATCHABLE_KEY_SET.has(key)) {
      throw new Error(`patch_workbench_config.patch 包含未知字段: ${key}`);
    }
    config[key] = cloneAssistantValue(op.patch[key]);
    keys.push(key);
  });
  if (keys.length) {
    diff.patchedWorkbenchConfig.push({ keys });
    highRiskItems.push({ type: 'patch_workbench_config', label: `修改工作台配置: ${keys.join(', ')}` });
  }
}

// ════════════════════════════════════════════════════════════════
// 公开 API
// ════════════════════════════════════════════════════════════════

/**
 * 编译 draft 操作到 candidateConfig。
 * @param {object} input
 * @param {object} input.config - 当前工作台配置
 * @param {object} input.draft - AI 返回的 draft
 * @returns {object} { candidateConfig, diff, highRiskItems, lockChanges, focusTableId }
 */
export function compileAssistantDraft({ config, draft }) {
  if (!isObject(config)) throw new Error('缺少 config');
  if (!isObject(draft) || !Array.isArray(draft.operations)) throw new Error('缺少合法 draft.operations');

  const candidateConfig = cloneAssistantValue(config);
  const diff = createAssistantEmptyDiff();
  const highRiskItems = [];
  const lockChanges = [];
  let focusTableId = config.scope?.activeTableId || '';

  draft.operations.forEach((op) => {
    const opName = String(op.op || '');
    switch (opName) {
      case ASSISTANT_OP.ADD_TABLE: {
        const newId = applyAddTable(candidateConfig, op, diff);
        focusTableId = newId;
        break;
      }
      case ASSISTANT_OP.RENAME_TABLE:
        applyRenameTable(candidateConfig, op, diff);
        break;
      case ASSISTANT_OP.DELETE_TABLE:
        applyDeleteTable(candidateConfig, op, diff, highRiskItems);
        break;
      case ASSISTANT_OP.MOVE_TABLE:
        applyMoveTable(candidateConfig, op, diff);
        break;
      case ASSISTANT_OP.PATCH_AI_INSTRUCTIONS:
        applyPatchAiInstructions(candidateConfig, op, diff);
        break;
      case ASSISTANT_OP.PATCH_COLUMNS:
        applyPatchColumns(candidateConfig, op, diff, highRiskItems);
        break;
      case ASSISTANT_OP.PATCH_ROWS:
        applyPatchRows(candidateConfig, op, diff);
        break;
      case ASSISTANT_OP.PATCH_EXPORT_CONFIG:
        applyPatchExportConfig(candidateConfig, op, diff);
        break;
      case ASSISTANT_OP.PATCH_LOCKS: {
        const lockChange = applyPatchLocks(candidateConfig, op, diff);
        const hasChanges = lockChange.rows.length || lockChange.columns.length || lockChange.cells.length;
        if (hasChanges) lockChanges.push(lockChange);
        break;
      }
      case ASSISTANT_OP.PATCH_WORKBENCH_CONFIG:
        applyPatchWorkbenchConfig(candidateConfig, op, diff, highRiskItems);
        break;
      default:
        throw new Error(`不支持的操作: ${opName}`);
    }
  });

  if (focusTableId && !candidateConfig.tables.some((t) => t.id === focusTableId)) {
    focusTableId = candidateConfig.tables[0]?.id || '';
  }

  return {
    candidateConfig,
    diff,
    highRiskItems,
    lockChanges,
    focusTableId,
  };
}

/**
 * 累积对比编译：对 baseline 和 candidate 做全量 diff（多轮 session 最终汇总用）。
 */
export function buildCumulativeDiff({ baselineConfig, candidateConfig }) {
  const diff = createAssistantEmptyDiff();
  const highRiskItems = [];

  const beforeTables = Array.isArray(baselineConfig?.tables) ? baselineConfig.tables : [];
  const afterTables = Array.isArray(candidateConfig?.tables) ? candidateConfig.tables : [];
  const beforeIds = new Set(beforeTables.map((t) => t.id));
  const afterIds = new Set(afterTables.map((t) => t.id));

  afterTables.forEach((table) => {
    if (!beforeIds.has(table.id)) {
      diff.addedTables.push({ tableId: table.id, name: table.name });
    }
  });

  beforeTables.forEach((table) => {
    if (!afterIds.has(table.id)) {
      diff.deletedTables.push({ tableId: table.id, name: table.name });
      highRiskItems.push({ type: 'delete_table', label: `删除表: ${table.name}` });
    }
  });

  beforeTables.forEach((before) => {
    const after = afterTables.find((t) => t.id === before.id);
    if (!after) return;
    if (before.name !== after.name) {
      diff.renamedTables.push({ tableId: before.id, beforeName: before.name, afterName: after.name });
    }
    const beforeKeys = (before.columns || []).map((c) => c.key).sort().join(',');
    const afterKeys = (after.columns || []).map((c) => c.key).sort().join(',');
    if (beforeKeys !== afterKeys) {
      diff.patchedColumns.push({ tableId: before.id, name: after.name, changes: ['列结构变更'] });
      highRiskItems.push({ type: 'patch_table_columns', label: `列结构变更: ${after.name}` });
    }
  });

  return { diff, highRiskItems };
}
