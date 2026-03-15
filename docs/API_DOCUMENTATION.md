# API 文档

本文档详细说明 YouYou Toolkit v0.6.2 提供的 API 接口。

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
console.log(YouYouToolkit.version); // "0.6.2"
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
  - `pageName`: 页面名称，如 `'apiPresets'`、`'bypass'`、`'regexExtract'`、`'settings'`、`'tools'` 等

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
// toolMgr.importTools(jsonString, overwriteOrOptions)
```

> `importTools()` 兼容两种调用方式：`importTools(json, true)` 与 `importTools(json, { overwrite: true })`。

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
// trigger.initToolTriggerManager()
// trigger.runToolManually(toolId)
// trigger.previewToolExtraction(toolId)
// trigger.getToolTriggerManagerState()
```

### `getBypassManager()`

获取破限词管理模块。

```javascript
const bypass = YouYouToolkit.getBypassManager();
// bypass.getAllPresets()          // 获取所有预设（对象形式）
// bypass.getPresetList()          // 获取预设列表（数组形式）
// bypass.getPreset(presetId)      // 获取单个预设
// bypass.createPreset(presetData) // 创建预设
// bypass.updatePreset(presetId, updates) // 更新预设
// bypass.deletePreset(presetId)   // 删除预设
// bypass.duplicatePreset(sourceId, newId, newName) // 复制预设
// bypass.getDefaultPresetId()     // 获取默认预设ID
// bypass.setDefaultPresetId(presetId) // 设置默认预设
// bypass.getEnabledMessages(presetId) // 获取启用的消息
// bypass.addMessage(presetId, message) // 添加消息
// bypass.updateMessage(presetId, messageId, updates) // 更新消息
// bypass.deleteMessage(presetId, messageId) // 删除消息
// bypass.exportPresets(presetId)  // 导出预设
// bypass.importPresets(jsonString, options) // 导入预设
// bypass.buildBypassMessages(toolConfig) // 构建工具的破限词消息
```

### `getSettingsService()`

获取设置服务模块。

```javascript
const settings = YouYouToolkit.getSettingsService();
// settings.getSettings()          // 获取所有设置
// settings.saveSettings(settings) // 保存设置
// settings.updateSettings(partial) // 更新部分设置
// settings.getExecutorSettings()  // 获取执行器设置
// settings.updateExecutorSettings(executorSettings) // 更新执行器设置
// settings.getListenerSettings()  // 获取监听器设置
// settings.updateListenerSettings(listenerSettings) // 更新监听器设置
// settings.getDebugSettings()     // 获取调试设置
// settings.updateDebugSettings(debugSettings) // 更新调试设置
// settings.getUiSettings()        // 获取UI设置
// settings.updateUiSettings(uiSettings) // 更新UI设置
// settings.resetSettings()        // 重置为默认设置
// settings.get(path, defaultValue) // 获取单个设置值
// settings.set(path, value)       // 设置单个值
```

### `getVariableResolver()`

获取变量解析服务模块。

```javascript
const resolver = YouYouToolkit.getVariableResolver();
// resolver.resolveTemplate(template, context) // 解析模板字符串
// resolver.resolveObject(obj, context) // 解析对象中的所有字符串值
// resolver.buildToolContext(rawContext) // 构建工具执行上下文
// resolver.registerVariable(name, handler) // 注册自定义变量
// resolver.unregisterVariable(name) // 注销自定义变量
// resolver.registerHandler(prefix, handler) // 注册变量处理器
// resolver.getAvailableVariables() // 获取所有可用变量
// resolver.getVariableHelp()       // 获取变量帮助文本
```

### `getContextInjector()`

获取楼层消息写回服务模块。

```javascript
const injector = YouYouToolkit.getContextInjector();
// injector.inject(toolId, content, options) // 将工具输出写回最新 AI 楼层
// injector.getAggregatedContext(chatId) // 获取当前最新 AI 楼层上的工具输出文本
// injector.getToolContext(chatId, toolId) // 获取单个工具的注入上下文
// injector.getAllToolContexts(chatId) // 获取聊天下所有工具上下文
// injector.clearToolContext(chatId, toolId) // 清除单个工具的上下文
// injector.clearAllContext(chatId) // 清除聊天的所有工具上下文
// injector.hasToolContext(chatId, toolId) // 检查工具是否有注入上下文
// injector.getContextSummary(chatId) // 获取聊天的工具注入状态摘要
// injector.exportContext(chatId)   // 导出聊天的上下文数据
// injector.importContext(data, options) // 导入上下文数据
```

> 当前主链路中，`inject()` 的职责已经收敛为：**把工具结果直接插入最新 AI 楼层原文**，并同步更新消息对象上的 `YouYouToolkit_toolOutputs` 与 `YouYouToolkit_injectedContext` 字段，然后触发 `MESSAGE_UPDATED` 刷新界面。

### `getToolPromptService()`

获取工具提示词服务模块。

```javascript
const promptService = YouYouToolkit.getToolPromptService();
// v0.6 简化版 API
// promptService.buildToolMessages(toolConfig, context) // 构建工具消息数组
// promptService.buildPromptText(toolConfig, context)   // 构建提示词文本
// promptService.getToolPromptTemplate(toolConfig)      // 获取工具提示词模板
// promptService.setDebugMode(enabled)                  // 设置调试模式
```

> 模板中可直接使用 `{{lastAiMessage}}`、`{{extractedContent}}`、`{{recentMessagesText}}`、`{{rawRecentMessagesText}}`、`{{userMessage}}`、`{{previousToolOutput}}`、`{{toolName}}`、`{{toolId}}`。

> **v0.6 变更**: 删除了分段相关的方法（`resolvePromptSegments`、`addSegment`、`removeSegment`、`updateSegment`），改用简化的单模板模式。

### `getToolOutputService()`

获取工具输出服务模块。

```javascript
const outputService = YouYouToolkit.getToolOutputService();
// v0.6 API
// outputService.shouldRunPostResponse(toolConfig)     // 检查是否应运行 post_response_api 模式
// outputService.shouldRunFollowAi(toolConfig)         // 检查是否应运行 follow_ai 模式（新增）
// outputService.shouldRunInline(toolConfig)           // 已弃用，使用 shouldRunFollowAi
// outputService.runToolPostResponse(toolConfig, rawContext) // 执行 post_response_api 输出
// outputService.runToolInline(toolConfig, rawContext) // 执行 inline 输出（已弃用）
// outputService.previewExtraction(toolConfig, rawContext) // 预览工具提取结果
// outputService.filterPostResponseTools(toolConfigs)  // 过滤出 post_response_api 工具
// outputService.filterInlineTools(toolConfigs)        // 过滤出 inline 工具（已弃用）
// outputService.setDebugMode(enabled)                 // 设置调试模式
```

> **v0.6 变更**: `shouldRunInline` 已弃用，请使用 `shouldRunFollowAi`。输出模式 `inline` 已重命名为 `follow_ai`。

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

### 工具配置对象 (v0.6 简化版)

```typescript
interface ToolConfig {
  id: string;            // 工具ID
  name: string;          // 显示名称
  icon: string;          // FontAwesome图标类名
  description: string;   // 描述
  enabled: boolean;      // 是否启用
  
  // 触发配置
  trigger: {
    event: 'GENERATION_ENDED';
    enabled: boolean;
  };
  
  // 破限词绑定
  bypass: {
    enabled: boolean;
    presetId?: string;
  };
  
  // 输出配置
  output: {
    mode: 'follow_ai' | 'post_response_api';  // v0.6: inline 改为 follow_ai
    apiPreset?: string;    // 当 mode = post_response_api 时使用
    overwrite: boolean;    // 是否覆盖旧的注入结果
    enabled: boolean;
  };

  // 提取配置
  extraction: {
    enabled: boolean;          // 是否启用提取规则
    maxMessages: number;       // 提取时最多回看多少条 AI 消息
    selectors: string[];       // 每个工具独立的标签/正则规则，regex: 前缀表示正则第一捕获组
  };

  // 提示词模板（v0.6 简化为单文本）
  promptTemplate: string;
  
  // 运行时状态
  runtime: {
    lastRunAt: number;
    lastStatus: 'idle' | 'running' | 'success' | 'error';
    lastError: string;
    lastDurationMs: number;
    successCount: number;
    errorCount: number;
  };
  
  // 兼容字段
  apiPreset?: string;
  extractTags?: string[];
}
```

#### 工具面板交互（v0.6.2+）

工具页已进一步收敛为 5 个核心区块：

- `模板修改框`
- `输出模式`
- `API 预设`
- `破限预设`
- `手动操作区`

其中：

- 当输出模式为 `follow_ai` 时，视为**不启用额外工具链**，不会在 AI 回复后自动调用额外模型
- 当输出模式为 `post_response_api` 时，才会在监听到 `GENERATION_ENDED` 后自动执行工具
- 手动操作区支持直接触发一次工具执行，并复用当前模板、API 预设与破限预设配置
- 每个工具现在都支持独立的“测试提取”能力，可基于最近若干条 AI 消息预览标签/正则提取结果
- 每个工具现在都支持设置最大提取消息数，以及配置单独的提取标签/正则规则
- 正文提取与工具标签提取现在都会分别直接作用于每条原始 AI 消息，不再串联依赖；测试提取界面也会按消息逐条展示原文、正文提取结果与工具提取结果，便于区分不同楼层
- AI 回复自动触发时会在页面顶部显示通知，用于确认是否真正进入执行链路，以及是否执行成功/失败
- 当工具执行成功后，会将工具回复直接插入最新 AI 楼层原文
- 最近消息提取优先走 TavernHelper 的 `getChatMessages()` / `getLastMessageId()`，若不可用再回退到 `SillyTavern.getContext().chat` 或 `SillyTavern.chat`
- 最近消息内容读取现在会同时兼容 `mes`、`message`、`content`、`text` 等字段，避免不同环境下“测试提取”拿不到消息正文
- 自动监听会记录用户发送意图，并跳过 `quiet` / `dryRun` 等静默生成，减少未真正产生回复时的误触发
- 自动监听除 `GENERATION_ENDED` 外，还会以 `MESSAGE_RECEIVED` 作为兜底触发来源；两条链路会按 `chatId + 最新 AI 消息ID` 去重，避免同一条回复重复执行工具
- 构建工具执行上下文时会对“最新 AI 回复”做短暂重试读取，优先锁定刚生成完成的那一条消息，降低读取到旧回复的概率
- 测试提取弹窗已限制最大高度，并为正文区域提供独立滚动；当逐条消息预览内容很长时不会再超出屏幕

### 输出模式说明 (v0.6)

| 模式 | 说明 |
|------|------|
| `follow_ai` | 随 AI 输出：不执行额外解析链，不调用额外模型，不做上下文注入 |
| `post_response_api` | 额外 AI 模型解析：监听 AI 回复结束，使用工具绑定的 API 预设调用额外模型，将结果注入上下文 |

> ⚠️ **注意**: 旧的 `inline` 模式已重命名为 `follow_ai`，API 内部会自动兼容旧名称。
>
> 从 `v0.6.2+` 开始，工具在监听到 `GENERATION_ENDED` 后会同步更新运行时状态，并在触发开始、成功、失败时显示顶部通知，便于确认监听链路是否正常工作。

> 在部分酒馆 / TavernHelper 环境中，最新 AI 回复写入聊天记录与 `GENERATION_ENDED` 的时序可能不稳定，因此当前版本会同时监听 `MESSAGE_RECEIVED` 作为补充兜底，并自动去重。

### ~~提示词段落对象~~ (v0.6 已弃用)

`PromptSegment` 结构已在 v0.6 中弃用，改用简化的 `promptTemplate` 单文本字段。

### 设置对象

```typescript
interface Settings {
  executor: {
    maxConcurrent: number;      // 最大并发数，默认3
    maxRetries: number;         // 最大重试次数，默认2
    retryDelayMs: number;       // 重试延迟(ms)，默认5000
    requestTimeoutMs: number;   // 请求超时(ms)，默认90000
    queueStrategy: 'fifo' | 'lifo' | 'priority'; // 队列策略
  };
  listener: {
    listenGenerationEnded: boolean;  // 监听生成结束事件
    ignoreQuietGeneration: boolean;  // 忽略静默生成
    ignoreAutoTrigger: boolean;      // 忽略自动触发
    debounceMs: number;              // 防抖延迟(ms)
  };
  debug: {
    enableDebugLog: boolean;         // 启用调试日志
    saveExecutionHistory: boolean;   // 保存执行历史
    showRuntimeBadge: boolean;       // 显示运行时徽章
  };
  ui: {
    compactMode: boolean;            // 紧凑模式
    animationEnabled: boolean;       // 动画效果
    theme: string;                   // 主题名称
  };
}
```

---

## 内部常量

| 常量名 | 值 | 说明 |
|--------|-----|------|
| `SCRIPT_ID` | `"youyou_toolkit"` | 脚本唯一标识 |
| `SCRIPT_VERSION` | `"0.6.2"` | 脚本版本 |
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
| 0.5.0 | 最新版 | 内置 |
| 0.4.x | 最新版 | 内置 |
| 0.3.x | 最新版 | 内置 |
| 0.2.x | 最新版 | 内置 |

---

## 更新日志

详见 [CHANGELOG.md](./CHANGELOG.md)