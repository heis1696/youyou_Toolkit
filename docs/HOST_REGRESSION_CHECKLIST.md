# 宿主环境回归清单

> 适用范围：SillyTavern / TavernHelper 宿主环境下的自动触发链、写回链与调试链回归验证
> 最后更新：2026-03-26
> 关联模块：`modules/tool-trigger.js`、`modules/tool-output-service.js`、`modules/context-injector.js`

## 一、目的

本清单用于在真实宿主环境中验证以下三类能力是否已经达到发布级可用状态：

1. 自动触发是否只针对正确的 AI 楼层生效
2. 工具输出是否能稳定写回最新 AI 楼层且不互相覆盖
3. 调试信息是否足以定位“没触发 / 重复触发 / 写回失败 / 写回冲突”等问题

---

## 二、自动触发链回归

### A1. 主触发路径可正常工作

验证步骤：

1. 打开自动工具监听
2. 发送一条用户消息
3. 等待 AI 正常回复

预期结果：

1. 控制台出现 `收到生成结束事件` 或等价 `[youyou_trigger]` 日志
2. 控制台出现 `开始处理自动触发`
3. 至少一个命中工具进入执行
4. 不出现“完全无事件”的情况

### A2. 用户消息不会误触发自动工具

验证步骤：

1. 打开 `MESSAGE_RECEIVED` 兜底
2. 发送一条用户消息
3. 观察控制台

预期结果：

1. 若 `MESSAGE_RECEIVED` 命中的是用户楼层，应出现“非 AI 楼层已忽略”或等价事件级日志
2. 不应因此启动工具执行
3. 不应把用户楼层错误识别成最新 AI 回复

### A3. 多兜底事件不会导致重复执行

验证步骤：

1. 保持 `GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED / MESSAGE_UPDATED / MESSAGE_SWIPED` 监听开启
2. 发送一条用户消息并等待 AI 回复

预期结果：

1. 同一条 AI 回复只执行一轮有效工具调用
2. 若多事件都命中，应被收敛到同一 message session
3. 可以允许出现去重日志，但不应真的重复执行工具

### A4. quiet / dryRun 不触发自动链

验证步骤：

1. 触发 quiet 或后台生成
2. 触发宿主会产生的 `dryRun: true` 生成流程（如打开历史记录 / 聊天信息窗口时宿主会抛出的伪生成）
2. 观察控制台和工具 runtime

预期结果：

1. 自动链被跳过
2. quiet / 后台生成可显示为 `quiet_generation`
3. `dryRun` 必须显示为 `dry_run_generation`，且即使关闭 `ignoreQuietGeneration` 也不能继续执行

### A5. 打开旧对话记录不会误触发工具

验证步骤：

1. 打开一个包含历史 assistant 消息的旧聊天
2. 不发送任何新用户消息，只观察控制台与工具 runtime

预期结果：

1. 不应发起任何工具请求
2. 若宿主抛出了 `GENERATION_AFTER_COMMANDS` / 无 messageId 的 `MESSAGE_RECEIVED`，应被记录为 `speculative_generation_after_commands` 或 `ui_side_effect_event`
3. 不应再把旧聊天里的“最后一条 assistant 消息”吸收为本轮目标

### A6. 打开聊天信息窗口 / 消息详情窗口不会误触发工具

验证步骤：

1. 在已有聊天中打开聊天信息窗口
2. 再打开消息详情、消息编辑或类似宿主信息面板
3. 观察控制台与工具 runtime

预期结果：

1. 不应发起任何工具请求
2. 若收到无消息身份事件，应被标记为 `ui_side_effect_event`
3. 若处于 `CHAT_CHANGED / CHAT_CREATED` 后的守卫窗口，应可看到 `uiTransitionGuardActive` 或等价诊断信息

### A7. fallback 开关语义正确

验证步骤：

1. 分别关闭 `useGenerationAfterCommandsFallback` 和 `useMessageReceivedFallback`
2. 重复执行一次完整对话触发

预期结果：

1. 被关闭的事件源不再进入调度
2. 调试历史中可看到 `*_fallback_disabled` 类原因
3. 其余主路径行为保持不回归

### A8. stopGeneration / 停止按钮 / UI 短操作不会误触发工具

验证步骤：

1. 发送一条用户消息并在生成途中点击停止生成
2. 再尝试点击隐藏停止按钮、关闭局部面板等宿主 UI 短操作
3. 观察控制台与工具 runtime

预期结果：

1. 没有新增 assistant 楼层，且也没有确认到当前楼层 / 当前槽位的合法原位更新时，不应执行工具
2. `GENERATION_ENDED` 若既未确认到 baseline 之后的新 assistant 楼层，也未确认到当前楼层 / 当前槽位的合法结果，应显示 `no_confirmed_assistant_message`

### A9. `GENERATION_AFTER_COMMANDS` 多次命中时，只有无法绑定楼层 / 槽位的事件才保持观察态

验证步骤：

1. 开启全部 fallback
2. 发送一条用户消息，观察一次完整正常回复流程
3. 关注控制台中同一回复是否被多次命中 `GENERATION_AFTER_COMMANDS`

预期结果：

1. 同一条回复最终只允许执行一次工具链
2. 额外的 `GENERATION_AFTER_COMMANDS` 应收敛进同一 session 历史
3. 若宿主给出 `messageId`，应允许它直接绑定当前楼层 / 当前 swipe 进入正式确认
4. 缺少 `messageId` 的 `GENERATION_AFTER_COMMANDS` 不应再回退到 baseline assistant 槽位或“最新 assistant”执行；此时只允许保留观察态 / 跳过记录

### A10. `GENERATION_STARTED` 高时序场景下不会丢 baseline

验证步骤：

1. 在宿主环境中触发一条响应非常快的正常回复
2. 关注 `GENERATION_STARTED -> GENERATION_ENDED` 之间是否几乎无延迟
3. 检查控制台与 `getToolTriggerManagerState()`

预期结果：

1. 不应因为 `missing_generation_baseline` 导致真实回复被跳过
2. 应能看到 `baselineResolved` 从 `false` 过渡到 `true`，或等价诊断字段
3. 回复完成后仍能正常确认到 assistant 新楼层，或在 reroll family 下正常确认到当前楼层 / 当前槽位

### A11. 历史 assistant 消息 replay 不会被误当成新回复

验证步骤：

1. 在包含历史 assistant 楼层的聊天中，触发宿主重绘 / 热重载 / 历史消息回放场景
2. 重点观察是否会重新抛出带 `messageId` 的旧 assistant 事件
3. 观察控制台与 `recentSessionHistory`

预期结果：

1. 不应发起任何旧消息工具执行
2. 若命中历史 replay，应出现 `historical_replay_message_received` 或 `message_received_outside_active_generation`
3. 调试快照中应可看到 `historicalReplayBlocked` 或等价诊断字段

### A12. 用户主动 `regenerate / reroll / swipe` 不会再被误判为自动触发

验证步骤：

1. 打开 `ignoreAutoTrigger`
2. 先让一条用户消息完成一次正常 AI 回复
3. 对同一条已生成 assistant 楼层执行一次 `regenerate` / `reroll`
4. 再执行一次 `swipe` 切换生成
5. 观察控制台、`lastEventDebugSnapshot`、`lastAutoTriggerSnapshot` 与最终工具执行结果

预期结果：

1. `GENERATION_STARTED` 不应再因为“最近没有新的用户消息”而被判定为无用户意图
2. 调试快照中应能看到 `generationStartedByUserIntent = true`
3. 调试快照中应能看到 `generationUserIntentSource = explicit_generation_action:regenerate`、`explicit_generation_action:swipe` 或等价诊断字段
4. 对同一楼层执行 `regenerate / reroll` 时，不应仅因为“没有新的 `MESSAGE_SENT`”而被拦截
5. 若宿主复用了同一个 `messageId / chatIndex`，也不应仅因为旧的“必须新增 assistant 楼层”模型而阻断新的合法 generation
6. 若宿主给出了 `messageId`，确认链应直接按这层处理，而不是继续要求“必须看到 baseline 后新增 assistant 楼层”
7. 若宿主没有给出新楼层，但当前 generation 属于 reroll family，也应允许直接绑定 baseline assistant 槽位的当前状态
8. 调试对象中应能看到 `confirmationMode = same_slot_revision`、或至少看到 `sameSlotRevisionCandidate / sameSlotRevisionConfirmed / sameSlotRevisionSource` 这组字段
9. 诊断对象中还应能看到 `generationMessageBindingSource / confirmedAssistantSwipeId / effectiveSwipeId`
10. 诊断对象中还应能看到 `slotBindingKey / slotRevisionKey / slotTransactionId / lastHandledSlotRevisionKey`
11. 诊断对象中还应能看到 `sourceMessageId / sourceSwipeId`
12. 只要当前 generation 属于合法 `reroll / regenerate / swipe`，即使宿主是**同楼层重写**而不是新增楼层，也应允许进入自动工具执行链

### A13. `ignoreAutoTrigger` 仍能拦住非用户意图 generation

验证步骤：

1. 保持 `ignoreAutoTrigger = true`
2. 触发一次宿主内部的自动 generation / 插件 generation（非 `regenerate / swipe`，也不伴随最近用户发送）
3. 观察控制台与 `recentSessionHistory`

预期结果：

1. 该 generation 不应进入工具执行链
2. 应出现 `ignored_auto_trigger` 或等价跳过原因
3. 调试快照中 `generationStartedByUserIntent` 应为 `false`
4. 若调试字段可见，应能看到 `generationUserIntentSource = none` 或等价诊断字段

---

## 三、写回链回归

### W1. 单工具写回成功

验证步骤：

1. 让一个 `post_response_api` 工具成功执行
2. 检查最新 AI 楼层正文

预期结果：

1. 工具输出被写入最新 AI 楼层
2. `writebackStatus = success`
3. `writebackDetails.verification.textIncludesContent = true`
4. `writebackDetails.verification.mirrorStored = true`

### W2. 同工具重复执行时可替换旧块

验证步骤：

1. 对同一条 AI 回复连续执行同一个工具两次

预期结果：

1. 第二次优先替换该工具上一次写入块
2. 不应无限叠加重复内容
3. `replacedExistingBlock = true` 或等价诊断成立

### W3. 多工具写入同一楼层时互不覆盖

验证步骤：

1. 让两个以上工具都对同一条 AI 回复执行

预期结果：

1. 各自输出块都保留
2. 不应因为新工具写回把旧工具块清空
3. `preservedOtherToolBlocks = true`

### W4. 写回冲突可定位

验证步骤：

1. 人为构造不标准或手工修改后的旧工具块，再执行写回

预期结果：

1. 工具仍尽量保守写回
2. 若旧块找不到或其他块被影响，应有 `conflictDetected / conflictReason`
3. 不应无诊断地静默覆盖

---

## 三点五、下一轮事务化收口后拟新增的回归项

以下项目用于承接 `docs/MVU_TRANSACTION_REWORK_PLAN.md` 中的新主线。当前它们首先作为**规划中的回归项**存在；待对应代码真正落地后，再升级为发布前必跑项。

### A14. generation-aware dedupe 不会再误杀同楼层新 generation

验证步骤：

1. 先让某条用户消息完成一次正常 AI 回复并成功触发工具
2. 对同一 assistant 楼层连续执行一次 `regenerate / reroll`
3. 观察诊断中的 execution key、skip reason 与最终执行结果

规划预期：

1. 去重应阻断“同一轮 generation 的重复事件”，而不是阻断“同一 `messageId` 的所有后续 generation”
2. 诊断中应能直接看出本次命中的 generation-aware execution key
3. execution key 现在应直接等价于 `slotRevisionKey`，体现 `chatId + messageId + effectiveSwipeId + assistantContentFingerprint` 的原位模型，而不再继续绑定 generationTrace
4. 诊断中还应能看到最近已处理 execution key 列表或等价轨迹，用于判断是否真命中同轮 generation 幂等保护
5. 若被拦截，应能明确区分“旧式 duplicate gate”还是“新 execution key 判定”

### W5. 工具写回后 UI 即时可见，无需手动刷新

验证步骤：

1. 触发一个 `post_response_api` 工具正常执行
2. 在不手动刷新页面的前提下观察最新 AI 楼层
3. 对照 `writebackDetails` 与后续 refresh 相关诊断字段

规划预期：

1. 工具输出写回后应立即在 UI 中可见
2. 诊断中应能区分“内容已提交”“宿主写回已执行”“刷新已确认”三个层次
3. 诊断中应能直接看到主提交策略与实际提交策略
4. 诊断中应能直接看到 `refresh.requestMethods` 与 `refresh.confirmedBy`
5. 若失败，应能直接定位失败发生在 commit 还是 refresh confirm 阶段

### D4. raw generation action / execution key / refresh confirm 可读

验证步骤：

1. 分别触发一次新消息首轮生成、同楼层 reroll、swipe
2. 查看聚合诊断对象与工具页折叠区

规划预期：

1. 可直接读取宿主原始 generation 动作信息
2. 可直接读取 generation-aware execution key
3. 可直接读取最近已处理 execution key 轨迹
4. 可直接读取 `slotBindingKey / slotRevisionKey / slotTransactionId / generationMessageBindingSource / confirmedAssistantSwipeId / effectiveSwipeId`
5. 可直接读取 `sourceMessageId / sourceSwipeId`
6. 可直接读取 refresh confirm 结果，而不再只看到写回文本校验
7. 可直接读取主提交策略 / 实际提交策略，而不再只看到 hostUpdateMethod
8. 可直接读取 `refresh.requestMethods / refresh.confirmedBy`

---

## 四、调试链回归

### D1. 全局状态可读

验证步骤：

1. 执行 `YouYouToolkit.getToolTrigger().getToolTriggerManagerState()`

预期结果：

1. 可看到 `activeSessionCount`
2. 可看到 `activeSessions`
3. 可看到 `recentSessionHistory`
4. 可看到最近一次 `lastAutoTriggerSnapshot / lastEventDebugSnapshot`
5. `recentSessionHistory` / `lastEventDebugSnapshot` 中应可看到 `confirmedAssistantMessageId`、`confirmationSource`、`isSpeculativeSession`、`skipReasonDetailed`
6. 本轮补修后还应可看到 `baselineResolved`、`baselineResolutionAt`、`historicalReplayBlocked`、`historicalReplayReason`
7. 针对第二轮专项补修，`recentSessionHistory` / `lastEventDebugSnapshot` 中还应可看到 `generationStartedByUserIntent`、`generationUserIntentSource`、`generationUserIntentDetail`、`lastUserIntentSource`
8. 针对本轮 N1 验收辅助增强，`activeSessions / recentSessionHistory` 中还应可看到 `driftDetected`、`generationTraceDrifted`、`generationUserIntentDrifted`、`baselineResolvedStateChanged`、`baselineResolutionAdvancedSinceSessionCreation`、`driftReasons`
9. `getToolTriggerManagerState()` 还应额外提供 `registeredEvents`、`pendingTimerCount`、`eventBridge`、`gateState`
10. `YouYouToolkit.getAutoTriggerDiagnostics().summary` 还应额外提供 `phaseCounts` 与 `consistency`
11. `getToolTriggerManagerState()` / `getAutoTriggerDiagnostics()` 还应可看到 `recentEventTimeline`
12. `YouYouToolkit.getAutoTriggerDiagnostics()` 还应提供 `verdictHints`
13. `getToolTriggerManagerState()` / `getAutoTriggerDiagnostics()` 还应可看到 `handledExecutionKeyCount / recentHandledExecutionKeys`
14. `getToolTriggerManagerState()` / `getAutoTriggerDiagnostics()` 还应可看到 `lastHandledSlotRevisionKey / writebackGuardCount / lastSlotRevisionKey`

### D3. generation baseline / UI guard 诊断可读

验证步骤：

1. 先执行一次正常回复
2. 再打开旧对话或聊天信息窗口
3. 调用 `YouYouToolkit.getToolTrigger().getToolTriggerManagerState()` 或查看控制台快照

预期结果：

1. 能看到 `generationTraceId`
2. 能看到 baseline 相关字段，如 `generationBaselineMessageCount / generationBaselineAssistantId`
3. 能区分本次是 `message_received`、`generation_ended` 还是 `none` 确认
4. UI 守卫场景下应能看到 `uiTransitionGuardActive` 或等价诊断

### D2. 单工具历史可读

验证步骤：

1. 打开任意工具配置页的“最近触发诊断”

预期结果：

1. 除最近一次诊断外，还能看到最近触发历史
2. 还能看到最近写回历史
3. 每条历史至少可看到时间、事件、消息、trace、路径/写回状态

---

## 五、发布前结论记录

每次完成一轮宿主回归后，请补记录：

- 测试日期：
- 宿主环境版本：
- 是否启用 TavernHelper：
- 自动触发链结果：通过 / 不通过
- 写回链结果：通过 / 不通过
- 调试链结果：通过 / 不通过
- 备注：

---

## 六、宿主侧执行建议（A10 ~ A13 专用）

### 6.1 建议先打开的控制台观测点

进入宿主后，建议至少同时观察：

1. `[youyou_trigger]` 控制台日志
2. `YouYouToolkit.getToolTrigger().getToolTriggerManagerState()`
3. `YouYouToolkit.getAutoTriggerDiagnostics()`
4. 工具配置页中的“最近触发诊断”折叠区（现已可直接看到 N1 快速判读 chips、最近自动触发时间线摘要，并可一键复制诊断 JSON）

### 6.2 建议使用的控制台辅助命令

可直接在宿主控制台执行：

```javascript
const trigger = YouYouToolkit.getToolTrigger();

function dumpAutoTriggerState() {
  const state = trigger.getToolTriggerManagerState();
  const diagnostics = YouYouToolkit.getAutoTriggerDiagnostics({ historyLimit: 8 });
  console.log('lastEventDebugSnapshot', state.lastEventDebugSnapshot);
  console.log('lastAutoTriggerSnapshot', state.lastAutoTriggerSnapshot);
  console.log('eventBridge', state.eventBridge);
  console.log('gateState', state.gateState);
  console.log('diagnostics.summary', diagnostics.summary);
  console.log('diagnostics.phaseCounts', diagnostics.summary?.phaseCounts);
  console.log('diagnostics.consistency', diagnostics.summary?.consistency);
  console.log('diagnostics.verdictHints', diagnostics.verdictHints);
  console.table(diagnostics.activeSessions || []);
  console.table(diagnostics.recentSessionHistory || []);
  console.table(diagnostics.recentEventTimeline || []);
  return { state, diagnostics };
}

dumpAutoTriggerState();
```

若要重点观察第二轮专项补修结果，可关注以下字段：

- `generationStartedByUserIntent`
- `generationUserIntentSource`
- `generationUserIntentDetail`
- `baselineResolved`
- `historicalReplayBlocked`
- `historicalReplayReason`
- `confirmationSource`
- `slotRevisionKey`
- `lastHandledSlotRevisionKey`
- `slotBindingKey`
- `slotTransactionId`
- `sourceMessageId`
- `sourceSwipeId`
- `writebackGuardCount`
- `driftDetected`
- `generationTraceDrifted`
- `generationUserIntentDrifted`
- `baselineResolvedStateChanged`
- `baselineResolutionAdvancedSinceSessionCreation`
- `driftReasons`

若宿主里同一条消息被多个 fallback 事件连续命中，建议优先看：

- `diagnostics.summary`
- `diagnostics.summary.phaseCounts`
- `diagnostics.summary.consistency`
- `diagnostics.verdictHints`
- `diagnostics.activeSessions`
- `diagnostics.recentSessionHistory`
- `diagnostics.recentEventTimeline`
- `state.eventBridge`
- `state.gateState`

其中 `diagnostics.activeSessions / recentSessionHistory` 更适合直接比对“冻结版 session generation 字段”和“当前 generation 字段”是否一致。

如果 `diagnostics.summary.consistency` 中的 drift 计数明显增加，建议进一步对照：

- `sessionGenerationTraceId` vs `generationTraceId`
- `sessionGenerationUserIntentSource` vs `generationUserIntentSource`
- `sessionBaselineResolvedAtCreation` vs `baselineResolved`
- `sessionBaselineResolutionAtCreation` vs `baselineResolutionAt`

用于判断这到底是“baseline 正常从 provisional 进入 resolved”，还是 session 归属真的漂到了别的 generation 上。

若还原单次异常时序困难，建议再看：

- `diagnostics.recentEventTimeline`

它更适合直接回答：

- baseline 是在确认前还是确认后才 resolved
- 某次 session 先进入了 `scheduled` 还是先被 `ignored/skipped`
- UI guard 与 generation 事件是否发生了时序交叠

若需要复制一份完整快照给日志或 issue，可直接执行：

```javascript
copy(JSON.stringify(YouYouToolkit.exportAutoTriggerDiagnostics({ historyLimit: 8 }), null, 2));
```

### 6.3 A12 / A13 的重点判读方式

#### A12：用户主动 `regenerate / reroll / swipe`

重点确认：

1. `GENERATION_STARTED` 后，`generationStartedByUserIntent` 应为 `true`
2. `generationUserIntentSource` 应出现 `explicit_generation_action:regenerate` 或 `explicit_generation_action:swipe`
3. 对同一楼层执行 `regenerate / reroll` 时，不应仅因为缺少新的 `MESSAGE_SENT` 或“未新增 assistant 楼层”就被提前挡住
4. 若宿主复用了同一 `messageId / chatIndex` 并原位重写楼层，应看到 `confirmationMode = same_slot_revision` 或等价 same-slot revision 诊断字段
5. 若后续确实新增 assistant 楼层或确认到 same-slot revision，不应再被 `ignored_auto_trigger` 拦住

#### A13：非用户意图 generation

重点确认：

1. `generationStartedByUserIntent` 应保持 `false`
2. `generationUserIntentSource` 应为 `none` 或等价诊断
3. 在 `ignoreAutoTrigger = true` 时，最终应落到 `ignored_auto_trigger`

### 6.4 建议的登记模板

完成 A10 ~ A13 后，建议至少记录：

```text
- 测试场景：A10 / A11 / A12 / A13
- 宿主操作：
- 控制台关键日志：
- lastEventDebugSnapshot 摘要：
- recentSessionHistory 结论：
- 是否符合预期：通过 / 不通过
- 备注：
```

---

## 七、N1 宿主自动触发链验收登记模板

为避免 N1 验收结果仍停留在口头结论，建议完成 A10 ~ A13 后至少补一份统一登记。

如需直接填写，可复制：`docs/N1_AUTO_TRIGGER_ACCEPTANCE_RECORD.md`

### 7.1 总结模板

```text
- 验收日期：
- 宿主环境版本：
- 是否启用 TavernHelper：
- listener 关键开关：
  - ignoreAutoTrigger =
  - useGenerationAfterCommandsFallback =
  - useMessageReceivedFallback =
- A10：通过 / 不通过
- A11：通过 / 不通过
- A12：通过 / 不通过
- A13：通过 / 不通过
- 关键诊断结论：
  - diagnostics.summary.phaseCounts =
  - diagnostics.summary.consistency =
  - diagnostics.verdictHints =
- 是否进入下一阶段：
  - N1 失败 -> 回到第三轮自动触发定向补修
  - N1 通过 -> 进入 N2 写回链宿主专项
- 备注：
```

### 7.2 登记要求

完成 N1 后，建议至少同步两处：

1. 将验收结果写入 `docs/OPTIMIZATION_PROGRESS.md` 的最新施工日志
2. 若 N1 失败，将失败项与补修方向补回 `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`

这样可以避免“宿主已经测过，但结论没有沉淀到正式文档里”的情况再次出现。