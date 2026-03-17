/**
 * YouYou Toolkit - 工具输出服务
 * @description 处理工具的输出模式，支持 inline 和 post_response_api 模式
 * @version 1.0.0
 */

import { eventBus, EVENTS } from './core/event-bus.js';
import { settingsService } from './core/settings-service.js';
import { contextInjector } from './context-injector.js';
import { toolPromptService } from './tool-prompt-service.js';
import { extractTagContent, getTagRules, getContentBlacklist } from './regex-extractor.js';
import { getEffectiveApiConfig, validateApiConfig, hasEffectiveApiPreset } from './api-connection.js';

// ============================================================
// 输出模式定义
// ============================================================

export const OUTPUT_MODES = {
  FOLLOW_AI: 'follow_ai',              // 随AI输出（不执行额外解析链）
  POST_RESPONSE_API: 'post_response_api' // 额外AI模型解析
};

// 兼容旧模式名称
export const LEGACY_OUTPUT_MODES = {
  inline: 'follow_ai'  // 旧 inline 映射到新 follow_ai
};

// ============================================================
// 工具运行时状态
// ============================================================

export const TOOL_RUNTIME_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  SUCCESS: 'success',
  ERROR: 'error'
};

// ============================================================
// 工具输出服务类
// ============================================================

class ToolOutputService {
  constructor() {
    /** 调试模式 */
    this.debugMode = false;
    
    /** API连接模块引用（延迟注入） */
    this._apiConnection = null;
  }

  // ============================================================
  // 核心方法
  // ============================================================

  /**
   * 检查工具是否应该运行 post_response_api 模式
   * @param {Object} toolConfig - 工具配置
   * @returns {boolean}
   */
  shouldRunPostResponse(toolConfig) {
    if (!toolConfig) return false;
    
    // 工具必须启用
    if (!toolConfig.enabled) return false;
    
    // 触发器必须启用
    if (!toolConfig.trigger?.enabled) return false;
    
    // 输出必须启用
    if (!toolConfig.output?.enabled) return false;
    
    // 必须是 post_response_api 模式
    return toolConfig.output?.mode === OUTPUT_MODES.POST_RESPONSE_API;
  }

  /**
   * 检查工具是否应该运行 follow_ai 模式
   * @param {Object} toolConfig - 工具配置
   * @returns {boolean}
   */
  shouldRunFollowAi(toolConfig) {
    if (!toolConfig) return false;
    
    if (!toolConfig.enabled) return false;
    if (!toolConfig.trigger?.enabled) return false;
    if (!toolConfig.output?.enabled) return false;
    
    const mode = toolConfig.output?.mode;
    // 支持新模式名称和旧模式名称
    return mode === OUTPUT_MODES.FOLLOW_AI || mode === 'inline';
  }

  /**
   * 检查工具是否应该运行 inline 模式（兼容旧方法名）
   * @deprecated 使用 shouldRunFollowAi 替代
   * @param {Object} toolConfig - 工具配置
   * @returns {boolean}
   */
  shouldRunInline(toolConfig) {
    return this.shouldRunFollowAi(toolConfig);
  }

  /**
   * 执行工具的 post_response_api 输出
   * @param {Object} toolConfig - 工具配置
   * @param {Object} rawContext - 原始上下文
   * @returns {Promise<Object>} 执行结果
   */
  async runToolPostResponse(toolConfig, rawContext) {
    const startTime = Date.now();
    const toolId = toolConfig.id;
    
    this._log(`开始执行工具: ${toolId}`);
    
    // 发送执行开始事件
    eventBus.emit(EVENTS.TOOL_EXECUTION_STARTED, {
      toolId,
      mode: OUTPUT_MODES.POST_RESPONSE_API
    });
    
    try {
      // 1. 构建消息
      const messages = await this._buildToolMessages(toolConfig, rawContext);
      
      if (!messages || messages.length === 0) {
        throw new Error('未构建出可发送的工具请求消息，请检查提示词模板或破限词配置是否为空。');
      }
      
      this._log(`构建了 ${messages.length} 条消息`);
      
      // 2. 获取API配置
      const apiPreset = toolConfig.output?.apiPreset || toolConfig.apiPreset || '';
      const timeoutMs = await this._getRequestTimeout();
      
      // 3. 发送API请求
      const result = await this._sendApiRequest(apiPreset, messages, {
        timeoutMs,
        signal: rawContext.signal
      });
      
      // 4. 处理输出
      const outputContent = this._extractOutputContent(result, toolConfig);
      
      // 5. 注入上下文
      if (outputContent) {
        const injected = await contextInjector.inject(toolId, outputContent, {
          overwrite: toolConfig.output?.overwrite !== false,
          sourceMessageId: rawContext.messageId || '',
          extractionSelectors: this._getExtractionSelectors(toolConfig)
        });

        if (!injected) {
          throw new Error('工具结果已生成，但写入上下文/世界书失败');
        }
      }
      
      const duration = Date.now() - startTime;
      
      // 发送执行成功事件
      eventBus.emit(EVENTS.TOOL_EXECUTED, {
        toolId,
        success: true,
        duration,
        mode: OUTPUT_MODES.POST_RESPONSE_API
      });
      
      this._log(`工具执行成功: ${toolId}, 耗时 ${duration}ms`);
      
      return {
        success: true,
        toolId,
        output: outputContent,
        duration
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      
      this._log(`工具执行失败: ${toolId}`, error);
      
      // 发送执行失败事件
      eventBus.emit(EVENTS.TOOL_EXECUTION_FAILED, {
        toolId,
        error: error.message || String(error),
        duration
      });
      
      return {
        success: false,
        toolId,
        error: error.message || String(error),
        duration
      };
    }
  }

  /**
   * 执行工具的 inline 输出
   * @param {Object} toolConfig - 工具配置
   * @param {Object} rawContext - 原始上下文
   * @returns {Promise<Object>}
   */
  async runToolInline(toolConfig, rawContext) {
    const startTime = Date.now();
    const toolId = toolConfig.id;
    
    // inline 模式主要用于准备上下文注入内容
    // 实际的API调用由外部处理
    
    try {
      const messages = await this._buildToolMessages(toolConfig, rawContext);
      
      return {
        success: true,
        toolId,
        messages,
        duration: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        toolId,
        error: error.message || String(error),
        duration: Date.now() - startTime
      };
    }
  }

  /**
   * 预览工具的提取结果
   * @param {Object} toolConfig
   * @param {Object} rawContext
   * @returns {Promise<Object>}
   */
  async previewExtraction(toolConfig, rawContext) {
    const messageEntries = this._buildRecentMessageExtractionEntries(toolConfig, rawContext);
    const sourceText = this._joinMessageBlocks(messageEntries, 'rawText');
    const filteredSourceText = this._joinMessageBlocks(messageEntries, 'filteredText');
    const extracted = this._joinMessageBlocks(messageEntries, 'extractedText', { skipEmpty: true });

    return {
      success: true,
      sourceText,
      filteredSourceText,
      extractedText: extracted,
      messageEntries,
      selectors: this._getExtractionSelectors(toolConfig),
      maxMessages: toolConfig?.extraction?.maxMessages || 5
    };
  }

  // ============================================================
  // 消息构建
  // ============================================================

  /**
   * 构建工具消息
   * @private
   */
  async _buildToolMessages(toolConfig, rawContext) {
    // 工具链只围绕“最新 AI 楼层原文”工作：提取最新楼层内容 -> 调额外 API。
    const messageEntries = this._buildRecentMessageExtractionEntries(toolConfig, rawContext);
    const rawRecentMessagesText = this._joinMessageBlocks(messageEntries, 'rawText');
    const recentMessagesText = this._joinMessageBlocks(messageEntries, 'filteredText');
    const extractedContent = this._joinMessageBlocks(messageEntries, 'extractedText', { skipEmpty: true });
    
    // 构建完整上下文
    const fullContext = {
      ...rawContext,
      rawRecentMessagesText,
      recentMessagesText,
      extractedContent,
      toolContentMacro: this._buildToolContentMacro(messageEntries),
      toolName: toolConfig.name,
      toolId: toolConfig.id
    };
    
    // toolPromptService 已负责合并破限词消息，这里不再重复追加
    return toolPromptService.buildToolMessages(toolConfig, fullContext);
  }

  /**
   * 标准化角色名称
   * @private
   */
  _normalizeRole(role) {
    if (!role) return 'user';
    const r = String(role).toLowerCase();
    if (r === 'system') return 'system';
    if (r === 'assistant') return 'assistant';
    return 'user';
  }

  // ============================================================
  // API请求
  // ============================================================

  /**
   * 设置API连接模块
   * @param {Object} apiConnection
   */
  setApiConnection(apiConnection) {
    this._apiConnection = apiConnection;
  }

  /**
   * 发送API请求
   * @private
   */
  async _sendApiRequest(presetName, messages, options = {}) {
    if (!this._apiConnection) {
      throw new Error('API连接模块未配置');
    }
    
    const { timeoutMs = 90000, signal } = options;

    let apiConfig = null;

    if (presetName) {
      if (!hasEffectiveApiPreset(presetName)) {
        throw new Error(`未找到 API 预设“${presetName}”，请重新选择或保存后再执行`);
      }

      apiConfig = getEffectiveApiConfig(presetName);
    } else {
      apiConfig = getEffectiveApiConfig();
    }

    const validation = validateApiConfig(apiConfig || {});
    if (!validation.valid && !(apiConfig?.useMainApi)) {
      throw new Error(`API配置无效：${validation.errors.join('，')}。请先完善自定义API配置，或启用“使用SillyTavern主API”`);
    }
    
    if (this._apiConnection.sendApiRequest) {
      return await this._apiConnection.sendApiRequest(messages, {
        timeoutMs,
        apiConfig
      }, signal);
    }
    
    throw new Error('没有可用的API发送方法');
  }

  /**
   * 获取请求超时时间
   * @private
   */
  async _getRequestTimeout() {
    const settings = settingsService.getSettings();
    return settings.executor?.requestTimeoutMs || 90000;
  }

  // ============================================================
  // 输出处理
  // ============================================================

  /**
   * 从API响应中提取输出内容
   * @private
   */
  _extractOutputContent(response, toolConfig) {
    if (!response) return '';
    
    // 如果响应是字符串，直接返回
    if (typeof response === 'string') {
      return this._applyExtractionSelectors(response, toolConfig);
    }
    
    // 如果响应是对象，尝试提取内容
    if (typeof response === 'object') {
      // OpenAI 格式
      if (response.choices && response.choices[0]?.message?.content) {
        return this._applyExtractionSelectors(response.choices[0].message.content, toolConfig);
      }
      
      // 简单格式
      if (response.content) {
        return this._applyExtractionSelectors(response.content, toolConfig);
      }
      
      if (response.text) {
        return this._applyExtractionSelectors(response.text, toolConfig);
      }
      
      if (response.message) {
        return this._applyExtractionSelectors(response.message, toolConfig);
      }
      
      // 尝试JSON序列化
      try {
        return this._applyExtractionSelectors(JSON.stringify(response, null, 2), toolConfig);
      } catch (e) {
        return this._applyExtractionSelectors(String(response), toolConfig);
      }
    }
    
    return this._applyExtractionSelectors(String(response), toolConfig);
  }

  /**
   * 获取提取标签
   * @private
   */
  _getExtractionSelectors(toolConfig) {
    const selectors = toolConfig?.extraction?.selectors;
    if (Array.isArray(selectors) && selectors.length > 0) {
      return selectors.map(item => String(item || '').trim()).filter(Boolean);
    }

    if (Array.isArray(toolConfig?.extractTags) && toolConfig.extractTags.length > 0) {
      return toolConfig.extractTags.map(item => String(item || '').trim()).filter(Boolean);
    }

    return [];
  }

  /**
   * 应用提取规则
   * @private
   */
  _applyExtractionSelectors(text, toolConfig) {
    return this._applyExtractionSelectorsInternal(text, toolConfig, { strict: false });
  }

  /**
   * 应用提取规则（内部实现）
   * @private
   */
  _applyExtractionSelectorsInternal(text, toolConfig, options = {}) {
    const sourceText = typeof text === 'string' ? text : String(text || '');
    const selectors = this._getExtractionSelectors(toolConfig);
    const { strict = false } = options;

    if (!selectors.length) {
      return sourceText.trim();
    }

    const rules = selectors.map((selector, index) => {
      const value = String(selector || '').trim();
      const isRegex = value.startsWith('regex:');
      return {
        id: `tool-extract-${index}`,
        type: isRegex ? 'regex_include' : 'include',
        value: isRegex ? value.slice(6).trim() : value,
        enabled: true
      };
    }).filter(rule => rule.value);

    const extracted = extractTagContent(sourceText, rules, []);
    if (strict) {
      return (extracted || '').trim();
    }

    return extracted || sourceText.trim();
  }

  /**
   * 工具自身提取规则优先对原始 AI 消息生效，避免全局正文规则先裁剪后导致工具标签丢失
   * @private
   */
  _extractToolContent(toolConfig, rawSourceText) {
    const rawText = typeof rawSourceText === 'string' ? rawSourceText : String(rawSourceText || '');
    const selectors = this._getExtractionSelectors(toolConfig);

    if (!selectors.length) {
      return rawText.trim();
    }

    return this._applyExtractionSelectorsInternal(rawText, toolConfig, { strict: true });
  }

  /**
   * 先应用全局正则/标签提取规则，再交给工具自身提取规则处理
   * @private
   */
  _applyGlobalContextRules(text) {
    const sourceText = typeof text === 'string' ? text : String(text || '');
    if (!sourceText.trim()) {
      return '';
    }

    try {
      const rules = getTagRules() || [];
      const blacklist = getContentBlacklist() || [];

      if (!Array.isArray(rules) || rules.length === 0) {
        return sourceText.trim();
      }

      const filtered = extractTagContent(sourceText, rules, blacklist);
      return filtered || sourceText.trim();
    } catch (error) {
      this._log('应用全局正文提取规则失败，回退原始文本', error);
      return sourceText.trim();
    }
  }

  /**
   * 获取消息正文（兼容不同环境字段）
   * @private
   */
  _getMessageText(message) {
    if (!message) return '';

    const candidates = [
      message.content,
      message.mes,
      message.message,
      message.text,
      message?.data?.content
    ];

    for (const value of candidates) {
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }

    return '';
  }

  /**
   * 收集最近的角色消息
   * @private
   */
  _collectRecentAssistantMessages(toolConfig, rawContext) {
    return this._collectRecentAssistantMessageEntries(toolConfig, rawContext)
      .map(entry => entry.text)
      .filter(Boolean)
      .join('\n\n');
  }

  /**
   * 收集最近的 AI 消息条目
   * @private
   */
  _collectRecentAssistantMessageEntries(toolConfig, rawContext) {
    const maxMessages = Math.max(1, parseInt(toolConfig?.extraction?.maxMessages, 10) || 5);
    const chatMessages = Array.isArray(rawContext?.chatMessages) ? rawContext.chatMessages : [];

    const assistantMessages = [];
    for (let index = chatMessages.length - 1; index >= 0 && assistantMessages.length < maxMessages; index -= 1) {
      const message = chatMessages[index];
      const normalizedRole = String(message?.role || '').toLowerCase();
      const isAssistant = normalizedRole === 'assistant'
        || normalizedRole === 'ai'
        || (!message?.is_user && !message?.is_system && !normalizedRole);
      const text = this._getMessageText(message);

      if (isAssistant && text) {
        assistantMessages.unshift({
          text,
          message,
          chatIndex: index
        });
      }
    }

    if (assistantMessages.length > 0) {
      return assistantMessages;
    }

    const fallbackText = rawContext?.lastAiMessage || rawContext?.input?.lastAiMessage || '';
    return fallbackText
      ? [{ text: fallbackText, message: null, chatIndex: -1 }]
      : [];
  }

  /**
   * 基于原始消息分别计算正文提取和工具提取
   * @private
   */
  _buildRecentMessageExtractionEntries(toolConfig, rawContext) {
    const assistantMessages = this._collectRecentAssistantMessageEntries(toolConfig, rawContext);

    return assistantMessages.map((entry, index) => {
      const rawText = entry.text || '';
      const filteredText = this._applyGlobalContextRules(rawText);
      const extractedText = this._extractToolContent(toolConfig, rawText);

      return {
        ...entry,
        order: index + 1,
        rawText,
        filteredText,
        extractedText
      };
    });
  }

  /**
   * 将多条消息拼接为带分隔的文本块，便于区分不同楼层
   * @private
   */
  _joinMessageBlocks(entries, fieldName, options = {}) {
    const list = Array.isArray(entries) ? entries : [];
    const { skipEmpty = false } = options;

    const blocks = list
      .map((entry) => {
        const content = String(entry?.[fieldName] || '').trim();
        if (skipEmpty && !content) {
          return '';
        }

        const label = `【第 ${entry?.order || 0} 条 AI 消息】`;
        return `${label}\n${content || '(空)'}`;
      })
      .filter(Boolean);

    return blocks.join('\n\n--------------------------------\n\n');
  }

  _buildToolContentMacro(entries) {
    const list = Array.isArray(entries) ? entries : [];
    const blocks = list.map((entry) => {
      const title = `【第 ${entry?.order || 0} 条 AI 消息】`;
      const body = String(entry?.filteredText || '').trim() || '(空)';
      const tool = String(entry?.extractedText || '').trim() || '(空)';
      return `${title}\n正文：\n${body}\n\n工具：\n${tool}`;
    }).filter(Boolean);

    return blocks.join('\n\n--------------------------------\n\n').trim();
  }

  // ============================================================
  // 工具配置过滤
  // ============================================================

  /**
   * 过滤出应该运行的 post_response_api 工具
   * @param {Array} toolConfigs - 工具配置列表
   * @returns {Array} 需要运行的工具
   */
  filterPostResponseTools(toolConfigs) {
    if (!Array.isArray(toolConfigs)) return [];
    return toolConfigs.filter(config => this.shouldRunPostResponse(config));
  }

  /**
   * 过滤出应该运行的 inline 工具
   * @param {Array} toolConfigs - 工具配置列表
   * @returns {Array} 需要运行的工具
   */
  filterInlineTools(toolConfigs) {
    if (!Array.isArray(toolConfigs)) return [];
    return toolConfigs.filter(config => this.shouldRunInline(config));
  }

  // ============================================================
  // 日志
  // ============================================================

  /**
   * 设置调试模式
   * @param {boolean} enabled
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
  }

  /**
   * 日志输出
   * @private
   */
  _log(...args) {
    if (this.debugMode) {
      console.log('[ToolOutputService]', ...args);
    }
  }
}

// ============================================================
// 单例实例
// ============================================================

export const toolOutputService = new ToolOutputService();
export { ToolOutputService };
export default toolOutputService;