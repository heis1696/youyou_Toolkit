/**
 * YouYou Toolkit - 填表工作台面板
 * 侧边栏表列表 + 主编辑区（列定义 + 行卡片）+ 收起诊断
 */
import { escapeHtml, getJQuery, isContainerValid, showToast, showTopNotice } from '../utils.js';
import { TOOL_CONFIG_PANEL_STYLES } from './tool-config-panel-factory.js';
import { renderTableAuxiliaryFields } from './table-form-renderer.js';
import { TableCellPopupMenu, getPopupMenuStyles } from './table-cell-popup-menu.js';
import { variableResolver } from '../../variable-resolver.js';
import { getAllPresets } from '../../preset-manager.js';
import {
  getTableWorkbenchConfig, getTableWorkbenchFormSchema, saveTableWorkbenchConfig,
  validateTableDraftDeep, TABLE_FILL_MODE, TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS
} from '../../table-engine/table-schema-service.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';

// ---------- CSS ----------
const CSS = `${TOOL_CONFIG_PANEL_STYLES} ${getPopupMenuStyles()}

.yyt-twb { display:flex; flex-direction:column; gap:0; }

.yyt-twb-topbar {
  display:flex; align-items:center; gap:8px; padding:0 0 10px; flex-wrap:wrap;
  border-bottom:1px solid rgba(255,255,255,0.06);
}
.yyt-twb-topbar .spacer { flex:1; }
.yyt-twb-status { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
.yyt-twb-status.idle { background:rgba(255,255,255,0.25); }
.yyt-twb-status.success { background:#4ade80; }
.yyt-twb-status.error { background:#f87171; }
.yyt-twb-status.running { background:#fbbf24; }

.yyt-twb-body { display:grid; grid-template-columns:200px minmax(0,1fr); gap:0; min-height:0; }

.yyt-twb-sidebar {
  padding:10px 10px 10px 0; border-right:1px solid rgba(255,255,255,0.06);
  display:flex; flex-direction:column; gap:4px; overflow-y:auto; max-height:calc(100vh - 220px);
}
.yyt-twb-sidebar-item {
  display:flex; align-items:center; gap:6px; padding:8px 10px; border-radius:8px;
  color:rgba(255,255,255,0.65); font-size:12px; font-weight:600; cursor:pointer;
  transition:all 0.12s; user-select:none;
}
.yyt-twb-sidebar-item:hover { background:rgba(255,255,255,0.04); color:rgba(255,255,255,0.88); }
.yyt-twb-sidebar-item.active {
  background:rgba(123,183,255,0.12); color:var(--yyt-text);
  border:1px solid rgba(123,183,255,0.18);
}
.yyt-twb-sidebar-item-name { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.yyt-twb-sidebar-del {
  opacity:0; font-size:14px; color:rgba(255,255,255,0.3); cursor:pointer; line-height:1;
}
.yyt-twb-sidebar-item:hover .yyt-twb-sidebar-del { opacity:0.5; }
.yyt-twb-sidebar-del:hover { opacity:1; color:#f87171; }
.yyt-twb-sidebar-add {
  padding:6px 10px; border-radius:6px; border:1px dashed rgba(255,255,255,0.1);
  color:rgba(123,183,255,0.65); font-size:11px; font-weight:700; cursor:pointer;
  text-align:center; transition:all 0.12s; margin-top:4px;
}
.yyt-twb-sidebar-add:hover { border-color:rgba(123,183,255,0.25); background:rgba(123,183,255,0.05); }

.yyt-twb-main { padding:10px 0 10px 14px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; }

.yyt-twb-meta { display:flex; gap:8px; flex-wrap:wrap; }
.yyt-twb-meta input {
  padding:5px 10px; border:1px solid rgba(255,255,255,0.08); border-radius:6px;
  background:rgba(255,255,255,0.03); color:var(--yyt-text); font-size:12px; font-family:inherit;
}
.yyt-twb-meta input:focus { border-color:rgba(123,183,255,0.35); outline:none; }
.yyt-twb-meta .name-input { width:160px; }
.yyt-twb-meta .note-input { flex:1; min-width:120px; }

.yyt-twb-section-label {
  font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;
  color:rgba(255,255,255,0.35); margin-bottom:2px;
}

.yyt-twb-col-table { width:100%; border-collapse:collapse; font-size:11px; }
.yyt-twb-col-table th {
  padding:5px 6px; text-align:left; font-weight:600; color:rgba(255,255,255,0.4);
  border-bottom:1px solid rgba(255,255,255,0.06); font-size:10px;
}
.yyt-twb-col-table td { padding:3px 4px; border-bottom:1px solid rgba(255,255,255,0.03); }
.yyt-twb-col-table input, .yyt-twb-col-table select {
  width:100%; padding:4px 6px; box-sizing:border-box;
  border:1px solid transparent; border-radius:4px;
  background:rgba(255,255,255,0.02); color:var(--yyt-text); font-size:11px; font-family:inherit;
}
.yyt-twb-col-table input:focus, .yyt-twb-col-table select:focus {
  border-color:rgba(123,183,255,0.3); outline:none; background:rgba(123,183,255,0.04);
}
.yyt-twb-col-table input:hover:not(:focus), .yyt-twb-col-table select:hover { border-color:rgba(255,255,255,0.06); }
.yyt-twb-col-table .del-btn {
  background:none; border:none; color:rgba(255,255,255,0.2); cursor:pointer; font-size:14px; padding:2px 4px;
}
.yyt-twb-col-table .del-btn:hover { color:#f87171; }

.yyt-twb-add-btn {
  padding:4px 10px; border:1px dashed rgba(255,255,255,0.1); border-radius:5px;
  background:transparent; color:rgba(255,255,255,0.4); font-size:11px; cursor:pointer;
  transition:all 0.12s; display:inline-block; margin-top:4px;
}
.yyt-twb-add-btn:hover { border-color:rgba(123,183,255,0.22); color:rgba(123,183,255,0.7); }

.yyt-twb-rows { display:flex; flex-direction:column; gap:8px; }

.yyt-twb-row-card {
  padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.07);
  background:rgba(255,255,255,0.015); transition:border-color 0.12s;
}
.yyt-twb-row-card:hover { border-color:rgba(255,255,255,0.12); }
.yyt-twb-row-card.row-new { border-color:rgba(74,222,128,0.25); background:rgba(74,222,128,0.04); }
.yyt-twb-row-card.row-updated { border-color:rgba(96,165,250,0.25); background:rgba(96,165,250,0.04); }
.yyt-twb-row-card.row-deleted { border-color:rgba(248,113,113,0.25); background:rgba(248,113,113,0.04); }
.yyt-twb-row-card.row-new::after { content:'新增'; position:absolute; top:4px; right:8px; font-size:9px; color:#4ade80; font-weight:700; }
.yyt-twb-row-card.row-updated::after { content:'已更新'; position:absolute; top:4px; right:8px; font-size:9px; color:#60a5fa; font-weight:700; }

.yyt-twb-row-header {
  display:flex; align-items:center; gap:8px; margin-bottom:6px; position:relative;
}
.yyt-twb-row-header .row-index { font-size:10px; font-weight:800; color:rgba(255,255,255,0.3); min-width:40px; }
.yyt-twb-row-header .spacer { flex:1; }
.yyt-twb-row-header .row-delete {
  background:none; border:none; color:rgba(255,255,255,0.2); cursor:pointer; font-size:13px;
  padding:2px 4px; transition:color 0.12s;
}
.yyt-twb-row-header .row-delete:hover { color:#f87171; }

.yyt-twb-row-fields { display:flex; flex-wrap:wrap; gap:8px; }
.yyt-twb-row-field { display:flex; flex-direction:column; gap:2px; min-width:120px; flex:1; }
.yyt-twb-row-field label {
  font-size:10px; font-weight:600; color:rgba(255,255,255,0.4); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.yyt-twb-row-field input, .yyt-twb-row-field select {
  padding:5px 8px; border:1px solid rgba(255,255,255,0.06); border-radius:5px;
  background:rgba(255,255,255,0.025); color:var(--yyt-text); font-size:12px; font-family:inherit;
}
.yyt-twb-row-field input:focus, .yyt-twb-row-field select:focus {
  border-color:rgba(123,183,255,0.3); outline:none; background:rgba(123,183,255,0.04);
}
.yyt-twb-row-field input:hover:not(:focus) { border-color:rgba(255,255,255,0.08); }

.yyt-twb-diagnostics { border-top:1px solid rgba(255,255,255,0.06); margin-top:4px; }
.yyt-twb-diagnostics > summary {
  list-style:none; padding:8px 0; cursor:pointer; font-size:11px; font-weight:600;
  color:rgba(255,255,255,0.4); user-select:none;
}
.yyt-twb-diagnostics > summary::-webkit-details-marker { display:none; }
.yyt-twb-diagnostics > summary:hover { color:rgba(255,255,255,0.65); }
.yyt-twb-diag-body { padding:0 0 12px; display:flex; flex-direction:column; gap:10px; }

.yyt-twb-pre {
  margin:0; padding:10px; border-radius:6px; max-height:260px; overflow:auto;
  white-space:pre-wrap; word-break:break-word;
  background:rgba(8,12,18,0.7); border:1px solid rgba(255,255,255,0.05);
  color:rgba(255,255,255,0.82); font-family:'Fira Code','Consolas',monospace; font-size:11px; line-height:1.6;
}

.yyt-twb-empty { padding:24px; text-align:center; color:rgba(255,255,255,0.3); font-size:13px; }

@media (max-width:860px) {
  .yyt-twb-body { grid-template-columns:1fr; }
  .yyt-twb-sidebar { border-right:none; border-bottom:1px solid rgba(255,255,255,0.06); padding:0 0 8px; flex-direction:row; flex-wrap:wrap; max-height:none; }
  .yyt-twb-sidebar-item { font-size:11px; padding:5px 8px; }
  .yyt-twb-main { padding:8px 0; }
}
`;

// ---------- helpers ----------
function S(v, fb = '') { return typeof v === 'string' && v.trim() ? v.trim() : fb; }
function idx(tables, i) { const n = (Array.isArray(tables) ? tables.length : 0); if (n <= 0) return 0; if (!Number.isInteger(i) || i < 0) return 0; return Math.min(i, n - 1); }
function dump(v) { try { return JSON.stringify(v, null, 2); } catch (_) { return String(v ?? ''); } }

function schema() { return getTableWorkbenchFormSchema({ apiPresets: getAllPresets() }); }

function collect($c, fb) {
  const $ = getJQuery();
  const base = fb && typeof fb === 'object' ? fb : getTableWorkbenchConfig();
  if (!$ || !isContainerValid($c)) return base;
  const cfg = { ...base, runtime: base.runtime || {} };

  const ti = idx(cfg.tables, cfg.__activeTableIndex ?? 0);
  const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];

  if (tables[ti]) {
    const t = { ...tables[ti] };
    const $tn = $c.find('[data-twb-name]'); if ($tn.length) t.name = String($tn.val() || '').trim();
    const $nt = $c.find('[data-twb-note]'); if ($nt.length) t.note = String($nt.val() || '').trim();

    t.columns = []; t.rows = Array.isArray(t.rows) ? [...t.rows] : [];
    $c.find('[data-twb-col]').each(function () {
      const r = $(this);
      t.columns.push({
        key: S(r.find('[data-twb-col-key]').val(), ''),
        title: S(r.find('[data-twb-col-title]').val(), ''),
        type: S(r.find('[data-twb-col-type]').val(), 'text'),
        required: r.find('[data-twb-col-req]').is(':checked'),
        description: S(r.find('[data-twb-col-desc]').val(), '')
      });
    });

    t.rows = [];
    $c.find('[data-twb-row]').each(function () {
      const r = $(this);
      const cells = {};
      t.columns.forEach(c => { cells[c.key] = S(r.find(`[data-twb-cell="${c.key}"]`).val(), ''); });
      t.rows.push({ name: S(r.find('[data-twb-row-name]').val(), ''), cells });
    });

    tables[ti] = t;
  }

  const $pm = $c.find('[data-twb-field="promptTemplate"]'); if ($pm.length) cfg.promptTemplate = String($pm.val() || '');
  const $ap = $c.find('[data-twb-field="apiPreset"]'); if ($ap.length) cfg.apiPreset = String($ap.val() || '');
  const $fm = $c.find('[data-twb-field="fillMode"]'); if ($fm.length) cfg.fillMode = String($fm.val() || '');
  const $mm = $c.find('[data-twb-field="mirrorToMessage"]'); if ($mm.length) cfg.mirrorToMessage = $mm.is(':checked');

  cfg.tables = tables;
  return cfg;
}

// ---------- render parts ----------
function renderTopbar(cfg) {
  const s = S(cfg?.runtime?.lastStatus, 'idle');
  return `
    <div class="yyt-twb-topbar">
      <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="save"><i class="fa-solid fa-save"></i> 保存</button>
      <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-twb-action="run"><i class="fa-solid fa-play"></i> 立即填表</button>
      <div class="spacer"></div>
      <select class="yyt-table-wb-inline-select" data-twb-field="fillMode" style="padding:4px 8px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;background:rgba(255,255,255,0.05);color:var(--yyt-text);font-size:11px;">
        <option value="${TABLE_FILL_MODE.INCREMENTAL}" ${cfg.fillMode !== TABLE_FILL_MODE.FULL ? 'selected' : ''}>增量</option>
        <option value="${TABLE_FILL_MODE.FULL}" ${cfg.fillMode === TABLE_FILL_MODE.FULL ? 'selected' : ''}>全量</option>
      </select>
      <span class="yyt-twb-status ${s}" title="状态: ${s}"></span>
    </div>`;
}

function renderSidebar(tables, cur) {
  const items = Array.isArray(tables) ? tables : [];
  return `
    <div class="yyt-twb-sidebar">
      ${items.map((t, i) => `
        <div class="yyt-twb-sidebar-item${i === cur ? ' active' : ''}" data-twb-select="${i}">
          <span class="yyt-twb-sidebar-item-name">${escapeHtml(S(t?.name, `表 ${i + 1}`))}</span>
          ${items.length > 1 ? `<span class="yyt-twb-sidebar-del" data-twb-action="delete-table" data-twb-ti="${i}">&times;</span>` : ''}
        </div>
      `).join('')}
      <div class="yyt-twb-sidebar-add" data-twb-action="add-table">+ 新增表格</div>
    </div>`;
}

function renderColumns(table) {
  const cols = Array.isArray(table?.columns) ? table.columns : [];
  const typeLabel = {};
  TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS.forEach(o => { typeLabel[o.value] = o.label; });

  return `
    <div class="yyt-twb-section-label">列定义 · ${cols.length} 列</div>
    <table class="yyt-twb-col-table"><thead><tr>
      <th>列名</th><th>键</th><th style="width:72px">类型</th><th style="width:36px">必填</th><th>说明</th><th style="width:24px"></th>
    </tr></thead><tbody>
      ${cols.map(c => `
        <tr data-twb-col>
          <td><input data-twb-col-title value="${escapeHtml(c.title || '')}" placeholder="列名"></td>
          <td><input data-twb-col-key value="${escapeHtml(c.key || '')}" placeholder="键"></td>
          <td><select data-twb-col-type>${TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS.map(o => `<option value="${o.value}" ${c.type === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}</select></td>
          <td style="text-align:center"><input type="checkbox" data-twb-col-req ${c.required ? 'checked' : ''}></td>
          <td><input data-twb-col-desc value="${escapeHtml(c.description || '')}" placeholder="可选"></td>
          <td><button class="del-btn" data-twb-action="delete-col" data-twb-ci="${c.key}">&times;</button></td>
        </tr>
      `).join('')}
    </tbody></table>
    <button class="yyt-twb-add-btn" data-twb-action="add-col">+ 添加列</button>`;
}

function renderRows(table, diff) {
  const cols = Array.isArray(table?.columns) ? table.columns : [];
  const rows = Array.isArray(table?.rows) ? table.rows : [];

  if (!rows.length) return '<div class="yyt-twb-empty">暂无数据行，点击下方按钮或"立即填表"由 AI 生成</div>';

  return `
    <div class="yyt-twb-section-label">数据行 · ${rows.length} 行</div>
    <div class="yyt-twb-rows">
      ${rows.map((row, ri) => {
        const rowName = row.name || `__row_${ri}`;
        const rd = diff?.[rowName];
        let rowClass = '';
        if (rd?.__rowStatus === 'new') rowClass = ' row-new';
        else if (rd && Object.entries(rd).some(([k, v]) => k !== '__rowStatus' && (v === 'updated' || v === 'new'))) rowClass = ' row-updated';

        return `
          <div class="yyt-twb-row-card${rowClass}" data-twb-row data-twb-ri="${ri}">
            <div class="yyt-twb-row-header">
              <span class="row-index">#${ri + 1}</span>
              <input data-twb-row-name value="${escapeHtml(row.name || '')}" placeholder="行名（可选）" style="padding:3px 6px;border:1px solid transparent;border-radius:4px;background:transparent;color:var(--yyt-text);font-size:12px;width:140px;">
              <div class="spacer"></div>
              <button class="row-delete" data-twb-action="delete-row" data-twb-ri="${ri}" title="删除此行">&times;</button>
            </div>
            <div class="yyt-twb-row-fields">
              ${cols.map(c => {
                const val = (row.cells && row.cells[c.key]) ? row.cells[c.key] : '';
                if (c.type === 'boolean') {
                  return `
                    <div class="yyt-twb-row-field" style="min-width:80px;flex:0 1 auto;">
                      <label>${escapeHtml(c.title || c.key)}${c.required ? ' *' : ''}</label>
                      <select data-twb-cell="${escapeHtml(c.key)}">
                        <option value="" ${val === '' ? 'selected' : ''}>—</option>
                        <option value="true" ${val === 'true' ? 'selected' : ''}>是</option>
                        <option value="false" ${val === 'false' ? 'selected' : ''}>否</option>
                      </select>
                    </div>`;
                }
                return `
                  <div class="yyt-twb-row-field">
                    <label>${escapeHtml(c.title || c.key)}${c.required ? ' *' : ''}</label>
                    <input type="${c.type === 'number' ? 'number' : 'text'}" data-twb-cell="${escapeHtml(c.key)}" value="${escapeHtml(val)}" placeholder="${escapeHtml(c.title || c.key)}">
                  </div>`;
              }).join('')}
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function renderMain(table, diff) {
  if (!table) return '<div class="yyt-twb-empty">← 从左侧选择或新建一张表格</div>';

  return `
    <div class="yyt-twb-meta">
      <input class="name-input" data-twb-name value="${escapeHtml(table.name || '')}" placeholder="表名">
      <input class="note-input" data-twb-note value="${escapeHtml(table.note || '')}" placeholder="备注（可选）">
    </div>
    ${renderColumns(table)}
    ${renderRows(table, diff)}
    <button class="yyt-twb-add-btn" data-twb-action="add-row" style="align-self:flex-start;">+ 添加行</button>`;
}

function renderDiagnostics(cfg) {
  const draft = { tables: Array.isArray(cfg.tables) ? cfg.tables : [] };
  const v = validateTableDraftDeep(draft);
  const ec = v?.summary?.errorCount || 0;
  const rt = cfg?.runtime || {};
  const lines = [
    `状态: ${S(rt.lastStatus, 'idle')}`,
    `最近运行: ${rt.lastRunAt ? new Date(rt.lastRunAt).toLocaleString() : '—'}`,
    `耗时: ${rt.lastDurationMs ? rt.lastDurationMs + ' ms' : '—'}`,
    `成功/失败: ${rt.successCount || 0} / ${rt.errorCount || 0}`,
    `模式: ${S(rt.lastFillMode, '—')}`,
    `载入: ${S(rt.lastLoadMode, '—')}`,
    `镜像: ${rt.lastMirrorApplied ? '是' : '否'}`
  ];

  return `
    <details class="yyt-twb-diagnostics">
      <summary>${ec > 0 ? `校验有 ${ec} 个错误` : '提示词模板与诊断'} <i class="fa-solid fa-chevron-right" style="font-size:9px;margin-left:4px;"></i></summary>
      <div class="yyt-twb-diag-body">
        ${renderTableAuxiliaryFields(schema(), cfg)}
        <div class="yyt-twb-section-label">运行时信息</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);display:flex;flex-direction:column;gap:2px;">
          ${lines.map(l => `<div>${escapeHtml(l)}</div>`).join('')}
          ${rt.lastError ? `<div style="color:#f87171;">错误: ${escapeHtml(rt.lastError)}</div>` : ''}
        </div>
        <div class="yyt-twb-section-label">JSON 预览</div>
        <pre class="yyt-twb-pre">${escapeHtml(dump(v.tables || []))}</pre>
        <div class="yyt-twb-section-label">变量帮助</div>
        <pre class="yyt-twb-pre">${escapeHtml(variableResolver.getVariableHelp())}</pre>
      </div>
    </details>`;
}

// ---------- panel object ----------
export const TableWorkbenchPanel = {
  id: 'tableWorkbenchPanel',
  currentTableIndex: 0,
  lastDiff: null,

  render({ config } = {}) {
    const cfg = config && typeof config === 'object' ? config : getTableWorkbenchConfig();
    const tables = Array.isArray(cfg.tables) ? cfg.tables : [];
    this.currentTableIndex = idx(tables, cfg.__activeTableIndex ?? this.currentTableIndex);
    const ti = this.currentTableIndex;
    const active = tables[ti] || null;

    return `
      <div class="yyt-tool-panel yyt-twb" data-tool-id="tableWorkbench">
        ${renderTopbar(cfg)}
        <div class="yyt-twb-body">
          ${renderSidebar(tables, ti)}
          <div class="yyt-twb-main">
            ${renderMain(active, this.lastDiff?.[ti])}
          </div>
        </div>
        ${renderDiagnostics(cfg)}
      </div>`;
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    const self = this;
    $container.off('.twb');

    // sidebar: select table
    $container.on('click.twb', '[data-twb-select]', function () {
      const i = Number($(this).attr('data-twb-select'));
      const cfg = collect($container);
      cfg.__activeTableIndex = i;
      self.currentTableIndex = idx(cfg.tables, i);
      self.renderTo($container, { config: cfg });
    });

    // sidebar: add table
    $container.on('click.twb', '[data-twb-action="add-table"]', function (e) {
      e.stopPropagation();
      const cfg = collect($container);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      tables.push({ name: `表格 ${tables.length + 1}`, note: '', columns: [{ key: 'col_1', title: '属性', type: 'text', required: false, description: '' }], rows: [] });
      cfg.tables = tables;
      cfg.__activeTableIndex = tables.length - 1;
      saveTableWorkbenchConfig(cfg);
      self.currentTableIndex = tables.length - 1;
      self.renderTo($container, { config: cfg });
    });

    // sidebar: delete table
    $container.on('click.twb', '[data-twb-action="delete-table"]', function (e) {
      e.stopPropagation();
      const ti = Number($(this).attr('data-twb-ti'));
      const cfg = collect($container);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      if (ti < 0 || ti >= tables.length) return;
      tables.splice(ti, 1);
      const next = idx(tables, ti > 0 ? ti - 1 : 0);
      cfg.tables = tables; cfg.__activeTableIndex = next;
      saveTableWorkbenchConfig(cfg);
      self.currentTableIndex = next;
      self.renderTo($container, { config: cfg });
    });

    // save
    $container.on('click.twb', '[data-twb-action="save"]', () => {
      const cfg = collect($container);
      const r = saveTableWorkbenchConfig(cfg);
      if (r.success) { showToast('success', '已保存'); self.renderTo($container, { config: r.config }); }
      else showTopNotice('warning', r.error || '保存失败', { duration: 4000, noticeId: 'twb-save' });
    });

    // run
    $container.on('click.twb', '[data-twb-action="run"]', async () => {
      const cfg = collect($container);
      const r = saveTableWorkbenchConfig(cfg);
      if (!r.success) { showTopNotice('warning', r.error || '保存失败', { duration: 4000, noticeId: 'twb-save' }); return; }

      try {
        const result = await runManualTableUpdate();
        if (!result?.success) {
          showTopNotice('warning', result?.error || '填表失败', { duration: 4000, noticeId: 'twb-run' });
        } else if (result.warning) {
          showTopNotice('warning', `填表完成，镜像失败: ${result.warning}`, { duration: 4200, noticeId: 'twb-run' });
        } else {
          self.lastDiff = result.diff || null;
          showTopNotice('success', `填表完成 (${result.fillMode === 'incremental' ? '增量' : '全量'})`, { duration: 2800, noticeId: 'twb-run' });
        }
      } catch (e) {
        showToast('error', e?.message || '填表失败');
      } finally {
        self.renderTo($container);
      }
    });

    // add row
    $container.on('click.twb', '[data-twb-action="add-row"]', () => {
      const cfg = collect($container);
      const ti = idx(cfg.tables, self.currentTableIndex);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      if (!tables[ti]) return;
      const t = { ...tables[ti] };
      t.rows = Array.isArray(t.rows) ? [...t.rows] : [];
      const cells = {}; (t.columns || []).forEach(c => { cells[c.key] = ''; });
      t.rows.push({ name: '', cells });
      tables[ti] = t; cfg.tables = tables; cfg.__activeTableIndex = ti;
      saveTableWorkbenchConfig(cfg);
      self.renderTo($container, { config: cfg });
    });

    // delete row
    $container.on('click.twb', '[data-twb-action="delete-row"]', function () {
      const ri = Number($(this).attr('data-twb-ri'));
      const cfg = collect($container);
      const ti = idx(cfg.tables, self.currentTableIndex);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      if (!tables[ti] || ri < 0 || ri >= (tables[ti].rows?.length || 0)) return;
      const t = { ...tables[ti] };
      t.rows = Array.isArray(t.rows) ? [...t.rows] : [];
      t.rows.splice(ri, 1);
      tables[ti] = t; cfg.tables = tables; cfg.__activeTableIndex = ti;
      saveTableWorkbenchConfig(cfg);
      self.renderTo($container, { config: cfg });
    });

    // add col
    $container.on('click.twb', '[data-twb-action="add-col"]', () => {
      const cfg = collect($container);
      const ti = idx(cfg.tables, self.currentTableIndex);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      if (!tables[ti]) return;
      const t = { ...tables[ti] };
      t.columns = Array.isArray(t.columns) ? [...t.columns] : [];
      const n = t.columns.length + 1;
      t.columns.push({ key: `col_${n}`, title: `列 ${n}`, type: 'text', required: false, description: '' });
      tables[ti] = t; cfg.tables = tables; cfg.__activeTableIndex = ti;
      saveTableWorkbenchConfig(cfg);
      self.renderTo($container, { config: cfg });
    });

    // delete col
    $container.on('click.twb', '[data-twb-action="delete-col"]', function () {
      const key = $(this).attr('data-twb-ci');
      const cfg = collect($container);
      const ti = idx(cfg.tables, self.currentTableIndex);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      if (!tables[ti]) return;
      const t = { ...tables[ti] };
      t.columns = Array.isArray(t.columns) ? [...t.columns] : [];
      t.columns = t.columns.filter(c => c.key !== key);
      t.rows = (t.rows || []).map(row => {
        const cells = { ...(row.cells || {}) };
        delete cells[key];
        return { ...row, cells };
      });
      tables[ti] = t; cfg.tables = tables; cfg.__activeTableIndex = ti;
      saveTableWorkbenchConfig(cfg);
      self.renderTo($container, { config: cfg });
    });

    // right-click on row card
    $container.on('contextmenu.twb', '[data-twb-row]', function (e) {
      e.preventDefault();
      const ri = Number($(this).attr('data-twb-ri'));
      const menu = new TableCellPopupMenu();
      menu.show(e.clientX, e.clientY, {
        rowIndex: ri,
        onAction(action) {
          if (action === 'insert-row-above' || action === 'insert-row-below') {
            const at = action === 'insert-row-above' ? ri : ri + 1;
            const cfg = collect($container);
            const ti = idx(cfg.tables, self.currentTableIndex);
            const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
            if (!tables[ti]) return;
            const t = { ...tables[ti] };
            t.rows = Array.isArray(t.rows) ? [...t.rows] : [];
            const cells = {}; (t.columns || []).forEach(c => { cells[c.key] = ''; });
            t.rows.splice(Math.max(at, 0), 0, { name: '', cells });
            tables[ti] = t; cfg.tables = tables; cfg.__activeTableIndex = ti;
            saveTableWorkbenchConfig(cfg);
            self.renderTo($container, { config: cfg });
          } else if (action === 'delete-row') {
            $container.find(`[data-twb-action="delete-row"][data-twb-ri="${ri}"]`).trigger('click');
          }
        }
      });
    });

    // fillMode change
    $container.on('change.twb', '[data-twb-field="fillMode"]', () => {
      const cfg = collect($container);
      saveTableWorkbenchConfig(cfg);
    });

    // auto-save on blur/change for inline inputs
    $container.on('blur.twb change.twb', '[data-twb-name], [data-twb-note], [data-twb-col] input, [data-twb-col] select, [data-twb-col] checkbox, [data-twb-row] input, [data-twb-row] select, [data-twb-field]', function () {
      if ($(this).attr('data-twb-field') === 'fillMode') return;
      const cfg = collect($container);
      saveTableWorkbenchConfig(cfg);
    });
  },

  destroy($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    TableCellPopupMenu.destroy();
    $container.off('.twb');
  },

  getStyles() { return CSS; },

  renderTo($container, { config } = {}) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    const cfg = config && typeof config === 'object' ? config : getTableWorkbenchConfig();
    this.currentTableIndex = idx(cfg.tables, cfg.__activeTableIndex ?? this.currentTableIndex);
    $container.html(this.render({ config: cfg }));
    this.bindEvents($container);
  }
};

export default TableWorkbenchPanel;
