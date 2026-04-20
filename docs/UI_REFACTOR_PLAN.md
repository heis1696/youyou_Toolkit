# UI 重构计划

## 背景

这轮工作不是零散修 UI 症状，而是先承认当前 UI 崩溃频发来自上游耦合，再按可验证阶段逐刀拆开。

当前全仓主要耦合轴有三条：

1. **执行链耦合**
   - `modules/tool-trigger.js`
   - `modules/tool-automation-service.js`
   - `modules/tool-output-service.js`
   - `modules/context-injector.js`
   - `modules/tool-execution-context.js`
   
   这些模块把上下文解析、事务身份、模型请求、assistant 槽位写回、运行态诊断连成一条长链。只动其中一个点，常会牵出相邻链路的隐式假设。

2. **UI / 工具模型耦合**
   - `modules/app/popup-shell.js`
   - `modules/tool-registry.js`
   - `modules/tool-manager.js`
   - `modules/ui/index.js`
   - `modules/ui/components/tool-config-panel-factory.js`
   
   导航、运行态、表单数据、动态子页签、兼容入口没有被清晰分层，导致工具模型变化会直接冲击 UI 生命周期。

3. **共享上下文 / compatibility 耦合**
   - `index.js`
   - `modules/app/bootstrap.js`
   - `modules/app/public-api.js`
   - `modules/ui-components.js`
   - `modules/prompt-editor.js`
   - `modules/tool-executor.js`
   
   巨型 `appContext`、`modules.*` 注入和 compatibility 回退路径仍在反向污染主线，导致“看起来只改新 UI”，实际仍会被旧入口拖回去。

## 当前 UI 根因模型

当前 UI 易崩的直接根因集中在以下几类：

1. **壳层生命周期归属不清**
   - `modules/app/popup-shell.js` 同时承担路由、挂载、重渲、事件响应、滚动保护和 compatibility 回退。
   - 结果是任一刷新语义变化都可能影响整个 popup 内容区。

2. **隐藏面板没有真正卸载**
   - 当前很多切页仍是隐藏旧容器，而不是显式销毁旧 host。
   - 旧面板的事件绑定、异步回调、增强控件状态仍可能继续存活。

3. **异步回调缺少容器仍有效的守卫**
   - `modules/ui/utils.js` 的 `isContainerValid()` 过去只检查 jQuery 对象是否存在。
   - 面板切页、关闭 popup、替换 host 后，旧异步仍可能继续写回 DOM。

4. **runtime 刷新与结构刷新复用同一通道**
   - `modules/tool-registry.js` 的 runtime 更新会走 `TOOL_UPDATED`。
   - 壳层可能把一次状态字段变化当成整页重建信号，造成工具运行期间其它 UI 跟着抖动甚至失效。

5. **面板内部仍有模块级状态与固定 DOM id**
   - 这会带来跨面板污染、同名节点冲突和增强控件清理不完整的问题。

## 目标

- 让 popup UI 的生命周期边界可预测。
- 让旧异步结果在切页、换面板、关窗后自动失效。
- 让 runtime 更新不再触发结构性重建。
- 让面板实例状态回到实例内，而不是残留在模块级或全局 DOM 上。
- 建立持续更新的进度文档，避免重构口径再次丢失。

## 非目标

- 本轮不重写整套 UI 注册系统。
- 本轮不同时重做执行链和 compatibility 回退策略。
- 本轮不为了“更优雅”而额外引入新的状态管理框架。
- 本轮不把所有旧模块一次性删掉；先稳主线，再收兼容边界。

## 分阶段方案

### Phase 1 — 建立文档基线

新增：
- `docs/UI_REFACTOR_PLAN.md`
- `docs/UI_REFACTOR_PROGRESS.md`

要求：
- 先归档全仓耦合地图，再收敛到 UI 根因。
- 以后每完成一个阶段，都在进度文档补充修改文件、验证结果、遗留问题和阶段边界变化。

### Phase 2 — 先切“异步写死容器”

目标文件：
- `modules/ui/utils.js`
- `modules/ui/components/tool-config-panel-factory.js`
- `modules/ui/components/local-transform-tool-panel-factory.js`

实施重点：
- 强化 `isContainerValid()`，要求目标节点仍挂在当前 document 上。
- 给共享工具面板加 render session / generation guard。
- 让以下异步路径在容器失效后直接放弃回写：
  - 世界书异步加载完成后的列表更新
  - 手动执行完成后的 `finally -> renderTo($container)`
  - 测试提取完成后的弹窗/UI 更新

### Phase 3 — 拆开 runtime 刷新和结构刷新

目标文件：
- `modules/tool-registry.js`
- `modules/app/popup-shell.js`
- 如有必要补 `modules/core/event-bus.js`

实施重点：
- runtime-only 更新不再默认走通用 `TOOL_UPDATED` 语义。
- `popup-shell` 只在导航结构真的变化时刷新主内容。
- `lastStatus`、`lastDurationMs` 一类字段变化不应触发整页重建。

### Phase 4 — 明确面板 host 生命周期

目标文件：
- `modules/app/popup-shell.js`
- `modules/ui/ui-manager.js`
- `modules/ui/components/tool-config-panel-factory.js`
- `modules/ui/components/local-transform-tool-panel-factory.js`

实施重点：
- `dynamicToolPanelCache` 从缓存活面板对象改为缓存工厂/描述符。
- 每次挂载创建新的 panel host。
- 切主 tab / 子 tab / shell refresh 时显式销毁旧 host。
- 组件只负责自己的容器；壳层负责 mount / unmount。

### Phase 5 — 清理模块级状态与固定 id 冲突

目标文件：
- `modules/ui/components/api-preset-panel.js`
- `modules/ui/components/bypass-panel.js`
- `modules/ui/components/tool-manage-panel.js`
- `modules/ui/components/settings-panel.js`
- 其它存在固定 id 的复用面板

实施重点：
- 把模块级 UI 状态收回实例内。
- 复用面板尽量改成容器内查询或实例级 id。
- custom select / dialog / file input 在 destroy 时必须按容器完成清理。

### Phase 6 — 最后收 compatibility 边界

目标文件：
- `modules/app/bootstrap.js`
- `modules/app/popup-shell.js`
- `modules/ui-components.js`
- `modules/prompt-editor.js`
- `modules/app/public-api.js`

实施重点：
- 在主路径稳定后，再逐步收紧 compatibility 回退。
- 明确哪些入口仍允许 fallback，哪些必须固定走新路径。
- 避免把生命周期重构和 compatibility 收口混在同一刀里做。

## 验证矩阵

### 静态验证
- `npm run build`

### 宿主环境手测
重点覆盖：
1. 快速切换主 tab 与 sub tab。
2. 在工具手动执行进行中切到别的面板。
3. 世界书仍在加载时切页或关闭 popup。
4. 在非当前页触发 `PRESET_CREATED`、`PRESET_UPDATED`、`TOOL_UPDATED`、`TOOL_REGISTERED`、`TOOL_UNREGISTERED`。
5. 连续打开/关闭 popup，确认没有：
   - 重复事件绑定
   - 旧弹窗残留
   - 旧 select portal 残留
   - 跨工具状态串页
6. 重点回归：
   - API 预设面板
   - 工具列表面板
   - 默认工具配置面板
   - 自定义工具配置面板
   - Ai 指令预设面板
   - 设置面板
   - 填表工作台

## 维护规则

- 本文档负责固定重构口径。
- `docs/UI_REFACTOR_PROGRESS.md` 负责记录阶段性现实状态。
- 如果后续实际实现偏离本文档，应优先更新文档，再继续施工。
