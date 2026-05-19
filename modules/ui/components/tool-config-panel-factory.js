/**
 * YouYou Toolkit - 工具配置面板工厂（议题 #38 + #39 iter 1）
 *
 * 详见 docs/PHASE3_ARCHITECTURE.md §8（工具配置面板 HTML 重构）。
 *
 * 新布局：
 *   - Hero（工具名 + 描述 + chips + 立即执行/保存按钮）
 *   - Runtime 概览（4 列 inline）
 *   - 绑定区（5 个 select：输出模式 / API 预设 / Ai 指令预设 / 正则提取预设 / 世界书预设）
 *   - 配置区（提示词模板 + 提取配置：最大消息数 / 测试按钮 / 写回标签）
 *   - 无 footer / 无 自动触发区 / 无 settleMs+cooldownMs / 无内嵌正则/世界书 / 无 macro-hint 框
 *
 * iter 1 简化：
 *   - 选预设时镜像到老字段（runtime 仍读 worldbooks.selected / extraction.selectors）
 *   - 镜像规则有损：regex 预设的 exclude / regex_exclude 不映射；worldbook 预设的 includeDisabled / entryOverrides 不映射
 *   - 不做 hero sticky 压缩（iter 2）
 *   - 不做 active 状态点 / 自定义 dialog（iter 2）
 *   - 写回标签是 free text input（datalist 自动补全 iter 2）
 */

import {
  flowSection,
  formRow,
  textInput,
  selectInput,
  button,
  el
} from './controls/index.js';

import { getJQuery, isContainerValid, createDialogHtml, bindDialogEvents } from '../utils.js';
import { SCRIPT_ID } from '../utils.js';
import {
  getToolFullConfig,
  saveToolConfig,
  getToolBaseConfig
} from '../../tool-registry.js';
import { getAllPresets } from '../../preset-manager.js';
import { getPresetList as getBypassPresetList } from '../../bypass-manager.js';
import {
  runToolManually,
  previewToolExtraction
} from '../../tool-trigger.js';
import { logger } from '../../core/logger-service.js';

import regexStore from '../../regex-preset-store.js';
import worldbookStore from '../../worldbook-preset-store.js';

const log = logger.createScope('ToolConfigPanel');

// ──────────────────────────────────────────────────────────────
// 兼容样式（被 table-workbench-panel / local-transform-tool-panel-factory 引用）
// 新版面板自身样式都复用 main.css 中的 yyt-* 前缀类，所以这里只保留旧消费者会用到的最小集
// ──────────────────────────────────────────────────────────────
export const TOOL_CONFIG_PANEL_STYLES = `
  /* v1.0.211 #3 修复：hero 提到 .yyt-tool-panel-scroll 外面，hero 物理上不在滚动区内 →
     不会被滚走。.yyt-tool-panel 自身 overflow:hidden 防整体溢出，JS pinHeight 用
     .yyt-popup-body 测高强制写到 .yyt-tool-panel.style.height 上。*/
  .yyt-tool-panel {
    display: flex; flex-direction: column;
    height: 100%;
    overflow: hidden;
    gap: 0;
  }
  .yyt-tool-panel-hero {
    flex-shrink: 0;
    padding: 16px 20px;
    border-bottom: 1px solid var(--yyt-border);
    display: flex; flex-direction: column; gap: 8px;
    transition: padding 0.18s ease, gap 0.18s ease;
  }
  .yyt-tool-panel-hero.yyt-tool-panel-hero--compact {
    padding-top: 10px; padding-bottom: 10px;
    gap: 0;
  }
  .yyt-tool-panel-hero.yyt-tool-panel-hero--compact .yyt-tool-panel-hero-desc,
  .yyt-tool-panel-hero.yyt-tool-panel-hero--compact .yyt-tool-panel-hero-chips {
    display: none;
  }
  .yyt-tool-panel-scroll {
    flex: 1; min-height: 0;
    overflow-y: auto;
  }
  .yyt-tool-panel-scroll > .yyt-flow-section {
    padding-left: 20px;
    padding-right: 20px;
  }
  .yyt-tool-runtime-row + .yyt-flow-section {
    margin-top: 18px;
  }
  .yyt-tool-panel-hero-row1 { display: flex; align-items: center; gap: 12px; }
  .yyt-tool-panel-hero-icon {
    width: 30px; height: 30px; border-radius: var(--yyt-radius-sm);
    background: var(--yyt-accent-soft); color: var(--yyt-accent);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }
  .yyt-tool-panel-hero-name { flex: 1; font-size: 15px; font-weight: 700; color: var(--yyt-text); min-width: 0; }
  .yyt-tool-panel-hero-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .yyt-tool-panel-hero-desc { font-size: 12px; color: var(--yyt-text-muted); line-height: 1.7; padding-left: 42px; }
  .yyt-tool-panel-hero-chips { display: flex; gap: 6px; flex-wrap: wrap; padding-left: 42px; }
  .yyt-tool-hero-chip {
    display: inline-flex; align-items: center;
    padding: 2px 8px; border-radius: 999px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.3px;
    background: var(--yyt-surface-2); color: var(--yyt-text-muted);
  }
  .yyt-tool-hero-chip.mode { background: rgba(167,139,250,0.12); color: #a78bfa; }
  .yyt-tool-hero-chip.preset { background: var(--yyt-accent-soft); color: var(--yyt-accent); }
  .yyt-tool-hero-chip.status-success { background: rgba(74,222,128,0.12); color: #4ade80; }
  .yyt-tool-hero-chip.status-failed { background: rgba(239,68,68,0.12); color: #ef4444; }
  .yyt-tool-runtime-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
    padding: 12px 20px; border-bottom: 1px solid var(--yyt-border);
  }
  .yyt-tool-runtime-stat {
    display: flex; flex-direction: column; gap: 2px;
    border-left: 1px solid var(--yyt-border);
    padding-left: 14px;
  }
  .yyt-tool-runtime-stat:first-child { border-left: none; padding-left: 0; }
  .yyt-tool-runtime-stat-label {
    font-size: 10px; font-weight: 700; color: var(--yyt-text-muted);
    text-transform: uppercase; letter-spacing: 0.4px;
  }
  .yyt-tool-runtime-stat-value {
    font-size: 12px; font-weight: 600; color: var(--yyt-text);
    font-variant-numeric: tabular-nums;
  }
  .yyt-tool-runtime-stat-value.success { color: #4ade80; }
  .yyt-tool-runtime-stat-value.error { color: #ef4444; }
  .yyt-tool-runtime-stat-value.muted { color: var(--yyt-text-muted); }
  .yyt-tool-binding-row {
    display: grid; grid-template-columns: 130px 1fr auto;
    gap: 12px; align-items: center; padding: 10px 0;
  }
  .yyt-tool-binding-row + .yyt-tool-binding-row {
    border-top: 1px dashed rgba(255,255,255,0.08);
  }
  .yyt-tool-binding-label { display: flex; flex-direction: column; gap: 2px; }
  .yyt-tool-binding-label-text { font-size: 12px; font-weight: 600; color: var(--yyt-text-secondary, rgba(255,255,255,0.55)); }
  .yyt-tool-binding-label-hint { font-size: 10px; color: var(--yyt-text-muted); }
  .yyt-tool-binding-meta a { color: var(--yyt-accent); text-decoration: none; font-weight: 600; font-size: 11px; }
  .yyt-tool-binding-meta a:hover { text-decoration: underline; }
  .yyt-zone-divider { border: none; margin: 18px 0; height: 0; border-top: 1px dashed rgba(255,255,255,0.10); }
  .yyt-macro-inline {
    font-size: 11px; color: var(--yyt-text-muted);
    line-height: 1.7; margin-top: 6px;
    font-family: ui-monospace, monospace;
  }
  .yyt-macro-inline code {
    color: var(--yyt-accent); background: var(--yyt-surface-2);
    padding: 1px 5px; border-radius: 3px; font-size: 10px;
  }
`;

// ──────────────────────────────────────────────────────────────
// 工具函数
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

// 议题 #45 Stage 5：删除 mirror 函数（mirrorRegexPresetToSelectors / mirrorWorldbookPresetToLegacy）。
// runtime 现在直接读 extraction.regexPresetId / worldbooks.presetId 的预设规则。

/**
 * v1.0.211 #3 修复：嵌套 height:100% chain（.yyt-content / .yyt-tab-content / .yyt-sub-content /
 * .yyt-tool-panel）在宿主环境多层 flex item main-axis 解析后断裂，.yyt-tool-panel 被内容撑大，
 * 真正滚动跑到外层 .yyt-content，hero 跟着滚走。
 *
 * 这里用 .yyt-popup-body 作稳定锚（popup 核心结构），getBoundingClientRect 直接算
 * tabContent 顶到 popup-body 底的可用高度，强制写到 .yyt-tool-panel.style.height。
 *
 * 返回 cleanup 函数。
 */
function pinToolPanelHeight(containerEl) {
  if (!containerEl) return null;
  const popupBody = containerEl.closest('.yyt-popup-body');
  if (!popupBody) {
    log.warn('pinToolPanelHeight: 找不到 .yyt-popup-body 祖先');
    return null;
  }

  const apply = () => {
    const panel = containerEl.querySelector('.yyt-tool-panel');
    if (!panel) return;
    const popupRect = popupBody.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const h = popupRect.bottom - panelRect.top - 8;
    if (h > 100) {
      panel.style.height = `${h}px`;
    } else {
      log.warn(`pinToolPanelHeight: 计算高度异常 h=${h}`);
    }
  };

  apply();
  requestAnimationFrame(() => requestAnimationFrame(apply));

  if (typeof ResizeObserver === 'undefined') return null;
  const ro = new ResizeObserver(() => apply());
  ro.observe(popupBody);
  return () => {
    try { ro.disconnect(); } catch (_) {}
  };
}

/**
 * 监听 .yyt-tool-panel-scroll 的 scrollTop，> 0 时给 hero 加 compact class。
 * refresh 时 scroll 元素是新的，listener 随旧 DOM 自动 GC。
 */
function setupToolPanelScrollCompact(containerEl) {
  if (!containerEl) return;
  const hero = containerEl.querySelector('.yyt-tool-panel-hero');
  const scroll = containerEl.querySelector('.yyt-tool-panel-scroll');
  if (!hero || !scroll) return;

  const onScroll = () => {
    if (scroll.scrollTop > 0) {
      hero.classList.add('yyt-tool-panel-hero--compact');
    } else {
      hero.classList.remove('yyt-tool-panel-hero--compact');
    }
  };
  onScroll();
  scroll.addEventListener('scroll', onScroll, { passive: true });
}

// ──────────────────────────────────────────────────────────────
// 工厂主函数
// ──────────────────────────────────────────────────────────────

export function createToolConfigPanel(options = {}) {
  const {
    id,
    toolId,
    postResponseHint,
    previewDialogId,
    previewTitle = '测试提取结果',
    // 以下被新版面板忽略（保留入参防止 caller 报错）
    // extractionPlaceholder, toolKindLabel
  } = options;

  return {
    id,
    toolId,

    renderTo($container) {
      const containerEl = unwrap($container);
      if (!containerEl) return;
      if (containerEl._yytToolPanelCleanup) {
        try { containerEl._yytToolPanelCleanup(); } catch (_) {}
      }

      const refresh = () => this.renderTo($container);

      const config = getToolFullConfig(toolId);
      if (!config) {
        containerEl.innerHTML = '<div class="yyt-empty-state-small">工具配置加载失败</div>';
        return;
      }

      const root = el('div', { className: 'yyt-tool-panel', dataset: { toolId } });
      const sectionsToDestroy = [];

      // ===== Hero（提到 scroll-wrap 外面，物理上不在滚动区内）=====
      root.appendChild(buildHero(config, toolId, refresh, postResponseHint));

      // ===== Scroll wrap：runtime + binding + config =====
      const scrollWrap = el('div', { className: 'yyt-tool-panel-scroll' });

      // Runtime overview
      scrollWrap.appendChild(buildRuntimeRow(config));

      // Binding section
      const bindingSec = buildBindingSection(config, toolId, refresh);
      sectionsToDestroy.push(bindingSec);
      scrollWrap.appendChild(bindingSec.el);

      // Config section
      const configSec = buildConfigSection(config, toolId, refresh, $container, previewDialogId, previewTitle);
      sectionsToDestroy.push(configSec);
      scrollWrap.appendChild(configSec.el);

      root.appendChild(scrollWrap);

      containerEl.innerHTML = '';
      containerEl.appendChild(root);

      // 锁 .yyt-tool-panel 高度 + scroll compact 监听
      const pinCleanup = pinToolPanelHeight(containerEl);
      setupToolPanelScrollCompact(containerEl);

      containerEl._yytToolPanelCleanup = () => {
        for (const s of sectionsToDestroy) {
          try { s.destroy(); } catch (_) {}
        }
        if (typeof pinCleanup === 'function') {
          try { pinCleanup(); } catch (_) {}
        }
        delete containerEl._yytToolPanelCleanup;
      };
    },

    destroy(container) {
      const containerEl = unwrap(container);
      if (containerEl?._yytToolPanelCleanup) {
        try { containerEl._yytToolPanelCleanup(); } catch (_) {}
      }
    },

    getStyles() { return TOOL_CONFIG_PANEL_STYLES; }
  };
}

// ──────────────────────────────────────────────────────────────
// 子构造函数
// ──────────────────────────────────────────────────────────────

function buildHero(config, toolId, refresh, postResponseHint) {
  const hero = el('div', { className: 'yyt-tool-panel-hero' });

  const row1 = el('div', { className: 'yyt-tool-panel-hero-row1' });
  row1.appendChild(el('div', { className: 'yyt-tool-panel-hero-icon', text: '🔧' }));
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
    onClick: () => {
      // 编辑即保存模式，此按钮主要是给视觉确认 + 触发刷新
      log.info('配置已保存', null, { toast: 'success' });
      refresh();
    }
  }).el);
  row1.appendChild(actions);
  hero.appendChild(row1);

  if (config.description) {
    hero.appendChild(el('div', { className: 'yyt-tool-panel-hero-desc', text: config.description }));
  }

  // Chips
  const chips = el('div', { className: 'yyt-tool-panel-hero-chips' });
  const mode = config.output?.mode || 'follow_ai';
  const modeLabel = mode === 'post_response_api' ? '额外 AI 解析（自动）'
    : '随 AI 输出（手动）';
  chips.appendChild(el('span', { className: 'yyt-tool-hero-chip mode', text: modeLabel }));

  const apiPreset = config.output?.apiPreset || config.apiPreset || '';
  if (apiPreset) chips.appendChild(el('span', { className: 'yyt-tool-hero-chip preset', text: `API: ${apiPreset}` }));

  const regexPresetId = config.extraction?.regexPresetId || '';
  if (regexPresetId) {
    const p = regexStore.getPreset(regexPresetId);
    chips.appendChild(el('span', { className: 'yyt-tool-hero-chip preset', text: `正则: ${p ? p.name : '已删除'}` }));
  } else {
    chips.appendChild(el('span', { className: 'yyt-tool-hero-chip', text: '正则: 未绑定', style: { opacity: '0.6' } }));
  }

  const wbPresetId = config.worldbooks?.presetId || '';
  if (wbPresetId) {
    const p = worldbookStore.getPreset(wbPresetId);
    if (p) chips.appendChild(el('span', { className: 'yyt-tool-hero-chip preset', text: `世界书: ${p.name}` }));
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
    : r.lastStatus === 'idle' ? '待命' : (r.lastStatus || '待命');
  const statusClass = r.lastStatus === 'success' ? 'success' : r.lastStatus === 'failed' ? 'error' : 'muted';

  row.appendChild(stat('状态', statusText, statusClass));
  row.appendChild(stat('最近运行', fmtTime(r.lastRunAt), 'muted'));
  row.appendChild(stat('成功', String(r.successCount || 0), 'success'));
  row.appendChild(stat('失败', String(r.errorCount || 0), r.errorCount ? 'error' : 'muted'));
  return row;
}

function buildBindingSection(config, toolId, refresh) {
  // 绑定区不用 flow-section 的标准 content，而是自定义 grid 行
  const bindingsContainer = el('div', { style: { display: 'flex', flexDirection: 'column' } });

  // 1. 输出模式
  bindingsContainer.appendChild(buildBindingRow({
    label: '输出模式',
    hint: '决定执行路径 + 自动/手动',
    control: selectInput({
      value: config.output?.mode || 'follow_ai',
      options: [
        { value: 'follow_ai', label: 'follow_ai — 随 AI 输出（手动触发）' },
        { value: 'post_response_api', label: 'post_response_api — 额外 AI 解析（自动）' }
      ],
      onChange: (v) => {
        const cur = getToolFullConfig(toolId) || {};
        saveToolConfig(toolId, {
          ...cur,
          output: { ...(cur.output || {}), mode: v, enabled: v === 'post_response_api' }
        });
        refresh();
      }
    })
  }));

  // 2. API 预设
  const apiPresets = (() => { try { return getAllPresets() || []; } catch (_) { return []; } })();
  bindingsContainer.appendChild(buildBindingRow({
    label: 'API 预设',
    hint: '额外 AI 解析时使用',
    control: selectInput({
      value: config.output?.apiPreset || config.apiPreset || '',
      options: [
        { value: '', label: '—— 跟随当前主 API ——' },
        ...apiPresets.map((p) => ({ value: p.name, label: p.name }))
      ],
      onChange: (v) => {
        const cur = getToolFullConfig(toolId) || {};
        saveToolConfig(toolId, {
          ...cur,
          apiPreset: v,
          output: { ...(cur.output || {}), apiPreset: v }
        });
        refresh();
      }
    })
  }));

  // 3. Ai 指令预设（无开关）
  const bypassPresets = (() => { try { return getBypassPresetList() || []; } catch (_) { return []; } })();
  bindingsContainer.appendChild(buildBindingRow({
    label: 'Ai 指令预设',
    hint: '附加在 system/user 前的指令；选"无"即不启用',
    control: selectInput({
      value: config.bypass?.enabled ? (config.bypass?.presetId || '') : '',
      options: [
        { value: '', label: '—— 无 ——' },
        ...bypassPresets.map((p) => ({ value: p.id, label: `${p.name}${p.isDefault ? ' [默认]' : ''}` }))
      ],
      onChange: (v) => {
        const cur = getToolFullConfig(toolId) || {};
        saveToolConfig(toolId, {
          ...cur,
          bypass: { enabled: !!v, presetId: v || '' }
        });
        refresh();
      }
    })
  }));

  // 4. 正则提取预设
  const regexPresets = regexStore.listPresets();
  bindingsContainer.appendChild(buildBindingRow({
    label: '正则提取预设',
    hint: '决定从 AI 回复中如何抽取',
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

  // 5. 世界书预设
  const wbPresets = worldbookStore.listPresets();
  bindingsContainer.appendChild(buildBindingRow({
    label: '世界书预设',
    hint: '注入到 prompt 的 {{toolWorldbookContent}}',
    control: selectInput({
      value: config.worldbooks?.presetId || '',
      options: [
        { value: '', label: '—— 无（保留工具原有世界书设置） ——' },
        ...wbPresets.map((p) => ({ value: p.id, label: p.name }))
      ],
      onChange: (v) => {
        const cur = getToolFullConfig(toolId) || {};
        const patch = { ...(cur.worldbooks || {}), presetId: v };
        if (v) {
          const preset = worldbookStore.getPreset(v);
          log.info(`已绑定世界书预设：${preset?.name || v}`, null, { toast: 'success' });
        } else {
          log.info('已解绑世界书预设，工具不再注入世界书内容', null, { toast: 'success' });
        }
        saveToolConfig(toolId, { ...cur, worldbooks: patch });
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

  control.el.classList.add('small');
  Object.assign(control.el.style, { padding: '7px 10px', fontSize: '12px' });
  row.appendChild(control.el);

  row.appendChild(el('div', { className: 'yyt-tool-binding-meta' }));

  return row;
}

function buildConfigSection(config, toolId, refresh, $container, previewDialogId, previewTitle) {
  const container = el('div', { style: { display: 'flex', flexDirection: 'column' } });

  // ===== 提示词模板子区 =====
  container.appendChild(el('div', {
    style: { marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }
  },
    el('div', { style: { flex: '1' } },
      el('div', { text: '提示词模板', style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' } }),
      el('div', { text: '用 {{macro}} 引用上下文。模板内容会作为发给额外 AI 的 user 消息。', style: { fontSize: '11px', color: 'var(--yyt-text-muted)', lineHeight: '1.6' } })
    ),
    button({
      label: '🔄 重置为默认', size: 'small', variant: 'ghost',
      onClick: () => {
        if (!window.confirm('用工具默认模板覆盖当前模板？')) return;
        const base = getToolBaseConfig(toolId) || {};
        const cur = getToolFullConfig(toolId) || {};
        saveToolConfig(toolId, {
          ...cur,
          promptTemplate: base.promptTemplate || ''
        });
        refresh();
      }
    }).el
  ));

  const templateArea = el('textarea', {
    className: 'yyt-textarea yyt-code-textarea',
    attrs: { rows: '10', placeholder: '输入提示词模板...' },
    style: { width: '100%', resize: 'vertical', fontFamily: 'ui-monospace, monospace', fontSize: '12px', lineHeight: '1.7' }
  });
  templateArea.value = config.promptTemplate || '';
  templateArea.addEventListener('change', () => {
    const cur = getToolFullConfig(toolId) || {};
    saveToolConfig(toolId, { ...cur, promptTemplate: templateArea.value });
  });
  container.appendChild(templateArea);

  container.appendChild(el('div', {
    className: 'yyt-macro-inline',
    html: '可用宏：<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>'
  }));

  // 分隔
  container.appendChild(el('hr', { className: 'yyt-zone-divider' }));

  // ===== 提取配置子区 =====
  container.appendChild(el('div', { style: { marginBottom: '8px' } },
    el('div', { text: '提取配置', style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' } }),
    el('div', { text: '从 AI 回复中抽取并写回。完整规则由"正则提取预设"决定，这里只配置工具参数。', style: { fontSize: '11px', color: 'var(--yyt-text-muted)', lineHeight: '1.6' } })
  ));

  // 最大消息数 + 测试按钮
  const extractRow = el('div', {
    style: { display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'end', marginBottom: '12px' }
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

  // 写回标签 — 议题 #6 + Stage 6 datalist 自动补全
  const tagBox = el('div', { className: 'yyt-form-group', style: { margin: 0 } });
  tagBox.appendChild(el('label', {
    html: '写回标签 <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">（多标签提取时指定唯一写回标签；留空则提取首个）</span>',
    style: { fontSize: '12px', fontWeight: '600', color: 'var(--yyt-text-secondary, rgba(255,255,255,0.55))' }
  }));

  // 收集 datalist 候选：当前绑定预设的 include tag 优先；空绑定时合并所有预设的 include tag 去重
  const datalistId = `yyt-writeback-dl-${toolId}-${Math.random().toString(36).slice(2, 6)}`;
  const datalistEl = el('datalist', { attrs: { id: datalistId } });
  const includeTags = (() => {
    const seen = new Set();
    const out = [];
    function collect(preset) {
      if (!preset) return;
      for (const r of (preset.rules || [])) {
        if (r?.enabled === false) continue;
        if (r?.type !== 'include') continue;
        const v = String(r.value || '').trim();
        if (!v || seen.has(v)) continue;
        seen.add(v);
        out.push(v);
      }
    }
    const boundId = config.extraction?.regexPresetId;
    if (boundId) {
      collect(regexStore.getPreset(boundId));
    } else {
      for (const p of regexStore.listPresets()) collect(p);
    }
    return out;
  })();
  for (const tag of includeTags) {
    datalistEl.appendChild(el('option', { attrs: { value: tag } }));
  }

  const writebackInput = el('input', {
    className: 'yyt-input',
    attrs: {
      type: 'text',
      placeholder: '如 status / content（来自正则预设的 include 标签）',
      list: datalistId,
      autocomplete: 'off'
    },
    style: { padding: '7px 10px', fontSize: '12px' }
  });
  writebackInput.value = config.extraction?.writebackTag || '';
  writebackInput.addEventListener('change', () => {
    const cur = getToolFullConfig(toolId) || {};
    saveToolConfig(toolId, {
      ...cur,
      extraction: { ...(cur.extraction || {}), writebackTag: writebackInput.value.trim() }
    });
  });
  tagBox.appendChild(writebackInput);
  tagBox.appendChild(datalistEl);
  container.appendChild(tagBox);

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

function escapeHtmlSafe(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default createToolConfigPanel;
