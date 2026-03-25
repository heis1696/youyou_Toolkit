/**
 * YouYou Toolkit - 预设管理模块
 * @description 管理API预设的创建、加载、保存和删除
 */

import { storage } from './core/storage-service.js';

const SETTINGS_STORAGE_KEY = 'settings';
const API_PRESETS_STORAGE_KEY = 'api_presets';
const CURRENT_PRESET_STORAGE_KEY = 'current_preset';

function getDefaultSettingsSnapshot() {
  return {
    apiConfig: {
      url: '',
      apiKey: '',
      model: '',
      useMainApi: true,
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 0.9
    },
    currentPreset: '',
    uiSettings: {
      theme: 'dark',
      lastTab: 'api'
    }
  };
}

function loadStoredSettings() {
  return storage.get(SETTINGS_STORAGE_KEY, getDefaultSettingsSnapshot());
}

function loadStoredApiPresets() {
  return storage.get(API_PRESETS_STORAGE_KEY, []);
}

function saveStoredApiPresets(presets) {
  storage.set(API_PRESETS_STORAGE_KEY, presets);
}

function getStoredCurrentPresetName() {
  return storage.get(CURRENT_PRESET_STORAGE_KEY, '');
}

function setStoredCurrentPresetName(name) {
  storage.set(CURRENT_PRESET_STORAGE_KEY, name || '');
}

// ============================================================
// 预设结构定义
// ============================================================

/**
 * 预设对象结构
 * @typedef {Object} ApiPreset
 * @property {string} name - 预设名称
 * @property {string} description - 预设描述
 * @property {Object} apiConfig - API配置
 * @property {string} apiConfig.url - API URL
 * @property {string} apiConfig.apiKey - API Key
 * @property {string} apiConfig.model - 模型名称
 * @property {boolean} apiConfig.useMainApi - 是否使用主API
 * @property {number} apiConfig.max_tokens - 最大token数
 * @property {number} apiConfig.temperature - 温度
 * @property {number} apiConfig.top_p - Top P
 * @property {number} createdAt - 创建时间
 * @property {number} updatedAt - 更新时间
 */

// ============================================================
// 预设管理函数
// ============================================================

/**
 * 获取所有预设
 * @returns {Array<ApiPreset>}
 */
export function getAllPresets() {
  return loadStoredApiPresets();
}

/**
 * 获取预设名称列表
 * @returns {Array<string>}
 */
export function getPresetNames() {
  const presets = loadStoredApiPresets();
  return presets.map(p => p.name);
}

/**
 * 获取指定预设
 * @param {string} name - 预设名称
 * @returns {ApiPreset|null}
 */
export function getPreset(name) {
  if (!name || typeof name !== 'string') return null;
  
  const presets = loadStoredApiPresets();
  return presets.find(p => p.name === name) || null;
}

/**
 * 检查预设是否存在
 * @param {string} name - 预设名称
 * @returns {boolean}
 */
export function presetExists(name) {
  if (!name || typeof name !== 'string') return false;
  
  const presets = loadStoredApiPresets();
  return presets.some(p => p.name === name);
}

/**
 * 创建新预设
 * @param {Object} presetData - 预设数据
 * @returns {Object} { success: boolean, message: string, preset?: ApiPreset }
 */
export function createPreset(presetData) {
  const { name, description, apiConfig } = presetData;
  
  // 验证名称
  if (!name || typeof name !== 'string' || !name.trim()) {
    return { success: false, message: '预设名称不能为空' };
  }
  
  const trimmedName = name.trim();
  
  // 检查是否已存在
  if (presetExists(trimmedName)) {
    return { success: false, message: `预设 "${trimmedName}" 已存在` };
  }
  
  // 创建预设对象
  const preset = {
    name: trimmedName,
    description: description || '',
    apiConfig: {
      url: apiConfig?.url || '',
      apiKey: apiConfig?.apiKey || '',
      model: apiConfig?.model || '',
      useMainApi: apiConfig?.useMainApi ?? true,
      max_tokens: apiConfig?.max_tokens || 4096,
      temperature: apiConfig?.temperature ?? 0.7,
      top_p: apiConfig?.top_p ?? 0.9
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  
  // 保存预设
  const presets = loadStoredApiPresets();
  presets.push(preset);
  saveStoredApiPresets(presets);
  
  return { success: true, message: `预设 "${trimmedName}" 创建成功`, preset };
}

/**
 * 更新预设
 * @param {string} name - 预设名称
 * @param {Object} updates - 要更新的字段
 * @returns {Object} { success: boolean, message: string, preset?: ApiPreset }
 */
export function updatePreset(name, updates) {
  if (!name || typeof name !== 'string') {
    return { success: false, message: '预设名称不能为空' };
  }
  
  const presets = loadStoredApiPresets();
  const index = presets.findIndex(p => p.name === name);
  
  if (index === -1) {
    return { success: false, message: `预设 "${name}" 不存在` };
  }
  
  // 不允许修改名称（需要先删除再创建）
  if (updates.name && updates.name !== name) {
    return { success: false, message: '不支持修改预设名称，请创建新预设' };
  }
  
  // 更新预设
  const existingPreset = presets[index];
  const updatedPreset = {
    ...existingPreset,
    ...updates,
    name: existingPreset.name, // 保持原名称
    updatedAt: Date.now()
  };
  
  // 如果提供了apiConfig，合并更新
  if (updates.apiConfig) {
    updatedPreset.apiConfig = {
      ...existingPreset.apiConfig,
      ...updates.apiConfig
    };
  }
  
  presets[index] = updatedPreset;
  saveStoredApiPresets(presets);
  
  return { success: true, message: `预设 "${name}" 更新成功`, preset: updatedPreset };
}

/**
 * 删除预设
 * @param {string} name - 预设名称
 * @returns {Object} { success: boolean, message: string }
 */
export function deletePreset(name) {
  if (!name || typeof name !== 'string') {
    return { success: false, message: '预设名称不能为空' };
  }
  
  const presets = loadStoredApiPresets();
  const index = presets.findIndex(p => p.name === name);
  
  if (index === -1) {
    return { success: false, message: `预设 "${name}" 不存在` };
  }
  
  // 删除预设
  presets.splice(index, 1);
  saveStoredApiPresets(presets);
  
  // 如果删除的是当前使用的预设，清除当前预设
  if (getStoredCurrentPresetName() === name) {
    setStoredCurrentPresetName('');
  }
  
  return { success: true, message: `预设 "${name}" 已删除` };
}

/**
 * 重命名预设
 * @param {string} oldName - 旧名称
 * @param {string} newName - 新名称
 * @returns {Object} { success: boolean, message: string }
 */
export function renamePreset(oldName, newName) {
  if (!oldName || typeof oldName !== 'string') {
    return { success: false, message: '原预设名称不能为空' };
  }
  
  if (!newName || typeof newName !== 'string' || !newName.trim()) {
    return { success: false, message: '新预设名称不能为空' };
  }
  
  const trimmedNewName = newName.trim();
  
  // 检查原预设是否存在
  if (!presetExists(oldName)) {
    return { success: false, message: `预设 "${oldName}" 不存在` };
  }
  
  // 检查新名称是否已存在
  if (presetExists(trimmedNewName)) {
    return { success: false, message: `预设 "${trimmedNewName}" 已存在` };
  }
  
  const presets = loadStoredApiPresets();
  const preset = presets.find(p => p.name === oldName);
  
  if (preset) {
    preset.name = trimmedNewName;
    preset.updatedAt = Date.now();
    saveStoredApiPresets(presets);
    
    // 更新当前预设名称
    if (getStoredCurrentPresetName() === oldName) {
      setStoredCurrentPresetName(trimmedNewName);
    }
  }
  
  return { success: true, message: `预设已重命名为 "${trimmedNewName}"` };
}

/**
 * 复制预设
 * @param {string} sourceName - 源预设名称
 * @param {string} targetName - 目标预设名称
 * @returns {Object} { success: boolean, message: string, preset?: ApiPreset }
 */
export function duplicatePreset(sourceName, targetName) {
  if (!sourceName || typeof sourceName !== 'string') {
    return { success: false, message: '源预设名称不能为空' };
  }
  
  if (!targetName || typeof targetName !== 'string' || !targetName.trim()) {
    return { success: false, message: '目标预设名称不能为空' };
  }
  
  const trimmedTargetName = targetName.trim();
  
  // 检查源预设是否存在
  const sourcePreset = getPreset(sourceName);
  if (!sourcePreset) {
    return { success: false, message: `源预设 "${sourceName}" 不存在` };
  }
  
  // 检查目标名称是否已存在
  if (presetExists(trimmedTargetName)) {
    return { success: false, message: `预设 "${trimmedTargetName}" 已存在` };
  }
  
  // 创建副本
  const newPreset = {
    ...JSON.parse(JSON.stringify(sourcePreset)),
    name: trimmedTargetName,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  
  const presets = loadStoredApiPresets();
  presets.push(newPreset);
  saveStoredApiPresets(presets);
  
  return { success: true, message: `预设已复制为 "${trimmedTargetName}"`, preset: newPreset };
}

// ============================================================
// 预设切换
// ============================================================

/**
 * 切换预设星标状态
 * @param {string} name - 预设名称
 * @returns {Object} { success: boolean, message: string, starred?: boolean }
 */
export function togglePresetStar(name) {
  if (!name || typeof name !== 'string') {
    return { success: false, message: '预设名称不能为空' };
  }
  
  const presets = loadStoredApiPresets();
  const preset = presets.find(p => p.name === name);
  
  if (!preset) {
    return { success: false, message: `预设 "${name}" 不存在` };
  }
  
  // 切换星标状态
  preset.starred = !preset.starred;
  preset.updatedAt = Date.now();
  
  saveStoredApiPresets(presets);
  
  return { 
    success: true, 
    message: preset.starred ? `已将 "${name}" 添加到预览列表` : `已将 "${name}" 从预览列表移除`,
    starred: preset.starred
  };
}

/**
 * 获取被星标的预设列表
 * @returns {Array<ApiPreset>}
 */
export function getStarredPresets() {
  const presets = loadStoredApiPresets();
  return presets.filter(p => p.starred === true);
}

/**
 * 切换到指定预设
 * @param {string} name - 预设名称，空字符串表示使用当前配置
 * @returns {Object} { success: boolean, message: string, apiConfig?: Object }
 */
export function switchToPreset(name) {
  if (!name) {
    // 切换到当前配置
    setStoredCurrentPresetName('');
    return { success: true, message: '已切换到当前API配置' };
  }
  
  const preset = getPreset(name);
  if (!preset) {
    return { success: false, message: `预设 "${name}" 不存在` };
  }
  
  setStoredCurrentPresetName(name);
  
  return {
    success: true,
    message: `已切换到预设 "${name}"`,
    apiConfig: preset.apiConfig
  };
}

/**
 * 获取当前激活的预设名称
 * @returns {string}
 */
export function getActivePresetName() {
  return getStoredCurrentPresetName();
}

/**
 * 获取当前激活的预设配置
 * @returns {Object} { presetName: string, apiConfig: Object }
 */
export function getActiveConfig() {
  const presetName = getStoredCurrentPresetName();
  
  if (presetName) {
    const preset = getPreset(presetName);
    if (preset) {
      return {
        presetName,
        apiConfig: preset.apiConfig
      };
    }
  }
  
  // 使用当前配置
  const settings = loadStoredSettings();
  return {
    presetName: '',
    apiConfig: settings.apiConfig || {}
  };
}

// ============================================================
// 预设导入导出
// ============================================================

/**
 * 导出预设为JSON
 * @param {string} name - 预设名称，不提供则导出所有预设
 * @returns {string} JSON字符串
 */
export function exportPresets(name = null) {
  if (name) {
    const preset = getPreset(name);
    if (!preset) {
      throw new Error(`预设 "${name}" 不存在`);
    }
    return JSON.stringify(preset, null, 2);
  }
  
  const presets = loadStoredApiPresets();
  return JSON.stringify(presets, null, 2);
}

/**
 * 导入预设
 * @param {string} jsonString - JSON字符串
 * @param {Object} options - 导入选项
 * @param {boolean} options.overwrite - 是否覆盖已存在的预设
 * @returns {Object} { success: boolean, message: string, imported: number }
 */
export function importPresets(jsonString, options = { overwrite: false }) {
  let data;
  
  try {
    data = JSON.parse(jsonString);
  } catch (e) {
    return { success: false, message: 'JSON解析失败', imported: 0 };
  }
  
  // 支持单个预设或预设数组
  const presetsToImport = Array.isArray(data) ? data : [data];
  
  if (presetsToImport.length === 0) {
    return { success: false, message: '没有找到有效的预设数据', imported: 0 };
  }
  
  const existingPresets = loadStoredApiPresets();
  let imported = 0;
  
  for (const preset of presetsToImport) {
    // 验证预设格式
    if (!preset.name || typeof preset.name !== 'string') {
      continue;
    }
    
    if (!preset.apiConfig || typeof preset.apiConfig !== 'object') {
      continue;
    }
    
    const existingIndex = existingPresets.findIndex(p => p.name === preset.name);
    
    if (existingIndex >= 0) {
      if (options.overwrite) {
        // 覆盖
        preset.updatedAt = Date.now();
        existingPresets[existingIndex] = preset;
        imported++;
      }
      // 否则跳过
    } else {
      // 新增
      preset.createdAt = preset.createdAt || Date.now();
      preset.updatedAt = Date.now();
      existingPresets.push(preset);
      imported++;
    }
  }
  
  if (imported > 0) {
    saveStoredApiPresets(existingPresets);
  }
  
  return {
    success: true,
    message: `成功导入 ${imported} 个预设`,
    imported
  };
}

/**
 * 从当前配置创建预设
 * @param {string} name - 预设名称
 * @param {string} description - 预设描述
 * @returns {Object} { success: boolean, message: string, preset?: ApiPreset }
 */
export function createPresetFromCurrentConfig(name, description = '') {
  const settings = loadStoredSettings();
  
  return createPreset({
    name,
    description,
    apiConfig: settings.apiConfig
  });
}

// ============================================================
// 工具函数
// ============================================================

/**
 * 验证预设数据
 * @param {Object} preset - 预设数据
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export function validatePreset(preset) {
  const errors = [];
  
  if (!preset.name || typeof preset.name !== 'string' || !preset.name.trim()) {
    errors.push('预设名称不能为空');
  }
  
  if (!preset.apiConfig || typeof preset.apiConfig !== 'object') {
    errors.push('缺少API配置');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 生成唯一预设名称
 * @param {string} baseName - 基础名称
 * @returns {string}
 */
export function generateUniquePresetName(baseName) {
  if (!baseName || typeof baseName !== 'string') {
    baseName = '新预设';
  }
  
  const presets = loadStoredApiPresets();
  const existingNames = new Set(presets.map(p => p.name));
  
  if (!existingNames.has(baseName)) {
    return baseName;
  }
  
  let counter = 1;
  while (existingNames.has(`${baseName} (${counter})`)) {
    counter++;
  }
  
  return `${baseName} (${counter})`;
}