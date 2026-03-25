/**
 * YouYou Toolkit - 正则提取模块
 * @description 提供正则表达式匹配、内容提取和标签过滤功能
 * @version 2.0.0
 */

import { storage } from './core/storage-service.js';

const SETTINGS_STORAGE_KEY = 'settings';

function getDefaultSettingsSnapshot() {
  return {
    apiConfig: {
      url: '',
      apiKey: '',
      model: '',
      useMainApi: true,
      max_tokens: 4096,
      temperature: 0.7,
      top_p: 0.9
    },
    currentPreset: '',
    uiSettings: {
      theme: 'dark',
      lastTab: 'api'
    },
    ruleTemplates: [...DEFAULT_RULE_TEMPLATES],
    tagRules: [],
    contentBlacklist: [],
    tagRulePresets: {}
  };
}

function loadStoredSettings() {
  return storage.get(SETTINGS_STORAGE_KEY, getDefaultSettingsSnapshot());
}

function saveStoredSettings(settings) {
  storage.set(SETTINGS_STORAGE_KEY, settings);
}

// ============================================================
// 常量定义
// ============================================================

const SCRIPT_ID = 'youyou_toolkit';

// 排除的常见HTML标签（用于标签名验证）
const EXCLUDED_HTML_TAGS = [
  'font', 'span', 'div', 'p', 'br', 'hr', 'img', 'a', 'b', 'i', 'u', 's',
  'em', 'strong', 'small', 'big', 'sub', 'sup', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'table', 'tr', 'td', 'th', 'tbody', 'thead', 'tfoot', 'ul', 'ol', 'li',
  'form', 'input', 'button', 'select', 'option', 'textarea', 'label',
  'script', 'style', 'meta', 'link', 'title', 'head', 'body', 'html'
];

// 默认规则模板
const DEFAULT_RULE_TEMPLATES = [
  {
    id: 'exclude-thinking',
    name: '排除思考标签',
    description: '移除<thinking>标签块',
    type: 'exclude',
    value: 'thinking',
    enabled: true
  },
  {
    id: 'include-content',
    name: '提取内容标签',
    description: '提取<content>标签内容',
    type: 'include',
    value: 'content',
    enabled: true
  },
  {
    id: 'regex-exclude-cot',
    name: '排除小CoT',
    description: '移除HTML注释',
    type: 'regex_exclude',
    value: '<!--[\\s\\S]*?-->',
    enabled: false
  },
  {
    id: 'regex-include-details',
    name: '提取details标签',
    description: '提取<details>标签内容',
    type: 'regex_include',
    value: '<details[^>]*>([\\s\\S]*?)</details>',
    enabled: false
  }
];

// ============================================================
// 状态管理
// ============================================================

let ruleTemplates = [];
let tagRules = [];
let contentBlacklist = [];

// ============================================================
// 初始化
// ============================================================

function init() {
  const settings = loadStoredSettings();
  
  // 加载规则模板
  ruleTemplates = settings.ruleTemplates || [...DEFAULT_RULE_TEMPLATES];
  
  // 加载当前标签规则
  tagRules = settings.tagRules || [];
  
  // 加载黑名单
  contentBlacklist = settings.contentBlacklist || [];
  
  return { ruleTemplates, tagRules, contentBlacklist };
}

// ============================================================
// 工具函数
// ============================================================

/**
 * 转义字符串中的正则特殊字符
 * @param {string} str - 要转义的字符串
 * @returns {string} 转义后的字符串
 */
export function escapeRegex(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 检查内容是否应该被跳过（基于黑名单）
 * @param {string} text - 要检查的内容
 * @param {string[]} blacklist - 黑名单关键词数组
 * @returns {boolean} 如果应该跳过则返回 true
 */
export function shouldSkipContent(text, blacklist) {
  if (!blacklist || blacklist.length === 0) return false;
  if (!text || typeof text !== 'string') return false;

  const lowerText = text.toLowerCase();
  return blacklist.some(keyword => {
    const lowerKeyword = keyword.trim().toLowerCase();
    return lowerKeyword && lowerText.includes(lowerKeyword);
  });
}

/**
 * 验证标签名是否适合提取
 * @param {string} tagName - 要验证的标签名
 * @returns {boolean} 如果标签名有效则返回 true
 */
export function isValidTagName(tagName) {
  if (!tagName || typeof tagName !== 'string') return false;
  
  // 必须是字母开头，可包含下划线和连字符
  const validPattern = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
  
  return validPattern.test(tagName) && !EXCLUDED_HTML_TAGS.includes(tagName.toLowerCase());
}

// ============================================================
// 核心提取函数
// ============================================================

/**
 * 使用简单标签名提取内容
 * @param {string} text - 搜索文本
 * @param {string} tag - 简单标签名，如 "content" 或 "thinking"
 * @returns {string[]} 提取的内容数组
 * 
 * 示例: tag = "content"
 * 匹配: <content>提取这部分</content>
 * 返回: ["提取这部分"]
 */
export function extractSimpleTag(text, tag) {
  if (!text || !tag) return [];
  
  const extractedContent = [];
  const escapedTag = escapeRegex(tag);
  const regex = new RegExp(`<${escapedTag}>([\\s\\S]*?)<\\/${escapedTag}>`, 'gi');
  const matches = [...text.matchAll(regex)];

  matches.forEach(match => {
    if (match[1]) {
      extractedContent.push(match[1].trim());
    }
  });

  // 未闭合标签警告
  const openTags = (text.match(new RegExp(`<${escapedTag}>`, 'gi')) || []).length;
  const closeTags = (text.match(new RegExp(`<\\/${escapedTag}>`, 'gi')) || []).length;
  if (openTags > closeTags) {
    console.warn(`[YouYouToolkit] 警告: 发现 ${openTags - closeTags} 个未闭合的 <${tag}> 标签`);
  }

  return extractedContent;
}

/**
 * 使用花括号管道格式提取内容
 * @param {string} text - 搜索文本
 * @param {string} tag - 标签名，如 "outputstory" 对应格式 {outputstory|content}
 * @returns {string[]} 提取的内容数组
 * 
 * 示例: tag = "story"
 * 匹配: {story|这部分内容}
 * 返回: ["这部分内容"]
 * 
 * 特性: 支持嵌套花括号，使用计数器确保正确匹配
 */
export function extractCurlyBraceTag(text, tag) {
  if (!text || !tag) return [];
  
  const extractedContent = [];
  const escapedTag = escapeRegex(tag);

  // 查找所有起始位置
  const startPattern = new RegExp(`\\{${escapedTag}\\|`, 'gi');
  let match;

  while ((match = startPattern.exec(text)) !== null) {
    const startPos = match.index;
    const contentStart = startPos + match[0].length;

    // 使用花括号计数器处理嵌套
    let braceCount = 1;
    let pos = contentStart;

    while (pos < text.length && braceCount > 0) {
      if (text[pos] === '{') {
        braceCount++;
      } else if (text[pos] === '}') {
        braceCount--;
      }
      pos++;
    }

    if (braceCount === 0) {
      const content = text.substring(contentStart, pos - 1);
      if (content.trim()) {
        extractedContent.push(content.trim());
      }
    }

    // 继续搜索
    startPattern.lastIndex = startPos + 1;
  }

  return extractedContent;
}

/**
 * 使用复杂标签配置提取内容
 * @param {string} text - 搜索文本
 * @param {string} tag - 复杂标签配置，如 "<details><summary>摘要</summary>,</details>"
 * @returns {string[]} 提取的内容数组
 * 
 * 格式说明: 用逗号分隔起始模式和结束模式
 * 示例: tag = "<details><summary>摘要</summary>,</details>"
 *       起始模式: <details><summary>摘要</summary>
 *       结束模式: </details>
 * 匹配: <details><summary>摘要</summary>内容</details>
 * 返回: ["内容"]
 */
export function extractComplexTag(text, tag) {
  if (!text || !tag) return [];
  
  const parts = tag.split(',');
  if (parts.length !== 2) {
    console.error(`[YouYouToolkit] 复杂标签配置格式错误，应该包含一个逗号: ${tag}`);
    return [];
  }

  const startPattern = parts[0].trim();
  const endPattern = parts[1].trim();

  // 提取结束标签名
  const endTagMatch = endPattern.match(/<\/(\w+)>/);
  if (!endTagMatch) {
    console.error(`[YouYouToolkit] 无法解析结束标签: ${endPattern}`);
    return [];
  }
  const endTagName = endTagMatch[1];

  // 构建匹配正则
  const regex = new RegExp(`${escapeRegex(startPattern)}([\\s\\S]*?)<\\/${endTagName}>`, 'gi');

  const extractedContent = [];
  const matches = [...text.matchAll(regex)];

  matches.forEach(match => {
    if (match[1]) {
      extractedContent.push(match[1].trim());
    }
  });

  return extractedContent;
}

/**
 * 使用HTML格式标签提取内容
 * @param {string} text - 搜索文本
 * @param {string} tag - HTML格式标签，如 "<content></content>"
 * @returns {string[]} 提取的内容数组
 * 
 * 特性: 支持标签属性
 * 示例: tag = "<content>"
 * 匹配: <content class="main">内容</content>
 * 返回: ["内容"]
 */
export function extractHtmlFormatTag(text, tag) {
  if (!text || !tag) return [];
  
  // 提取标签名，处理可能的属性
  const tagMatch = tag.match(/<(\w+)(?:\s[^>]*)?>/);
  if (!tagMatch) {
    console.error(`[YouYouToolkit] 无法解析HTML格式标签: ${tag}`);
    return [];
  }
  const tagName = tagMatch[1];

  const extractedContent = [];
  const regex = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
  const matches = [...text.matchAll(regex)];

  matches.forEach(match => {
    if (match[1]) {
      extractedContent.push(match[1].trim());
    }
  });

  // 未闭合标签检查
  const openTags = (text.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>`, 'gi')) || []).length;
  const closeTags = (text.match(new RegExp(`<\\/${tagName}>`, 'gi')) || []).length;

  if (openTags > closeTags) {
    console.warn(`[YouYouToolkit] 警告: 发现 ${openTags - closeTags} 个未闭合的 <${tagName}> 标签`);
  }

  return extractedContent;
}

// ============================================================
// 主提取函数 - 三阶段架构
// ============================================================

/**
 * 根据规则集从文本中提取和过滤内容
 * @param {string} text - 输入文本
 * @param {Array<object>} rules - 规则数组
 * @param {Array<string>} blacklist - 黑名单关键词数组
 * @returns {string} 处理后的内容
 * 
 * 处理流程（三阶段架构）：
 * Phase 1: 全局块级排除 (exclude 规则)
 * Phase 2: 内容提取 (include / regex_include 规则)
 * Phase 3: 内部清理与黑名单过滤 (regex_exclude 规则 + 黑名单)
 */
export function extractTagContent(text, rules, blacklist = []) {
  if (!text) return '';
  if (!rules || rules.length === 0) {
    return text;
  }

  // 规则分类
  const blockExcludeRules = rules.filter(rule => rule.type === 'exclude' && rule.enabled);
  const includeRules = rules.filter(rule => (rule.type === 'include' || rule.type === 'regex_include') && rule.enabled);
  const cleanupRules = rules.filter(rule => rule.type === 'regex_exclude' && rule.enabled);

  let workingText = text;

  // ============================================================
  // Phase 1: Global Block-Level Exclusion
  // ============================================================
  for (const rule of blockExcludeRules) {
    try {
      const tagRegex = new RegExp(
        `<${escapeRegex(rule.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${escapeRegex(rule.value)}>`, 
        'gi'
      );
      workingText = workingText.replace(tagRegex, '');
    } catch (error) {
      console.error(`[YouYouToolkit] Error applying block exclusion rule:`, { rule, error });
    }
  }

  // ============================================================
  // Phase 2: Content Extraction
  // ============================================================
  let extractedContents = [];
  
  if (includeRules.length > 0) {
    for (const rule of includeRules) {
      let results = [];
      try {
        if (rule.type === 'include') {
          // 简单标签提取 - 同时尝试HTML标签和花括号格式
          results.push(...extractSimpleTag(workingText, rule.value));
          results.push(...extractCurlyBraceTag(workingText, rule.value));
        } else if (rule.type === 'regex_include') {
          // 正则表达式提取 - 使用第一个捕获组
          const regex = new RegExp(rule.value, 'gi');
          const matches = [...workingText.matchAll(regex)];
          matches.forEach(match => {
            if (match[1]) results.push(match[1]);
          });
        }
      } catch (error) {
        console.error(`[YouYouToolkit] Error applying inclusion rule:`, { rule, error });
      }
      
      results.forEach(content => extractedContents.push(content.trim()));
    }
  } else {
    // 无包含规则时，使用全部文本
    extractedContents.push(workingText);
  }

  // ============================================================
  // Phase 3: Inner Content Cleanup & Blacklist Filtering
  // ============================================================
  let finalContents = [];
  
  for (let contentBlock of extractedContents) {
    // 应用 regex_exclude 清理规则
    for (const rule of cleanupRules) {
      try {
        const regex = new RegExp(rule.value, 'gi');
        contentBlock = contentBlock.replace(regex, '');
      } catch (error) {
        console.error(`[YouYouToolkit] Error applying cleanup rule:`, { rule, error });
      }
    }

    // 应用黑名单
    if (!shouldSkipContent(contentBlock, blacklist)) {
      finalContents.push(contentBlock);
    }
  }

  // ============================================================
  // 合并并清理
  // ============================================================
  const joinedContent = finalContents.join('\n\n');
  return joinedContent
    .replace(/\n\s*\n\s*\n/g, '\n\n')  // 最多保留双换行
    .replace(/^\s+|\s+$/g, '')          // 去除首尾空白
    .trim();
}

// ============================================================
// 标签扫描功能
// ============================================================

/**
 * 高效扫描大文本中可用的标签
 * @param {string} text - 要扫描的大文本内容（可达数十万字符）
 * @param {object} options - 扫描选项
 * @param {number} options.chunkSize - 文本块大小（默认: 50000）
 * @param {number} options.maxTags - 最大发现标签数（默认: 100）
 * @param {number} options.timeoutMs - 最大处理时间（默认: 5000ms）
 * @returns {Promise<object>} 包含发现标签和性能统计的对象
 */
export async function scanTextForTags(text, options = {}) {
  const startTime = performance.now();
  const {
    chunkSize = 50000,
    maxTags = 100,
    timeoutMs = 5000
  } = options;

  const foundTags = new Set();
  
  // 统一匹配 HTML 标签和花括号格式标签
  // match[1] 用于 <tag>, match[2] 用于 {tag}
  const tagRegex = /<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g;

  let processedChars = 0;
  let chunkCount = 0;

  // 分块处理
  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.slice(i, Math.min(i + chunkSize, text.length));
    chunkCount++;
    processedChars += chunk.length;

    // 超时检查
    if (performance.now() - startTime > timeoutMs) {
      console.warn(`[YouYouToolkit] Tag scanning timed out after ${timeoutMs}ms`);
      break;
    }

    // 执行匹配
    let match;
    while ((match = tagRegex.exec(chunk)) !== null && foundTags.size < maxTags) {
      const tagName = (match[1] || match[2]).toLowerCase();
      if (isValidTagName(tagName)) {
        foundTags.add(tagName);
      }
    }

    if (foundTags.size >= maxTags) break;

    // 每5个块让出主线程
    if (chunkCount % 5 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }

  const endTime = performance.now();

  return {
    tags: Array.from(foundTags).sort(),
    stats: {
      processingTimeMs: Math.round(endTime - startTime),
      processedChars,
      totalChars: text.length,
      chunkCount,
      tagsFound: foundTags.size
    }
  };
}

/**
 * 基于扫描结果生成标签建议
 * @param {object} scanResult - scanTextForTags 的结果
 * @param {number} limit - 最大建议数量（默认: 25）
 * @returns {object} 包含建议数组和详细统计的对象
 */
export function generateTagSuggestions(scanResult, limit = 25) {
  const suggestions = scanResult.tags.slice(0, limit);

  return {
    suggestions: suggestions,
    stats: {
      totalFound: scanResult.stats.tagsFound,
      finalCount: suggestions.length
    }
  };
}

// ============================================================
// 规则管理
// ============================================================

/**
 * 获取所有规则模板
 * @returns {Array} 规则模板数组
 */
export function getAllRuleTemplates() {
  if (ruleTemplates.length === 0) {
    init();
  }
  return ruleTemplates;
}

/**
 * 获取规则模板
 * @param {string} id - 模板ID
 * @returns {object|undefined} 模板对象
 */
export function getRuleTemplate(id) {
  return ruleTemplates.find(t => t.id === id);
}

/**
 * 创建规则模板
 * @param {object} template - 模板数据
 * @returns {object} 结果对象
 */
export function createRuleTemplate(template) {
  const newTemplate = {
    id: `rule-${Date.now()}`,
    name: template.name || '新规则',
    description: template.description || '',
    type: template.type || 'include',
    value: template.value || '',
    enabled: template.enabled !== false,
    createdAt: new Date().toISOString()
  };
  
  ruleTemplates.push(newTemplate);
  saveRuleTemplates();
  return { success: true, template: newTemplate, message: '规则模板创建成功' };
}

/**
 * 更新规则模板
 * @param {string} id - 模板ID
 * @param {object} updates - 更新数据
 * @returns {object} 结果对象
 */
export function updateRuleTemplate(id, updates) {
  const index = ruleTemplates.findIndex(t => t.id === id);
  if (index === -1) {
    return { success: false, message: '规则模板不存在' };
  }
  
  ruleTemplates[index] = {
    ...ruleTemplates[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  saveRuleTemplates();
  return { success: true, template: ruleTemplates[index], message: '规则模板更新成功' };
}

/**
 * 删除规则模板
 * @param {string} id - 模板ID
 * @returns {object} 结果对象
 */
export function deleteRuleTemplate(id) {
  const index = ruleTemplates.findIndex(t => t.id === id);
  if (index === -1) {
    return { success: false, message: '规则模板不存在' };
  }
  
  ruleTemplates.splice(index, 1);
  saveRuleTemplates();
  return { success: true, message: '规则模板已删除' };
}

/**
 * 保存规则模板到存储
 */
function saveRuleTemplates() {
  const settings = loadStoredSettings();
  settings.ruleTemplates = ruleTemplates;
  saveStoredSettings(settings);
}

// ============================================================
// 当前标签规则管理
// ============================================================

/**
 * 获取当前标签规则
 * @returns {Array} 标签规则数组
 */
export function getTagRules() {
  if (!tagRules) {
    init();
  }
  return tagRules;
}

/**
 * 设置当前标签规则
 * @param {Array} rules - 规则数组
 */
export function setTagRules(rules) {
  tagRules = rules || [];
  const settings = loadStoredSettings();
  settings.tagRules = tagRules;
  saveStoredSettings(settings);
}

/**
 * 添加标签规则
 * @param {object} rule - 规则对象
 * @returns {object} 结果对象
 */
export function addTagRule(rule) {
  const newRule = {
    id: `tag-${Date.now()}`,
    type: rule.type || 'include',
    value: rule.value || '',
    enabled: rule.enabled !== false
  };
  
  tagRules.push(newRule);
  
  const settings = loadStoredSettings();
  settings.tagRules = tagRules;
  saveStoredSettings(settings);
  
  return { success: true, rule: newRule, message: '规则添加成功' };
}

/**
 * 更新标签规则
 * @param {number} index - 规则索引
 * @param {object} updates - 更新数据
 * @returns {object} 结果对象
 */
export function updateTagRule(index, updates) {
  if (index < 0 || index >= tagRules.length) {
    return { success: false, message: '规则索引无效' };
  }
  
  tagRules[index] = {
    ...tagRules[index],
    ...updates
  };
  
  const settings = loadStoredSettings();
  settings.tagRules = tagRules;
  saveStoredSettings(settings);
  
  return { success: true, rule: tagRules[index], message: '规则更新成功' };
}

/**
 * 删除标签规则
 * @param {number} index - 规则索引
 * @returns {object} 结果对象
 */
export function deleteTagRule(index) {
  if (index < 0 || index >= tagRules.length) {
    return { success: false, message: '规则索引无效' };
  }
  
  tagRules.splice(index, 1);
  
  const settings = loadStoredSettings();
  settings.tagRules = tagRules;
  saveStoredSettings(settings);
  
  return { success: true, message: '规则已删除' };
}

// ============================================================
// 黑名单管理
// ============================================================

/**
 * 获取内容黑名单
 * @returns {Array} 黑名单数组
 */
export function getContentBlacklist() {
  if (!contentBlacklist) {
    init();
  }
  return contentBlacklist;
}

/**
 * 设置内容黑名单
 * @param {Array} blacklist - 黑名单数组
 */
export function setContentBlacklist(blacklist) {
  contentBlacklist = blacklist || [];
  const settings = loadStoredSettings();
  settings.contentBlacklist = contentBlacklist;
  saveStoredSettings(settings);
}

// ============================================================
// 预设管理
// ============================================================

/**
 * 保存当前规则为预设
 * @param {string} name - 预设名称
 * @param {string} description - 预设描述
 * @returns {object} 结果对象
 */
export function saveRulesAsPreset(name, description = '') {
  if (!name || !name.trim()) {
    return { success: false, message: '预设名称不能为空' };
  }
  
  const settings = loadStoredSettings();
  
  if (!settings.tagRulePresets) {
    settings.tagRulePresets = {};
  }
  
  const presetId = `preset-${Date.now()}`;
  settings.tagRulePresets[presetId] = {
    id: presetId,
    name: name.trim(),
    description: description.trim(),
    rules: JSON.parse(JSON.stringify(tagRules)),
    blacklist: JSON.parse(JSON.stringify(contentBlacklist)),
    createdAt: new Date().toISOString()
  };
  
  saveStoredSettings(settings);
  
  return { success: true, preset: settings.tagRulePresets[presetId], message: '预设保存成功' };
}

/**
 * 获取所有预设
 * @returns {Array} 预设数组
 */
export function getAllRulePresets() {
  const settings = loadStoredSettings();
  const presets = settings.tagRulePresets || {};
  return Object.values(presets);
}

/**
 * 加载预设
 * @param {string} presetId - 预设ID
 * @returns {object} 结果对象
 */
export function loadRulePreset(presetId) {
  const settings = loadStoredSettings();
  const presets = settings.tagRulePresets || {};
  const preset = presets[presetId];
  
  if (!preset) {
    return { success: false, message: '预设不存在' };
  }
  
  tagRules = JSON.parse(JSON.stringify(preset.rules || []));
  contentBlacklist = JSON.parse(JSON.stringify(preset.blacklist || []));
  
  settings.tagRules = tagRules;
  settings.contentBlacklist = contentBlacklist;
  saveStoredSettings(settings);
  
  return { success: true, preset, message: '预设加载成功' };
}

/**
 * 删除预设
 * @param {string} presetId - 预设ID
 * @returns {object} 结果对象
 */
export function deleteRulePreset(presetId) {
  const settings = loadStoredSettings();
  const presets = settings.tagRulePresets || {};
  
  if (!presets[presetId]) {
    return { success: false, message: '预设不存在' };
  }
  
  delete presets[presetId];
  settings.tagRulePresets = presets;
  saveStoredSettings(settings);
  
  return { success: true, message: '预设已删除' };
}

// ============================================================
// 导入导出
// ============================================================

/**
 * 导出规则配置
 * @returns {string} JSON字符串
 */
export function exportRulesConfig() {
  return JSON.stringify({
    tagRules,
    contentBlacklist,
    ruleTemplates,
    tagRulePresets: loadStoredSettings().tagRulePresets || {}
  }, null, 2);
}

/**
 * 导入规则配置
 * @param {string} json - JSON字符串
 * @param {object} options - 导入选项
 * @returns {object} 结果对象
 */
export function importRulesConfig(json, options = { overwrite: true }) {
  try {
    const imported = JSON.parse(json);
    
    if (options.overwrite) {
      tagRules = imported.tagRules || [];
      contentBlacklist = imported.contentBlacklist || [];
      ruleTemplates = imported.ruleTemplates || DEFAULT_RULE_TEMPLATES;
    } else {
      // 合并规则
      if (imported.tagRules) {
        tagRules.push(...imported.tagRules);
      }
      if (imported.contentBlacklist) {
        const existingBlacklist = new Set(contentBlacklist.map(k => k.toLowerCase()));
        imported.contentBlacklist.forEach(k => {
          if (!existingBlacklist.has(k.toLowerCase())) {
            contentBlacklist.push(k);
          }
        });
      }
    }
    
    const settings = loadStoredSettings();
    settings.tagRules = tagRules;
    settings.contentBlacklist = contentBlacklist;
    settings.ruleTemplates = ruleTemplates;
    if (imported.tagRulePresets) {
      settings.tagRulePresets = {
        ...(settings.tagRulePresets || {}),
        ...imported.tagRulePresets
      };
    }
    saveStoredSettings(settings);
    
    return { success: true, message: '配置导入成功' };
  } catch (e) {
    return { success: false, message: `导入失败: ${e.message}` };
  }
}

// ============================================================
// 正则测试功能（保留原有功能）
// ============================================================

/**
 * 测试正则表达式
 * @param {string} pattern - 正则模式
 * @param {string} text - 测试文本
 * @param {string} flags - 正则标志
 * @param {number} groupIndex - 捕获组索引
 * @returns {object} 测试结果
 */
export function testRegex(pattern, text, flags = 'g', groupIndex = 0) {
  try {
    if (!pattern || typeof pattern !== 'string') {
      return { success: false, error: '正则表达式不能为空', matches: [] };
    }
    
    const regex = new RegExp(pattern, flags);
    const matches = [];
    
    if (flags.includes('g')) {
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.length > 1) {
          matches.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
            extracted: match[groupIndex] || match[1] || match[0]
          });
        } else {
          matches.push({
            fullMatch: match[0],
            groups: [],
            index: match.index,
            extracted: match[0]
          });
        }
      }
    } else {
      const match = regex.exec(text);
      if (match) {
        matches.push({
          fullMatch: match[0],
          groups: match.length > 1 ? match.slice(1) : [],
          index: match.index,
          extracted: match.length > 1 ? (match[groupIndex] || match[1]) : match[0]
        });
      }
    }
    
    return {
      success: true,
      matches,
      count: matches.length,
      extracted: matches.map(m => m.extracted)
    };
  } catch (e) {
    return { success: false, error: e.message, matches: [] };
  }
}

// ============================================================
// SillyTavern 消息获取辅助
// ============================================================

/**
 * 获取SillyTavern消息内容的宏映射
 */
export const MESSAGE_MACROS = {
  lastMessage: {
    macro: '{{lastMessage}}',
    description: '最后一条消息'
  },
  lastCharMessage: {
    macro: '{{lastCharMessage}}',
    description: '最后一条角色消息'
  },
  lastUserMessage: {
    macro: '{{lastUserMessage}}',
    description: '最后一条用户消息'
  },
  char: {
    macro: '{{char}}',
    description: '角色名称'
  },
  user: {
    macro: '{{user}}',
    description: '用户名称'
  },
  input: {
    macro: '{{input}}',
    description: '当前输入框内容'
  }
};

// 初始化
init();

// 导出模块API
export default {
  // 核心提取函数
  extractTagContent,
  extractSimpleTag,
  extractCurlyBraceTag,
  extractComplexTag,
  extractHtmlFormatTag,
  
  // 工具函数
  escapeRegex,
  shouldSkipContent,
  isValidTagName,
  
  // 标签扫描
  scanTextForTags,
  generateTagSuggestions,
  
  // 规则管理
  getAllRuleTemplates,
  getRuleTemplate,
  createRuleTemplate,
  updateRuleTemplate,
  deleteRuleTemplate,
  getTagRules,
  setTagRules,
  addTagRule,
  updateTagRule,
  deleteTagRule,
  
  // 黑名单管理
  getContentBlacklist,
  setContentBlacklist,
  
  // 预设管理
  saveRulesAsPreset,
  getAllRulePresets,
  loadRulePreset,
  deleteRulePreset,
  
  // 导入导出
  exportRulesConfig,
  importRulesConfig,
  
  // 正则测试
  testRegex,
  
  // 消息宏
  MESSAGE_MACROS
};