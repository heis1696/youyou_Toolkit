/**
 * YouYou Toolkit - 工具提示词服务
 * @description 将工具提示词模板转为API消息，支持破限词合并
 * @version 2.0.0 - 简化版，使用单提示词模板
 */

import { eventBus, EVENTS } from './core/event-bus.js';
import { bypassManager } from './bypass-manager.js';
import { variableResolver } from './variable-resolver.js';

// ============================================================
// 默认提示词模板
// ============================================================

const DEFAULT_PROMPT_TEMPLATE = `请处理以下AI回复内容：`;

// ============================================================
// 工具提示词服务类
// ============================================================

class ToolPromptService {
  constructor() {
    /** 调试模式 */
    this.debugMode = false;
  }

  // ============================================================
  // 核心方法
  // ============================================================

  /**
   * 构建工具消息数组
   * @param {Object} toolConfig - 工具配置对象
   * @param {Object} context - 执行上下文，包含 lastAiMessage 等
   * @returns {Array} OpenAI格式的消息数组
   */
  buildToolMessages(toolConfig, context) {
    if (!toolConfig) {
      this._log('构建失败: 工具配置为空');
      return [];
    }

    const messages = [];
    const variableContext = variableResolver.buildToolContext({
      ...context,
      toolName: toolConfig.name || context?.toolName || '',
      toolId: toolConfig.id || context?.toolId || '',
      toolMacro: context?.extractedContent || context?.input?.extractedContent || ''
    });
    
    // 1. 获取破限词消息（如果启用）
    const bypassMessages = this._getBypassMessages(toolConfig);
    
    // 2. 添加破限词消息（在前面）
    if (bypassMessages && bypassMessages.length > 0) {
      for (const msg of bypassMessages) {
        if (msg.enabled !== false) {
          messages.push({
            role: this._normalizeRole(msg.role),
            content: variableResolver.resolveTemplate(msg.content || '', variableContext)
          });
        }
      }
    }
    
    // 3. 获取提示词模板
    const promptTemplate = this._getPromptTemplate(toolConfig);
    
    // 4. 构建用户消息，附加 AI 回复内容
    const userContent = this._buildUserContent(promptTemplate, context);
    
    if (userContent.trim()) {
      messages.push({
        role: 'user',
        content: userContent
      });
    }
    
    this._log(`构建消息: ${messages.length} 条`);
    return messages;
  }

  /**
   * 构建提示词文本（用于显示或调试）
   * @param {Object} toolConfig - 工具配置
   * @param {Object} context - 执行上下文
   * @returns {string} 提示词文本
   */
  buildPromptText(toolConfig, context) {
    const promptTemplate = this._getPromptTemplate(toolConfig);
    return this._buildUserContent(promptTemplate, context);
  }

  /**
   * 获取工具的提示词模板
   * @param {Object} toolConfig - 工具配置
   * @returns {string} 提示词模板
   */
  getToolPromptTemplate(toolConfig) {
    return this._getPromptTemplate(toolConfig);
  }

  // ============================================================
  // 私有方法
  // ============================================================

  /**
   * 获取工具的提示词模板
   * @private
   */
  _getPromptTemplate(toolConfig) {
    // 使用新的 promptTemplate 字段
    if (toolConfig.promptTemplate && typeof toolConfig.promptTemplate === 'string') {
      return toolConfig.promptTemplate;
    }

    // 返回默认模板
    return DEFAULT_PROMPT_TEMPLATE;
  }

  /**
   * 获取破限词消息
   * @private
   */
  _getBypassMessages(toolConfig) {
    // 检查是否启用破限词
    if (!toolConfig.bypass?.enabled) {
      return [];
    }

    // 使用 bypassManager 构建破限词消息
    return bypassManager.buildBypassMessages(toolConfig);
  }

  /**
   * 构建用户消息内容
   * @private
   */
  _buildUserContent(promptTemplate, context) {
    const parts = [];
    const lastAiMessage = context?.lastAiMessage || context?.input?.lastAiMessage || '';
    const extractedContent = context?.extractedContent || context?.input?.extractedContent || '';
    const recentMessagesText = context?.recentMessagesText || '';
    const rawRecentMessagesText = context?.rawRecentMessagesText || '';
    const userMessage = context?.userMessage || context?.input?.userMessage || '';
    const previousToolOutput = context?.previousToolOutput || context?.input?.previousToolOutput || '';
    const toolName = context?.toolName || '';
    const toolId = context?.toolId || '';
    const usedPlaceholders = new Set();
    
    // 添加提示词模板
    if (promptTemplate && promptTemplate.trim()) {
      let resolvedTemplate = promptTemplate;
      const replacements = {
        '{{lastAiMessage}}': lastAiMessage,
        '{{extractedContent}}': extractedContent,
        '{{recentMessagesText}}': recentMessagesText,
        '{{rawRecentMessagesText}}': rawRecentMessagesText,
        '{{userMessage}}': userMessage,
        '{{previousToolOutput}}': previousToolOutput,
        '{{toolName}}': toolName,
        '{{toolId}}': toolId
      };

      Object.entries(replacements).forEach(([placeholder, value]) => {
        if (resolvedTemplate.includes(placeholder)) {
          usedPlaceholders.add(placeholder);
        }
        resolvedTemplate = resolvedTemplate.split(placeholder).join(value || '');
      });

      parts.push(resolvedTemplate.trim());
    }

    const appendSection = (placeholder, label, value) => {
      if (!value || usedPlaceholders.has(placeholder)) {
        return;
      }
      parts.push(`\n${label}\n${value}`);
    };

    appendSection('{{extractedContent}}', '以下是基于提取规则筛出的内容：', extractedContent);

    if (recentMessagesText && !usedPlaceholders.has('{{recentMessagesText}}') && recentMessagesText !== lastAiMessage) {
      parts.push(`\n以下是最近提取到的 AI 消息正文：\n${recentMessagesText}`);
    }

    // 添加 AI 回复内容
    appendSection('{{lastAiMessage}}', '以下是需要处理的AI回复内容：', lastAiMessage);
    
    return parts.join('\n');
  }

  /**
   * 标准化角色名称
   * @private
   */
  _normalizeRole(role) {
    if (!role) return 'user';
    
    const normalized = String(role).toLowerCase();
    
    switch (normalized) {
      case 'system':
        return 'system';
      case 'assistant':
        return 'assistant';
      case 'user':
      default:
        return 'user';
    }
  }

  /**
   * 日志输出
   * @private
   */
  _log(...args) {
    if (this.debugMode) {
      console.log('[ToolPromptService]', ...args);
    }
  }

  // ============================================================
  // 调试方法
  // ============================================================

  /**
   * 设置调试模式
   * @param {boolean} enabled
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
  }
}

// ============================================================
// 单例实例
// ============================================================

export const toolPromptService = new ToolPromptService();
export { DEFAULT_PROMPT_TEMPLATE, ToolPromptService };
export default toolPromptService;