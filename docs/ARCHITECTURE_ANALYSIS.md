# 架构分析

基于 `1.0.212` 源码的完整架构文档，覆盖分层边界、模块职责、执行链路和数据流。

---

## 1. 架构总览

项目共 ~81 个 JS 源文件（不含 `Reference/` 和 `dist/`），分为 6 层：

```
┌─────────────────────────────────────────────────────────┐
│  index.js (薄入口 ~90行)                                 │
├─────────────────────────────────────────────────────────┤
│  modules/app/ (启动编排层, 3 文件)                        │
│    bootstrap.js · popup-shell.js · public-api.js         │
├─────────────────────────────────────────────────────────┤
│  modules/core/ (基础服务层, 8 文件)                       │
│    storage-service · event-bus · settings-service        │
│    logger-service · host-event-service                   │
│    tool-data-provider · authority-provider               │
│    fallback-provider                                     │
├─────────────────────────────────────────────────────────┤
│  modules/ (核心业务层, ~22 文件)                          │
│    tool-manager · tool-registry · tool-execution-context │
│    tool-output-service · tool-prompt-service             │
│    api-connection · context-injector                     │
│    tool-automation-service · tool-trigger                │
│    tool-local-transform-service · tool-executor          │
│    variable-resolver · regex-extractor                   │
│    regex-preset-store · worldbook-preset-store           │
│    tool-worldbook-service · bypass-manager               │
│    preset-manager · preset-bootstrap · window-manager    │
├─────────────────────────────────────────────────────────┤
│  modules/table-engine/ (填表子系统, 23 文件)              │
│    配置: schema-service · schema-helpers · defaults · types │
│    执行: update-service · provider-service · json-sanitizer │
│    状态: state-service · history-service · target-resolver │
│    写回: writeback-service · worldbook-sync-service      │
│    辅助: lock · diff · guide · scope · isolation         │
│          auto-schedule · chat-scope · data-service       │
│          worldbook-order · worldbook-placement           │
│    适配: ai-protocol-adapters (dsl/sql/full-json)        │
│          template-adapters (youyou/shujuku)              │
├─────────────────────────────────────────────────────────┤
│  modules/ui/ (UI层, ~25 文件)                            │
│    ui-manager · index · utils                            │
│    components/ (面板组件 + controls 控件库)               │
└─────────────────────────────────────────────────────────┘
```

---

## 2. 启动层

### 2.1 index.js — 薄入口 (~90行)

```
创建 appContext (常量 + 模块缓存 + 服务 + UI状态)
→ 创建 popupShell (createPopupShell)
→ 创建 bootstrap (createBootstrap, 注入 openPopup)
→ 创建 publicApi (createPublicApi)
→ 暴露 window.YouYouToolkit
→ 立即调用 bootstrap.init()
```

appContext 是整个应用的共享状态对象，所有 app 层工厂函数接收它作为第一个参数。

### 2.2 bootstrap.js — 启动装配中心

`createBootstrap(context, {openPopup})` 返回 `{loadModules, injectStyles, addMenuItem, init}`。

**init() 执行序列**:

1. `injectStyles()` — 加载外部 `styles/main.css`，失败则用内嵌 ~3000 行 CSS fallback
2. `loadModules()` — 异步 `import()` 加载 15+ 业务模块，单次 Promise 缓存
3. `initUI()` — 注册面板到 uiManager
4. `injectComponentStyles()` — 聚合面板样式
5. `applySavedTheme()` — 应用保存的 UI 主题
6. `ensurePresetSystem()` — 注册内置预设 + 一次性迁移（必须在自动化服务前）
7. `toolAutomationService.init()` — 初始化自动执行服务
8. `addMenuItem()` — 注册 SillyTavern 魔棒菜单项（延迟 1s）

`loadModules()` 装配的模块列表：

| 模块 | 存储键 |
|------|--------|
| `storageModule` | `core/storage-service.js` |
| `apiConnectionModule` | `api-connection.js` |
| `presetManagerModule` | `preset-manager.js` |
| `uiModule` | `ui/index.js` |
| `regexExtractorModule` | `regex-extractor.js` |
| `toolManagerModule` | `tool-manager.js` |
| `toolExecutorModule` | `tool-executor.js` |
| `windowManagerModule` | `window-manager.js` |
| `toolRegistryModule` | `tool-registry.js` |
| `settingsServiceModule` | `core/settings-service.js` |
| `bypassManagerModule` | `bypass-manager.js` |
| `variableResolverModule` | `variable-resolver.js` |
| `contextInjectorModule` | `context-injector.js` |
| `toolPromptServiceModule` | `tool-prompt-service.js` |
| `toolOutputServiceModule` | `tool-output-service.js` |
| `toolAutomationServiceModule` | `tool-automation-service.js` |
| `toolDataProviderModule` | `core/tool-data-provider.js` |
| `presetBootstrapModule` | `preset-bootstrap.js` |

`toolOutputService` 加载后立即绑定 `apiConnection`。

### 2.3 popup-shell.js — UI 壳层与路由

`createPopupShell(context)` 返回 `{openPopup, closePopup, switchMainTab, switchSubTab}`。

- 弹窗创建/关闭/拖拽（可拖动 header）
- 侧栏可折叠（`yyt-collapsed` class）
- 主导航渲染（`TOOL_REGISTRY` 定义 6 个主标签页）
- 子导航渲染（内置工具 + `buildToolsSubTabs()` 动态生成自定义工具子标签）
- 面板内容区刷新（`refreshCurrentPanel()`）
- 事件总线联动（`UI_TAB_CHANGED`, `UI_SUBTAB_CHANGED`）

### 2.4 public-api.js — 全局 API 门面

暴露 `window.YouYouToolkit`，分为 5 类接口：

- **基础信息**: `version`, `id`
- **UI 控制**: `openPopup`, `closePopup`, `switchMainTab`, `switchSubTab`
- **API/预设**: `getApiConfig`, `saveApiConfig`, `sendApiRequest`, `testApiConnection`, `getPresets`
- **模块 getter**: `getStorage`, `getApiConnection`, `getToolManager`, `getToolRegistry`, `getSettingsService`, `getBypassManager`, `getVariableResolver`, `getContextInjector`, `getToolOutputService`, `getToolAutomationService`, `getDataProvider`, `getDataProviderAsync` 等
- **自动化控制**: `startAutomation`, `stopAutomation`, `getAutomationRuntime`, `cancelAutomation`, `processCurrentAssistantMessage`

---

## 3. 基础服务层

### 3.1 storage-service.js — 存储抽象

**设计模式**: Strategy (后端选择) + Adapter (统一接口) + Cache-aside (内存缓存) + Namespace Isolation

```
StorageService (class)
  constructor(namespace) → 创建命名空间实例
  _getStorage() → 延迟探测 SillyTavern extensionSettings → localStorage 回退
  get(key, defaultValue) → 内存缓存 → 后端读取 → JSON 解析
  set(key, value) → 写后端 + 更新缓存
  namespace(sub) → 创建子命名空间 (冒号分隔, 如 youyou_toolkit:tools)
  remove / has / clear / getMultiple / setMultiple / exportAll
```

**四个预创建单例**:

| 单例 | 命名空间 | 用途 |
|------|---------|------|
| `storage` | `youyou_toolkit` | 主存储 |
| `toolStorage` | `youyou_toolkit:tools` | 工具数据 |
| `presetStorage` | `youyou_toolkit:presets` | 预设数据 |
| `windowStorage` | `youyou_toolkit:windows` | 窗口状态 |

SillyTavern 路径存储在 `extensionSettings` 对象（直接存 JS 值），localStorage 路径需要 JSON 序列化 + 命名空间前缀键。

### 3.2 event-bus.js — 跨模块事件总线

80+ 事件类型，分 8 类：存储、预设、API、工具、UI、应用、设置、破限词。

```javascript
EventBus {
  listeners: Map<event, Set<{callback, priority}>>
  history: Array<{event, data, timestamp}>  // 环形缓冲, 上限 100
  on(event, callback, {priority}) → unsubscribe 函数
  once(event, callback) → unsubscribe 函数
  emit(event, data)    // 按优先级降序执行
  wait(event, timeout) → Promise  // 等待事件触发, 支持超时
  hasListeners / listenerCount / removeAllListeners / getHistory
}
```

### 3.3 settings-service.js — 全局配置

```
SettingsService (单例) {
  _cache: Object | null
  getSettings() → 四大分类:
    executor: {maxConcurrent:3, maxRetries:2, retryDelayMs:5000, requestTimeoutMs:90000, queueStrategy:'fifo'}
    automation: {settleMs:1200, cooldownMs:5000, maxConcurrentSlots:1}
    debug: {enableDebugLog:false, saveExecutionHistory:true, showRuntimeBadge:true}
    ui: {compactMode:false, animationEnabled:true, theme:'dark-blue', startupScreenDismissed:false}
  updateSettings(partial) → 深度合并
  get('executor.maxConcurrent') → 点分路径访问
  set('ui.theme', 'dark-purple') → 点分路径写入
  _migrateLegacy() → 清理废弃字段 (如 #48 删除 automation.enabled)
}
```

### 3.4 logger-service.js — 集中式日志

```
LoggerService (单例) {
  _entries: Array<Entry>  // 环形缓冲, 上限 2000
  _minLevel: INFO         // DEBUG | INFO | WARN | ERROR

  createScope(name) → { debug, info, log, warn, error }  // 绑定 scope 的方法集
  getEntries({level, scope, search, limit:500, offset}) → {entries, total}
  getStats() → { byLevel, byScope }
  setToastHandler(fn) → 注册 UI toast 回调
  setLevel / setMaxSize / clear / levelLabel
}
```

每条日志通过 `queueMicrotask` 批量推送到 EventBus (`logger:entry` 事件)，UI LoggerPanel 订阅实时显示。

### 3.5 host-event-service.js — 宿主事件桥接

**18 个 HOST_EVENTS 常量**: APP_READY, MESSAGE_SENT/RECEIVED/UPDATED/DELETED/EDITED/SWIPED, GENERATION_STARTED/STOPPED/ENDED, CHAT_CHANGED/CREATED/DELETED, CHARACTER_* 等。

```
HostEventService (单例) {
  _pending: Array    // 宿主未就绪时的排队订阅
  _attached: Array   // 已绑定订阅
  subscribe(eventKey, handler) → unsubscribe
  ready({timeoutMs:10000}) → Promise<boolean>
  emit(eventKey, ...payload) → 通过宿主 eventSource 发射
  reinit() → 强制重新探测
  describe() → 诊断信息
}
```

**探测链**: `SillyTavern.eventSource` → `getContext().eventSource` → `topWindow.eventSource`

**事件名归一化**: 调用方使用 `HOST_EVENTS.MESSAGE_RECEIVED`，服务通过宿主 `eventTypes` 映射解析为原生事件名。

**就绪等待**: 宿主未就绪时订阅排队，1.5s 轮询（最多 20 次），就绪后自动绑定。

### 3.6 tool-data-provider.js — Provider 抽象工厂

```
getToolDataProvider({extensionVersion}) → Promise<IToolDataProvider>
  → 尝试 AuthorityProvider (SDK → SQLite)
  → 失败则 FallbackProvider (内存 SQL 引擎 + JSON 持久化)
  → Promise 缓存，并发调用共享单次初始化

IToolDataProvider 接口: init, dispose, migrate, query, execute, batch, transaction, backup, export, import, describe
```

### 3.7 authority-provider.js — SQLite Provider

包装 `window.STAuthority.AuthoritySDK` 的 `sql` 客户端。声明 `private` SQL 权限。提供 `migrate/query/execute/batch/transaction/paginate/pageAll` 方法。backup/export/import 为 stub（Authority 框架原生处理）。

### 3.8 fallback-provider.js — 内存 SQL 引擎

实现了一个受限 SQL 解释器（无 JOIN/GROUP BY/子查询/OR），支持 CREATE TABLE/INSERT/UPDATE/DELETE/SELECT(WHERE+ORDER BY+LIMIT)。事务通过快照+回滚实现 ACID-like 语义。通过 `toolStorage` 持久化为单个 JSON blob。

---

## 4. 工具定义层与运行时层

### 4.1 tool-manager.js — 定义层 (520行)

管理用户可自定义的工具定义，重点在持久化和标准化：

```
DEFAULT_TOOL_STRUCTURE → {
  id, name, description, icon, order, category,
  promptTemplate, extractTags,
  config: { execution, api, messages, context, automation, worldbooks },
  enabled, metadata
}

关键函数:
  createDefaultToolDefinition(input)    → 创建并填充默认值
  normalizeToolDefinitionToRuntimeConfig(id, def) → 扁平化为运行时模型
  getAllTools / saveTool / deleteTool / importTools / exportTools
  setToolEnabled / resetTools
```

**模板三级回退**: 显式 `promptTemplate` → 消息数组序列化 (`【ROLE】` 块) → 中文默认字符串。

### 4.2 tool-registry.js — 运行时层 (1395行)

把内置工具与自定义工具合并为 UI 和执行链消费的运行时模型。

**5 个内置工具**: summaryTool, statusBlock, youyouReview, escapeTransformTool, punctuationTransformTool

**配置三级合并**:
```
getToolFullConfig(toolId):
  baseDefaultConfig → 用户覆盖 (storage 'tool_configs') → 旧版 API 预设绑定
```

**运行时状态** (~30 个字段):
```
lastRunAt, lastStatus, lastError, lastDurationMs,
successCount, errorCount,
lastSlotBindingKey, lastSlotRevisionKey, lastSlotTransactionId,
lastSourceMessageId, lastSourceSwipeId,
lastWritebackStatus, lastFailureStage,
lastContentCommitted, lastHostCommitApplied,
lastRefreshRequested, lastRefreshConfirmed,
lastPreferredCommitMethod, lastAppliedCommitMethod,
lastTraceId,
lastAutoRunAt, lastAutoStatus, lastAutoMessageId, ...
recentWritebackHistory (10~50 条)
```

**判断标准**:
- 改"用户工具定义怎么存" → `tool-manager.js`
- 改"工具在 UI 和执行链里长什么样" → `tool-registry.js`

### 4.3 tool-execution-context.js — 执行上下文构建

读取宿主聊天状态，生成标准化执行上下文：

```
getTopWindow() → 安全访问父窗口
getSillyTavernAPI() → 获取宿主 API
buildConversationSnapshot(messages) → 归一化消息列表
stripKnownToolBlocks(text, message) → 剥离已写回工具块
buildAssistantContentFingerprint(content) → "fp_XXXX" 哈希
```

**三级 Slot Identity**:

| 键 | 公式 | 语义 |
|----|------|------|
| `slotBindingKey` | `chatId::messageId` | 粗定位到同一助手槽位 |
| `slotRevisionKey` | `bindingKey::swipeId::fp_XXXX` | 精确定位到具体内容版本 |
| `slotTransactionId` | `revisionKey::eventType::traceId` | 唯一标识一次执行事务 |

`assistantBaseText` = AI 原始输出（已剥离工具写回块），用于指纹计算和提取，避免重复提取和写回污染。

---

## 5. 执行链

### 5.1 tool-output-service.js — 执行核心

**三种输出模式**:
- `POST_RESPONSE_API` — 额外 API 请求 → 提取 → 写回
- `FOLLOW_AI` — 手动链独立执行路径
- `LOCAL_TRANSFORM` — 本地文本变换

**runToolPostResponse 五阶段流水线**:

```
1. BUILD_MESSAGES  → _buildToolMessages()
     收集最近助手消息 → 全局规则过滤 → 工具特定提取
2. [abort check]   → shouldAbortAutoWriteback()
3. SEND_API_REQUEST → api-connection.sendWithPreset()
4. EXTRACT_OUTPUT   → _extractOutputContent() + _applyOutputExtractionSelectors()
5. INJECT_CONTEXT   → contextInjector.injectDetailed()
```

每阶段失败记录 `failureStage` (`BUILD_MESSAGES` / `SEND_API_REQUEST` / `EXTRACT_OUTPUT` / `INJECT_CONTEXT`) 和 `writebackStatus` (`SUCCESS` / `FAILED` / `SKIPPED_EMPTY_OUTPUT` / `NOT_APPLICABLE`)。

**提取上下文解析**: `_resolveExtractionContext()` 从绑定的正则预设 (`extraction.regexPresetId`) 加载 include/exclude/regex_include/regex_exclude 规则 + 黑名单。

### 5.2 tool-prompt-service.js — 消息构建

```
buildToolMessages(toolConfig, context):
  1. _buildVariableContext → 解析世界书内容 + 模板变量
  2. _getBypassMessages → 获取 bypass 消息 (如果启用)
  3. 检查 bypass mainSlot (A/B) → 有则替换主提示词
  4. 否则使用 promptMessages 数组或默认模板
  5. 返回 [{role, content}] 消息数组 (OpenAI 格式)
```

**Main Slot 机制**: bypass 消息可声明 `mainSlot: 'A'` 或 `'B'`，接管"主提示词"位置。

### 5.3 api-connection.js — API 连接管理

**三级请求回退链**:

```
1. sendViaMainApi → TavernHelper.generateRaw (宿主主 API)
2. sendViaCustomApi:
   a. TavernHelper.generateRaw({custom_api: config})
   b. POST /api/backends/chat-completions/generate (SillyTavern CORS 代理)
   c. 直接 fetch (仅代理返回 404/405/501/502 时)
```

**中止检测**: `AbortError` / "停止按钮" / "stop button" / "Clicked stop" / "请求已取消"。

### 5.4 context-injector.js — 写回引擎

**核心方法**: `injectDetailed(toolId, content, options)`

```
写回流程:
  1. 查找目标助手消息 (sourceMessageId)
  2. 读取现有工具输出 (message[YouYouToolkit_toolOutputs])
  3. 精确块替换 → 选择器剥离 → 旧内容剥离
  4. 追加新内容到消息文本
  5. 更新所有文本字段 (mes, message, content, text) + swipe 数组
  6. 写入输出镜像 (message[YouYouToolkit_toolOutputs])
  7. 重建聚合上下文 (message[YouYouToolkit_injectedContext])
  8. 同步 context.chat 和 api.chat 数组
  9. TavernHelper.setChatMessages → 宿主刷新
  10. saveChat / saveChatDebounced
  11. 发射 MESSAGE_UPDATED
  12. _confirmRefresh (3 次重试, 60ms 间隔)
```

返回详细写回结果含：成功/失败、验证状态、冲突检测、提交方法、刷新确认。

### 5.5 tool-automation-service.js — 自动触发服务

**Transaction 模型**:

```
TX_PHASE: RECEIVED → CONFIRMED → CONTEXT_BUILT → REQUEST_STARTED →
REQUEST_FINISHED → WRITEBACK_STARTED → WRITEBACK_COMMITTED → REFRESH_CONFIRMED
(或 SKIPPED / FAILED)
```

**防重放/防递归**:

| 机制 | 实现 |
|------|------|
| 槽位去重 | `_recentlyProcessedSlots` Map, 键 `messageId::swipeId`, 滑动时间窗口 |
| 自写黑名单 | `_ownWriteMessageIds` Map, 10s TTL, 防止写回触发递归 |
| 种子标记 | `_seedKnownSlots()`, 初始化时标记当前最新助手 slot 为永久已知 |
| 并发控制 | 按 slot 串行排队 (`_enqueueSlot`) |
| 取消 | `GENERATION_STOPPED` → 取消所有活动事务和定时器 |

**事件订阅**:

| 事件 | 处理 |
|------|------|
| `MESSAGE_RECEIVED` | 主触发, 守卫过滤后去抖 800ms 调度处理 |
| `GENERATION_STOPPED` | 取消所有活动事务和定时器 |
| `CHAT_CHANGED` | 完全状态重置 |
| `MESSAGE_DELETED` | 清理特定消息状态, 重新种子标记 |
| `MESSAGE_SENT` | 清理待处理定时器 |

**处理流程**: 守卫过滤 → 去抖 settle → `processAssistantMessage()` → 构建上下文 → 收集自动工具 (local_transform 先, post_response_api 后) → 串行执行 (链式刷新) → 可选填表自动更新 → 更新运行时诊断。

### 5.6 tool-trigger.js — 手动执行入口

```
runToolManually(toolId):
  1. 验证工具存在和启用
  2. buildExecutionContextForLatestAssistant({runSource: 'MANUAL'})
  3. resolveExecutionPath:
     LOCAL_TRANSFORM  → tool.output.mode === 'local_transform' 或有 processor.type
     POST_RESPONSE_API → tool.output.mode === 'post_response_api'
     FOLLOW_AI        → tool.output.mode === 'follow_ai'
     COMPATIBILITY    → 其他 (懒加载 tool-executor.js)
  4. 分发执行
  5. 更新运行时状态 (~17 个跟踪字段)

previewToolExtraction(toolId):
  → toolOutputService.previewExtraction (仅提取预览, 不执行)
```

### 5.7 tool-local-transform-service.js — 本地变换

```
LOCAL_PROCESSOR_TYPES: { ESCAPE_TRANSFORM, PUNCTUATION_TRANSFORM }

runLocalTransformTool(tool, context):
  getExtractionSnapshot → 提取源文本
  → runLocalTextTransform (escape 或 punctuation 纯文本变换)
  → applyLocalTransformToFullMessage (在全文中替换)
  → contextInjector.injectDetailed (写回)
```

### 5.8 tool-executor.js — 兼容回退

早期通用任务调度器 (`TaskScheduler`，并发控制 max 3、重试线性退避、批量执行)。已被 `tool-output-service` + `tool-automation-service` 取代，仅通过 `import()` 懒加载作为兼容路径。

---

## 6. 辅助业务模块

### 6.1 variable-resolver.js — 模板变量解析

**15 个内置变量** (4 类):

| 类 | 变量 |
|----|------|
| chat | `lastUserMessage`, `lastAiMessage`, `chatHistory`, `userMessage` |
| character | `characterCard` |
| tool | `toolName`, `toolId`, `toolPromptMacro`, `toolContentMacro`, `toolWorldbookContent` |
| context | `injectedContext`, `extractedContent`, `recentMessagesText`, `rawRecentMessagesText`, `previousToolOutput` |

**三阶段解析**: 内置变量 (regex 直替换) → 自定义变量 (支持函数处理器) → 命名空间变量 (`regex.xxx` 前缀)。

### 6.2 regex-extractor.js — 正则提取引擎 (1060行)

**四种标签格式**: Simple (`<tag>content</tag>`), Curly (`{tag|content}`), Complex (自定义起止), HTML (带属性)

**提取三阶段管道**:
```
Phase 1: 块级排除 (移除 <exclude> 块)
Phase 2: 内容提取 (include 规则尝试 simple + curly; regex_include 用捕获组)
Phase 3: 清理 (regex_exclude 移除匹配 + 黑名单过滤)
```

`scanTextForTags` 支持 50KB 分块 + 5s 超时保护。

### 6.3 regex-preset-store.js — 正则预设商店

```
CRUD: listPresets, getPreset, createPreset, updatePreset, deletePreset, duplicatePreset
规则级: addRule, updateRule, deleteRule, moveRule
引擎同步: syncEngineFromPreset → 动态 import regex-extractor → 推送规则 + 黑名单
内置预设: _builtinPresets (ID 前缀 builtin_regex_)
旧版迁移: migrateIfNeeded() 从 settings.tagRulePresets 迁移 (一次性, 标记 regex_presets_migrated)
跨模块: findLinkedTools(presetId) → 扫描所有工具配置查找引用
```

### 6.4 tool-worldbook-service.js — 世界书服务

```
getAvailableWorldbooks() → 探测 TavernHelper + SillyTavern API → 缓存世界书列表
buildSelectedWorldbookContent(arg):
  bindingMode: 'character_card' → 动态获取角色绑定的世界书 + 预设覆盖
  bindingMode: 'custom' → 仅使用预设中启用的世界书
```

支持条目级覆盖: 预设可为每个世界书条目设置 `enabled/disabled`。

### 6.5 worldbook-preset-store.js — 世界书预设商店

结构与 regex-preset-store 类似。每个预设有 `bookList`，每条目可含 `entryOverrides: Map<uid, {enabled}>`。

### 6.6 bypass-manager.js — AI 指令预设 (852行)

管理有序消息列表注入 API 请求。

```
DEFAULT_BYPASS_PRESETS → table_workbench_fill_default (8 条内置消息)
消息规范化: $0→{{toolContentMacro}}, $1→{{rawRecentMessagesText}}, ...
CRUD: getAllPresets, createPreset, updatePreset, deletePreset, duplicatePreset
消息级: addMessage, updateMessage, deleteMessage
构建: buildBypassMessages(toolConfig) → 返回启用消息数组
Main Slot: 消息可声明 mainSlot: 'A'/'B' 接管主提示词位置
```

### 6.7 preset-manager.js — API 预设管理

管理 API 连接参数 (URL, key, model, temperature 等)。数组存储 (按 name 查找)。支持收藏星标、重命名、导入导出。

### 6.8 preset-bootstrap.js — 预设系统引导

**一次性迁移 (Issue #45)**:
```
ensurePresetSystem():
  1. registerBuiltinPresets() → 注入 3 个内置正则预设 (boo_FM, status_block, youyou)
  2. runMigrationOnce():
     - 备份现有工具配置
     - 为每个缺少 extraction.regexPresetId 的工具匹配/创建正则预设
     - 为每个缺少 worldbooks.presetId 的工具创建世界书预设
     - 失败则不设置完成标记, 保留旧字段
```

### 6.9 window-manager.js — 浮动窗口管理 (809行)

```
createWindow(options) → 浮动窗口
特性: 8方向缩放, 拖拽, 最大化/还原, z-index 层叠管理,
      状态持久化 (windowStorage), 响应式 (3断点), iframe 兼容
```

---

## 7. 填表工作台子系统

### 7.1 数据类型层

| 模块 | 职责 |
|------|------|
| `table-types.js` | 纯数据工厂 (Sheet, TableBoundState, TargetPointer/Snapshot, LockScopeKey), 零外部依赖 |
| `table-defaults.js` | 8 个内置表模板 (全局状态/主角/角色/技能/物品/任务/备忘/选项) |
| `table-schema-helpers.js` | 纯工具函数 (单元格值规范化, 列键清理) |

### 7.2 配置管理

**table-schema-service.js (1183行)** — 配置 CRUD + 验证:
```
getTableWorkbenchConfig() → 读存储 → 规范化 → 应用 guide 覆盖
normalizeTableWorkbenchConfig() → ~100 字段深度规范化
validateTableDraftDeep() → 逐单元格验证, 返回 {severity, message} 结构化 issues
stripRowsForConfigSave — 保存时移除行数据 (仅存 schema)
```

**table-template-service.js** — 模板库 + 三模式解析:
```
三模式:
  inherit_global → 使用全局活动模板
  chat_override  → 使用聊天级覆盖
  preset_link    → 链接到指定模板 ID

模板库 CRUD + 导入导出 (自动检测 youyou/shujuku 格式)
聊天级: applyTemplateAsChatOverride, linkPresetToChat
归档: listTemplateArchives, restoreTemplateArchive (最多 8 层, 含 undo 链)
```

**table-guide-service.js** — 每聊天指南覆盖:
```
guide: { templateId, scope, worldbookSync, seedNote, focusedTableId }
applyGuideToConfig(config, guide) → 覆盖到配置上
```

### 7.3 执行管道

**table-update-service.js (1385行)** — 七步管道:
```
Step 0: resolveTarget      → table-target-resolver (目标助手消息定位)
Step 1: mergeScopeTables   → 活动模板 + tableEnabledOverrides
Step 1b: autoSchedule      → buildAutoSchedulePlan (按 updateFrequency 门控)
Step 2: loadBaseData       → table-state-service → table-history-service (5级级联)
Step 3: buildRequest       → 组装 prompt + 世界书 + 指南 + scope 指导
Step 4: callAI             → api-connection (3次重试, 5s退避, 中止信号)
Step 5: parseResponse      → 适配器链 (DSL→SQL→JSON) → 回退到 JSON 清理器
Step 6: applyEdits         → scope 过滤 + 锁强制 + 4级列键解析
Step 7: writeback+sync     → commitBoundState + 消息镜像 + 世界书同步
```

**table-history-service.js** — 五级状态级联:
```
EXACT           → 当前消息索引, 精确 slotRevisionKey 匹配
BINDING_FALLBACK → 同 slotBindingKey 但不同 revision (swipe 变更)
HISTORY         → 反向遍历聊天寻找最近含数据助手消息
TEMPLATE        → 回退到提供的模板表
EMPTY           → 创建空状态
```

### 7.4 AI 响应解析

**协议适配器链** (优先级顺序):
```
1. dsl-adapter    → 检测 <tableEdit> 标签或 insertRow/updateRow/deleteRow
2. sql-adapter    → 检测 <sql> 标签或 INSERT/UPDATE/DELETE 语句
3. full-json-adapter → 检测 JSON 代码块或 {"tables":} 模式
```

**table-json-sanitizer.js** — 多层 JSON 修复:
```
5层管道: normalizeQuotes → escapeUnescapedQuotes(状态机) →
         sanitizeControlChars → removeTrailingCommas → fixNumericKeys
+ 松散对象解析 + DSL 解析
```

### 7.5 状态与写回

| 模块 | 职责 |
|------|------|
| `table-state-service.js` | 每消息状态 CRUD (`message.YouYouToolkit_tableState[isolationKey]`), SQL 镜像 |
| `table-target-resolver.js` | 将执行上下文翻译为 TableTargetSnapshot, 含新鲜度验证 |
| `table-writeback-service.js` | commitBoundState + 可选消息体镜像 + 世界书同步 |
| `table-worldbook-sync-service.js` | 转换表数据为世界书条目 (注释前缀 `[YY:chatId=xxx]` 命名空间) |
| `table-worldbook-order-service.js` | 顺序碰撞避免 (连续分配) |
| `table-worldbook-placement-service.js` | 位置/深度规范化 |

### 7.6 辅助服务

| 模块 | 职责 |
|------|------|
| `table-lock-service.js` | 四级锁 (行/列/单元格/索引列), 按 sheetUid 存储 |
| `table-diff-service.js` | 表 diff 计算 (new/updated/unchanged), 用于 UI 高亮 |
| `table-scope-service.js` | 运行 scope 解析 (enabled/selected/current 三模式) |
| `table-auto-schedule-service.js` | 按表 updateFrequency 自动调度 (-1=每次, 0=禁用, N=每N条) |
| `table-isolation-service.js` | 隔离键管理 (单例, 支持 subscribe) |
| `table-chat-scope-service.js` | 每聊天作用域配置 (模板模式 + 归档) |
| `table-data-service.js` | SQL 数据镜像 (4表: sheets, rows, locks, chat_scope) |
| `table-provider-service.js` | 执行 Provider 缝 (当前仅 native) |

### 7.7 模板适配器

```
importTemplateAuto:
  youyou-importer → 检测 {tables: Array}
  shujuku-importer → 检测 {sheet_xxx} → 转换 content[][] + sourceData

exportTemplatesAs:
  youyou-exporter → {version: 1, exportedAt, templates}
```

---

## 8. UI 层

### 8.1 UI 管理器

**ui-manager.js** — 组件生命周期:
```
UIManager (单例) {
  components: Map<id, config>
  activeInstances: Map<id, {container, cleanup}>
  render(id, container, props):
    Mode A (新式 prefab): component.renderTo($container, props) → 原生 DOM
    Mode B (旧式 jQuery): component.render() → HTML → $container.html() → bindEvents()
  destroy(id, container) → 清理
  getAllStyles() → 聚合所有组件 getStyles()
}
```

**ui/index.js** — 面板注册 + 路由:
```
PANEL_MODULE_LOADERS (10 个面板):
  → Promise.allSettled(动态 import()) → panelModuleCache 缓存
  → uiManager.register(panel.id, panel)
MAIN_TAB_RENDERERS / SUB_TAB_RENDERERS: 不可变路由表
```

### 8.2 面板一览

| 面板 | 渲染模式 | 工厂 | 行数 |
|------|---------|------|------|
| SettingsPanel | jQuery | — | 多标签 (执行器/调试/UI) |
| LoggerPanel | jQuery | — | 实时日志 (250ms 批量渲染) |
| ToolManagePanel | jQuery | — | 工具列表 + CRUD |
| BypassPanel | jQuery | — | AI指令预设编辑 |
| TableWorkbenchPanel | 委托 | — | 薄 facade → workbench-window |
| ApiPresetPanel | Prefab | createPresetManagerPanel | API 预设 |
| RegexExtractPanel | Prefab | createPresetManagerPanel | 正则规则 + 拖拽 + 测试 |
| WorldbookPresetPanel | Prefab | createPresetManagerPanel | 世界书 (双模式 + 条目覆盖) |
| TableTemplatePanel | Prefab | createPresetManagerPanel | 表模板 |
| ToolConfigPanel | Prefab | createToolConfigPanel | 每工具运行时配置 |

### 8.3 预设面板模板方法

`createPresetManagerPanel(spec)` — 工厂函数，从规格生成完整面板:

```
必选: { id, kind, store, renderEditor }
可选: { renderExtras, renderListItemMeta, hasSwitchToButton, onSwitchTo }

固定布局: 预设列表 | 编辑器 | 扩展区 | 工具栏 (import/export/clear)
内置行为: builtin 前缀保护 | 重命名/删除 | 实时编辑 (onChange patch) | Store Adapter 模式
```

### 8.4 Prefab 控件库

**基础设施** (`controls/_internal.js`):
```
el(tag, options, ...children) → DOM 元素工厂
appendChild(parent, child)    → 通用子元素插入 (DOM/控件/字符串/数组/null)
createEmitter()               → {on→unsubscribe, off, emit, clear}
baseControl({id, kind, el, style, className, attrs}) → {_id, _kind, _children, _emitter, on, off, get, set, destroy}；el 存在时自动 apply passthrough
```

**15 个控件**: button (4变体×2尺寸), text-input (5类型), toggle (标签+提示+滑块), select-input (原生包装), dialog (confirm/prompt/custom 三模式), flow-section, form-row, list-row, toolbar, divider, zone-title, chip-group, preset-list-item。

所有控件遵循统一接口: `{ el, get, set, on, off, destroy, getControl }`。

### 8.5 关键 UI 模块

**table-data-editor-window.js (1660行)** — 最大 prefab 控件应用:
```
三模式: data (卡片网格) / schema (字段+AI指令+updateConfig) / global (exportConfig)
浮动窗口 + 锁支持 + 脏检测
```

**table-workbench-window.js (1600行)** — 工作台视图:
```
聚合 8+ 服务状态, hero + 可滚动区域, Provider 统计
```

---

## 9. 数据流总览

### 9.1 自动执行完整链路

```
SillyTavern MESSAGE_RECEIVED
  → host-event-service 归一化事件名
  → tool-automation-service 守卫过滤 + 去抖 800ms
  → tool-execution-context 构建上下文 + 三级 slot key
  → tool-output-service.runToolPostResponse (per tool)
    → tool-prompt-service 构建消息 (变量 + bypass + 模板)
    → api-connection 三级回退请求
    → 提取输出 (标签/正则)
  → context-injector.injectDetailed 写回
    → 多字段同步 + 宿主刷新 + 3次验证
  → [可选] runAutoTableUpdate
    → 七步管道 (模板解析 → 历史级联 → AI请求 → 适配器解析 → 锁过滤 → 写回 → 世界书同步)
```

### 9.2 存储位置汇总

| 数据 | 存储位置 | 格式 |
|------|---------|------|
| 全局设置 | `storage('settings_v2')` | 对象 |
| API 预设 | `storage('api_presets')` | 数组 |
| 工具定义 | `toolStorage('tools')` | 对象 |
| 工具运行时配置 | `storage('tool_configs')` | 对象 |
| 正则预设 | `presetStorage('regex_presets')` | Map |
| 世界书预设 | `presetStorage('worldbook_presets')` | Map |
| Bypass 预设 | `storage('bypass_presets')` | 对象 |
| 填表配置 | `storage('tableWorkbench').config` | 对象 |
| 填表模板库 | `storage('tableWorkbenchTemplates').templates` | Map |
| 表状态 | `message.YouYouToolkit_tableState[isoKey]` | 按消息 |
| 表绑定 | `message.YouYouToolkit_tableBindings[isoKey]` | 按消息 |
| 锁状态 | `storage('tableLocks').scopes[scopeKey][uid]` | 按sheet |
| 工具输出 | `message.YouYouToolkit_toolOutputs` | 按消息 |
| 注入上下文 | `message.YouYouToolkit_injectedContext` | 按消息 |
| 日志 | 内存环形缓冲 (2000条) | 仅内存 |
| SQL 镜像 | Authority SQLite / localStorage JSON | 4表 |

---

## 10. 兼容层与非主线路径

| 模块 | 状态 | 说明 |
|------|------|------|
| `tool-executor.js` | 兼容回退 | 旧任务调度器, 通过 `import()` 懒加载 |
| `ui-components.js` | 兼容层 | 重新导出 ui/index.js, `@deprecated` |
| `prompt-editor.js` | 活跃 | 三段式提示词编辑器, 仍用于 bypass 编辑 |
| `storage.js` | 已删除 | 统一走 core/storage-service.js |
| `inline` 模式名 | 兼容别名 | 映射到 `follow_ai` |

---

## 11. 排查顺序建议

| 问题类型 | 排查路径 |
|---------|---------|
| 启动问题 | `index.js` → `bootstrap.js` |
| 弹窗/路由问题 | `popup-shell.js` → `tool-registry.js` |
| 工具配置问题 | 分清 `tool-manager.js` (定义层) vs `tool-registry.js` (运行时层) |
| 手动执行问题 | `tool-trigger.js` → `tool-output-service.js` → `api-connection.js` |
| 自动执行问题 | `tool-automation-service.js` → `tool-execution-context.js` |
| 写回问题 | `context-injector.js` (source message 绑定 → host commit → refresh 确认) |
| API 请求问题 | `api-connection.js` (三级回退链) |
| 填表配置问题 | `table-schema-service.js` |
| 填表执行问题 | `table-update-service.js` (七步管道) |
| 填表状态问题 | `table-state-service.js` → `table-history-service.js` (5级级联) |
| 世界书同步问题 | `table-worldbook-sync-service.js` |
| UI 面板问题 | `ui/index.js` → `ui-manager.js` → 具体面板组件 |
| 日志/诊断问题 | `logger-service.js` LoggerPanel |
