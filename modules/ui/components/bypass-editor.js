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
      <div class="yyt-bypass-segment" data-index="${index}" data-deletable="${deletable}" data-role="${role}">
        <div class="yyt-segment-header">
          <div class="yyt-segment-number">#${index + 1}</div>
          <div class="yyt-segment-role">
            <select class="yyt-role-select" data-current-color="${roleInfo.color}" ${readonly || !deletable ? 'disabled' : ''}>
              ${ROLE_OPTIONS.map(r => 
                `<option value="${r.value}" ${r.value === role ? 'selected' : ''} data-color="${r.color}">
                  ${r.label}
                </option>`
              ).join('')}
            </select>
          </div>
          <div class="yyt-segment-actions">
            <button class="yyt-segment-action-btn" data-action="move-up" title="上移" ${index === 0 ? 'disabled' : ''}>
              <i class="fa-solid fa-chevron-up"></i>
            </button>
            <button class="yyt-segment-action-btn" data-action="move-down" title="下移">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            ${deletable && !readonly ? `
              <button class="yyt-segment-action-btn yyt-action-danger" data-action="delete" title="删除">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            ` : ''}
          </div>
        </div>
        <div class="yyt-segment-content">
          <textarea 
            class="yyt-content-textarea" 
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
   * 更新角色边框颜色
   * @private
   */
  _updateRoleBadge($segment, $, newRole) {
    // 更新 data-role 属性以改变左边框颜色
    $segment.attr('data-role', newRole);
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
      /* 破限词可视化编辑器样式 - 优化版 */
      .yyt-bypass-editor {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      /* 工具栏 */
      .yyt-bypass-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 16px 18px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius);
      }
      
      .yyt-bypass-preset-select {
        flex: 1;
        max-width: 240px;
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: var(--yyt-radius-sm);
        color: var(--yyt-text);
        padding: 10px 14px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .yyt-bypass-preset-select:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background: rgba(0, 0, 0, 0.3);
      }
      
      .yyt-bypass-preset-select:focus {
        outline: none;
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 3px rgba(123, 183, 255, 0.15);
      }
      
      .yyt-bypass-actions {
        display: flex;
        gap: 10px;
      }
      
      /* 段落列表 */
      .yyt-bypass-segments {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-height: 450px;
        overflow-y: auto;
        padding: 4px;
        margin: -4px;
      }
      
      .yyt-bypass-segments::-webkit-scrollbar {
        width: 5px;
      }
      
      .yyt-bypass-segments::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .yyt-bypass-segments::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 3px;
      }
      
      /* 单个段落卡片 */
      .yyt-bypass-segment {
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--yyt-radius);
        overflow: hidden;
        transition: all 0.25s ease;
      }
      
      .yyt-bypass-segment:hover {
        border-color: rgba(255, 255, 255, 0.18);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      }
      
      /* 段落头部 */
      .yyt-segment-header {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.03);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-segment-number {
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        min-width: 24px;
      }
      
      .yyt-segment-role {
        flex: 1;
      }
      
      .yyt-role-select {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        color: var(--yyt-text);
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 140px;
      }
      
      .yyt-role-select:hover:not(:disabled) {
        border-color: rgba(255, 255, 255, 0.2);
      }
      
      .yyt-role-select:focus {
        outline: none;
        border-color: var(--yyt-accent);
      }
      
      /* 根据角色设置左边框颜色 */
      .yyt-bypass-segment[data-role="SYSTEM"] {
        border-left: 3px solid #ff6b6b;
      }
      
      .yyt-bypass-segment[data-role="USER"] {
        border-left: 3px solid #4dabf7;
      }
      
      .yyt-bypass-segment[data-role="assistant"] {
        border-left: 3px solid #69db7c;
      }
      
      /* 段落操作按钮 */
      .yyt-segment-actions {
        display: flex;
        gap: 6px;
        margin-left: auto;
      }
      
      .yyt-segment-action-btn {
        width: 30px;
        height: 30px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .yyt-segment-action-btn:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.9);
      }
      
      .yyt-segment-action-btn:disabled {
        opacity: 0.2;
        cursor: not-allowed;
      }
      
      .yyt-segment-action-btn.yy-action-danger:hover:not(:disabled) {
        background: rgba(255, 107, 107, 0.15);
        border-color: rgba(255, 107, 107, 0.25);
        color: #ff6b6b;
      }
      
      /* 段落内容区 */
      .yyt-segment-content {
        padding: 16px;
      }
      
      .yyt-content-textarea {
        width: 100%;
        min-height: 100px;
        padding: 14px 16px;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--yyt-radius-sm);
        color: var(--yyt-text);
        font-size: 13px;
        line-height: 1.6;
        resize: vertical;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
        transition: all 0.2s ease;
      }
      
      .yyt-content-textarea:hover {
        border-color: rgba(255, 255, 255, 0.18);
      }
      
      .yyt-content-textarea:focus {
        outline: none;
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 3px rgba(123, 183, 255, 0.12);
        background: rgba(0, 0, 0, 0.25);
      }
      
      .yyt-content-textarea::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
      
      /* 底部操作栏 */
      .yyt-bypass-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding-top: 16px;
        margin-top: 4px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      /* 响应式调整 */
      @media (max-width: 600px) {
        .yyt-bypass-toolbar {
          flex-direction: column;
          align-items: stretch;
        }
        
        .yyt-bypass-preset-select {
          max-width: none;
        }
        
        .yyt-bypass-actions {
          justify-content: center;
        }
        
        .yyt-segment-header {
          flex-wrap: wrap;
        }
        
        .yyt-segment-actions {
          margin-left: 0;
          width: 100%;
          justify-content: flex-end;
          margin-top: 8px;
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

export default BypassEditor;