/**
 * YouYou Toolkit - 破限词面板组件
 * @description 提供破限词预设管理的UI（紧凑列表版）
 * @version 3.0.0
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
  setCurrentBypassPreset
} from '../../bypass-prompts.js';

// ============================================================
// 组件定义
// ============================================================

export const BypassPanel = {
  id: 'bypassPanel',
  
  // 当前编辑的预设ID
  _currentEditId: null,
  
  // 当前展开的消息索引
  _expandedIndex: null,
  
  // 左侧面板宽度
  _sidebarWidth: 240,
  
  // 拖拽状态
  _isDragging: false,
  _dragStartX: 0,
  _dragStartWidth: 0,
  
  // 消息拖拽状态
  _messageDragState: null,
  
  // 批量选择状态
  _selectedMessages: new Set(),
  _isMultiSelectMode: false,
  
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
    const editId = this._currentEditId || currentBypassId;
    const editPreset = getBypassPreset(editId);
    
    return `
      <div class="yyt-bypass-panel-v3" data-sidebar-width="${this._sidebarWidth}">
        <!-- 左侧：预设列表 -->
        <div class="yyt-bypass-sidebar-v3" style="width: ${this._sidebarWidth}px;">
          <div class="yyt-sidebar-header-v3">
            <span class="yyt-sidebar-title-v3">预设列表</span>
            <button class="yyt-icon-btn yyt-add-preset-btn" id="${SCRIPT_ID}-add-bypass" title="新建预设">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="yyt-preset-list-v3">
            ${this._renderPresetList(bypassPresets, currentBypassId, editId)}
          </div>
          <!-- 预设元信息编辑区 -->
          <div class="yyt-preset-meta-editor" id="${SCRIPT_ID}-preset-meta">
            ${editPreset ? this._renderPresetMetaEditor(editPreset) : ''}
          </div>
        </div>
        
        <!-- 分割线（可拖拽调整宽度） -->
        <div class="yyt-panel-resizer" id="${SCRIPT_ID}-panel-resizer">
          <div class="yyt-resizer-handle"></div>
        </div>
        
        <!-- 右侧：消息链编辑器 -->
        <div class="yyt-bypass-editor-v3">
          ${this._renderEditorHeader(editPreset)}
          <div class="yyt-message-list-v3" id="${SCRIPT_ID}-bypass-messages">
            ${this._renderMessageList(editPreset)}
          </div>
          <div class="yyt-add-message-bar">
            <button class="yyt-text-btn" id="${SCRIPT_ID}-bypass-add-message">
              <i class="fa-solid fa-plus"></i> 添加消息
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
   * 渲染预设列表
   * @private
   */
  _renderPresetList(presets, currentId, editId) {
    return Object.entries(presets).map(([id, preset]) => `
      <div class="yyt-preset-item-v3 ${id === currentId ? 'yyt-active' : ''} ${id === editId ? 'yyt-editing' : ''}" 
           data-preset-id="${id}">
        <div class="yyt-preset-indicator"></div>
        <div class="yyt-preset-content">
          <span class="yyt-preset-name">${escapeHtml(preset.name)}</span>
        </div>
        <div class="yyt-preset-actions">
          <button class="yyt-preset-action-btn" data-action="edit" title="编辑">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="yyt-preset-action-btn" data-action="copy" title="复制">
            <i class="fa-solid fa-copy"></i>
          </button>
          <button class="yyt-preset-action-btn yyt-danger" data-action="delete" title="删除" 
                  ${preset.isDefault ? 'disabled' : ''}>
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('') || '<div class="yyt-empty-presets">暂无预设</div>';
  },
  
  /**
   * 渲染预设元信息编辑区
   * @private
   */
  _renderPresetMetaEditor(preset) {
    return `
      <div class="yyt-meta-form">
        <div class="yyt-meta-field">
          <label>预设名称</label>
          <input type="text" class="yyt-meta-input" id="${SCRIPT_ID}-bypass-name" 
                 value="${escapeHtml(preset.name || '')}" placeholder="输入预设名称">
        </div>
        <div class="yyt-meta-field">
          <label>描述</label>
          <input type="text" class="yyt-meta-input" id="${SCRIPT_ID}-bypass-desc" 
                 value="${escapeHtml(preset.description || '')}" placeholder="可选描述">
        </div>
        <div class="yyt-meta-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${SCRIPT_ID}-bypass-reset">重置</button>
          <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="${SCRIPT_ID}-bypass-save">保存</button>
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染编辑器顶部信息栏
   * @private
   */
  _renderEditorHeader(preset) {
    const messageCount = preset?.messages?.length || 0;
    return `
      <div class="yyt-editor-header-v3">
        <div class="yyt-editor-info">
          <span class="yyt-editor-preset-name">${preset ? escapeHtml(preset.name) : '未选择预设'}</span>
          <span class="yyt-editor-message-count">${messageCount} 条消息</span>
        </div>
        <div class="yyt-editor-actions-v3">
          <button class="yyt-text-btn" id="${SCRIPT_ID}-bypass-sort" title="排序 & 注入">
            <i class="fa-solid fa-sort"></i> 排序 & 注入
          </button>
          <button class="yyt-text-btn" id="${SCRIPT_ID}-bypass-import">
            <i class="fa-solid fa-file-import"></i> 导入
          </button>
          <button class="yyt-text-btn" id="${SCRIPT_ID}-bypass-export">
            <i class="fa-solid fa-file-export"></i> 导出
          </button>
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染消息列表（紧凑样式）
   * @private
   */
  _renderMessageList(preset) {
    const messages = preset?.messages || [];
    
    if (messages.length === 0) {
      return `
        <div class="yyt-empty-messages-v3">
          <i class="fa-regular fa-comment-dots"></i>
          <span>还没有消息，点击下方添加</span>
          <button class="yyt-text-btn yyt-add-first-message" id="${SCRIPT_ID}-bypass-add-first">
            <i class="fa-solid fa-plus"></i> 添加第一条消息
          </button>
        </div>
      `;
    }
    
    return `
      <div class="yyt-message-rows">
        ${messages.map((msg, index) => this._renderMessageRow(msg, index)).join('')}
      </div>
    `;
  },
  
  /**
   * 渲染单条消息行（紧凑样式）
   * @private
   */
  _renderMessageRow(message, index) {
    const role = (message.role || 'USER').toUpperCase();
    const roleConfig = this._getRoleConfig(role);
    const isExpanded = this._expandedIndex === index;
    const content = message.content || '';
    const preview = this._getContentPreview(content);
    const hasVariables = this._hasVariables(content);
    const isEnabled = message.enabled !== false;
    const title = message.title || '';
    
    return `
      <div class="yyt-message-row ${isExpanded ? 'yyt-expanded' : ''} ${!isEnabled ? 'yyt-disabled' : ''}" 
           data-index="${index}" data-role="${role}">
        <!-- 拖拽手柄 -->
        <div class="yyt-message-drag-handle" data-action="drag">
          <i class="fa-solid fa-grip-vertical"></i>
        </div>
        
        <!-- 角色标签 -->
        <div class="yyt-message-role" style="color: ${roleConfig.color};">${role}</div>
        
        <!-- 消息内容区 -->
        <div class="yyt-message-body" data-action="expand">
          <div class="yyt-message-title-row">
            ${title ? `<span class="yyt-message-title">${escapeHtml(title)}</span>` : ''}
            ${hasVariables ? '<span class="yyt-message-tag yyt-tag-variable">宏变量</span>' : ''}
            ${!isEnabled ? '<span class="yyt-message-tag yyt-tag-disabled">已禁用</span>' : ''}
          </div>
          <div class="yyt-message-preview">${this._highlightVariables(preview)}</div>
        </div>
        
        <!-- 操作区 -->
        <div class="yyt-message-actions">
          <label class="yyt-toggle-switch">
            <input type="checkbox" ${isEnabled ? 'checked' : ''} data-action="toggle">
            <span class="yyt-toggle-slider"></span>
          </label>
          <div class="yyt-message-action-btns">
            <button class="yyt-row-action-btn" data-action="move-up" title="上移" ${index === 0 ? 'disabled' : ''}>
              <i class="fa-solid fa-chevron-up"></i>
            </button>
            <button class="yyt-row-action-btn" data-action="move-down" title="下移">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            <button class="yyt-row-action-btn yyt-danger" data-action="delete" title="删除">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        
        <!-- 展开编辑区 -->
        ${isExpanded ? this._renderExpandedEditor(message, index) : ''}
      </div>
    `;
  },
  
  /**
   * 渲染展开的编辑区
   * @private
   */
  _renderExpandedEditor(message, index) {
    const role = (message.role || 'USER').toUpperCase();
    const content = message.content || '';
    const title = message.title || '';
    const charCount = content.length;
    
    return `
      <div class="yyt-expanded-editor">
        <div class="yyt-editor-row">
          <div class="yyt-editor-field">
            <label>标题（可选）</label>
            <input type="text" class="yyt-editor-input" id="${SCRIPT_ID}-msg-title-${index}" 
                   value="${escapeHtml(title)}" placeholder="消息标题">
          </div>
          <div class="yyt-editor-field">
            <label>角色</label>
            <div class="yyt-role-segmented">
              <button class="yyt-role-btn ${role === 'SYSTEM' ? 'yyt-active' : ''}" data-role="SYSTEM">系统</button>
              <button class="yyt-role-btn ${role === 'USER' ? 'yyt-active' : ''}" data-role="USER">用户</button>
              <button class="yyt-role-btn ${role === 'ASSISTANT' ? 'yyt-active' : ''}" data-role="ASSISTANT">AI</button>
            </div>
          </div>
        </div>
        <div class="yyt-editor-content">
          <textarea class="yyt-editor-textarea" id="${SCRIPT_ID}-msg-content-${index}" 
                    placeholder="输入消息内容...">${escapeHtml(content)}</textarea>
        </div>
        <div class="yyt-editor-toolbar">
          <div class="yyt-toolbar-left">
            <button class="yyt-text-btn yyt-insert-var" data-action="insert-var">
              <i class="fa-solid fa-code"></i> 插入变量
            </button>
            <span class="yyt-char-count">${charCount} 字符</span>
          </div>
          <div class="yyt-toolbar-right">
            <button class="yyt-text-btn" data-action="collapse">
              <i class="fa-solid fa-chevron-up"></i> 收起
            </button>
          </div>
        </div>
      </div>
    `;
  },
  
  // ============================================================
  // 辅助方法
  // ============================================================
  
  /**
   * 获取角色配置
   * @private
   */
  _getRoleConfig(role) {
    const configs = {
      'SYSTEM': { color: '#7B8CA8', bg: 'rgba(123, 140, 168, 0.15)' },
      'USER': { color: '#E8913A', bg: 'rgba(232, 145, 58, 0.15)' },
      'ASSISTANT': { color: '#5CB85C', bg: 'rgba(92, 184, 92, 0.15)' }
    };
    return configs[role.toUpperCase()] || configs['USER'];
  },
  
  /**
   * 获取内容预览（截断）
   * @private
   */
  _getContentPreview(content) {
    if (!content) return '<span class="yyt-empty-preview">无内容</span>';
    const text = content.replace(/\n/g, ' ').trim();
    if (text.length <= 80) return escapeHtml(text);
    return escapeHtml(text.substring(0, 80)) + '...';
  },
  
  /**
   * 检查内容是否包含变量
   * @private
   */
  _hasVariables(content) {
    if (!content) return false;
    return /\{\{[^}]+\}\}|\$[A-Z_]+/g.test(content);
  },
  
  /**
   * 高亮显示变量
   * @private
   */
  _highlightVariables(text) {
    if (!text) return '';
    // 高亮 {{variable}} 格式
    let result = text.replace(/\{\{([^}]+)\}\}/g, '<span class="yyt-variable">{{$1}}</span>');
    // 高亮 $VARIABLE 格式
    result = result.replace(/\$([A-Z_]+)/g, '<span class="yyt-variable">$$$1</span>');
    return result;
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
    
    this._bindSidebarEvents($container, $);
    this._bindMessageEvents($container, $);
    this._bindResizerEvents($container, $);
    this._bindKeyboardEvents($container, $);
  },
  
  /**
   * 绑定侧边栏事件
   * @private
   */
  _bindSidebarEvents($container, $) {
    const self = this;
    
    // 点击预设项 - 设为当前默认预设
    $container.on('click', '.yyt-preset-item-v3', function(e) {
      if ($(e.target).closest('.yyt-preset-action-btn').length) return;
      
      const presetId = $(this).data('preset-id');
      setCurrentBypassPreset(presetId);
      
      $container.find('.yyt-preset-item-v3').removeClass('yyt-active');
      $(this).addClass('yyt-active');
      
      showToast('success', '已切换默认预设');
      eventBus.emit(EVENTS.BYPASS_PRESET_ACTIVATED, { id: presetId });
    });
    
    // 预设操作按钮
    $container.on('click', '.yyt-preset-action-btn', function(e) {
      e.stopPropagation();
      const action = $(this).data('action');
      const $item = $(this).closest('.yyt-preset-item-v3');
      const presetId = $item.data('preset-id');
      
      if (action === 'edit') {
        self._currentEditId = presetId;
        self._expandedIndex = null;
        self.renderTo($container);
      } else if (action === 'copy') {
        self._copyPreset(presetId, $container, $);
      } else if (action === 'delete') {
        self._deletePreset(presetId, $container, $);
      }
    });
    
    // 新建预设
    $container.find(`#${SCRIPT_ID}-add-bypass`).on('click', () => {
      this._createNewPreset($container, $);
    });
    
    // 保存预设
    $container.find(`#${SCRIPT_ID}-bypass-save`).on('click', () => {
      this._saveCurrentPreset($container, $);
    });
    
    // 重置预设
    $container.find(`#${SCRIPT_ID}-bypass-reset`).on('click', () => {
      this._resetEditor($container, $);
    });
  },
  
  /**
   * 绑定消息列表事件
   * @private
   */
  _bindMessageEvents($container, $) {
    const self = this;
    
    // 点击消息行 - 展开/收起
    $container.on('click', '.yyt-message-body', function(e) {
      if ($(e.target).closest('.yyt-message-tag').length) return;
      
      const $row = $(this).closest('.yyt-message-row');
      const index = $row.data('index');
      
      if (self._expandedIndex === index) {
        self._expandedIndex = null;
      } else {
        self._expandedIndex = index;
      }
      
      self._refreshMessageList($container, $);
    });
    
    // 收起按钮
    $container.on('click', '[data-action="collapse"]', function(e) {
      e.stopPropagation();
      self._expandedIndex = null;
      self._refreshMessageList($container, $);
    });
    
    // 切换启用状态
    $container.on('change', '[data-action="toggle"]', function() {
      const $row = $(this).closest('.yyt-message-row');
      const index = $row.data('index');
      self._toggleMessageEnabled(index, $container, $);
    });
    
    // 消息操作按钮
    $container.on('click', '.yyt-row-action-btn', function(e) {
      e.stopPropagation();
      const action = $(this).data('action');
      const $row = $(this).closest('.yyt-message-row');
      const index = $row.data('index');
      
      if (action === 'move-up') {
        self._moveMessage(index, -1, $container, $);
      } else if (action === 'move-down') {
        self._moveMessage(index, 1, $container, $);
      } else if (action === 'delete') {
        self._deleteMessage(index, $container, $);
      }
    });
    
    // 角色选择
    $container.on('click', '.yyt-role-btn', function(e) {
      e.stopPropagation();
      const role = $(this).data('role');
      const $editor = $(this).closest('.yyt-expanded-editor');
      const $row = $editor.closest('.yyt-message-row');
      const index = $row.data('index');
      
      $editor.find('.yyt-role-btn').removeClass('yyt-active');
      $(this).addClass('yyt-active');
      
      self._updateMessageRole(index, role, $container);
    });
    
    // 内容变化时更新字符计数
    $container.on('input', '.yyt-editor-textarea', function() {
      const content = $(this).val();
      const $count = $(this).closest('.yyt-expanded-editor').find('.yyt-char-count');
      $count.text(content.length + ' 字符');
    });
    
    // 添加消息按钮
    $container.find(`#${SCRIPT_ID}-bypass-add-message, #${SCRIPT_ID}-bypass-add-first`).on('click', () => {
      this._addMessage($container, $);
    });
    
    // 导出
    $container.find(`#${SCRIPT_ID}-bypass-export`).on('click', () => {
      this._exportPreset($container, $);
    });
    
    // 导入
    $container.find(`#${SCRIPT_ID}-bypass-import`).on('click', () => {
      this._importPreset($container, $);
    });
    
    // 消息拖拽排序
    this._bindMessageDragEvents($container, $);
  },
  
  /**
   * 绑定消息拖拽事件
   * @private
   */
  _bindMessageDragEvents($container, $) {
    const self = this;
    let draggedIndex = null;
    let $draggedRow = null;
    let $placeholder = null;
    
    $container.on('mousedown', '.yyt-message-drag-handle', function(e) {
      e.preventDefault();
      const $row = $(this).closest('.yyt-message-row');
      draggedIndex = $row.data('index');
      $draggedRow = $row;
      
      // 创建占位符
      $placeholder = $('<div class="yyt-drag-placeholder"></div>');
      $placeholder.height($row.outerHeight());
      
      // 设置拖拽样式
      $row.addClass('yyt-dragging');
      
      const startY = e.clientY;
      const rowHeight = $row.outerHeight();
      
      $(document).on('mousemove.drag', function(e) {
        const deltaY = e.clientY - startY;
        $row.css('transform', `translateY(${deltaY}px)`);
        
        // 确定目标位置
        const $rows = $container.find('.yyt-message-row').not('.yyt-dragging');
        $rows.each(function() {
          const $r = $(this);
          const offset = $r.offset();
          const height = $r.outerHeight();
          const centerY = offset.top + height / 2;
          
          if (e.clientY < centerY) {
            $placeholder.insertBefore($r);
            return false;
          } else {
            $placeholder.insertAfter($r);
          }
        });
      });
      
      $(document).on('mouseup.drag', function(e) {
        $(document).off('mousemove.drag mouseup.drag');
        
        // 获取新位置
        const $allRows = $container.find('.yyt-message-row').not('.yyt-dragging');
        let newIndex = $placeholder.index();
        
        // 移除拖拽样式
        $row.removeClass('yyt-dragging').css('transform', '');
        $placeholder.remove();
        
        // 执行移动
        if (newIndex !== draggedIndex && newIndex >= 0) {
          self._reorderMessages(draggedIndex, newIndex, $container, $);
        }
        
        draggedIndex = null;
        $draggedRow = null;
        $placeholder = null;
      });
    });
  },
  
  /**
   * 绑定分割线拖拽事件
   * @private
   */
  _bindResizerEvents($container, $) {
    const self = this;
    const $resizer = $container.find(`#${SCRIPT_ID}-panel-resizer`);
    const $sidebar = $container.find('.yyt-bypass-sidebar-v3');
    const $panel = $container.find('.yyt-bypass-panel-v3');
    
    $resizer.on('mousedown', function(e) {
      e.preventDefault();
      self._isDragging = true;
      self._dragStartX = e.clientX;
      self._dragStartWidth = self._sidebarWidth;
      
      $('body').addClass('yyt-resizing');
      
      $(document).on('mousemove.resize', function(e) {
        const deltaX = e.clientX - self._dragStartX;
        let newWidth = self._dragStartWidth + deltaX;
        
        // 限制宽度范围
        newWidth = Math.max(200, Math.min(360, newWidth));
        self._sidebarWidth = newWidth;
        
        $sidebar.css('width', newWidth);
        $panel.attr('data-sidebar-width', newWidth);
      });
      
      $(document).on('mouseup.resize', function() {
        $(document).off('mousemove.resize mouseup.resize');
        $('body').removeClass('yyt-resizing');
        self._isDragging = false;
      });
    });
  },
  
  /**
   * 绑定键盘快捷键
   * @private
   */
  _bindKeyboardEvents($container, $) {
    const self = this;
    
    $container.on('keydown', '.yyt-editor-textarea', function(e) {
      // Ctrl+Enter: 收起当前编辑，跳到下一条
      if (e.ctrlKey && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        self._saveAndMoveToNext($container, $);
      }
      
      // Ctrl+Shift+Enter: 收起并在下方插入新消息
      if (e.ctrlKey && e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        self._saveAndInsertBelow($container, $);
      }
    });
    
    // Delete键删除选中消息
    $container.on('keydown', function(e) {
      if (e.key === 'Delete' && self._expandedIndex !== null) {
        // 仅在没有焦点在输入框时触发
        if (!$(e.target).is('input, textarea, select')) {
          e.preventDefault();
          self._deleteMessage(self._expandedIndex, $container, $);
        }
      }
    });
  },
  
  // ============================================================
  // 操作方法
  // ============================================================
  
  /**
   * 创建新预设
   * @private
   */
  _createNewPreset($container, $) {
    const newId = `custom_${Date.now()}`;
    
    saveBypassPreset(newId, {
      name: '新预设',
      description: '',
      messages: [{ role: 'USER', content: '', title: '', enabled: true, deletable: true }]
    });
    
    this._currentEditId = newId;
    this._expandedIndex = 0;
    this.renderTo($container);
    showToast('success', '已创建新预设');
  },
  
  /**
   * 复制预设
   * @private
   */
  _copyPreset(presetId, $container, $) {
    const preset = getBypassPreset(presetId);
    if (!preset) return;
    
    const newId = `copy_${Date.now()}`;
    saveBypassPreset(newId, {
      ...preset,
      name: preset.name + ' (副本)',
      isDefault: false
    });
    
    this._currentEditId = newId;
    this.renderTo($container);
    showToast('success', '已复制预设');
  },
  
  /**
   * 删除预设
   * @private
   */
  _deletePreset(presetId, $container, $) {
    const preset = getBypassPreset(presetId);
    
    if (preset?.isDefault) {
      showToast('warning', '默认预设不可删除');
      return;
    }
    
    if (confirm(`确定要删除预设 "${preset?.name}" 吗？`)) {
      deleteBypassPreset(presetId);
      
      if (this._currentEditId === presetId) {
        this._currentEditId = getCurrentBypassPresetId();
      }
      
      this.renderTo($container);
      showToast('success', '预设已删除');
      eventBus.emit(EVENTS.BYPASS_PRESET_DELETED, { id: presetId });
    }
  },
  
  /**
   * 保存当前预设
   * @private
   */
  _saveCurrentPreset($container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    
    const name = $container.find(`#${SCRIPT_ID}-bypass-name`).val()?.trim();
    const desc = $container.find(`#${SCRIPT_ID}-bypass-desc`).val()?.trim();
    
    if (!name) {
      showToast('warning', '请输入预设名称');
      return;
    }
    
    // 收集消息
    const messages = this._collectMessages($container, $);
    
    if (messages.length === 0) {
      showToast('warning', '请至少添加一条消息');
      return;
    }
    
    saveBypassPreset(presetId, { name, description: desc, messages });
    
    // 刷新UI
    this._refreshPresetList($container, $);
    this._refreshEditorHeader($container, $);
    
    showToast('success', '预设已保存');
    eventBus.emit(EVENTS.BYPASS_PRESET_UPDATED, { id: presetId });
  },
  
  /**
   * 收集消息数据
   * @private
   */
  _collectMessages($container, $) {
    const messages = [];
    
    $container.find('.yyt-message-row').each(function() {
      const $row = $(this);
      const index = $row.data('index');
      const role = $row.data('role');
      const $titleInput = $row.find(`#${SCRIPT_ID}-msg-title-${index}`);
      const $contentInput = $row.find(`#${SCRIPT_ID}-msg-content-${index}`);
      
      const title = $titleInput.val()?.trim() || '';
      const content = $contentInput?.val()?.trim() || '';
      const enabled = $row.find('[data-action="toggle"]').is(':checked');
      
      if (content) {
        messages.push({ role, content, title, enabled, deletable: true });
      }
    });
    
    return messages;
  },
  
  /**
   * 重置编辑器
   * @private
   */
  _resetEditor($container, $) {
    this._expandedIndex = null;
    this.renderTo($container);
    showToast('info', '已重置');
  },
  
  /**
   * 添加消息
   * @private
   */
  _addMessage($container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    if (!preset) {
      showToast('warning', '请先选择预设');
      return;
    }
    
    const messages = [...(preset.messages || [])];
    messages.push({ role: 'USER', content: '', title: '', enabled: true, deletable: true });
    
    saveBypassPreset(presetId, { ...preset, messages });
    
    this._expandedIndex = messages.length - 1;
    this._refreshMessageList($container, $);
    this._refreshEditorHeader($container, $);
    
    // 滚动到底部
    setTimeout(() => {
      const $list = $container.find('.yyt-message-list-v3');
      $list.scrollTop($list[0].scrollHeight);
    }, 100);
  },
  
  /**
   * 删除消息
   * @private
   */
  _deleteMessage(index, $container, $) {
    if (!confirm('确定要删除这条消息吗？')) return;
    
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    if (!preset) return;
    
    const messages = [...(preset.messages || [])];
    messages.splice(index, 1);
    
    saveBypassPreset(presetId, { ...preset, messages });
    
    if (this._expandedIndex === index) {
      this._expandedIndex = null;
    } else if (this._expandedIndex > index) {
      this._expandedIndex--;
    }
    
    this._refreshMessageList($container, $);
    this._refreshEditorHeader($container, $);
    showToast('success', '消息已删除');
  },
  
  /**
   * 移动消息
   * @private
   */
  _moveMessage(index, direction, $container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    if (!preset) return;
    
    const messages = [...(preset.messages || [])];
    const newIndex = index + direction;
    
    if (newIndex < 0 || newIndex >= messages.length) return;
    
    [messages[index], messages[newIndex]] = [messages[newIndex], messages[index]];
    
    saveBypassPreset(presetId, { ...preset, messages });
    
    if (this._expandedIndex === index) {
      this._expandedIndex = newIndex;
    } else if (this._expandedIndex === newIndex) {
      this._expandedIndex = index;
    }
    
    this._refreshMessageList($container, $);
  },
  
  /**
   * 重新排序消息
   * @private
   */
  _reorderMessages(oldIndex, newIndex, $container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    if (!preset) return;
    
    const messages = [...(preset.messages || [])];
    const [removed] = messages.splice(oldIndex, 1);
    messages.splice(newIndex, 0, removed);
    
    saveBypassPreset(presetId, { ...preset, messages });
    
    // 更新展开索引
    if (this._expandedIndex === oldIndex) {
      this._expandedIndex = newIndex;
    } else if (oldIndex < this._expandedIndex && newIndex >= this._expandedIndex) {
      this._expandedIndex--;
    } else if (oldIndex > this._expandedIndex && newIndex <= this._expandedIndex) {
      this._expandedIndex++;
    }
    
    this._refreshMessageList($container, $);
  },
  
  /**
   * 切换消息启用状态
   * @private
   */
  _toggleMessageEnabled(index, $container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    if (!preset) return;
    
    const messages = [...(preset.messages || [])];
    messages[index] = {
      ...messages[index],
      enabled: messages[index].enabled === false ? true : false
    };
    
    saveBypassPreset(presetId, { ...preset, messages });
    
    // 更新UI
    const $row = $container.find(`.yyt-message-row[data-index="${index}"]`);
    $row.toggleClass('yyt-disabled', !messages[index].enabled);
  },
  
  /**
   * 更新消息角色
   * @private
   */
  _updateMessageRole(index, role, $container) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    if (!preset) return;
    
    const messages = [...(preset.messages || [])];
    messages[index] = { ...messages[index], role };
    
    saveBypassPreset(presetId, { ...preset, messages });
    
    // 更新行属性
    const $row = $container.find(`.yyt-message-row[data-index="${index}"]`);
    $row.attr('data-role', role);
    $row.find('.yyt-message-role').text(role).css('color', this._getRoleConfig(role).color);
  },
  
  /**
   * 保存并移动到下一条
   * @private
   */
  _saveAndMoveToNext($container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    // 保存当前编辑的消息
    this._saveCurrentExpandedMessage($container, $);
    
    const messages = preset?.messages || [];
    const nextIndex = (this._expandedIndex || 0) + 1;
    
    if (nextIndex < messages.length) {
      this._expandedIndex = nextIndex;
    } else {
      this._expandedIndex = null;
    }
    
    this._refreshMessageList($container, $);
  },
  
  /**
   * 保存并在下方插入新消息
   * @private
   */
  _saveAndInsertBelow($container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    if (!preset) return;
    
    // 保存当前编辑的消息
    this._saveCurrentExpandedMessage($container, $);
    
    const messages = [...(preset.messages || [])];
    const insertIndex = (this._expandedIndex || 0) + 1;
    
    messages.splice(insertIndex, 0, { role: 'USER', content: '', title: '', enabled: true, deletable: true });
    
    saveBypassPreset(presetId, { ...preset, messages });
    
    this._expandedIndex = insertIndex;
    this._refreshMessageList($container, $);
    this._refreshEditorHeader($container, $);
  },
  
  /**
   * 保存当前展开的消息
   * @private
   */
  _saveCurrentExpandedMessage($container, $) {
    if (this._expandedIndex === null) return;
    
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    if (!preset) return;
    
    const index = this._expandedIndex;
    const $row = $container.find(`.yyt-message-row[data-index="${index}"]`);
    
    const title = $row.find('.yyt-editor-input').val()?.trim() || '';
    const content = $row.find('.yyt-editor-textarea').val()?.trim() || '';
    const role = $row.find('.yyt-role-btn.yyt-active').data('role');
    
    const messages = [...(preset.messages || [])];
    messages[index] = { ...messages[index], role, content, title };
    
    saveBypassPreset(presetId, { ...preset, messages });
  },
  
  /**
   * 导出预设
   * @private
   */
  _exportPreset($container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    if (!preset) {
      showToast('warning', '没有可导出的预设');
      return;
    }
    
    const json = JSON.stringify(preset, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${preset.name || 'preset'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('success', '预设已导出');
  },
  
  /**
   * 导入预设
   * @private
   */
  _importPreset($container, $) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const preset = JSON.parse(event.target.result);
          const newId = `import_${Date.now()}`;
          
          saveBypassPreset(newId, {
            ...preset,
            name: preset.name || '导入的预设',
            isDefault: false
          });
          
          this._currentEditId = newId;
          this.renderTo($container);
          showToast('success', '预设已导入');
        } catch (err) {
          showToast('error', '导入失败：无效的JSON文件');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  },
  
  // ============================================================
  // 刷新方法
  // ============================================================
  
  /**
   * 刷新预设列表
   * @private
   */
  _refreshPresetList($container, $) {
    const currentId = getCurrentBypassPresetId();
    const editId = this._currentEditId || currentId;
    
    $container.find('.yyt-preset-list-v3').html(
      this._renderPresetList(getAllBypassPresets(), currentId, editId)
    );
    
    $container.find('.yyt-preset-meta-editor').html(
      this._renderPresetMetaEditor(getBypassPreset(editId))
    );
  },
  
  /**
   * 刷新消息列表
   * @private
   */
  _refreshMessageList($container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    $container.find('.yyt-message-list-v3').html(
      this._renderMessageList(preset)
    );
  },
  
  /**
   * 刷新编辑器头部
   * @private
   */
  _refreshEditorHeader($container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    const preset = getBypassPreset(presetId);
    
    $container.find('.yyt-bypass-editor-v3').find('.yyt-editor-header-v3').remove();
    $container.find('.yyt-bypass-editor-v3').prepend(this._renderEditorHeader(preset));
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
      /* ============================================================
         破限词面板V3 - 紧凑列表样式
         ============================================================ */
      
      .yyt-bypass-panel-v3 {
        display: flex;
        height: 100%;
        min-height: 0;
        background: #1A1B1E;
      }
      
      /* ---------- 左侧面板：预设管理 ---------- */
      .yyt-bypass-sidebar-v3 {
        min-width: 200px;
        max-width: 360px;
        display: flex;
        flex-direction: column;
        background: #16171A;
        border-right: 1px solid rgba(255, 255, 255, 0.06);
        flex-shrink: 0;
      }
      
      .yyt-sidebar-header-v3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-sidebar-title-v3 {
        font-weight: 600;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.85);
      }
      
      .yyt-icon-btn {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        background: transparent;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .yyt-icon-btn:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: #4A9EFF;
        color: #4A9EFF;
      }
      
      /* 预设列表 */
      .yyt-preset-list-v3 {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
      }
      
      .yyt-preset-item-v3 {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
        position: relative;
        margin-bottom: 2px;
      }
      
      .yyt-preset-item-v3:hover {
        background: rgba(255, 255, 255, 0.03);
      }
      
      .yyt-preset-item-v3.yyt-active {
        background: rgba(255, 255, 255, 0.05);
      }
      
      .yyt-preset-item-v3.yyt-active .yyt-preset-indicator {
        background: #4A9EFF;
      }
      
      .yyt-preset-item-v3.yyt-editing {
        background: rgba(74, 158, 255, 0.08);
      }
      
      .yyt-preset-item-v3.yyt-editing .yyt-preset-indicator {
        background: #4A9EFF;
      }
      
      .yyt-preset-indicator {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 20px;
        border-radius: 0 2px 2px 0;
        background: transparent;
        transition: background 0.15s ease;
      }
      
      .yyt-preset-content {
        flex: 1;
        min-width: 0;
        padding-left: 8px;
      }
      
      .yyt-preset-name {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.85);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .yyt-preset-actions {
        display: flex;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.15s ease;
      }
      
      .yyt-preset-item-v3:hover .yyt-preset-actions {
        opacity: 1;
      }
      
      .yyt-preset-action-btn {
        width: 26px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 5px;
        background: transparent;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      
      .yyt-preset-action-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.85);
      }
      
      .yyt-preset-action-btn.yyt-danger:hover {
        background: rgba(232, 93, 93, 0.2);
        color: #E85D5D;
      }
      
      .yyt-preset-action-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
      
      /* 预设元信息编辑区 */
      .yyt-preset-meta-editor {
        padding: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        background: rgba(0, 0, 0, 0.15);
      }
      
      .yyt-meta-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .yyt-meta-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      
      .yyt-meta-field label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 500;
      }
      
      .yyt-meta-input {
        padding: 8px 10px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.85);
        font-size: 13px;
        transition: all 0.2s ease;
      }
      
      .yyt-meta-input:focus {
        outline: none;
        border-color: #4A9EFF;
        box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
      }
      
      .yyt-meta-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 4px;
      }
      
      /* ---------- 分割线 ---------- */
      .yyt-panel-resizer {
        width: 6px;
        cursor: col-resize;
        background: transparent;
        position: relative;
        flex-shrink: 0;
      }
      
      .yyt-resizer-handle {
        position: absolute;
        left: 2px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: rgba(255, 255, 255, 0.06);
        transition: background 0.15s ease;
      }
      
      .yyt-panel-resizer:hover .yyt-resizer-handle {
        background: #4A9EFF;
      }
      
      body.yyt-resizing {
        cursor: col-resize !important;
        user-select: none !important;
      }
      
      body.yyt-resizing * {
        cursor: col-resize !important;
      }
      
      /* ---------- 右侧：消息链编辑器 ---------- */
      .yyt-bypass-editor-v3 {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
      }
      
      /* 编辑器头部 */
      .yyt-editor-header-v3 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        flex-shrink: 0;
      }
      
      .yyt-editor-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .yyt-editor-preset-name {
        font-weight: 600;
        font-size: 15px;
        color: rgba(255, 255, 255, 0.85);
      }
      
      .yyt-editor-message-count {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
      }
      
      .yyt-editor-actions-v3 {
        display: flex;
        gap: 8px;
      }
      
      .yyt-text-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: rgba(255, 255, 255, 0.7);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      
      .yyt-text-btn:hover {
        background: rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.9);
      }
      
      /* 消息列表 */
      .yyt-message-list-v3 {
        flex: 1;
        overflow-y: auto;
        min-height: 0;
      }
      
      .yyt-message-rows {
        display: flex;
        flex-direction: column;
      }
      
      /* 消息行 - 紧凑样式 */
      .yyt-message-row {
        display: flex;
        flex-direction: column;
        min-height: 52px;
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        transition: background 0.15s ease;
        position: relative;
      }
      
      .yyt-message-row:hover {
        background: rgba(255, 255, 255, 0.03);
      }
      
      .yyt-message-row.yyt-disabled {
        opacity: 0.5;
      }
      
      .yyt-message-row.yyt-expanded {
        background: rgba(255, 255, 255, 0.02);
      }
      
      .yyt-message-row.yyt-expanded::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: #4A9EFF;
      }
      
      /* 拖拽手柄 */
      .yyt-message-drag-handle {
        position: absolute;
        left: 4px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        cursor: grab;
        opacity: 0;
        transition: opacity 0.15s ease;
        color: rgba(255, 255, 255, 0.3);
      }
      
      .yyt-message-drag-handle::before,
      .yyt-message-drag-handle::after {
        content: '';
        width: 10px;
        height: 2px;
        background: currentColor;
        border-radius: 1px;
      }
      
      .yyt-message-drag-handle i {
        display: none;
      }
      
      .yyt-message-row:hover .yyt-message-drag-handle {
        opacity: 1;
      }
      
      .yyt-message-row.yyt-dragging {
        opacity: 0.6;
        background: rgba(74, 158, 255, 0.1);
        z-index: 100;
      }
      
      .yyt-drag-placeholder {
        background: rgba(74, 158, 255, 0.15);
        border: 2px dashed #4A9EFF;
        border-radius: 4px;
        margin: 4px 16px;
      }
      
      /* 角色标签 */
      .yyt-message-role {
        width: 70px;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.5px;
        padding-top: 2px;
      }
      
      /* 消息内容区 */
      .yyt-message-body {
        flex: 1;
        min-width: 0;
        cursor: pointer;
        padding-left: 20px;
      }
      
      .yyt-message-title-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }
      
      .yyt-message-title {
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.85);
      }
      
      .yyt-message-tag {
        display: inline-flex;
        align-items: center;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: 500;
      }
      
      .yyt-tag-variable {
        background: rgba(92, 184, 92, 0.15);
        color: #5CB85C;
      }
      
      .yyt-tag-disabled {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.5);
      }
      
      .yyt-message-preview {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        line-height: 1.4;
      }
      
      .yyt-variable {
        color: #E8913A;
        font-weight: 500;
      }
      
      .yyt-empty-preview {
        font-style: italic;
        opacity: 0.6;
      }
      
      /* 消息操作区 */
      .yyt-message-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      
      /* Toggle开关 */
      .yyt-toggle-switch {
        position: relative;
        display: inline-block;
        width: 36px;
        height: 20px;
        flex-shrink: 0;
      }
      
      .yyt-toggle-switch input {
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
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        transition: all 0.2s ease;
      }
      
      .yyt-toggle-slider::before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background: #fff;
        border-radius: 50%;
        transition: all 0.2s ease;
      }
      
      .yyt-toggle-switch input:checked + .yyt-toggle-slider {
        background: #5CB85C;
      }
      
      .yyt-toggle-switch input:checked + .yyt-toggle-slider::before {
        transform: translateX(16px);
      }
      
      /* 行操作按钮 */
      .yyt-message-action-btns {
        display: flex;
        gap: 4px;
        opacity: 0;
        transition: opacity 0.15s ease;
      }
      
      .yyt-message-row:hover .yyt-message-action-btns {
        opacity: 1;
      }
      
      .yyt-row-action-btn {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 5px;
        background: transparent;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      
      .yyt-row-action-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.85);
      }
      
      .yyt-row-action-btn.yyt-danger:hover {
        background: rgba(232, 93, 93, 0.2);
        color: #E85D5D;
      }
      
      .yyt-row-action-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
      
      /* 展开编辑区 */
      .yyt-expanded-editor {
        padding: 16px 20px 16px 90px;
        background: rgba(255, 255, 255, 0.02);
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        animation: yytExpandIn 0.2s ease-out;
      }
      
      @keyframes yytExpandIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .yyt-editor-row {
        display: flex;
        gap: 16px;
        margin-bottom: 12px;
      }
      
      .yyt-editor-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      
      .yyt-editor-field:first-child {
        flex: 1;
      }
      
      .yyt-editor-field label {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 500;
      }
      
      .yyt-editor-input {
        padding: 8px 12px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.85);
        font-size: 13px;
        transition: all 0.2s ease;
      }
      
      .yyt-editor-input:focus {
        outline: none;
        border-color: #4A9EFF;
        box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
      }
      
      /* 角色分段选择 */
      .yyt-role-segmented {
        display: flex;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        overflow: hidden;
      }
      
      .yyt-role-btn {
        padding: 6px 12px;
        border: none;
        background: transparent;
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      
      .yyt-role-btn:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      
      .yyt-role-btn.yyt-active {
        background: rgba(74, 158, 255, 0.2);
        color: #4A9EFF;
      }
      
      .yyt-editor-content {
        margin-bottom: 12px;
      }
      
      .yyt-editor-textarea {
        width: 100%;
        min-height: 120px;
        max-height: 400px;
        padding: 12px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: rgba(255, 255, 255, 0.85);
        font-size: 13px;
        line-height: 1.6;
        resize: vertical;
        font-family: inherit;
        transition: all 0.2s ease;
      }
      
      .yyt-editor-textarea:focus {
        outline: none;
        border-color: #4A9EFF;
        box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
      }
      
      .yyt-editor-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .yyt-toolbar-left,
      .yyt-toolbar-right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .yyt-char-count {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.4);
      }
      
      /* 添加消息栏 */
      .yyt-add-message-bar {
        padding: 12px 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        flex-shrink: 0;
      }
      
      /* 空状态 */
      .yyt-empty-messages-v3 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 30px;
        text-align: center;
        gap: 12px;
      }
      
      .yyt-empty-messages-v3 i {
        font-size: 48px;
        color: rgba(255, 255, 255, 0.2);
      }
      
      .yyt-empty-messages-v3 span {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }
      
      .yyt-empty-presets {
        padding: 20px;
        text-align: center;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.4);
      }
      
      /* ---------- 按钮样式 ---------- */
      .yyt-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .yyt-btn-small {
        padding: 6px 12px;
        font-size: 12px;
      }
      
      .yyt-btn-primary {
        background: #4A9EFF;
        color: #fff;
      }
      
      .yyt-btn-primary:hover {
        background: #3d8de6;
        box-shadow: 0 4px 12px rgba(74, 158, 255, 0.3);
      }
      
      .yyt-btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.85);
      }
      
      .yyt-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.15);
      }
      
      /* ---------- 滚动条 ---------- */
      .yyt-preset-list-v3::-webkit-scrollbar,
      .yyt-message-list-v3::-webkit-scrollbar {
        width: 6px;
      }
      
      .yyt-preset-list-v3::-webkit-scrollbar-track,
      .yyt-message-list-v3::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .yyt-preset-list-v3::-webkit-scrollbar-thumb,
      .yyt-message-list-v3::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
      }
      
      .yyt-preset-list-v3::-webkit-scrollbar-thumb:hover,
      .yyt-message-list-v3::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      /* ---------- 响应式适配 ---------- */
      @media (max-width: 1024px) {
        .yyt-bypass-sidebar-v3 {
          width: 60px !important;
          min-width: 60px;
          max-width: 60px;
        }
        
        .yyt-sidebar-header-v3 {
          justify-content: center;
        }
        
        .yyt-sidebar-title-v3,
        .yyt-preset-content,
        .yyt-preset-actions,
        .yyt-preset-meta-editor {
          display: none;
        }
        
        .yyt-panel-resizer {
          display: none;
        }
        
        .yyt-preset-item-v3 {
          justify-content: center;
          padding: 0;
        }
        
        .yyt-preset-indicator {
          display: none;
        }
      }
      
      @media (max-width: 768px) {
        .yyt-bypass-panel-v3 {
          flex-direction: column;
        }
        
        .yyt-bypass-sidebar-v3 {
          width: 100% !important;
          min-width: unset;
          max-width: unset;
          max-height: 200px;
        }
        
        .yyt-sidebar-title-v3,
        .yyt-preset-content,
        .yyt-preset-actions,
        .yyt-preset-meta-editor {
          display: flex;
        }
        
        .yyt-preset-meta-editor {
          flex-direction: column;
        }
        
        .yyt-panel-resizer {
          display: none;
        }
        
        .yyt-message-role {
          width: 50px;
        }
        
        .yyt-expanded-editor {
          padding-left: 20px;
        }
        
        .yyt-editor-row {
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

export default BypassPanel;