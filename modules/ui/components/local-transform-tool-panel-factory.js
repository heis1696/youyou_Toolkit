/**
 * YouYou Toolkit - 本地转换工具面板工厂
 * @description 为本地文本处理型工具生成独立配置面板
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
import {
  runToolManually,
  previewToolExtraction
} from '../../tool-trigger.js';
import { TOOL_CONFIG_PANEL_STYLES } from './tool-config-panel-factory.js';

const LOCAL_PANEL_STYLES = `${TOOL_CONFIG_PANEL_STYLES}
  .yyt-local-option-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 10px;
  }

  .yyt-local-option-card {
    padding: 12px 13px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }

  .yyt-local-option-card:hover {
    border-color: rgba(255, 255, 255, 0.18);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 24px rgba(0, 0, 0, 0.12);
  }

  .yyt-local-option-card .yyt-checkbox-label {
    justify-content: space-between;
  }

  .yyt-local-output-mode-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
  }

  .yyt-local-choice-card {
    padding: 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }

  .yyt-local-choice-card:hover {
    border-color: rgba(255, 255, 255, 0.18);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 24px rgba(0, 0, 0, 0.12);
  }

  .yyt-local-choice-card .yyt-checkbox-label {
    align-items: flex-start;
  }

  .yyt-local-choice-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--yyt-text);
  }

  .yyt-local-choice-desc {
    font-size: 12px;
    line-height: 1.6;
    color: var(--yyt-text-secondary);
  }
`;

function normalizeOptions(optionItems = [], selectedOptions = {}) {
  return optionItems.map((item) => ({
    ...item,
    checked: selectedOptions?.[item.key] === true
  }));
}

export function createLocalTransformToolPanel(options) {
  const {
    id,
    toolId,
    previewDialogId,
    previewTitle = '测试提取结果',
    processorDirections = [],
    processorOptions = [],
    heroHint = '',
    extractionPlaceholder = ''
  } = options;

  return {
    id,
    toolId,

    render() {
      const config = getToolFullConfig(this.toolId);
      if (!config) {
        return `<div class="yyt-error">工具配置加载失败</div>`;
      }

      const processor = config.processor || {};
      const extraction = config.extraction || {};
      const runtimeStatus = config.runtime?.lastStatus || 'idle';
      const lastRunText = config.runtime?.lastRunAt
        ? new Date(config.runtime.lastRunAt).toLocaleString()
        : '未运行';
      const lastError = config.runtime?.lastError || '';
      const selectorText = Array.isArray(extraction.selectors) ? extraction.selectors.join('\n') : '';
      const overwrite = config.output?.overwrite !== false;
      const directions = normalizeOptions(processorDirections, {
        [processor.direction || processorDirections[0]?.key || '']: true
      });
      const transformOptions = normalizeOptions(processorOptions, processor.options || {});

      return `
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${escapeHtml(config.name || this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${escapeHtml(config.description || '')}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">本地脚本处理</span>
              <span class="yyt-tool-hero-chip">写回 ${overwrite ? '覆盖' : '追加'}</span>
              <span class="yyt-tool-hero-chip">最近状态 ${escapeHtml(runtimeStatus)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${SCRIPT_ID}-tool-save-top">
                  <i class="fa-solid fa-save"></i> 保存配置
                </button>
              </div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-toggle-on"></i>
              <span>启用状态</span>
            </div>
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-enabled" ${config.enabled !== false ? 'checked' : ''}>
              <span>启用该工具</span>
            </label>
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
              <div class="yyt-tool-compact-hint">每行一个规则。普通文本按标签定位；以 <code>regex:</code> 开头时按正则第一捕获组定位。手动执行会基于最新 AI 消息全文原位替换，尽量保留外层标签和其余原文。</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shuffle"></i>
              <span>执行种类</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              ${directions.map((item) => `
                <label class="yyt-local-choice-card">
                  <div class="yyt-checkbox-label">
                    <input type="radio" name="${SCRIPT_ID}-processor-direction-${this.toolId}" value="${escapeHtml(item.key)}" ${item.checked ? 'checked' : ''}>
                    <span>${escapeHtml(item.label)}</span>
                  </div>
                  <div class="yyt-local-choice-desc">${escapeHtml(item.description || '')}</div>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-list-check"></i>
              <span>处理项</span>
            </div>
            <div class="yyt-local-option-grid">
              ${transformOptions.map((item) => `
                <div class="yyt-local-option-card">
                  <label class="yyt-checkbox-label">
                    <span>${escapeHtml(item.label)}</span>
                    <input type="checkbox" data-option-key="${escapeHtml(item.key)}" ${item.checked ? 'checked' : ''}>
                  </label>
                  <div class="yyt-tool-compact-hint">${escapeHtml(item.description || '')}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-pen-to-square"></i>
              <span>写回方式</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${SCRIPT_ID}-output-mode-${this.toolId}" value="replace" ${overwrite ? 'checked' : ''}>
                  <span>覆盖原工具块</span>
                </div>
                <div class="yyt-local-choice-desc">优先替换该工具此前写入的内容。</div>
              </label>
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${SCRIPT_ID}-output-mode-${this.toolId}" value="append" ${overwrite ? '' : 'checked'}>
                  <span>追加到末尾</span>
                </div>
                <div class="yyt-local-choice-desc">保留原文，并把处理结果附加到当前消息末尾。</div>
              </label>
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
                <div class="yyt-tool-compact-hint">${escapeHtml(heroHint || '保存后可直接对最近 AI 消息做本地文本处理。')}</div>
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

    _getFormData($container) {
      const $ = getJQuery();
      const currentConfig = getToolFullConfig(this.toolId) || {};
      if (!$ || !isContainerValid($container)) {
        return currentConfig;
      }
      const selectorLines = ($container.find(`#${SCRIPT_ID}-tool-extraction-selectors`).val() || '')
        .split(/\r?\n/)
        .map(item => item.trim())
        .filter(Boolean);

      const selectedDirection = $container.find(`input[name="${SCRIPT_ID}-processor-direction-${this.toolId}"]:checked`).val()
        || processorDirections[0]?.key
        || '';
      const overwriteMode = $container.find(`input[name="${SCRIPT_ID}-output-mode-${this.toolId}"]:checked`).val() || 'replace';
      const nextOptions = {};
      $container.find('[data-option-key]').each((_, element) => {
        const $element = $(element);
        nextOptions[$element.data('option-key')] = $element.is(':checked');
      });

      return {
        enabled: $container.find(`#${SCRIPT_ID}-tool-enabled`).is(':checked'),
        extractTags: selectorLines,
        output: {
          ...(currentConfig.output || {}),
          mode: 'local_transform',
          overwrite: overwriteMode !== 'append',
          enabled: true
        },
        extraction: {
          enabled: true,
          maxMessages: Math.max(1, parseInt($container.find(`#${SCRIPT_ID}-tool-max-messages`).val(), 10) || 5),
          selectors: selectorLines
        },
        processor: {
          ...(currentConfig.processor || {}),
          direction: selectedDirection,
          options: nextOptions
        },
        runtime: { ...(currentConfig.runtime || {}) }
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

      // 使用事件委托绑定所有按钮事件，避免重新渲染导致事件丢失
      $container.off('.yytLocalToolPanel');

      $container.on('click.yytLocalToolPanel', `#${SCRIPT_ID}-tool-save, #${SCRIPT_ID}-tool-save-top`, () => {
        self._saveConfig($container, { silent: false });
      });

      $container.on('click.yytLocalToolPanel', `#${SCRIPT_ID}-tool-run-manual`, async () => {
        const saveSuccess = self._saveConfig($container, { silent: true });
        if (!saveSuccess) return;

        try {
          const result = await runToolManually(self.toolId);
          if (!result?.success && result?.error) {
            showTopNotice('warning', result.error, {
              duration: 3200,
              noticeId: `yyt-tool-run-${self.toolId}`
            });
          }
        } catch (error) {
          showToast('error', error?.message || '手动执行失败');
        } finally {
          self.renderTo($container);
        }
      });

      $container.on('click.yytLocalToolPanel', `#${SCRIPT_ID}-tool-preview-extraction`, async () => {
        const saveSuccess = self._saveConfig($container, { silent: true });
        if (!saveSuccess) return;

        try {
          const result = await previewToolExtraction(self.toolId);
          if (!result?.success) {
            showToast('error', result?.error || '测试提取失败');
            return;
          }
          self._showExtractionPreview($container, result);
        } catch (error) {
          showToast('error', error?.message || '测试提取失败');
        }
      });

      $container.on('click.yytLocalToolPanel', `#${SCRIPT_ID}-tool-reset-template`, () => {
        const baseConfig = getToolBaseConfig(self.toolId);
        if (baseConfig?.promptTemplate) {
          $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(baseConfig.promptTemplate);
          showToast('info', '模板已重置');
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
      $container.off('.yytLocalToolPanel');
    },

    getStyles() {
      return LOCAL_PANEL_STYLES;
    },

    renderTo($container) {
      $container.html(this.render({}));
      this.bindEvents($container, {});
    }
  };
}

export default createLocalTransformToolPanel;