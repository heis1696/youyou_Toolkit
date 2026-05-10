# FRAMEWORK ARCHITECTURE

本文档基于当前 `1.0.126` 源码，对 YouYou Toolkit 的主线框架做一份面向维护者的查阅式说明。

它不是按文件列表罗列细节，而是按"遇到问题时应该先理解哪条主线"来组织内容。

当历史讨论、旧文档、旧命名与当前实现不一致时，应优先以以下源码为准：

- `index.js`
- `modules/app/bootstrap.js`
- `modules/app/popup-shell.js`
- `modules/app/public-api.js`
- `modules/tool-execution-context.js`
- `modules/tool-trigger.js`
- `modules/tool-automation-service.js`
- `modules/tool-output-service.js`
- `modules/context-injector.js`
- `modules/table-engine/table-schema-service.js`
- `modules/table-engine/table-update-service.js`

## 1. 一句话框架结论

当前仓库的主线不是"旧 trigger 管理器 + 一组零散工具模块"，而是：

- 薄入口 `index.js`
- 启动装配中心 `modules/app/bootstrap.js`
- 单弹窗工作区壳层 `modules/app/popup-shell.js`
- 宿主公开门面 `modules/app/public-api.js`
- 工具定义层 `modules/tool-manager.js`
- 运行时工具模型层 `modules/tool-registry.js`
- 统一执行上下文层 `modules/tool-execution-context.js`
- 手动入口 `modules/tool-trigger.js`
- 自动入口 `modules/tool-automation-service.js`
- 输出与写回主链 `modules/tool-output-service.js -> modules/tool-prompt-service.js -> modules/api-connection.js -> modules/context-injector.js`

维护时应优先判断问题落在哪条主线，而不是被旧文件名带偏。

## 2. 启动与上下文装配

### 2.1 `index.js`：薄入口

`index.js` 当前职责很少，只做这些事：

1. 创建共享 `appContext`
2. 初始化常量、模块引用缓存、服务引用与 UI 状态
3. 创建 `popupShell`
4. 创建 `bootstrap`
5. 创建 `publicApi`
6. 暴露 `window.YouYouToolkit`
7. 立即调用 `bootstrap.init()`

这意味着：

- 不应把新的业务逻辑继续堆回 `index.js`
- 启动逻辑应落到 `bootstrap.js`
- UI 壳层逻辑应落到 `popup-shell.js`
- 对外公开能力应落到 `public-api.js`

### 2.2 `modules/app/bootstrap.js`：装配中心

`bootstrap.js` 是当前应用启动中心，负责：

- 加载主线模块
- 注入基础样式与主题变量
- 初始化 UI 模块
- 注册菜单入口
- 初始化自动化服务

当前主线模块加载完成后，还会把：

- `toolOutputService`
- `api-connection`

绑定起来，形成额外请求链。

### 2.3 `modules/app/public-api.js`：宿主门面

宿主侧稳定入口是：

```javascript
window.YouYouToolkit
```

它公开的能力主要分为：

- UI 控制：`openPopup()` / `closePopup()` / tab 切换
- API 与预设访问：`getApiConfig()` / `saveApiConfig()` / `sendApiRequest()` / `getPresets()`
- 模块 getter：`getToolRegistry()` / `getToolOutputService()` / `getToolAutomationService()` 等
- 自动化控制：`startAutomation()` / `stopAutomation()` / `getAutomationRuntime()` / `processCurrentAssistantMessage()`

因此，判断"什么算公开 API"时，不要看旧笔记，要先看 `modules/app/public-api.js`；`loadLegacyModule()`、`getUiComponents()`、`getPromptEditor()` 已不属于当前接口面。

## 3. UI 壳层与面板注册

### 3.1 `modules/app/popup-shell.js`：真实工作区壳层

当前单弹窗工作区的真实壳层是 `popup-shell.js`，它负责：

- 创建与关闭弹窗
- 拖动与基础交互
- 主导航渲染
- 子导航渲染
- 当前 main tab / sub tab 状态维护
- 动态 custom tool 子页签切换
- 当前面板刷新
- 与事件总线联动后的局部更新

关键点：

- 它依赖 `tool-registry.js` 输出的导航结构
- `resolveActiveSubTabId()` 决定实际激活的子页签
- `refreshCurrentPanel()` 是当前面板重渲染入口

所以当前 UI 路由中心是：

- `popup-shell.js + tool-registry.js`

而不是 `ui-manager.js`。

### 3.2 `modules/ui/index.js`：面板注册入口

`modules/ui/index.js` 负责：

- 导出 UI 工具与组件
- 将各主面板注册到 `uiManager`
- 初始化 `uiManager`
- 提供面板渲染辅助能力

当前注册的主面板包括：

- API preset
- regex extract
- tool manage
- summary tool
- status block
- youyou review
- escape/punctuation transform
- bypass
- settings
- tableWorkbench
- LoggerPanel（日志面板，带级别过滤、搜索、暂停/恢复、导出与自动滚动）

### 3.3 `modules/ui/ui-manager.js`：生命周期与样式层

`ui-manager.js` 当前主要负责：

- 组件注册/注销
- 组件 render / destroy
- 样式聚合与注入
- 兼容层状态保留

需要特别记住：

- 它不是 popup shell 的主路由器
- 其中的 `currentTab` / `currentSubTab` 只是兼容层查询残留，不是当前主路由事实来源

### 3.4 `tool-config-panel-factory.js`：共享工具面板工厂

`modules/ui/components/tool-config-panel-factory.js` 是 built-in tool 与动态自定义工具面板的共享工厂，统一了：

- 面板壳样式
- 配置保存入口
- 手动执行入口 `runToolManually()`
- 提取预览入口 `previewToolExtraction()`
- preset / bypass / worldbook 等通用表单逻辑

因此，很多工具面板表现一致，不是因为各自复制实现，而是因为它们复用了同一面板工厂。

### 3.5 `modules/ui/components/logger-panel.js`：日志面板

`LoggerPanel` 是独立的运行时日志查看面板，提供：

- 级别过滤（DEBUG / INFO / WARN / ERROR）
- 关键字搜索
- 暂停 / 恢复实时流
- 日志清除与导出
- 自动滚动

它由 `modules/ui/index.js` 懒加载注册，在 `tool-registry.js` 中以 `component: 'LoggerPanel'` 挂载为工具页签。

## 4. 工具定义层与运行时层

### 4.1 `modules/tool-manager.js`：定义层

`tool-manager.js` 处理的是"工具定义如何被保存与标准化"，重点包括：

- 自定义工具定义结构
- schema 归一化
- automation/worldbooks/context/messages 等字段归一化
- `promptTemplate` 推导
- 导入 / 导出 / 持久化

如果问题是：

- 自定义工具怎么存
- 导入导出怎么做
- schema 怎么兼容

优先看这里。

### 4.2 `modules/tool-registry.js`：运行时模型层

`tool-registry.js` 处理的是"工具在 UI 与执行链里最终长什么样"，重点包括：

- 合并 built-in 与 custom 工具
- 规范化运行时 `output` / `automation` / `extraction` / `runtime`
- 保存最近执行状态、失败阶段、写回状态与槽位诊断
- 输出 popup shell 直接可消费的导航结构

如果问题是：

- 工具页签为什么这么显示
- 运行态诊断字段怎么来
- UI / 执行链实际读到的配置是什么

优先看这里。

### 4.3 一个实用判断原则

- 改"定义怎么存" -> `tool-manager.js`
- 改"运行时怎么用、UI 怎么看见" -> `tool-registry.js`

这两层不要混写，否则会把定义层和运行态层耦在一起。

## 5. 手动执行链

### 5.1 `modules/tool-trigger.js`：手动入口

当前 `tool-trigger.js` 的核心职责已经收口为：

- `runToolManually(toolId)`
- `previewToolExtraction(toolId)`
- 构建最新 assistant 执行上下文
- 决定手动执行路径
- 回填运行态诊断字段

它不再是旧意义上的自动触发中心。

### 5.2 手动执行前会先做什么

手动执行不会直接拿"当前消息全文"硬跑，而是先通过 `modules/tool-execution-context.js`：

- 解析目标 assistant 楼层
- 归一化 messageId / swipeId / chatId
- 生成槽位身份键
- 剥离已知工具写回块
- 构建统一 execution context

### 5.3 当前手动路径

`resolveExecutionPath()` 将手动执行分成三条命名路径：

- `manual_post_response_api`
- `manual_local_transform`
- `manual_compatibility`

实际调度时 `executeToolByResolvedPath()` 会在加载 compatibility 模块之前拦截 `follow_ai`：

- `post_response_api` -> `runToolPostResponse()`
- `follow_ai` -> `runToolFollowAiManual()`（`resolveExecutionPath()` 返回 `manual_compatibility`，但在分发时被拦截，不会落入旧 executor）
- `local_transform` 或存在 `processor.type` -> `tool-local-transform-service.js` -> `injectDetailed()`
- 其他旧路径 -> 回退到 `tool-executor.js`

因此：

- `follow_ai` 在路径枚举中归类为 `manual_compatibility`，但实际执行走独立 `runToolFollowAiManual()` 链
- 不能再把 `follow_ai` 描述成"只是占位配置"
- `tool-local-transform-service.js`（`modules/tool-local-transform-service.js`）是本地 transform 的具体工厂模块

### 5.4 本地 transform 的边界

`local_transform` 虽然不额外请求 API，但并不是脱离主线的旁路。

它仍然会：

- 基于提取快照得到目标文本
- 在本地完成 transform（由 `modules/tool-local-transform-service.js` 提供 escape / punctuation 等变换）
- 通过 `context-injector.injectDetailed()` 写回 assistant 槽位

因此它仍共享：

- execution context
- slot identity
- writeback
- refresh 确认

## 6. 自动执行链

### 6.1 `modules/tool-automation-service.js`：唯一自动入口

当前自动执行唯一主入口是 `tool-automation-service.js`，负责：

- 绑定宿主消息事件
- 统一事件名到 `UPPER_SNAKE_CASE`
- 提取 message identity
- 对 same-slot 事件做 fallback 目标解析
- 调度 assistant 消息处理
- 维护 slot dedup 状态与 own-write 黑名单
- 记录 transaction history 与 host binding 状态

当前监听的事件：

- `MESSAGE_RECEIVED`（主触发，leading-edge 3s 节流）
- `MESSAGE_SENT`（用户发送消息时清理所有 pending 定时器）
- `MESSAGE_DELETED`（清理被删除消息的关联状态）
- `CHAT_CHANGED`（teardown / rebuild 当前聊天绑定）
- `GENERATION_STOPPED`（取消所有活跃事务，清除定时器，重置 `_isProcessing`）

以下事件已在 1.0.111 重写后移除，不再作为自动触发源：`GENERATION_ENDED`、`MESSAGE_SWIPED`、`GENERATION_AFTER_COMMANDS`。

### 6.2 slot-based dedup 是核心设计

自动链当前不是"收到事件就盲跑"，而是基于槽位身份的去重模型：

- 用 `messageId::swipeId` 作为槽位键区分不同 generation（不是 `messageId + contentHash`）
- 模块级 `_isProcessing` 互斥锁保证同一时刻只有一次执行
- `_ownWriteMessageIds` Map（key = messageId, value = 写入时间戳），TTL 5000ms，防止工具写回触发的消息事件再次激活自动链（避免自触发循环）
- `_recentlyProcessedSlots` Map 记录近期已处理的槽位键（TTL 由 `dedupeWindowMs` 控制，默认约 1400ms），替代旧的 `_completedGenerationKeys`
- 取消路径：`GENERATION_STOPPED` 事件 → `controller.abort()` 中止所有活跃事务 → 清除 pending 定时器 → 重置 `_isProcessing`

当前事务阶段包括：

- `received`
- `confirmed`
- `context_built`
- `request_started`
- `request_finished`
- `writeback_started`
- `writeback_committed`
- `refresh_confirmed`
- `skipped`
- `failed`

### 6.3 自动链当前做什么

自动链当前主线行为是：

1. 根据自动化设置判断是否启用
2. 构建指定 assistant 消息的 execution context
3. 筛选 `automation.enabled === true` 的自动工具
4. 执行符合条件的 `post_response_api` 工具
5. 若 `tableWorkbench.autoUpdateEnabled === true` 且 `autoUpdateTrigger === assistantMessage`，在同一 generation 事务内继续执行自动填表
6. 记录事务历史、宿主绑定状态与 table auto 结果

### 6.4 自动链当前不做什么

当前主线自动执行不包括：

- `follow_ai`
- `local_transform`
- `tool-executor.js` compatibility fallback

如果看到旧文档把这些也写成自动主线，应以当前源码为准修正。

### 6.5 `getRuntimeSnapshot()` 的作用

排查自动化问题时，首选观测口是 `getRuntimeSnapshot()`，因为它会暴露：

- `currentChatId`：当前聊天 ID
- `enabled`：自动化是否启用
- `isProcessing`：当前是否有执行链在运行
- `pendingTimerCount`：等待中的定时器数量
- `queuedSlotCount`：排队中的槽位数量
- `recentlyProcessedSlotCount`：近期已处理槽位数量
- `ownWriteMessageIdCount`：当前 own-write 黑名单条目数量
- `activeTransactionCount`：活跃事务数量
- `recentTransactions`：最近 10 条事务快照
- `hostBinding`：宿主事件绑定状态与绑定的事件列表
- `settings`：当前自动化设置（`enabled` / `settleMs` / `dedupeWindowMs`）

它适合回答：

- 自动化到底开没开
- 事件绑定成功没
- 最近事务卡在哪个阶段
- 当前是否仍有同槽位串行队列未清

## 7. 写回与刷新确认

### 7.1 统一执行上下文先解决"写到哪"

`modules/tool-execution-context.js` 的重要作用不是单纯拼装上下文，而是先明确：

- 当前要写回哪个 assistant 槽位
- 这个槽位当前是哪一个内容版本
- 这次执行属于哪一个事务

三个关键键：

- `slotBindingKey = chatId::messageId`
- `slotRevisionKey = slotBindingKey::effectiveSwipeId::assistantContentFingerprint`
- `slotTransactionId = slotRevisionKey::eventType::traceId`

它们直接影响：

- 自动 dedupe
- reroll/swipe 区分
- 写回目标绑定
- refresh 确认诊断

### 7.2 `assistantBaseText`：减少写回污染

执行上下文构建时，会先从 assistant 原文中剥离已知工具写回块，得到：

- `assistantBaseText`
- `assistantBaseFingerprint`

这一步的意义是：

- 避免把旧工具块再次当作提取输入
- 减少重复提取与重复写回污染
- 让同一 assistant 楼层的内容版本判断更稳定

### 7.3 `tool-output-service.js`：执行主链

`tool-output-service.js` 负责：

- 判断是否应走某种输出模式
- 构建最近消息提取条目
- 组装请求消息
- 发送 API 请求
- 提取输出文本
- 组织写回元信息
- 调用 `context-injector.injectDetailed()`

当前 `post_response_api` 与 `follow_ai` 都经过它。

### 7.4 `context-injector.js`：真正的写回边界

`context-injector.js` 负责：

- 创建注入条目
- 发出 `TOOL_CONTEXT_INJECTED` 事件
- 把工具输出写入绑定 assistant 槽位
- 记录 source message / swipe / slot identity
- 返回分层写回结果

所以当用户反馈"执行成功但没看到写回"时，不能只看模型有没有返回字，还要看：

- source message 绑没绑对
- host commit 是否真正应用
- refresh 是否请求
- refresh 是否确认

### 7.5 常见诊断字段

执行结果里的这些字段很关键：

- `writebackStatus`
- `failureStage`
- `writebackDetails`
- `phases`
- `slotBindingKey`
- `slotRevisionKey`
- `slotTransactionId`

它们比单纯的 success / error 更能说明到底卡在：

- 构建消息
- 发送请求
- 提取输出
- 注入写回
- refresh 确认

## 8. tableWorkbench / table domain 的当前定位

当前 tableWorkbench 是一个独立的 table domain 工作台，有自己的模块层级和 UI 结构。

### 8.1 资产类型

tableWorkbench 管理两类非 live-state 资产：

- **模板资产**（template assets）：可复用的表格结构模板
- **聊天 guide**（chat guide）：与当前聊天绑定的填表引导

独立提示词预设层已在 1.0.103 移除。AI 指令预设现通过 bypass-manager 绑定。

### 8.2 table engine 模块映射

- `table-schema-service.js` — 配置/运行时入口，表格 schema 解析与归一化
- `table-update-service.js` — 手动与自动填表执行
- `table-state-service.js` — 绑定状态与模板加载
- `table-target-resolver.js` — 目标消息解析
- `table-history-service.js` — 5 级 cascade 重建
- `table-diff-service.js` — diff 计算
- `table-writeback-service.js` — 结构化写回提交
- `table-lock-service.js` — 单元格/行/列锁定
- `table-scope-service.js` — runScope 执行域约束
- `table-guide-service.js` — 聊天 guide 管理
- `table-template-service.js` — 模板资产管理
- `table-types.js` — 共享类型与工具函数
- `table-json-sanitizer.js` — AI 响应解析与清洗
- `table-worldbook-sync-service.js` — worldbook 同步，将填表结果同步到世界书条目
- `table-provider-service.js` — 表数据提供层

### 8.3 UI 结构

- **主控制台**：运行开关、自动更新、AI 绑定、上下文配置、模板入口、手动运行、表格概览
- **单表配置抽屉**：各表的详细配置（不再是 config / runtime / preview 三视图）

### 8.4 runScope

runScope 支持三个值：`current` / `selected` / `all`。

- prompt 会告知 AI 哪些表可编辑、哪些只读
- parse 层在写回前执行 scope 约束检查

### 8.5 上下文增强

填表请求支持以下上下文字段：

- `contextDepth`
- `contextRoles`
- `contextExtractTags`
- `contextUseGlobalRules`
- `worldbooks`
- `sendLatestRows`

### 8.6 worldbookSync 配置层

`table-schema-service.js` 为每张表维护 `worldbookSync` 配置：

- `worldbookSync.enabled`：是否启用同步
- `worldbookSync.targetBook`：目标世界书标识
- `worldbookSync.entryComment`：同步条目注释

`table-writeback-service.js` 在写回时调用 `table-worldbook-sync-service.js` 的 `syncTablesToWorldbook()` 执行实际同步。UI 层在 `table-workbench-panel.js` 中提供对应的表单控件。

### 8.7 运行时隔离与写回

- **聊天隔离**：`CHAT_CHANGED` 事件触发各面板的 live 缓存清除
- **实时行显示**：`mergeLiveRowsIntoConfig` 检查实际行数据是否存在后再合并
- **写回**：通过 `TavernHelper.setChatMessages` 提交，自动化写回使用 `skipNotify`

### 8.8 定位约束

tableWorkbench 是主 execution / writeback 架构中的一个 domain，不是独立的状态机，也不是绕过 revision-safe / writeback-safe 设计的旁路系统。

## 9. 共享基础设施层（`modules/core/`）

`modules/core/` 提供所有主线模块共用的基础设施：

### 9.1 模块清单

- `modules/core/event-bus.js` — 跨模块发布/订阅事件总线，导出 `EVENTS` 常量（43 种事件类型，覆盖 storage / preset / API / tool / UI / app / settings / context injection / bypass / output mode change 等类别）
- `modules/core/storage-service.js` — 首选存储抽象层（新代码应优先使用，而非 `modules/storage.js`）
- `modules/core/settings-service.js` — 缓存式全局设置（自动化 / 调试 / UI 设置等）
- `modules/core/logger-service.js` — 带 scope / level / ring buffer 的日志服务
- `modules/core/index.js` — 统一 re-export 入口

### 9.2 使用原则

- 新增持久化逻辑优先使用 `modules/core/storage-service.js`，而非兼容层 `modules/storage.js`
- 跨模块事件通信通过 `event-bus.js` 的 `EVENTS` 常量引用事件名，避免硬编码字符串
- 日志输出优先通过 `logger-service.js` 的 scoped logger，便于 `LoggerPanel` 聚合展示

## 10. compatibility 模块与非主线路径

仓库里仍保留一些旧名或兼容模块，例如：

- `modules/tool-executor.js`
- `modules/ui-components.js`
- `modules/prompt-editor.js`
- `modules/storage.js`
- `inline` 旧模式名

它们的存在不等于它们是当前优先入口。

当前更准确的理解是：

- 主线启动与宿主门面：`modules/app/*`
- 主线 UI：`popup-shell.js + ui/index.js + ui-manager.js + tool-config-panel-factory.js + logger-panel.js`
- 主线工具模型：`tool-manager.js + tool-registry.js`
- 主线上下文与执行：`tool-execution-context.js + tool-trigger.js + tool-automation-service.js + tool-output-service.js + tool-local-transform-service.js`
- 主线写回：`context-injector.js`
- 主线基础设施：`modules/core/*`（event-bus / storage-service / settings-service / logger-service）
- 旧执行回退与历史兼容残留：`tool-executor.js`、`storage.js`、`inline` 旧模式名等

其中 `ui-components.js` / `prompt-editor.js` 这组 UI compatibility seam 已从 public API 中收口（`public-api.js` 不再暴露），但需注意 `prompt-editor.js` 仍被 `popup-shell.js` 直接导入并用于 prompts 子页签渲染，因此它仍在 popup 主 UI 路径上。

维护时不要因为文件名旧，就默认它仍在主链上。

## 11. 推荐排查顺序

### 11.1 启动类问题

先看：

- `index.js`
- `modules/app/bootstrap.js`

适用场景：

- 模块没加载
- 菜单没注册
- 初始化后 API 不可用
- 主题/样式未注入

### 11.2 弹窗与导航问题

先看：

- `modules/app/popup-shell.js`
- `modules/tool-registry.js`

适用场景：

- tab / subtab 异常
- 动态工具页签不对
- 当前面板刷新不对

### 11.3 工具定义或工具配置问题

先分清：

- `tool-manager.js`：定义层与持久化
- `tool-registry.js`：运行时模型与 UI 显示

### 11.4 手动执行问题

先看：

- `modules/tool-trigger.js`
- `modules/tool-output-service.js`
- `modules/tool-local-transform-service.js`
- `modules/context-injector.js`

### 11.5 自动执行问题

先看：

- `modules/tool-automation-service.js`
- `modules/tool-execution-context.js`
- `modules/table-engine/table-update-service.js`
- `getAutomationRuntime()` 输出

### 11.6 写回问题

先看：

- `modules/context-injector.js`
- 相关 `writebackDetails`
- `refreshConfirmed` / commit 结果

### 11.7 UI 面板渲染问题

先看：

- `modules/ui/index.js`
- `modules/ui/ui-manager.js`
- `modules/ui/components/tool-config-panel-factory.js`
- `modules/ui/components/logger-panel.js`

### 11.8 tableWorkbench 问题

先看对应 table engine 模块：

- `modules/table-engine/table-schema-service.js` — 配置解析与 schema 问题
- `modules/table-engine/table-scope-service.js` — runScope 约束问题
- `modules/table-engine/table-update-service.js` — 执行与填表问题
- `modules/table-engine/table-state-service.js` — 绑定状态与模板加载问题
- `modules/table-engine/table-worldbook-sync-service.js` — 世界书同步问题

再回看是否触碰了：

- execution context
- slot identity
- writeback 边界

## 12. 给后续维护者的简短原则

1. 先判断问题属于启动、UI、定义层、运行时层、手动链、自动链还是写回链。
2. 不要把 `index.js` 重新变胖。
3. 不要把 `ui-manager.js` 当成当前主路由器。
4. 不要把 `tool-trigger.js` 再写回旧自动触发中心。
5. 不要混淆 `tool-manager.js` 和 `tool-registry.js` 的职责。
6. 不要随意简化 message identity、swipe、content fingerprint、slot key 与 refresh 确认逻辑。
7. 当旧文档与源码冲突时，先信源码，再回写文档。

## 13. 结论

当前仓库已经形成一条相对清晰的现代主线：

- 启动由薄入口 + bootstrap 负责
- UI 由 popup shell 与面板注册体系负责
- 工具配置被拆成定义层与运行时层
- 手动链与自动链共享统一 execution context
- 自动执行依赖 generation-aware 事务模型
- 额外请求、写回与 refresh 确认构成稳定输出主链
- compatibility 模块被保留，但不再应被误认成主线
- 共享基础设施层（`modules/core/`）为所有模块提供事件、存储、设置与日志能力

后续维护如果始终围绕这条主线进行，而不是回到旧 trigger 口径或旧命名直觉，仓库的可维护性会稳定得多。
