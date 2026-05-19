# API 文档

基于 `1.0.212` 源码的公开 API、模块接口与执行模型文档。

宿主侧稳定入口是 `window.YouYouToolkit`。源码对齐应以 `index.js`、`modules/app/public-api.js`、`modules/tool-trigger.js`、`modules/tool-automation-service.js` 为准。

---

## 1. 全局公开 API (`window.YouYouToolkit`)

### 1.1 基础信息与 UI 控制

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `version` | `string` | 版本号，如 `'1.0.212'` |
| `id` | `string` | 插件 ID：`'youyou_toolkit'` |
| `init()` | `void` | 触发 bootstrap 初始化 |
| `openPopup()` | `void` | 打开弹窗 |
| `closePopup()` | `void` | 关闭弹窗 |
| `switchMainTab(tabId)` | `void` | 切换主标签页 |
| `switchSubTab(tabId)` | `void` | 切换子标签页 |
| `addMenuItem()` | `void` | 注册魔棒菜单项 |

### 1.2 API 与预设访问

这些方法会先 `await loadModules()` 确保模块已加载：

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `getApiConfig()` | `Promise<Object>` | 获取当前 API 配置 |
| `saveApiConfig(config)` | `Promise<boolean>` | 保存 API 配置 |
| `sendApiRequest(messages, options)` | `Promise<Object>` | 发送 API 请求 |
| `testApiConnection()` | `Promise<Object>` | 测试连接，返回 `{success, message}` |
| `getPresets()` | `Promise<Array>` | 获取所有 API 预设 |

### 1.3 模块获取器

返回 `appContext.modules` 中已装配的模块引用：

| 获取器 | 模块路径 |
|--------|---------|
| `getStorage()` | `core/storage-service.js` |
| `getApiConnection()` | `api-connection.js` |
| `getPresetManager()` | `preset-manager.js` |
| `getUi()` / `getUiModule()` | `ui/index.js` |
| `getRegexExtractor()` | `regex-extractor.js` |
| `getToolManager()` | `tool-manager.js` |
| `getToolExecutor()` | `tool-executor.js` |
| `getWindowManager()` | `window-manager.js` |
| `getToolRegistry()` | `tool-registry.js` |
| `getSettingsService()` | `core/settings-service.js` |
| `getBypassManager()` | `bypass-manager.js` |
| `getVariableResolver()` | `variable-resolver.js` |
| `getContextInjector()` | `context-injector.js` |
| `getToolPromptService()` | `tool-prompt-service.js` |
| `getToolOutputService()` | `tool-output-service.js` |
| `getToolAutomationService()` | `tool-automation-service.js` |
| `getDataProvider()` | 当前 Provider 实例（同步） |
| `getDataProviderAsync()` | `Promise<Provider>` |

### 1.4 自动化控制

| 方法 | 委托目标 | 说明 |
|------|---------|------|
| `startAutomation()` | `toolAutomationService.init()` | 启动自动执行 |
| `stopAutomation()` | `toolAutomationService.stop()` | 停止自动执行 |
| `getAutomationRuntime()` | `getRuntimeSnapshot()` | 获取运行时快照 |
| `cancelAutomation(options)` | 取消 pending/in-flight 事务 | 可按 `messageId`/`slotKey`/`traceId` 定位 |
| `processCurrentAssistantMessage(options)` | 处理当前最新助手楼层 | `force: true` 跳过启用检查 |

### 1.5 窗口接口

| 方法 | 委托目标 |
|------|---------|
| `createWindow(options)` | `window-manager.js` |
| `closeWindow(id)` | `window-manager.js` |

---

## 2. 核心模块接口

### 2.1 tool-execution-context.js

统一负责：

- 解析宿主聊天快照中的目标 assistant 楼层
- 归一化 `chatId` / `messageId` / `swipeId` / content fingerprint
- 构建手动链与自动链共用执行上下文
- 生成写回绑定所需的槽位身份字段

**导出函数**:

| 函数 | 说明 |
|------|------|
| `buildExecutionContextForLatestAssistant({runSource})` | 手动链入口，定位最新助手消息 |
| `buildExecutionContextForMessage({messageId, swipeId, runSource})` | 自动链入口，定位指定消息 |
| `getCurrentCharacter()` | 获取当前角色卡 |
| `buildConversationSnapshot(messages)` | 归一化消息列表 |
| `stripKnownToolBlocks(text, message)` | 剥离已写回工具块 |
| `buildAssistantContentFingerprint(content)` | 生成 `fp_XXXX` 哈希 |
| `getTopWindow()` | 安全访问父窗口 |
| `getRawChatMessages()` | 获取原始聊天消息 |

**三级 Slot Identity**:

| 键 | 公式 | 用途 |
|----|------|------|
| `slotBindingKey` | `chatId::messageId` | 绑定到同一助手槽位 |
| `slotRevisionKey` | `bindingKey::swipeId::fp_XXXX` | 绑定到具体内容版本 |
| `slotTransactionId` | `revisionKey::eventType::traceId` | 绑定到一次具体事务 |

### 2.2 tool-trigger.js

当前职责是手动执行与提取预览：

| 函数 | 说明 |
|------|------|
| `runToolManually(toolId)` | 手动执行入口 |
| `previewToolExtraction(toolId)` | 提取预览入口 |

**手动执行路径**:

| 路径 | 条件 | 执行函数 |
|------|------|---------|
| `MANUAL_POST_RESPONSE_API` | `output.mode === 'post_response_api'` | `toolOutputService.runToolPostResponse()` |
| `MANUAL_POST_RESPONSE_API` | `output.mode === 'follow_ai'` | `toolOutputService.runToolFollowAiManual()` |
| `MANUAL_LOCAL_TRANSFORM` | `output.mode === 'local_transform'` 或有 `processor.type` | `runLocalTransformTool()` |
| `MANUAL_COMPATIBILITY` | 其他 | `tool-executor.executeToolWithConfig()` |

### 2.3 tool-automation-service.js

自动执行唯一入口（1.0.111 重写）。

**事件订阅**:

| 事件 | 处理 |
|------|------|
| `MESSAGE_RECEIVED` | 主触发，守卫过滤后去抖 800ms |
| `GENERATION_STOPPED` | 取消所有活动事务和定时器 |
| `CHAT_CHANGED` | 完全状态重置 |
| `MESSAGE_DELETED` | 清理特定消息状态 |
| `MESSAGE_SENT` | 清理待处理定时器 |

**防重放/防递归机制**:

| 机制 | 实现 |
|------|------|
| 槽位去重 | `_recentlyProcessedSlots` Map, `messageId::swipeId`, 滑动时间窗口 |
| 自写黑名单 | `_ownWriteMessageIds` Map, 10s TTL |
| 种子标记 | `_seedKnownSlots()`, 初始化标记已知 slot |
| 取消 | `GENERATION_STOPPED` → `controller.abort()` |

**运行时快照** (`getRuntimeSnapshot()`):

```javascript
{
  enabled: boolean,
  pendingTimerCount: number,
  queuedSlotCount: number,
  recentlyProcessedSlotCount: number,
  ownWriteBlacklistSize: number,
  recentTransactions: Transaction[],
  hostBinding: Object,
  settings: Object
}
```

### 2.4 tool-output-service.js

`post_response_api` / `follow_ai` 主执行层。

**导出常量**:

| 常量 | 值 |
|------|----|
| `OUTPUT_MODES` | `{FOLLOW_AI, POST_RESPONSE_API, LOCAL_TRANSFORM}` |
| `TOOL_RUNTIME_STATUS` | `{IDLE, RUNNING, SUCCESS, ERROR}` |
| `TOOL_FAILURE_STAGES` | `{BUILD_MESSAGES, SEND_API_REQUEST, EXTRACT_OUTPUT, INJECT_CONTEXT, COMPATIBILITY_EXECUTE, UNKNOWN}` |
| `TOOL_WRITEBACK_STATUS` | `{SUCCESS, FAILED, SKIPPED_EMPTY_OUTPUT, NOT_APPLICABLE}` |

**核心方法**:

| 方法 | 说明 |
|------|------|
| `runToolPostResponse(toolConfig, context)` | POST_RESPONSE_API 五阶段流水线 |
| `runToolFollowAiManual(toolConfig, context)` | FOLLOW_AI 手动执行 |
| `getExtractionSnapshot(toolConfig, context)` | 获取提取快照 |
| `previewExtraction(toolConfig, context)` | 提取预览 |
| `filterAutoPostResponseTools(configs)` | 筛选自动工具 |

### 2.5 context-injector.js

写回引擎。

| 方法 | 说明 |
|------|------|
| `inject(toolId, content, options)` | 兼容接口，返回 boolean |
| `injectDetailed(toolId, content, options)` | 主接口，返回详细写回结果 |

**injectDetailed 返回结构**:

```javascript
{
  success: boolean,
  content: string,
  meta: {
    sourceMessageId, sourceSwipeId, confirmedAssistantSwipeId,
    slotBindingKey, slotRevisionKey,
    writebackStatus, failureStage,
    writebackDetails: {
      contentCommitted, hostCommitApplied,
      refreshRequested, refreshConfirmed,
      preferredCommitMethod, appliedCommitMethod,
      refreshMethods, refreshConfirmChecks
    }
  }
}
```

### 2.6 api-connection.js

API 连接管理，三级请求回退链：

```
1. TavernHelper.generateRaw (宿主主 API, useMainApi=true 时)
2. TavernHelper.generateRaw({custom_api: config}) (TavernHelper 自定义)
3. POST /api/backends/chat-completions/generate (SillyTavern CORS 代理)
4. 直接 fetch (仅代理失败时)
```

**导出函数**:

| 函数 | 说明 |
|------|------|
| `getApiConfig()` | 获取当前配置 |
| `updateApiConfig(config)` | 更新配置 |
| `getEffectiveApiConfig(presetName)` | 获取有效配置 (含预设) |
| `sendApiRequest(messages, options, signal)` | 发送请求 (三级回退) |
| `sendWithPreset(presetName, messages, options, signal)` | 指定预设发送 |
| `testApiConnection(config)` | 测试连接 |
| `fetchAvailableModels(config)` | 获取可用模型列表 |

---

## 3. 执行模型

### 3.1 自动执行链

```
宿主 MESSAGE_RECEIVED
  → host-event-service 归一化事件名
  → tool-automation-service 守卫过滤 (非助手?太短?自写黑名单?已处理?)
  → 去抖 800ms → processAssistantMessage()
  → buildExecutionContextForMessage()
  → 筛选自动工具: local_transform 先, post_response_api 后
  → 按 slot 串行执行 (链式刷新: 每个工具的写回更新下一个工具的输入)
  → 若 tableWorkbench.autoUpdateEnabled === true → runAutoTableUpdate()
  → 更新运行时诊断字段
```

### 3.2 手动执行链

```
runToolManually(toolId)
  → buildExecutionContextForLatestAssistant({runSource: 'MANUAL'})
  → resolveExecutionPath()
  → 按路径分发:
     post_response_api → runToolPostResponse()
     follow_ai        → runToolFollowAiManual()
     local_transform  → runLocalTextTransform() + injectDetailed()
     compatibility    → executeToolWithConfig()
```

### 3.3 提取预览链

```javascript
const preview = await previewToolExtraction(toolId);
// → { success, meta: { sourceText, filteredSourceText, extractedText,
//                      messageEntries, primaryEntry, selectors, maxMessages } }
```

### 3.4 填表执行链

**七步管道** (`table-update-service.js`):

| 步骤 | 服务 | 说明 |
|------|------|------|
| 0 | `table-target-resolver` | 目标助手消息定位 |
| 1 | `table-template-service` | 三模式模板解析 + scope 合并 |
| 1b | `table-auto-schedule-service` | 按 updateFrequency 门控 (仅自动) |
| 2 | `table-history-service` | 5 级状态级联 (EXACT→BINDING_FALLBACK→HISTORY→TEMPLATE→EMPTY) |
| 3 | `table-update-service` | 构建 AI 请求 (prompt + 世界书 + 指南) |
| 4 | `api-connection` | 发送请求 (3 次重试, 5s 退避) |
| 5 | `ai-protocol-adapters` | 适配器链解析 (DSL→SQL→JSON), 回退到 JSON 清理器 |
| 6 | `table-update-service` | 应用编辑 (scope 过滤 + 锁强制 + 4 级列键解析) |
| 7 | `table-writeback-service` | commit + 消息镜像 + 世界书同步 |

---

## 4. 辅助模块接口

### 4.1 variable-resolver.js

```javascript
variableResolver.resolveTemplate(template, context) → string
variableResolver.resolveObject(obj, context) → Object
variableResolver.buildToolContext(rawData) → Object
variableResolver.registerVariable(name, handler) → void
variableResolver.registerHandler(prefix, handler) → void
variableResolver.getAvailableVariables() → Array
```

15 个内置变量: `lastUserMessage`, `lastAiMessage`, `chatHistory`, `userMessage`, `characterCard`, `toolName`, `toolId`, `toolPromptMacro`, `toolContentMacro`, `toolWorldbookContent`, `injectedContext`, `extractedContent`, `recentMessagesText`, `rawRecentMessagesText`, `previousToolOutput`

### 4.2 regex-extractor.js

```javascript
extractTagContent(text, options) → string
extractSimpleTag(text, tag) → string
extractCurlyBraceTag(text, tag) → string
scanTextForTags(text) → Array<string>
getTagRules() → Array
getContentBlacklist() → Array
saveRulesAsPreset(name, rules) → void
testRegex(pattern, text) → Object
```

### 4.3 regex-preset-store.js

```javascript
listPresets() → Array
getPreset(id) → Object
createPreset(partial) → Object
updatePreset(id, patch) → Object
deletePreset(id) → void
addRule(presetId, ruleInput) → Object
getCurrentPresetId() → string
setCurrentPresetId(id) → void
findLinkedTools(presetId) → Promise<Array>
```

### 4.4 worldbook-preset-store.js

```javascript
listPresets() → Array
getPreset(id) → Object
createPreset(partial) → Object
updatePreset(id, patch, {silent}) → Object
deletePreset(id) → void
getCurrentPresetId() → string
exportAll() → Object
importPresets(payload) → Object
```

### 4.5 bypass-manager.js

```javascript
bypassManager.getAllPresets() → Object
bypassManager.getPreset(id) → Object
bypassManager.createPreset(data) → Object
bypassManager.updatePreset(id, updates) → Object
bypassManager.deletePreset(id) → void
bypassManager.getEnabledMessages(toolConfig) → Array
bypassManager.addMessage(presetId, msg) → void
bypassManager.updateMessage(presetId, msgId, updates) → void
bypassManager.deleteMessage(presetId, msgId) → void
bypassManager.buildBypassMessages(toolConfig) → Array
bypassManager.exportPresets() → Object
bypassManager.importPresets(data) → Object
```

### 4.6 preset-manager.js

```javascript
getAllPresets() → Array
getPreset(name) → Object
createPreset(data) → Object
updatePreset(name, updates) → Object
deletePreset(name) → void
renamePreset(oldName, newName) → void
duplicatePreset(source, target) → void
switchToPreset(name) → void
getActivePresetName() → string
getActiveConfig() → Object
togglePresetStar(name) → void
exportPresets(name) → Object
importPresets(json, options) → Object
```

### 4.7 tool-manager.js

```javascript
getAllTools() → Object
getTool(toolId) → Object
saveTool(toolId, toolDef) → void
deleteTool(toolId) → void
setToolEnabled(toolId, enabled) → void
exportTools() → Object
importTools(json, overwrite) → Object
createDefaultToolDefinition(input) → Object
normalizeToolDefinitionToRuntimeConfig(id, def) → Object
```

### 4.8 tool-registry.js

```javascript
getToolFullConfig(toolId) → Object
getToolList() → Array
saveToolConfig(toolId, config) → void
patchToolRuntime(toolId, partial) → void
getAllToolFullConfigs() → Array
getEnabledTools() → Array
getToolSubTabs() → Array
setToolApiPreset(toolId, presetName) → void
getToolApiPreset(toolId) → string
```

---

## 5. 填表工作台 API

### 5.1 配置

```javascript
// table-schema-service.js
getTableWorkbenchConfig() → Object
saveTableWorkbenchConfig(config) → void
validateTableWorkbenchConfig(config) → Object

// table-template-service.js
getAllTableTemplates() → Array
getTableTemplate(id) → Object
saveTableTemplate(template) → Object
deleteTableTemplate(id) → void
resolveActiveTemplate({chatId, isolationKey}) → {template, mode, source}
```

### 5.2 执行

```javascript
// table-update-service.js
runManualTableUpdate(options) → Promise<Object>
runAutoTableUpdate(executionContext, tableConfig) → Promise<Object>
```

### 5.3 状态

```javascript
// table-state-service.js
getBoundTableState({messageIndex, isolationKey}) → Object
loadBoundStateOrTemplate({messageIndex, isolationKey, templateTables}) → Object
commitBoundState({targetSnapshot, boundState}) → Object

// table-lock-service.js
getLocks({scopeKey, tables}) → Object
setLock(scopeKey, tableIndex, lockType, key, enabled) → void

// table-scope-service.js
resolveTableRunScope(config, runScope) → {includes(table), filterTables(tables)}
```

### 5.4 世界书同步

```javascript
// table-worldbook-sync-service.js
syncTablesToWorldbook({tables, config, chatId, isolationKey}) → Promise<void>
```

---

## 6. 基础服务 API

### 6.1 storage-service.js

```javascript
storage.get(key, defaultValue) → any
storage.set(key, value) → void
storage.remove(key) → void
storage.has(key) → boolean
storage.clear() → void
storage.namespace(sub) → StorageService
storage.exportAll() → Object

toolStorage  // youyou_toolkit:tools
presetStorage // youyou_toolkit:presets
windowStorage // youyou_toolkit:windows
```

### 6.2 logger-service.js

```javascript
logger.createScope(name) → {debug, info, log, warn, error}
logger.getEntries({level, scope, search, limit, offset}) → {entries, total}
logger.getStats() → {byLevel, byScope}
logger.setLevel(level) → void
logger.clear() → void
```

### 6.3 host-event-service.js

```javascript
hostEvents.subscribe(eventKey, handler) → unsubscribe
hostEvents.emit(eventKey, ...payload) → void
hostEvents.ready({timeoutMs}) → Promise<boolean>
hostEvents.describe() → Object
```

### 6.4 tool-data-provider.js

```javascript
getToolDataProvider(options) → Promise<IToolDataProvider>
getCurrentProvider() → IToolDataProvider | null

IToolDataProvider: {
  kind, init, dispose, migrate, query, execute,
  batch, transaction, backup, export, import, describe
}
```

---

## 7. 输出模式说明

### `post_response_api`

- 手动与自动主线都支持
- 构建 OpenAI 格式消息 → 发送额外 API 请求 → 提取输出 → 写回助手楼层
- 自动化围绕这一路径做筛选与事务管理

### `follow_ai`

- 手动链独立执行路径
- 仍会构建消息并发送额外 API 请求，不是"什么都不做"的占位
- 有输出时走写回链

### `local_transform`

- 手动与自动主线都支持
- 在本地对提取文本做纯文本变换 (escape/punctuation)
- 通过 `context-injector.injectDetailed()` 写回

### `local_transform` 处理器类型

| 类型 | 说明 |
|------|------|
| `ESCAPE_TRANSFORM` | 转义/反转义换行、双引号、单引号 |
| `PUNCTUATION_TRANSFORM` | 英文标点转中文标点 (仅 en_to_zh) |

### compatibility fallback

- 由 `tool-executor.js` 承接旧执行路径
- 兼容回退，不是推荐主线
- 通过 `import()` 懒加载

---

## 8. 写回结果与诊断字段

`runToolPostResponse` / `runToolFollowAiManual` / 本地 transform 返回的 `meta`:

| 字段 | 说明 |
|------|------|
| `traceId` | 事务追踪 ID |
| `sessionKey` | 会话键 |
| `executionKey` | 执行键 |
| `slotBindingKey` | 槽位绑定键 |
| `slotRevisionKey` | 槽位修订键 |
| `slotTransactionId` | 槽位事务键 |
| `sourceMessageId` | 源消息 ID |
| `sourceSwipeId` | 源 swipe ID |
| `writebackStatus` | `SUCCESS` / `FAILED` / `SKIPPED_EMPTY_OUTPUT` / `NOT_APPLICABLE` |
| `failureStage` | 失败阶段: `BUILD_MESSAGES` / `SEND_API_REQUEST` / `EXTRACT_OUTPUT` / `INJECT_CONTEXT` |
| `writebackDetails` | 写回详情: contentCommitted, hostCommitApplied, refreshRequested, refreshConfirmed, commitMethod |
| `phases` | 阶段化结果: request, extract, writeback, refresh |

---

## 9. 调试顺序建议

| 问题 | 排查路径 |
|------|---------|
| 自动化没触发 | `tool-automation-service` 守卫 → `host-event-service` 绑定 → `settingsService` 自动化设置 |
| 工具执行了没写回 | `context-injector` source message 绑定 → host commit → refresh 确认 |
| 写回后看不到结果 | `context-injector._confirmRefresh` 验证 → 多字段同步 (mes/message/content/text) |
| API 请求失败 | `api-connection` 三级回退 → preset 配置 → URL/API key |
| 填表 AI 不修改表 | 适配器链解析 → scope 过滤 → 锁强制 → 列键解析 |
| 跨聊天数据串 | isolation key → chat scope → 世界书命名空间 (`[YY:chatId=xxx]`) |

---

## 10. 已废弃接口

以下旧命名不应再作为当前事实引用：

| 旧名称 | 当前替代 |
|--------|---------|
| `loadLegacyModule()` | 已移除 |
| `getUiComponents()` | `getUi()` |
| `getPromptEditor()` | 直接 import `prompt-editor.js` |
| `getToolTrigger()` | `getToolTrigger()` 或直接 import |
| `getAutoTriggerDiagnostics()` | `getAutomationRuntime()` |
| `inline` 模式名 | `follow_ai` |
| `tool.automation.enabled` 字段 | 由 `tool.output.mode` 判定 |
| `modules/storage.js` | `modules/core/storage-service.js` |
