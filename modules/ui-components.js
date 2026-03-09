/**
 * YouYou Toolkit - UI组件模块
 * @description 提供API配置和预设管理的UI组件（合并版）
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
  generateUniquePresetName
} from './preset-manager.js';
import { loadSettings, saveSettings } from './storage.js';

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
  
  // 预设选择下拉选项
  const presetOptions = presets.length > 0
    ? presets.map(p => `<option value="${escapeHtml(p.name)}" ${p.name === activePresetName ? 'selected' : ''}>${escapeHtml(p.name)}</option>`).join('')
    : '';
  
  // 预设列表
  const presetList = presets.length > 0 
    ? presets.map(preset => `
        <div class="yyt-preset-item ${preset.name === activePresetName ? 'active' : ''}" data-preset-name="${escapeHtml(preset.name)}">
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
    : '<div class="yyt-empty-state-small"><i class="fa-solid fa-inbox"></i><span>暂无预设</span></div>';
  
  return `
    <div class="yyt-panel">
      <!-- 预设选择区 -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-bookmark"></i>
          <span>预设选择</span>
        </div>
        
        <div class="yyt-preset-selector">
          <select class="yyt-select yyt-flex-1" id="${SCRIPT_ID}-preset-select">
            <option value="">-- 当前配置 --</option>
            ${presetOptions}
          </select>
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-apply-preset">
            <i class="fa-solid fa-check"></i> 应用
          </button>
        </div>
        
        <div class="yyt-preset-list-compact">
          ${presetList}
        </div>
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
  
  // 预设选择下拉框变化
  $container.find(`#${SCRIPT_ID}-preset-select`).on('change', function() {
    const presetName = $(this).val();
    if (presetName) {
      const preset = getPreset(presetName);
      if (preset) {
        // 更新表单显示预设的配置（但不保存）
        fillFormWithConfig(preset.apiConfig);
      }
    }
  });
  
  // 应用预设按钮
  $container.find(`#${SCRIPT_ID}-apply-preset`).on('click', function() {
    const presetName = $container.find(`#${SCRIPT_ID}-preset-select`).val();
    
    if (!presetName) {
      // 使用当前配置，取消预设选择
      switchToPreset('');
      showToast('info', '已切换到当前配置');
      render();
      return;
    }
    
    const result = switchToPreset(presetName);
    showToast(result.success ? 'success' : 'error', result.message);
    if (result.success) {
      render();
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
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 32px;
      background-color: rgba(30, 30, 50, 0.9) !important;
      color: #ffffff !important;
    }
    
    /* 下拉框选项样式 - 使用固定颜色值 */
    .yyt-select option,
    .yyt-select optgroup {
      background-color: #1e1e32 !important;
      color: #ffffff !important;
      padding: 8px 12px;
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

// 导出函数
export function getCurrentTab() {
  return 'main';
}

export function setCurrentTab(tab) {
  // 保持兼容性，但不再使用
}