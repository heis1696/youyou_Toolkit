# UI Style Guide — Surface Ladder Flat

YouYou Toolkit 的 UI 设计规范文档。所有新增和修改的 UI 代码必须遵循此文档。

> **设计方向**: Linear / Resend 混合风格 — 纯色阶梯深度，无渐变结构容器，细边框，紧凑圆角，极少阴影。

---

## 1. 核心原则

| 原则 | 说明 |
|------|------|
| **纯色阶梯** | 深度通过 solid 背景色阶梯表达，结构容器禁止使用 `linear-gradient` / `radial-gradient` |
| **单级装饰** | 同一嵌套路径上只允许出现一次装饰（边框 OR 背景色升阶，不叠加） |
| **阴影节制** | 阴影仅用于真正浮动的元素（popup、dropdown、dialog），其余一律 `none` |
| **外大内小** | 圆角严格遵守 `外层 > 内层` 层级关系 |
| **token 优先** | 所有颜色、间距、圆角、阴影必须走 CSS 变量，禁止硬编码 |

### 禁止项（Do NOT）

- ❌ 结构容器使用 `linear-gradient` / `radial-gradient` 背景
- ❌ 使用 `inset` 阴影（`inset 0 1px 0 ...` 等 glassmorphism 遗留手法）
- ❌ `::before` / `::after` 做光泽覆盖层（shine overlay）
- ❌ 控件上叠加 `box-shadow`（`--yyt-control-shadow*` 全部为 `none`）
- ❌ 硬编码颜色值（如 `rgba(123, 183, 255, 0.15)` → 应使用 `var(--yyt-accent-soft)`）
- ❌ 大圆角嵌套大圆角（"大圈套小圈"）

### 唯一例外

启动屏 (`.yyt-startup-screen-inner`) 允许一个 `radial-gradient` 作为点缀装饰，这是全局唯一允许渐变的位置。

---

## 2. Token 体系

### 2.1 Surface 阶梯

从深到浅的纯色阶梯，每一级比上一级亮一档。

| Token | 值 | 用途 |
|-------|----|------|
| `--yyt-bg-base` | `#0a0d13` | popup 背景、最深层 |
| `--yyt-surface` | `#0f1219` | sidebar card、popup header、content-frame |
| `--yyt-surface-2` | `#151a24` | section、card、stat 卡片 |
| `--yyt-surface-3` | `#1c2231` | hover 态、次级强调 |
| `--yyt-surface-hover` | `#1c2231` | 通用 hover 背景 |
| `--yyt-surface-active` | `#232b3e` | active 态、dropdown 选中、最高层 |

**别名 token**（方便语义化引用）：
- `--yyt-surface-raised` → `var(--yyt-surface-2)`
- `--yyt-surface-overlay` → `var(--yyt-surface-3)`
- `--yyt-surface-elevated` → `var(--yyt-surface-active)`

**嵌套规则**: 子元素的 surface 级别必须 ≥ 父元素。例如 popup (`bg-base`) → sidebar-card (`surface`) → nav-item hover (`surface-2`)。

### 2.2 Accent & 语义色

| Token | 默认值 | 说明 |
|-------|--------|------|
| `--yyt-accent` | `#7bb7ff` | 主强调色 |
| `--yyt-accent-glow` | `rgba(123, 183, 255, 0.4)` | 光晕（仅用于 shadow-glow） |
| `--yyt-accent-soft` | `rgba(123, 183, 255, 0.15)` | 浅底色（active 选中态背景、badge） |
| `--yyt-accent-strong` | `#a5d4ff` | 高亮文字、icon |
| `--yyt-on-accent` | `#0a0d13` | accent 背景上的文字色 |
| `--yyt-success` | `#4ade80` | 成功状态 |
| `--yyt-error` / `--yyt-danger` | `#ef4444` | 错误/危险 |
| `--yyt-danger-soft` | `rgba(239, 68, 68, 0.16)` | danger 按钮背景 |
| `--yyt-warning` | `#fbbf24` | 警告 |

### 2.3 文字

| Token | 值 | 用途 |
|-------|----|------|
| `--yyt-text` | `rgba(255, 255, 255, 0.92)` | 主文字 |
| `--yyt-text-secondary` | `rgba(255, 255, 255, 0.55)` | 次要文字 |
| `--yyt-text-muted` | `rgba(255, 255, 255, 0.35)` | 辅助/占位文字 |

兼容别名: `--yyt-color-text-primary`, `--yyt-color-text-secondary`, `--yyt-color-text-muted`, `--yyt-color-accent`

### 2.4 边框

两级 hairline 系统：

| Token | 值 | 用途 |
|-------|----|------|
| `--yyt-border` | `rgba(255, 255, 255, 0.06)` | 默认分割线 |
| `--yyt-border-soft` | `rgba(255, 255, 255, 0.04)` | 极浅分隔 |
| `--yyt-border-strong` | `rgba(255, 255, 255, 0.12)` | 结构边框、card 外框 |
| `--yyt-border-focus` | `rgba(123, 183, 255, 0.5)` | focus 态边框 |

控件专用: `--yyt-control-border` (0.08), `--yyt-control-border-hover` (0.14), `--yyt-control-border-focus` (accent 0.5)

### 2.5 圆角

严格外大内小层级：

| Token | 值 | 使用场景 |
|-------|----|----------|
| `--yyt-radius-xs` | `4px` | badge、tag、inline chip |
| `--yyt-radius-sm` | `6px` | 按钮、输入框、toggle、nav-item |
| `--yyt-radius` | `8px` | card、section、sidebar-card、topbar |
| `--yyt-radius-lg` | `12px` | popup、dialog |
| `--yyt-radius-xl` | `16px` | 启动屏（仅此一处） |

控件专用: `--yyt-control-radius` = `6px`, `--yyt-control-radius-sm` = `4px`

**嵌套示例**:
```
popup (12px) → sidebar-card (8px) → nav-item (6px) → icon (6px)
popup (12px) → content-frame (8px*) → section (8px) → input (6px)
dialog (8px) → form-group → input (6px)
```
*content-frame 使用 `calc(var(--yyt-radius-xl) - 2px)` 即 14px，因为它紧贴 popup 内壁。

### 2.6 阴影

| Token | 值 | 允许使用的元素 |
|-------|----|--------------|
| `--yyt-shadow` | `0 8px 32px rgba(0,0,0,0.5)` | popup |
| `--yyt-shadow-soft` | `0 4px 16px rgba(0,0,0,0.3)` | 备用（极少使用） |
| `--yyt-shadow-glow` | `0 0 16px var(--yyt-accent-glow)` | popup 外光晕 |
| `--yyt-select-dropdown-shadow` | `0 8px 24px rgba(0,0,0,0.4)` | select dropdown |
| `--yyt-focus-ring` | `0 0 0 2px accent, 0 0 0 4px accent/0.15` | focus-visible 态 |

**所有控件阴影 token 已设为 `none`**: `--yyt-control-shadow`, `--yyt-control-shadow-hover`, `--yyt-control-shadow-focus`, `--yyt-control-shadow-active`。不要给它们赋值。

### 2.7 Motion

| Token | 值 | 用途 |
|-------|----|------|
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | 常规退出（面板入场） |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | 常规进入 |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | 双向过渡 |
| `--yyt-ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` | 弹性动画（popup scale-in） |
| `--yyt-duration-fast` | `150ms` | 快速交互（hover、active） |
| `--yyt-duration-normal` | `250ms` | 常规过渡 |

### 2.8 字号

| Token | 值 | 用途 |
|-------|----|------|
| `--yyt-text-xs` | `10px` | stat label、极小标签 |
| `--yyt-text-sm` | `11px` | section title、badge、hint |
| `--yyt-text-base` | `13px` | 正文、按钮文字、输入框 |
| `--yyt-text-md` | `14px` | nav item 名称、toggle 标题 |
| `--yyt-text-lg` | `16px` | popup title、topbar title |
| `--yyt-text-xl` | `20px` | — |
| `--yyt-text-2xl` | `24px` | — |

### 2.9 字重

| 场景 | 字重 |
|------|------|
| hero / shell main title | `700` |
| section title | `700` (uppercase + letter-spacing) |
| nav item 名称、toggle 标题、badge | `700` |
| 次要标签 (label) | `600` |
| 正文 | 默认 (400) |

---

## 3. 结构层级映射

整个 UI 从外到内的 surface 分配：

```
┌─ popup (.yyt-popup) ───────────────────── bg-base (#0a0d13)
│ ┌─ header (.yyt-popup-header) ─────────── surface (#0f1219)
│ ├─ body
│ │ ├─ topbar (.yyt-shell-topbar) ──────── surface (#0f1219)
│ │ │ └─ stat (.yyt-shell-stat) ─────────── surface-2 (#151a24)
│ │ ├─ sidebar-card ─────────────────────── surface (#0f1219)
│ │ │ └─ nav-item ──────────────────────── transparent → hover: surface → active: accent-soft
│ │ └─ content-frame ────────────────────── surface (#0f1219)
│ │   └─ content
│ │     ├─ panel-section ────────────────── transparent + border
│ │     │ └─ control (input/btn) ────────── surface / surface-2
│ │     └─ toggle-row ───────────────────── transparent + border-bottom
│ └─ footer (.yyt-popup-footer) ─────────── surface (#0f1219)
```

---

## 4. 组件样式规范

### 4.1 面板 Section (`.yyt-panel-section`)

```css
background: transparent;
border: 1px solid rgba(255, 255, 255, 0.09);
border-radius: 8px;
box-shadow: none;
padding: 16px;
gap: 12px;
```

- 用边框区分区块，不用背景色
- hover 时仅加深边框色至 `0.14`，不改背景、不加阴影
- 危险操作区可用 `background: var(--yyt-danger-soft)` + `border-color: rgba(239,68,68,0.3)` 作为例外强调

### 4.2 按钮 (`.yyt-btn`)

| 变体 | 背景 | 边框 | 阴影 |
|------|------|------|------|
| default | `var(--yyt-control-bg-strong)` | `var(--yyt-control-border)` | `none` |
| primary | `var(--yyt-accent)` | `rgba(255,255,255,0.16)` | `none` |
| secondary | `var(--yyt-surface-2)` | `rgba(255,255,255,0.12)` | `none` |
| danger | `var(--yyt-danger-soft)` | `rgba(248,113,113,0.32)` | 允许微弱 danger glow |

- 圆角: `var(--yyt-control-radius)` = 6px
- `::before` 设为 `display: none`（禁止 shine overlay）
- `::after` 仅用于 1px 内边框 `rgba(255,255,255,0.025)`
- hover: `translateY(-1px)`, active: `scale(0.98)`

### 4.3 输入框 (`.yyt-input` / `.yyt-select` / `.yyt-textarea`)

```css
background: var(--yyt-control-bg);        /* surface */
border: 1px solid var(--yyt-control-border);
border-radius: var(--yyt-control-radius);  /* 6px */
box-shadow: var(--yyt-control-shadow);     /* none */
```

- focus 态: 边框变 accent，双环 focus-ring
- 不使用 background gradient

### 4.4 Toggle 行 (`.yyt-toggle-row`)

```css
background: transparent;
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 0;       /* 不是卡片，是列表行 */
box-shadow: none;
```

- hover: `background: var(--yyt-surface)`, 边框加深
- 相邻行使用 border 分隔，不包裹成卡片

### 4.5 Select Dropdown (`.yyt-select-dropdown`)

```css
background: var(--yyt-select-surface) !important;
background-image: none !important;          /* 阻止主题覆盖 */
backdrop-filter: none !important;
border-radius: 6px;
box-shadow: var(--yyt-select-dropdown-shadow);  /* 唯一允许阴影的控件 */
```

### 4.6 Dialog (`.yyt-dialog`)

```css
background: var(--yyt-bg-base);
border: 1px solid var(--yyt-border-strong);
border-radius: var(--yyt-radius);           /* 8px */
box-shadow: 0 25px 80px rgba(0,0,0,0.6);    /* 浮动元素允许阴影 */
```

### 4.7 Sidebar Nav Item (`.yyt-shell-sidebar .yyt-main-nav-item`)

```css
background: transparent;
border: 1px solid rgba(255, 255, 255, 0.06);
border-radius: 6px;
box-shadow: none;
```

- Active 态: `background: var(--yyt-accent-soft)`, 左侧 4px accent indicator bar (`::before`)
- hover: `translateX(2px)` 微移

---

## 5. 主题系统

### 5.1 架构

| 层 | 文件 | 职责 |
|----|------|------|
| CSS 默认值 | `styles/main.css` `:root` | dark-blue 默认主题 |
| JS 基准 token | `settings-panel.js` `BASE_THEME_TOKENS` | 与 `:root` 一致的 JS 对象 |
| JS 主题差异 | `settings-panel.js` `THEME_CONFIGS` | 每个主题仅覆盖与 BASE 不同的 token |
| 运行时应用 | `applyTheme()` | 遍历 token → `root.style.setProperty()` |
| 内联回退 | `bootstrap.js` `getBaseStyles()` | CDN 部署时 fetch 失败的完整 CSS 回退 |

### 5.2 新增主题 checklist

1. 在 `THEME_CONFIGS` 添加主题 key（仅列出与 `BASE_THEME_TOKENS` 不同的 token）
2. 必须覆盖的 token 最小集：
   - `--yyt-accent`, `--yyt-accent-glow`, `--yyt-accent-soft`, `--yyt-accent-strong`
   - `--yyt-on-accent`
   - 全部 5 个 surface 阶梯 (`--yyt-bg-base` ~ `--yyt-surface-active`)
   - `--yyt-control-bg` ~ `--yyt-control-bg-focus`（= surface 阶梯的引用值）
   - `--yyt-control-border-focus`, `--yyt-focus-ring`
   - `--yyt-select-*` 全系列
3. light 主题额外需覆盖: `--yyt-text`, `--yyt-text-secondary`, `--yyt-text-muted`, `--yyt-border*`

### 5.3 已有主题

| Key | 强调色 | Base |
|-----|--------|------|
| `dark-blue` | `#7bb7ff` | `#0a0d13` |
| `dark-purple` | `#a78bfa` | `#0d0a14` |
| `dark-green` | `#4ade80` | `#0a120d` |
| `light` | `#3b82f6` | `#f5f7fa` |

---

## 6. 组件 `getStyles()` 规范

每个面板组件通过 `getStyles()` 返回组件专用 CSS。

### 规则

1. **必须使用 `var()` token**，禁止硬编码颜色/圆角/阴影
2. **禁止重新声明 `:root` 变量**
3. **禁止 gradient 背景**、`inset` 阴影、`::before/::after` shine overlay
4. 组件 hero 区域使用 **inline header**（标题 + 标签 + 操作按钮平铺），不使用 gradient 卡片
5. 组件内的 section/card 使用 `var(--yyt-surface-2)` 背景 + `border-radius: 8px` + `1px border`
6. 或使用 border-bottom 分隔行（toggle-row 风格），两者不混用于同一区域

### 合规示例

```css
.yyt-tool-hero {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--yyt-border);
}

.yyt-tool-section {
  background: var(--yyt-surface-2);
  border: 1px solid var(--yyt-border);
  border-radius: 8px;
  padding: 16px;
}
```

### 不合规示例

```css
/* ❌ 硬编码颜色 */
background: rgba(123, 183, 255, 0.15);

/* ❌ gradient 背景 */
background: linear-gradient(135deg, rgba(123,183,255,0.1), transparent);

/* ❌ 控件阴影 */
box-shadow: 0 12px 24px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.04);

/* ❌ 过大圆角 */
border-radius: 18px;
```

---

## 7. CSS 三份同步

修改 CSS token 时，**三处必须同步更新**：

| 文件 | 位置 | 说明 |
|------|------|------|
| `styles/main.css` | `:root { ... }` | 源头定义 |
| `modules/app/bootstrap.js` | `getBaseStyles()` 内的 `:root` | CDN 回退用内联 CSS |
| `modules/ui/components/settings-panel.js` | `BASE_THEME_TOKENS` | JS 主题覆盖基准 |

**同步方法**: 修改 `styles/main.css` 后，将其完整内容复制到 `getBaseStyles()` 的 template literal 中（注意转义 `` ` `` 和 `${}`）。`BASE_THEME_TOKENS` 只需包含被 `applyTheme()` 覆盖的 token 子集。

---

## 8. 响应式断点

| 断点 | 变化 |
|------|------|
| `≤ 980px` | topbar 单列、stats 三等分 |
| `≤ 860px` | workspace 单列、sidebar 横向滚动、popup 全屏高度 |
| `≤ 768px` | popup 全屏无圆角、header/footer 紧凑、sidebar 纵向 |

---

## 9. 无障碍

- 所有可交互元素必须有 `:focus-visible` 态，使用 `--yyt-focus-ring`（双环：2px 实线 + 4px 柔光）
- 不依赖 color alone 传递状态（配合 icon / 文字标签）
- `prefers-reduced-motion: reduce` 时全局禁用动画
