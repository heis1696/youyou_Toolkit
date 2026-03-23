# 更新日志

本项目的所有重要更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### 更改

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