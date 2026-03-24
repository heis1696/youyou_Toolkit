# 宿主环境回归清单

> 适用范围：SillyTavern / TavernHelper 宿主环境下的自动触发链、写回链与调试链回归验证
> 最后更新：2026-03-24
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

1. 保持 `GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED` 监听开启
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

1. 没有新增 assistant 楼层时，不应执行工具
2. `GENERATION_ENDED` 若未确认到 baseline 之后的新 assistant 楼层，应显示 `no_confirmed_assistant_message`

### A9. `GENERATION_AFTER_COMMANDS` 多次命中只作为同一 session 观察事件

验证步骤：

1. 开启全部 fallback
2. 发送一条用户消息，观察一次完整正常回复流程
3. 关注控制台中同一回复是否被多次命中 `GENERATION_AFTER_COMMANDS`

预期结果：

1. 同一条回复最终只允许执行一次工具链
2. 额外的 `GENERATION_AFTER_COMMANDS` 应只收敛进同一 session 历史
3. 若其中某次没有可确认消息身份，应仅保留 speculative 记录，不应创建新的执行定时器

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

## 四、调试链回归

### D1. 全局状态可读

验证步骤：

1. 执行 `YouYouToolkit.getToolTrigger().getToolTriggerManagerState()`

预期结果：

1. 可看到 `activeSessionCount`
2. 可看到 `recentSessionHistory`
3. 可看到最近一次 `lastAutoTriggerSnapshot / lastEventDebugSnapshot`
4. `recentSessionHistory` / `lastEventDebugSnapshot` 中应可看到 `confirmedAssistantMessageId`、`confirmationSource`、`isSpeculativeSession`、`skipReasonDetailed`

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