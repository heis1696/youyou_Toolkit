/**
 * YouYou Toolkit - 填表工具台窗口
 *
 * 议题 #15 #10 任务：独立的工具台窗口，对应 D:/Projects/yyt-style-preview/preview-table-workbench.html v3。
 *
 * 窗口职责：
 *   - Hero：工具名 + chip 行（模式 / 模板 / API / 指令 / 状态）+ 立即填表 / 保存按钮
 *   - Runtime row：状态 / 最近运行 / 成功 / 失败
 *   - 绑定区：7 个 binding-row（模板 / 触发模式 / API 预设 / Ai 指令 / 正则预设 / 世界书预设 / 作用域）
 *   - 填表行为：触发时机 / 填充模式 / 上下文消息数 + 同步选项 toggles
 *   - 表格概览：cards 点击 → openTableDataEditor（待 #11 实现）
 *
 * 设计：
 *   - 单一导出 openTableWorkbenchWindow(options) 复用 window-manager.createWindow
 *   - HTML 模板字符串 + 内嵌 scoped CSS（.yyt-tww-* 前缀避免污染）
 *   - 配置走 schema-service.getTableWorkbenchConfig / saveTableWorkbenchConfig
 *   - 模板走 template-service.resolveActiveTemplate（接入三模式）
 *   - 预设走 preset-manager / bypass-manager / regex-preset-store / worldbook-preset-store
 *   - 锁存储走 lock-service（按 scopeKey/sheetUid 分桶）— 用 isolation 复合 scope
 */

import { createWindow, closeWindow } from '../../window-manager.js';
import { logger } from '../../core/logger-service.js';
import {
  getTableWorkbenchConfig,
  saveTableWorkbenchConfig,
  TABLE_WORKBENCH_RUNTIME_STATUS
} from '../../table-engine/table-schema-service.js';
import {
  getAllTableTemplates,
  resolveActiveTemplate,
  setActiveGlobalTemplateId,
  applyTemplateAsChatOverride,
  linkPresetToChat,
  resetChatTemplateScope
} from '../../table-engine/table-template-service.js';
import { tableIsolation } from '../../table-engine/table-isolation-service.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';
import { getAllPresets as getApiPresets } from '../../preset-manager.js';
import { getPresetList as getBypassPresets } from '../../bypass-manager.js';
import regexStore from '../../regex-preset-store.js';
import worldbookStore from '../../worldbook-preset-store.js';
import { showToast } from '../utils.js';

const WINDOW_ID = 'yyt-table-workbench-window';
let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableWorkbenchWindow');
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
// CSS (scoped to .yyt-tww-*)
// ────────────────────────────────────────────────────────────────

const STYLES = `
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
  height: 100%; background: var(--tww-canvas); color: var(--tww-text);
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

.yyt-tww-scroll {
  flex: 1; min-height: 0; overflow-y: auto;
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

.yyt-tww-ctrl {
  width: 100%; padding: 7px 10px;
  background: var(--tww-canvas);
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 6px;
  color: var(--tww-text); font-size: 12px;
  outline: none;
  transition: border-color 0.12s ease;
  font-family: inherit;
}
.yyt-tww-ctrl:focus {
  border-color: var(--tww-accent);
  box-shadow: 0 0 0 2px var(--tww-accent-soft);
}
select.yyt-tww-ctrl {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8b7ca' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
  background-size: 10px; padding-right: 28px; cursor: pointer;
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

let _stylesInjected = false;
function injectStyles() {
  if (_stylesInjected) return;
  const $ = window.jQuery || window.parent?.jQuery;
  if (!$) return;
  const head = window.parent?.document?.head || document.head;
  const style = document.createElement('style');
  style.id = 'yyt-tww-styles';
  style.textContent = STYLES;
  head.appendChild(style);
  _stylesInjected = true;
}

// ────────────────────────────────────────────────────────────────
// HTML builders
// ────────────────────────────────────────────────────────────────

function buildContent(state) {
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

    <!-- Scrollable body -->
    <div class="yyt-tww-scroll">

      <!-- 绑定区 -->
      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          绑定
        </div>
        ${buildBindingsHtml(state)}
      </section>

      <!-- 填表行为 -->
      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          填表行为
        </div>
        ${buildBehaviorHtml(state)}
      </section>

      <!-- 表格概览 -->
      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          表格概览
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> 打开数据编辑器</button>
          </span>
        </div>
        ${buildTablesOverviewHtml(tablesPreview)}
      </section>

    </div>
  </div>
  `;
}

function buildBindingsHtml(state) {
  const { config, allTemplates, apiPresets, bypassPresets, regexPresets, worldbookPresets, activeTemplate } = state;

  // 模板（resolveActiveTemplate 给的 + 全局库列出 inherit_global 的所有选项）
  const tplOpts = allTemplates.map((t) => `<option value="${esc(t.id)}" ${activeTemplate?.source?.templateId === t.id ? 'selected' : ''}>${esc(t.name)}</option>`).join('');

  // 触发模式：跟随 config.automation.enabled
  const triggerVal = config?.automation?.enabled ? 'auto' : 'manual';

  // API 预设
  const apiVal = config?.apiPreset || '';
  const apiOpts = `<option value="">—— 跟随主 API ——</option>` +
    apiPresets.map((p) => `<option value="${esc(p.name)}" ${p.name === apiVal ? 'selected' : ''}>${esc(p.name)}</option>`).join('');

  // Ai 指令预设
  const bypassVal = config?.bypassPresetId || '';
  const bypassOpts = `<option value="">—— 无 ——</option>` +
    bypassPresets.map((p) => `<option value="${esc(p.id)}" ${p.id === bypassVal ? 'selected' : ''}>${esc(p.name)}${p.isDefault ? ' [默认]' : ''}</option>`).join('');

  // 正则预设
  const regexVal = config?.extraction?.regexPresetId || '';
  const regexOpts = `<option value="">—— 无（不进行提取） ——</option>` +
    regexPresets.map((p) => `<option value="${esc(p.id)}" ${p.id === regexVal ? 'selected' : ''}>${esc(p.name)}</option>`).join('');

  // 世界书预设
  const wbVal = config?.worldbooks?.presetId || '';
  const wbOpts = `<option value="">—— 无 ——</option>` +
    worldbookPresets.map((p) => `<option value="${esc(p.id)}" ${p.id === wbVal ? 'selected' : ''}>${esc(p.name)}</option>`).join('');

  // 作用域
  const scopeVal = config?.runScope || 'enabled';

  return `
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">填表模板</span>
        <span class="yyt-tww-row-label-hint">表结构 + 填表提示词</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="template">${tplOpts}</select>
      <div class="yyt-tww-row-meta">
        <span>${activeTemplate?.mode === 'inherit_global' ? '继承全局' : activeTemplate?.mode === 'chat_override' ? 'chat 覆盖' : activeTemplate?.mode === 'preset_link' ? '链接预设' : ''}</span>
      </div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">触发模式</span>
        <span class="yyt-tww-row-label-hint">自动随 AI 回复 / 仅手动</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="triggerMode">
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
      <select class="yyt-tww-ctrl" data-binding="apiPreset">${apiOpts}</select>
      <div class="yyt-tww-row-meta"><a data-link="api-presets">管理…</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">Ai 指令预设</span>
        <span class="yyt-tww-row-label-hint">附加在 system/user 前的指令</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="bypassPreset">${bypassOpts}</select>
      <div class="yyt-tww-row-meta"><a data-link="bypass">管理…</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">正则提取预设</span>
        <span class="yyt-tww-row-label-hint">决定从 AI 回复中如何抽取</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="regexPreset">${regexOpts}</select>
      <div class="yyt-tww-row-meta"><a data-link="regex">管理…</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">世界书预设</span>
        <span class="yyt-tww-row-label-hint">注入到 prompt 的 {{toolWorldbookContent}}</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="worldbookPreset">${wbOpts}</select>
      <div class="yyt-tww-row-meta"><a data-link="worldbook">管理…</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">作用域</span>
        <span class="yyt-tww-row-label-hint">数据状态绑定的范围</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="runScope">
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
      <select class="yyt-tww-ctrl" data-binding="fillMode">
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
      <input class="yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${esc(contextDepth)}">
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
// State loaders
// ────────────────────────────────────────────────────────────────

function loadWindowState() {
  const config = (() => { try { return getTableWorkbenchConfig(); } catch (_) { return {}; } })();
  const allTemplates = (() => { try { return getAllTableTemplates() || []; } catch (_) { return []; } })();
  const activeTemplate = (() => { try { return resolveActiveTemplate({}); } catch (_) { return null; } })();
  const apiPresets = (() => { try { return getApiPresets() || []; } catch (_) { return []; } })();
  const bypassPresets = (() => { try { return getBypassPresets() || []; } catch (_) { return []; } })();
  const regexPresets = (() => { try { return regexStore.listPresets() || []; } catch (_) { return []; } })();
  const worldbookPresets = (() => { try { return worldbookStore.listPresets() || []; } catch (_) { return []; } })();
  const isolationKey = (() => { try { return tableIsolation.getKey(); } catch (_) { return ''; } })();

  // tables preview — 从 activeTemplate 提取 schema-level 的表名（暂不读 slot state，等 #11 接入数据编辑器后再做）
  const tablesPreview = ((activeTemplate?.template?.tables) || (config?.tables) || []).map((t) => ({
    name: t?.name || '',
    rowCount: Array.isArray(t?.rows) ? t.rows.length : 0,
    colCount: Array.isArray(t?.columns) ? t.columns.length : 0,
    updatedHint: ''
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
// Binding handlers
// ────────────────────────────────────────────────────────────────

function bindEvents($window, refresh) {
  // 立即填表
  $window.on('click', '[data-action="run-now"]', async () => {
    try {
      const result = await runManualTableUpdate();
      if (result?.success) {
        showToast('success', '填表完成');
      } else {
        showToast('error', `填表失败：${result?.error || '未知'}`);
      }
      refresh();
    } catch (err) {
      getLog().error('立即填表异常', err);
      showToast('error', `异常：${err?.message || err}`);
    }
  });

  // 重填（clearBeforeUpdate）
  $window.on('click', '[data-action="run-clear"]', async () => {
    if (!window.confirm('重填会清空当前消息楼层的表格数据并重新生成，确定？')) return;
    try {
      const result = await runManualTableUpdate(null, { clearBeforeUpdate: true });
      if (result?.success) {
        showToast('success', '重填完成');
      } else {
        showToast('error', `重填失败：${result?.error || '未知'}`);
      }
      refresh();
    } catch (err) {
      getLog().error('重填异常', err);
      showToast('error', `异常：${err?.message || err}`);
    }
  });

  // 打开数据编辑器（#11 待实现）
  $window.on('click', '[data-action="open-editor"], [data-table-index]', (e) => {
    e.preventDefault();
    showToast('info', '数据编辑器窗口待实现（#11）');
  });

  // 模板切换
  $window.on('change', '[data-binding="template"]', function() {
    const templateId = $(this).val();
    try {
      setActiveGlobalTemplateId(templateId);
      // 同时更新 config.activeTemplate（兼容旧 schema-service 字段）
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({ ...config, activeTemplate: templateId });
      showToast('success', '模板已切换');
      refresh();
    } catch (err) {
      getLog().error('切换模板异常', err);
      showToast('error', `切换失败：${err?.message || err}`);
    }
  });

  // 触发模式
  $window.on('change', '[data-binding="triggerMode"]', function() {
    const mode = $(this).val();
    try {
      const config = getTableWorkbenchConfig();
      saveTableWorkbenchConfig({
        ...config,
        automation: { ...(config.automation || {}), enabled: mode === 'auto' }
      });
      showToast('success', mode === 'auto' ? '已切换为自动模式' : '已切换为手动模式');
      refresh();
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
    $window.on('change', sel, function() {
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

  // 正则预设
  $window.on('change', '[data-binding="regexPreset"]', function() {
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

  // 世界书预设
  $window.on('change', '[data-binding="worldbookPreset"]', function() {
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

  // 上下文消息数
  $window.on('change', '[data-binding="contextDepth"]', function() {
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
  $window.on('click', '[data-toggle="worldbookSync"]', function() {
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

  $window.on('click', '[data-toggle="mirrorToMessage"]', function() {
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

  // 管理链接（暂仅 toast 提示，未来跳到对应预设管理面板）
  $window.on('click', '[data-link]', function(e) {
    e.preventDefault();
    showToast('info', `跳转到预设管理面板（待接入）`);
  });
}

// ────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────

/**
 * 打开填表工具台窗口（独立窗口）
 *
 * @param {Object} [options]
 * @param {string} [options.focus] - 'bindings' | 'behavior' | 'overview'，打开后滚到指定区
 */
export function openTableWorkbenchWindow(options = {}) {
  injectStyles();
  const $ = window.jQuery || window.parent?.jQuery;
  if (!$) {
    getLog().error('jQuery 不可用');
    return null;
  }

  const renderState = () => {
    const state = loadWindowState();
    return buildContent(state);
  };

  let $window = null;

  const refresh = () => {
    if (!$window) return;
    const $body = $window.find('.yyt-window-body');
    $body.html(renderState());
  };

  $window = createWindow({
    id: WINDOW_ID,
    title: '填表工作台',
    content: renderState(),
    width: 980,
    height: 720,
    modal: false,
    resizable: true,
    maximizable: true,
    rememberState: true,
    onReady: ($el) => {
      $window = $el;
      bindEvents($window, refresh);
      // focus to section
      if (options.focus) {
        const $section = $window.find(`[data-section="${options.focus}"]`);
        if ($section.length) {
          const $scroll = $window.find('.yyt-tww-scroll');
          $scroll.animate({ scrollTop: $section.position().top + $scroll.scrollTop() - 10 }, 200);
        }
      }
    },
    onClose: () => {
      getLog().info('窗口已关闭');
    }
  });

  return $window;
}

export function closeTableWorkbenchWindow() {
  return closeWindow(WINDOW_ID);
}

export default {
  openTableWorkbenchWindow,
  closeTableWorkbenchWindow
};
