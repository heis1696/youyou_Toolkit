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
 *
 * v1.0.206 重构：所有可标准化的控件改走 controls/ 预制体（button/textInput/selectInput/toggle）。
 *   渲染范式从「HTML 模板字符串 → innerHTML」改为「控件树 → appendChild」。
 *   事件从 jQuery delegation 改为控件 onClick/onChange/onInput。
 */

import { createWindow, closeWindow, windowManager } from '../../window-manager.js';
import { getTargetDocument } from '../../ui/utils.js';
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
import { getSheetLockState, setColLock, setRowLock, setCellLock } from '../../table-engine/table-lock-service.js';

import { button, textInput, selectInput, toggle, el } from './controls/index.js';
import { initAssistantPanel, getAssistantPanelStyles } from './table-assistant-ui.js';

const WINDOW_ID = 'yyt-table-data-editor';

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableDataEditor');
  return _log;
}

// 模块级状态（单 instance 窗口）
const _state = {
  $window: null,
  mode: 'data',
  tempData: null,          // 深拷贝的 tables（runtime 格式 [{uid, name, columns, rows}]）
  currentTableIndex: -1,
  isDirty: false,
  isFromTemplate: false,
  _pendingMirrorTag: null,
  _pendingWrapperConfig: null,
  targetSnapshot: null,
  _afterSaveGlobalAt: 0,
  _assistantOpen: false,
  // 标记 toolbar 上需要 markDirty/clearDirty 操作的控件引用
  _refs: { saveBtn: null, saveGlobalBtn: null, dirtyBadge: null }
};

function getState() { return _state; }

// v1.0.206：直接 setDisabled 控件，不再用 jQuery DOM 操作
function markDirty() {
  _state.isDirty = true;
  try {
    _state._refs.saveBtn?.setDisabled(false);
    if (_state._refs.dirtyBadge) _state._refs.dirtyBadge.style.display = 'inline-flex';
  } catch (_) { /* ignore */ }
}

function clearDirty() {
  _state.isDirty = false;
  try {
    _state._refs.saveBtn?.setDisabled(true);
    if (_state._refs.dirtyBadge) _state._refs.dirtyBadge.style.display = 'none';
  } catch (_) { /* ignore */ }
}

function getCurrentTable() {
  const tables = Array.isArray(_state.tempData) ? _state.tempData : [];
  const ti = _state.currentTableIndex;
  return (ti >= 0 && ti < tables.length) ? tables[ti] : null;
}

// ════════════════════════════════════════════════════════════════
// CSS — 仅保留布局相关样式，控件样式删除（走预制体的 yyt-btn / yyt-input 等通用样式）
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
  gap: 12px;
}
.yyt-tde-toolbar-left { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.yyt-tde-mode-switch {
  display: inline-flex; gap: 4px;
}
.yyt-tde-dirty-badge {
  display: none;
  align-items: center; gap: 6px;
  padding: 3px 9px; border-radius: 999px;
  font-size: 11px; font-weight: 700;
  color: var(--tde-warning); background: var(--tde-warning-soft);
  border: 1px solid rgba(251,191,36,0.2);
}
.yyt-tde-dirty-badge::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--tde-warning);
}
.yyt-tde-actions { display: flex; gap: 8px; flex-shrink: 0; }

/* content */
.yyt-tde-content { flex: 1; min-height: 0; display: flex; overflow: hidden; }

/* sidebar */
.yyt-tde-sidebar {
  flex: 0 0 240px;
  background: var(--tde-surface-1);
  border-right: 1px solid var(--tde-hairline);
  padding: 14px 10px 12px;
  display: flex; flex-direction: column; gap: 8px;
  overflow-y: auto;
}
.yyt-tde-sidebar-label {
  font-size: 10px; font-weight: 700; color: var(--tde-text-muted);
  text-transform: uppercase; letter-spacing: 0.5px;
  padding: 0 4px 4px;
}
.yyt-tde-sheet-list { display: flex; flex-direction: column; gap: 4px; }

.yyt-tde-sheet-row {
  display: flex; align-items: center; gap: 4px;
  padding: 4px;
  border-radius: 6px;
  border: 1px solid transparent;
}
.yyt-tde-sheet-row.active {
  background: var(--tde-accent-soft);
  border-color: rgba(123,183,255,0.18);
}
.yyt-tde-sheet-row .yyt-tde-sheet-pick {
  flex: 1; min-width: 0;
  display: flex; align-items: center; gap: 8px;
  cursor: pointer;
  padding: 4px 6px;
  color: var(--tde-text-secondary);
  font-size: 13px; font-weight: 600;
  border-radius: 4px;
}
.yyt-tde-sheet-row .yyt-tde-sheet-pick:hover { background: var(--tde-surface-2); color: var(--tde-text); }
.yyt-tde-sheet-row.active .yyt-tde-sheet-pick { color: var(--tde-accent-strong); }
.yyt-tde-sheet-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.yyt-tde-sheet-count {
  flex-shrink: 0; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  color: var(--tde-text-muted); background: rgba(255,255,255,0.04);
}
.yyt-tde-sheet-row.active .yyt-tde-sheet-count { color: var(--tde-accent); background: rgba(123,183,255,0.12); }
.yyt-tde-sheet-idx { font-size: 10px; color: var(--tde-text-muted); font-weight: 700; }
.yyt-tde-sheet-actions {
  display: none; gap: 2px; flex-shrink: 0;
}
.yyt-tde-sheet-row:hover .yyt-tde-sheet-actions,
.yyt-tde-sheet-row.active .yyt-tde-sheet-actions { display: inline-flex; }

/* main */
.yyt-tde-main {
  flex: 1; min-width: 0;
  overflow-y: auto;
  padding: 16px 18px;
  background: var(--tde-canvas);
}

/* assistant dock */
.yyt-assistant-dock {
  flex: 0 0 400px;
  display: none;
  flex-direction: column;
  border-left: 1px solid var(--tde-hairline-strong);
  background: var(--tde-surface-1);
  overflow: hidden;
}
.yyt-assistant-dock .yyt-assistant-panel {
  display: flex; flex-direction: column;
  height: 100%; border: none; border-radius: 0;
}
.yyt-assistant-dock .yyt-assistant-chat {
  flex: 1; min-height: 0; max-height: none;
}

/* card grid (data mode) */
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
.yyt-tde-card-name-slot { flex: 1; min-width: 0; }
.yyt-tde-card-actions { display: flex; gap: 4px; flex-shrink: 0; }
.yyt-tde-card-body { padding: 4px 12px 10px; display: flex; flex-direction: column; }
.yyt-tde-field {
  padding: 6px 0;
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-field:last-child { border-bottom: none; }
.yyt-tde-field-label {
  display: flex; align-items: center; justify-content: space-between; gap: 4px;
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
  min-height: 84px;
  display: flex; align-items: center; justify-content: center;
}
.yyt-tde-empty {
  padding: 24px;
  text-align: center;
  color: var(--tde-text-muted);
  font-size: 13px;
  border: 1px dashed var(--tde-hairline-strong);
  border-radius: 8px;
}

/* schema mode */
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
  align-items: center;
}
.yyt-tde-schema-row:first-child { border-top: none; }
.yyt-tde-schema-key { color: var(--tde-text-secondary); font-weight: 600; }
.yyt-tde-schema-value { color: var(--tde-text); word-break: break-word; }

.yyt-tde-schema-field {
  display: flex; flex-direction: column; gap: 6px;
  padding: 10px 12px;
  background: var(--tde-surface-2);
  border-radius: 6px;
  margin-bottom: 6px;
}
.yyt-tde-schema-field.locked {
  border-left: 2px solid var(--tde-warning);
  background: var(--tde-warning-soft);
}
.yyt-tde-schema-field-head {
  display: flex; align-items: center; gap: 8px;
}
.yyt-tde-schema-idx { font-size: 11px; color: var(--tde-accent); font-weight: 700; min-width: 24px; }
.yyt-tde-field-input-title { flex: 2; }
.yyt-tde-field-input-key { flex: 1; }
.yyt-tde-field-input-key input { font-family: monospace; }
.yyt-tde-field-input-type { flex: 0 0 110px; }

.yyt-tde-uc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px 14px;
  padding: 8px 0;
}
.yyt-tde-uc-cell { display: flex; flex-direction: column; gap: 4px; }
.yyt-tde-uc-cell-wide { grid-column: span 2; }
.yyt-tde-uc-cell label { font-size: 11px; font-weight: 600; color: var(--tde-text-secondary); }
.yyt-tde-uc-cell .yyt-tde-hint { font-size: 10px; color: var(--tde-text-muted); }
.yyt-tde-schema-hint {
  font-size: 11px;
  color: var(--tde-text-muted);
  padding: 10px 14px;
  background: var(--tde-surface-2);
  border-left: 3px solid var(--tde-accent);
  border-radius: 4px;
  margin-bottom: 12px;
}

/* data mode: 行/单元格锁视觉 */
.yyt-tde-row-locked {
  border-color: var(--tde-warning) !important;
  box-shadow: 0 0 0 1px rgba(251,191,36,0.2) inset;
}
.yyt-tde-cell-locked-bg {
  background: var(--tde-warning-soft);
  color: var(--tde-text-muted);
}

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
.yyt-tde-disabled-section { opacity: 0.5; pointer-events: none; }
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

  const afterSaveGlobalRecent = _state._afterSaveGlobalAt && (Date.now() - _state._afterSaveGlobalAt < 5 * 60 * 1000);

  try {
    const snapshot = getAssistantTableSnapshot(null);
    getLog().info('loadEditorData snapshot', {
      hasSnapshot: !!snapshot,
      messageId: snapshot?.message?.message_id ?? snapshot?.sourceMessageId,
      chatId: snapshot?.chatId,
      isolationKey: snapshot?.tableState?.meta?.isolationKey,
      hasTableState: !!snapshot?.tableState,
      tableStateTablesLen: Array.isArray(snapshot?.tableState?.tables) ? snapshot.tableState.tables.length : null,
      firstTableNameInSlot: snapshot?.tableState?.tables?.[0]?.name,
      afterSaveGlobalRecent
    });
    if (!afterSaveGlobalRecent && Array.isArray(snapshot?.tableState?.tables) && snapshot.tableState.tables.length > 0) {
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
  _state._pendingWrapperConfig = null;

  if (_state.currentTableIndex >= _state.tempData.length) {
    _state.currentTableIndex = _state.tempData.length > 0 ? 0 : -1;
  } else if (_state.currentTableIndex < 0 && _state.tempData.length > 0) {
    _state.currentTableIndex = 0;
  }
}

// ════════════════════════════════════════════════════════════════
// Build functions — 构造 DOM 节点（取代原 render* 字符串模板）
// ════════════════════════════════════════════════════════════════

function buildToolbar() {
  const root = el('div', { className: 'yyt-tde-toolbar' });

  // ── left: mode 切换 + dirty badge
  const left = el('div', { className: 'yyt-tde-toolbar-left' });
  const modeSwitch = el('div', { className: 'yyt-tde-mode-switch' });
  const modes = [
    { key: 'data', label: '数据编辑' },
    { key: 'schema', label: '结构配置' },
    { key: 'global', label: '全局注入' }
  ];
  for (const m of modes) {
    const btn = button({
      label: m.label,
      variant: _state.mode === m.key ? 'primary' : 'ghost',
      size: 'small',
      onClick: () => {
        if (_state.mode !== m.key) {
          _state.mode = m.key;
          refresh();
        }
      }
    });
    modeSwitch.appendChild(btn.el);
  }
  left.appendChild(modeSwitch);

  const dirtyBadge = el('span', { className: 'yyt-tde-dirty-badge', text: '未保存' });
  if (_state.isDirty) dirtyBadge.style.display = 'inline-flex';
  left.appendChild(dirtyBadge);
  _state._refs.dirtyBadge = dirtyBadge;

  // ── right: actions
  const right = el('div', { className: 'yyt-tde-actions' });

  const reloadBtn = button({
    label: '重新加载',
    icon: '↻',
    size: 'small',
    onClick: handleReload
  });

  const saveBtn = button({
    label: '保存到 chat',
    icon: '💾',
    size: 'small',
    disabled: !_state.isDirty,
    title: '保存到当前消息的 slot',
    onClick: handleSaveChat
  });
  _state._refs.saveBtn = saveBtn;

  const saveGlobalBtn = button({
    label: '保存到全局',
    icon: '🌐',
    size: 'small',
    title: '保存到全局激活模板（影响所有 chat 后续填表）',
    onClick: handleSaveGlobal
  });
  _state._refs.saveGlobalBtn = saveGlobalBtn;

  const runBtn = button({
    label: '立即填表',
    icon: '▶',
    variant: 'primary',
    size: 'small',
    onClick: handleRunNow
  });

  const assistantBtn = button({
    label: 'AI 改表助手',
    icon: '✦',
    size: 'small',
    variant: _state._assistantOpen ? 'primary' : 'ghost',
    title: '用自然语言修改表结构、AI 指令和配置',
    onClick: handleToggleAssistant
  });

  right.appendChild(reloadBtn.el);
  right.appendChild(saveBtn.el);
  right.appendChild(saveGlobalBtn.el);
  right.appendChild(runBtn.el);
  right.appendChild(assistantBtn.el);

  root.appendChild(left);
  root.appendChild(right);
  return root;
}

function buildSidebar() {
  const root = el('div', { className: 'yyt-tde-sidebar' });
  const tables = _state.tempData || [];
  root.appendChild(el('div', { className: 'yyt-tde-sidebar-label', text: `表格列表 (${tables.length})` }));

  const list = el('div', { className: 'yyt-tde-sheet-list' });

  if (tables.length === 0) {
    list.appendChild(el('div', {
      text: '暂无表',
      style: { padding: '8px 10px', fontSize: '11px', color: 'var(--tde-text-muted)' }
    }));
  } else {
    tables.forEach((t, i) => {
      const isActive = i === _state.currentTableIndex;
      const name = t?.name || `表 ${i + 1}`;
      const rowCount = Array.isArray(t?.rows) ? t.rows.length : 0;

      const row = el('div', { className: `yyt-tde-sheet-row${isActive ? ' active' : ''}` });

      const pick = el('div', { className: 'yyt-tde-sheet-pick' });
      pick.appendChild(el('span', { className: 'yyt-tde-sheet-idx', text: `[${i}]` }));
      pick.appendChild(el('span', { className: 'yyt-tde-sheet-name', text: name }));
      pick.appendChild(el('span', { className: 'yyt-tde-sheet-count', text: String(rowCount) }));
      pick.addEventListener('click', () => {
        if (_state.currentTableIndex !== i) {
          _state.currentTableIndex = i;
          refresh();
        }
      });
      row.appendChild(pick);

      const actions = el('div', { className: 'yyt-tde-sheet-actions' });
      actions.appendChild(button({
        label: '↑', size: 'small', variant: 'ghost',
        disabled: i === 0,
        title: '上移',
        onClick: () => handleSheetMove(i, -1)
      }).el);
      actions.appendChild(button({
        label: '↓', size: 'small', variant: 'ghost',
        disabled: i === tables.length - 1,
        title: '下移',
        onClick: () => handleSheetMove(i, 1)
      }).el);
      actions.appendChild(button({
        label: '×', size: 'small', variant: 'danger',
        title: '删除此表',
        onClick: () => handleSheetDelete(i)
      }).el);
      row.appendChild(actions);

      list.appendChild(row);
    });
  }
  root.appendChild(list);

  root.appendChild(button({
    label: '+ 添加新表',
    size: 'small',
    variant: 'ghost',
    onClick: handleSheetAdd
  }).el);

  return root;
}

function buildMainPane() {
  const root = el('main', { className: 'yyt-tde-main' });
  const tables = _state.tempData || [];

  if (_state.mode === 'global') {
    root.appendChild(buildGlobalMode());
    return root;
  }

  if (tables.length === 0) {
    root.appendChild(el('div', {
      className: 'yyt-tde-empty',
      html: '当前 slot 没有表数据，模板也未配置表。<br>请先在工作台点"立即填表"让 AI 初始化，或到「预设管理 → 表格模板」配置模板。'
    }));
    return root;
  }

  const table = getCurrentTable();
  if (!table) {
    root.appendChild(el('div', { className: 'yyt-tde-empty', text: '请从左侧选择一张表。' }));
    return root;
  }

  if (_state.mode === 'data') root.appendChild(buildDataMode(table));
  else if (_state.mode === 'schema') root.appendChild(buildSchemaMode(table));

  return root;
}

function buildDataMode(table) {
  const container = el('div');
  const columns = Array.isArray(table?.columns) ? table.columns : [];
  const rows = Array.isArray(table?.rows) ? table.rows : [];

  const chatId = _state.targetSnapshot?.chatId || '';
  const sheetUid = table?.uid || table?.id || '';
  let lockState = { cols: {}, rows: {}, cells: {}, indexCol: false };
  try {
    lockState = getSheetLockState({ chatId, isolationKey: tableIsolation.getKey() }, sheetUid) || lockState;
  } catch (_) { /* ignore */ }
  const rowLocks = lockState?.rows || {};
  const cellLocks = lockState?.cells || {};

  if (_state.isFromTemplate) {
    container.appendChild(el('div', {
      className: 'yyt-tde-schema-hint',
      html: '当前显示<b>模板默认结构</b>（slot 尚无数据）。直接添加行或编辑会创建 slot 数据；或工作台点"立即填表"让 AI 填。'
    }));
  }

  const grid = el('div', { className: 'yyt-tde-card-grid' });

  rows.forEach((row, ri) => {
    const cells = row?.cells || {};
    const rowLocked = !!rowLocks[ri];

    const card = el('article', { className: `yyt-tde-card${rowLocked ? ' yyt-tde-row-locked' : ''}` });

    // header
    const header = el('header', { className: 'yyt-tde-card-header' });
    header.appendChild(el('span', { className: 'yyt-tde-card-index', text: `#${ri + 1}` }));

    const nameSlot = el('div', { className: 'yyt-tde-card-name-slot' });
    const nameInput = textInput({
      value: row?.name || '',
      placeholder: '行名',
      disabled: rowLocked,
      onInput: (val) => {
        const t = getCurrentTable(); if (!t?.rows?.[ri]) return;
        t.rows[ri].name = val;
        markDirty();
      }
    });
    nameSlot.appendChild(nameInput.el);
    header.appendChild(nameSlot);

    const actions = el('div', { className: 'yyt-tde-card-actions' });
    actions.appendChild(button({
      label: rowLocked ? '🔒' : '🔓',
      size: 'small', variant: rowLocked ? 'danger' : 'ghost',
      title: rowLocked ? '已锁定此行（点击解锁）' : '锁定此行（AI 不会改）',
      onClick: () => handleRowLock(sheetUid, ri)
    }).el);
    actions.appendChild(button({
      label: '🗑', size: 'small', variant: 'danger',
      disabled: rowLocked,
      title: '删除行',
      onClick: () => handleDeleteRow(ri)
    }).el);
    header.appendChild(actions);
    card.appendChild(header);

    // body
    const body = el('div', { className: 'yyt-tde-card-body' });
    if (columns.length === 0) {
      body.appendChild(el('div', {
        text: '该表没有列定义',
        style: { padding: '8px', color: 'var(--tde-text-muted)', fontSize: '12px' }
      }));
    } else {
      columns.forEach((col) => {
        const key = col?.key || '';
        const title = col?.title || key;
        const value = cells[key];
        const isEmpty = value === undefined || value === null || value === '';
        const display = isEmpty ? '（空）' : String(value);
        const cellLocked = !!cellLocks[`${ri}::${key}`];

        const fieldRow = el('div', { className: `yyt-tde-field${cellLocked ? ' yyt-tde-cell-locked' : ''}` });
        const labelRow = el('div', { className: 'yyt-tde-field-label' });
        labelRow.appendChild(el('span', { text: title }));
        labelRow.appendChild(button({
          label: cellLocked ? '🔒' : '🔓',
          size: 'small', variant: cellLocked ? 'danger' : 'ghost',
          title: cellLocked ? '已锁定此单元格' : '锁定此单元格（AI 不会改）',
          onClick: () => handleCellLock(sheetUid, ri, key)
        }).el);
        fieldRow.appendChild(labelRow);

        const cellDiv = el('div', {
          className: `yyt-tde-field-cell${isEmpty ? ' yyt-tde-field-cell--empty' : ''}${cellLocked ? ' yyt-tde-cell-locked-bg' : ''}`,
          text: display,
          attrs: { contenteditable: cellLocked ? 'false' : 'true' }
        });
        cellDiv.addEventListener('input', () => {
          const t = getCurrentTable(); if (!t?.rows?.[ri]) return;
          if (!t.rows[ri].cells) t.rows[ri].cells = {};
          t.rows[ri].cells[key] = cellDiv.textContent;
          markDirty();
        });
        fieldRow.appendChild(cellDiv);

        body.appendChild(fieldRow);
      });
    }
    card.appendChild(body);
    grid.appendChild(card);
  });

  // add-row button
  const addRowWrap = el('div', { className: 'yyt-tde-card-add' });
  addRowWrap.appendChild(button({
    label: '+ 添加行',
    variant: 'ghost',
    onClick: handleAddRow
  }).el);
  grid.appendChild(addRowWrap);

  container.appendChild(grid);
  return container;
}

function buildSchemaMode(table) {
  const container = el('div');
  const columns = Array.isArray(table?.columns) ? table.columns : [];
  const sd = table?.sourceData || {};
  const ai = table?.aiInstructions || {};
  const uc = table?.updateConfig || {};

  const chatId = _state.targetSnapshot?.chatId || '';
  const sheetUid = table?.uid || table?.id || '';
  let lockState = { cols: {}, rows: {}, cells: {}, indexCol: false };
  try {
    lockState = getSheetLockState({ chatId, isolationKey: tableIsolation.getKey() }, sheetUid) || lockState;
  } catch (_) { /* ignore */ }
  const colLocks = lockState?.cols || {};

  // section: 基础信息
  const sec1 = el('div', { className: 'yyt-tde-schema-section' });
  sec1.appendChild(el('div', { className: 'yyt-tde-schema-heading', text: '基础信息' }));

  const rowName = el('div', { className: 'yyt-tde-schema-row' });
  rowName.appendChild(el('div', { className: 'yyt-tde-schema-key', text: '表名' }));
  const nameSlot = el('div', { className: 'yyt-tde-schema-value' });
  nameSlot.appendChild(textInput({
    value: table?.name || '',
    onInput: (v) => { const t = getCurrentTable(); if (t) { t.name = v; markDirty(); } }
  }).el);
  rowName.appendChild(nameSlot);
  sec1.appendChild(rowName);

  const rowUid = el('div', { className: 'yyt-tde-schema-row' });
  rowUid.appendChild(el('div', { className: 'yyt-tde-schema-key', text: 'UID' }));
  rowUid.appendChild(el('code', {
    text: table?.uid || table?.id || '',
    style: { fontSize: '11px', color: 'var(--tde-accent)' }
  }));
  sec1.appendChild(rowUid);

  const rowNote = el('div', { className: 'yyt-tde-schema-row', style: { alignItems: 'flex-start' } });
  rowNote.appendChild(el('div', { className: 'yyt-tde-schema-key', text: '表说明' }));
  const noteSlot = el('div', { className: 'yyt-tde-schema-value' });
  noteSlot.appendChild(buildTextarea({
    value: table?.note || sd?.note || '',
    placeholder: '表用途说明 + 列注释',
    onInput: (v) => { const t = getCurrentTable(); if (t) { t.note = v; markDirty(); } }
  }));
  rowNote.appendChild(noteSlot);
  sec1.appendChild(rowNote);

  container.appendChild(sec1);

  // section: AI 操作说明
  const sec2 = el('div', { className: 'yyt-tde-schema-section' });
  sec2.appendChild(el('div', { className: 'yyt-tde-schema-heading', text: 'AI 操作说明 (sourceData)' }));
  const aiKeys = [
    { key: 'init', label: '初始化 (init)', placeholder: '表为空时 AI 应该插入什么', legacy: 'initNode' },
    { key: 'create', label: '新增 (insert)', placeholder: '什么情况下 AI 应该新增行', legacy: 'insertNode' },
    { key: 'update', label: '更新 (update)', placeholder: '什么情况下 AI 应该更新行', legacy: 'updateNode' },
    { key: 'delete', label: '删除 (delete)', placeholder: '什么情况下 AI 应该删除行', legacy: 'deleteNode' }
  ];
  for (const item of aiKeys) {
    const r = el('div', { className: 'yyt-tde-schema-row', style: { alignItems: 'flex-start' } });
    r.appendChild(el('div', { className: 'yyt-tde-schema-key', text: item.label }));
    const slot = el('div', { className: 'yyt-tde-schema-value' });
    slot.appendChild(buildTextarea({
      value: ai?.[item.key] || sd?.[item.legacy] || '',
      placeholder: item.placeholder,
      onInput: (v) => {
        const t = getCurrentTable(); if (!t) return;
        t.aiInstructions = t.aiInstructions || {};
        t.aiInstructions[item.key] = v;
        markDirty();
      }
    }));
    r.appendChild(slot);
    sec2.appendChild(r);
  }
  container.appendChild(sec2);

  // section: updateConfig
  const sec3 = el('div', { className: 'yyt-tde-schema-section' });
  sec3.appendChild(el('div', { className: 'yyt-tde-schema-heading', text: '更新配置 (updateConfig)' }));
  sec3.appendChild(el('div', {
    className: 'yyt-tde-hint',
    style: { marginBottom: '8px', fontSize: '11px', color: 'var(--tde-text-muted)' },
    html: '<strong>说明</strong>：这里配置 AI 填表时这张表的行为（频率、上下文深度、token 节省）。'
      + '跟「世界书注入」是两件事：世界书是把表数据塞进 prompt 给主 AI 看（合并条目 / 独立条目在<strong>全局注入</strong> tab 配），'
      + '这里是控制<strong>填表时机</strong>（多久填一次、跳过几层等）。-1 = 沿用全局，0 = 禁用单表。'
  }));

  const ucGrid = el('div', { className: 'yyt-tde-uc-grid' });
  const ucNumFields = [
    { key: 'contextDepth', label: '上下文深度 (contextDepth)', hint: '-1 = 沿用全局，0 = 禁用，N = 最近 N 条消息' },
    { key: 'updateFrequency', label: '更新频率 (updateFrequency)', hint: '-1 = 沿用全局，0 = 禁用自动填表，N = 每 N 条消息触发一次' },
    { key: 'batchSize', label: '批次大小 (batchSize)', hint: '-1 = 沿用全局，N = 单次最多处理 N 张表' },
    { key: 'skipFloors', label: '跳过楼层 (skipFloors)', hint: '-1 = 沿用全局，N = 跳过最近 N 层' },
    { key: 'sendLatestRows', label: '发送最新 N 行 (sendLatestRows)', hint: '-1 = 全部发送，0 = 沿用全局，N = 仅发送最新 N 行（大表 token 节省）' }
  ];
  for (const f of ucNumFields) {
    const cell = el('div', { className: 'yyt-tde-uc-cell' });
    cell.appendChild(el('label', { text: f.label }));
    cell.appendChild(textInput({
      type: 'number',
      value: Number.isFinite(uc?.[f.key]) ? String(uc[f.key]) : '-1',
      onInput: (v) => {
        const t = getCurrentTable(); if (!t) return;
        t.updateConfig = t.updateConfig || {};
        const num = Number(v);
        t.updateConfig[f.key] = Number.isFinite(num) ? num : -1;
        markDirty();
      }
    }).el);
    cell.appendChild(el('span', { className: 'yyt-tde-hint', text: f.hint }));
    ucGrid.appendChild(cell);
  }

  const groupCell = el('div', { className: 'yyt-tde-uc-cell' });
  groupCell.appendChild(el('label', { text: '分组 ID (groupId)' }));
  groupCell.appendChild(textInput({
    value: uc?.groupId || '',
    placeholder: '同组 ID 的表会合并触发',
    onInput: (v) => {
      const t = getCurrentTable(); if (!t) return;
      t.updateConfig = t.updateConfig || {};
      t.updateConfig.groupId = v;
      markDirty();
    }
  }).el);
  groupCell.appendChild(el('span', { className: 'yyt-tde-hint', text: '同组同时触发，跨组并行（留空 = 独立触发）' }));
  ucGrid.appendChild(groupCell);

  const presetCell = el('div', { className: 'yyt-tde-uc-cell yyt-tde-uc-cell-wide' });
  presetCell.appendChild(el('label', { text: '表级 API 预设覆盖' }));
  presetCell.appendChild(textInput({
    value: uc?.apiPreset || '',
    placeholder: '留空 = 沿用全局，填预设名 = 这张表用这个',
    onInput: (v) => {
      const t = getCurrentTable(); if (!t) return;
      t.updateConfig = t.updateConfig || {};
      t.updateConfig.apiPreset = v;
      markDirty();
    }
  }).el);
  presetCell.appendChild(el('span', { className: 'yyt-tde-hint', text: '例：角色表用 Claude、纪要表用 GPT' }));
  ucGrid.appendChild(presetCell);

  sec3.appendChild(ucGrid);
  container.appendChild(sec3);

  // section: 字段定义
  const sec4 = el('div', { className: 'yyt-tde-schema-section' });
  sec4.appendChild(el('div', { className: 'yyt-tde-schema-heading', text: `字段定义 (${columns.length})` }));
  if (columns.length === 0) {
    sec4.appendChild(el('div', {
      text: '无字段',
      style: { color: 'var(--tde-text-muted)', fontSize: '12px', padding: '8px 0' }
    }));
  } else {
    columns.forEach((col, ci) => {
      const colKey = col?.key || '';
      const locked = colKey ? !!colLocks[colKey] : false;
      const fieldBox = el('div', { className: `yyt-tde-schema-field${locked ? ' locked' : ''}` });

      const head = el('div', { className: 'yyt-tde-schema-field-head' });
      head.appendChild(el('span', { className: 'yyt-tde-schema-idx', text: `[${ci}]` }));

      const titleSlot = el('div', { className: 'yyt-tde-field-input-title' });
      titleSlot.appendChild(textInput({
        value: col?.title || col?.key || '',
        placeholder: '字段标题',
        onInput: (v) => {
          const t = getCurrentTable(); if (!t?.columns?.[ci]) return;
          t.columns[ci].title = v; markDirty();
        }
      }).el);
      head.appendChild(titleSlot);

      const keySlot = el('div', { className: 'yyt-tde-field-input-key' });
      const keyInput = textInput({
        value: col?.key || '',
        placeholder: 'key',
        style: { fontFamily: 'monospace' },
        onInput: (v) => {
          const t = getCurrentTable(); if (!t?.columns?.[ci]) return;
          t.columns[ci].key = v; markDirty();
        }
      });
      keySlot.appendChild(keyInput.el);
      head.appendChild(keySlot);

      const typeSlot = el('div', { className: 'yyt-tde-field-input-type' });
      typeSlot.appendChild(selectInput({
        value: col?.type || 'text',
        options: ['text', 'number', 'boolean', 'date', 'json'].map((v) => ({ value: v, label: v })),
        onChange: (v) => {
          const t = getCurrentTable(); if (!t?.columns?.[ci]) return;
          t.columns[ci].type = v; markDirty();
        }
      }).el);
      head.appendChild(typeSlot);

      head.appendChild(button({
        label: locked ? '🔒' : '🔓',
        size: 'small', variant: locked ? 'danger' : 'ghost',
        title: locked ? '已锁定：AI 不会改这列。点击解锁' : '锁定此列：AI 永不修改',
        onClick: () => handleFieldLock(sheetUid, colKey)
      }).el);

      head.appendChild(button({
        label: '🗑', size: 'small', variant: 'danger',
        title: '删除此字段',
        onClick: () => handleFieldDelete(ci)
      }).el);

      fieldBox.appendChild(head);
      fieldBox.appendChild(buildTextarea({
        value: col?.description || '',
        placeholder: '字段描述',
        minHeight: '32px',
        onInput: (v) => {
          const t = getCurrentTable(); if (!t?.columns?.[ci]) return;
          t.columns[ci].description = v; markDirty();
        }
      }));
      sec4.appendChild(fieldBox);
    });
  }

  sec4.appendChild(button({
    label: '+ 添加字段',
    variant: 'ghost',
    onClick: handleFieldAdd
  }).el);
  container.appendChild(sec4);

  return container;
}

function buildGlobalMode() {
  const container = el('div');
  const tables = Array.isArray(_state.tempData) ? _state.tempData : [];

  container.appendChild(el('div', {
    className: 'yyt-tde-schema-hint',
    style: { background: 'rgba(74,158,255,0.08)', borderColor: 'rgba(74,158,255,0.3)' },
    html: '<strong>全局注入配置</strong> — Wrapper 包裹配置（包住所有未启用独立注入的表）+ 每张表的 exportConfig。'
  }));

  if (tables.length === 0) {
    container.appendChild(el('div', { className: 'yyt-tde-empty', text: '无表格可配置。请先添加表格。' }));
    return container;
  }

  // mirror tag
  let mirrorTag = 'yyt-table-workbench';
  try {
    const wbConfig = getTableWorkbenchConfig();
    mirrorTag = wbConfig?.mirrorTag || mirrorTag;
  } catch (_) { /* ignore */ }

  const mirrorSec = el('div', { className: 'yyt-tde-schema-section' });
  mirrorSec.appendChild(el('div', { className: 'yyt-tde-schema-heading', text: '写回正文标签' }));
  const mirrorGrid = el('div', { className: 'yyt-tde-uc-grid' });
  const mirrorCell = el('div', { className: 'yyt-tde-uc-cell yyt-tde-uc-cell-wide' });
  mirrorCell.appendChild(el('label', { text: 'mirrorTag' }));
  mirrorCell.appendChild(textInput({
    value: mirrorTag,
    placeholder: '默认: yyt-table-workbench',
    onInput: (v) => { _state._pendingMirrorTag = v; markDirty(); }
  }).el);
  mirrorCell.appendChild(el('span', {
    className: 'yyt-tde-hint',
    text: '开启写回正文时，用此 XML 标签包裹表格数据注入到 assistant 消息'
  }));
  mirrorGrid.appendChild(mirrorCell);
  mirrorSec.appendChild(mirrorGrid);
  container.appendChild(mirrorSec);

  // Wrapper config section (moved from workbench)
  let wrapperCfg = { enabled: true, wrapperTag: '最新数据与记录', wrapperHint: '', wrapperPlacement: { position: 'before_character_definition', depth: 2, order: 0 } };
  try {
    const wbConfig = getTableWorkbenchConfig();
    if (wbConfig?.wrapperConfig) {
      const wc = wbConfig.wrapperConfig;
      wrapperCfg = {
        enabled: wc.enabled !== false,
        wrapperTag: wc.wrapperTag || wrapperCfg.wrapperTag,
        wrapperHint: wc.wrapperHint ?? wrapperCfg.wrapperHint,
        wrapperPlacement: { ...(wc.wrapperPlacement || wrapperCfg.wrapperPlacement) }
      };
    }
  } catch (_) { /* ignore */ }
  // Initialize pending wrapper config for save tracking
  if (!_state._pendingWrapperConfig) _state._pendingWrapperConfig = { ...wrapperCfg, wrapperPlacement: { ...wrapperCfg.wrapperPlacement } };

  const wrapSec = el('div', { className: 'yyt-tde-schema-section' });

  // heading row with inline toggle
  const wrapHead = el('div', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }
  });
  wrapHead.appendChild(el('div', { className: 'yyt-tde-schema-heading', style: { marginBottom: '0' }, text: 'Wrapper 包裹配置' }));
  wrapHead.appendChild(toggle({
    label: '启用',
    checked: _state._pendingWrapperConfig.enabled !== false,
    style: { padding: '0', border: 'none', background: 'none' },
    onChange: (v) => { _state._pendingWrapperConfig.enabled = v; markDirty(); refresh(); }
  }).el);
  wrapSec.appendChild(wrapHead);

  // content block (dimmed when disabled)
  const wrapEnabled = _state._pendingWrapperConfig.enabled !== false;
  const wrapBody = el('div', {
    className: wrapEnabled ? '' : 'yyt-tde-disabled-section'
  });

  // Wrapper 标签名
  const rowTag = el('div', { className: 'yyt-tde-schema-row' });
  rowTag.appendChild(el('div', { className: 'yyt-tde-schema-key', text: '标签名' }));
  const tagSlot = el('div', { className: 'yyt-tde-schema-value' });
  tagSlot.appendChild(textInput({
    value: _state._pendingWrapperConfig.wrapperTag || '',
    placeholder: '默认: 最新数据与记录',
    onInput: (v) => { _state._pendingWrapperConfig.wrapperTag = v; markDirty(); }
  }).el);
  rowTag.appendChild(tagSlot);
  wrapBody.appendChild(rowTag);

  // Wrapper 提示文
  const rowHint = el('div', { className: 'yyt-tde-schema-row', style: { alignItems: 'flex-start' } });
  rowHint.appendChild(el('div', { className: 'yyt-tde-schema-key', text: '提示文' }));
  const hintSlot = el('div', { className: 'yyt-tde-schema-value' });
  hintSlot.appendChild(buildTextarea({
    value: _state._pendingWrapperConfig.wrapperHint || '',
    placeholder: '可选，注入在 wrapper 开始标签之后',
    onInput: (v) => { _state._pendingWrapperConfig.wrapperHint = v; markDirty(); }
  }));
  rowHint.appendChild(hintSlot);
  wrapBody.appendChild(rowHint);

  // 注入位置
  const wp = _state._pendingWrapperConfig.wrapperPlacement || {};
  const rowPos = el('div', { className: 'yyt-tde-schema-row' });
  rowPos.appendChild(el('div', { className: 'yyt-tde-schema-key', text: '注入位置' }));
  const posSlot = el('div', { className: 'yyt-tde-schema-value' });
  posSlot.appendChild(selectInput({
    value: wp.position || 'before_character_definition',
    options: [
      { value: 'before_character_definition', label: '角色定义之前' },
      { value: 'after_character_definition', label: '角色定义之后' },
      { value: 'before_authors_note', label: '作者注释之前' },
      { value: 'after_authors_note', label: '作者注释之后' }
    ],
    onChange: (v) => {
      if (!_state._pendingWrapperConfig.wrapperPlacement) _state._pendingWrapperConfig.wrapperPlacement = {};
      _state._pendingWrapperConfig.wrapperPlacement.position = v;
      markDirty();
    }
  }).el);
  rowPos.appendChild(posSlot);
  wrapBody.appendChild(rowPos);

  // 深度 / 顺序 — 同行分开显示
  const rowDepthOrder = el('div', { className: 'yyt-tde-schema-row' });
  rowDepthOrder.appendChild(el('div', { className: 'yyt-tde-schema-key', text: '深度 / 顺序' }));
  const depthOrderSlot = el('div', { className: 'yyt-tde-schema-value', style: { display: 'flex', gap: '12px', alignItems: 'center' } });
  depthOrderSlot.appendChild(el('label', { text: '深度', style: { fontSize: '11px', color: 'var(--tde-text-secondary)', fontWeight: '600', whiteSpace: 'nowrap' } }));
  depthOrderSlot.appendChild(textInput({
    type: 'number',
    value: String(wp.depth ?? 2),
    style: { width: '56px' },
    onInput: (v) => {
      if (!_state._pendingWrapperConfig.wrapperPlacement) _state._pendingWrapperConfig.wrapperPlacement = {};
      _state._pendingWrapperConfig.wrapperPlacement.depth = Number(v) || 0;
      markDirty();
    }
  }).el);
  depthOrderSlot.appendChild(el('label', { text: '顺序', style: { fontSize: '11px', color: 'var(--tde-text-secondary)', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '4px' } }));
  depthOrderSlot.appendChild(textInput({
    type: 'number',
    value: String(wp.order ?? 0),
    style: { width: '56px' },
    onInput: (v) => {
      if (!_state._pendingWrapperConfig.wrapperPlacement) _state._pendingWrapperConfig.wrapperPlacement = {};
      _state._pendingWrapperConfig.wrapperPlacement.order = Number(v) || 0;
      markDirty();
    }
  }).el);
  rowDepthOrder.appendChild(depthOrderSlot);
  wrapBody.appendChild(rowDepthOrder);

  wrapSec.appendChild(wrapBody);
  container.appendChild(wrapSec);

  // 每张表的 exportConfig 卡片
  tables.forEach((table, ti) => {
    container.appendChild(buildExportConfigCard(table, ti));
  });

  return container;
}

function buildExportConfigCard(table, ti) {
  const ec = table?.exportConfig || {};
  const ep = ec.entryPlacement || {};
  const exIndexP = ec.extraIndexPlacement || {};
  const enabled = ec.enabled === true;

  const card = el('div', { className: 'yyt-tde-global-card' });

  // head
  const head = el('div', { className: 'yyt-tde-global-card-head' });
  head.appendChild(el('span', { className: 'yyt-tde-global-card-name', text: table?.name || `表 ${ti + 1}` }));
  const enabledToggle = toggle({
    label: '启用独立注入',
    checked: enabled,
    onChange: (v) => {
      const t = _state.tempData?.[ti]; if (!t) return;
      t.exportConfig = t.exportConfig || {};
      t.exportConfig.enabled = v;
      markDirty();
      refresh();
    }
  });
  head.appendChild(enabledToggle.el);
  card.appendChild(head);

  // body
  const body = el('div', { className: `yyt-tde-global-card-body${enabled ? '' : ' yyt-tde-disabled-section'}` });

  const grid = el('div', { className: 'yyt-tde-uc-grid' });

  // entryName
  grid.appendChild(buildUcCell({
    label: '条目名 (entryName)',
    control: textInput({
      value: ec.entryName || table?.name || '',
      onInput: (v) => setEc(ti, 'entryName', v)
    })
  }));
  // entryType
  grid.appendChild(buildUcCell({
    label: '条目类型 (entryType)',
    control: selectInput({
      value: ec.entryType || 'constant',
      options: [
        { value: 'constant', label: 'constant (常驻)' },
        { value: 'keyword', label: 'keyword (关键词触发)' }
      ],
      onChange: (v) => setEc(ti, 'entryType', v)
    })
  }));
  // keywords (wide)
  grid.appendChild(buildUcCell({
    label: '触发关键词 (keywords)',
    wide: true,
    control: textInput({
      value: ec.keywords || '',
      placeholder: '用逗号或换行分隔',
      onInput: (v) => setEc(ti, 'keywords', v)
    })
  }));
  // splitByRow
  grid.appendChild(buildUcCell({
    label: '按行拆分 (splitByRow)',
    control: selectInput({
      value: ec.splitByRow ? 'true' : 'false',
      options: [
        { value: 'false', label: '否（整张表一个条目）' },
        { value: 'true', label: '是（每行一个条目）' }
      ],
      onChange: (v) => setEc(ti, 'splitByRow', v === 'true')
    })
  }));
  // preventRecursion
  grid.appendChild(buildUcCell({
    label: '防递归 (preventRecursion)',
    hint: '防止世界书条目之间互相触发注入（推荐保持开启）',
    control: selectInput({
      value: ec.preventRecursion === false ? 'false' : 'true',
      options: [
        { value: 'true', label: '是' },
        { value: 'false', label: '否' }
      ],
      onChange: (v) => setEc(ti, 'preventRecursion', v !== 'false')
    })
  }));
  // injectionTemplate (wide, textarea)
  const tplCell = el('div', { className: 'yyt-tde-uc-cell yyt-tde-uc-cell-wide' });
  tplCell.appendChild(el('label', { text: '注入模板 (injectionTemplate)' }));
  tplCell.appendChild(buildTextarea({
    value: ec.injectionTemplate || '',
    placeholder: '例：以下是 {{tableName}} 的最新数据：{{tableContent}}',
    onInput: (v) => setEc(ti, 'injectionTemplate', v)
  }));
  grid.appendChild(tplCell);

  body.appendChild(grid);

  // entryPlacement
  body.appendChild(el('div', {
    className: 'yyt-tde-schema-heading',
    style: { marginTop: '12px' },
    text: '条目位置 (entryPlacement)'
  }));
  body.appendChild(buildPlacementGrid(ti, 'entryPlacement', ep));

  // extraIndexPlacement
  body.appendChild(el('div', {
    className: 'yyt-tde-schema-heading',
    style: { marginTop: '12px' },
    text: '额外索引位置 (extraIndexPlacement，可选)'
  }));
  body.appendChild(buildPlacementGrid(ti, 'extraIndexPlacement', exIndexP));

  card.appendChild(body);
  return card;
}

function buildPlacementGrid(ti, key, current) {
  const grid = el('div', { className: 'yyt-tde-uc-grid' });
  const positions = ['before_character_definition', 'after_character_definition', 'before_authors_note', 'after_authors_note'];

  grid.appendChild(buildUcCell({
    label: 'position',
    control: selectInput({
      value: current.position || 'before_character_definition',
      options: positions.map((p) => ({ value: p, label: p })),
      onChange: (v) => setEcPlacement(ti, key, 'position', v)
    })
  }));
  grid.appendChild(buildUcCell({
    label: 'depth',
    control: textInput({
      type: 'number',
      value: Number.isFinite(current.depth) ? String(current.depth) : '2',
      onInput: (v) => setEcPlacement(ti, key, 'depth', Number(v) || 0)
    })
  }));
  grid.appendChild(buildUcCell({
    label: 'order',
    control: textInput({
      type: 'number',
      value: Number.isFinite(current.order) ? String(current.order) : '0',
      onInput: (v) => setEcPlacement(ti, key, 'order', Number(v) || 0)
    })
  }));
  return grid;
}

function buildUcCell({ label, control, wide = false, hint = null }) {
  const cell = el('div', { className: `yyt-tde-uc-cell${wide ? ' yyt-tde-uc-cell-wide' : ''}` });
  cell.appendChild(el('label', { text: label }));
  cell.appendChild(control.el);
  if (hint) cell.appendChild(el('span', { className: 'yyt-tde-hint', text: hint }));
  return cell;
}

function buildTextarea({ value = '', placeholder = '', minHeight = '60px', onInput = null } = {}) {
  const ta = el('textarea', {
    className: 'yyt-textarea',
    attrs: { placeholder },
    style: { minHeight }
  });
  ta.value = value;
  if (typeof onInput === 'function') {
    ta.addEventListener('input', () => onInput(ta.value));
  }
  return ta;
}

function setEc(ti, key, val) {
  const t = _state.tempData?.[ti]; if (!t) return;
  t.exportConfig = t.exportConfig || {};
  t.exportConfig[key] = val;
  markDirty();
}

function setEcPlacement(ti, parentKey, subkey, val) {
  const t = _state.tempData?.[ti]; if (!t) return;
  t.exportConfig = t.exportConfig || {};
  t.exportConfig[parentKey] = t.exportConfig[parentKey] || {};
  t.exportConfig[parentKey][subkey] = val;
  markDirty();
}

function buildEditor() {
  const root = el('div', { className: 'yyt-tde' });
  root.appendChild(buildToolbar());
  const content = el('div', { className: 'yyt-tde-content' });
  if (_state.mode !== 'global') content.appendChild(buildSidebar());
  content.appendChild(buildMainPane());

  // AI 改表助手 dock host（右侧面板，默认隐藏）
  const dockHost = el('div', { attrs: { id: 'yyt-assistant-host' }, className: 'yyt-assistant-dock' });
  dockHost.style.display = _state._assistantOpen ? 'flex' : 'none';
  content.appendChild(dockHost);

  root.appendChild(content);
  return root;
}

function refresh() {
  if (!_state.$window) return;
  const $body = _state.$window.find('.yyt-window-body');
  if (!$body || !$body.length) return;
  const bodyEl = $body[0];

  // preserve scroll positions across DOM rebuild
  const prevMain = bodyEl.querySelector('.yyt-tde-main');
  const prevSidebar = bodyEl.querySelector('.yyt-tde-sidebar');
  const mainTop = prevMain ? prevMain.scrollTop : 0;
  const sidebarTop = prevSidebar ? prevSidebar.scrollTop : 0;

  bodyEl.innerHTML = '';
  bodyEl.appendChild(buildEditor());

  // restore scroll positions
  const nextMain = bodyEl.querySelector('.yyt-tde-main');
  const nextSidebar = bodyEl.querySelector('.yyt-tde-sidebar');
  if (nextMain) nextMain.scrollTop = mainTop;
  if (nextSidebar) nextSidebar.scrollTop = sidebarTop;

  injectAssistantStyles();

  // 助手面板打开时，每次 refresh 都重新初始化（DOM 被 innerHTML 重建）
  if (_state._assistantOpen) {
    const contentEl = bodyEl.querySelector('.yyt-tde-content');
    const hostEl = contentEl?.querySelector('#yyt-assistant-host');
    if (contentEl && hostEl) {
      hostEl.style.display = 'flex';
      initAssistantPanel(() => refresh(), contentEl, () => {
        _state._assistantOpen = false;
        refresh();
      });
    }
  }
}

function injectAssistantStyles() {
  const doc = _state.$window?.[0]?.ownerDocument || document;
  if (!doc) return;
  let style = doc.getElementById('yyt-assistant-styles');
  if (!style) {
    style = doc.createElement('style');
    style.id = 'yyt-assistant-styles';
    (doc.head || doc.documentElement).appendChild(style);
  }
  style.textContent = getAssistantPanelStyles();
}

function handleToggleAssistant() {
  try {
    _state._assistantOpen = !_state._assistantOpen;
    refresh();
  } catch (err) {
    getLog().error('toggleAssistant 异常', err);
  }
}

// ════════════════════════════════════════════════════════════════
// Handlers — 业务逻辑（与之前一致，只改触发方式）
// ════════════════════════════════════════════════════════════════

function handleReload() {
  if (_state.isDirty && !window.confirm('有未保存修改，重新加载将丢弃，确定？')) return;
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
  getLog().info('已重新加载', null, { toast: 'success' });
}

async function handleSaveChat() {
  if (!_state.isDirty) {
    getLog().info('没有修改', null, { toast: true });
    return;
  }
  try {
    let target = _state.targetSnapshot;
    if (!target?.sourceMessageId) {
      target = await resolveLatestTableTarget();
    }
    if (!target?.sourceMessageId) {
      getLog().error('无法定位当前消息（找不到 assistant 消息）', null, { toast: true });
      return;
    }
    const result = await commitBoundState(target, {
      tables: cloneTableValue(_state.tempData) || [],
      meta: { source: 'data-editor-manual-save' }
    }, { skipFreshValidation: true });
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
      if (Array.isArray(result?.state?.tables)) {
        _state.tempData = cloneTableValue(result.state.tables) || [];
        _state.isFromTemplate = false;
      }
      _state._afterSaveGlobalAt = 0;
      getLog().info('已保存到 chat', null, { toast: 'success' });
      refresh();
    } else {
      getLog().error(`保存失败：${result?.error || '未知'}`, null, { toast: true });
    }
  } catch (err) {
    getLog().error('保存异常', err);
    getLog().error(`保存异常：${err?.message || err}`, null, { toast: true });
  }
}

async function handleSaveGlobal() {
  if (!Array.isArray(_state.tempData) || _state.tempData.length === 0) {
    getLog().info('没有可保存的数据', null, { toast: true });
    return;
  }
  if (!window.confirm('保存到「全局激活模板」会影响后续所有 chat 的新填表（已有 slot 数据不受影响）。继续？')) return;
  try {
    const activeTpl = getActiveGlobalTemplate();
    if (!activeTpl?.id) {
      getLog().error('没有可用的全局激活模板', null, { toast: true });
      return;
    }
    const tablesSchemaOnly = (_state.tempData || []).map((t) => ({
      id: t?.id || t?.uid,
      name: t?.name || '',
      note: t?.note || '',
      enabled: t?.enabled !== false,
      aiInstructions: t?.aiInstructions || {},
      updateConfig: t?.updateConfig || {},
      exportConfig: t?.exportConfig || {},
      columns: Array.isArray(t?.columns) ? cloneTableValue(t.columns) : [],
      rows: []
    }));
    const result = saveTableTemplate({
      ...activeTpl,
      tables: tablesSchemaOnly
    });
    if (result?.success) {
      // Merge mirrorTag + wrapperConfig into a single save
      const hasMirror = typeof _state._pendingMirrorTag === 'string' && _state._pendingMirrorTag.trim();
      const hasWrapper = !!_state._pendingWrapperConfig;
      if (hasMirror || hasWrapper) {
        try {
          const wbConfig = getTableWorkbenchConfig();
          const merged = { ...wbConfig };
          if (hasMirror) merged.mirrorTag = _state._pendingMirrorTag.trim();
          if (hasWrapper) merged.wrapperConfig = _state._pendingWrapperConfig;
          saveTableWorkbenchConfig(merged);
        } catch (e) {
          getLog().warn('保存 workbench config 失败', e);
        }
      }
      _state._pendingMirrorTag = null;
      _state._pendingWrapperConfig = null;
      clearDirty();
      if (Array.isArray(result?.template?.tables)) {
        _state.tempData = cloneTableValue(result.template.tables) || [];
        _state.isFromTemplate = true;
        _state._afterSaveGlobalAt = Date.now();
      }
      getLog().info(`已保存到全局模板「${activeTpl.name}」`, null, { toast: 'success' });
      getLog().info('保存到全局模板成功', { templateId: activeTpl.id, name: activeTpl.name, tableCount: tablesSchemaOnly.length });
      refresh();
    } else {
      getLog().error(`保存失败：${result?.error || '未知'}`, null, { toast: true });
    }
  } catch (err) {
    getLog().error('保存到全局模板异常', err);
    getLog().error(`保存异常：${err?.message || err}`, null, { toast: true });
  }
}

async function handleRunNow() {
  if (_state.isDirty && !window.confirm('有未保存修改，立即填表会先丢弃这些修改，确定？')) return;
  try {
    const result = await runManualTableUpdate();
    if (result?.success) {
      getLog().info('填表完成', null, { toast: 'success' });
      loadEditorData();
      refresh();
    } else {
      getLog().error(`填表失败：${result?.error || '未知'}`, null, { toast: true });
    }
  } catch (err) {
    getLog().error('立即填表异常', err);
    getLog().error(`异常：${err?.message || err}`, null, { toast: true });
  }
}

function handleSheetMove(i, dir) {
  if (!Array.isArray(_state.tempData)) return;
  const arr = _state.tempData;
  const j = i + dir;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
  if (_state.currentTableIndex === i) _state.currentTableIndex = j;
  else if (_state.currentTableIndex === j) _state.currentTableIndex = i;
  markDirty();
  refresh();
}

function handleSheetDelete(i) {
  if (!Array.isArray(_state.tempData) || !_state.tempData[i]) return;
  const t = _state.tempData[i];
  if (!window.confirm(`删除表「${t.name || `表 ${i + 1}`}」？此操作不可撤销。`)) return;
  _state.tempData.splice(i, 1);
  if (_state.currentTableIndex >= _state.tempData.length) {
    _state.currentTableIndex = Math.max(0, _state.tempData.length - 1);
  }
  markDirty();
  refresh();
}

function handleSheetAdd() {
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
}

function handleRowLock(sheetUid, rowIndex) {
  if (!sheetUid || !Number.isFinite(rowIndex)) return;
  try {
    const scope = { chatId: _state.targetSnapshot?.chatId || '', isolationKey: tableIsolation.getKey() };
    const current = getSheetLockState(scope, sheetUid) || { rows: {} };
    const isLocked = !!(current.rows && current.rows[rowIndex]);
    setRowLock(scope, sheetUid, rowIndex, !isLocked);
    getLog().info(isLocked ? `已解锁行 #${rowIndex + 1}` : `已锁定行 #${rowIndex + 1}（AI 不会改这行）`, null, { toast: 'success' });
    getLog().info('row-lock toggled', { sheetUid, rowIndex, locked: !isLocked });
    refresh();
  } catch (err) {
    getLog().error('row-lock 异常', err);
    getLog().error(`锁定失败：${err?.message || err}`, null, { toast: true });
  }
}

function handleCellLock(sheetUid, rowIndex, colKey) {
  if (!sheetUid || !Number.isFinite(rowIndex) || !colKey) return;
  try {
    const scope = { chatId: _state.targetSnapshot?.chatId || '', isolationKey: tableIsolation.getKey() };
    const current = getSheetLockState(scope, sheetUid) || { cells: {} };
    const cellKey = `${rowIndex}::${colKey}`;
    const isLocked = !!(current.cells && current.cells[cellKey]);
    setCellLock(scope, sheetUid, rowIndex, colKey, !isLocked);
    getLog().info(isLocked ? `已解锁 [${rowIndex}][${colKey}]` : `已锁定 [${rowIndex}][${colKey}]`, null, { toast: 'success' });
    getLog().info('cell-lock toggled', { sheetUid, rowIndex, colKey, locked: !isLocked });
    refresh();
  } catch (err) {
    getLog().error('cell-lock 异常', err);
    getLog().error(`锁定失败：${err?.message || err}`, null, { toast: true });
  }
}

function handleDeleteRow(ri) {
  if (!Number.isFinite(ri)) return;
  if (!window.confirm(`确定删除第 ${ri + 1} 行？`)) return;
  const t = getCurrentTable(); if (!t?.rows) return;
  t.rows.splice(ri, 1);
  markDirty();
  refresh();
}

function handleAddRow() {
  const t = getCurrentTable(); if (!t) return;
  if (!Array.isArray(t.rows)) t.rows = [];
  t.rows.push({
    id: createRuntimeTableRowId('row'),
    name: '',
    cells: {}
  });
  markDirty();
  refresh();
}

function handleFieldLock(sheetUid, colKey) {
  if (!sheetUid || !colKey) {
    getLog().error('列锁定失败：缺少 sheetUid 或 colKey', null, { toast: true });
    return;
  }
  try {
    const chatId = _state.targetSnapshot?.chatId || '';
    const scope = { chatId, isolationKey: tableIsolation.getKey() };
    const current = getSheetLockState(scope, sheetUid) || { cols: {} };
    const isLocked = !!(current.cols && current.cols[colKey]);
    setColLock(scope, sheetUid, colKey, !isLocked);
    getLog().info(isLocked ? `已解锁 ${colKey}` : `已锁定 ${colKey}（AI 不会改这列）`, null, { toast: 'success' });
    getLog().info('field-lock toggled', { sheetUid, colKey, locked: !isLocked });
    refresh();
  } catch (err) {
    getLog().error('field-lock 异常', err);
    getLog().error(`锁定失败：${err?.message || err}`, null, { toast: true });
  }
}

function handleFieldDelete(fi) {
  const t = getCurrentTable(); if (!t?.columns?.[fi]) return;
  if (!window.confirm(`删除字段「${t.columns[fi].title || t.columns[fi].key}」？此操作不会自动清理行数据。`)) return;
  t.columns.splice(fi, 1);
  markDirty();
  refresh();
}

function handleFieldAdd() {
  const t = getCurrentTable(); if (!t) return;
  t.columns = Array.isArray(t.columns) ? t.columns : [];
  const usedKeys = new Set(t.columns.map((c) => c?.key).filter(Boolean));
  let n = t.columns.length + 1;
  while (usedKeys.has(`col_${n}`)) n++;
  t.columns.push({ key: `col_${n}`, title: `字段${n}`, description: '', type: 'text', required: false });
  markDirty();
  refresh();
}

// ════════════════════════════════════════════════════════════════
// Public API
// ════════════════════════════════════════════════════════════════

export function openTableDataEditor(options = {}) {
  getLog().info('openTableDataEditor 调用', { options });

  injectStyles();
  const $ = window.jQuery || window.parent?.jQuery;
  if (!$) {
    const msg = 'jQuery 不可用（window.jQuery 和 window.parent.jQuery 都是 undefined）';
    getLog().error(msg);
    try { getLog().error(`数据编辑器打开失败：${msg}`, null, { toast: true }); } catch (_) { /* ignore */ }
    return null;
  }
  // v1.0.208：sanity check saved state — 之前可能存了 isMaximized=true 或者奇葩小尺寸
  //   导致打开时自动 maximize 到 iframe viewport（看着"小"且 resize 失效）。
  //   合理范围外的状态直接覆盖为默认 1200×800，未来用户再调整会被合理保留。
  try {
    const saved = windowManager.getState(WINDOW_ID);
    if (saved) {
      const w = Number(saved.width);
      const h = Number(saved.height);
      const tooSmall = (Number.isFinite(w) && w < 800) || (Number.isFinite(h) && h < 500);
      if (saved.isMaximized || tooSmall) {
        getLog().info('检测到不合理 saved state，重置为默认尺寸', {
          isMaximized: saved.isMaximized, savedW: w, savedH: h
        });
        windowManager.saveState(WINDOW_ID, {
          width: 1200, height: 800, isMaximized: false, x: undefined, y: undefined
        });
      }
    }
  } catch (err) {
    getLog().warn('saved state sanity check 异常', err);
  }

  if (_state.$window && _state.$window.length && getTargetDocument().body.contains(_state.$window[0])) {
    if (options.focusTableUid) {
      const tables = _state.tempData || [];
      const idx = tables.findIndex((t) => (t?.uid || t?.id) === options.focusTableUid);
      if (idx >= 0) _state.currentTableIndex = idx;
    }
    if (options.focusMode && ['data', 'schema', 'global'].includes(options.focusMode)) {
      _state.mode = options.focusMode;
    }
    if (options.openAssistant && !_state._assistantOpen) {
      _state._assistantOpen = true;
    }
    refresh();
    return _state.$window;
  }

  loadEditorData();
  if (options.focusTableUid) {
    const tables = _state.tempData || [];
    const idx = tables.findIndex((t) => (t?.uid || t?.id) === options.focusTableUid);
    if (idx >= 0) _state.currentTableIndex = idx;
  }
  if (options.focusMode && ['data', 'schema', 'global'].includes(options.focusMode)) {
    _state.mode = options.focusMode;
  }
  if (options.openAssistant) {
    _state._assistantOpen = true;
  }

  let $win;
  try {
    $win = createWindow({
      id: WINDOW_ID,
      title: '填表数据编辑器',
      content: '<div class="yyt-tde-placeholder"></div>',
      width: 1200,
      height: 800,
      modal: false,
      resizable: true,
      maximizable: true,
      rememberState: true,
      onReady: ($el) => {
        _state.$window = $el;
        refresh();
      },
      onClose: () => {
        if (_state.isDirty) {
          getLog().warn('数据编辑器关闭时有未保存修改');
        }
        _state.$window = null;
        _state._assistantOpen = false;
        _state._refs = { saveBtn: null, saveGlobalBtn: null, dirtyBadge: null };
      }
    });
  } catch (err) {
    getLog().error('createWindow 抛错', err);
    try { getLog().error(`创建窗口失败：${err?.message || err}`, null, { toast: true }); } catch (_) { /* ignore */ }
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
