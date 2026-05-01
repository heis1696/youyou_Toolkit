/**
 * YouYou Toolkit - 手动工具执行模块
 * @description 手动执行、提取预览与写回入口模块
 */

import {
  getToolFullConfig,
  updateToolRuntime,
  patchToolRuntime
} from './tool-registry.js';
import {
  toolOutputService,
  OUTPUT_MODES,
  TOOL_FAILURE_STAGES,
  TOOL_WRITEBACK_STATUS
} from './tool-output-service.js';
import {
  buildExecutionContextForLatestAssistant,
  getCurrentCharacter
} from './tool-execution-context.js';
import { contextInjector } from './context-injector.js';
import { runLocalTextTransform } from './tool-local-transform-service.js';
import { showToast, showTopNotice } from './ui/utils.js';
import { logger } from './core/logger-service.js';

const log = logger.createScope('ToolTrigger');

export const TOOL_EXECUTION_PATHS = {
  MANUAL_POST_RESPONSE_API: 'manual_post_response_api',
  MANUAL_LOCAL_TRANSFORM: 'manual_local_transform',
  MANUAL_COMPATIBILITY: 'manual_compatibility'
};

let toolExecutorCompatibilityModulePromise = null;

async function loadToolExecutorCompatibilityModule() {
  if (!toolExecutorCompatibilityModulePromise) {
    toolExecutorCompatibilityModulePromise = import('./tool-executor.js');
  }

  return toolExecutorCompatibilityModulePromise;
}

async function executeToolByResolvedPath(tool, context, isManual) {
  if (isManual && tool.output?.mode === OUTPUT_MODES.POST_RESPONSE_API) {
    return toolOutputService.runToolPostResponse(tool, context);
  }

  if (isManual && tool.output?.mode === OUTPUT_MODES.FOLLOW_AI) {
    return toolOutputService.runToolFollowAiManual(tool, context);
  }

  const compatibilityModule = await loadToolExecutorCompatibilityModule();
  return compatibilityModule.executeToolWithConfig(tool.id, context);
}

function resolveExecutionPath(tool, context) {
  const isManual = context?.runSource === 'MANUAL';
  if (!isManual) {
    return TOOL_EXECUTION_PATHS.MANUAL_POST_RESPONSE_API;
  }

  if (tool.output?.mode === 'local_transform' || tool.processor?.type) {
    return TOOL_EXECUTION_PATHS.MANUAL_LOCAL_TRANSFORM;
  }

  return tool.output?.mode === OUTPUT_MODES.POST_RESPONSE_API
    ? TOOL_EXECUTION_PATHS.MANUAL_POST_RESPONSE_API
    : TOOL_EXECUTION_PATHS.MANUAL_COMPATIBILITY;
}

function updateRuntime(toolId, runtimePartial) {
  try {
    updateToolRuntime(toolId, runtimePartial);
  } catch (error) {
    log.warn('更新工具运行时状态失败:', { toolId, error });
  }
}

function applyLocalTransformToFullMessage(fullMessageText, extractedText, transformedText) {
  const sourceMessage = String(fullMessageText || '');
  const sourceExtracted = String(extractedText || '').trim();
  const nextExtracted = String(transformedText || '').trim();

  if (!sourceMessage.trim() || !sourceExtracted) {
    return {
      nextMessageText: '',
      replaced: false
    };
  }

  if (!sourceMessage.includes(sourceExtracted)) {
    return {
      nextMessageText: '',
      replaced: false
    };
  }

  return {
    nextMessageText: sourceMessage.replace(sourceExtracted, nextExtracted).trim(),
    replaced: true
  };
}

async function runLocalTransformTool(tool, context) {
  const extraction = toolOutputService.getExtractionSnapshot(tool, context);
  const primaryEntry = extraction?.primaryEntry || null;
  const fullMessageText = String(primaryEntry?.fullMessageText || context?.lastAiMessage || '').trim();
  const extractedText = String(primaryEntry?.extractedText || extraction?.extractedRawText || extraction?.extractedText || '').trim();
  const selectors = Array.isArray(extraction?.selectors) ? extraction.selectors : [];
  const traceId = context?.traceId || `trace_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const sessionKey = context?.sessionKey || '';

  if (!extractedText || !fullMessageText) {
    return {
      success: false,
      error: '未提取到可处理内容，请先检查标签或正则规则',
      meta: {
        traceId,
        sessionKey,
        selectors,
        writebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
        failureStage: TOOL_FAILURE_STAGES.EXTRACT_OUTPUT,
        extraction
      }
    };
  }

  const output = String(runLocalTextTransform(tool, extractedText) || '').trim();
  const replacement = applyLocalTransformToFullMessage(fullMessageText, extractedText, output);
  const writebackContent = replacement.replaced ? replacement.nextMessageText : output;
  let writebackDetails = null;
  let writebackStatus = TOOL_WRITEBACK_STATUS.NOT_APPLICABLE;

  if (writebackContent) {
    writebackDetails = await contextInjector.injectDetailed(tool.id, writebackContent, {
      overwrite: true,
      sourceMessageId: context?.sourceMessageId || context?.confirmedAssistantMessageId || context?.messageId || '',
      sourceSwipeId: context?.sourceSwipeId || context?.confirmedAssistantSwipeId || context?.effectiveSwipeId || '',
      effectiveSwipeId: context?.effectiveSwipeId || context?.confirmedAssistantSwipeId || '',
      slotBindingKey: context?.slotBindingKey || '',
      slotRevisionKey: context?.slotRevisionKey || '',
      slotTransactionId: context?.slotTransactionId || '',
      extractionSelectors: [],
      replaceFullMessage: replacement.replaced,
      traceId,
      sessionKey
    });

    if (!writebackDetails?.success) {
      return {
        success: false,
        error: writebackDetails?.error || '本地处理完成，但写回失败',
        meta: {
          traceId,
          sessionKey,
          selectors,
          writebackStatus: TOOL_WRITEBACK_STATUS.FAILED,
          failureStage: TOOL_FAILURE_STAGES.INJECT_CONTEXT,
          writebackDetails,
          extraction
        }
      };
    }

    writebackStatus = TOOL_WRITEBACK_STATUS.SUCCESS;
  } else {
    writebackStatus = TOOL_WRITEBACK_STATUS.SKIPPED_EMPTY_OUTPUT;
  }

  return {
    success: true,
    output,
    meta: {
      traceId,
      sessionKey,
      selectors,
      writebackStatus,
      failureStage: '',
      writebackDetails,
      extraction
    }
  };
}

async function executeManualTool(tool, context) {
  const startedAt = Date.now();
  const toolId = tool.id;
  const noticeId = `yyt-tool-run-${toolId}`;
  const executionPath = resolveExecutionPath(tool, context);
  const executionKey = context?.executionKey || '';

  updateRuntime(toolId, {
    lastStatus: 'running',
    lastError: '',
    lastDurationMs: 0,
    lastTraceId: context?.traceId || '',
    lastMessageKey: context?.messageId || '',
    lastExecutionKey: executionKey,
    lastExecutionPath: executionPath,
    lastWritebackStatus: '',
    lastFailureStage: '',
    lastSlotBindingKey: context?.slotBindingKey || '',
    lastSlotRevisionKey: context?.slotRevisionKey || '',
    lastSlotTransactionId: context?.slotTransactionId || '',
    lastSourceMessageId: context?.sourceMessageId || context?.messageId || '',
    lastSourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
    lastContentCommitted: false,
    lastHostCommitApplied: false,
    lastRefreshRequested: false,
    lastRefreshConfirmed: false,
    lastPreferredCommitMethod: '',
    lastAppliedCommitMethod: '',
    lastRefreshMethodCount: 0,
    lastRefreshMethods: [],
    lastRefreshConfirmChecks: 0,
    lastRefreshConfirmedBy: ''
  });

  showTopNotice('info', `正在手动执行 ${tool.name}`, {
    sticky: true,
    noticeId
  });

  try {
    const result = executionPath === TOOL_EXECUTION_PATHS.MANUAL_LOCAL_TRANSFORM
      ? await runLocalTransformTool(tool, context)
      : await executeToolByResolvedPath(tool, context, true);
    const duration = Date.now() - startedAt;

    if (result?.success) {
      const config = getToolFullConfig(toolId);
      const writebackDetails = result?.meta?.writebackDetails || {};

      updateRuntime(toolId, {
        lastStatus: 'success',
        lastError: '',
        lastDurationMs: duration,
        lastTraceId: context?.traceId || '',
        successCount: (config?.runtime?.successCount || 0) + 1,
        lastMessageKey: context?.messageId || '',
        lastExecutionKey: executionKey,
        lastExecutionPath: executionPath,
        lastWritebackStatus: result?.meta?.writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
        lastFailureStage: result?.meta?.failureStage || '',
        lastSlotBindingKey: context?.slotBindingKey || '',
        lastSlotRevisionKey: context?.slotRevisionKey || '',
        lastSlotTransactionId: context?.slotTransactionId || '',
        lastSourceMessageId: context?.sourceMessageId || context?.messageId || '',
        lastSourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
        lastContentCommitted: !!writebackDetails.contentCommitted,
        lastHostCommitApplied: !!writebackDetails.hostCommitApplied,
        lastRefreshRequested: !!writebackDetails.refreshRequested,
        lastRefreshConfirmed: !!writebackDetails.refreshConfirmed,
        lastPreferredCommitMethod: writebackDetails?.commit?.preferredMethod || '',
        lastAppliedCommitMethod: writebackDetails?.commit?.appliedMethod || '',
        lastRefreshMethodCount: Array.isArray(writebackDetails?.refresh?.requestMethods)
          ? writebackDetails.refresh.requestMethods.length
          : 0,
        lastRefreshMethods: Array.isArray(writebackDetails?.refresh?.requestMethods)
          ? [...writebackDetails.refresh.requestMethods]
          : [],
        lastRefreshConfirmChecks: Number(writebackDetails?.refresh?.confirmChecks) || 0,
        lastRefreshConfirmedBy: writebackDetails?.refresh?.confirmedBy || ''
      });

      showToast('success', `${tool.name} 手动执行完成`);
      showTopNotice('success', `${tool.name} 手动执行完成`, {
        duration: 3200,
        noticeId
      });
      return { success: true, duration, result };
    }

    const config = getToolFullConfig(toolId);
    const errorMessage = result?.error || '工具执行失败';
    const writebackDetails = result?.meta?.writebackDetails || {};

    updateRuntime(toolId, {
      lastStatus: 'error',
      lastError: errorMessage,
      lastDurationMs: duration,
      lastTraceId: context?.traceId || '',
      errorCount: (config?.runtime?.errorCount || 0) + 1,
      lastMessageKey: context?.messageId || '',
      lastExecutionKey: executionKey,
      lastExecutionPath: executionPath,
      lastWritebackStatus: result?.meta?.writebackStatus || TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: result?.meta?.failureStage || (executionPath === TOOL_EXECUTION_PATHS.MANUAL_COMPATIBILITY
        ? TOOL_FAILURE_STAGES.COMPATIBILITY_EXECUTE
        : TOOL_FAILURE_STAGES.UNKNOWN),
      lastSlotBindingKey: context?.slotBindingKey || '',
      lastSlotRevisionKey: context?.slotRevisionKey || '',
      lastSlotTransactionId: context?.slotTransactionId || '',
      lastSourceMessageId: context?.sourceMessageId || context?.messageId || '',
      lastSourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
      lastContentCommitted: !!writebackDetails.contentCommitted,
      lastHostCommitApplied: !!writebackDetails.hostCommitApplied,
      lastRefreshRequested: !!writebackDetails.refreshRequested,
      lastRefreshConfirmed: !!writebackDetails.refreshConfirmed,
      lastPreferredCommitMethod: writebackDetails?.commit?.preferredMethod || '',
      lastAppliedCommitMethod: writebackDetails?.commit?.appliedMethod || '',
      lastRefreshMethodCount: Array.isArray(writebackDetails?.refresh?.requestMethods)
        ? writebackDetails.refresh.requestMethods.length
        : 0,
      lastRefreshMethods: Array.isArray(writebackDetails?.refresh?.requestMethods)
        ? [...writebackDetails.refresh.requestMethods]
        : [],
      lastRefreshConfirmChecks: Number(writebackDetails?.refresh?.confirmChecks) || 0,
      lastRefreshConfirmedBy: writebackDetails?.refresh?.confirmedBy || ''
    });

    showToast('error', `${tool.name} 执行失败：${errorMessage}`);
    showTopNotice('error', `${tool.name} 执行失败：${errorMessage}`, {
      sticky: true,
      noticeId
    });
    return { success: false, duration, error: errorMessage, result };
  } catch (error) {
    const duration = Date.now() - startedAt;
    const config = getToolFullConfig(toolId);
    const errorMessage = error?.message || String(error);

    updateRuntime(toolId, {
      lastStatus: 'error',
      lastError: errorMessage,
      lastDurationMs: duration,
      lastTraceId: context?.traceId || '',
      errorCount: (config?.runtime?.errorCount || 0) + 1,
      lastMessageKey: context?.messageId || '',
      lastExecutionKey: executionKey,
      lastExecutionPath: executionPath,
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: executionPath === TOOL_EXECUTION_PATHS.MANUAL_COMPATIBILITY
        ? TOOL_FAILURE_STAGES.COMPATIBILITY_EXECUTE
        : TOOL_FAILURE_STAGES.UNKNOWN,
      lastSlotBindingKey: context?.slotBindingKey || '',
      lastSlotRevisionKey: context?.slotRevisionKey || '',
      lastSlotTransactionId: context?.slotTransactionId || '',
      lastSourceMessageId: context?.sourceMessageId || context?.messageId || '',
      lastSourceSwipeId: context?.sourceSwipeId || context?.effectiveSwipeId || '',
      lastContentCommitted: false,
      lastHostCommitApplied: false,
      lastRefreshRequested: false,
      lastRefreshConfirmed: false,
      lastPreferredCommitMethod: '',
      lastAppliedCommitMethod: '',
      lastRefreshMethodCount: 0,
      lastRefreshMethods: [],
      lastRefreshConfirmChecks: 0,
      lastRefreshConfirmedBy: ''
    });

    showToast('error', `${tool.name} 执行失败：${errorMessage}`);
    showTopNotice('error', `${tool.name} 执行失败：${errorMessage}`, {
      sticky: true,
      noticeId
    });
    throw error;
  }
}

export async function runToolManually(toolId) {
  if (!toolId) {
    return { success: false, error: '缺少工具ID' };
  }

  const tool = getToolFullConfig(toolId);
  if (!tool) {
    return { success: false, error: '工具不存在' };
  }

  if (!tool.enabled) {
    patchToolRuntime(toolId, {
      lastMessageKey: '',
      lastExecutionKey: '',
      lastExecutionPath: '',
      lastWritebackStatus: TOOL_WRITEBACK_STATUS.NOT_APPLICABLE,
      lastFailureStage: '',
      lastContentCommitted: false,
      lastHostCommitApplied: false,
      lastRefreshRequested: false,
      lastRefreshConfirmed: false,
      lastPreferredCommitMethod: '',
      lastAppliedCommitMethod: '',
      lastRefreshMethodCount: 0,
      lastRefreshMethods: [],
      lastRefreshConfirmChecks: 0,
      lastRefreshConfirmedBy: ''
    }, {
      touchLastRunAt: false,
      emitEvent: false
    });

    showTopNotice('warning', `${tool.name} 未启用，无法手动执行`, {
      duration: 2800,
      noticeId: `yyt-tool-run-${toolId}`
    });
    return { success: false, error: '工具未启用' };
  }

  const context = await buildExecutionContextForLatestAssistant({ runSource: 'MANUAL' });
  return executeManualTool(tool, context);
}

export async function previewToolExtraction(toolId) {
  if (!toolId) {
    return { success: false, error: '缺少工具ID' };
  }

  const tool = getToolFullConfig(toolId);
  if (!tool) {
    return { success: false, error: '工具不存在' };
  }

  const context = await buildExecutionContextForLatestAssistant({ runSource: 'MANUAL_PREVIEW' });
  return toolOutputService.previewExtraction(tool, context);
}

export default {
  runToolManually,
  previewToolExtraction,
  getCurrentCharacter
};
