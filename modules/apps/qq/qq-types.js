/**
 * YouYou Toolkit - QQ App Types & Default Factories (Phase B)
 *
 * 与 docs/qq-app-design.md §5 schema 完整对齐。
 * Phase B 只使用部分字段，未用字段保留默认占位，保证 Phase C/D/E 读到的对象不缺字段。
 */

export const QQ_APP_ID = 'qq';

export const STORAGE_KEY_FRIENDS = 'friends';
export const STORAGE_KEY_GROUPS = 'groups';
export const STORAGE_KEY_MESSAGES_BY_CHAT = 'messagesByChat';

export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VOICE: 'voice',
  REDPACKET: 'redpacket',
  SYSTEM: 'system',
};

export const MESSAGE_SENDER_USER = 'user';

function uuid() {
  const rand = Math.random().toString(36).slice(2, 10);
  const time = Date.now().toString(36);
  return `${time}-${rand}`;
}

export function createDefaultFriend({ name, avatar, description } = {}) {
  const now = Date.now();
  return {
    id: `friend-${uuid()}`,
    name: name ?? '未命名',
    avatar: avatar ?? '',
    description: description ?? '',
    globalPrompt: '',
    relations: {},
    source: 'manual',
    createdAt: now,
    updatedAt: now,
  };
}

export function createDefaultGroup({ name } = {}) {
  const now = Date.now();
  return {
    id: `group-${uuid()}`,
    name: name ?? '未命名群',
    atmosphere: '',
    memberIds: [],
    perMemberPrompt: {},
    triggerSources: {
      userMessage: false,
      heartbeat: { enabled: false, intervalSec: 600 },
      tavernEvents: [],
    },
    mergeStrategy: 'compound',
    injectConfig: {
      enabled: false,
      timing: 'one-shot',
      formatTemplate: '',
      formatExplanation: '',
      windowSize: 20,
    },
    rateLimitConfig: {
      perMinute: 3,
      dailyLimit: null,
    },
    phase1Config: {
      promptTemplate: '',
      parseRegex: '',
    },
    apiProfileId: '',
    heartbeatTemplate: '',
    failureConfig: {
      maxRetries: 2,
    },
    createdAt: now,
    updatedAt: now,
  };
}

export function createDefaultMessage({ groupId, sender, content, type = MESSAGE_TYPES.TEXT, replyTo = null } = {}) {
  return {
    id: `msg-${uuid()}`,
    groupId: groupId ?? '',
    chatId: '',
    sender: sender ?? MESSAGE_SENDER_USER,
    content: content ?? '',
    timestamp: Date.now(),
    type,
    replyTo,
  };
}
