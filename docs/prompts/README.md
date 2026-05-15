# 提示词索引

本目录包含 SP·数据库 III (shujuku-spv3.7) 项目中所有 AI 提示词的完整提取。

## 文件清单

| 文件 | 内容 |
|------|------|
| [01-table-filling-native.md](01-table-filling-native.md) | 原生模式填表提示词（insertRow DSL 格式） |
| [02-table-filling-sql.md](02-table-filling-sql.md) | SQLite 模式填表提示词（SQL 格式） |
| [03-plot-progression.md](03-plot-progression.md) | 剧情推进提示词组（recall + supplement 双系统） |
| [04-content-optimization.md](04-content-optimization.md) | 正文优化提示词组（JSON 输出格式） |
| [05-summary-merge-native.md](05-summary-merge-native.md) | 纪要合并提示词 — DSL 版（CoAT 线性化精简推理） |
| [06-summary-merge-sql.md](06-summary-merge-sql.md) | 纪要合并提示词 — SQL 版 |
| [07-vector-keyword.md](07-vector-keyword.md) | 交火模式关键词生成提示词 |
| [08-vector-remote-memory.md](08-vector-remote-memory.md) | 交火模式远记忆归档提示词 |
| [09-worldbook-injection.md](09-worldbook-injection.md) | 世界书注入模板（Wrapper/Memory 标签） |
| [10-data-formatting.md](10-data-formatting.md) | 数据格式化模板（$0/$1/$7 等占位符数据格式） |
| [11-table-sourcedata.md](11-table-sourcedata.md) | 8 张默认表的 sourceData 指令（note/触发器/DDL） |
| [12-placeholder-reference.md](12-placeholder-reference.md) | 占位符速查表（所有 $ 变量及其数据来源） |
