# 更新日志

本项目的所有重要更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

## [1.0.49] - 2026-04-20

- 🐛 **欢迎页关闭状态改为仅在当前页面会话内生效，关闭后重复打开工具不再显示，但浏览器刷新后会重新显示** (`index.js`, `modules/app/popup-shell.js`, `dist/bundle.js`)
  - 将欢迎页关闭标记从持久化设置改为运行时 `uiState`，避免跨刷新保留
  - 现在同一页面会话里关闭一次即可，只有浏览器 F5 / 页面重载后才会重置欢迎页

- 🐛 **欢迎页关闭后会记住状态，不再每次打开工具都重新显示** (`modules/app/popup-shell.js`, `dist/bundle.js`)
  - popup shell 渲染欢迎页前先读取 `ui.startupScreenDismissed`，已关闭时直接进入主界面
  - 点击“进入工具箱”时持久化关闭状态，避免同一浏览器环境里每次打开都被欢迎页打断

## [1.0.48] - 2026-04-19

### 修复

- 🐛 **修复 tools 页 AI 工具与脚本工具分栏后在同一容器切换时的配置串写问题** (`modules/ui/ui-manager.js`, `dist/bundle.js`)
  - 在 UI 管理器渲染新组件前，先销毁同一容器中仍活跃的旧组件实例，避免旧面板的事件绑定残留
  - 修复一次保存同时触发旧实例与新实例保存逻辑，导致看起来像“同索引工具同步更新”的回归表现

## [1.0.47] - 2026-04-17

### 优化

- ✨ **重做填表工作台主界面与表格编辑体验，改成更直白的表格式交互** (`modules/ui/components/table-form-renderer.js`, `modules/ui/components/table-workbench-panel.js`, `modules/table-engine/table-schema-service.js`, `dist/bundle.js`)
  - 将填表工作台主入口压平为“改表格 / 运行 / 预览”，减少主路径里的抽象术语与诊断噪音
  - 把表定义编辑器改成更接近普通表格的表头/内容编辑方式，支持表、列、行的直接增删和上下移动
  - 保留保存/运行前统一编译到 runtime tables 的稳定边界，同时补齐列类型、说明、必填等元信息编辑能力

## [1.0.46] - 2026-04-17

### 修复

- 🐛 **修复共享增强下拉在靠右位置展开时被错误量成接近整屏宽度** (`modules/ui/utils.js`, `dist/bundle.js`)
  - 浮层宽度测量改为临时使用 `width: max-content` 配合 trigger 最小宽度与视口最大宽度后再取值，避免直接读取初始态 `scrollWidth` 时被 `left/right` 约束放大
  - 保持展开层至少与 trigger 同宽，但仅在内容真实需要时扩展，并继续受视口宽度钳制
  - 补齐浮层 `visibility` 内联样式清理，避免重复开关后残留测量态样式

## [1.0.45] - 2026-04-17

### 修复

- 🐛 **修复共享增强下拉在靠右位置仍可能按 trigger 宽度展开并向右越界** (`modules/ui/utils.js`, `dist/bundle.js`)
  - 浮层展开宽度改为基于 trigger 宽度与下拉内容真实宽度共同计算，不再在内容更宽时继续死锁为 trigger 宽度
  - 对最终展开宽度执行视口钳制，并在靠右位置时同步回推 left，保证浮层整体留在可视区域内
  - 关闭浮层时补齐 `minWidth` 等内联样式清理，避免重复开关后残留旧尺寸约束

## [1.0.44] - 2026-04-17

### 修复

- 🐛 **修复共享下拉在靠右位置时仍可能向右越界展开** (`modules/ui/utils.js`, `styles/main.css`, `dist/bundle.js`)
  - 恢复下拉展开层的 `min-width: 100%`，避免基础宽度约束丢失后出现收缩和错位
  - 为 portal 浮层定位补上 `maxWidth` 视口限制，并在关闭时同步清理内联样式
  - 同步更新构建产物，减少宿主环境里“源码修了但实际仍越界”的情况

## [1.0.43] - 2026-04-17

### 修复

- 🐛 **统一下拉与欢迎页主题 token，修复颜色漂移、角色下拉白底与欢迎页不再显示的问题** (`modules/ui/components/settings-panel.js`, `styles/main.css`, `modules/app/bootstrap.js`, `modules/app/popup-shell.js`, `modules/ui/components/bypass-panel.js`, `dist/bundle.js`)
  - 将共享下拉、展开层与欢迎页相关颜色收敛到主题 token，避免 fallback 样式和主样式各自维护导致颜色不一致
  - 为 bypass 角色下拉增加固定宽度约束，避免选中短文本后收起态过窄、展开后看不全其它选项
  - 删除欢迎页关闭状态的持久化逻辑，改为页面刷新或浏览器重开后重新显示

## [1.0.42] - 2026-04-16

### 修复

- 🐛 **修复共享下拉浮层宽度异常与选项行宽不一致** (`modules/ui/utils.js`, `styles/main.css`, `modules/app/bootstrap.js`, `dist/bundle.js`)
  - 下拉浮层宽度改为严格跟随 trigger 宽度，移除会放大到异常宽度的 dropdown 自身宽度兜底
  - 为共享下拉容器与选项补齐 `box-sizing` / `width: 100%`，统一 portal 下拉与旧版手写下拉的整行宽表现
  - 同步更新 fallback 内置样式与构建产物，避免宿主运行时继续出现“展开像全屏”或“选项宽度忽长忽短”

## [1.0.41] - 2026-04-16

### 修复

- 🐛 **将共享下拉改为顶层浮层展开，修复展开层裁切、透明发虚与点击穿透** (`modules/ui/utils.js`, `modules/ui/components/api-preset-panel.js`, `modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`, `dist/bundle.js`)
  - 为共享自定义下拉增加 portal 式浮层展开与重定位逻辑，使展开菜单脱离 popup 内部的裁切/滚动容器链
  - API 预设面板的手写下拉改为复用同一套浮层打开/关闭链路，不再单独维护一套文档点击关闭逻辑
  - 扩展 popup shell 对浮层下拉的交互保护，避免滚轮与鼠标命中继续落到下层内容区域

## [1.0.40] - 2026-04-16

### 修复

- 🐛 **强制自定义下拉展开层与选项改为实底深色，彻底移除半透明观感** (`styles/main.css`, `modules/app/bootstrap.js`, `modules/ui/components/api-preset-panel.js`, `dist/bundle.js`)
  - 为 `.yyt-select-dropdown`、`.yyt-select-option`、`.yyt-select-trigger` 增加更强优先级的实色背景，并显式禁用 `background-image` 与 `backdrop-filter`
  - 同步补齐 fallback 内置样式路径，避免宿主未加载外部样式时仍回落到旧的半透明下拉表现
  - 调整 API 预设星标等局部按钮的 hover 背景，避免下拉内部残留发虚的半透明块

## [1.0.39] - 2026-04-16

### 修复

- 🐛 **补齐 fallback 内置样式中的深色控件变量，修复实际运行仍出现白底/半透明的问题** (`modules/app/bootstrap.js`, `styles/main.css`, `dist/bundle.js`)
  - 为 `getBaseStyles()` 补上与主样式文件一致的 `--yyt-control-*` 变量，避免宿主加载不到外部 `styles/main.css` 时回退到旧的浅色控件主题
  - 将共享输入框、文本域与自定义下拉在 fallback 路径下也统一为更实的深色底、边框与阴影
  - 确保构建产物 `dist/bundle.js` 内已包含这套热修复，减少“源码已改但宿主实际未生效”的情况

## [1.0.38] - 2026-04-16

### 修复

- 🐛 **修复共享下拉展开层与正则提取控件主题可读性问题** (`styles/main.css`, `modules/ui/components/regex-extract-panel.js`, `modules/ui/components/table-form-renderer.js`)
  - 删除正则提取面板对共享输入控件的重复背景覆盖，恢复规则下拉与测试提取输入区的统一深色主题
  - 将共享自定义下拉的展开层改为更实的深色底与更强的边框/阴影，避免宿主背景穿透导致选项难以辨认
  - 同步统一表格工作台里的自定义下拉 option 底色、hover 与 selected 态，避免局部透明覆盖让下拉菜单再次发虚

## [1.0.37] - 2026-04-16

### 修复

- 🐛 **修复工作台下拉层、滚动链路与正则测试输入框回归** (`modules/app/popup-shell.js`, `modules/ui/components/regex-extract-panel.js`, `styles/main.css`)
  - 将共享自定义下拉展开层恢复为不透明深色背景，避免展开后透出底层内容导致选项难以辨认
  - 将正则规则类型下拉局部回退为原生 `select`，规避规则列表滚动容器对内嵌 dropdown 的裁切与遮挡
  - 修正 popup shell 的 wheel 代理边界与页面切换 scroll reset，恢复主内容区直接滚轮滚动并阻断页面间滚动位置串台
  - 补强 regex 面板内测试文本框与相关表单控件的局部深色主题，消除残留白底输入框

## [1.0.36] - 2026-04-16

### 修复

- 🐛 **修复工作台瘦身后的滚动、层级与表单主题回归** (`modules/app/popup-shell.js`, `modules/ui/components/settings-panel.js`, `styles/main.css`)
  - 恢复主内容区原生滚动条与滚轮滚动，避免根内容容器被统一 wheel 代理拦截
  - 修正顶部卡面与工作区的纵向 flex 约束，缓解顶部区域与导航/当前页面卡片重合
  - 统一常规输入框、下拉框与文本域的主题底色，并修复自定义下拉白底与层级遮挡问题
  - 继续放松 toggle 行与设置页 section 的堆叠间距，改善密集布局观感

## [1.0.35] - 2026-04-16

### 优化

- ✨ **工作台首屏改为一次性启动界面，主弹窗进一步瘦身** (`modules/app/popup-shell.js`, `modules/core/settings-service.js`, `styles/main.css`)
  - 首次打开工具箱时显示启动界面，用于承接品牌标题、简介与后续加载状态扩展位
  - 用户进入一次后会持久化记录，后续打开直接进入正常工作台
  - 删除顶部重复的“聚焦页面”卡片，并收缩常驻顶部区域，释放主内容显示空间

- ✨ **共享 toggle 布局与填表工作台结构体验优化** (`styles/main.css`, `modules/ui/components/bypass-panel.js`, `modules/ui/components/table-workbench-panel.js`)
  - 放松共享 toggle 行间距与标签布局，小号开关改为真实尺寸规则，不再依赖整体缩放
  - 填表工具台拆分为 `配置 / 执行与诊断 / 预览/参考` 分界面，减少单页信息堆叠
  - 手动执行填表后会自动聚焦运行态视图，便于查看摘要、诊断与预览结果

### 更改

- ♻️ **API 预设支持流式开关、显式删除入口与即时刷新** (`modules/ui/components/api-preset-panel.js`, `modules/ui/utils.js`, `modules/preset-manager.js`, `modules/api-connection.js`, `modules/app/popup-shell.js`)
  - API 预设 schema 新增 `stream` 字段，保存、回填与请求下发链路已全量打通
  - 预设列表新增更直观的删除入口，减少只能依赖其它区域删除的使用成本
  - 新建、更新、删除 API 预设后，工作台内相关引用区域可立即刷新，无需重启工具箱

- ♻️ **工作台事件刷新与用户文案统一收口** (`modules/app/popup-shell.js`, `modules/core/event-bus.js`, `modules/tool-registry.js`, `modules/ui/components/bypass-panel.js`, `modules/ui/components/tool-config-panel-factory.js`)
  - popup shell 补齐对 API 预设、自定义工具与 Ai 指令预设的事件订阅与清理逻辑
  - 新建工具、新建 Ai 指令预设后，相关导航与引用区域会立即同步刷新
  - 所有主要用户可见入口统一将“破限词”调整为 `Ai指令预设`，内部兼容键名保持不变

## [1.0.33] - 2026-04-15

### 修复

- 🐛 **统一修复填表工作台深色主题控件显示异常** (`styles/main.css`, `modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/table-form-renderer.js`)
  - 补强原生 `.yyt-select` 在宿主环境中的深色主题表现，避免下拉框出现白底白字
  - 稳定 `.yyt-code-textarea` 的 hover / focus 外观，避免 `promptTemplate` 文本框移入时变白
  - 保持共享表单控件的状态样式一致，减少宿主注入样式带来的视觉漂移

### 优化

- ✨ **升级填表工作台与表格编辑弹窗的视觉层级** (`modules/ui/components/table-workbench-panel.js`, `modules/ui/components/table-form-renderer.js`, `modules/ui/utils.js`)
  - 强化工作台 hero、运行态摘要、主操作区与右侧诊断区的信息层次
  - 为“新增/编辑表格”弹窗增加专用 dialog 外壳变体，统一 header / body / footer 质感
  - 调整创建态与编辑态文案、按钮与提示信息，让填表流程更清晰

## [1.0.32] - 2026-04-15

### 修复

- 🐛 **修复工具面板按钮点击无效的 bug** (`modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/local-transform-tool-panel-factory.js`, `modules/ui/components/table-workbench-panel.js` 等)
  - 问题根源：异步加载世界书后重新渲染 HTML 导致事件监听器丢失
  - 所有面板组件改用事件委托方式绑定事件 (`$container.on('event.namespace', selector, handler)`)
  - `renderTo` 方法先尝试使用缓存数据，异步加载后只更新必要部分
  - 使用命名空间标识事件，便于清理和隔离
  - 统一 `destroy` 方法只移除当前组件的事件，不影响其他组件

### 重构

- ♻️ **统一 UI 组件事件绑定机制** (`modules/ui/components/*.js`)
  - 所有面板组件接口保持一致：`render()`、`bindEvents()`、`destroy()`、`getStyles()`、`renderTo()`
  - 事件绑定使用命名空间：`.yytToolPanel`、`.yytLocalToolPanel`、`.yytTableWorkbench`、`.yytSettings` 等
  - 改进 `destroy` 方法，只移除当前组件命名空间的事件

## [1.0.31] - 2026-04-15

### 修复

- 🐛 **统一修复共享表单控件与设置开关 UI 回归** (`styles/main.css`, `modules/ui/components/settings-panel.js`)
  - `.yyt-select` 现改为箭头图标与深色控件背景同层渲染，常态 / hover / focus 不再出现发白
  - 设置页 6 个开关已切回现有自定义 toggle 结构，不再显示原生 checkbox
  - 保留原有设置项 `id` 与保存逻辑，只修正渲染结构与样式表现

- 🐛 **表格工作台“新增表格”改回标准 dialog 交互** (`modules/ui/components/table-form-renderer.js`)
  - 点击“新增表格”后不再直接把空白卡片内联插回列表，而是进入现有 dialog 流程
  - 取消 / 关闭不会污染当前表定义，保存后才回写到列表
  - 同步收紧表格编辑卡片与表格区透明度，避免继续呈现“半透明窗口”观感

## [1.0.30] - 2026-04-14

### 修复

- 🐛 **填表工作台导入链恢复：修复 `storage.namespace` 冲突** (`modules/core/storage-service.js`, `modules/table-engine/table-schema-service.js`, `modules/ui/components/table-workbench-panel.js`)
  - `StorageService` 的实例属性与 `namespace()` 方法不再同名，避免 `storage.namespace is not a function`
  - 修复后 `tableWorkbench` 相关模块可正常导入，顶级工作台页能够恢复渲染
  - 这次修复解决的是模块导入/初始化失败，不涉及表定义编辑体验本身

- 🐛 **自动化生命周期服务回退到 same-slot / 多事件事务入口** (`modules/tool-automation-service.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 不再错误地只依赖 `MESSAGE_RECEIVED + MESSAGE_SENT` 的简化版 MVU 入口
  - 自动服务现重新监听 `MESSAGE_RECEIVED / MESSAGE_UPDATED / MESSAGE_SWIPED / GENERATION_AFTER_COMMANDS / GENERATION_ENDED`
  - 同楼层 reroll / regenerate / swipe 会优先按 `messageId + swipe + assistant 指纹` 形成的 `executionKey` 调度，而不是被旧的一次性简化节流误杀
  - 新增按 execution key 的短时间窗口去重：同一轮事件回响不重复执行，但同楼层新 revision 仍可再次进入自动链

### 更改

- ♻️ **填表工作台最小手动 MVP 已接入独立顶级页签** (`modules/tool-registry.js`, `modules/app/popup-shell.js`, `modules/table-engine/*.js`, `modules/ui/components/table-workbench-panel.js`, `modules/ui/components/table-form-renderer.js`)
  - 当前 `tableWorkbench` 已作为独立顶级标签页接入 popup shell，不再与普通工具页混在同一个子页签集合中
  - 已落地最小手动链：fresh target resolve -> template/state load -> request build -> API -> tables JSON parse -> structured state commit -> optional mirror writeback
  - 当前工作台仍属于 MVP 阶段，但表定义已经不再要求直接手写 JSON；当前已切到结构化编辑器 MVP，下一阶段的主要缺口转为排序、模板、历史与更成熟的 visualizer / authoring 体验

- ♻️ **填表工作台切到结构化表定义编辑器 MVP** (`modules/table-engine/table-schema-service.js`, `modules/ui/components/table-form-renderer.js`, `modules/ui/components/table-workbench-panel.js`)
  - `tableWorkbench` 的 `tables` 字段已从 `json` textarea 主路径切换为 `tableDefinitions` 结构化编辑器字段
  - 当前已支持表格 / 列 / 行的增删、表格基础信息编辑，以及单元格内容内联编辑
  - 保存 / 运行前会统一编译为 runtime `tables`，原有 `table-update-service -> table-writeback-service` 执行与 revision-safe 写回主链保持不变
  - 当前这套编辑器仍是 MVP：已经解决“必须手写 JSON”的问题，但表 / 行 / 列排序、模板体系、历史 / 导入导出、visualizer shell 仍未完成

- ♻️ **MVU 风格自动生命周期主链落地** (`modules/tool-automation-service.js`, `modules/tool-execution-context.js`, `modules/tool-trigger.js`, `modules/tool-output-service.js`, `modules/context-injector.js`, `modules/tool-registry.js`, `modules/tool-manager.js`, `modules/core/settings-service.js`, `modules/app/bootstrap.js`, `modules/app/public-api.js`, `modules/ui/components/settings-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`, `docs/HOST_REGRESSION_CHECKLIST.md`)
  - 新增 `tool-automation-service.js` 作为唯一自动入口，直接监听宿主 `MESSAGE_RECEIVED / CHAT_CHANGED / MESSAGE_DELETED`，不再恢复旧 trigger/baseline/replay 状态机
  - 新增 `tool-execution-context.js`，统一构建手动链与自动链共用的 assistant 槽位上下文，并补齐 assistant base text / base fingerprint，避免把 toolkit 自己追加的块当成新的 assistant 原文
  - `tool-registry.js` / `tool-manager.js` / 设置面板 / 工具配置页新增 `automation` 配置；runtime 同步新增 `lastAuto*` 诊断字段
  - `bootstrap.js` 启动时自动挂载自动服务；`public-api.js` 新增自动服务启停、运行态查询与手动触发当前 assistant 楼层处理入口
  - 自动成功标准收口为：请求成功 + 写回成功 + `refreshConfirmed === true`
  - 执行 `npm run build`，构建通过

- ♻️ **事务诊断消费面对齐：工具页与文档切到 transaction-first 视图** (`modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 工具配置页中的“最近触发诊断”折叠区现优先读取 `getGenerationTransactionDiagnostics()`，可直接展示 `activeTransactions / recentTransactionHistory / recentHandledExecutionKeys`
  - 复制按钮现改为导出 `exportGenerationTransactionDiagnostics()`，不再继续以 `exportAutoTriggerDiagnostics()` 作为 UI 主导出口
  - API 文档与宿主回归清单已同步改写为 transaction-first 口径；`recentEventTimeline` 保留为辅助时序视图，而不是 UI 主语义

- ♻️ **楼层槽位事务元数据补齐：统一 slot binding / revision / transaction / source 写回语义** (`modules/tool-trigger.js`, `modules/tool-output-service.js`, `modules/context-injector.js`, `modules/tool-registry.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 自动执行上下文、消息级 session、全局诊断快照、工具 runtime 与写回事件现已统一补齐 `slotBindingKey / slotRevisionKey / slotTransactionId / sourceMessageId / sourceSwipeId`
  - `executionKey` 现正式与 `slotRevisionKey` 对齐，自动去重完全按“当前楼层 + 当前 swipe + 当前内容版本”收口，不再继续依赖 generationTrace 作为主锚点
  - `tool-output-service` 与 `context-injector` 现会把 slot transaction 元数据继续透传到写回结果与工具 runtime 中，方便直接定位“写到了哪层、哪页 swipe、哪次槽位事务”
  - 工具页折叠诊断、API 文档、宿主回归清单与进度文档已同步补齐新的 slot transaction 口径
  - 执行 `npm run build 2>&1`，构建通过且无警告

- ♻️ **自动触发主链真正切到楼层槽位驱动模型** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/tool-output-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `initToolTriggerManager()` 现直接注册 `GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED / MESSAGE_UPDATED / MESSAGE_SWIPED` 槽位监听；宿主只要给出 `messageId`，主链就优先按该楼层处理
  - 自动执行上下文现优先按事件命中的 assistant 楼层构建，不再把旧 baseline 确认链作为主路径前提；新增 `slotRevisionKey = chatId + messageId + effectiveSwipeId + assistantContentFingerprint`
  - 写回链新增 `writeback_echo_event` 守卫，避免工具自身写回触发的 `MESSAGE_UPDATED` 被再次当成有效回复重跑工具
  - `context-injector` 的自动写回已收紧为必须提供 `sourceMessageId`，并优先按 `sourceSwipeId / effectiveSwipeId` 写当前 swipe 文本
  - 执行 `npm run build 2>&1`，构建通过

- 🐛 **确认链改抄 MVU / Amily 语义：按当前楼层 / 当前 swipe 原位处理** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/tool-output-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 宿主一旦给出 `messageId`，确认链就直接按这层处理，不再把“baseline 后新增 assistant 楼层”当作唯一放行条件
  - `GENERATION_AFTER_COMMANDS` 在 `reroll / regenerate / swipe` family 下，不再只保留 speculative 观察态；若没有新楼层，也会直接回到 baseline assistant 槽位当前状态做原位确认
  - 自动去重键进一步收口到 `chatId + messageId + generationTraceId + effectiveSwipeId + assistantContentFingerprint`，保证“同一轮 generation 不重复、同一楼层新 reroll 可再次执行”
  - 写回目标固定优先绑定 `confirmedAssistantMessageId`，并同步更新当前 swipe 文本；工具页与聚合诊断新增 `generationMessageBindingSource / confirmedAssistantSwipeId / effectiveSwipeId`

- 🐛 **reroll 定向补修：支持同楼层 same-slot revision 确认** (`modules/tool-trigger.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - assistant 确认模型不再只接受“baseline 后新增 assistant 楼层”，现在也支持显式 `reroll / regenerate / swipe` 对同一 assistant 楼层的合法重写结果
  - generation baseline 新增 assistant 内容指纹、`swipe_id` 与 swipe 数量快照，用于识别宿主复用同一 `messageId / chatIndex` 时的 same-slot revision
  - `MESSAGE_RECEIVED` 会在观察到正文 / swipe 变化时确认 same-slot revision；`GENERATION_ENDED` 还会为 same-text reroll 提供兜底确认
  - 工具页诊断折叠区、API 文档与宿主回归清单已同步补入 `confirmationMode / sameSlotRevision*` 字段，方便直接判断 reroll 是否真正进入了同楼层确认通道

- ♻️ **MVU 事务化收口 Phase T2：generation-aware dedupe 与 execution key 轨迹收口** (`modules/tool-trigger.js`, `modules/tool-registry.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - session key 已收口到 `chatId + messageId + generationTraceId` 语义，避免同楼层新 generation 被继续混进旧 session
  - 自动去重改为维护最近已处理 execution key 集合，并对外暴露 `handledExecutionKeyCount / recentHandledExecutionKeys`
  - 单工具 runtime 与工具页诊断同步补齐 execution key 轨迹展示

- ♻️ **MVU 事务化收口 Phase T3 / T4：writeback commit / refresh confirm 分层结果与 UI / 文档同步** (`modules/context-injector.js`, `modules/tool-output-service.js`, `modules/tool-trigger.js`, `modules/tool-registry.js`, `modules/app/public-api.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 写回链新增 `commit` 与 `refresh` 分层结果，显式记录主提交策略、实际提交策略、fallbackUsed、刷新请求通道、确认轮数与 confirmedBy
  - `hostUpdateMethod` 已明确收口为兼容别名，语义直接等价于 `commit.appliedMethod`
  - 工具 runtime、工具页折叠诊断与写回历史现可直接展示 refresh 通道列表与 confirmedBy，而不再只显示计数
  - `tool-output-service` 的 `meta.phases` 已对齐到 `request -> extract -> writeback -> refresh` 四阶段
  - 工具 runtime、工具页折叠诊断、公共 API 与回归文档已同步补齐 execution key 轨迹、主提交策略 / 实际提交策略与 refresh confirm 展示

- ♻️ **MVU 事务化收口 Phase T1：generation action 识别与诊断出口补齐** (`modules/tool-trigger.js`, `modules/app/public-api.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - session 冻结字段、history 条目与 drift 摘要现已补齐 generation action 相关字段，能够直接区分 trace 漂移与 generation action 漂移
  - 对外 API 新增 `getGenerationTransactionDiagnostics()` / `exportGenerationTransactionDiagnostics()` 事务化别名出口
  - API 文档同步补充 generation action drift、recent handled execution key 与事务化诊断语义说明

- ♻️ **S2 存储接口收口第一轮** (`modules/api-connection.js`, `modules/preset-manager.js`, `modules/regex-extractor.js`, `README.md`, `docs/API_DOCUMENTATION.md`, `docs/EXTENSION_GUIDE.md`, `docs/CODEBASE_DIET_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - API 配置、API 预设、规则提取模块已优先改用 `core/storage-service.js` 主接口
  - `storage.js` 继续保留为 compatibility adapter，不破坏历史调用
  - README / API / 扩展 / 瘦身 / 进度文档已同步说明“新代码优先使用 storage-service，storage.js 为旧接口适配层”
  - 执行 `npm run build 2>&1`，构建通过

- ♻️ **代码瘦身与 compatibility 模块减载收口** (`index.js`, `modules/app/bootstrap.js`, `modules/app/popup-shell.js`, `modules/app/public-api.js`, `modules/tool-trigger.js`, `README.md`, `docs/API_DOCUMENTATION.md`, `docs/EXTENSION_GUIDE.md`, `docs/CONTRIBUTING.md`, `docs/OPTIMIZATION_PROGRESS.md`, `docs/CODEBASE_DIET_PLAN.md`)
  - `ui-components.js` 与 `prompt-editor.js` 已从启动期常驻装载改为显式按需加载的 compatibility 模块
  - popup shell 现在优先走 `modules/ui/index.js` 主路径，仅在必要时回退装载 `ui-components.js`；旧分段提示词编辑路径也已改为按需加载 `prompt-editor.js`
  - `tool-trigger.js` 已移除对 `tool-executor.js` 的静态依赖，compatibility 执行回退改为惰性加载
  - 新增 `docs/CODEBASE_DIET_PLAN.md`，专门记录本轮后收口减重方案与验收边界
  - API 文档新增 `loadLegacyModule(moduleKey)` 说明，扩展与贡献文档同步明确 compatibility 模块边界

- 🎨 **主工具箱与高频面板整体 UI / HTML 美化收口** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/tool-manage-panel.js`, `modules/ui/components/settings-panel.js`)
  - 重构主工具箱 popup shell 的 HTML 层级，新增 topbar、workspace、sidebar、main content frame 与更清晰的 footer 信息区
  - 将主导航升级为“图标 + 标题 + 简述”的工作台侧栏样式，补充页面说明、页面统计与当前页面概览区
  - 统一 popup / content frame / section / 表单 / 按钮 / 对话框 / 响应式风格，整体强化工作台感与层级节奏
  - 优化工具配置页 hero 区、手动操作区、runtime 卡片与调试区密度；优化工具列表页 hero 区与统计卡片；优化设置页 hero 区与状态 chips
  - 执行 `npm run build` 构建验证通过

- 🎨 **阶段后收尾：主工具箱 HTML 结构与视觉层次优化** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`)
  - 调整主工具箱 header 结构，补充品牌区、副标题、版本徽标、拖动提示与当前页面状态展示
  - 优化 content / footer 分区层次，增加更明确的工作台感和信息层级
  - 将 popup 激活态、按钮、标题与底部状态区进一步收口到统一主题 token，避免美化后再次出现深浅主题下对比不足的问题
  - 执行 `npm run build` 构建验证通过

- 🔧 **阶段后收尾：文档同步、主窗口拖动与主题应用修复** (`README.md`, `docs/EXTENSION_GUIDE.md`, `docs/CONTRIBUTING.md`, `modules/app/popup-shell.js`, `modules/ui/components/settings-panel.js`, `modules/app/bootstrap.js`, `styles/main.css`, `modules/window-manager.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 同步更新 `README.md`、`docs/EXTENSION_GUIDE.md` 与 `docs/CONTRIBUTING.md`，修正文档中仍把 `ui-components.js`、`window-manager.js`、旧版页签和旧目录结构当成主路径的问题
  - 为主工具箱弹窗增加头部拖动能力，避免 popup 固定居中后无法调整位置
  - 修复设置页主题切换、紧凑模式与动画开关应用到错误 document 的问题，确保 popup 所在顶层文档能够真正响应主题变更
  - 补齐主题变量与弹窗样式对接，统一主 popup 与独立 window 的主题 token 来源

- 🔧 **Phase 5：调试与回归保障增强完成** (`modules/tool-registry.js`, `modules/tool-trigger.js`, `modules/tool-output-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 为自动触发链新增最近一次全局触发快照 `lastAutoTriggerSnapshot`，统一记录最近触发事件、去重键、命中的工具列表与跳过原因
  - 为单工具运行态新增最近触发时间、最近触发事件、最近消息键、最近跳过原因、最近执行路径、最近写回状态与最近失败阶段等紧凑诊断字段
  - 在工具输出主链中补齐 `failureStage` 与 `writebackStatus` 结构化元数据，方便定位失败发生在构造消息、发送请求、提取输出还是写回阶段
  - 在工具配置面板中新增折叠式“最近触发诊断”区，低噪声展示最近一次诊断信息而不干扰默认使用体验
  - 执行 `npm run build` 构建验证通过，完成本轮 Phase 5 收尾

- 🔧 **Phase 4：UI 装配中心统一完成** (`index.js`, `modules/app/bootstrap.js`, `modules/app/popup-shell.js`, `modules/app/public-api.js`, `modules/ui/index.js`, `modules/ui/ui-manager.js`, `modules/ui-components.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 将 `modules/ui/index.js` 提升为当前 UI 主装配入口，并在 `bootstrap` 中统一完成 UI 初始化与样式聚合注入
  - `popup-shell.js` 现在优先通过统一 helper 渲染 API 预设、正则、工具列表、默认工具、破限词和设置面板，减少对兼容层静态导出的主路径依赖
  - `ui-manager.js` 的职责说明收敛为组件注册 / 渲染 / 销毁 / 样式聚合，不再被误解为 popup shell 路由中心
  - `ui-components.js` 降级为 compatibility facade，并在公开 API 中新增 `getUi()` / `getUiModule()` 作为推荐入口
  - 执行 `npm run build` 构建验证通过，为进入 Phase 5 提供稳定基线

- 🔧 **Phase 3：执行链清主次完成** (`modules/tool-executor.js`, `modules/tool-trigger.js`, `modules/tool-output-service.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 明确自动工具主链已经收敛为 `tool-trigger -> tool-output-service -> tool-prompt-service -> api-connection -> context-injector`
  - 为 `tool-executor.js` 中的 `buildToolMessages()` 与 `executeToolWithConfig()` 增加 compatibility / legacy 定位说明，弱化其主链语义
  - 在触发模块中显式区分自动执行主路径与兼容执行回退路径
  - 在 API 文档中补充自动主链、手动执行链与兼容执行链说明，减少后续维护误判
  - 执行 `npm run build` 构建验证通过，为进入 Phase 4 提供稳定基线

- 🔧 **Phase 2：工具模型统一完成** (`modules/tool-manager.js`, `modules/tool-registry.js`, `modules/ui/components/tool-manage-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 为 `tool-manager.js` 增加默认定义构造与运行态归一化函数，统一 legacy 字段到新运行模型的映射出口
  - 收口 `tool-registry.js` 中自定义工具基础运行配置、配置合并与首份运行态配置初始化逻辑
  - 调整“工具列表 -> 新建工具”流程，使自定义工具创建后立即具备完整新结构运行配置
  - 工具配置页的模板重置改为基于运行态基础配置，进一步统一显示值、存储值与执行读取值
  - 执行 `npm run build` 构建验证通过，为进入 Phase 3 提供稳定基线

- 🔧 **Phase 1：入口层拆壳完成** (`index.js`, `modules/app/bootstrap.js`, `modules/app/popup-shell.js`, `modules/app/public-api.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增 `bootstrap` 模块，集中承接模块动态加载、样式注入、主题恢复与魔棒菜单入口注册
  - 新增 `popup-shell` 模块，承接主弹窗、主/子标签切换与页面装配逻辑
  - 新增 `public-api` 模块，统一组装 `YouYouToolkit` 对外公开 API
  - 将 `index.js` 收敛为薄入口，仅保留上下文装配、全局挂载与初始化调用
  - 执行 `npm run build` 构建验证通过，为进入 Phase 2 提供稳定基线

### 文档

- 📝 **新增 MVU 深度解析与事务化收口施工文档** (`docs/MVU_DEEP_ANALYSIS.md`, `docs/MVU_TRANSACTION_REWORK_PLAN.md`, `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增 `docs/MVU_DEEP_ANALYSIS.md`，重新梳理当前自动触发、messageId 级去重与写回刷新问题的根因模型
  - 新增 `docs/MVU_TRANSACTION_REWORK_PLAN.md`，将下一轮主线明确收口为 `generation action 识别 -> generation-aware dedupe -> writeback refresh confirm`
  - 将 `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md` 收口为历史专项与 N1 / N2 宿主验收档案，不再单独承担本轮主施工文档职责
  - 宿主回归清单与 API / 进度文档同步补入“同楼层 reroll / 重roll 不再自动触发”的新证据与下一轮规划口径

- 📝 **新增 N1 宿主自动触发链验收记录模板** (`docs/N1_AUTO_TRIGGER_ACCEPTANCE_RECORD.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增独立记录模板，用于统一登记 A10 / A11 / A12 / A13 的宿主验收结果
  - 在宿主回归清单中补充该模板引用，避免后续宿主结论继续零散散落在聊天记录或临时笔记里
  - 在进度文档中补记“下一步等待 N1 实机结果回填”的状态

- 📝 **实现回顾与下一施工方案收口** (`docs/HOST_REGRESSION_CHECKLIST.md`, `docs/CODEBASE_DIET_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 为 N1 宿主自动触发链验收补充统一登记模板，避免验收结果继续停留在口头结论
  - 在 `docs/CODEBASE_DIET_PLAN.md` 中明确下一轮优先级为 `N1 宿主验收 -> S2 存储接口收口 -> S3 启动期进一步减载`
  - 在进度文档中补登记本轮代码瘦身收口已完成构建验证，并同步沉淀这次回顾结论

- 📝 **文档可信度收敛与无效文档清理** (`README.md`, `docs/API_DOCUMENTATION.md`, `docs/EXTENSION_GUIDE.md`, `docs/CONTRIBUTING.md`, `docs/SHUJUKU_ARCHITECTURE.md`)
  - 重写并校正 README 中仍停留在旧版 STScript / 消息源生成器语义上的“正则提取”说明，统一到当前规则提取面板语义
  - 修正 API 文档中已经失真的 regex extractor 接口描述，改为当前真实的规则模板 / 标签规则 / 规则预设 / 导入导出 API
  - 同步调整扩展开发指南与贡献指南中的旧入口、旧扩展方式与文档维护边界说明
  - 删除 `docs/SHUJUKU_ARCHITECTURE.md` 这份不属于当前项目正式文档区的参考残留文档

- 📝 **自动触发链下一阶段施工编排正式收口** (`docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 将下一阶段正式收口为 `N1 宿主自动触发链验收 ->（若失败）第三轮自动触发定向补修 ->（若通过）N2 写回链宿主专项`
  - 在专项文档中补齐 N1 的执行顺序、通过标准、失败回退点，以及 N1 失败后的补修边界，避免继续口头约定推进
  - 在进度文档中同步固化当前执行口径，明确未完成 N1 前不继续扩大自动触发判断面

- 📝 **新增自动触发链残余风险专项施工文档** (`docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_EXECUTION_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增独立专项文档，用于承载自动触发链主问题修复后剩余的 baseline 竞态、历史 replay 风险与后续宿主回归矩阵
  - 在总施工方案文档中补充“后续专项补修建议”，避免继续把残余风险零散塞回主 Phase 方案
  - 在施工进程文档中补记专项文档已建立，并说明后续若继续施工应以该专项文档为准

- 📝 **优化施工文档完成度复核** (`docs/OPTIMIZATION_EXECUTION_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 为施工方案文档补充 2026-03-24 完成度复核，明确 5 个 Phase 与 11 项实施清单均已在代码中找到落点
  - 更新施工进程文档中的最后更新时间、当前状态、施工日志与回归结论，正式将“文档施工状态”收口为已完成
  - 为架构分析文档补充“施工前基线 / 施工后复核”定位说明，避免把历史问题误读成当前代码现状

- 📝 **新增优化方案施工文档** (`docs/OPTIMIZATION_EXECUTION_PLAN.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 基于最新架构梳理结果，新增面向后续重构落地的施工文档
  - 将优化目标收敛为入口拆壳、工具模型统一、执行链清主次、UI 装配中心统一、调试与回归保障增强五个阶段
  - 为每个阶段补充目标、涉及文件、实施内容、风险点、验收标准与整体施工顺序

- 📝 **新增优化施工进程文档** (`docs/OPTIMIZATION_PROGRESS.md`, `docs/OPTIMIZATION_EXECUTION_PLAN.md`)
  - 新增用于记录实际施工过程的进程文档，和“架构分析 / 优化方案”文档形成分层分工
  - 初始化 Phase 看板、当前施工焦点、阶段验收项、施工日志与回归检查模板
  - 为后续逐阶段实施提供统一记录载体

- 📝 **补充 shujuku / MVU 参考项目启发结论** (`docs/OPTIMIZATION_EXECUTION_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 结合 shujuku 的事件门控、多层兜底与宿主兼容策略，明确当前项目的高风险点主要集中在触发链与宿主时序问题
  - 结合 MVU 的单一运行态模型、强约束输出与生命周期回调思想，明确后续工具模型统一与结构化工具链的演进方向
  - 将参考项目启发同步到优化方案与施工进程文档，作为 Phase 1 前的设计输入

### 修复

- 🐛 **宿主回归辅助能力增强：补齐 session 漂移摘要与门控/事件桥接诊断概览** (`modules/tool-trigger.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `getToolTriggerManagerState()` 现已补齐 `activeSessions / registeredEvents / pendingTimerCount / eventBridge / gateState`，用于直接查看当前事件注册、桥接状态、待执行定时器与门控状态
  - `getAutoTriggerDiagnostics().summary` 现已补齐 `phaseCounts / consistency`，可快速统计 active/history 中各 phase 数量，并汇总 session 冻结字段与当前 generation 状态之间的漂移次数
  - `activeSessions / recentSessionHistory` 条目现已新增 `driftDetected / generationTraceDrifted / generationUserIntentDrifted / baselineResolvedStateChanged / baselineResolutionAdvancedSinceSessionCreation / driftReasons`，用于区分“baseline 正常补全”与“session 归属真的漂移”

- 🐛 **宿主回归辅助能力增强：补齐事件时间线、A10~A13 verdict hints 与诊断导出入口** (`modules/tool-trigger.js`, `modules/app/public-api.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 自动触发诊断现已新增 `recentEventTimeline`，可按时间顺序回看 generation、baseline、session phase、UI guard 的关键事件轨迹
  - 新增 `verdictHints`，对 A10 / A11 / A12 / A13 提供第一层快速可疑项提示，降低宿主判案起手成本
  - 对外 API 新增 `YouYouToolkit.exportAutoTriggerDiagnostics()`，可直接导出一份纯 JSON 诊断快照，用于宿主回归留档或 issue 附件

- 🐛 **宿主回归辅助能力增强：工具页诊断折叠区接入 verdict hints / timeline / 诊断导出按钮** (`modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 工具配置页中的“最近触发诊断”折叠区已不再只显示单工具 runtime，还会同步显示 N1 快速判读 chips、active/timer/phase 摘要与最近自动触发时间线
  - 新增“复制自动触发诊断 JSON”按钮，直接复用 `exportAutoTriggerDiagnostics()` 导出当前快照，便于宿主实机回归留档
  - 这样宿主侧除了控制台外，也可直接在 UI 内完成第一轮排查与快照复制

- 🐛 **宿主回归辅助能力增强：新增自动触发诊断聚合 API** (`modules/tool-trigger.js`, `modules/app/public-api.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 新增 `getAutoTriggerDiagnostics(options)`，统一聚合 `summary / activeSessions / recentSessionHistory / lastEventDebugSnapshot / lastAutoTriggerSnapshot`
  - 对外 API 已增加 `YouYouToolkit.getAutoTriggerDiagnostics()` 入口，方便宿主环境直接调用
  - 回归清单与 API 文档同步补充该诊断入口的使用方式，减少宿主验收时手工拼装状态的成本

- 🐛 **宿主回归准备：消息级 session 历史补齐 generation 意图诊断字段** (`modules/tool-trigger.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `messageSessions / recentSessionHistory` 现在会同步记录 `baselineResolved / provisionalBaseline / generationStartedByUserIntent / generationUserIntentSource / generationUserIntentDetail / lastUserIntentSource`
  - 这样在宿主里排查 A12 / A13 时，可以直接对照每个 session 在 `received / scheduled / handling / skipped / completed` 各阶段看到的 generation 意图状态，而不是只能依赖最近一次全局快照
  - 宿主回归清单与 API 文档同步补充了这些字段的观测方式与预期结果

- 🐛 **自动触发专项补修第二轮：恢复用户主动 `regenerate / swipe` 的合法确认路径** (`modules/tool-trigger.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `GENERATION_STARTED` 的用户意图判定不再只依赖“最近是否出现新的用户楼层”，而是同时支持显式用户 generation 动作识别；当前已将 `regenerate`、`swipe` 视为合法用户意图来源
  - `getGenerationConfirmationEligibility()` 不再把 `startedByUserIntent = false` 当成系统级硬阻断，`ignoreAutoTrigger` 重新回归监听器设置层控制，避免合法用户重新生成被误打成 `ignored_auto_trigger`
  - 调试快照新增 `generationUserIntentSource / generationUserIntentDetail / lastUserIntentSource` 等字段，用于区分“最近用户发送”“显式 regenerate/swipe”与“确实无用户意图”三类来源
  - 工具诊断面板、API 文档与宿主回归清单同步更新，新增对用户主动 regenerate/swipe 与非用户意图 generation 的区分说明

- 🐛 **自动触发链专项补修：baseline 竞态与历史 replay 防线增强** (`modules/tool-trigger.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `GENERATION_STARTED` 改为先同步写入 provisional baseline，再异步补全正式 baseline，降低宿主高时序下因 baseline 尚未就绪而误跳过真实回复的风险
  - `MESSAGE_RECEIVED` 新增历史 replay 防线：即使事件携带 `messageId`，若不属于当前 active generation 或超出合法确认窗口，也会被拦截
  - 调试快照新增 `baselineResolved / baselineResolutionAt / provisionalBaseline / historicalReplayBlocked / historicalReplayReason` 等字段
  - 工具配置面板的跳过原因文案同步补齐 `historical_replay_message_received / message_received_outside_active_generation / dry_run_generation` 等新分支

- 🐛 **移除误做的壳层“保存当前工具”按钮** (`modules/app/popup-shell.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 删除 popup shell 主内容头部额外补上的“保存当前工具”按钮入口
  - 保留工具配置面板内部原有的保存按钮，不影响正常保存逻辑
  - 避免继续保留这类壳层级误做入口，减少界面歧义

- 🐛 **自动触发链状态机收口，修复旧对话 / 聊天信息窗口误触发工具** (`modules/tool-trigger.js`, `docs/API_DOCUMENTATION.md`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 在 `GENERATION_STARTED` 时记录 generation baseline，后续只允许 baseline 之后新增的 assistant 楼层成为本轮确认目标，不再回退吸收“当前聊天里最后一条 assistant 消息”
  - 将 `GENERATION_AFTER_COMMANDS` 默认降级为 speculative 观察事件；缺少明确消息身份时只记录 session，不再直接进入执行调度
  - 将 `MESSAGE_RECEIVED` 收紧为“必须带 `messageId` 且最终确认命中 assistant 新楼层”才允许执行；无身份事件统一视为宿主 UI 副作用
  - 将 `dryRun` 升级为系统级硬阻断，并补充 `confirmationSource / confirmedAssistantMessageId / skipReasonDetailed / uiTransitionGuard` 等调试字段
  - 新增 `CHAT_CHANGED / CHAT_CREATED` 触发的 UI 过渡守卫，降低打开旧对话、聊天信息窗口、消息详情窗口时的宿主副作用误触发风险
  - 用户已在宿主环境确认：打开旧对话 / 聊天信息窗口不再误触发工具，正常回复链保持可用

- 🐛 **打开宿主聊天信息窗口时的自动工具误触发修复** (`modules/tool-trigger.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `MESSAGE_RECEIVED` 兜底链现在要求“存在明确消息身份”或“当前确实处于生成中”才允许继续回退到最新消息推断，避免打开聊天信息窗口等宿主 UI 操作时被误当成有效回复事件
  - 对无消息身份且非生成期的 `MESSAGE_RECEIVED` 事件统一标记为 `unrelated_ui_event` 并直接忽略，不再触发工具请求
  - 执行 `npm run build` 构建验证通过

- 🐛 **滚轮滚动恢复与主工具箱窗口进一步放大** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 移除拖拽滚动层对 `wheel` 事件的拦截，恢复鼠标滚轮在主内容区、设置区与工具列表中的原生滚动行为
  - 保留按住左键拖拽滚动能力，但避免与原生滚轮滚动互相打架
  - 将 popup 主窗口继续放大到更接近宿主视口上限，并同步更新 fallback 内置样式，避免外部样式加载失败时尺寸回退
  - 执行 `npm run build` 构建验证通过

- 🐛 **工具详情区滚轮代理与顶部保存按钮补齐** (`modules/app/popup-shell.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 工具详情区现在支持“鼠标位于内容区任意位置时，滚轮即可驱动当前详情区滚动”，不再必须把光标精确移到滚动条上
  - 为 textarea、提取预览、下拉面板和对话框正文保留原生内部滚动优先级，避免细分区域滚动被外层抢走
  - 在工具配置页 hero 区补充顶部“保存配置”按钮，减少每次修改后都要拖到底部才能保存的成本
  - 执行 `npm run build` 构建验证通过

- 🐛 **工具详情滚轮命中修正与壳层保存按钮兜底** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 修正工具详情区滚轮代理的命中层级，使滚轮优先驱动当前激活工具详情容器，而不是停留在外层 content 容器导致视觉上“没滚动”
  - 在 popup shell 主内容头部直接补充壳层“保存当前工具”按钮，并同步补齐主样式与 fallback 样式，避免动态工具 hero 内按钮未及时渲染时仍然无保存入口
  - 执行 `npm run build` 构建验证通过

- 🐛 **自动触发 message session 收敛、写回块身份与诊断历史增强** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/tool-output-service.js`, `modules/tool-registry.js`, `modules/core/settings-service.js`, `modules/ui/components/settings-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/HOST_REGRESSION_CHECKLIST.md`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 自动触发链新增消息级 session 聚合：`GENERATION_ENDED / GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED` 现在会尽量归并到同一条消息的生命周期记录中，并暴露 `activeSessionCount / recentSessionHistory`
  - listener 设置新增 fallback 开关、session 窗口与历史保留条数，设置页也同步补齐了对应开关与说明文案
  - 写回链新增块身份、替换结果与冲突诊断字段，用于区分“替换旧块 / 保守插入新块 / 影响其他工具块”三类结果
  - 单工具运行态新增 `lastTraceId / recentTriggerHistory / recentWritebackHistory`，工具配置面板可直接查看最近触发历史与最近写回历史

- 🐛 **自动触发仅响应 AI 楼层并收敛重复去重日志** (`modules/tool-trigger.js`, `docs/API_DOCUMENTATION.md`, `docs/OPTIMIZATION_PROGRESS.md`)
  - `MESSAGE_RECEIVED` 兜底链现在会先解析实际命中的消息楼层；若判定为用户消息或其他非 AI 楼层，则直接在事件级忽略，不再误触发自动工具链
  - 构建自动执行上下文时，若事件已明确给出目标消息 ID，会优先锁定该楼层，减少把用户消息事件误配到“最新 AI 回复”的概率
  - 同一消息的兜底调度键现在优先基于消息 ID 合并，且对短时间内重复命中的 `duplicate_message` 日志做了抑制，降低控制台噪声

- 🐛 **工作台可视区过小与内容区不可滚动/拖拽修复** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/tool-manage-panel.js`, `modules/ui/components/settings-panel.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 收紧 popup 顶部概览、侧栏与主内容说明区的高度与间距，把更多垂直空间让给实际配置区
  - 为主内容区、激活页签区、子面板区和侧栏导航补齐高度继承、最小宽高约束与 `overscroll-behavior`，恢复稳定滚动
  - 新增基于鼠标拖拽的滚动支持：可直接在侧栏导航、次级导航和主内容区按住拖动滚动，不再只能依赖细滚动条
  - 同步收紧工具配置页 hero、工具管理页 hero、设置页 hero 的密度，扩大可操作区域
  - 执行 `npm run build` 构建验证通过

- 🐛 **主工具箱工作台布局错乱与样式注入回退修复** (`modules/app/popup-shell.js`, `styles/main.css`, `modules/app/bootstrap.js`, `docs/OPTIMIZATION_PROGRESS.md`)
  - 调整主工具箱工作台 topbar / sidebar / main workspace 的栅格比例、当前页面信息卡与响应式断点，避免导航区过宽、内容区被严重压缩
  - 收紧侧栏宽度并增强主内容区高度继承与滚动约束，修复页面信息堆叠成“纯文本块”后可读性极差的问题
  - 修复 `bootstrap` 中 `styles/main.css` 仅按单一路径拉取导致宿主环境加载失败的问题；现在会尝试基于 `import.meta.url` 的多个候选路径，并在失败时回退到更新后的内置工作台骨架样式
  - 执行 `npm run build` 构建验证通过

- 🐛 **自动触发初始化时序补强与 youyou 前缀控制台日志增强** (`modules/tool-trigger.js`)
  - 触发模块初始化时改为同时等待 `SillyTavern API` 与 `eventSource` 就绪，避免在酒馆事件源尚未挂载时过早初始化导致自动监听失效
  - 新增一组始终输出的 `[youyou_trigger]` 控制台日志，覆盖初始化、事件注册、事件接收、自动调度、跳过原因、工具执行成功/失败等关键节点
  - 便于在酒馆控制台中快速判断“有没有收到事件、有没有进入自动触发、是在哪一步被跳过或失败”

- 🐛 **事件源获取兼容层补强** (`modules/tool-trigger.js`)
  - 自动触发初始化不再只依赖 `SillyTavern.eventSource`，而是增加对 `topWindow.eventSource`、`SillyTavern.getContext()` 以及 `/script.js` 导出事件源的多源兼容探测
  - 修复此前 `hasApi: true, hasEventSource: false` 时会一直卡在重试初始化、导致自动触发链根本无法启动的问题
  - 新增事件源来源日志，便于确认当前酒馆环境究竟命中了哪条兼容路径

- 🐛 **写回链分层结果标准化与最终校验增强** (`modules/context-injector.js`, `modules/tool-output-service.js`, `docs/API_DOCUMENTATION.md`)
  - 保留 `contextInjector.inject()` 的布尔兼容接口，同时新增 `injectDetailed()` 返回分层写回结果，便于区分“找不到目标消息 / 宿主写回失败 / 写回后校验失败”
  - 写回结果现在会记录目标消息索引、写入字段、宿主写回方式、各步骤状态与最终校验结果
  - `tool-output-service.runToolPostResponse()` 的 `meta` 结构新增 `writebackDetails`，用于更精确定位写回链问题
  - 宿主写回逻辑新增 `setChatMessages -> setChatMessage` 的回退链，而不是前者失败后只停留在本地同步

- 🐛 **自动触发设置接线与事件级诊断补齐** (`modules/tool-trigger.js`, `modules/core/settings-service.js`, `modules/ui/components/settings-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`)
  - 将监听器设置真正接入自动触发主链：`listenGenerationEnded`、`ignoreQuietGeneration`、`debounceMs` 不再只是 UI / 存储项
  - 为 `ignoreAutoTrigger` 增加“最近用户发送意图”门控语义，用于尽量跳过插件/脚本引发的自动生成误触发
  - 新增 `lastEventDebugSnapshot` 事件级调试快照，帮助定位“宿主事件是否收到 / 是否被调度 / 在哪一步被跳过”
  - 修复 `destroyToolTriggerManager()` 使用错误回调清理监听器的问题，避免后续重绑时残留脏监听
  - 同步调整设置页说明文案与工具面板跳过原因文案，降低“设置看起来有，但实际上不生效”的误导

- 🐛 **工具列表入口、手动执行、自动触发与楼层刷新进一步修复** (`modules/tool-registry.js`, `index.js`, `modules/ui/components/tool-manage-panel.js`, `modules/ui/components/tool-config-panel-factory.js`, `modules/tool-trigger.js`, `modules/api-connection.js`, `modules/context-injector.js`, `docs/API_DOCUMENTATION.md`)
  - 新增可见的顶层 `工具列表` UI 页面，用户可直接在界面里创建、编辑、删除自定义工具；新建工具后会自动跳转到对应配置页
  - 修复 `follow_ai` 模式下“手动执行”被错误禁用的问题；现在该模式仅关闭自动额外解析，不再阻止手动执行
  - 自定义 API 请求链路新增优先尝试 `TavernHelper.generateRaw({ custom_api })`，使后台表现更接近 MVU / 酒馆原生额外模型请求
  - 自动触发链路新增 `GENERATION_AFTER_COMMANDS` 参考触发，并对 `MESSAGE_RECEIVED` 改为延迟调度，降低消息尚未稳定写入时的漏触发概率
  - 工具结果写回最新楼层时改为优先 `refresh: 'affected'`，补发 `MESSAGE_UPDATED`，并尝试额外调用空 `setChatMessage` 强制刷新，缓解插入后仍需手动刷新页面的问题

- 🐛 **工具输出标签保留与自定义工具页签打通** (`modules/tool-output-service.js`, `modules/tool-registry.js`, `modules/ui-components.js`, `index.js`, `docs/API_DOCUMENTATION.md`, `docs/EXTENSION_GUIDE.md`)
  - 修复工具结果写回最新 AI 楼层时会把提取用外层标签一并剥掉的问题；现在命中提取规则后会优先保留完整标签块，避免明明在模板里输出了 `<boo_FM>` / `<status_block>` / `<youyou>`，最终注入时却只剩内部正文
  - 打通“工具列表 -> 新建工具”与实际工具页签之间的链路：新建的自定义工具现在会自动出现在“工具”页签下，并复用统一配置面板进行编辑与手动测试
  - 补齐工具样式聚合，避免部分工具/自定义工具面板样式注入不完整

- 🐛 **自动监听稳定性、最新楼层回填与小幽点评工具接入** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/tool-prompt-service.js`, `modules/tool-output-service.js`, `modules/tool-executor.js`, `modules/tool-registry.js`, `modules/ui/index.js`, `modules/ui-components.js`, `modules/ui/components/tool-config-panel-factory.js`, `modules/ui/components/youyou-review-panel.js`, `index.js`, `README.md`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 自动监听在读取最新 AI 楼层时新增对 `message_id` 字段的兼容，并过滤 `MESSAGE_RECEIVED` 早期常见的 `...` 占位消息，降低“AI 已回复但工具未自动触发”的概率
  - `getToolsForEvent()` 不再只写死遍历摘要工具和状态栏，而是改为从所有启用的默认工具中按触发事件动态筛选，为新增工具自动触发打通链路
  - 工具请求构建恢复为“破限词前置消息 + 当前工具模板解析后的 user 消息”，避免必须额外配置 AI 指令预设消息才能运行，修复此前工具虽然监听到了回复、但实际没有构造出请求消息的问题
  - 最新楼层写回增强：插入工具结果时会额外尝试调用 `setChatMessages()` / `setChatMessage()`，并同步 `mes / message / content / text` 多字段，同时去除该工具上一次存储的纯文本结果，修复“获得工具回复后没有稳定插入到最新楼层”与“覆盖时重复叠加旧结果”的问题
  - 新增默认工具 `youyouReview`（小幽点评），并接入工具页签、配置面板、默认模板和自动触发链路，用于生成 `<youyou>` 与 `<gouzi>` 结构化点评输出

- 🐛 **工具双宏模型与绑定预设执行链收敛** (`modules/variable-resolver.js`, `modules/tool-prompt-service.js`, `modules/tool-output-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 删除旧的单一工具宏入口，正式收敛为 `{{toolPromptMacro}}`（工具模板提示词）与 `{{toolContentMacro}}`（处理好的 n 条消息正文与工具结果）两个宏，减少使用理解负担
  - 工具不再自动把模板提示词或正文拼接成额外消息；工具层现在只负责产出宏上下文，最终发送给额外模型的消息仅来自破限 / AI 指令预设渲染结果
  - 当未配置任何可发送的 AI 指令预设消息时，工具执行会直接给出明确报错，而不是继续发送空消息
  - 修复工具绑定 API 预设后仍走 `sendWithPreset()` 旧分支的问题；现在无论是否绑定预设，都会先解析成最终 `apiConfig`，再直接使用对应 API 与模型执行请求
  - 修复自定义 API 代理分支失败后无条件回退浏览器直连的问题；现在只有在检测到 SillyTavern 后端转发路由本身不可用时才回退，避免后端真实错误被吞掉后伪装成“外部 API 返回 HTML / URL 配错”

- 🐛 **工具执行前 API 校验、工具页签恢复与上下文即时刷新修复** (`modules/api-connection.js`, `modules/tool-output-service.js`, `modules/context-injector.js`, `index.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 工具在执行额外 API 调用前会先校验当前配置或绑定预设；当未启用主 API 且自定义 API 配置不完整时，会直接给出明确错误提示，避免请求落到错误 URL 后出现 `Unexpected token '<'` 这类 HTML 解析报错
  - 自定义 API 发送链路新增“优先走 SillyTavern 后端转发 `/api/backends/chat-completions/generate`，失败再回退浏览器直连”逻辑，尽量复用酒馆后端代理以规避浏览器直连自定义接口时的 CORS / HTML 跳转问题
  - 自定义 API 响应解析改为先读取原始文本再尝试 JSON 解析；如果服务端返回 HTML / 重定向页面，会给出“可能是 URL 配置错误或应启用主 API”的可读提示
  - 修复工具执行侧读取 API 预设时错误从 `settings.apiPresets` 取值、而不是从独立的 `api_presets` 存储键读取的问题，避免新建并保存的预设在工具执行时被误判为“不存在”
  - 进一步统一工具页显示值、工具配置存储值与历史 `tool_api_bindings` 绑定值的解析优先级；现在下拉框展示、保存结果与实际执行都会收敛到同一份 `output.apiPreset/apiPreset`，避免“界面看起来已绑定，但执行实际落到当前自定义 API”
  - 工具箱重新打开时，工具页现在会优先恢复上次选中的子工具页签，不再总是回退到第一个工具，修复“高亮在主角状态栏但内容仍是摘要工具”的错位问题
  - 工具结果写回最新 AI 楼层时会保留同楼层已有的其他工具输出，并同时同步 `context.chat` / `SillyTavern.chat` 引用后重复触发 `MESSAGE_UPDATED`，提升插入上下文后的界面即时刷新成功率
  - 破限词模板现在也会经过变量解析，可直接在破限词消息中使用 `{{extractedContent}}`、`{{recentMessagesText}}`、`{{rawRecentMessagesText}}`、`{{userMessage}}`、`{{toolName}}`、`{{toolId}}` 等“工具宏”来自定义插入位置
  - 当时新增过单一工具宏别名作为当前工具提取内容入口（现已在后续版本中移除）
  - API 预设面板的下拉选择现在会与“加载预设 / 当前已加载预设 / 保存覆盖目标”保持一致，修复仅切换下拉后看到的是某个预设、但保存或工具执行用的仍是旧配置的问题
  - 工具提示词不再自动追加“提取结果 / 最近消息正文”；若需要使用提取内容，改为由用户在模板或破限词中显式插入工具宏

- 🐛 **当前 API 配置 / 激活预设 / 工具宏显式注入进一步收敛** (`modules/api-connection.js`, `modules/ui/components/api-preset-panel.js`, `modules/tool-prompt-service.js`, `docs/API_DOCUMENTATION.md`)
  - 修复“使用当前API配置”仍直接读取 `settings.apiConfig`、未跟随当前激活 API 预设的问题；现在只要已激活某个预设，工具在未显式绑定专属预设时就会默认使用该激活预设
  - 修复 API 预设面板重渲染仍按裸 `settings.apiConfig` 回填表单、导致显示值与激活预设再次分叉的问题；面板现在优先显示当前激活预设对应配置
  - 修复加载预设后点击“保存配置”选择“不覆盖预设”时，虽然提示为仅保存当前配置，但实际仍保留激活预设的问题；现在该分支会同时切回“当前API配置”
  - 修复工具提示词模板实际上仍保留 `lastAiMessage` 隐式兜底追加的问题；现在模板与破限词都改为纯显式宏模式，不再偷偷补任何 AI 正文
  - 修复旧单一工具宏仅在破限词可用、正文模板里却未真正解析的问题；现在正文模板同样统一走变量解析器

- 🐛 **工具自动触发补强与最新 AI 上下文回填修复** (`modules/tool-trigger.js`, `modules/context-injector.js`, `modules/ui/utils.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 自动触发链路新增 `MESSAGE_RECEIVED` 兜底监听，并对 `GENERATION_ENDED / MESSAGE_RECEIVED` 共用同一套去重逻辑，降低部分环境下只收到消息事件、却未稳定触发工具链的问题
  - 构建执行上下文时改为带重试地读取最近聊天快照，优先锁定刚生成的最新 AI 消息，修复 AI 回复刚落盘时手动执行 / 自动执行读到旧消息的问题
  - 工具链读取 `{{injectedContext}}` 时改为直接读取“最新 AI 消息对象”上的镜像写回内容，不再把历史缓存聚合结果当作当前楼层上下文使用
  - 提取预览弹窗进一步限制最大高度并让正文区独立滚动，避免多楼层结果较长时超出屏幕

- 🐛 **工具主链路收敛为“最新 AI 楼层原文 -> 工具回复回写楼层原文”** (`modules/context-injector.js`, `modules/tool-output-service.js`, `modules/tool-prompt-service.js`, `modules/ui/components/tool-config-panel-factory.js`, `modules/tool-registry.js`, `docs/API_DOCUMENTATION.md`)
  - 删除主链路中的世界书注入配置与相关 UI，避免流程分叉影响工具执行
  - 删除工具提示词中的 `{{injectedContext}}` 自动拼接逻辑，避免历史状态混入本轮工具调用
  - 工具执行成功后改为直接把工具回复插入最新 AI 楼层原文，并按提取规则移除旧工具块后覆盖刷新
  - 上下文服务现仅保留“楼层消息写回 / 读取 / 清理”职责，不再承担聊天级缓存主链路角色

- 🐛 **工具提取顺序与上下文注入修复** (`modules/tool-output-service.js`, `modules/tool-prompt-service.js`, `modules/context-injector.js`, `modules/ui/components/tool-config-panel-factory.js`, `docs/API_DOCUMENTATION.md`)
  - 修复最近消息收集逻辑，明确按“最近 N 条 AI 消息”逆序回溯采集，避免用户消息夹在中间时导致可用 AI 条数不足
  - 调整“测试提取 / 工具提取”逻辑：正文提取与工具标签提取都会分别直接作用于每条原始 AI 消息，不再把一方的结果作为另一方输入
  - 修复工具提示词未真正带入 `injectedContext` 的问题；现在既支持 `{{injectedContext}}` 等占位符，也会在模板未显式引用时自动追加已注入上下文
  - 聚合工具上下文时按更新时间稳定排序，并让世界书目标解析兼容 `character` / `__character__` 两种写法
  - 修复“工具输出没有写回最新 AI 回复消息对象”的问题；现在注入成功后会额外把结果镜像保存到最新 AI 消息的自定义字段中，并尝试触发消息刷新
  - 工具面板中的测试提取结果改为按 AI 消息逐条展示原文、正文提取结果与工具提取结果，避免多条消息混在一个文本框里难以分辨
  - 修复逐条消息预览弹窗在内容过长时超出屏幕且没有滚动条的问题；对话框现在会限制最大高度，并让内容区独立滚动

- 🐛 **工具管理事件与导入参数兼容修复** (`modules/tool-manager.js`, `modules/ui/components/tool-manage-panel.js`)
  - 修复新建工具时统一发出 `TOOL_REGISTERED` 事件，避免创建工具也被错误视为更新工具
  - 修复工具管理面板与底层存储重复触发事件的问题，避免启用/禁用、创建、更新时出现重复事件广播
  - 修复 `importTools()` 只接受布尔值、但 UI 传入 `{ overwrite: false }` 对象时的逻辑歧义，现在同时兼容布尔参数和对象参数

- 🐛 **工具面板错误样式变量兼容修复** (`modules/ui/components/summary-tool-panel.js`, `modules/ui/components/status-block-panel.js`, `styles/main.css`, `index.js`)
  - 修复工具面板中使用不存在的 `--yyt-danger` 变量导致错误状态颜色在部分场景下失效的问题
  - 统一改为 `--yyt-error`，并增加 `--yyt-danger` 到 `--yyt-error` 的兼容别名，避免旧样式引用失效

- 🐛 **入口版本标识修正** (`index.js`, `docs/API_DOCUMENTATION.md`, `docs/ARCHITECTURE_ANALYSIS.md`)
  - 修正文档和入口注释中的版本号漂移问题，统一到当前版本 `0.6.2`

- 🐛 **消息监听门控与最近消息读取兼容性修复** (`modules/tool-trigger.js`)
  - 参考 shujuku 补充“发送意图”捕获逻辑：在发送按钮点击、回车发送等路径上提前记录用户真实发送意图，降低部分环境下 `MESSAGE_SENT` 时序不稳定带来的监听丢失概率
  - 为 `GENERATION_STARTED / GENERATION_ENDED` 补充 quiet / dryRun 门控上下文记录，自动工具执行会跳过静默生成与后台生成，避免误触发
  - 最近消息读取新增多字段兼容：聊天消息内容现在会同时兼容 `mes`、`message`、`content`、`text` 等结构，修复部分 TavernHelper / SillyTavern 环境下“测试提取拿不到任何消息”或自动执行后读不到最新 AI 回复的问题
  - 当 `GENERATION_ENDED` 后仍未取到有效 AI 回复时，自动工具链会直接跳过并写日志，避免空消息进入后续解析流程

- 🐛 **工具独立提取与世界书注入链路增强** (`modules/tool-registry.js`, `modules/context-injector.js`, `modules/tool-output-service.js`, `modules/tool-prompt-service.js`, `modules/tool-trigger.js`, `modules/ui/components/summary-tool-panel.js`, `modules/ui/components/status-block-panel.js`, `docs/API_DOCUMENTATION.md`)
  - 为每个工具新增独立提取配置：最大提取消息数、单独标签/正则规则，并保留 `extractTags` 兼容映射
  - 新增“测试提取”能力，可直接基于最近若干条角色消息预览提取前原文与提取后结果，方便排查规则是否生效
  - 修复手动执行虽然控制台成功但未真正写入上下文的问题：工具执行成功后现在会同步写入目标世界书，写入失败会直接标记执行失败
  - 参考 shujuku 的世界书注入思路，为每个工具增加独立世界书绑定、注入位置、Depth、Order 配置，并默认支持写入当前角色绑定世界书
  - 工具提示词上下文新增 `{{extractedContent}}` 与 `{{recentMessagesText}}` 变量，便于模板直接引用提取结果和最近消息原文
  - 最近消息提取改为优先使用 TavernHelper 的 `getChatMessages()` / `getLastMessageId()`，并在不可用时回退到 `SillyTavern.getContext().chat` 与 `SillyTavern.chat`，修复部分环境下“测试提取拿不到消息”的问题

- 🐛 **工具面板收敛与自动触发通知增强** (`modules/ui/components/summary-tool-panel.js`, `modules/ui/components/status-block-panel.js`, `modules/tool-trigger.js`, `modules/ui/utils.js`, `modules/ui-components.js`, `docs/API_DOCUMENTATION.md`)
  - 参考 shujuku / MVU 的配置思路，将工具页收敛为 5 个核心区块：模板修改框、输出模式、API 预设、破限预设、手动操作区
  - 删除原先冗余的启用、自动触发、覆盖旧结果、复制模板、重置整页、调试折叠等复杂交互，降低使用门槛
  - `follow_ai` 现在在 UI 上明确视为“不启用额外工具链”，只有 `post_response_api` 才会参与 AI 回复后的自动执行
  - 新增顶部通知：AI 回复被监听、自动执行开始、执行成功、执行失败都会在顶部显示明显提示，避免只看控制台难以确认状态
  - 新增手动执行入口，可直接基于当前模板 / API 预设 / 破限预设执行一次工具，方便排错与验证
  - 工具样式聚合逻辑同步更新，确保摘要工具与主角状态栏的新样式都能被正确注入

- 🐛 **破限词面板默认预设清理** (`modules/bypass-manager.js`, `modules/ui/components/bypass-panel.js`)
  - 移除强制注入的内置 `standard` 破限词预设，避免面板出现多余且难以处理的默认模板
  - 补充破限词面板各类失败场景的兜底提示，避免出现空白错误通知
  - 新增旧版破限词存储迁移：自动清理 `undefined` 默认预设、无 `id` 的历史样例模板，并规范化旧数据结构

- 🐛 **AI 回复监听与工具触发链路修复** (`modules/tool-executor.js`, `modules/tool-trigger.js`, `modules/tool-output-service.js`, `modules/tool-prompt-service.js`, `index.js`)
  - 修复 `getToolsForEvent()` 仍读取旧版 `triggerEvents` 字段，导致 `GENERATION_ENDED` 后无法找到应执行工具的问题
  - 在工具触发时按输出模式分别执行：`post_response_api` 走额外模型调用链，`follow_ai` 也会记录触发状态并显示通知
  - 修复工具输出服务的上下文注入参数顺序错误、重复拼接破限词消息、无法读取最新 AI 回复内容的问题
  - 初始化时为 `toolOutputService` 注入 API 连接模块，确保额外模型解析模式可以真正发起请求
  - 新增工具触发成功/失败 Toast 通知，并回写运行时状态到调试面板

### 计划中的功能

- 世界书注入集成
- 多作用域支持 (profile/character)
- 可视化执行历史面板
- 国际化支持

---

## [0.6.2] - 2026-03-15

### 修复

- 🐛 **工具触发模块初始化修复** (`index.js`)
  - **关键修复**：`initTriggerModule()` 从未被调用，导致 GENERATION_ENDED 事件监听器从未注册
  - 工具现在可以正确监听 AI 消息回复并自动触发执行
  - 在模块加载成功后立即初始化工具触发模块

- 🐛 **破限词面板内置预设判断修复** (`modules/ui/components/bypass-panel.js`)
  - 修复内置预设判断逻辑：从硬编码 `'standard'` 改为使用 `DEFAULT_BYPASS_PRESETS` 对象检查
  - 现在所有在 `DEFAULT_BYPASS_PRESETS` 中定义的预设都会被正确识别为内置预设
  - 内置预设不显示删除按钮，防止用户尝试删除不可删除的预设

- 🐛 **Toast通知显示修复** (`modules/ui/utils.js`)
  - 修复 toastr 不可用时错误消息不显示的问题
  - 新增自定义 Fallback Toast 实现，当 SillyTavern 的 toastr 不可用时显示可视化通知
  - 添加消息为空时的默认消息处理
  - 支持成功/错误/警告/信息四种类型的不同颜色显示

---

## [0.6.1] - 2026-03-15

### 修复

- 🐛 **破限词面板jQuery data属性修复** (`modules/ui/components/bypass-panel.js`)
  - 修复 jQuery data 属性访问问题：`data('preset-id')` → `data('presetId')`
  - 修复预设选择、删除、复制、设为默认等操作无法获取预设ID的问题
  - 修复消息ID访问问题：`data('message-id')` → `data('messageId')`

- 🐛 **主角状态面板旧格式修复** (`modules/ui/components/status-block-panel.js`)
  - 更新输出模式配置以兼容新的简化版格式

---

## [0.6.0] - 2026-03-15

### 简化重构

这次重构的核心是"收敛"——简化工具配置，删除过度设计，统一输出模式语义。

#### 修复

- 🐛 **主角状态面板旧格式修复** (`modules/ui/components/status-block-panel.js`)
  - 更新到 v3.0.0 简化版，与 summary-tool-panel.js 保持一致
  - 输出模式从 `inline/separate` 改为 `follow_ai/post_response_api`
  - 删除"可用变量"帮助文本（内部保留变量系统）
  - 新增破限词绑定配置区
  - 新增可折叠调试信息区

- 🐛 **破限词面板jQuery data属性修复** (`modules/ui/components/bypass-panel.js`)
  - 修复 jQuery data 属性访问问题：`data('preset-id')` → `data('presetId')`
  - 修复预设选择、删除、复制、设为默认等操作无法获取预设ID的问题
  - 修复消息ID访问问题：`data('message-id')` → `data('messageId')`

#### 更改
  - 输出模式常量更新：`INLINE` → `FOLLOW_AI`
  - 新增 `LEGACY_OUTPUT_MODES` 兼容映射
  - 新增 `shouldRunFollowAi` 方法（替代 `shouldRunInline`）
  - 保留旧方法作为兼容层

- 🔧 **UI组件简化** (`modules/ui/components/summary-tool-panel.js`)
  - 删除"可用变量"说明区
  - 输出模式选择：显示/隐藏额外API配置选项
  - 破限词绑定：启用后显示预设选择
  - 新增可折叠调试信息区
  - 样式优化：隐藏类、折叠动画、调试信息样式

#### 删除

- 🗑️ 删除工具页中的变量说明展示（内部保留变量系统）
- 🗑️ 删除 `PromptSegment` 外部概念
- 🗑️ 删除工具页复杂分段编辑器支持

#### 输出模式语义

新的输出模式定义：

- **`follow_ai`** (随 AI 输出)
  - 不执行额外解析链
  - 不调用额外模型
  - 不做上下文注入

- **`post_response_api`** (额外 AI 模型解析)
  - 监听 AI 回复结束
  - 使用工具绑定的 API 预设调用额外模型
  - 将结果注入上下文

#### 文档

- 📝 更新 CHANGELOG 记录 v0.6 简化重构
- 📝 更新 API 文档反映新的数据结构

---

## [0.5.0] - 2026-03-14

### 新增

- ✨ **设置服务** (`modules/core/settings-service.js`)
  - 统一全局配置管理
  - 执行器设置（并发数、重试次数、超时时间、队列策略）
  - 监听器设置（事件监听、过滤规则、防抖设置）
  - 调试设置（日志、执行历史、状态徽章）
  - UI设置（主题、紧凑模式、动画效果）

- ✨ **变量解析服务** (`modules/variable-resolver.js`)
  - 模板变量替换 `{{variableName}}`
  - 内置变量支持：`lastUserMessage`、`lastAiMessage`、`chatHistory`、`characterCard`、`toolName`、`injectedContext`
  - 正则提取变量 `{{regex.xxx}}`
  - 自定义变量注册

- ✨ **上下文注入服务** (`modules/context-injector.js`)
  - 按聊天隔离存储工具输出
  - 聚合上下文输出
  - 覆盖/追加模式支持
  - 上下文导入/导出

- ✨ **工具提示词服务** (`modules/tool-prompt-service.js`)
  - 提示词段落结构转API消息
  - 变量替换集成
  - 破限词消息合并
  - 提示词模板管理

- ✨ **破限词管理模块** (`modules/bypass-manager.js`)
  - 破限词预设CRUD
  - 消息列表管理（role、content、enabled）
  - 默认预设设置
  - 预设导入/导出
  - 工具绑定支持

- ✨ **UI组件**
  - `settings-panel.js` - 设置面板（执行器/监听器/调试/外观四个标签页）
  - `bypass-panel.js` - 破限词面板（左右布局，预设列表+编辑器）

- ✨ **工具配置结构扩展**
  - `trigger` - 触发配置
  - `prompt.segments` - 结构化提示词段落
  - `bypass` - 破限词绑定配置
  - `output` - 输出模式配置（inline/post_response_api）
  - `runtime` - 运行时状态

- ✨ **事件系统增强**
  - 新增 `SETTINGS_UPDATED` 事件
  - 新增 `TOOL_CONTEXT_INJECTED`、`TOOL_CONTEXT_CLEARED` 事件
  - 新增破限词相关事件
  - 新增工具执行事件

### 更改

- 🔧 **版本号更新** 到 0.5.0
- 🔧 **工具注册表** 扩展支持新的配置结构
- 🔧 **核心模块入口** 导出设置服务

### 文档

- 📝 更新架构文档，反映v0.5新增模块

---

## [0.4.0] - 2026-03-11

### 新增

- ✨ **核心层模块** (`modules/core/`)
  - `event-bus.js` - 事件总线，实现模块间松耦合通信
  - `storage-service.js` - 统一存储服务，支持命名空间隔离

- ✨ **UI层重构** (`modules/ui/`)
  - `ui-manager.js` - UI管理器
  - `components/` - 独立UI组件目录
    - `api-preset-panel.js` - API预设管理面板
    - `regex-extract-panel.js` - 正则提取面板
    - `summary-tool-panel.js` - 摘要工具面板
    - `status-block-panel.js` - 状态栏工具面板
    - `tool-manage-panel.js` - 工具管理面板

- ✨ **工具注册系统** (`modules/tool-registry.js`)
  - 工具动态注册与注销
  - 工具配置管理
  - API预设绑定

- ✨ **窗口管理模块** (`modules/window-manager.js`)
  - 独立浮动窗口创建
  - 窗口层级管理
  - 窗口状态持久化

- ✨ **提示词编辑器** (`modules/prompt-editor.js`)
  - 可视化段落编辑
  - 消息格式转换
  - 角色类型选择

### 更改

- 🔧 **架构重构** - 采用分层架构（核心层/服务层/UI层）
- 🔧 **入口优化** - index.js 简化为模块协调器
- 🔧 **弹窗系统** - 支持主顶栏和次级顶栏
- 🔧 **版本号更新** 到 0.4.0

### 文档

- 📝 更新架构文档，反映当前模块结构
- 📝 更新API文档，添加新增模块API
- 📝 删除过时的施工文档和参考项目文档

---

## [0.3.0] - 2026-03-09

### 新增

- ✨ **正则提取模块** (`modules/regex-extractor.js`)
  - 正则表达式测试与验证
  - 正则模板管理（创建/编辑/删除）
  - 内置5个常用正则模板（JSON内容、代码块、思考标签、对话引号、段落）
  - 自定义正则模板支持
  - 生成STScript脚本用于实际内容提取
  - 支持多种消息源（最后消息、角色消息、用户消息等）
  - 模板导入/导出功能
  - 捕获组索引配置

- ✨ **UI组件模块扩展** (`modules/ui-components.js`)
  - 新增正则提取面板
  - 正则测试区：实时测试正则表达式
  - 消息提取区：生成STScript命令
  - 模板列表展示与管理
  - 新增 `renderRegex()` 方法渲染正则面板
  - 新增 `getRegexStyles()` 方法获取正则面板样式

- ✨ **主入口更新** (`index.js`)
  - 新增"正则提取"导航标签页
  - 自动注入正则面板样式
  - 新增 `getRegexExtractor()` API方法

### 更改

- 🔧 版本号更新到 0.3.0
- 🔧 页面切换支持 `'regex'` 页面

### 文档

- 📝 更新README.md，添加正则提取功能说明
- 📝 更新API文档，添加正则提取模块API
- 📝 更新扩展指南，添加正则模块开发示例

---

## [0.2.1] - 2024-03-09

### 更改

- 🎨 **UI组件模块** (`modules/ui-components.js`) - 重大改进
  - **合并面板**：将API配置和预设管理合并到同一面板，简化操作流程
  - **移除连接测试**：不再需要连接测试功能，减少界面复杂度
  - **改进Toggle样式**：从简单checkbox改为美观的滑动开关，添加渐变和发光效果
  - **改进下拉框UI**：添加自定义下拉箭头，统一输入框样式
  - **修复模型选择器**：修复获取模型列表后下拉框宽度变短的问题
  - **新增预设对话框**：使用模态对话框代替prompt，支持输入名称和描述

### 修复

- 🐛 修复新预设编辑报错 "预设不存在" 的问题
- 🐛 修复切换预设时未保存配置导致操作丢失的问题

---

## [0.2.0] - 2024-03-09

### 新增

- ✨ **API连接管理模块** (`modules/api-connection.js`)
  - 支持自定义API配置（URL、API Key、模型、温度等参数）
  - 支持切换使用SillyTavern主API
  - 支持从API端点自动加载模型列表
  - 支持API连接测试
  - 支持发送测试请求验证配置
  - 兼容OpenAI及其他兼容API格式

- ✨ **预设管理模块** (`modules/preset-manager.js`)
  - 创建、编辑、删除API预设
  - 快速切换不同预设配置
  - 预设导入/导出（JSON格式）
  - 从当前配置快速创建预设
  - 预设复制/重命名功能
  - 预设数据验证

- ✨ **存储管理模块** (`modules/storage.js`)
  - 优先使用SillyTavern的extensionSettings存储
  - 自动回退到localStorage
  - 支持深度合并设置
  - 安全JSON解析/序列化

- ✨ **UI组件模块** (`modules/ui-components.js`)
  - Tab导航（API配置、预设管理、连接测试）
  - API配置表单
  - 预设列表展示
  - 连接测试面板
  - 完整的事件绑定系统

### 更改

- 🔧 重构项目结构为模块化设计
- 🔧 弹窗宽度增加到600px以适应更多内容
- 🔧 更新版本号到0.2.0

### 文档

- 📝 更新README.md，添加新功能说明
- 📝 更新API文档

---

## [0.1.0] - 2024-03-09

### 新增

- ✨ 魔棒区菜单项注册功能
- ✨ 独立弹窗系统
- ✨ ES Module 导入支持
- ✨ 自动初始化机制
- ✨ 样式注入系统

### 文档

- 📝 README 使用说明
- 📝 API 文档
- 📝 贡献指南
- 📝 扩展开发指南

### 构建系统

- 🔧 esbuild 构建配置
- 🔧 多格式输出支持 (ESM/IIFE)
- 🔧 开发模式监听

---

## 版本说明

### 版本号规则

- **主版本号 (MAJOR)**: 不兼容的 API 修改
- **次版本号 (MINOR)**: 向下兼容的功能性新增
- **修订号 (PATCH)**: 向下兼容的问题修正

### 标签说明

- `新增` - 新功能
- `更改` - 现有功能的变更
- `弃用` - 即将移除的功能
- `移除` - 已移除的功能
- `修复` - Bug 修复
- `安全` - 安全相关修复

---

## 贡献

如果你发现了 bug 或有功能建议，请在 [GitHub Issues](https://github.com/heis1696/youyou_Toolkit/issues) 中提交。

---

## 链接

- [API 文档](./API_DOCUMENTATION.md)
- [贡献指南](./CONTRIBUTING.md)
- [扩展开发指南](./EXTENSION_GUIDE.md)