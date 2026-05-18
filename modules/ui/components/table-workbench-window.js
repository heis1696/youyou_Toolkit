/**
 * YouYou Toolkit - 填表工作台 View helpers
 *
 * 议题 #15 #10 + hotfix（v1.0.171）：原本的"独立浮窗"方案回退 — preview 里 .win 是 popup tab 内的展示区，
 * 不是真·浏览器浮窗。本模块导出工作台 UI 的 view helpers（HTML 渲染 + 事件绑定 + 状态加载），
 * 由 table-workbench-panel.js 直接内联到 popup tab 渲染。
 *
 * Exports:
 *   - WORKBENCH_VIEW_STYLES: 工作台 UI 的 CSS（panel 注入到 head）
 *   - renderWorkbenchHtml(state): 返回完整 HTML 字符串
 *   - loadWorkbenchState(): 同步收集配置/预设/状态
 *   - bindWorkbenchEvents($container, refresh): 绑定所有 click/change/toggle
 *
 * 说明：openTableWorkbenchWindow 已废弃 — popup tab 直接显示工作台，不再开独立浮窗。
 *      数据编辑器（#11）才走独立窗口（点工作台内"打开数据编辑器"按钮）。
 */

import { logger } from '../../core/logger-service.js';
import {
  getTableWorkbenchConfig,
  saveTableWorkbenchConfig
} from '../../table-engine/table-schema-service.js';
import {
  getAllTableTemplates,
  resolveActiveTemplate,
  setActiveGlobalTemplateId
} from '../../table-engine/table-template-service.js';
import { tableIsolation } from '../../table-engine/table-isolation-service.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';
import { getAssistantTableSnapshot } from '../../table-engine/table-state-service.js';
import { getAllPresets as getApiPresets } from '../../preset-manager.js';
import { getPresetList as getBypassPresets } from '../../bypass-manager.js';
import regexStore from '../../regex-preset-store.js';
import worldbookStore from '../../worldbook-preset-store.js';
import { showToast } from '../utils.js';

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableWorkbenchView');
  return _log;
}

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fmtTime(ts) {
  if (!Number.isFinite(ts) || ts <= 0) return '从未';
  const diff = Date.now() - ts;
  if (diff < 60000) return `${Math.floor(diff / 1000)} 秒前`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
  try { return new Date(ts).toLocaleString(); } catch (_) { return '未知'; }
}

// ────────────────────────────────────────────────────────────────
// CSS — exported for panel to inject
// ────────────────────────────────────────────────────────────────

export const WORKBENCH_VIEW_STYLES = `
.yyt-tww {
  --tww-canvas: var(--yyt-bg-base, #0a0d13);
  --tww-surface-1: var(--yyt-surface, #0f1219);
  --tww-surface-2: var(--yyt-surface-2, #151a24);
  --tww-surface-3: var(--yyt-surface-3, #1c2231);
  --tww-hairline: var(--yyt-border, rgba(255,255,255,0.06));
  --tww-hairline-strong: var(--yyt-border-strong, rgba(255,255,255,0.12));
  --tww-hairline-dashed: rgba(255,255,255,0.08);
  --tww-text: var(--yyt-text, rgba(255,255,255,0.92));
  --tww-text-secondary: var(--yyt-text-secondary, rgba(255,255,255,0.55));
  --tww-text-muted: var(--yyt-text-muted, rgba(255,255,255,0.35));
  --tww-accent: var(--yyt-accent, #7bb7ff);
  --tww-accent-soft: var(--yyt-accent-soft, rgba(123,183,255,0.15));
  --tww-accent-strong: var(--yyt-accent-strong, #a5d4ff);
  --tww-on-accent: var(--yyt-on-accent, #0a0d13);
  --tww-success: var(--yyt-success, #4ade80);
  --tww-success-soft: rgba(74,222,128,0.12);
  --tww-warning: var(--yyt-warning, #fbbf24);
  --tww-warning-soft: rgba(251,191,36,0.14);
  --tww-error: var(--yyt-error, #ef4444);
  --tww-error-soft: rgba(239,68,68,0.12);
  --tww-purple: #a78bfa;
  --tww-purple-soft: rgba(167,139,250,0.12);

  display: flex; flex-direction: column;
  min-height: 100%;
  /* 议题 #15 hotfix v1.0.173：父容器（popup yyt-content）已是深色，本容器透明继承避免边界错位 */
  background: transparent; color: var(--tww-text);
  font-size: 13px; line-height: 1.5;
}
.yyt-tww-hero {
  flex-shrink: 0;
  padding: 14px 18px;
  border-bottom: 1px solid var(--tww-hairline);
  background: var(--tww-surface-1);
  display: flex; flex-direction: column; gap: 8px;
}
.yyt-tww-hero-row1 { display: flex; align-items: center; gap: 12px; }
.yyt-tww-hero-icon {
  width: 30px; height: 30px; border-radius: 6px;
  background: var(--tww-accent-soft); color: var(--tww-accent);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 14px; flex-shrink: 0;
}
.yyt-tww-hero-name { flex: 1; font-size: 15px; font-weight: 700; min-width: 0; }
.yyt-tww-hero-actions { display: flex; gap: 8px; flex-shrink: 0; }
.yyt-tww-hero-desc { font-size: 12px; color: var(--tww-text-muted); padding-left: 42px; }
.yyt-tww-hero-chips { display: flex; gap: 6px; flex-wrap: wrap; padding-left: 42px; }
.yyt-tww-chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 2px 8px; border-radius: 999px;
  font-size: 10px; font-weight: 600; letter-spacing: 0.3px;
  background: var(--tww-surface-2); color: var(--tww-text-muted);
}
.yyt-tww-chip.mode { background: var(--tww-purple-soft); color: var(--tww-purple); }
.yyt-tww-chip.preset { background: var(--tww-accent-soft); color: var(--tww-accent); }
.yyt-tww-chip.status-success { background: var(--tww-success-soft); color: var(--tww-success); }
.yyt-tww-chip.status-failed { background: var(--tww-error-soft); color: #ffb4b4; }

.yyt-tww-stat-row {
  display: grid; grid-template-columns: repeat(4, 1fr);
  padding: 12px 18px;
  border-bottom: 1px solid var(--tww-hairline);
  flex-shrink: 0;
}
.yyt-tww-stat {
  display: flex; flex-direction: column; gap: 2px;
  border-left: 1px solid var(--tww-hairline);
  padding-left: 14px;
}
.yyt-tww-stat:first-child { border-left: none; padding-left: 0; }
.yyt-tww-stat-label {
  font-size: 10px; font-weight: 700; color: var(--tww-text-muted);
  text-transform: uppercase; letter-spacing: 0.4px;
}
.yyt-tww-stat-value { font-size: 12px; font-weight: 600; color: var(--tww-text); font-variant-numeric: tabular-nums; }
.yyt-tww-stat-value.success { color: var(--tww-success); }
.yyt-tww-stat-value.error { color: var(--tww-error); }
.yyt-tww-stat-value.muted { color: var(--tww-text-muted); }

.yyt-tww-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px;
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 6px;
  background: var(--tww-surface-2);
  color: var(--tww-text-secondary);
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: all 0.12s ease; white-space: nowrap;
  font-family: inherit;
}
.yyt-tww-btn:hover { background: var(--tww-surface-3); color: var(--tww-text); }
.yyt-tww-btn-primary {
  background: var(--tww-accent); color: var(--tww-on-accent);
  border-color: transparent; font-weight: 700;
}
.yyt-tww-btn-primary:hover { background: var(--tww-accent-strong); color: var(--tww-on-accent); }
.yyt-tww-btn-small { padding: 5px 10px; font-size: 11px; }

.yyt-tww-body {
  padding: 0 18px 22px;
}
.yyt-tww-section { padding-top: 22px; }
.yyt-tww-section:first-child { padding-top: 18px; }
.yyt-tww-section + .yyt-tww-section {
  margin-top: 22px;
  border-top: 1px solid var(--tww-hairline);
}
.yyt-tww-section-heading {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 12px;
  font-size: 12px; font-weight: 700; color: var(--tww-text);
  text-transform: uppercase; letter-spacing: 0.3px;
}
.yyt-tww-section-icon {
  width: 22px; height: 22px; border-radius: 6px;
  background: var(--tww-accent-soft); color: var(--tww-accent);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px;
}
.yyt-tww-section-action { margin-left: auto; display: flex; gap: 6px; }

.yyt-tww-row {
  display: grid; grid-template-columns: 130px 1fr auto;
  gap: 12px; align-items: center;
  padding: 10px 0;
}
.yyt-tww-row + .yyt-tww-row { border-top: 1px dashed var(--tww-hairline-dashed); }
.yyt-tww-row-label { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.yyt-tww-row-label-text { font-size: 12px; font-weight: 600; color: var(--tww-text-secondary); }
.yyt-tww-row-label-hint { font-size: 10px; color: var(--tww-text-muted); }
.yyt-tww-row-meta {
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; color: var(--tww-text-muted);
}
.yyt-tww-row-meta a { color: var(--tww-accent); text-decoration: none; font-weight: 600; cursor: pointer; }
.yyt-tww-row-meta a:hover { text-decoration: underline; }

/* 议题 #15 hotfix v1.0.173：
   工作台 select/input 直接借用 toolkit 的 yyt-select / yyt-input 预制体（带 !important 防御样式 reset），
   在此用 .yyt-tww-ctrl override 缩小到 binding-row 用的紧凑尺寸 */
.yyt-tww-ctrl {
  min-height: 32px !important;
  padding: 6px 10px !important;
  font-size: 12px !important;
  width: 100%;
}
select.yyt-tww-ctrl {
  padding-right: 28px !important;
  background-size: 10px !important;
  background-position: right 10px center !important;
}

.yyt-tww-toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 0; gap: 16px;
}
.yyt-tww-toggle-row + .yyt-tww-toggle-row { border-top: 1px dashed var(--tww-hairline-dashed); }
.yyt-tww-toggle-info { flex: 1; min-width: 0; }
.yyt-tww-toggle-title { font-size: 12px; font-weight: 600; color: var(--tww-text-secondary); }
.yyt-tww-toggle-desc { font-size: 10px; color: var(--tww-text-muted); margin-top: 2px; }
.yyt-tww-toggle {
  position: relative; width: 34px; height: 18px;
  background: var(--tww-surface-3); border-radius: 999px;
  border: 1px solid var(--tww-hairline-strong);
  cursor: pointer; flex-shrink: 0;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.yyt-tww-toggle::after {
  content: ''; position: absolute; top: 1px; left: 1px;
  width: 14px; height: 14px; border-radius: 50%;
  background: rgba(255,255,255,0.85);
  transition: transform 0.15s ease;
}
.yyt-tww-toggle.on { background: var(--tww-accent); border-color: transparent; }
.yyt-tww-toggle.on::after { transform: translateX(16px); background: var(--tww-on-accent); }

.yyt-tww-table-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
}
.yyt-tww-table-card {
  padding: 10px 12px;
  background: var(--tww-surface-1);
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.12s ease, background 0.12s ease;
  display: flex; flex-direction: column; gap: 6px;
}
.yyt-tww-table-card:hover { border-color: var(--tww-accent); background: var(--tww-surface-2); }
.yyt-tww-table-card-header { display: flex; align-items: center; gap: 8px; }
.yyt-tww-table-card-name { flex: 1; font-size: 13px; font-weight: 700; color: var(--tww-text); }
.yyt-tww-table-card-arrow {
  color: var(--tww-text-muted); font-size: 10px;
  transition: color 0.12s ease, transform 0.12s ease;
}
.yyt-tww-table-card:hover .yyt-tww-table-card-arrow {
  color: var(--tww-accent); transform: translateX(2px);
}
.yyt-tww-table-card-stats { display: flex; gap: 12px; font-size: 11px; color: var(--tww-text-muted); }
.yyt-tww-table-card-stats b { color: var(--tww-text-secondary); font-weight: 700; }
.yyt-tww-empty {
  padding: 20px;
  text-align: center;
  color: var(--tww-text-muted);
  font-size: 12px;
  border: 1px dashed var(--tww-hairline-strong);
  border-radius: 8px;
}
`;

// ────────────────────────────────────────────────────────────────
// HTML builders (exported)
// ────────────────────────────────────────────────────────────────

export function renderWorkbenchHtml(state) {
  const { config, activeTemplate, isolationKey, tablesPreview } = state;
  const runtime = config?.runtime || {};
  const statusText = runtime.lastStatus === 'success' ? '✓ 上次成功'
    : runtime.lastStatus === 'failed' ? '✗ 上次失败'
    : runtime.lastStatus === 'running' ? '运行中' : '待命';
  const statusCls = runtime.lastStatus === 'success' ? 'success'
    : runtime.lastStatus === 'failed' ? 'error' : 'muted';

  const triggerMode = config?.automation?.enabled ? '自动' : '手动';
  const apiPreset = config?.apiPreset || '跟随主 API';
  const bypassPreset = config?.bypassPresetId ? '已绑定' : '无';

  return `
  <div class="yyt-tww">
    <!-- Hero -->
    <div class="yyt-tww-hero">
      <div class="yyt-tww-hero-row1">
        <div class="yyt-tww-hero-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
        <div class="yyt-tww-hero-name">填表工作台</div>
        <div class="yyt-tww-hero-actions">
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-now"><i class="fa-solid fa-play"></i> 立即填表</button>
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-clear"><i class="fa-solid fa-rotate-left"></i> 重填</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">从对话内容提取结构化数据，自动维护表格状态。</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">模式 ${esc(triggerMode)}</span>
        <span class="yyt-tww-chip preset">模板: ${esc(activeTemplate?.template?.name || '默认')}</span>
        <span class="yyt-tww-chip preset">API: ${esc(apiPreset)}</span>
        <span class="yyt-tww-chip preset">指令: ${esc(bypassPreset)}</span>
        ${isolationKey ? `<span class="yyt-tww-chip">隔离: ${esc(isolationKey)}</span>` : ''}
        <span class="yyt-tww-chip status-${statusCls === 'success' ? 'success' : statusCls === 'error' ? 'failed' : ''}">${esc(statusText)}</span>
      </div>
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">状态</span>
        <span class="yyt-tww-stat-value ${statusCls}">${esc(statusText)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">最近运行</span>
        <span class="yyt-tww-stat-value muted">${esc(fmtTime(runtime.lastRunAt))}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">成功</span>
        <span class="yyt-tww-stat-value success">${esc(runtime.successCount || 0)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">失败</span>
        <span class="yyt-tww-stat-value ${runtime.errorCount ? 'error' : 'muted'}">${esc(runtime.errorCount || 0)}</span>
      </div>
    </div>

    <!-- Body sections -->
    <div class="yyt-tww-body">

      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          绑定
        </div>
        ${buildBindingsHtml(state)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          填表行为
        </div>
        ${buildBehaviorHtml(state)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          表格概览
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> 打开数据编辑器</button>
          </span>
        </div>
        ${buildTablesOverviewHtml(state.tablesPreview)}
      </section>

    </div>
  </div>
  `;
}

function buildBindingsHtml(state) {
  const { config, allTemplates, apiPresets, bypassPresets, regexPresets, worldbookPresets, activeTemplate } = state;

  const tplOpts = allTemplates.map((t) => `<option value="${esc(t.id)}" ${activeTemplate?.source?.templateId === t.id ? 'selected' : ''}>${esc(t.name)}</option>`).join('');

  const triggerVal = config?.automation?.enabled ? 'auto' : 'manual';

  const apiVal = config?.apiPreset || '';
  const apiOpts = `<option value="">—— 跟随主 API ——</option>` +
    apiPresets.map((p) => `<option value="${esc(p.name)}" ${p.name === apiVal ? 'selected' : ''}>${esc(p.name)}</option>`).join('');

  const bypassVal = config?.bypassPresetId || '';
  const bypassOpts = `<option value="">—— 无 ——</option>` +
    bypassPresets.map((p) => `<option value="${esc(p.id)}" ${p.id === bypassVal ? 'selected' : ''}>${esc(p.name)}${p.isDefault ? ' [默认]' : ''}</option>`).join('');

  const regexVal = config?.extraction?.regexPresetId || '';
  const regexOpts = `<option value="">—— 无（不进行提取） ——</option>` +
    regexPresets.map((p) => `<option value="${esc(p.id)}" ${p.id === regexVal ? 'selected' : ''}>${esc(p.name)}</option>`).join('');

  const wbVal = config?.worldbooks?.presetId || '';
  const wbOpts = `<option value="">—— 无 ——</option>` +
    worldbookPresets.map((p) => `<option value="${esc(p.id)}" ${p.id === wbVal ? 'selected' : ''}>${esc(p.name)}</option>`).join('');

  const scopeVal = config?.runScope || 'enabled';

  return `
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">填表模板</span>
        <span class="yyt-tww-row-label-hint">表结构 + 填表提示词</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="template">${tplOpts}</select>
      <div class="yyt-tww-row-meta">
        <span>${activeTemplate?.mode === 'inherit_global' ? '继承全局' : activeTemplate?.mode === 'chat_override' ? 'chat 覆盖' : activeTemplate?.mode === 'preset_link' ? '链接预设' : ''}</span>
      </div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">触发模式</span>
        <span class="yyt-tww-row-label-hint">自动随 AI 回复 / 仅手动</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="triggerMode">
        <option value="auto" ${triggerVal === 'auto' ? 'selected' : ''}>自动 — 回复完成后填表</option>
        <option value="manual" ${triggerVal === 'manual' ? 'selected' : ''}>手动 — 仅在点"立即填表"时</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">API 预设</span>
        <span class="yyt-tww-row-label-hint">填表请求走哪个 API</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="apiPreset">${apiOpts}</select>
      <div class="yyt-tww-row-meta"><a data-link="api-presets">管理…</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">Ai 指令预设</span>
        <span class="yyt-tww-row-label-hint">附加在 system/user 前的指令</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="bypassPreset">${bypassOpts}</select>
      <div class="yyt-tww-row-meta"><a data-link="bypass">管理…</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">正则提取预设</span>
        <span class="yyt-tww-row-label-hint">决定从 AI 回复中如何抽取</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="regexPreset">${regexOpts}</select>
      <div class="yyt-tww-row-meta"><a data-link="regex">管理…</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">世界书预设</span>
        <span class="yyt-tww-row-label-hint">注入到 prompt 的 {{toolWorldbookContent}}</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookPreset">${wbOpts}</select>
      <div class="yyt-tww-row-meta"><a data-link="worldbook">管理…</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">作用域</span>
        <span class="yyt-tww-row-label-hint">数据状态绑定的范围</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="runScope">
        <option value="current" ${scopeVal === 'current' ? 'selected' : ''}>仅当前活动表</option>
        <option value="selected" ${scopeVal === 'selected' ? 'selected' : ''}>当前选中表</option>
        <option value="enabled" ${scopeVal === 'enabled' ? 'selected' : ''}>所有启用的表</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `;
}

function buildBehaviorHtml(state) {
  const { config } = state;
  const fillMode = config?.fillMode || 'incremental';
  const contextDepth = Number(config?.contextDepth) || 3;
  const syncWorldbook = config?.worldbookSync?.enabled === true;
  const mirrorToMessage = config?.mirrorToMessage === true;

  return `
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">填充模式</span>
        <span class="yyt-tww-row-label-hint">增量更新 / 全表重填</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="fillMode">
        <option value="incremental" ${fillMode === 'incremental' ? 'selected' : ''}>增量 — 仅修改变化字段</option>
        <option value="full" ${fillMode === 'full' ? 'selected' : ''}>全量 — 整张表重新生成</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">上下文消息数</span>
        <span class="yyt-tww-row-label-hint">从最新一条往前取的条数</span>
      </div>
      <input class="yyt-input yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${esc(contextDepth)}">
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">同步到世界书</div>
        <div class="yyt-tww-toggle-desc">把表格序列化为世界书条目让主模型在生成时看到。</div>
      </div>
      <div class="yyt-tww-toggle ${syncWorldbook ? 'on' : ''}" data-toggle="worldbookSync"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">写回正文镜像</div>
        <div class="yyt-tww-toggle-desc">在助手消息末尾镜像写入 markdown 方便手动查阅。</div>
      </div>
      <div class="yyt-tww-toggle ${mirrorToMessage ? 'on' : ''}" data-toggle="mirrorToMessage"></div>
    </div>
  `;
}

function buildTablesOverviewHtml(tablesPreview) {
  if (!Array.isArray(tablesPreview) || tablesPreview.length === 0) {
    return `<div class="yyt-tww-empty">当前 slot 暂无表数据。请先"立即填表"或在数据编辑器中初始化。</div>`;
  }
  return `
    <div class="yyt-tww-table-grid">
      ${tablesPreview.map((t, i) => `
        <div class="yyt-tww-table-card" data-table-index="${i}">
          <div class="yyt-tww-table-card-header">
            <span class="yyt-tww-table-card-name">${esc(t.name || `表 ${i + 1}`)}</span>
            <i class="fa-solid fa-arrow-right yyt-tww-table-card-arrow"></i>
          </div>
          <div class="yyt-tww-table-card-stats">
            <span><b>${esc(t.rowCount || 0)}</b> 行</span>
            <span><b>${esc(t.colCount || 0)}</b> 字段</span>
            ${t.updatedHint ? `<span>${esc(t.updatedHint)}</span>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ────────────────────────────────────────────────────────────────
// State loader (exported)
// ────────────────────────────────────────────────────────────────

export function loadWorkbenchState() {
  const config = (() => { try { return getTableWorkbenchConfig(); } catch (_) { return {}; } })();
  const allTemplates = (() => { try { return getAllTableTemplates() || []; } catch (_) { return []; } })();
  const activeTemplate = (() => { try { return resolveActiveTemplate({}); } catch (_) { return null; } })();
  const apiPresets = (() => { try { return getApiPresets() || []; } catch (_) { return []; } })();
  const bypassPresets = (() => { try { return getBypassPresets() || []; } catch (_) { return []; } })();
  const regexPresets = (() => { try { return regexStore.listPresets() || []; } catch (_) { return []; } })();
  const worldbookPresets = (() => { try { return worldbookStore.listPresets() || []; } catch (_) { return []; } })();
  const isolationKey = (() => { try { return tableIsolation.getKey(); } catch (_) { return ''; } })();

  // 议题 #15 hotfix v1.0.174：tablesPreview 优先读当前 slot 实际表数据；
  // 没有 slot 数据时退回模板 schema（每行数都是 0，但至少表名能显示）
  let slotTables = null;
  let slotUpdatedAt = 0;
  try {
    const snapshot = getAssistantTableSnapshot(null);
    if (Array.isArray(snapshot?.tableState?.tables) && snapshot.tableState.tables.length > 0) {
      slotTables = snapshot.tableState.tables;
      slotUpdatedAt = Number(snapshot.tableState.updatedAt) || 0;
    }
  } catch (_) { /* fallback to template */ }

  const previewSource = slotTables || activeTemplate?.template?.tables || config?.tables || [];
  const tablesPreview = previewSource.map((t) => ({
    name: t?.name || '',
    rowCount: Array.isArray(t?.rows) ? t.rows.length : 0,
    colCount: Array.isArray(t?.columns) ? t.columns.length : 0,
    updatedHint: slotTables && slotUpdatedAt > 0 ? fmtTime(slotUpdatedAt) : ''
  }));

  return {
    config,
    activeTemplate,
    allTemplates,
    apiPresets,
    bypassPresets,
    regexPresets,
    worldbookPresets,
    isolationKey,
    tablesPreview
  };
}

// ────────────────────────────────────────────────────────────────
// Binding handlers (exported)
// ────────────────────────────────────────────────────────────────

export function bindWorkbenchEvents($container, refresh) {
  const $ = window.jQuery || window.parent?.jQuery;
  if (!$ || !$container || !$container.on) {
    getLog().warn('bindWorkbenchEvents: jQuery 或 $container 不可用');
    return;
  }

  $container.off('.tww');

  // 立即填表
  $container.on('click.tww', '[data-action="run-now"]', async () => {
    try {
      const result = await runManualTableUpdate();
      if (result?.success) showToast('success', '填表完成');
      else showToast('error', `填表失败：${result?.error || '未知'}`);
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      getLog().error('立即填表异常', err);
      showToast('error', `异常：${err?.message || err}`);
    }
  });

  // 重填
  $container.on('click.tww', '[data-action="run-clear"]', async () => {
    if (!window.confirm('重填会清空当前消息楼层的表格数据并重新生成，确定？')) return;
    try {
      const result = await runManualTableUpdate(null, { clearBeforeUpdate: true });
      if (result?.success) showToast('success', '重填完成');
      else showToast('error', `重填失败：${result?.error || '未知'}`);
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      getLog().error('重填异常', err);
      showToast('error', `异常：${err?.message || err}`);
    }
  });

  // 打开数据编辑器（#11 待实现）
  $container.on('click.tww', '[data-action="open-editor"], [data-table-index]', (e) => {
    e.preventDefault();
    showToast('info', '数据编辑器窗口待实现（#11）');
  });

  // 模板切换
  $container.on('change.tww', '[data-binding="template"]', function () {
    const templateId = $(this).val();
    try {
      setActiveGlobalTemplateId(templateId);
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({ ...config, activeTemplate: templateId });
      showToast('success', '模板已切换');
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      getLog().error('切换模板异常', err);
      showToast('error', `切换失败：${err?.message || err}`);
    }
  });

  // 触发模式
  $container.on('change.tww', '[data-binding="triggerMode"]', function () {
    const mode = $(this).val();
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({
        ...config,
        automation: { ...(config.automation || {}), enabled: mode === 'auto' }
      });
      showToast('success', mode === 'auto' ? '已切换为自动模式' : '已切换为手动模式');
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      getLog().error('切换触发模式异常', err);
      showToast('error', `切换失败：${err?.message || err}`);
    }
  });

  // 通用 binding select
  const selectBindings = [
    { sel: '[data-binding="apiPreset"]', key: 'apiPreset' },
    { sel: '[data-binding="bypassPreset"]', key: 'bypassPresetId' },
    { sel: '[data-binding="runScope"]', key: 'runScope' },
    { sel: '[data-binding="fillMode"]', key: 'fillMode' }
  ];
  for (const { sel, key } of selectBindings) {
    $container.on('change.tww', sel, function () {
      const value = $(this).val();
      try {
        const config = getTableWorkbenchConfig();
        saveTableWorkbenchConfig({ ...config, [key]: value });
        showToast('success', '已保存');
      } catch (err) {
        getLog().error(`保存 ${key} 异常`, err);
        showToast('error', `保存失败：${err?.message || err}`);
      }
    });
  }

  $container.on('change.tww', '[data-binding="regexPreset"]', function () {
    const value = $(this).val();
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({
        ...config,
        extraction: { ...(config.extraction || {}), regexPresetId: value }
      });
      showToast('success', '正则预设已更新');
    } catch (err) {
      getLog().error('保存 regexPreset 异常', err);
      showToast('error', `保存失败：${err?.message || err}`);
    }
  });

  $container.on('change.tww', '[data-binding="worldbookPreset"]', function () {
    const value = $(this).val();
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({
        ...config,
        worldbooks: { ...(config.worldbooks || {}), presetId: value }
      });
      showToast('success', '世界书预设已更新');
    } catch (err) {
      getLog().error('保存 worldbookPreset 异常', err);
      showToast('error', `保存失败：${err?.message || err}`);
    }
  });

  $container.on('change.tww', '[data-binding="contextDepth"]', function () {
    const value = Math.max(1, parseInt($(this).val(), 10) || 3);
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({ ...config, contextDepth: value });
      showToast('success', '已保存');
    } catch (err) {
      getLog().error('保存 contextDepth 异常', err);
      showToast('error', `保存失败：${err?.message || err}`);
    }
  });

  // Toggles
  $container.on('click.tww', '[data-toggle="worldbookSync"]', function () {
    const $t = $(this);
    const isOn = $t.hasClass('on');
    const next = !isOn;
    $t.toggleClass('on', next);
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({
        ...config,
        worldbookSync: { ...(config.worldbookSync || {}), enabled: next }
      });
      showToast('success', next ? '已启用世界书同步' : '已停用世界书同步');
    } catch (err) {
      $t.toggleClass('on', isOn);
      getLog().error('toggle worldbookSync 异常', err);
      showToast('error', `保存失败：${err?.message || err}`);
    }
  });

  $container.on('click.tww', '[data-toggle="mirrorToMessage"]', function () {
    const $t = $(this);
    const isOn = $t.hasClass('on');
    const next = !isOn;
    $t.toggleClass('on', next);
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({ ...config, mirrorToMessage: next });
      showToast('success', next ? '已启用正文镜像' : '已停用正文镜像');
    } catch (err) {
      $t.toggleClass('on', isOn);
      getLog().error('toggle mirrorToMessage 异常', err);
      showToast('error', `保存失败：${err?.message || err}`);
    }
  });

  // 管理链接
  $container.on('click.tww', '[data-link]', function (e) {
    e.preventDefault();
    showToast('info', `跳转到预设管理面板（待接入）`);
  });
}

// ────────────────────────────────────────────────────────────────
// Deprecated (兼容旧调用方，无操作)
// ────────────────────────────────────────────────────────────────

/**
 * @deprecated 工作台已回归 popup tab 内联渲染，不再开独立浮窗。
 *             保留兼容签名避免外部调用报错。
 */
export function openTableWorkbenchWindow() {
  getLog().warn('openTableWorkbenchWindow 已废弃：工作台现在直接渲染在 popup tab 内');
  return null;
}

export function closeTableWorkbenchWindow() {
  return null;
}

export default {
  WORKBENCH_VIEW_STYLES,
  renderWorkbenchHtml,
  loadWorkbenchState,
  bindWorkbenchEvents,
  openTableWorkbenchWindow,
  closeTableWorkbenchWindow
};
