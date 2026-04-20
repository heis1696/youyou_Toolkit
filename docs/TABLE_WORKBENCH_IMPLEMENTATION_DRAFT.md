# 填表工作台施工草案

## 文档目的

本文档用于把 `tableWorkbench` 的后续优化方案按模块拆开说明，避免继续把 UI、authoring model、runtime diagnostics、template/history、automation 混在同一段待办里。

如果只想快速了解当前阶段与优先级，请先看：
- `docs/TABLE_WORKBENCH_STATUS_SUMMARY.md`

如果要校验本文档是否仍与当前架构一致，请同时对照：
- `docs/ARCHITECTURE_ANALYSIS.md`
- `modules/ui/components/table-workbench-panel.js`
- `modules/ui/components/table-form-renderer.js`
- `modules/table-engine/table-schema-service.js`
- `modules/table-engine/table-update-service.js`
- `modules/table-engine/table-state-service.js`
- `modules/table-engine/table-writeback-service.js`

---

## 一、当前阶段与稳定边界

## 1.1 当前阶段结论

当前仓库里的 `tableWorkbench` 已经不是纸面方案，而是已接入主线代码的独立顶级工作台，并且已经跨过“必须手写 JSON”这一阶段：

- 它已经是独立顶级标签页，不再是 `tools` 下的 subtab
- 它已经有自己的 table domain 文件组，不再只是 generic tool config 的附属配置
- 它已经具备最小手动填表主链：
  - fresh target resolve
  - bound state / template load
  - request build
  - API request
  - tables JSON parse
  - structured state commit
  - optional mirror writeback
- 它已经有结构化表定义编辑器 MVP：
  - 新增 / 删除表格
  - 编辑表格名与表格说明
  - 新增 / 删除列
  - 新增 / 删除行
  - 编辑单元格内容
  - 保存 / 运行前编译为 runtime `tables`

当前最准确的一句话仍然是：

> **`tableWorkbench` 已经从 JSON-only 的最小手动填表 MVP，推进到了带结构化表定义编辑器的 MVP；执行主链稳定，但正式 visualizer、模板体系、历史体系与自动填表仍未完成。**

## 1.2 必须继续保持的稳定边界

这一部分当前应视为**已稳定主链**，不要轻易重写：

- `modules/tool-execution-context.js`
- `modules/table-engine/table-update-service.js`
- `modules/table-engine/table-state-service.js`
- `modules/table-engine/table-writeback-service.js`
- `modules/context-injector.js`

当前必须继续保持的规则：

1. 执行目标必须每次 fresh resolve，不能把上次成功楼层直接当默认目标
2. 执行与写回必须绑定到 `slotRevisionKey`，不是只绑定 `messageId`
3. 失败事务不能推进 `lastCommittedTarget`
4. 正文镜像只是 UI 层，不是结构化真相来源
5. editor draft 只是 authoring 入口，runtime 真相来源仍然是 `config.tables`

## 1.3 当前模块地图

当前 workbench 相关模块，建议按以下职责理解：

### A. Table UI
- `modules/ui/components/table-workbench-panel.js`
- `modules/ui/components/table-form-renderer.js`

### B. Authoring Model
- `modules/table-engine/table-schema-service.js`

### C. Runtime / Diagnostics
- `modules/table-engine/table-update-service.js`
- `modules/table-engine/table-state-service.js`
- `modules/table-engine/table-writeback-service.js`
- `modules/table-engine/table-target-resolver.js`

### D. Template & History
- 当前尚未落地

### E. Automation
- 当前尚未落地

---

## 二、Table UI 模块

这一章是当前最值得展开的模块，因为下一阶段最缺的不是“能不能跑”，而是“能不能把编辑器做成真正可长期使用的工作台”。

## 2.1 当前实现细节

### 2.1.1 工作台壳层现状

当前 workbench 已经有清晰的三视图壳层，位于：
- `modules/ui/components/table-workbench-panel.js`

当前视图分层：
- `config`：主 authoring 入口
- `runtime`：手动执行与诊断入口
- `preview`：编译结果与辅助信息查看

当前主面板由以下函数组织：
- `buildConfigView()`
- `buildRuntimeView()`
- `buildPreviewView()`
- `buildMainLayout()`

这意味着当前 workbench 已经不是“一个大块面板上什么都堆在一起”，而是至少完成了：
- 主编辑流和运行流的分离
- 预览流的独立承载
- 页内多视图切换壳层

### 2.1.2 表格填写 UI 的当前结构

当前表格填写 UI 的核心仍在：
- `modules/ui/components/table-form-renderer.js`

当前结构化表定义编辑器的主入口包括：
- `renderTableDefinitionsEditorBody()`
- `renderTableEditorCard()`
- `openTableDefinitionDialog()`
- `bindTableFormEvents()`
- `readTableDefinitionsDraft()`
- `rerenderTableDefinitionsRoot()`

当前单表编辑卡片已经承担：
- 表名 / 表说明编辑
- 列定义编辑
- 行内容编辑
- 表 / 列 / 行增删
- 编译前的结构化回读与重渲染

也就是说，当前“表格填写 UI”已经从 JSON 直接编辑升级为：
- 结构化 authoring 入口
- 以内联编辑和局部卡片为核心的最小编辑器
- 保存 / 运行前自动编译回 runtime `tables`

### 2.1.3 当前布局、视图与信息流

当前 UI 的主路径可以概括为：

```text
进入 tableWorkbench
  -> config 视图改表格
  -> readTableDefinitionsDraft()
  -> compileTableDraftToTables()
  -> saveTableWorkbenchConfig()
  -> runtime 视图手动执行
  -> preview 视图查看编译结果与辅助信息
```

当前表格填写 UI 的已落地特点：
- 编辑视图、运行视图、预览视图已经拆开
- 编译结果预览已经独立存在，不再要求用户直接维护最终 JSON
- 主编辑器与运行诊断没有完全混在一个面板里

但它当前仍然主要是：
- 一套“大表单 + 多张表卡片”的编辑器
- 还不是“侧栏表列表 + 当前表主编辑区”的正式 visualizer shell

### 2.1.4 当前编译 / 校验点

当前 table UI 背后的 authoring 流主要依赖：
- `modules/table-engine/table-schema-service.js`

关键函数包括：
- `normalizeDraftTable()`
- `deriveTableDraftFromTables()`
- `compileTableDraftToTables()`
- `validateTableDraftDeep()`
- `getTableWorkbenchFormSchema()`

当前文档必须明确写清楚：
- UI 编辑器操作的是 draft authoring 结构
- 保存 / 运行前会先 compile 成 runtime `tables`
- 当前预览展示的是编译后的 runtime `tables`，不是 draft 原样回显
- 当前 runtime 真相来源仍然是 `config.tables`

### 2.1.5 当前仍未完成的 UI 缺口

虽然结构化编辑器 MVP 已经落地，但 UI 仍未完成到正式工作台体验：

- 表顺序调整还未完善
- 列顺序调整还未完善
- 行顺序调整还未完善
- 更成熟的单元格编辑体验还未落地
- 更适合大表的交互布局还未落地
- 校验摘要、编译预览、保存态提示还没有从主编辑流里完全拆清楚

## 2.2 参考细节

### 2.2.1 该学什么

#### 参考一：`Reference/shujuku-main/src/ui/06_visualizer.js`

这里最值得学的是：

- **visualizer shell 组织方式**
  - 左侧表列表
  - 右侧当前表主编辑区
  - 当前激活表的独立焦点
- **把表顺序调整与当前表切换当成独立 UI 关注点处理**
- **把局部刷新建立在“当前激活表”之上**，而不是每次重渲染整页长表单
- **“选择对象 -> 编辑对象 -> 仅刷新该区域”** 的工作台心智
- **侧栏项内聚合轻量操作**：切换、上移、下移、删除等都围绕当前表入口组织，而不是散落到主编辑区各处

对当前 workbench 最有价值的借鉴是：
- 多表编辑时，应该让大部分操作停留在单表焦点内完成
- 应该把“表列表导航”和“当前表编辑”拆成不同区域
- 当前表的顺序、状态与操作入口，应该尽量收敛在左侧列表附近

#### 参考二：`Reference/shujuku-main/src/ui/05_main_popup.js`

这里更值得学的是：
- shell / card / toolbar 的层次组织
- 主路径与辅助信息的分区方式
- 不同操作区的层级感，而不是所有操作线性堆叠
- **总体壳层先稳定，再在壳层内部放 tab / card / grid** 的组织方式
- **桌面侧栏 + 窄屏重排** 的响应式思路

对当前 workbench 的意义是：
- config 视图可以进一步拆成主编辑区与辅助区
- 预览、校验、状态提示不必继续混进表单主体
- 当前 `config / runtime / preview` 三视图已经存在，下一步更适合在 `config` 内部细化壳层，而不是再重做整个 workbench 顶层

#### 参考三：`Reference/shujuku-main/src/ui/02_shared_editors_and_selectors.js`

这里最值得借鉴的是思路，而不是具体实现：
- 复杂编辑可以拆成多个可单独渲染的小片段
- 不需要把所有复杂 UI 继续塞进一个超长 render 函数
- **segment / task list / current editor 的拆法** 说明复杂编辑器可以先有列表焦点，再有当前项编辑区
- **从 DOM 回读当前编辑状态** 的模式，适合过渡期 editor，但也提醒我们要控制单文件复杂度

对当前 workbench 的意义是：
- `table-form-renderer.js` 应逐步拆小
- 单表元信息、列编辑、行编辑、校验摘要、编译预览，适合成为不同渲染单元
- 后续若保留 DOM 回读模式，也应让它只发生在更小的局部组件边界里，而不是整页长编辑器统一回读

#### 参考四：`Reference/st-memory-enhancement/assets/templates/index.html`

这里最值得学的是：
- **主路径 + 渐进展开** 的 HTML 结构
- 高级项不默认挤占主编辑区
- 复杂设置可以在需要时展开，而不是全量平铺
- **先有稳定骨架，再往骨架里挂 section / drawer / checkbox / textarea** 的 HTML-first 方式
- **左右分区 + 分组标题** 的配置台信息组织方式

对当前 workbench 的意义是：
- 主 authoring 路径应继续保持聚焦
- 模板、导入导出、诊断等高级能力更适合作为后续层，而不是先把 config 视图塞满
- 编译预览、深校验、模板位、导入导出预留位，更适合进入辅助区、折叠区或次级视图，而不是继续压在主表编辑流里

#### 参考五：`Reference/st-memory-enhancement/core/manager.js`

这里真正值得学的不是大 manager 本身，而是：
- **用户数据 / 基础数据 / 编辑器状态 / 系统能力** 的命名分层意识
- 把 UI 编辑态与用户持久数据区分开
- 把系统级能力集中到可辨认边界，而不是散落在每个 UI 片段里

对当前 workbench 的意义是：
- 可以继续强化 authoring draft、runtime tables、UI 临时状态三层边界
- 但不应把这些边界实现成新的全局 manager 或单例中心

### 2.2.2 不照搬什么

#### 不照搬 `shujuku-main` 的超大 popup 文件组织方式

不建议照搬：
- 把大量 HTML、CSS、事件处理长期集中在超大模板字符串或超大文件里
- 把总壳层、tab 内容、复杂编辑器、响应式样式继续塞进同一实现文件

原因：
- 当前 `table-form-renderer.js` 已经足够长
- 再沿这个方向继续膨胀，只会让后续 visualizer 壳层更难演进
- 当前更需要的是把大编辑器拆成小渲染单元，而不是复制“单文件全包”的做法

#### 不照搬 `shujuku-main` 的完整主题系统

不建议照搬：
- 主题变量体系
- 完整视觉语言
- 独立窗口风格实现

原因：
- 当前项目已有自己的 UI 语言与壳层
- 当前真正要借的是布局与交互组织方式，不是再引入一套新的视觉系统

#### 不照搬 `shujuku-main` 的 DOM 回读放大化路径

不建议照搬：
- 让整个大型编辑器长期依赖“统一重渲染 + 全局 DOM 回读”扩张下去

原因：
- 这种方式在 MVP 阶段推进很快，但文件会迅速膨胀
- 当前 repo 适合把 DOM 回读保留在局部 editor 单元，而不是继续扩大到整个 workbench config 壳层

#### 不照搬 `st-memory-enhancement/core/manager.js` 的大管理器风格

不建议照搬：
- 大管理器 / 大单例式模块边界
- 让 UI、用户数据、系统能力都通过一个全局对象风格汇总

原因：
- 当前 tableWorkbench 已经是主线架构上的一个 domain
- 不应为了文档或未来优化，再长出一套独立 manager 架构
- 当前更适合维持现有模块边界，只在 table UI 内部梳理 authoring draft / runtime tables / UI 临时状态

#### 不照搬 `st-memory-enhancement` 的配置台式主界面

不建议照搬：
- 把大量 checkbox、textarea、select 和高级项默认全部平铺到主编辑流

原因：
- `tableWorkbench` 的核心目标是表格 authoring，不是通用设置台
- 它可以借鉴“渐进展开”，但不应退回成配置项压倒编辑焦点的界面

## 2.3 后续实现细节

### 2.3.1 UI 壳层升级方向

下一阶段最明确的方向应是：

- 从“大表单”推进到“visualizer MVP”
- 保留 `table-workbench-panel.js` 现有 `config / runtime / preview` 三视图分层
- 在 `config` 主视图内部进一步拆成：
  - 左侧：表列表 / 当前激活表 / 表顺序操作 / 轻量状态提示
  - 右侧：当前表元信息、列编辑、行编辑
  - 辅助区：编译预览、校验摘要、保存态提示、高级 authoring 项
- 保持 **“顶层三视图稳定，config 内部再升级为工作台壳”** 的路线，而不是推倒整个面板重来

这样做的目标是：
- 多表场景下不再需要从上到下反复滚动整页
- 当前表成为真正的编辑焦点
- 预览与校验不再持续干扰主编辑流
- config 视图从“多卡片线性堆叠”升级成“带焦点切换的编辑工作台”

### 2.3.2 组件拆分方向

后续应把当前编辑器逐步拆成更清晰的渲染单元，例如：

- table list pane
- table meta editor
- table columns editor
- table rows grid
- validation summary
- compiled preview

这样拆的目的不是抽象而抽象，而是为了：
- 表排序、列排序、行排序能分别落位
- 单元格编辑与表级配置不再混在同一渲染块里
- 后续 visualizer shell 不需要再重写一遍 authoring UI

### 2.3.3 表格填写 UI 的具体优化项

尤其是“表格填写 UI”这一块，文档应继续明确列出：

- 表 / 列 / 行排序如何落位
- 单元格编辑体验如何升级
- 大表场景如何减少视线切换与滚动成本
- 保存态、已编译态、待保存态如何更清楚地区分
- 校验摘要与编译预览如何成为辅助区，而不是继续混在主表单流里
- 表列表中的当前激活表、顺序控制、轻量状态提示如何组织
- 当前表编辑区与辅助区之间的视线优先级如何划分
- 哪些高级项默认折叠，哪些信息必须留在主路径内
- 局部刷新如何优先围绕当前表，而不是每次都重绘整页

---

## 三、Authoring Model 模块

## 3.1 当前实现细节

当前 authoring model 的核心在：
- `modules/table-engine/table-schema-service.js`

当前已落地的事实：
- `normalizeDraftTable()` 是 draft 标准化入口
- `deriveTableDraftFromTables()` 提供 runtime → draft 的回读能力
- `compileTableDraftToTables()` 提供 draft → runtime 的编译能力
- `validateTableDraftDeep()` 提供结构级验证
- `getTableWorkbenchFormSchema()` 提供当前 workbench 的 schema 来源

当前必须明确写清楚：
- editor draft 只是 authoring 入口
- runtime 真相来源仍是 `config.tables`
- 保存 / 运行前 compile 不是临时 hack，而是当前架构刻意保留的稳定边界

## 3.2 参考细节

### 该学什么
- 从 `shujuku-main` 学“编辑状态”和“运行状态”分开处理的思路
- 从 `st-memory-enhancement` 学“复杂配置应该拆成多层入口”，而不是全部平铺暴露

### 不照搬什么
- 不引入新的独立状态机或 manager 层
- 不把 authoring model 做成脱离当前 schema / storage 体系的旁路模型

## 3.3 后续实现细节

后续 authoring model 最值得补强的是：
- draft / compiled / saved 三态边界
- 更丰富的列元信息扩展位
- 更明确的编辑态、编译态、已保存态提示
- 在 UI 组件拆分后，继续统一走 `table-schema-service.js` 的 derive / compile / validate 主链

---

## 四、Runtime / Diagnostics 模块

## 4.1 当前实现细节

当前 runtime / diagnostics 模块仍然建立在稳定主链之上，相关文件包括：
- `modules/table-engine/table-update-service.js`
- `modules/table-engine/table-state-service.js`
- `modules/table-engine/table-writeback-service.js`
- `modules/table-engine/table-target-resolver.js`
- `modules/ui/components/table-workbench-panel.js`

当前应继续保持的事实：
- `runtime` 视图承担手动执行与诊断展示
- tableWorkbench 依然依附主 execution / writeback 架构
- 当前优化重点不是重写执行链，而是提升 workbench 的 authoring UX 与诊断展示清晰度

## 4.2 参考细节

### 该学什么
- 学参考项目里把“主编辑流”和“辅助诊断流”分区的方式
- 让诊断信息成为辅助区，而不是堵在主编辑路径前面

### 不照搬什么
- 不把 runtime 变成独立状态机
- 不改写 revision-safe / writeback-safe 的既有边界

## 4.3 后续实现细节

后续 runtime / diagnostics 更适合补的是：
- 诊断面板增强
- 运行结果、目标信息、加载信息的分块展示
- 更清晰地呈现 `lastResolvedTarget / lastCommittedTarget / loadMode / error details`
- 继续保留“执行目标每次 fresh resolve”“失败事务不能推进 committed target”的文档口径

---

## 五、Template & History 模块

## 5.1 当前实现细节

这一块当前仍应明确写成：**未落地模块**。

当前还不能写成“已完成”的内容包括：
- 全局模板预设
- 聊天级模板覆盖
- 模板导入导出
- 模板版本 / 历史
- 历史工作台

## 5.2 参考细节

### 该学什么
- 学参考项目把高级能力放在主路径之后的方式
- 模板与历史都应作为 workbench 的后续层，而不是先侵入当前主 authoring 流

### 不照搬什么
- 不照搬完整外部插件配置架构
- 不在当前 MVP 阶段把模板体系提前塞进主编辑器壳层

## 5.3 后续实现细节

后续若继续推进，这一模块更适合单独落为：
- 全局模板预设
- 聊天级模板覆盖
- 导入 / 导出
- 历史版本 / 快照
- 版本与模板的独立入口

---

## 六、Automation 模块

## 6.1 当前实现细节

这一块当前同样应明确写成：**未落地模块**。

当前还不能写成“已完成”的内容包括：
- 自动触发 adapter
- 自动填表事务接线
- 自动失败与手动链统一 UX

## 6.2 参考细节

当前这一轮只需要保留方向，不需要过度展开参考实现。

## 6.3 后续实现细节

自动化模块更适合放在所有 UI / authoring model 工作之后，再继续讨论：
- 自动触发 adapter
- 自动填表门控与事务接线
- 自动失败与手动链统一 UX
- 手动 / 自动的一致状态反馈

---

## 七、推荐实施顺序

如果继续推进，当前推荐顺序应是：

1. **先做 Table UI 壳层升级**
   - visualizer MVP 壳层
   - 主编辑流与辅助区分离
2. **再补表 / 行 / 列排序与大表交互**
   - 先把多表与大表可用性立住
3. **再拆 editor 组件并补强校验反馈**
   - 让 `table-form-renderer.js` 不再继续膨胀
4. **再补 authoring model 分层**
   - draft / compiled / saved 边界
   - 更明确的列定义元信息
5. **最后再决定是否进入模板 / 历史 / 自动填表**

这样排序的原因是：
- 当前主链已经稳定，不需要优先重写执行事务模型
- 当前最缺的是“长期可用的工作台交互壳层”
- 如果 UI 壳层没先立住，后续模板、历史、导入导出都会继续堆回当前大表单

---

## 八、当前事实对照文件

如需校验本文档是否仍然准确，应优先对照以下文件：

### 核心实现文件
- `modules/ui/components/table-workbench-panel.js`
- `modules/ui/components/table-form-renderer.js`
- `modules/table-engine/table-schema-service.js`
- `modules/table-engine/table-update-service.js`
- `modules/table-engine/table-state-service.js`
- `modules/table-engine/table-writeback-service.js`
- `modules/tool-execution-context.js`
- `modules/context-injector.js`

### 参考实现文件
- `Reference/shujuku-main/src/ui/06_visualizer.js`
- `Reference/shujuku-main/src/ui/05_main_popup.js`
- `Reference/shujuku-main/src/ui/02_shared_editors_and_selectors.js`
- `Reference/st-memory-enhancement/assets/templates/index.html`
- `Reference/st-memory-enhancement/core/manager.js`

### 当前最值得点名复用的现有函数
- `buildConfigView()` / `buildRuntimeView()` / `buildPreviewView()` / `buildMainLayout()`
- `renderTableEditorCard()` / `renderTableDefinitionsEditorBody()` / `openTableDefinitionDialog()`
- `readTableDefinitionsDraft()` / `rerenderTableDefinitionsRoot()` / `bindTableFormEvents()`
- `normalizeDraftTable()` / `deriveTableDraftFromTables()` / `compileTableDraftToTables()` / `validateTableDraftDeep()` / `getTableWorkbenchFormSchema()`

只要这些文件或职责边界发生变化，就应优先更新本文档，而不是继续沿用旧口径。