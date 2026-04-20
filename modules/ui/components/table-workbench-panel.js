/**
 * YouYou Toolkit - 填表工作台面板
 * @description 提供最小手动填表 MVP 的配置、执行与状态预览
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

const TABLE_WORKBENCH_VIEWS = ['config', 'runtime', 'preview'];

const PANEL_STYLES = `${TOOL_CONFIG_PANEL_STYLES}
${TABLE_FORM_RENDERER_STYLES}
  .yyt-table-workbench-shell {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .yyt-table-workbench-header {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 18px 20px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.03) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 12px 30px rgba(0, 0, 0, 0.14);
  }

  .yyt-table-workbench-header-main {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
  }

  .yyt-table-workbench-header-copy {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }

  .yyt-table-workbench-title {
    font-size: 18px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-desc,
  .yyt-table-workbench-muted {
    font-size: 12px;
    line-height: 1.72;
    color: rgba(255, 255, 255, 0.7);
  }

  .yyt-table-workbench-header-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-end;
  }

  .yyt-table-workbench-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
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

  .yyt-table-workbench-view-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .yyt-table-workbench-view-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.035);
    color: rgba(255, 255, 255, 0.72);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .yyt-table-workbench-view-button:hover {
    border-color: rgba(123, 183, 255, 0.18);
    color: rgba(255, 255, 255, 0.92);
    background: rgba(123, 183, 255, 0.08);
  }

  .yyt-table-workbench-view-button.active {
    border-color: rgba(123, 183, 255, 0.3);
    background: linear-gradient(180deg, rgba(123, 183, 255, 0.18) 0%, rgba(123, 183, 255, 0.08) 100%);
    color: #eef5ff;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(22, 32, 48, 0.2);
  }

  .yyt-table-workbench-view-pane {
    display: none;
  }

  .yyt-table-workbench-view-pane.active {
    display: block;
  }

  .yyt-table-workbench-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
    gap: 16px;
  }

  .yyt-table-workbench-grid-single {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .yyt-table-workbench-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .yyt-table-workbench-card {
    padding: 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 12px 28px rgba(0, 0, 0, 0.14);
  }

  .yyt-table-workbench-panel-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  .yyt-table-workbench-panel-kicker {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(123, 183, 255, 0.2);
    background: rgba(123, 183, 255, 0.08);
    color: var(--yyt-accent-strong);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.38px;
    text-transform: uppercase;
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

  .yyt-table-workbench-flow {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .yyt-table-workbench-flow .yyt-tool-hero-chip {
    background: rgba(255, 255, 255, 0.08);
  }

  .yyt-table-workbench-action-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-workbench-action-primary {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px;
    border-radius: 18px;
    border: 1px solid rgba(123, 183, 255, 0.16);
    background: radial-gradient(280px 120px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 70%), rgba(123, 183, 255, 0.05);
  }

  .yyt-table-workbench-action-title {
    font-size: 12px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-action-subtitle {
    font-size: 11px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.66);
  }

  .yyt-table-workbench-action-secondary {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 4px;
  }

  .yyt-table-workbench-action-hint {
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px dashed rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.72);
  }

  .yyt-table-workbench-detail-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    min-height: 108px;
  }

  .yyt-table-workbench-empty-state {
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px dashed rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.03);
    min-height: 108px;
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

  .yyt-table-workbench-validation-card {
    padding: 14px 16px;
    border-radius: 18px;
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

  .yyt-table-workbench-config-layout {
    display: grid;
    grid-template-columns: minmax(240px, 0.78fr) minmax(0, 1.6fr) minmax(280px, 0.95fr);
    gap: 16px;
    align-items: start;
  }

  .yyt-table-workbench-config-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .yyt-table-workbench-sidebar-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-workbench-table-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.035);
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .yyt-table-workbench-table-item:hover {
    border-color: rgba(123, 183, 255, 0.18);
    background: rgba(123, 183, 255, 0.08);
  }

  .yyt-table-workbench-table-item.active {
    border-color: rgba(123, 183, 255, 0.34);
    background: linear-gradient(180deg, rgba(123, 183, 255, 0.16) 0%, rgba(123, 183, 255, 0.08) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 28px rgba(18, 26, 40, 0.18);
  }

  .yyt-table-workbench-table-item-head,
  .yyt-table-workbench-table-item-main,
  .yyt-table-workbench-table-item-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .yyt-table-workbench-table-item-main {
    align-items: flex-start;
  }

  .yyt-table-workbench-table-name {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-table-note {
    font-size: 11px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.66);
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

  .yyt-table-workbench-table-order {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.58);
  }

  .yyt-table-workbench-aux-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-workbench-tip-list {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: rgba(255, 255, 255, 0.78);
    font-size: 12px;
    line-height: 1.65;
  }

  .yyt-table-workbench-aux-label {
    font-size: 11px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.62);
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  @media (max-width: 1280px) {
    .yyt-table-workbench-config-layout {
      grid-template-columns: minmax(220px, 0.78fr) minmax(0, 1.4fr);
    }

    .yyt-table-workbench-config-column[data-config-column="aux"] {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 960px) {
    .yyt-table-workbench-config-layout {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media (max-width: 1100px) {
    .yyt-table-workbench-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

function getSchema() {
  return getTableWorkbenchFormSchema({
    apiPresets: getAllPresets()
  });
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

function getTableFieldSchema(schema = []) {
  return (Array.isArray(schema) ? schema : []).find((field) => field?.type === 'tableDefinitions') || {
    name: 'tables',
    label: '表定义',
    description: ''
  };
}

function buildConfigFlowCard() {
  return `
    <div class="yyt-table-workbench-card">
      <div class="yyt-table-workbench-panel-copy">
        <div class="yyt-table-workbench-panel-kicker">Flow</div>
        <div class="yyt-table-workbench-panel-title">怎么用最顺手</div>
        <div class="yyt-table-workbench-panel-desc">平时就按这个顺序来，不用先看诊断细节。</div>
      </div>
      <div class="yyt-table-workbench-flow">
        <span class="yyt-tool-hero-chip">1. 左侧选表</span>
        <span class="yyt-tool-hero-chip">2. 中间改当前表</span>
        <span class="yyt-tool-hero-chip">3. 右侧确认编译与校验</span>
        <span class="yyt-tool-hero-chip">4. 保存后去运行页</span>
      </div>
    </div>
  `;
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
  const more = issues.length > 5 ? `<li>还有 ${issues.length - 5} 条，请先回到“改表格”处理。</li>` : '';
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
  const $preview = $container.find('[data-table-workbench-preview]');

  if (!$preview.length) {
    return;
  }

  if (errors.length > 0) {
    $preview.text(errors.join('\n'));
    return;
  }

  $preview.text(formatJson(values.tables || []));
}

function buildHeader(config = {}) {
  const runtime = config.runtime || {};
  const tableCount = Array.isArray(config.tables) ? config.tables.length : 0;
  const mirrorEnabled = config.mirrorToMessage === true ? '会同步写回正文' : '只保存结构化结果';

  return `
    <div class="yyt-table-workbench-header">
      <div class="yyt-table-workbench-header-main">
        <div class="yyt-table-workbench-header-copy">
          <div class="yyt-table-workbench-panel-kicker">Table Workbench</div>
          <div class="yyt-table-workbench-title">填表工作台</div>
          <div class="yyt-table-workbench-desc">先把表格改好，再去运行页点一次填表；目标和加载细节放到后面单独看，不堵在主界面里。</div>
        </div>
        <div class="yyt-table-workbench-header-actions">
          <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-table-workbench-action="refresh">
            <i class="fa-solid fa-rotate"></i> 刷新状态
          </button>
          <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-table-workbench-action="save-top">
            <i class="fa-solid fa-save"></i> 保存
          </button>
        </div>
      </div>
      <div class="yyt-table-workbench-chip-row">
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-table"></i>${tableCount} 张表</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-hand-pointer"></i>手动填表</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-file-lines"></i>${escapeHtml(mirrorEnabled)}</span>
        <span class="yyt-table-workbench-chip"><i class="fa-solid fa-wave-square"></i>状态 ${escapeHtml(runtime.lastStatus || 'idle')}</span>
      </div>
    </div>
  `;
}

function buildViewNav(activeView) {
  return `
    <div class="yyt-table-workbench-view-nav" role="tablist" aria-label="填表工作台分界面">
      <button class="yyt-table-workbench-view-button ${activeView === 'config' ? 'active' : ''}" data-table-workbench-view-button="config" type="button">
        <i class="fa-solid fa-sliders"></i>
        <span>改表格</span>
      </button>
      <button class="yyt-table-workbench-view-button ${activeView === 'runtime' ? 'active' : ''}" data-table-workbench-view-button="runtime" type="button">
        <i class="fa-solid fa-stethoscope"></i>
        <span>运行</span>
      </button>
      <button class="yyt-table-workbench-view-button ${activeView === 'preview' ? 'active' : ''}" data-table-workbench-view-button="preview" type="button">
        <i class="fa-solid fa-code"></i>
        <span>预览</span>
      </button>
    </div>
  `;
}

function buildTableListCard(tables = [], currentTableIndex = 0) {
  const normalizedIndex = clampCurrentTableIndex(tables, currentTableIndex);

  return `
    <div class="yyt-table-workbench-card">
      <div class="yyt-table-workbench-panel-copy">
        <div class="yyt-table-workbench-panel-kicker">Tables</div>
        <div class="yyt-table-workbench-panel-title">表列表</div>
        <div class="yyt-table-workbench-panel-desc">先在这里切换当前表；顺序调整也尽量在这里做。</div>
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
                <span class="yyt-table-workbench-table-order">第 ${tableIndex + 1} 张</span>
                ${buildMoveControls('table', { 'table-index': tableIndex }, { currentIndex: tableIndex, size: tables.length })}
              </div>
              <div class="yyt-table-workbench-table-item-main">
                <div>
                  <div class="yyt-table-workbench-table-name">${escapeHtml(tableName)}</div>
                  <div class="yyt-table-workbench-table-note">${escapeHtml(note || '未填写说明')}</div>
                </div>
              </div>
              <div class="yyt-table-workbench-table-item-meta">
                <div class="yyt-table-workbench-table-stats">
                  <span class="yyt-table-workbench-stat-chip"><i class="fa-solid fa-table-columns"></i>${columns} 列</span>
                  <span class="yyt-table-workbench-stat-chip"><i class="fa-solid fa-bars-staggered"></i>${rows} 行</span>
                </div>
                ${isActive ? '<span class="yyt-table-workbench-stat-chip"><i class="fa-solid fa-crosshairs"></i>当前</span>' : ''}
              </div>
            </div>
          `;
        }).join('') : `
          <div class="yyt-table-workbench-empty-state">
            <div class="yyt-table-workbench-panel-title">还没有表格</div>
            <div class="yyt-table-workbench-panel-desc">先在中间点“新增表格”，再回来切换焦点。</div>
          </div>
        `}
      </div>
    </div>
  `;
}

function buildConfigAuxiliaryCard(config = {}, draft = {}) {
  const validation = validateTableDraftDeep(draft);
  const runtimeTables = Array.isArray(validation?.tables) ? validation.tables : [];
  const saveTips = [
    '右侧预览展示的是编译后的 runtime tables，不是草稿原样。',
    '有错误时先修正再保存；提示不会阻止保存，但最好先看一眼。',
    'Prompt、API 预设和正文镜像放在下面，不再压住主编辑区。'
  ];

  return `
    <div class="yyt-table-workbench-aux-stack">
      <div class="yyt-table-workbench-card">
        <div class="yyt-table-workbench-panel-copy">
          <div class="yyt-table-workbench-panel-kicker">Validation</div>
          <div class="yyt-table-workbench-panel-title">当前校验摘要</div>
          <div class="yyt-table-workbench-panel-desc">边改边看这里，能尽早发现列名、必填项和单元格格式问题。</div>
        </div>
        ${buildValidationCard(validation)}
      </div>

      <div class="yyt-table-workbench-card">
        <div class="yyt-table-workbench-panel-copy">
          <div class="yyt-table-workbench-panel-kicker">Compiled</div>
          <div class="yyt-table-workbench-panel-title">编译后会保存成这样</div>
          <div class="yyt-table-workbench-panel-desc">这里只做即时确认；完整只读预览仍在“预览”页。</div>
        </div>
        <pre class="yyt-table-workbench-pre" data-table-workbench-preview>${escapeHtml(formatJson(runtimeTables))}</pre>
      </div>

      <div class="yyt-table-workbench-card">
        <div class="yyt-table-workbench-panel-copy">
          <div class="yyt-table-workbench-panel-kicker">Options</div>
          <div class="yyt-table-workbench-panel-title">提示词与保存选项</div>
          <div class="yyt-table-workbench-panel-desc">这些属于辅助配置，集中放在右边，避免打断表格编辑。</div>
        </div>
        ${renderTableAuxiliaryFields(getSchema(), config)}
      </div>

      <div class="yyt-table-workbench-card">
        <div class="yyt-table-workbench-panel-copy">
          <div class="yyt-table-workbench-panel-kicker">Hints</div>
          <div class="yyt-table-workbench-panel-title">保存前快速确认</div>
          <div class="yyt-table-workbench-panel-desc">主要看这几件事就够了。</div>
        </div>
        <ul class="yyt-table-workbench-tip-list">
          ${saveTips.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

function buildConfigView(config = {}, schema, currentTableIndex = 0) {
  const tableField = getTableFieldSchema(schema);
  const draft = {
    tables: Array.isArray(config?.tables) ? config.tables : []
  };
  const validation = validateTableDraftDeep(draft);
  const tables = Array.isArray(validation?.tables) ? validation.tables : [];
  const normalizedIndex = clampCurrentTableIndex(tables, currentTableIndex);

  return `
    <div class="yyt-table-workbench-config-layout">
      <div class="yyt-table-workbench-config-column" data-config-column="sidebar">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-list"></i>
            <span>选表</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">Navigator</div>
            <div class="yyt-table-workbench-panel-title">先选当前要改的表</div>
            <div class="yyt-table-workbench-panel-desc">多表场景下把焦点固定住，减少来回滚动整页。</div>
          </div>
          ${buildTableListCard(tables, normalizedIndex)}
        </div>
        ${buildConfigFlowCard()}
      </div>

      <div class="yyt-table-workbench-config-column" data-config-column="editor">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-pen-to-square"></i>
            <span>改当前表</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">Editor</div>
            <div class="yyt-table-workbench-panel-title">中间只编辑当前表</div>
            <div class="yyt-table-workbench-panel-desc">表头、行和单元格都在这里改；左边切表，右边看反馈。</div>
          </div>
          ${renderTableDefinitionsEditorField(tableField, draft, {
            mode: 'focused',
            currentTableIndex: normalizedIndex,
            description: ''
          })}
        </div>
      </div>

      <div class="yyt-table-workbench-config-column" data-config-column="aux">
        ${buildConfigAuxiliaryCard(config, validation)}
      </div>
    </div>
  `;
}

function buildRuntimeView(config = {}) {
  return `
    <div class="yyt-table-workbench-grid">
      <div class="yyt-table-workbench-stack">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-hand-pointer"></i>
            <span>运行填表</span>
          </div>
          <div class="yyt-tool-manual-area">
            <div class="yyt-tool-runtime-card">
              <div class="yyt-table-workbench-panel-copy">
                <div class="yyt-table-workbench-panel-kicker">Run</div>
                <div class="yyt-table-workbench-panel-title">点这里就会执行一次</div>
                <div class="yyt-table-workbench-panel-desc">它会自动找当前 assistant 楼层，再把这次结果写回去；一般不用理解内部链路。</div>
              </div>
              <div class="yyt-table-workbench-flow">
                <span class="yyt-tool-hero-chip">找当前目标</span>
                <span class="yyt-tool-hero-chip">读取现有表格</span>
                <span class="yyt-tool-hero-chip">请求模型</span>
                <span class="yyt-tool-hero-chip">写回结果</span>
              </div>
            </div>
            <div class="yyt-tool-manual-actions">
              <div class="yyt-table-workbench-action-stack">
                <div class="yyt-table-workbench-action-primary">
                  <div class="yyt-table-workbench-action-title">主操作</div>
                  <div class="yyt-table-workbench-action-subtitle">表格改好后，直接点一次就行。</div>
                  <button class="yyt-btn yyt-btn-primary" data-table-workbench-action="run">
                    <i class="fa-solid fa-play"></i> 立即填表
                  </button>
                </div>
                <div class="yyt-table-workbench-action-secondary">
                  <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="save">
                    <i class="fa-solid fa-save"></i> 先保存
                  </button>
                  <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="refresh">
                    <i class="fa-solid fa-rotate"></i> 刷新状态
                  </button>
                </div>
              </div>
              <div class="yyt-table-workbench-action-hint">如果你刚改过表格，先保存；想确认写到哪条消息，再看右边。</div>
            </div>
          </div>
        </div>

        ${buildRuntimeSummary(config)}
      </div>

      <div class="yyt-table-workbench-stack">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-crosshairs"></i>
            <span>会写到哪里</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">Target</div>
            <div class="yyt-table-workbench-panel-title">当前目标</div>
            <div class="yyt-table-workbench-panel-desc">只有你想核对目标时再看这里。</div>
          </div>
          <div data-table-workbench-target class="yyt-table-workbench-empty-state">正在读取当前 assistant 目标...</div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-database"></i>
            <span>这次从哪份表开始</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">State</div>
            <div class="yyt-table-workbench-panel-title">当前载入内容</div>
            <div class="yyt-table-workbench-panel-desc">看这次是接着已有结果填，还是从模板开始。</div>
          </div>
          <div data-table-workbench-load class="yyt-table-workbench-empty-state">等待诊断结果...</div>
        </div>
      </div>
    </div>
  `;
}

function buildPreviewView(config = {}, variableHelp) {
  return `
    <div class="yyt-table-workbench-grid">
      <div class="yyt-table-workbench-stack">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-table"></i>
            <span>表格预览</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">Preview</div>
            <div class="yyt-table-workbench-panel-title">系统实际会用这份表格</div>
            <div class="yyt-table-workbench-panel-desc">这里只读，主要用来确认顺序和内容有没有跑偏。</div>
          </div>
          <pre class="yyt-table-workbench-pre" data-table-workbench-preview>${escapeHtml(formatJson(config.tables || []))}</pre>
        </div>
      </div>

      <div class="yyt-table-workbench-stack">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-code"></i>
            <span>提示词变量</span>
          </div>
          <div class="yyt-table-workbench-panel-copy">
            <div class="yyt-table-workbench-panel-kicker">Reference</div>
            <div class="yyt-table-workbench-panel-title">写提示词时可用</div>
            <div class="yyt-table-workbench-panel-desc">只有你要改提示词时，才需要看这份速查。</div>
          </div>
          <pre class="yyt-table-workbench-pre">${escapeHtml(variableHelp)}</pre>
        </div>
      </div>
    </div>
  `;
}

function buildMainLayout(config = {}, activeView = 'config', currentTableIndex = 0) {
  const schema = getSchema();
  const variableHelp = variableResolver.getVariableHelp();
  const normalizedView = normalizeWorkbenchView(activeView);

  return `
    <div class="yyt-tool-panel yyt-table-workbench-shell" data-tool-id="tableWorkbench">
      ${buildHeader(config)}
      ${buildViewNav(normalizedView)}
      <div class="yyt-table-workbench-view-pane ${normalizedView === 'config' ? 'active' : ''}" data-table-workbench-view-pane="config">
        ${buildConfigView(config, schema, currentTableIndex)}
      </div>
      <div class="yyt-table-workbench-view-pane ${normalizedView === 'runtime' ? 'active' : ''}" data-table-workbench-view-pane="runtime">
        ${buildRuntimeView(config)}
      </div>
      <div class="yyt-table-workbench-view-pane ${normalizedView === 'preview' ? 'active' : ''}" data-table-workbench-view-pane="preview">
        ${buildPreviewView(config, variableHelp)}
      </div>
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
  const $preview = $container.find('[data-table-workbench-preview]');

  try {
    const targetSnapshot = await resolveLatestTableTarget();
    if (!isContainerValid($container)) return;

    if (!targetSnapshot) {
      $target.html('<div class="yyt-table-workbench-muted">当前没有可用的 assistant 目标。</div>');
      $load.html('<div class="yyt-table-workbench-muted">尚未解析到可执行目标，因此不会加载 bound state。</div>');
      $preview.text(formatJson(config.tables || []));
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
    $preview.text(formatJson(loadResult.state?.tables || []));
  } catch (error) {
    if (!isContainerValid($container)) return;
    $target.html(`<div class="yyt-table-workbench-muted">${escapeHtml(error?.message || '目标诊断失败')}</div>`);
    $load.html('<div class="yyt-table-workbench-muted">无法生成加载诊断。</div>');
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
  currentView: 'config',
  currentTableIndex: 0,

  render() {
    const config = getTableWorkbenchConfig();
    this.currentTableIndex = clampCurrentTableIndex(config.tables, this.currentTableIndex);
    return buildMainLayout(config, this.currentView, this.currentTableIndex);
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;

    const self = this;

    $container.off('.yytTableWorkbench');

    $container.on('click.yytTableWorkbench', '[data-table-workbench-view-button]', (event) => {
      const nextView = $(event.currentTarget).data('tableWorkbenchViewButton');
      self.applyViewState($container, nextView);
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-select-table]', (event) => {
      if ($(event.target).closest('[data-table-editor-action]').length) {
        return;
      }
      const nextIndex = Number.parseInt($(event.currentTarget).attr('data-table-workbench-select-table') || '0', 10);
      const draft = readTableDefinitionsDraft($container.find('[data-table-definition-root]'));
      self.currentTableIndex = clampCurrentTableIndex(draft.tables, nextIndex);
      self.renderTo($container);
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

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="save"], [data-table-workbench-action="save-top"]', () => {
      const saveResult = collectAndSaveConfig($container, { silent: false });
      if (saveResult?.success) {
        self.currentTableIndex = clampCurrentTableIndex(saveResult.config?.tables, self.currentTableIndex);
        self.renderTo($container);
      }
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="refresh"]', () => {
      self.renderTo($container);
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="run"]', async () => {
      self.currentView = 'runtime';
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

  applyViewState($container, nextView) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;

    const resolvedView = normalizeWorkbenchView(nextView);
    this.currentView = resolvedView;

    $container.find('[data-table-workbench-view-button]').removeClass('active');
    $container.find(`[data-table-workbench-view-button="${resolvedView}"]`).addClass('active');
    $container.find('[data-table-workbench-view-pane]').removeClass('active');
    $container.find(`[data-table-workbench-view-pane="${resolvedView}"]`).addClass('active');
  },

  renderTo($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    const currentConfig = getTableWorkbenchConfig();
    this.currentView = normalizeWorkbenchView(this.currentView);
    this.currentTableIndex = clampCurrentTableIndex(currentConfig.tables, this.currentTableIndex);
    $container.html(this.render({}));
    bindTableFormEvents($container, getSchema(), {
      onChange: () => {
        updateCompiledPreview($container);
        const $tableRoot = $container.find('[data-table-definition-root]');
        if ($tableRoot.length) {
          applyDraftValidationState($tableRoot);
        }
      },
      onTableMutation: ({ action, tableIndex, nextTableIndex, draft }) => {
        if (action === 'add-table') {
          this.currentTableIndex = clampCurrentTableIndex(draft?.tables, tableIndex);
          this.renderTo($container);
          return;
        }

        if (action === 'move-table-up' || action === 'move-table-down') {
          this.currentTableIndex = clampCurrentTableIndex(draft?.tables, nextTableIndex);
          this.renderTo($container);
          return;
        }

        if (action === 'delete-table') {
          this.currentTableIndex = clampCurrentTableIndex(draft?.tables, tableIndex);
          this.renderTo($container);
        }
      }
    });
    this.bindEvents($container, {});
    this.applyViewState($container, this.currentView);
    updateCompiledPreview($container);
    const $tableRoot = $container.find('[data-table-definition-root]');
    if ($tableRoot.length) {
      applyDraftValidationState($tableRoot);
    }
    void refreshDiagnostics($container);
  }
};

export default TableWorkbenchPanel;
