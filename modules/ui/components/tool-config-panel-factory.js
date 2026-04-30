/**
 * YouYou Toolkit - 工具配置面板工厂
 * @description 为摘要工具 / 状态栏工具生成统一的精简配置面板，减少重复逻辑
 */

import {
  SCRIPT_ID,
  escapeHtml,
  showToast,
  showTopNotice,
  getJQuery,
  isContainerValid,
  createDialogHtml,
  bindDialogEvents,
  destroyEnhancedCustomSelects,
  enhanceNativeSelects
} from '../utils.js';

import {
  getToolFullConfig,
  saveToolConfig,
  getToolBaseConfig
} from '../../tool-registry.js';
import { getAvailableWorldbooks, getCachedAvailableWorldbooks, getLastWorldbookDiagnostics } from '../../tool-worldbook-service.js';

import { getAllPresets } from '../../preset-manager.js';
import { getPresetList as getBypassPresetList } from '../../bypass-manager.js';
import {
  runToolManually,
  previewToolExtraction
} from '../../tool-trigger.js';

export const TOOL_CONFIG_PANEL_STYLES = `
  .yyt-tool-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .yyt-tool-panel-hero {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 16px;
    align-items: stretch;
    padding: 18px 20px;
    border-radius: 26px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.18), transparent 62%),
      linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.025) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 36px rgba(0, 0, 0, 0.16);
  }

  .yyt-tool-panel-hero-copy {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
  }

  .yyt-tool-panel-hero-title {
    font-size: 24px;
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -0.2px;
    color: var(--yyt-text);
  }

  .yyt-tool-panel-hero-desc {
    font-size: 13px;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.8);
    max-width: 64ch;
  }

  .yyt-tool-panel-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .yyt-tool-panel-hero-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-left: 4px;
  }

  /* ---- Sticky action bar ---- */
  .yyt-tool-sticky-bar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 16px;
    margin: -12px -12px 0;
    border-radius: 18px 18px 0 0;
    background:
      linear-gradient(180deg, rgba(11, 15, 21, 0.96) 0%, rgba(11, 15, 21, 0.88) 100%);
    backdrop-filter: blur(12px) saturate(1.2);
    -webkit-backdrop-filter: blur(12px) saturate(1.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    transition: padding 0.22s ease, gap 0.22s ease;
  }

  .yyt-tool-sticky-bar.yyt-compressed {
    padding: 6px 14px;
    gap: 8px;
  }

  .yyt-tool-sticky-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    flex: 1;
  }

  .yyt-tool-sticky-name {
    font-size: 15px;
    font-weight: 800;
    color: var(--yyt-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: font-size 0.22s ease;
  }

  .yyt-tool-sticky-bar.yyt-compressed .yyt-tool-sticky-name {
    font-size: 13px;
  }

  .yyt-tool-sticky-desc {
    font-size: 11px;
    color: var(--yyt-text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: opacity 0.18s ease, max-height 0.22s ease;
  }

  .yyt-tool-sticky-bar.yyt-compressed .yyt-tool-sticky-desc {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
  }

  .yyt-tool-sticky-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    transition: gap 0.22s ease;
  }

  .yyt-tool-sticky-bar.yyt-compressed .yyt-sticky-btn-label {
    display: none;
  }

  .yyt-tool-sticky-bar.yyt-compressed .yyt-tool-sticky-actions .yyt-btn {
    padding: 6px 10px;
    min-height: 30px;
    font-size: 11px;
    gap: 4px;
  }

  /* ---- Section anchor nav ---- */
  .yyt-tool-section-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 4px 0;
  }

  .yyt-tool-section-nav-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 7px 11px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
    color: var(--yyt-text-secondary);
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    text-decoration: none;
  }

  .yyt-tool-section-nav-item:hover {
    color: var(--yyt-text);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .yyt-tool-section-nav-item i {
    font-size: 10px;
  }

  .yyt-tool-save-top {
    white-space: nowrap;
  }

  .yyt-tool-hero-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    border: 1px solid rgba(255, 255, 255, 0.1);
    letter-spacing: 0.38px;
    color: var(--yyt-text);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .yyt-tool-compact-hint {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.74);
    line-height: 1.7;
  }

  .yyt-hidden {
    display: none !important;
  }

  .yyt-code-textarea {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.7;
    tab-size: 2;
    min-height: 180px;
  }

  .yyt-code-textarea-small {
    min-height: 108px;
  }

  .yyt-select-multiple {
    min-height: 120px;
  }

  .yyt-worldbook-select {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(12, 16, 24, 0.42);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 12px 28px rgba(0, 0, 0, 0.14);
  }

  .yyt-worldbook-summary {
    font-size: 13px;
    color: var(--yyt-text);
    line-height: 1.7;
    font-weight: 800;
  }

  .yyt-worldbook-dropdown {
    position: static;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: none;
    overflow: visible;
    opacity: 1;
    border: none;
    box-shadow: none;
    background: transparent;
  }

  .yyt-worldbook-search {
    width: 100%;
  }

  .yyt-worldbook-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 260px;
    overflow: auto;
    padding-right: 2px;
  }

  .yyt-worldbook-item {
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.06);
    transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
  }

  .yyt-worldbook-item:hover {
    border-color: rgba(123, 183, 255, 0.22);
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  .yyt-worldbook-empty {
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.035);
  }

  .yyt-code-textarea:focus {
    border-color: var(--yyt-accent);
    box-shadow: var(--yyt-focus-ring), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .yyt-title-actions {
    margin-left: auto;
  }

  .yyt-tool-manual-area {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(240px, 0.75fr);
    gap: 14px;
    align-items: start;
  }

  .yyt-tool-runtime-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 18px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(255, 255, 255, 0.01);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 22px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 30px rgba(0, 0, 0, 0.12);
  }

  .yyt-tool-runtime-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .yyt-tool-runtime-line:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .yyt-tool-runtime-label {
    color: rgba(255, 255, 255, 0.56);
    flex-shrink: 0;
    font-weight: 800;
    letter-spacing: 0.2px;
  }

  .yyt-tool-runtime-value {
    color: var(--yyt-text);
    text-align: right;
    word-break: break-word;
  }

  .yyt-tool-runtime-badge {
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.45px;
  }

  .yyt-status-idle {
    color: var(--yyt-text);
    background: rgba(255, 255, 255, 0.08);
  }

  .yyt-status-running {
    color: var(--yyt-accent-strong);
    background: rgba(123, 183, 255, 0.18);
  }

  .yyt-status-success {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.18);
  }

  .yyt-status-error {
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.18);
  }

  .yyt-tool-runtime-error .yyt-tool-runtime-value {
    color: var(--yyt-error);
  }

  .yyt-tool-manual-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    padding: 18px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(255, 255, 255, 0.01);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 30px rgba(0, 0, 0, 0.12);
  }

  .yyt-preview-box {
    padding: 10px 12px;
    border-radius: var(--yyt-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(0, 0, 0, 0.2);
    color: var(--yyt-text);
    font-size: 12px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .yyt-preview-pre {
    max-height: 220px;
    overflow: auto;
    margin: 0;
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  }

  .yyt-preview-message-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-preview-message-item {
    padding: 12px;
    border-radius: var(--yyt-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-preview-message-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--yyt-accent);
  }

  .yyt-tool-macro-hint {
    font-size: 12px;
    color: var(--yyt-text-muted);
    line-height: 1.7;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px dashed rgba(123, 183, 255, 0.25);
    background: rgba(123, 183, 255, 0.06);
  }

  .yyt-tool-macro-hint code {
    color: var(--yyt-accent);
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  }

  .yyt-error {
    padding: 20px;
    text-align: center;
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    border-radius: var(--yyt-radius-sm);
  }

  .yyt-panel-footer-end {
    justify-content: flex-end;
  }

  .yyt-tool-debug-panel {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.02);
  }

  .yyt-tool-debug-summary {
    cursor: pointer;
    list-style: none;
    font-size: 12px;
    font-weight: 700;
    color: var(--yyt-text-secondary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .yyt-tool-debug-summary::-webkit-details-marker {
    display: none;
  }

  .yyt-tool-debug-summary::before {
    content: '▸';
    color: var(--yyt-accent);
    transition: transform 0.18s ease;
  }

  .yyt-tool-debug-panel[open] .yyt-tool-debug-summary::before {
    transform: rotate(90deg);
  }

  .yyt-tool-debug-content {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .yyt-tool-debug-history {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 6px;
  }

  .yyt-tool-debug-history-title {
    font-size: 11px;
    font-weight: 700;
    color: var(--yyt-text-secondary);
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .yyt-tool-debug-history-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .yyt-tool-debug-history-item {
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .yyt-tool-debug-history-meta {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-debug-history-main {
    font-size: 12px;
    color: var(--yyt-text);
    line-height: 1.6;
    word-break: break-word;
  }

  .yyt-tool-debug-history-empty {
    font-size: 12px;
    color: var(--yyt-text-muted);
  }

  .yyt-tool-debug-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-end;
  }

  .yyt-tool-debug-chip-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .yyt-tool-debug-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-debug-chip-warning {
    color: var(--yyt-warning, #fbbf24);
    background: rgba(251, 191, 36, 0.12);
    border-color: rgba(251, 191, 36, 0.28);
  }

  .yyt-tool-debug-chip-ok {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.12);
    border-color: rgba(74, 222, 128, 0.28);
  }

  .yyt-tool-debug-content .yyt-tool-runtime-line {
    padding-top: 0;
  }

  @media screen and (max-width: 768px) {
    .yyt-tool-panel-hero {
      grid-template-columns: 1fr;
    }

    .yyt-tool-panel-hero-tags {
      justify-content: flex-start;
    }

    .yyt-tool-manual-area {
      grid-template-columns: 1fr;
    }

    .yyt-tool-manual-actions {
      min-width: 0;
    }
  }
`;

export function createToolConfigPanel(options) {
  const {
    id,
    toolId,
    postResponseHint,
    extractionPlaceholder,
    previewDialogId,
    previewTitle = '测试提取结果',
    toolKindLabel = 'AI 工具'
  } = options;

  return {
    id,
    toolId,
    renderSessionId: 0,

    _beginRenderSession($container) {
      this.renderSessionId = (this.renderSessionId || 0) + 1;
      if (isContainerValid($container)) {
        $container.data('yytRenderSessionId', this.renderSessionId);
      }
      return this.renderSessionId;
    },

    _isRenderSessionActive($container, sessionId) {
      return isContainerValid($container) && $container.data('yytRenderSessionId') === sessionId;
    },

    _renderIfSessionActive($container, sessionId) {
      if (!this._isRenderSessionActive($container, sessionId)) {
        return false;
      }
      this.renderTo($container);
      return true;
    },

    render() {
      const config = getToolFullConfig(this.toolId);

      if (!config) {
        return `<div class="yyt-error">工具配置加载失败</div>`;
      }

      const apiPresets = this._getApiPresets();
      const selectedApiPreset = config.output?.apiPreset || config.apiPreset || '';
      const bypassPresets = this._getBypassPresets();
      const outputMode = config.output?.mode || 'follow_ai';
      const bypassEnabled = config.bypass?.enabled || false;
      const bypassPresetId = config.bypass?.presetId || '';
      const runtimeStatus = config.runtime?.lastStatus || 'idle';
      const lastRunText = config.runtime?.lastRunAt
        ? new Date(config.runtime.lastRunAt).toLocaleString()
        : '未运行';
      const lastError = config.runtime?.lastError || '';
      const extraction = config.extraction || {};
      const automation = config.automation || {};
      const worldbooks = config.worldbooks || {};
      const selectedWorldbooks = Array.isArray(this.draftSelectedWorldbooks)
        ? this.draftSelectedWorldbooks
        : (Array.isArray(worldbooks.selected) ? worldbooks.selected : []);
      const availableWorldbooks = Array.isArray(this.availableWorldbooks) ? this.availableWorldbooks : [];
      const worldbookFilter = String(this.worldbookFilter || '').trim().toLowerCase();
      const visibleWorldbooks = worldbookFilter
        ? availableWorldbooks.filter((bookName) => String(bookName || '').toLowerCase().includes(worldbookFilter))
        : availableWorldbooks;
      const selectedWorldbookSummary = selectedWorldbooks.length === 0
        ? '选择要注入的世界书'
        : selectedWorldbooks.length <= 2
          ? selectedWorldbooks.join('、')
          : `已选 ${selectedWorldbooks.length} 项：${selectedWorldbooks.slice(0, 2).join('、')} 等`;
      const selectorText = Array.isArray(extraction.selectors) ? extraction.selectors.join('\n') : '';
      const modeText = outputMode === 'post_response_api'
        ? postResponseHint
        : '随 AI 输出模式不会额外请求模型，但仍然支持手动执行与测试提取。';
      const outputModeLabel = outputMode === 'post_response_api' ? '额外解析' : '随 AI 输出';
      const autoEligible = outputMode === 'post_response_api';
      const apiPresetLabel = selectedApiPreset || '当前配置';

      return `
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-sticky-bar" id="${SCRIPT_ID}-tool-sticky-bar">
            <div class="yyt-tool-sticky-left">
              <span class="yyt-tool-sticky-name">${escapeHtml(config.name || this.toolId)}</span>
              <span class="yyt-tool-runtime-badge yyt-status-${escapeHtml(runtimeStatus)}">${escapeHtml(runtimeStatus)}</span>
            </div>
            <div class="yyt-tool-sticky-actions">
              <button class="yyt-btn yyt-btn-primary yyt-btn-small" id="${SCRIPT_ID}-tool-run-manual-top">
                <i class="fa-solid fa-play"></i> <span class="yyt-sticky-btn-label">立即执行</span>
              </button>
              <button class="yyt-btn yyt-btn-secondary yyt-btn-small" id="${SCRIPT_ID}-tool-preview-extraction-top">
                <i class="fa-solid fa-vial"></i> <span class="yyt-sticky-btn-label">测试提取</span>
              </button>
              <button class="yyt-btn yyt-btn-secondary yyt-btn-small" id="${SCRIPT_ID}-tool-save-top">
                <i class="fa-solid fa-save"></i> <span class="yyt-sticky-btn-label">保存</span>
              </button>
            </div>
          </div>

          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${escapeHtml(config.name || this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${escapeHtml(config.description || '配置模板、提取规则、API 预设与手动调试能力。')}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">模式 ${escapeHtml(outputModeLabel)}</span>
              <span class="yyt-tool-hero-chip">预设 ${escapeHtml(apiPresetLabel)}</span>
              <span class="yyt-tool-hero-chip">最近状态 ${escapeHtml(runtimeStatus)}</span>
            </div>
          </div>

          <div class="yyt-tool-section-nav">
            <span class="yyt-tool-section-nav-item" data-scroll-to="section-output-mode"><i class="fa-solid fa-wand-magic-sparkles"></i> 输出模式</span>
            <span class="yyt-tool-section-nav-item" data-scroll-to="section-api-preset"><i class="fa-solid fa-database"></i> API预设</span>
            <span class="yyt-tool-section-nav-item" data-scroll-to="section-bypass"><i class="fa-solid fa-shield-halved"></i> Ai指令</span>
            <span class="yyt-tool-section-nav-item" data-scroll-to="section-worldbook"><i class="fa-solid fa-book-open"></i> 世界书</span>
            <span class="yyt-tool-section-nav-item" data-scroll-to="section-extraction"><i class="fa-solid fa-filter"></i> 提取</span>
            <span class="yyt-tool-section-nav-item" data-scroll-to="section-automation"><i class="fa-solid fa-bolt"></i> 自动触发</span>
            <span class="yyt-tool-section-nav-item" data-scroll-to="section-template"><i class="fa-solid fa-file-code"></i> 模板</span>
            <span class="yyt-tool-section-nav-item" data-scroll-to="section-manual"><i class="fa-solid fa-hand-pointer"></i> 操作</span>
          </div>

          <div class="yyt-panel-section" id="${SCRIPT_ID}-section-output-mode">
            <div class="yyt-section-title">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>输出模式</span>
            </div>
            <div class="yyt-form-group">
              <label>输出模式</label>
              <select class="yyt-select" id="${SCRIPT_ID}-tool-output-mode">
                <option value="follow_ai" ${outputMode === 'follow_ai' ? 'selected' : ''}>随 AI 输出（支持手动执行）</option>
                <option value="post_response_api" ${outputMode === 'post_response_api' ? 'selected' : ''}>额外 AI 模型解析</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${modeText}${autoEligible ? ' 当前模式会参与自动触发，仍需在全局设置中开启自动化。' : ''}</div>
            </div>
          </div>

          <div class="yyt-panel-section" id="${SCRIPT_ID}-section-api-preset">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API 预设</span>
            </div>
            <div class="yyt-form-group">
              <label>解析使用的 API 预设</label>
              <select class="yyt-select" id="${SCRIPT_ID}-tool-api-preset">
                <option value="">使用当前API配置</option>
                ${apiPresets.map((preset) => `
                  <option value="${escapeHtml(preset.name)}" ${preset.name === selectedApiPreset ? 'selected' : ''}>
                    ${escapeHtml(preset.name)}
                  </option>
                `).join('')}
              </select>
              <div class="yyt-tool-compact-hint">仅在“额外 AI 模型解析”模式下生效。</div>
            </div>
          </div>

          <div class="yyt-panel-section" id="${SCRIPT_ID}-section-bypass">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shield-halved"></i>
              <span>Ai指令预设</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${SCRIPT_ID}-tool-bypass-enabled" ${bypassEnabled ? 'checked' : ''}>
                <span>启用 Ai 指令预设</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${bypassEnabled ? '' : 'yyt-hidden'}">
              <label>绑定 Ai 指令预设</label>
              <select class="yyt-select" id="${SCRIPT_ID}-tool-bypass-preset">
                <option value="">选择预设</option>
                ${bypassPresets.map((preset) => `
                  <option value="${escapeHtml(preset.id)}" ${preset.id === bypassPresetId ? 'selected' : ''}>
                    ${escapeHtml(preset.name)}${preset.isDefault ? ' [默认]' : ''}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>


          <div class="yyt-panel-section" id="${SCRIPT_ID}-section-worldbook">
            <div class="yyt-section-title">
              <i class="fa-solid fa-book-open"></i>
              <span>世界书注入</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${SCRIPT_ID}-tool-worldbooks-enabled" ${worldbooks.enabled ? 'checked' : ''}>
                <span>启用世界书注入</span>
              </label>
            </div>
            <div class="yyt-form-group">
              <label>选择要注入的世界书（可多选）</label>
              <div class="yyt-worldbook-select" id="${SCRIPT_ID}-tool-worldbook-select">
                <div class="yyt-worldbook-summary">${escapeHtml(selectedWorldbookSummary)}</div>
                <div class="yyt-worldbook-dropdown" id="${SCRIPT_ID}-tool-worldbook-dropdown">
                  <input type="text" class="yyt-input yyt-worldbook-search" id="${SCRIPT_ID}-tool-worldbook-search" placeholder="搜索世界书..." value="${escapeHtml(this.worldbookFilter || '')}">
                  <div class="yyt-worldbook-list" id="${SCRIPT_ID}-tool-worldbooks">
                    ${availableWorldbooks.length > 0 ? (visibleWorldbooks.length > 0 ? visibleWorldbooks.map((bookName) => `
                      <div class="yyt-worldbook-item">
                        <label class="yyt-checkbox-label">
                          <input type="checkbox" data-worldbook-name="${escapeHtml(bookName)}" ${selectedWorldbooks.includes(bookName) ? 'checked' : ''}>
                          <span>${escapeHtml(bookName)}</span>
                        </label>
                      </div>
                    `).join('') : '<div class="yyt-tool-compact-hint yyt-worldbook-empty">未找到匹配世界书。</div>') : `<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState === 'loading' ? '世界书加载中…' : '当前未读取到可用世界书。'}</div>`}
                  </div>
                  ${this.worldbookLoadState !== 'ready' ? `
                    <details class="yyt-worldbook-diagnostics">
                      <summary>查看世界书诊断</summary>
                      <pre class="yyt-preview-box yyt-preview-pre">${escapeHtml(JSON.stringify(getLastWorldbookDiagnostics() || {
                        state: this.worldbookLoadState || 'idle',
                        message: '尚未生成诊断信息'
                      }, null, 2))}</pre>
                    </details>
                  ` : ''}
                </div>
              </div>
              <div class="yyt-tool-compact-hint">只有模板里显式写入 <code>{{toolWorldbookContent}}</code> 时，所选世界书内容才会注入。</div>
            </div>
          </div>

          <div class="yyt-panel-section" id="${SCRIPT_ID}-section-extraction">
            <div class="yyt-section-title">
              <i class="fa-solid fa-filter"></i>
              <span>提取配置</span>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>最大提取 AI 消息数</label>
                <input type="number" class="yyt-input" id="${SCRIPT_ID}-tool-max-messages" min="1" max="50" value="${Number(extraction.maxMessages) || 5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>提取标签 / 正则</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${SCRIPT_ID}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${escapeHtml(extractionPlaceholder)}">${escapeHtml(selectorText)}</textarea>
              <div class="yyt-tool-compact-hint">每行一个规则。普通文本按标签提取；以 <code>regex:</code> 开头时按正则第一捕获组提取。</div>
            </div>
          </div>

          <div class="yyt-panel-section" id="${SCRIPT_ID}-section-automation">
            <div class="yyt-section-title">
              <i class="fa-solid fa-bolt"></i>
              <span>自动触发</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${SCRIPT_ID}-tool-automation-enabled" ${automation.enabled ? 'checked' : ''}>
                <span>允许当前工具参与自动触发</span>
              </label>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>等待稳定时间 (ms)</label>
                <input type="number" class="yyt-input" id="${SCRIPT_ID}-tool-automation-settle-ms" min="0" max="10000" step="100" value="${Number(automation.settleMs) || 1200}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>冷却时间 (ms)</label>
                <input type="number" class="yyt-input" id="${SCRIPT_ID}-tool-automation-cooldown-ms" min="0" max="60000" step="100" value="${Number(automation.cooldownMs) || 5000}">
              </div>
            </div>
            <div class="yyt-tool-compact-hint">只有同时满足“当前工具启用自动触发”“输出模式为额外 AI 模型解析”“全局自动化开启”时，才会在 AI 回复后自动执行。</div>
          </div>

          <div class="yyt-panel-section" id="${SCRIPT_ID}-section-template">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>模板修改框</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${SCRIPT_ID}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> 重置模板
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${SCRIPT_ID}-tool-prompt-template"
                        rows="12"
                        placeholder="输入提示词模板...">${escapeHtml(config.promptTemplate || '')}</textarea>
              <div class="yyt-tool-compact-hint">这里直接填写发送给额外解析模型的完整模板；可在正文中显式使用 <code>{{toolContentMacro}}</code>、<code>{{toolWorldbookContent}}</code>、<code>{{lastAiMessage}}</code>、<code>{{userMessage}}</code> 等宏。</div>
            </div>
          </div>

          <div class="yyt-panel-section" id="${SCRIPT_ID}-section-manual">
            <div class="yyt-section-title">
              <i class="fa-solid fa-hand-pointer"></i>
              <span>手动操作区</span>
            </div>
            <div class="yyt-tool-manual-area">
              <div class="yyt-tool-runtime-card">
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">当前状态</span>
                  <span class="yyt-tool-runtime-badge yyt-status-${escapeHtml(runtimeStatus)}">${escapeHtml(runtimeStatus)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">最近运行</span>
                  <span class="yyt-tool-runtime-value">${escapeHtml(lastRunText)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">成功 / 失败</span>
                  <span class="yyt-tool-runtime-value">${config.runtime?.successCount || 0} / ${config.runtime?.errorCount || 0}</span>
                </div>
                ${lastError ? `
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">最近错误</span>
                    <span class="yyt-tool-runtime-value">${escapeHtml(lastError)}</span>
                  </div>
                ` : ''}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> 立即执行一次
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> 测试提取
                </button>
                <div class="yyt-tool-compact-hint">用于手动验证当前模板、API预设和 Ai 指令预设是否能正常工作。</div>
              </div>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            说明：工具会把当前模板解析后作为最终用户请求发送给额外模型；若启用了 Ai 指令预设，则会作为前置消息一并发送。可用宏包括 <code>{{toolPromptMacro}}</code>、<code>{{toolContentMacro}}</code>、<code>{{toolWorldbookContent}}</code>、<code>{{lastAiMessage}}</code>、<code>{{recentMessagesText}}</code>、<code>{{rawRecentMessagesText}}</code>、<code>{{userMessage}}</code>、<code>{{toolName}}</code>、<code>{{toolId}}</code>。
          </div>
        </div>
      `;
    },

    _getApiPresets() {
      try {
        return getAllPresets() || [];
      } catch (error) {
        return [];
      }
    },

    _getBypassPresets() {
      try {
        return getBypassPresetList() || [];
      } catch (error) {
        return [];
      }
    },

    async _loadWorldbooks() {
      const maxAttempts = 10;
      const retryDelayMs = 400;
      this.worldbookLoadState = 'loading';

      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        try {
          const worldbooks = await getAvailableWorldbooks();
          if (Array.isArray(worldbooks) && worldbooks.length > 0) {
            this.availableWorldbooks = worldbooks;
            this.worldbookLoadState = 'ready';
            return this.availableWorldbooks;
          }
        } catch (error) {
          this.availableWorldbooks = getCachedAvailableWorldbooks();
        }

        if (attempt < maxAttempts - 1) {
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
      }

      this.availableWorldbooks = getCachedAvailableWorldbooks();
      this.worldbookLoadState = 'empty';
      return this.availableWorldbooks;
    },

    _getFormData($container) {
      const $ = getJQuery();
      const currentConfig = getToolFullConfig(this.toolId) || {};
      if (!$ || !isContainerValid($container)) {
        return currentConfig;
      }
      const outputMode = $container.find(`#${SCRIPT_ID}-tool-output-mode`).val() || 'follow_ai';
      const bypassEnabled = $container.find(`#${SCRIPT_ID}-tool-bypass-enabled`).is(':checked');
      const postResponseEnabled = outputMode === 'post_response_api';
      const automationEnabled = postResponseEnabled && $container.find(`#${SCRIPT_ID}-tool-automation-enabled`).is(':checked');
      const selectorLines = ($container.find(`#${SCRIPT_ID}-tool-extraction-selectors`).val() || '')
        .split(/\r?\n/)
        .map(item => item.trim())
        .filter(Boolean);

      const selectedWorldbooks = $container.find(`[data-worldbook-name]:checked`).map((_, element) =>
        String($(element).data('worldbook-name') || '').trim()
      ).get().filter(Boolean);

      return {
        enabled: currentConfig?.enabled !== false,
        promptTemplate: $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val() || '',
        apiPreset: $container.find(`#${SCRIPT_ID}-tool-api-preset`).val() || '',
        extractTags: selectorLines,
        output: {
          mode: outputMode,
          apiPreset: $container.find(`#${SCRIPT_ID}-tool-api-preset`).val() || '',
          overwrite: true,
          enabled: postResponseEnabled
        },
        automation: {
          enabled: automationEnabled,
          settleMs: Math.max(0, parseInt($container.find(`#${SCRIPT_ID}-tool-automation-settle-ms`).val(), 10) || 1200),
          cooldownMs: Math.max(0, parseInt($container.find(`#${SCRIPT_ID}-tool-automation-cooldown-ms`).val(), 10) || 5000)
        },
        bypass: {
          enabled: bypassEnabled,
          presetId: bypassEnabled ? ($container.find(`#${SCRIPT_ID}-tool-bypass-preset`).val() || '') : ''
        },
        worldbooks: {
          enabled: $container.find(`#${SCRIPT_ID}-tool-worldbooks-enabled`).is(':checked'),
          selected: selectedWorldbooks
        },
        extraction: {
          enabled: true,
          maxMessages: Math.max(1, parseInt($container.find(`#${SCRIPT_ID}-tool-max-messages`).val(), 10) || 5),
          selectors: selectorLines
        }
      };
    },

    _showExtractionPreview($container, result, sessionId = null) {
      const $ = getJQuery();
      if (!$) return;
      if (sessionId !== null && !this._isRenderSessionActive($container, sessionId)) return;

      const dialogId = `${SCRIPT_ID}-${previewDialogId}`;
      const messageEntries = Array.isArray(result.messageEntries) ? result.messageEntries : [];
      const messageEntriesHtml = messageEntries.length > 0
        ? `
          <div class="yyt-form-group">
            <label>逐条消息预览</label>
            <div class="yyt-preview-message-list">
              ${messageEntries.map((entry, index) => {
                const recencyLabel = index === messageEntries.length - 1
                  ? '最新消息'
                  : `最近的第 ${messageEntries.length - index} 条消息`;
                return `
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${recencyLabel}</div>
                  <div>
                    <label>原文</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${escapeHtml(entry.rawText || '无可用消息')}</pre>
                  </div>
                  <div>
                    <label>正文提取</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${escapeHtml(entry.filteredText || '正文规则未命中')}</pre>
                  </div>
                  <div>
                    <label>工具标签提取</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${escapeHtml(entry.extractedText || '未提取到内容')}</pre>
                  </div>
                </div>
              `;
              }).join('')}
            </div>
          </div>
        `
        : '';

      $container.append(createDialogHtml({
        id: dialogId,
        title: previewTitle,
        width: '720px',
        wide: true,
        body: `
          <div class="yyt-form-group">
            <label>提取规则</label>
            <div class="yyt-preview-box">${escapeHtml((result.selectors || []).join('\n') || '无')}</div>
          </div>
          <div class="yyt-form-group">
            <label>原始内容汇总（按最近消息到更早消息）</label>
            <pre class="yyt-preview-box yyt-preview-pre">${escapeHtml(result.sourceText || '无可用消息')}</pre>
          </div>
          <div class="yyt-form-group">
            <label>正文提取汇总</label>
            <pre class="yyt-preview-box yyt-preview-pre">${escapeHtml(result.filteredSourceText || '正文规则未命中')}</pre>
          </div>
          <div class="yyt-form-group">
            <label>工具标签提取汇总</label>
            <pre class="yyt-preview-box yyt-preview-pre">${escapeHtml(result.extractedText || '未提取到内容')}</pre>
          </div>
          ${messageEntriesHtml}
        `
      }));

      bindDialogEvents($container, dialogId, {
        onSave: (closeDialog) => closeDialog()
      });

      $container.find(`#${dialogId}-save`).text('关闭');
      $container.find(`#${dialogId}-cancel`).remove();
    },

    bindEvents($container) {
      const $ = getJQuery();
      if (!$ || !isContainerValid($container)) return;

      const self = this;
      const sessionId = $container.data('yytRenderSessionId');

      const getSelectedWorldbooks = () => $container.find(`[data-worldbook-name]:checked`).map((_, element) =>
        String($(element).data('worldbook-name') || '').trim()
      ).get().filter(Boolean);

      const syncWorldbookSummary = () => {
        const selectedWorldbooks = getSelectedWorldbooks();

        const summary = selectedWorldbooks.length === 0
          ? '选择要注入的世界书'
          : selectedWorldbooks.length <= 2
            ? selectedWorldbooks.join('、')
            : `已选 ${selectedWorldbooks.length} 项：${selectedWorldbooks.slice(0, 2).join('、')} 等`;

        $container.find('.yyt-worldbook-summary').text(summary);
      };

      const syncWorldbookFilter = () => {
        const filterText = String(this.worldbookFilter || '').trim().toLowerCase();
        const $list = $container.find(`#${SCRIPT_ID}-tool-worldbooks`);
        const $items = $list.find('.yyt-worldbook-item');
        let visibleCount = 0;

        $items.each((_, element) => {
          const $item = $(element);
          const bookName = String($item.find('[data-worldbook-name]').data('worldbook-name') || '').toLowerCase();
          const matched = !filterText || bookName.includes(filterText);
          $item.toggleClass('yyt-hidden', !matched);
          if (matched) {
            visibleCount += 1;
          }
        });

        $list.find('.yyt-worldbook-search-empty').remove();
        if ($items.length > 0 && visibleCount === 0) {
          $list.append('<div class="yyt-tool-compact-hint yyt-worldbook-empty yyt-worldbook-search-empty">未找到匹配世界书。</div>');
        }
      };

      // 使用事件委托绑定所有按钮事件，避免异步重新渲染导致事件丢失
      $container.off('.yytToolPanel');

      $container.on('input.yytToolPanel', `#${SCRIPT_ID}-tool-worldbook-search`, (event) => {
        this.worldbookFilter = String($(event.currentTarget).val() || '');
        syncWorldbookFilter();
      });

      syncWorldbookFilter();

      $container.on('change.yytToolPanel', `[data-worldbook-name]`, () => {
        this.draftSelectedWorldbooks = getSelectedWorldbooks();
        syncWorldbookSummary();
      });

      $container.on('change.yytToolPanel', `#${SCRIPT_ID}-tool-output-mode`, () => {
        const mode = $container.find(`#${SCRIPT_ID}-tool-output-mode`).val() || 'follow_ai';
        const modeText = mode === 'post_response_api'
          ? `${postResponseHint} 当前模式会参与自动触发，记得同时开启全局自动化。`
          : '随 AI 输出模式不会额外请求模型，但仍然支持手动执行与测试提取。';
        $container.find('.yyt-tool-mode-hint').text(modeText);
      });

      $container.on('change.yytToolPanel', `#${SCRIPT_ID}-tool-bypass-enabled`, (event) => {
        const enabled = $(event.currentTarget).is(':checked');
        $container.find('.yyt-bypass-preset-select').toggleClass('yyt-hidden', !enabled);
      });

      $container.on('click.yytToolPanel', `#${SCRIPT_ID}-tool-save, #${SCRIPT_ID}-tool-save-top`, () => {
        self._saveConfig($container, { silent: false });
      });

      $container.on('click.yytToolPanel', `#${SCRIPT_ID}-tool-reset-template`, () => {
        const baseConfig = getToolBaseConfig(self.toolId);
        if (baseConfig?.promptTemplate) {
          $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(baseConfig.promptTemplate);
          showToast('info', '模板已重置');
        }
      });

      $container.on('click.yytToolPanel', `#${SCRIPT_ID}-tool-run-manual, #${SCRIPT_ID}-tool-run-manual-top`, async () => {
        const saveSuccess = self._saveConfig($container, { silent: true });
        if (!saveSuccess) {
          return;
        }

        try {
          const result = await runToolManually(self.toolId);
          if (!self._isRenderSessionActive($container, sessionId)) {
            return;
          }
          if (!result?.success && result?.error) {
            showTopNotice('warning', result.error, {
              duration: 3200,
              noticeId: `yyt-tool-run-${self.toolId}`
            });
          }
        } catch (error) {
          if (!self._isRenderSessionActive($container, sessionId)) {
            return;
          }
          showToast('error', error?.message || '手动执行失败');
        } finally {
          self._renderIfSessionActive($container, sessionId);
        }
      });

      $container.on('click.yytToolPanel', `#${SCRIPT_ID}-tool-preview-extraction, #${SCRIPT_ID}-tool-preview-extraction-top`, async () => {
        const saveSuccess = self._saveConfig($container, { silent: true });
        if (!saveSuccess) {
          return;
        }

        try {
          const result = await previewToolExtraction(self.toolId);
          if (!self._isRenderSessionActive($container, sessionId)) {
            return;
          }
          if (!result?.success) {
            showToast('error', result?.error || '测试提取失败');
            return;
          }
          self._showExtractionPreview($container, result, sessionId);
        } catch (error) {
          if (!self._isRenderSessionActive($container, sessionId)) {
            return;
          }
          showToast('error', error?.message || '测试提取失败');
        }
      });

      enhanceNativeSelects($container, {
        namespace: 'yytToolPanelSelect',
        selectors: [
          `#${SCRIPT_ID}-tool-output-mode`,
          `#${SCRIPT_ID}-tool-api-preset`,
          `#${SCRIPT_ID}-tool-bypass-preset`
        ]
      });

      // ---- Scroll compression: sticky bar shrinks when hero scrolls out ----
      const $stickyBar = $container.find('.yyt-tool-sticky-bar');
      const $hero = $container.find('.yyt-tool-panel-hero');
      if ($stickyBar.length && $hero.length) {
        const heroObserver = new IntersectionObserver((entries) => {
          $stickyBar.toggleClass('yyt-compressed', !entries[0].isIntersecting);
        }, { threshold: 0 });
        heroObserver.observe($hero[0]);
        $container.data('yytHeroObserver', heroObserver);
      }

      // ---- Section nav: smooth scroll to section ----
      $container.on('click.yytToolPanel', '.yyt-tool-section-nav-item', function() {
        const targetId = $(this).data('scroll-to');
        const $target = $container.find(`#${targetId}`);
        if ($target.length) {
          $target[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    },

    _saveConfig($container, options = {}) {
      const config = this._getFormData($container);
      const { silent = false } = options;
      const success = saveToolConfig(this.toolId, config);
      if (success) {
        this.draftSelectedWorldbooks = Array.isArray(config.worldbooks?.selected)
          ? [...config.worldbooks.selected]
          : [];
      }

      if (success) {
        if (!silent) {
          showToast('success', '配置已保存');
        }
      } else {
        showToast('error', '保存失败');
      }

      return success;
    },

    destroy($container) {
      const $ = getJQuery();
      if (!$ || !isContainerValid($container)) return;
      this.renderSessionId = (this.renderSessionId || 0) + 1;
      $container.removeData('yytRenderSessionId');
      const heroObserver = $container.data('yytHeroObserver');
      if (heroObserver) {
        heroObserver.disconnect();
        $container.removeData('yytHeroObserver');
      }
      destroyEnhancedCustomSelects($container, 'yytToolPanelSelect');
      $container.off('.yytToolPanel');
    },

    getStyles() {
      return TOOL_CONFIG_PANEL_STYLES;
    },

    renderTo($container) {
      const $ = getJQuery();
      if (!$ || !isContainerValid($container)) return;

      const sessionId = this._beginRenderSession($container);
      this.worldbookFilter = this.worldbookFilter || '';
      if (!Array.isArray(this.draftSelectedWorldbooks)) {
        const config = getToolFullConfig(this.toolId);
        this.draftSelectedWorldbooks = Array.isArray(config?.worldbooks?.selected)
          ? [...config.worldbooks.selected]
          : [];
      }

      // 尝试先使用缓存的世界书数据
      const cachedWorldbooks = getCachedAvailableWorldbooks();
      if (Array.isArray(cachedWorldbooks) && cachedWorldbooks.length > 0) {
        this.availableWorldbooks = cachedWorldbooks;
        this.worldbookLoadState = 'ready';
      } else {
        this.worldbookLoadState = 'loading';
      }

      // 渲染并绑定事件
      $container.html(this.render({}));
      this.bindEvents($container, {});

      // 异步加载世界书（如果需要）
      if (this.worldbookLoadState === 'loading') {
        Promise.resolve(this._loadWorldbooks())
          .catch(() => {
            this.worldbookLoadState = 'empty';
            return getCachedAvailableWorldbooks();
          })
          .then((worldbooks) => {
            if (!this._isRenderSessionActive($container, sessionId)) return;

            this.availableWorldbooks = Array.isArray(worldbooks) ? worldbooks : [];

            this._updateWorldbookList($container, sessionId);
          });
      }
    },

    _updateWorldbookList($container, sessionId = null) {
      const $ = getJQuery();
      if (!$ || !isContainerValid($container)) return;
      if (sessionId !== null && !this._isRenderSessionActive($container, sessionId)) return;

      const worldbookFilter = String(this.worldbookFilter || '').trim().toLowerCase();
      const availableWorldbooks = Array.isArray(this.availableWorldbooks) ? this.availableWorldbooks : [];
      const selectedWorldbooks = Array.isArray(this.draftSelectedWorldbooks) ? this.draftSelectedWorldbooks : [];
      const visibleWorldbooks = worldbookFilter
        ? availableWorldbooks.filter((bookName) => String(bookName || '').toLowerCase().includes(worldbookFilter))
        : availableWorldbooks;

      const $list = $container.find(`#${SCRIPT_ID}-tool-worldbooks`);
      if (!$list.length) return;

      if (availableWorldbooks.length === 0) {
        $list.html(`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState === 'loading' ? '世界书加载中…' : '当前未读取到可用世界书。'}</div>`);
        return;
      }

      $list.html(visibleWorldbooks.length > 0 ? visibleWorldbooks.map((bookName) => `
        <div class="yyt-worldbook-item">
          <label class="yyt-checkbox-label">
            <input type="checkbox" data-worldbook-name="${escapeHtml(bookName)}" ${selectedWorldbooks.includes(bookName) ? 'checked' : ''}>
            <span>${escapeHtml(bookName)}</span>
          </label>
        </div>
      `).join('') : '<div class="yyt-tool-compact-hint yyt-worldbook-empty">未找到匹配世界书。</div>');

      // 更新摘要
      const summary = selectedWorldbooks.length === 0
        ? '选择要注入的世界书'
        : selectedWorldbooks.length <= 2
          ? selectedWorldbooks.join('、')
          : `已选 ${selectedWorldbooks.length} 项：${selectedWorldbooks.slice(0, 2).join('、')} 等`;
      $container.find('.yyt-worldbook-summary').text(summary);
    }
  };
}

export default createToolConfigPanel;