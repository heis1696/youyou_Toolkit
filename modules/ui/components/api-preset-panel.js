/**
 * YouYou Toolkit - API预设面板组件
 * @description 提供API配置和预设管理的UI
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../../core/event-bus.js';
import { 
  SCRIPT_ID, 
  escapeHtml, 
  showToast, 
  getJQuery, 
  isContainerValid,
  getFormApiConfig,
  fillFormWithConfig,
  downloadJson,
  readFileContent
} from '../utils.js';

// API和预设管理导入
import { 
  getApiConfig, 
  updateApiConfig, 
  fetchAvailableModels, 
  validateApiConfig 
} from '../../api-connection.js';

import { 
  getAllPresets, 
  getPreset, 
  getPresetNames, 
  createPreset, 
  updatePreset, 
  deletePreset, 
  switchToPreset,
  getActivePresetName,
  getActiveConfig,
  exportPresets,
  importPresets,
  generateUniquePresetName,
  togglePresetStar,
  getStarredPresets
} from '../../preset-manager.js';

// ============================================================
// 状态
// ============================================================

let currentLoadedPresetName = '';

// ============================================================
// 组件定义
// ============================================================

export const ApiPresetPanel = {
  id: 'apiPresetPanel',
  
  // ============================================================
  // 渲染
  // ============================================================
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const config = getApiConfig();
    const activeConfig = getActiveConfig();
    const activePresetName = getActivePresetName();
    const presets = getAllPresets();
    const starredPresets = getStarredPresets();
    
    // 预设列表 - 只显示被星标的预设，限制最多8条
    const maxPresetsToShow = 8;
    const starredToShow = starredPresets.slice(0, maxPresetsToShow);
    const presetListHtml = starredToShow.length > 0 
      ? starredToShow.map(preset => this._renderPresetItem(preset)).join('')
      : '';
    
    // 下拉框初始显示值
    const initialSelectValue = currentLoadedPresetName || activePresetName || '';
    const initialSelectText = initialSelectValue || '-- 当前配置 --';
    
    return `
      <div class="yyt-api-manager">
        <div class="yyt-panel">
          <!-- 预设选择区 -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-bookmark"></i>
              <span>预设选择</span>
            </div>
            
            <div class="yyt-preset-selector">
              <!-- 自定义下拉框 -->
              <div class="yyt-custom-select" id="${SCRIPT_ID}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${escapeHtml(initialSelectValue)}">${escapeHtml(initialSelectText)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${!initialSelectValue ? 'yyt-selected' : ''}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- 当前配置 --</span>
                  </div>
                  ${presets.length > 0 ? presets.map(p => this._renderSelectOption(p, initialSelectValue)).join('') : ''}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-load-preset" title="加载选中预设">
                <i class="fa-solid fa-download"></i> 加载
              </button>
            </div>
            
            ${presetListHtml ? `
            <div class="yyt-preset-list-compact">
              ${presetListHtml}
            </div>
            ` : ''}
          </div>
          
          <!-- API配置区 -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
              <span>API配置</span>
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${SCRIPT_ID}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> 保存为预设
              </button>
            </div>
            
            ${this._renderApiConfigForm(config)}
          </div>
          
          <!-- 底部操作区 -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-import-presets">
                <i class="fa-solid fa-file-import"></i> 导入
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-export-presets">
                <i class="fa-solid fa-file-export"></i> 导出
              </button>
              <input type="file" id="${SCRIPT_ID}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-reset-api-config">
                <i class="fa-solid fa-undo"></i> 重置
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-save-api-config">
                <i class="fa-solid fa-save"></i> 保存配置
              </button>
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
   * 渲染预设项
   * @private
   */
  _renderPresetItem(preset) {
    return `
      <div class="yyt-preset-item" data-preset-name="${escapeHtml(preset.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${escapeHtml(preset.name)}</div>
          <div class="yyt-preset-meta">
            ${preset.apiConfig.useMainApi 
              ? '<span class="yyt-badge yyt-badge-small">主API</span>' 
              : `<span class="yyt-badge yyt-badge-small">${escapeHtml(preset.apiConfig.model || '未设置')}</span>`}
          </div>
        </div>
        <div class="yyt-preset-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="load" title="加载配置">
            <i class="fa-solid fa-download"></i>
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger" data-action="delete" title="删除">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染下拉选项
   * @private
   */
  _renderSelectOption(preset, selectedValue) {
    const isStarred = preset.starred === true;
    const starClass = isStarred ? 'yyt-option-star yyt-starred' : 'yyt-option-star';
    const starIcon = isStarred ? '★' : '☆';
    const isSelected = preset.name === selectedValue;
    
    return `
      <div class="yyt-select-option ${isSelected ? 'yyt-selected' : ''}" data-value="${escapeHtml(preset.name)}">
        <button class="${starClass}" data-preset="${escapeHtml(preset.name)}" title="${isStarred ? '点击取消星标' : '点击添加星标'}">${starIcon}</button>
        <span class="yyt-option-text">${escapeHtml(preset.name)}</span>
      </div>
    `;
  },
  
  /**
   * 渲染API配置表单
   * @private
   */
  _renderApiConfigForm(config) {
    return `
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>使用SillyTavern主API</span>
            <span class="yyt-toggle-hint">启用后将使用SillyTavern内置的API配置</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${SCRIPT_ID}-use-main-api" ${config.useMainApi ? 'checked' : ''}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${SCRIPT_ID}-custom-api-fields" class="${config.useMainApi ? 'yyt-disabled' : ''}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-api-url" 
                   value="${escapeHtml(config.url || '')}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${SCRIPT_ID}-api-key" 
                     value="${escapeHtml(config.apiKey || '')}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${SCRIPT_ID}-toggle-key-visibility" title="显示/隐藏">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>模型</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${SCRIPT_ID}-model" 
                     value="${escapeHtml(config.model || '')}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${SCRIPT_ID}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${SCRIPT_ID}-load-models" title="获取模型列表">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${SCRIPT_ID}-max-tokens" 
                   value="${config.max_tokens || 4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${SCRIPT_ID}-temperature" 
                   value="${config.temperature ?? 0.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${SCRIPT_ID}-top-p" 
                   value="${config.top_p ?? 0.9}" min="0" max="1" step="0.1">
          </div>
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
    
    this._bindDropdownEvents($container, $);
    this._bindPresetListEvents($container, $);
    this._bindApiConfigEvents($container, $);
    this._bindFileEvents($container, $);
  },
  
  /**
   * 绑定下拉框事件
   * @private
   */
  _bindDropdownEvents($container, $) {
    const $dropdown = $container.find(`#${SCRIPT_ID}-preset-dropdown`);
    const $trigger = $dropdown.find('.yyt-select-trigger');
    const $selectValue = $dropdown.find('.yyt-select-value');
    
    // 点击触发器展开/收起下拉框
    $trigger.on('click', function(e) {
      e.stopPropagation();
      $dropdown.toggleClass('yyt-open');
    });
    
    // 点击选项选择预设
    $dropdown.find('.yyt-select-option').on('click', (e) => {
      // 如果点击的是星标按钮，不选择预设
      if ($(e.target).hasClass('yyt-option-star')) return;
      
      const $option = $(e.currentTarget);
      const value = $option.data('value');
      const text = $option.find('.yyt-option-text').text();
      
      // 更新显示值
      $selectValue.text(text).data('value', value);
      
      // 更新选中状态
      $dropdown.find('.yyt-select-option').removeClass('yyt-selected');
      $option.addClass('yyt-selected');
      
      // 关闭下拉框
      $dropdown.removeClass('yyt-open');
      
      // 如果选择了预设，加载配置
      if (value) {
        const preset = getPreset(value);
        if (preset) {
          fillFormWithConfig($container, preset.apiConfig, SCRIPT_ID);
        }
      }
    });
    
    // 下拉框内的星标按钮点击事件
    $dropdown.find('.yyt-option-star').on('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const presetName = $(e.currentTarget).data('preset');
      if (!presetName) return;
      
      const result = togglePresetStar(presetName);
      if (result.success) {
        showToast('success', result.message);
        // 重新渲染
        const $panel = $container.closest('.yyt-api-manager').parent();
        if ($panel.length) {
          this.renderTo($panel);
        }
      } else {
        showToast('error', result.message);
      }
    });
    
    // 点击外部关闭下拉框
    $(document).on('click.yyt-dropdown', (e) => {
      if (!$(e.target).closest($dropdown).length) {
        $dropdown.removeClass('yyt-open');
      }
    });
  },
  
  /**
   * 绑定预设列表事件
   * @private
   */
  _bindPresetListEvents($container, $) {
    // 预设列表项操作
    $container.find('.yyt-preset-item').on('click', (e) => {
      const $item = $(e.currentTarget);
      const presetName = $item.data('preset-name');
      const action = $(e.target).closest('[data-action]').data('action');
      
      if (!action) return;
      
      e.stopPropagation();
      
      switch (action) {
        case 'load':
          const preset = getPreset(presetName);
          if (preset) {
            fillFormWithConfig($container, preset.apiConfig, SCRIPT_ID);
            currentLoadedPresetName = presetName;
            
            $container.find('.yyt-preset-item').removeClass('yyt-loaded');
            $item.addClass('yyt-loaded');
            
            showToast('info', `已加载预设 "${presetName}"，修改后可点击"保存配置"覆盖此预设`);
          }
          break;
          
        case 'delete':
          if (confirm(`确定要删除预设 "${presetName}" 吗？`)) {
            const delResult = deletePreset(presetName);
            showToast(delResult.success ? 'info' : 'error', delResult.message);
            if (delResult.success) {
              if (currentLoadedPresetName === presetName) {
                currentLoadedPresetName = '';
              }
              // 重新渲染
              const $panel = $container.closest('.yyt-api-manager').parent();
              if ($panel.length) {
                this.renderTo($panel);
              }
            }
          }
          break;
      }
    });
  },
  
  /**
   * 绑定API配置事件
   * @private
   */
  _bindApiConfigEvents($container, $) {
    // 切换主API
    $container.find(`#${SCRIPT_ID}-use-main-api`).on('change', function() {
      const useMainApi = $(this).is(':checked');
      const $customFields = $container.find(`#${SCRIPT_ID}-custom-api-fields`);
      
      if (useMainApi) {
        $customFields.addClass('yyt-disabled').find('input, button, select').prop('disabled', true);
      } else {
        $customFields.removeClass('yyt-disabled').find('input, button, select').prop('disabled', false);
      }
    });
    
    // 切换API Key可见性
    $container.find(`#${SCRIPT_ID}-toggle-key-visibility`).on('click', function() {
      const $input = $container.find(`#${SCRIPT_ID}-api-key`);
      const type = $input.attr('type');
      $input.attr('type', type === 'password' ? 'text' : 'password');
      $(this).find('i').toggleClass('fa-eye fa-eye-slash');
    });
    
    // 加载模型列表
    $container.find(`#${SCRIPT_ID}-load-models`).on('click', async () => {
      const $btn = $container.find(`#${SCRIPT_ID}-load-models`);
      const $modelInput = $container.find(`#${SCRIPT_ID}-model`);
      const $modelSelect = $container.find(`#${SCRIPT_ID}-model-select`);
      
      $btn.prop('disabled', true).find('i').addClass('fa-spin');
      
      try {
        const config = getFormApiConfig($container, SCRIPT_ID);
        const models = await fetchAvailableModels(config);
        
        if (models.length > 0) {
          $modelSelect.empty();
          models.forEach(model => {
            $modelSelect.append(`<option value="${escapeHtml(model)}">${escapeHtml(model)}</option>`);
          });
          
          $modelInput.hide();
          $modelSelect.show();
          
          const currentModel = $modelInput.val();
          if (currentModel && models.includes(currentModel)) {
            $modelSelect.val(currentModel);
          }
          
          $modelSelect.off('change').on('change', function() {
            $modelInput.val($(this).val());
          });
          
          showToast('success', `已加载 ${models.length} 个模型`);
        } else {
          showToast('warning', '未能获取模型列表，请手动输入');
        }
      } catch (e) {
        showToast('error', `加载模型失败: ${e.message}`);
      } finally {
        $btn.prop('disabled', false).find('i').removeClass('fa-spin');
      }
    });
    
    // 点击输入框时切换回输入模式
    $container.find(`#${SCRIPT_ID}-model`).on('focus', function() {
      const $modelSelect = $container.find(`#${SCRIPT_ID}-model-select`);
      $(this).show();
      $modelSelect.hide();
    });
    
    // 保存配置
    $container.find(`#${SCRIPT_ID}-save-api-config`).on('click', () => {
      const config = getFormApiConfig($container, SCRIPT_ID);
      
      const validation = validateApiConfig(config);
      if (!validation.valid && !config.useMainApi) {
        showToast('error', validation.errors.join(', '));
        return;
      }
      
      // 如果当前加载了预设，询问是否覆盖
      if (currentLoadedPresetName) {
        if (!confirm(`是否要覆盖预设 "${currentLoadedPresetName}" 的配置？\n\n点击"确定"覆盖预设，点击"取消"仅保存当前配置`)) {
          updateApiConfig(config);
          showToast('success', 'API配置已保存');
          return;
        }
        updateApiConfig(config);
        const result = updatePreset(currentLoadedPresetName, { apiConfig: config });
        if (result.success) {
          showToast('success', `配置已保存并覆盖预设 "${currentLoadedPresetName}"`);
          eventBus.emit(EVENTS.PRESET_UPDATED, { name: currentLoadedPresetName });
          // 重新渲染
          const $panel = $container.closest('.yyt-api-manager').parent();
          if ($panel.length) {
            this.renderTo($panel);
          }
        } else {
          showToast('error', result.message);
        }
        return;
      }
      
      const activePreset = getActivePresetName();
      if (activePreset) {
        updateApiConfig(config);
        updatePreset(activePreset, { apiConfig: config });
        showToast('success', 'API配置已保存');
        return;
      }
      
      updateApiConfig(config);
      showToast('success', 'API配置已保存');
    });
    
    // 重置配置
    $container.find(`#${SCRIPT_ID}-reset-api-config`).on('click', () => {
      if (confirm('确定要重置API配置吗？')) {
        updateApiConfig({
          url: '',
          apiKey: '',
          model: '',
          useMainApi: true,
          max_tokens: 4096,
          temperature: 0.7,
          top_p: 0.9
        });
        // 重新渲染
        const $panel = $container.closest('.yyt-api-manager').parent();
        if ($panel.length) {
          this.renderTo($panel);
        }
        showToast('info', 'API配置已重置');
      }
    });
    
    // 保存为预设
    $container.find(`#${SCRIPT_ID}-save-as-preset`).on('click', () => {
      this._showSavePresetDialog($container, $);
    });
  },
  
  /**
   * 绑定文件事件
   * @private
   */
  _bindFileEvents($container, $) {
    // 导出预设
    $container.find(`#${SCRIPT_ID}-export-presets`).on('click', () => {
      try {
        const json = exportPresets();
        downloadJson(json, `youyou_toolkit_presets_${Date.now()}.json`);
        showToast('success', '预设已导出');
      } catch (e) {
        showToast('error', `导出失败: ${e.message}`);
      }
    });
    
    // 导入预设
    $container.find(`#${SCRIPT_ID}-import-presets`).on('click', () => {
      $container.find(`#${SCRIPT_ID}-import-file`).click();
    });
    
    $container.find(`#${SCRIPT_ID}-import-file`).on('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        const text = await readFileContent(file);
        const result = importPresets(text, { overwrite: true });
        showToast(result.success ? 'success' : 'error', result.message);
        if (result.imported > 0) {
          // 重新渲染
          const $panel = $container.closest('.yyt-api-manager').parent();
          if ($panel.length) {
            this.renderTo($panel);
          }
        }
      } catch (e) {
        showToast('error', `导入失败: ${e.message}`);
      }
      
      $(e.target).val('');
    });
  },
  
  /**
   * 显示保存预设对话框
   * @private
   */
  _showSavePresetDialog($container, $) {
    const presets = getAllPresets();
    const existingNames = presets.map(p => p.name);
    const defaultName = generateUniquePresetName('新预设');
    
    const dialogHtml = `
      <div class="yyt-dialog-overlay" id="${SCRIPT_ID}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">保存为新预设</span>
            <button class="yyt-dialog-close" id="${SCRIPT_ID}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>预设名称</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-dialog-preset-name" 
                     value="${escapeHtml(defaultName)}" placeholder="输入预设名称">
            </div>
            <div class="yyt-form-group">
              <label>描述（可选）</label>
              <textarea class="yyt-textarea" id="${SCRIPT_ID}-dialog-preset-desc" rows="2" 
                        placeholder="预设描述..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-dialog-cancel">取消</button>
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-dialog-save">保存</button>
          </div>
        </div>
      </div>
    `;
    
    $(`#${SCRIPT_ID}-dialog-overlay`).remove();
    $container.append(dialogHtml);
    
    const $overlay = $(`#${SCRIPT_ID}-dialog-overlay`);
    const $nameInput = $(`#${SCRIPT_ID}-dialog-preset-name`);
    const $descInput = $(`#${SCRIPT_ID}-dialog-preset-desc`);
    
    $nameInput.focus().select();
    
    const closeDialog = () => $overlay.remove();
    
    $overlay.find(`#${SCRIPT_ID}-dialog-close, #${SCRIPT_ID}-dialog-cancel`).on('click', closeDialog);
    $overlay.on('click', function(e) {
      if (e.target === this) closeDialog();
    });
    
    $overlay.find(`#${SCRIPT_ID}-dialog-save`).on('click', () => {
      const name = $nameInput.val().trim();
      const desc = $descInput.val().trim();
      
      if (!name) {
        showToast('warning', '请输入预设名称');
        $nameInput.focus();
        return;
      }
      
      if (existingNames.includes(name)) {
        if (!confirm(`预设 "${name}" 已存在，是否覆盖？`)) {
          return;
        }
        deletePreset(name);
      }
      
      const currentConfig = getFormApiConfig($container, SCRIPT_ID);
      const result = createPreset({
        name,
        description: desc,
        apiConfig: currentConfig
      });
      
      if (result.success) {
        showToast('success', result.message);
        closeDialog();
        eventBus.emit(EVENTS.PRESET_CREATED, { preset: result.preset });
        // 重新渲染
        const $panel = $container.closest('.yyt-api-manager').parent();
        if ($panel.length) {
          this.renderTo($panel);
        }
      } else {
        showToast('error', result.message);
      }
    });
    
    $nameInput.on('keypress', function(e) {
      if (e.which === 13) {
        $overlay.find(`#${SCRIPT_ID}-dialog-save`).click();
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
    $(document).off('click.yyt-dropdown');
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
      /* CSS变量定义 */
      .yyt-api-manager {
        --yyt-accent: #7bb7ff;
        --yyt-accent-glow: rgba(123, 183, 255, 0.4);
        --yyt-accent-soft: rgba(123, 183, 255, 0.15);
        --yyt-success: #4ade80;
        --yyt-success-glow: rgba(74, 222, 128, 0.3);
        --yyt-error: #f87171;
        --yyt-error-glow: rgba(248, 113, 113, 0.3);
        --yyt-warning: #fbbf24;
        --yyt-surface: rgba(255, 255, 255, 0.03);
        --yyt-surface-hover: rgba(255, 255, 255, 0.06);
        --yyt-surface-active: rgba(255, 255, 255, 0.08);
        --yyt-border: rgba(255, 255, 255, 0.08);
        --yyt-border-strong: rgba(255, 255, 255, 0.15);
        --yyt-text: rgba(255, 255, 255, 0.95);
        --yyt-text-secondary: rgba(255, 255, 255, 0.7);
        --yyt-text-muted: rgba(255, 255, 255, 0.45);
        --yyt-radius: 12px;
        --yyt-radius-sm: 8px;
        --yyt-radius-lg: 16px;
        --yyt-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
        --yyt-shadow-glow: 0 0 20px var(--yyt-accent-glow);
        
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      /* 面板 */
      .yyt-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-panel-section {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 18px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, transparent 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius);
        transition: border-color 0.2s ease;
      }
      
      .yyt-panel-section:hover {
        border-color: var(--yyt-border-strong);
      }
      
      /* 标题 */
      .yyt-section-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        font-size: 14px;
        color: var(--yyt-text);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .yyt-section-title i {
        color: var(--yyt-accent);
        font-size: 16px;
        filter: drop-shadow(0 0 8px var(--yyt-accent-glow));
      }
      
      /* 预设选择器 */
      .yyt-preset-selector {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      
      /* 自定义下拉框 */
      .yyt-custom-select {
        position: relative;
        flex: 1;
        min-width: 0;
      }
      
      .yyt-select-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
        color: var(--yyt-text);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-select-trigger:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
      }
      
      .yyt-custom-select.yyt-open .yyt-select-trigger {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 3px var(--yyt-accent-soft), inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-select-value {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .yyt-select-arrow {
        color: var(--yyt-text-muted);
        transition: transform 0.2s ease;
        margin-left: 8px;
      }
      
      .yyt-custom-select.yyt-open .yyt-select-arrow {
        transform: rotate(180deg);
      }
      
      .yyt-select-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        max-height: 0;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(20, 20, 35, 0.98) 0%, rgba(15, 15, 28, 0.98) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        z-index: 1000;
        opacity: 0;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .yyt-custom-select.yyt-open .yyt-select-dropdown {
        max-height: 300px;
        overflow-y: auto;
        opacity: 1;
      }
      
      .yyt-select-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      
      .yyt-select-option:hover {
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-select-option.yyt-selected {
        background: rgba(123, 183, 255, 0.15);
      }
      
      .yyt-option-star {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        color: var(--yyt-text-muted);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }
      
      .yyt-option-star.yyt-placeholder {
        width: 28px;
        visibility: hidden;
      }
      
      .yyt-option-star:hover {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-option-star.yyt-starred {
        color: #fbbf24;
      }
      
      .yyt-option-star.yyt-starred:hover {
        color: #fcd34d;
        background: rgba(251, 191, 36, 0.15);
      }
      
      .yyt-option-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--yyt-text);
        font-size: 13px;
      }
      
      /* 预设列表 - 紧凑样式 */
      .yyt-preset-list-compact {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 150px;
        overflow-y: auto;
        padding-right: 4px;
      }
      
      .yyt-preset-list-compact::-webkit-scrollbar {
        width: 4px;
      }
      
      .yyt-preset-list-compact::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .yyt-preset-list-compact::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 2px;
      }
      
      /* 预设项 - 紧凑样式 */
      .yyt-preset-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-preset-item:hover {
        background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
        border-color: rgba(255, 255, 255, 0.12);
      }
      
      .yyt-preset-item.active {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
        border-color: rgba(123, 183, 255, 0.3);
      }
      
      .yyt-preset-item.yyt-loaded {
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.04) 100%);
        border-color: rgba(74, 222, 128, 0.3);
      }
      
      .yyt-preset-info {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .yyt-preset-name {
        font-weight: 500;
        font-size: 13px;
        color: var(--yyt-text);
      }
      
      .yyt-preset-meta {
        display: flex;
        gap: 6px;
      }
      
      .yyt-preset-actions {
        display: flex;
        gap: 4px;
        opacity: 0.5;
        transition: opacity 0.2s ease;
      }
      
      .yyt-preset-item:hover .yyt-preset-actions {
        opacity: 1;
      }
      
      /* 徽章 */
      .yyt-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
      }
      
      .yyt-badge-small {
        padding: 2px 8px;
        font-size: 10px;
        background: linear-gradient(135deg, var(--yyt-accent-soft) 0%, rgba(123, 183, 255, 0.08) 100%);
        color: var(--yyt-accent);
        border: 1px solid rgba(123, 183, 255, 0.2);
      }
      
      /* 表单 */
      .yyt-form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .yyt-form-group label {
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-secondary);
        letter-spacing: 0.3px;
      }
      
      .yyt-form-row {
        display: flex;
        gap: 12px;
      }
      
      .yyt-form-row-2col > .yyt-form-group {
        flex: 1;
      }
      
      .yyt-flex-1 {
        flex: 1;
      }
      
      /* Toggle开关 */
      .yyt-toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-toggle-row:hover {
        background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
        border-color: var(--yyt-border-strong);
      }
      
      .yyt-toggle-label {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      
      .yyt-toggle-label > span:first-child {
        font-weight: 600;
        font-size: 14px;
        color: var(--yyt-text);
      }
      
      .yyt-toggle-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-toggle {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 26px;
        flex-shrink: 0;
      }
      
      .yyt-toggle input {
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
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: 26px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .yyt-toggle-slider::before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      .yyt-toggle input:checked + .yyt-toggle-slider {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
        border-color: var(--yyt-accent);
        box-shadow: 0 0 12px var(--yyt-accent-glow);
      }
      
      .yyt-toggle input:checked + .yyt-toggle-slider::before {
        transform: translateX(22px);
      }
      
      .yyt-toggle input:focus + .yyt-toggle-slider {
        box-shadow: 0 0 0 3px var(--yyt-accent-soft);
      }
      
      /* 输入框 */
      .yyt-input,
      .yyt-select,
      .yyt-textarea {
        padding: 10px 14px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
        color: var(--yyt-text);
        font-size: 13px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-select {
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E") !important;
        background-repeat: no-repeat !important;
        background-position: right 12px center !important;
        padding-right: 32px;
        background-color: #1a1a2e !important;
        color: #ffffff !important;
        filter: none !important;
      }
      
      .yyt-select option,
      select.yyt-select option {
        background-color: #1a1a2e !important;
        background: #1a1a2e !important;
        color: #ffffff !important;
        padding: 8px 12px;
        margin: 2px 0;
        border-radius: 4px;
        filter: none !important;
      }
      
      .yyt-input:hover,
      .yyt-select:hover,
      .yyt-textarea:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
      }
      
      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus {
        outline: none;
        border-color: var(--yyt-accent);
        background: linear-gradient(180deg, rgba(123, 183, 255, 0.05) 0%, rgba(123, 183, 255, 0.02) 100%);
        box-shadow: 0 0 0 3px var(--yyt-accent-soft), inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-input,
      .yyt-textarea {
        background-color: #1a1a2e !important;
        color: #ffffff !important;
        filter: none !important;
      }
      
      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: var(--yyt-text-muted);
      }
      
      .yyt-input-group {
        display: flex;
        gap: 8px;
      }
      
      .yyt-input-group .yyt-input {
        flex: 1;
      }
      
      /* 模型行 */
      .yyt-model-row {
        display: flex;
        gap: 8px;
        align-items: stretch;
      }
      
      .yyt-model-input {
        flex: 1;
        min-width: 0;
      }
      
      .yyt-model-select {
        flex: 1;
        min-width: 0;
      }
      
      .yyt-model-btn {
        flex-shrink: 0;
        min-width: 40px;
        color: var(--yyt-accent);
        border-color: rgba(123, 183, 255, 0.25);
      }
      
      .yyt-model-btn:hover {
        color: var(--yyt-accent);
      }
      
      .yyt-model-btn i {
        color: var(--yyt-accent);
      }
      
      .yyt-disabled {
        opacity: 0.4;
        pointer-events: none;
        filter: grayscale(0.5);
      }
      
      /* 面板底部 */
      .yyt-panel-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding-top: 16px;
        margin-top: 4px;
        border-top: 1px solid var(--yyt-border);
      }
      
      .yyt-footer-left,
      .yyt-footer-right {
        display: flex;
        gap: 8px;
      }
      
      /* 按钮 */
      .yyt-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 16px;
        border: none;
        border-radius: var(--yyt-radius-sm);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        letter-spacing: 0.2px;
      }
      
      .yyt-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
        pointer-events: none;
      }
      
      .yyt-btn-primary {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
        color: #0b0f15;
        box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }
      
      .yyt-btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      }
      
      .yyt-btn-primary:active {
        transform: translateY(0);
        box-shadow: 0 2px 10px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      }
      
      .yyt-btn-secondary {
        background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
        color: var(--yyt-text);
        border: 1px solid var(--yyt-border);
      }
      
      .yyt-btn-secondary:hover {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, var(--yyt-surface-hover) 100%);
        border-color: var(--yyt-border-strong);
        transform: translateY(-1px);
      }
      
      .yyt-btn-danger {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
        color: var(--yyt-error);
        border: 1px solid rgba(248, 113, 113, 0.25);
      }
      
      .yyt-btn-danger:hover {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.25) 0%, rgba(248, 113, 113, 0.1) 100%);
        box-shadow: 0 4px 15px var(--yyt-error-glow);
      }
      
      .yyt-btn-icon {
        padding: 8px;
        min-width: 36px;
      }
      
      .yyt-btn-small {
        padding: 6px 10px;
        font-size: 11px;
      }
      
      .yyt-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
      }
      
      /* 对话框 */
      .yyt-dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: yytFadeIn 0.2s ease-out;
      }
      
      @keyframes yytFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .yyt-dialog {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 30%), #0d1117;
        border: 1px solid var(--yyt-border-strong);
        border-radius: var(--yyt-radius);
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
        width: 380px;
        max-width: 90vw;
        animation: yytSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      @keyframes yytSlideIn {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      .yyt-dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--yyt-border);
      }
      
      .yyt-dialog-title {
        font-weight: 600;
        font-size: 15px;
        color: var(--yyt-text);
      }
      
      .yyt-dialog-close {
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--yyt-text-muted);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      
      .yyt-dialog-close:hover {
        background: rgba(248, 113, 113, 0.15);
        color: var(--yyt-error);
      }
      
      .yyt-dialog-body {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .yyt-dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 16px 20px;
        border-top: 1px solid var(--yyt-border);
      }
      
      /* 动画 */
      @keyframes yytFadeSlideIn {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .yyt-panel-section {
        animation: yytFadeSlideIn 0.25s ease-out backwards;
      }
      
      .yyt-panel-section:nth-child(1) { animation-delay: 0s; }
      .yyt-panel-section:nth-child(2) { animation-delay: 0.05s; }
      .yyt-panel-section:nth-child(3) { animation-delay: 0.1s; }
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

export default ApiPresetPanel;