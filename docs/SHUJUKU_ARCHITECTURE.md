# 神·数据库（shujuku）项目架构文档

## 一、项目概述

**神·数据库（shujuku）** 是一个功能强大的SillyTavern用户脚本插件，版本 **1.1**，采用单文件架构（`index.js`，约1.1MB）。

### 核心定位
为SillyTavern提供一个完整的数据管理和剧情推进系统，支持多角色数据隔离、自动填表、世界书注入等功能。

### 技术特征
- **脚本类型**: Tampermonkey/Greasemonkey 用户脚本
- **代码规模**: 单文件约1.1MB，约20000+行代码
- **依赖库**: jQuery 3.7.1, Toastr.js（可选，复用SillyTavern内置）
- **存储策略**: SillyTavern服务端设置优先，IndexedDB本地副本回退

---

## 二、整体架构

### 2.1 架构图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         index.js (单文件入口)                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         用户脚本元数据区                                  ││
│  │  @name, @namespace, @version, @match, @grant 等                          ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                              │                                              │
│  ┌───────────────────────────┼───────────────────────────────────────────┐  │
│  │                           ▼                                           │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │                    常量与配置层                                   │  │  │
│  │  │  UNIQUE_SCRIPT_ID, DEBUG_MODE, STORAGE_KEY_*, DEFAULT_*_ACU     │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │                              │                                        │  │
│  │  ┌───────────────────────────┼───────────────────────────────────┐    │  │
│  │  │                           ▼                                   │    │  │
│  │  │  ┌─────────────────────────────────────────────────────────┐  │    │  │
│  │  │  │                独立窗口系统                               │  │    │  │
│  │  │  │  ACU_WindowManager, createACUWindow, closeACUWindow     │  │    │  │
│  │  │  └─────────────────────────────────────────────────────────┘  │    │  │
│  │  │                              │                                │    │  │
│  │  │  ┌───────────────────────────┼────────────────────────────┐  │    │  │
│  │  │  │                           ▼                            │  │    │  │
│  │  │  │  ┌──────────────────────────────────────────────────┐  │  │    │  │
│  │  │  │  │               存储服务层                          │  │  │    │  │
│  │  │  │  │  - Tavern设置桥接 (initTavernSettingsBridge_ACU)  │  │  │    │  │
│  │  │  │  │  - IndexedDB本地副本 (configIdbCache_ACU)        │  │  │    │  │
│  │  │  │  │  - Profile隔离存储                               │  │  │    │  │
│  │  │  │  └──────────────────────────────────────────────────┘  │  │    │  │
│  │  │  │                           │                            │  │    │  │
│  │  │  │  ┌────────────────────────┼────────────────────────┐  │  │    │  │
│  │  │  │  │                        ▼                        │  │  │    │  │
│  │  │  │  │  ┌──────────────────────────────────────────┐   │  │  │    │  │
│  │  │  │  │  │            核心业务逻辑层                  │   │  │  │    │  │
│  │  │  │  │  │  - 表格数据管理 (TABLE_TEMPLATE_ACU)      │   │  │  │    │  │
│  │  │  │  │  │  - API连接管理 (apiConfig)               │   │  │  │    │  │
│  │  │  │  │  │  - 剧情推进 (plotSettings)               │   │  │  │    │  │
│  │  │  │  │  │  - 世界书注入 (updateWorldbook_*)        │   │  │  │    │  │
│  │  │  │  │  │  - 自动填表 (proceedWithCardUpdate_ACU)  │   │  │  │    │  │
│  │  │  │  │  └──────────────────────────────────────────┘   │  │  │    │  │
│  │  │  │  │                        │                        │  │  │    │  │
│  │  │  │  │  ┌─────────────────────┼────────────────────┐  │  │  │    │  │
│  │  │  │  │  │                     ▼                    │  │  │  │    │  │
│  │  │  │  │  │  ┌────────────────────────────────────┐  │  │  │  │    │  │
│  │  │  │  │  │  │           外部API接口层             │  │  │  │  │    │  │
│  │  │  │  │  │  │  window.AutoCardUpdaterAPI = {...} │  │  │  │  │    │  │
│  │  │  │  │  │  └────────────────────────────────────┘  │  │  │  │    │  │
│  │  │  │  │  └──────────────────────────────────────────┘  │  │  │    │  │
│  │  │  │  └────────────────────────────────────────────────┘  │  │    │  │
│  │  │  └──────────────────────────────────────────────────────┘  │    │  │
│  │  └────────────────────────────────────────────────────────────┘    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 代码组织结构

由于是单文件架构，代码按功能区块组织：

```javascript
// ==UserScript==
// @name         数据库-可定制副本
// @version      1.1
// ==/UserScript==

(function () {
  'use strict';
  
  // ═══════════════════════════════════════════════════════════════
  // 第一区：常量与配置
  // ═══════════════════════════════════════════════════════════════
  const UNIQUE_SCRIPT_ID = 'shujuku_v299';
  const SCRIPT_ID_PREFIX_ACU = UNIQUE_SCRIPT_ID;
  const DEBUG_MODE_ACU = true;
  // ... 存储键常量
  // ... 默认值常量
  
  // ═══════════════════════════════════════════════════════════════
  // 第二区：独立窗口系统
  // ═══════════════════════════════════════════════════════════════
  const ACU_WindowManager = { ... };
  function injectACUWindowStyles() { ... }
  function createACUWindow(options) { ... }
  function closeACUWindow(id) { ... }
  
  // ═══════════════════════════════════════════════════════════════
  // 第三区：存储服务
  // ═══════════════════════════════════════════════════════════════
  // 酒馆设置桥接
  async function initTavernSettingsBridge_ACU() { ... }
  function getConfigStorage_ACU() { ... }
  
  // IndexedDB本地副本
  function openConfigDb_ACU() { ... }
  function configIdbGetCached_ACU(key) { ... }
  function configIdbSetCached_ACU(key, value) { ... }
  
  // Profile管理
  function getIsolationSlot_ACU(code) { ... }
  function switchIsolationProfile_ACU(newCodeRaw) { ... }
  
  // ═══════════════════════════════════════════════════════════════
  // 第四区：核心业务逻辑
  // ═══════════════════════════════════════════════════════════════
  // 模板管理
  function loadTemplateFromStorage_ACU() { ... }
  function parseTableTemplateJson_ACU() { ... }
  
  // 设置管理
  function buildDefaultSettings_ACU() { ... }
  function loadSettings_ACU() { ... }
  function saveSettings_ACU() { ... }
  
  // API管理
  function saveApiConfig_ACU() { ... }
  function callCustomOpenAI_ACU() { ... }
  
  // 剧情推进
  function triggerPlotAdvance_ACU() { ... }
  function startAutoLoop_ACU() { ... }
  
  // 自动填表
  function proceedWithCardUpdate_ACU() { ... }
  function triggerAutomaticUpdateIfNeeded_ACU() { ... }
  
  // 世界书注入
  function updateWorldbookEntries_ACU() { ... }
  function buildReadableEntry_ACU() { ... }
  
  // ═══════════════════════════════════════════════════════════════
  // 第五区：UI渲染
  // ═══════════════════════════════════════════════════════════════
  function buildPopupHtml_ACU() { ... }
  function renderTableGrid_ACU() { ... }
  function renderSheetEditor_ACU() { ... }
  
  // ═══════════════════════════════════════════════════════════════
  // 第六区：外部API
  // ═══════════════════════════════════════════════════════════════
  window.AutoCardUpdaterAPI = {
    getPlotPresets: () => { ... },
    switchPlotPreset: (name) => { ... },
    // ... 更多API方法
  };
})();
```

---

## 三、功能模块详解

### 3.1 独立窗口系统

**位置**: 代码开头，约500行

**核心组件**:
```javascript
// 窗口管理器
const ACU_WindowManager = {
  windows: new Map(),           // 窗口实例映射
  baseZIndex: 10000,           // 基础层级
  topZIndex: 10000,            // 当前最高层级
  
  register(id, $el) { ... },    // 注册窗口
  unregister(id) { ... },       // 注销窗口
  bringToFront(id) { ... },     // 置顶窗口
  getWindow(id) { ... },        // 获取窗口
  isOpen(id) { ... },           // 检查是否打开
  closeAll() { ... }            // 关闭所有
};
```

**窗口创建函数**:
```javascript
function createACUWindow(options) {
  const {
    id,              // 窗口唯一ID
    title,           // 窗口标题
    content,         // 窗口内容HTML
    width = 900,     // 初始宽度
    height = 700,    // 初始高度
    modal = false,   // 是否模态
    resizable = true,  // 可调整大小
    maximizable = true, // 可最大化
    startMaximized = false, // 启动时最大化
    rememberState = true,  // 记住状态
    onClose,         // 关闭回调
    onReady          // 就绪回调
  } = options;
  // ...
}
```

**窗口样式系统**（响应式设计）:
```css
/* 窄屏模式 ≤1100px */
@media screen and (max-width: 1100px) {
  .acu-window.maximized { /* 紧凑边距 */ }
}

/* 超窄屏模式 ≤768px */
@media screen and (max-width: 768px) {
  .acu-window { /* 全屏占满 */ }
}

/* 极窄屏模式 ≤480px */
@media screen and (max-width: 480px) {
  .acu-window-header { /* 压缩头部 */ }
}

/* 超小屏模式 ≤360px */
@media screen and (max-width: 360px) {
  .acu-window { /* 最小化占用 */ }
}
```

### 3.2 存储系统

#### 3.2.1 存储策略

```
┌─────────────────────────────────────────────────────────────────┐
│                        存储优先级                                │
├─────────────────────────────────────────────────────────────────┤
│  优先级1: SillyTavern extensionSettings                         │
│  ├── 同一服务端下所有浏览器一致                                  │
│  ├── 通过桥接访问 (initTavernSettingsBridge_ACU)                │
│  └── 持久化到酒馆设置文件                                        │
├─────────────────────────────────────────────────────────────────┤
│  优先级2: IndexedDB 本地副本                                     │
│  ├── 仅本浏览器可用                                              │
│  ├── 用作酒馆设置读取失败时的回退                                 │
│  └── DB: ${SCRIPT_ID_PREFIX_ACU}_config_v1                      │
├─────────────────────────────────────────────────────────────────┤
│  禁止: localStorage / sessionStorage                             │
│  └── 除非手动关闭禁用开关                                        │
└─────────────────────────────────────────────────────────────────┘
```

#### 3.2.2 存储键列表

```javascript
// 全局元信息
const STORAGE_KEY_GLOBAL_META_ACU = `${SCRIPT_ID_PREFIX_ACU}_globalMeta_v1`;

// Profile存储
const STORAGE_KEY_PROFILE_PREFIX_ACU = `${SCRIPT_ID_PREFIX_ACU}_profile_v1`;

// 模板预设库
const STORAGE_KEY_TEMPLATE_PRESETS_ACU = `${SCRIPT_ID_PREFIX_ACU}_templatePresets_v1`;

// 导入状态
const STORAGE_KEY_IMPORTED_ENTRIES_ACU = `${SCRIPT_ID_PREFIX_ACU}_importedTxtEntries`;
const STORAGE_KEY_IMPORTED_STATUS_ACU = `${SCRIPT_ID_PREFIX_ACU}_importedTxtStatus`;
const STORAGE_KEY_IMPORTED_STATUS_STANDARD_ACU = `${SCRIPT_ID_PREFIX_ACU}_importedTxtStatus_standard`;
const STORAGE_KEY_IMPORTED_STATUS_SUMMARY_ACU = `${SCRIPT_ID_PREFIX_ACU}_importedTxtStatus_summary`;
const STORAGE_KEY_IMPORTED_STATUS_FULL_ACU = `${SCRIPT_ID_PREFIX_ACU}_importedTxtStatus_full`;

// 剧情推进设置
const STORAGE_KEY_PLOT_SETTINGS_ACU = `${SCRIPT_ID_PREFIX_ACU}_plotSettings`;

// 窗口状态
const ACU_WINDOW_STATE_STORAGE_KEY = `${SCRIPT_ID_PREFIX_ACU}_windowStates`;

// 酒馆设置命名空间
const TAVERN_SETTINGS_NAMESPACE_ACU = `${SCRIPT_ID_PREFIX_ACU}__userscript_settings_v1`;
```

#### 3.2.3 Profile数据隔离

```javascript
// 标识代码规范化
function normalizeIsolationCode_ACU(code) {
  return (typeof code === 'string') ? code.trim() : '';
}

// 获取隔离槽位名
function getIsolationSlot_ACU(code) {
  const c = normalizeIsolationCode_ACU(code);
  return c || DEFAULT_ISOLATION_SLOT_ACU; // '__default__'
}

// Profile设置键
function getProfileSettingsKey_ACU(code) {
  return `${STORAGE_KEY_PROFILE_PREFIX_ACU}__${getIsolationSlot_ACU(code)}__settings`;
}

// Profile模板键
function getProfileTemplateKey_ACU(code) {
  return `${STORAGE_KEY_PROFILE_PREFIX_ACU}__${getIsolationSlot_ACU(code)}__template`;
}
```

### 3.3 表格模板系统

#### 3.3.1 默认模板结构

```javascript
const DEFAULT_TABLE_TEMPLATE_ACU = `{
  "mate": {
    "type": "chatSheets",
    "version": 1,
    "updateConfigUiSentinel": -1,
    "globalInjectionConfig": { ... }
  },
  "sheet_dCudvUnH": {
    "uid": "sheet_dCudvUnH",
    "name": "全局数据表",
    "sourceData": {
      "note": "记录当前主角所在地点及时间相关参数...",
      "initNode": "插入一条关于当前世界状态的记录。",
      "deleteNode": "禁止删除。",
      "updateNode": "当主角从当前所在区域离开时，更新所在地点...",
      "insertNode": "禁止操作。"
    },
    "content": [ [...] ],
    "updateConfig": {
      "uiSentinel": -1,
      "contextDepth": -1,
      "updateFrequency": -1,
      "batchSize": -1,
      "skipFloors": -1
    },
    "exportConfig": { ... },
    "orderNo": 0
  },
  // ... 更多表格
}`;
```

#### 3.3.2 默认表格类型

| 表格名称 | 用途 | 行数限制 | 特殊功能 |
|---------|------|---------|---------|
| 全局数据表 | 记录地点、时间等全局状态 | 单行 | 禁止删除/插入 |
| 主角信息表 | 记录主角核心身份信息 | 单行 | 禁止删除/插入 |
| 重要角色表 | 记录关键NPC信息 | 多行 | 支持独立导出、索引条目 |
| 主角技能表 | 记录主角获得的技能 | 多行 | - |
| 背包物品表 | 记录主角拥有的物品 | 多行 | - |
| 任务与事件表 | 记录进行中的任务 | 多行 | - |
| 纪要表 | 轮次日志记录 | 多行 | 编码索引锁定、索引条目 |
| 选项表 | 每轮可选动作 | 单行 | - |

#### 3.3.3 表格更新参数

```javascript
updateConfig: {
  uiSentinel: -1,      // UI哨兵值
  contextDepth: -1,    // AI读取上下文层数 (-1=沿用全局)
  updateFrequency: -1, // 更新频率 (-1=沿用全局, 0=禁用)
  batchSize: -1,       // 批处理大小 (-1=沿用全局)
  skipFloors: -1       // 跳过更新楼层 (-1=沿用全局)
}
```

### 3.4 API连接管理

#### 3.4.1 API配置结构

```javascript
settings_ACU.apiConfig = {
  url: '',           // API URL
  apiKey: '',        // API密钥
  model: '',         // 模型名称
  max_tokens: 120000, // 最大Token
  temperature: 0.9   // 温度参数
};

settings_ACU.apiMode = 'custom'; // 'custom' | 'tavern'
settings_ACU.tavernProfile = ''; // 酒馆预设ID
```

#### 3.4.2 API预设管理

```javascript
// 预设结构
settings_ACU.apiPresets = [
  {
    name: '预设名称',
    apiMode: 'custom',
    apiConfig: { url, apiKey, model, max_tokens, temperature },
    tavernProfile: ''
  }
];

// 预设选择器
settings_ACU.tableApiPreset = ''; // 填表使用的预设
settings_ACU.plotApiPreset = '';  // 剧情推进使用的预设
```

#### 3.4.3 API调用函数

```javascript
async function callCustomOpenAI_ACU(dynamicContent, abortController = null, options = null) {
  // [新增] 创建一个新的 AbortController 用于本次请求
  const localAbortController = new AbortController();
  // ... API调用逻辑
}

async function callApi_ACU(messages, apiSettings, abortSignal = null) {
  // 剧情推进API调用
  // ... 支持API预设
}
```

### 3.5 剧情推进系统

#### 3.5.1 剧情预设结构

```javascript
const DEFAULT_PLOT_SETTINGS_ACU = {
  enabled: true,
  promptGroup: [
    {
      role: 'system',
      content: '...',
      enabled: true,
      mainSlot: 'A'  // 'A'=主提示词, 'B'=拦截任务详细指令
    }
  ],
  finalSystemDirective: '',
  rateMain: 1.0,
  ratePersonal: 1.0,
  rateErotic: 0,
  rateCuckold: 1.0,
  extractTags: '',
  minLength: 0,
  contextTurnCount: 3,
  loopSettings: {
    quickReplyContent: '',
    loopTags: '',
    loopDelay: 5,
    loopTotalDuration: 0,
    maxRetries: 3
  }
};
```

#### 3.5.2 触发门控机制

```javascript
// 用户发送意图追踪
const generationGate_ACU = {
  lastUserSendIntentAt: null,  // 用户发送意图时间戳
  lastUserMessageAt: null,      // 最后用户消息时间
  lastGeneration: null          // 最后生成上下文
};

// 判断是否为quiet/后台生成
function isQuietLikeGeneration_ACU(type, params) {
  // 过滤 quiet_prompt / type === 'quiet' / automatic_trigger
}

// 剧情推进触发检查
function shouldProcessPlotForGeneration_ACU(type, params, dryRun) {
  if (dryRun) return false;
  // ... 更多检查
}
```

#### 3.5.3 占位符系统

| 占位符 | 用途 |
|-------|------|
| $1 | 世界书内容 |
| $2 | 用户输入 |
| $3 | 聊天历史 |
| $4 | 角色卡描述 |
| $5 | 纪要索引/总体大纲内容 |
| $6 | 剧情推进历史 |

### 3.6 自动填表系统

#### 3.6.1 触发条件

```javascript
// 自动更新阈值
const DEFAULT_AUTO_UPDATE_THRESHOLD_ACU = 3;  // 每M层更新一次
const DEFAULT_AUTO_UPDATE_FREQUENCY_ACU = 1;  // 每N层自动更新
const DEFAULT_AUTO_UPDATE_TOKEN_THRESHOLD_ACU = 500;  // Token阈值

// 触发检查
async function triggerAutomaticUpdateIfNeeded_ACU() {
  // 1. 检查是否启用自动更新
  // 2. 检查楼层是否达到阈值
  // 3. 检查Token是否达到阈值
  // 4. 执行更新
}
```

#### 3.6.2 填表流程

```
触发自动/手动更新
    │
    ▼
收集上下文数据
    │
    ├── 获取聊天历史
    ├── 获取表格数据
    └── 构建提示词
    │
    ▼
调用API
    │
    ▼
解析AI响应
    │
    ├── 检查<tableThink>标签
    ├── 检查<tableEdit>标签
    └── 解析操作指令
    │
    ▼
应用更新
    │
    ├── insertRow
    ├── updateRow
    └── deleteRow
    │
    ▼
同步世界书
    │
    └── 更新条目内容
```

#### 3.6.3 重试机制

```javascript
// 填表自动重试
settings_ACU.tableMaxRetries = 3;  // 重试次数

// 重试触发条件
// 1. API调用失败
// 2. 空回（低于回复字符阈值）
// 3. 解析失败（缺少tableEdit标签）

// 重试延时：固定5秒
```

### 3.7 世界书注入系统

#### 3.7.1 条目类型

```javascript
// 可读条目（Readable Entry）
{
  key: 'TavernDB-ACU-ReadableEntry',
  comment: '最新数据与记录',
  content: '...',
  type: 'constant',  // 或 'keyword'
  enabled: true,
  position: 'at_depth_as_system',
  depth: 2,
  order: 99980
}

// 包裹条目（Wrapper Entry）
{
  key: 'TavernDB-ACU-MemoryStart',
  content: '<记忆回溯>',
  type: 'constant',
  position: 'before_char',
  order: 99981
}

// 自定义导出条目
{
  key: 'TavernDB-ACU-CustomExport-{tableName}',
  content: '...',
  type: 'constant',  // 或 'keyword'
  keywords: ['关键词']
}

// 索引条目
{
  key: 'TavernDB-ACU-CustomExport-{tableName}-索引',
  content: '索引内容',
  type: 'constant'
}
```

#### 3.7.2 注入位置配置

```javascript
exportConfig: {
  enabled: true,
  splitByRow: false,
  entryName: '条目名称',
  entryType: 'constant',  // 'constant' | 'keyword'
  keywords: '关键词',
  preventRecursion: true,
  injectionTemplate: '',
  
  // 条目位置
  entryPlacement: {
    position: 'at_depth_as_system',  // 'at_depth_as_system' | 'before_char' | 'after_char'
    depth: 2,
    order: 10000
  },
  
  // 索引条目
  extraIndexEnabled: true,
  extraIndexEntryName: '索引条目名称',
  extraIndexColumns: ['列1', '列2'],
  extraIndexInjectionTemplate: '...'
}
```

### 3.8 表格锁定系统

#### 3.8.1 锁定类型

```javascript
// 行锁定
toggleRowLock_ACU(sheetKey, rowIndex);

// 列锁定
toggleColLock_ACU(sheetKey, colIndex);

// 单元格锁定
toggleCellLock_ACU(sheetKey, rowIndex, colIndex);

// 编码索引列特殊锁定
setSpecialIndexLockEnabled_ACU(sheetKey, enabled);
```

#### 3.8.2 锁定状态存储

```javascript
// 锁定状态结构
{
  rows: [0, 1, 2],     // 锁定的行索引
  cols: [0, 3],        // 锁定的列索引
  cells: ['0:0', '1:3'] // 锁定的单元格（"行:列"格式）
}

// 按聊天+隔离标识分槽存储
function getTableLockScopeKey_ACU() {
  const chatKey = (currentChatFileIdentifier_ACU || 'default').trim() || 'default';
  const isolationKey = normalizeIsolationCode_ACU(settings_ACU?.dataIsolationCode || '');
  return `${chatKey}__${isolationKey}`;
}
```

---

## 四、UI实现详解

### 4.1 主弹窗结构

```html
<div class="acu-window" id="shujuku_v299-popup">
  <!-- 窗口头部 -->
  <div class="acu-window-header">
    <div class="acu-window-title">
      <i class="fa-solid fa-database"></i>
      <span>神·数据库</span>
    </div>
    <div class="acu-window-controls">
      <button class="acu-window-btn maximize">□</button>
      <button class="acu-window-btn close">×</button>
    </div>
  </div>
  
  <!-- 窗口内容 -->
  <div class="acu-window-body">
    <!-- 标签页导航 -->
    <div class="acu-tabs">
      <button class="acu-tab active" data-tab="tables">表格</button>
      <button class="acu-tab" data-tab="plot">剧情推进</button>
      <button class="acu-tab" data-tab="import">导入</button>
      <button class="acu-tab" data-tab="settings">设置</button>
    </div>
    
    <!-- 标签页内容 -->
    <div class="acu-tab-contents">
      <div class="acu-tab-content active" data-tab="tables">...</div>
      <div class="acu-tab-content" data-tab="plot">...</div>
      <div class="acu-tab-content" data-tab="import">...</div>
      <div class="acu-tab-content" data-tab="settings">...</div>
    </div>
  </div>
</div>
```

### 4.2 表格卡片网格

```html
<div class="acu-card-grid">
  <!-- 表格卡片 -->
  <div class="acu-card" data-sheet="sheet_xxx">
    <div class="acu-card-header">
      <h3 class="acu-card-title">表格名称</h3>
      <div class="acu-card-actions">
        <button class="acu-btn-icon" data-action="edit">✏️</button>
        <button class="acu-btn-icon" data-action="config">⚙️</button>
      </div>
    </div>
    <div class="acu-card-body">
      <!-- 表格预览 -->
      <table class="acu-table-preview">
        <thead><tr><th>列1</th><th>列2</th></tr></thead>
        <tbody><tr><td>值1</td><td>值2</td></tr></tbody>
      </table>
    </div>
    <div class="acu-card-footer">
      <span class="acu-card-stats">3行数据</span>
    </div>
  </div>
</div>
```

### 4.3 表格编辑器弹窗

```html
<div class="acu-sheet-editor-popup">
  <!-- 编辑器工具栏 -->
  <div class="acu-editor-toolbar">
    <button class="acu-btn" data-action="addRow">添加行</button>
    <button class="acu-btn" data-action="addCol">添加列</button>
    <button class="acu-btn-secondary" data-action="lockRow">锁定行</button>
    <button class="acu-btn-danger" data-action="deleteRow">删除行</button>
  </div>
  
  <!-- 编辑器主体 -->
  <div class="acu-editor-main">
    <!-- 左侧：行号 -->
    <div class="acu-editor-row-nums">1, 2, 3...</div>
    
    <!-- 右侧：表格编辑区 -->
    <div class="acu-editor-grid">
      <table class="acu-editable-table">
        <thead>
          <tr>
            <th class="acu-col-header" data-col="0">
              <span class="acu-col-name">列名</span>
              <button class="acu-col-lock">🔒</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="acu-cell" data-row="0" data-col="0" contenteditable="true">
              单元格内容
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

### 4.4 设置面板

```html
<div class="acu-settings-panel">
  <!-- 公用设置 -->
  <section class="acu-settings-section">
    <h3>公用设置</h3>
    <div class="acu-form-group">
      <label>自动更新阈值（消息层数）</label>
      <input type="number" id="cfg-auto-update-threshold" value="3">
    </div>
    <div class="acu-form-group">
      <label>更新频率</label>
      <input type="number" id="cfg-auto-update-frequency" value="1">
    </div>
    <div class="acu-form-group">
      <label>批处理大小</label>
      <input type="number" id="cfg-update-batch-size" value="2">
    </div>
    <div class="acu-form-group">
      <label>填表自动重试次数</label>
      <input type="number" id="cfg-table-max-retries" value="3">
    </div>
  </section>
  
  <!-- API配置 -->
  <section class="acu-settings-section">
    <h3>API配置</h3>
    <div class="acu-form-group">
      <label>API模式</label>
      <select id="cfg-api-mode">
        <option value="custom">自定义API</option>
        <option value="tavern">酒馆API</option>
      </select>
    </div>
    <div class="acu-form-group">
      <label>API URL</label>
      <input type="text" id="cfg-api-url">
    </div>
    <div class="acu-form-group">
      <label>API密钥</label>
      <input type="password" id="cfg-api-key">
    </div>
    <div class="acu-form-group">
      <label>模型</label>
      <input type="text" id="cfg-api-model">
      <select id="cfg-api-model-select"></select>
    </div>
  </section>
  
  <!-- 更多设置... -->
</div>
```

### 4.5 剧情推进面板

```html
<div class="acu-plot-panel">
  <!-- 预设选择 -->
  <div class="acu-form-group">
    <label>剧情预设</label>
    <select id="cfg-plot-preset">
      <option value="">默认预设</option>
      <option value="battle">战斗场景</option>
    </select>
  </div>
  
  <!-- 预设编辑器 -->
  <div class="acu-prompt-editor">
    <div class="acu-prompt-segment" data-id="system_1">
      <div class="acu-prompt-header">
        <span class="acu-prompt-role">SYSTEM</span>
        <span class="acu-prompt-slot">主提示词A</span>
        <button class="acu-prompt-toggle">展开/折叠</button>
      </div>
      <div class="acu-prompt-body">
        <textarea>提示词内容...</textarea>
      </div>
    </div>
  </div>
  
  <!-- 权重设置 -->
  <div class="acu-weight-grid">
    <div class="acu-weight-item">
      <label>主线剧情权重</label>
      <input type="range" min="0" max="2" step="0.1" value="1.0">
    </div>
  </div>
  
  <!-- 循环设置 -->
  <div class="acu-loop-settings">
    <label><input type="checkbox" id="cfg-loop-enabled"> 启用自动循环</label>
    <div class="acu-form-group">
      <label>循环延时（秒）</label>
      <input type="number" id="cfg-loop-delay" value="5">
    </div>
  </div>
</div>
```

### 4.6 CSS样式系统

```css
/* 主题变量 */
:root {
  --acu-bg-primary: #0b0f15;
  --acu-bg-secondary: rgba(255, 255, 255, 0.04);
  --acu-text-primary: rgba(255, 255, 255, 0.92);
  --acu-text-secondary: rgba(255, 255, 255, 0.7);
  --acu-border: rgba(255, 255, 255, 0.15);
  --acu-accent: rgba(123, 183, 255, 0.85);
  --acu-success: #4caf50;
  --acu-warning: #ff9800;
  --acu-danger: #ff6b6b;
}

/* 窗口基础样式 */
.acu-window {
  background: radial-gradient(1200px 600px at 10% -10%, rgba(123, 183, 255, 0.12), transparent 60%),
              radial-gradient(900px 500px at 100% 0%, rgba(155, 123, 255, 0.10), transparent 55%),
              linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
              #0b0f15;
  border-radius: 16px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65);
}

/* 卡片网格 */
.acu-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

/* 表单元素 */
.acu-form-input, .acu-form-textarea {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--acu-text-primary);
  padding: 8px 12px;
}

/* 按钮系统 */
.acu-btn { /* 主按钮 */ }
.acu-btn-secondary { /* 次要按钮 */ }
.acu-btn-danger { /* 危险按钮 */ }
.acu-btn-icon { /* 图标按钮 */ }
```

---

## 五、数据流详解

### 5.1 填表数据流

```
用户发送消息
    │
    ▼
MESSAGE_SENT 事件
    │
    ▼
记录用户发送意图 (markUserSendIntent_ACU)
    │
    ▼
GENERATION_ENDED 事件
    │
    ▼
检查触发条件 (shouldProcessAutoTableUpdateForGenerationEnded_ACU)
    │
    ├── 检查是否quiet/后台生成
    ├── 检查楼层阈值
    └── 检查Token阈值
    │
    ▼
触发自动更新 (triggerAutomaticUpdateIfNeeded_ACU)
    │
    ▼
获取上下文数据
    │
    ├── 聊天历史
    ├── 当前表格数据
    └── 模板定义
    │
    ▼
构建提示词
    │
    ├── 替换占位符
    ├── 添加系统指令
    └── 添加表格定义
    │
    ▼
调用API (callCustomOpenAI_ACU)
    │
    ▼
解析响应
    │
    ├── 提取<tableThink>
    └── 提取<tableEdit>
    │
    ▼
执行操作指令
    │
    ├── insertRow(tableIndex, rowData)
    ├── updateRow(tableIndex, rowIndex, rowData)
    └── deleteRow(tableIndex, rowIndex)
    │
    ▼
更新内存数据 (currentJsonTableData_ACU)
    │
    ▼
同步世界书 (updateWorldbookEntries_ACU)
    │
    ▼
触发回调 (tableUpdateCallbacks)
```

### 5.2 剧情推进数据流

```
用户发送消息
    │
    ▼
MESSAGE_SENT 事件
    │
    ▼
GENERATION_AFTER_COMMANDS 事件
    │
    ▼
检查触发条件 (shouldProcessPlotForGeneration_ACU)
    │
    ├── 检查是否quiet/后台生成
    ├── 检查是否automatic_trigger
    └── 检查剧情推进是否启用
    │
    ▼
获取剧情推进上下文
    │
    ├── $1: 世界书内容
    ├── $2: 用户输入
    ├── $3: 聊天历史
    ├── $4: 角色卡描述
    ├── $5: 纪要索引/总体大纲
    └── $6: 剧情推进历史
    │
    ▼
构建提示词 (buildPlotPrompt_ACU)
    │
    ▼
调用API (callApi_ACU)
    │
    ▼
处理响应
    │
    ├── 检查最小长度
    ├── 检查循环标签
    └── 保存到消息元数据
    │
    ▼
可选：触发自动循环
```

---

## 六、外部API接口

### 6.1 API对象结构

```javascript
window.AutoCardUpdaterAPI = {
  // ========== 剧情推进预设管理 ==========
  getPlotPresets: () => [...],          // 获取所有预设
  getPlotPresetNames: () => [...],      // 获取预设名称列表
  getCurrentPlotPreset: () => '',       // 获取当前预设
  switchPlotPreset: (name) => true,     // 切换预设
  getPlotPresetDetails: (name) => {},   // 获取预设详情
  
  // ========== 数据导入导出 ==========
  exportTableAsJson: () => {},          // 导出表格数据
  importTableAsJson: (str) => true,     // 导入表格数据
  exportJsonData: () => true,           // 导出到文件
  importCombinedSettings: () => true,   // 导入组合设置
  exportCombinedSettings: () => true,   // 导出组合设置
  
  // ========== 设置与更新 ==========
  openSettings: () => true,             // 打开设置面板
  openVisualizer: () => {},             // 打开可视化编辑器
  manualUpdate: () => true,             // 手动更新
  triggerUpdate: () => true,            // 触发增量更新
  setZeroTkOccupyMode: (mode) => true,  // 设置0TK模式
  
  // ========== 世界书操作 ==========
  syncWorldbookEntries: (opt) => true,  // 同步世界书
  deleteInjectedEntries: () => true,    // 删除注入条目
  
  // ========== 模板管理 ==========
  importTemplate: () => true,           // 导入模板
  exportTemplate: () => true,           // 导出模板
  resetTemplate: () => true,            // 重置模板
  getTableTemplate: () => {},           // 获取模板
  importTemplateFromData: (data) => {}, // 从数据导入模板
  
  // ========== 更新配置参数 ==========
  getUpdateConfigParams: () => {},      // 获取更新配置
  setUpdateConfigParams: (params) => true, // 设置更新配置
  
  // ========== 手动更新表选择 ==========
  getManualSelectedTables: () => {},    // 获取选择的表
  setManualSelectedTables: (keys) => true, // 设置选择的表
  clearManualSelectedTables: () => true, // 清除选择
  
  // ========== API预设管理 ==========
  getApiPresets: () => [],              // 获取API预设
  getTableApiPreset: () => '',          // 获取填表API预设
  setTableApiPreset: (name) => true,    // 设置填表API预设
  getPlotApiPreset: () => '',           // 获取剧情API预设
  setPlotApiPreset: (name) => true,     // 设置剧情API预设
  saveApiPreset: (data) => true,        // 保存API预设
  loadApiPreset: (name) => true,        // 加载API预设
  deleteApiPreset: (name) => true,      // 删除API预设
  
  // ========== 表格锁定 ==========
  getTableLockState: (key) => {},       // 获取锁定状态
  setTableLockState: (key, state) => true, // 设置锁定状态
  lockTableRow: (key, row, locked) => true, // 锁定行
  lockTableCol: (key, col, locked) => true, // 锁定列
  lockTableCell: (key, row, col, locked) => true, // 锁定单元格
  
  // ========== 回调注册 ==========
  registerTableUpdateCallback: (fn) => {}, // 注册更新回调
  unregisterTableUpdateCallback: (fn) => {}, // 注销更新回调
  registerTableFillStartCallback: (fn) => {} // 注册填表开始回调
};
```

---

## 七、核心函数索引

### 7.1 窗口管理函数

| 函数名 | 用途 | 位置 |
|--------|------|------|
| `createACUWindow(options)` | 创建独立窗口 | 开头 |
| `closeACUWindow(id)` | 关闭窗口 | 开头 |
| `injectACUWindowStyles()` | 注入窗口样式 | 开头 |
| `getWindowStates_ACU()` | 获取窗口状态 | 开头 |
| `saveWindowState_ACU(id, state)` | 保存窗口状态 | 开头 |

### 7.2 存储函数

| 函数名 | 用途 |
|--------|------|
| `initTavernSettingsBridge_ACU()` | 初始化酒馆设置桥接 |
| `getConfigStorage_ACU()` | 获取配置存储对象 |
| `persistTavernSettings_ACU()` | 持久化酒馆设置 |
| `openConfigDb_ACU()` | 打开IndexedDB |
| `configIdbGetCached_ACU(key)` | 从缓存读取 |
| `configIdbSetCached_ACU(key, value)` | 写入缓存 |
| `loadTemplateFromStorage_ACU()` | 从存储加载模板 |
| `saveSettings_ACU()` | 保存设置 |
| `loadSettings_ACU()` | 加载设置 |

### 7.3 表格操作函数

| 函数名 | 用途 |
|--------|------|
| `parseTableTemplateJson_ACU()` | 解析表格模板JSON |
| `getSortedSheetKeys_ACU(dataObj)` | 获取排序后的表格键 |
| `sanitizeSheetForStorage_ACU(sheet)` | 清洗表格数据 |
| `applySheetOrderNumbers_ACU(dataObj, keys)` | 应用表格顺序编号 |
| `formatJsonToReadable_ACU(jsonData)` | 格式化表格为可读文本 |
| `parseReadableToJson_ACU(text)` | 从文本解析表格 |

### 7.4 填表函数

| 函数名 | 用途 |
|--------|------|
| `triggerAutomaticUpdateIfNeeded_ACU()` | 触发自动更新检查 |
| `proceedWithCardUpdate_ACU()` | 执行填表更新 |
| `callCustomOpenAI_ACU(content, controller, options)` | 调用API |
| `getSelectedManualSheetKeys_ACU()` | 获取手动选择的表格 |
| `collectManualExtraHint_ACU()` | 收集额外提示词 |

### 7.5 剧情推进函数

| 函数名 | 用途 |
|--------|------|
| `triggerPlotAdvance_ACU()` | 触发剧情推进 |
| `startAutoLoop_ACU()` | 启动自动循环 |
| `stopAutoLoop_ACU()` | 停止自动循环 |
| `getPlotFromHistory_ACU()` | 从历史获取剧情 |
| `savePlotToLatestMessage_ACU()` | 保存剧情到消息 |
| `getWorldbookContentForPlot_ACU()` | 获取世界书内容 |
| `formatOutlineTableForPlot_ACU()` | 格式化总体大纲 |
| `getSummaryIndexContentForPlot_ACU()` | 获取纪要索引 |

### 7.6 世界书函数

| 函数名 | 用途 |
|--------|------|
| `updateWorldbookEntries_ACU()` | 更新世界书条目 |
| `buildReadableEntry_ACU()` | 构建可读条目 |
| `updateOutlineTableEntry_ACU()` | 更新总体大纲条目 |
| `updateCustomTableExports_ACU()` | 更新自定义导出条目 |
| `buildExtraIndexEntryBlock_ACU()` | 构建索引条目 |

---

## 八、版本历史

| 版本 | 日期 | 主要更新 |
|------|------|----------|
| 1.1 | 2026-03-08 | 纪要索引优化、重试延时调整、API接口扩展 |
| 1.0 | 2026-03-06 | 0TK模式优化、纪要表功能完善 |
| - | 2026-03-02 | API模型输入优化、Import路径修复 |
| - | 2026-02-26 | 填表自动重试、剧情推进API错误重试 |

---

## 九、相关文档

- [API文档](./API_DOCUMENTATION.md)
- [更新日志](../Reference/shujuku-main/README.md)
- [优化计划](../Reference/shujuku-main/plans/)