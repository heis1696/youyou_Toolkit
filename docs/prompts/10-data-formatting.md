# 数据格式化模板

> 描述 `$0`、`$1`、`$7` 等占位符的数据是如何被格式化为文本的

---

## $0 — 表格数据文本（原生模式）

空表格时：
```
[表序号:表名]
  Columns: [0:列名1], [1:列名2], ...
  - Note: 表注释
  - Init Trigger: 初始化触发说明
  (该表格为空，请进行初始化。)
```

有数据时：
```
[表序号:表名]
  Columns: [0:列名1], [1:列名2], ...
  - Note: 表注释
  - Insert Trigger: 插入触发说明
  - Update Trigger: 更新触发说明
  - Delete Trigger: 删除触发说明
  - SeedRows: 已提供模板基础数据...
  - Note: Showing last N of M entries (sendLatestRows=N).
  [行号] 数据列1, 数据列2, ...
  [行号] 数据列1, 数据列2, ...
```

- 列头使用 **0 基索引**：`[0:列名]`, `[1:列名]`
- 纪要表固定只取最后 10 行
- 非纪要表可配置 `sendLatestRows` 限制行数
- `[行号]` 为在完整数据中的绝对索引

---

## $0 — 表格数据文本（SQLite 模式）

```sql
-- DDL 建表语句 --
-- Note: 表注释
-- INSERT: 插入触发说明
-- UPDATE: 更新触发说明
-- DELETE: 删除触发说明
-- SeedRows: 已提供模板基础数据...

-- 当前数据 (N rows)
-- | col1 | col2 | col3 |
-- | val1 | val2 | val3 |
```

- 使用英文列名（来自 DDL）
- 末尾追加 SQL 编辑格式说明

---

## $1 — 对话内容文本

```
当前最新对话内容:
用户名: 消息内容
角色名: 消息内容
用户名: 消息内容
...
```

- AI 消息可被 `extractTags`/`extractRules`/`excludeTags`/`excludeRules` 过滤
- 用户消息不做过滤

---

## $4 — 世界书内容

由 `getCombinedWorldbookContent_ACU` 生成：
1. 递归触发关键词条目（最多 10 层）
2. 排除插件自管理的条目
3. 按 `position -> depth -> order -> originalIndex` 排序
4. 每个条目输出为 `# comment\ncontent` 格式

---

## $5 — 纪要索引/大纲内容

### 优先路径：纪要索引（向量索引召回结果或世界书条目）
```
## 表格: 纪要索引
Columns: 概要, 编码索引
- [0] 概要: 值 | 编码索引: AM0001
- [1] 概要: 值 | 编码索引: AM0002
```

### 回退路径：总体大纲
```
## 表格: 总体大纲
Columns: 列1, 列2, ...
- [0] 列1: 值 | 列2: 值
```

---

## $6 — 上轮剧情规划数据

从聊天消息的 `extra._acu_plot_content` 字段读取。

---

## $7 — 前文上下文（剧情推进/正文优化）

```
以下是前文的故事发展（AI输出），给你用作参考：
 assistant："消息1"
 assistant："消息2"
```

- 内容经过 HTML 清理（`<br>` → 换行、标签移除、实体解码）
- 可被 `contextExtractTags`/`contextExcludeTags` 过滤
- 默认取最近 10 条 AI 消息

---

## $8 — 用户输入

- 填表场景：手动附加提示（用户在 UI 中输入的额外指令）
- 剧情推进场景：本轮用户输入的消息文本

---

## $U — 用户设定描述

从 `getPersonaDescription_ACU()` 获取，多级 fallback：
1. `SillyTavern.getContext().powerUserSettings`
2. `window.power_user`
3. `SillyTavern_API_ACU.powerUserSettings`

---

## $C — 角色描述

从 `getCharDescription_ACU()` 获取，四级 fallback：
1. `TavernHelper.getCharData('current')`
2. `SillyTavern_API_ACU.characters[this_chid]`
3. `stContext.characters[characterId]`
4. `window.characters[window.this_chid]`

---

## 合并纪要专用

### $A — 需要精简的纪要数据
```
[全局行号] 数据列1, 数据列2, ...
[全局行号] 数据列1, 数据列2, ...
```

### $BASE_DATA — 已精简的基础底稿
```
[0:纪要表]
  Columns: [0:列名1], [1:列名2], ...
  - Note: 表注释
  [行号] 数据列1, 数据列2, ...
```

---

## 向量索引专用

### $RECENT_CONTEXT — 最近对话上下文
```
用户: 用户消息文本
AI: AI消息文本
用户: 用户消息文本
AI: AI消息文本
```

### $SUMMARY_SOURCE_ROWS — 待归档纪要批次
纪要表中按时间选取的较早行数据。
