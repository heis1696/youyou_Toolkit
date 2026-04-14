# 填表工作台当前阶段总结

本文档用于快速说明 `tableWorkbench` 当前处于什么阶段、已经完成了什么、还缺什么，以及下一轮更适合优先做什么。

如果需要完整边界与详细事实，请同时阅读：
- `docs/TABLE_WORKBENCH_IMPLEMENTATION_DRAFT.md`
- `docs/ARCHITECTURE_ANALYSIS.md`
- `docs/CHANGELOG.md`

---

## 1. 当前阶段结论

`tableWorkbench` 当前已经进入：

> **“结构化表定义编辑器 MVP + 稳定手动填表主链”**

它已经不再是：
- 纸面草案
- `tools` 里的子页签
- 只能手写 JSON 的临时试验入口

但它也还不是：
- 正式 visualizer
- 完整模板系统
- 完整历史/导入导出工作台
- 自动填表系统

---

## 2. 已完成内容

### 2.1 页面与接线

- `tableWorkbench` 已是独立顶级标签页
- popup shell 已完成独立路由接线
- 相关 UI / domain 模块已接入主线

### 2.2 手动填表主链

当前最小手动链已经可用：

```text
结构化编辑器 -> compile 为 runtime tables -> 保存配置 -> 手动执行
-> fresh target resolve -> load state/template -> API -> parse tables JSON
-> structured commit -> optional mirror writeback
```

当前这条链已经具备：
- fresh target resolve
- revision-safe commit
- `lastResolvedTarget / lastCommittedTarget` 分离
- 结构化 state 写回
- 可选正文镜像

### 2.3 表定义 authoring

当前已经有结构化表定义编辑器 MVP，不再要求直接手写 `tables` JSON。

已支持：
- 新增 / 删除表格
- 编辑表格名
- 编辑表格说明
- 新增 / 删除列
- 新增 / 删除行
- 编辑单元格内容
- 保存 / 运行前自动编译为 runtime `tables`
- 右侧显示编译后的 `tables` 预览

---

## 3. 当前稳定边界

这一部分当前应视为**已稳定主链**，不要轻易重写：

- `modules/tool-execution-context.js`
- `modules/table-engine/table-update-service.js`
- `modules/table-engine/table-state-service.js`
- `modules/table-engine/table-writeback-service.js`
- `modules/context-injector.js`

必须继续保持的原则：
- 执行目标每次 fresh resolve
- 绑定到 `slotRevisionKey`，不是只绑定 messageId
- 失败事务不能推进 committed target
- editor draft 不是 runtime 真相来源
- runtime 真相来源仍是 `config.tables`

---

## 4. 当前待优化项

这些属于**已经进入下一阶段、但还没做完**的内容。

### 4.1 编辑器交互

- 表顺序调整
- 列顺序调整
- 行顺序调整
- 更成熟的单元格编辑体验
- 更适合大表的交互布局

### 4.2 数据模型

- 更丰富的列元信息
- 更清晰的 draft / template / compiled tables 分层
- 更成熟的 authoring model

### 4.3 工作台体验

- 更强的预览 / 可视化表达
- 更好的错误提示与校验反馈
- 更清晰的编辑态 / 编译态 / 已保存态边界

---

## 5. 仍未完成的内容

以下内容当前仍不能写成“已完成”：

### 5.1 模板体系
- 全局模板预设
- 聊天级模板覆盖
- 模板导入导出
- 模板版本 / 历史

### 5.2 高级工作台
- visualizer shell
- 历史记录
- 导入 / 导出
- 高级诊断面板

### 5.3 自动填表
- 自动触发 adapter
- 自动填表事务接线
- 自动失败与手动链统一 UX

---

## 6. 推荐的下一阶段顺序

如果继续推进，推荐顺序是：

1. **先补编辑器交互完善**
   - 表 / 行 / 列排序
   - 更顺手的编辑体验
2. **再补 authoring 数据模型**
   - draft / template / compiled 分层
   - 更明确的列定义元信息
3. **再决定是否进入 visualizer / 模板 / 历史**
4. **最后再考虑自动填表接线**

原因很简单：
- 当前执行链已经稳定
- 当前 authoring 已从 JSON 过渡到结构化 MVP
- 现在最缺的不是“能不能跑”，而是“能不能把编辑器做成真正可长期使用的工作台”

---

## 7. 一句话口径

当前最准确的一句话是：

> **`tableWorkbench` 已经从 JSON-only 的最小手动填表 MVP，推进到了带结构化表定义编辑器的 MVP；执行主链稳定，但编辑器体验、模板体系、历史体系与自动填表仍未完成。**