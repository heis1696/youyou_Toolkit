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

let currentSelectedPresetName = null;

function normalizePresetName(value) {
  return String(value || '').trim();
}

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
    const activeState = getActiveConfig();
    const config = activeState?.apiConfig || getApiConfig();
    const activePresetName = normalizePresetName(activeState?.presetName || getActivePresetName());
    const presets = getAllPresets();
    const starredPresets = getStarredPresets();
    
    // 预设列表 - 只显示被星标的预设，限制最多8条
    const maxPresetsToShow = 8;
    const starredToShow = starredPresets.slice(0, maxPresetsToShow);
    const presetListHtml = starredToShow.length > 0 
      ? starredToShow.map(preset => this._renderPresetItem(preset)).join('')
      : '';
    
    // 下拉框初始显示值
    const initialSelectValue = currentSelectedPresetName === null
      ? (activePresetName || '')
      : normalizePresetName(currentSelectedPresetName);
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

    const loadSelectedPreset = () => {
      const value = String($selectValue.data('value') || '').trim();

      if (!value) {
        currentSelectedPresetName = '';
        switchToPreset('');
        fillFormWithConfig($container, getApiConfig(), SCRIPT_ID);
        $container.find('.yyt-preset-item').removeClass('yyt-loaded');
        showToast('info', '已切换到当前API配置');
        return;
      }

      const preset = getPreset(value);
      if (!preset) {
        showToast('error', `预设 "${value}" 不存在`);
        return;
      }

      currentSelectedPresetName = value;
      switchToPreset(value);
      fillFormWithConfig($container, preset.apiConfig, SCRIPT_ID);
      $container.find('.yyt-preset-item').removeClass('yyt-loaded');
      $container.find(`.yyt-preset-item[data-preset-name="${value.replace(/"/g, '&quot;')}"]`).addClass('yyt-loaded');
      showToast('info', `已加载预设 "${value}"，修改后点击“保存配置”会覆盖该预设`);
    };
    
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
      currentSelectedPresetName = String(value || '').trim();
      
      // 更新显示值
      $selectValue.text(text).data('value', value);
      
      // 更新选中状态
      $dropdown.find('.yyt-select-option').removeClass('yyt-selected');
      $option.addClass('yyt-selected');
      
      // 关闭下拉框
      $dropdown.removeClass('yyt-open');
    });

    $container.find(`#${SCRIPT_ID}-load-preset`).on('click', () => {
      loadSelectedPreset();
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
          $container.find('.yyt-select-value').text(presetName).data('value', presetName);
          $container.find('.yyt-select-option').removeClass('yyt-selected');
          $container.find(`.yyt-select-option[data-value="${presetName.replace(/"/g, '&quot;')}"]`).addClass('yyt-selected');
          $container.find(`#${SCRIPT_ID}-load-preset`).trigger('click');
          break;
          
        case 'delete':
          if (confirm(`确定要删除预设 "${presetName}" 吗？`)) {
            const delResult = deletePreset(presetName);
            showToast(delResult.success ? 'info' : 'error', delResult.message);
            if (delResult.success) {
              if (normalizePresetName(currentSelectedPresetName) === presetName) {
                currentSelectedPresetName = null;
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
      const activePresetName = normalizePresetName(getActivePresetName());
      
      const validation = validateApiConfig(config);
      if (!validation.valid && !config.useMainApi) {
        showToast('error', validation.errors.join(', '));
        return;
      }
      
      // 如果当前加载了预设，询问是否覆盖
      if (activePresetName) {
        if (!confirm(`是否要覆盖预设 "${activePresetName}" 的配置？\n\n点击"确定"覆盖预设，点击"取消"仅保存当前配置并切换到“当前配置”`)) {
          updateApiConfig(config);
          switchToPreset('');
          currentSelectedPresetName = '';
          showToast('success', 'API配置已保存，并已切换到当前API配置');
          const $panel = $container.closest('.yyt-api-manager').parent();
          if ($panel.length) {
            this.renderTo($panel);
          }
          return;
        }

        updateApiConfig(config);
        const result = updatePreset(activePresetName, { apiConfig: config });
        if (result.success) {
          currentSelectedPresetName = activePresetName;
          showToast('success', `配置已保存并覆盖预设 "${activePresetName}"`);
          switchToPreset(activePresetName);
          eventBus.emit(EVENTS.PRESET_UPDATED, { name: activePresetName });
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
      
      updateApiConfig(config);
      showToast('success', 'API配置已保存');
    });
    
    // 重置配置
    $container.find(`#${SCRIPT_ID}-reset-api-config`).on('click', () => {
      if (confirm('确定要重置API配置吗？')) {
        switchToPreset('');
        currentSelectedPresetName = '';
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

    $container.off();
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
      .yyt-api-manager {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .yyt-form-row-2col > .yyt-form-group {
        flex: 1;
      }

      .yyt-input-group {
        display: flex;
        gap: 8px;
      }

      .yyt-input-group .yyt-input {
        flex: 1;
      }

      .yyt-model-row {
        display: flex;
        gap: 8px;
        align-items: stretch;
      }

      .yyt-model-input,
      .yyt-model-select {
        flex: 1;
        min-width: 0;
      }

      .yyt-model-btn {
        flex-shrink: 0;
        min-width: 40px;
      }

      .yyt-model-btn i {
        color: var(--yyt-accent);
      }

      .yyt-option-star.yyt-placeholder {
        visibility: hidden;
      }

      .yyt-option-star.yyt-starred:hover {
        color: #fcd34d;
        background: rgba(251, 191, 36, 0.18);
        border-color: rgba(251, 191, 36, 0.26);
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

export default ApiPresetPanel;