/**
 * YouYou Toolkit - 本地文本转换服务
 * @description 为本地工具提供纯文本转换能力 + 完整的 run/writeback 编排（手动 + 自动共用）
 */

import { toolOutputService, TOOL_FAILURE_STAGES, TOOL_WRITEBACK_STATUS } from './tool-output-service.js';
import { contextInjector } from './context-injector.js';

const ESCAPE_PAIRS = [
  {
    key: 'newline',
    plain: /\r\n|\r|\n/g,
    escaped: /\\n/g,
    replacement: '\\n',
    unescaped: '\n'
  },
  {
    key: 'doubleQuote',
    plain: /"/g,
    escaped: /\\"/g,
    replacement: '\\"',
    unescaped: '"'
  },
  {
    key: 'singleQuote',
    plain: /'/g,
    escaped: /\\'/g,
    replacement: "\\'",
    unescaped: "'"
  }
];

const PUNCTUATION_PAIRS = [
  { key: 'comma', from: /,/g, to: '，' },
  { key: 'period', from: /\./g, to: '。' },
  { key: 'exclamation', from: /!/g, to: '！' },
  { key: 'question', from: /\?/g, to: '？' },
  { key: 'semicolon', from: /;/g, to: '；' },
  { key: 'colon', from: /:/g, to: '：' },
  { key: 'leftParen', from: /\(/g, to: '（' },
  { key: 'rightParen', from: /\)/g, to: '）' }
];

export const LOCAL_PROCESSOR_TYPES = {
  ESCAPE_TRANSFORM: 'escape_transform',
  PUNCTUATION_TRANSFORM: 'punctuation_transform'
};

function normalizeProcessorOptions(options = {}) {
  if (!options || typeof options !== 'object') {
    return {};
  }

  return Object.entries(options).reduce((result, [key, value]) => {
    result[key] = value === true;
    return result;
  }, {});
}

function applyEscapeTransform(text, processor = {}) {
  const direction = processor?.direction === 'unescape' ? 'unescape' : 'escape';
  const options = normalizeProcessorOptions(processor?.options);

  return ESCAPE_PAIRS.reduce((result, item) => {
    if (options[item.key] !== true) {
      return result;
    }

    if (direction === 'unescape') {
      return result.replace(item.escaped, item.unescaped);
    }

    return result.replace(item.plain, item.replacement);
  }, String(text || ''));
}

function applyPunctuationTransform(text, processor = {}) {
  const direction = processor?.direction || 'en_to_zh';
  if (direction !== 'en_to_zh') {
    return String(text || '');
  }

  const options = normalizeProcessorOptions(processor?.options);

  return PUNCTUATION_PAIRS.reduce((result, item) => {
    if (options[item.key] !== true) {
      return result;
    }

    return result.replace(item.from, item.to);
  }, String(text || ''));
}

export function runLocalTextTransform(toolConfig, sourceText) {
  const processor = toolConfig?.processor || {};
  const type = processor?.type || '';
  const input = String(sourceText || '');

  switch (type) {
    case LOCAL_PROCESSOR_TYPES.ESCAPE_TRANSFORM:
      return applyEscapeTransform(input, processor);
    case LOCAL_PROCESSOR_TYPES.PUNCTUATION_TRANSFORM:
      return applyPunctuationTransform(input, processor);
    default:
      return input;
  }
}

function applyLocalTransformToFullMessage(fullMessageText, extractedText, transformedText) {
  const sourceMessage = String(fullMessageText || '');
  const sourceExtracted = String(extractedText || '').trim();
  const nextExtracted = String(transformedText || '').trim();

  if (!sourceMessage.trim() || !sourceExtracted) {
    return { nextMessageText: '', replaced: false };
  }
  if (!sourceMessage.includes(sourceExtracted)) {
    return { nextMessageText: '', replaced: false };
  }
  return {
    nextMessageText: sourceMessage.replace(sourceExtracted, nextExtracted).trim(),
    replaced: true
  };
}

/**
 * 完整的本地变换工具执行链：提取 → 变换 → 写回。
 * 手动与自动入口共用此函数。
 */
export async function runLocalTransformTool(tool, context = {}) {
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
        traceId, sessionKey, selectors,
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
      sessionKey,
      skipNotify: context?.skipNotify === true
    });

    if (!writebackDetails?.success) {
      return {
        success: false,
        error: writebackDetails?.error || '本地处理完成，但写回失败',
        meta: {
          traceId, sessionKey, selectors,
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
    writebackState: writebackContent ? { committed: writebackDetails?.contentCommitted === true } : null,
    meta: {
      traceId, sessionKey, selectors,
      writebackStatus,
      failureStage: '',
      writebackDetails,
      extraction
    }
  };
}

export default {
  LOCAL_PROCESSOR_TYPES,
  runLocalTextTransform,
  runLocalTransformTool
};