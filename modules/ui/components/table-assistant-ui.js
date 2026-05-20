/**
 * YouYou Toolkit - AI 改表助手 UI 面板
 *
 * 嵌入工作台面板内的聊天式交互界面。
 * 由 table-workbench-window.js 的 data-action="open-assistant" 按钮触发开关。
 */

import { logger } from '../../core/logger-service.js';
import {
  runAssistantSession,
  applyAssistantResult,
  createAssistantSessionGuard,
  AssistantSessionStoppedError,
} from '../../table-engine/table-assistant-service.js';
import { getTableWorkbenchConfig, saveTableWorkbenchConfig } from '../../table-engine/table-schema-service.js';
import { getBoundTableState } from '../../table-engine/table-state-service.js';
import { resolveLatestTableTarget } from '../../table-engine/table-target-resolver.js';
import { buildCumulativeDiff } from '../../table-engine/table-assistant-compiler.js';
import { cloneTableValue } from '../../table-engine/table-types.js';
import { normalizePositiveInt } from '../../table-engine/table-assistant-types.js';
import { getPresetNames } from '../../preset-manager.js';

const log = logger.createScope('TableAssistantUI');

function _getTopDoc() {
  try {
    if (window.parent && window.parent !== window && window.parent.document) {
      return window.parent.document;
    }
  } catch { /* cross-origin */ }
  return document;
}

const ASSISTANT_HOST_ID = 'yyt-assistant-host';
const DEFAULT_MAX_ROUNDS = 3;

// ════════════════════════════════════════════════════════════════
// UI State
// ════════════════════════════════════════════════════════════════

let _containerEl = null;
let _workbenchRefresh = null;
let _onExternalClose = null;
let _isOpen = false;
let _isGenerating = false;
let _userInput = '';
let _maxRoundsInput = String(DEFAULT_MAX_ROUNDS);
let _apiPreset = '';
let _guardController = null;
let _transcript = [];
let _runningSessionId = 0;

function generateTurnId() {
  return `turn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function resetState() {
  _isOpen = false;
  _isGenerating = false;
  _userInput = '';
  _maxRoundsInput = String(DEFAULT_MAX_ROUNDS);
  _apiPreset = '';
  if (_guardController) {
    _guardController.invalidate();
  }
  _guardController = null;
  _onExternalClose = null;
  _containerEl = null;
  _transcript = [];
}

// ════════════════════════════════════════════════════════════════
// HTML 渲染
// ════════════════════════════════════════════════════════════════

function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = String(str ?? '');
  return div.innerHTML;
}

function getCurrentTableLabel() {
  const config = getTableWorkbenchConfig();
  const activeId = config?.scope?.activeTableId || '';
  const table = (config?.tables || []).find((t) => t.id === activeId);
  if (!activeId || !table) return '当前未选中表';
  return `${table.name} (${activeId})`;
}

function buildDiffSummaryHtml(diff) {
  if (!diff) return '';
  const parts = [];
  if (diff.addedTables?.length) parts.push(`新增${diff.addedTables.length}表`);
  if (diff.deletedTables?.length) parts.push(`删除${diff.deletedTables.length}表`);
  if (diff.renamedTables?.length) parts.push(`重命名${diff.renamedTables.length}表`);
  if (diff.movedTables?.length) parts.push(`移动${diff.movedTables.length}表`);
  const patchCount = (diff.patchedAiInstructions?.length || 0) + (diff.patchedColumns?.length || 0) + (diff.patchedRows?.length || 0) + (diff.patchedExportConfig?.length || 0) + (diff.patchedLocks?.length || 0) + (diff.patchedWorkbenchConfig?.length || 0);
  if (patchCount) parts.push(`修改${patchCount}处`);
  return parts.length ? parts.join(' · ') : '无变更';
}

function buildDiffDetailHtml(diff) {
  if (!diff) return '';
  const sections = [];
  const renderList = (items) => items.length ? `<ul>${items.map((i) => `<li>${escHtml(i)}</li>`).join('')}</ul>` : '<div class="yyt-assistant-hint">无</div>';

  if (diff.addedTables?.length) sections.push(`<div><strong>新增表</strong>${renderList(diff.addedTables.map((i) => `${i.name} [${i.tableId}]`))}</div>`);
  if (diff.deletedTables?.length) sections.push(`<div><strong>删除表</strong>${renderList(diff.deletedTables.map((i) => `${i.name} [${i.tableId}]`))}</div>`);
  if (diff.renamedTables?.length) sections.push(`<div><strong>重命名</strong>${renderList(diff.renamedTables.map((i) => `${i.beforeName} -> ${i.afterName}`))}</div>`);
  if (diff.patchedAiInstructions?.length) sections.push(`<div><strong>AI 指令变更</strong>${renderList(diff.patchedAiInstructions.map((i) => `${i.name}: ${i.keys.join(', ')}`))}</div>`);
  if (diff.patchedColumns?.length) sections.push(`<div><strong>列结构变更</strong>${renderList(diff.patchedColumns.map((i) => `${i.name}: ${i.changes.join('；')}`))}</div>`);
  if (diff.patchedRows?.length) sections.push(`<div><strong>行数据变更</strong>${renderList(diff.patchedRows.map((i) => `${i.name}: ${i.changes.join('；')}`))}</div>`);
  if (diff.patchedExportConfig?.length) sections.push(`<div><strong>导出配置变更</strong>${renderList(diff.patchedExportConfig.map((i) => `${i.name}: ${i.keys.join(', ')}`))}</div>`);
  if (diff.patchedLocks?.length) sections.push(`<div><strong>锁变更</strong>${renderList(diff.patchedLocks.map((i) => `${i.name}: ${i.changes.join('；')}`))}</div>`);
  if (diff.patchedWorkbenchConfig?.length) sections.push(`<div><strong>工作台配置变更</strong>${renderList(diff.patchedWorkbenchConfig.map((i) => i.keys.join(', ')))}</div>`);

  return sections.join('');
}

function renderRiskItemsHtml(turn) {
  const risks = turn.compileResult?.highRiskItems || [];
  if (!risks.length) return '<div class="yyt-assistant-hint">无高风险操作</div>';
  return risks.map((item, i) => {
    const checked = turn.riskConfirmations?.[String(i)] !== false;
    return `<label class="yyt-assistant-risk-item"><input type="checkbox" class="yyt-assistant-risk-cb" data-turn-id="${escHtml(turn.id)}" data-risk-idx="${i}" ${checked ? 'checked' : ''}><span>${escHtml(item.label)}</span></label>`;
  }).join('');
}

function renderTranscriptHtml() {
  if (!_transcript.length) {
    return '<div class="yyt-assistant-empty">AI 改表助手已就绪。输入修改需求后发送。</div>';
  }
  return _transcript.map((turn, idx) => {
    const isLatest = idx === _transcript.length - 1;
    if (turn.type === 'user') {
      return `<div class="yyt-assistant-bubble yyt-assistant-bubble-user"><div class="yyt-assistant-label">你</div><div class="yyt-assistant-content">${escHtml(turn.content)}</div></div>`;
    }
    if (turn.type === 'error') {
      return `<div class="yyt-assistant-bubble yyt-assistant-bubble-error"><div class="yyt-assistant-label" style="color:#ff8888;">执行错误</div><div class="yyt-assistant-content">${escHtml(turn.errorMessage)}</div></div>`;
    }
    if (turn.type === 'assistant') {
      const draft = turn.draft;
      const compileResult = turn.compileResult;
      const summary = draft?.summary || '（无摘要）';
      const warnings = draft?.warnings || [];
      const diffSummary = buildDiffSummaryHtml(compileResult?.diff);
      const isFinal = !!turn.isFinal;
      const riskCount = compileResult?.highRiskItems?.length || 0;
      const allRisksConfirmed = riskCount === 0 || turn.riskConfirmations && compileResult.highRiskItems.every((_, i) => turn.riskConfirmations[String(i)] !== false);
      const showApply = isLatest && isFinal;
      const expanded = turn.expanded || false;
      const roundLabel = turn.sessionInfo || '';

      let html = `<div class="yyt-assistant-bubble yyt-assistant-bubble-ai">`;
      html += `<div class="yyt-assistant-label">AI 助手${roundLabel ? ` · ${escHtml(roundLabel)}` : ''}</div>`;
      html += `<div class="yyt-assistant-content">${escHtml(summary)}</div>`;

      // 折叠详情
      html += `<div class="yyt-assistant-toggle" data-turn-id="${escHtml(turn.id)}">${expanded ? '▼' : '▶'} 详情 (${escHtml(diffSummary)})</div>`;
      html += `<div class="yyt-assistant-detail" data-turn-id="${escHtml(turn.id)}" style="display:${expanded ? 'block' : 'none'};">`;

      if (warnings.length) {
        html += `<div><strong>警告</strong><ul>${warnings.map((w) => `<li>${escHtml(w)}</li>`).join('')}</ul></div>`;
      }
      html += buildDiffDetailHtml(compileResult?.diff);

      if (isFinal && riskCount > 0) {
        html += `<div><strong>高风险确认</strong><div class="yyt-assistant-risk-list">${renderRiskItemsHtml(turn)}</div></div>`;
      } else if (riskCount > 0) {
        html += `<div><strong>高风险项</strong><ul>${compileResult.highRiskItems.map((i) => `<li>${escHtml(i.label)}</li>`).join('')}</ul></div>`;
      }

      // 累积变更摘要（仅 final + 多轮时显示）
      if (isFinal && turn.cumulativeDiff) {
        const cumSummary = buildDiffSummaryHtml(turn.cumulativeDiff);
        if (cumSummary && cumSummary !== '无变更') {
          html += `<div class="yyt-assistant-cumulative"><strong>累积变更</strong> ${escHtml(cumSummary)}`;
          html += `<div class="yyt-assistant-cumulative-detail">${buildDiffDetailHtml(turn.cumulativeDiff)}</div>`;
          html += `</div>`;
        }
      }

      html += `</div>`; // detail

      if (showApply) {
        html += `<button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-assistant-apply-btn" type="button" data-turn-id="${escHtml(turn.id)}" ${!allRisksConfirmed ? 'disabled' : ''}>应用到工作台</button>`;
      }

      html += `</div>`; // bubble
      return html;
    }
    return '';
  }).join('');
}

function getPresetOptions() {
  let names = [];
  try { names = getPresetNames() || []; } catch { /* ignore */ }
  return [
    { value: '', label: '跟随填表工作台' },
    ...names.map((name) => ({ value: name, label: name })),
  ];
}

function renderPresetOptions() {
  return getPresetOptions()
    .map((item) => `<option value="${escHtml(item.value)}" ${String(item.value) === _apiPreset ? 'selected' : ''}>${escHtml(item.label)}</option>`)
    .join('');
}

function renderAssistantPanelHtml() {
  const disabled = _isGenerating || !_userInput.trim();
  return `
    <div id="yyt-assistant-panel" class="yyt-assistant-panel">
      <div class="yyt-assistant-header">
        <div>
          <div class="yyt-assistant-title">AI 改表助手</div>
          <div class="yyt-assistant-hint">当前表：${escHtml(getCurrentTableLabel())}</div>
        </div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" type="button" data-action="close-assistant">关闭</button>
      </div>
      <div class="yyt-assistant-chat">
        ${renderTranscriptHtml()}
      </div>
      <div class="yyt-assistant-footer">
        <div id="yyt-assistant-control-slot" class="yyt-assistant-controls">
          <label class="yyt-assistant-inline-field" for="yyt-assistant-preset">
            <span>API 预设</span>
            <select class="yyt-select yyt-assistant-preset-select" id="yyt-assistant-preset">${renderPresetOptions()}</select>
          </label>
          <label class="yyt-assistant-inline-field" for="yyt-assistant-max-rounds">
            <span>最大轮次</span>
            <input class="yyt-input yyt-assistant-rounds-input" id="yyt-assistant-max-rounds" type="number" min="1" value="${escHtml(_maxRoundsInput)}">
          </label>
        </div>
        <textarea class="yyt-textarea yyt-assistant-textarea" id="yyt-assistant-input" placeholder="例如：新增一张战利品表，关闭背包物品表的独立导出。">${escHtml(_userInput)}</textarea>
        <div class="yyt-assistant-actions">
          <button class="yyt-btn yyt-btn-primary" id="yyt-assistant-send" type="button" ${disabled ? 'disabled' : ''}>${_isGenerating ? '生成中...' : '发送'}</button>
          <button class="yyt-btn yyt-btn-small" id="yyt-assistant-stop" type="button" ${!_isGenerating ? 'disabled' : ''}>停止</button>
        </div>
      </div>
    </div>
  `;
}

// ════════════════════════════════════════════════════════════════
// 事件绑定
// ════════════════════════════════════════════════════════════════

function getHostElement() {
  if (_containerEl) return _containerEl.querySelector('#' + ASSISTANT_HOST_ID);
  return _getTopDoc().getElementById(ASSISTANT_HOST_ID);
}

function refreshPanel() {
  const host = getHostElement();
  if (!host) return;
  host.innerHTML = renderAssistantPanelHtml();
  bindPanelEvents();
}

function bindPanelEvents() {
  const host = getHostElement();
  if (!host) return;

  host.querySelector('#yyt-assistant-input')?.addEventListener('input', (e) => {
    _userInput = e.target.value || '';
    const sendBtn = host.querySelector('#yyt-assistant-send');
    if (sendBtn) sendBtn.disabled = _isGenerating || !_userInput.trim();
  });

  host.querySelector('#yyt-assistant-preset')?.addEventListener('change', (e) => {
    _apiPreset = e.target.value || '';
  });

  host.querySelector('#yyt-assistant-max-rounds')?.addEventListener('input', (e) => {
    _maxRoundsInput = e.target.value || String(DEFAULT_MAX_ROUNDS);
  });

  host.querySelector('#yyt-assistant-send')?.addEventListener('click', handleSend);
  host.querySelector('#yyt-assistant-stop')?.addEventListener('click', handleStop);
  host.querySelector('[data-action="close-assistant"]')?.addEventListener('click', handleClose);

  // 折叠详情 toggle
  host.querySelectorAll('.yyt-assistant-toggle').forEach((el) => {
    el.addEventListener('click', () => {
      const turnId = el.getAttribute('data-turn-id');
      const turn = _transcript.find((t) => t.id === turnId && t.type === 'assistant');
      if (!turn) return;
      turn.expanded = !turn.expanded;
      refreshPanel();
    });
  });

  // 高风险确认 checkbox
  host.querySelectorAll('.yyt-assistant-risk-cb').forEach((el) => {
    el.addEventListener('change', () => {
      const turnId = el.getAttribute('data-turn-id');
      const idx = Number(el.getAttribute('data-risk-idx'));
      const turn = _transcript.find((t) => t.id === turnId && t.type === 'assistant');
      if (!turn) return;
      if (!turn.riskConfirmations) turn.riskConfirmations = {};
      turn.riskConfirmations[String(idx)] = el.checked;
      // 更新 apply 按钮 disabled
      const applyBtn = host.querySelector(`.yyt-assistant-apply-btn[data-turn-id="${turnId}"]`);
      if (applyBtn) {
        const allConfirmed = (turn.compileResult?.highRiskItems || []).every((_, i) => turn.riskConfirmations[String(i)] !== false);
        applyBtn.disabled = !allConfirmed;
      }
    });
  });

  // 应用按钮
  host.querySelectorAll('.yyt-assistant-apply-btn').forEach((el) => {
    el.addEventListener('click', async () => {
      const turnId = el.getAttribute('data-turn-id');
      const turn = _transcript.find((t) => t.id === turnId && t.type === 'assistant');
      if (!turn?.result) return;
      const risks = turn.compileResult?.highRiskItems || [];
      const allConfirmed = risks.every((_, i) => turn.riskConfirmations?.[String(i)] !== false);
      if (risks.length && !allConfirmed) {
        log.warn('请先确认所有高风险项', null, { toast: 'warning' });
        return;
      }
      try {
        const applied = await applyAssistantResult(turn.result);
        if (applied) {
          log.info('assistant 草稿已应用到工作台', null, { toast: 'success' });
          const focusId = turn.compileResult?.focusTableId;
          if (focusId) {
            try {
              const cfg = getTableWorkbenchConfig();
              if (cfg && (!cfg.scope || cfg.scope.activeTableId !== focusId)) {
                cfg.scope = { ...(cfg.scope || {}), activeTableId: focusId };
                saveTableWorkbenchConfig(cfg);
              }
            } catch { /* ignore */ }
          }
          if (typeof _workbenchRefresh === 'function') _workbenchRefresh();
          refreshPanel();
        } else {
          log.warn('当前结构已变化，assistant 草稿已失效，请重新生成。', null, { toast: 'warning' });
        }
      } catch (err) {
        log.error('应用失败', err, { toast: 'error' });
      }
    });
  });
}

// ════════════════════════════════════════════════════════════════
// 核心交互
// ════════════════════════════════════════════════════════════════

async function handleSend() {
  const userRequest = _userInput.trim();
  if (!userRequest) return;

  const config = getTableWorkbenchConfig();
  const currentTableId = config?.scope?.activeTableId || '';
  if (!currentTableId) {
    log.warn('请先选中一个表后再使用 AI 改表助手', null, { toast: 'warning' });
    return;
  }

  // 构建 priorTurns
  const priorTurns = buildPriorTurns();

  // 添加 user 气泡
  const userTurn = { type: 'user', id: generateTurnId(), content: userRequest };
  _transcript.push(userTurn);
  _userInput = '';
  _isGenerating = true;

  const capturedSessionId = _runningSessionId + 1;
  _guardController = createAssistantSessionGuard();
  _runningSessionId = capturedSessionId;

  refreshPanel();

  const originalConfig = config; // getTableWorkbenchConfig() 每次返回新对象，可直接引用

  // 解析 targetSnapshot 和行数据上下文
  let targetSnapshot = null;
  let dataContext = null;
  try {
    targetSnapshot = await resolveLatestTableTarget();
    if (targetSnapshot) {
      const boundState = getBoundTableState(targetSnapshot);
      if (boundState?.tables?.length) {
        // 构造 dataContext: { [tableId]: rows[] }
        dataContext = {};
        for (const table of boundState.tables) {
          if (Array.isArray(table.rows) && table.rows.length) {
            dataContext[table.id] = table.rows.map((r) => ({
              rowId: r.id,
              name: r.name || '',
              cells: r.cells || {},
            }));
          }
        }
        if (!Object.keys(dataContext).length) dataContext = null;
      }
    }
  } catch (e) {
    log.warn('加载行数据上下文失败，将仅使用 schema 上下文', e);
  }

  try {
    const result = await runAssistantSession({
      config: cloneTableValue(config),
      currentTableId,
      userRequest,
      priorTurns,
      apiPreset: _apiPreset,
      maxRounds: normalizePositiveInt(_maxRoundsInput, DEFAULT_MAX_ROUNDS),
      guard: _guardController.createRunGuard(),
      dataContext,
      targetSnapshot,
      onRoundComplete: (progress) => {
        if (capturedSessionId !== _runningSessionId) return;
        const previewTurn = {
          type: 'assistant',
          id: generateTurnId(),
          draft: progress.round.draft,
          aiRawText: progress.round.aiRawText,
          compileResult: progress.round.perRoundCompileResult,
          sessionInfo: `第 ${progress.round.round}/${progress.maxRounds} 轮`,
          isFinal: false,
          expanded: false,
          riskConfirmations: {},
        };
        _transcript.push(previewTurn);
        refreshPanel();
      },
    });

    if (capturedSessionId !== _runningSessionId) return;

    // 用 final 结果替换最后一个 preview
    const finalTurn = {
      type: 'assistant',
      id: generateTurnId(),
      draft: result.draft,
      aiRawText: result.aiRawText,
      compileResult: result.compileResult,
      sessionInfo: result.session ? `${result.session.roundsExecuted}轮 · ${result.session.stopReason}` : '',
      isFinal: true,
      expanded: false,
      riskConfirmations: {},
      result,
    };

    // 计算累积 diff（多轮 session 的全量变更汇总）
    try {
      const cumulative = buildCumulativeDiff({
        baselineConfig: originalConfig,
        candidateConfig: result.compileResult.candidateConfig,
      });
      finalTurn.cumulativeDiff = cumulative.diff;
    } catch (e) {
      log.warn('buildCumulativeDiff 失败，跳过累积摘要', e);
    }

    // 移除最后一个 preview assistant turn
    const lastAssistantIdx = _transcript.findLastIndex((t) => t.type === 'assistant' && !t.isFinal);
    if (lastAssistantIdx >= 0) {
      _transcript[lastAssistantIdx] = finalTurn;
    } else {
      _transcript.push(finalTurn);
    }
  } catch (err) {
    if (err instanceof AssistantSessionStoppedError) {
      log.warn(err.message, null, { toast: 'warning' });
      return;
    }
    _transcript.push({ type: 'error', id: generateTurnId(), errorMessage: err?.message || '生成失败' });
    log.error('改表助手执行失败', err, { toast: 'error' });
  } finally {
    _isGenerating = false;
    refreshPanel();
  }
}

function handleStop() {
  if (_guardController) {
    _guardController.cancel();
  }
}

function handleClose() {
  _isOpen = false;
  const host = getHostElement();
  if (host) host.style.display = 'none';
  if (typeof _onExternalClose === 'function') _onExternalClose();
}

function buildPriorTurns() {
  const turns = [];
  for (let i = 0; i < _transcript.length; i++) {
    const turn = _transcript[i];
    if (turn.type === 'user') {
      let assistantText;
      for (let j = i + 1; j < _transcript.length; j++) {
        if (_transcript[j].type === 'user') break;
        if (_transcript[j].type === 'assistant' && _transcript[j].isFinal) {
          assistantText = _transcript[j].aiRawText;
        }
      }
      turns.push({ user: turn.content, assistant: assistantText });
    }
  }
  return turns;
}

// ════════════════════════════════════════════════════════════════
// 公开 API
// ════════════════════════════════════════════════════════════════

export function toggleAssistant(workbenchRefresh, containerEl) {
  if (containerEl) _containerEl = containerEl;
  if (typeof workbenchRefresh === 'function') _workbenchRefresh = workbenchRefresh;
  _isOpen = !_isOpen;
  if (_isOpen) {
    ensureHost(workbenchRefresh);
    const host = getHostElement();
    if (host) {
      host.style.display = 'flex';
      refreshPanel();
    }
  } else {
    const host = getHostElement();
    if (host) host.style.display = 'none';
  }
}

/**
 * 非切换式初始化：由数据编辑器调用，直接设置容器和回调并渲染面板。
 * 不修改 _isOpen 状态（由调用方管理 display）。
 */
export function initAssistantPanel(workbenchRefresh, containerEl, onExternalClose) {
  if (containerEl) _containerEl = containerEl;
  if (typeof workbenchRefresh === 'function') _workbenchRefresh = workbenchRefresh;
  _onExternalClose = onExternalClose || null;
  _isOpen = true;
  refreshPanel();
}

function ensureHost(workbenchRefresh) {
  const container = _containerEl || _getTopDoc().querySelector('.yyt-tde-content') || _getTopDoc().querySelector('.yyt-tww-scroll') || _getTopDoc().querySelector('.yyt-tww');
  if (!container) {
    log.warn('ensureHost: 找不到容器');
    return;
  }

  let host = container.querySelector('#' + ASSISTANT_HOST_ID);
  if (host) return;

  const doc = container.ownerDocument || document;
  host = doc.createElement('div');
  host.id = ASSISTANT_HOST_ID;
  host.style.display = _isOpen ? 'block' : 'none';
  container.appendChild(host);
}

export function getAssistantPanelStyles() {
  return `
    /* inline mode (fallback, when not docked) */
    #yyt-assistant-host:not(.yyt-assistant-dock) { margin-top: 12px; }
    /* shared panel styles */
    .yyt-assistant-panel {
      border: 1px solid var(--yyt-border-strong);
      border-radius: var(--yyt-radius-lg);
      background: var(--yyt-surface);
      color: var(--yyt-text);
      overflow: hidden;
    }
    .yyt-assistant-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 12px;
      background: var(--yyt-surface-2);
      border-bottom: 1px solid var(--yyt-border-strong);
    }
    .yyt-assistant-title { font-weight: 600; color: var(--yyt-text); }
    .yyt-assistant-hint { font-size: 12px; color: var(--yyt-text-secondary); margin-top: 2px; }
    .yyt-assistant-chat {
      max-height: 340px; overflow-y: auto;
      padding: 12px; display: flex; flex-direction: column; gap: 10px;
      background: var(--yyt-bg-base);
    }
    .yyt-assistant-empty {
      text-align: center; padding: 32px 16px; color: var(--yyt-text-muted); font-size: 13px;
      border: 1px dashed var(--yyt-border-strong); border-radius: var(--yyt-radius);
      background: var(--yyt-surface);
    }
    .yyt-assistant-bubble { padding: 10px 12px; border-radius: var(--yyt-radius); max-width: 92%; word-break: break-word; }
    .yyt-assistant-bubble-user {
      align-self: flex-end;
      background: var(--yyt-accent-soft);
      border: 1px solid var(--yyt-border-focus);
    }
    .yyt-assistant-bubble-ai {
      align-self: flex-start;
      background: var(--yyt-surface-2);
      border: 1px solid var(--yyt-border-strong);
    }
    .yyt-assistant-bubble-error {
      align-self: flex-start;
      background: var(--yyt-danger-soft);
      border: 1px solid color-mix(in srgb, var(--yyt-danger) 36%, transparent);
    }
    .yyt-assistant-label { font-size: 11px; font-weight: 600; color: var(--yyt-text-secondary); margin-bottom: 4px; }
    .yyt-assistant-content { font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: var(--yyt-text); }
    .yyt-assistant-toggle {
      font-size: 12px; color: var(--yyt-text-muted); cursor: pointer; margin-top: 6px;
      padding: 4px 0; user-select: none;
    }
    .yyt-assistant-toggle:hover { color: var(--yyt-text-secondary); }
    .yyt-assistant-detail {
      font-size: 12px; line-height: 1.5; margin-top: 6px;
      padding: 8px; border-radius: var(--yyt-radius-sm);
      background: var(--yyt-surface);
      border: 1px solid var(--yyt-border);
    }
    .yyt-assistant-detail ul { margin: 4px 0; padding-left: 16px; }
    .yyt-assistant-detail li { margin: 2px 0; }
    .yyt-assistant-risk-list { display: flex; flex-direction: column; gap: 4px; }
    #yyt-assistant-host .yyt-assistant-risk-item {
      display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer;
      color: var(--yyt-text);
    }
    #yyt-assistant-host input[type="checkbox"] {
      accent-color: var(--yyt-accent);
    }
    .yyt-assistant-apply-btn { margin-top: 8px; }
    .yyt-assistant-footer {
      padding: 10px 12px;
      border-top: 1px solid var(--yyt-border-strong);
      background: var(--yyt-surface-2);
    }
    .yyt-assistant-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .yyt-assistant-inline-field {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--yyt-text-secondary);
      font-size: 12px;
      white-space: nowrap;
    }
    #yyt-assistant-host .yyt-assistant-preset-select {
      width: 160px;
      min-height: 32px;
      padding-top: 6px;
      padding-bottom: 6px;
    }
    #yyt-assistant-host .yyt-assistant-rounds-input {
      width: 64px;
      min-height: 32px;
      padding: 6px 8px;
      text-align: center;
    }
    #yyt-assistant-host .yyt-assistant-textarea {
      width: 100%; min-height: 68px; resize: vertical; box-sizing: border-box;
      padding: 8px; line-height: 1.5;
      background: var(--yyt-control-bg) !important;
      color: var(--yyt-text) !important;
      -webkit-text-fill-color: var(--yyt-text) !important;
    }
    #yyt-assistant-host .yyt-assistant-textarea::placeholder { color: var(--yyt-text-muted); }
    .yyt-assistant-actions { margin-top: 8px; }
    .yyt-assistant-cumulative {
      margin-top: 8px; padding: 8px; border-radius: var(--yyt-radius-sm);
      background: var(--yyt-surface); border: 1px dashed var(--yyt-border-strong);
      font-size: 12px;
    }
    .yyt-assistant-cumulative strong { color: var(--yyt-text-secondary); }
    .yyt-assistant-cumulative-detail { margin-top: 4px; }
  `;
}
