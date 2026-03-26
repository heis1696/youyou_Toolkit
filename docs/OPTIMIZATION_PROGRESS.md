# YouYou Toolkit 优化施工进程文档

> 创建时间：2026-03-21  
> 最后更新时间：2026-03-26  
> 关联文档：`docs/ARCHITECTURE_ANALYSIS.md`、`docs/OPTIMIZATION_EXECUTION_PLAN.md`  
> 当前目标：先建立统一施工记录载体，再按 Phase 推进代码优化

> 补充说明（2026-03-25）：除 Phase 1 ~ Phase 5 外，今日已新增一轮“代码瘦身与结构收口”后续施工，用于减少启动期 legacy 模块装载、继续压缩 popup shell 的 compatibility 感知范围。

## 一、文档用途

本文档用于记录 **优化方案的实际施工进程**，与其他两份文档分工如下：

- `docs/ARCHITECTURE_ANALYSIS.md`：负责解释当前系统现状、结构特征、风险点
- `docs/OPTIMIZATION_EXECUTION_PLAN.md`：负责解释后续优化目标、阶段划分、实施策略
- `docs/OPTIMIZATION_PROGRESS.md`：负责记录实际施工过程、阶段状态、改动日志、验收结论

换句话说，这份文档不负责“分析问题”或“描述理想方案”，只负责回答：

- 现在施工做到哪一步了
- 当前正在做哪个 Phase
- 具体改了哪些文件
- 为什么这么改
- 有哪些阻塞项
- 哪些阶段已经验收通过

---

## 二、总体施工看板

| Phase | 名称 | 状态 | 说明 |
|------|------|------|------|
| Phase 0 | 施工准备与文档就绪 | 已完成 | 已完成架构分析、优化方案、施工进程文档初始化 |
| Phase 1 | 入口层拆壳 | 已完成 | 已完成 `bootstrap / popup-shell / public-api` 拆分，`index.js` 已收敛为薄入口 |
| Phase 2 | 工具模型统一 | 已完成 | 已补齐定义层到运行态的归一化出口，并统一新建工具的运行态初始化 |
| Phase 3 | 执行链清主次 | 已完成 | 已明确自动主链路径，并将 `tool-executor.js` 收敛为调度/兼容执行层 |
| Phase 4 | UI 装配中心统一 | 已完成 | 已将 `modules/ui/index.js` 提升为主 UI 装配入口，并降低 `ui-components.js` 的主路径权重 |
| Phase 5 | 调试与回归保障增强 | 已完成 | 已补齐自动链快照、单工具诊断字段、轻量调试展示与标准化失败/写回状态 |

### 当前总进度

- 已完成：6 / 6 个阶段（含准备阶段）
- 当前进行中：无
- 下一步建议进入：**无；若继续，仅建议补宿主环境实测或少量体验收尾**

---

## 三、当前施工焦点

## 当前状态

当前已完成 Phase 1 ~ Phase 5 的全部代码落地，并在 2026-03-24 追加完成了两轮收尾增强：

- `docs/OPTIMIZATION_EXECUTION_PLAN.md` 已补充完成度复核，确认 11 项实施清单均已有代码落点
- `docs/OPTIMIZATION_PROGRESS.md` 已将当前状态、施工日志与回归结论收口到“文档施工已完成”
- `docs/ARCHITECTURE_ANALYSIS.md` 已补充“施工前基线 / 施工后复核”定位说明，避免把历史问题误读为当前现状
- `modules/tool-trigger.js` 已补上监听器设置接线与事件级调试快照 `lastEventDebugSnapshot`
- `modules/tool-trigger.js` 已进一步补上 `MESSAGE_RECEIVED` 的非 AI 楼层过滤，以及短时间重复去重日志收敛，减少真实宿主环境中的误监听与调试噪声
- `modules/tool-trigger.js` 已进一步引入 message session 聚合、运行态触发/写回历史与 trace 贯通；`modules/context-injector.js` 已补上块身份与冲突诊断结果
- `modules/context-injector.js` 已新增 `injectDetailed()` 分层写回结果，`modules/tool-output-service.js` 的 `meta` 现已补充 `writebackDetails`
- 用户已在宿主环境确认本轮“旧对话 / 聊天信息窗口误触发工具”问题修复生效，自动触发链状态机收口方案已落地并通过实际使用验证
- popup shell 头部曾临时补上的“保存当前工具”按钮已确认属于误做入口，现已删除，仅保留工具面板内部原有保存按钮
- 已新增 `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`，用于承载下一轮自动触发链残余风险的专项补修方案
- `modules/tool-trigger.js` 已开始落实专项补修的第一轮施工：补上 provisional baseline、resolved baseline 等待机制与 `MESSAGE_RECEIVED` 历史 replay 防线
- `modules/tool-trigger.js` 已继续落实专项补修第二轮：代码层尝试恢复用户主动 `regenerate / swipe` 的合法自动触发路径，并把 `ignoreAutoTrigger` 的拦截职责重新收口到监听器设置层
- `modules/tool-trigger.js` 已进一步为 `messageSessions / recentSessionHistory` 补齐 session 级 generation 意图诊断字段，方便宿主执行 A10 ~ A13 时回看每个 phase 的门控状态
- `modules/tool-trigger.js` / `modules/app/public-api.js` 已新增 `getAutoTriggerDiagnostics()` 聚合诊断入口，宿主回归时可直接读取 `summary / activeSessions / recentSessionHistory`，不再需要手工拼装多份状态
- `modules/tool-trigger.js` 已继续补齐 N1 宿主验收辅助摘要：`getAutoTriggerDiagnostics().summary` 现可直接输出 `phaseCounts / consistency / eventBridge / gateState`，`getToolTriggerManagerState()` 也已补上 `activeSessions / registeredEvents / pendingTimerCount`，便于快速判断 session 冻结字段是否与当前 generation 发生漂移
- `modules/tool-trigger.js` / `modules/app/public-api.js` 已继续补上 `recentEventTimeline / verdictHints / exportAutoTriggerDiagnostics()`，宿主在 A10 ~ A13 中既能回看完整时序，也能先用 hint 快速锁定最可疑的失败方向
- `modules/ui/components/tool-config-panel-factory.js` 已继续接入这批宿主验收辅助信息：工具页“最近触发诊断”折叠区现可直接展示 N1 快速判读 chips、最近自动触发时间线摘要，并支持一键复制 JSON 诊断快照
- 已完成一轮文档可信度清理：重写 `README.md`、`docs/API_DOCUMENTATION.md`、`docs/EXTENSION_GUIDE.md`、`docs/CONTRIBUTING.md` 中与当前代码不一致的内容，并清理不再属于主文档区的 `docs/SHUJUKU_ARCHITECTURE.md`
- 已新增 `docs/CODEBASE_DIET_PLAN.md`，用于承载本轮后收口的“启动减载 / compatibility 显式化 / 主路径降噪”方案
- 已新增 `docs/N1_AUTO_TRIGGER_ACCEPTANCE_RECORD.md`，用于承载下一轮宿主自动触发链验收结果的统一落点
- `modules/app/bootstrap.js` 已将 `ui-components.js`、`prompt-editor.js` 从启动期常驻装载改为 `loadLegacyModule(moduleKey)` 按需加载
- `modules/app/popup-shell.js` 已改为仅在 UI 主入口不可用时，再按需加载 `ui-components.js`；旧分段提示词编辑路径也已改为按需加载 `prompt-editor.js`
- `modules/tool-trigger.js` 已移除对 `tool-executor.js` 的静态依赖，compatibility 执行回退改为惰性加载
- `modules/app/public-api.js` 已新增 `loadLegacyModule(moduleKey)` 对外入口，供旧扩展显式加载 compatibility 模块
- 本轮代码瘦身收口已完成 `npm run build` 构建验证，说明当前主路径与按需加载调整未破坏 bundle 输出
- `modules/api-connection.js`、`modules/preset-manager.js`、`modules/regex-extractor.js` 已启动 S2 存储接口收口，优先改用 `core/storage-service.js` 主接口
- 用户在宿主中进一步确认：首轮新用户消息 -> AI 回复的自动触发可工作，但对同一用户消息的已生成楼层执行重 roll / reroll 时，工具仍可能不会再次自动触发；这说明当前问题已从“是否收到了事件”继续收口到“generation 动作识别 + messageId 级去重语义 + 宿主刷新确认”三条主线
- 已新增 `docs/MVU_DEEP_ANALYSIS.md` 与 `docs/MVU_TRANSACTION_REWORK_PLAN.md`，作为下一轮“MVU 事务化收口”分析与施工文档；`docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md` 继续保留为历史专项与 N1 / N2 验收档案
- `modules/tool-trigger.js` 已进一步修正 assistant 确认模型：当前除“baseline 后新增 assistant 楼层”外，也支持显式 `reroll / regenerate / swipe` 对**同一 assistant 楼层**的合法重写确认，避免宿主复用同一 `messageId / chatIndex` 时被旧的新楼层模型提前挡住
- `modules/ui/components/tool-config-panel-factory.js`、`docs/API_DOCUMENTATION.md`、`docs/HOST_REGRESSION_CHECKLIST.md` 已同步补齐 `confirmationMode / sameSlotRevision*` 诊断口径，便于宿主直接判断 reroll 是否走到了 same-slot revision 确认通道
- `modules/tool-trigger.js` 已继续按 MVU / Amily 语义收口确认链：宿主一旦给出 `messageId`，就直接按该楼层 / 当前槽位处理；`GENERATION_AFTER_COMMANDS` 在 reroll family 下也可直接绑定 baseline assistant 槽位当前状态，不再只停留在 speculative
- `modules/context-injector.js` / `modules/tool-output-service.js` 已同步收紧写回目标与透传字段：写回固定优先绑定 `confirmedAssistantMessageId`，并补齐 `generationMessageBindingSource / confirmedAssistantSwipeId / effectiveSwipeId` 诊断口径
- `modules/tool-trigger.js` 本轮已进一步真正切到楼层槽位驱动主路径：`GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED / MESSAGE_UPDATED / MESSAGE_SWIPED` 只要能解析 `messageId`，都会优先按该楼层生成 `slotRevisionKey`
- `modules/context-injector.js` 本轮已进一步收紧为自动写回必须提供 `sourceMessageId`，并优先按 `sourceSwipeId / effectiveSwipeId` 写当前 swipe；`MESSAGE_UPDATED` 回响则通过 `writeback_echo_event` 守卫拦截
- `modules/ui/components/tool-config-panel-factory.js` 已继续把工具页诊断消费面切到 transaction-first：当前优先读取 `getGenerationTransactionDiagnostics()`，折叠区可直接展示 `activeTransactions / recentTransactionHistory / recentHandledExecutionKeys`，复制按钮也已改为导出 `exportGenerationTransactionDiagnostics()`
- `docs/API_DOCUMENTATION.md`、`docs/HOST_REGRESSION_CHECKLIST.md` 本轮已继续同步 transaction 口径：工具页观测点、控制台辅助命令与诊断导出方式现统一改为 transaction diagnostics 优先，`recentEventTimeline` 则保留为时序辅助视图
- 本轮继续执行 `npm run build` 构建验证通过，说明 transaction 诊断消费面对齐未破坏 bundle 输出

换句话说，当前需要确认的已不再是“UI 有没有接上 transaction 视图”，而是“宿主环境里这些 transaction 诊断是否足以直接定位 reroll / dedupe / writeback / refresh 的真实卡点”。

## 当前建议动作

下一步优先执行：

1. 使用新的 `lastEventDebugSnapshot` 与 `writebackDetails` 在真实宿主环境里补一轮自动触发 / 写回链实测
2. 若继续补修自动触发链，则优先按 `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md` 处理 baseline 竞态与历史 replay 风险
3. 在真实宿主中补跑一轮 `regenerate / reroll / swipe`、非用户意图 generation、A10/A11/A12/A13 回归矩阵
4. 若专项补修完成，再决定是否继续做额外视觉、调试页或历史面板增强
5. 若继续推进结构性收口，则以 `docs/MVU_TRANSACTION_REWORK_PLAN.md` 作为下一轮主施工文档，而不再继续把 reroll / dedupe / refresh 问题零散挂在历史专项文档下

### 当前执行建议（可直接照此推进）

建议把下一步施工拆成两段：

1. **先验证，不先扩判断**
   - 在宿主里跑 A10 / A11 / A12 / A13
   - 用 `lastEventDebugSnapshot` 与 `recentSessionHistory` 判定当前门控是否正确

2. **再决定是否进入第三轮补修**
   - 若 A12 失败：继续补“显式用户 generation 动作识别”
   - 若 A13 失败：回头收紧 `ignoreAutoTrigger` 的非用户意图判定
   - 若 A10 ~ A13 全通过：切换到写回链宿主专项回归

当前已补齐一个额外抓手：

- `recentSessionHistory` 本身现在也会记录 generation 意图字段，而不只是 `lastEventDebugSnapshot`
- 因此若同一条回复被 `GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED` 多次命中，仍可逐 phase 回看当时的用户意图判定结果
- 现在还可直接通过 `YouYouToolkit.getAutoTriggerDiagnostics()` 读取聚合诊断对象，降低宿主验收脚本复杂度
- 现在 `diagnostics.summary.phaseCounts / consistency` 还能直接帮助判断“baseline 只是正常从 provisional 进入 resolved”，还是 session 冻结字段已经真的漂到别的 generation 上
- 现在 `recentEventTimeline` 还能把 generation、baseline、session phase、UI guard 的先后顺序直接铺开；`verdictHints` 则可先给出 A10 / A11 / A12 / A13 的快速可疑方向
- 现在工具页中的“最近触发诊断”折叠区也能直接承接这些摘要，不必只依赖控制台

## 当前风险提醒

当前阶段结束后需要注意以下几点：

- 当前已不存在阻塞“施工是否完成”的文档问题，但 `ui-components.js` 与 `getUiComponents()` 仍需继续保留兼容语义
- 当前诊断字段仍以紧凑标量为主，若未来继续扩展调试能力，需要控制存储体积与隐私噪声
- 当前 `writebackDetails` 已能覆盖“最新 AI 楼层写回”主路径，但尚未扩展成更完整的可视化历史面板
- 宿主环境下的最终实机回归尚未在本进程文档中登记为最新一次完成结果，因此若进入发布前验收，仍建议补跑一轮真实环境测试
- 自动触发链虽然主问题已修，但仍存在 baseline 竞态与历史 replay 两类专项加固项，详见 `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
- 宿主中的 `regenerate` 并不会新增用户楼层，因此若后续继续收紧“用户意图”语义，必须始终验证它不会再次被误判为 `ignored_auto_trigger`

## 当前实现检查结论（2026-03-25）

截至当前，自动触发专项补修已经进入“**代码闭环完成、宿主验收未完成**”的状态。

### 已确认完成的实现

1. baseline 竞态补修已落地
2. 历史 replay 防线已落地
3. 代码层已尝试恢复用户主动 `regenerate / swipe` 的合法确认路径，但宿主最新实测又暴露出“同一用户消息已得到 AI 回复后，重 roll / reroll 仍不再自动触发”的现象，因此该路径尚不能视为最终闭环
4. `messageSessions / recentSessionHistory` 已补齐实时诊断字段
5. `messageSessions / recentSessionHistory` 已补齐冻结版 session generation 字段
6. `YouYouToolkit.getAutoTriggerDiagnostics()` 已提供宿主回归聚合诊断入口
7. 聚合诊断已补齐 `phaseCounts / consistency / eventBridge / gateState` 等 N1 快速判读摘要
8. 聚合诊断已补齐 `recentEventTimeline / verdictHints / exportAutoTriggerDiagnostics()`，方便宿主时序回看与留档

### 当前检查结论

- 当前没有看到新的明显静态实现错误。
- 当前代码与 API / 回归 / 进度 / 变更文档基本一致。
- 下一阶段的主要风险不再是“判断没写进去”，而是“真实宿主时序下是否仍存在边界回归”。

## 下一阶段施工方案（2026-03-25）

补充说明（2026-03-25 晚）：在继续沿用 `N1 -> N1 失败分支 -> N2` 的宿主验收叙事之外，当前又新增了一条更上层的结构性结论：

- 当前问题已不再只是“自动触发专项残余风险”
- 而是需要进入“MVU 事务化收口”阶段，重点处理：
  1. reroll / regenerate / swipe 的合法 generation 动作识别
  2. generation-aware dedupe
  3. writeback commit / refresh confirm

因此，从 2026-03-25 晚开始：

- `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md` 继续负责历史专项与 N1 / N2 验收顺序
- `docs/MVU_TRANSACTION_REWORK_PLAN.md` 作为下一轮真正主施工文档

当前后续施工顺序已经正式收口为：

> **N1 宿主自动触发链验收 ->（若失败）第三轮自动触发定向补修 ->（若通过）N2 写回链宿主专项**

### 推进原则

1. **先验收，不先扩判断**：未完成 N1 前，不继续扩大 `modules/tool-trigger.js` 的自动触发判断面。
2. **N1 是唯一前置闸门**：只有 A10 ~ A13 全通过，才允许进入写回链宿主专项。
3. **失败只做定向补修**：若 N1 失败，只围绕失败项进入第三轮自动触发补修，不再泛化扩写。
4. **通过后切换主战场**：若 N1 通过，后续主施工对象从 `modules/tool-trigger.js` 切换到 `modules/context-injector.js`、`modules/tool-output-service.js`。

### N1：宿主自动触发链验收阶段

优先验证：

1. A10：高时序 baseline
2. A11：历史 replay
3. A12：`regenerate / swipe` 合法放行
4. A13：非用户意图 generation 继续拦截

建议统一采集：

- `[youyou_trigger]` 控制台日志
- `YouYouToolkit.getAutoTriggerDiagnostics({ historyLimit: 8 })`
- `YouYouToolkit.getToolTrigger().getToolTriggerManagerState()`
- 工具页诊断折叠区

通过标准：

1. A10 ~ A13 全通过
2. `recentSessionHistory` 与 `lastEventDebugSnapshot` 结论一致
3. 不存在“行为异常但诊断字段不足以判案”的盲区

### N1 失败时：第三轮自动触发定向补修

进入条件：A10 ~ A13 任一失败。

补修优先级：

1. A10 失败：继续收紧 provisional / resolved baseline 等待与 trace 覆盖保护
2. A11 失败：继续增强 replay 防线、合法完成窗口与 session 冻结判定
3. A12 失败：补齐显式用户 generation 动作识别范围
4. A13 失败：回头收紧 `ignoreAutoTrigger` 与用户意图判定边界

执行约束：

1. 仅修改失败项对应逻辑
2. 每个新增判断都必须带对应诊断字段或 skip reason
3. 修改后先重跑失败项，再完整重跑 A10 ~ A13

### N2：写回链宿主专项阶段

前提：N1 通过。

重点执行：

1. W1 ~ W4
2. D1 ~ D3

通过标准：

1. `writebackStatus / writebackDetails / failureStage` 足以定位主路径问题
2. 不出现工具块互相覆盖或重复叠加失控
3. 宿主最终消息正文与诊断结果能互相印证写回成功

### 当前执行口径

1. 未完成 N1 前，不继续扩大自动触发判断面。
2. N1 结论必须先登记到 `docs/OPTIMIZATION_PROGRESS.md`，再决定是否进入第三轮补修或 N2。
3. 只有在 N1 全通过后，才将“最新 AI 楼层写回链实机回归”登记为当前主验收项。

## 当前参考项目启发

本轮在进入 Phase 1 前，额外参考了 `shujuku` 与 `MVU` 两个项目，当前结论如下：

- **来自 shujuku 的关键启发**：酒馆环境下，事件门控、消息读取、宿主兼容与多层兜底本身就是核心系统设计，不是边角逻辑
- **来自 MVU 的关键启发**：复杂系统若要长期稳定，运行态主模型必须单一，结构化输出与生命周期回调能明显降低漂移和维护成本
- **对当前项目的直接影响**：
  1. Phase 1~3 不应只是“拆文件”，还要同步考虑触发链标准化与运行主模型统一
  2. 后续工具链不应继续扩散 legacy 执行路径
  3. 调试信息需要在未来进入标准化阶段字段，而不是仅依赖临时日志

---

## 四、阶段定义与验收状态

## Phase 0：施工准备与文档就绪

### 目标

建立完整文档基线，确保后续实施有依据、有顺序、有记录。

### 状态

**已完成**

### 产出物

- `docs/ARCHITECTURE_ANALYSIS.md`
- `docs/OPTIMIZATION_EXECUTION_PLAN.md`
- `docs/OPTIMIZATION_PROGRESS.md`

### 验收结果

- 已完成现状分析
- 已完成优化方案阶段规划
- 已建立施工进程记录文档
- 可进入 Phase 1

---

## Phase 1：入口层拆壳

### 目标

把 `index.js` 中当前混杂的职责拆分出来，形成更清晰的入口结构。

### 计划涉及文件

- `index.js`
- `modules/app/bootstrap.js`
- `modules/app/popup-shell.js`
- `modules/app/public-api.js`

### 核心任务

- 抽离模块加载与初始化流程
- 抽离弹窗壳与标签路由逻辑
- 抽离对外 API 组装逻辑
- 将 `index.js` 缩减为薄入口

### 当前状态

**已完成**

### 验收项

- [x] 插件仍能自动初始化
- [x] 魔棒菜单入口仍可正常显示（构建通过，入口注册逻辑已保留）
- [x] 工具箱弹窗仍能正常打开/关闭（弹窗壳逻辑已迁移到 `popup-shell.js`）
- [x] 主标签页与子标签页切换无回归（切换逻辑已迁移到 `popup-shell.js`）

### 实际完成内容

- 新增 `modules/app/bootstrap.js`，承接模块加载、样式注入、主题恢复与菜单入口注册
- 新增 `modules/app/popup-shell.js`，承接主弹窗、主/子标签切换和页面装配逻辑
- 新增 `modules/app/public-api.js`，集中组装 `YouYouToolkit` 对外公开 API
- 将 `index.js` 收敛为薄入口，仅保留上下文装配、全局挂载与初始化调用
- 完成 `npm run build` 构建验证

---

## Phase 2：工具模型统一

### 目标

确立 `tool-registry.js` 的新配置结构为运行主模型，弱化旧结构在执行链中的主导地位。

### 计划涉及文件

- `modules/tool-manager.js`
- `modules/tool-registry.js`
- `modules/ui/components/tool-manage-panel.js`
- `modules/ui/components/tool-config-panel-factory.js`

### 当前状态

**已完成**

### 关键验收项

- [x] 新建工具默认直接落到新运行结构
- [x] 旧工具导入后仍可正常编辑、执行、保存
- [x] 显示值、存储值、执行读取值保持一致

### 实际完成内容

- 在 `modules/tool-manager.js` 中新增 `createDefaultToolDefinition()` 与 `normalizeToolDefinitionToRuntimeConfig()`，统一定义层默认结构与运行态归一化出口
- 在 `modules/tool-registry.js` 中收口自定义工具运行态基础配置、合并流程与首份运行态配置初始化逻辑，并新增 `ensureToolRuntimeConfig()` / `getToolBaseConfig()`
- 在 `modules/ui/components/tool-manage-panel.js` 中让新建工具创建后立即初始化运行态配置
- 在 `modules/ui/components/tool-config-panel-factory.js` 中改为基于运行态基础配置重置模板，进一步统一显示值与保存值来源
- 执行 `npm run build`，确认构建通过

---

## Phase 3：执行链清主次

### 目标

明确自动工具主链，压缩 legacy 执行逻辑的影响范围。

### 计划涉及文件

- `modules/tool-executor.js`
- `modules/tool-trigger.js`
- `modules/tool-output-service.js`
- `modules/tool-prompt-service.js`
- `docs/API_DOCUMENTATION.md`

### 当前状态

**已完成**

### 关键验收项

- [x] 自动主链职责明确
- [x] `tool-executor.js` 主要回归调度职责
- [x] 手动执行不回归

### 实际完成内容

- 在 `modules/tool-executor.js` 中为 legacy 执行入口补充了兼容定位说明，弱化其自动主链语义
- 在 `modules/tool-trigger.js` 中补充主路径选择说明，并显式区分自动主链与兼容回退路径
- 在 `modules/tool-output-service.js` 中明确其为当前自动工具链的直接执行层
- 在 `docs/API_DOCUMENTATION.md` 中补充自动主链、手动执行链与兼容执行链说明
- 执行 `npm run build`，确认构建通过

---

## Phase 4：UI 装配中心统一

### 目标

收口 popup shell 与 UI 组件装配边界，降低兼容层长期主路径化的风险。

### 计划涉及文件

- `modules/ui/ui-manager.js`
- `modules/ui/index.js`
- `modules/ui-components.js`
- `modules/app/popup-shell.js`

### 当前状态

**已完成**

### 关键验收项

- [x] `modules/ui/index.js` 已成为主 UI 装配入口
- [x] `popup-shell.js` 已优先通过统一 helper 渲染静态页面与默认工具面板
- [x] `ui-components.js` 已降级为 compatibility facade，主路径不再直接依赖它
- [x] UI 样式聚合已统一收口到 `uiModule.getAllStyles()`
- [x] `npm run build` 构建通过

### 实际完成内容

- 在 `index.js` 中新增 `uiModule` 装配槽位，保留 `uiComponentsModule` 作为兼容引用位
- 在 `modules/app/bootstrap.js` 中改为加载 `modules/ui/index.js` 作为 UI 主入口，并通过 `initUI({ autoInjectStyles: false })` 初始化 UI 装配中心
- 在 `modules/app/bootstrap.js` 中将 UI 样式注入收敛为 `uiModule.getAllStyles()` 单入口聚合，旧三段式样式桶只保留回退兜底
- 在 `modules/ui/index.js` 中补齐 `SettingsPanel` 注册及 API/正则/工具管理/默认工具/bypass/settings 渲染 helper
- 在 `modules/ui/ui-manager.js` 中明确其职责为组件注册、渲染、销毁与样式聚合，不再作为 popup shell 路由控制器
- 在 `modules/app/popup-shell.js` 中改为优先调用 `uiModule` 的统一渲染 helper，移除主路径对兼容层静态组件对象的直接依赖
- 在 `modules/ui-components.js` 中将旧 `render / renderRegex / renderTool` 接口改为薄代理新 UI 主模块
- 在 `modules/app/public-api.js` 中新增 `getUi()` / `getUiModule()`，同时保留 `getUiComponents()` 兼容出口
- 同步更新 `docs/API_DOCUMENTATION.md`、`docs/OPTIMIZATION_PROGRESS.md` 与 `docs/CHANGELOG.md`
- 执行 `npm run build`，确认构建通过

---

## Phase 5：调试与回归保障增强

### 目标

补齐触发链、写回链、去重链和跳过原因的可观测信息，为后续持续重构提供低风险基础。

### 计划涉及文件

- `modules/tool-trigger.js`
- `modules/tool-registry.js`
- `modules/ui/components/tool-config-panel-factory.js`
- `docs/API_DOCUMENTATION.md`
- `docs/CHANGELOG.md`

### 当前状态

**已完成**

### 关键验收项

- [x] 自动链被跳过时有明确原因
- [x] 执行失败时可快速定位故障环节
- [x] 单工具 runtime 已补齐最近触发 / 跳过 / 执行路径 / 写回 / 失败阶段诊断字段
- [x] 工具配置面板已提供轻量折叠式诊断展示
- [x] 调试信息不影响普通用户默认体验
- [x] `npm run build` 构建通过

### 实际完成内容

- 在 `modules/tool-registry.js` 中为运行态补齐 `lastTriggerAt / lastTriggerEvent / lastMessageKey / lastSkipReason / lastExecutionPath / lastWritebackStatus / lastFailureStage` 等紧凑诊断字段
- 在 `modules/tool-registry.js` 中新增 `patchToolRuntime()` 低噪声更新能力，用于记录 skip / 去重 / 诊断信息而不污染 `lastRunAt`
- 在 `modules/tool-trigger.js` 中新增标准化 skip reason、execution path 与最近一次自动触发快照 `lastAutoTriggerSnapshot`
- 在 `modules/tool-trigger.js` 中将 quiet / 未读取到 AI / 自动去重 / 无可执行工具等早退分支统一记录为结构化诊断结果
- 在 `modules/tool-output-service.js` 中为 post-response 主链补齐 `failureStage` 与 `writebackStatus` 元数据
- 在 `modules/ui/components/tool-config-panel-factory.js` 中新增折叠式“最近触发诊断”区，展示最近触发时间、触发事件、消息键、跳过原因、执行路径、写回状态与失败阶段
- 同步更新 `docs/API_DOCUMENTATION.md`、`docs/OPTIMIZATION_PROGRESS.md` 与 `docs/CHANGELOG.md`
- 执行 `npm run build`，确认构建通过

---

## 五、施工日志

## 2026-03-21 23:30

- 阶段：Phase 0
- 修改文件：
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 新建施工进程文档
  - 初始化总体施工看板、阶段状态、当前焦点、阶段定义与验收项
  - 在更新日志中登记新增施工进程文档
- 修改原因：
  - 在正式进入代码施工前，先建立统一的过程记录载体，避免施工过程缺乏落点与状态追踪
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-21 23:40

- 阶段：Phase 0
- 修改文件：
  - `docs/OPTIMIZATION_EXECUTION_PLAN.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 将 shujuku / MVU 参考项目启发整理进优化方案文档
  - 在施工进程文档中补充“当前参考项目启发”与本次研究记录
  - 在更新日志中登记新增参考研究结论同步
- 修改原因：
  - 在正式进入 Phase 1 之前，先明确哪些难点来自宿主环境、哪些思路可参考 shujuku 与 MVU，避免后续优化方向偏移
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-22 00:08

- 阶段：Phase 1
- 修改文件：
  - `index.js`
  - `modules/app/bootstrap.js`
  - `modules/app/popup-shell.js`
  - `modules/app/public-api.js`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 新增应用启动模块、弹窗壳模块、公开 API 组装模块
  - 将 `index.js` 从大入口收敛为薄入口，改为只负责上下文装配、全局挂载与初始化调用
  - 保留原有初始化、菜单入口、弹窗导航与公开 API 能力，但职责边界已拆开
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 落实 Phase 1「入口层拆壳」目标，降低后续继续在 `index.js` 叠加逻辑的风险
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-22 00:28

- 阶段：Phase 2
- 修改文件：
  - `modules/tool-manager.js`
  - `modules/tool-registry.js`
  - `modules/ui/components/tool-manage-panel.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 为工具定义层补齐默认定义构造与运行态归一化函数
  - 收口运行态配置的基础配置获取、用户配置合并与首份配置初始化逻辑
  - 调整新建工具流程，使其在创建后立即具备完整运行态配置
  - 统一工具配置页的基础模板重置来源
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 落实 Phase 2「工具模型统一」目标，减少定义层与运行层的字段漂移，并让新建工具直接落到可运行的新模型结构
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-22 00:36

- 阶段：Phase 3
- 修改文件：
  - `modules/tool-executor.js`
  - `modules/tool-trigger.js`
  - `modules/tool-output-service.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 明确自动主链的真实路径，并将 `tool-executor.js` 中旧执行函数标记为 compatibility API
  - 在触发模块中显式区分自动主路径与兼容回退路径
  - 在工具输出服务中固化“自动工具链直接执行层”的职责说明
  - 在 API 文档中补充自动主链、手动执行链与兼容执行链的接口定位说明
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 落实 Phase 3「执行链清主次」目标，降低未来维护者对自动执行真正入口的误判风险
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-23 14:50

- 阶段：Phase 4
- 修改文件：
  - `index.js`
  - `modules/app/bootstrap.js`
  - `modules/app/popup-shell.js`
  - `modules/app/public-api.js`
  - `modules/ui/index.js`
  - `modules/ui/ui-manager.js`
  - `modules/ui-components.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 将 `modules/ui/index.js` 提升为 UI 主装配入口，并在 bootstrap 中统一完成 UI 初始化与样式聚合注入
  - 将 popup shell 的静态页面与默认工具面板渲染切换到统一 helper，减少对 `ui-components.js` 和静态组件对象的主路径依赖
  - 将 `ui-components.js` 降级为兼容 facade，并补充新的公开 UI 模块出口
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 落实 Phase 4「UI 装配中心统一」目标，收口 popup shell、UI manager、兼容层与公开 API 之间的装配边界
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-23 15:09

- 阶段：Phase 5
- 修改文件：
  - `modules/tool-registry.js`
  - `modules/tool-trigger.js`
  - `modules/tool-output-service.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 为自动触发链补齐最近一次全局触发快照与标准化 skip reason
  - 为单工具运行态补齐最近触发事件、消息键、跳过原因、执行路径、写回状态和失败阶段等诊断字段
  - 在工具配置面板中新增折叠式诊断区，低噪声展示最近一次触发结果
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 落实 Phase 5「调试与回归保障增强」目标，降低后续排障与回归验证成本
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-23 15:40

- 阶段：阶段后收尾
- 修改文件：
  - `modules/app/popup-shell.js`
  - `modules/ui/components/settings-panel.js`
  - `modules/app/bootstrap.js`
  - `styles/main.css`
  - `modules/window-manager.js`
  - `README.md`
  - `docs/EXTENSION_GUIDE.md`
  - `docs/CONTRIBUTING.md`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 为主工具箱弹窗补充头部拖动逻辑，解决窗口固定居中后无法调整位置的问题
  - 修复主题、紧凑模式与动画设置应用到错误 document 的问题，并补充 resetSettings 后的外观立即恢复
  - 同步修正 README、扩展指南与贡献指南中的旧目录结构、旧 UI 主路径与旧交互描述
- 修改原因：
  - 作为 Phase 5 后的收尾修复，补齐用户侧最直观的交互问题，并避免核心文档继续滞后于当前架构
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 10:30

- 阶段：文档复核与收口
- 修改文件：
  - `docs/OPTIMIZATION_EXECUTION_PLAN.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/ARCHITECTURE_ANALYSIS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 对照当前代码再次复核 5 个 Phase 与 11 项实施清单
  - 为施工方案文档补充 2026-03-24 完成度复核结论
  - 为架构分析文档补充“施工前基线 / 施工后复核”定位说明
  - 更新当前进程文档中的状态、回归结论与最后更新时间，正式将文档施工状态收口为已完成
- 修改原因：
  - 解决“进度文档已写完成、但计划文档与分析文档缺少最终复核口径”的问题，避免后续再把历史分析误认成当前状态
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 16:35

- 阶段：阶段后增强（自动触发与写回链）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/core/settings-service.js`
  - `modules/ui/components/settings-panel.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `modules/context-injector.js`
  - `modules/tool-output-service.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 将监听器设置真正接入自动触发主链，补齐自动监听总开关、quiet 过滤、自动触发过滤与防抖配置的运行时接线
  - 为自动触发补充事件级调试快照 `lastEventDebugSnapshot`
  - 为写回链新增 `injectDetailed()` 分层结果，输出目标消息、宿主写回方式、步骤状态与最终校验信息
  - 在工具输出主链返回结果的 `meta` 中补充 `writebackDetails`
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 针对真实宿主环境中“自动触发未闭环、写回失败定位粒度不够”的问题，进一步补齐设置接线与分层验证能力
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 16:58

- 阶段：阶段后增强（整体 UI / HTML 美化）
- 修改文件：
  - `modules/app/popup-shell.js`
  - `styles/main.css`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `modules/ui/components/tool-manage-panel.js`
  - `modules/ui/components/settings-panel.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 重构主工具箱 popup shell 的 HTML 结构，整理为 topbar / workspace / sidebar / main content / footer 的工作台布局
  - 统一主导航、内容框架、section、表单、按钮、对话框和响应式细节的视觉语言
  - 为工具配置页、工具列表页、设置页补充 hero 区、统计/状态区与更清晰的信息层级
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 在架构收敛基本完成后，进一步把 UI 从“能用”提升到“层级清晰、风格统一、便于继续扩展”的工作台形态
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 17:10

- 阶段：阶段后增强（自动触发排查日志）
- 修改文件：
  - `modules/tool-trigger.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 自动触发初始化改为等待 `eventSource` 就绪，降低在酒馆环境中因初始化过早导致监听失效的概率
  - 增加一组稳定输出的 `[youyou_trigger]` 控制台日志，覆盖初始化、事件注册、接收、调度、跳过、执行成功/失败等关键节点
- 修改原因：
  - 用户在真实酒馆环境中仍遇到“无法自动触发工具调用”，且缺少足够明确的控制台判断依据，因此优先补齐时序保障和观测信息
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 17:42

- 阶段：阶段后增强（事件桥接兼容）
- 修改文件：
  - `modules/tool-trigger.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 为自动触发初始化补充多源事件桥接兼容：`SillyTavern.eventSource`、`topWindow.eventSource`、`SillyTavern.getContext()`、`/script.js` 导出事件源
  - 修复在酒馆环境中 API 已存在但事件源缺失时无限延迟初始化的问题
  - 增加事件源来源日志，便于判断当前宿主环境命中的兼容路径
- 修改原因：
  - 用户在真实酒馆中反馈 `hasApi: true, hasEventSource: false`，说明此前的事件源获取逻辑与宿主实际结构不匹配，需要补齐桥接兼容层
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 17:35

- 阶段：阶段后修复（工作台布局回退）
- 修改文件：
  - `modules/app/popup-shell.js`
  - `styles/main.css`
  - `modules/app/bootstrap.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 重新收紧 popup shell 的 topbar / sidebar / main workspace 布局比例，补充“当前页面”信息卡，避免顶部信息和侧栏把主内容区挤成窄列
  - 为 tab content / sub content / content frame 补齐高度继承和滚动约束，修复内容区像纯文本堆叠、卡片样式失真的问题
  - 修复 `bootstrap` 样式注入只尝试 `./styles/main.css` 单一路径的问题，改为同时尝试基于 `import.meta.url` 的候选路径，并在失败时回退到同步更新后的内置骨架样式
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 用户在宿主环境中反馈本轮“整体 UI / HTML 美化”后界面出现严重错位，结合截图判断不仅是布局比例问题，还存在宿主未成功加载最新 `styles/main.css`、从而落到旧内置样式的问题，因此需要同时修正布局和样式注入回退链
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 18:08

- 阶段：阶段后修复（二次 UI 可用性收紧）
- 修改文件：
  - `modules/app/popup-shell.js`
  - `styles/main.css`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `modules/ui/components/tool-manage-panel.js`
  - `modules/ui/components/settings-panel.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 继续压缩工作台 topbar、当前页面卡片、侧栏说明区和页面 hero 区的高度与间距，把更多空间还给表单与配置内容
  - 为 `yyt-content / yyt-tab-content / yyt-sub-content` 等主内容容器补齐 `min-width/min-height/flex` 约束，恢复稳定滚动
  - 新增内容区拖拽滚动：侧栏导航、次级导航和主内容区都支持按住鼠标左键直接拖动滚动，同时避免与表单控件交互冲突
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 用户继续反馈“功能区域小，而且具体内容区域没办法滚动或拖拽”，说明第一轮修复仅解决了整体错位，但没有完全解决可用性问题，因此继续把重点放在“给内容区腾空间”和“补可操作滚动能力”上
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 18:24

- 阶段：阶段后修复（自动触发过滤与日志收敛）
- 修改文件：
  - `modules/tool-trigger.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 为 `MESSAGE_RECEIVED` 兜底链新增消息角色判定，若命中的并非 AI 楼层则直接在事件级忽略，不再把用户消息误当成可执行回复
  - 为自动执行上下文新增“按事件消息 ID 锁定目标楼层”的策略，降低用户消息事件错误映射到最新 AI 回复的概率
  - 将兜底调度键优先收敛到消息 ID，并对短时间重复命中的去重日志做抑制，减少控制台里同类 skip 日志连续刷屏
  - 同步更新 API 文档与更新日志说明
- 修改原因：
  - 用户在真实酒馆环境中确认功能已恢复，但反馈仍会误监听用户消息，且去重相关日志在一次回复后会重复出现数次，因此需要继续收紧事件过滤并降低调试噪声
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 18:58

- 阶段：阶段后增强（Phase 6：session / 幂等写回 / 历史诊断）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/context-injector.js`
  - `modules/tool-output-service.js`
  - `modules/tool-registry.js`
  - `modules/core/settings-service.js`
  - `modules/ui/components/settings-panel.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/API_DOCUMENTATION.md`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 为自动触发链补上 message session 聚合、session 历史与 trace 贯通，降低多事件命中同一消息时的漂移与诊断盲区
  - 为 listener 设置新增 fallback 开关、session 窗口与历史条数配置，并同步到设置页 UI
  - 为写回链补上块身份、替换结果、冲突检测与保留其他工具块的校验字段
  - 为单工具 runtime 增加最近触发历史与最近写回历史，并在工具面板折叠区可视化展示
  - 新增宿主环境回归清单文档，作为后续发布前实测基线
- 修改原因：
  - 在自动触发链已基本可用后，继续把系统从“能运行”提升到“可验证、可回溯、可发布”的状态，减少后续真实宿主环境中的偶发问题难以复盘
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 19:39

- 阶段：阶段后修复（滚轮恢复与窗口放大）
- 修改文件：
  - `modules/app/popup-shell.js`
  - `styles/main.css`
  - `modules/app/bootstrap.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 移除拖拽滚动实现对 `wheel` 事件的拦截，恢复鼠标滚轮在主内容区、设置区和工具列表中的原生滚动行为
  - 保留按住左键拖拽滚动的辅助能力，但避免它与滚轮滚动互相冲突
  - 继续放大 popup 主窗口尺寸，并同步调整 fallback 内置样式，确保宿主在外部样式拉取失败时也不会退回较小尺寸
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 用户反馈拖拽滚动虽然可用，但滚轮滚动被破坏，且当前窗口仍然不够大，因此需要优先恢复原生滚轮，再直接扩大整个工作台可视区域
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 20:37

- 阶段：阶段后修复（工具详情滚轮与顶部保存）
- 修改文件：
  - `modules/app/popup-shell.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 为工具详情区补上“鼠标位于内容区任意位置即可滚轮滚动当前详情区”的滚轮代理逻辑，而不是只能把光标移到滚动条上才生效
  - 为 textarea、提取预览、下拉面板与对话框正文保留原生内部滚动优先级，避免外层滚轮代理抢走细分区域滚动
  - 在工具配置页 hero 区补充顶部“保存配置”按钮，并直接复用原有保存逻辑
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 用户进一步指出希望“只要在工具详情区滚动滚轮就能滚”，并希望在顶部也能直接保存，避免每次都要拖到底部，因此对工具详情交互继续做一轮针对性修正
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 21:11

- 阶段：阶段后修复（详情区滚轮命中与壳层保存入口再收口）
- 修改文件：
  - `modules/app/popup-shell.js`
  - `styles/main.css`
  - `modules/app/bootstrap.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 调整滚轮代理逻辑，让 `yyt-content` 在工具详情页场景下会把滚轮优先派发到当前激活详情容器，而不是只在外层 content 上消费掉
  - 在 popup shell 主内容头部新增壳层“保存当前工具”按钮，并同步补齐主样式与 fallback 样式，避免动态工具 hero 内按钮在宿主中未出现时仍无顶部保存入口
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 用户在宿主里用 F12 明确指出 DOM 中依旧缺少顶部保存按钮，且工具详情区滚轮看起来仍未生效，因此需要进一步把保存入口上提到 popup shell 自身，并修正滚轮事件最终命中的滚动容器
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 21:19

- 阶段：阶段后修复（宿主聊天信息窗口误触发）
- 修改文件：
  - `modules/tool-trigger.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 为 `MESSAGE_RECEIVED` 兜底链补充“必须存在明确消息身份，或当前确实处于生成中才允许回退到最新消息”的门控
  - 将打开聊天信息窗口等宿主 UI 引发的无消息身份事件统一标记为 `unrelated_ui_event` 并直接忽略，避免一打开信息窗口就触发自动工具请求
  - 执行 `npm run build`，确认构建通过
- 修改原因：
  - 用户反馈“只要一打开酒馆聊天信息窗口工具就会自动触发请求”，说明当前 `MESSAGE_RECEIVED` 兜底仍然会吸收宿主 UI 副作用事件，因此继续收紧消息身份门控
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 23:18

- 阶段：阶段后收尾（宿主确认与文档总结）
- 修改文件：
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 根据用户最新反馈，补登记本轮宿主误触发问题已确认修复
  - 在更新日志中补充“宿主环境已确认旧对话 / 聊天信息窗口不再误触发工具”的结果说明
  - 在施工进程文档中补充最终总结，并把本轮自动触发误触发专项回归标记为已通过
- 修改原因：
  - 用户已明确反馈“好的，已修复”，需要把这次宿主实际确认结果同步沉淀到施工文档与更新日志中，避免后续重复排查同一问题
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 23:22

- 阶段：阶段后收尾（误做 UI 入口清理）
- 修改文件：
  - `modules/app/popup-shell.js`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 删除 popup shell 主内容头部额外补上的“保存当前工具”按钮与对应点击桥接逻辑
  - 保留工具配置面板内部既有的保存按钮，不影响正常工具配置保存流程
  - 同步在更新日志与施工进程文档中记录这次误做入口清理
- 修改原因：
  - 用户确认这个按钮属于之前为了兜底而误做的壳层级入口，希望删除以减少界面歧义，因此本轮将其正式清理
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-24 23:32

- 阶段：专项施工文档规划（自动触发链残余风险）
- 修改文件：
  - `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
  - `docs/OPTIMIZATION_EXECUTION_PLAN.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 新增自动触发链专项加固施工文档，集中整理 baseline 竞态、历史 replay 风险与后续宿主回归矩阵
  - 在总施工方案文档中补充“后续专项补修建议”，把残余风险收口到独立专项文档中
  - 在施工进程文档中补记专项文档已建立，并明确后续若继续施工应以该文档为准
- 修改原因：
  - 用户要求先规划施工文档，因此需要先把“下一轮自动触发链补修”从口头结论沉淀为正式施工方案，避免后续执行阶段再重新梳理上下文
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-25 00:02

- 阶段：专项补修施工（baseline 竞态 / MESSAGE_RECEIVED replay 防线）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - `GENERATION_STARTED` 改为先同步写入 provisional baseline，再异步补全正式 baseline，并在异步失败时回退到可用的 provisional baseline
  - 为 `GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED` 补上 resolved baseline 等待逻辑，减少高时序下的 `missing_generation_baseline` 误跳过
  - 为 `MESSAGE_RECEIVED` 增加历史 replay 防线，阻断不属于当前 active generation 或超出合法确认窗口的旧 assistant 楼层事件
  - 扩展调试字段与工具面板跳过原因文案，并同步更新 API 文档与宿主回归清单
  - 执行 `npm run build 2>&1`，构建通过
- 修改原因：
  - 落实 `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md` 中已定义的第一轮专项补修任务，把“baseline 竞态”和“历史 replay 风险”从文档规划推进到代码施工
- 阻塞项：
  - 尚未完成宿主环境下针对高时序与 replay 场景的最终实机验证
- 状态：
  - 成功

## 2026-03-25 00:45

- 阶段：专项补修施工（用户主动 regenerate / swipe 合法确认路径恢复）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 为 `GENERATION_STARTED` 增加显式用户 generation 动作识别，当前已将 `regenerate / swipe` 视为合法用户意图来源
  - `getGenerationConfirmationEligibility()` 不再将 `startedByUserIntent = false` 当作系统级硬阻断，恢复由 `ignoreAutoTrigger` 决定是否拦截非用户意图 generation
  - 扩展调试字段，新增 `generationUserIntentSource / generationUserIntentDetail / lastUserIntentSource`
  - 更新工具面板文案、API 文档与宿主回归清单，补充 `regenerate / swipe` 与非用户意图 generation 的回归验证项
- 修改原因：
  - 第一轮专项补修完成后，用户在真实宿主中发现 `regenerate` 会被误判为 `ignored_auto_trigger`，导致自动触发突然失效；因此需要恢复“合法用户主动重新生成”的确认路径，同时保持 replay / dryRun 防线不回退
- 阻塞项：
  - 尚未完成宿主环境下针对 `regenerate / swipe`、非用户意图 generation 与历史 replay 的最终实机验证
- 状态：
  - 成功

## 2026-03-25 01:10

- 阶段：宿主回归准备（session 级意图诊断补齐）
- 修改文件：
  - `modules/tool-trigger.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 为 `messageSessions / recentSessionHistory` 补齐 session 级 baseline / generation 用户意图诊断字段
  - 宿主执行 A10 ~ A13 时，现可直接回看每个 session 在 `received / scheduled / handling / skipped / completed` 的意图判定
  - 同步补充 API 文档与宿主回归清单中的字段说明、执行建议与预期结果
- 修改原因：
  - 为即将开始的宿主实机回归提供更细粒度的可观测性，减少“只能看到最后一次快照”的排障盲区
- 阻塞项：
  - 尚未完成本轮修改后的构建验证
- 状态：
  - 成功

## 2026-03-25 10:53

- 阶段：宿主回归辅助能力增强（自动触发诊断聚合 API）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/app/public-api.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
- 修改摘要：
  - 新增 `getAutoTriggerDiagnostics(options)`，统一输出 `summary / activeSessions / recentSessionHistory / lastEventDebugSnapshot / lastAutoTriggerSnapshot`
  - 对外 API 暴露 `YouYouToolkit.getAutoTriggerDiagnostics()`，用于宿主环境回归时直接读取聚合诊断信息
  - 文档与回归清单同步补齐新 API 的使用示例和建议观测方式
- 修改原因：
  - 当前自动触发链已经进入“待宿主验收”阶段，需要降低实机回归时手工拼装多份状态对象的复杂度
- 阻塞项：
  - 尚未完成本轮修改后的构建验证
- 状态：
  - 成功

## 2026-03-25 11:04

- 阶段：专项施工方案收口（N1 / N1-Fail / N2 编排正式化）
- 修改文件：
  - `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 将下一阶段施工顺序正式收口为“先做 N1 宿主自动触发链验收，再按结果分流到第三轮自动触发定向补修或 N2 写回链宿主专项”
  - 为专项文档补齐 N1 的执行顺序、通过标准、失败回退点，以及 N1 失败后的第三轮补修边界
  - 在进度文档中同步固化当前执行口径，明确未完成 N1 前不继续扩大自动触发判断面
- 修改原因：
  - 当前自动触发链已经进入“代码闭环完成、宿主验收未完成”阶段，需要把后续执行顺序正式文档化，避免继续凭口头约定推进
- 阻塞项：
  - 尚未完成宿主环境下 A10 / A11 / A12 / A13 的最新一轮实机验收
- 状态：
  - 成功

## 2026-03-25 11:14

- 阶段：宿主回归辅助能力增强（诊断一致性 / phase 摘要补齐）
- 修改文件：
  - `modules/tool-trigger.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 为 `getToolTriggerManagerState()` 补齐 `activeSessions / registeredEvents / pendingTimerCount / eventBridge / gateState` 等宿主验收所需状态概览
  - 为 `getAutoTriggerDiagnostics().summary` 补齐 `phaseCounts / consistency`，并为 session/history 条目新增 drift 标记，用于快速对比“session 创建时冻结字段”和“当前 generation 字段”是否已经发生漂移
  - 同步更新 API 文档、宿主回归清单、专项文档与施工进度文档，明确 N1 期间如何使用这些新摘要判读 A10 ~ A13
- 修改原因：
  - 当前已经进入宿主自动触发链验收阶段前的工具化准备，需要先降低实机判案时的人工比对成本，避免每次都手工逐字段核对 session 与全局 generation 状态
- 阻塞项：
  - 尚未完成宿主环境下基于新诊断摘要的 A10 / A11 / A12 / A13 实机验收
- 状态：
  - 成功

## 2026-03-25 11:42

- 阶段：宿主回归辅助能力增强（事件时间线 / verdict hints / 诊断导出）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/app/public-api.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 为自动触发诊断新增 `recentEventTimeline`，按时间顺序记录 generation、baseline、session phase、UI guard 等关键节点
  - 新增 `verdictHints`，对 A10 / A11 / A12 / A13 提供快速可疑项摘要
  - 新增 `exportAutoTriggerDiagnostics()` 对外导出入口，便于宿主回归时直接留档一份 JSON 快照
- 修改原因：
  - 当前已进入 N1 宿主自动触发链验收阶段，继续降低“人工还原时序”和“人工判断优先排查方向”的成本，比继续盲目扩判断更有收益
- 阻塞项：
  - 尚未完成基于 `recentEventTimeline / verdictHints` 的宿主 A10 / A11 / A12 / A13 最新一轮实机验收
- 状态：
  - 成功

## 2026-03-25 11:47

- 阶段：宿主回归辅助能力增强（工具页诊断折叠区接线）
- 修改文件：
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 工具配置页“最近触发诊断”折叠区现已同步展示 N1 快速判读 chips、全局 active/timer/phase 摘要、最近自动触发时间线
  - 折叠区新增“复制自动触发诊断 JSON”按钮，可直接导出 `exportAutoTriggerDiagnostics()` 快照，减少宿主回归时的手工复制成本
  - 文档同步补充工具页诊断折叠区在 N1 中的使用方式与定位
- 修改原因：
  - 上一轮虽然已经补齐控制台与 API 级诊断抓手，但工具页折叠区仍停留在单工具 runtime 视角；当前继续把宿主验收摘要接入 UI，可进一步降低回归操作门槛
- 阻塞项：
  - 尚未完成带有 UI 诊断折叠区辅助下的宿主 A10 / A11 / A12 / A13 最新一轮实机验收
- 状态：
  - 成功

## 2026-03-25 14:56

- 阶段：文档梳理与无效文档清理
- 修改文件：
  - `README.md`
  - `docs/API_DOCUMENTATION.md`
  - `docs/EXTENSION_GUIDE.md`
  - `docs/CONTRIBUTING.md`
  - `docs/CHANGELOG.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/SHUJUKU_ARCHITECTURE.md`
- 修改摘要：
  - 修正文档中仍沿用旧版 STScript / 消息源生成器语义的“正则提取”说明，统一到当前规则提取面板语义
  - 修正 API 文档中失真的 regex extractor 接口说明，并补充当前仓库代码基线说明
  - 同步调整扩展与贡献文档中对 `prompt-editor.js`、扩展入口与文档维护边界的描述
  - 删除不再属于当前项目正式文档区的 `docs/SHUJUKU_ARCHITECTURE.md`
- 修改原因：
  - 用户要求系统性筛查文档可信度、完成度并删除已完成且无实际价值的残留文档，因此需要把本轮文档清理结果正式沉淀到进程记录中
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-25 15:40

- 阶段：阶段后收口（代码瘦身 / compatibility 减载）
- 修改文件：
  - `index.js`
  - `modules/app/bootstrap.js`
  - `modules/app/popup-shell.js`
  - `modules/app/public-api.js`
  - `modules/tool-trigger.js`
  - `README.md`
  - `docs/API_DOCUMENTATION.md`
  - `docs/EXTENSION_GUIDE.md`
  - `docs/CONTRIBUTING.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
  - `docs/CODEBASE_DIET_PLAN.md`
- 修改摘要：
  - 新增代码瘦身专项文档，明确本轮目标、范围、非目标与验收标准
  - 将 `ui-components.js` 与 `prompt-editor.js` 从启动期常驻装载改为按需加载 compatibility 模块
  - popup shell 改为仅在 UI 主路径不可用时才回退加载 compatibility facade，并把旧提示词编辑路径改为惰性加载
  - `tool-trigger.js` 移除对 `tool-executor.js` 的静态依赖，兼容执行回退改为按需加载
  - 对外 API 新增 `loadLegacyModule(moduleKey)`，并同步更新 README / API / 扩展 / 贡献 / 进度 / 变更文档
  - 执行 `npm run build 2>&1`，构建通过
- 修改原因：
  - 在 Phase 1 ~ Phase 5 已完成后，继续减少 legacy 模块对启动路径和主维护心智的干扰，降低后续改造噪声
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-25 15:55

- 阶段：阶段后回顾（实现总结与下一施工方案收口）
- 修改文件：
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/CODEBASE_DIET_PLAN.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 为 N1 宿主自动触发链验收补充统一登记模板与结果回填要求
  - 在代码瘦身专项文档中明确下一施工优先级为 `N1 -> S2 -> S3`
  - 在进度文档中补登记本轮瘦身收口构建已通过，并把这次回顾/规划结论沉淀到正式施工记录中
- 修改原因：
  - 用户要求对当前实现做一次总结回顾，并明确下一轮施工顺序，因此需要把“口头计划”收口成可执行文档
- 阻塞项：
  - 暂无
- 状态：
  - 成功

## 2026-03-25 16:20

- 阶段：下一施工准备（N1 宿主验收记录载体）
- 修改文件：
  - `docs/N1_AUTO_TRIGGER_ACCEPTANCE_RECORD.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 新增独立的 N1 宿主自动触发链验收记录模板，方便直接登记 A10 / A11 / A12 / A13 结论
  - 在宿主回归清单中补充该记录文件的引用，降低后续填写成本
  - 在进度文档中补记该记录载体已建立，明确下一步等待真实宿主验收结果回填
- 修改原因：
  - 用户要求继续推进下一施工方案，而当前最优先的动作是先完成 N1；因此需要先把验收结果沉淀载体准备好
- 阻塞项：
  - 尚未获得真实宿主环境中的 A10 / A11 / A12 / A13 验收结果
- 状态：
  - 成功

## 2026-03-25 16:30

- 阶段：S2 施工（存储接口收口第一轮）
- 修改文件：
  - `modules/api-connection.js`
  - `modules/preset-manager.js`
  - `modules/regex-extractor.js`
  - `README.md`
  - `docs/API_DOCUMENTATION.md`
  - `docs/EXTENSION_GUIDE.md`
  - `docs/CODEBASE_DIET_PLAN.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 将 API 配置、API 预设、规则提取三类核心模块从 `storage.js` 旧接口迁移为优先使用 `core/storage-service.js` 主接口
  - 保留 `storage.js` 作为 compatibility adapter，不破坏旧调用
  - 同步更新 README / API / 扩展 / 瘦身 / 进度 / 变更文档中的存储主路径说明
  - 执行 `npm run build 2>&1`，构建通过
- 修改原因：
  - 按照上一轮确定的 `N1 -> S2 -> S3` 顺序，在不触碰自动触发主判断面的前提下，先推进风险较可控的存储主路径收口
- 阻塞项：
  - 尚未在宿主环境中对这轮存储接口收口做交互级实测
- 状态：
  - 成功

---

## 六、待处理问题 / 阻塞清单

当前暂无实际代码施工阻塞项。

Phase 5 完成后，如需继续增强，可进一步评估：

1. 是否要为全局 `lastAutoTriggerSnapshot` 提供更可视化的只读调试页或历史面板
2. 是否要把 `writebackDetails` 进一步可视化到工具面板或独立调试页
3. 是否需要增加“最近 N 次触发历史”而不是仅保留最近一次快照
4. 是否需要将调试日志级别和 UI 展示层级进一步收敛为统一配置
5. 是否需要补运行态实测与更完整的回归清单登记
6. 是否要继续优化 popup HTML 结构层次与整体视觉风格
7. 是否要继续扩展到更多组件的硬编码颜色清理与统一主题 token 收口

---

## 七、当前回归结论（2026-03-24 文档复核）

### 已确认项

- [x] 入口拆壳、工具模型统一、执行链清主次、UI 装配中心统一、调试诊断增强均已在代码中落地
- [x] `README.md`、`docs/API_DOCUMENTATION.md`、`docs/EXTENSION_GUIDE.md`、`docs/CONTRIBUTING.md`、`docs/CHANGELOG.md` 与当前主架构表述保持一致
- [x] 各阶段 `npm run build` 构建级验证已在施工日志中登记
- [x] 三份优化文档之间的分工关系已重新对齐：分析文档负责基线，方案文档负责计划，进程文档负责落地状态
- [x] 自动触发链已补齐事件级调试快照，写回链已补齐分层结果与最终校验信息
- [x] 主工具箱与高频页面已完成一轮整体 UI / HTML 美化收口，并通过构建验证
- [x] 主工具箱工作台布局错乱与样式注入回退问题已修复，并通过 `npm run build` 验证
- [x] 主工具箱工作台可视区过小与内容区不可滚动/拖拽问题已修复，并通过 `npm run build` 验证
- [x] 主工具箱滚轮滚动与进一步放大窗口尺寸问题已修复，并通过 `npm run build` 验证
- [x] 工具详情区任意位置滚轮滚动与顶部保存按钮已修复，并通过 `npm run build` 验证
- [x] 工具详情区滚轮命中层级与壳层顶部保存入口已进一步修复，并通过 `npm run build` 验证
- [x] 打开宿主聊天信息窗口时的自动工具误触发问题已修复，并通过 `npm run build` 验证
- [x] 自动触发链已进一步完成“speculative 观察态 / confirmed 确认态”收口，并通过 `npm run build` 验证
- [x] 用户已在宿主环境确认“旧对话 / 聊天信息窗口误触发工具”问题修复有效
- [x] 误做的壳层“保存当前工具”按钮已移除，保留面板内部原有保存入口
- [x] 自动触发链残余风险的专项施工文档已建立，可直接作为下一轮补修依据
- [x] 自动触发链专项补修第一轮（provisional baseline / replay 防线）已完成并通过构建验证
- [x] 自动触发链专项补修第二轮（用户主动 regenerate / swipe 合法确认路径恢复）已完成代码落地，但宿主最新实测显示“同楼层重 roll / reroll”仍未形成最终闭环

- [x] 已完成一轮更细的 MVU 对照再梳理，并新增分析/施工文档：`docs/MVU_DEEP_ANALYSIS.md`、`docs/MVU_TRANSACTION_REWORK_PLAN.md`
- [x] 已将旧专项文档、API 文档、宿主回归清单与进度文档重新分层，避免继续把“代码意图”写成“宿主已验收事实”

### 尚未登记为最新一次完成结果的项

- [x] SillyTavern / TavernHelper 宿主环境下自动触发误触发专项回归（旧对话 / 聊天信息窗口）
- [ ] SillyTavern / TavernHelper 宿主环境下自动触发第二轮专项回归（A10 / A11 / A12 / A13）
- [ ] SillyTavern / TavernHelper 宿主环境下最新 AI 楼层写回链最新一轮实机回归
- [ ] SillyTavern / TavernHelper 宿主环境下“同楼层 reroll / reroll family 再触发”专项回归

## 2026-03-26 00:36

- 阶段：reroll 定向补修（同楼层 same-slot revision 确认）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
- 修改摘要：
  - 将 assistant 确认模型从“只接受 baseline 后新增楼层”升级为“新增楼层 + same-slot revision 双通道”
  - 为 generation baseline 补齐 assistant 内容指纹、`swipe_id` 与 swipe 数量快照，用于识别同楼层 reroll / regenerate / swipe
  - `MESSAGE_RECEIVED` 现可在显式 reroll family 下确认同楼层 revision；`GENERATION_ENDED` 则额外支持 same-text reroll 的兜底确认
  - 聚合诊断、工具页折叠区与宿主回归清单同步补入 `confirmationMode / sameSlotRevisionCandidate / sameSlotRevisionConfirmed / sameSlotRevisionSource`
  - 执行 `npm run build 2>&1`，构建通过
- 修改原因：
  - 当前真实故障并不是先卡在 user intent 或 execution key 去重，而是卡在“必须新增 assistant 楼层”这一旧确认模型；宿主对 reroll 常会复用同一楼层，只重写正文，因此需要显式支持 same-slot revision 确认
- 阻塞项：
  - 尚未完成真实宿主环境下针对“同楼层 reroll / 同文本 reroll / swipe 切换”的最新一轮实机验证
- 状态：
  - 成功

## 2026-03-26 01:40

- 阶段：MVU / Amily 语义直抄收口（当前楼层 / 当前 swipe 原位确认）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/context-injector.js`
  - `modules/tool-output-service.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 确认链改为“宿主给出 `messageId` 就直接按该楼层处理”，不再把“baseline 后新增 assistant 楼层”当作唯一放行条件
  - `GENERATION_AFTER_COMMANDS` 在 `reroll / regenerate / swipe` family 下可直接绑定 baseline assistant 槽位当前状态，不再只保留 speculative 观察态
  - 自动去重键进一步收口到 `chatId + messageId + generationTraceId + effectiveSwipeId + assistantContentFingerprint`
  - 写回目标固定优先绑定 `confirmedAssistantMessageId`，并同步更新当前 swipe 文本；UI 与聚合诊断补齐 `generationMessageBindingSource / confirmedAssistantSwipeId / effectiveSwipeId`
- 修改原因：
  - 用户已明确要求不再继续猜测 baseline / 新楼层分支，而是直接抄 MVU / Amily 的“按当前楼层 / 当前 swipe 原位处理”语义
- 阻塞项：
  - 尚未完成本轮修改后的 `npm run build` 与宿主实机回归验证
- 状态：
  - 成功

## 2026-03-26 02:52

- 阶段：MVU / Amily 语义落地补完（楼层槽位驱动主路径激活）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/context-injector.js`
  - `modules/tool-output-service.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - `initToolTriggerManager()` 已实际切换为楼层槽位驱动监听注册，主路径优先消费 `MESSAGE_RECEIVED / MESSAGE_UPDATED / MESSAGE_SWIPED / GENERATION_AFTER_COMMANDS / GENERATION_ENDED`
  - 自动执行上下文改为优先按事件命中的 assistant 楼层直接构建，并补齐 `slotRevisionKey` / `lastHandledSlotRevisionKey / writebackGuardCount`
  - 自动写回进一步收紧为必须提供 `sourceMessageId`，并优先按 `sourceSwipeId / effectiveSwipeId` 写当前 swipe；新增 `writeback_echo_event` 守卫，避免写回回响重触发
  - 工具页诊断、API 文档、宿主回归清单与变更日志已同步切换到“当前楼层 / 当前 swipe / slotRevisionKey”口径
  - 执行 `npm run build 2>&1`，构建通过
- 修改原因：
  - 上一轮虽然已把语义往 MVU / Amily 靠拢，但主路径仍混杂旧 confirmation 链与新楼层绑定语义；本轮目标是让楼层槽位驱动模型真正成为生效主链
- 阻塞项：
  - 尚未完成宿主环境下针对 `MESSAGE_UPDATED / MESSAGE_SWIPED`、`writeback_echo_event` 与同楼层 reroll family 的最新一轮实机回归
- 状态：
  - 成功

## 2026-03-26 11:49

- 阶段：楼层槽位事务元数据补齐（slot transaction metadata finish）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/tool-output-service.js`
  - `modules/context-injector.js`
  - `modules/tool-registry.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 自动链上下文、消息级 session、全局快照、工具 runtime 与写回事件现已统一补齐 `slotBindingKey / slotRevisionKey / slotTransactionId / sourceMessageId / sourceSwipeId`
  - `executionKey` 已正式与 `slotRevisionKey` 对齐，自动去重完全按“当前楼层 + 当前 swipe + 当前内容版本”收口
  - `tool-output-service` 与 `context-injector` 已继续收口到“只写绑定楼层 / 当前 swipe”的事务语义
  - 工具页折叠诊断与文档同步补齐 slot transaction 口径
  - 执行 `npm run build 2>&1`，构建通过，且无警告
- 修改原因：
  - 前一轮虽然已切到楼层槽位主链，但事务元数据仍不完整；本轮目标是把“触发、执行、写回、诊断”全部统一到同一套 slot transaction 语义上
- 阻塞项：
  - 尚未完成宿主环境下围绕 `slotBindingKey / slotTransactionId / sourceMessageId / sourceSwipeId` 的最新一轮实机回归
- 状态：
  - 成功

### 回归结论

- 结果：**就“文档施工 + 代码落点”而言，已完成**
- 备注：本轮针对“旧对话 / 聊天信息窗口误触发工具”的宿主专项验证已确认通过；当前剩余的主要是更广义的发布前写回链实机验证，而不是本轮自动触发问题未闭环

## 2026-03-25 17:45

- 阶段：文档再梳理（MVU 深度解析 / 事务化收口规划）
- 修改文件：
  - `docs/MVU_DEEP_ANALYSIS.md`
  - `docs/MVU_TRANSACTION_REWORK_PLAN.md`
  - `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/API_DOCUMENTATION.md`
  - `docs/OPTIMIZATION_PROGRESS.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 新增 MVU 深度解析文档，重新梳理当前自动触发、dedupe 与写回刷新问题的根因模型
  - 新增 MVU 事务化收口施工文档，明确下一轮主线从“继续补判断”转向“generation-aware transaction / dedupe / refresh confirm”
  - 将旧自动触发专项文档收口为历史专项与 N1 / N2 验收档案，并在宿主回归清单中显式补入“同楼层 reroll / 重roll”关注点与下一轮规划验收项
  - 同步修正 API / 进度 / 变更文档中的口径，避免继续把“代码层已尝试恢复 regenerate / swipe 路径”表述成“宿主已最终验收通过”
- 修改原因：
  - 用户要求在进入下一轮执行前，先把 MVU 对照、最新宿主现象和后续施工路径重新梳理成正式文档，避免在错误前提上继续推进
- 阻塞项：
  - 尚未基于新事务化规划完成对应代码实现与宿主实测
- 状态：
  - 成功

## 2026-03-25 21:40

- 阶段：MVU 事务化收口（Phase T1：generation action 识别与诊断收口）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/app/public-api.js`
  - `docs/API_DOCUMENTATION.md`
- 修改摘要：
  - 为 session 冻结字段、history 条目和 drift 摘要补齐 generation action 相关诊断字段，包括 action/source/explicit action 与 normalized generation type
  - 新增 `getGenerationTransactionDiagnostics()` / `exportGenerationTransactionDiagnostics()` 对外别名出口，为后续事务化主视图迁移做兼容铺垫
  - API 文档同步补充 generation action drift 与 execution key 事务语义说明
- 修改原因：
  - 落实事务化收口 Phase T1，先让宿主能够稳定看到“本轮 generation 被识别成了什么动作”，并与 session 创建时冻结状态做对比
- 阻塞项：
  - generation-aware session key 与 writeback commit / refresh confirm 仍待后续阶段继续收口
- 状态：
  - 成功

## 2026-03-25 21:50

- 阶段：MVU 事务化收口（Phase T2：generation-aware dedupe 与 execution key 收口）
- 修改文件：
  - `modules/tool-trigger.js`
  - `modules/tool-registry.js`
  - `modules/ui/components/tool-config-panel-factory.js`
- 修改摘要：
  - 将 session key 收口到 `chatId + messageId + generationTraceId` 语义，避免同楼层多轮 generation 继续挤进同一个旧 session
  - 将自动去重主判定从“仅看最后一次 execution key”升级为“维护最近已处理 execution key 集合”，并对外暴露 `handledExecutionKeyCount / recentHandledExecutionKeys`
  - 单工具 runtime 与工具页诊断同步补齐 execution key 轨迹相关展示
- 修改原因：
  - 落实事务化收口 Phase T2，确保系统阻断的是“同一轮 generation 重复事件”，而不是“同一 messageId 的所有后续 generation”
- 阻塞项：
  - writeback commit / refresh confirm 事务阶段仍待继续收口
- 状态：
  - 成功

## 2026-03-25 21:58

- 阶段：MVU 事务化收口（Phase T3 / T4：writeback refresh confirm + 诊断展示同步）
- 修改文件：
  - `modules/context-injector.js`
  - `modules/tool-output-service.js`
  - `modules/tool-trigger.js`
  - `modules/tool-registry.js`
  - `modules/app/public-api.js`
  - `modules/ui/components/tool-config-panel-factory.js`
  - `docs/API_DOCUMENTATION.md`
  - `docs/HOST_REGRESSION_CHECKLIST.md`
  - `docs/CHANGELOG.md`
- 修改摘要：
  - 为写回链新增 `commit` 与 `refresh` 分层结果，显式记录主提交策略、实际提交策略、刷新请求通道、确认轮数与 confirmedBy
  - `hostUpdateMethod` 已明确降级为兼容别名，语义直接等价于 `commit.appliedMethod`
  - 工具 runtime、工具页折叠诊断与写回历史已补齐 `refresh.requestMethods` 与 `refresh.confirmedBy` 的直接展示，而不再只显示数量
  - `tool-output-service` 的 `phases` 已对齐到 `request -> extract -> writeback -> refresh` 四阶段
  - 工具 runtime、工具页折叠诊断、公共 API 与文档已同步补齐 execution key 轨迹、主提交策略 / 实际提交策略与 refresh confirm 展示
- 修改原因：
  - 落实事务化收口 Phase T3 / T4，让宿主与 UI 能直接判断“死在 commit 还是 refresh confirm”
- 阻塞项：
  - 本轮仍需以宿主环境回归确认 UI 即时刷新与 refresh confirm 诊断是否完全符合预期
- 状态：
  - 成功
