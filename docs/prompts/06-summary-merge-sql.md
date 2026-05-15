# 纪要合并提示词 — SQL 版（DEFAULT_MERGE_SUMMARY_PROMPT_SQL_ACU）

> 来源文件：`Reference/shujuku-spv3.7/src/shared/defaults-json.js`
> 触发场景：SQLite 模式下自动合并纪要
> 与 DSL 版结构完全一致，仅 C8 约束和输出格式改为 SQL INSERT 语句

---

以下仅列出与 [05-summary-merge-native.md](05-summary-merge-native.md) 不同的部分。

## 替换的 [Core Tables] 部分

```
[Core Tables]
你需要维护一个表格：
1. **纪要表 (chronicle)**：记录关键剧情纪要，包含以下列：
   - row_id: 行号（INTEGER PRIMARY KEY）
   - time_span: 时间跨度 - 本轮事件发生的精确时间范围
   - location: 地点 - 本轮事件发生的地点，从大到小描述
   - chronicle_entry: 纪要 - 以第三方视角客观记录本轮事件（≥300字）
   - summary: 概要 - 一句话概括纪要内容（≤30字）
   - code_index: 编码索引 - 格式为 AMXXXX，XXXX从0001递增
```

## 替换的 C8 约束

```
C8-指令格式：仅使用 INSERT INTO 语句，字符串值使用单引号包裹，每条语句以分号结尾。
```

## 替换的 Step 5 审计项

```
· C8：INSERT INTO 语法是否正确？字符串值是否用单引号包裹？
```

## 替换的 [Output Format]

```
<thought>
（精炼的推理过程，按 Round/Step 展开：
- Step 1 Analyze: 数据盘点结论
- Step 2 Draft: 2~3 个策略草稿
- Step 3 Select: 选择理由
- Step 4 Expand: 精简执行要点（无需列出完整内容）
- Step 5 Audit: 逐条约束核查结果（通过/不通过）
- Step 6 Score: g1~g5 打分 → Fg 值 → 判定
不得写成冗长内心独白。）
</thought>

<tableEdit>
INSERT INTO chronicle (row_id, time_span, location, chronicle_entry, summary, code_index) VALUES (1, '时间跨度', '地点', '纪要内容（≥300字）', '概要（≤30字）', 'AM0001');

...（生成$TARGET_COUNT条的 INSERT 语句）
</tableEdit>
```

## 替换的 [Critical Reminders]

```
1. 使用标准 SQL INSERT INTO 语句，表名为 chronicle。
2. 字符串值使用单引号包裹，如果字符串内部包含单引号，使用两个单引号转义。
3. 纪要内容（chronicle_entry）需 ≥300 字，概要（summary）需 ≤30 字。
4. 纯文本输出，严禁使用 markdown 代码块包裹整个输出。
5. 严禁在 <tableEdit> 块外添加任何解释性文字。
6. 每条 INSERT 语句以分号结尾，多条语句之间用换行分隔。
7. row_id 从 1 开始递增。
```
