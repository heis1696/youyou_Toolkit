/**
 * YouYou Toolkit - AI 改表助手服务层
 *
 * 负责 prompt 构造、AI 调用、draft 解析、多轮 session 管理。
 * 依赖 api-connection 发请求，依赖 compiler 编译操作。
 */

import { sendWithPreset } from '../api-connection.js';
import { logger } from '../core/logger-service.js';
import { getTableWorkbenchConfig, saveTableWorkbenchConfig } from './table-schema-service.js';
import { getBoundTableState, commitBoundState } from './table-state-service.js';
import { createRuntimeTableRowId, cloneTableValue } from './table-types.js';
import { setRowLock, setColLock, setCellLock } from './table-lock-service.js';
import { tableIsolation } from './table-isolation-service.js';
import {
  parseAssistantDraft,
  compileAssistantDraft,
} from './table-assistant-compiler.js';
import {
  ASSISTANT_OP,
  ASSISTANT_PROTOCOL_VERSION,
  ASSISTANT_MODE,
  ASSISTANT_DRAFT_TAG,
  ASSISTANT_AI_INSTRUCTION_KEY_SET,
  ASSISTANT_DEFAULT_MAX_ROUNDS,
  ASSISTANT_DEFAULT_MAX_REPAIR_RETRIES,
  ASSISTANT_SESSION_STOP_REASON,
  cloneAssistantValue,
  createAssistantNoopDraft,
  createAssistantSessionGuard,
  buildAssistantFingerprint,
  normalizePositiveInt,
  normalizeNonNegativeInt,
  trimDraftString,
} from './table-assistant-types.js';

const log = logger.createScope('TableAssistant');

// ════════════════════════════════════════════════════════════════
// Prompt 构造
// ════════════════════════════════════════════════════════════════

function buildSystemPrompt() {
  return [
    `你是 youyou_Toolkit 填表工作台的改表助手。`,
    `你只能输出一个被 <${ASSISTANT_DRAFT_TAG}> 和 </${ASSISTANT_DRAFT_TAG}> 包裹的 JSON 对象，不能输出解释文本。`,
    `严格使用 protocolVersion=${ASSISTANT_PROTOCOL_VERSION}、mode="${ASSISTANT_MODE}"。`,
    '',
    `顶层 JSON 必须包含: protocolVersion, mode, baseFingerprint, summary, warnings, operations, currentTableId。`,
    `warnings 必须是字符串数组；没有则输出空数组。`,
    '',
    `只允许以下 10 种操作:`,
    ...Object.values(ASSISTANT_OP).map((op) => `  - ${op}`),
    '',
    `每个 operations[i] 必须使用 "op" 字段表示操作名；禁止使用 type/operation/action 等别名。`,
    '',
    '--- add_table ---',
    `必须提供非空 name 和至少一个 columns 项。`,
    `每个 column 至少有 title 字段。`,
    `应尽量同时提供 aiInstructions（init/create/update/delete）让新表立刻可用。`,
    `不要生成 tableId，本地会自动生成。`,
    `如果用户只说"新增某某表"但没给表头，根据表名语义生成合理通用的 columns。`,
    '默认优先 add_table + 完整 aiInstructions；除非用户明确要求 DDL 或字段类型约束，否则不要输出 patch_table_columns 来补列。',
    '',
    '--- patch_table_ai_instructions ---',
    `只允许 patch: { ${[...ASSISTANT_AI_INSTRUCTION_KEY_SET].join(', ')} }。`,
    '',
    '--- patch_table_columns ---',
    `patch 只允许: renameColumns[], addColumns[], deleteColumns[]。`,
    `renameColumns 中用 columnKey（不是 title）定位列，提供 newTitle。`,
    `addColumns 中每个项至少有 title。`,
    `deleteColumns 中是 columnKey 字符串数组。`,
    '',
    '--- patch_table_rows ---',
    `patch 只允许: updateCells[], addRows[], deleteRowIds[]。`,
    `updateCells 用 rowId（不是行号）定位行，用 columnKey 定位列，提供 value。`,
    `addRows 中每个项有 cells: { [columnKey]: value }。`,
    `deleteRowIds 是 rowId 字符串数组。`,
    '',
    '--- patch_table_export_config ---',
    `patch 只允许: enabled, entryName, entryType, splitByRow, keywords, injectionTemplate, preventRecursion。`,
    '',
    '--- patch_table_locks ---',
    `patch 只允许: rows[], columns[], cells[]。`,
    `rows 中用 rowIndex(0-based) + locked(boolean)。`,
    `columns 中用 columnKey + locked(boolean)。`,
    `cells 中用 rowIndex + columnKey + locked(boolean)。`,
    '',
    '--- patch_workbench_config ---',
    `patch 只允许: contextDepth, contextRoles, sendLatestRows, runScope, mirrorToMessage, mirrorTag, fillMode, autoUpdateEnabled, autoUpdateTrigger。`,
    '',
    '--- 通用规则 ---',
    `如果需求信息不足或无法生成合法操作，返回空 operations，summary 说明原因，warnings 写明原因。不要输出追问文本。`,
    `严格禁止任何直接保存行为。`,
    `patch 对象只能填写当前结构里真实存在的 tableId、columnKey、rowId；不要猜测未知字段。`,
    `move_table 只能提供 beforeTableId 或 afterTableId 之一。`,
    '',
    '=== 数据模型语义 ===',
    '',
    '表格 (table) 顶层字段:',
    '  id: 只读，由系统自动生成的唯一标识符。',
    '  name: 表的显示名称（中文）。',
    '  note: 表的用途描述（等同 aiInstructions.note）。',
    '  enabled: boolean，该表是否参与自动填表。',
    '  columns[]: 列定义数组。',
    '  rows[]: 行数据数组。',
    '  aiInstructions{}: AI 操作指令集。',
    '  exportConfig{}: 世界书注入导出配置。',
    '',
    '列 (column) 字段:',
    '  key: 只读，系统从 title 自动派生的唯一标识（中文 title 可能生成 col_1 格式）。',
    '  title: 列标题（面向用户的显示名）。',
    '  description: 列说明。',
    '  type: 列类型枚举 — text | number | boolean | date | json，默认 text。',
    '  required: boolean，该列是否必填。',
    '',
    '行 (row) 字段:',
    '  id: 只读，系统自动生成的唯一标识符（不透明字符串，非数字索引）。',
    '  name: 行标识（如"行1"）。',
    '  cells: { [columnKey]: string }，所有值都是字符串。',
    '',
    'aiInstructions 字段语义:',
    '  note: 表用途描述（影响 AI 对表的理解）。',
    '  init: 初始化指令 — 首次填充时如何生成行。',
    '  create: 新增行指令 — 什么条件下新增一行、格式要求。',
    '  update: 更新行指令 — 什么条件下修改已有行、哪些列可改。',
    '  delete: 删除行指令 — 什么条件下删除行。',
    '',
    'exportConfig 字段语义:',
    '  enabled: boolean，是否将该表数据写入世界书条目。',
    '  entryName: 世界书条目名称。',
    '  entryType: 条目类型枚举 — constant | keyword。',
    '  splitByRow: boolean，是否每行生成独立条目。',
    '  keywords: 触发关键词。',
    '  injectionTemplate: 注入模板（支持 {{columnKey}} 变量）。',
    '  preventRecursion: boolean，默认 true，防止递归注入。',
    '',
    '工作台配置字段值域:',
    '  contextDepth: 0-50，向前读取的消息条数。',
    '  contextRoles: "all" | "assistant_only"，读取哪些角色的消息。',
    '  sendLatestRows: 发送给 AI 的最新 N 行数据（0=全部）。',
    '  runScope: "enabled" | "selected" | "current"，自动填表范围。',
    '  fillMode: "incremental" | "full"，增量或全量填充模式。',
    '  mirrorToMessage: boolean，是否将数据镜像写回消息。',
    '  mirrorTag: 镜像标签名。',
    '  autoUpdateEnabled: boolean，是否启用自动填表。',
    '  autoUpdateTrigger: 自动触发条件。',
    '',
    '=== 操作示例 ===',
    '',
    '示例 1 — add_table（新增表，含完整结构和 AI 指令）:',
    '{',
    '  "op": "add_table",',
    '  "name": "战利品表",',
    '  "columns": [',
    '    { "title": "物品名", "type": "text", "required": true },',
    '    { "title": "稀有度", "type": "text" },',
    '    { "title": "数量", "type": "number" }',
    '  ],',
    '  "aiInstructions": {',
    '    "note": "记录角色获得的战利品",',
    '    "init": "根据剧情内容初始化角色已有的物品",',
    '    "create": "当角色获得新物品时新增行",',
    '    "update": "当物品数量或稀有度变化时更新对应行",',
    '    "delete": "当物品被消耗或丢失时删除对应行"',
    '  }',
    '}',
    '',
    '示例 2 — patch_table_ai_instructions:',
    '{',
    '  "op": "patch_table_ai_instructions",',
    '  "tableId": "table_abc123",',
    '  "patch": { "create": "当新角色登场或新物品获得时新增行", "note": "记录角色物品和战利品" }',
    '}',
    '',
    '示例 3 — patch_table_columns:',
    '{',
    '  "op": "patch_table_columns",',
    '  "tableId": "table_abc123",',
    '  "patch": {',
    '    "renameColumns": [{ "columnKey": "col_1", "newTitle": "物品名称" }],',
    '    "addColumns": [{ "title": "来源", "type": "text" }],',
    '    "deleteColumns": ["col_5"]',
    '  }',
    '}',
    '',
    '=== 注意事项 ===',
    '- columnKey 从 title 自动派生，中文 title 的 key 通常不是中文（如 col_1、col_2）。定位列时务必用 userPrompt 中提供的 column.key 值。',
    '- rowId 是不透明字符串（如 "row_x7k9m2"），不可用行号代替。',
    '- cells 中所有值都是字符串类型，数字也写作 "42"。',
    '- exportConfig.preventRecursion 默认应为 true。',
    '- add_table 不要生成 tableId，本地自动生成。',
    '- 注入模板 injectionTemplate 中用 {{columnKey}} 引用列值。',
  ].join('\n');
}

function buildUserPrompt(input, baseFingerprint, dataContext) {
  const config = input.config;
  const currentTableId = input.currentTableId || '';
  const tables = Array.isArray(config?.tables) ? config.tables : [];
  const currentTable = tables.find((t) => t.id === currentTableId) || null;

  const allTablesSummary = tables.map((table) => ({
    tableId: table.id,
    name: table.name,
    note: table.note || '',
    enabled: table.enabled,
    columns: (table.columns || []).map((col) => ({
      key: col.key,
      title: col.title,
      type: col.type || 'text',
    })),
    aiInstructions: table.aiInstructions || {},
    exportConfig: table.exportConfig || {},
    rowCount: Array.isArray(table.rows) ? table.rows.length : 0,
    rows: dataContext?.[table.id] || undefined,
  }));

  const payload = {
    userRequest: trimDraftString(input.userRequest),
    baseFingerprint,
    currentTableId,
    currentTable: currentTable ? {
      tableId: currentTable.id,
      name: currentTable.name,
      note: currentTable.note || '',
      columns: (currentTable.columns || []).map((col) => ({
        key: col.key,
        title: col.title,
        type: col.type || 'text',
      })),
      aiInstructions: currentTable.aiInstructions || {},
      exportConfig: currentTable.exportConfig || {},
      rowCount: Array.isArray(currentTable.rows) ? currentTable.rows.length : 0,
      rowIds: (currentTable.rows || []).map((r) => r.id),
      rows: dataContext?.[currentTable.id] || undefined,
    } : null,
    allTables: allTablesSummary,
    workbenchConfig: {
      contextDepth: config.contextDepth,
      contextRoles: config.contextRoles,
      sendLatestRows: config.sendLatestRows,
      runScope: config.runScope || config.scope?.mode,
      fillMode: config.fillMode,
      autoUpdateEnabled: config.autoUpdateEnabled,
      mirrorToMessage: config.mirrorToMessage,
    },
  };

  try {
    return JSON.stringify(payload, null, 0);
  } catch {
    return '{}';
  }
}

function buildSessionRoundUserRequest({ userRequest, round, maxRounds, repairReason }) {
  const chunks = [trimDraftString(userRequest)];
  if (round > 1) {
    chunks.push(`补充说明：当前是第 ${round}/${maxRounds} 轮，输入数据已经包含前面轮次产生的草稿结果。请只继续未完成的改动；如果已经无需继续修改，请返回空 operations。`);
  }
  if (repairReason) {
    chunks.push(`修复要求：上一轮草稿未通过本地校验，原因是：${repairReason}。请修复草稿并继续完成需求，仍然只能输出合法 draft JSON。`);
  }
  return chunks.filter(Boolean).join('\n\n');
}

// ════════════════════════════════════════════════════════════════
// 单轮生成
// ════════════════════════════════════════════════════════════════

export async function generateAssistantDraft(input, abortSignal) {
  const config = input.config;
  const userRequest = trimDraftString(input.userRequest);
  if (!userRequest) throw new Error('请输入改表需求');

  const baseFingerprint = await buildAssistantFingerprint(config);
  const messages = [
    { role: 'system', content: buildSystemPrompt() },
    ...(input.priorTurns || []).flatMap((turn) => {
      const result = [];
      if (turn.user) result.push({ role: 'user', content: turn.user });
      if (turn.assistant) result.push({ role: 'assistant', content: turn.assistant });
      return result;
    }),
    { role: 'user', content: buildUserPrompt(input, baseFingerprint, input.dataContext) },
  ];

  const apiPreset = trimDraftString(input.apiPreset || config?.apiPreset);
  const aiRawText = await sendWithPreset(apiPreset || '', messages, {}, abortSignal);
  if (!aiRawText) throw new Error('AI 未返回有效内容');

  let draft;
  try {
    draft = parseAssistantDraft(aiRawText);
  } catch (err) {
    log.error('draft 解析失败', { userRequest, error: err?.message, aiRawText });
    throw err;
  }

  if (draft.baseFingerprint !== baseFingerprint) {
    throw new Error('AI 返回的 baseFingerprint 与当前结构不一致');
  }

  const compileResult = compileAssistantDraft({ config, draft });
  return { draft, aiRawText, messages, compileResult, originalBaseFingerprint: baseFingerprint };
}

// ════════════════════════════════════════════════════════════════
// 多轮 Session
// ════════════════════════════════════════════════════════════════

export async function runAssistantSession(input) {
  const config = input.config;
  const userRequest = trimDraftString(input.userRequest);
  if (!userRequest) throw new Error('请输入改表需求');

  const maxRounds = normalizePositiveInt(input.maxRounds, ASSISTANT_DEFAULT_MAX_ROUNDS);
  const maxRepairRetries = normalizeNonNegativeInt(input.maxRepairRetries, ASSISTANT_DEFAULT_MAX_REPAIR_RETRIES);
  const originalConfig = cloneAssistantValue(config);
  const originalBaseFingerprint = await buildAssistantFingerprint(originalConfig);
  const rounds = [];
  const basePriorTurns = normalizePriorTurns(input.priorTurns);

  let workingConfig = cloneAssistantValue(originalConfig);
  let workingFingerprint = originalBaseFingerprint;
  let stopReason = ASSISTANT_SESSION_STOP_REASON.MAX_ROUNDS;
  let repairRetriesUsed = 0;
  let lastErrorMessage = '';
  let lastResult = null;
  let roundAbortController = null;

  function assertActive() {
    const guard = input.guard;
    if (guard?.isCancelled?.()) throw new AssistantSessionStoppedError('cancelled');
    if (guard?.isStale?.()) throw new AssistantSessionStoppedError('stale');
  }

  function cancelInflightRequest() {
    if (roundAbortController) {
      try { roundAbortController.abort(); } catch { /* ignore */ }
      roundAbortController = null;
    }
  }

  outerLoop:
  for (let round = 1; round <= maxRounds; round += 1) {
    let repairReason = '';
    while (true) {
      assertActive();
      cancelInflightRequest();
      roundAbortController = new AbortController();
      const roundUserRequest = buildSessionRoundUserRequest({
        userRequest, round, maxRounds, repairReason,
      });
      try {
        const historyForRound = [
          ...basePriorTurns,
          ...rounds.map((r) => ({
            user: r.userRequest,
            assistant: r.aiRawText,
          })),
        ];
        const result = await generateAssistantDraft({
          config: workingConfig,
          currentTableId: input.currentTableId,
          userRequest: roundUserRequest,
          priorTurns: historyForRound,
          apiPreset: input.apiPreset,
          dataContext: input.dataContext,
        }, roundAbortController.signal);
        assertActive();
        lastResult = result;
        const hasOps = result.draft.operations.length > 0;
        const nextConfig = hasOps ? cloneAssistantValue(result.compileResult.candidateConfig) : cloneAssistantValue(workingConfig);
        const nextFingerprint = hasOps ? await buildAssistantFingerprint(nextConfig) : workingFingerprint;

        const roundRecord = {
          round,
          userRequest: roundUserRequest,
          draft: result.draft,
          aiRawText: result.aiRawText,
          messages: result.messages,
          perRoundCompileResult: result.compileResult,
          workingFingerprint: nextFingerprint,
        };
        rounds.push(roundRecord);
        input.onRoundComplete?.({ round: cloneAssistantValue(roundRecord), rounds: cloneAssistantValue(rounds), maxRounds });

        if (!hasOps) {
          stopReason = ASSISTANT_SESSION_STOP_REASON.EMPTY_OPERATIONS;
          break outerLoop;
        }

        workingConfig = nextConfig;
        if (nextFingerprint === workingFingerprint) {
          stopReason = ASSISTANT_SESSION_STOP_REASON.REPEATED_FINGERPRINT;
          break outerLoop;
        }

        workingFingerprint = nextFingerprint;
        lastErrorMessage = '';
        if (round === maxRounds) {
          stopReason = ASSISTANT_SESSION_STOP_REASON.MAX_ROUNDS;
          break outerLoop;
        }
        break;
      } catch (err) {
        assertActive();
        if (err instanceof AssistantSessionStoppedError) throw err;
        lastErrorMessage = err?.message || '未知错误';
        if (repairRetriesUsed >= maxRepairRetries) {
          stopReason = ASSISTANT_SESSION_STOP_REASON.REPAIR_RETRY_CAPPED;
          break outerLoop;
        }
        repairRetriesUsed += 1;
        repairReason = lastErrorMessage;
      }
    }
  }

  cancelInflightRequest();

  const compileResult = rounds.length > 0
    ? rounds[rounds.length - 1].perRoundCompileResult
    : compileAssistantDraft({ config: workingConfig, draft: createAssistantNoopDraft(originalBaseFingerprint) });

  const session = {
    originalBaseFingerprint,
    finalWorkingFingerprint: workingFingerprint,
    stopReason,
    roundsExecuted: rounds.length,
    maxRounds,
    repairRetriesUsed,
    maxRepairRetries,
    lastErrorMessage,
  };

  return {
    draft: lastResult?.draft || createAssistantNoopDraft(originalBaseFingerprint, input.currentTableId),
    aiRawText: lastResult?.aiRawText || '',
    messages: lastResult?.messages || [],
    compileResult,
    originalBaseFingerprint,
    rounds,
    session,
    targetSnapshot: input.targetSnapshot || null,
  };
}

// ════════════════════════════════════════════════════════════════
// 辅助
// ════════════════════════════════════════════════════════════════

function normalizePriorTurns(turns) {
  if (!Array.isArray(turns)) return [];
  return turns
    .map((t) => ({ user: trimDraftString(t?.user), assistant: trimDraftString(t?.assistant) }))
    .filter((t) => t.user || t.assistant);
}

class AssistantSessionStoppedError extends Error {
  constructor(reason) {
    super(reason === 'cancelled' ? '改表助手会话已取消' : '改表助手会话已过期');
    this.name = 'AssistantSessionStoppedError';
    this.stopReason = reason;
  }
}

export { AssistantSessionStoppedError };

/**
 * 将 session 的 compileResult 应用到工作台配置。
 * @returns {boolean} 是否成功应用
 */
export async function applyAssistantResult(result) {
  try {
    const fingerprint = await buildAssistantFingerprint(getTableWorkbenchConfig());
    const baseline = result.originalBaseFingerprint || result.draft?.baseFingerprint || '';
    if (!baseline || fingerprint !== baseline) {
      log.warn('applyAssistantResult: fingerprint 不匹配，草稿已过期');
      return false;
    }

    const saveResult = saveTableWorkbenchConfig(result.compileResult.candidateConfig);
    if (saveResult && typeof saveResult === 'object' && saveResult.success === false) {
      log.error('applyAssistantResult: saveTableWorkbenchConfig 失败', saveResult);
      return false;
    }

    if (result.compileResult.lockChanges?.length) {
      const isolationKey = tableIsolation.isEnabled() ? tableIsolation.getKey() : '';
      const scopeCtx = { chatId: '', isolationKey };
      result.compileResult.lockChanges.forEach((change) => {
        change.rows?.forEach((item) => {
          setRowLock(scopeCtx, change.tableId, item.rowIndex, item.locked);
        });
        change.columns?.forEach((item) => {
          setColLock(scopeCtx, change.tableId, item.columnKey, item.locked);
        });
        change.cells?.forEach((item) => {
          setCellLock(scopeCtx, change.tableId, item.rowIndex, item.columnKey, item.locked);
        });
      });
    }

    // 应用行数据到 boundState（收集所有轮次的行操作，不仅最后一轮）
    const allRounds = result.rounds || [];
    const lastRoundHasRowOps = result.compileResult?.diff?.patchedRows?.length > 0;
    const hasRowOps = allRounds.some((r) =>
      r.draft?.operations?.some((o) => o.op === ASSISTANT_OP.PATCH_ROWS),
    );
    if ((hasRowOps || lastRoundHasRowOps) && result.targetSnapshot) {
      await applyRowPatchesToBoundState(result);
    }

    log.info('applyAssistantResult: 草稿已应用', { tables: result.compileResult.candidateConfig?.tables?.length });
    return true;
  } catch (err) {
    log.error('applyAssistantResult 异常', err);
    return false;
  }
}

/**
 * 将 patch_table_rows 操作应用到 boundState。
 * 收集所有轮次的行操作（不仅是最后一轮），顺序应用到 boundState。
 */
async function applyRowPatchesToBoundState(result) {
  const targetSnapshot = result.targetSnapshot;

  // 从所有轮次收集行操作，按轮次顺序
  const allRowOps = [];
  for (const round of (result.rounds || [])) {
    const ops = (round.draft?.operations || []).filter(
      (o) => o.op === ASSISTANT_OP.PATCH_ROWS,
    );
    allRowOps.push(...ops);
  }
  // 兜底：如果 rounds 为空但 final draft 有行操作
  if (!allRowOps.length) {
    const ops = (result.draft?.operations || []).filter(
      (o) => o.op === ASSISTANT_OP.PATCH_ROWS,
    );
    allRowOps.push(...ops);
  }

  if (!allRowOps.length) return;

  try {
    const boundState = getBoundTableState(targetSnapshot);
    if (!boundState?.tables?.length) {
      log.info('applyRowPatchesToBoundState: boundState 为空，跳过行数据应用');
      return;
    }

    const stateTables = cloneTableValue(boundState.tables);

    for (const op of allRowOps) {
      const table = stateTables.find((t) => t.id === op.tableId);
      if (!table) continue;
      if (!Array.isArray(table.rows)) table.rows = [];
      const patch = op.patch;

      if (patch.updateCells?.length) {
        for (const cell of patch.updateCells) {
          const row = table.rows.find((r) => r.id === cell.rowId);
          if (row && cell.columnKey) {
            row.cells = row.cells || {};
            row.cells[cell.columnKey] = String(cell.value ?? '');
          }
        }
      }
      if (patch.addRows?.length) {
        const colKeys = new Set((table.columns || []).map((c) => c.key));
        for (const newRow of patch.addRows) {
          const id = createRuntimeTableRowId('row');
          const safeCells = {};
          for (const [k, v] of Object.entries(newRow.cells || {})) {
            if (colKeys.has(k)) safeCells[k] = String(v ?? '');
          }
          table.rows.push({ id, name: newRow.name || id, cells: safeCells });
        }
      }
      if (patch.deleteRowIds?.length) {
        const deleteSet = new Set(patch.deleteRowIds);
        table.rows = table.rows.filter((r) => !deleteSet.has(r.id));
      }
    }

    await commitBoundState(targetSnapshot, { ...boundState, tables: stateTables }, { skipFreshValidation: true });
    log.info('applyRowPatchesToBoundState: 行数据已应用到 boundState', { ops: allRowOps.length });
  } catch (err) {
    log.error('applyRowPatchesToBoundState 失败', err);
  }
}

export { createAssistantSessionGuard };
