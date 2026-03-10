# YouYou Toolkit - 工具系统重构实施方案

**版本**: 1.0.0  
**日期**: 2026-03-10  
**状态**: 待批准

---

## 一、背景与目标

### 1.1 当前问题

| 问题 | 描述 | 影响 |
|------|------|------|
| 工具实现错误 | 工具面板是硬编码表单，不是提示词模板 | 无法自定义AI行为 |
| 事件监听缺失 | 正则提取没有监听GENERATION_ENDED事件 | 无法自动触发提取 |
| 破限词UI简陋 | JSON文本框不够直观 | 用户体验差 |
| API绑定缺失 | 工具无法选择API预设 | 无法使用不同API |

### 1.2 目标架构

```
┌─────────────────────────────────────────────────────────────┐
│                     主界面 (四个入口)                         │
├─────────────┬─────────────┬─────────────┬─────────────────────┤
│  API预设管理  │   正则提取   │   破限词    │      工具库          │
└─────────────┴─────────────┴─────────────┴─────────────────────┘
                                                          │
                                          ┌───────────────┼───────────────┐
                                          ▼               ▼               ▼
                                    ┌──────────┐   ┌──────────┐   ┌──────────┐
                                    │ 摘要工具  │   │ 状态栏   │   │ 更多...  │
                                    └──────────┘   └──────────┘   └──────────┘
```

### 1.3 工具执行流程

```
用户发送消息
    │
    ▼
GENERATION_ENDED事件触发
    │
    ├──▶ 正则提取模块
    │         │
    │         ▼
    │    提取正文内容 + 上一轮工具内容
    │         │
    │         ▼
    │    生成本轮工具提示词
    │
    └──▶ 工具执行引擎
              │
              ├── 获取工具配置（提示词模板 + API预设 + 破限词）
              │
              ├── 构建完整消息（破限词 + 提示词 + 上下文）
              │
              ├── 调用API预设
              │
              └── 处理输出（随AI输出/额外解析）
```

---

## 二、数据结构设计

### 2.1 工具注册表新结构

```javascript
// modules/tool-registry.js

/**
 * 工具配置结构
 */
const ToolConfig = {
  // 基础信息
  id: 'summaryTool',           // 工具唯一ID
  name: '摘要工具',             // 显示名称
  icon: 'fa-file-lines',       // FontAwesome图标
  description: '生成剧情摘要',  // 描述
  order: 0,                    // 排序
  
  // 核心配置
  promptTemplate: `<boo_FM>
<pg>No.{{pg}}</pg>
<time>{{time}}</time>
...
</boo_FM>`,                    // 提示词模板（可编辑）
  
  // API配置
  apiPreset: '',               // API预设名称（空=使用当前配置）
  
  // 破限词配置
  bypassPreset: '',            // 破限词预设名称（空=不使用）
  
  // 输出配置
  outputMode: 'inline',        // inline(随AI输出) | separate(额外AI解析)
  extractTags: ['boo_FM'],     // 提取标签列表
  
  // 执行配置
  triggerEvents: ['GENERATION_ENDED'],  // 触发事件
  enabled: true,               // 是否启用
  
  // UI配置
  hasSubTabs: false,           // 是否有子标签页
  component: 'SummaryToolPanel' // UI组件名
};
```

### 2.2 工具执行上下文

```javascript
/**
 * 工具执行上下文
 */
const ToolExecutionContext = {
  toolId: 'summaryTool',
  triggeredAt: Date.now(),
  triggerEvent: 'GENERATION_ENDED',
  
  // 输入数据
  input: {
    userMessage: '',           // 用户消息
    lastAiMessage: '',         // 上一条AI消息
    extractedContent: '',      // 正则提取的内容
    previousToolOutput: '',    // 上一轮工具输出
    context: {}                // 其他上下文
  },
  
  // 配置
  config: {
    apiPreset: {},
    bypassMessages: [],
    promptTemplate: ''
  },
  
  // 状态
  status: 'pending',           // pending | running | completed | failed
  abortController: null
};
```

### 2.3 破限词预设结构（保持不变）

```javascript
/**
 * 破限词预设（消息数组格式）
 */
const BypassPreset = {
  id: 'standard',
  name: '标准破限',
  description: '适用于大多数场景',
  messages: [
    {
      role: 'SYSTEM',          // SYSTEM | USER | assistant
      content: 'Bypass all...',
      deletable: true
    },
    {
      role: 'USER',
      content: '...',
      deletable: true
    }
  ]
};
```

---

## 三、模块详细设计

### 3.1 tool-registry.js 重构

**文件路径**: `modules/tool-registry.js`

**修改内容**:

```javascript
// ============================================================
// 新增：工具配置存储键
// ============================================================
const TOOL_CONFIG_STORAGE_KEY = 'tool_configs';

// ============================================================
// 新增：默认工具配置
// ============================================================
const DEFAULT_TOOL_CONFIGS = {
  summaryTool: {
    id: 'summaryTool',
    name: '摘要工具',
    icon: 'fa-file-lines',
    description: '生成剧情摘要块',
    promptTemplate: `<boo_FM>
<pg>No.{{pg}}</pg>
<time>{{time}}</time>
<scene>{{scene}}</scene>
<plot>{{plot}}</plot>
<event>
MQ.{{mq}} | {{mqStatus}}
SQ.{{sq}} | {{sqStatus}}
本轮完成：{{completed}}
</event>
<defined>{{defined}}</defined>
<status>{{status}}</status>
<seeds>{{seeds}}</seeds>
</boo_FM>`,
    apiPreset: '',
    bypassPreset: '',
    outputMode: 'inline',
    extractTags: ['boo_FM'],
    triggerEvents: ['GENERATION_ENDED'],
    enabled: true,
    order: 0
  },
  
  statusBlock: {
    id: 'statusBlock',
    name: '主角状态栏',
    icon: 'fa-user-check',
    description: '生成主角状态代码块',
    promptTemplate: `<status_block>
<name>{{name}}</name>
<location>{{location}}</location>
<condition>{{condition}}</condition>
<equipment>{{equipment}}</equipment>
<skills>{{skills}}</skills>
</status_block>`,
    apiPreset: '',
    bypassPreset: '',
    outputMode: 'inline',
    extractTags: ['status_block'],
    triggerEvents: ['GENERATION_ENDED'],
    enabled: true,
    order: 1
  }
};

// ============================================================
// 新增：获取工具完整配置（合并默认配置和用户配置）
// ============================================================
export function getToolFullConfig(toolId) {
  const defaultConfig = DEFAULT_TOOL_CONFIGS[toolId];
  if (!defaultConfig) return null;
  
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  const userConfig = userConfigs[toolId] || {};
  
  return {
    ...defaultConfig,
    ...userConfig,
    id: toolId  // ID不可覆盖
  };
}

// ============================================================
// 新增：保存工具配置
// ============================================================
export function saveToolConfig(toolId, config) {
  if (!toolId || !DEFAULT_TOOL_CONFIGS[toolId]) {
    console.warn('[ToolRegistry] 工具不存在:', toolId);
    return false;
  }
  
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  
  // 只保存用户可修改的字段
  const saveableFields = [
    'promptTemplate', 'apiPreset', 'bypassPreset', 
    'outputMode', 'extractTags', 'enabled'
  ];
  
  userConfigs[toolId] = {};
  saveableFields.forEach(field => {
    if (config[field] !== undefined) {
      userConfigs[toolId][field] = config[field];
    }
  });
  
  storage.set(TOOL_CONFIG_STORAGE_KEY, userConfigs);
  eventBus.emit(EVENTS.TOOL_UPDATED, { toolId, config: userConfigs[toolId] });
  
  return true;
}

// ============================================================
// 新增：重置工具配置到默认
// ============================================================
export function resetToolConfig(toolId) {
  const userConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
  delete userConfigs[toolId];
  storage.set(TOOL_CONFIG_STORAGE_KEY, userConfigs);
  eventBus.emit(EVENTS.TOOL_UPDATED, { toolId, config: null });
}
```

### 3.2 tool-executor.js 增强

**文件路径**: `modules/tool-executor.js`

**新增函数**:

```javascript
// ============================================================
// 新增：工具执行引擎
// ============================================================

import { getToolFullConfig } from './tool-registry.js';
import { getBypassPreset } from './bypass-prompts.js';
import { callApiWithPreset } from './api-connection.js';
import { extractTagContent } from './regex-extractor.js';

/**
 * 执行工具
 * @param {string} toolId 工具ID
 * @param {object} context 执行上下文
 * @returns {Promise<object>} 执行结果
 */
export async function executeToolWithConfig(toolId, context) {
  const config = getToolFullConfig(toolId);
  if (!config || !config.enabled) {
    return { success: false, error: '工具未启用或不存在' };
  }
  
  const abortController = new AbortController();
  const taskId = generateTaskId();
  
  // 记录开始执行
  const startTime = Date.now();
  
  try {
    // 1. 构建消息
    const messages = await buildToolMessages(config, context);
    
    // 2. 调用API
    const response = await callApiWithPreset(
      config.apiPreset,
      messages,
      { signal: abortController.signal }
    );
    
    // 3. 处理输出
    let output = response;
    
    if (config.outputMode === 'inline') {
      // 随AI输出模式：直接返回，AI会在回复中包含标签
      output = response;
    } else {
      // 额外解析模式：提取指定标签内容
      const extracted = extractTagContent(response, config.extractTags.map(tag => ({
        type: 'include',
        value: tag,
        enabled: true
      })));
      output = extracted;
    }
    
    return {
      success: true,
      taskId,
      toolId,
      data: output,
      duration: Date.now() - startTime
    };
    
  } catch (error) {
    return {
      success: false,
      taskId,
      toolId,
      error: error.message,
      duration: Date.now() - startTime
    };
  }
}

/**
 * 构建工具消息
 * @param {object} config 工具配置
 * @param {object} context 执行上下文
 * @returns {Array} 消息数组
 */
async function buildToolMessages(config, context) {
  const messages = [];
  
  // 1. 添加破限词消息
  if (config.bypassPreset) {
    const bypassPreset = getBypassPreset(config.bypassPreset);
    if (bypassPreset && bypassPreset.messages) {
      messages.push(...bypassPreset.messages);
    }
  }
  
  // 2. 处理提示词模板
  let prompt = config.promptTemplate;
  
  // 替换模板变量
  const variables = {
    '{{userMessage}}': context.input.userMessage || '',
    '{{lastAiMessage}}': context.input.lastAiMessage || '',
    '{{extractedContent}}': context.input.extractedContent || '',
    '{{previousToolOutput}}': context.input.previousToolOutput || '',
    '{{context}}': JSON.stringify(context.input.context || {}),
    // 摘要工具特定变量
    '{{pg}}': context.input.context?.pg || '1',
    '{{time}}': context.input.context?.time || '',
    '{{scene}}': context.input.context?.scene || '',
    '{{plot}}': context.input.context?.plot || '',
    '{{mq}}': context.input.context?.mq || 'Ⅰ',
    '{{sq}}': context.input.context?.sq || '1',
    // ... 更多变量
  };
  
  for (const [key, value] of Object.entries(variables)) {
    prompt = prompt.replace(new RegExp(escapeRegex(key), 'g'), value);
  }
  
  // 3. 添加提示词消息
  messages.push({
    role: 'USER',
    content: prompt
  });
  
  return messages;
}

/**
 * 批量执行工具
 * @param {string[]} toolIds 工具ID列表
 * @param {object} context 执行上下文
 * @returns {Promise<object[]>} 执行结果列表
 */
export async function executeToolsBatch(toolIds, context) {
  const results = [];
  
  for (const toolId of toolIds) {
    const config = getToolFullConfig(toolId);
    if (config && config.enabled) {
      const result = await executeToolWithConfig(toolId, context);
      results.push(result);
    }
  }
  
  return results;
}
```

### 3.3 tool-trigger.js 事件监听实现

**文件路径**: `modules/tool-trigger.js`

**新增函数**:

```javascript
// ============================================================
// 新增：工具触发管理器
// ============================================================

import { eventBus, EVENTS } from './core/event-bus.js';
import { getToolList, getToolFullConfig } from './tool-registry.js';
import { executeToolWithConfig } from './tool-executor.js';
import { extractTagContent, getTagRules } from './regex-extractor.js';

/**
 * 工具触发管理器状态
 */
const triggerManagerState = {
  initialized: false,
  listeners: new Map(),
  lastExecutionContext: null
};

/**
 * 初始化工具触发管理器
 */
export function initToolTriggerManager() {
  if (triggerManagerState.initialized) return;
  
  // 注册GENERATION_ENDED事件监听
  registerGenerationEndedListener();
  
  triggerManagerState.initialized = true;
  console.log('[ToolTrigger] 工具触发管理器已初始化');
}

/**
 * 注册GENERATION_ENDED事件监听
 */
function registerGenerationEndedListener() {
  const eventType = EVENT_TYPES.GENERATION_ENDED;
  
  const listener = registerEventListener(eventType, async (data) => {
    console.log('[ToolTrigger] GENERATION_ENDED触发:', data);
    
    // 获取上下文
    const context = await buildExecutionContext(data);
    
    // 1. 执行正则提取
    const extractedContent = await executeRegexExtraction(context);
    context.input.extractedContent = extractedContent;
    
    // 2. 查找需要触发的工具
    const toolsToExecute = getToolsToExecute(eventType);
    
    // 3. 执行工具
    for (const tool of toolsToExecute) {
      try {
        const result = await executeToolWithConfig(tool.id, context);
        
        if (result.success) {
          eventBus.emit(EVENTS.TOOL_EXECUTED, {
            toolId: tool.id,
            result: result.data
          });
        }
      } catch (error) {
        console.error(`[ToolTrigger] 工具执行失败: ${tool.id}`, error);
      }
    }
    
    triggerManagerState.lastExecutionContext = context;
  });
  
  triggerManagerState.listeners.set(eventType, listener);
}

/**
 * 构建执行上下文
 */
async function buildExecutionContext(eventData) {
  const chat = await getChatContext({ depth: 5 });
  const character = await getCurrentCharacter();
  
  const lastUserMessage = chat?.messages?.filter(m => m.role === 'user').pop();
  const lastAiMessage = chat?.messages?.filter(m => m.role === 'assistant').pop();
  
  return {
    triggeredAt: Date.now(),
    triggerEvent: 'GENERATION_ENDED',
    input: {
      userMessage: lastUserMessage?.content || '',
      lastAiMessage: lastAiMessage?.content || '',
      extractedContent: '',
      previousToolOutput: '',
      context: {
        character: character?.name || '',
        chatLength: chat?.totalMessages || 0
      }
    },
    config: {},
    status: 'pending'
  };
}

/**
 * 执行正则提取
 */
async function executeRegexExtraction(context) {
  const rules = getTagRules();
  if (!rules || rules.length === 0) {
    return context.input.lastAiMessage;
  }
  
  return extractTagContent(context.input.lastAiMessage, rules);
}

/**
 * 获取需要执行的工具列表
 */
function getToolsToExecute(eventType) {
  const allTools = getToolList();
  
  return allTools.filter(tool => {
    const config = getToolFullConfig(tool.id);
    return config && 
           config.enabled && 
           config.triggerEvents?.includes(eventType);
  });
}

/**
 * 销毁工具触发管理器
 */
export function destroyToolTriggerManager() {
  for (const [eventType, listener] of triggerManagerState.listeners) {
    unregisterEventListener(eventType, listener);
  }
  triggerManagerState.listeners.clear();
  triggerManagerState.initialized = false;
}
```

### 3.4 破限词可视化编辑器组件

**文件路径**: `modules/ui/components/bypass-editor.js`

```javascript
/**
 * YouYou Toolkit - 破限词可视化编辑器组件
 * @description 提供段落式可视化编辑界面
 */

import { SCRIPT_ID, escapeHtml, showToast, getJQuery } from '../utils.js';
import { getBypassPreset, saveBypassPreset, DEFAULT_BYPASS_PROMPTS } from '../../bypass-prompts.js';

// ============================================================
// 角色选项
// ============================================================
const ROLE_OPTIONS = [
  { value: 'SYSTEM', label: '系统 (SYSTEM)', color: '#ff6b6b' },
  { value: 'USER', label: '用户 (USER)', color: '#4dabf7' },
  { value: 'assistant', label: '助手 (assistant)', color: '#69db7c' }
];

// ============================================================
// 组件定义
// ============================================================
export const BypassEditor = {
  id: 'bypassEditor',
  
  /**
   * 渲染组件
   * @param {Object} props
   * @returns {string} HTML
   */
  render(props) {
    const { presetId = 'standard', readonly = false } = props;
    const preset = getBypassPreset(presetId);
    const messages = preset?.messages || [];
    
    return `
      <div class="yyt-bypass-editor" data-preset-id="${presetId}">
        <div class="yyt-bypass-toolbar">
          <select class="yyt-bypass-preset-select" id="${SCRIPT_ID}-bypass-preset-select">
            ${this._renderPresetOptions(presetId)}
          </select>
          <div class="yyt-bypass-actions">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-bypass-add-segment" ${readonly ? 'disabled' : ''}>
              <i class="fa-solid fa-plus"></i> 添加段落
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-bypass-reset" ${readonly ? 'disabled' : ''}>
              <i class="fa-solid fa-undo"></i> 重置
            </button>
          </div>
        </div>
        
        <div class="yyt-bypass-segments" id="${SCRIPT_ID}-bypass-segments">
          ${messages.map((msg, index) => this._renderSegment(msg, index, readonly)).join('')}
        </div>
        
        <div class="yyt-bypass-footer">
          <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-bypass-save" ${readonly ? 'disabled' : ''}>
            <i class="fa-solid fa-save"></i> 保存预设
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-bypass-export">
            <i class="fa-solid fa-download"></i> 导出
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-bypass-import" ${readonly ? 'disabled' : ''}>
            <i class="fa-solid fa-upload"></i> 导入
          </button>
        </div>
        
        <input type="file" id="${SCRIPT_ID}-bypass-import-input" accept=".json" style="display:none">
      </div>
    `;
  },
  
  /**
   * 渲染预设选项
   */
  _renderPresetOptions(currentId) {
    const presets = Object.keys(DEFAULT_BYPASS_PROMPTS);
    return presets.map(id => 
      `<option value="${id}" ${id === currentId ? 'selected' : ''}>
        ${DEFAULT_BYPASS_PROMPTS[id].name}
      </option>`
    ).join('');
  },
  
  /**
   * 渲染单个段落
   */
  _renderSegment(message, index, readonly) {
    const role = (message.role || 'USER').toUpperCase();
    const roleInfo = ROLE_OPTIONS.find(r => r.value === role) || ROLE_OPTIONS[1];
    const deletable = message.deletable !== false;
    
    return `
      <div class="yyt-bypass-segment" data-index="${index}" data-deletable="${deletable}">
        <div class="yyt-segment-header">
          <div class="yyt-segment-role">
            <span class="yyt-role-badge" style="background-color: ${roleInfo.color}">
              ${roleInfo.label}
            </span>
            <select class="yyt-role-select" ${readonly || !deletable ? 'disabled' : ''}>
              ${ROLE_OPTIONS.map(r => 
                `<option value="${r.value}" ${r.value === role ? 'selected' : ''}>
                  ${r.label}
                </option>`
              ).join('')}
            </select>
          </div>
          <div class="yyt-segment-actions">
            ${deletable && !readonly ? `
              <button class="yyt-btn yyt-btn-icon yyt-btn-danger" data-action="delete" title="删除">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : ''}
            <button class="yyt-btn yyt-btn-icon" data-action="move-up" title="上移" ${index === 0 ? 'disabled' : ''}>
              <i class="fa-solid fa-arrow-up"></i>
            </button>
            <button class="yyt-btn yyt-btn-icon" data-action="move-down" title="下移">
              <i class="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        </div>
        <div class="yyt-segment-content">
          <textarea 
            class="yyt-textarea yyt-content-textarea" 
            rows="4" 
            placeholder="输入段落内容..."
            ${readonly ? 'readonly' : ''}
          >${escapeHtml(message.content || '')}</textarea>
        </div>
      </div>
    `;
  },
  
  /**
   * 绑定事件
   */
  bindEvents($container, dependencies) {
    const $ = getJQuery();
    if (!$) return;
    
    const self = this;
    
    // 添加段落
    $container.find(`#${SCRIPT_ID}-bypass-add-segment`).on('click', () => {
      this._addSegment($container);
    });
    
    // 删除段落
    $container.on('click', '[data-action="delete"]', function() {
      const $segment = $(this).closest('.yyt-bypass-segment');
      self._removeSegment($container, $segment);
    });
    
    // 上移
    $container.on('click', '[data-action="move-up"]', function() {
      const $segment = $(this).closest('.yyt-bypass-segment');
      self._moveSegment($container, $segment, 'up');
    });
    
    // 下移
    $container.on('click', '[data-action="move-down"]', function() {
      const $segment = $(this).closest('.yyt-bypass-segment');
      self._moveSegment($container, $segment, 'down');
    });
    
    // 角色变更
    $container.on('change', '.yyt-role-select', function() {
      const $segment = $(this).closest('.yyt-bypass-segment');
      const newRole = $(this).val();
      self._updateRoleBadge($segment, newRole);
    });
    
    // 预设选择
    $container.find(`#${SCRIPT_ID}-bypass-preset-select`).on('change', function() {
      const presetId = $(this).val();
      self._loadPreset($container, presetId);
    });
    
    // 保存
    $container.find(`#${SCRIPT_ID}-bypass-save`).on('click', () => {
      this._savePreset($container);
    });
    
    // 重置
    $container.find(`#${SCRIPT_ID}-bypass-reset`).on('click', () => {
      const presetId = $container.data('preset-id');
      this._loadPreset($container, presetId);
      showToast('info', '已重置');
    });
    
    // 导出
    $container.find(`#${SCRIPT_ID}-bypass-export`).on('click', () => {
      this._exportPreset($container);
    });
    
    // 导入
    $container.find(`#${SCRIPT_ID}-bypass-import`).on('click', () => {
      $container.find(`#${SCRIPT_ID}-bypass-import-input`).click();
    });
    
    $container.find(`#${SCRIPT_ID}-bypass-import-input`).on('change', (e) => {
      this._importPreset($container, e.target.files[0]);
    });
  },
  
  /**
   * 添加段落
   */
  _addSegment($container) {
    const $ = getJQuery();
    const $segments = $container.find('.yyt-bypass-segments');
    const index = $segments.children().length;
    
    const newSegment = this._renderSegment({
      role: 'USER',
      content: '',
      deletable: true
    }, index, false);
    
    $segments.append(newSegment);
  },
  
  /**
   * 移除段落
   */
  _removeSegment($container, $segment) {
    const $ = getJQuery();
    if (confirm('确定要删除这个段落吗？')) {
      $segment.remove();
      this._reindexSegments($container);
    }
  },
  
  /**
   * 移动段落
   */
  _moveSegment($container, $segment, direction) {
    const $ = getJQuery();
    const $segments = $container.find('.yyt-bypass-segments');
    
    if (direction === 'up') {
      const $prev = $segment.prev();
      if ($prev.length) {
        $segment.insertBefore($prev);
      }
    } else {
      const $next = $segment.next();
      if ($next.length) {
        $segment.insertAfter($next);
      }
    }
    
    this._reindexSegments($container);
  },
  
  /**
   * 重新索引段落
   */
  _reindexSegments($container) {
    const $ = getJQuery();
    $container.find('.yyt-bypass-segment').each(function(index) {
      $(this).attr('data-index', index);
    });
  },
  
  /**
   * 更新角色徽章
   */
  _updateRoleBadge($segment, newRole) {
    const $ = getJQuery();
    const roleInfo = ROLE_OPTIONS.find(r => r.value === newRole);
    if (roleInfo) {
      $segment.find('.yyt-role-badge')
        .css('background-color', roleInfo.color)
        .text(roleInfo.label);
    }
  },
  
  /**
   * 加载预设
   */
  _loadPreset($container, presetId) {
    const $ = getJQuery();
    $container.data('preset-id', presetId);
    
    const preset = getBypassPreset(presetId);
    const messages = preset?.messages || [];
    
    const $segments = $container.find('.yyt-bypass-segments');
    $segments.empty();
    
    messages.forEach((msg, index) => {
      $segments.append(this._renderSegment(msg, index, false));
    });
  },
  
  /**
   * 保存预设
   */
  _savePreset($container) {
    const $ = getJQuery();
    const presetId = $container.data('preset-id');
    const messages = [];
    
    $container.find('.yyt-bypass-segment').each(function() {
      const role = $(this).find('.yyt-role-select').val();
      const content = $(this).find('.yyt-content-textarea').val();
      const deletable = $(this).data('deletable') !== false;
      
      messages.push({
        role,
        content,
        deletable
      });
    });
    
    const success = saveBypassPreset(presetId, {
      name: DEFAULT_BYPASS_PROMPTS[presetId]?.name || presetId,
      description: '',
      messages
    });
    
    if (success) {
      showToast('success', '预设已保存');
    } else {
      showToast('error', '保存失败');
    }
  },
  
  /**
   * 导出预设
   */
  _exportPreset($container) {
    const $ = getJQuery();
    const presetId = $container.data('preset-id');
    const preset = getBypassPreset(presetId);
    
    if (!preset) {
      showToast('warning', '没有可导出的预设');
      return;
    }
    
    const json = JSON.stringify(preset, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `bypass-preset-${presetId}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('success', '已导出');
  },
  
  /**
   * 导入预设
   */
  _importPreset($container, file) {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        
        if (!imported.messages || !Array.isArray(imported.messages)) {
          showToast('error', '无效的预设格式');
          return;
        }
        
        const $ = getJQuery();
        const $segments = $container.find('.yyt-bypass-segments');
        $segments.empty();
        
        imported.messages.forEach((msg, index) => {
          $segments.append(this._renderSegment(msg, index, false));
        });
        
        showToast('success', '已导入');
      } catch (err) {
        showToast('error', '导入失败: ' + err.message);
      }
    };
    reader.readAsText(file);
  },
  
  /**
   * 获取样式
   */
  getStyles() {
    return `
      .yyt-bypass-editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .yyt-bypass-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 8px;
      }
      
      .yyt-bypass-actions {
        display: flex;
        gap: 8px;
      }
      
      .yyt-bypass-segments {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .yyt-bypass-segment {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        overflow: hidden;
      }
      
      .yyt-segment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        background: rgba(255, 255, 255, 0.03);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      
      .yyt-segment-role {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .yyt-role-badge {
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        color: white;
      }
      
      .yyt-role-select {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        color: inherit;
        padding: 4px 8px;
        font-size: 12px;
      }
      
      .yyt-segment-actions {
        display: flex;
        gap: 4px;
      }
      
      .yyt-segment-content {
        padding: 12px;
      }
      
      .yyt-content-textarea {
        min-height: 100px;
        resize: vertical;
      }
      
      .yyt-bypass-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding-top: 8px;
      }
      
      .yyt-btn-icon {
        width: 32px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .yyt-btn-danger:hover {
        background: rgba(255, 107, 107, 0.2);
        color: #ff6b6b;
      }
    `;
  }
};

export default BypassEditor;
```

### 3.5 工具面板重构

**文件路径**: `modules/ui/components/summary-tool-panel.js`

```javascript
/**
 * YouYou Toolkit - 通用工具面板组件
 * @description 支持提示词编辑、API预设绑定、破限词选择
 */

import { SCRIPT_ID, escapeHtml, showToast, getJQuery } from '../utils.js';
import { getToolFullConfig, saveToolConfig, resetToolConfig } from '../../tool-registry.js';
import { getAllBypassPresets } from '../../bypass-prompts.js';
import { getAllPresets } from '../../preset-manager.js';

// ============================================================
// 组件定义
// ============================================================
export const SummaryToolPanel = {
  id: 'summaryToolPanel',
  toolId: 'summaryTool',
  
  /**
   * 渲染组件
   */
  render(props) {
    const config = getToolFullConfig(this.toolId);
    const apiPresets = getAllPresets();
    const bypassPresets = getAllBypassPresets();
    
    return `
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <!-- 工具配置区 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>工具配置</span>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API预设</label>
              <select class="yyt-select" id="${SCRIPT_ID}-tool-api-preset">
                <option value="">使用当前API配置</option>
                ${apiPresets.map(p => 
                  `<option value="${p.name}" ${p.name === config.apiPreset ? 'selected' : ''}>
                    ${p.name}
                  </option>`
                ).join('')}
              </select>
            </div>
            
            <div class="yyt-form-group yyt-flex-1">
              <label>破限词预设</label>
              <select class="yyt-select" id="${SCRIPT_ID}-tool-bypass-preset">
                <option value="">不使用破限词</option>
                ${Object.entries(bypassPresets).map(([id, p]) => 
                  `<option value="${id}" ${id === config.bypassPreset ? 'selected' : ''}>
                    ${p.name}
                  </option>`
                ).join('')}
              </select>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>输出模式</label>
              <select class="yyt-select" id="${SCRIPT_ID}-tool-output-mode">
                <option value="inline" ${config.outputMode === 'inline' ? 'selected' : ''}>
                  随AI输出
                </option>
                <option value="separate" ${config.outputMode === 'separate' ? 'selected' : ''}>
                  额外AI解析
                </option>
              </select>
            </div>
            
            <div class="yyt-form-group yyt-flex-1">
              <label>提取标签 (逗号分隔)</label>
              <input type="text" class="yyt-input" id="${SCRIPT_ID}-tool-extract-tags" 
                     value="${(config.extractTags || []).join(', ')}" 
                     placeholder="boo_FM, status_block">
            </div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${SCRIPT_ID}-tool-enabled" ${config.enabled ? 'checked' : ''}>
              <span>启用此工具</span>
            </label>
          </div>
        </div>
        
        <!-- 提示词模板编辑区 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-file-code"></i>
            <span>提示词模板</span>
            <div class="yyt-title-actions">
              <button class="yyt-btn yyt-btn-small" id="${SCRIPT_ID}-tool-reset-template">
                <i class="fa-solid fa-undo"></i> 重置模板
              </button>
            </div>
          </div>
          
          <div class="yyt-form-group">
            <textarea class="yyt-textarea yyt-code-textarea" 
                      id="${SCRIPT_ID}-tool-prompt-template" 
                      rows="15" 
                      placeholder="输入提示词模板...">${escapeHtml(config.promptTemplate || '')}</textarea>
          </div>
          
          <div class="yyt-help-text">
            <p><strong>可用变量:</strong></p>
            <code>{{userMessage}}</code> - 用户消息
            <code>{{lastAiMessage}}</code> - 上一条AI消息
            <code>{{extractedContent}}</code> - 正则提取的内容
            <code>{{previousToolOutput}}</code> - 上一轮工具输出
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-tool-reset">
              <i class="fa-solid fa-undo"></i> 重置全部
            </button>
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${SCRIPT_ID}-tool-save">
              <i class="fa-solid fa-save"></i> 保存配置
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-tool-test">
              <i class="fa-solid fa-play"></i> 测试执行
            </button>
          </div>
        </div>
      </div>
    `;
  },
  
  /**
   * 绑定事件
   */
  bindEvents($container, dependencies) {
    const $ = getJQuery();
    const self = this;
    
    // 保存配置
    $container.find(`#${SCRIPT_ID}-tool-save`).on('click', () => {
      this._saveConfig($container);
    });
    
    // 重置全部
    $container.find(`#${SCRIPT_ID}-tool-reset`).on('click', () => {
      if (confirm('确定要重置所有配置吗？')) {
        resetToolConfig(this.toolId);
        this._refreshUI($container);
        showToast('info', '已重置');
      }
    });
    
    // 重置模板
    $container.find(`#${SCRIPT_ID}-tool-reset-template`).on('click', () => {
      const defaultConfig = getToolFullConfig(this.toolId);
      $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(defaultConfig.promptTemplate);
      showToast('info', '模板已重置');
    });
    
    // 测试执行
    $container.find(`#${SCRIPT_ID}-tool-test`).on('click', () => {
      this._testExecute($container);
    });
  },
  
  /**
   * 保存配置
   */
  _saveConfig($container) {
    const $ = getJQuery();
    
    const config = {
      apiPreset: $container.find(`#${SCRIPT_ID}-tool-api-preset`).val(),
      bypassPreset: $container.find(`#${SCRIPT_ID}-tool-bypass-preset`).val(),
      outputMode: $container.find(`#${SCRIPT_ID}-tool-output-mode`).val(),
      extractTags: $container.find(`#${SCRIPT_ID}-tool-extract-tags`).val()
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      promptTemplate: $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(),
      enabled: $container.find(`#${SCRIPT_ID}-tool-enabled`).is(':checked')
    };
    
    const success = saveToolConfig(this.toolId, config);
    
    if (success) {
      showToast('success', '配置已保存');
    } else {
      showToast('error', '保存失败');
    }
  },
  
  /**
   * 刷新UI
   */
  _refreshUI($container) {
    const config = getToolFullConfig(this.toolId);
    const $ = getJQuery();
    
    $container.find(`#${SCRIPT_ID}-tool-api-preset`).val(config.apiPreset);
    $container.find(`#${SCRIPT_ID}-tool-bypass-preset`).val(config.bypassPreset);
    $container.find(`#${SCRIPT_ID}-tool-output-mode`).val(config.outputMode);
    $container.find(`#${SCRIPT_ID}-tool-extract-tags`).val((config.extractTags || []).join(', '));
    $container.find(`#${SCRIPT_ID}-tool-prompt-template`).val(config.promptTemplate);
    $container.find(`#${SCRIPT_ID}-tool-enabled`).prop('checked', config.enabled);
  },
  
  /**
   * 测试执行
   */
  async _testExecute($container) {
    showToast('info', '测试执行中...');
    // 实际执行逻辑
  },
  
  /**
   * 获取样式
   */
  getStyles() {
    return `
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 13px;
        line-height: 1.5;
        tab-size: 2;
      }
      
      .yyt-help-text {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        padding: 10px;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 6px;
      }
      
      .yyt-help-text code {
        background: rgba(123, 183, 255, 0.15);
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 11px;
        color: #7bb7ff;
      }
      
      .yyt-title-actions {
        margin-left: auto;
      }
      
      .yyt-btn-small {
        padding: 4px 10px;
        font-size: 12px;
      }
      
      .yyt-checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      
      .yyt-checkbox-label input[type="checkbox"] {
        width: 16px;
        height: 16px;
      }
    `;
  }
};

export default SummaryToolPanel;
```

---

## 四、UI层级结构

### 4.1 主界面入口

```
┌────────────────────────────────────────────────────────────────┐
│                        YouYou Toolkit                          │
├───────────┬───────────┬───────────┬────────────────────────────┤
│ API预设管理 │  正则提取  │   破限词   │          工具库             │
│           │           │           │                            │
│  预设列表  │  规则配置  │ 预设选择   │  ┌──────────────────────┐  │
│  添加/编辑 │  规则测试  │ 段落编辑   │  │ 摘要工具 │ 状态栏 │...│  │
│  导入/导出 │  预设管理  │ 导入/导出   │  └──────────────────────┘  │
│           │           │           │                            │
└───────────┴───────────┴───────────┴────────────────────────────┘
```

### 4.2 工具库内部结构

```
┌────────────────────────────────────────────────────────────────┐
│  工具库                                                         │
├────────────────────────────────────────────────────────────────┤
│  [摘要工具] [主角状态栏] [更多工具...]                             │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 工具配置                                                  │   │
│  │ API预设: [选择预设▼]  破限词: [选择预设▼]                │   │
│  │ 输出模式: [随AI输出▼]  提取标签: boo_FM                  │   │
│  │ ☑ 启用此工具                                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 提示词模板                                    [重置模板] │   │
│  │ ┌─────────────────────────────────────────────────────┐ │   │
│  │ │ <boo_FM>                                            │ │   │
│  │ │ <pg>No.{{pg}}</pg>                                  │ │   │
│  │ │ ...                                                 │ │   │
│  │ └─────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [重置全部]                          [保存配置] [测试执行]      │
└────────────────────────────────────────────────────────────────┘
```

---

## 五、实施清单

### 阶段一：核心架构（已完成 ✓）

1. **修改 tool-registry.js** ✓
   - [x] 添加工具配置存储功能
   - [x] 实现`getToolFullConfig`函数
   - [x] 实现`saveToolConfig`函数
   - [x] 实现`resetToolConfig`函数
   - [x] 添加`DEFAULT_TOOL_CONFIGS`默认配置

2. **增强 tool-executor.js** ✓
   - [x] 添加`executeToolWithConfig`函数
   - [x] 添加`buildToolMessages`函数
   - [x] 实现模板变量替换逻辑
   - [x] 添加`executeToolsBatch`函数
   - [x] 添加`getToolsForEvent`函数

3. **实现 tool-trigger.js 事件监听** ✓
   - [x] 添加`initToolTriggerManager`函数
   - [x] 注册`GENERATION_ENDED`事件监听
   - [x] 实现`buildToolExecutionContext`函数
   - [x] 添加`destroyToolTriggerManager`函数

### 阶段二：UI重构（已完成 ✓）

4. **创建破限词可视化编辑器** ✓
   - [x] 创建`bypass-editor.js`组件
   - [x] 实现段落式编辑界面
   - [x] 实现角色选择功能
   - [x] 实现导入导出功能

5. **重构工具面板组件** ✓
   - [x] 重构`summary-tool-panel.js`
   - [x] 重构`status-block-panel.js`
   - [x] 添加提示词模板编辑器
   - [x] 添加API预设选择器
   - [x] 添加破限词选择器

6. **更新事件总线** ✓
   - [x] 添加`TOOL_EXECUTION_STARTED`事件
   - [x] 添加`TOOL_EXECUTION_FAILED`事件
   - [x] 添加`TOOL_TRIGGER_INITIALIZED`事件

### 阶段三：集成测试（进行中）

7. **功能测试**
   - [ ] 测试事件监听链路
   - [ ] 测试工具执行流程
   - [ ] 测试破限词注入
   - [ ] 测试API预设切换

8. **文档更新** ✓
   - [x] 更新实施清单
   - [ ] 更新用户文档
   - [ ] 更新API文档

---

## 六、风险与缓解

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 事件监听冲突 | 中 | 高 | 使用命名空间隔离事件 |
| API调用失败 | 中 | 高 | 添加重试机制和错误处理 |
| 数据迁移问题 | 低 | 中 | 提供迁移脚本和回滚机制 |
| UI兼容性问题 | 低 | 低 | 保留原有样式变量 |

---

## 七、验收标准

1. **功能验收**
   - [ ] 工具可以通过UI选择API预设和破限词预设
   - [ ] 工具提示词模板可编辑并保存
   - [ ] `GENERATION_ENDED`事件能正确触发工具执行
   - [ ] 破限词可视化编辑器可正常使用

2. **性能验收**
   - [ ] 工具执行时间 < 30秒
   - [ ] UI响应时间 < 100ms

3. **兼容性验收**
   - [ ] 不影响现有功能
   - [ ] 支持从旧版本迁移数据