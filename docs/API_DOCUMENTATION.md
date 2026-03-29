# API 文档

本文档说明当前仓库代码基线（`0.6.2 + Unreleased`）下的公开 API 接口与主要模块职责。

## 1. 模块导入

### ES Module

```javascript
import YouYouToolkit from 'https://testingcf.jsdelivr.net/gh/heis1696/youyou_Toolkit@main/dist/bundle.js';
```

### 全局变量

```javascript
const toolkit = window.YouYouToolkit;
```

## 2. 全局公开 API

当前 `window.YouYouToolkit` 主要公开：

- `version`
- `id`
- `init()`
- `openPopup()` / `closePopup()`
- `switchMainTab()` / `switchSubTab()`
- `addMenuItem()`
- `loadLegacyModule()`
- `getApiConfig()` / `saveApiConfig()` / `sendApiRequest()` / `testApiConnection()`
- `getPresets()`
- `registerTool()` / `unregisterTool()` / `getToolList()`
- `getStorage()`
- `getApiConnection()`
- `getPresetManager()`
- `getUi()` / `getUiModule()` / `getUiComponents()`
- `getRegexExtractor()`
- `getToolManager()`
- `getToolExecutor()`
- `getWindowManager()`
- `getToolRegistry()`
- `getPromptEditor()`
- `getSettingsService()`
- `getBypassManager()`
- `getVariableResolver()`
- `getContextInjector()`
- `getToolPromptService()`
- `getToolOutputService()`
- `getToolAutomationService()`
- `startAutomation()` / `stopAutomation()`
- `getAutomationRuntime()`
- `processCurrentAssistantMessage()`
- `createWindow()` / `closeWindow()`

当前公开 API 不再恢复旧 trigger 管理器语义；自动能力已经切换到 `tool-automation-service.js`。若文档或历史记录提到 `getToolTrigger()`、`getAutoTriggerDiagnostics()`、`exportAutoTriggerDiagnostics()` 等，应视为旧口径而非当前源码事实。

## 3. 核心模块说明

### `modules/tool-execution-context.js`

统一负责：

- 读取宿主聊天消息快照
- 归一化 assistant / user 消息身份
- 构建 slot binding / revision / transaction 标识
- 生成手动链与自动链共用的 execution context
- 生成剥离 toolkit 已写回块后的 assistant base text / base fingerprint

### `modules/tool-trigger.js`

文件名仍为 `tool-trigger.js`，但当前职责已经收口为：

- 复用 `tool-execution-context.js` 构建上下文
- 提供手动执行入口 `runToolManually(toolId)`
- 提供测试提取入口 `previewToolExtraction(toolId)`

### `modules/tool-automation-service.js`

负责新的自动生命周期：

- 监听宿主 `MESSAGE_RECEIVED / CHAT_CHANGED / MESSAGE_DELETED`
- 对新 assistant 楼层构建消息级事务上下文
- 基于 `automation.enabled` 筛选自动工具
- 按 assistant 槽位串行执行自动 `post_response_api` 工具
- 以 `refreshConfirmed === true` 作为自动成功标准

### `modules/tool-output-service.js`

负责 `post_response_api` 路径：

- 收集最近消息
- 执行正文 / 工具提取
- 构建工具消息
- 发起 API 请求
- 组织写回元信息
- 调用 `context-injector` 写回最新 assistant 楼层

### `modules/tool-executor.js`

负责：

- 通用调度
- 批处理
- compatibility 执行回退

当前它不再承担旧自动触发筛选入口。

### `modules/tool-registry.js`

负责：

- 内置 / 自定义工具合并
- 运行态配置归一化
- runtime 诊断字段维护
- 与 UI 对齐的工具主模型

### `modules/tool-manager.js`

负责：

- 定义层工具 CRUD
- 导入 / 导出
- 工具启停
- 历史工具定义清理与归一化

## 4. 当前执行模型

### 4.1 自动执行

```javascript
await window.YouYouToolkit.startAutomation();
const runtime = window.YouYouToolkit.getAutomationRuntime();
const result = await window.YouYouToolkit.processCurrentAssistantMessage({ force: true });
```

执行流程：

```text
MESSAGE_RECEIVED
  -> tool-automation-service.processAssistantMessage(messageId)
  -> buildExecutionContextForMessage()
  -> 筛选 automation.enabled === true 的 post_response_api 工具
  -> 按同一 slot 串行 runToolPostResponse()
  -> context-injector.injectDetailed()
  -> refreshConfirmed === true 时才记为成功
```

### 4.2 手动执行

```javascript
import { runToolManually } from './modules/tool-trigger.js';

const result = await runToolManually(toolId);
```

执行流程：

```text
runToolManually(toolId)
  -> buildToolExecutionContext()
  -> 根据 output.mode 选择路径
     -> post_response_api: runToolPostResponse()
     -> 其它模式: executeToolWithConfig()
```

### 4.3 测试提取

```javascript
import { previewToolExtraction } from './modules/tool-trigger.js';

const preview = await previewToolExtraction(toolId);
```

执行流程：

```text
previewToolExtraction(toolId)
  -> buildToolExecutionContext()
  -> tool-output-service.previewExtraction()
```

### 4.4 输出模式

- `follow_ai`
  - 不额外请求模型
  - 仍可用于保存配置，并支持手动执行 / 测试提取
- `post_response_api`
  - 会在手动执行时额外请求模型
  - 会执行提取并尝试写回最新 assistant 楼层

## 5. 写回结果与诊断

`runToolPostResponse()` 返回结果中的 `meta` 会附带写回相关诊断信息，常见字段包括：

- `writebackStatus`
- `failureStage`
- `slotBindingKey`
- `slotRevisionKey`
- `slotTransactionId`
- `sourceMessageId`
- `sourceSwipeId`
- `writebackDetails`

`writebackDetails` 主要用于判断：
- 内容是否真正写入
- 宿主提交是否成功
- 刷新是否被请求 / 确认
- 最终采用了哪种 commit / refresh 方法

## 6. 宿主调试建议

当前最有价值的排查顺序是：

1. `tool-trigger.js` 是否正确构建了当前 assistant 楼层上下文
2. `tool-output-service.js` 是否正确提取内容并构建请求
3. `api-connection.js` 是否成功返回响应
4. `context-injector.js` 是否把结果写回最新 assistant 楼层
5. `tool-registry.js` runtime 中是否记录了最近状态、失败阶段与写回结果

## 7. 兼容性说明

当前仓库仍保留若干 compatibility 模块与旧文件名，但不应把这些名字直接等同于旧运行事实。

例如：
- `tool-trigger.js` 仍存在，但不再表示旧自动触发监听器主链
- `tool-executor.js` 仍存在，但主用途已收口为调度 / compatibility 回退

判断当前能力时，应优先以源码实际导出和实际调用链为准。
