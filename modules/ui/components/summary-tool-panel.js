/**
 * YouYou Toolkit - 摘要工具面板组件
 * @description 生成剧情摘要块
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { 
  SCRIPT_ID, 
  escapeHtml, 
  showToast, 
  getJQuery, 
  isContainerValid,
  copyToClipboard
} from '../utils.js';

// ============================================================
// 默认摘要模板
// ============================================================

const DEFAULT_SUMMARY_TEMPLATE = `<boo_FM>
<pg>No.{{pg}}</pg>
<time>{{time}}</time>
<scene>{{scene}}</scene>

<plot>
{{plot}}
</plot>

<event>
MQ.{{mq}} | {{mqStatus}}
SQ.{{sq}} | {{sqStatus}}
本轮完成：{{completed}}
最新支线编号：SQ.{{latestSq}}
</event>

<defined>
{{defined}}
</defined>

<status>
{{status}}
</status>

<seeds>
{{seeds}}
</seeds>
</boo_FM>`;

// ============================================================
// 存储键
// ============================================================

const SUMMARY_STORAGE_KEYS = {
  TEMPLATE: 'summary_template',
  PG: 'summary_pg',
  MQ: 'summary_mq',
  SQ: 'summary_sq',
  HISTORY: 'summary_history'
};

// ============================================================
// 组件定义
// ============================================================

export const SummaryToolPanel = {
  id: 'summaryToolPanel',
  
  // ============================================================
  // 渲染
  // ============================================================
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const template = this._getTemplate();
    const state = this._getState();
    
    return `
      <div class="yyt-summary-panel">
        <!-- 状态设置 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-list-ol"></i>
            <span>编号设置</span>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>页码 (pg)</label>
              <input type="number" class="yyt-input" id="${SCRIPT_ID}-summary-pg" value="${state.pg}" min="1">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>主线 (MQ)</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-summary-mq" value="${state.mq}" placeholder="Ⅰ">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>主线状态</label>
              <select class="yyt-select" id="${SCRIPT_ID}-summary-mq-status">
                <option value="进行中" ${state.mqStatus === '进行中' ? 'selected' : ''}>进行中</option>
                <option value="已完成" ${state.mqStatus === '已完成' ? 'selected' : ''}>已完成</option>
                <option value="搁置" ${state.mqStatus === '搁置' ? 'selected' : ''}>搁置</option>
              </select>
            </div>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>支线 (SQ)</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-summary-sq" value="${state.sq}" placeholder="1">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>支线状态</label>
              <select class="yyt-select" id="${SCRIPT_ID}-summary-sq-status">
                <option value="进行中" ${state.sqStatus === '进行中' ? 'selected' : ''}>进行中</option>
                <option value="已完成" ${state.sqStatus === '已完成' ? 'selected' : ''}>已完成</option>
                <option value="搁置" ${state.sqStatus === '搁置' ? 'selected' : ''}>搁置</option>
              </select>
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>最新支线编号</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-summary-latest-sq" value="${state.latestSq}" placeholder="1">
            </div>
          </div>
        </div>
        
        <!-- 内容编辑 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-edit"></i>
            <span>内容编辑</span>
          </div>
          <div class="yyt-form-group">
            <label>时间 (格式: yyyy-MM-dd HH:mm → HH:mm)</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-summary-time" value="${state.time}" placeholder="2024-01-01 12:00 → 13:00">
          </div>
          <div class="yyt-form-group">
            <label>场景/地点</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-summary-scene" value="${escapeHtml(state.scene)}" placeholder="场景/地点，移动需标注">
          </div>
          <div class="yyt-form-group">
            <label>剧情概要 (80-150字，全知视角纯文本)</label>
            <textarea class="yyt-textarea" id="${SCRIPT_ID}-summary-plot" rows="4" placeholder="含关键对话引用、动作序列、因果链。不做心理分析">${escapeHtml(state.plot)}</textarea>
          </div>
          <div class="yyt-form-group">
            <label>本轮完成</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-summary-completed" value="${escapeHtml(state.completed)}" placeholder="无 或 完成的事件">
          </div>
        </div>
        
        <!-- defined和status -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-lock"></i>
            <span>约束与状态</span>
          </div>
          <div class="yyt-form-group">
            <label>defined (硬约束: 口令、契约条款、数值、倒计时、发动代价等)</label>
            <textarea class="yyt-textarea yyt-code-textarea" id="${SCRIPT_ID}-summary-defined" rows="3" placeholder="<kv>类别 :: 精确条件原文</kv>">${escapeHtml(state.defined)}</textarea>
          </div>
          <div class="yyt-form-group">
            <label>status (角色状态，格式: 角色 | 位置 | 状态 | 关键物)</label>
            <textarea class="yyt-textarea" id="${SCRIPT_ID}-summary-status" rows="3" placeholder="角色 | 位置 | 状态 | 关键物">${escapeHtml(state.status)}</textarea>
          </div>
        </div>
        
        <!-- seeds -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-seedling"></i>
            <span>伏笔 (seeds上限8条)</span>
          </div>
          <div class="yyt-form-group">
            <label>seeds内容 (格式: 名称 | 内容 | 时效:长/中/短 | 状态:有效/回收中/已回收/失效)</label>
            <textarea class="yyt-textarea" id="${SCRIPT_ID}-summary-seeds" rows="3" placeholder="<fb>名称 | 内容 | 时效:长 | 状态:有效</fb>">${escapeHtml(state.seeds)}</textarea>
          </div>
          <div class="yyt-form-row">
            <input type="text" class="yyt-input yyt-flex-1" id="${SCRIPT_ID}-summary-seeds-change" placeholder="变动：新增X/回收X/失效X/无">
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-summary-reset">
              <i class="fa-solid fa-undo"></i> 重置
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-summary-clear-completed">
              <i class="fa-solid fa-broom"></i> 清理已完成
            </button>
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-summary-generate">
              <i class="fa-solid fa-wand-magic-sparkles"></i> 生成摘要
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-summary-copy">
              <i class="fa-solid fa-copy"></i> 复制
            </button>
          </div>
        </div>
        
        <!-- 预览区域 -->
        <div class="yyt-panel-section" id="${SCRIPT_ID}-summary-preview-section" style="display: none;">
          <div class="yyt-section-title">
            <i class="fa-solid fa-eye"></i>
            <span>预览</span>
          </div>
          <div class="yyt-summary-preview" id="${SCRIPT_ID}-summary-preview"></div>
        </div>
      </div>
    `;
  },
  
  // ============================================================
  // 私有方法
  // ============================================================
  
  /**
   * 获取模板
   * @private
   */
  _getTemplate() {
    const stored = localStorage.getItem(`${SCRIPT_ID}_${SUMMARY_STORAGE_KEYS.TEMPLATE}`);
    return stored || DEFAULT_SUMMARY_TEMPLATE;
  },
  
  /**
   * 获取状态
   * @private
   */
  _getState() {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    return {
      pg: parseInt(localStorage.getItem(`${SCRIPT_ID}_${SUMMARY_STORAGE_KEYS.PG}`)) || 1,
      mq: localStorage.getItem(`${SCRIPT_ID}_${SUMMARY_STORAGE_KEYS.MQ}`) || 'Ⅰ',
      mqStatus: '进行中',
      sq: localStorage.getItem(`${SCRIPT_ID}_${SUMMARY_STORAGE_KEYS.SQ}`) || '1',
      sqStatus: '进行中',
      latestSq: localStorage.getItem(`${SCRIPT_ID}_${SUMMARY_STORAGE_KEYS.SQ}`) || '1',
      time: timeStr,
      scene: '',
      plot: '',
      completed: '无',
      defined: '',
      status: '',
      seeds: ''
    };
  },
  
  /**
   * 保存状态
   * @private
   */
  _saveState(state) {
    localStorage.setItem(`${SCRIPT_ID}_${SUMMARY_STORAGE_KEYS.PG}`, state.pg);
    localStorage.setItem(`${SCRIPT_ID}_${SUMMARY_STORAGE_KEYS.MQ}`, state.mq);
    localStorage.setItem(`${SCRIPT_ID}_${SUMMARY_STORAGE_KEYS.SQ}`, state.sq);
  },
  
  /**
   * 从表单获取数据
   * @private
   */
  _getFormData($container, $) {
    return {
      pg: parseInt($container.find(`#${SCRIPT_ID}-summary-pg`).val()) || 1,
      mq: $container.find(`#${SCRIPT_ID}-summary-mq`).val() || 'Ⅰ',
      mqStatus: $container.find(`#${SCRIPT_ID}-summary-mq-status`).val() || '进行中',
      sq: $container.find(`#${SCRIPT_ID}-summary-sq`).val() || '1',
      sqStatus: $container.find(`#${SCRIPT_ID}-summary-sq-status`).val() || '进行中',
      latestSq: $container.find(`#${SCRIPT_ID}-summary-latest-sq`).val() || '1',
      time: $container.find(`#${SCRIPT_ID}-summary-time`).val() || '',
      scene: $container.find(`#${SCRIPT_ID}-summary-scene`).val() || '',
      plot: $container.find(`#${SCRIPT_ID}-summary-plot`).val() || '',
      completed: $container.find(`#${SCRIPT_ID}-summary-completed`).val() || '无',
      defined: $container.find(`#${SCRIPT_ID}-summary-defined`).val() || '',
      status: $container.find(`#${SCRIPT_ID}-summary-status`).val() || '',
      seeds: $container.find(`#${SCRIPT_ID}-summary-seeds`).val() || '',
      seedsChange: $container.find(`#${SCRIPT_ID}-summary-seeds-change`).val() || '无'
    };
  },
  
  /**
   * 生成摘要文本
   * @private
   */
  _generateSummary(data) {
    let definedContent = data.defined;
    if (!definedContent.trim()) {
      definedContent = '<!-- 无硬约束 -->';
    }
    
    let statusContent = data.status;
    if (!statusContent.trim()) {
      statusContent = '<!-- 无状态更新 -->';
    }
    
    let seedsContent = data.seeds;
    if (!seedsContent.trim()) {
      seedsContent = '<!-- 无伏笔 -->';
    } else {
      seedsContent += `\n<!-- 变动：${data.seedsChange} -->`;
    }
    
    return `<boo_FM>
<pg>No.${data.pg}</pg>
<time>${data.time}</time>
<scene>${data.scene}</scene>

<plot>
${data.plot}
</plot>

<event>
MQ.${data.mq} | ${data.mqStatus}
SQ.${data.sq} | ${data.sqStatus}
本轮完成：${data.completed}
最新支线编号：SQ.${data.latestSq}
</event>

<defined>
${definedContent}
</defined>

<status>
${statusContent}
</status>

<seeds>
${seedsContent}
</seeds>
</boo_FM>`;
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
    
    // 生成摘要
    $container.find(`#${SCRIPT_ID}-summary-generate`).on('click', () => {
      const data = this._getFormData($container, $);
      this._saveState(data);
      
      const summary = this._generateSummary(data);
      
      $container.find(`#${SCRIPT_ID}-summary-preview`).html(`<pre class="yyt-code-block">${escapeHtml(summary)}</pre>`);
      $container.find(`#${SCRIPT_ID}-summary-preview-section`).show();
      
      // 自动增加页码
      $container.find(`#${SCRIPT_ID}-summary-pg`).val(data.pg + 1);
      
      showToast('success', '摘要已生成');
    });
    
    // 复制摘要
    $container.find(`#${SCRIPT_ID}-summary-copy`).on('click', async () => {
      const previewText = $container.find(`#${SCRIPT_ID}-summary-preview pre`).text();
      if (!previewText) {
        showToast('warning', '请先生成摘要');
        return;
      }
      
      try {
        await navigator.clipboard.writeText(previewText);
        showToast('success', '已复制到剪贴板');
      } catch (e) {
        showToast('error', '复制失败');
      }
    });
    
    // 重置
    $container.find(`#${SCRIPT_ID}-summary-reset`).on('click', () => {
      if (confirm('确定要重置所有内容吗？')) {
        $container.find(`#${SCRIPT_ID}-summary-scene`).val('');
        $container.find(`#${SCRIPT_ID}-summary-plot`).val('');
        $container.find(`#${SCRIPT_ID}-summary-completed`).val('无');
        $container.find(`#${SCRIPT_ID}-summary-defined`).val('');
        $container.find(`#${SCRIPT_ID}-summary-status`).val('');
        $container.find(`#${SCRIPT_ID}-summary-seeds`).val('');
        $container.find(`#${SCRIPT_ID}-summary-seeds-change`).val('');
        $container.find(`#${SCRIPT_ID}-summary-preview-section`).hide();
        showToast('info', '已重置');
      }
    });
    
    // 清理已完成
    $container.find(`#${SCRIPT_ID}-summary-clear-completed`).on('click', () => {
      // 清理已完成的event
      const mqStatus = $container.find(`#${SCRIPT_ID}-summary-mq-status`).val();
      const sqStatus = $container.find(`#${SCRIPT_ID}-summary-sq-status`).val();
      
      if (mqStatus === '已完成') {
        $container.find(`#${SCRIPT_ID}-summary-mq`).val('Ⅱ');
        $container.find(`#${SCRIPT_ID}-summary-mq-status`).val('进行中');
      }
      
      if (sqStatus === '已完成') {
        const currentSq = parseInt($container.find(`#${SCRIPT_ID}-summary-sq`).val()) || 1;
        $container.find(`#${SCRIPT_ID}-summary-sq`).val(currentSq + 1);
        $container.find(`#${SCRIPT_ID}-summary-sq-status`).val('进行中');
        $container.find(`#${SCRIPT_ID}-summary-latest-sq`).val(currentSq + 1);
      }
      
      // 清理defined和seeds中的已完成项
      // 这里只做提示，实际需要用户手动清理
      showToast('info', '已清理已完成事件，请手动清理defined和seeds中的失效项');
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
      /* 摘要工具面板样式 */
      .yyt-summary-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-summary-preview {
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        padding: 14px;
        max-height: 400px;
        overflow-y: auto;
      }
      
      .yyt-summary-preview .yyt-code-block {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
        padding: 12px;
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 12px;
        color: var(--yyt-success);
        white-space: pre-wrap;
        word-break: break-all;
        margin: 0;
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

export default SummaryToolPanel;