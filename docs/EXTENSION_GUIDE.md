# 扩展开发指南

本文档说明在当前代码基线上，如何为 YouYou Toolkit 增加功能或扩展现有能力。

## 1. 当前推荐扩展方向

当前更推荐两类扩展：

1. **通过 UI 创建或扩展自定义工具**
2. **新增服务模块 + UI 面板**

不建议再围绕旧自动触发实现追加代码，因为当前主线已不再以那套运行链作为事实基线。

## 2. 路径 A：先通过 UI 创建自定义工具

这条路径适合大多数“模板 + API 预设 + 提取规则 + 手动执行”类型的扩展需求。

步骤：

1. 打开工具箱
2. 进入 **工具列表**
3. 新建一个自定义工具
4. 在 **工具** 页签中继续配置：
   - `promptTemplate`
   - 输出模式
   - API 预设
   - 破限词
   - 提取规则

优点：

- 不需要手写新的 popup 路由
- 自动复用统一工具配置面板
- 自动接入运行态诊断与手动执行入口

## 3. 路径 B：新增服务 + UI 组件

适合需要单独业务面板，而不是统一工具配置面的场景。

建议优先放在：

- `modules/app/`：应用层协作逻辑
- `modules/core/`：基础服务
- `modules/ui/components/`：UI 面板
- `modules/ui/index.js`：UI 注册与导出

## 4. 与工具系统相关的关键文件

- `modules/tool-manager.js`：定义层 CRUD
- `modules/tool-registry.js`：运行态工具主模型
- `modules/tool-trigger.js`：手动执行 / 提取预览入口
- `modules/tool-output-service.js`：`post_response_api` 执行与写回主链
- `modules/tool-prompt-service.js`：工具消息构建
- `modules/context-injector.js`：写回最新 assistant 楼层

## 5. 新增一个自定义工具时要理解的事

### 5.1 配置层与运行层分离

- `tool-manager.js` 负责定义层对象
- `tool-registry.js` 负责运行层归一化结果

如果你修改的是：
- 用户可编辑字段
- 导入导出格式
- 定义层默认值

优先看 `tool-manager.js`。

如果你修改的是：
- 运行态字段
- 输出模式判断
- 执行诊断信息

优先看 `tool-registry.js`。

### 5.2 输出模式

当前主要有两种：

- `follow_ai`
- `post_response_api`

其中：
- `follow_ai` 不额外请求模型
- `post_response_api` 会在手动执行时发起额外请求，并尝试写回最新 assistant 楼层

## 6. 写回相关扩展注意事项

如果你的扩展会改到：
- 最新消息读取
- assistant 楼层识别
- swipe / messageId 绑定
- 写回刷新确认

请先看：
- `modules/tool-trigger.js`
- `modules/tool-output-service.js`
- `modules/context-injector.js`

这几处是当前最容易出现宿主差异问题的地方。

## 7. 文档同步建议

如果你修改的是：
- 工具模型 / 执行链 / 对外 API：同步 `docs/API_DOCUMENTATION.md`
- 架构边界：同步 `docs/ARCHITECTURE_ANALYSIS.md`
- 扩展方式：同步本文件
- 宿主验证口径：同步 `docs/HOST_REGRESSION_CHECKLIST.md`

## 8. 不要基于旧自动触发文档继续加代码

仓库里仍可能存在一些历史文档，记录过自动触发专项分析、验收模板或历史问题背景。

这些文档可以作为历史背景参考，但不能直接当成当前源码事实。

如果后续真的要重新引入自动执行能力，应先单独确定新的实现方案，再开始写代码。
