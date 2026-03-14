/**
 * YouYou Toolkit - 工具执行引擎
 * @description 负责工具的调度、并发控制和结果处理
 */

import { getToolFullConfig } from './tool-registry.js';
import { eventBus, EVENTS } from './core/event-bus.js';

// ============================================================
// 执行器状态
// ============================================================

/**
 * 执行器状态管理
 */
const executorState = {
  // 当前活跃的AbortController
  activeControllers: new Map(), // taskId -> AbortController
  
  // 执行队列
  executionQueue: [],
  
  // 正在执行的任务数
  runningCount: 0,
  
  // 最大并发数
  maxConcurrent: 3,
  
  // 执行历史（最近100条）
  executionHistory: [],
  
  // 是否暂停
  isPaused: false
};

// ============================================================
// 执行结果类型
// ============================================================

/**
 * @typedef {Object} ExecutionResult
 * @property {boolean} success - 是否成功
 * @property {string} taskId - 任务ID
 * @property {string} toolId - 工具ID
 * @property {*} data - 返回数据
 * @property {Error|null} error - 错误信息
 * @property {number} duration - 执行时长(ms)
 * @property {number} retries - 重试次数
 * @property {Object} metadata - 元数据
 */

/**
 * 创建执行结果
 */
function createResult(taskId, toolId, success, data, error, duration, retries = 0) {
  return {
    success,
    taskId,
    toolId,
    data,
    error,
    duration,
    retries,
    timestamp: Date.now(),
    metadata: {}
  };
}

// ============================================================
// 任务调度器
// ============================================================

/**
 * 生成唯一任务ID
 * @returns {string}
 */
function generateTaskId() {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 创建执行任务
 * @param {string} toolId 工具ID
 * @param {Object} options 执行选项
 * @returns {Object} 任务对象
 */
function createTask(toolId, options = {}) {
  return {
    id: generateTaskId(),
    toolId,
    options,
    status: 'pending', // pending, running, completed, failed, aborted
    createdAt: Date.now(),
    startedAt: null,
    completedAt: null,
    retries: 0,
    maxRetries: options.maxRetries || 3
  };
}

/**
 * 任务调度器类
 */
class TaskScheduler {
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
    this.queue = [];
    this.running = new Map();
    this.isProcessing = false;
  }
  
  /**
   * 添加任务到队列
   * @param {Function} executor 执行函数
   * @param {Object} task 任务对象
   * @returns {Promise} 执行结果Promise
   */
  enqueue(executor, task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ executor, task, resolve, reject });
      this.process();
    });
  }
  
  /**
   * 处理队列
   */
  async process() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    
    while (this.queue.length > 0 && this.running.size < this.maxConcurrent) {
      const item = this.queue.shift();
      if (!item) continue;
      
      const { executor, task, resolve, reject } = item;
      
      // 创建AbortController
      const controller = new AbortController();
      task.abortController = controller;
      task.status = 'running';
      task.startedAt = Date.now();
      
      this.running.set(task.id, task);
      executorState.activeControllers.set(task.id, controller);
      
      // 执行任务
      this.executeTask(executor, task, controller.signal)
        .then(result => {
          task.status = 'completed';
          task.completedAt = Date.now();
          resolve(result);
        })
        .catch(error => {
          task.status = error.name === 'AbortError' ? 'aborted' : 'failed';
          task.completedAt = Date.now();
          reject(error);
        })
        .finally(() => {
          this.running.delete(task.id);
          executorState.activeControllers.delete(task.id);
          executorState.runningCount = this.running.size;
        });
    }
    
    this.isProcessing = false;
  }
  
  /**
   * 执行单个任务
   */
  async executeTask(executor, task, signal) {
    const startTime = Date.now();
    let lastError = null;
    
    for (let attempt = 0; attempt <= task.maxRetries; attempt++) {
      if (signal.aborted) {
        throw new DOMException('任务已中止', 'AbortError');
      }
      
      try {
        const result = await executor(signal);
        return createResult(
          task.id,
          task.toolId,
          true,
          result,
          null,
          Date.now() - startTime,
          attempt
        );
      } catch (error) {
        lastError = error;
        
        // 如果是中止错误，直接抛出
        if (error.name === 'AbortError') {
          throw error;
        }
        
        // 如果还有重试机会，等待后重试
        if (attempt < task.maxRetries) {
          await this.delay(1000 * (attempt + 1)); // 指数退避
          task.retries = attempt + 1;
        }
      }
    }
    
    // 所有重试都失败了
    throw lastError;
  }
  
  /**
   * 延迟函数
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * 中止任务
   */
  abort(taskId) {
    const controller = executorState.activeControllers.get(taskId);
    if (controller) {
      controller.abort();
      return true;
    }
    return false;
  }
  
  /**
   * 中止所有任务
   */
  abortAll() {
    for (const controller of executorState.activeControllers.values()) {
      controller.abort();
    }
    executorState.activeControllers.clear();
    this.queue = [];
    this.running.clear();
  }
  
  /**
   * 获取队列状态
   */
  getStatus() {
    return {
      pending: this.queue.length,
      running: this.running.size,
      maxConcurrent: this.maxConcurrent
    };
  }
}

// 全局调度器实例
let schedulerInstance = null;

/**
 * 获取调度器实例
 * @returns {TaskScheduler}
 */
export function getScheduler() {
  if (!schedulerInstance) {
    schedulerInstance = new TaskScheduler(executorState.maxConcurrent);
  }
  return schedulerInstance;
}

/**
 * 设置最大并发数
 * @param {number} max
 */
export function setMaxConcurrent(max) {
  executorState.maxConcurrent = Math.max(1, Math.min(10, max));
  if (schedulerInstance) {
    schedulerInstance.maxConcurrent = executorState.maxConcurrent;
  }
}

// ============================================================
// 执行引擎核心
// ============================================================

/**
 * 执行工具
 * @param {string} toolId 工具ID
 * @param {Object} options 执行选项
 * @param {Function} executor 执行函数
 * @returns {Promise<ExecutionResult>}
 */
export async function executeTool(toolId, options = {}, executor) {
  const scheduler = getScheduler();
  const task = createTask(toolId, options);
  
  // 如果暂停，等待恢复
  while (executorState.isPaused) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  try {
    const result = await scheduler.enqueue(async (signal) => {
      // 检查是否已中止
      if (signal.aborted) {
        throw new DOMException('任务已中止', 'AbortError');
      }
      
      // 执行实际的任务
      if (typeof executor === 'function') {
        return await executor(signal, options);
      }
      
      throw new Error('执行器必须是一个函数');
    }, task);
    
    // 记录执行历史
    addToHistory(result);
    
    return result;
  } catch (error) {
    const result = createResult(
      task.id,
      toolId,
      false,
      null,
      error,
      Date.now() - task.createdAt,
      task.retries
    );
    
    addToHistory(result);
    return result;
  }
}

/**
 * 批量执行工具
 * @param {Array<{toolId: string, options: Object, executor: Function}>} tasks 任务列表
 * @param {Object} batchOptions 批量选项
 * @returns {Promise<ExecutionResult[]>}
 */
export async function executeBatch(tasks, batchOptions = {}) {
  const { failFast = false, concurrency = executorState.maxConcurrent } = batchOptions;
  
  const results = [];
  const scheduler = getScheduler();
  const originalMax = scheduler.maxConcurrent;
  
  // 临时设置并发数
  scheduler.maxConcurrent = concurrency;
  
  try {
    const promises = tasks.map(({ toolId, options, executor }) => {
      return executeTool(toolId, options, executor);
    });
    
    if (failFast) {
      // 任一失败立即返回
      for (const promise of promises) {
        const result = await promise;
        results.push(result);
        if (!result.success) {
          // 中止其他任务
          scheduler.abortAll();
          break;
        }
      }
    } else {
      // 使用Promise.allSettled等待所有任务完成
      const settled = await Promise.allSettled(promises);
      for (const item of settled) {
        if (item.status === 'fulfilled') {
          results.push(item.value);
        } else {
          results.push(createResult(
            generateTaskId(),
            'unknown',
            false,
            null,
            item.reason,
            0,
            0
          ));
        }
      }
    }
  } finally {
    // 恢复原始并发数
    scheduler.maxConcurrent = originalMax;
  }
  
  return results;
}

/**
 * 中止任务
 * @param {string} taskId 任务ID
 * @returns {boolean}
 */
export function abortTask(taskId) {
  const scheduler = getScheduler();
  return scheduler.abort(taskId);
}

/**
 * 中止所有任务
 */
export function abortAllTasks() {
  const scheduler = getScheduler();
  scheduler.abortAll();
  executorState.executionQueue = [];
}

/**
 * 暂停执行器
 */
export function pauseExecutor() {
  executorState.isPaused = true;
}

/**
 * 恢复执行器
 */
export function resumeExecutor() {
  executorState.isPaused = false;
}

/**
 * 获取执行器状态
 * @returns {Object}
 */
export function getExecutorStatus() {
  const scheduler = getScheduler();
  return {
    ...scheduler.getStatus(),
    isPaused: executorState.isPaused,
    activeControllers: executorState.activeControllers.size,
    historyCount: executorState.executionHistory.length
  };
}

// ============================================================
// 执行历史
// ============================================================

/**
 * 添加到执行历史
 * @param {ExecutionResult} result
 */
function addToHistory(result) {
  executorState.executionHistory.push(result);
  
  // 保持历史记录不超过100条
  if (executorState.executionHistory.length > 100) {
    executorState.executionHistory.shift();
  }
}

/**
 * 获取执行历史
 * @param {Object} filter 过滤条件
 * @returns {ExecutionResult[]}
 */
export function getExecutionHistory(filter = {}) {
  let history = [...executorState.executionHistory];
  
  if (filter.toolId) {
    history = history.filter(r => r.toolId === filter.toolId);
  }
  
  if (filter.success !== undefined) {
    history = history.filter(r => r.success === filter.success);
  }
  
  if (filter.limit) {
    history = history.slice(-filter.limit);
  }
  
  return history;
}

/**
 * 清除执行历史
 */
export function clearExecutionHistory() {
  executorState.executionHistory = [];
}

// ============================================================
// 结果处理
// ============================================================

/**
 * 合并多个执行结果
 * @param {ExecutionResult[]} results
 * @returns {Object}
 */
export function mergeResults(results) {
  const merged = {
    success: true,
    data: [],
    errors: [],
    totalDuration: 0,
    successCount: 0,
    failureCount: 0
  };
  
  for (const result of results) {
    merged.totalDuration += result.duration;
    
    if (result.success) {
      merged.successCount++;
      if (result.data !== undefined && result.data !== null) {
        merged.data.push(result.data);
      }
    } else {
      merged.success = false;
      merged.failureCount++;
      if (result.error) {
        merged.errors.push({
          taskId: result.taskId,
          toolId: result.toolId,
          error: result.error.message || String(result.error)
        });
      }
    }
  }
  
  return merged;
}

/**
 * 提取成功的执行结果
 * @param {ExecutionResult[]} results
 * @returns {*[]}
 */
export function extractSuccessful(results) {
  return results
    .filter(r => r.success)
    .map(r => r.data);
}

/**
 * 提取失败的执行结果
 * @param {ExecutionResult[]} results
 * @returns {Object[]}
 */
export function extractFailed(results) {
  return results
    .filter(r => !r.success)
    .map(r => ({
      taskId: r.taskId,
      toolId: r.toolId,
      error: r.error
    }));
}

// ============================================================
// 执行上下文
// ============================================================

/**
 * 创建执行上下文
 * @param {Object} options
 * @returns {Object}
 */
export function createExecutionContext(options = {}) {
  return {
    taskId: generateTaskId(),
    startTime: Date.now(),
    signal: options.signal || null,
    apiConfig: options.apiConfig || null,
    bypassMessages: options.bypassMessages || [],
    context: options.context || {},
    metadata: options.metadata || {}
  };
}

/**
 * 增强消息（添加破限词）
 * @param {Object[]} messages 原始消息
 * @param {Object[]} bypassMessages 破限词消息
 * @returns {Object[]}
 */
export function enhanceMessagesWithBypass(messages, bypassMessages) {
  if (!bypassMessages || bypassMessages.length === 0) {
    return messages;
  }
  
  // 在原始消息前添加破限词消息
  return [...bypassMessages, ...messages];
}

// ============================================================
// 工具配置执行引擎
// ============================================================

/**
 * 转义正则表达式特殊字符
 * @param {string} string 需要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 构建工具消息
 * @param {Object} config 工具配置
 * @param {Object} context 执行上下文
 * @returns {Array} 消息数组
 */
export function buildToolMessages(config, context) {
  const messages = [];
  
  // 处理提示词模板
  let prompt = config.promptTemplate || '';
  
  // 定义模板变量
  const variables = {
    '{{userMessage}}': context.input?.userMessage || '',
    '{{lastAiMessage}}': context.input?.lastAiMessage || '',
    '{{extractedContent}}': context.input?.extractedContent || '',
    '{{previousToolOutput}}': context.input?.previousToolOutput || '',
    '{{context}}': JSON.stringify(context.input?.context || {}),
    // 摘要工具特定变量
    '{{pg}}': context.input?.context?.pg || '1',
    '{{time}}': context.input?.context?.time || '',
    '{{scene}}': context.input?.context?.scene || '',
    '{{plot}}': context.input?.context?.plot || '',
    '{{mq}}': context.input?.context?.mq || 'Ⅰ',
    '{{mqStatus}}': context.input?.context?.mqStatus || '进行中',
    '{{sq}}': context.input?.context?.sq || '1',
    '{{sqStatus}}': context.input?.context?.sqStatus || '进行中',
    '{{latestSq}}': context.input?.context?.latestSq || '1',
    '{{completed}}': context.input?.context?.completed || '无',
    '{{defined}}': context.input?.context?.defined || '',
    '{{status}}': context.input?.context?.status || '',
    '{{seeds}}': context.input?.context?.seeds || '',
    // 状态栏特定变量
    '{{name}}': context.input?.context?.name || '',
    '{{location}}': context.input?.context?.location || '',
    '{{condition}}': context.input?.context?.condition || '',
    '{{equipment}}': context.input?.context?.equipment || '',
    '{{skills}}': context.input?.context?.skills || ''
  };
  
  // 替换模板变量
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
 * 执行工具（使用工具配置）
 * @param {string} toolId 工具ID
 * @param {Object} context 执行上下文
 * @param {Object} options 执行选项
 * @returns {Promise<Object>} 执行结果
 */
export async function executeToolWithConfig(toolId, context, options = {}) {
  const config = getToolFullConfig(toolId);
  
  if (!config) {
    return {
      success: false,
      taskId: generateTaskId(),
      toolId,
      error: '工具配置不存在',
      duration: 0
    };
  }
  
  if (!config.enabled) {
    return {
      success: false,
      taskId: generateTaskId(),
      toolId,
      error: '工具未启用',
      duration: 0
    };
  }
  
  const startTime = Date.now();
  const taskId = generateTaskId();
  
  try {
    // 发送执行开始事件
    eventBus.emit(EVENTS.TOOL_EXECUTION_STARTED, { toolId, taskId, context });
    
    // 构建消息
    const messages = buildToolMessages(config, context);
    
    // 检查是否有API调用函数
    if (typeof options.callApi === 'function') {
      // 使用提供的API调用函数
      const apiConfig = config.apiPreset ? { preset: config.apiPreset } : null;
      const response = await options.callApi(messages, apiConfig, options.signal);
      
      // 处理输出
      let output = response;
      
      if (config.outputMode === 'separate' && config.extractTags?.length > 0) {
        // 额外解析模式：提取指定标签内容
        output = extractTagsFromResponse(response, config.extractTags);
      }
      
      const result = {
        success: true,
        taskId,
        toolId,
        data: output,
        duration: Date.now() - startTime
      };
      
      // 发送执行完成事件
      eventBus.emit(EVENTS.TOOL_EXECUTED, { toolId, taskId, result });
      
      return result;
    } else {
      // 没有API调用函数，返回构建的消息供外部处理
      return {
        success: true,
        taskId,
        toolId,
        data: {
          messages,
          config: {
            apiPreset: config.apiPreset,
            outputMode: config.outputMode,
            extractTags: config.extractTags
          }
        },
        duration: Date.now() - startTime,
        needsExecution: true  // 标记需要外部执行
      };
    }
  } catch (error) {
    const result = {
      success: false,
      taskId,
      toolId,
      error: error.message || String(error),
      duration: Date.now() - startTime
    };
    
    // 发送执行失败事件
    eventBus.emit(EVENTS.TOOL_EXECUTION_FAILED, { toolId, taskId, error });
    
    return result;
  }
}

/**
 * 从响应中提取标签内容
 * @param {string} response AI响应文本
 * @param {Array<string>} tags 要提取的标签列表
 * @returns {Object} 提取的内容
 */
function extractTagsFromResponse(response, tags) {
  const result = {};
  
  for (const tag of tags) {
    // 匹配 <tag>...</tag> 格式
    const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
    const match = response.match(regex);
    
    if (match) {
      result[tag] = match.map(m => {
        // 提取标签内容
        const contentMatch = m.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
        return contentMatch ? contentMatch[1].trim() : '';
      });
    }
  }
  
  return result;
}

/**
 * 批量执行工具（使用工具配置）
 * @param {string[]} toolIds 工具ID列表
 * @param {Object} context 执行上下文
 * @param {Object} options 执行选项
 * @returns {Promise<Object[]>} 执行结果列表
 */
export async function executeToolsBatch(toolIds, context, options = {}) {
  const results = [];
  
  for (const toolId of toolIds) {
    const config = getToolFullConfig(toolId);
    if (config && config.enabled) {
      const result = await executeToolWithConfig(toolId, context, options);
      results.push(result);
    }
  }
  
  return results;
}

/**
 * 根据触发事件获取需要执行的工具
 * @param {string} eventType 事件类型
 * @returns {Array} 需要执行的工具配置列表
 */
export function getToolsForEvent(eventType) {
  const allConfigs = [];
  
  // 获取摘要工具和状态栏工具的配置
  const toolIds = ['summaryTool', 'statusBlock'];
  
  for (const toolId of toolIds) {
    const config = getToolFullConfig(toolId);
    if (config && config.enabled && config.triggerEvents?.includes(eventType)) {
      allConfigs.push(config);
    }
  }
  
  return allConfigs;
}

// 导出
export { executorState, createResult, generateTaskId };
