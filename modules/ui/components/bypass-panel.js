/**
 * YouYou Toolkit - 破限词面板组件
 * @description 提供破限词预设管理的UI界面
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { bypassManager, DEFAULT_BYPASS_PRESETS } from '../../bypass-manager.js';
import { showToast, getJQuery, isContainerValid, downloadJson, readFileContent, escapeHtml } from '../utils.js';

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
    const presets = bypassManager.getPresetList();
    const defaultPresetId = bypassManager.getDefaultPresetId();
    
    return `
      <div class="yyt-bypass-panel">
        <!-- 左侧预设列表 -->
        <div class="yyt-bypass-sidebar">
          <div class="yyt-bypass-sidebar-header">
            <span class="yyt-bypass-sidebar-title">破限词预设</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="yyt-bypass-add">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="yyt-bypass-preset-list">
            ${presets.map(preset => this._renderPresetItem(preset, preset.id === defaultPresetId)).join('')}
          </div>
          <div class="yyt-bypass-sidebar-footer">
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-import" title="导入">
              <i class="fa-solid fa-file-import"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-export" title="导出全部">
              <i class="fa-solid fa-file-export"></i>
            </button>
            <input type="file" id="yyt-bypass-import-file" accept=".json" style="display:none">
          </div>
        </div>
        
        <!-- 右侧编辑区 -->
        <div class="yyt-bypass-editor" id="yyt-bypass-editor">
          <div class="yyt-bypass-empty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>选择或创建破限词预设</p>
          </div>
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染预设列表项
   * @private
   */
  _renderPresetItem(preset, isDefault) {
    // 使用 DEFAULT_BYPASS_PRESETS 检查是否为内置预设
    const isBuiltIn = DEFAULT_BYPASS_PRESETS && DEFAULT_BYPASS_PRESETS[preset.id];
    return `
      <div class="yyt-bypass-preset-item ${isDefault ? 'yyt-default' : ''}" data-preset-id="${preset.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${escapeHtml(preset.name)}</span>
          <span class="yyt-bypass-preset-count">${preset.messages?.length || 0} 条消息</span>
        </div>
        <div class="yyt-bypass-preset-actions">
          ${isDefault ? '<span class="yyt-bypass-default-badge">默认</span>' : ''}
          ${!isBuiltIn ? `
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-quick-delete" title="删除预设" data-preset-id="${preset.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染编辑器
   * @private
   */
  _renderEditor(preset) {
    if (!preset) {
      return `
        <div class="yyt-bypass-empty">
          <i class="fa-solid fa-shield-halved"></i>
          <p>选择或创建破限词预设</p>
        </div>
      `;
    }
    
    const isDefaultPreset = bypassManager.getDefaultPresetId() === preset.id;
    // 使用 DEFAULT_BYPASS_PRESETS 检查是否为内置预设
    const isBuiltIn = DEFAULT_BYPASS_PRESETS && DEFAULT_BYPASS_PRESETS[preset.id];
    
    return `
      <div class="yyt-bypass-editor-content" data-preset-id="${preset.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${escapeHtml(preset.name)}" placeholder="预设名称">
          </div>
          <div class="yyt-bypass-editor-actions">
            ${!isBuiltIn ? `
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-duplicate" title="复制">
                <i class="fa-solid fa-copy"></i>
              </button>
              <button class="yyt-btn yyt-btn-small yyt-btn-danger" id="yyt-bypass-delete" title="删除">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : ''}
            <button class="yyt-btn yyt-btn-small ${isDefaultPreset ? 'yyt-btn-primary' : 'yyt-btn-secondary'}" 
                    id="yyt-bypass-set-default" title="设为默认">
              <i class="fa-solid fa-star"></i>
            </button>
          </div>
        </div>
        
        <div class="yyt-bypass-editor-desc">
          <input type="text" class="yyt-input" id="yyt-bypass-description" 
                 value="${escapeHtml(preset.description || '')}" placeholder="预设描述（可选）">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>消息列表</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> 添加消息
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(preset.messages || []).map(msg => this._renderMessageItem(msg)).join('')}
        </div>
        
        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> 保存
          </button>
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染消息项
   * @private
   */
  _renderMessageItem(message) {
    const roleIcons = {
      'SYSTEM': 'fa-server',
      'USER': 'fa-user',
      'assistant': 'fa-robot'
    };
    
    return `
      <div class="yyt-bypass-message ${message.enabled === false ? 'yyt-disabled' : ''}" data-message-id="${message.id}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${roleIcons[message.role] || 'fa-comment'}"></i>
            <select class="yyt-select yyt-bypass-role-select">
              <option value="SYSTEM" ${message.role === 'SYSTEM' ? 'selected' : ''}>SYSTEM</option>
              <option value="USER" ${message.role === 'USER' ? 'selected' : ''}>USER</option>
              <option value="assistant" ${message.role === 'assistant' ? 'selected' : ''}>assistant</option>
            </select>
          </div>
          <div class="yyt-bypass-message-controls">
            <label class="yyt-toggle yyt-small">
              <input type="checkbox" class="yyt-bypass-message-enabled" ${message.enabled !== false ? 'checked' : ''}>
              <span class="yyt-toggle-slider"></span>
            </label>
            ${message.deletable !== false ? `
              <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-delete-message" title="删除">
                <i class="fa-solid fa-times"></i>
              </button>
            ` : ''}
          </div>
        </div>
        <textarea class="yyt-textarea yyt-bypass-message-content" rows="3" 
                  placeholder="输入消息内容...">${escapeHtml(message.content || '')}</textarea>
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
    
    this._bindPresetListEvents($container, $);
    this._bindEditorEvents($container, $);
    this._bindFileEvents($container, $);
  },
  
  /**
   * 绑定预设列表事件
   * @private
   */
  _bindPresetListEvents($container, $) {
    // 选择预设
    $container.on('click', '.yyt-bypass-preset-item', (e) => {
      // 如果点击的是删除按钮，不触发选择
      if ($(e.target).closest('.yyt-bypass-quick-delete').length) {
        return;
      }
      const presetId = $(e.currentTarget).data('presetId');
      this._selectPreset($container, $, presetId);
    });
    
    // 快速删除预设
    $container.on('click', '.yyt-bypass-quick-delete', (e) => {
      e.stopPropagation();
      const presetId = $(e.currentTarget).data('presetId');
      if (!presetId) return;
      
      if (!confirm('确定要删除这个预设吗？')) return;
      
      const result = bypassManager.deletePreset(presetId);
      
      if (result.success) {
        // 如果删除的是当前选中的预设，清空编辑器
        const $editor = $container.find('.yyt-bypass-editor-content');
        const currentPresetId = $editor.data('presetId');
        if (currentPresetId === presetId) {
          $container.find('#yyt-bypass-editor').html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>选择或创建破限词预设</p>
            </div>
          `);
        }
        // 刷新列表
        this._refreshPresetList($container, $);
        showToast('success', '预设已删除');
      } else {
        showToast('error', result.message);
      }
    });
    
    // 新建预设
    $container.find('#yyt-bypass-add').on('click', () => {
      this._createNewPreset($container, $);
    });
  },
  
  /**
   * 绑定编辑器事件
   * @private
   */
  _bindEditorEvents($container, $) {
    // 保存预设
    $container.on('click', '#yyt-bypass-save', () => {
      this._saveCurrentPreset($container, $);
    });
    
    // 删除预设
    $container.on('click', '#yyt-bypass-delete', () => {
      this._deleteCurrentPreset($container, $);
    });
    
    // 复制预设
    $container.on('click', '#yyt-bypass-duplicate', () => {
      this._duplicateCurrentPreset($container, $);
    });
    
    // 设为默认
    $container.on('click', '#yyt-bypass-set-default', () => {
      this._setAsDefault($container, $);
    });
    
    // 添加消息
    $container.on('click', '#yyt-bypass-add-message', () => {
      this._addMessage($container, $);
    });
    
    // 删除消息
    $container.on('click', '.yyt-bypass-delete-message', (e) => {
      const $message = $(e.currentTarget).closest('.yyt-bypass-message');
      const messageId = $message.data('messageId');
      $message.remove();
    });
    
    // 消息启用/禁用
    $container.on('change', '.yyt-bypass-message-enabled', (e) => {
      const $message = $(e.currentTarget).closest('.yyt-bypass-message');
      $message.toggleClass('yyt-disabled', !$(e.currentTarget).is(':checked'));
    });
  },
  
  /**
   * 绑定文件事件
   * @private
   */
  _bindFileEvents($container, $) {
    // 导入
    $container.find('#yyt-bypass-import').on('click', () => {
      $container.find('#yyt-bypass-import-file').click();
    });
    
    $container.find('#yyt-bypass-import-file').on('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        const text = await readFileContent(file);
        const result = bypassManager.importPresets(text);
        showToast(result.success ? 'success' : 'error', result.message);
        if (result.success) this.renderTo($container);
      } catch (err) {
        showToast('error', `导入失败: ${err.message}`);
      }
      $(e.target).val('');
    });
    
    // 导出
    $container.find('#yyt-bypass-export').on('click', () => {
      try {
        const json = bypassManager.exportPresets();
        downloadJson(json, `bypass_presets_${Date.now()}.json`);
        showToast('success', '预设已导出');
      } catch (err) {
        showToast('error', `导出失败: ${err.message}`);
      }
    });
  },
  
  // ============================================================
  // 私有操作方法
  // ============================================================
  
  /**
   * 选择预设
   * @private
   */
  _selectPreset($container, $, presetId) {
    const preset = bypassManager.getPreset(presetId);
    if (!preset) return;
    
    // 更新列表选中状态
    $container.find('.yyt-bypass-preset-item').removeClass('yyt-active');
    $container.find(`.yyt-bypass-preset-item[data-preset-id="${presetId}"]`).addClass('yyt-active');
    
    // 渲染编辑器
    $container.find('#yyt-bypass-editor').html(this._renderEditor(preset));
  },
  
  /**
   * 创建新预设
   * @private
   */
  _createNewPreset($container, $) {
    const id = `bypass_${Date.now()}`;
    const result = bypassManager.createPreset({
      id,
      name: '新破限词预设',
      description: '',
      messages: []
    });
    
    if (result.success) {
      this.renderTo($container);
      this._selectPreset($container, $, id);
      showToast('success', '预设已创建');
    } else {
      showToast('error', result.message);
    }
  },
  
  /**
   * 保存当前预设
   * @private
   */
  _saveCurrentPreset($container, $) {
    const $editor = $container.find('.yyt-bypass-editor-content');
    const presetId = $editor.data('presetId');
    if (!presetId) return;
    
    const name = $editor.find('.yyt-bypass-name-input').val().trim();
    const description = $editor.find('#yyt-bypass-description').val().trim();
    
    if (!name) {
      showToast('warning', '请输入预设名称');
      return;
    }
    
    // 收集消息
    const messages = [];
    $editor.find('.yyt-bypass-message').each(function() {
      const $msg = $(this);
      messages.push({
        id: $msg.data('messageId'),
        role: $msg.find('.yyt-bypass-role-select').val(),
        content: $msg.find('.yyt-bypass-message-content').val(),
        enabled: $msg.find('.yyt-bypass-message-enabled').is(':checked'),
        deletable: true
      });
    });
    
    const result = bypassManager.updatePreset(presetId, {
      name,
      description,
      messages
    });
    
    if (result.success) {
      showToast('success', '预设已保存');
      // 刷新列表
      this._refreshPresetList($container, $);
    } else {
      showToast('error', result.message);
    }
  },
  
  /**
   * 删除当前预设
   * @private
   */
  _deleteCurrentPreset($container, $) {
    const $editor = $container.find('.yyt-bypass-editor-content');
    const presetId = $editor.data('presetId');
    if (!presetId) return;
    
    if (!confirm('确定要删除这个预设吗？')) return;
    
    const result = bypassManager.deletePreset(presetId);
    
    if (result.success) {
      this.renderTo($container);
      showToast('success', '预设已删除');
    } else {
      showToast('error', result.message);
    }
  },
  
  /**
   * 复制当前预设
   * @private
   */
  _duplicateCurrentPreset($container, $) {
    const $editor = $container.find('.yyt-bypass-editor-content');
    const presetId = $editor.data('presetId');
    if (!presetId) return;
    
    const newId = `bypass_${Date.now()}`;
    const result = bypassManager.duplicatePreset(presetId, newId);
    
    if (result.success) {
      this.renderTo($container);
      this._selectPreset($container, $, newId);
      showToast('success', '预设已复制');
    } else {
      showToast('error', result.message);
    }
  },
  
  /**
   * 设为默认预设
   * @private
   */
  _setAsDefault($container, $) {
    const $editor = $container.find('.yyt-bypass-editor-content');
    const presetId = $editor.data('presetId');
    if (!presetId) return;
    
    bypassManager.setDefaultPresetId(presetId);
    
    // 更新UI
    $container.find('.yyt-bypass-preset-item').removeClass('yyt-default');
    $container.find(`.yyt-bypass-preset-item[data-preset-id="${presetId}"]`).addClass('yyt-default');
    $container.find('.yyt-bypass-default-badge').remove();
    $container.find(`.yyt-bypass-preset-item[data-preset-id="${presetId}"] .yyt-bypass-preset-info`)
      .append('<span class="yyt-bypass-default-badge">默认</span>');
    
    showToast('success', '已设为默认预设');
  },
  
  /**
   * 添加消息
   * @private
   */
  _addMessage($container, $) {
    const $messages = $container.find('#yyt-bypass-messages');
    const newMessage = {
      id: `msg_${Date.now()}`,
      role: 'SYSTEM',
      content: '',
      enabled: true,
      deletable: true
    };
    $messages.append(this._renderMessageItem(newMessage));
  },
  
  /**
   * 刷新预设列表
   * @private
   */
  _refreshPresetList($container, $) {
    const presets = bypassManager.getPresetList();
    const defaultPresetId = bypassManager.getDefaultPresetId();
    
    $container.find('.yyt-bypass-preset-list').html(
      presets.map(preset => this._renderPresetItem(preset, preset.id === defaultPresetId)).join('')
    );
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
        height: 100%;
        gap: 16px;
      }
      
      .yyt-bypass-sidebar {
        width: 220px;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
        flex-shrink: 0;
      }
      
      .yyt-bypass-sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-sidebar-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-list {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
      }
      
      .yyt-bypass-preset-item {
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      
      .yyt-bypass-preset-item:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      
      .yyt-bypass-preset-item.yyt-active {
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-bypass-preset-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        min-width: 0;
      }
      
      .yyt-bypass-preset-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        opacity: 0.5;
        transition: opacity 0.2s ease;
      }
      
      .yyt-bypass-preset-item:hover .yyt-bypass-preset-actions {
        opacity: 1;
      }
      
      .yyt-bypass-quick-delete {
        padding: 4px 8px !important;
        font-size: 10px !important;
      }
      
      .yyt-bypass-preset-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-count {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-default-badge {
        font-size: 10px;
        padding: 2px 6px;
        background: rgba(123, 183, 255, 0.15);
        color: var(--yyt-accent);
        border-radius: 4px;
        margin-top: 4px;
        display: inline-block;
      }
      
      .yyt-bypass-sidebar-footer {
        display: flex;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-sidebar-footer .yyt-btn {
        flex: 1;
      }
      
      .yyt-bypass-editor {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
        overflow: hidden;
      }
      
      .yyt-bypass-empty {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-empty i {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.3;
      }
      
      .yyt-bypass-editor-content {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .yyt-bypass-editor-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-editor-title {
        flex: 1;
        margin-right: 16px;
      }
      
      .yyt-bypass-name-input {
        font-size: 15px;
        font-weight: 600;
        background: transparent;
        border: none;
        padding: 8px 0;
      }
      
      .yyt-bypass-name-input:focus {
        border-bottom: 1px solid var(--yyt-accent);
      }
      
      .yyt-bypass-editor-actions {
        display: flex;
        gap: 8px;
      }
      
      .yyt-bypass-editor-desc {
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-messages-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .yyt-bypass-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .yyt-bypass-message {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 14px;
      }
      
      .yyt-bypass-message.yyt-disabled {
        opacity: 0.5;
      }
      
      .yyt-bypass-message-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      
      .yyt-bypass-message-role {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-bypass-message-role i {
        color: var(--yyt-accent);
      }
      
      .yyt-bypass-role-select {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        padding: 4px 8px;
        font-size: 12px;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-message-controls {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-bypass-message-content {
        min-height: 80px;
      }
      
      .yyt-bypass-editor-footer {
        padding: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: flex-end;
      }
      
      .yyt-toggle.yyt-small {
        transform: scale(0.8);
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