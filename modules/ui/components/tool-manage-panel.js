/**
 * YouYou Toolkit - 工具管理面板组件
 * @description 提供工具管理的UI
 * @version 1.0.0
 */

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
    
    return `
      <div class="yyt-tool-manager">
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
    
    this._bindToolEvents($container, $);
    this._bindFileEvents($container, $);
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
          api: { preset: '' },
          messages: [],
          context: { depth: 3, includeTags: [], excludeTags: [] }
        },
        enabled: true
      });
      
      closeDialog();
      this.renderTo($container);
      showToast('success', isEdit ? '工具已更新' : '工具已创建');
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