/**
 * YouYou Toolkit - 正则提取模块
 * @description 提供正则表达式匹配和内容提取功能
 */

import { loadSettings, saveSettings } from './storage.js';

// ============================================================
// 常量定义
// ============================================================

const SCRIPT_ID = 'youyou_toolkit';

// ============================================================
// 默认正则模板
// ============================================================

const DEFAULT_REGEX_TEMPLATES = [
  {
    id: 'json-content',
    name: 'JSON内容提取',
    description: '提取JSON格式的内容',
    pattern: '"content"\\s*:\\s*"([^"]+)"',
    flags: 'g',
    groupIndex: 1
  },
  {
    id: 'code-block',
    name: '代码块提取',
    description: '提取```包裹的代码块',
    pattern: '```[\\s\\S]*?\\n([\\s\\S]*?)```',
    flags: 'g',
    groupIndex: 1
  },
  {
    id: 'thinking-tag',
    name: '思考标签内容',
    description: '提取<thinking>标签内容',
    pattern: '<thinking>([\\s\\S]*?)</thinking>',
    flags: 'g',
    groupIndex: 1
  },
  {
    id: 'dialogue-quote',
    name: '对话引号内容',
    description: '提取引号中的对话',
    pattern: '"([^"]+)"',
    flags: 'g',
    groupIndex: 1
  },
  {
    id: 'paragraph',
    name: '段落提取',
    description: '提取非空段落',
    pattern: '([^\\n]+)',
    flags: 'g',
    groupIndex: 1
  }
];

// ============================================================
// 状态管理
// ============================================================

let regexTemplates = [];
let currentTemplate = null;

// ============================================================
// 初始化
// ============================================================

function init() {
  const settings = loadSettings();
  regexTemplates = settings.regexTemplates || [...DEFAULT_REGEX_TEMPLATES];
  return regexTemplates;
}

// ============================================================
// 正则模板管理
// ============================================================

export function getAllTemplates() {
  if (regexTemplates.length === 0) {
    init();
  }
  return regexTemplates;
}

export function getTemplate(id) {
  return regexTemplates.find(t => t.id === id);
}

export function createTemplate(template) {
  const newTemplate = {
    id: `custom-${Date.now()}`,
    name: template.name || '新模板',
    description: template.description || '',
    pattern: template.pattern || '',
    flags: template.flags || 'g',
    groupIndex: template.groupIndex || 0,
    createdAt: new Date().toISOString()
  };
  
  regexTemplates.push(newTemplate);
  saveTemplates();
  return { success: true, template: newTemplate, message: '模板创建成功' };
}

export function updateTemplate(id, updates) {
  const index = regexTemplates.findIndex(t => t.id === id);
  if (index === -1) {
    return { success: false, message: '模板不存在' };
  }
  
  regexTemplates[index] = {
    ...regexTemplates[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  saveTemplates();
  return { success: true, template: regexTemplates[index], message: '模板更新成功' };
}

export function deleteTemplate(id) {
  const index = regexTemplates.findIndex(t => t.id === id);
  if (index === -1) {
    return { success: false, message: '模板不存在' };
  }
  
  regexTemplates.splice(index, 1);
  saveTemplates();
  return { success: true, message: '模板已删除' };
}

function saveTemplates() {
  const settings = loadSettings();
  settings.regexTemplates = regexTemplates;
  saveSettings(settings);
}

// ============================================================
// 正则匹配功能
// ============================================================

export function testRegex(pattern, text, flags = 'g', groupIndex = 0) {
  try {
    // 验证正则表达式
    if (!pattern || typeof pattern !== 'string') {
      return { success: false, error: '正则表达式不能为空', matches: [] };
    }
    
    const regex = new RegExp(pattern, flags);
    const matches = [];
    
    if (flags.includes('g')) {
      // 全局匹配
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.length > 1) {
          // 有捕获组
          matches.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
            // 获取指定捕获组
            extracted: match[groupIndex] || match[1] || match[0]
          });
        } else {
          // 无捕获组
          matches.push({
            fullMatch: match[0],
            groups: [],
            index: match.index,
            extracted: match[0]
          });
        }
      }
    } else {
      // 非全局匹配，只匹配第一个
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
      // 提取所有匹配的内容（简化输出）
      extracted: matches.map(m => m.extracted)
    };
  } catch (e) {
    return { success: false, error: e.message, matches: [] };
  }
}

export function extractWithTemplate(templateId, text) {
  const template = getTemplate(templateId);
  if (!template) {
    return { success: false, error: '模板不存在' };
  }
  
  return testRegex(template.pattern, text, template.flags, template.groupIndex);
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

/**
 * 生成STScript命令用于提取内容
 */
export function generateExtractionScript(templateId, source = 'lastMessage', varName = 'extracted_content') {
  const template = getTemplate(templateId);
  if (!template) {
    return null;
  }
  
  const sourceMacro = MESSAGE_MACROS[source]?.macro || '{{lastMessage}}';
  
  // 生成匹配和存储的脚本
  return `/match pattern="${template.pattern.replace(/"/g, '\\"')}" ${sourceMacro} | /setvar key=${varName}`;
}

/**
 * 生成正则替换脚本
 */
export function generateReplaceScript(pattern, replacement, source = 'lastMessage') {
  const sourceMacro = MESSAGE_MACROS[source]?.macro || '{{lastMessage}}';
  return `/replace mode=regex pattern="${pattern.replace(/"/g, '\\"')}" replacer="${replacement.replace(/"/g, '\\"')}" ${sourceMacro}`;
}

// ============================================================
// 导入导出
// ============================================================

export function exportTemplates() {
  return JSON.stringify(regexTemplates, null, 2);
}

export function importTemplates(json, options = { overwrite: false }) {
  try {
    const imported = JSON.parse(json);
    
    if (!Array.isArray(imported)) {
      return { success: false, message: '无效的模板格式' };
    }
    
    if (options.overwrite) {
      regexTemplates = imported;
    } else {
      // 合并，跳过重复ID
      const existingIds = new Set(regexTemplates.map(t => t.id));
      const newTemplates = imported.filter(t => !existingIds.has(t.id));
      regexTemplates.push(...newTemplates);
    }
    
    saveTemplates();
    return { success: true, imported: imported.length, message: `成功导入 ${imported.length} 个模板` };
  } catch (e) {
    return { success: false, message: `导入失败: ${e.message}` };
  }
}

// 初始化
init();

// 导出模块API
export default {
  getAllTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  testRegex,
  extractWithTemplate,
  generateExtractionScript,
  generateReplaceScript,
  exportTemplates,
  importTemplates,
  MESSAGE_MACROS
};