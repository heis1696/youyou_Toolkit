# 占位符速查表

> 所有 `$` 变量及其数据来源、使用场景

---

## 通用占位符

| 占位符 | 含义 | 填表 | 剧情 | 优化 | 合并 | 向量 |
|--------|------|:----:|:----:|:----:|:----:|:----:|
| `$0` | 当前表格数据文本 | ✅ | | | | |
| `$1` | 对话正文 / 世界书内容 | ✅ | ✅ | ✅ | | |
| `$4` | 世界书内容（完整递归触发） | ✅ | | | | |
| `$5` | 纪要索引 / 大纲内容 | | ✅ | ✅ | | |
| `$6` | 上轮剧情规划数据 | ✅ | ✅ | ✅ | | |
| `$7` | 前文上下文（最近 AI 消息） | | ✅ | ✅ | | |
| `$8` | 用户输入 / 手动提示 | ✅ | ✅ | ✅ | | |
| `$U` | 用户设定描述 (persona) | ✅ | ✅ | ✅ | | |
| `$C` | 角色描述 (char_description) | ✅ | ✅ | ✅ | | |

---

## 专用占位符

| 占位符 | 含义 | 使用场景 |
|--------|------|---------|
| `$CONTENT` | 待优化的正文内容 | 正文优化 |
| `$TARGET_COUNT` | 目标条目数 | 纪要合并 |
| `$A` | 需精简的纪要数据 | 纪要合并 |
| `$BASE_DATA` | 已精简的基础底稿 | 纪要合并 |
| `$RECENT_CONTEXT` | 最近对话上下文 | 向量索引关键词 |
| `$USER_INPUT` | 当前用户输入 | 向量索引关键词 |
| `$SUMMARY_SOURCE_ROWS` | 待归档纪要批次 | 远记忆归档 |

---

## 剧情推进内部占位符

| 占位符 | 含义 | 替换值 |
|--------|------|--------|
| `zhaohui` | 召回数量 | `plotSettings.recallCount` |
| `sulv1` | 速率-主线 | `plotSettings.rateMain` |
| `sulv2` | 速率-个人 | `plotSettings.ratePersonal` |
| `sulv3` | 速率-色情 | `plotSettings.rateErotic` |
| `sulv4` | 速率-绿帽 | `plotSettings.rateCuckold` |

---

## 替换规则

- `$0`, `$1`, `$4`, `$8`：仅替换首次出现（`str.replace('$0', value)`）
- `$6`, `$U`, `$C`：全局替换（`str.replace(/\$6/g, value)`）
- 所有占位符值经过 `applyExcludeRulesToText_ACU` 排除规则过滤

## 替换后处理管线

```
EJS 模板渲染
  → parseRandomTags_ACU + replaceRandomVariables_ACU
  → parseCalcTags_ACU + replaceCalcVariables_ACU
  → parseMaxTags_ACU + replaceMaxVariables_ACU
  → parseMinTags_ACU + replaceMinVariables_ACU
  → replaceDbSqlVariables（SQLite 模式）
  → parseIfBlocksInContent_ACU（条件块递归解析）
```

---

## 模板变量系统（SQLite 模式）

| 变量类型 | 定义语法 | 引用语法 |
|---------|---------|---------|
| random | `<random id="name" min="1" max="100" />` | `$random:name` |
| calc | `<calc id="name" expr="表达式" />` | `$calc:name` |
| max | `<max id="name" values="值1, 值2" />` | `$max:name` |
| min | `<min id="name" values="值1, 值2" />` | `$min:name` |
| cell | `cell:表名/行名/列名` | 在 expr 中使用 |
| seed | `<if seed="关键词表达式">` | — |
| cond | `<if cond="复合条件">` | — |
| db | `{[db.表名.where("列","值").get("列")]}` | `$v:变量名` |
| sql | `{[sql "SELECT ..."]}` | `$v:变量名` |
| v | 由 db/sql `as` 赋值 | `$v:变量名` |

### if 条件类型

| 条件类型 | 语法 | 求值器 |
|---------|------|--------|
| seed | `<if seed="战斗,打架">` | 关键词匹配（`,` OR, `&` AND, `!` NOT） |
| cell | `<if cell="表名/行名/列名 > 50">` | 表格单元格比较 |
| cond | `<if cond="seed:战斗 & cell:表/行/列 > 10">` | 复合条件 |
| db | `<if db="db.表名.where(...).count() > 3">` | ORM 查询条件 |
| sql | `<if sql="SELECT COUNT(*) FROM t WHERE ...">` | SQL 条件 |
