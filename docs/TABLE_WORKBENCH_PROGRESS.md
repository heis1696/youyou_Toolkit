# 填表模块施工进度

## 模块概述

填表工作台（Table Workbench）是 YouYou Toolkit 的结构化数据提取系统，使用 AI 自动填充和维护表格状态，并支持将数据同步到世界书条目。

## 架构

```
table-schema-service      配置持久化、schema 规范化、默认模板
table-update-service      执行主链：构建请求 → 解析 AI 响应 → 应用行操作
table-state-service       按消息 slot 绑定的状态读写
table-writeback-service   提交状态 + 正文镜像 + 触发世界书同步
table-target-resolver     解析目标 assistant 消息/slot
table-guide-service       聊天级配置覆盖（scope、worldbookSync）
table-scope-service       runScope 执行范围（enabled/current/selected）
table-lock-service        字段/行锁定防 AI 覆盖
table-diff-service        前后差异计算
table-history-service     历史状态解析（跨消息/swipe 回溯）
table-template-service    模板库 CRUD、导入导出、内置默认
table-provider-service    解析有效 API provider
table-json-sanitizer      AI JSON 响应清洗
table-types               共享常量、类型构造器、ID 工具

table-worldbook-sync-service    世界书条目同步（Wrapper + Order + chatId 隔离）
table-worldbook-order-service   Order 碰撞检测 + 连续分配
table-worldbook-placement-service  position/depth 规范化
```

## 已完成

### 核心引擎（v1.0.77 ~ v1.0.111）
- [x] 多表定义（schema + AI 指令）
- [x] 增量/全量双模式解析
- [x] 按 slot 绑定的状态读写
- [x] 历史状态跨消息回溯
- [x] 自动填表链（automation service 集成）
- [x] 正文镜像写回
- [x] runScope 执行范围控制
- [x] 字段/行锁定

### 世界书同步 Phase 1（v1.0.130 ~ v1.0.136）
- [x] 多条目注入（Wrapper 包裹 + 全局数据 + 自定义条目）
- [x] Order 碰撞检测与连续分配
- [x] Placement 规范化（position/depth/order）
- [x] exportConfig 基础字段（enabled/entryName/entryType/entryPlacement）
- [x] 旧条目自动清理
- [x] chatId 隔离：comment 前缀加入 chatId，同世界书内不同聊天互不干扰
- [x] per-chat worldbookSync 配置：targetBook 按 chat 存储在 guide 中
- [x] 配置保存时清除数据行：防止跨聊天数据污染
- [x] mergeTablesByScope 位置映射修复：scope=current 时 AI 输出正确回填到目标表

### UI
- [x] 表格配置编辑器（列/行/指令）
- [x] 表格状态实时合并显示（mergeLiveRowsIntoConfig）
- [x] Dashboard 概览面板
- [x] 模板库管理

## 待施工

### 世界书同步 Phase 2
- [ ] keyword 触发类型：entryType='keyword' 时支持 keys 字段
- [ ] splitByRow：每个表按行拆分为独立条目
- [ ] injectionTemplate：注入模板（支持 $1 占位符）
- [ ] exportConfig UI 面板

### 世界书同步 Phase 3
- [ ] Entry lifecycle（knownEntryNames 跟踪，diff-before-update）
- [ ] wrapperConfig UI 面板
- [ ] worldbookSync target 选择 UI（per-chat）

### 数据层
- [ ] 首次一楼场景加固：AI 上下文不足时的优雅降级
- [ ] 配置模板与运行时状态的清晰分离（当前 UI 的 lastLiveConfig 混用模式）

### 低优先级
- [ ] 向量索引 / 0TK 模式
- [ ] 数据导出（CSV/JSON）
- [ ] 多世界书同步 target

## 已知问题

| 问题 | 状态 | 说明 |
|------|------|------|
| testingcf @latest CDN 缓存 | 待解决 | 国内镜像缓存刷新不可控，临时用 @v{tag} |
| 首次一楼填表数据可能为空 | 观察中 | 一楼上下文太少，AI 可能返回无效 JSON |
| 旧版本升级后 worldbookSync 配置丢失 | 需验证 | per-chat guide 中没有 worldbookSync 时回退到全局默认 |

## 关键设计决策

### 配置存储分离
- **全局配置**（extensionSettings）：表 schema 定义、prompt 模板、API 配置、运行时统计
- **per-chat guide**（guideMap）：scope、worldbookSync — 每个聊天独立覆盖
- **per-message state**（chat message metadata）：实际数据行 — 按 slot 绑定

### 世界书条目 chatId 隔离
- comment 格式：`YYT-[chatId]-全局数据`、`YYT-[chatId]-Wrapper-Start`
- cleanup 只清理当前 chatId 前缀的条目，不影响其他聊天
- `resolveCurrentChatId()` 依次尝试：TavernHelper → Silvy → chat_metadata → this_chid → name1

### mergeTablesByScope 映射策略
1. 先按 ID 精确匹配
2. 未匹配的 AI 输出按允许编辑表的顺序依次回填
3. 避免了 scope=current 时单表 AI 输出被错误写入第一张表
