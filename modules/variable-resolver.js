/**
 * YouYou Toolkit - 变量解析服务
 * @description 统一处理模板变量替换，支持上下文变量注入
 * @version 1.0.0
 */

import { eventBus, EVENTS } from './core/event-bus.js';

// ============================================================
// 变量定义
// ============================================================

/**
 * 内置变量定义
 * 第一版支持的变量：
 * - {{lastUserMessage}} - 最新用户消息
 * - {{lastAiMessage}} - 最新AI回复
 * - {{chatHistory}} - 最近聊天记录
 * - {{characterCard}} - 当前角色卡内容
 * - {{toolName}} - 工具名称
 * - {{injectedContext}} - 当前已注入的工具上下文汇总
 */
const BUILTIN_VARIABLES = {
  lastUserMessage: {
    name: 'lastUserMessage',
    description: '最新用户消息',
    category: 'chat'
  },
  lastAiMessage: {
    name: 'lastAiMessage',
    description: '最新AI回复',
    category: 'chat'
  },
  chatHistory: {
    name: 'chatHistory',
    description: '最近聊天记录',
    category: 'chat'
  },
  characterCard: {
    name: 'characterCard',
    description: '当前角色卡内容',
    category: 'character'
  },
  toolName: {
    name: 'toolName',
    description: '工具名称',
    category: 'tool'
  },
  injectedContext: {
    name: 'injectedContext',
    description: '已注入的工具上下文',
    category: 'context'
  }
};

// ============================================================
// 变量解析器类
// ============================================================

class VariableResolver {
  constructor() {
    /** 自定义变量注册 */
    this.customVariables = new Map();
    
    /** 变量处理器 */
    this.variableHandlers = new Map();
    
    /** 调试模式 */
    this.debugMode = false;
    
    // 注册默认处理器
    this._registerDefaultHandlers();
  }

  // ============================================================
  // 核心方法
  // ============================================================

  /**
   * 解析模板字符串
   * @param {string} template - 模板字符串
   * @param {Object} context - 上下文对象
   * @returns {string} 解析后的字符串
   */
  resolveTemplate(template, context) {
    if (typeof template !== 'string') {
      return template;
    }

    let result = template;
    
    // 解析内置变量 {{variableName}}
    result = this._resolveBuiltinVariables(result, context);
    
    // 解析自定义变量
    result = this._resolveCustomVariables(result, context);
    
    // 解析正则提取变量 {{regex.xxx}}
    result = this._resolveRegexVariables(result, context);
    
    return result;
  }

  /**
   * 解析对象中的所有字符串值
   * @param {Object} obj - 要解析的对象
   * @param {Object} context - 上下文对象
   * @returns {Object} 解析后的对象
   */
  resolveObject(obj, context) {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.resolveObject(item, context));
    }

    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = this.resolveTemplate(value, context);
      } else if (typeof value === 'object' && value !== null) {
        result[key] = this.resolveObject(value, context);
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  /**
   * 构建工具执行上下文
   * @param {Object} rawContext - 原始上下文
   * @returns {Object} 构建后的上下文
   */
  buildToolContext(rawContext) {
    return {
      // 聊天相关
      lastUserMessage: rawContext.lastUserMessage || '',
      lastAiMessage: rawContext.lastAiMessage || '',
      chatHistory: rawContext.chatHistory || [],
      
      // 角色相关
      characterCard: rawContext.characterCard || null,
      characterName: rawContext.characterCard?.name || '',
      
      // 工具相关
      toolName: rawContext.toolName || '',
      toolId: rawContext.toolId || '',
      
      // 注入上下文
      injectedContext: rawContext.injectedContext || '',
      
      // 正则提取结果
      regexResults: rawContext.regexResults || {},
      
      // 原始数据
      raw: rawContext,
      
      // 时间戳
      timestamp: Date.now()
    };
  }

  // ============================================================
  // 变量注册
  // ============================================================

  /**
   * 注册自定义变量
   * @param {string} name - 变量名（不含{{}}）
   * @param {Function|*} handler - 处理函数或静态值
   */
  registerVariable(name, handler) {
    if (!name) return;
    
    this.customVariables.set(name, handler);
    this._log(`注册自定义变量: ${name}`);
  }

  /**
   * 注销自定义变量
   * @param {string} name - 变量名
   */
  unregisterVariable(name) {
    this.customVariables.delete(name);
    this._log(`注销自定义变量: ${name}`);
  }

  /**
   * 注册变量处理器
   * @param {string} prefix - 变量前缀，如 'regex'
   * @param {Function} handler - 处理函数 (variableName, context) => value
   */
  registerHandler(prefix, handler) {
    if (!prefix || typeof handler !== 'function') return;
    this.variableHandlers.set(prefix, handler);
    this._log(`注册变量处理器: ${prefix}`);
  }

  // ============================================================
  // 变量获取
  // ============================================================

  /**
   * 获取所有可用变量
   * @returns {Array} 变量列表
   */
  getAvailableVariables() {
    const variables = [];
    
    // 内置变量
    for (const [, info] of Object.entries(BUILTIN_VARIABLES)) {
      variables.push({
        name: `{{${info.name}}}`,
        description: info.description,
        category: info.category,
        type: 'builtin'
      });
    }
    
    // 自定义变量
    for (const [name, handler] of this.customVariables) {
      variables.push({
        name: `{{${name}}}`,
        description: typeof handler === 'function' ? '自定义函数变量' : '自定义静态变量',
        category: 'custom',
        type: 'custom'
      });
    }
    
    return variables;
  }

  /**
   * 获取变量帮助文本
   * @returns {string}
   */
  getVariableHelp() {
    const lines = ['可用变量：', ''];
    
    const categories = {
      chat: '聊天相关',
      character: '角色相关',
      tool: '工具相关',
      context: '上下文相关',
      custom: '自定义变量'
    };
    
    const grouped = {};
    for (const v of this.getAvailableVariables()) {
      if (!grouped[v.category]) {
        grouped[v.category] = [];
      }
      grouped[v.category].push(v);
    }
    
    for (const [category, label] of Object.entries(categories)) {
      if (grouped[category] && grouped[category].length > 0) {
        lines.push(`【${label}】`);
        for (const v of grouped[category]) {
          lines.push(`  ${v.name} - ${v.description}`);
        }
        lines.push('');
      }
    }
    
    // 添加正则变量说明
    lines.push('【正则提取】');
    lines.push('  {{regex.xxx}} - 使用正则提取结果，xxx为捕获组名');
    
    return lines.join('\n');
  }

  // ============================================================
  // 私有方法
  // ============================================================

  /**
   * 注册默认处理器
   * @private
   */
  _registerDefaultHandlers() {
    // 正则变量处理器
    this.registerHandler('regex', (varName, context) => {
      const regexResults = context.regexResults || context.raw?.regexResults || {};
      return regexResults[varName] || '';
    });
  }

  /**
   * 解析内置变量
   * @private
   */
  _resolveBuiltinVariables(template, context) {
    let result = template;
    
    // {{lastUserMessage}}
    result = result.replace(/\{\{lastUserMessage\}\}/gi, 
      context.lastUserMessage || context.raw?.lastUserMessage || '');
    
    // {{lastAiMessage}}
    result = result.replace(/\{\{lastAiMessage\}\}/gi, 
      context.lastAiMessage || context.raw?.lastAiMessage || '');
    
    // {{chatHistory}}
    result = result.replace(/\{\{chatHistory\}\}/gi, () => {
      const history = context.chatHistory || context.raw?.chatHistory || [];
      return this._formatChatHistory(history);
    });
    
    // {{characterCard}}
    result = result.replace(/\{\{characterCard\}\}/gi, () => {
      const card = context.characterCard || context.raw?.characterCard;
      return card ? this._formatCharacterCard(card) : '';
    });
    
    // {{toolName}}
    result = result.replace(/\{\{toolName\}\}/gi, 
      context.toolName || context.raw?.toolName || '');
    
    // {{injectedContext}}
    result = result.replace(/\{\{injectedContext\}\}/gi, 
      context.injectedContext || context.raw?.injectedContext || '');
    
    return result;
  }

  /**
   * 解析自定义变量
   * @private
   */
  _resolveCustomVariables(template, context) {
    let result = template;
    
    for (const [name, handler] of this.customVariables) {
      const pattern = new RegExp(`\\{\\{${this._escapeRegex(name)}\\}\\}`, 'gi');
      
      if (typeof handler === 'function') {
        result = result.replace(pattern, () => {
          try {
            return handler(context);
          } catch (e) {
            this._log(`变量处理错误 ${name}:`, e);
            return '';
          }
        });
      } else {
        result = result.replace(pattern, String(handler));
      }
    }
    
    return result;
  }

  /**
   * 解析带前缀的变量（如 regex.xxx）
   * @private
   */
  _resolveRegexVariables(template, context) {
    let result = template;
    
    for (const [prefix, handler] of this.variableHandlers) {
      const pattern = new RegExp(`\\{\\{${prefix}\\.([^}]+)\\}\\}`, 'gi');
      
      result = result.replace(pattern, (match, varName) => {
        try {
          return handler(varName, context);
        } catch (e) {
          this._log(`变量处理错误 ${prefix}.${varName}:`, e);
          return '';
        }
      });
    }
    
    return result;
  }

  /**
   * 格式化聊天历史
   * @private
   */
  _formatChatHistory(history) {
    if (!Array.isArray(history) || history.length === 0) {
      return '';
    }
    
    return history.map(msg => {
      const role = msg.role || 'unknown';
      const content = msg.content || msg.mes || '';
      return `[${role}]: ${content}`;
    }).join('\n\n');
  }

  /**
   * 格式化角色卡
   * @private
   */
  _formatCharacterCard(card) {
    if (!card) return '';
    
    const parts = [];
    
    if (card.name) parts.push(`姓名: ${card.name}`);
    if (card.description) parts.push(`描述: ${card.description}`);
    if (card.personality) parts.push(`性格: ${card.personality}`);
    if (card.scenario) parts.push(`场景: ${card.scenario}`);
    
    return parts.join('\n\n');
  }

  /**
   * 转义正则表达式特殊字符
   * @private
   */
  _escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * 日志输出
   * @private
   */
  _log(...args) {
    if (this.debugMode) {
      console.log('[VariableResolver]', ...args);
    }
  }
}

// ============================================================
// 单例实例
// ============================================================

export const variableResolver = new VariableResolver();
export { BUILTIN_VARIABLES, VariableResolver };
export default variableResolver;