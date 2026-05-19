# AI 改表助手实现计划

基于 shujuku-spv4.2.2 `template-assistant` 模块的逆向调研，适配 youyou_Toolkit 的数据模型和架构。

---

## 一、shujuku vs youyou 关键差异

| 维度 | shujuku | youyou | 影响 |
|---|---|---|---|
| 表数据模型 | `Sheet.content[][]` (2D 数组，positional) | `Table.columns[] + Table.rows[].cells{}` (keyed) | 操作协议改用 columnKey 而非 columnName/colIndex |
| AI 指令 | `sourceData: { note, initNode, insertNode, updateNode, deleteNode }` | `aiInstructions: { init, create, update, delete }` + `note` | 字段名映射 |
| 列定义 | header row `content[0]` (纯字符串) | `Column { key, title, description, type, required }` | 增列/改列操作需要处理更丰富的列属性 |
| 行标识 | `content[i][0]` = row_id (自动生成) | `Row { id, name, cells: { [columnKey]: value } }` | 行操作用 row.id 或 row.name 定位 |
| 锁存储 | per-sheet `SheetLockState { rows, cols, cells }` (index-based) | per-scope `table-lock-service.js` (rowIndex + columnKey based) | 操作协议对齐 youyou 的锁 key 格式 |
| 导出配置 | `exportConfig` 在 sheet 内 | `Table.exportConfig` 在 table 内 + 全局 `wrapperConfig` | 操作范围略有不同 |
| API 调用 | `callAIWithPreset_ACU(messages, preset)` | `sendWithPreset(presetName, messages, ...)` 或 `sendApiRequest()` | 接口签名不同，但能力等价 |
| 编辑沙盒 | `_acuVisState.tempData` (visualizer 内可变) | `config.tables` 从 storage 加载 | 需要一个临时沙盒层 |
| UI 框架 | jQuery 内联 HTML 构建 | youyou popup-shell + controls prefab | UI 实现方式完全不同 |
| DDL/SQL | 有 SQLite DDL 系统 | 无 | **大幅简化**，不需要 DDL 操作 |

**结论：核心架构（操作协议 + 编译器 + 多轮会话 + fingerprint 防过期 + 高风险确认）可以直接复用思路，但操作协议需要重新设计适配 youyou 的 keyed 数据模型。DDL/SQL 相关的复杂度可以完全省掉。**

---

## 二、模块划分

```
modules/table-engine/
  table-assistant-types.js      ~150行  操作类型、draft shape、编译结果类型
  table-assistant-compiler.js   ~600行  操作编译器（校验 + 应用 + diff）
  table-assistant-service.js    ~500行  prompt 构造、AI 调用、draft 解析、多轮 session
  table-assistant-ui.js         ~400行  UI 面板（聊天式交互 + diff 展示 + 高风险确认）
```

总预估 ~1650 行源码（不含测试），约为 shujuku 的 42%。主要缩减来自：
- 无 DDL/SQL → compiler 和 prompt 大幅简化
- 无 reference-docs 嵌入 → prompt 自包含
- youyou controls prefab → UI 代码量减少
- 无 fullscreen-overlay / portal 模式 → 响应式代码省掉

---

## 三、操作协议设计

### Draft 格式

```jsonc
{
  "protocolVersion": 1,
  "mode": "modify_current_workbench_incremental",
  "baseFingerprint": "hash-of-current-config",
  "summary": "新增了一张战利品表，禁用了背包物品表的独立导出",
  "warnings": [],
  "operations": [ /* ... */ ]
}
```

### 操作列表（V1，10 种）

| op | 必填字段 | 作用 |
|---|---|---|
| `add_table` | `name, columns[]` | 新增表 |
| `rename_table` | `tableId, newName` | 重命名表 |
| `delete_table` | `tableId` | 删除表 |
| `move_table` | `tableId, beforeTableId \| afterTableId` | 移动表顺序 |
| `patch_table_ai_instructions` | `tableId, patch: { note?, init?, create?, update?, delete? }` | 改 AI 指令 |
| `patch_table_columns` | `tableId, patch: { addColumns[], renameColumns[], deleteColumns[] }` | 改表结构 |
| `patch_table_rows` | `tableId, patch: { updateCells[], addRows[], deleteRowIds[] }` | 改数据行 |
| `patch_table_export_config` | `tableId, patch: { ... }` | 改导出配置 |
| `patch_table_locks` | `tableId, patch: { rows[], columns[], cells[] }` | 改锁 |
| `patch_workbench_config` | `patch: { runScope?, contextDepth?, sendLatestRows?, ... }` | 改工作台全局设置 |

### 各操作详细规格

#### 1. add_table

```jsonc
{
  "op": "add_table",
  "name": "战利品表",
  "note": "记录剧情中获得的战利品",
  "columns": [
    { "title": "物品名称", "type": "text" },
    { "title": "数量", "type": "number" },
    { "title": "描述", "type": "text" }
  ],
  "aiInstructions": {
    "init": "当剧情中明确存在初始战利品时初始化",
    "create": "出现新战利品时新增",
    "update": "已有战利品数量或状态变化时更新",
    "delete": "战利品被完全消耗或移除时删除"
  },
  "insertAfterTableId": "inventory"  // 可选，默认末尾
}
```

compiler 行为：
- 生成唯一 `table.id` 和各 `column.key`
- 填充默认 `exportConfig`
- 填充默认 `aiInstructions`（如未提供）
- `focusTableId` 指向新表

#### 2. rename_table

```jsonc
{
  "op": "rename_table",
  "tableId": "table_abc",
  "newName": "角色状态表"
}
```

#### 3. delete_table

```jsonc
{
  "op": "delete_table",
  "tableId": "table_abc"
}
```

**高风险**：需用户确认。

#### 4. move_table

```jsonc
{
  "op": "move_table",
  "tableId": "table_abc",
  "beforeTableId": "table_xyz"  // 或 "afterTableId"
}
```

#### 5. patch_table_ai_instructions

```jsonc
{
  "op": "patch_table_ai_instructions",
  "tableId": "table_abc",
  "patch": {
    "note": "新说明",
    "init": "新初始化指令",
    "create": "新新增指令",
    "update": "新更新指令",
    "delete": "新删除指令"
  }
}
```

只允许 patch 5 个字段，严格校验。

#### 6. patch_table_columns

```jsonc
{
  "op": "patch_table_columns",
  "tableId": "table_abc",
  "patch": {
    "renameColumns": [
      { "columnKey": "location", "newTitle": "所在位置" }
    ],
    "addColumns": [
      { "title": "备注", "type": "text" }
    ],
    "deleteColumns": ["old_column_key"]
  }
}
```

compiler 行为：
- renameColumns：更新 `column.title`，同时更新所有 rows 的 cells key 映射
- addColumns：生成 `column.key`，所有现有 rows 补空值
- deleteColumns：移除 column，同时从所有 rows.cells 中删除对应 key
- **高风险**（结构变更）

**注意：与 shujuku 的关键区别** — youyou 用 columnKey 而非 columnName 定位列，rename 只改 title 不改 key，所以不存在列引用断裂问题。

#### 7. patch_table_rows

```jsonc
{
  "op": "patch_table_rows",
  "tableId": "table_abc",
  "patch": {
    "updateCells": [
      { "rowId": "row_1", "columnKey": "location", "value": "东京" }
    ],
    "addRows": [
      { "cells": { "location": "京都", "time_span": "下午" } }
    ],
    "deleteRowIds": ["row_3", "row_5"]
  }
}
```

compiler 行为：
- updateCells：按 rowId 定位行，按 columnKey 定位列，校验存在性
- addRows：生成 row.id 和 row.name，追加到 table.rows
- deleteRowIds：按 id 删除行

**注意：用 rowId 而非 rowNumber** — youyou 的行有稳定 id，比 shujuku 的 1-based 行号更可靠。

#### 8. patch_table_export_config

```jsonc
{
  "op": "patch_table_export_config",
  "tableId": "table_abc",
  "patch": {
    "enabled": true,
    "entryName": "战利品注入",
    "entryType": "constant",
    "injectionTemplate": "<战利品>\n{{content}}\n</战利品>"
  }
}
```

严格 patch：只允许 `exportConfig` 中真实存在的字段。

#### 9. patch_table_locks

```jsonc
{
  "op": "patch_table_locks",
  "tableId": "table_abc",
  "patch": {
    "rows": [
      { "rowIndex": 0, "locked": true }
    ],
    "columns": [
      { "columnKey": "location", "locked": true }
    ],
    "cells": [
      { "rowIndex": 0, "columnKey": "location", "locked": false }
    ]
  }
}
```

compiler 行为：
- 不直接修改 config，而是产出 `lockChanges[]`
- apply 阶段通过 `table-lock-service.js` 的 `setRowLock/setColLock/setCellLock` 应用

#### 10. patch_workbench_config

```jsonc
{
  "op": "patch_workbench_config",
  "patch": {
    "contextDepth": 12,
    "sendLatestRows": 50,
    "runScope": "selected",
    "mirrorToMessage": true
  }
}
```

只允许 patch 已知的工作台配置字段。**高风险**。

---

## 四、Compiler 设计

### 输入

```js
compileAssistantDraft({
  config: WorkbenchConfig,    // 当前工作台配置
  draft: AssistantDraft,      // AI 返回的操作草稿
})
```

### 输出

```js
{
  candidateConfig: WorkbenchConfig,   // 编译后的候选配置（深拷贝）
  lockChanges: LockChange[],          // 锁变更（待 apply 阶段处理）
  diff: {
    addedTables: [],
    deletedTables: [],
    renamedTables: [],
    movedTables: [],
    patchedAiInstructions: [],
    patchedColumns: [],
    patchedRows: [],
    patchedExportConfig: [],
    patchedWorkbenchConfig: [],
  },
  highRiskItems: [
    { type: 'delete_table', label: '删除表: 背包物品表' },
    { type: 'patch_table_columns', label: '删除列: 背包物品表.耐久度' },
    { type: 'patch_workbench_config', label: '修改工作台全局配置' },
  ],
  focusTableId: 'table_new_xyz',
}
```

### 核心流程

1. 深拷贝 `config`
2. 遍历 `draft.operations`
3. 每个 op：
   - 校验 tableId 存在（add_table 除外）
   - 校验字段合法性
   - 应用到 candidateConfig
   - 记录 diff
   - 标记高风险项
4. 返回编译结果

### 累积编译（多轮）

与 shujuku 相同思路：多轮 session 中，每轮的 candidateConfig 作为下一轮的输入 baseline，最终做一次全量 diff。

---

## 五、Service 设计

### Fingerprint

```js
buildAssistantFingerprint(config) → string
```

对 `config.tables` 的结构做哈希（columns 定义 + aiInstructions + exportConfig），不含 row 数据（行数据是运行时状态，不属于 schema）。

### Prompt 构造

#### System Prompt

核心约束（~30 条规则，比 shujuku 简化很多，因为无 DDL/SQL）：

1. 只输出 `<assistantDraft>...</assistantDraft>` 包裹的 JSON
2. 只允许 10 种操作
3. 每个 operation 必须有 `op` 字段
4. add_table 必须提供 name 和至少一个 column
5. add_table 应尽量同时提供 aiInstructions（至少 init/create/update/delete）
6. patch 的 columnKey/columnTitle 必须对应当前表中真实存在的列
7. patch_table_rows 用 rowId 定位行（而非行号）
8. 禁止直接保存
9. 如果需求无法满足，返回空 operations + warnings 说明原因
10. 不猜测未知字段

#### User Prompt

```jsonc
{
  "userRequest": "新增一张战利品表",
  "baseFingerprint": "acu-struct:xxxxx",
  "currentTableId": "inventory",
  "currentTable": {
    "id": "inventory",
    "name": "背包物品表",
    "columns": [ ... ],
    "aiInstructions": { ... },
    "exportConfig": { ... },
    "rowCount": 5
  },
  "allTables": [
    { "id": "...", "name": "...", "columns": [...], "rowCount": N },
    ...
  ],
  "workbenchConfig": {
    "contextDepth": 8,
    "runScope": "enabled",
    "sendLatestRows": -1,
    ...
  }
}
```

**注意：只传 schema，不传 row 数据**。这与 shujuku 的设计一致（改表助手改的是模板结构，不是运行时数据）。

### Draft 解析

```js
parseAssistantDraft(aiText) → AssistantDraft
```

1. 提取 `<assistantDraft>...</assistantDraft>` 标签内容
2. JSON.parse
3. 校验 protocolVersion / mode / baseFingerprint / operations 结构
4. 逐个校验 operation 类型 + 字段完整性
5. 返回标准化的 draft

### 多轮 Session

```js
runAssistantSession({
  config,
  currentTableId,
  userRequest,
  priorTurns,
  apiPreset,
  maxRounds,
  guard,
  onRoundComplete,
}) → AssistantSessionResult
```

与 shujuku 的 session 模式完全一致：
- 最多 N 轮（默认 3）
- 每轮将 workingConfig 传给 AI → 拿到 draft → compile → 累积到 workingConfig
- 空 operations 停止
- fingerprint 未变停止
- 校验失败自动修复重试（最多 1 次）
- guard 支持 cancel / stale

### Session Guard

```js
createAssistantSessionGuard() → {
  createRunGuard: () => { isCancelled, isStale },
  invalidate: () => void,
  cancel: () => void,
  reset: () => void,
}
```

---

## 六、UI 设计

### 入口

在 table workbench 面板内新增一个"AI 改表助手"按钮。点击后展开为侧面板或模态窗口。

### 布局

使用 youyou controls prefab 构建：

```
┌─────────────────────────────────────────┐
│ AI 改表助手                    [×] 关闭  │
│ 当前表：背包物品表 (inventory)           │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │ 聊天区域                          │  │
│  │                                   │  │
│  │  你: 新增一张战利品表              │  │
│  │                                   │  │
│  │  AI 助手:                         │  │
│  │  已新增"战利品表"，含物品名称、    │  │
│  │  数量、描述三列。                  │  │
│  │  ▶ 详情 (变更3处 · 高风险1项)     │  │
│  │  [✓] 新增表: 战利品表             │  │
│  │  [应用到编辑器]                    │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ API预设: [下拉选择]   最大轮次: [3]      │
│ ┌───────────────────────────────────┐   │
│ │ 输入修改需求...                    │   │
│ └───────────────────────────────────┘   │
│ [发送]  [停止]                          │
└─────────────────────────────────────────┘
```

### 交互流程

1. 用户输入需求 → 添加 user 气泡
2. 调用 `runAssistantSession` →
   - 每轮完成：添加 preview assistant 气泡（显示中间结果，不可应用）
   - 最终完成：替换最后一个 preview 为 final assistant 气泡
   - 出错：添加 error 气泡
3. Final 气泡包含：
   - AI summary（摘要）
   - 可折叠 diff 详情（新增/删除/重命名/patch 了什么）
   - 高风险确认 checkbox
   - "应用到编辑器"按钮（高风险项未全部确认时 disabled）
4. 点击"应用到编辑器"：
   - 校验 fingerprint 未变
   - 将 candidateConfig 写入 storage
   - 应用 lockChanges
   - 刷新 workbench UI

### 控件选型

- 聊天区域：`flowSection` + `listRow`（每条消息一个 listRow）
- 输入区：`textInput`（多行 textarea）
- API 预设：`selectInput`
- 轮次：`textInput`（number）
- 高风险确认：`toggle` checkbox
- 应用按钮：`button`
- Diff 折叠：`flowSection` + 手动 toggle 展开状态

---

## 七、与现有模块的集成点

| 新模块 | 依赖的现有模块 | 调用方式 |
|---|---|---|
| `table-assistant-service` | `table-schema-service` | `getTableWorkbenchConfig()` 读取配置 |
| `table-assistant-service` | `api-connection` | `sendWithPreset()` 发送 AI 请求 |
| `table-assistant-service` | `table-lock-service` | 读取当前锁状态 |
| `table-assistant-compiler` | `table-schema-service` | `normalizeTableWorkbenchConfig()` 校验 |
| `table-assistant-compiler` | `table-lock-service` | 产出 lockChanges |
| `table-assistant-ui` | `table-assistant-service` | 调用 session + apply |
| `table-assistant-ui` | `table-schema-service` | `saveTableWorkbenchConfig()` 保存应用 |
| `table-assistant-ui` | `popup-shell` | 作为 workbench 子面板挂载 |

### 不需要改动的现有模块

- `table-update-service` — 改表助手不涉及运行时填表
- `table-state-service` — 不涉及 per-message state
- `table-writeback-service` — 不涉及写回
- `table-provider-service` — 通过 api-connection 间接使用
- `table-template-service` — 改表助手改的是当前 config，不涉及模板 CRUD（可扩展但非必须）

---

## 八、实现优先级与分阶段建议

### P0 核心（~1000 行）

1. `table-assistant-types.js` — 类型定义
2. `table-assistant-compiler.js` — 10 种操作的编译 + diff
3. `table-assistant-service.js` — prompt + draft 解析 + 单轮生成（不含多轮）

单轮就能用的最小可用版本。

### P1 多轮 + UI（~650 行）

4. `table-assistant-service.js` 扩展 — 多轮 session + guard + fingerprint
5. `table-assistant-ui.js` — 聊天式 UI 面板

### P2 增强（可选）

- 累积编译（多轮结果的 aggregate diff）
- 嵌入语法文档片段到 prompt（类似 shujuku 的 reference-docs）
- 支持 patch_table_rows 改行数据（当前行数据不在 config 中保存，需要先加载 boundState）
- 模板级别操作（新建/修改/保存模板）

---

## 九、风险点

1. **Prompt 质量** — shujuku 的 prompt 经过大量迭代（50+ 条约束规则），youyou 需要类似的调优周期。初期建议先用 20 条核心规则上线，根据实际使用反馈逐步收紧。

2. **行数据不在 config 中** — youyou 的 `saveTableWorkbenchConfig` 会 strip rows。如果需要 AI 改运行时行数据，需要额外从 `table-state-service` 加载 boundState。建议 P0 只改 schema（表结构 + AI 指令 + 配置），P2 再支持改行数据。

3. **列 key 稳定性** — youyou 的列用 `key` 标识（自动生成），AI 无法预知 key。User prompt 中需要同时传 `columnKey` 和 `columnTitle`，AI 用 `columnKey` 引用列。这是与 shujuku 的关键设计差异。

4. **多轮累积的 consistency** — 多轮 session 中 AI 可能产生相互矛盾的 operation。compiler 的 strict patch 机制会拒绝非法操作，但不会自动修复逻辑矛盾。需要在 prompt 中明确告知 AI "前面的改动已经应用"。
