# YouYou Toolkit - SillyTavern 工具插件

> 当前文档以仓库内现行代码为准；当前发布版本为 `1.0.37`。

YouYou Toolkit 是运行在 SillyTavern / TavernHelper 宿主环境中的可配置工具链插件。
当前主线能力已经收口为：**API 预设管理、自定义工具管理、提取预览、手动执行、结果写回、运行态诊断与统一 UI 装配**。

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
- `follow_ai`：不额外请求模型，仅保留当前输出模式配置
- `post_response_api`：点击“立即执行一次”后额外请求模型并写回最新 AI 楼层
- “测试提取”支持预览最近消息的正文提取与工具提取结果
- 工具结果会尽量写回最新 assistant 楼层，并保留写回诊断信息

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
- `modules/app/bootstrap.js`：启动装配、模块加载、菜单注册
- `modules/app/popup-shell.js`：弹窗与路由
- `modules/app/public-api.js`：`window.YouYouToolkit` 对外门面

### 工具主链
- `modules/tool-registry.js`：运行态工具主模型
- `modules/tool-manager.js`：定义层 CRUD / 导入导出
- `modules/tool-trigger.js`：**保留原文件名，但当前职责是手动执行与提取预览入口**
- `modules/tool-output-service.js`：`post_response_api` 执行与写回主链
- `modules/tool-prompt-service.js`：工具消息构建
- `modules/context-injector.js`：最新 assistant 楼层写回
- `modules/tool-executor.js`：调度 / 批处理 / 手动兼容执行回退

### 输出模式
- `follow_ai`
- `post_response_api`

当前源码中已经不再保留旧监听运行链；如果后续重新引入自动执行，应以新的设计文档为准，而不是沿用旧实现口径。

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
│   ├── tool-trigger.js
│   ├── tool-output-service.js
│   ├── tool-prompt-service.js
│   ├── tool-executor.js
│   └── context-injector.js
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE_ANALYSIS.md
│   ├── EXTENSION_GUIDE.md
│   ├── HOST_REGRESSION_CHECKLIST.md
│   ├── CONTRIBUTING.md
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

- [API 文档](./docs/API_DOCUMENTATION.md)
- [架构文档](./docs/ARCHITECTURE_ANALYSIS.md)
- [扩展开发指南](./docs/EXTENSION_GUIDE.md)
- [宿主回归清单](./docs/HOST_REGRESSION_CHECKLIST.md)
- [贡献指南](./docs/CONTRIBUTING.md)
- [更新日志](./docs/CHANGELOG.md)

## 版本说明

- 当前 `package.json` 版本：`1.0.37`
- 当前发布版本：`1.0.37`
