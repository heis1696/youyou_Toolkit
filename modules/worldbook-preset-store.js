/**
 * YouYou Toolkit - 世界书预设存储
 *
 * 详见 docs/PHASE3_ARCHITECTURE.md §7（世界书注入预设）+ §12（预设面板合并）。
 *
 * 数据结构（per preset）：
 * {
 *   id: 'wb_<ts>_<rand>',
 *   name: string,
 *   description: string,
 *   bindingMode: 'character_card' | 'custom',
 *   includeDisabled: boolean,
 *   bookList: [
 *     {
 *       bookName: string,
 *       enabled: boolean,
 *       entryOverrides: { [entryUid]: { enabled: boolean } }   // 仅存差异，迭代 2 启用
 *     }
 *   ],
 *   createdAt: number,
 *   updatedAt: number
 * }
 *
 * 存储位置：presetStorage namespace
 *   - key 'worldbook_presets'        → { [id]: preset }
 *   - key 'worldbook_current_preset' → string (id)
 */

import { presetStorage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';
import { logger } from './core/logger-service.js';

const log = logger.createScope('WorldbookPresetStore');

const STORAGE_KEY = 'worldbook_presets';
const CURRENT_KEY = 'worldbook_current_preset';

const BINDING_MODES = Object.freeze({
  CHARACTER_CARD: 'character_card',
  CUSTOM: 'custom'
});

function genId() {
  return `wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function _readAll() {
  const raw = presetStorage.get(STORAGE_KEY);
  if (!raw || typeof raw !== 'object') return {};
  return raw;
}

function _writeAll(map) {
  presetStorage.set(STORAGE_KEY, map);
}

// ───── 内置预设支持（议题 #45）─────
const BUILTIN_PREFIX = 'builtin_worldbook_';
let _builtinPresets = [];

function _isBuiltinId(id) {
  return typeof id === 'string' && id.startsWith(BUILTIN_PREFIX);
}

function _findBuiltin(id) {
  if (!_isBuiltinId(id)) return null;
  return _builtinPresets.find((p) => p.id === id) || null;
}

export function _setBuiltinPresets(list) {
  if (!Array.isArray(list)) {
    _builtinPresets = [];
    return;
  }
  _builtinPresets = list
    .map((p) => normalizePreset({ ...p, id: String(p?.id || '') }))
    .filter((p) => _isBuiltinId(p.id));
}

function normalizePreset(input = {}) {
  const id = String(input.id || genId());
  const bookList = Array.isArray(input.bookList) ? input.bookList.map((b) => ({
    bookName: String(b?.bookName || ''),
    enabled: b?.enabled !== false,
    entryOverrides: (b?.entryOverrides && typeof b.entryOverrides === 'object') ? b.entryOverrides : {}
  })).filter((b) => b.bookName) : [];
  return {
    id,
    name: String(input.name || '').trim() || '未命名预设',
    description: String(input.description || ''),
    bindingMode: input.bindingMode === BINDING_MODES.CUSTOM ? BINDING_MODES.CUSTOM : BINDING_MODES.CHARACTER_CARD,
    includeDisabled: input.includeDisabled === true,
    bookList,
    createdAt: Number.isFinite(input.createdAt) ? input.createdAt : Date.now(),
    updatedAt: Number.isFinite(input.updatedAt) ? input.updatedAt : Date.now()
  };
}

/**
 * 列出所有预设（按 updatedAt desc 排序）。内置预设排在最前。
 */
export function listPresets() {
  const map = _readAll();
  const userList = Object.values(map)
    .map(normalizePreset)
    .sort((a, b) => b.updatedAt - a.updatedAt);
  return [..._builtinPresets, ...userList];
}

export function getPreset(id) {
  if (!id) return null;
  if (_isBuiltinId(id)) return _findBuiltin(id);
  const map = _readAll();
  return map[id] ? normalizePreset(map[id]) : null;
}

export function getCurrentPresetId() {
  const id = presetStorage.get(CURRENT_KEY);
  return typeof id === 'string' && id ? id : '';
}

export function getCurrentPreset() {
  const id = getCurrentPresetId();
  return id ? getPreset(id) : null;
}

export function setCurrentPresetId(id) {
  if (id && _isBuiltinId(id)) {
    presetStorage.set(CURRENT_KEY, id);
    eventBus.emit(EVENTS.PRESET_ACTIVATED, { kind: 'worldbook', id });
    return true;
  }
  const map = _readAll();
  if (id && !map[id]) {
    log.warn(`setCurrentPresetId 找不到预设: ${id}`);
    return false;
  }
  presetStorage.set(CURRENT_KEY, id || '');
  eventBus.emit(EVENTS.PRESET_ACTIVATED, { kind: 'worldbook', id });
  return true;
}

/**
 * 创建新预设。
 */
export function createPreset(partial = {}) {
  const preset = normalizePreset({
    ...partial,
    id: genId(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  const map = _readAll();
  map[preset.id] = preset;
  _writeAll(map);
  eventBus.emit(EVENTS.PRESET_CREATED, { kind: 'worldbook', id: preset.id });
  log.info(`创建预设: ${preset.id} (${preset.name})`);
  return preset;
}

/**
 * 更新预设（局部 merge）。内置预设拒绝修改。
 */
export function updatePreset(id, patch = {}) {
  if (!id) return null;
  if (_isBuiltinId(id)) {
    log.warn(`拒绝修改内置预设: ${id}`);
    return null;
  }
  const map = _readAll();
  const existing = map[id];
  if (!existing) {
    log.warn(`updatePreset 找不到预设: ${id}`);
    return null;
  }
  const merged = normalizePreset({
    ...existing,
    ...patch,
    id,
    createdAt: existing.createdAt,
    updatedAt: Date.now()
  });
  map[id] = merged;
  _writeAll(map);
  eventBus.emit(EVENTS.PRESET_UPDATED, { kind: 'worldbook', id });
  return merged;
}

/**
 * 删除预设。内置预设拒绝删除。
 */
export function deletePreset(id) {
  if (!id) return false;
  if (_isBuiltinId(id)) {
    log.warn(`拒绝删除内置预设: ${id}`);
    return false;
  }
  const map = _readAll();
  if (!map[id]) return false;
  delete map[id];
  _writeAll(map);
  if (getCurrentPresetId() === id) {
    presetStorage.set(CURRENT_KEY, '');
  }
  eventBus.emit(EVENTS.PRESET_DELETED, { kind: 'worldbook', id });
  log.info(`删除预设: ${id}`);
  return true;
}

/**
 * 复制预设（含内置 → 用户）。
 */
export function duplicatePreset(id, { nameSuffix = ' 副本' } = {}) {
  const source = getPreset(id);
  if (!source) return null;
  return createPreset({
    ...source,
    id: undefined,
    name: `${source.name}${nameSuffix}`
  });
}

/**
 * 重命名预设。内置预设拒绝。
 */
export function renamePreset(id, newName) {
  if (_isBuiltinId(id)) {
    log.warn(`拒绝重命名内置预设: ${id}`);
    return null;
  }
  return updatePreset(id, { name: String(newName || '').trim() || '未命名预设' });
}

/**
 * 导出全部预设（JSON 可序列化）。
 */
export function exportAll() {
  return {
    version: 1,
    exportedAt: Date.now(),
    presets: Object.values(_readAll()).map(normalizePreset)
  };
}

/**
 * 从导出数据导入预设（追加，不覆盖现有）。
 * 返回 { added, skipped }
 */
export function importPresets(payload) {
  if (!payload || typeof payload !== 'object') return { added: 0, skipped: 0 };
  const list = Array.isArray(payload.presets) ? payload.presets : [];
  const map = _readAll();
  let added = 0;
  let skipped = 0;
  for (const item of list) {
    const normalized = normalizePreset({ ...item, id: genId(), createdAt: Date.now(), updatedAt: Date.now() });
    map[normalized.id] = normalized;
    added += 1;
  }
  _writeAll(map);
  if (added > 0) eventBus.emit(EVENTS.PRESET_IMPORTED, { kind: 'worldbook', count: added });
  return { added, skipped };
}

/**
 * 重置：清空所有预设（含 current 指针）。
 */
export function resetAll() {
  presetStorage.set(STORAGE_KEY, {});
  presetStorage.set(CURRENT_KEY, '');
  log.info('已清空所有世界书预设');
}

export { BINDING_MODES };

export default {
  listPresets,
  getPreset,
  getCurrentPresetId,
  getCurrentPreset,
  setCurrentPresetId,
  createPreset,
  updatePreset,
  deletePreset,
  duplicatePreset,
  renamePreset,
  exportAll,
  importPresets,
  resetAll,
  BINDING_MODES
};
