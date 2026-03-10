# YouYou Toolkit 项目架构分析与解耦方案

## 一、项目概述

YouYou Toolkit 是一个 SillyTavern 工具插件框架，包含以下核心功能：
- API连接管理
- 预设管理
- 正则提取
- 工具管理
- 破限词管理
- 窗口系统
- 提示词编辑器

## 二、当前架构分析

### 2.1 模块依赖关系图

```
┌─────────────────────────────────────────────────────────────────┐
│                         index.js (入口层)                        │
│  职责: 模块加载、初始化、弹窗管理、菜单注册、内容渲染            │
└───────────────────────────┬─────────────────────────────────────┘
                            │ 动态加载所有模块
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ui-components.js (UI层 - 问题模块)            │
│  职责: 所有UI渲染、事件绑定                                       │
│  依赖: api-connection, preset-manager, storage, regex-extractor, │
│        tool-manager, bypass-prompts                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┬─────────────────┐
        ▼                   ▼                   ▼                 ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐  ┌─────────────┐
│api-connection │   │preset-manager │   │regex-extractor│  │tool-manager │
│   (服务层)    │   │   (服务层)    │   │   (服务层)    │  │  (服务层)   │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘  └─────────────┘
        │                   │                   │                 │
        └───────────────────┴───────────────────┘                 │
                            ▼                                     │
                    ┌───────────────┐                             │
                    │  storage.js   │◄────────────────────────────┘
                    │   (基础层)    │      (重复实现存储逻辑)
                    └───────────────┘

独立模块:
┌───────────────┐   ┌───────────────┐   ┌───────────────┐  ┌─────────────┐
│tool-executor  │   │ tool-trigger  │   │window-manager │  │tool-registry│
│   (执行引擎)  │   │   (事件触发)  │   │   (窗口管理)  │  │ (工具注册)  │
└───────────────┘   └───────────────┘   └───────────────┘  └─────────────┘

┌───────────────┐   ┌───────────────┐
│bypass-prompts │   │prompt-editor  │
│   (破限词)    │   │  (提示词编辑) │
└───────────────┘   └───────────────┘
```

### 2.2 模块职责分析表

| 模块 | 职责 | 依赖 | 被依赖 | 代码行数 | 耦合度 |
|------|------|------|--------|----------|--------|
| storage.js | 存储后端抽象 | 0 | 3 | ~200 | 低 |
| api-connection.js | API请求发送 | 1 | 1 | ~300 | 低 |
| preset-manager.js | API预设管理 | 1 | 1 | ~400 | 低 |
| regex-extractor.js | 正则提取功能 | 1 | 1 | ~600 | 低 |
| tool-manager.js | 工具定义管理 | 0(自实现) | 1 | ~350 | 中 |
| tool-executor.js | 工具执行引擎 | 0 | 0 | ~400 | 低 |
| tool-trigger.js | 事件触发管理 | 0 | 0 | ~500 | 低 |
| bypass-prompts.js | 破限词管理 | 0(自实现) | 1 | ~300 | 中 |
| window-manager.js | 窗口管理 | 0 | 1 | ~450 | 低 |
| tool-registry.js | 工具注册表 | 0 | 2 | ~300 | 低 |
| prompt-editor.js | 提示词编辑器 | 0 | 2 | ~450 | 低 |
| **ui-components.js** | **UI渲染** | **6** | **1** | **~1200** | **高** |
| **index.js** | **入口/协调** | **12** | **0** | **~600** | **高** |

## 三、识别的耦合问题

### 问题1: ui-components.js 过度耦合 (严重程度: 🔴 高)

**问题描述**:
ui-components.js 是一个"上帝模块"，导入了6个模块，承担了过多职责：
- API配置面板渲染
- 预设管理面板渲染
- 正则提取面板渲染
- 工具管理面板渲染
- 破限词管理面板渲染

**影响**:
- 修改任一服务模块可能影响UI渲染
- UI变更需要修改这个超大文件
- 难以单独测试各功能模块
- 代码可维护性差

**代码证据**:
```javascript
// ui-components.js 顶部导入
import { getApiConfig, updateApiConfig, ... } from './api-connection.js';
import { getAllPresets, getPreset, ... } from './preset-manager.js';
import { loadSettings, saveSettings } from './storage.js';
import { extractTagContent, ... } from './regex-extractor.js';
import { getAllTools, getTool, ... } from './tool-manager.js';
import { getAllBypassPresets, ... } from './bypass-prompts.js';
```

### 问题2: 存储逻辑重复 (严重程度: 🟡 中)

**问题描述**:
多个模块自己实现了独立的存储逻辑，没有统一使用 storage.js：

| 模块 | 存储实现方式 |
|------|-------------|
| storage.js | 提供 getStorage() |
| tool-manager.js | 自己实现 getStorage() |
| bypass-prompts.js | 自己实现 getStorage() |
| tool-registry.js | 直接使用 localStorage |
| window-manager.js | 直接使用 localStorage |

**影响**:
- 代码重复，维护成本高
- 存储逻辑不一致
- 难以统一修改存储策略

**代码证据**:
```javascript
// tool-manager.js 中的 getStorage() - 与 storage.js 重复
function getStorage() {
  try {
    const topWindow = (typeof window.parent !== 'undefined' ? window.parent : window);
    if (topWindow.SillyTavern?.getContext) { ... }
  } catch (e) {}
  return { getItem, setItem, removeItem };
}

// bypass-prompts.js 中也有相同实现
function getStorage() { ... }
```

### 问题3: index.js 职责过重 (严重程度: 🟡 中)

**问题描述**:
index.js 作为入口文件，承担了过多职责：
- 模块动态加载
- 样式注入
- 弹窗管理
- 标签切换逻辑
- 内容渲染逻辑
- 菜单项注册
- 全局状态管理

**影响**:
- 入口文件过于复杂
- 难以理解整体流程
- 修改风险高

**代码证据**:
```javascript
// index.js 中的全局状态
let currentPopup = null;
let currentOverlay = null;
let currentMainTab = 'apiPresets';
let currentSubTab = {};

// index.js 中的渲染函数
function renderTabContent(tabName) { ... }
function renderSubTabContent(mainTab, subTab) { ... }
function renderToolWindow(toolId, $container) { ... }
function renderToolConfig(toolId, $container) { ... }
function renderPromptEditor(toolId, $container) { ... }
function renderToolPresets(toolId, $container) { ... }
```

### 问题4: 模块间隐式耦合 (严重程度: 🟡 中)

**问题描述**:
- index.js 直接访问模块内部函数
- 渲染逻辑分散在 index.js 和 ui-components.js
- 缺少明确的接口定义

**代码证据**:
```javascript
// index.js 直接调用模块内部函数
const toolConfig = toolRegistryModule?.getToolConfig(tabName);
const tool = toolManagerModule?.getTool(toolId);
const apiPresets = presetManagerModule?.getAllPresets() || [];
```

### 问题5: 样式管理混乱 (严重程度: 🟢 低)

**问题描述**:
样式分散在多个地方：
- styles/main.css 外部文件
- index.js 中的 getBaseStyles()
- ui-components.js 中的 getStyles(), getRegexStyles(), getToolStyles()
- window-manager.js 中的 injectWindowStyles()
- prompt-editor.js 中的 getPromptEditorStyles()

**影响**:
- 样式难以统一管理
- 可能存在样式冲突
- 主题定制困难

## 四、解耦方案

### 4.1 整体架构重构方案

```
┌─────────────────────────────────────────────────────────────────┐
│                         index.js (入口层)                        │
│  职责: 应用初始化、依赖注入容器、事件总线注册                    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Core Layer (核心层)                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │EventBus     │  │DIContainer  │  │StorageService│              │
│  │(事件总线)   │  │(依赖注入)   │  │(统一存储)   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Service Layer (服务层)                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ApiService   │  │PresetService│  │RegexService │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ToolService  │  │BypassService│  │TriggerService│             │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│  ┌─────────────┐  ┌─────────────┐                                 │
│  │ExecutorService│ │RegistryService│                             │
│  └─────────────┘  └─────────────┘                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        UI Layer (UI层)                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   UIManager (UI管理器)                   │    │
│  │  职责: 组件注册、渲染调度、样式管理                       │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ApiPresetUI  │  │RegexExtractUI│ │ToolManageUI │              │
│  │(独立组件)   │  │(独立组件)   │  │(独立组件)   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │BypassUI     │  │PromptEditorUI│ │WindowUI     │              │
│  │(独立组件)   │  │(独立组件)   │  │(独立组件)   │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 具体重构步骤

#### 阶段1: 统一存储层 (优先级: 高)

**目标**: 所有模块统一使用 StorageService

**步骤**:
1. 创建 `core/storage-service.js`，提供统一的存储接口
2. 修改 tool-manager.js 使用 StorageService
3. 修改 bypass-prompts.js 使用 StorageService
4. 修改 tool-registry.js 使用 StorageService
5. 修改 window-manager.js 使用 StorageService

**新文件: `core/storage-service.js`**
```javascript
/**
 * 统一存储服务
 * 提供命名空间隔离的存储接口
 */
class StorageService {
  constructor(namespace = 'youyou_toolkit') {
    this.namespace = namespace;
    this._storage = null;
  }

  // 获取存储后端
  _getStorage() { ... }
  
  // 统一API
  get(key) { ... }
  set(key, value) { ... }
  remove(key) { ... }
  clear() { ... }
  
  // 命名空间隔离
  namespaced(namespace) {
    return new StorageService(`${this.namespace}:${namespace}`);
  }
}

// 单例导出
export const storage = new StorageService();
```

#### 阶段2: 事件总线解耦 (优先级: 高)

**目标**: 模块间通过事件通信，而非直接依赖

**新文件: `core/event-bus.js`**
```javascript
/**
 * 事件总线
 * 用于模块间的松耦合通信
 */
class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) { ... }
  off(event, callback) { ... }
  emit(event, data) { ... }
  once(event, callback) { ... }
}

export const eventBus = new EventBus();

// 事件类型定义
export const EVENTS = {
  // 存储事件
  STORAGE_CHANGED: 'storage:changed',
  
  // 预设事件
  PRESET_CREATED: 'preset:created',
  PRESET_UPDATED: 'preset:updated',
  PRESET_DELETED: 'preset:deleted',
  PRESET_ACTIVATED: 'preset:activated',
  
  // 工具事件
  TOOL_REGISTERED: 'tool:registered',
  TOOL_UNREGISTERED: 'tool:unregistered',
  TOOL_EXECUTED: 'tool:executed',
  
  // UI事件
  UI_RENDER_REQUESTED: 'ui:render',
  UI_TAB_CHANGED: 'ui:tabChanged',
  
  // API事件
  API_REQUEST_START: 'api:requestStart',
  API_REQUEST_END: 'api:requestEnd',
  API_ERROR: 'api:error'
};
```

#### 阶段3: 拆分 ui-components.js (优先级: 高)

**目标**: 将大文件拆分为独立UI组件

**新目录结构**:
```
modules/
├── core/
│   ├── storage-service.js  # 统一存储
│   ├── event-bus.js        # 事件总线
│   └── di-container.js     # 依赖注入容器
├── services/
│   ├── api-service.js      # API服务
│   ├── preset-service.js   # 预设服务
│   ├── regex-service.js    # 正则服务
│   ├── tool-service.js     # 工具服务
│   ├── bypass-service.js   # 破限词服务
│   └── trigger-service.js  # 触发服务
├── ui/
│   ├── ui-manager.js       # UI管理器
│   ├── components/
│   │   ├── api-preset-panel.js    # API预设面板
│   │   ├── regex-extract-panel.js # 正则提取面板
│   │   ├── tool-manage-panel.js   # 工具管理面板
│   │   ├── bypass-panel.js        # 破限词面板
│   │   └── prompt-editor-panel.js # 提示词编辑面板
│   └── styles/
│       ├── base.css        # 基础样式
│       ├── components.css  # 组件样式
│       └── themes.css      # 主题样式
└── index.js                # 入口
```

**每个UI组件的标准接口**:
```javascript
// ui/components/api-preset-panel.js
export class ApiPresetPanel {
  constructor(container, dependencies) {
    this.container = container;
    this.apiService = dependencies.apiService;
    this.presetService = dependencies.presetService;
    this.eventBus = dependencies.eventBus;
  }

  render() { ... }
  bindEvents() { ... }
  destroy() { ... }
  
  // 订阅事件
  subscribe() {
    this.eventBus.on(EVENTS.PRESET_UPDATED, this.onPresetUpdated.bind(this));
  }
  
  // 取消订阅
  unsubscribe() {
    this.eventBus.off(EVENTS.PRESET_UPDATED, this.onPresetUpdated.bind(this));
  }
}
```

#### 阶段4: 简化 index.js (优先级: 中)

**目标**: index.js 只负责初始化和协调

**重构后的 index.js**:
```javascript
// index.js - 简化版
import { storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';
import { ServiceContainer } from './core/service-container.js';
import { UIManager } from './ui/ui-manager.js';

class YouYouToolkit {
  constructor() {
    this.services = new ServiceContainer();
    this.ui = new UIManager();
    this.initialized = false;
  }

  async init() {
    // 1. 初始化核心服务
    await this.initServices();
    
    // 2. 初始化UI
    await this.initUI();
    
    // 3. 注册菜单
    this.registerMenu();
    
    this.initialized = true;
  }

  async initServices() {
    // 注册服务
    this.services.register('storage', storage);
    this.services.register('eventBus', eventBus);
    this.services.register('apiService', new ApiService(this.services));
    this.services.register('presetService', new PresetService(this.services));
    // ... 其他服务
  }

  async initUI() {
    this.ui.init({
      container: document.body,
      services: this.services
    });
  }

  registerMenu() {
    // 菜单注册逻辑
  }
}

// 启动
const app = new YouYouToolkit();
app.init();
```

#### 阶段5: 统一样式管理 (优先级: 低)

**目标**: 所有样式集中管理

**方案**:
1. 创建 `styles/` 目录，集中所有样式
2. 使用 CSS 变量管理主题
3. UI组件通过 UIManager 注入样式

## 五、实施优先级

| 阶段 | 任务 | 优先级 | 工作量 | 风险 | 收益 |
|------|------|--------|--------|------|------|
| 1 | 统一存储层 | 🔴 高 | 2天 | 低 | 高 |
| 2 | 事件总线解耦 | 🔴 高 | 1天 | 低 | 高 |
| 3 | 拆分ui-components | 🔴 高 | 3天 | 中 | 高 |
| 4 | 简化index.js | 🟡 中 | 1天 | 中 | 中 |
| 5 | 统一样式管理 | 🟢 低 | 1天 | 低 | 低 |

## 六、风险评估

### 重构风险
1. **功能回归**: 重构可能导致现有功能异常
   - 缓解措施: 编写单元测试，逐步重构

2. **兼容性问题**: 可能影响现有用户配置
   - 缓解措施: 保持存储格式兼容，提供迁移脚本

3. **开发周期长**: 重构需要较长时间
   - 缓解措施: 分阶段实施，每阶段独立可用

### 建议
1. 先完成阶段1和阶段2，建立基础设施
2. 再进行阶段3，逐步拆分 ui-components.js
3. 最后进行阶段4和阶段5的优化

## 七、总结

当前项目存在的主要耦合问题：
1. **ui-components.js 过度耦合** - 需要拆分为独立组件
2. **存储逻辑重复** - 需要统一存储服务
3. **index.js 职责过重** - 需要简化为协调器角色
4. **模块间隐式耦合** - 需要事件总线解耦
5. **样式管理混乱** - 需要统一样式系统

通过实施本方案，可以显著降低模块间耦合度，提高代码可维护性和可测试性。