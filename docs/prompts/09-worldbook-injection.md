# 世界书注入模板

> 来源文件：`Reference/shujuku-spv3.7/src/service/worldbook/pipeline.ts`
> 触发场景：每次填表成功后自动触发世界书条目更新

---

## 1. WrapperStart 条目（constant 类型）

```
<最新数据与记录>
以下是在这个时间点，当前场景下剧情相关的最新数据与记录，你在进行剧情分析时必须以此最新的数据为准，以下数据与记录的优先级高于其他任何背景设定：

```

- **条目名**: `{isolationPrefix}TavernDB-ACU-WrapperStart`
- **类型**: constant
- **位置**: `before_char_definition`, order 由 `allocConsecutiveOrderBlock` 分配

## 2. ReadableDataTable 条目（constant 类型）

内容为 `formatJsonToReadable_ACU` 生成的 Markdown 表格：

```markdown
# 表名1

| 列1 | 列2 | 列3 | ... |
|---|---|---|---|
| 值1 | 值2 | 值3 | ... |

# 表名2

| 列1 | 列2 |
|---|---|
| 值1 | 值2 |
```

排除规则：
- 重要人物表 → 单独处理
- 总结表 → 单独处理（Memory 包裹）
- 总体大纲 → 单独处理
- `exportConfig.enabled === true` 的表 → 由自定义导出处理
- `exportConfig.injectIntoWorldbook === false` 的表 → 跳过

## 3. WrapperEnd 条目（constant 类型）

```
</最新数据与记录>
```

- **条目名**: `{isolationPrefix}TavernDB-ACU-WrapperEnd`

## 4. MemoryStart 条目（constant 类型）

```
<过往记忆>

以下是你回忆起的跟当前剧情有关的过往的记忆，你要特地注意该记忆所标注的时间，以及分析与当前剧情的相关性，完美地将其融入本轮的剧情编写中：

# 总结表

| 时间跨度 | 地点 | 纪要 | 概要 | 编码索引 |
|---|---|---|---|---|

```

- **条目名**: `{isolationPrefix}TavernDB-ACU-MemoryStart`
- 包含总结表的表头行

## 5. 总结行条目（keyword 类型）

每行总结表数据创建一个独立条目，内容为单行 Markdown：

```markdown
| 时间值 | 地点值 | 纪要值 | 概要值 | AM0001 |
```

- **关键词**: 编码索引列的值（逗号分割）
- **order**: 同表所有行共用一个 order（"按表占深度"）

## 6. MemoryEnd 条目（constant 类型）

```
</过往记忆>
```

- **条目名**: `{isolationPrefix}TavernDB-ACU-MemoryEnd`

## 7. 总体大纲条目（constant 类型）

```markdown
<剧情大纲编码索引>
# 总体大纲

| 列1 | 列2 | ... |
|---|---|---|
| 值1 | 值2 | ... |
</剧情大纲编码索引>
```

- **条目名**: `{isolationPrefix}TavernDB-ACU-OutlineTable`
- **位置**: `at_depth_as_system`, depth=9998

## 8. 重要人物条目组（3 类）

### 8a. PersonsHeader（constant）

```markdown
# 重要人物表

| 姓名 | 性别/年龄 | ... |
|---|---|---|
```

### 8b. 每行人物（keyword）

```markdown
| 角色名 | 女/20 | ... |
```

- **关键词**: 姓名列的值（含括号前缀提取，如 "张三(配角)" → ["张三(配角)", "张三"]）

### 8c. PersonsIndex（constant）

```markdown
| 姓名 |
|---|
| 张三 |
| 李四 |
```

## 9. 纪要索引条目（向量索引覆盖）

```markdown
# 纪要索引

| 时间 | 地点 | 概要 | 编码索引 |
|---|---|---|---|
| 值1 | 值2 | 值3 | 值4 |
```

- **条目名**: `{isolationPrefix}TavernDB-ACU-CustomExport-纪要索引`
- **类型**: constant
- **order**: 10000
- **prevent_recursion**: true
