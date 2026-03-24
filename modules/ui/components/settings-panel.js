/**
 * YouYou Toolkit - 设置面板组件
 * @description 提供全局设置的UI界面
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { settingsService, DEFAULT_SETTINGS } from '../../core/settings-service.js';
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
  '--yyt-surface-hover': 'rgba(255, 255, 255, 0.06)',
  '--yyt-surface-active': 'rgba(255, 255, 255, 0.08)',
  '--yyt-border': 'rgba(255, 255, 255, 0.08)',
  '--yyt-border-strong': 'rgba(255, 255, 255, 0.15)',
  '--yyt-text': 'rgba(255, 255, 255, 0.95)',
  '--yyt-text-secondary': 'rgba(255, 255, 255, 0.7)',
  '--yyt-text-muted': 'rgba(255, 255, 255, 0.45)',
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
    '--yyt-text-secondary': 'rgba(15, 23, 42, 0.7)',
    '--yyt-text-muted': 'rgba(15, 23, 42, 0.45)',
    '--yyt-surface': 'rgba(0, 0, 0, 0.03)',
    '--yyt-surface-hover': 'rgba(0, 0, 0, 0.06)',
    '--yyt-surface-active': 'rgba(0, 0, 0, 0.08)',
    '--yyt-border': 'rgba(0, 0, 0, 0.08)',
    '--yyt-border-strong': 'rgba(0, 0, 0, 0.15)',
    '--yyt-on-accent': '#0f172a'
  }
};

function getTargetDocument() {
  try {
    if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
      return window.parent.document || document;
    }
  } catch (error) {
    // 忽略跨窗口访问异常，回退到当前文档
  }

  return document;
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
  
  // 应用主题变量
  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // 设置主题属性
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
  
  // ============================================================
  // 渲染
  // ============================================================
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const settings = settingsService.getSettings();
    const listenerEnabled = settings.listener?.listenGenerationEnded !== false;
    const debugEnabled = settings.debug?.enableDebugLog === true;
    
    return `
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">全局偏好与运行策略</div>
            <div class="yyt-settings-hero-desc">统一管理执行器、监听器、调试与外观设置，让工具链行为与界面体验保持一致。</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${listenerEnabled ? 'is-on' : 'is-off'}">监听 ${listenerEnabled ? '开启' : '关闭'}</span>
            <span class="yyt-settings-status-chip ${debugEnabled ? 'is-on' : 'is-off'}">调试 ${debugEnabled ? '开启' : '关闭'}</span>
            <span class="yyt-settings-status-chip is-neutral">主题 ${settings.ui?.theme || 'dark-blue'}</span>
          </div>
        </div>

        <!-- 标签页导航 -->
        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> 执行器
          </button>
          <button class="yyt-settings-tab" data-tab="listener">
            <i class="fa-solid fa-ear-listen"></i> 监听器
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> 调试
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> 外观
          </button>
        </div>
        
        <!-- 标签页内容 -->
        <div class="yyt-settings-content">
          ${this._renderExecutorTab(settings.executor)}
          ${this._renderListenerTab(settings.listener)}
          ${this._renderDebugTab(settings.debug)}
          ${this._renderUiTab(settings.ui)}
        </div>
        
        <!-- 底部操作 -->
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
  
  // ============================================================
  // 私有渲染方法
  // ============================================================
  
  /**
   * 渲染执行器标签页
   * @private
   */
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
  
  /**
   * 渲染监听器标签页
   * @private
   */
  _renderListenerTab(listener) {
    return `
      <div class="yyt-settings-tab-content" data-tab="listener">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">事件监听</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-listenGenerationEnded" 
                     ${listener.listenGenerationEnded ? 'checked' : ''}>
              <span>启用自动工具监听</span>
            </label>
            <div class="yyt-form-hint">启用后会监听 GENERATION_ENDED，并结合 GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED 作为兜底来源自动触发工具。</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">过滤规则</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreQuietGeneration" 
                     ${listener.ignoreQuietGeneration ? 'checked' : ''}>
              <span>忽略静默生成</span>
            </label>
            <div class="yyt-form-hint">启用后会跳过 quiet / dryRun / 后台生成，减少未真正产生回复时的误触发。</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreAutoTrigger" 
                     ${listener.ignoreAutoTrigger ? 'checked' : ''}>
              <span>忽略自动触发</span>
            </label>
            <div class="yyt-form-hint">启用后会尽量跳过“没有最近用户发送意图”的生成，减少其他插件/脚本触发生成时的误执行。</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">防抖设置</div>
          <div class="yyt-form-group">
            <label>防抖时间 (ms)</label>
            <div class="yyt-form-hint">用于 GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED 等兜底事件的延迟调度与去抖。</div>
            <input type="number" class="yyt-input" id="yyt-setting-debounceMs" 
                   value="${listener.debounceMs}" min="0" max="5000" step="100">
          </div>
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染调试标签页
   * @private
   */
  _renderDebugTab(debug) {
    return `
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">日志设置</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-enableDebugLog" 
                     ${debug.enableDebugLog ? 'checked' : ''}>
              <span>启用调试日志</span>
            </label>
            <div class="yyt-form-hint">在控制台输出详细的调试信息</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-saveExecutionHistory" 
                     ${debug.saveExecutionHistory ? 'checked' : ''}>
              <span>保存执行历史</span>
            </label>
            <div class="yyt-form-hint">记录工具执行历史，便于问题排查</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI 显示</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-showRuntimeBadge" 
                     ${debug.showRuntimeBadge ? 'checked' : ''}>
              <span>显示运行状态徽章</span>
            </label>
            <div class="yyt-form-hint">在工具卡片上显示运行状态指示器</div>
          </div>
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染UI标签页
   * @private
   */
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
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-compactMode" 
                     ${ui.compactMode ? 'checked' : ''}>
              <span>紧凑模式</span>
            </label>
            <div class="yyt-form-hint">减少卡片间距，显示更多内容</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-animationEnabled" 
                     ${ui.animationEnabled ? 'checked' : ''}>
              <span>启用动画效果</span>
            </label>
            <div class="yyt-form-hint">界面过渡和交互动画</div>
          </div>
        </div>
      </div>
    `;
  },
  
  // ============================================================
  // 事件绑定
  // ============================================================
  
  /**
   * 绑定事件
   * @param {Object} $container
   * @param {Object} dependencies
   */
  bindEvents($container, dependencies) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    
    // 标签页切换
    $container.find('.yyt-settings-tab').on('click', (e) => {
      const tabId = $(e.currentTarget).data('tab');
      
      // 更新标签页状态
      $container.find('.yyt-settings-tab').removeClass('yyt-active');
      $(e.currentTarget).addClass('yyt-active');
      
      // 更新内容显示
      $container.find('.yyt-settings-tab-content').removeClass('yyt-active');
      $container.find(`.yyt-settings-tab-content[data-tab="${tabId}"]`).addClass('yyt-active');
    });
    
    // 保存设置
    $container.find('#yyt-settings-save').on('click', () => {
      this._saveSettings($container, $);
    });
    
    // 重置设置
    $container.find('#yyt-settings-reset').on('click', () => {
      if (confirm('确定要重置所有设置为默认值吗？')) {
        settingsService.resetSettings();
        applyUiPreferences(DEFAULT_SETTINGS.ui, getTargetDocument());
        this.renderTo($container);
        showToast('success', '设置已重置');
      }
    });
  },
  
  /**
   * 保存设置
   * @private
   */
  _saveSettings($container, $) {
    const settings = {
      executor: {
        maxConcurrent: parseInt($container.find('#yyt-setting-maxConcurrent').val()) || 3,
        maxRetries: parseInt($container.find('#yyt-setting-maxRetries').val()) || 2,
        retryDelayMs: parseInt($container.find('#yyt-setting-retryDelayMs').val()) || 5000,
        requestTimeoutMs: parseInt($container.find('#yyt-setting-requestTimeoutMs').val()) || 90000,
        queueStrategy: $container.find('#yyt-setting-queueStrategy').val() || 'fifo'
      },
      listener: {
        listenGenerationEnded: $container.find('#yyt-setting-listenGenerationEnded').is(':checked'),
        ignoreQuietGeneration: $container.find('#yyt-setting-ignoreQuietGeneration').is(':checked'),
        ignoreAutoTrigger: $container.find('#yyt-setting-ignoreAutoTrigger').is(':checked'),
        debounceMs: parseInt($container.find('#yyt-setting-debounceMs').val()) || 300
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
  
  // ============================================================
  // 销毁
  // ============================================================
  
  /**
   * 销毁组件
   * @param {Object} $container
   */
  destroy($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    
    $container.find('*').off();
  },
  
  // ============================================================
  // 样式
  // ============================================================
  
  /**
   * 获取样式
   * @returns {string}
   */
  getStyles() {
    return `
      /* 设置面板样式 */
      .yyt-settings-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 10px;
      }

      .yyt-settings-hero {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 18px;
        font-weight: 800;
        color: var(--yyt-text);
        line-height: 1.15;
      }

      .yyt-settings-hero-desc {
        font-size: 12px;
        color: var(--yyt-text-secondary);
        line-height: 1.55;
        max-width: 72ch;
      }

      .yyt-settings-hero-status {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .yyt-settings-status-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.3px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-settings-status-chip.is-on {
        color: var(--yyt-success);
        background: rgba(74, 222, 128, 0.1);
      }

      .yyt-settings-status-chip.is-off {
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-settings-tabs {
        display: flex;
        gap: 4px;
        padding: 6px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        flex-shrink: 0;
      }
      
      .yyt-settings-tab {
        padding: 8px 12px;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 8px;
        color: var(--yyt-text-muted);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-settings-tab:hover {
        background: rgba(255, 255, 255, 0.04);
        color: var(--yyt-text);
      }
      
      .yyt-settings-tab.yyt-active {
        background: rgba(123, 183, 255, 0.1);
        border-color: rgba(123, 183, 255, 0.3);
        color: var(--yyt-accent);
      }
      
      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding: 4px;
      }
      
      .yyt-settings-tab-content {
        display: none;
      }
      
      .yyt-settings-tab-content.yyt-active {
        display: block;
      }
      
      .yyt-settings-section {
        margin-bottom: 14px;
        padding: 14px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
      }
      
      .yyt-settings-section-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-form-row {
        display: flex;
        gap: 16px;
      }
      
      .yyt-form-group {
        margin-bottom: 16px;
      }
      
      .yyt-form-group label {
        display: block;
        font-size: 12px;
        font-weight: 500;
        color: var(--yyt-text);
        margin-bottom: 6px;
      }
      
      .yyt-form-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
        margin-bottom: 8px;
      }
      
      .yyt-toggle-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
      }
      
      .yyt-toggle-label span {
        font-size: 13px;
        color: var(--yyt-text);
      }
      
      .yyt-settings-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 10px 0 0;
        background: rgba(255, 255, 255, 0.02);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }

      @media screen and (max-width: 768px) {
        .yyt-settings-hero {
          flex-direction: column;
        }

        .yyt-settings-hero-status {
          justify-content: flex-start;
        }

        .yyt-form-row {
          flex-direction: column;
        }
      }
    `;
  },
  
  // ============================================================
  // 便捷方法
  // ============================================================
  
  /**
   * 渲染到容器
   * @param {Object} $container
   */
  renderTo($container) {
    const html = this.render({});
    $container.html(html);
    this.bindEvents($container, {});
  }
};

// 导出主题应用函数供初始化使用
export { applyTheme, applyUiPreferences, THEME_CONFIGS };
export default SettingsPanel;
