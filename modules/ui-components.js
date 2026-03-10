/**
 * YouYou Toolkit - UI组件模块
 * @description 提供API配置、预设管理和正则提取的UI组件（合并版）
 */

import { getApiConfig, updateApiConfig, fetchAvailableModels, validateApiConfig } from './api-connection.js';
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
  createPresetFromCurrentConfig,
  generateUniquePresetName,
  togglePresetStar,
  getStarredPresets
} from './preset-manager.js';
import { loadSettings, saveSettings } from './storage.js';
import {
  // 核心提取函数
  extractTagContent,
  extractSimpleTag,
  extractCurlyBraceTag,
  extractComplexTag,
  extractHtmlFormatTag,
  
  // 工具函数
  escapeRegex,
  shouldSkipContent,
  isValidTagName,
  
  // 标签扫描
  scanTextForTags,
  generateTagSuggestions,
  
  // 规则管理
  getAllRuleTemplates,
  getRuleTemplate,
  createRuleTemplate,
  updateRuleTemplate,
  deleteRuleTemplate,
  getTagRules,
  setTagRules,
  addTagRule,
  updateTagRule,
  deleteTagRule,
  
  // 黑名单管理
  getContentBlacklist,
  setContentBlacklist,
  
  // 预设管理
  saveRulesAsPreset,
  getAllRulePresets,
  loadRulePreset,
  deleteRulePreset,
  
  // 导入导出
  exportRulesConfig,
  importRulesConfig,
  
  // 正则测试
  testRegex,
  
  // 消息宏
  MESSAGE_MACROS
} from './regex-extractor.js';

// ============================================================
// 常量定义
// ============================================================

const SCRIPT_ID = 'youyou_toolkit';

// ============================================================
// 工具函数
// ============================================================

function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

function showToast(type, message, duration = 3000) {
  // 尝试使用SillyTavern的toastr
  const topWindow = (typeof window.parent !== 'undefined' && window.parent !== window) ? window.parent : window;
  
  if (topWindow.toastr) {
    topWindow.toastr[type](message, 'YouYou 工具箱', {
      timeOut: duration,
      progressBar: true
    });
    return;
  }
  
  // 回退到console
  console.log(`[${type.toUpperCase()}] ${message}`);
}

// ============================================================
// 状态管理
// ============================================================

let $container = null;
let cachedJQuery = null;
let currentLoadedPresetName = ''; // 跟踪当前加载的预设名称

// 获取jQuery（兼容顶层窗口）- 缓存结果确保一致性
function getJQuery() {
  if (cachedJQuery) return cachedJQuery;
  
  // 优先从父窗口获取jQuery
  if (typeof window.parent !== 'undefined' && window.parent !== window) {
    try {
      if (window.parent.jQuery) {
        cachedJQuery = window.parent.jQuery;
        return cachedJQuery;
      }
    } catch (e) {
      // 跨域或其他错误，忽略
    }
  }
  
  // 回退到当前窗口的jQuery
  if (window.jQuery) {
    cachedJQuery = window.jQuery;
  }
  
  return cachedJQuery;
}

// 检查容器是否有效
function isContainerValid() {
  return $container && $container.length > 0;
}

// ============================================================
// 主面板渲染（合并API配置和预设管理）
// ============================================================

function renderMainPanel() {
  const config = getApiConfig();
  const activeConfig = getActiveConfig();
  const activePresetName = getActivePresetName();
  const presets = getAllPresets();
  const starredPresets = getStarredPresets();
  
  // 预设列表 - 只显示被星标的预设，限制最多8条
  const maxPresetsToShow = 8;
  const starredToShow = starredPresets.slice(0, maxPresetsToShow);
  // 只有当有星标预设时才显示列表
  const presetListHtml = starredToShow.length > 0 
    ? starredToShow.map(preset => `
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
      `).join('')
    : '';
  
  // 下拉框初始显示值 - 根据当前加载的预设或激活的预设
  const initialSelectValue = currentLoadedPresetName || activePresetName || '';
  const initialSelectText = initialSelectValue || '-- 当前配置 --';
  
  return `
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
              ${presets.length > 0 ? presets.map(p => {
                const isStarred = p.starred === true;
                const starClass = isStarred ? 'yyt-option-star yyt-starred' : 'yyt-option-star';
                const starIcon = isStarred ? '★' : '☆';
                const isSelected = p.name === initialSelectValue;
                return `
                  <div class="yyt-select-option ${isSelected ? 'yyt-selected' : ''}" data-value="${escapeHtml(p.name)}">
                    <button class="${starClass}" data-preset="${escapeHtml(p.name)}" title="${isStarred ? '点击取消星标' : '点击添加星标'}">${starIcon}</button>
                    <span class="yyt-option-text">${escapeHtml(p.name)}</span>
                  </div>
                `;
              }).join('') : ''}
            </div>
          </div>
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-apply-preset">
            <i class="fa-solid fa-check"></i> 应用
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
  `;
}

// ============================================================
// 预设保存对话框
// ============================================================

function showSavePresetDialog(presetNameToEdit = null) {
  const $ = getJQuery();
  if (!$) return;
  
  const presets = getAllPresets();
  const existingNames = presets.map(p => p.name);
  const defaultName = presetNameToEdit || generateUniquePresetName('新预设');
  
  // 创建对话框
  const dialogHtml = `
    <div class="yyt-dialog-overlay" id="${SCRIPT_ID}-dialog-overlay">
      <div class="yyt-dialog">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${presetNameToEdit ? '编辑预设' : '保存为新预设'}</span>
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
  
  // 移除旧对话框
  $(`#${SCRIPT_ID}-dialog-overlay`).remove();
  
  // 添加新对话框
  $container.append(dialogHtml);
  
  const $overlay = $(`#${SCRIPT_ID}-dialog-overlay`);
  const $nameInput = $(`#${SCRIPT_ID}-dialog-preset-name`);
  const $descInput = $(`#${SCRIPT_ID}-dialog-preset-desc`);
  
  // 聚焦到名称输入框
  $nameInput.focus().select();
  
  // 如果是编辑模式，填充描述
  if (presetNameToEdit) {
    const preset = getPreset(presetNameToEdit);
    if (preset && preset.description) {
      $descInput.val(preset.description);
    }
  }
  
  // 关闭对话框
  const closeDialog = () => {
    $overlay.remove();
  };
  
  $overlay.find(`#${SCRIPT_ID}-dialog-close, #${SCRIPT_ID}-dialog-cancel`).on('click', closeDialog);
  
  // 点击遮罩关闭
  $overlay.on('click', function(e) {
    if (e.target === this) {
      closeDialog();
    }
  });
  
  // 保存预设
  $overlay.find(`#${SCRIPT_ID}-dialog-save`).on('click', function() {
    const name = $nameInput.val().trim();
    const desc = $descInput.val().trim();
    
    if (!name) {
      showToast('warning', '请输入预设名称');
      $nameInput.focus();
      return;
    }
    
    // 如果名称已存在且不是编辑模式
    if (existingNames.includes(name) && name !== presetNameToEdit) {
      if (!confirm(`预设 "${name}" 已存在，是否覆盖？`)) {
        return;
      }
      // 删除旧预设
      deletePreset(name);
    }
    
    // 如果是编辑模式且修改了名称，需要先删除旧的
    if (presetNameToEdit && name !== presetNameToEdit) {
      deletePreset(presetNameToEdit);
    }
    
    // 获取当前表单配置
    const currentConfig = getFormApiConfig();
    
    // 创建预设
    const result = createPreset({
      name,
      description: desc,
      apiConfig: currentConfig
    });
    
    if (result.success) {
      showToast('success', result.message);
      closeDialog();
      render();
    } else {
      showToast('error', result.message);
    }
  });
  
  // 回车保存
  $nameInput.on('keypress', function(e) {
    if (e.which === 13) {
      $overlay.find(`#${SCRIPT_ID}-dialog-save`).click();
    }
  });
}

// ============================================================
// 事件绑定
// ============================================================

function bindEvents() {
  const $ = getJQuery();
  if (!$ || !isContainerValid()) {
    console.warn('[YouYouToolkit] bindEvents: jQuery或容器不可用');
    return;
  }
  
  // ==================== 自定义下拉框事件 ====================
  
  const $dropdown = $container.find(`#${SCRIPT_ID}-preset-dropdown`);
  const $trigger = $dropdown.find('.yyt-select-trigger');
  const $selectValue = $dropdown.find('.yyt-select-value');
  
  // 点击触发器展开/收起下拉框
  $trigger.on('click', function(e) {
    e.stopPropagation();
    $dropdown.toggleClass('yyt-open');
  });
  
  // 点击选项选择预设
  $dropdown.find('.yyt-select-option').on('click', function(e) {
    // 如果点击的是星标按钮，不选择预设
    if ($(e.target).hasClass('yyt-option-star')) return;
    
    const value = $(this).data('value');
    const text = $(this).find('.yyt-option-text').text();
    
    // 更新显示值
    $selectValue.text(text).data('value', value);
    
    // 更新选中状态
    $dropdown.find('.yyt-select-option').removeClass('yyt-selected');
    $(this).addClass('yyt-selected');
    
    // 关闭下拉框
    $dropdown.removeClass('yyt-open');
    
    // 如果选择了预设，加载配置
    if (value) {
      const preset = getPreset(value);
      if (preset) {
        fillFormWithConfig(preset.apiConfig);
      }
    }
  });
  
  // 下拉框内的星标按钮点击事件
  $dropdown.find('.yyt-option-star').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const presetName = $(this).data('preset');
    if (!presetName) return;
    
    const result = togglePresetStar(presetName);
    if (result.success) {
      showToast('success', result.message);
      render(); // 重新渲染以更新星标状态
    } else {
      showToast('error', result.message);
    }
  });
  
  // 点击外部关闭下拉框
  $(document).on('click.yyt-dropdown', function(e) {
    if (!$(e.target).closest($dropdown).length) {
      $dropdown.removeClass('yyt-open');
    }
  });
  
  // ==================== 原有事件 ====================
  
  // 星标按钮点击事件（预览列表中的）
  $container.find('.yyt-star-btn').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const presetName = $(this).data('preset');
    if (!presetName) return;
    
    const result = togglePresetStar(presetName);
    if (result.success) {
      showToast('success', result.message);
      render(); // 重新渲染以更新星标状态
    } else {
      showToast('error', result.message);
    }
  });
  
  // 应用预设按钮 - 从自定义下拉框获取选中值
  $container.find(`#${SCRIPT_ID}-apply-preset`).on('click', function() {
    const presetName = $dropdown.find('.yyt-select-value').data('value');
    
    if (!presetName) {
      // 使用当前配置，取消预设选择
      switchToPreset('');
      currentLoadedPresetName = '';
      $container.find('.yyt-preset-item').removeClass('yyt-loaded');
      showToast('info', '已切换到当前配置');
      render();
      return;
    }
    
    // 加载预设配置到表单（等同于加载按钮的功能）
    const preset = getPreset(presetName);
    if (preset) {
      fillFormWithConfig(preset.apiConfig);
      currentLoadedPresetName = presetName;
      
      // 更新预设列表高亮状态
      $container.find('.yyt-preset-item').removeClass('yyt-loaded');
      $container.find(`.yyt-preset-item[data-preset-name="${presetName}"]`).addClass('yyt-loaded');
      
      showToast('success', `已加载预设 "${presetName}"`);
    } else {
      showToast('error', `预设 "${presetName}" 不存在`);
    }
  });
  
  // 预设列表项操作
  $container.find('.yyt-preset-item').on('click', function(e) {
    const $item = $(this);
    const presetName = $item.data('preset-name');
    const action = $(e.target).closest('[data-action]').data('action');
    
    if (!action) return;
    
    e.stopPropagation();
    
    switch (action) {
      case 'load':
        // 加载预设配置到表单
        const preset = getPreset(presetName);
        if (preset) {
          fillFormWithConfig(preset.apiConfig);
          currentLoadedPresetName = presetName; // 记录当前加载的预设名称
          $container.find(`#${SCRIPT_ID}-preset-select`).val(presetName);
          
          // 更新预设列表高亮状态
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
            // 如果删除的是当前加载的预设，清空记录
            if (currentLoadedPresetName === presetName) {
              currentLoadedPresetName = '';
            }
            render();
          }
        }
        break;
    }
  });
  
  // 切换主API - 使用toggle样式
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
  
  // 加载模型列表 - 修复下拉框变短问题
  $container.find(`#${SCRIPT_ID}-load-models`).on('click', async function() {
    const $btn = $(this);
    const $modelInput = $container.find(`#${SCRIPT_ID}-model`);
    const $modelSelect = $container.find(`#${SCRIPT_ID}-model-select`);
    
    $btn.prop('disabled', true).find('i').addClass('fa-spin');
    
    try {
      const config = getFormApiConfig();
      const models = await fetchAvailableModels(config);
      
      if (models.length > 0) {
        // 清空并填充下拉框
        $modelSelect.empty();
        models.forEach(model => {
          $modelSelect.append(`<option value="${escapeHtml(model)}">${escapeHtml(model)}</option>`);
        });
        
        // 显示下拉框，隐藏输入框
        $modelInput.hide();
        $modelSelect.show();
        
        // 设置当前选中值
        const currentModel = $modelInput.val();
        if (currentModel && models.includes(currentModel)) {
          $modelSelect.val(currentModel);
        }
        
        // 绑定选择事件
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
  $container.find(`#${SCRIPT_ID}-save-api-config`).on('click', function() {
    const config = getFormApiConfig();
    
    // 验证
    const validation = validateApiConfig(config);
    if (!validation.valid && !config.useMainApi) {
      showToast('error', validation.errors.join(', '));
      return;
    }
    
    // 如果当前加载了预设，询问是否覆盖
    if (currentLoadedPresetName) {
      if (!confirm(`是否要覆盖预设 "${currentLoadedPresetName}" 的配置？\n\n点击"确定"覆盖预设，点击"取消"仅保存当前配置`)) {
        // 只保存当前配置，不覆盖预设
        updateApiConfig(config);
        showToast('success', 'API配置已保存');
        return;
      }
      // 保存配置并更新预设
      updateApiConfig(config);
      const result = updatePreset(currentLoadedPresetName, { apiConfig: config });
      if (result.success) {
        showToast('success', `配置已保存并覆盖预设 "${currentLoadedPresetName}"`);
        render();
      } else {
        showToast('error', result.message);
      }
      return;
    }
    
    // 如果当前使用的是激活的预设，更新预设
    const activePreset = getActivePresetName();
    if (activePreset) {
      updateApiConfig(config);
      updatePreset(activePreset, { apiConfig: config });
      showToast('success', 'API配置已保存');
      return;
    }
    
    // 普通保存
    updateApiConfig(config);
    showToast('success', 'API配置已保存');
  });
  
  // 重置配置
  $container.find(`#${SCRIPT_ID}-reset-api-config`).on('click', function() {
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
      render();
      showToast('info', 'API配置已重置');
    }
  });
  
  // 保存为预设
  $container.find(`#${SCRIPT_ID}-save-as-preset`).on('click', function() {
    showSavePresetDialog();
  });
  
  // 导出预设
  $container.find(`#${SCRIPT_ID}-export-presets`).on('click', function() {
    try {
      const json = exportPresets();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `youyou_toolkit_presets_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('success', '预设已导出');
    } catch (e) {
      showToast('error', `导出失败: ${e.message}`);
    }
  });
  
  // 导入预设
  $container.find(`#${SCRIPT_ID}-import-presets`).on('click', function() {
    $container.find(`#${SCRIPT_ID}-import-file`).click();
  });
  
  $container.find(`#${SCRIPT_ID}-import-file`).on('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      const result = importPresets(text, { overwrite: true });
      showToast(result.success ? 'success' : 'error', result.message);
      if (result.imported > 0) render();
    } catch (e) {
      showToast('error', `导入失败: ${e.message}`);
    }
    
    // 清空input以允许重复选择同一文件
    $(this).val('');
  });
}

// ============================================================
// 辅助函数
// ============================================================

function getFormApiConfig() {
  const $ = getJQuery();
  if (!$ || !isContainerValid()) {
    return {
      url: '',
      apiKey: '',
      model: '',
      useMainApi: true,
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 0.9
    };
  }
  
  // 模型值可能来自输入框或下拉框
  let model = $container.find(`#${SCRIPT_ID}-model`).val()?.trim() || '';
  const $modelSelect = $container.find(`#${SCRIPT_ID}-model-select`);
  if ($modelSelect.is(':visible')) {
    model = $modelSelect.val() || model;
  }
  
  return {
    url: $container.find(`#${SCRIPT_ID}-api-url`).val()?.trim() || '',
    apiKey: $container.find(`#${SCRIPT_ID}-api-key`).val() || '',
    model: model,
    useMainApi: $container.find(`#${SCRIPT_ID}-use-main-api`).is(':checked'),
    max_tokens: parseInt($container.find(`#${SCRIPT_ID}-max-tokens`).val()) || 4096,
    temperature: parseFloat($container.find(`#${SCRIPT_ID}-temperature`).val()) ?? 0.7,
    top_p: parseFloat($container.find(`#${SCRIPT_ID}-top-p`).val()) ?? 0.9
  };
}

function fillFormWithConfig(config) {
  const $ = getJQuery();
  if (!$ || !isContainerValid() || !config) return;
  
  $container.find(`#${SCRIPT_ID}-api-url`).val(config.url || '');
  $container.find(`#${SCRIPT_ID}-api-key`).val(config.apiKey || '');
  $container.find(`#${SCRIPT_ID}-model`).val(config.model || '');
  $container.find(`#${SCRIPT_ID}-max-tokens`).val(config.max_tokens || 4096);
  $container.find(`#${SCRIPT_ID}-temperature`).val(config.temperature ?? 0.7);
  $container.find(`#${SCRIPT_ID}-top-p`).val(config.top_p ?? 0.9);
  
  const useMainApi = config.useMainApi ?? true;
  const $checkbox = $container.find(`#${SCRIPT_ID}-use-main-api`);
  $checkbox.prop('checked', useMainApi);
  
  const $customFields = $container.find(`#${SCRIPT_ID}-custom-api-fields`);
  if (useMainApi) {
    $customFields.addClass('yyt-disabled').find('input, button, select').prop('disabled', true);
  } else {
    $customFields.removeClass('yyt-disabled').find('input, button, select').prop('disabled', false);
  }
  
  // 重置模型选择器状态
  $container.find(`#${SCRIPT_ID}-model`).show();
  $container.find(`#${SCRIPT_ID}-model-select`).hide();
}

// ============================================================
// 主渲染函数
// ============================================================

export function render(container) {
  const $ = getJQuery();
  if (!$) {
    console.error('[YouYouToolkit] jQuery not available');
    return;
  }
  
  // 如果传入了新的 container，更新 $container
  if (container) {
    if (typeof container === 'string') {
      $container = $(container);
    } else if (container && container.jquery) {
      // 已经是 jQuery 对象
      $container = container;
    } else if (container) {
      // 原生 DOM 元素
      $container = $(container);
    }
  }
  
  // 检查容器是否有效
  if (!$container || !$container.length) {
    console.error('[YouYouToolkit] Container not found or invalid');
    return;
  }
  
  const html = `<div class="yyt-api-manager">${renderMainPanel()}</div>`;
  
  $container.html(html);
  bindEvents();
}

export function getStyles() {
  return `
    /* ============================================================
       YouYou Toolkit - 现代化UI样式（合并版）
       ============================================================ */
    
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
    
    /* 空状态 */
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
    
    /* Toggle开关 - 美观样式 */
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
    
    /* 输入框 - 现代化设计 */
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
    
    /* 下拉框选项样式 - 使用更强的选择器确保不被覆盖 */
    .yyt-select option,
    .yyt-select optgroup,
    .yyt-select > option,
    .yyt-select > optgroup,
    select.yyt-select option,
    select.yyt-select optgroup {
      background-color: #1a1a2e !important;
      background: #1a1a2e !important;
      color: #ffffff !important;
      padding: 8px 12px;
      margin: 2px 0;
      border-radius: 4px;
      filter: none !important;
    }
    
    .yyt-select option:hover,
    select.yyt-select option:hover {
      background-color: #2a2a4e !important;
      background: #2a2a4e !important;
    }
    
    .yyt-select option:checked,
    select.yyt-select option:checked {
      background-color: #3a3a6e !important;
      background: #3a3a6e !important;
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
    
    /* 强制确保输入框和文本域的文字可见性 */
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
    
    /* 模型行 - 修复下拉框变短问题 */
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
    
    /* 按钮 - 现代化设计 */
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
    
    .yyt-btn-edit {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.15) 0%, rgba(123, 183, 255, 0.05) 100%);
      color: var(--yyt-accent);
      border: 1px solid rgba(123, 183, 255, 0.25);
    }
    
    .yyt-btn-edit:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.25) 0%, rgba(123, 183, 255, 0.1) 100%);
      box-shadow: 0 4px 15px var(--yyt-accent-glow);
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
}

// ============================================================
// 正则提取面板渲染（新版 - 规则编辑器）
// ============================================================

let $regexContainer = null;
let currentEditingTemplateId = null;

/**
 * 渲染规则编辑器
 * @returns {string} HTML字符串
 */
function renderTagRulesEditor() {
  const rules = getTagRules();
  const blacklist = getContentBlacklist();
  const presets = getAllRulePresets();
  
  // 规则列表
  const rulesList = rules.length > 0
    ? rules.map((rule, index) => `
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
      `).join('')
    : '<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>没有定义任何提取规则</span></div>';
  
  // 预设选项
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
}

/**
 * 渲染正则测试区
 * @returns {string} HTML字符串
 */
function renderTestSection() {
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
}

/**
 * 渲染正则面板
 * @returns {string} HTML字符串
 */
function renderRegexPanel() {
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
        
        ${renderTagRulesEditor()}
      </div>
      
      <!-- 测试区 -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-flask"></i>
          <span>测试提取</span>
        </div>
        
        ${renderTestSection()}
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
}

// 正则模板编辑对话框
function showTemplateDialog(templateId = null) {
  const $ = getJQuery();
  if (!$) return;
  
  const template = templateId ? getTemplate(templateId) : null;
  const isEdit = !!template;
  
  const dialogHtml = `
    <div class="yyt-dialog-overlay" id="${SCRIPT_ID}-template-dialog-overlay">
      <div class="yyt-dialog yyt-dialog-wide">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${isEdit ? '编辑模板' : '新建正则模板'}</span>
          <button class="yyt-dialog-close" id="${SCRIPT_ID}-template-dialog-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          <div class="yyt-form-group">
            <label>模板名称</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-template-name" 
                   value="${template ? escapeHtml(template.name) : ''}" placeholder="输入模板名称">
          </div>
          <div class="yyt-form-group">
            <label>描述</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-template-desc" 
                   value="${template ? escapeHtml(template.description || '') : ''}" placeholder="模板描述">
          </div>
          <div class="yyt-form-group">
            <label>正则表达式</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-template-pattern" 
                   value="${template ? escapeHtml(template.pattern) : ''}" placeholder="正则表达式">
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>标志位</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-template-flags" 
                     value="${template ? escapeHtml(template.flags || 'g') : 'g'}" placeholder="gim">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>捕获组索引</label>
              <input type="number" class="yyt-input" id="${SCRIPT_ID}-template-group" 
                     value="${template ? template.groupIndex || 0 : 1}" min="0" max="99">
            </div>
          </div>
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-template-dialog-cancel">取消</button>
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-template-dialog-save">保存</button>
        </div>
      </div>
    </div>
  `;
  
  // 移除旧对话框
  $(`#${SCRIPT_ID}-template-dialog-overlay`).remove();
  
  // 添加新对话框
  if ($regexContainer) {
    $regexContainer.append(dialogHtml);
  } else {
    $container.append(dialogHtml);
  }
  
  const $overlay = $(`#${SCRIPT_ID}-template-dialog-overlay`);
  const $nameInput = $(`#${SCRIPT_ID}-template-name`);
  
  // 聚焦到名称输入框
  $nameInput.focus();
  
  // 关闭对话框
  const closeDialog = () => {
    $overlay.remove();
    currentEditingTemplateId = null;
  };
  
  $overlay.find(`#${SCRIPT_ID}-template-dialog-close, #${SCRIPT_ID}-template-dialog-cancel`).on('click', closeDialog);
  
  // 点击遮罩关闭
  $overlay.on('click', function(e) {
    if (e.target === this) {
      closeDialog();
    }
  });
  
  // 保存模板
  $overlay.find(`#${SCRIPT_ID}-template-dialog-save`).on('click', function() {
    const name = $nameInput.val().trim();
    const desc = $(`#${SCRIPT_ID}-template-desc`).val().trim();
    const pattern = $(`#${SCRIPT_ID}-template-pattern`).val().trim();
    const flags = $(`#${SCRIPT_ID}-template-flags`).val().trim() || 'g';
    const groupIndex = parseInt($(`#${SCRIPT_ID}-template-group`).val()) || 0;
    
    if (!name) {
      showToast('warning', '请输入模板名称');
      $nameInput.focus();
      return;
    }
    
    if (!pattern) {
      showToast('warning', '请输入正则表达式');
      $(`#${SCRIPT_ID}-template-pattern`).focus();
      return;
    }
    
    // 验证正则表达式
    try {
      new RegExp(pattern, flags);
    } catch (e) {
      showToast('error', `正则表达式无效: ${e.message}`);
      return;
    }
    
    let result;
    if (isEdit && templateId) {
      result = updateTemplate(templateId, { name, description: desc, pattern, flags, groupIndex });
    } else {
      result = createTemplate({ name, description: desc, pattern, flags, groupIndex });
    }
    
    if (result.success) {
      showToast('success', result.message);
      closeDialog();
      renderRegex($regexContainer || $container);
    } else {
      showToast('error', result.message);
    }
  });
}

// 绑定正则面板事件（新版 - 规则编辑器）
function bindRegexEvents() {
  const $ = getJQuery();
  if (!$) return;
  
  const $panel = $regexContainer || $container;
  if (!$panel || !$panel.length) return;
  
  // ==================== 规则编辑器事件 ====================
  
  // 规则类型变化
  $panel.find('.yyt-rule-type').on('change', function() {
    const $item = $(this).closest('.yyt-rule-item');
    const index = $item.data('rule-index');
    const type = $(this).val();
    
    updateTagRule(index, { type });
    showToast('info', '规则类型已更新');
  });
  
  // 规则值变化
  $panel.find('.yyt-rule-value').on('change', function() {
    const $item = $(this).closest('.yyt-rule-item');
    const index = $item.data('rule-index');
    const value = $(this).val().trim();
    
    updateTagRule(index, { value });
  });
  
  // 规则启用/禁用
  $panel.find('.yyt-rule-enabled').on('change', function() {
    const $item = $(this).closest('.yyt-rule-item');
    const index = $item.data('rule-index');
    const enabled = $(this).is(':checked');
    
    updateTagRule(index, { enabled });
    showToast('info', enabled ? '规则已启用' : '规则已禁用');
  });
  
  // 删除规则
  $panel.find('.yyt-rule-delete').on('click', function() {
    const $item = $(this).closest('.yyt-rule-item');
    const index = $item.data('rule-index');
    
    if (confirm('确定要删除这条规则吗？')) {
      deleteTagRule(index);
      renderRegex($panel);
      showToast('info', '规则已删除');
    }
  });
  
  // 添加规则
  $panel.find(`#${SCRIPT_ID}-add-rule`).on('click', function() {
    addTagRule({
      type: 'include',
      value: '',
      enabled: true
    });
    renderRegex($panel);
    showToast('success', '已添加新规则');
  });
  
  // 扫描标签
  $panel.find(`#${SCRIPT_ID}-scan-tags`).on('click', async function() {
    const $btn = $(this);
    const testText = $panel.find(`#${SCRIPT_ID}-test-input`).val();
    
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
        $panel.find(`#${SCRIPT_ID}-tag-suggestions-container`).hide();
        return;
      }
      
      // 显示标签建议
      const $container = $panel.find(`#${SCRIPT_ID}-tag-suggestions-container`);
      const $tagList = $panel.find(`#${SCRIPT_ID}-tag-list`);
      const $stats = $panel.find(`#${SCRIPT_ID}-tag-scan-stats`);
      
      $stats.text(`${stats.finalCount}/${stats.totalFound} 个标签, ${scanResult.stats.processingTimeMs}ms`);
      
      $tagList.empty();
      suggestions.forEach(tag => {
        const $tagBtn = $(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="点击添加为包含规则">${escapeHtml(tag)}</button>`);
        $tagBtn.on('click', function() {
          // 检查是否已存在
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
          renderRegex($panel);
          showToast('success', `已添加规则: 包含 "${tag}"`);
        });
        $tagList.append($tagBtn);
      });
      
      $container.show();
      showToast('success', `发现 ${suggestions.length} 个标签`);
    } catch (e) {
      showToast('error', `扫描失败: ${e.message}`);
    } finally {
      $btn.prop('disabled', false).find('i').removeClass('fa-spin');
    }
  });
  
  // 排除小CoT
  $panel.find(`#${SCRIPT_ID}-add-exclude-cot`).on('click', function() {
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
    renderRegex($panel);
    showToast('success', '已添加排除HTML注释规则');
  });
  
  // 黑名单变化
  $panel.find(`#${SCRIPT_ID}-content-blacklist`).on('change', function() {
    const value = $(this).val();
    const blacklist = value.split(',').map(k => k.trim()).filter(k => k);
    setContentBlacklist(blacklist);
    showToast('info', `黑名单已更新，共 ${blacklist.length} 个关键词`);
  });
  
  // ==================== 预设管理事件 ====================
  
  // 加载规则预设
  $panel.find(`#${SCRIPT_ID}-load-rule-preset`).on('click', function() {
    const presetId = $panel.find(`#${SCRIPT_ID}-rule-preset-select`).val();
    
    if (!presetId) {
      showToast('warning', '请选择一个预设');
      return;
    }
    
    const result = loadRulePreset(presetId);
    if (result.success) {
      renderRegex($panel);
      showToast('success', `已加载预设: ${result.preset.name}`);
    } else {
      showToast('error', result.message);
    }
  });
  
  // 保存规则预设
  $panel.find(`#${SCRIPT_ID}-save-rule-preset`).on('click', function() {
    const name = prompt('请输入预设名称:');
    if (!name || !name.trim()) return;
    
    const result = saveRulesAsPreset(name.trim());
    if (result.success) {
      renderRegex($panel);
      showToast('success', `预设 "${name.trim()}" 已保存`);
    } else {
      showToast('error', result.message);
    }
  });
  
  // ==================== 测试提取事件 ====================
  
  // 测试提取
  $panel.find(`#${SCRIPT_ID}-test-extract`).on('click', function() {
    const text = $panel.find(`#${SCRIPT_ID}-test-input`).val();
    
    if (!text || !text.trim()) {
      showToast('warning', '请输入测试文本');
      return;
    }
    
    const rules = getTagRules();
    const blacklist = getContentBlacklist();
    
    const result = extractTagContent(text, rules, blacklist);
    
    const $resultContainer = $panel.find(`#${SCRIPT_ID}-test-result-container`);
    const $result = $panel.find(`#${SCRIPT_ID}-test-result`);
    
    $resultContainer.show();
    
    if (!result || !result.trim()) {
      $result.html('<div class="yyt-result-empty">提取结果为空</div>');
      showToast('warning', '提取结果为空，请检查规则配置');
    } else {
      $result.html(`<pre class="yyt-code-block">${escapeHtml(result)}</pre>`);
      showToast('success', '提取完成');
    }
  });
  
  // 清空测试
  $panel.find(`#${SCRIPT_ID}-test-clear`).on('click', function() {
    $panel.find(`#${SCRIPT_ID}-test-input`).val('');
    $panel.find(`#${SCRIPT_ID}-test-result-container`).hide();
  });
  
  // ==================== 导入导出事件 ====================
  
  // 导入规则
  $panel.find(`#${SCRIPT_ID}-import-rules`).on('click', function() {
    $panel.find(`#${SCRIPT_ID}-import-rules-file`).click();
  });
  
  $panel.find(`#${SCRIPT_ID}-import-rules-file`).on('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      const result = importRulesConfig(text, { overwrite: true });
      
      if (result.success) {
        renderRegex($panel);
        showToast('success', '规则配置已导入');
      } else {
        showToast('error', result.message);
      }
    } catch (e) {
      showToast('error', `导入失败: ${e.message}`);
    }
    
    $(this).val('');
  });
  
  // 导出规则
  $panel.find(`#${SCRIPT_ID}-export-rules`).on('click', function() {
    try {
      const json = exportRulesConfig();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `youyou_toolkit_rules_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('success', '规则配置已导出');
    } catch (e) {
      showToast('error', `导出失败: ${e.message}`);
    }
  });
  
  // 重置规则
  $panel.find(`#${SCRIPT_ID}-reset-rules`).on('click', function() {
    if (confirm('确定要重置所有规则吗？这将清空当前的规则配置。')) {
      setTagRules([]);
      setContentBlacklist([]);
      renderRegex($panel);
      showToast('info', '规则已重置');
    }
  });
  
  // ==================== 查看示例 ====================
  
  $panel.find(`#${SCRIPT_ID}-show-examples`).on('click', function() {
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
   - 示例: <!--[\\s\\S]*?--> (移除HTML注释)

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
}

// 渲染正则面板
export function renderRegex(container) {
  const $ = getJQuery();
  if (!$) {
    console.error('[YouYouToolkit] jQuery not available');
    return;
  }
  
  // 更新容器引用
  if (container) {
    if (typeof container === 'string') {
      $regexContainer = $(container);
    } else if (container && container.jquery) {
      $regexContainer = container;
    } else if (container) {
      $regexContainer = $(container);
    }
  }
  
  if (!$regexContainer || !$regexContainer.length) {
    console.error('[YouYouToolkit] Regex container not found');
    return;
  }
  
  const html = renderRegexPanel();
  $regexContainer.html(html);
  bindRegexEvents();
}

// 获取正则面板样式
export function getRegexStyles() {
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
      padding: 10px 12px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      transition: all 0.2s ease;
    }
    
    .yyt-rule-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-rule-enabled-label {
      flex-shrink: 0;
      white-space: nowrap;
    }
    
    /* 标签建议区域 */
    .yyt-tag-suggestions {
      margin-top: 12px;
      padding: 12px;
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.02) 100%);
      border: 1px solid rgba(74, 222, 128, 0.2);
      border-radius: var(--yyt-radius-sm);
    }
    
    .yyt-tag-suggestions-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: 600;
      color: var(--yyt-text-secondary);
    }
    
    .yyt-tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    
    .yyt-tag-list .yyt-btn {
      cursor: pointer;
    }
    
    .yyt-tag-list .yyt-btn:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.2) 0%, rgba(123, 183, 255, 0.1) 100%);
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
    
    /* 模板列表样式 */
    .yyt-template-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 180px;
      overflow-y: auto;
      padding-right: 4px;
    }
    
    .yyt-template-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      transition: all 0.2s ease;
    }
    
    .yyt-template-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-template-info {
      flex: 1;
      min-width: 0;
    }
    
    .yyt-template-name {
      font-weight: 600;
      font-size: 13px;
      color: var(--yyt-text);
      margin-bottom: 2px;
    }
    
    .yyt-template-desc {
      font-size: 11px;
      color: var(--yyt-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .yyt-template-actions {
      display: flex;
      gap: 4px;
      opacity: 0.5;
      transition: opacity 0.2s ease;
    }
    
    .yyt-template-item:hover .yyt-template-actions {
      opacity: 1;
    }
    
    .yyt-regex-input-row {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .yyt-regex-flags {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    
    .yyt-checkbox-label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--yyt-text-secondary);
      cursor: pointer;
    }
    
    .yyt-checkbox-label input {
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
    
    .yyt-regex-result {
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      padding: 14px;
      max-height: 250px;
      overflow-y: auto;
    }
    
    .yyt-result-header {
      font-size: 12px;
      font-weight: 600;
      color: var(--yyt-text-secondary);
      margin-bottom: 10px;
    }
    
    .yyt-result-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 14px;
    }
    
    .yyt-result-item {
      display: flex;
      gap: 10px;
      padding: 8px 10px;
      background: rgba(123, 183, 255, 0.05);
      border-radius: 6px;
      border: 1px solid rgba(123, 183, 255, 0.1);
    }
    
    .yyt-result-index {
      font-size: 11px;
      font-weight: 700;
      color: var(--yyt-accent);
      min-width: 24px;
    }
    
    .yyt-result-content {
      font-size: 12px;
      color: var(--yyt-text);
      word-break: break-all;
    }
    
    .yyt-result-extracted {
      padding-top: 10px;
      border-top: 1px solid var(--yyt-border);
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
    
    .yyt-result-error {
      color: var(--yyt-error);
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .yyt-dialog-wide {
      width: 480px;
    }
  `;
}

// ============================================================
// 工具管理UI
// ============================================================

import { 
  getAllTools, 
  getTool, 
  saveTool, 
  deleteTool, 
  setToolEnabled, 
  getAllToolPresets,
  getToolPreset,
  saveToolPreset,
  deleteToolPreset,
  exportTools,
  importTools,
  resetTools
} from './tool-manager.js';

import {
  getAllBypassPresets,
  getBypassPreset,
  saveBypassPreset,
  deleteBypassPreset,
  getCurrentBypassPresetId,
  setCurrentBypassPreset,
  isBypassEnabled,
  setBypassEnabled,
  exportBypassPresets,
  importBypassPresets
} from './bypass-prompts.js';

let $toolContainer = null;

/**
 * 渲染工具管理面板
 * @returns {string} HTML字符串
 */
function renderToolPanel() {
  const tools = getAllTools();
  const bypassPresets = getAllBypassPresets();
  const currentBypassId = getCurrentBypassPresetId();
  const bypassEnabled = isBypassEnabled();
  
  // 工具列表
  const toolsList = Object.entries(tools).map(([id, tool]) => `
    <div class="yyt-tool-item ${tool.enabled ? 'yyt-enabled' : 'yyt-disabled'}" data-tool-id="${id}">
      <div class="yyt-tool-header">
        <div class="yyt-tool-info">
          <span class="yyt-tool-name">${escapeHtml(tool.name)}</span>
          <span class="yyt-tool-category">${escapeHtml(tool.category)}</span>
        </div>
        <div class="yyt-tool-controls">
          <label class="yyt-toggle yyt-tool-toggle">
            <input type="checkbox" ${tool.enabled ? 'checked' : ''}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      <div class="yyt-tool-desc">${escapeHtml(tool.description)}</div>
    </div>
  `).join('');
  
  // 破限词预设列表
  const bypassList = Object.entries(bypassPresets).map(([id, preset]) => `
    <div class="yyt-bypass-item ${id === currentBypassId ? 'yyt-active' : ''}" data-bypass-id="${id}">
      <div class="yyt-bypass-info">
        <span class="yyt-bypass-name">${escapeHtml(preset.name)}</span>
        <span class="yyt-bypass-count">${preset.messages?.length || 0} 条消息</span>
      </div>
      <div class="yyt-bypass-actions">
        <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="edit" title="编辑">
          <i class="fa-solid fa-edit"></i>
        </button>
        <button class="yyt-btn yyt-btn-small yyt-btn-danger" data-action="delete" title="删除" 
                ${preset.isDefault ? 'disabled' : ''}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
  
  return `
    <div class="yyt-tool-manager">
      <!-- 破限词开关 -->
      <div class="yyt-panel-section">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>启用破限词</span>
            <span class="yyt-toggle-hint">在API请求前自动注入破限词预设</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="yyt-bypass-enabled" ${bypassEnabled ? 'checked' : ''}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <!-- 破限词预设 -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-shield-alt"></i>
          <span>破限词预设</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-add-bypass" style="margin-left: auto;">
            <i class="fa-solid fa-plus"></i> 新建
          </button>
        </div>
        <div class="yyt-bypass-list">
          ${bypassList}
        </div>
      </div>
      
      <!-- 工具列表 -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-tools"></i>
          <span>工具列表</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-add-tool" style="margin-left: auto;">
            <i class="fa-solid fa-plus"></i> 新建工具
          </button>
        </div>
        <div class="yyt-tool-list">
          ${toolsList}
        </div>
      </div>
      
      <!-- 底部操作 -->
      <div class="yyt-panel-footer">
        <div class="yyt-footer-left">
          <button class="yyt-btn yyt-btn-secondary" id="yyt-import-tools">
            <i class="fa-solid fa-file-import"></i> 导入
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="yyt-export-tools">
            <i class="fa-solid fa-file-export"></i> 导出
          </button>
          <input type="file" id="yyt-import-tools-file" accept=".json" style="display:none">
        </div>
        <div class="yyt-footer-right">
          <button class="yyt-btn yyt-btn-secondary" id="yyt-reset-tools">
            <i class="fa-solid fa-undo"></i> 重置
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * 绑定工具管理事件
 */
function bindToolEvents() {
  const $ = getJQuery();
  if (!$) return;
  
  const $panel = $toolContainer;
  if (!$panel || !$panel.length) return;
  
  // 破限词开关
  $panel.find('#yyt-bypass-enabled').on('change', function() {
    setBypassEnabled($(this).is(':checked'));
    showToast('success', $(this).is(':checked') ? '破限词已启用' : '破限词已禁用');
  });
  
  // 工具启用/禁用
  $panel.find('.yyt-tool-toggle input').on('change', function() {
    const $item = $(this).closest('.yyt-tool-item');
    const toolId = $item.data('tool-id');
    const enabled = $(this).is(':checked');
    
    setToolEnabled(toolId, enabled);
    $item.toggleClass('yyt-enabled', enabled).toggleClass('yyt-disabled', !enabled);
    showToast('info', enabled ? '工具已启用' : '工具已禁用');
  });
  
  // 破限词预设选择
  $panel.find('.yyt-bypass-item').on('click', function() {
    const bypassId = $(this).data('bypass-id');
    setCurrentBypassPreset(bypassId);
    $panel.find('.yyt-bypass-item').removeClass('yyt-active');
    $(this).addClass('yyt-active');
    showToast('success', '已切换破限词预设');
  });
  
  // 破限词操作按钮
  $panel.find('.yyt-bypass-actions button').on('click', function(e) {
    e.stopPropagation();
    const $item = $(this).closest('.yyt-bypass-item');
    const bypassId = $item.data('bypass-id');
    const action = $(this).data('action');
    
    if (action === 'edit') {
      showBypassEditDialog(bypassId);
    } else if (action === 'delete') {
      if (confirm('确定要删除这个破限词预设吗？')) {
        deleteBypassPreset(bypassId);
        renderTool($toolContainer);
        showToast('info', '预设已删除');
      }
    }
  });
  
  // 新建破限词预设
  $panel.find('#yyt-add-bypass').on('click', function() {
    showBypassEditDialog(null);
  });
  
  // 新建工具
  $panel.find('#yyt-add-tool').on('click', function() {
    showToolEditDialog(null);
  });
  
  // 导入工具
  $panel.find('#yyt-import-tools').on('click', function() {
    $panel.find('#yyt-import-tools-file').click();
  });
  
  $panel.find('#yyt-import-tools-file').on('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      const result = importTools(text, { overwrite: false });
      showToast(result.success ? 'success' : 'error', result.message);
      if (result.success) renderTool($toolContainer);
    } catch (e) {
      showToast('error', `导入失败: ${e.message}`);
    }
    $(this).val('');
  });
  
  // 导出工具
  $panel.find('#yyt-export-tools').on('click', function() {
    try {
      const json = exportTools();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `youyou_toolkit_tools_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('success', '工具已导出');
    } catch (e) {
      showToast('error', `导出失败: ${e.message}`);
    }
  });
  
  // 重置工具
  $panel.find('#yyt-reset-tools').on('click', function() {
    if (confirm('确定要重置所有工具吗？')) {
      resetTools();
      renderTool($toolContainer);
      showToast('info', '工具已重置');
    }
  });
}

/**
 * 显示破限词编辑对话框
 */
function showBypassEditDialog(bypassId) {
  const $ = getJQuery();
  if (!$) return;
  
  const preset = bypassId ? getBypassPreset(bypassId) : null;
  const isEdit = !!preset;
  
  const dialogHtml = `
    <div class="yyt-dialog-overlay" id="yyt-bypass-dialog-overlay">
      <div class="yyt-dialog yyt-dialog-wide">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${isEdit ? '编辑破限词预设' : '新建破限词预设'}</span>
          <button class="yyt-dialog-close" id="yyt-bypass-dialog-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          <div class="yyt-form-group">
            <label>预设名称</label>
            <input type="text" class="yyt-input" id="yyt-bypass-name" 
                   value="${preset ? escapeHtml(preset.name) : ''}" placeholder="输入预设名称">
          </div>
          <div class="yyt-form-group">
            <label>描述</label>
            <input type="text" class="yyt-input" id="yyt-bypass-desc" 
                   value="${preset ? escapeHtml(preset.description || '') : ''}" placeholder="预设描述">
          </div>
          <div class="yyt-form-group">
            <label>消息内容（JSON数组格式）</label>
            <textarea class="yyt-textarea yyt-code-textarea" id="yyt-bypass-messages" rows="10"
                      placeholder='[{"role":"SYSTEM","content":"...","deletable":true}]'>${preset ? escapeHtml(JSON.stringify(preset.messages, null, 2)) : '[]'}</textarea>
          </div>
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="yyt-bypass-dialog-cancel">取消</button>
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-dialog-save">保存</button>
        </div>
      </div>
    </div>
  `;
  
  $(`#yyt-bypass-dialog-overlay`).remove();
  $toolContainer.append(dialogHtml);
  
  const $overlay = $(`#yyt-bypass-dialog-overlay`);
  
  const closeDialog = () => $overlay.remove();
  
  $overlay.find('#yyt-bypass-dialog-close, #yyt-bypass-dialog-cancel').on('click', closeDialog);
  $overlay.on('click', function(e) { if (e.target === this) closeDialog(); });
  
  $overlay.find('#yyt-bypass-dialog-save').on('click', function() {
    const name = $('#yyt-bypass-name').val().trim();
    const desc = $('#yyt-bypass-desc').val().trim();
    const messagesStr = $('#yyt-bypass-messages').val().trim();
    
    if (!name) {
      showToast('warning', '请输入预设名称');
      return;
    }
    
    let messages;
    try {
      messages = JSON.parse(messagesStr);
    } catch (e) {
      showToast('error', '消息内容JSON格式无效');
      return;
    }
    
    const id = bypassId || `custom_${Date.now()}`;
    saveBypassPreset(id, { name, description: desc, messages });
    closeDialog();
    renderTool($toolContainer);
    showToast('success', isEdit ? '预设已更新' : '预设已创建');
  });
}

/**
 * 显示工具编辑对话框
 */
function showToolEditDialog(toolId) {
  const $ = getJQuery();
  if (!$) return;
  
  const tool = toolId ? getTool(toolId) : null;
  const isEdit = !!tool;
  
  const dialogHtml = `
    <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
      <div class="yyt-dialog yyt-dialog-wide">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${isEdit ? '编辑工具' : '新建工具'}</span>
          <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>工具名称</label>
              <input type="text" class="yyt-input" id="yyt-tool-name" 
                     value="${tool ? escapeHtml(tool.name) : ''}" placeholder="工具名称">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>分类</label>
              <select class="yyt-select" id="yyt-tool-category">
                <option value="api" ${tool?.category === 'api' ? 'selected' : ''}>API</option>
                <option value="prompt" ${tool?.category === 'prompt' ? 'selected' : ''}>Prompt</option>
                <option value="utility" ${tool?.category === 'utility' ? 'selected' : ''}>Utility</option>
              </select>
            </div>
          </div>
          <div class="yyt-form-group">
            <label>描述</label>
            <input type="text" class="yyt-input" id="yyt-tool-desc" 
                   value="${tool ? escapeHtml(tool.description || '') : ''}" placeholder="工具描述">
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>超时时间(ms)</label>
              <input type="number" class="yyt-input" id="yyt-tool-timeout" 
                     value="${tool?.config?.execution?.timeout || 60000}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>重试次数</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" 
                     value="${tool?.config?.execution?.retries || 3}">
            </div>
          </div>
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">取消</button>
          <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">保存</button>
        </div>
      </div>
    </div>
  `;
  
  $(`#yyt-tool-dialog-overlay`).remove();
  $toolContainer.append(dialogHtml);
  
  const $overlay = $(`#yyt-tool-dialog-overlay`);
  
  const closeDialog = () => $overlay.remove();
  
  $overlay.find('#yyt-tool-dialog-close, #yyt-tool-dialog-cancel').on('click', closeDialog);
  $overlay.on('click', function(e) { if (e.target === this) closeDialog(); });
  
  $overlay.find('#yyt-tool-dialog-save').on('click', function() {
    const name = $('#yyt-tool-name').val().trim();
    const category = $('#yyt-tool-category').val();
    const desc = $('#yyt-tool-desc').val().trim();
    const timeout = parseInt($('#yyt-tool-timeout').val()) || 60000;
    const retries = parseInt($('#yyt-tool-retries').val()) || 3;
    
    if (!name) {
      showToast('warning', '请输入工具名称');
      return;
    }
    
    const id = toolId || `tool_${Date.now()}`;
    saveTool(id, {
      name,
      category,
      description: desc,
      config: {
        trigger: { type: 'manual', events: [] },
        execution: { timeout, retries },
        api: { preset: '', useBypass: true, bypassPreset: 'standard' },
        messages: [],
        context: { depth: 3, includeTags: [], excludeTags: [] }
      },
      enabled: true
    });
    
    closeDialog();
    renderTool($toolContainer);
    showToast('success', isEdit ? '工具已更新' : '工具已创建');
  });
}

/**
 * 渲染工具管理面板
 */
export function renderTool(container) {
  const $ = getJQuery();
  if (!$) {
    console.error('[YouYouToolkit] jQuery not available');
    return;
  }
  
  if (container) {
    if (typeof container === 'string') {
      $toolContainer = $(container);
    } else if (container && container.jquery) {
      $toolContainer = container;
    } else if (container) {
      $toolContainer = $(container);
    }
  }
  
  if (!$toolContainer || !$toolContainer.length) {
    console.error('[YouYouToolkit] Tool container not found');
    return;
  }
  
  const html = renderToolPanel();
  $toolContainer.html(html);
  bindToolEvents();
}

/**
 * 获取工具管理面板样式
 */
export function getToolStyles() {
  return `
    /* 工具管理面板样式 */
    .yyt-tool-manager {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .yyt-tool-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .yyt-tool-item {
      padding: 14px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      transition: all 0.2s ease;
    }
    
    .yyt-tool-item:hover {
      border-color: rgba(255, 255, 255, 0.15);
    }
    
    .yyt-tool-item.yyt-disabled {
      opacity: 0.5;
    }
    
    .yyt-tool-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .yyt-tool-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .yyt-tool-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--yyt-text);
    }
    
    .yyt-tool-category {
      font-size: 11px;
      padding: 2px 8px;
      background: rgba(123, 183, 255, 0.1);
      border-radius: 4px;
      color: var(--yyt-accent);
    }
    
    .yyt-tool-desc {
      font-size: 12px;
      color: var(--yyt-text-muted);
    }
    
    .yyt-bypass-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 200px;
      overflow-y: auto;
    }
    
    .yyt-bypass-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .yyt-bypass-item:hover {
      border-color: rgba(255, 255, 255, 0.15);
    }
    
    .yyt-bypass-item.yyt-active {
      border-color: var(--yyt-accent);
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.1) 0%, rgba(123, 183, 255, 0.02) 100%);
    }
    
    .yyt-bypass-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .yyt-bypass-name {
      font-weight: 500;
      font-size: 13px;
      color: var(--yyt-text);
    }
    
    .yyt-bypass-count {
      font-size: 11px;
      color: var(--yyt-text-muted);
    }
    
    .yyt-bypass-actions {
      display: flex;
      gap: 4px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    
    .yyt-bypass-item:hover .yyt-bypass-actions {
      opacity: 1;
    }
  `;
}

// 导出函数
export function getCurrentTab() {
  return 'main';
}

export function setCurrentTab(tab) {
  // 保持兼容性，但不再使用
}
