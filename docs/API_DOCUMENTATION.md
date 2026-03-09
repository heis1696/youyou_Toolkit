# API 文档

本文档详细说明 YouYou Toolkit v0.2.0 提供的 API 接口。

## 模块导入

### ES Module 方式

```javascript
import YouYouToolkit from 'https://testingcf.jsdelivr.net/gh/heis1696/youyou_Toolkit@main/dist/bundle.js';
```

### 全局变量

插件会自动注册到 `window.YouYouToolkit`：

```javascript
// 直接访问全局变量
const toolkit = window.YouYouToolkit;
```

---

## 核心 API

### 属性

#### `version`

返回当前插件版本号。

- **类型**: `string`
- **示例**:

```javascript
console.log(YouYouToolkit.version); // "0.2.0"
```

#### `id`

返回插件唯一标识符。

- **类型**: `string`
- **示例**:

```javascript
console.log(YouYouToolkit.id); // "youyou_toolkit"
```

---

### 基础方法

#### `init()`

初始化插件，注入样式并注册菜单项。

- **类型**: `() => Promise<void>`
- **说明**: 插件导入时会自动调用此方法，通常无需手动调用。

#### `openPopup()`

打开工具箱弹窗。

- **类型**: `() => void`

#### `closePopup()`

关闭工具箱弹窗。

- **类型**: `() => void`

#### `switchPage(pageName)`

切换弹窗内的页面。

- **类型**: `(pageName: string) => void`
- **参数**:
  - `pageName`: 页面名称，可选值：`'welcome'` | `'api'`

---

## API 配置管理

### `getApiConfig()`

获取当前API配置。

- **类型**: `() => Promise<Object>`
- **返回**: API配置对象

```javascript
const config = await YouYouToolkit.getApiConfig();
console.log(config);
// {
//   url: 'https://api.openai.com/v1/chat/completions',
//   apiKey: 'sk-...',
//   model: 'gpt-4',
//   useMainApi: false,
//   max_tokens: 4096,
//   temperature: 0.7,
//   top_p: 0.9
// }
```

### `saveApiConfig(config)`

保存API配置。

- **类型**: `(config: Object) => Promise<boolean>`
- **参数**:
  - `config`: API配置对象

```javascript
const success = await YouYouToolkit.saveApiConfig({
  url: 'https://api.openai.com/v1/chat/completions',
  apiKey: 'sk-your-key',
  model: 'gpt-4',
  useMainApi: false,
  max_tokens: 4096,
  temperature: 0.7,
  top_p: 0.9
});
```

### `testApiConnection()`

测试当前API连接。

- **类型**: `() => Promise<Object>`
- **返回**: `{ success: boolean, message: string, latency?: number }`

```javascript
const result = await YouYouToolkit.testApiConnection();
if (result.success) {
  console.log(`连接成功，延迟: ${result.latency}ms`);
} else {
  console.error(`连接失败: ${result.message}`);
}
```

### `sendApiRequest(messages, options)`

发送API请求。

- **类型**: `(messages: Array, options?: Object) => Promise<string>`
- **参数**:
  - `messages`: OpenAI格式的消息数组
  - `options`: 可选配置

```javascript
const response = await YouYouToolkit.sendApiRequest([
  { role: 'user', content: 'Hello!' }
]);
console.log(response);
```

---

## 预设管理

### `getPresets()`

获取所有预设。

- **类型**: `() => Promise<Array>`
- **返回**: 预设数组

```javascript
const presets = await YouYouToolkit.getPresets();
console.log(presets);
// [
//   {
//     name: 'GPT-4',
//     description: 'OpenAI GPT-4',
//     apiConfig: { ... },
//     createdAt: 1709900000000,
//     updatedAt: 1709900000000
//   },
//   ...
// ]
```

---

## 模块访问

### `getStorage()`

获取存储模块。

```javascript
const storage = YouYouToolkit.getStorage();
// storage.loadSettings()
// storage.saveSettings(settings)
// storage.loadApiPresets()
// storage.saveApiPresets(presets)
```

### `getApiConnection()`

获取API连接模块。

```javascript
const api = YouYouToolkit.getApiConnection();
// api.getApiConfig()
// api.updateApiConfig(config)
// api.validateApiConfig(config)
// api.sendApiRequest(messages, options)
// api.testApiConnection(config)
// api.fetchAvailableModels(config)
```

### `getPresetManager()`

获取预设管理模块。

```javascript
const presetMgr = YouYouToolkit.getPresetManager();
// presetMgr.getAllPresets()
// presetMgr.getPreset(name)
// presetMgr.createPreset(presetData)
// presetMgr.updatePreset(name, updates)
// presetMgr.deletePreset(name)
// presetMgr.switchToPreset(name)
// presetMgr.exportPresets(name)
// presetMgr.importPresets(jsonString)
```

### `getUiComponents()`

获取UI组件模块。

```javascript
const ui = YouYouToolkit.getUiComponents();
// ui.render(container)
// ui.getStyles()
// ui.getCurrentTab()
// ui.setCurrentTab(tab)
```

---

## API配置对象结构

```typescript
interface ApiConfig {
  // API URL（自定义API时必填）
  url: string;
  
  // API密钥
  apiKey: string;
  
  // 模型名称
  model: string;
  
  // 是否使用SillyTavern主API
  useMainApi: boolean;
  
  // 最大token数
  max_tokens: number;
  
  // 温度参数 (0-2)
  temperature: number;
  
  // Top P参数 (0-1)
  top_p: number;
}
```

---

## 预设对象结构

```typescript
interface ApiPreset {
  // 预设名称
  name: string;
  
  // 预设描述
  description: string;
  
  // API配置
  apiConfig: ApiConfig;
  
  // 创建时间戳
  createdAt: number;
  
  // 更新时间戳
  updatedAt: number;
}
```

---

## 完整使用示例

### 示例 1：配置自定义API

```javascript
import YouYouToolkit from './dist/bundle.js';

// 配置自定义API
await YouYouToolkit.saveApiConfig({
  url: 'https://api.openai.com/v1/chat/completions',
  apiKey: 'sk-your-api-key',
  model: 'gpt-4-turbo',
  useMainApi: false,
  max_tokens: 8192,
  temperature: 0.8,
  top_p: 0.95
});

// 测试连接
const result = await YouYouToolkit.testApiConnection();
console.log(result.message);
```

### 示例 2：使用预设

```javascript
// 获取预设管理模块
const presetMgr = YouYouToolkit.getPresetManager();

// 从当前配置创建预设
const result = presetMgr.createPresetFromCurrentConfig('我的GPT-4配置', '用于日常对话');
console.log(result.message);

// 列出所有预设
const presets = presetMgr.getAllPresets();
presets.forEach(preset => {
  console.log(`- ${preset.name}: ${preset.description}`);
});

// 切换预设
presetMgr.switchToPreset('我的GPT-4配置');
```

### 示例 3：发送API请求

```javascript
// 发送简单请求
const response = await YouYouToolkit.sendApiRequest([
  { role: 'system', content: '你是一个有用的助手。' },
  { role: 'user', content: '你好！' }
]);
console.log(response);

// 带中止信号的请求
const controller = new AbortController();
const response = await YouYouToolkit.sendApiRequest(
  [{ role: 'user', content: '写一首诗' }],
  { signal: controller.signal }
);

// 取消请求
controller.abort();
```

### 示例 4：导入导出预设

```javascript
const presetMgr = YouYouToolkit.getPresetManager();

// 导出所有预设
const json = presetMgr.exportPresets();
// 保存到文件...
console.log(json);

// 导入预设
const importResult = presetMgr.importPresets(json, { overwrite: true });
console.log(`导入了 ${importResult.imported} 个预设`);
```

---

## 内部常量

| 常量名 | 值 | 说明 |
|--------|-----|------|
| `SCRIPT_ID` | `"youyou_toolkit"` | 脚本唯一标识 |
| `SCRIPT_VERSION` | `"0.2.0"` | 脚本版本 |
| `MENU_ITEM_ID` | `"youyou_toolkit-menu-item"` | 菜单项 DOM ID |
| `MENU_CONTAINER_ID` | `"youyou_toolkit-menu-container"` | 菜单容器 DOM ID |
| `POPUP_ID` | `"youyou_toolkit-popup"` | 弹窗 DOM ID |

---

## 错误处理

插件内部使用 `console.log` 和 `console.error` 输出日志：

```javascript
// 正常日志
[youyou_toolkit] 初始化开始... 版本: 0.2.0
[youyou_toolkit] 所有模块加载成功
[youyou_toolkit] 样式已注入

// 错误日志
[youyou_toolkit] 模块加载失败，使用内置功能
[youyou_toolkit] jQuery 未找到，无法创建弹窗
```

---

## 版本兼容性

| YouYou Toolkit | SillyTavern | jQuery |
|----------------|-------------|--------|
| 0.2.0 | 最新版 | 内置 |
| 0.1.0 | 最新版 | 内置 |

---

## 更新日志

详见 [CHANGELOG.md](./CHANGELOG.md)