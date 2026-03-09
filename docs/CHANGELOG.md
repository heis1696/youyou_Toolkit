# 更新日志

本项目的所有重要更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### 修复

- 🐛 **UI组件模块** (`modules/ui-components.js`)
  - 修复 jQuery 实例不一致导致的事件绑定失败问题
  - 修复 `$container` 可能为 undefined 导致的 "Cannot read properties of undefined" 错误
  - 新增 jQuery 缓存机制 (`cachedJQuery`) 确保全局一致性
  - 新增 `isContainerValid()` 函数检查容器有效性
  - 改进所有事件绑定函数的空值检查和错误处理
  - 修复 `getFormApiConfig()` 函数的空值安全问题

### 计划中的功能

- 事件监听系统
- 弹窗内容可配置化
- 多主题支持
- 国际化支持
- API请求历史记录
- 更多API参数配置选项

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