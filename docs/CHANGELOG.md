# 更新日志

本项目的所有重要更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

## [1.0.193] - 2026-05-18

### 重构

- **议题 #15 #16 第二阶段**：拆 schema-helpers
  - 新建 `modules/table-engine/table-schema-helpers.js` (80 行)：`normalizeCellValue` / `sanitizeColumnKey` / `ensureUniqueColumnKey`
  - `table-schema-service.js` 1210 → 1187 行，re-export 保持向后兼容
  - 修 `normalizeColumnType` 用 `TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS`（v1.0.191 拆 defaults 时遗漏的引用）
  - 阶段 3/4 跳过：validation/config 跟 normalize 链路深度耦合，强拆形成循环依赖

### 新增

- **模板归档 UI**（议题 #15 盲区 4）：工作台 hero 加「📋 归档 (N)」按钮（仅在有归档时显示）
- 点击 toggle 显示归档面板（最多 8 份）
- 每条显示时间 + mode（preset_link / chat_override / inherit_global）+ 「恢复」按钮
- 自动归档触发点：每次 `applyTemplateAsChatOverride` / `linkPresetToChat` / `resetChatTemplateScope` 时

### 文档

- **议题 #15 sign-off**：7 项原 bug A/B/C 全标 Implementation Verified（含修复版本号）
- TABLE_REWRITE_PLAN §8 hotfix 流水线扩展到 v1.0.193，#16 阶段 1+2 完成 + #8 #12 实质完成
- `table-update-service.js` 文件头加 orchestrator 说明注释（议题 #15 #8 实质完成）

## [1.0.192] - 2026-05-18

### 修复

- **单表 disable 不生效**（议题 #15 Bug #33-I）：v1.0.190 toggle 把 enabled 状态保存到 `config.tables[i].enabled`，但 `config.tables` 在用户切换激活模板时不同步（id 都不一样，sheet_xxx vs default_xxx）。主链 `scopeTables = resolveActiveTemplate().tables`，永远 enabled=true，**完全没读用户的 toggle 状态**。结果：runScope 不排除 disabled 表 → AI 填了 → 写回 worldbook 也包含
- **修复**：把 enabled 状态独立到 `config.tableEnabledOverrides = { [tableId]: bool }`，不依赖 config.tables 是否同步。主链 scopeTables 合并 overrides，runScope filter / buildScopedRequestTables / worldbook-sync 全链路看 scopeTables.enabled

### 诊断

- `table-json-sanitizer.parseIncrementalEdits` 加 `console.warn`：解析失败的指令行打印失败行内容（疑似 AI 给的指令但语法错误）
- `applyIncrementalEdits` 加 warn：insertRow 应用时如果 newRow.cells 为空 + name 为空，warn 出 editDataKeys + editDataPreview，便于下次复现「空数据行」时定位根因

## [1.0.191] - 2026-05-18

### 重构

- **议题 #15 #16 第一阶段**：拆默认值常量到独立模块
  - 新建 `modules/table-engine/table-defaults.js` (273 行)：runtime status / fill mode / 默认 prompt / 响应契约 / column type / 8 张默认表
  - `table-schema-service.js` 1433 → 1210 行 (-223)，re-export 这些常量保持向后兼容
  - table-defaults 是叶子模块，零外部依赖，零功能影响

### 文档

- CHANGELOG.md 补 v1.0.181-190 完整条目
- TABLE_ACCEPTANCE_TESTS.md 第 5 节补 N1-N10 新发现 bug（涵盖 H1-H9 + Bug #33-A 到 H 8 个子修复），均已 sign-off

## [1.0.190] - 2026-05-18

### 修复

- **范围设置无法持久化**（H7 同模式）：UI select onChange 只保存顶层 `runScope`，但 `normalizeTableWorkbenchConfig` 用 `normalizeRunScopeConfig(nextValue.scope, {...})`，`source.mode` 旧值优先于 fallback 里的 `nextValue.runScope`，导致切换界面后又回到旧值
- **修复双重防御**：
  - workbench-window select onChange (runScope) 同步更新 `scope.mode`；切到 `enabled` 时清掉 `activeTableId`/`selectedTableIds` 残留
  - `normalizeTableWorkbenchConfig` 顶层 runScope 字符串非空时合并进 incomingScope（顶层优先）

### 新增

- **单表激活/禁用 toggle**（议题 #15 #33-H）：表格概览每张卡片左上加开关，切换 `config.tables[i].enabled`，配合 `runScope='enabled'` 模式过滤
- 禁用样式：半透明 + 删除线
- toggle stopPropagation 避免触发卡片点击

## [1.0.189] - 2026-05-18

### 修复

- **hero 范围 chip 改为一键重置按钮**：用户合理质疑 UI 上没有「激活某张表」的入口，那 mode='current' 不应该让用户去 select 里找重置入口
- 非 enabled 时 chip 改为「⚠️ 仅当前表 — 点此重置」按钮，点击立即 save: `runScope='enabled'`, `scope.mode='enabled'`, `activeTableId=''`, `selectedTableIds=[]`

## [1.0.188] - 2026-05-18

### 新增

- **工作台 hero 加范围 chip 提示**：用户测试发现默认模板「只填第一张表」不是 bug 是配置（用户的 config.scope.mode='current'+activeTableId='default_global_state'）。UI 没显式展示这个状态导致用户没意识到
- chip 显示「范围: 仅当前表 ⚠️ / 仅选中表 / 所有启用表」，非 enabled 时红色样式 + ⚠️ 标记

## [1.0.187] - 2026-05-18

### 修复

- **世界书条目数据空**（议题 #15 Bug #33-F）：`mergeTablesWithSchema` 按 index 拿 `configTables`（config.tables 旧快照）的 columns 替换 runtime columns，但激活模板切换后 config.tables 跟 runtime 的 row.cells.key 完全错位（同 #33-B/C 模式但漏修了 worldbook-sync 这层）
- **修复**：`mergeTablesWithSchema` 重写为「以 runtime 为准 + 按 id 匹配 schema 仅回填 exportConfig」

### 诊断

- `applyIncrementalEdits` 加 edits 总览日志（按 table / 按 op 统计）

## [1.0.186] - 2026-05-18

### 新增

- **模板格式适配器架构**（议题 #15 #33-E，用户提议）：
  - `modules/table-engine/template-adapters/` 目录
  - `index.js`：注册中心 importerRegistry / exporterRegistry，`importTemplateAuto(raw)` 自动探测 + 解析
  - `youyou-importer.js`：youyou 原生 `{tables:[]}` 格式
  - `shujuku-importer.js`：shujuku `{mate, sheet_x}` / `{tables:{sheet_x}}` 两种布局
  - `youyou-exporter.js`：占位（下轮 UI 格式选择时配 shujuku-exporter）

### 修复

- **列 key 位置映射**（核心修复）：`applyIncrementalEdits` 新增 `resolveColumnKeyFromRawKey` 工具函数，优先级 direct → index ("0"/"1") → col_n ("col"/"col_2") → fallback，AI 用任何风格 key 都能正确写入
- **Prompt 统一为位置索引**：
  - `INCREMENTAL_PROMPT_SUFFIX` 示例改 `{"0":"v"}` 索引风格
  - `formatTableGuidance` 列展示改 `[idx]: title — description`（不显示 column.key）

### 重构

- `table-template-service.normalizeTemplate` 改走 `importTemplateAuto`，替代 v1.0.181 加的三路 if 手写检测
- `table-schema-service` export `sanitizeColumnKey` / `ensureUniqueColumnKey` / `normalizeCellValue` / `parseShujukuNoteColumns` 给适配器复用

## [1.0.185] - 2026-05-18

### 修复

- **stale scope 自动 fallback**（议题 #15 #33-D）：用户日志暴露根因 — `mode='current' + activeTableId='default_global_state'`（旧默认表 id），但激活模板已切到 shujuku 且 actual tables 是 sheet_xxx，runScope.allowedTableIds 跟 allTableIds 没交集 → filter 全 false → droppedByScope: 4/4
- **修复**：`table-scope-service.resolveTableRunScope` mode='current'/'selected' 但选中 id 全不在 tables 范围时自动 fallback 到 'enabled'。不修改持久化 config，只在 runScope 层 fallback。加 `staleScope` 标志 + `requestedMode` 字段

## [1.0.184] - 2026-05-18

### 诊断

- 加 `runScope 已解析` 日志，打印 `mode/requestedMode/staleScope/allowedTableIds/allTableIds/scopeTablesEnabled`，下次测试时一眼能看清是 mode 配错、enabled 字段意外为 false，还是 allowedTableIds 跟 previousTables 不同步

## [1.0.183] - 2026-05-18

### 修复

- **runScope 用错 tables 集合导致 edits 全被丢**（议题 #15 #33-C）：`resolveTableRunScope(config.scope, config.tables)` 用 `config.tables`（默认 default_xxx id）解析 allowedTableIds，但 `previousTables` 来自激活模板（shujuku sheet_xxx id），两套 id 完全不重合 → `filterIncrementalEditsByScope` 全 droppedByScope
- **修复**：runScope 改为基于激活模板的 tables 解析，与 templateTables / previousTables 用同一份 scopeTables

## [1.0.182] - 2026-05-18

### 修复

- **模板切换后聊天仍用旧数据**（议题 #15 #33-B）：v1.0.181 修了模板预设解析，但填表主链读 `config.tables`（工作台配置快照），切换激活模板时不会同步
- `update-service.templateTables` 改为优先取 `resolveActiveTemplate({}).template.tables`，fallback `config.tables`

### 新增

- 工作台 Hero 加「**清空 chat 数据**」按钮：触发 `clearStateInChat` 清当前 isolationKey 下所有楼层的 slot 数据，让模板切换后从头开始

## [1.0.181] - 2026-05-18

### 修复

- **shujuku 模板格式不被识别**（议题 #15 Bug #33-A）：`normalizeTemplate` 期望 `{tables:[]}` 数组格式，但 shujuku 导出文件是 `{mate, sheet_0, sheet_1, ...}` 对象格式，tables 字段直接被丢成空数组，导致激活该模板后 AI 返回的 tableIndex>=length 全部 continue
- **修复**：`normalizeTemplate` 兼容 3 种格式：
  1. youyou 原生 `{tables: [...]}`
  2. shujuku 嵌套 `{tables: {sheet_x: {...}}}`
  3. shujuku 根对象 `{mate, sheet_0, sheet_1, ...}`
- 内部复用 `parseTableWorkbenchTemplate` → `convertShujukuTemplateToTables`

### 诊断

- `importTemplates` 和 `resolveActiveTemplate` 加诊断日志

## [1.0.180] - 2026-05-18

### 修复
- **数据编辑器三 mode 内容相同 + sidebar 无表**：`renderMainPane()` 第一段 `if (tables.length === 0)` 不区分 mode 直接 return 空提示。修：(1) `loadEditorData` slot 空时调 `resolveActiveTemplate` 拿模板 tables 作 fallback（sidebar + schema mode 能用）(2) `renderMainPane` 区分 mode — global mode 永远渲染（跨表设置不依赖 tables），data/schema mode 才需要 tables (3) data mode 在 fromTemplate 时显示提示条「当前是模板默认结构，编辑后会创建 slot 数据」

## [1.0.179] - 2026-05-18

### 修复
- **数据编辑器窗口创建后不可见**（议题 #15 #11）：用户实测诊断显示窗口创建成功（`createWindow returned: true`、`onReady triggered`、DOM 在 body 里），但 `offsetParent: null` + `clientHeight: 0`。**根因**：`window-manager.createWindow` 用 `document.body / document.head`，但 SillyTavern iframe 嵌套环境下模块代码的 `document` 是 iframe 自己的（隐藏），UI 在 `window.parent.document`。CSS 和元素都被附加到隐藏的 iframe document → 不可见。
- **修复**：用 `modules/ui/utils.js` 已有的 `getTargetDocument()` helper（popup-shell 同模式）。`injectWindowStyles` 注入到 top document.head，`createWindow` 内 modal overlay + window 元素 append 到 top document.body。CSS 和元素同 document，渲染正常。

## [1.0.178] - 2026-05-18

### 修复
- **绑定区配置切换后切回工作台回到默认值**（Bug 3）：`normalizeTableWorkbenchConfig` 白名单丢字段
  - 顶层 `bypassPresetId`（normalize 期望 `bypass.presetId`）
  - `automation.enabled`（normalize 用 `autoUpdateEnabled`）
  - `extraction.regexPresetId`（完全不接收）
  - `worldbooks.presetId`（只接收 enabled/selected）
  - `worldbookSync.wrapperConfig.*`（normalize 把 wrapperConfig 放顶层）
- **修复（双向）**：
  - schema-service.normalizeTableWorkbenchConfig 兼容新旧路径
  - workbench-window UI 读写路径走 normalize 后标准（`autoUpdateEnabled` / `bypass.presetId`）

### 诊断
- 数据编辑器没反应 — 加 console.log 跟踪 click → openTableDataEditor → loadEditorData → createWindow 各步骤（v1.0.179 据此修复 root cause）

## [1.0.177] - 2026-05-18

### 修复
- **写回世界书 targetBook 默认改为当前角色卡绑定**（Bug 1）：原 v1.0.176 让用户从所有 lorebook 手选；现在默认 = 角色卡 primary lorebook，没打开聊天时 select 禁用 + 显示「未打开聊天」警告
- 新增 `loadCharacterBoundLorebook()` helper（多 API fallback：`getCurrentCharPrimaryLorebook` / `getCharLorebooks().primary` / `getChatLorebook` / `SillyTavern.context.characters[idx].data.character_book`）
- 新增 `isChatOpened()` helper（基于 `getCurrentChatId()`）

## [1.0.176] - 2026-05-18

### 新增（议题 #15 主路径完整接入）
- **议题 #15 #32：IToolDataProvider 双轨接入**（修 PLAN D5 误判）
  - 新建 `modules/table-engine/table-data-service.js`（~470 行）— 4 张 SQL 表（sheets/rows/locks/chat_scope）+ 高层 CRUD API
  - state-service.commitBoundState 主路径仍写 message 字段（保兼容），异步镜像到 SQL（双写）
  - lock-service / chat-scope-service 同样双写
  - Authority 用户 SQLite 累积真实数据，Fallback 走 storage-service JSON + 迷你 SQL 解释器
- **议题 #15 #11：数据编辑器窗口**（`modules/ui/components/table-data-editor-window.js` 新建 ~880 行）
  - 独立浮窗（createWindow 1200x800），3 个 mode（数据编辑 / 结构配置 / 全局注入）
  - 数据 mode：card-grid + cell contenteditable + 行名编辑 + 删除/添加行
  - Sidebar 表列表 + 切换；Toolbar dirty badge + 重新加载/保存/立即填表
  - 保存调 `commitBoundState(target, {tables: tempData})`
- **议题 #15 #30：写回世界书配置 UI**（工作台「填表行为」section）
  - 「同步到世界书」toggle 开启后展开 sub-zone：目标世界书 / Wrapper enabled+tag+hint / 注入位置（position+depth+order）
  - 配置存到 `config.worldbookSync.wrapperConfig.*`
- **议题 #15 #31：默认模板 prompt 改为 DSL 优先**
  - `DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE` 加 DSL 指示
  - `TABLE_WORKBENCH_RESPONSE_CONTRACT` 含 `<tableEdit>` 完整示例 + 列索引字符串约定
  - AI 走 DSL 后议题 #21 的 incremental parser 接通生效

## [1.0.175] - 2026-05-18

### 修复
- **议题 #15 #21 第二段修复**：sanitizeAIResponse 没 unwrap `{tables:[...]}` envelope，导致 AI 用 JSON 全量替换格式时主链 `normalizeRuntimeTables(parsed.tables)` 收到对象不是数组 → 返回空数组 → 覆盖 slot 状态成空 → 表格无数据 + worldbook 无条目
- 修：sanitizeAIResponse 检测 envelope 类型，unwrap 提取 `.tables` 数组；裸数组原样保留；其他 object 兜底找第一个 array 字段

## [1.0.174] - 2026-05-18

### 修复
- **表格概览行数永远是 0**：`loadWorkbenchState.tablesPreview` 读模板 schema 的 rows（永远空）而非 slot 实际 runtime tables。修：优先调 `getAssistantTableSnapshot(null)` 读 slot tableState.tables，没数据时 fallback 模板（加 updatedHint 显示数据更新时间）

## [1.0.173] - 2026-05-18

### 修复
- **工作台下拉框白框白字看不清**：自写的 `.yyt-tww-ctrl` 没 `!important` 被全局 select reset 覆盖。修：select/input 接入 toolkit 预制体 `yyt-select` / `yyt-input`（带 !important 防御），`.yyt-tww-ctrl` 仅做 size override
- **填表行为 section 超出深色渲染区**：`.yyt-tww` background 改 transparent 让父容器深色穿透

## [1.0.172] - 2026-05-18

### 修复
- **所有工具配置面板 hero chips 渲染丢失**：旧 1441 行 panel 顶部 import `TOOL_CONFIG_PANEL_STYLES` 并通过 `getStyles()` 注入到 ui-manager 全局 style tag；v1.0.170 重写 panel 时丢了这个注入路径。修：让 `createToolConfigPanel.getStyles()` 返回 `TOOL_CONFIG_PANEL_STYLES` 自身，每个工具 panel 自管 CSS 注入

## [1.0.171] - 2026-05-18

### 修复
- **工作台从浮窗回归 popup tab 内联**：preview-table-workbench.html 里 .win 容器被误读为独立浮窗。v1.0.170 把它实现成 createWindow 真浮窗 + popup launcher 两步流程，跟设计意图相反。修：table-workbench-window.js 改造为纯 view helpers 模块（renderWorkbenchHtml / loadWorkbenchState / bindWorkbenchEvents），table-workbench-panel.js 重写为 popup tab 直接内联渲染

## [1.0.170] - 2026-05-18

### 新增
- **议题 #15 #10：填表工具台独立窗口**（`modules/ui/components/table-workbench-window.js` 新建）。对应 `preview-table-workbench.html` v3 设计：Hero + 4 列 stat row + 7 binding-row（模板/触发模式/API 预设/Ai 指令/正则预设/世界书预设/作用域）+ 填表行为（填充模式/上下文消息数/同步 toggles）+ 表格概览 cards。复用 `window-manager.createWindow`，记忆位置/尺寸。
- **议题 #15 #13：popup tab 改为 launcher**（`modules/ui/components/table-workbench-panel.js` 从 1441 行瘦身到 ~200 行）。tab 内只放标题/描述/状态 chips/「打开填表工作台」「立即填表」按钮，实际功能下沉到独立窗口。
- 工具台窗口暴露「立即填表」「重填」两个快捷动作，「重填」内部调 `runManualTableUpdate(null, { clearBeforeUpdate: true })` 触发议题 #15 #23 的清空-重读-重生成三段式。

### 改善
- **议题 #15 #18：模板服务接入三模式作用域**（`modules/table-engine/table-template-service.js`）。新增 `getActiveGlobalTemplate / setActiveGlobalTemplateId / resolveActiveTemplate({chatId, isolationKey})` 按 chat × isolationKey 解析当前生效模板；新增 `applyTemplateAsChatOverride / linkPresetToChat / resetChatTemplateScope / listChatTemplateArchives / restoreChatTemplateArchive`。
- **议题 #15 #9 / #24：state + history 按 isolationKey 分桶**（`modules/table-engine/table-state-service.js` + `table-history-service.js`）。message 自定义字段 `YouYouToolkit_tableState` / `YouYouToolkit_tableBindings` 改为 `{ [isolationKey]: BoundState }` 结构，旧格式自动迁移为 `DEFAULT_ISOLATION_KEY` 桶。history-service 倒序遍历按 isolation 过滤（对应议题 #15 #24 loadBaseData）。新增 `clearStateAtMessageIndex` / `clearStateInChat` 供重填路径调用。
- **议题 #15 #23：重填三段式**（`modules/table-engine/table-update-service.js`）。`runManualTableUpdate(configInput, { clearBeforeUpdate: true })` 入口；先 `clearStateAtMessageIndex(targetMessageIndex)` 清空当前楼层 → state-service 内部 getMessageForTarget 自动重读最新 chat → 后续 `loadBoundStateOrTemplate` 走 history-service 倒序找前驱（对应 shujuku `clearTableDataAtFloors → loadAllChatMessages → refreshData` 三段式，修 议题 #15 C1/C2 bug）。
- **议题 #15 #19：worldbook 同步 chat 隔离加固**（`modules/table-engine/table-worldbook-sync-service.js`）。entry comment 前缀升级为 `YYT-[YY:chatId=${normalized_id}]-` 严格边界格式（旧 `YYT-[chatId]-` 仍能识别，向后兼容）；新增 `isOwnedByChat(comment, chatId)` helper，upsert / cleanup 严格按 isOwnedByChat 过滤，跨 chat 条目不再误更新或误删（修 议题 #15 A2 bug）。

### 已知缺口（待 v1.0.171+）
- **#11 数据编辑器窗口未做**：工作台窗口的"打开数据编辑器"按钮目前 toast 提示。手动编辑表行 / 字段 / 单元格的 UI 暂无（旧 panel 的 drawer 已删）。期间用户只能通过"立即填表"让 AI 填，不能手动改数据。
- **#16 schema-service 重写未做**：1376 行旧 schema 模型仍在用；工具台窗口的模板 select 切换可以保存，但 Sheet 模型的 sourceData 5 段 / updateConfig sentinel / 索引列锁等议题 #15 §3 抽象 UI 上未暴露。
- **#8 orchestrator 7 步整理未做**：议题 #15 §5 的命名约定（`table-update-orchestrator.js`）暂未重命名，主链仍叫 `table-update-service.js`，内部已按 7 步关键节点对齐。

## [1.0.169] - 2026-05-18

### 新增（议题 #15 Stage 0 前置）
- **`docs/TABLE_REWRITE_PLAN.md`**（350 行）：议题 #15 修订版。明确 9 项关键决策 D1-D9 sign-off + shujuku 真实架构对标 + youyou_Toolkit gap 表 + 修订后任务清单 + 依赖图 + 优先级。重要勘误：shujuku 实际不存 5 张 SQLite 系统表（议题 #15 文档提案误读，实际只 `_acu_sheet_meta` 一张 + 业务表镜像，状态走 settings + ChatMessage 自定义字段）；shujuku UI 实际是 card-grid 不是 HTML table；模板实际三模式不是双模式；AI DSL 实际首参 tableIndex 整数 + 列索引对象语法。
- **`docs/TABLE_ACCEPTANCE_TESTS.md`**（431 行）：7 个旧 bug（A1/A2/A3/B1/B2/C1/C2）的复现步骤 + 期望行为 + 自动化验证思路 + 手动验证清单 + sign-off 状态行。重写完成前必须先 sign-off 全部 7 项。

### 新增（议题 #15 Stage 1 数据基础）
- **`modules/table-engine/table-types.js` 大幅扩充**：保留原有 12 个下游 import 兼容，新增 Sheet 严格结构（`content: (string|null)[][]`, `content[0][0]` 固定 `'row_id'`）+ Sheet helpers（`createSheet / normalizeSheet / cloneSheet / getSheetCell / setSheetCell`）+ sourceData 5 段常量 + updateConfig sentinel + 模板三模式枚举 `TABLE_TEMPLATE_SCOPE_MODE` + isolationKey helpers（`DEFAULT_ISOLATION_KEY / normalizeIsolationKey`）+ scopeKey 复合（`makeLockScopeKey / parseLockScopeKey`）+ 锁定四级类型扩展（行 / 列 / 单元格 / 索引列）+ DSL `createDslEdit` 工厂 + chat[0] / per-message 字段 key（`TABLE_SCOPED_CONFIG_KEY / TABLE_ISOLATED_DATA_KEY`）+ 表 ID 双层（container key `sheet_xxxx` + uid）。
- **`modules/table-engine/table-isolation-service.js` 新建**：isolationKey 抽象层。`tableIsolation.getState / isEnabled / getKey / setEnabled / setKey / updateState / reset / getScopeKey(chatKey) / subscribe(handler)`。基于 storage 全局命名空间，订阅模型支持下游切换时整库销毁重建。
- **`modules/table-engine/table-chat-scope-service.js` 新建**：chat[0] ScopedConfig 容器层。`tableChatScope.getTemplateScope / setTemplateScope / clearTemplateScope / archiveCurrentTemplate / listTemplateArchives / restoreTemplateArchive / clearTemplateArchives / resetChat`。模板归档按指纹去重，每 isolationKey 最多保留 8 份历史。v1 实现走 storage namespace by chatId，v2 待迁移到 chat[0] 消息字段方案。
- **`modules/table-engine/table-lock-service.js` 重写**：四级锁（行 / 列 / 单元格 / 索引列）+ storage 全局 by `${chatKey}::${isolationKey}` / sheetUid（shujuku 风格，不再绑定 boundState.meta）。新 API：`getSheetLockState / setRowLock / setColLock / setCellLock / setIndexColumnLock / clearSheetLocks / clearScopeLocks / isIndexColumnLocked`。旧 API（`getLocks / isLocked / isRowLocked / isColumnLocked`）签名兼容，`getLocks(boundState, tables)` 加 tables 参数用于 tableIndex → sheetUid 映射。**v1.0.168 及以下版本的 `boundState.meta.locks` 数据废弃**（议题 #15 §I 用户确认无生产数据）。

### 修复（议题 #15 Stage 2 AI 核心）
- **议题 #15 #21：parser 主链接通 + 删 sortEdits 重排**（`modules/table-engine/table-update-service.js`）。删除 `parsePatch` 孤儿函数（0 调用者，仅 export 不接主流程）+ 删除 `sortEdits` 重排函数（旧逻辑按 update→insert→delete 倒序重排，会让 AI 同轮 "先 insert 再 update 新行" 失败）。主链直接走 `sanitizeAIResponse` + applyIncrementalEdits 按 AI 原始顺序应用。
- **议题 #15 #26：callAI 3 次重试 + 5s 退避 + tableEdit 缺失门控**。`sendRequest + parseResponse` 套 `for (attempt = 1; attempt <= 3; attempt++)`；空 mode / 无 edits / 无 tables 视为失败触发重试；abort signal 中途取消立即退出（不再等待重试）；3 次后仍失败抛错。

### Phase B 收尾（议题 #47 链路质量）
- `modules/table-engine/table-json-sanitizer.js` 重写为 5 层 JSON 清洗管线 + 4 步命令解析回退（+497 行）。已实现 shujuku DSL parser 全部能力，主链通过 `sanitizeAIResponse` 调用。
- `modules/table-engine/table-schema-service.js` 修复 incremental / full prompt 指令矛盾：增加 `skipResponseContract` 选项让 incremental 模式跳过 full 响应契约段。

## [1.0.168] - 2026-05-17

### 改善
- **议题 #49：automation 链质量改善**（小幅，非重写）。
  - `setChatMessages` 的 `refresh` 参数条件化：auto-run 路径改为 `refresh: 'none'`（手动执行保持 `'affected'`），消除自动写回后宿主重发 MESSAGE_RECEIVED 的最后一个风险源。数据持久化不受影响（`saveChat` / `saveChatDebounced` 无条件执行）。
  - 清理 dead code：移除 `quickContentHash()`（slotKey 替代后无调用方）和 `_pruneCancelledKeys()`（空 stub）。
  - 提取硬编码常量：`OWN_WRITE_TTL_MS` (10s)、`WRITEBACK_THROTTLE_MS` (15s)、`SETTLE_MS_FALLBACK` (800ms)。
  - `processAssistantMessage` 可读性拆分：提取 `_executeAutoTools` 和 `_executeAutoTableUpdate` 私有方法，主方法变为纯编排层。

### 修复
- **多工具自动执行写回冲突**：local transform 工具以 `full_message` 模式覆盖了 API 工具已追加的 block。
  - **根因**：执行顺序错误（API 工具先追加 block → local transform 后覆盖全文）+ 多工具共享初始快照文本（后续工具看不到前序工具的写回结果）。
  - **修复 1 — 执行顺序**：local transform 先于 post_response_api 执行（文本变换先做，block 追加后做）。
  - **修复 2 — 链式读取**：每个工具写回后，从宿主重新读取当前消息文本，刷新 `lastAiMessage` / `assistantBaseText` / `chatMessages` 快照，确保后续工具基于最新文本工作。
  - **修复 3 — 自动/手动开关**：local transform 工具新增 `output.autoTrigger` 字段（默认 `true`），面板绑定区加"自动触发"下拉，chip 文案从固定"手动"改为动态显示。`autoTrigger: false` 的工具不再被自动执行链纳入。

## [1.0.167] - 2026-05-16

### 修复
- **议题 #45 P0 blocker：正则/世界书预设切换不生效**，根因终于查明。
  - **现象**：用户在工具配置面板切正则提取预设或世界书预设后保存"无反应"、chip 不变、切换面板回来值回退。其它字段（输出模式 / API 预设 / Ai 指令预设）切换都正常。
  - **根因**：`tool-config-panel-factory.js` 与 `local-transform-tool-panel-factory.js` 里所有 `showToast` 调用**参数顺序反了**，`showToast(message, 'success')` 把消息当 type、把 'success' 当 message。`showToast` 的签名是 `(type, message, duration)`，内部走 `topWindow.toastr[type](message, ...)`，所以 `toastr['已绑定正则预设：xxx']` 是 undefined，调 `undefined(...)` 抛 TypeError。这个 TypeError 又被 `select-input` 的 `try/catch{}` 静默吞掉，导致 onChange 里 `showToast` 之后的 `saveToolConfig + refresh` 整段代码完全没执行。
  - **修复**：批量把所有 `showToast(msg, type)` 改成 `showToast(type, msg)`（tool-config-panel-factory.js 7 处 + local-transform-tool-panel-factory.js 5 处）。
  - **防御**：`select-input.js` 的 onChange `try/catch` 不再静默吞异常，改为 `console.error('[selectInput] onChange 异常', err)`，避免下次类似 bug 被遮蔽。
  - **保留**：`window.YYT_PRESET_DEBUG=true` 诊断日志保留，方便未来排查类似 merge / persist 链路问题。

## [1.0.166] - 2026-05-16

### 变更
- **议题 #37：工具列表面板与 sub-nav 融合（Design A）**。`工具列表` 主 tab 删除，全部能力融入 `工具` sub-nav：
  - sub-nav 顶部加 toolbar：`+ 新建` / `↑ 导入` / `↓ 导出`。
  - 顶部加 filter 输入：实时按工具名筛选（隐藏未命中项与空分组）。
  - 自定义工具单独分组：`自定义工具`（紫色圆点），与现有 `AI 工具` / `脚本工具` 并列。
  - 自定义工具行 hover 出 `✎ 编辑` / `× 删除` 内联按钮；内置工具不显示这些按钮。
  - 新建/编辑工具弹窗换为 `dialog.custom` + controls 库实现（不再用 jQuery + HTML 字符串），导入/导出 dialog 同步重写。
  - `tool-registry.js` 删除 `toolManage` 主 tab 注册；`ui/index.js` 路由表移除 `toolManage`。
- **新文件**：`modules/ui/components/tool-actions-helper.js` — 抽出 `showToolEditDialog` / `confirmDeleteTool` / `showImportToolsDialog` / `showExportToolsDialog` / `confirmResetTools` 给 sub-nav 工具栏调用。
- **保留代码**：`tool-manage-panel.js` 文件不删，仅断开主导航与 ui 路由的注册。后续若 #44 浮球 / 其它地方需要老对话框可直接 import 引用，避免回滚成本。

## [1.0.165] - 2026-05-16

### 变更
- **世界书预设 "+ 添加" 对话框**：顶部加搜索框（实时筛选可用世界书）；"全选"按钮改为"全选可见"语义（只勾选当前过滤后可见的项）。
- **预设管理面板 sub-tab 切换清空选中**：从其他 sub-tab 切回某个预设面板时不再自动显示上次选中的预设编辑器，需用户主动点击列表项；内部 refresh（点击/重命名/复制等）保留当前选中。实现：`preset-manager-base.js` 利用 container 上的 `_yytLastPresetPanelKind` 标记区分 fresh mount 与内部 refresh。

### 调试
- **议题 #45 P0 blocker（预设切换不生效）诊断日志**：`tool-registry.js` 的 `getToolFullConfig` / `saveToolConfig` 加 opt-in console 日志，跟踪 base / user / merged 三层的 `extraction` 和 `worldbooks` 状态。启用方式：浏览器 console 执行 `window.YYT_PRESET_DEBUG = true`，然后复现切换流程；提交日志后即可定位是 save 没存进还是 read 拿到旧值。默认关闭，对生产无影响。

## [1.0.164] - 2026-05-16

### 修复
- **议题 #45 hotfix**：工具配置面板正则/世界书预设下拉切换不生效。
  - 根因：`tool-manager.js` 的 `normalizeWorldbookConfig` 只保留 `enabled / selected`，把 `presetId` 字段剥离掉了；同样 `normalizeToolDefinitionToRuntimeConfig` 的 extraction 只保留 `enabled / maxMessages / selectors`，丢失 `regexPresetId / writebackTag`。这是 #45 之前定义的 normalize 函数没跟上新字段，导致存量保存的 presetId/regexPresetId 在自定义工具配置加载时被丢弃，UI 显示不变化。
  - 修复：`normalizeWorldbookConfig` 加 `presetId` 字段；`normalizeToolDefinitionToRuntimeConfig` 的 extraction 加 `regexPresetId / writebackTag` 字段。

### 变更
- **世界书预设面板 UI 改进**：
  - 跟随角色卡模式：列表上方明确说明"以下来自当前角色卡的世界书将被注入；可单独关闭某本"，避免"全部勾选"的误解。
  - 自定义模式"+ 添加"按钮：从 `dialog.prompt` 输入名字 → 改为 `dialog.custom` 多选列表 + 全选按钮，从可用世界书中勾选要加入预设的项。

### 已知遗留（按 plan 留在 iter 3）
- 工具配置面板 hero 滚动压缩功能（plan 显式标注 iter 3）
- 词条级 override UI（世界书 iter 3）
- 写回标签 datalist 在某些浏览器可能不弹出 — 是浏览器 datalist 显示约定（focus + 输入字符或按 ↓），非 bug

## [1.0.163] - 2026-05-16

### 变更
- **议题 #45 Stage 5+6 完成**：runtime 直读预设 + 工具配置面板适配。议题 #45 全流程结束。
  - **`tool-output-service`** 新增 `_resolveExtractionContext(toolConfig)`：从 `extraction.regexPresetId` 直接解析 `{ rules, blacklist }`，包含 include / exclude / regex_include / regex_exclude 全类型。`_getExtractionSelectors` 改为派生函数（用于显示/日志）。`_applyExtractionSelectorsInternal` 直接用 rules，不再从 selectors 字符串构建。
  - **`tool-worldbook-service.buildSelectedWorldbookContent`** 函数签名改为 `(presetIdOrToolConfig)`：自动从 `worldbooks.presetId` 解析预设；支持 `character_card` 模式（动态拉角色卡世界书 + 预设 override）和 `custom` 模式（固定列表）；`includeDisabled` 控制是否包含源禁用词条。
  - **删除 mirror 函数**：`tool-config-panel-factory.js` 的 `mirrorRegexPresetToSelectors` / `mirrorWorldbookPresetToLegacy`、`local-transform-tool-panel-factory.js` 的 `mirrorRegexPresetToSelectors` 全部删除。
  - **删除 mirror 同步**：`tool-registry.js` 删除 `extractTags ↔ extraction.selectors` 双向同步逻辑（700-707）。
  - **内置工具 default config**：`extraction.selectors: ['xxx']` 改为 `extraction.regexPresetId: 'builtin_regex_<key>'`（summaryTool / statusBlock / youyouReview）；内置工具 `extractTags` 全部清空。
  - **写回标签 datalist**：工具配置面板「写回标签」字段改为 datalist 自动补全；候选 = 当前绑定预设的 include 标签；无绑定时合并所有正则预设的 include 标签去重作为 fallback。
  - **预设状态 chip**：工具 hero 区"正则"chip 现在始终显示状态——绑定时"正则: <名称>"或"正则: 已删除"，未绑定时"正则: 未绑定"（半透明）。

## [1.0.162] - 2026-05-16

### 修复
- **议题 #45 Stage 3 hotfix**：4 个预设面板的 `renderEditor` 全部用原生 `Node.appendChild(controlObject)` 直接挂控件对象，导致 "appendChild parameter 1 is not of type 'Node'" 异常，编辑区不可用。改为用 controls 库的 `appendChild` 工具函数（兼容 Node / control / 数组 / 字符串），api / regex / worldbook / table-template 4 个面板全修。

## [1.0.161] - 2026-05-16

### 变更
- **议题 #45 Stage 3+4**：4 个预设面板全部接入 PresetManagerBase + 主导航整合。
  - **API 预设面板**重写：从 jQuery + HTML 字符串 → controls 库 + factory；提供 store 适配器把 preset-manager.js 的 name-based API 映射成 id-based；保留"加载"按钮（hasSwitchToButton）。
  - **正则提取面板**改写：接入 base；规则行支持 HTML5 拖拽排序（inline 实现，未抽通用控件）；黑名单从 textarea 升级为 chipGroup 控件。
  - **世界书预设面板**改写：接入 base；保留"基本信息 + 选中世界书"作为 renderEditor 内容。
  - **表格模板预设面板**新建：接入 base；本期做基础 CRUD（name / description / promptTemplate / tables JSON 只读预览），复杂 schema 编辑留 #47 填表工作台同步设计。
  - **主导航整合**：`tool-registry.js` 删除 3 个独立顶级 tab（apiPresets / worldbookPresets / regexExtract），新增「预设管理」主 tab + 4 sub-tab（API 预设 / 正则提取 / 世界书 / 表格模板）。
  - **`popup-shell.js` sub-nav 泛化**：原本只有 `tools` 走 sub-tab 路由，改为任何 `hasSubTabs` 主 tab 都走（支持 presetManagement）。
  - **`ui/index.js` 路由更新**：MAIN_TAB_RENDERERS 移除 3 项；SUB_TAB_RENDERERS 新增 4 项（4 个预设面板）；PANEL_MODULE_LOADERS 新增 TableTemplatePanel。
  - 默认起始主 tab 从 `apiPresets` 改为 `presetManagement`。

## [1.0.160] - 2026-05-16

### 变更
- **议题 #45 Stage 2**：PresetManagerBase factory + 内置预设机制 + 一次性存量迁移。
  - **`preset-manager-base.js`** 新建：4 个预设面板共用的三段式 factory（列表 + 编辑器 + 导入/导出 toolbar）；接受 `renderEditor` / `renderExtras` / `renderListItemMeta` slot；新建/重命名/删除全用 `dialog` 控件；导入支持文件/文本，导出支持下载/复制。
  - **内置预设机制**：`regex-preset-store` 和 `worldbook-preset-store` 加 `_setBuiltinPresets` 钩子；`listPresets()` 把内置预设拼到列表头；`getPreset(id)` 命中 `builtin_*` 前缀走内置表；`updatePreset` / `deletePreset` / `renamePreset` 拒绝内置；`duplicatePreset` 允许内置 → 用户。
  - **`preset-bootstrap.js`** 新建：注册 3 个内置正则预设（`builtin_regex_summary` / `builtin_regex_status_block` / `builtin_regex_youyou`）+ 一次性存量迁移（老 `extraction.selectors` / `worldbooks.{enabled,selected}` 自动创建对应预设并绑 ID；命中内置 selectors 优先复用而不创建副本；失败时 abort 不写 done flag 保留老字段）。
  - **`bootstrap.js`** 在自动化服务初始化前调用 `ensurePresetSystem()`，dump 备份到 `migration_v45_backup`，done flag `migration_v45_done` 防重入。

## [1.0.159] - 2026-05-16

### 变更
- **议题 #45 Stage 1**：controls 控件库扩充 4 个新控件（为 PresetManagerBase 铺路）。
  - `dialog`：纯原生 DOM 实现的对话框工具集合（`confirm` / `prompt` / `custom` 三种模式），不依赖 jQuery，复用 `yyt-dialog-*` CSS 类；`prompt` 支持 validate hook。
  - `toolbar`：水平按钮组容器，支持 align（start/end/center/space-between）+ gap + wrap，三个预设面板 footer 通用。
  - `presetListItem`：`listRow` 的预设专用变体，加 active 状态点 + 内置/只读 badge + meta chip 区。
  - `chipGroup`：输入式标签组（回车/逗号添加，× 删除，Backspace 删尾），支持 datalist suggestions、`allowDuplicates` / `maxChips` / `chipVariant` 配置；用于黑名单 + 写回标签 datalist。
  - `controls/index.js` barrel 加导出。

## [1.0.158] - 2026-05-16

### 变更
- **彻底清理 `automation.enabled` 字段**（议题 #48 / Phase 3 决策 #4 收尾）。
  - `DEFAULT_SETTINGS.automation` 删除 `enabled` 字段；`settings-service` 加一次性迁移 `_migrateLegacy`，首次读到旧 settings 时静默删掉 `automation.enabled` 并写回。
  - per-tool config schema 删除 `automation.enabled` 字段：`tool-registry.js` 三处 default config + 合并逻辑、`tool-manager.js` default + `normalizeAutomationConfig` 全部去掉 `enabled`。
  - `tool-automation-service` 删除 `_enabled` / `_enabledCheckedOnce` 状态、`_evaluateEnabled` / `_checkEnabled` 方法、`SETTINGS_UPDATED` 监听里的 enabled 比对、`automation_disabled` skip 路径；`isEnabled()` / `getRuntimeSnapshot.enabled` 恒为 `true`，`_getAutomationSettings` 返回值删 `enabled`。
  - `settings-panel._saveSettings` 不再写 `automation.enabled`。

## [1.0.157] - 2026-05-16

### 变更
- **自动触发扩展到 local_transform**（议题 #40 / Phase 3 决策 #5）。
  - `tool-output-service` 新增 `OUTPUT_MODES.LOCAL_TRANSFORM` 常量与 `shouldRunLocalTransform()`。
  - `tool-automation-service` 在 `processAssistantMessage` 中合并 `post_response_api` 与 `local_transform` 工具，按各自路径执行。
  - 抽出 `runLocalTransformTool()` 到 `tool-local-transform-service.js`，手动（`tool-trigger`）与自动入口共用同一编排函数。
  - `tool-trigger.js` 移除内联的 local-transform 编排副本和不再需要的 `contextInjector` import。
- 自动触发规则现在完全由 `output_mode` 决定：`post_response_api` 与 `local_transform` 自动，`follow_ai` 始终手动。

## [1.0.156] - 2026-05-16

### 变更
- **设置面板**：删除独立的"自动化"tab，相关字段合并到执行器 tab（议题 #36 / Phase 3 决策 #4）。
  - `settleMs` / `cooldownMs` 归入执行器 tab 的"自动触发节流"区。
  - 自动化诊断 chip + 最近事务列表精简版归入执行器 tab。
  - 删除 `automation.enabled` 全局开关：自动触发已由 `output_mode` 决定（post_response_api / local_transform 自动，follow_ai 手动）。
  - 默认 `automation.enabled` 改为 `true`，`tool-automation-service._evaluateEnabled()` 直接返回 `true`，旧设置的 `enabled: false` 不再阻塞自动触发。
  - hero status chip 移除"自动化 开启/关闭"。

## [1.0.155] - 2026-05-16

### 变更

- ✨ **脚本工具面板迁移到新布局** (`modules/ui/components/local-transform-tool-panel-factory.js`)
  - 整体重写为 Prefab 控件构建，与 AI 工具面板同结构（Hero / Runtime / 绑定 / 配置）
  - 影响工具：转义处理 / 中文标点替换
  - **绑定区**：正则提取预设 select / 写回方式 select（覆盖 vs 追加）
  - **配置区**：执行方向 select / 处理项 toggles（脚本工具特有的多选项） / 提取配置（最大消息数 + 测试提取按钮）
  - 删除：独立 footer / 独立"启用状态" toggle（保持与 AI 工具面板一致，启用状态走工具列表）/ 独立"手动操作区"卡片（运行按钮上移到 hero）
  - 编辑即保存，正则预设镜像策略与 AI 工具面板一致

### 备注

- 脚本工具的迁移完成后，所有内置工具面板（AI + 脚本）布局统一
- TOOL_CONFIG_PANEL_STYLES 仍由 tool-config-panel-factory 导出，新脚本工具 factory 透传引用


## [1.0.154] - 2026-05-16

### 修复

- 🐛 **正则/世界书预设选"—— 无 ——"时破坏工具原有提取/世界书设置** (`modules/ui/components/tool-config-panel-factory.js`)
  - 原因：之前无论选什么预设都会执行 lossy 镜像，"无" 时镜像返回空，把 `extraction.selectors` / `worldbooks.selected` 写成空，覆盖了工具默认值
  - 修复：只有选具体预设时才执行镜像；选"—— 无 ——"只清空 presetId，保留老字段
- 🐛 **切换预设没有保存反馈** — 切换正则/世界书预设时新增 toast 提示，说明镜像后实际生效的标签/书目
  - 选具体正则预设：`已绑定正则预设；提取规则替换为：[tags]`
  - 选无：`已解绑正则预设，工具仍使用原有提取规则`
  - 世界书预设同理

### 已知未修

- **脚本工具未应用新布局**：`local-transform-tool-panel-factory.js` 是独立工厂，本次未迁移，脚本工具（转义处理 / 中文标点替换）的面板仍是老样式 —— iter 2 一并迁移
- **lossy 镜像的根本问题**：若选的正则预设里 include 标签和工具实际输出标签不匹配（如工具产 `<status_block>` 但预设抓 `<content>`），仍然提取不到内容。根治方案是 iter 2 让 runtime 直读预设、不再走镜像


## [1.0.153] - 2026-05-16

### 变更

- ✨ **工具配置面板整体重写** (议题 #8/#38/#39 iter 1, `modules/ui/components/tool-config-panel-factory.js`)
  - **新布局**：Hero（工具名 + 描述 + chips + 立即执行/保存按钮）→ Runtime 概览（4 列 inline：状态 / 最近运行 / 成功 / 失败）→ 绑定区（5 个 select：输出模式 / API 预设 / Ai 指令预设 / 正则提取预设 / 世界书预设）→ 配置区（提示词模板 + 提取配置：最大消息数 / 测试按钮 / 写回标签）
  - **删除**：独立 footer / 自动触发区 / settleMs+cooldownMs / 内嵌正则规则编辑器 / 内嵌世界书选择 / macro-hint dashed 框 / Ai 指令预设的 enable toggle
  - **新字段**：`extraction.regexPresetId` / `extraction.writebackTag` / `worldbooks.presetId`
  - **iter 1 镜像策略**：选预设时自动镜像到老字段（worldbooks.enabled+selected / extraction.selectors），runtime 仍读老字段，不破坏现有执行链；镜像有损（regex 的 exclude/regex_exclude、worldbook 的 includeDisabled/entryOverrides 不映射）
  - 全用 Prefab 控件库构建（flowSection / selectInput / button / textInput）
  - 编辑即保存

- ✨ **自动触发规则按 output_mode 决定** (议题 #5, `modules/tool-output-service.js`)
  - `filterAutoPostResponseTools` 去掉 `automation.enabled === true` 检查
  - 现在 `output.mode === 'post_response_api'` 选中即自动触发
  - **行为变更提示**：之前 mode=post_response_api 但 automation.enabled=false 的工具，现在会开始自动触发

### 备注

- 议题 #38 + #39 iter 1 完成；iter 2 待办：hero sticky 压缩、写回标签 datalist 自动补全（基于正则预设标签）、自定义 dialog、active 状态点、runtime 改读预设而非镜像字段（消除 lossy 镜像）
- 议题 #40 (扩展自动触发到 local_transform) 未做：local_transform 工具用的是 local-transform-tool-panel-factory，且自动化服务还未支持该路径
- TOOL_CONFIG_PANEL_STYLES 保留导出，table-workbench-panel 和 local-transform-tool-panel-factory 可继续 import


## [1.0.152] - 2026-05-16

### 变更

- ✨ **正则提取面板升级为完整预设管理器** (议题 #2/#35, iter 1)
  - 新增 `modules/regex-preset-store.js`：CRUD + 规则增删改 + 排序（▲▼）+ 黑名单 + 导入/导出
  - 老数据一次性迁移：`settings.tagRulePresets` 里的旧预设全部转入新 store；当前 `tagRules`+`contentBlacklist` 包成 "默认规则集（迁移）" 兜底（迁移标记位写 `settings.regex_presets_migrated`，不重复执行）
  - 引擎同步：切换 active preset 或编辑 active preset 时，自动把 rules+blacklist 灌入 regex-extractor 模块级状态，`extractTagContent` 调用路径无需改动
  - 重写 `modules/ui/components/regex-extract-panel.js`：全用 Prefab 控件库构建
    - 4 段式：预设选择 / 基本信息 / 提取规则（grid 5 列：上下移 / 名称+描述 / 类型 / 值 / 开关+删除） / 内容黑名单（textarea 一行一个） / 测试提取
    - 编辑即保存，无 draft / save 按钮
    - 删除预设时检测被引用工具，弹确认提示哪些工具会失效
  - 测试区即点即跑：用当前预设的 rules+blacklist 调 `extractTagContent` 显示提取结果

### 备注

- 议题 #35 iter 1 完成；iter 2 待办：拖拽排序、chip-group 黑名单、自定义 dialog、新建工具时自动同名预设、active 状态点视觉细节
- 工具配置面板的"提取配置"区还是 inline selectors（独立字段），改为 select 预设跟随议题 #38 落地


## [1.0.151] - 2026-05-16

### 新增

- ✨ **Prefab 控件库最小集** (议题 #33, `modules/ui/components/controls/`)
  - 9 个工厂控件：`button` / `textInput` / `selectInput` / `toggle` / `divider` / `zoneTitle` / `formRow` / `listRow` / `flowSection`
  - 统一契约：每个工厂返回 `{ el, _id, _kind, _children, on/off, get/set, getControl(id), destroy }`
  - 容器型控件（flowSection / formRow / listRow）的 `_children` 登记子控件，`getControl(id)` 可递归查找
  - 直接复用 `styles/main.css` 已有 `yyt-` 前缀类，不引入额外 CSS
  - 详见文件内注释 + `controls/index.js` barrel 协议说明
- ✨ **世界书注入预设面板** (议题 #7, 主导航新增"世界书预设" tab)
  - 新增 `modules/worldbook-preset-store.js`：CRUD + 导入/导出 + 当前预设指针，存储于 `presetStorage` namespace
  - 新增 `modules/ui/components/worldbook-preset-panel.js`：完全用 Prefab 控件库构建
  - 字段：预设名 / 描述 / 绑定模式（跟随角色卡 vs 自定义） / 包含禁用词条 / 选中的世界书（整本启停）
  - v1 简化：词条级覆盖 UI 留到迭代 2；添加/导入/清空走 `window.prompt/confirm`，UI dialog 迭代 2
  - 编辑即保存，无 draft / save 按钮

### 备注

- 议题 #34 的迭代 1 完成；迭代 2 待办：词条级 override UI、添加/导入/清空走自定义 dialog、测试预览输出区
- 配套集成（工具配置面板引用预设、表格工作台引用预设）跟随议题 #38 / #47 落地


## [1.0.150] - 2026-05-16

### 修复

- 🐛 **打开聊天 / 删除消息会误触发自动工具** (`modules/tool-automation-service.js`)
  - 原因：`_recentlyProcessedSlots` 去重表在内存中，页面刷新/切换聊天后为空；SillyTavern 在 chat 重渲染、消息删除等场景下重放 MESSAGE_RECEIVED 时，第一次会被当作全新消息走完调度链
  - 修复：新增 `_seedKnownSlots()`，在 init() / `_resetForChatChange()` / MESSAGE_DELETED 处理后预先把当前聊天最新 AI 消息的 slotKey 用 `Number.MAX_SAFE_INTEGER` 时间戳标记为已知，让重放事件命中去重守卫
  - 同时：scheduleFromEvent 始终从 message 的 `swipe_id` 字段读取真实 swipe 值，使重抽/swipe 切换形成的新 slotKey 不被旧 snapshot 误吞

## [1.0.149] - 2026-05-16

### 新增

- ✨ **Phase 3 后端基础设施（议题 #43 + #41）** — 详见 [PHASE3_ARCHITECTURE.md](./PHASE3_ARCHITECTURE.md)

  **host-event-service 集中化** (议题 #10)
  - 新增 `modules/core/host-event-service.js`：singleton 宿主事件订阅服务
    - 统一 `getTopWindow` / `getHostApi` / `getHostContext` / `resolveHostBridge`
    - `HOST_EVENTS` 常量集合（10 个事件，含 GENERATION_AFTER_COMMANDS / USER_MESSAGE_RENDERED / MESSAGE_EDITED / IMPERSONATE_READY 等剧情推进辅助所需）
    - `subscribe / emit / ready / describe / reinit / dispose` API
    - 宿主未就绪时排队订阅 + 自动重试（最多 20 次）
  - 迁移 `tool-automation-service.js`：删除 ~120 行重复 host-discovery 代码 + 自维护重试逻辑，5 个事件改走 `hostEvents.subscribe`
  - 迁移 `context-injector.js`：`_notifyMessageUpdated` 改走 `hostEvents.emit(HOST_EVENTS.MESSAGE_UPDATED)`
  - 迁移 `table-workbench-panel.js`：`_subscribeChatChanged` 改走 `hostEvents.subscribe(HOST_EVENTS.CHAT_CHANGED)`

  **IToolDataProvider 双轨持久化** (议题 #9)
  - 新增 `modules/core/tool-data-provider.js`：接口 + 工厂 + 单例 getter + 自动降级
  - 新增 `modules/core/authority-provider.js`：包装 `window.STAuthority.AuthoritySDK`，提供 `query / execute / batch / transaction / migrate / pageAll`
  - 新增 `modules/core/fallback-provider.js`：迷你 SQL 解释器（支持 CREATE TABLE / INSERT [OR REPLACE] / SELECT-WHERE-AND-ORDER-LIMIT / UPDATE / DELETE）+ 事务快照回滚 + debounced 300ms JSON 持久化
  - `bootstrap.js` 启动时异步初始化 Provider（不阻塞模块加载）
  - `public-api.js` 暴露 `getDataProvider()` / `getDataProviderAsync()`

### 删除

- 🗑️ **`modules/storage.js` 兼容层** — 直接 import `core/storage-service.js`，所有调用点已迁移

## [1.0.148] - 2026-05-15

### 修复

- 🐛 **补全遗漏的 CSS 扁平化** (main.css + bootstrap.js + tool-config-panel-factory.js)
  - `yyt-main-nav-icon`: 去掉 border + 硬编码 radius 12px → accent-soft bg + radius-sm
  - `yyt-shell-stat`: 从独立卡片 (border+radius+bg) → 透明 + border-left hairline
  - `yyt-shell-sidebar-card`: 去掉 border/radius/bg → 透明
  - `yyt-shell-sidebar-note`: 去掉 dashed border + accent bg → 纯文本 (text-muted)
  - `yyt-shell-sidebar-stat`: 去掉 border/radius/bg → 透明
  - `yyt-shell-main-meta`: 去掉卡片 → 透明 + border-bottom hairline
  - `yyt-popup-drag-hint`: dashed border → solid hairline
  - `yyt-sub-nav-item.active`: 去掉 box-shadow
  - `yyt-preview-message-item`: 独立卡片 → border-top hairline 行

### 文档

- 📄 合并 `TODO_TOOL_CONFIG_REFACTOR.md` 到 `PANEL_LAYOUT_AUDIT.md`（Tool Config Panel 章节新增"待实施：HTML 结构重构"）

## [1.0.147] - 2026-05-15

### 变更

- 🎨 **Flat Flow Phase 2 — 面板内部布局扁平化** (全组件)
  - Shell Frame: `yyt-content-frame` 去掉 padding/border/radius → 透明; `yyt-content` 去掉 border/radius; `yyt-shell-sidebar-note` 去掉 dashed 边框 → 纯文本 hint
  - Tool Config: `yyt-worldbook-select` 去掉边框卡片 → 透明; `yyt-worldbook-item` 从独立卡片 → border-top hairline 行; `yyt-tool-runtime-card` 去掉卡片 → 透明; `yyt-tool-manual-area` 从 2 列 grid → 单列 flex; `yyt-tool-macro-hint` 去掉 dashed 框 → 纯文本
  - API Preset: 去掉 `yyt-panel` 多余 wrapper; `yyt-preset-item` 从独立卡片 → border-top hairline 行
  - Regex Extract: `gap: 20px` → `0`; 去掉 `yyt-list-table` / `yyt-test-section` 多余 wrapper; `yyt-tag-suggestions` 去掉绿色卡片 → 透明
  - Bypass: `gap: 16px` → `0`; sidebar/editor 去掉 `border-radius: 12px` → 0; sidebar 改用 border-right hairline; `yyt-bypass-preset-item` 从圆角卡片 → border-top hairline 行
  - Logger: `gap: 10px` → `0`; toolbar 加 border-bottom hairline; `yyt-logger-list` 去掉 border/radius/bg → 透明 + border-top
  - `yyt-checkbox-label` tile 去掉 border/bg → 透明无框
  - 所有变更同步到 `main.css` + `bootstrap.js:getBaseStyles()`

## [1.0.146] - 2026-05-12

### 修复

- 🐛 **Unicode 智能引号污染导致 HTML 属性不生效** (`settings-panel.js`, `tool-manage-panel.js`, `api-preset-panel.js`, `table-workbench-panel.js`)
  - 多个组件的 HTML 模板中 `"` 被替换为 Unicode 右双引号 `”`，导致 `class=`、`data-tab=`、`type=`、`id=` 等属性全部失效
  - 设置页自动化标签：输入框样式丢失（白底窄小原生控件）、区块图标缺失、标签切换失败（自动化/调试内容同时显示）
  - 工具列表页：统计卡片布局崩塌为纯文本、工具行黑底黑字不可见、按钮样式丢失
  - 已清理全部 4 个源文件中的智能引号

- 🐛 **`.yyt-form-hint` 和 `.yyt-settings-hint` 无 CSS 定义** (`main.css`, `bootstrap.js`)
  - settings-panel 使用 11 次 `yyt-form-hint` 但全局无样式规则，提示文本无颜色/尺寸控制

- 🐛 **`.yyt-flow-heading-icon` HTML 结构错误** (`tool-config-panel-factory.js`, `api-preset-panel.js`, `regex-extract-panel.js`)
  - CSS 期望 `<span class="yyt-flow-heading-icon"><i>...</i></span>`，但 12 处将 class 直接放在 `<i>` 上，图标色块不渲染

- 🐛 **`popup-shell.js` 遗留旧布局类** (`popup-shell.js`)
  - `renderToolConfig()` 和 `renderToolPresets()` 仍使用 `yyt-panel-section` + `yyt-section-title`，已改为 flat flow 布局

## [1.0.140] - 2026-05-11

> 注：v1.0.125 ~ v1.0.139 的详细变更未单独记录，主要涉及 UI 重构（surface-ladder flat 设计系统）、主题系统完善和世界书同步 Phase 1 完成。具体改动见 git log。

## [1.0.124] - 2026-05-09

### 新增

- ✨ **世界书注入过滤禁用条目** (`modules/table-engine/table-worldbook-sync-service.js`, `modules/table-engine/table-writeback-service.js`, `modules/table-engine/table-schema-service.js`, `modules/ui/components/table-workbench-panel.js`)
  - 新增 `worldbookSync` 配置：`{ enabled, targetBook, entryComment }`
  - 填表成功后自动将表数据同步为目标世界书的一个常驻条目（`type: 'constant'`）
  - 支持 upsert 模式：按 `entryComment` 查找已有条目，存在则更新，不存在则创建
  - 表数据格式化为 Markdown 表格，便于 AI 阅读
  - UI 新增"世界书同步"区域：启用开关、目标世界书下拉、条目标识输入
  - 手动和自动填表都会触发同步

## [1.0.122] - 2026-05-08

### 新增

- ✨ **Phase 6：模板库管理与文件导入导出** (`modules/table-engine/table-template-service.js`, `modules/ui/components/table-workbench-panel.js`)
  - 模板下拉列表展示全部模板（内置 + 用户），内置模板标记 `(内置)`
  - 用户模板列表：显示模板名称、表数量，每条带删除按钮（二次确认）
  - 导出当前模板：下载为 JSON 文件（不再只复制到剪贴板）
  - 导出全部用户模板：一键导出整个模板库为 JSON 文件
  - 导入模板：文件选择器 → 解析 JSON → 支持单模板/批量/裸数组三种格式
  - `table-template-service` 新增 `exportUserTemplates()`、`importTemplates(payload, options)`、`renameTableTemplate(id, name)`

## [1.0.121] - 2026-05-08

### 改进

- 🔧 **正则规则改为自定义 textarea** (`modules/ui/components/table-workbench-panel.js`)
  - 原有 `contextUseExtractRules` / `contextUseExcludeRules` 两个全局复选框替换为自定义提取标签 textarea（`contextExtractTags`）+ 一个"同时应用全局规则"复选框（`contextUseGlobalRules`）
  - textarea 支持每行一个规则，格式与工具配置面板的提取标签一致（普通文本 / `regex:` 前缀）
  - `table-schema-service.js` `normalizeTableWorkbenchConfig` 自动向后兼容旧字段

## [1.0.120] - 2026-05-08

### 新增

- ✨ **填表上下文增强** (`modules/table-engine/table-schema-service.js`, `modules/table-engine/table-update-service.js`, `modules/ui/components/table-workbench-panel.js`)
  - `contextDepth`：可配置消息深度（默认 8），控制发送最近多少条消息给填表 AI
  - `contextRoles`：消息角色过滤（全部 / 仅 AI 消息），避免发送无关用户消息
  - `contextUseExtractRules` / `contextUseExcludeRules`：复用工具箱已有的全局正则提取/排除规则过滤消息内容
  - `worldbooks`：世界书注入，复用已有 `buildSelectedWorldbookContent` 基础设施
  - `sendLatestRows`：每表只发送最新 N 行给 AI（-1 = 全部），减少 token 消耗
  - 工作台新增"上下文配置"卡片，包含上述所有设置的 UI 控件

## [1.0.112] - 2026-05-08

### 修复

- 🐛 **修复写回后界面仍不刷新** (`modules/context-injector.js`)
  - `setChatMessages` 参数结构精简为 `{ message_id, message }`，与 MVU / TavernHelper 原生调用方式一致
  - 移除多余的 `mes` / `content` / `text` / `chat_index` 字段，避免宿主因非标字段忽略刷新
  - `setChatMessages` 函数解析增加 `topWindow` 全局直查（MVU 中 `setChatMessages` 注册在 `globalThis` 上，而非 `SillyTavern.getContext()` 返回的对象上）

- 🐛 **修复用户点击停止后工具仍通过后备链路继续请求** (`modules/api-connection.js`)
  - `sendViaCustomApi` 的 TavernHelper catch 块新增取消检测：`AbortError`、`signal.aborted`、以及错误消息包含"停止按钮"/"stop button"/"Clicked stop"/"请求已取消"
  - 取消操作不再静默回退到 SillyTavern / Direct 后备链路

## [1.0.111] - 2026-05-08

### 修复

- 🐛 **重写自动执行触发与去重链** (`modules/tool-automation-service.js`, `modules/tool-output-service.js`, `modules/context-injector.js`)
  - 自动链不再同时监听 `GENERATION_ENDED`，改为仅以 `MESSAGE_RECEIVED` 作为执行触发入口并加入 3 秒节流
  - 去重从 message content hash 改为 `messageId::swipeId` slot 级短期去重，避免工具写回后 content hash 改变导致自激重复执行
  - 增加 own-write 短期黑名单，自动工具或自动填表刚写回的 assistant 消息不会再次触发本插件自动执行
  - 监听 `GENERATION_STOPPED` / `generation_stopped` 时 abort 活跃事务并清空待处理队列，写回前检查取消状态
  - 自动写回向 `contextInjector` 传递 `skipNotify`，跳过主动 `MESSAGE_UPDATED` 广播以减少自触发和外部插件干扰

- 🐛 **修复工具写回后界面不刷新（需点编辑才显示）** (`modules/context-injector.js`)
  - 写回刷新路径统一为 `setChatMessages([{message_id, message}], { refresh: 'affected' })`，与 MagVarUpdate-beta 一致
  - 移除非标 `setChatMessage` 首选路径和多余的 `setChatMessages_refresh_assist` 重复调用
  - 不再传递 `refresh: 'display_and_render_current'`（宿主不识别该值导致静默忽略刷新）

## [1.0.110] - 2026-05-08

### 新增

- ✨ **Phase 3：加固 runScope 与 AI 编辑边界** (`modules/table-engine/table-update-service.js`, `modules/table-engine/table-scope-service.js`, `modules/ui/components/table-workbench-panel.js`)
  - AI prompt 中对只读表追加强约束指令：明确告知模型不得修改只读表的任何行，全量输出时必须原样保留
  - `current` / `selected` 模式下若无有效目标表，直接报错中止，不再静默回退到全部运行
  - `filterIncrementalEditsByScope` 返回过滤统计（total / passed / droppedByScope / droppedByLock）
  - 填表成功 toast 中显示因 scope 或锁定被过滤的编辑数量
  - 日志 scope `TableUpdate` 中记录过滤详情

## [1.0.109] - 2026-05-08

### 修复

- 🐛 **加强聊天隔离检测** (`modules/ui/components/table-workbench-panel.js`)
  - chatId 解析增加 `chat_filename` 和 `this_chid` 回退路径，与 automation service 一致
  - 当 `currentChatId` 或 `cachedChatId` 任一为空时也清空缓存（之前空值会跳过检查）
  - try-catch 内异常时也清空缓存，防止极端情况下残留旧数据

## [1.0.108] - 2026-05-08

### 修复

- 🐛 **实时行数据按聊天隔离** (`modules/ui/components/table-workbench-panel.js`)
  - `renderTo` 同步检查当前 chatId 是否与缓存的 `lastLiveTarget.chatId` 一致，不一致立即清空缓存，fallback 到模板配置
  - `_refreshLiveState` 异步检测 chatId 变更后清空缓存并重新从当前聊天的绑定态加载
  - 切换到无填表数据的聊天时，面板正确显示 0 行模板而非旧聊天数据

## [1.0.107] - 2026-05-08

### 修复

- 🐛 **修复打开配置表格后实时行数据丢失** (`modules/ui/components/table-workbench-panel.js`)
  - 点击"配置表格"时 `collect()` 从 DOM 读取行数据，但编辑器 drawer 尚未渲染行元素，导致收集到 0 行并覆盖了缓存中的实时数据
  - `collect()` 和面板内部交互现在以 `lastLiveConfig` 作为基础数据源，保证实时行不被空 DOM 覆盖
  - 关闭编辑器时保存结构配置后，重新从存储合并最新实时行再渲染

## [1.0.106] - 2026-05-08

### 新增

- ✨ **填表结果实时回显到工作台面板** (`modules/ui/components/table-workbench-panel.js`)
  - 填表完成后，表格概览和编辑器立即显示 AI 返回的行数据，不再始终显示 0 行
  - 面板打开时自动从最新 assistant 消息的绑定态加载已提交的表数据
  - 合并规则：config 提供结构（字段、AI 说明），绑定态提供实时行数据
  - 表卡片显示"实时/模板"来源标记，区分数据来自 AI 填充还是空模板
  - 采用 stale-while-revalidate 缓存模式：同步即时渲染 + 后台异步刷新，无白屏闪烁

## [1.0.105] - 2026-05-08

### 修复

- 🐛 **修复 `getTableWorkbenchPromptPresets is not defined` 模块加载报错** (`modules/table-engine/table-schema-service.js`)
  - export 列表中残留了已删除函数的具名导出，导致模块加载时 ReferenceError
- 🐛 **修复填表执行 `Cannot read properties of undefined (reading 'info')` 报错** (`modules/table-engine/table-update-service.js`)
  - `const log = logger.createScope(...)` 在 esbuild `__esm` 延迟初始化时 `logger` 尚未赋值；改为 `getLog()` 惰性调用

## [1.0.104] - 2026-05-07

### 修复

- 🐛 **修复填表执行 `Ca is not a constructor`** (`modules/table-engine/table-provider-service.js`)
  - esbuild `__esm` 延迟初始化模式下 class 声明被 hoisted 到赋值之前，导致 `new NativeTableProvider()` 报错 `is not a constructor`
  - 改用工厂函数返回普通对象，彻底消除 class 在延迟模块边界的 hoisting 问题

### 改进

- 📝 **填表执行链接入统一日志系统** (`modules/table-engine/table-update-service.js`)
  - 填表全链路关键节点（配置校验、上下文构建、目标解析、状态加载、请求构建、API 发送、响应解析、差异计算、写回结果、错误）均写入 `logger` scope `TableUpdate`
  - 可在日志面板中按 scope 过滤查看填表执行过程，方便定位错误

## [1.0.103] - 2026-05-07

### 修复

- 🐛 **修复填表执行报错 `Cannot read properties of undefined (reading 'NATIVE')`** (`modules/table-engine/table-provider-service.js`)
  - `getTableProvider()` 默认参数引用了 esbuild `__esm` 延迟初始化变量 `TABLE_PROVIDER_MODES.NATIVE`，在函数默认参数求值时该常量尚未初始化
  - 移除多余的 `TABLE_PROVIDER_MODES` 枚举和间接层，`getTableProvider()` 直接返回 `NativeTableProvider` 实例
- 🐛 **移除填表工作台 AI 绑定区多余的"查看 / 编辑填表 Prompt"折叠区** (`modules/ui/components/table-workbench-panel.js`)
  - 该入口与已有的"绑定 Ai 指令预设"功能完全重合，填表 promptTemplate 现在由 Ai 指令预设统一管理
- 🐛 **当绑定的 Ai 指令预设已包含 mainSlot 消息时不再追加 promptTemplate** (`modules/tool-prompt-service.js`)
  - 避免填表请求中同时发送 Ai 指令预设的多段消息和 legacy promptTemplate 用户消息

### 移除

- 🗑️ **删除死代码 `modules/table-engine/table-prompt-preset-service.js`**
  - 该文件自 1.0.101 起已无任何模块导入，现正式删除

## [1.0.102] - 2026-05-07

### 修复

- 🐛 **补回 Ai 指令预设中的默认填表预设** (`modules/bypass-manager.js`, `modules/tool-prompt-service.js`, `dist/bundle.js`)
  - 在既有 Ai 指令预设管理中提供内置“默认填表 Ai 指令预设”，打开预设列表即可直接看到并用于填表工作台绑定
  - 外部填表 prompt group 导入时会把 `$0` / `$1` / `$4` / `$8` / `$C` 映射为 YouYou 现有变量，避免导入后仍保留不可解析占位符
  - 绑定带 `mainSlot` 的多段 Ai 指令预设时，不再额外追加 legacy `promptTemplate` 用户消息，避免填表请求重复拼接两套提示词

## [1.0.101] - 2026-05-07

### 修复

- 🐛 **将外部填表提示词导入收口到既有 Ai 指令预设管理** (`modules/bypass-manager.js`, `modules/table-engine/table-schema-service.js`, `modules/table-engine/table-guide-service.js`, `modules/ui/components/table-workbench-panel.js`, `dist/bundle.js`)
  - 移除填表工作台中独立的“填表提示词预设”入口与并行选择字段，避免与已有“绑定 Ai 指令预设”功能重复
  - 外部填表 prompt group JSON 现在导入为普通 Ai 指令预设消息，可在原有 Ai 指令预设面板继续编辑
  - 填表执行链继续使用 `promptTemplate + bypass/Ai 指令预设`，不再读取独立 table prompt preset 资产

## [1.0.100] - 2026-05-07

### 修复

- 🐛 **恢复 popup 内容壳层与异步 UI 初始化时序** (`modules/app/bootstrap.js`, `modules/app/popup-shell.js`, `styles/main.css`, `dist/bundle.js`)
  - `bootstrap` 现在会等待 `uiModule.initUI()` 完成后再注入组件样式，避免动态 panel 注册尚未完成时提前聚合空样式
  - 恢复 `.yyt-content-frame > .yyt-content > .yyt-content-inner > .yyt-tab-content` 内容壳层结构，避免 1.0.98/1.0.99 中内容界面壳子整体塌缩
  - 保留 1.0.99 的基础控件全宽修复，避免 API 预设等表单控件继续收缩

## [1.0.99] - 2026-05-07

### 修复

- 🐛 **修复 1.0.98 填表工作台渲染失败与基础控件宽度回归** (`modules/table-engine/table-schema-service.js`, `styles/main.css`, `dist/bundle.js`)
  - 补回 `normalizeRunScopeConfig` 导入，避免 tableWorkbench 配置归一化时抛出 `normalizeRunScopeConfig is not defined`
  - 恢复 `.yyt-input` / `.yyt-select` / `.yyt-textarea` 的全宽与 `box-sizing: border-box`，避免 API 预设等界面输入框收缩

## [1.0.98] - 2026-05-07

### 新增

- ✨ **接入 tableWorkbench 提示词预设资产层，并支持 shujuku 填表 prompt group 导入 / 导出** (`modules/table-engine/table-prompt-preset-service.js`, `modules/table-engine/table-schema-service.js`, `modules/table-engine/table-guide-service.js`, `modules/ui/components/table-workbench-panel.js`, `modules/tool-prompt-service.js`, `dist/bundle.js`)
  - 新增独立的填表提示词预设存储层，提示词资产只影响请求消息构建，不写入 live table rows
  - 内置 shujuku 默认填表提示词预设，支持 raw prompt group JSON 导入、导出兼容数组，以及 `isMain` / `isMain2` 到 `mainSlot` 的兼容映射
  - shujuku 占位符会保守映射到 YouYou 宏；暂未支持的 `$6`、`$U` 会保留原文并显示 warning
  - `tool-prompt-service` 支持 ordered message segments，选择填表提示词预设后按 segment 顺序发送；未选择预设时继续沿用 legacy `promptTemplate`

### 修复

- 🐛 **加固 tableWorkbench WIP 发布边界，避免 UI 兼容层与模板导入再次引发空白或错存** (`modules/ui-components.js`, `modules/ui/index.js`, `modules/ui/ui-manager.js`, `modules/app/popup-shell.js`, `modules/table-engine/table-template-service.js`, `modules/ui/components/table-workbench-panel.js`)
  - `ui-components.js` 不再导入已经不存在的 eager panel 对象，兼容层改走动态 render helper 与安全样式聚合
  - tableWorkbench 模板导入先解析 pasted JSON，再保存导入 payload，避免模板库条目错误保存导入前的当前配置
  - 模板资产、聊天 guide、提示词预设与 live table state 的边界进一步明确，避免资产操作静默污染已提交表格状态

### 文档

- 📝 **同步 1.0.98 版本基线与填表提示词预设说明** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`, `package-lock.json`)
  - 更新当前版本号，并记录 template / guide / prompt preset / live state 的分层口径

## [1.0.97] - 2026-05-06

### 修复

- 🐛 **修复 tableWorkbench 配置服务缺失 storage 导入导致整个内容区空白** (`modules/table-engine/table-schema-service.js`, `dist/bundle.js`)
  - 恢复 `table-schema-service.js` 对 `core/storage-service.js` 的导入，避免模块初始化阶段直接抛错
  - 修复 `TableWorkbenchPanel` 导入链报错后连带阻断 `toolManage` 与侧边导航内容渲染的问题

## [1.0.96] - 2026-05-06

### 修复

- 🐛 **自动填表正式挂入 generation-aware 自动链，并补齐请求取消传递** (`modules/tool-automation-service.js`, `modules/table-engine/table-update-service.js`, `modules/table-engine/table-schema-service.js`, `modules/ui/components/table-workbench-panel.js`)
  - `tableWorkbench.autoUpdateEnabled` / `autoUpdateTrigger` 现在会复用 `tool-automation-service.js` 的同槽位串行、generation 去重与事务取消链路
  - 自动填表请求现会透传自动事务的 `AbortSignal`，用户取消或事务过期时不再继续把已取消请求发完再落到写回阶段
  - 运行态新增 `lastAutoRunAt`、`lastAutoStatus`、`lastAutoMessageId`、`lastAutoRevisionKey`、`lastAutoSkipReason`，并在工作台自动更新卡片中直接展示

### 文档

- 📝 **同步自动填表接入自动执行主线后的架构口径** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`)
  - 统一说明当前自动主线除了自动 `post_response_api` 工具外，还会在同一 generation 事务内执行 tableWorkbench 自动填表

## [1.0.95] - 2026-05-04

### 优化

- ✨ **回退填表工作台过重视觉层，恢复工具箱原生控件语言** (`modules/ui/components/table-workbench-panel.js`, `dist/bundle.js`)
  - 移除 1.0.94 引入的填表工作台 scoped dark card token、强渐变、重阴影、hover lift 与装饰性 active card/chip 样式
  - Dashboard 从 6 栅格压缩布局恢复为 2 列；手动更新、模板按钮和表格选择恢复为更宽松的纵向/换行布局
  - 表格概览恢复为纵向列表，单行展示字段数、行数、运行状态和校验问题；单表编辑抽屉回到更轻的原生面板表面
  - 字段结构恢复 220px + 1fr 编辑宽度，数据行恢复稳定双列布局，减少字段卡片和行卡片的装饰负担

### 文档

- 📝 **同步 1.0.95 版本基线与填表工作台视觉纠偏说明** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`, `package-lock.json`)
  - 更新当前版本号，并记录填表工作台回到工具箱原生控件与更宽松布局

## [1.0.94] - 2026-05-04

### 优化

- ✨ **重做填表工作台视觉层级，强化表格导航与单表编辑抽屉** (`modules/ui/components/table-workbench-panel.js`, `dist/bundle.js`)
  - 引入填表工作台 scoped dark card language，统一运行控制台、设置卡片、表格概览、字段卡片、数据行卡片和诊断折叠区的边框、阴影、强调色与响应式节奏
  - 表格概览改为更接近数据库导航的 active table card，补充 `T01` 序号、字段/行数 chip、运行状态与校验问题提示
  - 手动更新表格选择改为 checkbox-card grid，配置抽屉增加表格 meta 信息，并优化字段结构、行数据、搜索筛选和诊断区的可读性

### 文档

- 📝 **同步 1.0.94 版本基线与填表工作台视觉重做说明** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`, `package-lock.json`)
  - 更新当前版本号，并记录填表工作台视觉层级与单表编辑抽屉优化

## [1.0.93] - 2026-05-04

### 修复

- 🐛 **迁移填表工作台旧版单空表占位配置，避免默认模板仍显示“表格 1”** (`modules/table-engine/table-schema-service.js`, `dist/bundle.js`)
  - 检测仅包含“表格 1 / 列1 / 行1”且无真实内容的旧占位表时，自动替换为内置 8 张默认剧情状态表
  - 保留已有真实自定义表，不覆盖包含实际字段、说明或单元格内容的用户配置
  - 补充 smoke test 覆盖旧占位表迁移与真实自定义表保留两条路径

### 文档

- 📝 **同步 1.0.93 版本基线与旧占位表迁移说明** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`, `package-lock.json`)
  - 更新当前版本号，并记录旧版空占位“表格 1”会自动迁移为默认模板

## [1.0.92] - 2026-05-04

### 修复

- 🐛 **补齐填表工作台默认模板加载与 shujuku 风格模板解析口径** (`modules/table-engine/table-schema-service.js`, `dist/bundle.js`)
  - 新增 `sheet_*` 模板适配解析，按 `orderNo` 排序，读取 `content[0]` 表头、`sourceData.note` 字段说明与 `initNode/insertNode/updateNode/deleteNode` 操作说明
  - 补齐双重 JSON 字符串模板解析口径，兼容 shujuku 默认模板的包裹格式
  - 修正缺失 `tables` 的配置归一化逻辑，新配置或空对象配置会正确种入内置 8 张默认表
  - 导出 `parseTableWorkbenchTemplate()` 作为后续模板导入/迁移入口

### 文档

- 📝 **同步 1.0.92 版本基线与模板解析说明** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`, `package-lock.json`)
  - 更新当前版本号，并记录填表工作台支持解析 shujuku 风格模板

## [1.0.91] - 2026-05-04

### 优化

- ✨ **统一填表工作台视觉控件并补齐默认模板与 Ai 指令预设联动** (`modules/ui/components/table-workbench-panel.js`, `modules/table-engine/table-schema-service.js`, `dist/bundle.js`)
  - 填表工作台移除独立 `--twb-*` 主题 token 与共享输入控件覆盖，回归工具箱既有按钮、输入框、选择框、文本域、section 与运行态 badge 风格
  - 新增内置“默认剧情状态模板”，包含全局数据、主角、重要角色、技能、背包、任务、纪要和选项 8 张表，新配置开箱即用
  - 模板管理支持显式应用内置模板；已有表格时需要二次点击确认，避免静默覆盖旧配置
  - AI 绑定接入破限模块的 Ai 指令预设，启用后会作为填表请求前置消息发送，填表主 prompt 继续保留为独立配置

### 文档

- 📝 **同步 1.0.91 版本基线与填表工作台模板/预设说明** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`, `package-lock.json`)
  - 更新当前版本号与填表工作台默认模板、Ai 指令预设联动说明

## [1.0.90] - 2026-05-03

### 优化

- ✨ **重构填表工作台为主控制台 + 单表配置抽屉，降低首屏信息密度** (`modules/ui/components/table-workbench-panel.js`, `dist/bundle.js`)
  - 主界面收口为运行概览、自动更新设置、AI 绑定、模板入口、手动更新和表格概览列表
  - 单张表的基础信息、字段结构、数据行、单表诊断移入右侧配置抽屉，避免字段和行数据挤占主控制台
  - 字段结构默认只展示字段名与 AI 填写说明，内部 key、类型、必填项下沉到高级设置
  - 数据行改为纵向大卡片工作区，补充搜索、状态筛选和显式新增/更新状态 chip

### 新增

- ✨ **新增表格级 AI 操作说明并接入填表 prompt 上下文** (`modules/table-engine/table-schema-service.js`, `modules/table-engine/table-update-service.js`)
  - 每张表兼容保存 `aiInstructions.init/create/update/delete`，用于描述初始化、新增、更新和删除判断
  - 默认填表 prompt 新增 `{{tableGuidance}}`，请求构建时会汇总表格说明、操作说明和字段说明
  - 配置归一化兼容旧表结构，缺失 `aiInstructions` 时自动补空对象

### 文档

- 📝 **同步 1.0.90 版本基线与填表工作台新结构说明** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`, `package-lock.json`)
  - 更新当前版本号与填表工作台说明

## [1.0.67] - 2026-04-23

### 修复

- 🐛 **修复自动触发对真实新 assistant 楼层的错误拦截，恢复新回复自动执行入口** (`modules/tool-automation-service.js`, `dist/bundle.js`)
  - `MESSAGE_RECEIVED` fallback 不再错误要求真实新回复沿用基线 `messageId`，避免新 assistant 楼层被误判成非新 generation
  - 自动门控现在区分“新 assistant 楼层”和“同楼层 revision 变化”两条路径，只对后者继续要求 revision 变化，从而维持对编辑现有楼层与打开聊天回放的拦截

### 文档

- 📝 **同步 1.0.67 版本基线** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`)
  - 更新当前发布版本与代码基线说明

## [1.0.66] - 2026-04-23

### 修复

- 🐛 **恢复自动触发主入口，避免 generation gate 收口后把真实新回复一并挡掉** (`modules/tool-automation-service.js`, `dist/bundle.js`)
  - `MESSAGE_RECEIVED` 重新允许带 `messageId` 的真实 assistant 新回复直接进入调度，不再被入口分支提前短路
  - “已有工具块”过滤改为不拦截 `MESSAGE_RECEIVED`，避免最新 assistant 在真实生成后因为已带写回块而完全无法自动重跑
  - 新增 gate 基线楼层过滤，继续避免聊天打开或旧楼层事件误穿透到自动链路

### 文档

- 📝 **同步 1.0.66 版本基线** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`)
  - 更新当前发布版本与代码基线说明

## [1.0.65] - 2026-04-23

### 修复

- 🐛 **继续收口自动链路宿主级回归，补齐 generation 门控、事务基线与最终提交取消守卫** (`modules/tool-automation-service.js`, `modules/tool-output-service.js`, `modules/context-injector.js`, `dist/bundle.js`)
  - 自动链写回前的 stale 判定改为基于 assistant base fingerprint，而不是直接把同事务前一个工具的写回误判成 revision 变化
  - 宿主最终提交点现在会在本地改写、`setChatMessage`、`setChatMessages` 和补充 refresh 前重复检查取消/过期状态，避免请求已返回后仍完成写回
  - 自动运行态补充明确的 `cancelled_before_host_commit` / `stale_base_changed` 语义，便于继续做宿主回归排查

### 文档

- 📝 **同步 1.0.65 版本基线** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`, `index.js`, `package.json`)
  - 更新当前发布版本与代码基线说明

## [1.0.64] - 2026-04-23

### 修复

- 🐛 **收口自动工具误触发、取消无效与过期写回问题，稳定 post-response 自动链路** (`modules/tool-automation-service.js`, `modules/tool-output-service.js`, `modules/context-injector.js`, `modules/ui/components/tool-config-panel-factory.js`, `modules/app/public-api.js`)
  - 自动执行现在只对显式开启工具级自动化的 `post_response_api` 工具生效，避免全局自动化开启后所有额外模型工具一起误触发
  - `MESSAGE_RECEIVED` 兼容兜底改为仅在用户发言后的短窗口内、且最新 assistant 槽位确实形成新 generation 时才放行，不再把编辑保存现有 AI 楼层当作新触发
  - 自动事务补上 `AbortController`、公开取消入口与写回前过期校验，用户打断后不再补发、不再把已过期结果插回上下文

### 文档

- 📝 **同步 1.0.64 版本基线与自动化公开接口说明** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/FRAMEWORK_ARCHITECTURE.md`)
  - 更新 README 与架构文档中的当前版本号
  - 在 API 文档中补充 `cancelAutomation(options = {})` 的公开接口说明

## [1.0.63] - 2026-04-21

### 修复

- 🐛 **完成 UI 重构 Phase 5 收口与 Phase 6 compatibility boundary 两刀裁剪，收窄 popup 主路径与对外 API 中遗留的兼容入口** (`modules/ui/components/bypass-panel.js`, `modules/app/popup-shell.js`, `modules/app/public-api.js`, `modules/app/bootstrap.js`, `index.js`)
  - `bypass-panel` 的编辑区、描述输入和消息列表改为容器内稳定选择器，避免重复挂载时命中旧节点
  - `popup-shell` 不再运行时回落到 `ui-components.js` / `prompt-editor.js`，主 tab、内置工具子页和 prompts 子页统一走正式模块入口
  - `public-api`、`bootstrap` 与 `index.js` 已移除对应的 `ui-components` / `prompt-editor` legacy 暴露、loader 注册和接线残留

### 文档

- 📝 **补齐 UI 重构 Phase 5/6 的总结、回顾检查和后续施工口径，准备把下一步优先级切到宿主回归验证** (`docs/UI_REFACTOR_PROGRESS.md`)
  - 记录 Phase 5 定点补刀和 Phase 6 两批 compatibility boundary 收口的实际改动、验证结果与宿主手测重点
  - 将下一阶段方案调整为“先做宿主回归与外部兼容确认，再决定是否继续缩减剩余 legacy loader”

## [1.0.62] - 2026-04-21

### 修复

- 🐛 **修复 API 预设页、自定义工具列表与 Ai 指令预设页在上一版收口后暴露的三个交互回归** (`modules/ui/components/api-preset-panel.js`, `modules/ui/components/tool-manage-panel.js`, `modules/ui/components/bypass-panel.js`)
  - API 预设页现会在重渲前主动关闭当前自定义下拉，并只维护当前浮层里的唯一选中项，修复星标切换不生效与下拉多项持续高亮
  - 自定义工具卡片不再复用全局 `.yyt-disabled`，修复关闭启用后整卡失去点击能力、无法重新开启
  - Ai 指令预设设为默认后会立即刷新左侧列表与右侧编辑区，修复默认态按钮和当前选中态不会同步更新

## [1.0.61] - 2026-04-21

### 修复

- 🐛 **收口 API 预设页与工具管理页的实例状态和弹窗查找范围，修复重复挂载、切页或重开 popup 后易串到旧节点的问题** (`modules/ui/components/api-preset-panel.js`, `modules/ui/components/tool-manage-panel.js`)
  - `api-preset-panel` 不再使用模块级 `currentSelectedPresetName`，改为把选中态保存在当前容器实例上，并统一改为对当前容器重渲
  - API 预设“保存为预设”对话框与工具编辑对话框都改成容器内查找和销毁，不再依赖全局 `$('#...')` 读取弹窗字段

### 文档

- 📝 **补充 Phase 5 第一批改造的回顾检查与后续切口，避免把剩余固定 id 面板一次性全量扩散改造** (`docs/UI_REFACTOR_PROGRESS.md`)
  - 记录 `api-preset-panel` / `tool-manage-panel` 的实际改动、宿主手测重点和当前风险判断
  - 将下一阶段方案收口到 `bypass-panel` / `settings-panel` 的定点补刀，而不是直接扩大到 Phase 6

## [1.0.60] - 2026-04-21

### 修复

- 🐛 **收口 tools 页 panel host 生命周期，修复活面板对象被跨容器复用、切页或关窗后旧 host 仍可能继续存活的问题** (`modules/app/popup-shell.js`, `modules/ui/ui-manager.js`)
  - `popup-shell` 现显式追踪并销毁当前活 host，在切主 tab、切 sub tab、刷新当前页和关闭 popup 时先卸载旧 host
  - `dynamicToolPanelCache` 现缓存 panel factory 而不是活实例，自定义工具子页每次挂载都会创建新的 panel 对象
  - `ui-manager` 新增按容器销毁实例的能力，tools 页默认工具、自定义工具与兼容回退面板都回到统一 mount / unmount 路径

### 文档

- 📝 **补充 Phase 4 回顾检查并固化 Phase 5 施工边界，避免生命周期改造后又把状态清理与 compatibility 收口混做一刀** (`docs/UI_REFACTOR_PROGRESS.md`)
  - 记录 Phase 4 的实际修改点、宿主手测重点、遗留问题和边界影响
  - 明确 Phase 5 只聚焦模块级状态、固定 DOM id 与增强控件销毁清理

## [1.0.59] - 2026-04-21

### 修复

- 🐛 **将工具运行态更新从结构性刷新里拆出，修复 tools 页会因 runtime 字段变化而重建导航和当前面板的问题** (`modules/core/event-bus.js`, `modules/tool-registry.js`, `modules/app/popup-shell.js`)
  - 新增 `TOOL_RUNTIME_UPDATED` 事件，运行态写入默认不再复用结构性 `TOOL_UPDATED`
  - popup shell 现把 runtime-only 变化降级为当前 tools 页轻量刷新，不再默认重建导航和子页签

- 🐛 **为共享工具面板补上 render session 守卫，修复切页、关窗或替换面板后旧异步仍可能回写 UI 的问题** (`modules/ui/utils.js`, `modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/local-transform-tool-panel-factory.js`)
  - `isContainerValid()` 现要求目标节点仍连接在当前 document 上，不再把已脱离页面的旧容器视为有效
  - 通用 AI 工具面板与本地转换工具面板都改为在手动执行、测试提取、世界书异步加载完成后校验当前 render session，旧结果不会再回写到新面板或已关闭 popup

### 文档

- 📝 **建立 UI 重构的 canonical 文档入口，统一记录全仓耦合地图、UI 根因模型与分阶段施工进度** (`docs/UI_REFACTOR_PLAN.md`, `docs/UI_REFACTOR_PROGRESS.md`)
  - `UI_REFACTOR_PLAN.md` 固定本轮重构的背景、目标、非目标、阶段顺序和验证矩阵
  - `UI_REFACTOR_PROGRESS.md` 作为后续每阶段的持续记录入口，避免重构口径再次丢失

## [1.0.58] - 2026-04-20

### 优化

- ✨ **继续压平填表工作台，把剩余 banner / 空态 / 次级入口进一步收短，主路径更接近直接改表的工作面** (`modules/ui/components/table-workbench-panel.js`, `modules/ui/components/table-form-renderer.js`, `dist/bundle.js`)
  - “更多”折叠区去掉多余说明壳，只保留标题、计数和内容本体
  - 表格编辑器 full 模式去掉顶部 banner，空态改成更短的直接操作提示
  - 诊断与表格内部空态文案同步压短，减少首屏和空白区域的解释噪音

## [1.0.57] - 2026-04-20

### 优化

- ✨ **重做填表工作台主界面，改成左侧表导航 + 右侧当前表编辑的单主界面，并把诊断/预览/更多设置下沉为次级折叠区** (`modules/ui/components/table-workbench-panel.js`, `modules/ui/components/table-form-renderer.js`, `docs/TABLE_WORKBENCH_REFERENCE_RESEARCH.md`, `dist/bundle.js`)
  - 顶部只保留新增表格、保存、立即填表、刷新等主动作，首屏不再以 `config / runtime / preview` 分界面和说明卡片为中心
  - focused editor 继续复用既有表格编辑链，但压薄外层 banner / card 感，让表格本体成为主视觉
  - 切表和左侧表排序现在会保留未保存草稿，不再因整页重渲染把当前编辑内容刷掉

## [1.0.56] - 2026-04-20

### 修复

- 🐛 **修复填表工作台运行页缺失 `buildRuntimeSummary()` / `normalizeString()` 时直接报错，导致 `runtime` 视图无法渲染** (`modules/ui/components/table-workbench-panel.js`, `dist/bundle.js`)
  - 补回运行摘要卡片所需的最小 helper，恢复运行状态摘要区挂载
  - 让填表工作台在切到“运行”分界面时不再因缺失函数而整块报错

## [1.0.55] - 2026-04-20

### 修复

- 🐛 **修复模块加载在 `validateTableDraft` 缺失时直接中断，导致 UI 模块未装配、侧边子页空白且样式丢失** (`modules/table-engine/table-schema-service.js`, `dist/bundle.js`)
  - 补回 `validateTableDraft()`，恢复 `validateTableDraftDeep()` 与 table 表单渲染链的基础校验依赖
  - 让 `bootstrap.loadModules()` 能继续完成 UI 模块加载、组件注册与样式注入

## [1.0.54] - 2026-04-20

### 修复

- 🐛 **修复侧边工具子页在共享挂载链失效时只剩空的 `.yyt-sub-content` 容器，改为自动补注册并在容器内显示明确错误** (`modules/ui/index.js`, `modules/ui/ui-manager.js`, `dist/bundle.js`)
  - `renderRegisteredPanel()` 现会在渲染前确认组件已注册，避免因注册时序问题导致工具子页统一空白
  - `UIManager.render()` 现会把“组件未注册”或“组件渲染失败”的信息直接写入容器，不再静默返回空白壳

## [1.0.53] - 2026-04-20

### 修复

- 🐛 **修复填表工作台因缺失 `normalizeWorkbenchView()` 而在首屏渲染时直接报错，导致内容区保持空白** (`modules/ui/components/table-workbench-panel.js`, `dist/bundle.js`)
  - 补回工作台视图归一化函数，统一 `config / runtime / preview` 视图的合法值回退规则
  - 让 `render()`、`renderTo()` 与视图切换逻辑重新能够正常挂载面板内容

## [1.0.52] - 2026-04-20

### 修复

- 🐛 **修复填表工作台 `config` 视图把校验结果误传给 focused 编辑器，导致当前表内容区可能显示为空** (`modules/ui/components/table-workbench-panel.js`, `dist/bundle.js`)
  - 中间当前表编辑区改回直接基于原始 draft 渲染，避免 focused editor 读取到错误数据形状
  - 右侧校验摘要与编译预览仍继续使用 validation / compiled tables，不改既有辅助区职责

## [1.0.51] - 2026-04-20

### 修复

- 🐛 **修复填表工作台左侧表列表的选表项嵌套按钮问题，避免内容显示区被错误影响** (`modules/ui/components/table-workbench-panel.js`, `dist/bundle.js`)
  - 左侧表项改为可点击的普通容器，避免排序按钮和选表按钮互相嵌套
  - 补上键盘回车/空格切表，保持交互可用性

## [1.0.50] - 2026-04-20

### 优化

- ✨ **将填表工作台 `config` 视图升级为更聚焦的 visualizer MVP，改成左侧表列表、中间当前表编辑、右侧辅助信息的三栏工作台** (`modules/ui/components/table-workbench-panel.js`, `modules/ui/components/table-form-renderer.js`, `modules/table-engine/table-schema-service.js`, `modules/table-engine/table-update-service.js`, `dist/bundle.js`)
  - 保留顶层 `config / runtime / preview` 三视图与既有执行/写回主链，只重做 `config` 内部壳层
  - 新增当前表焦点切换与表级操作同步，新增/删除/移动表后会保持更合理的当前选中状态
  - 将编译预览、校验摘要、Prompt / API 预设 / 正文镜像等辅助项移到侧边辅助区，减少主编辑流干扰

- 📝 **补充填表工作台当前架构、阶段总结与后续施工草案文档，统一 visualizer MVP 的实现口径** (`docs/ARCHITECTURE_ANALYSIS.md`, `docs/TABLE_WORKBENCH_STATUS_SUMMARY.md`, `docs/TABLE_WORKBENCH_IMPLEMENTATION_DRAFT.md`)
  - 明确 `tableWorkbench` 仍是主线架构内的 table domain，而不是独立状态机
  - 细化 Table UI、Authoring Model、Runtime / Diagnostics、Template & History、Automation 的边界与优先级

## [1.0.49] - 2026-04-20

- 🐛 **欢迎页关闭状态改为仅在当前页面会话内生效，关闭后重复打开工具不再显示，但浏览器刷新后会重新显示** (`index.js`, `modules/app/popup-shell.js`, `dist/bundle.js`)
  - 将欢迎页关闭标记从持久化设置改为运行时 `uiState`，避免跨刷新保留
  - 现在同一页面会话里关闭一次即可，只有浏览器 F5 / 页面重载后才会重置欢迎页

- 🐛 **欢迎页关闭后会记住状态，不再每次打开工具都重新显示** (`modules/app/popup-shell.js`, `dist/bundle.js`)
  - popup shell 渲染欢迎页前先读取 `ui.startupScreenDismissed`，已关闭时直接进入主界面
  - 点击“进入工具箱”时持久化关闭状态，避免同一浏览器环境里每次打开都被欢迎页打断

## [1.0.48] - 2026-04-19

### 修复

- 🐛 **修复 tools 页 AI 工具与脚本工具分栏后在同一容器切换时的配置串写问题** (`modules/ui/ui-manager.js`, `dist/bundle.js`)
  - 在 UI 管理器渲染新组件前，先销毁同一容器中仍活跃的旧组件实例，避免旧面板的事件绑定残留
  - 修复一次保存同时触发旧实例与新实例保存逻辑，导致看起来像“同索引工具同步更新”的回归表现

## [1.0.47] - 2026-04-17

### 优化

- ✨ **重做填表工作台主界面与表格编辑体验，改成更直白的表格式交互** (`modules/ui/components/table-form-renderer.js`, `modules/ui/components/table-workbench-panel.js`, `modules/table-engine/table-schema-service.js`, `dist/bundle.js`)
  - 将填表工作台主入口压平为“改表格 / 运行 / 预览”，减少主路径里的抽象术语与诊断噪音
  - 把表定义编辑器改成更接近普通表格的表头/内容编辑方式，支持表、列、行的直接增删和上下移动
  - 保留保存/运行前统一编译到 runtime tables 的稳定边界，同时补齐列类型、说明、必填等元信息编辑能力

## [1.0.46] - 2026-04-17

### 修复

- 🐛 **修复共享增强下拉在靠右位置展开时被错误量成接近整屏宽度** (`modules/ui/utils.js`, `dist/bundle.js`)
  - 浮层宽度测量改为临时使用 `width: max-content` 配合 trigger 最小宽度与视口最大宽度后再取值，避免直接读取初始态 `scrollWidth` 时被 `left/right` 约束放大
  - 保持展开层至少与 trigger 同宽，但仅在内容真实需要时扩展，并继续受视口宽度钳制
  - 补齐浮层 `visibility` 内联样式清理，避免重复开关后残留测量态样式

## [1.0.45] - 2026-04-17

### 修复

- 🐛 **修复共享增强下拉在靠右位置仍可能按 trigger 宽度展开并向右越界** (`modules/ui/utils.js`, `dist/bundle.js`)
  - 浮层展开宽度改为基于 trigger 宽度与下拉内容真实宽度共同计算，不再在内容更宽时继续死锁为 trigger 宽度
  - 对最终展开宽度执行视口钳制，并在靠右位置时同步回推 left，保证浮层整体留在可视区域内
  - 关闭浮层时补齐 `minWidth` 等内联样式清理，避免重复开关后残留旧尺寸约束

## [1.0.44] - 2026-04-17

### 修复

- 🐛 **修复共享下拉在靠右位置时仍可能向右越界展开** (`modules/ui/utils.js`, `styles/main.css`, `dist/bundle.js`)
  - 恢复下拉展开层的 `min-width: 100%`，避免基础宽度约束丢失后出现收缩和错位
  - 为 portal 浮层定位补上 `maxWidth` 视口限制，并在关闭时同步清理内联样式
  - 同步更新构建产物，减少宿主环境里“源码修了但实际仍越界”的情况

## [1.0.43] - 2026-04-17

### 修复

- 🐛 **统一下拉与欢迎页主题 token，修复颜色漂移、角色下拉白底与欢迎页不再显示的问题** (`modules/ui/components/settings-panel.js`, `styles/main.css`, `modules/app/bootstrap.js`, `modules/app/popup-shell.js`, `modules/ui/components/bypass-panel.js`, `dist/bundle.js`)
  - 将共享下拉、展开层与欢迎页相关颜色收敛到主题 token，避免 fallback 样式和主样式各自维护导致颜色不一致
  - 为 bypass 角色下拉增加固定宽度约束，避免选中短文本后收起态过窄、展开后看不全其它选项
  - 删除欢迎页关闭状态的持久化逻辑，改为页面刷新或浏览器重开后重新显示

## [1.0.42] - 2026-04-16

### 修复

- 🐛 **修复共享下拉浮层宽度异常与选项行宽不一致** (`modules/ui/utils.js`, `styles/main.css`, `modules/app/bootstrap.js`, `dist/bundle.js`)
  - 下拉浮层宽度改为严格跟随 trigger 宽度，移除会放大到异常宽度的 dropdown 自身宽度兜底
  - 为共享下拉容器与选项补齐 `box-sizing` / `width: 100%`，统一 portal 下拉与旧版手写下拉的整行宽表现
  - 同步更新 fallback 内置样式与构建产物，避免宿主运行时继续出现“展开像全屏”或“选项宽度忽长忽短”

## [1.0.41] - 2026-04-16

### 修复

- 🐛 **将共享下拉改为顶层浮层展开，修复展开层裁切、透明发虚与点击穿透** (`modules/ui/utils.js`, `modules/ui/components/api-preset-panel.js`, `modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`, `dist/bundle.js`)
  - 为共享自定义下拉增加 portal 式浮层展开与重定位逻辑，使展开菜单脱离 popup 内部的裁切/滚动容器链
  - API 预设面板的手写下拉改为复用同一套浮层打开/关闭链路，不再单独维护一套文档点击关闭逻辑
  - 扩展 popup shell 对浮层下拉的交互保护，避免滚轮与鼠标命中继续落到下层内容区域

## [1.0.40] - 2026-04-16

### 修复

- 🐛 **强制自定义下拉展开层与选项改为实底深色，彻底移除半透明观感** (`styles/main.css`, `modules/app/bootstrap.js`, `modules/ui/components/api-preset-panel.js`, `dist/bundle.js`)
  - 为 `.yyt-select-dropdown`、`.yyt-select-option`、`.yyt-select-trigger` 增加更强优先级的实色背景，并显式禁用 `background-image` 与 `backdrop-filter`
  - 同步补齐 fallback 内置样式路径，避免宿主未加载外部样式时仍回落到旧的半透明下拉表现
  - 调整 API 预设星标等局部按钮的 hover 背景，避免下拉内部残留发虚的半透明块

## [1.0.39] - 2026-04-16

### 修复

- 🐛 **补齐 fallback 内置样式中的深色控件变量，修复实际运行仍出现白底/半透明的问题** (`modules/app/bootstrap.js`, `styles/main.css`, `dist/bundle.js`)
  - 为 `getBaseStyles()` 补上与主样式文件一致的 `--yyt-control-*` 变量，避免宿主加载不到外部 `styles/main.css` 时回退到旧的浅色控件主题
  - 将共享输入框、文本域与自定义下拉在 fallback 路径下也统一为更实的深色底、边框与阴影
  - 确保构建产物 `dist/bundle.js` 内已包含这套热修复，减少“源码已改但宿主实际未生效”的情况

## [1.0.38] - 2026-04-16

### 修复

- 🐛 **修复共享下拉展开层与正则提取控件主题可读性问题** (`styles/main.css`, `modules/ui/components/regex-extract-panel.js`, `modules/ui/components/table-form-renderer.js`)
  - 删除正则提取面板对共享输入控件的重复背景覆盖，恢复规则下拉与测试提取输入区的统一深色主题
  - 将共享自定义下拉的展开层改为更实的深色底与更强的边框/阴影，避免宿主背景穿透导致选项难以辨认
  - 同步统一表格工作台里的自定义下拉 option 底色、hover 与 selected 态，避免局部透明覆盖让下拉菜单再次发虚

## [1.0.37] - 2026-04-16

### 修复

- 🐛 **修复工作台下拉层、滚动链路与正则测试输入框回归** (`modules/app/popup-shell.js`, `modules/ui/components/regex-extract-panel.js`, `styles/main.css`)
  - 将共享自定义下拉展开层恢复为不透明深色背景，避免展开后透出底层内容导致选项难以辨认
  - 将正则规则类型下拉局部回退为原生 `select`，规避规则列表滚动容器对内嵌 dropdown 的裁切与遮挡
  - 修正 popup shell 的 wheel 代理边界与页面切换 scroll reset，恢复主内容区直接滚轮滚动并阻断页面间滚动位置串台
  - 补强 regex 面板内测试文本框与相关表单控件的局部深色主题，消除残留白底输入框

## [1.0.36] - 2026-04-16

### 修复

- 🐛 **修复工作台瘦身后的滚动、层级与表单主题回归** (`modules/app/popup-shell.js`, `modules/ui/components/settings-panel.js`, `styles/main.css`)
  - 恢复主内容区原生滚动条与滚轮滚动，避免根内容容器被统一 wheel 代理拦截
  - 修正顶部卡面与工作区的纵向 flex 约束，缓解顶部区域与导航/当前页面卡片重合
  - 统一常规输入框、下拉框与文本域的主题底色，并修复自定义下拉白底与层级遮挡问题
  - 继续放松 toggle 行与设置页 section 的堆叠间距，改善密集布局观感

## [1.0.35] - 2026-04-16

### 优化

- ✨ **工作台首屏改为一次性启动界面，主弹窗进一步瘦身** (`modules/app/popup-shell.js`, `modules/core/settings-service.js`, `styles/main.css`)
  - 首次打开工具箱时显示启动界面，用于承接品牌标题、简介与后续加载状态扩展位
  - 用户进入一次后会持久化记录，后续打开直接进入正常工作台
  - 删除顶部重复的“聚焦页面”卡片，并收缩常驻顶部区域，释放主内容显示空间

- ✨ **共享 toggle 布局与填表工作台结构体验优化** (`styles/main.css`, `modules/ui/components/bypass-panel.js`, `modules/ui/components/table-workbench-panel.js`)
  - 放松共享 toggle 行间距与标签布局，小号开关改为真实尺寸规则，不再依赖整体缩放
  - 填表工具台拆分为 `配置 / 执行与诊断 / 预览/参考` 分界面，减少单页信息堆叠
  - 手动执行填表后会自动聚焦运行态视图，便于查看摘要、诊断与预览结果

### 更改

- ♻️ **API 预设支持流式开关、显式删除入口与即时刷新** (`modules/ui/components/api-preset-panel.js`, `modules/ui/utils.js`, `modules/preset-manager.js`, `modules/api-connection.js`, `modules/app/popup-shell.js`)
  - API 预设 schema 新增 `stream` 字段，保存、回填与请求下发链路已全量打通
  - 预设列表新增更直观的删除入口，减少只能依赖其它区域删除的使用成本
  - 新建、更新、删除 API 预设后，工作台内相关引用区域可立即刷新，无需重启工具箱

- ♻️ **工作台事件刷新与用户文案统一收口** (`modules/app/popup-shell.js`, `modules/core/event-bus.js`, `modules/tool-registry.js`, `modules/ui/components/bypass-panel.js`, `modules/ui/components/tool-config-panel-factory.js`)
  - popup shell 补齐对 API 预设、自定义工具与 Ai 指令预设的事件订阅与清理逻辑
  - 新建工具、新建 Ai 指令预设后，相关导航与引用区域会立即同步刷新
  - 所有主要用户可见入口统一将“破限词”调整为 `Ai指令预设`，内部兼容键名保持不变

## [1.0.33] - 2026-04-15

### 修复

- 🐛 **统一修复填表工作台深色主题控件显示异常** (`styles/main.css`, `modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/table-form-renderer.js`)
  - 补强原生 `.yyt-select` 在宿主环境中的深色主题表现，避免下拉框出现白底白字
  - 稳定 `.yyt-code-textarea` 的 hover / focus 外观，避免 `promptTemplate` 文本框移入时变白
  - 保持共享表单控件的状态样式一致，减少宿主注入样式带来的视觉漂移

### 优化

- ✨ **升级填表工作台与表格编辑弹窗的视觉层级** (`modules/ui/components/table-workbench-panel.js`, `modules/ui/components/table-form-renderer.js`, `modules/ui/utils.js`)
  - 强化工作台 hero、运行态摘要、主操作区与右侧诊断区的信息层次
  - 为“新增/编辑表格”弹窗增加专用 dialog 外壳变体，统一 header / body / footer 质感
  - 调整创建态与编辑态文案、按钮与提示信息，让填表流程更清晰

## [1.0.32] - 2026-04-15

### 修复

- 🐛 **修复工具面板按钮点击无效的 bug** (`modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/local-transform-tool-panel-factory.js`, `modules/ui/components/table-workbench-panel.js` 等)
  - 问题根源：异步加载世界书后重新渲染 HTML 导致事件监听器丢失
  - 所有面板组件改用事件委托方式绑定事件 (`$container.on('event.namespace', selector, handler)`)
  - `renderTo` 方法先尝试使用缓存数据，异步加载后只更新必要部分
  - 使用命名空间标识事件，便于清理和隔离
  - 统一 `destroy` 方法只移除当前组件的事件，不影响其他组件

### 重构

- ♻️ **统一 UI 组件事件绑定机制** (`modules/ui/components/*.js`)
  - 所有面板组件接口保持一致：`render()`、`bindEvents()`、`destroy()`、`getStyles()`、`renderTo()`
  - 事件绑定使用命名空间：`.yytToolPanel`、`.yytLocalToolPanel`、`.yytTableWorkbench`、`.yytSettings` 等
  - 改进 `destroy` 方法，只移除当前组件命名空间的事件

## [1.0.31] - 2026-04-15

### 修复

- 🐛 **统一修复共享表单控件与设置开关 UI 回归** (`styles/main.css`, `modules/ui/components/settings-panel.js`)
  - `.yyt-select` 现改为箭头图标与深色控件背景同层渲染，常态 / hover / focus 不再出现发白
  - 设置页 6 个开关已切回现有自定义 toggle 结构，不再显示原生 checkbox
  - 保留原有设置项 `id` 与保存逻辑，只修正渲染结构与样式表现

- 🐛 **表格工作台“新增表格”改回标准 dialog 交互** (`modules/ui/components/table-form-renderer.js`)
  - 点击“新增表格”后不再直接把空白卡片内联插回列表，而是进入现有 dialog 流程
  - 取消 / 关闭不会污染当前表定义，保存后才回写到列表
  - 同步收紧表格编辑卡片与表格区透明度，避免继续呈现“半透明窗口”观感

## [1.0.30] - 2026-04-14

### 修复

- 🐛 **填表工作台导入链恢复：修复 `storage.namespace` 冲突** (`modules/core/storage-service.js`, `modules/table-engine/table-schema-service.js`, `modules/ui/components/table-workbench-panel.js`)
  - `StorageService` 的实例属性与 `namespace()` 方法不再同名，避免 `storage.namespace is not a function`
  - 修复后 `tableWorkbench` 相关模块可正常导入，顶级工作台页能够恢复渲染
  - 这次修复解决的是模块导入/初始化失败，不涉及表定义编辑体验本身

- 🐛 **自动化生命周期服务回退到 same-slot / 多事件事务入口** (`modules/tool-automation-service.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 不再错误地只依赖 `MESSAGE_RECEIVED + MESSAGE_SENT` 的简化版 MVU 入口
  - 自动服务现重新监听 `MESSAGE_RECEIVED / MESSAGE_UPDATED / MESSAGE_SWIPED / GENERATION_AFTER_COMMANDS / GENERATION_ENDED`
  - 同楼层 reroll / regenerate / swipe 会优先按 `messageId + swipe + assistant 指纹` 形成的 `executionKey` 调度，而不是被旧的一次性简化节流误杀
  - 新增按 execution key 的短时间窗口去重：同一轮事件回响不重复执行，但同楼层新 revision 仍可再次进入自动链

### 更改

- ♻️ **填表工作台最小手动 MVP 已接入独立顶级页签** (`modules/tool-registry.js`, `modules/app/popup-shell.js`, `modules/table-engine/*.js`, `modules/ui/components/table-workbench-panel.js`, `modules/ui/components/table-form-renderer.js`)
  - 当前 `tableWorkbench` 已作为独立顶级标签页接入 popup shell，不再与普通工具页混在同一个子页签集合中
  - 已落地最小手动链：fresh target resolve -> template/state load -> request build -> API -> tables JSON parse -> structured state commit -> optional mirror writeback
  - 当前工作台仍属于 MVP 阶段，但表定义已经不再要求直接手写 JSON；当前已切到结构化编辑器 MVP，下一阶段的主要缺口转为排序、模板、历史与更成熟的 visualizer / authoring 体验

- ♻️ **填表工作台切到结构化表定义编辑器 MVP** (`modules/table-engine/table-schema-service.js`, `modules/ui/components/table-form-renderer.js`, `modules/ui/components/table-workbench-panel.js`)
  - `tableWorkbench` 的 `tables` 字段已从 `json` textarea 主路径切换为 `tableDefinitions` 结构化编辑器字段
  - 当前已支持表格 / 列 / 行的增删、表格基础信息编辑，以及单元格内容内联编辑
  - 保存 / 运行前会统一编译为 runtime `tables`，原有 `table-update-service -> table-writeback-service` 执行与 revision-safe 写回主链保持不变
  - 当前这套编辑器仍是 MVP：已经解决“必须手写 JSON”的问题，但表 / 行 / 列排序、模板体系、历史 / 导入导出、visualizer shell 仍未完成

- ♻️ **MVU 风格自动生命周期主链落地** (`modules/tool-automation-service.js`, `modules/tool-execution-context.js`, `modules/tool-trigger.js`, `modules/tool-output-service.js`, `modules/context-injector.js`, `modules/tool-registry.js`, `modules/tool-manager.js`, `modules/core/settings-service.js`, `modules/app/bootstrap.js`, `modules/app/public-api.js`, `modules/ui/components/settings-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/HOST_REGRESSION_CHECKLIST.md`)
  - 新增 `tool-automation-service.js` 作为唯一自动入口，直接监听宿主 `MESSAGE_RECEIVED / CHAT_CHANGED / MESSAGE_DELETED`，不再恢复旧 trigger/baseline/replay 状态机
  - 新增 `tool-execution-context.js`，统一构建手动链与自动链共用的 assistant 槽位上下文，并补齐 assistant base text / base fingerprint，避免把 toolkit 自己追加的块当成新的 assistant 原文
  - `tool-registry.js` / `tool-manager.js` / 设置面板 / 工具配置页新增 `automation` 配置；runtime 同步新增 `lastAuto*` 诊断字段
  - `bootstrap.js` 启动时自动挂载自动服务；`public-api.js` 新增自动服务启停、运行态查询与手动触发当前 assistant 楼层处理入口
  - 自动成功标准收口为：请求成功 + 写回成功 + `refreshConfirmed === true`
  - 执行 `npm run build`，构建通过

- ♻️ **事务诊断消费面对齐：工具页与文档切到 transaction-first 视图** (`modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 工具配置页中的“最近触发诊断”折叠区现优先读取 `getGenerationTransactionDiagnostics()`，可直接展示 `activeTransactions / recentTransactionHistory / recentHandledExecutionKeys`
  - 复制按钮现改为导出 `exportGenerationTransactionDiagnostics()`，不再继续以 `exportAutoTriggerDiagnostics()` 作为 UI 主导出口
  - API 文档与宿主回归清单已同步改写为 transaction-first 口径；`recentEventTimeline` 保留为辅助时序视图，而不是 UI 主语义

- ♻️ **楼层槽位事务元数据补齐：统一 slot binding / revision / transaction / source 写回语义** (`modules/tool-trigger.js`, `modules/tool-output-service.js`, `modules/context-injector.js`, `modules/tool-registry.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 自动执行上下文、消息级 session、全局诊断快照、工具 runtime 与写回事件现已统一补齐 `slotBindingKey / slotRevisionKey / slotTransactionId / sourceMessageId / sourceSwipeId`
  - `executionKey` 现正式与 `slotRevisionKey` 对齐，自动去重完全按“当前楼层 + 当前 swipe + 当前内容版本”收口，不再继续依赖 generationTrace 作为主锚点
  - `tool-output-service` 与 `context-injector` 现会把 slot transaction 元数据继续透传到写回结果与工具 runtime 中，方便直接定位“写到了哪层、哪页 swipe、哪次槽位事务”
  - 工具页折叠诊断、API 文档、宿主回归清单与进度文档已同步补齐新的 slot transaction 口径
  - 执行 `npm run build 2>&1`，构建通过且无警告

- ♻️ **自动触发主链真正切到楼层槽位驱动模型** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/tool-output-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `initToolTriggerManager()` 现直接注册 `GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED / MESSAGE_UPDATED / MESSAGE_SWIPED` 槽位监听；宿主只要给出 `messageId`，主链就优先按该楼层处理
  - 自动执行上下文现优先按事件命中的 assistant 楼层构建，不再把旧 baseline 确认链作为主路径前提；新增 `slotRevisionKey = chatId + messageId + effectiveSwipeId + assistantContentFingerprint`
  - 写回链新增 `writeback_echo_event` 守卫，避免工具自身写回触发的 `MESSAGE_UPDATED` 被再次当成有效回复重跑工具
  - `context-injector` 的自动写回已收紧为必须提供 `sourceMessageId`，并优先按 `sourceSwipeId / effectiveSwipeId` 写当前 swipe 文本
  - 执行 `npm run build 2>&1`，构建通过

- 🐛 **确认链改抄 MVU / Amily 语义：按当前楼层 / 当前 swipe 原位处理** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/tool-output-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 宿主一旦给出 `messageId`，确认链就直接按这层处理，不再把“baseline 后新增 assistant 楼层”当作唯一放行条件
  - `GENERATION_AFTER_COMMANDS` 在 `reroll / regenerate / swipe` family 下，不再只保留 speculative 观察态；若没有新楼层，也会直接回到 baseline assistant 槽位当前状态做原位确认
  - 自动去重键进一步收口到 `chatId + messageId + generationTraceId + effectiveSwipeId + assistantContentFingerprint`，保证“同一轮 generation 不重复、同一楼层新 reroll 可再次执行”
  - 写回目标固定优先绑定 `confirmedAssistantMessageId`，并同步更新当前 swipe 文本；工具页与聚合诊断新增 `generationMessageBindingSource / confirmedAssistantSwipeId / effectiveSwipeId`

- 🐛 **reroll 定向补修：支持同楼层 same-slot revision 确认** (`modules/tool-trigger.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - assistant 确认模型不再只接受“baseline 后新增 assistant 楼层”，现在也支持显式 `reroll / regenerate / swipe` 对同一 assistant 楼层的合法重写结果
  - generation baseline 新增 assistant 内容指纹、`swipe_id` 与 swipe 数量快照，用于识别宿主复用同一 `messageId / chatIndex` 时的 same-slot revision
  - `MESSAGE_RECEIVED` 会在观察到正文 / swipe 变化时确认 same-slot revision；`GENERATION_ENDED` 还会为 same-text reroll 提供兜底确认
  - 工具页诊断折叠区、API 文档与宿主回归清单已同步补入 `confirmationMode / sameSlotRevision*` 字段，方便直接判断 reroll 是否真正进入了同楼层确认通道

- ♻️ **MVU 事务化收口 Phase T2：generation-aware dedupe 与 execution key 轨迹收口** (`modules/tool-trigger.js`, `modules/tool-registry.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - session key 已收口到 `chatId + messageId + generationTraceId` 语义，避免同楼层新 generation 被继续混进旧 session
  - 自动去重改为维护最近已处理 execution key 集合，并对外暴露 `handledExecutionKeyCount / recentHandledExecutionKeys`
  - 单工具 runtime 与工具页诊断同步补齐 execution key 轨迹展示

- ♻️ **MVU 事务化收口 Phase T3 / T4：writeback commit / refresh confirm 分层结果与 UI / 文档同步** (`modules/context-injector.js`, `modules/tool-output-service.js`, `modules/tool-trigger.js`, `modules/tool-registry.js`, `modules/app/public-api.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 写回链新增 `commit` 与 `refresh` 分层结果，显式记录主提交策略、实际提交策略、fallbackUsed、刷新请求通道、确认轮数与 confirmedBy
  - `hostUpdateMethod` 已明确收口为兼容别名，语义直接等价于 `commit.appliedMethod`
  - 工具 runtime、工具页折叠诊断与写回历史现可直接展示 refresh 通道列表与 confirmedBy，而不再只显示计数
  - `tool-output-service` 的 `meta.phases` 已对齐到 `request -> extract -> writeback -> refresh` 四阶段
  - 工具 runtime、工具页折叠诊断、公共 API 与回归文档已同步补齐 execution key 轨迹、主提交策略 / 实际提交策略与 refresh confirm 展示

- ♻️ **MVU 事务化收口 Phase T1：generation action 识别与诊断出口补齐** (`modules/tool-trigger.js`, `modules/app/public-api.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - session 冻结字段、history 条目与 drift 摘要现已补齐 generation action 相关字段，能够直接区分 trace 漂移与 generation action 漂移
  - 对外 API 新增 `getGenerationTransactionDiagnostics()` / `exportGenerationTransactionDiagnostics()` 事务化别名出口
  - API 文档同步补充 generation action drift、recent handled execution key 与事务化诊断语义说明

- ♻️ **S2 存储接口收口第一轮** (`modules/api-connection.js`, `modules/preset-manager.js`, `modules/regex-extractor.js`, `README.md`, `docs/API_DOCUMENTATION.md`, `docs/EXTENSION_GUIDE.md`, `docs/CODEBASE_DIET_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - API 配置、API 预设、规则提取模块已优先改用 `core/storage-service.js` 主接口
  - `storage.js` 继续保留为 compatibility adapter，不破坏历史调用
  - README / API / 扩展 / 瘦身 / 进度文档已同步说明“新代码优先使用 storage-service，storage.js 为旧接口适配层”
  - 执行 `npm run build 2>&1`，构建通过

- ♻️ **代码瘦身与 compatibility 模块减载收口** (`index.js`, `modules/app/bootstrap.js`, `modules/app/popup-shell.js`, `modules/app/public-api.js`, `modules/tool-trigger.js`, `README.md`, `docs/API_DOCUMENTATION.md`, `docs/EXTENSION_GUIDE.md`, `docs/CONTRIBUTING.md`, `docs/OPTIMIZATION_PROGRESS.md`, `docs/CODEBASE_DIET_PLAN.md`)
  - `ui-components.js` 与 `prompt-editor.js` 已从启动期常驻装载改为显式按需加载的 compatibility 模块
  - popup shell 现在优先走 `modules/ui/index.js` 主路径，仅在必要时回退装载 `ui-components.js`；旧分段提示词编辑路径也已改为按需加载 `prompt-editor.js`
  - `tool-trigger.js` 已移除对 `tool-executor.js` 的静态依赖，compatibility 执行回退改为惰性加载
  - 新增 `docs/CODEBASE_DIET_PLAN.md`，专门记录本轮后收口减重方案与验收边界
  - API 文档新增 `loadLegacyModule(moduleKey)` 说明，扩展与贡献文档同步明确 compatibility 模块边界

- 🎨 **主工具箱与高频面板整体 UI / HTML 美化收口** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/tool-manage-panel.js`, `modules/ui/components/settings-panel.js`)
  - 重构主工具箱 popup shell 的 HTML 层级，新增 topbar、workspace、sidebar、main content frame 与更清晰的 footer 信息区
  - 将主导航升级为“图标 + 标题 + 简述”的工作台侧栏样式，补充页面说明、页面统计与当前页面概览区
  - 统一 popup / content frame / section / 表单 / 按钮 / 对话框 / 响应式风格，整体强化工作台感与层级节奏
  - 优化工具配置页 hero 区、手动操作区、runtime 卡片与调试区密度；优化工具列表页 hero 区与统计卡片；优化设置页 hero 区与状态 chips
  - 执行 `npm run build` 构建验证通过

- 🎨 **阶段后收尾：主工具箱 HTML 结构与视觉层次优化** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`)
  - 调整主工具箱 header 结构，补充品牌区、副标题、版本徽标、拖动提示与当前页面状态展示
  - 优化 content / footer 分区层次，增加更明确的工作台感和信息层级
  - 将 popup 激活态、按钮、标题与底部状态区进一步收口到统一主题 token，避免美化后再次出现深浅主题下对比不足的问题
  - 执行 `npm run build` 构建验证通过

- 🔧 **阶段后收尾：文档同步、主窗口拖动与主题应用修复** (`README.md`, `docs/EXTENSION_GUIDE.md`, `docs/CONTRIBUTING.md`, `modules/app/popup-shell.js`, `modules/ui/components/settings-panel.js`, `modules/app/bootstrap.js`, `styles/main.css`, `modules/window-manager.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 同步更新 `README.md`、`docs/EXTENSION_GUIDE.md` 与 `docs/CONTRIBUTING.md`，修正文档中仍把 `ui-components.js`、`window-manager.js`、旧版页签和旧目录结构当成主路径的问题
  - 为主工具箱弹窗增加头部拖动能力，避免 popup 固定居中后无法调整位置
  - 修复设置页主题切换、紧凑模式与动画开关应用到错误 document 的问题，确保 popup 所在顶层文档能够真正响应主题变更
  - 补齐主题变量与弹窗样式对接，统一主 popup 与独立 window 的主题 token 来源

- 🔧 **Phase 5：调试与回归保障增强完成** (`modules/tool-registry.js`, `modules/tool-trigger.js`, `modules/tool-output-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 为自动触发链新增最近一次全局触发快照 `lastAutoTriggerSnapshot`，统一记录最近触发事件、去重键、命中的工具列表与跳过原因
  - 为单工具运行态新增最近触发时间、最近触发事件、最近消息键、最近跳过原因、最近执行路径、最近写回状态与最近失败阶段等紧凑诊断字段
  - 在工具输出主链中补齐 `failureStage` 与 `writebackStatus` 结构化元数据，方便定位失败发生在构造消息、发送请求、提取输出还是写回阶段
  - 在工具配置面板中新增折叠式“最近触发诊断”区，低噪声展示最近一次诊断信息而不干扰默认使用体验
  - 执行 `npm run build` 构建验证通过，完成本轮 Phase 5 收尾

- 🔧 **Phase 4：UI 装配中心统一完成** (`index.js`, `modules/app/bootstrap.js`, `modules/app/popup-shell.js`, `modules/app/public-api.js`, `modules/ui/index.js`, `modules/ui/ui-manager.js`, `modules/ui-components.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 将 `modules/ui/index.js` 提升为当前 UI 主装配入口，并在 `bootstrap` 中统一完成 UI 初始化与样式聚合注入
  - `popup-shell.js` 现在优先通过统一 helper 渲染 API 预设、正则、工具列表、默认工具、破限词和设置面板，减少对兼容层静态导出的主路径依赖
  - `ui-manager.js` 的职责说明收敛为组件注册 / 渲染 / 销毁 / 样式聚合，不再被误解为 popup shell 路由中心
  - `ui-components.js` 降级为 compatibility facade，并在公开 API 中新增 `getUi()` / `getUiModule()` 作为推荐入口
  - 执行 `npm run build` 构建验证通过，为进入 Phase 5 提供稳定基线

- 🔧 **Phase 3：执行链清主次完成** (`modules/tool-executor.js`, `modules/tool-trigger.js`, `modules/tool-output-service.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 明确自动工具主链已经收敛为 `tool-trigger -> tool-output-service -> tool-prompt-service -> api-connection -> context-injector`
  - 为 `tool-executor.js` 中的 `buildToolMessages()` 与 `executeToolWithConfig()` 增加 compatibility / legacy 定位说明，弱化其主链语义
  - 在触发模块中显式区分自动执行主路径与兼容执行回退路径
  - 在 API 文档中补充自动主链、手动执行链与兼容执行链说明，减少后续维护误判
  - 执行 `npm run build` 构建验证通过，为进入 Phase 4 提供稳定基线

- 🔧 **Phase 2：工具模型统一完成** (`modules/tool-manager.js`, `modules/tool-registry.js`, `modules/ui/components/tool-manage-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 为 `tool-manager.js` 增加默认定义构造与运行态归一化函数，统一 legacy 字段到新运行模型的映射出口
  - 收口 `tool-registry.js` 中自定义工具基础运行配置、配置合并与首份运行态配置初始化逻辑
  - 调整“工具列表 -> 新建工具”流程，使自定义工具创建后立即具备完整新结构运行配置
  - 工具配置页的模板重置改为基于运行态基础配置，进一步统一显示值、存储值与执行读取值
  - 执行 `npm run build` 构建验证通过，为进入 Phase 3 提供稳定基线

- 🔧 **Phase 1：入口层拆壳完成** (`index.js`, `modules/app/bootstrap.js`, `modules/app/popup-shell.js`, `modules/app/public-api.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增 `bootstrap` 模块，集中承接模块动态加载、样式注入、主题恢复与魔棒菜单入口注册
  - 新增 `popup-shell` 模块，承接主弹窗、主/子标签切换与页面装配逻辑
  - 新增 `public-api` 模块，统一组装 `YouYouToolkit` 对外公开 API
  - 将 `index.js` 收敛为薄入口，仅保留上下文装配、全局挂载与初始化调用
  - 执行 `npm run build` 构建验证通过，为进入 Phase 2 提供稳定基线

### 文档

- 📝 **新增 MVU 深度解析与事务化收口施工文档** (`docs/MVU_DEEP_ANALYSIS.md`, `docs/MVU_TRANSACTION_REWORK_PLAN.md`, `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增 `docs/MVU_DEEP_ANALYSIS.md`，重新梳理当前自动触发、messageId 级去重与写回刷新问题的根因模型
  - 新增 `docs/MVU_TRANSACTION_REWORK_PLAN.md`，将下一轮主线明确收口为 `generation action 识别 -> generation-aware dedupe -> writeback refresh confirm`
  - 将 `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md` 收口为历史专项与 N1 / N2 宿主验收档案，不再单独承担本轮主施工文档职责
  - 宿主回归清单与 API / 进度文档同步补入“同楼层 reroll / 重roll 不再自动触发”的新证据与下一轮规划口径

- 📝 **新增 N1 宿主自动触发链验收记录模板** (`docs/N1_AUTO_TRIGGER_ACCEPTANCE_RECORD.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增独立记录模板，用于统一登记 A10 / A11 / A12 / A13 的宿主验收结果
  - 在宿主回归清单中补充该模板引用，避免后续宿主结论继续零散散落在聊天记录或临时笔记里
  - 在进度文档中补记“下一步等待 N1 实机结果回填”的状态

- 📝 **实现回顾与下一施工方案收口** (`docs/HOST_REGRESSION_CHECKLIST.md`, `docs/CODEBASE_DIET_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 为 N1 宿主自动触发链验收补充统一登记模板，避免验收结果继续停留在口头结论
  - 在 `docs/CODEBASE_DIET_PLAN.md` 中明确下一轮优先级为 `N1 宿主验收 -> S2 存储接口收口 -> S3 启动期进一步减载`
  - 在进度文档中补登记本轮代码瘦身收口已完成构建验证，并同步沉淀这次回顾结论

- 📝 **文档可信度收敛与无效文档清理** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/EXTENSION_GUIDE.md`, `docs/CONTRIBUTING.md`, `docs/SHUJUKU_ARCHITECTURE.md`)
  - 重写并校正 README 中仍停留在旧版 STScript / 消息源生成器语义上的“正则提取”说明，统一到当前规则提取面板语义
  - 修正 API 文档中已经失真的 regex extractor 接口描述，改为当前真实的规则模板 / 标签规则 / 规则预设 / 导入导出 API
  - 同步调整扩展开发指南与贡献指南中的旧入口、旧扩展方式与文档维护边界说明
  - 删除 `docs/SHUJUKU_ARCHITECTURE.md` 这份不属于当前项目正式文档区的参考残留文档

- 📝 **自动触发链下一阶段施工编排正式收口** (`docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 将下一阶段正式收口为 `N1 宿主自动触发链验收 ->（若失败）第三轮自动触发定向补修 ->（若通过）N2 写回链宿主专项`
  - 在专项文档中补齐 N1 的执行顺序、通过标准、失败回退点，以及 N1 失败后的补修边界，避免继续口头约定推进
  - 在进度文档中同步固化当前执行口径，明确未完成 N1 前不继续扩大自动触发判断面

- 📝 **新增自动触发链残余风险专项施工文档** (`docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_EXECUTION_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增独立专项文档，用于承载自动触发链主问题修复后剩余的 baseline 竞态、历史 replay 风险与后续宿主回归矩阵
  - 在总施工方案文档中补充“后续专项补修建议”，避免继续把残余风险零散塞回主 Phase 方案
  - 在施工进程文档中补记专项文档已建立，并说明后续若继续施工应以该专项文档为准

- 📝 **优化施工文档完成度复核** (`docs/OPTIMIZATION_EXECUTION_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 为施工方案文档补充 2026-03-24 完成度复核，明确 5 个 Phase 与 11 项实施清单均已在代码中找到落点
  - 更新施工进程文档中的最后更新时间、当前状态、施工日志与回归结论，正式将“文档施工状态”收口为已完成
  - 为架构分析文档补充“施工前基线 / 施工后复核”定位说明，避免把历史问题误读成当前代码现状

- 📝 **新增优化方案施工文档** (`docs/OPTIMIZATION_EXECUTION_PLAN.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 基于最新架构梳理结果，新增面向后续重构落地的施工文档
  - 将优化目标收敛为入口拆壳、工具模型统一、执行链清主次、UI 装配中心统一、调试与回归保障增强五个阶段
  - 为每个阶段补充目标、涉及文件、实施内容、风险点、验收标准与整体施工顺序

- 📝 **新增优化施工进程文档** (`docs/OPTIMIZATION_PROGRESS.md`, `docs/OPTIMIZATION_EXECUTION_PLAN.md`)
  - 新增用于记录实际施工过程的进程文档，和“架构分析 / 优化方案”文档形成分层分工
  - 初始化 Phase 看板、当前施工焦点、阶段验收项、施工日志与回归检查模板
  - 为后续逐阶段实施提供统一记录载体

- 📝 **补充 shujuku / MVU 参考项目启发结论** (`docs/OPTIMIZATION_EXECUTION_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 结合 shujuku 的事件门控、多层兜底与宿主兼容策略，明确当前项目的高风险点主要集中在触发链与宿主时序问题
  - 结合 MVU 的单一运行态模型、强约束输出与生命周期回调思想，明确后续工具模型统一与结构化工具链的演进方向
  - 将参考项目启发同步到优化方案与施工进程文档，作为 Phase 1 前的设计输入

### 修复

- 🐛 **宿主回归辅助能力增强：补齐 session 漂移摘要与门控/事件桥接诊断概览** (`modules/tool-trigger.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `getToolTriggerManagerState()` 现已补齐 `activeSessions / registeredEvents / pendingTimerCount / eventBridge / gateState`，用于直接查看当前事件注册、桥接状态、待执行定时器与门控状态
  - `getAutoTriggerDiagnostics().summary` 现已补齐 `phaseCounts / consistency`，可快速统计 active/history 中各 phase 数量，并汇总 session 冻结字段与当前 generation 状态之间的漂移次数
  - `activeSessions / recentSessionHistory` 条目现已新增 `driftDetected / generationTraceDrifted / generationUserIntentDrifted / baselineResolvedStateChanged / baselineResolutionAdvancedSinceSessionCreation / driftReasons`，用于区分“baseline 正常补全”与“session 归属真的漂移”

- 🐛 **宿主回归辅助能力增强：补齐事件时间线、A10~A13 verdict hints 与诊断导出入口** (`modules/tool-trigger.js`, `modules/app/public-api.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 自动触发诊断现已新增 `recentEventTimeline`，可按时间顺序回看 generation、baseline、session phase、UI guard 的关键事件轨迹
  - 新增 `verdictHints`，对 A10 / A11 / A12 / A13 提供第一层快速可疑项提示，降低宿主判案起手成本
  - 对外 API 新增 `YouYouToolkit.exportAutoTriggerDiagnostics()`，可直接导出一份纯 JSON 诊断快照，用于宿主回归留档或 issue 附件

- 🐛 **宿主回归辅助能力增强：工具页诊断折叠区接入 verdict hints / timeline / 诊断导出按钮** (`modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 工具配置页中的“最近触发诊断”折叠区已不再只显示单工具 runtime，还会同步显示 N1 快速判读 chips、active/timer/phase 摘要与最近自动触发时间线
  - 新增“复制自动触发诊断 JSON”按钮，直接复用 `exportAutoTriggerDiagnostics()` 导出当前快照，便于宿主实机回归留档
  - 这样宿主侧除了控制台外，也可直接在 UI 内完成第一轮排查与快照复制

- 🐛 **宿主回归辅助能力增强：新增自动触发诊断聚合 API** (`modules/tool-trigger.js`, `modules/app/public-api.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增 `getAutoTriggerDiagnostics(options)`，统一聚合 `summary / activeSessions / recentSessionHistory / lastEventDebugSnapshot / lastAutoTriggerSnapshot`
  - 对外 API 已增加 `YouYouToolkit.getAutoTriggerDiagnostics()` 入口，方便宿主环境直接调用
  - 回归清单与 API 文档同步补充该诊断入口的使用方式，减少宿主验收时手工拼装状态的成本

- 🐛 **宿主回归准备：消息级 session 历史补齐 generation 意图诊断字段** (`modules/tool-trigger.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `messageSessions / recentSessionHistory` 现在会同步记录 `baselineResolved / provisionalBaseline / generationStartedByUserIntent / generationUserIntentSource / generationUserIntentDetail / lastUserIntentSource`
  - 这样在宿主里排查 A12 / A13 时，可以直接对照每个 session 在 `received / scheduled / handling / skipped / completed` 各阶段看到的 generation 意图状态，而不是只能依赖最近一次全局快照
  - 宿主回归清单与 API 文档同步补充了这些字段的观测方式与预期结果

- 🐛 **自动触发专项补修第二轮：恢复用户主动 `regenerate / swipe` 的合法确认路径** (`modules/tool-trigger.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `GENERATION_STARTED` 的用户意图判定不再只依赖“最近是否出现新的用户楼层”，而是同时支持显式用户 generation 动作识别；当前已将 `regenerate`、`swipe` 视为合法用户意图来源
  - `getGenerationConfirmationEligibility()` 不再把 `startedByUserIntent = false` 当成系统级硬阻断，`ignoreAutoTrigger` 重新回归监听器设置层控制，避免合法用户重新生成被误打成 `ignored_auto_trigger`
  - 调试快照新增 `generationUserIntentSource / generationUserIntentDetail / lastUserIntentSource` 等字段，用于区分“最近用户发送”“显式 regenerate/swipe”与“确实无用户意图”三类来源
  - 工具诊断面板、API 文档与宿主回归清单同步更新，新增对用户主动 regenerate/swipe 与非用户意图 generation 的区分说明

- 🐛 **自动触发链专项补修：baseline 竞态与历史 replay 防线增强** (`modules/tool-trigger.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `GENERATION_STARTED` 改为先同步写入 provisional baseline，再异步补全正式 baseline，降低宿主高时序下因 baseline 尚未就绪而误跳过真实回复的风险
  - `MESSAGE_RECEIVED` 新增历史 replay 防线：即使事件携带 `messageId`，若不属于当前 active generation 或超出合法确认窗口，也会被拦截
  - 调试快照新增 `baselineResolved / baselineResolutionAt / provisionalBaseline / historicalReplayBlocked / historicalReplayReason` 等字段
  - 工具配置面板的跳过原因文案同步补齐 `historical_replay_message_received / message_received_outside_active_generation / dry_run_generation` 等新分支

- 🐛 **移除误做的壳层“保存当前工具”按钮** (`modules/app/popup-shell.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 删除 popup shell 主内容头部额外补上的“保存当前工具”按钮入口
  - 保留工具配置面板内部原有的保存按钮，不影响正常保存逻辑
  - 避免继续保留这类壳层级误做入口，减少界面歧义

- 🐛 **自动触发链状态机收口，修复旧对话 / 聊天信息窗口误触发工具** (`modules/tool-trigger.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 在 `GENERATION_STARTED` 时记录 generation baseline，后续只允许 baseline 之后新增的 assistant 楼层成为本轮确认目标，不再回退吸收“当前聊天里最后一条 assistant 消息”
  - 将 `GENERATION_AFTER_COMMANDS` 默认降级为 speculative 观察事件；缺少明确消息身份时只记录 session，不再直接进入执行调度
  - 将 `MESSAGE_RECEIVED` 收紧为“必须带 `messageId` 且最终确认命中 assistant 新楼层”才允许执行；无身份事件统一视为宿主 UI 副作用
  - 将 `dryRun` 升级为系统级硬阻断，并补充 `confirmationSource / confirmedAssistantMessageId / skipReasonDetailed / uiTransitionGuard` 等调试字段
  - 新增 `CHAT_CHANGED / CHAT_CREATED` 触发的 UI 过渡守卫，降低打开旧对话、聊天信息窗口、消息详情窗口时的宿主副作用误触发风险
  - 用户已在宿主环境确认：打开旧对话 / 聊天信息窗口不再误触发工具，正常回复链保持可用

- 🐛 **打开宿主聊天信息窗口时的自动工具误触发修复** (`modules/tool-trigger.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `MESSAGE_RECEIVED` 兜底链现在要求“存在明确消息身份”或“当前确实处于生成中”才允许继续回退到最新消息推断，避免打开聊天信息窗口等宿主 UI 操作时被误当成有效回复事件
  - 对无消息身份且非生成期的 `MESSAGE_RECEIVED` 事件统一标记为 `unrelated_ui_event` 并直接忽略，不再触发工具请求
  - 执行 `npm run build` 构建验证通过

- 🐛 **滚轮滚动恢复与主工具箱窗口进一步放大** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 移除拖拽滚动层对 `wheel` 事件的拦截，恢复鼠标滚轮在主内容区、设置区与工具列表中的原生滚动行为
  - 保留按住左键拖拽滚动能力，但避免与原生滚轮滚动互相打架
  - 将 popup 主窗口继续放大到更接近宿主视口上限，并同步更新 fallback 内置样式，避免外部样式加载失败时尺寸回退
  - 执行 `npm run build` 构建验证通过

- 🐛 **工具详情区滚轮代理与顶部保存按钮补齐** (`modules/app/popup-shell.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 工具详情区现在支持“鼠标位于内容区任意位置时，滚轮即可驱动当前详情区滚动”，不再必须把光标精确移到滚动条上
  - 为 textarea、提取预览、下拉面板和对话框正文保留原生内部滚动优先级，避免细分区域滚动被外层抢走
  - 在工具配置页 hero 区补充顶部“保存配置”按钮，减少每次修改后都要拖到底部才能保存的成本
  - 执行 `npm run build` 构建验证通过

- 🐛 **工具详情滚轮命中修正与壳层保存按钮兜底** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 修正工具详情区滚轮代理的命中层级，使滚轮优先驱动当前激活工具详情容器，而不是停留在外层 content 容器导致视觉上“没滚动”
  - 在 popup shell 主内容头部直接补充壳层“保存当前工具”按钮，并同步补齐主样式与 fallback 样式，避免动态工具 hero 内按钮未及时渲染时仍然无保存入口
  - 执行 `npm run build` 构建验证通过

- 🐛 **自动触发 message session 收敛、写回块身份与诊断历史增强** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/tool-output-service.js`, `modules/tool-registry.js`, `modules/core/settings-service.js`, `modules/ui/components/settings-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 自动触发链新增消息级 session 聚合：`GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED` 现在会尽量归并到同一条消息的生命周期记录中，并暴露 `activeSessionCount / recentSessionHistory`
  - listener 设置新增 fallback 开关、session 窗口与历史保留条数，设置页也同步补齐了对应开关与说明文案
  - 写回链新增块身份、替换结果与冲突诊断字段，用于区分“替换旧块 / 保守插入新块 / 影响其他工具块”三类结果
  - 单工具运行态新增 `lastTraceId / recentTriggerHistory / recentWritebackHistory`，工具配置面板可直接查看最近触发历史与最近写回历史

- 🐛 **自动触发仅响应 AI 楼层并收敛重复去重日志** (`modules/tool-trigger.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `MESSAGE_RECEIVED` 兜底链现在会先解析实际命中的消息楼层；若判定为用户消息或其他非 AI 楼层，则直接在事件级忽略，不再误触发自动工具链
  - 构建自动执行上下文时，若事件已明确给出目标消息 ID，会优先锁定该楼层，减少把用户消息事件误配到“最新 AI 回复”的概率
  - 同一消息的兜底调度键现在优先基于消息 ID 合并，且对短时间内重复命中的 `duplicate_message` 日志做了抑制，降低控制台噪声

- 🐛 **工作台可视区过小与内容区不可滚动/拖拽修复** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/tool-manage-panel.js`, `modules/ui/components/settings-panel.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 收紧 popup 顶部概览、侧栏与主内容说明区的高度与间距，把更多垂直空间让给实际配置区
  - 为主内容区、激活页签区、子面板区和侧栏导航补齐高度继承、最小宽高约束与 `overscroll-behavior`，恢复稳定滚动
  - 新增基于鼠标拖拽的滚动支持：可直接在侧栏导航、次级导航和主内容区按住拖动滚动，不再只能依赖细滚动条
  - 同步收紧工具配置页 hero、工具管理页 hero、设置页 hero 的密度，扩大可操作区域
  - 执行 `npm run build` 构建验证通过

- 🐛 **主工具箱工作台布局错乱与样式注入回退修复** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 调整主工具箱工作台 topbar / sidebar / main workspace 的栅格比例、当前页面信息卡与响应式断点，避免导航区过宽、内容区被严重压缩
  - 收紧侧栏宽度并增强主内容区高度继承与滚动约束，修复页面信息堆叠成“纯文本块”后可读性极差的问题
  - 修复 `bootstrap` 中 `styles/main.css` 仅按单一路径拉取导致宿主环境加载失败的问题；现在会尝试基于 `import.meta.url` 的多个候选路径，并在失败时回退到更新后的内置工作台骨架样式
  - 执行 `npm run build` 构建验证通过

- 🐛 **自动触发初始化时序补强与 youyou 前缀控制台日志增强** (`modules/tool-trigger.js`)
  - 触发模块初始化时改为同时等待 `SillyTavern API` 与 `eventSource` 就绪，避免在酒馆事件源尚未挂载时过早初始化导致自动监听失效
  - 新增一组始终输出的 `[youyou_trigger]` 控制台日志，覆盖初始化、事件注册、事件接收、自动调度、跳过原因、工具执行成功/失败等关键节点
  - 便于在酒馆控制台中快速判断“有没有收到事件、有没有进入自动触发、是在哪一步被跳过或失败”

- 🐛 **事件源获取兼容层补强** (`modules/tool-trigger.js`)
  - 自动触发初始化不再只依赖 `SillyTavern.eventSource`，而是增加对 `topWindow.eventSource`、`SillyTavern.getContext()` 以及 `/script.js` 导出事件源的多源兼容探测
  - 修复此前 `hasApi: true, hasEventSource: false` 时会一直卡在重试初始化、导致自动触发链根本无法启动的问题
  - 新增事件源来源日志，便于确认当前酒馆环境究竟命中了哪条兼容路径

- 🐛 **写回链分层结果标准化与最终校验增强** (`modules/context-injector.js`, `modules/tool-output-service.js`, `docs/API_DOCUMENTATION.md`)
  - 保留 `contextInjector.inject()` 的布尔兼容接口，同时新增 `injectDetailed()` 返回分层写回结果，便于区分“找不到目标消息 / 宿主写回失败 / 写回后校验失败”
  - 写回结果现在会记录目标消息索引、写入字段、宿主写回方式、各步骤状态与最终校验结果
  - `tool-output-service.runToolPostResponse()` 的 `meta` 结构新增 `writebackDetails`，用于更精确定位写回链问题
  - 宿主写回逻辑新增 `setChatMessages -> setChatMessage` 的回退链，而不是前者失败后只停留在本地同步

- 🐛 **自动触发设置接线与事件级诊断补齐** (`modules/tool-trigger.js`, `modules/core/settings-service.js`, `modules/ui/components/settings-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`)
  - 将监听器设置真正接入自动触发主链：`listenGenerationEnded`、`ignoreQuietGeneration`、`debounceMs` 不再只是 UI / 存储项
  - 为 `ignoreAutoTrigger` 增加“最近用户发送意图”门控语义，用于尽量跳过插件/脚本引发的自动生成误触发
  - 新增 `lastEventDebugSnapshot` 事件级调试快照，帮助定位“宿主事件是否收到 / 是否被调度 / 在哪一步被跳过”
  - 修复 `destroyToolTriggerManager()` 使用错误回调清理监听器的问题，避免后续重绑时残留脏监听
  - 同步调整设置页说明文案与工具面板跳过原因文案，降低“设置看起来有，但实际上不生效”的误导

- 🐛 **工具列表入口、手动执行、自动触发与楼层刷新进一步修复** (`modules/tool-registry.js`, `index.js`, `modules/ui/components/tool-manage-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `modules/tool-trigger.js`, `modules/api-connection.js`, `modules/context-injector.js`, `docs/API_DOCUMENTATION.md`)
  - 新增可见的顶层 `工具列表` UI 页面，用户可直接在界面里创建、编辑、删除自定义工具；新建工具后会自动跳转到对应配置页
  - 修复 `follow_ai` 模式下“手动执行”被错误禁用的问题；现在该模式仅关闭自动额外解析，不再阻止手动执行
  - 自定义 API 请求链路新增优先尝试 `TavernHelper.generateRaw({ custom_api })`，使后台表现更接近 MVU / 酒馆原生额外模型请求
  - 自动触发链路新增 `GENERATION_AFTER_COMMANDS` 参考触发，并对 `MESSAGE_RECEIVED` 改为延迟调度，降低消息尚未稳定写入时的漏触发概率
  - 工具结果写回最新楼层时改为优先 `refresh: 'affected'`，补发 `MESSAGE_UPDATED`，并尝试额外调用空 `setChatMessage` 强制刷新，缓解插入后仍需手动刷新页面的问题

- 🐛 **工具输出标签保留与自定义工具页签打通** (`modules/tool-output-service.js`, `modules/tool-registry.js`, `modules/ui-components.js`, `index.js`, `docs/API_DOCUMENTATION.md`, `docs/EXTENSION_GUIDE.md`)
  - 修复工具结果写回最新 AI 楼层时会把提取用外层标签一并剥掉的问题；现在命中提取规则后会优先保留完整标签块，避免明明在模板里输出了 `<boo_FM>` / `<status_block>` / `<youyou>`，最终注入时却只剩内部正文
  - 打通“工具列表 -> 新建工具”与实际工具页签之间的链路：新建的自定义工具现在会自动出现在“工具”页签下，并复用统一配置面板进行编辑与手动测试
  - 补齐工具样式聚合，避免部分工具/自定义工具面板样式注入不完整

- 🐛 **自动监听稳定性、最新楼层回填与小幽点评工具接入** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/tool-prompt-service.js`, `modules/tool-output-service.js`, `modules/tool-executor.js`, `modules/tool-registry.js`, `modules/ui/index.js`, `modules/ui-components.js`, `modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/youyou-review-panel.js`, `index.js`, `README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 自动监听在读取最新 AI 楼层时新增对 `message_id` 字段的兼容，并过滤 `MESSAGE_RECEIVED` 早期常见的 `...` 占位消息，降低“AI 已回复但工具未自动触发”的概率
  - `getToolsForEvent()` 不再只写死遍历摘要工具和状态栏，而是改为从所有启用的默认工具中按触发事件动态筛选，为新增工具自动触发打通链路
  - 工具请求构建恢复为“破限词前置消息 + 当前工具模板解析后的 user 消息”，避免必须额外配置 AI 指令预设消息才能运行，修复此前工具虽然监听到了回复、但实际没有构造出请求消息的问题
  - 最新楼层写回增强：插入工具结果时会额外尝试调用 `setChatMessages()` / `setChatMessage()`，并同步 `mes / message / content / text` 多字段，同时去除该工具上一次存储的纯文本结果，修复“获得工具回复后没有稳定插入到最新楼层”与“覆盖时重复叠加旧结果”的问题
  - 新增默认工具 `youyouReview`（小幽点评），并接入工具页签、配置面板、默认模板和自动触发链路，用于生成 `<youyou>` 与 `<gouzi>` 结构化点评输出

- 🐛 **工具双宏模型与绑定预设执行链收敛** (`modules/variable-resolver.js`, `modules/tool-prompt-service.js`, `modules/tool-output-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 删除旧的单一工具宏入口，正式收敛为 `{{toolPromptMacro}}`（工具模板提示词）与 `{{toolContentMacro}}`（处理好的 n 条消息正文与工具结果）两个宏，减少使用理解负担
  - 工具不再自动把模板提示词或正文拼接成额外消息；工具层现在只负责产出宏上下文，最终发送给额外模型的消息仅来自破限 / AI 指令预设渲染结果
  - 当未配置任何可发送的 AI 指令预设消息时，工具执行会直接给出明确报错，而不是继续发送空消息
  - 修复工具绑定 API 预设后仍走 `sendWithPreset()` 旧分支的问题；现在无论是否绑定预设，都会先解析成最终 `apiConfig`，再直接使用对应 API 与模型执行请求
  - 修复自定义 API 代理分支失败后无条件回退浏览器直连的问题；现在只有在检测到 SillyTavern 后端转发路由本身不可用时才回退，避免后端真实错误被吞掉后伪装成“外部 API 返回 HTML / URL 配错”

- 🐛 **工具执行前 API 校验、工具页签恢复与上下文即时刷新修复** (`modules/api-connection.js`, `modules/tool-output-service.js`, `modules/context-injector.js`, `index.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 工具在执行额外 API 调用前会先校验当前配置或绑定预设；当未启用主 API 且自定义 API 配置不完整时，会直接给出明确错误提示，避免请求落到错误 URL 后出现 `Unexpected token '<'` 这类 HTML 解析报错
  - 自定义 API 发送链路新增“优先走 SillyTavern 后端转发 `/api/backends/chat-completions/generate`，失败再回退浏览器直连”逻辑，尽量复用酒馆后端代理以规避浏览器直连自定义接口时的 CORS / HTML 跳转问题
  - 自定义 API 响应解析改为先读取原始文本再尝试 JSON 解析；如果服务端返回 HTML / 重定向页面，会给出“可能是 URL 配置错误或应启用主 API”的可读提示
  - 修复工具执行侧读取 API 预设时错误从 `settings.apiPresets` 取值、而不是从独立的 `api_presets` 存储键读取的问题，避免新建并保存的预设在工具执行时被误判为“不存在”
  - 进一步统一工具页显示值、工具配置存储值与历史 `tool_api_bindings` 绑定值的解析优先级；现在下拉框展示、保存结果与实际执行都会收敛到同一份 `output.apiPreset/apiPreset`，避免“界面看起来已绑定，但执行实际落到当前自定义 API”
  - 工具箱重新打开时，工具页现在会优先恢复上次选中的子工具页签，不再总是回退到第一个工具，修复“高亮在主角状态栏但内容仍是摘要工具”的错位问题
  - 工具结果写回最新 AI 楼层时会保留同楼层已有的其他工具输出，并同时同步 `context.chat` / `SillyTavern.chat` 引用后重复触发 `MESSAGE_UPDATED`，提升插入上下文后的界面即时刷新成功率
  - 破限词模板现在也会经过变量解析，可直接在破限词消息中使用 `{{extractedContent}}`、`{{recentMessagesText}}`、`{{rawRecentMessagesText}}`、`{{userMessage}}`、`{{toolName}}`、`{{toolId}}` 等“工具宏”来自定义插入位置
  - 当时新增过单一工具宏别名作为当前工具提取内容入口（现已在后续版本中移除）
  - API 预设面板的下拉选择现在会与“加载预设 / 当前已加载预设 / 保存覆盖目标”保持一致，修复仅切换下拉后看到的是某个预设、但保存或工具执行用的仍是旧配置的问题
  - 工具提示词不再自动追加“提取结果 / 最近消息正文”；若需要使用提取内容，改为由用户在模板或破限词中显式插入工具宏

- 🐛 **当前 API 配置 / 激活预设 / 工具宏显式注入进一步收敛** (`modules/api-connection.js`, `modules/ui/components/api-preset-panel.js`, `modules/tool-prompt-service.js`, `docs/API_DOCUMENTATION.md`)
  - 修复“使用当前API配置”仍直接读取 `settings.apiConfig`、未跟随当前激活 API 预设的问题；现在只要已激活某个预设，工具在未显式绑定专属预设时就会默认使用该激活预设
  - 修复 API 预设面板重渲染仍按裸 `settings.apiConfig` 回填表单、导致显示值与激活预设再次分叉的问题；面板现在优先显示当前激活预设对应配置
  - 修复加载预设后点击“保存配置”选择“不覆盖预设”时，虽然提示为仅保存当前配置，但实际仍保留激活预设的问题；现在该分支会同时切回“当前API配置”
  - 修复工具提示词模板实际上仍保留 `lastAiMessage` 隐式兜底追加的问题；现在模板与破限词都改为纯显式宏模式，不再偷偷补任何 AI 正文
  - 修复旧单一工具宏仅在破限词可用、正文模板里却未真正解析的问题；现在正文模板同样统一走变量解析器

- 🐛 **工具自动触发补强与最新 AI 上下文回填修复** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/ui/utils.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 自动触发链路新增 `MESSAGE_RECEIVED` 兜底监听，并对 `GENERATION_ENDED / MESSAGE_RECEIVED` 共用同一套去重逻辑，降低部分环境下只收到消息事件、却未稳定触发工具链的问题
  - 构建执行上下文时改为带重试地读取最近聊天快照，优先锁定刚生成的最新 AI 消息，修复 AI 回复刚落盘时手动执行 / 自动执行读到旧消息的问题
  - 工具链读取 `{{injectedContext}}` 时改为直接读取“最新 AI 消息对象”上的镜像写回内容，不再把历史缓存聚合结果当作当前楼层上下文使用
  - 提取预览弹窗进一步限制最大高度并让正文区独立滚动，避免多楼层结果较长时超出屏幕

- 🐛 **工具主链路收敛为“最新 AI 楼层原文 -> 工具回复回写楼层原文”** (`modules/context-injector.js`, `modules/tool-output-service.js`, `modules/tool-prompt-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `modules/tool-registry.js`, `docs/API_DOCUMENTATION.md`)
  - 删除主链路中的世界书注入配置与相关 UI，避免流程分叉影响工具执行
  - 删除工具提示词中的 `{{injectedContext}}` 自动拼接逻辑，避免历史状态混入本轮工具调用
  - 工具执行成功后改为直接把工具回复插入最新 AI 楼层原文，并按提取规则移除旧工具块后覆盖刷新
  - 上下文服务现仅保留“楼层消息写回 / 读取 / 清理”职责，不再承担聊天级缓存主链路角色

- 🐛 **工具提取顺序与上下文注入修复** (`modules/tool-output-service.js`, `modules/tool-prompt-service.js`, `modules/context-injector.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`)
  - 修复最近消息收集逻辑，明确按“最近 N 条 AI 消息”逆序回溯采集，避免用户消息夹在中间时导致可用 AI 条数不足
  - 调整“测试提取 / 工具提取”逻辑：正文提取与工具标签提取都会分别直接作用于每条原始 AI 消息，不再把一方的结果作为另一方输入
  - 修复工具提示词未真正带入 `injectedContext` 的问题；现在既支持 `{{injectedContext}}` 等占位符，也会在模板未显式引用时自动追加已注入上下文
  - 聚合工具上下文时按更新时间稳定排序，并让世界书目标解析兼容 `character` / `__character__` 两种写法
  - 修复“工具输出没有写回最新 AI 回复消息对象”的问题；现在注入成功后会额外把结果镜像保存到最新 AI 消息的自定义字段中，并尝试触发消息刷新
  - 工具面板中的测试提取结果改为按 AI 消息逐条展示原文、正文提取结果与工具提取结果，避免多条消息混在一个文本框里难以分辨
  - 修复逐条消息预览弹窗在内容过长时超出屏幕且没有滚动条的问题；对话框现在会限制最大高度，并让内容区独立滚动

- 🐛 **工具管理事件与导入参数兼容修复** (`modules/tool-manager.js`, `modules/ui/components/tool-manage-panel.js`)
  - 修复新建工具时统一发出 `TOOL_REGISTERED` 事件，避免创建工具也被错误视为更新工具
  - 修复工具管理面板与底层存储重复触发事件的问题，避免启用/禁用、创建、更新时出现重复事件广播
  - 修复 `importTools()` 只接受布尔值、但 UI 传入 `{ overwrite: false }` 对象时的逻辑歧义，现在同时兼容布尔参数和对象参数

- 🐛 **工具面板错误样式变量兼容修复** (`modules/ui/components/summary-tool-panel.js`, `modules/ui/components/status-block-panel.js`, `styles/main.css`, `index.js`)
  - 修复工具面板中使用不存在的 `--yyt-danger` 变量导致错误状态颜色在部分场景下失效的问题
  - 统一改为 `--yyt-error`，并增加 `--yyt-danger` 到 `--yyt-error` 的兼容别名，避免旧样式引用失效

- 🐛 **入口版本标识修正** (`index.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 修正文档和入口注释中的版本号漂移问题，统一到当前版本 `0.6.2`

- 🐛 **消息监听门控与最近消息读取兼容性修复** (`modules/tool-trigger.js`)
  - 参考 shujuku 补充“发送意图”捕获逻辑：在发送按钮点击、回车发送等路径上提前记录用户真实发送意图，降低部分环境下 `MESSAGE_SENT` 时序不稳定带来的监听丢失概率
  - 为 `GENERATION_STARTED / GENERATION_ENDED` 补充 quiet / dryRun 门控上下文记录，自动工具执行会跳过静默生成与后台生成，避免误触发
  - 最近消息读取新增多字段兼容：聊天消息内容现在会同时兼容 `mes`、`message`、`content`、`text` 等结构，修复部分 TavernHelper / SillyTavern 环境下“测试提取拿不到任何消息”或自动执行后读不到最新 AI 回复的问题
  - 当 `GENERATION_ENDED` 后仍未取到有效 AI 回复时，自动工具链会直接跳过并写日志，避免空消息进入后续解析流程

- 🐛 **工具独立提取与世界书注入链路增强** (`modules/tool-registry.js`, `modules/context-injector.js`, `modules/tool-output-service.js`, `modules/tool-prompt-service.js`, `modules/tool-trigger.js`, `modules/ui/components/summary-tool-panel.js`, `modules/ui/components/status-block-panel.js`, `docs/API_DOCUMENTATION.md`)
  - 为每个工具新增独立提取配置：最大提取消息数、单独标签/正则规则，并保留 `extractTags` 兼容映射
  - 新增“测试提取”能力，可直接基于最近若干条角色消息预览提取前原文与提取后结果，方便排查规则是否生效
  - 修复手动执行虽然控制台成功但未真正写入上下文的问题：工具执行成功后现在会同步写入目标世界书，写入失败会直接标记执行失败
  - 参考 shujuku 的世界书注入思路，为每个工具增加独立世界书绑定、注入位置、Depth、Order 配置，并默认支持写入当前角色绑定世界书
  - 工具提示词上下文新增 `{{extractedContent}}` 与 `{{recentMessagesText}}` 变量，便于模板直接引用提取结果和最近消息原文
  - 最近消息提取改为优先使用 TavernHelper 的 `getChatMessages()` / `getLastMessageId()`，并在不可用时回退到 `SillyTavern.getContext().chat` 与 `SillyTavern.chat`，修复部分环境下“测试提取拿不到消息”的问题

- 🐛 **工具面板收敛与自动触发通知增强** (`modules/ui/components/summary-tool-panel.js`, `modules/ui/components/status-block-panel.js`, `modules/tool-trigger.js`, `modules/ui/utils.js`, `modules/ui-components.js`, `docs/API_DOCUMENTATION.md`)
  - 参考 shujuku / MVU 的配置思路，将工具页收敛为 5 个核心区块：模板修改框、输出模式、API 预设、破限预设、手动操作区
  - 删除原先冗余的启用、自动触发、覆盖旧结果、复制模板、重置整页、调试折叠等复杂交互，降低使用门槛
  - `follow_ai` 现在在 UI 上明确视为“不启用额外工具链”，只有 `post_response_api` 才会参与 AI 回复后的自动执行
  - 新增顶部通知：AI 回复被监听、自动执行开始、执行成功、执行失败都会在顶部显示明显提示，避免只看控制台难以确认状态
  - 新增手动执行入口，可直接基于当前模板 / API 预设 / 破限预设执行一次工具，方便排错与验证
  - 工具样式聚合逻辑同步更新，确保摘要工具与主角状态栏的新样式都能被正确注入

- 🐛 **破限词面板默认预设清理** (`modules/bypass-manager.js`, `modules/ui/components/bypass-panel.js`)
  - 移除强制注入的内置 `standard` 破限词预设，避免面板出现多余且难以处理的默认模板
  - 补充破限词面板各类失败场景的兜底提示，避免出现空白错误通知
  - 新增旧版破限词存储迁移：自动清理 `undefined` 默认预设、无 `id` 的历史样例模板，并规范化旧数据结构

- 🐛 **AI 回复监听与工具触发链路修复** (`modules/tool-executor.js`, `modules/tool-trigger.js`, `modules/tool-output-service.js`, `modules/tool-prompt-service.js`, `index.js`)
  - 修复 `getToolsForEvent()` 仍读取旧版 `triggerEvents` 字段，导致 `GENERATION_ENDED` 后无法找到应执行工具的问题
  - 在工具触发时按输出模式分别执行：`post_response_api` 走额外模型调用链，`follow_ai` 也会记录触发状态并显示通知
  - 修复工具输出服务的上下文注入参数顺序错误、重复拼接破限词消息、无法读取最新 AI 回复内容的问题
  - 初始化时为 `toolOutputService` 注入 API 连接模块，确保额外模型解析模式可以真正发起请求
  - 新增工具触发成功/失败 Toast 通知，并回写运行时状态到调试面板

### 计划中的功能

- ~~世界书注入集成~~ ✅ 已在 1.0.120 实现（`worldbooks` 配置字段）
- ~~多作用域支持~~ ✅ 已在 1.0.110 实现（`runScope` current / selected / all）
- 可视化执行历史面板
- 国际化支持

---

## [0.6.2] - 2026-03-15

### 修复

- 🐛 **工具触发模块初始化修复** (`index.js`)
  - **关键修复**：`initTriggerModule()` 从未被调用，导致 GENERATION_ENDED 事件监听器从未注册
  - 工具现在可以正确监听 AI 消息回复并自动触发执行
  - 在模块加载成功后立即初始化工具触发模块

- 🐛 **破限词面板内置预设判断修复** (`modules/ui/components/bypass-panel.js`)
  - 修复内置预设判断逻辑：从硬编码 `'standard'` 改为使用 `DEFAULT_BYPASS_PRESETS` 对象检查
  - 现在所有在 `DEFAULT_BYPASS_PRESETS` 中定义的预设都会被正确识别为内置预设
  - 内置预设不显示删除按钮，防止用户尝试删除不可删除的预设

- 🐛 **Toast通知显示修复** (`modules/ui/utils.js`)
  - 修复 toastr 不可用时错误消息不显示的问题
  - 新增自定义 Fallback Toast 实现，当 SillyTavern 的 toastr 不可用时显示可视化通知
  - 添加消息为空时的默认消息处理
  - 支持成功/错误/警告/信息四种类型的不同颜色显示

---

## [0.6.1] - 2026-03-15

### 修复

- 🐛 **破限词面板jQuery data属性修复** (`modules/ui/components/bypass-panel.js`)
  - 修复 jQuery data 属性访问问题：`data('preset-id')` → `data('presetId')`
  - 修复预设选择、删除、复制、设为默认等操作无法获取预设ID的问题
  - 修复消息ID访问问题：`data('message-id')` → `data('messageId')`

- 🐛 **主角状态面板旧格式修复** (`modules/ui/components/status-block-panel.js`)
  - 更新输出模式配置以兼容新的简化版格式

---

## [0.6.0] - 2026-03-15

### 简化重构

这次重构的核心是"收敛"——简化工具配置，删除过度设计，统一输出模式语义。

#### 修复

- 🐛 **主角状态面板旧格式修复** (`modules/ui/components/status-block-panel.js`)
  - 更新到 v3.0.0 简化版，与 summary-tool-panel.js 保持一致
  - 输出模式从 `inline/separate` 改为 `follow_ai/post_response_api`
  - 删除"可用变量"帮助文本（内部保留变量系统）
  - 新增破限词绑定配置区
  - 新增可折叠调试信息区

- 🐛 **破限词面板jQuery data属性修复** (`modules/ui/components/bypass-panel.js`)
  - 修复 jQuery data 属性访问问题：`data('preset-id')` → `data('presetId')`
  - 修复预设选择、删除、复制、设为默认等操作无法获取预设ID的问题
  - 修复消息ID访问问题：`data('message-id')` → `data('messageId')`

#### 更改
  - 输出模式常量更新：`INLINE` → `FOLLOW_AI`
  - 新增 `LEGACY_OUTPUT_MODES` 兼容映射
  - 新增 `shouldRunFollowAi` 方法（替代 `shouldRunInline`）
  - 保留旧方法作为兼容层

- 🔧 **UI组件简化** (`modules/ui/components/summary-tool-panel.js`)
  - 删除"可用变量"说明区
  - 输出模式选择：显示/隐藏额外API配置选项
  - 破限词绑定：启用后显示预设选择
  - 新增可折叠调试信息区
  - 样式优化：隐藏类、折叠动画、调试信息样式

#### 删除

- 🗑️ 删除工具页中的变量说明展示（内部保留变量系统）
- 🗑️ 删除 `PromptSegment` 外部概念
- 🗑️ 删除工具页复杂分段编辑器支持

#### 输出模式语义

新的输出模式定义：

- **`follow_ai`** (随 AI 输出)
  - 不执行额外解析链
  - 不调用额外模型
  - 不做上下文注入

- **`post_response_api`** (额外 AI 模型解析)
  - 监听 AI 回复结束
  - 使用工具绑定的 API 预设调用额外模型
  - 将结果注入上下文

#### 文档

- 📝 更新 CHANGELOG 记录 v0.6 简化重构
- 📝 更新 API 文档反映新的数据结构

---

## [0.5.0] - 2026-03-14

### 新增

- ✨ **设置服务** (`modules/core/settings-service.js`)
  - 统一全局配置管理
  - 执行器设置（并发数、重试次数、超时时间、队列策略）
  - 监听器设置（事件监听、过滤规则、防抖设置）
  - 调试设置（日志、执行历史、状态徽章）
  - UI设置（主题、紧凑模式、动画效果）

- ✨ **变量解析服务** (`modules/variable-resolver.js`)
  - 模板变量替换 `{{variableName}}`
  - 内置变量支持：`lastUserMessage`、`lastAiMessage`、`chatHistory`、`characterCard`、`toolName`、`injectedContext`
  - 正则提取变量 `{{regex.xxx}}`
  - 自定义变量注册

- ✨ **上下文注入服务** (`modules/context-injector.js`)
  - 按聊天隔离存储工具输出
  - 聚合上下文输出
  - 覆盖/追加模式支持
  - 上下文导入/导出

- ✨ **工具提示词服务** (`modules/tool-prompt-service.js`)
  - 提示词段落结构转API消息
  - 变量替换集成
  - 破限词消息合并
  - 提示词模板管理

- ✨ **破限词管理模块** (`modules/bypass-manager.js`)
  - 破限词预设CRUD
  - 消息列表管理（role、content、enabled）
  - 默认预设设置
  - 预设导入/导出
  - 工具绑定支持

- ✨ **UI组件**
  - `settings-panel.js` - 设置面板（执行器/监听器/调试/外观四个标签页）
  - `bypass-panel.js` - 破限词面板（左右布局，预设列表+编辑器）

- ✨ **工具配置结构扩展**
  - `trigger` - 触发配置
  - `prompt.segments` - 结构化提示词段落
  - `bypass` - 破限词绑定配置
  - `output` - 输出模式配置（inline/post_response_api）
  - `runtime` - 运行时状态

- ✨ **事件系统增强**
  - 新增 `SETTINGS_UPDATED` 事件
  - 新增 `TOOL_CONTEXT_INJECTED`、`TOOL_CONTEXT_CLEARED` 事件
  - 新增破限词相关事件
  - 新增工具执行事件

### 更改

- 🔧 **版本号更新** 到 0.5.0
- 🔧 **工具注册表** 扩展支持新的配置结构
- 🔧 **核心模块入口** 导出设置服务

### 文档

- 📝 更新架构文档，反映v0.5新增模块

---

## [0.4.0] - 2026-03-11

### 新增

- ✨ **核心层模块** (`modules/core/`)
  - `event-bus.js` - 事件总线，实现模块间松耦合通信
  - `storage-service.js` - 统一存储服务，支持命名空间隔离

- ✨ **UI层重构** (`modules/ui/`)
  - `ui-manager.js` - UI管理器
  - `components/` - 独立UI组件目录
    - `api-preset-panel.js` - API预设管理面板
    - `regex-extract-panel.js` - 正则提取面板
    - `summary-tool-panel.js` - 摘要工具面板
    - `status-block-panel.js` - 状态栏工具面板
    - `tool-manage-panel.js` - 工具管理面板

- ✨ **工具注册系统** (`modules/tool-registry.js`)
  - 工具动态注册与注销
  - 工具配置管理
  - API预设绑定

- ✨ **窗口管理模块** (`modules/window-manager.js`)
  - 独立浮动窗口创建
  - 窗口层级管理
  - 窗口状态持久化

- ✨ **提示词编辑器** (`modules/prompt-editor.js`)
  - 可视化段落编辑
  - 消息格式转换
  - 角色类型选择

### 更改

- 🔧 **架构重构** - 采用分层架构（核心层/服务层/UI层）
- 🔧 **入口优化** - index.js 简化为模块协调器
- 🔧 **弹窗系统** - 支持主顶栏和次级顶栏
- 🔧 **版本号更新** 到 0.4.0

### 文档

- 📝 更新架构文档，反映当前模块结构
- 📝 更新API文档，添加新增模块API
- 📝 删除过时的施工文档和参考项目文档

---

## [0.3.0] - 2026-03-09

### 新增

- ✨ **正则提取模块** (`modules/regex-extractor.js`)
  - 正则表达式测试与验证
  - 正则模板管理（创建/编辑/删除）
  - 内置5个常用正则模板（JSON内容、代码块、思考标签、对话引号、段落）
  - 自定义正则模板支持
  - 生成STScript脚本用于实际内容提取
  - 支持多种消息源（最后消息、角色消息、用户消息等）
  - 模板导入/导出功能
  - 捕获组索引配置

- ✨ **UI组件模块扩展** (`modules/ui-components.js`)
  - 新增正则提取面板
  - 正则测试区：实时测试正则表达式
  - 消息提取区：生成STScript命令
  - 模板列表展示与管理
  - 新增 `renderRegex()` 方法渲染正则面板
  - 新增 `getRegexStyles()` 方法获取正则面板样式

- ✨ **主入口更新** (`index.js`)
  - 新增"正则提取"导航标签页
  - 自动注入正则面板样式
  - 新增 `getRegexExtractor()` API方法

### 更改

- 🔧 版本号更新到 0.3.0
- 🔧 页面切换支持 `'regex'` 页面

### 文档

- 📝 更新README.md，添加正则提取功能说明
- 📝 更新API文档，添加正则提取模块API
- 📝 更新扩展指南，添加正则模块开发示例

---

## [0.2.1] - 2024-03-09

### 更改

- 🎨 **UI组件模块** (`modules/ui-components.js`) - 重大改进
  - **合并面板**：将API配置和预设管理合并到同一面板，简化操作流程
  - **移除连接测试**：不再需要连接测试功能，减少界面复杂度
  - **改进Toggle样式**：从简单checkbox改为美观的滑动开关，添加渐变和发光效果
  - **改进下拉框UI**：添加自定义下拉箭头，统一输入框样式
  - **修复模型选择器**：修复获取模型列表后下拉框宽度变短的问题
  - **新增预设对话框**：使用模态对话框代替prompt，支持输入名称和描述

### 修复

- 🐛 修复新预设编辑报错 "预设不存在" 的问题
- 🐛 修复切换预设时未保存配置导致操作丢失的问题

---

## [0.2.0] - 2024-03-09

### 新增

- ✨ **API连接管理模块** (`modules/api-connection.js`)
  - 支持自定义API配置（URL、API Key、模型、温度等参数）
  - 支持切换使用SillyTavern主API
  - 支持从API端点自动加载模型列表
  - 支持API连接测试
  - 支持发送测试请求验证配置
  - 兼容OpenAI及其他兼容API格式

- ✨ **预设管理模块** (`modules/preset-manager.js`)
  - 创建、编辑、删除API预设
  - 快速切换不同预设配置
  - 预设导入/导出（JSON格式）
  - 从当前配置快速创建预设
  - 预设复制/重命名功能
  - 预设数据验证

- ✨ **存储管理模块** (`modules/storage.js`)
  - 优先使用SillyTavern的extensionSettings存储
  - 自动回退到localStorage
  - 支持深度合并设置
  - 安全JSON解析/序列化

- ✨ **UI组件模块** (`modules/ui-components.js`)
  - Tab导航（API配置、预设管理、连接测试）
  - API配置表单
  - 预设列表展示
  - 连接测试面板
  - 完整的事件绑定系统

### 更改

- 🔧 重构项目结构为模块化设计
- 🔧 弹窗宽度增加到600px以适应更多内容
- 🔧 更新版本号到0.2.0

### 文档

- 📝 更新README.md，添加新功能说明
- 📝 更新API文档

---

## [0.1.0] - 2024-03-09

### 新增

- ✨ 魔棒区菜单项注册功能
- ✨ 独立弹窗系统
- ✨ ES Module 导入支持
- ✨ 自动初始化机制
- ✨ 样式注入系统

### 文档

- 📝 README 使用说明
- 📝 API 文档
- 📝 贡献指南
- 📝 扩展开发指南

### 构建系统

- 🔧 esbuild 构建配置
- 🔧 多格式输出支持 (ESM/IIFE)
- 🔧 开发模式监听

---

## 版本说明

### 版本号规则

- **主版本号 (MAJOR)**: 不兼容的 API 修改
- **次版本号 (MINOR)**: 向下兼容的功能性新增
- **修订号 (PATCH)**: 向下兼容的问题修正

### 标签说明

- `新增` - 新功能
- `更改` - 现有功能的变更
- `弃用` - 即将移除的功能
- `移除` - 已移除的功能
- `修复` - Bug 修复
- `安全` - 安全相关修复

---

## 贡献

如果你发现了 bug 或有功能建议，请在 [GitHub Issues](https://github.com/heis1696/youyou_Toolkit/issues) 中提交。

---

## 链接

- [API 文档](./API_DOCUMENTATION.md)
- [贡献指南](./CONTRIBUTING.md)
- [扩展开发指南](./EXTENSION_GUIDE.md)