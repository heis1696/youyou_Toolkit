/**
 * YouYou Toolkit - 本地转换工具面板工厂 (议题 #38 iter 1 — 脚本工具)
 *
 * 与 tool-config-panel-factory.js 同构布局：Hero / Runtime / 绑定 / 配置。
 * 脚本工具特有字段：
 *   - config.processor.direction        字符串，从 processorDirections 选一项
 *   - config.processor.options          { [optionKey]: boolean }
 *   - config.output.overwrite           true=覆盖 / false=追加
 *
 * iter 1 简化:
 *   - 不接入世界书预设（脚本工具无 AI 调用，不需要）
 *   - 不接入 API 预设 / Ai 指令预设
 *   - 编辑即保存
 *   - 镜像规则同 AI 工具：选具体正则预设时把 include 标签写到 extraction.selectors
 */

import {
  flowSection,
  formRow,
  textInput,
  selectInput,
  toggle,
  button,
  el
} from './controls/index.js';

import { SCRIPT_ID, getJQuery, isContainerValid, createDialogHtml, bindDialogEvents } from '../utils.js';
import {
  getToolFullConfig,
  saveToolConfig
} from '../../tool-registry.js';
import {
  runToolManually,
  previewToolExtraction
} from '../../tool-trigger.js';
import { logger } from '../../core/logger-service.js';
import { TOOL_CONFIG_PANEL_STYLES } from './tool-config-panel-factory.js';

import regexStore from '../../regex-preset-store.js';

const log = logger.createScope('LocalTransformToolPanel');

// 保留导出，供 table-workbench-panel 等需要 yyt-tool-panel-* 样式的组件使用
export { TOOL_CONFIG_PANEL_STYLES };

// ──────────────────────────────────────────────────────────────
function unwrap($container) {
  if (!$container) return null;
  if ($container.length !== undefined && typeof $container.get === 'function') {
    return $container.get(0);
  }
  return $container;
}

function fmtTime(ts) {
  if (!Number.isFinite(ts) || ts <= 0) return '从未';
  const diff = Date.now() - ts;
  if (diff < 60000) return `${Math.floor(diff / 1000)} 秒前`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
  try { return new Date(ts).toLocaleString(); } catch (_) { return '未知'; }
}

function escapeHtmlSafe(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ──────────────────────────────────────────────────────────────

export function createLocalTransformToolPanel(options = {}) {
  const {
    id,
    toolId,
    previewDialogId,
    previewTitle = '测试提取结果',
    processorDirections = [],
    processorOptions = [],
    heroHint = ''
    // extractionPlaceholder 被新版面板忽略
  } = options;

  return {
    id,
    toolId,

    renderTo($container) {
      const containerEl = unwrap($container);
      if (!containerEl) return;
      if (containerEl._yytLocalToolPanelCleanup) {
        try { containerEl._yytLocalToolPanelCleanup(); } catch (_) {}
      }

      const refresh = () => this.renderTo($container);
      const config = getToolFullConfig(toolId);
      if (!config) {
        containerEl.innerHTML = '<div class="yyt-empty-state-small">工具配置加载失败</div>';
        return;
      }

      const root = el('div', { className: 'yyt-tool-panel', dataset: { toolId } });
      const sectionsToDestroy = [];

      root.appendChild(buildHero(config, toolId, refresh, processorDirections, heroHint));
      root.appendChild(buildRuntimeRow(config));

      const bindingSec = buildBindingSection(config, toolId, refresh);
      sectionsToDestroy.push(bindingSec);
      root.appendChild(bindingSec.el);

      const configSec = buildConfigSection(config, toolId, refresh, $container, processorDirections, processorOptions, previewDialogId, previewTitle);
      sectionsToDestroy.push(configSec);
      root.appendChild(configSec.el);

      containerEl.innerHTML = '';
      containerEl.appendChild(root);

      containerEl._yytLocalToolPanelCleanup = () => {
        for (const s of sectionsToDestroy) {
          try { s.destroy(); } catch (_) {}
        }
        delete containerEl._yytLocalToolPanelCleanup;
      };
    },

    destroy(container) {
      const containerEl = unwrap(container);
      if (containerEl?._yytLocalToolPanelCleanup) {
        try { containerEl._yytLocalToolPanelCleanup(); } catch (_) {}
      }
    },

    getStyles() { return ''; }
  };
}

// ──────────────────────────────────────────────────────────────

function buildHero(config, toolId, refresh, processorDirections, heroHint) {
  const hero = el('div', { className: 'yyt-tool-panel-hero' });

  const row1 = el('div', { className: 'yyt-tool-panel-hero-row1' });
  row1.appendChild(el('div', { className: 'yyt-tool-panel-hero-icon', text: '⚙' }));
  row1.appendChild(el('div', { className: 'yyt-tool-panel-hero-name', text: config.name || toolId }));

  const actions = el('div', { className: 'yyt-tool-panel-hero-actions' });
  actions.appendChild(button({
    label: '▶ 立即执行一次', size: 'small',
    onClick: async () => {
      try {
        await runToolManually(toolId);
        log.info('已触发手动执行', null, { toast: 'success' });
      } catch (error) {
        log.error(`执行失败：${error?.message || error}`, null, { toast: true });
      }
    }
  }).el);
  actions.appendChild(button({
    label: '💾 保存配置', size: 'small', variant: 'primary',
    onClick: () => { log.info('配置已保存', null, { toast: 'success' }); refresh(); }
  }).el);
  row1.appendChild(actions);
  hero.appendChild(row1);

  if (config.description) {
    hero.appendChild(el('div', { className: 'yyt-tool-panel-hero-desc', text: config.description }));
  }
  if (heroHint) {
    hero.appendChild(el('div', { className: 'yyt-tool-panel-hero-desc', text: heroHint }));
  }

  // Chips
  const chips = el('div', { className: 'yyt-tool-panel-hero-chips' });
  const isAutoTrigger = config.output?.autoTrigger !== false;
  chips.appendChild(el('span', { className: 'yyt-tool-hero-chip mode', text: `本地脚本（${isAutoTrigger ? '自动' : '手动'}）` }));

  const directionKey = config.processor?.direction || processorDirections[0]?.key || '';
  const directionLabel = processorDirections.find((d) => d.key === directionKey)?.label || directionKey;
  if (directionLabel) {
    chips.appendChild(el('span', { className: 'yyt-tool-hero-chip preset', text: `方向: ${directionLabel}` }));
  }

  const overwrite = config.output?.overwrite !== false;
  chips.appendChild(el('span', { className: 'yyt-tool-hero-chip preset', text: `写回: ${overwrite ? '覆盖' : '追加'}` }));

  const regexPresetId = config.extraction?.regexPresetId || '';
  if (regexPresetId) {
    const p = regexStore.getPreset(regexPresetId);
    if (p) chips.appendChild(el('span', { className: 'yyt-tool-hero-chip preset', text: `正则: ${p.name}` }));
  }

  const status = config.runtime?.lastStatus;
  if (status) {
    const cls = status === 'success' ? 'status-success' : status === 'failed' ? 'status-failed' : '';
    chips.appendChild(el('span', { className: `yyt-tool-hero-chip ${cls}`, text: `上次执行 · ${status}` }));
  }
  hero.appendChild(chips);

  return hero;
}

function buildRuntimeRow(config) {
  const row = el('div', { className: 'yyt-tool-runtime-row' });
  const r = config.runtime || {};

  const stat = (label, value, valueClass = '') => {
    const node = el('div', { className: 'yyt-tool-runtime-stat' });
    node.appendChild(el('span', { className: 'yyt-tool-runtime-stat-label', text: label }));
    node.appendChild(el('span', { className: `yyt-tool-runtime-stat-value ${valueClass}`, text: value }));
    return node;
  };

  const statusText = r.lastStatus === 'success' ? '✓ 上次成功'
    : r.lastStatus === 'failed' ? '✗ 上次失败'
    : '待命';
  const statusClass = r.lastStatus === 'success' ? 'success' : r.lastStatus === 'failed' ? 'error' : 'muted';

  row.appendChild(stat('状态', statusText, statusClass));
  row.appendChild(stat('最近运行', fmtTime(r.lastRunAt), 'muted'));
  row.appendChild(stat('成功', String(r.successCount || 0), 'success'));
  row.appendChild(stat('失败', String(r.errorCount || 0), r.errorCount ? 'error' : 'muted'));
  return row;
}

function buildBindingSection(config, toolId, refresh) {
  const bindingsContainer = el('div', { style: { display: 'flex', flexDirection: 'column' } });

  // 1. 正则提取预设
  const regexPresets = regexStore.listPresets();
  bindingsContainer.appendChild(buildBindingRow({
    label: '正则提取预设',
    hint: '决定从 AI 回复中如何抽取要本地处理的文本',
    control: selectInput({
      value: config.extraction?.regexPresetId || '',
      options: [
        { value: '', label: '—— 无（不进行提取） ——' },
        ...regexPresets.map((p) => ({ value: p.id, label: p.name }))
      ],
      onChange: (v) => {
        const cur = getToolFullConfig(toolId) || {};
        const patch = { ...(cur.extraction || {}), regexPresetId: v };
        if (v) {
          const preset = regexStore.getPreset(v);
          log.info(`已绑定正则预设：${preset?.name || v}`, null, { toast: 'success' });
        } else {
          log.info('已解绑正则预设，工具将不进行内容提取', null, { toast: 'success' });
        }
        saveToolConfig(toolId, { ...cur, extraction: patch });
        refresh();
      }
    })
  }));

  // 2. 写回方式
  bindingsContainer.appendChild(buildBindingRow({
    label: '写回方式',
    hint: '处理后的结果如何回写到 AI 消息',
    control: selectInput({
      value: config.output?.overwrite !== false ? 'replace' : 'append',
      options: [
        { value: 'replace', label: '覆盖原工具块' },
        { value: 'append', label: '追加到末尾' }
      ],
      onChange: (v) => {
        const cur = getToolFullConfig(toolId) || {};
        saveToolConfig(toolId, {
          ...cur,
          output: { ...(cur.output || {}), overwrite: v === 'replace', enabled: true, mode: 'local_transform' }
        });
        refresh();
      }
    })
  }));

  // 3. 自动触发
  bindingsContainer.appendChild(buildBindingRow({
    label: '自动触发',
    hint: '收到 AI 回复后是否自动执行此脚本',
    control: selectInput({
      value: config.output?.autoTrigger !== false ? 'auto' : 'manual',
      options: [
        { value: 'auto', label: '自动（收到回复即执行）' },
        { value: 'manual', label: '手动（仅点击按钮执行）' }
      ],
      onChange: (v) => {
        const cur = getToolFullConfig(toolId) || {};
        saveToolConfig(toolId, {
          ...cur,
          output: { ...(cur.output || {}), autoTrigger: v === 'auto', enabled: true, mode: 'local_transform' }
        });
        refresh();
      }
    })
  }));

  return flowSection({
    heading: '绑定',
    icon: '🔗',
    content: [bindingsContainer]
  });
}

function buildBindingRow({ label, hint, control }) {
  const row = el('div', { className: 'yyt-tool-binding-row' });
  const labelBlock = el('div', { className: 'yyt-tool-binding-label' });
  labelBlock.appendChild(el('span', { className: 'yyt-tool-binding-label-text', text: label }));
  if (hint) labelBlock.appendChild(el('span', { className: 'yyt-tool-binding-label-hint', text: hint }));
  row.appendChild(labelBlock);
  Object.assign(control.el.style, { padding: '7px 10px', fontSize: '12px' });
  row.appendChild(control.el);
  row.appendChild(el('div', { className: 'yyt-tool-binding-meta' }));
  return row;
}

function buildConfigSection(config, toolId, refresh, $container, processorDirections, processorOptions, previewDialogId, previewTitle) {
  const container = el('div', { style: { display: 'flex', flexDirection: 'column' } });

  // ===== 执行方向子区 =====
  container.appendChild(el('div', { style: { marginBottom: '10px' } },
    el('div', { text: '执行方向', style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' } }),
    el('div', { text: '决定本地脚本运行哪个变换路径。', style: { fontSize: '11px', color: 'var(--yyt-text-muted)', lineHeight: '1.6' } })
  ));

  const currentDirection = config.processor?.direction || processorDirections[0]?.key || '';
  const directionSelect = selectInput({
    value: currentDirection,
    options: processorDirections.map((d) => ({ value: d.key, label: d.description ? `${d.label} — ${d.description}` : d.label })),
    style: { padding: '7px 10px', fontSize: '12px' },
    onChange: (v) => {
      const cur = getToolFullConfig(toolId) || {};
      saveToolConfig(toolId, {
        ...cur,
        processor: { ...(cur.processor || {}), direction: v }
      });
      refresh();
    }
  });
  container.appendChild(directionSelect.el);

  // 分隔
  container.appendChild(el('hr', { className: 'yyt-zone-divider' }));

  // ===== 处理项子区 =====
  if (processorOptions.length > 0) {
    container.appendChild(el('div', { style: { marginBottom: '10px' } },
      el('div', { text: '处理项', style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' } }),
      el('div', { text: '勾选要包含在本次变换中的项目。', style: { fontSize: '11px', color: 'var(--yyt-text-muted)', lineHeight: '1.6' } })
    ));

    const optsContainer = el('div', { style: { display: 'flex', flexDirection: 'column' } });
    const currentOptions = config.processor?.options || {};
    for (const opt of processorOptions) {
      const t = toggle({
        label: opt.label,
        hint: opt.description || '',
        checked: currentOptions[opt.key] === true,
        onChange: (v) => {
          const cur = getToolFullConfig(toolId) || {};
          saveToolConfig(toolId, {
            ...cur,
            processor: {
              ...(cur.processor || {}),
              options: { ...(cur.processor?.options || {}), [opt.key]: v }
            }
          });
        }
      });
      optsContainer.appendChild(t.el);
    }
    container.appendChild(optsContainer);

    container.appendChild(el('hr', { className: 'yyt-zone-divider' }));
  }

  // ===== 提取配置子区 =====
  container.appendChild(el('div', { style: { marginBottom: '10px' } },
    el('div', { text: '提取配置', style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' } }),
    el('div', { text: '从 AI 回复中抽取要本地处理的文本。完整规则由"正则提取预设"决定，这里只配置工具参数。', style: { fontSize: '11px', color: 'var(--yyt-text-muted)', lineHeight: '1.6' } })
  ));

  const extractRow = el('div', {
    style: { display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'end' }
  });

  const maxBox = el('div', { className: 'yyt-form-group', style: { margin: 0 } });
  maxBox.appendChild(el('label', {
    text: '最大提取 AI 消息数',
    style: { fontSize: '12px', fontWeight: '600', color: 'var(--yyt-text-secondary, rgba(255,255,255,0.55))' }
  }));
  const maxInput = el('input', {
    className: 'yyt-input',
    attrs: { type: 'number', min: '1', max: '50' },
    style: { padding: '7px 10px', fontSize: '12px' }
  });
  maxInput.value = String(Number(config.extraction?.maxMessages) || 5);
  maxInput.addEventListener('change', () => {
    const cur = getToolFullConfig(toolId) || {};
    saveToolConfig(toolId, {
      ...cur,
      extraction: { ...(cur.extraction || {}), maxMessages: Math.max(1, parseInt(maxInput.value, 10) || 5) }
    });
  });
  maxBox.appendChild(maxInput);
  extractRow.appendChild(maxBox);

  const testBtnBox = el('div', { className: 'yyt-form-group', style: { margin: 0 } });
  testBtnBox.appendChild(el('label', { html: '&nbsp;', style: { fontSize: '12px' } }));
  testBtnBox.appendChild(button({
    label: '🔍 测试提取',
    onClick: async () => {
      try {
        const result = await previewToolExtraction(toolId);
        showExtractionDialog($container, result, previewDialogId, previewTitle);
      } catch (error) {
        log.error(`测试提取失败：${error?.message || error}`, null, { toast: true });
      }
    }
  }).el);
  extractRow.appendChild(testBtnBox);

  container.appendChild(extractRow);

  return flowSection({
    heading: '配置',
    icon: '⚙',
    content: [container]
  });
}

function showExtractionDialog($container, result, previewDialogId, previewTitle) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) return;
  const dialogId = `${SCRIPT_ID}-${previewDialogId || 'extraction-preview'}`;

  const messageEntries = Array.isArray(result?.messageEntries) ? result.messageEntries : [];
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
                <div class="yyt-preview-message-title">${escapeHtmlSafe(recencyLabel)}</div>
                <div><label>原文</label><pre class="yyt-preview-box yyt-preview-pre">${escapeHtmlSafe(entry.rawText || '无可用消息')}</pre></div>
                <div><label>正文提取</label><pre class="yyt-preview-box yyt-preview-pre">${escapeHtmlSafe(entry.filteredText || '正文规则未命中')}</pre></div>
                <div><label>工具标签提取</label><pre class="yyt-preview-box yyt-preview-pre">${escapeHtmlSafe(entry.extractedText || '未提取到内容')}</pre></div>
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
        <div class="yyt-preview-box">${escapeHtmlSafe((result?.selectors || []).join('\n') || '无')}</div>
      </div>
      <div class="yyt-form-group">
        <label>原始内容汇总</label>
        <pre class="yyt-preview-box yyt-preview-pre">${escapeHtmlSafe(result?.sourceText || '无可用消息')}</pre>
      </div>
      <div class="yyt-form-group">
        <label>正文提取汇总</label>
        <pre class="yyt-preview-box yyt-preview-pre">${escapeHtmlSafe(result?.filteredSourceText || '正文规则未命中')}</pre>
      </div>
      <div class="yyt-form-group">
        <label>工具标签提取汇总</label>
        <pre class="yyt-preview-box yyt-preview-pre">${escapeHtmlSafe(result?.extractedText || '未提取到内容')}</pre>
      </div>
      ${messageEntriesHtml}
    `
  }));

  bindDialogEvents($container, dialogId, {
    onSave: (closeDialog) => closeDialog()
  });
  $container.find(`#${dialogId}-save`).text('关闭');
  $container.find(`#${dialogId}-cancel`).remove();
}

export default createLocalTransformToolPanel;
