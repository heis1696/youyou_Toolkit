# API 文档

本文档说明当前 `1.0.126` 代码基线下的公开 API、执行入口与运行模型。

当前宿主侧稳定入口是 `window.YouYouToolkit`。当历史文档、旧笔记或旧调用示例与源码不一致时，应以 `index.js`、`modules/app/public-api.js`、`modules/tool-trigger.js`、`modules/tool-automation-service.js` 为准。

## 1. 入口与装配

插件入口保持为薄壳：`index.js` 负责创建共享 `appContext`，装配 `bootstrap`、`popupShell` 与 `publicApi`，然后把结果暴露到：

```javascript
const toolkit = window.YouYouToolkit;
```

`window.YouYouToolkit` 的真实导出由 `modules/app/public-api.js` 决定。

## 2. 全局公开 API

### 2.1 基础信息与 UI 控制

- `version`
- `id`
- `init()`
- `openPopup()`
- `closePopup()`
- `switchMainTab(mainTabId)`
- `switchSubTab(mainTabId, subTabId)`
- `addMenuItem()`

说明：
- `init()` 对应 bootstrap 初始化入口。
- `openPopup()` / `closePopup()` / `switchMainTab()` / `switchSubTab()` 由 `modules/app/popup-shell.js` 提供。

### 2.2 API 与预设访问

这些方法会先确保模块已加载，再委托到底层模块：

- `getApiConfig()`
- `saveApiConfig(config)`
- `sendApiRequest(messages, options)`
- `testApiConnection()`
- `getPresets()`

说明：
- `getApiConfig()` / `saveApiConfig()` / `sendApiRequest()` / `testApiConnection()` 对应 `modules/api-connection.js`。
- `getPresets()` 对应 `modules/preset-manager.js`。

### 2.3 工具注册与运行时访问

- `registerTool(id, config)`
- `unregisterTool(id)`
- `getToolList()`

说明：
- 这组接口面向运行时注册表，真实落点是 `modules/tool-registry.js`。
- 若要修改用户自定义工具的持久化定义、导入导出或 schema 归一化，应优先看 `modules/tool-manager.js`，而不是把 `registerTool()` 当成定义层唯一入口。

### 2.4 模块获取器

当前公开的 getter 包括：

- `getStorage()`
- `getApiConnection()`
- `getPresetManager()`
- `getUi()`
- `getUiModule()`
- `getRegexExtractor()`
- `getToolManager()`
- `getToolExecutor()`
- `getWindowManager()`
- `getToolRegistry()`
- `getSettingsService()`
- `getBypassManager()`
- `getVariableResolver()`
- `getContextInjector()`
- `getToolPromptService()`
- `getToolOutputService()`
- `getToolAutomationService()`

说明：
- 这些 getter 返回的是当前 `appContext.modules` 中已装配的模块引用。
- 当前公开 API 以 `modules/app/public-api.js` 的实际导出为准；已删除的 compatibility API 不再属于当前接口面。

### 2.5 自动化控制

- `startAutomation()`
- `stopAutomation()`
- `getAutomationRuntime()`
- `cancelAutomation(options = {})`
- `processCurrentAssistantMessage(options = {})`

说明：
- 这组接口全部委托给 `modules/tool-automation-service.js`。
- `startAutomation()` 实际调用 `toolAutomationService.init()`。
- `stopAutomation()` 实际调用 `toolAutomationService.stop()`。
- `getAutomationRuntime()` 返回 `toolAutomationService.getRuntimeSnapshot()` 的快照。
- `cancelAutomation()` 用于取消自动链路中的 pending timer 或 in-flight 事务，可按 `messageId`、`slotKey`、`traceId` 定位。
- `processCurrentAssistantMessage()` 会解析"当前最新 assistant 楼层"，然后按自动链逻辑执行一次处理，可用 `force: true` 跳过未启用时的常规短路。

### 2.6 窗口接口

- `createWindow(options)`
- `closeWindow(id)`

这组接口透传给 `modules/window-manager.js`。

## 3. 当前不应再沿用的旧口径

以下旧命名不应再作为当前事实引用：

- `loadLegacyModule()`
- `getUiComponents()`
- `getPromptEditor()`
- `getToolTrigger()`
- `getAutoTriggerDiagnostics()`
- `exportAutoTriggerDiagnostics()`
- "旧 trigger 管理器就是自动主入口"

当前自动执行主线已经切换到 `modules/tool-automation-service.js`，而 `modules/tool-trigger.js` 的职责已经收口为手动执行与提取预览入口。

## 4. 核心模块职责

### 4.1 `modules/tool-execution-context.js`

统一负责：

- 解析宿主聊天快照中的目标 assistant 楼层
- 归一化 `chatId` / `messageId` / `swipeId` / content fingerprint
- 构建手动链与自动链共用执行上下文
- 生成写回绑定所需的槽位身份字段

其中三个关键标识为：

- `slotBindingKey`：绑定到同一 assistant 槽位
- `slotRevisionKey`：绑定到同一槽位下的具体内容版本
- `slotTransactionId`：绑定到一次具体执行事务

这三者是自动重入去重、同槽位 reroll/swipe 区分、写回确认诊断的基础键，而不是普通日志字段。

### 4.2 `modules/tool-trigger.js`

当前职责是：

- `runToolManually(toolId)`：手动执行入口
- `previewToolExtraction(toolId)`：提取预览入口
- 根据工具配置选择手动执行路径

当前手动路径分为：

- `manual_post_response_api`
- `manual_local_transform`
- `manual_compatibility`

其中：
- `post_response_api` 走 `toolOutputService.runToolPostResponse()`
- `follow_ai` 手动执行走 `toolOutputService.runToolFollowAiManual()`（路径枚举归类为 `manual_compatibility`，但在 `executeToolByResolvedPath()` 分发时被拦截）
- `local_transform` 或带 `processor.type` 的工具走 `modules/tool-local-transform-service.js` 本地 transform 链
- 其他旧路径回退到 `modules/tool-executor.js`

### 4.3 `modules/tool-automation-service.js`

这是当前自动执行唯一入口（1.0.111 重写），负责：

- 绑定宿主消息事件：订阅 `MESSAGE_RECEIVED`（3s 节流）、`MESSAGE_SENT`（清理 pending 定时器）、`MESSAGE_DELETED`（清理消息关联状态）、`CHAT_CHANGED`、`GENERATION_STOPPED`（取消活跃事务 + 清除定时器 + 重置互斥锁）
- 基于 `messageId::swipeId` 槽位去重，去重状态存储在 `_recentlyProcessedSlots` Map 中（TTL 由 `dedupeWindowMs` 控制，默认约 1400ms）
- 模块级互斥锁 `_isProcessing` boolean 保证同一时刻只有一条执行链在运行
- Own-write 黑名单 `_ownWriteMessageIds` **Map**（key = messageId, value = 写入时间戳），TTL **5000ms**（硬编码），防止自写消息触发再次自动执行循环
- 取消：`GENERATION_STOPPED` 事件通过 `controller.abort()` 终止所有活跃事务，清除 pending 定时器，重置 `_isProcessing`
- 过滤可自动执行工具
- 驱动自动 `post_response_api` 执行与结果诊断

公开可观察状态主要通过 `getRuntimeSnapshot()` 暴露，包括：

- `currentChatId`
- `enabled`
- `isProcessing`
- `pendingTimerCount`
- `queuedSlotCount`
- `recentlyProcessedSlotCount`
- `ownWriteMessageIdCount`
- `activeTransactionCount`
- `recentTransactions`
- `hostBinding`
- `settings`

### 4.4 `modules/tool-output-service.js`

这是当前 `post_response_api` / `follow_ai` 主执行层，负责：

- 提取最近消息与目标文本
- 构建工具请求消息
- 解析有效 API preset / config
- 发送额外模型请求
- 提取输出文本
- 组织写回诊断信息
- 调用 `context-injector` 写回 assistant 槽位

当前导出的关键模式包括：

- `follow_ai`
- `post_response_api`

另外保留 `inline -> follow_ai` 的旧模式兼容映射。

### 4.5 `modules/tool-local-transform-service.js`

本地 transform 工厂，提供 escape / punctuation 等纯本地文本变换。被 `tool-trigger.js` 导入使用，变换后通过 `context-injector.injectDetailed()` 写回。

### 4.6 `modules/context-injector.js`

负责把工具输出写回绑定 assistant 楼层，并返回分层写回结果。当前主入口是：

- `inject(toolId, content, options)`
- `injectDetailed(toolId, content, options)`

其中 `injectDetailed()` 是当前诊断更完整的主接口，会返回：

- 是否写入成功
- source message / swipe 身份
- commit 方法与 refresh 请求信息
- refresh 是否最终确认

### 4.7 事件绑定

`tool-automation-service.js` 当前绑定的宿主事件完整列表：

| 事件 | 行为 |
|------|------|
| `MESSAGE_RECEIVED` | 主触发，3s leading-edge 节流，调度 assistant 消息处理 |
| `MESSAGE_SENT` | 清理所有 pending 定时器 |
| `MESSAGE_DELETED` | 清理被删除消息的关联状态 |
| `CHAT_CHANGED` | teardown / rebuild 当前聊天绑定 |
| `GENERATION_STOPPED` | 取消所有活跃事务、清除定时器、重置 `_isProcessing` |

另有内部事件 `SETTINGS_UPDATED`（eventBus）用于重新评估自动化启用状态。

## 5. 执行模型

### 5.1 自动执行链

自动入口示例：

```javascript
window.YouYouToolkit.startAutomation();
const runtime = window.YouYouToolkit.getAutomationRuntime();
const result = await window.YouYouToolkit.processCurrentAssistantMessage({ force: true });
```

当前自动执行流程：

```text
宿主事件（MESSAGE_RECEIVED / MESSAGE_SENT / MESSAGE_DELETED / CHAT_CHANGED / GENERATION_STOPPED）
  -> tool-automation-service 归一化事件 / 解析 messageId::swipeId
  -> _isProcessing 互斥检查（若已占用则跳过）
  -> _ownWriteMessageIds 黑名单检查（自写消息跳过，TTL 5000ms）
  -> _recentlyProcessedSlots 槽位去重检查（TTL 由 dedupeWindowMs 控制）
  -> buildExecutionContextForMessage()
  -> 筛选 automation.enabled === true 的 post_response_api 工具
  -> 按 slot 串行执行 runToolPostResponse()
  -> 若 tableWorkbench.autoUpdateEnabled === true 且 trigger=assistantMessage，则继续执行 runAutoTableUpdate()
  -> context-injector.injectDetailed() / table structured commit
  -> 以 refreshConfirmed 等结果更新事务状态
  -> GENERATION_STOPPED 事件到达时 controller.abort() 终止进行中请求
```

说明：
- 自动链当前主线执行自动条件满足的 `post_response_api` 工具，以及挂在同一事务里的 tableWorkbench 自动填表。
- 自动链不把 `follow_ai`、`local_transform`、compatibility 路径作为主线自动执行入口。

### 5.2 手动执行链

手动入口示例：

```javascript
import { runToolManually } from './modules/tool-trigger.js';

const result = await runToolManually(toolId);
```

当前手动执行流程：

```text
runToolManually(toolId)
  -> buildExecutionContextForLatestAssistant()
  -> resolveExecutionPath()
  -> 按路径分发（executeToolByResolvedPath）
     -> manual_post_response_api: runToolPostResponse()
     -> follow_ai（枚举为 manual_compatibility 但分发时拦截）: runToolFollowAiManual()
     -> manual_local_transform: tool-local-transform-service.runLocalTextTransform() + injectDetailed()
     -> manual_compatibility: executeToolWithConfig()
```

补充：
- `follow_ai` 的手动执行由 `executeToolByResolvedPath()` 分派到 `runToolFollowAiManual()`。
- 因此 `follow_ai` 不是"什么都不做"的占位模式，而是手动链上的独立额外请求路径。
- 填表工作台的 AI 指令预设通过 bypass-manager 绑定，走统一的 Ai 指令预设管理。手动填表入口是 `runManualTableUpdate()`，构建 context 时读取 contextDepth / contextRoles / contextExtractTags / contextUseGlobalRules / worldbooks / sendLatestRows 等上下文增强配置。

### 5.3 提取预览链

```javascript
import { previewToolExtraction } from './modules/tool-trigger.js';

const preview = await previewToolExtraction(toolId);
```

当前流程：

```text
previewToolExtraction(toolId)
  -> buildExecutionContextForLatestAssistant()
  -> toolOutputService.previewExtraction()
  -> getExtractionSnapshot()
```

返回结果主要包括：

- `sourceText`
- `filteredSourceText`
- `extractedText`
- `extractedRawText`
- `messageEntries`
- `primaryEntry`
- `selectors`
- `maxMessages`

### 5.4 填表执行链

手动入口：`table-update-service.js` 中的 `runManualTableUpdate()`。
自动入口：`tool-automation-service.js` 在收到 assistant 消息时，若 `tableWorkbench.autoUpdateEnabled === true`，则在工具执行链末尾继续调用 `runAutoTableUpdate()`。

上下文增强字段：

- `contextDepth`：向上取消息层数，默认 8
- `contextRoles`：消息角色范围，`'all'` 或 `'assistant_only'`
- `contextExtractTags`：每行自定义提取规则
- `contextUseGlobalRules`：是否合并全局正则规则
- `worldbooks`：`{ enabled, selected }`，控制世界书内容注入
- `sendLatestRows`：`-1` 为全量发送，`>0` 为每张表最多发送的行数

runScope 模式（控制 AI 可编辑哪些表）：

- `current`：仅当前选中表
- `selected`：已勾选的多张表
- `all`：所有已启用表

聊天隔离：`CHAT_CHANGED` 事件触发时清空实时行缓存，防止跨聊天串数据。

写回：使用 `TavernHelper.setChatMessages` 刷新宿主 UI；自动填表写回时附带 `skipNotify` 标记，避免触发二次自动执行循环。

worldbookSync：`table-writeback-service.js` 在写回时调用 `table-worldbook-sync-service.js` 的 `syncTablesToWorldbook()` 将结果同步到世界书条目。

## 6. 输出模式说明

### `post_response_api`

- 手动与自动主线都支持
- 会构建消息并发送额外 API 请求
- 有输出时会尝试写回 assistant 楼层
- 自动化只围绕这一路径做筛选与事务管理

### `follow_ai`

- 当前只在手动链作为正式执行路径使用
- 仍会构建消息并发送额外 API 请求
- 有输出时同样会走写回链
- 旧 `inline` 名称仅作为兼容别名保留

### `local_transform`

- 当前只走手动链
- 在本地对提取文本做 transform（由 `modules/tool-local-transform-service.js` 提供）
- 之后仍通过 `context-injector` 写回

### compatibility fallback

- 由 `modules/tool-executor.js` 承接旧执行路径
- 应视为兼容回退，而不是当前推荐主线

## 7. 写回结果与诊断字段

`runToolPostResponse()`、`runToolFollowAiManual()`、本地 transform 手动链返回的 `meta` 中，常见字段包括：

- `traceId`
- `sessionKey`
- `executionKey`
- `slotBindingKey`
- `slotRevisionKey`
- `slotTransactionId`
- `sourceMessageId`
- `sourceSwipeId`
- `confirmedAssistantSwipeId`
- `effectiveSwipeId`
- `selectors`
- `writebackStatus`
- `failureStage`
- `writebackDetails`
- `phases`

其中：
- `writebackStatus` 用于区分成功、失败、空输出跳过与不适用。
- `failureStage` 用于判断失败落在哪个阶段，例如 `build_messages`、`send_api_request`、`extract_output`、`inject_context`。
- `writebackDetails` 用于查看内容是否真正提交、宿主 commit 是否应用、refresh 是否请求及是否确认。
- `phases` 汇总 request / extract / writeback / refresh 的阶段化结果。

### `writebackDetails` 详细结构

`injectDetailed()` 返回的 `writebackDetails` 包含以下关键字段：

```text
{
  success,                          // boolean - 最终成功标志
  toolId,                           // string
  chatId,                           // string
  traceId,                          // string
  sourceMessageId,                  // string|null
  sourceSwipeId,                    // string|null
  effectiveSwipeId,                 // string|null
  slotBindingKey,                   // string
  slotRevisionKey,                  // string
  slotTransactionId,                // string
  messageIndex,                     // number - 解析到的消息索引
  blockIdentity,                    // object|null - 工具写入块标识
  commit: {
    preferredMethod,                // string - 首选提交方法
    attemptedMethods,               // string[] - 尝试过的方法列表
    appliedMethod,                  // string - 实际使用的方法
    fallbackUsed,                   // boolean - 是否使用了 fallback
    contentCommitted,               // boolean - 内容是否已提交
    hostCommitApplied               // boolean - 宿主 commit 是否已应用
  },
  refresh: {
    requestMethods,                 // string[] - refresh 请求方法列表
    requested,                      // boolean
    confirmChecks,                  // number - 确认检查次数
    confirmed,                      // boolean
    confirmedBy,                    // string - 确认来源
    eventSource,                    // string
    eventName                       // string
  },
  contentCommitted,                 // boolean (顶层快捷)
  hostCommitApplied,                // boolean (顶层快捷)
  refreshRequested,                 // boolean (顶层快捷)
  refreshConfirmed,                 // boolean (顶层快捷)
  writebackStatus,                  // string - 'success' | 'failed'
  replacedExistingBlock,            // boolean
  insertedNewBlock,                 // boolean
  conflictDetected,                 // boolean
  conflictReason,                   // string
  preservedOtherToolBlocks,         // boolean
  steps: {
    foundTargetMessage,             // boolean
    contentCommitted,               // boolean
    localTextApplied,               // boolean
    runtimeSynced,                  // boolean
    hostSetChatMessages,            // boolean
    hostSetChatMessage,             // boolean
    refreshForceSetChatMessage,     // boolean
    saveChatDebounced,              // boolean
    saveChat,                       // boolean
    refreshRequested,               // boolean
    notifiedMessageUpdated,         // boolean
    verifiedAfterWrite,             // boolean
    refreshConfirmed                // boolean
  },
  verification: {
    textIncludesContent,            // boolean
    mirrorStored,                   // boolean
    refreshConfirmed                // boolean
  }
}
```

### `meta` 返回值完整字段

`runToolPostResponse()` 成功路径返回的 `meta`：

```text
{
  traceId,
  sessionKey,
  executionKey,
  slotBindingKey,
  slotTransactionId,
  generationAction,
  generationActionSource,
  rawGenerationType,
  normalizedGenerationType,
  generationMessageBindingSource,
  sourceMessageId,
  sourceSwipeId,
  confirmedAssistantSwipeId,
  effectiveSwipeId,
  slotRevisionKey,
  messageCount,
  selectors,
  apiPreset,
  writebackStatus,
  failureStage,
  writebackDetails,
  phases: {
    request: { built, messageCount },
    extract: { completed, hasOutput },
    writeback: {
      attempted,
      contentCommitted,
      hostCommitApplied,
      writebackStatus,
      preferredCommitMethod,
      appliedCommitMethod,
      fallbackUsed
    },
    refresh: {
      requested,
      confirmed,
      requestMethods,
      confirmChecks,
      confirmedBy
    }
  }
}
```

中止路径额外包含：`aborted`（boolean）、`stale`（boolean）、`abortReason`（string）。

### `getRuntimeSnapshot()` 返回值

`getRuntimeSnapshot()` 返回的完整字段：

```text
{
  currentChatId,                    // string - 当前聊天 ID
  enabled,                          // boolean - 自动化是否启用
  isProcessing,                     // boolean - 当前是否有执行链在运行
  pendingTimerCount,                // number - 等待中的定时器数量
  queuedSlotCount,                  // number - 排队中的槽位数量
  recentlyProcessedSlotCount,       // number - 近期已处理槽位数量
  ownWriteMessageIdCount,           // number - 当前 own-write 黑名单条目数量
  activeTransactionCount,           // number - 活跃事务数量
  recentTransactions,               // array - 最近 10 条事务快照
  hostBinding: {
    ...hostBindingStatus,
    eventBindings                   // string[] - 已绑定的事件列表
  },
  settings: {
    enabled,                        // boolean
    settleMs,                       // number (默认 800)
    dedupeWindowMs                  // number (默认 Math.max(1200, settleMs+600) ≈ 1400)
  }
}
```

## 8. 调试顺序建议

当用户反馈"工具执行了但没写回"或"自动化没有触发"时，建议按下面顺序排查：

1. `modules/tool-execution-context.js` 是否解析到了正确 assistant 槽位与身份键
2. `modules/tool-trigger.js` 或 `modules/tool-automation-service.js` 是否走到了预期入口
3. `modules/tool-output-service.js` 是否正确构建请求消息、提取输出并记录失败阶段
4. `modules/api-connection.js` 是否拿到了有效 preset / config 并返回响应
5. `modules/context-injector.js` 是否成功提交并确认 refresh
6. `getAutomationRuntime()` 与 `tool-registry` runtime 中是否记录了最近事务与失败信息

## 9. 兼容性说明

当前仓库仍保留若干旧文件名与兼容接口，但命名存在不代表它们仍是主链：

- `tool-trigger.js` 仍在，但当前主要负责手动执行与提取预览
- `tool-executor.js` 仍在，但主用途是 compatibility fallback
- `inline` 模式仍可被识别，但会映射到 `follow_ai`
- `prompt-editor.js` 仍在，仍被 `popup-shell.js` 用于 prompts 子页签渲染，但已不再通过 `public-api.js` 暴露

判断当前行为时，应始终优先看实际导出与实际调用链，而不是沿用旧命名习惯。
