# 架构分析

本文档基于当前 `1.0.91` 源码，对仓库主线结构、分层边界与主要执行链做一次源码对齐后的整理。

结论先行：当前仓库已经不是“旧 trigger 管理器驱动的一组散模块”，而是围绕薄入口、bootstrap 装配、popup shell、运行时 tool registry、统一 execution context、自动化事务服务与写回链组织起来的一条主线。

## 1. 当前主线结论

当前代码最重要的结构事实是：

1. `index.js` 仍是薄入口，只负责创建共享上下文、装配壳层并立即启动。
2. `modules/app/bootstrap.js` 是启动装配中心，负责模块加载、样式注入、菜单入口与自动化初始化。
3. `modules/app/popup-shell.js` 是单弹窗工作区的真实 UI 壳层与路由器，不是 `ui-manager.js`。
4. `modules/tool-registry.js` 与 `modules/tool-manager.js` 已形成“运行时模型层 / 定义层”分层。
5. `modules/tool-execution-context.js` 是手动链与自动链共用的 assistant 槽位上下文构建层。
6. `modules/tool-automation-service.js` 是自动执行唯一入口，基于 generation-aware 事务模型处理宿主消息事件。
7. `modules/tool-trigger.js` 现在主要负责手动执行与提取预览入口。
8. `post_response_api` 与 `follow_ai` 的主执行/写回链集中在 `tool-output-service.js -> tool-prompt-service.js -> api-connection.js -> context-injector.js`。
9. `modules/tool-executor.js` 仍在并承担旧执行回退；而 `ui-components.js` / `prompt-editor.js` 这组 UI compatibility seam 已从 popup 主路径与 public API 中收口，不应再被当成当前主线入口。

## 2. 启动层与应用装配

### 2.1 `index.js`：薄入口

`index.js` 当前只做几件事：

- 创建 `appContext`
- 挂入常量、模块引用缓存、服务引用与 UI 状态
- 创建 `popupShell`
- 创建 `bootstrap`
- 创建 `publicApi`
- 暴露 `window.YouYouToolkit`
- 立即调用 `bootstrap.init()`

这意味着：
- 不应继续把业务逻辑堆回 `index.js`
- 启动、UI、公开 API 的修改应分别落到 `modules/app/bootstrap.js`、`modules/app/popup-shell.js`、`modules/app/public-api.js`

### 2.2 `modules/app/bootstrap.js`：启动与模块装配中心

`bootstrap.js` 的职责包括：

- `loadModules()`：加载当前主线模块
- 注入基础样式与主题变量
- 初始化 UI 模块
- 注册菜单入口
- 初始化自动化服务

当前 `loadModules()` 会装配的主线模块包括：

- `storage.js`
- `api-connection.js`
- `preset-manager.js`
- `ui/index.js`
- `regex-extractor.js`
- `tool-manager.js`
- `tool-executor.js`
- `window-manager.js`
- `tool-registry.js`
- `core/settings-service.js`
- `bypass-manager.js`
- `variable-resolver.js`
- `context-injector.js`
- `tool-prompt-service.js`
- `tool-output-service.js`
- `tool-automation-service.js`

同时它还会在模块加载完成后，把 `toolOutputService` 与 `api-connection` 绑定起来。

### 2.3 `modules/app/public-api.js`：宿主侧门面

`public-api.js` 负责对外暴露当前运行时门面，主要分为四类：

- UI 控制：`openPopup()` / `closePopup()` / tab 切换
- API / preset 访问：`getApiConfig()` / `saveApiConfig()` / `sendApiRequest()` / `getPresets()`
- 模块 getter：`getToolRegistry()` / `getToolOutputService()` / `getToolAutomationService()` 等
- 自动化控制：`startAutomation()` / `stopAutomation()` / `getAutomationRuntime()` / `processCurrentAssistantMessage()`

这里是判断“哪些能力真的是宿主可用公开接口”的第一事实来源。

## 3. UI 壳层与组件层分工

### 3.1 `modules/app/popup-shell.js`：真实 UI 壳层

当前单弹窗工作区主要由 `popup-shell.js` 负责，它处理：

- 弹窗创建、关闭与拖动
- 主导航渲染
- 子导航渲染
- 当前 main tab / sub tab 状态维护
- 动态 custom tool 子页签切换
- 面板内容区域刷新
- 与事件总线联动后的局部刷新

关键点：
- `popup-shell.js` 以 `tool-registry.js` 作为导航数据来源
- `resolveActiveSubTabId()` 会根据运行时工具配置决定实际激活的子页签
- `refreshCurrentPanel()` 才是真正驱动当前面板重渲染的壳层入口

因此，当前 UI 路由中心不是 `ui-manager.js`，而是 `popup-shell.js + tool-registry.js` 这对组合。

### 3.2 `modules/ui/index.js`：面板注册入口

`ui/index.js` 的职责是：

- 导出 UI 工具与组件
- 调用 `registerComponents()` 把面板注册到 `uiManager`
- 提供便捷渲染函数
- 初始化 `uiManager`

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

### 3.3 `modules/ui/ui-manager.js`：组件生命周期，不是主路由

`ui-manager.js` 当前负责：

- 组件注册/注销
- 组件 render / destroy
- 样式聚合与注入
- 兼容层 tab/subtab 状态保留

它本身并不负责 popup shell 的主路由决策。文件注释里也已明确：`currentTab` / `currentSubTab` 仅保留给兼容层查询，不再作为 popup shell 主路由源。

### 3.4 `modules/ui/components/tool-config-panel-factory.js`：共享配置面板工厂

这个工厂是 built-in tool 与动态工具面板复用的重要基础，主要统一：

- 工具面板壳样式
- 配置保存入口
- 手动执行入口 `runToolManually()`
- 提取预览入口 `previewToolExtraction()`
- preset / bypass / worldbook 等通用表单逻辑

这意味着工具页的“配置面板长得像什么、怎么触发手动执行、怎么做提取预览”并不是各个工具独立复制实现，而是大量复用这里的公共工厂。

## 4. 工具定义层与运行时层

### 4.1 `modules/tool-manager.js`：定义层

`tool-manager.js` 负责用户可管理工具定义本身，重点在：

- 自定义工具定义结构
- schema 归一化
- automation/worldbooks/context/messages 等定义层字段归一化
- promptTemplate 推导
- 导入 / 导出 / 持久化

它处理的是“工具定义长什么样，如何存，如何标准化”。

### 4.2 `modules/tool-registry.js`：运行时层

`tool-registry.js` 负责把内置工具与自定义工具合并成 UI 与执行链真正使用的运行时模型，重点在：

- 合并 built-in 与 custom 工具
- 规范化运行时 `output` / `automation` / `extraction` / `runtime`
- 保存最近执行状态、失败阶段、写回状态、slot/source 诊断信息
- 输出 popup shell 直接可消费的导航结构

一个实用判断标准是：
- 要改“用户工具定义怎么存”，看 `tool-manager.js`
- 要改“工具在 UI 和执行链里长什么样”，看 `tool-registry.js`

### 4.3 当前 runtime 字段的意义

`tool-registry.js` 当前 runtime 已经明显偏向执行诊断，而不是旧 trigger 状态残留。它重点维护：

- 最近执行状态
- 最近错误
- 最近耗时
- 最近执行路径
- 最近写回状态
- `slotBindingKey` / `slotRevisionKey` / `slotTransactionId`
- `sourceMessageId` / `sourceSwipeId`
- refresh 请求与确认结果
- auto run 的最近状态

这也是当前 UI 诊断信息和问题排查的主要来源之一。

## 5. 执行上下文与槽位身份模型

### 5.1 `modules/tool-execution-context.js` 的角色

`tool-execution-context.js` 当前是手动链与自动链共享的上下文层，它负责：

- 读取宿主聊天消息
- 归一化 role / messageId / swipeId
- 构建 conversation snapshot
- 找到目标 assistant 楼层
- 去除已写回工具块，得到 `assistantBaseText`
- 生成内容 fingerprint
- 生成执行上下文对象

### 5.2 三个关键槽位键

当前最重要的三个身份键是：

- `slotBindingKey = chatId::messageId`
- `slotRevisionKey = slotBindingKey::effectiveSwipeId::assistantContentFingerprint`
- `slotTransactionId = slotRevisionKey::eventType::traceId`

它们的语义分别是：

- `slotBindingKey`：同一个 assistant 槽位
- `slotRevisionKey`：同一个槽位下的具体内容版本
- `slotTransactionId`：一次具体执行事务

这三个键不仅用于日志，也直接影响：

- 自动化 dedupe
- reroll/swipe 区分
- 写回目标绑定
- refresh 确认诊断

### 5.3 `assistantBaseText` 的重要性

执行上下文会先调用 `stripKnownToolBlocks()` 从 assistant 原文里剥离已知工具写回块，再生成 `assistantBaseText` 和 `assistantBaseFingerprint`。

这一步很关键，因为主线不是简单把“当前消息全文”当作输入，而是尽量围绕“去掉旧工具块后的原始 assistant 内容”工作，以减少重复提取和写回污染。

## 6. 手动执行链

### 6.1 `modules/tool-trigger.js` 的真实职责

当前 `tool-trigger.js` 已不再承担旧自动触发监听器角色，而是：

- 读取工具完整配置
- 构建最新 assistant 上下文
- 决定手动执行路径
- 执行手动工具
- 提供提取预览
- 将结果写入 runtime 诊断字段

### 6.2 当前手动执行路径分层

`resolveExecutionPath()` 目前会把手动执行分成三条路径：

- `manual_post_response_api`
- `manual_local_transform`
- `manual_compatibility`

实际调度上还包含一个重要分支：
- 若 `tool.output.mode === post_response_api`，走 `runToolPostResponse()`
- 若 `tool.output.mode === follow_ai`，走 `runToolFollowAiManual()`
- 若 `tool.output.mode === local_transform` 或存在 `processor.type`，走本地 transform
- 其他情况再落入 compatibility 模块 `tool-executor.js`

因此“manual_compatibility”不是唯一的非 `post_response_api` 分支；`follow_ai` 现在也有明确的正式手动执行链。

### 6.3 本地 transform 的位置

本地 transform 并不是脱离主线的旁路。它虽然不请求额外 API，但仍会：

- 基于提取快照获得目标文本
- 在本地完成 transform
- 通过 `context-injector.injectDetailed()` 写回 assistant 槽位

所以它仍共享 slot identity / writeback / refresh 这一整套边界。

## 7. 自动执行链

### 7.1 `modules/tool-automation-service.js`：唯一自动入口

当前自动执行唯一主入口是 `tool-automation-service.js`。它负责：

- 绑定宿主 `MESSAGE_RECEIVED` / `MESSAGE_SWIPED` / `GENERATION_AFTER_COMMANDS` / `GENERATION_ENDED` / `CHAT_CHANGED` / `MESSAGE_DELETED`
- 把事件名统一归一化成 `UPPER_SNAKE_CASE`
- 从事件参数提取 message identity
- 对 same-slot 事件做 fallback 目标解析
- 调度 assistant 消息处理
- 维护 slot queue 与 completed generation keys
- 输出 transaction history 与 host binding 状态

### 7.2 generation-aware 事务模型

这个服务当前最重要的设计是 generation-aware：

- 使用 `messageId + contentHash` 区分 generation
- 同一楼层 reroll/swipe 产生新内容时，不把它误认成旧事务
- 同一槽位内维持串行化
- 通过 `Transaction` 对象跟踪 phase、verdict、error、toolResults、writebackState、refreshState

事务阶段当前包含：

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

### 7.3 自动链做什么，不做什么

当前自动链会：

- 基于自动化设置判断是否启用
- 构建指定 assistant 消息的 execution context
- 筛选 `automation.enabled === true` 的自动工具
- 只执行符合条件的 `post_response_api` 工具
- 记录事务历史和宿主绑定状态

当前自动链不会把以下路径当成主线自动执行：

- `follow_ai`
- `local_transform`
- `tool-executor.js` compatibility fallback

### 7.4 运行时快照的价值

`getRuntimeSnapshot()` 当前会暴露：

- 当前 chatId
- enabled 状态
- pending timer / slot queue / completed generation key 统计
- 最近事务快照
- host event binding 状态
- 当前自动化设置

这使它成为排查“为什么自动化没跑”“宿主事件到底绑上没”“最近事务卡在哪个阶段”的首选观测窗口。

## 8. 输出链与写回链

### 8.1 `modules/tool-output-service.js`：执行主链

`tool-output-service.js` 当前是 `post_response_api` 与 `follow_ai` 的直接执行层，负责：

- 判断工具是否应走某种输出模式
- 构建最近消息提取条目
- 组装请求消息
- 发送 API 请求
- 提取结果文本
- 组织写回元信息
- 调用 `contextInjector.injectDetailed()`
- 返回阶段化 `meta`

### 8.2 当前输出模式的真实含义

当前支持的主要模式有：

- `post_response_api`
- `follow_ai`
- `local_transform`
- compatibility fallback

其中：
- `post_response_api`：手动与自动主线都支持
- `follow_ai`：当前主要用于手动执行，仍会额外构建消息、请求 API、再写回
- `local_transform`：纯本地变换后写回
- `inline`：旧别名，映射到 `follow_ai`

因此，不应再把 `follow_ai` 简化为“只是跟随 AI，不走执行链”的旧口径。

### 8.3 `modules/context-injector.js`：写回边界

`context-injector.js` 负责：

- 创建注入条目
- 发送 `TOOL_CONTEXT_INJECTED` 事件
- 把工具输出写入绑定 assistant 槽位
- 记录 source message / swipe / slot identity
- 返回分层写回结果

当前它强调的是“写回 assistant 绑定槽位并确认 refresh”，而不是简单拼接一段文本。

因此当执行成功但用户看不到结果时，真正要看的通常不是“模型有没有返回字”，而是：

- source message 绑没绑对
- host commit 是否应用
- refresh 是否请求
- refresh 是否确认

## 9. tableWorkbench 的当前定位

当前 tableWorkbench 已经不是早期的 JSON-only textarea 试验区，而是一个独立顶级页签与 table domain 工作台。

从现有结构看，它至少已经具备：

- 独立顶级导航位置
- 面向表定义的结构化编辑入口
- draft 到 runtime tables 的编译/校验链
- 手动执行入口
- target resolve 与 bound state 相关能力
- `config / runtime / preview` 三视图工作台壳层

但它仍应被理解为：

- 当前主 execution / writeback 架构上的一个 domain
- 在现有稳定边界上推进 authoring UX 的工作台

而不应被理解为：

- 一套独立于主线之外的新状态机
- 可以绕开现有 revision-safe / writeback-safe 设计的旁路系统

更细的模块化优化方案与 UI / authoring / runtime / template / automation 分层口径，见：
- `docs/TABLE_WORKBENCH_IMPLEMENTATION_DRAFT.md`
- `docs/TABLE_WORKBENCH_STATUS_SUMMARY.md`

当前更准确的 UI 演进方向是：
- 保留顶层 `config / runtime / preview` 三视图
- 在 `config` 内部向 visualizer MVP 推进
- 吸收参考项目里的“当前对象焦点 + 主辅分区 + 渐进展开”，而不是把 tableWorkbench 重写成独立状态机

## 10. compatibility 与非主线路径

当前仓库里仍有一些容易误导的旧名或兼容模块：

- `modules/tool-executor.js`
- `modules/ui-components.js`
- `modules/prompt-editor.js`
- `modules/storage.js`
- `inline` 旧模式名

这些对象的存在不等于它们仍是当前优先入口。

当前更准确的理解方式是：

- 主线启动与宿主门面：`modules/app/*`
- 主线 UI：`popup-shell.js + ui/index.js + ui-manager.js + tool-config-panel-factory.js`
- 主线工具模型：`tool-manager.js + tool-registry.js`
- 主线上下文与执行：`tool-execution-context.js + tool-trigger.js + tool-automation-service.js + tool-output-service.js`
- 主线写回：`context-injector.js`
- 旧执行回退与历史兼容残留：`tool-executor.js`、`storage.js`、`inline` 旧模式名等

其中 `ui-components.js` / `prompt-editor.js` 这组 UI compatibility seam 虽然仍可在仓库中看到文件名，但已不再是 popup 主路径或 public API 的当前依赖。 

## 11. 建议的排查顺序

如果后续继续维护这套架构，建议按以下顺序排查问题：

1. 启动问题：先看 `index.js`、`modules/app/bootstrap.js`
2. 弹窗/路由问题：看 `modules/app/popup-shell.js` 与 `modules/tool-registry.js`
3. 工具配置或动态工具页签问题：先分清是 `tool-manager.js` 还是 `tool-registry.js`
4. 手动执行问题：看 `modules/tool-trigger.js` -> `modules/tool-output-service.js`
5. 自动执行问题：看 `modules/tool-automation-service.js` -> `modules/tool-execution-context.js`
6. 写回问题：看 `modules/context-injector.js`
7. UI 面板渲染问题：看 `modules/ui/index.js`、`modules/ui/ui-manager.js`、`modules/ui/components/tool-config-panel-factory.js`
8. tableWorkbench 问题：在 table domain 模块基础上，再回看是否触碰了 execution context / writeback 边界

## 12. 结论

当前仓库的维护重点，不应再放在“旧 trigger 名称怎么理解”或“tableWorkbench 是否只是配置编辑器”这类历史包袱上，而应聚焦于：

- 薄入口 + bootstrap + popup shell 的应用层骨架
- tool definition 与 runtime model 的清晰分层
- 基于 slot identity 的统一执行上下文
- generation-aware 的自动化事务模型
- 输出链与写回链的可诊断性
- compatibility 模块与主线路径的边界清晰化

如果后续文档、注释或讨论仍把旧 trigger 口径、旧 inline 语义、旧 JSON-only tableWorkbench 写成当前事实，应以当前源码主链为准并及时修正。
