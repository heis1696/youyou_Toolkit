/**
 * YouYou Toolkit - 主角状态栏面板组件
 * @description 生成主角状态代码块
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

// ============================================================
// 存储键
// ============================================================

const STATUS_STORAGE_KEY = `${SCRIPT_ID}_status_state`;

// ============================================================
// 默认状态
// ============================================================

const DEFAULT_STATE = {
  // 环境
  weekDay: '一',
  date: '',
  time: '',
  location: '',
  weather: '',
  
  // 角色检视
  sceneDynamic: '',
  face: '',
  legs: '',
  feet: '',
  back: '',
  chest: '',
  genital: '',
  buttocks: '',
  anus: '',
  special: '无',
  
  // 生命体征
  bladder: 50,
  bladderDesc: '正常',
  emotion: '',
  microExpression: '',
  period: '卵泡期',
  
  // 装备
  top: '无',
  bra: '无',
  bottom: '无',
  panties: '无',
  socks: '无',
  shoes: '无',
  accessory: '无',
  sexToy: '无'
};

// ============================================================
// 组件定义
// ============================================================

export const StatusBlockPanel = {
  id: 'statusBlockPanel',
  
  // ============================================================
  // 渲染
  // ============================================================
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const state = this._getState();
    
    return `
      <div class="yyt-status-panel">
        <!-- 环境设置 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-globe"></i>
            <span>环境设置</span>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>星期</label>
              <select class="yyt-select" id="${SCRIPT_ID}-status-weekday">
                <option value="日" ${state.weekDay === '日' ? 'selected' : ''}>周日</option>
                <option value="一" ${state.weekDay === '一' ? 'selected' : ''}>周一</option>
                <option value="二" ${state.weekDay === '二' ? 'selected' : ''}>周二</option>
                <option value="三" ${state.weekDay === '三' ? 'selected' : ''}>周三</option>
                <option value="四" ${state.weekDay === '四' ? 'selected' : ''}>周四</option>
                <option value="五" ${state.weekDay === '五' ? 'selected' : ''}>周五</option>
                <option value="六" ${state.weekDay === '六' ? 'selected' : ''}>周六</option>
              </select>
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>日期 (年/月/日)</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-date" value="${escapeHtml(state.date)}" placeholder="2024/01/01">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>时间 (时:分)</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-time" value="${escapeHtml(state.time)}" placeholder="12:00">
            </div>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>具体位置-场所细节</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-location" value="${escapeHtml(state.location)}" placeholder="地点-场所细节">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>天气/体感/温度</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-weather" value="${escapeHtml(state.weather)}" placeholder="晴朗/温暖/25°C">
            </div>
          </div>
        </div>
        
        <!-- 角色检视 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-user"></i>
            <span>角色检视</span>
          </div>
          <div class="yyt-form-group">
            <label>🎬 场景动态 (三视图描述)</label>
            <textarea class="yyt-textarea" id="${SCRIPT_ID}-status-scene" rows="3" placeholder="以游戏CG的三视图形式，以第三人称视角从三个方向详尽描述此刻角色在场景中的整体画面">${escapeHtml(state.sceneDynamic)}</textarea>
          </div>
          <div class="yyt-status-grid">
            <div class="yyt-form-group">
              <label>👤 面部</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-face" value="${escapeHtml(state.face)}" placeholder="表情/眼神/嘴唇/脸颊/汗水等细节">
            </div>
            <div class="yyt-form-group">
              <label>🦵 腿部</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-legs" value="${escapeHtml(state.legs)}" placeholder="大腿肌肉/膝盖/小腿/站姿/并拢度">
            </div>
            <div class="yyt-form-group">
              <label>🦶 足部</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-feet" value="${escapeHtml(state.feet)}" placeholder="脚掌/脚趾/站立/悬空/鞋袜状态">
            </div>
            <div class="yyt-form-group">
              <label>💫 背部</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-back" value="${escapeHtml(state.back)}" placeholder="脊椎/肩胛骨/腰窝/皮肤状态">
            </div>
            <div class="yyt-form-group">
              <label>🍒 胸部</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-chest" value="${escapeHtml(state.chest)}" placeholder="形态/乳头状态/起伏/敏感度/衣物遮蔽">
            </div>
            <div class="yyt-form-group">
              <label>🍑 性器</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-genital" value="${escapeHtml(state.genital)}" placeholder="外观/湿润度/敏感度/阴毛/衣物遮蔽">
            </div>
            <div class="yyt-form-group">
              <label>🍑 臀部</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-buttocks" value="${escapeHtml(state.buttocks)}" placeholder="形状/衣物包裹/褶皱/肌肉状态">
            </div>
            <div class="yyt-form-group">
              <label>🌸 后庭</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-anus" value="${escapeHtml(state.anus)}" placeholder="括约肌状态/润滑度/扩张度/可见度">
            </div>
            <div class="yyt-form-group">
              <label>🦴 特殊部位</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-special" value="${escapeHtml(state.special)}" placeholder="尾巴/翅膀/兽耳等，若无则写'无'">
            </div>
          </div>
        </div>
        
        <!-- 生命体征 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-heart-pulse"></i>
            <span>生命体征</span>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>🚽 膀胱</label>
              <div class="yyt-slider-row">
                <input type="range" class="yyt-slider" id="${SCRIPT_ID}-status-bladder" min="0" max="100" value="${state.bladder}">
                <span class="yyt-slider-value" id="${SCRIPT_ID}-status-bladder-value">${state.bladder}/100</span>
              </div>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-bladder-desc" value="${escapeHtml(state.bladderDesc)}" placeholder="尿意感受">
            </div>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>😊 情绪</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-emotion" value="${escapeHtml(state.emotion)}" placeholder="主导情绪+次要情绪">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>微表情</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-micro" value="${escapeHtml(state.microExpression)}" placeholder="微表情描述">
            </div>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>🩸 生理期</label>
              <select class="yyt-select" id="${SCRIPT_ID}-status-period">
                <option value="卵泡期" ${state.period === '卵泡期' ? 'selected' : ''}>卵泡期</option>
                <option value="排卵期" ${state.period === '排卵期' ? 'selected' : ''}>排卵期</option>
                <option value="黄体期" ${state.period === '黄体期' ? 'selected' : ''}>黄体期</option>
                <option value="月经期" ${state.period === '月经期' ? 'selected' : ''}>月经期</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- 装备详情 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-shirt"></i>
            <span>装备详情</span>
          </div>
          <div class="yyt-status-grid">
            <div class="yyt-form-group">
              <label>👔 上衣</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-top" value="${escapeHtml(state.top)}" placeholder="款式+颜色+完整度+湿润度，若无则写'无'">
            </div>
            <div class="yyt-form-group">
              <label>👙 胸衣</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-bra" value="${escapeHtml(state.bra)}" placeholder="款式+颜色+位置+遮蔽度，若无则写'无'">
            </div>
            <div class="yyt-form-group">
              <label>👖 下装</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-bottom" value="${escapeHtml(state.bottom)}" placeholder="款式+颜色+状态+褶皱+污渍，若无则写'无'">
            </div>
            <div class="yyt-form-group">
              <label>🩲 内裤</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-panties" value="${escapeHtml(state.panties)}" placeholder="款式+颜色+位置偏移+湿润度，若无则写'无'">
            </div>
            <div class="yyt-form-group">
              <label>🧦 腿袜</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-socks" value="${escapeHtml(state.socks)}" placeholder="类型+颜色+长度+破损+褶皱，若无则写'无'">
            </div>
            <div class="yyt-form-group">
              <label>👠 鞋履</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-shoes" value="${escapeHtml(state.shoes)}" placeholder="类型+颜色+穿着状态+清洁度，若无则写'无'">
            </div>
            <div class="yyt-form-group">
              <label>🎀 配饰</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-accessory" value="${escapeHtml(state.accessory)}" placeholder="所有饰品/道具/特殊装备，若无则写'无'">
            </div>
            <div class="yyt-form-group">
              <label>🕹️ 性道具</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-status-sextoy" value="${escapeHtml(state.sexToy)}" placeholder="名称+位置+状态+档位，若无则写'无'">
            </div>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-status-reset">
              <i class="fa-solid fa-undo"></i> 重置
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-status-save">
              <i class="fa-solid fa-save"></i> 保存状态
            </button>
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-status-generate">
              <i class="fa-solid fa-wand-magic-sparkles"></i> 生成状态栏
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-status-copy">
              <i class="fa-solid fa-copy"></i> 复制
            </button>
          </div>
        </div>
        
        <!-- 预览区域 -->
        <div class="yyt-panel-section" id="${SCRIPT_ID}-status-preview-section" style="display: none;">
          <div class="yyt-section-title">
            <i class="fa-solid fa-eye"></i>
            <span>预览</span>
          </div>
          <div class="yyt-status-preview" id="${SCRIPT_ID}-status-preview"></div>
        </div>
      </div>
    `;
  },
  
  // ============================================================
  // 私有方法
  // ============================================================
  
  /**
   * 获取状态
   * @private
   */
  _getState() {
    const stored = localStorage.getItem(STATUS_STORAGE_KEY);
    if (stored) {
      try {
        return { ...DEFAULT_STATE, ...JSON.parse(stored) };
      } catch (e) {
        return { ...DEFAULT_STATE };
      }
    }
    return { ...DEFAULT_STATE };
  },
  
  /**
   * 保存状态
   * @private
   */
  _saveState(state) {
    localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(state));
  },
  
  /**
   * 从表单获取数据
   * @private
   */
  _getFormData($container, $) {
    return {
      weekDay: $container.find(`#${SCRIPT_ID}-status-weekday`).val() || '一',
      date: $container.find(`#${SCRIPT_ID}-status-date`).val() || '',
      time: $container.find(`#${SCRIPT_ID}-status-time`).val() || '',
      location: $container.find(`#${SCRIPT_ID}-status-location`).val() || '',
      weather: $container.find(`#${SCRIPT_ID}-status-weather`).val() || '',
      
      sceneDynamic: $container.find(`#${SCRIPT_ID}-status-scene`).val() || '',
      face: $container.find(`#${SCRIPT_ID}-status-face`).val() || '',
      legs: $container.find(`#${SCRIPT_ID}-status-legs`).val() || '',
      feet: $container.find(`#${SCRIPT_ID}-status-feet`).val() || '',
      back: $container.find(`#${SCRIPT_ID}-status-back`).val() || '',
      chest: $container.find(`#${SCRIPT_ID}-status-chest`).val() || '',
      genital: $container.find(`#${SCRIPT_ID}-status-genital`).val() || '',
      buttocks: $container.find(`#${SCRIPT_ID}-status-buttocks`).val() || '',
      anus: $container.find(`#${SCRIPT_ID}-status-anus`).val() || '',
      special: $container.find(`#${SCRIPT_ID}-status-special`).val() || '无',
      
      bladder: parseInt($container.find(`#${SCRIPT_ID}-status-bladder`).val()) || 50,
      bladderDesc: $container.find(`#${SCRIPT_ID}-status-bladder-desc`).val() || '',
      emotion: $container.find(`#${SCRIPT_ID}-status-emotion`).val() || '',
      microExpression: $container.find(`#${SCRIPT_ID}-status-micro`).val() || '',
      period: $container.find(`#${SCRIPT_ID}-status-period`).val() || '卵泡期',
      
      top: $container.find(`#${SCRIPT_ID}-status-top`).val() || '无',
      bra: $container.find(`#${SCRIPT_ID}-status-bra`).val() || '无',
      bottom: $container.find(`#${SCRIPT_ID}-status-bottom`).val() || '无',
      panties: $container.find(`#${SCRIPT_ID}-status-panties`).val() || '无',
      socks: $container.find(`#${SCRIPT_ID}-status-socks`).val() || '无',
      shoes: $container.find(`#${SCRIPT_ID}-status-shoes`).val() || '无',
      accessory: $container.find(`#${SCRIPT_ID}-status-accessory`).val() || '无',
      sexToy: $container.find(`#${SCRIPT_ID}-status-sextoy`).val() || '无'
    };
  },
  
  /**
   * 生成状态栏文本
   * @private
   */
  _generateStatusBlock(data) {
    return `\`\`\`
<StatusBlock>
<environment>
⏰ 周${data.weekDay} - ${data.date} - ${data.time} | 📍 ${data.location} | 🌤️ ${data.weather}
</environment>

<charInspect>
--{{user}}角色检视--

🎬 场景动态：
${data.sceneDynamic || '暂无描述'}

👤 面部：${data.face || '暂无描述'}
🦵 腿部：${data.legs || '暂无描述'}
🦶 足部：${data.feet || '暂无描述'}
💫 背部：${data.back || '暂无描述'}
🍒 胸部：${data.chest || '暂无描述'}
🍑 性器：${data.genital || '暂无描述'}
🍑 臀部：${data.buttocks || '暂无描述'}
🌸 后庭：${data.anus || '暂无描述'}
🦴 特殊部位：${data.special || '无'}

</charInspect>

<vital>
生命体征：
🚽 膀胱：${data.bladder}/100｜${data.bladderDesc || '正常'}
😊 情绪：${data.emotion || '平静'}｜${data.microExpression || '无明显微表情'}
🩸生理期：${data.period}
</vital>

<equipment>
装备详情：
👔 上衣：${data.top}
👙 胸衣：${data.bra}
👖 下装：${data.bottom}
🩲 内裤：${data.panties}
🧦 腿袜：${data.socks}
👠 鞋履：${data.shoes}
🎀 配饰：${data.accessory}
🕹️ 性道具：${data.sexToy}
</equipment>
</StatusBlock>
\`\`\``;
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
    
    // 膀胱滑块更新
    $container.find(`#${SCRIPT_ID}-status-bladder`).on('input', function() {
      const value = $(this).val();
      $container.find(`#${SCRIPT_ID}-status-bladder-value`).text(`${value}/100`);
    });
    
    // 生成状态栏
    $container.find(`#${SCRIPT_ID}-status-generate`).on('click', () => {
      const data = this._getFormData($container, $);
      
      const statusBlock = this._generateStatusBlock(data);
      
      $container.find(`#${SCRIPT_ID}-status-preview`).html(`<pre class="yyt-code-block">${escapeHtml(statusBlock)}</pre>`);
      $container.find(`#${SCRIPT_ID}-status-preview-section`).show();
      
      showToast('success', '状态栏已生成');
    });
    
    // 复制状态栏
    $container.find(`#${SCRIPT_ID}-status-copy`).on('click', async () => {
      const previewText = $container.find(`#${SCRIPT_ID}-status-preview pre`).text();
      if (!previewText) {
        showToast('warning', '请先生成状态栏');
        return;
      }
      
      try {
        await navigator.clipboard.writeText(previewText);
        showToast('success', '已复制到剪贴板');
      } catch (e) {
        showToast('error', '复制失败');
      }
    });
    
    // 保存状态
    $container.find(`#${SCRIPT_ID}-status-save`).on('click', () => {
      const data = this._getFormData($container, $);
      this._saveState(data);
      showToast('success', '状态已保存');
    });
    
    // 重置
    $container.find(`#${SCRIPT_ID}-status-reset`).on('click', () => {
      if (confirm('确定要重置所有内容吗？')) {
        localStorage.removeItem(STATUS_STORAGE_KEY);
        this.renderTo($container);
        showToast('info', '已重置');
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
      /* 主角状态栏面板样式 */
      .yyt-status-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-status-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }
      
      @media screen and (max-width: 768px) {
        .yyt-status-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      .yyt-slider-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
      }
      
      .yyt-slider {
        flex: 1;
        height: 6px;
        -webkit-appearance: none;
        appearance: none;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        outline: none;
      }
      
      .yyt-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
        cursor: pointer;
        transition: transform 0.2s ease;
      }
      
      .yyt-slider::-webkit-slider-thumb:hover {
        transform: scale(1.1);
      }
      
      .yyt-slider-value {
        min-width: 60px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        text-align: right;
      }
      
      .yyt-status-preview {
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        padding: 14px;
        max-height: 500px;
        overflow-y: auto;
      }
      
      .yyt-status-preview .yyt-code-block {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
        padding: 12px;
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 11px;
        color: var(--yyt-success);
        white-space: pre-wrap;
        word-break: break-all;
        margin: 0;
        line-height: 1.5;
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

export default StatusBlockPanel;