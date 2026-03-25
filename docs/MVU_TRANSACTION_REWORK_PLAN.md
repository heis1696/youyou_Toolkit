# YouYou Toolkit MVU 事务化收口施工文档

> 创建时间：2026-03-25  
> 关联文档：`docs/MVU_DEEP_ANALYSIS.md`、`docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`、`docs/HOST_REGRESSION_CHECKLIST.md`、`docs/API_DOCUMENTATION.md`  
> 当前适用基线：2026-03-25 当前主线代码 + 最新宿主证据（同楼层重 roll 不再自动触发）

## 一、文档目的

本文档是下一轮施工的**主计划文档**。

与现有文档分工如下：

- `docs/MVU_DEEP_ANALYSIS.md`：负责解释为什么当前问题要重新收口为事务模型问题
- `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`：保留自动触发专项加固历史、N1 / N2 验收顺序与 baseline / replay 背景
- `docs/MVU_TRANSACTION_REWORK_PLAN.md`：负责描述下一轮真正要怎么改

它解决的不是“所有历史自动触发问题”，而是当前最核心的三条主线：

1. **同楼层 reroll / regenerate / swipe 的合法自动触发收口**
2. **generation-aware dedupe 收口**
3. **工具写回后的宿主刷新确认收口**

---

## 二、问题背景

当前最新宿主现象已经足够清晰：

1. 新用户消息第一次得到 AI 回复时，自动触发可以工作
2. 对同一条用户消息对应的 assistant 楼层执行重 roll / reroll 时，不会再次稳定自动触发
3. 工具结果即使已经写入消息对象，宿主 UI 也不一定即时刷新

这说明当前问题不应再被描述为“自动链偶发时灵时不灵”，而应正式收口为：

### P1. 合法 generation 动作识别不完整

宿主中的 reroll / regenerate / swipe 在代码里还没有形成稳定、可追踪、可验收的统一语义。

### P2. 同一 `messageId` 的多轮 generation 没有被当成独立实例建模

当前 duplicate gate 更接近“某条楼层已经处理过”，而不是“某轮 generation 已经处理过”。

### P3. 写回成功不等于刷新成功

当前 `context-injector.js` 已能较好覆盖数据层写回，但还没有把“宿主 UI 是否已承认刷新”定义为最终阶段。

---

## 三、本轮目标与非目标

## 3.1 本轮目标

### G1. 让同楼层 reroll / regenerate / swipe 成为合法自动触发场景

无论是否产生新的用户楼层，只要是用户主动发起的同楼层再生成，都应能进入合法自动链。

### G2. 将自动去重从 message 级提升为 generation-aware 级

系统应阻断“同一轮 generation 的多事件重复命中”，而不是阻断“同一 messageId 的所有后续生成”。

### G3. 为写回链建立主提交策略与刷新确认阶段

区分：

- 内容已提交
- 宿主写回接口已调用
- 刷新请求已发出
- 宿主展示层已确认刷新

### G4. 对外诊断能够直接回答“reroll 死在哪一层”

后续宿主排查时，应能直接区分：

- 死在用户意图识别
- 死在 duplicate gate
- 死在 baseline / replay 防线
- 死在 writeback commit
- 死在 refresh confirm

## 3.2 本轮非目标

1. 不将项目整体改造成 MVU 变量框架
2. 不重写所有工具配置模型
3. 不继续扩大无证据事件的自动触发判断面
4. 不在本轮引入新的外部依赖
5. 不把旧专项文档中的所有历史议题重新并回主计划

---

## 四、设计原则

1. **先收事务，不先补更多条件**  
   当前最需要的是统一 generation-aware 事务模型，而不是继续孤立增加 skip reason。

2. **同楼层新 generation 必须和旧 generation 显式区分**  
   messageId 可以复用，但 generation 实例不能被复用。

3. **主提交路径必须唯一**  
   写回链可以有 fallback，但必须有明确的主提交策略，不能所有路径同权。

4. **刷新确认必须成为正式阶段，而不是附带副作用**  
   不再把“文本已写进对象”直接等价为“用户已看到更新”。

5. **文档边界必须摆正**  
   分析、施工、验收、API 语义分别落到不同文档，避免再次口径漂移。

---

## 五、当前基线与涉及文件

## 5.1 直接涉及的代码文件

- `modules/tool-trigger.js`
- `modules/app/public-api.js`
- `modules/tool-output-service.js`
- `modules/context-injector.js`
- `modules/ui/components/tool-config-panel-factory.js`

## 5.2 直接涉及的文档文件

- `docs/MVU_DEEP_ANALYSIS.md`
- `docs/MVU_TRANSACTION_REWORK_PLAN.md`
- `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
- `docs/HOST_REGRESSION_CHECKLIST.md`
- `docs/API_DOCUMENTATION.md`
- `docs/OPTIMIZATION_PROGRESS.md`
- `docs/CHANGELOG.md`

## 5.3 当前静态证据摘要

### `modules/tool-trigger.js`

当前可直接观察到：

- `EXPLICIT_USER_GENERATION_TYPES` 只包含 `regenerate / swipe`
- `getAutoTriggerMessageKey(context)` 仍是 `chatId::messageId`
- `lastHandledMessageKey` 仍以 message 级为主语义

### `modules/context-injector.js`

当前 `injectDetailed()` 已能返回：

- `hostUpdateMethod`
- `steps.*`
- `verification.*`

但还缺少正式的 `refreshConfirmed` 语义。

### `modules/app/public-api.js`

当前已能导出聚合诊断，但还没有 generation-aware execution key 级的对外视图。

---

## 六、分阶段施工方案

## Phase T0：文档基线矫正

### 目标

先把文档口径纠正到“符合当前宿主事实”，避免继续在错误前提上推进后续改造。

### 涉及文件

- `docs/MVU_DEEP_ANALYSIS.md`
- `docs/MVU_TRANSACTION_REWORK_PLAN.md`
- `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`
- `docs/HOST_REGRESSION_CHECKLIST.md`
- `docs/API_DOCUMENTATION.md`
- `docs/OPTIMIZATION_PROGRESS.md`
- `docs/CHANGELOG.md`

### 施工内容

1. 新增 MVU 深度解析文档，固定根因模型
2. 新增事务化收口施工文档，作为新主计划
3. 将 `AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md` 降级为历史专项 / N1-N2 验收文档
4. 在回归清单中显式引入“同楼层 reroll”与“刷新确认”关注项
5. 修正 API 文档中对 `regenerate / swipe` 的过强结论表述

### 验收标准

1. 文档之间职责不再重叠
2. 不再出现“文档已宣称恢复，但宿主实测仍未恢复”的表述冲突

---

## Phase T1：generation 动作识别收口

### 目标

把“用户主动重新生成”从模糊的宿主行为，收口为系统内可诊断、可验证、可复用的 generation action 模型。

### 涉及文件

- `modules/tool-trigger.js`
- `modules/app/public-api.js`
- `docs/API_DOCUMENTATION.md`

### 建议改动方向

1. 审计 `resolveGenerationUserIntent(type, params, now)` 的输入来源
2. 扩大对 reroll / regenerate / swipe 家族的识别，不再只依赖两个固定字面值
3. 记录宿主原始 `generationType / generationParams`
4. 将用户意图来源结构化为：
   - `recent_user_trigger_intent`
   - `explicit_generation_action:*`
   - `none`
5. 对外诊断补充：
   - 原始 generation 动作信息
   - 归一化后的 generation action

### 验收标准

1. 同楼层 reroll 不再被直接归入“无用户意图”
2. 宿主里能直接看到本次 generation 到底被识别成了什么动作

### 风险点

1. 不同宿主版本对 reroll 的 type / params 可能不一致
2. 若识别面扩得过宽，可能误放行非用户意图 generation

---

## Phase T2：generation-aware dedupe 重构

### 目标

让系统阻断“同一轮 generation 的重复执行”，而不是阻断“同一 messageId 的所有后续生成”。

### 涉及文件

- `modules/tool-trigger.js`
- `modules/ui/components/tool-config-panel-factory.js`
- `modules/app/public-api.js`
- `docs/API_DOCUMENTATION.md`
- `docs/HOST_REGRESSION_CHECKLIST.md`

### 建议改动方向

1. 用新的 execution key 替代当前 `chatId::messageId`
2. execution key 至少纳入以下维度中的两项：
   - `chatId`
   - `messageId`
   - `generationTraceId`
   - assistant 内容指纹
   - generation 开始时间 / revision 信息
3. 将 `lastHandledMessageKey` 语义升级为“最后处理的 generation execution key”
4. 允许同一 messageId 的新 generation 再次进入自动链
5. 同时保留多 fallback 事件对同一 generation 的幂等保护

### 验收标准

1. 同楼层 reroll / regenerate 可再次自动触发
2. 同一轮 `GENERATION_ENDED / MESSAGE_RECEIVED / GENERATION_AFTER_COMMANDS` 仍不会重复执行

### 风险点

1. 若 execution key 设计过宽，仍可能误杀同楼层新 generation
2. 若 execution key 设计过松，可能放出真正重复执行

---

## Phase T3：writeback commit / refresh confirm 收口

### 目标

让写回链从“兼容性写回尝试集合”，收口为“单一提交策略 + 分层结果 + 刷新确认”。

### 涉及文件

- `modules/context-injector.js`
- `modules/tool-output-service.js`
- `modules/app/public-api.js`
- `docs/API_DOCUMENTATION.md`

### 建议改动方向

1. 定义唯一主提交策略，例如：
   - 首选 `setChatMessages(..., { refresh: 'affected' })`
   - 次选 `setChatMessage()`
   - 最后才是 local sync + `MESSAGE_UPDATED`
2. 将写回结果拆成：
   - `contentCommitted`
   - `hostCommitApplied`
   - `refreshRequested`
   - `refreshConfirmed`
3. 将当前 `writebackDetails.steps.*` 与新阶段语义对齐
4. 对外暴露 refresh confirm 结果

### 验收标准

1. 工具结果写回后，无需手动刷新即可稳定出现在宿主 UI 中
2. 若失败，可明确知道是内容提交、宿主写回还是刷新确认失败

### 风险点

1. 不同宿主版本对 `setChatMessages` / `setChatMessage` 的刷新行为差异较大
2. 若刷新确认设计过重，可能引入新的时序等待成本

---

## Phase T4：事务级诊断与宿主验收冻结

### 目标

把本轮改造的效果沉淀为“宿主可直接判案”的诊断视图和回归矩阵。

### 涉及文件

- `modules/app/public-api.js`
- `modules/ui/components/tool-config-panel-factory.js`
- `docs/HOST_REGRESSION_CHECKLIST.md`
- `docs/OPTIMIZATION_PROGRESS.md`
- `docs/CHANGELOG.md`

### 建议改动方向

1. 暴露 transaction / generation-aware 诊断接口
2. 工具页诊断区增加：
   - raw generation action
   - execution key
   - refresh confirm
3. 回归清单新增：
   - 同楼层 reroll / regenerate
   - swipe
   - generation-aware dedupe
   - 写回后 UI 即时刷新确认

### 验收标准

1. reroll / regenerate / swipe 通过
2. duplicate gate 不再误杀同楼层新 generation
3. 写回后 UI 刷新闭环通过
4. 诊断结果足以直接回答“死在 user intent / dedupe / refresh 哪一层”

---

## 七、回退与边界策略

1. 不允许为放行 reroll 而回退 `MESSAGE_RECEIVED` 的 historical replay 防线
2. 不允许为允许同楼层新 generation 而完全取消 dedupe
3. 不允许为提高刷新成功率而重新把多条写回路径写成“同权成功条件”
4. 所有新阶段字段都必须服务于 transaction 判案，不做额外噪声膨胀

---

## 八、宿主验收口径建议

下一轮宿主验收时，建议至少登记：

- 宿主版本
- 是否启用 TavernHelper
- 原始 generation type / params
- generationStartedByUserIntent
- generationUserIntentSource
- execution key
- last skip reason / duplicate reason
- writebackStatus
- refreshConfirmed
- 是否无需手动刷新即可看到结果

这部分应最终同步回：

- `docs/HOST_REGRESSION_CHECKLIST.md`
- `docs/OPTIMIZATION_PROGRESS.md`
- `docs/CHANGELOG.md`

---

## 九、实施清单

1. 新建 `docs/MVU_DEEP_ANALYSIS.md`，沉淀 MVU 对照结论、当前根因模型与可迁移原则。
2. 新建 `docs/MVU_TRANSACTION_REWORK_PLAN.md`，作为本轮主施工文档，明确 reroll、generation-aware dedupe 与 refresh confirm 三条主线。
3. 修订 `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`，把其职责收口为历史自动触发专项与 N1 / N2 验收档案。
4. 修订 `docs/HOST_REGRESSION_CHECKLIST.md`，把“同楼层 reroll / regenerate / swipe”纳入明确回归口径，并新增后续事务化收口后的计划验收项。
5. 修订 `docs/API_DOCUMENTATION.md`，明确当前代码基线仍使用 message 级 dedupe，并补充与新主施工文档的关联说明。
6. 在 `modules/tool-trigger.js` 中补充原始 generation action 采集与归一化识别字段。
7. 在 `modules/tool-trigger.js` 中将自动去重从 `chatId::messageId` 提升为 generation-aware execution key。
8. 在 `modules/app/public-api.js` 中补充 transaction / generation-aware 诊断导出接口。
9. 在 `modules/context-injector.js` 中定义唯一主提交策略，并为写回链新增 `refreshConfirmed` 分层结果。
10. 在 `modules/tool-output-service.js` 中将返回结果结构收口到 `request -> extract -> writeback -> refresh` 四阶段。
11. 在 `modules/ui/components/tool-config-panel-factory.js` 中接入新的 raw generation action、execution key 与 refresh confirm 诊断显示。
12. 在 `docs/OPTIMIZATION_PROGRESS.md` 中登记本轮从“继续补判断”切换到“MVU 事务化收口”的策略调整。
13. 在 `docs/CHANGELOG.md` 中登记本轮文档体系与后续施工主线切换。
14. 文档与代码均落地后，按新的宿主回归矩阵执行 reroll / regenerate / swipe / refresh confirm 实测并登记结果。

---

## 十、结论

当前阶段最重要的，不是再零散补一条自动触发判断，而是把系统正式带入：

> **generation-aware 事务化收口阶段。**

只有这样，才能真正同时解决：

1. 同楼层 reroll 不再自动触发
2. 同楼层新 generation 被 duplicate gate 误杀
3. 工具结果插入后宿主 UI 不自动刷新

因此，本文件应作为下一轮执行模式下的唯一主施工文档，而不是继续把这些问题分散挂在多个历史专项结论后面。