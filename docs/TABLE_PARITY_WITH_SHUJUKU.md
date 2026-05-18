# youyou v1.0.193 vs shujuku-spv3.7 填表能力对比

> 创建日期: 2026-05-18
> 关联文档: `TABLE_REWRITE_PLAN.md` / `TABLE_ACCEPTANCE_TESTS.md` / `CHANGELOG.md`
> 状态: 议题 #15 sign-off 后的差距盘点，用于规划 v1.1 增强方向

---

## 1. 调研背景

议题 #15 v1.0.193 主链稳定后，盘点 youyou 当前实现 vs shujuku-spv3.7（位于 `Reference/shujuku-spv3.7/`）的填表能力差距。**只列差距，不列已对齐项**。

---

## 2. 已对齐项（18 项核心能力）

- AI 链 7 步编排骨架（buildBatchMergeBase → loadBaseData → prepareAIInput → callAI → parseTableEdits → applyEdits → writeback+sync）
- INCREMENTAL DSL parser（insertRow/updateRow/deleteRow）+ JSON envelope fallback
- JSON 五层清洗管线（normalizeQuotes / escapeUnescapedQuotes / sanitizeControlChars / removeTrailingCommas / fixNumericKeys）+ 单行跳过
- 3 次重试 + 5s 退避 + `<tableEdit>` 缺失门控
- clearBeforeUpdate 重填三段式
- isolationKey 桶 + chat[0] scope 容器
- 三模式模板（inherit_global / chat_override / preset_link）
- 模板归档 UI（最多 8 份）
- 4 级锁后端（row / column / cell / index_column）
- 列 key 位置映射（direct / index / col_n / fallback）
- 模板格式适配器架构（youyou + shujuku importer/exporter）
- 单表激活/禁用 toggle（tableEnabledOverrides）
- 工作台范围控制（all / selected / current）+ stale fallback
- chat 隔离 + 切换不污染（worldbook comment `[YY:chatId=...]`）
- 写回世界书 UI（默认角色卡 primary lorebook）
- loadBaseData 倒序遍历 chatHistory
- applyEdits 按 AI 原始顺序（删除了旧 sortEdits bug）
- 多旧格式兼容（TavernDB_ACU_*）

---

## 3. 缺失项（按用户价值优先级）

### 🔴 高优先级

#### G1. 数据编辑器 config mode 可编辑 UI

| 项 | 内容 |
|---|---|
| **shujuku 实现** | `Reference/shujuku-spv3.7/src/presentation/pages/visualizer-main-config.ts` (649 行) |
| **shujuku 能力** | 1. sourceData 5 段 textarea（note/initNode/insertNode/updateNode/deleteNode）；2. updateConfig 7 参数（contextDepth/updateFrequency/batchSize/groupId/skipFloors/sendLatestRows/表级 API 预设）；3. DDL 编辑（SQLite 专用）；4. 表头列定义增删改名；5. exportConfig 完整 UI（注入/独立/按行/关键词/模板/placement/额外索引）；6. 特殊表配置（纪要表索引列特锁 / 固定条目位置） |
| **youyou 现状** | `modules/ui/components/table-data-editor-window.js` 的 schema mode（:551-584）**只读展示** + 提示"待 #16 后接入"；global mode（:586-594）完全是占位 toast |
| **影响** | 用户**无法**修改表的 AI 操作指令、更新参数、世界书注入配置。只能通过导入/导出模板 JSON 手动编辑 |
| **工作量** | ~500-600 行新 UI 代码 |
| **是否值得做** | **强烈推荐**。日常调参最频繁的入口。当前 youyou 的 schema/global mode 形同虚设 |

#### G2. per-table 自动更新调度（updateConfig 接入验证）

| 项 | 内容 |
|---|---|
| **shujuku 实现** | `Reference/shujuku-spv3.7/src/service/table/update-scheduler.ts` (336 行) |
| **shujuku 能力** | 每张表独立 updateFrequency / contextDepth / skipFloors / batchSize / groupId；`buildAutoUpdatePlan_ACU` 遍历所有表按各自频率判断；同 groupId 合并、不同 groupId 并行；楼层增加延迟；updateFrequency=0 禁用单表 |
| **youyou 现状** | `tool-automation-service.js` 有自动触发机制，`table-update-service.js:22` 有 `runAutoTableUpdate` 导出，但**per-table 调度参数（-1/0/N）是否正确传递到自动触发链路未验证**。盲区 1 |
| **影响** | 如果 per-table 参数未接入，shujuku 模板中精细的 updateConfig 全部被忽略 |
| **工作量** | 100-200 行（如未接入），或仅验证（如已接入） |
| **是否值得做** | **强烈推荐**。盲区 1 必测项 |

#### G3. AI 改表助手 dock（Template Assistant）

| 项 | 内容 |
|---|---|
| **shujuku 实现** | `Reference/shujuku-spv3.7/src/service/template-assistant/` (service.ts 1242 行 + compiler.ts + reference-docs.ts) + `visualizer-template-assistant.ts` (1063 行) + apply + addon |
| **shujuku 能力** | 自然语言驱动模板修改；多轮自修复迭代；11+ 种结构化操作（add_sheet / rename_sheet / patch_sheet_*）；diff 摘要 + 高风险确认；session guard（切表失效）；portal 模式（小屏全屏/大屏侧边） |
| **youyou 现状** | **完全没有**。议题 #15 D6 决策初版不抄 |
| **影响** | 用户无法用自然语言（"新增一张战利品表"/"把纪要表更新频率改成 3"）批量修改模板结构 |
| **工作量** | ~2500-3000 行（service + compiler + UI） |
| **是否值得做** | shujuku **最大独占功能**。议题 #15 D6 已认不抄，作为 v1.1 增强 **优先级最高**但工作量也最大 |

---

### 🟡 中优先级

#### M1. 数据编辑器锁定 UI 交互

| 项 | 内容 |
|---|---|
| **shujuku 实现** | `visualizer-main-render.ts` 行/列/cell 锁按钮 + 纪要表索引列特锁 + `.acu-locked-field` 视觉反馈（:173-199） |
| **youyou 现状** | `table-lock-service.js` 4 级锁后端已实现，**前端未接入**。data mode 卡片只有 cell 编辑 + 加删行（:498-549） |
| **影响** | 用户无法手动锁定行/列/cell 防止 AI 误覆盖，锁定只在 AI 链静默生效 |
| **工作量** | ~150-200 行 UI |
| **是否值得做** | **推荐**。锁定是防 AI 误覆盖的关键交互 |

#### M2. 模板预设 UI 完整度

| 项 | 内容 |
|---|---|
| **shujuku 实现** | `template-preset-ui.ts` (272 行) + `template-preset-service.ts` (462 行) |
| **shujuku 能力** | 全局预设 + chat 级预设双 select；chat scope 状态文字描述（inherit_global / chat_override / preset_link）；本地聊天快照自动填入；导入验证（`parseImportedTemplateData_ACU`）；导出 JSON；唯一名生成 |
| **youyou 现状** | `table-template-service.js` 三模式解析（:1-89）已有；`table-template-panel.js` 模板列表 UI 已有。**缺**：chat 级预设 select、scope 状态文字描述、导入结构验证、导出功能 |
| **影响** | 用户看不到当前 chat 的模板来源（全局还是 chat 专属），无法导出分享 |
| **工作量** | ~200 行 |
| **是否值得做** | **推荐**。模板归档 UI 已接入但需要 chat_override / preset_link 触发，没有 UI 入口归档列表永远是空 |

#### M3. Sidebar 表顺序操作

| 项 | 内容 |
|---|---|
| **shujuku 实现** | `visualizer-sidebar.ts` (191 行) 上移/下移 + 新增表（prompt 命名 + 默认值）+ 删除表（确认 + deletedSheetKeys 追溯清除聊天记录）+ 表索引显示 `[0][1][2]` |
| **youyou 现状** | `table-data-editor-window.js` sidebar（:452-473）只显示表名 + 行数计数 |
| **影响** | 用户无法在编辑器中调整表顺序或增删表，只能通过导入模板 |
| **工作量** | ~120 行 |
| **是否值得做** | **推荐**。跟 G1 config mode 一起做更顺手 |

#### M4. sendLatestRows 参数（发送最新 N 行）

| 项 | 内容 |
|---|---|
| **shujuku 实现** | `visualizer-main-config.ts:197-199` -1=全部 / 0=沿用全局 / 1+=仅 N 条；纪要表固定 10 条 |
| **youyou 现状** | `table-update-service.js` buildRequest **未见 sendLatestRows 裁剪逻辑** |
| **影响** | 大表（50+ 行）的 prompt 包含全部行数据，浪费 token 可能超上下文窗口 |
| **工作量** | ~50 行（buildRequest 加裁剪逻辑） |
| **是否值得做** | **推荐**。直接 token 成本影响 |

#### M5. disposeStorageProvider 生命周期钩子

| 项 | 内容 |
|---|---|
| **shujuku 实现** | `table-storage-strategy.ts` (195 行) 完整 Provider 生命周期：dispose / reload / switchMode / init |
| **youyou 现状** | 不引入 SQLite（D1/D5 决策），`clearStateAtMessageIndex` + `loadBoundStateOrTemplate` 实现了"清空→重读"等价语义。但**无显式 dispose/reinit 钩子** |
| **影响** | 切 chat 时如果旧数据残留理论上可能瞬态不一致。实测未出问题（依赖 isolationKey 切换） |
| **工作量** | ~50 行 |
| **是否值得做** | **可选**。防御性编程，无明显 bug 不急 |

---

### 🟢 低优先级

#### L1. 保存到聊天/保存到全局 双档保存
- shujuku visualizer.ts:109 两个按钮分别保存到当前聊天和全局
- youyou 只有"保存"按钮（到 slot）
- 工作量 ~30 行
- 跟 G1 捆绑实现才有意义

#### L2. 多 placement worldbook 注入配置 UI
- shujuku 每表独立 entryPlacement / extraIndexPlacement / fixedEntryPlacement / fixedIndexPlacement
- youyou 后端有 placement 概念，UI 未暴露（global mode 是占位）
- 跟 G1 捆绑实现

#### L3. 表级 API 预设覆盖（tableApiPresetOverridesByName）
- shujuku `update-orchestrator.ts:31-37` 按表名查 settings_ACU.tableApiPresetOverridesByName
- youyou 未确认实现
- 高级用户需求

#### L4. 主题系统（4 套内置主题）
- shujuku 有 classical-ink / classical-silk / default-dark / default-light
- youyou 跟随 SillyTavern 宿主主题
- **不做**：纯装饰差异

#### L5. SQL Console 诊断面板
- **不做**：youyou 不使用 SQLite（D1 决策）

#### L6. 内容优化 UI（optimization-ui 系列）
- **不做**：超出 youyou 工具箱定位

---

## 4. Top 3 推荐推进顺序

| # | 任务 | 工作量 | 价值 |
|---|---|---|---|
| **1** | **G1 数据编辑器 config mode 可编辑 UI** + 捆绑实现 M1（锁定 UI）+ M3（sidebar 操作）+ L1（双档保存）+ L2（placement UI） | ~800-900 行 | 用户日常调参核心入口 |
| **2** | **G2 per-table 自动更新调度验证 + 接入**（盲区 1） | ~150 行（如需要） | 让模板精细配置生效 |
| **3** | **G3 AI 改表助手 dock**（v1.1 大功能） | ~2500-3000 行 | shujuku 最大独占功能，议题 #15 D6 已认 |

**建议节奏**：
- v1.1（短期）：Top 1 + Top 2 ≈ 1000 行
- v1.2（中期）：M2（模板 UI 完整度）+ M4（sendLatestRows）≈ 250 行
- v2.0（长期）：Top 3 AI 改表助手

---

## 5. 关联文档

- `TABLE_REWRITE_PLAN.md` — 议题 #15 设计 + 9 项决策 D1-D9
- `TABLE_ACCEPTANCE_TESTS.md` — 7 + 11 项 acceptance 全 Verified
- `CHANGELOG.md` — v1.0.171-193 完整流水线
- `Reference/shujuku-spv3.7/` — 对标参考实现
