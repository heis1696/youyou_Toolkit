# UI 交互审计报告与优化方案

> 审计范围：popup-shell、7 个面板组件、共享 UI 工具层  
> 参考基准：Linear / Raycast / Cursor / Superhuman 交互范式

---

## 一、发现的 Bug（需立即修复）

### BUG-1 ❗ table-workbench-panel.js CSS 模板字面量吞掉了 `log` 变量

**文件**: `modules/ui/components/table-workbench-panel.js:26-28`

```js
const CSS = `${TOOL_CONFIG_PANEL_STYLES} ${getPopupMenuStyles()}
                          // ← 这里缺少闭合反引号
const log = logger.createScope('TableWorkbench');  // ← 被当成 CSS 字符串的一部分
```

`const log` 声明被模板字面量吞掉，实际上是 CSS 字符串内容而非 JS 变量。后续 `bindEvents` 中所有 `log.debug(...)` 调用 (lines 1022-1026, 1380-1387) 在运行时会抛出 `ReferenceError: log is not defined`。

**修复**: 在 line 26 末尾加上 `` ` `` 闭合，line 28 前另起 `const log`。

### BUG-2 ❗ ui/index.js `panelErrorHtml` 调用了未导入的 `escapeHtml`

**文件**: `modules/ui/index.js:50-52`

```js
function panelErrorHtml(message, error = null) {
  const detail = error?.message ? `：${escapeHtml(error.message)}` : '';
  //                                   ^^^^^^^^^ 未导入
```

`escapeHtml` 来自 `./utils.js`，但 `index.js` 只有 `export * from './utils.js'` 而无 `import`。当面板渲染失败走到这个 error path 时，`escapeHtml` 本身会抛 `ReferenceError`，把原始错误吞掉。

**修复**: 在文件顶部加 `import { escapeHtml } from './utils.js';`。

### BUG-3 ⚠️ bypass-panel.js `_selectPreset` 渲染编辑器后未重新增强 select

**文件**: `modules/ui/components/bypass-panel.js:402-412`

`_selectPreset` 通过 `.html()` 替换编辑器 DOM，但不调用 `enhanceNativeSelects()`。新渲染的 role select 保持原生外观且可能与自定义下拉控件的值不同步。

### BUG-4 ⚠️ bypass-panel.js 保存时 `deletable` 硬编码为 `true`

**文件**: `modules/ui/components/bypass-panel.js:463`

所有消息保存时 `deletable` 被写死为 `true`，内置不可删除的消息经过一次保存后变成可删除，破坏数据完整性。

---

## 二、系统性交互问题

### 问题 A：确认对话框碎片化

**现状**:
- **7 处**使用 `window.confirm()` (原生浏览器弹窗，不可主题化)
- **2 处**使用手写 dialog HTML (api-preset-panel, tool-manage-panel)
- **2 处**使用共享 `createDialogHtml` + `bindDialogEvents` (regex-extract-panel, local-transform)
- **2 处**使用二次点击确认模式 (table-workbench 的 template apply/delete)
- **1 处**使用 `window.prompt()` (table-workbench 的 template name)

**问题**: 同一个产品中混用 5 种确认范式，用户体验不连贯。原生 `confirm()`/`prompt()` 无法主题化，在暗色 UI 中违和。

### 问题 B：无统一 loading 状态机制

**现状**: 3 种 ad-hoc loading 模式散落各组件：
1. 按钮 disable + `fa-spin` 图标（regex-extract, api-preset — 各自手写）
2. 按钮文字替换 `'填表中...'`（table-workbench — 无 `finally` 保护，按钮可能永久禁用）
3. 内联文字占位 `'世界书加载中…'`（tool-config-panel, table-workbench）

**问题**: 无共享的 `withLoading(btn, asyncFn)` 工具函数。手动执行和预览提取按钮（tool-config-panel-factory:1090, 1117）完全没有 disable，可被重复点击触发并发执行。

### 问题 C：Toast 通知滥用

**现状**:
- regex-extract-panel：**每次**切换规则类型、每次启用/禁用规则都弹 toast (lines 282, 302)
- api-preset-panel：加载预设时弹超长 toast（含操作指引文字）(line 411)
- 所有组件的 toast 类型选择不一致（同为 "删除成功" 有用 `success` 有用 `info`）

**问题**: 低价值操作反馈过多造成 toast 疲劳，用户对真正重要的 toast 脱敏。

### 问题 D：键盘交互几乎为零

**现状**:
- 整个 popup-shell 无任何 `keydown` 监听
- 无 `Escape` 关闭 popup/dialog/drawer
- 无 `Ctrl+S` 保存快捷键
- dialog 系统 (`bindDialogEvents`) 无 `Escape` 关闭
- table-workbench drawer 无 `Escape` 关闭
- 仅 api-preset-panel 的保存对话框有 `Enter` 提交 (line 793)

### 问题 E：Tab 切换无过渡与 loading 状态

**现状** (popup-shell.js):
- main-tab/sub-tab 切换使用 jQuery `.addClass('active')` 瞬间替换，无过渡
- 异步面板渲染 `renderTabContent` 以 `void` 调用不等待 (line 965)，切换时无 loading 指示
- 切换时 `resetPopupScrollState` 重置所有滚动位置，用户返回某个 tab 时丢失阅读位置

### 问题 F：破坏性操作无确认

**现状**:
- table-workbench：删除表、删除行、删除列均为即时操作无确认 (lines 944, 1050, 1079)
- tool-config-panel：重置提示词模板无确认 (line 1082)
- 这些操作不可撤销

### 问题 G：验证失败无聚焦回弹

**现状**:
- tool-manage-panel: 名称为空时弹 toast 但不聚焦输入框 (line 411)
- bypass-panel: 同样 (line 449)
- regex-extract-panel: 同样 (line 515)
- settings-panel: 数值输入超范围时静默回退默认值，用户不知道输入被丢弃 (lines 564-568)

---

## 三、优化方案（按优先级排序）

### P0 — 修 Bug

| # | 内容 | 文件 | 工作量 |
|---|------|------|--------|
| BUG-1 | 修复 CSS 模板字面量闭合 | table-workbench-panel.js:26 | 1 行 |
| BUG-2 | 导入 `escapeHtml` | ui/index.js | 1 行 |
| BUG-3 | `_selectPreset` 后调 `enhanceNativeSelects` | bypass-panel.js | 3 行 |
| BUG-4 | 保存时保留原始 `deletable` 属性 | bypass-panel.js:463 | 3 行 |

### P1 — 统一确认对话框

**方案**: 在 `utils.js` 新增 `showConfirm(title, message, options)` 返回 `Promise<boolean>`。

```
特性:
- 使用现有 yyt-dialog 样式，自动主题化
- 支持 Escape 关闭（= 取消）
- 支持 click-outside 关闭
- 支持 danger 变体（确认按钮变红）
- focus trap + focus return
```

全局替换所有 `window.confirm()` 和 `window.prompt()` 调用。

**涉及文件**: utils.js + 所有 7 个面板组件  
**工作量**: 中

### P2 — 异步操作 loading 工具函数

**方案**: 在 `utils.js` 新增 `withButtonLoading($btn, asyncFn, loadingText?)`。

```
行为:
1. 禁用按钮，添加 fa-spin 或替换文字
2. 执行 asyncFn
3. finally 中恢复按钮状态（无论成功失败）
4. 防止重入（如果已在 loading 中则直接 return）
```

应用到：
- tool-config-panel-factory 的手动执行 / 预览提取按钮（当前无任何 loading）
- table-workbench 的填表按钮（当前缺少 finally 保护）
- bypass-panel 的导入按钮

**涉及文件**: utils.js + 4 个面板  
**工作量**: 小

### P3 — Escape 关闭 + Ctrl+S 保存

**方案**:

1. **popup-shell**: 在 `openPopup` 时注册一个全局 `keydown` 监听，`Escape` 关闭 popup（如果没有 dialog 打开）
2. **bindDialogEvents**: 添加 `Escape` 关闭
3. **table-workbench drawer**: 添加 `Escape` 关闭
4. **Ctrl+S**: 在 popup-shell 层级捕获，dispatch 到当前活动面板的 save handler（通过组件接口约定 `onSave()` 回调）

**涉及文件**: popup-shell.js, utils.js, table-workbench-panel.js  
**工作量**: 中

### P4 — Toast 精简与分级

**方案**:

| 操作类型 | 反馈方式 |
|----------|----------|
| 保存/创建/删除 成功 | toast `success`，2s |
| 保存/操作 失败 | toast `error`，4s |
| 加载预设/配置切换 | **不弹 toast**，通过 UI 状态变化体现（active 样式、面板内容刷新） |
| 规则类型切换、启用/禁用 | **不弹 toast**，开关/选择器自身状态已足够 |
| 执行结果（AI 调用） | `showTopNotice`，带 noticeId 去重 |
| 破坏性操作前 | confirm dialog（P1） |

具体删除/降级的 toast:
- regex-extract-panel: 删除 lines 282 和 302 的 change toast
- api-preset-panel: line 411 的超长 toast 改为面板内 inline hint
- 所有 `showToast('info', ...)` 用于状态切换的调用 → 移除

**工作量**: 小

### P5 — 验证失败聚焦回弹

**方案**: 所有验证失败路径在 `showToast` 后立即 `$input.focus().select()`。settings-panel 的数值输入增加 inline error 提示（输入框边框变红 + 显示允许范围）。

**涉及文件**: tool-manage-panel, bypass-panel, regex-extract-panel, settings-panel  
**工作量**: 小

### P6 — 破坏性操作加确认

**方案**（依赖 P1 的 `showConfirm`）:

| 操作 | 当前 | 改为 |
|------|------|------|
| 删除表 | 即时删除 | `showConfirm` danger |
| 删除行 | 即时删除 | `showConfirm` danger（行数 > 3 时） |
| 删除列 | 即时删除 | `showConfirm` danger |
| 重置提示词模板 | 即时 + toast | `showConfirm` danger |

轻量级删除（删除单条规则、删除单条消息）可考虑 **inline undo** 模式替代 confirm：操作后 3s 内显示 undo 按钮。

**工作量**: 中

### P7 — Tab 切换体验优化

**方案**:

1. **轻过渡**: tab 切换时对 `.yyt-tab-content.active` 添加 `animation: yytSlideUp 0.2s ease-out`（CSS 已定义但未在 JS 切换路径中触发）
2. **记忆滚动位置**: 切换离开 tab 时保存 `scrollTop` 到 `uiState.scrollPositions[tabKey]`，切换回来时恢复
3. **loading skeleton**: 对于异步加载的面板，先显示轻量 skeleton 占位（3-4 个灰色条纹），面板渲染完成后替换

**工作量**: 中

### P8 — Dialog 系统补完

**方案**: 统一 `bindDialogEvents` + 手写 dialog 为一套：

1. Escape 关闭
2. Focus trap (Tab 在 dialog 内循环)
3. `aria-modal="true"` + `role="dialog"`
4. 关闭时 focus 返回触发元素
5. Body scroll lock (防止背后内容滚动)

**工作量**: 中

---

## 四、不建议现阶段做的

| 项目 | 原因 |
|------|------|
| 完整的 undo/redo 系统 | 架构开销过大，P6 的 inline undo 足够 |
| 国际化 (i18n) | 目标用户群稳定，不值得引入翻译框架 |
| Drag-and-drop 排序 | 现有 move-up/down 按钮够用，DnD 引入复杂度 |
| Virtual scroll 大列表 | 当前列表规模不会超过 100 项 |

---

## 五、执行建议

```
Phase 1 (Bug fix):     BUG-1 ~ BUG-4                → 1 次提交
Phase 2 (Foundation):  P1 (confirm) + P2 (loading)   → 基础设施
Phase 3 (Polish):      P3 (keyboard) + P4 (toast)    → 交互打磨
Phase 4 (UX):          P5 + P6 + P7 + P8             → 体验提升
```
