/**
 * YouYou Toolkit - 摘要工具面板组件
 * @description 精简版工具配置面板
 * @version 4.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import {
  SCRIPT_ID,
  escapeHtml,
  showToast,
  showTopNotice,
  getJQuery,
  isContainerValid
} from '../utils.js';

import {
  getToolFullConfig,
  saveToolConfig,
  getAllDefaultToolConfigs
} from '../../tool-registry.js';

import {
  getAllPresets
} from '../../preset-manager.js';

import {
  getPresetList as getBypassPresetList
} from '../../bypass-manager.js';

import {
  runToolManually
} from '../../tool-trigger.js';

export const SummaryToolPanel = {
  id: 'summaryToolPanel',
  toolId: 'summaryTool',

  render() {
    const config = getToolFullConfig(this.toolId);

    if (!config) {
      return `<div class="yyt-error">工具配置加载失败</div>`;
    }

    const apiPresets = this._getApiPresets();
    const bypassPresets = this._getBypassPresets();
    const outputMode = config.output?.mode || 'follow_ai';
    const bypassEnabled = config.bypass?.enabled || false;
    const bypassPresetId = config.bypass?.presetId || '';
    const runtimeStatus = config.runtime?.lastStatus || 'idle';
    const lastRunText = config.runtime?.lastRunAt
      ? new Date(config.runtime.lastRunAt).toLocaleString()
      : '未运行';
    const lastError = config.runtime?.lastError || '';
    const modeText = outputMode === 'post_response_api'
      ? '监听 AI 回复结束后，调用额外模型进行摘要解析。'
      : '随 AI 输出即不启用额外工具链，不会自动调用额外模型。';

    return `
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>输出模式</span>
          </div>
          <div class="yyt-form-group">
            <label>输出模式</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-output-mode">
              <option value="follow_ai" ${outputMode === 'follow_ai' ? 'selected' : ''}>随 AI 输出（不启用）</option>
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
                <option value="${escapeHtml(preset.name)}" ${preset.name === config.output?.apiPreset ? 'selected' : ''}>
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
            <div class="yyt-tool-compact-hint">这里直接填写发送给额外解析模型的完整模板。</div>
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

  _getFormData($container) {
    const currentConfig = getToolFullConfig(this.toolId);
    const outputMode = $container.find(`#${SCRIPT_ID}-tool-output-mode`).val() || 'follow_ai';
    const bypassEnabled = $container.find(`#${SCRIPT_ID}-tool-bypass-enabled`).is(':checked');
    const postResponseEnabled = outputMode === 'post_response_api';

    return {
      enabled: true,
      promptTemplate: $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val() || '',
      extractTags: currentConfig?.extractTags || [],
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
      }
    };
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;

    $container.find(`#${SCRIPT_ID}-tool-output-mode`).on('change', () => {
      const mode = $container.find(`#${SCRIPT_ID}-tool-output-mode`).val() || 'follow_ai';
      const modeText = mode === 'post_response_api'
        ? '监听 AI 回复结束后，调用额外模型进行摘要解析。'
        : '随 AI 输出即不启用额外工具链，不会自动调用额外模型。';
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
      const defaultConfigs = getAllDefaultToolConfigs();
      const defaultConfig = defaultConfigs[this.toolId];
      if (defaultConfig?.promptTemplate) {
        $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(defaultConfig.promptTemplate);
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
  },

  _saveConfig($container, options = {}) {
    const config = this._getFormData($container);
    const { silent = false } = options;
    const success = saveToolConfig(this.toolId, config);

    if (success) {
      if (!silent) {
        showToast('success', '配置已保存');
      }
      eventBus.emit(EVENTS.TOOL_UPDATED, { toolId: this.toolId, config });
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
    return `
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
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
        min-height: 220px;
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
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 16px;
        align-items: start;
      }

      .yyt-tool-runtime-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 14px;
        background: rgba(0, 0, 0, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: var(--yyt-radius-sm);
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
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.12);
      }

      .yyt-tool-runtime-error .yyt-tool-runtime-value {
        color: var(--yyt-danger);
      }

      .yyt-tool-manual-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 180px;
      }

      .yyt-error {
        padding: 20px;
        text-align: center;
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: var(--yyt-radius-sm);
      }

      .yyt-panel-footer-end {
        justify-content: flex-end;
      }

      @media screen and (max-width: 768px) {
        .yyt-tool-manual-area {
          grid-template-columns: 1fr;
        }

        .yyt-tool-manual-actions {
          min-width: 0;
        }
      }
    `;
  },

  renderTo($container) {
    $container.html(this.render({}));
    this.bindEvents($container, {});
  }
};

export default SummaryToolPanel;