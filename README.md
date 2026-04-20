# YouYou Toolkit - SillyTavern 工具插件

> 当前文档以仓库内现行代码为准；当前发布版本为 `1.0.58`。

YouYou Toolkit 是运行在 SillyTavern / TavernHelper 宿主环境中的可配置工具链插件。

当前主线能力已经收口为：**API 预设管理、自定义工具管理、提取预览、手动执行、自动 post-response 执行、结果写回、运行态诊断与统一 UI 装配**。

## 功能概览

### API 预设与连接
- 自定义 API 配置（URL、API Key、模型等）
- 使用宿主主 API 或独立预设
- 从 API 端点加载模型列表
- 预设导入 / 导出 / 快速切换
- 支持为 API 预设单独配置流式响应开关

### 工具与规则
- 创建、编辑、删除自定义工具
- 配置 `promptTemplate`、输出模式、提取规则、API 预设、Ai 指令预设
- 规则提取面板支持标签 / 正则提取、规则预设、黑名单过滤与测试
- 新建工具后可直接进入统一工具配置面板继续编辑
- 新建的 API 预设、工具与 Ai 指令预设可在工作台中即时刷新引用

### 执行与写回
- `post_response_api`：支持手动执行，也支持自动链对符合条件的工具执行额外请求并写回最新 assistant 楼层
- `follow_ai`：当前为正式手动执行路径，会额外构建消息、请求模型并走写回链
- `local_transform`：在本地完成文本变换后，仍通过统一写回链写回 assistant 楼层
- “测试提取”支持预览最近消息的正文提取与工具提取结果
- 工具结果会尽量写回最新 assistant 楼层，并保留写回与 refresh 诊断信息

### 运行态与 UI
- 统一 popup shell UI
- 首次打开显示一次性启动界面，后续直接进入工作台
- 工作台顶部信息区进一步瘦身，释放主内容区域空间
- 工具运行态显示最近状态、错误、执行路径、写回状态等信息
- 工具页与工具列表页共享统一配置模型
- 填表工具台拆分为 `配置 / 执行与诊断 / 预览/参考` 分界面
- 兼容模块按需加载，降低启动期负担

## 当前架构

### 主入口
- `index.js`：薄入口
- `modules/app/bootstrap.js`：启动装配、模块加载、菜单注册与自动化初始化
- `modules/app/popup-shell.js`：单弹窗工作区壳层与主/子页签路由
- `modules/app/public-api.js`：`window.YouYouToolkit` 对外门面

### 工具与执行主链
- `modules/tool-manager.js`：工具定义层与持久化
- `modules/tool-registry.js`：运行时工具模型、导航结构与诊断字段
- `modules/tool-execution-context.js`：手动链与自动链共享上下文层
- `modules/tool-trigger.js`：手动执行与提取预览入口
- `modules/tool-automation-service.js`：自动执行唯一入口
- `modules/tool-output-service.js`：`post_response_api` / `follow_ai` 执行主链
- `modules/tool-prompt-service.js`：工具请求消息构建
- `modules/context-injector.js`：assistant 槽位写回与 refresh 确认

### 输出模式
- `post_response_api`
- `follow_ai`
- `local_transform`
- compatibility fallback

当前自动主线只执行自动条件满足的 `post_response_api` 工具；其他路径仍存在，但不应再被描述成当前自动执行主入口。

## 目录结构

```text
.
├── index.js
├── modules/
│   ├── app/
│   ├── core/
│   ├── ui/
│   ├── tool-manager.js
│   ├── tool-registry.js
│   ├── tool-execution-context.js
│   ├── tool-trigger.js
│   ├── tool-automation-service.js
│   ├── tool-output-service.js
│   ├── tool-prompt-service.js
│   ├── context-injector.js
│   └── tool-executor.js
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE_ANALYSIS.md
│   ├── FRAMEWORK_ARCHITECTURE.md
│   └── CHANGELOG.md
└── dist/
```

## 构建与开发

```bash
npm install
npm run build
npm run build:dev
npm run build:iife
npm run watch
npm run dev
```

当前仓库没有内置 `npm test` 或 `npm lint`。
自动化验证以 `npm run build` 为主；宿主相关改动还应在真实 SillyTavern / TavernHelper 环境中做手测。

## 安装

### 方式一：脚本库导入

```javascript
import 'https://testingcf.jsdelivr.net/gh/heis1696/youyou_Toolkit@main/dist/bundle.js'
```

### 方式二：Tampermonkey

1. 安装 Tampermonkey
2. 新建脚本并填入用户脚本头
3. 将 `dist/bundle.js` 内容粘贴进去
4. 保存并启用

## 推荐阅读

- [框架文档](./docs/FRAMEWORK_ARCHITECTURE.md)
- [架构分析](./docs/ARCHITECTURE_ANALYSIS.md)
- [API 文档](./docs/API_DOCUMENTATION.md)
- [更新日志](./docs/CHANGELOG.md)

## 版本说明

- 当前 `package.json` 版本：`1.0.58`
- 当前发布版本：`1.0.58`
