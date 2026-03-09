/**
 * YouYou Toolkit - UI组件模块
 * @description 提供API配置和预设管理的UI组件
 */

import { getApiConfig, updateApiConfig, testApiConnection, fetchAvailableModels, validateApiConfig } from './api-connection.js';
import { 
  getAllPresets, 
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
// Tab导航
// ============================================================

let currentTab = 'api';
let $container = null;
let cachedJQuery = null;

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

/**
 * 渲染Tab导航
 * @returns {string}
 */
function renderTabNav() {
  const tabs = [
    { id: 'api', name: 'API配置', icon: 'fa-plug' },
    { id: 'presets', name: '预设管理', icon: 'fa-bookmark' },
    { id: 'test', name: '连接测试', icon: 'fa-flask' }
  ];
  
  const tabItems = tabs.map(tab => `
    <div class="yyt-tab-item ${currentTab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
      <i class="fa-solid ${tab.icon}"></i>
      <span>${tab.name}</span>
    </div>
  `).join('');
  
  return `<div class="yyt-tab-nav">${tabItems}</div>`;
}

/**
 * 渲染Tab内容
 * @returns {string}
 */
function renderTabContent() {
  switch (currentTab) {
    case 'api':
      return renderApiConfigPanel();
    case 'presets':
      return renderPresetManagerPanel();
    case 'test':
      return renderTestPanel();
    default:
      return '';
  }
}

// ============================================================
// API配置面板
// ============================================================

function renderApiConfigPanel() {
  const config = getApiConfig();
  const activeConfig = getActiveConfig();
  const activePresetName = activeConfig.presetName;
  
  return `
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-circle-info"></i>
          <span>当前状态</span>
        </div>
        <div class="yyt-status-bar">
          ${activePresetName 
            ? `<span class="yyt-badge yyt-badge-info">使用预设: ${escapeHtml(activePresetName)}</span>` 
            : '<span class="yyt-badge yyt-badge-default">使用当前配置</span>'}
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>API配置</span>
        </div>
        
        <div class="yyt-form-group">
          <label class="yyt-checkbox-label">
            <input type="checkbox" id="${SCRIPT_ID}-use-main-api" ${config.useMainApi ? 'checked' : ''}>
            <span>使用SillyTavern主API</span>
          </label>
          <div class="yyt-hint">勾选后将使用SillyTavern内置的API配置</div>
        </div>
        
        <div id="${SCRIPT_ID}-custom-api-fields" class="${config.useMainApi ? 'yyt-disabled' : ''}">
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${SCRIPT_ID}-api-url">API URL</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-api-url" 
                     value="${escapeHtml(config.url || '')}" 
                     placeholder="https://api.openai.com/v1/chat/completions">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${SCRIPT_ID}-api-key">API Key</label>
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
              <label for="${SCRIPT_ID}-model">模型</label>
              <div class="yyt-input-group">
                <input type="text" class="yyt-input" id="${SCRIPT_ID}-model" 
                       value="${escapeHtml(config.model || '')}" 
                       placeholder="gpt-4">
                <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-load-models" title="加载模型列表">
                  <i class="fa-solid fa-refresh"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row yyt-form-row-2col">
            <div class="yyt-form-group">
              <label for="${SCRIPT_ID}-max-tokens">Max Tokens</label>
              <input type="number" class="yyt-input" id="${SCRIPT_ID}-max-tokens" 
                     value="${config.max_tokens || 4096}" min="1" max="128000">
            </div>
            
            <div class="yyt-form-group">
              <label for="${SCRIPT_ID}-temperature">Temperature</label>
              <input type="number" class="yyt-input" id="${SCRIPT_ID}-temperature" 
                     value="${config.temperature ?? 0.7}" min="0" max="2" step="0.1">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${SCRIPT_ID}-top-p">Top P</label>
              <input type="number" class="yyt-input" id="${SCRIPT_ID}-top-p" 
                     value="${config.top_p ?? 0.9}" min="0" max="1" step="0.1">
            </div>
          </div>
        </div>
      </div>
      
      <div class="yyt-panel-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-reset-api-config">
          <i class="fa-solid fa-undo"></i> 重置
        </button>
        <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-save-api-config">
          <i class="fa-solid fa-save"></i> 保存配置
        </button>
      </div>
    </div>
  `;
}

// ============================================================
// 预设管理面板
// ============================================================

function renderPresetManagerPanel() {
  const presets = getAllPresets();
  const activePresetName = getActivePresetName();
  
  const presetList = presets.length > 0 
    ? presets.map(preset => `
        <div class="yyt-preset-item ${preset.name === activePresetName ? 'active' : ''}" data-preset-name="${escapeHtml(preset.name)}">
          <div class="yyt-preset-info">
            <div class="yyt-preset-name">${escapeHtml(preset.name)}</div>
            <div class="yyt-preset-desc">${escapeHtml(preset.description || '无描述')}</div>
            <div class="yyt-preset-meta">
              ${preset.apiConfig.useMainApi 
                ? '<span class="yyt-badge yyt-badge-small">主API</span>' 
                : `<span class="yyt-badge yyt-badge-small">${escapeHtml(preset.apiConfig.model || '未设置')}</span>`}
            </div>
          </div>
          <div class="yyt-preset-actions">
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="activate" title="激活">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="edit" title="编辑">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="duplicate" title="复制">
              <i class="fa-solid fa-copy"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger" data-action="delete" title="删除">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join('')
    : '<div class="yyt-empty-state"><i class="fa-solid fa-inbox"></i><p>暂无预设</p></div>';
  
  return `
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-list"></i>
          <span>预设列表</span>
          <span class="yyt-count-badge">${presets.length}</span>
        </div>
        
        <div class="yyt-preset-list">
          ${presetList}
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-plus-circle"></i>
          <span>创建预设</span>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-new-preset-name" 
                   placeholder="预设名称" value="${generateUniquePresetName('新预设')}">
          </div>
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-create-preset">
            <i class="fa-solid fa-plus"></i> 从当前配置创建
          </button>
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-file-import"></i>
          <span>导入/导出</span>
        </div>
        
        <div class="yyt-button-row">
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-export-presets">
            <i class="fa-solid fa-download"></i> 导出全部
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-import-presets">
            <i class="fa-solid fa-upload"></i> 导入
          </button>
          <input type="file" id="${SCRIPT_ID}-import-file" accept=".json" style="display:none">
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// 测试面板
// ============================================================

function renderTestPanel() {
  const config = getApiConfig();
  const presetNames = getPresetNames();
  const activePresetName = getActivePresetName();
  
  const presetOptions = presetNames.length > 0
    ? presetNames.map(name => `<option value="${escapeHtml(name)}" ${name === activePresetName ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('')
    : '';
  
  return `
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-vial"></i>
          <span>连接测试</span>
        </div>
        
        <div class="yyt-form-group">
          <label for="${SCRIPT_ID}-test-preset">选择配置</label>
          <select class="yyt-select" id="${SCRIPT_ID}-test-preset">
            <option value="">当前API配置</option>
            ${presetOptions}
          </select>
        </div>
        
        <div class="yyt-form-group">
          <label for="${SCRIPT_ID}-test-message">测试消息</label>
          <textarea class="yyt-textarea" id="${SCRIPT_ID}-test-message" rows="3" 
                    placeholder="输入测试消息...">Hello, this is a test message.</textarea>
        </div>
        
        <div class="yyt-button-row">
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-run-test">
            <i class="fa-solid fa-play"></i> 运行测试
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-test-connection">
            <i class="fa-solid fa-wifi"></i> 测试连接
          </button>
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-terminal"></i>
          <span>测试结果</span>
        </div>
        
        <div class="yyt-result-box" id="${SCRIPT_ID}-test-result">
          <div class="yyt-result-placeholder">
            <i class="fa-solid fa-arrow-up"></i>
            <p>运行测试后结果将显示在这里</p>
          </div>
        </div>
      </div>
    </div>
  `;
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
  
  // Tab切换
  $container.find('.yyt-tab-item').off('click').on('click', function() {
    const tab = $(this).data('tab');
    if (tab && tab !== currentTab) {
      currentTab = tab;
      render();
    }
  });
  
  // 根据当前Tab绑定特定事件
  switch (currentTab) {
    case 'api':
      bindApiConfigEvents();
      break;
    case 'presets':
      bindPresetManagerEvents();
      break;
    case 'test':
      bindTestEvents();
      break;
  }
}

function bindApiConfigEvents() {
  const $ = getJQuery();
  if (!$ || !isContainerValid()) return;
  
  // 切换主API
  $container.find(`#${SCRIPT_ID}-use-main-api`).on('change', function() {
    const useMainApi = $(this).is(':checked');
    const $customFields = $container.find(`#${SCRIPT_ID}-custom-api-fields`);
    
    if (useMainApi) {
      $customFields.addClass('yyt-disabled').find('input, button').prop('disabled', true);
    } else {
      $customFields.removeClass('yyt-disabled').find('input, button').prop('disabled', false);
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
  $container.find(`#${SCRIPT_ID}-load-models`).on('click', async function() {
    const $btn = $(this);
    const $input = $container.find(`#${SCRIPT_ID}-model`);
    
    $btn.prop('disabled', true).find('i').addClass('fa-spin');
    
    try {
      const config = getFormApiConfig();
      const models = await fetchAvailableModels(config);
      
      if (models.length > 0) {
        // 创建选择器
        let $select = $container.find(`#${SCRIPT_ID}-model-select`);
        if ($select.length === 0) {
          $select = $(`<select class="yyt-select" id="${SCRIPT_ID}-model-select">`).insertAfter($input);
          $input.hide();
        }
        
        $select.empty();
        models.forEach(model => {
          $select.append(`<option value="${escapeHtml(model)}">${escapeHtml(model)}</option>`);
        });
        
        // 绑定选择事件
        $select.off('change').on('change', function() {
          $input.val($(this).val());
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
  
  // 保存配置
  $container.find(`#${SCRIPT_ID}-save-api-config`).on('click', function() {
    const config = getFormApiConfig();
    
    // 验证
    const validation = validateApiConfig(config);
    if (!validation.valid && !config.useMainApi) {
      showToast('error', validation.errors.join(', '));
      return;
    }
    
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
}

function bindPresetManagerEvents() {
  const $ = getJQuery();
  if (!$ || !isContainerValid()) return;
  
  // 预设项操作
  $container.find('.yyt-preset-item').on('click', function(e) {
    const $item = $(this);
    const presetName = $item.data('preset-name');
    const action = $(e.target).closest('[data-action]').data('action');
    
    if (!action) return;
    
    e.stopPropagation();
    
    switch (action) {
      case 'activate':
        const result = switchToPreset(presetName);
        showToast(result.success ? 'success' : 'error', result.message);
        if (result.success) render();
        break;
        
      case 'edit':
        showPresetEditDialog(presetName);
        break;
        
      case 'duplicate':
        const newName = generateUniquePresetName(presetName);
        if (confirm(`确定要复制预设 "${presetName}" 为 "${newName}" 吗？`)) {
          importPresets(JSON.stringify([{ ...getPreset(presetName), name: newName }]));
          render();
        }
        break;
        
      case 'delete':
        if (confirm(`确定要删除预设 "${presetName}" 吗？`)) {
          const delResult = deletePreset(presetName);
          showToast(delResult.success ? 'info' : 'error', delResult.message);
          if (delResult.success) render();
        }
        break;
    }
  });
  
  // 创建预设
  $container.find(`#${SCRIPT_ID}-create-preset`).on('click', function() {
    const name = $container.find(`#${SCRIPT_ID}-new-preset-name`).val().trim();
    
    if (!name) {
      showToast('warning', '请输入预设名称');
      return;
    }
    
    const result = createPresetFromCurrentConfig(name);
    showToast(result.success ? 'success' : 'error', result.message);
    
    if (result.success) {
      $container.find(`#${SCRIPT_ID}-new-preset-name`).val(generateUniquePresetName('新预设'));
      render();
    }
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

function bindTestEvents() {
  const $ = getJQuery();
  if (!$ || !isContainerValid()) return;
  
  // 测试连接
  $container.find(`#${SCRIPT_ID}-test-connection`).on('click', async function() {
    const $btn = $(this);
    const $result = $container.find(`#${SCRIPT_ID}-test-result`);
    const presetName = $container.find(`#${SCRIPT_ID}-test-preset`).val();
    
    $btn.prop('disabled', true);
    $result.html('<div class="yyt-loading"><i class="fa-solid fa-spinner fa-spin"></i> 正在测试连接...</div>');
    
    try {
      const config = presetName ? getPreset(presetName)?.apiConfig : getApiConfig();
      const result = await testApiConnection(config);
      
      $result.html(`
        <div class="yyt-result ${result.success ? 'yyt-result-success' : 'yyt-result-error'}">
          <i class="fa-solid ${result.success ? 'fa-check-circle' : 'fa-times-circle'}"></i>
          <div>
            <div class="yyt-result-title">${result.success ? '连接成功' : '连接失败'}</div>
            <div class="yyt-result-message">${escapeHtml(result.message)}</div>
          </div>
        </div>
      `);
    } catch (e) {
      $result.html(`
        <div class="yyt-result yyt-result-error">
          <i class="fa-solid fa-times-circle"></i>
          <div>
            <div class="yyt-result-title">测试失败</div>
            <div class="yyt-result-message">${escapeHtml(e.message)}</div>
          </div>
        </div>
      `);
    } finally {
      $btn.prop('disabled', false);
    }
  });
  
  // 运行测试
  $container.find(`#${SCRIPT_ID}-run-test`).on('click', async function() {
    const $btn = $(this);
    const $result = $container.find(`#${SCRIPT_ID}-test-result`);
    const $message = $container.find(`#${SCRIPT_ID}-test-message`);
    const presetName = $container.find(`#${SCRIPT_ID}-test-preset`).val();
    const message = $message.val().trim();
    
    if (!message) {
      showToast('warning', '请输入测试消息');
      return;
    }
    
    $btn.prop('disabled', true);
    $result.html('<div class="yyt-loading"><i class="fa-solid fa-spinner fa-spin"></i> 正在发送请求...</div>');
    
    try {
      const { sendApiRequest } = await import('./api-connection.js');
      const config = presetName ? getPreset(presetName)?.apiConfig : getApiConfig();
      
      const response = await sendApiRequest([
        { role: 'user', content: message }
      ], { apiConfig: config });
      
      $result.html(`
        <div class="yyt-result yyt-result-success">
          <div class="yyt-result-title">响应成功</div>
          <div class="yyt-result-content">${escapeHtml(response)}</div>
        </div>
      `);
    } catch (e) {
      $result.html(`
        <div class="yyt-result yyt-result-error">
          <i class="fa-solid fa-times-circle"></i>
          <div>
            <div class="yyt-result-title">请求失败</div>
            <div class="yyt-result-message">${escapeHtml(e.message)}</div>
          </div>
        </div>
      `);
    } finally {
      $btn.prop('disabled', false);
    }
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
  
  return {
    url: $container.find(`#${SCRIPT_ID}-api-url`).val()?.trim() || '',
    apiKey: $container.find(`#${SCRIPT_ID}-api-key`).val() || '',
    model: $container.find(`#${SCRIPT_ID}-model`).val()?.trim() || '',
    useMainApi: $container.find(`#${SCRIPT_ID}-use-main-api`).is(':checked'),
    max_tokens: parseInt($container.find(`#${SCRIPT_ID}-max-tokens`).val()) || 4096,
    temperature: parseFloat($container.find(`#${SCRIPT_ID}-temperature`).val()) ?? 0.7,
    top_p: parseFloat($container.find(`#${SCRIPT_ID}-top-p`).val()) ?? 0.9
  };
}

function showPresetEditDialog(presetName) {
  const preset = getPreset(presetName);
  if (!preset) return;
  
  // 简单实现：使用prompt
  const newDescription = prompt('编辑预设描述:', preset.description || '');
  if (newDescription !== null) {
    updatePreset(presetName, { description: newDescription });
    showToast('success', '预设已更新');
    render();
  }
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
  
  const html = `
    <div class="yyt-api-manager">
      ${renderTabNav()}
      <div class="yyt-tab-content">
        ${renderTabContent()}
      </div>
    </div>
  `;
  
  $container.html(html);
  bindEvents();
}

export function getStyles() {
  return `
    /* ============================================================
       YouYou Toolkit - 现代化UI样式
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
    
    /* Tab导航 - 现代化设计 */
    .yyt-tab-nav {
      display: flex;
      gap: 6px;
      padding: 6px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: var(--yyt-radius);
      margin-bottom: 20px;
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-tab-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      border-radius: var(--yyt-radius-sm);
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--yyt-text-secondary);
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }
    
    .yyt-tab-item::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    
    .yyt-tab-item:hover {
      color: var(--yyt-text);
      background: var(--yyt-surface-hover);
    }
    
    .yyt-tab-item.active {
      color: #0b0f15;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-tab-item.active::before {
      opacity: 1;
    }
    
    .yyt-tab-item i {
      font-size: 14px;
      transition: transform 0.25s ease;
    }
    
    .yyt-tab-item:hover i {
      transform: scale(1.1);
    }
    
    .yyt-tab-item span {
      position: relative;
      z-index: 1;
    }
    
    .yyt-tab-content {
      flex: 1;
      overflow: auto;
      padding-right: 4px;
    }
    
    .yyt-tab-content::-webkit-scrollbar {
      width: 6px;
    }
    
    .yyt-tab-content::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .yyt-tab-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }
    
    .yyt-tab-content::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    
    /* 面板 */
    .yyt-panel {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .yyt-panel-section {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 20px;
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
    
    .yyt-count-badge {
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 20px;
      background: linear-gradient(135deg, var(--yyt-accent-soft) 0%, rgba(123, 183, 255, 0.08) 100%);
      color: var(--yyt-accent);
      font-weight: 600;
      border: 1px solid rgba(123, 183, 255, 0.2);
    }
    
    /* 状态栏 */
    .yyt-status-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 18px;
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.08) 0%, rgba(123, 183, 255, 0.02) 100%);
      border-radius: var(--yyt-radius-sm);
      border: 1px solid rgba(123, 183, 255, 0.15);
    }
    
    /* 徽章 */
    .yyt-badge {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
    
    .yyt-badge-small {
      padding: 3px 10px;
      font-size: 11px;
    }
    
    .yyt-badge-info {
      background: linear-gradient(135deg, var(--yyt-accent-soft) 0%, rgba(123, 183, 255, 0.08) 100%);
      color: var(--yyt-accent);
      border: 1px solid rgba(123, 183, 255, 0.25);
      box-shadow: 0 2px 10px rgba(123, 183, 255, 0.15);
    }
    
    .yyt-badge-default {
      background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text-secondary);
      border: 1px solid var(--yyt-border);
    }
    
    /* 表单 */
    .yyt-form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .yyt-form-group label {
      font-size: 13px;
      font-weight: 600;
      color: var(--yyt-text-secondary);
      letter-spacing: 0.3px;
    }
    
    .yyt-form-row {
      display: flex;
      gap: 14px;
    }
    
    .yyt-form-row-2col > .yyt-form-group {
      flex: 1;
    }
    
    .yyt-flex-1 {
      flex: 1;
    }
    
    /* 输入框 - 现代化设计 */
    .yyt-input,
    .yyt-select,
    .yyt-textarea {
      padding: 12px 16px;
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      color: var(--yyt-text);
      font-size: 14px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
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
      gap: 10px;
    }
    
    .yyt-input-group .yyt-input {
      flex: 1;
    }
    
    /* 复选框 */
    .yyt-checkbox-label {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 12px 16px;
      background: var(--yyt-surface);
      border-radius: var(--yyt-radius-sm);
      border: 1px solid var(--yyt-border);
      transition: all 0.2s ease;
    }
    
    .yyt-checkbox-label:hover {
      background: var(--yyt-surface-hover);
      border-color: var(--yyt-border-strong);
    }
    
    .yyt-checkbox-label input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: var(--yyt-accent);
    }
    
    .yyt-hint {
      font-size: 12px;
      color: var(--yyt-text-muted);
      padding-left: 4px;
    }
    
    .yyt-disabled {
      opacity: 0.4;
      pointer-events: none;
      filter: grayscale(0.5);
    }
    
    .yyt-button-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    /* 面板底部 */
    .yyt-panel-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 20px;
      margin-top: 4px;
      border-top: 1px solid var(--yyt-border);
    }
    
    /* 按钮 - 现代化设计 */
    .yyt-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      border: none;
      border-radius: var(--yyt-radius-sm);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      letter-spacing: 0.3px;
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
      padding: 10px;
      min-width: 40px;
    }
    
    .yyt-btn-small {
      padding: 8px 12px;
      font-size: 12px;
    }
    
    .yyt-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }
    
    /* 预设列表 - 现代化设计 */
    .yyt-preset-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 300px;
      overflow-y: auto;
      padding-right: 4px;
    }
    
    .yyt-preset-list::-webkit-scrollbar {
      width: 6px;
    }
    
    .yyt-preset-list::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .yyt-preset-list::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }
    
    .yyt-preset-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }
    
    .yyt-preset-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateX(4px);
    }
    
    .yyt-preset-item.active {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      border-color: rgba(123, 183, 255, 0.35);
      box-shadow: 0 0 20px var(--yyt-accent-soft), inset 0 1px 0 rgba(123, 183, 255, 0.1);
    }
    
    .yyt-preset-info {
      flex: 1;
      min-width: 0;
    }
    
    .yyt-preset-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--yyt-text);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .yyt-preset-desc {
      font-size: 12px;
      color: var(--yyt-text-muted);
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .yyt-preset-meta {
      display: flex;
      gap: 8px;
    }
    
    .yyt-preset-actions {
      display: flex;
      gap: 6px;
      opacity: 0.5;
      transition: opacity 0.2s ease;
    }
    
    .yyt-preset-item:hover .yyt-preset-actions {
      opacity: 1;
    }
    
    /* 空状态 */
    .yyt-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 20px;
      color: var(--yyt-text-muted);
    }
    
    .yyt-empty-state i {
      font-size: 56px;
      margin-bottom: 20px;
      opacity: 0.4;
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
    }
    
    .yyt-empty-state p {
      font-size: 15px;
      letter-spacing: 0.5px;
    }
    
    /* 测试结果 - 现代化设计 */
    .yyt-result-box {
      min-height: 160px;
      padding: 20px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius);
      font-family: 'SF Mono', 'Consolas', 'Monaco', monospace;
    }
    
    .yyt-result-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 120px;
      color: var(--yyt-text-muted);
    }
    
    .yyt-result-placeholder i {
      font-size: 28px;
      margin-bottom: 12px;
      opacity: 0.5;
      animation: yytFloat 2s ease-in-out infinite;
    }
    
    @keyframes yytFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    
    .yyt-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: var(--yyt-accent);
      font-size: 14px;
    }
    
    .yyt-loading i {
      font-size: 18px;
    }
    
    .yyt-result {
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }
    
    .yyt-result i {
      font-size: 22px;
      margin-top: 2px;
    }
    
    .yyt-result-success {
      padding: 16px;
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.02) 100%);
      border-radius: var(--yyt-radius-sm);
      border: 1px solid rgba(74, 222, 128, 0.2);
    }
    
    .yyt-result-success i {
      color: var(--yyt-success);
      filter: drop-shadow(0 0 8px var(--yyt-success-glow));
    }
    
    .yyt-result-error {
      padding: 16px;
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.1) 0%, rgba(248, 113, 113, 0.02) 100%);
      border-radius: var(--yyt-radius-sm);
      border: 1px solid rgba(248, 113, 113, 0.2);
    }
    
    .yyt-result-error i {
      color: var(--yyt-error);
      filter: drop-shadow(0 0 8px var(--yyt-error-glow));
    }
    
    .yyt-result-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 6px;
      color: var(--yyt-text);
    }
    
    .yyt-result-message {
      font-size: 13px;
      color: var(--yyt-text-secondary);
      line-height: 1.5;
    }
    
    .yyt-result-content {
      font-size: 13px;
      color: var(--yyt-text);
      white-space: pre-wrap;
      word-break: break-word;
      max-height: 220px;
      overflow-y: auto;
      background: rgba(0, 0, 0, 0.25);
      padding: 14px 16px;
      border-radius: var(--yyt-radius-sm);
      margin-top: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      line-height: 1.6;
    }
    
    /* 动画 */
    @keyframes yytFadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .yyt-panel-section {
      animation: yytFadeSlideIn 0.3s ease-out backwards;
    }
    
    .yyt-panel-section:nth-child(1) { animation-delay: 0s; }
    .yyt-panel-section:nth-child(2) { animation-delay: 0.05s; }
    .yyt-panel-section:nth-child(3) { animation-delay: 0.1s; }
  `;
}

// 导出当前Tab
export function getCurrentTab() {
  return currentTab;
}

export function setCurrentTab(tab) {
  currentTab = tab;
}