/**
 * YouYou Toolkit - 正则提取面板组件
 * @description 提供正则提取规则编辑和测试的UI
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { 
  SCRIPT_ID, 
  escapeHtml, 
  showToast, 
  getJQuery, 
  isContainerValid,
  downloadJson,
  readFileContent
} from '../utils.js';

// 正则提取功能导入
import {
  extractTagContent,
  scanTextForTags,
  generateTagSuggestions,
  getTagRules,
  setTagRules,
  addTagRule,
  updateTagRule,
  deleteTagRule,
  getContentBlacklist,
  setContentBlacklist,
  saveRulesAsPreset,
  getAllRulePresets,
  loadRulePreset,
  exportRulesConfig,
  importRulesConfig
} from '../../regex-extractor.js';

// ============================================================
// 组件定义
// ============================================================

export const RegexExtractPanel = {
  id: 'regexExtractPanel',
  
  // ============================================================
  // 渲染
  // ============================================================
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const rules = getTagRules();
    const blacklist = getContentBlacklist();
    const presets = getAllRulePresets();
    
    return `
      <div class="yyt-regex-panel">
        <!-- 规则编辑区 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>标签提取规则</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${SCRIPT_ID}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> 查看示例
            </button>
          </div>
          
          ${this._renderRulesEditor(rules, blacklist, presets)}
        </div>
        
        <!-- 测试区 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-flask"></i>
            <span>测试提取</span>
          </div>
          
          ${this._renderTestSection()}
        </div>
        
        <!-- 底部操作区 -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-import-rules">
              <i class="fa-solid fa-file-import"></i> 导入
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-export-rules">
              <i class="fa-solid fa-file-export"></i> 导出
            </button>
            <input type="file" id="${SCRIPT_ID}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-reset-rules">
              <i class="fa-solid fa-undo"></i> 重置
            </button>
          </div>
        </div>
        
        <!-- 标签扫描结果容器 -->
        <div id="${SCRIPT_ID}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>发现的标签:</span>
              <span id="${SCRIPT_ID}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${SCRIPT_ID}-tag-list"></div>
          </div>
        </div>
      </div>
    `;
  },
  
  // ============================================================
  // 私有渲染方法
  // ============================================================
  
  /**
   * 渲染规则编辑器
   * @private
   */
  _renderRulesEditor(rules, blacklist, presets) {
    const rulesList = rules.length > 0
      ? rules.map((rule, index) => this._renderRuleItem(rule, index)).join('')
      : '<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>没有定义任何提取规则</span></div>';
    
    const presetOptions = presets.length > 0
      ? presets.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')
      : '';
    
    return `
      <div class="yyt-tag-rules-editor">
        ${presetOptions ? `
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${SCRIPT_ID}-rule-preset-select">
            <option value="">-- 选择预设 --</option>
            ${presetOptions}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-load-rule-preset">
            <i class="fa-solid fa-download"></i> 加载
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-save-rule-preset">
            <i class="fa-solid fa-save"></i> 保存预设
          </button>
        </div>
        ` : `
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-save-rule-preset">
            <i class="fa-solid fa-save"></i> 保存为预设
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${rulesList}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-add-rule">
            <i class="fa-solid fa-plus"></i> 添加规则
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-scan-tags">
            <i class="fa-solid fa-search"></i> 扫描标签
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> 排除小CoT
          </button>
        </div>
        
        <!-- 黑名单设置 -->
        <div class="yyt-form-group">
          <label>内容黑名单（包含这些关键词的内容将被过滤，用逗号分隔）</label>
          <input type="text" class="yyt-input" id="${SCRIPT_ID}-content-blacklist" 
                 value="${escapeHtml(blacklist.join(', '))}" 
                 placeholder="关键词1, 关键词2, ...">
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染单个规则项
   * @private
   */
  _renderRuleItem(rule, index) {
    return `
      <div class="yyt-rule-item" data-rule-index="${index}">
        <select class="yyt-select yyt-rule-type" style="flex: 2; min-width: 100px;">
          <option value="include" ${rule.type === 'include' ? 'selected' : ''}>包含</option>
          <option value="regex_include" ${rule.type === 'regex_include' ? 'selected' : ''}>正则包含</option>
          <option value="exclude" ${rule.type === 'exclude' ? 'selected' : ''}>排除</option>
          <option value="regex_exclude" ${rule.type === 'regex_exclude' ? 'selected' : ''}>正则排除</option>
        </select>
        <input type="text" class="yyt-input yyt-rule-value" style="flex: 5;" 
               placeholder="标签名或正则表达式" 
               value="${escapeHtml(rule.value || '')}">
        <label class="yyt-checkbox-label yyt-rule-enabled-label">
          <input type="checkbox" class="yyt-rule-enabled" ${rule.enabled ? 'checked' : ''}>
          <span>启用</span>
        </label>
        <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-rule-delete" title="删除规则">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  },
  
  /**
   * 渲染测试区
   * @private
   */
  _renderTestSection() {
    return `
      <div class="yyt-test-section">
        <div class="yyt-form-group">
          <label>测试文本</label>
          <textarea class="yyt-textarea" id="${SCRIPT_ID}-test-input" rows="6" 
                    placeholder="输入要测试提取的文本内容..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-test-extract">
            <i class="fa-solid fa-play"></i> 测试提取
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-test-clear">
            <i class="fa-solid fa-eraser"></i> 清空
          </button>
        </div>
        
        <div class="yyt-form-group" id="${SCRIPT_ID}-test-result-container" style="display: none;">
          <label>提取结果</label>
          <div class="yyt-test-result" id="${SCRIPT_ID}-test-result"></div>
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
    
    this._bindRuleEditorEvents($container, $);
    this._bindPresetEvents($container, $);
    this._bindTestEvents($container, $);
    this._bindFileEvents($container, $);
  },
  
  /**
   * 绑定规则编辑器事件
   * @private
   */
  _bindRuleEditorEvents($container, $) {
    // 规则类型变化
    $container.find('.yyt-rule-type').on('change', function() {
      const $item = $(this).closest('.yyt-rule-item');
      const index = $item.data('rule-index');
      const type = $(this).val();
      
      updateTagRule(index, { type });
      showToast('info', '规则类型已更新');
    });
    
    // 规则值变化
    $container.find('.yyt-rule-value').on('change', function() {
      const $item = $(this).closest('.yyt-rule-item');
      const index = $item.data('rule-index');
      const value = $(this).val().trim();
      
      updateTagRule(index, { value });
    });
    
    // 规则启用/禁用
    $container.find('.yyt-rule-enabled').on('change', function() {
      const $item = $(this).closest('.yyt-rule-item');
      const index = $item.data('rule-index');
      const enabled = $(this).is(':checked');
      
      updateTagRule(index, { enabled });
      showToast('info', enabled ? '规则已启用' : '规则已禁用');
    });
    
    // 删除规则
    $container.find('.yyt-rule-delete').on('click', () => {
      const $item = $container.find('.yyt-rule-delete').closest('.yyt-rule-item');
      const index = $item.data('rule-index');
      
      if (confirm('确定要删除这条规则吗？')) {
        deleteTagRule(index);
        this.renderTo($container);
        showToast('info', '规则已删除');
      }
    });
    
    // 删除规则（使用事件委托）
    $container.on('click', '.yyt-rule-delete', (e) => {
      const $item = $(e.currentTarget).closest('.yyt-rule-item');
      const index = $item.data('rule-index');
      
      if (confirm('确定要删除这条规则吗？')) {
        deleteTagRule(index);
        this.renderTo($container);
        showToast('info', '规则已删除');
      }
    });
    
    // 添加规则
    $container.find(`#${SCRIPT_ID}-add-rule`).on('click', () => {
      addTagRule({
        type: 'include',
        value: '',
        enabled: true
      });
      this.renderTo($container);
      showToast('success', '已添加新规则');
    });
    
    // 扫描标签
    $container.find(`#${SCRIPT_ID}-scan-tags`).on('click', async () => {
      const $btn = $container.find(`#${SCRIPT_ID}-scan-tags`);
      const testText = $container.find(`#${SCRIPT_ID}-test-input`).val();
      
      if (!testText || !testText.trim()) {
        showToast('warning', '请先输入要扫描的文本');
        return;
      }
      
      $btn.prop('disabled', true).find('i').addClass('fa-spin');
      
      try {
        const scanResult = await scanTextForTags(testText, { maxTags: 50, timeoutMs: 3000 });
        const { suggestions, stats } = generateTagSuggestions(scanResult, 25);
        
        if (suggestions.length === 0) {
          showToast('info', '未发现可用的标签');
          $container.find(`#${SCRIPT_ID}-tag-suggestions-container`).hide();
          return;
        }
        
        // 显示标签建议
        const $tagList = $container.find(`#${SCRIPT_ID}-tag-list`);
        const $stats = $container.find(`#${SCRIPT_ID}-tag-scan-stats`);
        
        $stats.text(`${stats.finalCount}/${stats.totalFound} 个标签, ${scanResult.stats.processingTimeMs}ms`);
        
        $tagList.empty();
        suggestions.forEach(tag => {
          const $tagBtn = $(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="点击添加为包含规则">${escapeHtml(tag)}</button>`);
          $tagBtn.on('click', () => {
            const rules = getTagRules();
            const exists = rules.some(r => r.type === 'include' && r.value === tag);
            
            if (exists) {
              showToast('warning', `规则 "包含: ${tag}" 已存在`);
              return;
            }
            
            addTagRule({
              type: 'include',
              value: tag,
              enabled: true
            });
            this.renderTo($container);
            showToast('success', `已添加规则: 包含 "${tag}"`);
          });
          $tagList.append($tagBtn);
        });
        
        $container.find(`#${SCRIPT_ID}-tag-suggestions-container`).show();
        showToast('success', `发现 ${suggestions.length} 个标签`);
      } catch (e) {
        showToast('error', `扫描失败: ${e.message}`);
      } finally {
        $btn.prop('disabled', false).find('i').removeClass('fa-spin');
      }
    });
    
    // 排除小CoT
    $container.find(`#${SCRIPT_ID}-add-exclude-cot`).on('click', () => {
      const rules = getTagRules();
      const cotPattern = '<!--[\\s\\S]*?-->';
      const exists = rules.some(r => r.type === 'regex_exclude' && r.value === cotPattern);
      
      if (exists) {
        showToast('warning', '排除HTML注释规则已存在');
        return;
      }
      
      addTagRule({
        type: 'regex_exclude',
        value: cotPattern,
        enabled: true
      });
      this.renderTo($container);
      showToast('success', '已添加排除HTML注释规则');
    });
    
    // 黑名单变化
    $container.find(`#${SCRIPT_ID}-content-blacklist`).on('change', function() {
      const value = $(this).val();
      const blacklist = value.split(',').map(k => k.trim()).filter(k => k);
      setContentBlacklist(blacklist);
      showToast('info', `黑名单已更新，共 ${blacklist.length} 个关键词`);
    });
    
    // 查看示例
    $container.find(`#${SCRIPT_ID}-show-examples`).on('click', () => {
      const examples = `
规则类型说明:

1. 【包含】include
   - 简单标签名提取
   - 同时匹配 <tag>内容</tag> 和 {tag|内容}
   - 示例值: content, thinking, story

2. 【正则包含】regex_include
   - 使用正则表达式提取
   - 必须包含捕获组 ()
   - 系统提取第一个捕获组的内容
   - 示例: <details[^>]*>([\\s\\S]*?)</details>

3. 【排除】exclude
   - 块级排除，移除整个标签块
   - 在提取之前执行
   - 示例值: thinking, analysis

4. 【正则排除】regex_exclude
   - 对已提取的内容进行清理
   - 移除匹配的内容
   - 示例:<!--[\\s\\S]*?--> (移除HTML注释)

处理顺序:
Phase 1: 执行【排除】规则，移除不需要的标签块
Phase 2: 执行【包含】和【正则包含】规则，提取内容
Phase 3: 执行【正则排除】规则，清理提取的内容
Phase 4: 应用黑名单过滤

常用规则示例:
• 排除思考过程: 类型=排除, 值=thinking
• 提取内容标签: 类型=包含, 值=content
• 排除HTML注释: 类型=正则排除, 值=<!--[\\s\\S]*?-->
• 提取花括号内容: 类型=包含, 值=story
      `;
      
      alert(examples);
    });
  },
  
  /**
   * 绑定预设事件
   * @private
   */
  _bindPresetEvents($container, $) {
    // 加载规则预设
    $container.find(`#${SCRIPT_ID}-load-rule-preset`).on('click', () => {
      const presetId = $container.find(`#${SCRIPT_ID}-rule-preset-select`).val();
      
      if (!presetId) {
        showToast('warning', '请选择一个预设');
        return;
      }
      
      const result = loadRulePreset(presetId);
      if (result.success) {
        this.renderTo($container);
        showToast('success', `已加载预设: ${result.preset.name}`);
        eventBus.emit(EVENTS.REGEX_PRESET_LOADED, { preset: result.preset });
      } else {
        showToast('error', result.message);
      }
    });
    
    // 保存规则预设
    $container.find(`#${SCRIPT_ID}-save-rule-preset`).on('click', () => {
      const name = prompt('请输入预设名称:');
      if (!name || !name.trim()) return;
      
      const result = saveRulesAsPreset(name.trim());
      if (result.success) {
        this.renderTo($container);
        showToast('success', `预设 "${name.trim()}" 已保存`);
      } else {
        showToast('error', result.message);
      }
    });
  },
  
  /**
   * 绑定测试事件
   * @private
   */
  _bindTestEvents($container, $) {
    // 测试提取
    $container.find(`#${SCRIPT_ID}-test-extract`).on('click', () => {
      const text = $container.find(`#${SCRIPT_ID}-test-input`).val();
      
      if (!text || !text.trim()) {
        showToast('warning', '请输入测试文本');
        return;
      }
      
      const rules = getTagRules();
      const blacklist = getContentBlacklist();
      
      const result = extractTagContent(text, rules, blacklist);
      
      const $resultContainer = $container.find(`#${SCRIPT_ID}-test-result-container`);
      const $result = $container.find(`#${SCRIPT_ID}-test-result`);
      
      $resultContainer.show();
      
      if (!result || !result.trim()) {
        $result.html('<div class="yyt-result-empty">提取结果为空</div>');
        showToast('warning', '提取结果为空，请检查规则配置');
      } else {
        $result.html(`<pre class="yyt-code-block">${escapeHtml(result)}</pre>`);
        showToast('success', '提取完成');
        eventBus.emit(EVENTS.REGEX_EXTRACTED, { result });
      }
    });
    
    // 清空测试
    $container.find(`#${SCRIPT_ID}-test-clear`).on('click', () => {
      $container.find(`#${SCRIPT_ID}-test-input`).val('');
      $container.find(`#${SCRIPT_ID}-test-result-container`).hide();
    });
  },
  
  /**
   * 绑定文件事件
   * @private
   */
  _bindFileEvents($container, $) {
    // 导入规则
    $container.find(`#${SCRIPT_ID}-import-rules`).on('click', () => {
      $container.find(`#${SCRIPT_ID}-import-rules-file`).click();
    });
    
    $container.find(`#${SCRIPT_ID}-import-rules-file`).on('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        const text = await readFileContent(file);
        const result = importRulesConfig(text, { overwrite: true });
        
        if (result.success) {
          this.renderTo($container);
          showToast('success', '规则配置已导入');
        } else {
          showToast('error', result.message);
        }
      } catch (e) {
        showToast('error', `导入失败: ${e.message}`);
      }
      
      $(e.target).val('');
    });
    
    // 导出规则
    $container.find(`#${SCRIPT_ID}-export-rules`).on('click', () => {
      try {
        const json = exportRulesConfig();
        downloadJson(json, `youyou_toolkit_rules_${Date.now()}.json`);
        showToast('success', '规则配置已导出');
      } catch (e) {
        showToast('error', `导出失败: ${e.message}`);
      }
    });
    
    // 重置规则
    $container.find(`#${SCRIPT_ID}-reset-rules`).on('click', () => {
      if (confirm('确定要重置所有规则吗？这将清空当前的规则配置。')) {
        setTagRules([]);
        setContentBlacklist([]);
        this.renderTo($container);
        showToast('info', '规则已重置');
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
      /* 正则提取面板样式 */
      .yyt-regex-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      /* 规则编辑器样式 */
      .yyt-tag-rules-editor {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .yyt-rules-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 250px;
        overflow-y: auto;
        padding-right: 4px;
      }
      
      .yyt-rule-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 13px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 20px rgba(0, 0, 0, 0.1);
      }

      .yyt-rule-item:hover {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%);
        border-color: rgba(255, 255, 255, 0.18);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 24px rgba(0, 0, 0, 0.12);
      }

      .yyt-rule-enabled-label {
        flex-shrink: 0;
        white-space: nowrap;
      }

      /* 标签建议区域 */
      .yyt-tag-suggestions {
        margin-top: 12px;
        padding: 14px;
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.03) 100%);
        border: 1px solid rgba(74, 222, 128, 0.24);
        border-radius: 16px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 12px 22px rgba(0, 0, 0, 0.08);
      }

      .yyt-tag-suggestions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        font-size: 12px;
        font-weight: 700;
        color: var(--yyt-text-secondary);
      }

      .yyt-tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .yyt-tag-list .yyt-btn {
        cursor: pointer;
      }

      .yyt-tag-list .yyt-btn:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.24) 0%, rgba(123, 183, 255, 0.11) 100%);
        border-color: rgba(123, 183, 255, 0.4);
      }
      
      /* 测试区域 */
      .yyt-test-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .yyt-test-result {
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        padding: 14px;
        max-height: 300px;
        overflow-y: auto;
      }
      
      .yyt-code-block {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
        padding: 10px;
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 11px;
        color: var(--yyt-success);
        white-space: pre-wrap;
        word-break: break-all;
        margin: 8px 0 0 0;
        max-height: 200px;
        overflow-y: auto;
      }
      
      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 11px;
      }
      
      .yyt-result-empty {
        text-align: center;
        color: var(--yyt-text-muted);
        padding: 20px;
      }
      
      .yyt-empty-state-small {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
        color: var(--yyt-text-muted);
        gap: 8px;
      }
      
      .yyt-empty-state-small i {
        font-size: 24px;
        opacity: 0.4;
      }
      
      .yyt-empty-state-small span {
        font-size: 12px;
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

export default RegexExtractPanel;