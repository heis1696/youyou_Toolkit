/**
 * YouYou Toolkit - 填表 chat-scope 容器层
 *
 * 议题 #15 §A 关键修订：shujuku 把模板 chat 级覆盖 + 历史归档 + SheetGuide
 * 放在 chat[0] 消息的 `TavernDB_ACU_ScopedConfig` 自定义字段里。
 *
 * 容器结构（per chat × per isolationKey）：
 *   ScopedConfig = {
 *     template: {
 *       [isolationKey]: {
 *         mode,            // inherit_global | chat_override | preset_link
 *         presetName,      // preset_link 模式存预设名
 *         templateStr,     // chat_override 模式存 JSON 字符串
 *         guideData,       // 关联 SheetGuide
 *         updatedAt,
 *         source           // ui | inherit | restore | preset_apply
 *       }
 *     },
 *     templateArchives: {
 *       [isolationKey]: [ ...历史快照（最新在前，最多 8 份）]
 *     }
 *   }
 *
 * v1 实现：先走 storage namespace `tableChatScope` by chatId 索引，
 *         与 table-guide-service.js 风格一致。
 * v2 待办：改为 chat[0] 消息字段方案（对标 shujuku）以修 memory #4
 *         chatId 不可靠隐患。所有 IO 通过 _readFromStorage / _writeToStorage
 *         helper，方便后续替换 PersistenceAdapter。
 *
 * 设计约束（memory project_table_workbench_gaps esbuild __esm 陷阱）：
 *   - 顶层不调用 logger.createScope()，用 lazy getLog()
 */

import { storage } from '../core/storage-service.js';
import { logger } from '../core/logger-service.js';
import {
  TABLE_TEMPLATE_SCOPE_MODE,
  MAX_TEMPLATE_ARCHIVES_PER_ISOLATION,
  DEFAULT_ISOLATION_KEY,
  normalizeIsolationKey,
  cloneTableValue
} from './table-types.js';
import { tableIsolation } from './table-isolation-service.js';

const STORAGE_NAMESPACE = 'tableChatScope';
const SCOPE_MAP_KEY = 'chats';

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableChatScope');
  return _log;
}

function resolveCurrentChatId() {
  const win = globalThis.window || globalThis;
  const candidate = win?.TavernHelper?.getCurrentChatId?.()
    || win?.Silvy?.getCurrentChatId?.()
    || win?.chat_metadata?.chat_id
    || win?.this_chid
    || win?.name1;
  const normalized = String(candidate ?? '').trim();
  return normalized || 'default_chat';
}

function nowIso() {
  return new Date().toISOString();
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// ════════════════════════════════════════════════════════════════
// Persistence adapter（v1：storage namespace by chatId）
// ════════════════════════════════════════════════════════════════
//
// 把 read/write 抽到这两个 helper 里，未来可换成 chat[0] 字段实现而
// 不破坏外部 API。

const scopeStorage = storage.namespace(STORAGE_NAMESPACE);

function _readFromStorage(chatId) {
  const map = scopeStorage.get(SCOPE_MAP_KEY, {});
  const safeMap = isObject(map) ? map : {};
  const raw = safeMap[chatId];
  return normalizeScopedConfig(raw);
}

function _writeToStorage(chatId, scopedConfig) {
  const map = scopeStorage.get(SCOPE_MAP_KEY, {});
  const safeMap = isObject(map) ? map : {};
  safeMap[chatId] = scopedConfig;
  scopeStorage.set(SCOPE_MAP_KEY, safeMap);
}

// ════════════════════════════════════════════════════════════════
// Normalizers
// ════════════════════════════════════════════════════════════════

function createEmptyScopedConfig() {
  return {
    template: {},        // {[isolationKey]: TemplateScopeState}
    templateArchives: {} // {[isolationKey]: ArchiveEntry[]}
  };
}

function normalizeScopedConfig(value) {
  if (!isObject(value)) return createEmptyScopedConfig();
  return {
    template: isObject(value.template) ? value.template : {},
    templateArchives: isObject(value.templateArchives) ? value.templateArchives : {}
  };
}

const VALID_SCOPE_MODES = new Set(Object.values(TABLE_TEMPLATE_SCOPE_MODE));

function normalizeTemplateScopeState(value) {
  if (!isObject(value)) return null;
  const mode = VALID_SCOPE_MODES.has(value.mode) ? value.mode : TABLE_TEMPLATE_SCOPE_MODE.INHERIT_GLOBAL;
  return {
    mode,
    presetName: typeof value.presetName === 'string' ? value.presetName : '',
    templateStr: typeof value.templateStr === 'string' ? value.templateStr : '',
    guideData: value.guideData !== undefined ? cloneTableValue(value.guideData) : null,
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : nowIso(),
    source: typeof value.source === 'string' ? value.source : 'ui'
  };
}

function fingerprintForArchive(state) {
  // 用 mode + presetName + templateStr 计算简易指纹避免重复归档
  // shujuku hashUserInput_ACU 风格简化版
  const parts = [
    state.mode || '',
    state.presetName || '',
    state.templateStr || ''
  ];
  let hash = 5381;
  const str = parts.join('||');
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

// ════════════════════════════════════════════════════════════════
// Service
// ════════════════════════════════════════════════════════════════

class TableChatScopeService {
  // ──────────────────────────────────────────────────────────
  // 完整 ScopedConfig 读写
  // ──────────────────────────────────────────────────────────

  /**
   * 读取当前 chat 完整 ScopedConfig 容器
   * @param {string} [chatId]
   * @returns {{template: Object, templateArchives: Object}}
   */
  getScopedConfig(chatId = resolveCurrentChatId()) {
    return _readFromStorage(chatId);
  }

  /**
   * 写回完整 ScopedConfig 容器（原子覆盖）
   * @param {{template?: Object, templateArchives?: Object}} value
   * @param {string} [chatId]
   */
  setScopedConfig(value, chatId = resolveCurrentChatId()) {
    const normalized = normalizeScopedConfig(value);
    _writeToStorage(chatId, normalized);
    return normalized;
  }

  // ──────────────────────────────────────────────────────────
  // 模板作用域：三模式 (inherit_global / chat_override / preset_link)
  // ──────────────────────────────────────────────────────────

  /**
   * 读取当前 chat × isolationKey 的模板作用域状态
   * 若未设置则返回 null（上层应 fallback 到 inherit_global）
   * @param {string} [isolationKey]
   * @param {string} [chatId]
   * @returns {Object|null}
   */
  getTemplateScope(isolationKey, chatId = resolveCurrentChatId()) {
    const iso = normalizeIsolationKey(isolationKey === undefined ? tableIsolation.getKey() : isolationKey);
    const config = _readFromStorage(chatId);
    return normalizeTemplateScopeState(config.template[iso]) || null;
  }

  /**
   * 写入当前 chat × isolationKey 的模板作用域状态
   * @param {Object} state - { mode, presetName?, templateStr?, guideData?, source? }
   * @param {string} [isolationKey]
   * @param {string} [chatId]
   */
  setTemplateScope(state, isolationKey, chatId = resolveCurrentChatId()) {
    const iso = normalizeIsolationKey(isolationKey === undefined ? tableIsolation.getKey() : isolationKey);
    const normalized = normalizeTemplateScopeState({ ...state, updatedAt: nowIso() });
    if (!normalized) {
      getLog().warn('setTemplateScope 收到无效 state', state);
      return null;
    }
    const config = _readFromStorage(chatId);
    config.template[iso] = normalized;
    _writeToStorage(chatId, config);
    getLog().info('模板作用域已更新', { chatId, isolationKey: iso, mode: normalized.mode });
    return normalized;
  }

  /**
   * 清除当前 chat × isolationKey 的模板覆盖（回到 inherit_global）
   */
  clearTemplateScope(isolationKey, chatId = resolveCurrentChatId()) {
    const iso = normalizeIsolationKey(isolationKey === undefined ? tableIsolation.getKey() : isolationKey);
    const config = _readFromStorage(chatId);
    if (config.template[iso] !== undefined) {
      delete config.template[iso];
      _writeToStorage(chatId, config);
      getLog().info('模板作用域已清除', { chatId, isolationKey: iso });
    }
  }

  // ──────────────────────────────────────────────────────────
  // 模板归档（每 isolationKey 最多 8 份历史快照）
  // ──────────────────────────────────────────────────────────

  /**
   * 把当前 chat_override 模板状态推入归档
   * 自动按指纹去重；超出 MAX_TEMPLATE_ARCHIVES_PER_ISOLATION 时丢弃最旧
   * @returns {Object|null} - 入栈的 archive entry，若无当前状态/重复则 null
   */
  archiveCurrentTemplate(isolationKey, chatId = resolveCurrentChatId()) {
    const iso = normalizeIsolationKey(isolationKey === undefined ? tableIsolation.getKey() : isolationKey);
    const config = _readFromStorage(chatId);
    const current = normalizeTemplateScopeState(config.template[iso]);
    if (!current) return null;

    const fp = fingerprintForArchive(current);
    const archives = Array.isArray(config.templateArchives[iso]) ? config.templateArchives[iso] : [];

    // 同指纹去重 — 最新已经是这个状态则跳过
    if (archives.length > 0 && archives[0].fingerprint === fp) return null;

    const entry = {
      fingerprint: fp,
      state: cloneTableValue(current),
      archivedAt: nowIso()
    };

    const next = [entry, ...archives].slice(0, MAX_TEMPLATE_ARCHIVES_PER_ISOLATION);
    config.templateArchives[iso] = next;
    _writeToStorage(chatId, config);
    getLog().info('模板已归档', { chatId, isolationKey: iso, archiveCount: next.length });
    return entry;
  }

  /**
   * 列出归档（最新在前）
   * @returns {Array<{fingerprint, state, archivedAt}>}
   */
  listTemplateArchives(isolationKey, chatId = resolveCurrentChatId()) {
    const iso = normalizeIsolationKey(isolationKey === undefined ? tableIsolation.getKey() : isolationKey);
    const config = _readFromStorage(chatId);
    const archives = Array.isArray(config.templateArchives[iso]) ? config.templateArchives[iso] : [];
    return archives.map((entry) => cloneTableValue(entry));
  }

  /**
   * 把指定 archive 还原为当前作用域状态
   * 还原前自动 archive 当前状态（如果存在），形成 undo 链
   * @param {number} index - archive 下标（0 = 最新）
   */
  restoreTemplateArchive(index, isolationKey, chatId = resolveCurrentChatId()) {
    const iso = normalizeIsolationKey(isolationKey === undefined ? tableIsolation.getKey() : isolationKey);
    const config = _readFromStorage(chatId);
    const archives = Array.isArray(config.templateArchives[iso]) ? config.templateArchives[iso] : [];
    const target = archives[index];
    if (!target) {
      getLog().warn('restoreTemplateArchive: 找不到 archive', { index, available: archives.length });
      return null;
    }

    // 先 archive 当前（如果有）
    this.archiveCurrentTemplate(iso, chatId);

    const restored = normalizeTemplateScopeState({ ...target.state, source: 'restore', updatedAt: nowIso() });
    if (!restored) return null;

    // 重新读取（archiveCurrentTemplate 可能改了 archives）
    const freshConfig = _readFromStorage(chatId);
    freshConfig.template[iso] = restored;
    _writeToStorage(chatId, freshConfig);
    getLog().info('模板已恢复', { chatId, isolationKey: iso, fromArchiveIndex: index });
    return restored;
  }

  /**
   * 清空指定 isolationKey 的所有归档
   */
  clearTemplateArchives(isolationKey, chatId = resolveCurrentChatId()) {
    const iso = normalizeIsolationKey(isolationKey === undefined ? tableIsolation.getKey() : isolationKey);
    const config = _readFromStorage(chatId);
    if (Array.isArray(config.templateArchives[iso])) {
      delete config.templateArchives[iso];
      _writeToStorage(chatId, config);
      getLog().info('模板归档已清空', { chatId, isolationKey: iso });
    }
  }

  // ──────────────────────────────────────────────────────────
  // 危险操作 — 重置当前 chat 全部 scope 数据
  // ──────────────────────────────────────────────────────────

  /**
   * 重置当前 chat 的全部 scope 容器（清除所有 isolationKey 的模板/归档）
   * 对应 v3 预览"全局注入 → 危险操作 → 清空 isolationKey 归档"
   */
  resetChat(chatId = resolveCurrentChatId()) {
    _writeToStorage(chatId, createEmptyScopedConfig());
    getLog().warn('已重置 chat 的 ScopedConfig', { chatId });
  }
}

// 单例 + 命名导出
const tableChatScope = new TableChatScopeService();

export {
  tableChatScope,
  STORAGE_NAMESPACE as TABLE_CHAT_SCOPE_NAMESPACE,
  resolveCurrentChatId
};
export default tableChatScope;
