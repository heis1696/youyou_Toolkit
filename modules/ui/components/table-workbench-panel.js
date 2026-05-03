/**
 * YouYou Toolkit - 填表工作台面板
 * 主界面运行控制台 + 单表配置抽屉
 */
import { escapeHtml, getJQuery, isContainerValid, showToast, showTopNotice } from '../utils.js';
import { TOOL_CONFIG_PANEL_STYLES } from './tool-config-panel-factory.js';
import { renderTableAuxiliaryFields } from './table-form-renderer.js';
import { TableCellPopupMenu, getPopupMenuStyles } from './table-cell-popup-menu.js';
import { variableResolver } from '../../variable-resolver.js';
import { getAllPresets } from '../../preset-manager.js';
import { getPresetList as getBypassPresetList } from '../../bypass-manager.js';
import {
  getTableWorkbenchConfig, getTableWorkbenchFormSchema, saveTableWorkbenchConfig,
  validateTableDraftDeep, TABLE_FILL_MODE, TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS,
  getTableWorkbenchBuiltinTemplates
} from '../../table-engine/table-schema-service.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';

const CSS = `${TOOL_CONFIG_PANEL_STYLES} ${getPopupMenuStyles()}

.yyt-twb {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:16px;
  min-height:620px;
  overflow:hidden;
}

.yyt-twb textarea { resize:vertical; }
.yyt-twb-dashboard { display:flex; flex-direction:column; gap:16px; min-height:0; overflow:auto; padding-bottom:8px; }
.yyt-twb-dashboard-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
.yyt-twb-card,
.yyt-twb-editor-section {
  border-radius:18px;
}
.yyt-twb-card-header,
.yyt-twb-section-header {
  display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:12px;
}
.yyt-twb-card-header h3,
.yyt-twb-section-header h3,
.yyt-twb-section-header h4 { margin:0; color:var(--yyt-text); font-size:14px; }
.yyt-twb-section-header p,
.yyt-twb-card-header p { margin:4px 0 0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.5; }
.yyt-twb-metrics { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px; }
.yyt-twb-metrics > div { padding:10px; border:1px solid rgba(255,255,255,0.08); border-radius:14px; background:rgba(255,255,255,0.04); }
.yyt-twb-metrics span { display:block; color:var(--yyt-text-muted); font-size:11px; margin-bottom:4px; }
.yyt-twb-metrics strong { color:var(--yyt-text); font-size:13px; }
.yyt-twb-runtime-message { margin-top:10px; color:var(--yyt-text-secondary); font-size:12px; line-height:1.6; }

.yyt-twb-field { display:flex; flex-direction:column; gap:6px; margin:0 0 10px; }
.yyt-twb-field > span { color:var(--yyt-text-secondary); font-size:12px; font-weight:700; }
.yyt-twb-field small { color:var(--yyt-text-muted); font-size:11px; line-height:1.45; }
.yyt-twb-check-row,
.yyt-twb-radio-group label,
.yyt-twb-table-chip {
  display:flex; align-items:center; gap:8px; color:var(--yyt-text-secondary); font-size:12px;
}
.yyt-twb-radio-group { display:flex; flex-direction:column; gap:7px; margin-bottom:10px; }
.yyt-twb-segmented { display:inline-flex; gap:4px; padding:3px; border:1px solid rgba(255,255,255,0.08); border-radius:999px; background:rgba(255,255,255,0.04); }
.yyt-twb-segmented button {
  border:none; border-radius:999px; padding:5px 10px; background:transparent; color:var(--yyt-text-secondary);
  cursor:pointer; font-size:12px; font-weight:700;
}
.yyt-twb-segmented button.active { background:rgba(123,183,255,0.16); color:var(--yyt-text); }
.yyt-twb-action-grid { display:flex; flex-wrap:wrap; gap:8px; }
.yyt-twb-table-chip-list { display:flex; flex-wrap:wrap; gap:8px; margin:10px 0; }
.yyt-twb-table-chip { padding:6px 9px; border:1px solid rgba(255,255,255,0.08); border-radius:999px; background:rgba(255,255,255,0.04); }
.yyt-twb-muted { color:var(--yyt-text-muted); font-size:12px; }
.yyt-twb-help { margin:0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.6; }

.yyt-twb-table-card-list { display:flex; flex-direction:column; gap:10px; }
.yyt-twb-table-card {
  display:grid; grid-template-columns:minmax(0,1fr) auto; gap:12px;
  padding:14px; border:1px solid rgba(255,255,255,0.08); border-radius:18px; background:rgba(255,255,255,0.04);
}
.yyt-twb-table-card-main h4 { margin:0; color:var(--yyt-text); font-size:14px; }
.yyt-twb-table-card-main p { margin:5px 0 0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.5; }
.yyt-twb-table-card-meta { display:flex; flex-wrap:wrap; gap:8px; color:var(--yyt-text-secondary); font-size:12px; margin-top:10px; }
.yyt-twb-table-card-actions { display:flex; align-items:center; justify-content:flex-end; gap:8px; flex-wrap:wrap; }
.yyt-twb-empty {
  padding:22px; border:1px dashed rgba(255,255,255,0.16); border-radius:18px;
  color:var(--yyt-text-secondary); background:rgba(255,255,255,0.035); text-align:center;
}
.yyt-twb-empty h4 { margin:0 0 6px; color:var(--yyt-text); font-size:14px; }
.yyt-twb-empty p { margin:0 0 12px; font-size:12px; line-height:1.6; }

.yyt-twb-editor-drawer {
  position:absolute; inset:0 0 0 auto; width:min(920px,92%);
  background:rgba(8,12,18,0.72); backdrop-filter:blur(10px);
  border-left:1px solid rgba(255,255,255,0.1); transform:translateX(100%);
  transition:transform 180ms ease; z-index:20;
}
.yyt-twb-editor-drawer.is-open { transform:translateX(0); }
.yyt-twb-editor { height:100%; display:flex; flex-direction:column; background:var(--yyt-bg); }
.yyt-twb-editor-header,
.yyt-twb-editor-footer {
  display:flex; justify-content:space-between; align-items:flex-start; gap:12px;
  padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.08);
}
.yyt-twb-editor-footer { border-top:1px solid rgba(255,255,255,0.08); border-bottom:none; justify-content:flex-end; }
.yyt-twb-editor-header h3 { margin:0; color:var(--yyt-text); font-size:16px; }
.yyt-twb-editor-header p { margin:4px 0 0; color:var(--yyt-text-secondary); font-size:12px; }
.yyt-twb-editor-body { overflow:auto; padding:16px; display:flex; flex-direction:column; gap:14px; }

.yyt-twb-ai-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
.yyt-twb-field-card-list { display:flex; flex-direction:column; gap:10px; }
.yyt-twb-field-card {
  position:relative; display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px;
  padding:12px; border:1px solid rgba(255,255,255,0.08); border-radius:18px; background:rgba(255,255,255,0.035);
}
.yyt-twb-field-card-main { display:grid; grid-template-columns:220px minmax(0,1fr); gap:10px; }
.yyt-twb-field-advanced { grid-column:1 / -1; border-top:1px solid rgba(255,255,255,0.08); padding-top:8px; }
.yyt-twb-field-advanced summary { cursor:pointer; color:var(--yyt-text-secondary); font-size:12px; font-weight:700; }
.yyt-twb-advanced-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:10px; }

.yyt-twb-rows-workspace { background:rgba(255,255,255,0.035); }
.yyt-twb-row-toolbar { display:flex; gap:8px; margin-bottom:12px; align-items:center; flex-wrap:wrap; }
.yyt-twb-row-toolbar .yyt-input { flex:1; min-width:180px; }
.yyt-twb-row-list { display:flex; flex-direction:column; gap:12px; }
.yyt-twb-row-card {
  border:1px solid rgba(255,255,255,0.08); border-radius:18px; background:rgba(255,255,255,0.04); padding:14px;
}
.yyt-twb-row-card.row-new { border-color:rgba(80,200,120,0.5); }
.yyt-twb-row-card.row-updated { border-color:rgba(255,190,80,0.5); }
.yyt-twb-row-card.row-deleted { border-color:rgba(255,90,90,0.5); opacity:0.72; }
.yyt-twb-row-card-header { display:flex; justify-content:space-between; gap:12px; margin-bottom:12px; }
.yyt-twb-row-card-header > div:first-child { display:flex; align-items:center; gap:8px; min-width:0; flex:1; }
.yyt-twb-row-index { color:var(--yyt-text-muted); font-size:12px; font-weight:800; white-space:nowrap; }
.yyt-twb-row-name { max-width:260px; }
.yyt-twb-row-actions { display:flex; align-items:center; gap:8px; }
.yyt-twb-row-fields { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
.yyt-twb-span-2 { grid-column:span 2; }
.yyt-twb-diagnostics details { border:1px solid rgba(255,255,255,0.08); border-radius:14px; background:rgba(255,255,255,0.035); }
.yyt-twb-diagnostics summary { cursor:pointer; padding:10px 12px; color:var(--yyt-text-secondary); font-size:12px; font-weight:800; }
.yyt-twb-diagnostic-grid { display:grid; grid-template-columns:minmax(220px,0.8fr) minmax(0,1.2fr); gap:12px; padding:0 12px 12px; }
.yyt-twb-diagnostic-grid h5 { margin:0 0 8px; color:var(--yyt-text); font-size:12px; }
.yyt-twb-pre { margin:0; padding:10px; max-height:260px; overflow:auto; white-space:pre-wrap; word-break:break-word; border:1px solid rgba(255,255,255,0.08); border-radius:12px; background:rgba(0,0,0,0.18); color:var(--yyt-text-secondary); font-family:'Fira Code','Consolas',monospace; font-size:11px; line-height:1.6; }

@media (max-width:980px) {
  .yyt-twb-dashboard-grid { grid-template-columns:1fr; }
  .yyt-twb-metrics { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .yyt-twb-table-card { grid-template-columns:1fr; }
  .yyt-twb-table-card-actions { justify-content:flex-start; }
  .yyt-twb-editor-drawer { width:100%; }
  .yyt-twb-ai-grid,
  .yyt-twb-field-card-main,
  .yyt-twb-advanced-grid,
  .yyt-twb-row-fields,
  .yyt-twb-diagnostic-grid { grid-template-columns:1fr; }
  .yyt-twb-span-2 { grid-column:auto; }
}
`;

function S(v, fb = '') { return typeof v === 'string' && v.trim() ? v.trim() : fb; }
function idx(tables, i) { const n = (Array.isArray(tables) ? tables.length : 0); if (n <= 0) return 0; if (!Number.isInteger(i) || i < 0) return 0; return Math.min(i, n - 1); }
function dump(v) { try { return JSON.stringify(v, null, 2); } catch (_) { return String(v ?? ''); } }
function schema() { return getTableWorkbenchFormSchema({ apiPresets: getAllPresets() }); }
function instruction(table, key) { return S(table?.aiInstructions?.[key], ''); }
function ensureInstructions(table = {}) {
  return {
    init: instruction(table, 'init'),
    create: instruction(table, 'create'),
    update: instruction(table, 'update'),
    delete: instruction(table, 'delete')
  };
}
function statusLabel(status) {
  const s = S(status, 'idle');
  if (s === 'running') return '运行中';
  if (s === 'success') return '最近成功';
  if (s === 'error') return '最近失败';
  return '未运行';
}
function formatTime(ts) { return ts ? new Date(ts).toLocaleString() : '—'; }
function formatDuration(ms) { return Number.isFinite(ms) && ms > 0 ? `${(ms / 1000).toFixed(ms >= 1000 ? 1 : 2)}s` : '—'; }
function tableId(table, index) { return S(table?.id || table?.key, `table_${index}`); }
function tableSummary(table) {
  const columns = Array.isArray(table?.columns) ? table.columns.length : 0;
  const rows = Array.isArray(table?.rows) ? table.rows.length : 0;
  return `${columns} 字段 · ${rows} 行`;
}

function collect($c, fb) {
  const $ = getJQuery();
  const base = fb && typeof fb === 'object' ? fb : getTableWorkbenchConfig();
  if (!$ || !isContainerValid($c)) return base;
  const cfg = { ...base, runtime: base.runtime || {} };
  const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
  const ti = idx(tables, cfg.__activeTableIndex ?? 0);

  if (tables[ti]) {
    const source = tables[ti] || {};
    const t = { ...source, aiInstructions: ensureInstructions(source) };
    const $tn = $c.find('[data-twb-name]'); if ($tn.length) t.name = String($tn.val() || '').trim();
    const $nt = $c.find('[data-twb-note]'); if ($nt.length) t.note = String($nt.val() || '').trim();
    $c.find('[data-twb-table-instruction]').each(function () {
      const key = String($(this).attr('data-twb-table-instruction') || '').trim();
      if (key) t.aiInstructions[key] = String($(this).val() || '').trim();
    });

    if ($c.find('[data-twb-col]').length) {
      t.columns = [];
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
    }

    if ($c.find('[data-twb-row]').length) {
      t.rows = [];
      $c.find('[data-twb-row]').each(function () {
        const r = $(this);
        const cells = {};
        (t.columns || []).forEach(c => { cells[c.key] = S(r.find(`[data-twb-cell="${c.key}"]`).val(), ''); });
        t.rows.push({ name: S(r.find('[data-twb-row-name]').val(), ''), cells });
      });
    }

    tables[ti] = t;
  }

  const $pm = $c.find('[data-twb-field="promptTemplate"]'); if ($pm.length) cfg.promptTemplate = String($pm.val() || '');
  const $ap = $c.find('[data-twb-field="apiPreset"]'); if ($ap.length) cfg.apiPreset = String($ap.val() || '');
  const $fm = $c.find('[data-twb-field="fillMode"]'); if ($fm.length) cfg.fillMode = String($fm.val() || '');
  const $mm = $c.find('[data-twb-field="mirrorToMessage"]'); if ($mm.length) cfg.mirrorToMessage = $mm.is(':checked');
  const $au = $c.find('[data-twb-field="autoUpdateEnabled"]'); if ($au.length) cfg.autoUpdateEnabled = $au.is(':checked');
  const $at = $c.find('[data-twb-field="autoUpdateTrigger"]'); if ($at.length) cfg.autoUpdateTrigger = String($at.val() || 'assistantMessage');
  const $rs = $c.find('[data-twb-field="runScope"]:checked'); if ($rs.length) cfg.runScope = String($rs.val() || 'enabled');
  const $pt = $c.find('[data-twb-field="promptPreset"]'); if ($pt.length) cfg.promptPreset = String($pt.val() || '');
  const $be = $c.find('[data-twb-field="bypassEnabled"]');
  const bypassPresetId = String(cfg.promptPreset || '');
  cfg.bypass = {
    ...(cfg.bypass || {}),
    enabled: $be.length ? $be.is(':checked') : cfg.bypass?.enabled === true,
    presetId: bypassPresetId
  };
  const $tm = $c.find('[data-twb-field="activeTemplate"]'); if ($tm.length) cfg.activeTemplate = String($tm.val() || '');

  cfg.tables = tables;
  return cfg;
}

function renderStatusChip(status) {
  const s = S(status, 'idle');
  return `<span class="yyt-tool-runtime-badge yyt-status-${escapeHtml(s)}">${escapeHtml(statusLabel(s))}</span>`;
}

function renderHeader(cfg) {
  return `
    <header class="yyt-tool-panel-hero">
      <div class="yyt-tool-panel-hero-copy">
        <div class="yyt-tool-panel-hero-title"><i class="fa-solid fa-table-cells"></i> 填表工作台</div>
        <div class="yyt-tool-panel-hero-desc">结构化状态与关系数据工作台，按当前 assistant 消息执行 AI 填表。</div>
      </div>
      <div class="yyt-tool-panel-hero-tags">
        ${renderStatusChip(cfg?.runtime?.lastStatus)}
        <button class="yyt-btn yyt-btn-secondary yyt-tool-save-top" data-twb-action="save"><i class="fa-solid fa-save"></i> 保存</button>
        <button class="yyt-btn yyt-btn-primary" data-twb-action="run"><i class="fa-solid fa-play"></i> 立即填表</button>
      </div>
    </header>`;
}

function renderRuntimeOverview(cfg) {
  const rt = cfg?.runtime || {};
  return `
    <article class="yyt-panel-section yyt-twb-card yyt-twb-runtime-card">
      <div class="yyt-twb-card-header">
        <div><h3>运行概览</h3><p>最近一次填表执行结果。</p></div>
        ${renderStatusChip(rt.lastStatus)}
      </div>
      <div class="yyt-twb-metrics">
        <div><span>最近运行</span><strong>${escapeHtml(formatTime(rt.lastRunAt))}</strong></div>
        <div><span>耗时</span><strong>${escapeHtml(formatDuration(rt.lastDurationMs))}</strong></div>
        <div><span>成功</span><strong>${Number(rt.successCount) || 0}</strong></div>
        <div><span>失败</span><strong>${Number(rt.errorCount) || 0}</strong></div>
      </div>
      <div class="yyt-twb-runtime-message">最近错误：${escapeHtml(S(rt.lastError, '无'))}</div>
    </article>`;
}

function renderAutoUpdateSettings(cfg) {
  return `
    <article class="yyt-panel-section yyt-twb-card">
      <div class="yyt-twb-card-header">
        <div><h3>自动更新</h3><p>控制默认运行方式与写回策略。</p></div>
        <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="autoUpdateEnabled" ${cfg.autoUpdateEnabled ? 'checked' : ''}><span>启用</span></label>
      </div>
      <label class="yyt-twb-field">
        <span>触发时机</span>
        <select class="yyt-select" data-twb-field="autoUpdateTrigger">
          <option value="assistantMessage" ${cfg.autoUpdateTrigger !== 'manual' && cfg.autoUpdateTrigger !== 'custom' ? 'selected' : ''}>assistant 消息后</option>
          <option value="manual" ${cfg.autoUpdateTrigger === 'manual' ? 'selected' : ''}>仅手动</option>
          <option value="custom" ${cfg.autoUpdateTrigger === 'custom' ? 'selected' : ''}>自定义</option>
        </select>
      </label>
      <label class="yyt-twb-field">
        <span>默认更新模式</span>
        <select class="yyt-select" data-twb-field="fillMode">
          <option value="${TABLE_FILL_MODE.INCREMENTAL}" ${cfg.fillMode !== TABLE_FILL_MODE.FULL ? 'selected' : ''}>增量更新</option>
          <option value="${TABLE_FILL_MODE.FULL}" ${cfg.fillMode === TABLE_FILL_MODE.FULL ? 'selected' : ''}>全量重写</option>
        </select>
      </label>
      <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="mirrorToMessage" ${cfg.mirrorToMessage ? 'checked' : ''}><span>镜像写回正文</span></label>
    </article>`;
}

function renderAiBindingSettings(cfg) {
  const presets = getAllPresets();
  const bypassPresets = getBypassPresetList() || [];
  const bypassEnabled = cfg?.bypass?.enabled === true;
  const bypassPresetId = S(cfg?.bypass?.presetId || cfg?.promptPreset, '');
  return `
    <article class="yyt-panel-section yyt-twb-card">
      <div class="yyt-twb-card-header">
        <div><h3>AI 绑定</h3><p>选择填表使用的 API、Ai 指令预设与填表 Prompt。</p></div>
        <span class="yyt-twb-muted">API 与 Ai 指令</span>
      </div>
      <label class="yyt-twb-field">
        <span>API 预设</span>
        <select class="yyt-select" data-twb-field="apiPreset">
          <option value="" ${!cfg.apiPreset ? 'selected' : ''}>使用当前 API 配置</option>
          ${presets.map(p => `<option value="${escapeHtml(p?.name || '')}" ${cfg.apiPreset === p?.name ? 'selected' : ''}>${escapeHtml(p?.name || '')}</option>`).join('')}
        </select>
      </label>
      <label class="yyt-twb-check-row">
        <input type="checkbox" data-twb-field="bypassEnabled" ${bypassEnabled ? 'checked' : ''}>
        <span>启用 Ai 指令预设</span>
      </label>
      <label class="yyt-twb-field yyt-twb-bypass-preset ${bypassEnabled ? '' : 'yyt-hidden'}">
        <span>绑定 Ai 指令预设</span>
        <select class="yyt-select" data-twb-field="promptPreset">
          <option value="" ${!bypassPresetId ? 'selected' : ''}>选择预设</option>
          ${bypassPresets.map(preset => `<option value="${escapeHtml(preset?.id || '')}" ${bypassPresetId === preset?.id ? 'selected' : ''}>${escapeHtml(preset?.name || preset?.id || '')}</option>`).join('')}
        </select>
        <small>启用后会作为填表请求的前置消息发送，复用破限模块中的 Ai 指令预设。</small>
      </label>
      <details>
        <summary class="yyt-twb-muted" style="cursor:pointer;font-weight:700;">查看 / 编辑填表 Prompt</summary>
        <label class="yyt-twb-field" style="margin-top:10px;">
          <span>填表 Prompt</span>
          <textarea class="yyt-code-textarea" rows="9" data-twb-field="promptTemplate">${escapeHtml(cfg.promptTemplate || '')}</textarea>
        </label>
      </details>
    </article>`;
}

function renderTemplateManager(cfg) {
  const templates = getTableWorkbenchBuiltinTemplates();
  return `
    <article class="yyt-panel-section yyt-twb-card yyt-twb-template-card">
      <div class="yyt-twb-card-header">
        <div><h3>模板管理</h3><p>复用表格结构与 AI 操作说明。</p></div>
        <span class="yyt-twb-muted">结构模板</span>
      </div>
      <label class="yyt-twb-field">
        <span>当前模板</span>
        <select class="yyt-select" data-twb-field="activeTemplate">
          <option value="" ${!cfg.activeTemplate ? 'selected' : ''}>不切换模板</option>
          ${templates.map(template => `<option value="${escapeHtml(template.id)}" ${cfg.activeTemplate === template.id ? 'selected' : ''}>${escapeHtml(template.name)}</option>`).join('')}
        </select>
      </label>
      <p class="yyt-twb-help">内置默认模板可直接应用；导入/导出会在后续模板库阶段接入。</p>
      <div class="yyt-twb-action-grid">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="apply-template">应用模板</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="save-template">保存为模板</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="import-template">导入模板</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="export-template">导出模板</button>
      </div>
    </article>`;
}

function renderManualRunPanel(cfg) {
  const tables = Array.isArray(cfg.tables) ? cfg.tables : [];
  const runScope = S(cfg.runScope, 'enabled');
  return `
    <article class="yyt-panel-section yyt-twb-card yyt-twb-manual-card">
      <div class="yyt-twb-card-header">
        <div><h3>手动更新</h3><p>选择本次想让 AI 关注的表。</p></div>
        <span class="yyt-twb-muted">${tables.length} 张表</span>
      </div>
      <div class="yyt-twb-radio-group">
        <label><input type="radio" name="twbRunScope" value="enabled" data-twb-field="runScope" ${runScope === 'enabled' ? 'checked' : ''}>所有启用表格</label>
        <label><input type="radio" name="twbRunScope" value="selected" data-twb-field="runScope" ${runScope === 'selected' ? 'checked' : ''}>仅选中表格</label>
        <label><input type="radio" name="twbRunScope" value="current" data-twb-field="runScope" ${runScope === 'current' ? 'checked' : ''}>当前打开表格</label>
      </div>
      <div class="yyt-twb-table-chip-list">
        ${tables.length ? tables.map((t, i) => `<label class="yyt-twb-table-chip"><input type="checkbox" data-twb-run-table="${escapeHtml(tableId(t, i))}"><span>${escapeHtml(S(t?.name, `表格 ${i + 1}`))}</span></label>`).join('') : '<span class="yyt-twb-muted">还没有可更新的表格。</span>'}
      </div>
      <div class="yyt-twb-card-actions">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="run-selected">仅更新选中表格</button>
        <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-twb-action="run">立即填表</button>
      </div>
    </article>`;
}

function renderTableOverviewList(cfg) {
  const tables = Array.isArray(cfg.tables) ? cfg.tables : [];
  const validation = validateTableDraftDeep({ tables });
  return `
    <section class="yyt-twb-table-overview">
      <div class="yyt-twb-section-header">
        <div><h3>表格</h3><p>管理需要 AI 维护的结构化表格。</p></div>
        <button class="yyt-btn yyt-btn-secondary" data-twb-action="add-table"><i class="fa-solid fa-plus"></i> 新建表格</button>
      </div>
      ${tables.length ? `
        <div class="yyt-twb-table-card-list">
          ${tables.map((table, i) => {
            const issues = (validation.issues || []).filter(issue => issue.tableIndex === i);
            return `
              <article class="yyt-twb-table-card" data-twb-select="${i}">
                <div class="yyt-twb-table-card-main">
                  <h4>${escapeHtml(S(table?.name, `表格 ${i + 1}`))}</h4>
                  <p>${escapeHtml(S(table?.note, '还没有表格说明。'))}</p>
                  <div class="yyt-twb-table-card-meta">
                    <span>${escapeHtml(tableSummary(table))}</span>
                    ${renderStatusChip(cfg?.runtime?.lastStatus)}
                    <span>${issues.length} 个问题</span>
                  </div>
                </div>
                <div class="yyt-twb-table-card-actions">
                  <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="open-table-editor" data-twb-ti="${i}">配置表格</button>
                  <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="run-table" data-twb-ti="${i}">更新此表</button>
                  ${tables.length > 1 ? `<button class="yyt-btn yyt-btn-danger yyt-btn-small" data-twb-action="delete-table" data-twb-ti="${i}" title="删除表格">删除</button>` : ''}
                </div>
              </article>`;
          }).join('')}
        </div>` : `
        <div class="yyt-twb-empty">
          <h4>还没有表格</h4>
          <p>先新建一张表，再定义字段和数据行。</p>
          <button class="yyt-btn yyt-btn-primary" data-twb-action="add-table">新建第一张表</button>
        </div>`}
    </section>`;
}

function renderDashboard(cfg) {
  return `
    <main class="yyt-twb-dashboard">
      <section class="yyt-twb-dashboard-grid">
        ${renderRuntimeOverview(cfg)}
        ${renderAutoUpdateSettings(cfg)}
        ${renderAiBindingSettings(cfg)}
        ${renderTemplateManager(cfg)}
        ${renderManualRunPanel(cfg)}
      </section>
      ${renderTableOverviewList(cfg)}
    </main>`;
}

function renderTableBaseInfo(table) {
  return `
    <section class="yyt-panel-section yyt-twb-editor-section">
      <div class="yyt-twb-section-header"><div><h4>表格基础信息</h4><p>告诉 AI 这张表代表什么，以及它应该追踪哪类信息。</p></div></div>
      <label class="yyt-twb-field"><span>表名</span><input class="yyt-input" data-twb-name value="${escapeHtml(table?.name || '')}" placeholder="表名"></label>
      <label class="yyt-twb-field"><span>表格说明</span><textarea class="yyt-textarea" rows="3" data-twb-note placeholder="例如：记录角色基础信息、状态和关系变化。">${escapeHtml(table?.note || '')}</textarea></label>
    </section>`;
}

function renderTableAiInstructions(table) {
  const items = [
    ['init', '初始化说明', '当表格为空时，AI 应该如何创建初始数据。'],
    ['create', '新增说明', '什么时候应该新增一行。'],
    ['update', '更新说明', '什么时候应该更新已有行。'],
    ['delete', '删除说明', '什么时候应该删除或标记删除一行。']
  ];
  return `
    <section class="yyt-panel-section yyt-twb-editor-section yyt-twb-ai-instructions">
      <div class="yyt-twb-section-header"><div><h4>AI 理解与操作说明</h4><p>让 AI 自行判断是否需要初始化、新增、更新或删除这张表的数据。</p></div></div>
      <div class="yyt-twb-ai-grid">
        ${items.map(([key, label, help]) => `
          <label class="yyt-twb-field">
            <span>${label}</span>
            <small>${help}</small>
            <textarea class="yyt-textarea" rows="3" data-twb-table-instruction="${key}">${escapeHtml(instruction(table, key))}</textarea>
          </label>`).join('')}
      </div>
    </section>`;
}

function renderFieldStructure(table) {
  const cols = Array.isArray(table?.columns) ? table.columns : [];
  return `
    <section class="yyt-panel-section yyt-twb-editor-section">
      <div class="yyt-twb-section-header">
        <div><h4>字段结构</h4><p>告诉 AI 每一行需要填写哪些信息。默认只展示用户可理解的字段名和填写说明。</p></div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="add-col">添加字段</button>
      </div>
      ${cols.length ? `
        <div class="yyt-twb-field-card-list">
          ${cols.map((c) => `
            <article class="yyt-twb-field-card" data-twb-col>
              <div class="yyt-twb-field-card-main">
                <label class="yyt-twb-field"><span>字段名</span><input class="yyt-input" data-twb-col-title value="${escapeHtml(c.title || '')}" placeholder="字段名"></label>
                <label class="yyt-twb-field"><span>AI 填写说明</span><textarea class="yyt-textarea" rows="2" data-twb-col-desc placeholder="告诉 AI 这个字段该填什么。">${escapeHtml(c.description || '')}</textarea></label>
              </div>
              <button class="yyt-btn yyt-btn-icon" data-twb-action="delete-col" data-twb-ci="${escapeHtml(c.key || '')}" title="删除字段" aria-label="删除字段"><i class="fa-solid fa-trash"></i></button>
              <details class="yyt-twb-field-advanced">
                <summary>高级设置</summary>
                <div class="yyt-twb-advanced-grid">
                  <label class="yyt-twb-field"><span>内部标识 key</span><input class="yyt-input" data-twb-col-key value="${escapeHtml(c.key || '')}" placeholder="col_key"></label>
                  <label class="yyt-twb-field"><span>内容格式</span><select class="yyt-select" data-twb-col-type>${TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS.map(o => `<option value="${o.value}" ${c.type === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}</select></label>
                  <label class="yyt-twb-check-row"><input type="checkbox" data-twb-col-req ${c.required ? 'checked' : ''}><span>AI 必须尝试填写</span></label>
                </div>
              </details>
            </article>`).join('')}
        </div>` : `
        <div class="yyt-twb-empty"><h4>还没有字段</h4><p>字段决定 AI 输出格式，也决定每行可填写的内容。</p><button class="yyt-btn yyt-btn-secondary" data-twb-action="add-col">添加字段</button></div>`}
    </section>`;
}

function renderRowField(column, row) {
  const key = column?.key || '';
  const title = column?.title || key;
  const val = row?.cells && row.cells[key] !== undefined ? row.cells[key] : '';
  const required = column?.required ? ' *' : '';
  if (column?.type === 'boolean') {
    return `
      <label class="yyt-twb-field">
        <span>${escapeHtml(title)}${required}</span>
        <select class="yyt-select" data-twb-cell="${escapeHtml(key)}">
          <option value="" ${val === '' ? 'selected' : ''}>—</option>
          <option value="true" ${val === 'true' ? 'selected' : ''}>是</option>
          <option value="false" ${val === 'false' ? 'selected' : ''}>否</option>
        </select>
      </label>`;
  }
  if (column?.type === 'json') {
    return `<label class="yyt-twb-field yyt-twb-span-2"><span>${escapeHtml(title)}${required}</span><textarea class="yyt-textarea" rows="4" data-twb-cell="${escapeHtml(key)}">${escapeHtml(val)}</textarea></label>`;
  }
  return `<label class="yyt-twb-field ${column?.type === 'text' && String(val).length > 80 ? 'yyt-twb-span-2' : ''}"><span>${escapeHtml(title)}${required}</span><input class="yyt-input" type="${column?.type === 'number' ? 'number' : 'text'}" data-twb-cell="${escapeHtml(key)}" value="${escapeHtml(val)}" placeholder="${escapeHtml(title)}"></label>`;
}

function rowStatus(diff, row, ri) {
  const rowName = row?.name || `__row_${ri}`;
  const rd = diff?.[rowName];
  if (rd?.__rowStatus === 'new') return 'new';
  if (rd && Object.entries(rd).some(([k, v]) => k !== '__rowStatus' && (v === 'updated' || v === 'new'))) return 'updated';
  return '';
}
function rowStatusLabel(status) { return status === 'new' ? '新增' : (status === 'updated' ? '已更新' : '手动'); }

function renderDataRowsWorkspace(table, diff) {
  const cols = Array.isArray(table?.columns) ? table.columns : [];
  const rows = Array.isArray(table?.rows) ? table.rows : [];
  return `
    <section class="yyt-panel-section yyt-twb-editor-section yyt-twb-rows-workspace">
      <div class="yyt-twb-section-header">
        <div><h4>数据行</h4><p>共 ${rows.length} 行 · 最近 AI 更新 ${rows.filter((row, ri) => rowStatus(diff, row, ri)).length} 行</p></div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="add-row">添加行</button>
      </div>
      <div class="yyt-twb-row-toolbar">
        <input class="yyt-input" placeholder="搜索行名或内容" data-twb-row-search>
        <div class="yyt-twb-segmented" data-twb-field="rowFilter">
          <button class="active" data-twb-row-filter="all">全部</button>
          <button data-twb-row-filter="new">新增</button>
          <button data-twb-row-filter="updated">已更新</button>
        </div>
      </div>
      ${rows.length ? `
        <div class="yyt-twb-row-list">
          ${rows.map((row, ri) => {
            const status = rowStatus(diff, row, ri);
            return `
              <article class="yyt-twb-row-card${status ? ` row-${status}` : ''}" data-twb-row data-twb-ri="${ri}">
                <header class="yyt-twb-row-card-header">
                  <div><span class="yyt-twb-row-index">第 ${ri + 1} 行</span><input class="yyt-input yyt-twb-row-name" data-twb-row-name value="${escapeHtml(row?.name || '')}" placeholder="行名（可选）"></div>
                  <div class="yyt-twb-row-actions">
                    <span class="yyt-tool-runtime-badge yyt-status-${status === 'new' ? 'success' : (status === 'updated' ? 'running' : 'idle')}">${rowStatusLabel(status)}</span>
                    <button class="yyt-btn yyt-btn-icon" data-twb-action="delete-row" data-twb-ri="${ri}" title="删除此行" aria-label="删除此行"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </header>
                <div class="yyt-twb-row-fields">${cols.map(c => renderRowField(c, row)).join('')}</div>
              </article>`;
          }).join('')}
        </div>` : `
        <div class="yyt-twb-empty"><h4>暂无数据行</h4><p>可以手动添加一行，或点击“立即填表”让 AI 根据当前对话生成。</p><button class="yyt-btn yyt-btn-secondary" data-twb-action="add-row">添加行</button></div>`}
    </section>`;
}

function renderSingleTableDiagnostics(table, tableIndex, cfg) {
  const validation = validateTableDraftDeep({ tables: Array.isArray(cfg.tables) ? cfg.tables : [] });
  const issues = (validation.issues || []).filter(issue => issue.tableIndex === tableIndex);
  return `
    <section class="yyt-twb-editor-section yyt-twb-diagnostics">
      <details>
        <summary>单表诊断 <span class="yyt-twb-muted">${issues.length} 个校验问题 · JSON 预览</span></summary>
        <div class="yyt-twb-diagnostic-grid">
          <div>
            <h5>校验问题</h5>
            ${issues.length ? `<div class="yyt-twb-pre">${escapeHtml(issues.map(i => i.message).join('\n'))}</div>` : '<div class="yyt-twb-muted">暂无校验问题。</div>'}
          </div>
          <div>
            <h5>JSON 预览</h5>
            <pre class="yyt-twb-pre">${escapeHtml(dump(table || {}))}</pre>
          </div>
        </div>
      </details>
    </section>`;
}

function renderAdvancedDiagnostics(cfg) {
  const draft = { tables: Array.isArray(cfg.tables) ? cfg.tables : [] };
  const v = validateTableDraftDeep(draft);
  const ec = v?.summary?.errorCount || 0;
  return `
    <section class="yyt-twb-editor-section yyt-twb-diagnostics">
      <details>
        <summary>${ec > 0 ? `需要处理：${ec} 个校验问题` : '全局高级设置与运行诊断'}</summary>
        <div style="padding:0 12px 12px;display:flex;flex-direction:column;gap:12px;">
          ${renderTableAuxiliaryFields(schema(), cfg)}
          <div><h5>变量帮助</h5><pre class="yyt-twb-pre">${escapeHtml(variableResolver.getVariableHelp())}</pre></div>
        </div>
      </details>
    </section>`;
}

function renderTableEditorDrawer(cfg, currentIndex, isOpen, diff) {
  const tables = Array.isArray(cfg.tables) ? cfg.tables : [];
  const table = tables[currentIndex] || null;
  if (!isOpen || !table) return '<aside class="yyt-twb-editor-drawer"></aside>';
  return `
    <aside class="yyt-twb-editor-drawer is-open">
      <div class="yyt-twb-editor">
        <header class="yyt-twb-editor-header">
          <div><h3>配置表格：${escapeHtml(S(table.name, `表格 ${currentIndex + 1}`))}</h3><p>${escapeHtml(tableSummary(table))} · ${escapeHtml(statusLabel(cfg?.runtime?.lastStatus))}</p></div>
          <button class="yyt-btn yyt-btn-icon" data-twb-action="close-table-editor" title="关闭" aria-label="关闭"><i class="fa-solid fa-xmark"></i></button>
        </header>
        <div class="yyt-twb-editor-body">
          ${renderTableBaseInfo(table)}
          ${renderTableAiInstructions(table)}
          ${renderFieldStructure(table)}
          ${renderDataRowsWorkspace(table, diff)}
          ${renderSingleTableDiagnostics(table, currentIndex, cfg)}
          ${renderAdvancedDiagnostics(cfg)}
        </div>
        <footer class="yyt-twb-editor-footer">
          <button class="yyt-btn yyt-btn-secondary" data-twb-action="close-table-editor">关闭</button>
          <button class="yyt-btn yyt-btn-primary" data-twb-action="save">保存表格</button>
        </footer>
      </div>
    </aside>`;
}

export const TableWorkbenchPanel = {
  id: 'tableWorkbenchPanel',
  currentTableIndex: 0,
  editorOpen: false,
  lastDiff: null,
  pendingTemplateApplyId: '',

  render({ config } = {}) {
    const cfg = config && typeof config === 'object' ? config : getTableWorkbenchConfig();
    const tables = Array.isArray(cfg.tables) ? cfg.tables : [];
    this.currentTableIndex = idx(tables, cfg.__activeTableIndex ?? this.currentTableIndex);
    const ti = this.currentTableIndex;

    return `
      <div class="yyt-tool-panel yyt-twb" data-tool-id="tableWorkbench">
        ${renderHeader(cfg)}
        ${renderDashboard(cfg)}
        ${renderTableEditorDrawer(cfg, ti, this.editorOpen, this.lastDiff?.[ti])}
      </div>`;
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    const self = this;
    $container.off('.twb');

    $container.on('click.twb', '[data-twb-action="open-table-editor"]', function (e) {
      e.stopPropagation();
      const cfg = collect($container);
      const i = Number($(this).attr('data-twb-ti'));
      cfg.__activeTableIndex = i;
      self.currentTableIndex = idx(cfg.tables, i);
      self.editorOpen = true;
      self.renderTo($container, { config: cfg });
    });

    $container.on('click.twb', '[data-twb-action="close-table-editor"]', function () {
      const cfg = collect($container);
      saveTableWorkbenchConfig(cfg);
      self.editorOpen = false;
      self.renderTo($container, { config: cfg });
    });

    $container.on('click.twb', '[data-twb-select]', function () {
      const i = Number($(this).attr('data-twb-select'));
      const cfg = collect($container);
      cfg.__activeTableIndex = i;
      self.currentTableIndex = idx(cfg.tables, i);
      self.renderTo($container, { config: cfg });
    });

    $container.on('click.twb', '[data-twb-action="add-table"]', function (e) {
      e.stopPropagation();
      const cfg = collect($container);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      tables.push({
        id: `table_${Date.now()}`,
        name: `表格 ${tables.length + 1}`,
        note: '',
        enabled: true,
        aiInstructions: { init: '', create: '', update: '', delete: '' },
        columns: [{ key: 'col_1', title: '属性', type: 'text', required: false, description: '' }],
        rows: []
      });
      cfg.tables = tables;
      cfg.__activeTableIndex = tables.length - 1;
      saveTableWorkbenchConfig(cfg);
      self.currentTableIndex = tables.length - 1;
      self.editorOpen = true;
      self.renderTo($container, { config: cfg });
    });

    $container.on('click.twb', '[data-twb-action="delete-table"]', function (e) {
      e.stopPropagation();
      const ti = Number($(this).attr('data-twb-ti'));
      const cfg = collect($container);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      if (ti < 0 || ti >= tables.length) return;
      tables.splice(ti, 1);
      const next = idx(tables, ti > 0 ? ti - 1 : 0);
      cfg.tables = tables;
      cfg.__activeTableIndex = next;
      saveTableWorkbenchConfig(cfg);
      self.currentTableIndex = next;
      self.editorOpen = false;
      self.renderTo($container, { config: cfg });
    });

    $container.on('click.twb', '[data-twb-action="save"]', () => {
      const cfg = collect($container);
      const r = saveTableWorkbenchConfig(cfg);
      if (r.success) { showToast('success', '已保存'); self.renderTo($container, { config: r.config }); }
      else showTopNotice('warning', r.error || '保存失败', { duration: 4000, noticeId: 'twb-save' });
    });

    $container.on('click.twb', '[data-twb-action="run"], [data-twb-action="run-selected"], [data-twb-action="run-table"]', async function () {
      const action = $(this).attr('data-twb-action');
      const ti = Number($(this).attr('data-twb-ti'));
      const cfg = collect($container);
      if (Number.isInteger(ti)) cfg.__activeTableIndex = ti;
      const r = saveTableWorkbenchConfig(cfg);
      if (!r.success) { showTopNotice('warning', r.error || '保存失败', { duration: 4000, noticeId: 'twb-save' }); return; }
      if (action !== 'run') showTopNotice('warning', '当前执行链仍按完整 tables 上下文运行；单表/选中表范围已保留为 UI 入口。', { duration: 3600, noticeId: 'twb-run-scope' });

      try {
        $(this).prop('disabled', true).text('填表中...');
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

    $container.on('click.twb', '[data-twb-action="add-row"]', () => {
      const cfg = collect($container);
      const ti = idx(cfg.tables, self.currentTableIndex);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      if (!tables[ti]) return;
      const t = { ...tables[ti] };
      t.rows = Array.isArray(t.rows) ? [...t.rows] : [];
      const cells = {}; (t.columns || []).forEach(c => { cells[c.key] = ''; });
      t.rows.push({ name: `行${t.rows.length + 1}`, cells });
      tables[ti] = t; cfg.tables = tables; cfg.__activeTableIndex = ti;
      saveTableWorkbenchConfig(cfg);
      self.renderTo($container, { config: cfg });
    });

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

    $container.on('click.twb', '[data-twb-action="add-col"]', () => {
      const cfg = collect($container);
      const ti = idx(cfg.tables, self.currentTableIndex);
      const tables = Array.isArray(cfg.tables) ? [...cfg.tables] : [];
      if (!tables[ti]) return;
      const t = { ...tables[ti] };
      t.columns = Array.isArray(t.columns) ? [...t.columns] : [];
      const n = t.columns.length + 1;
      t.columns.push({ key: `col_${n}`, title: `字段 ${n}`, type: 'text', required: false, description: '' });
      tables[ti] = t; cfg.tables = tables; cfg.__activeTableIndex = ti;
      saveTableWorkbenchConfig(cfg);
      self.renderTo($container, { config: cfg });
    });

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
            t.rows.splice(Math.max(at, 0), 0, { name: `行${t.rows.length + 1}`, cells });
            tables[ti] = t; cfg.tables = tables; cfg.__activeTableIndex = ti;
            saveTableWorkbenchConfig(cfg);
            self.renderTo($container, { config: cfg });
          } else if (action === 'delete-row') {
            $container.find(`[data-twb-action="delete-row"][data-twb-ri="${ri}"]`).trigger('click');
          }
        }
      });
    });

    $container.on('click.twb', '[data-twb-row-filter]', function () {
      const filter = $(this).attr('data-twb-row-filter');
      $container.find('[data-twb-row-filter]').removeClass('active');
      $(this).addClass('active');
      $container.find('[data-twb-row]').each(function () {
        const show = filter === 'all' || $(this).hasClass(`row-${filter}`);
        $(this).toggle(show);
      });
    });

    $container.on('input.twb', '[data-twb-row-search]', function () {
      const q = String($(this).val() || '').toLowerCase().trim();
      $container.find('[data-twb-row]').each(function () {
        $(this).toggle(!q || $(this).text().toLowerCase().includes(q));
      });
    });

    $container.on('click.twb', '[data-twb-action="apply-template"]', function () {
      const cfg = collect($container);
      const templateId = S(cfg.activeTemplate, '');
      const template = getTableWorkbenchBuiltinTemplates().find(item => item.id === templateId);
      if (!template) {
        showTopNotice('warning', '请选择一个可应用的内置模板。', { duration: 3000, noticeId: 'twb-template' });
        return;
      }

      const hasTables = Array.isArray(cfg.tables) && cfg.tables.length > 0;
      if (hasTables && self.pendingTemplateApplyId !== templateId) {
        self.pendingTemplateApplyId = templateId;
        showTopNotice('warning', '应用模板会替换当前表格。再次点击“应用模板”确认。', { duration: 4200, noticeId: 'twb-template' });
        return;
      }

      cfg.tables = template.tables || [];
      cfg.activeTemplate = template.id;
      cfg.__activeTableIndex = 0;
      const r = saveTableWorkbenchConfig(cfg);
      self.pendingTemplateApplyId = '';
      self.currentTableIndex = 0;
      self.editorOpen = false;
      if (r.success) {
        showTopNotice('success', `已应用模板：${template.name}`, { duration: 2800, noticeId: 'twb-template' });
        self.renderTo($container, { config: r.config });
      } else {
        showTopNotice('warning', r.error || '应用模板失败', { duration: 4000, noticeId: 'twb-template' });
      }
    });

    $container.on('click.twb', '[data-twb-action="save-template"], [data-twb-action="import-template"], [data-twb-action="export-template"]', function () {
      showTopNotice('warning', '模板库入口已预留，导入导出会在后续模板阶段接入。', { duration: 3000, noticeId: 'twb-template' });
    });

    $container.on('change.twb', '[data-twb-field="bypassEnabled"]', function () {
      $container.find('.yyt-twb-bypass-preset').toggleClass('yyt-hidden', !$(this).is(':checked'));
    });

    $container.on('blur.twb change.twb', '[data-twb-name], [data-twb-note], [data-twb-table-instruction], [data-twb-col] input, [data-twb-col] select, [data-twb-col] textarea, [data-twb-row] input, [data-twb-row] select, [data-twb-row] textarea, [data-twb-field]', function () {
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
