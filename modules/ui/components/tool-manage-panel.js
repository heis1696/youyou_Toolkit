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
  readFileContent,
  showConfirm
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

  _removeDialog($container) {
    if (!$container?.length) {
      return;
    }

    const $overlay = $container.find('#yyt-tool-dialog-overlay');
    destroyEnhancedCustomSelects($overlay, 'yytToolManageDialogSelect');
    $overlay.remove();
  },

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
      <div class=”yyt-tool-manager”>
        <!-- Stats -->
        <div class=”yyt-flow-section”>
          <div class=”yyt-stat-row” style=”grid-template-columns: 1fr 1fr;”>
            <div class=”yyt-stat-cell”>
              <div class=”yyt-stat-label”>工具总数</div>
              <div class=”yyt-stat-value”>${toolEntries.length}</div>
            </div>
            <div class=”yyt-stat-cell”>
              <div class=”yyt-stat-label”>已启用</div>
              <div class=”yyt-stat-value” style=”color: var(--yyt-success);”>${enabledCount}</div>
            </div>
          </div>
        </div>

        <!-- 工具列表 -->
        <div class=”yyt-flow-section”>
          <div class=”yyt-flow-heading”>
            <span class=”yyt-flow-heading-icon”><i class=”fa-solid fa-tools”></i></span>
            工具列表
            <span class=”yyt-flow-heading-action”>
              <button class=”yyt-btn yyt-btn-small yyt-btn-primary” id=”yyt-add-tool”>
                <i class=”fa-solid fa-plus”></i> 新建工具
              </button>
            </span>
          </div>
          <div class=”yyt-tool-list”>
            ${this._renderToolList(tools)}
          </div>
        </div>

        <!-- 底部操作 -->
        <div class=”yyt-panel-footer”>
          <div class=”yyt-footer-left”>
            <button class=”yyt-btn yyt-btn-secondary” id=”yyt-import-tools”>
              <i class=”fa-solid fa-file-import”></i> 导入
            </button>
            <button class=”yyt-btn yyt-btn-secondary” id=”yyt-export-tools”>
              <i class=”fa-solid fa-file-export”></i> 导出
            </button>
            <input type=”file” id=”yyt-import-tools-file” accept=”.json” style=”display:none”>
          </div>
          <div class=”yyt-footer-right”>
            <button class=”yyt-btn yyt-btn-secondary” id=”yyt-reset-tools”>
              <i class=”fa-solid fa-undo”></i> 重置
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
        <div class=”yyt-empty-state-small”>
          <i class=”fa-solid fa-toolbox”></i>
          <span>还没有自定义工具，点击右上角”新建工具”开始创建</span>
        </div>
      `;
    }

    const rows = entries.map(([id, tool]) => `
      <div class=”yyt-list-row ${tool.enabled ? 'yyt-tool-item-enabled' : 'yyt-tool-item-disabled'}” data-tool-id=”${id}”>
        <div class=”yyt-list-row-icon” style=”background: var(--yyt-accent-soft); color: var(--yyt-accent);”>
          <i class=”fa-solid fa-wrench”></i>
        </div>
        <div class=”yyt-list-row-main”>
          <div class=”yyt-list-row-name”>
            ${escapeHtml(tool.name)}
            <span class=”yyt-badge” style=”background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;”>${escapeHtml(tool.category)}</span>
          </div>
          <div class=”yyt-list-row-desc”>${escapeHtml(tool.description)}</div>
        </div>
        <span class=”yyt-status-dot ${tool.enabled ? 'yyt-status-dot-on' : 'yyt-status-dot-off'}”></span>
        <label class=”yyt-toggle yyt-small yyt-tool-toggle”>
          <input type=”checkbox” ${tool.enabled ? 'checked' : ''}>
          <span class=”yyt-toggle-slider”></span>
        </label>
        <div class=”yyt-list-row-actions”>
          <button class=”yyt-btn yyt-btn-small yyt-btn-secondary” data-action=”config”>
            <i class=”fa-solid fa-sliders”></i>
          </button>
          <button class=”yyt-btn yyt-btn-small yyt-btn-secondary” data-action=”edit”>
            <i class=”fa-solid fa-pen”></i>
          </button>
          <button class=”yyt-btn yyt-btn-small yyt-btn-danger” data-action=”delete”>
            <i class=”fa-solid fa-trash”></i>
          </button>
        </div>
      </div>
    `).join('');

    return `<div class=”yyt-list-table”>${rows}</div>`;
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
      const $item = $(e.currentTarget).closest('.yyt-list-row');
      const toolId = $item.data('tool-id');
      const enabled = $(e.currentTarget).is(':checked');

      setToolEnabled(toolId, enabled);
      $item.toggleClass('yyt-tool-item-enabled', enabled).toggleClass('yyt-tool-item-disabled', !enabled);
      $item.find('.yyt-status-dot').toggleClass('yyt-status-dot-on', enabled).toggleClass('yyt-status-dot-off', !enabled);
      showToast('info', enabled ? '工具已启用' : '工具已禁用');
    });

    // 新建工具
    $container.on('click.yytToolManage', '#yyt-add-tool', () => {
      this._showToolEditDialog($container, $, null);
    });

    $container.on('click.yytToolManage', '.yyt-list-row [data-action=”config”]', (e) => {
      const toolId = $(e.currentTarget).closest('.yyt-list-row').data('tool-id');
      this._openToolConfig(toolId);
    });

    $container.on('click.yytToolManage', '.yyt-list-row [data-action=”edit”]', (e) => {
      const toolId = $(e.currentTarget).closest('.yyt-list-row').data('tool-id');
      this._showToolEditDialog($container, $, toolId);
    });

    $container.on('click.yytToolManage', '.yyt-list-row [data-action=”delete”]', async (e) => {
      const toolId = $(e.currentTarget).closest('.yyt-list-row').data('tool-id');
      const tool = getTool(toolId);
      if (!toolId || !tool) return;

      if (!await showConfirm('删除工具', `确定要删除工具”${tool.name}”吗？`, { danger: true })) {
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
    $container.on('click.yytToolManage', '#yyt-reset-tools', async () => {
      if (await showConfirm('重置工具', '确定要重置所有工具吗？', { danger: true })) {
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

    this._removeDialog($container);
    $container.append(dialogHtml);

    const $overlay = $container.find('#yyt-tool-dialog-overlay');
    const $nameInput = $overlay.find('#yyt-tool-name');
    const $categorySelect = $overlay.find('#yyt-tool-category');
    const $descInput = $overlay.find('#yyt-tool-desc');
    const $timeoutInput = $overlay.find('#yyt-tool-timeout');
    const $retriesInput = $overlay.find('#yyt-tool-retries');

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
      const name = $nameInput.val().trim();
      const category = $categorySelect.val();
      const desc = $descInput.val().trim();
      const timeout = parseInt($timeoutInput.val()) || 60000;
      const retries = parseInt($retriesInput.val()) || 3;
      
      if (!name) {
        showToast('warning', '请输入工具名称');
        $nameInput.trigger('focus').trigger('select');
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

    this._removeDialog($container);
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
        gap: 0;
        min-height: 100%;
      }

      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-height: 0;
        overflow-y: auto;
      }

      .yyt-tool-item-disabled {
        opacity: 0.6;
        filter: saturate(0.8);
      }

      @media screen and (max-width: 768px) {
        .yyt-list-row {
          flex-wrap: wrap;
        }
        .yyt-list-row-actions {
          width: 100%;
          justify-content: flex-end;
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