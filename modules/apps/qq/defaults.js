/**
 * YouYou Toolkit - QQ App Phase C1 Defaults
 *
 * 默认 prompt 模板 / 解析正则 / 事件名等公共常量。
 * 用户在群配置弹窗中可覆盖 prompt 模板与解析正则；其他常量为模块共用。
 */

export const DEFAULT_PHASE1_PROMPT_TEMPLATE = `你是群聊场景调度员。基于以下信息，判断在本轮用户消息后应当让哪些 NPC 发言。

群氛围：{{atmosphere}}

群成员列表（id: 名字 — 描述）：
{{members}}

最近聊天记录（最多 20 条）：
{{recentMessages}}

用户当前消息：{{userMessage}}

请用 <call>friendId</call> 标注本轮要发言的 NPC，可标多个表示按顺序发言；如果本轮无人发言则不输出任何 <call>。`;

export const DEFAULT_PHASE1_PARSE_REGEX = '<call>([^<]+)</call>';

export const DEFAULT_PER_MEMBER_PROMPT_TEMPLATE = `你正在扮演群聊中的 NPC「{{selfName}}」。

人物设定：{{selfDescription}}

群氛围：{{atmosphere}}

最近聊天记录：
{{recentMessages}}

请以「{{selfName}}」的身份回复一句话（不要带角色名前缀，直接输出对白）。`;

export const RECENT_MESSAGES_WINDOW = 20;

export const EVENT_QQ_MESSAGES_APPENDED = 'qq:messages-appended';
export const EVENT_QQ_PHASE_STATE = 'qq:phase-state';

export const PHASE_STATE_IDLE = 'idle';
export const PHASE_STATE_THINKING = 'thinking';
export const PHASE_STATE_ERROR = 'error';

export const CALL_AI_RETRY_DELAY_MS = 3000;

export const DEFAULT_PER_MINUTE = 6;
export const DEFAULT_MAX_RETRIES = 1;
