# UI Style Guide — Flat Flow

YouYou Toolkit 的 UI 设计规范文档。所有新增和修改的 UI 代码必须遵循此文档。

> **设计语言**: Linear / Resend 平铺流式布局
> **核心概念**: 内容平铺在 content area 上，分组靠标题 + hairline 分割线 + 留白，**不使用 section 外框包裹内容**。

---

## 0. 设计语言

### 为什么选 Linear / Resend

- **Linear**: 近纯黑画布 + 4 级 surface 阶梯 + hairline 边框替代阴影 + 单一 accent 色 + 无装饰渐变
- **Resend**: 纯黑画布 + 半透明白边框体系 (6%/14%) + 严格 12px 容器圆角 + 无传统阴影语言

### 从参考设计中提取的关键规则

1. **Surface depth via luminance, not decoration** — 深度靠纯色阶梯表达，不靠渐变、阴影
2. **Hairline borders replace shadows** — 1px 半透明白边框是唯一的层级分隔手段
3. **No box-in-box nesting** — 内容直接坐在 canvas 上，不套外层 section 框
4. **Single accent, used sparingly** — accent 色只用于 CTA、focus ring、active 状态
5. **Strict radius hierarchy** — 外层 12px → 内层 8px → 控件 6px → badge 4px
6. **Flat elevation** — level 0 无边框无阴影，level 1 是 surface + hairline，level 2 是 hover

### 适配方案

- popup shell = canvas 层
- sidebar = surface 背景，nav-item 是 transparent + hover 变色
- content area = surface 扁平底板
- **内容分组 = 标题 + hairline 分割线 + 留白**（NOT section 边框盒子）
- 数据展示 = 单一扁平容器，内部格子用竖线分隔
- 列表展示 = 单一容器 + 行间 hairline 分隔
- 配置项 = inline 行（label 左 + control 右 + 底部 hairline）
- 表单控件 = surface 背景 + control-border + 6px 圆角

---

## 1. 核心原则

| 原则 | 说明 |
|------|------|
| **平铺流** | 内容直接铺在 content area 上，分组靠标题 + hairline + 留白，**禁止 section 外框盒子** |
| **纯色阶梯** | 深度通过 solid 背景色阶梯表达，结构容器禁止 `linear-gradient` / `radial-gradient` |
| **hairline 分隔** | 半透明白色 1px 边框是层级分隔的唯一手段，替代阴影 |
| **外大内小** | 圆角严格遵守 `外层 > 内层` 层级关系 |
| **单一 accent** | accent 色仅用于 CTA、focus ring、active 状态、badge，不用于大面积装饰 |
| **token 优先** | 所有颜色、间距、圆角、阴影必须走 CSS 变量，禁止硬编码 |

### 禁止项

- ❌ section 外框盒子（`border + border-radius` 包裹一组控件）
- ❌ 结构容器使用 `linear-gradient` / `radial-gradient` 背景
- ❌ 使用 `inset` 阴影
- ❌ `::before` / `::after` 做光泽覆盖层
- ❌ 控件上叠加 `box-shadow`（`--yyt-control-shadow*` 全部为 `none`）
- ❌ 硬编码颜色值
- ❌ 大圆角嵌套大圆角

### 唯一例外

启动屏 (`.yyt-startup-screen-inner`) 允许一个 `radial-gradient` 作为点缀装饰。

---

## 2. Token 体系

### 2.1 Surface 阶梯

| Token | 值 | 用途 |
|-------|----|------|
| `--yyt-bg-base` | `#0a0d13` | popup 背景、最深层 |
| `--yyt-surface` | `#0f1219` | sidebar、content-frame、header、footer |
| `--yyt-surface-2` | `#151a24` | stat 格子、list-table 行、独立数据容器 |
| `--yyt-surface-3` | `#1c2231` | hover 态 |
| `--yyt-surface-hover` | `#1c2231` | hover 态别名 |
| `--yyt-surface-active` | `#232b3e` | active 态、dropdown 选中 |
| `--yyt-surface-raised` | `var(--yyt-surface-2)` | 浮起表面 |
| `--yyt-surface-overlay` | `var(--yyt-surface-3)` | 覆盖层 |
| `--yyt-surface-elevated` | `var(--yyt-surface-active)` | 高层表面 |

### 2.2 Accent & 语义色

| Token | 默认值 | 说明 |
|-------|--------|------|
| `--yyt-accent` | `#7bb7ff` | 主强调色 |
| `--yyt-accent-glow` | `rgba(123, 183, 255, 0.4)` | focus ring 外层光晕 |
| `--yyt-accent-soft` | `rgba(123, 183, 255, 0.15)` | active 选中态背景、badge |
| `--yyt-accent-strong` | `#a5d4ff` | 高亮文字、icon |
| `--yyt-on-accent` | `#0a0d13` | accent 背景上的文字色 |
| `--yyt-success` | `#4ade80` | 成功 |
| `--yyt-success-glow` | `rgba(74, 222, 128, 0.3)` | 成功光晕 |
| `--yyt-error` / `--yyt-danger` | `#ef4444` | 错误/危险 |
| `--yyt-danger-soft` | `rgba(239, 68, 68, 0.16)` | danger 按钮背景 |
| `--yyt-error-glow` | `rgba(239, 68, 68, 0.3)` | 错误光晕 |
| `--yyt-warning` | `#fbbf24` | 警告 |

### 2.3 文字

| Token | 值 | 用途 |
|-------|----|------|
| `--yyt-text` | `rgba(255, 255, 255, 0.92)` | 主文字 |
| `--yyt-text-secondary` | `rgba(255, 255, 255, 0.55)` | 次要文字 |
| `--yyt-text-muted` | `rgba(255, 255, 255, 0.35)` | 辅助/占位文字 |
| `--yyt-color-text-primary` | `var(--yyt-text)` | 主文字别名 |
| `--yyt-color-text-secondary` | `var(--yyt-text-secondary)` | 次要文字别名 |
| `--yyt-color-text-muted` | `var(--yyt-text-muted)` | 辅助文字别名 |
| `--yyt-color-accent` | `var(--yyt-accent)` | accent 文字 |

### 2.4 边框（hairline 体系）

| Token | 值 | 用途 |
|-------|----|------|
| `--yyt-border` / `--yyt-border-default` | `rgba(255, 255, 255, 0.06)` | 默认分割线、行间 hairline |
| `--yyt-border-soft` / `--yyt-border-subtle` | `rgba(255, 255, 255, 0.04)` | 更柔和的分割线 |
| `--yyt-border-strong` / `--yyt-border-emphasis` | `rgba(255, 255, 255, 0.12)` | 容器外框、结构边框 |
| `--yyt-border-focus` | `rgba(123, 183, 255, 0.5)` | focus 态边框 |

### 2.5 圆角

| Token | 值 | 使用场景 |
|-------|----|----------|
| `--yyt-radius-xs` | `4px` | badge、tag、inline chip |
| `--yyt-radius-sm` / `--yyt-control-radius` | `6px` | 按钮、输入框、toggle、nav-item |
| `--yyt-control-radius-sm` | `4px` | small 按钮圆角 |
| `--yyt-radius` | `8px` | 独立容器、sidebar-card |
| `--yyt-radius-lg` | `12px` | popup、dialog |

### 2.6 阴影

仅浮动元素使用：

| Token | 允许使用的元素 |
|-------|--------------|
| `--yyt-shadow` | popup |
| `--yyt-shadow-soft` | 轻阴影 |
| `--yyt-shadow-glow` | popup 外光晕 |
| `--yyt-select-dropdown-shadow` | select dropdown |
| `--yyt-focus-ring` | focus-visible 态 |

所有控件阴影 token = `none`。

### 2.7 控件 Token

| Token | 值 | 说明 |
|-------|----|------|
| `--yyt-control-bg` | `#0f1219` | 控件背景 |
| `--yyt-control-bg-hover` | `#151a24` | hover 背景 |
| `--yyt-control-bg-active` | `#1c2231` | active 背景 |
| `--yyt-control-bg-strong` | `#151a24` | 强调背景 |
| `--yyt-control-bg-focus` | `#151a24` | focus 背景 |
| `--yyt-control-border` | `rgba(255, 255, 255, 0.08)` | 控件边框 |
| `--yyt-control-border-hover` | `rgba(255, 255, 255, 0.14)` | hover 边框 |
| `--yyt-control-border-focus` | `rgba(123, 183, 255, 0.5)` | focus 边框 |
| `--yyt-control-shadow` | `none` | 控件阴影 (始终 none) |
| `--yyt-control-shadow-hover` | `none` | hover 阴影 (始终 none) |
| `--yyt-control-shadow-focus` | `none` | focus 阴影 (始终 none) |

### 2.8 Select/Dropdown Token

| Token | 值 | 说明 |
|-------|----|------|
| `--yyt-select-surface` | `#151a24` | dropdown 背景 |
| `--yyt-select-option-bg` | `#1c2231` | option 背景 |
| `--yyt-select-option-hover-bg` | `#232b3e` | option hover |
| `--yyt-select-option-selected-bg` | `#2a3450` | option 选中 |
| `--yyt-select-option-border` | `rgba(123, 183, 255, 0.15)` | option hover 边框 |
| `--yyt-select-option-selected-border` | `rgba(123, 183, 255, 0.3)` | option 选中边框 |
| `--yyt-select-arrow-color` | `rgba(255, 255, 255, 0.4)` | 箭头颜色 |

### 2.9 Motion

| Token | 值 |
|-------|----|
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--yyt-ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--yyt-duration-fast` | `150ms` |
| `--yyt-duration-normal` | `250ms` |

### 2.10 Typography Scale

| Token | 值 |
|-------|----|
| `--yyt-text-xs` | `10px` |
| `--yyt-text-sm` | `11px` |
| `--yyt-text-base` | `13px` |
| `--yyt-text-md` | `14px` |
| `--yyt-text-lg` | `16px` |
| `--yyt-text-xl` | `20px` |
| `--yyt-text-2xl` | `24px` |

### 2.11 Layout

| Token | 值 |
|-------|----|
| `--yyt-shell-sidebar-width` | `220px` |
| `--yyt-shell-topbar-gap` | `12px` |
| `--yyt-backdrop` | `rgba(6, 8, 16, 0.75)` |

---

## 3. 布局结构

### 3.1 Popup 整体结构

```
┌─ popup (.yyt-popup) ───────────────── bg-base, radius-lg, z-10000
│ ┌─ header ──────────────────────────── surface, border-bottom, cursor:grab
│ │ ├─ brand (title + version badge)
│ │ └─ actions (drag hint + sidebar toggle + close)
│ ├─ body (flex:1)
│ │ └─ popup-shell
│ │   ├─ topbar (grid: main info + 3 stats)
│ │   └─ workspace (grid: sidebar + main)
│ │     ├─ sidebar (可折叠)
│ │     │ ├─ nav-items (active: accent-soft + left bar)
│ │     │ ├─ sidebar-stats (3 列数字)
│ │     │ └─ sidebar-note
│ │     └─ main
│ │       ├─ main-header (title + breadcrumb + actions)
│ │       ├─ sub-nav (sub-tabs)
│ │       └─ content-frame → content → page → panels
│ └─ footer ──────────────────────────── surface, border-top
│   ├─ status cluster (status badges)
│   └─ action buttons
```

### 3.2 Sidebar 折叠

通过 `.yyt-collapsed` class 切换：

```css
.yyt-shell-sidebar.yyt-collapsed {
  width: 56px; /* 仅保留图标 */
}
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-name,
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-desc,
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-copy { display: none; }
```

### 3.3 Flow Section（内容分组）

不使用 `.yyt-panel-section` 边框盒子。

```css
.flow-section + .flow-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--yyt-border);
}
.flow-heading {
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.3px;
}
.flow-heading-icon {
  width: 22px; height: 22px;
  border-radius: var(--yyt-radius-sm);
  background: var(--yyt-accent-soft);
  color: var(--yyt-accent);
}
```

### 3.4 数据展示（Stat Row）

单一扁平容器，内部格子用竖线分隔。

```css
.stat-row {
  display: grid;
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  overflow: hidden;
}
.stat-cell {
  padding: 16px 18px;
  background: var(--yyt-surface-2);
}
.stat-cell + .stat-cell {
  border-left: 1px solid var(--yyt-border);
}
```

### 3.5 列表展示（List Table）

单一容器 + 行间 hairline。

```css
.list-table {
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  overflow: hidden;
}
.list-row {
  display: flex; align-items: center;
  padding: 14px 18px;
  background: var(--yyt-surface-2);
}
.list-row:hover { background: var(--yyt-surface-3); }
.list-row + .list-row { border-top: 1px solid var(--yyt-border); }
```

### 3.6 配置项（Form Inline Rows）

label 左 + control 右，底部 hairline 分隔。

```css
.form-inline {
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--yyt-border);
}
```

---

## 4. 组件样式规范

### 4.1 表单控件

```css
.yyt-input, .yyt-select, .yyt-textarea {
  background: var(--yyt-control-bg);
  border: 1px solid var(--yyt-control-border);
  border-radius: var(--yyt-control-radius);
  box-shadow: none;
}
/* focus */
border-color: var(--yyt-control-border-focus);
box-shadow: var(--yyt-focus-ring);
/* hover */
border-color: var(--yyt-control-border-hover);
```

代码编辑区 `.yyt-code-textarea`: `background: #080a10; caret-color: var(--yyt-accent-strong);`

### 4.2 按钮

| 变体 | 背景 | 边框 |
|------|------|------|
| primary (`.yyt-btn-primary`) | `var(--yyt-accent)` | `rgba(255,255,255,0.16)` |
| secondary (`.yyt-btn-secondary`) | `var(--yyt-surface-2)` | `rgba(255,255,255,0.12)` |
| danger (`.yyt-btn-danger`) | `var(--yyt-danger-soft)` | `rgba(248,113,113,0.32)` |

所有按钮: hover `translateY(-1px)`, active `scale(0.98)`, focus-visible `--yyt-focus-ring`。

### 4.3 Toggle 行

包含 label + hint + 滑块，在 form-inline 布局中不单独作为卡片。

滑块: 宽 52px, 高 30px, checked 背景 accent, `::before` 圆点 22px 动画滑动。

### 4.4 Custom Select Dropdown

Portal 渲染：dropdown 通过 `position: fixed` + `getBoundingClientRect` 浮动定位到文档 body。`ResizeObserver` 监听 trigger 自动重定位。click-outside / scroll / resize / Escape 关闭。

### 4.5 Dialog

```css
.yyt-dialog {
  background: var(--yyt-bg-base);
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius); /* 8px */
  box-shadow: 0 25px 80px rgba(0,0,0,0.6);
}
```

`.yyt-dialog-wide`: `width: min(720px, calc(100vw - 32px))`

### 4.6 Sidebar Nav Item

```css
background: transparent; border-radius: 6px;
/* hover */
background: rgba(255, 255, 255, 0.045);
transform: translateX(2px);
/* active */
background: var(--yyt-accent-soft);
border-color: var(--yyt-accent-soft);
/* active indicator */
::before { width: 4px; border-radius: 999px; background: var(--yyt-accent); }
```

---

## 5. 视觉丰富度

| 手法 | 说明 |
|------|------|
| **行图标背景块** | list-row 左侧 32×32 / 42×42 圆角块 + accent 色 |
| **状态指示点** | 6px 圆点 + 对应状态色 + `box-shadow: 0 0 6px` 光晕 |
| **hover 微交互** | stat-cell/list-row hover 背景升阶，nav-item translateX(2px) |
| **active indicator** | sidebar active item 左侧 4px accent 竖条 |
| **focus glow ring** | 控件 focus 时双环: `0 0 0 2px accent, 0 0 0 4px accent-soft` |
| **version badge** | pill 形状, accent-soft 背景 |
| **kicker 标签** | uppercase pill, accent-soft 背景, 0.5px letter-spacing |

---

## 6. Prefab 控件库

### 6.1 控件接口

所有 15 个 prefab 控件遵循统一接口：

```javascript
{
  el: HTMLElement,       // 根 DOM 元素
  get(): any,            // 获取当前值
  set(value): void,      // 设置值
  on(event, fn): unsub,  // 监听事件，返回取消函数
  off(event, fn): void,  // 取消监听
  destroy(): void,       // 销毁控件 + 清理 DOM
  getControl(id): Control | null  // 递归查找子控件
}
```

### 6.2 控件清单

| 控件 | 文件 | 变体 | 关键事件 |
|------|------|------|---------|
| `button` | `button.js` | default/primary/danger/ghost, normal/small | `click` |
| `text-input` | `text-input.js` | text/password/number/email/search | `input`, `change`, `blur` |
| `toggle` | `toggle.js` | normal/small | `change` |
| `select-input` | `select-input.js` | — | `change` |
| `dialog` | `dialog.js` | confirm/prompt/custom | — |
| `flow-section` | `flow-section.js` | — | — |
| `form-row` | `form-row.js` | inline/block | 透传 |
| `list-row` | `list-row.js` | — | `click` |
| `toolbar` | `toolbar.js` | start/end/center/space-between | — |
| `divider` | `divider.js` | hairline/dashed, tight/normal/loose | — |
| `zone-title` | `zone-title.js` | — | — |
| `chip-group` | `chip-group.js` | default/soft/danger | `change` |
| `preset-list-item` | `preset-list-item.js` | — | `click` |

### 6.3 基础设施 (`_internal.js`)

```javascript
el(tag, {className, text, html, attrs, style, dataset}, ...children) → HTMLElement
appendChild(parent, child)  // 支持 DOM/控件/字符串/数组/null
createEmitter()             // {on→unsub, off, emit, clear}
baseControl({id, kind})     // {el, get, set, on, off, destroy, getControl}
```

### 6.4 面板工厂

**`createPresetManagerPanel(spec)`** — 预设面板模板方法：

```
spec: {
  id, kind, store,                    // 必选
  renderEditor(preset, {onChange}),   // 必选
  renderExtras?, renderListItemMeta?, // 可选
  hasSwitchToButton?, onSwitchTo?     // 可选
}

固定布局: 预设列表 → 编辑器 → 扩展区 → 工具栏
内置行为: builtin_ 前缀保护, 重命名/删除, import/export/clear
```

**`createToolConfigPanel(options)`** — 工具配置面板工厂：

```
固定布局: Hero (固定) + 可滚动 body
Hero: 工具名称 + runtime chips + 执行按钮
Body: 绑定区 (5 个 select) + 配置区 (prompt + extraction)
高度锁定: pinToolPanelHeight() 使用 ResizeObserver
```

---

## 7. 面板注册与渲染流程

### 7.1 注册

```
registerComponents()
  → PANEL_MODULE_LOADERS (10 个面板)
  → Promise.allSettled(动态 import())
  → panelModuleCache 缓存
  → uiManager.register(panel.id, panel)
```

### 7.2 渲染 (双模式)

```
uiManager.render(panelId, $container, props)
  │
  ├─ Mode A (新式 prefab controls):
  │   panel.renderTo($container, props)
  │   → 面板用 el() + appendChild() + 控件工厂构建 DOM
  │
  └─ Mode B (旧式 jQuery):
      html = panel.render(props)      → 返回 HTML 字符串
      $container.html(html)           → jQuery 注入
      panel.bindEvents($container)    → 绑定事件
```

### 7.3 面板渲染模式分布

| 渲染模式 | 面板 |
|---------|------|
| jQuery (Mode B) | SettingsPanel, LoggerPanel, ToolManagePanel, BypassPanel |
| Prefab (Mode A) | ApiPresetPanel, RegexExtractPanel, WorldbookPresetPanel, TableTemplatePanel, ToolConfigPanel |
| 委托 | TableWorkbenchPanel → workbench-window, TableDataEditorWindow |

---

## 8. CSS 三份同步

修改 CSS token 时，**三处必须同步更新**：

| 文件 | 位置 | 说明 |
|------|------|------|
| `styles/main.css` | `:root { ... }` | 源头定义 |
| `modules/app/bootstrap.js` | `getBaseStyles()` | CDN 回退用内联 CSS（含完整表单控件规则） |
| `modules/ui/components/settings-panel.js` | `BASE_THEME_TOKENS` | JS 主题覆盖基准 |

### 4 个主题

| 主题名 | 说明 |
|--------|------|
| `dark-blue` | 默认深蓝主题 |
| `dark-purple` | 深紫主题 |
| `dark-green` | 深绿主题 |
| `light` | 亮色主题 |

`applyUiPreferences()` 通过 `document.documentElement.style.setProperty()` 覆盖 CSS 变量。

---

## 9. 动画

### 关键帧

```css
@keyframes yytFadeIn { from {opacity:0} to {opacity:1} }
@keyframes yytSlideUp { from {opacity:0; transform:translateY(8px)} to {opacity:1; transform:translateY(0)} }
@keyframes yytScaleIn { from {opacity:0; transform:scale(0.96)} to {opacity:1; transform:scale(1)} }
```

### 应用

- popup 出现: `yytScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)`
- overlay: `yytFadeIn 0.2s ease-out`
- 页面切换: `yytSlideUp 0.22s ease-out`
- 面板 sections 交错: `animation-delay: 0s / 0.05s / 0.1s`

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 10. 响应式断点

| 断点 | 变化 |
|------|------|
| `≤ 980px` | topbar 单列、stats 三等分、header/footer 紧凑 |
| `≤ 860px` | workspace 单列、sidebar 横向滚动、sidebar-toggle 隐藏、popup 全屏高度 |
| `≤ 768px` | popup 全屏无边框无圆角、header/footer 极紧凑、sidebar 纵向、footer 双列变单列 |

---

## 11. 无障碍

- 所有可交互元素必须有 `:focus-visible` 态，使用 `--yyt-focus-ring`
- `prefers-reduced-motion: reduce` 时全局禁用动画
- 侧栏导航支持 `focus-visible` box-shadow

---

## 12. `getStyles()` 规范

### 规则

1. 必须使用 `var()` token，禁止硬编码
2. 禁止重新声明 `:root` 变量
3. 禁止 gradient 背景、`inset` 阴影、shine overlay
4. 禁止 section 外框盒子 — 用 flow-section 标题 + hairline 分割
5. 数据展示 = stat-row / list-table 单容器
6. 配置项 = form-inline 行 + hairline 分隔

### 合规示例

```css
/* ✅ flow heading */
.yyt-heading {
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.3px;
}

/* ✅ list table */
.yyt-list {
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  overflow: hidden;
}
.yyt-item {
  display: flex; align-items: center;
  padding: 14px 18px; background: var(--yyt-surface-2);
}
.yyt-item + .yyt-item { border-top: 1px solid var(--yyt-border); }

/* ✅ form inline row */
.yyt-config-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 0; border-bottom: 1px solid var(--yyt-border);
}
```

### 不合规示例

```css
/* ❌ section 外框盒子 */
.section { border: 1px solid rgba(255,255,255,0.09); border-radius: 8px; padding: 16px; }

/* ❌ 独立 item 卡片 */
.item { border: 1px solid var(--yyt-border); border-radius: var(--yyt-radius); padding: 18px; }

/* ❌ 硬编码颜色 */
background: rgba(123, 183, 255, 0.15);

/* ❌ gradient 背景 */
background: linear-gradient(135deg, rgba(123,183,255,0.1), transparent);
```
