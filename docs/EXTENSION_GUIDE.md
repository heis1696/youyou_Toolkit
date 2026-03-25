# 扩展开发指南

本指南将帮助你基于 YouYou Toolkit 框架开发自己的功能模块。

## 目录

1. [快速开始](#快速开始)
2. [核心概念](#核心概念)
3. [添加新功能](#添加新功能)
4. [样式定制](#样式定制)
5. [最佳实践](#最佳实践)
6. [示例项目](#示例项目)

---

## 快速开始

### 1. 获取源码

```bash
git clone https://github.com/heis1696/youyou_Toolkit.git
cd youyou_Toolkit
npm install
```

### 2. 修改基本信息

如果你准备把当前仓库 fork 成一个独立插件，可以修改 `index.js` 中的常量定义：

```javascript
const SCRIPT_ID = 'your_plugin_id';        // 你的插件ID
const SCRIPT_VERSION = '1.0.0';             // 版本号
const POPUP_ID = `${SCRIPT_ID}-popup`;
const MENU_ITEM_ID = `${SCRIPT_ID}-menu-item`;
```

### 3. 构建测试

```bash
npm run build
```

---

## 核心概念

### 插件架构

YouYou Toolkit 采用分层模块化架构设计：

```
┌─────────────────────────────────────────────────────────────────┐
│                    index.js (薄入口 / 全局挂载)                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                      App Layer (应用装配层)                       │
│  bootstrap.js          模块加载 / 主题恢复 / 菜单注册             │
│  popup-shell.js        主工具箱弹窗与主/子标签路由               │
│  public-api.js         对外 API 门面                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                      Core Layer (核心层)                         │
│  event-bus.js          事件总线                                   │
│  storage-service.js    统一存储服务                               │
│  settings-service.js   全局设置服务                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                    Service Layer (服务层)                        │
│  api-connection.js     API连接管理                               │
│  preset-manager.js     预设管理                                   │
│  regex-extractor.js    规则/标签提取                               │
│  tool-manager.js       定义层工具管理                             │
│  tool-registry.js      运行态工具主模型                           │
│  tool-trigger.js       自动触发入口层                             │
│  tool-output-service.js 自动工具链直接执行层                      │
│  tool-prompt-service.js 提示词与消息构建                           │
│  context-injector.js   最新 AI 楼层写回                           │
│  tool-executor.js      调度/批处理/兼容执行入口（非自动主链直依赖） │
│  bypass-manager.js     破限词管理                                 │
│  variable-resolver.js  变量解析                                   │
│  window-manager.js     独立窗口扩展能力                           │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                        UI Layer (UI层)                           │
│  ui/index.js           UI主装配入口                               │
│  ui-manager.js         UI生命周期与样式聚合管理器                 │
│  ui-components.js      UI兼容层（按需加载）                        │
│  components/           独立UI组件                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 模块职责

| 模块 | 文件 | 功能 |
|------|------|------|
| 主入口 | `index.js` | 薄入口、上下文装配、全局挂载 |
| 应用装配层 | `modules/app/*` | bootstrap / popup shell / public API |
| 核心层 | `modules/core/` | 事件总线、统一存储 |
| 服务层 | `modules/*.js` | 各类业务服务 |
| UI层 | `modules/ui/` | UI主装配入口、组件生命周期与渲染 |

### 插件生命周期

```
导入模块 → 注入样式 → 自动初始化 → 注册菜单项 → 等待用户交互
```

---

## 添加新功能

### 示例 1：添加新的UI组件

在 `modules/ui/components/` 目录下创建新组件：

```javascript
// modules/ui/components/my-panel.js

import { SCRIPT_ID, escapeHtml } from '../utils.js';

/**
 * 我的面板组件
 */
export const MyPanel = {
  id: 'myPanel',
  
  /**
   * 渲染组件HTML
   */
  render(props) {
    const { title = '我的面板' } = props;
    
    return `
      <div class="yyt-my-panel">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-star"></i>
            <span>${escapeHtml(title)}</span>
          </div>
          
          <div class="yyt-form-group">
            <label>输入内容</label>
            <input type="text" class="yyt-input" id="${SCRIPT_ID}-my-input" 
                   placeholder="请输入...">
          </div>
          
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-my-submit">
            <i class="fa-solid fa-check"></i> 提交
          </button>
        </div>
      </div>
    `;
  },
  
  /**
   * 渲染到容器
   */
  renderTo(container) {
    const $ = window.jQuery;
    if (!$) return;
    
    $(container).html(this.render({}));
    this.bindEvents($(container));
  },
  
  /**
   * 绑定事件
   */
  bindEvents($container) {
    const $ = window.jQuery;
    
    $container.find(`#${SCRIPT_ID}-my-submit`).on('click', () => {
      const value = $container.find(`#${SCRIPT_ID}-my-input`).val();
      console.log('提交:', value);
    });
  },
  
  /**
   * 获取样式
   */
  getStyles() {
    return `
      .yyt-my-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    `;
  }
};

export default MyPanel;
```

### 示例 2：注册新工具

使用工具注册系统添加新工具：

```javascript
// 在 index.js 中或单独的初始化文件中
import { registerTool } from './modules/tool-registry.js';

// 注册工具
registerTool('myTool', {
  id: 'myTool',
  name: '我的工具',
  icon: 'fa-star',
  description: '这是一个自定义工具',
  hasSubTabs: true,
  subTabs: [
    { id: 'config', name: '配置', icon: 'fa-cog' },
    { id: 'history', name: '历史', icon: 'fa-clock' }
  ],
  apiPreset: '',           // 绑定的API预设名称
  bypassPreset: '',        // 绑定的破限词预设名称
  enabled: true
});
```

### 示例 2.1：通过工具管理面板创建自定义工具

如果你不想手写注册代码，也可以直接在工具箱 UI 中通过“工具列表 -> 新建工具”创建一个自定义工具。

新建后的工具会：

- 自动出现在“工具”主页签下的子工具列表中
- 自动复用统一的工具配置面板
- 支持配置模板、输出模式、API 预设、破限预设、提取标签/正则以及“测试提取”与“立即执行一次”

这意味着：**内置工具与自定义工具现在走的是同一条配置链路**，适合先在 UI 中快速试验，再决定是否升级为代码级内置工具。

### 示例 3：添加服务模块

创建新的服务模块：

```javascript
// modules/my-service.js

import { storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';

const STORAGE_KEY = 'my_service_data';

/**
 * 获取数据
 */
export function getData() {
  return storage.get(STORAGE_KEY) || {};
}

/**
 * 保存数据
 */
export function saveData(data) {
  storage.set(STORAGE_KEY, data);
  eventBus.emit(EVENTS.STORAGE_CHANGED, { key: STORAGE_KEY });
}

/**
 * 处理数据
 */
export function processData(input) {
  // 业务逻辑
  return { result: input };
}

export default {
  getData,
  saveData,
  processData
};
```

### 示例 4：使用事件总线

```javascript
import { eventBus, EVENTS } from './core/event-bus.js';

// 订阅事件
eventBus.on(EVENTS.PRESET_UPDATED, (data) => {
  console.log('预设已更新:', data.presetName);
});

// 发送事件
eventBus.emit(EVENTS.PRESET_UPDATED, { 
  presetName: 'GPT-4',
  config: { model: 'gpt-4' }
});

// 一次性订阅
eventBus.once(EVENTS.TOOL_EXECUTED, (data) => {
  console.log('工具执行完成:', data.toolId);
});

// 取消订阅
const handler = (data) => console.log(data);
eventBus.on(EVENTS.STORAGE_CHANGED, handler);
eventBus.off(EVENTS.STORAGE_CHANGED, handler);
```

---

## 样式定制

### 使用CSS变量

项目定义了以下CSS变量：

```css
:root {
  /* 颜色 */
  --yyt-accent: #7bb7ff;           /* 主题色 */
  --yyt-accent-glow: rgba(123, 183, 255, 0.4);
  --yyt-success: #4ade80;          /* 成功色 */
  --yyt-error: #f87171;            /* 错误色 */
  --yyt-warning: #fbbf24;          /* 警告色 */
  
  /* 表面 */
  --yyt-surface: rgba(255, 255, 255, 0.03);
  --yyt-surface-hover: rgba(255, 255, 255, 0.06);
  --yyt-surface-active: rgba(255, 255, 255, 0.08);
  
  /* 边框 */
  --yyt-border: rgba(255, 255, 255, 0.08);
  --yyt-border-strong: rgba(255, 255, 255, 0.15);
  
  /* 文字 */
  --yyt-text: rgba(255, 255, 255, 0.95);
  --yyt-text-secondary: rgba(255, 255, 255, 0.7);
  --yyt-text-muted: rgba(255, 255, 255, 0.45);
  
  /* 圆角 */
  --yyt-radius: 12px;
  --yyt-radius-sm: 8px;
}
```

### 组件样式示例

```javascript
// 在组件的 getStyles() 方法中
getStyles() {
  return `
    .yyt-my-component {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: var(--yyt-radius);
      background: var(--yyt-surface);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
    }
    
    .yyt-my-component .title {
      color: var(--yyt-text);
      font-weight: 600;
    }
    
    .yyt-my-component .btn-primary {
      background: var(--yyt-accent);
      color: #0b0f15;
    }
  `;
}
```

---

## 最佳实践

### 1. 错误处理

```javascript
async function safeOperation() {
  try {
    const result = await someAsyncOperation();
    return { success: true, data: result };
  } catch (error) {
    console.error(`[${SCRIPT_ID}] 操作失败:`, error);
    return { success: false, error: error.message };
  }
}
```

### 2. 防抖和节流

```javascript
// 防抖
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 节流
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用
const debouncedSearch = debounce(search, 300);
input.on('input', debouncedSearch);
```

### 3. 内存管理

```javascript
// 在组件销毁时清理
function destroy() {
  // 移除事件监听
  eventBus.off(EVENTS.MY_EVENT, myHandler);
  
  // 清理DOM引用
  $container.find('*').off();
  $container.empty();
  
  // 清理定时器
  clearTimeout(myTimer);
}
```

### 4. 兼容性检查

```javascript
function checkCompatibility() {
  const errors = [];
  
  if (!window.jQuery && !window.$) {
    errors.push('jQuery 未找到');
  }
  
  if (!window.SillyTavern) {
    errors.push('SillyTavern 未找到');
  }
  
  return errors.length === 0 ? null : errors;
}

async function init() {
  const errors = checkCompatibility();
  if (errors) {
    console.error('兼容性检查失败:', errors);
    return;
  }
  
  // 正常初始化...
}
```

---

## 示例项目

### 当前推荐扩展路径

当前架构下，不再推荐通过修改 `index.js` 里的 `renderTabContent()` 之类旧入口，把新页面硬插进去。更推荐以下两条路径：

#### 路径 A：先通过 UI 创建自定义工具

适合大多数“模板 + API 预设 + 提取规则 + 手动执行/自动触发”类型的扩展需求。

1. 打开工具箱
2. 进入 **工具列表**
3. 新建一个自定义工具
4. 在 **工具** 页签中继续配置 `promptTemplate`、输出模式、API 预设、破限词与提取规则

这条路径的优点是：

- 不需要手写新的 popup 路由
- 自动复用统一工具配置面板
- 自动接入运行态诊断与自动触发链

#### 路径 B：代码级新增服务 + UI 组件

适合需要单独业务面板，而不是统一工具配置面的场景。

建议结构：

1. 在 `modules/` 下新增业务服务模块
2. 在 `modules/ui/components/` 下新增组件
3. 在 `modules/ui/index.js` 中注册组件并提供渲染 helper
4. 如确有必要，再通过 `tool-registry.js` 暴露新的顶层入口

也就是说，当前主路径应优先围绕：

```text
modules/app/popup-shell.js
  -> modules/ui/index.js
    -> modules/ui/components/*
```

而不是继续把页面装配逻辑写回 `index.js`。

### compatibility / legacy 模块说明

当前以下模块仍然保留，但不建议作为新扩展的首选入口：

- `modules/ui-components.js`
- `modules/prompt-editor.js`
- `modules/tool-executor.js` 中的 legacy 执行函数
- `modules/storage.js`

其中 `modules/storage.js` 当前已经明确降级为**旧存储 API 兼容适配层**；如果你在开发新扩展，请优先使用：

```javascript
import { storage } from './modules/core/storage-service.js';
```

而不是继续围绕 `loadSettings()` / `saveSettings()` 之类旧接口构建新功能。

如果你是在维护旧扩展，而不是开发新扩展，建议先显式调用：

```javascript
await YouYouToolkit.loadLegacyModule('uiComponentsModule');
await YouYouToolkit.loadLegacyModule('promptEditorModule');
```

再访问对应 compatibility API，而不是继续假设这些模块一定会在启动期常驻装载。

---

## 调试技巧

### 启用调试日志

```javascript
const DEBUG = true;

function log(...args) {
  if (DEBUG) {
    console.log(`[${SCRIPT_ID}]`, ...args);
  }
}
```

### 使用浏览器开发工具

1. 打开 SillyTavern
2. 按 F12 打开开发者工具
3. 在 Console 中测试 API：

```javascript
// 测试插件是否加载
console.log(window.YouYouToolkit);

// 测试打开弹窗
window.YouYouToolkit.openPopup();

// 测试获取预设
window.YouYouToolkit.getPresets().then(console.log);

// 测试注册工具
window.YouYouToolkit.registerTool('test', {
  id: 'test',
  name: '测试工具',
  icon: 'fa-flask'
});
```

---

## 目录结构

```
youyou_Toolkit/
├── index.js                    # 主入口文件
├── package.json                # 项目配置
├── README.md                   # 项目说明
├── modules/                    # 模块目录
│   ├── core/                   # 核心层
│   │   ├── event-bus.js        # 事件总线
│   │   ├── storage-service.js  # 存储服务
│   │   └── index.js            # 核心模块入口
│   ├── app/                    # 应用装配层
│   │   ├── bootstrap.js
│   │   ├── popup-shell.js
│   │   └── public-api.js
│   ├── ui/                     # UI层
│   │   ├── index.js            # UI模块入口
│   │   ├── ui-manager.js       # UI管理器
│   │   ├── utils.js            # 工具函数
│   │   └── components/         # UI组件
│   │       ├── api-preset-panel.js
│   │       ├── bypass-panel.js
│   │       ├── regex-extract-panel.js
│   │       ├── tool-config-panel-factory.js
│   │       ├── summary-tool-panel.js
│   │       ├── status-block-panel.js
│   │       └── tool-manage-panel.js
│   ├── storage.js              # 旧存储 API 兼容适配层
│   ├── api-connection.js       # API连接
│   ├── preset-manager.js       # 预设管理
│   ├── regex-extractor.js      # 规则/标签提取
│   ├── tool-manager.js         # 工具管理
│   ├── tool-executor.js        # 调度/兼容执行
│   ├── tool-trigger.js         # 事件触发
│   ├── tool-output-service.js  # 自动工具链直接执行层
│   ├── tool-prompt-service.js  # 提示词构建
│   ├── context-injector.js     # 最新楼层写回
│   ├── variable-resolver.js    # 变量解析
│   ├── tool-registry.js        # 工具注册
│   ├── bypass-manager.js       # 破限词管理
│   ├── window-manager.js       # 窗口管理
│   ├── prompt-editor.js        # 兼容提示词编辑器
│   └── ui-components.js        # UI兼容层
├── styles/
│   └── main.css                # 主样式文件
├── docs/                       # 文档目录
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE_ANALYSIS.md
│   ├── CHANGELOG.md
│   ├── CONTRIBUTING.md
│   └── EXTENSION_GUIDE.md
├── Reference/                  # 参考资料
└── dist/                       # 构建输出
    └── bundle.js
```

---

## 更多资源

- [SillyTavern 官方文档](https://docs.sillytavern.app/)
- [SillyTavern 扩展开发](https://docs.sillytavern.app/for-contributors/)
- [jQuery 文档](https://jquery.com/)

---

## 需要帮助？

如果你在开发过程中遇到问题，可以：

1. 查看 [API 文档](./API_DOCUMENTATION.md)
2. 查看 [架构文档](./ARCHITECTURE_ANALYSIS.md)
3. 搜索 [GitHub Issues](https://github.com/heis1696/youyou_Toolkit/issues)
4. 提交新的 Issue 描述你的问题