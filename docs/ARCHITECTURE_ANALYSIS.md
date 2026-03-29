# 架构分析

本文档描述当前仓库主线代码的实际结构与职责边界。

## 1. 当前主线结论

当前主线已经不再沿用历史 trigger/baseline/replay 状态机，而是切到新的 MVU 风格自动生命周期。

现阶段的核心事实是：

1. `modules/tool-automation-service.js` 是自动触发唯一入口，负责宿主消息事件监听、消息级事务调度与同槽位串行执行。
2. `modules/tool-execution-context.js` 是手动链与自动链共用的上下文构建层。
3. `post_response_api` 的实际执行与写回 payload 主链仍然是：
   `tool-output-service.js -> tool-prompt-service.js -> api-connection.js -> context-injector.js`
4. `modules/tool-trigger.js` 文件名被保留，但当前职责只剩手动执行与提取预览入口。
5. `tool-executor.js` 仍保留调度 / 批处理 / compatibility 执行能力，但不再作为自动触发入口。

## 2. 模块职责

### 2.1 入口与应用层

- `index.js`：薄入口
- `modules/app/bootstrap.js`：启动装配、模块懒加载、菜单注册
- `modules/app/popup-shell.js`：弹窗与页签路由
- `modules/app/public-api.js`：全局公开 API 组装

### 2.2 工具相关主链

- `modules/tool-manager.js`：定义层 CRUD / 导入导出
- `modules/tool-registry.js`：运行态工具模型、配置归一化、runtime 诊断字段
- `modules/tool-execution-context.js`：手动 / 自动共用的消息快照与 slot 上下文构建
- `modules/tool-automation-service.js`：自动生命周期、宿主事件监听、消息级事务调度
- `modules/tool-trigger.js`：手动执行与提取预览入口
- `modules/tool-output-service.js`：`post_response_api` 执行、提取、写回主链
- `modules/tool-prompt-service.js`：工具消息构建
- `modules/context-injector.js`：写回最新 assistant 楼层
- `modules/tool-executor.js`：调度 / 批处理 / compatibility 执行回退

### 2.3 UI 层

- `modules/ui/index.js`：UI 主装配入口
- `modules/ui/ui-manager.js`：组件生命周期与样式装配
- `modules/ui/components/`：面板组件
- `modules/ui/components/tool-config-panel-factory.js`：统一工具配置面板工厂

## 3. 当前执行流

### 3.1 自动执行

```text
宿主 MESSAGE_RECEIVED
  -> tool-automation-service.processAssistantMessage(messageId)
  -> buildExecutionContextForMessage()
  -> 筛选 automation.enabled === true 的 post_response_api 工具
  -> 同一 slot 串行 runToolPostResponse()
  -> context-injector.injectDetailed()
  -> refreshConfirmed === true 才算成功
```

### 3.2 手动执行

```text
工具页点击“立即执行一次”
  -> runToolManually(toolId)
  -> buildExecutionContextForLatestAssistant()
  -> 根据 output.mode 选择路径
     -> post_response_api: tool-output-service.runToolPostResponse()
     -> 其它模式: tool-executor.executeToolWithConfig()
```

### 3.3 提取预览

```text
工具页点击“测试提取”
  -> previewToolExtraction(toolId)
  -> buildToolExecutionContext()
  -> tool-output-service.previewExtraction()
```

### 3.4 写回路径

```text
runToolPostResponse()
  -> 读取最近 assistant 消息与上下文
  -> 构建工具消息
  -> 发起 API 请求
  -> 提取工具输出
  -> context-injector 写回最新 assistant 楼层
```

## 4. 当前最重要的边界

### 4.1 `tool-trigger.js` 的现状

不要再把 `modules/tool-trigger.js` 理解成“当前自动触发管理器”。

当前它主要承担：
- 宿主聊天消息快照读取
- 角色 / 消息身份归一化
- slot binding / revision / transaction 上下文构建
- 手动执行入口
- 测试提取入口

文件名暂时保留，是为了减少本轮对现有 UI 导入路径的扰动。

### 4.2 `tool-registry.js` 的现状

当前运行态主模型已经不再保留旧 trigger runtime 字段。
运行态白名单更强调：
- 最近执行状态
- 最近错误
- 写回状态
- slot / source 诊断字段
- traceId

### 4.3 `tool-manager.js` 的现状

`tool-manager.js` 负责定义层工具对象的创建、导入、导出与启停。
当前逻辑会在读取与保存时清理旧 trigger 形状，避免历史数据继续把过时字段带回主线。

## 5. 当前仓库的真实风险点

如果后续要继续推进新一轮自动执行方案，应该把它视为**新的实现任务**，而不是“恢复旧 trigger 链”。

也就是说：
- 当前旧自动触发实现已经退出主源码运行链
- 后续若要引入自动执行，应先有新的设计，再落地新的事件模型 / 门控 / 幂等 / 写回确认链

## 6. 结论

当前仓库最重要的主线已经不是“自动监听何时触发”，而是：
- 手动执行如何稳定工作
- `post_response_api` 如何正确提取与写回
- 运行态诊断如何帮助定位写回 / 执行问题

如果发现文档或注释仍把旧自动触发主链描述成当前事实，应以源码为准，并优先修正文档。
