# 填表工作台参考实现对照研究

本文只做参考实现拆解与现状对照，不修改运行代码。

## 目标

把 `Reference/shujuku-main` 与 `Reference/st-memory-enhancement` 里和“填表 / 表格编辑 / 手动更新 / 可视化编辑”相关的实现拆开看清楚，明确：

1. 别人的 UI 到底好在哪里
2. 当前 `tableWorkbench` 为什么看起来还是一坨卡片壳子
3. 后续重做时哪些必须直接照着参考思路落地，不能再停留在抽象优化

---

## 参考一：st-memory-enhancement

### 关键文件

- `Reference/st-memory-enhancement/data/pluginSetting.js`
- `Reference/st-memory-enhancement/scripts/runtime/separateTableUpdate.js`
- `Reference/st-memory-enhancement/index.js`
- `Reference/st-memory-enhancement/README.md`

### 这个参考真正提供的体验

#### 1. 把“填表”当成一个直接动作，而不是一套解释型工作台

在 `Reference/st-memory-enhancement/scripts/runtime/separateTableUpdate.js:77`，独立填表主入口就是 `TableTwoStepSummary(mode)`。

它的用户心智非常直接：

- 找到待处理对话片段
- 弹一次确认
- 直接执行填表
- 刷新聊天结果

对应代码：

- `TableTwoStepSummary()`：`Reference/st-memory-enhancement/scripts/runtime/separateTableUpdate.js:77`
- `manualSummaryChat()`：`Reference/st-memory-enhancement/scripts/runtime/separateTableUpdate.js:131`

这里的重点不是“展示很多诊断卡片”，而是**把用户动作压缩成一个明确动作链**。

#### 2. 表格相关设置虽然多，但填表动作本身很短

在 `Reference/st-memory-enhancement/data/pluginSetting.js:154` 开始，大量内容都在定义提示词、操作规则、表格注入和前端展示方式。

它的核心特点不是“界面简单”，而是：

- 配置很多，但都服务于“表格就是主数据结构”
- 真正执行时，用户面对的是“执行填表”而不是“先理解工作流”
- 数据修改语义清楚：`insertRow` / `updateRow` / `deleteRow`

相关位置：

- 操作规则与 `tableEdit` 示例：`Reference/st-memory-enhancement/data/pluginSetting.js:167`
- 前端表格推送容器：`Reference/st-memory-enhancement/data/pluginSetting.js:222`

#### 3. 它的“前端表格”是内容优先，不是面板说明优先

`table_to_chat` 相关设置说明了一个很重要的产品倾向：

- 表格本身可以直接展示到聊天界面
- 重要的是让用户看到“数据本体”
- 不是先把用户引到一个堆满说明和状态摘要的后台面板

相关位置：

- `Reference/st-memory-enhancement/data/pluginSetting.js:211`

### 可借鉴的核心点

1. **填表动作必须短**：用户应该觉得“点一下就执行”，而不是进入一套解释系统。
2. **表格是主角**：不是卡片、提示文案、流程说明做主角。
3. **操作语义是数据操作**：增行、改行、删行，而不是“切到这个 pane 再看那个摘要”。
4. **配置可以复杂，但主路径不能复杂**。

---

## 参考二：shujuku-main

### 关键文件

- `Reference/shujuku-main/src/ui/05_main_popup.js`
- `Reference/shujuku-main/src/ui/06_visualizer.js`
- `Reference/shujuku-main/src/ui/04_table_selectors.js`
- `Reference/shujuku-main/src/features/ui/01_update_trigger.js`
- `Reference/shujuku-main/src/features/data/01_data_admin.js`
- `Reference/shujuku-main/docs/目录结构说明.md`

### 这个参考真正提供的体验

#### 1. 主界面是“导航 + 内容区”，不是“顶部说明 + 多块说明卡”

`Reference/shujuku-main/src/ui/05_main_popup.js:143` 的主布局是：

- 左边：侧边导航 `.acu-tabs-nav`
- 右边：主内容 `.acu-main`

这是非常明确的后台工具布局：

- 导航负责定位功能
- 内容区负责干活
- 不让大段说明占掉第一屏

相关位置：

- 主布局 grid：`Reference/shujuku-main/src/ui/05_main_popup.js:143`
- 导航按钮：`Reference/shujuku-main/src/ui/05_main_popup.js:176`
- 内容切换：`Reference/shujuku-main/src/ui/05_main_popup.js:219`

#### 2. visualizer 是“左侧选表，右侧编辑”，而且是真正的数据编辑器心智

`Reference/shujuku-main/src/ui/06_visualizer.js` 的核心结构非常清楚：

- `.acu-vis-sidebar`：表格列表
- `.acu-vis-main`：当前表主编辑区
- `.acu-table-nav-item`：一张表就是一个导航项

相关位置：

- 侧栏：`Reference/shujuku-main/src/ui/06_visualizer.js:115`
- 主内容区：`Reference/shujuku-main/src/ui/06_visualizer.js:140`
- 表导航项：`Reference/shujuku-main/src/ui/06_visualizer.js:151`

这类结构的价值在于：

- 用户一眼知道自己正在改哪张表
- 切表成本低
- 不需要先理解“配置 / 运行 / 预览”这种系统视角
- 编辑焦点始终落在当前数据对象上

#### 3. 选择器都做成直接可勾选、可批量处理的真实控件

`Reference/shujuku-main/src/ui/04_table_selectors.js:1` 开始的手动表选择器与导入表选择器，都有一致特征：

- 表就是列表项
- 列表项直接勾选
- 支持全选 / 全不选
- 结果直接进入后续动作

这说明它的产品思路不是“讲清楚系统”，而是“让用户马上选和操作”。

#### 4. 更新触发链虽然复杂，但 UI 暴露给用户的是可执行动作，不是复杂状态学

`Reference/shujuku-main/src/features/ui/01_update_trigger.js:2` 的 `proceedWithCardUpdate_ACU()` 内部很长，但用户面对的是：

- 点击开始
- 看到状态变化
- 可中止
- 完成后看到结果

它内部可以复杂，但 UI 主表面不把复杂性原样甩给用户。

### 可借鉴的核心点

1. **明确的左右结构**：左边选对象，右边编辑对象。
2. **导航是功能性导航，不是装饰导航。**
3. **内容区优先放可操作内容，不优先放说明。**
4. **状态反馈跟着动作走，不单独占大块版面。**

---

## 当前 tableWorkbench 的问题

### 当前关键文件

- `modules/ui/components/table-workbench-panel.js`

### 当前结构为什么不对

#### 1. 当前还是“说明卡片驱动”，不是“数据编辑驱动”

头部和每个分区都在重复输出：

- kicker
- title
- desc
- 卡片壳
- section title

比如：

- 顶部 header：`modules/ui/components/table-workbench-panel.js:575`
- 视图切换：`modules/ui/components/table-workbench-panel.js:607`
- 左侧表列表卡：`modules/ui/components/table-workbench-panel.js:626`
- 右侧辅助卡堆：`modules/ui/components/table-workbench-panel.js:675`
- 运行页卡堆：`modules/ui/components/table-workbench-panel.js:833`
- 预览页卡堆：`modules/ui/components/table-workbench-panel.js:913`

结果就是：

- 用户第一眼看到的是卡片和解释
- 不是表格本体
- 不是行列编辑
- 不是当前对象

#### 2. 把一个“填表工具”拆成 `config / runtime / preview` 三视图，本身就是系统视角，不是用户视角

位置：

- `modules/ui/components/table-workbench-panel.js:607`

这套分法更像开发者在拆模块，而不是用户在完成任务。对用户来说更自然的问题应该是：

- 我现在改哪张表？
- 当前表怎么填？
- 这次填表要不要执行？
- 结果改了哪些地方？

而不是：

- 我现在在 config pane 还是 runtime pane？

#### 3. 编辑区仍然不是足够直接的“表格编辑”

虽然现在已经有 focused editor，但主壳层仍然是：

- 左边一个卡片列表
- 中间一个被包起来的编辑器
- 右边四张辅助卡

位置：

- `modules/ui/components/table-workbench-panel.js:727`

这跟参考实现最大的差异是：

- 参考是“左边选表，右边就是主编辑器”
- 当前是“左边选表，中间编辑，右边继续给说明和状态”
- 第一屏能量被大量非编辑内容吃掉

#### 4. 运行页仍然把“动作”和“解释”拆成很多块，路径不够短

位置：

- `modules/ui/components/table-workbench-panel.js:833`

当前运行页的问题：

- 有动作卡
- 有流程 chip
- 有摘要卡
- 有目标卡
- 有状态卡

它比参考实现更像“控制台”，而不是“立即填表”。

#### 5. 预览页把“变量参考”和“表格预览”并排，也是在放大系统感

位置：

- `modules/ui/components/table-workbench-panel.js:913`

提示词变量帮助本身不是主路径内容，但现在被放进一级视图里，与表格预览并列，继续稀释了“表格就是主角”的感觉。

---

## 表格展示与编辑样式：这次必须真正学会的东西

这一节只盯你刚强调的重点：**表格怎么展示、怎么编辑、样式怎么组织**。

### st-memory-enhancement：更像“直接可操作的表格编辑器”

#### 关键文件

- `Reference/st-memory-enhancement/scripts/editor/tableTemplateEditView.js`
- `Reference/st-memory-enhancement/scripts/editor/chatSheetsDataView.js`
- `Reference/st-memory-enhancement/scripts/renderer/tablePushToChat.js`
- `Reference/st-memory-enhancement/assets/templates/sheetTemplateEditor.html`
- `Reference/st-memory-enhancement/assets/styles/style.css`

#### 样式和结构上的关键点

##### 1. 真正把表格放进一个可滚动容器里，而不是先塞满说明卡

`sheetTemplateEditor.html` 很朴素，但方向是对的：

- 顶部一排工具按钮
- 下面直接一个 `#contentContainer`
- 再下面就是 `#tableContainer`

相关位置：

- `Reference/st-memory-enhancement/assets/templates/sheetTemplateEditor.html:2`
- `Reference/st-memory-enhancement/assets/templates/sheetTemplateEditor.html:53`

这意味着第一屏视觉重点是：**表格容器本体**。

##### 2. 默认表格样式就是标准二维表，不绕弯

在 `style.css` 里：

- `.tableDom` 用 `border-collapse: collapse`
- `td / th` 有清楚边框与内边距
- 外层 `.scrollable` 负责横向滚动

相关位置：

- `Reference/st-memory-enhancement/assets/styles/style.css:91`
- `Reference/st-memory-enhancement/assets/styles/style.css:96`
- `Reference/st-memory-enhancement/assets/styles/style.css:106`

这类样式虽然不花，但它抓住了重点：

- 行列关系非常明确
- 单元格就是单元格
- 用户不会把它误认成一堆卡片字段

##### 3. 编辑入口贴着表格对象本身

`tableTemplateEditView.js` 里对不同对象分别给编辑入口：

- 表：编辑表格属性
- 列：编辑列
- 行：编辑行
- 单元格：编辑单元格

相关位置：

- 表格配置：`Reference/st-memory-enhancement/scripts/editor/tableTemplateEditView.js:57`
- 列编辑：`Reference/st-memory-enhancement/scripts/editor/tableTemplateEditView.js:24`
- 行编辑：`Reference/st-memory-enhancement/scripts/editor/tableTemplateEditView.js:41`
- 单元格编辑：`Reference/st-memory-enhancement/scripts/editor/tableTemplateEditView.js:49`
- 单元格点击编辑：`Reference/st-memory-enhancement/scripts/editor/chatSheetsDataView.js:210`

重点不在它用了 popup，而在于：**用户操作对象和编辑动作强绑定**。

##### 4. 表格展示支持“聊天中直接看表”

`tablePushToChat.js` 说明另一个很重要的方向：

- 表格可以直接渲染进聊天区域
- 默认样式渲染时就是真表格 DOM
- 自定义样式渲染也仍然围绕“表”这个对象

相关位置：

- 默认渲染：`Reference/st-memory-enhancement/scripts/renderer/tablePushToChat.js:94`
- 可编辑表格 DOM 渲染主链：`Reference/st-memory-enhancement/scripts/renderer/tablePushToChat.js:125`

这说明它不是把“表格”当配置数据看，而是当成**前台可见内容**看。

#### 该参考最值得学的样式结论

1. 主区域必须像真正的表格区域。
2. 外层只保留薄工具栏，不要卡片堆满第一屏。
3. 单元格、行、列都应该有直接对应的编辑入口。
4. 表格可以长得朴素，但不能长得像一堆说明卡。

---

### shujuku-main：更像“左导航 + 当前表主编辑区”的完整工作台

#### 关键文件

- `Reference/shujuku-main/src/ui/06_visualizer.js`
- `Reference/shujuku-main/src/ui/05_main_popup.js`
- `Reference/shujuku-main/src/ui/04_table_selectors.js`

#### 样式和结构上的关键点

##### 1. 左侧表导航样式是稳定焦点，不是装饰侧栏

`06_visualizer.js` 里：

- `.acu-vis-sidebar` 固定宽度，专门承接表列表
- `.acu-table-nav-item` 是完整一行导航对象
- 当前表 `active` 高亮非常明确
- 表名溢出时做省略，不破坏结构

相关位置：

- 侧栏：`Reference/shujuku-main/src/ui/06_visualizer.js:115`
- 表导航项：`Reference/shujuku-main/src/ui/06_visualizer.js:151`
- 表名称：`Reference/shujuku-main/src/ui/06_visualizer.js:219`
- 排序操作按钮：`Reference/shujuku-main/src/ui/06_visualizer.js:230`

这里最值得学的是：**表列表不是摘要卡，而是稳定对象导航。**

##### 2. 主编辑区是一个“当前表工作面”，不是杂项信息堆场

`06_visualizer.js` 的 `.acu-vis-main` 就是纯主区：

- 大块可滚动
- 主要承接当前表数据卡、字段行、配置面板
- 不是左中右三栏同时抢第一屏注意力

相关位置：

- 主区：`Reference/shujuku-main/src/ui/06_visualizer.js:140`

##### 3. 字段行的编辑样式非常克制，重点是可读、可点、可改

`06_visualizer.js` 里有一组很值得照抄思路的字段样式：

- `.acu-field-row`
- `.acu-field-label`
- `.acu-field-value`
- `.acu-field-value:focus`

相关位置：

- 字段行：`Reference/shujuku-main/src/ui/06_visualizer.js:366`
- 标签：`Reference/shujuku-main/src/ui/06_visualizer.js:368`
- 值区：`Reference/shujuku-main/src/ui/06_visualizer.js:375`
- focus 态：`Reference/shujuku-main/src/ui/06_visualizer.js:390`

它不是那种厚重后台卡片风，而是：

- 信息块薄
- 可直接进入编辑态
- hover / focus 反馈非常明确

##### 4. 列编辑器和表操作按钮都贴近对象

相关位置：

- 列列表：`Reference/shujuku-main/src/ui/06_visualizer.js:519`
- 列项：`Reference/shujuku-main/src/ui/06_visualizer.js:558`
- 列输入框：`Reference/shujuku-main/src/ui/06_visualizer.js:568`
- 新增表按钮：`Reference/shujuku-main/src/ui/06_visualizer.js:626`

这套组织方式说明：

- 新增、删除、调序都应该贴着表对象与列对象
- 不能把这些动作散到辅助卡或远处按钮区

##### 5. 选择器也保持“表就是列表项”的心智

`04_table_selectors.js` 中，表选择器就是：

- 网格列表
- 每项一个复选框 + 名称
- 全选 / 全不选配合使用

相关位置：

- 手动表选择器：`Reference/shujuku-main/src/ui/04_table_selectors.js:1`
- 导入表选择器：`Reference/shujuku-main/src/ui/04_table_selectors.js:84`

#### 该参考最值得学的样式结论

1. 左边必须是稳定的表导航，不是信息摘要。
2. 右边必须是当前表主工作区。
3. 字段、列、值的编辑态要清楚、轻量、可聚焦。
4. 新增/删除/排序按钮要贴近对象本身。

---

### 对当前 tableWorkbench 的直接结论

当前 `tableWorkbench` 在“表格展示与编辑样式”上，和参考实现的差距主要不在颜色或圆角，而在**结构焦点错了**：

1. 现在第一屏仍然先看到大量 header、chip、kicker、desc，而不是表格本体。
2. 左边虽然有表列表，但它仍被包在说明卡里，导航感不够强。
3. 中间编辑器没有被做成真正的“当前表主工作面”，仍被三栏和辅助卡分散注意力。
4. 右侧辅助区放了太多校验、编译、选项、提示，抢走了表格编辑的视觉重心。
5. 运行与预览仍然沿用 pane 思维，不是围绕“当前表 / 当前动作”组织。

所以后面真要改，首先要学的不是主题皮肤，而是下面这些硬结构：

- **表格必须成为第一视觉主体**
- **左侧表导航必须真正稳定可依赖**
- **右侧必须主要是当前表编辑，不是说明卡堆**
- **单元格 / 行 / 列动作必须贴着对象出现**

---

## 两个参考共同指向的结论

虽然 `st-memory-enhancement` 和 `shujuku-main` 视觉风格不同，但它们对“填表 / 表格工具”的共识很一致：

### 1. 先给对象，再给说明

- 先让用户看到表
- 先让用户看到当前选中对象
- 先让用户做选择、编辑、执行
- 说明与细节降级

### 2. 填表主路径必须短

主路径最多应是：

1. 选表
2. 改表
3. 执行 / 保存
4. 看结果

不是：

1. 读 header
2. 读 chip
3. 切 pane
4. 看多张辅助卡
5. 再去找动作按钮

### 3. 数据编辑器必须像数据编辑器

用户要的是：

- 行列一眼可见
- 当前表可直接改
- 操作点位稳定
- 新增/删除/排序路径短

不是围着卡片读说明。

### 4. 诊断信息是次级内容

目标解析、载入模式、mirror、slot key 这些东西可以有，但：

- 不该霸占主路径
- 不该成为第一层视觉重点
- 应该折叠、抽屉化或放到底部

---

## 对当前重做的硬约束

后续如果重做 `tableWorkbench`，至少要满足下面这些约束，否则不算对齐参考实现。

### A. 结构约束

1. **废掉当前 `config / runtime / preview` 的一级三分法**，改成更贴近任务流的结构。
2. 主界面优先采用：
   - 左侧：表列表 / 表导航
   - 右侧：当前表编辑
3. 运行与诊断不再单独占据一个同级大视图，应该收口到：
   - 顶部主操作区
   - 底部状态栏
   - 可展开诊断抽屉

### B. 视觉约束

1. 大量 `kicker + title + desc + card` 组合必须砍掉。
2. 第一屏默认只保留：
   - 当前对象
   - 可编辑内容
   - 主动作
3. 非必要说明文案必须降级。

### C. 交互约束

1. 选表动作必须稳定固定，不要让用户滚整页找入口。
2. 新增表 / 删表 / 调序必须紧贴表列表或表头，不要散落在辅助区。
3. 保存与执行关系要更短：
   - 要么单主按钮
   - 要么主按钮 + 次按钮
   - 不再做多层动作说明

### D. 信息层级约束

1. 校验摘要、编译结果、变量参考都属于次级信息。
2. 运行目标、载入模式、slot 诊断属于高级信息。
3. 这些信息都不能再占据主编辑区的黄金位置。

---

## 建议的下一步

按这份文档，后续应该分成两步走：

### 第一步：先重画工作台信息架构

只确定：

- 左边放什么
- 右边放什么
- 主按钮放哪
- 诊断怎么折叠
- 哪些内容降级到二级区域

不要直接在现有卡片壳层上继续缝补。

### 第二步：再落代码

重点改动入口：

- `modules/ui/components/table-workbench-panel.js`
- `modules/ui/components/table-form-renderer.js`

必要时同时收口：

- 运行状态展示方式
- 表级操作按钮布局
- 变量帮助的挂载位置

---

## 一句话结论

当前 `tableWorkbench` 的根本问题不是“还差几个 helper”或“还缺一张状态卡”，而是**整个界面仍然站在系统说明视角，而不是站在“我现在就要填表”的用户视角**。

参考实现已经给出了足够明确的方向：

- `st-memory-enhancement` 告诉我们：**填表动作要短，表格是主角**
- `shujuku-main` 告诉我们：**左侧选对象，右侧直接编辑，导航与内容分层清楚**

后续重做必须朝这个方向直接落，不然只是继续给现有壳子补丁。