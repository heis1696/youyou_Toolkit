# 填表工作台重写计划（议题 #15 修订版）

> 创建日期: 2026-05-18
> 基准议题: `PHASE3_ARCHITECTURE.md` §15 "填表工作台重写设计"
> 修订原因: 对 `Reference/shujuku-spv3.7/` 实际代码做了三路并行调研后，发现议题 #15 文档与 shujuku 实际架构有多处偏差，需要勘误并对齐到实际可参考的范式

---

## 1. 与议题 #15 文档的勘误点

| 议题 #15 文档说 | shujuku 实际代码做 | 修订决策 |
|---|---|---|
| 5 张 SQLite 表存所有状态（schemas/activation/rows/lock_state/writeback_target/isolation_state） | 只 1 张 `_acu_sheet_meta` 系统表 + N 张用户业务表；锁定/激活/隔离/写回目标/模板归档**全部走 settings + ChatMessage 自定义字段** | 不抄 5 表 migration；youyou 沿用 `storage-service` + TavernHelper 消息字段 |
| HTML table 渲染 | 实际是 `.acu-card-grid` + `.acu-data-card` + `contenteditable`（`visualizer-main-render.ts:157-219`） | v3 card-grid 方向是对的，议题 #15 文档"HTML table"为误读 |
| 模板**双**作用域（inherit_global / chat_override） | 实际**三**模式：inherit_global / chat_override / **preset_link**（+ `templateArchives` 最多 8 份历史） | 加 preset_link + archives |
| `insertRow(sheet_xxx, ["v1","v2"])` 数组语法 | 实际 `insertRow(0, {"0":"v1","1":"v2"})`：首参是 **tableIndex 0 基整数**（字典序位置）；data 是**对象**，键是**列索引字符串**；`updateRow` 只列要改的键 = 等价"null=字段不变" | DSL 语法按 shujuku 实际抄 |
| 7 步独立函数 | 集中在 `executeCardUpdateCore_ACU`（`update-orchestrator.ts:272-487`）一个函数里 | 不拆 7 个文件，按职责分块即可 |
| 隔离用 SQL WHERE chat_id = ? | 实际**整库销毁重建**（切 chat 换 isolationKey 时 `disposeStorageProvider`），SQLite 是单 chat 单 isolationKey 的内存工作集 | youyou 不引入 SQLite Provider 改造数据层，沿用对象分桶 |

---

## 2. shujuku 真实存储分层（这是 youyou_Toolkit 要对标的架构）

```
localStorage settings_ACU
├─ tableUpdateLocks[`${chatKey}::${isolationKey}`][sheetKey]   ← 三级锁
│     = { rows: number[], cols: number[], cells: string[] }
├─ specialIndexLocks                                            ← 索引列锁（纪要表专用，可省）
└─ dataIsolationEnabled / dataIsolationCode                     ← isolationKey 配置

chat[0] 消息.TavernDB_ACU_ScopedConfig                          ← chat 级覆盖容器
├─ template[isolationKey]                                       ← 模板三模式
│     = { mode, presetName?, templateStr?, guideData, ... }
└─ templateArchives[isolationKey]                               ← 历史快照（最多 8 份）

每条消息.TavernDB_ACU_IsolatedData[isolationKey].independentData
└─ [sheet_xxx]: Sheet 数据                                      ← 实际表数据，按 isolationKey 分桶

SQLite (sql.js 内存)                                            ← 仅工作集镜像，不是状态本体
└─ _acu_sheet_meta + 用户业务表
```

**关键认知**：shujuku 的 SQLite 不是状态本体，是为了用 SQL 操作内存数据集才做的镜像。所有持久化状态在 settings + ChatMessage 自定义字段里。**youyou_Toolkit 不引入 SQLite 也能完整对标**。

---

## 3. Sheet 数据结构（精确定义）

来自 `shared/models/table-data.ts:58-68`：

```ts
interface Sheet_ACU {
  uid: string;                     // 真正 ID（脱离 sheet_xxx 容器 key）
  name: string;                    // 中文显示名
  content: (string | null)[][];    // 严格 string | null
                                   //   content[0][0] 固定 = 'row_id'
                                   //   content[0][1..] = 列名
                                   //   content[i>=1] = 数据行
  sourceData: {                    // ← AI 操作的 5 段指令在这
    note: string;                  //   表说明
    initNode: string;              //   初始化指令
    insertNode: string;            //   新增指令
    updateNode: string;            //   更新指令
    deleteNode: string;            //   删除指令
    ddl?: string;                  //   可选 SQLite DDL（youyou 不需要）
  };
  updateConfig: {
    uiSentinel: number;            //   sentinel 值（-1 = 沿用全局, 0 = 禁用）
    contextDepth: number;          //   往前看几条消息
    updateFrequency: number;       //   每 N 条消息触发一次
    batchSize: number;             //   一次处理几张表
    skipFloors: number;            //   跳过最近 N 层
  };
  exportConfig: {                  //   worldbook 注入相关（youyou 用 wrapper 模型，可大幅简化）
    enabled: boolean;
    entryName, entryType, keywords, ...
    injectionTemplate, position, depth, order, ...
    extraIndex 配置（额外索引条目）
  };
  orderNo: number;                 // 排序号
  seedRows?: (string | null)[][];  // 运行时附加：来自 SheetGuide 的种子行（不持久化）
}
```

**约定要点**：
- 单元格类型**严格** `string | null`（连数字都强制 toString）
- 表 ID 双层：**容器 key** `sheet_xxxx`（字典序索引来源） + **表 uid**（脱离 key 的真正 ID）
- `seedRows` 是运行时合并产物，从 SheetGuide 注入到 `content[0]`/`updateConfig` 不存在时的兜底初值

---

## 4. AI DSL 完整语法（精确版）

```
<tableEdit>
insertRow(0, {"0":"张三","1":"50","2":"正常"})
updateRow(0, 3, {"1":"60"})                       // 只列要改的键，等于 "null=字段不变"
deleteRow(0, 3)
</tableEdit>
```

- **首参**：tableIndex（**0 基整数**），等于 sheet 字典序排列后的位置，**不是 uid 也不是 name**
- **rowIndex**：**0 基**（不含表头），等于 `table.content[rowIndex + 1]`
- **data 对象**：键是**列索引字符串**（`"0"`, `"1"`, ...，0 基），**不是字段名**
- `insertRow` 允许 sparse：缺的列补 `""`
- 只支持 `insertRow / updateRow / deleteRow`，**不支持** `renameSheet / insertColumn / renameColumn`
- `<tableEdit>` 标签可缺失，回退识别 `<!-- insertRow(...) -->` 注释格式

**parser 三层降级**（已在 `table-json-sanitizer.js` 实现）：
1. 预清洗（去字符串拼接、全角冒号、`\\n`、外层单引号）
2. 指令重组（拆分挤一行的 op、跨行 JSON 块）
3. JSON 清洗五层管线（normalizeQuotes / escapeUnescapedQuotes / sanitizeControlChars / removeTrailingCommas / fixNumericKeys）
4. 松散对象兜底（coerceLooseRowObject）
5. 失败时**单行跳过 + warn**（不整批废）

---

## 5. 7 步编排关键语义

| 步骤 | shujuku 实现 | youyou 当前状态 |
|---|---|---|
| **buildBatchMergeBase** | 优先用 chat `sheetGuide`，否则模板 | 单源 (`targetSnapshot.tableState`)，无"指导表覆盖"分支 |
| **loadBatchBaseData** | **倒序遍历** `chatHistory[firstMessageIndex-1..0]` 找最近带数据的消息 | 单点读当前 slot，无 fallback |
| **prepareAIInput** | 自定义紧凑文本 `[idx:name]` + `Columns: [i:列名]` + Note/Trigger + 最近 N 行 | 走 toolConfig 通用 prompt，格式不对 |
| **callAI** | `charCardPrompt` 8 段模板（含 `<thought>` prefill）+ **3 次重试 + 5s 退避** | 单次调用，无重试 |
| **parseTableEdits** | `extractTableEditInner_ACU` + 三层降级 | sanitizer 已实现，但**主链 parsePatch 没接通** |
| **applyEdits** | **按 AI 原始顺序** + 锁矩阵检查 | 重排成 `update → insert → delete 倒序`（bug） |
| **writeback+sync** | 写入 `chat[N].TavernDB_ACU_IsolatedData[isoKey].independentData[sheetKey]` + lorebook | 走 message.data，未按 isolationKey 分桶 |

**重填 clearBeforeUpdate 三段式**（议题 #15 C1/C2 bug 根因，shujuku 实现，youyou 完全没有）：
1. `clearTableDataAtFloors_ACU` 清空目标楼层数据
2. `loadAllChatMessages_ACU` 重读宿主消息
3. `reloadStorageProvider`（SQLite 模式必须重建内存数据库实例）→ `refreshData`

---

## 6. youyou_Toolkit 完整 Gap 表

### 数据层

| 维度 | youyou 现状 | Gap |
|---|---|---|
| Sheet 数据结构 | `table-types.js` 仅定义枚举 | 缺：完整 Sheet 接口 |
| isolationKey 维度 | 不存在 | 必加：隔离/锁/模板/seedRows 共同基座 |
| chat[0] ScopedConfig 容器 | 不存在 | 必加：模板 chat 级 override + archives 的存储位置 |
| 三级锁粒度 | `table-lock-service.js` 仅 cellHash 单维度 | 重写：行/列/单元格 + scopeKey 复合 `${chat}::${iso}` |
| 模板作用域 | 全局库 only | 加 chat_override + preset_link + archives |
| seedRows 种子机制 | Guide 只是文本 | 加二维数组 seedRows merge 到 content[0] |
| sourceData 5 段指令 | 当前 Schema 只有列定义 | 加 note/initNode/insertNode/updateNode/deleteNode |
| updateConfig | 当前 Schema 没这层概念 | 加 contextDepth/updateFrequency/batchSize/skipFloors + sentinel 值 (-1=沿用, 0=禁用) |

### AI 链

| 维度 | youyou 现状 | Gap |
|---|---|---|
| **parser 主链接通** | `parsePatch` 只走全量 JSON，未调 `parseIncrementalEdits` | **一行修复**（最高价值） |
| **applyEdits 顺序** | `sortEdits` 重排成 update→insert→delete | 删 sortEdits，按 AI 原始顺序 |
| loadBaseData 倒序遍历 | 单点读 slot | 改倒序遍历 chatHistory |
| 重填三段式 | 不存在 | 加 clearBeforeUpdate 路径 |
| 重试循环 | 单次调用 | 3 次重试 + 5s 退避 + tableEdit 缺失门控 |
| prompt 格式 | 走 toolConfig 通用 prompt | 改紧凑文本 `[idx:name]` 风格 |
| `<tableEdit>` 标签门控 | 无 | 缺则抛错触发重试 |

### UI 层

| 维度 | v3 预览状态 | Gap |
|---|---|---|
| card-grid 方向 | ✓ 跟 shujuku 一致 | 不改 |
| 数据 mode | ✓ | 不改 |
| 结构 mode | 仅字段列表 | 补 sourceData 5 段 textarea / updateConfig sentinel 输入 / exportConfig（可简化版） |
| **全局注入** mode | 缺第 3 个 mode-switch | 加（shujuku 实际很轻，placement 配置） |
| 保存按钮 | 单一"保存" | 拆"保存到聊天 / 保存到全局"双档 |
| Sidebar 操作 | 仅删除 | 加上移/下移 |
| 模板预设指示器 | 顶栏缺 | 加"当前生效预设"chip |
| AI 改表助手 dock | 议题 #15 决策不抄 | 不做（初版） |

---

## 7. 修订后任务清单（19 项；v1.0.170 已完成 15 项）

进度状态（更新于 2026-05-18 v1.0.170 发布）：

```
✓ Stage 0 前置
├─ ✓ #27 写本文档 (v1.0.169)
│   └─ ✓ #6  写 docs/TABLE_ACCEPTANCE_TESTS.md (v1.0.169)
│
Stage 1 数据
├─ ✓ #17 重写 table-types.js (v1.0.169)
│   ├─ ✓ #22 新建 table-isolation-service.js (v1.0.169)
│   │   ├─ ✓ #25 新建 table-chat-scope-service.js (v1.0.169)
│   │   ├─ 🔲 #16 重写 table-schema-service.js (1376 行最大风险，待 v1.0.171+)
│   │   ├─ ✓ #9  重写 state + history 按 isolationKey 分桶 (v1.0.170)
│   │   ├─ ✓ #18 重写 table-template-service.js 三模式 (v1.0.170)
│   │   └─ ✓ #14 重写 table-lock-service.js 四级锁 (v1.0.169)
│
Stage 2 AI（4 个低耦合修复 + writeback 加固）
├─ ✓ #21 parsePatch 接通 + 删 sortEdits（议题 #15 最核心，v1.0.169）
├─ ✓ #26 callAI 3 次重试 + 5s 退避 + tableEdit 门控（v1.0.169）
├─ ✓ #23 clearBeforeUpdate 重填三段式 (修 C1/C2，v1.0.170)
├─ ✓ #24 loadBaseData 倒序遍历 (合并到 #9，v1.0.170)
├─ ✓ #19 worldbook 同步 chat 隔离加固 (修 A2，v1.0.170)
└─ 🔲 #8  整理 7 步骨架到 update-orchestrator.js（命名/拆分清理，不阻塞主路径）
│
Stage 3 UI
├─ ✓ #7  更新预览加全局注入 mode（v1.0.169）
├─ ✓ #10 工具台窗口（v1.0.170）
├─ 🔲 #11 数据编辑器窗口（含全局注入 + sourceData 5 段 + 双档保存）— v1.0.170 仅占位 toast
└─ ✓ #13 瘦身 panel 为 launcher（v1.0.170）
│
Stage 4
└─ 🔲 #12 build + 7 项 acceptance 验收
```

★ = 因 shujuku 调研发现而新增/重定向的任务

---

## 8. 优先级与起步建议

**v1.0.170 → v1.0.175 hotfix 期间发现并已修的隐藏 bug**（不在原任务清单内的回归）：

| Hotfix | 现象 | 根因 | 修复版本 |
|---|---|---|---|
| H1 | 工作台从浮窗回归 popup tab 内联 | preview 里 .win 容器被误读为独立浮窗，实际是 popup tab 内展示区 | v1.0.171 |
| H2 | 所有工具配置面板 chips 渲染丢失 | 旧 1441 行 panel 顶部 import TOOL_CONFIG_PANEL_STYLES 并通过 getStyles() 注入；瘦身重写时丢了这个注入路径 | v1.0.172 |
| H3 | 工作台下拉框白框白字 + 填表行为超出深色 | .yyt-tww-ctrl 没 !important 被全局 select reset 覆盖；.yyt-tww 自带 background 跟父容器深浅冲突 | v1.0.173 |
| H4 | 表格概览行数永远是 0 | tablesPreview 读模板 schema 的 rows（永远空）而非 slot 实际 runtime tables | v1.0.174 |
| H5 | 填表 AI 调用成功但表格没数据 + 世界书无条目 | sanitizeAIResponse 把 `{tables:[...]}` envelope 当 tables 字段嵌套传递，normalize 失败 → slot 被覆盖成空 | v1.0.175 |

**v1.0.170-175 hotfix 期间新发现的功能缺口**（需纳入剩余规划）：

| 新缺口 | 关联 task | 说明 |
|---|---|---|
| **写回世界书是新功能不是预设延伸** | #30（新） | "世界书预设"=注入 prompt 的内容，多模块共用；"同步到世界书"=填表结果写回为条目，**完全新功能**。需要 targetBook 选择 + wrapper 配置 + placement 三件套 UI |
| **默认模板缺 DSL prompt 指示** | #31（新） | shujuku 旧模板用 JSON envelope 输出，无法走议题 #15 #21 的 incremental DSL 路径。默认 prompt 需写明 `<tableEdit>` DSL 格式让 AI 优先用增量 |
| **数据编辑器是 v1.0.170 后用户最大体验断裂** | #11 | 旧 panel 的 drawer 删了之后，用户**完全无法手动编辑表行/字段/单元格**。期间只能让 AI 填，不能改 |
| **schema-service 仍是旧模型** | #16 | 1376 行 schema 没按 Sheet content[][] + sourceData 5 段重写。模板编辑器无法暴露这些抽象 |

---

**剩余 6 项任务（按推荐执行顺序）**：

**P0 用户体感最大**：
- **#11 数据编辑器窗口** — 旧 drawer 删了之后用户无法手动改数据，必须先做（即使 schema 没重写也能做基础 cell 编辑）
- **#30 写回世界书 UI** — 工作台「填表行为」section 补 targetBook + wrapper 配置（约 80-120 行新 UI）

**P1 主链最终对齐**：
- **#31 默认模板加 DSL prompt** — 让 AI 走 incremental 而不是 full envelope（增量更精确）
- **#16 schema-service 重写**（1376 行最大风险，按 Sheet 模型 + sourceData 5 段 + updateConfig sentinel + 索引列锁等）。完成后 v3 预览的"结构配置"/"全局注入"两 mode 才能完整接入

**P2 收尾**：
- **#8 orchestrator 整理**（命名约定 `table-update-orchestrator.js` + 内部 7 步拆函数。功能上已对齐，仅命名/拆分清理）
- **#12 build + 7 项 acceptance 验收**（议题 #15 sign-off 关闭前置）

---

**策略**：暂停发版 + 测试，集中做 #11 + #30 + #31 + #16，等功能大致完成（v1.0.176 一次发版）再统一测。否则零碎 hotfix 测试浪费精力。

---

## 9. 关键设计决策记录（sign-off 项）

| # | 决策 | 理由 |
|---|---|---|
| D1 | 不抄 shujuku 5 张 SQLite 表，沿用 storage-service + TavernHelper 消息字段 | shujuku 实际也不靠 SQLite 存状态；议题 #15 文档勘误 |
| D2 | v3 card-grid 方向不改 | UI agent 调研确认 shujuku 实际就是 card-grid |
| D3 | 模板支持三模式 (inherit_global / chat_override / preset_link) + archives 最多 8 份 | shujuku 实际架构 |
| D4 | DSL 语法按 shujuku 实际：tableIndex 整数 + 列索引字符串对象 | 议题 #15 文档语法描述错误 |
| D5 | **修订（v1.0.176 重新评估）**：表格数据接入 IToolDataProvider 双轨。原 D5 误读 shujuku 调研结论 — shujuku 不抄 5 张系统表 ≠ youyou 不接入 Provider。议题 #9 + #15 §J 原意：表格行数据走 IToolDataProvider（Authority SQLite 装了用 SQL / 没装走 Fallback JSON+迷你 SQL 解释器）。clean slate 不做旧 ChatMessage 数据迁移（议题 #15 §I 用户已确认无生产数据）。 | shujuku 1 表 + ChatMessage 字段方案虽稳定但绕开了议题 #9 双轨设计，Authority 用户装了用不上 |
| D6 | 不抄 AI 改表助手 dock（议题 #15 已认） | 1063 行独立模块，初版不抄 |
| D7 | 不抄 DDL / 索引列特锁 / 多 placement 配置 | 纪要表/SQLite 专用，youyou 不需要 |
| D8 | 加全局注入 mode（v3 预览补） | 议题 #15 三模式之一，shujuku 实际内容很轻 |
| D9 | parsePatch 接通 + 删 sortEdits 是单独最高价值修复 | 一个文件 ~20 行改动就能对上 AI 链 80% 能力 |

---

## 10. Acceptance Tests 参考清单（在 TABLE_ACCEPTANCE_TESTS.md 中详写）

7 个旧 bug（来自议题 #15 + memory `project_table_workbench_gaps.md`）：

| Bug | 现象 | shujuku 解决方式 |
|---|---|---|
| A1 | 切 chat 写回目标不变 | 写入按 chatId 主键，切 chat 自然换 |
| A2 | 世界书条目跨 chat 污染 | entry comment 必带 `[YY:chatId={id}]`，sync 严格 WHERE chatId |
| A3 | 空 chat 看到其他数据 | 数据挂在每条消息上，无消息自然空 |
| B1 | 第一张表被替换 | "当前激活表"是 UI 状态不存数据，列表按 orderNo 排序 |
| B2 | 两个纪要表 | sheet uid PRIMARY KEY 防重，创建前 SELECT 检查 |
| C1 | 重填工具台数据丢 | clearBeforeUpdate 三段式（清空→重读→refreshData） |
| C2 | 重填行数没增加 | 同 C1 + parser 主链接通 + applyEdits 按 AI 原始顺序 |

---

## 11. 相关文档

- `PHASE3_ARCHITECTURE.md` §15 — 原始议题决策（部分需勘误，本文档为修订）
- `PANEL_LAYOUT_AUDIT.md` — Flat Flow 设计规范
- `TABLE_ACCEPTANCE_TESTS.md` — 7 bug 复现步骤 + 验收标准（task #6 待写）
- `Reference/shujuku-spv3.7/` — 对标参考实现
- `D:/Projects/yyt-style-preview/preview-table-data-editor.html` — v3 数据编辑器 UI 预览
- `D:/Projects/yyt-style-preview/preview-table-workbench.html` — v3 工具台 UI 预览
