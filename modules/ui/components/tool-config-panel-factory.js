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
  bindDialogEvents
} from '../utils.js';

import {
  getToolFullConfig,
  saveToolConfig,
  getToolBaseConfig
} from '../../tool-registry.js';

import { getAllPresets } from '../../preset-manager.js';
import { getPresetList as getBypassPresetList } from '../../bypass-manager.js';
import { runToolManually, previewToolExtraction } from '../../tool-trigger.js';

export const TOOL_CONFIG_PANEL_STYLES = `
  .yyt-tool-panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-tool-panel-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: stretch;
    padding: 12px 14px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
  }

  .yyt-tool-panel-hero-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .yyt-tool-panel-hero-title {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.15;
    color: var(--yyt-text);
  }

  .yyt-tool-panel-hero-desc {
    font-size: 12px;
    line-height: 1.55;
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-panel-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .yyt-tool-hero-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.08);
    letter-spacing: 0.3px;
    color: var(--yyt-text-secondary);
    background: rgba(255, 255, 255, 0.04);
  }

  .yyt-tool-compact-hint {
    font-size: 12px;
    color: var(--yyt-text-muted);
    line-height: 1.6;
  }

  .yyt-hidden {
    display: none !important;
  }

  .yyt-code-textarea {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.5;
    tab-size: 2;
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
    resize: vertical;
    min-height: 180px;
  }

  .yyt-code-textarea-small {
    min-height: 96px;
  }

  .yyt-code-textarea:focus {
    border-color: var(--yyt-accent);
    box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
  }

  .yyt-title-actions {
    margin-left: auto;
  }

  .yyt-btn-small {
    padding: 4px 10px;
    font-size: 12px;
  }

  .yyt-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }

  .yyt-checkbox-label input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .yyt-tool-manual-area {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
    gap: 12px;
    align-items: start;
  }

  .yyt-tool-runtime-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .yyt-tool-runtime-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    font-size: 12px;
  }

  .yyt-tool-runtime-label {
    color: var(--yyt-text-muted);
    flex-shrink: 0;
  }

  .yyt-tool-runtime-value {
    color: var(--yyt-text);
    text-align: right;
    word-break: break-word;
  }

  .yyt-tool-runtime-badge {
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .yyt-status-idle {
    color: var(--yyt-text-secondary);
    background: rgba(255, 255, 255, 0.06);
  }

  .yyt-status-running {
    color: var(--yyt-accent);
    background: rgba(123, 183, 255, 0.12);
  }

  .yyt-status-success {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.12);
  }

  .yyt-status-error {
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.12);
  }

  .yyt-tool-runtime-error .yyt-tool-runtime-value {
    color: var(--yyt-error);
  }

  .yyt-tool-manual-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
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
    previewTitle = '测试提取结果'
  } = options;

  return {
    id,
    toolId,

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
      const selectorText = Array.isArray(extraction.selectors) ? extraction.selectors.join('\n') : '';
      const modeText = outputMode === 'post_response_api'
        ? postResponseHint
        : '随 AI 输出不会自动调用额外模型，但仍然支持手动执行与测试提取。';
      const diagnosticsHtml = this._buildDiagnosticsHtml(config.runtime || {});
      const outputModeLabel = outputMode === 'post_response_api' ? '额外解析' : '随 AI 输出';
      const apiPresetLabel = selectedApiPreset || '当前配置';

      return `
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
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

          <div class="yyt-panel-section">
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
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${modeText}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
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

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shield-halved"></i>
              <span>破限预设</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${SCRIPT_ID}-tool-bypass-enabled" ${bypassEnabled ? 'checked' : ''}>
                <span>启用破限词</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${bypassEnabled ? '' : 'yyt-hidden'}">
              <label>绑定破限词预设</label>
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

          <div class="yyt-panel-section">
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

          <div class="yyt-panel-section">
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
              <div class="yyt-tool-compact-hint">这里直接填写发送给额外解析模型的完整模板；可在正文中显式使用 <code>{{toolContentMacro}}</code>、<code>{{lastAiMessage}}</code>、<code>{{userMessage}}</code> 等宏。</div>
            </div>
          </div>

          <div class="yyt-panel-section">
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
                <div class="yyt-tool-compact-hint">用于手动验证当前模板、API预设和破限预设是否能正常工作。</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-tool-save">
                <i class="fa-solid fa-save"></i> 保存配置
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            说明：工具会把当前模板解析后作为最终用户请求发送给额外模型；若启用了破限词，则会作为前置消息一并发送。可用宏包括 <code>{{toolPromptMacro}}</code>、<code>{{toolContentMacro}}</code>、<code>{{lastAiMessage}}</code>、<code>{{recentMessagesText}}</code>、<code>{{rawRecentMessagesText}}</code>、<code>{{userMessage}}</code>、<code>{{toolName}}</code>、<code>{{toolId}}</code>。
          </div>

          ${diagnosticsHtml}
        </div>
      `;
    },

    _formatDiagnosticValue(value, fallback = '未记录') {
      const text = String(value || '').trim();
      return escapeHtml(text || fallback);
    },

    _formatDiagnosticTime(timestamp) {
      const value = Number(timestamp) || 0;
      return value > 0 ? new Date(value).toLocaleString() : '未记录';
    },

    _formatSkipReason(reason) {
      const mapping = {
        listener_disabled: '已跳过：自动监听已关闭',
        quiet_generation: '已跳过：quiet / dryRun 生成',
        ignored_auto_trigger: '已跳过：判定为非用户主动触发生成',
        missing_ai_message: '已跳过：未读取到有效 AI 回复',
        duplicate_message: '已跳过：命中自动去重',
        no_eligible_tools: '已跳过：没有命中可执行工具',
        tool_disabled: '已跳过：工具未启用'
      };

      return mapping[reason] || reason || '无';
    },

    _formatExecutionPath(path) {
      const mapping = {
        auto_post_response_api: '自动链：post_response_api',
        manual_post_response_api: '手动链：post_response_api',
        manual_compatibility: '手动链：compatibility 回退'
      };

      return mapping[path] || path || '未记录';
    },

    _formatWritebackStatus(status) {
      const mapping = {
        success: '写回成功',
        failed: '写回失败',
        skipped_empty_output: '无输出，跳过写回',
        not_applicable: '不适用'
      };

      return mapping[status] || status || '未记录';
    },

    _formatFailureStage(stage) {
      const mapping = {
        build_messages: '构造请求消息',
        send_api_request: '发送 API 请求',
        extract_output: '提取工具输出',
        inject_context: '写回上下文',
        compatibility_execute: '兼容执行入口',
        unknown: '未知阶段'
      };

      return mapping[stage] || stage || '无';
    },

    _buildDiagnosticsHtml(runtime) {
      const data = runtime || {};
      const hasDiagnostics = Boolean(
        data.lastTriggerAt
        || data.lastTriggerEvent
        || data.lastMessageKey
        || data.lastSkipReason
        || data.lastExecutionPath
        || data.lastWritebackStatus
        || data.lastFailureStage
      );

      if (!hasDiagnostics) {
        return '';
      }

      const rows = [
        ['最近触发时间', this._formatDiagnosticTime(data.lastTriggerAt)],
        ['最近触发事件', this._formatDiagnosticValue(data.lastTriggerEvent)],
        ['最近消息键', this._formatDiagnosticValue(data.lastMessageKey)],
        ['最近跳过原因', this._formatDiagnosticValue(this._formatSkipReason(data.lastSkipReason), '无')],
        ['最近执行路径', this._formatDiagnosticValue(this._formatExecutionPath(data.lastExecutionPath))],
        ['最近写回状态', this._formatDiagnosticValue(this._formatWritebackStatus(data.lastWritebackStatus))],
        ['最近失败阶段', this._formatDiagnosticValue(this._formatFailureStage(data.lastFailureStage), '无')]
      ];

      return `
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">最近触发诊断</summary>
          <div class="yyt-tool-debug-content">
            ${rows.map(([label, value]) => `
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${label}</span>
                <span class="yyt-tool-runtime-value">${value}</span>
              </div>
            `).join('')}
          </div>
        </details>
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

    _getFormData($container) {
      const currentConfig = getToolFullConfig(this.toolId);
      const outputMode = $container.find(`#${SCRIPT_ID}-tool-output-mode`).val() || 'follow_ai';
      const bypassEnabled = $container.find(`#${SCRIPT_ID}-tool-bypass-enabled`).is(':checked');
      const postResponseEnabled = outputMode === 'post_response_api';
      const selectorLines = ($container.find(`#${SCRIPT_ID}-tool-extraction-selectors`).val() || '')
        .split(/\r?\n/)
        .map(item => item.trim())
        .filter(Boolean);

      return {
        enabled: currentConfig?.enabled !== false,
        promptTemplate: $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val() || '',
        apiPreset: $container.find(`#${SCRIPT_ID}-tool-api-preset`).val() || '',
        extractTags: selectorLines,
        trigger: {
          event: 'GENERATION_ENDED',
          enabled: postResponseEnabled
        },
        output: {
          mode: outputMode,
          apiPreset: $container.find(`#${SCRIPT_ID}-tool-api-preset`).val() || '',
          overwrite: true,
          enabled: postResponseEnabled
        },
        bypass: {
          enabled: bypassEnabled,
          presetId: bypassEnabled ? ($container.find(`#${SCRIPT_ID}-tool-bypass-preset`).val() || '') : ''
        },
        extraction: {
          enabled: true,
          maxMessages: Math.max(1, parseInt($container.find(`#${SCRIPT_ID}-tool-max-messages`).val(), 10) || 5),
          selectors: selectorLines
        }
      };
    },

    _showExtractionPreview($container, result) {
      const $ = getJQuery();
      if (!$) return;

      const dialogId = `${SCRIPT_ID}-${previewDialogId}`;
      const messageEntries = Array.isArray(result.messageEntries) ? result.messageEntries : [];
      const messageEntriesHtml = messageEntries.length > 0
        ? `
          <div class="yyt-form-group">
            <label>逐条消息预览</label>
            <div class="yyt-preview-message-list">
              ${messageEntries.map((entry) => `
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">第 ${entry.order} 条 AI 消息</div>
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
              `).join('')}
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
            <label>原始内容汇总（最近 ${result.maxMessages} 条 AI 消息）</label>
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

      $container.find(`#${SCRIPT_ID}-tool-output-mode`).on('change', () => {
        const mode = $container.find(`#${SCRIPT_ID}-tool-output-mode`).val() || 'follow_ai';
        const modeText = mode === 'post_response_api'
          ? postResponseHint
          : '随 AI 输出不会自动调用额外模型，但仍然支持手动执行与测试提取。';
        $container.find('.yyt-tool-mode-hint').text(modeText);
      });

      $container.find(`#${SCRIPT_ID}-tool-bypass-enabled`).on('change', (event) => {
        const enabled = $(event.currentTarget).is(':checked');
        $container.find('.yyt-bypass-preset-select').toggleClass('yyt-hidden', !enabled);
      });

      $container.find(`#${SCRIPT_ID}-tool-save`).on('click', () => {
        this._saveConfig($container, { silent: false });
      });

      $container.find(`#${SCRIPT_ID}-tool-reset-template`).on('click', () => {
        const baseConfig = getToolBaseConfig(this.toolId);
        if (baseConfig?.promptTemplate) {
          $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(baseConfig.promptTemplate);
          showToast('info', '模板已重置');
        }
      });

      $container.find(`#${SCRIPT_ID}-tool-run-manual`).on('click', async () => {
        const saveSuccess = this._saveConfig($container, { silent: true });
        if (!saveSuccess) {
          return;
        }

        try {
          const result = await runToolManually(this.toolId);
          if (!result?.success && result?.error) {
            showTopNotice('warning', result.error, {
              duration: 3200,
              noticeId: `yyt-tool-run-${this.toolId}`
            });
          }
        } catch (error) {
          showToast('error', error?.message || '手动执行失败');
        } finally {
          this.renderTo($container);
        }
      });

      $container.find(`#${SCRIPT_ID}-tool-preview-extraction`).on('click', async () => {
        const saveSuccess = this._saveConfig($container, { silent: true });
        if (!saveSuccess) {
          return;
        }

        try {
          const result = await previewToolExtraction(this.toolId);
          if (!result?.success) {
            showToast('error', result?.error || '测试提取失败');
            return;
          }
          this._showExtractionPreview($container, result);
        } catch (error) {
          showToast('error', error?.message || '测试提取失败');
        }
      });
    },

    _saveConfig($container, options = {}) {
      const config = this._getFormData($container);
      const { silent = false } = options;
      const success = saveToolConfig(this.toolId, config);

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
      $container.find('*').off();
    },

    getStyles() {
      return TOOL_CONFIG_PANEL_STYLES;
    },

    renderTo($container) {
      $container.html(this.render({}));
      this.bindEvents($container, {});
    }
  };
}

export default createToolConfigPanel;