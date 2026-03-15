# 更新日志

本项目的所有重要更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### 修复

- 🐛 **工具面板收敛与自动触发通知增强** (`modules/ui/components/summary-tool-panel.js`, `modules/ui/components/status-block-panel.js`, `modules/tool-trigger.js`, `modules/ui/utils.js`, `modules/ui-components.js`, `docs/API_DOCUMENTATION.md`)
  - 参考 shujuku / MVU 的配置思路，将工具页收敛为 5 个核心区块：模板修改框、输出模式、API 预设、破限预设、手动操作区
  - 删除原先冗余的启用、自动触发、覆盖旧结果、复制模板、重置整页、调试折叠等复杂交互，降低使用门槛
  - `follow_ai` 现在在 UI 上明确视为“不启用额外工具链”，只有 `post_response_api` 才会参与 AI 回复后的自动执行
  - 新增顶部通知：AI 回复被监听、自动执行开始、执行成功、执行失败都会在顶部显示明显提示，避免只看控制台难以确认状态
  - 新增手动执行入口，可直接基于当前模板 / API 预设 / 破限预设执行一次工具，方便排错与验证
  - 工具样式聚合逻辑同步更新，确保摘要工具与主角状态栏的新样式都能被正确注入

- 🐛 **破限词面板默认预设清理** (`modules/bypass-manager.js`, `modules/ui/components/bypass-panel.js`)
  - 移除强制注入的内置 `standard` 破限词预设，避免面板出现多余且难以处理的默认模板
  - 补充破限词面板各类失败场景的兜底提示，避免出现空白错误通知
  - 新增旧版破限词存储迁移：自动清理 `undefined` 默认预设、无 `id` 的历史样例模板，并规范化旧数据结构

- 🐛 **AI 回复监听与工具触发链路修复** (`modules/tool-executor.js`, `modules/tool-trigger.js`, `modules/tool-output-service.js`, `modules/tool-prompt-service.js`, `index.js`)
  - 修复 `getToolsForEvent()` 仍读取旧版 `triggerEvents` 字段，导致 `GENERATION_ENDED` 后无法找到应执行工具的问题
  - 在工具触发时按输出模式分别执行：`post_response_api` 走额外模型调用链，`follow_ai` 也会记录触发状态并显示通知
  - 修复工具输出服务的上下文注入参数顺序错误、重复拼接破限词消息、无法读取最新 AI 回复内容的问题
  - 初始化时为 `toolOutputService` 注入 API 连接模块，确保额外模型解析模式可以真正发起请求
  - 新增工具触发成功/失败 Toast 通知，并回写运行时状态到调试面板

### 计划中的功能

- 世界书注入集成
- 多作用域支持 (profile/character)
- 可视化执行历史面板
- 国际化支持

---

## [0.6.2] - 2026-03-15

### 修复

- 🐛 **工具触发模块初始化修复** (`index.js`)
  - **关键修复**：`initTriggerModule()` 从未被调用，导致 GENERATION_ENDED 事件监听器从未注册
  - 工具现在可以正确监听 AI 消息回复并自动触发执行
  - 在模块加载成功后立即初始化工具触发模块

- 🐛 **破限词面板内置预设判断修复** (`modules/ui/components/bypass-panel.js`)
  - 修复内置预设判断逻辑：从硬编码 `'standard'` 改为使用 `DEFAULT_BYPASS_PRESETS` 对象检查
  - 现在所有在 `DEFAULT_BYPASS_PRESETS` 中定义的预设都会被正确识别为内置预设
  - 内置预设不显示删除按钮，防止用户尝试删除不可删除的预设

- 🐛 **Toast通知显示修复** (`modules/ui/utils.js`)
  - 修复 toastr 不可用时错误消息不显示的问题
  - 新增自定义 Fallback Toast 实现，当 SillyTavern 的 toastr 不可用时显示可视化通知
  - 添加消息为空时的默认消息处理
  - 支持成功/错误/警告/信息四种类型的不同颜色显示

---

## [0.6.1] - 2026-03-15

### 修复

- 🐛 **破限词面板jQuery data属性修复** (`modules/ui/components/bypass-panel.js`)
  - 修复 jQuery data 属性访问问题：`data('preset-id')` → `data('presetId')`
  - 修复预设选择、删除、复制、设为默认等操作无法获取预设ID的问题
  - 修复消息ID访问问题：`data('message-id')` → `data('messageId')`

- 🐛 **主角状态面板旧格式修复** (`modules/ui/components/status-block-panel.js`)
  - 更新输出模式配置以兼容新的简化版格式

---

## [0.6.0] - 2026-03-15

### 简化重构

这次重构的核心是"收敛"——简化工具配置，删除过度设计，统一输出模式语义。

#### 修复

- 🐛 **主角状态面板旧格式修复** (`modules/ui/components/status-block-panel.js`)
  - 更新到 v3.0.0 简化版，与 summary-tool-panel.js 保持一致
  - 输出模式从 `inline/separate` 改为 `follow_ai/post_response_api`
  - 删除"可用变量"帮助文本（内部保留变量系统）
  - 新增破限词绑定配置区
  - 新增可折叠调试信息区

- 🐛 **破限词面板jQuery data属性修复** (`modules/ui/components/bypass-panel.js`)
  - 修复 jQuery data 属性访问问题：`data('preset-id')` → `data('presetId')`
  - 修复预设选择、删除、复制、设为默认等操作无法获取预设ID的问题
  - 修复消息ID访问问题：`data('message-id')` → `data('messageId')`

#### 更改
  - 输出模式常量更新：`INLINE` → `FOLLOW_AI`
  - 新增 `LEGACY_OUTPUT_MODES` 兼容映射
  - 新增 `shouldRunFollowAi` 方法（替代 `shouldRunInline`）
  - 保留旧方法作为兼容层

- 🔧 **UI组件简化** (`modules/ui/components/summary-tool-panel.js`)
  - 删除"可用变量"说明区
  - 输出模式选择：显示/隐藏额外API配置选项
  - 破限词绑定：启用后显示预设选择
  - 新增可折叠调试信息区
  - 样式优化：隐藏类、折叠动画、调试信息样式

#### 删除

- 🗑️ 删除工具页中的变量说明展示（内部保留变量系统）
- 🗑️ 删除 `PromptSegment` 外部概念
- 🗑️ 删除工具页复杂分段编辑器支持

#### 输出模式语义

新的输出模式定义：

- **`follow_ai`** (随 AI 输出)
  - 不执行额外解析链
  - 不调用额外模型
  - 不做上下文注入

- **`post_response_api`** (额外 AI 模型解析)
  - 监听 AI 回复结束
  - 使用工具绑定的 API 预设调用额外模型
  - 将结果注入上下文

#### 文档

- 📝 更新 CHANGELOG 记录 v0.6 简化重构
- 📝 更新 API 文档反映新的数据结构

---

## [0.5.0] - 2026-03-14

### 新增

- ✨ **设置服务** (`modules/core/settings-service.js`)
  - 统一全局配置管理
  - 执行器设置（并发数、重试次数、超时时间、队列策略）
  - 监听器设置（事件监听、过滤规则、防抖设置）
  - 调试设置（日志、执行历史、状态徽章）
  - UI设置（主题、紧凑模式、动画效果）

- ✨ **变量解析服务** (`modules/variable-resolver.js`)
  - 模板变量替换 `{{variableName}}`
  - 内置变量支持：`lastUserMessage`、`lastAiMessage`、`chatHistory`、`characterCard`、`toolName`、`injectedContext`
  - 正则提取变量 `{{regex.xxx}}`
  - 自定义变量注册

- ✨ **上下文注入服务** (`modules/context-injector.js`)
  - 按聊天隔离存储工具输出
  - 聚合上下文输出
  - 覆盖/追加模式支持
  - 上下文导入/导出

- ✨ **工具提示词服务** (`modules/tool-prompt-service.js`)
  - 提示词段落结构转API消息
  - 变量替换集成
  - 破限词消息合并
  - 提示词模板管理

- ✨ **破限词管理模块** (`modules/bypass-manager.js`)
  - 破限词预设CRUD
  - 消息列表管理（role、content、enabled）
  - 默认预设设置
  - 预设导入/导出
  - 工具绑定支持

- ✨ **UI组件**
  - `settings-panel.js` - 设置面板（执行器/监听器/调试/外观四个标签页）
  - `bypass-panel.js` - 破限词面板（左右布局，预设列表+编辑器）

- ✨ **工具配置结构扩展**
  - `trigger` - 触发配置
  - `prompt.segments` - 结构化提示词段落
  - `bypass` - 破限词绑定配置
  - `output` - 输出模式配置（inline/post_response_api）
  - `runtime` - 运行时状态

- ✨ **事件系统增强**
  - 新增 `SETTINGS_UPDATED` 事件
  - 新增 `TOOL_CONTEXT_INJECTED`、`TOOL_CONTEXT_CLEARED` 事件
  - 新增破限词相关事件
  - 新增工具执行事件

### 更改

- 🔧 **版本号更新** 到 0.5.0
- 🔧 **工具注册表** 扩展支持新的配置结构
- 🔧 **核心模块入口** 导出设置服务

### 文档

- 📝 更新架构文档，反映v0.5新增模块

---

## [0.4.0] - 2026-03-11

### 新增

- ✨ **核心层模块** (`modules/core/`)
  - `event-bus.js` - 事件总线，实现模块间松耦合通信
  - `storage-service.js` - 统一存储服务，支持命名空间隔离

- ✨ **UI层重构** (`modules/ui/`)
  - `ui-manager.js` - UI管理器
  - `components/` - 独立UI组件目录
    - `api-preset-panel.js` - API预设管理面板
    - `regex-extract-panel.js` - 正则提取面板
    - `summary-tool-panel.js` - 摘要工具面板
    - `status-block-panel.js` - 状态栏工具面板
    - `tool-manage-panel.js` - 工具管理面板

- ✨ **工具注册系统** (`modules/tool-registry.js`)
  - 工具动态注册与注销
  - 工具配置管理
  - API预设绑定

- ✨ **窗口管理模块** (`modules/window-manager.js`)
  - 独立浮动窗口创建
  - 窗口层级管理
  - 窗口状态持久化

- ✨ **提示词编辑器** (`modules/prompt-editor.js`)
  - 可视化段落编辑
  - 消息格式转换
  - 角色类型选择

### 更改

- 🔧 **架构重构** - 采用分层架构（核心层/服务层/UI层）
- 🔧 **入口优化** - index.js 简化为模块协调器
- 🔧 **弹窗系统** - 支持主顶栏和次级顶栏
- 🔧 **版本号更新** 到 0.4.0

### 文档

- 📝 更新架构文档，反映当前模块结构
- 📝 更新API文档，添加新增模块API
- 📝 删除过时的施工文档和参考项目文档

---

## [0.3.0] - 2026-03-09

### 新增

- ✨ **正则提取模块** (`modules/regex-extractor.js`)
  - 正则表达式测试与验证
  - 正则模板管理（创建/编辑/删除）
  - 内置5个常用正则模板（JSON内容、代码块、思考标签、对话引号、段落）
  - 自定义正则模板支持
  - 生成STScript脚本用于实际内容提取
  - 支持多种消息源（最后消息、角色消息、用户消息等）
  - 模板导入/导出功能
  - 捕获组索引配置

- ✨ **UI组件模块扩展** (`modules/ui-components.js`)
  - 新增正则提取面板
  - 正则测试区：实时测试正则表达式
  - 消息提取区：生成STScript命令
  - 模板列表展示与管理
  - 新增 `renderRegex()` 方法渲染正则面板
  - 新增 `getRegexStyles()` 方法获取正则面板样式

- ✨ **主入口更新** (`index.js`)
  - 新增"正则提取"导航标签页
  - 自动注入正则面板样式
  - 新增 `getRegexExtractor()` API方法

### 更改

- 🔧 版本号更新到 0.3.0
- 🔧 页面切换支持 `'regex'` 页面

### 文档

- 📝 更新README.md，添加正则提取功能说明
- 📝 更新API文档，添加正则提取模块API
- 📝 更新扩展指南，添加正则模块开发示例

---

## [0.2.1] - 2024-03-09

### 更改

- 🎨 **UI组件模块** (`modules/ui-components.js`) - 重大改进
  - **合并面板**：将API配置和预设管理合并到同一面板，简化操作流程
  - **移除连接测试**：不再需要连接测试功能，减少界面复杂度
  - **改进Toggle样式**：从简单checkbox改为美观的滑动开关，添加渐变和发光效果
  - **改进下拉框UI**：添加自定义下拉箭头，统一输入框样式
  - **修复模型选择器**：修复获取模型列表后下拉框宽度变短的问题
  - **新增预设对话框**：使用模态对话框代替prompt，支持输入名称和描述

### 修复

- 🐛 修复新预设编辑报错 "预设不存在" 的问题
- 🐛 修复切换预设时未保存配置导致操作丢失的问题

---

## [0.2.0] - 2024-03-09

### 新增

- ✨ **API连接管理模块** (`modules/api-connection.js`)
  - 支持自定义API配置（URL、API Key、模型、温度等参数）
  - 支持切换使用SillyTavern主API
  - 支持从API端点自动加载模型列表
  - 支持API连接测试
  - 支持发送测试请求验证配置
  - 兼容OpenAI及其他兼容API格式

- ✨ **预设管理模块** (`modules/preset-manager.js`)
  - 创建、编辑、删除API预设
  - 快速切换不同预设配置
  - 预设导入/导出（JSON格式）
  - 从当前配置快速创建预设
  - 预设复制/重命名功能
  - 预设数据验证

- ✨ **存储管理模块** (`modules/storage.js`)
  - 优先使用SillyTavern的extensionSettings存储
  - 自动回退到localStorage
  - 支持深度合并设置
  - 安全JSON解析/序列化

- ✨ **UI组件模块** (`modules/ui-components.js`)
  - Tab导航（API配置、预设管理、连接测试）
  - API配置表单
  - 预设列表展示
  - 连接测试面板
  - 完整的事件绑定系统

### 更改

- 🔧 重构项目结构为模块化设计
- 🔧 弹窗宽度增加到600px以适应更多内容
- 🔧 更新版本号到0.2.0

### 文档

- 📝 更新README.md，添加新功能说明
- 📝 更新API文档

---

## [0.1.0] - 2024-03-09

### 新增

- ✨ 魔棒区菜单项注册功能
- ✨ 独立弹窗系统
- ✨ ES Module 导入支持
- ✨ 自动初始化机制
- ✨ 样式注入系统

### 文档

- 📝 README 使用说明
- 📝 API 文档
- 📝 贡献指南
- 📝 扩展开发指南

### 构建系统

- 🔧 esbuild 构建配置
- 🔧 多格式输出支持 (ESM/IIFE)
- 🔧 开发模式监听

---

## 版本说明

### 版本号规则

- **主版本号 (MAJOR)**: 不兼容的 API 修改
- **次版本号 (MINOR)**: 向下兼容的功能性新增
- **修订号 (PATCH)**: 向下兼容的问题修正

### 标签说明

- `新增` - 新功能
- `更改` - 现有功能的变更
- `弃用` - 即将移除的功能
- `移除` - 已移除的功能
- `修复` - Bug 修复
- `安全` - 安全相关修复

---

## 贡献

如果你发现了 bug 或有功能建议，请在 [GitHub Issues](https://github.com/heis1696/youyou_Toolkit/issues) 中提交。

---

## 链接

- [API 文档](./API_DOCUMENTATION.md)
- [贡献指南](./CONTRIBUTING.md)
- [扩展开发指南](./EXTENSION_GUIDE.md)