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
