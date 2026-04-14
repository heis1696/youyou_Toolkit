# 填表工作台施工草案

## 文档目的

本文档不再把 `tableWorkbench` 只当成“待实现方案”，而是作为当前 **已落地状态文档** 使用。

如果只想快速了解当前阶段、已完成范围、待优化项与未完成内容，可先看：
- `docs/TABLE_WORKBENCH_STATUS_SUMMARY.md`

它要回答四件事：

1. 现在已经做到了什么。
2. 当前实现依赖哪些既有主链与约束。
3. 目前还缺什么，哪些只是下一阶段的 UX / authoring 缺口。
4. 下一轮如果继续推进，应该从什么事实上继续往下走。

---

## 一、当前结论

当前仓库里的 `tableWorkbench` 已经不是纸面设计，而是已接入主线代码的最小手动填表工作台，并且已经跨过了“必须手写 JSON”这一阶段：

- 它已经是 **独立顶级标签页**，不是 `tools` 下的 subtab。
- 它已经有自己的 table domain 文件组，不再只是 generic tool config 的附属配置。
- 它已经可以执行一条最小手动链：
  - fresh target resolve
  - bound state / template load
  - request build
  - API request
  - tables JSON parse
  - structured state commit
  - optional mirror writeback
- 它当前已经有一套 **结构化表定义编辑器 MVP**：
  - 新增 / 删除表格
  - 编辑表格名与表格说明
  - 新增 / 删除列
  - 新增 / 删除行
  - 内联编辑单元格内容
  - 保存 / 运行前自动编译为 runtime `tables`
- 它当前最大的现实缺口已经不再是“表定义只能手写 JSON”，而是：
  - 结构化编辑器仍是 MVP
  - 还没有进入正式 visualizer / 高级工作台体验阶段

换句话说，当前工作台已经具备：

> **“能不用手写 JSON，完成基础表定义 authoring，并把结构化状态安全写到正确楼层”**

但还没有具备：

> **“正式的表格工作台 / visualizer / 模板体系 / 历史体系 / 完整高级编辑体验”**

---

## 二、必须遵守的基线

`tableWorkbench` 必须继续服从 YouYou Toolkit 当前主线，而不是另起一个独立状态机。

### 2.1 它属于现有事务模型中的一个专用执行域

当前必须复用的主链：

- 手动 / 自动共用上下文：`modules/tool-execution-context.js`
- API 请求链：`modules/tool-prompt-service.js` + `modules/api-connection.js`
- 写回链：`modules/context-injector.js`
- 绑定身份：`slotBindingKey / slotRevisionKey / slotTransactionId / sourceMessageId / sourceSwipeId`

因此，`tableWorkbench` 不是：

- 独立弹窗插件
- 独立消息绑定缓存
- 独立写回目标记忆机制

它是：

- `YouYou Toolkit` 现有 slot transaction 模型里的一个 table domain

### 2.2 当前仍然成立的五条规则

#### 规则 1：执行目标必须每次现算

无论是手动还是未来的自动执行，都必须在本次执行前重新解析目标 assistant 槽位：

- 手动：`buildExecutionContextForLatestAssistant()`
- 自动：`buildExecutionContextForMessage()`

禁止把：

- `lastSuccessfulMessageId`
- “上次成功楼层”
- 旧的 committed target

直接当成下一次执行默认目标。

#### 规则 2：绑定到 revision，而不是只绑定 messageId

同一条 assistant 楼层可能发生 reroll / regenerate / swipe / same-slot replace。

因此执行与写回必须以 `slotRevisionKey` 为内容锚点，而不是只看 `messageId`。

#### 规则 3：失败事务不能推进 committed target

当前仍要区分：

- `lastResolvedTarget`
- `lastCommittedTarget`

失败时可以记录解析到的目标做诊断，但不能把失败事务错误推进为新的 committed target。

#### 规则 4：正文镜像只是 UI 层，不是结构化真相来源

结构化 table state 优先落到目标消息扩展字段：

- `message.YouYouToolkit_tableState`
- `message.YouYouToolkit_tableBindings`

正文镜像只是可见反馈层；需要时才通过 `context-injector` 把内容镜像到 assistant 正文中。

#### 规则 5：编辑器草稿不是执行真相来源

当前可以在 UI 层使用结构化 authoring 视图，但执行主链的 runtime 真相来源仍然是：

- `config.tables`

也就是说：

- 编辑器负责 authoring
- 保存 / 运行前要先 compile 成 `tables`
- `table-update-service.js` 仍只消费编译后的 runtime `tables`

不能把 editor draft 直接塞给执行链，导致主链被 authoring 结构反向污染。

---

## 三、当前已落地的模块

### 3.1 table domain 核心文件

已经存在并承担职责的文件：

- `modules/table-engine/table-types.js`
  - table domain 常量、克隆与 target / bound state 基础结构
- `modules/table-engine/table-target-resolver.js`
  - 从 execution context 解析 revision-aware target snapshot
- `modules/table-engine/table-state-service.js`
  - 读取 / 记录 `tableState` 与 `tableBindings`
  - 提供 `loadBoundStateOrTemplate()`、`recordResolvedTarget()`、`commitBoundState()`
- `modules/table-engine/table-schema-service.js`
  - 当前 workbench 配置、运行时状态、配置校验
  - 负责 editor draft ↔ runtime `tables` 的 derive / compile / validate
- `modules/table-engine/table-update-service.js`
  - 最小手动填表主链：build request / send request / parse patch / 更新 runtime
- `modules/table-engine/table-writeback-service.js`
  - 结构化写回与可选 mirror writeback

### 3.2 UI 与路由文件

已经存在并承担职责的文件：

- `modules/ui/components/table-form-renderer.js`
  - 当前结构化表定义编辑器 MVP
  - 负责 `tableDefinitions` 字段渲染、行列增删、单元格编辑、编译回读
- `modules/ui/components/table-workbench-panel.js`
  - 工作台 UI、诊断区、保存动作、手动执行按钮
  - 负责显示编译后的 `tables` 预览
- `modules/ui/index.js`
  - 注册 `TableWorkbenchPanel`
- `modules/tool-registry.js`
  - 注册顶级 `tableWorkbench` 页签
- `modules/app/popup-shell.js`
  - 顶级 `tableWorkbench` 路由分发

### 3.3 还没有落地的原草案组件 / 体验

以下内容仍属于原草案里提到、但当前**尚未开始或尚未成型**的部分：

- `table-template-service.js`
- `table-automation-adapter.js`
- 真正的 visualizer shell
- 模板预设体系
- 历史 / 导入导出
- 高级 authoring / 可视化工作台体验

这部分不能再被文档误写成“已经接入”。

---

## 四、当前实际入口与执行链

### 4.1 入口位置

当前 `tableWorkbench` 已经是顶级标签页：

- `modules/tool-registry.js`
  - `tableWorkbench` 注册为 `hasSubTabs: false` 的独立页面
- `modules/app/popup-shell.js`
  - `renderTabContent()` 已存在 `case 'tableWorkbench'`
  - 会直接调用 `modules.uiModule.renderTableWorkbenchPanel($content)`

因此当前工作台的导航事实是：

- 独立顶级页
- 与 `tools`、`bypass`、`settings` 同级

而不是早期草案里的：

- `tools` 下的一个 subtab

### 4.2 当前手动执行链

当前已接通的最小手动路径为：

```text
tableWorkbench 顶级页
  -> TableWorkbenchPanel
  -> 结构化 tableDefinitions 编辑器
  -> readTableFormValues()
  -> compileTableDraftToTables()
  -> saveTableWorkbenchConfig()
  -> runManualTableUpdate()
  -> buildExecutionContextForLatestAssistant()
  -> resolveTableTargetFromExecutionContext()
  -> recordResolvedTarget()
  -> loadBoundStateOrTemplate()
  -> buildRequest()
  -> sendApiRequest() / sendWithPreset()
  -> parsePatch()
  -> writeTableState()
  -> commitBoundState() + optional mirror writeback
```

当前已经落地的能力：

- 目标每次 fresh resolve
- 结构化编辑器不再要求用户直接手写 `tables` JSON
- 保存 / 运行前统一编译成 runtime `tables`
- 右侧可实时预览编译结果
- 读取当前绑定 state；若无绑定则回退到 template tables
- 模型输出 JSON 后解析为 `tables`
- 写回前继续走 revision-safe 结构化提交
- 可选将结果镜像到 assistant 正文
- runtime 可记录最近状态、耗时、错误、目标信息、loadMode

---

## 五、当前已完成范围

当前可以认为已经完成的范围是：

### 5.1 最小手动填表 MVP

- 工作台页可打开
- 配置可保存
- 可读取当前 assistant 目标诊断
- 可执行最小手动填表
- 可写入结构化 table state
- 可选正文镜像

### 5.2 结构化表定义编辑器 MVP

- `tables` 已不再以 JSON textarea 作为主 authoring 入口
- 当前可直接在 UI 中：
  - 新增 / 删除表格
  - 编辑表格名 / 表格说明
  - 新增 / 删除列
  - 新增 / 删除行
  - 编辑单元格内容
- 保存 / 运行前会统一 compile 成 runtime `tables`
- 右侧 `tables 预览` 会展示当前编译结果

### 5.3 revision-safe 目标与写回保护

- target snapshot 来自 fresh execution context
- `lastResolvedTarget / lastCommittedTarget` 已分离
- commit 前仍要做当前目标校验
- 不依赖“上次成功楼层”做默认写回目标

### 5.4 页面路由与基础稳定性修正

近期已经实际完成的修正包括：

- `tableWorkbench` 从 `tools` 子页签迁到顶级标签页
- popup shell 对该页的独立路由接线已经完成
- `modules/core/storage-service.js` 中 `namespace` / `namespace()` 同名冲突已修复，避免 workbench 导入链和 UI 模块初始化失败

---

## 六、当前待优化项 / 未完成范围

下列内容现在都还不能写成“已完成”。

### 6.1 表定义编辑器仍未完成到正式版

虽然结构化编辑器 MVP 已落地，但仍未完成：

- 表顺序调整
- 行顺序调整
- 列顺序调整
- 更成熟的单元格编辑交互
- 更丰富的列元信息（如数据类型、约束、说明）
- draft / template / compiled tables 的正式 authoring 层拆分

### 6.2 模板体系

尚未完成：

- 全局模板预设
- 聊天级模板覆盖策略
- 模板导入导出
- 模板版本 / 历史

### 6.3 自动填表接入

尚未完成：

- 自动触发 adapter
- 自动填表门控与事务接线
- 自动失败与手动链的统一 UX 反馈

### 6.4 高级工作台体验

尚未完成：

- visualizer shell
- 历史记录
- 导入 / 导出
- 高级诊断面板
- 大表编辑体验优化

---

## 七、当前已知限制与现实口径

这是当前最重要、也最应该被文档正视的现实问题。

### 7.1 当前已经不是 JSON 主路径，但也还不是正式可视化编辑器

当前源码事实：

- `modules/table-engine/table-schema-service.js`
  - `getTableWorkbenchFormSchema()` 已把 `tables` 切为 `type: 'tableDefinitions'`
  - 新增了 derive / compile / validate 辅助函数
- `modules/ui/components/table-form-renderer.js`
  - 已新增结构化表定义编辑器分支
  - 当前支持表 / 列 / 行增删与单元格内联编辑
- `modules/ui/components/table-workbench-panel.js`
  - 当前会把编译后的 runtime `tables` 预览展示在右侧

所以当前用户看到的交互已经不是：

- 一个大 textarea
- 里面直接编辑 `tables` 数组 JSON

而是：

- 一套最小结构化编辑器
- 编辑内容在保存 / 运行前编译回 `tables`

### 7.2 当前最大缺口已经从“摆脱 JSON”变成“把结构化编辑器做完整”

当前最需要被准确描述的，不是：

- target resolve 失效
- writeback 事务模型错误
- state binding 丢失

而是：

- 结构化编辑器虽然已经存在，但仍只是 MVP
- 还没有排序、模板、历史、导入导出、visualizer shell
- 还没有独立成型的正式 authoring 模型

### 7.3 `config.tables` 仍然是 runtime 真相来源

这点必须明确写清楚：

- 当前 editor 只是 authoring 入口
- 当前执行链真正读取的仍然是 `config.tables`
- 保存 / 运行前 compile 不是临时 hack，而是当前架构故意保留的稳定边界

---

## 八、当前建议的文档口径

后续在其他文档或讨论中，关于 `tableWorkbench` 应统一使用以下口径：

### 可以直接说的事实

- `tableWorkbench` 已落地为顶级页签
- 它已经有最小手动填表 MVP
- 它已经具备 revision-safe 结构化写回主链
- 它已经不再要求直接手写 JSON 维护表定义
- 它当前已有结构化表定义编辑器 MVP，并会在保存 / 运行前编译为 runtime `tables`

### 不能再继续沿用的旧说法

- “它还只是计划中的子页签”
- “table-workbench-panel 尚未新增”
- “当前还没有手动执行入口”
- “当前表定义仍只能通过 JSON textarea 编辑”
- “当前已经有正式可用的 visualizer / 表编辑器”

---

## 九、下一次规划前的起点

这份文档补齐后，下一次再进入新阶段规划，应直接从这个事实出发：

> **当前 tableWorkbench 的主链已经能跑，JSON 已不再是主 authoring 路径，下一阶段真正要解决的是把结构化编辑器从 MVP 推进到正式工作台体验。**

下一轮应该重点讨论的是：

- 是否要引入更正式的 draft model
- 表 / 行 / 列排序与更成熟的大表编辑体验怎么做
- 是否要补模板 / 历史 / 导入导出
- 是继续增强轻量结构化编辑器，还是进入 visualizer shell

但这些都属于下一轮，不属于本文档当前要假装已经完成的内容。

---

## 十、当前事实对照文件

如需校验本文档是否仍然准确，应优先对照以下源码：

- `modules/tool-registry.js`
- `modules/app/popup-shell.js`
- `modules/ui/components/table-workbench-panel.js`
- `modules/ui/components/table-form-renderer.js`
- `modules/table-engine/table-schema-service.js`
- `modules/table-engine/table-update-service.js`
- `modules/table-engine/table-writeback-service.js`
- `modules/table-engine/table-state-service.js`
- `modules/core/storage-service.js`

只要这些文件的职责边界发生变化，就应优先更新本文档，而不是继续保留历史草案表述。