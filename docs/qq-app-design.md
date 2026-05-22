# Mini-QQ App 设计文档

> 创建日期: 2026-05-22
> 关联议题: PHASE3_ARCHITECTURE.md #14（剧情外小剧场）的首发落地形态
> 状态: ✅ 设计阶段（25 条决策已锁定，未进入实现）
> 上层依赖: 浮球模块（PHASE3 #11，已在 v1.0.247 完成手机壳形态）

---

## 1. 背景与目标

v1.0.247 后浮球已经从"列表菜单"重写为"手机壳形态"（notch + statusbar + 4 列图标网格 + dock + home indicator），为后续在浮球上挂载多个沉浸式 App 模块铺好了地基。

**Mini-QQ App** 是这个 App 体系的首发实例，定位是"一个迷你酒馆"：

- 用户可以在 QQ App 里管理好友（≈ 角色卡）和群（≈ 群聊）
- 好友可以被组合到不同的群里，每个群有自己的氛围与提示词配置
- 群里产生的对话可以选择性地注入到主 AI 的 bypass，让主剧情感知到群活动
- 整个系统是 Skill 风格的：触发后由 AI 自己根据好友描述决定谁该响应、说什么

这份文档把设计阶段的 25 条决策固化成实施前的契约。

### 1.1 上位关联

| 上层概念 | 状态 | 关系 |
|---------|------|------|
| App 框架（跨 App 共享的抽象层） | 本文档定 | 设计在第 3 节，QQ 只是首个实例 |
| 浮球模块（FloatingBall） | 已实现（v1.0.247） | 提供手机壳形态 + registerItem API |
| 项目 api-connection / bypass-manager | 已存在 | QQ App 直接复用，不另起 |
| 项目 regex-extractor / variable-resolver | 已存在 | 用户自定义 prompt + 解析模式复用 |

---

## 2. 设计哲学

整套设计有一个**贯穿始终的哲学**：核心架构由项目固化，**行为细节交给用户**。

具体表现：

- Phase 1 选人 prompt 模板 → 用户写
- Phase 1 输出解析正则 → 用户写
- 心跳上下文模板 → 用户写
- 群氛围、好友追加 → 用户写
- 注入文本格式 + 配套"格式说明 prompt" → 用户写
- 触发源组合 → 用户多选
- 异构触发合并策略 → 用户每群可选
- 注入时机 → 用户每群可选
- 频率上限 → 用户每群可设

跟项目现有工具系统、表格工作台、bypass 预设的哲学完全对齐。

---

## 3. 25 条决策总览

| # | 类别 | 决策 |
|---|------|------|
| 1 | 框架 | 应用即顶层单元（撤销外层"场景"概念） |
| 2 | 框架 | App 数据二分：影响剧情（注入 bypass）/ 不影响剧情（仅 UI） |
| 3 | 框架 | App 支持多副本（v1 在 QQ 上不启用） |
| 4 | 数据 | QQ App = 迷你酒馆（好友 + 群） |
| 5 | 数据 | 好友三来源：手动 / AI 描述生成 / 抓取主聊正文 N 层识别 + 用户挑选 |
| 6 | 数据 | 群可拉已有好友 |
| 7 | 数据 | 好友在每个群有"追加提示词"（驱动 Phase 1） |
| 8 | 数据 | 群级氛围提示词 |
| 9 | 触发 | Skill 风格触发：Phase 1 基于描述决定谁响应 |
| 10 | 注入 | 注入开关按群独立 |
| 11 | 触发 | 触发源多选：用户消息 + 心跳 + 酒馆事件常量 |
| 12 | 触发 | 多触发阈值窗口合并（debounce） |
| 13 | 数据 | 存储分层：好友/群全局共享 / 聊天记录按 chatId 隔离 / 导入导出后续 |
| 14 | 数据 | 消息 schema = `{sender, content, timestamp, type, replyTo?}`，type ∈ text/image/voice/redpacket/system |
| 15 | 注入 | 注入位置 = worldbook entry 同步（复用 `table-engine` worldbook 同步基础设施）— v1.0.247 审查后从 bypass-manager 改为 worldbook，原因见 §7.1 |
| 16 | 注入 | 文本格式 = 标记块默认 / 自定义模板可覆盖 + 配套独立"格式说明 prompt" |
| 17 | 安全 | 频率上限按群独立 + 可选日额熔断 |
| 18 | 触发 | 心跳上下文用自定义模板（`{{groupHistory}}` / `{{mainStory}}` / ...） |
| 19 | UI | 手机壳里 QQ 用 iOS 视图栈（push/pop） |
| 20 | 触发 | Phase 1 输出解析 = 用户自定义 prompt 模板 + 正则（复用 regex-extractor） |
| 21 | 触发 | 异构触发合并 = 每群可选（优先级抽顶 / 复合上下文，默认复合） |
| 22 | 注入 | 注入时机每群可选：持续滑动 / 事件一次性（默认）/ 用户手动推送 |
| 23 | 数据 | NPC 关系仅 schema 预留（`relations` 字段不破坏 v1） |
| 24 | 安全 | 失败自动重试 N 次（可配） |
| 25 | 数据 | v1 单 QQ 实例（不启用 #3） |
| Q1 | AI | 复用项目现有 api 预设 + bypass-manager |
| Q2 | AI | Phase 2 多人响应 = 串行 |

---

## 4. 应用框架层（跨 App 通用）

### 4.1 App 即顶层单元（#1）

撤销前期讨论中的"场景 → App → 实例"三层模型。最终模型：

```
App 类型（QQ / Forum / 小红书 / ...）
 ├─ App 实例（#3 多副本能力，v1 在 QQ 上 = 单实例）
 │   ├─ 业务数据（QQ：好友/群/记录）
 │   └─ 提示词配置
```

每个 App 类型独立注册到浮球菜单（作为一个 icon），打开后是该 App 的沉浸视图。

### 4.2 数据二分（#2）

App 数据分两类：

- **影响剧情**：会作为 bypass 注入到主 AI 请求里。QQ 的群对话默认走这条
- **不影响剧情**：仅 UI 内显示，不影响主 AI。QQ 的私聊（后续设计）走这条

二分体现在 schema 上：影响剧情的数据带 `injectEnabled` 字段，注入相关配置在它身上。

### 4.3 多副本（#3）

App 类型可被实例化多次（"游戏 QQ" / "工作 QQ" / "技术论坛" / "情感论坛"），每个实例独立数据 + 独立提示词。

**v1 在 QQ 上不启用**（#25），但 schema 预留 `instanceId` 字段以便未来无痛升级（类似 #23 思路）。

---

## 5. QQ 数据模型

### 5.1 实体清单

| 实体 | 范围 | 关键字段 |
|------|------|---------|
| Friend | 全局共享（#13） | id / name / avatar / description / promptInGroup / relations |
| Group | 全局共享（#13） | id / name / atmosphere / memberIds / triggerSources / injectConfig / rateLimitConfig |
| Message | 按 chatId 隔离（#13） | id / groupId / chatId / sender / content / timestamp / type / replyTo |
| Settings | 全局 + 按群 | 触发合并策略 / 失败重试次数 / 心跳模板 / 注入文本格式模板 |

### 5.2 Friend schema

```js
{
  id: 'friend-uuid',
  name: '小红',
  avatar: 'url 或 emoji 或 SillyTavern 角色卡 ID',
  description: '简要描述，用于 Phase 1 选人',
  globalPrompt: '所有群通用的人设追加',
  relations: {  // #23 仅预留
    'friend-other-id': { type: '恋人' | '敌人' | '同事' | ...,  note: '' }
  },
  source: 'manual' | 'ai-generated' | 'extracted-from-chat',
  createdAt: ts,
  updatedAt: ts,
}
```

### 5.3 Group schema

```js
{
  id: 'group-uuid',
  name: '游戏群',
  atmosphere: '群氛围提示词',
  memberIds: ['friend-id-1', 'friend-id-2'],
  perMemberPrompt: {  // #7 好友在该群的追加
    'friend-id-1': '小红在这个群里特别活跃，爱开玩笑',
  },
  triggerSources: {  // #11 多选
    userMessage: true,
    heartbeat: { enabled: true, intervalSec: 600 },
    tavernEvents: ['MESSAGE_RECEIVED', 'MESSAGE_SENT', ...],
  },
  mergeStrategy: 'priority' | 'compound',  // #21 默认 compound
  injectConfig: {  // #10 + #16 + #22
    enabled: true,
    timing: 'continuous' | 'one-shot' | 'manual',  // #22
    formatTemplate: '...',  // #16 自定义模板，留空则用 marker 块默认
    formatExplanation: '...',  // #16 格式说明 prompt
    windowSize: 20,
  },
  rateLimitConfig: {  // #17
    perMinute: 3,
    dailyLimit: 100,  // 可选
  },
  phase1Config: {  // #20
    promptTemplate: '...',
    parseRegex: '...',
  },
  heartbeatTemplate: '...',  // #18
  failureConfig: {  // #24
    maxRetries: 2,
  },
  createdAt: ts,
  updatedAt: ts,
}
```

### 5.4 Message schema（#14）

```js
{
  id: 'msg-uuid',
  groupId: 'group-uuid',
  chatId: 'sillytavern-chat-id',  // #13 隔离
  sender: 'friend-uuid' | 'user',
  content: '消息文本 或 媒体描述',
  timestamp: ts,
  type: 'text' | 'image' | 'voice' | 'redpacket' | 'system',
  replyTo: 'msg-id-or-null',
}
```

### 5.5 存储分层（#13）

```
extension_settings (SillyTavern 全局)
 ├─ youyou_toolkit
 │   ├─ qqApp
 │   │   ├─ friends: Friend[]
 │   │   ├─ groups: Group[]
 │   │   └─ settings: { ... }

chatMetadata (SillyTavern 按 chat 隔离)
 ├─ qqApp
 │   └─ messages: { [groupId]: Message[] }
```

走 `storage-service.namespace('qqApp')`，复用项目现有抽象。

---

## 6. 触发与响应循环

整个循环是核心。流程图：

```
[触发源]                                           [响应回路]
 用户在群里发言 ─┐                            ┌─→ Phase 1 (选人)
 心跳定时器 ─────┼─→ [合并器] ─→ [频率检查] ──┤    输入: 群历史 + 触发上下文 + 好友描述
 酒馆事件 ──────┘    (#12+#21)   (#17)        │    AI 输出 → 正则解析 (#20) → [npc1, npc2, ...]
                                              │
                                              └─→ Phase 2 (串行生成)
                                                  for npc in [npc1, npc2, ...]:
                                                    输入: 群历史 + 已生成回复 + 该 npc 配置
                                                    AI 输出 → 写入群消息
                                                    更新群历史 (供下一个 npc 看到)
                                                  ↓
                                              [写回群存储]
                                                  ↓
                                              [按 #22 时机注入 bypass]
```

### 6.1 触发源（#11 + #18）

| 源 | 触发条件 | 上下文准备 |
|----|---------|-----------|
| 群内用户发言 | 用户在 QQ 群 UI 里发消息 | 群历史 + 这条用户消息 |
| 心跳 | 定时器到点 | 用户自定义心跳模板（#18） |
| 酒馆事件 | 主 AI MESSAGE_RECEIVED / MESSAGE_SENT / 其他 | 触发事件 + 群历史 |

用户在群配置里多选启用哪些源。

### 6.2 合并器（#12 + #21）

阈值时间窗口（默认 5s，可配）内的多个触发，按群配置的策略合并：

- **优先级抽顶**：用户消息 > 酒馆事件 > 心跳，只留最高优先级
- **复合上下文（默认）**：所有触发拼成一个"过去 X 秒内：用户说了 A、主 AI 说了 B、心跳到点"传给 Phase 1

### 6.3 频率检查（#17）

每群独立设上限：

- `perMinute`：每分钟最多 N 次 Phase 1 调用
- `dailyLimit`：每日总额（可选）

超过则丢弃此次触发（不排队，避免延迟堆积）。

### 6.4 Phase 1 选人（#20）

输入：

- 群配置（成员列表 + 每人 description + perMemberPrompt + atmosphere）
- 触发上下文（合并器输出）
- 群历史（最近 N 条）

经用户自定义 prompt 模板渲染（变量 `{{members}}` / `{{trigger}}` / `{{history}}` / ...），调用主 AI，输出经用户自定义正则解析，得到 NPC 名单 `[npcId1, npcId2, ...]`。

> **实现注**：解析走 `regex-extractor.testRegex(pattern, aiOutput)` 直接按 `groups[n]` 取值，**不走** `extractTagContent` 管线（后者只取 `match[1]`，多字段提取会丢）。Phase 1 的正则通常需要多个捕获组（如 npcId + reason），单次匹配 → 多字段映射。

**失败自动重试 N 次（#24）**，仍失败则放弃 + log。

### 6.5 Phase 2 串行生成（Q2）

`for each npc in 名单`：

- 输入：群配置 + 群历史 + **此前已生成的回复** + 该 NPC 的 description / perMemberPrompt
- 调用主 AI，输出该 NPC 的消息（type 默认 text，模板可允许 AI 自选 image/voice/...）
- 写入群消息存储
- 进入下一个 NPC（看到这个 NPC 的回复）

**为什么串行不并行**：串行天然形成对话流（"小红：你来了！" → "小明：嗯，刚到"），并行/一锅出更像通报，剧情张力弱。复杂调度（部分并行、动态选择回应顺序等）后续设计。

---

## 7. 注入主 AI

### 7.1 注入位置（#15，v1.0.247 审查后修订）

**修订前提案**：走 `modules/bypass-manager.js` 的 message 列表前置。
**修订后**：改走 worldbook entry 同步（类似 `modules/table-engine/table-worldbook-sync-service.js`）。

**为什么改**：v1.0.247 审查时实测 bypass-manager 的注入由 `tool-prompt-service.buildToolMessages()` 在工具调用链里手动调用拼接（`modules/bypass-manager.js:631` + `tool-prompt-service.js:172`），**不订阅 SillyTavern 主 AI 请求事件**（如 `GENERATE_BEFORE_COMBINE_PROMPTS`），它改不了主 AI 的 prompt。QQ App 如果走 bypass-manager，群对话只能进工具调用，进不了主剧情。

**新路径**：QQ App 每当群产生新消息（按 #22 时机配置触发），把"群最近 N 条 + 格式说明 prompt"渲染成一段文本，**upsert 到一个 worldbook entry**（按 chatId 隔离 + Wrapper 机制）。主 AI 通过世界书机制自然读到该 entry。

直接借鉴 `table-engine` 已有的三个 service（**结构参考，不复用代码**，QQ 自己重建一份在 `modules/apps/qq/inject/`）：

| 表格端 service | QQ 端对应 |
|---------------|----------|
| `table-worldbook-sync-service.js` | per chatId Wrapper 隔离 + entry upsert + 主 entry 注入逻辑 |
| `table-worldbook-order-service.js` | 顺序冲突检测、连续 order 分配 |
| `table-worldbook-placement-service.js` | position/depth 规范化 |

### 7.2 注入文本格式（#16）

**默认 marker 块**：

```
【QQ群"游戏群"最近消息】
[10:23] 小红：你好啊
[10:24] 小明：在的

【格式说明】
以上是 QQ App 的群聊注入，仅供你了解角色当前状态，不要在剧情里直接复读这些消息，也不要假设主角能即时看到 QQ 通知。
【结束】
```

**用户可改自定义模板**，使用占位符 `{{groupName}}` / `{{messages}}` / `{{atmosphere}}` 等（通过 `variableResolver.registerVariable` 在 Phase B 注册）。

无论默认还是自定义，**格式说明 prompt**（formatExplanation）是独立字段，避免每次都被模板覆盖。整段文本由 QQ App 写入 worldbook entry 的 content。

### 7.3 注入时机（#22，修订）

每群可选三种，对应不同的 worldbook entry 配置：

- **持续滑动**：entry `constant: true`，QQ 群每次新消息触发 entry 内容 upsert（最近 N 条滑动窗口）。主 AI 每次请求都自然带上
- **事件一次性（默认）**：entry `constant: false` + 默认 `disabled`，群有新消息时 enable + upsert 内容；下一次主 AI `MESSAGE_RECEIVED` 后 disable entry。借助 worldbook 的 enabled 字段 + `hostEvents.subscribe(MESSAGE_RECEIVED, ...)` 自动控制
- **用户手动推送**：群里"推送到剧情"按钮 → upsert 内容到 entry 并 enable → 下一次主 AI 请求自然带上 → 主 AI 响应后 disable

注入位置（`position`）和深度（`depth`）默认值参考 `table-worldbook-placement-service.js` 推荐配置，用户可在群配置里覆盖。

### 7.4 为什么 v1 不用方案 b（自己 hook 主 AI 事件）

修订时讨论过另一条路：新建模块订阅 SillyTavern 的 `GENERATE_BEFORE_COMBINE_PROMPTS`（或等效钩子），从内存队列拉群消息直接拼到主 AI prompt 前。这条路对"事件一次性 + 精准时机"更天然，但：

- 引入对**未在 host-event-service 中包装**的 ST 钩子的直接依赖，跨版本脆弱
- 与现有 worldbook 同步机制重复（table-engine 已经把"按 chatId 隔离的内容同步到主 AI"做透了，含 Wrapper / order / placement 三套基础设施）
- v1 用 worldbook 路径足够；未来如果需要"次秒级精准注入"或"内容不进世界书"再做 b 方案，作为 §7 的并行路径

---

## 8. 频率与失败处理

### 8.1 频率（#17）

见 5.3 Group.rateLimitConfig 字段。检查发生在合并器后、Phase 1 前。

### 8.2 失败重试（#24）

适用场景：

- Phase 1 AI 输出无法被正则解析
- API 报错（429 / 500 / 网络超时）
- Phase 2 AI 输出空内容

重试策略：

- 默认重试 2 次（可在 group.failureConfig.maxRetries 调整）
- 重试间隔指数退避：500ms, 1500ms
- 仍失败 → log + 跳过此次响应（不影响主 AI）
- 可选叠加 UI 状态栏提示（QQ 顶部小图标），但不强制弹通知

---

## 9. UI 流程（#19）

### 9.0 前置依赖（v1.0.247 审查后追加）

v1.0.247 浮球模块（`modules/ui/floating-ball/`）目前只支持把 App 渲染成 **4 列图标网格里的一张 icon 卡片**（通过 `registerItem` 注入），点击图标后没有"全屏接管手机壳屏幕"的能力——`menuController` 仅有 `open / close / toggle`，没有 `push / pop` 视图栈。

因此 QQ 的 iOS 视图栈不能直接落地在 QQ 模块里，**必须先扩展浮球**：

- 新增 `registerApp({ id, icon, title, mount, unmount })` API，区别于 `registerItem`
- 在浮球 `phoneScreen` 区域增加视图栈基础设施（push/pop + slide 过渡 + 顶部 status bar 保留）
- App 接管期间，dock 区维持当前状态（可保留 home indicator 触发回退到 icon 网格）
- 退栈到底（QQ 主页再退一次）= 回到 icon 网格视图

这部分工作归入 **Phase A1**（见 §11），是 QQ 视图栈生效的前提。

### 9.1 视图栈结构

手机壳里 QQ 用 iOS 视图栈：

```
浮球展开 → 手机壳屏幕
  └─ QQ App icon → 点击进入
      ↓ push
      QQ 主页（聊天列表）
       ├─ 群A 头像 + 最近一条预览
       ├─ 群B 头像 + 最近一条预览
       └─ "+" 新建群按钮
      ↓ 点群 push
      群聊页
       ├─ 顶部：群名 + 设置按钮
       ├─ 中部：消息流（按时间倒序显示）
       └─ 底部：输入框（用户发言入口）
        ↓ 点设置 push
        群设置页
         ├─ 基本：群名 / 氛围提示词 / 成员管理
         ├─ 触发：源多选 + 合并策略 + 频率上限
         ├─ 注入：开关 + 时机 + 格式模板 + 说明 prompt
         └─ 高级：Phase 1 模板 / 心跳模板 / 失败重试
        ↑ 退栈
       ↑ 退栈
      ↑ 退栈
```

返回手势 / 顶部返回按钮 / 浮球 home indicator 都能退栈。Dock 区不挤进 QQ 子页（dock 是 App 层入口，不参与子视图栈）。

**视图栈实现**：push/pop 与 slide 过渡由浮球 `phoneScreen` 视图栈承担（§9.0 前置依赖）；QQ 只声明 view 定义（id / render / onEnter / onLeave / data），通过 `registerApp` 在 mount 时把根 view 推上去。返回手势 / 顶部返回按钮 / home indicator 三种退栈入口都由浮球统一处理。

---

## 10. 复用现有基础设施

### 10.1 直接复用（代码 import）

| 项目模块 | QQ App 用法 |
|---------|------------|
| `modules/api-connection.js` | Q1 - `sendWithPreset(presetName, msgs)` 调用主 AI（Phase 1 + Phase 2） |
| `modules/regex-extractor.js` | #20 - **走 `testRegex(pattern, aiOutput)` 按 `groups[n]` 取多字段**（不走 `extractTagContent`，后者只取 match[1]） |
| `modules/variable-resolver.js` | #16/#18/#20 - `registerVariable(name, syncHandler)` 注册模板占位符（注意：handler 必须同步，异步数据先 await 后再放进 ctx） |
| `modules/core/storage-service.js` | #13 - `storage.namespace('qqApp')` 全局 + chatId 隔离（参考 `table-chat-scope-service.js` 的 `{[chatId]: data}` 模式） |
| `modules/core/event-bus.js` + host-event-service | #11 - 订阅 `USER_MESSAGE_RENDERED` / `MESSAGE_RECEIVED` / `MESSAGE_SENT` / `CHAT_CHANGED` / `GENERATION_STOPPED` |
| `modules/core/settings-service.js` | 全局 QQ App 设置（如全局失败重试默认值、全局 QPS 兜底） |
| `modules/core/logger-service.js` | `logger.createScope('QQApp')`，触发决策 + Phase 1/2 输入输出 + 失败重试都记 |
| `modules/ui/floating-ball/` | 注册 QQ App icon（v1.0.247 已就位），App 视图栈基础设施待 Phase A1 扩展 |

### 10.2 结构参考（不复用代码，QQ 自建一份）

借鉴 `modules/table-engine/` 的 worldbook 同步基础设施模式，在 `modules/apps/qq/inject/` 重建：

| 表格端 service | 借鉴的设计模式 | QQ 端文件 |
|---------------|---------------|----------|
| `table-worldbook-sync-service.js` | per chatId Wrapper 隔离 + 主 entry upsert + enable/disable 控制 | `qq-worldbook-sync-service.js` |
| `table-worldbook-order-service.js` | 顺序冲突检测、连续 order 分配（避免与表格的 order 撞车） | `qq-worldbook-order-service.js` |
| `table-worldbook-placement-service.js` | position/depth 规范化推荐值 | `qq-worldbook-placement-service.js` |

> **为什么不直接 import**：表格端 service 与 table schema / table-state 强耦合（参数里有 tableId / sheetData 等），抽通用层 cost 大于 QQ 重建（每个 ~150-300 行）。重建时拷贝结构 + 改 schema 即可。

### 10.3 不再用的（v1.0.247 审查后剔除）

- `modules/bypass-manager.js` —— 审查发现仅服务工具链（`tool-prompt-service.buildToolMessages()` 拼接），**不订阅主 AI 请求事件**。QQ App 改走 worldbook entry 路径（见 §7.1）

**零新依赖**。整个 QQ App 是这些基础设施的组合层。

---

## 11. 实现阶段规划

按依赖顺序拆为 5 个阶段，每阶段独立可验证：

### Phase A1：浮球扩展（App 视图栈基础设施）

为什么先做：v1.0.247 浮球只支持 icon 卡片，不支持 App 全屏接管 + 视图栈（见 §9.0）。这一步是后续所有沉浸式 App（QQ / forum / 小红书）的共同前置。

- `modules/ui/floating-ball/` 内部追加：
  - `registerApp({ id, icon, title, mount, unmount })` API 与 `registerItem` 并列
  - `phoneScreen` 视图栈控制器：`pushView(view)` / `popView()` / `replaceView(view)` + slide 过渡
  - 顶部 status bar 在 App 接管期间保留；底部 home indicator 触发"退栈到底则回到 icon 网格"
  - dock 区在 App 接管期间维持当前状态（不被 App 子视图覆盖）
- 浮球的 `phoneContent` 渲染分支：icon 网格 / App 全屏 二选一，由当前是否有 App push 在栈上决定
- 暴露 `window.YouYouToolkit.floatingBall.registerApp`

**验证**：注册一个 hello-world App（icon + 一个空 view），点击 icon 后浮球切到 App 全屏，push 一个子 view 再 pop 回根 view 再 pop 回 icon 网格；过渡动画自然，dock 区不闪。

### Phase A2：App 框架抽象层（跨 App 复用）

A1 完成后，把"App 通用部分"抽到独立模块，避免每个 App 都重复写 storage / 视图 wrapper。

- `modules/apps/app-base.js` - App 类型注册 / 实例管理（含 #3 多副本 schema 但 v1 不启用）/ 调用浮球 `registerApp`
- `modules/apps/app-storage.js` - 全局 + chatId 双层 storage 抽象（包一层 `storage.namespace('appId')` + chatId scope 拼装）
- App 生命周期钩子：`onMount` / `onUnmount` / `onChatChanged`（订阅 host-event `CHAT_CHANGED`，自动切换 chatId 隔离存储）

**验证**：能用 `appBase.register({...})` 注册一个 demo App，存数据后切 chat → 数据按 chatId 隔离正确；切回原 chat 数据恢复。

### Phase B：QQ 静态 UI + 数据 CRUD

- `modules/apps/qq/index.js` - QQ App 注册
- `modules/apps/qq/data/` - Friend / Group / Message storage 读写
- `modules/apps/qq/views/` - 主页 / 群聊页 / 群设置页 / 好友管理页
- 主页可显示群列表 / 点群进入群聊页 / 用户能在群里手动发消息（先无 AI）

**验证**：完整 UI 可用，群列表 + 群聊 + 群设置都能打开，数据增删改持久化。

### Phase C：触发与响应循环（核心）

- `modules/apps/qq/triggers/` - 用户消息 / 心跳 / 酒馆事件三套触发器
- `modules/apps/qq/triggers/merger.js` - 合并器（#12 + #21）
- `modules/apps/qq/triggers/rate-limiter.js` - 频率检查（#17）
- `modules/apps/qq/response/phase1.js` - Phase 1 选人（#20 + #24）
- `modules/apps/qq/response/phase2.js` - Phase 2 串行生成（Q2）

**验证**：在群里发消息 → NPC 响应；心跳到点 → NPC 自发说话；故意配错 prompt → 重试 + log。

### Phase D：注入主 AI

- `modules/apps/qq/inject/qq-worldbook-sync-service.js` - 借鉴 table-engine 结构，per chatId Wrapper + 主 entry upsert + enable/disable
- `modules/apps/qq/inject/qq-worldbook-order-service.js` - 顺序冲突检测（与 table 的 order 错峰）
- `modules/apps/qq/inject/qq-worldbook-placement-service.js` - position/depth 规范化
- 注入模板渲染（#16，通过 variableResolver.registerVariable 注册占位符）+ 时机控制（#22，三种 timing 对应不同的 entry constant/enabled 组合）
- 订阅 host-event `MESSAGE_RECEIVED` 控制"事件一次性"模式 disable

**验证**：群里 NPC 说话后，下一次主 AI 请求能在世界书 raw prompt 里看到这段对话；切换 timing 模式行为不同（持续滑动 / 事件一次性 / 手动推送）；关闭注入时主 AI 看不见；与表格 worldbook entry 共存不冲突。

### Phase E：好友智能来源 + 抓取

- AI 描述生成好友（用户输入描述 → AI 生成 Friend 数据）
- 抓取主聊正文识别好友（#5c）：用户触发，AI 解析最新 N 层消息，列候选给用户挑选

**验证**：两种生成方式都能创建 Friend，挑选 UI 流畅。

---

## 12. 风险与对策

| 风险 | 影响 | 对策 |
|------|------|------|
| Phase 2 串行调用多 NPC，API cost 飙升 | 单次触发可能 5-10 次调用 | #17 每群频率上限 + Phase 1 prompt 引导限制单次最多 N 人 |
| 注入文本过长，主 AI 上下文爆 | 主剧情质量下降 | windowSize 限定群历史只取最近 N 条 + 主 AI 用户可关掉某群 #22 timing |
| 心跳触发跟酒馆事件触发互相打架 | 同时调用多次 | #21 合并器在窗口内按用户策略合并 |
| 用户改了 Phase 1 模板 / 正则后 AI 输出对不上 | Phase 1 一直失败 | #24 自动重试，仍失败给状态栏提示 + log 详情让用户定位 |
| `bypass-manager` 注入跟其它注入（工具世界书 / 表格世界书）干扰 | ~~主 AI 顺序混乱~~ 已不适用（v1.0.247 审查后改走 worldbook，见 §7.1） | — |
| QQ worldbook entry 与表格 worldbook entry 撞 order | 主 AI prompt 拼接顺序混乱 | 借鉴 `table-worldbook-order-service` 做顺序冲突检测；QQ 默认起始 order 错峰（如 +100）+ 用户可在群配置覆盖 |
| "事件一次性"模式 worldbook entry disable 时机精度 | 主 AI `MESSAGE_RECEIVED` 后 disable 可能与下一次主 AI 请求竞争（极端情况主 AI 仍读到上一轮 entry） | 默认采用"主 AI 响应完成才 disable"+ 配置项允许用户改成"主 AI 请求完成立即 disable"；§7.4 留方案 b 作为未来精度升级路径 |
| 多群同时高活跃，rate-limiter 各自独立时总 QPS 仍高 | 整体 API 压力 | settings-service 加全局兜底"App 总 QPS 上限"作为安全网（可选实现） |
| Phase 2 NPC 看到前一个 NPC 的回复后陷入循环对话 | 群里两个 AI 互相回应停不下来 | Phase 1 引导 prompt 里加"避免每次都让相同的人对话"+ Phase 2 限制单次最多 5 条 |
| 用户在 group.injectConfig.formatTemplate 写出错误模板 | 注入失败或注入垃圾 | 模板渲染失败时降级到 marker 块默认 + log 提醒 |

---

## 13. v1 范围与不做的事

### v1 做

- ✅ 5.1 列表里的全部实体
- ✅ Phase 1 + Phase 2 完整循环
- ✅ 三种触发源（用户消息 / 心跳 / 酒馆事件）
- ✅ 注入 bypass，三种时机
- ✅ 频率上限 + 失败重试
- ✅ iOS 视图栈 UI
- ✅ 好友三来源（手动 / AI 生成 / 抓取识别）

### v1 不做

- ❌ 私聊（涉及聊天数据引用，复杂度高，后置）
- ❌ 多 QQ 实例（#25）
- ❌ NPC 关系网真正生效（#23 仅 schema）
- ❌ 导出导入聊天记录（#13 后置）
- ❌ 图片/语音/红包消息的真实媒体（消息 type 字段支持，但渲染先用占位符）
- ❌ Phase 2 并行 / 一锅出多人 / 动态调度（Q2 后置）
- ❌ 用户主动按钮以外的"自动抓取识别好友"（#5c 限定为用户主动触发）
- ❌ 走 bypass-manager 注入主 AI（v1.0.247 审查后确认 bypass-manager 不订阅主 AI 事件，改走 worldbook，见 §7.1）
- ❌ 向主聊天框 textarea 写入或自动发送消息（QQ 与主剧情只通过 worldbook 单向感知，不反向操作主聊天框）
- ❌ 方案 b：自己 hook 主 AI 请求事件做精准注入（见 §7.4，未来需要次秒级精度时再开）

---

## 14. 下一步

1. 本文档评审通过后，按 Phase A1 → A2 → B → C → D → E 顺序进入实现阶段
2. Phase A1 完成后，浮球已具备 App 全屏接管 + 视图栈能力，后续 forum / 小红书 / 其他 App 都能复用
3. Phase A2 完成后，跨 App 通用层就位（注册 / 存储 / 生命周期），新 App 接入成本降到最低
4. Phase B 完成后用户已经有一个"静态版 QQ"可玩
5. Phase C-D 完成后是 MVP（minimal viable product）
6. Phase E 完成后是 v1 全功能版

每个 Phase 跑完应有独立的 SillyTavern 内验证清单（参考 docs/TABLE_ACCEPTANCE_TESTS.md 的写法）。

---

## 附录 A：与柚月手机的对比

参考 `docs/yuzuki-phone-research.md`，本设计与柚月手机的核心差异：

| 维度 | 柚月手机 | Mini-QQ App |
|------|---------|-------------|
| 触发模型 | 主 AI 输出 XML，解析后写入消息 | Skill 风格：独立 AI 调用 Phase 1 + Phase 2 |
| 多 NPC 协同 | 无（单次只能由主 AI 模拟） | Phase 2 串行多 NPC，每个独立 prompt |
| 注入主 AI | 通过 worldbook entry | 通过 worldbook entry（v1.0.247 审查后从 bypass 改路径，见 §7.1）|
| 频率控制 | 无明确机制 | 每群独立频率 + 失败重试 |
| 数据隔离 | 全局 | 全局共享好友/群 + chatId 隔离记录 |
| 用户可配置度 | 中（主要是 prompt） | 极高（触发/合并/注入/解析全部用户决定） |

本设计的复杂度确实超过柚月手机，因为是**真正的多 agent 系统**而非"主 AI 模拟群聊"。

## 附录 B：与项目其他模块的关系

- **工具系统**：QQ App 不是 tool，但 Phase 1/2 调用主 AI 的方式跟 tool-output-service 思路一致（promptTemplate + 解析），代码模式可借鉴
- **表格工作台**：QQ App 与表格工作台**走同一类注入机制**（worldbook entry + per-chatId Wrapper + order + placement 三套基础设施），QQ 在 `modules/apps/qq/inject/` 重建一份并行 service，避免与 table-engine 共享 order 空间冲突
- **剧情推进（#13）**：QQ App 注入到主 AI 实际上是一种**横向剧情推进**——通过群活动制造主 AI 看到的"环境噪音"。未来如果做 #13 剧情推进辅助模块，可考虑共享部分基础设施
