# TODO

## jsDelivr `@latest` 缓存刷新不可控

**状态**：待解决
**优先级**：低
**影响版本**：v1.0.131+

**问题**：
- `testingcf.jsdelivr.net`（国内 ICP 镜像）的 `@latest` 缓存刷新时间不可控，purge API 只清理主域 `cdn.jsdelivr.net`，testingcf 有独立缓存层
- 即使主域 purge 成功（`status: finished`），testingcf 节点可能仍返回旧版本数小时甚至更久
- 多次连续 purge 会触发限流（`throttled: true`），进一步延长刷新时间

**临时方案**：
- 发布后使用具体 tag 引用：`@v{version}` 而非 `@latest`
- 新 tag 从未被 CDN 缓存过，首次请求直接从 GitHub 拉取，无缓存问题

**可能的解决方向**：
1. **发布后等待 + 重试 purge**：在 release 脚本中加入延迟重试（如 30s / 60s 后再次 purge testingcf）
2. **放弃 testingcf**：改用 `cdn.jsdelivr.net` 或其他国内可用的 CDN 前缀（如 `gcore.jsdelivr.net`）
3. **用户侧绕过**：在插件加载 URL 后加 `?v=版本号` 或 `#版本号` 破坏缓存键（需要宿主环境支持）
4. **GitHub Pages / 自建 CDN**：脱离 jsDelivr 的缓存策略，自行控制刷新

---

## 主题系统模块化：自定义导入导出

**状态**：待做
**优先级**：中
**来源**：UI 重构 v1.0.140 讨论

**目标**：
将主题设计从硬编码配置提升为可模块化管理的系统，支持：
1. **主题导出**：将当前主题 token（surface 阶梯 + accent + 边框 + 控件等）导出为 JSON 文件
2. **主题导入**：导入 JSON 主题文件，校验 token 完整性后应用
3. **自定义主题编辑器**：在设置面板中提供 token 可视化编辑（色板 + 实时预览）
4. **主题共享**：用户可分享/交换主题 JSON

**涉及文件**：
- `modules/ui/components/settings-panel.js`（`THEME_CONFIGS`、`applyTheme()`）
- `styles/main.css`（`:root` 默认值）
- `modules/app/bootstrap.js`（`getBaseStyles()` 回退）

**设计约束**：
- 必须遵守 `docs/UI_STYLE_GUIDE.md` 的 token 体系和命名规范
- 导入主题需校验必要 token 是否齐全（参见 Style Guide §5.2 checklist）
- 自定义主题存储走 `storage-service.js`

---

## UI 交互优化（源自 UI 交互审计）

**状态**：待做
**优先级**：中
**来源**：popup-shell + 7 个面板组件审查

### 当前系统性问题

| 编号 | 问题 | 现状 |
|------|------|------|
| A | 确认对话框碎片化 | 5 种确认范式（`window.confirm`、手写 dialog、共享 `bindDialogEvents`、二次点击、`window.prompt`）混用 |
| B | 无统一 loading 机制 | 3 种 ad-hoc loading 模式散落各组件；tool-config-panel 手动执行/预览按钮无 disable，可重复触发并发 |
| C | Toast 通知滥用 | 低价值操作（切换规则类型、启用/禁用）频繁弹 toast，用户对重要通知脱敏 |
| D | 键盘交互几乎为零 | 无 Escape 关闭 popup/dialog/drawer，无 Ctrl+S 保存 |
| E | Tab 切换无过渡 | jQuery 瞬间替换无动画，异步面板渲染不等待无 loading，切换时重置滚动位置 |
| F | 破坏性操作无确认 | table-workbench 删表/删行/删列、重置提示词模板均为即时操作 |
| G | 验证失败无聚焦回弹 | 验证不通过时弹 toast 但不聚焦到出错输入框 |

### 优化方案

#### Phase 2（基础设施）

**P1 — 统一确认对话框**
- 在 `utils.js` 新增 `showConfirm(title, message, options)` 返回 `Promise<boolean>`
- 使用现有 yyt-dialog 样式，支持 Escape 关闭、click-outside 关闭、danger 变体、focus trap + focus return
- 全局替换所有 `window.confirm()` 和 `window.prompt()`
- **涉及文件**: utils.js + 7 个面板组件 | **工作量**: 中

**P2 — 异步操作 loading 工具函数**
- 在 `utils.js` 新增 `withButtonLoading($btn, asyncFn, loadingText?)`
- 禁用按钮 → 执行 → finally 恢复，防重入
- 应用到 tool-config-panel-factory 手动执行/预览按钮、table-workbench 填表按钮、bypass-panel 导入按钮
- **涉及文件**: utils.js + 4 个面板 | **工作量**: 小

#### Phase 3（交互打磨）

**P3 — Escape 关闭 + Ctrl+S 保存**
- popup-shell 注册全局 `keydown`：Escape 关闭 popup（无 dialog 时）
- `bindDialogEvents` + table-workbench drawer 加 Escape 关闭
- Ctrl+S 在 popup-shell 层级 dispatch 到当前面板 `onSave()`
- **涉及文件**: popup-shell.js, utils.js, table-workbench-panel.js | **工作量**: 中

**P4 — Toast 精简与分级**
- 保存/创建/删除成功 → `success` 2s；失败 → `error` 4s
- 加载预设/配置切换/规则切换 → 不弹 toast，靠 UI 状态变化体现
- AI 调用结果 → `showTopNotice` 带 noticeId 去重
- **工作量**: 小

#### Phase 4（体验提升）

**P5 — 验证失败聚焦回弹**
- 所有验证失败路径在 toast 后 `$input.focus().select()`
- settings-panel 数值输入加 inline error（边框变红 + 显示允许范围）
- **涉及文件**: tool-manage-panel, bypass-panel, regex-extract-panel, settings-panel | **工作量**: 小

**P6 — 破坏性操作加确认**（依赖 P1）
- 删表/删列 → `showConfirm` danger；删行 → 行数 > 3 时确认
- 轻量级删除（单条规则/消息）考虑 inline undo 模式
- **工作量**: 中

**P7 — Tab 切换体验优化**
- 轻过渡：CSS `yytSlideUp 0.2s ease-out` 在 JS 切换路径中触发
- 记忆滚动位置：`uiState.scrollPositions[tabKey]`
- 异步面板 loading skeleton
- **工作量**: 中

**P8 — Dialog 系统补完**
- 统一 `bindDialogEvents` + 手写 dialog：Escape 关闭、focus trap、`aria-modal`、focus return、body scroll lock
- **工作量**: 中

### 不建议现阶段做的

| 项目 | 原因 |
|------|------|
| 完整 undo/redo 系统 | 架构开销过大，P6 的 inline undo 足够 |
| 国际化 (i18n) | 目标用户群稳定，不值得引入翻译框架 |
| Drag-and-drop 排序 | 现有 move-up/down 按钮够用，DnD 引入复杂度 |
| Virtual scroll 大列表 | 当前列表规模不会超过 100 项 |
