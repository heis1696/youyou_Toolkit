/**
 * YouYou Toolkit - 填表 guide 服务
 * @description 管理当前聊天维度的 tableWorkbench guide 配置
 */

import { storage } from '../core/storage-service.js';
import { DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID } from './table-schema-service.js';
import { TABLE_RUN_SCOPE } from './table-types.js';
import { normalizeRunScopeConfig } from './table-scope-service.js';

const guideStorage = storage.namespace('tableWorkbenchGuides');
const GUIDE_MAP_KEY = 'guides';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function resolveCurrentChatId() {
  const win = globalThis.window || globalThis;
  return normalizeString(
    win?.TavernHelper?.getCurrentChatId?.()
      || win?.Silvy?.getCurrentChatId?.()
      || win?.chat_metadata?.chat_id
      || win?.this_chid
      || win?.name1,
    'default_chat'
  );
}

function normalizeBoolean(value, fallback = false) {
  return value === true;
}

function normalizeGuideWorldbookSync(value = {}) {
  const src = value && typeof value === 'object' ? value : {};
  return {
    enabled: normalizeBoolean(src.enabled, false),
    targetBook: normalizeString(src.targetBook, ''),
    entryComment: normalizeString(src.entryComment, 'YYT-填表数据')
  };
}

export function normalizeTableGuide(value = {}, fallback = {}) {
  const source = value && typeof value === 'object' ? value : {};
  const scope = normalizeRunScopeConfig(source.scope, {
    mode: source.runScope || fallback.runScope || TABLE_RUN_SCOPE.ENABLED,
    selectedTableIds: source.selectedTableIds || fallback.selectedTableIds || [],
    activeTableId: source.activeTableId || fallback.activeTableId || ''
  });
  return {
    chatId: normalizeString(source.chatId, normalizeString(fallback.chatId, resolveCurrentChatId())),
    templateId: normalizeString(source.templateId, normalizeString(fallback.templateId, DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID)),
    enabledTableIds: Array.isArray(source.enabledTableIds) ? source.enabledTableIds.map(id => normalizeString(id, '')).filter(Boolean) : [],
    focusedTableId: normalizeString(source.focusedTableId, scope.activeTableId),
    scope,
    worldbookSync: normalizeGuideWorldbookSync(source.worldbookSync),
    seedNote: normalizeString(source.seedNote, ''),
    updatedAt: normalizeString(source.updatedAt, new Date().toISOString())
  };
}

function getGuideMap() {
  const stored = guideStorage.get(GUIDE_MAP_KEY, {});
  return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
}

export function getCurrentTableGuide(chatId = resolveCurrentChatId()) {
  const key = normalizeString(chatId, 'default_chat');
  const guideMap = getGuideMap();
  return normalizeTableGuide(guideMap[key], { chatId: key });
}

export function saveCurrentTableGuide(guideInput = {}, chatId = resolveCurrentChatId()) {
  const key = normalizeString(chatId, 'default_chat');
  const guideMap = getGuideMap();
  const guide = normalizeTableGuide({
    ...guideMap[key],
    ...(guideInput || {}),
    chatId: key,
    updatedAt: new Date().toISOString()
  }, { chatId: key });
  guideStorage.set(GUIDE_MAP_KEY, {
    ...guideMap,
    [key]: guide
  });
  return { success: true, guide };
}

export function applyGuideToConfig(config = {}, guideInput = null) {
  const guide = normalizeTableGuide(guideInput || getCurrentTableGuide(), {
    templateId: config.activeTemplate,
    runScope: config.runScope,
    selectedTableIds: config.scope?.selectedTableIds,
    activeTableId: config.scope?.activeTableId
  });
  const result = {
    ...config,
    activeTemplate: guide.templateId || config.activeTemplate,
    runScope: guide.scope.mode,
    scope: guide.scope
  };

  if (guide.worldbookSync && guide.worldbookSync.targetBook) {
    result.worldbookSync = {
      ...(config.worldbookSync || {}),
      ...guide.worldbookSync
    };
  }

  return result;
}

export default {
  normalizeTableGuide,
  getCurrentTableGuide,
  saveCurrentTableGuide,
  applyGuideToConfig
};
