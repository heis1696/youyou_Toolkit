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
import { getCurrentProvider, getToolDataProvider, PROVIDER_KIND } from '../../core/tool-data-provider.js';
import {
  getTableWorkbenchConfig,
  saveTableWorkbenchConfig
} from '../../table-engine/table-schema-service.js';
import {
  getAllTableTemplates,
  resolveActiveTemplate,
  setActiveGlobalTemplateId,
  listChatTemplateArchives,
  restoreChatTemplateArchive
} from '../../table-engine/table-template-service.js';
import { tableIsolation } from '../../table-engine/table-isolation-service.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';
import { getAssistantTableSnapshot, clearStateInChat } from '../../table-engine/table-state-service.js';
import { openTableDataEditor } from './table-data-editor-window.js';
import { cloneTableValue } from '../../table-engine/table-types.js';

// 议题 #15 #30 写回世界书 sub-zone 用的 helpers
function cloneDeep(v) { return cloneTableValue(v); }

function setNestedPath(obj, path, value) {
  if (!obj || typeof obj !== 'object') return;
  const parts = String(path || '').split('.').filter(Boolean);
  if (parts.length === 0) return;
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    if (cur[k] === null || cur[k] === undefined || typeof cur[k] !== 'object') {
      cur[k] = {};
    }
    cur = cur[k];
  }
  cur[parts[parts.length - 1]] = value;
}
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

// ════════════════════════════════════════════════════════════════
// Provider 状态缓存（v1.0.194+ Task A）
// loadWorkbenchState 是同步函数，无法 await SQL count；用 module-level
// 缓存：UI 同步读，refreshProviderStats 异步刷新缓存。第一次显示 "..." 或
// 上次缓存值，刷新后下次渲染显示最新。
// ════════════════════════════════════════════════════════════════
const _providerStats = {
  kind: null,           // 'authority' | 'fallback' | null
  sheetCount: null,     // number | null（null = 未刷新）
  rowCount: null,
  lastError: null,      // string | null
  lastRefreshAt: 0
};
let _statsRefreshedOnce = false;

export async function refreshProviderStats() {
  try {
    const provider = await getToolDataProvider();
    if (!provider) {
      _providerStats.kind = null;
      _providerStats.lastError = 'Provider 不可用';
      return _providerStats;
    }
    _providerStats.kind = provider.kind;
    // 查 count（API 在 AuthorityProvider 是 query / FallbackProvider 也是 query）
    if (typeof provider.query === 'function') {
      const sheetResult = await provider.query({ statement: 'SELECT COUNT(*) as c FROM table_sheets' });
      const rowResult = await provider.query({ statement: 'SELECT COUNT(*) as c FROM table_rows' });
      _providerStats.sheetCount = sheetResult?.rows?.[0]?.c ?? 0;
      _providerStats.rowCount = rowResult?.rows?.[0]?.c ?? 0;
    }
    _providerStats.lastError = null;
    _providerStats.lastRefreshAt = Date.now();
    getLog().info('Provider stats 已刷新', { ..._providerStats });
  } catch (err) {
    _providerStats.lastError = err?.message || String(err);
    getLog().warn('Provider stats 刷新失败', err);
  }
  return _providerStats;
}

export function getProviderStats() {
  // 同步访问，UI 用；如果还没刷新过 kind 是 null
  if (!_providerStats.kind) {
    const current = getCurrentProvider();
    if (current?.kind) _providerStats.kind = current.kind;
  }
  return _providerStats;
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

/* sub-zone（议题 #15 #30 写回世界书展开配置）*/
.yyt-tww-sub-zone {
  margin-top: 8px; margin-left: 0;
  padding: 12px 14px;
  background: var(--tww-surface-1);
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 6px;
  display: flex; flex-direction: column; gap: 10px;
}
.yyt-tww-sub-zone.collapsed { display: none; }
.yyt-tww-sub-row {
  display: grid; grid-template-columns: 110px 1fr auto;
  gap: 10px; align-items: center;
}
.yyt-tww-sub-row + .yyt-tww-sub-row {
  padding-top: 10px;
  border-top: 1px dashed var(--tww-hairline-dashed);
}
.yyt-tww-sub-row > label {
  font-size: 11px; font-weight: 600; color: var(--tww-text-secondary);
}
.yyt-tww-sub-row > .yyt-tww-sub-meta {
  font-size: 11px; color: var(--tww-text-muted); white-space: nowrap;
}
.yyt-tww-sub-row > .yyt-tww-sub-meta a {
  color: var(--tww-accent); text-decoration: none; font-weight: 600; cursor: pointer;
}
.yyt-tww-sub-row > .yyt-tww-sub-meta a:hover { text-decoration: underline; }
.yyt-tww-sub-row-toggle {
  display: grid; grid-template-columns: 110px 1fr auto;
  gap: 10px; align-items: center;
}
.yyt-tww-sub-row-toggle > label {
  font-size: 11px; font-weight: 600; color: var(--tww-text-secondary);
}
.yyt-tww-sub-row-toggle .yyt-tww-toggle-desc {
  font-size: 10px; color: var(--tww-text-muted);
}
.yyt-tww-sub-row-double {
  display: grid; grid-template-columns: 110px 1fr 1fr;
  gap: 10px; align-items: center;
}

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
.yyt-tww-table-card-disabled { opacity: 0.55; }
.yyt-tww-table-card-disabled .yyt-tww-table-card-name { text-decoration: line-through; color: var(--tww-text-muted); }
.yyt-tww-table-card-header { display: flex; align-items: center; gap: 8px; }
.yyt-tww-table-card-toggle {
  position: relative; display: inline-flex; width: 32px; height: 18px;
  cursor: pointer; flex-shrink: 0;
}
.yyt-tww-table-card-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
.yyt-tww-table-card-toggle-slider {
  position: absolute; inset: 0; background: #555; border-radius: 18px;
  transition: background 0.15s; cursor: pointer;
}
.yyt-tww-table-card-toggle-slider::before {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 14px; height: 14px; background: #fff; border-radius: 50%;
  transition: transform 0.15s;
}
.yyt-tww-table-card-toggle input:checked + .yyt-tww-table-card-toggle-slider { background: var(--tww-accent, #4caf50); }
.yyt-tww-table-card-toggle input:checked + .yyt-tww-table-card-toggle-slider::before { transform: translateX(14px); }
.yyt-tww-table-card-name { flex: 1; font-size: 13px; font-weight: 700; color: var(--tww-text); }

/* 模板归档列表（议题 #15 盲区 4，v1.0.193+） */
.yyt-tww-archives {
  margin: 8px 0; padding: 12px; border-radius: 8px;
  background: var(--tww-surface-2, rgba(255,255,255,0.04));
  border: 1px solid var(--tww-border, rgba(255,255,255,0.08));
}
.yyt-tww-archives-header {
  font-size: 12px; font-weight: 600; color: var(--tww-text-muted);
  margin-bottom: 8px;
}
.yyt-tww-archives-list {
  display: flex; flex-direction: column; gap: 6px;
}
.yyt-tww-archive-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 10px; border-radius: 6px;
  background: var(--tww-surface, rgba(255,255,255,0.02));
  border: 1px solid var(--tww-border, rgba(255,255,255,0.06));
}
.yyt-tww-archive-meta {
  display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0;
}
.yyt-tww-archive-time { font-size: 12px; color: var(--tww-text); }
.yyt-tww-archive-mode { font-size: 11px; color: var(--tww-text-muted); }
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
  const { config, activeTemplate, isolationKey, tablesPreview, templateArchives = [], providerStats = {} } = state;
  const runtime = config?.runtime || {};
  const statusText = runtime.lastStatus === 'success' ? '✓ 上次成功'
    : runtime.lastStatus === 'failed' ? '✗ 上次失败'
    : runtime.lastStatus === 'running' ? '运行中' : '待命';
  const statusCls = runtime.lastStatus === 'success' ? 'success'
    : runtime.lastStatus === 'failed' ? 'error' : 'muted';

  const triggerMode = config?.automation?.enabled ? '自动' : '手动';
  const apiPreset = config?.apiPreset || '跟随主 API';
  const bypassPreset = config?.bypassPresetId ? '已绑定' : '无';
  const archiveCount = Array.isArray(templateArchives) ? templateArchives.length : 0;

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
          ${archiveCount > 0 ? `<button class="yyt-tww-btn yyt-tww-btn-small" data-action="toggle-archives" title="模板归档历史（chat × isolationKey 维度，最多 8 份）"><i class="fa-solid fa-clock-rotate-left"></i> 归档 (${archiveCount})</button>` : ''}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="清空当前聊天所有楼层的表格数据，让模板切换后从头开始"><i class="fa-solid fa-trash-can"></i> 清空 chat 数据</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">从对话内容提取结构化数据，自动维护表格状态。</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">模式 ${esc(triggerMode)}</span>
        <span class="yyt-tww-chip preset">模板: ${esc(activeTemplate?.template?.name || '默认')}</span>
        <span class="yyt-tww-chip preset">API: ${esc(apiPreset)}</span>
        <span class="yyt-tww-chip preset">指令: ${esc(bypassPreset)}</span>
        ${(() => {
          const sm = config?.runScope || config?.scope?.mode || 'enabled';
          if (sm === 'enabled') {
            return `<span class="yyt-tww-chip preset">范围: 所有启用表</span>`;
          }
          const smLabel = sm === 'current' ? '⚠️ 仅当前表' : '仅选中表';
          // v1.0.189：非 enabled 时改为可点击按钮，点一下立刻重置到 enabled
          return `<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="当前 AI 只会填部分表，点击重置为「所有启用表」" style="border:0;cursor:pointer;">范围: ${esc(smLabel)} — 点此重置</button>`;
        })()}
        ${(() => {
          // v1.0.194+ Task A: Provider 状态 chip
          const kind = providerStats?.kind;
          const sc = providerStats?.sheetCount;
          const rc = providerStats?.rowCount;
          const counts = (sc !== null && rc !== null) ? ` — ${sc} 表 ${rc} 行` : '';
          if (kind === 'authority') {
            return `<span class="yyt-tww-chip status-success" title="数据持久化到真后端 SQLite（ST-Delegation-of-authority 提供）">✓ 真后端 SQLite${esc(counts)}</span>`;
          }
          if (kind === 'fallback') {
            return `<span class="yyt-tww-chip preset" title="数据持久化到 localStorage（未装 ST-Delegation-of-authority）">ℹ Fallback (localStorage)${esc(counts)}</span>`;
          }
          return `<span class="yyt-tww-chip" title="Provider 还未初始化（懒加载）">Provider 加载中...</span>`;
        })()}
        ${isolationKey ? `<span class="yyt-tww-chip">隔离: ${esc(isolationKey)}</span>` : ''}
        <span class="yyt-tww-chip status-${statusCls === 'success' ? 'success' : statusCls === 'error' ? 'failed' : ''}">${esc(statusText)}</span>
      </div>
    </div>

    <!-- 模板归档列表（默认隐藏，hero 按钮 toggle） -->
    <div class="yyt-tww-archives" data-archives-panel style="display:none;">
      ${buildArchivesHtml(templateArchives)}
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

  // v1.0.178 hotfix Bug 3：读取走 normalize 后的字段路径（autoUpdateEnabled / bypass.presetId / extraction.regexPresetId / worldbooks.presetId）
  const triggerVal = config?.autoUpdateEnabled === true ? 'auto' : 'manual';

  const apiVal = config?.apiPreset || '';
  const apiOpts = `<option value="">—— 跟随主 API ——</option>` +
    apiPresets.map((p) => `<option value="${esc(p.name)}" ${p.name === apiVal ? 'selected' : ''}>${esc(p.name)}</option>`).join('');

  const bypassVal = config?.bypass?.presetId || '';
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

    ${buildWorldbookSubZoneHtml(state)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">写回正文镜像</div>
        <div class="yyt-tww-toggle-desc">在助手消息末尾镜像写入 markdown 方便手动查阅。</div>
      </div>
      <div class="yyt-tww-toggle ${mirrorToMessage ? 'on' : ''}" data-toggle="mirrorToMessage"></div>
    </div>
  `;
}

function buildWorldbookSubZoneHtml(state) {
  const sync = state?.config?.worldbookSync || {};
  const enabled = sync.enabled === true;
  if (!enabled) return '';

  // 议题 #15 #30 hotfix v1.0.177：targetBook 默认 = 当前角色卡绑定的 primary lorebook
  // 没打开聊天时 select 禁用，提示用户先打开聊天
  const userTargetBook = String(sync.targetBook || '');
  const boundLorebook = String(state?.boundLorebook || '');
  const chatOpen = state?.chatOpen === true;
  const effectiveTargetBook = userTargetBook || boundLorebook;

  const availableBooks = Array.isArray(state.availableWorldbooks) ? state.availableWorldbooks : [];
  const wrapperCfg = sync.wrapperConfig || {};
  const wrapperEnabled = wrapperCfg.enabled !== false;
  const wrapperTag = String(wrapperCfg.wrapperTag || '最新数据与记录');
  const wrapperHint = String(wrapperCfg.wrapperHint || '');
  const placement = wrapperCfg.wrapperPlacement || {};
  const position = String(placement.position || 'before_character_definition');
  const depth = Number.isFinite(placement.depth) ? placement.depth : 2;
  const order = Number.isFinite(placement.order) ? placement.order : 50000;

  let bookOptions;
  if (!chatOpen) {
    bookOptions = `<option value="">—— 请先打开聊天 ——</option>`;
  } else if (availableBooks.length === 0) {
    bookOptions = `<option value="${esc(effectiveTargetBook)}">${effectiveTargetBook ? esc(effectiveTargetBook) : '—— 角色卡未绑定世界书 ——'}</option>`;
  } else {
    const items = availableBooks.map((b) => {
      const name = typeof b === 'string' ? b : (b?.name || '');
      return `<option value="${esc(name)}" ${name === effectiveTargetBook ? 'selected' : ''}>${esc(name)}${name === boundLorebook ? '（角色卡绑定）' : ''}</option>`;
    }).join('');
    const placeholderOpt = boundLorebook
      ? `<option value="">—— 角色卡绑定：${esc(boundLorebook)} ——</option>`
      : `<option value="">—— 选择 ——</option>`;
    bookOptions = placeholderOpt + items;
  }

  const selectDisabled = chatOpen ? '' : 'disabled';
  const meta = chatOpen
    ? `<a data-action="refresh-worldbooks">刷新列表</a>`
    : `<span style="color:var(--tww-warning);">未打开聊天</span>`;

  return `
    <div class="yyt-tww-sub-zone" data-sub-zone="worldbookSync">
      <div class="yyt-tww-sub-row">
        <label>目标世界书</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookTargetBook" ${selectDisabled}>${bookOptions}</select>
        <div class="yyt-tww-sub-meta">${meta}</div>
      </div>

      <div class="yyt-tww-sub-row-toggle">
        <label>Wrapper 包裹</label>
        <div class="yyt-tww-toggle-desc">用 <code style="font-size:10px;">&lt;${esc(wrapperTag)}&gt;...&lt;/${esc(wrapperTag)}&gt;</code> 包住所有全局表数据</div>
        <div class="yyt-tww-toggle ${wrapperEnabled ? 'on' : ''}" data-toggle="worldbookWrapperEnabled"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper 标签</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperTag" value="${esc(wrapperTag)}" placeholder="最新数据与记录">
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper 提示文</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperHint" value="${esc(wrapperHint)}" placeholder="可选，说明 wrapper 内容用途">
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>注入位置</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookWrapperPosition">
          <option value="before_character_definition" ${position === 'before_character_definition' ? 'selected' : ''}>角色定义之前</option>
          <option value="after_character_definition" ${position === 'after_character_definition' ? 'selected' : ''}>角色定义之后</option>
          <option value="before_history" ${position === 'before_history' ? 'selected' : ''}>历史记录之前</option>
          <option value="after_history" ${position === 'after_history' ? 'selected' : ''}>历史记录之后</option>
          <option value="at_depth" ${position === 'at_depth' ? 'selected' : ''}>指定深度</option>
        </select>
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row-double">
        <label>深度 / 顺序</label>
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperDepth" value="${esc(depth)}" min="0">
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperOrder" value="${esc(order)}" min="0">
      </div>
    </div>
  `;
}

// 议题 #15 盲区 4 (v1.0.193)：模板归档列表 HTML
function buildArchivesHtml(archives = []) {
  if (!Array.isArray(archives) || archives.length === 0) {
    return `<div class="yyt-tww-empty">当前 chat × isolationKey 暂无归档（仅在切换模板时自动归档当前状态）</div>`;
  }
  return `
    <div class="yyt-tww-archives-header">模板归档历史 (${archives.length}/8)</div>
    <div class="yyt-tww-archives-list">
      ${archives.map((entry, i) => {
        const state = entry?.state || {};
        const mode = state.mode || 'unknown';
        const archivedAt = entry?.archivedAt ? new Date(entry.archivedAt).toLocaleString() : '未知时间';
        const presetName = state.presetName || '';
        const summary = mode === 'preset_link' ? `预设链接: ${esc(presetName)}`
          : mode === 'chat_override' ? 'chat 级覆盖模板'
          : mode === 'inherit_global' ? '继承全局' : esc(mode);
        return `
          <div class="yyt-tww-archive-item" data-archive-index="${i}">
            <div class="yyt-tww-archive-meta">
              <span class="yyt-tww-archive-time">${esc(archivedAt)}</span>
              <span class="yyt-tww-archive-mode">${summary}</span>
            </div>
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="restore-archive" data-archive-index="${i}" title="恢复此归档（恢复前自动归档当前状态）">恢复</button>
          </div>
        `;
      }).join('')}
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
        <div class="yyt-tww-table-card${t.enabled === false ? ' yyt-tww-table-card-disabled' : ''}" data-table-index="${i}" data-table-id="${esc(t.id || '')}">
          <div class="yyt-tww-table-card-header">
            <label class="yyt-tww-table-card-toggle" title="${t.enabled === false ? '已禁用 — AI 不会填这张表' : '已启用 — AI 会填这张表'}">
              <input type="checkbox" data-action="toggle-table-enabled" data-table-id="${esc(t.id || '')}" ${t.enabled === false ? '' : 'checked'} />
              <span class="yyt-tww-table-card-toggle-slider"></span>
            </label>
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
  const availableWorldbooks = loadAvailableWorldbooks();
  const boundLorebook = loadCharacterBoundLorebook();
  const chatOpen = isChatOpened();

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
  // 议题 #15 #33-H/I：enabled 状态独立到 config.tableEnabledOverrides
  //   不依赖 config.tables 是否包含该表（切换模板时 config.tables 不同步）
  const overrides = (config?.tableEnabledOverrides && typeof config.tableEnabledOverrides === 'object')
    ? config.tableEnabledOverrides
    : {};
  const tablesPreview = previewSource.map((t) => {
    const tid = t?.id || '';
    const userOverride = tid && Object.prototype.hasOwnProperty.call(overrides, tid)
      ? overrides[tid]
      : undefined;
    return {
      id: tid,
      name: t?.name || '',
      enabled: userOverride !== undefined ? userOverride : (t?.enabled !== false),
      rowCount: Array.isArray(t?.rows) ? t.rows.length : 0,
      colCount: Array.isArray(t?.columns) ? t.columns.length : 0,
      updatedHint: slotTables && slotUpdatedAt > 0 ? fmtTime(slotUpdatedAt) : ''
    };
  });

  // 议题 #15 盲区 4 (v1.0.193)：模板归档列表（chat × isolationKey 维度，最多 8 份）
  const templateArchives = (() => {
    try { return listChatTemplateArchives() || []; } catch (_) { return []; }
  })();

  return {
    config,
    activeTemplate,
    allTemplates,
    apiPresets,
    bypassPresets,
    regexPresets,
    worldbookPresets,
    availableWorldbooks,
    boundLorebook,
    chatOpen,
    isolationKey,
    tablesPreview,
    templateArchives,
    providerStats: getProviderStats()
  };
}

/**
 * 同步拉取 TavernHelper 当前世界书列表，给写回世界书的 targetBook select 用。
 * 失败时返回空数组，UI 退化为手填 input。
 */
function loadAvailableWorldbooks() {
  try {
    const win = globalThis.window || globalThis;
    const helper = win?.TavernHelper || win?.parent?.TavernHelper;
    if (!helper) return [];
    if (typeof helper.getLorebooks === 'function') {
      const list = helper.getLorebooks();
      if (Array.isArray(list)) return list;
    }
    if (typeof helper.getLorebookList === 'function') {
      const list = helper.getLorebookList();
      if (Array.isArray(list)) return list;
    }
  } catch (err) {
    getLog().warn('loadAvailableWorldbooks 失败', err);
  }
  return [];
}

/**
 * 议题 #15 #30 hotfix v1.0.177：拉取当前角色卡绑定的 primary lorebook
 * 用作写回世界书 targetBook 的默认值。
 */
function loadCharacterBoundLorebook() {
  try {
    const win = globalThis.window || globalThis;
    const helper = win?.TavernHelper || win?.parent?.TavernHelper;
    if (helper) {
      if (typeof helper.getCurrentCharPrimaryLorebook === 'function') {
        const r = helper.getCurrentCharPrimaryLorebook();
        if (typeof r === 'string' && r) return r;
      }
      if (typeof helper.getCharLorebooks === 'function') {
        try {
          const r = helper.getCharLorebooks();
          if (r?.primary) return String(r.primary);
        } catch (_) {}
      }
      if (typeof helper.getChatLorebook === 'function') {
        try {
          const r = helper.getChatLorebook();
          if (typeof r === 'string' && r) return r;
        } catch (_) {}
      }
    }
    // SillyTavern context fallback
    const ctx = win?.SillyTavern?.getContext?.() || win?.parent?.SillyTavern?.getContext?.();
    if (ctx) {
      const ch = ctx.characters?.[ctx.characterId];
      const bookName = ch?.data?.character_book?.name
        || ch?.data?.extensions?.world
        || ch?.world;
      if (typeof bookName === 'string' && bookName) return bookName;
    }
  } catch (err) {
    getLog().warn('loadCharacterBoundLorebook 失败', err);
  }
  return '';
}

/**
 * 议题 #15 #30 hotfix v1.0.177：判断当前是否打开了聊天
 * 没开聊天时不应让用户选写回 targetBook（角色卡绑定还没确定）
 */
function isChatOpened() {
  try {
    const win = globalThis.window || globalThis;
    const helper = win?.TavernHelper || win?.parent?.TavernHelper;
    if (helper && typeof helper.getCurrentChatId === 'function') {
      const id = helper.getCurrentChatId();
      return !!(id && String(id).trim() && String(id).trim() !== 'default_chat');
    }
    const ctx = win?.SillyTavern?.getContext?.() || win?.parent?.SillyTavern?.getContext?.();
    if (ctx) {
      const chat = ctx.chat;
      if (Array.isArray(chat) && chat.length > 0) return true;
      if (ctx.chatId) return true;
    }
  } catch (_) { /* ignore */ }
  return false;
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

  // v1.0.194+ Task A + v1.0.196 hotfix：首次 bind 才异步刷新 Provider stats，
  // 避免每次 refresh 都触发刷新 → refresh → bind → 刷新...的死循环（UI 闪烁点不到）
  if (!_statsRefreshedOnce) {
    _statsRefreshedOnce = true;
    refreshProviderStats().then(() => {
      if (typeof refresh === 'function') refresh();
    }).catch(() => {});
  }

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

  // 重置 runScope (v1.0.189)：hero chip 一键切到「所有启用表」+ 清掉 activeTableId
  $container.on('click.tww', '[data-action="reset-run-scope"]', () => {
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({
        ...config,
        runScope: 'enabled',
        scope: {
          ...(config.scope || {}),
          mode: 'enabled',
          activeTableId: '',
          selectedTableIds: []
        }
      });
      showToast('success', '已重置范围为「所有启用表」');
      getLog().info('用户重置 runScope 为 enabled');
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      getLog().error('重置范围异常', err);
      showToast('error', `重置失败：${err?.message || err}`);
    }
  });

  // 清空 chat 数据（v1.0.182：配合模板切换后，让旧 slot 数据不再干扰）
  $container.on('click.tww', '[data-action="reset-chat-data"]', async () => {
    if (!window.confirm('将清空当前聊天所有楼层的表格数据（不影响模板/配置）。下次填表会按当前激活模板从头开始。确定？')) return;
    try {
      const result = await clearStateInChat();
      if (result?.success) {
        showToast('success', `已清空 ${result.touched || 0} 条消息的表格数据`);
        getLog().info('清空 chat 数据完成', result);
      } else {
        showToast('error', '清空失败');
      }
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      getLog().error('清空 chat 数据异常', err);
      showToast('error', `异常：${err?.message || err}`);
    }
  });

  // 打开数据编辑器（议题 #15 #11，v1.0.176+）
  $container.on('click.tww', '[data-action="open-editor"]', (e) => {
    e.preventDefault();
    // v1.0.178 hotfix Bug 2：诊断日志
    console.log('[YYT][TableWorkbench] open-editor button clicked');
    getLog().info('open-editor button clicked');
    try {
      const result = openTableDataEditor();
      console.log('[YYT][TableWorkbench] openTableDataEditor returned:', result);
      getLog().info('openTableDataEditor 调用完成', { hasReturn: !!result });
    } catch (err) {
      console.error('[YYT][TableWorkbench] 打开数据编辑器异常:', err);
      getLog().error('打开数据编辑器异常', err);
      showToast('error', `打开失败：${err?.message || err}`);
    }
  });

  // 表格概览卡片点击 → 打开数据编辑器并聚焦该表
  $container.on('click.tww', '[data-table-index]', function (e) {
    // v1.0.190：toggle 自身不应触发卡片点击
    if ($(e.target).closest('[data-action="toggle-table-enabled"]').length > 0) return;
    if ($(e.target).is('label, label *')) return;
    e.preventDefault();
    const idx = Number($(this).attr('data-table-index'));
    if (!Number.isFinite(idx) || idx < 0) return;
    console.log('[YYT][TableWorkbench] table card clicked, idx=', idx);
    try {
      // 从当前 slot tableState 拿对应表的 uid 传给编辑器
      const snapshot = getAssistantTableSnapshot(null);
      const table = snapshot?.tableState?.tables?.[idx];
      const result = openTableDataEditor({
        focusTableUid: table?.uid || table?.id || ''
      });
      console.log('[YYT][TableWorkbench] openTableDataEditor returned:', result);
    } catch (err) {
      console.error('[YYT][TableWorkbench] 打开数据编辑器异常:', err);
      getLog().error('打开数据编辑器异常', err);
      showToast('error', `打开失败：${err?.message || err}`);
    }
  });

  // v1.0.193 盲区 4：模板归档面板 toggle 显示
  $container.on('click.tww', '[data-action="toggle-archives"]', function (e) {
    e.preventDefault();
    const panel = $container.find('[data-archives-panel]').first();
    if (!panel.length) return;
    if (panel.css('display') === 'none') {
      panel.css('display', 'block');
    } else {
      panel.css('display', 'none');
    }
  });

  // v1.0.193 盲区 4：恢复模板归档
  $container.on('click.tww', '[data-action="restore-archive"]', async function (e) {
    e.stopPropagation();
    const idx = Number($(this).attr('data-archive-index'));
    if (!Number.isFinite(idx) || idx < 0) return;
    if (!window.confirm(`恢复归档 #${idx}？恢复前会自动归档当前状态，可再次恢复回来。`)) return;
    try {
      const result = restoreChatTemplateArchive(idx);
      if (result?.success) {
        showToast('success', '已恢复归档');
        getLog().info('restoreChatTemplateArchive 成功', { index: idx, scopeState: result.scopeState });
      } else {
        showToast('error', `恢复失败：${result?.error || '未知'}`);
      }
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      getLog().error('恢复归档异常', err);
      showToast('error', `异常：${err?.message || err}`);
    }
  });

  // v1.0.190 #33-H + v1.0.192 #33-I：单表激活/禁用 toggle
  //   状态存 config.tableEnabledOverrides = { [tableId]: boolean }（不依赖 config.tables，
  //   因为切换激活模板时 config.tables 不同步，会找不到 id）
  $container.on('change.tww', '[data-action="toggle-table-enabled"]', function (e) {
    e.stopPropagation();
    const tableId = $(this).attr('data-table-id');
    const enabled = $(this).is(':checked');
    if (!tableId) return;
    try {
      const config = getTableWorkbenchConfig();
      const overrides = { ...(config.tableEnabledOverrides || {}) };
      overrides[tableId] = enabled;
      saveTableWorkbenchConfig({ ...config, tableEnabledOverrides: overrides });
      showToast('success', enabled ? `已启用 ${tableId}` : `已禁用 ${tableId}`);
      getLog().info('toggle 单表激活', { tableId, enabled });
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      getLog().error('toggle 单表激活异常', err);
      showToast('error', `切换失败：${err?.message || err}`);
    }
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

  // 触发模式（v1.0.178 hotfix Bug 3：保存到 autoUpdateEnabled 顶层字段）
  $container.on('change.tww', '[data-binding="triggerMode"]', function () {
    const mode = $(this).val();
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({
        ...config,
        autoUpdateEnabled: mode === 'auto'
      });
      showToast('success', mode === 'auto' ? '已切换为自动模式' : '已切换为手动模式');
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      getLog().error('切换触发模式异常', err);
      showToast('error', `切换失败：${err?.message || err}`);
    }
  });

  // 通用 binding select
  // v1.0.178 hotfix Bug 3：bypassPreset 保存改为 config.bypass.presetId（顶层字段会被 normalize 丢）
  const selectBindings = [
    { sel: '[data-binding="apiPreset"]', key: 'apiPreset' },
    { sel: '[data-binding="runScope"]', key: 'runScope' },
    { sel: '[data-binding="fillMode"]', key: 'fillMode' }
  ];
  for (const { sel, key } of selectBindings) {
    $container.on('change.tww', sel, function () {
      const value = $(this).val();
      try {
        const config = getTableWorkbenchConfig();
        // v1.0.190：runScope 变更时必须同步 scope.mode，否则 normalize 优先用旧 scope.mode
        // 跟 H7 同模式（顶层字段单独保存会被 normalize 用嵌套对象旧值覆盖）
        const patch = { ...config, [key]: value };
        if (key === 'runScope') {
          patch.scope = {
            ...(config.scope || {}),
            mode: value,
            // 切到 'enabled' 时清掉 activeTableId/selectedTableIds 残留
            ...(value === 'enabled' ? { activeTableId: '', selectedTableIds: [] } : {})
          };
        }
        saveTableWorkbenchConfig(patch);
        showToast('success', '已保存');
      } catch (err) {
        getLog().error(`保存 ${key} 异常`, err);
        showToast('error', `保存失败：${err?.message || err}`);
      }
    });
  }

  // Ai 指令预设（v1.0.178 hotfix Bug 3：写到 config.bypass.presetId）
  $container.on('change.tww', '[data-binding="bypassPreset"]', function () {
    const value = $(this).val();
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({
        ...config,
        bypass: { ...(config.bypass || {}), presetId: value, enabled: !!value }
      });
      showToast('success', 'Ai 指令预设已保存');
    } catch (err) {
      getLog().error('保存 bypass 异常', err);
      showToast('error', `保存失败：${err?.message || err}`);
    }
  });

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
      // 启用后需要 refresh 展开 sub-zone（议题 #15 #30）
      if (typeof refresh === 'function') refresh();
    } catch (err) {
      $t.toggleClass('on', isOn);
      getLog().error('toggle worldbookSync 异常', err);
      showToast('error', `保存失败：${err?.message || err}`);
    }
  });

  // 议题 #15 #30 写回世界书 sub-zone — wrapper enabled toggle
  $container.on('click.tww', '[data-toggle="worldbookWrapperEnabled"]', function () {
    const $t = $(this);
    const isOn = $t.hasClass('on');
    const next = !isOn;
    $t.toggleClass('on', next);
    try {
      const config = getTableWorkbenchConfig();
      const ws = config.worldbookSync || {};
      saveTableWorkbenchConfig({
        ...config,
        worldbookSync: {
          ...ws,
          wrapperConfig: { ...(ws.wrapperConfig || {}), enabled: next }
        }
      });
      showToast('success', next ? '已启用 Wrapper 包裹' : '已停用 Wrapper');
    } catch (err) {
      $t.toggleClass('on', isOn);
      getLog().error('toggle worldbookWrapperEnabled 异常', err);
    }
  });

  // sub-zone 各 binding（target book / wrapper tag / hint / position / depth / order）
  const worldbookSubBindings = [
    { sel: '[data-binding="worldbookTargetBook"]', path: 'targetBook', type: 'string' },
    { sel: '[data-binding="worldbookWrapperTag"]', path: 'wrapperConfig.wrapperTag', type: 'string' },
    { sel: '[data-binding="worldbookWrapperHint"]', path: 'wrapperConfig.wrapperHint', type: 'string' },
    { sel: '[data-binding="worldbookWrapperPosition"]', path: 'wrapperConfig.wrapperPlacement.position', type: 'string' },
    { sel: '[data-binding="worldbookWrapperDepth"]', path: 'wrapperConfig.wrapperPlacement.depth', type: 'number' },
    { sel: '[data-binding="worldbookWrapperOrder"]', path: 'wrapperConfig.wrapperPlacement.order', type: 'number' }
  ];
  for (const { sel, path, type } of worldbookSubBindings) {
    $container.on('change.tww', sel, function () {
      let value = $(this).val();
      if (type === 'number') value = Number.parseInt(value, 10);
      try {
        const config = getTableWorkbenchConfig();
        const ws = cloneDeep(config.worldbookSync || {});
        setNestedPath(ws, path, value);
        saveTableWorkbenchConfig({ ...config, worldbookSync: ws });
        showToast('success', '已保存');
      } catch (err) {
        getLog().error(`保存 worldbookSync.${path} 异常`, err);
        showToast('error', `保存失败：${err?.message || err}`);
      }
    });
  }

  // 刷新世界书列表
  $container.on('click.tww', '[data-action="refresh-worldbooks"]', function (e) {
    e.preventDefault();
    if (typeof refresh === 'function') refresh();
    showToast('success', '已刷新世界书列表');
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
