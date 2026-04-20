/**
 * YouYou Toolkit - 填表工作台面板
 * @description 提供表格优先的填表工作台与次级诊断区
 */

import {
  SCRIPT_ID,
  escapeHtml,
  getJQuery,
  isContainerValid,
  showToast,
  showTopNotice
} from '../utils.js';
import { TOOL_CONFIG_PANEL_STYLES } from './tool-config-panel-factory.js';
import { TABLE_FORM_RENDERER_STYLES, bindTableFormEvents, destroyTableFormEvents, renderTableDefinitionsEditorField, renderTableAuxiliaryFields, readTableDefinitionsDraft, readTableFormValues, applyDraftValidationState, buildMoveControls } from './table-form-renderer.js';
import { variableResolver } from '../../variable-resolver.js';
import { getAllPresets } from '../../preset-manager.js';
import {
  getTableWorkbenchConfig,
  getTableWorkbenchFormSchema,
  saveTableWorkbenchConfig,
  validateTableDraftDeep
} from '../../table-engine/table-schema-service.js';
import { resolveLatestTableTarget } from '../../table-engine/table-target-resolver.js';
import { getAssistantTableSnapshot, loadBoundStateOrTemplate } from '../../table-engine/table-state-service.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';

const PANEL_STYLES = `${TOOL_CONFIG_PANEL_STYLES}
${TABLE_FORM_RENDERER_STYLES}
  .yyt-table-workbench-shell {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .yyt-table-workbench-header {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 0;
  }

  .yyt-table-workbench-muted {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.7);
  }

  .yyt-table-workbench-header-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-end;
  }

  .yyt-table-workbench-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 11px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    font-size: 11px;
    font-weight: 700;
  }

  .yyt-table-workbench-primary {
    display: grid;
    grid-template-columns: minmax(240px, 280px) minmax(0, 1fr);
    gap: 16px;
    align-items: start;
  }

  .yyt-table-workbench-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .yyt-table-workbench-panel-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  .yyt-table-workbench-panel-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-panel-desc {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.68);
  }

  .yyt-table-workbench-sidebar-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-workbench-sidebar-head,
  .yyt-table-workbench-editor-head,
  .yyt-table-workbench-inline-actions,
  .yyt-table-workbench-table-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .yyt-table-workbench-table-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .yyt-table-workbench-table-item:hover {
    border-color: rgba(123, 183, 255, 0.18);
    background: rgba(123, 183, 255, 0.07);
  }

  .yyt-table-workbench-table-item.active {
    border-color: rgba(123, 183, 255, 0.32);
    background: linear-gradient(180deg, rgba(123, 183, 255, 0.15) 0%, rgba(123, 183, 255, 0.08) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 24px rgba(18, 26, 40, 0.18);
  }

  .yyt-table-workbench-table-name {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-table-note {
    font-size: 11px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.62);
  }

  .yyt-table-workbench-table-order {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.56);
  }

  .yyt-table-workbench-table-stats {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .yyt-table-workbench-stat-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 9px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.06);
  }

  .yyt-table-workbench-editor-card {
    min-width: 0;
  }

  .yyt-table-workbench-empty-state {
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px dashed rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.64);
    font-size: 12px;
    line-height: 1.6;
  }

  .yyt-table-workbench-pre {
    margin: 0;
    padding: 14px;
    border-radius: 16px;
    min-height: 220px;
    max-height: 520px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    background: rgba(8, 12, 18, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.92);
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
    line-height: 1.7;
  }

  .yyt-table-workbench-secondary {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-workbench-secondary-item {
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255,255,255,0.03);
    overflow: hidden;
  }

  .yyt-table-workbench-secondary-item > summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    cursor: pointer;
  }

  .yyt-table-workbench-secondary-item > summary::-webkit-details-marker {
    display: none;
  }

  .yyt-table-workbench-secondary-summary-copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .yyt-table-workbench-secondary-summary-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-secondary-summary-desc {
    font-size: 11px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.64);
  }

  .yyt-table-workbench-secondary-summary-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    color: rgba(255, 255, 255, 0.66);
    font-size: 11px;
    font-weight: 700;
  }

  .yyt-table-workbench-secondary-body {
    padding: 0 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-workbench-detail-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    min-height: 108px;
  }

  .yyt-table-workbench-validation-card {
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 196, 87, 0.22);
    background: rgba(255, 196, 87, 0.08);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-workbench-validation-card.yyt-has-error {
    border-color: rgba(255, 100, 100, 0.26);
    background: rgba(255, 100, 100, 0.08);
  }

  .yyt-table-workbench-validation-list {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: rgba(255, 255, 255, 0.84);
    font-size: 12px;
    line-height: 1.6;
  }

  @media (max-width: 1100px) {
    .yyt-table-workbench-primary {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

function getSchema() {
  return getTableWorkbenchFormSchema({
    apiPresets: getAllPresets()
  });
}

function normalizeString(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function formatTimestamp(value) {
  return Number.isFinite(value) && value > 0
    ? new Date(value).toLocaleString()
    : '未记录';
}

function formatJson(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch (_) {
    return String(value ?? '');
  }
}

function clampCurrentTableIndex(tables = [], currentTableIndex = 0) {
  const tableCount = Array.isArray(tables) ? tables.length : 0;
  if (tableCount <= 0) {
    return 0;
  }

  if (!Number.isInteger(currentTableIndex) || currentTableIndex < 0) {
    return 0;
  }

  return Math.min(currentTableIndex, tableCount - 1);
}

function moveArrayItem(items = [], fromIndex = -1, toIndex = -1) {
  if (!Array.isArray(items)) {
    return [];
  }

  if (
    !Number.isInteger(fromIndex)
    || !Number.isInteger(toIndex)
    || fromIndex < 0
    || toIndex < 0
    || fromIndex >= items.length
    || toIndex >= items.length
    || fromIndex === toIndex
  ) {
    return [...items];
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
}

function getTableFieldSchema(schema = []) {
  return (Array.isArray(schema) ? schema : []).find((field) => field?.type === 'tableDefinitions') || {
    name: 'tables',
    label: '表定义',
    description: ''
  };
}

function captureWorkbenchDraft($container, fallbackConfig = {}) {
  const $ = getJQuery();
  const baseConfig = fallbackConfig && typeof fallbackConfig === 'object' ? fallbackConfig : getTableWorkbenchConfig();
  if (!$ || !isContainerValid($container)) {
    return baseConfig;
  }

  const nextConfig = {
    ...baseConfig,
    runtime: baseConfig.runtime || {}
  };

  const $tableRoot = $container.find('[data-table-definition-root]');
  if ($tableRoot.length) {
    const tableDraft = readTableDefinitionsDraft($tableRoot);
    nextConfig.tables = Array.isArray(tableDraft?.tables) ? tableDraft.tables : [];
  }

  const $prompt = $container.find('[data-table-field="promptTemplate"]');
  if ($prompt.length) {
    nextConfig.promptTemplate = String($prompt.val() || '');
  }

  const $apiPreset = $container.find('[data-table-field="apiPreset"]');
  if ($apiPreset.length) {
    nextConfig.apiPreset = String($apiPreset.val() || '');
  }

  const $mirrorToMessage = $container.find('[data-table-field="mirrorToMessage"]');
  if ($mirrorToMessage.length) {
    nextConfig.mirrorToMessage = $mirrorToMessage.is(':checked');
  }

  return nextConfig;
}

function buildValidationCard(validation = {}) {
  const errorCount = Number(validation?.summary?.errorCount) || 0;
  const warningCount = Number(validation?.summary?.warningCount) || 0;
  const issues = Array.isArray(validation?.issues) ? validation.issues : [];
  const title = errorCount > 0
    ? `当前表格有 ${errorCount} 个错误${warningCount > 0 ? `，另有 ${warningCount} 个提示` : ''}`
    : warningCount > 0
      ? `当前表格有 ${warningCount} 个提示`
      : '当前数据质量正常';
  const list = issues.slice(0, 5).map((issue) => `<li>${escapeHtml(issue?.message || '')}</li>`).join('');
  const more = issues.length > 5 ? `<li>还有 ${issues.length - 5} 条，请先修正上面这些。</li>` : '';
  const cardClass = errorCount > 0 ? ' yyt-has-error' : '';

  return `
    <div class="yyt-table-workbench-validation-card${cardClass}">
      <div class="yyt-table-workbench-panel-title">${escapeHtml(title)}</div>
      ${issues.length ? `<ul class="yyt-table-workbench-validation-list">${list}${more}</ul>` : '<div class="yyt-table-workbench-muted">没有发现明显问题。</div>'}
    </div>
  `;
}

function updateCompiledPreview($container) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) return;

  const schema = getSchema();
  const { values, errors } = readTableFormValues($container, schema);
  const $preview = $container.find('[data-table-workbench-compiled-preview]');

  if (!$preview.length) {
    return;
  }

  if (errors.length > 0) {
    $preview.text(errors.join('\n'));
    return;
  }

  $preview.text(formatJson(values.tables || []));
}

function buildHeader() {
  return `
    <div class="yyt-table-workbench-header">
      <div class="yyt-table-workbench-header-actions">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-table-workbench-action="save">
          <i class="fa-solid fa-save"></i> 保存
        </button>
        <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-table-workbench-action="run">
          <i class="fa-solid fa-play"></i> 立即填表
        </button>
      </div>
    </div>
  `;
}

function buildTableListCard(tables = [], currentTableIndex = 0) {
  const normalizedIndex = clampCurrentTableIndex(tables, currentTableIndex);

  return `
    <div>
      <div class="yyt-table-workbench-sidebar-head">
        <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-workbench-action="add-table">
          <i class="fa-solid fa-plus"></i> 新增表格
        </button>
      </div>
      <div class="yyt-table-workbench-sidebar-list">
        ${tables.length ? tables.map((table, tableIndex) => {
          const columns = Array.isArray(table?.columns) ? table.columns.length : 0;
          const rows = Array.isArray(table?.rows) ? table.rows.length : 0;
          const tableName = String(table?.name || '').trim() || `表格 ${tableIndex + 1}`;
          const note = String(table?.note || '').trim();
          const isActive = tableIndex === normalizedIndex;
          return `
            <div class="yyt-table-workbench-table-item ${isActive ? 'active' : ''}" data-table-workbench-select-table="${tableIndex}" role="button" tabindex="0" aria-pressed="${isActive ? 'true' : 'false'}">
              <div class="yyt-table-workbench-table-item-head">
                <div class="yyt-table-workbench-table-name">${escapeHtml(tableName)}</div>
                ${buildMoveControls('table', { 'table-index': tableIndex }, { currentIndex: tableIndex, size: tables.length })}
              </div>
            </div>
          `;
        }).join('') : `
          <div class="yyt-table-workbench-empty-state">还没有表，先新建一张。</div>
        `}
      </div>
    </div>
  `;
}

function buildEditorCard(config = {}, schema = [], currentTableIndex = 0) {
  const tableField = getTableFieldSchema(schema);
  const draft = {
    tables: Array.isArray(config?.tables) ? config.tables : []
  };
  const validation = validateTableDraftDeep(draft);
  const tables = Array.isArray(validation?.tables) ? validation.tables : [];
  const normalizedIndex = clampCurrentTableIndex(tables, currentTableIndex);
  const activeTable = tables[normalizedIndex] || null;
  const currentTableName = normalizeString(activeTable?.name, tables.length ? `表格 ${normalizedIndex + 1}` : '未选择');

  return renderTableDefinitionsEditorField(tableField, draft, {
    mode: 'focused',
    currentTableIndex: normalizedIndex,
    description: ''
  });
}

function buildRuntimeSummary(config = {}) {
  const runtime = config.runtime || {};
  const runtimeStatus = normalizeString(runtime.lastStatus, 'idle');
  const lastRunText = runtime.lastRunAt ? formatTimestamp(runtime.lastRunAt) : '未运行';
  const lastDurationText = Number.isFinite(runtime.lastDurationMs) && runtime.lastDurationMs > 0
    ? `${runtime.lastDurationMs} ms`
    : '未记录';
  const validationSummary = runtime.lastValidationSummary || {};
  const validationText = `${Number(validationSummary.errorCount) || 0} 个错误 / ${Number(validationSummary.warningCount) || 0} 个提示`;
  const lastLoadMode = normalizeString(runtime.lastLoadMode, '未记录');
  const mirrorText = runtime.lastMirrorApplied === true ? '已写回正文' : '未写回正文';
  const lastError = normalizeString(runtime.lastError, '');
  const details = [
    { label: '当前状态', value: runtimeStatus, badge: true },
    { label: '最近运行', value: lastRunText },
    { label: '耗时', value: lastDurationText },
    { label: '成功 / 失败', value: `${Number(runtime.successCount) || 0} / ${Number(runtime.errorCount) || 0}` },
    { label: '最近校验', value: validationText },
    { label: '最近载入模式', value: lastLoadMode },
    { label: '正文镜像', value: mirrorText }
  ];

  return `
    <div class="yyt-tool-runtime-card">
      ${details.map((item) => `
        <div class="yyt-tool-runtime-line${item.error ? ' yyt-tool-runtime-error' : ''}">
          <span class="yyt-tool-runtime-label">${escapeHtml(item.label)}</span>
          ${item.badge
            ? `<span class="yyt-tool-runtime-badge yyt-status-${escapeHtml(item.value)}">${escapeHtml(item.value)}</span>`
            : `<span class="yyt-tool-runtime-value">${escapeHtml(item.value)}</span>`}
        </div>
      `).join('')}
      ${lastError ? `
        <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
          <span class="yyt-tool-runtime-label">最近错误</span>
          <span class="yyt-tool-runtime-value">${escapeHtml(lastError)}</span>
        </div>
      ` : ''}
    </div>
  `;
}

function buildSecondarySection(title, body, options = {}) {
  const meta = options.meta ? `<div class="yyt-table-workbench-secondary-summary-meta">${options.meta}</div>` : '';
  return `
    <details class="yyt-table-workbench-secondary-item" ${options.open ? 'open' : ''}>
      <summary>
        <div class="yyt-table-workbench-secondary-summary-title">${escapeHtml(title)}</div>
        ${meta}
      </summary>
      <div class="yyt-table-workbench-secondary-body">
        ${body}
      </div>
    </details>
  `;
}

function buildSecondarySections(config = {}) {
  const draft = {
    tables: Array.isArray(config?.tables) ? config.tables : []
  };
  const validation = validateTableDraftDeep(draft);
  const variableHelp = variableResolver.getVariableHelp();
  const errorCount = Number(validation?.summary?.errorCount) || 0;
  const warningCount = Number(validation?.summary?.warningCount) || 0;

  return `
    <div class="yyt-table-workbench-secondary">
      ${buildSecondarySection(
        '更多',
        `
          ${buildValidationCard(validation)}
          <pre class="yyt-table-workbench-pre" data-table-workbench-compiled-preview>${escapeHtml(formatJson(validation.tables || []))}</pre>
          ${renderTableAuxiliaryFields(getSchema(), config)}
          ${buildRuntimeSummary(config)}
          <div data-table-workbench-target class="yyt-table-workbench-empty-state">读取目标中...</div>
          <div data-table-workbench-load class="yyt-table-workbench-empty-state">读取诊断中...</div>
          <pre class="yyt-table-workbench-pre" data-table-workbench-load-preview>读取载入内容中...</pre>
          <pre class="yyt-table-workbench-pre">${escapeHtml(variableHelp)}</pre>
        `,
        {
          open: errorCount > 0,
          meta: `<span>${errorCount} 错误</span><span>${warningCount} 提示</span>`
        }
      )}
    </div>
  `;
}

function buildMainLayout(config = {}, currentTableIndex = 0) {
  const schema = getSchema();
  const tables = Array.isArray(config?.tables) ? config.tables : [];
  const normalizedIndex = clampCurrentTableIndex(tables, currentTableIndex);

  return `
    <div class="yyt-tool-panel yyt-table-workbench-shell" data-tool-id="tableWorkbench">
      ${buildHeader(config, normalizedIndex)}
      <div class="yyt-table-workbench-primary">
        <div class="yyt-table-workbench-stack">
          ${buildTableListCard(tables, normalizedIndex)}
        </div>
        <div class="yyt-table-workbench-stack">
          ${buildEditorCard(config, schema, normalizedIndex)}
        </div>
      </div>
      ${buildSecondarySections(config)}
    </div>
  `;
}

function renderDiagnosticList(items = []) {
  if (!items.length) {
    return '<div class="yyt-table-workbench-empty-state"><div class="yyt-table-workbench-muted">暂无可显示内容。</div></div>';
  }

  return `
    <div class="yyt-table-workbench-detail-list">
      ${items.map((item) => `
        <div class="yyt-tool-runtime-line">
          <span class="yyt-tool-runtime-label">${escapeHtml(item.label || '')}</span>
          <span class="yyt-tool-runtime-value">${escapeHtml(item.value || '')}</span>
        </div>
      `).join('')}
    </div>
  `;
}

async function refreshDiagnostics($container) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) return;

  const config = getTableWorkbenchConfig();
  const $target = $container.find('[data-table-workbench-target]');
  const $load = $container.find('[data-table-workbench-load]');
  const $loadPreview = $container.find('[data-table-workbench-load-preview]');

  try {
    const targetSnapshot = await resolveLatestTableTarget();
    if (!isContainerValid($container)) return;

    if (!targetSnapshot) {
      $target.html('<div class="yyt-table-workbench-muted">当前没有可用的 assistant 目标。</div>');
      $load.html('<div class="yyt-table-workbench-muted">尚未解析到可执行目标，因此不会加载 bound state。</div>');
      $loadPreview.text(formatJson(config.tables || []));
      return;
    }

    const assistantSnapshot = getAssistantTableSnapshot(targetSnapshot.sourceMessageId);
    const loadResult = loadBoundStateOrTemplate(targetSnapshot, {
      templateTables: config.tables
    });
    const loadValidation = validateTableDraftDeep({
      tables: Array.isArray(loadResult.state?.tables) ? loadResult.state.tables : []
    });
    const bindings = assistantSnapshot?.tableBindings || {};
    const targetItems = [
      { label: 'sourceMessageId', value: targetSnapshot.sourceMessageId || '未解析' },
      { label: 'sourceSwipeId', value: targetSnapshot.sourceSwipeId || targetSnapshot.effectiveSwipeId || '未解析' },
      { label: 'slotBindingKey', value: targetSnapshot.slotBindingKey || '未解析' },
      { label: 'slotRevisionKey', value: targetSnapshot.slotRevisionKey || '未解析' },
      { label: 'slotTransactionId', value: targetSnapshot.slotTransactionId || '未解析' },
      { label: 'lastResolvedTarget', value: bindings?.lastResolvedTarget?.slotRevisionKey || '未记录' },
      { label: 'lastCommittedTarget', value: bindings?.lastCommittedTarget?.slotRevisionKey || '未记录' }
    ];
    const loadItems = [
      { label: 'loadMode', value: loadResult.loadMode || 'empty' },
      { label: 'mergeBaseOnly', value: loadResult.mergeBaseOnly === true ? 'true' : 'false' },
      { label: 'tables 数量', value: String(Array.isArray(loadResult.state?.tables) ? loadResult.state.tables.length : 0) },
      { label: 'state updatedAt', value: formatTimestamp(loadResult.state?.updatedAt) },
      { label: '数据质量', value: loadValidation.valid ? (loadValidation.summary?.warningCount > 0 ? `0 个错误 / ${loadValidation.summary.warningCount} 个提示` : '正常') : `${loadValidation.summary?.errorCount || 0} 个错误 / ${loadValidation.summary?.warningCount || 0} 个提示` }
    ];

    $target.html(renderDiagnosticList(targetItems));
    $load.html(`${renderDiagnosticList(loadItems)}${buildValidationCard(loadValidation)}`);
    $loadPreview.text(formatJson(loadResult.state?.tables || []));
  } catch (error) {
    if (!isContainerValid($container)) return;
    $target.html(`<div class="yyt-table-workbench-muted">${escapeHtml(error?.message || '目标诊断失败')}</div>`);
    $load.html('<div class="yyt-table-workbench-muted">无法生成加载诊断。</div>');
    $loadPreview.text('无法读取载入内容。');
  }
}

function collectAndSaveConfig($container, { silent = false } = {}) {
  const schema = getSchema();
  const { values, errors } = readTableFormValues($container, schema);
  updateCompiledPreview($container);
  if (errors.length > 0) {
    showTopNotice('warning', errors.join('\n'), {
      duration: 4000,
      noticeId: 'yyt-table-workbench-form-error'
    });
    return {
      success: false,
      errors
    };
  }

  const saveResult = saveTableWorkbenchConfig(values);
  if (!saveResult.success) {
    showToast('error', saveResult.error || '保存失败');
    return saveResult;
  }

  if (!silent) {
    showToast('success', '填表工作台配置已保存');
  }

  return saveResult;
}

export const TableWorkbenchPanel = {
  id: 'tableWorkbenchPanel',
  currentTableIndex: 0,

  render({ config } = {}) {
    const currentConfig = config && typeof config === 'object' ? config : getTableWorkbenchConfig();
    this.currentTableIndex = clampCurrentTableIndex(currentConfig.tables, this.currentTableIndex);
    return buildMainLayout(currentConfig, this.currentTableIndex);
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;

    const self = this;

    $container.off('.yytTableWorkbench');

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="add-table"]', () => {
      const $button = $container.find('[data-table-definition-root] [data-table-editor-action="add-table"]').first();
      if ($button.length) {
        $button.trigger('click');
      }
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-select-table] [data-table-editor-action^="move-table-"]', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const $target = $(event.currentTarget);
      const action = String($target.attr('data-table-editor-action') || '');
      const tableIndex = Number.parseInt($target.attr('data-table-index') || '-1', 10);
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      const tables = Array.isArray(draftConfig.tables) ? draftConfig.tables : [];
      if (!Number.isInteger(tableIndex) || tableIndex < 0 || tableIndex >= tables.length) {
        return;
      }

      const nextIndex = action === 'move-table-up' ? tableIndex - 1 : tableIndex + 1;
      draftConfig.tables = moveArrayItem(tables, tableIndex, nextIndex);
      self.currentTableIndex = clampCurrentTableIndex(draftConfig.tables, nextIndex);
      self.renderTo($container, { config: draftConfig });
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-select-table]', (event) => {
      if ($(event.target).closest('[data-table-editor-action]').length) {
        return;
      }
      const nextIndex = Number.parseInt($(event.currentTarget).attr('data-table-workbench-select-table') || '0', 10);
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      self.currentTableIndex = clampCurrentTableIndex(draftConfig.tables, nextIndex);
      self.renderTo($container, { config: draftConfig });
    });

    $container.on('keydown.yytTableWorkbench', '[data-table-workbench-select-table]', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }
      if ($(event.target).closest('[data-table-editor-action]').length) {
        return;
      }
      event.preventDefault();
      $(event.currentTarget).trigger('click');
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="save"]', () => {
      const saveResult = collectAndSaveConfig($container, { silent: false });
      if (saveResult?.success) {
        self.currentTableIndex = clampCurrentTableIndex(saveResult.config?.tables, self.currentTableIndex);
        self.renderTo($container, { config: saveResult.config });
      }
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="refresh"]', () => {
      self.renderTo($container);
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="run"]', async () => {
      const saveResult = collectAndSaveConfig($container, { silent: true });
      if (!saveResult.success) {
        return;
      }

      try {
        const result = await runManualTableUpdate();
        if (!result?.success) {
          showTopNotice('warning', result?.error || '手动填表失败', {
            duration: 4000,
            noticeId: 'yyt-table-workbench-run-result'
          });
        } else if (result.warning) {
          showTopNotice('warning', `填表已完成，但正文镜像失败：${result.warning}`, {
            duration: 4200,
            noticeId: 'yyt-table-workbench-run-result'
          });
        } else {
          showTopNotice('success', '手动填表完成', {
            duration: 2800,
            noticeId: 'yyt-table-workbench-run-result'
          });
        }
      } catch (error) {
        showToast('error', error?.message || '手动填表失败');
      } finally {
        self.renderTo($container);
      }
    });
  },

  destroy($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    destroyTableFormEvents($container);
    $container.off('.yytTableWorkbench');
  },

  getStyles() {
    return PANEL_STYLES;
  },

  renderTo($container, { config } = {}) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    const renderConfig = config && typeof config === 'object' ? config : getTableWorkbenchConfig();
    this.currentTableIndex = clampCurrentTableIndex(renderConfig.tables, this.currentTableIndex);
    $container.html(this.render({ config: renderConfig }));
    bindTableFormEvents($container, getSchema(), {
      onChange: () => {
        updateCompiledPreview($container);
        const $tableRoot = $container.find('[data-table-definition-root]');
        if ($tableRoot.length) {
          applyDraftValidationState($tableRoot);
        }
      },
      onTableMutation: ({ action, tableIndex, nextTableIndex, draft }) => {
        const nextConfig = captureWorkbenchDraft($container, renderConfig);
        nextConfig.tables = Array.isArray(draft?.tables) ? draft.tables : nextConfig.tables;

        if (action === 'add-table') {
          this.currentTableIndex = clampCurrentTableIndex(nextConfig.tables, tableIndex);
          this.renderTo($container, { config: nextConfig });
          return;
        }

        if (action === 'move-table-up' || action === 'move-table-down') {
          this.currentTableIndex = clampCurrentTableIndex(nextConfig.tables, nextTableIndex);
          this.renderTo($container, { config: nextConfig });
          return;
        }

        if (action === 'delete-table') {
          this.currentTableIndex = clampCurrentTableIndex(nextConfig.tables, tableIndex);
          this.renderTo($container, { config: nextConfig });
        }
      }
    });
    this.bindEvents($container, {});
    updateCompiledPreview($container);
    const $tableRoot = $container.find('[data-table-definition-root]');
    if ($tableRoot.length) {
      applyDraftValidationState($tableRoot);
    }
    void refreshDiagnostics($container);
  }
};

export default TableWorkbenchPanel;
