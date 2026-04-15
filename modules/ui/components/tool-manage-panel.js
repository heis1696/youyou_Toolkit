/**
 * YouYou Toolkit - 工具管理面板组件
 * @description 提供工具管理的UI
 * @version 1.0.0
 */

import {
  SCRIPT_ID,
  destroyEnhancedCustomSelects,
  enhanceNativeSelects,
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

import { ensureToolRuntimeConfig } from '../../tool-registry.js';

// ============================================================
// 组件定义
// ============================================================

export const ToolManagePanel = {
  id: 'toolManagePanel',

  _getToolkitWindow() {
    try {
      if (typeof window.parent !== 'undefined' && window.parent && window.parent !== window) {
        return window.parent;
      }
    } catch (error) {
      // ignore cross window access issues
    }
    return window;
  },

  _openToolConfig(toolId) {
    if (!toolId) return;

    const hostWindow = this._getToolkitWindow();
    const toolkit = hostWindow?.YouYouToolkit || window.YouYouToolkit;
    if (!toolkit) {
      showToast('warning', '未找到工具箱实例，无法跳转到工具配置');
      return;
    }

    toolkit.switchMainTab('tools');
    toolkit.switchSubTab('tools', toolId);
  },
  
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
    const toolEntries = Object.entries(tools);
    const enabledCount = toolEntries.filter(([, tool]) => tool?.enabled !== false).length;
    
    return `
      <div class="yyt-tool-manager">
        <div class="yyt-tool-manage-hero yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            <span>工具工作区</span>
          </div>
          <div class="yyt-tool-manage-hero-grid">
            <div class="yyt-tool-manage-copy">
              <div class="yyt-tool-manage-lead">在这里集中创建、整理和维护自定义工具。</div>
              <div class="yyt-tool-manage-hint">
                新建工具后会自动出现在上方“工具”页签里，可继续配置模板、提取规则、API 预设，并支持手动执行与测试提取。
              </div>
            </div>
            <div class="yyt-tool-manage-stats">
              <div class="yyt-tool-manage-stat">
                <span class="yyt-tool-manage-stat-label">工具总数</span>
                <strong class="yyt-tool-manage-stat-value">${toolEntries.length}</strong>
              </div>
              <div class="yyt-tool-manage-stat">
                <span class="yyt-tool-manage-stat-label">已启用</span>
                <strong class="yyt-tool-manage-stat-value">${enabledCount}</strong>
              </div>
            </div>
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
   * 渲染工具列表
   * @private
   */
  _renderToolList(tools) {
    const entries = Object.entries(tools);
    if (!entries.length) {
      return `
        <div class="yyt-empty-state-small">
          <i class="fa-solid fa-toolbox"></i>
          <span>还没有自定义工具，点击右上角“新建工具”开始创建</span>
        </div>
      `;
    }

    return entries.map(([id, tool]) => `
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
        <div class="yyt-tool-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="config">
            <i class="fa-solid fa-sliders"></i> 配置
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="edit">
            <i class="fa-solid fa-pen"></i> 编辑
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-danger" data-action="delete">
            <i class="fa-solid fa-trash"></i> 删除
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

    $container.off('.yytToolManage');

    this._bindToolEvents($container, $);
    this._bindFileEvents($container, $);
  },
  
  /**
   * 绑定工具事件
   * @private
   */
  _bindToolEvents($container, $) {
    // 工具启用/禁用
    $container.on('change.yytToolManage', '.yyt-tool-toggle input', (e) => {
      const $item = $(e.currentTarget).closest('.yyt-tool-item');
      const toolId = $item.data('tool-id');
      const enabled = $(e.currentTarget).is(':checked');
      
      setToolEnabled(toolId, enabled);
      $item.toggleClass('yyt-enabled', enabled).toggleClass('yyt-disabled', !enabled);
      showToast('info', enabled ? '工具已启用' : '工具已禁用');
    });
    
    // 新建工具
    $container.on('click.yytToolManage', '#yyt-add-tool', () => {
      this._showToolEditDialog($container, $, null);
    });

    $container.on('click.yytToolManage', '.yyt-tool-item [data-action="config"]', (e) => {
      const toolId = $(e.currentTarget).closest('.yyt-tool-item').data('tool-id');
      this._openToolConfig(toolId);
    });

    $container.on('click.yytToolManage', '.yyt-tool-item [data-action="edit"]', (e) => {
      const toolId = $(e.currentTarget).closest('.yyt-tool-item').data('tool-id');
      this._showToolEditDialog($container, $, toolId);
    });

    $container.on('click.yytToolManage', '.yyt-tool-item [data-action="delete"]', (e) => {
      const toolId = $(e.currentTarget).closest('.yyt-tool-item').data('tool-id');
      const tool = getTool(toolId);
      if (!toolId || !tool) return;

      if (!confirm(`确定要删除工具“${tool.name}”吗？`)) {
        return;
      }

      const success = deleteTool(toolId);
      if (!success) {
        showToast('error', '删除失败');
        return;
      }

      this.renderTo($container);
      showToast('success', '工具已删除');
    });
  },
  
  /**
   * 绑定文件事件
   * @private
   */
  _bindFileEvents($container, $) {
    // 导入工具
    $container.on('click.yytToolManage', '#yyt-import-tools', () => {
      $container.find('#yyt-import-tools-file').click();
    });

    $container.on('change.yytToolManage', '#yyt-import-tools-file', async (e) => {
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
    $container.on('click.yytToolManage', '#yyt-export-tools', () => {
      try {
        const json = exportTools();
        downloadJson(json, `youyou_toolkit_tools_${Date.now()}.json`);
        showToast('success', '工具已导出');
      } catch (e) {
        showToast('error', `导出失败: ${e.message}`);
      }
    });
    
    // 重置工具
    $container.on('click.yytToolManage', '#yyt-reset-tools', () => {
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

    enhanceNativeSelects($overlay, {
      namespace: 'yytToolManageDialogSelect',
      selectors: ['#yyt-tool-category']
    });

    const closeDialog = () => {
      destroyEnhancedCustomSelects($overlay, 'yytToolManageDialogSelect');
      $overlay.remove();
    };
    
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
      const saveSuccess = saveTool(id, {
        name,
        category,
        description: desc,
        promptTemplate: tool?.promptTemplate || '',
        extractTags: Array.isArray(tool?.extractTags) ? tool.extractTags : [],
        config: {
          execution: { timeout, retries },
          api: tool?.config?.api || { preset: '', useBypass: false, bypassPreset: '' },
          messages: Array.isArray(tool?.config?.messages) ? tool.config.messages : [],
          context: {
            depth: tool?.config?.context?.depth || 3,
            includeTags: Array.isArray(tool?.config?.context?.includeTags) ? tool.config.context.includeTags : [],
            excludeTags: Array.isArray(tool?.config?.context?.excludeTags) ? tool.config.context.excludeTags : []
          },
          worldbooks: {
            enabled: tool?.config?.worldbooks?.enabled === true,
            selected: Array.isArray(tool?.config?.worldbooks?.selected) ? tool.config.worldbooks.selected : []
          }
        },
        enabled: tool?.enabled !== false
      });

      if (!saveSuccess) {
        showToast('error', isEdit ? '工具更新失败' : '工具创建失败');
        return;
      }

      ensureToolRuntimeConfig(id);
      
      closeDialog();
      this.renderTo($container);
      showToast('success', isEdit ? '工具已更新' : '工具已创建');

      if (!isEdit) {
        this._openToolConfig(id);
      }
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

    destroyEnhancedCustomSelects($('#yyt-tool-dialog-overlay'), 'yytToolManageDialogSelect');
    $container.off('.yytToolManage');
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
        gap: 16px;
        min-height: 100%;
      }

      .yyt-tool-manage-hero {
        position: relative;
        overflow: hidden;
        gap: 16px;
        border-radius: 26px;
        background:
          radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.16), transparent 62%),
          linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%);
      }

      .yyt-tool-manage-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 16px;
        align-items: stretch;
      }

      .yyt-tool-manage-copy {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .yyt-tool-manage-lead {
        font-size: 24px;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.2px;
        color: var(--yyt-text);
      }

      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-height: 0;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-tool-manage-hint {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.75;
        max-width: 64ch;
      }

      .yyt-tool-manage-stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(150px, 1fr));
        gap: 12px;
      }

      .yyt-tool-manage-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 16px;
        border-radius: 20px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%),
          rgba(5, 10, 18, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.12);
        min-width: 150px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      }

      .yyt-tool-manage-stat-label {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.58);
        text-transform: uppercase;
        letter-spacing: 0.48px;
      }

      .yyt-tool-manage-stat-value {
        font-size: 28px;
        font-weight: 900;
        color: var(--yyt-text);
        line-height: 1;
      }

      .yyt-tool-item {
        position: relative;
        overflow: hidden;
        padding: 18px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
          rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 22px;
        transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 32px rgba(0, 0, 0, 0.12);
      }

      .yyt-tool-item::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(255, 255, 255, 0.05) 0%, transparent 40%, transparent 70%, rgba(255, 255, 255, 0.02) 100%);
        pointer-events: none;
      }

      .yyt-tool-item:hover {
        border-color: rgba(123, 183, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 36px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(123, 183, 255, 0.06);
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%),
          rgba(255, 255, 255, 0.012);
      }

      .yyt-tool-item.yyt-disabled {
        opacity: 0.6;
        filter: saturate(0.8);
      }

      .yyt-tool-item.yyt-enabled {
        border-color: rgba(74, 222, 128, 0.16);
      }

      .yyt-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
        gap: 14px;
      }

      .yyt-tool-info {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex-wrap: wrap;
      }

      .yyt-tool-name {
        font-weight: 900;
        font-size: 17px;
        color: var(--yyt-text);
      }

      .yyt-tool-category {
        font-size: 10px;
        padding: 5px 10px;
        background: rgba(123, 183, 255, 0.14);
        border-radius: 999px;
        color: var(--yyt-accent-strong);
        border: 1px solid rgba(123, 183, 255, 0.2);
        text-transform: uppercase;
        letter-spacing: 0.45px;
        font-weight: 800;
      }

      .yyt-tool-desc {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.74);
        margin-bottom: 16px;
        line-height: 1.75;
      }

      .yyt-tool-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .yyt-tool-actions .yyt-btn-secondary {
        background: rgba(255, 255, 255, 0.07);
      }

      .yyt-tool-actions .yyt-btn-danger {
        margin-left: auto;
      }

      .yyt-tool-controls {
        flex-shrink: 0;
        padding-top: 2px;
      }

      .yyt-dialog-wide {
        width: 480px;
      }

      @media screen and (max-width: 768px) {
        .yyt-tool-manage-hero-grid {
          grid-template-columns: 1fr;
        }

        .yyt-tool-manage-stats {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .yyt-tool-header {
          align-items: flex-start;
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

export default ToolManagePanel;