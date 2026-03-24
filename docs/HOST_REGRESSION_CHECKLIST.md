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
2. 观察控制台和工具 runtime

预期结果：

1. 自动链被跳过
2. 跳过原因应明确显示为 `quiet_generation` 或等价说明

### A5. fallback 开关语义正确

验证步骤：

1. 分别关闭 `useGenerationAfterCommandsFallback` 和 `useMessageReceivedFallback`
2. 重复执行一次完整对话触发

预期结果：

1. 被关闭的事件源不再进入调度
2. 调试历史中可看到 `*_fallback_disabled` 类原因
3. 其余主路径行为保持不回归

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