# UI 重构进度

## 当前状态

- 当前 canonical 文档入口已建立：`docs/UI_REFACTOR_PLAN.md`、`docs/UI_REFACTOR_PROGRESS.md`
- 当前优先级：推进 Phase 4，先收口 `popup-shell` 的 panel host 生命周期与活对象缓存问题
- 当前策略：继续保持每阶段只切一个主问题；Phase 4 只处理 mount / unmount 与缓存归属，不回头扩 runtime 细粒度刷新

## 阶段记录

### Phase 1 — 建立文档基线

**状态：已完成**

**本阶段修改文件**
- `docs/UI_REFACTOR_PLAN.md`
- `docs/UI_REFACTOR_PROGRESS.md`

**完成内容**
- 归档了全仓耦合地图：执行链耦合、UI / 工具模型耦合、共享上下文 / compatibility 耦合。
- 固定了当前 UI 根因模型、阶段顺序、验证矩阵和非目标。
- 建立了后续施工使用的 canonical 进度记录入口。

**验证结果**
- 文档已建立，后续阶段有统一落点。
- 无自动化验证需求。

**新发现的连带问题**
- 仓库历史曾引用旧进度/减肥文档，但当前已不存在，因此后续必须以这两份文档为准。

**对下一阶段边界的影响**
- Phase 2 可以专注于“旧异步写旧容器”问题，不再需要重新解释整体背景。

### Phase 2 — 切断旧异步回写旧容器

**状态：已完成静态改造，待宿主手测**

**本阶段修改文件**
- `modules/ui/utils.js`
- `modules/ui/components/tool-config-panel-factory.js`
- `modules/ui/components/local-transform-tool-panel-factory.js`

**实际修改点**
- 强化 `isContainerValid()`：不再只看 jQuery 容器是否存在，还要求目标节点仍连接在当前 document 上。
- 为共享 AI 工具面板加入 `renderSessionId` 守卫，旧的手动执行回调、测试提取回调、世界书异步加载结果在 session 失效后不再写回当前容器。
- 为本地转换工具面板加入同一套 `renderSessionId` 守卫，避免切页或关窗后旧异步继续触发 `renderTo()` 或追加预览弹窗。
- 在 `destroy()` 中显式使当前 render session 失效，并清掉容器上的 session 标记，减少旧实例继续工作的机会。

**验证结果**
- 已完成代码改造。
- `npm run build`：已通过。
- SillyTavern / TavernHelper 手测：尚未执行，仍需在真实宿主里覆盖切页、关窗、世界书加载中切换、执行中切换等场景。

**回顾检查**
- Phase 2 的切口保持干净：只解决“旧异步继续写旧容器”，没有提前改 popup 路由、tool registry 语义或 compatibility 边界。
- 当前 `renderSessionId` 守卫已经覆盖共享 AI 工具面板和本地转换工具面板中的手动执行、测试提取、异步世界书加载三类主要异步回写路径。
- `isContainerValid()` 已从“只看 jQuery 容器是否存在”升级为“节点仍连接在当前 document 上”，能阻断 detached DOM 被误判为可写目标。

**新发现的连带问题**
- 当前 render session 只解决“旧异步写旧容器”问题，还没有切断 runtime 更新触发壳层结构性刷新。
- `popup-shell` 仍把 `EVENTS.TOOL_UPDATED` 与 `TOOL_REGISTERED` / `TOOL_UNREGISTERED` 放在同一刷新路径上，默认走 `refreshCurrentPanel({ rebuildNavigation: true, reRenderSubNav: true })`，把运行态字段变化和导航结构变化混为一谈。
- `tool-trigger.js` 里的 `updateToolRuntime()` 仍会走 `patchToolRuntime(..., { touchLastRunAt: true, emitEvent: true })`，因此手动执行中的 runtime 变化仍可能触发 tools 页整体刷新。
- `popup-shell` 仍缓存活面板对象，这意味着 Phase 4 仍然是必要的，当前只是在旧对象继续写 UI 时加了保险丝。

**对下一阶段边界的影响**
- Phase 3 可以专注处理 runtime 事件语义，不需要再和旧异步写回问题混在一起定位。
- Phase 3 应先避免 tools 页因为 runtime 字段变化而重建当前页面；面板 host 生命周期和缓存策略收口放到 Phase 4 再做。

### Phase 3 — 拆开 runtime 刷新和结构刷新

**状态：已完成静态改造，待宿主手测**

**本阶段目标**
- 切断 `runtime-only 变化 -> TOOL_UPDATED -> popup-shell 重建 tools 页` 这条链。
- 让导航结构刷新只由结构变化驱动，而不是由 `lastStatus`、`lastDurationMs`、`lastError`、`lastRunAt` 一类字段驱动。

**实际修改文件**
- `modules/core/event-bus.js`
- `modules/tool-registry.js`
- `modules/app/popup-shell.js`

**实际修改点**
- 在 `modules/core/event-bus.js` 新增 `EVENTS.TOOL_RUNTIME_UPDATED`。
- 在 `modules/tool-registry.js` 中让 `patchToolRuntime()`、`appendToolRuntimeHistory()` 在 runtime-only 写入成功后默认广播 `TOOL_RUNTIME_UPDATED`，同时保留 `emitEvent` 开关给结构性 `TOOL_UPDATED`。
- 将 `updateToolRuntime()` 改为默认 `emitEvent: false`、`emitRuntimeEvent: true`，让手动执行中的 runtime 更新不再默认触发结构性刷新。
- 在 `modules/app/popup-shell.js` 中新增 runtime 专用订阅，把 `TOOL_RUNTIME_UPDATED` 降级为 `refreshCurrentPanel({ rebuildNavigation: false, reRenderSubNav: false })`，避免 tools 页因为运行态字段变化重建主/子导航。

**验证结果**
- `npm run build`：已通过。
- SillyTavern / TavernHelper 手测：尚未执行。

**回顾检查**
- Phase 3 已把“运行态变化”和“结构变化”拆成两条不同事件语义，符合本阶段目标。
- 当前方案仍然保留了一次当前页轻量刷新，而不是细粒度更新 runtime 卡片；这样改动面更小，也更适合作为 Phase 3 的止血版本。
- `TOOL_REGISTERED` / `TOOL_UNREGISTERED` / 结构性 `TOOL_UPDATED` 仍保留原有重建导航能力，因此新建/删除工具和真正配置结构变化不会丢。

**宿主手测重点**
- tools 页停留在某个工具面板时触发手动执行，确认运行态变化不再重建导航。
- 非 tools 页触发 runtime 变化时，确认不会误刷新其它主页面。
- 新建 / 删除工具时，导航仍能正确重建。
- 保存工具配置、切换 API 预设、切换 bypass 预设等结构性编辑仍能正确刷新当前页。

**新发现的连带问题**
- 虽然 Phase 3 切断了导航级重建，但 tools 页 runtime-only 变化仍会触发一次当前面板重渲染；这会在长执行链里保留一定 UI 抖动，只是范围已经收窄。
- `popup-shell` 仍缓存活面板对象，旧 host 生命周期没有真正收口，因此 Phase 4 仍然必须推进。

**对下一阶段边界的影响**
- Phase 4 可以专注把 `dynamicToolPanelCache` 从活对象缓存改成工厂/描述符缓存，并建立显式 mount / unmount。
- Phase 4 不必再兼顾 runtime 事件语义拆分，可以专心处理 host 生命周期归属。 

**风险控制**
- 本阶段没有同时改 `dynamicToolPanelCache` 策略。
- 本阶段没有引入新的 UI 注册机制。
- 当前仍保留轻量当前页刷新作为 runtime 展示兜底；是否进一步下沉为面板级局部刷新，留给后续阶段再判断。

## 下一阶段施工方案（Phase 4）

**目标**
- 把 `popup-shell` 从“缓存活面板对象并反复复用”收口为“缓存工厂/描述符，由壳层显式 mount / unmount host”。
- 解决旧面板只是被隐藏、但事件绑定和异步回调仍继续存活的问题。

**建议切口**
1. 先梳理 `modules/app/popup-shell.js` 中 `dynamicToolPanelCache` 的读取、创建、复用与销毁路径。
2. 把 cache 语义从 panel instance 改成 panel factory / descriptor，避免跨容器复用同一个活对象。
3. 给当前 tools 页建立显式 host 生命周期：切主 tab、切 sub tab、refresh 当前页时先销毁旧 host，再创建并挂载新 host。
4. 让 `tool-config-panel-factory.js`、`local-transform-tool-panel-factory.js` 只负责当前容器 render / bind / destroy，不再承担跨 host 生存期。

**本阶段暂不处理**
- 不继续细化 runtime 卡片的局部刷新。
- 不同时收 compatibility fallback 边界。
- 不清理其它面板的模块级状态或固定 DOM id。

**进入本阶段前的验证前提**
- 继续保留 `npm run build` 作为静态门槛。
- 宿主手测仍需覆盖 Phase 2 / Phase 3 的既有场景，避免在 Phase 4 前把旧回归带入下一刀。