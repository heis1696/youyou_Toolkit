/**
 * YouYou Toolkit - 主角状态栏面板组件
 * @description 支持提示词编辑、API预设绑定、破限词绑定
 * @version 3.0.0 - 简化版，单提示词模板
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { 
  SCRIPT_ID, 
  escapeHtml, 
  showToast, 
  getJQuery, 
  isContainerValid
} from '../utils.js';

import {
  getToolFullConfig,
  saveToolConfig,
  resetToolConfig,
  getAllDefaultToolConfigs
} from '../../tool-registry.js';

import {
  getAllPresets
} from '../../preset-manager.js';

import {
  getPresetList as getBypassPresetList
} from '../../bypass-manager.js';

// ============================================================
// 组件定义
// ============================================================

export const StatusBlockPanel = {
  id: 'statusBlockPanel',
  toolId: 'statusBlock',
  
  // ============================================================
  // 渲染
  // ============================================================
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const config = getToolFullConfig(this.toolId);
    
    if (!config) {
      return `<div class="yyt-error">工具配置加载失败</div>`;
    }
    
    const apiPresets = this._getApiPresets();
    const bypassPresets = this._getBypassPresets();
    const outputMode = config.output?.mode || 'follow_ai';
    const bypassEnabled = config.bypass?.enabled || false;
    const bypassPresetId = config.bypass?.presetId || '';
    
    return `
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <!-- 基础配置 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>基础配置</span>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-enabled" ${config.enabled ? 'checked' : ''}>
              <span>启用工具</span>
            </label>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-auto-trigger" ${config.trigger?.enabled ? 'checked' : ''}>
              <span>自动触发（GENERATION_ENDED）</span>
            </label>
          </div>
          
          <div class="yyt-form-group">
            <label>提取标签（逗号分隔）</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-tool-extract-tags" 
                   value="${escapeHtml((config.extractTags || []).join(', '))}" 
                   placeholder="status_block">
          </div>
        </div>
        
        <!-- 输出配置 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-output"></i>
            <span>输出配置</span>
          </div>
          
          <div class="yyt-form-group">
            <label>输出模式</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-output-mode">
              <option value="follow_ai" ${outputMode === 'follow_ai' ? 'selected' : ''}>
                随 AI 输出
              </option>
              <option value="post_response_api" ${outputMode === 'post_response_api' ? 'selected' : ''}>
                额外 AI 模型解析
              </option>
            </select>
            <div class="yyt-help-text yyt-inline-help">
              <small>随 AI 输出：不执行额外解析链</small><br>
              <small>额外 AI 模型解析：回复后调用额外模型处理</small>
            </div>
          </div>
          
          <div class="yyt-form-group yyt-output-extra ${outputMode === 'post_response_api' ? '' : 'yyt-hidden'}">
            <label>API 预设</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-api-preset">
              <option value="">使用当前API配置</option>
              ${apiPresets.map(p => 
                `<option value="${escapeHtml(p.name)}" ${p.name === config.output?.apiPreset ? 'selected' : ''}>
                  ${escapeHtml(p.name)}
                </option>`
              ).join('')}
            </select>
          </div>
          
          <div class="yyt-form-group yyt-output-extra ${outputMode === 'post_response_api' ? '' : 'yyt-hidden'}">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-overwrite" ${config.output?.overwrite !== false ? 'checked' : ''}>
              <span>覆盖旧注入结果</span>
            </label>
          </div>
        </div>
        
        <!-- 破限词绑定 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-shield-halved"></i>
            <span>破限词绑定</span>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-bypass-enabled" ${bypassEnabled ? 'checked' : ''}>
              <span>启用破限词</span>
            </label>
          </div>
          
          <div class="yyt-form-group yyt-bypass-preset-select ${bypassEnabled ? '' : 'yyt-hidden'}">
            <label>破限词预设</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-bypass-preset">
              <option value="">选择预设</option>
              ${bypassPresets.map(p => 
                `<option value="${escapeHtml(p.id)}" ${p.id === bypassPresetId ? 'selected' : ''}>
                  ${escapeHtml(p.name)}${p.isDefault ? ' [默认]' : ''}
                </option>`
              ).join('')}
            </select>
          </div>
        </div>
        
        <!-- 提示词模板编辑区 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-file-code"></i>
            <span>提示词模板</span>
            <div class="yyt-title-actions">
              <button class="yyt-btn yyt-btn-small" id="${SCRIPT_ID}-tool-reset-template">
                <i class="fa-solid fa-undo"></i> 重置模板
              </button>
            </div>
          </div>
          
          <div class="yyt-form-group">
            <textarea class="yyt-textarea yyt-code-textarea" 
                      id="${SCRIPT_ID}-tool-prompt-template" 
                      rows="12" 
                      placeholder="输入提示词模板...">${escapeHtml(config.promptTemplate || '')}</textarea>
          </div>
        </div>
        
        <!-- 调试信息（可折叠） -->
        <div class="yyt-panel-section yyt-collapsible">
          <div class="yyt-section-title yyt-collapsible-header">
            <i class="fa-solid fa-bug"></i>
            <span>调试信息</span>
            <i class="fa-solid fa-chevron-down yyt-collapse-icon"></i>
          </div>
          <div class="yyt-collapsible-content">
            <div class="yyt-debug-info">
              <div class="yyt-debug-row">
                <span class="yyt-debug-label">运行状态:</span>
                <span class="yyt-debug-value" id="${SCRIPT_ID}-tool-runtime-status">${config.runtime?.lastStatus || 'idle'}</span>
              </div>
              <div class="yyt-debug-row">
                <span class="yyt-debug-label">最近运行:</span>
                <span class="yyt-debug-value" id="${SCRIPT_ID}-tool-runtime-last">${config.runtime?.lastRunAt ? new Date(config.runtime.lastRunAt).toLocaleString() : '未运行'}</span>
              </div>
              <div class="yyt-debug-row">
                <span class="yyt-debug-label">成功/失败:</span>
                <span class="yyt-debug-value" id="${SCRIPT_ID}-tool-runtime-counts">${config.runtime?.successCount || 0} / ${config.runtime?.errorCount || 0}</span>
              </div>
              ${config.runtime?.lastError ? `
              <div class="yyt-debug-row yyt-debug-error">
                <span class="yyt-debug-label">最近错误:</span>
                <span class="yyt-debug-value">${escapeHtml(config.runtime.lastError)}</span>
              </div>
              ` : ''}
            </div>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-tool-reset">
              <i class="fa-solid fa-undo"></i> 重置配置
            </button>
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-tool-save">
              <i class="fa-solid fa-save"></i> 保存配置
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-tool-copy-template">
              <i class="fa-solid fa-copy"></i> 复制模板
            </button>
          </div>
        </div>
      </div>
    `;
  },
  
  // ============================================================
  // 私有方法
  // ============================================================
  
  /**
   * 获取API预设列表
   * @private
   */
  _getApiPresets() {
    try {
      const presets = getAllPresets();
      return presets || [];
    } catch (e) {
      return [];
    }
  },
  
  /**
   * 获取破限词预设列表
   * @private
   */
  _getBypassPresets() {
    try {
      const presets = getBypassPresetList();
      return presets || [];
    } catch (e) {
      return [];
    }
  },
  
  /**
   * 从表单获取配置数据（v0.6 简化版）
   * @private
   */
  _getFormData($container, $) {
    const autoTrigger = $container.find(`#${SCRIPT_ID}-tool-auto-trigger`).is(':checked');
    const outputMode = $container.find(`#${SCRIPT_ID}-tool-output-mode`).val() || 'follow_ai';
    const bypassEnabled = $container.find(`#${SCRIPT_ID}-tool-bypass-enabled`).is(':checked');
    
    return {
      enabled: $container.find(`#${SCRIPT_ID}-tool-enabled`).is(':checked'),
      promptTemplate: $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val() || '',
      extractTags: ($container.find(`#${SCRIPT_ID}-tool-extract-tags`).val() || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      
      trigger: {
        event: 'GENERATION_ENDED',
        enabled: autoTrigger
      },
      
      output: {
        mode: outputMode,
        apiPreset: $container.find(`#${SCRIPT_ID}-tool-api-preset`).val() || '',
        overwrite: $container.find(`#${SCRIPT_ID}-tool-overwrite`).is(':checked'),
        enabled: true
      },
      
      bypass: {
        enabled: bypassEnabled,
        presetId: bypassEnabled ? $container.find(`#${SCRIPT_ID}-tool-bypass-preset`).val() || '' : ''
      }
    };
  },
  
  /**
   * 刷新UI（v0.6 简化版）
   * @private
   */
  _refreshUI($container, $) {
    const config = getToolFullConfig(this.toolId);
    if (!config) return;
    
    const outputMode = config.output?.mode || 'follow_ai';
    const bypassEnabled = config.bypass?.enabled || false;
    
    // 基础配置
    $container.find(`#${SCRIPT_ID}-tool-enabled`).prop('checked', config.enabled);
    $container.find(`#${SCRIPT_ID}-tool-auto-trigger`).prop('checked', config.trigger?.enabled);
    $container.find(`#${SCRIPT_ID}-tool-extract-tags`).val((config.extractTags || []).join(', '));
    
    // 输出配置
    $container.find(`#${SCRIPT_ID}-tool-output-mode`).val(outputMode);
    $container.find(`#${SCRIPT_ID}-tool-api-preset`).val(config.output?.apiPreset || '');
    $container.find(`#${SCRIPT_ID}-tool-overwrite`).prop('checked', config.output?.overwrite !== false);
    
    // 根据输出模式显示/隐藏额外选项
    $container.find('.yyt-output-extra').toggleClass('yyt-hidden', outputMode !== 'post_response_api');
    
    // 破限词配置
    $container.find(`#${SCRIPT_ID}-tool-bypass-enabled`).prop('checked', bypassEnabled);
    $container.find(`#${SCRIPT_ID}-tool-bypass-preset`).val(config.bypass?.presetId || '');
    $container.find('.yyt-bypass-preset-select').toggleClass('yyt-hidden', !bypassEnabled);
    
    // 提示词模板
    $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(config.promptTemplate || '');
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
    
    const self = this;
    
    // 输出模式切换 - 显示/隐藏额外选项
    $container.find(`#${SCRIPT_ID}-tool-output-mode`).on('change', (e) => {
      const mode = $(e.target).val();
      $container.find('.yyt-output-extra').toggleClass('yyt-hidden', mode !== 'post_response_api');
    });
    
    // 破限词启用切换 - 显示/隐藏预设选择
    $container.find(`#${SCRIPT_ID}-tool-bypass-enabled`).on('change', (e) => {
      const enabled = $(e.target).is(':checked');
      $container.find('.yyt-bypass-preset-select').toggleClass('yyt-hidden', !enabled);
    });
    
    // 折叠面板
    $container.find('.yyt-collapsible-header').on('click', (e) => {
      const $section = $(e.currentTarget).closest('.yyt-collapsible');
      $section.toggleClass('yyt-collapsed');
    });
    
    // 保存配置
    $container.find(`#${SCRIPT_ID}-tool-save`).on('click', () => {
      this._saveConfig($container, $);
    });
    
    // 重置全部
    $container.find(`#${SCRIPT_ID}-tool-reset`).on('click', () => {
      if (confirm('确定要重置所有配置吗？')) {
        resetToolConfig(this.toolId);
        this.renderTo($container);
        showToast('info', '已重置');
      }
    });
    
    // 重置模板
    $container.find(`#${SCRIPT_ID}-tool-reset-template`).on('click', () => {
      const defaultConfigs = getAllDefaultToolConfigs();
      const defaultConfig = defaultConfigs[this.toolId];
      if (defaultConfig && defaultConfig.promptTemplate) {
        $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(defaultConfig.promptTemplate);
        showToast('info', '模板已重置');
      }
    });
    
    // 复制模板
    $container.find(`#${SCRIPT_ID}-tool-copy-template`).on('click', async () => {
      const template = $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val();
      if (!template) {
        showToast('warning', '模板内容为空');
        return;
      }
      
      try {
        await navigator.clipboard.writeText(template);
        showToast('success', '模板已复制到剪贴板');
      } catch (e) {
        showToast('error', '复制失败');
      }
    });
  },
  
  /**
   * 保存配置
   * @private
   */
  _saveConfig($container, $) {
    const config = this._getFormData($container, $);
    
    const success = saveToolConfig(this.toolId, config);
    
    if (success) {
      showToast('success', '配置已保存');
      eventBus.emit(EVENTS.TOOL_UPDATED, { toolId: this.toolId, config });
    } else {
      showToast('error', '保存失败');
    }
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
      /* 工具面板样式 - v0.6 简化版 */
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      /* 隐藏元素 */
      .yyt-hidden {
        display: none !important;
      }
      
      /* 代码文本框 */
      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        line-height: 1.5;
        tab-size: 2;
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
        resize: vertical;
        min-height: 200px;
      }
      
      .yyt-code-textarea:focus {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
      }
      
      /* 内联帮助文本 */
      .yyt-inline-help {
        margin-top: 8px;
        padding: 8px 12px;
        font-size: 11px;
        line-height: 1.6;
      }
      
      .yyt-inline-help small {
        color: var(--yyt-text-muted);
      }
      
      /* 帮助文本 */
      .yyt-help-text {
        font-size: 12px;
        color: var(--yyt-text-muted);
        padding: 12px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        line-height: 1.8;
      }
      
      .yyt-help-text code {
        background: rgba(123, 183, 255, 0.15);
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 11px;
        color: #7bb7ff;
        margin: 0 2px;
      }
      
      .yyt-help-text p {
        margin: 0 0 8px 0;
        font-weight: 500;
        color: var(--yyt-text);
      }
      
      /* 标题操作区 */
      .yyt-title-actions {
        margin-left: auto;
      }
      
      .yyt-btn-small {
        padding: 4px 10px;
        font-size: 12px;
      }
      
      /* 复选框标签 */
      .yyt-checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
      }
      
      .yyt-checkbox-label input[type="checkbox"] {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
      
      .yyt-checkbox-label:hover {
        color: var(--yyt-text);
      }
      
      /* 面板底部 */
      .yyt-panel-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
        border-top: 1px solid var(--yyt-border);
      }
      
      .yyt-footer-left,
      .yyt-footer-right {
        display: flex;
        gap: 8px;
      }
      
      /* 错误提示 */
      .yyt-error {
        padding: 20px;
        text-align: center;
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: var(--yyt-radius-sm);
      }
      
      /* 折叠面板 */
      .yyt-collapsible .yyt-collapsible-content {
        overflow: hidden;
        max-height: 500px;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        opacity: 1;
      }
      
      .yyt-collapsible.yyt-collapsed .yyt-collapsible-content {
        max-height: 0;
        opacity: 0;
      }
      
      .yyt-collapsible-header {
        cursor: pointer;
      }
      
      .yyt-collapsible-header .yyt-collapse-icon {
        margin-left: auto;
        transition: transform 0.3s ease;
      }
      
      .yyt-collapsible.yyt-collapsed .yyt-collapse-icon {
        transform: rotate(-90deg);
      }
      
      /* 调试信息 */
      .yyt-debug-info {
        padding: 12px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: var(--yyt-radius-sm);
      }
      
      .yyt-debug-row {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      
      .yyt-debug-row:last-child {
        border-bottom: none;
      }
      
      .yyt-debug-label {
        color: var(--yyt-text-muted);
        font-size: 12px;
      }
      
      .yyt-debug-value {
        color: var(--yyt-text);
        font-size: 12px;
        font-family: 'Fira Code', monospace;
      }
      
      .yyt-debug-error .yyt-debug-value {
        color: var(--yyt-danger);
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

export default StatusBlockPanel;