# 填表工作台施工草案

## 文档目的

本文档用于规划将“填表 / 表格工作台”能力集成到 YouYou Toolkit 的第一版施工路径。

目标不是照搬参考项目，而是：

- 吸收 `st-memory-enhancement` 的**配置驱动表单**优点
- 吸收 `shujuku-main` 的**可视化表格编辑器 + 增量填表流水线**优点
- 底层严格复用当前仓库已存在的 **execution context / automation / writeback / slot transaction** 模型
- 从设计上避免 `shujuku-main` 中“自动触发失败后，手动更新错误写回上一条消息”的 stale target 问题

---

## 一、当前仓库必须遵守的基线

当前仓库已经有一套比较清晰的执行主链，新增填表模块时必须挂接在这套主链上，而不是另起一套独立自动触发系统。

当前事实：

- 自动入口：`modules/tool-automation-service.js`
- 手动 / 自动共用上下文：`modules/tool-execution-context.js`
- 手动执行入口：`modules/tool-trigger.js`
- post-response 执行链：`modules/tool-output-service.js -> modules/tool-prompt-service.js -> modules/api-connection.js -> modules/context-injector.js`
- 写回绑定依赖：`slotBindingKey / slotRevisionKey / slotTransactionId / sourceMessageId / sourceSwipeId`

因此，填表能力必须视为：

> **YouYou Toolkit 现有事务模型中的一个专用执行域**

而不是：

> “另一个独立的弹窗插件 + 另一个独立的消息绑定状态机”

---

## 二、参考项目中要吸收的点

## 2.1 来自 st-memory-enhancement 的优点

### A. 配置驱动表单

适合借鉴到：

- 表格基础属性编辑
- 列定义编辑
- prompt 模板编辑
- 更新策略编辑
- 导入导出配置
- 表格预设配置

结论：

- 表单类 UI 应采用 **schema-driven renderer**
- 不应继续把所有配置面板都写成手工 DOM 拼接 + 手工绑定

### B. 模板与运行态分离

适合借鉴到：

- 全局模板快照
- 聊天级模板覆盖
- 某条 assistant 槽位上的运行态表数据
- 编辑器未保存草稿态

结论：

- 模板、运行态、草稿态不能混成一个对象

---

## 2.2 来自 shujuku-main 的优点

### A. 可视化编辑器

适合借鉴到：

- 表顺序调整
- 行列编辑
- 单元格编辑
- 表级配置编辑
- 行 / 列 / 单元格锁定
- 结构化预览

结论：

- 表数据编辑不适合纯表单，应单独做 visualizer

### B. 增量填表流水线

适合借鉴到：

- merge base 构造
- 按消息批次切上下文
- auto / manual 模式分流
- 只保存真正变更的表
- 重试机制
- 填表和保存阶段拆开

结论：

- 更新链可以借鉴 shujuku 的思路
- 但实现必须拆成 service，而不是做成大型全局函数

---

## 三、明确不继承的缺点

## 3.1 不继承 shujuku 的 stale target 设计

已知风险：

- 一次自动填表失败后，如果“当前目标楼层”仍沿用上一次成功提交的缓存状态
- 后续手动执行就可能错误写回到上一条 assistant 消息

这是本项目必须从设计上规避的问题。

### 设计规则

#### 规则 1：执行目标必须每次现算

无论是自动执行还是手动执行，都必须在**本次执行开始前**重新解析目标 assistant 槽位：

- 手动：`buildExecutionContextForLatestAssistant()`
- 自动：`buildExecutionContextForMessage()`

禁止使用：

- `lastSuccessfulMessageId`
- `lastUpdatedMessageId`
- `上次成功楼层号`

作为下一次执行的默认写回目标。

#### 规则 2：绑定到 revision，而不是只绑定 messageId

同一楼层可能发生：

- regenerate
- reroll
- swipe
- same-slot content replace

因此表格执行必须以 `slotRevisionKey` 作为真正的内容版本锚点，而不是只看 `messageId`。

#### 规则 3：失败事务不能推进 committed target

需要区分两类状态：

- `lastResolvedTarget`：本次执行尝试解析到的目标
- `lastCommittedTarget`：最近一次真正写回成功的目标

失败时：

- 可记录 `lastResolvedTarget` 做诊断
- 但不能把它当成下次手动执行默认目标
- 更不能覆盖 `lastCommittedTarget`

#### 规则 4：写回前必须二次校验 revision

执行阶段拿到的目标快照，在真正写回前要再次检查：

- `sourceMessageId` 是否仍匹配
- `sourceSwipeId` 是否仍匹配
- `slotRevisionKey` 是否仍匹配

若不匹配：

- 中止写回
- 返回“目标消息已变化，请重新执行”

---

## 四、推荐架构

## 4.1 先做独立 table domain，而不是塞进 generic tool config

建议新增：

```text
modules/table-engine/
├─ table-schema-service.js
├─ table-template-service.js
├─ table-state-service.js
├─ table-target-resolver.js
├─ table-update-service.js
├─ table-writeback-service.js
├─ table-automation-adapter.js
└─ table-types.js
```

职责建议：

### `table-schema-service.js`

负责：

- 表结构定义
- 列定义
- 表级参数默认值
- schema 校验

### `table-template-service.js`

负责：

- 全局模板预设
- 聊天级模板覆盖
- 模板导入导出
- 模板快照序列化

### `table-state-service.js`

负责：

- 获取某个 assistant 槽位绑定的表状态
- 生成 merge base
- 管理 editor draft / persisted state
- 区分模板态和运行态

### `table-target-resolver.js`

负责：

- 从 execution context 解析表格目标
- 构造 `TableTargetSnapshot`
- 提供手动 / 自动共用的目标解析逻辑
- 做 revision 校验

### `table-update-service.js`

负责：

- 构造 AI 请求输入
- 批处理上下文切片
- 解析 AI 增量更新结果
- 输出结构化 patch / modifiedTables

### `table-writeback-service.js`

负责：

- 写回前二次校验 target snapshot
- 结构化保存 table state
- 如需正文镜像，调用现有 `context-injector`
- 记录 writeback 诊断信息

### `table-automation-adapter.js`

负责：

- 接入现有 `tool-automation-service.js` 事件模型
- 为自动填表构造 table transaction
- 使用现有 same-slot / revision-aware 去重思路

---

## 4.2 数据对象建议

建议至少拆出以下对象：

### `TableTemplateSnapshot`

表示：

- 全局模板定义
- 不绑定具体 assistant 消息

### `TableChatPreset`

表示：

- 当前聊天下对全局模板的覆盖

### `TableBoundState`

表示：

- 某个 assistant slot 上真正绑定的表运行态数据

建议最少包含：

- `slotBindingKey`
- `slotRevisionKey`
- `sourceMessageId`
- `sourceSwipeId`
- `tables`
- `updatedAt`

### `TableEditorDraft`

表示：

- 当前 visualizer 中尚未保存的草稿
- 不直接视为持久态真相

### `TableRunTransaction`

表示一次填表执行事务：

- `traceId`
- `slotBindingKey`
- `slotRevisionKey`
- `slotTransactionId`
- `sourceMessageId`
- `sourceSwipeId`
- `runSource` (`MANUAL_TABLE` / `AUTO_TABLE`)
- `phase`
- `verdict`
- `error`

---

## 五、UI 施工方案

## 5.1 UI 入口建议

### 第一阶段建议

先不要直接升格为顶级主 tab。

建议先作为 `tools` 下的专用 subtab 落地，例如：

- `tableWorkbench`

原因：

- 对当前 `popup-shell` 改动更小
- 便于先验证底层状态模型和执行链
- 降低第一次接入的 blast radius

### 稳定后可升级

后续如果表格工作台能力扩大，再考虑升级为独立主 tab：

- `tables`

---

## 5.2 UI 组件建议

```text
modules/ui/components/
├─ table-workbench-panel.js
├─ table-form-renderer.js
├─ table-visualizer-shell.js
├─ table-visualizer-sidebar.js
├─ table-visualizer-data-panel.js
├─ table-visualizer-config-panel.js
├─ table-visualizer-global-panel.js
└─ table-run-history-panel.js
```

### `table-form-renderer.js`

用途：

- 做配置类表单渲染
- 借鉴 st-memory 的 schema-driven 思路

但明确要求：

- 不使用 `setTimeout(..., 0)` 绑定事件
- 不依赖裸 `document.getElementById`
- 不在 renderer 内直接读取宿主全局状态
- 输入输出都走组件 props / service 调用

### `table-visualizer-*`

用途：

- 做表数据与结构编辑
- 借鉴 shujuku visualizer

但明确要求：

- 拆组件
- 拆状态
- 不做单文件巨型函数

---

## 六、执行链施工方案

## 6.1 手动填表执行链

```text
用户点击“手动填表”
  -> buildExecutionContextForLatestAssistant()
  -> table-target-resolver.resolveFromExecutionContext()
  -> table-state-service.loadBoundStateOrTemplate()
  -> table-update-service.buildRequest()
  -> api-connection 发送请求
  -> table-update-service.parsePatch()
  -> table-writeback-service.validateBeforeCommit()
  -> table-writeback-service.commit()
```

### 关键要求

- 手动执行目标必须来自 fresh context
- 不允许“拿上次成功目标继续写”
- commit 前必须再次校验 `slotRevisionKey`

---

## 6.2 自动填表执行链

```text
宿主消息事件
  -> tool-automation-service / table-automation-adapter
  -> buildExecutionContextForMessage(messageId)
  -> table-target-resolver.resolveFromExecutionContext()
  -> revision-aware 去重
  -> table-update-service.runAuto()
  -> table-writeback-service.validateBeforeCommit()
  -> table-writeback-service.commit()
```

### 关键要求

- 自动链也必须使用当前 execution context
- 去重键至少要包含 revision 语义
- 自动失败不能污染下一次手动执行目标

---

## 七、写回策略建议

不建议把表格系统完全等同于“正文替换”。

建议分两层：

## 7.1 结构化状态写回

优先把结构化 table state 挂到目标消息扩展字段，例如：

- `message.YouYouToolkit_tableState`
- `message.YouYouToolkit_tableBindings`

这样可以避免：

- 纯正文替换导致结构信息难以校验
- 视觉展示与底层状态混成一份文本

## 7.2 正文镜像写回

如果需要给用户可见反馈，再根据配置决定是否把表格摘要 / 预览块镜像到 assistant 正文中。

这一层可以复用：

- `modules/context-injector.js`

但只把它当作：

- UI 镜像层

而不是：

- 结构化真相来源

---

## 八、第一阶段最小可行版本（MVP）

第一阶段不要一口气上完整 visualizer + 全自动。

推荐 MVP 范围：

### 必做

1. `table-target-resolver`
2. `table-state-service`
3. `table-update-service`
4. `table-writeback-service`
5. 一个基础 `table-workbench-panel`
6. 一套最小 schema-driven 配置表单
7. 手动填表流程跑通
8. stale target 防护跑通

### 暂缓

1. 高级 visualizer
2. 复杂批处理策略 UI
3. 聊天级 / 全局模板双向同步细节
4. 自动填表大范围开放

也就是先把：

> **“能安全手动填表，并且绝不写错楼层”**

做稳定，再扩展功能。

---

## 九、分阶段施工计划

## Phase 0：文档与骨架

状态：已完成

目标：

- 明确 table domain 的边界
- 确认模块命名
- 搭建空文件与类型定义

已完成交付：

- 本文档
- `modules/table-engine/` 目录骨架

## Phase 1：目标解析与状态模型

状态：已完成（最小骨架）

目标：

- 做 `table-target-resolver`
- 做 `table-state-service`
- 完成 `TableTargetSnapshot` / `TableBoundState` 数据模型

已完成内容：

- 新增 `modules/table-engine/table-types.js`
- 新增 `modules/table-engine/table-target-resolver.js`
- 新增 `modules/table-engine/table-state-service.js`
- 已把结构化消息扩展字段固定为：
  - `message.YouYouToolkit_tableState`
  - `message.YouYouToolkit_tableBindings`
- 已实现 `lastResolvedTarget / lastCommittedTarget` 最小分离
- 已实现 commit 前 fresh target resolve + revision 校验

当前边界：

- 仅完成底层目标解析与结构化状态读写
- 尚未接入手动执行入口
- 尚未接入 prompt/buildRequest/patch 解析链
- 尚未提供 UI 配置面板

验收结论：

- 任意时刻都能基于现有 execution context 解析当前 assistant 目标
- 不依赖上次成功楼层缓存
- 已具备 stale target 的最小防护骨架

## Phase 2：手动填表 MVP

目标：

- 接通最小手动执行入口
- 新增最小 `table-workbench-panel`
- 新增最小 `table-form-renderer`
- 先支持基础表定义 / prompt / 写回策略配置
- 接通 `resolve target -> load state -> build request -> parse patch -> commit` 主链

建议拆分：

### 2.1 配置与入口

新增：

- `modules/ui/components/table-workbench-panel.js`
- `modules/ui/components/table-form-renderer.js`

范围：

- 先作为 `tools` 下的 `tableWorkbench` subtab 接入
- 先只提供最小配置项：
  - 表定义
  - prompt 模板
  - 是否镜像写回正文

### 2.2 执行链服务补全

新增：

- `modules/table-engine/table-schema-service.js`
- `modules/table-engine/table-update-service.js`
- `modules/table-engine/table-writeback-service.js`

职责：

- `table-schema-service`：校验最小表定义与 prompt 配置
- `table-update-service`：组装请求输入，先支持单次手动执行，不做批处理
- `table-writeback-service`：封装 `commitBoundState()`，并决定是否调用现有 `context-injector.js` 做正文镜像

### 2.3 手动链路接入点

建议手动链先不要直接改自动化服务，而是挂在现有手动链旁路：

```text
UI 按钮 / Panel 动作
  -> buildExecutionContextForLatestAssistant()
  -> table-target-resolver.resolveTableTargetFromExecutionContext()
  -> table-state-service.recordResolvedTarget()
  -> table-state-service.loadBoundStateOrTemplate()
  -> table-update-service.buildRequest()
  -> api-connection.js
  -> table-update-service.parsePatch()
  -> table-writeback-service.commit()
```

### 2.4 Phase 2 验收口径

- 能在当前 popup shell 中稳定打开 tableWorkbench
- 能完成一次最小手动填表并写入 `YouYouToolkit_tableState`
- 勾选正文镜像时，能通过现有 `context-injector.js` 做可见写回
- 目标发生变化时，commit 会被拒绝并提示重新执行

## Phase 3：自动填表接入

目标：

- 将 table 自动更新挂到现有 transaction-first 自动链
- 复用 current repo 的 same-slot / revision-aware 机制
- 保持自动失败不污染下一次手动目标

前置条件：

- Phase 2 的手动链已稳定
- `table-update-service` 的输入输出协议已固定
- `table-writeback-service` 已能稳定处理结构化写回和可选正文镜像

验收：

- 手动填表成功时写对当前楼层
- 自动链接入后，同楼层 reroll / swipe 不会误提交旧 revision
- 自动失败不会污染后续手动目标

## Phase 4：可视化编辑器

目标：

- 落地 visualizer shell / sidebar / data panel / config panel
- 支持表顺序、行列、单元格与锁定编辑

验收：

- 编辑器草稿与持久态分离
- 保存前后状态一致且可诊断

## Phase 5：预设、导入导出、历史与优化

目标：

- 全局模板预设
- 聊天级覆盖
- 导入导出
- 历史记录与诊断面板

验收：

- 用户可以在不同聊天中稳定复用同一套表模板

---

## 十、第一批建议新增文件

```text
docs/
└─ TABLE_WORKBENCH_IMPLEMENTATION_DRAFT.md

modules/table-engine/
├─ [已完成] table-types.js
├─ [已完成] table-target-resolver.js
├─ [已完成] table-state-service.js
├─ [下一阶段] table-schema-service.js
├─ [后续阶段] table-template-service.js
├─ [下一阶段] table-update-service.js
├─ [下一阶段] table-writeback-service.js
└─ [后续阶段] table-automation-adapter.js

modules/ui/components/
├─ [下一阶段] table-workbench-panel.js
└─ [下一阶段] table-form-renderer.js
```

说明：

- 当前已完成的是 Phase 1 最小骨架，不包含 UI 与自动链接入
- 下一阶段优先补齐最小手动填表 MVP，而不是继续扩张文件数量
- visualizer 细分组件继续暂缓

---

## 十一、明确的非目标

当前这轮不追求：

1. 一次性复刻 shujuku 全部 UI
2. 一次性复刻 st-memory 全部设置页
3. 一次性支持所有批处理 / 世界书 / 特殊索引功能
4. 在第一轮就把所有表格可视化配置做完

当前最重要的是：

- 目标绑定正确
- revision 校验正确
- 手动填表稳定
- 自动失败不污染后续执行

---

## 十二、施工验收口径

当以下条件同时满足时，才算第一轮施工成功：

### 目标安全

- 自动失败后，下一次手动更新不会写到旧楼层
- 同一楼层 reroll / swipe 后，旧 revision 结果不会覆盖新 revision
- 写回前 revision 校验可阻止 stale commit

### 结构边界

- 模板态 / 运行态 / 草稿态已拆分
- 表配置 UI 与表数据编辑 UI 已拆分
- 更新执行与写回执行已拆分

### 仓库一致性

- 没有绕开 `tool-execution-context.js`
- 没有绕开 `context-injector.js` / 现有写回诊断模型
- 没有新增第二套独立自动触发状态机

---

## 十三、当前推荐决策

当前推荐按以下顺序落地：

1. 先在 `docs/` 保留并持续更新本施工草案
2. 已完成 `modules/table-engine/` Phase 1 最小骨架
3. 下一阶段先做手动填表 MVP
4. 等手动链与状态模型稳定后，再上 visualizer
5. 自动填表最后接入

核心原则一句话总结：

> UI 上吸收 st-memory 的配置驱动，交互上吸收 shujuku 的 visualizer，但底层执行和写回必须完全服从 YouYou Toolkit 当前的 slot transaction 模型。
