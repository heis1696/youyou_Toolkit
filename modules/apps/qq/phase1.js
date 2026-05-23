/**
 * YouYou Toolkit - QQ App Phase C1 Phase 1
 *
 * Phase 1：主 AI 选 NPC。
 * 输入：群配置 + 用户消息；输出：本轮要发言的 NPC id 列表 + 原始输出。
 */

import { testRegex } from '../../regex-extractor.js';
import { callAiWithRetry } from './ai-call.js';
import {
  DEFAULT_PHASE1_PROMPT_TEMPLATE,
  DEFAULT_PHASE1_PARSE_REGEX,
  RECENT_MESSAGES_WINDOW,
  DEFAULT_MAX_RETRIES,
} from './defaults.js';

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

function buildMembersText(group, qqStorage) {
  const ids = Array.isArray(group?.memberIds) ? group.memberIds : [];
  const lines = [];
  for (const id of ids) {
    const f = qqStorage.getFriend?.(id);
    if (!f) continue;
    const name = String(f.name || '').trim() || '(未命名)';
    const desc = String(f.description || '').trim() || '(无描述)';
    lines.push(`${f.id}: ${name} — ${desc}`);
  }
  return lines.length > 0 ? lines.join('\n') : '(暂无成员)';
}

function buildRecentMessagesText(group, qqStorage) {
  const messages = qqStorage.listMessages(group.id) || [];
  const slice = messages.slice(-RECENT_MESSAGES_WINDOW);
  if (slice.length === 0) return '(暂无聊天记录)';
  const lines = slice.map((m) => {
    let label;
    if (m.sender === 'user') {
      label = '我';
    } else if (m.type === 'system') {
      label = '系统';
    } else {
      const f = qqStorage.getFriend?.(m.sender);
      label = f?.name ? f.name : m.sender || '?';
    }
    return `[${label}]: ${String(m.content || '')}`;
  });
  return lines.join('\n');
}

export function createPhase1({ qqStorage, logger }) {
  async function run(group, userMessage, abortSignal) {
    if (!group) throw new Error('phase1.run: group 必填');
    const template = group?.phase1Config?.promptTemplate || DEFAULT_PHASE1_PROMPT_TEMPLATE;
    const parseRegex = group?.phase1Config?.parseRegex || DEFAULT_PHASE1_PARSE_REGEX;
    const maxRetries = Number.isFinite(group?.failureConfig?.maxRetries)
      ? group.failureConfig.maxRetries
      : DEFAULT_MAX_RETRIES;

    const filled = fillTemplate(template, {
      atmosphere: String(group.atmosphere || '(未设置)'),
      members: buildMembersText(group, qqStorage),
      recentMessages: buildRecentMessagesText(group, qqStorage),
      userMessage: String(userMessage || ''),
    });

    logger?.info?.(`[Phase1] group=${group.id} prompt 长度=${filled.length}`);

    const output = await callAiWithRetry({
      presetName: String(group.apiPresetName || '').trim(),
      messages: [{ role: 'user', content: filled }],
      options: {},
      abortSignal,
      maxRetries,
      logger,
      label: `Phase1[${group.id}]`,
    });

    const rawOutput = String(output || '');
    const result = testRegex(parseRegex, rawOutput, 'g', 1);
    if (!result.success) {
      logger?.warn?.(`[Phase1] 正则解析失败: ${result.error}; 视为无 NPC 发言`);
      return { npcIds: [], rawOutput };
    }

    const npcIds = (result.matches || [])
      .map((m) => String(m?.groups?.[0] || '').trim())
      .filter((id) => id.length > 0);

    logger?.info?.(`[Phase1] 解析出 ${npcIds.length} 个 NPC: ${npcIds.join(', ')}`);

    return { npcIds, rawOutput };
  }

  return { run };
}
