# 面板布局审计 & Flat Flow 设计规范

> 更新日期: 2026-05-15
> 版本: v1.0.147 (Flat Flow Phase 2 完成后)
> 用途: UI 布局规范参考

---

## 1. Shell Frame (弹窗壳)

**组件文件**: `modules/app/popup-shell.js` + `styles/main.css`

### 布局结构

```
div.yyt-popup (fixed, 12px radius, bg-base)
├── div.yyt-popup-header (brand + version + drag + close)
├── div.yyt-popup-body (padding: 0 16px)
│   └── div.yyt-popup-shell
│       └── div.yyt-shell-workspace (grid: sidebar | main)
│           ├── aside.yyt-shell-sidebar
│           │   ├── title-row (标题 + tab计数 + 折叠按钮)
│           │   ├── div.yyt-main-nav (滚动导航列表)
│           │   ├── div.yyt-shell-sidebar-note (纯文本 hint, 无框)
│           │   └── div.yyt-shell-sidebar-stats (3列 grid)
│           └── section.yyt-shell-main (flex, column)
│               ├── div.yyt-shell-main-header (border-bottom hairline)
│               ├── div.yyt-sub-nav
│               │   └── div.yyt-sub-nav-group (border + radius 保留)
│               └── div.yyt-content-frame (transparent, no padding, no radius)
│                   └── div.yyt-content (no border, no radius, padding: 16px)
│                       └── div.yyt-content-inner
│                           └── div.yyt-tab-content (面板挂载点)
├── div.yyt-popup-footer
```

### 样式特征

- ✅ `yyt-content-frame`: 透明，无 padding/border/radius
- ✅ `yyt-content`: 无 border/radius，仅 padding
- ✅ `yyt-shell-sidebar-note`: 纯文本 hint，无框
- ✅ `yyt-shell-sidebar-card`: 透明无框（padding 保留，border/radius/bg 移除）
- ✅ `yyt-shell-sidebar-stat`: 透明无框
- ✅ `yyt-shell-stat`: 透明 + border-left hairline（非独立卡片）
- ✅ `yyt-main-nav-icon`: accent-soft bg + 无 border（非独立卡片）
- ✅ `yyt-shell-main-meta`: 透明 + border-bottom hairline
- ✅ `yyt-popup-drag-hint`: solid border（非 dashed）
- ✅ `yyt-sub-nav-item.active`: 无 box-shadow
- ✅ footer: border-top hairline，无盒子
- ✅ main-header: 保留完整边框（用户确认的设计决策）
- ✅ sub-nav-group: 保留 border+radius（用户确认的设计决策）

---

## 2. Settings Panel (设置面板)

**组件文件**: `modules/ui/components/settings-panel.js`

### 布局结构

```
div.yyt-settings-panel (flex, column, gap:14px, height:100%)
├── div.yyt-settings-hero (transparent, no border)
│   ├── hero-copy (title 18px + desc 13px)
│   └── hero-status (status chips)
├── div.yyt-settings-tabs (tab rail)
│   └── button.yyt-settings-tab × 4
├── div.yyt-settings-content (flex:1, overflow-y:auto)
│   └── div.yyt-settings-tab-content
│       └── div.yyt-flow-section × N
│           ├── div.yyt-flow-heading (icon + label)
│           └── form controls
└── div.yyt-settings-footer (reset + save)
```

### 样式特征

- ✅ hero 区透明无框
- ✅ tab 内容用 flow-section + flow-heading
- ✅ list-row 无背景色
- ⚠️ `.yyt-settings-tabs` 有 bg+border+radius（可接受，tab rail 常见做法）

---

## 3. Tool Manage Panel (工具管理面板)

**组件文件**: `modules/ui/components/tool-manage-panel.js`

### 布局结构

```
div.yyt-tool-manager (flex, column, gap:0)
├── div.yyt-flow-section
│   └── div.yyt-stat-row (grid: 1fr 1fr)
├── div.yyt-flow-section
│   ├── div.yyt-flow-heading (标题 + "新建工具" 按钮)
│   └── div.yyt-tool-list
│       └── div.yyt-list-table
│           └── div.yyt-list-row × N
└── div.yyt-panel-footer (导入/导出/重置)
```

### 样式特征

- ✅ stat-row 用 grid + hairline 分隔
- ✅ list-table + list-row 结构正确
- ✅ 整体 gap:0，无多余间距

---

## 4. Tool Config Panel (工具配置面板)

**组件文件**: `modules/ui/components/tool-config-panel-factory.js`

### 布局结构

```
div.yyt-tool-panel (flex, column, gap:0)
├── div.yyt-tool-panel-hero (grid 2col, border-bottom, transparent)
│   ├── hero-copy (title + desc)
│   └── hero-tags (chips + save btn)
├── div.yyt-flow-section × N
│   ├── div.yyt-flow-heading
│   └── form controls
│       ├── 世界书: div.yyt-worldbook-select (透明无框)
│       │   └── worldbook-item × N (border-top hairline 分隔)
│       └── 手动操作: div.yyt-tool-manual-area (单列 flex)
│           ├── div.yyt-tool-runtime-card (透明无框, inline 行)
│           └── div.yyt-tool-manual-actions
├── div.yyt-panel-footer
└── div.yyt-tool-macro-hint (纯文本, 无框)
```

### 样式特征

- ✅ hero 区 transparent + border-bottom
- ✅ worldbook-select: 透明无框
- ✅ worldbook-item: border-top hairline 行
- ✅ runtime-card: 透明无框，inline 行排列
- ✅ manual-area: 单列 flex
- ✅ macro-hint: 纯文本
- ✅ checkbox-label: 无 bordered tile
- ✅ preview-message-item: border-top hairline 行

### 待实施：HTML 结构重构

> 预览文件: `D:\Projects\yyt-style-preview\tool-config-refactor.html`（已确认）

#### 已确认的改动

1. **Hero 区重组**: 将"立即执行"和"保存配置"按钮移入 hero，删除 `manual-actions` 和 `panel-footer`。Hero sticky 滚动压缩：未滚动 = 完整态（名+描述+chip+按钮），滚动 = 压缩态（名+按钮）
2. **删除自动触发区**: 选择"额外 AI 模型解析"即视为自动工具，稳定/冷却时间移到全局设置
3. **新建"绑定区"**: 合并 输出模式 + API 预设 + Ai 指令预设（去掉 checkbox，直接 select） + 世界书注入，各功能块之间用 dashed divider 分隔
4. **新建"配置区"**: 合并 模板修改框 + 提取配置（测试提取按钮与最大消息数同行居中对齐），两个子分区各有副标题+描述
5. **删除宏提示框**: macro-hint 移除，宏说明在模板 hint 中覆盖
6. **runtime 概览**: 改为 hero 下方 inline 行（状态/最近运行/成功失败）

#### 目标布局

```
yyt-tool-panel
├── hero (sticky, 滚动时压缩)
│   ├── 工具名 + 描述
│   ├── chips (模式/预设/状态)
│   └── 按钮: 保存配置 + 立即执行一次
├── runtime 状态概览 (inline 行)
├── 绑定区 (flow-section)
│   ├── 输出模式 select ── dashed divider
│   ├── API 预设 select ── dashed divider
│   ├── Ai 指令预设 select (无开关) ── dashed divider
│   └── 世界书注入 (待重构)
├── 配置区 (flow-section)
│   ├── 副标题: 提示词模板
│   │   └── textarea + 宏 hint + 重置按钮
│   ├── dashed divider
│   └── 副标题: 提取配置
│       ├── 最大消息数 input + 测试提取按钮 (同行)
│       └── 标签/正则 textarea
└── (无 footer, 无 macro-hint)
```

#### 待讨论的功能点

**A. 世界书注入模块重构**
- 当前缺陷: 不能快捷取消、不能选择条目（整本注入）、无批量操作、无预设化
- 方案待定: 预设化 / 直接增强 / 混合

**B. 多标签提取 + 写回冲突**
- 根因: 多标签写回时替换范围互相干扰
- 方案待定: 只写回第一个标签 / 标记主写回标签 / 追加模式 / 分标签写回

---

## 5. API Preset Panel (API预设面板)

**组件文件**: `modules/ui/components/api-preset-panel.js`

### 布局结构

```
div.yyt-api-manager (flex, column, height:100%)
├── div.yyt-flow-section (预设选择)
│   ├── div.yyt-flow-heading
│   ├── div.yyt-preset-selector (custom dropdown + 加载按钮)
│   └── div.yyt-preset-list-compact
│       └── div.yyt-preset-item × N (border-top hairline 行)
├── div.yyt-flow-section (API配置)
│   ├── div.yyt-flow-heading (含"保存为预设"按钮)
│   └── form controls (toggles + inputs)
└── div.yyt-panel-footer (导入/导出/重置/保存)
```

### 样式特征

- ✅ 无多余 `.yyt-panel` wrapper（已移除）
- ✅ flow-section + flow-heading 结构
- ✅ preset-item: 透明 + border-top hairline 行
- ✅ panel-footer 标准

---

## 6. Regex Extract Panel (正则提取面板)

**组件文件**: `modules/ui/components/regex-extract-panel.js`

### 布局结构

```
div.yyt-regex-panel (flex, column, gap:0)
├── div.yyt-flow-section (规则编辑器)
│   ├── div.yyt-flow-heading (含"查看示例"按钮)
│   └── div.yyt-tag-rules-editor
│       ├── 预设 select + 加载/保存按钮
│       ├── div.yyt-rules-list (直接在 section 内)
│       │   └── div.yyt-rule-item × N (border-top 分隔)
│       ├── 操作按钮行
│       └── 黑名单 input
├── div.yyt-flow-section (测试)
│   ├── div.yyt-flow-heading
│   ├── 测试文本 textarea (直接在 section 内)
│   ├── 操作按钮
│   └── 结果区
├── div.yyt-panel-footer
└── div#tag-suggestions-container (hidden)
    └── div.yyt-tag-suggestions (透明无框)
```

### 样式特征

- ✅ 根容器 gap:0
- ✅ 无 `.yyt-list-table` 多余 wrapper（已移除）
- ✅ 无 `.yyt-test-section` 多余 wrapper（已移除）
- ✅ tag-suggestions: 透明无框
- ✅ rule-item 用 border-top 分隔

---

## 7. Bypass Panel (Ai指令预设面板)

**组件文件**: `modules/ui/components/bypass-panel.js`

### 布局结构

```
div.yyt-bypass-panel (flex 水平, height:100%, gap:0)
├── aside.yyt-bypass-sidebar (width:220px, bg:surface-2, border-right hairline)
│   ├── header (标题 + 新建按钮)
│   ├── div.yyt-bypass-preset-list (flex:1, overflow-y:auto)
│   │   └── div.yyt-bypass-preset-item × N (border-top hairline 行)
│   └── footer (导入/导出)
└── div.yyt-bypass-editor (flex:1, transparent, no radius)
    └── editor-content
        ├── header (名称 input + 操作按钮)
        ├── 描述 input
        ├── 消息列表头 + "添加消息"
        ├── div.yyt-bypass-messages (scrollable)
        │   └── div.yyt-bypass-message × N (border-top, transparent)
        └── footer (保存)
```

### 样式特征

- ✅ sidebar: border-right hairline 分隔（非独立大圆角卡片）
- ✅ editor: transparent + no radius
- ✅ preset-item: border-top hairline 行
- ✅ bypass-message: transparent bg + border-top 分隔
- ✅ gap:0

---

## 8. Logger Panel (日志面板)

**组件文件**: `modules/ui/components/logger-panel.js`

### 布局结构

```
div.yyt-logger-panel (flex, column, height:100%, gap:0)
├── div.yyt-logger-toolbar (flex, wrap, border-bottom hairline)
│   ├── filter buttons × 5
│   ├── search input
│   └── action buttons (自动滚动/暂停/清除/导出)
├── div.yyt-logger-stats (flex, gap:14px, 11px text)
└── div.yyt-logger-list (flex:1, transparent, border-top hairline)
    └── div.yyt-log-entry × N (grid 4col, border-bottom)
```

### 样式特征

- ✅ toolbar: border-bottom hairline 分隔
- ✅ log-list: 透明 + border-top
- ✅ log-entry 用 border-bottom 分隔
- ✅ 根容器 gap:0

---

## 全局合规总结

| 面板 | 合规度 | 备注 |
|------|--------|------|
| Shell Frame | ✅ | content-frame 扁平化完成, sidebar 精简 |
| Settings | ✅ | tabs 容器有 bg+border (可接受) |
| Tool Manage | ✅ | 基本合规 |
| Tool Config | ✅ | worldbook/runtime/macro-hint 全部扁平化 |
| API Preset | ✅ | 去掉 .yyt-panel wrapper, preset-item 扁平化 |
| Regex Extract | ✅ | 去掉多余 wrapper, gap:0, suggestions 扁平化 |
| Bypass | ✅ | sidebar/editor/preset-item 全部扁平化 |
| Logger | ✅ | toolbar hairline + log-list 扁平化 |

---

## Flat Flow 设计规范

### 核心原则

1. **无 box-in-box**: 容器不嵌套带边框/圆角/背景的容器
2. **hairline 分隔**: 区域之间用 `border-top/border-bottom: 1px solid var(--yyt-border)` 分隔
3. **透明背景**: 内部容器默认 `background: transparent`
4. **列表行**: list-item/preset-item 用 `border-top` hairline 行，非独立 rounded 卡片
5. **单列流**: 面板内容以单列纵向排列为主，避免 grid 多列布局
6. **最小 wrapper**: 不使用无意义的 wrapper div

### Surface 梯度

```
#0a0d13 (canvas) → #0f1219 (surface) → #151a24 (surface-2) → #1c2231 (surface-3) → #232b3e (surface-4)
```

### 圆角层级

| 层级 | 值 | 用途 |
|------|-----|------|
| popup 外壳 | 12px | 仅弹窗本身 |
| 控件 | 6px | input/select/button |
| 小元素 | 4px | chip/badge |

### 三文件同步

CSS 变更需同步到三处：
1. `styles/main.css` — 主样式表
2. `modules/app/bootstrap.js:getBaseStyles()` — 回退注入
3. 各组件 `getStyles()` — 组件局部样式

### 用户确认的设计决策

- `yyt-shell-main-header`: 保留完整边框 box（用户认为更直观）
- `yyt-sub-nav-group`: 保留 border + radius（用户认为更直观）
- `yyt-settings-tabs`: 保留 bg + border（tab rail 常见做法）
