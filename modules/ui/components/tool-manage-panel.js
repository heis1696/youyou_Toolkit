/**
 * YouYou Toolkit - 工具管理面板组件
 * @description 提供工具和破限词预设管理的UI
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { 
  SCRIPT_ID, 
  escapeHtml, 
  showToast, 
  getJQuery, 
  isContainerValid,
  downloadJson,
  readFileContent
} from '../utils.js';

// 工具管理导入
import { 
  getAllTools, 
  getTool, 
  saveTool, 
  deleteTool, 
  setToolEnabled, 
  exportTools,
  importTools,
  resetTools
} from '../../tool-manager.js';

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

export const ToolManagePanel = {
  id: 'toolManagePanel',
  
  // ============================================================
  // 渲染
  // ============================================================
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const tools = getAllTools();
    const bypassPresets = getAllBypassPresets();
    const currentBypassId = getCurrentBypassPresetId();
    const bypassEnabled = isBypassEnabled();
    
    return `
      <div class="yyt-tool-manager">
        <!-- 破限词开关 -->
        <div class="yyt-panel-section">
          <div class="yyt-toggle-row">
            <div class="yyt-toggle-label">
              <span>启用破限词</span>
              <span class="yyt-toggle-hint">在API请求前自动注入破限词预设</span>
            </div>
            <label class="yyt-toggle">
              <input type="checkbox" id="yyt-bypass-enabled" ${bypassEnabled ? 'checked' : ''}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <!-- 破限词预设 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-shield-alt"></i>
            <span>破限词预设</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-add-bypass" style="margin-left: auto;">
              <i class="fa-solid fa-plus"></i> 新建
            </button>
          </div>
          <div class="yyt-bypass-list">
            ${this._renderBypassList(bypassPresets, currentBypassId)}
          </div>
        </div>
        
        <!-- 工具列表 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-tools"></i>
            <span>工具列表</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-add-tool" style="margin-left: auto;">
              <i class="fa-solid fa-plus"></i> 新建工具
            </button>
          </div>
          <div class="yyt-tool-list">
            ${this._renderToolList(tools)}
          </div>
        </div>
        
        <!-- 底部操作 -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-import-tools">
              <i class="fa-solid fa-file-import"></i> 导入
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="yyt-export-tools">
              <i class="fa-solid fa-file-export"></i> 导出
            </button>
            <input type="file" id="yyt-import-tools-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-reset-tools">
              <i class="fa-solid fa-undo"></i> 重置
            </button>
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
  
  /**
   * 渲染工具列表
   * @private
   */
  _renderToolList(tools) {
    return Object.entries(tools).map(([id, tool]) => `
      <div class="yyt-tool-item ${tool.enabled ? 'yyt-enabled' : 'yyt-disabled'}" data-tool-id="${id}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${escapeHtml(tool.name)}</span>
            <span class="yyt-tool-category">${escapeHtml(tool.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${tool.enabled ? 'checked' : ''}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${escapeHtml(tool.description)}</div>
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
    this._bindToolEvents($container, $);
    this._bindFileEvents($container, $);
  },
  
  /**
   * 绑定破限词事件
   * @private
   */
  _bindBypassEvents($container, $) {
    // 破限词开关
    $container.find('#yyt-bypass-enabled').on('change', function() {
      const enabled = $(this).is(':checked');
      setBypassEnabled(enabled);
      showToast('success', enabled ? '破限词已启用' : '破限词已禁用');
      eventBus.emit(enabled ? EVENTS.BYPASS_ENABLED : EVENTS.BYPASS_DISABLED);
    });
    
    // 破限词预设选择
    $container.find('.yyt-bypass-item').on('click', function() {
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
          deleteBypassPreset(bypassId);
          this.renderTo($container);
          showToast('info', '预设已删除');
          eventBus.emit(EVENTS.BYPASS_PRESET_DELETED, { id: bypassId });
        }
      }
    });
    
    // 新建破限词预设
    $container.find('#yyt-add-bypass').on('click', () => {
      this._showBypassEditDialog($container, $, null);
    });
  },
  
  /**
   * 绑定工具事件
   * @private
   */
  _bindToolEvents($container, $) {
    // 工具启用/禁用
    $container.find('.yyt-tool-toggle input').on('change', (e) => {
      const $item = $(e.currentTarget).closest('.yyt-tool-item');
      const toolId = $item.data('tool-id');
      const enabled = $(e.currentTarget).is(':checked');
      
      setToolEnabled(toolId, enabled);
      $item.toggleClass('yyt-enabled', enabled).toggleClass('yyt-disabled', !enabled);
      showToast('info', enabled ? '工具已启用' : '工具已禁用');
      eventBus.emit(enabled ? EVENTS.TOOL_ENABLED : EVENTS.TOOL_DISABLED, { toolId });
    });
    
    // 新建工具
    $container.find('#yyt-add-tool').on('click', () => {
      this._showToolEditDialog($container, $, null);
    });
  },
  
  /**
   * 绑定文件事件
   * @private
   */
  _bindFileEvents($container, $) {
    // 导入工具
    $container.find('#yyt-import-tools').on('click', () => {
      $container.find('#yyt-import-tools-file').click();
    });
    
    $container.find('#yyt-import-tools-file').on('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        const text = await readFileContent(file);
        const result = importTools(text, { overwrite: false });
        showToast(result.success ? 'success' : 'error', result.message);
        if (result.success) this.renderTo($container);
      } catch (e) {
        showToast('error', `导入失败: ${e.message}`);
      }
      $(e.target).val('');
    });
    
    // 导出工具
    $container.find('#yyt-export-tools').on('click', () => {
      try {
        const json = exportTools();
        downloadJson(json, `youyou_toolkit_tools_${Date.now()}.json`);
        showToast('success', '工具已导出');
      } catch (e) {
        showToast('error', `导出失败: ${e.message}`);
      }
    });
    
    // 重置工具
    $container.find('#yyt-reset-tools').on('click', () => {
      if (confirm('确定要重置所有工具吗？')) {
        resetTools();
        this.renderTo($container);
        showToast('info', '工具已重置');
      }
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
      <div class="yyt-dialog-overlay" id="yyt-bypass-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${isEdit ? '编辑破限词预设' : '新建破限词预设'}</span>
            <button class="yyt-dialog-close" id="yyt-bypass-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>预设名称</label>
              <input type="text" class="yyt-input" id="yyt-bypass-name" 
                     value="${preset ? escapeHtml(preset.name) : ''}" placeholder="输入预设名称">
            </div>
            <div class="yyt-form-group">
              <label>描述</label>
              <input type="text" class="yyt-input" id="yyt-bypass-desc" 
                     value="${preset ? escapeHtml(preset.description || '') : ''}" placeholder="预设描述">
            </div>
            <div class="yyt-form-group">
              <label>消息内容（JSON数组格式）</label>
              <textarea class="yyt-textarea yyt-code-textarea" id="yyt-bypass-messages" rows="10"
                        placeholder='[{"role":"SYSTEM","content":"...","deletable":true}]'>${preset ? escapeHtml(JSON.stringify(preset.messages, null, 2)) : '[]'}</textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-bypass-dialog-cancel">取消</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-dialog-save">保存</button>
          </div>
        </div>
      </div>
    `;
    
    $('#yyt-bypass-dialog-overlay').remove();
    $container.append(dialogHtml);
    
    const $overlay = $('#yyt-bypass-dialog-overlay');
    
    const closeDialog = () => $overlay.remove();
    
    $overlay.find('#yyt-bypass-dialog-close, #yyt-bypass-dialog-cancel').on('click', closeDialog);
    $overlay.on('click', function(e) { if (e.target === this) closeDialog(); });
    
    $overlay.find('#yyt-bypass-dialog-save').on('click', () => {
      const name = $('#yyt-bypass-name').val().trim();
      const desc = $('#yyt-bypass-desc').val().trim();
      const messagesStr = $('#yyt-bypass-messages').val().trim();
      
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
  
  /**
   * 显示工具编辑对话框
   * @private
   */
  _showToolEditDialog($container, $, toolId) {
    const tool = toolId ? getTool(toolId) : null;
    const isEdit = !!tool;
    
    const dialogHtml = `
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${isEdit ? '编辑工具' : '新建工具'}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>工具名称</label>
                <input type="text" class="yyt-input" id="yyt-tool-name" 
                       value="${tool ? escapeHtml(tool.name) : ''}" placeholder="工具名称">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>分类</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${tool?.category === 'api' ? 'selected' : ''}>API</option>
                  <option value="prompt" ${tool?.category === 'prompt' ? 'selected' : ''}>Prompt</option>
                  <option value="utility" ${tool?.category === 'utility' ? 'selected' : ''}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>描述</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc" 
                     value="${tool ? escapeHtml(tool.description || '') : ''}" placeholder="工具描述">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>超时时间(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout" 
                       value="${tool?.config?.execution?.timeout || 60000}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>重试次数</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries" 
                       value="${tool?.config?.execution?.retries || 3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">取消</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">保存</button>
          </div>
        </div>
      </div>
    `;
    
    $('#yyt-tool-dialog-overlay').remove();
    $container.append(dialogHtml);
    
    const $overlay = $('#yyt-tool-dialog-overlay');
    
    const closeDialog = () => $overlay.remove();
    
    $overlay.find('#yyt-tool-dialog-close, #yyt-tool-dialog-cancel').on('click', closeDialog);
    $overlay.on('click', function(e) { if (e.target === this) closeDialog(); });
    
    $overlay.find('#yyt-tool-dialog-save').on('click', () => {
      const name = $('#yyt-tool-name').val().trim();
      const category = $('#yyt-tool-category').val();
      const desc = $('#yyt-tool-desc').val().trim();
      const timeout = parseInt($('#yyt-tool-timeout').val()) || 60000;
      const retries = parseInt($('#yyt-tool-retries').val()) || 3;
      
      if (!name) {
        showToast('warning', '请输入工具名称');
        return;
      }
      
      const id = toolId || `tool_${Date.now()}`;
      saveTool(id, {
        name,
        category,
        description: desc,
        config: {
          trigger: { type: 'manual', events: [] },
          execution: { timeout, retries },
          api: { preset: '', useBypass: true, bypassPreset: 'standard' },
          messages: [],
          context: { depth: 3, includeTags: [], excludeTags: [] }
        },
        enabled: true
      });
      
      closeDialog();
      this.renderTo($container);
      showToast('success', isEdit ? '工具已更新' : '工具已创建');
      eventBus.emit(isEdit ? EVENTS.TOOL_UPDATED : EVENTS.TOOL_REGISTERED, { toolId: id });
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
      /* 工具管理面板样式 */
      .yyt-tool-manager {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 300px;
        overflow-y: auto;
      }
      
      .yyt-tool-item {
        padding: 14px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-tool-item:hover {
        border-color: rgba(255, 255, 255, 0.15);
      }
      
      .yyt-tool-item.yyt-disabled {
        opacity: 0.5;
      }
      
      .yyt-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      
      .yyt-tool-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .yyt-tool-name {
        font-weight: 600;
        font-size: 14px;
        color: var(--yyt-text);
      }
      
      .yyt-tool-category {
        font-size: 11px;
        padding: 2px 8px;
        background: rgba(123, 183, 255, 0.1);
        border-radius: 4px;
        color: var(--yyt-accent);
      }
      
      .yyt-tool-desc {
        font-size: 12px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 200px;
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

export default ToolManagePanel;