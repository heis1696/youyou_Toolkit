/**
 * YouYou Toolkit - 工具输出服务
 * @description 处理工具的输出模式，是当前自动工具链的直接执行层
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

export const TOOL_FAILURE_STAGES = {
  BUILD_MESSAGES: 'build_messages',
  SEND_API_REQUEST: 'send_api_request',
  EXTRACT_OUTPUT: 'extract_output',
  INJECT_CONTEXT: 'inject_context',
  COMPATIBILITY_EXECUTE: 'compatibility_execute',
  UNKNOWN: 'unknown'
};

export const TOOL_WRITEBACK_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  SKIPPED_EMPTY_OUTPUT: 'skipped_empty_output',
  NOT_APPLICABLE: 'not_applicable'
};

function shouldAbortAutoWriteback(rawContext) {
  if (rawContext?.signal?.aborted) {
    return {
      aborted: true,
      stale: false,
      reason: 'cancelled_before_host_commit'
    };
  }

  if (typeof rawContext?.shouldAbortWriteback === 'function') {
    try {
      return rawContext.shouldAbortWriteback() || false;
    } catch (_) {
      return {
        aborted: true,
        stale: true,
        reason: 'stale_base_changed'
      };
    }
  }

  return false;
}

function buildToolPipelineMeta(messages = [], outputContent = '', writebackDetails = null) {
  return {
    request: {
      built: Array.isArray(messages) && messages.length > 0,
      messageCount: Array.isArray(messages) ? messages.length : 0
    },
    extract: {
      completed: true,
      hasOutput: Boolean(String(outputContent || '').trim())
    },
    writeback: {
      attempted: !!writebackDetails,
      contentCommitted: !!writebackDetails?.contentCommitted,
      hostCommitApplied: !!writebackDetails?.hostCommitApplied,
      writebackStatus: writebackDetails?.writebackStatus || '',
      preferredCommitMethod: writebackDetails?.commit?.preferredMethod || '',
      appliedCommitMethod: writebackDetails?.commit?.appliedMethod || '',
      fallbackUsed: !!writebackDetails?.commit?.fallbackUsed
    },
    refresh: {
      requested: !!writebackDetails?.refreshRequested,
      confirmed: !!writebackDetails?.refreshConfirmed,
      requestMethods: Array.isArray(writebackDetails?.refresh?.requestMethods)
        ? [...writebackDetails.refresh.requestMethods]
        : [],
      confirmChecks: Number(writebackDetails?.refresh?.confirmChecks) || 0,
      confirmedBy: writebackDetails?.refresh?.confirmedBy || ''
    }
  };
}

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
    if (!toolConfig.enabled) return false;
    if (!toolConfig.output?.enabled) return false;
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
   * @description 当前手动 post_response_api 执行的统一主路径
   */
  async runToolPostResponse(toolConfig, rawContext) {
    const startTime = Date.now();
    const toolId = toolConfig.id;
    const executionTraceId = rawContext?.traceId || `trace_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const sessionKey = rawContext?.sessionKey || '';
    const executionKey = rawContext?.executionKey || '';
    const selectors = this._getExtractionSelectors(toolConfig);
    const apiPreset = toolConfig.output?.apiPreset || toolConfig.apiPreset || '';
    let failureStage = '';
    let writebackStatus = TOOL_WRITEBACK_STATUS.NOT_APPLICABLE;
    let writebackDetails = null;
    let messages = [];
    let outputContent = '';
    
    this._log(`开始执行工具: ${toolId}`);
    
    // 发送执行开始事件
    eventBus.emit(EVENTS.TOOL_EXECUTION_STARTED, {
      toolId,
      traceId: executionTraceId,
      sessionKey,
      mode: OUTPUT_MODES.POST_RESPONSE_API
    });
    
    try {
      // 1. 构建消息
      failureStage = TOOL_FAILURE_STAGES.BUILD_MESSAGES;
      messages = await this._buildToolMessages(toolConfig, rawContext);
      
      if (!messages || messages.length === 0) {
        throw new Error('未构建出可发送的工具请求消息，请检查提示词模板或破限词配置是否为空。');
      }
      
      this._log(`构建了 ${messages.length} 条消息`);

      const abortStateAfterBuild = shouldAbortAutoWriteback(rawContext);
      if (abortStateAfterBuild) {
        const duration = Date.now() - startTime;
        return {
          success: false,
          toolId,
          error: '请求已取消',
          duration,
          meta: {
            traceId: executionTraceId,
            sessionKey,
            executionKey,
            sourceMessageId: rawContext?.sourceMessageId || rawContext?.confirmedAssistantMessageId || rawContext?.messageId || '',
            sourceSwipeId: rawContext?.sourceSwipeId || rawContext?.confirmedAssistantSwipeId || rawContext?.effectiveSwipeId || '',
            slotRevisionKey: rawContext?.slotRevisionKey || '',
            selectors,
            apiPreset,
            writebackStatus,
            failureStage,
            writebackDetails,
            aborted: abortStateAfterBuild.aborted === true,
            stale: abortStateAfterBuild.stale === true,
            abortReason: abortStateAfterBuild.reason || '',
            phases: buildToolPipelineMeta(messages, outputContent, writebackDetails)
          }
        };
      }

      // 2. 获取API配置
      const timeoutMs = await this._getRequestTimeout();
      
      // 3. 发送API请求
      failureStage = TOOL_FAILURE_STAGES.SEND_API_REQUEST;
      const result = await this._sendApiRequest(apiPreset, messages, {
        timeoutMs,
        signal: rawContext.signal
      });
      
      // 4. 处理输出
      failureStage = TOOL_FAILURE_STAGES.EXTRACT_OUTPUT;
      outputContent = this._extractOutputContent(result, toolConfig);

      const abortStateAfterExtract = shouldAbortAutoWriteback(rawContext);
      if (abortStateAfterExtract) {
        const duration = Date.now() - startTime;
        return {
          success: false,
          toolId,
          error: '请求已取消',
          duration,
          meta: {
            traceId: executionTraceId,
            sessionKey,
            executionKey,
            sourceMessageId: rawContext?.sourceMessageId || rawContext?.confirmedAssistantMessageId || rawContext?.messageId || '',
            sourceSwipeId: rawContext?.sourceSwipeId || rawContext?.confirmedAssistantSwipeId || rawContext?.effectiveSwipeId || '',
            slotRevisionKey: rawContext?.slotRevisionKey || '',
            selectors,
            apiPreset,
            writebackStatus,
            failureStage,
            writebackDetails,
            aborted: abortStateAfterExtract.aborted === true,
            stale: abortStateAfterExtract.stale === true,
            abortReason: abortStateAfterExtract.reason || '',
            phases: buildToolPipelineMeta(messages, outputContent, writebackDetails)
          }
        };
      }

      // 5. 注入上下文
      if (outputContent) {
        failureStage = TOOL_FAILURE_STAGES.INJECT_CONTEXT;
        writebackDetails = await contextInjector.injectDetailed(toolId, outputContent, {
          overwrite: toolConfig.output?.overwrite !== false,
          sourceMessageId: rawContext.sourceMessageId || rawContext.confirmedAssistantMessageId || rawContext.messageId || '',
          sourceSwipeId: rawContext.sourceSwipeId || rawContext.confirmedAssistantSwipeId || rawContext.effectiveSwipeId || '',
          effectiveSwipeId: rawContext.effectiveSwipeId || rawContext.confirmedAssistantSwipeId || '',
          slotBindingKey: rawContext.slotBindingKey || '',
          slotRevisionKey: rawContext.slotRevisionKey || '',
          slotTransactionId: rawContext.slotTransactionId || '',
          extractionSelectors: selectors,
          traceId: executionTraceId,
          sessionKey,
          signal: rawContext.signal,
          shouldAbortWriteback: rawContext.shouldAbortWriteback,
          isAutoRun: rawContext.isAutoRun === true
        });

        if (!writebackDetails?.success) {
          writebackStatus = TOOL_WRITEBACK_STATUS.FAILED;
          throw new Error(writebackDetails?.error || '工具结果已生成，但写入上下文/世界书失败');
        }

        writebackStatus = TOOL_WRITEBACK_STATUS.SUCCESS;
      } else {
        writebackStatus = TOOL_WRITEBACK_STATUS.SKIPPED_EMPTY_OUTPUT;
      }

      failureStage = '';
      
      const duration = Date.now() - startTime;
      
      // 发送执行成功事件
      eventBus.emit(EVENTS.TOOL_EXECUTED, {
        toolId,
        traceId: executionTraceId,
        sessionKey,
        success: true,
        duration,
        mode: OUTPUT_MODES.POST_RESPONSE_API
      });
      
      this._log(`工具执行成功: ${toolId}, 耗时 ${duration}ms`);
      
      return {
        success: true,
        toolId,
        output: outputContent,
        duration,
        meta: {
          traceId: executionTraceId,
          sessionKey,
          executionKey,
          slotBindingKey: rawContext?.slotBindingKey || '',
          slotTransactionId: rawContext?.slotTransactionId || '',
          generationAction: rawContext?.generationAction || '',
          generationActionSource: rawContext?.generationActionSource || '',
          rawGenerationType: rawContext?.rawGenerationType || '',
          normalizedGenerationType: rawContext?.normalizedGenerationType || '',
          generationMessageBindingSource: rawContext?.generationMessageBindingSource || '',
          sourceMessageId: rawContext?.sourceMessageId || rawContext?.confirmedAssistantMessageId || rawContext?.messageId || '',
          sourceSwipeId: rawContext?.sourceSwipeId || rawContext?.confirmedAssistantSwipeId || rawContext?.effectiveSwipeId || '',
          confirmedAssistantSwipeId: rawContext?.confirmedAssistantSwipeId || '',
          effectiveSwipeId: rawContext?.effectiveSwipeId || '',
          slotRevisionKey: rawContext?.slotRevisionKey || '',
          messageCount: messages.length,
          selectors,
          apiPreset,
          writebackStatus,
          failureStage: '',
          writebackDetails,
          phases: buildToolPipelineMeta(messages, outputContent, writebackDetails)
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      const resolvedFailureStage = failureStage || TOOL_FAILURE_STAGES.UNKNOWN;
      const resolvedWritebackStatus = writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE;
      
      this._log(`工具执行失败: ${toolId}`, error);
      
      // 发送执行失败事件
      eventBus.emit(EVENTS.TOOL_EXECUTION_FAILED, {
        toolId,
        traceId: executionTraceId,
        sessionKey,
        error: error.message || String(error),
        duration
      });
      
      return {
        success: false,
        toolId,
        error: error.message || String(error),
        duration,
        meta: {
          traceId: executionTraceId,
          sessionKey,
          executionKey,
          slotBindingKey: rawContext?.slotBindingKey || '',
          slotTransactionId: rawContext?.slotTransactionId || '',
          generationAction: rawContext?.generationAction || '',
          generationActionSource: rawContext?.generationActionSource || '',
          rawGenerationType: rawContext?.rawGenerationType || '',
          normalizedGenerationType: rawContext?.normalizedGenerationType || '',
          generationMessageBindingSource: rawContext?.generationMessageBindingSource || '',
          sourceMessageId: rawContext?.sourceMessageId || rawContext?.confirmedAssistantMessageId || rawContext?.messageId || '',
          sourceSwipeId: rawContext?.sourceSwipeId || rawContext?.confirmedAssistantSwipeId || rawContext?.effectiveSwipeId || '',
          confirmedAssistantSwipeId: rawContext?.confirmedAssistantSwipeId || '',
          effectiveSwipeId: rawContext?.effectiveSwipeId || '',
          slotRevisionKey: rawContext?.slotRevisionKey || '',
          messageCount: messages.length,
          selectors,
          apiPreset,
          writebackStatus: resolvedWritebackStatus,
          failureStage: resolvedFailureStage,
          writebackDetails,
          phases: buildToolPipelineMeta(messages, outputContent, writebackDetails)
        }
      };
    }
  }

  /**
   * 手动执行 follow_ai 工具。
   * @param {Object} toolConfig - 工具配置
   * @param {Object} rawContext - 原始上下文
   * @returns {Promise<Object>}
   */
  async runToolFollowAiManual(toolConfig, rawContext) {
    const startTime = Date.now();
    const toolId = toolConfig.id;
    const executionTraceId = rawContext?.traceId || `trace_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const sessionKey = rawContext?.sessionKey || '';
    const executionKey = rawContext?.executionKey || '';
    const apiPreset = toolConfig.output?.apiPreset || toolConfig.apiPreset || '';
    const selectors = this._getExtractionSelectors(toolConfig);
    let failureStage = '';
    let writebackStatus = TOOL_WRITEBACK_STATUS.NOT_APPLICABLE;
    let writebackDetails = null;
    let messages = [];
    let outputContent = '';

    eventBus.emit(EVENTS.TOOL_EXECUTION_STARTED, {
      toolId,
      traceId: executionTraceId,
      sessionKey,
      mode: OUTPUT_MODES.FOLLOW_AI
    });

    try {
      failureStage = TOOL_FAILURE_STAGES.BUILD_MESSAGES;
      messages = await this._buildToolMessages(toolConfig, rawContext);

      if (!messages || messages.length === 0) {
        throw new Error('未构建出可发送的工具请求消息，请检查提示词模板或破限词配置是否为空。');
      }

      const timeoutMs = await this._getRequestTimeout();
      failureStage = TOOL_FAILURE_STAGES.SEND_API_REQUEST;
      const result = await this._sendApiRequest(apiPreset, messages, {
        timeoutMs,
        signal: rawContext.signal
      });

      failureStage = TOOL_FAILURE_STAGES.EXTRACT_OUTPUT;
      outputContent = this._extractOutputContent(result, toolConfig);

      if (outputContent) {
        failureStage = TOOL_FAILURE_STAGES.INJECT_CONTEXT;
        writebackDetails = await contextInjector.injectDetailed(toolId, outputContent, {
          overwrite: toolConfig.output?.overwrite !== false,
          sourceMessageId: rawContext.sourceMessageId || rawContext.confirmedAssistantMessageId || rawContext.messageId || '',
          sourceSwipeId: rawContext.sourceSwipeId || rawContext.confirmedAssistantSwipeId || rawContext.effectiveSwipeId || '',
          effectiveSwipeId: rawContext.effectiveSwipeId || rawContext.confirmedAssistantSwipeId || '',
          slotBindingKey: rawContext.slotBindingKey || '',
          slotRevisionKey: rawContext.slotRevisionKey || '',
          slotTransactionId: rawContext.slotTransactionId || '',
          extractionSelectors: selectors,
          traceId: executionTraceId,
          sessionKey
        });

        if (!writebackDetails?.success) {
          writebackStatus = TOOL_WRITEBACK_STATUS.FAILED;
          throw new Error(writebackDetails?.error || '工具结果已生成，但写入上下文/世界书失败');
        }

        writebackStatus = TOOL_WRITEBACK_STATUS.SUCCESS;
      } else {
        writebackStatus = TOOL_WRITEBACK_STATUS.SKIPPED_EMPTY_OUTPUT;
      }

      failureStage = '';
      const duration = Date.now() - startTime;

      eventBus.emit(EVENTS.TOOL_EXECUTED, {
        toolId,
        traceId: executionTraceId,
        sessionKey,
        success: true,
        duration,
        mode: OUTPUT_MODES.FOLLOW_AI
      });

      return {
        success: true,
        toolId,
        output: outputContent,
        duration,
        meta: {
          traceId: executionTraceId,
          sessionKey,
          executionKey,
          slotBindingKey: rawContext?.slotBindingKey || '',
          slotTransactionId: rawContext?.slotTransactionId || '',
          sourceMessageId: rawContext?.sourceMessageId || rawContext?.confirmedAssistantMessageId || rawContext?.messageId || '',
          sourceSwipeId: rawContext?.sourceSwipeId || rawContext?.confirmedAssistantSwipeId || rawContext?.effectiveSwipeId || '',
          confirmedAssistantSwipeId: rawContext?.confirmedAssistantSwipeId || '',
          effectiveSwipeId: rawContext?.effectiveSwipeId || '',
          slotRevisionKey: rawContext?.slotRevisionKey || '',
          messageCount: messages.length,
          selectors,
          apiPreset,
          writebackStatus,
          failureStage: '',
          writebackDetails,
          phases: buildToolPipelineMeta(messages, outputContent, writebackDetails)
        }
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const resolvedFailureStage = failureStage || TOOL_FAILURE_STAGES.UNKNOWN;
      const resolvedWritebackStatus = writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE;

      eventBus.emit(EVENTS.TOOL_EXECUTION_FAILED, {
        toolId,
        traceId: executionTraceId,
        sessionKey,
        error: error.message || String(error),
        duration,
        mode: OUTPUT_MODES.FOLLOW_AI
      });

      return {
        success: false,
        toolId,
        error: error.message || String(error),
        duration,
        meta: {
          traceId: executionTraceId,
          sessionKey,
          executionKey,
          slotBindingKey: rawContext?.slotBindingKey || '',
          slotTransactionId: rawContext?.slotTransactionId || '',
          sourceMessageId: rawContext?.sourceMessageId || rawContext?.confirmedAssistantMessageId || rawContext?.messageId || '',
          sourceSwipeId: rawContext?.sourceSwipeId || rawContext?.confirmedAssistantSwipeId || rawContext?.effectiveSwipeId || '',
          confirmedAssistantSwipeId: rawContext?.confirmedAssistantSwipeId || '',
          effectiveSwipeId: rawContext?.effectiveSwipeId || '',
          slotRevisionKey: rawContext?.slotRevisionKey || '',
          messageCount: messages.length,
          selectors,
          apiPreset,
          writebackStatus: resolvedWritebackStatus,
          failureStage: resolvedFailureStage,
          writebackDetails,
          phases: buildToolPipelineMeta(messages, outputContent, writebackDetails)
        }
      };
    }
  }

  /**
   * 执行工具的 inline 输出
   * @param {Object} toolConfig - 工具配置
   * @param {Object} rawContext - 原始上下文
   * @returns {Promise<Object>}
   * @deprecated 当前主链不再依赖该路径，仅保留兼容语义
   */
  async runToolInline(toolConfig, rawContext) {
    return this.runToolFollowAiManual(toolConfig, rawContext);
  }

  /**
   * 预览工具的提取结果
   * @param {Object} toolConfig
   * @param {Object} rawContext
   * @returns {Promise<Object>}
   */
  async previewExtraction(toolConfig, rawContext) {
    const extraction = this.getExtractionSnapshot(toolConfig, rawContext);

    return {
      success: true,
      ...extraction
    };
  }

  getExtractionSnapshot(toolConfig, rawContext) {
    const messageEntries = this._buildRecentMessageExtractionEntries(toolConfig, rawContext);
    const sourceText = this._joinMessageBlocks(messageEntries, 'rawText');
    const filteredSourceText = this._joinMessageBlocks(messageEntries, 'filteredText');
    const extractedText = this._joinMessageBlocks(messageEntries, 'extractedText', { skipEmpty: true });
    const extractedRawText = (Array.isArray(messageEntries) ? messageEntries : [])
      .map(entry => String(entry?.extractedText || '').trim())
      .filter(Boolean)
      .join('\n\n');
    const primaryEntry = Array.isArray(messageEntries) && messageEntries.length > 0 ? messageEntries[messageEntries.length - 1] : null;

    return {
      sourceText,
      filteredSourceText,
      extractedText,
      extractedRawText,
      messageEntries,
      primaryEntry,
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
      return this._applyOutputExtractionSelectors(response, toolConfig);
    }
    
    // 如果响应是对象，尝试提取内容
    if (typeof response === 'object') {
      // OpenAI 格式
      if (response.choices && response.choices[0]?.message?.content) {
        return this._applyOutputExtractionSelectors(response.choices[0].message.content, toolConfig);
      }
      
      // 简单格式
      if (response.content) {
        return this._applyOutputExtractionSelectors(response.content, toolConfig);
      }
      
      if (response.text) {
        return this._applyOutputExtractionSelectors(response.text, toolConfig);
      }
      
      if (response.message) {
        return this._applyOutputExtractionSelectors(response.message, toolConfig);
      }
      
      // 尝试JSON序列化
      try {
        return this._applyOutputExtractionSelectors(JSON.stringify(response, null, 2), toolConfig);
      } catch (e) {
        return this._applyOutputExtractionSelectors(String(response), toolConfig);
      }
    }
    
    return this._applyOutputExtractionSelectors(String(response), toolConfig);
  }

  /**
   * 对工具模型返回结果应用提取规则。
   * 与最近消息提取不同，这里优先保留命中的完整标签块，
   * 避免把用户在模板中明确要求输出的外层标签剥掉。
   * @private
   */
  _applyOutputExtractionSelectors(text, toolConfig) {
    const sourceText = typeof text === 'string' ? text : String(text || '');
    const selectors = this._getExtractionSelectors(toolConfig);

    if (!selectors.length) {
      return sourceText.trim();
    }

    const matchedBlocks = [];

    for (const selector of selectors) {
      const value = String(selector || '').trim();
      if (!value) continue;

      if (value.startsWith('regex:')) {
        const pattern = value.slice(6).trim();
        if (!pattern) continue;

        try {
          const regex = new RegExp(pattern, 'gi');
          const matches = [...sourceText.matchAll(regex)];
          matches.forEach((match) => {
            const fullMatch = String(match?.[0] || '').trim();
            if (fullMatch) {
              matchedBlocks.push(fullMatch);
            }
          });
        } catch (error) {
          this._log('工具输出正则提取失败，跳过该规则', { selector: value, error });
        }
        continue;
      }

      const tagName = value.replace(/^<|>$/g, '').trim();
      if (!tagName) continue;

      try {
        const tagRegex = new RegExp(`<${tagName}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${tagName}>`, 'gi');
        const matches = sourceText.match(tagRegex) || [];
        matches.forEach((match) => {
          const fullMatch = String(match || '').trim();
          if (fullMatch) {
            matchedBlocks.push(fullMatch);
          }
        });
      } catch (error) {
        this._log('工具输出标签提取失败，跳过该规则', { selector: value, error });
      }
    }

    if (matchedBlocks.length > 0) {
      return matchedBlocks.join('\n\n').trim();
    }

    return sourceText.trim();
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
        extractedText,
        fullMessageText: rawText
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

  filterAutoPostResponseTools(toolConfigs) {
    if (!Array.isArray(toolConfigs)) return [];

    return toolConfigs.filter((config) => {
      if (!this.shouldRunPostResponse(config)) {
        return false;
      }

      return config?.automation?.enabled === true;
    });
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
    if (this.debugMode || settingsService.getDebugSettings()?.enableDebugLog) {
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