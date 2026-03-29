# 宿主环境回归清单

> 适用范围：SillyTavern / TavernHelper 宿主环境下的自动触发、手动执行、提取预览与写回刷新闭环回归验证
> 最后更新：2026-03-29
> 关联模块：`modules/tool-automation-service.js`、`modules/tool-execution-context.js`、`modules/tool-trigger.js`、`modules/tool-output-service.js`、`modules/context-injector.js`

## 一、目的

本清单用于在真实宿主环境中验证以下四类能力是否达到可用状态：

1. 自动触发是否能在收到新的 assistant 楼层后稳定启动
2. 手动执行是否能正确读取最新 assistant 楼层并完成请求
3. 工具输出是否能稳定写回目标 AI 楼层且刷新确认闭环成立
4. 提取预览与运行态诊断是否足以定位执行 / 写回问题

---

## 二、自动触发链回归

### A0. `post_response_api` 自动工具会在新 assistant 楼层到达后启动

验证步骤：

1. 在全局设置中启用自动化
2. 在某个 `post_response_api` 工具中启用“收到 assistant 新楼层后自动执行”
3. 让宿主生成一条新的 assistant 回复

预期结果：

1. 自动服务在稳定等待后进入处理
2. 命中的工具开始额外模型请求
3. 工具结果写回同一条 assistant 楼层
4. 只有 `refreshConfirmed === true` 时才应视为成功

### A1. toolkit 自身写回不会造成自动链自触发死循环

验证步骤：

1. 对同一条新 assistant 楼层观察自动工具执行全过程
2. 记录工具完成后的后续事件

预期结果：

1. 工具完成写回后不会再次把自己的追加内容视为新的 assistant 原文
2. 同一 revision 只会被自动处理一次
3. 运行态的 `lastAutoRevisionKey` 与 skip reason 可解释

### A2. reroll / regenerate / swipe 会被识别为新的 assistant revision

验证步骤：

1. 对同一消息执行 reroll / regenerate / swipe
2. 观察自动工具是否重新执行

预期结果：

1. 新 revision 会重新进入自动链
2. 旧 revision 的 handled 状态不会错误阻断新 revision
3. `slotRevisionKey` / `lastAutoSwipeId` 会随 revision 更新

### A3. 同一条 assistant 楼层命中多个自动工具时保持串行写回

验证步骤：

1. 启用两个及以上自动 `post_response_api` 工具
2. 生成一条新的 assistant 回复
3. 观察写回顺序和最终结果

预期结果：

1. 同一 assistant 槽位的自动写回按顺序完成
2. 不会互相覆盖
3. 后一个工具不会把前一个工具追加后的文本当作自己的 assistant 原始输入

---

## 三、手动执行链回归

### A1. `post_response_api` 手动执行可正常工作

验证步骤：

1. 打开一个已配置好 API 预设的工具
2. 选择 `post_response_api`
3. 点击“立即执行一次”

预期结果：

1. 顶部出现开始执行提示
2. 工具请求成功返回
3. 工具结果写回最新 assistant 楼层
4. 顶部出现成功或失败提示，不出现静默无反馈

### A2. `follow_ai` 模式下仍可手动执行

验证步骤：

1. 打开一个工具
2. 选择 `follow_ai`
3. 点击“立即执行一次”

预期结果：

1. 不依赖任何旧自动监听逻辑
2. 仍能进入手动执行路径
3. 若该模式走 compatibility 回退，应能给出明确成功或失败结果

### A3. 禁用工具后无法手动执行

验证步骤：

1. 在工具列表里禁用某个工具
2. 回到工具页点击“立即执行一次”

预期结果：

1. 顶部提示工具未启用
2. 不应真正发出请求
3. runtime 只更新最小必要字段，不应伪造一次真实执行

---

## 四、提取预览回归

### B1. 测试提取可读取最近消息

验证步骤：

1. 打开一个工具
2. 点击“测试提取”

预期结果：

1. 能读取最近消息原文
2. 能展示正文提取结果
3. 能展示工具提取结果
4. 不应依赖旧 trigger 字段或旧自动监听状态

### B2. 多字段消息内容兼容正常

验证步骤：

1. 在宿主环境中切换不同消息来源 / 扩展环境
2. 点击“测试提取”

预期结果：

1. `mes / message / content / text` 等不同消息字段能被兼容读取
2. 不会错误回退到旧消息或空消息

---

## 五、写回链回归

### C1. 写回目标仍是最新 assistant 楼层

验证步骤：

1. 生成一条新的 assistant 回复
2. 手动执行一个 `post_response_api` 工具

预期结果：

1. 写回目标是当前最新 assistant 楼层
2. 不写入用户消息
3. 不写入旧楼层

### C2. 写回后宿主刷新确认正常

验证步骤：

1. 执行一次成功的手动工具
2. 观察宿主界面是否同步显示更新后的内容

预期结果：

1. 若请求成功且内容已提交，界面应能刷新到新内容
2. runtime 中应能记录 refresh 请求与确认结果
3. 若刷新失败，应有明确 failureStage / writebackStatus 可排查

### C3. 多工具连续写回不互相覆盖

验证步骤：

1. 对同一条 assistant 消息连续手动执行两个工具
2. 观察最终写回结果

预期结果：

1. 每次执行都基于正确的当前楼层上下文
2. 不会因为 messageId / swipe 识别错误写到别处
3. runtime 中 slot / source 诊断字段应保持一致可解释

---

## 六、运行态诊断检查

重点查看工具 runtime 是否能正确反映：

- `lastRunAt`
- `lastStatus`
- `lastError`
- `lastExecutionPath`
- `lastWritebackStatus`
- `lastFailureStage`
- `lastSlotBindingKey`
- `lastSlotRevisionKey`
- `lastSlotTransactionId`
- `lastSourceMessageId`
- `lastSourceSwipeId`
- `lastTraceId`

若执行成功，还应能看到：
- `lastContentCommitted`
- `lastHostCommitApplied`
- `lastRefreshRequested`
- `lastRefreshConfirmed`
- `lastAppliedCommitMethod`
- `lastRefreshConfirmedBy`

---

## 七、最小回归结论模板

可按以下格式记录：

- 宿主版本：
- 是否启用 TavernHelper：
- 测试工具：
- A1：通过 / 不通过
- A2：通过 / 不通过
- A3：通过 / 不通过
- B1：通过 / 不通过
- B2：通过 / 不通过
- C1：通过 / 不通过
- C2：通过 / 不通过
- C3：通过 / 不通过
- 备注：
