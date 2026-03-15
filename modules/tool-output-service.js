/**
 * YouYou Toolkit - 工具输出服务
 * @description 处理工具的输出模式，支持 inline 和 post_response_api 模式
 * @version 1.0.0
 */

import { eventBus, EVENTS } from './core/event-bus.js';
import { settingsService } from './core/settings-service.js';
import { contextInjector } from './context-injector.js';
import { toolPromptService } from './tool-prompt-service.js';

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
        throw new Error('无法构建有效的消息');
      }
      
      this._log(`构建了 ${messages.length} 条消息`);
      
      // 2. 获取API配置
      const apiPreset = toolConfig.output?.apiPreset;
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
        await contextInjector.inject(toolId, outputContent, {
          chatId: rawContext.chatId,
          overwrite: toolConfig.output?.overwrite !== false,
          sourceMessageId: rawContext.messageId || ''
        });
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

  // ============================================================
  // 消息构建
  // ============================================================

  /**
   * 构建工具消息
   * @private
   */
  async _buildToolMessages(toolConfig, rawContext) {
    // 获取聚合的注入上下文
    const injectedContext = await contextInjector.getAggregatedContext(rawContext.chatId);
    
    // 构建完整上下文
    const fullContext = {
      ...rawContext,
      injectedContext,
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
    
    // 如果有预设名称，使用预设发送
    if (presetName && this._apiConnection.sendWithPreset) {
      return await this._apiConnection.sendWithPreset(presetName, messages, {
        timeoutMs
      }, signal);
    }
    
    // 否则使用默认API
    if (this._apiConnection.sendApiRequest) {
      return await this._apiConnection.sendApiRequest(messages, {
        timeoutMs
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
      return response;
    }
    
    // 如果响应是对象，尝试提取内容
    if (typeof response === 'object') {
      // OpenAI 格式
      if (response.choices && response.choices[0]?.message?.content) {
        return response.choices[0].message.content;
      }
      
      // 简单格式
      if (response.content) {
        return response.content;
      }
      
      if (response.text) {
        return response.text;
      }
      
      if (response.message) {
        return response.message;
      }
      
      // 尝试JSON序列化
      try {
        return JSON.stringify(response, null, 2);
      } catch (e) {
        return String(response);
      }
    }
    
    return String(response);
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