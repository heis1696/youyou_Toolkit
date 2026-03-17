/**
 * YouYou Toolkit - API连接管理模块
 * @description 处理API连接、请求发送和错误处理
 */

import { loadSettings, saveSettings, loadApiPresets } from './storage.js';

// ============================================================
// 常量定义
// ============================================================

const API_STATUS = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  SUCCESS: 'success',
  ERROR: 'error'
};

// ============================================================
// API配置管理
// ============================================================

/**
 * 获取当前API配置
 * @returns {Object}
 */
export function getApiConfig() {
  const settings = loadSettings();
  return settings.apiConfig || {};
}

/**
 * 更新API配置
 * @param {Object} config 
 */
export function updateApiConfig(config) {
  const settings = loadSettings();
  settings.apiConfig = {
    ...settings.apiConfig,
    ...config
  };
  saveSettings(settings);
}

/**
 * 验证API配置是否有效
 * @param {Object} config 
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validateApiConfig(config) {
  const errors = [];
  
  if (config.useMainApi) {
    // 使用主API时不需要验证URL和Key
    return { valid: true, errors: [] };
  }
  
  if (!config.url || !config.url.trim()) {
    errors.push('API URL 不能为空');
  } else {
    try {
      new URL(config.url);
    } catch (e) {
      errors.push('API URL 格式无效');
    }
  }
  
  if (!config.model || !config.model.trim()) {
    errors.push('模型名称不能为空');
  }
  
  // API Key可以为空（某些公开API不需要）
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================================
// API请求
// ============================================================

/**
 * 获取可用的API配置（支持预设切换）
 * @param {string} presetName - 预设名称，空表示使用当前配置
 * @returns {Object}
 */
export function getEffectiveApiConfig(presetName = '') {
  const settings = loadSettings();

  // 如果指定了预设，从预设列表中获取配置
  if (presetName) {
    const presets = loadApiPresets() || [];
    const preset = presets.find(p => p.name === presetName);
    if (preset && preset.apiConfig) {
      return {
        ...preset.apiConfig,
        presetName: preset.name
      };
    }
  }
  
  // 使用当前配置
  return settings.apiConfig || {};
}

/**
 * 检查指定预设是否存在
 * @param {string} presetName
 * @returns {boolean}
 */
export function hasEffectiveApiPreset(presetName = '') {
  if (!presetName) return false;

  const presets = loadApiPresets() || [];
  return presets.some(p => p?.name === presetName);
}

/**
 * 使用指定预设发送API请求
 * @param {string} presetName - 预设名称
 * @param {Array} messages - OpenAI格式消息
 * @param {Object} options - 请求选项
 * @param {AbortSignal} abortSignal - 中止信号
 * @returns {Promise<string>}
 */
export async function sendWithPreset(presetName, messages, options = {}, abortSignal = null) {
  const apiConfig = getEffectiveApiConfig(presetName);
  return await sendApiRequest(messages, {
    ...options,
    apiConfig
  }, abortSignal);
}

/**
 * 构建请求消息
 * @param {Array} messages - OpenAI格式的消息数组
 * @param {Object} options - 额外选项
 * @returns {Object}
 */
function buildRequestBody(messages, options = {}) {
  const config = options.apiConfig || getApiConfig();
  
  return {
    messages: messages,
    model: config.model || 'gpt-3.5-turbo',
    max_tokens: config.max_tokens || 4096,
    temperature: config.temperature ?? 0.7,
    top_p: config.top_p ?? 0.9,
    stream: false,
    ...options.extraParams
  };
}

/**
 * 从不同响应格式中提取文本内容
 * @param {Object} data
 * @returns {string}
 */
function extractResponseContent(data) {
  let content = '';

  if (data?.choices && data.choices[0]?.message?.content) {
    content = data.choices[0].message.content;
  }
  else if (data?.content) {
    content = data.content;
  }
  else if (data?.text) {
    content = data.text;
  }
  else if (data?.response) {
    content = data.response;
  }
  else {
    throw new Error(`无法解析API响应格式: ${JSON.stringify(data).slice(0, 200)}`);
  }

  return String(content || '').trim();
}

/**
 * 发送API请求
 * @param {Array} messages - OpenAI格式的消息数组
 * @param {Object} options - 请求选项
 * @param {AbortSignal} abortSignal - 中止信号
 * @returns {Promise<string>}
 */
export async function sendApiRequest(messages, options = {}, abortSignal = null) {
  const config = options.apiConfig || getApiConfig();
  const useMainApi = config.useMainApi;
  
  // 验证配置
  const validation = validateApiConfig(config);
  if (!validation.valid && !useMainApi) {
    throw new Error(`API配置无效: ${validation.errors.join(', ')}`);
  }
  
  // 使用主API（SillyTavern内置API）
  if (useMainApi) {
    return await sendViaMainApi(messages, options, abortSignal);
  }
  
  // 使用自定义API
  return await sendViaCustomApi(messages, config, options, abortSignal);
}

/**
 * 通过SillyTavern主API发送请求
 * @param {Array} messages 
 * @param {Object} options 
 * @param {AbortSignal} abortSignal 
 * @returns {Promise<string>}
 */
async function sendViaMainApi(messages, options, abortSignal) {
  const topWindow = (typeof window.parent !== 'undefined' ? window.parent : window);
  
  // 尝试获取TavernHelper
  if (!topWindow.TavernHelper?.generateRaw) {
    throw new Error('TavernHelper.generateRaw 不可用。请检查SillyTavern版本。');
  }
  
  try {
    const response = await topWindow.TavernHelper.generateRaw({
      ordered_prompts: messages,
      should_stream: false,
      ...options.extraParams
    });
    
    if (typeof response !== 'string') {
      throw new Error('主API返回了非预期的响应类型');
    }
    
    return response.trim();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error(`主API请求失败: ${error.message}`);
  }
}

/**
 * 通过自定义API发送请求
 * @param {Array} messages 
 * @param {Object} config 
 * @param {Object} options 
 * @param {AbortSignal} abortSignal 
 * @returns {Promise<string>}
 */
async function sendViaCustomApi(messages, config, options, abortSignal) {
  const topWindow = (typeof window.parent !== 'undefined' ? window.parent : window);

  if (topWindow.SillyTavern?.getRequestHeaders) {
    try {
      return await sendViaSillyTavernCustomApi(messages, config, options, abortSignal, topWindow);
    } catch (error) {
      // 某些环境下酒馆后端路由可能不可用，回退到直接请求
    }
  }

  return await sendViaDirectCustomApi(messages, config, options, abortSignal);
}

/**
 * 通过 SillyTavern 后端转发自定义 API 请求，避免浏览器直连带来的 CORS / HTML 重定向问题
 * @param {Array} messages
 * @param {Object} config
 * @param {Object} options
 * @param {AbortSignal} abortSignal
 * @param {Window} topWindow
 * @returns {Promise<string>}
 */
async function sendViaSillyTavernCustomApi(messages, config, options, abortSignal, topWindow) {
  const requestBody = {
    ...buildRequestBody(messages, { apiConfig: config, ...options }),
    chat_completion_source: 'custom',
    reverse_proxy: config.url,
    proxy_password: '',
    custom_url: config.url,
    custom_include_headers: config.apiKey ? `Authorization: Bearer ${config.apiKey}` : ''
  };

  const headers = {
    ...(typeof topWindow.SillyTavern?.getRequestHeaders === 'function'
      ? topWindow.SillyTavern.getRequestHeaders()
      : {}),
    'Content-Type': 'application/json'
  };

  const response = await fetch('/api/backends/chat-completions/generate', {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
    signal: abortSignal
  });

  const responseText = await response.text().catch(() => '');

  if (!response.ok) {
    throw new Error(`酒馆后端转发请求失败 (${response.status}): ${responseText || 'Unknown error'}`);
  }

  let data = null;
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    const snippet = String(responseText || '').replace(/\s+/g, ' ').trim().slice(0, 120);
    throw new Error(`酒馆后端返回了非JSON内容。响应片段: ${snippet || '(空响应)'}`);
  }

  return extractResponseContent(data);
}

/**
 * 直接请求自定义 API
 * @param {Array} messages
 * @param {Object} config
 * @param {Object} options
 * @param {AbortSignal} abortSignal
 * @returns {Promise<string>}
 */
async function sendViaDirectCustomApi(messages, config, options, abortSignal) {
  const requestBody = buildRequestBody(messages, { apiConfig: config, ...options });
  
  // 构建请求头
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`;
  }
  
  // 发送请求
  const response = await fetch(config.url, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
    signal: abortSignal
  });

  const responseText = await response.text().catch(() => '');
  
  if (!response.ok) {
    const errorText = responseText || 'Unknown error';
    throw new Error(`API请求失败 (${response.status}): ${errorText}`);
  }

  let data = null;
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch (error) {
    const snippet = String(responseText || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 120);
    throw new Error(
      `自定义API返回的不是JSON，可能是URL配置错误或请求被重定向。请检查API URL，或改为启用“使用SillyTavern主API”。响应片段: ${snippet || '(空响应)'}`
    );
  }
  
  return extractResponseContent(data);
}

/**
 * 测试API连接
 * @param {Object} config - 可选的配置，如果不提供则使用当前配置
 * @returns {Promise<Object>} { success: boolean, message: string, latency?: number }
 */
export async function testApiConnection(config = null) {
  const apiConfig = config || getApiConfig();
  const startTime = Date.now();
  
  try {
    // 发送一个简单的测试请求
    const testMessages = [
      { role: 'user', content: 'Hello, this is a connection test. Please respond with "OK".' }
    ];
    
    await sendApiRequest(testMessages, { apiConfig });
    
    const latency = Date.now() - startTime;
    
    return {
      success: true,
      message: `连接成功 (延迟: ${latency}ms)`,
      latency
    };
  } catch (error) {
    return {
      success: false,
      message: `连接失败: ${error.message}`,
      latency: Date.now() - startTime
    };
  }
}

// ============================================================
// 模型列表获取
// ============================================================

/**
 * 获取可用模型列表
 * @param {Object} config - API配置
 * @returns {Promise<Array<string>>}
 */
export async function fetchAvailableModels(config = null) {
  const apiConfig = config || getApiConfig();
  
  if (apiConfig.useMainApi) {
    // 主API的模型列表
    return await fetchMainApiModels();
  }
  
  return await fetchCustomApiModels(apiConfig);
}

/**
 * 获取主API的模型列表
 * @returns {Promise<Array<string>>}
 */
async function fetchMainApiModels() {
  const topWindow = (typeof window.parent !== 'undefined' ? window.parent : window);
  
  try {
    // 尝试从SillyTavern获取模型列表
    if (topWindow.SillyTavern?.getContext) {
      const context = topWindow.SillyTavern.getContext();
      
      // 从设置中获取
      if (context.settings?.api_server) {
        return [context.settings.api_server];
      }
    }
    
    // 回退到常见模型
    return ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'claude-3-opus', 'claude-3-sonnet'];
  } catch (e) {
    return ['gpt-4', 'gpt-3.5-turbo'];
  }
}

/**
 * 获取自定义API的模型列表
 * @param {Object} config 
 * @returns {Promise<Array<string>>}
 */
async function fetchCustomApiModels(config) {
  if (!config.url || !config.apiKey) {
    return [];
  }
  
  try {
    // 尝试从/v1/models端点获取
    const baseUrl = config.url.replace(/\/chat\/completions$/, '').replace(/\/completions$/, '');
    const modelsUrl = `${baseUrl}/models`;
    
    const response = await fetch(modelsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`
      }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    if (data.data && Array.isArray(data.data)) {
      return data.data
        .map(model => model.id || model.name)
        .filter(Boolean)
        .sort();
    }
    
    return [];
  } catch (e) {
    // 如果获取失败，返回空数组
    return [];
  }
}

// ============================================================
// 导出
// ============================================================

export { API_STATUS };