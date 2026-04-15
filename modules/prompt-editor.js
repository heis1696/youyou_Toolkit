/**
 * YouYou Toolkit - 提示词分层编辑器
 * @description 提供三段式提示词编辑器（System/AI/User），支持展开/折叠、导入/导出
 */

import { destroyEnhancedCustomSelects, enhanceNativeSelects } from './ui/utils.js';

// ============================================================
// 常量定义
// ============================================================

const PROMPT_EDITOR_ID = 'youyou_toolkit_prompt_editor';
const PROMPT_TYPE_LABELS = {
  system: 'System Prompt (系统提示词)',
  ai: 'AI Prompt (AI指令提示词)',
  user: 'User Prompt (用户提示词)'
};

const PROMPT_TYPE_ICONS = {
  system: 'fa-server',
  ai: 'fa-robot',
  user: 'fa-user'
};

// ============================================================
// 默认提示词结构
// ============================================================

export const DEFAULT_PROMPT_SEGMENTS = [
  {
    id: 'system_1',
    type: 'system',
    role: 'SYSTEM',
    mainSlot: '',
    content: '',
    deletable: false,
    expanded: true
  },
  {
    id: 'ai_1',
    type: 'ai',
    role: 'USER',
    mainSlot: 'A',
    content: '',
    deletable: false,
    expanded: true,
    isMain: true
  },
  {
    id: 'user_1',
    type: 'user',
    role: 'USER',
    mainSlot: 'B',
    content: '',
    deletable: false,
    expanded: true,
    isMain2: true
  }
];

// ============================================================
// 提示词编辑器类
// ============================================================

export class PromptEditor {
  constructor(options = {}) {
    this.containerId = options.containerId || PROMPT_EDITOR_ID;
    this.segments = options.segments || [...DEFAULT_PROMPT_SEGMENTS];
    this.onChange = options.onChange || null;
    this.editable = options.editable !== false;
    this.showMainSlot = options.showMainSlot !== false;
    this.$container = null;
    this.$ = null;
  }

  /**
   * 初始化编辑器
   * @param {jQuery} $container - 容器jQuery对象
   */
  init($container) {
    this.$ = window.jQuery || window.parent?.jQuery;
    if (!this.$) {
      console.error('[PromptEditor] jQuery not available');
      return;
    }
    
    this.$container = $container;
    this.render();
    this.bindEvents();
  }

  /**
   * 设置提示词数据
   * @param {Array} segments - 提示词段落数组
   */
  setSegments(segments) {
    this.segments = segments && Array.isArray(segments) ? [...segments] : [...DEFAULT_PROMPT_SEGMENTS];
    if (this.$container) {
      this.render();
      this.bindEvents();
    }
  }

  /**
   * 获取提示词数据
   * @returns {Array}
   */
  getSegments() {
    return this.segments.map(seg => ({
      ...seg,
      content: this.getSegmentContent(seg.id)
    }));
  }

  /**
   * 获取单个段落内容
   * @param {string} segmentId - 段落ID
   * @returns {string}
   */
  getSegmentContent(segmentId) {
    if (!this.$container) return '';
    const $textarea = this.$container.find(`[data-segment-id="${segmentId}"] .yyt-prompt-textarea`);
    return $textarea.val() || '';
  }

  /**
   * 渲染编辑器
   */
  render() {
    if (!this.$container) return;

    const html = `
      <div class="yyt-prompt-editor" id="${this.containerId}">
        <div class="yyt-prompt-editor-header">
          <div class="yyt-prompt-editor-title">
            <i class="fa-solid fa-file-alt"></i>
            <span>提示词编辑器</span>
          </div>
          <div class="yyt-prompt-editor-actions">
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-add-segment" title="添加段落">
              <i class="fa-solid fa-plus"></i> 添加
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-import-prompt" title="导入">
              <i class="fa-solid fa-file-import"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-export-prompt" title="导出">
              <i class="fa-solid fa-file-export"></i>
            </button>
          </div>
        </div>
        <div class="yyt-prompt-segments">
          ${this.segments.map(seg => this.renderSegment(seg)).join('')}
        </div>
      </div>
    `;

    this.$container.html(html);
  }

  /**
   * 渲染单个提示词段落
   * @param {object} segment - 段落配置
   * @returns {string}
   */
  renderSegment(segment) {
    const typeLabel = PROMPT_TYPE_LABELS[segment.type] || segment.type;
    const typeIcon = PROMPT_TYPE_ICONS[segment.type] || 'fa-file';
    const isMainA = segment.mainSlot === 'A' || segment.isMain;
    const isMainB = segment.mainSlot === 'B' || segment.isMain2;
    const borderColor = isMainA ? 'var(--yyt-accent, #7bb7ff)' : (isMainB ? '#ffb74d' : '');
    
    const mainSlotBadge = this.showMainSlot && segment.mainSlot ? 
      `<span class="yyt-prompt-slot-badge">mainSlot: ${segment.mainSlot}</span>` : '';

    const roleBadge = `<span class="yyt-prompt-role-badge">role: ${segment.role || 'USER'}</span>`;

    return `
      <div class="yyt-prompt-segment ${segment.expanded ? 'yyt-expanded' : ''} ${isMainA ? 'yyt-main-a' : ''} ${isMainB ? 'yyt-main-b' : ''}" 
           data-segment-id="${segment.id}" 
           data-segment-type="${segment.type}"
           style="${borderColor ? `border-left: 3px solid ${borderColor};` : ''}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${typeIcon}"></i>
            <span class="yyt-prompt-segment-title">${typeLabel}</span>
            <div class="yyt-prompt-segment-badges">
              ${roleBadge}
              ${mainSlotBadge}
            </div>
          </div>
          <div class="yyt-prompt-segment-controls">
            ${segment.deletable !== false ? `
              <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-prompt-delete" title="删除段落">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : ''}
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-prompt-toggle" title="展开/折叠">
              <i class="fa-solid ${segment.expanded ? 'fa-chevron-up' : 'fa-chevron-down'}"></i>
            </button>
          </div>
        </div>
        <div class="yyt-prompt-segment-body">
          <div class="yyt-prompt-segment-meta">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>Role</label>
                <select class="yyt-select yyt-prompt-role" ${!this.editable ? 'disabled' : ''}>
                  <option value="SYSTEM" ${segment.role === 'SYSTEM' ? 'selected' : ''}>SYSTEM</option>
                  <option value="USER" ${segment.role === 'USER' ? 'selected' : ''}>USER</option>
                  <option value="assistant" ${segment.role === 'assistant' ? 'selected' : ''}>assistant</option>
                </select>
              </div>
              ${this.showMainSlot ? `
              <div class="yyt-form-group yyt-flex-1">
                <label>Main Slot</label>
                <select class="yyt-select yyt-prompt-main-slot" ${!this.editable ? 'disabled' : ''}>
                  <option value="" ${!segment.mainSlot ? 'selected' : ''}>普通</option>
                  <option value="A" ${segment.mainSlot === 'A' ? 'selected' : ''}>A (建议System)</option>
                  <option value="B" ${segment.mainSlot === 'B' ? 'selected' : ''}>B (建议User)</option>
                </select>
              </div>
              ` : ''}
            </div>
          </div>
          <textarea class="yyt-textarea yyt-prompt-textarea" 
                    rows="6" 
                    placeholder="输入提示词内容..." 
                    ${!this.editable ? 'disabled' : ''}>${this.escapeHtml(segment.content || '')}</textarea>
        </div>
      </div>
    `;
  }

  /**
   * 绑定事件
   */
  bindEvents() {
    if (!this.$container) return;

    destroyEnhancedCustomSelects(this.$container, 'yytPromptEditorSelect');
    this.$container.off('.yytPromptEditor');

    // 展开/折叠
    this.$container.on('click.yytPromptEditor', '.yyt-prompt-toggle', (e) => {
      const $segment = this.$(e.currentTarget).closest('.yyt-prompt-segment');
      $segment.toggleClass('yyt-expanded');
      const $icon = this.$(e.currentTarget).find('i');
      $icon.toggleClass('fa-chevron-up fa-chevron-down');
    });

    // 删除段落
    this.$container.on('click.yytPromptEditor', '.yyt-prompt-delete', (e) => {
      const segmentId = this.$(e.currentTarget).closest('.yyt-prompt-segment').data('segment-id');
      this.deleteSegment(segmentId);
    });

    // 角色变化
    this.$container.on('change.yytPromptEditor', '.yyt-prompt-role', (e) => {
      const segmentId = this.$(e.currentTarget).closest('.yyt-prompt-segment').data('segment-id');
      const role = this.$(e.currentTarget).val();
      this.updateSegmentMeta(segmentId, { role });
    });

    // Main Slot变化
    this.$container.on('change.yytPromptEditor', '.yyt-prompt-main-slot', (e) => {
      const segmentId = this.$(e.currentTarget).closest('.yyt-prompt-segment').data('segment-id');
      const mainSlot = this.$(e.currentTarget).val();
      this.updateSegmentMeta(segmentId, { mainSlot });
    });

    // 内容变化
    this.$container.on('input.yytPromptEditor', '.yyt-prompt-textarea', (e) => {
      if (this.onChange) {
        this.onChange(this.getSegments());
      }
    });

    // 添加段落
    this.$container.on('click.yytPromptEditor', `#${this.containerId}-add-segment`, () => {
      this.addSegment();
    });

    // 导入
    this.$container.on('click.yytPromptEditor', `#${this.containerId}-import-prompt`, () => {
      this.importPrompt();
    });

    // 导出
    this.$container.on('click.yytPromptEditor', `#${this.containerId}-export-prompt`, () => {
      this.exportPrompt();
    });

    enhanceNativeSelects(this.$container, {
      namespace: 'yytPromptEditorSelect',
      selectors: ['.yyt-prompt-role', '.yyt-prompt-main-slot']
    });
  }

  /**
   * 添加段落
   * @param {object} segmentData - 段落数据（可选）
   */
  addSegment(segmentData = null) {
    const newId = `segment_${Date.now()}`;
    const newSegment = segmentData || {
      id: newId,
      type: 'user',
      role: 'USER',
      mainSlot: '',
      content: '',
      deletable: true,
      expanded: true
    };
    
    if (!newSegment.id) newSegment.id = newId;
    
    this.segments.push(newSegment);
    this.render();
    this.bindEvents();
    
    if (this.onChange) {
      this.onChange(this.getSegments());
    }
  }

  /**
   * 删除段落
   * @param {string} segmentId - 段落ID
   */
  deleteSegment(segmentId) {
    const index = this.segments.findIndex(s => s.id === segmentId);
    if (index === -1) return;
    
    const segment = this.segments[index];
    if (segment.deletable === false) {
      console.warn('[PromptEditor] 该段落不可删除');
      return;
    }
    
    this.segments.splice(index, 1);
    this.render();
    this.bindEvents();
    
    if (this.onChange) {
      this.onChange(this.getSegments());
    }
  }

  /**
   * 更新段落元数据
   * @param {string} segmentId - 段落ID
   * @param {object} meta - 元数据
   */
  updateSegmentMeta(segmentId, meta) {
    const segment = this.segments.find(s => s.id === segmentId);
    if (!segment) return;
    
    Object.assign(segment, meta);
    
    if (this.onChange) {
      this.onChange(this.getSegments());
    }
  }

  /**
   * 导入提示词
   */
  importPrompt() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          if (Array.isArray(data)) {
            this.setSegments(data);
            console.log('[PromptEditor] 提示词导入成功');
          } else {
            console.error('[PromptEditor] 无效的提示词格式');
          }
        } catch (err) {
          console.error('[PromptEditor] 导入失败:', err);
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  }

  /**
   * 导出提示词
   */
  exportPrompt() {
    const data = this.getSegments();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt_group_${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
    console.log('[PromptEditor] 提示词已导出');
  }

  destroy() {
    if (!this.$container) return;
    destroyEnhancedCustomSelects(this.$container, 'yytPromptEditorSelect');
    this.$container.off('.yytPromptEditor');
  }

  /**
   * HTML转义
   * @param {string} unsafe - 原始字符串
   * @returns {string}
   */
  escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// ============================================================
// 样式获取
// ============================================================

export function getPromptEditorStyles() {
  return `
    /* ============================================================
       提示词编辑器样式
       ============================================================ */
    
    .yyt-prompt-editor {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: transparent;
    }
    
    .yyt-prompt-editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      flex-shrink: 0;
    }
    
    .yyt-prompt-editor-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-prompt-editor-title i {
      color: var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-editor-actions {
      display: flex;
      gap: 8px;
    }
    
    .yyt-prompt-segments {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .yyt-prompt-segment {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease;
    }
    
    .yyt-prompt-segment:hover {
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-prompt-segment.yyt-main-a {
      border-left: 3px solid var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-segment.yyt-main-b {
      border-left: 3px solid #ffb74d;
    }
    
    .yyt-prompt-segment-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      cursor: pointer;
      user-select: none;
    }
    
    .yyt-prompt-segment-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .yyt-prompt-segment-info > i {
      color: var(--yyt-accent, #7bb7ff);
      font-size: 14px;
    }
    
    .yyt-prompt-segment-title {
      font-weight: 600;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-prompt-segment-badges {
      display: flex;
      gap: 6px;
      margin-left: 8px;
    }
    
    .yyt-prompt-role-badge,
    .yyt-prompt-slot-badge {
      font-size: 10px;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-weight: 500;
    }
    
    .yyt-prompt-role-badge {
      background: rgba(123, 183, 255, 0.1);
      color: var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-slot-badge {
      background: rgba(255, 183, 77, 0.1);
      color: #ffb74d;
    }
    
    .yyt-prompt-segment-controls {
      display: flex;
      gap: 6px;
    }
    
    .yyt-prompt-segment-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    
    .yyt-prompt-segment.yyt-expanded .yyt-prompt-segment-body {
      max-height: 600px;
    }
    
    .yyt-prompt-segment-meta {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    
    .yyt-prompt-segment-meta .yyt-form-row {
      display: flex;
      gap: 12px;
    }
    
    .yyt-prompt-segment-meta .yyt-form-group {
      flex: 1;
    }
    
    .yyt-prompt-segment-meta label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .yyt-prompt-textarea {
      width: 100%;
      min-height: 120px;
      padding: 12px 16px;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.85);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.6;
      resize: vertical;
    }
    
    .yyt-prompt-textarea:focus {
      outline: none;
    }
    
    .yyt-prompt-textarea::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  `;
}

// ============================================================
// 辅助函数
// ============================================================

/**
 * 验证提示词数据
 * @param {Array} segments - 提示词段落数组
 * @returns {object} { valid: boolean, errors: string[] }
 */
export function validatePromptSegments(segments) {
  const errors = [];
  
  if (!Array.isArray(segments)) {
    return { valid: false, errors: ['提示词数据必须是数组'] };
  }
  
  segments.forEach((seg, index) => {
    if (!seg.id) {
      errors.push(`段落 ${index + 1} 缺少ID`);
    }
    if (!seg.role) {
      errors.push(`段落 ${index + 1} 缺少role字段`);
    }
    if (!['SYSTEM', 'USER', 'assistant'].includes(seg.role)) {
      errors.push(`段落 ${index + 1} 的role值无效: ${seg.role}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 合并提示词为消息数组
 * @param {Array} segments - 提示词段落数组
 * @returns {Array} 消息数组
 */
export function segmentsToMessages(segments) {
  return segments
    .filter(seg => seg.content && seg.content.trim())
    .map(seg => ({
      role: seg.role,
      content: seg.content,
      deletable: seg.deletable,
      mainSlot: seg.mainSlot
    }));
}

/**
 * 从消息数组创建提示词段落
 * @param {Array} messages - 消息数组
 * @returns {Array} 提示词段落数组
 */
export function messagesToSegments(messages) {
  if (!Array.isArray(messages)) return [...DEFAULT_PROMPT_SEGMENTS];
  
  return messages.map((msg, index) => ({
    id: `segment_${index}_${Date.now()}`,
    type: msg.role === 'SYSTEM' ? 'system' : (msg.role === 'assistant' ? 'ai' : 'user'),
    role: msg.role,
    mainSlot: msg.mainSlot || '',
    content: msg.content || '',
    deletable: msg.deletable !== false,
    expanded: true,
    isMain: msg.mainSlot === 'A' || msg.isMain,
    isMain2: msg.mainSlot === 'B' || msg.isMain2
  }));
}

// 默认导出
export default PromptEditor;