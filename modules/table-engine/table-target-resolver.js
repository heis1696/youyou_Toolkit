/**
 * YouYou Toolkit - 填表目标解析服务
 * @description 基于现有 execution context 生成 revision-aware 的 table target snapshot
 */

import { buildExecutionContextForLatestAssistant, buildExecutionContextForMessage, normalizeMessageIdentityValue } from '../tool-execution-context.js';
import { createTableTargetSnapshot, TABLE_RUN_SOURCES } from './table-types.js';

function getMessageIdentityCandidates(message = {}, index = -1) {
  return [
    message?.sourceId,
    message?.messageId,
    message?.message_id,
    message?.id,
    message?.mid,
    message?.mesid,
    message?.mes_id,
    message?.chat_index,
    message?.index,
    index
  ].map((value) => normalizeMessageIdentityValue(value));
}

function resolveTargetMessageIndex(chatMessages = [], sourceMessageId = '') {
  const normalizedMessageId = normalizeMessageIdentityValue(sourceMessageId);
  if (!normalizedMessageId || !Array.isArray(chatMessages)) {
    return -1;
  }

  for (let index = chatMessages.length - 1; index >= 0; index -= 1) {
    const message = chatMessages[index];
    const candidates = getMessageIdentityCandidates(message, index);

    if (candidates.includes(normalizedMessageId)) {
      return index;
    }
  }

  return -1;
}

export function resolveTableTargetFromExecutionContext(executionContext = {}, options = {}) {
  const sourceMessageId = normalizeMessageIdentityValue(
    executionContext?.sourceMessageId
    || executionContext?.confirmedAssistantMessageId
    || executionContext?.messageId
  );

  if (!sourceMessageId) {
    return null;
  }

  const targetSnapshot = createTableTargetSnapshot({
    resolvedAt: Date.now(),
    runSource: options.runSource || executionContext?.runSource || TABLE_RUN_SOURCES.MANUAL,
    traceId: executionContext?.traceId || '',
    chatId: executionContext?.chatId || '',
    sourceMessageId,
    sourceSwipeId: executionContext?.sourceSwipeId || executionContext?.effectiveSwipeId || '',
    effectiveSwipeId: executionContext?.effectiveSwipeId || executionContext?.sourceSwipeId || 'swipe:current',
    slotBindingKey: executionContext?.slotBindingKey || '',
    slotRevisionKey: executionContext?.slotRevisionKey || '',
    slotTransactionId: executionContext?.slotTransactionId || '',
    assistantContentFingerprint: executionContext?.assistantContentFingerprint || '',
    assistantBaseFingerprint: executionContext?.assistantBaseFingerprint || '',
    assistantText: executionContext?.lastAiMessage || '',
    assistantBaseText: executionContext?.assistantBaseText || '',
    targetMessageIndex: resolveTargetMessageIndex(
      executionContext?.chatMessages || executionContext?.chatHistory || [],
      sourceMessageId
    )
  });

  if (!targetSnapshot.slotBindingKey || !targetSnapshot.slotRevisionKey) {
    return null;
  }

  return targetSnapshot;
}

export async function resolveLatestTableTarget({ runSource = TABLE_RUN_SOURCES.MANUAL } = {}) {
  const executionContext = await buildExecutionContextForLatestAssistant({ runSource });
  return resolveTableTargetFromExecutionContext(executionContext, { runSource });
}

export async function resolveTableTargetForMessage({ messageId, swipeId = '', runSource = TABLE_RUN_SOURCES.AUTO } = {}) {
  const executionContext = await buildExecutionContextForMessage({ messageId, swipeId, runSource });
  return resolveTableTargetFromExecutionContext(executionContext, { runSource });
}

export async function resolveFreshTableTarget(expectedSnapshot = null, options = {}) {
  const expected = expectedSnapshot || null;
  if (typeof options.resolveTarget === 'function') {
    return await options.resolveTarget(expected);
  }

  const runSource = normalizeMessageIdentityValue(options.runSource || expected?.runSource) || TABLE_RUN_SOURCES.MANUAL;
  const messageId = normalizeMessageIdentityValue(options.messageId || expected?.sourceMessageId);
  const swipeId = normalizeMessageIdentityValue(options.swipeId || expected?.sourceSwipeId || expected?.effectiveSwipeId);
  const shouldResolveByMessage = options.useMessageTarget === true || runSource === TABLE_RUN_SOURCES.AUTO;

  if (shouldResolveByMessage) {
    if (!messageId) {
      return null;
    }

    return resolveTableTargetForMessage({ messageId, swipeId, runSource });
  }

  return resolveLatestTableTarget({ runSource });
}

export function validateTableTargetSnapshot(expectedSnapshot, currentSnapshot) {
  const expected = expectedSnapshot || null;
  const current = currentSnapshot || null;

  if (!expected || !current) {
    return {
      valid: false,
      reason: 'missing_target_snapshot'
    };
  }

  if (normalizeMessageIdentityValue(expected.sourceMessageId) !== normalizeMessageIdentityValue(current.sourceMessageId)) {
    return {
      valid: false,
      reason: 'source_message_changed'
    };
  }

  if (normalizeMessageIdentityValue(expected.sourceSwipeId || expected.effectiveSwipeId) !== normalizeMessageIdentityValue(current.sourceSwipeId || current.effectiveSwipeId)) {
    return {
      valid: false,
      reason: 'source_swipe_changed'
    };
  }

  if (normalizeMessageIdentityValue(expected.slotRevisionKey) !== normalizeMessageIdentityValue(current.slotRevisionKey)) {
    return {
      valid: false,
      reason: 'slot_revision_changed'
    };
  }

  return {
    valid: true,
    reason: 'ok'
  };
}

export default {
  resolveTableTargetFromExecutionContext,
  resolveLatestTableTarget,
  resolveTableTargetForMessage,
  resolveFreshTableTarget,
  validateTableTargetSnapshot
};
