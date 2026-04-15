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

  .yyt-table-workbench-panel-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  .yyt-table-workbench-panel-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-panel-desc,
  .yyt-table-workbench-muted {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.68);
  }

  .yyt-table-workbench-flow {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .yyt-table-workbench-flow .yyt-tool-hero-chip {
    background: rgba(255, 255, 255, 0.08);
  }

  .yyt-table-workbench-detail-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    min-height: 108px;
  }

  .yyt-table-workbench-empty-state {
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px dashed rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.03);
    min-height: 108px;
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
  const runtimeStatus = String(runtime.lastStatus || 'idle').toLowerCase();
  const lastError = runtime.lastError ? `
    <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
      <span class="yyt-tool-runtime-label">最近错误</span>
      <span class="yyt-tool-runtime-value">${escapeHtml(runtime.lastError)}</span>
    </div>
  ` : '';

  return `
    <div class="yyt-tool-runtime-card">
      <div class="yyt-table-workbench-panel-copy">
        <div class="yyt-table-workbench-panel-title">运行摘要</div>
        <div class="yyt-table-workbench-panel-desc">记录最近一次手动填表的目标、revision 与写回结果，便于快速判断是否命中正确 assistant slot。</div>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">当前状态</span>
        <span class="yyt-tool-runtime-badge yyt-status-${escapeHtml(runtimeStatus)}">${escapeHtml(runtime.lastStatus || 'idle')}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">最近运行</span>
        <span class="yyt-tool-runtime-value">${escapeHtml(formatTimestamp(runtime.lastRunAt))}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">耗时</span>
        <span class="yyt-tool-runtime-value">${runtime.lastDurationMs ? `${runtime.lastDurationMs} ms` : '未记录'}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">成功 / 失败</span>
        <span class="yyt-tool-runtime-value">${Number(runtime.successCount) || 0} / ${Number(runtime.errorCount) || 0}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">最近目标</span>
        <span class="yyt-tool-runtime-value">${escapeHtml(runtime.lastSourceMessageId || '未记录')}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">最近 revision</span>
        <span class="yyt-tool-runtime-value">${escapeHtml(runtime.lastSlotRevisionKey || '未记录')}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">loadMode</span>
        <span class="yyt-tool-runtime-value">${escapeHtml(runtime.lastLoadMode || '未记录')}</span>
      </div>
      <div class="yyt-tool-runtime-line">
        <span class="yyt-tool-runtime-label">正文镜像</span>
        <span class="yyt-tool-runtime-value">${runtime.lastMirrorApplied === true ? '已执行' : '未执行'}</span>
      </div>
      ${lastError}
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
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-title">表定义与请求模板</div>
              <div class="yyt-table-workbench-panel-desc">在这里维护 tables 草稿、promptTemplate 与写回策略。保存后才会更新运行时配置。</div>
            </div>
            ${renderTableForm(schema, config)}
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-hand-pointer"></i>
              <span>手动执行</span>
            </div>
            <div class="yyt-tool-manual-area">
              <div class="yyt-tool-runtime-card">
                <div class="yyt-table-workbench-panel-copy">
                  <div class="yyt-table-workbench-panel-title">执行链路</div>
                  <div class="yyt-table-workbench-panel-desc">每次执行都会重新解析当前 assistant 目标，并在 commit 前校验 revision，避免写到旧 slot。</div>
                </div>
                <div class="yyt-table-workbench-flow">
                  <span class="yyt-tool-hero-chip">fresh target</span>
                  <span class="yyt-tool-hero-chip">load state/template</span>
                  <span class="yyt-tool-hero-chip">build request</span>
                  <span class="yyt-tool-hero-chip">parse tables</span>
                  <span class="yyt-tool-hero-chip">commit state</span>
                </div>
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" data-table-workbench-action="run">
                  <i class="fa-solid fa-play"></i> 立即手动填表
                </button>
                <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="refresh">
                  <i class="fa-solid fa-rotate"></i> 刷新目标诊断
                </button>
                <button class="yyt-btn yyt-btn-secondary" data-table-workbench-action="save">
                  <i class="fa-solid fa-save"></i> 保存配置
                </button>
                <div class="yyt-tool-compact-hint">建议顺序：先保存配置，再刷新诊断，最后执行一次手动填表确认 writeback 命中目标消息。</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-code"></i>
              <span>可用变量</span>
            </div>
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-title">模板辅助速查</div>
              <div class="yyt-table-workbench-panel-desc">这些变量可直接用于 promptTemplate，生成结构化表格更新请求。</div>
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
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-title">目标定位</div>
              <div class="yyt-table-workbench-panel-desc">显示当前 assistant message / swipe / slot 键，便于判断本次执行会写到哪里。</div>
            </div>
            <div data-table-workbench-target class="yyt-table-workbench-empty-state">正在读取当前 assistant 目标...</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>当前加载结果</span>
            </div>
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-title">状态来源</div>
              <div class="yyt-table-workbench-panel-desc">展示当前是从 bound state 继续，还是回退到模板 tables。</div>
            </div>
            <div data-table-workbench-load class="yyt-table-workbench-empty-state">等待诊断结果...</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-table"></i>
              <span>tables 预览</span>
            </div>
            <div class="yyt-table-workbench-panel-copy">
              <div class="yyt-table-workbench-panel-title">当前编译结果</div>
              <div class="yyt-table-workbench-panel-desc">这里展示将用于执行或回退的 tables JSON，便于在运行前做最后检查。</div>
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
    return '<div class="yyt-table-workbench-empty-state"><div class="yyt-table-workbench-muted">暂无可显示内容。</div></div>';
  }

  return `
    <div class="yyt-table-workbench-detail-list">
      ${items.map((item) => `
        <div class="yyt-tool-runtime-line">
          <span class="yyt-tool-runtime-label">${escapeHtml(item.label || '')}</span>
          <span class="yyt-tool-runtime-value">${escapeHtml(item.value || '')}</span>
        </div>
      `).join('')}
    </div>
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

    const self = this;

    // 使用事件委托绑定所有按钮事件，避免重新渲染导致事件丢失
    $container.off('.yytTableWorkbench');

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="save"], [data-table-workbench-action="save-top"]', () => {
      const saveResult = collectAndSaveConfig($container, { silent: false });
      if (saveResult?.success) {
        self.renderTo($container);
      }
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="refresh"]', () => {
      self.renderTo($container);
    });

    $container.on('click.yytTableWorkbench', '[data-table-workbench-action="run"]', async () => {
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
        self.renderTo($container);
      }
    });
  },

  destroy($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    $container.off('.yytTableWorkbench');
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
