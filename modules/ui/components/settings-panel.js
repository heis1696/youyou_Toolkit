/**
 * YouYou Toolkit - 设置面板组件
 * @description 提供全局设置的UI界面（v3.0 重做：对标填表工作台 / 工具配置面板）
 * @version 3.0.0
 */

import { settingsService, DEFAULT_SETTINGS } from '../../core/settings-service.js';
import { logger, LOG_LEVEL } from '../../core/logger-service.js';
import { variableResolver } from '../../variable-resolver.js';
import { showConfirm, getJQuery } from '../utils.js';
import {
  el,
  textInput, selectInput,
  toggle, button
} from './controls/index.js';

const log = logger.createScope('SettingsPanel');

// ============================================================
// 主题配置（保持不变）
// ============================================================

const BASE_THEME_TOKENS = {
  '--yyt-accent': '#7bb7ff',
  '--yyt-accent-glow': 'rgba(123, 183, 255, 0.4)',
  '--yyt-accent-soft': 'rgba(123, 183, 255, 0.15)',
  '--yyt-accent-strong': '#a5d4ff',
  '--yyt-on-accent': '#0a0d13',
  '--yyt-bg-base': '#0a0d13',
  '--yyt-surface': '#0f1219',
  '--yyt-surface-2': '#151a24',
  '--yyt-surface-3': '#1c2231',
  '--yyt-surface-hover': '#1c2231',
  '--yyt-surface-active': '#232b3e',
  '--yyt-border': 'rgba(255, 255, 255, 0.06)',
  '--yyt-border-soft': 'rgba(255, 255, 255, 0.04)',
  '--yyt-border-strong': 'rgba(255, 255, 255, 0.12)',
  '--yyt-text': 'rgba(255, 255, 255, 0.92)',
  '--yyt-text-secondary': 'rgba(255, 255, 255, 0.55)',
  '--yyt-text-muted': 'rgba(255, 255, 255, 0.35)',
  '--yyt-focus-ring': '0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)',
  '--yyt-control-bg': '#0f1219',
  '--yyt-control-bg-hover': '#151a24',
  '--yyt-control-bg-active': '#1c2231',
  '--yyt-control-bg-strong': '#151a24',
  '--yyt-control-bg-focus': '#151a24',
  '--yyt-control-border': 'rgba(255, 255, 255, 0.08)',
  '--yyt-control-border-hover': 'rgba(255, 255, 255, 0.14)',
  '--yyt-control-border-focus': 'rgba(123, 183, 255, 0.5)',
  '--yyt-control-shadow': 'none',
  '--yyt-control-shadow-hover': 'none',
  '--yyt-control-shadow-focus': 'none',
  '--yyt-control-shadow-active': 'none',
  '--yyt-select-surface': '#151a24',
  '--yyt-select-option-bg': '#1c2231',
  '--yyt-select-option-hover-bg': '#232b3e',
  '--yyt-select-option-selected-bg': '#2a3450',
  '--yyt-select-option-border': 'rgba(123, 183, 255, 0.15)',
  '--yyt-select-option-selected-border': 'rgba(123, 183, 255, 0.3)',
  '--yyt-select-dropdown-shadow': '0 8px 24px rgba(0, 0, 0, 0.4)',
  '--yyt-select-arrow-color': 'rgba(255, 255, 255, 0.4)'
};

const THEME_CONFIGS = {
  'dark-blue': {
    '--yyt-on-accent': '#0a0d13'
  },
  'dark-purple': {
    '--yyt-accent': '#a78bfa',
    '--yyt-accent-glow': 'rgba(167, 139, 250, 0.4)',
    '--yyt-accent-soft': 'rgba(167, 139, 250, 0.15)',
    '--yyt-accent-strong': '#c4b5fd',
    '--yyt-bg-base': '#0d0a14',
    '--yyt-surface': '#12101c',
    '--yyt-surface-2': '#1a1726',
    '--yyt-surface-3': '#221e32',
    '--yyt-surface-hover': '#221e32',
    '--yyt-surface-active': '#2a2540',
    '--yyt-on-accent': '#0d0a14',
    '--yyt-control-bg': '#12101c',
    '--yyt-control-bg-hover': '#1a1726',
    '--yyt-control-bg-active': '#221e32',
    '--yyt-control-bg-strong': '#1a1726',
    '--yyt-control-bg-focus': '#1a1726',
    '--yyt-control-border-focus': 'rgba(167, 139, 250, 0.5)',
    '--yyt-select-surface': '#1a1726',
    '--yyt-select-option-bg': '#221e32',
    '--yyt-select-option-hover-bg': '#2a2540',
    '--yyt-select-option-selected-bg': '#332d50',
    '--yyt-select-option-border': 'rgba(167, 139, 250, 0.15)',
    '--yyt-select-option-selected-border': 'rgba(167, 139, 250, 0.3)',
    '--yyt-focus-ring': '0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)'
  },
  'dark-green': {
    '--yyt-accent': '#4ade80',
    '--yyt-accent-glow': 'rgba(74, 222, 128, 0.4)',
    '--yyt-accent-soft': 'rgba(74, 222, 128, 0.15)',
    '--yyt-accent-strong': '#86efac',
    '--yyt-bg-base': '#0a120d',
    '--yyt-surface': '#0f1912',
    '--yyt-surface-2': '#151f1a',
    '--yyt-surface-3': '#1c2824',
    '--yyt-surface-hover': '#1c2824',
    '--yyt-surface-active': '#233530',
    '--yyt-on-accent': '#0a120d',
    '--yyt-control-bg': '#0f1912',
    '--yyt-control-bg-hover': '#151f1a',
    '--yyt-control-bg-active': '#1c2824',
    '--yyt-control-bg-strong': '#151f1a',
    '--yyt-control-bg-focus': '#151f1a',
    '--yyt-control-border-focus': 'rgba(74, 222, 128, 0.5)',
    '--yyt-select-surface': '#151f1a',
    '--yyt-select-option-bg': '#1c2824',
    '--yyt-select-option-hover-bg': '#233530',
    '--yyt-select-option-selected-bg': '#2a4038',
    '--yyt-select-option-border': 'rgba(74, 222, 128, 0.15)',
    '--yyt-select-option-selected-border': 'rgba(74, 222, 128, 0.3)',
    '--yyt-focus-ring': '0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)'
  },
  'light': {
    '--yyt-accent': '#3b82f6',
    '--yyt-accent-glow': 'rgba(59, 130, 246, 0.3)',
    '--yyt-accent-soft': 'rgba(59, 130, 246, 0.1)',
    '--yyt-accent-strong': '#93c5fd',
    '--yyt-bg-base': '#f5f7fa',
    '--yyt-surface': '#edf0f5',
    '--yyt-surface-2': '#e4e8ef',
    '--yyt-surface-3': '#dbe0e9',
    '--yyt-surface-hover': '#dbe0e9',
    '--yyt-surface-active': '#d1d7e2',
    '--yyt-text': 'rgba(15, 23, 42, 0.92)',
    '--yyt-text-secondary': 'rgba(15, 23, 42, 0.55)',
    '--yyt-text-muted': 'rgba(15, 23, 42, 0.35)',
    '--yyt-border': 'rgba(15, 23, 42, 0.08)',
    '--yyt-border-soft': 'rgba(15, 23, 42, 0.04)',
    '--yyt-border-strong': 'rgba(15, 23, 42, 0.14)',
    '--yyt-focus-ring': '0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)',
    '--yyt-on-accent': '#ffffff',
    '--yyt-control-bg': '#edf0f5',
    '--yyt-control-bg-hover': '#e4e8ef',
    '--yyt-control-bg-active': '#dbe0e9',
    '--yyt-control-bg-strong': '#e4e8ef',
    '--yyt-control-bg-focus': '#e4e8ef',
    '--yyt-control-border': 'rgba(15, 23, 42, 0.1)',
    '--yyt-control-border-hover': 'rgba(15, 23, 42, 0.18)',
    '--yyt-control-border-focus': 'rgba(59, 130, 246, 0.5)',
    '--yyt-control-shadow': 'none',
    '--yyt-control-shadow-hover': 'none',
    '--yyt-control-shadow-focus': 'none',
    '--yyt-control-shadow-active': 'none',
    '--yyt-select-surface': '#e4e8ef',
    '--yyt-select-option-bg': '#edf0f5',
    '--yyt-select-option-hover-bg': '#dbe0e9',
    '--yyt-select-option-selected-bg': '#dbeafe',
    '--yyt-select-option-border': 'rgba(59, 130, 246, 0.12)',
    '--yyt-select-option-selected-border': 'rgba(59, 130, 246, 0.3)',
    '--yyt-select-dropdown-shadow': '0 8px 24px rgba(15, 23, 42, 0.1)',
    '--yyt-select-arrow-color': 'rgba(15, 23, 42, 0.4)'
  }
};

function getTargetWindow() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent;
    }
  } catch (_) {}
  return window;
}

function getTargetDocument() {
  return getTargetWindow()?.document || document;
}

function getTargetRoot(targetDocument = getTargetDocument()) {
  return targetDocument?.documentElement || document.documentElement;
}

function applyTheme(themeName, targetDocument = getTargetDocument()) {
  const root = getTargetRoot(targetDocument);
  const theme = {
    ...BASE_THEME_TOKENS,
    ...(THEME_CONFIGS[themeName] || THEME_CONFIGS['dark-blue'])
  };
  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  root.setAttribute('data-yyt-theme', themeName);
}

function applyUiPreferences(uiSettings = {}, targetDocument = getTargetDocument()) {
  const root = getTargetRoot(targetDocument);
  const {
    theme = 'dark-blue',
    compactMode = false,
    animationEnabled = true
  } = uiSettings || {};
  applyTheme(theme, targetDocument);
  root.classList.toggle('yyt-compact-mode', !!compactMode);
  root.classList.toggle('yyt-no-animation', !animationEnabled);
}

// ============================================================
// 控件注册器
// ============================================================

function createControlRegistry() {
  const controls = new Map();
  return {
    add(control) {
      if (control?._id) controls.set(control._id, control);
      return control;
    },
    getControl(id) {
      return controls.get(id) || null;
    },
    destroy() {
      for (const control of controls.values()) {
        try { control.destroy?.(); } catch (_) {}
      }
      controls.clear();
    }
  };
}

// ============================================================
// 视图构造器
// ============================================================

function fa(name) {
  return el('i', { className: `fa-solid ${name}` });
}

function buildHero(settings, runtime, onReset, onSave) {
  const hero = el('div', { className: 'yyt-settings-hero' });

  // row1: icon + name + actions
  const row1 = el('div', { className: 'yyt-settings-hero-row1' });
  row1.appendChild(el('div', { className: 'yyt-settings-hero-icon' }, [fa('fa-sliders')]));
  row1.appendChild(el('div', { className: 'yyt-settings-hero-name', text: '全局设置' }));

  const actions = el('div', { className: 'yyt-settings-hero-actions' });
  actions.appendChild(button({
    label: '重置为默认', size: 'small', icon: '↩',
    onClick: onReset
  }).el);
  actions.appendChild(button({
    label: '保存设置', size: 'small', variant: 'primary', icon: '✓',
    onClick: onSave
  }).el);
  row1.appendChild(actions);
  hero.appendChild(row1);

  // desc
  hero.appendChild(el('div', {
    className: 'yyt-settings-hero-desc',
    text: '管理执行器、自动化、调试与外观偏好。'
  }));

  // chips（当前设置摘要）
  const ui = settings.ui || {};
  const debug = settings.debug || {};
  const themeLabel = { 'dark-blue': '深蓝', 'dark-purple': '深紫', 'dark-green': '深绿', 'light': '浅色' }[ui.theme] || '默认';
  const chips = el('div', { className: 'yyt-settings-hero-chips' });
  chips.appendChild(el('span', { className: 'yyt-settings-chip mode', text: `主题 ${themeLabel}` }));
  chips.appendChild(el('span', {
    className: 'yyt-settings-chip preset',
    text: `日志 ${debug.enableDebugLog ? 'DEBUG' : 'INFO'}`
  }));
  chips.appendChild(el('span', {
    className: 'yyt-settings-chip',
    text: `动画 ${ui.animationEnabled === false ? '关闭' : '开启'}`
  }));
  chips.appendChild(el('span', {
    className: 'yyt-settings-chip',
    text: `紧凑 ${ui.compactMode ? '开' : '关'}`
  }));
  hero.appendChild(chips);

  return hero;
}

function buildSection({ icon, title, action = null }, content = []) {
  const section = el('div', { className: 'yyt-settings-section' });

  const heading = el('div', { className: 'yyt-settings-section-heading' });
  if (icon) {
    const iconWrap = el('span', { className: 'yyt-settings-section-icon' });
    iconWrap.appendChild(fa(icon));
    heading.appendChild(iconWrap);
  }
  heading.appendChild(el('span', { text: title }));
  if (action) {
    const actionWrap = el('span', { className: 'yyt-settings-section-action' });
    actionWrap.appendChild(action);
    heading.appendChild(actionWrap);
  }
  section.appendChild(heading);

  for (const c of content) {
    if (!c) continue;
    section.appendChild(c?.el ? c.el : c);
  }
  return section;
}

function buildRow({ label, hint, control }) {
  const row = el('div', { className: 'yyt-settings-row' });
  const labelBlock = el('div', { className: 'yyt-settings-row-label' });
  labelBlock.appendChild(el('span', { className: 'yyt-settings-row-label-text', text: label }));
  if (hint) labelBlock.appendChild(el('span', { className: 'yyt-settings-row-label-hint', text: hint }));
  row.appendChild(labelBlock);
  row.appendChild(control?.el ? control.el : control);
  return row;
}

function buildRowDouble({ label, hint, leftLabel, leftControl, rightLabel, rightControl }) {
  const row = el('div', { className: 'yyt-settings-row-double' });
  const labelBlock = el('div', { className: 'yyt-settings-row-label' });
  labelBlock.appendChild(el('span', { className: 'yyt-settings-row-label-text', text: label }));
  if (hint) labelBlock.appendChild(el('span', { className: 'yyt-settings-row-label-hint', text: hint }));
  row.appendChild(labelBlock);

  const leftCell = el('div', { className: 'yyt-settings-row-double-cell' });
  if (leftLabel) leftCell.appendChild(el('span', { className: 'yyt-settings-row-double-cell-label', text: leftLabel }));
  leftCell.appendChild(leftControl?.el ? leftControl.el : leftControl);
  row.appendChild(leftCell);

  const rightCell = el('div', { className: 'yyt-settings-row-double-cell' });
  if (rightLabel) rightCell.appendChild(el('span', { className: 'yyt-settings-row-double-cell-label', text: rightLabel }));
  rightCell.appendChild(rightControl?.el ? rightControl.el : rightControl);
  row.appendChild(rightCell);
  return row;
}

function buildToggleRow({ title, desc, control }) {
  const row = el('div', { className: 'yyt-settings-toggle-row' });
  const info = el('div', { className: 'yyt-settings-toggle-info' });
  info.appendChild(el('div', { className: 'yyt-settings-toggle-title', text: title }));
  if (desc) info.appendChild(el('div', { className: 'yyt-settings-toggle-desc', text: desc }));
  row.appendChild(info);
  row.appendChild(control?.el ? control.el : control);
  return row;
}

function buildHintNote(html) {
  return el('div', { className: 'yyt-settings-hint-note', html });
}

function buildStatRow(runtime) {
  const hostBinding = runtime?.hostBinding || {};
  const row = el('div', { className: 'yyt-settings-stat-row' });

  const stat = (label, value, cls = '') => {
    const node = el('div', { className: 'yyt-settings-stat' });
    node.appendChild(el('span', { className: 'yyt-settings-stat-label', text: label }));
    node.appendChild(el('span', { className: `yyt-settings-stat-value ${cls}`.trim(), text: value }));
    return node;
  };

  row.appendChild(stat('服务', runtime?.enabled ? '运行中' : '未启用', runtime?.enabled ? 'success' : 'error'));
  row.appendChild(stat('监听', hostBinding.initialized ? '已绑定' : '未绑定', hostBinding.initialized ? 'success' : 'error'));
  row.appendChild(stat('待处理', String(runtime?.pendingTimerCount || 0), runtime?.pendingTimerCount ? '' : 'muted'));
  row.appendChild(stat('排队槽位', String(runtime?.queuedSlotCount || 0), runtime?.queuedSlotCount ? '' : 'muted'));
  return row;
}

function buildRuntimeList(recentTransactions) {
  if (!recentTransactions.length) {
    return el('div', {
      className: 'yyt-settings-hint-note',
      text: '暂无自动化事务记录。'
    });
  }
  const list = el('div', { className: 'yyt-runtime-list' });
  for (const tx of recentTransactions.slice(0, 5)) {
    const row = el('div', { className: 'yyt-runtime-list-row' });
    row.appendChild(el('span', {
      className: 'yyt-runtime-event',
      text: tx?.sourceEvent || 'UNKNOWN_EVENT'
    }));
    const phase = tx?.phase || 'unknown';
    let phaseCls = '';
    if (phase === 'completed' || tx?.verdict === 'success') phaseCls = 'success';
    else if (phase === 'failed' || tx?.error) phaseCls = 'error';
    row.appendChild(el('span', {
      className: `yyt-runtime-phase ${phaseCls}`.trim(),
      text: phase
    }));
    const detail = [tx?.messageId || 'no_message_id', tx?.verdict || tx?.error || tx?.generationKey || '']
      .filter(Boolean).join(' · ');
    row.appendChild(el('span', { className: 'yyt-runtime-main', text: detail || '无额外信息' }));
    list.appendChild(row);
  }
  return list;
}

function buildMacroList() {
  const vars = variableResolver.getAvailableVariables();
  const list = el('div', { className: 'yyt-macro-list' });
  for (const v of vars) {
    const row = el('div', { className: 'yyt-macro-row' });
    row.appendChild(el('code', { text: v.name }));
    row.appendChild(el('span', { text: v.description }));
    list.appendChild(row);
  }
  return list;
}

function buildNumberInput(registry, id, value, { min, max, step } = {}) {
  const attrs = {};
  if (min != null) attrs.min = String(min);
  if (max != null) attrs.max = String(max);
  if (step != null) attrs.step = String(step);
  return registry.add(textInput({ id, type: 'number', value: String(value), attrs }));
}

// ============================================================
// 组件定义
// ============================================================

export const SettingsPanel = {
  id: 'settingsPanel',

  _instance: null,

  _getAutomationRuntime() {
    try {
      return getTargetWindow()?.YouYouToolkit?.getAutomationRuntime?.() || null;
    } catch (_) {
      return null;
    }
  },

  renderTo($container) {
    const $ = getJQuery();
    if (!$ || !$container?.length) return;

    const settings = settingsService.getSettings();
    const executor = settings.executor || {};
    const automation = settings.automation || {};
    const debug = settings.debug || {};
    const ui = settings.ui || {};
    const runtime = this._getAutomationRuntime();
    const recentTransactions = Array.isArray(runtime?.recentTransactions) ? runtime.recentTransactions.slice().reverse() : [];
    const hostBinding = runtime?.hostBinding || {};

    const controlRegistry = createControlRegistry();

    const handleReset = async () => {
      if (await showConfirm('重置设置', '确定要重置所有设置为默认值吗？', { danger: true })) {
        settingsService.resetSettings();
        applyUiPreferences(DEFAULT_SETTINGS.ui, getTargetDocument());
        SettingsPanel.renderTo($container);
        log.info('设置已重置', null, { toast: 'success' });
      }
    };
    const handleSave = () => {
      SettingsPanel._saveFromControls(controlRegistry, $container);
    };

    // ── 根容器 ──
    const panel = el('div', { className: 'yyt-settings-panel' });

    // ── Hero（含 actions + chips）──
    panel.appendChild(buildHero(settings, runtime, handleReset, handleSave));

    // ── Tabs（underline 风格，自定义类，不复用 yyt-tab-group） ──
    const tabContentMap = new Map();
    const tabBar = el('div', { className: 'yyt-settings-tabs' });
    const tabItems = [
      { id: 'executor', label: '执行器', icon: 'fa-microchip' },
      { id: 'debug',    label: '调试',   icon: 'fa-bug' },
      { id: 'ui',       label: '外观',   icon: 'fa-palette' }
    ];
    const tabBtnMap = new Map();
    const switchTab = (tabId) => {
      for (const [id, btn] of tabBtnMap) btn.classList.toggle('yyt-active', id === tabId);
      for (const [id, contentEl] of tabContentMap) contentEl.classList.toggle('yyt-active', id === tabId);
    };
    for (const item of tabItems) {
      const tabBtn = el('button', {
        className: 'yyt-settings-tab' + (item.id === 'executor' ? ' yyt-active' : ''),
        attrs: { type: 'button' }
      });
      tabBtn.appendChild(fa(item.icon));
      tabBtn.appendChild(el('span', { text: item.label }));
      tabBtn.addEventListener('click', () => switchTab(item.id));
      tabBar.appendChild(tabBtn);
      tabBtnMap.set(item.id, tabBtn);
    }
    panel.appendChild(tabBar);

    // ── Scroll wrap + body ──
    const scrollWrap = el('div', { className: 'yyt-settings-scroll' });
    const body = el('div', { className: 'yyt-settings-body' });
    scrollWrap.appendChild(body);

    // ====== Executor Tab ======
    const executorPane = el('div', { className: 'yyt-settings-tab-pane yyt-active' });

    executorPane.appendChild(buildSection(
      { icon: 'fa-gauge-high', title: '执行限制' },
      [
        buildRow({
          label: '最大并发数',
          hint: '同时执行的工具数量上限（1 ~ 10）',
          control: buildNumberInput(controlRegistry, 'maxConcurrent', executor.maxConcurrent ?? 3, { min: 1, max: 10 })
        }),
        buildRow({
          label: '队列处理方式',
          hint: '决定待执行工具的排队顺序',
          control: controlRegistry.add(selectInput({
            id: 'queueStrategy',
            options: [
              { value: 'fifo', label: 'FIFO (先进先出)' },
              { value: 'lifo', label: 'LIFO (后进先出)' },
              { value: 'priority', label: '优先级排序' }
            ],
            value: executor.queueStrategy || 'fifo'
          }))
        })
      ]
    ));

    executorPane.appendChild(buildSection(
      { icon: 'fa-rotate-right', title: '重试与超时' },
      [
        buildRowDouble({
          label: '重试策略',
          hint: '失败后自动重试的次数与间隔',
          leftLabel: '次数',
          leftControl: buildNumberInput(controlRegistry, 'maxRetries', executor.maxRetries ?? 2, { min: 0, max: 10 }),
          rightLabel: '间隔 ms',
          rightControl: buildNumberInput(controlRegistry, 'retryDelayMs', executor.retryDelayMs ?? 5000, { min: 1000, max: 60000, step: 1000 })
        }),
        buildRow({
          label: '请求超时时间 (ms)',
          hint: '单个请求超过该时长将自动中断',
          control: buildNumberInput(controlRegistry, 'requestTimeoutMs', executor.requestTimeoutMs ?? 90000, { min: 10000, max: 300000, step: 10000 })
        })
      ]
    ));

    executorPane.appendChild(buildSection(
      { icon: 'fa-bolt', title: '自动触发' },
      [
        buildHintNote('由各工具的 <code>output_mode</code> 决定哪些工具自动触发。这里只控制全局节流时间。'),
        buildRowDouble({
          label: '节流参数',
          hint: '等待稳定后触发，触发后再冷却',
          leftLabel: '稳定 ms',
          leftControl: buildNumberInput(controlRegistry, 'automationSettleMs', automation.settleMs ?? 1200, { min: 0, max: 10000, step: 100 }),
          rightLabel: '冷却 ms',
          rightControl: buildNumberInput(controlRegistry, 'automationCooldownMs', automation.cooldownMs ?? 5000, { min: 0, max: 60000, step: 100 })
        })
      ]
    ));

    // 自动触发诊断
    const diagSectionContent = [buildStatRow(runtime)];
    const eventBindingText = Array.isArray(hostBinding.eventBindings) && hostBinding.eventBindings.length > 0
      ? hostBinding.eventBindings.join(' / ') : '暂无事件绑定';
    diagSectionContent.push(buildHintNote(
      `事件源: <code>${hostBinding.source || 'unavailable'}</code>；事件: <code>${eventBindingText}</code>`
    ));
    if (hostBinding.lastError) {
      diagSectionContent.push(buildHintNote(`最近错误: <code>${hostBinding.lastError}</code>`));
    }
    diagSectionContent.push(buildRuntimeList(recentTransactions));
    executorPane.appendChild(buildSection(
      { icon: 'fa-magnifying-glass-chart', title: '自动触发诊断' },
      diagSectionContent
    ));

    body.appendChild(executorPane);
    tabContentMap.set('executor', executorPane);

    // ====== Debug Tab ======
    const debugPane = el('div', { className: 'yyt-settings-tab-pane' });

    debugPane.appendChild(buildSection(
      { icon: 'fa-terminal', title: '日志与历史' },
      [
        buildToggleRow({
          title: '启用调试日志',
          desc: '开启后 Logger 面板将记录 DEBUG 级别日志，关闭仅记录 INFO 及以上',
          control: controlRegistry.add(toggle({ id: 'enableDebugLog', checked: debug.enableDebugLog }))
        }),
        buildToggleRow({
          title: '保存执行历史',
          desc: '记录工具执行历史，便于问题排查',
          control: controlRegistry.add(toggle({ id: 'saveExecutionHistory', checked: debug.saveExecutionHistory }))
        })
      ]
    ));

    debugPane.appendChild(buildSection(
      { icon: 'fa-eye', title: '显示辅助' },
      [
        buildToggleRow({
          title: '显示运行状态徽章',
          desc: '在工具卡片上显示运行状态指示器',
          control: controlRegistry.add(toggle({ id: 'showRuntimeBadge', checked: debug.showRuntimeBadge }))
        })
      ]
    ));

    body.appendChild(debugPane);
    tabContentMap.set('debug', debugPane);

    // ====== UI Tab ======
    const uiPane = el('div', { className: 'yyt-settings-tab-pane' });

    uiPane.appendChild(buildSection(
      { icon: 'fa-palette', title: '主题与动效' },
      [
        buildRow({
          label: '主题',
          hint: '切换后保存即可应用到全局界面',
          control: controlRegistry.add(selectInput({
            id: 'theme',
            options: [
              { value: 'dark-blue', label: '深蓝' },
              { value: 'dark-purple', label: '深紫' },
              { value: 'dark-green', label: '深绿' },
              { value: 'light', label: '浅色' }
            ],
            value: ui.theme || 'dark-blue'
          }))
        }),
        buildToggleRow({
          title: '紧凑模式',
          desc: '减少卡片间距，显示更多内容',
          control: controlRegistry.add(toggle({ id: 'compactMode', checked: ui.compactMode }))
        }),
        buildToggleRow({
          title: '启用动画效果',
          desc: '界面过渡和交互动画',
          control: controlRegistry.add(toggle({ id: 'animationEnabled', checked: ui.animationEnabled }))
        })
      ]
    ));

    uiPane.appendChild(buildSection(
      { icon: 'fa-code', title: '模板宏说明' },
      [
        buildHintNote('工具模板里可直接使用下面这些宏。世界书内容只有在模板里显式写入 <code>{{toolWorldbookContent}}</code> 时才会注入。'),
        buildMacroList()
      ]
    ));

    body.appendChild(uiPane);
    tabContentMap.set('ui', uiPane);

    panel.appendChild(scrollWrap);

    // ── 挂载 ──
    $container.empty().append(panel);

    this._instance = { root: controlRegistry, _tabPanels: tabContentMap };

    // 同步 logger 级别
    const savedDebug = settingsService.getDebugSettings();
    logger.setLevel(savedDebug.enableDebugLog ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
  },

  _saveFromControls(registry, $container) {
    const get = (id) => {
      const ctrl = registry.getControl(id);
      return ctrl ? ctrl.get() : null;
    };

    const numberFields = [
      { id: 'maxConcurrent',    min: 1,     max: 10,     label: '最大并发数' },
      { id: 'maxRetries',       min: 0,     max: 10,     label: '最大重试次数' },
      { id: 'retryDelayMs',     min: 1000,  max: 60000,  label: '重试间隔' },
      { id: 'requestTimeoutMs', min: 10000, max: 300000, label: '请求超时时间' },
      { id: 'automationSettleMs', min: 0,   max: 10000,  label: '等待稳定时间' },
      { id: 'automationCooldownMs', min: 0, max: 60000,  label: '自动化冷却时间' }
    ];

    for (const field of numberFields) {
      const raw = get(field.id);
      const val = parseInt(raw, 10);
      if (isNaN(val) || val < field.min || val > field.max) {
        log.warn(`${field.label} 须在 ${field.min} ~ ${field.max} 之间`, null, { toast: true });
        const ctrl = registry.getControl(field.id);
        if (ctrl?.focus) ctrl.focus();
        if (ctrl?.select) ctrl.select();
        return;
      }
    }

    const settings = {
      executor: {
        maxConcurrent: parseInt(get('maxConcurrent'), 10) || 3,
        maxRetries: parseInt(get('maxRetries'), 10) || 2,
        retryDelayMs: parseInt(get('retryDelayMs'), 10) || 5000,
        requestTimeoutMs: parseInt(get('requestTimeoutMs'), 10) || 90000,
        queueStrategy: get('queueStrategy') || 'fifo'
      },
      automation: {
        settleMs: parseInt(get('automationSettleMs'), 10) || 1200,
        cooldownMs: parseInt(get('automationCooldownMs'), 10) || 5000,
        maxConcurrentSlots: settingsService.getSettings()?.automation?.maxConcurrentSlots || 1
      },
      debug: {
        enableDebugLog: !!get('enableDebugLog'),
        saveExecutionHistory: !!get('saveExecutionHistory'),
        showRuntimeBadge: !!get('showRuntimeBadge')
      },
      ui: {
        theme: get('theme') || 'dark-blue',
        compactMode: !!get('compactMode'),
        animationEnabled: !!get('animationEnabled')
      }
    };

    settingsService.saveSettings(settings);
    logger.setLevel(settings.debug.enableDebugLog ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
    applyUiPreferences(settings.ui, getTargetDocument());
    log.info('设置已保存', null, { toast: 'success' });

    // 刷新一次面板，让 hero chips 反映最新设置
    SettingsPanel.renderTo($container);
  },

  render() { return ''; },
  getStyles() { return ''; },
  bindEvents() {},

  destroy($container) {
    if (this._instance?.root) {
      try { this._instance.root.destroy(); } catch (_) {}
    }
    this._instance = null;
    const $ = getJQuery();
    if ($ && $container?.length) {
      $container.empty();
    }
  }
};

export { applyTheme, applyUiPreferences };
export default SettingsPanel;
