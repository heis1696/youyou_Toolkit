/**
 * YouYou Toolkit - QQ App Phase C1 Phase 2
 *
 * Phase 2：单个 NPC 生成一条群消息。
 * 严格串行（C1.10）：每次 runOne 内部重新 listMessages，含已写回的早期 NPC 消息。
 * chatId race 保护（C1.11）：append 前对比 entryChatId，不等则抛 ChatIdChangedError。
 */

import { callAiWithRetry, ChatIdChangedError } from './ai-call.js';
import {
  DEFAULT_PER_MEMBER_PROMPT_TEMPLATE,
  RECENT_MESSAGES_WINDOW,
  DEFAULT_MAX_RETRIES,
  EVENT_QQ_MESSAGES_APPENDED,
} from './defaults.js';
import { createDefaultMessage, MESSAGE_TYPES } from './qq-types.js';

function escapeReplacement(str) {
  return String(str ?? '').replace(/\$/g, '$$$$');
}

function fillTemplate(template, vars) {
  let out = String(template || '');
  for (const [key, value] of Object.entries(vars)) {
    const pattern = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    out = out.replace(pattern, escapeReplacement(value));
  }
  return out;
}

function buildRecentMessagesText(groupId, qqStorage) {
  const messages = qqStorage.listMessages(groupId) || [];
  const slice = messages.slice(-RECENT_MESSAGES_WINDOW);
  if (slice.length === 0) return '(暂无聊天记录)';
  const lines = slice.map((m) => {
    let label;
    if (m.sender === 'user') {
      label = '我';
    } else if (m.type === MESSAGE_TYPES.SYSTEM) {
      label = '系统';
    } else {
      const f = qqStorage.getFriend?.(m.sender);
      label = f?.name ? f.name : m.sender || '?';
    }
    return `[${label}]: ${String(m.content || '')}`;
  });
  return lines.join('\n');
}

export function createPhase2({ qqStorage, logger, eventBus }) {
  /**
   * 让一个 NPC 生成一条消息并写回。
   * @param {object} group
   * @param {string} npcId
   * @param {string} entryChatId - 链路开始时的 chatId，append 前比对
   * @param {AbortSignal} abortSignal
   * @returns {Promise<object|null>} message 或 null（friend 不存在 / 空响应）
   */
  async function runOne(group, npcId, entryChatId, abortSignal) {
    if (!group) throw new Error('phase2.runOne: group 必填');
    if (!npcId) throw new Error('phase2.runOne: npcId 必填');

    const friend = qqStorage.getFriend?.(npcId);
    if (!friend) {
      logger?.warn?.(`[Phase2] npc=${npcId} 不存在，跳过`);
      return null;
    }

    const template =
      (group?.perMemberPrompt && group.perMemberPrompt[npcId]) ||
      DEFAULT_PER_MEMBER_PROMPT_TEMPLATE;
    const maxRetries = Number.isFinite(group?.failureConfig?.maxRetries)
      ? group.failureConfig.maxRetries
      : DEFAULT_MAX_RETRIES;

    const filled = fillTemplate(template, {
      atmosphere: String(group.atmosphere || '(未设置)'),
      selfName: String(friend.name || '(未命名)'),
      selfDescription: String(friend.description || '(无描述)'),
      recentMessages: buildRecentMessagesText(group.id, qqStorage),
    });

    logger?.info?.(`[Phase2] group=${group.id} npc=${npcId}(${friend.name}) prompt 长度=${filled.length}`);

    const output = await callAiWithRetry({
      messages: [{ role: 'user', content: filled }],
      options: {},
      abortSignal,
      maxRetries,
      logger,
      label: `Phase2[${group.id}/${npcId}]`,
    });

    const content = String(output || '').trim();
    if (!content) {
      logger?.warn?.(`[Phase2] npc=${npcId} 响应为空，跳过 append`);
      return null;
    }

    const currentChatId = qqStorage.getCurrentChatId?.();
    if (entryChatId && currentChatId && currentChatId !== entryChatId) {
      throw new ChatIdChangedError(
        `chatId 已从 ${entryChatId} 切换到 ${currentChatId}，中断 Phase 2`,
      );
    }

    const message = qqStorage.appendMessage(
      group.id,
      createDefaultMessage({
        groupId: group.id,
        sender: npcId,
        content,
        type: MESSAGE_TYPES.TEXT,
      }),
    );

    if (message) {
      try {
        eventBus?.emit?.(EVENT_QQ_MESSAGES_APPENDED, { groupId: group.id, message });
      } catch (err) {
        logger?.warn?.(`[Phase2] eventBus.emit 失败: ${err?.message || err}`);
      }
    }

    return message || null;
  }

  return { runOne };
}
