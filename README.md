# YouYou Toolkit - SillyTavern 工具插件

一个轻量级的 SillyTavern 工具插件框架，支持API连接管理与预设管理功能。

## ✨ 功能特点

### 基础功能
- ✅ 在 SillyTavern 底部魔棒区注册插件入口
- ✅ 点击后弹出独立窗口
- ✅ 支持 ES Module 方式导入
- ✅ 模块化设计，易于扩展

### 🆕 API连接管理
- ✅ 支持自定义API配置（URL、API Key、模型等）
- ✅ 支持切换使用SillyTavern主API
- ✅ 支持从API端点自动加载模型列表
- ✅ 支持API连接测试
- ✅ 支持发送测试请求验证配置

### 🆕 预设管理
- ✅ 创建、编辑、删除API预设
- ✅ 快速切换不同预设配置
- ✅ 预设导入/导出（JSON格式）
- ✅ 从当前配置快速创建预设
- ✅ 预设复制/重命名

## 📦 安装方法

### 方法一：通过酒馆助手脚本库导入（推荐）

在酒馆助手的脚本库中添加以下代码：

```javascript
import 'https://testingcf.jsdelivr.net/gh/heis1696/youyou_Toolkit@main/dist/bundle.js'
```

### 方法二：作为 Tampermonkey 脚本安装

1. 安装 Tampermonkey 浏览器扩展
2. 创建新脚本，添加以下头部信息：

```javascript
// ==UserScript==
// @name         YouYou Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @match        */*
// @grant        none
// ==/UserScript==
```

3. 将 `dist/bundle.js` 的内容复制粘贴进去
4. 保存并启用脚本

### 方法三：本地开发

1. 克隆或下载本项目
2. 安装依赖：`npm install`
3. 构建：`npm run build`
4. 在酒馆助手脚本库中导入本地地址

## 🚀 使用方法

1. 打开 SillyTavern
2. 点击底部的 **魔棒图标** (🪄)
3. 在弹出的菜单中找到 **"YouYou 工具箱"**
4. 点击打开工具窗口

### API配置

1. 点击 **"API管理"** 标签页
2. 在 **"API配置"** 面板中：
   - 勾选"使用SillyTavern主API"将使用酒馆内置API
   - 不勾选时，填写自定义API配置
3. 点击 **"保存配置"** 按钮

### 预设管理

1. 在 **"预设管理"** 标签页中
2. 点击 **"从当前配置创建"** 保存当前API设置为预设
3. 点击预设项右侧的按钮可以激活、编辑、复制、删除预设

### 连接测试

1. 在 **"连接测试"** 标签页中
2. 选择要测试的配置（当前配置或预设）
3. 点击 **"测试连接"** 验证API是否可用
4. 点击 **"运行测试"** 发送实际请求

## 📁 项目结构

```
youyou_Toolkit/
├── index.js                    # 主入口文件
├── modules/
│   ├── storage.js              # 存储管理模块
│   ├── api-connection.js       # API连接管理模块
│   ├── preset-manager.js       # 预设管理模块
│   └── ui-components.js        # UI组件模块
├── dist/
│   └── bundle.js               # 构建输出
├── docs/
│   ├── API_DOCUMENTATION.md    # API文档
│   ├── EXTENSION_GUIDE.md      # 扩展指南
│   ├── CONTRIBUTING.md         # 贡献指南
│   └── CHANGELOG.md            # 更新日志
└── Reference/
    └── shujuku-main/           # 参考项目
```

## 🔧 开发指南

### API 接口

插件导出了以下 API 供外部调用：

```javascript
// 获取版本信息
YouYouToolkit.version    // 版本号
YouYouToolkit.id         // 插件ID

// 弹窗控制
YouYouToolkit.openPopup()   // 打开弹窗
YouYouToolkit.closePopup()  // 关闭弹窗
YouYouToolkit.switchPage('api')  // 切换到API管理页

// API配置（异步方法）
await YouYouToolkit.getApiConfig()     // 获取当前API配置
await YouYouToolkit.saveApiConfig(config)  // 保存API配置
await YouYouToolkit.testApiConnection()    // 测试API连接
await YouYouToolkit.sendApiRequest(messages, options)  // 发送API请求

// 预设管理（异步方法）
await YouYouToolkit.getPresets()  // 获取所有预设
```

### 构建打包

```bash
# 安装依赖
npm install

# 构建（生成压缩后的 ESM 格式）
npm run build

# 其他构建命令：
npm run build:dev  # 开发模式（不压缩）
npm run build:iife # 生成 IIFE 格式
npm run watch      # 监听文件变化自动构建
```

### 模块说明

#### storage.js - 存储管理模块
- 管理设置的持久化存储
- 优先使用SillyTavern的extensionSettings
- 回退到localStorage
- 支持深度合并设置

#### api-connection.js - API连接管理模块
- 管理API配置
- 发送API请求
- 支持主API和自定义API
- 获取模型列表
- 测试API连接

#### preset-manager.js - 预设管理模块
- 创建/更新/删除预设
- 切换预设
- 导入/导出预设
- 预设验证

#### ui-components.js - UI组件模块
- Tab导航
- API配置表单
- 预设列表
- 测试面板
- 事件绑定

## 📚 文档

- [API 文档](./docs/API_DOCUMENTATION.md) - 详细的 API 参考
- [贡献指南](./docs/CONTRIBUTING.md) - 如何参与项目开发
- [更新日志](./docs/CHANGELOG.md) - 版本更新记录
- [扩展开发指南](./docs/EXTENSION_GUIDE.md) - 基于框架开发新功能

## 📝 版本历史

### v0.2.0 (2024-03-09)
- 🆕 新增API连接管理功能
- 🆕 新增预设管理功能
- 🆕 支持自定义API配置
- 🆕 支持API连接测试
- 🆕 支持预设导入/导出
- 🔧 模块化重构

### v0.1.0 (2024-03-09)
- 初始版本
- 实现魔棒区菜单项注册
- 实现基础弹窗框架
- 支持 ES Module 导入方式

## 📄 许可证

MIT License

## 👤 作者

YouYou

## 🙏 致谢

本项目参考了 [shujuku-main](./Reference/shujuku-main/) 项目的实现方式。