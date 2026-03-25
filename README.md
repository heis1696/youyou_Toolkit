# YouYou Toolkit - SillyTavern 工具插件

> 当前文档以仓库内现行代码为准；代码基线可理解为 `0.6.2 + Unreleased`。

YouYou Toolkit 现已不只是一个“轻量级工具页”，而是一套运行在 SillyTavern / TavernHelper 宿主环境中的 **可配置工具链平台**。当前版本已经具备：API 预设管理、自定义工具管理、自动触发执行、楼层写回、破限词绑定、提取预览、运行态诊断与统一 UI 装配能力。

## ✨ 功能特点

### 基础功能
- ✅ 在 SillyTavern 底部魔棒区注册插件入口
- ✅ 点击后打开统一的主工具箱弹窗（popup shell）
- ✅ 支持 ES Module 方式导入
- ✅ 模块化设计，易于扩展

### 🆕 API预设与连接管理
- ✅ 支持自定义API配置（URL、API Key、模型等）
- ✅ 支持切换使用SillyTavern主API
- ✅ 支持从API端点自动加载模型列表
- ✅ 美观的滑动开关切换主API

### 🆕 工具与预设管理
- ✅ 创建、编辑、删除API预设
- ✅ 快速切换不同预设配置
- ✅ 预设导入/导出（JSON格式）
- ✅ 从当前配置快速创建预设
- ✅ 预设与API配置合并显示，操作更便捷
- ✅ 提供“工具列表”页面，可直接创建、编辑、删除自定义工具
- ✅ 自定义工具创建后自动进入“工具”页签，并复用统一配置面板

### 🆕 正则提取
- ✅ 标签/规则提取配置（`include / exclude / regex_include / regex_exclude`）
- ✅ 正则表达式测试与验证
- ✅ 标签扫描与标签建议生成
- ✅ 内容黑名单过滤
- ✅ 规则预设保存、加载、导入/导出
- ✅ 支持直接对任意文本做提取测试

> 说明：当前“正则提取”页的真实定位已经收敛为**规则提取面板**，不再是早期那套“消息源选择 + STScript 生成器”工作流。

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
- ✅ follow_ai 模式 - 随AI输出，不启用额外解析链
- ✅ post_response_api 模式 - 额外AI模型解析后注入
- ✅ AI 回复完成后自动监听并触发额外工具生成
- ✅ 工具结果自动回填到最新 AI 楼层正文
- ✅ 新增“小幽点评”工具，可自动生成点评与剧情钩子

### 🆕 当前架构收敛成果（Phase 1 ~ Phase 5）
- ✅ `index.js` 已收敛为薄入口，应用层拆分为 `bootstrap / popup-shell / public-api`
- ✅ `tool-registry.js` 已成为工具运行主模型中心
- ✅ 自动执行主链已明确为 `tool-trigger -> tool-output-service -> tool-prompt-service -> api-connection -> context-injector`
- ✅ `modules/ui/index.js` 已成为 UI 主装配入口，`ui-components.js` 降级为 compatibility facade
- ✅ 工具运行态已具备最近触发事件、跳过原因、执行路径、写回状态、失败阶段等轻量诊断字段

### 🆕 当前代码瘦身收口（2026-03-25）
- ✅ `ui-components.js` 与 `prompt-editor.js` 已从启动期常驻装载改为按需加载的兼容能力
- ✅ `tool-trigger.js` 已移除对 `tool-executor.js` 的静态依赖，兼容执行入口改为惰性加载
- ✅ popup shell 已优先走 `modules/ui/index.js` 主路径，仅在必要时回退加载兼容模块
- ✅ `api-connection.js`、`preset-manager.js`、`regex-extractor.js` 已优先改用 `core/storage-service.js` 主接口，`storage.js` 继续保留为兼容适配层

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
// @version      0.6.2
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

### API预设管理

1. 点击 **"API预设"** 标签页进入统一管理面板
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

1. 点击 **“正则提取”** 标签页进入规则提取面板
2. 配置提取规则：
   - `include`：按标签名提取内容
   - `exclude`：先整体排除某类标签块
   - `regex_include`：通过捕获组提取目标内容
   - `regex_exclude`：对已提取内容做二次清理
3. 如有需要，设置内容黑名单，过滤包含特定关键词的结果
4. 使用 **“扫描标签”** 从测试文本中发现候选标签
5. 使用 **“测试提取”** 直接验证当前规则组合的结果
6. 将当前规则保存为规则预设，或通过 JSON 导入/导出

#### 当前规则提取示例

例如，希望：

- 去掉 `<thinking>...</thinking>`
- 只保留 `<content>...</content>`

可以配置为：

```text
规则1: exclude -> thinking
规则2: include -> content
```

若测试文本为：

```xml
<thinking>这是一段思考过程</thinking>
<content>这是最终保留的正文</content>
```

则提取结果为：

```text
这是最终保留的正文
```

## 📁 项目结构

```
youyou_Toolkit/
├── index.js                      # 主入口文件
├── modules/app/                  # 应用装配层
│   ├── bootstrap.js              # 模块加载、主题恢复、菜单注册
│   ├── popup-shell.js            # 主工具箱弹窗与主/子标签路由
│   └── public-api.js             # 对外 API 门面组装
├── modules/
│   ├── core/                     # 核心层
│   │   ├── index.js              # 核心模块入口
│   │   ├── event-bus.js          # 事件总线
│   │   ├── storage-service.js    # 统一存储服务
│   │   └── settings-service.js   # 全局设置服务
│   ├── ui/                       # UI层
│   │   ├── index.js              # UI模块入口
│   │   ├── ui-manager.js         # UI生命周期与样式聚合管理器
│   │   ├── utils.js              # UI工具函数
│   │   └── components/           # UI组件目录
│   │       ├── api-preset-panel.js
│   │       ├── bypass-panel.js
│   │       ├── regex-extract-panel.js
│   │       ├── settings-panel.js
│   │       ├── tool-config-panel-factory.js
│   │       ├── summary-tool-panel.js
│   │       ├── status-block-panel.js
│   │       ├── tool-manage-panel.js
│   │       └── youyou-review-panel.js
│   ├── storage.js                # 旧存储 API 兼容适配层
│   ├── api-connection.js         # API连接管理
│   ├── preset-manager.js         # 预设管理
│   ├── regex-extractor.js        # 规则/标签提取
│   ├── context-injector.js       # 最新 AI 楼层写回
│   ├── variable-resolver.js      # 变量解析
│   ├── tool-registry.js          # 工具注册表
│   ├── tool-executor.js          # 调度/批处理/兼容执行入口
│   ├── tool-trigger.js           # 事件触发管理
│   ├── tool-output-service.js    # 自动工具链直接执行层
│   ├── tool-prompt-service.js    # 工具消息构建与模板解析
│   ├── tool-manager.js           # 工具管理
│   ├── window-manager.js         # 独立窗口能力（扩展用）
│   ├── prompt-editor.js          # 兼容提示词编辑器
│   └── ui-components.js          # UI兼容层
├── styles/
│   └── main.css                  # 主样式文件
├── docs/
│   ├── AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md  # 自动触发专项文档
│   ├── ARCHITECTURE_ANALYSIS.md  # 架构文档
│   ├── API_DOCUMENTATION.md      # API文档
│   ├── HOST_REGRESSION_CHECKLIST.md # 宿主回归清单
│   ├── OPTIMIZATION_EXECUTION_PLAN.md # 优化施工方案
│   ├── OPTIMIZATION_PROGRESS.md  # 优化施工进度
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
YouYouToolkit.switchMainTab('apiPresets')   // 切换到API预设页
YouYouToolkit.switchMainTab('regexExtract') // 切换到正则提取页

// API配置（异步方法）
await YouYouToolkit.getApiConfig()     // 获取当前API配置
await YouYouToolkit.saveApiConfig(config)  // 保存API配置
await YouYouToolkit.testApiConnection()    // 测试API连接
await YouYouToolkit.sendApiRequest(messages, options)  // 发送API请求

// 预设管理（异步方法）
await YouYouToolkit.getPresets()  // 获取所有预设

// 规则提取/正则测试（通过模块访问）
const regexModule = YouYouToolkit.getRegexExtractor();
await regexModule.testRegex(pattern, text, flags, groupIndex);  // 测试正则
await regexModule.getTagRules();
await regexModule.addTagRule({ type: 'include', value: 'content', enabled: true });
await regexModule.exportRulesConfig();
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
- 当前 API / 预设 / 规则提取模块已优先通过该服务读写，而不是继续直接依赖 `storage.js` 旧接口

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

**regex-extractor.js - 规则/标签提取**
- 标签提取与规则链处理
- 正则表达式测试与验证
- 标签扫描与建议生成
- 规则模板与规则预设管理
- 配置导入/导出

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

> 说明：`window-manager.js` 当前保留为扩展能力；主工具箱默认走 `popup-shell.js` 的统一弹窗，而不是独立窗口主路径。

**prompt-editor.js - 兼容提示词编辑器**
- 三段式可视化编辑（System/AI/User）
- 展开/折叠
- 导入/导出
- 消息格式转换

> 说明：当前主工具链已优先使用 `promptTemplate` 单文本字段；`prompt-editor.js` 主要作为兼容能力保留。

#### UI层 (modules/ui/)

**ui-manager.js - UI管理器**
- 组件注册与生命周期管理
- 统一样式注入
- 不负责 popup shell 路由控制

**ui/index.js - UI主装配入口**
- 提供主面板渲染 helper
- 统一导出默认工具面板与静态页面入口
- 收口 UI 样式聚合

**ui-components.js - 兼容层**
- 仅保留旧接口别名与兼容导出
- 新代码应优先使用 `modules/ui/index.js`

**components/ - UI组件**
- `api-preset-panel.js` - API预设管理面板
- `bypass-panel.js` - 破限词面板
- `regex-extract-panel.js` - 正则提取面板
- `settings-panel.js` - 设置面板
- `summary-tool-panel.js` - 摘要工具面板
- `status-block-panel.js` - 状态栏工具面板
- `tool-manage-panel.js` - 工具管理面板
- `youyou-review-panel.js` - 小幽点评工具面板

## 📚 文档

- [API 文档](./docs/API_DOCUMENTATION.md) - 详细的 API 参考
- [架构文档](./docs/ARCHITECTURE_ANALYSIS.md) - 当前主架构与演进基线
- [贡献指南](./docs/CONTRIBUTING.md) - 如何参与项目开发
- [更新日志](./docs/CHANGELOG.md) - 版本更新记录
- [扩展开发指南](./docs/EXTENSION_GUIDE.md) - 基于框架开发新功能
- [宿主回归清单](./docs/HOST_REGRESSION_CHECKLIST.md) - 宿主环境实机回归基线
- [自动触发链专项方案](./docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md) - 自动触发专项收口文档
- [代码瘦身与结构收口方案](./docs/CODEBASE_DIET_PLAN.md) - 本轮后收口减重方案

## 📝 版本说明

- 当前 `package.json` 版本：`0.6.2`
- 当前仓库主线：`0.6.2 + Unreleased`
- 历史版本与完整变更记录请查看：[`docs/CHANGELOG.md`](./docs/CHANGELOG.md)

如果你要确认某项能力是“当前稳定发布版本已有”，还是“仓库主线已实现但尚未单独发版记录”，请同时对照：

- `package.json`
- `README.md`
- `docs/CHANGELOG.md`

## 📄 许可证

MIT License

## 👤 作者

YouYou

## 🙏 致谢

本项目参考了 [shujuku-main](./Reference/shujuku-main/) 项目的实现方式。