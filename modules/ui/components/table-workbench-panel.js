/**
 * YouYou Toolkit - 填表工作台面板
 * @description 提供最小手动填表 MVP 的配置、执行与状态预览
 */

import {
  SCRIPT_ID,
  escapeHtml,
  getJQuery,
  isContainerValid,
  showToast,
  showTopNotice
} from '../utils.js';
import { TOOL_CONFIG_PANEL_STYLES } from './tool-config-panel-factory.js';
import { TABLE_FORM_RENDERER_STYLES, bindTableFormEvents, renderTableForm, readTableFormValues } from './table-form-renderer.js';
import { variableResolver } from '../../variable-resolver.js';
import { getAllPresets } from '../../preset-manager.js';
import {
  getTableWorkbenchConfig,
  getTableWorkbenchFormSchema,
  saveTableWorkbenchConfig
} from '../../table-engine/table-schema-service.js';
import { resolveLatestTableTarget } from '../../table-engine/table-target-resolver.js';
import { getAssistantTableSnapshot, loadBoundStateOrTemplate } from '../../table-engine/table-state-service.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';

const PANEL_STYLES = `${TOOL_CONFIG_PANEL_STYLES}
${TABLE_FORM_RENDERER_STYLES}
  .yyt-table-workbench-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
    gap: 16px;
  }

  .yyt-table-workbench-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .yyt-table-workbench-card {
    padding: 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 12px 28px rgba(0, 0, 0, 0.14);
  }

  .yyt-table-workbench-kv {
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    gap: 8px 12px;
    font-size: 12px;
    line-height: 1.7;
  }

  .yyt-table-workbench-kv dt {
    color: rgba(255, 255, 255, 0.62);
    font-weight: 700;
  }

  .yyt-table-workbench-kv dd {
    margin: 0;
    color: var(--yyt-text);
    word-break: break-word;
  }

  .yyt-table-workbench-pre {
    margin: 0;
    padding: 14px;
    border-radius: 16px;
    min-height: 220px;
    max-height: 520px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    background: rgba(8, 12, 18, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.92);
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
    line-height: 1.7;
  }

  .yyt-table-workbench-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .yyt-table-workbench-muted {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.68);
  }

  @media (max-width: 1100px) {
    .yyt-table-workbench-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

function getSchema() {
  return getTableWorkbenchFormSchema({
    apiPresets: getAllPresets()
  });
}

function formatTimestamp(value) {
  return Number.isFinite(value) && value > 0
    ? new Date(value).toLocaleString()
    : '未记录';
}

function formatJson(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch (_) {
    return String(value ?? '');
  }
}

function updateCompiledPreview($container) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) return;

  const schema = getSchema();
  const { values, errors } = readTableFormValues($container, schema);
  const $preview = $container.find('[data-table-workbench-preview]');

  if (!$preview.length) {
    return;
  }

  if (errors.length > 0) {
    $preview.text(errors.join('\n'));
    return;
  }

  $preview.text(formatJson(values.tables || []));
}

function buildHero(config = {}) {
  const runtime = config.runtime || {};
  return `
    <div class="yyt-tool-panel-hero">
      <div class="yyt-tool-panel-hero-copy">
        <div class="yyt-tool-panel-hero-title">填表工作台</div>
        <div class="yyt-tool-panel-hero-desc">最小手动填表 MVP。结构化 table state 写入消息扩展字段，可选正文镜像，commit 前执行 fresh target + revision 校验。</div>
      </div>
      <div class="yyt-tool-panel-hero-tags">
        <span class="yyt-tool-hero-chip">手动执行</span>
        <span class="yyt-tool-hero-chip">revision-safe</span>
        <span class="yyt-tool-hero-chip">状态 ${escapeHtml(runtime.lastStatus || 'idle')}</span>
        <div class="yyt-tool-panel-hero-actions">
          <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-table-workbench-action="save-top">
            <i class="fa-solid fa-save"></i> 保存配置
          </button>
        </div>
      </div>
    </div>
  `;
}

function buildRuntimeSummary(config = {}) {
  const runtime = config.runtime || {};
  return `
    <div class="yyt-table-workbench-card">
      <div class="yyt-section-title">
        <i class="fa-solid fa-wave-square"></i>
        <span>最近运行</span>
      </div>
      <dl class="yyt-table-workbench-kv">
        <dt>状态</dt>
        <dd>${escapeHtml(runtime.lastStatus || 'idle')}</dd>
        <dt>最近运行</dt>
        <dd>${escapeHtml(formatTimestamp(runtime.lastRunAt))}</dd>
        <dt>耗时</dt>
        <dd>${runtime.lastDurationMs ? `${runtime.lastDurationMs} ms` : '未记录'}</dd>
        <dt>成功 / 失败</dt>
        <dd>${Number(runtime.successCount) || 0} / ${Number(runtime.errorCount) || 0}</dd>
        <dt>最近目标</dt>
        <dd>${escapeHtml(runtime.lastSourceMessageId || '未记录')}</dd>
        <dt>最近 revision</dt>
        <dd>${escapeHtml(runtime.lastSlotRevisionKey || '未记录')}</dd>
        <dt>最近 loadMode</dt>
        <dd>${escapeHtml(runtime.lastLoadMode || '未记录')}</dd>
        <dt>正文镜像</dt>
        <dd>${runtime.lastMirrorApplied === true ? '已执行' : '未执行'}</dd>
        <dt>最近错误</dt>
        <dd>${escapeHtml(runtime.lastError || '无')}</dd>
      </dl>
    </div>
  `;
}

function buildMainLayout(config = {}) {
  const schema = getSchema();
  const variableHelp = variableResolver.getVariableHelp();

  return `
    <div class="yyt-tool-panel" data-tool-id="tableWorkbench">
      ${buildHero(config)}
      <div class="yyt-table-workbench-grid">
        <div class="yyt-table-workbench-stack">
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
              <span>工作台配置</span>
            </div>
            ${renderTableForm(schema, config)}
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-hand-pointer"></i>
              <span>手动执行</span>
            </div>
            <div class="yyt-table-workbench-actions">
              <button class="yyt-btn yyt-btn-primary" data-table-workbench-action="run">
                <i class="fa-solid fa-play"></i> 立即手动填表
              </button>
              <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="refresh">
                <i class="fa-solid fa-rotate"></i> 刷新目标诊断
              </button>
              <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="save">
                <i class="fa-solid fa-save"></i> 保存配置
              </button>
            </div>
            <div class="yyt-tool-compact-hint">执行链：resolve fresh target → load state/template → build request → API → parse tables JSON → commit structured state。</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-code"></i>
              <span>可用变量</span>
            </div>
            <pre class="yyt-table-workbench-pre">${escapeHtml(variableHelp)}</pre>
          </div>
        </div>

        <div class="yyt-table-workbench-stack">
          ${buildRuntimeSummary(config)}

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-crosshairs"></i>
              <span>当前目标诊断</span>
            </div>
            <div data-table-workbench-target class="yyt-table-workbench-muted">正在读取当前 assistant 目标...</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>当前加载结果</span>
            </div>
            <div data-table-workbench-load class="yyt-table-workbench-muted">等待诊断结果...</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-table"></i>
              <span>tables 预览</span>
            </div>
            <pre class="yyt-table-workbench-pre" data-table-workbench-preview>${escapeHtml(formatJson(config.tables || []))}</pre>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDiagnosticList(items = []) {
  if (!items.length) {
    return '<div class="yyt-table-workbench-muted">暂无可显示内容。</div>';
  }

  return `
    <dl class="yyt-table-workbench-kv">
      ${items.map((item) => `
        <dt>${escapeHtml(item.label || '')}</dt>
        <dd>${escapeHtml(item.value || '')}</dd>
      `).join('')}
    </dl>
  `;
}

async function refreshDiagnostics($container) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) return;

  const config = getTableWorkbenchConfig();
  const $target = $container.find('[data-table-workbench-target]');
  const $load = $container.find('[data-table-workbench-load]');
  const $preview = $container.find('[data-table-workbench-preview]');

  try {
    const targetSnapshot = await resolveLatestTableTarget();
    if (!isContainerValid($container)) return;

    if (!targetSnapshot) {
      $target.html('<div class="yyt-table-workbench-muted">当前没有可用的 assistant 目标。</div>');
      $load.html('<div class="yyt-table-workbench-muted">尚未解析到可执行目标，因此不会加载 bound state。</div>');
      $preview.text(formatJson(config.tables || []));
      return;
    }

    const assistantSnapshot = getAssistantTableSnapshot(targetSnapshot.sourceMessageId);
    const loadResult = loadBoundStateOrTemplate(targetSnapshot, {
      templateTables: config.tables
    });
    const bindings = assistantSnapshot?.tableBindings || {};
    const targetItems = [
      { label: 'sourceMessageId', value: targetSnapshot.sourceMessageId || '未解析' },
      { label: 'sourceSwipeId', value: targetSnapshot.sourceSwipeId || targetSnapshot.effectiveSwipeId || '未解析' },
      { label: 'slotBindingKey', value: targetSnapshot.slotBindingKey || '未解析' },
      { label: 'slotRevisionKey', value: targetSnapshot.slotRevisionKey || '未解析' },
      { label: 'slotTransactionId', value: targetSnapshot.slotTransactionId || '未解析' },
      { label: 'lastResolvedTarget', value: bindings?.lastResolvedTarget?.slotRevisionKey || '未记录' },
      { label: 'lastCommittedTarget', value: bindings?.lastCommittedTarget?.slotRevisionKey || '未记录' }
    ];
    const loadItems = [
      { label: 'loadMode', value: loadResult.loadMode || 'empty' },
      { label: 'mergeBaseOnly', value: loadResult.mergeBaseOnly === true ? 'true' : 'false' },
      { label: 'tables 数量', value: String(Array.isArray(loadResult.state?.tables) ? loadResult.state.tables.length : 0) },
      { label: 'state updatedAt', value: formatTimestamp(loadResult.state?.updatedAt) }
    ];

    $target.html(renderDiagnosticList(targetItems));
    $load.html(renderDiagnosticList(loadItems));
    $preview.text(formatJson(loadResult.state?.tables || []));
  } catch (error) {
    if (!isContainerValid($container)) return;
    $target.html(`<div class="yyt-table-workbench-muted">${escapeHtml(error?.message || '目标诊断失败')}</div>`);
    $load.html('<div class="yyt-table-workbench-muted">无法生成加载诊断。</div>');
  }
}

function collectAndSaveConfig($container, { silent = false } = {}) {
  const schema = getSchema();
  const { values, errors } = readTableFormValues($container, schema);
  updateCompiledPreview($container);
  if (errors.length > 0) {
    showTopNotice('warning', errors.join('\n'), {
      duration: 4000,
      noticeId: 'yyt-table-workbench-form-error'
    });
    return {
      success: false,
      errors
    };
  }

  const saveResult = saveTableWorkbenchConfig(values);
  if (!saveResult.success) {
    showToast('error', saveResult.error || '保存失败');
    return saveResult;
  }

  if (!silent) {
    showToast('success', '填表工作台配置已保存');
  }

  return saveResult;
}

export const TableWorkbenchPanel = {
  id: 'tableWorkbenchPanel',

  render() {
    return buildMainLayout(getTableWorkbenchConfig());
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;

    $container.find('[data-table-workbench-action="save"], [data-table-workbench-action="save-top"]').on('click', () => {
      const saveResult = collectAndSaveConfig($container, { silent: false });
      if (saveResult?.success) {
        this.renderTo($container);
      }
    });

    $container.find('[data-table-workbench-action="refresh"]').on('click', () => {
      this.renderTo($container);
    });

    $container.find('[data-table-workbench-action="run"]').on('click', async () => {
      const saveResult = collectAndSaveConfig($container, { silent: true });
      if (!saveResult.success) {
        return;
      }

      try {
        const result = await runManualTableUpdate();
        if (!result?.success) {
          showTopNotice('warning', result?.error || '手动填表失败', {
            duration: 4000,
            noticeId: 'yyt-table-workbench-run-result'
          });
        } else if (result.warning) {
          showTopNotice('warning', `填表已完成，但正文镜像失败：${result.warning}`, {
            duration: 4200,
            noticeId: 'yyt-table-workbench-run-result'
          });
        } else {
          showTopNotice('success', '手动填表完成', {
            duration: 2800,
            noticeId: 'yyt-table-workbench-run-result'
          });
        }
      } catch (error) {
        showToast('error', error?.message || '手动填表失败');
      } finally {
        this.renderTo($container);
      }
    });
  },

  destroy($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    $container.find('*').off();
  },

  getStyles() {
    return PANEL_STYLES;
  },

  renderTo($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    $container.html(this.render({}));
    bindTableFormEvents($container, getSchema(), {
      onChange: () => updateCompiledPreview($container)
    });
    this.bindEvents($container, {});
    updateCompiledPreview($container);
    void refreshDiagnostics($container);
  }
};

export default TableWorkbenchPanel;
