# YouYou Toolkit 自动触发链专项加固施工文档

> 创建时间：2026-03-24  
> 关联文档：`docs/OPTIMIZATION_EXECUTION_PLAN.md`、`docs/OPTIMIZATION_PROGRESS.md`、`docs/API_DOCUMENTATION.md`、`docs/HOST_REGRESSION_CHECKLIST.md`  
> 当前适用基线：已完成“旧对话 / 聊天信息窗口误触发工具”系统性修复后的主线代码

> 状态说明（2026-03-25 晚）：本文档当前更适合作为**自动触发专项加固历史档案 + N1/N2 宿主验收顺序文档**来阅读，而不再单独代表下一轮主施工计划。最新宿主证据表明：同一用户消息完成一次 AI 回复后，对该楼层执行重 roll / reroll 仍可能不会再次自动触发工具。因此，后续主规划已转入：`docs/MVU_DEEP_ANALYSIS.md` 与 `docs/MVU_TRANSACTION_REWORK_PLAN.md`。文中凡是“`regenerate / swipe` 合法路径已恢复”之类表述，应理解为**代码层阶段性落点**，而不是最新宿主事实的最终验收结论。

## 一、文档目的

本文件不是重新定义整套优化路线，而是针对自动触发链在主问题修复后仍暴露出的**剩余风险**，补一份可直接进入后续施工的专项方案。

当前主问题已经解决：

1. 打开旧对话记录不再误触发工具
2. 打开聊天信息窗口不再误触发工具
3. `GENERATION_AFTER_COMMANDS` 已从高权限执行入口降级为默认 speculative 观察事件
4. `dryRun` 已被提升为系统级硬阻断

但这并不等于自动触发链已经彻底“封口”。结合本轮复查结果，后续仍建议再做一轮专项加固，以解决：

- 宿主高时序下的 generation baseline 写入竞态
- 带 `messageId` 的历史消息重放事件仍可能被误当成确认来源
- API 文档、进度文档、验收结论之间仍存在少量语义串层

本文件的目标，就是把这些剩余问题转成一份明确的施工蓝图，方便后续进入执行模式时直接落地。

---

## 二、当前现状摘要

### 2.1 已完成的收口能力

当前自动触发链已经具备以下能力：

1. `GENERATION_STARTED` 会记录 generation baseline
2. `MESSAGE_RECEIVED` 需要明确 `messageId` 才能进入确认链
3. `GENERATION_AFTER_COMMANDS` 默认只记录 speculative session
4. `GENERATION_ENDED` 仅在确认 baseline 后新增 assistant 楼层时才放行
5. `CHAT_CHANGED / CHAT_CREATED` 会进入 UI transition guard
6. 调试快照中已具备 `confirmedAssistantMessageId / confirmationSource / isSpeculativeSession / skipReasonDetailed`

### 2.3 2026-03-25 补记：用户主动 `regenerate / swipe` 也必须视为合法用户意图

在第一轮专项补修落地后，宿主里又暴露出一个新的边界问题：

- `regenerate` 这类用户主动 generation 不会新增用户楼层
- 若 `startedByUserIntent` 只依赖“最近是否出现新的用户消息”，就会把这类合法动作误判成自动触发
- 当 `ignoreAutoTrigger` 开启时，会进一步表现为 `ignored_auto_trigger`，导致自动链突然看上去“彻底失效”

因此，当前专项方案需要额外补上一条约束：

> **用户主动触发的 generation 动作，不应被等同于“脚本 / 插件自动 generation”。**

当前已确认至少需要把以下 generation type 视为显式用户意图来源：

- `regenerate`
- `swipe`

### 2.4 2026-03-25 再补记：同楼层 reroll / 重roll 仍未形成宿主闭环

最新宿主实测进一步表明：

1. 新用户消息首次得到 AI 回复时，自动触发仍可工作
2. 对这条已得到 AI 回复的用户消息执行重 roll / reroll 时，工具不一定会再次自动触发

这说明当前问题已经不再只是“显式用户 generation 动作是否被识别”的问题，还很可能同时涉及：

- reroll 家族动作识别仍未完全贴合真实宿主事件格式
- 当前 `chatId + messageId` 级去重语义会把“同楼层的新 generation”误判为重复消息

因此，本专项文档后续继续保留 baseline / replay / N1 / N2 的历史背景和验收口径；但若进入下一轮真正施工，应以 `docs/MVU_TRANSACTION_REWORK_PLAN.md` 为主。

### 2.2 当前剩余风险不再属于“主 bug 未修”

需要强调的是：本专项文档所处理的，并不是“旧对话 / 聊天信息窗口误触发工具”主问题仍然存在，而是更严格意义上的**边界收口与竞态补强**。

换句话说，当前问题已经从“明显误触发”进入“宿主极端时序与历史事件回放的残余风险排查”。

---

## 三、剩余风险定义

## R1. `GENERATION_STARTED` baseline 写入竞态

### 现状

当前 `GENERATION_STARTED` 处理中，会先异步执行 `captureGenerationBaseline()`，之后再把完整 baseline 写入 `triggerState.gateState`。

### 风险

如果宿主环境的后续事件（如 `GENERATION_AFTER_COMMANDS`、`GENERATION_ENDED`）来得非常快，就可能出现：

1. 后续确认事件已到达
2. 但 `lastGenerationBaseline` 还没写入完成
3. `getGenerationConfirmationEligibility()` 因此看到 `missing_generation_baseline`
4. 本应被确认的一次真实回复，被误判为不可确认

### 风险等级

**高优先级**。这类问题在本地构建或常规交互中不一定容易复现，但在宿主高时序环境中是典型竞态点。

---

## R2. `MESSAGE_RECEIVED` 带 `messageId` 的历史消息重放风险

### 现状

当前无 `messageId` 的 `MESSAGE_RECEIVED` 已被严格拦住，但带 `messageId` 的事件只要最终解析到 assistant 且通过 baseline 检查，就可能成为确认来源。

### 风险

如果宿主在以下场景重新抛出**带 `messageId` 的旧 assistant 事件**：

- 扩展热重载
- 聊天区域重绘
- 历史消息回放
- 局部信息面板刷新

那么当前链路理论上仍可能把旧楼层误当成确认事件。

### 风险等级

**中优先级**。这不是当前主 bug 的表现形式，但从严格性角度看仍未做到绝对不可误吸收。

---

## R3. 文档语义串层

### 现状

当前文档总体已经同步，但仍有少量“验收结论型描述”出现在 API 文档中，而这类描述更适合落在 `CHANGELOG` 或 `OPTIMIZATION_PROGRESS`。

### 风险

长期看会导致文档边界模糊：

- API 文档不再纯粹描述接口与运行语义
- 施工进度与验收结论分散在多个文档中

### 风险等级

**低优先级**。不影响当前代码行为，但会增加后续维护成本。

---

## 四、专项目标

本轮专项补修建议收敛为 4 个目标：

### G1. 消除 `GENERATION_STARTED` baseline 竞态窗口

把 generation state 写入从“异步快照完成后一次性写入”调整为“同步占位写入 + 异步快照补全”，确保后续确认事件在最早时刻就能拿到合法 trace 与 baseline 占位信息。

### G2. 为 `MESSAGE_RECEIVED` 增加历史重放防线

在已有 `messageId + assistant` 约束之上，再引入“当前 generation trace / baseline / 最近真实用户意图窗口”的二次确认条件，避免历史 replay 事件被误当成新回复。

### G3. 进一步增强诊断可观测性

让调试快照不仅能回答“为什么跳过”，还能回答：

- baseline 是否只是 provisional 占位
- baseline 是否已经真正解析完成
- 当前事件是否被判定为 historical replay
- 当前事件是否属于当前 generation trace
- 当前 generation 的用户意图到底来自“最近用户发送”，还是“显式 regenerate / swipe 动作”

### G4. 把方案、进度、API、验收文档重新摆正边界

避免把“宿主已确认修复”这类结论继续混入 API 文档，明确：

- 方案写在施工文档
- 状态写在进度文档
- 验收结果写在进度 / changelog
- API 文档只写接口与运行语义

---

## 五、施工原则

1. **先堵竞态，再堵历史重放，再清文档**  
   先处理真正可能影响运行正确性的点，再处理文档整洁度。

2. **保留当前已验证通过的主修复成果**  
   不允许为了补竞态，重新放开无 `messageId` 事件或重新引入“猜最后一条 assistant”回退。

3. **所有新增字段都必须服务于调试与确认链**  
   不做“为了记录而记录”的膨胀型状态字段。

4. **宿主验证矩阵必须覆盖高速时序与历史回放场景**  
   否则专项补修容易停留在“看上去更严谨”，但没有真正验证关键边界。

---

## 六、涉及文件

### 代码

- `modules/tool-trigger.js`

### 文档

- `docs/API_DOCUMENTATION.md`
- `docs/HOST_REGRESSION_CHECKLIST.md`
- `docs/CHANGELOG.md`
- `docs/OPTIMIZATION_PROGRESS.md`
- `docs/OPTIMIZATION_EXECUTION_PLAN.md`

---

## 七、分步施工方案

## Step 1：baseline 竞态补修

### 目标

消除 `GENERATION_STARTED` 到 baseline 完整写入之间的竞态窗口。

### 建议改动方向

1. 在 `GENERATION_STARTED` 刚进入时，先同步写入一份 **provisional generation state**，至少包含：
   - `generationTraceId`
   - `generationStartedAt`
   - `generationType`
   - `generationParams`
   - `generationDryRun`
   - `startedByUserIntent`
   - `baselineResolved: false`

2. 之后再异步执行 `captureGenerationBaseline()`，成功后补全：
   - `messageCount`
   - `lastAssistantIndex`
   - `lastAssistantMessageId`
   - `baselineResolved: true`

3. 若异步快照返回时，当前 trace 已变化，则不得覆盖新的 generation state。

### 验收标准

1. 快速宿主时序下，不应再因 `missing_generation_baseline` 跳过真实新回复
2. 调试快照中能区分 `baselineResolved = false/true`

---

## Step 2：`MESSAGE_RECEIVED` 历史重放防线补强

### 目标

避免带 `messageId` 的旧 assistant 事件在历史回放 / 重绘场景中被误当成当前确认来源。

### 建议改动方向

1. 在 `MESSAGE_RECEIVED` 确认时，除 `messageId + assistant` 外，再要求满足以下条件之一：
   - 明确属于当前 active generation trace
   - 或者处于受控的 generation 完成窗口内，且严格晚于 baseline assistant

2. 增加 replay 拦截原因，例如：
   - `historical_replay_message_received`
   - `message_received_outside_active_generation`

3. 若当前不存在 active generation，且也不在合法的 generation 完成窗口内，则带 `messageId` 的 `MESSAGE_RECEIVED` 仍应仅记 speculative，不直接确认。

### 验收标准

1. 历史消息回放不再触发旧 assistant 的工具执行
2. 正常回复路径仍能被 `MESSAGE_RECEIVED` 正常确认

---

## Step 3：调试字段进一步补强

### 目标

让后续宿主排查不再需要手工猜测“究竟是 baseline 没建好，还是 replay 被挡住了”。

### 建议新增/增强字段

- `baselineResolved`
- `baselineResolutionAt`
- `eventBelongsToCurrentGeneration`
- `historicalReplayBlocked`
- `historicalReplayReason`
- `generationUserIntentSource`
- `generationUserIntentDetail`

### 验收标准

1. 控制台与调试快照能清晰区分 baseline 竞态、UI guard、historical replay 三类跳过

---

## Step 4：文档语义收口

### 目标

把 API 文档中的验收型描述回收到进度/变更文档，恢复文档职责边界。

### 建议改动方向

1. `docs/API_DOCUMENTATION.md`：
   - 仅保留接口结构、字段语义、运行机制说明
   - 移除“用户已确认修复”这类验收描述

2. `docs/OPTIMIZATION_PROGRESS.md`：
   - 保留“当前是否已修复、宿主是否已确认”

3. `docs/CHANGELOG.md`：
   - 保留发布导向的结果摘要

### 验收标准

1. API 文档不再混入施工验收结论
2. 验收结论只出现在进度与 changelog 中

---

## Step 5：宿主回归矩阵扩展

### 目标

补齐本轮专项补修后必须验证的高时序与 replay 场景。

### 建议新增回归项

1. `GENERATION_STARTED` 后立刻到 `GENERATION_ENDED` 的高时序场景
2. 扩展热重载后旧消息重绘场景
3. 聊天区域重绘 / 历史消息回放场景
4. 同 chat 内旧 assistant 消息带 `messageId` 被重新分发场景
5. 用户主动点击 `regenerate` 时，`ignoreAutoTrigger` 仍不会误拦截
6. 非用户意图 generation 在 `ignoreAutoTrigger=true` 时仍继续被拦住

### 验收标准

1. 不产生旧消息误执行
2. 正常回复仍可稳定通过 confirmed trigger 进入执行

---

## 八、专项风险与回退策略

### 8.1 风险

1. baseline 机制增强后，可能误伤极快宿主环境下的真实回复确认
2. replay 防线若过严，可能影响某些宿主中 `MESSAGE_RECEIVED` 的合法确认路径

### 8.2 回退策略

1. 所有新增判断都应以**新增字段和新增 skip reason**方式接入，避免直接改坏现有逻辑
2. 新增防线优先走“只增加跳过诊断，不删除既有结构”的方式，便于逐层回退

---

## 九、验收结论模板

后续完成专项补修后，建议统一按以下格式登记：

- 修复日期：
- 宿主环境：
- 是否启用 TavernHelper：
- `GENERATION_STARTED` 竞态结果：通过 / 不通过
- `MESSAGE_RECEIVED` 历史重放结果：通过 / 不通过
- 文档分层整理结果：完成 / 未完成
- 备注：

---

## 十、实施清单

1. 在 `GENERATION_STARTED` 中引入 provisional generation state，同步写入 trace 与基础门控字段。
2. 将 baseline 快照补全改为异步回填，并避免旧 trace 覆盖新 trace。
3. 为 `MESSAGE_RECEIVED` 增加“当前 generation / 合法完成窗口 / replay 拦截”二次确认逻辑。
4. 扩展调试字段，显式标记 baselineResolved、historicalReplayBlocked 等状态。
5. 清理 `docs/API_DOCUMENTATION.md` 中的验收型串层描述。
6. 更新 `docs/HOST_REGRESSION_CHECKLIST.md`，加入高时序与 replay 场景回归项。
7. 在 `docs/OPTIMIZATION_PROGRESS.md` 记录专项施工与验收结果。
8. 若宿主验证暴露“合法用户 regenerate / swipe 被误判”为新问题，则补充显式用户 generation 动作识别与对应回归项。

---

## 十一、2026-03-25 当前实现检查结论

截至当前，自动触发链专项补修已经完成以下几类代码落地：

1. **baseline 竞态补修已落地**  
   `GENERATION_STARTED` 已改为先同步写入 provisional baseline，再异步补齐 resolved baseline；`GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED` 也已接入 resolved baseline 等待逻辑。

2. **历史 replay 防线已落地**  
   `MESSAGE_RECEIVED` 现在不仅要求 `messageId + assistant`，还会校验当前 generation trace、baseline 与合法完成窗口；旧 assistant 消息 replay 会被 `historical_replay_message_received` 或 `message_received_outside_active_generation` 拦住。

3. **用户主动 `regenerate / swipe` 的合法确认路径已恢复**  
   `startedByUserIntent` 不再只依赖“最近是否新增用户楼层”，当前至少已经把 `regenerate / swipe` 视为显式用户意图来源；`getGenerationConfirmationEligibility()` 也已不再把 `startedByUserIntent = false` 当成系统级硬阻断。

4. **诊断观测面已提升到 session 粒度**  
   除 `lastEventDebugSnapshot / lastAutoTriggerSnapshot` 外，`messageSessions / recentSessionHistory` 也已经带上 baseline、generation 用户意图字段；当前还额外加入了一组 **session 创建时冻结字段**，用于区分“当前 generation 状态”和“session 创建时状态”。

5. **宿主回归辅助入口已补齐**  
   当前已提供 `YouYouToolkit.getAutoTriggerDiagnostics(options)`，可直接聚合输出：
   - `summary`
   - `activeSessions`
   - `recentSessionHistory`
   - `lastEventDebugSnapshot`
   - `lastAutoTriggerSnapshot`

6. **N1 比对辅助摘要已继续补齐**  
   `getAutoTriggerDiagnostics().summary` 现还会额外给出 `phaseCounts / consistency / eventBridge / gateState`，`getToolTriggerManagerState()` 也会直接暴露 `activeSessions / registeredEvents / pendingTimerCount`，便于宿主在 A10 ~ A13 中快速判断“当前事件桥接是否就绪”“session 冻结字段与当前 generation 状态是否发生漂移”。

7. **宿主时序回看与导出抓手已补上**  
   当前还额外提供：
   - `recentEventTimeline`：按时间顺序回看 generation、baseline、session phase、UI guard 的最近事件时间线
   - `verdictHints`：对 A10 / A11 / A12 / A13 的快速可疑项提示
   - `YouYouToolkit.exportAutoTriggerDiagnostics(options)`：可直接导出一份 JSON 验收快照，便于留档与对比

8. **工具页诊断入口已同步承接 N1 辅助信息**  
   当前工具配置页中的“最近触发诊断”折叠区，也已能直接展示：
   - N1 快速判读 chips
   - 最近自动触发时间线摘要
   - 一键复制诊断 JSON 的导出按钮

### 当前检查结论

- 从代码结构看，当前未发现新的明显静态阻塞错误。
- 从接口与文档看，`tool-trigger.js`、API 文档、回归清单、施工进度文档已基本对齐。
- 从构建结果看，最近一轮构建已通过，说明当前 bundle 主路径没有被破坏。
- 当前真正剩余的不确定性，已经不再是“代码没写进去”，而是“真实宿主环境里有没有新的时序交叠问题”。

---

## 十二、下一阶段施工方案

下一阶段已经不适合继续“边观察边扩判断”，而应正式按 **N1 -> N1 失败分支 -> N2** 的顺序推进。

### 12.1 推进原则

1. **先验收，不先扩判断**  
   当前首要目标不是继续往 `modules/tool-trigger.js` 叠加条件，而是先确认两轮专项补修在真实宿主中的组合行为是否稳定。

2. **N1 是唯一前置闸门**  
   未完成 N1 前，不进入写回链专项，也不并行扩展额外体验性改动。

3. **失败只做定向补修，不做泛化扩写**  
   若 N1 失败，只允许围绕失败项进入第三轮自动触发定向补修，避免再次把自动触发链改成“越补越宽”的状态。

4. **通过后冻结自动触发主判断面**  
   若 N1 通过，则自动触发链的主判断面视为阶段性冻结，后续重点转向写回链宿主专项。

### 12.2 N1：宿主自动触发链验收阶段

#### 目标

确认当前两轮专项补修在真实宿主中没有互相打架，并正式验证以下 4 个边界已经同时成立：

1. A10：高时序 baseline 不丢失
2. A11：历史 assistant replay 不误触发
3. A12：用户主动 `regenerate / swipe` 不再误拦截
4. A13：非用户意图 generation 在 `ignoreAutoTrigger = true` 时仍被正确拦住

#### 涉及文件 / 模块

- `modules/tool-trigger.js`：自动触发状态机、baseline、session 与确认链主实现
- `modules/app/public-api.js`：`getAutoTriggerDiagnostics()` 聚合诊断出口
- `docs/HOST_REGRESSION_CHECKLIST.md`：A10 ~ A13 的宿主执行基线
- `docs/OPTIMIZATION_PROGRESS.md`：宿主结论登记位置
- `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`：专项策略与下一步入口基线

#### 建议执行顺序

1. 固定宿主环境基线：记录 SillyTavern 版本、是否启用 TavernHelper、`ignoreAutoTrigger` 与 fallback 开关状态。
2. 固定观测面：
   - `[youyou_trigger]` 控制台日志
   - `YouYouToolkit.getAutoTriggerDiagnostics({ historyLimit: 8 })`
   - `YouYouToolkit.getToolTrigger().getToolTriggerManagerState()`
   - 工具配置页中的“最近触发诊断”折叠区
   - 重点比对 `diagnostics.summary.phaseCounts / consistency` 与 `state.eventBridge / gateState`
   - 若需要还原完整时序，再看 `diagnostics.recentEventTimeline`
   - 若需要快速预判优先排查方向，先看 `diagnostics.verdictHints`
   - 若需要快速导出当前快照，直接使用工具页折叠区中的复制按钮，或调用 `YouYouToolkit.exportAutoTriggerDiagnostics()`
3. 执行 A10，确认 `GENERATION_STARTED -> GENERATION_ENDED` 高时序路径下不会因 `missing_generation_baseline` 丢掉真实回复。
4. 执行 A11，确认历史 assistant replay / 热重载 / 重绘不会吸收旧楼层。
5. 执行 A12，确认 `ignoreAutoTrigger = true` 时用户主动 `regenerate / swipe` 仍会被识别为合法用户意图。
6. 执行 A13，确认非用户意图 generation 仍会落到 `ignored_auto_trigger` 或等价拦截结果。
7. 将 A10 ~ A13 结果按统一模板登记到 `docs/OPTIMIZATION_PROGRESS.md`。

#### 通过标准

1. A10 ~ A13 全部通过。
2. `recentSessionHistory` 与 `lastEventDebugSnapshot` 对同一 session 的结论一致。
3. 不出现“实际行为异常，但诊断字段不足以判案”的盲区。
4. 不出现“为了放行 A12 反而放开 A13”这类职责串层。

#### 失败回退点

1. 只要 N1 任一项失败，就**立即停止进入 N2**。
2. 保持当前写回链代码面不扩写，只回到自动触发链做第三轮定向补修。
3. 不允许回退以下已建立主防线：
   - 无 `messageId` 事件不得重新放开
   - speculative `GENERATION_AFTER_COMMANDS` 不得恢复为高权限确认来源
   - `dryRun` 仍必须保持系统级硬阻断

### 12.3 N1 失败时：第三轮自动触发定向补修

#### 触发条件

N1 任一项不通过。

#### 施工目标

仅修失败项对应的边界，不再泛化扩大自动触发判断面。

#### 失败项与补修方向映射

1. **A10 失败**：优先继续收紧 provisional / resolved baseline 等待逻辑，以及旧 trace 覆盖新 trace 的保护条件。
2. **A11 失败**：优先继续增强 `MESSAGE_RECEIVED` 的 generation 归属、合法完成窗口与 session 冻结字段判定。
3. **A12 失败**：优先补齐显式用户 generation 动作识别范围，必要时继续识别宿主特定动作来源，而不是重新放宽全局门控。
4. **A13 失败**：优先重新检查 `ignoreAutoTrigger` 与 `hasConfirmedUserTriggerIntent()` 的职责边界，防止“用户意图判断”和“监听器策略”再次串层。

#### 允许涉及文件

- `modules/tool-trigger.js`
- `modules/app/public-api.js`（仅当诊断聚合入口不足以判案时）
- `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
- `docs/HOST_REGRESSION_CHECKLIST.md`
- `docs/OPTIMIZATION_PROGRESS.md`
- `docs/CHANGELOG.md`
- `docs/API_DOCUMENTATION.md`（仅更新接口/字段语义，不写验收口径）

#### 通过标准

1. 只修改失败项对应逻辑，不扩散到无关路径。
2. 每个新增判断都具备对应诊断字段或 skip reason。
3. 修改后先重跑失败项，再完整重跑 A10 ~ A13。

#### 回退点

若第三轮补修会破坏已通过项，则应回到方案层重新收口，不允许带着高不确定性直接继续推进写回链专项。

### 12.4 N2：写回链宿主专项阶段

#### 前提

N1 通过。

#### 目标

确认自动触发之后，最新 AI 楼层的写回、替换、并存与冲突诊断在真实宿主中稳定可用。

#### 涉及文件 / 模块

- `modules/context-injector.js`：写回目标定位、块替换、冲突检测与最终校验
- `modules/tool-output-service.js`：写回主链、`writebackStatus / writebackDetails / failureStage`
- `modules/tool-registry.js`：运行态写回历史与诊断字段
- `modules/ui/components/tool-config-panel-factory.js`：工具级诊断展示
- `docs/HOST_REGRESSION_CHECKLIST.md`：W1 ~ W4、D1 ~ D3 宿主回归依据
- `docs/OPTIMIZATION_PROGRESS.md`、`docs/CHANGELOG.md`：验收结论与结果沉淀

#### 建议执行顺序

1. W1：单工具写回成功。
2. W2：同工具重复执行替换旧块。
3. W3：多工具同楼层互不覆盖。
4. W4：写回冲突可定位。
5. D1 / D2 / D3：验证全局状态、单工具历史、baseline / UI guard 诊断是否足以支撑发布前排障。
6. 将结果登记到 `docs/OPTIMIZATION_PROGRESS.md`，再决定是否进入发布前验收。

#### 通过标准

1. `writebackStatus`、`writebackDetails` 与 `failureStage` 足以闭环定位问题。
2. 不出现工具块互相覆盖、重复叠加失控或“日志成功但消息正文未刷新”的假阳性。
3. 宿主最终消息正文与控制台诊断能互相印证写回结果。

#### 失败回退点

若 W1 ~ W4 任一主路径失败，应暂停扩展可视化历史面板或体验性增强，只回到 `modules/context-injector.js` / `modules/tool-output-service.js` 主链定向修复。

### 12.5 下一阶段实施清单

1. 将 N1 固定为下一阶段唯一优先任务。
2. 固定宿主环境版本、监听设置与 fallback 开关状态。
3. 在统一观测面下执行 A10，并记录 baseline 竞态结论。
4. 执行 A11，并记录历史 replay 结论。
5. 执行 A12，并记录 `regenerate / swipe` 合法放行结论。
6. 执行 A13，并记录非用户意图 generation 拦截结论。
7. 汇总 A10 ~ A13，形成 N1 通过 / 不通过判定。
8. 若 N1 不通过，仅对失败项进入第三轮自动触发定向补修，并同步更新专项/进度/变更文档。
9. 若 N1 通过，冻结 `tool-trigger.js` 主判断面，转入 N2 写回链宿主专项。
10. 执行 W1 ~ W4 与 D1 ~ D3，并将结果沉淀到进度文档与变更文档。

也就是说，下一阶段真正的优先级已经正式收口为：

> **先做宿主自动触发链验收，再决定是否进入第三轮自动触发补修；若自动触发链通过，则转入写回链专项。**
