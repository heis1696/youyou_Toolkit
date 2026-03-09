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

   - 修改 `index.js` 源代码
   - 运行 `npm run build` 构建测试
   - 更新相关文档

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
│   ├── storage.js              # 存储管理模块
│   ├── api-connection.js       # API连接管理模块
│   ├── preset-manager.js       # 预设管理模块
│   ├── ui-components.js        # UI组件模块
│   └── regex-extractor.js      # 正则提取模块
├── docs/                       # 文档目录
│   ├── API_DOCUMENTATION.md
│   ├── CONTRIBUTING.md
│   ├── CHANGELOG.md
│   └── EXTENSION_GUIDE.md
├── dist/                       # 构建输出
│   └── bundle.js
└── Reference/                  # 参考资料
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