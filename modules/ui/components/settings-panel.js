/**
 * YouYou Toolkit - 设置面板组件
 * @description 提供全局设置的UI界面
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { settingsService, DEFAULT_SETTINGS } from '../../core/settings-service.js';
import { logger, LOG_LEVEL } from '../../core/logger-service.js';
import { variableResolver } from '../../variable-resolver.js';
import { destroyEnhancedCustomSelects, enhanceNativeSelects, showToast, getJQuery, isContainerValid, showConfirm } from '../utils.js';

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


function renderToggleControl({ id, checked = false, title = '', hint = '' }) {
  return `
    <div class="yyt-toggle-row">
      <div class="yyt-toggle-label">
        <span>${title}</span>
        ${hint ? `<span class="yyt-toggle-hint">${hint}</span>` : ''}
      </div>
      <label class="yyt-toggle">
        <input type="checkbox" id="${id}" ${checked ? 'checked' : ''}>
        <span class="yyt-toggle-slider"></span>
      </label>
    </div>
  `;
}
function getTargetWindow() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent;
    }
  } catch (error) {
    // 忽略跨窗口访问异常，回退到当前窗口
  }

  return window;
}

function getTargetDocument() {
  return getTargetWindow()?.document || document;
}

function getTargetRoot(targetDocument = getTargetDocument()) {
  return targetDocument?.documentElement || document.documentElement;
}

/**
 * 应用主题
 * @param {string} themeName - 主题名称
 * @param {Document} targetDocument - 目标文档
 */
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

/**
 * 将 UI 外观设置统一应用到目标文档
 * @param {Object} uiSettings
 * @param {Document} targetDocument
 */
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
// 组件定义
// ============================================================

export const SettingsPanel = {
  id: 'settingsPanel',

  render() {
    const settings = settingsService.getSettings();
    const debugEnabled = settings.debug?.enableDebugLog === true;
    const automationRuntime = this._getAutomationRuntime();

    return `
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">全局偏好与运行策略</div>
            <div class="yyt-settings-hero-desc">统一管理执行器、自动化、调试与外观设置，让工具链行为与界面体验保持一致。</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${debugEnabled ? 'is-on' : 'is-off'}">调试 ${debugEnabled ? '开启' : '关闭'}</span>
            <span class="yyt-settings-status-chip is-neutral">主题 ${settings.ui?.theme || 'dark-blue'}</span>
          </div>
        </div>

        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> 执行器
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> 调试
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> 外观
          </button>
        </div>

        <div class="yyt-settings-content">
          ${this._renderExecutorTab(settings.executor, settings.automation, automationRuntime)}
          ${this._renderDebugTab(settings.debug)}
          ${this._renderUiTab(settings.ui)}
        </div>

        <div class="yyt-settings-footer">
          <button class="yyt-btn yyt-btn-secondary" id="yyt-settings-reset">
            <i class="fa-solid fa-undo"></i> 重置为默认
          </button>
          <button class="yyt-btn yyt-btn-primary" id="yyt-settings-save">
            <i class="fa-solid fa-save"></i> 保存设置
          </button>
        </div>
      </div>
    `;
  },

  _renderExecutorTab(executor, automation = {}, runtime = null) {
    const recentTransactions = Array.isArray(runtime?.recentTransactions) ? runtime.recentTransactions.slice().reverse() : [];
    const hostBinding = runtime?.hostBinding || {};
    const eventBindingText = Array.isArray(hostBinding.eventBindings) && hostBinding.eventBindings.length > 0
      ? hostBinding.eventBindings.join(' / ')
      : '暂无事件绑定';
    const runtimeHtml = recentTransactions.length > 0
      ? recentTransactions.slice(0, 5).map((tx) => {
          const refresh = tx?.results?.[0]?.meta?.writebackDetails?.refresh || {};
          return `
          <div class="yyt-list-row">
            <div class="yyt-settings-runtime-meta">
              <span>${tx?.sourceEvent || 'UNKNOWN_EVENT'}</span>
              <span>${tx?.phase || 'unknown'}</span>
              <span>${tx?.messageId || 'no_message_id'}</span>
            </div>
            <div class="yyt-settings-runtime-main">${tx?.verdict || tx?.error || tx?.generationKey || '无额外信息'}</div>
          </div>
        `;
        }).join('')
      : '<div class="yyt-form-hint">暂无自动化事务记录。</div>';

    return `
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-layer-group"></i></span>并发控制</div>
          <div class="yyt-form-group">
            <label>最大并发数</label>
            <div class="yyt-form-hint">同时执行的工具数量上限</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent"
                   value="${executor.maxConcurrent}" min="1" max="10">
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-rotate-right"></i></span>重试策略</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>最大重试次数</label>
              <input type="number" class="yyt-input" id="yyt-setting-maxRetries"
                     value="${executor.maxRetries}" min="0" max="10">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>重试间隔 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-retryDelayMs"
                     value="${executor.retryDelayMs}" min="1000" max="60000" step="1000">
            </div>
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock"></i></span>超时设置</div>
          <div class="yyt-form-group">
            <label>请求超时时间 (ms)</label>
            <div class="yyt-form-hint">单个请求的超时时间,超过将自动中断</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs"
                   value="${executor.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-list-ol"></i></span>队列策略</div>
          <div class="yyt-form-group">
            <label>队列处理方式</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${executor.queueStrategy === 'fifo' ? 'selected' : ''}>FIFO (先进先出)</option>
              <option value="lifo" ${executor.queueStrategy === 'lifo' ? 'selected' : ''}>LIFO (后进先出)</option>
              <option value="priority" ${executor.queueStrategy === 'priority' ? 'selected' : ''}>优先级排序</option>
            </select>
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-bolt"></i></span>自动触发节流</div>
          <div class="yyt-form-hint">由 output_mode 决定哪些工具自动触发(post_response_api / local_transform 自动,follow_ai 手动)。这里只控制节流时间。</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>等待稳定时间 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationSettleMs"
                     value="${automation.settleMs ?? 1200}" min="0" max="10000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>自动化冷却时间 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationCooldownMs"
                     value="${automation.cooldownMs ?? 5000}" min="0" max="60000" step="100">
            </div>
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-stethoscope"></i></span>自动触发诊断</div>
          <div class="yyt-settings-runtime-grid">
            <div class="yyt-settings-runtime-chip ${runtime?.enabled ? 'is-on' : 'is-off'}">服务 ${runtime?.enabled ? '运行中' : '未启用'}</div>
            <div class="yyt-settings-runtime-chip ${hostBinding.initialized ? 'is-on' : 'is-off'}">监听 ${hostBinding.initialized ? '已绑定' : '未绑定'}</div>
            <div class="yyt-settings-runtime-chip is-neutral">待处理 ${runtime?.pendingTimerCount || 0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">排队槽位 ${runtime?.queuedSlotCount || 0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">事务 ${recentTransactions.length}</div>
          </div>
          <div class="yyt-form-hint">事件源:<code>${hostBinding.source || 'unavailable'}</code>;事件:<code>${eventBindingText}</code></div>
          ${hostBinding.lastError ? `<div class="yyt-form-hint">最近错误:<code>${hostBinding.lastError}</code></div>` : ''}
          <div class="yyt-list-table">${runtimeHtml}</div>
        </div>
      </div>
    `;
  },

  _renderDebugTab(debug) {
    return `
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-file-lines"></i></span>日志级别</div>
          <div class="yyt-form-group">
            ${renderToggleControl({
              id: 'yyt-setting-enableDebugLog',
              checked: debug.enableDebugLog,
              title: '启用调试日志',
              hint: '开启后 Logger 面板将记录 DEBUG 级别日志，关闭仅记录 INFO 及以上'
            })}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> 在「日志」面板中查看、搜索和导出插件运行日志
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>执行记录</div>
          <div class="yyt-form-group">
            ${renderToggleControl({
              id: 'yyt-setting-saveExecutionHistory',
              checked: debug.saveExecutionHistory,
              title: '保存执行历史',
              hint: '记录工具执行历史，便于问题排查'
            })}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI 显示</div>
          <div class="yyt-form-group">
            ${renderToggleControl({
              id: 'yyt-setting-showRuntimeBadge',
              checked: debug.showRuntimeBadge,
              title: '显示运行状态徽章',
              hint: '在工具卡片上显示运行状态指示器'
            })}
          </div>
        </div>
      </div>
    `;
  },

  _renderUiTab(ui) {
    return `
      <div class="yyt-settings-tab-content" data-tab="ui">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-palette"></i></span>外观设置</div>
          <div class="yyt-form-group">
            <label>主题</label>
            <select class="yyt-select" id="yyt-setting-theme">
              <option value="dark-blue" ${ui.theme === 'dark-blue' ? 'selected' : ''}>深蓝</option>
              <option value="dark-purple" ${ui.theme === 'dark-purple' ? 'selected' : ''}>深紫</option>
              <option value="dark-green" ${ui.theme === 'dark-green' ? 'selected' : ''}>深绿</option>
              <option value="light" ${ui.theme === 'light' ? 'selected' : ''}>浅色</option>
            </select>
          </div>

          <div class="yyt-form-group">
            ${renderToggleControl({
              id: 'yyt-setting-compactMode',
              checked: ui.compactMode,
              title: '紧凑模式',
              hint: '减少卡片间距，显示更多内容'
            })}
          </div>

          <div class="yyt-form-group">
            ${renderToggleControl({
              id: 'yyt-setting-animationEnabled',
              checked: ui.animationEnabled,
              title: '启用动画效果',
              hint: '界面过渡和交互动画'
            })}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-code"></i></span>模板宏说明</div>
          <div class="yyt-form-hint">工具模板里可直接使用下面这些宏。世界书内容只有在模板里显式写入 <code>{{toolWorldbookContent}}</code> 时才会注入。</div>
          <div class="yyt-list-table">
            ${this._renderMacroList()}
          </div>
        </div>
      </div>
    `;
  },

  _renderMacroList() {
    return variableResolver.getAvailableVariables()
      .map(variable => `
        <div class="yyt-list-row">
          <code>${variable.name}</code>
          <span>${variable.description}</span>
        </div>
      `)
      .join('');
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;

    const self = this;

    // 使用事件委托，避免重新渲染导致事件丢失
    $container.off('.yytSettings');

    $container.on('click.yytSettings', '.yyt-settings-tab', (e) => {
      const tabId = $(e.currentTarget).data('tab');
      $container.find('.yyt-settings-tab').removeClass('yyt-active');
      $(e.currentTarget).addClass('yyt-active');
      $container.find('.yyt-settings-tab-content').removeClass('yyt-active');
      $container.find(`.yyt-settings-tab-content[data-tab="${tabId}"]`).addClass('yyt-active');
    });

    $container.on('click.yytSettings', '#yyt-settings-save', () => {
      self._saveSettings($container);
    });

    $container.on('click.yytSettings', '#yyt-settings-reset', async () => {
      if (await showConfirm('重置设置', '确定要重置所有设置为默认值吗？', { danger: true })) {
        settingsService.resetSettings();
        applyUiPreferences(DEFAULT_SETTINGS.ui, getTargetDocument());
        self.renderTo($container);
        showToast('success', '设置已重置');
      }
    });

    enhanceNativeSelects($container, {
      namespace: 'yytSettingsSelect',
      selectors: [
        '#yyt-setting-queueStrategy',
        '#yyt-setting-theme'
      ]
    });

    // 同步当前保存的 logger 级别
    const savedDebug = settingsService.getDebugSettings();
    logger.setLevel(savedDebug.enableDebugLog ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
  },

  _saveSettings($container) {
    const $ = getJQuery();
    const numberFields = [
      { id: 'yyt-setting-maxConcurrent',    min: 1,     max: 10,     label: '最大并发数' },
      { id: 'yyt-setting-maxRetries',       min: 0,     max: 10,     label: '最大重试次数' },
      { id: 'yyt-setting-retryDelayMs',     min: 1000,  max: 60000,  label: '重试间隔' },
      { id: 'yyt-setting-requestTimeoutMs', min: 10000, max: 300000, label: '请求超时时间' },
      { id: 'yyt-setting-automationSettleMs', min: 0,   max: 10000,  label: '等待稳定时间' },
      { id: 'yyt-setting-automationCooldownMs', min: 0, max: 60000,  label: '自动化冷却时间' }
    ];
    for (const field of numberFields) {
      const $input = $container.find(`#${field.id}`);
      const raw = $input.val();
      const val = parseInt(raw, 10);
      if (isNaN(val) || val < field.min || val > field.max) {
        showToast('warning', `${field.label} 须在 ${field.min} ~ ${field.max} 之间`);
        $input.trigger('focus').trigger('select');
        return;
      }
    }

    const settings = {
      executor: {
        maxConcurrent: parseInt($container.find('#yyt-setting-maxConcurrent').val(), 10) || 3,
        maxRetries: parseInt($container.find('#yyt-setting-maxRetries').val(), 10) || 2,
        retryDelayMs: parseInt($container.find('#yyt-setting-retryDelayMs').val(), 10) || 5000,
        requestTimeoutMs: parseInt($container.find('#yyt-setting-requestTimeoutMs').val(), 10) || 90000,
        queueStrategy: $container.find('#yyt-setting-queueStrategy').val() || 'fifo'
      },
      automation: {
        enabled: true,
        settleMs: parseInt($container.find('#yyt-setting-automationSettleMs').val(), 10) || 1200,
        cooldownMs: parseInt($container.find('#yyt-setting-automationCooldownMs').val(), 10) || 5000,
        maxConcurrentSlots: settingsService.getSettings()?.automation?.maxConcurrentSlots || 1
      },
      debug: {
        enableDebugLog: $container.find('#yyt-setting-enableDebugLog').is(':checked'),
        saveExecutionHistory: $container.find('#yyt-setting-saveExecutionHistory').is(':checked'),
        showRuntimeBadge: $container.find('#yyt-setting-showRuntimeBadge').is(':checked')
      },
      ui: {
        theme: $container.find('#yyt-setting-theme').val() || 'dark-blue',
        compactMode: $container.find('#yyt-setting-compactMode').is(':checked'),
        animationEnabled: $container.find('#yyt-setting-animationEnabled').is(':checked')
      }
    };

    settingsService.saveSettings(settings);
    logger.setLevel(settings.debug.enableDebugLog ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
    applyUiPreferences(settings.ui, getTargetDocument());
    showToast('success', '设置已保存');
  },

  _getAutomationRuntime() {
    try {
      return getTargetWindow()?.YouYouToolkit?.getAutomationRuntime?.() || null;
    } catch (error) {
      return null;
    }
  },

  destroy($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    destroyEnhancedCustomSelects($container, 'yytSettingsSelect');
    $container.off('.yytSettings');
  },

  getStyles() {
    return `
      /* 设置面板样式 */
      .yyt-settings-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 14px;
      }

      .yyt-settings-hero {
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 0;
        border-radius: 0;
        border: none;
        background: transparent;
        box-shadow: none;
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.15;
        color: var(--yyt-text);
      }

      .yyt-settings-hero-desc {
        font-size: 13px;
        line-height: 1.75;
        color: var(--yyt-text-secondary);
        max-width: 62ch;
      }

      .yyt-settings-hero-status {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
      }

      .yyt-settings-status-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 800;
        border: 1px solid var(--yyt-border-strong);
        letter-spacing: 0.4px;
        color: var(--yyt-text);
        background: var(--yyt-surface-3);
        box-shadow: none;
      }

      .yyt-settings-status-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.25);
        background: rgba(74, 222, 128, 0.12);
      }

      .yyt-settings-status-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.25);
        background: rgba(248, 113, 113, 0.12);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-tabs {
        display: flex;
        gap: 6px;
        padding: 5px;
        border-radius: var(--yyt-radius);
        background: var(--yyt-surface-2);
        border: 1px solid var(--yyt-border);
        width: fit-content;
        max-width: 100%;
        flex-wrap: wrap;
        box-shadow: none;
      }

      .yyt-settings-tab {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: var(--yyt-radius-sm);
        border: 1px solid transparent;
        background: transparent;
        color: var(--yyt-text-secondary);
        cursor: pointer;
        transition: all 0.18s ease;
        font-weight: 600;
        box-shadow: none;
      }

      .yyt-settings-tab:hover {
        color: var(--yyt-text);
        background: var(--yyt-surface-3);
        border-color: transparent;
      }

      .yyt-settings-tab.yyt-active {
        color: var(--yyt-on-accent);
        background: var(--yyt-accent);
        border-color: transparent;
        box-shadow: none;
      }

      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-settings-content .yyt-form-group {
        gap: 12px;
      }

      .yyt-settings-tab-content {
        display: none;
        flex-direction: column;
        gap: 14px;
      }

      .yyt-settings-tab-content.yyt-active {
        display: flex;
      }

      .yyt-settings-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 2px;
      }

      .yyt-settings-runtime-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 14px;
      }

      .yyt-settings-runtime-chip {
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
        border: 1px solid var(--yyt-border-strong);
        background: var(--yyt-surface-3);
        color: var(--yyt-text);
        box-shadow: none;
      }

      .yyt-settings-runtime-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.25);
        background: rgba(74, 222, 128, 0.12);
      }

      .yyt-settings-runtime-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.25);
        background: rgba(248, 113, 113, 0.12);
      }

      .yyt-settings-runtime-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-runtime-meta {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        font-size: 11px;
        color: var(--yyt-text-secondary);
      }

      .yyt-settings-runtime-main {
        font-size: 12px;
        color: var(--yyt-text);
        line-height: 1.7;
        word-break: break-word;
      }

      /* settings-specific macro/runtime row layout (2-column grid) */
      .yyt-settings-panel .yyt-list-table {
        display: flex;
        flex-direction: column;
        border: none;
        border-radius: 0;
        overflow: visible;
      }

      .yyt-settings-panel .yyt-list-row {
        display: grid;
        grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
        gap: 14px;
        align-items: start;
        padding: 14px 0;
        background: transparent;
        border-bottom: 1px solid var(--yyt-border);
      }

      .yyt-settings-panel .yyt-list-row:last-child {
        border-bottom: none;
      }

      .yyt-settings-panel .yyt-list-row:hover {
        background: transparent;
      }

      .yyt-settings-panel .yyt-list-row code {
        color: var(--yyt-accent-strong);
        word-break: break-word;
        font-weight: 800;
      }

      .yyt-settings-panel .yyt-list-row span {
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.7;
      }

      .yyt-settings-panel .yyt-list-row:has(.yyt-settings-runtime-meta) {
        grid-template-columns: 1fr;
      }
    `;
  },

  renderTo($container) {
    $container.html(this.render({}));
    this.bindEvents($container, {});
  }
};

export { applyTheme, applyUiPreferences };
export default SettingsPanel;
