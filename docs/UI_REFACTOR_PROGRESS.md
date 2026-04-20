# UI 重构进度

## 当前状态

- 当前 canonical 文档入口已建立：`docs/UI_REFACTOR_PLAN.md`、`docs/UI_REFACTOR_PROGRESS.md`
- 当前优先级：继续推进 Phase 5，已先收口最高风险的模块级状态与对话框全局选择器污染
- 当前策略：Phase 5 继续保持只处理实例状态归属、固定 id 与销毁清理；当前先解决 `api-preset-panel` / `tool-manage-panel`，再视宿主表现决定是否继续下探其它低风险面板

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

### Phase 4 — 收口 panel host 生命周期

**状态：已完成静态改造，待宿主手测**

**本阶段目标**
- 把 `popup-shell` 从“缓存活面板对象并反复复用”收口为“缓存工厂/描述符，由壳层显式 mount / unmount host”。
- 解决旧面板只是被隐藏、但事件绑定和异步回调仍继续存活的问题。

**实际修改文件**
- `modules/app/popup-shell.js`
- `modules/ui/ui-manager.js`

**实际修改点**
- 在 `popup-shell` 中新增 `panelHostState`、`destroyActivePanelHost()`、`registerActivePanelHost()`，把当前 tools 页活面板 host 的生命周期收回壳层。
- 将 `dynamicToolPanelCache` 从“缓存活 panel instance”改成“缓存 panel factory”，自定义工具子页每次挂载都会创建新的 panel 实例，不再跨容器复用旧对象。
- 在切主 tab、切 sub tab、刷新当前页、关闭 popup 时，壳层都会先显式卸载当前活 host，再进入新的渲染路径。
- 为 `ui-manager` 增加 `destroyContainerInstance()`，让壳层可以按容器销毁当前挂载实例，而不必依赖“再次 render 时顺手顶掉旧实例”。
- tools 页内置工具面板与兼容回退面板也接入同一套 host 注册/销毁流程，避免只修自定义工具、却让默认工具继续悬挂旧实例。

**验证结果**
- `npm run build`：已通过。
- SillyTavern / TavernHelper 手测：尚未执行。

**回顾检查**
- Phase 4 的切口保持在 host 生命周期归属，没有继续扩散到 runtime 细粒度刷新或 compatibility 边界重写。
- 当前方案已切断“同一活 panel object 在不同容器间复用”这条主问题链，render session 守卫现在有了更清晰的宿主级卸载配合。
- `tools` 页中的默认工具、自定义工具、脚本工具都已回到“切换即卸载旧 host，再挂新 host”的路径上。

**宿主手测重点**
- tools 页在默认工具、自定义工具、脚本工具之间快速来回切换，确认不会残留旧表单状态或旧事件绑定。
- 手动执行过程中切换子页、主页或直接关闭 popup，确认旧 host 不再继续响应 UI 更新。
- 连续打开/关闭 popup 多次后，确认不会重复弹出旧预览、旧 notice 或残留增强 select。
- 保存配置后刷新当前页，确认当前 host 会被重建且表单可继续正常工作。

**新发现的连带问题**
- 当前普通工具窗口的 `config / prompts / presets` 子页虽然已在进入前销毁活 tools host，但这条旧路径本身仍是 popup 内较老的一套实现，后续仍值得和 compatibility 边界一起收口。
- 当前 `dynamicToolPanelCache` 已变成 factory cache，但工厂描述仍然散落在 `popup-shell` 内，未来若继续收口 UI 注册边界，可以考虑再下沉到更清晰的描述层。

**对下一阶段边界的影响**
- Phase 5 可以专注清理模块级 UI 状态与固定 DOM id 冲突，不必再兼顾活面板缓存策略。
- Phase 6 仍应放在最后处理 compatibility fallback 边界，避免和本阶段生命周期改造互相放大回归来源。

**风险控制**
- 本阶段没有改 runtime 事件语义。
- 本阶段没有改工具 schema、tool registry 导航来源或执行链。
- 当前仍需宿主手测确认切页/关窗/重复打开场景下的真实卸载效果。

### Phase 5 — 清理模块级 UI 状态与固定 DOM id 冲突

**状态：已完成第一批静态改造，待宿主手测**

**本阶段当前修改文件**
- `modules/ui/components/api-preset-panel.js`
- `modules/ui/components/tool-manage-panel.js`

**实际修改点**
- 将 `api-preset-panel` 的 `currentSelectedPresetName` 模块级状态收回到容器实例状态，不再由文件级变量跨挂载共享。
- 将 `api-preset-panel` 中星标、删除、导入、保存配置、保存为预设后的重渲染统一改为对当前容器重渲，不再依赖 `closest('.yyt-api-manager').parent()` 反查宿主容器。
- 将 `api-preset-panel` 的“保存为预设”对话框改为容器内查找和清理，`destroy()` 时会一并移除对话框节点并清掉实例状态。
- 将 `tool-manage-panel` 的工具编辑对话框从全局 `$('#...')` 读取改为 `$overlay.find(...)` 容器内读取，避免重复挂载或旧弹窗残留时串到错误节点。
- 为 `tool-manage-panel` 增加按容器移除对话框的统一清理路径，`destroy()` 不再依赖全局 overlay 选择器。

**验证结果**
- `npm run build`：已通过。
- SillyTavern / TavernHelper 手测：尚未执行。

**回顾检查**
- 当前切口保持在高风险污染源：模块级状态、全局对话框选择器、跨容器反查重渲染。
- `bypass-panel` 与 `settings-panel` 仍存在固定 id，但当前主要读写路径已基本依赖容器内选择和事件委托，风险级别低于本批已修改面板。
- 本阶段当前没有扩散到 popup shell、runtime 事件语义或 compatibility fallback 边界。

**宿主手测重点**
- API 预设页反复切换预设、星标、删除、导入后，确认下拉选中态不会串到旧实例。
- API 预设页打开“保存为预设”对话框后切页、关窗、再次打开，确认不会残留旧弹窗节点。
- 工具管理页反复打开“新建工具 / 编辑工具”对话框，确认保存读取的始终是当前弹窗里的字段。
- 在 popup 重复打开/关闭后，再次进入上述两页，确认不会残留旧增强 select 或旧 overlay。

**新发现的连带问题**
- `bypass-panel` 仍保留较多固定 id，但当前尚未发现模块级状态或全局 `$('#...')` 读取路径；是否继续改成实例级 id，需要先看宿主是否仍出现复挂载冲突。
- `settings-panel` 也保留固定 id，但事件绑定与 destroy 路径相对干净，当前不是 Phase 5 第一刀的主要风险源。

**对下一阶段边界的影响**
- 如果宿主手测已覆盖当前主要串页问题，Phase 5 可以继续只做定点补刀，而不必为“看到固定 id 就全部改名”扩散改动面。
- Phase 6 仍应最后再处理 compatibility fallback 边界。

## 下一阶段施工方案（Phase 5 后续切口）

**目标**
- 在不扩散改动面的前提下，继续清理剩余高频 UI 污染点。
- 优先处理仍可能因固定 id、编辑区复用和增强控件残留而在重复挂载时撞车的面板。

**建议切口**
1. 先在真实宿主里回归 `api-preset-panel` 与 `tool-manage-panel`，确认当前第一批改造已经覆盖主要串页问题。
2. 若宿主仍有复挂载污染，再把 `modules/ui/components/bypass-panel.js` 里的编辑区固定 id、空态/编辑区切换和增强 select 清理路径收口到容器内部。
3. 仅在 `bypass-panel` 宿主表现仍不稳时，再评估 `modules/ui/components/settings-panel.js` 里固定 id 是否需要实例级命名空间；不要因为静态看到 id 就提前全量改名。
4. 继续保持 `popup-shell`、`ui-manager`、runtime 事件语义和 compatibility fallback 边界不扩散。

**本阶段暂不处理**
- 不继续收 compatibility fallback 边界。
- 不改 runtime-only 轻量刷新策略。
- 不做全仓固定 id 批量重命名。
- 不重写 tools 页描述符注册方式。

**进入本阶段前的验证前提**
- 保持 `npm run build` 为静态门槛。
- 宿主手测应重点覆盖 API 预设页 / 工具管理页 / Ai 指令预设页在多次打开 popup、切页、重复开关弹窗后的表现。