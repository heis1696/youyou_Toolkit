/**
 * YouYou Toolkit - 填表数据编辑器窗口（议题 #15 #11）
 *
 * 独立浮窗，对应 preview-table-data-editor.html 设计。
 * 从工作台「打开数据编辑器」按钮 + 表格概览卡片点击触发。
 *
 * 3 个 mode：
 *   - data: card-grid 编辑 cell + 锁定显示 + 增删行（最小可用版本完整）
 *   - schema: 字段定义只读展示（等 #16 schema-service 重写后可编辑）
 *   - global: 跨表设置占位（等 #30 写回世界书 UI 一起做）
 *
 * 数据流：
 *   打开 → getAssistantTableSnapshot 拿当前 slot tableState 深拷贝到 _state.tempData
 *   cell input/change 实时改 _state.tempData + 标 isDirty
 *   [保存] → commitBoundState(target, { tables: tempData })
 *   [立即填表] → runManualTableUpdate
 *   关闭前 isDirty 时 confirm
 */

import { createWindow, closeWindow } from '../../window-manager.js';
import { logger } from '../../core/logger-service.js';
import {
  getAssistantTableSnapshot,
  commitBoundState
} from '../../table-engine/table-state-service.js';
import { resolveLatestTableTarget } from '../../table-engine/table-target-resolver.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';
import { resolveActiveTemplate } from '../../table-engine/table-template-service.js';
import { cloneTableValue, createRuntimeTableRowId } from '../../table-engine/table-types.js';
import { tableIsolation } from '../../table-engine/table-isolation-service.js';
import { showToast } from '../utils.js';

const WINDOW_ID = 'yyt-table-data-editor';

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableDataEditor');
  return _log;
}

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// 模块级状态（单 instance 窗口）
const _state = {
  $window: null,
  mode: 'data',
  tempData: null,          // 深拷贝的 tables（runtime 格式 [{uid, name, columns, rows}]）
  currentTableIndex: -1,
  isDirty: false,
  isFromTemplate: false,   // v1.0.180：当 slot 空时从模板 fallback 加载，编辑保存时会初始化 slot
  targetSnapshot: null
};

function getState() { return _state; }

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════

const STYLES = `
.yyt-tde {
  --tde-canvas: var(--yyt-bg-base, #0a0d13);
  --tde-surface-1: var(--yyt-surface, #0f1219);
  --tde-surface-2: var(--yyt-surface-2, #151a24);
  --tde-surface-3: var(--yyt-surface-3, #1c2231);
  --tde-hairline: var(--yyt-border, rgba(255,255,255,0.06));
  --tde-hairline-strong: var(--yyt-border-strong, rgba(255,255,255,0.12));
  --tde-text: var(--yyt-text, rgba(255,255,255,0.92));
  --tde-text-secondary: var(--yyt-text-secondary, rgba(255,255,255,0.55));
  --tde-text-muted: var(--yyt-text-muted, rgba(255,255,255,0.35));
  --tde-accent: var(--yyt-accent, #7bb7ff);
  --tde-accent-soft: var(--yyt-accent-soft, rgba(123,183,255,0.15));
  --tde-accent-strong: var(--yyt-accent-strong, #a5d4ff);
  --tde-on-accent: var(--yyt-on-accent, #0a0d13);
  --tde-success: #4ade80;
  --tde-warning: #fbbf24;
  --tde-error: #ef4444;
  --tde-warning-soft: rgba(251,191,36,0.14);

  display: flex; flex-direction: column;
  height: 100%;
  background: transparent;
  color: var(--tde-text);
  font-size: 13px; line-height: 1.5;
}

/* toolbar */
.yyt-tde-toolbar {
  flex: 0 0 52px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--tde-hairline);
  background: var(--tde-surface-1);
}
.yyt-tde-toolbar-left { display: flex; align-items: center; gap: 12px; }
.yyt-tde-mode-switch {
  display: inline-flex; gap: 2px; padding: 2px;
  border-radius: 6px;
  background: var(--tde-surface-2);
  border: 1px solid var(--tde-hairline);
}
.yyt-tde-mode-switch button {
  border: none; background: transparent;
  color: var(--tde-text-secondary);
  padding: 6px 12px; border-radius: 4px;
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
  font-family: inherit;
}
.yyt-tde-mode-switch button:hover:not(.active) { color: var(--tde-text); background: rgba(255,255,255,0.04); }
.yyt-tde-mode-switch button.active { background: var(--tde-accent); color: var(--tde-on-accent); font-weight: 700; }

.yyt-tde-dirty-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 3px 9px; border-radius: 999px;
  font-size: 11px; font-weight: 700;
  color: var(--tde-warning); background: var(--tde-warning-soft);
  border: 1px solid rgba(251,191,36,0.2);
}
.yyt-tde-dirty-badge::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--tde-warning);
}

.yyt-tde-actions { display: flex; gap: 8px; }
.yyt-tde-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--tde-hairline-strong);
  border-radius: 6px;
  background: var(--tde-surface-2);
  color: var(--tde-text-secondary);
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: all 0.12s ease;
  font-family: inherit;
}
.yyt-tde-btn:hover { background: var(--tde-surface-3); color: var(--tde-text); }
.yyt-tde-btn-primary {
  background: var(--tde-accent); color: var(--tde-on-accent);
  border-color: transparent; font-weight: 700;
}
.yyt-tde-btn-primary:hover { background: var(--tde-accent-strong); }
.yyt-tde-btn:disabled {
  opacity: 0.5; cursor: not-allowed; pointer-events: none;
}

/* content */
.yyt-tde-content { flex: 1; min-height: 0; display: flex; overflow: hidden; }

/* sidebar */
.yyt-tde-sidebar {
  flex: 0 0 220px;
  background: var(--tde-surface-1);
  border-right: 1px solid var(--tde-hairline);
  padding: 14px 10px 12px;
  display: flex; flex-direction: column;
  overflow-y: auto;
}
.yyt-tde-sidebar-label {
  font-size: 10px; font-weight: 700; color: var(--tde-text-muted);
  text-transform: uppercase; letter-spacing: 0.5px;
  padding: 0 8px 10px;
}
.yyt-tde-sheet-list { display: flex; flex-direction: column; gap: 2px; }
.yyt-tde-sheet-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 6px;
  background: transparent; border: 1px solid transparent;
  color: var(--tde-text-secondary); font-size: 13px; font-weight: 600;
  cursor: pointer; text-align: left; width: 100%;
  transition: background 0.12s ease, color 0.12s ease;
  font-family: inherit;
}
.yyt-tde-sheet-item:hover { background: var(--tde-surface-2); color: var(--tde-text); }
.yyt-tde-sheet-item.active {
  background: var(--tde-accent-soft); color: var(--tde-accent-strong);
  border-color: rgba(123,183,255,0.18);
}
.yyt-tde-sheet-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.yyt-tde-sheet-count {
  flex-shrink: 0; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  color: var(--tde-text-muted); background: rgba(255,255,255,0.04);
}
.yyt-tde-sheet-item.active .yyt-tde-sheet-count { color: var(--tde-accent); background: rgba(123,183,255,0.12); }

/* main */
.yyt-tde-main {
  flex: 1; min-width: 0;
  overflow-y: auto;
  padding: 16px 18px;
  background: var(--tde-canvas);
}

/* card grid */
.yyt-tde-card-grid {
  display: flex; flex-wrap: wrap; gap: 12px;
  align-content: flex-start;
}
.yyt-tde-card {
  width: 300px;
  display: flex; flex-direction: column;
  background: var(--tde-surface-1);
  border: 1px solid var(--tde-hairline-strong);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.12s ease;
}
.yyt-tde-card:hover { border-color: var(--tde-accent); }

.yyt-tde-card-header {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px;
  background: var(--tde-surface-2);
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-card-index {
  flex-shrink: 0; min-width: 26px;
  padding: 2px 8px; border-radius: 999px;
  background: rgba(255,255,255,0.05);
  color: var(--tde-text-muted);
  font-size: 10px; font-weight: 700;
  text-align: center;
}
.yyt-tde-card-name {
  flex: 1; min-width: 0;
  background: transparent; border: 1px solid transparent;
  color: var(--tde-text); font-size: 13px; font-weight: 700;
  padding: 3px 6px; border-radius: 4px;
  outline: none;
  font-family: inherit;
}
.yyt-tde-card-name:hover { background: rgba(255,255,255,0.03); }
.yyt-tde-card-name:focus { background: var(--tde-canvas); border-color: var(--tde-accent); }

.yyt-tde-card-actions { display: flex; gap: 2px; flex-shrink: 0; }
.yyt-tde-icon-btn {
  width: 26px; height: 26px;
  padding: 0; border: none; background: transparent;
  color: var(--tde-text-muted);
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px;
  transition: background 0.12s ease, color 0.12s ease;
  font-family: inherit;
}
.yyt-tde-icon-btn:hover { background: rgba(255,255,255,0.06); color: var(--tde-text); }
.yyt-tde-icon-btn.danger:hover { background: rgba(239,68,68,0.18); color: #ffb4b4; }

.yyt-tde-card-body {
  padding: 4px 12px 10px;
  display: flex; flex-direction: column;
}
.yyt-tde-field {
  padding: 6px 0;
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-field:last-child { border-bottom: none; }
.yyt-tde-field-label {
  font-size: 10px; font-weight: 700; color: var(--tde-text-muted);
  text-transform: uppercase; letter-spacing: 0.3px;
  margin-bottom: 3px;
}
.yyt-tde-field-cell {
  padding: 4px 8px; margin: 0 -8px;
  border: 1px solid transparent; border-radius: 4px;
  color: var(--tde-text); font-size: 13px; line-height: 1.5;
  min-height: 22px;
  word-break: break-word;
  outline: none;
  cursor: text;
  transition: all 0.12s ease;
}
.yyt-tde-field-cell:hover { background: var(--tde-surface-2); border-color: var(--tde-hairline); }
.yyt-tde-field-cell:focus {
  background: var(--tde-surface-2); border-color: var(--tde-accent);
  box-shadow: 0 0 0 2px var(--tde-accent-soft);
}
.yyt-tde-field-cell--empty { color: var(--tde-text-muted); font-style: italic; }

.yyt-tde-card-add {
  width: 300px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 84px;
  border: 1px dashed var(--tde-hairline-strong);
  border-radius: 8px;
  background: transparent;
  color: var(--tde-text-muted);
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
  font-family: inherit;
}
.yyt-tde-card-add:hover { border-color: var(--tde-accent); color: var(--tde-accent); background: var(--tde-accent-soft); }

.yyt-tde-empty {
  padding: 24px;
  text-align: center;
  color: var(--tde-text-muted);
  font-size: 13px;
  border: 1px dashed var(--tde-hairline-strong);
  border-radius: 8px;
}

/* schema mode (read-only display 等 #16) */
.yyt-tde-schema-section {
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-schema-section:last-child { border-bottom: none; }
.yyt-tde-schema-heading {
  font-size: 12px; font-weight: 700; color: var(--tde-text);
  text-transform: uppercase; letter-spacing: 0.3px;
  margin-bottom: 10px;
}
.yyt-tde-schema-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  padding: 8px 0;
  border-top: 1px dashed rgba(255,255,255,0.08);
  font-size: 12px;
}
.yyt-tde-schema-row:first-child { border-top: none; }
.yyt-tde-schema-key { color: var(--tde-text-secondary); font-weight: 600; }
.yyt-tde-schema-value { color: var(--tde-text); word-break: break-word; }
.yyt-tde-schema-hint {
  font-size: 11px;
  color: var(--tde-text-muted);
  padding: 10px 14px;
  background: var(--tde-surface-2);
  border-left: 3px solid var(--tde-accent);
  border-radius: 4px;
  margin-bottom: 12px;
}
`;

let _stylesInjected = false;
function injectStyles() {
  if (_stylesInjected) return;
  try {
    const doc = (window.parent && window.parent.document) ? window.parent.document : document;
    const head = doc.head || doc.documentElement;
    if (head.querySelector('#yyt-tde-styles')) {
      _stylesInjected = true;
      return;
    }
    const style = doc.createElement('style');
    style.id = 'yyt-tde-styles';
    style.textContent = STYLES;
    head.appendChild(style);
    _stylesInjected = true;
  } catch (err) {
    getLog().warn('注入数据编辑器样式失败', err);
  }
}

// ════════════════════════════════════════════════════════════════
// State loaders
// ════════════════════════════════════════════════════════════════

function loadEditorData() {
  let tables = [];
  let targetSnapshot = null;
  let isFromTemplate = false;

  try {
    const snapshot = getAssistantTableSnapshot(null);
    if (Array.isArray(snapshot?.tableState?.tables) && snapshot.tableState.tables.length > 0) {
      tables = snapshot.tableState.tables;
    }
    targetSnapshot = snapshot ? {
      chatId: snapshot.chatId || '',
      sourceMessageId: snapshot.sourceMessageId || snapshot.message?.message_id || '',
      sourceSwipeId: snapshot.sourceSwipeId || '',
      effectiveSwipeId: snapshot.effectiveSwipeId || '',
      slotBindingKey: snapshot.slotBindingKey || '',
      slotRevisionKey: snapshot.slotRevisionKey || '',
      slotTransactionId: snapshot.slotTransactionId || '',
      traceId: snapshot.traceId || '',
      targetMessageIndex: snapshot.targetMessageIndex ?? -1
    } : null;
  } catch (err) {
    getLog().warn('loadEditorData 异常', err);
  }

  // v1.0.180 hotfix：slot 没数据时从当前激活模板的表 schema fallback，sidebar 和 schema mode 才能显示
  if (tables.length === 0) {
    try {
      const activeTemplate = resolveActiveTemplate({});
      const tplTables = activeTemplate?.template?.tables;
      if (Array.isArray(tplTables) && tplTables.length > 0) {
        tables = cloneTableValue(tplTables);
        isFromTemplate = true;
      }
    } catch (err) {
      getLog().warn('从模板 fallback 失败', err);
    }
  }

  _state.tempData = cloneTableValue(tables) || [];
  _state.targetSnapshot = targetSnapshot;
  _state.isDirty = false;
  _state.isFromTemplate = isFromTemplate;

  if (_state.currentTableIndex >= _state.tempData.length) {
    _state.currentTableIndex = _state.tempData.length > 0 ? 0 : -1;
  } else if (_state.currentTableIndex < 0 && _state.tempData.length > 0) {
    _state.currentTableIndex = 0;
  }
}

// ════════════════════════════════════════════════════════════════
// HTML builders
// ════════════════════════════════════════════════════════════════

function renderEditorHtml() {
  return `
    <div class="yyt-tde">
      ${renderToolbar()}
      <div class="yyt-tde-content">
        ${renderSidebar()}
        <main class="yyt-tde-main">${renderMainPane()}</main>
      </div>
    </div>
  `;
}

function renderToolbar() {
  return `
    <div class="yyt-tde-toolbar">
      <div class="yyt-tde-toolbar-left">
        <div class="yyt-tde-mode-switch">
          <button class="${_state.mode === 'data' ? 'active' : ''}" data-mode="data">数据编辑</button>
          <button class="${_state.mode === 'schema' ? 'active' : ''}" data-mode="schema">结构配置</button>
          <button class="${_state.mode === 'global' ? 'active' : ''}" data-mode="global">全局注入</button>
        </div>
        ${_state.isDirty ? `<span class="yyt-tde-dirty-badge">未保存</span>` : ''}
      </div>
      <div class="yyt-tde-actions">
        <button class="yyt-tde-btn" data-action="reload"><i class="fa-solid fa-rotate"></i> 重新加载</button>
        <button class="yyt-tde-btn" data-action="save" ${_state.isDirty ? '' : 'disabled'}><i class="fa-solid fa-floppy-disk"></i> 保存</button>
        <button class="yyt-tde-btn yyt-tde-btn-primary" data-action="run-now"><i class="fa-solid fa-play"></i> 立即填表</button>
      </div>
    </div>
  `;
}

function renderSidebar() {
  const tables = _state.tempData || [];
  const items = tables.map((t, i) => {
    const name = t?.name || `表 ${i + 1}`;
    const rowCount = Array.isArray(t?.rows) ? t.rows.length : 0;
    return `
      <button class="yyt-tde-sheet-item ${i === _state.currentTableIndex ? 'active' : ''}" data-sheet-index="${i}">
        <span class="yyt-tde-sheet-name">${esc(name)}</span>
        <span class="yyt-tde-sheet-count">${rowCount}</span>
      </button>
    `;
  }).join('');

  return `
    <nav class="yyt-tde-sidebar">
      <div class="yyt-tde-sidebar-label">表格列表 (${tables.length})</div>
      <div class="yyt-tde-sheet-list">
        ${items || `<div style="padding: 8px 10px; font-size: 11px; color: var(--tde-text-muted);">暂无表</div>`}
      </div>
    </nav>
  `;
}

function renderMainPane() {
  const tables = _state.tempData || [];
  const ti = _state.currentTableIndex;
  const table = (ti >= 0 && ti < tables.length) ? tables[ti] : null;

  // v1.0.180 hotfix：global mode 不依赖 tables 数据（跨表设置 / 占位）
  if (_state.mode === 'global') {
    return renderGlobalMode();
  }

  if (tables.length === 0) {
    return `<div class="yyt-tde-empty">当前 slot 没有表数据，模板也未配置表。<br>请先在工作台点"立即填表"让 AI 初始化，或到「预设管理 → 表格模板」配置模板。</div>`;
  }

  if (!table) {
    return `<div class="yyt-tde-empty">请从左侧选择一张表。</div>`;
  }

  if (_state.mode === 'data') return renderDataMode(table, ti);
  if (_state.mode === 'schema') return renderSchemaMode(table, ti);
  return '';
}

function renderDataMode(table, tableIndex) {
  const columns = Array.isArray(table?.columns) ? table.columns : [];
  const rows = Array.isArray(table?.rows) ? table.rows : [];

  // v1.0.180：fromTemplate 状态显示提示
  const fromTemplateHint = _state.isFromTemplate
    ? `<div class="yyt-tde-schema-hint" style="margin-bottom:12px;">当前显示<b>模板默认结构</b>（slot 尚无数据）。直接添加行或编辑会创建 slot 数据；或工作台点"立即填表"让 AI 填。</div>`
    : '';

  const cards = rows.map((row, ri) => {
    const cells = row?.cells || {};
    const fieldsHtml = columns.map((col) => {
      const key = col?.key || '';
      const title = col?.title || key;
      const value = cells[key];
      const isEmpty = value === undefined || value === null || value === '';
      const display = isEmpty ? '（空）' : String(value);
      return `
        <div class="yyt-tde-field">
          <div class="yyt-tde-field-label">${esc(title)}</div>
          <div class="yyt-tde-field-cell ${isEmpty ? 'yyt-tde-field-cell--empty' : ''}"
               contenteditable
               data-row-index="${ri}"
               data-col-key="${esc(key)}">${esc(display)}</div>
        </div>
      `;
    }).join('');

    return `
      <article class="yyt-tde-card" data-row-index="${ri}">
        <header class="yyt-tde-card-header">
          <span class="yyt-tde-card-index">#${ri + 1}</span>
          <input class="yyt-tde-card-name" value="${esc(row?.name || '')}" data-row-name-index="${ri}" placeholder="行名">
          <div class="yyt-tde-card-actions">
            <button class="yyt-tde-icon-btn danger" data-action="delete-row" data-row-index="${ri}" title="删除行"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </header>
        <div class="yyt-tde-card-body">${fieldsHtml || '<div style="padding:8px;color:var(--tde-text-muted);font-size:12px;">该表没有列定义</div>'}</div>
      </article>
    `;
  }).join('');

  return `
    ${fromTemplateHint}
    <div class="yyt-tde-card-grid">
      ${cards}
      <button class="yyt-tde-card-add" data-action="add-row">
        <i class="fa-solid fa-plus"></i> 添加行
      </button>
    </div>
  `;
}

function renderSchemaMode(table, tableIndex) {
  const columns = Array.isArray(table?.columns) ? table.columns : [];
  const fieldRows = columns.map((col) => `
    <div class="yyt-tde-schema-row">
      <div class="yyt-tde-schema-key">${esc(col?.key || '')} <span style="color:var(--tde-text-muted);font-weight:400;">/ ${esc(col?.type || 'text')}</span></div>
      <div class="yyt-tde-schema-value">
        <div style="font-weight:600;color:var(--tde-text);">${esc(col?.title || col?.key || '')}</div>
        ${col?.description ? `<div style="color:var(--tde-text-muted);font-size:11px;margin-top:2px;">${esc(col.description)}</div>` : ''}
      </div>
    </div>
  `).join('');

  return `
    <div class="yyt-tde-schema-hint">
      <strong>只读展示</strong> — 字段定义的可编辑 UI 会在 #16 schema-service 重写后接入（支持改名/类型/描述/AI 操作说明）。
      此 mode 下暂只显示当前列定义。
    </div>
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">基础信息</div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">表名</div>
        <div class="yyt-tde-schema-value">${esc(table?.name || '')}</div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">UID</div>
        <div class="yyt-tde-schema-value"><code style="font-size:11px;color:var(--tde-accent);">${esc(table?.uid || table?.id || '')}</code></div>
      </div>
    </div>
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">字段定义 (${columns.length})</div>
      ${fieldRows || '<div style="color:var(--tde-text-muted);font-size:12px;padding:8px 0;">无字段</div>'}
    </div>
  `;
}

function renderGlobalMode() {
  return `
    <div class="yyt-tde-schema-hint">
      <strong>跨表 / 全局注入设置</strong> — 此 mode 包含写回世界书配置（议题 #15 #30）和 isolationKey 等。
      预计 v1.0.176 接入。当前仅占位。
    </div>
    <div class="yyt-tde-empty">全局注入配置 UI 待 #30 写回世界书 + isolation UI 完成后接入。</div>
  `;
}

// ════════════════════════════════════════════════════════════════
// Event handlers
// ════════════════════════════════════════════════════════════════

function refresh() {
  if (!_state.$window) return;
  const $body = _state.$window.find('.yyt-window-body');
  $body.html(renderEditorHtml());
  bindEditorEvents(_state.$window);
}

function bindEditorEvents($window) {
  const $ = window.jQuery || window.parent?.jQuery;
  if (!$ || !$window || !$window.on) return;

  $window.off('.tde');

  // mode 切换
  $window.on('click.tde', '.yyt-tde-mode-switch button[data-mode]', function () {
    const newMode = $(this).attr('data-mode');
    if (newMode && newMode !== _state.mode) {
      _state.mode = newMode;
      refresh();
    }
  });

  // sidebar 表切换
  $window.on('click.tde', '[data-sheet-index]', function () {
    const idx = Number($(this).attr('data-sheet-index'));
    if (Number.isFinite(idx) && idx !== _state.currentTableIndex) {
      _state.currentTableIndex = idx;
      refresh();
    }
  });

  // 重新加载
  $window.on('click.tde', '[data-action="reload"]', () => {
    if (_state.isDirty && !window.confirm('有未保存修改，重新加载将丢弃，确定？')) return;
    loadEditorData();
    refresh();
    showToast('success', '已重新加载');
  });

  // 保存
  $window.on('click.tde', '[data-action="save"]', async () => {
    if (!_state.isDirty) {
      showToast('info', '没有修改');
      return;
    }
    try {
      let target = _state.targetSnapshot;
      if (!target?.sourceMessageId) {
        target = await resolveLatestTableTarget();
      }
      if (!target?.sourceMessageId) {
        showToast('error', '无法定位当前消息（找不到 assistant 消息）');
        return;
      }
      const result = await commitBoundState(target, {
        tables: cloneTableValue(_state.tempData) || [],
        meta: { source: 'data-editor-manual-save' }
      }, { skipFreshValidation: true });
      if (result?.success) {
        _state.isDirty = false;
        _state.targetSnapshot = {
          chatId: result.state?.chatId || target.chatId,
          sourceMessageId: result.sourceMessageId,
          sourceSwipeId: result.state?.sourceSwipeId || target.sourceSwipeId,
          effectiveSwipeId: target.effectiveSwipeId,
          slotBindingKey: result.state?.slotBindingKey || target.slotBindingKey,
          slotRevisionKey: result.slotRevisionKey,
          slotTransactionId: target.slotTransactionId,
          traceId: target.traceId,
          targetMessageIndex: result.messageIndex ?? target.targetMessageIndex
        };
        showToast('success', '已保存');
        refresh();
      } else {
        showToast('error', `保存失败：${result?.error || '未知'}`);
      }
    } catch (err) {
      getLog().error('保存异常', err);
      showToast('error', `保存异常：${err?.message || err}`);
    }
  });

  // 立即填表
  $window.on('click.tde', '[data-action="run-now"]', async () => {
    if (_state.isDirty && !window.confirm('有未保存修改，立即填表会先丢弃这些修改，确定？')) return;
    try {
      const result = await runManualTableUpdate();
      if (result?.success) {
        showToast('success', '填表完成');
        loadEditorData();
        refresh();
      } else {
        showToast('error', `填表失败：${result?.error || '未知'}`);
      }
    } catch (err) {
      getLog().error('立即填表异常', err);
      showToast('error', `异常：${err?.message || err}`);
    }
  });

  // cell 编辑（input 事件 → 实时同步到 tempData）
  $window.on('input.tde', '[data-row-index][data-col-key]', function () {
    const ri = Number($(this).attr('data-row-index'));
    const key = $(this).attr('data-col-key');
    const value = $(this).text();
    if (!Number.isFinite(ri) || !key) return;
    const table = _state.tempData[_state.currentTableIndex];
    if (!table?.rows?.[ri]) return;
    if (!table.rows[ri].cells) table.rows[ri].cells = {};
    table.rows[ri].cells[key] = value;
    _state.isDirty = true;
    // 不 refresh — 让用户继续输入；只更新 dirty badge 状态
    _updateToolbarOnly();
  });

  // 行名编辑
  $window.on('input.tde', '[data-row-name-index]', function () {
    const ri = Number($(this).attr('data-row-name-index'));
    if (!Number.isFinite(ri)) return;
    const table = _state.tempData[_state.currentTableIndex];
    if (!table?.rows?.[ri]) return;
    table.rows[ri].name = $(this).val();
    _state.isDirty = true;
    _updateToolbarOnly();
  });

  // 删除行
  $window.on('click.tde', '[data-action="delete-row"]', function () {
    const ri = Number($(this).attr('data-row-index'));
    if (!Number.isFinite(ri)) return;
    if (!window.confirm(`确定删除第 ${ri + 1} 行？`)) return;
    const table = _state.tempData[_state.currentTableIndex];
    if (!table?.rows) return;
    table.rows.splice(ri, 1);
    _state.isDirty = true;
    refresh();
  });

  // 添加行
  $window.on('click.tde', '[data-action="add-row"]', () => {
    const table = _state.tempData[_state.currentTableIndex];
    if (!table) return;
    if (!Array.isArray(table.rows)) table.rows = [];
    table.rows.push({
      id: createRuntimeTableRowId('row'),
      name: '',
      cells: {}
    });
    _state.isDirty = true;
    refresh();
  });
}

// 仅更新 toolbar（避免 cell 编辑时整页 refresh 导致光标丢失）
function _updateToolbarOnly() {
  if (!_state.$window) return;
  const $toolbar = _state.$window.find('.yyt-tde-toolbar');
  if (!$toolbar || !$toolbar.length) return;
  $toolbar.replaceWith(renderToolbar());
  // toolbar 重新挂上事件（之前的事件 delegate 到 $window 上不需要重绑）
}

// ════════════════════════════════════════════════════════════════
// Public API
// ════════════════════════════════════════════════════════════════

/**
 * 打开数据编辑器窗口
 * @param {Object} [options]
 * @param {string} [options.focusTableUid] - 打开后聚焦的表 uid
 * @param {string} [options.focusMode] - 'data' | 'schema' | 'global'
 */
export function openTableDataEditor(options = {}) {
  // v1.0.178 hotfix Bug 2：诊断 + 不静默失败
  console.log('[YYT][TableDataEditor] openTableDataEditor called', { options });
  getLog().info('openTableDataEditor 调用', { options });

  injectStyles();
  const $ = window.jQuery || window.parent?.jQuery;
  if (!$) {
    const msg = 'jQuery 不可用（window.jQuery 和 window.parent.jQuery 都是 undefined）';
    console.error('[YYT][TableDataEditor]', msg);
    getLog().error(msg);
    try { showToast('error', `数据编辑器打开失败：${msg}`); } catch (_) {}
    return null;
  }
  console.log('[YYT][TableDataEditor] jQuery 可用');

  // 已存在则置顶 + 切到 focus
  if (_state.$window && _state.$window.length && document.body.contains(_state.$window[0])) {
    // 切表
    if (options.focusTableUid) {
      const tables = _state.tempData || [];
      const idx = tables.findIndex((t) => (t?.uid || t?.id) === options.focusTableUid);
      if (idx >= 0) _state.currentTableIndex = idx;
    }
    if (options.focusMode && ['data', 'schema', 'global'].includes(options.focusMode)) {
      _state.mode = options.focusMode;
    }
    refresh();
    return _state.$window;
  }

  // 初始化状态
  loadEditorData();
  console.log('[YYT][TableDataEditor] loadEditorData 完成，tempData 表数:', _state.tempData?.length);
  if (options.focusTableUid) {
    const tables = _state.tempData || [];
    const idx = tables.findIndex((t) => (t?.uid || t?.id) === options.focusTableUid);
    if (idx >= 0) _state.currentTableIndex = idx;
  }
  if (options.focusMode && ['data', 'schema', 'global'].includes(options.focusMode)) {
    _state.mode = options.focusMode;
  }

  console.log('[YYT][TableDataEditor] 即将调 createWindow');
  let $win;
  try {
    $win = createWindow({
      id: WINDOW_ID,
      title: '填表数据编辑器',
      content: renderEditorHtml(),
      width: 1200,
      height: 800,
      modal: false,
      resizable: true,
      maximizable: true,
      rememberState: true,
      onReady: ($el) => {
        console.log('[YYT][TableDataEditor] onReady triggered', { $el: !!$el });
        _state.$window = $el;
        bindEditorEvents($el);
      },
      onClose: () => {
        if (_state.isDirty) {
          getLog().warn('数据编辑器关闭时有未保存修改');
        }
        _state.$window = null;
      }
    });
    console.log('[YYT][TableDataEditor] createWindow 返回:', !!$win);
  } catch (err) {
    console.error('[YYT][TableDataEditor] createWindow 抛错:', err);
    getLog().error('createWindow 抛错', err);
    try { showToast('error', `创建窗口失败：${err?.message || err}`); } catch (_) {}
    return null;
  }

  return $win;
}

export function closeTableDataEditor() {
  return closeWindow(WINDOW_ID);
}

export default {
  openTableDataEditor,
  closeTableDataEditor
};
