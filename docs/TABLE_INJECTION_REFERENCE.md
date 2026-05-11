# 填表世界书注入参考文档

基于 shujuku-spv3.7 参考项目的完整逆向分析，对比 YouYou Toolkit 当前实现的差距与移植计划。

---

## 1. 架构总览

### shujuku 端到端注入流水线

```
AI 填表完成 (executeCardUpdateCore_ACU)
  → 保存表数据到聊天历史 (persistTablesToChatMessage_ACU)
  → 从聊天历史合并重建最新表数据 (mergeAllIndependentTables_ACU)
  → 格式化为可读文本 + 提取特殊表 (formatJsonToReadable_ACU)
  → 世界书注入主流程 (updateReadableLorebookEntry_ACU)
      ├── 重要人物表注入 (updateImportantPersonsRelatedEntries_ACU)
      ├── 总结表注入 (updateSummaryTableEntries_ACU)
      ├── 大纲表注入 (updateOutlineTableEntry_ACU)
      ├── 自定义导出注入 (updateCustomTableExports_ACU)
      └── 全局可读条目 + Wrapper 包裹 + Memory 包裹
  → Order 后修正（重新 fetch → 强制写回正确 order）
```

### 关键架构决策

| 决策 | 说明 |
|------|------|
| 以 `comment` 字段作为条目唯一标识 | 不依赖 uid，用 comment 查找 → uid 更新 |
| 隔离前缀系统 | `ACU-[code]-` 前缀允许多实例共享一个世界书 |
| 导入条目前缀 | `外部导入-` 前缀的条目永不被自动清理 |
| 问候阶段抑制 | 首次问候时不注入，避免空数据污染 |
| 删除后重建 | 总结条目和人物条目每次全量删除后重建 |
| 差异比较后更新 | 大纲/全局可读/包裹条目只在内容变化时更新 |

### TavernHelper 世界书 API

| 方法 | 用途 |
|------|------|
| `getLorebookEntries(bookName)` | 读取世界书所有条目 |
| `setLorebookEntries(bookName, [{uid, ...}])` | 按 uid 更新已有条目 |
| `createLorebookEntries(bookName, [{comment, content, ...}])` | 创建新条目 |
| `deleteLorebookEntries(bookName, [uid1, uid2, ...])` | 按 uid 删除条目 |

---

## 2. 数据模型对比

### shujuku 表结构 (`Sheet_ACU`)

来源：`src/shared/models/table-data.ts`

```
{
  uid: string,                          // "sheet_1", "sheet_2"
  name: string,                         // "总结表", "重要人物表"
  sourceData: {
    note: string,                       // 表说明
    initNode: string,                   // 初始化指令
    deleteNode: string,                 // 删除指令
    updateNode: string,                 // 更新指令
    insertNode: string,                 // 插入指令
    ddl?: string                        // SQLite 模式 DDL
  },
  content: [                            // 二维数组
    ["row_id", "列1名", "列2名", ...],  // content[0] = 表头行，col[0] = 行标识
    ["1", "值1", "值2", ...],           // content[1..] = 数据行
  ],
  updateConfig: {
    uiSentinel: number,                 // -1=使用全局, 0=旧版兼容
    contextDepth: number,               // -1=全局, >0=覆盖
    updateFrequency: number,            // -1=全局, 0=禁用, >0=每N轮
    batchSize: number,                  // -1=全局
    skipFloors: number                  // -1=全局, >=0=跳过最近N层
  },
  exportConfig: { ... },               // 见第4节
  orderNo: number,                      // 排序序号
  seedRows?: [...]                      // 模板种子行（运行时附加）
}
```

### YouYou Toolkit 表结构

来源：`modules/table-engine/table-schema-service.js`

```
{
  id: string,                           // "default_global_state"
  name: string,                         // "全局数据表"
  note: string,                         // 表说明
  enabled: boolean,
  aiInstructions: {
    init: string,                       // 初始化说明
    create: string,                     // 新增说明
    update: string,                     // 更新说明
    delete: string                      // 删除说明
  },
  columns: [{
    key: string,                        // "location"
    title: string,                      // "主角当前所在地点"
    description: string,                // 列说明
    type: string,                       // text|number|boolean|date|json
    required: boolean
  }],
  rows: [{
    id: string,
    name: string,                       // "行1"
    cells: { [colKey]: value }          // { "location": "城堡", ... }
  }]
}
```

### 核心差异

| 方面 | shujuku | YouYou |
|------|---------|--------|
| 数据形状 | 二维数组 `content[][]` | 对象数组 `columns[] + rows[].cells{}` |
| 列元数据 | content[0] 行即列名 | 显式 column 对象含 type/description |
| 世界书导出 | 每表独立 `exportConfig` | 全局单一 `worldbookSync` |
| 更新调度 | 每表独立 `updateConfig` | 全局配置 |
| AI 指令 | `sourceData.*Node` | `aiInstructions.{init,create,update,delete}` |
| 行标识 | 列0作为行标识 | 数组索引隐式 |
| 存储模式 | Native JSON 或 SQLite | 仅 JSON |
| 隔离 | `dataIsolationCode` 前缀系统 | 无 |
| 表排序 | `orderNo` 字段 | 配置中的数组顺序 |

### 字段映射（shujuku → YouYou）

| shujuku | YouYou | 备注 |
|---------|--------|------|
| `uid` | `id` | 标识符 |
| `name` | `name` | 显示名称 |
| `sourceData.note` | `note` | 表说明 |
| `sourceData.initNode` | `aiInstructions.init` | 初始化指令 |
| `sourceData.insertNode` | `aiInstructions.create` | 新增指令 |
| `sourceData.updateNode` | `aiInstructions.update` | 更新指令 |
| `sourceData.deleteNode` | `aiInstructions.delete` | 删除指令 |
| `content[0]` | `columns[].title` | 列标题 |
| `content[i][j]` | `rows[i-1].cells[colKey]` | 单元格值 |
| `orderNo` | 数组索引 | 排序 |
| `exportConfig` | **缺失** | 需新增 |
| `updateConfig` | 全局配置 | 需新增 |

---

## 3. 世界书条目目录

### 3.1 全局可读条目 (`TavernDB-ACU-ReadableDataTable`)

- **内容**：所有非特殊表、非自定义导出表的 Markdown 汇总
- **格式**：每表 `# 表名\n\n| 列1 | 列2 |\n|---|---|\n| 值 | 值 |`
- **类型**：`constant`
- **位置**：`before_character_definition`, order ~99981
- **创建者**：`pipeline.ts::updateReadableLorebookEntry_ACU()`
- **数据为空时**：删除此条目

### 3.2 全局 Wrapper 包裹

#### WrapperStart (`TavernDB-ACU-WrapperStart`)

```
<最新数据与记录>
以下是在这个时间点，当前场景下剧情相关的最新数据与记录，你在进行剧情分析时必须以此最新的数据为准，以下数据与记录的优先级高于其他任何背景设定：

```

- **类型**：`constant`
- **位置**：`before_character_definition`, order ~99980
- **keys**：`['TavernDB-ACU-WrapperStart-Key']`（创建时）

#### WrapperEnd (`TavernDB-ACU-WrapperEnd`)

```
</最新数据与记录>
```

- **类型**：`constant`
- **位置**：`before_character_definition`, order ~99982

**3-depth 分组**：WrapperStart(base) → ReadableDataTable(base+1) → WrapperEnd(base+2)

### 3.3 总结表条目

#### MemoryStart (`TavernDB-ACU-MemoryStart`)

```
<过往记忆>

以下是你回忆起的跟当前剧情有关的过往的记忆，你要特地注意该记忆所标注的时间，以及分析与当前剧情的相关性，完美地将其融入本轮的剧情编写中：

# 总结表

| 时间跨度 | 地点 | 纪要 | ... |
|---|---|---|---|
```

- **类型**：`keyword`, keys: `['AM']`
- **位置**：`at_depth_as_system`, depth 9999

#### 总结行条目 (`总结条目1`, `总结条目2`, ...)

- **内容**：单行 Markdown `| 值1 | 值2 | ... |`（无表头）
- **类型**：`keyword`, keys 从 `编码索引` 列的值提取
- **位置**：`at_depth_as_system`, depth 9999
- **所有行共享一个 order 值**
- **每次重建**：先删除所有旧 `总结条目*`，再批量创建

#### MemoryEnd (`TavernDB-ACU-MemoryEnd`)

```
</过往记忆>
```

- **类型**：`keyword`, keys: `['AM']`

**3-depth 分组**：MemoryStart(base) → 总结行(base+1, 共享) → MemoryEnd(base+2)

### 3.4 大纲表条目 (`TavernDB-ACU-OutlineTable`)

```
<剧情大纲编码索引>

# 总体大纲

| 编码 | 事件 | ... |
|---|---|---|
| AM001 | ... | ... |

</剧情大纲编码索引>
```

- **类型**：`constant`
- **位置**：`at_depth_as_system`, depth 9998, order ~99985
- **keys**（创建时）：`['TavernDB-ACU-OutlineTable-Key']`
- **数据为空时**：删除此条目

### 3.5 重要人物条目

#### PersonsHeader (`TavernDB-ACU-PersonsHeader`)

```
# 重要人物表

| 姓名 | 性别/年龄 | ... |
|---|---|---|
```

- **类型**：`constant`
- **位置**：`at_depth_as_system`, depth 10000

#### 人物行条目 (`重要人物条目1`, `重要人物条目2`, ...)

- **内容**：单行 Markdown `| 值1 | 值2 | ... |`
- **类型**：`keyword`, keys 从 `姓名` 列提取
  - 支持括号别名：`张三（小张）` → keys: `['张三', '小张']`
  - 支持逗号分隔：`张三, 三哥` → keys: `['张三', '三哥']`
- **所有人物行共享一个 order 值**

#### PersonsIndex (`TavernDB-ACU-ImportantPersonsIndex`)

```
# 以下是之前剧情中登场过的角色

| 姓名 |
|---|
| 张三 |
| 李四 |
```

- **类型**：`constant`
- **keys**：`['TavernDB-ACU-ImportantPersonsIndex-Key']`

**3-depth 分组**：PersonsHeader(base) → 人物行(base+1, 共享) → PersonsIndex(base+2)

### 3.6 自定义导出条目

当表的 `exportConfig.enabled = true` 时触发，支持两种模式：

#### 全表模式（splitByRow = false）

一条目包含整表 Markdown：

```
comment: "TavernDB-ACU-CustomExport-{entryName}"
content: "# 表名\n\n| 列 | 列 |\n|---|---|\n| 值 | 值 |"
type: config.entryType || 'constant'
```

#### 按行拆分模式（splitByRow = true）

每行一个条目：

```
comment: "TavernDB-ACU-CustomExport-{entryName}-{行号}"
content: "| 值1 | 值2 |"
type: config.entryType || 'constant'
keys: 从 config.keywords 对应的列值中提取
```

#### 包裹条目（wrapper，当 injectionTemplate 含 `$1` 时）

```
comment: "TavernDB-ACU-CustomExport-{entryName}-包裹-上"
content: template中$1之前的部分 + 表头

comment: "TavernDB-ACU-CustomExport-{entryName}-包裹-下"  
content: template中$1之后的部分
```

#### 额外索引条目（extraIndex）

```
comment: "TavernDB-ACU-CustomExport-{extraIndexEntryName}"
content: 仅包含 extraIndexColumns 指定的列子集
```

- 列模式 `index_only`：该列只出现在索引中，从主条目移除
- 列模式 `both`：该列同时出现在主条目和索引中

### 3.7 YouYou 当前条目

**仅一条目**：`YYT-填表数据`

- **内容**：所有表的 Markdown 汇总（已修复：合并 schema 列信息）
- **类型**：`constant`
- **位置**：`before_character_definition`, order 100
- **创建者**：`table-worldbook-sync-service.js::syncTablesToWorldbook()`

---

## 4. 每表导出配置（exportConfig）

### 完整字段参考

来源：`src/service/worldbook/injection-engine-config.ts::buildDefaultExportConfig_ACU()`

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | boolean | `false` | 是否导出到世界书 |
| `splitByRow` | boolean | `false` | true=每行一条目；false=整表一条目 |
| `entryName` | string | `表名` | 生成条目的 comment 前缀 |
| `entryType` | string | `'constant'` | `'constant'`(常驻) 或 `'keyword'`(关键词触发) |
| `keywords` | string | `''` | 逗号分隔；若匹配列名则读取单元格值作为 key |
| `preventRecursion` | boolean | `true` | 条目的 `prevent_recursion` 标记 |
| `injectionTemplate` | string | `''` | 含 `$1` 占位符的模板；启用时创建包裹条目 |
| `injectIntoWorldbook` | boolean | `true` | false=仅导出索引，跳过主条目 |
| `extraIndexEnabled` | boolean | `false` | 是否创建额外索引条目 |
| `extraIndexEntryName` | string | `'{name}-索引'` | 索引条目的 comment |
| `extraIndexColumns` | string[] | `[]` | 索引中包含的列 |
| `extraIndexColumnModes` | Record | `{}` | 每列 `'both'` 或 `'index_only'` |
| `extraIndexInjectionTemplate` | string | `''` | 索引条目的注入模板 |
| `entryPlacement` | PlacementConfig | 默认值 | 主条目的 position/depth/order |
| `extraIndexPlacement` | PlacementConfig | 默认值 | 索引条目的 position/depth/order |
| `fixedEntryPlacement` | PlacementConfig | 表类型特定 | 内置表的锁定默认值 |
| `fixedIndexPlacement` | PlacementConfig | 表类型特定 | 内置表索引的锁定默认值 |

### PlacementConfig 结构

```
{
  position: 'at_depth_as_system' | 'before_character_definition' | 'after_character_definition',
  depth: number,     // 仅 position = 'at_depth_as_system' 时有效
  order: number      // 注入优先级 / 深度排序
}
```

### 内置表类型的默认放置

| 表名 | entry | index |
|------|-------|-------|
| 总结表 | `at_depth_as_system`, depth 9999, order 99987 | depth 9999, order 99988 |
| 总体大纲 | `at_depth_as_system`, depth 9998, order 99985 | depth 9998, order 99986 |
| 重要人物表 | `at_depth_as_system`, depth 10000, order 99983 | depth 10000, order 99984 |
| 全局数据表 | `before_character_definition`, order 99981 | order 99982 |
| 其他 | `at_depth_as_system`, depth 2, order 99990 | depth 2, order 99991 |

### 全局注入配置

```
{
  readableEntryPlacement: { position: 'before_character_definition', depth: 2, order: 99981 },
  wrapperPlacement:       { position: 'before_character_definition', depth: 2, order: 99980 }
}
```

### position 值规范化

| 输入 | 规范化结果 |
|------|-----------|
| `'at_depth_as_system'`, `'system'` | `'at_depth_as_system'` |
| `'before_char'`, `'before_character'`, `'before_character_definition'`, `'0'` | `'before_character_definition'` |
| `'after_char'`, `'after_character'`, `'after_character_definition'`, `'1'` | `'after_character_definition'` |

---

## 5. 条目生命周期

### 创建模式

**模式 A：查找已有 → 存在则更新，不存在则创建**

用于：大纲表、全局可读、Wrapper 包裹、Memory 包裹

```
1. getLorebookEntries(targetBook) → 所有条目
2. entries.find(e => e.comment === targetComment)
3. 若找到 && 有 uid → setLorebookEntries([{uid, ...newData}])
4. 若未找到 → createLorebookEntries([{comment, content, ...}])
```

**模式 B：全量删除后重建**

用于：总结行条目、人物行条目

```
1. 收集所有 comment.startsWith(前缀) 的条目 uid
2. deleteLorebookEntries(targetBook, uids)
3. 批量 createLorebookEntries(targetBook, [新条目列表])
4. 重新 fetch → 按修正写回 order
```

### 更新优化（差异比较）

更新前比较以下字段，有变化才调用 API：

- `content` 内容
- `enabled` 启用状态
- `type` 条目类型
- `prevent_recursion`
- `order` 顺序
- placement（`position` + `depth`）

### Order 后修正

TavernHelper 的 `createLorebookEntries` 可能重写 order 值。修正步骤：

```
1. createLorebookEntries(targetBook, entries)
2. getLorebookEntries(targetBook) → 重新读取
3. 按 comment 匹配新创建的条目，获取 uid
4. setLorebookEntries(targetBook, [{uid, order: 正确值}])
```

### 清理模式

#### 全量清理 (`deleteAllGeneratedEntries_ACU`)

匹配规则：
1. **基础前缀列表**（12 项）：`TavernDB-ACU-ReadableDataTable`、`总结条目`、`重要人物条目`、`TavernDB-ACU-CustomExport`、`TavernDB-ACU-WrapperStart/End` 等
2. **已知自定义条目名**：`settings.knownCustomEntryNames` 持久化列表
3. **当前配置前缀**：当前启用的 `exportConfig.entryName` 值

例外：
- `外部导入-` 前缀的条目**永不自动清理**
- 隔离模式下只清理当前前缀的条目
- 非隔离模式下跳过 `ACU-[` 开头的条目

#### 对话切换清理

```
CHAT_CHANGED 事件触发:
1. 验证 chatFileName（忽略空值防止状态损坏）
2. 重置运行时状态
3. 重新加载设置
4. 重新加载聊天历史
5. 1200ms 后：若注入目标非 character，清理角色绑定世界书中的旧条目
```

#### 数据为空时清理

当数据库为空（无有效单元格数据）：
- 删除全局可读条目
- 删除 WrapperStart/WrapperEnd
- 删除 MemoryStart/MemoryEnd
- 保留大纲/总结/人物条目（它们的处理函数独立判断数据为空时各自清理）

### knownCustomEntryNames 追踪

每次自定义导出完成后：
1. 将所有新建条目的 comment 存入 `settings.knownCustomEntryNames`
2. 清理时从列表中移除已删除的名称
3. 这确保了即使表配置变更（改名/禁用），旧条目仍能被正确清理

---

## 6. Order 分配系统

来源：`src/service/worldbook/injection-engine-order.ts`

### 核心函数

#### `buildUsedOrderSet_ACU(entries) → Set<number>`

扫描世界书所有条目，收集所有有效的 `order` 值到 Set。

#### `allocOrder_ACU(usedSet, preferred, min=1, max=99999) → number`

从 `preferred` 开始向上查找第一个空闲值；若到 max 未找到，则从 min 继续找。找不到则抛异常。

#### `allocConsecutiveOrderBlock_ACU(usedSet, blockSize, preferred, min=1, max=99999) → number`

分配 `blockSize` 个连续空闲 order，返回起始值。用于包裹 + 内容 + 结尾的 3-depth 分组。

### 分组规则

| 分组 | base+0 | base+1 | base+2 |
|------|--------|--------|--------|
| 全局包裹 | WrapperStart | ReadableDataTable | WrapperEnd |
| 总结 | MemoryStart | 总结行(共享) | MemoryEnd |
| 人物 | PersonsHeader | 人物行(共享) | PersonsIndex |
| 自定义包裹 | 包裹-上 | 数据行(共享) | 包裹-下 |

### 共享 Order 优化

- 同一表的所有行条目共享一个 order 值
- 避免每行占用一个深度槽位
- 人物表 100 行只用 3 个 order（header + 行共享 + index）

### 我们的差距

当前硬编码 `order: 100`，无碰撞检测，无连续分配，无共享优化。

---

## 7. 当前状态 vs 目标（差距分析）

### 已有功能

| 功能 | 文件 | 状态 |
|------|------|------|
| 持久化表数据到消息 | `table-state-service.js` | ✅ 完整 |
| AI 响应解析回填 UI | `table-update-service.js` + `table-json-sanitizer.js` | ✅ 完整 |
| 增量编辑模式 | `table-json-sanitizer.js` (`<tableEdit>` 解析) | ✅ 完整 |
| 行/字段锁定 | `table-lock-service.js` | ✅ 完整 |
| 填表后 diff 展示 | `table-diff-service.js` + panel | ✅ 完整 |
| 单条目世界书同步 | `table-worldbook-sync-service.js` | ✅ 基础 |
| 每对话 guide 层 | `table-guide-service.js` | ⚠️ 部分 |
| 消息镜像写回 | `table-writeback-service.js` + `context-injector.js` | ✅ 完整 |
| 自动填表触发 | `tool-automation-service.js` | ✅ 完整 |

### 缺失功能

| 功能 | shujuku 实现 | 我们当前 | 优先级 |
|------|-------------|---------|--------|
| 多条目注入 | 按表拆分独立条目 | 单条目塞全部 | **P0** |
| 每表 exportConfig | 18+ 字段独立配置 | 3 字段全局配置 | **P0** |
| Wrapper 包裹条目 | Start/End 配对 | 无 | **P0** |
| Order 分配系统 | 碰撞检测+连续分配 | 硬编码 100 | **P0** |
| Keyword 触发条目 | 按角色名/编码索引触发 | 仅 constant | **P1** |
| 按行拆分 | 每行独立条目+共享 order | 无 | **P1** |
| 注入模板 `$1` | 包裹-上/下分割 | 无 | **P1** |
| 额外索引条目 | 列子集+列模式 | 无 | **P1** |
| 条目清理生命周期 | 已知名追踪+前缀匹配 | 无清理 | **P1** |
| Order 后修正 | 创建后强制写回 | 无 | **P1** |
| 内置表特殊处理 | 总结/人物/大纲独立逻辑 | 无 | **P2** |
| 差异比较后更新 | 比较后按需更新 | 每次都写 | **P2** |
| 导出实时表数据 | CSV/JSON 导出 | 仅模板导出 | **P2** |
| 向量索引纪要检索 | embedding + rerank | 无 | **P3** |
| 隔离前缀 | 多实例共享世界书 | 无 | **P3** |
| 0TK 模式 | 禁用条目但不删除 | 无 | **P3** |
| SQLite 存储模式 | 双模式适配器 | 仅 JSON | **P3** |

### 代码位置

| 我们文件 | 作用 | 需要的改动 |
|---------|------|-----------|
| `table-worldbook-sync-service.js` | 世界书同步 | 核心重写：从单条目 → 多条目引擎 |
| `table-schema-service.js` | 配置规范化 | 新增 exportConfig schema + placement 默认值 |
| `table-writeback-service.js` | 写回集成 | 传递更丰富的 config 到同步服务 |
| `table-types.js` | 类型常量 | 新增 exportConfig 相关类型 |
| `table-workbench-panel.js` | UI 面板 | 新增每表导出配置面板 |
| `tool-worldbook-service.js` | 世界书读取 | 新增写入辅助函数 |

| shujuku 参考文件 | 作用 |
|-----------------|------|
| `injection-engine-config.ts` | 配置结构 + 放置默认值 + 规范化 |
| `injection-engine-order.ts` | Order 分配系统 |
| `injection-engine-entries.ts` | 大纲/总结/人物条目创建逻辑 |
| `injection-engine-custom.ts` | 自定义表导出（最复杂） |
| `injection-engine-state.ts` | 注入目标 + 隔离前缀 + 清理 |
| `pipeline.ts` | 主流水线编排 |
| `worldbook-gateway.ts` | TavernHelper API 封装 |

---

## 8. 实施路线图

### Phase 1：基础（多条目 + Order 分配）

**目标**：拆分单条目为多条目，加入 order 碰撞检测。

#### 1.1 新增文件

- `table-worldbook-order-service.js` — Order 分配器
  - `buildUsedOrderSet(entries)` → `Set<number>`
  - `allocOrder(usedSet, preferred)` → `number`
  - `allocConsecutiveOrderBlock(usedSet, size, preferred)` → `number`

- `table-worldbook-placement-service.js` — 放置配置
  - `normalizePosition(raw)` → 规范化 position 字符串
  - `applyPlacement(entry, placement)` → 带位置的条目对象
  - 内置表默认放置值

#### 1.2 扩展配置

在 `table-schema-service.js` 中为每个表新增 `exportConfig`：

```
exportConfig: {
  enabled: false,
  splitByRow: false,
  entryName: '',               // 默认取 table.name
  entryType: 'constant',
  keywords: '',
  injectionTemplate: '',
  extraIndexEnabled: false,
  extraIndexColumns: [],
  entryPlacement: { position: 'before_character_definition', depth: 2, order: 0 },
  preventRecursion: true
}
```

全局新增 `wrapperConfig`：

```
wrapperConfig: {
  enabled: true,
  wrapperTag: '最新数据与记录',
  wrapperPlacement: { position: 'before_character_definition', depth: 2, order: 0 }
}
```

#### 1.3 重写同步服务

`table-worldbook-sync-service.js` 从单函数改为流水线：

```
syncAllTablesToWorldbook(tables, config)
  → 合并 schema + 运行时数据
  → 构建 usedOrderSet
  → 为每表生成 entryPlans：
     - 全局可读条目
     - WrapperStart / WrapperEnd
     - 每表独立条目（根据 exportConfig）
  → 执行：创建/更新/删除
  → Order 后修正
```

#### 1.4 验证

- 手动填表后检查世界书中是否生成多个条目
- 条目内容正确（表名+列标题+数据）
- Order 不碰撞
- 第二次填表后条目正确更新而非重复创建

### Phase 2：高级注入模式

**目标**：按行拆分、Keyword 触发、包裹模板、额外索引。

#### 2.1 按行拆分（splitByRow）

当 `exportConfig.splitByRow = true` 时：
- 每行创建独立条目
- 所有行共享一个 order
- 条目名 `{entryName}-{行号}`
- 从 `keywords` 指定的列值提取 keys

#### 2.2 Keyword 触发

当 `exportConfig.entryType = 'keyword'` 时：
- 条目 `type: 'keyword'`
- `keys` 数组从配置或单元格值提取
- 支持逗号分隔多关键词
- 支持括号别名提取

#### 2.3 包裹模板（$1）

当 `exportConfig.injectionTemplate` 含 `$1` 时：
- 解析为 `{before, after}`
- 创建 `{entryName}-包裹-上` 和 `{entryName}-包裹-下` 配对条目
- 3-depth 连续分配

#### 2.4 额外索引

当 `exportConfig.extraIndexEnabled = true` 时：
- 创建 `{extraIndexEntryName}` 条目
- 仅包含 `extraIndexColumns` 指定的列子集
- 列模式 `index_only` 从主条目移除该列

### Phase 3：条目生命周期 + UI

#### 3.1 生命周期管理

- `knownEntryNames` 持久化追踪
- 前缀匹配清理
- 对话切换时清理旧条目
- 差异比较后按需更新（减少 API 调用）

#### 3.2 UI 集成

在填表工作台的表编辑抽屉中新增「世界书导出」配置面板：
- 启用/禁用导出
- 条目类型选择（constant/keyword）
- 按行拆分开关
- 关键词配置
- 注入模板编辑器（含 `$1` 预览）
- 放置配置（position + depth + order）
- 额外索引配置
- 条目预览（生成后看效果）

### Phase 4：进阶功能（可选）

- 向量索引纪要检索（需要 embedding API）
- 隔离前缀（多实例场景）
- 0TK 模式（禁用条目但不删除）
- 导出实时表数据（CSV/JSON）
- SQLite 存储模式

---

## 附录：shujuku 源码文件索引

| 文件路径 | 作用 |
|---------|------|
| `src/service/worldbook/pipeline.ts` | 注入主流水线 |
| `src/service/worldbook/injection-engine-config.ts` | 配置 + 放置默认值 |
| `src/service/worldbook/injection-engine-order.ts` | Order 分配 |
| `src/service/worldbook/injection-engine-entries.ts` | 大纲/总结/人物条目 |
| `src/service/worldbook/injection-engine-custom.ts` | 自定义导出 |
| `src/service/worldbook/injection-engine-state.ts` | 注入目标 + 清理 |
| `src/service/worldbook/worldbook-gateway.ts` | API 封装（旧路径） |
| `src/data/gateways/worldbook-gateway.ts` | API 封装（新路径） |
| `src/service/worldbook/worldbook-service.ts` | Upsert 辅助 |
| `src/service/worldbook/worldbook-cleanup.ts` | 数据删除后清理 |
| `src/service/table/table-service.ts` | 表数据持久化 |
| `src/service/table/update-orchestrator.ts` | 填表主编排 |
| `src/service/table/table-history.ts` | 历史状态解析 |
| `src/service/table/update-scheduler.ts` | 自动更新调度 |
| `src/service/table/table-edit-parser.ts` | AI 响应解析 |
| `src/service/runtime/helpers-data-merge.ts` | 数据合并 + 可读文本 |
| `src/service/template/chat-scope/` | 每对话模板隔离 |
| `src/service/vector/` | 向量索引子系统 |
| `src/shared/models/table-data.ts` | 表数据模型 |
| `src/shared/utils.ts` | 通用工具函数 |
