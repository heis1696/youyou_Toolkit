/**
 * YouYou Toolkit - 破限词面板组件
 * @description 提供破限词预设管理的UI（一级窗口直接编辑版）
 * @version 2.0.0
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
    // 默认编辑当前选中的预设
    const editId = this._currentEditId || currentBypassId;
    const editPreset = getBypassPreset(editId);
    
    return `
      <div class="yyt-bypass-panel-v2">
        <!-- 左侧：预设列表 -->
        <div class="yyt-bypass-sidebar">
          <div class="yyt-bypass-sidebar-header">
            <div class="yyt-sidebar-title">
              <i class="fa-solid fa-shield-alt"></i>
              <span>预设列表</span>
            </div>
            <button class="yyt-btn yyt-btn-small yyt-btn-accent" id="${SCRIPT_ID}-add-bypass" title="新建预设">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="yyt-bypass-list-v2">
            ${this._renderBypassListV2(bypassPresets, currentBypassId, editId)}
          </div>
        </div>
        
        <!-- 右侧：编辑区域 -->
        <div class="yyt-bypass-editor-area">
          <div class="yyt-editor-header">
            <div class="yyt-editor-title">
              <i class="fa-solid fa-edit"></i>
              <span id="${SCRIPT_ID}-editor-preset-name">${editPreset ? escapeHtml(editPreset.name) : '新建预设'}</span>
            </div>
            <div class="yyt-editor-actions">
              <button class="yyt-btn yyt-btn-small yyt-btn-outline" id="${SCRIPT_ID}-bypass-reset" title="重置更改">
                <i class="fa-solid fa-undo"></i> 重置
              </button>
              <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="${SCRIPT_ID}-bypass-save">
                <i class="fa-solid fa-save"></i> 保存
              </button>
            </div>
          </div>
          
          <!-- 基本信息 -->
          <div class="yyt-editor-basic-info">
            <div class="yyt-form-row-v2">
              <div class="yyt-form-group-v2">
                <label><i class="fa-solid fa-tag"></i> 预设名称</label>
                <input type="text" class="yyt-input-v2" id="${SCRIPT_ID}-bypass-name" 
                       value="${editPreset ? escapeHtml(editPreset.name) : ''}" placeholder="输入预设名称">
              </div>
              <div class="yyt-form-group-v2">
                <label><i class="fa-solid fa-info-circle"></i> 描述（可选）</label>
                <input type="text" class="yyt-input-v2" id="${SCRIPT_ID}-bypass-desc" 
                       value="${editPreset ? escapeHtml(editPreset.description || '') : ''}" placeholder="预设描述">
              </div>
            </div>
          </div>
          
          <!-- 消息段落编辑器 -->
          <div class="yyt-editor-messages">
            <div class="yyt-messages-header">
              <label><i class="fa-solid fa-list-alt"></i> 消息段落</label>
              <div class="yyt-messages-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-accent" id="${SCRIPT_ID}-bypass-add-segment" title="添加段落">
                  <i class="fa-solid fa-plus"></i> 添加段落
                </button>
              </div>
            </div>
            <div class="yyt-messages-list" id="${SCRIPT_ID}-bypass-messages">
              ${this._renderMessagesList(editPreset)}
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  // ============================================================
  // 私有渲染方法
  // ============================================================
  
  /**
   * 渲染预设列表V2 - 左侧边栏
   * @private
   */
  _renderBypassListV2(bypassPresets, currentBypassId, editId) {
    return Object.entries(bypassPresets).map(([id, preset]) => `
      <div class="yyt-bypass-item-v2 ${id === currentBypassId ? 'yyt-active-preset' : ''} ${id === editId ? 'yyt-editing' : ''}" 
           data-bypass-id="${id}">
        <div class="yyt-item-main" data-action="select">
          <div class="yyt-item-indicator"></div>
          <div class="yyt-item-info">
            <span class="yyt-item-name">${escapeHtml(preset.name)}</span>
            <span class="yyt-item-count">${preset.messages?.length || 0} 条消息</span>
          </div>
        </div>
        <div class="yyt-item-actions">
          <button class="yyt-item-btn yyt-btn-edit" data-action="edit" title="编辑此预设">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="yyt-item-btn yyt-btn-delete" data-action="delete" title="删除" 
                  ${preset.isDefault ? 'disabled' : ''}>
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  },
  
  /**
   * 渲染消息段落列表
   * @private
   */
  _renderMessagesList(preset) {
    const messages = preset?.messages || [];
    if (messages.length === 0) {
      return `
        <div class="yyt-empty-messages">
          <i class="fa-solid fa-inbox"></i>
          <span>暂无消息段落，点击上方"添加段落"按钮创建</span>
        </div>
      `;
    }
    
    return messages.map((msg, index) => this._renderMessageSegment(msg, index)).join('');
  },
  
  /**
   * 渲染单条消息段落
   * @private
   */
  _renderMessageSegment(message, index) {
    const role = (message.role || 'USER').toUpperCase();
    const roleColors = {
      'SYSTEM': { color: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.15)', border: 'rgba(255, 107, 107, 0.4)' },
      'USER': { color: '#4dabf7', bg: 'rgba(77, 171, 247, 0.15)', border: 'rgba(77, 171, 247, 0.4)' },
      'assistant': { color: '#69db7c', bg: 'rgba(105, 219, 124, 0.15)', border: 'rgba(105, 219, 124, 0.4)' }
    };
    const roleStyle = roleColors[role] || roleColors['USER'];
    const deletable = message.deletable !== false;
    
    return `
      <div class="yyt-message-segment" data-index="${index}" data-deletable="${deletable}" data-role="${role}">
        <div class="yyt-segment-header-v2">
          <div class="yyt-segment-number">#${index + 1}</div>
          <select class="yyt-role-select-v2" style="background-color: ${roleStyle.bg}; border-color: ${roleStyle.border}; color: ${roleStyle.color};">
            <option value="SYSTEM" ${role === 'SYSTEM' ? 'selected' : ''} style="color: #ff6b6b;">系统 (SYSTEM)</option>
            <option value="USER" ${role === 'USER' ? 'selected' : ''} style="color: #4dabf7;">用户 (USER)</option>
            <option value="assistant" ${role === 'assistant' ? 'selected' : ''} style="color: #69db7c;">助手 (assistant)</option>
          </select>
          <div class="yyt-segment-actions-v2">
            <button class="yyt-action-btn" data-action="move-up" title="上移" ${index === 0 ? 'disabled' : ''}>
              <i class="fa-solid fa-chevron-up"></i>
            </button>
            <button class="yyt-action-btn" data-action="move-down" title="下移">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            ${deletable ? `
              <button class="yyt-action-btn yyt-action-danger" data-action="delete" title="删除">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            ` : ''}
          </div>
        </div>
        <div class="yyt-segment-content-v2">
          <textarea class="yyt-segment-textarea" rows="5" placeholder="输入此段落的内容...">${escapeHtml(message.content || '')}</textarea>
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
    
    this._bindBypassEventsV2($container, $);
  },
  
  /**
   * 绑定破限词事件V2 - 一级窗口直接编辑
   * @private
   */
  _bindBypassEventsV2($container, $) {
    const self = this;
    
    // ---------- 左侧预设列表事件 ----------
    
    // 点击预设项 - 设为当前默认预设
    $container.find('.yyt-item-main').on('click', function(e) {
      const $item = $(this).closest('.yyt-bypass-item-v2');
      const bypassId = $item.data('bypass-id');
      
      // 设为当前默认预设
      setCurrentBypassPreset(bypassId);
      
      // 更新UI
      $container.find('.yyt-bypass-item-v2').removeClass('yyt-active-preset');
      $item.addClass('yyt-active-preset');
      
      showToast('success', '已切换默认预设');
      eventBus.emit(EVENTS.BYPASS_PRESET_ACTIVATED, { id: bypassId });
    });
    
    // 编辑按钮 - 切换到编辑此预设
    $container.find('.yyt-item-btn[data-action="edit"]').on('click', function(e) {
      e.stopPropagation();
      const $item = $(this).closest('.yyt-bypass-item-v2');
      const bypassId = $item.data('bypass-id');
      
      // 设置当前编辑的预设
      self._currentEditId = bypassId;
      
      // 更新编辑区域
      self._refreshEditorArea($container, $);
    });
    
    // 删除按钮
    $container.find('.yyt-item-btn[data-action="delete"]').on('click', function(e) {
      e.stopPropagation();
      const $item = $(this).closest('.yyt-bypass-item-v2');
      const bypassId = $item.data('bypass-id');
      const preset = getBypassPreset(bypassId);
      
      if (preset?.isDefault) {
        showToast('warning', '默认预设不可删除');
        return;
      }
      
      if (confirm(`确定要删除预设 "${preset?.name || bypassId}" 吗？`)) {
        const result = deleteBypassPreset(bypassId);
        if (result) {
          // 如果删除的是当前编辑的预设，切换到默认预设
          if (self._currentEditId === bypassId) {
            self._currentEditId = getCurrentBypassPresetId();
          }
          self.renderTo($container);
          showToast('success', '预设已删除');
          eventBus.emit(EVENTS.BYPASS_PRESET_DELETED, { id: bypassId });
        }
      }
    });
    
    // 新建预设按钮
    $container.find(`#${SCRIPT_ID}-add-bypass`).on('click', () => {
      // 创建新预设ID
      const newId = `custom_${Date.now()}`;
      
      // 创建空预设
      saveBypassPreset(newId, {
        name: '新预设',
        description: '',
        messages: [{ role: 'USER', content: '', deletable: true }]
      });
      
      // 设为当前编辑的预设
      this._currentEditId = newId;
      
      // 刷新UI
      this.renderTo($container);
      showToast('success', '已创建新预设，请编辑');
    });
    
    // ---------- 右侧编辑区域事件 ----------
    
    // 保存按钮
    $container.find(`#${SCRIPT_ID}-bypass-save`).on('click', () => {
      this._saveCurrentPreset($container, $);
    });
    
    // 重置按钮
    $container.find(`#${SCRIPT_ID}-bypass-reset`).on('click', () => {
      this._refreshEditorArea($container, $);
      showToast('info', '已重置');
    });
    
    // 添加段落按钮
    $container.find(`#${SCRIPT_ID}-bypass-add-segment`).on('click', () => {
      this._addSegment($container, $);
    });
    
    // 段落操作按钮（上移、下移、删除）
    $container.on('click', '.yyt-action-btn', function(e) {
      const $segment = $(this).closest('.yyt-message-segment');
      const action = $(this).data('action');
      
      if (action === 'move-up') {
        const $prev = $segment.prev();
        if ($prev.length) {
          $segment.insertBefore($prev);
          self._reindexSegments($container, $);
        }
      } else if (action === 'move-down') {
        const $next = $segment.next();
        if ($next.length) {
          $segment.insertAfter($next);
          self._reindexSegments($container, $);
        }
      } else if (action === 'delete') {
        if (confirm('确定要删除这个段落吗？')) {
          $segment.remove();
          self._reindexSegments($container, $);
          showToast('success', '已删除段落');
        }
      }
    });
    
    // 角色选择变化时更新样式
    $container.on('change', '.yyt-role-select-v2', function() {
      const $segment = $(this).closest('.yyt-message-segment');
      const role = $(this).val();
      const roleColors = {
        'SYSTEM': { color: '#ff6b6b', bg: 'rgba(255, 107, 107, 0.15)', border: 'rgba(255, 107, 107, 0.4)' },
        'USER': { color: '#4dabf7', bg: 'rgba(77, 171, 247, 0.15)', border: 'rgba(77, 171, 247, 0.4)' },
        'assistant': { color: '#69db7c', bg: 'rgba(105, 219, 124, 0.15)', border: 'rgba(105, 219, 124, 0.4)' }
      };
      const style = roleColors[role] || roleColors['USER'];
      
      $(this).css({
        'background-color': style.bg,
        'border-color': style.border,
        'color': style.color
      });
      $segment.attr('data-role', role);
    });
  },
  
  // ============================================================
  // 私有操作方法
  // ============================================================
  
  /**
   * 刷新编辑区域
   * @private
   */
  _refreshEditorArea($container, $) {
    const editId = this._currentEditId || getCurrentBypassPresetId();
    const editPreset = getBypassPreset(editId);
    
    // 更新标题
    $container.find(`#${SCRIPT_ID}-editor-preset-name`).text(editPreset?.name || '新建预设');
    
    // 更新表单
    $container.find(`#${SCRIPT_ID}-bypass-name`).val(editPreset?.name || '');
    $container.find(`#${SCRIPT_ID}-bypass-desc`).val(editPreset?.description || '');
    
    // 更新消息列表
    $container.find(`#${SCRIPT_ID}-bypass-messages`).html(this._renderMessagesList(editPreset));
    
    // 更新左侧列表的编辑状态
    $container.find('.yyt-bypass-item-v2').removeClass('yyt-editing');
    $container.find(`.yyt-bypass-item-v2[data-bypass-id="${editId}"]`).addClass('yyt-editing');
  },
  
  /**
   * 添加新段落
   * @private
   */
  _addSegment($container, $) {
    const $list = $container.find(`#${SCRIPT_ID}-bypass-messages`);
    
    // 移除空状态提示（如果存在）
    $list.find('.yyt-empty-messages').remove();
    
    const index = $list.find('.yyt-message-segment').length;
    const newSegment = this._renderMessageSegment({ role: 'USER', content: '', deletable: true }, index);
    $list.append(newSegment);
    
    // 滚动到底部
    $list.scrollTop($list[0].scrollHeight);
    
    showToast('success', '已添加新段落');
  },
  
  /**
   * 重新索引段落
   * @private
   */
  _reindexSegments($container, $) {
    $container.find('.yyt-message-segment').each(function(index) {
      $(this).attr('data-index', index);
      $(this).find('.yyt-segment-number').text('#' + (index + 1));
    });
  },
  
  /**
   * 保存当前编辑的预设
   * @private
   */
  _saveCurrentPreset($container, $) {
    const presetId = this._currentEditId || getCurrentBypassPresetId();
    
    const name = $container.find(`#${SCRIPT_ID}-bypass-name`).val().trim();
    const desc = $container.find(`#${SCRIPT_ID}-bypass-desc`).val().trim();
    
    if (!name) {
      showToast('warning', '请输入预设名称');
      return;
    }
    
    // 收集消息段落
    const messages = [];
    $container.find('.yyt-message-segment').each(function() {
      const role = $(this).find('.yyt-role-select-v2').val();
      const content = $(this).find('.yyt-segment-textarea').val();
      const deletable = $(this).data('deletable') !== false;
      
      // 只保存有内容的段落
      if (content.trim()) {
        messages.push({ role, content, deletable });
      }
    });
    
    if (messages.length === 0) {
      showToast('warning', '请至少添加一条有内容的消息');
      return;
    }
    
    // 保存预设
    const success = saveBypassPreset(presetId, { name, description: desc, messages });
    
    if (success) {
      // 更新编辑器标题
      $container.find(`#${SCRIPT_ID}-editor-preset-name`).text(name);
      
      // 刷新左侧列表
      const currentBypassId = getCurrentBypassPresetId();
      $container.find('.yyt-bypass-list-v2').html(
        this._renderBypassListV2(getAllBypassPresets(), currentBypassId, presetId)
      );
      
      // 重新绑定左侧事件
      this._bindBypassEventsV2($container, $);
      
      showToast('success', '预设已保存');
      eventBus.emit(EVENTS.BYPASS_PRESET_UPDATED, { id: presetId });
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
      /* ============================================================
         破限词面板V2 - 现代化UI设计
         ============================================================ */
      
      .yyt-bypass-panel-v2 {
        display: flex;
        gap: 16px;
        height: 100%;
        min-height: 0;
      }
      
      /* ---------- 左侧边栏：预设列表 ---------- */
      .yyt-bypass-sidebar {
        width: 260px;
        min-width: 220px;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        background: linear-gradient(180deg, rgba(30, 35, 50, 0.8) 0%, rgba(20, 25, 35, 0.9) 100%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
      }
      
      .yyt-bypass-sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.08) 0%, rgba(100, 140, 200, 0.04) 100%);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-sidebar-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.95);
        letter-spacing: 0.3px;
      }
      
      .yyt-sidebar-title i {
        color: #7bb7ff;
        font-size: 16px;
        filter: drop-shadow(0 0 6px rgba(123, 183, 255, 0.5));
      }
      
      .yyt-bypass-list-v2 {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .yyt-bypass-list-v2::-webkit-scrollbar {
        width: 4px;
      }
      
      .yyt-bypass-list-v2::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.12);
        border-radius: 2px;
      }
      
      /* 预设项卡片 */
      .yyt-bypass-item-v2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 14px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      
      .yyt-bypass-item-v2::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      
      .yyt-bypass-item-v2:hover {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
        border-color: rgba(255, 255, 255, 0.12);
        transform: translateX(3px);
      }
      
      .yyt-bypass-item-v2:hover::before {
        opacity: 1;
      }
      
      .yyt-bypass-item-v2.yyt-active-preset {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.15) 0%, rgba(123, 183, 255, 0.05) 100%);
        border-color: rgba(123, 183, 255, 0.35);
        box-shadow: 0 0 20px rgba(123, 183, 255, 0.15);
      }
      
      .yyt-bypass-item-v2.yyt-editing {
        background: linear-gradient(135deg, rgba(105, 219, 124, 0.12) 0%, rgba(105, 219, 124, 0.03) 100%);
        border-color: rgba(105, 219, 124, 0.35);
        box-shadow: 0 0 20px rgba(105, 219, 124, 0.12);
      }
      
      .yyt-bypass-item-v2.yyt-active-preset.yyt-editing {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(105, 219, 124, 0.08) 100%);
        border-color: rgba(123, 183, 255, 0.4);
      }
      
      .yyt-item-main {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;
      }
      
      .yyt-item-indicator {
        width: 4px;
        height: 28px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.1);
        transition: all 0.25s ease;
      }
      
      .yyt-bypass-item-v2.yyt-active-preset .yyt-item-indicator {
        background: linear-gradient(180deg, #7bb7ff 0%, #5a9cf0 100%);
        box-shadow: 0 0 10px rgba(123, 183, 255, 0.5);
      }
      
      .yyt-bypass-item-v2.yyt-editing .yyt-item-indicator {
        background: linear-gradient(180deg, #69db7c 0%, #4ade80 100%);
        box-shadow: 0 0 10px rgba(105, 219, 124, 0.5);
      }
      
      .yyt-item-info {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
      }
      
      .yyt-item-name {
        font-weight: 500;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.95);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .yyt-item-count {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.45);
      }
      
      .yyt-item-actions {
        display: flex;
        gap: 6px;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      
      .yyt-bypass-item-v2:hover .yyt-item-actions {
        opacity: 1;
      }
      
      /* 预设项按钮 - 清晰可见 */
      .yyt-item-btn {
        width: 30px;
        height: 30px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .yyt-item-btn:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.25);
        color: #fff;
        transform: scale(1.05);
      }
      
      .yyt-item-btn.yy-btn-edit:hover:not(:disabled) {
        background: rgba(123, 183, 255, 0.25);
        border-color: rgba(123, 183, 255, 0.5);
        color: #7bb7ff;
        box-shadow: 0 0 12px rgba(123, 183, 255, 0.3);
      }
      
      .yyt-item-btn.yy-btn-delete:hover:not(:disabled) {
        background: rgba(255, 107, 107, 0.25);
        border-color: rgba(255, 107, 107, 0.5);
        color: #ff6b6b;
        box-shadow: 0 0 12px rgba(255, 107, 107, 0.3);
      }
      
      .yyt-item-btn:disabled {
        opacity: 0.25;
        cursor: not-allowed;
        transform: none !important;
      }
      
      /* ---------- 右侧编辑区域 ---------- */
      .yyt-bypass-editor-area {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        background: linear-gradient(180deg, rgba(30, 35, 50, 0.6) 0%, rgba(20, 25, 35, 0.8) 100%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
      }
      
      .yyt-editor-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        background: linear-gradient(135deg, rgba(105, 219, 124, 0.08) 0%, rgba(80, 180, 100, 0.03) 100%);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-editor-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        font-size: 15px;
        color: rgba(255, 255, 255, 0.95);
        letter-spacing: 0.3px;
      }
      
      .yyt-editor-title i {
        color: #69db7c;
        font-size: 16px;
        filter: drop-shadow(0 0 6px rgba(105, 219, 124, 0.5));
      }
      
      .yyt-editor-actions {
        display: flex;
        gap: 10px;
      }
      
      /* ---------- 基本信息区域 ---------- */
      .yyt-editor-basic-info {
        padding: 18px 20px;
        background: rgba(0, 0, 0, 0.15);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-form-row-v2 {
        display: flex;
        gap: 16px;
      }
      
      .yyt-form-group-v2 {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .yyt-form-group-v2 label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.65);
        letter-spacing: 0.3px;
      }
      
      .yyt-form-group-v2 label i {
        font-size: 11px;
        color: #7bb7ff;
      }
      
      .yyt-input-v2 {
        padding: 12px 14px;
        background: rgba(0, 0, 0, 0.35);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: rgba(255, 255, 255, 0.95);
        font-size: 13px;
        transition: all 0.25s ease;
      }
      
      .yyt-input-v2:hover {
        border-color: rgba(255, 255, 255, 0.18);
        background: rgba(0, 0, 0, 0.4);
      }
      
      .yyt-input-v2:focus {
        outline: none;
        border-color: #7bb7ff;
        box-shadow: 0 0 0 3px rgba(123, 183, 255, 0.2), 0 0 20px rgba(123, 183, 255, 0.1);
        background: rgba(0, 0, 0, 0.45);
      }
      
      .yyt-input-v2::placeholder {
        color: rgba(255, 255, 255, 0.35);
      }
      
      /* ---------- 消息段落编辑区 ---------- */
      .yyt-editor-messages {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        padding: 18px 20px;
      }
      
      .yyt-messages-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      }
      
      .yyt-messages-header label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
      }
      
      .yyt-messages-header label i {
        color: #7bb7ff;
        filter: drop-shadow(0 0 4px rgba(123, 183, 255, 0.4));
      }
      
      .yyt-messages-list {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding-right: 6px;
      }
      
      .yyt-messages-list::-webkit-scrollbar {
        width: 6px;
      }
      
      .yyt-messages-list::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.03);
        border-radius: 3px;
      }
      
      .yyt-messages-list::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.12);
        border-radius: 3px;
      }
      
      .yyt-messages-list::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      /* 空状态 */
      .yyt-empty-messages {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px 30px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px dashed rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: rgba(255, 255, 255, 0.4);
        gap: 14px;
      }
      
      .yyt-empty-messages i {
        font-size: 42px;
        opacity: 0.5;
        color: rgba(255, 255, 255, 0.25);
      }
      
      .yyt-empty-messages span {
        font-size: 13px;
        text-align: center;
        line-height: 1.5;
      }
      
      /* ---------- 消息段落卡片 - 精致设计 ---------- */
      .yyt-message-segment {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      }
      
      .yyt-message-segment:hover {
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        transform: translateY(-2px);
      }
      
      /* 角色左边框 - 发光效果 */
      .yyt-message-segment[data-role="SYSTEM"] {
        border-left: 3px solid #ff6b6b;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15), inset 3px 0 15px rgba(255, 107, 107, 0.1);
      }
      
      .yyt-message-segment[data-role="USER"] {
        border-left: 3px solid #4dabf7;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15), inset 3px 0 15px rgba(77, 171, 247, 0.1);
      }
      
      .yyt-message-segment[data-role="assistant"] {
        border-left: 3px solid #69db7c;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15), inset 3px 0 15px rgba(105, 219, 124, 0.1);
      }
      
      .yyt-segment-header-v2 {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0%, transparent 100%);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      
      .yyt-segment-number {
        font-size: 13px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.35);
        min-width: 28px;
      }
      
      .yyt-role-select-v2 {
        padding: 8px 14px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid;
        transition: all 0.2s ease;
        min-width: 135px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='white' opacity='0.6' d='M5 7L1 3h8z'/%3E%3C/svg%3E") !important;
        background-repeat: no-repeat !important;
        background-position: right 10px center !important;
        padding-right: 28px;
      }
      
      .yyt-role-select-v2:hover {
        filter: brightness(1.15);
        transform: scale(1.02);
      }
      
      .yyt-role-select-v2:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);
      }
      
      .yyt-segment-actions-v2 {
        display: flex;
        gap: 6px;
        margin-left: auto;
      }
      
      /* 操作按钮 - 精致设计 */
      .yyt-action-btn {
        width: 32px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.06);
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .yyt-action-btn:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.22);
        color: #fff;
        transform: scale(1.08);
      }
      
      .yyt-action-btn:disabled {
        opacity: 0.25;
        cursor: not-allowed;
        transform: none !important;
      }
      
      .yyt-action-btn.yy-action-danger:hover:not(:disabled) {
        background: rgba(255, 107, 107, 0.2);
        border-color: rgba(255, 107, 107, 0.4);
        color: #ff6b6b;
        box-shadow: 0 0 12px rgba(255, 107, 107, 0.25);
      }
      
      .yyt-segment-content-v2 {
        padding: 16px;
      }
      
      .yyt-segment-textarea {
        width: 100%;
        min-height: 130px;
        padding: 14px 16px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        color: rgba(255, 255, 255, 0.95);
        font-size: 13px;
        line-height: 1.65;
        resize: vertical;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
        transition: all 0.25s ease;
      }
      
      .yyt-segment-textarea:hover {
        border-color: rgba(255, 255, 255, 0.15);
        background: rgba(0, 0, 0, 0.35);
      }
      
      .yyt-segment-textarea:focus {
        outline: none;
        border-color: #7bb7ff;
        box-shadow: 0 0 0 3px rgba(123, 183, 255, 0.15), 0 0 20px rgba(123, 183, 255, 0.08);
        background: rgba(0, 0, 0, 0.4);
      }
      
      .yyt-segment-textarea::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
      
      /* ---------- 按钮样式 - 清晰醒目 ---------- */
      
      /* 强调按钮 - 亮蓝色 */
      .yyt-btn-accent {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.3) 0%, rgba(100, 160, 230, 0.2) 100%);
        color: #7bb7ff !important;
        border: 1px solid rgba(123, 183, 255, 0.5);
        font-weight: 600;
        text-shadow: 0 0 10px rgba(123, 183, 255, 0.5);
      }
      
      .yyt-btn-accent:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.4) 0%, rgba(100, 160, 230, 0.3) 100%);
        border-color: rgba(123, 183, 255, 0.7);
        box-shadow: 0 0 20px rgba(123, 183, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        transform: translateY(-1px);
      }
      
      /* 轮廓按钮 - 清晰边框 */
      .yyt-btn-outline {
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.85) !important;
        border: 1px solid rgba(255, 255, 255, 0.25);
        font-weight: 500;
      }
      
      .yyt-btn-outline:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateY(-1px);
      }
      
      /* 主按钮 - 渐变发光 */
      .yyt-btn-primary {
        background: linear-gradient(135deg, #7bb7ff 0%, #5a9cf0 100%);
        color: #0b0f15 !important;
        border: none;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(123, 183, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        text-shadow: none;
      }
      
      .yyt-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(123, 183, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      }
      
      /* ---------- 响应式调整 ---------- */
      @media (max-width: 900px) {
        .yyt-bypass-panel-v2 {
          flex-direction: column;
        }
        
        .yyt-bypass-sidebar {
          width: 100%;
          max-width: none;
          max-height: 220px;
        }
        
        .yyt-form-row-v2 {
          flex-direction: column;
          gap: 14px;
        }
      }
      
      @media (max-width: 600px) {
        .yyt-editor-header {
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }
        
        .yyt-editor-actions {
          width: 100%;
          justify-content: flex-end;
        }
        
        .yyt-messages-header {
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }
        
        .yyt-messages-actions {
          width: 100%;
        }
        
        .yyt-segment-header-v2 {
          flex-wrap: wrap;
        }
        
        .yyt-segment-actions-v2 {
          margin-left: 0;
          margin-top: 10px;
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

export default BypassPanel;