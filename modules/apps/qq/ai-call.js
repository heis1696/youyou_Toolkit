/**
 * YouYou Toolkit - QQ App Phase C1 AI Call Helper
 *
 * 共享 AI 调用工具：abort-aware sleep + 重试包装 + chatId 变化错误类型。
 * phase1 / phase2 共用，避免相互 import。
 *
 * 走 ConnectionManagerRequestService.sendRequest（不进入主聊天 submit 流程）。
 * 不影响右下角发送按钮与正文渲染。
 */

import { sendViaConnectionManager } from './connection-manager-gateway.js';
import { CALL_AI_RETRY_DELAY_MS } from './defaults.js';

/**
 * chatId 在 Phase 2 串行中途变化，必须 abort 整条链路。
 * orchestrator try/catch 识别此类型 → 仅 log，不写 system 失败消息。
 */
export class ChatIdChangedError extends Error {
  constructor(message = 'ChatId changed during phase chain') {
    super(message);
    this.name = 'ChatIdChangedError';
  }
}

/**
 * abort-aware sleep。返回 true 表示完整 sleep，false 表示中途 abort。
 */
export function sleepWithAbort(ms, abortSignal) {
  return new Promise((resolve) => {
    if (abortSignal?.aborted) {
      resolve(false);
      return;
    }
    const timer = setTimeout(() => resolve(true), ms);
    const onAbort = () => {
      clearTimeout(timer);
      resolve(false);
    };
    abortSignal?.addEventListener?.('abort', onAbort, { once: true });
  });
}

/**
 * 调用 AI，最多重试 maxRetries 次（共 maxRetries+1 次尝试）。
 * abort 立即抛 AbortError，不进入重试。
 *
 * @param {Object} params
 * @param {string} params.profileId - ConnectionManager profile id（必填）
 * @param {Array} params.messages
 * @param {Object} [params.options] - { maxTokens }
 * @param {AbortSignal} [params.abortSignal]
 * @param {number} [params.maxRetries=1]
 * @param {Object} [params.logger]
 * @param {string} [params.label='callAI']
 */
export async function callAiWithRetry({
  profileId,
  messages,
  options = {},
  abortSignal,
  maxRetries = 1,
  logger,
  label = 'callAI',
}) {
  if (!profileId) {
    throw new Error(`${label}: 未配置 API 预设 profileId`);
  }
  let lastErr = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (abortSignal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }
    try {
      const output = await sendViaConnectionManager(profileId, messages, {
        maxTokens: options.maxTokens,
        abortSignal,
      });
      return output;
    } catch (err) {
      lastErr = err;
      if (err?.name === 'AbortError') throw err;
      if (attempt < maxRetries) {
        logger?.warn?.(`${label} 第 ${attempt + 1} 次失败: ${err?.message || err}; ${CALL_AI_RETRY_DELAY_MS}ms 后重试`);
        const ok = await sleepWithAbort(CALL_AI_RETRY_DELAY_MS, abortSignal);
        if (!ok) throw new DOMException('Aborted', 'AbortError');
      } else {
        logger?.error?.(`${label} 重试 ${maxRetries} 次后仍失败: ${err?.message || err}`, err);
      }
    }
  }
  throw lastErr || new Error(`${label} failed without error`);
}
