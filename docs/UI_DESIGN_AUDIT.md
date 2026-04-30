# UI 框架审计与设计优化对照文档

## 背景

本文档基于全仓 UI 框架实况审计，对照 Linear / Raycast / Vercel / Warp 等一流开发者工具的设计语言，逐项列出当前问题、目标状态与优化方向。

审计范围：`styles/main.css`（2650 行）、`modules/app/popup-shell.js`（1660 行）、`modules/ui/ui-manager.js`、`modules/ui/index.js`、6 个核心面板组件、事件总线、工具函数。

---

## 一、壳层结构

### 1.1 HTML 生成方式

| 维度 | 当前状态 | 问题 | 目标 |
|------|---------|------|------|
| 模板组织 | 5 个 `buildShell*Html()` 函数，各返回一段模板字符串 | 可维护性已改善，但函数分散、参数传递语义不统一 | 统一为单一 `ShellTemplate` 描述对象，壳层函数只负责组装 |
| 参数传递 | 各 builder 接收不同参数（`tools`, `defaultToolCount`, `displayName`, `description`），通过闭包共享 `uiState` | 参数列表是隐式契约，新增字段需修改多处函数签名 | 改为接收单一 `ctx` 对象，包含所有渲染所需数据 |
| 字符串拼接 | 使用 ES6 模板字符串，`${}` 内嵌表达式 | 无可读性问题，但较长的条件逻辑仍嵌在模板内 | 保持现状；复杂条件提前计算为变量 |

### 1.2 壳层视觉层级

| 元素 | 当前状态 | 问题 | 目标 |
|------|---------|------|------|
| Header | 品牌名 + 版本号 + 副标题 + 拖动提示 + × | 信息密度合理 | 保持 |
| Sidebar | 标题行（名称 + tab 数 + 折叠按钮）+ nav + note + stats | 4 段内容垂直排列，stats 段视觉较弱 | stats 改为水平微 kpi 行，note 改为 tooltip 或更短文案 |
| Main header | 标题 + 描述 + info meta | 标题字体 26px 偏大，描述行占位过多 | 标题降至 20px，描述收为一行截断 |
| Content frame | 多层嵌套：`.yyt-content-frame` > `.yyt-content` > `.yyt-content-inner` > `.yyt-tab-content` | 3 层 wrapper 过多 | content-frame 和 content 可合并为一层 |
| Footer | 当前页面指示 pill + 短文案 | 信息量低，视觉存在感弱 | 改为紧凑状态条，仅在自动化运行中显示动态信息 |
| Startup screen | 独立的欢迎覆盖层，带模糊效果 | 体验不错，但 `bindStartupScreen` 耦合在 `openPopup` 流程里 | 保持，但将 startup 逻辑抽为独立模块 |

### 1.3 路由与面板挂载

| 维度 | 当前状态 | 问题 | 目标 |
|------|---------|------|------|
| 主 tab 路由 | `renderTabContent()` 内 switch-case 硬编码 `'apiPresets'`, `'toolManage'`, `'regexExtract'`, `'tools'`, `'tableWorkbench'`, `'bypass'`, `'settings'` | 每增加一个主页面需要改 switch-case | 改为路由表：`Map<tabId, renderFn>`，tool registry 只需注册路由 |
| 子 tab 路由 | `renderSubTabContent()` 内 switch-case 硬编码 `'SummaryToolPanel'`, `'StatusBlockPanel'`, `'YouyouReviewPanel'`, `'EscapeTransformToolPanel'`, `'PunctuationTransformToolPanel'`, `'GenericToolConfigPanel'` | 同上 | 改为组件注册表，tool registry 的 subTab.component 直接对应到 renderer |
| 面板挂载 | 直接调用 `modules.uiModule.renderXxxPanel($container)` | 壳层需要知道所有 renderer 名称 | 壳层只知 `toolId`，由 uiModule 解析路由 |

---

## 二、CSS 设计系统

### 2.1 Token 体系

| 维度 | 当前状态 | 问题 | 目标 |
|------|---------|------|------|
| Token 数量 | 86 个 CSS 自定义属性 | 数量合理，但命名偏向"实现细节"而非"语义用途" | 增加语义别名层：`--yyt-color-bg-base`, `--yyt-color-text-primary` 等 |
| 颜色空间 | HEX + rgba()，未指定色彩空间 | 无感知均匀性保证；同样亮度的不同色相视觉差异大 | 迁移到 OKLCH（Tailwind v4 / shadcn 标准） |
| 表面高程 | 5 级：`--yyt-surface` → `--yyt-surface-2` → `--yyt-surface-3` → `--yyt-surface-hover` → `--yyt-surface-active` | 命名不传达用途（哪个是卡片？哪个是弹出层？） | 重命名为 `--yyt-surface-raised`, `--yyt-surface-overlay`, `--yyt-surface-hover`, `--yyt-surface-pressed` |
| 边框等级 | 3 级：`--yyt-border-soft` / `--yyt-border` / `--yyt-border-strong` | 缺少"容器边框"和"交互边框"的语义区分 | `--yyt-border-subtle` / `--yyt-border-default` / `--yyt-border-emphasis` / `--yyt-border-focus` |
| 硬编码颜色 | ~15 处（CSS + 面板组件 getStyles 中） | 不通过 token，主题切换时无法联动 | 全部收口到 CSS 变量 |

### 2.2 排版

| 维度 | 当前状态 | 问题 | 目标 |
|------|---------|------|------|
| 字体 | `-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial` | 未指定 `Inter` 等优化后的 UI 字体；中文字体回退链过长 | 保持系统字体栈（SillyTavern 宿主限制），不引入外部字体 |
| 字号层级 | 散落在各组件中：10px / 11px / 12px / 13px / 14px / 16px / 18px / 26px | 无明确 type scale | 定义 6 级 type scale：`xs(10)` / `sm(11)` / `base(13)` / `md(14)` / `lg(16)` / `xl(20)` / `2xl(24)` |
| 字重 | 400 / 600 / 700 / 800 / 900 混用 | 900 字重过于粗重（主标题 26px 900），可读性下降 | 收束为 400(正文) / 600(强调) / 700(标题) |
| 行高 | 未显式全局设定 | 部分区域行高过紧（1.06），部分过松 | body 1.55，标题 1.2 |
| 纯白文字 | `--yyt-text: rgba(255,255,255,0.93)` | 已避免纯白，符合 Raycast 原则 | 保持 |

### 2.3 间距

| 维度 | 当前状态 | 问题 | 目标 |
|------|---------|------|------|
| 网格基准 | 已收束到 4px（8/12/16/20） | 个别遗留值未对齐（14px sidebar toggle, 6px 若干 gap） | 全量对齐到 4px |
| Panel gap | `12px`（已从 16px 收束） | 合理 | 保持 |
| Section gap | `12px`（已从 13px 收束） | 合理 | 保持 |
| Form group gap | `8px`（已从 10px 收束） | 合理 | 保持 |

### 2.4 动画与过渡

| 维度 | 当前状态 | 问题 | 目标 |
|------|---------|------|------|
| 过渡属性 | 混用 `transition: transform, box-shadow, border-color, background, color, filter` | 包含 `background` 和 `color`（非 compositor-only），在大量元素上可能造成性能问题 | 按钮/小控件保持现状（180ms 足够快）；大面积动画限制为 `transform, opacity` |
| 时长 | 150ms – 300ms | Raycast 标准 ≤200ms，部分 280ms 偏长 | 统一到 180ms（微交互）/ 220ms（面板过渡） |
| 缓动 | `ease`, `ease-out`, `cubic-bezier(0.4,0,0.2,1)`, `cubic-bezier(0.16,1,0.3,1)` | 缓动函数过多，缺乏统一语义 | 定义 3 个缓动 token：`--ease-in`, `--ease-out`, `--ease-in-out` |
| 动画 | 7 个 @keyframes + stagger nth-child + tabFadeIn | 各自独立定义，有重复 | 合并为 `fade-in`, `slide-up`, `scale-in` 三类 |
| reduced-motion | ✅ 已支持 | — | 保持 |

### 2.5 焦点与交互态

| 维度 | 当前状态 | 问题 | 目标 |
|------|---------|------|------|
| focus ring | `0 0 0 2px rgba(123,183,255,0.52)` | 已统一，Raycast 标准 | 保持 |
| hover | 各组件自行定义，亮度提升不一致 | 无全局 hover 规则 | 定义 `--yyt-surface-hover` 为统一 hover 背景 |
| active/pressed | 按钮有 `scale(0.98)`，其他元素无 | 只有按钮有触觉反馈 | 所有可点击元素统一 `:active { transform: scale(0.98) }` |
| disabled | `opacity: 0.45` + `cursor: not-allowed` | 合理 | 保持 |

---

## 三、组件面板（一致性审计）

### 3.1 对话框创建模式（3 种并存）

| 面板 | 模式 | 问题 |
|------|------|------|
| ApiPresetPanel | 手动拼接 HTML + 手动绑定事件 | 不使用 `utils.js` 的 `createDialogHtml()` / `bindDialogEvents()` |
| ToolManagePanel | 手动拼接 HTML + `enhanceNativeSelects` + 手动清理 | 不使用工具函数 |
| tool-config-panel-factory | 使用 `createDialogHtml()` + `bindDialogEvents()` | **唯一正确路径** |
| RegexExtractPanel | 使用浏览器原生 `alert()` / `prompt()` | 阻塞式弹窗，破坏暗色主题一致性和体验 |

**目标**：全部面板走 `utils.js` 的统一弹窗工厂；`alert()` / `prompt()` 替换为自定义弹窗组件。

### 3.2 事件命名空间（不一致）

| 面板 | 命名空间 | 问题 |
|------|---------|------|
| ToolManagePanel | `.yytToolManage` | ✅ |
| SettingsPanel | `.yytSettings` | ✅ |
| BypassPanel | `.yytBypass` | ✅ |
| RegexExtractPanel | `.yytRegex` | ✅ |
| ApiPresetPanel | **无命名空间**（`$container.off()` 裸调用） | ❌ 会解绑容器上所有 jQuery 事件，包括壳层或其他组件绑定的事件 |

**目标**：ApiPresetPanel 改为 `.yytApiPreset` 命名空间。

### 3.3 DOM ID 策略（不一致）

| 面板 | ID 前缀 | 问题 |
|------|---------|------|
| ApiPresetPanel | `${SCRIPT_ID}-preset-*` | 同页面多实例会冲突 |
| ToolManagePanel | `yyt-tool-*`（无 SCRIPT_ID） | 与其他面板无冲突，但与宿主 DOM 可能冲突 |
| BypassPanel | `yyt-bypass-*` | 同上 |
| SettingsPanel | `yyt-setting-*` / `yyt-settings-*` | 前缀不统一 |

**目标**：所有 ID 统一为 `${SCRIPT_ID}-${panelId}-${purpose}` 格式；尽量改用容器内类选择器（`.yyt-xxx`）避免 ID 冲突。

### 3.4 状态持久化（6 种方案并存）

| 面板 | 方案 | 适用场景 |
|------|------|---------|
| ApiPresetPanel | `$container.data('yytApiPresetPanelState')` | 实例级状态 |
| ToolManagePanel | 无持久化，每次重建 | 数据来自 toolManager，无需缓存 |
| BypassPanel | DOM `data-preset-id` 属性 | 标识当前选中项 |
| SettingsPanel | `settingsService.getSettings()` | 全局持久化设置 |
| ToolConfigPanel | `this.worldbookFilter` 等实例属性 | 异步加载状态 |
| TableWorkbenchPanel | `this.currentTableIndex` | 表单导航状态 |

**目标**：不强制统一（各面板需求不同），但建议引入轻量 `PanelState` 基类，提供 `get/set/reset` API，避免直接操作 `$container.data()`。

### 3.5 CSS 重复定义

| 类名 | 定义位置 | 问题 |
|------|---------|------|
| `.yyt-empty-state-small` | `main.css` + `regex-extract-panel.js` | 面板组件重复定义了全局已存在的样式 |
| `.yyt-dialog-wide` | `main.css`(720px) + `tool-manage-panel.js`(480px) | 面板覆盖了全局定义，值不同 |
| `.yyt-code-textarea` | `main.css` + `tool-config-panel-factory.js` | 面板重新定义了不同的样式值 |

**目标**：面板 `getStyles()` 只定义面板特有样式；全局复用样式只定义在 `main.css` 中。

### 3.6 直接依赖（违反依赖注入）

| 面板 | 直接导入 | 问题 |
|------|---------|------|
| ApiPresetPanel | `../../preset-manager.js`, `../../api-connection.js` | 绕过 context 依赖注入 |
| popup-shell.js | `../prompt-editor.js` | 直接导入 PromptEditor，而非通过 modules 注入 |

**目标**：所有面板通过 `props.dependencies` 获取外部服务。

---

## 四、事件总线

### 4.1 事件数量与分类

| 类别 | 事件数 | 问题 |
|------|--------|------|
| Storage | 2 | ✅ 合理 |
| Preset | 6 | ✅ 合理 |
| API | 5 | ✅ 合理 |
| Tool（含 runtime） | 15 | ⚠️ tool 事件占比最高，部分语义重叠（`tool:executing` / `tool:executionStarted`） |
| UI | 8 | ✅ 合理 |
| App | 3 | ✅ 合理 |
| Settings | 1 | ✅ 合理 |
| Bypass | 4 | ✅ 合理 |

### 4.2 事件命名一致性

| 问题 | 示例 |
|------|------|
| 执行态事件重叠 | `tool:executing` 和 `tool:executionStarted` 语义接近 |
| 部分事件无消费者 | `ui:renderRequested`, `ui:tabChanged` 在仓内无订阅 |

**目标**：合并 `tool:executing` + `tool:executionStarted` → `tool:executionStarted`（保留含 payload 更丰富的那个）；清理无订阅事件或标注为"外部 API 保留"。

---

## 五、优化路线图

### Phase A: 统一与收口（低风险，高收益）

1. **ApiPresetPanel 事件命名空间** —— `$container.off()` → `$container.off('.yytApiPreset')`
2. **CSS 重复定义清理** —— 面板 `getStyles()` 中删除已在 `main.css` 定义的类
3. **弹窗统一** —— ApiPresetPanel / ToolManagePanel 改用 `utils.js` 的 `createDialogHtml()` / `bindDialogEvents()`
4. **RegexExtractPanel 弹窗** —— `alert()` / `prompt()` → 自定义弹窗
5. **ID 前缀统一** —— 全部使用 `${SCRIPT_ID}-*` 格式

### Phase B: 路由解耦（中风险）

6. **主 tab 路由表化** —— `renderTabContent()` switch-case → `Map<tabId, routeConfig>`
7. **子 tab 组件注册表** —— `renderSubTabContent()` switch-case → 组件名→renderer 映射
8. **壳层不再直接调用 `modules.uiModule.renderXxxPanel()`** —— 改为 `uiModule.renderByRoute(tabId, container)`

### Phase C: 设计系统升级（需宿主回归）

9. **Token 语义化** —— `--yyt-surface` → `--yyt-surface-raised` 等，保留旧名作为别名
10. **Easing token 统一** —— 3 个缓动变量
11. **Type scale token** —— 6 级字号变量
12. **面板依赖注入** —— ApiPresetPanel 改为通过 `dependencies` 获取服务

### Phase D: 长期（需全量回归）

13. **OKLCH 色彩空间迁移**
14. **动画 @keyframes 合并**
15. **PanelState 基类**

---

## 六、对照总结

| 维度 | 当前评分 | 目标评分 | 关键差距 |
|------|---------|---------|---------|
| 壳层结构 | ★★★★☆ | ★★★★★ | content wrapper 合并；路由表化 |
| CSS Token 体系 | ★★★★☆ | ★★★★★ | 语义化命名；OKLCH 迁移 |
| 排版系统 | ★★★☆☆ | ★★★★☆ | type scale token；字重收束 |
| 间距一致性 | ★★★★★ | ★★★★★ | 已是 4px 网格 |
| 动画规范 | ★★★★☆ | ★★★★★ | easing token 统一 |
| 焦点/交互态 | ★★★★☆ | ★★★★★ | 全局 active scale |
| 面板一致性 | ★★★☆☆ | ★★★★☆ | 弹窗/ID/命名空间统一 |
| 事件总线 | ★★★★☆ | ★★★★★ | 合并重叠事件 |
| 依赖注入 | ★★★☆☆ | ★★★★☆ | 面板不再直接导入服务模块 |
| 可访问性 | ★★★☆☆ | ★★★★☆ | focus 环已统一；缺少 aria 标签审计 |

**当前整体评分：3.7 / 5.0**
