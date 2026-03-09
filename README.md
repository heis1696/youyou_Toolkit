# YouYou Toolkit - SillyTavern 工具插件

一个轻量级的 SillyTavern 工具插件框架，用于在魔棒区注册自定义工具入口。

## 功能特点

- ✅ 在 SillyTavern 底部魔棒区注册插件入口
- ✅ 点击后弹出独立窗口
- ✅ 支持 ES Module 方式导入
- ✅ 模块化设计，易于扩展

## 安装方法

### 方法一：通过酒馆助手脚本库导入（推荐）

在酒馆助手的脚本库中添加以下代码：

```javascript
import 'https://your-cdn-url/path/to/bundle.js'
```

或者如果你有自己的托管地址：

```javascript
import 'https://testingcf.jsdelivr.net/gh/your-username/youyou_Toolkit@main/index.js'
```

### 方法二：作为 Tampermonkey 脚本安装

1. 安装 Tampermonkey 浏览器扩展
2. 创建新脚本，添加以下头部信息：

```javascript
// ==UserScript==
// @name         YouYou Toolkit
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @match        */*
// @grant        none
// ==/UserScript==
```

3. 将 `index.js` 的内容复制粘贴进去
4. 保存并启用脚本

### 方法三：本地开发

1. 克隆或下载本项目
2. 在本地运行一个 HTTP 服务器
3. 在酒馆助手脚本库中导入本地地址

## 使用方法

1. 打开 SillyTavern
2. 点击底部的 **魔棒图标** (🪄)
3. 在弹出的菜单中找到 **"YouYou 工具箱"**
4. 点击即可打开工具窗口

## 项目结构

```
youyou_Toolkit/
├── index.js              # 主脚本文件 (ES Module)
├── README.md             # 说明文档
└── Reference/            # 参考资料
    └── shujuku-main/     # 参考项目 (数据库插件)
```

## 开发指南

### API 接口

插件导出了以下 API 供外部调用：

```javascript
// 导入插件
import YouYouToolkit from './index.js';

// API 列表
YouYouToolkit.version    // 版本号
YouYouToolkit.id         // 插件ID
YouYouToolkit.init()     // 初始化插件
YouYouToolkit.openPopup()   // 打开弹窗
YouYouToolkit.closePopup()  // 关闭弹窗
YouYouToolkit.addMenuItem() // 添加菜单项
```

### 扩展开发

要添加新功能，可以在 `openPopup()` 函数中的 `.yyt-popup-body` 部分添加自定义内容：

```javascript
const popupHtml = `
  <div class="yyt-popup" id="${POPUP_ID}">
    <div class="yyt-popup-header">...</div>
    <div class="yyt-popup-body">
      <!-- 在这里添加你的功能模块 -->
      <div class="your-feature">
        <h3>新功能</h3>
        <button class="yyt-btn yyt-btn-primary" onclick="yourFunction()">执行</button>
      </div>
    </div>
    <div class="yyt-popup-footer">...</div>
  </div>
`;
```

### 构建打包

```bash
# 1. 安装依赖
npm install

# 2. 构建（生成压缩后的 ESM 格式）
npm run build

# 其他构建命令：
# npm run build:dev  # 开发模式（不压缩）
# npm run build:iife # 生成 IIFE 格式（用于 script 标签引入）
# npm run watch      # 监听文件变化自动构建
```

构建完成后，`dist/bundle.js` 就是打包好的文件。

### 部署到 CDN

推荐使用 jsDelivr 托管在 GitHub 仓库中的文件：

1. 将 `dist/bundle.js` 推送到 GitHub 仓库
2. 使用 jsDelivr URL 格式：
   ```
   https://testingcf.jsdelivr.net/gh/用户名/仓库名@版本号/dist/bundle.js
   ```

## 核心实现

### 魔棒区注册入口

```javascript
function addMenuItem() {
  // 查找魔棒菜单
  const extensionsMenu = $('#extensionsMenu', parentDoc);

  // 创建菜单项
  const menuItemHtml = `
    <div class="list-group-item flex-container flexGap5 interactable">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou 工具箱</span>
    </div>
  `;

  // 添加到魔棒菜单
  extensionsMenu.append($menuContainer);
}
```

### 弹窗系统

```javascript
function openPopup() {
  // 创建遮罩层
  currentOverlay = document.createElement('div');
  currentOverlay.className = 'yyt-popup-overlay';
  
  // 创建弹窗
  currentPopup = document.createElement('div');
  currentPopup.className = 'yyt-popup';
  // ... 设置弹窗内容
  
  document.body.appendChild(currentOverlay);
  document.body.appendChild(currentPopup);
}
```

## 样式定制

所有样式都通过 `injectStyles()` 函数注入。主要样式类：

| 类名 | 用途 |
|------|------|
| `.yyt-popup-overlay` | 遮罩层 |
| `.yyt-popup` | 弹窗容器 |
| `.yyt-popup-header` | 弹窗头部 |
| `.yyt-popup-body` | 弹窗内容区 |
| `.yyt-popup-footer` | 弹窗底部 |
| `.yyt-btn` | 按钮样式 |
| `.yyt-btn-primary` | 主要按钮 |
| `.yyt-btn-secondary` | 次要按钮 |

## 参考资料

本项目参考了 [shujuku-main](./Reference/shujuku-main/) 项目的实现方式。

## 版本历史

### v0.1.0 (2024-03-09)
- 初始版本
- 实现魔棒区菜单项注册
- 实现基础弹窗框架
- 支持 ES Module 导入方式

## 许可证

MIT License

## 作者

YouYou