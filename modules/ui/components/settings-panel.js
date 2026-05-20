/**
 * YouYou Toolkit - 设置面板组件
 * @description 提供全局设置的UI界面
 * @version 2.0.0
 */

import { settingsService, DEFAULT_SETTINGS } from '../../core/settings-service.js';
import { logger, LOG_LEVEL } from '../../core/logger-service.js';
import { variableResolver } from '../../variable-resolver.js';
import { showConfirm, getJQuery } from '../utils.js';
import {
  el,
  flowSection, formRow, textInput, selectInput,
  toggle, button, tabGroup
} from './controls/index.js';

const log = logger.createScope('SettingsPanel');

// ============================================================
// 主题配置
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
// 辅助：构建 hero / runtime / macro 只读区域
// ============================================================

function buildHero(settings) {
  const debugEnabled = settings.debug?.enableDebugLog === true;
  const heroCopy = el('div', { className: 'yyt-settings-hero-copy' });
  heroCopy.appendChild(el('div', { className: 'yyt-settings-hero-title', text: '全局偏好与运行策略' }));
  heroCopy.appendChild(el('div', { className: 'yyt-settings-hero-desc', text: '统一管理执行器、自动化、调试与外观设置，让工具链行为与界面体验保持一致。' }));

  const statusArea = el('div', { className: 'yyt-settings-hero-status' });
  const debugChipClass = debugEnabled ? 'yyt-settings-status-chip is-on' : 'yyt-settings-status-chip is-off';
  statusArea.appendChild(el('span', { className: debugChipClass, text: `调试 ${debugEnabled ? '开启' : '关闭'}` }));
  statusArea.appendChild(el('span', { className: 'yyt-settings-status-chip is-neutral', text: `主题 ${settings.ui?.theme || 'dark-blue'}` }));

  const hero = el('div', { className: 'yyt-settings-hero' });
  hero.appendChild(heroCopy);
  hero.appendChild(statusArea);
  return hero;
}

function buildRuntimeChips(runtime) {
  const hostBinding = runtime?.hostBinding || {};
  return [
    el('span', { className: `yyt-settings-runtime-chip ${runtime?.enabled ? 'is-on' : 'is-off'}`, text: `服务 ${runtime?.enabled ? '运行中' : '未启用'}` }),
    el('span', { className: `yyt-settings-runtime-chip ${hostBinding.initialized ? 'is-on' : 'is-off'}`, text: `监听 ${hostBinding.initialized ? '已绑定' : '未绑定'}` }),
    el('span', { className: 'yyt-settings-runtime-chip is-neutral', text: `待处理 ${runtime?.pendingTimerCount || 0}` }),
    el('span', { className: 'yyt-settings-runtime-chip is-neutral', text: `排队槽位 ${runtime?.queuedSlotCount || 0}` }),
  ];
}

function buildRuntimeRows(recentTransactions) {
  if (!recentTransactions.length) {
    return el('div', { className: 'yyt-form-hint', text: '暂无自动化事务记录。' });
  }
  const table = el('div', { className: 'yyt-list-table' });
  for (const tx of recentTransactions.slice(0, 5)) {
    const row = el('div', { className: 'yyt-list-row' });
    const meta = el('div', { className: 'yyt-settings-runtime-meta' });
    meta.appendChild(el('span', { text: tx?.sourceEvent || 'UNKNOWN_EVENT' }));
    meta.appendChild(el('span', { text: tx?.phase || 'unknown' }));
    meta.appendChild(el('span', { text: tx?.messageId || 'no_message_id' }));
    row.appendChild(meta);
    row.appendChild(el('div', { className: 'yyt-settings-runtime-main', text: tx?.verdict || tx?.error || tx?.generationKey || '无额外信息' }));
    table.appendChild(row);
  }
  return table;
}

function buildMacroRows() {
  const vars = variableResolver.getAvailableVariables();
  const table = el('div', { className: 'yyt-list-table' });
  for (const v of vars) {
    const row = el('div', { className: 'yyt-list-row' });
    row.appendChild(el('code', { text: v.name }));
    row.appendChild(el('span', { text: v.description }));
    table.appendChild(row);
  }
  return table;
}

// ============================================================
// 组件定义
// ============================================================

export const SettingsPanel = {
  id: 'settingsPanel',

  /**
   * 保存 settingsPanel 内部构建的控件根引用，用于 getControl 查找和 destroy
   * @type {{ root: object | null, _tabPanels: Map<string, HTMLElement> }}
   */
  _instance: null,

  _getAutomationRuntime() {
    try {
      return getTargetWindow()?.YouYouToolkit?.getAutomationRuntime?.() || null;
    } catch (_) {
      return null;
    }
  },

  /**
   * 构建面板（prefab 控件版本）
   * @param {Object} $container - jQuery 容器对象（ui-manager 传入）
   */
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

    // ── 根容器 ──
    const panel = el('div', { className: 'yyt-settings-panel' });

    // ── Hero ──
    panel.appendChild(buildHero(settings));

    // ── Tab 切换 ──
    const tabContentMap = new Map();

    const tabs = tabGroup({
      id: 'settingsTabs',
      items: [
        { id: 'executor', label: '执行器', icon: 'fa-solid fa-microchip' },
        { id: 'debug',    label: '调试',   icon: 'fa-solid fa-bug' },
        { id: 'ui',       label: '外观',   icon: 'fa-solid fa-palette' }
      ],
      value: 'executor',
      onChange(tabId) {
        for (const [id, el] of tabContentMap) {
          el.classList.toggle('yyt-active', id === tabId);
        }
      }
    });
    panel.appendChild(tabs.el);

    // ── 内容容器 ──
    const contentWrap = el('div', { className: 'yyt-settings-content' });

    // ── Executor Tab ──
    const executorPanel = el('div', { className: 'yyt-settings-tab-content yyt-active' });

    // 并发控制
    executorPanel.appendChild(
      flowSection({
        heading: '并发控制',
        icon: '⏛',
        content: [
          formRow({
            label: '最大并发数',
            hint: '同时执行的工具数量上限',
            control: textInput({ id: 'maxConcurrent', type: 'number', value: String(executor.maxConcurrent ?? 3),
              attrs: { min: '1', max: '10' } })
          })
        ]
      }).el
    );

    // 重试策略
    executorPanel.appendChild(
      flowSection({
        heading: '重试策略',
        icon: '⟳',
        content: [
          el('div', { className: 'yyt-form-row' }, [
            formRow({
              label: '最大重试次数',
              control: textInput({ id: 'maxRetries', type: 'number', value: String(executor.maxRetries ?? 2),
                attrs: { min: '0', max: '10' } }),
              className: 'yyt-flex-1'
            }).el,
            formRow({
              label: '重试间隔 (ms)',
              control: textInput({ id: 'retryDelayMs', type: 'number', value: String(executor.retryDelayMs ?? 5000),
                attrs: { min: '1000', max: '60000', step: '1000' } }),
              className: 'yyt-flex-1'
            }).el
          ])
        ]
      }).el
    );

    // 超时设置
    executorPanel.appendChild(
      flowSection({
        heading: '超时设置',
        icon: '⏱',
        content: [
          formRow({
            label: '请求超时时间 (ms)',
            hint: '单个请求的超时时间,超过将自动中断',
            control: textInput({ id: 'requestTimeoutMs', type: 'number',
              value: String(executor.requestTimeoutMs ?? 90000),
              attrs: { min: '10000', max: '300000', step: '10000' } })
          })
        ]
      }).el
    );

    // 队列策略
    executorPanel.appendChild(
      flowSection({
        heading: '队列策略',
        icon: '☰',
        content: [
          formRow({
            label: '队列处理方式',
            control: selectInput({
              id: 'queueStrategy',
              options: [
                { value: 'fifo', label: 'FIFO (先进先出)' },
                { value: 'lifo', label: 'LIFO (后进先出)' },
                { value: 'priority', label: '优先级排序' }
              ],
              value: executor.queueStrategy || 'fifo'
            })
          })
        ]
      }).el
    );

    // 自动触发节流
    executorPanel.appendChild(
      flowSection({
        heading: '自动触发节流',
        icon: '⚡',
        content: [
          el('div', { className: 'yyt-form-hint', text: '由 output_mode 决定哪些工具自动触发(post_response_api / local_transform 自动,follow_ai 手动)。这里只控制节流时间。' }),
          el('div', { className: 'yyt-form-row' }, [
            formRow({
              label: '等待稳定时间 (ms)',
              control: textInput({ id: 'automationSettleMs', type: 'number',
                value: String(automation.settleMs ?? 1200),
                attrs: { min: '0', max: '10000', step: '100' } }),
              className: 'yyt-flex-1'
            }).el,
            formRow({
              label: '自动化冷却时间 (ms)',
              control: textInput({ id: 'automationCooldownMs', type: 'number',
                value: String(automation.cooldownMs ?? 5000),
                attrs: { min: '0', max: '60000', step: '100' } }),
              className: 'yyt-flex-1'
            }).el
          ])
        ]
      }).el
    );

    // 自动触发诊断
    const diagSection = flowSection({ heading: '自动触发诊断', icon: '🔍' });
    const chipGrid = el('div', { className: 'yyt-settings-runtime-grid' });
    for (const chip of buildRuntimeChips(runtime)) chipGrid.appendChild(chip);
    diagSection.appendContent({ el: chipGrid });

    const eventBindingText = Array.isArray(hostBinding.eventBindings) && hostBinding.eventBindings.length > 0
      ? hostBinding.eventBindings.join(' / ') : '暂无事件绑定';
    diagSection.appendContent(
      el('div', { className: 'yyt-form-hint', html: `事件源:<code>${hostBinding.source || 'unavailable'}</code>;事件:<code>${eventBindingText}</code>` })
    );
    if (hostBinding.lastError) {
      diagSection.appendContent(
        el('div', { className: 'yyt-form-hint', html: `最近错误:<code>${hostBinding.lastError}</code>` })
      );
    }
    diagSection.appendContent(buildRuntimeRows(recentTransactions));
    executorPanel.appendChild(diagSection.el);

    contentWrap.appendChild(executorPanel);
    tabContentMap.set('executor', executorPanel);

    // ── Debug Tab ──
    const debugPanel = el('div', { className: 'yyt-settings-tab-content' });

    debugPanel.appendChild(
      flowSection({
        heading: '日志级别',
        icon: '📝',
        content: [
          toggle({ id: 'enableDebugLog', label: '启用调试日志', hint: '开启后 Logger 面板将记录 DEBUG 级别日志，关闭仅记录 INFO 及以上', checked: debug.enableDebugLog }),
          el('div', { className: 'yyt-form-hint', style: { marginTop: '8px' }, html: '<i class="fa-solid fa-terminal"></i> 在「日志」面板中查看、搜索和导出插件运行日志' })
        ]
      }).el
    );

    debugPanel.appendChild(
      flowSection({
        heading: '执行记录',
        icon: '🔄',
        content: [
          toggle({ id: 'saveExecutionHistory', label: '保存执行历史', hint: '记录工具执行历史，便于问题排查', checked: debug.saveExecutionHistory })
        ]
      }).el
    );

    debugPanel.appendChild(
      flowSection({
        heading: 'UI 显示',
        icon: '👁',
        content: [
          toggle({ id: 'showRuntimeBadge', label: '显示运行状态徽章', hint: '在工具卡片上显示运行状态指示器', checked: debug.showRuntimeBadge })
        ]
      }).el
    );

    contentWrap.appendChild(debugPanel);
    tabContentMap.set('debug', debugPanel);

    // ── UI Tab ──
    const uiPanel = el('div', { className: 'yyt-settings-tab-content' });

    uiPanel.appendChild(
      flowSection({
        heading: '外观设置',
        icon: '🎨',
        content: [
          formRow({
            label: '主题',
            control: selectInput({
              id: 'theme',
              options: [
                { value: 'dark-blue', label: '深蓝' },
                { value: 'dark-purple', label: '深紫' },
                { value: 'dark-green', label: '深绿' },
                { value: 'light', label: '浅色' }
              ],
              value: ui.theme || 'dark-blue'
            })
          }),
          toggle({ id: 'compactMode', label: '紧凑模式', hint: '减少卡片间距，显示更多内容', checked: ui.compactMode }),
          toggle({ id: 'animationEnabled', label: '启用动画效果', hint: '界面过渡和交互动画', checked: ui.animationEnabled })
        ]
      }).el
    );

    uiPanel.appendChild(
      flowSection({
        heading: '模板宏说明',
        icon: '💻',
        content: [
          el('div', { className: 'yyt-form-hint', text: '工具模板里可直接使用下面这些宏。世界书内容只有在模板里显式写入 {{toolWorldbookContent}} 时才会注入。' }),
          buildMacroRows()
        ]
      }).el
    );

    contentWrap.appendChild(uiPanel);
    tabContentMap.set('ui', uiPanel);

    panel.appendChild(contentWrap);

    // ── Footer ──
    const footer = el('div', { className: 'yyt-settings-footer' });
    footer.appendChild(button({ label: '重置为默认', variant: 'ghost', icon: '↩', onClick: async () => {
      if (await showConfirm('重置设置', '确定要重置所有设置为默认值吗？', { danger: true })) {
        settingsService.resetSettings();
        applyUiPreferences(DEFAULT_SETTINGS.ui, getTargetDocument());
        SettingsPanel.renderTo($container);
        log.info('设置已重置', null, { toast: 'success' });
      }
    }}).el);
    footer.appendChild(button({ label: '保存设置', variant: 'primary', icon: '✓', onClick: () => {
      SettingsPanel._saveFromControls(tabs, $container);
    }}).el);
    panel.appendChild(footer);

    // ── 挂载 ──
    $container.empty().append(panel);

    // 存储实例引用
    this._instance = { root: tabs, _tabPanels: tabContentMap };

    // 同步 logger 级别
    const savedDebug = settingsService.getDebugSettings();
    logger.setLevel(savedDebug.enableDebugLog ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
  },

  /**
   * 从控件树读取值并保存
   */
  _saveFromControls(tabs) {
    const get = (id) => {
      const ctrl = tabs.getControl(id);
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
        const ctrl = tabs.getControl(field.id);
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
  },

  /**
   * 兼容 ui-manager 的 render() 接口（返回空字符串，实际渲染走 renderTo）
   */
  render() {
    return '';
  },

  /**
   * 兼容 ui-manager 的 getStyles()
   */
  getStyles() {
    return '';
  },

  /**
   * 兼容 ui-manager 的 bindEvents()
   */
  bindEvents() {},

  /**
   * 销毁
   */
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
