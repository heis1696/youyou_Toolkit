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

### 插件生命周期

```
导入模块 → 注入样式 → 自动初始化 → 注册菜单项 → 等待用户交互
```

### 模块结构

```javascript
// 1. 常量定义
const SCRIPT_ID = 'youyou_toolkit';

// 2. 工具函数
function log(...args) { ... }

// 3. 样式注入
function injectStyles() { ... }

// 4. 弹窗管理
function openPopup() { ... }
function closePopup() { ... }

// 5. 菜单注册
function addMenuItem() { ... }

// 6. 初始化
function init() { ... }

// 7. 导出 API
export default { ... }

// 8. 自动初始化
init();
```

---

## 添加新功能

### 示例 1：添加一个简单的按钮

修改 `openPopup()` 函数中的弹窗内容：

```javascript
const popupHtml = `
  <div class="yyt-popup" id="${POPUP_ID}">
    <div class="yyt-popup-header">
      <div class="yyt-popup-title">
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        <span>我的工具箱</span>
      </div>
      <button class="yyt-popup-close" title="关闭">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>
    <div class="yyt-popup-body">
      <!-- 新增功能区域 -->
      <div class="yyt-section">
        <h3>快速操作</h3>
        <div class="yyt-button-group">
          <button class="yyt-btn yyt-btn-primary" id="btn-action1">
            操作一
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="btn-action2">
            操作二
          </button>
        </div>
      </div>
    </div>
    <div class="yyt-popup-footer">
      <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-close-btn">关闭</button>
    </div>
  </div>
`;

// 绑定按钮事件
$(currentPopup).find('#btn-action1').on('click', () => {
  alert('操作一被点击！');
});
```

### 示例 2：添加设置面板

```javascript
// 在弹窗内容中添加设置区域
const settingsHtml = `
  <div class="yyt-settings">
    <div class="yyt-setting-item">
      <label>设置项 1</label>
      <input type="checkbox" id="setting1" />
    </div>
    <div class="yyt-setting-item">
      <label>设置项 2</label>
      <input type="text" id="setting2" class="text_pole" />
    </div>
  </div>
`;

// 保存设置
function saveSettings() {
  const setting1 = $(currentPopup).find('#setting1').is(':checked');
  const setting2 = $(currentPopup).find('#setting2').val();
  
  localStorage.setItem('my_plugin_settings', JSON.stringify({
    setting1,
    setting2
  }));
}

// 加载设置
function loadSettings() {
  const saved = localStorage.getItem('my_plugin_settings');
  if (saved) {
    const settings = JSON.parse(saved);
    $(currentPopup).find('#setting1').prop('checked', settings.setting1);
    $(currentPopup).find('#setting2').val(settings.setting2);
  }
}
```

### 示例 3：调用 SillyTavern API

```javascript
// 获取当前角色信息
async function getCurrentCharacter() {
  const context = window.SillyTavern?.getContext?.();
  if (!context) return null;
  
  const charId = context.characterId;
  const characters = context.characters;
  return characters?.[charId];
}

// 发送消息
async function sendMessage(text) {
  if (window.TavernHelper?.generate) {
    await window.TavernHelper.generate({ user_input: text });
  }
}

// 显示提示
function showToast(message, type = 'info') {
  if (window.toastr) {
    window.toastr[type](message);
  } else {
    alert(message);
  }
}
```

---

## 样式定制

### 添加自定义样式

在 `injectStyles()` 函数中添加：

```javascript
const css = `
  /* 原有样式... */
  
  /* 自定义样式 */
  .yyt-section {
    margin-bottom: 20px;
  }
  
  .yyt-section h3 {
    margin: 0 0 10px 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .yyt-button-group {
    display: flex;
    gap: 10px;
  }
  
  .yyt-setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .yyt-setting-item label {
    color: rgba(255, 255, 255, 0.7);
  }
`;
```

### 使用 SillyTavern CSS 变量

```css
.yyt-btn-primary {
  background: var(--accent-color, #7bb7ff);
  color: var(--text-color, #fff);
}

.yyt-popup {
  background: var(--body-bg, #0b0f15);
  border-color: var(--border-color, rgba(255, 255, 255, 0.15));
}
```

---

## 最佳实践

### 1. 错误处理

```javascript
async function safeOperation() {
  try {
    // 你的代码
    await someAsyncOperation();
  } catch (error) {
    logError('操作失败:', error);
    // 显示友好的错误信息
    showToast('操作失败，请重试', 'error');
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

// 使用
const debouncedSearch = debounce(search, 300);
input.on('input', debouncedSearch);
```

### 3. 内存管理

```javascript
// 在关闭弹窗时清理事件监听
function closePopup() {
  if (currentPopup) {
    // 移除所有事件监听
    $(currentPopup).find('*').off();
    currentPopup.remove();
    currentPopup = null;
  }
  // ... 其他清理
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
    logError('兼容性检查失败:', errors);
    return;
  }
  
  // 正常初始化...
}
```

---

## 示例项目

### 完整的功能模块示例

```javascript
// 在 index.js 中添加以下代码

// ==================== 新增功能：快速备注 ====================

const STORAGE_KEY_NOTES = `${SCRIPT_ID}_notes`;

function getNotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_NOTES) || '[]');
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
}

function addNote(text) {
  const notes = getNotes();
  notes.push({
    id: Date.now(),
    text,
    createdAt: new Date().toISOString()
  });
  saveNotes(notes);
  renderNotes();
}

function deleteNote(id) {
  const notes = getNotes().filter(n => n.id !== id);
  saveNotes(notes);
  renderNotes();
}

function renderNotes() {
  const $ = topLevelWindow.jQuery || window.jQuery;
  const notes = getNotes();
  
  const notesContainer = $(currentPopup).find('.yyt-notes-list');
  notesContainer.empty();
  
  notes.forEach(note => {
    notesContainer.append(`
      <div class="yyt-note-item" data-id="${note.id}">
        <span>${escapeHtml(note.text)}</span>
        <button class="yyt-btn yyt-btn-secondary yyt-note-delete">删除</button>
      </div>
    `);
  });
}

// 修改 openPopup() 添加备注功能区域
const notesHtml = `
  <div class="yyt-section">
    <h3>📝 快速备注</h3>
    <div class="yyt-input-group">
      <input type="text" id="note-input" class="text_pole" placeholder="输入备注内容...">
      <button class="yyt-btn yyt-btn-primary" id="add-note-btn">添加</button>
    </div>
    <div class="yyt-notes-list"></div>
  </div>
`;

// 在绑定事件时
$(currentPopup).find('#add-note-btn').on('click', () => {
  const text = $(currentPopup).find('#note-input').val().trim();
  if (text) {
    addNote(text);
    $(currentPopup).find('#note-input').val('');
  }
});

$(currentPopup).on('click', '.yyt-note-delete', function() {
  const id = $(this).closest('.yyt-note-item').data('id');
  deleteNote(id);
});

// 在弹窗打开后渲染
renderNotes();
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

// 检查菜单项
document.querySelector('#youyou_toolkit-menu-item');
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
2. 搜索 [GitHub Issues](https://github.com/heis1696/youyou_Toolkit/issues)
3. 提交新的 Issue 描述你的问题