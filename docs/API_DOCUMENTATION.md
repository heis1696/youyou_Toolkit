# API 文档

本文档详细说明 YouYou Toolkit v0.4.0 提供的 API 接口。

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
console.log(YouYouToolkit.version); // "0.4.0"
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

#### `switchMainTab(pageName)`

切换弹窗内的主标签页。

- **类型**: `(pageName: string) => void`
- **参数**:
  - `pageName`: 页面名称，如 `'apiPresets'`、`'bypassPanel'`、`'regexExtract'` 等

#### `switchSubTab(mainTab, subTab)`

切换次级标签页。

- **类型**: `(mainTab: string, subTab: string) => void`

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
// ui.renderRegex(container)
// ui.getStyles()
// ui.getRegexStyles()
```

### `getRegexExtractor()`

获取正则提取模块。

```javascript
const regex = YouYouToolkit.getRegexExtractor();
// regex.getAllTemplates()
// regex.getTemplate(id)
// regex.createTemplate(template)
// regex.updateTemplate(id, updates)
// regex.deleteTemplate(id)
// regex.testRegex(pattern, text, flags, groupIndex)
// regex.extractWithTemplate(templateId, text)
// regex.generateExtractionScript(templateId, source, varName)
// regex.generateReplaceScript(pattern, replacement, source)
// regex.exportTemplates()
// regex.importTemplates(json, options)
```

### `getToolManager()`

获取工具管理模块。

```javascript
const toolMgr = YouYouToolkit.getToolManager();
// toolMgr.getAllTools()
// toolMgr.getTool(toolId)
// toolMgr.saveTool(toolId, toolDef)
// toolMgr.deleteTool(toolId)
// toolMgr.setToolEnabled(toolId, enabled)
// toolMgr.cloneTool(toolId, newId, newName)
```

### `getToolExecutor()`

获取工具执行引擎模块。

```javascript
const executor = YouYouToolkit.getToolExecutor();
// executor.executeTool(toolId, options, executorFn)
// executor.executeBatch(tasks, batchOptions)
// executor.abortTask(taskId)
// executor.abortAllTasks()
```

### `getToolTrigger()`

获取事件触发模块。

```javascript
const trigger = YouYouToolkit.getToolTrigger();
// trigger.registerEventListener(eventType, callback, options)
// trigger.unregisterEventListener(eventType, callback)
// trigger.getChatContext(options)
// trigger.getCurrentCharacter()
```

### `getBypassPrompts()`

获取破限词预设管理模块。

```javascript
const bypass = YouYouToolkit.getBypassPrompts();
// bypass.getAllBypassPresets()
// bypass.getBypassPreset(presetId)
// bypass.saveBypassPreset(presetId, preset)
// bypass.deleteBypassPreset(presetId)
// bypass.getCurrentBypassPresetId()
// bypass.setCurrentBypassPreset(presetId)
// bypass.getCurrentBypassMessages()
// bypass.isBypassEnabled()
// bypass.setBypassEnabled(enabled)
// bypass.exportBypassPresets()
// bypass.importBypassPresets(jsonString, overwrite)
```

### `getWindowManager()`

获取窗口管理模块。

```javascript
const windowMgr = YouYouToolkit.getWindowManager();
// windowMgr.createWindow(options)
// windowMgr.closeWindow(id)
// windowMgr.bringToFront(id)
// windowMgr.closeAll()
```

### `getToolRegistry()`

获取工具注册模块。

```javascript
const registry = YouYouToolkit.getToolRegistry();
// registry.registerTool(id, config)
// registry.unregisterTool(id)
// registry.getToolList()
// registry.getToolConfig(id)
// registry.getToolApiPreset(toolId)
// registry.setToolApiPreset(toolId, presetName)
```

### `getPromptEditor()`

获取提示词编辑器模块。

```javascript
const promptEditor = YouYouToolkit.getPromptEditor();
// promptEditor.PromptEditor - 提示词编辑器类
// promptEditor.messagesToSegments(messages)
// promptEditor.segmentsToMessages(segments)
// promptEditor.DEFAULT_PROMPT_SEGMENTS
// promptEditor.getPromptEditorStyles()
```

---

## 便捷方法

### `getApiConfig()`

获取当前API配置。

- **类型**: `() => Promise<Object>`
- **返回**: API配置对象

```javascript
const config = await YouYouToolkit.getApiConfig();
```

### `saveApiConfig(config)`

保存API配置。

- **类型**: `(config: Object) => Promise<boolean>`

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

### `getPresets()`

获取所有预设。

- **类型**: `() => Promise<Array>`
- **返回**: 预设数组

```javascript
const presets = await YouYouToolkit.getPresets();
```

### `sendApiRequest(messages, options)`

发送API请求。

- **类型**: `(messages: Array, options?: Object) => Promise<string>`

```javascript
const response = await YouYouToolkit.sendApiRequest([
  { role: 'user', content: 'Hello!' }
]);
```

### `testApiConnection()`

测试当前API连接。

- **类型**: `() => Promise<Object>`
- **返回**: `{ success: boolean, message: string, latency?: number }`

```javascript
const result = await YouYouToolkit.testApiConnection();
```

---

## 工具注册 API

### `registerTool(id, config)`

注册新工具。

- **类型**: `(id: string, config: Object) => boolean`
- **参数**:
  - `id`: 工具唯一标识
  - `config`: 工具配置对象

```javascript
YouYouToolkit.registerTool('myTool', {
  id: 'myTool',
  name: '我的工具',
  icon: 'fa-tools',
  description: '工具描述',
  hasSubTabs: false
});
```

### `unregisterTool(id)`

注销工具。

- **类型**: `(id: string) => boolean`

### `getToolList()`

获取所有已注册工具列表。

- **类型**: `() => Array<Object>`

---

## 窗口管理 API

### `createWindow(options)`

创建独立窗口。

- **类型**: `(options: Object) => Object|null`
- **参数**:
  - `options.id`: 窗口ID
  - `options.title`: 窗口标题
  - `options.content`: 窗口内容HTML
  - `options.width`: 宽度（默认900）
  - `options.height`: 高度（默认700）
  - `options.modal`: 是否模态（默认false）
  - `options.resizable`: 是否可调整大小（默认true）

```javascript
const win = YouYouToolkit.createWindow({
  id: 'my-window',
  title: '我的窗口',
  content: '<div>窗口内容</div>',
  width: 600,
  height: 400
});
```

### `closeWindow(id)`

关闭指定窗口。

- **类型**: `(id: string) => void`

---

## 数据结构

### API配置对象

```typescript
interface ApiConfig {
  url: string;           // API URL
  apiKey: string;        // API密钥
  model: string;         // 模型名称
  useMainApi: boolean;   // 是否使用SillyTavern主API
  max_tokens: number;    // 最大token数
  temperature: number;   // 温度参数 (0-2)
  top_p: number;         // Top P参数 (0-1)
}
```

### 预设对象

```typescript
interface ApiPreset {
  name: string;          // 预设名称
  description: string;   // 预设描述
  apiConfig: ApiConfig;  // API配置
  createdAt: number;     // 创建时间戳
  updatedAt: number;     // 更新时间戳
}
```

### 正则模板对象

```typescript
interface RegexTemplate {
  id: string;            // 模板ID
  name: string;          // 模板名称
  description: string;   // 模板描述
  pattern: string;       // 正则表达式
  flags: string;         // 标志位 (g/i/m)
  groupIndex: number;    // 捕获组索引
  createdAt?: string;    // 创建时间
  updatedAt?: string;    // 更新时间
}
```

### 破限词预设对象

```typescript
interface BypassPreset {
  name: string;          // 预设名称
  description: string;   // 预设描述
  messages: Array<{
    role: 'SYSTEM' | 'USER' | 'assistant';
    content: string;
    deletable: boolean;
  }>;
}
```

### 工具配置对象

```typescript
interface ToolConfig {
  id: string;            // 工具ID
  name: string;          // 显示名称
  icon: string;          // FontAwesome图标类名
  description: string;   // 描述
  hasSubTabs?: boolean;  // 是否有子标签
  subTabs?: Array<{      // 子标签列表
    id: string;
    name: string;
    icon?: string;
  }>;
  apiPreset?: string;    // 绑定的API预设
  bypassPreset?: string; // 绑定的破限词预设
  enabled?: boolean;     // 是否启用
}
```

---

## 内部常量

| 常量名 | 值 | 说明 |
|--------|-----|------|
| `SCRIPT_ID` | `"youyou_toolkit"` | 脚本唯一标识 |
| `SCRIPT_VERSION` | `"0.4.0"` | 脚本版本 |
| `MENU_ITEM_ID` | `"youyou_toolkit-menu-item"` | 菜单项 DOM ID |
| `MENU_CONTAINER_ID` | `"youyou_toolkit-menu-container"` | 菜单容器 DOM ID |
| `POPUP_ID` | `"youyou_toolkit-popup"` | 弹窗 DOM ID |

---

## 错误处理

插件内部使用 `console.log` 和 `console.error` 输出日志：

```javascript
// 正常日志
[youyou_toolkit] 初始化开始... 版本: 0.4.0
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
| 0.4.0 | 最新版 | 内置 |
| 0.3.x | 最新版 | 内置 |
| 0.2.x | 最新版 | 内置 |

---

## 更新日志

详见 [CHANGELOG.md](./CHANGELOG.md)