/**
 * YouYou Toolkit - 破限词可视化编辑器组件
 * @description 提供段落式可视化编辑界面
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

import {
  getAllBypassPresets,
  getBypassPreset,
  saveBypassPreset,
  getCurrentBypassPresetId,
  setCurrentBypassPreset
} from '../../bypass-prompts.js';

// ============================================================
// 角色选项
// ============================================================

const ROLE_OPTIONS = [
  { value: 'SYSTEM', label: '系统 (SYSTEM)', color: '#ff6b6b' },
  { value: 'USER', label: '用户 (USER)', color: '#4dabf7' },
  { value: 'assistant', label: '助手 (assistant)', color: '#69db7c' }
];

// ============================================================
// 组件定义
// ============================================================

export const BypassEditor = {
  id: 'bypassEditor',
  
  // ============================================================
  // 渲染
  // ============================================================
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const { presetId = getCurrentBypassPresetId(), readonly = false } = props;
    const preset = getBypassPreset(presetId);
    const messages = preset?.messages || [];
    const allPresets = getAllBypassPresets();
    
    return `
      <div class="yyt-bypass-editor" data-preset-id="${presetId}">
        <!-- 工具栏 -->
        <div class="yyt-bypass-toolbar">
          <select class="yyt-bypass-preset-select" id="${SCRIPT_ID}-bypass-preset-select">
            ${Object.entries(allPresets).map(([id, p]) => 
              `<option value="${id}" ${id === presetId ? 'selected' : ''}>
                ${escapeHtml(p.name)}
              </option>`
            ).join('')}
          </select>
          <div class="yyt-bypass-actions">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-bypass-add-segment" ${readonly ? 'disabled' : ''}>
              <i class="fa-solid fa-plus"></i> 添加段落
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-bypass-reset" ${readonly ? 'disabled' : ''}>
              <i class="fa-solid fa-undo"></i> 重置
            </button>
          </div>
        </div>
        
        <!-- 段落列表 -->
        <div class="yyt-bypass-segments" id="${SCRIPT_ID}-bypass-segments">
          ${messages.map((msg, index) => this._renderSegment(msg, index, readonly)).join('')}
        </div>
        
        <!-- 底部操作栏 -->
        <div class="yyt-bypass-footer">
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-bypass-save" ${readonly ? 'disabled' : ''}>
            <i class="fa-solid fa-save"></i> 保存预设
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-bypass-export">
            <i class="fa-solid fa-download"></i> 导出
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-bypass-import" ${readonly ? 'disabled' : ''}>
            <i class="fa-solid fa-upload"></i> 导入
          </button>
        </div>
        
        <!-- 隐藏的文件输入 -->
        <input type="file" id="${SCRIPT_ID}-bypass-import-input" accept=".json" style="display:none">
      </div>
    `;
  },
  
  // ============================================================
  // 私有渲染方法
  // ============================================================
  
  /**
   * 渲染预设选项
   * @private
   */
  _renderPresetOptions(currentId) {
    const presets = getAllBypassPresets();
    return Object.entries(presets).map(([id, p]) => 
      `<option value="${id}" ${id === currentId ? 'selected' : ''}>
        ${escapeHtml(p.name)}
      </option>`
    ).join('');
  },
  
  /**
   * 渲染单个段落
   * @private
   */
  _renderSegment(message, index, readonly) {
    const role = (message.role || 'USER').toUpperCase();
    const roleInfo = ROLE_OPTIONS.find(r => r.value === role) || ROLE_OPTIONS[1];
    const deletable = message.deletable !== false;
    
    return `
      <div class="yyt-bypass-segment" data-index="${index}" data-deletable="${deletable}">
        <div class="yyt-segment-header">
          <div class="yyt-segment-role">
            <span class="yyt-role-badge" style="background-color: ${roleInfo.color}">
              ${roleInfo.label}
            </span>
            <select class="yyt-role-select" ${readonly || !deletable ? 'disabled' : ''}>
              ${ROLE_OPTIONS.map(r => 
                `<option value="${r.value}" ${r.value === role ? 'selected' : ''}>
                  ${r.label}
                </option>`
              ).join('')}
            </select>
          </div>
          <div class="yyt-segment-actions">
            ${deletable && !readonly ? `
              <button class="yyt-btn yyt-btn-icon yyt-btn-danger" data-action="delete" title="删除">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : ''}
            <button class="yyt-btn yyt-btn-icon" data-action="move-up" title="上移" ${index === 0 ? 'disabled' : ''}>
              <i class="fa-solid fa-arrow-up"></i>
            </button>
            <button class="yyt-btn yyt-btn-icon" data-action="move-down" title="下移">
              <i class="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        </div>
        <div class="yyt-segment-content">
          <textarea 
            class="yyt-textarea yyt-content-textarea" 
            rows="4" 
            placeholder="输入段落内容..."
            ${readonly ? 'readonly' : ''}
          >${escapeHtml(message.content || '')}</textarea>
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
    
    const self = this;
    
    // 添加段落
    $container.find(`#${SCRIPT_ID}-bypass-add-segment`).on('click', () => {
      this._addSegment($container, $);
    });
    
    // 删除段落
    $container.on('click', '[data-action="delete"]', function() {
      const $segment = $(this).closest('.yyt-bypass-segment');
      self._removeSegment($container, $, $segment);
    });
    
    // 上移
    $container.on('click', '[data-action="move-up"]', function() {
      const $segment = $(this).closest('.yyt-bypass-segment');
      self._moveSegment($container, $, $segment, 'up');
    });
    
    // 下移
    $container.on('click', '[data-action="move-down"]', function() {
      const $segment = $(this).closest('.yyt-bypass-segment');
      self._moveSegment($container, $, $segment, 'down');
    });
    
    // 角色变更
    $container.on('change', '.yyt-role-select', function() {
      const $segment = $(this).closest('.yyt-bypass-segment');
      const newRole = $(this).val();
      self._updateRoleBadge($segment, $, newRole);
    });
    
    // 预设选择
    $container.find(`#${SCRIPT_ID}-bypass-preset-select`).on('change', function() {
      const presetId = $(this).val();
      self._loadPreset($container, $, presetId);
    });
    
    // 保存
    $container.find(`#${SCRIPT_ID}-bypass-save`).on('click', () => {
      this._savePreset($container, $);
    });
    
    // 重置
    $container.find(`#${SCRIPT_ID}-bypass-reset`).on('click', () => {
      const presetId = $container.data('preset-id');
      this._loadPreset($container, $, presetId);
      showToast('info', '已重置');
    });
    
    // 导出
    $container.find(`#${SCRIPT_ID}-bypass-export`).on('click', () => {
      this._exportPreset($container, $);
    });
    
    // 导入
    $container.find(`#${SCRIPT_ID}-bypass-import`).on('click', () => {
      $container.find(`#${SCRIPT_ID}-bypass-import-input`).click();
    });
    
    $container.find(`#${SCRIPT_ID}-bypass-import-input`).on('change', (e) => {
      this._importPreset($container, $, e.target.files[0]);
    });
  },
  
  // ============================================================
  // 私有方法
  // ============================================================
  
  /**
   * 添加段落
   * @private
   */
  _addSegment($container, $) {
    const $segments = $container.find('.yyt-bypass-segments');
    const index = $segments.children().length;
    
    const newSegment = this._renderSegment({
      role: 'USER',
      content: '',
      deletable: true
    }, index, false);
    
    $segments.append(newSegment);
    showToast('success', '已添加新段落');
  },
  
  /**
   * 移除段落
   * @private
   */
  _removeSegment($container, $, $segment) {
    if (confirm('确定要删除这个段落吗？')) {
      $segment.remove();
      this._reindexSegments($container, $);
      showToast('success', '已删除段落');
    }
  },
  
  /**
   * 移动段落
   * @private
   */
  _moveSegment($container, $, $segment, direction) {
    if (direction === 'up') {
      const $prev = $segment.prev();
      if ($prev.length) {
        $segment.insertBefore($prev);
      }
    } else {
      const $next = $segment.next();
      if ($next.length) {
        $segment.insertAfter($next);
      }
    }
    
    this._reindexSegments($container, $);
  },
  
  /**
   * 重新索引段落
   * @private
   */
  _reindexSegments($container, $) {
    $container.find('.yyt-bypass-segment').each(function(index) {
      $(this).attr('data-index', index);
    });
  },
  
  /**
   * 更新角色徽章
   * @private
   */
  _updateRoleBadge($segment, $, newRole) {
    const roleInfo = ROLE_OPTIONS.find(r => r.value === newRole);
    if (roleInfo) {
      $segment.find('.yyt-role-badge')
        .css('background-color', roleInfo.color)
        .text(roleInfo.label);
    }
  },
  
  /**
   * 加载预设
   * @private
   */
  _loadPreset($container, $, presetId) {
    $container.data('preset-id', presetId);
    
    const preset = getBypassPreset(presetId);
    const messages = preset?.messages || [];
    
    const $segments = $container.find('.yyt-bypass-segments');
    $segments.empty();
    
    messages.forEach((msg, index) => {
      $segments.append(this._renderSegment(msg, index, false));
    });
    
    // 更新选择框
    $container.find(`#${SCRIPT_ID}-bypass-preset-select`).val(presetId);
    
    showToast('success', `已加载预设: ${preset?.name || presetId}`);
  },
  
  /**
   * 保存预设
   * @private
   */
  _savePreset($container, $) {
    const presetId = $container.data('preset-id');
    const messages = [];
    
    $container.find('.yyt-bypass-segment').each(function() {
      const role = $(this).find('.yyt-role-select').val();
      const content = $(this).find('.yyt-content-textarea').val();
      const deletable = $(this).data('deletable') !== false;
      
      messages.push({
        role,
        content,
        deletable
      });
    });
    
    const existingPreset = getBypassPreset(presetId);
    const success = saveBypassPreset(presetId, {
      name: existingPreset?.name || presetId,
      description: existingPreset?.description || '',
      messages
    });
    
    if (success) {
      showToast('success', '预设已保存');
      eventBus.emit(EVENTS.BYPASS_PRESET_UPDATED, { presetId });
    } else {
      showToast('error', '保存失败');
    }
  },
  
  /**
   * 导出预设
   * @private
   */
  _exportPreset($container, $) {
    const presetId = $container.data('preset-id');
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
    a.download = `bypass-preset-${presetId}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('success', '已导出');
  },
  
  /**
   * 导入预设
   * @private
   */
  _importPreset($container, $, file) {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        
        if (!imported.messages || !Array.isArray(imported.messages)) {
          showToast('error', '无效的预设格式');
          return;
        }
        
        const $segments = $container.find('.yyt-bypass-segments');
        $segments.empty();
        
        imported.messages.forEach((msg, index) => {
          $segments.append(this._renderSegment(msg, index, false));
        });
        
        showToast('success', '已导入');
      } catch (err) {
        showToast('error', '导入失败: ' + err.message);
      }
    };
    reader.readAsText(file);
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
      /* 破限词可视化编辑器样式 */
      .yyt-bypass-editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .yyt-bypass-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
      }
      
      .yyt-bypass-preset-select {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        color: var(--yyt-text);
        padding: 8px 12px;
        font-size: 13px;
        min-width: 150px;
      }
      
      .yyt-bypass-actions {
        display: flex;
        gap: 8px;
      }
      
      .yyt-bypass-segments {
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-height: 400px;
        overflow-y: auto;
        padding-right: 4px;
      }
      
      .yyt-bypass-segment {
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        overflow: hidden;
        transition: border-color 0.2s ease;
      }
      
      .yyt-bypass-segment:hover {
        border-color: rgba(255, 255, 255, 0.15);
      }
      
      .yyt-segment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        background: rgba(255, 255, 255, 0.02);
        border-bottom: 1px solid var(--yyt-border);
      }
      
      .yyt-segment-role {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .yyt-role-badge {
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        color: white;
        text-transform: uppercase;
      }
      
      .yyt-role-select {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: var(--yyt-text);
        padding: 4px 8px;
        font-size: 12px;
      }
      
      .yyt-segment-actions {
        display: flex;
        gap: 4px;
      }
      
      .yyt-segment-content {
        padding: 12px;
      }
      
      .yyt-content-textarea {
        min-height: 80px;
        resize: vertical;
        font-family: inherit;
      }
      
      .yyt-bypass-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding-top: 8px;
        border-top: 1px solid var(--yyt-border);
      }
      
      .yyt-btn-icon {
        width: 32px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 1px solid transparent;
      }
      
      .yyt-btn-icon:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
      }
      
      .yyt-btn-icon:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
      
      .yyt-btn-danger:hover:not(:disabled) {
        background: rgba(255, 107, 107, 0.15);
        border-color: rgba(255, 107, 107, 0.3);
        color: #ff6b6b;
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

export default BypassEditor;