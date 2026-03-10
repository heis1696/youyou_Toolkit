/**
 * YouYou Toolkit - 破限词面板组件
 * @description 提供破限词预设管理的UI
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { 
  SCRIPT_ID, 
  escapeHtml, 
  showToast, 
  getJQuery, 
  isContainerValid
} from '../utils.js';

// 破限词导入
import {
  getAllBypassPresets,
  getBypassPreset,
  saveBypassPreset,
  deleteBypassPreset,
  getCurrentBypassPresetId,
  setCurrentBypassPreset,
  isBypassEnabled,
  setBypassEnabled
} from '../../bypass-prompts.js';

// ============================================================
// 组件定义
// ============================================================

export const BypassPanel = {
  id: 'bypassPanel',
  
  // ============================================================
  // 渲染
  // ============================================================
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const bypassPresets = getAllBypassPresets();
    const currentBypassId = getCurrentBypassPresetId();
    const bypassEnabled = isBypassEnabled();
    
    return `
      <div class="yyt-bypass-panel">
        <!-- 破限词开关 -->
        <div class="yyt-panel-section">
          <div class="yyt-toggle-row">
            <div class="yyt-toggle-label">
              <span>启用破限词</span>
              <span class="yyt-toggle-hint">在API请求前自动注入破限词预设</span>
            </div>
            <label class="yyt-toggle">
              <input type="checkbox" id="${SCRIPT_ID}-bypass-enabled" ${bypassEnabled ? 'checked' : ''}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <!-- 破限词预设列表 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-shield-alt"></i>
            <span>破限词预设</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${SCRIPT_ID}-add-bypass" style="margin-left: auto;">
              <i class="fa-solid fa-plus"></i> 新建
            </button>
          </div>
          <div class="yyt-bypass-list">
            ${this._renderBypassList(bypassPresets, currentBypassId)}
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-info-circle"></i>
            <span>使用说明</span>
          </div>
          <div class="yyt-help-text">
            <p>1. 启用破限词功能后，每次API请求都会自动在消息前注入所选预设的内容</p>
            <p>2. 点击预设可切换当前使用的预设</p>
            <p>3. 编辑预设可自定义消息内容，格式为JSON数组</p>
            <p>4. 默认预设不可删除，但可以编辑</p>
          </div>
        </div>
      </div>
    `;
  },
  
  // ============================================================
  // 私有渲染方法
  // ============================================================
  
  /**
   * 渲染破限词列表
   * @private
   */
  _renderBypassList(bypassPresets, currentBypassId) {
    return Object.entries(bypassPresets).map(([id, preset]) => `
      <div class="yyt-bypass-item ${id === currentBypassId ? 'yyt-active' : ''}" data-bypass-id="${id}">
        <div class="yyt-bypass-info">
          <span class="yyt-bypass-name">${escapeHtml(preset.name)}</span>
          <span class="yyt-bypass-count">${preset.messages?.length || 0} 条消息</span>
        </div>
        <div class="yyt-bypass-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="edit" title="编辑">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-danger" data-action="delete" title="删除" 
                  ${preset.isDefault ? 'disabled' : ''}>
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
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
    
    this._bindBypassEvents($container, $);
  },
  
  /**
   * 绑定破限词事件
   * @private
   */
  _bindBypassEvents($container, $) {
    // 破限词开关
    $container.find(`#${SCRIPT_ID}-bypass-enabled`).on('change', function() {
      const enabled = $(this).is(':checked');
      setBypassEnabled(enabled);
      showToast('success', enabled ? '破限词已启用' : '破限词已禁用');
      eventBus.emit(enabled ? EVENTS.BYPASS_ENABLED : EVENTS.BYPASS_DISABLED);
    });
    
    // 破限词预设选择
    $container.find('.yyt-bypass-item').on('click', function(e) {
      // 如果点击的是按钮，不触发选择
      if ($(e.target).closest('.yyt-bypass-actions').length) return;
      
      const bypassId = $(this).data('bypass-id');
      setCurrentBypassPreset(bypassId);
      $container.find('.yyt-bypass-item').removeClass('yyt-active');
      $(this).addClass('yyt-active');
      showToast('success', '已切换破限词预设');
      eventBus.emit(EVENTS.BYPASS_PRESET_ACTIVATED, { id: bypassId });
    });
    
    // 破限词操作按钮
    $container.find('.yyt-bypass-actions button').on('click', (e) => {
      e.stopPropagation();
      const $item = $(e.currentTarget).closest('.yyt-bypass-item');
      const bypassId = $item.data('bypass-id');
      const action = $(e.currentTarget).data('action');
      
      if (action === 'edit') {
        this._showBypassEditDialog($container, $, bypassId);
      } else if (action === 'delete') {
        if (confirm('确定要删除这个破限词预设吗？')) {
          const result = deleteBypassPreset(bypassId);
          if (result) {
            this.renderTo($container);
            showToast('info', '预设已删除');
            eventBus.emit(EVENTS.BYPASS_PRESET_DELETED, { id: bypassId });
          } else {
            showToast('warning', '默认预设不可删除');
          }
        }
      }
    });
    
    // 新建破限词预设
    $container.find(`#${SCRIPT_ID}-add-bypass`).on('click', () => {
      this._showBypassEditDialog($container, $, null);
    });
  },
  
  // ============================================================
  // 对话框
  // ============================================================
  
  /**
   * 显示破限词编辑对话框
   * @private
   */
  _showBypassEditDialog($container, $, bypassId) {
    const preset = bypassId ? getBypassPreset(bypassId) : null;
    const isEdit = !!preset;
    
    const dialogHtml = `
      <div class="yyt-dialog-overlay" id="${SCRIPT_ID}-bypass-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${isEdit ? '编辑破限词预设' : '新建破限词预设'}</span>
            <button class="yyt-dialog-close" id="${SCRIPT_ID}-bypass-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>预设名称</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-bypass-name" 
                     value="${preset ? escapeHtml(preset.name) : ''}" placeholder="输入预设名称">
            </div>
            <div class="yyt-form-group">
              <label>描述</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-bypass-desc" 
                     value="${preset ? escapeHtml(preset.description || '') : ''}" placeholder="预设描述">
            </div>
            <div class="yyt-form-group">
              <label>消息内容（JSON数组格式）</label>
              <textarea class="yyt-textarea yyt-code-textarea" id="${SCRIPT_ID}-bypass-messages" rows="10"
                        placeholder='[{"role":"SYSTEM","content":"...","deletable":true}]'>${preset ? escapeHtml(JSON.stringify(preset.messages, null, 2)) : '[]'}</textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-bypass-dialog-cancel">取消</button>
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-bypass-dialog-save">保存</button>
          </div>
        </div>
      </div>
    `;
    
    $(`#${SCRIPT_ID}-bypass-dialog-overlay`).remove();
    $container.append(dialogHtml);
    
    const $overlay = $(`#${SCRIPT_ID}-bypass-dialog-overlay`);
    
    const closeDialog = () => $overlay.remove();
    
    $overlay.find(`#${SCRIPT_ID}-bypass-dialog-close, #${SCRIPT_ID}-bypass-dialog-cancel`).on('click', closeDialog);
    $overlay.on('click', function(e) { if (e.target === this) closeDialog(); });
    
    $overlay.find(`#${SCRIPT_ID}-bypass-dialog-save`).on('click', () => {
      const name = $(`#${SCRIPT_ID}-bypass-name`).val().trim();
      const desc = $(`#${SCRIPT_ID}-bypass-desc`).val().trim();
      const messagesStr = $(`#${SCRIPT_ID}-bypass-messages`).val().trim();
      
      if (!name) {
        showToast('warning', '请输入预设名称');
        return;
      }
      
      let messages;
      try {
        messages = JSON.parse(messagesStr);
      } catch (e) {
        showToast('error', '消息内容JSON格式无效');
        return;
      }
      
      const id = bypassId || `custom_${Date.now()}`;
      saveBypassPreset(id, { name, description: desc, messages });
      closeDialog();
      this.renderTo($container);
      showToast('success', isEdit ? '预设已更新' : '预设已创建');
      eventBus.emit(isEdit ? EVENTS.BYPASS_PRESET_UPDATED : EVENTS.BYPASS_PRESET_CREATED, { id });
    });
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
      /* 破限词面板样式 */
      .yyt-bypass-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-toggle-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
      }
      
      .yyt-toggle-label {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .yyt-toggle-label span:first-child {
        font-weight: 600;
        color: var(--yyt-text);
      }
      
      .yyt-toggle-hint {
        font-size: 12px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-toggle {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 26px;
      }
      
      .yyt-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .yyt-toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.1);
        transition: 0.3s;
        border-radius: 26px;
      }
      
      .yyt-toggle-slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
      }
      
      .yyt-toggle input:checked + .yyt-toggle-slider {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      }
      
      .yyt-toggle input:checked + .yyt-toggle-slider:before {
        transform: translateX(22px);
      }
      
      .yyt-bypass-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 300px;
        overflow-y: auto;
      }
      
      .yyt-bypass-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 14px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .yyt-bypass-item:hover {
        border-color: rgba(255, 255, 255, 0.15);
      }
      
      .yyt-bypass-item.yyt-active {
        border-color: var(--yyt-accent);
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.1) 0%, rgba(123, 183, 255, 0.02) 100%);
      }
      
      .yyt-bypass-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .yyt-bypass-name {
        font-weight: 500;
        font-size: 13px;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-count {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-actions {
        display: flex;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      
      .yyt-bypass-item:hover .yyt-bypass-actions {
        opacity: 1;
      }
      
      .yyt-help-text {
        font-size: 12px;
        color: var(--yyt-text-secondary);
        line-height: 1.8;
      }
      
      .yyt-help-text p {
        margin: 0;
        padding: 4px 0;
      }
      
      .yyt-dialog-wide {
        width: 480px;
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

export default BypassPanel;