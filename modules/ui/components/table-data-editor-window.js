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
import { resolveActiveTemplate, saveTableTemplate, getActiveGlobalTemplate } from '../../table-engine/table-template-service.js';
import { getTableWorkbenchConfig, saveTableWorkbenchConfig } from '../../table-engine/table-schema-service.js';
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
  _pendingMirrorTag: null,
  targetSnapshot: null
};

function getState() { return _state; }

// v1.0.198 修复：onChange 直接 DOM 操作更新按钮 disabled / dirty badge，
// 避免每次输入都 refresh 整页（会导致 input 失焦）。原版本只改 _state.isDirty
// 不刷 UI，用户必须切表才能让保存按钮 enable，体验差。
function markDirty() {
  _state.isDirty = true;
  if (!_state.$window) return;
  try {
    _state.$window.find('[data-action="save"], [data-action="save-global"]').prop('disabled', false).removeAttr('disabled');
    const $toolbarLeft = _state.$window.find('.yyt-tde-toolbar-left').first();
    if ($toolbarLeft.length && $toolbarLeft.find('.yyt-tde-dirty-badge').length === 0) {
      $toolbarLeft.append('<span class="yyt-tde-dirty-badge">未保存</span>');
    }
  } catch (_) { /* ignore */ }
}

function clearDirty() {
  _state.isDirty = false;
  if (!_state.$window) return;
  try {
    _state.$window.find('[data-action="save"]').prop('disabled', true).attr('disabled', 'disabled');
    _state.$window.find('.yyt-tde-dirty-badge').remove();
  } catch (_) { /* ignore */ }
}

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

/* v1.0.194 Task M3: sidebar 表顺序操作 */
.yyt-tde-sheet-item-wrap {
  display: flex; align-items: center; gap: 2px;
  border-radius: 6px;
  padding: 0 2px;
}
.yyt-tde-sheet-item-wrap.active { background: var(--tde-accent-soft); }
.yyt-tde-sheet-item-wrap .yyt-tde-sheet-item {
  flex: 1; padding: 6px 8px;
}
.yyt-tde-sheet-actions {
  display: none; gap: 1px; flex-shrink: 0;
}
.yyt-tde-sheet-item-wrap:hover .yyt-tde-sheet-actions,
.yyt-tde-sheet-item-wrap.active .yyt-tde-sheet-actions { display: flex; }
.yyt-tde-sheet-idx {
  font-size: 10px; color: var(--tde-text-muted);
  margin-right: 4px; font-weight: 700;
}
.yyt-tde-btn-icon[disabled] { opacity: 0.3; cursor: not-allowed; }

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

/* v1.0.194 Task G1: schema mode 可编辑控件 */
.yyt-tde-input {
  background: var(--tde-surface-3);
  border: 1px solid var(--tde-hairline);
  color: var(--tde-text);
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  width: 100%;
  font-family: inherit;
}
.yyt-tde-input:focus { outline: 1px solid var(--tde-accent, #4a9eff); }
textarea.yyt-tde-input { min-height: 40px; resize: vertical; }
.yyt-tde-schema-sd textarea.yyt-tde-input { min-height: 60px; }
.yyt-tde-uc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px 14px;
  padding: 8px 0;
}
.yyt-tde-uc-cell { display: flex; flex-direction: column; gap: 4px; }
.yyt-tde-uc-cell-wide { grid-column: span 2; }
.yyt-tde-uc-cell label { font-size: 11px; font-weight: 600; color: var(--tde-text-secondary); }
.yyt-tde-uc-cell .yyt-tde-hint { font-size: 10px; color: var(--tde-text-muted); }
.yyt-tde-schema-field {
  flex-direction: column;
  gap: 6px;
  align-items: stretch;
  padding: 10px 12px;
  background: var(--tde-surface-2);
  border-radius: 6px;
  margin-bottom: 6px;
}
.yyt-tde-schema-field-head {
  display: flex; align-items: center; gap: 8px;
}
.yyt-tde-schema-idx { font-size: 11px; color: var(--tde-accent); font-weight: 700; min-width: 24px; }
.yyt-tde-input-title { flex: 2; }
.yyt-tde-input-key { flex: 1; font-family: monospace; }
.yyt-tde-input-type { flex: 0 0 90px; }
.yyt-tde-input-desc { width: 100%; min-height: 32px; font-size: 11px; }
.yyt-tde-btn-icon {
  background: transparent; border: none; color: var(--tde-text-muted);
  cursor: pointer; padding: 4px 6px; border-radius: 4px;
  font-size: 12px;
}
.yyt-tde-btn-icon:hover { background: var(--tde-surface-3); color: var(--tde-text); }
.yyt-tde-btn-danger:hover { color: #ff6b6b; }
.yyt-tde-btn-add-field {
  margin-top: 8px;
  background: transparent;
  border: 1px dashed var(--tde-hairline);
  color: var(--tde-text-muted);
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}
.yyt-tde-btn-add-field:hover { border-color: var(--tde-accent); color: var(--tde-accent); }

/* global mode: exportConfig 卡片 */
.yyt-tde-global-card {
  background: var(--tde-surface-2);
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 12px 14px;
  border: 1px solid var(--tde-hairline);
}
.yyt-tde-global-card-head {
  display: flex; align-items: center; justify-content: space-between;
  padding-bottom: 8px; border-bottom: 1px solid var(--tde-hairline);
  margin-bottom: 8px;
}
.yyt-tde-global-card-name { font-weight: 700; color: var(--tde-text); }
.yyt-tde-toggle-inline {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--tde-text-muted); cursor: pointer;
}
.yyt-tde-disabled-section { opacity: 0.5; pointer-events: none; }
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
    // v1.0.199 诊断：暴露 snapshot 关键字段，定位「保存了但 reload 读不到」根因
    getLog().info('loadEditorData snapshot', {
      hasSnapshot: !!snapshot,
      messageId: snapshot?.message?.message_id ?? snapshot?.sourceMessageId,
      chatId: snapshot?.chatId,
      isolationKey: snapshot?.tableState?.meta?.isolationKey,
      hasTableState: !!snapshot?.tableState,
      tableStateTablesLen: Array.isArray(snapshot?.tableState?.tables) ? snapshot.tableState.tables.length : null,
      firstTableNameInSlot: snapshot?.tableState?.tables?.[0]?.name
    });
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
  _state._pendingMirrorTag = null;

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
        <button class="yyt-tde-btn" data-action="save" ${_state.isDirty ? '' : 'disabled'} title="保存到当前消息的 slot"><i class="fa-solid fa-floppy-disk"></i> 保存到 chat</button>
        <button class="yyt-tde-btn" data-action="save-global" title="保存到全局激活模板（影响所有 chat 后续填表）"><i class="fa-solid fa-globe"></i> 保存到全局</button>
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
    // v1.0.194 Task M3: 加上移/下移/删除按钮
    return `
      <div class="yyt-tde-sheet-item-wrap ${i === _state.currentTableIndex ? 'active' : ''}">
        <button class="yyt-tde-sheet-item" data-sheet-index="${i}">
          <span class="yyt-tde-sheet-idx">[${i}]</span>
          <span class="yyt-tde-sheet-name">${esc(name)}</span>
          <span class="yyt-tde-sheet-count">${rowCount}</span>
        </button>
        <div class="yyt-tde-sheet-actions">
          <button class="yyt-tde-btn-icon" data-action="sheet-move-up" data-sheet-index="${i}" title="上移" ${i === 0 ? 'disabled' : ''}><i class="fa-solid fa-arrow-up"></i></button>
          <button class="yyt-tde-btn-icon" data-action="sheet-move-down" data-sheet-index="${i}" title="下移" ${i === tables.length - 1 ? 'disabled' : ''}><i class="fa-solid fa-arrow-down"></i></button>
          <button class="yyt-tde-btn-icon yyt-tde-btn-danger" data-action="sheet-delete" data-sheet-index="${i}" title="删除此表"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <nav class="yyt-tde-sidebar">
      <div class="yyt-tde-sidebar-label">表格列表 (${tables.length})</div>
      <div class="yyt-tde-sheet-list">
        ${items || `<div style="padding: 8px 10px; font-size: 11px; color: var(--tde-text-muted);">暂无表</div>`}
      </div>
      <button class="yyt-tde-btn-add-field" data-action="sheet-add" style="margin: 10px;"><i class="fa-solid fa-plus"></i> 添加新表</button>
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
  const sd = table?.sourceData || {};
  const ai = table?.aiInstructions || {};
  const uc = table?.updateConfig || {};
  // v1.0.194 Task G1: 字段定义可编辑 + sourceData 5 段 + updateConfig 7 参数
  const fieldRows = columns.map((col, ci) => `
    <div class="yyt-tde-schema-row yyt-tde-schema-field" data-field-index="${ci}">
      <div class="yyt-tde-schema-field-head">
        <span class="yyt-tde-schema-idx">[${ci}]</span>
        <input class="yyt-tde-input yyt-tde-input-title" data-action="field-title" data-field-index="${ci}" value="${esc(col?.title || col?.key || '')}" placeholder="字段标题" />
        <input class="yyt-tde-input yyt-tde-input-key" data-action="field-key" data-field-index="${ci}" value="${esc(col?.key || '')}" placeholder="key" />
        <select class="yyt-tde-input yyt-tde-input-type" data-action="field-type" data-field-index="${ci}">
          ${['text','number','boolean','date','json'].map(t => `<option value="${t}" ${col?.type === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
        <button class="yyt-tde-btn-icon yyt-tde-btn-danger" data-action="field-delete" data-field-index="${ci}" title="删除此字段"><i class="fa-solid fa-trash"></i></button>
      </div>
      <textarea class="yyt-tde-input yyt-tde-input-desc" data-action="field-desc" data-field-index="${ci}" placeholder="字段描述">${esc(col?.description || '')}</textarea>
    </div>
  `).join('');

  return `
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">基础信息</div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">表名</div>
        <div class="yyt-tde-schema-value">
          <input class="yyt-tde-input" data-action="table-name" value="${esc(table?.name || '')}" />
        </div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">UID</div>
        <div class="yyt-tde-schema-value"><code style="font-size:11px;color:var(--tde-accent);">${esc(table?.uid || table?.id || '')}</code></div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">表说明</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="table-note" placeholder="表用途说明 + 列注释">${esc(table?.note || sd?.note || '')}</textarea>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">AI 操作说明 (sourceData)</div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">初始化 (init)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-init" placeholder="表为空时 AI 应该插入什么">${esc(ai?.init || sd?.initNode || '')}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">新增 (insert)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-create" placeholder="什么情况下 AI 应该新增行">${esc(ai?.create || sd?.insertNode || '')}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">更新 (update)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-update" placeholder="什么情况下 AI 应该更新行">${esc(ai?.update || sd?.updateNode || '')}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">删除 (delete)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-delete" placeholder="什么情况下 AI 应该删除行">${esc(ai?.delete || sd?.deleteNode || '')}</textarea>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">更新配置 (updateConfig)</div>
      <div class="yyt-tde-hint" style="margin-bottom:8px;font-size:11px;color:var(--tde-text-muted);">
        <strong>说明</strong>：这里配置 AI 填表时这张表的行为（频率、上下文深度、token 节省）。
        跟「世界书注入」是两件事：世界书是把表数据塞进 prompt 给主 AI 看（合并条目 / 独立条目在<strong>全局注入</strong> tab 配），
        这里是控制<strong>填表时机</strong>（多久填一次、跳过几层等）。-1 = 沿用全局，0 = 禁用单表。
      </div>
      <div class="yyt-tde-uc-grid">
        <div class="yyt-tde-uc-cell">
          <label>上下文深度 (contextDepth)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-contextDepth" value="${Number.isFinite(uc?.contextDepth) ? uc.contextDepth : -1}" min="-1" />
          <span class="yyt-tde-hint">-1 = 沿用全局，0 = 禁用，N = 最近 N 条消息</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>更新频率 (updateFrequency)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-updateFrequency" value="${Number.isFinite(uc?.updateFrequency) ? uc.updateFrequency : -1}" min="-1" />
          <span class="yyt-tde-hint">-1 = 沿用全局，0 = 禁用自动填表，N = 每 N 条消息触发一次</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>批次大小 (batchSize)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-batchSize" value="${Number.isFinite(uc?.batchSize) ? uc.batchSize : -1}" min="-1" />
          <span class="yyt-tde-hint">-1 = 沿用全局，N = 单次最多处理 N 张表</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>跳过楼层 (skipFloors)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-skipFloors" value="${Number.isFinite(uc?.skipFloors) ? uc.skipFloors : -1}" min="-1" />
          <span class="yyt-tde-hint">-1 = 沿用全局，N = 跳过最近 N 层</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>发送最新 N 行 (sendLatestRows)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-sendLatestRows" value="${Number.isFinite(uc?.sendLatestRows) ? uc.sendLatestRows : -1}" min="-1" />
          <span class="yyt-tde-hint">-1 = 全部发送，0 = 沿用全局，N = 仅发送最新 N 行（大表 token 节省）</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>分组 ID (groupId)</label>
          <input class="yyt-tde-input" data-action="uc-groupId" value="${esc(uc?.groupId || '')}" placeholder="同组 ID 的表会合并触发" />
          <span class="yyt-tde-hint">同组同时触发，跨组并行（留空 = 独立触发）</span>
        </div>
        <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
          <label>表级 API 预设覆盖</label>
          <input class="yyt-tde-input" data-action="uc-apiPreset" value="${esc(uc?.apiPreset || '')}" placeholder="留空 = 沿用全局，填预设名 = 这张表用这个" />
          <span class="yyt-tde-hint">例：角色表用 Claude、纪要表用 GPT</span>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">字段定义 (${columns.length})</div>
      ${fieldRows || '<div style="color:var(--tde-text-muted);font-size:12px;padding:8px 0;">无字段</div>'}
      <button class="yyt-tde-btn yyt-tde-btn-add-field" data-action="field-add"><i class="fa-solid fa-plus"></i> 添加字段</button>
    </div>
  `;
}

function renderGlobalMode() {
  // v1.0.194 Task G1 + L2：全局注入 / exportConfig 配置 UI
  // 每张表独立的 exportConfig + 4 个 placement 配置
  const tables = Array.isArray(_state.tempData) ? _state.tempData : [];
  if (tables.length === 0) {
    return `<div class="yyt-tde-empty">无表格可配置。请先添加表格。</div>`;
  }

  let mirrorTag = 'yyt-table-workbench';
  try {
    const wbConfig = getTableWorkbenchConfig();
    mirrorTag = wbConfig?.mirrorTag || mirrorTag;
  } catch (_) {}

  const cards = tables.map((table, ti) => {
    const ec = table?.exportConfig || {};
    const ep = ec.entryPlacement || {};
    const exIndexP = ec.extraIndexPlacement || {};
    return `
      <div class="yyt-tde-global-card" data-table-index="${ti}">
        <div class="yyt-tde-global-card-head">
          <span class="yyt-tde-global-card-name">${esc(table?.name || `表 ${ti + 1}`)}</span>
          <label class="yyt-tde-toggle-inline">
            <input type="checkbox" data-action="ec-enabled" data-table-index="${ti}" ${ec.enabled === true ? 'checked' : ''} />
            <span>启用独立注入</span>
          </label>
        </div>
        <div class="yyt-tde-global-card-body ${ec.enabled === true ? '' : 'yyt-tde-disabled-section'}">
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>条目名 (entryName)</label>
              <input class="yyt-tde-input" data-action="ec-entryName" data-table-index="${ti}" value="${esc(ec.entryName || table?.name || '')}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>条目类型 (entryType)</label>
              <select class="yyt-tde-input" data-action="ec-entryType" data-table-index="${ti}">
                <option value="constant" ${ec.entryType === 'constant' ? 'selected' : ''}>constant (常驻)</option>
                <option value="keyword" ${ec.entryType === 'keyword' ? 'selected' : ''}>keyword (关键词触发)</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>触发关键词 (keywords)</label>
              <input class="yyt-tde-input" data-action="ec-keywords" data-table-index="${ti}" value="${esc(ec.keywords || '')}" placeholder="用逗号或换行分隔" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>按行拆分 (splitByRow)</label>
              <select class="yyt-tde-input" data-action="ec-splitByRow" data-table-index="${ti}">
                <option value="false" ${!ec.splitByRow ? 'selected' : ''}>否（整张表一个条目）</option>
                <option value="true" ${ec.splitByRow ? 'selected' : ''}>是（每行一个条目）</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>防递归 (preventRecursion)</label>
              <select class="yyt-tde-input" data-action="ec-preventRecursion" data-table-index="${ti}">
                <option value="true" ${ec.preventRecursion !== false ? 'selected' : ''}>是</option>
                <option value="false" ${ec.preventRecursion === false ? 'selected' : ''}>否</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>注入模板 (injectionTemplate)</label>
              <textarea class="yyt-tde-input" data-action="ec-injectionTemplate" data-table-index="${ti}" placeholder="例：以下是 {{tableName}} 的最新数据：{{tableContent}}">${esc(ec.injectionTemplate || '')}</textarea>
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">条目位置 (entryPlacement)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-ep-position" data-table-index="${ti}">
                ${['before_character_definition','after_character_definition','before_authors_note','after_authors_note'].map(p => `<option value="${p}" ${(ep.position || 'before_character_definition') === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-depth" data-table-index="${ti}" value="${Number.isFinite(ep.depth) ? ep.depth : 2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-order" data-table-index="${ti}" value="${Number.isFinite(ep.order) ? ep.order : 0}" />
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">额外索引位置 (extraIndexPlacement，可选)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-exi-position" data-table-index="${ti}">
                ${['before_character_definition','after_character_definition','before_authors_note','after_authors_note'].map(p => `<option value="${p}" ${(exIndexP.position || 'before_character_definition') === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-depth" data-table-index="${ti}" value="${Number.isFinite(exIndexP.depth) ? exIndexP.depth : 2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-order" data-table-index="${ti}" value="${Number.isFinite(exIndexP.order) ? exIndexP.order : 0}" />
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="yyt-tde-schema-hint" style="background:rgba(74,158,255,0.08);border-color:rgba(74,158,255,0.3);">
      <strong>全局注入配置</strong> — 每张表的 exportConfig（独立世界书条目）+ placement（注入位置/深度/顺序）。
      未启用「独立注入」的表会走全局 wrapper（工作台「同步到世界书」开关）。
    </div>
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">写回正文标签</div>
      <div class="yyt-tde-uc-grid">
        <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
          <label>mirrorTag</label>
          <input class="yyt-tde-input" data-action="mirror-tag" value="${esc(mirrorTag)}" placeholder="默认: yyt-table-workbench" />
          <span class="yyt-tde-hint">开启写回正文时，用此 XML 标签包裹表格数据注入到 assistant 消息</span>
        </div>
      </div>
    </div>
    ${cards}
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

  // v1.0.194 Task G1：schema mode 编辑处理
  // 帮手：当前表
  const getCurrentTable = () => {
    const tables = Array.isArray(_state.tempData) ? _state.tempData : [];
    return tables[_state.currentTableIndex] || null;
  };

  // 表名
  $window.on('input.tde', '[data-action="table-name"]', function () {
    const t = getCurrentTable(); if (!t) return;
    t.name = $(this).val();
    markDirty();
  });
  // 表说明
  $window.on('input.tde', '[data-action="table-note"]', function () {
    const t = getCurrentTable(); if (!t) return;
    t.note = $(this).val();
    markDirty();
  });
  // sourceData 4 段 (aiInstructions)
  const sdMap = { 'sd-init': 'init', 'sd-create': 'create', 'sd-update': 'update', 'sd-delete': 'delete' };
  Object.entries(sdMap).forEach(([action, key]) => {
    $window.on('input.tde', `[data-action="${action}"]`, function () {
      const t = getCurrentTable(); if (!t) return;
      t.aiInstructions = t.aiInstructions || {};
      t.aiInstructions[key] = $(this).val();
      markDirty();
    });
  });
  // updateConfig 7 参数
  const ucNumKeys = ['contextDepth', 'updateFrequency', 'batchSize', 'skipFloors', 'sendLatestRows'];
  ucNumKeys.forEach((k) => {
    $window.on('input.tde', `[data-action="uc-${k}"]`, function () {
      const t = getCurrentTable(); if (!t) return;
      t.updateConfig = t.updateConfig || {};
      const v = Number($(this).val());
      t.updateConfig[k] = Number.isFinite(v) ? v : -1;
      markDirty();
    });
  });
  $window.on('input.tde', '[data-action="uc-groupId"]', function () {
    const t = getCurrentTable(); if (!t) return;
    t.updateConfig = t.updateConfig || {};
    t.updateConfig.groupId = $(this).val();
    markDirty();
  });
  $window.on('input.tde', '[data-action="uc-apiPreset"]', function () {
    const t = getCurrentTable(); if (!t) return;
    t.updateConfig = t.updateConfig || {};
    t.updateConfig.apiPreset = $(this).val();
    markDirty();
  });
  // 字段编辑：title / key / type / desc / 删除 / 新增
  $window.on('input.tde', '[data-action="field-title"]', function () {
    const t = getCurrentTable(); if (!t) return;
    const fi = Number($(this).attr('data-field-index'));
    if (!Array.isArray(t.columns) || !t.columns[fi]) return;
    t.columns[fi].title = $(this).val();
    markDirty();
  });
  $window.on('input.tde', '[data-action="field-key"]', function () {
    const t = getCurrentTable(); if (!t) return;
    const fi = Number($(this).attr('data-field-index'));
    if (!Array.isArray(t.columns) || !t.columns[fi]) return;
    t.columns[fi].key = $(this).val();
    markDirty();
  });
  $window.on('change.tde', '[data-action="field-type"]', function () {
    const t = getCurrentTable(); if (!t) return;
    const fi = Number($(this).attr('data-field-index'));
    if (!Array.isArray(t.columns) || !t.columns[fi]) return;
    t.columns[fi].type = $(this).val();
    markDirty();
  });
  $window.on('input.tde', '[data-action="field-desc"]', function () {
    const t = getCurrentTable(); if (!t) return;
    const fi = Number($(this).attr('data-field-index'));
    if (!Array.isArray(t.columns) || !t.columns[fi]) return;
    t.columns[fi].description = $(this).val();
    markDirty();
  });
  $window.on('click.tde', '[data-action="field-delete"]', function () {
    const t = getCurrentTable(); if (!t) return;
    const fi = Number($(this).attr('data-field-index'));
    if (!Array.isArray(t.columns) || !t.columns[fi]) return;
    if (!window.confirm(`删除字段「${t.columns[fi].title || t.columns[fi].key}」？此操作不会自动清理行数据。`)) return;
    t.columns.splice(fi, 1);
    markDirty();
    refresh();
  });
  $window.on('click.tde', '[data-action="field-add"]', function () {
    const t = getCurrentTable(); if (!t) return;
    t.columns = Array.isArray(t.columns) ? t.columns : [];
    const usedKeys = new Set(t.columns.map((c) => c?.key).filter(Boolean));
    let n = t.columns.length + 1;
    while (usedKeys.has(`col_${n}`)) n++;
    t.columns.push({ key: `col_${n}`, title: `字段${n}`, description: '', type: 'text', required: false });
    markDirty();
    refresh();
  });

  // global mode：mirrorTag（写回正文标签）
  $window.on('input.tde', '[data-action="mirror-tag"]', function () {
    _state._pendingMirrorTag = $(this).val();
    markDirty();
  });

  // global mode：exportConfig 编辑
  const setEc = (ti, key, val) => {
    const t = _state.tempData?.[ti]; if (!t) return;
    t.exportConfig = t.exportConfig || {};
    t.exportConfig[key] = val;
    markDirty();
  };
  const setEcPlacement = (ti, key, subkey, val) => {
    const t = _state.tempData?.[ti]; if (!t) return;
    t.exportConfig = t.exportConfig || {};
    t.exportConfig[key] = t.exportConfig[key] || {};
    t.exportConfig[key][subkey] = val;
    markDirty();
  };
  $window.on('change.tde', '[data-action="ec-enabled"]', function () {
    setEc(Number($(this).attr('data-table-index')), 'enabled', $(this).is(':checked'));
    refresh();
  });
  $window.on('input.tde', '[data-action="ec-entryName"]', function () {
    setEc(Number($(this).attr('data-table-index')), 'entryName', $(this).val());
  });
  $window.on('change.tde', '[data-action="ec-entryType"]', function () {
    setEc(Number($(this).attr('data-table-index')), 'entryType', $(this).val());
  });
  $window.on('input.tde', '[data-action="ec-keywords"]', function () {
    setEc(Number($(this).attr('data-table-index')), 'keywords', $(this).val());
  });
  $window.on('change.tde', '[data-action="ec-splitByRow"]', function () {
    setEc(Number($(this).attr('data-table-index')), 'splitByRow', $(this).val() === 'true');
  });
  $window.on('change.tde', '[data-action="ec-preventRecursion"]', function () {
    setEc(Number($(this).attr('data-table-index')), 'preventRecursion', $(this).val() !== 'false');
  });
  $window.on('input.tde', '[data-action="ec-injectionTemplate"]', function () {
    setEc(Number($(this).attr('data-table-index')), 'injectionTemplate', $(this).val());
  });
  // placement
  $window.on('change.tde', '[data-action="ec-ep-position"]', function () { setEcPlacement(Number($(this).attr('data-table-index')), 'entryPlacement', 'position', $(this).val()); });
  $window.on('input.tde', '[data-action="ec-ep-depth"]', function () { setEcPlacement(Number($(this).attr('data-table-index')), 'entryPlacement', 'depth', Number($(this).val()) || 0); });
  $window.on('input.tde', '[data-action="ec-ep-order"]', function () { setEcPlacement(Number($(this).attr('data-table-index')), 'entryPlacement', 'order', Number($(this).val()) || 0); });
  $window.on('change.tde', '[data-action="ec-exi-position"]', function () { setEcPlacement(Number($(this).attr('data-table-index')), 'extraIndexPlacement', 'position', $(this).val()); });
  $window.on('input.tde', '[data-action="ec-exi-depth"]', function () { setEcPlacement(Number($(this).attr('data-table-index')), 'extraIndexPlacement', 'depth', Number($(this).val()) || 0); });
  $window.on('input.tde', '[data-action="ec-exi-order"]', function () { setEcPlacement(Number($(this).attr('data-table-index')), 'extraIndexPlacement', 'order', Number($(this).val()) || 0); });

  // v1.0.194 Task M3：sidebar 表顺序操作
  $window.on('click.tde', '[data-action="sheet-move-up"]', function (e) {
    e.stopPropagation();
    const i = Number($(this).attr('data-sheet-index'));
    if (!Array.isArray(_state.tempData) || i <= 0) return;
    const arr = _state.tempData;
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    if (_state.currentTableIndex === i) _state.currentTableIndex = i - 1;
    else if (_state.currentTableIndex === i - 1) _state.currentTableIndex = i;
    markDirty();
    refresh();
  });
  $window.on('click.tde', '[data-action="sheet-move-down"]', function (e) {
    e.stopPropagation();
    const i = Number($(this).attr('data-sheet-index'));
    if (!Array.isArray(_state.tempData) || i >= _state.tempData.length - 1) return;
    const arr = _state.tempData;
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    if (_state.currentTableIndex === i) _state.currentTableIndex = i + 1;
    else if (_state.currentTableIndex === i + 1) _state.currentTableIndex = i;
    markDirty();
    refresh();
  });
  $window.on('click.tde', '[data-action="sheet-delete"]', function (e) {
    e.stopPropagation();
    const i = Number($(this).attr('data-sheet-index'));
    if (!Array.isArray(_state.tempData) || !_state.tempData[i]) return;
    const t = _state.tempData[i];
    if (!window.confirm(`删除表「${t.name || `表 ${i + 1}`}」？此操作不可撤销。`)) return;
    _state.tempData.splice(i, 1);
    if (_state.currentTableIndex >= _state.tempData.length) {
      _state.currentTableIndex = Math.max(0, _state.tempData.length - 1);
    }
    markDirty();
    refresh();
  });
  $window.on('click.tde', '[data-action="sheet-add"]', function () {
    const name = window.prompt('新表名：', `表 ${(_state.tempData?.length || 0) + 1}`);
    if (!name || !name.trim()) return;
    _state.tempData = Array.isArray(_state.tempData) ? _state.tempData : [];
    const usedIds = new Set(_state.tempData.map((t) => t?.id).filter(Boolean));
    let suffix = _state.tempData.length + 1;
    let newId = `sheet_${Date.now().toString(36)}_${suffix}`;
    while (usedIds.has(newId)) { suffix++; newId = `sheet_${Date.now().toString(36)}_${suffix}`; }
    _state.tempData.push({
      id: newId,
      name: name.trim(),
      enabled: true,
      note: '',
      aiInstructions: { init: '', create: '', update: '', delete: '' },
      updateConfig: {},
      exportConfig: { enabled: false },
      columns: [{ key: 'col_1', title: '字段1', description: '', type: 'text', required: false }],
      rows: []
    });
    _state.currentTableIndex = _state.tempData.length - 1;
    markDirty();
    refresh();
  });

  // 重新加载
  $window.on('click.tde', '[data-action="reload"]', () => {
    if (_state.isDirty && !window.confirm('有未保存修改，重新加载将丢弃，确定？')) return;
    // v1.0.198 诊断：记录 reload 前后 schema 变化，便于定位「reload 后回到原始」根因
    const beforeFirst = _state.tempData?.[0];
    getLog().info('reload 触发', {
      before: {
        tableCount: _state.tempData?.length,
        firstName: beforeFirst?.name,
        firstAiInit: beforeFirst?.aiInstructions?.init?.slice(0, 50),
        firstUcFreq: beforeFirst?.updateConfig?.updateFrequency
      },
      targetSnapshot: { messageId: _state.targetSnapshot?.sourceMessageId, isFromTemplate: _state.isFromTemplate }
    });
    loadEditorData();
    const afterFirst = _state.tempData?.[0];
    getLog().info('reload 完成', {
      after: {
        tableCount: _state.tempData?.length,
        firstName: afterFirst?.name,
        firstAiInit: afterFirst?.aiInstructions?.init?.slice(0, 50),
        firstUcFreq: afterFirst?.updateConfig?.updateFrequency,
        isFromTemplate: _state.isFromTemplate
      }
    });
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
      // v1.0.199 诊断：commit 后看返回的 messageId / state.tables 是否真写进去
      getLog().info('save-chat commitBoundState 结果', {
        success: result?.success,
        error: result?.error,
        commitMessageId: result?.sourceMessageId,
        commitSlotRevisionKey: result?.slotRevisionKey,
        stateTablesLen: Array.isArray(result?.state?.tables) ? result.state.tables.length : null,
        firstTableInState: result?.state?.tables?.[0]?.name,
        firstAiInitInState: result?.state?.tables?.[0]?.aiInstructions?.init?.slice(0, 50)
      });
      if (result?.success) {
        clearDirty();
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
        // v1.0.199 修复：保存成功后立刻把 commit 返回的 state.tables 同步回 tempData，
        // 同时关闭 isFromTemplate 标志，让用户立即看到「保存生效」反馈
        // （不再依赖 reload 路径 — 后者用 getAssistantTableSnapshot 找消息，
        // 跟 commitBoundState 写入的 message 可能不一致）
        if (Array.isArray(result?.state?.tables)) {
          _state.tempData = cloneTableValue(result.state.tables) || [];
          _state.isFromTemplate = false;
        }
        showToast('success', '已保存到 chat');
        refresh();
      } else {
        showToast('error', `保存失败：${result?.error || '未知'}`);
      }
    } catch (err) {
      getLog().error('保存异常', err);
      showToast('error', `保存异常：${err?.message || err}`);
    }
  });

  // v1.0.194 Task L1：保存到全局激活模板
  // v1.0.198 修复：不依赖 _state.isDirty（之前 save-chat 后 isDirty=false，
  // 用户再点 save-global 会直接 return「没有修改」，无法把 chat 状态同步到全局）
  $window.on('click.tde', '[data-action="save-global"]', async () => {
    if (!Array.isArray(_state.tempData) || _state.tempData.length === 0) {
      showToast('info', '没有可保存的数据');
      return;
    }
    if (!window.confirm('保存到「全局激活模板」会影响后续所有 chat 的新填表（已有 slot 数据不受影响）。继续？')) return;
    try {
      const activeTpl = getActiveGlobalTemplate();
      if (!activeTpl?.id) {
        showToast('error', '没有可用的全局激活模板');
        return;
      }
      // 仅写回 schema 部分（columns / sourceData / updateConfig / exportConfig / aiInstructions / note / name / enabled），不写 rows
      const tablesSchemaOnly = (_state.tempData || []).map((t) => ({
        id: t?.id || t?.uid,
        name: t?.name || '',
        note: t?.note || '',
        enabled: t?.enabled !== false,
        aiInstructions: t?.aiInstructions || {},
        updateConfig: t?.updateConfig || {},
        exportConfig: t?.exportConfig || {},
        columns: Array.isArray(t?.columns) ? cloneTableValue(t.columns) : [],
        rows: [] // 全局模板不带具体行数据，rows 留空（slot 维度才有数据）
      }));
      const result = saveTableTemplate({
        ...activeTpl,
        tables: tablesSchemaOnly
      });
      if (result?.success) {
        // v1.0.197 #2：同步 persist mirrorTag 到 workbench config
        if (typeof _state._pendingMirrorTag === 'string' && _state._pendingMirrorTag.trim()) {
          try {
            const wbConfig = getTableWorkbenchConfig();
            saveTableWorkbenchConfig({ ...wbConfig, mirrorTag: _state._pendingMirrorTag.trim() });
          } catch (e) {
            getLog().warn('保存 mirrorTag 到 workbench config 失败', e);
          }
        }
        _state._pendingMirrorTag = null;
        clearDirty();
        showToast('success', `已保存到全局模板「${activeTpl.name}」`);
        getLog().info('保存到全局模板成功', { templateId: activeTpl.id, name: activeTpl.name, tableCount: tablesSchemaOnly.length });
        refresh();
      } else {
        showToast('error', `保存失败：${result?.error || '未知'}`);
      }
    } catch (err) {
      getLog().error('保存到全局模板异常', err);
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
    markDirty();
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
    markDirty();
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
    markDirty();
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
    markDirty();
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
