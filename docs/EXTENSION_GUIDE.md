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

编辑 `index.js` 中的常量定义：

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
│                         index.js (入口层)                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                      Core Layer (核心层)                         │
│  event-bus.js          事件总线                                   │
│  storage-service.js    统一存储服务                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                    Service Layer (服务层)                        │
│  api-connection.js     API连接管理                               │
│  preset-manager.js     预设管理                                   │
│  regex-extractor.js    正则提取                                   │
│  tool-manager.js       工具管理                                   │
│  tool-executor.js      工具执行                                   │
│  tool-registry.js      工具注册                                   │
│  bypass-prompts.js     破限词管理                                 │
│  window-manager.js     窗口管理                                   │
│  prompt-editor.js      提示词编辑器                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                        UI Layer (UI层)                           │
│  ui-components.js      UI组件主模块                               │
│  ui-manager.js         UI管理器                                   │
│  components/           独立UI组件                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 模块职责

| 模块 | 文件 | 功能 |
|------|------|------|
| 主入口 | `index.js` | 弹窗管理、菜单注册、模块协调 |
| 核心层 | `modules/core/` | 事件总线、统一存储 |
| 服务层 | `modules/*.js` | 各类业务服务 |
| UI层 | `modules/ui/` | UI组件与渲染 |

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

### 完整的工具扩展示例

```javascript
// 1. 创建服务模块 (modules/note-service.js)
import { storage } from './core/storage-service.js';

const STORAGE_KEY = 'notes';

export function getNotes() {
  return storage.get(STORAGE_KEY) || [];
}

export function addNote(text) {
  const notes = getNotes();
  notes.push({
    id: Date.now(),
    text,
    createdAt: new Date().toISOString()
  });
  storage.set(STORAGE_KEY, notes);
  return notes;
}

export function deleteNote(id) {
  const notes = getNotes().filter(n => n.id !== id);
  storage.set(STORAGE_KEY, notes);
  return notes;
}

// 2. 创建UI组件 (modules/ui/components/note-panel.js)
import { SCRIPT_ID, escapeHtml } from '../utils.js';
import * as noteService from '../../note-service.js';

export const NotePanel = {
  id: 'notePanel',
  
  render(props) {
    const notes = noteService.getNotes();
    
    return `
      <div class="yyt-note-panel">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-note-sticky"></i>
            <span>笔记管理</span>
          </div>
          
          <div class="yyt-form-row">
            <input type="text" class="yyt-input yyt-flex-1" 
                   id="${SCRIPT_ID}-note-input" placeholder="输入笔记内容...">
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-note-add">
              <i class="fa-solid fa-plus"></i> 添加
            </button>
          </div>
          
          <div class="yyt-note-list">
            ${notes.map(note => `
              <div class="yyt-note-item" data-id="${note.id}">
                <span>${escapeHtml(note.text)}</span>
                <button class="yyt-btn yyt-btn-small yyt-btn-danger" data-action="delete">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },
  
  renderTo(container) {
    const $ = window.jQuery;
    $(container).html(this.render({}));
    this.bindEvents($(container));
  },
  
  bindEvents($container) {
    const $ = window.jQuery;
    
    // 添加笔记
    $container.find(`#${SCRIPT_ID}-note-add`).on('click', () => {
      const $input = $container.find(`#${SCRIPT_ID}-note-input`);
      const text = $input.val().trim();
      if (text) {
        noteService.addNote(text);
        $input.val('');
        this.renderTo($container);
      }
    });
    
    // 删除笔记
    $container.on('click', '[data-action="delete"]', function() {
      const id = $(this).closest('.yyt-note-item').data('id');
      noteService.deleteNote(id);
      NotePanel.renderTo($container);
    });
  },
  
  getStyles() {
    return `
      .yyt-note-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 12px;
      }
      
      .yyt-note-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        background: var(--yyt-surface);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
      }
    `;
  }
};

// 3. 注册工具 (在 index.js 中)
import { registerTool } from './modules/tool-registry.js';
import { NotePanel } from './modules/ui/components/note-panel.js';

registerTool('notes', {
  id: 'notes',
  name: '笔记管理',
  icon: 'fa-note-sticky',
  description: '快速笔记管理工具'
});

// 4. 在 renderTabContent 中添加渲染逻辑
function renderTabContent(tabName) {
  switch (tabName) {
    case 'notes':
      NotePanel.renderTo($content);
      break;
    // ... 其他case
  }
}
```

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
│   ├── ui/                     # UI层
│   │   ├── index.js            # UI模块入口
│   │   ├── ui-manager.js       # UI管理器
│   │   ├── utils.js            # 工具函数
│   │   └── components/         # UI组件
│   │       ├── api-preset-panel.js
│   │       ├── bypass-panel.js
│   │       ├── bypass-editor.js
│   │       ├── regex-extract-panel.js
│   │       ├── summary-tool-panel.js
│   │       ├── status-block-panel.js
│   │       └── tool-manage-panel.js
│   ├── storage.js              # 存储管理
│   ├── api-connection.js       # API连接
│   ├── preset-manager.js       # 预设管理
│   ├── regex-extractor.js      # 正则提取
│   ├── tool-manager.js         # 工具管理
│   ├── tool-executor.js        # 工具执行
│   ├── tool-trigger.js         # 事件触发
│   ├── tool-registry.js        # 工具注册
│   ├── bypass-prompts.js       # 破限词管理
│   ├── window-manager.js       # 窗口管理
│   ├── prompt-editor.js        # 提示词编辑器
│   └── ui-components.js        # UI组件（兼容层）
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