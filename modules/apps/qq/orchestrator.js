/**
 * YouYou Toolkit - QQ App Phase C1 Orchestrator
 *
 * 触发循环编排：USER_MESSAGE_RENDERED → 找启用群 → 频率检查 → Phase 1 → Phase 2 串行。
 * 单 in-flight 锁（C1.6）：整个 App 同时只有一条 Phase 1+2 链路在跑。
 * chatId race（C1.11）：CHAT_CHANGED 立即 abort；phase2 内 entryChatId 二次校验。
 */

import { hostEvents, HOST_EVENTS } from '../../core/host-event-service.js';
import { ChatIdChangedError } from './ai-call.js';
import { createPhase1 } from './phase1.js';
import { createPhase2 } from './phase2.js';
import { extractUserMessageContent } from './triggers/user-message.js';
import { createDefaultMessage, MESSAGE_TYPES, MESSAGE_SENDER_USER } from './qq-types.js';
import {
  EVENT_QQ_MESSAGES_APPENDED,
  EVENT_QQ_PHASE_STATE,
  PHASE_STATE_IDLE,
  PHASE_STATE_THINKING,
  PHASE_STATE_ERROR,
  DEFAULT_PER_MINUTE,
} from './defaults.js';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;

export function createOrchestrator({ qqStorage, logger, eventBus }) {
  if (!qqStorage) throw new Error('orchestrator: qqStorage 必填');
  if (!eventBus) throw new Error('orchestrator: eventBus 必填');

  const phase1 = createPhase1({ qqStorage, logger });
  const phase2 = createPhase2({ qqStorage, logger, eventBus });

  /** @type {{ groupId: string, abortController: AbortController } | null} */
  let currentTask = null;
  /** @type {Map<string, number[]>} */
  const lastTriggerAt = new Map();
  let unsubUserMessage = null;
  let unsubChatChanged = null;
  let installed = false;

  function emitPhaseState(status, groupId, extra = {}) {
    try {
      eventBus.emit(EVENT_QQ_PHASE_STATE, { status, groupId: groupId || null, ...extra });
    } catch (err) {
      logger?.warn?.(`[QQOrchestrator] emit phase-state 失败: ${err?.message || err}`);
    }
  }

  function checkRateLimit(groupId, perMinute) {
    const limit = Number.isFinite(perMinute) && perMinute > 0 ? perMinute : DEFAULT_PER_MINUTE;
    const now = Date.now();
    const arr = lastTriggerAt.get(groupId) || [];
    const fresh = arr.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length >= limit) {
      lastTriggerAt.set(groupId, fresh);
      return false;
    }
    fresh.push(now);
    lastTriggerAt.set(groupId, fresh);
    return true;
  }

  function writeSystemFailureMessage(groupId, errMessage, entryChatId) {
    try {
      const currentChatId = qqStorage.getCurrentChatId?.();
      if (entryChatId && currentChatId && currentChatId !== entryChatId) {
        logger?.info?.(`[QQOrchestrator] chatId 已切换 (${entryChatId} → ${currentChatId})，跳过 system 失败消息写入`);
        return;
      }
      const message = qqStorage.appendMessage(
        groupId,
        createDefaultMessage({
          groupId,
          sender: MESSAGE_SENDER_USER,
          content: `[系统] AI 响应失败：${errMessage}`,
          type: MESSAGE_TYPES.SYSTEM,
        }),
      );
      if (message) {
        try {
          eventBus.emit(EVENT_QQ_MESSAGES_APPENDED, { groupId, message });
        } catch (_) {}
      }
    } catch (err) {
      logger?.warn?.(`[QQOrchestrator] 写 system 失败消息异常: ${err?.message || err}`);
    }
  }

  async function runChain(group, userMessage) {
    const abortController = new AbortController();
    currentTask = { groupId: group.id, abortController };
    const entryChatId = qqStorage.getCurrentChatId?.() || '';

    emitPhaseState(PHASE_STATE_THINKING, group.id);
    logger?.info?.(`[QQOrchestrator] 启动 Phase 链路: group=${group.id} chatId=${entryChatId}`);

    try {
      const { npcIds } = await phase1.run(group, userMessage, abortController.signal);

      if (!Array.isArray(npcIds) || npcIds.length === 0) {
        logger?.info?.(`[QQOrchestrator] Phase 1 未选出 NPC，正常退出`);
        emitPhaseState(PHASE_STATE_IDLE, group.id);
        return;
      }

      for (const npcId of npcIds) {
        if (abortController.signal.aborted) {
          logger?.info?.(`[QQOrchestrator] Phase 2 中途被 abort，停止串行`);
          break;
        }
        const currentChatId = qqStorage.getCurrentChatId?.();
        if (entryChatId && currentChatId && currentChatId !== entryChatId) {
          throw new ChatIdChangedError(
            `chatId 切换 ${entryChatId} → ${currentChatId}`,
          );
        }
        try {
          await phase2.runOne(group, npcId, entryChatId, abortController.signal);
        } catch (innerErr) {
          if (innerErr?.name === 'AbortError' || innerErr instanceof ChatIdChangedError) throw innerErr;
          logger?.warn?.(`[QQOrchestrator] Phase 2 npc=${npcId} 失败: ${innerErr?.message || innerErr}`);
        }
      }

      emitPhaseState(PHASE_STATE_IDLE, group.id);
      logger?.info?.(`[QQOrchestrator] Phase 链路完成: group=${group.id}`);
    } catch (err) {
      if (err?.name === 'AbortError') {
        logger?.info?.(`[QQOrchestrator] Phase 链路 aborted (group=${group.id})`);
        emitPhaseState(PHASE_STATE_IDLE, group.id);
      } else if (err instanceof ChatIdChangedError) {
        logger?.info?.(`[QQOrchestrator] Phase 链路 chatId 变化中断 (group=${group.id}): ${err.message}`);
        emitPhaseState(PHASE_STATE_IDLE, group.id);
      } else {
        logger?.error?.(`[QQOrchestrator] Phase 链路失败 (group=${group.id}): ${err?.message || err}`, err);
        writeSystemFailureMessage(group.id, String(err?.message || err), entryChatId);
        emitPhaseState(PHASE_STATE_ERROR, group.id, { error: String(err?.message || err) });
      }
    } finally {
      currentTask = null;
    }
  }

  function handleUserMessage(payload) {
    try {
      if (currentTask) {
        logger?.info?.(`[QQOrchestrator] 已有 Phase 链路在跑 (group=${currentTask.groupId})，本次 USER_MESSAGE_RENDERED 跳过`);
        return;
      }

      const userMessage = extractUserMessageContent(payload);
      if (!userMessage) {
        logger?.warn?.(`[QQOrchestrator] USER_MESSAGE_RENDERED 提取不到内容，payload=${JSON.stringify(payload)?.slice(0, 200)}`);
        return;
      }

      const groups = (qqStorage.listGroups() || []).filter(
        (g) => g?.triggerSources?.userMessage === true,
      );
      if (groups.length === 0) {
        return;
      }

      for (const group of groups) {
        if (currentTask) break;
        const perMinute = group?.rateLimitConfig?.perMinute;
        if (!checkRateLimit(group.id, perMinute)) {
          logger?.info?.(`[QQOrchestrator] group=${group.id} 命中频率限制（perMinute=${perMinute}），跳过`);
          continue;
        }
        runChain(group, userMessage).catch((err) => {
          logger?.error?.(`[QQOrchestrator] runChain unhandled: ${err?.message || err}`, err);
        });
        break;
      }
    } catch (err) {
      logger?.error?.(`[QQOrchestrator] handleUserMessage 异常: ${err?.message || err}`, err);
    }
  }

  function handleChatChanged() {
    if (currentTask) {
      logger?.info?.(`[QQOrchestrator] CHAT_CHANGED → abort 当前链路 (group=${currentTask.groupId})`);
      try {
        currentTask.abortController.abort();
      } catch (_) {}
    }
    lastTriggerAt.clear();
  }

  function install() {
    if (installed) return;
    try {
      unsubUserMessage = hostEvents.subscribe(HOST_EVENTS.USER_MESSAGE_RENDERED, handleUserMessage);
    } catch (err) {
      logger?.error?.(`[QQOrchestrator] 订阅 USER_MESSAGE_RENDERED 失败: ${err?.message || err}`, err);
    }
    try {
      unsubChatChanged = hostEvents.subscribe(HOST_EVENTS.CHAT_CHANGED, handleChatChanged);
    } catch (err) {
      logger?.error?.(`[QQOrchestrator] 订阅 CHAT_CHANGED 失败: ${err?.message || err}`, err);
    }
    installed = true;
    logger?.info?.(`[QQOrchestrator] installed`);
  }

  function uninstall() {
    if (!installed) return;
    try { if (unsubUserMessage) unsubUserMessage(); } catch (_) {}
    try { if (unsubChatChanged) unsubChatChanged(); } catch (_) {}
    unsubUserMessage = null;
    unsubChatChanged = null;
    if (currentTask) {
      try { currentTask.abortController.abort(); } catch (_) {}
      currentTask = null;
    }
    lastTriggerAt.clear();
    installed = false;
    logger?.info?.(`[QQOrchestrator] uninstalled`);
  }

  function isRunning() {
    return currentTask !== null;
  }

  return { install, uninstall, isRunning };
}
