# YouYou Toolkit - SillyTavern 工具插件

一个轻量级的 SillyTavern 工具插件框架，支持API连接管理、预设管理与正则提取功能。

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
- ✅ 美观的滑动开关切换主API

### 🆕 预设管理
- ✅ 创建、编辑、删除API预设
- ✅ 快速切换不同预设配置
- ✅ 预设导入/导出（JSON格式）
- ✅ 从当前配置快速创建预设
- ✅ 预设与API配置合并显示，操作更便捷

### 🆕 正则提取
- ✅ 从消息内容中提取特定文本
- ✅ 正则表达式测试与验证
- ✅ 内置常用正则模板（JSON提取、代码块、思考标签等）
- ✅ 自定义正则模板管理
- ✅ 生成STScript脚本用于实际提取
- ✅ 支持多种消息源（最后消息、角色消息、用户消息等）
- ✅ 模板导入/导出

### 🆕 v0.5 新功能

#### 设置服务
- ✅ 统一全局配置管理
- ✅ 执行器设置（并发数、重试次数、超时时间、队列策略）
- ✅ 监听器设置（事件监听、过滤规则、防抖设置）
- ✅ 调试设置（日志、执行历史、状态徽章）
- ✅ UI设置（主题、紧凑模式、动画效果）

#### 变量解析服务
- ✅ 模板变量替换 `{{variableName}}`
- ✅ 内置变量支持：`lastUserMessage`、`lastAiMessage`、`chatHistory`、`characterCard`、`toolName`、`injectedContext`
- ✅ 正则提取变量 `{{regex.xxx}}`
- ✅ 自定义变量注册

#### 上下文注入服务
- ✅ 按聊天隔离存储工具输出
- ✅ 聚合上下文输出
- ✅ 覆盖/追加模式支持
- ✅ 上下文导入/导出

#### 工具提示词服务
- ✅ 提示词段落结构转API消息
- ✅ 变量替换集成
- ✅ 破限词消息合并
- ✅ 提示词模板管理

#### 破限词管理
- ✅ 破限词预设CRUD
- ✅ 消息列表管理（role、content、enabled）
- ✅ 默认预设设置
- ✅ 预设导入/导出
- ✅ 工具绑定支持

#### 工具输出模式
- ✅ inline 模式 - 随AI输出直接注入上下文
- ✅ post_response_api 模式 - 额外AI模型解析后注入

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

### API配置与预设管理

1. 点击 **"API管理"** 标签页进入统一管理面板
2. **预设选择区**：
   - 从下拉框选择预设，点击"应用"切换配置
   - 点击预设项的下载图标可加载预设配置到表单
   - 点击删除图标可删除预设
3. **API配置区**：
   - 使用滑动开关切换"使用SillyTavern主API"
   - 不使用主API时，填写自定义API配置
   - 点击"获取模型列表"可自动加载可用模型
   - 点击"保存为预设"可将当前配置保存为新预设
4. 点击 **"保存配置"** 按钮保存当前设置

### 正则提取

1. 点击 **"正则提取"** 标签页进入正则管理面板
2. **正则模板区**：
   - 查看和使用内置正则模板（JSON内容、代码块、思考标签等）
   - 点击播放图标使用模板
   - 点击编辑图标修改模板
   - 点击删除图标删除模板
   - 点击"新建"创建自定义模板
3. **正则测试区**：
   - 输入正则表达式
   - 选择标志位（g=全局匹配, i=忽略大小写, m=多行模式）
   - 设置捕获组索引
   - 输入测试文本
   - 点击"测试匹配"查看结果
4. **消息提取区**：
   - 选择消息来源（最后消息、角色消息、用户消息等）
   - 设置保存到的变量名
   - 点击"生成脚本"生成STScript命令
   - 点击"复制脚本"复制到剪贴板

#### 正则提取使用示例

提取最后一条消息中的引号内容：
```
正则表达式: "([^"]+)"
标志位: g
捕获组索引: 1
消息来源: 最后一条消息
```

生成的脚本将类似于：
```
/match pattern="\"([^\"]+)\"" {{lastMessage}} | /setvar key=extracted_content
```

## 📁 项目结构

```
youyou_Toolkit/
├── index.js                      # 主入口文件
├── modules/
│   ├── core/                     # 核心层
│   │   ├── index.js              # 核心模块入口
│   │   ├── event-bus.js          # 事件总线
│   │   └── storage-service.js    # 统一存储服务
│   ├── ui/                       # UI层
│   │   ├── index.js              # UI模块入口
│   │   ├── ui-manager.js         # UI管理器
│   │   ├── utils.js              # UI工具函数
│   │   └── components/           # UI组件目录
│   │       ├── api-preset-panel.js
│   │       ├── regex-extract-panel.js
│   │       ├── summary-tool-panel.js
│   │       ├── status-block-panel.js
│   │       └── tool-manage-panel.js
│   ├── storage.js                # 存储后端抽象
│   ├── api-connection.js         # API连接管理
│   ├── preset-manager.js         # 预设管理
│   ├── regex-extractor.js        # 正则提取
│   ├── tool-registry.js          # 工具注册表
│   ├── tool-executor.js          # 工具执行引擎
│   ├── tool-trigger.js           # 事件触发管理
│   ├── tool-manager.js           # 工具管理
│   ├── window-manager.js         # 窬口管理
│   ├── prompt-editor.js          # 提示词编辑器
│   └── ui-components.js          # UI组件（兼容层）
├── styles/
│   └── main.css                  # 主样式文件
├── docs/
│   ├── ARCHITECTURE_ANALYSIS.md  # 架构文档
│   ├── API_DOCUMENTATION.md      # API文档
│   ├── EXTENSION_GUIDE.md        # 扩展指南
│   ├── CONTRIBUTING.md           # 贡献指南
│   └── CHANGELOG.md              # 更新日志
└── Reference/                    # 参考文档
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
YouYouToolkit.switchPage('api')    // 切换到API管理页
YouYouToolkit.switchPage('regex')  // 切换到正则提取页

// API配置（异步方法）
await YouYouToolkit.getApiConfig()     // 获取当前API配置
await YouYouToolkit.saveApiConfig(config)  // 保存API配置
await YouYouToolkit.testApiConnection()    // 测试API连接
await YouYouToolkit.sendApiRequest(messages, options)  // 发送API请求

// 预设管理（异步方法）
await YouYouToolkit.getPresets()  // 获取所有预设

// 正则提取（通过模块访问）
const regexModule = YouYouToolkit.getRegexExtractor();
await regexModule.testRegex(pattern, text, flags, groupIndex);  // 测试正则
await regexModule.getAllTemplates();     // 获取所有模板
await regexModule.createTemplate({...}); // 创建模板
await regexModule.generateExtractionScript(templateId, source, varName); // 生成提取脚本
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

#### 核心层 (modules/core/)

**event-bus.js - 事件总线**
- 模块间松耦合通信
- 支持优先级订阅
- 一次性订阅、事件等待
- 调试模式和历史记录

**storage-service.js - 统一存储服务**
- 命名空间隔离的存储接口
- 支持SillyTavern extensionSettings和localStorage双后端
- 预定义的存储实例：storage、toolStorage、presetStorage、windowStorage

#### 服务层 (modules/)

**api-connection.js - API连接管理**
- 支持自定义API和SillyTavern主API切换
- OpenAI格式的请求发送
- 模型列表获取
- 连接测试

**preset-manager.js - 预设管理**
- API预设的CRUD操作
- 预设导入/导出
- 预设切换和验证

**regex-extractor.js - 正则提取**
- 正则表达式测试与验证
- 正则模板管理
- STScript脚本生成
- 多种消息源支持

**tool-registry.js - 工具注册表**
- 工具动态注册与注销
- 工具-API预设绑定
- 工具配置管理

**tool-executor.js - 工具执行引擎**
- 任务队列调度
- 并发控制（默认3个并发）
- 自动重试机制
- AbortController支持

**window-manager.js - 窗口管理**
- 独立浮动窗口创建
- 拖拽移动、八方向调整大小
- 最大化/还原
- 窗口状态持久化

**prompt-editor.js - 提示词编辑器**
- 三段式可视化编辑（System/AI/User）
- 展开/折叠
- 导入/导出
- 消息格式转换

#### UI层 (modules/ui/)

**ui-manager.js - UI管理器**
- 组件注册与生命周期管理
- 统一样式注入
- 标签页切换

**components/ - UI组件**
- `api-preset-panel.js` - API预设管理面板
- `regex-extract-panel.js` - 正则提取面板
- `summary-tool-panel.js` - 摘要工具面板
- `status-block-panel.js` - 状态栏工具面板
- `tool-manage-panel.js` - 工具管理面板

## 📚 文档

- [API 文档](./docs/API_DOCUMENTATION.md) - 详细的 API 参考
- [贡献指南](./docs/CONTRIBUTING.md) - 如何参与项目开发
- [更新日志](./docs/CHANGELOG.md) - 版本更新记录
- [扩展开发指南](./docs/EXTENSION_GUIDE.md) - 基于框架开发新功能

## 📝 版本历史

### v0.6.0 (2026-03-15)
- 🔧 **简化重构** - 收敛工具配置，删除过度设计
- 🔧 **工具配置简化** - 删除 `prompt.segments` 复杂结构，改为单字段 `promptTemplate`
- 🔧 **输出模式重命名** - `inline` → `follow_ai`，避免语义歧义
- 🔧 **工具提示词服务简化** - 改为单模板 + AI回复附加的处理方式
- 🔧 **UI组件优化** - 摘要工具面板简化，新增调试信息折叠区
- 📝 更新所有文档反映 v0.6 简化重构

### v0.5.0 (2026-03-14)
- ✨ **设置服务** - 统一全局配置管理
- ✨ **变量解析服务** - 模板变量替换与上下文注入
- ✨ **上下文注入服务** - 按聊天隔离存储工具输出
- ✨ **工具提示词服务** - 提示词段落结构转API消息
- ✨ **破限词管理** - 破限词预设CRUD与工具绑定
- ✨ **工具输出服务** - 支持 follow_ai 和 post_response_api 模式
- ✨ **UI组件** - 设置面板、破限词面板
- 📝 更新架构文档和API文档

### v0.4.0 (2026-03-11)
- �️ **架构重构** - 采用分层架构设计（核心层/服务层/UI层）
- ✨ **核心层新增**
  - `event-bus.js` - 事件总线，模块间松耦合通信
  - `storage-service.js` - 统一存储服务，命名空间隔离
- ✨ **服务层新增**
  - `tool-registry.js` - 工具注册表
  - `tool-executor.js` - 工具执行引擎（任务调度、并发控制）
  - `window-manager.js` - 独立窗口系统（拖拽、调整大小、最大化）
  - `prompt-editor.js` - 提示词可视化编辑器
- ✨ **UI层重构**
  - `ui-manager.js` - UI管理器
  - 组件化拆分：API预设面板、正则提取面板、摘要工具面板、状态栏面板、工具管理面板
- 🔧 入口优化，index.js 简化为模块协调器
- 📝 更新架构文档和API文档

### v0.3.0 (2025-03-09)
- 🆕 新增正则提取板块
- 🆕 支持正则表达式测试与验证
- �🆕 内置常用正则模板（JSON提取、代码块、思考标签等）
- 🆕 支持自定义正则模板管理
- 🆕 生成STScript脚本用于实际内容提取
- 🆕 支持多种消息源（最后消息、角色消息、用户消息等）
- 🆕 模板导入/导出功能

### v0.2.1 (2024-03-09)
- 🎨 合并API配置和预设管理面板，简化操作
- 🎨 改进Toggle开关样式，添加滑动动画和发光效果
- 🎨 改进下拉框UI，统一输入框样式
- 🐛 修复新预设编辑报错问题
- 🐛 修复模型选择器宽度变短问题
- 🔧 移除连接测试功能

### v0.2.0 (2024-03-09)
- 🆕 新增API连接管理功能
- 🆕 新增预设管理功能
- 🆕 支持自定义API配置
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