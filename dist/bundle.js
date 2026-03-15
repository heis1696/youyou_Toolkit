var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// modules/core/storage-service.js
function getStorage() {
  const instance = storage;
  instance._getStorage();
  return instance._storage;
}
function loadSettings() {
  return storage.get("settings", {
    apiConfig: {
      url: "",
      apiKey: "",
      model: "",
      useMainApi: true,
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 0.9
    },
    currentPreset: "",
    uiSettings: {
      theme: "dark",
      lastTab: "api"
    }
  });
}
function saveSettings(settings) {
  storage.set("settings", settings);
}
var StorageService, storage, toolStorage, presetStorage, windowStorage;
var init_storage_service = __esm({
  "modules/core/storage-service.js"() {
    StorageService = class _StorageService {
      /**
       * @param {string} namespace - 存储命名空间
       */
      constructor(namespace = "youyou_toolkit") {
        this.namespace = namespace;
        this._storage = null;
        this._cache = /* @__PURE__ */ new Map();
      }
      // ============================================================
      // 存储后端获取
      // ============================================================
      /**
       * 获取存储后端
       * @private
       * @returns {Object} 存储对象 { getItem, setItem, removeItem }
       */
      _getStorage() {
        if (this._storage)
          return this._storage;
        try {
          const topWindow = typeof window.parent !== "undefined" && window.parent !== window ? window.parent : window;
          if (topWindow.SillyTavern?.getContext) {
            const context = topWindow.SillyTavern.getContext();
            if (context?.extensionSettings) {
              if (!context.extensionSettings[this.namespace]) {
                context.extensionSettings[this.namespace] = {};
              }
              this._storage = {
                _target: context.extensionSettings[this.namespace],
                getItem: (key) => {
                  const value = context.extensionSettings[this.namespace][key];
                  return typeof value === "string" ? value : value ? JSON.stringify(value) : null;
                },
                setItem: (key, value) => {
                  context.extensionSettings[this.namespace][key] = value;
                  this._saveSettings(context);
                },
                removeItem: (key) => {
                  delete context.extensionSettings[this.namespace][key];
                  this._saveSettings(context);
                },
                _isTavern: true
              };
              return this._storage;
            }
          }
        } catch (e) {
          console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`);
        }
        this._storage = {
          getItem: (key) => {
            try {
              return localStorage.getItem(key);
            } catch (e) {
              return null;
            }
          },
          setItem: (key, value) => {
            try {
              localStorage.setItem(key, value);
            } catch (e) {
              console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`, e);
            }
          },
          removeItem: (key) => {
            try {
              localStorage.removeItem(key);
            } catch (e) {
            }
          },
          _isTavern: false
        };
        return this._storage;
      }
      /**
       * 触发SillyTavern设置保存
       * @private
       */
      _saveSettings(context) {
        if (typeof context.saveSettings === "function") {
          try {
            context.saveSettings();
          } catch (e) {
          }
        } else if (typeof context.saveSettingsDebounced === "function") {
          try {
            context.saveSettingsDebounced();
          } catch (e) {
          }
        }
      }
      // ============================================================
      // 公共API
      // ============================================================
      /**
       * 获取存储值
       * @param {string} key - 键名
       * @param {*} defaultValue - 默认值
       * @returns {*}
       */
      get(key, defaultValue = null) {
        const cacheKey = `${this.namespace}:${key}`;
        if (this._cache.has(cacheKey)) {
          return this._cache.get(cacheKey);
        }
        const storage2 = this._getStorage();
        const fullKey = this._getFullKey(key);
        const value = storage2.getItem(fullKey);
        if (value === null)
          return defaultValue;
        try {
          const parsed = JSON.parse(value);
          this._cache.set(cacheKey, parsed);
          return parsed;
        } catch (e) {
          return value;
        }
      }
      /**
       * 设置存储值
       * @param {string} key - 键名
       * @param {*} value - 值
       */
      set(key, value) {
        const storage2 = this._getStorage();
        const fullKey = this._getFullKey(key);
        const cacheKey = `${this.namespace}:${key}`;
        this._cache.set(cacheKey, value);
        try {
          storage2.setItem(fullKey, JSON.stringify(value));
        } catch (e) {
          console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`, e);
        }
      }
      /**
       * 删除存储值
       * @param {string} key - 键名
       */
      remove(key) {
        const storage2 = this._getStorage();
        const fullKey = this._getFullKey(key);
        const cacheKey = `${this.namespace}:${key}`;
        this._cache.delete(cacheKey);
        storage2.removeItem(fullKey);
      }
      /**
       * 检查键是否存在
       * @param {string} key - 键名
       * @returns {boolean}
       */
      has(key) {
        const storage2 = this._getStorage();
        const fullKey = this._getFullKey(key);
        return storage2.getItem(fullKey) !== null;
      }
      /**
       * 清除命名空间下所有数据
       */
      clear() {
        const storage2 = this._getStorage();
        if (storage2._isTavern) {
          const topWindow = typeof window.parent !== "undefined" ? window.parent : window;
          if (topWindow.SillyTavern?.getContext) {
            const context = topWindow.SillyTavern.getContext();
            if (context?.extensionSettings?.[this.namespace]) {
              context.extensionSettings[this.namespace] = {};
              this._saveSettings(context);
            }
          }
        } else {
          const prefix = `${this.namespace}_`;
          const keysToRemove = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach((key) => localStorage.removeItem(key));
        }
        this._cache.clear();
      }
      /**
       * 获取完整键名
       * @private
       */
      _getFullKey(key) {
        if (this._getStorage()._isTavern) {
          return key;
        }
        return `${this.namespace}_${key}`;
      }
      /**
       * 创建子命名空间存储
       * @param {string} subNamespace - 子命名空间
       * @returns {StorageService}
       */
      namespace(subNamespace) {
        return new _StorageService(`${this.namespace}:${subNamespace}`);
      }
      // ============================================================
      // 工具方法
      // ============================================================
      /**
       * 批量获取
       * @param {string[]} keys - 键名数组
       * @returns {Object}
       */
      getMultiple(keys) {
        const result = {};
        keys.forEach((key) => {
          result[key] = this.get(key);
        });
        return result;
      }
      /**
       * 批量设置
       * @param {Object} data - 键值对对象
       */
      setMultiple(data) {
        Object.entries(data).forEach(([key, value]) => {
          this.set(key, value);
        });
      }
      /**
       * 导出所有数据
       * @returns {Object}
       */
      exportAll() {
        const storage2 = this._getStorage();
        const result = {};
        if (storage2._isTavern) {
          const topWindow = typeof window.parent !== "undefined" ? window.parent : window;
          if (topWindow.SillyTavern?.getContext) {
            const context = topWindow.SillyTavern.getContext();
            const data = context?.extensionSettings?.[this.namespace] || {};
            Object.entries(data).forEach(([key, value]) => {
              result[key] = typeof value === "string" ? JSON.parse(value) : value;
            });
          }
        } else {
          const prefix = `${this.namespace}_`;
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
              const shortKey = key.slice(prefix.length);
              try {
                result[shortKey] = JSON.parse(localStorage.getItem(key));
              } catch (e) {
                result[shortKey] = localStorage.getItem(key);
              }
            }
          }
        }
        return result;
      }
    };
    storage = new StorageService("youyou_toolkit");
    toolStorage = new StorageService("youyou_toolkit:tools");
    presetStorage = new StorageService("youyou_toolkit:presets");
    windowStorage = new StorageService("youyou_toolkit:windows");
  }
});

// modules/storage.js
var storage_exports = {};
__export(storage_exports, {
  DEFAULT_API_PRESETS: () => DEFAULT_API_PRESETS,
  DEFAULT_SETTINGS: () => DEFAULT_SETTINGS,
  STORAGE_KEYS: () => STORAGE_KEYS,
  StorageService: () => StorageService,
  deepMerge: () => deepMerge,
  getCurrentPresetName: () => getCurrentPresetName,
  getStorage: () => getStorage,
  loadApiPresets: () => loadApiPresets,
  loadSettings: () => loadSettings,
  presetStorage: () => presetStorage,
  saveApiPresets: () => saveApiPresets,
  saveSettings: () => saveSettings,
  setCurrentPresetName: () => setCurrentPresetName,
  storage: () => storage,
  toolStorage: () => toolStorage,
  windowStorage: () => windowStorage
});
function loadApiPresets() {
  return storage.get(STORAGE_KEYS.API_PRESETS) || [];
}
function saveApiPresets(presets) {
  storage.set(STORAGE_KEYS.API_PRESETS, presets);
}
function getCurrentPresetName() {
  return storage.get(STORAGE_KEYS.CURRENT_PRESET) || "";
}
function setCurrentPresetName(name) {
  storage.set(STORAGE_KEYS.CURRENT_PRESET, name || "");
}
function deepMerge(target, source) {
  const isObject = (obj) => obj && typeof obj === "object" && !Array.isArray(obj);
  let output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
var STORAGE_KEYS, DEFAULT_SETTINGS, DEFAULT_API_PRESETS;
var init_storage = __esm({
  "modules/storage.js"() {
    init_storage_service();
    init_storage_service();
    STORAGE_KEYS = {
      SETTINGS: "settings",
      API_PRESETS: "api_presets",
      CURRENT_PRESET: "current_preset",
      // 工具模块相关存储键
      TOOLS: "tools",
      TOOL_PRESETS: "tool_presets",
      CURRENT_TOOL_PRESET: "current_tool_preset",
      BYPASS_PRESETS: "bypass_presets",
      CURRENT_BYPASS_PRESET: "current_bypass_preset",
      BYPASS_ENABLED: "bypass_enabled"
    };
    DEFAULT_SETTINGS = {
      // API配置
      apiConfig: {
        url: "",
        apiKey: "",
        model: "",
        useMainApi: true,
        max_tokens: 4096,
        temperature: 0.7,
        top_p: 0.9
      },
      // 当前使用的预设名称（空表示使用当前配置）
      currentPreset: "",
      // UI设置
      uiSettings: {
        theme: "dark",
        lastTab: "api"
      }
    };
    DEFAULT_API_PRESETS = [];
  }
});

// modules/api-connection.js
var api_connection_exports = {};
__export(api_connection_exports, {
  API_STATUS: () => API_STATUS,
  fetchAvailableModels: () => fetchAvailableModels,
  getApiConfig: () => getApiConfig,
  getEffectiveApiConfig: () => getEffectiveApiConfig,
  sendApiRequest: () => sendApiRequest,
  sendWithPreset: () => sendWithPreset,
  testApiConnection: () => testApiConnection,
  updateApiConfig: () => updateApiConfig,
  validateApiConfig: () => validateApiConfig
});
function getApiConfig() {
  const settings = loadSettings();
  return settings.apiConfig || {};
}
function updateApiConfig(config) {
  const settings = loadSettings();
  settings.apiConfig = {
    ...settings.apiConfig,
    ...config
  };
  saveSettings(settings);
}
function validateApiConfig(config) {
  const errors = [];
  if (config.useMainApi) {
    return { valid: true, errors: [] };
  }
  if (!config.url || !config.url.trim()) {
    errors.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");
  } else {
    try {
      new URL(config.url);
    } catch (e) {
      errors.push("API URL \u683C\u5F0F\u65E0\u6548");
    }
  }
  if (!config.model || !config.model.trim()) {
    errors.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A");
  }
  return {
    valid: errors.length === 0,
    errors
  };
}
function getEffectiveApiConfig(presetName = "") {
  const settings = loadSettings();
  if (presetName) {
    const presets = settings.apiPresets || [];
    const preset = presets.find((p) => p.name === presetName);
    if (preset && preset.apiConfig) {
      return {
        ...preset.apiConfig,
        presetName: preset.name
      };
    }
  }
  return settings.apiConfig || {};
}
async function sendWithPreset(presetName, messages, options = {}, abortSignal = null) {
  const apiConfig = getEffectiveApiConfig(presetName);
  return await sendApiRequest(messages, {
    ...options,
    apiConfig
  }, abortSignal);
}
function buildRequestBody(messages, options = {}) {
  const config = options.apiConfig || getApiConfig();
  return {
    messages,
    model: config.model || "gpt-3.5-turbo",
    max_tokens: config.max_tokens || 4096,
    temperature: config.temperature ?? 0.7,
    top_p: config.top_p ?? 0.9,
    stream: false,
    ...options.extraParams
  };
}
async function sendApiRequest(messages, options = {}, abortSignal = null) {
  const config = options.apiConfig || getApiConfig();
  const useMainApi = config.useMainApi;
  const validation = validateApiConfig(config);
  if (!validation.valid && !useMainApi) {
    throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${validation.errors.join(", ")}`);
  }
  if (useMainApi) {
    return await sendViaMainApi(messages, options, abortSignal);
  }
  return await sendViaCustomApi(messages, config, options, abortSignal);
}
async function sendViaMainApi(messages, options, abortSignal) {
  const topWindow = typeof window.parent !== "undefined" ? window.parent : window;
  if (!topWindow.TavernHelper?.generateRaw) {
    throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");
  }
  try {
    const response = await topWindow.TavernHelper.generateRaw({
      ordered_prompts: messages,
      should_stream: false,
      ...options.extraParams
    });
    if (typeof response !== "string") {
      throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");
    }
    return response.trim();
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }
    throw new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${error.message}`);
  }
}
async function sendViaCustomApi(messages, config, options, abortSignal) {
  const requestBody = buildRequestBody(messages, { apiConfig: config, ...options });
  const headers = {
    "Content-Type": "application/json"
  };
  if (config.apiKey) {
    headers["Authorization"] = `Bearer ${config.apiKey}`;
  }
  const response = await fetch(config.url, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
    signal: abortSignal
  });
  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${response.status}): ${errorText}`);
  }
  const data = await response.json();
  let content = "";
  if (data.choices && data.choices[0]?.message?.content) {
    content = data.choices[0].message.content;
  } else if (data.content) {
    content = data.content;
  } else if (data.text) {
    content = data.text;
  } else if (data.response) {
    content = data.response;
  } else {
    throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return content.trim();
}
async function testApiConnection(config = null) {
  const apiConfig = config || getApiConfig();
  const startTime = Date.now();
  try {
    const testMessages = [
      { role: "user", content: 'Hello, this is a connection test. Please respond with "OK".' }
    ];
    await sendApiRequest(testMessages, { apiConfig });
    const latency = Date.now() - startTime;
    return {
      success: true,
      message: `\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${latency}ms)`,
      latency
    };
  } catch (error) {
    return {
      success: false,
      message: `\u8FDE\u63A5\u5931\u8D25: ${error.message}`,
      latency: Date.now() - startTime
    };
  }
}
async function fetchAvailableModels(config = null) {
  const apiConfig = config || getApiConfig();
  if (apiConfig.useMainApi) {
    return await fetchMainApiModels();
  }
  return await fetchCustomApiModels(apiConfig);
}
async function fetchMainApiModels() {
  const topWindow = typeof window.parent !== "undefined" ? window.parent : window;
  try {
    if (topWindow.SillyTavern?.getContext) {
      const context = topWindow.SillyTavern.getContext();
      if (context.settings?.api_server) {
        return [context.settings.api_server];
      }
    }
    return ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo", "claude-3-opus", "claude-3-sonnet"];
  } catch (e) {
    return ["gpt-4", "gpt-3.5-turbo"];
  }
}
async function fetchCustomApiModels(config) {
  if (!config.url || !config.apiKey) {
    return [];
  }
  try {
    const baseUrl = config.url.replace(/\/chat\/completions$/, "").replace(/\/completions$/, "");
    const modelsUrl = `${baseUrl}/models`;
    const response = await fetch(modelsUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`
      }
    });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((model) => model.id || model.name).filter(Boolean).sort();
    }
    return [];
  } catch (e) {
    return [];
  }
}
var API_STATUS;
var init_api_connection = __esm({
  "modules/api-connection.js"() {
    init_storage();
    API_STATUS = {
      IDLE: "idle",
      CONNECTING: "connecting",
      SUCCESS: "success",
      ERROR: "error"
    };
  }
});

// modules/preset-manager.js
var preset_manager_exports = {};
__export(preset_manager_exports, {
  createPreset: () => createPreset,
  createPresetFromCurrentConfig: () => createPresetFromCurrentConfig,
  deletePreset: () => deletePreset,
  duplicatePreset: () => duplicatePreset,
  exportPresets: () => exportPresets,
  generateUniquePresetName: () => generateUniquePresetName,
  getActiveConfig: () => getActiveConfig,
  getActivePresetName: () => getActivePresetName,
  getAllPresets: () => getAllPresets,
  getPreset: () => getPreset,
  getPresetNames: () => getPresetNames,
  getStarredPresets: () => getStarredPresets,
  importPresets: () => importPresets,
  presetExists: () => presetExists,
  renamePreset: () => renamePreset,
  switchToPreset: () => switchToPreset,
  togglePresetStar: () => togglePresetStar,
  updatePreset: () => updatePreset,
  validatePreset: () => validatePreset
});
function getAllPresets() {
  return loadApiPresets();
}
function getPresetNames() {
  const presets = loadApiPresets();
  return presets.map((p) => p.name);
}
function getPreset(name) {
  if (!name || typeof name !== "string")
    return null;
  const presets = loadApiPresets();
  return presets.find((p) => p.name === name) || null;
}
function presetExists(name) {
  if (!name || typeof name !== "string")
    return false;
  const presets = loadApiPresets();
  return presets.some((p) => p.name === name);
}
function createPreset(presetData) {
  const { name, description, apiConfig } = presetData;
  if (!name || typeof name !== "string" || !name.trim()) {
    return { success: false, message: "\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  const trimmedName = name.trim();
  if (presetExists(trimmedName)) {
    return { success: false, message: `\u9884\u8BBE "${trimmedName}" \u5DF2\u5B58\u5728` };
  }
  const preset = {
    name: trimmedName,
    description: description || "",
    apiConfig: {
      url: apiConfig?.url || "",
      apiKey: apiConfig?.apiKey || "",
      model: apiConfig?.model || "",
      useMainApi: apiConfig?.useMainApi ?? true,
      max_tokens: apiConfig?.max_tokens || 4096,
      temperature: apiConfig?.temperature ?? 0.7,
      top_p: apiConfig?.top_p ?? 0.9
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  const presets = loadApiPresets();
  presets.push(preset);
  saveApiPresets(presets);
  return { success: true, message: `\u9884\u8BBE "${trimmedName}" \u521B\u5EFA\u6210\u529F`, preset };
}
function updatePreset(name, updates) {
  if (!name || typeof name !== "string") {
    return { success: false, message: "\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  const presets = loadApiPresets();
  const index = presets.findIndex((p) => p.name === name);
  if (index === -1) {
    return { success: false, message: `\u9884\u8BBE "${name}" \u4E0D\u5B58\u5728` };
  }
  if (updates.name && updates.name !== name) {
    return { success: false, message: "\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE" };
  }
  const existingPreset = presets[index];
  const updatedPreset = {
    ...existingPreset,
    ...updates,
    name: existingPreset.name,
    // 保持原名称
    updatedAt: Date.now()
  };
  if (updates.apiConfig) {
    updatedPreset.apiConfig = {
      ...existingPreset.apiConfig,
      ...updates.apiConfig
    };
  }
  presets[index] = updatedPreset;
  saveApiPresets(presets);
  return { success: true, message: `\u9884\u8BBE "${name}" \u66F4\u65B0\u6210\u529F`, preset: updatedPreset };
}
function deletePreset(name) {
  if (!name || typeof name !== "string") {
    return { success: false, message: "\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  const presets = loadApiPresets();
  const index = presets.findIndex((p) => p.name === name);
  if (index === -1) {
    return { success: false, message: `\u9884\u8BBE "${name}" \u4E0D\u5B58\u5728` };
  }
  presets.splice(index, 1);
  saveApiPresets(presets);
  if (getCurrentPresetName() === name) {
    setCurrentPresetName("");
  }
  return { success: true, message: `\u9884\u8BBE "${name}" \u5DF2\u5220\u9664` };
}
function renamePreset(oldName, newName) {
  if (!oldName || typeof oldName !== "string") {
    return { success: false, message: "\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  if (!newName || typeof newName !== "string" || !newName.trim()) {
    return { success: false, message: "\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  const trimmedNewName = newName.trim();
  if (!presetExists(oldName)) {
    return { success: false, message: `\u9884\u8BBE "${oldName}" \u4E0D\u5B58\u5728` };
  }
  if (presetExists(trimmedNewName)) {
    return { success: false, message: `\u9884\u8BBE "${trimmedNewName}" \u5DF2\u5B58\u5728` };
  }
  const presets = loadApiPresets();
  const preset = presets.find((p) => p.name === oldName);
  if (preset) {
    preset.name = trimmedNewName;
    preset.updatedAt = Date.now();
    saveApiPresets(presets);
    if (getCurrentPresetName() === oldName) {
      setCurrentPresetName(trimmedNewName);
    }
  }
  return { success: true, message: `\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${trimmedNewName}"` };
}
function duplicatePreset(sourceName, targetName) {
  if (!sourceName || typeof sourceName !== "string") {
    return { success: false, message: "\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  if (!targetName || typeof targetName !== "string" || !targetName.trim()) {
    return { success: false, message: "\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  const trimmedTargetName = targetName.trim();
  const sourcePreset = getPreset(sourceName);
  if (!sourcePreset) {
    return { success: false, message: `\u6E90\u9884\u8BBE "${sourceName}" \u4E0D\u5B58\u5728` };
  }
  if (presetExists(trimmedTargetName)) {
    return { success: false, message: `\u9884\u8BBE "${trimmedTargetName}" \u5DF2\u5B58\u5728` };
  }
  const newPreset = {
    ...JSON.parse(JSON.stringify(sourcePreset)),
    name: trimmedTargetName,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  const presets = loadApiPresets();
  presets.push(newPreset);
  saveApiPresets(presets);
  return { success: true, message: `\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${trimmedTargetName}"`, preset: newPreset };
}
function togglePresetStar(name) {
  if (!name || typeof name !== "string") {
    return { success: false, message: "\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  const presets = loadApiPresets();
  const preset = presets.find((p) => p.name === name);
  if (!preset) {
    return { success: false, message: `\u9884\u8BBE "${name}" \u4E0D\u5B58\u5728` };
  }
  preset.starred = !preset.starred;
  preset.updatedAt = Date.now();
  saveApiPresets(presets);
  return {
    success: true,
    message: preset.starred ? `\u5DF2\u5C06 "${name}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868` : `\u5DF2\u5C06 "${name}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,
    starred: preset.starred
  };
}
function getStarredPresets() {
  const presets = loadApiPresets();
  return presets.filter((p) => p.starred === true);
}
function switchToPreset(name) {
  if (!name) {
    setCurrentPresetName("");
    return { success: true, message: "\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E" };
  }
  const preset = getPreset(name);
  if (!preset) {
    return { success: false, message: `\u9884\u8BBE "${name}" \u4E0D\u5B58\u5728` };
  }
  setCurrentPresetName(name);
  return {
    success: true,
    message: `\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${name}"`,
    apiConfig: preset.apiConfig
  };
}
function getActivePresetName() {
  return getCurrentPresetName();
}
function getActiveConfig() {
  const presetName = getCurrentPresetName();
  if (presetName) {
    const preset = getPreset(presetName);
    if (preset) {
      return {
        presetName,
        apiConfig: preset.apiConfig
      };
    }
  }
  const settings = loadSettings();
  return {
    presetName: "",
    apiConfig: settings.apiConfig || {}
  };
}
function exportPresets(name = null) {
  if (name) {
    const preset = getPreset(name);
    if (!preset) {
      throw new Error(`\u9884\u8BBE "${name}" \u4E0D\u5B58\u5728`);
    }
    return JSON.stringify(preset, null, 2);
  }
  const presets = loadApiPresets();
  return JSON.stringify(presets, null, 2);
}
function importPresets(jsonString, options = { overwrite: false }) {
  let data;
  try {
    data = JSON.parse(jsonString);
  } catch (e) {
    return { success: false, message: "JSON\u89E3\u6790\u5931\u8D25", imported: 0 };
  }
  const presetsToImport = Array.isArray(data) ? data : [data];
  if (presetsToImport.length === 0) {
    return { success: false, message: "\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E", imported: 0 };
  }
  const existingPresets = loadApiPresets();
  let imported = 0;
  for (const preset of presetsToImport) {
    if (!preset.name || typeof preset.name !== "string") {
      continue;
    }
    if (!preset.apiConfig || typeof preset.apiConfig !== "object") {
      continue;
    }
    const existingIndex = existingPresets.findIndex((p) => p.name === preset.name);
    if (existingIndex >= 0) {
      if (options.overwrite) {
        preset.updatedAt = Date.now();
        existingPresets[existingIndex] = preset;
        imported++;
      }
    } else {
      preset.createdAt = preset.createdAt || Date.now();
      preset.updatedAt = Date.now();
      existingPresets.push(preset);
      imported++;
    }
  }
  if (imported > 0) {
    saveApiPresets(existingPresets);
  }
  return {
    success: true,
    message: `\u6210\u529F\u5BFC\u5165 ${imported} \u4E2A\u9884\u8BBE`,
    imported
  };
}
function createPresetFromCurrentConfig(name, description = "") {
  const settings = loadSettings();
  return createPreset({
    name,
    description,
    apiConfig: settings.apiConfig
  });
}
function validatePreset(preset) {
  const errors = [];
  if (!preset.name || typeof preset.name !== "string" || !preset.name.trim()) {
    errors.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A");
  }
  if (!preset.apiConfig || typeof preset.apiConfig !== "object") {
    errors.push("\u7F3A\u5C11API\u914D\u7F6E");
  }
  return {
    valid: errors.length === 0,
    errors
  };
}
function generateUniquePresetName(baseName) {
  if (!baseName || typeof baseName !== "string") {
    baseName = "\u65B0\u9884\u8BBE";
  }
  const presets = loadApiPresets();
  const existingNames = new Set(presets.map((p) => p.name));
  if (!existingNames.has(baseName)) {
    return baseName;
  }
  let counter = 1;
  while (existingNames.has(`${baseName} (${counter})`)) {
    counter++;
  }
  return `${baseName} (${counter})`;
}
var init_preset_manager = __esm({
  "modules/preset-manager.js"() {
    init_storage();
  }
});

// modules/core/event-bus.js
var EVENTS, EventBus, eventBus;
var init_event_bus = __esm({
  "modules/core/event-bus.js"() {
    EVENTS = {
      // ==================== 存储事件 ====================
      STORAGE_CHANGED: "storage:changed",
      STORAGE_CLEARED: "storage:cleared",
      // ==================== 预设事件 ====================
      PRESET_CREATED: "preset:created",
      PRESET_UPDATED: "preset:updated",
      PRESET_DELETED: "preset:deleted",
      PRESET_ACTIVATED: "preset:activated",
      PRESET_IMPORTED: "preset:imported",
      PRESET_EXPORTED: "preset:exported",
      // ==================== API事件 ====================
      API_CONFIG_UPDATED: "api:configUpdated",
      API_REQUEST_START: "api:requestStart",
      API_REQUEST_SUCCESS: "api:requestSuccess",
      API_REQUEST_ERROR: "api:requestError",
      API_CONNECTION_TESTED: "api:connectionTested",
      // ==================== 工具事件 ====================
      TOOL_REGISTERED: "tool:registered",
      TOOL_UNREGISTERED: "tool:unregistered",
      TOOL_UPDATED: "tool:updated",
      TOOL_ENABLED: "tool:enabled",
      TOOL_DISABLED: "tool:disabled",
      TOOL_EXECUTING: "tool:executing",
      TOOL_EXECUTED: "tool:executed",
      TOOL_ERROR: "tool:error",
      TOOL_EXECUTION_STARTED: "tool:executionStarted",
      TOOL_EXECUTION_FAILED: "tool:executionFailed",
      TOOL_TRIGGER_INITIALIZED: "tool:triggerInitialized",
      // ==================== 正则提取事件 ====================
      REGEX_RULE_ADDED: "regex:ruleAdded",
      REGEX_RULE_UPDATED: "regex:ruleUpdated",
      REGEX_RULE_DELETED: "regex:ruleDeleted",
      REGEX_RULES_CLEARED: "regex:rulesCleared",
      REGEX_PRESET_LOADED: "regex:presetLoaded",
      REGEX_EXTRACTED: "regex:extracted",
      // ==================== UI事件 ====================
      UI_INITIALIZED: "ui:initialized",
      UI_RENDER_REQUESTED: "ui:renderRequested",
      UI_TAB_CHANGED: "ui:tabChanged",
      UI_SUBTAB_CHANGED: "ui:subTabChanged",
      UI_POPUP_OPENED: "ui:popupOpened",
      UI_POPUP_CLOSED: "ui:popupClosed",
      UI_WINDOW_CREATED: "ui:windowCreated",
      UI_WINDOW_CLOSED: "ui:windowClosed",
      // ==================== 触发器事件 ====================
      TRIGGER_REGISTERED: "trigger:registered",
      TRIGGER_UNREGISTERED: "trigger:unregistered",
      TRIGGER_FIRED: "trigger:fired",
      // ==================== 应用事件 ====================
      APP_INITIALIZING: "app:initializing",
      APP_INITIALIZED: "app:initialized",
      APP_ERROR: "app:error",
      // ==================== v0.5 新增事件 ====================
      // 设置事件
      SETTINGS_UPDATED: "settings:updated",
      // 工具上下文注入事件
      TOOL_CONTEXT_INJECTED: "tool:contextInjected",
      TOOL_CONTEXT_CLEARED: "tool:contextCleared",
      // 破限词事件
      BYPASS_PRESET_CREATED: "bypass:presetCreated",
      BYPASS_PRESET_UPDATED: "bypass:presetUpdated",
      BYPASS_PRESET_DELETED: "bypass:presetDeleted",
      BYPASS_PRESET_ACTIVATED: "bypass:presetActivated",
      // 工具执行事件（增强）
      TOOL_EXECUTION_REQUESTED: "tool:executionRequested",
      TOOL_OUTPUT_MODE_CHANGED: "tool:outputModeChanged"
    };
    EventBus = class {
      constructor() {
        this.listeners = /* @__PURE__ */ new Map();
        this.onceCallbacks = /* @__PURE__ */ new Map();
        this.history = [];
        this.maxHistorySize = 100;
        this.debugMode = false;
      }
      // ============================================================
      // 核心方法
      // ============================================================
      /**
       * 订阅事件
       * @param {string} event - 事件名
       * @param {Function} callback - 回调函数
       * @param {Object} options - 选项
       * @returns {Function} 取消订阅函数
       */
      on(event, callback, options = {}) {
        if (!event || typeof callback !== "function") {
          console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03");
          return () => {
          };
        }
        const { priority = 0 } = options;
        if (!this.listeners.has(event)) {
          this.listeners.set(event, /* @__PURE__ */ new Set());
        }
        const listener = { callback, priority };
        this.listeners.get(event).add(listener);
        if (this.debugMode) {
          console.log(`[EventBus] \u8BA2\u9605: ${event}`);
        }
        return () => this.off(event, callback);
      }
      /**
       * 取消订阅
       * @param {string} event - 事件名
       * @param {Function} callback - 回调函数
       */
      off(event, callback) {
        const listeners = this.listeners.get(event);
        if (!listeners)
          return;
        for (const listener of listeners) {
          if (listener.callback === callback) {
            listeners.delete(listener);
            break;
          }
        }
        if (this.debugMode) {
          console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${event}`);
        }
      }
      /**
       * 发布事件
       * @param {string} event - 事件名
       * @param {*} data - 事件数据
       */
      emit(event, data) {
        if (this.debugMode) {
          console.log(`[EventBus] \u53D1\u5E03: ${event}`, data);
        }
        this._addToHistory(event, data);
        const listeners = this.listeners.get(event);
        if (!listeners || listeners.size === 0)
          return;
        const sortedListeners = Array.from(listeners).sort((a, b) => b.priority - a.priority);
        for (const { callback } of sortedListeners) {
          try {
            callback(data);
          } catch (error) {
            console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${event}):`, error);
          }
        }
      }
      /**
       * 一次性订阅
       * @param {string} event - 事件名
       * @param {Function} callback - 回调函数
       * @returns {Function} 取消订阅函数
       */
      once(event, callback) {
        const wrapper = (data) => {
          this.off(event, wrapper);
          callback(data);
        };
        return this.on(event, wrapper);
      }
      /**
       * 等待事件
       * @param {string} event - 事件名
       * @param {number} timeout - 超时时间(ms)
       * @returns {Promise<*>}
       */
      wait(event, timeout = 0) {
        return new Promise((resolve, reject) => {
          let timer = null;
          const unsubscribe = this.once(event, (data) => {
            if (timer)
              clearTimeout(timer);
            resolve(data);
          });
          if (timeout > 0) {
            timer = setTimeout(() => {
              unsubscribe();
              reject(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${event}`));
            }, timeout);
          }
        });
      }
      // ============================================================
      // 工具方法
      // ============================================================
      /**
       * 检查是否有监听器
       * @param {string} event - 事件名
       * @returns {boolean}
       */
      hasListeners(event) {
        const listeners = this.listeners.get(event);
        return listeners && listeners.size > 0;
      }
      /**
       * 获取监听器数量
       * @param {string} event - 事件名
       * @returns {number}
       */
      listenerCount(event) {
        const listeners = this.listeners.get(event);
        return listeners ? listeners.size : 0;
      }
      /**
       * 移除所有监听器
       * @param {string} event - 事件名（可选，不传则清除所有）
       */
      removeAllListeners(event) {
        if (event) {
          this.listeners.delete(event);
        } else {
          this.listeners.clear();
        }
      }
      /**
       * 设置调试模式
       * @param {boolean} enabled
       */
      setDebugMode(enabled) {
        this.debugMode = enabled;
      }
      /**
       * 添加到历史记录
       * @private
       */
      _addToHistory(event, data) {
        this.history.push({
          event,
          data,
          timestamp: Date.now()
        });
        if (this.history.length > this.maxHistorySize) {
          this.history.shift();
        }
      }
      /**
       * 获取事件历史
       * @param {string} event - 事件名（可选）
       * @returns {Array}
       */
      getHistory(event) {
        if (event) {
          return this.history.filter((h) => h.event === event);
        }
        return [...this.history];
      }
      /**
       * 清除历史
       */
      clearHistory() {
        this.history = [];
      }
    };
    eventBus = new EventBus();
  }
});

// modules/ui/utils.js
function escapeHtml(unsafe) {
  if (typeof unsafe !== "string")
    return "";
  return unsafe.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "&#039;");
}
function showToast(type, message, duration = 3e3) {
  if (!message) {
    message = type === "error" ? "\u64CD\u4F5C\u5931\u8D25" : "\u64CD\u4F5C\u5B8C\u6210";
  }
  const topWindow = typeof window.parent !== "undefined" && window.parent !== window ? window.parent : window;
  if (topWindow.toastr) {
    topWindow.toastr[type](message, "YouYou \u5DE5\u5177\u7BB1", {
      timeOut: duration,
      progressBar: true
    });
    return;
  }
  _showFallbackToast(type, message, duration);
  console.log(`[YouYou \u5DE5\u5177\u7BB1] [${type.toUpperCase()}] ${message}`);
}
function showTopNotice(type, message, options = {}) {
  if (!message) {
    message = type === "error" ? "\u64CD\u4F5C\u5931\u8D25" : "\u64CD\u4F5C\u5B8C\u6210";
  }
  const {
    duration = 3500,
    sticky = false,
    noticeId = ""
  } = options;
  const targetDoc = typeof window.parent !== "undefined" && window.parent !== window ? window.parent.document : document;
  if (!targetDoc?.body) {
    showToast(type, message, duration);
    return;
  }
  const containerId = "yyt-top-notice-container";
  const styleId = "yyt-top-notice-styles";
  let container = targetDoc.getElementById(containerId);
  if (!container) {
    container = targetDoc.createElement("div");
    container.id = containerId;
    container.style.cssText = `
      position: fixed;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: min(560px, calc(100vw - 24px));
      z-index: 100000;
      pointer-events: none;
    `;
    targetDoc.body.appendChild(container);
  }
  if (!targetDoc.getElementById(styleId)) {
    const style = targetDoc.createElement("style");
    style.id = styleId;
    style.textContent = `
      .yyt-top-notice {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: rgba(255, 255, 255, 0.95);
        background: rgba(11, 15, 21, 0.92);
        box-shadow: 0 10px 32px rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        pointer-events: auto;
        animation: yyt-top-notice-in 0.18s ease-out;
      }

      .yyt-top-notice__icon {
        width: 24px;
        height: 24px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 700;
      }

      .yyt-top-notice__content {
        flex: 1;
        min-width: 0;
        font-size: 13px;
        line-height: 1.5;
        word-break: break-word;
      }

      .yyt-top-notice__close {
        border: none;
        background: transparent;
        color: rgba(255, 255, 255, 0.72);
        cursor: pointer;
        width: 24px;
        height: 24px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s ease, color 0.15s ease;
      }

      .yyt-top-notice__close:hover {
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.95);
      }

      .yyt-top-notice--success {
        border-color: rgba(74, 222, 128, 0.35);
      }

      .yyt-top-notice--success .yyt-top-notice__icon {
        background: rgba(74, 222, 128, 0.18);
        color: #4ade80;
      }

      .yyt-top-notice--error {
        border-color: rgba(248, 113, 113, 0.38);
      }

      .yyt-top-notice--error .yyt-top-notice__icon {
        background: rgba(248, 113, 113, 0.18);
        color: #f87171;
      }

      .yyt-top-notice--warning {
        border-color: rgba(251, 191, 36, 0.38);
      }

      .yyt-top-notice--warning .yyt-top-notice__icon {
        background: rgba(251, 191, 36, 0.18);
        color: #fbbf24;
      }

      .yyt-top-notice--info {
        border-color: rgba(123, 183, 255, 0.38);
      }

      .yyt-top-notice--info .yyt-top-notice__icon {
        background: rgba(123, 183, 255, 0.18);
        color: #7bb7ff;
      }

      @keyframes yyt-top-notice-in {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes yyt-top-notice-out {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-8px);
        }
      }
    `;
    targetDoc.head.appendChild(style);
  }
  if (noticeId) {
    const existing = container.querySelector(`[data-notice-id="${noticeId}"]`);
    if (existing) {
      existing.remove();
    }
  }
  const iconMap = {
    success: "\u2713",
    error: "!",
    warning: "\u2022",
    info: "i"
  };
  const notice = targetDoc.createElement("div");
  notice.className = `yyt-top-notice yyt-top-notice--${type || "info"}`;
  if (noticeId) {
    notice.dataset.noticeId = noticeId;
  }
  const icon = targetDoc.createElement("span");
  icon.className = "yyt-top-notice__icon";
  icon.textContent = iconMap[type] || iconMap.info;
  const content = targetDoc.createElement("div");
  content.className = "yyt-top-notice__content";
  content.textContent = message;
  const closeBtn = targetDoc.createElement("button");
  closeBtn.className = "yyt-top-notice__close";
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "\u5173\u95ED\u901A\u77E5");
  closeBtn.textContent = "\xD7";
  const removeNotice = () => {
    notice.style.animation = "yyt-top-notice-out 0.18s ease forwards";
    setTimeout(() => notice.remove(), 180);
  };
  closeBtn.addEventListener("click", removeNotice);
  notice.appendChild(icon);
  notice.appendChild(content);
  notice.appendChild(closeBtn);
  container.appendChild(notice);
  if (!sticky) {
    setTimeout(removeNotice, duration);
  }
}
function _showFallbackToast(type, message, duration) {
  const targetDoc = typeof window.parent !== "undefined" && window.parent !== window ? window.parent.document : document;
  if (!targetDoc) {
    return;
  }
  const existingToast = targetDoc.getElementById("yyt-fallback-toast");
  if (existingToast) {
    existingToast.remove();
  }
  const colors = {
    success: { bg: "rgba(74, 222, 128, 0.9)", border: "#22c55e" },
    error: { bg: "rgba(248, 113, 113, 0.9)", border: "#ef4444" },
    warning: { bg: "rgba(251, 191, 36, 0.9)", border: "#f59e0b" },
    info: { bg: "rgba(123, 183, 255, 0.9)", border: "#7bb7ff" }
  };
  const color = colors[type] || colors.info;
  const toast = targetDoc.createElement("div");
  toast.id = "yyt-fallback-toast";
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${color.bg};
    color: #0b0f15;
    border-radius: 8px;
    border: 2px solid ${color.border};
    font-size: 14px;
    font-weight: 500;
    z-index: 99999;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: yyt-toast-in 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  `;
  toast.textContent = message;
  if (!targetDoc.getElementById("yyt-toast-styles")) {
    const style = targetDoc.createElement("style");
    style.id = "yyt-toast-styles";
    style.textContent = `
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `;
    targetDoc.head.appendChild(style);
  }
  targetDoc.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "yyt-toast-out 0.3s ease forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
function getJQuery() {
  if (cachedJQuery)
    return cachedJQuery;
  if (typeof window.parent !== "undefined" && window.parent !== window) {
    try {
      if (window.parent.jQuery) {
        cachedJQuery = window.parent.jQuery;
        return cachedJQuery;
      }
    } catch (e) {
    }
  }
  if (window.jQuery) {
    cachedJQuery = window.jQuery;
  }
  return cachedJQuery;
}
function isContainerValid($container2) {
  return $container2 && $container2.length > 0;
}
function getFormApiConfig($container2, scriptId = SCRIPT_ID) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container2)) {
    return {
      url: "",
      apiKey: "",
      model: "",
      useMainApi: true,
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 0.9
    };
  }
  let model = $container2.find(`#${scriptId}-model`).val()?.trim() || "";
  const $modelSelect = $container2.find(`#${scriptId}-model-select`);
  if ($modelSelect.is(":visible")) {
    model = $modelSelect.val() || model;
  }
  return {
    url: $container2.find(`#${scriptId}-api-url`).val()?.trim() || "",
    apiKey: $container2.find(`#${scriptId}-api-key`).val() || "",
    model,
    useMainApi: $container2.find(`#${scriptId}-use-main-api`).is(":checked"),
    max_tokens: parseInt($container2.find(`#${scriptId}-max-tokens`).val()) || 4096,
    temperature: parseFloat($container2.find(`#${scriptId}-temperature`).val()) ?? 0.7,
    top_p: parseFloat($container2.find(`#${scriptId}-top-p`).val()) ?? 0.9
  };
}
function fillFormWithConfig($container2, config, scriptId = SCRIPT_ID) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container2) || !config)
    return;
  $container2.find(`#${scriptId}-api-url`).val(config.url || "");
  $container2.find(`#${scriptId}-api-key`).val(config.apiKey || "");
  $container2.find(`#${scriptId}-model`).val(config.model || "");
  $container2.find(`#${scriptId}-max-tokens`).val(config.max_tokens || 4096);
  $container2.find(`#${scriptId}-temperature`).val(config.temperature ?? 0.7);
  $container2.find(`#${scriptId}-top-p`).val(config.top_p ?? 0.9);
  const useMainApi = config.useMainApi ?? true;
  const $checkbox = $container2.find(`#${scriptId}-use-main-api`);
  $checkbox.prop("checked", useMainApi);
  const $customFields = $container2.find(`#${scriptId}-custom-api-fields`);
  if (useMainApi) {
    $customFields.addClass("yyt-disabled").find("input, button, select").prop("disabled", true);
  } else {
    $customFields.removeClass("yyt-disabled").find("input, button, select").prop("disabled", false);
  }
  $container2.find(`#${scriptId}-model`).show();
  $container2.find(`#${scriptId}-model-select`).hide();
}
function downloadJson(json, filename) {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function readFileContent(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25"));
    reader.readAsText(file);
  });
}
var SCRIPT_ID, cachedJQuery;
var init_utils = __esm({
  "modules/ui/utils.js"() {
    SCRIPT_ID = "youyou_toolkit";
    cachedJQuery = null;
  }
});

// modules/ui/ui-manager.js
var UIManager, uiManager;
var init_ui_manager = __esm({
  "modules/ui/ui-manager.js"() {
    init_event_bus();
    init_utils();
    UIManager = class {
      constructor() {
        this.components = /* @__PURE__ */ new Map();
        this.activeInstances = /* @__PURE__ */ new Map();
        this.dependencies = {};
        this.currentTab = "main";
        this.currentSubTab = {};
        this.initialized = false;
      }
      // ============================================================
      // 初始化
      // ============================================================
      /**
       * 初始化UI管理器
       * @param {Object} options
       */
      init(options = {}) {
        if (this.initialized)
          return;
        this.dependencies = options.services || {};
        this._subscribeEvents();
        this.initialized = true;
        eventBus.emit(EVENTS.UI_INITIALIZED);
        console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210");
      }
      // ============================================================
      // 组件注册
      // ============================================================
      /**
       * 注册组件
       * @param {string} id - 组件ID
       * @param {Object} component - 组件配置
       * @returns {boolean}
       */
      register(id, component) {
        if (!id || !component) {
          console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C");
          return false;
        }
        this.components.set(id, {
          id,
          ...component,
          render: component.render || (() => ""),
          bindEvents: component.bindEvents || (() => {
          }),
          destroy: component.destroy || (() => {
          }),
          getStyles: component.getStyles || (() => "")
        });
        return true;
      }
      /**
       * 注销组件
       * @param {string} id
       */
      unregister(id) {
        this.destroyInstance(id);
        this.components.delete(id);
      }
      /**
       * 获取组件
       * @param {string} id
       * @returns {Object|undefined}
       */
      getComponent(id) {
        return this.components.get(id);
      }
      // ============================================================
      // 渲染
      // ============================================================
      /**
       * 渲染组件
       * @param {string} id - 组件ID
       * @param {HTMLElement|Object} container - 容器
       * @param {Object} props - 属性
       */
      render(id, container, props = {}) {
        const $ = getJQuery();
        if (!$) {
          console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");
          return;
        }
        const component = this.components.get(id);
        if (!component) {
          console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${id}`);
          return;
        }
        let $container2;
        if (typeof container === "string") {
          $container2 = $(container);
        } else if (container && container.jquery) {
          $container2 = container;
        } else if (container) {
          $container2 = $(container);
        }
        if (!isContainerValid($container2)) {
          console.warn(`[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728`);
          return;
        }
        this.destroyInstance(id);
        const html = component.render({
          ...props,
          dependencies: this.dependencies
        });
        $container2.html(html);
        component.bindEvents($container2, this.dependencies);
        this.activeInstances.set(id, {
          container: $container2,
          component,
          props
        });
        eventBus.emit(EVENTS.UI_RENDER_REQUESTED, { componentId: id });
      }
      /**
       * 销毁组件实例
       * @param {string} id
       */
      destroyInstance(id) {
        const instance = this.activeInstances.get(id);
        if (!instance)
          return;
        instance.component.destroy(instance.container);
        this.activeInstances.delete(id);
      }
      // ============================================================
      // 标签页管理
      // ============================================================
      /**
       * 切换标签页
       * @param {string} tabId
       */
      switchTab(tabId) {
        const oldTab = this.currentTab;
        this.currentTab = tabId;
        eventBus.emit(EVENTS.UI_TAB_CHANGED, { tabId, oldTab });
      }
      /**
       * 获取当前标签页
       * @returns {string}
       */
      getCurrentTab() {
        return this.currentTab;
      }
      /**
       * 切换子标签页
       * @param {string} mainTab
       * @param {string} subTab
       */
      switchSubTab(mainTab, subTab) {
        this.currentSubTab[mainTab] = subTab;
        eventBus.emit(EVENTS.UI_SUBTAB_CHANGED, { mainTab, subTab });
      }
      /**
       * 获取当前子标签页
       * @param {string} mainTab
       * @returns {string}
       */
      getCurrentSubTab(mainTab) {
        return this.currentSubTab[mainTab] || "";
      }
      // ============================================================
      // 样式管理
      // ============================================================
      /**
       * 获取所有组件样式
       * @returns {string}
       */
      getAllStyles() {
        let styles = "";
        this.components.forEach((component, id) => {
          if (component.getStyles) {
            styles += component.getStyles();
          }
        });
        return styles;
      }
      /**
       * 注入样式到页面
       */
      injectStyles() {
        const styleId = "yyt-component-styles";
        if (document.getElementById(styleId))
          return;
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = this.getAllStyles();
        document.head.appendChild(style);
      }
      // ============================================================
      // 依赖注入
      // ============================================================
      /**
       * 设置依赖
       * @param {string} name
       * @param {*} service
       */
      setDependency(name, service) {
        this.dependencies[name] = service;
      }
      /**
       * 获取依赖
       * @param {string} name
       * @returns {*}
       */
      getDependency(name) {
        return this.dependencies[name];
      }
      // ============================================================
      // 私有方法
      // ============================================================
      /**
       * 订阅事件
       * @private
       */
      _subscribeEvents() {
        eventBus.on(EVENTS.PRESET_UPDATED, () => {
        });
        eventBus.on(EVENTS.TOOL_UPDATED, () => {
        });
      }
    };
    uiManager = new UIManager();
  }
});

// modules/ui/components/api-preset-panel.js
var currentLoadedPresetName, ApiPresetPanel;
var init_api_preset_panel = __esm({
  "modules/ui/components/api-preset-panel.js"() {
    init_event_bus();
    init_utils();
    init_api_connection();
    init_preset_manager();
    currentLoadedPresetName = "";
    ApiPresetPanel = {
      id: "apiPresetPanel",
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
        const maxPresetsToShow = 8;
        const starredToShow = starredPresets.slice(0, maxPresetsToShow);
        const presetListHtml = starredToShow.length > 0 ? starredToShow.map((preset) => this._renderPresetItem(preset)).join("") : "";
        const initialSelectValue = currentLoadedPresetName || activePresetName || "";
        const initialSelectText = initialSelectValue || "-- \u5F53\u524D\u914D\u7F6E --";
        return `
      <div class="yyt-api-manager">
        <div class="yyt-panel">
          <!-- \u9884\u8BBE\u9009\u62E9\u533A -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-bookmark"></i>
              <span>\u9884\u8BBE\u9009\u62E9</span>
            </div>
            
            <div class="yyt-preset-selector">
              <!-- \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 -->
              <div class="yyt-custom-select" id="${SCRIPT_ID}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${escapeHtml(initialSelectValue)}">${escapeHtml(initialSelectText)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${!initialSelectValue ? "yyt-selected" : ""}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${presets.length > 0 ? presets.map((p) => this._renderSelectOption(p, initialSelectValue)).join("") : ""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
                <i class="fa-solid fa-download"></i> \u52A0\u8F7D
              </button>
            </div>
            
            ${presetListHtml ? `
            <div class="yyt-preset-list-compact">
              ${presetListHtml}
            </div>
            ` : ""}
          </div>
          
          <!-- API\u914D\u7F6E\u533A -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
              <span>API\u914D\u7F6E</span>
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${SCRIPT_ID}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(config)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${SCRIPT_ID}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
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
            ${preset.apiConfig.useMainApi ? '<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>' : `<span class="yyt-badge yyt-badge-small">${escapeHtml(preset.apiConfig.model || "\u672A\u8BBE\u7F6E")}</span>`}
          </div>
        </div>
        <div class="yyt-preset-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="load" title="\u52A0\u8F7D\u914D\u7F6E">
            <i class="fa-solid fa-download"></i>
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger" data-action="delete" title="\u5220\u9664">
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
        const starClass = isStarred ? "yyt-option-star yyt-starred" : "yyt-option-star";
        const starIcon = isStarred ? "\u2605" : "\u2606";
        const isSelected = preset.name === selectedValue;
        return `
      <div class="yyt-select-option ${isSelected ? "yyt-selected" : ""}" data-value="${escapeHtml(preset.name)}">
        <button class="${starClass}" data-preset="${escapeHtml(preset.name)}" title="${isStarred ? "\u70B9\u51FB\u53D6\u6D88\u661F\u6807" : "\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${starIcon}</button>
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
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${SCRIPT_ID}-use-main-api" ${config.useMainApi ? "checked" : ""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${SCRIPT_ID}-custom-api-fields" class="${config.useMainApi ? "yyt-disabled" : ""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-api-url" 
                   value="${escapeHtml(config.url || "")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${SCRIPT_ID}-api-key" 
                     value="${escapeHtml(config.apiKey || "")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${SCRIPT_ID}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${SCRIPT_ID}-model" 
                     value="${escapeHtml(config.model || "")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${SCRIPT_ID}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${SCRIPT_ID}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
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
      bindEvents($container2, dependencies) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        this._bindDropdownEvents($container2, $);
        this._bindPresetListEvents($container2, $);
        this._bindApiConfigEvents($container2, $);
        this._bindFileEvents($container2, $);
      },
      /**
       * 绑定下拉框事件
       * @private
       */
      _bindDropdownEvents($container2, $) {
        const $dropdown = $container2.find(`#${SCRIPT_ID}-preset-dropdown`);
        const $trigger = $dropdown.find(".yyt-select-trigger");
        const $selectValue = $dropdown.find(".yyt-select-value");
        $trigger.on("click", function(e) {
          e.stopPropagation();
          $dropdown.toggleClass("yyt-open");
        });
        $dropdown.find(".yyt-select-option").on("click", (e) => {
          if ($(e.target).hasClass("yyt-option-star"))
            return;
          const $option = $(e.currentTarget);
          const value = $option.data("value");
          const text = $option.find(".yyt-option-text").text();
          $selectValue.text(text).data("value", value);
          $dropdown.find(".yyt-select-option").removeClass("yyt-selected");
          $option.addClass("yyt-selected");
          $dropdown.removeClass("yyt-open");
          if (value) {
            const preset = getPreset(value);
            if (preset) {
              fillFormWithConfig($container2, preset.apiConfig, SCRIPT_ID);
            }
          }
        });
        $dropdown.find(".yyt-option-star").on("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const presetName = $(e.currentTarget).data("preset");
          if (!presetName)
            return;
          const result = togglePresetStar(presetName);
          if (result.success) {
            showToast("success", result.message);
            const $panel = $container2.closest(".yyt-api-manager").parent();
            if ($panel.length) {
              this.renderTo($panel);
            }
          } else {
            showToast("error", result.message);
          }
        });
        $(document).on("click.yyt-dropdown", (e) => {
          if (!$(e.target).closest($dropdown).length) {
            $dropdown.removeClass("yyt-open");
          }
        });
      },
      /**
       * 绑定预设列表事件
       * @private
       */
      _bindPresetListEvents($container2, $) {
        $container2.find(".yyt-preset-item").on("click", (e) => {
          const $item = $(e.currentTarget);
          const presetName = $item.data("preset-name");
          const action = $(e.target).closest("[data-action]").data("action");
          if (!action)
            return;
          e.stopPropagation();
          switch (action) {
            case "load":
              const preset = getPreset(presetName);
              if (preset) {
                fillFormWithConfig($container2, preset.apiConfig, SCRIPT_ID);
                currentLoadedPresetName = presetName;
                $container2.find(".yyt-preset-item").removeClass("yyt-loaded");
                $item.addClass("yyt-loaded");
                showToast("info", `\u5DF2\u52A0\u8F7D\u9884\u8BBE "${presetName}"\uFF0C\u4FEE\u6539\u540E\u53EF\u70B9\u51FB"\u4FDD\u5B58\u914D\u7F6E"\u8986\u76D6\u6B64\u9884\u8BBE`);
              }
              break;
            case "delete":
              if (confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${presetName}" \u5417\uFF1F`)) {
                const delResult = deletePreset(presetName);
                showToast(delResult.success ? "info" : "error", delResult.message);
                if (delResult.success) {
                  if (currentLoadedPresetName === presetName) {
                    currentLoadedPresetName = "";
                  }
                  const $panel = $container2.closest(".yyt-api-manager").parent();
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
      _bindApiConfigEvents($container2, $) {
        $container2.find(`#${SCRIPT_ID}-use-main-api`).on("change", function() {
          const useMainApi = $(this).is(":checked");
          const $customFields = $container2.find(`#${SCRIPT_ID}-custom-api-fields`);
          if (useMainApi) {
            $customFields.addClass("yyt-disabled").find("input, button, select").prop("disabled", true);
          } else {
            $customFields.removeClass("yyt-disabled").find("input, button, select").prop("disabled", false);
          }
        });
        $container2.find(`#${SCRIPT_ID}-toggle-key-visibility`).on("click", function() {
          const $input = $container2.find(`#${SCRIPT_ID}-api-key`);
          const type = $input.attr("type");
          $input.attr("type", type === "password" ? "text" : "password");
          $(this).find("i").toggleClass("fa-eye fa-eye-slash");
        });
        $container2.find(`#${SCRIPT_ID}-load-models`).on("click", async () => {
          const $btn = $container2.find(`#${SCRIPT_ID}-load-models`);
          const $modelInput = $container2.find(`#${SCRIPT_ID}-model`);
          const $modelSelect = $container2.find(`#${SCRIPT_ID}-model-select`);
          $btn.prop("disabled", true).find("i").addClass("fa-spin");
          try {
            const config = getFormApiConfig($container2, SCRIPT_ID);
            const models = await fetchAvailableModels(config);
            if (models.length > 0) {
              $modelSelect.empty();
              models.forEach((model) => {
                $modelSelect.append(`<option value="${escapeHtml(model)}">${escapeHtml(model)}</option>`);
              });
              $modelInput.hide();
              $modelSelect.show();
              const currentModel = $modelInput.val();
              if (currentModel && models.includes(currentModel)) {
                $modelSelect.val(currentModel);
              }
              $modelSelect.off("change").on("change", function() {
                $modelInput.val($(this).val());
              });
              showToast("success", `\u5DF2\u52A0\u8F7D ${models.length} \u4E2A\u6A21\u578B`);
            } else {
              showToast("warning", "\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165");
            }
          } catch (e) {
            showToast("error", `\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${e.message}`);
          } finally {
            $btn.prop("disabled", false).find("i").removeClass("fa-spin");
          }
        });
        $container2.find(`#${SCRIPT_ID}-model`).on("focus", function() {
          const $modelSelect = $container2.find(`#${SCRIPT_ID}-model-select`);
          $(this).show();
          $modelSelect.hide();
        });
        $container2.find(`#${SCRIPT_ID}-save-api-config`).on("click", () => {
          const config = getFormApiConfig($container2, SCRIPT_ID);
          const validation = validateApiConfig(config);
          if (!validation.valid && !config.useMainApi) {
            showToast("error", validation.errors.join(", "));
            return;
          }
          if (currentLoadedPresetName) {
            if (!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${currentLoadedPresetName}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E`)) {
              updateApiConfig(config);
              showToast("success", "API\u914D\u7F6E\u5DF2\u4FDD\u5B58");
              return;
            }
            updateApiConfig(config);
            const result = updatePreset(currentLoadedPresetName, { apiConfig: config });
            if (result.success) {
              showToast("success", `\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${currentLoadedPresetName}"`);
              eventBus.emit(EVENTS.PRESET_UPDATED, { name: currentLoadedPresetName });
              const $panel = $container2.closest(".yyt-api-manager").parent();
              if ($panel.length) {
                this.renderTo($panel);
              }
            } else {
              showToast("error", result.message);
            }
            return;
          }
          const activePreset = getActivePresetName();
          if (activePreset) {
            updateApiConfig(config);
            updatePreset(activePreset, { apiConfig: config });
            showToast("success", "API\u914D\u7F6E\u5DF2\u4FDD\u5B58");
            return;
          }
          updateApiConfig(config);
          showToast("success", "API\u914D\u7F6E\u5DF2\u4FDD\u5B58");
        });
        $container2.find(`#${SCRIPT_ID}-reset-api-config`).on("click", () => {
          if (confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")) {
            updateApiConfig({
              url: "",
              apiKey: "",
              model: "",
              useMainApi: true,
              max_tokens: 4096,
              temperature: 0.7,
              top_p: 0.9
            });
            const $panel = $container2.closest(".yyt-api-manager").parent();
            if ($panel.length) {
              this.renderTo($panel);
            }
            showToast("info", "API\u914D\u7F6E\u5DF2\u91CD\u7F6E");
          }
        });
        $container2.find(`#${SCRIPT_ID}-save-as-preset`).on("click", () => {
          this._showSavePresetDialog($container2, $);
        });
      },
      /**
       * 绑定文件事件
       * @private
       */
      _bindFileEvents($container2, $) {
        $container2.find(`#${SCRIPT_ID}-export-presets`).on("click", () => {
          try {
            const json = exportPresets();
            downloadJson(json, `youyou_toolkit_presets_${Date.now()}.json`);
            showToast("success", "\u9884\u8BBE\u5DF2\u5BFC\u51FA");
          } catch (e) {
            showToast("error", `\u5BFC\u51FA\u5931\u8D25: ${e.message}`);
          }
        });
        $container2.find(`#${SCRIPT_ID}-import-presets`).on("click", () => {
          $container2.find(`#${SCRIPT_ID}-import-file`).click();
        });
        $container2.find(`#${SCRIPT_ID}-import-file`).on("change", async (e) => {
          const file = e.target.files[0];
          if (!file)
            return;
          try {
            const text = await readFileContent(file);
            const result = importPresets(text, { overwrite: true });
            showToast(result.success ? "success" : "error", result.message);
            if (result.imported > 0) {
              const $panel = $container2.closest(".yyt-api-manager").parent();
              if ($panel.length) {
                this.renderTo($panel);
              }
            }
          } catch (e2) {
            showToast("error", `\u5BFC\u5165\u5931\u8D25: ${e2.message}`);
          }
          $(e.target).val("");
        });
      },
      /**
       * 显示保存预设对话框
       * @private
       */
      _showSavePresetDialog($container2, $) {
        const presets = getAllPresets();
        const existingNames = presets.map((p) => p.name);
        const defaultName = generateUniquePresetName("\u65B0\u9884\u8BBE");
        const dialogHtml = `
      <div class="yyt-dialog-overlay" id="${SCRIPT_ID}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${SCRIPT_ID}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-dialog-preset-name" 
                     value="${escapeHtml(defaultName)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${SCRIPT_ID}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;
        $(`#${SCRIPT_ID}-dialog-overlay`).remove();
        $container2.append(dialogHtml);
        const $overlay = $(`#${SCRIPT_ID}-dialog-overlay`);
        const $nameInput = $(`#${SCRIPT_ID}-dialog-preset-name`);
        const $descInput = $(`#${SCRIPT_ID}-dialog-preset-desc`);
        $nameInput.focus().select();
        const closeDialog = () => $overlay.remove();
        $overlay.find(`#${SCRIPT_ID}-dialog-close, #${SCRIPT_ID}-dialog-cancel`).on("click", closeDialog);
        $overlay.on("click", function(e) {
          if (e.target === this)
            closeDialog();
        });
        $overlay.find(`#${SCRIPT_ID}-dialog-save`).on("click", () => {
          const name = $nameInput.val().trim();
          const desc = $descInput.val().trim();
          if (!name) {
            showToast("warning", "\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");
            $nameInput.focus();
            return;
          }
          if (existingNames.includes(name)) {
            if (!confirm(`\u9884\u8BBE "${name}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`)) {
              return;
            }
            deletePreset(name);
          }
          const currentConfig = getFormApiConfig($container2, SCRIPT_ID);
          const result = createPreset({
            name,
            description: desc,
            apiConfig: currentConfig
          });
          if (result.success) {
            showToast("success", result.message);
            closeDialog();
            eventBus.emit(EVENTS.PRESET_CREATED, { preset: result.preset });
            const $panel = $container2.closest(".yyt-api-manager").parent();
            if ($panel.length) {
              this.renderTo($panel);
            }
          } else {
            showToast("error", result.message);
          }
        });
        $nameInput.on("keypress", function(e) {
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
      destroy($container2) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find("*").off();
        $(document).off("click.yyt-dropdown");
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
      /* CSS\u53D8\u91CF\u5B9A\u4E49 */
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
      
      /* \u9762\u677F */
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
      
      /* \u6807\u9898 */
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
      
      /* \u9884\u8BBE\u9009\u62E9\u5668 */
      .yyt-preset-selector {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      
      /* \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 */
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
      
      /* \u9884\u8BBE\u5217\u8868 - \u7D27\u51D1\u6837\u5F0F */
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
      
      /* \u9884\u8BBE\u9879 - \u7D27\u51D1\u6837\u5F0F */
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
      
      /* \u5FBD\u7AE0 */
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
      
      /* \u8868\u5355 */
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
      
      /* Toggle\u5F00\u5173 */
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
      
      /* \u8F93\u5165\u6846 */
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
      
      /* \u6A21\u578B\u884C */
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
      
      /* \u9762\u677F\u5E95\u90E8 */
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
      
      /* \u6309\u94AE */
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
      
      /* \u5BF9\u8BDD\u6846 */
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
      
      /* \u52A8\u753B */
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
      renderTo($container2) {
        const html = this.render({});
        $container2.html(html);
        this.bindEvents($container2, {});
      }
    };
  }
});

// modules/regex-extractor.js
var regex_extractor_exports = {};
__export(regex_extractor_exports, {
  MESSAGE_MACROS: () => MESSAGE_MACROS,
  addTagRule: () => addTagRule,
  createRuleTemplate: () => createRuleTemplate,
  default: () => regex_extractor_default,
  deleteRulePreset: () => deleteRulePreset,
  deleteRuleTemplate: () => deleteRuleTemplate,
  deleteTagRule: () => deleteTagRule,
  escapeRegex: () => escapeRegex,
  exportRulesConfig: () => exportRulesConfig,
  extractComplexTag: () => extractComplexTag,
  extractCurlyBraceTag: () => extractCurlyBraceTag,
  extractHtmlFormatTag: () => extractHtmlFormatTag,
  extractSimpleTag: () => extractSimpleTag,
  extractTagContent: () => extractTagContent,
  generateTagSuggestions: () => generateTagSuggestions,
  getAllRulePresets: () => getAllRulePresets,
  getAllRuleTemplates: () => getAllRuleTemplates,
  getContentBlacklist: () => getContentBlacklist,
  getRuleTemplate: () => getRuleTemplate,
  getTagRules: () => getTagRules,
  importRulesConfig: () => importRulesConfig,
  isValidTagName: () => isValidTagName,
  loadRulePreset: () => loadRulePreset,
  saveRulesAsPreset: () => saveRulesAsPreset,
  scanTextForTags: () => scanTextForTags,
  setContentBlacklist: () => setContentBlacklist,
  setTagRules: () => setTagRules,
  shouldSkipContent: () => shouldSkipContent,
  testRegex: () => testRegex,
  updateRuleTemplate: () => updateRuleTemplate,
  updateTagRule: () => updateTagRule
});
function init() {
  const settings = loadSettings();
  ruleTemplates = settings.ruleTemplates || [...DEFAULT_RULE_TEMPLATES];
  tagRules = settings.tagRules || [];
  contentBlacklist = settings.contentBlacklist || [];
  return { ruleTemplates, tagRules, contentBlacklist };
}
function escapeRegex(str) {
  if (typeof str !== "string")
    return "";
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function shouldSkipContent(text, blacklist) {
  if (!blacklist || blacklist.length === 0)
    return false;
  if (!text || typeof text !== "string")
    return false;
  const lowerText = text.toLowerCase();
  return blacklist.some((keyword) => {
    const lowerKeyword = keyword.trim().toLowerCase();
    return lowerKeyword && lowerText.includes(lowerKeyword);
  });
}
function isValidTagName(tagName) {
  if (!tagName || typeof tagName !== "string")
    return false;
  const validPattern = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
  return validPattern.test(tagName) && !EXCLUDED_HTML_TAGS.includes(tagName.toLowerCase());
}
function extractSimpleTag(text, tag) {
  if (!text || !tag)
    return [];
  const extractedContent = [];
  const escapedTag = escapeRegex(tag);
  const regex = new RegExp(`<${escapedTag}>([\\s\\S]*?)<\\/${escapedTag}>`, "gi");
  const matches = [...text.matchAll(regex)];
  matches.forEach((match) => {
    if (match[1]) {
      extractedContent.push(match[1].trim());
    }
  });
  const openTags = (text.match(new RegExp(`<${escapedTag}>`, "gi")) || []).length;
  const closeTags = (text.match(new RegExp(`<\\/${escapedTag}>`, "gi")) || []).length;
  if (openTags > closeTags) {
    console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${openTags - closeTags} \u4E2A\u672A\u95ED\u5408\u7684 <${tag}> \u6807\u7B7E`);
  }
  return extractedContent;
}
function extractCurlyBraceTag(text, tag) {
  if (!text || !tag)
    return [];
  const extractedContent = [];
  const escapedTag = escapeRegex(tag);
  const startPattern = new RegExp(`\\{${escapedTag}\\|`, "gi");
  let match;
  while ((match = startPattern.exec(text)) !== null) {
    const startPos = match.index;
    const contentStart = startPos + match[0].length;
    let braceCount = 1;
    let pos = contentStart;
    while (pos < text.length && braceCount > 0) {
      if (text[pos] === "{") {
        braceCount++;
      } else if (text[pos] === "}") {
        braceCount--;
      }
      pos++;
    }
    if (braceCount === 0) {
      const content = text.substring(contentStart, pos - 1);
      if (content.trim()) {
        extractedContent.push(content.trim());
      }
    }
    startPattern.lastIndex = startPos + 1;
  }
  return extractedContent;
}
function extractComplexTag(text, tag) {
  if (!text || !tag)
    return [];
  const parts = tag.split(",");
  if (parts.length !== 2) {
    console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${tag}`);
    return [];
  }
  const startPattern = parts[0].trim();
  const endPattern = parts[1].trim();
  const endTagMatch = endPattern.match(/<\/(\w+)>/);
  if (!endTagMatch) {
    console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${endPattern}`);
    return [];
  }
  const endTagName = endTagMatch[1];
  const regex = new RegExp(`${escapeRegex(startPattern)}([\\s\\S]*?)<\\/${endTagName}>`, "gi");
  const extractedContent = [];
  const matches = [...text.matchAll(regex)];
  matches.forEach((match) => {
    if (match[1]) {
      extractedContent.push(match[1].trim());
    }
  });
  return extractedContent;
}
function extractHtmlFormatTag(text, tag) {
  if (!text || !tag)
    return [];
  const tagMatch = tag.match(/<(\w+)(?:\s[^>]*)?>/);
  if (!tagMatch) {
    console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${tag}`);
    return [];
  }
  const tagName = tagMatch[1];
  const extractedContent = [];
  const regex = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  const matches = [...text.matchAll(regex)];
  matches.forEach((match) => {
    if (match[1]) {
      extractedContent.push(match[1].trim());
    }
  });
  const openTags = (text.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>`, "gi")) || []).length;
  const closeTags = (text.match(new RegExp(`<\\/${tagName}>`, "gi")) || []).length;
  if (openTags > closeTags) {
    console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${openTags - closeTags} \u4E2A\u672A\u95ED\u5408\u7684 <${tagName}> \u6807\u7B7E`);
  }
  return extractedContent;
}
function extractTagContent(text, rules, blacklist = []) {
  if (!text)
    return "";
  if (!rules || rules.length === 0) {
    return text;
  }
  const blockExcludeRules = rules.filter((rule) => rule.type === "exclude" && rule.enabled);
  const includeRules = rules.filter((rule) => (rule.type === "include" || rule.type === "regex_include") && rule.enabled);
  const cleanupRules = rules.filter((rule) => rule.type === "regex_exclude" && rule.enabled);
  let workingText = text;
  for (const rule of blockExcludeRules) {
    try {
      const tagRegex = new RegExp(
        `<${escapeRegex(rule.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${escapeRegex(rule.value)}>`,
        "gi"
      );
      workingText = workingText.replace(tagRegex, "");
    } catch (error) {
      console.error(`[YouYouToolkit] Error applying block exclusion rule:`, { rule, error });
    }
  }
  let extractedContents = [];
  if (includeRules.length > 0) {
    for (const rule of includeRules) {
      let results = [];
      try {
        if (rule.type === "include") {
          results.push(...extractSimpleTag(workingText, rule.value));
          results.push(...extractCurlyBraceTag(workingText, rule.value));
        } else if (rule.type === "regex_include") {
          const regex = new RegExp(rule.value, "gi");
          const matches = [...workingText.matchAll(regex)];
          matches.forEach((match) => {
            if (match[1])
              results.push(match[1]);
          });
        }
      } catch (error) {
        console.error(`[YouYouToolkit] Error applying inclusion rule:`, { rule, error });
      }
      results.forEach((content) => extractedContents.push(content.trim()));
    }
  } else {
    extractedContents.push(workingText);
  }
  let finalContents = [];
  for (let contentBlock of extractedContents) {
    for (const rule of cleanupRules) {
      try {
        const regex = new RegExp(rule.value, "gi");
        contentBlock = contentBlock.replace(regex, "");
      } catch (error) {
        console.error(`[YouYouToolkit] Error applying cleanup rule:`, { rule, error });
      }
    }
    if (!shouldSkipContent(contentBlock, blacklist)) {
      finalContents.push(contentBlock);
    }
  }
  const joinedContent = finalContents.join("\n\n");
  return joinedContent.replace(/\n\s*\n\s*\n/g, "\n\n").replace(/^\s+|\s+$/g, "").trim();
}
async function scanTextForTags(text, options = {}) {
  const startTime = performance.now();
  const {
    chunkSize = 5e4,
    maxTags = 100,
    timeoutMs = 5e3
  } = options;
  const foundTags = /* @__PURE__ */ new Set();
  const tagRegex = /<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g;
  let processedChars = 0;
  let chunkCount = 0;
  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.slice(i, Math.min(i + chunkSize, text.length));
    chunkCount++;
    processedChars += chunk.length;
    if (performance.now() - startTime > timeoutMs) {
      console.warn(`[YouYouToolkit] Tag scanning timed out after ${timeoutMs}ms`);
      break;
    }
    let match;
    while ((match = tagRegex.exec(chunk)) !== null && foundTags.size < maxTags) {
      const tagName = (match[1] || match[2]).toLowerCase();
      if (isValidTagName(tagName)) {
        foundTags.add(tagName);
      }
    }
    if (foundTags.size >= maxTags)
      break;
    if (chunkCount % 5 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
  const endTime = performance.now();
  return {
    tags: Array.from(foundTags).sort(),
    stats: {
      processingTimeMs: Math.round(endTime - startTime),
      processedChars,
      totalChars: text.length,
      chunkCount,
      tagsFound: foundTags.size
    }
  };
}
function generateTagSuggestions(scanResult, limit = 25) {
  const suggestions = scanResult.tags.slice(0, limit);
  return {
    suggestions,
    stats: {
      totalFound: scanResult.stats.tagsFound,
      finalCount: suggestions.length
    }
  };
}
function getAllRuleTemplates() {
  if (ruleTemplates.length === 0) {
    init();
  }
  return ruleTemplates;
}
function getRuleTemplate(id) {
  return ruleTemplates.find((t) => t.id === id);
}
function createRuleTemplate(template) {
  const newTemplate = {
    id: `rule-${Date.now()}`,
    name: template.name || "\u65B0\u89C4\u5219",
    description: template.description || "",
    type: template.type || "include",
    value: template.value || "",
    enabled: template.enabled !== false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  ruleTemplates.push(newTemplate);
  saveRuleTemplates();
  return { success: true, template: newTemplate, message: "\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F" };
}
function updateRuleTemplate(id, updates) {
  const index = ruleTemplates.findIndex((t) => t.id === id);
  if (index === -1) {
    return { success: false, message: "\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728" };
  }
  ruleTemplates[index] = {
    ...ruleTemplates[index],
    ...updates,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  saveRuleTemplates();
  return { success: true, template: ruleTemplates[index], message: "\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F" };
}
function deleteRuleTemplate(id) {
  const index = ruleTemplates.findIndex((t) => t.id === id);
  if (index === -1) {
    return { success: false, message: "\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728" };
  }
  ruleTemplates.splice(index, 1);
  saveRuleTemplates();
  return { success: true, message: "\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664" };
}
function saveRuleTemplates() {
  const settings = loadSettings();
  settings.ruleTemplates = ruleTemplates;
  saveSettings(settings);
}
function getTagRules() {
  if (!tagRules) {
    init();
  }
  return tagRules;
}
function setTagRules(rules) {
  tagRules = rules || [];
  const settings = loadSettings();
  settings.tagRules = tagRules;
  saveSettings(settings);
}
function addTagRule(rule) {
  const newRule = {
    id: `tag-${Date.now()}`,
    type: rule.type || "include",
    value: rule.value || "",
    enabled: rule.enabled !== false
  };
  tagRules.push(newRule);
  const settings = loadSettings();
  settings.tagRules = tagRules;
  saveSettings(settings);
  return { success: true, rule: newRule, message: "\u89C4\u5219\u6DFB\u52A0\u6210\u529F" };
}
function updateTagRule(index, updates) {
  if (index < 0 || index >= tagRules.length) {
    return { success: false, message: "\u89C4\u5219\u7D22\u5F15\u65E0\u6548" };
  }
  tagRules[index] = {
    ...tagRules[index],
    ...updates
  };
  const settings = loadSettings();
  settings.tagRules = tagRules;
  saveSettings(settings);
  return { success: true, rule: tagRules[index], message: "\u89C4\u5219\u66F4\u65B0\u6210\u529F" };
}
function deleteTagRule(index) {
  if (index < 0 || index >= tagRules.length) {
    return { success: false, message: "\u89C4\u5219\u7D22\u5F15\u65E0\u6548" };
  }
  tagRules.splice(index, 1);
  const settings = loadSettings();
  settings.tagRules = tagRules;
  saveSettings(settings);
  return { success: true, message: "\u89C4\u5219\u5DF2\u5220\u9664" };
}
function getContentBlacklist() {
  if (!contentBlacklist) {
    init();
  }
  return contentBlacklist;
}
function setContentBlacklist(blacklist) {
  contentBlacklist = blacklist || [];
  const settings = loadSettings();
  settings.contentBlacklist = contentBlacklist;
  saveSettings(settings);
}
function saveRulesAsPreset(name, description = "") {
  if (!name || !name.trim()) {
    return { success: false, message: "\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
  }
  const settings = loadSettings();
  if (!settings.tagRulePresets) {
    settings.tagRulePresets = {};
  }
  const presetId = `preset-${Date.now()}`;
  settings.tagRulePresets[presetId] = {
    id: presetId,
    name: name.trim(),
    description: description.trim(),
    rules: JSON.parse(JSON.stringify(tagRules)),
    blacklist: JSON.parse(JSON.stringify(contentBlacklist)),
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  saveSettings(settings);
  return { success: true, preset: settings.tagRulePresets[presetId], message: "\u9884\u8BBE\u4FDD\u5B58\u6210\u529F" };
}
function getAllRulePresets() {
  const settings = loadSettings();
  const presets = settings.tagRulePresets || {};
  return Object.values(presets);
}
function loadRulePreset(presetId) {
  const settings = loadSettings();
  const presets = settings.tagRulePresets || {};
  const preset = presets[presetId];
  if (!preset) {
    return { success: false, message: "\u9884\u8BBE\u4E0D\u5B58\u5728" };
  }
  tagRules = JSON.parse(JSON.stringify(preset.rules || []));
  contentBlacklist = JSON.parse(JSON.stringify(preset.blacklist || []));
  settings.tagRules = tagRules;
  settings.contentBlacklist = contentBlacklist;
  saveSettings(settings);
  return { success: true, preset, message: "\u9884\u8BBE\u52A0\u8F7D\u6210\u529F" };
}
function deleteRulePreset(presetId) {
  const settings = loadSettings();
  const presets = settings.tagRulePresets || {};
  if (!presets[presetId]) {
    return { success: false, message: "\u9884\u8BBE\u4E0D\u5B58\u5728" };
  }
  delete presets[presetId];
  settings.tagRulePresets = presets;
  saveSettings(settings);
  return { success: true, message: "\u9884\u8BBE\u5DF2\u5220\u9664" };
}
function exportRulesConfig() {
  return JSON.stringify({
    tagRules,
    contentBlacklist,
    ruleTemplates,
    tagRulePresets: loadSettings().tagRulePresets || {}
  }, null, 2);
}
function importRulesConfig(json, options = { overwrite: true }) {
  try {
    const imported = JSON.parse(json);
    if (options.overwrite) {
      tagRules = imported.tagRules || [];
      contentBlacklist = imported.contentBlacklist || [];
      ruleTemplates = imported.ruleTemplates || DEFAULT_RULE_TEMPLATES;
    } else {
      if (imported.tagRules) {
        tagRules.push(...imported.tagRules);
      }
      if (imported.contentBlacklist) {
        const existingBlacklist = new Set(contentBlacklist.map((k) => k.toLowerCase()));
        imported.contentBlacklist.forEach((k) => {
          if (!existingBlacklist.has(k.toLowerCase())) {
            contentBlacklist.push(k);
          }
        });
      }
    }
    const settings = loadSettings();
    settings.tagRules = tagRules;
    settings.contentBlacklist = contentBlacklist;
    settings.ruleTemplates = ruleTemplates;
    if (imported.tagRulePresets) {
      settings.tagRulePresets = {
        ...settings.tagRulePresets || {},
        ...imported.tagRulePresets
      };
    }
    saveSettings(settings);
    return { success: true, message: "\u914D\u7F6E\u5BFC\u5165\u6210\u529F" };
  } catch (e) {
    return { success: false, message: `\u5BFC\u5165\u5931\u8D25: ${e.message}` };
  }
}
function testRegex(pattern, text, flags = "g", groupIndex = 0) {
  try {
    if (!pattern || typeof pattern !== "string") {
      return { success: false, error: "\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A", matches: [] };
    }
    const regex = new RegExp(pattern, flags);
    const matches = [];
    if (flags.includes("g")) {
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.length > 1) {
          matches.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
            extracted: match[groupIndex] || match[1] || match[0]
          });
        } else {
          matches.push({
            fullMatch: match[0],
            groups: [],
            index: match.index,
            extracted: match[0]
          });
        }
      }
    } else {
      const match = regex.exec(text);
      if (match) {
        matches.push({
          fullMatch: match[0],
          groups: match.length > 1 ? match.slice(1) : [],
          index: match.index,
          extracted: match.length > 1 ? match[groupIndex] || match[1] : match[0]
        });
      }
    }
    return {
      success: true,
      matches,
      count: matches.length,
      extracted: matches.map((m) => m.extracted)
    };
  } catch (e) {
    return { success: false, error: e.message, matches: [] };
  }
}
var EXCLUDED_HTML_TAGS, DEFAULT_RULE_TEMPLATES, ruleTemplates, tagRules, contentBlacklist, MESSAGE_MACROS, regex_extractor_default;
var init_regex_extractor = __esm({
  "modules/regex-extractor.js"() {
    init_storage();
    EXCLUDED_HTML_TAGS = [
      "font",
      "span",
      "div",
      "p",
      "br",
      "hr",
      "img",
      "a",
      "b",
      "i",
      "u",
      "s",
      "em",
      "strong",
      "small",
      "big",
      "sub",
      "sup",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "table",
      "tr",
      "td",
      "th",
      "tbody",
      "thead",
      "tfoot",
      "ul",
      "ol",
      "li",
      "form",
      "input",
      "button",
      "select",
      "option",
      "textarea",
      "label",
      "script",
      "style",
      "meta",
      "link",
      "title",
      "head",
      "body",
      "html"
    ];
    DEFAULT_RULE_TEMPLATES = [
      {
        id: "exclude-thinking",
        name: "\u6392\u9664\u601D\u8003\u6807\u7B7E",
        description: "\u79FB\u9664<thinking>\u6807\u7B7E\u5757",
        type: "exclude",
        value: "thinking",
        enabled: true
      },
      {
        id: "include-content",
        name: "\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",
        description: "\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",
        type: "include",
        value: "content",
        enabled: true
      },
      {
        id: "regex-exclude-cot",
        name: "\u6392\u9664\u5C0FCoT",
        description: "\u79FB\u9664HTML\u6CE8\u91CA",
        type: "regex_exclude",
        value: "<!--[\\s\\S]*?-->",
        enabled: false
      },
      {
        id: "regex-include-details",
        name: "\u63D0\u53D6details\u6807\u7B7E",
        description: "\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",
        type: "regex_include",
        value: "<details[^>]*>([\\s\\S]*?)</details>",
        enabled: false
      }
    ];
    ruleTemplates = [];
    tagRules = [];
    contentBlacklist = [];
    MESSAGE_MACROS = {
      lastMessage: {
        macro: "{{lastMessage}}",
        description: "\u6700\u540E\u4E00\u6761\u6D88\u606F"
      },
      lastCharMessage: {
        macro: "{{lastCharMessage}}",
        description: "\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"
      },
      lastUserMessage: {
        macro: "{{lastUserMessage}}",
        description: "\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"
      },
      char: {
        macro: "{{char}}",
        description: "\u89D2\u8272\u540D\u79F0"
      },
      user: {
        macro: "{{user}}",
        description: "\u7528\u6237\u540D\u79F0"
      },
      input: {
        macro: "{{input}}",
        description: "\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"
      }
    };
    init();
    regex_extractor_default = {
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
    };
  }
});

// modules/ui/components/regex-extract-panel.js
var RegexExtractPanel;
var init_regex_extract_panel = __esm({
  "modules/ui/components/regex-extract-panel.js"() {
    init_event_bus();
    init_utils();
    init_regex_extractor();
    RegexExtractPanel = {
      id: "regexExtractPanel",
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
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${SCRIPT_ID}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>
          
          ${this._renderRulesEditor(rules, blacklist, presets)}
        </div>
        
        <!-- \u6D4B\u8BD5\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-flask"></i>
            <span>\u6D4B\u8BD5\u63D0\u53D6</span>
          </div>
          
          ${this._renderTestSection()}
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${SCRIPT_ID}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${SCRIPT_ID}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
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
        const rulesList = rules.length > 0 ? rules.map((rule, index) => this._renderRuleItem(rule, index)).join("") : '<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>';
        const presetOptions = presets.length > 0 ? presets.map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("") : "";
        return `
      <div class="yyt-tag-rules-editor">
        ${presetOptions ? `
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${SCRIPT_ID}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${presetOptions}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        ` : `
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${rulesList}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${SCRIPT_ID}-content-blacklist" 
                 value="${escapeHtml(blacklist.join(", "))}" 
                 placeholder="\u5173\u952E\u8BCD1, \u5173\u952E\u8BCD2, ...">
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
          <option value="include" ${rule.type === "include" ? "selected" : ""}>\u5305\u542B</option>
          <option value="regex_include" ${rule.type === "regex_include" ? "selected" : ""}>\u6B63\u5219\u5305\u542B</option>
          <option value="exclude" ${rule.type === "exclude" ? "selected" : ""}>\u6392\u9664</option>
          <option value="regex_exclude" ${rule.type === "regex_exclude" ? "selected" : ""}>\u6B63\u5219\u6392\u9664</option>
        </select>
        <input type="text" class="yyt-input yyt-rule-value" style="flex: 5;" 
               placeholder="\u6807\u7B7E\u540D\u6216\u6B63\u5219\u8868\u8FBE\u5F0F" 
               value="${escapeHtml(rule.value || "")}">
        <label class="yyt-checkbox-label yyt-rule-enabled-label">
          <input type="checkbox" class="yyt-rule-enabled" ${rule.enabled ? "checked" : ""}>
          <span>\u542F\u7528</span>
        </label>
        <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-rule-delete" title="\u5220\u9664\u89C4\u5219">
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
          <label>\u6D4B\u8BD5\u6587\u672C</label>
          <textarea class="yyt-textarea" id="${SCRIPT_ID}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${SCRIPT_ID}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
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
      bindEvents($container2, dependencies) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        this._bindRuleEditorEvents($container2, $);
        this._bindPresetEvents($container2, $);
        this._bindTestEvents($container2, $);
        this._bindFileEvents($container2, $);
      },
      /**
       * 绑定规则编辑器事件
       * @private
       */
      _bindRuleEditorEvents($container2, $) {
        $container2.find(".yyt-rule-type").on("change", function() {
          const $item = $(this).closest(".yyt-rule-item");
          const index = $item.data("rule-index");
          const type = $(this).val();
          updateTagRule(index, { type });
          showToast("info", "\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0");
        });
        $container2.find(".yyt-rule-value").on("change", function() {
          const $item = $(this).closest(".yyt-rule-item");
          const index = $item.data("rule-index");
          const value = $(this).val().trim();
          updateTagRule(index, { value });
        });
        $container2.find(".yyt-rule-enabled").on("change", function() {
          const $item = $(this).closest(".yyt-rule-item");
          const index = $item.data("rule-index");
          const enabled = $(this).is(":checked");
          updateTagRule(index, { enabled });
          showToast("info", enabled ? "\u89C4\u5219\u5DF2\u542F\u7528" : "\u89C4\u5219\u5DF2\u7981\u7528");
        });
        $container2.find(".yyt-rule-delete").on("click", () => {
          const $item = $container2.find(".yyt-rule-delete").closest(".yyt-rule-item");
          const index = $item.data("rule-index");
          if (confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")) {
            deleteTagRule(index);
            this.renderTo($container2);
            showToast("info", "\u89C4\u5219\u5DF2\u5220\u9664");
          }
        });
        $container2.on("click", ".yyt-rule-delete", (e) => {
          const $item = $(e.currentTarget).closest(".yyt-rule-item");
          const index = $item.data("rule-index");
          if (confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")) {
            deleteTagRule(index);
            this.renderTo($container2);
            showToast("info", "\u89C4\u5219\u5DF2\u5220\u9664");
          }
        });
        $container2.find(`#${SCRIPT_ID}-add-rule`).on("click", () => {
          addTagRule({
            type: "include",
            value: "",
            enabled: true
          });
          this.renderTo($container2);
          showToast("success", "\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219");
        });
        $container2.find(`#${SCRIPT_ID}-scan-tags`).on("click", async () => {
          const $btn = $container2.find(`#${SCRIPT_ID}-scan-tags`);
          const testText = $container2.find(`#${SCRIPT_ID}-test-input`).val();
          if (!testText || !testText.trim()) {
            showToast("warning", "\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");
            return;
          }
          $btn.prop("disabled", true).find("i").addClass("fa-spin");
          try {
            const scanResult = await scanTextForTags(testText, { maxTags: 50, timeoutMs: 3e3 });
            const { suggestions, stats } = generateTagSuggestions(scanResult, 25);
            if (suggestions.length === 0) {
              showToast("info", "\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E");
              $container2.find(`#${SCRIPT_ID}-tag-suggestions-container`).hide();
              return;
            }
            const $tagList = $container2.find(`#${SCRIPT_ID}-tag-list`);
            const $stats = $container2.find(`#${SCRIPT_ID}-tag-scan-stats`);
            $stats.text(`${stats.finalCount}/${stats.totalFound} \u4E2A\u6807\u7B7E, ${scanResult.stats.processingTimeMs}ms`);
            $tagList.empty();
            suggestions.forEach((tag) => {
              const $tagBtn = $(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${escapeHtml(tag)}</button>`);
              $tagBtn.on("click", () => {
                const rules = getTagRules();
                const exists = rules.some((r) => r.type === "include" && r.value === tag);
                if (exists) {
                  showToast("warning", `\u89C4\u5219 "\u5305\u542B: ${tag}" \u5DF2\u5B58\u5728`);
                  return;
                }
                addTagRule({
                  type: "include",
                  value: tag,
                  enabled: true
                });
                this.renderTo($container2);
                showToast("success", `\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${tag}"`);
              });
              $tagList.append($tagBtn);
            });
            $container2.find(`#${SCRIPT_ID}-tag-suggestions-container`).show();
            showToast("success", `\u53D1\u73B0 ${suggestions.length} \u4E2A\u6807\u7B7E`);
          } catch (e) {
            showToast("error", `\u626B\u63CF\u5931\u8D25: ${e.message}`);
          } finally {
            $btn.prop("disabled", false).find("i").removeClass("fa-spin");
          }
        });
        $container2.find(`#${SCRIPT_ID}-add-exclude-cot`).on("click", () => {
          const rules = getTagRules();
          const cotPattern = "<!--[\\s\\S]*?-->";
          const exists = rules.some((r) => r.type === "regex_exclude" && r.value === cotPattern);
          if (exists) {
            showToast("warning", "\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");
            return;
          }
          addTagRule({
            type: "regex_exclude",
            value: cotPattern,
            enabled: true
          });
          this.renderTo($container2);
          showToast("success", "\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219");
        });
        $container2.find(`#${SCRIPT_ID}-content-blacklist`).on("change", function() {
          const value = $(this).val();
          const blacklist = value.split(",").map((k) => k.trim()).filter((k) => k);
          setContentBlacklist(blacklist);
          showToast("info", `\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${blacklist.length} \u4E2A\u5173\u952E\u8BCD`);
        });
        $container2.find(`#${SCRIPT_ID}-show-examples`).on("click", () => {
          const examples = `
\u89C4\u5219\u7C7B\u578B\u8BF4\u660E:

1. \u3010\u5305\u542B\u3011include
   - \u7B80\u5355\u6807\u7B7E\u540D\u63D0\u53D6
   - \u540C\u65F6\u5339\u914D <tag>\u5185\u5BB9</tag> \u548C {tag|\u5185\u5BB9}
   - \u793A\u4F8B\u503C: content, thinking, story

2. \u3010\u6B63\u5219\u5305\u542B\u3011regex_include
   - \u4F7F\u7528\u6B63\u5219\u8868\u8FBE\u5F0F\u63D0\u53D6
   - \u5FC5\u987B\u5305\u542B\u6355\u83B7\u7EC4 ()
   - \u7CFB\u7EDF\u63D0\u53D6\u7B2C\u4E00\u4E2A\u6355\u83B7\u7EC4\u7684\u5185\u5BB9
   - \u793A\u4F8B: <details[^>]*>([\\s\\S]*?)</details>

3. \u3010\u6392\u9664\u3011exclude
   - \u5757\u7EA7\u6392\u9664\uFF0C\u79FB\u9664\u6574\u4E2A\u6807\u7B7E\u5757
   - \u5728\u63D0\u53D6\u4E4B\u524D\u6267\u884C
   - \u793A\u4F8B\u503C: thinking, analysis

4. \u3010\u6B63\u5219\u6392\u9664\u3011regex_exclude
   - \u5BF9\u5DF2\u63D0\u53D6\u7684\u5185\u5BB9\u8FDB\u884C\u6E05\u7406
   - \u79FB\u9664\u5339\u914D\u7684\u5185\u5BB9
   - \u793A\u4F8B:<!--[\\s\\S]*?--> (\u79FB\u9664HTML\u6CE8\u91CA)

\u5904\u7406\u987A\u5E8F:
Phase 1: \u6267\u884C\u3010\u6392\u9664\u3011\u89C4\u5219\uFF0C\u79FB\u9664\u4E0D\u9700\u8981\u7684\u6807\u7B7E\u5757
Phase 2: \u6267\u884C\u3010\u5305\u542B\u3011\u548C\u3010\u6B63\u5219\u5305\u542B\u3011\u89C4\u5219\uFF0C\u63D0\u53D6\u5185\u5BB9
Phase 3: \u6267\u884C\u3010\u6B63\u5219\u6392\u9664\u3011\u89C4\u5219\uFF0C\u6E05\u7406\u63D0\u53D6\u7684\u5185\u5BB9
Phase 4: \u5E94\u7528\u9ED1\u540D\u5355\u8FC7\u6EE4

\u5E38\u7528\u89C4\u5219\u793A\u4F8B:
\u2022 \u6392\u9664\u601D\u8003\u8FC7\u7A0B: \u7C7B\u578B=\u6392\u9664, \u503C=thinking
\u2022 \u63D0\u53D6\u5185\u5BB9\u6807\u7B7E: \u7C7B\u578B=\u5305\u542B, \u503C=content
\u2022 \u6392\u9664HTML\u6CE8\u91CA: \u7C7B\u578B=\u6B63\u5219\u6392\u9664, \u503C=<!--[\\s\\S]*?-->
\u2022 \u63D0\u53D6\u82B1\u62EC\u53F7\u5185\u5BB9: \u7C7B\u578B=\u5305\u542B, \u503C=story
      `;
          alert(examples);
        });
      },
      /**
       * 绑定预设事件
       * @private
       */
      _bindPresetEvents($container2, $) {
        $container2.find(`#${SCRIPT_ID}-load-rule-preset`).on("click", () => {
          const presetId = $container2.find(`#${SCRIPT_ID}-rule-preset-select`).val();
          if (!presetId) {
            showToast("warning", "\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");
            return;
          }
          const result = loadRulePreset(presetId);
          if (result.success) {
            this.renderTo($container2);
            showToast("success", `\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${result.preset.name}`);
            eventBus.emit(EVENTS.REGEX_PRESET_LOADED, { preset: result.preset });
          } else {
            showToast("error", result.message);
          }
        });
        $container2.find(`#${SCRIPT_ID}-save-rule-preset`).on("click", () => {
          const name = prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");
          if (!name || !name.trim())
            return;
          const result = saveRulesAsPreset(name.trim());
          if (result.success) {
            this.renderTo($container2);
            showToast("success", `\u9884\u8BBE "${name.trim()}" \u5DF2\u4FDD\u5B58`);
          } else {
            showToast("error", result.message);
          }
        });
      },
      /**
       * 绑定测试事件
       * @private
       */
      _bindTestEvents($container2, $) {
        $container2.find(`#${SCRIPT_ID}-test-extract`).on("click", () => {
          const text = $container2.find(`#${SCRIPT_ID}-test-input`).val();
          if (!text || !text.trim()) {
            showToast("warning", "\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");
            return;
          }
          const rules = getTagRules();
          const blacklist = getContentBlacklist();
          const result = extractTagContent(text, rules, blacklist);
          const $resultContainer = $container2.find(`#${SCRIPT_ID}-test-result-container`);
          const $result = $container2.find(`#${SCRIPT_ID}-test-result`);
          $resultContainer.show();
          if (!result || !result.trim()) {
            $result.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>');
            showToast("warning", "\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E");
          } else {
            $result.html(`<pre class="yyt-code-block">${escapeHtml(result)}</pre>`);
            showToast("success", "\u63D0\u53D6\u5B8C\u6210");
            eventBus.emit(EVENTS.REGEX_EXTRACTED, { result });
          }
        });
        $container2.find(`#${SCRIPT_ID}-test-clear`).on("click", () => {
          $container2.find(`#${SCRIPT_ID}-test-input`).val("");
          $container2.find(`#${SCRIPT_ID}-test-result-container`).hide();
        });
      },
      /**
       * 绑定文件事件
       * @private
       */
      _bindFileEvents($container2, $) {
        $container2.find(`#${SCRIPT_ID}-import-rules`).on("click", () => {
          $container2.find(`#${SCRIPT_ID}-import-rules-file`).click();
        });
        $container2.find(`#${SCRIPT_ID}-import-rules-file`).on("change", async (e) => {
          const file = e.target.files[0];
          if (!file)
            return;
          try {
            const text = await readFileContent(file);
            const result = importRulesConfig(text, { overwrite: true });
            if (result.success) {
              this.renderTo($container2);
              showToast("success", "\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165");
            } else {
              showToast("error", result.message);
            }
          } catch (e2) {
            showToast("error", `\u5BFC\u5165\u5931\u8D25: ${e2.message}`);
          }
          $(e.target).val("");
        });
        $container2.find(`#${SCRIPT_ID}-export-rules`).on("click", () => {
          try {
            const json = exportRulesConfig();
            downloadJson(json, `youyou_toolkit_rules_${Date.now()}.json`);
            showToast("success", "\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA");
          } catch (e) {
            showToast("error", `\u5BFC\u51FA\u5931\u8D25: ${e.message}`);
          }
        });
        $container2.find(`#${SCRIPT_ID}-reset-rules`).on("click", () => {
          if (confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")) {
            setTagRules([]);
            setContentBlacklist([]);
            this.renderTo($container2);
            showToast("info", "\u89C4\u5219\u5DF2\u91CD\u7F6E");
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
      destroy($container2) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find("*").off();
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
      /* \u6B63\u5219\u63D0\u53D6\u9762\u677F\u6837\u5F0F */
      .yyt-regex-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      /* \u89C4\u5219\u7F16\u8F91\u5668\u6837\u5F0F */
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
      
      /* \u6807\u7B7E\u5EFA\u8BAE\u533A\u57DF */
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
      
      /* \u6D4B\u8BD5\u533A\u57DF */
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
      renderTo($container2) {
        const html = this.render({});
        $container2.html(html);
        this.bindEvents($container2, {});
      }
    };
  }
});

// modules/tool-manager.js
var tool_manager_exports = {};
__export(tool_manager_exports, {
  DEFAULT_TOOL_PRESETS: () => DEFAULT_TOOL_PRESETS,
  DEFAULT_TOOL_STRUCTURE: () => DEFAULT_TOOL_STRUCTURE,
  TOOL_STORAGE_KEYS: () => TOOL_STORAGE_KEYS,
  cloneTool: () => cloneTool,
  deleteTool: () => deleteTool,
  deleteToolPreset: () => deleteToolPreset,
  exportTools: () => exportTools,
  getAllToolPresets: () => getAllToolPresets,
  getAllTools: () => getAllTools,
  getCurrentToolPresetId: () => getCurrentToolPresetId,
  getTool: () => getTool,
  getToolPreset: () => getToolPreset,
  importTools: () => importTools,
  resetTools: () => resetTools,
  saveTool: () => saveTool,
  saveToolPreset: () => saveToolPreset,
  setCurrentToolPreset: () => setCurrentToolPreset,
  setToolEnabled: () => setToolEnabled,
  validateTool: () => validateTool
});
function getAllTools() {
  const saved = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS);
  if (saved && typeof saved === "object") {
    return { ...DEFAULT_TOOL_PRESETS, ...saved };
  }
  return { ...DEFAULT_TOOL_PRESETS };
}
function getTool(toolId) {
  const tools = getAllTools();
  return tools[toolId] || null;
}
function saveTool(toolId, toolDef) {
  if (!toolId || !toolDef) {
    return false;
  }
  const customTools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  const validatedTool = {
    ...DEFAULT_TOOL_STRUCTURE,
    ...toolDef,
    id: toolId,
    metadata: {
      ...DEFAULT_TOOL_STRUCTURE.metadata,
      ...toolDef.metadata,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
  if (!customTools[toolId]) {
    validatedTool.metadata.createdAt = (/* @__PURE__ */ new Date()).toISOString();
  }
  customTools[toolId] = validatedTool;
  toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, customTools);
  eventBus.emit(EVENTS.TOOL_UPDATED, { toolId, tool: validatedTool });
  return true;
}
function deleteTool(toolId) {
  if (DEFAULT_TOOL_PRESETS[toolId]) {
    return false;
  }
  const customTools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  if (customTools[toolId]) {
    delete customTools[toolId];
    toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, customTools);
    eventBus.emit(EVENTS.TOOL_UNREGISTERED, { toolId });
    return true;
  }
  return false;
}
function setToolEnabled(toolId, enabled) {
  const tool = getTool(toolId);
  if (!tool)
    return false;
  const customTools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  if (!customTools[toolId]) {
    customTools[toolId] = { ...tool };
  }
  customTools[toolId].enabled = enabled;
  customTools[toolId].metadata = {
    ...customTools[toolId].metadata,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, customTools);
  eventBus.emit(enabled ? EVENTS.TOOL_ENABLED : EVENTS.TOOL_DISABLED, { toolId });
  return true;
}
function cloneTool(toolId, newId, newName) {
  const tool = getTool(toolId);
  if (!tool)
    return false;
  const clonedTool = JSON.parse(JSON.stringify(tool));
  clonedTool.name = newName || `${tool.name} (\u526F\u672C)`;
  clonedTool.metadata = {
    ...clonedTool.metadata,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  return saveTool(newId, clonedTool);
}
function getAllToolPresets() {
  const saved = toolStorage.get(TOOL_STORAGE_KEYS.PRESETS);
  if (saved && typeof saved === "object") {
    return { ...DEFAULT_TOOL_PRESETS, ...saved };
  }
  return { ...DEFAULT_TOOL_PRESETS };
}
function getToolPreset(presetId) {
  const presets = getAllToolPresets();
  return presets[presetId] || null;
}
function saveToolPreset(presetId, preset) {
  if (!presetId || !preset)
    return false;
  const customPresets = toolStorage.get(TOOL_STORAGE_KEYS.PRESETS) || {};
  customPresets[presetId] = {
    ...preset,
    metadata: {
      ...preset.metadata,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
  toolStorage.set(TOOL_STORAGE_KEYS.PRESETS, customPresets);
  return true;
}
function deleteToolPreset(presetId) {
  if (DEFAULT_TOOL_PRESETS[presetId])
    return false;
  const customPresets = toolStorage.get(TOOL_STORAGE_KEYS.PRESETS) || {};
  if (customPresets[presetId]) {
    delete customPresets[presetId];
    toolStorage.set(TOOL_STORAGE_KEYS.PRESETS, customPresets);
    return true;
  }
  return false;
}
function getCurrentToolPresetId() {
  return toolStorage.get(TOOL_STORAGE_KEYS.CURRENT_PRESET) || null;
}
function setCurrentToolPreset(presetId) {
  const presets = getAllToolPresets();
  if (!presets[presetId])
    return false;
  toolStorage.set(TOOL_STORAGE_KEYS.CURRENT_PRESET, presetId);
  return true;
}
function exportTools() {
  const tools = toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
  const presets = toolStorage.get(TOOL_STORAGE_KEYS.PRESETS) || {};
  return JSON.stringify({
    version: "1.0.0",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    tools,
    presets
  }, null, 2);
}
function importTools(jsonString, overwrite = false) {
  try {
    const imported = JSON.parse(jsonString);
    if (!imported || typeof imported !== "object") {
      return { success: false, toolsImported: 0, presetsImported: 0, message: "\u65E0\u6548\u7684JSON\u683C\u5F0F" };
    }
    const existingTools = overwrite ? {} : toolStorage.get(TOOL_STORAGE_KEYS.TOOLS) || {};
    const existingPresets = overwrite ? {} : toolStorage.get(TOOL_STORAGE_KEYS.PRESETS) || {};
    let toolsCount = 0;
    let presetsCount = 0;
    if (imported.tools && typeof imported.tools === "object") {
      for (const [id, tool] of Object.entries(imported.tools)) {
        if (DEFAULT_TOOL_PRESETS[id] && !overwrite)
          continue;
        if (tool && typeof tool === "object") {
          existingTools[id] = tool;
          toolsCount++;
        }
      }
      toolStorage.set(TOOL_STORAGE_KEYS.TOOLS, existingTools);
    }
    if (imported.presets && typeof imported.presets === "object") {
      for (const [id, preset] of Object.entries(imported.presets)) {
        if (DEFAULT_TOOL_PRESETS[id] && !overwrite)
          continue;
        if (preset && typeof preset === "object") {
          existingPresets[id] = preset;
          presetsCount++;
        }
      }
      toolStorage.set(TOOL_STORAGE_KEYS.PRESETS, existingPresets);
    }
    return {
      success: true,
      toolsImported: toolsCount,
      presetsImported: presetsCount,
      message: `\u6210\u529F\u5BFC\u5165 ${toolsCount} \u4E2A\u5DE5\u5177\u548C ${presetsCount} \u4E2A\u9884\u8BBE`
    };
  } catch (e) {
    return { success: false, toolsImported: 0, presetsImported: 0, message: `\u5BFC\u5165\u5931\u8D25: ${e.message}` };
  }
}
function resetTools() {
  toolStorage.remove(TOOL_STORAGE_KEYS.TOOLS);
  toolStorage.remove(TOOL_STORAGE_KEYS.PRESETS);
  toolStorage.remove(TOOL_STORAGE_KEYS.CURRENT_PRESET);
}
function validateTool(toolDef) {
  const errors = [];
  if (!toolDef) {
    return { valid: false, errors: ["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"] };
  }
  if (!toolDef.name || typeof toolDef.name !== "string") {
    errors.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548");
  }
  if (!toolDef.category || typeof toolDef.category !== "string") {
    errors.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548");
  }
  if (toolDef.config) {
    const { trigger, execution, api, context } = toolDef.config;
    if (trigger && !["manual", "event", "scheduled"].includes(trigger.type)) {
      errors.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548");
    }
    if (execution) {
      if (typeof execution.timeout !== "number" || execution.timeout < 0) {
        errors.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570");
      }
      if (typeof execution.retries !== "number" || execution.retries < 0) {
        errors.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570");
      }
    }
    if (context && typeof context.depth !== "number") {
      errors.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57");
    }
  }
  return {
    valid: errors.length === 0,
    errors
  };
}
var DEFAULT_TOOL_STRUCTURE, DEFAULT_TOOL_PRESETS, TOOL_STORAGE_KEYS;
var init_tool_manager = __esm({
  "modules/tool-manager.js"() {
    init_storage_service();
    init_event_bus();
    DEFAULT_TOOL_STRUCTURE = {
      id: "",
      name: "",
      description: "",
      category: "utility",
      config: {
        trigger: {
          type: "manual",
          events: []
        },
        execution: {
          timeout: 6e4,
          retries: 3
        },
        api: {
          preset: "",
          useBypass: true,
          bypassPreset: "standard"
        },
        messages: [],
        context: {
          depth: 3,
          includeTags: [],
          excludeTags: []
        }
      },
      enabled: true,
      metadata: {
        createdAt: null,
        updatedAt: null,
        author: "",
        version: "1.0.0"
      }
    };
    DEFAULT_TOOL_PRESETS = {};
    TOOL_STORAGE_KEYS = {
      TOOLS: "tools",
      PRESETS: "tool_presets",
      CURRENT_PRESET: "current_tool_preset"
    };
  }
});

// modules/ui/components/tool-manage-panel.js
var ToolManagePanel;
var init_tool_manage_panel = __esm({
  "modules/ui/components/tool-manage-panel.js"() {
    init_event_bus();
    init_utils();
    init_tool_manager();
    ToolManagePanel = {
      id: "toolManagePanel",
      // ============================================================
      // 渲染
      // ============================================================
      /**
       * 渲染组件
       * @param {Object} props
       * @returns {string} HTML
       */
      render(props) {
        const tools = getAllTools();
        return `
      <div class="yyt-tool-manager">
        <!-- \u5DE5\u5177\u5217\u8868 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-tools"></i>
            <span>\u5DE5\u5177\u5217\u8868</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-add-tool" style="margin-left: auto;">
              <i class="fa-solid fa-plus"></i> \u65B0\u5EFA\u5DE5\u5177
            </button>
          </div>
          <div class="yyt-tool-list">
            ${this._renderToolList(tools)}
          </div>
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-import-tools">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="yyt-export-tools">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="yyt-import-tools-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-reset-tools">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
      </div>
    `;
      },
      // ============================================================
      // 私有渲染方法
      // ============================================================
      /**
       * 渲染工具列表
       * @private
       */
      _renderToolList(tools) {
        return Object.entries(tools).map(([id, tool]) => `
      <div class="yyt-tool-item ${tool.enabled ? "yyt-enabled" : "yyt-disabled"}" data-tool-id="${id}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${escapeHtml(tool.name)}</span>
            <span class="yyt-tool-category">${escapeHtml(tool.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${tool.enabled ? "checked" : ""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${escapeHtml(tool.description)}</div>
      </div>
    `).join("");
      },
      // ============================================================
      // 事件绑定
      // ============================================================
      /**
       * 绑定事件
       * @param {Object} $container
       * @param {Object} dependencies
       */
      bindEvents($container2, dependencies) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        this._bindToolEvents($container2, $);
        this._bindFileEvents($container2, $);
      },
      /**
       * 绑定工具事件
       * @private
       */
      _bindToolEvents($container2, $) {
        $container2.find(".yyt-tool-toggle input").on("change", (e) => {
          const $item = $(e.currentTarget).closest(".yyt-tool-item");
          const toolId = $item.data("tool-id");
          const enabled = $(e.currentTarget).is(":checked");
          setToolEnabled(toolId, enabled);
          $item.toggleClass("yyt-enabled", enabled).toggleClass("yyt-disabled", !enabled);
          showToast("info", enabled ? "\u5DE5\u5177\u5DF2\u542F\u7528" : "\u5DE5\u5177\u5DF2\u7981\u7528");
          eventBus.emit(enabled ? EVENTS.TOOL_ENABLED : EVENTS.TOOL_DISABLED, { toolId });
        });
        $container2.find("#yyt-add-tool").on("click", () => {
          this._showToolEditDialog($container2, $, null);
        });
      },
      /**
       * 绑定文件事件
       * @private
       */
      _bindFileEvents($container2, $) {
        $container2.find("#yyt-import-tools").on("click", () => {
          $container2.find("#yyt-import-tools-file").click();
        });
        $container2.find("#yyt-import-tools-file").on("change", async (e) => {
          const file = e.target.files[0];
          if (!file)
            return;
          try {
            const text = await readFileContent(file);
            const result = importTools(text, { overwrite: false });
            showToast(result.success ? "success" : "error", result.message);
            if (result.success)
              this.renderTo($container2);
          } catch (e2) {
            showToast("error", `\u5BFC\u5165\u5931\u8D25: ${e2.message}`);
          }
          $(e.target).val("");
        });
        $container2.find("#yyt-export-tools").on("click", () => {
          try {
            const json = exportTools();
            downloadJson(json, `youyou_toolkit_tools_${Date.now()}.json`);
            showToast("success", "\u5DE5\u5177\u5DF2\u5BFC\u51FA");
          } catch (e) {
            showToast("error", `\u5BFC\u51FA\u5931\u8D25: ${e.message}`);
          }
        });
        $container2.find("#yyt-reset-tools").on("click", () => {
          if (confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")) {
            resetTools();
            this.renderTo($container2);
            showToast("info", "\u5DE5\u5177\u5DF2\u91CD\u7F6E");
          }
        });
      },
      // ============================================================
      // 对话框
      // ============================================================
      /**
       * 显示工具编辑对话框
       * @private
       */
      _showToolEditDialog($container2, $, toolId) {
        const tool = toolId ? getTool(toolId) : null;
        const isEdit = !!tool;
        const dialogHtml = `
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${isEdit ? "\u7F16\u8F91\u5DE5\u5177" : "\u65B0\u5EFA\u5DE5\u5177"}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5DE5\u5177\u540D\u79F0</label>
                <input type="text" class="yyt-input" id="yyt-tool-name" 
                       value="${tool ? escapeHtml(tool.name) : ""}" placeholder="\u5DE5\u5177\u540D\u79F0">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5206\u7C7B</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${tool?.category === "api" ? "selected" : ""}>API</option>
                  <option value="prompt" ${tool?.category === "prompt" ? "selected" : ""}>Prompt</option>
                  <option value="utility" ${tool?.category === "utility" ? "selected" : ""}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc" 
                     value="${tool ? escapeHtml(tool.description || "") : ""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u8D85\u65F6\u65F6\u95F4(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout" 
                       value="${tool?.config?.execution?.timeout || 6e4}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u91CD\u8BD5\u6B21\u6570</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries" 
                       value="${tool?.config?.execution?.retries || 3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;
        $("#yyt-tool-dialog-overlay").remove();
        $container2.append(dialogHtml);
        const $overlay = $("#yyt-tool-dialog-overlay");
        const closeDialog = () => $overlay.remove();
        $overlay.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click", closeDialog);
        $overlay.on("click", function(e) {
          if (e.target === this)
            closeDialog();
        });
        $overlay.find("#yyt-tool-dialog-save").on("click", () => {
          const name = $("#yyt-tool-name").val().trim();
          const category = $("#yyt-tool-category").val();
          const desc = $("#yyt-tool-desc").val().trim();
          const timeout = parseInt($("#yyt-tool-timeout").val()) || 6e4;
          const retries = parseInt($("#yyt-tool-retries").val()) || 3;
          if (!name) {
            showToast("warning", "\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");
            return;
          }
          const id = toolId || `tool_${Date.now()}`;
          saveTool(id, {
            name,
            category,
            description: desc,
            config: {
              trigger: { type: "manual", events: [] },
              execution: { timeout, retries },
              api: { preset: "" },
              messages: [],
              context: { depth: 3, includeTags: [], excludeTags: [] }
            },
            enabled: true
          });
          closeDialog();
          this.renderTo($container2);
          showToast("success", isEdit ? "\u5DE5\u5177\u5DF2\u66F4\u65B0" : "\u5DE5\u5177\u5DF2\u521B\u5EFA");
          eventBus.emit(isEdit ? EVENTS.TOOL_UPDATED : EVENTS.TOOL_REGISTERED, { toolId: id });
        });
      },
      // ============================================================
      // 销毁
      // ============================================================
      /**
       * 销毁组件
       * @param {Object} $container
       */
      destroy($container2) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find("*").off();
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
      /* \u5DE5\u5177\u7BA1\u7406\u9762\u677F\u6837\u5F0F */
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
      
      .yyt-dialog-wide {
        width: 480px;
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
      renderTo($container2) {
        const html = this.render({});
        $container2.html(html);
        this.bindEvents($container2, {});
      }
    };
  }
});

// modules/tool-registry.js
var tool_registry_exports = {};
__export(tool_registry_exports, {
  TOOL_CATEGORIES: () => TOOL_CATEGORIES,
  TOOL_REGISTRY: () => TOOL_REGISTRY,
  clearToolApiPreset: () => clearToolApiPreset,
  default: () => tool_registry_default,
  getAllDefaultToolConfigs: () => getAllDefaultToolConfigs,
  getAllToolApiBindings: () => getAllToolApiBindings,
  getAllToolFullConfigs: () => getAllToolFullConfigs,
  getEnabledTools: () => getEnabledTools,
  getToolApiPreset: () => getToolApiPreset,
  getToolConfig: () => getToolConfig,
  getToolFullConfig: () => getToolFullConfig,
  getToolList: () => getToolList,
  getToolSubTabs: () => getToolSubTabs,
  getToolWindowState: () => getToolWindowState,
  hasTool: () => hasTool,
  onPresetDeleted: () => onPresetDeleted,
  registerTool: () => registerTool,
  resetToolConfig: () => resetToolConfig,
  resetToolRegistry: () => resetToolRegistry,
  saveToolConfig: () => saveToolConfig,
  saveToolWindowState: () => saveToolWindowState,
  setToolApiPreset: () => setToolApiPreset,
  setToolApiPresetConfig: () => setToolApiPresetConfig,
  setToolBypassConfig: () => setToolBypassConfig,
  setToolOutputMode: () => setToolOutputMode,
  setToolPromptTemplate: () => setToolPromptTemplate,
  unregisterTool: () => unregisterTool,
  updateToolRuntime: () => updateToolRuntime
});
function registerTool(id, toolConfig) {
  if (!id || typeof id !== "string") {
    console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548");
    return false;
  }
  if (!toolConfig || typeof toolConfig !== "object") {
    console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548");
    return false;
  }
  const requiredFields = ["name", "icon", "component"];
  for (const field of requiredFields) {
    if (!toolConfig[field]) {
      console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${field}`);
      return false;
    }
  }
  registeredTools[id] = {
    id,
    ...toolConfig,
    order: toolConfig.order ?? Object.keys(registeredTools).length
  };
  console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${id}`);
  return true;
}
function unregisterTool(id) {
  if (!registeredTools[id]) {
    console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${id}`);
    return false;
  }
  delete registeredTools[id];
  console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${id}`);
  return true;
}
function getToolList(sorted = true) {
  const tools = Object.values(registeredTools);
  if (sorted) {
    return tools.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  return tools;
}
function getToolConfig(id) {
  return registeredTools[id] || null;
}
function hasTool(id) {
  return !!registeredTools[id];
}
function getToolSubTabs(toolId) {
  const tool = registeredTools[toolId];
  if (!tool || !tool.hasSubTabs) {
    return [];
  }
  return tool.subTabs || [];
}
function resetToolRegistry() {
  registeredTools = { ...TOOL_REGISTRY };
  console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E");
}
function setToolApiPreset(toolId, presetName) {
  if (!hasTool(toolId)) {
    console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${toolId}`);
    return false;
  }
  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  bindings[toolId] = presetName || "";
  storage.set(TOOL_API_PRESET_BINDING_KEY, bindings);
  console.log(`[ToolRegistry] \u5DE5\u5177 "${toolId}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${presetName || "\u5F53\u524D\u914D\u7F6E"}"`);
  return true;
}
function getToolApiPreset(toolId) {
  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  return bindings[toolId] || "";
}
function clearToolApiPreset(toolId) {
  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  delete bindings[toolId];
  storage.set(TOOL_API_PRESET_BINDING_KEY, bindings);
  console.log(`[ToolRegistry] \u5DE5\u5177 "${toolId}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`);
}
function getAllToolApiBindings() {
  return storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
}
function onPresetDeleted(presetName) {
  const bindings = storage.get(TOOL_API_PRESET_BINDING_KEY) || {};
  let changed = false;
  for (const toolId in bindings) {
    if (bindings[toolId] === presetName) {
      bindings[toolId] = "";
      changed = true;
      console.log(`[ToolRegistry] \u5DE5\u5177 "${toolId}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`);
    }
  }
  if (changed) {
    storage.set(TOOL_API_PRESET_BINDING_KEY, bindings);
  }
}
function getToolFullConfig(toolId) {
  const defaultConfig = DEFAULT_TOOL_CONFIGS[toolId];
  if (!defaultConfig) {
    const basicConfig = getToolConfig(toolId);
    return basicConfig;
  }
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  const userConfig = userConfigs[toolId] || {};
  return {
    ...defaultConfig,
    ...userConfig,
    id: toolId
    // ID不可覆盖
  };
}
function saveToolConfig(toolId, config) {
  if (!toolId || !DEFAULT_TOOL_CONFIGS[toolId]) {
    console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:", toolId);
    return false;
  }
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  const saveableFields = [
    "promptTemplate",
    // 单提示词模板
    "enabled",
    // 启用状态
    "extractTags",
    // 提取标签（兼容）
    // 新结构
    "trigger",
    // 触发配置
    "output",
    // 输出配置（包含 mode, apiPreset, overwrite）
    "bypass",
    // 破限词配置
    "runtime"
    // 运行时状态
  ];
  userConfigs[toolId] = {};
  saveableFields.forEach((field) => {
    if (config[field] !== void 0) {
      userConfigs[toolId][field] = config[field];
    }
  });
  storage.set(TOOL_CONFIG_STORAGE_KEY, userConfigs);
  eventBus.emit(EVENTS.TOOL_UPDATED, { toolId, config: userConfigs[toolId] });
  console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${toolId}`);
  return true;
}
function setToolOutputMode(toolId, mode) {
  const config = getToolFullConfig(toolId);
  if (!config)
    return false;
  return saveToolConfig(toolId, {
    ...config,
    output: {
      ...config.output,
      mode
    }
  });
}
function setToolApiPresetConfig(toolId, presetName) {
  const config = getToolFullConfig(toolId);
  if (!config)
    return false;
  return saveToolConfig(toolId, {
    ...config,
    output: {
      ...config.output,
      apiPreset: presetName
    }
  });
}
function setToolBypassConfig(toolId, bypassConfig) {
  const config = getToolFullConfig(toolId);
  if (!config)
    return false;
  return saveToolConfig(toolId, {
    ...config,
    bypass: {
      ...config.bypass,
      ...bypassConfig
    }
  });
}
function setToolPromptTemplate(toolId, template) {
  const config = getToolFullConfig(toolId);
  if (!config)
    return false;
  return saveToolConfig(toolId, {
    ...config,
    promptTemplate: template
  });
}
function updateToolRuntime(toolId, runtimePartial) {
  const config = getToolFullConfig(toolId);
  if (!config)
    return false;
  return saveToolConfig(toolId, {
    ...config,
    runtime: {
      ...config.runtime,
      ...runtimePartial,
      lastRunAt: Date.now()
    }
  });
}
function resetToolConfig(toolId) {
  if (!toolId || !DEFAULT_TOOL_CONFIGS[toolId]) {
    console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:", toolId);
    return false;
  }
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  delete userConfigs[toolId];
  storage.set(TOOL_CONFIG_STORAGE_KEY, userConfigs);
  eventBus.emit(EVENTS.TOOL_UPDATED, { toolId, config: null });
  console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${toolId}`);
  return true;
}
function getAllDefaultToolConfigs() {
  return { ...DEFAULT_TOOL_CONFIGS };
}
function getAllToolFullConfigs() {
  return Object.keys(DEFAULT_TOOL_CONFIGS).map((toolId) => getToolFullConfig(toolId));
}
function getEnabledTools() {
  return getAllToolFullConfigs().filter((config) => config && config.enabled);
}
function saveToolWindowState(toolId, state) {
  const states = storage.get(TOOL_WINDOW_STATE_KEY) || {};
  states[toolId] = {
    ...state,
    updatedAt: Date.now()
  };
  storage.set(TOOL_WINDOW_STATE_KEY, states);
}
function getToolWindowState(toolId) {
  const states = storage.get(TOOL_WINDOW_STATE_KEY) || {};
  return states[toolId] || null;
}
var TOOL_CONFIG_STORAGE_KEY, TOOL_API_PRESET_BINDING_KEY, TOOL_WINDOW_STATE_KEY, DEFAULT_TOOL_CONFIGS, TOOL_REGISTRY, TOOL_CATEGORIES, registeredTools, tool_registry_default;
var init_tool_registry = __esm({
  "modules/tool-registry.js"() {
    init_storage_service();
    init_event_bus();
    TOOL_CONFIG_STORAGE_KEY = "tool_configs";
    TOOL_API_PRESET_BINDING_KEY = "tool_api_bindings";
    TOOL_WINDOW_STATE_KEY = "tool_window_states";
    DEFAULT_TOOL_CONFIGS = {
      summaryTool: {
        id: "summaryTool",
        name: "\u6458\u8981\u5DE5\u5177",
        icon: "fa-file-lines",
        description: "\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",
        enabled: true,
        order: 3,
        // 触发配置
        trigger: {
          event: "GENERATION_ENDED",
          enabled: true
        },
        // 破限词绑定
        bypass: {
          enabled: false,
          presetId: ""
        },
        // 输出模式配置
        output: {
          mode: "follow_ai",
          // follow_ai | post_response_api
          apiPreset: "",
          overwrite: true,
          enabled: true
        },
        // 提示词模板（单文本）
        promptTemplate: `\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<boo_FM>
<pg>\u9875\u7801</pg>
<time>\u65F6\u95F4</time>
<scene>\u573A\u666F</scene>
<plot>\u5267\u60C5\u6982\u8981</plot>
<event>\u4E8B\u4EF6\u63CF\u8FF0</event>
<defined>\u5DF2\u5B9A\u4E49\u5143\u7D20</defined>
<status>\u72B6\u6001</status>
<seeds>\u4F0F\u7B14</seeds>
</boo_FM>`,
        // 运行时状态
        runtime: {
          lastRunAt: 0,
          lastStatus: "idle",
          lastError: "",
          lastDurationMs: 0,
          successCount: 0,
          errorCount: 0
        },
        // 兼容字段
        apiPreset: "",
        extractTags: ["boo_FM"]
      },
      statusBlock: {
        id: "statusBlock",
        name: "\u4E3B\u89D2\u72B6\u6001\u680F",
        icon: "fa-user-check",
        description: "\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",
        enabled: true,
        order: 4,
        // 触发配置
        trigger: {
          event: "GENERATION_ENDED",
          enabled: true
        },
        // 破限词绑定
        bypass: {
          enabled: false,
          presetId: ""
        },
        // 输出模式配置
        output: {
          mode: "follow_ai",
          apiPreset: "",
          overwrite: true,
          enabled: true
        },
        // 提示词模板（单文本）
        promptTemplate: `\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,
        // 运行时状态
        runtime: {
          lastRunAt: 0,
          lastStatus: "idle",
          lastError: "",
          lastDurationMs: 0,
          successCount: 0,
          errorCount: 0
        },
        // 兼容字段
        apiPreset: "",
        extractTags: ["status_block"]
      }
    };
    TOOL_REGISTRY = {
      apiPresets: {
        id: "apiPresets",
        name: "API\u9884\u8BBE",
        icon: "fa-database",
        hasSubTabs: false,
        description: "\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",
        component: "ApiPresetPanel",
        order: 0
      },
      regexExtract: {
        id: "regexExtract",
        name: "\u6B63\u5219\u63D0\u53D6",
        icon: "fa-filter",
        hasSubTabs: false,
        description: "\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",
        component: "RegexExtractPanel",
        order: 2,
        defaultConfig: {
          trigger: { type: "manual", events: [] },
          execution: { timeout: 3e4, retries: 1 },
          api: { preset: "" },
          extractRules: [],
          excludeRules: []
        }
      },
      tools: {
        id: "tools",
        name: "\u5DE5\u5177",
        icon: "fa-tools",
        hasSubTabs: true,
        description: "\u5DE5\u5177\u96C6\u5408",
        order: 3,
        subTabs: [
          { id: "summaryTool", name: "\u6458\u8981\u5DE5\u5177", icon: "fa-file-lines", component: "SummaryToolPanel" },
          { id: "statusBlock", name: "\u4E3B\u89D2\u72B6\u6001\u680F", icon: "fa-user-check", component: "StatusBlockPanel" }
        ]
      },
      // v0.5 新增页面
      bypass: {
        id: "bypass",
        name: "\u7834\u9650\u8BCD",
        icon: "fa-shield-halved",
        hasSubTabs: false,
        description: "\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",
        component: "BypassPanel",
        order: 4
      },
      settings: {
        id: "settings",
        name: "\u8BBE\u7F6E",
        icon: "fa-cog",
        hasSubTabs: false,
        description: "\u5168\u5C40\u8BBE\u7F6E",
        component: "SettingsPanel",
        order: 5
      }
    };
    TOOL_CATEGORIES = {
      api: {
        name: "API\u5DE5\u5177",
        icon: "fa-plug",
        order: 0
      },
      prompt: {
        name: "\u63D0\u793A\u8BCD\u5DE5\u5177",
        icon: "fa-file-alt",
        order: 1
      },
      utility: {
        name: "\u5B9E\u7528\u5DE5\u5177",
        icon: "fa-wrench",
        order: 2
      }
    };
    registeredTools = { ...TOOL_REGISTRY };
    tool_registry_default = {
      TOOL_REGISTRY,
      TOOL_CATEGORIES,
      registerTool,
      unregisterTool,
      getToolList,
      getToolConfig,
      hasTool,
      getToolSubTabs,
      resetToolRegistry,
      setToolApiPreset,
      getToolApiPreset,
      clearToolApiPreset,
      getAllToolApiBindings,
      onPresetDeleted,
      saveToolWindowState,
      getToolWindowState,
      // 新增配置管理函数
      getToolFullConfig,
      saveToolConfig,
      resetToolConfig,
      getAllDefaultToolConfigs,
      getAllToolFullConfigs,
      getEnabledTools
    };
  }
});

// modules/bypass-manager.js
var bypass_manager_exports = {};
__export(bypass_manager_exports, {
  BypassManager: () => BypassManager,
  DEFAULT_BYPASS_PRESETS: () => DEFAULT_BYPASS_PRESETS,
  addMessage: () => addMessage,
  buildBypassMessages: () => buildBypassMessages,
  bypassManager: () => bypassManager,
  createPreset: () => createPreset2,
  default: () => bypass_manager_default,
  deleteMessage: () => deleteMessage,
  deletePreset: () => deletePreset2,
  duplicatePreset: () => duplicatePreset2,
  exportPresets: () => exportPresets2,
  getAllPresets: () => getAllPresets2,
  getDefaultPresetId: () => getDefaultPresetId,
  getEnabledMessages: () => getEnabledMessages,
  getPreset: () => getPreset2,
  getPresetList: () => getPresetList,
  importPresets: () => importPresets2,
  setDefaultPresetId: () => setDefaultPresetId,
  updateMessage: () => updateMessage,
  updatePreset: () => updatePreset2
});
var BYPASS_PRESETS_KEY, DEFAULT_BYPASS_KEY, LEGACY_DEFAULT_BYPASS_KEY, DEFAULT_BYPASS_PRESETS, LEGACY_SAMPLE_PRESET_NAMES, BypassManager, bypassManager, getAllPresets2, getPresetList, getPreset2, createPreset2, updatePreset2, deletePreset2, duplicatePreset2, getDefaultPresetId, setDefaultPresetId, getEnabledMessages, addMessage, updateMessage, deleteMessage, exportPresets2, importPresets2, buildBypassMessages, bypass_manager_default;
var init_bypass_manager = __esm({
  "modules/bypass-manager.js"() {
    init_storage_service();
    init_event_bus();
    BYPASS_PRESETS_KEY = "bypass_presets";
    DEFAULT_BYPASS_KEY = "default_bypass_preset";
    LEGACY_DEFAULT_BYPASS_KEY = "current_bypass_preset";
    DEFAULT_BYPASS_PRESETS = {};
    LEGACY_SAMPLE_PRESET_NAMES = /* @__PURE__ */ new Set([
      "\u6807\u51C6\u7834\u9650\u8BCD",
      "\u589E\u5F3A\u7834\u9650"
    ]);
    BypassManager = class {
      constructor() {
        this._cache = null;
        this._migrated = false;
        this.debugMode = false;
      }
      // ============================================================
      // 预设管理
      // ============================================================
      /**
       * 获取所有破限词预设
       * @returns {Object} 预设对象 { id: preset }
       */
      getAllPresets() {
        this._migrateLegacyData();
        if (this._cache) {
          return this._cache;
        }
        const saved = storage.get(BYPASS_PRESETS_KEY, {});
        this._cache = { ...DEFAULT_BYPASS_PRESETS, ...saved };
        return this._cache;
      }
      /**
       * 获取预设列表（数组形式）
       * @returns {Array} 预设列表
       */
      getPresetList() {
        const presets = this.getAllPresets();
        return Object.values(presets).sort(
          (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
        );
      }
      /**
       * 获取单个预设
       * @param {string} presetId - 预设ID
       * @returns {Object|null} 预设对象
       */
      getPreset(presetId) {
        if (!presetId)
          return null;
        const presets = this.getAllPresets();
        return presets[presetId] || null;
      }
      /**
       * 检查预设是否存在
       * @param {string} presetId - 预设ID
       * @returns {boolean}
       */
      presetExists(presetId) {
        return !!this.getPreset(presetId);
      }
      /**
       * 创建新预设
       * @param {Object} presetData - 预设数据
       * @returns {Object} { success: boolean, message: string, preset?: Object }
       */
      createPreset(presetData) {
        const { id, name, description, messages } = presetData;
        if (!id || typeof id !== "string" || !id.trim()) {
          return { success: false, message: "\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A" };
        }
        if (!name || typeof name !== "string" || !name.trim()) {
          return { success: false, message: "\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" };
        }
        const trimmedId = id.trim();
        if (this.presetExists(trimmedId)) {
          return { success: false, message: `\u9884\u8BBE "${trimmedId}" \u5DF2\u5B58\u5728` };
        }
        const preset = {
          id: trimmedId,
          name: name.trim(),
          description: description || "",
          enabled: true,
          messages: messages || [],
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
        this._savePreset(trimmedId, preset);
        eventBus.emit(EVENTS.BYPASS_PRESET_CREATED, { presetId: trimmedId, preset });
        this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${trimmedId}`);
        return { success: true, message: `\u9884\u8BBE "${name}" \u521B\u5EFA\u6210\u529F`, preset };
      }
      /**
       * 更新预设
       * @param {string} presetId - 预设ID
       * @param {Object} updates - 更新内容
       * @returns {Object} { success: boolean, message: string, preset?: Object }
       */
      updatePreset(presetId, updates) {
        if (!presetId) {
          return { success: false, message: "\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A" };
        }
        const preset = this.getPreset(presetId);
        if (!preset) {
          return { success: false, message: `\u9884\u8BBE "${presetId}" \u4E0D\u5B58\u5728` };
        }
        if (updates.id && updates.id !== presetId) {
          return { success: false, message: "\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID" };
        }
        const updatedPreset = {
          ...preset,
          ...updates,
          id: presetId,
          // 保持原ID
          updatedAt: Date.now()
        };
        this._savePreset(presetId, updatedPreset);
        eventBus.emit(EVENTS.BYPASS_PRESET_UPDATED, { presetId, preset: updatedPreset });
        this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${presetId}`);
        return { success: true, message: `\u9884\u8BBE "${preset.name}" \u66F4\u65B0\u6210\u529F`, preset: updatedPreset };
      }
      /**
       * 删除预设
       * @param {string} presetId - 预设ID
       * @returns {Object} { success: boolean, message: string }
       */
      deletePreset(presetId) {
        if (!presetId) {
          return { success: false, message: "\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A" };
        }
        if (DEFAULT_BYPASS_PRESETS[presetId]) {
          return { success: false, message: "\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE" };
        }
        const preset = this.getPreset(presetId);
        if (!preset) {
          return { success: false, message: `\u9884\u8BBE "${presetId}" \u4E0D\u5B58\u5728` };
        }
        const saved = storage.get(BYPASS_PRESETS_KEY, {});
        delete saved[presetId];
        storage.set(BYPASS_PRESETS_KEY, saved);
        this._cache = null;
        if (this.getDefaultPresetId() === presetId) {
          this.setDefaultPresetId(null);
        }
        eventBus.emit(EVENTS.BYPASS_PRESET_DELETED, { presetId });
        this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${presetId}`);
        return { success: true, message: `\u9884\u8BBE "${preset.name}" \u5DF2\u5220\u9664` };
      }
      /**
       * 复制预设
       * @param {string} sourceId - 源预设ID
       * @param {string} newId - 新预设ID
       * @param {string} newName - 新预设名称
       * @returns {Object} { success: boolean, message: string, preset?: Object }
       */
      duplicatePreset(sourceId, newId, newName) {
        const source = this.getPreset(sourceId);
        if (!source) {
          return { success: false, message: `\u6E90\u9884\u8BBE "${sourceId}" \u4E0D\u5B58\u5728` };
        }
        if (!newId || !newId.trim()) {
          newId = `${sourceId}_copy_${Date.now()}`;
        }
        if (this.presetExists(newId)) {
          return { success: false, message: `\u9884\u8BBE "${newId}" \u5DF2\u5B58\u5728` };
        }
        const newPreset = {
          ...JSON.parse(JSON.stringify(source)),
          id: newId.trim(),
          name: newName || `${source.name} (\u526F\u672C)`,
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
        this._savePreset(newId.trim(), newPreset);
        eventBus.emit(EVENTS.BYPASS_PRESET_CREATED, { presetId: newId, preset: newPreset });
        return { success: true, message: `\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${newPreset.name}"`, preset: newPreset };
      }
      // ============================================================
      // 消息管理
      // ============================================================
      /**
       * 添加消息到预设
       * @param {string} presetId - 预设ID
       * @param {Object} message - 消息对象 { role, content, enabled }
       * @returns {Object} { success: boolean, message: string }
       */
      addMessage(presetId, message) {
        const preset = this.getPreset(presetId);
        if (!preset) {
          return { success: false, message: `\u9884\u8BBE "${presetId}" \u4E0D\u5B58\u5728` };
        }
        const newMessage = {
          id: `msg_${Date.now()}`,
          role: message.role || "SYSTEM",
          content: message.content || "",
          enabled: message.enabled !== false,
          deletable: message.deletable !== false
        };
        const updatedMessages = [...preset.messages || [], newMessage];
        return this.updatePreset(presetId, { messages: updatedMessages });
      }
      /**
       * 更新预设中的消息
       * @param {string} presetId - 预设ID
       * @param {string} messageId - 消息ID
       * @param {Object} updates - 更新内容
       * @returns {Object} { success: boolean, message: string }
       */
      updateMessage(presetId, messageId, updates) {
        const preset = this.getPreset(presetId);
        if (!preset) {
          return { success: false, message: `\u9884\u8BBE "${presetId}" \u4E0D\u5B58\u5728` };
        }
        const messages = preset.messages || [];
        const messageIndex = messages.findIndex((m) => m.id === messageId);
        if (messageIndex === -1) {
          return { success: false, message: `\u6D88\u606F "${messageId}" \u4E0D\u5B58\u5728` };
        }
        const updatedMessages = [...messages];
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          ...updates
        };
        return this.updatePreset(presetId, { messages: updatedMessages });
      }
      /**
       * 删除预设中的消息
       * @param {string} presetId - 预设ID
       * @param {string} messageId - 消息ID
       * @returns {Object} { success: boolean, message: string }
       */
      deleteMessage(presetId, messageId) {
        const preset = this.getPreset(presetId);
        if (!preset) {
          return { success: false, message: `\u9884\u8BBE "${presetId}" \u4E0D\u5B58\u5728` };
        }
        const messages = preset.messages || [];
        const message = messages.find((m) => m.id === messageId);
        if (!message) {
          return { success: false, message: `\u6D88\u606F "${messageId}" \u4E0D\u5B58\u5728` };
        }
        if (message.deletable === false) {
          return { success: false, message: "\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664" };
        }
        const updatedMessages = messages.filter((m) => m.id !== messageId);
        return this.updatePreset(presetId, { messages: updatedMessages });
      }
      /**
       * 获取预设的启用消息
       * @param {string} presetId - 预设ID
       * @returns {Array} 启用的消息数组
       */
      getEnabledMessages(presetId) {
        const preset = this.getPreset(presetId);
        if (!preset || !preset.enabled) {
          return [];
        }
        return (preset.messages || []).filter((msg) => msg.enabled !== false);
      }
      // ============================================================
      // 默认预设管理
      // ============================================================
      /**
       * 获取默认预设ID
       * @returns {string|null}
       */
      getDefaultPresetId() {
        this._migrateLegacyData();
        const presetId = storage.get(DEFAULT_BYPASS_KEY, null);
        if (presetId === "undefined" || presetId === "null" || presetId === "") {
          storage.remove(DEFAULT_BYPASS_KEY);
          return null;
        }
        return presetId;
      }
      /**
       * 设置默认预设
       * @param {string|null} presetId - 预设ID，null表示清除默认
       * @returns {boolean}
       */
      setDefaultPresetId(presetId) {
        if (presetId && !this.presetExists(presetId)) {
          return false;
        }
        storage.set(DEFAULT_BYPASS_KEY, presetId);
        eventBus.emit(EVENTS.BYPASS_PRESET_ACTIVATED, { presetId });
        this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${presetId}`);
        return true;
      }
      /**
       * 获取默认预设
       * @returns {Object|null}
       */
      getDefaultPreset() {
        const presetId = this.getDefaultPresetId();
        return presetId ? this.getPreset(presetId) : null;
      }
      // ============================================================
      // 导入导出
      // ============================================================
      /**
       * 导出预设
       * @param {string} presetId - 预设ID，不提供则导出所有
       * @returns {string} JSON字符串
       */
      exportPresets(presetId = null) {
        if (presetId) {
          const preset = this.getPreset(presetId);
          if (!preset) {
            throw new Error(`\u9884\u8BBE "${presetId}" \u4E0D\u5B58\u5728`);
          }
          return JSON.stringify(preset, null, 2);
        }
        const presets = this.getAllPresets();
        return JSON.stringify({
          version: "1.0.0",
          exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
          presets: Object.values(presets)
        }, null, 2);
      }
      /**
       * 导入预设
       * @param {string} jsonString - JSON字符串
       * @param {Object} options - 导入选项
       * @returns {Object} { success: boolean, message: string, imported: number }
       */
      importPresets(jsonString, options = {}) {
        const { overwrite = false } = options;
        let data;
        try {
          data = JSON.parse(jsonString);
        } catch (e) {
          return { success: false, message: "JSON\u89E3\u6790\u5931\u8D25", imported: 0 };
        }
        const presetsToImport = Array.isArray(data) ? data : data.presets ? data.presets : [data];
        if (presetsToImport.length === 0) {
          return { success: false, message: "\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E", imported: 0 };
        }
        const saved = storage.get(BYPASS_PRESETS_KEY, {});
        let imported = 0;
        for (const preset of presetsToImport) {
          if (!preset.id || typeof preset.id !== "string")
            continue;
          if (!preset.name)
            continue;
          if (DEFAULT_BYPASS_PRESETS[preset.id] && !overwrite)
            continue;
          if (!overwrite && saved[preset.id])
            continue;
          saved[preset.id] = {
            ...preset,
            updatedAt: Date.now()
          };
          imported++;
        }
        if (imported > 0) {
          storage.set(BYPASS_PRESETS_KEY, saved);
          this._cache = null;
        }
        return {
          success: true,
          message: `\u6210\u529F\u5BFC\u5165 ${imported} \u4E2A\u9884\u8BBE`,
          imported
        };
      }
      // ============================================================
      // 工具绑定辅助
      // ============================================================
      /**
       * 获取工具绑定的破限词预设
       * @param {Object} toolConfig - 工具配置
       * @returns {Object|null} 预设对象或null
       */
      getToolBypassPreset(toolConfig) {
        if (!toolConfig?.bypass?.enabled) {
          return null;
        }
        const presetId = toolConfig?.bypass?.presetId;
        if (!presetId) {
          return this.getDefaultPreset();
        }
        return this.getPreset(presetId);
      }
      /**
       * 构建工具的破限词消息
       * @param {Object} toolConfig - 工具配置
       * @returns {Array} 消息数组
       */
      buildBypassMessages(toolConfig) {
        const preset = this.getToolBypassPreset(toolConfig);
        if (!preset) {
          return [];
        }
        return this.getEnabledMessages(preset.id);
      }
      // ============================================================
      // 私有方法
      // ============================================================
      /**
       * 保存预设
       * @private
       */
      _savePreset(presetId, preset) {
        const saved = storage.get(BYPASS_PRESETS_KEY, {});
        saved[presetId] = preset;
        storage.set(BYPASS_PRESETS_KEY, saved);
        this._cache = null;
      }
      /**
       * 迁移旧版破限词存储数据
       * @private
       */
      _migrateLegacyData() {
        if (this._migrated) {
          return;
        }
        const rawSaved = storage.get(BYPASS_PRESETS_KEY, {});
        const normalizedPresets = {};
        let changed = false;
        const entries = Array.isArray(rawSaved) ? rawSaved.map((preset, index) => [preset?.id || preset?.name || `legacy_${index}`, preset]) : Object.entries(rawSaved || {});
        for (const [key, value] of entries) {
          const normalized = this._normalizePreset(key, value, normalizedPresets);
          if (!normalized) {
            changed = true;
            continue;
          }
          normalizedPresets[normalized.id] = normalized;
          if (!rawSaved?.[normalized.id] || rawSaved?.[normalized.id]?.id !== normalized.id) {
            changed = true;
          }
        }
        if (changed) {
          storage.set(BYPASS_PRESETS_KEY, normalizedPresets);
        }
        this._migrateDefaultPreset(normalizedPresets);
        this._cache = null;
        this._migrated = true;
      }
      /**
       * 规范化旧预设
       * @private
       */
      _normalizePreset(key, preset, existingPresets = {}) {
        if (!preset || typeof preset !== "object") {
          return null;
        }
        let name = typeof preset.name === "string" ? preset.name.trim() : "";
        let id = typeof preset.id === "string" ? preset.id.trim() : "";
        const normalizedKey = typeof key === "string" ? key.trim() : "";
        if (!name && normalizedKey && normalizedKey !== "undefined" && normalizedKey !== "null") {
          name = normalizedKey;
        }
        const shouldDropLegacySample = this._isLegacySamplePreset(name, id);
        if (shouldDropLegacySample) {
          return null;
        }
        if (!id && normalizedKey && normalizedKey !== "undefined" && normalizedKey !== "null") {
          id = normalizedKey;
        }
        if (!id && name && name !== "undefined" && name !== "null") {
          id = this._generatePresetId(name, existingPresets);
        }
        if (!name || !id || id === "undefined" || name === "undefined") {
          return null;
        }
        const messages = Array.isArray(preset.messages) ? preset.messages.filter((msg) => msg && typeof msg === "object").map((msg, index) => ({
          id: typeof msg.id === "string" && msg.id.trim() ? msg.id.trim() : `${id}_msg_${index + 1}`,
          role: msg.role || "SYSTEM",
          content: typeof msg.content === "string" ? msg.content : "",
          enabled: msg.enabled !== false,
          deletable: msg.deletable !== false
        })) : [];
        return {
          ...preset,
          id,
          name,
          description: typeof preset.description === "string" ? preset.description : "",
          enabled: preset.enabled !== false,
          messages,
          createdAt: preset.createdAt || Date.now(),
          updatedAt: preset.updatedAt || Date.now()
        };
      }
      /**
       * 迁移默认预设ID
       * @private
       */
      _migrateDefaultPreset(presets) {
        const defaultPresetId = storage.get(DEFAULT_BYPASS_KEY, null);
        const legacyDefaultPresetId = storage.get(LEGACY_DEFAULT_BYPASS_KEY, null);
        let effectiveId = defaultPresetId ?? legacyDefaultPresetId;
        if (effectiveId === "undefined" || effectiveId === "null" || effectiveId === "") {
          effectiveId = null;
        }
        if (effectiveId && !presets[effectiveId]) {
          const matchedPreset = Object.values(presets).find((preset) => preset.name === effectiveId);
          effectiveId = matchedPreset?.id || null;
        }
        if (effectiveId) {
          storage.set(DEFAULT_BYPASS_KEY, effectiveId);
        } else {
          storage.remove(DEFAULT_BYPASS_KEY);
        }
        if (storage.has(LEGACY_DEFAULT_BYPASS_KEY)) {
          storage.remove(LEGACY_DEFAULT_BYPASS_KEY);
        }
      }
      /**
       * 判断是否为旧版样例预设
       * @private
       */
      _isLegacySamplePreset(name, id = "") {
        if (!name) {
          return false;
        }
        if (id === "standard" || id === "enhanced" || id === "jailbreak") {
          return true;
        }
        if (LEGACY_SAMPLE_PRESET_NAMES.has(name)) {
          return true;
        }
        return /^增强破限（副本）(?:\s*\(\d+\))?$/.test(name);
      }
      /**
       * 生成预设ID
       * @private
       */
      _generatePresetId(name, existingPresets = {}) {
        const baseId = String(name).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "_").replace(/^_+|_+$/g, "") || `bypass_${Date.now()}`;
        let candidateId = baseId;
        let counter = 1;
        while (existingPresets[candidateId]) {
          candidateId = `${baseId}_${counter++}`;
        }
        return candidateId;
      }
      /**
       * 日志输出
       * @private
       */
      _log(...args) {
        if (this.debugMode) {
          console.log("[BypassManager]", ...args);
        }
      }
    };
    bypassManager = new BypassManager();
    getAllPresets2 = () => bypassManager.getAllPresets();
    getPresetList = () => bypassManager.getPresetList();
    getPreset2 = (presetId) => bypassManager.getPreset(presetId);
    createPreset2 = (presetData) => bypassManager.createPreset(presetData);
    updatePreset2 = (presetId, updates) => bypassManager.updatePreset(presetId, updates);
    deletePreset2 = (presetId) => bypassManager.deletePreset(presetId);
    duplicatePreset2 = (sourceId, newId, newName) => bypassManager.duplicatePreset(sourceId, newId, newName);
    getDefaultPresetId = () => bypassManager.getDefaultPresetId();
    setDefaultPresetId = (presetId) => bypassManager.setDefaultPresetId(presetId);
    getEnabledMessages = (presetId) => bypassManager.getEnabledMessages(presetId);
    addMessage = (presetId, message) => bypassManager.addMessage(presetId, message);
    updateMessage = (presetId, messageId, updates) => bypassManager.updateMessage(presetId, messageId, updates);
    deleteMessage = (presetId, messageId) => bypassManager.deleteMessage(presetId, messageId);
    exportPresets2 = (presetId) => bypassManager.exportPresets(presetId);
    importPresets2 = (jsonString, options) => bypassManager.importPresets(jsonString, options);
    buildBypassMessages = (toolConfig) => bypassManager.buildBypassMessages(toolConfig);
    bypass_manager_default = bypassManager;
  }
});

// modules/tool-executor.js
var tool_executor_exports = {};
__export(tool_executor_exports, {
  abortAllTasks: () => abortAllTasks,
  abortTask: () => abortTask,
  buildToolMessages: () => buildToolMessages,
  clearExecutionHistory: () => clearExecutionHistory,
  createExecutionContext: () => createExecutionContext,
  createResult: () => createResult,
  enhanceMessagesWithBypass: () => enhanceMessagesWithBypass,
  executeBatch: () => executeBatch,
  executeTool: () => executeTool,
  executeToolWithConfig: () => executeToolWithConfig,
  executeToolsBatch: () => executeToolsBatch,
  executorState: () => executorState,
  extractFailed: () => extractFailed,
  extractSuccessful: () => extractSuccessful,
  generateTaskId: () => generateTaskId,
  getExecutionHistory: () => getExecutionHistory,
  getExecutorStatus: () => getExecutorStatus,
  getScheduler: () => getScheduler,
  getToolsForEvent: () => getToolsForEvent,
  mergeResults: () => mergeResults,
  pauseExecutor: () => pauseExecutor,
  resumeExecutor: () => resumeExecutor,
  setMaxConcurrent: () => setMaxConcurrent
});
function createResult(taskId, toolId, success, data, error, duration, retries = 0) {
  return {
    success,
    taskId,
    toolId,
    data,
    error,
    duration,
    retries,
    timestamp: Date.now(),
    metadata: {}
  };
}
function generateTaskId() {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
function createTask(toolId, options = {}) {
  return {
    id: generateTaskId(),
    toolId,
    options,
    status: "pending",
    // pending, running, completed, failed, aborted
    createdAt: Date.now(),
    startedAt: null,
    completedAt: null,
    retries: 0,
    maxRetries: options.maxRetries || 3
  };
}
function getScheduler() {
  if (!schedulerInstance) {
    schedulerInstance = new TaskScheduler(executorState.maxConcurrent);
  }
  return schedulerInstance;
}
function setMaxConcurrent(max) {
  executorState.maxConcurrent = Math.max(1, Math.min(10, max));
  if (schedulerInstance) {
    schedulerInstance.maxConcurrent = executorState.maxConcurrent;
  }
}
async function executeTool(toolId, options = {}, executor) {
  const scheduler = getScheduler();
  const task = createTask(toolId, options);
  while (executorState.isPaused) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  try {
    const result = await scheduler.enqueue(async (signal) => {
      if (signal.aborted) {
        throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62", "AbortError");
      }
      if (typeof executor === "function") {
        return await executor(signal, options);
      }
      throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570");
    }, task);
    addToHistory(result);
    return result;
  } catch (error) {
    const result = createResult(
      task.id,
      toolId,
      false,
      null,
      error,
      Date.now() - task.createdAt,
      task.retries
    );
    addToHistory(result);
    return result;
  }
}
async function executeBatch(tasks, batchOptions = {}) {
  const { failFast = false, concurrency = executorState.maxConcurrent } = batchOptions;
  const results = [];
  const scheduler = getScheduler();
  const originalMax = scheduler.maxConcurrent;
  scheduler.maxConcurrent = concurrency;
  try {
    const promises = tasks.map(({ toolId, options, executor }) => {
      return executeTool(toolId, options, executor);
    });
    if (failFast) {
      for (const promise of promises) {
        const result = await promise;
        results.push(result);
        if (!result.success) {
          scheduler.abortAll();
          break;
        }
      }
    } else {
      const settled = await Promise.allSettled(promises);
      for (const item of settled) {
        if (item.status === "fulfilled") {
          results.push(item.value);
        } else {
          results.push(createResult(
            generateTaskId(),
            "unknown",
            false,
            null,
            item.reason,
            0,
            0
          ));
        }
      }
    }
  } finally {
    scheduler.maxConcurrent = originalMax;
  }
  return results;
}
function abortTask(taskId) {
  const scheduler = getScheduler();
  return scheduler.abort(taskId);
}
function abortAllTasks() {
  const scheduler = getScheduler();
  scheduler.abortAll();
  executorState.executionQueue = [];
}
function pauseExecutor() {
  executorState.isPaused = true;
}
function resumeExecutor() {
  executorState.isPaused = false;
}
function getExecutorStatus() {
  const scheduler = getScheduler();
  return {
    ...scheduler.getStatus(),
    isPaused: executorState.isPaused,
    activeControllers: executorState.activeControllers.size,
    historyCount: executorState.executionHistory.length
  };
}
function addToHistory(result) {
  executorState.executionHistory.push(result);
  if (executorState.executionHistory.length > 100) {
    executorState.executionHistory.shift();
  }
}
function getExecutionHistory(filter = {}) {
  let history = [...executorState.executionHistory];
  if (filter.toolId) {
    history = history.filter((r) => r.toolId === filter.toolId);
  }
  if (filter.success !== void 0) {
    history = history.filter((r) => r.success === filter.success);
  }
  if (filter.limit) {
    history = history.slice(-filter.limit);
  }
  return history;
}
function clearExecutionHistory() {
  executorState.executionHistory = [];
}
function mergeResults(results) {
  const merged = {
    success: true,
    data: [],
    errors: [],
    totalDuration: 0,
    successCount: 0,
    failureCount: 0
  };
  for (const result of results) {
    merged.totalDuration += result.duration;
    if (result.success) {
      merged.successCount++;
      if (result.data !== void 0 && result.data !== null) {
        merged.data.push(result.data);
      }
    } else {
      merged.success = false;
      merged.failureCount++;
      if (result.error) {
        merged.errors.push({
          taskId: result.taskId,
          toolId: result.toolId,
          error: result.error.message || String(result.error)
        });
      }
    }
  }
  return merged;
}
function extractSuccessful(results) {
  return results.filter((r) => r.success).map((r) => r.data);
}
function extractFailed(results) {
  return results.filter((r) => !r.success).map((r) => ({
    taskId: r.taskId,
    toolId: r.toolId,
    error: r.error
  }));
}
function createExecutionContext(options = {}) {
  return {
    taskId: generateTaskId(),
    startTime: Date.now(),
    signal: options.signal || null,
    apiConfig: options.apiConfig || null,
    bypassMessages: options.bypassMessages || [],
    context: options.context || {},
    metadata: options.metadata || {}
  };
}
function enhanceMessagesWithBypass(messages, bypassMessages) {
  if (!bypassMessages || bypassMessages.length === 0) {
    return messages;
  }
  return [...bypassMessages, ...messages];
}
function escapeRegex2(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function buildToolMessages(config, context) {
  const messages = [];
  let prompt2 = config.promptTemplate || "";
  const variables = {
    "{{userMessage}}": context.input?.userMessage || "",
    "{{lastAiMessage}}": context.input?.lastAiMessage || "",
    "{{extractedContent}}": context.input?.extractedContent || "",
    "{{previousToolOutput}}": context.input?.previousToolOutput || "",
    "{{context}}": JSON.stringify(context.input?.context || {}),
    // 摘要工具特定变量
    "{{pg}}": context.input?.context?.pg || "1",
    "{{time}}": context.input?.context?.time || "",
    "{{scene}}": context.input?.context?.scene || "",
    "{{plot}}": context.input?.context?.plot || "",
    "{{mq}}": context.input?.context?.mq || "\u2160",
    "{{mqStatus}}": context.input?.context?.mqStatus || "\u8FDB\u884C\u4E2D",
    "{{sq}}": context.input?.context?.sq || "1",
    "{{sqStatus}}": context.input?.context?.sqStatus || "\u8FDB\u884C\u4E2D",
    "{{latestSq}}": context.input?.context?.latestSq || "1",
    "{{completed}}": context.input?.context?.completed || "\u65E0",
    "{{defined}}": context.input?.context?.defined || "",
    "{{status}}": context.input?.context?.status || "",
    "{{seeds}}": context.input?.context?.seeds || "",
    // 状态栏特定变量
    "{{name}}": context.input?.context?.name || "",
    "{{location}}": context.input?.context?.location || "",
    "{{condition}}": context.input?.context?.condition || "",
    "{{equipment}}": context.input?.context?.equipment || "",
    "{{skills}}": context.input?.context?.skills || ""
  };
  for (const [key, value] of Object.entries(variables)) {
    prompt2 = prompt2.replace(new RegExp(escapeRegex2(key), "g"), value);
  }
  messages.push({
    role: "USER",
    content: prompt2
  });
  return messages;
}
async function executeToolWithConfig(toolId, context, options = {}) {
  const config = getToolFullConfig(toolId);
  if (!config) {
    return {
      success: false,
      taskId: generateTaskId(),
      toolId,
      error: "\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",
      duration: 0
    };
  }
  if (!config.enabled) {
    return {
      success: false,
      taskId: generateTaskId(),
      toolId,
      error: "\u5DE5\u5177\u672A\u542F\u7528",
      duration: 0
    };
  }
  const startTime = Date.now();
  const taskId = generateTaskId();
  try {
    eventBus.emit(EVENTS.TOOL_EXECUTION_STARTED, { toolId, taskId, context });
    const messages = buildToolMessages(config, context);
    if (typeof options.callApi === "function") {
      const apiConfig = config.apiPreset ? { preset: config.apiPreset } : null;
      const response = await options.callApi(messages, apiConfig, options.signal);
      let output = response;
      if (config.outputMode === "separate" && config.extractTags?.length > 0) {
        output = extractTagsFromResponse(response, config.extractTags);
      }
      const result = {
        success: true,
        taskId,
        toolId,
        data: output,
        duration: Date.now() - startTime
      };
      eventBus.emit(EVENTS.TOOL_EXECUTED, { toolId, taskId, result });
      return result;
    } else {
      return {
        success: true,
        taskId,
        toolId,
        data: {
          messages,
          config: {
            apiPreset: config.apiPreset,
            outputMode: config.outputMode,
            extractTags: config.extractTags
          }
        },
        duration: Date.now() - startTime,
        needsExecution: true
        // 标记需要外部执行
      };
    }
  } catch (error) {
    const result = {
      success: false,
      taskId,
      toolId,
      error: error.message || String(error),
      duration: Date.now() - startTime
    };
    eventBus.emit(EVENTS.TOOL_EXECUTION_FAILED, { toolId, taskId, error });
    return result;
  }
}
function extractTagsFromResponse(response, tags) {
  const result = {};
  for (const tag of tags) {
    const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
    const match = response.match(regex);
    if (match) {
      result[tag] = match.map((m) => {
        const contentMatch = m.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
        return contentMatch ? contentMatch[1].trim() : "";
      });
    }
  }
  return result;
}
async function executeToolsBatch(toolIds, context, options = {}) {
  const results = [];
  for (const toolId of toolIds) {
    const config = getToolFullConfig(toolId);
    if (config && config.enabled) {
      const result = await executeToolWithConfig(toolId, context, options);
      results.push(result);
    }
  }
  return results;
}
function getToolsForEvent(eventType) {
  const allConfigs = [];
  const toolIds = ["summaryTool", "statusBlock"];
  for (const toolId of toolIds) {
    const config = getToolFullConfig(toolId);
    const matchesNewTrigger = config?.trigger?.enabled && config?.trigger?.event === eventType;
    const matchesLegacyTrigger = Array.isArray(config?.triggerEvents) && config.triggerEvents.includes(eventType);
    if (config && config.enabled && (matchesNewTrigger || matchesLegacyTrigger)) {
      allConfigs.push(config);
    }
  }
  return allConfigs;
}
var executorState, TaskScheduler, schedulerInstance;
var init_tool_executor = __esm({
  "modules/tool-executor.js"() {
    init_tool_registry();
    init_event_bus();
    executorState = {
      // 当前活跃的AbortController
      activeControllers: /* @__PURE__ */ new Map(),
      // taskId -> AbortController
      // 执行队列
      executionQueue: [],
      // 正在执行的任务数
      runningCount: 0,
      // 最大并发数
      maxConcurrent: 3,
      // 执行历史（最近100条）
      executionHistory: [],
      // 是否暂停
      isPaused: false
    };
    TaskScheduler = class {
      constructor(maxConcurrent = 3) {
        this.maxConcurrent = maxConcurrent;
        this.queue = [];
        this.running = /* @__PURE__ */ new Map();
        this.isProcessing = false;
      }
      /**
       * 添加任务到队列
       * @param {Function} executor 执行函数
       * @param {Object} task 任务对象
       * @returns {Promise} 执行结果Promise
       */
      enqueue(executor, task) {
        return new Promise((resolve, reject) => {
          this.queue.push({ executor, task, resolve, reject });
          this.process();
        });
      }
      /**
       * 处理队列
       */
      async process() {
        if (this.isProcessing)
          return;
        this.isProcessing = true;
        while (this.queue.length > 0 && this.running.size < this.maxConcurrent) {
          const item = this.queue.shift();
          if (!item)
            continue;
          const { executor, task, resolve, reject } = item;
          const controller = new AbortController();
          task.abortController = controller;
          task.status = "running";
          task.startedAt = Date.now();
          this.running.set(task.id, task);
          executorState.activeControllers.set(task.id, controller);
          this.executeTask(executor, task, controller.signal).then((result) => {
            task.status = "completed";
            task.completedAt = Date.now();
            resolve(result);
          }).catch((error) => {
            task.status = error.name === "AbortError" ? "aborted" : "failed";
            task.completedAt = Date.now();
            reject(error);
          }).finally(() => {
            this.running.delete(task.id);
            executorState.activeControllers.delete(task.id);
            executorState.runningCount = this.running.size;
          });
        }
        this.isProcessing = false;
      }
      /**
       * 执行单个任务
       */
      async executeTask(executor, task, signal) {
        const startTime = Date.now();
        let lastError = null;
        for (let attempt = 0; attempt <= task.maxRetries; attempt++) {
          if (signal.aborted) {
            throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62", "AbortError");
          }
          try {
            const result = await executor(signal);
            return createResult(
              task.id,
              task.toolId,
              true,
              result,
              null,
              Date.now() - startTime,
              attempt
            );
          } catch (error) {
            lastError = error;
            if (error.name === "AbortError") {
              throw error;
            }
            if (attempt < task.maxRetries) {
              await this.delay(1e3 * (attempt + 1));
              task.retries = attempt + 1;
            }
          }
        }
        throw lastError;
      }
      /**
       * 延迟函数
       */
      delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      /**
       * 中止任务
       */
      abort(taskId) {
        const controller = executorState.activeControllers.get(taskId);
        if (controller) {
          controller.abort();
          return true;
        }
        return false;
      }
      /**
       * 中止所有任务
       */
      abortAll() {
        for (const controller of executorState.activeControllers.values()) {
          controller.abort();
        }
        executorState.activeControllers.clear();
        this.queue = [];
        this.running.clear();
      }
      /**
       * 获取队列状态
       */
      getStatus() {
        return {
          pending: this.queue.length,
          running: this.running.size,
          maxConcurrent: this.maxConcurrent
        };
      }
    };
    schedulerInstance = null;
  }
});

// modules/core/settings-service.js
var settings_service_exports = {};
__export(settings_service_exports, {
  DEFAULT_SETTINGS: () => DEFAULT_SETTINGS2,
  SettingsService: () => SettingsService,
  default: () => settings_service_default,
  settingsService: () => settingsService
});
var DEFAULT_SETTINGS2, SETTINGS_STORAGE_KEY, SettingsService, settingsService, settings_service_default;
var init_settings_service = __esm({
  "modules/core/settings-service.js"() {
    init_storage_service();
    init_event_bus();
    DEFAULT_SETTINGS2 = {
      executor: {
        maxConcurrent: 3,
        maxRetries: 2,
        retryDelayMs: 5e3,
        requestTimeoutMs: 9e4,
        queueStrategy: "fifo"
      },
      listener: {
        listenGenerationEnded: true,
        ignoreQuietGeneration: true,
        ignoreAutoTrigger: true,
        debounceMs: 300
      },
      debug: {
        enableDebugLog: false,
        saveExecutionHistory: true,
        showRuntimeBadge: true
      },
      ui: {
        compactMode: false,
        animationEnabled: true,
        theme: "dark-blue"
      }
    };
    SETTINGS_STORAGE_KEY = "settings_v2";
    SettingsService = class {
      constructor() {
        this._cache = null;
      }
      /**
       * 获取所有设置
       * @returns {Object}
       */
      getSettings() {
        if (this._cache) {
          return this._cache;
        }
        const saved = storage.get(SETTINGS_STORAGE_KEY, {});
        this._cache = this._mergeWithDefaults(saved);
        return this._cache;
      }
      /**
       * 保存设置
       * @param {Object} settings - 完整设置对象
       */
      saveSettings(settings) {
        this._cache = this._mergeWithDefaults(settings);
        storage.set(SETTINGS_STORAGE_KEY, this._cache);
        eventBus.emit(EVENTS.SETTINGS_UPDATED, { settings: this._cache });
      }
      /**
       * 更新部分设置
       * @param {Object} partial - 部分设置
       */
      updateSettings(partial) {
        const current = this.getSettings();
        const updated = this._deepMerge(current, partial);
        this.saveSettings(updated);
      }
      /**
       * 获取执行器设置
       * @returns {Object}
       */
      getExecutorSettings() {
        return this.getSettings().executor;
      }
      /**
       * 更新执行器设置
       * @param {Object} executorSettings
       */
      updateExecutorSettings(executorSettings) {
        this.updateSettings({ executor: executorSettings });
      }
      /**
       * 获取监听器设置
       * @returns {Object}
       */
      getListenerSettings() {
        return this.getSettings().listener;
      }
      /**
       * 更新监听器设置
       * @param {Object} listenerSettings
       */
      updateListenerSettings(listenerSettings) {
        this.updateSettings({ listener: listenerSettings });
      }
      /**
       * 获取调试设置
       * @returns {Object}
       */
      getDebugSettings() {
        return this.getSettings().debug;
      }
      /**
       * 更新调试设置
       * @param {Object} debugSettings
       */
      updateDebugSettings(debugSettings) {
        this.updateSettings({ debug: debugSettings });
      }
      /**
       * 获取UI设置
       * @returns {Object}
       */
      getUiSettings() {
        return this.getSettings().ui;
      }
      /**
       * 更新UI设置
       * @param {Object} uiSettings
       */
      updateUiSettings(uiSettings) {
        this.updateSettings({ ui: uiSettings });
      }
      /**
       * 重置为默认设置
       */
      resetSettings() {
        this._cache = JSON.parse(JSON.stringify(DEFAULT_SETTINGS2));
        storage.set(SETTINGS_STORAGE_KEY, this._cache);
        eventBus.emit(EVENTS.SETTINGS_UPDATED, { settings: this._cache, reset: true });
      }
      /**
       * 获取单个设置值
       * @param {string} path - 点分隔的路径，如 'executor.maxConcurrent'
       * @param {*} defaultValue
       * @returns {*}
       */
      get(path, defaultValue = null) {
        const settings = this.getSettings();
        const keys = path.split(".");
        let value = settings;
        for (const key of keys) {
          if (value && typeof value === "object" && key in value) {
            value = value[key];
          } else {
            return defaultValue;
          }
        }
        return value;
      }
      /**
       * 设置单个值
       * @param {string} path - 点分隔的路径
       * @param {*} value
       */
      set(path, value) {
        const settings = JSON.parse(JSON.stringify(this.getSettings()));
        const keys = path.split(".");
        let target = settings;
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          if (!(key in target)) {
            target[key] = {};
          }
          target = target[key];
        }
        target[keys[keys.length - 1]] = value;
        this.saveSettings(settings);
      }
      // ============================================================
      // 私有方法
      // ============================================================
      /**
       * 与默认值合并
       * @private
       */
      _mergeWithDefaults(saved) {
        return this._deepMerge(JSON.parse(JSON.stringify(DEFAULT_SETTINGS2)), saved);
      }
      /**
       * 深度合并对象
       * @private
       */
      _deepMerge(target, source) {
        const result = { ...target };
        for (const key in source) {
          if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
            result[key] = this._deepMerge(target[key] || {}, source[key]);
          } else {
            result[key] = source[key];
          }
        }
        return result;
      }
    };
    settingsService = new SettingsService();
    settings_service_default = settingsService;
  }
});

// modules/context-injector.js
var context_injector_exports = {};
__export(context_injector_exports, {
  ContextInjector: () => ContextInjector,
  DEFAULT_INJECTION_OPTIONS: () => DEFAULT_INJECTION_OPTIONS,
  contextInjector: () => contextInjector,
  default: () => context_injector_default
});
var CONTEXT_INJECTION_KEY, DEFAULT_INJECTION_OPTIONS, ContextInjector, contextInjector, context_injector_default;
var init_context_injector = __esm({
  "modules/context-injector.js"() {
    init_storage_service();
    init_event_bus();
    CONTEXT_INJECTION_KEY = "context_injection";
    DEFAULT_INJECTION_OPTIONS = {
      target: "context",
      // 注入目标：context, worldbook, message
      scope: "chat",
      // 作用域：chat, global, character
      overwrite: true,
      // 是否覆盖现有内容
      enabled: true
    };
    ContextInjector = class {
      constructor() {
        this._cache = /* @__PURE__ */ new Map();
        this.debugMode = false;
      }
      // ============================================================
      // 核心注入方法
      // ============================================================
      /**
       * 注入工具上下文
       * @param {string} toolId - 工具ID
       * @param {string} content - 要注入的内容
       * @param {Object} options - 注入选项
       * @returns {boolean} 是否成功
       */
      inject(toolId, content, options = {}) {
        if (!toolId || content === void 0 || content === null) {
          this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548");
          return false;
        }
        const mergedOptions = { ...DEFAULT_INJECTION_OPTIONS, ...options };
        const chatId = options.chatId || this._getCurrentChatId();
        if (!chatId) {
          this._log("\u6CE8\u5165\u5931\u8D25: \u65E0\u6CD5\u83B7\u53D6\u804A\u5929ID");
          return false;
        }
        const storageKey = this._getStorageKey(chatId);
        let chatContexts = this._getChatContexts(chatId);
        const injectionEntry = {
          toolId,
          content: String(content),
          updatedAt: Date.now(),
          sourceMessageId: options.sourceMessageId || null,
          options: mergedOptions
        };
        if (mergedOptions.overwrite || !chatContexts[toolId]) {
          chatContexts[toolId] = injectionEntry;
        } else {
          chatContexts[toolId] = {
            ...injectionEntry,
            content: (chatContexts[toolId]?.content || "") + "\n\n" + content
          };
        }
        this._saveChatContexts(chatId, chatContexts);
        eventBus.emit(EVENTS.TOOL_CONTEXT_INJECTED, {
          toolId,
          chatId,
          content: injectionEntry.content,
          options: mergedOptions
        });
        this._log(`\u6CE8\u5165\u6210\u529F: ${toolId} -> ${chatId}`);
        return true;
      }
      /**
       * 获取聚合的注入上下文
       * @param {string} chatId - 聊天ID（可选，默认当前聊天）
       * @returns {string} 聚合后的上下文文本
       */
      getAggregatedContext(chatId) {
        const actualChatId = chatId || this._getCurrentChatId();
        if (!actualChatId)
          return "";
        const chatContexts = this._getChatContexts(actualChatId);
        const entries = Object.entries(chatContexts);
        if (entries.length === 0)
          return "";
        const lines = ["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]", ""];
        for (const [toolId, entry] of entries) {
          lines.push(`[${toolId}]`);
          lines.push(entry.content || "");
          lines.push("");
        }
        return lines.join("\n");
      }
      /**
       * 获取单个工具的注入上下文
       * @param {string} chatId - 聊天ID
       * @param {string} toolId - 工具ID
       * @returns {Object|null} 注入条目
       */
      getToolContext(chatId, toolId) {
        const actualChatId = chatId || this._getCurrentChatId();
        if (!actualChatId || !toolId)
          return null;
        const chatContexts = this._getChatContexts(actualChatId);
        return chatContexts[toolId] || null;
      }
      /**
       * 获取聊天下所有工具上下文
       * @param {string} chatId - 聊天ID
       * @returns {Object} 工具上下文对象
       */
      getAllToolContexts(chatId) {
        const actualChatId = chatId || this._getCurrentChatId();
        if (!actualChatId)
          return {};
        return this._getChatContexts(actualChatId);
      }
      // ============================================================
      // 清除方法
      // ============================================================
      /**
       * 清除单个工具的上下文
       * @param {string} chatId - 聊天ID
       * @param {string} toolId - 工具ID
       * @returns {boolean} 是否成功
       */
      clearToolContext(chatId, toolId) {
        const actualChatId = chatId || this._getCurrentChatId();
        if (!actualChatId || !toolId)
          return false;
        const chatContexts = this._getChatContexts(actualChatId);
        if (chatContexts[toolId]) {
          delete chatContexts[toolId];
          this._saveChatContexts(actualChatId, chatContexts);
          eventBus.emit(EVENTS.TOOL_CONTEXT_CLEARED, { chatId: actualChatId, toolId });
          this._log(`\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587: ${toolId}`);
          return true;
        }
        return false;
      }
      /**
       * 清除聊天的所有工具上下文
       * @param {string} chatId - 聊天ID
       * @returns {boolean} 是否成功
       */
      clearAllContext(chatId) {
        const actualChatId = chatId || this._getCurrentChatId();
        if (!actualChatId)
          return false;
        const allContexts = this._getAllContexts();
        delete allContexts[actualChatId];
        storage.set(CONTEXT_INJECTION_KEY, allContexts);
        this._cache.delete(actualChatId);
        eventBus.emit(EVENTS.TOOL_CONTEXT_CLEARED, { chatId: actualChatId, allTools: true });
        this._log(`\u6E05\u9664\u804A\u5929\u6240\u6709\u4E0A\u4E0B\u6587: ${actualChatId}`);
        return true;
      }
      /**
       * 清除所有聊天的所有上下文
       */
      clearAllChatsContexts() {
        storage.remove(CONTEXT_INJECTION_KEY);
        this._cache.clear();
        this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587");
      }
      // ============================================================
      // 状态查询
      // ============================================================
      /**
       * 检查工具是否有注入上下文
       * @param {string} chatId - 聊天ID
       * @param {string} toolId - 工具ID
       * @returns {boolean}
       */
      hasToolContext(chatId, toolId) {
        const actualChatId = chatId || this._getCurrentChatId();
        if (!actualChatId || !toolId)
          return false;
        const chatContexts = this._getChatContexts(actualChatId);
        return !!chatContexts[toolId];
      }
      /**
       * 获取聊天的工具注入状态摘要
       * @param {string} chatId - 聊天ID
       * @returns {Object} 状态摘要
       */
      getContextSummary(chatId) {
        const actualChatId = chatId || this._getCurrentChatId();
        if (!actualChatId)
          return { tools: [], totalCount: 0 };
        const chatContexts = this._getChatContexts(actualChatId);
        const tools = Object.entries(chatContexts).map(([toolId, entry]) => ({
          toolId,
          updatedAt: entry.updatedAt,
          contentLength: entry.content?.length || 0
        }));
        return {
          chatId: actualChatId,
          tools,
          totalCount: tools.length
        };
      }
      // ============================================================
      // 导入导出
      // ============================================================
      /**
       * 导出聊天的上下文数据
       * @param {string} chatId - 聊天ID
       * @returns {Object} 上下文数据
       */
      exportContext(chatId) {
        const actualChatId = chatId || this._getCurrentChatId();
        if (!actualChatId)
          return {};
        return {
          chatId: actualChatId,
          contexts: this._getChatContexts(actualChatId),
          exportedAt: Date.now()
        };
      }
      /**
       * 导入上下文数据
       * @param {Object} data - 导出的数据
       * @param {Object} options - 导入选项
       * @returns {boolean} 是否成功
       */
      importContext(data, options = {}) {
        if (!data || !data.chatId || !data.contexts) {
          return false;
        }
        const { overwrite = false } = options;
        if (overwrite) {
          this._saveChatContexts(data.chatId, data.contexts);
        } else {
          const existing = this._getChatContexts(data.chatId);
          const merged = { ...existing, ...data.contexts };
          this._saveChatContexts(data.chatId, merged);
        }
        this._log(`\u5BFC\u5165\u4E0A\u4E0B\u6587: ${data.chatId}`);
        return true;
      }
      // ============================================================
      // 私有方法
      // ============================================================
      /**
       * 获取存储键
       * @private
       */
      _getStorageKey(chatId) {
        return `${CONTEXT_INJECTION_KEY}:${chatId}`;
      }
      /**
       * 获取当前聊天ID
       * @private
       */
      _getCurrentChatId() {
        try {
          const topWindow = typeof window.parent !== "undefined" && window.parent !== window ? window.parent : window;
          if (topWindow.SillyTavern?.getContext) {
            const context = topWindow.SillyTavern.getContext();
            return context.chatId || context.chat_filename || `chat_${Date.now()}`;
          }
          return `chat_${Date.now()}`;
        } catch (e) {
          return `chat_${Date.now()}`;
        }
      }
      /**
       * 获取所有上下文数据
       * @private
       */
      _getAllContexts() {
        return storage.get(CONTEXT_INJECTION_KEY, {});
      }
      /**
       * 获取聊天的工具上下文
       * @private
       */
      _getChatContexts(chatId) {
        if (this._cache.has(chatId)) {
          return this._cache.get(chatId);
        }
        const allContexts = this._getAllContexts();
        const chatContexts = allContexts[chatId] || {};
        this._cache.set(chatId, chatContexts);
        return chatContexts;
      }
      /**
       * 保存聊天的工具上下文
       * @private
       */
      _saveChatContexts(chatId, contexts) {
        const allContexts = this._getAllContexts();
        allContexts[chatId] = contexts;
        storage.set(CONTEXT_INJECTION_KEY, allContexts);
        this._cache.set(chatId, contexts);
      }
      /**
       * 日志输出
       * @private
       */
      _log(...args) {
        if (this.debugMode) {
          console.log("[ContextInjector]", ...args);
        }
      }
    };
    contextInjector = new ContextInjector();
    context_injector_default = contextInjector;
  }
});

// modules/tool-prompt-service.js
var tool_prompt_service_exports = {};
__export(tool_prompt_service_exports, {
  DEFAULT_PROMPT_TEMPLATE: () => DEFAULT_PROMPT_TEMPLATE,
  ToolPromptService: () => ToolPromptService,
  default: () => tool_prompt_service_default,
  toolPromptService: () => toolPromptService
});
var DEFAULT_PROMPT_TEMPLATE, ToolPromptService, toolPromptService, tool_prompt_service_default;
var init_tool_prompt_service = __esm({
  "modules/tool-prompt-service.js"() {
    init_event_bus();
    init_bypass_manager();
    DEFAULT_PROMPT_TEMPLATE = `\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A`;
    ToolPromptService = class {
      constructor() {
        this.debugMode = false;
      }
      // ============================================================
      // 核心方法
      // ============================================================
      /**
       * 构建工具消息数组
       * @param {Object} toolConfig - 工具配置对象
       * @param {Object} context - 执行上下文，包含 lastAiMessage 等
       * @returns {Array} OpenAI格式的消息数组
       */
      buildToolMessages(toolConfig, context) {
        if (!toolConfig) {
          this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A");
          return [];
        }
        const messages = [];
        const bypassMessages = this._getBypassMessages(toolConfig);
        if (bypassMessages && bypassMessages.length > 0) {
          for (const msg of bypassMessages) {
            if (msg.enabled !== false) {
              messages.push({
                role: this._normalizeRole(msg.role),
                content: msg.content || ""
              });
            }
          }
        }
        const promptTemplate = this._getPromptTemplate(toolConfig);
        const userContent = this._buildUserContent(promptTemplate, context);
        if (userContent.trim()) {
          messages.push({
            role: "user",
            content: userContent
          });
        }
        this._log(`\u6784\u5EFA\u6D88\u606F: ${messages.length} \u6761`);
        return messages;
      }
      /**
       * 构建提示词文本（用于显示或调试）
       * @param {Object} toolConfig - 工具配置
       * @param {Object} context - 执行上下文
       * @returns {string} 提示词文本
       */
      buildPromptText(toolConfig, context) {
        const promptTemplate = this._getPromptTemplate(toolConfig);
        return this._buildUserContent(promptTemplate, context);
      }
      /**
       * 获取工具的提示词模板
       * @param {Object} toolConfig - 工具配置
       * @returns {string} 提示词模板
       */
      getToolPromptTemplate(toolConfig) {
        return this._getPromptTemplate(toolConfig);
      }
      // ============================================================
      // 私有方法
      // ============================================================
      /**
       * 获取工具的提示词模板
       * @private
       */
      _getPromptTemplate(toolConfig) {
        if (toolConfig.promptTemplate && typeof toolConfig.promptTemplate === "string") {
          return toolConfig.promptTemplate;
        }
        return DEFAULT_PROMPT_TEMPLATE;
      }
      /**
       * 获取破限词消息
       * @private
       */
      _getBypassMessages(toolConfig) {
        if (!toolConfig.bypass?.enabled) {
          return [];
        }
        return bypassManager.buildBypassMessages(toolConfig);
      }
      /**
       * 构建用户消息内容
       * @private
       */
      _buildUserContent(promptTemplate, context) {
        const parts = [];
        const lastAiMessage = context?.lastAiMessage || context?.input?.lastAiMessage || "";
        if (promptTemplate && promptTemplate.trim()) {
          parts.push(promptTemplate.trim());
        }
        if (lastAiMessage) {
          parts.push(`
\u4EE5\u4E0B\u662F\u9700\u8981\u5904\u7406\u7684AI\u56DE\u590D\u5185\u5BB9\uFF1A
${lastAiMessage}`);
        }
        return parts.join("\n");
      }
      /**
       * 标准化角色名称
       * @private
       */
      _normalizeRole(role) {
        if (!role)
          return "user";
        const normalized = String(role).toLowerCase();
        switch (normalized) {
          case "system":
            return "system";
          case "assistant":
            return "assistant";
          case "user":
          default:
            return "user";
        }
      }
      /**
       * 日志输出
       * @private
       */
      _log(...args) {
        if (this.debugMode) {
          console.log("[ToolPromptService]", ...args);
        }
      }
      // ============================================================
      // 调试方法
      // ============================================================
      /**
       * 设置调试模式
       * @param {boolean} enabled
       */
      setDebugMode(enabled) {
        this.debugMode = enabled;
      }
    };
    toolPromptService = new ToolPromptService();
    tool_prompt_service_default = toolPromptService;
  }
});

// modules/tool-output-service.js
var tool_output_service_exports = {};
__export(tool_output_service_exports, {
  LEGACY_OUTPUT_MODES: () => LEGACY_OUTPUT_MODES,
  OUTPUT_MODES: () => OUTPUT_MODES,
  TOOL_RUNTIME_STATUS: () => TOOL_RUNTIME_STATUS,
  ToolOutputService: () => ToolOutputService,
  default: () => tool_output_service_default,
  toolOutputService: () => toolOutputService
});
var OUTPUT_MODES, LEGACY_OUTPUT_MODES, TOOL_RUNTIME_STATUS, ToolOutputService, toolOutputService, tool_output_service_default;
var init_tool_output_service = __esm({
  "modules/tool-output-service.js"() {
    init_event_bus();
    init_settings_service();
    init_context_injector();
    init_tool_prompt_service();
    OUTPUT_MODES = {
      FOLLOW_AI: "follow_ai",
      // 随AI输出（不执行额外解析链）
      POST_RESPONSE_API: "post_response_api"
      // 额外AI模型解析
    };
    LEGACY_OUTPUT_MODES = {
      inline: "follow_ai"
      // 旧 inline 映射到新 follow_ai
    };
    TOOL_RUNTIME_STATUS = {
      IDLE: "idle",
      RUNNING: "running",
      SUCCESS: "success",
      ERROR: "error"
    };
    ToolOutputService = class {
      constructor() {
        this.debugMode = false;
        this._apiConnection = null;
      }
      // ============================================================
      // 核心方法
      // ============================================================
      /**
       * 检查工具是否应该运行 post_response_api 模式
       * @param {Object} toolConfig - 工具配置
       * @returns {boolean}
       */
      shouldRunPostResponse(toolConfig) {
        if (!toolConfig)
          return false;
        if (!toolConfig.enabled)
          return false;
        if (!toolConfig.trigger?.enabled)
          return false;
        if (!toolConfig.output?.enabled)
          return false;
        return toolConfig.output?.mode === OUTPUT_MODES.POST_RESPONSE_API;
      }
      /**
       * 检查工具是否应该运行 follow_ai 模式
       * @param {Object} toolConfig - 工具配置
       * @returns {boolean}
       */
      shouldRunFollowAi(toolConfig) {
        if (!toolConfig)
          return false;
        if (!toolConfig.enabled)
          return false;
        if (!toolConfig.trigger?.enabled)
          return false;
        if (!toolConfig.output?.enabled)
          return false;
        const mode = toolConfig.output?.mode;
        return mode === OUTPUT_MODES.FOLLOW_AI || mode === "inline";
      }
      /**
       * 检查工具是否应该运行 inline 模式（兼容旧方法名）
       * @deprecated 使用 shouldRunFollowAi 替代
       * @param {Object} toolConfig - 工具配置
       * @returns {boolean}
       */
      shouldRunInline(toolConfig) {
        return this.shouldRunFollowAi(toolConfig);
      }
      /**
       * 执行工具的 post_response_api 输出
       * @param {Object} toolConfig - 工具配置
       * @param {Object} rawContext - 原始上下文
       * @returns {Promise<Object>} 执行结果
       */
      async runToolPostResponse(toolConfig, rawContext) {
        const startTime = Date.now();
        const toolId = toolConfig.id;
        this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${toolId}`);
        eventBus.emit(EVENTS.TOOL_EXECUTION_STARTED, {
          toolId,
          mode: OUTPUT_MODES.POST_RESPONSE_API
        });
        try {
          const messages = await this._buildToolMessages(toolConfig, rawContext);
          if (!messages || messages.length === 0) {
            throw new Error("\u65E0\u6CD5\u6784\u5EFA\u6709\u6548\u7684\u6D88\u606F");
          }
          this._log(`\u6784\u5EFA\u4E86 ${messages.length} \u6761\u6D88\u606F`);
          const apiPreset = toolConfig.output?.apiPreset;
          const timeoutMs = await this._getRequestTimeout();
          const result = await this._sendApiRequest(apiPreset, messages, {
            timeoutMs,
            signal: rawContext.signal
          });
          const outputContent = this._extractOutputContent(result, toolConfig);
          if (outputContent) {
            await contextInjector.inject(toolId, outputContent, {
              chatId: rawContext.chatId,
              overwrite: toolConfig.output?.overwrite !== false,
              sourceMessageId: rawContext.messageId || ""
            });
          }
          const duration = Date.now() - startTime;
          eventBus.emit(EVENTS.TOOL_EXECUTED, {
            toolId,
            success: true,
            duration,
            mode: OUTPUT_MODES.POST_RESPONSE_API
          });
          this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${toolId}, \u8017\u65F6 ${duration}ms`);
          return {
            success: true,
            toolId,
            output: outputContent,
            duration
          };
        } catch (error) {
          const duration = Date.now() - startTime;
          this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${toolId}`, error);
          eventBus.emit(EVENTS.TOOL_EXECUTION_FAILED, {
            toolId,
            error: error.message || String(error),
            duration
          });
          return {
            success: false,
            toolId,
            error: error.message || String(error),
            duration
          };
        }
      }
      /**
       * 执行工具的 inline 输出
       * @param {Object} toolConfig - 工具配置
       * @param {Object} rawContext - 原始上下文
       * @returns {Promise<Object>}
       */
      async runToolInline(toolConfig, rawContext) {
        const startTime = Date.now();
        const toolId = toolConfig.id;
        try {
          const messages = await this._buildToolMessages(toolConfig, rawContext);
          return {
            success: true,
            toolId,
            messages,
            duration: Date.now() - startTime
          };
        } catch (error) {
          return {
            success: false,
            toolId,
            error: error.message || String(error),
            duration: Date.now() - startTime
          };
        }
      }
      // ============================================================
      // 消息构建
      // ============================================================
      /**
       * 构建工具消息
       * @private
       */
      async _buildToolMessages(toolConfig, rawContext) {
        const injectedContext = await contextInjector.getAggregatedContext(rawContext.chatId);
        const fullContext = {
          ...rawContext,
          injectedContext,
          toolName: toolConfig.name,
          toolId: toolConfig.id
        };
        return toolPromptService.buildToolMessages(toolConfig, fullContext);
      }
      /**
       * 标准化角色名称
       * @private
       */
      _normalizeRole(role) {
        if (!role)
          return "user";
        const r = String(role).toLowerCase();
        if (r === "system")
          return "system";
        if (r === "assistant")
          return "assistant";
        return "user";
      }
      // ============================================================
      // API请求
      // ============================================================
      /**
       * 设置API连接模块
       * @param {Object} apiConnection
       */
      setApiConnection(apiConnection) {
        this._apiConnection = apiConnection;
      }
      /**
       * 发送API请求
       * @private
       */
      async _sendApiRequest(presetName, messages, options = {}) {
        if (!this._apiConnection) {
          throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");
        }
        const { timeoutMs = 9e4, signal } = options;
        if (presetName && this._apiConnection.sendWithPreset) {
          return await this._apiConnection.sendWithPreset(presetName, messages, {
            timeoutMs
          }, signal);
        }
        if (this._apiConnection.sendApiRequest) {
          return await this._apiConnection.sendApiRequest(messages, {
            timeoutMs
          }, signal);
        }
        throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5");
      }
      /**
       * 获取请求超时时间
       * @private
       */
      async _getRequestTimeout() {
        const settings = settingsService.getSettings();
        return settings.executor?.requestTimeoutMs || 9e4;
      }
      // ============================================================
      // 输出处理
      // ============================================================
      /**
       * 从API响应中提取输出内容
       * @private
       */
      _extractOutputContent(response, toolConfig) {
        if (!response)
          return "";
        if (typeof response === "string") {
          return response;
        }
        if (typeof response === "object") {
          if (response.choices && response.choices[0]?.message?.content) {
            return response.choices[0].message.content;
          }
          if (response.content) {
            return response.content;
          }
          if (response.text) {
            return response.text;
          }
          if (response.message) {
            return response.message;
          }
          try {
            return JSON.stringify(response, null, 2);
          } catch (e) {
            return String(response);
          }
        }
        return String(response);
      }
      // ============================================================
      // 工具配置过滤
      // ============================================================
      /**
       * 过滤出应该运行的 post_response_api 工具
       * @param {Array} toolConfigs - 工具配置列表
       * @returns {Array} 需要运行的工具
       */
      filterPostResponseTools(toolConfigs) {
        if (!Array.isArray(toolConfigs))
          return [];
        return toolConfigs.filter((config) => this.shouldRunPostResponse(config));
      }
      /**
       * 过滤出应该运行的 inline 工具
       * @param {Array} toolConfigs - 工具配置列表
       * @returns {Array} 需要运行的工具
       */
      filterInlineTools(toolConfigs) {
        if (!Array.isArray(toolConfigs))
          return [];
        return toolConfigs.filter((config) => this.shouldRunInline(config));
      }
      // ============================================================
      // 日志
      // ============================================================
      /**
       * 设置调试模式
       * @param {boolean} enabled
       */
      setDebugMode(enabled) {
        this.debugMode = enabled;
      }
      /**
       * 日志输出
       * @private
       */
      _log(...args) {
        if (this.debugMode) {
          console.log("[ToolOutputService]", ...args);
        }
      }
    };
    toolOutputService = new ToolOutputService();
    tool_output_service_default = toolOutputService;
  }
});

// modules/tool-trigger.js
var tool_trigger_exports = {};
__export(tool_trigger_exports, {
  EVENT_TYPES: () => EVENT_TYPES,
  checkGate: () => checkGate,
  destroyToolTriggerManager: () => destroyToolTriggerManager,
  getChatContext: () => getChatContext,
  getCurrentCharacter: () => getCurrentCharacter,
  getFullContext: () => getFullContext,
  getToolTriggerManagerState: () => getToolTriggerManagerState,
  getWorldbookContent: () => getWorldbookContent,
  initToolTriggerManager: () => initToolTriggerManager,
  initTriggerModule: () => initTriggerModule,
  registerEventListener: () => registerEventListener,
  registerTriggerHandler: () => registerTriggerHandler,
  removeAllListeners: () => removeAllListeners,
  removeAllTriggerHandlers: () => removeAllTriggerHandlers,
  resetGateState: () => resetGateState,
  runToolManually: () => runToolManually,
  setDebugMode: () => setDebugMode,
  setTriggerHandlerEnabled: () => setTriggerHandlerEnabled,
  triggerState: () => triggerState,
  unregisterEventListener: () => unregisterEventListener,
  updateGateState: () => updateGateState
});
function getTopWindow() {
  return typeof window.parent !== "undefined" ? window.parent : window;
}
function getSillyTavernAPI() {
  const topWindow = getTopWindow();
  return topWindow.SillyTavern || null;
}
function getEventSource() {
  const topWindow = getTopWindow();
  const api = topWindow.SillyTavern;
  if (api && api.eventSource) {
    return api.eventSource;
  }
  return null;
}
function getEventTypes() {
  const topWindow = getTopWindow();
  const api = topWindow.SillyTavern;
  if (api && api.eventTypes) {
    return api.eventTypes;
  }
  return EVENT_TYPES;
}
function log(...args) {
  if (triggerState.debugMode) {
    console.log("[YouYouToolkit:Trigger]", ...args);
  }
}
function registerEventListener(eventType, callback, options = {}) {
  if (!eventType || typeof callback !== "function") {
    log("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570");
    return () => {
    };
  }
  const { once = false, priority = 0 } = options;
  const eventSource = getEventSource();
  const eventTypes = getEventTypes();
  const stEventType = eventTypes[eventType] || eventType;
  const wrappedCallback = async (...args) => {
    try {
      if (options.gateCheck && !await checkGate(options.gateCheck)) {
        log(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${eventType}`);
        return;
      }
      await callback(...args);
      if (once) {
        unregisterEventListener(eventType, wrappedCallback);
      }
    } catch (error) {
      console.error(`[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:`, error);
    }
  };
  if (!triggerState.listeners.has(eventType)) {
    triggerState.listeners.set(eventType, /* @__PURE__ */ new Set());
  }
  triggerState.listeners.get(eventType).add(wrappedCallback);
  if (eventSource && typeof eventSource.on === "function") {
    eventSource.on(stEventType, wrappedCallback);
    log(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${eventType}`);
  } else {
    const topWindow = getTopWindow();
    if (topWindow.addEventListener) {
      topWindow.addEventListener(stEventType, wrappedCallback);
      log(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${eventType}`);
    }
  }
  return () => unregisterEventListener(eventType, wrappedCallback);
}
function unregisterEventListener(eventType, callback) {
  const listeners = triggerState.listeners.get(eventType);
  if (listeners && listeners.has(callback)) {
    listeners.delete(callback);
    const eventSource = getEventSource();
    const eventTypes = getEventTypes();
    const stEventType = eventTypes[eventType] || eventType;
    if (eventSource && typeof eventSource.off === "function") {
      eventSource.off(stEventType, callback);
      log(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${eventType}`);
    } else {
      const topWindow = getTopWindow();
      if (topWindow.removeEventListener) {
        topWindow.removeEventListener(stEventType, callback);
      }
    }
  }
}
function removeAllListeners() {
  const eventSource = getEventSource();
  const eventTypes = getEventTypes();
  for (const [eventType, listeners] of triggerState.listeners) {
    const stEventType = eventTypes[eventType] || eventType;
    for (const callback of listeners) {
      if (eventSource && typeof eventSource.off === "function") {
        eventSource.off(stEventType, callback);
      } else {
        const topWindow = getTopWindow();
        if (topWindow.removeEventListener) {
          topWindow.removeEventListener(stEventType, callback);
        }
      }
    }
  }
  triggerState.listeners.clear();
  log("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668");
}
async function checkGate(condition) {
  if (!condition)
    return true;
  const now = Date.now();
  const gate = triggerState.gateState;
  if (condition.minInterval && gate.lastGenerationAt) {
    if (now - gate.lastGenerationAt < condition.minInterval) {
      log("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED");
      return false;
    }
  }
  if (condition.maxInterval && gate.lastUserMessageAt) {
    if (now - gate.lastUserMessageAt > condition.maxInterval) {
      log("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F");
      return false;
    }
  }
  if (condition.requireUserMessage) {
    if (!gate.lastUserMessageId) {
      log("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F");
      return false;
    }
  }
  if (condition.excludeQuietGeneration) {
    if (gate.lastGenerationType === "quiet") {
      log("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664");
      return false;
    }
  }
  if (condition.customCheck && typeof condition.customCheck === "function") {
    try {
      const result = await condition.customCheck(gate);
      if (!result) {
        log("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse");
        return false;
      }
    } catch (error) {
      console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:", error);
      return false;
    }
  }
  return true;
}
function updateGateState(update) {
  Object.assign(triggerState.gateState, update);
}
function resetGateState() {
  triggerState.gateState = {
    lastUserMessageId: null,
    lastUserMessageText: "",
    lastUserMessageAt: 0,
    lastGenerationType: null,
    lastGenerationAt: 0,
    isGenerating: false
  };
}
async function getChatContext(options = {}) {
  const {
    depth = 3,
    includeUser = true,
    includeAssistant = true,
    includeSystem = false,
    format = "messages"
    // 'messages' | 'text'
  } = options;
  const api = getSillyTavernAPI();
  if (!api) {
    log("\u65E0\u6CD5\u83B7\u53D6SillyTavern API");
    return null;
  }
  try {
    const chat = api.chat || [];
    const messages = [];
    const startIndex = Math.max(0, chat.length - depth);
    for (let i = startIndex; i < chat.length; i++) {
      const msg = chat[i];
      if (!msg)
        continue;
      if (msg.is_user && !includeUser)
        continue;
      if (!msg.is_user && msg.is_system && !includeSystem)
        continue;
      if (!msg.is_user && !msg.is_system && !includeAssistant)
        continue;
      if (format === "messages") {
        messages.push({
          role: msg.is_user ? "user" : msg.is_system ? "system" : "assistant",
          content: msg.mes || "",
          name: msg.name || "",
          timestamp: msg.send_date
        });
      } else {
        messages.push(msg.mes || "");
      }
    }
    return {
      messages,
      totalMessages: chat.length,
      startIndex,
      endIndex: chat.length - 1
    };
  } catch (error) {
    console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:", error);
    return null;
  }
}
async function getCurrentCharacter() {
  const api = getSillyTavernAPI();
  if (!api)
    return null;
  try {
    const charId = api.this_chid;
    const characters = api.characters || [];
    if (charId >= 0 && charId < characters.length) {
      const char = characters[charId];
      return {
        id: charId,
        name: char.name || "",
        description: char.description || "",
        personality: char.personality || "",
        scenario: char.scenario || "",
        firstMes: char.first_mes || "",
        mesExample: char.mes_example || ""
      };
    }
    return null;
  } catch (error) {
    console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:", error);
    return null;
  }
}
async function getWorldbookContent(options = {}) {
  const {
    enabledOnly = true,
    maxLength = 1e4
  } = options;
  const api = getSillyTavernAPI();
  if (!api)
    return "";
  try {
    const lorebook = api.lorebook || [];
    const entries = lorebook.entries || [];
    const contents = [];
    let totalLength = 0;
    for (const entry of entries) {
      if (enabledOnly && !entry.enabled)
        continue;
      const content = entry.content || "";
      if (content && totalLength + content.length <= maxLength) {
        contents.push(content);
        totalLength += content.length;
      }
    }
    return contents.join("\n\n");
  } catch (error) {
    console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:", error);
    return "";
  }
}
async function getFullContext(options = {}) {
  const [chatContext, character, worldbook] = await Promise.all([
    getChatContext(options.chat || {}),
    getCurrentCharacter(),
    getWorldbookContent(options.worldbook || {})
  ]);
  return {
    chat: chatContext,
    character,
    worldbook,
    timestamp: Date.now()
  };
}
function registerTriggerHandler(handlerId, config) {
  if (!handlerId || !config) {
    log("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E");
    return () => {
    };
  }
  const {
    eventType,
    handler,
    gateCondition,
    priority = 0
  } = config;
  if (!eventType || typeof handler !== "function") {
    log("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570");
    return () => {
    };
  }
  triggerState.handlers.set(handlerId, {
    eventType,
    handler,
    gateCondition,
    priority,
    enabled: true
  });
  const unregister = registerEventListener(eventType, async (...args) => {
    const handlerConfig = triggerState.handlers.get(handlerId);
    if (!handlerConfig || !handlerConfig.enabled)
      return;
    if (handlerConfig.gateCondition) {
      const passed = await checkGate(handlerConfig.gateCondition);
      if (!passed)
        return;
    }
    await handlerConfig.handler(...args);
  }, { priority });
  log(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${handlerId}`);
  return () => {
    unregister();
    triggerState.handlers.delete(handlerId);
    log(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${handlerId}`);
  };
}
function setTriggerHandlerEnabled(handlerId, enabled) {
  const config = triggerState.handlers.get(handlerId);
  if (config) {
    config.enabled = enabled;
    log(`\u89E6\u53D1\u5904\u7406\u5668 ${handlerId} \u5DF2${enabled ? "\u542F\u7528" : "\u7981\u7528"}`);
  }
}
function removeAllTriggerHandlers() {
  triggerState.handlers.clear();
  log("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668");
}
function initToolTriggerManager() {
  if (toolTriggerManagerState.initialized) {
    log("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");
    return;
  }
  registerGenerationEndedListener();
  toolTriggerManagerState.initialized = true;
  log("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");
  eventBus.emit(EVENTS.TOOL_TRIGGER_INITIALIZED);
}
function registerGenerationEndedListener() {
  const eventType = EVENT_TYPES.GENERATION_ENDED;
  const listener = registerEventListener(eventType, async (data) => {
    log("GENERATION_ENDED\u89E6\u53D1:", data);
    const context = await buildToolExecutionContext(data);
    const toolsToExecute = getToolsToExecute(eventType);
    if (toolsToExecute.length === 0) {
      log("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177");
      return;
    }
    log(`\u9700\u8981\u6267\u884C ${toolsToExecute.length} \u4E2A\u5DE5\u5177:`, toolsToExecute.map((t) => t.id));
    showTopNotice("info", `\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${toolsToExecute.length} \u4E2A\u5DE5\u5177`, {
      duration: 2400,
      noticeId: "yyt-tool-batch-start"
    });
    for (const tool of toolsToExecute) {
      try {
        const result = await executeTriggeredTool(tool, context);
        if (result.success) {
          log(`\u5DE5\u5177 ${tool.id} \u6267\u884C\u6210\u529F`);
          eventBus.emit(EVENTS.TOOL_EXECUTED, {
            toolId: tool.id,
            result: result.result || result.data || result
          });
        } else {
          log(`\u5DE5\u5177 ${tool.id} \u6267\u884C\u5931\u8D25:`, result.error);
        }
      } catch (error) {
        console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${tool.id}`, error);
      }
    }
    toolTriggerManagerState.lastExecutionContext = context;
  });
  toolTriggerManagerState.listeners.set(eventType, listener);
}
async function buildToolExecutionContext(eventData) {
  const chat = await getChatContext({ depth: 5 });
  const character = await getCurrentCharacter();
  const api = getSillyTavernAPI();
  const stContext = api?.getContext?.() || null;
  const messages = chat?.messages || [];
  const lastUserMessage = messages.filter((m) => m.role === "user").pop();
  const lastAiMessage = messages.filter((m) => m.role === "assistant").pop();
  return {
    triggeredAt: Date.now(),
    triggerEvent: eventData?.triggerEvent || "GENERATION_ENDED",
    chatId: stContext?.chatId || stContext?.chat_id || stContext?.chat_filename || "",
    messageId: eventData?.messageId || eventData?.id || "",
    lastAiMessage: lastAiMessage?.content || "",
    userMessage: lastUserMessage?.content || "",
    input: {
      userMessage: lastUserMessage?.content || "",
      lastAiMessage: lastAiMessage?.content || "",
      extractedContent: "",
      previousToolOutput: "",
      context: {
        character: character?.name || "",
        chatLength: chat?.totalMessages || 0
      }
    },
    config: {},
    status: "pending"
  };
}
function getToolsToExecute(eventType) {
  const tools = getToolsForEvent(eventType);
  return tools.filter((tool) => toolOutputService.shouldRunPostResponse(tool));
}
function updateRuntime(toolId, runtimePartial) {
  try {
    updateToolRuntime(toolId, runtimePartial);
  } catch (error) {
    console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:", toolId, error);
  }
}
async function executeTriggeredTool(tool, context) {
  const startedAt = Date.now();
  const toolId = tool.id;
  const isManual = context?.triggerEvent === "MANUAL";
  const noticeId = `yyt-tool-run-${toolId}`;
  updateRuntime(toolId, {
    lastStatus: "running",
    lastError: "",
    lastDurationMs: 0
  });
  eventBus.emit(EVENTS.TOOL_EXECUTION_REQUESTED, {
    toolId,
    triggerEvent: context?.triggerEvent || "GENERATION_ENDED",
    context
  });
  showTopNotice("info", `${isManual ? "\u6B63\u5728\u624B\u52A8\u6267\u884C" : "\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${tool.name}`, {
    sticky: true,
    noticeId
  });
  try {
    let result;
    if (tool.output?.mode === OUTPUT_MODES.POST_RESPONSE_API) {
      result = await toolOutputService.runToolPostResponse(tool, context);
    } else {
      result = await executeToolWithConfig(toolId, context);
    }
    const duration = Date.now() - startedAt;
    if (result?.success) {
      const config2 = getToolFullConfig(toolId);
      updateRuntime(toolId, {
        lastStatus: "success",
        lastError: "",
        lastDurationMs: duration,
        successCount: (config2?.runtime?.successCount || 0) + 1
      });
      const message = isManual ? `${tool.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210` : `\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${tool.name}`;
      showToast("success", message);
      showTopNotice("success", message, {
        duration: 3200,
        noticeId
      });
      return { success: true, duration, result };
    }
    const config = getToolFullConfig(toolId);
    const errorMessage = result?.error || "\u5DE5\u5177\u6267\u884C\u5931\u8D25";
    updateRuntime(toolId, {
      lastStatus: "error",
      lastError: errorMessage,
      lastDurationMs: duration,
      errorCount: (config?.runtime?.errorCount || 0) + 1
    });
    showToast("error", `${tool.name} \u6267\u884C\u5931\u8D25\uFF1A${errorMessage}`);
    showTopNotice("error", `${tool.name} \u6267\u884C\u5931\u8D25\uFF1A${errorMessage}`, {
      sticky: true,
      noticeId
    });
    return { success: false, duration, error: errorMessage, result };
  } catch (error) {
    const duration = Date.now() - startedAt;
    const config = getToolFullConfig(toolId);
    const errorMessage = error?.message || String(error);
    updateRuntime(toolId, {
      lastStatus: "error",
      lastError: errorMessage,
      lastDurationMs: duration,
      errorCount: (config?.runtime?.errorCount || 0) + 1
    });
    showToast("error", `${tool.name} \u6267\u884C\u5931\u8D25\uFF1A${errorMessage}`);
    showTopNotice("error", `${tool.name} \u6267\u884C\u5931\u8D25\uFF1A${errorMessage}`, {
      sticky: true,
      noticeId
    });
    throw error;
  }
}
async function runToolManually(toolId) {
  if (!toolId) {
    return { success: false, error: "\u7F3A\u5C11\u5DE5\u5177ID" };
  }
  const tool = getToolFullConfig(toolId);
  if (!tool) {
    return { success: false, error: "\u5DE5\u5177\u4E0D\u5B58\u5728" };
  }
  if (!tool.enabled) {
    showTopNotice("warning", `${tool.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`, {
      duration: 2800,
      noticeId: `yyt-tool-run-${toolId}`
    });
    return { success: false, error: "\u5DE5\u5177\u672A\u542F\u7528" };
  }
  if (!toolOutputService.shouldRunPostResponse(tool)) {
    showTopNotice("warning", `${tool.name} \u5F53\u524D\u4E3A\u201C\u968F AI \u8F93\u51FA\u201D\uFF0C\u4E0D\u4F1A\u6267\u884C\u989D\u5916\u89E3\u6790`, {
      duration: 3200,
      noticeId: `yyt-tool-run-${toolId}`
    });
    return { success: false, error: "\u5F53\u524D\u8F93\u51FA\u6A21\u5F0F\u4E0D\u6267\u884C\u989D\u5916\u89E3\u6790" };
  }
  const context = await buildToolExecutionContext({ triggerEvent: "MANUAL" });
  return executeTriggeredTool(tool, context);
}
function destroyToolTriggerManager() {
  for (const [eventType, listener] of toolTriggerManagerState.listeners) {
    unregisterEventListener(eventType, listener);
  }
  toolTriggerManagerState.listeners.clear();
  toolTriggerManagerState.initialized = false;
  toolTriggerManagerState.lastExecutionContext = null;
  log("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1");
}
function getToolTriggerManagerState() {
  return {
    initialized: toolTriggerManagerState.initialized,
    listenersCount: toolTriggerManagerState.listeners.size,
    lastExecutionContext: toolTriggerManagerState.lastExecutionContext
  };
}
async function initTriggerModule() {
  if (triggerState.isInitialized) {
    log("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");
    return;
  }
  const api = getSillyTavernAPI();
  if (!api) {
    log("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316");
    setTimeout(initTriggerModule, 1e3);
    return;
  }
  const eventTypes = getEventTypes();
  if (eventTypes.MESSAGE_SENT) {
    registerEventListener(eventTypes.MESSAGE_SENT, (messageId) => {
      updateGateState({
        lastUserMessageId: messageId,
        lastUserMessageAt: Date.now()
      });
      log(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${messageId}`);
    });
  }
  if (eventTypes.GENERATION_STARTED) {
    registerEventListener(eventTypes.GENERATION_STARTED, (type, params) => {
      updateGateState({
        lastGenerationType: type,
        isGenerating: true
      });
      log(`\u751F\u6210\u5F00\u59CB: ${type}`);
    });
  }
  if (eventTypes.GENERATION_ENDED) {
    registerEventListener(eventTypes.GENERATION_ENDED, () => {
      updateGateState({
        lastGenerationAt: Date.now(),
        isGenerating: false
      });
      log("\u751F\u6210\u7ED3\u675F");
    });
  }
  initToolTriggerManager();
  triggerState.isInitialized = true;
  log("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210");
}
function setDebugMode(enabled) {
  triggerState.debugMode = enabled;
}
var EVENT_TYPES, triggerState, toolTriggerManagerState;
var init_tool_trigger = __esm({
  "modules/tool-trigger.js"() {
    init_event_bus();
    init_tool_registry();
    init_tool_executor();
    init_tool_output_service();
    init_utils();
    EVENT_TYPES = {
      // 消息相关
      MESSAGE_RECEIVED: "MESSAGE_RECEIVED",
      MESSAGE_SENT: "MESSAGE_SENT",
      MESSAGE_UPDATED: "MESSAGE_UPDATED",
      MESSAGE_DELETED: "MESSAGE_DELETED",
      // 生成相关
      GENERATION_STARTED: "GENERATION_STARTED",
      GENERATION_ENDED: "GENERATION_ENDED",
      GENERATION_AFTER_COMMANDS: "GENERATION_AFTER_COMMANDS",
      // 角色相关
      CHARACTER_LOADED: "CHARACTER_LOADED",
      CHARACTER_DELETED: "CHARACTER_DELETED",
      // 聊天相关
      CHAT_CHANGED: "CHAT_CHANGED",
      CHAT_CREATED: "CHAT_CREATED",
      // 世界书相关
      WORLDBOOK_UPDATED: "WORLDBOOK_UPDATED",
      // 扩展相关
      EXTENSIONS_LOADED: "EXTENSIONS_LOADED",
      SETTINGS_LOADED: "SETTINGS_LOADED"
    };
    triggerState = {
      // 已注册的监听器
      listeners: /* @__PURE__ */ new Map(),
      // eventType -> Set<listener>
      // 事件处理器映射
      handlers: /* @__PURE__ */ new Map(),
      // handlerId -> handlerConfig
      // 门控状态
      gateState: {
        lastUserMessageId: null,
        lastUserMessageText: "",
        lastUserMessageAt: 0,
        lastGenerationType: null,
        lastGenerationAt: 0,
        isGenerating: false
      },
      // 是否已初始化
      isInitialized: false,
      // 调试模式
      debugMode: false
    };
    toolTriggerManagerState = {
      initialized: false,
      listeners: /* @__PURE__ */ new Map(),
      lastExecutionContext: null
    };
  }
});

// modules/ui/components/summary-tool-panel.js
var SummaryToolPanel;
var init_summary_tool_panel = __esm({
  "modules/ui/components/summary-tool-panel.js"() {
    init_event_bus();
    init_utils();
    init_tool_registry();
    init_preset_manager();
    init_bypass_manager();
    init_tool_trigger();
    SummaryToolPanel = {
      id: "summaryToolPanel",
      toolId: "summaryTool",
      render() {
        const config = getToolFullConfig(this.toolId);
        if (!config) {
          return `<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>`;
        }
        const apiPresets = this._getApiPresets();
        const bypassPresets = this._getBypassPresets();
        const outputMode = config.output?.mode || "follow_ai";
        const bypassEnabled = config.bypass?.enabled || false;
        const bypassPresetId = config.bypass?.presetId || "";
        const runtimeStatus = config.runtime?.lastStatus || "idle";
        const lastRunText = config.runtime?.lastRunAt ? new Date(config.runtime.lastRunAt).toLocaleString() : "\u672A\u8FD0\u884C";
        const lastError = config.runtime?.lastError || "";
        const modeText = outputMode === "post_response_api" ? "\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002" : "\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";
        return `
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>\u8F93\u51FA\u6A21\u5F0F</span>
          </div>
          <div class="yyt-form-group">
            <label>\u8F93\u51FA\u6A21\u5F0F</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-output-mode">
              <option value="follow_ai" ${outputMode === "follow_ai" ? "selected" : ""}>\u968F AI \u8F93\u51FA\uFF08\u4E0D\u542F\u7528\uFF09</option>
              <option value="post_response_api" ${outputMode === "post_response_api" ? "selected" : ""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
            </select>
            <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${modeText}</div>
          </div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-database"></i>
            <span>API \u9884\u8BBE</span>
          </div>
          <div class="yyt-form-group">
            <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-api-preset">
              <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
              ${apiPresets.map((preset) => `
                <option value="${escapeHtml(preset.name)}" ${preset.name === config.output?.apiPreset ? "selected" : ""}>
                  ${escapeHtml(preset.name)}
                </option>
              `).join("")}
            </select>
            <div class="yyt-tool-compact-hint">\u4EC5\u5728\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u4E0B\u751F\u6548\u3002</div>
          </div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-shield-halved"></i>
            <span>\u7834\u9650\u9884\u8BBE</span>
          </div>
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-bypass-enabled" ${bypassEnabled ? "checked" : ""}>
              <span>\u542F\u7528\u7834\u9650\u8BCD</span>
            </label>
          </div>
          <div class="yyt-form-group yyt-bypass-preset-select ${bypassEnabled ? "" : "yyt-hidden"}">
            <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-bypass-preset">
              <option value="">\u9009\u62E9\u9884\u8BBE</option>
              ${bypassPresets.map((preset) => `
                <option value="${escapeHtml(preset.id)}" ${preset.id === bypassPresetId ? "selected" : ""}>
                  ${escapeHtml(preset.name)}${preset.isDefault ? " [\u9ED8\u8BA4]" : ""}
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-file-code"></i>
            <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
            <div class="yyt-title-actions">
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${SCRIPT_ID}-tool-reset-template">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
              </button>
            </div>
          </div>
          <div class="yyt-form-group">
            <textarea class="yyt-textarea yyt-code-textarea"
                      id="${SCRIPT_ID}-tool-prompt-template"
                      rows="12"
                      placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${escapeHtml(config.promptTemplate || "")}</textarea>
            <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\u3002</div>
          </div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-hand-pointer"></i>
            <span>\u624B\u52A8\u64CD\u4F5C\u533A</span>
          </div>
          <div class="yyt-tool-manual-area">
            <div class="yyt-tool-runtime-card">
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">\u5F53\u524D\u72B6\u6001</span>
                <span class="yyt-tool-runtime-badge yyt-status-${escapeHtml(runtimeStatus)}">${escapeHtml(runtimeStatus)}</span>
              </div>
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                <span class="yyt-tool-runtime-value">${escapeHtml(lastRunText)}</span>
              </div>
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                <span class="yyt-tool-runtime-value">${config.runtime?.successCount || 0} / ${config.runtime?.errorCount || 0}</span>
              </div>
              ${lastError ? `
                <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                  <span class="yyt-tool-runtime-value">${escapeHtml(lastError)}</span>
                </div>
              ` : ""}
            </div>
            <div class="yyt-tool-manual-actions">
              <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-tool-run-manual">
                <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
              </button>
              <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
            </div>
          </div>
        </div>

        <div class="yyt-panel-footer yyt-panel-footer-end">
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-tool-save">
              <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
            </button>
          </div>
        </div>
      </div>
    `;
      },
      _getApiPresets() {
        try {
          return getAllPresets() || [];
        } catch (error) {
          return [];
        }
      },
      _getBypassPresets() {
        try {
          return getPresetList() || [];
        } catch (error) {
          return [];
        }
      },
      _getFormData($container2) {
        const currentConfig = getToolFullConfig(this.toolId);
        const outputMode = $container2.find(`#${SCRIPT_ID}-tool-output-mode`).val() || "follow_ai";
        const bypassEnabled = $container2.find(`#${SCRIPT_ID}-tool-bypass-enabled`).is(":checked");
        const postResponseEnabled = outputMode === "post_response_api";
        return {
          enabled: true,
          promptTemplate: $container2.find(`#${SCRIPT_ID}-tool-prompt-template`).val() || "",
          extractTags: currentConfig?.extractTags || [],
          trigger: {
            event: "GENERATION_ENDED",
            enabled: postResponseEnabled
          },
          output: {
            mode: outputMode,
            apiPreset: $container2.find(`#${SCRIPT_ID}-tool-api-preset`).val() || "",
            overwrite: true,
            enabled: postResponseEnabled
          },
          bypass: {
            enabled: bypassEnabled,
            presetId: bypassEnabled ? $container2.find(`#${SCRIPT_ID}-tool-bypass-preset`).val() || "" : ""
          }
        };
      },
      bindEvents($container2) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find(`#${SCRIPT_ID}-tool-output-mode`).on("change", () => {
          const mode = $container2.find(`#${SCRIPT_ID}-tool-output-mode`).val() || "follow_ai";
          const modeText = mode === "post_response_api" ? "\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002" : "\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";
          $container2.find(".yyt-tool-mode-hint").text(modeText);
        });
        $container2.find(`#${SCRIPT_ID}-tool-bypass-enabled`).on("change", (event) => {
          const enabled = $(event.currentTarget).is(":checked");
          $container2.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden", !enabled);
        });
        $container2.find(`#${SCRIPT_ID}-tool-save`).on("click", () => {
          this._saveConfig($container2, { silent: false });
        });
        $container2.find(`#${SCRIPT_ID}-tool-reset-template`).on("click", () => {
          const defaultConfigs = getAllDefaultToolConfigs();
          const defaultConfig = defaultConfigs[this.toolId];
          if (defaultConfig?.promptTemplate) {
            $container2.find(`#${SCRIPT_ID}-tool-prompt-template`).val(defaultConfig.promptTemplate);
            showToast("info", "\u6A21\u677F\u5DF2\u91CD\u7F6E");
          }
        });
        $container2.find(`#${SCRIPT_ID}-tool-run-manual`).on("click", async () => {
          const saveSuccess = this._saveConfig($container2, { silent: true });
          if (!saveSuccess) {
            return;
          }
          try {
            const result = await runToolManually(this.toolId);
            if (!result?.success && result?.error) {
              showTopNotice("warning", result.error, {
                duration: 3200,
                noticeId: `yyt-tool-run-${this.toolId}`
              });
            }
          } catch (error) {
            showToast("error", error?.message || "\u624B\u52A8\u6267\u884C\u5931\u8D25");
          } finally {
            this.renderTo($container2);
          }
        });
      },
      _saveConfig($container2, options = {}) {
        const config = this._getFormData($container2);
        const { silent = false } = options;
        const success = saveToolConfig(this.toolId, config);
        if (success) {
          if (!silent) {
            showToast("success", "\u914D\u7F6E\u5DF2\u4FDD\u5B58");
          }
          eventBus.emit(EVENTS.TOOL_UPDATED, { toolId: this.toolId, config });
        } else {
          showToast("error", "\u4FDD\u5B58\u5931\u8D25");
        }
        return success;
      },
      destroy($container2) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find("*").off();
      },
      getStyles() {
        return `
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .yyt-tool-compact-hint {
        font-size: 12px;
        color: var(--yyt-text-muted);
        line-height: 1.6;
      }

      .yyt-hidden {
        display: none !important;
      }

      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        line-height: 1.5;
        tab-size: 2;
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
        resize: vertical;
        min-height: 220px;
      }

      .yyt-code-textarea:focus {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
      }

      .yyt-title-actions {
        margin-left: auto;
      }

      .yyt-btn-small {
        padding: 4px 10px;
        font-size: 12px;
      }

      .yyt-checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
      }

      .yyt-checkbox-label input[type="checkbox"] {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }

      .yyt-tool-manual-area {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 16px;
        align-items: start;
      }

      .yyt-tool-runtime-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 14px;
        background: rgba(0, 0, 0, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: var(--yyt-radius-sm);
      }

      .yyt-tool-runtime-line {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        font-size: 12px;
      }

      .yyt-tool-runtime-label {
        color: var(--yyt-text-muted);
        flex-shrink: 0;
      }

      .yyt-tool-runtime-value {
        color: var(--yyt-text);
        text-align: right;
        word-break: break-word;
      }

      .yyt-tool-runtime-badge {
        padding: 3px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
      }

      .yyt-status-idle {
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.06);
      }

      .yyt-status-running {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.12);
      }

      .yyt-status-success {
        color: var(--yyt-success);
        background: rgba(74, 222, 128, 0.12);
      }

      .yyt-status-error {
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.12);
      }

      .yyt-tool-runtime-error .yyt-tool-runtime-value {
        color: var(--yyt-danger);
      }

      .yyt-tool-manual-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 180px;
      }

      .yyt-error {
        padding: 20px;
        text-align: center;
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: var(--yyt-radius-sm);
      }

      .yyt-panel-footer-end {
        justify-content: flex-end;
      }

      @media screen and (max-width: 768px) {
        .yyt-tool-manual-area {
          grid-template-columns: 1fr;
        }

        .yyt-tool-manual-actions {
          min-width: 0;
        }
      }
    `;
      },
      renderTo($container2) {
        $container2.html(this.render({}));
        this.bindEvents($container2, {});
      }
    };
  }
});

// modules/ui/components/status-block-panel.js
var StatusBlockPanel;
var init_status_block_panel = __esm({
  "modules/ui/components/status-block-panel.js"() {
    init_event_bus();
    init_utils();
    init_tool_registry();
    init_preset_manager();
    init_bypass_manager();
    init_tool_trigger();
    StatusBlockPanel = {
      id: "statusBlockPanel",
      toolId: "statusBlock",
      render() {
        const config = getToolFullConfig(this.toolId);
        if (!config) {
          return `<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>`;
        }
        const apiPresets = this._getApiPresets();
        const bypassPresets = this._getBypassPresets();
        const outputMode = config.output?.mode || "follow_ai";
        const bypassEnabled = config.bypass?.enabled || false;
        const bypassPresetId = config.bypass?.presetId || "";
        const runtimeStatus = config.runtime?.lastStatus || "idle";
        const lastRunText = config.runtime?.lastRunAt ? new Date(config.runtime.lastRunAt).toLocaleString() : "\u672A\u8FD0\u884C";
        const lastError = config.runtime?.lastError || "";
        const modeText = outputMode === "post_response_api" ? "\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002" : "\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";
        return `
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>\u8F93\u51FA\u6A21\u5F0F</span>
          </div>
          <div class="yyt-form-group">
            <label>\u8F93\u51FA\u6A21\u5F0F</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-output-mode">
              <option value="follow_ai" ${outputMode === "follow_ai" ? "selected" : ""}>\u968F AI \u8F93\u51FA\uFF08\u4E0D\u542F\u7528\uFF09</option>
              <option value="post_response_api" ${outputMode === "post_response_api" ? "selected" : ""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
            </select>
            <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${modeText}</div>
          </div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-database"></i>
            <span>API \u9884\u8BBE</span>
          </div>
          <div class="yyt-form-group">
            <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-api-preset">
              <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
              ${apiPresets.map((preset) => `
                <option value="${escapeHtml(preset.name)}" ${preset.name === config.output?.apiPreset ? "selected" : ""}>
                  ${escapeHtml(preset.name)}
                </option>
              `).join("")}
            </select>
            <div class="yyt-tool-compact-hint">\u4EC5\u5728\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u4E0B\u751F\u6548\u3002</div>
          </div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-shield-halved"></i>
            <span>\u7834\u9650\u9884\u8BBE</span>
          </div>
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-bypass-enabled" ${bypassEnabled ? "checked" : ""}>
              <span>\u542F\u7528\u7834\u9650\u8BCD</span>
            </label>
          </div>
          <div class="yyt-form-group yyt-bypass-preset-select ${bypassEnabled ? "" : "yyt-hidden"}">
            <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
            <select class="yyt-select" id="${SCRIPT_ID}-tool-bypass-preset">
              <option value="">\u9009\u62E9\u9884\u8BBE</option>
              ${bypassPresets.map((preset) => `
                <option value="${escapeHtml(preset.id)}" ${preset.id === bypassPresetId ? "selected" : ""}>
                  ${escapeHtml(preset.name)}${preset.isDefault ? " [\u9ED8\u8BA4]" : ""}
                </option>
              `).join("")}
            </select>
          </div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-file-code"></i>
            <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
            <div class="yyt-title-actions">
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${SCRIPT_ID}-tool-reset-template">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
              </button>
            </div>
          </div>
          <div class="yyt-form-group">
            <textarea class="yyt-textarea yyt-code-textarea"
                      id="${SCRIPT_ID}-tool-prompt-template"
                      rows="12"
                      placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${escapeHtml(config.promptTemplate || "")}</textarea>
            <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\u3002</div>
          </div>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-hand-pointer"></i>
            <span>\u624B\u52A8\u64CD\u4F5C\u533A</span>
          </div>
          <div class="yyt-tool-manual-area">
            <div class="yyt-tool-runtime-card">
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">\u5F53\u524D\u72B6\u6001</span>
                <span class="yyt-tool-runtime-badge yyt-status-${escapeHtml(runtimeStatus)}">${escapeHtml(runtimeStatus)}</span>
              </div>
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                <span class="yyt-tool-runtime-value">${escapeHtml(lastRunText)}</span>
              </div>
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                <span class="yyt-tool-runtime-value">${config.runtime?.successCount || 0} / ${config.runtime?.errorCount || 0}</span>
              </div>
              ${lastError ? `
                <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                  <span class="yyt-tool-runtime-value">${escapeHtml(lastError)}</span>
                </div>
              ` : ""}
            </div>
            <div class="yyt-tool-manual-actions">
              <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-tool-run-manual">
                <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
              </button>
              <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
            </div>
          </div>
        </div>

        <div class="yyt-panel-footer yyt-panel-footer-end">
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-tool-save">
              <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
            </button>
          </div>
        </div>
      </div>
    `;
      },
      _getApiPresets() {
        try {
          return getAllPresets() || [];
        } catch (error) {
          return [];
        }
      },
      _getBypassPresets() {
        try {
          return getPresetList() || [];
        } catch (error) {
          return [];
        }
      },
      _getFormData($container2) {
        const currentConfig = getToolFullConfig(this.toolId);
        const outputMode = $container2.find(`#${SCRIPT_ID}-tool-output-mode`).val() || "follow_ai";
        const bypassEnabled = $container2.find(`#${SCRIPT_ID}-tool-bypass-enabled`).is(":checked");
        const postResponseEnabled = outputMode === "post_response_api";
        return {
          enabled: true,
          promptTemplate: $container2.find(`#${SCRIPT_ID}-tool-prompt-template`).val() || "",
          extractTags: currentConfig?.extractTags || [],
          trigger: {
            event: "GENERATION_ENDED",
            enabled: postResponseEnabled
          },
          output: {
            mode: outputMode,
            apiPreset: $container2.find(`#${SCRIPT_ID}-tool-api-preset`).val() || "",
            overwrite: true,
            enabled: postResponseEnabled
          },
          bypass: {
            enabled: bypassEnabled,
            presetId: bypassEnabled ? $container2.find(`#${SCRIPT_ID}-tool-bypass-preset`).val() || "" : ""
          }
        };
      },
      bindEvents($container2) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find(`#${SCRIPT_ID}-tool-output-mode`).on("change", () => {
          const mode = $container2.find(`#${SCRIPT_ID}-tool-output-mode`).val() || "follow_ai";
          const modeText = mode === "post_response_api" ? "\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002" : "\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";
          $container2.find(".yyt-tool-mode-hint").text(modeText);
        });
        $container2.find(`#${SCRIPT_ID}-tool-bypass-enabled`).on("change", (event) => {
          const enabled = $(event.currentTarget).is(":checked");
          $container2.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden", !enabled);
        });
        $container2.find(`#${SCRIPT_ID}-tool-save`).on("click", () => {
          this._saveConfig($container2, { silent: false });
        });
        $container2.find(`#${SCRIPT_ID}-tool-reset-template`).on("click", () => {
          const defaultConfigs = getAllDefaultToolConfigs();
          const defaultConfig = defaultConfigs[this.toolId];
          if (defaultConfig?.promptTemplate) {
            $container2.find(`#${SCRIPT_ID}-tool-prompt-template`).val(defaultConfig.promptTemplate);
            showToast("info", "\u6A21\u677F\u5DF2\u91CD\u7F6E");
          }
        });
        $container2.find(`#${SCRIPT_ID}-tool-run-manual`).on("click", async () => {
          const saveSuccess = this._saveConfig($container2, { silent: true });
          if (!saveSuccess) {
            return;
          }
          try {
            const result = await runToolManually(this.toolId);
            if (!result?.success && result?.error) {
              showTopNotice("warning", result.error, {
                duration: 3200,
                noticeId: `yyt-tool-run-${this.toolId}`
              });
            }
          } catch (error) {
            showToast("error", error?.message || "\u624B\u52A8\u6267\u884C\u5931\u8D25");
          } finally {
            this.renderTo($container2);
          }
        });
      },
      _saveConfig($container2, options = {}) {
        const config = this._getFormData($container2);
        const { silent = false } = options;
        const success = saveToolConfig(this.toolId, config);
        if (success) {
          if (!silent) {
            showToast("success", "\u914D\u7F6E\u5DF2\u4FDD\u5B58");
          }
          eventBus.emit(EVENTS.TOOL_UPDATED, { toolId: this.toolId, config });
        } else {
          showToast("error", "\u4FDD\u5B58\u5931\u8D25");
        }
        return success;
      },
      destroy($container2) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find("*").off();
      },
      getStyles() {
        return `
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .yyt-tool-compact-hint {
        font-size: 12px;
        color: var(--yyt-text-muted);
        line-height: 1.6;
      }

      .yyt-hidden {
        display: none !important;
      }

      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        line-height: 1.5;
        tab-size: 2;
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
        resize: vertical;
        min-height: 220px;
      }

      .yyt-code-textarea:focus {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
      }

      .yyt-title-actions {
        margin-left: auto;
      }

      .yyt-btn-small {
        padding: 4px 10px;
        font-size: 12px;
      }

      .yyt-checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
      }

      .yyt-checkbox-label input[type="checkbox"] {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }

      .yyt-tool-manual-area {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 16px;
        align-items: start;
      }

      .yyt-tool-runtime-card {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 14px;
        background: rgba(0, 0, 0, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: var(--yyt-radius-sm);
      }

      .yyt-tool-runtime-line {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        font-size: 12px;
      }

      .yyt-tool-runtime-label {
        color: var(--yyt-text-muted);
        flex-shrink: 0;
      }

      .yyt-tool-runtime-value {
        color: var(--yyt-text);
        text-align: right;
        word-break: break-word;
      }

      .yyt-tool-runtime-badge {
        padding: 3px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
      }

      .yyt-status-idle {
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.06);
      }

      .yyt-status-running {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.12);
      }

      .yyt-status-success {
        color: var(--yyt-success);
        background: rgba(74, 222, 128, 0.12);
      }

      .yyt-status-error {
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.12);
      }

      .yyt-tool-runtime-error .yyt-tool-runtime-value {
        color: var(--yyt-danger);
      }

      .yyt-tool-manual-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 180px;
      }

      .yyt-error {
        padding: 20px;
        text-align: center;
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: var(--yyt-radius-sm);
      }

      .yyt-panel-footer-end {
        justify-content: flex-end;
      }

      @media screen and (max-width: 768px) {
        .yyt-tool-manual-area {
          grid-template-columns: 1fr;
        }

        .yyt-tool-manual-actions {
          min-width: 0;
        }
      }
    `;
      },
      renderTo($container2) {
        $container2.html(this.render({}));
        this.bindEvents($container2, {});
      }
    };
  }
});

// modules/ui/components/bypass-panel.js
var bypass_panel_exports = {};
__export(bypass_panel_exports, {
  BypassPanel: () => BypassPanel,
  default: () => bypass_panel_default
});
var BypassPanel, bypass_panel_default;
var init_bypass_panel = __esm({
  "modules/ui/components/bypass-panel.js"() {
    init_event_bus();
    init_bypass_manager();
    init_utils();
    BypassPanel = {
      id: "bypassPanel",
      // ============================================================
      // 渲染
      // ============================================================
      /**
       * 渲染组件
       * @param {Object} props
       * @returns {string} HTML
       */
      render(props) {
        const presets = bypassManager.getPresetList();
        const defaultPresetId = bypassManager.getDefaultPresetId();
        return `
      <div class="yyt-bypass-panel">
        <!-- \u5DE6\u4FA7\u9884\u8BBE\u5217\u8868 -->
        <div class="yyt-bypass-sidebar">
          <div class="yyt-bypass-sidebar-header">
            <span class="yyt-bypass-sidebar-title">\u7834\u9650\u8BCD\u9884\u8BBE</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="yyt-bypass-add">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="yyt-bypass-preset-list">
            ${presets.map((preset) => this._renderPresetItem(preset, preset.id === defaultPresetId)).join("")}
          </div>
          <div class="yyt-bypass-sidebar-footer">
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-import" title="\u5BFC\u5165">
              <i class="fa-solid fa-file-import"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-export" title="\u5BFC\u51FA\u5168\u90E8">
              <i class="fa-solid fa-file-export"></i>
            </button>
            <input type="file" id="yyt-bypass-import-file" accept=".json" style="display:none">
          </div>
        </div>
        
        <!-- \u53F3\u4FA7\u7F16\u8F91\u533A -->
        <div class="yyt-bypass-editor" id="yyt-bypass-editor">
          <div class="yyt-bypass-empty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
          </div>
        </div>
      </div>
    `;
      },
      /**
       * 渲染预设列表项
       * @private
       */
      _renderPresetItem(preset, isDefault) {
        const isBuiltIn = DEFAULT_BYPASS_PRESETS && DEFAULT_BYPASS_PRESETS[preset.id];
        return `
      <div class="yyt-bypass-preset-item ${isDefault ? "yyt-default" : ""}" data-preset-id="${preset.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${escapeHtml(preset.name)}</span>
          <span class="yyt-bypass-preset-count">${preset.messages?.length || 0} \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-bypass-preset-actions">
          ${isDefault ? '<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>' : ""}
          ${!isBuiltIn ? `
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-quick-delete" title="\u5220\u9664\u9884\u8BBE" data-preset-id="${preset.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          ` : ""}
        </div>
      </div>
    `;
      },
      /**
       * 渲染编辑器
       * @private
       */
      _renderEditor(preset) {
        if (!preset) {
          return `
        <div class="yyt-bypass-empty">
          <i class="fa-solid fa-shield-halved"></i>
          <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
        </div>
      `;
        }
        const isDefaultPreset = bypassManager.getDefaultPresetId() === preset.id;
        const isBuiltIn = DEFAULT_BYPASS_PRESETS && DEFAULT_BYPASS_PRESETS[preset.id];
        return `
      <div class="yyt-bypass-editor-content" data-preset-id="${preset.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${escapeHtml(preset.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-bypass-editor-actions">
            ${!isBuiltIn ? `
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-duplicate" title="\u590D\u5236">
                <i class="fa-solid fa-copy"></i>
              </button>
              <button class="yyt-btn yyt-btn-small yyt-btn-danger" id="yyt-bypass-delete" title="\u5220\u9664">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : ""}
            <button class="yyt-btn yyt-btn-small ${isDefaultPreset ? "yyt-btn-primary" : "yyt-btn-secondary"}" 
                    id="yyt-bypass-set-default" title="\u8BBE\u4E3A\u9ED8\u8BA4">
              <i class="fa-solid fa-star"></i>
            </button>
          </div>
        </div>
        
        <div class="yyt-bypass-editor-desc">
          <input type="text" class="yyt-input" id="yyt-bypass-description" 
                 value="${escapeHtml(preset.description || "")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(preset.messages || []).map((msg) => this._renderMessageItem(msg)).join("")}
        </div>
        
        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `;
      },
      /**
       * 渲染消息项
       * @private
       */
      _renderMessageItem(message) {
        const roleIcons = {
          "SYSTEM": "fa-server",
          "USER": "fa-user",
          "assistant": "fa-robot"
        };
        return `
      <div class="yyt-bypass-message ${message.enabled === false ? "yyt-disabled" : ""}" data-message-id="${message.id}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${roleIcons[message.role] || "fa-comment"}"></i>
            <select class="yyt-select yyt-bypass-role-select">
              <option value="SYSTEM" ${message.role === "SYSTEM" ? "selected" : ""}>SYSTEM</option>
              <option value="USER" ${message.role === "USER" ? "selected" : ""}>USER</option>
              <option value="assistant" ${message.role === "assistant" ? "selected" : ""}>assistant</option>
            </select>
          </div>
          <div class="yyt-bypass-message-controls">
            <label class="yyt-toggle yyt-small">
              <input type="checkbox" class="yyt-bypass-message-enabled" ${message.enabled !== false ? "checked" : ""}>
              <span class="yyt-toggle-slider"></span>
            </label>
            ${message.deletable !== false ? `
              <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-delete-message" title="\u5220\u9664">
                <i class="fa-solid fa-times"></i>
              </button>
            ` : ""}
          </div>
        </div>
        <textarea class="yyt-textarea yyt-bypass-message-content" rows="3" 
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${escapeHtml(message.content || "")}</textarea>
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
      bindEvents($container2, dependencies) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        this._bindPresetListEvents($container2, $);
        this._bindEditorEvents($container2, $);
        this._bindFileEvents($container2, $);
      },
      /**
       * 绑定预设列表事件
       * @private
       */
      _bindPresetListEvents($container2, $) {
        $container2.on("click", ".yyt-bypass-preset-item", (e) => {
          if ($(e.target).closest(".yyt-bypass-quick-delete").length) {
            return;
          }
          const presetId = $(e.currentTarget).data("presetId");
          this._selectPreset($container2, $, presetId);
        });
        $container2.on("click", ".yyt-bypass-quick-delete", (e) => {
          e.stopPropagation();
          const presetId = $(e.currentTarget).data("presetId");
          if (!presetId)
            return;
          if (!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))
            return;
          const result = bypassManager.deletePreset(presetId);
          if (result.success) {
            const $editor = $container2.find(".yyt-bypass-editor-content");
            const currentPresetId = $editor.data("presetId");
            if (currentPresetId === presetId) {
              $container2.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `);
            }
            this._refreshPresetList($container2, $);
            showToast("success", "\u9884\u8BBE\u5DF2\u5220\u9664");
          } else {
            showToast("error", result?.message || "\u5220\u9664\u9884\u8BBE\u5931\u8D25");
          }
        });
        $container2.find("#yyt-bypass-add").on("click", () => {
          this._createNewPreset($container2, $);
        });
      },
      /**
       * 绑定编辑器事件
       * @private
       */
      _bindEditorEvents($container2, $) {
        $container2.on("click", "#yyt-bypass-save", () => {
          this._saveCurrentPreset($container2, $);
        });
        $container2.on("click", "#yyt-bypass-delete", () => {
          this._deleteCurrentPreset($container2, $);
        });
        $container2.on("click", "#yyt-bypass-duplicate", () => {
          this._duplicateCurrentPreset($container2, $);
        });
        $container2.on("click", "#yyt-bypass-set-default", () => {
          this._setAsDefault($container2, $);
        });
        $container2.on("click", "#yyt-bypass-add-message", () => {
          this._addMessage($container2, $);
        });
        $container2.on("click", ".yyt-bypass-delete-message", (e) => {
          const $message = $(e.currentTarget).closest(".yyt-bypass-message");
          const messageId = $message.data("messageId");
          $message.remove();
        });
        $container2.on("change", ".yyt-bypass-message-enabled", (e) => {
          const $message = $(e.currentTarget).closest(".yyt-bypass-message");
          $message.toggleClass("yyt-disabled", !$(e.currentTarget).is(":checked"));
        });
      },
      /**
       * 绑定文件事件
       * @private
       */
      _bindFileEvents($container2, $) {
        $container2.find("#yyt-bypass-import").on("click", () => {
          $container2.find("#yyt-bypass-import-file").click();
        });
        $container2.find("#yyt-bypass-import-file").on("change", async (e) => {
          const file = e.target.files[0];
          if (!file)
            return;
          try {
            const text = await readFileContent(file);
            const result = bypassManager.importPresets(text);
            showToast(result.success ? "success" : "error", result.message);
            if (result.success)
              this.renderTo($container2);
          } catch (err) {
            showToast("error", `\u5BFC\u5165\u5931\u8D25: ${err.message}`);
          }
          $(e.target).val("");
        });
        $container2.find("#yyt-bypass-export").on("click", () => {
          try {
            const json = bypassManager.exportPresets();
            downloadJson(json, `bypass_presets_${Date.now()}.json`);
            showToast("success", "\u9884\u8BBE\u5DF2\u5BFC\u51FA");
          } catch (err) {
            showToast("error", `\u5BFC\u51FA\u5931\u8D25: ${err.message}`);
          }
        });
      },
      // ============================================================
      // 私有操作方法
      // ============================================================
      /**
       * 选择预设
       * @private
       */
      _selectPreset($container2, $, presetId) {
        const preset = bypassManager.getPreset(presetId);
        if (!preset)
          return;
        $container2.find(".yyt-bypass-preset-item").removeClass("yyt-active");
        $container2.find(`.yyt-bypass-preset-item[data-preset-id="${presetId}"]`).addClass("yyt-active");
        $container2.find("#yyt-bypass-editor").html(this._renderEditor(preset));
      },
      /**
       * 创建新预设
       * @private
       */
      _createNewPreset($container2, $) {
        const id = `bypass_${Date.now()}`;
        const result = bypassManager.createPreset({
          id,
          name: "\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",
          description: "",
          messages: []
        });
        if (result.success) {
          this.renderTo($container2);
          this._selectPreset($container2, $, id);
          showToast("success", "\u9884\u8BBE\u5DF2\u521B\u5EFA");
        } else {
          showToast("error", result?.message || "\u521B\u5EFA\u9884\u8BBE\u5931\u8D25");
        }
      },
      /**
       * 保存当前预设
       * @private
       */
      _saveCurrentPreset($container2, $) {
        const $editor = $container2.find(".yyt-bypass-editor-content");
        const presetId = $editor.data("presetId");
        if (!presetId)
          return;
        const name = $editor.find(".yyt-bypass-name-input").val().trim();
        const description = $editor.find("#yyt-bypass-description").val().trim();
        if (!name) {
          showToast("warning", "\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");
          return;
        }
        const messages = [];
        $editor.find(".yyt-bypass-message").each(function() {
          const $msg = $(this);
          messages.push({
            id: $msg.data("messageId"),
            role: $msg.find(".yyt-bypass-role-select").val(),
            content: $msg.find(".yyt-bypass-message-content").val(),
            enabled: $msg.find(".yyt-bypass-message-enabled").is(":checked"),
            deletable: true
          });
        });
        const result = bypassManager.updatePreset(presetId, {
          name,
          description,
          messages
        });
        if (result.success) {
          showToast("success", "\u9884\u8BBE\u5DF2\u4FDD\u5B58");
          this._refreshPresetList($container2, $);
        } else {
          showToast("error", result?.message || "\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25");
        }
      },
      /**
       * 删除当前预设
       * @private
       */
      _deleteCurrentPreset($container2, $) {
        const $editor = $container2.find(".yyt-bypass-editor-content");
        const presetId = $editor.data("presetId");
        if (!presetId)
          return;
        if (!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))
          return;
        const result = bypassManager.deletePreset(presetId);
        if (result.success) {
          this.renderTo($container2);
          showToast("success", "\u9884\u8BBE\u5DF2\u5220\u9664");
        } else {
          showToast("error", result?.message || "\u5220\u9664\u9884\u8BBE\u5931\u8D25");
        }
      },
      /**
       * 复制当前预设
       * @private
       */
      _duplicateCurrentPreset($container2, $) {
        const $editor = $container2.find(".yyt-bypass-editor-content");
        const presetId = $editor.data("presetId");
        if (!presetId)
          return;
        const newId = `bypass_${Date.now()}`;
        const result = bypassManager.duplicatePreset(presetId, newId);
        if (result.success) {
          this.renderTo($container2);
          this._selectPreset($container2, $, newId);
          showToast("success", "\u9884\u8BBE\u5DF2\u590D\u5236");
        } else {
          showToast("error", result?.message || "\u590D\u5236\u9884\u8BBE\u5931\u8D25");
        }
      },
      /**
       * 设为默认预设
       * @private
       */
      _setAsDefault($container2, $) {
        const $editor = $container2.find(".yyt-bypass-editor-content");
        const presetId = $editor.data("presetId");
        if (!presetId)
          return;
        bypassManager.setDefaultPresetId(presetId);
        $container2.find(".yyt-bypass-preset-item").removeClass("yyt-default");
        $container2.find(`.yyt-bypass-preset-item[data-preset-id="${presetId}"]`).addClass("yyt-default");
        $container2.find(".yyt-bypass-default-badge").remove();
        $container2.find(`.yyt-bypass-preset-item[data-preset-id="${presetId}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>');
        showToast("success", "\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE");
      },
      /**
       * 添加消息
       * @private
       */
      _addMessage($container2, $) {
        const $messages = $container2.find("#yyt-bypass-messages");
        const newMessage = {
          id: `msg_${Date.now()}`,
          role: "SYSTEM",
          content: "",
          enabled: true,
          deletable: true
        };
        $messages.append(this._renderMessageItem(newMessage));
      },
      /**
       * 刷新预设列表
       * @private
       */
      _refreshPresetList($container2, $) {
        const presets = bypassManager.getPresetList();
        const defaultPresetId = bypassManager.getDefaultPresetId();
        $container2.find(".yyt-bypass-preset-list").html(
          presets.map((preset) => this._renderPresetItem(preset, preset.id === defaultPresetId)).join("")
        );
      },
      // ============================================================
      // 销毁
      // ============================================================
      /**
       * 销毁组件
       * @param {Object} $container
       */
      destroy($container2) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find("*").off();
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
      /* \u7834\u9650\u8BCD\u9762\u677F\u6837\u5F0F */
      .yyt-bypass-panel {
        display: flex;
        height: 100%;
        gap: 16px;
      }
      
      .yyt-bypass-sidebar {
        width: 220px;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
        flex-shrink: 0;
      }
      
      .yyt-bypass-sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-sidebar-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-list {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
      }
      
      .yyt-bypass-preset-item {
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      
      .yyt-bypass-preset-item:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      
      .yyt-bypass-preset-item.yyt-active {
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-bypass-preset-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        min-width: 0;
      }
      
      .yyt-bypass-preset-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        opacity: 0.5;
        transition: opacity 0.2s ease;
      }
      
      .yyt-bypass-preset-item:hover .yyt-bypass-preset-actions {
        opacity: 1;
      }
      
      .yyt-bypass-quick-delete {
        padding: 4px 8px !important;
        font-size: 10px !important;
      }
      
      .yyt-bypass-preset-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-count {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-default-badge {
        font-size: 10px;
        padding: 2px 6px;
        background: rgba(123, 183, 255, 0.15);
        color: var(--yyt-accent);
        border-radius: 4px;
        margin-top: 4px;
        display: inline-block;
      }
      
      .yyt-bypass-sidebar-footer {
        display: flex;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-sidebar-footer .yyt-btn {
        flex: 1;
      }
      
      .yyt-bypass-editor {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
        overflow: hidden;
      }
      
      .yyt-bypass-empty {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-empty i {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.3;
      }
      
      .yyt-bypass-editor-content {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .yyt-bypass-editor-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-editor-title {
        flex: 1;
        margin-right: 16px;
      }
      
      .yyt-bypass-name-input {
        font-size: 15px;
        font-weight: 600;
        background: transparent;
        border: none;
        padding: 8px 0;
      }
      
      .yyt-bypass-name-input:focus {
        border-bottom: 1px solid var(--yyt-accent);
      }
      
      .yyt-bypass-editor-actions {
        display: flex;
        gap: 8px;
      }
      
      .yyt-bypass-editor-desc {
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-messages-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .yyt-bypass-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .yyt-bypass-message {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 14px;
      }
      
      .yyt-bypass-message.yyt-disabled {
        opacity: 0.5;
      }
      
      .yyt-bypass-message-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      
      .yyt-bypass-message-role {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-bypass-message-role i {
        color: var(--yyt-accent);
      }
      
      .yyt-bypass-role-select {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        padding: 4px 8px;
        font-size: 12px;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-message-controls {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-bypass-message-content {
        min-height: 80px;
      }
      
      .yyt-bypass-editor-footer {
        padding: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: flex-end;
      }
      
      .yyt-toggle.yyt-small {
        transform: scale(0.8);
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
      renderTo($container2) {
        const html = this.render({});
        $container2.html(html);
        this.bindEvents($container2, {});
      }
    };
    bypass_panel_default = BypassPanel;
  }
});

// modules/ui/index.js
function registerComponents() {
  uiManager.register(ApiPresetPanel.id, ApiPresetPanel);
  uiManager.register(RegexExtractPanel.id, RegexExtractPanel);
  uiManager.register(ToolManagePanel.id, ToolManagePanel);
  uiManager.register(SummaryToolPanel.id, SummaryToolPanel);
  uiManager.register(StatusBlockPanel.id, StatusBlockPanel);
  uiManager.register(BypassPanel.id, BypassPanel);
  console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210");
}
function initUI(options = {}) {
  uiManager.init(options);
  registerComponents();
  uiManager.injectStyles();
  console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210");
}
var init_ui = __esm({
  "modules/ui/index.js"() {
    init_ui_manager();
    init_api_preset_panel();
    init_regex_extract_panel();
    init_tool_manage_panel();
    init_summary_tool_panel();
    init_status_block_panel();
    init_bypass_panel();
    init_utils();
    init_ui_manager();
    init_api_preset_panel();
    init_regex_extract_panel();
    init_tool_manage_panel();
    init_summary_tool_panel();
    init_status_block_panel();
    init_bypass_panel();
  }
});

// modules/ui-components.js
var ui_components_exports = {};
__export(ui_components_exports, {
  ApiPresetPanel: () => ApiPresetPanel,
  RegexExtractPanel: () => RegexExtractPanel,
  SCRIPT_ID: () => SCRIPT_ID,
  StatusBlockPanel: () => StatusBlockPanel,
  SummaryToolPanel: () => SummaryToolPanel,
  ToolManagePanel: () => ToolManagePanel,
  default: () => ui_components_default,
  escapeHtml: () => escapeHtml,
  fillFormWithConfig: () => fillFormWithConfig,
  getCurrentTab: () => getCurrentTab,
  getFormApiConfig: () => getFormApiConfig,
  getJQuery: () => getJQuery,
  getRegexStyles: () => getRegexStyles,
  getStyles: () => getStyles,
  getToolStyles: () => getToolStyles,
  initUI: () => initUI,
  isContainerValid: () => isContainerValid,
  registerComponents: () => registerComponents,
  render: () => render,
  renderRegex: () => renderRegex,
  renderTool: () => renderTool,
  setCurrentTab: () => setCurrentTab,
  showToast: () => showToast,
  uiManager: () => uiManager
});
function render(container) {
  const $ = getJQuery();
  if (!$) {
    console.error("[YouYouToolkit] jQuery not available");
    return;
  }
  if (container) {
    if (typeof container === "string") {
      $container = $(container);
    } else if (container && container.jquery) {
      $container = container;
    } else if (container) {
      $container = $(container);
    }
  }
  if (!$container || !$container.length) {
    console.error("[YouYouToolkit] Container not found or invalid");
    return;
  }
  ApiPresetPanel.renderTo($container);
}
function renderRegex(container) {
  const $ = getJQuery();
  if (!$) {
    console.error("[YouYouToolkit] jQuery not available");
    return;
  }
  if (container) {
    if (typeof container === "string") {
      $regexContainer = $(container);
    } else if (container && container.jquery) {
      $regexContainer = container;
    } else if (container) {
      $regexContainer = $(container);
    }
  }
  if (!$regexContainer || !$regexContainer.length) {
    console.error("[YouYouToolkit] Regex container not found");
    return;
  }
  RegexExtractPanel.renderTo($regexContainer);
}
function renderTool(container) {
  const $ = getJQuery();
  if (!$) {
    console.error("[YouYouToolkit] jQuery not available");
    return;
  }
  if (container) {
    if (typeof container === "string") {
      $toolContainer = $(container);
    } else if (container && container.jquery) {
      $toolContainer = container;
    } else if (container) {
      $toolContainer = $(container);
    }
  }
  if (!$toolContainer || !$toolContainer.length) {
    console.error("[YouYouToolkit] Tool container not found");
    return;
  }
  ToolManagePanel.renderTo($toolContainer);
}
function getStyles() {
  return ApiPresetPanel.getStyles();
}
function getRegexStyles() {
  return RegexExtractPanel.getStyles();
}
function getToolStyles() {
  return [
    ToolManagePanel.getStyles(),
    SummaryToolPanel.getStyles(),
    StatusBlockPanel.getStyles()
  ].join("\n");
}
function getCurrentTab() {
  return uiManager.getCurrentTab();
}
function setCurrentTab(tab) {
  uiManager.switchTab(tab);
}
var $container, $regexContainer, $toolContainer, ui_components_default;
var init_ui_components = __esm({
  "modules/ui-components.js"() {
    init_ui();
    $container = null;
    $regexContainer = null;
    $toolContainer = null;
    ui_components_default = {
      // 渲染函数
      render,
      renderRegex,
      renderTool,
      // 样式函数
      getStyles,
      getRegexStyles,
      getToolStyles,
      // 标签页管理
      getCurrentTab,
      setCurrentTab,
      // 新模块API
      uiManager,
      ApiPresetPanel,
      RegexExtractPanel,
      ToolManagePanel,
      SummaryToolPanel,
      StatusBlockPanel,
      registerComponents,
      initUI,
      // 工具函数
      SCRIPT_ID,
      escapeHtml,
      showToast,
      getJQuery,
      isContainerValid,
      getFormApiConfig,
      fillFormWithConfig
    };
  }
});

// modules/window-manager.js
var window_manager_exports = {};
__export(window_manager_exports, {
  WindowManager: () => WindowManager,
  closeWindow: () => closeWindow,
  createWindow: () => createWindow,
  windowManager: () => windowManager
});
function injectWindowStyles() {
  if (windowManager.stylesInjected)
    return;
  windowManager.stylesInjected = true;
  const css = `
    /* ============================================================
       YouYou Toolkit - \u72EC\u7ACB\u7A97\u53E3\u7CFB\u7EDF\u6837\u5F0F
       ============================================================ */
    
    .yyt-window-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
      animation: yytWindowFadeIn 0.2s ease-out;
    }
    
    @keyframes yytWindowFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .yyt-window {
      position: fixed;
      display: flex;
      flex-direction: column;
      background:
        radial-gradient(1200px 600px at 10% -10%, rgba(123, 183, 255, 0.12), transparent 60%),
        radial-gradient(900px 500px at 100% 0%, rgba(155, 123, 255, 0.10), transparent 55%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
        #0b0f15;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 25px 80px rgba(0, 0, 0, 0.65),
        0 0 60px rgba(123, 183, 255, 0.1);
      min-width: 400px;
      min-height: 300px;
      animation: yytWindowSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
    }
    
    @keyframes yytWindowSlideIn {
      from { 
        opacity: 0; 
        transform: scale(0.95) translateY(-20px); 
      }
      to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    
    .yyt-window.maximized {
      top: 10px !important;
      left: 10px !important;
      width: calc(100vw - 20px) !important;
      height: calc(100vh - 20px) !important;
      border-radius: 12px;
    }
    
    /* \u7A84\u5C4F\u6A21\u5F0F */
    @media screen and (max-width: 1100px) {
      .yyt-window.maximized {
        top: 5px !important;
        left: 5px !important;
        width: calc(100vw - 10px) !important;
        height: calc(100vh - 10px) !important;
        border-radius: 8px;
      }
      
      .yyt-window-header {
        padding: 10px 12px;
      }
      
      .yyt-window-controls {
        gap: 6px;
        margin-right: 0;
      }
      
      .yyt-window-btn {
        width: 32px;
        height: 32px;
      }
      
      .yyt-window {
        min-width: 320px;
      }
    }
    
    /* \u8D85\u7A84\u5C4F\u6A21\u5F0F */
    @media screen and (max-width: 768px) {
      .yyt-window {
        min-width: 100vw !important;
        min-height: 100vh !important;
      }
      
      .yyt-window.maximized {
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0;
        border: none;
      }
      
      .yyt-window-header {
        padding: 8px 10px;
        min-height: 44px;
        flex-shrink: 0;
      }
      
      .yyt-window-controls {
        margin-right: 0;
      }
      
      .yyt-window-title {
        font-size: 13px;
      }
      
      .yyt-window-btn {
        width: 36px;
        height: 36px;
        font-size: 16px;
      }
      
      .yyt-window-body {
        max-width: 100vw;
        overflow-x: hidden;
        overflow-y: auto;
        flex: 1 1 0;
        min-height: 0;
      }
    }
    
    .yyt-window-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      cursor: move;
      user-select: none;
      flex-shrink: 0;
    }
    
    .yyt-window-title {
      font-size: 14px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
    
    .yyt-window-title i {
      color: rgba(123, 183, 255, 0.85);
      flex-shrink: 0;
    }
    
    .yyt-window-title span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .yyt-window-controls {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
      margin-left: 8px;
    }
    
    .yyt-window-btn {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    
    .yyt-window-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-window-btn.close:hover {
      background: rgba(255, 107, 107, 0.25);
      color: #ff6b6b;
    }
    
    .yyt-window-body {
      flex: 1 1 0;
      min-height: 0;
      overflow: auto;
      overflow-x: hidden;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    
    .yyt-window-body > * {
      flex: 1 1 0;
      min-height: 0;
      overflow-y: auto;
      box-sizing: border-box;
    }
    
    /* \u7A97\u53E3\u5927\u5C0F\u8C03\u6574\u624B\u67C4 */
    .yyt-window-resize-handle {
      position: absolute;
      background: transparent;
    }
    
    .yyt-window-resize-handle.se {
      right: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
    }
    
    .yyt-window-resize-handle.se::after {
      content: '';
      position: absolute;
      right: 4px;
      bottom: 4px;
      width: 10px;
      height: 10px;
      border-right: 2px solid rgba(255, 255, 255, 0.25);
      border-bottom: 2px solid rgba(255, 255, 255, 0.25);
    }
    
    .yyt-window-resize-handle.e {
      right: 0;
      top: 40px;
      bottom: 20px;
      width: 6px;
      cursor: e-resize;
    }
    
    .yyt-window-resize-handle.s {
      left: 20px;
      right: 20px;
      bottom: 0;
      height: 6px;
      cursor: s-resize;
    }
    
    .yyt-window-resize-handle.w {
      left: 0;
      top: 40px;
      bottom: 20px;
      width: 6px;
      cursor: w-resize;
    }
    
    .yyt-window-resize-handle.n {
      left: 20px;
      right: 20px;
      top: 0;
      height: 6px;
      cursor: n-resize;
    }
    
    .yyt-window-resize-handle.nw {
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      cursor: nw-resize;
    }
    
    .yyt-window-resize-handle.ne {
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      cursor: ne-resize;
    }
    
    .yyt-window-resize-handle.sw {
      left: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      cursor: sw-resize;
    }
  `;
  const style = document.createElement("style");
  style.id = WINDOW_MANAGER_ID + "_styles";
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
}
function createWindow(options) {
  const {
    id,
    title = "\u7A97\u53E3",
    content = "",
    width = 900,
    height = 700,
    modal = false,
    resizable = true,
    maximizable = true,
    startMaximized = false,
    rememberState = true,
    onClose,
    onReady
  } = options;
  injectWindowStyles();
  const $ = window.jQuery || window.parent?.jQuery;
  if (!$) {
    console.error("[WindowManager] jQuery not available");
    return null;
  }
  if (windowManager.isOpen(id)) {
    windowManager.bringToFront(id);
    return windowManager.getWindow(id);
  }
  const viewW = window.innerWidth || 1200;
  const viewH = window.innerHeight || 800;
  const isNarrowScreen = viewW <= 1100;
  let savedState = null;
  let useSavedState = false;
  if (rememberState) {
    savedState = windowManager.getState(id);
    if (savedState && !isNarrowScreen) {
      useSavedState = true;
    }
  }
  let initialW, initialH;
  if (useSavedState && savedState.width && savedState.height) {
    initialW = Math.max(400, Math.min(savedState.width, viewW - 40));
    initialH = Math.max(300, Math.min(savedState.height, viewH - 40));
  } else {
    initialW = Math.max(400, Math.min(width, viewW - 40));
    initialH = Math.max(300, Math.min(height, viewH - 40));
  }
  const initialX = Math.max(20, Math.min((viewW - initialW) / 2, viewW - initialW - 20));
  const initialY = Math.max(20, Math.min((viewH - initialH) / 2, viewH - initialH - 20));
  const showMaximizeBtn = maximizable && !isNarrowScreen;
  const windowHtml = `
    <div class="yyt-window" id="${id}" style="left:${initialX}px; top:${initialY}px; width:${initialW}px; height:${initialH}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${escapeHtml2(title)}</span>
        </div>
        <div class="yyt-window-controls">
          ${showMaximizeBtn ? '<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>' : ""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${content}</div>
      ${resizable ? `
        <div class="yyt-window-resize-handle se"></div>
        <div class="yyt-window-resize-handle e"></div>
        <div class="yyt-window-resize-handle s"></div>
        <div class="yyt-window-resize-handle w"></div>
        <div class="yyt-window-resize-handle n"></div>
        <div class="yyt-window-resize-handle nw"></div>
        <div class="yyt-window-resize-handle ne"></div>
        <div class="yyt-window-resize-handle sw"></div>
      ` : ""}
    </div>
  `;
  let $overlay = null;
  if (modal) {
    $overlay = $(`<div class="yyt-window-overlay" data-for="${id}"></div>`);
    $(document.body).append($overlay);
  }
  const $window = $(windowHtml);
  $(document.body).append($window);
  windowManager.register(id, $window);
  $window.on("mousedown", () => windowManager.bringToFront(id));
  let isMaximized = false;
  let restoreState = { left: initialX, top: initialY, width: initialW, height: initialH };
  const doMaximize = () => {
    restoreState = {
      left: parseInt($window.css("left")),
      top: parseInt($window.css("top")),
      width: $window.width(),
      height: $window.height()
    };
    $window.addClass("maximized");
    $window.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress");
    isMaximized = true;
  };
  const doRestore = () => {
    $window.removeClass("maximized");
    $window.css({
      left: restoreState.left + "px",
      top: restoreState.top + "px",
      width: restoreState.width + "px",
      height: restoreState.height + "px"
    });
    $window.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand");
    isMaximized = false;
  };
  $window.find(".yyt-window-btn.maximize").on("click", () => {
    if (isMaximized) {
      doRestore();
    } else {
      doMaximize();
    }
  });
  if (isNarrowScreen && maximizable) {
    doMaximize();
  } else if (useSavedState && savedState.isMaximized && maximizable) {
    doMaximize();
  } else if (startMaximized && maximizable) {
    doMaximize();
  }
  $window.find(".yyt-window-btn.close").on("click", () => {
    if (rememberState && maximizable) {
      const currentState = {
        width: isMaximized ? restoreState.width : $window.width(),
        height: isMaximized ? restoreState.height : $window.height(),
        isMaximized
      };
      windowManager.saveState(id, currentState);
    }
    if (onClose)
      onClose();
    if ($overlay)
      $overlay.remove();
    $window.remove();
    windowManager.unregister(id);
    $(document).off(".yytWindowDrag" + id);
    $(document).off(".yytWindowResize" + id);
  });
  if ($overlay) {
    $overlay.on("click", (e) => {
      if (e.target === $overlay[0]) {
      }
    });
  }
  let isDragging = false;
  let dragStartX, dragStartY, windowStartX, windowStartY;
  $window.find(".yyt-window-header").on("mousedown", (e) => {
    if ($(e.target).closest(".yyt-window-controls").length)
      return;
    if (isMaximized)
      return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    windowStartX = parseInt($window.css("left"));
    windowStartY = parseInt($window.css("top"));
    $(document.body).css("user-select", "none");
  });
  $(document).on("mousemove.yytWindowDrag" + id, (e) => {
    if (!isDragging)
      return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    $window.css({
      left: Math.max(0, windowStartX + dx) + "px",
      top: Math.max(0, windowStartY + dy) + "px"
    });
  });
  $(document).on("mouseup.yytWindowDrag" + id, () => {
    if (isDragging) {
      isDragging = false;
      $(document.body).css("user-select", "");
    }
  });
  if (resizable) {
    let isResizing = false;
    let resizeType = "";
    let resizeStartX, resizeStartY, startWidth, startHeight, startLeft, startTop;
    $window.find(".yyt-window-resize-handle").on("mousedown", function(e) {
      if (isMaximized)
        return;
      isResizing = true;
      resizeType = "";
      if ($(this).hasClass("se"))
        resizeType = "se";
      else if ($(this).hasClass("e"))
        resizeType = "e";
      else if ($(this).hasClass("s"))
        resizeType = "s";
      else if ($(this).hasClass("w"))
        resizeType = "w";
      else if ($(this).hasClass("n"))
        resizeType = "n";
      else if ($(this).hasClass("nw"))
        resizeType = "nw";
      else if ($(this).hasClass("ne"))
        resizeType = "ne";
      else if ($(this).hasClass("sw"))
        resizeType = "sw";
      resizeStartX = e.clientX;
      resizeStartY = e.clientY;
      startWidth = $window.width();
      startHeight = $window.height();
      startLeft = parseInt($window.css("left"));
      startTop = parseInt($window.css("top"));
      $(document.body).css("user-select", "none");
      e.stopPropagation();
    });
    $(document).on("mousemove.yytWindowResize" + id, (e) => {
      if (!isResizing)
        return;
      const dx = e.clientX - resizeStartX;
      const dy = e.clientY - resizeStartY;
      const minW = 400, minH = 300;
      let newW = startWidth, newH = startHeight, newL = startLeft, newT = startTop;
      if (resizeType.includes("e"))
        newW = Math.max(minW, startWidth + dx);
      if (resizeType.includes("s"))
        newH = Math.max(minH, startHeight + dy);
      if (resizeType.includes("w")) {
        const proposedW = startWidth - dx;
        if (proposedW >= minW) {
          newW = proposedW;
          newL = startLeft + dx;
        }
      }
      if (resizeType.includes("n")) {
        const proposedH = startHeight - dy;
        if (proposedH >= minH) {
          newH = proposedH;
          newT = startTop + dy;
        }
      }
      $window.css({
        width: newW + "px",
        height: newH + "px",
        left: newL + "px",
        top: newT + "px"
      });
    });
    $(document).on("mouseup.yytWindowResize" + id, () => {
      if (isResizing) {
        isResizing = false;
        $(document.body).css("user-select", "");
      }
    });
  }
  $window.on("remove", () => {
    $(document).off(".yytWindowDrag" + id);
    $(document).off(".yytWindowResize" + id);
  });
  if (onReady) {
    setTimeout(() => onReady($window), 50);
  }
  return $window;
}
function closeWindow(id) {
  const $window = windowManager.getWindow(id);
  if ($window) {
    const $ = window.jQuery || window.parent?.jQuery;
    if ($) {
      $(`.yyt-window-overlay[data-for="${id}"]`).remove();
      $(document).off(".yytWindowDrag" + id);
      $(document).off(".yytWindowResize" + id);
    }
    $window.remove();
    windowManager.unregister(id);
  }
}
function escapeHtml2(unsafe) {
  if (typeof unsafe !== "string")
    return "";
  return unsafe.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "&#039;");
}
var WINDOW_MANAGER_ID, WINDOW_STATE_STORAGE_KEY, WindowManager, windowManager;
var init_window_manager = __esm({
  "modules/window-manager.js"() {
    init_storage_service();
    WINDOW_MANAGER_ID = "youyou_toolkit_window_manager";
    WINDOW_STATE_STORAGE_KEY = "window_states";
    WindowManager = class {
      constructor() {
        this.windows = /* @__PURE__ */ new Map();
        this.baseZIndex = 1e4;
        this.topZIndex = 1e4;
        this.stylesInjected = false;
      }
      /**
       * 注册窗口
       * @param {string} id - 窗口ID
       * @param {jQuery} $el - 窗口jQuery对象
       */
      register(id, $el) {
        this.topZIndex++;
        this.windows.set(id, { $el, zIndex: this.topZIndex });
        $el.css("z-index", this.topZIndex);
      }
      /**
       * 注销窗口
       * @param {string} id - 窗口ID
       */
      unregister(id) {
        this.windows.delete(id);
      }
      /**
       * 将窗口置顶
       * @param {string} id - 窗口ID
       */
      bringToFront(id) {
        const win = this.windows.get(id);
        if (!win)
          return;
        this.topZIndex++;
        win.zIndex = this.topZIndex;
        win.$el.css("z-index", this.topZIndex);
      }
      /**
       * 获取窗口
       * @param {string} id - 窗口ID
       * @returns {jQuery|null}
       */
      getWindow(id) {
        return this.windows.get(id)?.$el || null;
      }
      /**
       * 检查窗口是否打开
       * @param {string} id - 窗口ID
       * @returns {boolean}
       */
      isOpen(id) {
        return this.windows.has(id);
      }
      /**
       * 关闭所有窗口
       */
      closeAll() {
        this.windows.forEach((win, id) => {
          if (win.$el)
            win.$el.remove();
        });
        this.windows.clear();
      }
      /**
       * 保存窗口状态
       * @param {string} windowId - 窗口ID
       * @param {object} state - 窗口状态
       */
      saveState(windowId, state) {
        const states = this.loadStates();
        states[windowId] = {
          ...state,
          updatedAt: Date.now()
        };
        windowStorage.set(WINDOW_STATE_STORAGE_KEY, states);
      }
      /**
       * 加载所有窗口状态
       * @returns {object}
       */
      loadStates() {
        return windowStorage.get(WINDOW_STATE_STORAGE_KEY) || {};
      }
      /**
       * 获取单个窗口状态
       * @param {string} windowId - 窗口ID
       * @returns {object|null}
       */
      getState(windowId) {
        const states = this.loadStates();
        return states[windowId] || null;
      }
    };
    windowManager = new WindowManager();
  }
});

// modules/prompt-editor.js
var prompt_editor_exports = {};
__export(prompt_editor_exports, {
  DEFAULT_PROMPT_SEGMENTS: () => DEFAULT_PROMPT_SEGMENTS,
  PromptEditor: () => PromptEditor,
  default: () => prompt_editor_default,
  getPromptEditorStyles: () => getPromptEditorStyles,
  messagesToSegments: () => messagesToSegments,
  segmentsToMessages: () => segmentsToMessages,
  validatePromptSegments: () => validatePromptSegments
});
function getPromptEditorStyles() {
  return `
    /* ============================================================
       \u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6837\u5F0F
       ============================================================ */
    
    .yyt-prompt-editor {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: transparent;
    }
    
    .yyt-prompt-editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      flex-shrink: 0;
    }
    
    .yyt-prompt-editor-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-prompt-editor-title i {
      color: var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-editor-actions {
      display: flex;
      gap: 8px;
    }
    
    .yyt-prompt-segments {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .yyt-prompt-segment {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease;
    }
    
    .yyt-prompt-segment:hover {
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-prompt-segment.yyt-main-a {
      border-left: 3px solid var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-segment.yyt-main-b {
      border-left: 3px solid #ffb74d;
    }
    
    .yyt-prompt-segment-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      cursor: pointer;
      user-select: none;
    }
    
    .yyt-prompt-segment-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .yyt-prompt-segment-info > i {
      color: var(--yyt-accent, #7bb7ff);
      font-size: 14px;
    }
    
    .yyt-prompt-segment-title {
      font-weight: 600;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-prompt-segment-badges {
      display: flex;
      gap: 6px;
      margin-left: 8px;
    }
    
    .yyt-prompt-role-badge,
    .yyt-prompt-slot-badge {
      font-size: 10px;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-weight: 500;
    }
    
    .yyt-prompt-role-badge {
      background: rgba(123, 183, 255, 0.1);
      color: var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-slot-badge {
      background: rgba(255, 183, 77, 0.1);
      color: #ffb74d;
    }
    
    .yyt-prompt-segment-controls {
      display: flex;
      gap: 6px;
    }
    
    .yyt-prompt-segment-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    
    .yyt-prompt-segment.yyt-expanded .yyt-prompt-segment-body {
      max-height: 600px;
    }
    
    .yyt-prompt-segment-meta {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    
    .yyt-prompt-segment-meta .yyt-form-row {
      display: flex;
      gap: 12px;
    }
    
    .yyt-prompt-segment-meta .yyt-form-group {
      flex: 1;
    }
    
    .yyt-prompt-segment-meta label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .yyt-prompt-textarea {
      width: 100%;
      min-height: 120px;
      padding: 12px 16px;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.85);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.6;
      resize: vertical;
    }
    
    .yyt-prompt-textarea:focus {
      outline: none;
    }
    
    .yyt-prompt-textarea::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  `;
}
function validatePromptSegments(segments) {
  const errors = [];
  if (!Array.isArray(segments)) {
    return { valid: false, errors: ["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"] };
  }
  segments.forEach((seg, index) => {
    if (!seg.id) {
      errors.push(`\u6BB5\u843D ${index + 1} \u7F3A\u5C11ID`);
    }
    if (!seg.role) {
      errors.push(`\u6BB5\u843D ${index + 1} \u7F3A\u5C11role\u5B57\u6BB5`);
    }
    if (!["SYSTEM", "USER", "assistant"].includes(seg.role)) {
      errors.push(`\u6BB5\u843D ${index + 1} \u7684role\u503C\u65E0\u6548: ${seg.role}`);
    }
  });
  return {
    valid: errors.length === 0,
    errors
  };
}
function segmentsToMessages(segments) {
  return segments.filter((seg) => seg.content && seg.content.trim()).map((seg) => ({
    role: seg.role,
    content: seg.content,
    deletable: seg.deletable,
    mainSlot: seg.mainSlot
  }));
}
function messagesToSegments(messages) {
  if (!Array.isArray(messages))
    return [...DEFAULT_PROMPT_SEGMENTS];
  return messages.map((msg, index) => ({
    id: `segment_${index}_${Date.now()}`,
    type: msg.role === "SYSTEM" ? "system" : msg.role === "assistant" ? "ai" : "user",
    role: msg.role,
    mainSlot: msg.mainSlot || "",
    content: msg.content || "",
    deletable: msg.deletable !== false,
    expanded: true,
    isMain: msg.mainSlot === "A" || msg.isMain,
    isMain2: msg.mainSlot === "B" || msg.isMain2
  }));
}
var PROMPT_EDITOR_ID, PROMPT_TYPE_LABELS, PROMPT_TYPE_ICONS, DEFAULT_PROMPT_SEGMENTS, PromptEditor, prompt_editor_default;
var init_prompt_editor = __esm({
  "modules/prompt-editor.js"() {
    PROMPT_EDITOR_ID = "youyou_toolkit_prompt_editor";
    PROMPT_TYPE_LABELS = {
      system: "System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",
      ai: "AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",
      user: "User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"
    };
    PROMPT_TYPE_ICONS = {
      system: "fa-server",
      ai: "fa-robot",
      user: "fa-user"
    };
    DEFAULT_PROMPT_SEGMENTS = [
      {
        id: "system_1",
        type: "system",
        role: "SYSTEM",
        mainSlot: "",
        content: "",
        deletable: false,
        expanded: true
      },
      {
        id: "ai_1",
        type: "ai",
        role: "USER",
        mainSlot: "A",
        content: "",
        deletable: false,
        expanded: true,
        isMain: true
      },
      {
        id: "user_1",
        type: "user",
        role: "USER",
        mainSlot: "B",
        content: "",
        deletable: false,
        expanded: true,
        isMain2: true
      }
    ];
    PromptEditor = class {
      constructor(options = {}) {
        this.containerId = options.containerId || PROMPT_EDITOR_ID;
        this.segments = options.segments || [...DEFAULT_PROMPT_SEGMENTS];
        this.onChange = options.onChange || null;
        this.editable = options.editable !== false;
        this.showMainSlot = options.showMainSlot !== false;
        this.$container = null;
        this.$ = null;
      }
      /**
       * 初始化编辑器
       * @param {jQuery} $container - 容器jQuery对象
       */
      init($container2) {
        this.$ = window.jQuery || window.parent?.jQuery;
        if (!this.$) {
          console.error("[PromptEditor] jQuery not available");
          return;
        }
        this.$container = $container2;
        this.render();
        this.bindEvents();
      }
      /**
       * 设置提示词数据
       * @param {Array} segments - 提示词段落数组
       */
      setSegments(segments) {
        this.segments = segments && Array.isArray(segments) ? [...segments] : [...DEFAULT_PROMPT_SEGMENTS];
        if (this.$container) {
          this.render();
          this.bindEvents();
        }
      }
      /**
       * 获取提示词数据
       * @returns {Array}
       */
      getSegments() {
        return this.segments.map((seg) => ({
          ...seg,
          content: this.getSegmentContent(seg.id)
        }));
      }
      /**
       * 获取单个段落内容
       * @param {string} segmentId - 段落ID
       * @returns {string}
       */
      getSegmentContent(segmentId) {
        if (!this.$container)
          return "";
        const $textarea = this.$container.find(`[data-segment-id="${segmentId}"] .yyt-prompt-textarea`);
        return $textarea.val() || "";
      }
      /**
       * 渲染编辑器
       */
      render() {
        if (!this.$container)
          return;
        const html = `
      <div class="yyt-prompt-editor" id="${this.containerId}">
        <div class="yyt-prompt-editor-header">
          <div class="yyt-prompt-editor-title">
            <i class="fa-solid fa-file-alt"></i>
            <span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668</span>
          </div>
          <div class="yyt-prompt-editor-actions">
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-add-segment" title="\u6DFB\u52A0\u6BB5\u843D">
              <i class="fa-solid fa-plus"></i> \u6DFB\u52A0
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-import-prompt" title="\u5BFC\u5165">
              <i class="fa-solid fa-file-import"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-export-prompt" title="\u5BFC\u51FA">
              <i class="fa-solid fa-file-export"></i>
            </button>
          </div>
        </div>
        <div class="yyt-prompt-segments">
          ${this.segments.map((seg) => this.renderSegment(seg)).join("")}
        </div>
      </div>
    `;
        this.$container.html(html);
      }
      /**
       * 渲染单个提示词段落
       * @param {object} segment - 段落配置
       * @returns {string}
       */
      renderSegment(segment) {
        const typeLabel = PROMPT_TYPE_LABELS[segment.type] || segment.type;
        const typeIcon = PROMPT_TYPE_ICONS[segment.type] || "fa-file";
        const isMainA = segment.mainSlot === "A" || segment.isMain;
        const isMainB = segment.mainSlot === "B" || segment.isMain2;
        const borderColor = isMainA ? "var(--yyt-accent, #7bb7ff)" : isMainB ? "#ffb74d" : "";
        const mainSlotBadge = this.showMainSlot && segment.mainSlot ? `<span class="yyt-prompt-slot-badge">mainSlot: ${segment.mainSlot}</span>` : "";
        const roleBadge = `<span class="yyt-prompt-role-badge">role: ${segment.role || "USER"}</span>`;
        return `
      <div class="yyt-prompt-segment ${segment.expanded ? "yyt-expanded" : ""} ${isMainA ? "yyt-main-a" : ""} ${isMainB ? "yyt-main-b" : ""}" 
           data-segment-id="${segment.id}" 
           data-segment-type="${segment.type}"
           style="${borderColor ? `border-left: 3px solid ${borderColor};` : ""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${typeIcon}"></i>
            <span class="yyt-prompt-segment-title">${typeLabel}</span>
            <div class="yyt-prompt-segment-badges">
              ${roleBadge}
              ${mainSlotBadge}
            </div>
          </div>
          <div class="yyt-prompt-segment-controls">
            ${segment.deletable !== false ? `
              <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-prompt-delete" title="\u5220\u9664\u6BB5\u843D">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : ""}
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-prompt-toggle" title="\u5C55\u5F00/\u6298\u53E0">
              <i class="fa-solid ${segment.expanded ? "fa-chevron-up" : "fa-chevron-down"}"></i>
            </button>
          </div>
        </div>
        <div class="yyt-prompt-segment-body">
          <div class="yyt-prompt-segment-meta">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>Role</label>
                <select class="yyt-select yyt-prompt-role" ${!this.editable ? "disabled" : ""}>
                  <option value="SYSTEM" ${segment.role === "SYSTEM" ? "selected" : ""}>SYSTEM</option>
                  <option value="USER" ${segment.role === "USER" ? "selected" : ""}>USER</option>
                  <option value="assistant" ${segment.role === "assistant" ? "selected" : ""}>assistant</option>
                </select>
              </div>
              ${this.showMainSlot ? `
              <div class="yyt-form-group yyt-flex-1">
                <label>Main Slot</label>
                <select class="yyt-select yyt-prompt-main-slot" ${!this.editable ? "disabled" : ""}>
                  <option value="" ${!segment.mainSlot ? "selected" : ""}>\u666E\u901A</option>
                  <option value="A" ${segment.mainSlot === "A" ? "selected" : ""}>A (\u5EFA\u8BAESystem)</option>
                  <option value="B" ${segment.mainSlot === "B" ? "selected" : ""}>B (\u5EFA\u8BAEUser)</option>
                </select>
              </div>
              ` : ""}
            </div>
          </div>
          <textarea class="yyt-textarea yyt-prompt-textarea" 
                    rows="6" 
                    placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u5185\u5BB9..." 
                    ${!this.editable ? "disabled" : ""}>${this.escapeHtml(segment.content || "")}</textarea>
        </div>
      </div>
    `;
      }
      /**
       * 绑定事件
       */
      bindEvents() {
        if (!this.$container)
          return;
        this.$container.find(".yyt-prompt-toggle").on("click", (e) => {
          const $segment = this.$(e.currentTarget).closest(".yyt-prompt-segment");
          $segment.toggleClass("yyt-expanded");
          const $icon = this.$(e.currentTarget).find("i");
          $icon.toggleClass("fa-chevron-up fa-chevron-down");
        });
        this.$container.find(".yyt-prompt-delete").on("click", (e) => {
          const segmentId = this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");
          this.deleteSegment(segmentId);
        });
        this.$container.find(".yyt-prompt-role").on("change", (e) => {
          const segmentId = this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");
          const role = this.$(e.currentTarget).val();
          this.updateSegmentMeta(segmentId, { role });
        });
        this.$container.find(".yyt-prompt-main-slot").on("change", (e) => {
          const segmentId = this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");
          const mainSlot = this.$(e.currentTarget).val();
          this.updateSegmentMeta(segmentId, { mainSlot });
        });
        this.$container.find(".yyt-prompt-textarea").on("input", (e) => {
          if (this.onChange) {
            this.onChange(this.getSegments());
          }
        });
        this.$container.find(`#${this.containerId}-add-segment`).on("click", () => {
          this.addSegment();
        });
        this.$container.find(`#${this.containerId}-import-prompt`).on("click", () => {
          this.importPrompt();
        });
        this.$container.find(`#${this.containerId}-export-prompt`).on("click", () => {
          this.exportPrompt();
        });
      }
      /**
       * 添加段落
       * @param {object} segmentData - 段落数据（可选）
       */
      addSegment(segmentData = null) {
        const newId = `segment_${Date.now()}`;
        const newSegment = segmentData || {
          id: newId,
          type: "user",
          role: "USER",
          mainSlot: "",
          content: "",
          deletable: true,
          expanded: true
        };
        if (!newSegment.id)
          newSegment.id = newId;
        this.segments.push(newSegment);
        this.render();
        this.bindEvents();
        if (this.onChange) {
          this.onChange(this.getSegments());
        }
      }
      /**
       * 删除段落
       * @param {string} segmentId - 段落ID
       */
      deleteSegment(segmentId) {
        const index = this.segments.findIndex((s) => s.id === segmentId);
        if (index === -1)
          return;
        const segment = this.segments[index];
        if (segment.deletable === false) {
          console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");
          return;
        }
        this.segments.splice(index, 1);
        this.render();
        this.bindEvents();
        if (this.onChange) {
          this.onChange(this.getSegments());
        }
      }
      /**
       * 更新段落元数据
       * @param {string} segmentId - 段落ID
       * @param {object} meta - 元数据
       */
      updateSegmentMeta(segmentId, meta) {
        const segment = this.segments.find((s) => s.id === segmentId);
        if (!segment)
          return;
        Object.assign(segment, meta);
        if (this.onChange) {
          this.onChange(this.getSegments());
        }
      }
      /**
       * 导入提示词
       */
      importPrompt() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (!file)
            return;
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const data = JSON.parse(event.target.result);
              if (Array.isArray(data)) {
                this.setSegments(data);
                console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F");
              } else {
                console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F");
              }
            } catch (err) {
              console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:", err);
            }
          };
          reader.readAsText(file);
        };
        input.click();
      }
      /**
       * 导出提示词
       */
      exportPrompt() {
        const data = this.getSegments();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `prompt_group_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA");
      }
      /**
       * HTML转义
       * @param {string} unsafe - 原始字符串
       * @returns {string}
       */
      escapeHtml(unsafe) {
        if (typeof unsafe !== "string")
          return "";
        return unsafe.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "&#039;");
      }
    };
    prompt_editor_default = PromptEditor;
  }
});

// modules/variable-resolver.js
var variable_resolver_exports = {};
__export(variable_resolver_exports, {
  BUILTIN_VARIABLES: () => BUILTIN_VARIABLES,
  VariableResolver: () => VariableResolver,
  default: () => variable_resolver_default,
  variableResolver: () => variableResolver
});
var BUILTIN_VARIABLES, VariableResolver, variableResolver, variable_resolver_default;
var init_variable_resolver = __esm({
  "modules/variable-resolver.js"() {
    init_event_bus();
    BUILTIN_VARIABLES = {
      lastUserMessage: {
        name: "lastUserMessage",
        description: "\u6700\u65B0\u7528\u6237\u6D88\u606F",
        category: "chat"
      },
      lastAiMessage: {
        name: "lastAiMessage",
        description: "\u6700\u65B0AI\u56DE\u590D",
        category: "chat"
      },
      chatHistory: {
        name: "chatHistory",
        description: "\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",
        category: "chat"
      },
      characterCard: {
        name: "characterCard",
        description: "\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",
        category: "character"
      },
      toolName: {
        name: "toolName",
        description: "\u5DE5\u5177\u540D\u79F0",
        category: "tool"
      },
      injectedContext: {
        name: "injectedContext",
        description: "\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",
        category: "context"
      }
    };
    VariableResolver = class {
      constructor() {
        this.customVariables = /* @__PURE__ */ new Map();
        this.variableHandlers = /* @__PURE__ */ new Map();
        this.debugMode = false;
        this._registerDefaultHandlers();
      }
      // ============================================================
      // 核心方法
      // ============================================================
      /**
       * 解析模板字符串
       * @param {string} template - 模板字符串
       * @param {Object} context - 上下文对象
       * @returns {string} 解析后的字符串
       */
      resolveTemplate(template, context) {
        if (typeof template !== "string") {
          return template;
        }
        let result = template;
        result = this._resolveBuiltinVariables(result, context);
        result = this._resolveCustomVariables(result, context);
        result = this._resolveRegexVariables(result, context);
        return result;
      }
      /**
       * 解析对象中的所有字符串值
       * @param {Object} obj - 要解析的对象
       * @param {Object} context - 上下文对象
       * @returns {Object} 解析后的对象
       */
      resolveObject(obj, context) {
        if (!obj || typeof obj !== "object") {
          return obj;
        }
        if (Array.isArray(obj)) {
          return obj.map((item) => this.resolveObject(item, context));
        }
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === "string") {
            result[key] = this.resolveTemplate(value, context);
          } else if (typeof value === "object" && value !== null) {
            result[key] = this.resolveObject(value, context);
          } else {
            result[key] = value;
          }
        }
        return result;
      }
      /**
       * 构建工具执行上下文
       * @param {Object} rawContext - 原始上下文
       * @returns {Object} 构建后的上下文
       */
      buildToolContext(rawContext) {
        return {
          // 聊天相关
          lastUserMessage: rawContext.lastUserMessage || "",
          lastAiMessage: rawContext.lastAiMessage || "",
          chatHistory: rawContext.chatHistory || [],
          // 角色相关
          characterCard: rawContext.characterCard || null,
          characterName: rawContext.characterCard?.name || "",
          // 工具相关
          toolName: rawContext.toolName || "",
          toolId: rawContext.toolId || "",
          // 注入上下文
          injectedContext: rawContext.injectedContext || "",
          // 正则提取结果
          regexResults: rawContext.regexResults || {},
          // 原始数据
          raw: rawContext,
          // 时间戳
          timestamp: Date.now()
        };
      }
      // ============================================================
      // 变量注册
      // ============================================================
      /**
       * 注册自定义变量
       * @param {string} name - 变量名（不含{{}}）
       * @param {Function|*} handler - 处理函数或静态值
       */
      registerVariable(name, handler) {
        if (!name)
          return;
        this.customVariables.set(name, handler);
        this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${name}`);
      }
      /**
       * 注销自定义变量
       * @param {string} name - 变量名
       */
      unregisterVariable(name) {
        this.customVariables.delete(name);
        this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${name}`);
      }
      /**
       * 注册变量处理器
       * @param {string} prefix - 变量前缀，如 'regex'
       * @param {Function} handler - 处理函数 (variableName, context) => value
       */
      registerHandler(prefix, handler) {
        if (!prefix || typeof handler !== "function")
          return;
        this.variableHandlers.set(prefix, handler);
        this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${prefix}`);
      }
      // ============================================================
      // 变量获取
      // ============================================================
      /**
       * 获取所有可用变量
       * @returns {Array} 变量列表
       */
      getAvailableVariables() {
        const variables = [];
        for (const [, info] of Object.entries(BUILTIN_VARIABLES)) {
          variables.push({
            name: `{{${info.name}}}`,
            description: info.description,
            category: info.category,
            type: "builtin"
          });
        }
        for (const [name, handler] of this.customVariables) {
          variables.push({
            name: `{{${name}}}`,
            description: typeof handler === "function" ? "\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF" : "\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",
            category: "custom",
            type: "custom"
          });
        }
        return variables;
      }
      /**
       * 获取变量帮助文本
       * @returns {string}
       */
      getVariableHelp() {
        const lines = ["\u53EF\u7528\u53D8\u91CF\uFF1A", ""];
        const categories = {
          chat: "\u804A\u5929\u76F8\u5173",
          character: "\u89D2\u8272\u76F8\u5173",
          tool: "\u5DE5\u5177\u76F8\u5173",
          context: "\u4E0A\u4E0B\u6587\u76F8\u5173",
          custom: "\u81EA\u5B9A\u4E49\u53D8\u91CF"
        };
        const grouped = {};
        for (const v of this.getAvailableVariables()) {
          if (!grouped[v.category]) {
            grouped[v.category] = [];
          }
          grouped[v.category].push(v);
        }
        for (const [category, label] of Object.entries(categories)) {
          if (grouped[category] && grouped[category].length > 0) {
            lines.push(`\u3010${label}\u3011`);
            for (const v of grouped[category]) {
              lines.push(`  ${v.name} - ${v.description}`);
            }
            lines.push("");
          }
        }
        lines.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011");
        lines.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D");
        return lines.join("\n");
      }
      // ============================================================
      // 私有方法
      // ============================================================
      /**
       * 注册默认处理器
       * @private
       */
      _registerDefaultHandlers() {
        this.registerHandler("regex", (varName, context) => {
          const regexResults = context.regexResults || context.raw?.regexResults || {};
          return regexResults[varName] || "";
        });
      }
      /**
       * 解析内置变量
       * @private
       */
      _resolveBuiltinVariables(template, context) {
        let result = template;
        result = result.replace(
          /\{\{lastUserMessage\}\}/gi,
          context.lastUserMessage || context.raw?.lastUserMessage || ""
        );
        result = result.replace(
          /\{\{lastAiMessage\}\}/gi,
          context.lastAiMessage || context.raw?.lastAiMessage || ""
        );
        result = result.replace(/\{\{chatHistory\}\}/gi, () => {
          const history = context.chatHistory || context.raw?.chatHistory || [];
          return this._formatChatHistory(history);
        });
        result = result.replace(/\{\{characterCard\}\}/gi, () => {
          const card = context.characterCard || context.raw?.characterCard;
          return card ? this._formatCharacterCard(card) : "";
        });
        result = result.replace(
          /\{\{toolName\}\}/gi,
          context.toolName || context.raw?.toolName || ""
        );
        result = result.replace(
          /\{\{injectedContext\}\}/gi,
          context.injectedContext || context.raw?.injectedContext || ""
        );
        return result;
      }
      /**
       * 解析自定义变量
       * @private
       */
      _resolveCustomVariables(template, context) {
        let result = template;
        for (const [name, handler] of this.customVariables) {
          const pattern = new RegExp(`\\{\\{${this._escapeRegex(name)}\\}\\}`, "gi");
          if (typeof handler === "function") {
            result = result.replace(pattern, () => {
              try {
                return handler(context);
              } catch (e) {
                this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${name}:`, e);
                return "";
              }
            });
          } else {
            result = result.replace(pattern, String(handler));
          }
        }
        return result;
      }
      /**
       * 解析带前缀的变量（如 regex.xxx）
       * @private
       */
      _resolveRegexVariables(template, context) {
        let result = template;
        for (const [prefix, handler] of this.variableHandlers) {
          const pattern = new RegExp(`\\{\\{${prefix}\\.([^}]+)\\}\\}`, "gi");
          result = result.replace(pattern, (match, varName) => {
            try {
              return handler(varName, context);
            } catch (e) {
              this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${prefix}.${varName}:`, e);
              return "";
            }
          });
        }
        return result;
      }
      /**
       * 格式化聊天历史
       * @private
       */
      _formatChatHistory(history) {
        if (!Array.isArray(history) || history.length === 0) {
          return "";
        }
        return history.map((msg) => {
          const role = msg.role || "unknown";
          const content = msg.content || msg.mes || "";
          return `[${role}]: ${content}`;
        }).join("\n\n");
      }
      /**
       * 格式化角色卡
       * @private
       */
      _formatCharacterCard(card) {
        if (!card)
          return "";
        const parts = [];
        if (card.name)
          parts.push(`\u59D3\u540D: ${card.name}`);
        if (card.description)
          parts.push(`\u63CF\u8FF0: ${card.description}`);
        if (card.personality)
          parts.push(`\u6027\u683C: ${card.personality}`);
        if (card.scenario)
          parts.push(`\u573A\u666F: ${card.scenario}`);
        return parts.join("\n\n");
      }
      /**
       * 转义正则表达式特殊字符
       * @private
       */
      _escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      /**
       * 日志输出
       * @private
       */
      _log(...args) {
        if (this.debugMode) {
          console.log("[VariableResolver]", ...args);
        }
      }
    };
    variableResolver = new VariableResolver();
    variable_resolver_default = variableResolver;
  }
});

// modules/ui/components/settings-panel.js
var settings_panel_exports = {};
__export(settings_panel_exports, {
  SettingsPanel: () => SettingsPanel,
  THEME_CONFIGS: () => THEME_CONFIGS,
  applyTheme: () => applyTheme,
  default: () => settings_panel_default
});
function applyTheme(themeName) {
  const root = document.documentElement;
  const theme = THEME_CONFIGS[themeName] || THEME_CONFIGS["dark-blue"];
  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  root.setAttribute("data-yyt-theme", themeName);
  if (themeName === "light") {
    root.style.setProperty("--yyt-text", "rgba(15, 23, 42, 0.95)");
  } else {
    root.style.setProperty("--yyt-text", "rgba(255, 255, 255, 0.95)");
  }
}
var THEME_CONFIGS, SettingsPanel, settings_panel_default;
var init_settings_panel = __esm({
  "modules/ui/components/settings-panel.js"() {
    init_event_bus();
    init_settings_service();
    init_utils();
    THEME_CONFIGS = {
      "dark-blue": {
        "--yyt-accent": "#7bb7ff",
        "--yyt-accent-glow": "rgba(123, 183, 255, 0.4)",
        "--yyt-accent-soft": "rgba(123, 183, 255, 0.15)",
        "--yyt-bg-base": "#0b0f15",
        "--yyt-bg-gradient-1": "rgba(123, 183, 255, 0.12)",
        "--yyt-bg-gradient-2": "rgba(155, 123, 255, 0.10)"
      },
      "dark-purple": {
        "--yyt-accent": "#a78bfa",
        "--yyt-accent-glow": "rgba(167, 139, 250, 0.4)",
        "--yyt-accent-soft": "rgba(167, 139, 250, 0.15)",
        "--yyt-bg-base": "#0f0b15",
        "--yyt-bg-gradient-1": "rgba(167, 139, 250, 0.12)",
        "--yyt-bg-gradient-2": "rgba(123, 183, 255, 0.10)"
      },
      "dark-green": {
        "--yyt-accent": "#4ade80",
        "--yyt-accent-glow": "rgba(74, 222, 128, 0.4)",
        "--yyt-accent-soft": "rgba(74, 222, 128, 0.15)",
        "--yyt-bg-base": "#0b150f",
        "--yyt-bg-gradient-1": "rgba(74, 222, 128, 0.12)",
        "--yyt-bg-gradient-2": "rgba(123, 183, 255, 0.10)"
      },
      "light": {
        "--yyt-accent": "#3b82f6",
        "--yyt-accent-glow": "rgba(59, 130, 246, 0.3)",
        "--yyt-accent-soft": "rgba(59, 130, 246, 0.1)",
        "--yyt-bg-base": "#f8fafc",
        "--yyt-bg-gradient-1": "rgba(59, 130, 246, 0.08)",
        "--yyt-bg-gradient-2": "rgba(139, 92, 246, 0.06)",
        "--yyt-text": "rgba(15, 23, 42, 0.95)",
        "--yyt-text-secondary": "rgba(15, 23, 42, 0.7)",
        "--yyt-text-muted": "rgba(15, 23, 42, 0.45)",
        "--yyt-surface": "rgba(0, 0, 0, 0.03)",
        "--yyt-surface-hover": "rgba(0, 0, 0, 0.06)",
        "--yyt-surface-active": "rgba(0, 0, 0, 0.08)",
        "--yyt-border": "rgba(0, 0, 0, 0.08)",
        "--yyt-border-strong": "rgba(0, 0, 0, 0.15)"
      }
    };
    SettingsPanel = {
      id: "settingsPanel",
      // ============================================================
      // 渲染
      // ============================================================
      /**
       * 渲染组件
       * @param {Object} props
       * @returns {string} HTML
       */
      render(props) {
        const settings = settingsService.getSettings();
        return `
      <div class="yyt-settings-panel">
        <!-- \u6807\u7B7E\u9875\u5BFC\u822A -->
        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> \u6267\u884C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="listener">
            <i class="fa-solid fa-ear-listen"></i> \u76D1\u542C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> \u8C03\u8BD5
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> \u5916\u89C2
          </button>
        </div>
        
        <!-- \u6807\u7B7E\u9875\u5185\u5BB9 -->
        <div class="yyt-settings-content">
          ${this._renderExecutorTab(settings.executor)}
          ${this._renderListenerTab(settings.listener)}
          ${this._renderDebugTab(settings.debug)}
          ${this._renderUiTab(settings.ui)}
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C -->
        <div class="yyt-settings-footer">
          <button class="yyt-btn yyt-btn-secondary" id="yyt-settings-reset">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u4E3A\u9ED8\u8BA4
          </button>
          <button class="yyt-btn yyt-btn-primary" id="yyt-settings-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u8BBE\u7F6E
          </button>
        </div>
      </div>
    `;
      },
      // ============================================================
      // 私有渲染方法
      // ============================================================
      /**
       * 渲染执行器标签页
       * @private
       */
      _renderExecutorTab(executor) {
        return `
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5E76\u53D1\u63A7\u5236</div>
          <div class="yyt-form-group">
            <label>\u6700\u5927\u5E76\u53D1\u6570</label>
            <div class="yyt-form-hint">\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent" 
                   value="${executor.maxConcurrent}" min="1" max="10">
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u91CD\u8BD5\u7B56\u7565</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6700\u5927\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-setting-maxRetries" 
                     value="${executor.maxRetries}" min="0" max="10">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u95F4\u9694 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-retryDelayMs" 
                     value="${executor.retryDelayMs}" min="1000" max="60000" step="1000">
            </div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8D85\u65F6\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u5355\u4E2A\u8BF7\u6C42\u7684\u8D85\u65F6\u65F6\u95F4\uFF0C\u8D85\u8FC7\u5C06\u81EA\u52A8\u4E2D\u65AD</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs" 
                   value="${executor.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u961F\u5217\u7B56\u7565</div>
          <div class="yyt-form-group">
            <label>\u961F\u5217\u5904\u7406\u65B9\u5F0F</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${executor.queueStrategy === "fifo" ? "selected" : ""}>FIFO (\u5148\u8FDB\u5148\u51FA)</option>
              <option value="lifo" ${executor.queueStrategy === "lifo" ? "selected" : ""}>LIFO (\u540E\u8FDB\u5148\u51FA)</option>
              <option value="priority" ${executor.queueStrategy === "priority" ? "selected" : ""}>\u4F18\u5148\u7EA7\u6392\u5E8F</option>
            </select>
          </div>
        </div>
      </div>
    `;
      },
      /**
       * 渲染监听器标签页
       * @private
       */
      _renderListenerTab(listener) {
        return `
      <div class="yyt-settings-tab-content" data-tab="listener">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u4E8B\u4EF6\u76D1\u542C</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-listenGenerationEnded" 
                     ${listener.listenGenerationEnded ? "checked" : ""}>
              <span>\u76D1\u542C AI \u56DE\u590D\u5B8C\u6210\u4E8B\u4EF6</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u5C06\u5728 AI \u56DE\u590D\u5B8C\u6210\u65F6\u81EA\u52A8\u89E6\u53D1\u5DE5\u5177</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8FC7\u6EE4\u89C4\u5219</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreQuietGeneration" 
                     ${listener.ignoreQuietGeneration ? "checked" : ""}>
              <span>\u5FFD\u7565\u9759\u9ED8\u751F\u6210</span>
            </label>
            <div class="yyt-form-hint">Quiet \u6A21\u5F0F\u7684\u751F\u6210\u4E0D\u4F1A\u89E6\u53D1\u5DE5\u5177</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreAutoTrigger" 
                     ${listener.ignoreAutoTrigger ? "checked" : ""}>
              <span>\u5FFD\u7565\u81EA\u52A8\u89E6\u53D1</span>
            </label>
            <div class="yyt-form-hint">\u81EA\u52A8\u89E6\u53D1\u7684\u751F\u6210\u4E0D\u4F1A\u6267\u884C\u5DE5\u5177</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u9632\u6296\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u9632\u6296\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u8FDE\u7EED\u4E8B\u4EF6\u89E6\u53D1\u7684\u6700\u5C0F\u95F4\u9694</div>
            <input type="number" class="yyt-input" id="yyt-setting-debounceMs" 
                   value="${listener.debounceMs}" min="0" max="5000" step="100">
          </div>
        </div>
      </div>
    `;
      },
      /**
       * 渲染调试标签页
       * @private
       */
      _renderDebugTab(debug) {
        return `
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-enableDebugLog" 
                     ${debug.enableDebugLog ? "checked" : ""}>
              <span>\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7</span>
            </label>
            <div class="yyt-form-hint">\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-saveExecutionHistory" 
                     ${debug.saveExecutionHistory ? "checked" : ""}>
              <span>\u4FDD\u5B58\u6267\u884C\u5386\u53F2</span>
            </label>
            <div class="yyt-form-hint">\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-showRuntimeBadge" 
                     ${debug.showRuntimeBadge ? "checked" : ""}>
              <span>\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0</span>
            </label>
            <div class="yyt-form-hint">\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668</div>
          </div>
        </div>
      </div>
    `;
      },
      /**
       * 渲染UI标签页
       * @private
       */
      _renderUiTab(ui) {
        return `
      <div class="yyt-settings-tab-content" data-tab="ui">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5916\u89C2\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u4E3B\u9898</label>
            <select class="yyt-select" id="yyt-setting-theme">
              <option value="dark-blue" ${ui.theme === "dark-blue" ? "selected" : ""}>\u6DF1\u84DD</option>
              <option value="dark-purple" ${ui.theme === "dark-purple" ? "selected" : ""}>\u6DF1\u7D2B</option>
              <option value="dark-green" ${ui.theme === "dark-green" ? "selected" : ""}>\u6DF1\u7EFF</option>
              <option value="light" ${ui.theme === "light" ? "selected" : ""}>\u6D45\u8272</option>
            </select>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-compactMode" 
                     ${ui.compactMode ? "checked" : ""}>
              <span>\u7D27\u51D1\u6A21\u5F0F</span>
            </label>
            <div class="yyt-form-hint">\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-animationEnabled" 
                     ${ui.animationEnabled ? "checked" : ""}>
              <span>\u542F\u7528\u52A8\u753B\u6548\u679C</span>
            </label>
            <div class="yyt-form-hint">\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B</div>
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
      bindEvents($container2, dependencies) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find(".yyt-settings-tab").on("click", (e) => {
          const tabId = $(e.currentTarget).data("tab");
          $container2.find(".yyt-settings-tab").removeClass("yyt-active");
          $(e.currentTarget).addClass("yyt-active");
          $container2.find(".yyt-settings-tab-content").removeClass("yyt-active");
          $container2.find(`.yyt-settings-tab-content[data-tab="${tabId}"]`).addClass("yyt-active");
        });
        $container2.find("#yyt-settings-save").on("click", () => {
          this._saveSettings($container2, $);
        });
        $container2.find("#yyt-settings-reset").on("click", () => {
          if (confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")) {
            settingsService.resetSettings();
            this.renderTo($container2);
            showToast("success", "\u8BBE\u7F6E\u5DF2\u91CD\u7F6E");
          }
        });
      },
      /**
       * 保存设置
       * @private
       */
      _saveSettings($container2, $) {
        const settings = {
          executor: {
            maxConcurrent: parseInt($container2.find("#yyt-setting-maxConcurrent").val()) || 3,
            maxRetries: parseInt($container2.find("#yyt-setting-maxRetries").val()) || 2,
            retryDelayMs: parseInt($container2.find("#yyt-setting-retryDelayMs").val()) || 5e3,
            requestTimeoutMs: parseInt($container2.find("#yyt-setting-requestTimeoutMs").val()) || 9e4,
            queueStrategy: $container2.find("#yyt-setting-queueStrategy").val() || "fifo"
          },
          listener: {
            listenGenerationEnded: $container2.find("#yyt-setting-listenGenerationEnded").is(":checked"),
            ignoreQuietGeneration: $container2.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),
            ignoreAutoTrigger: $container2.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),
            debounceMs: parseInt($container2.find("#yyt-setting-debounceMs").val()) || 300
          },
          debug: {
            enableDebugLog: $container2.find("#yyt-setting-enableDebugLog").is(":checked"),
            saveExecutionHistory: $container2.find("#yyt-setting-saveExecutionHistory").is(":checked"),
            showRuntimeBadge: $container2.find("#yyt-setting-showRuntimeBadge").is(":checked")
          },
          ui: {
            theme: $container2.find("#yyt-setting-theme").val() || "dark-blue",
            compactMode: $container2.find("#yyt-setting-compactMode").is(":checked"),
            animationEnabled: $container2.find("#yyt-setting-animationEnabled").is(":checked")
          }
        };
        settingsService.saveSettings(settings);
        applyTheme(settings.ui.theme);
        document.documentElement.classList.toggle("yyt-compact-mode", settings.ui.compactMode);
        document.documentElement.classList.toggle("yyt-no-animation", !settings.ui.animationEnabled);
        showToast("success", "\u8BBE\u7F6E\u5DF2\u4FDD\u5B58");
      },
      // ============================================================
      // 销毁
      // ============================================================
      /**
       * 销毁组件
       * @param {Object} $container
       */
      destroy($container2) {
        const $ = getJQuery();
        if (!$ || !isContainerValid($container2))
          return;
        $container2.find("*").off();
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
      /* \u8BBE\u7F6E\u9762\u677F\u6837\u5F0F */
      .yyt-settings-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .yyt-settings-tabs {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.02);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }
      
      .yyt-settings-tab {
        padding: 10px 16px;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 8px;
        color: var(--yyt-text-muted);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-settings-tab:hover {
        background: rgba(255, 255, 255, 0.04);
        color: var(--yyt-text);
      }
      
      .yyt-settings-tab.yyt-active {
        background: rgba(123, 183, 255, 0.1);
        border-color: rgba(123, 183, 255, 0.3);
        color: var(--yyt-accent);
      }
      
      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }
      
      .yyt-settings-tab-content {
        display: none;
      }
      
      .yyt-settings-tab-content.yyt-active {
        display: block;
      }
      
      .yyt-settings-section {
        margin-bottom: 24px;
      }
      
      .yyt-settings-section-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-form-row {
        display: flex;
        gap: 16px;
      }
      
      .yyt-form-group {
        margin-bottom: 16px;
      }
      
      .yyt-form-group label {
        display: block;
        font-size: 12px;
        font-weight: 500;
        color: var(--yyt-text);
        margin-bottom: 6px;
      }
      
      .yyt-form-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
        margin-bottom: 8px;
      }
      
      .yyt-toggle-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
      }
      
      .yyt-toggle-label span {
        font-size: 13px;
        color: var(--yyt-text);
      }
      
      .yyt-settings-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px;
        background: rgba(255, 255, 255, 0.02);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
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
      renderTo($container2) {
        const html = this.render({});
        $container2.html(html);
        this.bindEvents($container2, {});
      }
    };
    settings_panel_default = SettingsPanel;
  }
});

// index.js
var SCRIPT_ID2 = "youyou_toolkit";
var SCRIPT_VERSION = "0.6.2";
var MENU_ITEM_ID = `${SCRIPT_ID2}-menu-item`;
var MENU_CONTAINER_ID = `${SCRIPT_ID2}-menu-container`;
var POPUP_ID = `${SCRIPT_ID2}-popup`;
var topLevelWindow = typeof window.parent !== "undefined" ? window.parent : window;
var storageModule = null;
var apiConnectionModule = null;
var presetManagerModule = null;
var uiComponentsModule = null;
var regexExtractorModule = null;
var toolManagerModule = null;
var toolExecutorModule = null;
var toolTriggerModule = null;
var windowManagerModule = null;
var toolRegistryModule = null;
var promptEditorModule = null;
var settingsServiceModule = null;
var bypassManagerModule = null;
var variableResolverModule = null;
var contextInjectorModule = null;
var toolPromptServiceModule = null;
var toolOutputServiceModule = null;
async function loadModules() {
  try {
    storageModule = await Promise.resolve().then(() => (init_storage(), storage_exports));
    apiConnectionModule = await Promise.resolve().then(() => (init_api_connection(), api_connection_exports));
    presetManagerModule = await Promise.resolve().then(() => (init_preset_manager(), preset_manager_exports));
    uiComponentsModule = await Promise.resolve().then(() => (init_ui_components(), ui_components_exports));
    regexExtractorModule = await Promise.resolve().then(() => (init_regex_extractor(), regex_extractor_exports));
    toolManagerModule = await Promise.resolve().then(() => (init_tool_manager(), tool_manager_exports));
    toolExecutorModule = await Promise.resolve().then(() => (init_tool_executor(), tool_executor_exports));
    toolTriggerModule = await Promise.resolve().then(() => (init_tool_trigger(), tool_trigger_exports));
    windowManagerModule = await Promise.resolve().then(() => (init_window_manager(), window_manager_exports));
    toolRegistryModule = await Promise.resolve().then(() => (init_tool_registry(), tool_registry_exports));
    promptEditorModule = await Promise.resolve().then(() => (init_prompt_editor(), prompt_editor_exports));
    settingsServiceModule = await Promise.resolve().then(() => (init_settings_service(), settings_service_exports));
    bypassManagerModule = await Promise.resolve().then(() => (init_bypass_manager(), bypass_manager_exports));
    variableResolverModule = await Promise.resolve().then(() => (init_variable_resolver(), variable_resolver_exports));
    contextInjectorModule = await Promise.resolve().then(() => (init_context_injector(), context_injector_exports));
    toolPromptServiceModule = await Promise.resolve().then(() => (init_tool_prompt_service(), tool_prompt_service_exports));
    toolOutputServiceModule = await Promise.resolve().then(() => (init_tool_output_service(), tool_output_service_exports));
    if (toolOutputServiceModule?.toolOutputService && apiConnectionModule) {
      toolOutputServiceModule.toolOutputService.setApiConnection(apiConnectionModule);
    }
    return true;
  } catch (error) {
    console.warn(`[${SCRIPT_ID2}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`, error);
    return false;
  }
}
function log2(...args) {
  console.log(`[${SCRIPT_ID2}]`, ...args);
}
function logError(...args) {
  console.error(`[${SCRIPT_ID2}]`, ...args);
}
function escapeHtml3(unsafe) {
  if (typeof unsafe !== "string")
    return "";
  return unsafe.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"').replace(/'/g, "&#039;");
}
async function injectStyles() {
  const styleId = `${SCRIPT_ID2}-styles`;
  const targetDoc = topLevelWindow.document || document;
  if (targetDoc.getElementById(styleId))
    return;
  let css = "";
  try {
    const response = await fetch("./styles/main.css");
    if (response.ok) {
      css = await response.text();
    }
  } catch (e) {
    log2("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F");
  }
  if (!css) {
    css = getBaseStyles();
  }
  const style = targetDoc.createElement("style");
  style.id = styleId;
  style.textContent = css;
  (targetDoc.head || targetDoc.documentElement).appendChild(style);
  log2("\u6837\u5F0F\u5DF2\u6CE8\u5165");
}
function getBaseStyles() {
  return `
    /* CSS\u53D8\u91CF */
    :root {
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
    }
    
    /* \u83DC\u5355\u9879 */
    #${MENU_CONTAINER_ID} { display: flex; align-items: center; }
    
    #${MENU_ITEM_ID} {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px; cursor: pointer;
      transition: all 0.2s ease; border-radius: 8px; margin: 2px;
    }
    
    #${MENU_ITEM_ID}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${MENU_ITEM_ID} .fa-fw {
      font-size: 16px; color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
    }
    
    #${MENU_ITEM_ID} span { font-weight: 500; letter-spacing: 0.3px; }
    
    /* \u4E3B\u5F39\u7A97\u906E\u7F69 */
    .yyt-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
    }
    
    /* \u4E3B\u5F39\u7A97 */
    .yyt-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      width: 950px;
      max-width: 95vw;
      height: 85vh;
      max-height: 90vh;
      background:
        radial-gradient(1200px 600px at 10% -10%, rgba(123, 183, 255, 0.12), transparent 60%),
        radial-gradient(900px 500px at 100% 0%, rgba(155, 123, 255, 0.10), transparent 55%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
        #0b0f15;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65), 0 0 60px rgba(123, 183, 255, 0.1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
      z-index: 10000;
    }
    
    /* \u5F39\u7A97\u5934\u90E8 */
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px 16px 0 0;
      flex-shrink: 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-popup-title i {
      color: rgba(123, 183, 255, 0.85);
      font-size: 18px;
    }
    
    .yyt-popup-close {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
    
    .yyt-popup-close:hover {
      background: rgba(255, 107, 107, 0.25);
      color: #ff6b6b;
    }
    
    /* \u5F39\u7A97\u4E3B\u4F53 */
    .yyt-popup-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: 16px 20px;
      overflow: hidden;
    }
    
    /* \u5F39\u7A97\u5E95\u90E8 */
    .yyt-popup-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 14px 20px;
      background: rgba(255, 255, 255, 0.02);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0 0 16px 16px;
      flex-shrink: 0;
    }
    
    /* \u4E3B\u9876\u680F */
    .yyt-main-nav {
      display: flex;
      gap: 4px;
      padding: 8px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 14px;
      margin-bottom: 16px;
      border: 1px solid var(--yyt-border);
      flex-shrink: 0;
    }
    
    .yyt-main-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.25s ease;
      color: var(--yyt-text-secondary);
      font-weight: 500;
      font-size: 14px;
    }
    
    .yyt-main-nav-item:hover {
      color: var(--yyt-text);
      background: var(--yyt-surface-hover);
    }
    
    .yyt-main-nav-item.active {
      color: #0b0f15;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
    }
    
    /* \u6B21\u7EA7\u9876\u680F */
    .yyt-sub-nav {
      display: flex;
      gap: 4px;
      padding: 6px;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 10px;
      margin-bottom: 16px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      flex-shrink: 0;
    }
    
    .yyt-sub-nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--yyt-text-secondary);
      font-weight: 500;
      font-size: 13px;
    }
    
    .yyt-sub-nav-item:hover {
      color: var(--yyt-text);
      background: rgba(255, 255, 255, 0.05);
    }
    
    .yyt-sub-nav-item.active {
      color: var(--yyt-accent);
      background: rgba(123, 183, 255, 0.1);
    }
    
    /* \u5185\u5BB9\u533A\u57DF */
    .yyt-content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      padding: 0 4px;
    }
    
    /* \u6807\u7B7E\u5185\u5BB9 */
    .yyt-tab-content {
      display: none;
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
    
    .yyt-tab-content.active {
      display: block;
    }
    
    /* \u9762\u677F\u6837\u5F0F */
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
    }
    
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
    }
    
    /* \u6309\u94AE\u6837\u5F0F */
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
      transition: all 0.25s ease;
    }
    
    .yyt-btn-primary {
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      color: #0b0f15;
    }
    
    .yyt-btn-primary:hover {
      transform: translateY(-1px);
    }
    
    .yyt-btn-secondary {
      background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text);
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-btn-secondary:hover {
      border-color: var(--yyt-border-strong);
    }
    
    .yyt-btn-danger {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
      color: var(--yyt-error);
      border: 1px solid rgba(248, 113, 113, 0.25);
    }
    
    .yyt-btn-small {
      padding: 6px 10px;
      font-size: 11px;
    }
    
    /* \u8868\u5355\u6837\u5F0F */
    .yyt-form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .yyt-form-group label {
      font-size: 12px;
      font-weight: 600;
      color: var(--yyt-text-secondary);
    }
    
    .yyt-form-row {
      display: flex;
      gap: 12px;
    }
    
    .yyt-flex-1 {
      flex: 1;
    }
    
    .yyt-input,
    .yyt-select,
    .yyt-textarea {
      padding: 10px 14px;
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      background: rgba(255, 255, 255, 0.03);
      color: var(--yyt-text);
      font-size: 13px;
    }
    
    .yyt-input:focus,
    .yyt-select:focus,
    .yyt-textarea:focus {
      outline: none;
      border-color: var(--yyt-accent);
    }
    
    .yyt-input::placeholder,
    .yyt-textarea::placeholder {
      color: var(--yyt-text-muted);
    }
    
    .yyt-textarea {
      resize: vertical;
      min-height: 80px;
    }
    
    /* \u9762\u677F\u5E95\u90E8 */
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
    
    /* \u7A7A\u72B6\u6001 */
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
    
    /* \u5B50\u5185\u5BB9\u533A\u57DF */
    .yyt-sub-content {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
    
    /* \u5DE5\u5177\u7A97\u53E3\u5BB9\u5668 */
    .yyt-tool-window {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    /* \u54CD\u5E94\u5F0F */
    @media screen and (max-width: 1100px) {
      .yyt-popup {
        width: 98vw;
        height: 90vh;
      }
    }
    
    @media screen and (max-width: 768px) {
      .yyt-popup {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        border: none;
      }
    }
  `;
}
var currentPopup = null;
var currentOverlay = null;
var currentMainTab = "apiPresets";
var currentSubTab = {};
function closePopup() {
  if (currentPopup) {
    currentPopup.remove();
    currentPopup = null;
  }
  if (currentOverlay) {
    currentOverlay.remove();
    currentOverlay = null;
  }
  log2("\u5F39\u7A97\u5DF2\u5173\u95ED");
}
function switchMainTab(tabName) {
  currentMainTab = tabName;
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup)
    return;
  $(currentPopup).find(".yyt-main-nav-item").removeClass("active");
  $(currentPopup).find(`.yyt-main-nav-item[data-tab="${tabName}"]`).addClass("active");
  const toolConfig = toolRegistryModule?.getToolConfig(tabName);
  if (toolConfig?.hasSubTabs) {
    $(currentPopup).find(".yyt-sub-nav").show();
    renderSubNav(tabName, toolConfig.subTabs);
  } else {
    $(currentPopup).find(".yyt-sub-nav").hide();
  }
  $(currentPopup).find(".yyt-tab-content").removeClass("active");
  $(currentPopup).find(`.yyt-tab-content[data-tab="${tabName}"]`).addClass("active");
  renderTabContent(tabName);
}
function switchSubTab(mainTab, subTab) {
  currentSubTab[mainTab] = subTab;
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup)
    return;
  $(currentPopup).find(".yyt-sub-nav-item").removeClass("active");
  $(currentPopup).find(`.yyt-sub-nav-item[data-subtab="${subTab}"]`).addClass("active");
  renderSubTabContent(mainTab, subTab);
}
function renderSubNav(mainTab, subTabs) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup || !subTabs)
    return;
  const currentSub = currentSubTab[mainTab] || subTabs[0]?.id;
  const subNavHtml = subTabs.map((tab) => `
    <div class="yyt-sub-nav-item ${tab.id === currentSub ? "active" : ""}" data-subtab="${tab.id}">
      <i class="fa-solid ${tab.icon || "fa-file"}"></i>
      <span>${tab.name}</span>
    </div>
  `).join("");
  $(currentPopup).find(".yyt-sub-nav").html(subNavHtml);
  $(currentPopup).find(".yyt-sub-nav-item").on("click", function() {
    const subTab = $(this).data("subtab");
    switchSubTab(mainTab, subTab);
  });
}
async function renderTabContent(tabName) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup)
    return;
  const $content = $(currentPopup).find(`.yyt-tab-content[data-tab="${tabName}"]`);
  if (!$content.length)
    return;
  const toolConfig = toolRegistryModule?.getToolConfig(tabName);
  switch (tabName) {
    case "apiPresets":
      if (uiComponentsModule) {
        uiComponentsModule.render($content);
      }
      break;
    case "regexExtract":
      if (uiComponentsModule) {
        uiComponentsModule.renderRegex($content);
      }
      break;
    case "tools":
      if (toolConfig?.hasSubTabs && toolConfig.subTabs?.length > 0) {
        const defaultSubTab = toolConfig.subTabs[0].id;
        renderSubTabContent(tabName, defaultSubTab);
      } else {
        $content.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');
      }
      break;
    case "bypass":
      await renderBypassPanel($content);
      break;
    case "settings":
      await renderSettingsPanel($content);
      break;
    default:
      renderToolWindow(tabName, $content);
      break;
  }
}
async function renderBypassPanel($container2) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$)
    return;
  try {
    const { BypassPanel: BypassPanel2 } = await Promise.resolve().then(() => (init_bypass_panel(), bypass_panel_exports));
    const styleId = `${SCRIPT_ID2}-bypass-styles`;
    const targetDoc = topLevelWindow.document || document;
    if (!targetDoc.getElementById(styleId) && BypassPanel2.getStyles) {
      const style = targetDoc.createElement("style");
      style.id = styleId;
      style.textContent = BypassPanel2.getStyles();
      (targetDoc.head || targetDoc.documentElement).appendChild(style);
    }
    BypassPanel2.renderTo($container2);
  } catch (error) {
    console.error(`[${SCRIPT_ID2}] \u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`, error);
    $container2.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>`);
  }
}
async function renderSettingsPanel($container2) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$)
    return;
  try {
    const { SettingsPanel: SettingsPanel2 } = await Promise.resolve().then(() => (init_settings_panel(), settings_panel_exports));
    const styleId = `${SCRIPT_ID2}-settings-styles`;
    const targetDoc = topLevelWindow.document || document;
    if (!targetDoc.getElementById(styleId) && SettingsPanel2.getStyles) {
      const style = targetDoc.createElement("style");
      style.id = styleId;
      style.textContent = SettingsPanel2.getStyles();
      (targetDoc.head || targetDoc.documentElement).appendChild(style);
    }
    SettingsPanel2.renderTo($container2);
  } catch (error) {
    console.error(`[${SCRIPT_ID2}] \u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`, error);
    $container2.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>`);
  }
}
function renderSubTabContent(mainTab, subTab) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !currentPopup)
    return;
  const $mainContent = $(currentPopup).find(`.yyt-tab-content[data-tab="${mainTab}"]`);
  if (!$mainContent.length)
    return;
  const mainToolConfig = toolRegistryModule?.getToolConfig(mainTab);
  if (mainToolConfig?.hasSubTabs) {
    const subToolConfig = mainToolConfig.subTabs?.find((st) => st.id === subTab);
    if (subToolConfig) {
      let $subContent = $mainContent.find(".yyt-sub-content");
      if (!$subContent.length) {
        $mainContent.html(`<div class="yyt-sub-content"></div>`);
        $subContent = $mainContent.find(".yyt-sub-content");
      }
      switch (subToolConfig.component) {
        case "SummaryToolPanel":
          if (uiComponentsModule?.SummaryToolPanel) {
            uiComponentsModule.SummaryToolPanel.renderTo($subContent);
          } else {
            $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');
          }
          break;
        case "StatusBlockPanel":
          if (uiComponentsModule?.StatusBlockPanel) {
            uiComponentsModule.StatusBlockPanel.renderTo($subContent);
          } else {
            $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');
          }
          break;
        default:
          $subContent.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>`);
      }
    }
    return;
  }
  const $content = $mainContent.find(".yyt-sub-content");
  if (!$content.length)
    return;
  switch (subTab) {
    case "config":
      renderToolConfig(mainTab, $content);
      break;
    case "prompts":
      renderPromptEditor(mainTab, $content);
      break;
    case "presets":
      renderToolPresets(mainTab, $content);
      break;
    default:
      $content.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>`);
  }
}
function renderToolWindow(toolId, $container2) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$)
    return;
  const toolConfig = toolRegistryModule?.getToolConfig(toolId);
  if (!toolConfig) {
    $container2.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>`);
    return;
  }
  const currentSub = currentSubTab[toolId] || toolConfig.subTabs?.[0]?.id || "config";
  $container2.html(`
    <div class="yyt-tool-window">
      <div class="yyt-sub-content" data-subtab="${currentSub}">
        <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
      </div>
    </div>
  `);
  renderSubTabContent(toolId, currentSub);
}
function renderToolConfig(toolId, $container2) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$)
    return;
  const tool = toolManagerModule?.getTool(toolId);
  const apiPresets = presetManagerModule?.getAllPresets() || [];
  const boundPreset = toolRegistryModule?.getToolApiPreset(toolId) || "";
  const presetOptions = apiPresets.map(
    (p) => `<option value="${escapeHtml3(p.name)}" ${p.name === boundPreset ? "selected" : ""}>${escapeHtml3(p.name)}</option>`
  ).join("");
  $container2.html(`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-plug"></i>
          <span>API\u9884\u8BBE\u7ED1\u5B9A</span>
        </div>
        <div class="yyt-form-group">
          <label>\u9009\u62E9API\u9884\u8BBE</label>
          <select class="yyt-select" id="yyt-tool-api-preset">
            <option value="">\u4F7F\u7528\u5F53\u524D\u914D\u7F6E</option>
            ${presetOptions}
          </select>
        </div>
        <button class="yyt-btn yyt-btn-primary" id="yyt-save-tool-preset">
          <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u7ED1\u5B9A
        </button>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-cog"></i>
          <span>\u6267\u884C\u914D\u7F6E</span>
        </div>
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u8D85\u65F6\u65F6\u95F4 (ms)</label>
            <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${tool?.config?.execution?.timeout || 6e4}">
          </div>
          <div class="yyt-form-group yyt-flex-1">
            <label>\u91CD\u8BD5\u6B21\u6570</label>
            <input type="number" class="yyt-input" id="yyt-tool-retries" value="${tool?.config?.execution?.retries || 3}">
          </div>
        </div>
      </div>
    </div>
  `);
  $container2.find("#yyt-save-tool-preset").on("click", function() {
    const presetName = $container2.find("#yyt-tool-api-preset").val();
    toolRegistryModule?.setToolApiPreset(toolId, presetName);
    const toastr = topLevelWindow.toastr;
    if (toastr) {
      toastr.success(`API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58`, "YouYou \u5DE5\u5177\u7BB1");
    }
  });
}
function renderPromptEditor(toolId, $container2) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$ || !promptEditorModule) {
    $container2.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>`);
    return;
  }
  const tool = toolManagerModule?.getTool(toolId);
  const messages = tool?.config?.messages || [];
  const segments = promptEditorModule.messagesToSegments ? promptEditorModule.messagesToSegments(messages) : promptEditorModule.DEFAULT_PROMPT_SEGMENTS;
  const editor = new promptEditorModule.PromptEditor({
    containerId: `yyt-prompt-editor-${toolId}`,
    segments,
    onChange: (newSegments) => {
      const newMessages = promptEditorModule.segmentsToMessages ? promptEditorModule.segmentsToMessages(newSegments) : [];
      log2("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:", newMessages.length, "\u6761\u6D88\u606F");
    }
  });
  $container2.html(`<div id="yyt-prompt-editor-${toolId}" class="yyt-prompt-editor-container"></div>`);
  editor.init($container2.find(`#yyt-prompt-editor-${toolId}`));
  const editorStyles = promptEditorModule.getPromptEditorStyles ? promptEditorModule.getPromptEditorStyles() : "";
  if (editorStyles) {
    const styleId = `yyt-prompt-editor-styles`;
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = editorStyles;
      document.head.appendChild(style);
    }
  }
}
function renderToolPresets(toolId, $container2) {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$)
    return;
  $container2.html(`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-bookmark"></i>
          <span>\u5DE5\u5177\u9884\u8BBE</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" style="margin-left: auto;">
            <i class="fa-solid fa-plus"></i> \u65B0\u5EFA
          </button>
        </div>
        <div class="yyt-empty-state-small">
          <i class="fa-solid fa-bookmark"></i>
          <span>\u6682\u65E0\u4FDD\u5B58\u7684\u9884\u8BBE</span>
        </div>
      </div>
    </div>
  `);
}
function openPopup() {
  if (currentPopup) {
    log2("\u5F39\u7A97\u5DF2\u5B58\u5728");
    return;
  }
  const $ = topLevelWindow.jQuery || window.jQuery;
  const targetDoc = topLevelWindow.document || document;
  if (!$) {
    logError("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");
    return;
  }
  const tools = toolRegistryModule?.getToolList() || [];
  currentOverlay = targetDoc.createElement("div");
  currentOverlay.className = "yyt-popup-overlay";
  currentOverlay.addEventListener("click", (e) => {
    if (e.target === currentOverlay) {
      closePopup();
    }
  });
  targetDoc.body.appendChild(currentOverlay);
  const mainNavHtml = tools.map((tool) => `
    <div class="yyt-main-nav-item ${tool.id === currentMainTab ? "active" : ""}" data-tab="${tool.id}">
      <i class="fa-solid ${tool.icon}"></i>
      <span>${tool.name}</span>
    </div>
  `).join("");
  const contentHtml = tools.map((tool) => `
    <div class="yyt-tab-content ${tool.id === currentMainTab ? "active" : ""}" data-tab="${tool.id}">
      <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
    </div>
  `).join("");
  const popupHtml = `
    <div class="yyt-popup" id="${POPUP_ID}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${SCRIPT_VERSION}</span>
        </div>
        <button class="yyt-popup-close" title="\u5173\u95ED">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="yyt-popup-body">
        <div class="yyt-main-nav">
          ${mainNavHtml}
        </div>
        
        <div class="yyt-sub-nav" style="display: none;">
          <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
        </div>
        
        <div class="yyt-content">
          ${contentHtml}
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID2}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `;
  const tempDiv = targetDoc.createElement("div");
  tempDiv.innerHTML = popupHtml;
  currentPopup = tempDiv.firstElementChild;
  targetDoc.body.appendChild(currentPopup);
  $(currentPopup).find(".yyt-popup-close").on("click", closePopup);
  $(currentPopup).find(`#${SCRIPT_ID2}-close-btn`).on("click", closePopup);
  $(currentPopup).find(".yyt-main-nav-item").on("click", function() {
    const tab = $(this).data("tab");
    if (tab) {
      switchMainTab(tab);
    }
  });
  renderTabContent(currentMainTab);
  const currentToolConfig = toolRegistryModule?.getToolConfig(currentMainTab);
  if (currentToolConfig?.hasSubTabs) {
    $(currentPopup).find(".yyt-sub-nav").show();
    renderSubNav(currentMainTab, currentToolConfig.subTabs);
  }
  log2("\u5F39\u7A97\u5DF2\u6253\u5F00");
}
function addMenuItem() {
  const $ = topLevelWindow.jQuery || window.jQuery;
  if (!$) {
    logError("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5...");
    setTimeout(addMenuItem, 1e3);
    return;
  }
  const parentDoc = topLevelWindow.document || document;
  const extensionsMenu = $("#extensionsMenu", parentDoc);
  if (!extensionsMenu.length) {
    log2("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5...");
    setTimeout(addMenuItem, 2e3);
    return;
  }
  const existingItem = $(`#${MENU_CONTAINER_ID}`, extensionsMenu);
  if (existingItem.length > 0) {
    log2("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");
    return;
  }
  const $menuContainer = $(`<div class="extension_container interactable" id="${MENU_CONTAINER_ID}" tabindex="0"></div>`);
  const menuItemHtml = `
    <div class="list-group-item flex-container flexGap5 interactable" id="${MENU_ITEM_ID}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `;
  const $menuItem = $(menuItemHtml);
  $menuItem.on("click", async function(e) {
    e.stopPropagation();
    log2("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");
    const exMenuBtn = $("#extensionsMenuButton", parentDoc);
    if (exMenuBtn.length && extensionsMenu.is(":visible")) {
      exMenuBtn.trigger("click");
    }
    openPopup();
  });
  $menuContainer.append($menuItem);
  extensionsMenu.append($menuContainer);
  log2("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A");
}
var YouYouToolkit = {
  version: SCRIPT_VERSION,
  id: SCRIPT_ID2,
  // 初始化
  init: init2,
  // 弹窗控制
  openPopup,
  closePopup,
  // 标签切换
  switchMainTab,
  switchSubTab,
  // 菜单管理
  addMenuItem,
  // 模块访问（异步）
  getStorage: () => storageModule,
  getApiConnection: () => apiConnectionModule,
  getPresetManager: () => presetManagerModule,
  getUiComponents: () => uiComponentsModule,
  getRegexExtractor: () => regexExtractorModule,
  getToolManager: () => toolManagerModule,
  getToolExecutor: () => toolExecutorModule,
  getToolTrigger: () => toolTriggerModule,
  getWindowManager: () => windowManagerModule,
  getToolRegistry: () => toolRegistryModule,
  getPromptEditor: () => promptEditorModule,
  // v0.5 新模块访问
  getSettingsService: () => settingsServiceModule,
  getBypassManager: () => bypassManagerModule,
  getVariableResolver: () => variableResolverModule,
  getContextInjector: () => contextInjectorModule,
  getToolPromptService: () => toolPromptServiceModule,
  getToolOutputService: () => toolOutputServiceModule,
  // 便捷方法
  async getApiConfig() {
    await loadModules();
    return storageModule ? storageModule.loadSettings().apiConfig : null;
  },
  async saveApiConfig(config) {
    await loadModules();
    if (apiConnectionModule) {
      apiConnectionModule.updateApiConfig(config);
      return true;
    }
    return false;
  },
  async getPresets() {
    await loadModules();
    return presetManagerModule ? presetManagerModule.getAllPresets() : [];
  },
  async sendApiRequest(messages, options) {
    await loadModules();
    if (apiConnectionModule) {
      return apiConnectionModule.sendApiRequest(messages, options);
    }
    throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D");
  },
  async testApiConnection() {
    await loadModules();
    if (apiConnectionModule) {
      return apiConnectionModule.testApiConnection();
    }
    return { success: false, message: "API\u6A21\u5757\u672A\u52A0\u8F7D" };
  },
  // 工具注册
  registerTool(id, config) {
    return toolRegistryModule?.registerTool(id, config) || false;
  },
  unregisterTool(id) {
    return toolRegistryModule?.unregisterTool(id) || false;
  },
  getToolList() {
    return toolRegistryModule?.getToolList() || [];
  },
  // 窗口管理
  createWindow(options) {
    return windowManagerModule?.createWindow(options) || null;
  },
  closeWindow(id) {
    windowManagerModule?.closeWindow(id);
  }
};
async function init2() {
  log2(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${SCRIPT_VERSION}`);
  await injectStyles();
  const modulesLoaded = await loadModules();
  if (modulesLoaded) {
    log2("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F");
    if (toolTriggerModule && toolTriggerModule.initTriggerModule) {
      try {
        toolTriggerModule.initTriggerModule();
        log2("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");
      } catch (triggerError) {
        console.error(`[${SCRIPT_ID2}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`, triggerError);
      }
    }
    const targetDoc2 = topLevelWindow.document || document;
    if (uiComponentsModule) {
      const uiStyleId = `${SCRIPT_ID2}-ui-styles`;
      if (!targetDoc2.getElementById(uiStyleId)) {
        const uiStyle = targetDoc2.createElement("style");
        uiStyle.id = uiStyleId;
        uiStyle.textContent = uiComponentsModule.getStyles();
        (targetDoc2.head || targetDoc2.documentElement).appendChild(uiStyle);
      }
      const regexStyleId = `${SCRIPT_ID2}-regex-styles`;
      if (!targetDoc2.getElementById(regexStyleId) && uiComponentsModule.getRegexStyles) {
        const regexStyle = targetDoc2.createElement("style");
        regexStyle.id = regexStyleId;
        regexStyle.textContent = uiComponentsModule.getRegexStyles();
        (targetDoc2.head || targetDoc2.documentElement).appendChild(regexStyle);
      }
      const toolStyleId = `${SCRIPT_ID2}-tool-styles`;
      if (!targetDoc2.getElementById(toolStyleId) && uiComponentsModule.getToolStyles) {
        const toolStyle = targetDoc2.createElement("style");
        toolStyle.id = toolStyleId;
        toolStyle.textContent = uiComponentsModule.getToolStyles();
        (targetDoc2.head || targetDoc2.documentElement).appendChild(toolStyle);
      }
    }
    if (windowManagerModule) {
      const windowStyleId = `${SCRIPT_ID2}-window-styles`;
      if (!targetDoc2.getElementById(windowStyleId)) {
      }
    }
    if (promptEditorModule && promptEditorModule.getPromptEditorStyles) {
      const promptStyleId = `${SCRIPT_ID2}-prompt-styles`;
      if (!targetDoc2.getElementById(promptStyleId)) {
        const promptStyle = targetDoc2.createElement("style");
        promptStyle.id = promptStyleId;
        promptStyle.textContent = promptEditorModule.getPromptEditorStyles();
        (targetDoc2.head || targetDoc2.documentElement).appendChild(promptStyle);
      }
    }
    try {
      const { applyTheme: applyTheme2 } = await Promise.resolve().then(() => (init_settings_panel(), settings_panel_exports));
      if (settingsServiceModule && settingsServiceModule.settingsService) {
        const uiSettings = settingsServiceModule.settingsService.getUiSettings();
        if (uiSettings && uiSettings.theme) {
          applyTheme2(uiSettings.theme);
          log2(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${uiSettings.theme}`);
          if (uiSettings.compactMode) {
            document.documentElement.classList.add("yyt-compact-mode");
          }
          if (!uiSettings.animationEnabled) {
            document.documentElement.classList.add("yyt-no-animation");
          }
        }
      }
    } catch (themeError) {
      log2("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:", themeError);
    }
  } else {
    log2("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");
  }
  const targetDoc = topLevelWindow.document || document;
  if (targetDoc.readyState === "loading") {
    targetDoc.addEventListener("DOMContentLoaded", () => {
      setTimeout(addMenuItem, 1e3);
    });
  } else {
    setTimeout(addMenuItem, 1e3);
  }
  log2("\u521D\u59CB\u5316\u5B8C\u6210");
}
if (typeof window !== "undefined") {
  window.YouYouToolkit = YouYouToolkit;
  if (typeof window.parent !== "undefined" && window.parent !== window) {
    try {
      window.parent.YouYouToolkit = YouYouToolkit;
    } catch (e) {
    }
  }
}
var youyou_Toolkit_default = YouYouToolkit;
init2();
log2("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");
export {
  youyou_Toolkit_default as default
};
