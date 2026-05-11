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
