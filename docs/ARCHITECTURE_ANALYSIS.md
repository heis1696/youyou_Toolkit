# YouYou Toolkit 项目架构文档

## 一、项目概述

YouYou Toolkit 是一个 SillyTavern 工具插件框架，当前版本 **0.4.0**，采用模块化架构设计。

### 核心功能
- API连接与预设管理
- 正则提取功能
- 工具管理与执行引擎
- 破限词预设管理
- 提示词可视化编辑器
- 独立窗口系统

---

## 二、架构设计

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         index.js (入口层)                        │
│  职责: 模块加载、初始化、弹窗管理、菜单注册、内容渲染            │
└───────────────────────────┬─────────────────────────────────────┘
                            │ 动态加载所有模块
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Core Layer (核心层)                         │
├─────────────────────────────────────────────────────────────────┤
│  event-bus.js          事件总线，模块间松耦合通信                 │
│  storage-service.js    统一存储服务，命名空间隔离                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Service Layer (服务层)                        │
├─────────────────────────────────────────────────────────────────┤
│  api-connection.js     API请求发送与配置管理                     │
│  preset-manager.js     API预设CRUD操作                           │
│  regex-extractor.js    正则模板管理与内容提取                    │
│  tool-manager.js       工具定义管理                              │
│  tool-executor.js      工具执行引擎                              │
│  tool-trigger.js       事件触发管理                              │
│  tool-registry.js      工具注册表                                │
│  bypass-prompts.js     破限词预设管理                            │
│  storage.js            存储后端抽象                              │
│  window-manager.js     独立窗口管理                              │
│  prompt-editor.js      提示词编辑器                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        UI Layer (UI层)                           │
├─────────────────────────────────────────────────────────────────┤
│  ui-components.js      UI组件主模块（兼容层）                    │
│  ui-manager.js         UI管理器                                  │
│  components/           独立UI组件                                │
│    ├── api-preset-panel.js      API预设面板                     │
│    ├── bypass-panel.js          破限词面板                      │
│    ├── bypass-editor.js         破限词可视化编辑器              │
│    ├── regex-extract-panel.js   正则提取面板                    │
│    ├── summary-tool-panel.js    摘要工具面板                    │
│    ├── status-block-panel.js    状态栏工具面板                  │
│    └── tool-manage-panel.js     工具管理面板                    │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 模块职责表

| 模块 | 职责 | 依赖 | 代码位置 |
|------|------|------|----------|
| storage.js | 存储后端抽象 | 0 | modules/storage.js |
| storage-service.js | 统一存储服务 | 0 | modules/core/storage-service.js |
| event-bus.js | 事件总线 | 0 | modules/core/event-bus.js |
| api-connection.js | API请求发送 | 1 | modules/api-connection.js |
| preset-manager.js | API预设管理 | 1 | modules/preset-manager.js |
| regex-extractor.js | 正则提取功能 | 1 | modules/regex-extractor.js |
| tool-manager.js | 工具定义管理 | 0 | modules/tool-manager.js |
| tool-executor.js | 工具执行引擎 | 0 | modules/tool-executor.js |
| tool-trigger.js | 事件触发管理 | 0 | modules/tool-trigger.js |
| tool-registry.js | 工具注册表 | 0 | modules/tool-registry.js |
| bypass-prompts.js | 破限词管理 | 0 | modules/bypass-prompts.js |
| window-manager.js | 窗口管理 | 0 | modules/window-manager.js |
| prompt-editor.js | 提示词编辑器 | 0 | modules/prompt-editor.js |
| ui-components.js | UI组件模块 | 多个 | modules/ui-components.js |
| ui-manager.js | UI管理器 | 0 | modules/ui/ui-manager.js |

---

## 三、数据流

### 3.1 用户交互流程

```
用户点击菜单项
    │
    ▼
openPopup() 创建弹窗
    │
    ├── 渲染主顶栏（工具列表）
    │
    ├── 渲染次级顶栏（如有子标签）
    │
    └── 渲染内容区域
         │
         ├── apiPresets → API预设面板
         ├── bypassPanel → 破限词面板
         ├── regexExtract → 正则提取面板
         ├── summaryTool → 摘要工具面板
         └── 其他工具 → 动态渲染
```

### 3.2 工具执行流程

```
事件触发 (GENERATION_ENDED)
    │
    ▼
tool-trigger.js 检测触发条件
    │
    ├── 获取上下文数据
    │
    ├── 正则提取内容
    │
    └── 调用 tool-executor.js
         │
         ├── 获取工具配置
         │
         ├── 构建消息（破限词 + 提示词）
         │
         ├── 调用API
         │
         └── 处理输出结果
```

---

## 四、存储架构

### 4.1 存储优先级

```
优先级1: SillyTavern extensionSettings
├── 同一服务端下所有浏览器一致
├── 通过桥接访问
└── 持久化到酒馆设置文件

优先级2: localStorage
├── 仅本浏览器可用
└── 作为回退方案
```

### 4.2 存储键命名规范

```javascript
// 格式: youyou_toolkit_[功能]_[子键]

// API配置
youyou_toolkit_api_config

// API预设
youyou_toolkit_api_presets

// 正则模板
youyou_toolkit_regex_templates

// 工具配置
youyou_toolkit_tool_configs

// 破限词预设
bypass_presets
current_bypass_preset

// 窗口状态
youyou_toolkit_window_states
```

---

## 五、事件系统

### 5.1 核心事件类型

```javascript
const EVENTS = {
  // 存储事件
  STORAGE_CHANGED: 'storage:changed',
  
  // 预设事件
  PRESET_CREATED: 'preset:created',
  PRESET_UPDATED: 'preset:updated',
  PRESET_DELETED: 'preset:deleted',
  
  // 工具事件
  TOOL_REGISTERED: 'tool:registered',
  TOOL_EXECUTED: 'tool:executed',
  TOOL_UPDATED: 'tool:updated',
  
  // 破限词事件
  BYPASS_PRESET_UPDATED: 'bypass:presetUpdated',
  BYPASS_PRESET_DELETED: 'bypass:presetDeleted',
  
  // UI事件
  UI_RENDER_REQUESTED: 'ui:render'
};
```

### 5.2 事件使用示例

```javascript
import { eventBus, EVENTS } from './core/event-bus.js';

// 订阅事件
eventBus.on(EVENTS.PRESET_UPDATED, (data) => {
  console.log('预设已更新:', data.presetName);
});

// 发送事件
eventBus.emit(EVENTS.PRESET_UPDATED, { presetName: 'GPT-4' });
```

---

## 六、UI组件规范

### 6.1 组件标准接口

```javascript
export const MyPanel = {
  id: 'myPanel',
  
  /**
   * 渲染组件HTML
   * @param {Object} props - 组件属性
   * @returns {string} HTML字符串
   */
  render(props) {
    return `<div class="yyt-my-panel">...</div>`;
  },
  
  /**
   * 渲染到容器
   * @param {jQuery|Element} container - 容器元素
   */
  renderTo(container) {
    const $ = window.jQuery;
    $(container).html(this.render({}));
    this.bindEvents($(container));
  },
  
  /**
   * 绑定事件
   * @param {jQuery} $container - jQuery容器
   */
  bindEvents($container) {
    // 事件绑定逻辑
  },
  
  /**
   * 获取组件样式
   * @returns {string} CSS字符串
   */
  getStyles() {
    return `.yyt-my-panel { ... }`;
  }
};
```

### 6.2 组件目录结构

```
modules/ui/components/
├── api-preset-panel.js      # API预设管理面板
├── bypass-panel.js          # 破限词预设列表面板
├── bypass-editor.js         # 破限词可视化编辑器
├── regex-extract-panel.js   # 正则提取面板
├── summary-tool-panel.js    # 摘要工具面板
├── status-block-panel.js    # 状态栏工具面板
└── tool-manage-panel.js     # 工具管理面板
```

---

## 七、扩展开发

### 7.1 添加新工具

```javascript
// 1. 在 tool-registry.js 中注册工具
registerTool('myTool', {
  id: 'myTool',
  name: '我的工具',
  icon: 'fa-tools',
  description: '工具描述',
  hasSubTabs: true,
  subTabs: [
    { id: 'config', name: '配置', icon: 'fa-cog' },
    { id: 'prompts', name: '提示词', icon: 'fa-file-code' }
  ]
});

// 2. 创建UI组件
// modules/ui/components/my-tool-panel.js
export const MyToolPanel = {
  id: 'myToolPanel',
  render(props) { ... },
  bindEvents($container) { ... },
  getStyles() { ... }
};

// 3. 在 index.js 中添加渲染逻辑
function renderTabContent(tabName) {
  switch (tabName) {
    case 'myTool':
      MyToolPanel.renderTo($content);
      break;
  }
}
```

### 7.2 添加新服务模块

```javascript
// modules/my-service.js

import { storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';

const STORAGE_KEY = 'my_service_data';

export function getData() {
  return storage.get(STORAGE_KEY);
}

export function saveData(data) {
  storage.set(STORAGE_KEY, data);
  eventBus.emit(EVENTS.CUSTOM_EVENT, { data });
}
```

---

## 八、版本信息

| 版本 | 日期 | 主要更新 |
|------|------|----------|
| 0.4.0 | 2026-03-11 | 模块化架构重构、UI组件拆分 |
| 0.3.1 | 2026-03-10 | 破限词可视化编辑器 |
| 0.3.0 | 2026-03-09 | 正则提取模块、UI扩展 |
| 0.2.1 | 2024-03-09 | UI组件改进 |
| 0.2.0 | 2024-03-09 | 模块化重构 |
| 0.1.0 | 2024-03-09 | 初始版本 |

---

## 九、相关文档

- [API 文档](./API_DOCUMENTATION.md)
- [更新日志](./CHANGELOG.md)
- [贡献指南](./CONTRIBUTING.md)
- [扩展开发指南](./EXTENSION_GUIDE.md)