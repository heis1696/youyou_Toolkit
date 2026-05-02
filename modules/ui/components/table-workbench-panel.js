/**
 * YouYou Toolkit - 填表工作台面板
 * @description 表格优先的电子表格式 UI + 次级诊断区（默认收起）
 */

import {
  escapeHtml,
  getJQuery,
  isContainerValid,
  showToast,
  showTopNotice
} from '../utils.js';
import { TOOL_CONFIG_PANEL_STYLES } from './tool-config-panel-factory.js';
import { renderTableAuxiliaryFields } from './table-form-renderer.js';
import { TableCellPopupMenu, getPopupMenuStyles } from './table-cell-popup-menu.js';
import { variableResolver } from '../../variable-resolver.js';
import { getAllPresets } from '../../preset-manager.js';
import {
  getTableWorkbenchConfig,
  getTableWorkbenchFormSchema,
  saveTableWorkbenchConfig,
  validateTableDraftDeep,
  TABLE_FILL_MODE,
  TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS,
  DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE
} from '../../table-engine/table-schema-service.js';
import { resolveLatestTableTarget } from '../../table-engine/table-target-resolver.js';
import { getAssistantTableSnapshot, loadBoundStateOrTemplate } from '../../table-engine/table-state-service.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';

const PANEL_STYLES = `${TOOL_CONFIG_PANEL_STYLES}
${getPopupMenuStyles()}

  .yyt-table-wb-shell {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-wb-header-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .yyt-table-wb-header-bar .spacer {
    flex: 1;
  }

  .yyt-table-wb-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }
  .yyt-table-wb-status-dot.idle { background: rgba(255,255,255,0.3); }
  .yyt-table-wb-status-dot.success { background: #4ade80; }
  .yyt-table-wb-status-dot.error { background: #f87171; }
  .yyt-table-wb-status-dot.running { background: #fbbf24; animation: yyt-pulse 1s ease-in-out infinite; }
  @keyframes yyt-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .yyt-table-wb-tab-bar {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .yyt-table-wb-tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 8px 8px 0 0;
    border: 1px solid transparent;
    background: transparent;
    color: rgba(255,255,255,0.62);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s ease;
  }
  .yyt-table-wb-tab:hover {
    color: rgba(255,255,255,0.88);
    background: rgba(255,255,255,0.04);
  }
  .yyt-table-wb-tab.active {
    color: var(--yyt-text);
    background: rgba(123,183,255,0.12);
    border-color: rgba(123,183,255,0.22);
    border-bottom-color: transparent;
  }
  .yyt-table-wb-tab-add {
    color: rgba(123,183,255,0.72);
    font-weight: 800;
    padding: 6px 10px;
  }
  .yyt-table-wb-tab-delete {
    opacity: 0;
    font-size: 14px;
    line-height: 1;
    margin-left: -2px;
    transition: opacity 0.15s;
  }
  .yyt-table-wb-tab:hover .yyt-table-wb-tab-delete { opacity: 0.6; }
  .yyt-table-wb-tab-delete:hover { opacity: 1 !important; color: #f87171; }

  .yyt-table-wb-grid-area {
    overflow-x: auto;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.02);
  }

  .yyt-table-wb-grid {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    min-width: 600px;
  }

  .yyt-table-wb-grid th {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 8px 10px;
    background: rgba(18,22,30,0.96);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.72);
    font-weight: 700;
    font-size: 11px;
    text-align: left;
    white-space: nowrap;
    user-select: none;
  }
  .yyt-table-wb-grid th .col-type-tag {
    font-weight: 400;
    font-size: 10px;
    color: rgba(255,255,255,0.42);
    margin-left: 4px;
  }
  .yyt-table-wb-grid th .col-req-mark {
    color: #f87171;
    margin-left: 2px;
  }

  .yyt-table-wb-grid td {
    padding: 4px 6px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    vertical-align: middle;
  }

  .yyt-table-wb-grid td.row-name-cell {
    min-width: 100px;
  }

  .yyt-table-wb-grid td.action-cell {
    width: 64px;
    text-align: right;
    white-space: nowrap;
  }

  .yyt-table-wb-grid input[type="text"],
  .yyt-table-wb-grid input[type="number"] {
    width: 100%;
    padding: 5px 8px;
    border: 1px solid transparent;
    border-radius: 6px;
    background: rgba(255,255,255,0.03);
    color: var(--yyt-text);
    font-size: 12px;
    font-family: inherit;
    transition: border-color 0.15s, background 0.15s;
    box-sizing: border-box;
  }
  .yyt-table-wb-grid input:focus {
    outline: none;
    border-color: rgba(123,183,255,0.4);
    background: rgba(123,183,255,0.06);
    box-shadow: 0 0 0 2px rgba(123,183,255,0.15);
  }
  .yyt-table-wb-grid input:hover:not(:focus) {
    border-color: rgba(255,255,255,0.08);
  }

  .yyt-table-wb-grid select {
    padding: 5px 8px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    background: rgba(255,255,255,0.05);
    color: var(--yyt-text);
    font-size: 11px;
    font-family: inherit;
    cursor: pointer;
  }

  .yyt-table-wb-grid .row-delete-btn {
    background: none;
    border: none;
    color: rgba(255,255,255,0.3);
    cursor: pointer;
    padding: 4px 6px;
    border-radius: 4px;
    font-size: 13px;
    transition: color 0.15s, background 0.15s;
  }
  .yyt-table-wb-grid .row-delete-btn:hover {
    color: #f87171;
    background: rgba(248,113,113,0.1);
  }

  .yyt-table-wb-add-row {
    display: block;
    width: 100%;
    padding: 8px;
    border: 1px dashed rgba(255,255,255,0.1);
    border-radius: 0 0 10px 10px;
    background: rgba(255,255,255,0.01);
    color: rgba(255,255,255,0.5);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
  }
  .yyt-table-wb-add-row:hover {
    background: rgba(123,183,255,0.06);
    border-color: rgba(123,183,255,0.2);
    color: rgba(123,183,255,0.8);
  }

  .yyt-table-wb-footer {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 11px;
    color: rgba(255,255,255,0.5);
  }

  .yyt-table-wb-diagnostics {
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.015);
  }
  .yyt-table-wb-diagnostics > summary {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.55);
    user-select: none;
  }
  .yyt-table-wb-diagnostics > summary::-webkit-details-marker { display: none; }
  .yyt-table-wb-diagnostics > summary:hover { color: rgba(255,255,255,0.8); }
  .yyt-table-wb-diagnostics-body {
    padding: 0 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-wb-pre {
    margin: 0;
    padding: 12px;
    border-radius: 8px;
    max-height: 300px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    background: rgba(8,12,18,0.72);
    border: 1px solid rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.88);
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 11px;
    line-height: 1.6;
  }

  .yyt-table-wb-empty {
    padding: 20px;
    text-align: center;
    color: rgba(255,255,255,0.4);
    font-size: 13px;
  }

  .yyt-table-wb-small-label {
    font-size: 10px;
    font-weight: 700;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .yyt-table-wb-inline-select {
    padding: 4px 8px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    background: rgba(255,255,255,0.05);
    color: var(--yyt-text);
    font-size: 11px;
    font-family: inherit;
  }

  .yyt-cell-new { background: rgba(74,222,128,0.15) !important; }
  .yyt-cell-updated { background: rgba(96,165,250,0.15) !important; }
  .yyt-cell-deleted { background: rgba(248,113,113,0.15) !important; text-decoration: line-through; }
  .yyt-cell-locked { position: relative; }
  .yyt-cell-locked::after {
    content: '\\1F512';
    position: absolute;
    top: 2px;
    right: 4px;
    font-size: 8px;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    .yyt-table-wb-grid-area { border-radius: 0; border-left: none; border-right: none; }
    .yyt-table-wb-grid th, .yyt-table-wb-grid td { padding: 4px 6px; font-size: 11px; }
  }
`;

function getSchema() {
  return getTableWorkbenchFormSchema({ apiPresets: getAllPresets() });
}

function normalizeString(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function formatJson(value) {
  try { return JSON.stringify(value, null, 2); } catch (_) { return String(value ?? ''); }
}

function clampCurrentTableIndex(tables = [], idx = 0) {
  const len = Array.isArray(tables) ? tables.length : 0;
  if (len <= 0) return 0;
  if (!Number.isInteger(idx) || idx < 0) return 0;
  return Math.min(idx, len - 1);
}

function captureWorkbenchDraft($container, fallbackConfig = {}) {
  const $ = getJQuery();
  const baseConfig = fallbackConfig && typeof fallbackConfig === 'object' ? fallbackConfig : getTableWorkbenchConfig();
  if (!$ || !isContainerValid($container)) return baseConfig;

  const nextConfig = { ...baseConfig, runtime: baseConfig.runtime || {} };

  const $prompt = $container.find('[data-table-field="promptTemplate"]');
  if ($prompt.length) nextConfig.promptTemplate = String($prompt.val() || '');

  const $apiPreset = $container.find('[data-table-field="apiPreset"]');
  if ($apiPreset.length) nextConfig.apiPreset = String($apiPreset.val() || '');

  const $fillMode = $container.find('[data-table-field="fillMode"]');
  if ($fillMode.length) nextConfig.fillMode = String($fillMode.val() || '');

  const $mirror = $container.find('[data-table-field="mirrorToMessage"]');
  if ($mirror.length) nextConfig.mirrorToMessage = $mirror.is(':checked');

  const $tableName = $container.find('[data-table-wb-name]');
  const $tableNote = $container.find('[data-table-wb-note]');
  const tables = Array.isArray(baseConfig.tables) ? [...baseConfig.tables] : [];
  const ti = clampCurrentTableIndex(tables, nextConfig.__activeTableIndex ?? 0);

  if (tables[ti]) {
    const table = { ...tables[ti] };
    if ($tableName.length) table.name = String($tableName.val() || '').trim();
    if ($tableNote.length) table.note = String($tableNote.val() || '').trim();

    table.columns = Array.isArray(table.columns) ? [...table.columns] : [];
    table.rows = Array.isArray(table.rows) ? [...table.rows] : [];

    const $colRows = $container.find('[data-table-wb-col-row]');
    table.columns = [];
    $colRows.each(function () {
      const $row = $(this);
      const key = String($row.attr('data-col-key') || '');
      const title = String($row.find('[data-col-field="title"]').val() || '').trim();
      const type = String($row.find('[data-col-field="type"]').val() || 'text');
      const required = $row.find('[data-col-field="required"]').is(':checked');
      const description = String($row.find('[data-col-field="description"]').val() || '').trim();
      if (key || title) {
        table.columns.push({ key, title, type, required, description });
      }
    });

    const $dataRows = $container.find('[data-table-wb-data-row]');
    table.rows = [];
    $dataRows.each(function () {
      const $row = $(this);
      const name = String($row.find('[data-cell-field="name"]').val() || '').trim();
      const cells = {};
      table.columns.forEach(col => {
        const $cell = $row.find(`[data-cell-field="${col.key}"]`);
        if ($cell.length) {
          cells[col.key] = String($cell.val() || '');
        }
      });
      table.rows.push({ name, cells });
    });

    tables[ti] = table;
  }

  nextConfig.tables = tables;
  return nextConfig;
}

function buildHeader(config) {
  const runtime = config?.runtime || {};
  const status = normalizeString(runtime.lastStatus, 'idle');

  return `
    <div class="yyt-table-wb-header-bar">
      <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-table-workbench-action="save">
        <i class="fa-solid fa-save"></i> 保存
      </button>
      <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-table-workbench-action="run">
        <i class="fa-solid fa-play"></i> 立即填表
      </button>
      <div class="spacer"></div>
      <span class="yyt-table-wb-small-label">模式</span>
      <select class="yyt-table-wb-inline-select" data-table-field="fillMode">
        <option value="${TABLE_FILL_MODE.INCREMENTAL}" ${config.fillMode !== TABLE_FILL_MODE.FULL ? 'selected' : ''}>增量</option>
        <option value="${TABLE_FILL_MODE.FULL}" ${config.fillMode === TABLE_FILL_MODE.FULL ? 'selected' : ''}>全量</option>
      </select>
      <span class="yyt-table-wb-status-dot ${status}" title="运行状态: ${status}"></span>
    </div>
  `;
}

function buildTabBar(tables, currentIndex) {
  const items = Array.isArray(tables) ? tables : [];
  return `
    <div class="yyt-table-wb-tab-bar">
      ${items.map((t, i) => {
        const name = normalizeString(t?.name, `表格 ${i + 1}`);
        const active = i === currentIndex ? ' active' : '';
        return `
          <button class="yyt-table-wb-tab${active}" data-table-workbench-select-table="${i}" title="${escapeHtml(name)}">
            ${escapeHtml(name)}
            <span class="yyt-table-wb-tab-delete" data-table-workbench-action="delete-table" data-table-index="${i}">&times;</span>
          </button>
        `;
      }).join('')}
      <button class="yyt-table-wb-tab yyt-table-wb-tab-add" data-table-workbench-action="add-table">+ 新增</button>
    </div>
  `;
}

function buildTableGrid(table, tableIndex) {
  if (!table) return '<div class="yyt-table-wb-empty">选择或新建一张表格</div>';

  const columns = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];
  const name = normalizeString(table.name, `表格 ${tableIndex + 1}`);
  const note = normalizeString(table.note, '');

  const typeLabels = {};
  TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS.forEach(opt => { typeLabels[opt.value] = opt.label; });

  let html = '';

  html += `
    <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;flex-wrap:wrap;border-bottom:1px solid rgba(255,255,255,0.06);">
      <input type="text" data-table-wb-name value="${escapeHtml(name)}" placeholder="表名" style="width:180px;padding:5px 8px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;background:rgba(255,255,255,0.03);color:var(--yyt-text);font-size:12px;font-family:inherit;">
      <input type="text" data-table-wb-note value="${escapeHtml(note)}" placeholder="备注（可选）" style="flex:1;min-width:120px;padding:5px 8px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;background:rgba(255,255,255,0.03);color:var(--yyt-text);font-size:12px;font-family:inherit;">
    </div>
  `;

  html += '<div class="yyt-table-wb-grid-area"><table class="yyt-table-wb-grid"><thead><tr>';

  columns.forEach(col => {
    const typeLabel = typeLabels[col.type] || '文本';
    html += `
      <th>
        ${escapeHtml(col.title || col.key || '列')}
        <span class="col-type-tag">${escapeHtml(typeLabel)}</span>
        ${col.required ? '<span class="col-req-mark">*</span>' : ''}
      </th>
    `;
  });
  html += '<th style="width:80px;">操作</th></tr></thead><tbody>';

  if (rows.length === 0) {
    const colSpan = columns.length + 1;
    html += `<tr><td colspan="${colSpan}" class="yyt-table-wb-empty" style="padding:16px;">暂无数据行，点击下方按钮添加</td></tr>`;
  } else {
    rows.forEach((row, ri) => {
      html += '<tr data-table-wb-data-row>';
      columns.forEach(col => {
        const val = (row.cells && row.cells[col.key]) ? row.cells[col.key] : '';
        if (col.type === 'boolean') {
          const checked = val === 'true' ? ' selected' : '';
          const unchecked = val === 'false' ? ' selected' : (val === '' ? ' selected' : '');
          html += `
            <td>
              <select data-cell-field="${escapeHtml(col.key)}" style="width:100%;">
                <option value=""${unchecked}>—</option>
                <option value="true"${val === 'true' ? ' selected' : ''}>是</option>
                <option value="false"${val === 'false' ? ' selected' : ''}>否</option>
              </select>
            </td>
          `;
        } else {
          const inputType = col.type === 'number' ? 'number' : 'text';
          html += `<td><input type="${inputType}" data-cell-field="${escapeHtml(col.key)}" value="${escapeHtml(val)}"></td>`;
        }
      });
      html += `
        <td class="action-cell">
          <button class="row-delete-btn" data-table-workbench-action="delete-row" data-row-index="${ri}" title="删除行">&times;</button>
        </td>
      `;
      html += '</tr>';
    });
  }

  html += '</tbody></table></div>';

  html += `
    <button class="yyt-table-wb-add-row" data-table-workbench-action="add-row">
      + 添加数据行
    </button>
  `;

  html += `
    <details style="margin-top:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.01);overflow:hidden;">
      <summary style="list-style:none;padding:8px 12px;cursor:pointer;font-size:11px;font-weight:600;color:rgba(255,255,255,0.5);user-select:none;">列定义 (${columns.length}列)</summary>
      <div style="padding:8px 12px 12px;display:flex;flex-direction:column;gap:6px;" data-table-wb-col-editor>
        ${columns.map((col, ci) => `
          <div data-table-wb-col-row data-col-key="${escapeHtml(col.key)}" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <input type="text" data-col-field="title" value="${escapeHtml(col.title)}" placeholder="列名" style="width:100px;padding:4px 8px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;background:rgba(255,255,255,0.03);color:var(--yyt-text);font-size:11px;font-family:inherit;">
            <input type="text" data-col-field="key" value="${escapeHtml(col.key)}" placeholder="键" style="width:80px;padding:4px 8px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;background:rgba(255,255,255,0.03);color:var(--yyt-text);font-size:11px;font-family:inherit;" pattern="[a-z0-9_]+" readonly onfocus="this.removeAttribute('readonly')">
            <select data-col-field="type" style="padding:4px 8px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;background:rgba(255,255,255,0.05);color:var(--yyt-text);font-size:11px;">
              ${TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS.map(opt => `
                <option value="${opt.value}" ${col.type === opt.value ? 'selected' : ''}>${opt.label}</option>
              `).join('')}
            </select>
            <label style="display:inline-flex;align-items:center;gap:3px;font-size:10px;color:rgba(255,255,255,0.5);cursor:pointer;">
              <input type="checkbox" data-col-field="required" ${col.required ? 'checked' : ''}> 必填
            </label>
            <input type="text" data-col-field="description" value="${escapeHtml(col.description || '')}" placeholder="说明" style="flex:1;min-width:60px;padding:4px 8px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;background:rgba(255,255,255,0.03);color:var(--yyt-text);font-size:11px;font-family:inherit;">
            <button data-table-workbench-action="delete-col" data-col-index="${ci}" style="background:none;border:none;color:rgba(255,255,255,0.3);cursor:pointer;padding:2px 4px;font-size:14px;" title="删除列">&times;</button>
          </div>
        `).join('')}
        <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-workbench-action="add-col" style="align-self:flex-start;margin-top:4px;">+ 添加列</button>
      </div>
    </details>
  `;

  return html;
}

function buildFooter(table) {
  if (!table) return '';
  const colCount = Array.isArray(table.columns) ? table.columns.length : 0;
  const rowCount = Array.isArray(table.rows) ? table.rows.length : 0;
  const name = normalizeString(table.name, '未命名');

  const draft = { tables: [table] };
  const validation = validateTableDraftDeep(draft);
  const errors = validation?.summary?.errorCount || 0;
  const warnings = validation?.summary?.warningCount || 0;

  return `
    <div class="yyt-table-wb-footer">
      <span>表: <strong>${escapeHtml(name)}</strong></span>
      <span>${rowCount} 行 &times; ${colCount} 列</span>
      ${errors > 0 ? `<span style="color:#f87171;">校验: ${errors} 错误</span>` : warnings > 0 ? `<span style="color:#fbbf24;">校验: ${warnings} 提示</span>` : '<span style="color:#4ade80;">校验通过</span>'}
    </div>
  `;
}

function buildDiagnostics(config) {
  const draft = { tables: Array.isArray(config.tables) ? config.tables : [] };
  const validation = validateTableDraftDeep(draft);
  const errorCount = validation?.summary?.errorCount || 0;
  const warningCount = validation?.summary?.warningCount || 0;
  const variableHelp = variableResolver.getVariableHelp();
  const runtime = config?.runtime || {};

  const runtimeLines = [
    { label: '状态', value: normalizeString(runtime.lastStatus, 'idle') },
    { label: '最近运行', value: runtime.lastRunAt ? new Date(runtime.lastRunAt).toLocaleString() : '未运行' },
    { label: '耗时', value: runtime.lastDurationMs ? `${runtime.lastDurationMs} ms` : '—' },
    { label: '成功/失败', value: `${runtime.successCount || 0} / ${runtime.errorCount || 0}` },
    { label: '填表模式', value: normalizeString(runtime.lastFillMode, '—') },
    { label: '载入模式', value: normalizeString(runtime.lastLoadMode, '—') },
    { label: '镜像写回', value: runtime.lastMirrorApplied ? '是' : '否' }
  ];

  return `
    <details class="yyt-table-wb-diagnostics">
      <summary>
        <i class="fa-solid fa-chevron-right" style="font-size:10px;transition:transform 0.15s;"></i>
        诊断 / 配置 ${errorCount > 0 ? `(${errorCount} 错误)` : ''}
      </summary>
      <div class="yyt-table-wb-diagnostics-body">
        ${renderTableAuxiliaryFields(getSchema(), config)}
        <div class="yyt-table-wb-small-label">运行时摘要</div>
        <div style="display:flex;flex-direction:column;gap:4px;font-size:11px;color:rgba(255,255,255,0.6);">
          ${runtimeLines.map(l => `<div><strong>${escapeHtml(l.label)}:</strong> ${escapeHtml(l.value)}</div>`).join('')}
          ${runtime.lastError ? `<div style="color:#f87171;"><strong>最近错误:</strong> ${escapeHtml(runtime.lastError)}</div>` : ''}
        </div>
        <div class="yyt-table-wb-small-label">编译预览</div>
        <pre class="yyt-table-wb-pre">${escapeHtml(formatJson(validation.tables || []))}</pre>
        <div class="yyt-table-wb-small-label">变量帮助</div>
        <pre class="yyt-table-wb-pre">${escapeHtml(variableHelp)}</pre>
        <div data-table-wb-target-diag class="yyt-table-wb-small-label" style="margin-top:8px;">目标 / 载入诊断</div>
        <div data-table-wb-target-diag-content style="font-size:11px;color:rgba(255,255,255,0.5);">加载中...</div>
      </div>
    </details>
  `;
}

function buildMainLayout(config, currentTableIndex) {
  const tables = Array.isArray(config.tables) ? config.tables : [];
  const normalizedIndex = clampCurrentTableIndex(tables, currentTableIndex);
  const activeTable = tables[normalizedIndex] || null;

  return `
    <div class="yyt-tool-panel yyt-table-wb-shell" data-tool-id="tableWorkbench">
      ${buildHeader(config)}
      ${buildTabBar(tables, normalizedIndex)}
      ${buildTableGrid(activeTable, normalizedIndex)}
      ${buildFooter(activeTable)}
      ${buildDiagnostics(config)}
    </div>
  `;
}

async function refreshDiagnostics($container) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) return;

  const config = getTableWorkbenchConfig();
  const $target = $container.find('[data-table-wb-target-diag-content]');
  if (!$target.length) return;

  try {
    const targetSnapshot = await resolveLatestTableTarget();
    if (!isContainerValid($container)) return;

    if (!targetSnapshot) {
      $target.text('当前没有可用的 assistant 目标。');
      return;
    }

    const loadResult = loadBoundStateOrTemplate(targetSnapshot, { templateTables: config.tables });
    const items = [
      `sourceMessageId: ${targetSnapshot.sourceMessageId || '?'}`,
      `slotBindingKey: ${targetSnapshot.slotBindingKey || '?'}`,
      `slotRevisionKey: ${targetSnapshot.slotRevisionKey || '?'}`,
      `loadMode: ${loadResult.loadMode || 'empty'}`,
      `tables: ${Array.isArray(loadResult.state?.tables) ? loadResult.state.tables.length : 0}`
    ];
    $target.text(items.join('\n'));
  } catch (error) {
    if (!isContainerValid($container)) return;
    $target.text(error?.message || '诊断失败');
  }
}

function collectAndSaveConfig($container, { silent = false } = {}) {
  const config = captureWorkbenchDraft($container);
  const saveResult = saveTableWorkbenchConfig(config);
  if (!saveResult.success) {
    showTopNotice('warning', saveResult.error || '保存失败', {
      duration: 4000,
      noticeId: 'yyt-table-workbench-form-error'
    });
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

    $container.on('click.yytTableWorkbench', '[data-table-workbench-select-table]', function (event) {
      if ($(event.target).closest('[data-table-workbench-action]').length) return;
      const nextIndex = Number.parseInt($(this).attr('data-table-workbench-select-table') || '0', 10);
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      draftConfig.__activeTableIndex = nextIndex;
      self.currentTableIndex = clampCurrentTableIndex(draftConfig.tables, nextIndex);
      self.renderTo($container, { config: draftConfig });
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="save"]', () => {
      const saveResult = collectAndSaveConfig($container, { silent: false });
      if (saveResult?.success) {
        self.currentTableIndex = clampCurrentTableIndex(saveResult.config?.tables, self.currentTableIndex);
        self.renderTo($container, { config: saveResult.config });
      }
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="run"]', async () => {
      const saveResult = collectAndSaveConfig($container, { silent: true });
      if (!saveResult.success) return;

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
          const mode = result.fillMode === 'incremental' ? '增量' : '全量';
          showTopNotice('success', `填表完成 (${mode})`, {
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

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="add-table"]', () => {
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      const tables = Array.isArray(draftConfig.tables) ? [...draftConfig.tables] : [];
      const newTable = {
        name: `表格 ${tables.length + 1}`,
        note: '',
        columns: [{ key: 'col_1', title: '属性', type: 'text', required: false, description: '' }],
        rows: []
      };
      tables.push(newTable);
      draftConfig.tables = tables;
      draftConfig.__activeTableIndex = tables.length - 1;
      saveTableWorkbenchConfig(draftConfig);
      self.currentTableIndex = tables.length - 1;
      self.renderTo($container, { config: draftConfig });
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="delete-table"]', function (event) {
      event.preventDefault();
      event.stopPropagation();
      const tableIndex = Number.parseInt($(this).attr('data-table-index') || '-1', 10);
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      const tables = Array.isArray(draftConfig.tables) ? [...draftConfig.tables] : [];
      if (tableIndex < 0 || tableIndex >= tables.length) return;
      tables.splice(tableIndex, 1);
      draftConfig.tables = tables;
      const nextIndex = clampCurrentTableIndex(tables, tableIndex > 0 ? tableIndex - 1 : 0);
      draftConfig.__activeTableIndex = nextIndex;
      saveTableWorkbenchConfig(draftConfig);
      self.currentTableIndex = nextIndex;
      self.renderTo($container, { config: draftConfig });
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="add-row"]', () => {
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      const ti = clampCurrentTableIndex(draftConfig.tables, self.currentTableIndex);
      const tables = Array.isArray(draftConfig.tables) ? [...draftConfig.tables] : [];
      if (!tables[ti]) return;
      const table = { ...tables[ti] };
      table.rows = Array.isArray(table.rows) ? [...table.rows] : [];
      const cells = {};
      (table.columns || []).forEach(col => { cells[col.key] = ''; });
      table.rows.push({ name: '', cells });
      tables[ti] = table;
      draftConfig.tables = tables;
      draftConfig.__activeTableIndex = ti;
      saveTableWorkbenchConfig(draftConfig);
      self.renderTo($container, { config: draftConfig });
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="delete-row"]', function () {
      const rowIndex = Number.parseInt($(this).attr('data-row-index') || '-1', 10);
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      const ti = clampCurrentTableIndex(draftConfig.tables, self.currentTableIndex);
      const tables = Array.isArray(draftConfig.tables) ? [...draftConfig.tables] : [];
      if (!tables[ti]) return;
      const table = { ...tables[ti] };
      table.rows = Array.isArray(table.rows) ? [...table.rows] : [];
      if (rowIndex < 0 || rowIndex >= table.rows.length) return;
      table.rows.splice(rowIndex, 1);
      tables[ti] = table;
      draftConfig.tables = tables;
      draftConfig.__activeTableIndex = ti;
      saveTableWorkbenchConfig(draftConfig);
      self.renderTo($container, { config: draftConfig });
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="add-col"]', () => {
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      const ti = clampCurrentTableIndex(draftConfig.tables, self.currentTableIndex);
      const tables = Array.isArray(draftConfig.tables) ? [...draftConfig.tables] : [];
      if (!tables[ti]) return;
      const table = { ...tables[ti] };
      table.columns = Array.isArray(table.columns) ? [...table.columns] : [];
      const idx = table.columns.length + 1;
      table.columns.push({ key: `col_${idx}`, title: `列 ${idx}`, type: 'text', required: false, description: '' });
      tables[ti] = table;
      draftConfig.tables = tables;
      draftConfig.__activeTableIndex = ti;
      saveTableWorkbenchConfig(draftConfig);
      self.renderTo($container, { config: draftConfig });
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="delete-col"]', function () {
      const colIndex = Number.parseInt($(this).attr('data-col-index') || '-1', 10);
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      const ti = clampCurrentTableIndex(draftConfig.tables, self.currentTableIndex);
      const tables = Array.isArray(draftConfig.tables) ? [...draftConfig.tables] : [];
      if (!tables[ti]) return;
      const table = { ...tables[ti] };
      table.columns = Array.isArray(table.columns) ? [...table.columns] : [];
      if (colIndex < 0 || colIndex >= table.columns.length) return;
      const removedKey = table.columns[colIndex].key;
      table.columns.splice(colIndex, 1);
      table.rows = (table.rows || []).map(row => {
        const cells = { ...(row.cells || {}) };
        delete cells[removedKey];
        return { ...row, cells };
      });
      tables[ti] = table;
      draftConfig.tables = tables;
      draftConfig.__activeTableIndex = ti;
      saveTableWorkbenchConfig(draftConfig);
      self.renderTo($container, { config: draftConfig });
    });

    $container.on('change.yytTableWorkbench', '[data-table-field="fillMode"]', () => {
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      saveTableWorkbenchConfig(draftConfig);
    });

    $container.on('input.yytTableWorkbench', '[data-table-wb-name], [data-table-wb-note], [data-table-wb-col-row] input, [data-table-wb-col-row] select, [data-table-wb-data-row] input, [data-table-wb-data-row] select', () => {
      // Auto-save draft silently on input changes (debounced via save)
    });

    $container.on('blur.yytTableWorkbench', '[data-table-wb-name], [data-table-wb-note], [data-table-wb-col-row] input, [data-table-wb-data-row] input, [data-table-wb-data-row] select', () => {
      const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
      saveTableWorkbenchConfig(draftConfig);
    });

    $container.on('contextmenu.yytTableWorkbench', '[data-table-wb-data-row] td:not(.action-cell)', function (event) {
      event.preventDefault();
      const $td = $(this);
      const $row = $td.closest('[data-table-wb-data-row]');
      const colKey = String($td.find('[data-cell-field]').attr('data-cell-field') || '');
      const rowIndex = Number.parseInt($row.attr('data-row-index') || $row.index(), 10);

      const menu = new TableCellPopupMenu();
      menu.show(event.clientX, event.clientY, {
        rowIndex,
        colKey,
        onAction(action) {
          if (action.startsWith('edit:')) {
            const $input = $td.find('[data-cell-field]');
            if ($input.length) $input.trigger('focus').trigger('select');
          } else if (action.startsWith('clear:')) {
            const $input = $td.find('[data-cell-field]');
            if ($input.length) {
              $input.val('');
              const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
              saveTableWorkbenchConfig(draftConfig);
              self.renderTo($container, { config: draftConfig });
            }
          } else if (action.startsWith('insert-row-above:')) {
            const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
            const ti = clampCurrentTableIndex(draftConfig.tables, self.currentTableIndex);
            const tables = Array.isArray(draftConfig.tables) ? [...draftConfig.tables] : [];
            if (!tables[ti]) return;
            const table = { ...tables[ti] };
            table.rows = Array.isArray(table.rows) ? [...table.rows] : [];
            const cells = {};
            (table.columns || []).forEach(col => { cells[col.key] = ''; });
            table.rows.splice(Math.max(rowIndex, 0), 0, { name: '', cells });
            tables[ti] = table;
            draftConfig.tables = tables;
            draftConfig.__activeTableIndex = ti;
            saveTableWorkbenchConfig(draftConfig);
            self.renderTo($container, { config: draftConfig });
          } else if (action.startsWith('insert-row-below:')) {
            const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
            const ti = clampCurrentTableIndex(draftConfig.tables, self.currentTableIndex);
            const tables = Array.isArray(draftConfig.tables) ? [...draftConfig.tables] : [];
            if (!tables[ti]) return;
            const table = { ...tables[ti] };
            table.rows = Array.isArray(table.rows) ? [...table.rows] : [];
            const cells = {};
            (table.columns || []).forEach(col => { cells[col.key] = ''; });
            table.rows.splice(rowIndex + 1, 0, { name: '', cells });
            tables[ti] = table;
            draftConfig.tables = tables;
            draftConfig.__activeTableIndex = ti;
            saveTableWorkbenchConfig(draftConfig);
            self.renderTo($container, { config: draftConfig });
          } else if (action.startsWith('delete-row:')) {
            const draftConfig = captureWorkbenchDraft($container, getTableWorkbenchConfig());
            const ti = clampCurrentTableIndex(draftConfig.tables, self.currentTableIndex);
            const tables = Array.isArray(draftConfig.tables) ? [...draftConfig.tables] : [];
            if (!tables[ti]) return;
            const table = { ...tables[ti] };
            table.rows = Array.isArray(table.rows) ? [...table.rows] : [];
            if (rowIndex >= 0 && rowIndex < table.rows.length) {
              table.rows.splice(rowIndex, 1);
            }
            tables[ti] = table;
            draftConfig.tables = tables;
            draftConfig.__activeTableIndex = ti;
            saveTableWorkbenchConfig(draftConfig);
            self.renderTo($container, { config: draftConfig });
          }
        }
      });
    });
  },

  destroy($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    TableCellPopupMenu.destroy();
    $container.off('.yytTableWorkbench');
  },

  getStyles() {
    return PANEL_STYLES;
  },

  renderTo($container, { config } = {}) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    const renderConfig = config && typeof config === 'object' ? config : getTableWorkbenchConfig();
    this.currentTableIndex = clampCurrentTableIndex(renderConfig.tables, renderConfig.__activeTableIndex ?? this.currentTableIndex);
    $container.html(this.render({ config: renderConfig }));
    this.bindEvents($container);
    void refreshDiagnostics($container);
  }
};

export default TableWorkbenchPanel;
