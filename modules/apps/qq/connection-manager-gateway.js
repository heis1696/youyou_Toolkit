/**
 * YouYou Toolkit - QQ App ConnectionManager Gateway
 *
 * 通过 SillyTavern.ConnectionManagerRequestService 发送 AI 请求，
 * 绕开主聊天 submit 流程（不动右下角发送按钮，不污染正文）。
 *
 * 参考：Reference/shujuku-spv4.2.2/src/data/gateways/ai-gateway.ts。
 * 跨 realm：所有 SillyTavern globals 通过 host-event-service.getHostContext() 访问。
 */

import { getHostContext } from '../../core/host-event-service.js';

function getConnectionManager() {
  const ctx = getHostContext();
  if (!ctx) return null;
  const svc = ctx.ConnectionManagerRequestService;
  if (!svc || typeof svc.sendRequest !== 'function') return null;
  return svc;
}

function getExtensionSettings() {
  const ctx = getHostContext();
  if (!ctx) return null;
  return ctx.extensionSettings || null;
}

export function isConnectionManagerAvailable() {
  return getConnectionManager() !== null;
}

/**
 * 列出当前已配置的 ConnectionManager profiles。
 * 用于群配置弹窗的下拉选择。
 * @returns {Array<{id: string, name: string, [key: string]: any}>}
 */
export function listConnectionManagerProfiles() {
  const settings = getExtensionSettings();
  const profiles = settings?.connectionManager?.profiles;
  return Array.isArray(profiles) ? profiles : [];
}

/**
 * 提取响应文本。兼容多种返回格式。
 */
function extractResponseText(response) {
  if (!response) return '';
  const choice0 = response?.result?.choices?.[0];
  if (choice0?.message?.content && typeof choice0.message.content === 'string') {
    return choice0.message.content;
  }
  if (typeof choice0?.text === 'string') return choice0.text;
  if (typeof response.content === 'string') return response.content;
  if (typeof response?.result?.content === 'string') return response.result.content;
  if (typeof response === 'string') return response;
  return '';
}

/**
 * 通过 ConnectionManager 发送 AI 请求。
 *
 * @param {string} profileId - ConnectionManager profile id（用户在群配置中选择）
 * @param {Array<{role: string, content: string}>} messages
 * @param {Object} [options]
 *   - maxTokens: number
 *   - abortSignal: AbortSignal
 * @returns {Promise<string>} 响应文本
 */
export async function sendViaConnectionManager(profileId, messages, options = {}) {
  if (!profileId) {
    throw new Error('sendViaConnectionManager: profileId 必填（请在群配置中选择 API 预设）');
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('sendViaConnectionManager: messages 不能为空');
  }

  const svc = getConnectionManager();
  if (!svc) {
    throw new Error('ConnectionManagerRequestService 不可用（请检查 SillyTavern 版本或连接管理器配置）');
  }

  const maxTokens = Number.isFinite(options.maxTokens) && options.maxTokens > 0
    ? options.maxTokens
    : 2048;

  const abortSignal = options.abortSignal;
  if (abortSignal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  // ConnectionManagerRequestService.sendRequest(profileId, messages, maxTokens)
  // 当前 ST 版本不接受 abortSignal 直传；abort 仅能让后续 await 立即抛错。
  const racePromise = svc.sendRequest(profileId, messages, maxTokens);

  let abortListener = null;
  const abortRace = new Promise((_, reject) => {
    if (!abortSignal) return;
    abortListener = () => reject(new DOMException('Aborted', 'AbortError'));
    abortSignal.addEventListener('abort', abortListener, { once: true });
  });

  try {
    const response = abortSignal
      ? await Promise.race([racePromise, abortRace])
      : await racePromise;
    return extractResponseText(response);
  } finally {
    if (abortSignal && abortListener) {
      try { abortSignal.removeEventListener('abort', abortListener); } catch (_) {}
    }
  }
}
