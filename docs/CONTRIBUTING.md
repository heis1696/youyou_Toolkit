# 贡献指南

感谢你考虑为 YouYou Toolkit 做出贡献！

## 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议，请：

1. 在 [GitHub Issues](https://github.com/heis1696/youyou_Toolkit/issues) 中搜索是否已有相关 issue
2. 如果没有，创建一个新的 issue，包含：
   - 清晰的标题
   - 问题描述
   - 复现步骤（如果是 bug）
   - 期望行为
   - 实际行为
   - 环境信息（SillyTavern 版本、浏览器等）

### 提交代码

1. **Fork 仓库**

   点击右上角的 Fork 按钮

2. **克隆你的 Fork**

   ```bash
   git clone https://github.com/你的用户名/youyou_Toolkit.git
   cd youyou_Toolkit
   ```

3. **创建分支**

   ```bash
   git checkout -b feature/你的功能名称
   # 或
   git checkout -b fix/你修复的问题
   ```

4. **安装依赖**

   ```bash
   npm install
   ```

5. **进行修改**

   - 修改对应模块源码（如 `modules/app/*`、`modules/ui/*`、`modules/tool-*` 等）
   - 运行 `npm run build` 构建测试
   - 更新相关文档（至少同步 `README.md`、`docs/API_DOCUMENTATION.md`、`docs/CHANGELOG.md`；若涉及施工演进，也同步 `docs/OPTIMIZATION_PROGRESS.md`）
   - 如果修改的是 compatibility / legacy 模块，请明确说明它是否仍属于启动期主路径

6. **提交更改**

   ```bash
   git add .
   git commit -m "描述你的更改"
   ```

   提交信息格式：
   - `feat: 添加新功能`
   - `fix: 修复 bug`
   - `docs: 文档更新`
   - `style: 代码格式调整`
   - `refactor: 代码重构`
   - `test: 测试相关`
   - `chore: 构建/工具相关`

7. **推送到你的 Fork**

   ```bash
   git push origin feature/你的功能名称
   ```

8. **创建 Pull Request**

   在 GitHub 上创建 PR，描述你的更改

---

## 开发指南

### 代码风格

- 使用 2 空格缩进
- 使用分号
- 函数和变量使用驼峰命名
- 常量使用大写下划线命名

### 目录结构

```
youyou_Toolkit/
├── index.js                    # 主入口文件
├── package.json                # 项目配置
├── README.md                   # 项目说明
├── modules/                    # 模块目录
│   ├── core/                   # 核心层
│   │   ├── event-bus.js        # 事件总线
│   │   ├── storage-service.js  # 存储服务
│   │   └── index.js            # 核心模块入口
│   ├── app/                    # 应用装配层
│   │   ├── bootstrap.js        # 启动、样式、菜单注册
│   │   ├── popup-shell.js      # 主工具箱弹窗与路由
│   │   └── public-api.js       # 对外 API 门面
│   ├── ui/                     # UI层
│   │   ├── index.js            # UI模块入口
│   │   ├── ui-manager.js       # UI生命周期与样式聚合管理器
│   │   ├── utils.js            # 工具函数
│   │   └── components/         # UI组件
│   │       ├── api-preset-panel.js
│   │       ├── bypass-panel.js
│   │       ├── regex-extract-panel.js
│   │       ├── tool-config-panel-factory.js
│   │       ├── summary-tool-panel.js
│   │       ├── status-block-panel.js
│   │       ├── tool-manage-panel.js
│   │       └── youyou-review-panel.js
│   ├── storage.js              # 存储管理
│   ├── api-connection.js       # API连接
│   ├── preset-manager.js       # 预设管理
│   ├── regex-extractor.js      # 规则/标签提取
│   ├── tool-manager.js         # 工具管理
│   ├── tool-executor.js        # 调度/兼容执行
│   ├── tool-trigger.js         # 事件触发
│   ├── tool-output-service.js  # 自动工具链直接执行层
│   ├── tool-prompt-service.js  # 工具提示词构建
│   ├── context-injector.js     # 最新楼层写回
│   ├── variable-resolver.js    # 变量解析
│   ├── tool-registry.js        # 工具注册
│   ├── bypass-manager.js       # 破限词管理
│   ├── window-manager.js       # 独立窗口扩展能力
│   ├── prompt-editor.js        # 兼容提示词编辑器
│   └── ui-components.js        # UI组件（兼容层）
├── styles/
│   └── main.css                # 主样式文件
├── docs/                       # 文档目录
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE_ANALYSIS.md
│   ├── CHANGELOG.md
│   ├── CONTRIBUTING.md
│   └── EXTENSION_GUIDE.md
├── Reference/                  # 参考资料
└── dist/                       # 构建输出
    └── bundle.js
```

### 本地测试

1. 构建项目

   ```bash
   npm run build
   ```

2. 启动本地服务器（可选）

   ```bash
   npx serve .
   ```

3. 在 SillyTavern 中测试

   ```javascript
   import 'http://localhost:3000/dist/bundle.js'
   ```

### 文档更新

如果你修改了功能，请同步更新：

- `README.md` - 用户使用说明
- `docs/API_DOCUMENTATION.md` - API 文档
- `docs/CHANGELOG.md` - 更新日志

如果你修改的是架构边界、分阶段施工状态或优化计划，请继续同步：

- `docs/OPTIMIZATION_PROGRESS.md`
- `docs/OPTIMIZATION_EXECUTION_PLAN.md`
- `docs/ARCHITECTURE_ANALYSIS.md`（若涉及架构结论变化）

如果你修改的是自动触发链、宿主实机回归口径或诊断字段，请继续同步：

- `docs/HOST_REGRESSION_CHECKLIST.md`
- `docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`

如果你修改的是“代码瘦身 / 主路径减载 / compatibility 收口”，请继续同步：

- `docs/CODEBASE_DIET_PLAN.md`

如果你确认某份文档已经完成历史使命、且不再服务当前仓库主线，请在删除前先检查：

- 是否仍被 `README.md` 或其他正式文档引用
- 是否仍承载当前阶段的运维/验收信息
- 删除动作是否需要登记到 `docs/CHANGELOG.md`

### compatibility 模块修改约束

以下模块当前默认视为 compatibility / legacy 能力，而不是新功能首选入口：

- `modules/ui-components.js`
- `modules/prompt-editor.js`
- `modules/storage.js`
- `modules/tool-executor.js` 中的 legacy 执行函数

对这些模块做修改时，请优先回答三件事：

1. 这次修改是否会把 compatibility 能力重新带回启动期主路径？
2. 是否应该改为按需加载，而不是继续默认常驻？
3. 是否需要同步更新 `docs/API_DOCUMENTATION.md` 与 `docs/CODEBASE_DIET_PLAN.md`？

---

## 行为准则

- 尊重所有贡献者
- 接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员保持友好和包容

---

## 联系方式

- GitHub Issues: https://github.com/heis1696/youyou_Toolkit/issues
- GitHub Discussions: https://github.com/heis1696/youyou_Toolkit/discussions

---

再次感谢你的贡献！