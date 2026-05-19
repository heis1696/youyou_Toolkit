# Phase 3 架构重构决策

> 创建日期: 2026-05-16
> 版本: v1.0.148 后启动的 Phase 3 规划
> 用途: 架构层面的重构决策追踪 + 参考项目调研归档

v1.0.148 完成 Flat Flow Phase 2 的 CSS 扁平化（详见 [PANEL_LAYOUT_AUDIT.md](./PANEL_LAYOUT_AUDIT.md)）后，进入 Phase 3：架构层面的重构，影响导航结构、模块职责、数据模型，以及新模块设计。

---

## 议题状态总览

> 列含义：**决策** = 设计方案是否拍板；**实现** = v1.0.212 实测代码是否落地。

| # | 议题 | 决策 | 实现 (v1.0.212) | 关键证据 |
|---|------|------|----------------|---------|
| 1 | UI 控件 Prefab 化 | ✅ 方向确定 | ✅ 已落地 | `modules/ui/components/controls/` 14 个控件文件 |
| 2 | 正则提取面板定位 | ✅ 完整预设管理器 | ✅ 已落地 | `regex-extract-panel.js` 继承 PresetManagerBase |
| 3 | 工具列表面板 | ⏸ 方向已定，待 preview | ✅ 已落地 | `tool-registry.js:411` 旧 toolManage 不再注册；sub-nav 已含新建/导入/导出按钮 |
| 4 | 设置面板自动化合并 | ✅ | ✅ 已落地 | settings-panel.js 执行器 tab 持有 settleMs/cooldownMs；automation tab 已删 |
| 5 | 自动触发规则扩展 | ✅ | ✅ 已落地 | `tool-automation-service.js:538` `local_transform` 进自动队列 |
| 6 | 多标签写回冲突 | ✅ | ✅ 已落地 | `tool-config-panel-factory.js:660` `writebackTag` 字段 + datalist 自动补全 |
| 7 | 世界书注入预设 | ✅ | ✅ 已落地 | `worldbook-preset-panel.js` 全套 CRUD；工具配置走 `worldbooks.presetId` 引用 |
| 8 | 工具配置面板 HTML 重构 | ⏸ 依赖 1-7 + Prefab 库 | ✅ 已落地 | `tool-config-panel-factory.js` 797 行重写为 hero/chips/flow-section |
| 9 | 持久化重构 + Authority 接入 | ✅ | ✅ 已落地 | `core/tool-data-provider.js` + `authority-provider.js` + `fallback-provider.js`；`modules/storage.js` 已删 |
| 10 | 酒馆事件监听集中化 | ✅ | 🟡 部分落地 | service 自身完整；automation 完全迁移；context-injector 仅事件 emit 迁移、API 发现仍直读；用户消息能力（剧情推进依赖）未开发 |
| 11 | 浮球系统 (FloatingOrb) | ✅ 设计 | 🔲 未开发 | `modules/ui/floating-orb/` 目录不存在；`panel-host-mixin.js` 不存在 |
| 12 | 预设面板合并（API/正则/世界书/表格模板） | ✅ | ✅ 已落地 | `tool-registry.js:396` presetManagement 含 4 个 sub-nav；`preset-manager-base.js` + 4 个 panel 齐全 |
| 13 | 剧情推进辅助模块 | ✅ 架构定 | 🔲 未开发 | `modules/plot-advance/` 目录不存在；host-event-service 基座已就位 |
| 14 | 剧情外小剧场 (parking lot) | ⏸ P3 概念框架 | 🔲 未开发 | 仅文档记录候选场景 |
| 15 | 填表工作台重写设计 | ✅ | ✅ 主链已落地 / 🟡 增强项待补 | v1.0.193 sign-off；6 项盲区见 [TABLE_PARITY_WITH_SHUJUKU.md](./TABLE_PARITY_WITH_SHUJUKU.md) |

**汇总（v1.0.212）**：11 项已落地 / 2 项部分落地（#10/#15）/ 3 项未开发（#11/#13/#14）。

---

## 参考项目调研归档

Phase 3 决策大量依赖外部参考项目的调研。以下为关键发现摘要，详情参见原始调研报告。

### A. shujuku-spv3.7

**位置**：`Reference/shujuku-spv3.7/`
**类型**：SillyTavern 插件 / 油猴脚本，TypeScript + Rollup 构建
**核心功能**：结构化表格数据管理（剧情角色/物品/任务表）+ 剧情推进劫持

#### A.1 持久化机制

- **技术栈**：`sql.js` (asm 版纯 JS SQLite，约 1.5MB) — **不是后端**
- **运行时**：浏览器内存中跑一个 SQLite 数据库（`new sqlJs.Database()`）
- **持久化最终落点**：仍然走酒馆 ChatMessage 自定义字段（`TavernDB_ACU_*`）
- **配置数据**：酒馆 `extensionSettings` + IndexedDB 缓存 + localStorage 三级降级

**性能优势来源**：
- 内存 SQLite 读写微秒级 vs JSON 序列化反序列化
- 事务批量提交（`runBatch` 包裹在 `BEGIN TRANSACTION / COMMIT`）
- 增量写入（SQL `UPDATE WHERE` 而非 JSON 全量覆盖）
- 按需建表（首次写时才创建）
- `saveSettingsDebounced` 酒馆侧防抖

**关键文件**：
- `src/data/sqlite/sqlite-engine.ts` L55-89 — 引擎初始化、`runBatch` L144-175
- `src/data/sqlite/schema-mapper.ts` L45-108 — DDL 生成
- `src/data/sqlite/sync-bridge.ts` L20-100 — SQLite ↔ ChatMessage 双向同步
- `src/service/table/table-storage-strategy.ts` L21-29 — Provider 模式入口

#### A.2 剧情推进模块

**拦截策略（双路径，去重）**：
1. **Hook `TavernHelper.generate`**（猴子补丁，侵入性强）— 不推荐借鉴
2. **监听 `GENERATION_AFTER_COMMANDS` 事件**（标准事件，低耦合）— **推荐借鉴**
   - 策略 1：最后一条 chat 消息已是 user 消息时，直接修改 `lastMessage.mes`
   - 策略 2：输入框中有文本时，`setSendTextareaValue` 回填输入框 + 改 `params.prompt`

**AI 调用层（双模式）**：
- `TavernHelper.generateRaw()` — 复用酒馆 API 配置
- 直接 fetch `/api/backends/chat-completions/generate` — 自定义 API 预设

**关键文件**：
- `src/presentation/bootstrap/init.ts` L137-183 — TavernHelper.generate hook
- `src/presentation/bootstrap/init.ts` L272-387 — GENERATION_AFTER_COMMANDS 拦截
- `src/service/plot/plot-orchestrator.ts` 全文 — 编排逻辑
- `src/service/ai/api-call.ts` L13-78 — 双模式 AI 调用
- `src/service/runtime/plot-runtime/plot-history-preset.ts` L158-381 — 历史读写

**关键澄清**：发送按钮状态不变 = 不经过 chat pipeline。但 AI 请求仍由酒馆后端 `/api/backends/...` 代理转发。

#### A.3 填表工作台

**UI 三区布局**：
- 顶部工具栏（模式切换 / 保存）
- 左侧栏（表格列表）
- 主区（数据/配置/全局注入三种模式）
- 可选右侧 dock（AI 改表助手）

**数据模型**：
- `Sheet` 结构：`{uid, name, content[][], sourceData, updateConfig, exportConfig, orderNo, seedRows}`
- `content[0]` 为表头行，`content[1..]` 为数据行
- 列就是 `string|null`，无显式类型系统
- SQLite 模式下列类型由 DDL 定义

**激活/作用域机制**：
- 没有显式"per-table on/off toggle"
- 通过三维笛卡尔积间接控制：`isolationKey × templateScope × targetSheetKeys`
- `templateScope`：`inherit_global` / `chat_override` / `preset_link`
- `isolationKey`：用户手动开关 + 输入 code，可在同一 chat 维护多份独立表

**存储分层**：
| 数据 | 位置 |
|------|------|
| 全局 Schema（模板） | `TABLE_TEMPLATE_ACU` localStorage |
| 全局模板预设库 | `STORAGE_KEY_TEMPLATE_PRESETS_ACU` localStorage |
| per-chat 模板作用域 | 聊天首层消息 `chatScopedConfig` |
| per-chat SheetGuide | 聊天首层消息 `chatSheetGuide`（按 isolationKey 分组） |
| per-message 表格数据 | 消息对象 `TavernDB_ACU_IsolatedData[isolationKey].independentData` |
| 锁定数据 | `settings_ACU.tableUpdateLocks[scopeKey][sheetKey]` |

**AI 指令 DSL**：
```
<tableEdit>
insertRow(sheet_xxx, ["值1", "值2", "值3"])
updateRow(sheet_xxx, 3, [null, "新值", null])
deleteRow(sheet_xxx, 5)
</tableEdit>
```
`null` = 该字段不变。解析器逐条应用，命中锁定状态跳过。

**填表 7 步编排**：
1. `buildBatchMergeBase` — 从 SheetGuide 构建骨架
2. `loadBatchBaseData` — 从历史消息加载覆盖
3. `prepareAIInput` — 拼 prompt（表数据 + 对话 + 世界书）
4. `callAI` — 调 API
5. `parseTableEdits` — 解析 `<tableEdit>` DSL
6. `applyEdits` — 应用变更（检查锁定）
7. `writeback + sync` — 写回消息 + 同步世界书

**三级锁定**：行锁 / 列锁 / 单元格锁 + 特殊索引列锁（自增编号列）

**关键文件**：
- `src/presentation/pages/visualizer.ts` — 编辑器入口、窗口创建
- `src/presentation/pages/visualizer-sidebar.ts` — 侧栏表格列表
- `src/presentation/pages/visualizer-main-render.ts` L146-231 — 数据模式渲染
- `src/presentation/pages/visualizer-main-config.ts` L49-442 — 配置模式
- `src/service/template/chat-scope/chat-scope-template.ts` L28-458 — Template Scope 三模式
- `src/service/runtime/helpers-table-lock.ts` — 锁定逻辑
- `src/service/table/update-orchestrator.ts` L623 — `orchestrateManualUpdate_ACU`
- `src/data/repositories/chat-message-data-repo.ts` L85-229 — IsolatedData 读写

### B. ST-Delegation-of-authority

**位置**：用户机器 `G:\Silly Tavern\SillyTavern\plugins\ST-Delegation-of-authority\`（已安装）
**仓库**：https://github.com/Youzini-afk/ST-Delegation-of-authority
**类型**：SillyTavern **服务端插件**（Rust + Node + TypeScript），不是前端 SDK
**核心功能**：给第三方扩展提供统一后端能力 + 权限治理

#### 提供的能力

| 能力 | SDK 调用 | 说明 |
|------|---------|------|
| SQL 数据库 | `client.sql.*` | 按用户按扩展隔离的 **真 SQLite 文件**，支持 migration、transaction、分页 |
| Trivium 图数据库 | `client.trivium.*` | 向量检索 + 图谱 + TQL + 混合搜索 |
| KV 存储 | `client.storage.kv.*` | 轻量键值对 |
| Blob 存储 | `client.storage.blob.*` | 二进制文件，支持大文件分块 |
| 私有文件 | `client.fs.*` | 按用户按扩展隔离的文件目录 |
| HTTP 请求 | `client.http.fetch()` | 走 core 发出请求 |
| 后台任务 | `client.jobs.*` | 内置 delay/sql.backup/trivium.flush/fs.import-jsonl |
| 事件流 | `client.events.subscribe()` | SSE 推送 |

#### 架构

```
SillyTavern 前端
  → window.STAuthority / AuthoritySDK
  → /api/plugins/authority/*
  → Node server plugin（适配层）
  → localhost 内部 HTTP
  → Rust authority-core（执行层）
  → SQLite + Blob 文件 + 私有文件
```

#### 接入方式

SDK 已自动部署在 `public/scripts/extensions/third-party/st-authority-sdk/`：

```js
const client = await window.STAuthority.AuthoritySDK.init({
  extensionId: 'third-party/youyou-toolkit',
  displayName: 'YouYou Toolkit',
  version: '1.0.149',
  installType: 'local',
  declaredPermissions: { sql: { private: true } }
});

await client.sql.migrate({ database: 'main', migrations: [...] });
await client.sql.query({ database: 'main', statement: 'SELECT ...', params: [] });
```

#### 关键优势（vs sql.js）

- **真后端**：Rust core + 真 SQLite 文件持久化
- **零包体积**：SDK 不打包进 bundle，运行时读 `window.STAuthority`
- **性能**：Rust 原生 SQL，远超 JS 内存 SQLite
- **隔离**：按用户 × 按扩展自动隔离
- **不需要 ChatMessage 绕一圈**：Authority 自己管文件持久化

#### 兼容策略

- 装了 Authority：用 AuthorityProvider（首选）
- 没装：用 FallbackProvider（JSON over storage-service.js）
- 后期装：迁移按钮一键转 SQLite

---

## 决策细节

### 1. UI 控件 Prefab 化 ✅

> **实现状态（v1.0.212）**：✅ 已落地。`modules/ui/components/controls/` 14 个控件文件齐全（flow-section / form-row / select-input / text-input / toggle / list-row / button / divider / zone-title / dialog / toolbar / preset-list-item / chip-group + _internal / index）。各预设面板与工具配置面板均已迁移到控件库。

**问题**：当前各面板用模板字符串手写 HTML，相同控件在不同面板里实现不一致；样式分散在 `main.css` / `bootstrap.js:getBaseStyles()` / 组件 `getStyles()` 三处。

**决定**：建立 `modules/ui/components/controls/` 控件工厂库。

**设计模式（类 Unity Prefab）**：
- 每个控件是一个工厂函数，返回 `{ el, get, set, on, ... }`
- 支持嵌套组合（`flowSection` 接收 `content` 数组放子控件）
- 暴露 get/set/on 接口（类似 Unity Prefab 暴露 Component 字段）
- 支持 `getControl(id)` 查找子控件（类似 GetComponentInChildren）

**初始控件清单（最小集）**：
- `flowSection({ heading, icon, actions, content })`
- `formRow({ label, hint, control })`
- `selectInput({ options, value, onChange })`
- `textInput({ placeholder, value, onChange })`
- `toggle({ label, checked, onChange })`
- `listRow({ cells, onDelete })`
- `button({ label, variant, onClick })`
- `divider({ variant: 'hairline' | 'dashed', style, className, attrs })`
- `zoneTitle({ title, desc })`

**落地策略**：重构每个面板时同步迁移，不一次性迁移所有面板。

---

### 2. 正则提取面板 — 完整预设管理器 ✅

> **实现状态（v1.0.212）**：✅ 已落地。`regex-extract-panel.js` 继承 `preset-manager-base.js`，预设 CRUD + 导入导出齐备；工具与预设通过 `extraction.regexPresetId` ID 关联，删工具不影响预设、删预设触发工具运行时提示。

**问题**：正则提取功能在多处被用到（工具配置的提取配置），但独立面板的预设管理只有雏形未完成。

**决定**：升级为完整的预设管理器。

**具体方案**：
1. 正则提取面板补齐预设 CRUD + 导入导出
2. 新建自定义工具时**必填**正则标签规则
3. 工具创建成功后，**自动在正则提取预设中插入同名预设**
4. 工具配置的"提取配置"区**只引用预设**，不内嵌完整规则编辑器
5. **内置工具同样走预设引用**

**关键约束**：
- 工具 ⇄ 预设 **双向独立**（通过 ID 关联而非名称）
  - 改预设名 → 工具不受影响
  - 删工具 → 预设保留
  - 删预设 → 工具提取失效（提示用户）

---

### 3. 工具列表面板与 sub-nav 融合 ⏸ → ✅ 已落地

> **实现状态（v1.0.212）**：✅ 已落地。`tool-registry.js:411` 注释 "旧 toolManage 入口及其 ToolManagePanel 组件保留代码但不再注册"；popup-shell sub-nav 头部已有 `新建/导入/导出` 按钮 + 筛选框。`tool-manage-panel.js` 作为冷却代码保留未删（不阻塞主路径）。

**问题**：当前工具管理面板功能过于简单（只有新建/导入/导出/列表），独立成顶级面板没必要。

**决定方向**：取消独立的工具管理面板，把功能融入现有的工具页 sub-nav。

**预期方案**：
- 主导航的"工具管理"页面取消
- sub-nav 本身就是工具列表
- 在 sub-nav 区域增加"新建工具"按钮
- 导入/导出/重置放到 sub-nav 头部的更多菜单
- 点击 sub-nav item → 直接进入该工具的配置

**待 preview 确认**：sub-nav 头部的按钮排布、新建工具流程的视觉呈现。

---

### 4. 设置面板自动化合并 ✅

> **实现状态（v1.0.212）**：✅ 已落地。`settings-panel.js:362/367/563/564` 在执行器 tab 持有 `settleMs/cooldownMs` 输入；`automation.enabled` 已从 settings-service 移除；工具配置面板内的自动触发开关 / settleMs / cooldownMs 字段全部删除。

**决定**：删除独立的"自动化"tab，相关内容合并到执行器 tab。

| 项目 | 处理 |
|------|------|
| 设置面板自动化 tab | 删除 |
| 自动化总开关 (`automation.enabled`) | 删除（不再需要） |
| `settleMs` / `cooldownMs` 全局参数 | 保留，归入执行器 tab |
| 自动化诊断（事件绑定、最近事务） | 保留，精简版（避免和 logger 重复） |
| 工具配置面板里遗留的 settleMs/cooldownMs 字段 | 删除 |
| 工具配置面板里的"自动触发"开关 | 删除（由 output_mode 决定） |

**合并后执行器 tab 结构**：

```
执行器 tab
├── 并发控制（最大并发数）
├── 重试策略（最大重试 + 重试间隔）
├── 超时设置（请求超时）
├── 队列策略（FIFO / LIFO / 优先级）
├── 自动触发节流（settleMs + cooldownMs）   ← 新增
└── 自动触发诊断（chip + 事务列表，精简版）  ← 新增
```

---

### 5. 自动触发规则 ✅

> **实现状态（v1.0.212）**：✅ 已落地。`tool-automation-service.js:538` `localTransformTools = allConfigs.filter(c => shouldRunLocalTransform(c) && c.output?.autoTrigger !== false)`，且 local transform 先于 post_response_api 执行；判定依据已切换为 `outputMode`。

**新规则**：按 `output_mode` 自动判定，工具配置面板不再有"自动触发"开关。

| output_mode | 自动触发 |
|-------------|---------|
| `post_response_api` | ✅ 选中即自动触发 |
| `local_transform` | ✅ 选中即自动触发（**新增支持**） |
| `follow_ai` | ❌ 永远手动 |

**底层影响**：
- `tool-automation-service.js` 需要新增 `local_transform` 自动执行路径
- 自动化判定逻辑从 `tool.automation.enabled` 改为 `tool.outputMode in [post_response_api, local_transform]`

---

### 6. 多标签写回冲突 ✅

> **实现状态（v1.0.212）**：✅ 已落地。`tool-config-panel-factory.js:660` 新增 "写回标签" free-text input（带 datalist 自动补全），`extraction.writebackTag` 保存到工具配置；执行链命中该字段时只写回指定标签，未填则取首个。

**问题**：多标签提取时写回范围互相干扰。

**决定**：通过"写回标签"字段指定唯一写回标签。

**工具配置提取区**精简为：
- 最大提取 AI 消息数
- 测试提取按钮
- **写回标签**（新增字段）
  - 类型：可选可填
  - 行为：下拉显示当前关联预设的所有标签，也允许手动输入
  - 提取仍然多标签，但写回时只认指定的这个标签

**职责边界**：写回是工具执行链（`tool-output-service` → `context-injector`）的职责，"写回标签"字段挂在工具配置上，**不属于**正则提取模块的功能。

---

### 7. 世界书注入预设 ✅

> **实现状态（v1.0.212）**：✅ 已落地。`worldbook-preset-panel.js` 含绑定模式（character_card / custom）、包含禁用词条开关、bookList + entryOverrides 完整 UI；工具配置 `worldbooks.presetId` 引用预设；`{{toolWorldbookContent}}` 宏由 `tool-worldbook-service.js` 解析。

**术语统一**：
- **世界书**（lorebook）= 一整本
- **词条**（entry）= 一本世界书里的具体条目

**决定**：升级为完整的预设管理器（和正则方案对齐）。

**预设级字段**：

| 字段 | 类型 | 说明 |
|------|------|------|
| 预设名 | string | |
| 描述 | string | 可选 |
| 绑定模式 | enum | `character_card`（动态绑定当前角色卡的世界书）/ `custom`（自由选任意世界书） |
| 包含禁用词条 | bool | 默认 false |
| 选中的世界书列表 | array | 见下 |

**单本世界书引用**：

| 字段 | 类型 | 说明 |
|------|------|------|
| bookName | string | |
| enabled | bool | 整本启停 |
| 词条覆盖 | array | 仅存差异（白名单/黑名单），新增词条自动 follow 默认状态 |

**注入机制**：
- **不走** ST 原生世界书注入（不需要 position / depth / order / role / 分隔符）
- 通过 `{{toolWorldbookContent}}` 宏在工具的 prompt template 中替换为合并后的世界书内容
- 合并方式由 `tool-worldbook-service.js` 内部固定处理

**UI 行为**：
- 快捷取消世界书：列表行旁直接 × 或开关
- 展开词条：点击世界书行展开，列出所有词条
- 禁用词条交互：
  - "包含禁用词条 = false" → 被禁用的词条置灰不可勾选
  - "包含禁用词条 = true" → 被禁用的词条可勾选，勾选后强制注入
- 批量勾选、一键全选/反选、一键移除世界书
- 导入/导出 JSON
- 测试预览

**引用方**：
- 工具配置：select 一个预设（不支持多预设）
- 表格工作台：select 一个预设

---

### 8. 工具配置面板 HTML 重构 ⏸ → ✅ 已落地

> **实现状态（v1.0.212）**：✅ 已落地。`tool-config-panel-factory.js`（797 行）重写为 hero（含 chips + 立即执行/保存按钮）+ 绑定区 + 配置区 + flow-section 结构；macro-hint / footer / 自动触发区 / 内嵌正则与世界书均已删除，全部走预设引用。v1.0.211 修复 hero 滚动压缩相关 #3 bug。

**依赖**：1-7 全部定案 + Prefab 控件库雏形

**目标布局**：

```
yyt-tool-panel
├── hero (sticky, 滚动时压缩)
│   ├── 工具名 + 描述
│   ├── chips (模式/预设/状态)
│   └── 按钮: 保存配置 + 立即执行一次
├── runtime 状态概览 (inline 行)
├── 绑定区 (flow-section)
│   ├── 输出模式 select ── dashed divider
│   ├── API 预设 select ── dashed divider
│   ├── Ai 指令预设 select (无开关) ── dashed divider
│   ├── 正则提取预设 select ── dashed divider  ← 新增
│   └── 世界书预设 select  ← 新增（替代当前的内嵌世界书选择）
├── 配置区 (flow-section)
│   ├── 副标题: 提示词模板
│   │   └── textarea + 宏 hint + 重置按钮
│   ├── dashed divider
│   └── 副标题: 提取配置
│       ├── 最大消息数 input + 测试提取按钮 (同行)
│       └── 写回标签 input（select 预设标签 + 手填）
└── (无 footer, 无 macro-hint, 无 自动触发区, 无 settleMs/cooldownMs)
```

**已删除项**：
- 自动触发区（由 output_mode 决定）
- 内嵌正则规则编辑器（改为引用预设）
- 内嵌世界书选择 UI（改为引用预设）
- macro-hint 框（宏说明放在模板 hint 中）
- footer（保存/执行按钮移入 hero）

---

### 9. 持久化重构 + Authority 接入 ✅

> **实现状态（v1.0.212）**：✅ 已落地。`core/tool-data-provider.js` (Provider 工厂 + IToolDataProvider 接口) + `authority-provider.js` (163 行) + `fallback-provider.js` (498 行) 三件套到位；`modules/storage.js` 兼容层已删除；填表数据通过 `table-engine/table-data-service.js` 接入双轨（state-service / lock-service / chat-scope-service 双写到 IToolDataProvider）。

**调研结论**（详见参考项目调研 A.1 + B）：

- shujuku-spv3.7 用的是 `sql.js`（纯 JS asm 内存 SQLite，~1.5MB），**不是后端**，最终持久化仍走 ChatMessage
- ST-Delegation-of-authority (`window.STAuthority.AuthoritySDK`) 是真正的后端方案：Node 适配层 + Rust core + 真 SQLite 文件，按用户 + 按扩展隔离

**最终决定**：采用 Authority 优先 + JSON fallback 的双轨方案。

#### A. 三层架构

```
Layer 1: storage-service.js (现有, 配置数据 — 所有用户)
   ↓ extensionSettings / localStorage
Layer 2: authority-client.js (新增, 工具数据 — 装了 Authority 的用户)
   ↓ Authority SDK → Rust core → 真 SQLite (per-user × per-extension 隔离)
Layer 3: fallback-store.js (新增, 工具数据 — 没装 Authority 的用户)
   ↓ storage-service.js 走 JSON 兜底
```

#### B. Provider 模式

定义统一接口 `IToolDataProvider`，启动时自动选择：

- 检测到 `window.STAuthority` → 实例化 `AuthorityProvider`（首选）
- 检测不到 → 实例化 `FallbackProvider`（JSON 模式，功能降级但能用）

新功能只对接 `IToolDataProvider`，不关心底层。

#### C. `IToolDataProvider` 接口最小集

| 方法 | 说明 |
|------|------|
| `init()` | 初始化（Authority: 调用 `AuthoritySDK.init()` 声明权限；JSON: 加载 cache） |
| `dispose()` | 清理资源 |
| `migrate(migrations)` | 建表 / 改表（Authority: 走 `client.sql.migrate`；JSON: 自维护 schema 版本） |
| `query(sql, params)` | 查询读 |
| `execute(sql, params)` | 写入（INSERT / UPDATE / DELETE） |
| `batch(operations)` | 事务批量提交 |
| `paginate(sql, params, page)` | 分页查询 |
| `backup()` | 备份当前数据库快照（导出 SQL dump 或 JSON） |
| `export()` | 导出为可移植格式 |
| `import(data)` | 从备份恢复 |

JSON fallback 模式下，SQL-like 操作通过简单的 in-memory 查询 + JSON 序列化实现，功能受限但接口一致。

#### D. 适用范围

| 数据 | Provider |
|------|----------|
| 表格行数据 | IToolDataProvider |
| 剧情推进辅助数据（未来） | IToolDataProvider |
| 小剧场数据（未来） | IToolDataProvider |
| 执行历史（如果做） | IToolDataProvider |
| 工具定义 / 预设 / 设置 | storage-service.js 直走 |

#### E. 权限声明策略

```js
declaredPermissions: { sql: { private: true } }
```

只声明用到的，未来用到再加（避免不必要的权限提示）。

#### F. Bonus 能力（先记入文档，开发时再决定）

Authority 额外提供：
- **Trivium 图数据库**：剧情推进辅助可能用得上（类似 st-memory-enhancement 的图谱记忆）
- **后台任务**：定时备份、数据导出
- **SSE 事件**：跨窗口同步（多个悬浮窗共享数据时）
- **KV / Blob / 私有文件 / HTTP 代理**：按需

#### G. Key 结构整理（配置数据侧）

| 改动 | 现状 | 目标 |
|------|------|------|
| 合并 settings | `settings`（旧）+ `settings_v2`（新） | 统一为 `settings`（v2 结构），启动时迁移 |
| 抽出正则规则 | 嵌在旧 `settings.tagRulePresets` 中 | 独立 key `regex_presets`（在 `presetStorage` namespace 下） |
| 新增世界书预设 | 不存在 | 新 key `worldbook_presets`（在 `presetStorage` namespace 下） |
| 删除遗留 settings 字段 | `apiConfig` / `currentPreset` / `ruleTemplates` / `tagRules` 等冗余 | 删除（这些都有独立 key） |
| 清理 storage.js 兼容层 | `bootstrap.js:37` 还在用 | 改为直接用 `core/storage-service.js`，删 `storage.js` |

#### H. Chat 级隔离

按用户决定，**保持现状**：仅 `table-guide-service.js` 按 chatId 隔离，其他全局。
未来如有需要再迁移到 `chat_metadata`。

#### I. 数据迁移

- 旧的表格测试数据**全部清空**（用户确认无生产数据）
- 新功能直接从空库开始
- 老的 `settings_v2` 等配置数据保留

#### J. 改动文件清单

| 模块 | 文件 | 改动类型 |
|------|------|---------|
| 工具数据接口 | `modules/core/tool-data-provider.js` | 新建（接口定义 + factory） |
| Authority 实现 | `modules/core/authority-provider.js` | 新建 |
| Fallback 实现 | `modules/core/fallback-provider.js` | 新建 |
| 存储兼容层清理 | `modules/storage.js` | 删除 |
| bootstrap | `modules/app/bootstrap.js:37` | 改为直接 import storage-service.js |
| 设置迁移 | `modules/core/settings-service.js` | 启动时一次性迁移老 settings 字段 |
| 正则规则 | `modules/regex-extractor.js` + 新预设管理器 | 抽出到独立 key |
| 表格 schema | `modules/table-engine/table-schema-service.js` | 工具数据改走 IToolDataProvider |
| 表格 state | `modules/table-engine/table-state-service.js` | 改走 IToolDataProvider |

---

### 10. 酒馆事件监听集中化 ✅

> **实现状态（v1.0.212）**：🟡 部分落地。
> - ✅ `core/host-event-service.js` (414 行) 自身完整：HOST_EVENTS 常量（含 MESSAGE_SENT / USER_MESSAGE_RENDERED / GENERATION_AFTER_COMMANDS / IMPERSONATE_READY / MESSAGE_EDITED 等剧情推进所需事件）+ 统一 subscribe/emit/describe/ready/getHostApi/getHostContext API。
> - ✅ `tool-automation-service.js:15` 完全迁移，所有事件订阅与 API 发现都走 hostEvents。
> - 🟡 `context-injector.js:9` 仅迁移了事件 emit (MESSAGE_UPDATED)，宿主 API 发现 (line 431/1253/1263) 仍直读 `topWindow.SillyTavern`。
> - 🔲 `table-workbench-panel.js` 没有引用 host-event-service（也已无 SillyTavern 发现代码——可能间接走了其他服务）。
> - 🔲 用户消息能力（监听 USER_MESSAGE_RENDERED / setSendTextareaValue 封装 / 用户消息写回）未开发；剧情推进依赖项之一。
> - 🔲 其他模块（`api-connection.js` / `tool-worldbook-service.js` / `tool-execution-context.js` / `storage-service.js` / `table-state-service.js`）仍各自直读 `topWindow.SillyTavern`，未走 service 的 `getHostApi`。

**问题**：当前 3 处重复 30-50 行的宿主 API 发现代码（`tool-automation-service.js:31-101`、`context-injector.js:59-78`、`table-workbench-panel.js:1310-1332`），没有抽象层。用户消息相关事件（`MESSAGE_SENT`/`USER_MESSAGE_RENDERED`/`MESSAGE_EDITED`/`IMPERSONATE_READY`/`GENERATION_AFTER_COMMANDS`）当前未使用。

**决定**：新建 `modules/core/host-event-service.js`。

#### 职责

| 职责 | 说明 |
|------|------|
| 宿主 API 发现 | 统一 `getTopWindow` / `getHostApi` / `getHostContext` |
| eventSource 解析 | 统一 `resolveHostEventBridge` |
| 事件名归一化 | `eventTypes` 映射（兼容大小写、驼峰） |
| 订阅管理 | `subscribe(event, handler)` 返回 unsubscribe 函数 |
| 重连重试 | 宿主未就绪时的重试逻辑（当前在 automation-service 里） |
| 能力探测 | `describeEventSource()` 返回当前可用事件清单 |

**不负责**：防抖 / 去重 / 节流（业务侧自己做）、事务管理（automation-service 自己做）。

#### API 草案

```js
import { hostEvents, HOST_EVENTS } from '@/core/host-event-service.js';

const unsubscribe = hostEvents.subscribe(HOST_EVENTS.MESSAGE_RECEIVED, (payload) => { /* ... */ });
await hostEvents.emit(HOST_EVENTS.MESSAGE_UPDATED, { messageId });
const info = hostEvents.describe();   // { source, initialized, availableEvents }
await hostEvents.ready();
```

#### HOST_EVENTS 常量集合

现已用：`MESSAGE_RECEIVED` / `MESSAGE_UPDATED` / `GENERATION_STOPPED` / `CHAT_CHANGED` / `MESSAGE_DELETED`

新增（剧情推进辅助等会用到）：`MESSAGE_SENT` / `USER_MESSAGE_RENDERED` / `MESSAGE_EDITED` / `IMPERSONATE_READY` / `GENERATION_AFTER_COMMANDS`

#### 用户消息能力

合并到 `context-injector.js`，拓展为"消息读写中心"，支持：
1. 监听用户消息发送（订阅 `USER_MESSAGE_RENDERED` / `GENERATION_AFTER_COMMANDS`）
2. 修改输入框文本（封装 `setSendTextareaValue`）
3. 写回用户消息（操作 `chat[]` + `setChatMessages` + emit `MESSAGE_UPDATED`，同 assistant 写回模式）

#### 迁移阶段

| 阶段 | 改动 |
|------|------|
| 1 | 新建 host-event-service.js |
| 2 | tool-automation-service.js 迁移 |
| 3 | context-injector.js 迁移 + 拓展为消息读写中心 |
| 4 | table-workbench-panel.js 迁移 |
| 5 | 用户消息能力开发（剧情推进辅助依赖） |

每阶段独立 commit，向后兼容。

---

### 11. 浮球系统 (FloatingOrb) ✅ 设计

> **实现状态（v1.0.212）**：🔲 未开发。`modules/ui/floating-orb/` 目录不存在；`modules/ui/panel-host-mixin.js` 也未抽出；当前仅有设计稿 + Public API 草案。

**澄清**：原先误解为"可调大小的子窗口"，实际指 **iOS Assistive Touch 模式的常驻浮球 + 锚定弹出菜单**。

参考来源：用户提供的 `dashDeck` 实现（52x52 圆角浮球 + 可拖拽 + 锚定面板 + 徽章 + 触屏支持 + z-index 顶天）。

#### 抽象关系

| 抽象 | 用途 | 状态 |
|------|------|------|
| `popup-shell` | 主弹窗（魔棒菜单触发，挂全部主面板） | 现有 |
| `WindowManager` | 子窗口（可调大小，用于工具运行进度、表格浮动预览等） | 现有 |
| `FloatingOrb` | 常驻浮球 + 锚定菜单（iOS AssistiveTouch 模式） | **新增** |

三套并存，各管各的，互不冲突。

#### 模块结构

```
modules/ui/floating-orb/
  ├── orb-manager.js          # 单例，多 orb 注册/查询/注销
  ├── floating-orb.js         # FloatingOrb 类（拖拽 + 持久化 + 徽章）
  └── orb-anchored-panel.js   # 锚定面板（自动定位 + 关闭动画）
```

#### Public API

```js
import { orbManager } from '@/ui/floating-orb/orb-manager.js';

const orb = await orbManager.register({
  id: 'plot-advance-orb',
  icon: '🌌',                          // 或 SVG 字符串
  defaultPosition: { x: 40, y: 160 },
  title: '剧情推进',
  badge: () => unreadCount,            // 动态徽章
  onClick: () => { ... },              // 点击直接触发（二选一）
  panel: PlotAdvancePanel,             // 或挂载面板（用 Panel Host 协议，二选一）
});

orb.show(); orb.hide();
orb.updateBadge();
orb.openPanel(); orb.closePanel();
orb.destroy();

orbManager.getAll();
orbManager.getById('plot-advance-orb');
```

#### 核心特性

| 特性 | 说明 |
|------|------|
| 常驻 | 浮球挂在酒馆主界面，不依赖打开主弹窗 |
| 可拖拽 | 鼠标 + 触屏，位置持久化（按 orb id 存）走 `storage-service.js` 全局命名空间 |
| 弹出菜单 | 点击展开锚定面板，自动选方向（屏幕左右、上下） |
| 徽章 | 右上角小红点/数字（计数、状态提示） |
| 多浮球协调 | 多个浮球同时存在，避免重叠 |
| 单例清理 | 重新挂载时旧的自动清理（`__yytOrbCleanup_<id>` 模式） |
| 触屏支持 | mousedown + touchstart 双绑 |
| 跨 iframe | 监听 parent.document（兼容酒馆 iframe 环境） |
| 拖拽阈值 | 5px 内当点击，超过当拖拽 |
| outside-click | 自动关闭弹出菜单 |
| 弹出方向自适应 | 屏幕左右 + 上下空间检测 |

#### Panel Host 协议共用

浮球弹出菜单的 `panel` 与主弹窗 panel 使用**同一套 Panel Host 协议**（`render` / `bindEvents` / `destroy`），组件可通用——既能挂主弹窗内 tab，也能挂浮球菜单，也能挂 WindowManager 子窗口。

提取位置：从 `popup-shell.js` 抽出 `registerActivePanelHost` / `destroyActivePanelHost` 模式到独立的 `modules/ui/panel-host-mixin.js`，三套窗口系统都引用。

#### z-index 分配策略

**初期不做 z-index-allocator**，给三套系统分配固定区间避免冲突：

| 系统 | z-index 范围 |
|------|-------------|
| popup-shell | 10000-10099 |
| WindowManager | 10100-10499 |
| FloatingOrb | 2147483600+ |

未来真出现冲突再抽 `z-index-allocator.js`。

#### 适用场景（候选）

| 候选浮球 | 行为 |
|---------|------|
| 剧情推进辅助控制 | 弹菜单：开关 + 实时状态 + 任务进度 |
| 工具快速触发 | 弹菜单：列出所有手动工具，一键运行 |
| 状态监控 | 直接显示徽章（pending 数量）+ 点击进日志 |
| 悬浮主面板入口 | 替代魔棒菜单，点击打开主 popup |

#### 模块清单

| 模块 | 文件 | 改动类型 |
|------|------|---------|
| 浮球管理器 | `modules/ui/floating-orb/orb-manager.js` | 新建 |
| 浮球类 | `modules/ui/floating-orb/floating-orb.js` | 新建 |
| 锚定面板 | `modules/ui/floating-orb/orb-anchored-panel.js` | 新建 |
| Panel Host mixin | `modules/ui/panel-host-mixin.js` | 新建（提取自 popup-shell.js） |
| popup-shell 改造 | `modules/app/popup-shell.js` | 改用 panel-host-mixin |
| WindowManager 改造 | `modules/window-manager.js` | 改用 panel-host-mixin（可选挂载 panel） |

---

### 12. 预设面板合并（API/正则/世界书/表格模板）✅

> **实现状态（v1.0.212）**：✅ 已落地。`tool-registry.js:396-408` `presetManagement` 顶级 tab 含 4 个 sub-nav (apiPresets / regexPresets / worldbookPresets / tableTemplates)；`preset-manager-base.js` + 4 个具体 panel 全部到位；Bypass 仍是独立顶级 tab，符合决策。

**决定**：合并 3 个预设面板成一个"预设管理"主 tab，内部用 sub-nav 切换。**Bypass（Ai 指令预设）保持独立顶级面板**，因为它是消息列表编辑器形态，和"列表+表单"模式不同。

#### 主导航变化

**改前**（7 个顶级 tab）：
```
设置 / API 预设 / Ai 指令预设 / 正则提取 / 工具(动态) / 表格工作台 / 日志
```

**改后**（6 个顶级 tab）：
```
设置 / 预设管理 / Ai 指令预设 / 工具(动态) / 表格工作台 / 日志
```

#### 预设管理内部 sub-nav

```
API 预设 | 正则提取 | 世界书 | 表格模板
```

顺序按依赖关系（API 最底层 → 正则 → 世界书 → 表格模板）。表格模板在此做完整 CRUD（增删改、导入导出、复制），填表面板内顶部工具栏提供"加载/保存当前模板"快捷下拉。

#### PresetManagerBase 抽象

抽出 `modules/ui/components/preset-manager-base.js`，4 个具体预设面板继承它，只需填入：
- 数据源（storage key、数据结构）
- 编辑器字段渲染
- 验证规则
- 导入/导出 schema

提供标准三段式布局：**预设列表 + 编辑器 + 导入/导出**。

#### 不做的事

- ❌ 深链支持（暂不需要）
- ❌ 老用户迁移提示（用户即开发者，无需引导）
- ❌ Bypass 改名（不合并就不需要改）

#### 模块清单

| 模块 | 文件 | 改动类型 |
|------|------|---------|
| 预设基类 | `modules/ui/components/preset-manager-base.js` | 新建 |
| API 预设 | `modules/ui/components/api-preset-panel.js` | 改为继承 PresetManagerBase |
| 正则提取 | `modules/ui/components/regex-extract-panel.js` | 改为继承 PresetManagerBase |
| 世界书预设 | `modules/ui/components/worldbook-preset-panel.js` | 新建，继承 PresetManagerBase |
| 表格模板预设 | `modules/ui/components/table-template-panel.js` | 新建，继承 PresetManagerBase |
| Popup shell | `modules/app/popup-shell.js` | 新增"预设管理"顶级 tab + sub-nav，移除 3 个独立 tab |

---

### 13. 剧情推进辅助模块 ✅ 架构定案 / ⏸ 功能待开发

> **实现状态（v1.0.212）**：🔲 未开发。`modules/plot-advance/` 目录不存在；不过依赖的 `host-event-service`（#10）+ `IToolDataProvider`（#9）基座已就位，可随时启动开发。

**功能定义**：拦截用户输入 → 用绑定的 AI 预设 + 模板加工 → AI 回复作为加工后的用户输入回填 → 酒馆主流程用加工后的文本继续生成主对话回复。

参考来源：shujuku-spv3.7 的 plot 模块（详见参考项目调研 A.2）。

#### 关键澄清

"走酒馆 vs 不走酒馆"在该模块中的语义：

| 层级 | 是否经过 |
|------|----------|
| 酒馆主对话 chat pipeline（Generate, 发送按钮状态, 消息渲染） | **不经过** |
| 酒馆后端 API 代理 (`/api/backends/chat-completions/generate`) | **经过**（同当前工具执行模式） |

发送按钮状态不变就是因为不经过 chat pipeline，但 AI 请求仍由酒馆后端代理转发出去。

#### 架构

```
用户在输入框打字 → 按发送
       ↓
host-event-service 监听 GENERATION_AFTER_COMMANDS
       ↓
plot-orchestrator.js
   1. 检查启用状态 + 该 chat 是否绑定剧情预设
   2. 读输入框文本 → 走"剧情推进"模板提示词加工
   3. 调 api-connection.js (复用) → 用绑定的 AI 预设
   4. 拿到 AI 回复 = 加工后的用户输入
   5. setSendTextareaValue(加工后的输入) + 改 prompt
       ↓
酒馆主流程继续：用加工后的文本生成主对话回复
```

#### 拦截策略

**只用 `GENERATION_AFTER_COMMANDS` 事件**（不 hook `TavernHelper.generate`，避免侵入性 + 多插件冲突）。

参考 shujuku 策略 2：拦截后修改 `params.prompt` + `setSendTextareaValue(加工后文本)`，**不直接操作 `chat[]`**。

#### AI 调用层

**只复用 `api-connection.js`**（已有，自定义 fetch /api/backends/... 路径已实现）。可能新增 `generateOnce(messages, presetId)` 方法表示"一次性、不进入主对话流"的调用。

#### 模块清单

| 模块 | 职责 | 状态 |
|------|------|------|
| `modules/core/host-event-service.js` | 监听 `GENERATION_AFTER_COMMANDS` | 新建（#10） |
| `modules/plot-advance/plot-orchestrator.js` | 拦截编排 + 任务调度 | 新建 |
| `modules/plot-advance/plot-template-service.js` | 剧情推进模板管理（CRUD + 预设） | 新建 |
| `modules/plot-advance/plot-history-store.js` | 历史记录存储（走 IToolDataProvider） | 新建 |
| `modules/api-connection.js` | AI 调用 | **复用**，可能加 `generateOnce()` |
| `modules/context-injector.js` | `setSendTextareaValue` 封装 + 用户消息读写 | **拓展** |

#### 数据存储

| 数据 | 存哪 |
|------|------|
| 剧情模板（系统提示词、加工逻辑、绑定的 AI 预设 ID） | `storage-service.js` 全局 |
| 剧情任务运行配置（循环、超时、并发） | `storage-service.js` 全局 |
| 剧情执行历史记录（时间戳/原始输入/加工后输出/耗时/Token） | **IToolDataProvider（Authority SQLite）** |
| 当前 chat 关联的剧情预设 | `chat_metadata`（per-chat 隔离） |

#### UI 位置

**独立顶级面板**（不是工具列表里的"工具"）。理由：
- 现有工具是 AI 回复**之后**处理
- 剧情推进是用户发送**之前**处理
- 语义和生命周期都不同

#### 任务模型

**初版**：一次拦截 → 一次 AI 加工（单任务）。

**未来扩展**：一次拦截 → 多个并行任务 → 合并（shujuku 模式）。在 plot-orchestrator.js 设计时预留任务调度接口，方便后续扩展。

#### 优先级

**P2** — 不在 Phase 3 首批落地范围。先完成 host-event-service 和 IToolDataProvider 基础设施，剧情推进辅助作为后续功能模块开发。

---

### 14. 剧情外小剧场（parking lot）⏸ P3

> **实现状态（v1.0.212）**：🔲 未开发。仅文档记录候选场景与待定问题，未启动设计细化。

**概念框架记录，具体设计待用户启动时再展开**。

#### 初步理解（待用户确认）

跳出主剧情对话的"独立小副本"，类似 RPG 支线/做梦回忆片段：

| 特征 | 候选定义 |
|------|---------|
| 位置 | 不在主剧情对话流里 |
| 触发 | 用户手动启动一个小剧场（场景） |
| 隔离 | 每个小剧场是独立的小对话池子，不污染主剧情上下文 |
| 配置 | 每个小剧场单独配置：角色、提示词、API 预设、世界书 |
| 数据 | 小剧场的对话内容、状态、变量独立存储 |
| 退出 | 结束后可选择"丢弃"或"摘要回写主剧情" |

#### 候选用途

- 写作辅助：临时切到一个角色的视角写一段补充内容
- 战斗模拟：独立的"战斗子场景"AI 演算
- 数值推演：让 AI 跑一遍数值模型
- 信息查询：跳出去问 AI 一个事实，不污染主对话

#### 待定问题

1. 小剧场的具体形态：嵌入主对话的"折叠片段" vs 独立窗口
2. 数据隔离深度：完全独立 vs 共享世界书 vs 共享角色卡
3. 回写策略：自动摘要 / 手动选择 / 永不回写
4. 触发方式：浮球 / 消息内按钮 / 快捷键

#### 数据存储

- 小剧场配置：`storage-service.js` 全局
- 小剧场实例数据（对话记录、变量、状态）：**IToolDataProvider（Authority SQLite）**
- 主剧情关联（哪个 chat 启动了哪个小剧场）：`chat_metadata`

#### 优先级

**P3** — 在 host-event-service / IToolDataProvider / 剧情推进辅助 之后再开发。

---

### 15. 填表工作台重写设计 ✅

> **实现状态（v1.0.212）**：✅ 主链已落地 / 🟡 增强项待补。v1.0.193 sign-off 主链稳定（18 项核心能力对齐 shujuku，见 [TABLE_PARITY_WITH_SHUJUKU.md](./TABLE_PARITY_WITH_SHUJUKU.md)）。剩余 6 项盲区（G1 数据编辑器 config mode 可编辑 UI / G2 per-table 自动更新调度验证 / G3 AI 改表助手 dock / M1 锁定 UI / M2 模板预设 UI 完整度 / M4 sendLatestRows 等）为 v1.1+ 增强方向，不阻塞当前发布。
>
> ⚠️ 文档勘误：本节原始设计含 6 处与 shujuku 实际架构的偏差（5 张 SQLite 系统表 / HTML table 渲染 / 双作用域模板 / DSL 数组语法 / SQL WHERE 隔离 / 7 步独立函数），**实际重写以 [TABLE_REWRITE_PLAN.md](./TABLE_REWRITE_PLAN.md) §1 修订表为准**。

**决策**：全面对标 shujuku-spv3.7 重写填表模块（仅填表，其他模块不动）。理由：现有填表"极其简陋和丑、UI 架构也要抄"，shujuku 是验证过的成熟方案（详见参考项目调研 A.3）。

#### 对标 shujuku 的核心抽象（必须复制）

| # | 抽象 | 说明 |
|---|------|------|
| 1 | `Sheet` 数据结构 | `{uid, name, content[][], sourceData, updateConfig, exportConfig, orderNo, seedRows}` |
| 2 | per-message 隔离存储 | 每条消息对应一份表格数据快照 |
| 3 | SheetGuide 机制 | 聊天首层消息存"指导表"作为合并/排序/填表骨架 |
| 4 | 模板预设双作用域 | 全局 + 聊天级（inherit_global / chat_override） |
| 5 | AI 指令 DSL | `<tableEdit>insertRow/updateRow/deleteRow</tableEdit>` 函数式语法 |
| 6 | 三级锁定 | 行锁 / 列锁 / 单元格锁 + 特殊索引列锁（自增编号列） |
| 7 | 填表 7 步编排 | buildBatchMergeBase → loadBatchBaseData → prepareAIInput → callAI → parseTableEdits → applyEdits → writeback+sync |

#### 可简化（不抄）

- ❌ 旧版兼容存储（`TavernDB_ACU_Data` 等）—— 全新开始
- ❌ 向量混合增强（embedding/rerank）
- ❌ 纪要表/总结表特殊处理（初版统一）
- ❌ 批处理分组并发（初版单线程）
- ❌ 自动合并总结（merge-logic）
- ❌ AI 改表助手 dock（锦上添花，后期加）
- ❌ 4 套主题（沿用 youyou_Toolkit flat-flow）

#### 持久化策略（IToolDataProvider 双轨）

**Authority 模式**（首选）：

```sql
CREATE TABLE table_schemas (
  schema_id     TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  description   TEXT,
  columns_json  TEXT NOT NULL,
  source_data_json TEXT,
  update_config_json TEXT,
  export_config_json TEXT,
  default_active BOOLEAN DEFAULT TRUE,
  order_no      INTEGER,
  created_at    INTEGER,
  updated_at    INTEGER
);

CREATE TABLE table_activation (
  chat_id       TEXT NOT NULL,
  isolation_key TEXT NOT NULL DEFAULT '',
  schema_id     TEXT NOT NULL,
  enabled       BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (chat_id, isolation_key, schema_id)
);

CREATE TABLE table_rows (
  chat_id       TEXT NOT NULL,
  message_id    TEXT NOT NULL,
  swipe_id      TEXT NOT NULL DEFAULT '0',
  isolation_key TEXT NOT NULL DEFAULT '',
  schema_id     TEXT NOT NULL,
  row_index     INTEGER NOT NULL,
  data_json     TEXT NOT NULL,
  PRIMARY KEY (chat_id, message_id, swipe_id, isolation_key, schema_id, row_index)
);
CREATE INDEX idx_rows_chat ON table_rows(chat_id, isolation_key);
CREATE INDEX idx_rows_slot ON table_rows(chat_id, message_id, swipe_id);

CREATE TABLE table_lock_state (
  chat_id       TEXT NOT NULL,
  isolation_key TEXT NOT NULL DEFAULT '',
  schema_id     TEXT NOT NULL,
  lock_type     TEXT NOT NULL,        -- 'row' / 'col' / 'cell' / 'index_col'
  target_json   TEXT NOT NULL,         -- {row?, col?} 标记锁定目标
  PRIMARY KEY (chat_id, isolation_key, schema_id, lock_type, target_json)
);

CREATE TABLE table_writeback_target (
  chat_id        TEXT PRIMARY KEY,
  worldbook_name TEXT,
  updated_at     INTEGER
);

CREATE TABLE isolation_state (
  chat_id       TEXT PRIMARY KEY,
  enabled       BOOLEAN DEFAULT FALSE,
  code          TEXT DEFAULT ''
);
```

**Fallback 模式**（没装 Authority 的用户）：走 `storage-service.js`，嵌套 JSON 对象结构：

```json
{
  "tableData": {
    "[chatId]": {
      "[messageId]_[swipeId]": {
        "[schemaId]": { "content": [[...]], "lockState": {...} }
      }
    }
  }
}
```

#### 功能降级对照

| 功能 | Authority | Fallback |
|------|-----------|---------|
| 基础读写 | ✅ | ✅ |
| 历史回溯 | ✅ 快 | ⚠️ 遍历，慢 |
| 跨表查询 | ✅ SQL | ❌ |
| 大数据量 (1000+ 行) | ✅ | ⚠️ 卡顿 |
| 备份/导出 | ✅ SQL dump | ⚠️ JSON dump |
| 向量检索（未来） | ✅ Trivium | ❌ |

#### 检测与迁移

- 启动时检测 `window.STAuthority` → 实例化对应 Provider
- 没检测到：设置面板 banner 提示安装 Authority 可获更好性能（不强制）
- 后期装 Authority：弹窗"发现 Authority 已就绪，是否迁移 Fallback 数据到 SQLite？"，用户确认后 INSERT

#### UI 架构

三区布局对标 shujuku：

```
┌──────────────────────────────────────────────────────┐
│ 顶部工具栏：模式切换 / 模板快捷下拉 / 保存(全局或chat)    │
├──────────────────────────────────────────────────────┤
│ 左侧栏    │  主区域                                     │
│ ─────    │  ─────                                      │
│ 表列表    │  - 数据模式：HTML table 渲染各行              │
│ 上下移动  │  - 配置模式：表头编辑 + 更新参数 + 世界书注入   │
│ 新增删除  │  - 全局注入：跨表设置                         │
└──────────────────────────────────────────────────────┘
```

#### 表格渲染：HTML table（不抄卡片式）

理由：
- "工作台"语义贴合（Excel 直觉）
- 列对比直观
- 屏幕利用率高
- 后续需要美化可由酒馆助手脚本导入数据单独渲染

#### 模板预设位置：方案 C（折中）

- **填表面板顶部工具栏**：模板加载/保存当前快捷下拉（高频）
- **预设管理 → 表格模板 sub-tab**：完整 CRUD、导入导出、复制（低频）
- 两边数据同一份

#### isolationKey 处理

schema 字段全留，UI 默认隐藏（接口预留，未来需要时再加 UI）。

#### AI DSL：原样抄 shujuku

```
<tableEdit>
insertRow(sheet_xxx, ["值1", "值2", "值3"])
updateRow(sheet_xxx, 3, [null, "新值", null])
deleteRow(sheet_xxx, 5)
</tableEdit>
```

`null` = 该字段不变。解析器逐条应用，命中锁定状态时跳过。

#### 必须解决的 7 个旧 bug（acceptance criteria）

| Bug | 数据层解决方式 |
|-----|--------------|
| A1（切 chat 写回目标不变） | `table_writeback_target` 按 chat_id 主键 |
| A2（世界书条目跨 chat 污染） | worldbook entry comment 必带 `[YY:chatId={chat_id}]`，sync 严格按 chatId WHERE |
| A3（空 chat 看到其他数据） | 所有查询 `WHERE chat_id = ?`，新 chat 无记录就空 |
| B1（第一张表被替换） | "当前激活表"是 UI 状态不存数据库；列表按 order_no 排序 |
| B2（两个纪要表） | schema_id PRIMARY KEY 防重，创建前 SELECT 检查 |
| C1（重填工具台数据丢） | writeback 走事务，本地写 + worldbook 同步同事务 |
| C2（重填行数没增加） | JSON 解析失败立即 toast + 写日志，禁止静默吞错 |

重构前先把这 7 个 bug 转成具体测试步骤存到 `docs/TABLE_ACCEPTANCE_TESTS.md`，重构完逐项验证。

#### 与 Phase 3 决策接合

| 议题 | 接合方式 |
|------|---------|
| IToolDataProvider (#9) | 数据持久化层底层 |
| host-event-service (#10) | 监听 CHAT_CHANGED / MESSAGE_RECEIVED 自动刷新 |
| Prefab 控件库 (#1) | 表格 cell、表头、配置 form 用控件库构建 |
| 预设管理合并 (#12) | "表格模板"加入 sub-nav 作为第 4 个预设面板 |

#### 模块清单

| 模块 | 文件 | 改动 |
|------|------|------|
| 数据接口 | `modules/table-engine/table-data-service.js` | 新建（基于 IToolDataProvider） |
| Schema 服务 | `modules/table-engine/table-schema-service.js` | 重写 |
| 模板服务 | `modules/table-engine/table-template-service.js` | 重写 |
| 模板预设面板（CRUD） | `modules/ui/components/table-template-panel.js` | 新建（继承 PresetManagerBase） |
| 状态/历史 | `modules/table-engine/table-state-service.js` + `table-history-service.js` | 重写 |
| 写回 | `modules/table-engine/table-writeback-service.js` | 重写 |
| 世界书同步 | `modules/table-engine/table-worldbook-sync-service.js` | 重写 |
| 锁定 | `modules/table-engine/table-lock-service.js` | 重写 |
| AI 指令解析 | `modules/table-engine/table-edit-parser.js` | 新建（DSL parser） |
| 填表编排 | `modules/table-engine/table-update-orchestrator.js` | 重写 |
| 工作台面板 | `modules/ui/components/table-workbench-panel.js` | 重写 |
| 侧栏 | `modules/ui/components/table-workbench-sidebar.js` | 新建 |
| 主区数据模式 | `modules/ui/components/table-workbench-data-mode.js` | 新建 |
| 主区配置模式 | `modules/ui/components/table-workbench-config-mode.js` | 新建 |
| Acceptance Tests 文档 | `docs/TABLE_ACCEPTANCE_TESTS.md` | 新建 |

---

## Preview 工作流

按依赖顺序：

1. **世界书预设面板**（最新，先定义控件雏形）
2. **正则提取预设管理器**
3. **工具配置面板**（综合 1+2 的预设选择器控件）
4. **设置面板执行器 tab 改造**
5. **工具列表 sub-nav 融合方案**
6. **新建自定义工具流程**（弹窗/流程图）
7. **填表工作台**（最复杂，对标 shujuku 三区布局 + HTML table）

Preview 文件目录：`D:\Projects\yyt-style-preview\phase3-*.html`

---

## 改动文件清单汇总

| 模块 | 文件 | 改动类型 |
|------|------|---------|
| 控件库 | `modules/ui/components/controls/*.js` | 新建 |
| 工具数据接口 | `modules/core/tool-data-provider.js` | 新建 |
| Authority 实现 | `modules/core/authority-provider.js` | 新建 |
| Fallback 实现 | `modules/core/fallback-provider.js` | 新建 |
| host-event-service | `modules/core/host-event-service.js` | 新建 |
| 浮球管理器 | `modules/ui/floating-orb/*.js` | 新建 |
| Panel Host mixin | `modules/ui/panel-host-mixin.js` | 新建 |
| 预设基类 | `modules/ui/components/preset-manager-base.js` | 新建 |
| 世界书预设 | `modules/ui/components/worldbook-preset-panel.js` | 新建 |
| 表格模板预设 | `modules/ui/components/table-template-panel.js` | 新建 |
| 剧情推进辅助 | `modules/plot-advance/*.js` | 新建 |
| 正则提取 | `modules/ui/components/regex-extract-panel.js` | 重写为预设管理器 |
| 世界书服务 | `modules/tool-worldbook-service.js` | 重构数据模型 |
| 工具配置 | `modules/ui/components/tool-config-panel-factory.js` | HTML 重构 |
| 工具管理 | `modules/ui/components/tool-manage-panel.js` | 删除 |
| 工具数据 | `modules/tool-manager.js` | 新增预设关联字段 |
| 自动化 | `modules/tool-automation-service.js` | 扩展 local_transform + 走 host-event-service |
| 设置 | `modules/ui/components/settings-panel.js` | 移除自动化 tab，执行器 tab 增强 |
| 设置服务 | `modules/core/settings-service.js` | 移除 `automation.enabled` + 启动迁移 |
| Popup shell | `modules/app/popup-shell.js` | 大改：预设管理 sub-nav + 移除工具管理顶级 tab |
| WindowManager | `modules/window-manager.js` | 改用 panel-host-mixin |
| api-connection | `modules/api-connection.js` | 新增 generateOnce() |
| context-injector | `modules/context-injector.js` | 拓展为消息读写中心 |
| storage 兼容层 | `modules/storage.js` | 删除 |
| bootstrap | `modules/app/bootstrap.js` | 改 import 路径 |
| 主样式 | `styles/main.css` + `bootstrap.js:getBaseStyles()` | 三文件同步 |
| 填表引擎 | `modules/table-engine/*.js` | 全量重写 |
| 工作台面板 | `modules/ui/components/table-workbench-*.js` | 全量重写 |
| Acceptance Tests | `docs/TABLE_ACCEPTANCE_TESTS.md` | 新建 |

---

## 关联文档

- [PANEL_LAYOUT_AUDIT.md](./PANEL_LAYOUT_AUDIT.md) — Flat Flow Phase 2 面板布局审计 + Flat Flow 设计规范
- [TABLE_ACCEPTANCE_TESTS.md](./TABLE_ACCEPTANCE_TESTS.md) — 填表工作台重构 acceptance 测试场景（重构前创建）
- [CHANGELOG.md](./CHANGELOG.md) — 版本变更历史
- [FRAMEWORK_ARCHITECTURE.md](./FRAMEWORK_ARCHITECTURE.md) — 框架架构总览
