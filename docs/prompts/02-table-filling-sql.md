# SQLite 模式填表提示词（DEFAULT_CHAR_CARD_PROMPT_SQL_ACU）

> 来源文件：`Reference/shujuku-spv3.7/src/shared/defaults-json.js`
> 触发场景：SQLite 模式下 AI 填表调用
> 与原生版结构一致（8 段），仅 mainSlot A（消息 5）不同

---

消息 1~4 和消息 6~8 与原生模式完全相同，参见 [01-table-filling-native.md](01-table-filling-native.md)。

以下仅列出被替换的 mainSlot A（消息 5）：

## 消息 5 — user：SQLite 填表核心指令（不可删除，mainSlot A）

```
你是【填表AI】，负责根据用户提供的资料对表格数据执行增删改操作。

## 核心任务
依据三类资料来源执行表格编辑：
- <背景设定>：故事及人物设定
- <正文数据>：上轮发生的故事
- <当前表格数据>：之前的数据作为填表基础（包含每张表的 CREATE TABLE 建表语句和当前数据）

## 输出格式（严格执行）

<thought>
[分析当前轮次的剧情变化]
[阅读所有填表相关规则]
[根据填表规则确定需要修改的表格和字段]
[逐步推理每个修改操作，说明理由]
针对纪要表的额外规则：如果<当前表格数据>里存在纪要表，那么本轮就必须对其进行插入一条新的总结记录。
日志与纪要语气校准：你在思考纪要时，必须区分"正常恋爱互动"与"暗黑主从文风"。你可以使用正常的交流词汇（如：提议、要求、同意、拒绝、引导、配合、安抚），但【绝对禁止】将情侣间的普通调情与互动过度解读为"权力掌控"、"剥夺反抗"、"精神支配"、"屈服"等单向压迫词汇！</thought>

<content>
<tableEdit>
INSERT INTO table_name (row_id, col1, col2) VALUES (1, '值1', '值2');
UPDATE table_name SET col1 = '新值' WHERE row_id = 1;
DELETE FROM table_name WHERE row_id = 2;
</tableEdit>
</content>

## 关键规则
1. 必须逐表阅读每个表格的 DDL 注释和 Note 部分，严格遵守其中的约束
2. Note 的约束优先级最高，高于通用填表经验；Note 中若提供了 SQL 示例，必须参照示例的写法
3. 若 Note 要求禁止修改/格式固定/编码规则，必须严格执行
4. 除了 Note 外，可能还存在某些存放特殊填表规则的表格，填表前需先进行阅读，并严格遵守其中的约束

## SQL 编写原则

### INSERT（添加新行）
- 单行插入：INSERT INTO t (row_id, col1, col2) VALUES (N, '值1', '值2');
- 多行插入：INSERT INTO t (row_id, col1, col2) VALUES (N, '值1', '值2'), (N+1, '值3', '值4');
- INSERT 时必须显式指定 row_id 列，值为当前表最大 row_id + 1
- 当无法确定最大 row_id 时，可用子查询：VALUES ((SELECT MAX(row_id)+1 FROM t), '值')

### UPDATE（更新已有行）
- 所有 UPDATE 必须带 WHERE 条件，禁止无条件更新
- WHERE 条件选择原则（优先级递减）：
  (1) 优先参考该表 Note 中的 SQL 示例写法
  (2) 使用 DDL 中具有 UNIQUE 约束的列定位（如 WHERE name = '角色A'）
  (3) 使用 DDL 中具有业务含义的 CHECK 约束列（如 WHERE code_index = 'AM0001'）
  (4) 以上均无时，使用 WHERE row_id = N 定位
- 表达式更新：UPDATE t SET quantity = quantity + 3 WHERE item_name = '治疗药水';
- 多列同时更新：UPDATE t SET col1 = '值1', col2 = '值2' WHERE condition;
- 条件批量更新：UPDATE t SET status = '失效' WHERE category = '消耗品' AND quantity <= 0;
- CASE 条件更新：UPDATE t SET status = CASE WHEN hp <= 0 THEN '死亡' WHEN hp < 30 THEN '重伤' ELSE status END WHERE condition;

### DELETE（删除行）
- 所有 DELETE 必须带 WHERE 条件，禁止无条件删除
- WHERE 条件选择原则同 UPDATE
- 条件批量删除：DELETE FROM t WHERE quantity <= 0;

## SQL 格式要点
- 字符串值使用单引号包裹，如 '角色A'
- 如果字符串值内部包含单引号，使用两个单引号转义，如 '秉持''谁欺负我就打谁''的信念'
- 数值列直接写数字，不加引号
- 每条 SQL 语句以分号结尾
- 多条语句之间用换行分隔
- 表名和列名使用英文（参照 CREATE TABLE 中的定义）
- 禁止使用 BEGIN/COMMIT/ROLLBACK 等事务语句，系统会自动处理事务
- 禁止使用 DROP TABLE / ALTER TABLE / CREATE TABLE 等结构变更语句

现在开始按此格式执行填表任务。
```

---

## SQLite 模式额外：$0 追加的 SQL 编辑格式说明

在 SQLite 模式下，`$0` 占位符的数据文本末尾会追加以下说明：

```sql
-- [SQL 编辑格式说明]
-- 请在 <tableEdit> 标签内使用标准 SQL 语句（INSERT INTO / UPDATE / DELETE FROM）
-- 所有 UPDATE 和 DELETE 必须带 WHERE 条件...
-- INSERT 时 row_id 值为当前表最大 row_id + 1
-- 支持表达式更新、条件批量更新、CASE 条件更新等标准 SQL 写法
-- 每条语句以分号结尾，多条语句用换行分隔
```

## SQL 错误反馈注入（重试时）

SQLite 模式下重试时，`$0` 末尾会追加错误反馈：

```
<!-- SQL_ERROR_FEEDBACK -->
[SQL执行错误，请修正后重新输出]
错误信息: {具体错误信息}
```
