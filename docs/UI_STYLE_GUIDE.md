# UI Style Guide — Flat Flow

YouYou Toolkit 的 UI 设计规范文档。所有新增和修改的 UI 代码必须遵循此文档。

> **设计语言**: Linear / Resend 平铺流式布局
> **参考来源**: `Reference/design-md/` 下的 `linear.app`、`resend`、`cursor` DESIGN.md
> **核心理念**: 内容平铺在 content area 上，分组靠标题 + hairline 分割线 + 留白，**不使用 section 外框包裹内容**。数据和列表使用单一容器 + 内部 hairline 行分隔。

---

## 0. 设计语言选择记录

### 为什么选 Linear / Resend

- **Linear**: 近纯黑画布 (#010102) + 4 级 surface 阶梯 + hairline 边框替代阴影 + 单一 accent 色（lavender-blue）+ 无装饰渐变、无 spotlight card
- **Resend**: 纯黑画布 (#000000) + 半透明白边框体系 (6%/14%) + 严格 12px 容器圆角 + 无传统阴影语言

### 从参考设计中提取的关键规则

1. **Surface depth via luminance, not decoration** — 深度靠纯色阶梯表达，不靠渐变、阴影、inset highlight
2. **Hairline borders replace shadows** — 1px 半透明白边框是唯一的层级分隔手段，暗色画布自然吸收阴影
3. **No box-in-box nesting** — Linear 的 feature-card 直接坐在 canvas 上，不套外层 section 框；Resend 的 code-window 也是独立容器不嵌套
4. **Single accent, used sparingly** — accent 色只用于 CTA、focus ring、active 状态，不用于装饰填充
5. **Strict radius hierarchy** — 外层 12px → 内层 8px → 控件 6px → badge 4px，**同级容器不允许相同或更大圆角**
6. **Flat elevation** — Linear 的 elevation level 0 是无边框无阴影（默认文字），level 1 是 surface-1 背景 + 1px hairline（卡片），level 2 是 surface-2 + stronger hairline（hover/featured）

### 我们的适配方案

将 Linear/Resend 的营销页面设计语言适配为**工具弹窗 UI**：
- popup shell = Linear 的 canvas 层
- sidebar = surface-1 背景，nav-item 是 transparent + hover 变色
- content area = surface-1 背景（扁平底板）
- **内容分组 = 标题 + hairline 分割线 + 留白**（NOT section 边框盒子）
- 数据展示（stat）= 单一扁平容器，内部格子用竖线分隔
- 列表展示（tool list）= 单一容器 + 行间 hairline 分隔
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

### 禁止项（Do NOT）

- ❌ **section 外框盒子**（`border + border-radius` 包裹一组控件 = 框套框的根源）
- ❌ 结构容器使用 `linear-gradient` / `radial-gradient` 背景
- ❌ 使用 `inset` 阴影
- ❌ `::before` / `::after` 做光泽覆盖层
- ❌ 控件上叠加 `box-shadow`（`--yyt-control-shadow*` 全部为 `none`）
- ❌ 硬编码颜色值
- ❌ 大圆角嵌套大圆角（"大圈套小圈"）
- ❌ 同一父容器内既有 card-style 又有 row-style 分组

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
| `--yyt-surface-active` | `#232b3e` | active 态、dropdown 选中 |

### 2.2 Accent & 语义色

| Token | 默认值 | 说明 |
|-------|--------|------|
| `--yyt-accent` | `#7bb7ff` | 主强调色 |
| `--yyt-accent-glow` | `rgba(123, 183, 255, 0.08)` | focus ring 外层光晕 |
| `--yyt-accent-soft` | `rgba(123, 183, 255, 0.15)` | active 选中态背景、badge |
| `--yyt-accent-strong` | `#a5d4ff` | 高亮文字、icon |
| `--yyt-on-accent` | `#0a0d13` | accent 背景上的文字色 |
| `--yyt-success` | `#4ade80` | 成功 |
| `--yyt-success-soft` | `rgba(74, 222, 128, 0.12)` | 成功背景 |
| `--yyt-error` / `--yyt-danger` | `#ef4444` | 错误/危险 |
| `--yyt-danger-soft` | `rgba(239, 68, 68, 0.16)` | danger 按钮背景 |
| `--yyt-warning` | `#fbbf24` | 警告 |

### 2.3 文字

| Token | 值 | 用途 |
|-------|----|------|
| `--yyt-text` | `rgba(255, 255, 255, 0.92)` | 主文字 |
| `--yyt-text-secondary` | `rgba(255, 255, 255, 0.55)` | 次要文字 |
| `--yyt-text-muted` | `rgba(255, 255, 255, 0.35)` | 辅助/占位文字 |

### 2.4 边框（hairline 体系）

| Token | 值 | 用途 |
|-------|----|------|
| `--yyt-border` / `--yyt-hairline` | `rgba(255, 255, 255, 0.06)` | 默认分割线、行间 hairline |
| `--yyt-border-strong` / `--yyt-hairline-strong` | `rgba(255, 255, 255, 0.12)` | 容器外框、结构边框 |
| `--yyt-border-focus` | `rgba(123, 183, 255, 0.5)` | focus 态边框 |

### 2.5 圆角

| Token | 值 | 使用场景 |
|-------|----|----------|
| `--yyt-radius-xs` | `4px` | badge、tag、inline chip |
| `--yyt-radius-sm` | `6px` | 按钮、输入框、toggle、nav-item、list-table 内部行图标 |
| `--yyt-radius` | `8px` | 独立容器（stat-row、list-table）、sidebar-card |
| `--yyt-radius-lg` | `12px` | popup、dialog |

### 2.6 阴影

仅浮动元素使用：

| Token | 允许使用的元素 |
|-------|--------------|
| `--yyt-shadow` | popup |
| `--yyt-shadow-glow` | popup 外光晕 |
| `--yyt-select-dropdown-shadow` | select dropdown |
| `--yyt-focus-ring` | focus-visible 态 |

所有控件阴影 token = `none`。

---

## 3. 布局结构

### 3.1 整体结构

```
┌─ popup (.yyt-popup) ──────────────────── bg-base
│ ┌─ header ─────────────────────────────── surface, border-bottom hairline
│ ├─ body
│ │ ├─ sidebar ──────────────────────────── surface, border-right hairline
│ │ │ ├─ brand icon + title
│ │ │ ├─ divider (hairline)
│ │ │ ├─ label (uppercase, muted)
│ │ │ └─ nav-items (transparent → hover: surface-2 → active: accent-soft + left bar)
│ │ └─ main
│ │   ├─ main-header ────────────────────── border-bottom hairline, title + actions
│ │   ├─ content ────────────────────────── surface (扁平底板)
│ │   │ ├─ flow-section ─────────────────── 标题 + hairline-top 分割（NO 外框）
│ │   │ │ ├─ stat-row ──────────────────── 单一容器 surface-2, hairline-strong 外框
│ │   │ │ ├─ list-table ─────────────────── 单一容器 surface-2, 行间 hairline
│ │   │ │ ├─ form-inline rows ───────────── hairline-bottom 分隔
│ │   │ │ └─ form controls ──────────────── control-bg + control-border
│ │   │ └─ flow-section ...
│ │   └─ footer-bar ─────────────────────── border-top hairline, actions
│ └─ footer ─────────────────────────────── surface
```

### 3.2 Flow Section（内容分组）

**这是与旧设计最大的区别。** 不使用 `.yyt-panel-section` 边框盒子。

```css
/* 相邻 flow-section 之间用 hairline + 留白分割 */
.flow-section + .flow-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--yyt-border);
}

/* flow 标题 — uppercase, 小字号, accent icon */
.flow-heading {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 14px;
}

/* flow 标题左侧 icon 背景块 */
.flow-heading-icon {
  width: 22px; height: 22px;
  border-radius: var(--yyt-radius-sm);
  background: var(--yyt-accent-soft);
  color: var(--yyt-accent);
}
```

### 3.3 数据展示（Stat Row）

单一扁平容器，内部格子用竖线分隔。**不是**独立的 stat-card 盒子。

```css
.stat-row {
  display: grid;
  grid-template-columns: repeat(N, 1fr);
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
.stat-cell:hover { background: var(--yyt-surface-3); }
```

### 3.4 列表展示（List Table）

单一容器 + 行间 hairline。**不是**一个个独立的 item 卡片。

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

行内元素：左侧彩色图标背景块 + 名称/描述 + 右侧 badge + 状态指示点 + toggle/actions。

### 3.5 配置项（Form Inline Rows）

label 左 + control 右，底部 hairline 分隔。**不包裹在 section 盒子里。**

```css
.form-inline {
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--yyt-border);
}
.form-inline:last-child { border-bottom: none; }
```

### 3.6 独立表单区域

textarea、code editor 等大块表单直接放在 flow-section 内，不需要外框。

```css
.form-row {
  display: flex; flex-direction: column;
  gap: 6px; margin-top: 14px;
}
```

---

## 4. 组件样式规范

### 4.1 表单控件 (`.yyt-input` / `.yyt-select` / `.yyt-textarea`)

```css
background: var(--yyt-control-bg);        /* #0f1219 */
border: 1px solid var(--yyt-control-border);
border-radius: var(--yyt-control-radius);  /* 6px */
box-shadow: none;
```

- focus: border → accent + `box-shadow: 0 0 0 3px var(--yyt-accent-glow)`
- hover: border → control-border-hover
- `<select option>` 和 `<optgroup>`: `background: var(--yyt-surface); color: var(--yyt-text);`

### 4.2 按钮 (`.yyt-btn`)

| 变体 | 背景 | 边框 |
|------|------|------|
| primary | `var(--yyt-accent)` | transparent |
| secondary/ghost | `var(--yyt-surface-2)` 或 transparent | `var(--yyt-hairline-strong)` |
| danger | `var(--yyt-danger-soft)` | `rgba(239,68,68,0.2)` |

- 圆角: 6px, hover: `translateY(-1px)`, active: `scale(0.98)`

### 4.3 Toggle 行

包含在 form-inline 布局中，不单独作为卡片。Toggle 开关本身保持现有样式。

### 4.4 Select Dropdown

```css
background: var(--yyt-select-surface) !important;
border-radius: 6px;
box-shadow: var(--yyt-select-dropdown-shadow);  /* 唯一允许阴影的控件 */
```

### 4.5 Dialog

```css
background: var(--yyt-bg-base);
border: 1px solid var(--yyt-border-strong);
border-radius: var(--yyt-radius);  /* 8px */
box-shadow: 0 25px 80px rgba(0,0,0,0.6);
```

### 4.6 Sidebar Nav Item

```css
background: transparent;
border-radius: 6px;
```
- hover: `background: var(--yyt-surface-2)`, `translateX(2px)`
- active: `background: var(--yyt-accent-soft)`, 左侧 3px accent bar (`::before`)
- 可选: 右侧 count badge (`background: var(--yyt-surface-2)`, pill)

---

## 5. 视觉丰富度点缀

避免"太素"，以下手法在不违反核心原则的前提下增加层次感：

| 手法 | 说明 | 示例 |
|------|------|------|
| **行图标背景块** | list-row 左侧 32x32 圆角块 + accent/success/warning 色 | `background: var(--yyt-accent-soft); color: var(--yyt-accent);` |
| **状态指示点** | 6px 圆点 + 对应状态色 + `box-shadow: 0 0 6px` 光晕 | 绿色发光点 = 启用，灰色点 = 禁用 |
| **趋势 pill** | stat-cell 内的小标签 | `↑ 全部就绪` 绿色 pill |
| **hover 微交互** | stat-cell/list-row hover 背景升阶，nav-item hover translateX | 不需要阴影 |
| **count badge** | sidebar nav-item 右侧数字标签 | pill 形状, surface-2 背景 |
| **active indicator** | sidebar active item 左侧 3px accent 竖条 | `::before` 实现 |
| **focus glow ring** | 控件 focus 时 accent 光晕 | `box-shadow: 0 0 0 3px var(--yyt-accent-glow)` |

---

## 6. 组件 `getStyles()` 规范

### 规则

1. **必须使用 `var()` token**，禁止硬编码
2. **禁止重新声明 `:root` 变量**
3. **禁止 gradient 背景**、`inset` 阴影、shine overlay
4. **禁止 section 外框盒子** — 用 flow-section 标题 + hairline 分割
5. hero 区域 = inline header（标题 + 操作按钮，`border-bottom` 分隔）
6. 数据展示 = stat-row 单容器 / list-table 单容器
7. 配置项 = form-inline 行 + hairline 分隔

### 合规示例

```css
/* ✅ flow heading */
.yyt-tool-heading {
  font-size: 12px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.3px;
  margin-bottom: 14px;
}

/* ✅ list table */
.yyt-tool-list {
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  overflow: hidden;
}
.yyt-tool-item {
  display: flex; align-items: center;
  padding: 14px 18px;
  background: var(--yyt-surface-2);
}
.yyt-tool-item + .yyt-tool-item {
  border-top: 1px solid var(--yyt-border);
}

/* ✅ form inline row */
.yyt-config-row {
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--yyt-border);
}
```

### 不合规示例

```css
/* ❌ section 外框盒子 — 框套框根源 */
.yyt-panel-section {
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  padding: 16px;
}

/* ❌ 独立 item 卡片 — 应该是 list-table 里的行 */
.yyt-tool-item {
  border: 1px solid var(--yyt-border);
  border-radius: var(--yyt-radius);
  padding: 18px;
  background: transparent;
}

/* ❌ 硬编码颜色 */
background: rgba(123, 183, 255, 0.15);

/* ❌ gradient 背景 */
background: linear-gradient(135deg, rgba(123,183,255,0.1), transparent);
```

---

## 7. CSS 三份同步

修改 CSS token 时，**三处必须同步更新**：

| 文件 | 位置 | 说明 |
|------|------|------|
| `styles/main.css` | `:root { ... }` | 源头定义 |
| `modules/app/bootstrap.js` | `getBaseStyles()` | CDN 回退用内联 CSS（必须包含完整表单控件规则） |
| `modules/ui/components/settings-panel.js` | `BASE_THEME_TOKENS` | JS 主题覆盖基准 |

---

## 8. 响应式断点

| 断点 | 变化 |
|------|------|
| `≤ 980px` | topbar 单列、stats 三等分 |
| `≤ 860px` | workspace 单列、sidebar 横向滚动、popup 全屏高度 |
| `≤ 768px` | popup 全屏无圆角、header/footer 紧凑、sidebar 纵向 |

---

## 9. 无障碍

- 所有可交互元素必须有 `:focus-visible` 态，使用 `--yyt-focus-ring`
- 不依赖 color alone 传递状态（配合 icon / 文字标签）
- `prefers-reduced-motion: reduce` 时全局禁用动画

---

## 10. 预览参考

`D:\Projects\yyt-style-preview\index.html` 是当前设计语言的静态预览页，包含 sidebar、stat-row、list-table、form-inline、控件样式的完整示例。修改设计规范后应同步更新此预览。
