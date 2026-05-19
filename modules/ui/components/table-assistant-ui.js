/**
 * YouYou Toolkit - AI 改表助手 UI 面板
 *
 * 嵌入工作台面板内的聊天式交互界面。
 * 由 table-workbench-window.js 的 data-action="open-assistant" 按钮触发开关。
 */

import { getJQuery, isContainerValid } from '../utils.js';
import { logger } from '../../core/logger-service.js';
import {
  runAssistantSession,
  applyAssistantResult,
  createAssistantSessionGuard,
  AssistantSessionStoppedError,
} from '../../table-engine/table-assistant-service.js';
import { getTableWorkbenchConfig } from '../../table-engine/table-schema-service.js';
import { cloneTableValue } from '../../table-engine/table-types.js';
import { normalizePositiveInt } from '../../table-engine/table-assistant-types.js';

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

      html += `</div>`; // detail

      if (showApply) {
        html += `<button class="yyt-tww-btn yyt-tww-btn-small yyt-assistant-apply-btn" data-turn-id="${escHtml(turn.id)}" ${!allRisksConfirmed ? 'disabled' : ''}>应用到工作台</button>`;
      }

      html += `</div>`; // bubble
      return html;
    }
    return '';
  }).join('');
}

function renderAssistantPanelHtml() {
  const disabled = _isGenerating || !_userInput.trim();
  return `
    <div id="yyt-assistant-panel" class="yyt-assistant-panel">
      <div class="yyt-assistant-header">
        <div>
          <div style="font-weight:600;">AI 改表助手</div>
          <div class="yyt-assistant-hint">当前表：${escHtml(getCurrentTableLabel())}</div>
        </div>
        <button class="yyt-tww-btn yyt-tww-btn-small" data-action="close-assistant">关闭</button>
      </div>
      <div class="yyt-assistant-chat">
        ${renderTranscriptHtml()}
      </div>
      <div class="yyt-assistant-footer">
        <div class="yyt-assistant-controls">
          <label>最大轮次</label>
          <input type="number" min="1" class="yyt-assistant-input" id="yyt-assistant-max-rounds" value="${escHtml(_maxRoundsInput)}">
        </div>
        <textarea class="yyt-assistant-textarea" id="yyt-assistant-input" placeholder="例如：新增一张战利品表，关闭背包物品表的独立导出。">${escHtml(_userInput)}</textarea>
        <div class="yyt-assistant-actions">
          <button class="yyt-tww-btn yyt-tww-btn-primary" id="yyt-assistant-send" ${disabled ? 'disabled' : ''}>${_isGenerating ? '生成中...' : '发送'}</button>
          <button class="yyt-tww-btn yyt-tww-btn-small" id="yyt-assistant-stop" ${!_isGenerating ? 'disabled' : ''}>停止</button>
        </div>
      </div>
    </div>
  `;
}

// ════════════════════════════════════════════════════════════════
// 事件绑定
// ════════════════════════════════════════════════════════════════

function getHostElement() {
  const topDoc = _getTopDoc();
  return topDoc.getElementById(ASSISTANT_HOST_ID);
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

  try {
    const result = await runAssistantSession({
      config: cloneTableValue(config),
      currentTableId,
      userRequest,
      priorTurns,
      apiPreset: _apiPreset,
      maxRounds: normalizePositiveInt(_maxRoundsInput, DEFAULT_MAX_ROUNDS),
      guard: _guardController.createRunGuard(),
      onRoundComplete: (progress) => {
        if (capturedSessionId !== _runningSessionId) return;
        const previewTurn = {
          type: 'assistant',
          id: generateTurnId(),
          draft: progress.round.draft,
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
      compileResult: result.compileResult,
      sessionInfo: result.session ? `${result.session.roundsExecuted}轮 · ${result.session.stopReason}` : '',
      isFinal: true,
      expanded: false,
      riskConfirmations: {},
      result,
    };

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

export function toggleAssistant(workbenchRefresh) {
  _isOpen = !_isOpen;
  if (_isOpen) {
    ensureHost(workbenchRefresh);
    const host = getHostElement();
    if (host) {
      host.style.display = 'block';
      refreshPanel();
    }
  } else {
    const host = getHostElement();
    if (host) host.style.display = 'none';
  }
}

function ensureHost(workbenchRefresh) {
  const topDoc = _getTopDoc();
  let host = topDoc.getElementById(ASSISTANT_HOST_ID);
  if (host) return;

  const container = topDoc.querySelector('.yyt-tww-scroll') || topDoc.querySelector('.yyt-tww');
  if (!container) {
    log.warn('ensureHost: 找不到工作台容器');
    return;
  }

  host = topDoc.createElement('div');
  host.id = ASSISTANT_HOST_ID;
  host.style.display = _isOpen ? 'block' : 'none';
  container.appendChild(host);
}

export function getAssistantPanelStyles() {
  return `
    #yyt-assistant-host { margin-top: 12px; }
    .yyt-assistant-panel {
      border: 1px solid var(--yyt-border, rgba(255,255,255,0.1));
      border-radius: 8px;
      background: var(--yyt-bg-0, #1a1a2e);
      overflow: hidden;
    }
    .yyt-assistant-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 12px;
      border-bottom: 1px solid var(--yyt-border, rgba(255,255,255,0.1));
    }
    .yyt-assistant-hint { font-size: 12px; opacity: 0.6; margin-top: 2px; }
    .yyt-assistant-chat {
      max-height: 340px; overflow-y: auto;
      padding: 12px; display: flex; flex-direction: column; gap: 10px;
    }
    .yyt-assistant-empty {
      text-align: center; padding: 32px 16px; opacity: 0.5; font-size: 13px;
      border: 1px dashed var(--yyt-border, rgba(255,255,255,0.15)); border-radius: 8px;
    }
    .yyt-assistant-bubble { padding: 10px 12px; border-radius: 10px; max-width: 92%; word-break: break-word; }
    .yyt-assistant-bubble-user {
      align-self: flex-end;
      background: color-mix(in srgb, var(--yyt-accent, #6c5ce7) 12%, var(--yyt-bg-1, #222244));
      border: 1px solid color-mix(in srgb, var(--yyt-accent, #6c5ce7) 30%, transparent);
    }
    .yyt-assistant-bubble-ai {
      align-self: flex-start;
      background: var(--yyt-bg-1, #222244);
      border: 1px solid var(--yyt-border, rgba(255,255,255,0.1));
    }
    .yyt-assistant-bubble-error {
      align-self: flex-start;
      background: color-mix(in srgb, #c55 12%, var(--yyt-bg-1, #222244));
      border: 1px solid color-mix(in srgb, #c55 36%, transparent);
    }
    .yyt-assistant-label { font-size: 11px; font-weight: 600; opacity: 0.7; margin-bottom: 4px; }
    .yyt-assistant-content { font-size: 13px; line-height: 1.6; white-space: pre-wrap; }
    .yyt-assistant-toggle {
      font-size: 12px; opacity: 0.7; cursor: pointer; margin-top: 6px;
      padding: 4px 0; user-select: none;
    }
    .yyt-assistant-toggle:hover { opacity: 1; }
    .yyt-assistant-detail {
      font-size: 12px; line-height: 1.5; margin-top: 6px;
      padding: 8px; border-radius: 6px;
      background: var(--yyt-bg-0, #1a1a2e);
      border: 1px solid var(--yyt-border, rgba(255,255,255,0.06));
    }
    .yyt-assistant-detail ul { margin: 4px 0; padding-left: 16px; }
    .yyt-assistant-detail li { margin: 2px 0; }
    .yyt-assistant-risk-list { display: flex; flex-direction: column; gap: 4px; }
    .yyt-assistant-risk-item {
      display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer;
    }
    .yyt-assistant-apply-btn { margin-top: 8px; }
    .yyt-assistant-footer {
      padding: 10px 12px;
      border-top: 1px solid var(--yyt-border, rgba(255,255,255,0.1));
    }
    .yyt-assistant-controls {
      display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
    }
    .yyt-assistant-controls label { font-size: 12px; opacity: 0.7; white-space: nowrap; }
    .yyt-assistant-input {
      width: 56px; text-align: center;
      background: var(--yyt-bg-2, #2a2a3e); border: 1px solid var(--yyt-border, rgba(255,255,255,0.12));
      color: inherit; border-radius: 4px; padding: 3px 6px; font-size: 13px;
    }
    .yyt-assistant-textarea {
      width: 100%; min-height: 68px; resize: vertical; box-sizing: border-box;
      background: var(--yyt-bg-2, #2a2a3e); border: 1px solid var(--yyt-border, rgba(255,255,255,0.12));
      color: inherit; border-radius: 6px; padding: 8px; font-size: 13px; line-height: 1.5;
      font-family: inherit;
    }
    .yyt-assistant-actions {
      display: flex; gap: 8px; margin-top: 6px;
    }
  `;
}
