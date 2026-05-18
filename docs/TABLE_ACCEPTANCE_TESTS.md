# 填表工作台重写 — 验收测试基准

> 创建日期: 2026-05-18
> 关联议题: `PHASE3_ARCHITECTURE.md` §15 "填表工作台重写设计"
> 关联计划: [TABLE_REWRITE_PLAN.md](./TABLE_REWRITE_PLAN.md)
> 状态: 待执行（重写完成后逐项 sign-off）

---

## 1. 用途

本文档是**填表工作台重写的验收基准**。议题 #15 在重写之前必须先把 7 个旧 bug 转成可复现、可验证的测试步骤，重写完毕后逐项 sign-off。**全部 7 个 bug 均通过验证后，议题 #15 才能关闭。**

文档使用方式：
- 重写期间各 Stage 完成后，对应 bug 用本文档"复现步骤"在真实宿主环境中验证
- 每个 bug 完成 sign-off 后在末尾标记 `☑ Verified`，并填入验证版本号 + 验证日期
- 重写过程中若发现**新 bug**，**追加**到本文档第 5 节（不另起文档）

---

## 2. 测试环境约定

| 项 | 要求 |
|---|---|
| 宿主 | SillyTavern 主线版（自带 TavernHelper 扩展） |
| 插件 | YouYou Toolkit 重写后的当前版本 |
| 浏览器 | Chrome / Edge（用于 DevTools 验证 storage 与日志） |
| Provider 模式 | 同时验证 **Authority 模式**（如已安装 ST-Delegation-of-authority）与 **Fallback 模式**（未安装时） |
| API 接入 | 至少 1 个可用的 chat-completions 兼容 API 预设（用于 AI 链端到端验证） |

**Provider 模式说明**：议题 #9 决定填表使用 `IToolDataProvider`（Authority 优先 + JSON Fallback）。验收时**两种 Provider 都要走一遍**，因为：
- Authority 走真 SQLite，隔离/事务/PRIMARY KEY 行为由 Rust core 保证
- Fallback 走 storage-service 的嵌套 JSON 对象，所有 "WHERE chat_id" 语义需要在 JS 侧手工实现，更容易出 bug

---

## 3. 测试数据准备

### 3.1 至少 3 个 chat

| Chat | 名称建议 | 用途 |
|---|---|---|
| chat-α | "测试 Chat α" | 主测试 chat，准备完整数据 |
| chat-β | "测试 Chat β" | 验证切 chat 隔离（应与 α 完全独立） |
| chat-γ | "空 Chat γ" | 全新建的空 chat，**绝对不准看到 α/β 的数据** |

### 3.2 每个 chat 至少 2 条 assistant 消息

- chat-α 与 chat-β 各发送 2 轮"用户→AI"对话，保证各有至少 2 条 assistant 消息（用于 swipe / 历史回溯验证）
- chat-γ 保持空白（验证空 chat 不污染）

### 3.3 两张表 schema：纪要表 + 角色表

| Schema | 名称 | 列定义 | 用途 |
|---|---|---|---|
| schema-summary | 纪要表 | row_id, 时间, 事件摘要 | 用于 B2 重名防重 |
| schema-character | 角色表 | row_id, 角色名, 当前状态, 备注 | 用于 A 系列 chat 隔离验证 |

两张表都设为**默认激活**（`default_active = true`），保证新 chat 自动看到这两张表的空骨架。

### 3.4 准备至少 1 个测试用 worldbook

- 用于 A2 跨 chat 污染验证
- 建议命名 `acceptance-test-worldbook`

---

## 4. 七大 Bug 验收测试

> 记号约定：
> - "本地存储"指 Provider 实际持久化位置（Authority = SQLite 表行；Fallback = storage-service JSON 对象树）
> - 验证时建议同时打开 DevTools → Application → Local Storage / IndexedDB 与 Console 观察日志
> - 所有"立即检查 storage" 步骤都允许使用 `window.YouYouToolkit` 暴露的诊断 API（如已暴露）或直接读 `IToolDataProvider.query(...)`

---

### A1 — 切 chat 写回目标不变

**现象描述**
用户在 chat-α 配置好的世界书写回目标（如 `acceptance-test-worldbook`），切换到 chat-β 后，工作台仍显示 chat-α 的写回目标；触发填表 / 世界书同步时，数据被写到 chat-α 的目标里，导致两个 chat 的世界书目标互相串。

**复现步骤**
1. 打开 chat-α，进入"填表工作台"
2. 在工作台顶部"写回目标"配置中，选择 `acceptance-test-worldbook` 为该 chat 的写回 worldbook
3. 触发一次填表（或手动保存写回目标），确认配置已持久化
4. 切换到 chat-β
5. 观察工作台顶部"写回目标"是否仍显示 `acceptance-test-worldbook`
6. 在 chat-β 选择**另一个** worldbook（如 `chat-beta-worldbook`）作为写回目标
7. 切回 chat-α，观察写回目标是否仍是 `acceptance-test-worldbook`（不应被 β 覆盖）

**问题根因**
旧实现把"写回目标"作为全局单一字段持久化（不按 chat_id 分区），切 chat 时未重新加载该 chat 自己的目标，导致最后写入者覆盖全局。shujuku 的解决方式是把 `table_writeback_target` 按 `chat_id` 主键存储，切 chat 自然换。

**期望行为**
- chat-α 的写回目标始终是 `acceptance-test-worldbook`
- chat-β 的写回目标始终是 `chat-beta-worldbook`
- 切换 chat 时 UI 立即刷新为该 chat 的目标
- 即使 chat-β 改了写回目标，也绝不会影响 chat-α

**自动化验证（如可能）**
- 通过 `IToolDataProvider.query('SELECT * FROM table_writeback_target WHERE chat_id = ?', [chatAId])` 应返回 α 的目标
- 同上对 β 查询返回 β 的目标
- 对 chat-γ 查询应返回空（未配置过）

**手动验证清单**
- [ ] 在 SillyTavern + TavernHelper 中复现现象（重写前应能复现，重写后应不能）
- [ ] α 与 β 写回目标互不影响
- [ ] 切 chat 后 UI 立即刷新到该 chat 的目标
- [ ] 重启 SillyTavern 后，α 与 β 的目标各自保持
- [ ] Authority 模式 + Fallback 模式两种 Provider 都验证一次
- [ ] 本地存储中 `table_writeback_target` 表 / JSON 节点按 chat_id 分区

**Sign-off 状态**: ☐ Pending

---

### A2 — 世界书条目跨 chat 污染

**现象描述**
chat-α 把表格数据同步到 worldbook 后，切换到 chat-β 再触发同步，发现 β 的条目把 α 的条目覆盖了；或 β 的同步条目被注入到 α 的对话上下文里。归根结底是世界书条目没有按 chatId 区分归属。

**复现步骤**
1. 在 chat-α 中给"角色表"添加 2 行数据（如：张三 / 李四）
2. 触发"同步到世界书"（写回 `acceptance-test-worldbook`）
3. 打开 `acceptance-test-worldbook` 条目列表，记录条目数量与 comment 字段
4. 切换到 chat-β
5. 在 chat-β 的"角色表"中添加另外 2 行数据（如：王五 / 赵六）
6. 触发"同步到世界书"
7. 重新打开 `acceptance-test-worldbook`，检查：
   - α 写入的 4 行（张三 / 李四）是否仍存在
   - β 写入的 4 行（王五 / 赵六）是否单独存在
   - 每个条目的 comment 是否带 `[YY:chatId={具体id}]` 标记
8. 切回 chat-α，触发"从世界书重新加载"，确认只看到 α 的数据

**问题根因**
旧实现写世界书条目时不带 chatId 归属标记，多个 chat 用同一本 worldbook 时条目互相覆盖；同步逻辑也没有 `WHERE chatId` 过滤，跨 chat 读到别人的条目。shujuku 的解决方式是 entry comment 必带 `[YY:chatId={chat_id}]` 前缀，sync 写入 / 读取都严格按 chatId 过滤。

**期望行为**
- 同步到世界书的条目，comment 字段都带 `[YY:chatId={chat_id}]` 标记
- chat-α 同步只读 / 写 α 的条目（comment 匹配 α 的 chatId）
- chat-β 同步只读 / 写 β 的条目
- α 和 β 的数据可在同一本 worldbook 中**并存**而互不污染
- 注入到对话上下文时，只注入当前 chat 的条目

**自动化验证（如可能）**
- 同步后通过 `TavernHelper.getLorebookEntries('acceptance-test-worldbook')` 检查所有 entry 的 comment 字段是否带 `[YY:chatId=...]`
- 用 `entries.filter(e => e.comment.includes('[YY:chatId='+chatAId+']'))` 应只返回 α 的条目
- 同上对 β 验证

**手动验证清单**
- [ ] 在 SillyTavern + TavernHelper 中复现现象（重写前应能复现）
- [ ] 同步后每条 entry 的 comment 都带 `[YY:chatId=...]`
- [ ] α 与 β 数据在同一本 worldbook 中并存且互不污染
- [ ] 注入上下文时，只注入当前 chat 的条目（用 prompt 预览验证）
- [ ] 删除 α 的某条数据，触发同步，β 的对应条目不受影响
- [ ] Authority 模式 + Fallback 模式两种 Provider 都验证一次

**Sign-off 状态**: ☐ Pending

---

### A3 — 空 chat 看到其他数据

**现象描述**
全新建的 chat-γ（无任何历史消息、未做任何填表操作），打开填表工作台时，看到的是 chat-α 或 chat-β 残留的表格行数据，而非空表骨架。

**复现步骤**
1. 在 chat-α 与 chat-β 中分别填写若干行数据（用 A2 步骤的数据即可）
2. 新建一个空 chat-γ
3. 立即打开填表工作台
4. 观察"角色表"与"纪要表"的行数据区是否为空（仅显示表头骨架）
5. 检查左侧栏表列表显示的是否是该 chat 自己的激活表（应来自 `default_active`，而非 α/β 的运行时状态）

**问题根因**
旧实现的状态查询不带 `WHERE chat_id`，把所有 chat 的行数据混在一个全局数组里返回，新 chat 看到的是最近一次写入的残留。shujuku 的解决方式是所有查询都 `WHERE chat_id = ?`，新 chat 因为没有任何记录，返回空即可。

**期望行为**
- 新建 chat 打开工作台立即显示空表骨架（仅有表头行）
- 左侧栏显示该 chat 自己的激活表（默认激活的两张表，均为空）
- 不残留任何来自其他 chat 的行数据
- 切回 α / β 后，α / β 的数据应仍然完整可见

**自动化验证（如可能）**
- `IToolDataProvider.query('SELECT COUNT(*) FROM table_rows WHERE chat_id = ?', [chatGammaId])` 应返回 `0`
- 工作台数据模式渲染应在 0ms 内拿到空数组

**手动验证清单**
- [ ] 在 SillyTavern + TavernHelper 中复现现象
- [ ] 新建 chat-γ 后，工作台数据模式行数为 0
- [ ] 表列表显示该 chat 的激活表（默认两张表）
- [ ] 切回 α / β 后数据完整保留
- [ ] 在 chat-γ 中填写一行后，再切到 α，α 不应被污染
- [ ] Authority 模式 + Fallback 模式两种 Provider 都验证一次

**Sign-off 状态**: ☐ Pending

---

### B1 — 第一张表被替换

**现象描述**
工作台左侧栏有多张表，用户点击第二张表查看后，再新建或加载某张表，发现第一张表的数据被新表覆盖（或第一张表从列表中消失）。表列表的顺序也异常。

**复现步骤**
1. 在 chat-α 中创建 3 张激活表（纪要表 / 角色表 / 关系表）
2. 给每张表分别填入 1~2 行数据
3. 在左侧栏点击第 2 张表"角色表"使其成为"当前激活表"
4. 通过"加载模板"或"新建表"再添加第 4 张表
5. 观察：
   - 第 1 张"纪要表"的数据是否仍在
   - 表列表顺序是否为 `纪要表 → 角色表 → 关系表 → 新表`（按 order_no 升序）
   - "当前激活表"是否被错误地写入到了"第 1 张"的位置

**问题根因**
旧实现把"当前激活表"作为数据字段持久化到状态本体（如 `activeSheetIndex = 0` 这种用整数索引存的方式），新建表时写到索引 0 会替换掉真正的第一张表；列表也没有稳定的 `order_no` 字段。shujuku 的解决方式是"当前激活表"是纯 UI 状态（不进数据库），表列表按 `order_no` 排序。

**期望行为**
- "当前激活表"只是 UI 高亮状态，不影响数据存储
- 新建表追加到 `order_no = MAX(order_no) + 1`，永远在末尾
- 第 1 张表数据永远不会被新建表覆盖
- 上移 / 下移操作只改 `order_no`，不影响 schema_id 与数据归属

**自动化验证（如可能）**
- `IToolDataProvider.query('SELECT schema_id, order_no FROM table_schemas ORDER BY order_no')` 应返回 4 行，order_no 严格升序
- 新建表后再次查询，第 4 行的 order_no 应是最大值

**手动验证清单**
- [ ] 在 SillyTavern + TavernHelper 中复现现象（重写前应能复现）
- [ ] 新建表追加到末尾，从不替换已有表
- [ ] 切换"当前激活表"不写入任何持久化数据
- [ ] 重启 SillyTavern 后，表列表顺序保持
- [ ] 上移 / 下移操作只改 order_no，数据归属正确
- [ ] Authority 模式 + Fallback 模式两种 Provider 都验证一次

**Sign-off 状态**: ☐ Pending

---

### B2 — 两个纪要表

**现象描述**
用户在工作台中"加载模板"→"纪要表"，如果当前 chat 已经有一张纪要表，操作完成后列表中出现**两张同名纪要表**（schema_id 重复或被错误地分配了两个 schema），数据各填一半。

**复现步骤**
1. 在 chat-α 中确保已有一张"纪要表"（schema_id = `schema-summary`）
2. 给纪要表填入 1 行数据
3. 打开"模板预设"下拉，再次选择"纪要表"模板加载
4. 观察左侧栏是否变成两张纪要表
5. 若变成两张，分别查看：
   - schema_id 是相同还是不同
   - 原数据在哪一张里
   - 新加载的那张是否覆盖了原 schema 定义

**问题根因**
旧实现加载模板时不检查 schema_id 是否已存在，直接 INSERT 一条新记录；schema_id 也没有 PRIMARY KEY 约束。shujuku 的解决方式是 schema_id 设为 PRIMARY KEY 防重，加载前先 `SELECT EXISTS`，若已存在则给用户提示"覆盖 / 跳过 / 重命名"三个选项（最简实现可只做"跳过+提示"）。

**期望行为**
- 加载同名模板时检查 schema_id 是否已存在
- 已存在时弹出提示（至少"已存在，已跳过加载"toast），**不重复插入**
- 数据库层面 schema_id PRIMARY KEY 保证不可能出现两条同 id 的 schema
- 列表中永远不会出现两张完全同 id 的表

**自动化验证（如可能）**
- `IToolDataProvider.query('SELECT schema_id, COUNT(*) FROM table_schemas WHERE chat_id = ? GROUP BY schema_id HAVING COUNT(*) > 1', [chatAId])` 应返回空集
- 重复加载同模板时，应有 toast 或日志记录"already exists, skipped"

**手动验证清单**
- [ ] 在 SillyTavern + TavernHelper 中复现现象（重写前应能复现）
- [ ] 重复加载同模板后，左侧栏仍只有一张纪要表
- [ ] 原数据保留，未被覆盖
- [ ] toast / 日志正确提示"已存在"
- [ ] Authority 模式 PRIMARY KEY 约束生效（Authority 层会抛 UNIQUE 错误）
- [ ] Fallback 模式 JS 侧 SELECT 检查生效
- [ ] Authority + Fallback 两种 Provider 都验证一次

**Sign-off 状态**: ☐ Pending

---

### C1 — 重填工具台数据丢

**现象描述**
用户使用"重填"功能（清空当前楼层数据→重新走 AI 链生成）后，发现工作台原本的数据全部消失，新数据也没有写入（写回中间步骤失败导致两边都是空）。

**复现步骤**
1. 在 chat-α 的最新 assistant 消息上，已有一些表格行数据（如角色表 3 行）
2. 触发"重填工具台"操作（议题 #15 修订计划 §5 中的 `clearBeforeUpdate` 三段式）
3. 在 AI 调用过程中**人为中断**（如关闭页面、切断网络、或让 AI 返回非法 JSON）
4. 观察：
   - 原数据是否还在
   - 工作台是否变成空
   - 世界书条目是否被清空
   - 重新打开工作台后数据状态是否一致

**问题根因**
旧实现的写回链没有事务保护：先调 `clear` 清空本地数据，再调 AI 生成，再写回 + 同步世界书是**多步非原子操作**。任何一步失败都会留下半成品状态（本地清了但 worldbook 还在，或 worldbook 同步了但本地没写入）。shujuku 的解决方式是 writeback 走事务（`BEGIN TRANSACTION ... COMMIT`），本地写 + worldbook 同步必须同事务，失败则整体回滚。

**期望行为**
- "重填"过程中任何步骤失败，本地数据与 worldbook 状态都应回到**重填前的快照**
- 用户看不到"半空"或"半同步"的中间态
- 失败必须有明确 toast + 日志（不允许静默）
- 成功后本地数据 + worldbook 同步生效，两者一致

**自动化验证（如可能）**
- 在 `table-writeback-service.js` 的事务包裹处加日志，验证 `BEGIN` 与 `COMMIT`/`ROLLBACK` 成对出现
- 模拟 AI 失败（mock 抛错），重填后查询本地行数应等于重填前的行数
- Authority 模式可观察 SQLite 事务日志

**手动验证清单**
- [ ] 在 SillyTavern + TavernHelper 中复现现象（重写前应能复现）
- [ ] AI 返回错误时，本地数据保留
- [ ] AI 中断（网络断开 / 关闭页面）时，本地数据保留
- [ ] 成功完成后，本地数据 + worldbook 完全一致
- [ ] 失败有 toast 提示 + 日志记录（不静默）
- [ ] Authority 模式 + Fallback 模式两种 Provider 都验证一次
- [ ] Fallback 模式下的"事务"等价语义（JSON 快照 + 失败回滚）正确生效

**Sign-off 状态**: ☐ Pending

---

### C2 — 重填行数没增加

**现象描述**
"重填"操作完成、AI 返回了大量 `insertRow` 指令，工作台行数却没有按预期增加，或只增加了 1~2 行（远少于 AI 输出）。控制台没有任何错误提示。

**复现步骤**
1. 在 chat-α 的最新 assistant 消息上准备少量数据
2. 在工作台 prompt 中让 AI 输出 5+ 条 `insertRow` 指令的填表响应
3. 触发"重填"
4. 等待 AI 完成响应
5. 检查工作台行数是否等于 AI 输出的 insertRow 数量
6. 检查 Console 是否有警告 / 错误日志
7. 检查日志面板是否有 "JSON parse failed" / "row skipped" 之类的条目

**问题根因**
旧实现的 parser 主链没有接通增量解析（议题 #15 修订计划 §6 task #21），并且 JSON 解析失败时被 `try/catch` 静默吞掉（用户反馈 `feedback_control_try_catch_must_log`）。表现为 AI 输出明明有，但解析失败就丢弃，且无任何提示。shujuku 的解决方式是：parser 主链必须接通 `parseIncrementalEdits`、`applyEdits` 按 AI 原始顺序应用、JSON 解析失败必须立即 toast + 写日志，禁止静默吞错。

**期望行为**
- AI 输出的每条 insertRow 都被独立解析并应用
- 单条解析失败不影响其他条目（单行跳过 + warn 日志）
- 任何解析失败都必须：
  - 立即弹 toast（如"第 3 条指令解析失败"）
  - 写入日志面板（含原始 raw 片段）
  - 不静默吞错
- 最终行数应严格等于成功解析的 insertRow 数量（失败的有日志可查）

**自动化验证（如可能）**
- 准备一个 mock AI 响应（5 条 insertRow，其中第 3 条是非法 JSON）
- 触发应用，验证：
  - 行数增加 4 行（其余 4 条成功）
  - 日志面板出现 1 条 warn "row 3 parse failed"
  - toast 出现
- 验证 `applyEdits` 不重排顺序（按 AI 原始顺序）

**手动验证清单**
- [ ] 在 SillyTavern + TavernHelper 中复现现象（重写前应能复现）
- [ ] AI 输出 N 条全合法 insertRow，工作台行数增加 N
- [ ] AI 输出含非法 JSON 行时，其他合法行仍然成功
- [ ] 解析失败有 toast 提示
- [ ] 解析失败有日志记录（含 raw 片段）
- [ ] applyEdits 顺序是 AI 原始顺序（不重排为 update→insert→delete）
- [ ] parsePatch 主链已接通增量解析（不只走全量 JSON）
- [ ] Authority 模式 + Fallback 模式两种 Provider 都验证一次

**Sign-off 状态**: ☐ Pending

---

## 5. 重写期间新发现的 bug

> 重写过程中若发现本文档 4 节未覆盖的新 bug，**追加到本节而非另起文档**。
> 追加格式参考第 4 节的 7 项结构。

### N1 — 模板（待填写）

**现象描述**

**复现步骤**

**问题根因**

**期望行为**

**自动化验证（如可能）**

**手动验证清单**
- [ ] ...

**Sign-off 状态**: ☐ Pending

---

## 6. 全部 sign-off 完成准则

| 准则 | 状态 |
|---|---|
| A1 sign-off | ☐ |
| A2 sign-off | ☐ |
| A3 sign-off | ☐ |
| B1 sign-off | ☐ |
| B2 sign-off | ☐ |
| C1 sign-off | ☐ |
| C2 sign-off | ☐ |
| 第 5 节追加 bug 全部 sign-off | ☐ |
| Authority 模式回归 | ☐ |
| Fallback 模式回归 | ☐ |
| Authority 与 Fallback 对照行为一致（一致性验证） | ☐ |

**全部 7 个原 bug + 第 5 节追加 bug 均 sign-off 后，议题 #15 才能 close。**

每个 bug sign-off 时建议在该 bug 末尾的"Sign-off 状态"行附上：
- 验证版本号（如 `v1.0.180`）
- 验证日期（如 `2026-05-30`）
- 验证人（如 `@heis1696`）
- 备注（如"Fallback 模式略慢但正确"）

示例：
```
**Sign-off 状态**: ☑ Verified — v1.0.180 / 2026-05-30 / @heis1696
```

---

## 7. 关联文档

- [TABLE_REWRITE_PLAN.md](./TABLE_REWRITE_PLAN.md) — 重写计划全貌（19 项任务 + 优先级 + Gap 表）
- [PHASE3_ARCHITECTURE.md](./PHASE3_ARCHITECTURE.md) §15 — 议题 #15 原始决策与勘误对照
- `Reference/shujuku-spv3.7/` — 对标参考实现
- [FRAMEWORK_ARCHITECTURE.md](./FRAMEWORK_ARCHITECTURE.md) — 框架架构总览
- [CHANGELOG.md](./CHANGELOG.md) — 版本变更历史
