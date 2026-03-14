/**
 * YouYou Toolkit - 主角状态栏面板组件
 * @description 支持提示词编辑、API预设绑定
 * @version 2.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { 
  SCRIPT_ID, 
  escapeHtml, 
  showToast, 
  getJQuery, 
  isContainerValid,
  copyToClipboard
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
    
    return `
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <!-- 工具配置区 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>工具配置</span>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API预设</label>
              <select class="yyt-select" id="${SCRIPT_ID}-tool-api-preset">
                <option value="">使用当前API配置</option>
                ${apiPresets.map(p => 
                  `<option value="${escapeHtml(p.name)}" ${p.name === config.apiPreset ? 'selected' : ''}>
                    ${escapeHtml(p.name)}
                  </option>`
                ).join('')}
              </select>
            </div>
            
            <div class="yyt-form-group yyt-flex-1">
              <label>输出模式</label>
              <select class="yyt-select" id="${SCRIPT_ID}-tool-output-mode">
                <option value="inline" ${config.outputMode === 'inline' ? 'selected' : ''}>
                  随AI输出
                </option>
                <option value="separate" ${config.outputMode === 'separate' ? 'selected' : ''}>
                  额外AI解析
                </option>
              </select>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>提取标签 (逗号分隔)</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-tool-extract-tags" 
                     value="${escapeHtml((config.extractTags || []).join(', '))}" 
                     placeholder="status_block">
            </div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-enabled" ${config.enabled ? 'checked' : ''}>
              <span>启用此工具</span>
            </label>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-auto-trigger" ${config.triggerEvents?.includes('GENERATION_ENDED') ? 'checked' : ''}>
              <span>自动触发 (GENERATION_ENDED)</span>
            </label>
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
                      rows="15" 
                      placeholder="输入提示词模板...">${escapeHtml(config.promptTemplate || '')}</textarea>
          </div>
          
          <div class="yyt-help-text">
            <p><strong>可用变量:</strong></p>
            <code>{{userMessage}}</code> - 用户消息
            <code>{{lastAiMessage}}</code> - 上一条AI消息
            <code>{{extractedContent}}</code> - 正则提取的内容
            <code>{{previousToolOutput}}</code> - 上一轮工具输出
            <br>
            <code>{{name}}</code> - 角色名称
            <code>{{location}}</code> - 位置
            <code>{{condition}}</code> - 状态
            <code>{{equipment}}</code> - 装备
            <code>{{skills}}</code> - 技能
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-tool-reset">
              <i class="fa-solid fa-undo"></i> 重置全部
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
   * 从表单获取配置数据
   * @private
   */
  _getFormData($container, $) {
    const autoTrigger = $container.find(`#${SCRIPT_ID}-tool-auto-trigger`).is(':checked');
    
    return {
      apiPreset: $container.find(`#${SCRIPT_ID}-tool-api-preset`).val() || '',
      outputMode: $container.find(`#${SCRIPT_ID}-tool-output-mode`).val() || 'inline',
      extractTags: ($container.find(`#${SCRIPT_ID}-tool-extract-tags`).val() || '')
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      promptTemplate: $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val() || '',
      enabled: $container.find(`#${SCRIPT_ID}-tool-enabled`).is(':checked'),
      triggerEvents: autoTrigger ? ['GENERATION_ENDED'] : []
    };
  },
  
  /**
   * 刷新UI
   * @private
   */
  _refreshUI($container, $) {
    const config = getToolFullConfig(this.toolId);
    if (!config) return;
    
    $container.find(`#${SCRIPT_ID}-tool-api-preset`).val(config.apiPreset || '');
    $container.find(`#${SCRIPT_ID}-tool-output-mode`).val(config.outputMode || 'inline');
    $container.find(`#${SCRIPT_ID}-tool-extract-tags`).val((config.extractTags || []).join(', '));
    $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(config.promptTemplate || '');
    $container.find(`#${SCRIPT_ID}-tool-enabled`).prop('checked', config.enabled);
    $container.find(`#${SCRIPT_ID}-tool-auto-trigger`).prop('checked', 
      config.triggerEvents?.includes('GENERATION_ENDED'));
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
    
    // 保存配置
    $container.find(`#${SCRIPT_ID}-tool-save`).on('click', () => {
      this._saveConfig($container, $);
    });
    
    // 重置全部
    $container.find(`#${SCRIPT_ID}-tool-reset`).on('click', () => {
      if (confirm('确定要重置所有配置吗？')) {
        resetToolConfig(this.toolId);
        this._refreshUI($container, $);
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
      /* 工具面板样式 */
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        line-height: 1.5;
        tab-size: 2;
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
      }
      
      .yyt-code-textarea:focus {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
      }
      
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
      
      .yyt-title-actions {
        margin-left: auto;
      }
      
      .yyt-btn-small {
        padding: 4px 10px;
        font-size: 12px;
      }
      
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
      
      .yyt-error {
        padding: 20px;
        text-align: center;
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: var(--yyt-radius-sm);
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