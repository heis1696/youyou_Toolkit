/**
 * YouYou Toolkit - 设置面板组件
 * @description 提供全局设置的UI界面
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { settingsService, DEFAULT_SETTINGS } from '../../core/settings-service.js';
import { variableResolver } from '../../variable-resolver.js';
import { showToast, getJQuery, isContainerValid } from '../utils.js';

// ============================================================
// 主题配置
// ============================================================

const BASE_THEME_TOKENS = {
  '--yyt-accent': '#7bb7ff',
  '--yyt-accent-glow': 'rgba(123, 183, 255, 0.4)',
  '--yyt-accent-soft': 'rgba(123, 183, 255, 0.15)',
  '--yyt-accent-strong': '#a5d4ff',
  '--yyt-bg-base': '#0b0f15',
  '--yyt-bg-gradient-1': 'rgba(123, 183, 255, 0.12)',
  '--yyt-bg-gradient-2': 'rgba(155, 123, 255, 0.10)',
  '--yyt-surface': 'rgba(255, 255, 255, 0.03)',
  '--yyt-surface-2': 'rgba(255, 255, 255, 0.05)',
  '--yyt-surface-3': 'rgba(255, 255, 255, 0.075)',
  '--yyt-surface-hover': 'rgba(255, 255, 255, 0.08)',
  '--yyt-surface-active': 'rgba(255, 255, 255, 0.11)',
  '--yyt-border': 'rgba(255, 255, 255, 0.08)',
  '--yyt-border-soft': 'rgba(255, 255, 255, 0.05)',
  '--yyt-border-strong': 'rgba(255, 255, 255, 0.16)',
  '--yyt-text': 'rgba(255, 255, 255, 0.95)',
  '--yyt-text-secondary': 'rgba(255, 255, 255, 0.72)',
  '--yyt-text-muted': 'rgba(255, 255, 255, 0.5)',
  '--yyt-focus-ring': '0 0 0 3px rgba(123, 183, 255, 0.18)',
  '--yyt-on-accent': '#0b0f15'
};

const THEME_CONFIGS = {
  'dark-blue': {
    '--yyt-on-accent': '#0b0f15'
  },
  'dark-purple': {
    '--yyt-accent': '#a78bfa',
    '--yyt-accent-glow': 'rgba(167, 139, 250, 0.4)',
    '--yyt-accent-soft': 'rgba(167, 139, 250, 0.15)',
    '--yyt-accent-strong': '#c4b5fd',
    '--yyt-bg-base': '#0f0b15',
    '--yyt-bg-gradient-1': 'rgba(167, 139, 250, 0.12)',
    '--yyt-bg-gradient-2': 'rgba(123, 183, 255, 0.10)',
    '--yyt-on-accent': '#120b1f'
  },
  'dark-green': {
    '--yyt-accent': '#4ade80',
    '--yyt-accent-glow': 'rgba(74, 222, 128, 0.4)',
    '--yyt-accent-soft': 'rgba(74, 222, 128, 0.15)',
    '--yyt-accent-strong': '#86efac',
    '--yyt-bg-base': '#0b150f',
    '--yyt-bg-gradient-1': 'rgba(74, 222, 128, 0.12)',
    '--yyt-bg-gradient-2': 'rgba(123, 183, 255, 0.10)',
    '--yyt-on-accent': '#0b150f'
  },
  'light': {
    '--yyt-accent': '#3b82f6',
    '--yyt-accent-glow': 'rgba(59, 130, 246, 0.3)',
    '--yyt-accent-soft': 'rgba(59, 130, 246, 0.1)',
    '--yyt-accent-strong': '#93c5fd',
    '--yyt-bg-base': '#f8fafc',
    '--yyt-bg-gradient-1': 'rgba(59, 130, 246, 0.08)',
    '--yyt-bg-gradient-2': 'rgba(139, 92, 246, 0.06)',
    '--yyt-text': 'rgba(15, 23, 42, 0.95)',
    '--yyt-text-secondary': 'rgba(15, 23, 42, 0.72)',
    '--yyt-text-muted': 'rgba(15, 23, 42, 0.52)',
    '--yyt-surface': 'rgba(255, 255, 255, 0.66)',
    '--yyt-surface-2': 'rgba(255, 255, 255, 0.86)',
    '--yyt-surface-3': 'rgba(255, 255, 255, 0.94)',
    '--yyt-surface-hover': 'rgba(255, 255, 255, 0.92)',
    '--yyt-surface-active': 'rgba(255, 255, 255, 0.98)',
    '--yyt-border': 'rgba(15, 23, 42, 0.08)',
    '--yyt-border-soft': 'rgba(15, 23, 42, 0.05)',
    '--yyt-border-strong': 'rgba(15, 23, 42, 0.14)',
    '--yyt-focus-ring': '0 0 0 3px rgba(59, 130, 246, 0.14)',
    '--yyt-on-accent': '#0f172a'
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
    const automationEnabled = settings.automation?.enabled === true;
    const automationRuntime = this._getAutomationRuntime();

    return `
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">全局偏好与运行策略</div>
            <div class="yyt-settings-hero-desc">统一管理执行器、自动化、调试与外观设置，让工具链行为与界面体验保持一致。</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${automationEnabled ? 'is-on' : 'is-off'}">自动化 ${automationEnabled ? '开启' : '关闭'}</span>
            <span class="yyt-settings-status-chip ${debugEnabled ? 'is-on' : 'is-off'}">调试 ${debugEnabled ? '开启' : '关闭'}</span>
            <span class="yyt-settings-status-chip is-neutral">主题 ${settings.ui?.theme || 'dark-blue'}</span>
          </div>
        </div>

        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> 执行器
          </button>
          <button class="yyt-settings-tab" data-tab="automation">
            <i class="fa-solid fa-bolt"></i> 自动化
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> 调试
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> 外观
          </button>
        </div>

        <div class="yyt-settings-content">
          ${this._renderExecutorTab(settings.executor)}
          ${this._renderAutomationTab(settings.automation, automationRuntime)}
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

  _renderExecutorTab(executor) {
    return `
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">并发控制</div>
          <div class="yyt-form-group">
            <label>最大并发数</label>
            <div class="yyt-form-hint">同时执行的工具数量上限</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent"
                   value="${executor.maxConcurrent}" min="1" max="10">
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">重试策略</div>
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

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">超时设置</div>
          <div class="yyt-form-group">
            <label>请求超时时间 (ms)</label>
            <div class="yyt-form-hint">单个请求的超时时间，超过将自动中断</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs"
                   value="${executor.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">队列策略</div>
          <div class="yyt-form-group">
            <label>队列处理方式</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${executor.queueStrategy === 'fifo' ? 'selected' : ''}>FIFO (先进先出)</option>
              <option value="lifo" ${executor.queueStrategy === 'lifo' ? 'selected' : ''}>LIFO (后进先出)</option>
              <option value="priority" ${executor.queueStrategy === 'priority' ? 'selected' : ''}>优先级排序</option>
            </select>
          </div>
        </div>
      </div>
    `;
  },

  _renderAutomationTab(automation = {}, runtime = null) {
    const effectiveEnabled = automation.enabled === true;
    const recentTransactions = Array.isArray(runtime?.recentTransactions) ? runtime.recentTransactions.slice().reverse() : [];
    const hostBinding = runtime?.hostBinding || {};
    const eventBindingText = Array.isArray(hostBinding.eventBindings) && hostBinding.eventBindings.length > 0
      ? hostBinding.eventBindings.join(' / ')
      : '暂无事件绑定';
    const runtimeHtml = recentTransactions.length > 0
      ? recentTransactions.map((tx) => {
          const refresh = tx?.results?.[0]?.meta?.writebackDetails?.refresh || {};
          const requestMethods = Array.isArray(refresh?.requestMethods) ? refresh.requestMethods.join(' / ') : '';
          const refreshHint = refresh?.eventSource || refresh?.eventName || requestMethods || refresh?.confirmedBy;

          return `
          <div class="yyt-settings-runtime-item">
            <div class="yyt-settings-runtime-meta">
              <span>${tx?.sourceEvent || 'UNKNOWN_EVENT'}</span>
              <span>${tx?.phase || 'unknown'}</span>
              <span>${tx?.messageId || 'no_message_id'}</span>
            </div>
            <div class="yyt-settings-runtime-main">${tx?.verdict || tx?.error || tx?.generationKey || '无额外信息'}</div>
            ${refreshHint ? `<div class="yyt-form-hint">刷新：<code>${refresh?.eventSource || 'unavailable'}</code> / <code>${refresh?.eventName || 'MESSAGE_UPDATED'}</code>；请求：<code>${requestMethods || 'none'}</code>；确认：<code>${refresh?.confirmed ? (refresh?.confirmedBy || 'success') : 'pending_or_failed'}</code>；检查：<code>${refresh?.confirmChecks || 0}</code></div>` : ''}
          </div>
        `;
        }).join('')
      : '<div class="yyt-form-hint">暂无自动化事务记录。</div>';

    return `
      <div class="yyt-settings-tab-content" data-tab="automation">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">自动触发总开关</div>
          <div class="yyt-form-group">
            ${renderToggleControl({
              id: 'yyt-setting-automationEnabled',
              checked: automation.enabled,
              title: '启用工具自动触发',
              hint: '这里只保留一个全局开关。开启后，所有处于“额外 AI 模型解析”模式的工具都会参与自动触发。'
            })}
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>等待稳定时间 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationSettleMs"
                     value="${automation.settleMs || 1200}" min="0" max="10000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>自动化冷却时间 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationCooldownMs"
                     value="${automation.cooldownMs || 5000}" min="0" max="60000" step="100">
            </div>
          </div>
          <div class="yyt-form-hint">当前状态：${effectiveEnabled ? '已启用' : '未启用'}。开启后，所有“额外 AI 模型解析”工具都会在 AI 回复后自动执行。</div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">自动化诊断</div>
          <div class="yyt-settings-runtime-grid">
            <div class="yyt-settings-runtime-chip ${runtime?.enabled ? 'is-on' : 'is-off'}">服务 ${runtime?.enabled ? '运行中' : '未启用'}</div>
            <div class="yyt-settings-runtime-chip ${hostBinding.initialized ? 'is-on' : 'is-off'}">监听 ${hostBinding.initialized ? '已绑定' : '未绑定'}</div>
            <div class="yyt-settings-runtime-chip is-neutral">待处理 ${runtime?.pendingTimerCount || 0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">排队槽位 ${runtime?.queuedSlotCount || 0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">事务 ${recentTransactions.length}</div>
          </div>
          <div class="yyt-form-hint">事件源：<code>${hostBinding.source || 'unavailable'}</code>；最近初始化：<code>${hostBinding.lastInitResult || 'idle'}</code>；尝试次数：<code>${hostBinding.initAttempts || 0}</code>。</div>
          <div class="yyt-form-hint">事件绑定：<code>${eventBindingText}</code></div>
          ${hostBinding.lastError ? `<div class="yyt-form-hint">最近错误：<code>${hostBinding.lastError}</code></div>` : ''}
          ${hostBinding.retryScheduled ? `<div class="yyt-form-hint">已安排重试：<code>${hostBinding.retryDelayMs || 0}ms</code></div>` : ''}
          <div class="yyt-form-hint">若自动触发失败，优先看最近事务的 verdict，例如 <code>automation_disabled</code>、<code>no_auto_tools</code>、<code>assistant_message_not_found</code>。</div>
          <div class="yyt-settings-runtime-list">${runtimeHtml}</div>
        </div>
      </div>
    `;
  },

  _renderDebugTab(debug) {
    return `
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">日志设置</div>
          <div class="yyt-form-group">
            ${renderToggleControl({
              id: 'yyt-setting-enableDebugLog',
              checked: debug.enableDebugLog,
              title: '启用调试日志',
              hint: '在控制台输出详细的调试信息'
            })}
          </div>

          <div class="yyt-form-group">
            ${renderToggleControl({
              id: 'yyt-setting-saveExecutionHistory',
              checked: debug.saveExecutionHistory,
              title: '保存执行历史',
              hint: '记录工具执行历史，便于问题排查'
            })}
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI 显示</div>
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
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">外观设置</div>
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

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">模板宏说明</div>
          <div class="yyt-form-hint">工具模板里可直接使用下面这些宏。世界书内容只有在模板里显式写入 <code>{{toolWorldbookContent}}</code> 时才会注入。</div>
          <div class="yyt-settings-macro-list">
            ${this._renderMacroList()}
          </div>
        </div>
      </div>
    `;
  },

  _renderMacroList() {
    return variableResolver.getAvailableVariables()
      .map(variable => `
        <div class="yyt-settings-macro-item">
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

    $container.on('click.yytSettings', '#yyt-settings-reset', () => {
      if (confirm('确定要重置所有设置为默认值吗？')) {
        settingsService.resetSettings();
        applyUiPreferences(DEFAULT_SETTINGS.ui, getTargetDocument());
        self.renderTo($container);
        showToast('success', '设置已重置');
      }
    });
  },

  _saveSettings($container) {
    const settings = {
      executor: {
        maxConcurrent: parseInt($container.find('#yyt-setting-maxConcurrent').val(), 10) || 3,
        maxRetries: parseInt($container.find('#yyt-setting-maxRetries').val(), 10) || 2,
        retryDelayMs: parseInt($container.find('#yyt-setting-retryDelayMs').val(), 10) || 5000,
        requestTimeoutMs: parseInt($container.find('#yyt-setting-requestTimeoutMs').val(), 10) || 90000,
        queueStrategy: $container.find('#yyt-setting-queueStrategy').val() || 'fifo'
      },
      automation: {
        enabled: $container.find('#yyt-setting-automationEnabled').is(':checked'),
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
        padding: 18px 20px;
        border-radius: 26px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background:
          radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.16), transparent 62%),
          linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.025) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 36px rgba(0, 0, 0, 0.16);
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 26px;
        font-weight: 900;
        line-height: 1.05;
        letter-spacing: -0.3px;
        color: var(--yyt-text);
      }

      .yyt-settings-hero-desc {
        font-size: 13px;
        line-height: 1.75;
        color: rgba(255, 255, 255, 0.8);
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
        border: 1px solid rgba(255, 255, 255, 0.12);
        letter-spacing: 0.4px;
        color: var(--yyt-text);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .yyt-settings-status-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.32);
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.16) 0%, rgba(74, 222, 128, 0.07) 100%);
      }

      .yyt-settings-status-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.32);
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.16) 0%, rgba(248, 113, 113, 0.07) 100%);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-tabs {
        display: flex;
        gap: 8px;
        padding: 7px;
        border-radius: 22px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.055) 0%, rgba(255, 255, 255, 0.025) 100%);
        border: 1px solid rgba(255, 255, 255, 0.09);
        width: fit-content;
        max-width: 100%;
        flex-wrap: wrap;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 20px rgba(0, 0, 0, 0.1);
      }

      .yyt-settings-tab {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-radius: 15px;
        border: 1px solid transparent;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%);
        color: var(--yyt-text-secondary);
        cursor: pointer;
        transition: all 0.18s ease;
        font-weight: 800;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
      }

      .yyt-settings-tab:hover {
        color: var(--yyt-text);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .yyt-settings-tab.yyt-active {
        color: var(--yyt-on-accent);
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
        border-color: transparent;
        box-shadow: 0 14px 30px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.24);
      }

      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-settings-tab-content {
        display: none;
        flex-direction: column;
        gap: 14px;
      }

      .yyt-settings-tab-content.yyt-active {
        display: flex;
      }

      .yyt-settings-section {
        position: relative;
        overflow: hidden;
        padding: 18px;
        border-radius: 22px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
          rgba(255, 255, 255, 0.01);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 32px rgba(0, 0, 0, 0.12);
      }

      .yyt-settings-section-title {
        font-size: 16px;
        font-weight: 900;
        color: var(--yyt-text);
        margin-bottom: 14px;
      }

      .yyt-settings-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 2px;
      }

      .yyt-settings-macro-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;
      }

      .yyt-settings-macro-item {
        display: grid;
        grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
        gap: 14px;
        align-items: start;
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-settings-macro-item code {
        color: var(--yyt-accent-strong);
        word-break: break-word;
        font-weight: 800;
      }

      .yyt-settings-macro-item span {
        color: rgba(255, 255, 255, 0.8);
        font-size: 12px;
        line-height: 1.7;
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
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.035) 100%);
        color: var(--yyt-text);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
      }

      .yyt-settings-runtime-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.35);
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.16) 0%, rgba(74, 222, 128, 0.07) 100%);
      }

      .yyt-settings-runtime-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.35);
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.16) 0%, rgba(248, 113, 113, 0.07) 100%);
      }

      .yyt-settings-runtime-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-runtime-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 14px;
      }

      .yyt-settings-runtime-item {
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .yyt-settings-runtime-meta {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.72);
      }

      .yyt-settings-runtime-main {
        font-size: 12px;
        color: var(--yyt-text);
        line-height: 1.7;
        word-break: break-word;
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
