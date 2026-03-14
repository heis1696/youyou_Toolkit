/**
 * YouYou Toolkit - 工具提示词服务
 * @description 将工具提示词结构转为API消息，支持变量替换和破限词合并
 * @version 1.0.0
 */

import { eventBus, EVENTS } from './core/event-bus.js';
import { variableResolver } from './variable-resolver.js';

// ============================================================
// 默认提示词结构
// ============================================================

const DEFAULT_PROMPT_SEGMENT = {
  id: '',
  type: 'user',
  role: 'USER',
  content: '',
  enabled: true,
  expanded: true,
  deletable: true
};

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
   * @param {Object} context - 执行上下文
   * @returns {Array} OpenAI格式的消息数组
   */
  buildToolMessages(toolConfig, context) {
    if (!toolConfig) {
      this._log('构建失败: 工具配置为空');
      return [];
    }

    const messages = [];
    
    // 1. 获取提示词段落
    const segments = this._getPromptSegments(toolConfig);
    
    // 2. 获取破限词消息（如果启用）
    const bypassMessages = this._getBypassMessages(toolConfig);
    
    // 3. 构建上下文
    const toolContext = variableResolver.buildToolContext({
      ...context,
      toolName: toolConfig.name,
      toolId: toolConfig.id
    });
    
    // 4. 添加破限词消息（在前面）
    if (bypassMessages && bypassMessages.length > 0) {
      for (const msg of bypassMessages) {
        if (msg.enabled !== false) {
          messages.push({
            role: this._normalizeRole(msg.role),
            content: variableResolver.resolveTemplate(msg.content, toolContext)
          });
        }
      }
    }
    
    // 5. 处理提示词段落
    for (const segment of segments) {
      if (segment.enabled === false) continue;
      
      const content = variableResolver.resolveTemplate(segment.content || '', toolContext);
      
      if (content.trim()) {
        messages.push({
          role: this._normalizeRole(segment.role),
          content,
          _meta: {
            segmentId: segment.id,
            segmentType: segment.type,
            mainSlot: segment.mainSlot
          }
        });
      }
    }
    
    this._log(`构建消息: ${messages.length} 条`);
    return messages;
  }

  /**
   * 解析提示词段落
   * @param {Array} segments - 提示词段落数组
   * @param {Object} context - 执行上下文
   * @returns {Array} 解析后的消息数组
   */
  resolvePromptSegments(segments, context) {
    if (!Array.isArray(segments)) {
      return [];
    }

    const toolContext = variableResolver.buildToolContext(context);
    
    return segments
      .filter(seg => seg.enabled !== false)
      .map(segment => ({
        role: this._normalizeRole(segment.role),
        content: variableResolver.resolveTemplate(segment.content || '', toolContext)
      }))
      .filter(msg => msg.content.trim());
  }

  /**
   * 合并破限词消息
   * @param {Object} bypassPreset - 破限词预设
   * @param {Array} messages - 原始消息数组
   * @returns {Array} 合并后的消息数组
   */
  mergeBypassMessages(bypassPreset, messages) {
    if (!bypassPreset || !bypassPreset.messages || bypassPreset.messages.length === 0) {
      return messages;
    }

    const bypassMessages = bypassPreset.messages
      .filter(msg => msg.enabled !== false)
      .map(msg => ({
        role: this._normalizeRole(msg.role),
        content: msg.content || ''
      }));

    // 破限词消息放在前面
    return [...bypassMessages, ...messages];
  }

  // ============================================================
  // 提示词验证
  // ============================================================

  /**
   * 验证提示词结构
   * @param {Object} promptConfig - 提示词配置
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validatePrompt(promptConfig) {
    const errors = [];

    if (!promptConfig) {
      return { valid: true, errors: [] };
    }

    const segments = promptConfig.segments;
    
    if (segments && Array.isArray(segments)) {
      segments.forEach((seg, index) => {
        if (!seg.id) {
          errors.push(`段落 ${index + 1} 缺少ID`);
        }
        if (!seg.role) {
          errors.push(`段落 ${index + 1} 缺少role`);
        }
        if (!['SYSTEM', 'USER', 'assistant', 'system', 'user', 'assistant'].includes(seg.role)) {
          errors.push(`段落 ${index + 1} 的role值无效: ${seg.role}`);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // ============================================================
  // 提示词模板
  // ============================================================

  /**
   * 获取默认提示词模板
   * @param {string} toolType - 工具类型
   * @returns {Object} 提示词配置
   */
  getDefaultPromptTemplate(toolType = 'default') {
    const templates = {
      default: {
        segments: [
          {
            id: 'system_1',
            type: 'system',
            role: 'SYSTEM',
            content: '你是一个有用的助手。',
            enabled: true,
            expanded: true,
            deletable: false
          },
          {
            id: 'user_1',
            type: 'user',
            role: 'USER',
            content: '{{lastAiMessage}}',
            enabled: true,
            expanded: true,
            deletable: true
          }
        ]
      },
      summary: {
        segments: [
          {
            id: 'system_1',
            type: 'system',
            role: 'SYSTEM',
            content: '你是一个信息提炼助手，负责从对话中提取关键信息并生成简洁的摘要。',
            enabled: true,
            expanded: true,
            deletable: false
          },
          {
            id: 'user_1',
            type: 'user',
            role: 'USER',
            content: '请根据以下AI回复提取关键信息并生成摘要：\n\n{{lastAiMessage}}',
            enabled: true,
            expanded: true,
            deletable: true
          }
        ]
      },
      statusBlock: {
        segments: [
          {
            id: 'system_1',
            type: 'system',
            role: 'SYSTEM',
            content: '你是一个状态追踪助手，负责从对话中提取角色的状态信息。',
            enabled: true,
            expanded: true,
            deletable: false
          },
          {
            id: 'user_1',
            type: 'user',
            role: 'USER',
            content: '请根据以下对话内容，生成角色的当前状态：\n\n{{lastAiMessage}}',
            enabled: true,
            expanded: true,
            deletable: true
          }
        ]
      }
    };

    return templates[toolType] || templates.default;
  }

  /**
   * 创建空的提示词配置
   * @returns {Object}
   */
  createEmptyPrompt() {
    return {
      segments: [
        {
          ...DEFAULT_PROMPT_SEGMENT,
          id: `segment_${Date.now()}`,
          type: 'system',
          role: 'SYSTEM',
          deletable: false
        }
      ]
    };
  }

  /**
   * 添加提示词段落
   * @param {Object} promptConfig - 提示词配置
   * @param {Object} segmentData - 段落数据
   * @returns {Object} 更新后的配置
   */
  addSegment(promptConfig, segmentData = {}) {
    const config = promptConfig || { segments: [] };
    
    const newSegment = {
      ...DEFAULT_PROMPT_SEGMENT,
      id: `segment_${Date.now()}`,
      ...segmentData
    };

    return {
      ...config,
      segments: [...config.segments, newSegment]
    };
  }

  /**
   * 移除提示词段落
   * @param {Object} promptConfig - 提示词配置
   * @param {string} segmentId - 段落ID
   * @returns {Object} 更新后的配置
   */
  removeSegment(promptConfig, segmentId) {
    if (!promptConfig || !promptConfig.segments) {
      return promptConfig;
    }

    return {
      ...promptConfig,
      segments: promptConfig.segments.filter(seg => seg.id !== segmentId)
    };
  }

  /**
   * 更新提示词段落
   * @param {Object} promptConfig - 提示词配置
   * @param {string} segmentId - 段落ID
   * @param {Object} updates - 更新内容
   * @returns {Object} 更新后的配置
   */
  updateSegment(promptConfig, segmentId, updates) {
    if (!promptConfig || !promptConfig.segments) {
      return promptConfig;
    }

    return {
      ...promptConfig,
      segments: promptConfig.segments.map(seg => 
        seg.id === segmentId ? { ...seg, ...updates } : seg
      )
    };
  }

  // ============================================================
  // 私有方法
  // ============================================================

  /**
   * 获取工具的提示词段落
   * @private
   */
  _getPromptSegments(toolConfig) {
    // 优先使用新的prompt.segments结构
    if (toolConfig.prompt?.segments && Array.isArray(toolConfig.prompt.segments)) {
      return toolConfig.prompt.segments;
    }

    // 兼容旧的promptTemplate字符串
    if (toolConfig.promptTemplate) {
      return [{
        id: 'legacy_prompt',
        type: 'user',
        role: 'USER',
        content: toolConfig.promptTemplate,
        enabled: true,
        deletable: false
      }];
    }

    // 返回默认
    return this.getDefaultPromptTemplate(toolConfig.id || 'default').segments;
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

    const presetId = toolConfig.bypass?.presetId;
    if (!presetId) {
      return [];
    }

    // 从破限词管理器获取预设（需要外部注入或延迟加载）
    // 这里返回一个标记，实际处理在bypass-manager中
    return [];
  }

  /**
   * 标准化角色名称
   * @private
   */
  _normalizeRole(role) {
    if (!role) return 'user';
    
    const normalized = role.toLowerCase();
    
    switch (normalized) {
      case 'system':
      case 'system':
        return 'system';
      case 'user':
      case 'user':
        return 'user';
      case 'assistant':
      case 'assistant':
        return 'assistant';
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
}

// ============================================================
// 单例实例
// ============================================================

export const toolPromptService = new ToolPromptService();
export { DEFAULT_PROMPT_SEGMENT, ToolPromptService };
export default toolPromptService;