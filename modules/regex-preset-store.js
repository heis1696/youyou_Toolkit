/**
 * YouYou Toolkit - 正则提取预设存储
 *
 * 详见 docs/PHASE3_ARCHITECTURE.md §2（正则提取改为完整预设管理器）+ §12（预设面板合并）。
 *
 * 数据结构：
 * {
 *   id: 'rgx_<ts>_<rand>',
 *   name: string,
 *   description: string,
 *   rules: [
 *     { id, name, description, type, value, enabled }
 *   ],
 *   blacklist: string[],
 *   createdAt: number,
 *   updatedAt: number
 * }
 *
 * 规则类型 (type):
 *   - 'include'        提取指定标签内容（value = 标签名）
 *   - 'exclude'        排除指定标签块（value = 标签名）
 *   - 'regex_include'  正则提取（value = 正则）
 *   - 'regex_exclude'  正则排除（value = 正则）
 *
 * 存储位置：presetStorage namespace
 *   - key 'regex_presets'         → { [id]: preset }
 *   - key 'regex_current_preset'  → string (id)
 *
 * 与 modules/regex-extractor.js 的协同：
 *   - 切换 active preset 时调用 syncEnginePreset() 把 rules + blacklist
 *     灌到 regex-extractor 模块级状态，使现有 extractTagContent 调用路径无需改动。
 *   - 编辑当前 active preset 也会即时同步引擎。
 */

import { presetStorage, storage } from './core/storage-service.js';
import { eventBus, EVENTS } from './core/event-bus.js';
import { logger } from './core/logger-service.js';

const log = logger.createScope('RegexPresetStore');

const STORAGE_KEY = 'regex_presets';
const CURRENT_KEY = 'regex_current_preset';
const LEGACY_SETTINGS_KEY = 'settings';
const MIGRATION_FLAG_KEY = 'regex_presets_migrated';

const RULE_TYPES = Object.freeze({
  INCLUDE: 'include',
  EXCLUDE: 'exclude',
  REGEX_INCLUDE: 'regex_include',
  REGEX_EXCLUDE: 'regex_exclude'
});

function genId() {
  return `rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function genRuleId() {
  return `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

function normalizeRule(input = {}) {
  const type = Object.values(RULE_TYPES).includes(input.type) ? input.type : RULE_TYPES.INCLUDE;
  return {
    id: String(input.id || genRuleId()),
    name: String(input.name || '').trim(),
    description: String(input.description || ''),
    type,
    value: String(input.value || ''),
    enabled: input.enabled !== false
  };
}

function normalizePreset(input = {}) {
  return {
    id: String(input.id || genId()),
    name: String(input.name || '').trim() || '未命名预设',
    description: String(input.description || ''),
    rules: Array.isArray(input.rules) ? input.rules.map(normalizeRule) : [],
    blacklist: Array.isArray(input.blacklist)
      ? input.blacklist.map((s) => String(s || '').trim()).filter(Boolean)
      : [],
    createdAt: Number.isFinite(input.createdAt) ? input.createdAt : Date.now(),
    updatedAt: Number.isFinite(input.updatedAt) ? input.updatedAt : Date.now()
  };
}

function _readAll() {
  const raw = presetStorage.get(STORAGE_KEY);
  if (!raw || typeof raw !== 'object') return {};
  return raw;
}

function _writeAll(map) {
  presetStorage.set(STORAGE_KEY, map);
}

let _migrationDone = false;

/**
 * 一次性迁移老数据：
 *   - settings.tagRulePresets 里的旧预设 → 新 store
 *   - settings.tagRules + settings.contentBlacklist 作为 "默认规则集" 兜底
 * 迁移完成后写入 settings.regex_presets_migrated 防止重复执行。
 */
function migrateIfNeeded() {
  if (_migrationDone) return;
  _migrationDone = true;

  const settings = storage.get(LEGACY_SETTINGS_KEY) || {};
  if (settings[MIGRATION_FLAG_KEY] === true) return;

  const existing = _readAll();
  const hasAny = Object.keys(existing).length > 0;

  let migrated = 0;
  const map = { ...existing };

  // 1. 老的 tagRulePresets
  const legacyPresets = settings.tagRulePresets || {};
  for (const legacy of Object.values(legacyPresets)) {
    const preset = normalizePreset({
      id: genId(),
      name: legacy.name || '已迁移预设',
      description: legacy.description || '',
      rules: legacy.rules || [],
      blacklist: legacy.blacklist || [],
      createdAt: typeof legacy.createdAt === 'string' ? Date.parse(legacy.createdAt) || Date.now() : Date.now(),
      updatedAt: Date.now()
    });
    map[preset.id] = preset;
    migrated += 1;
  }

  // 2. 老的"当前规则" → 兜底默认预设（仅当没有任何预设时）
  if (!hasAny && migrated === 0) {
    const currentRules = Array.isArray(settings.tagRules) ? settings.tagRules : [];
    const currentBlacklist = Array.isArray(settings.contentBlacklist) ? settings.contentBlacklist : [];
    if (currentRules.length || currentBlacklist.length) {
      const fallback = normalizePreset({
        name: '默认规则集（迁移）',
        description: '从老版本的当前规则迁移而来',
        rules: currentRules,
        blacklist: currentBlacklist
      });
      map[fallback.id] = fallback;
      presetStorage.set(CURRENT_KEY, fallback.id);
      migrated += 1;
    }
  }

  if (migrated > 0) {
    _writeAll(map);
    log.info(`已从老数据迁移 ${migrated} 个正则预设`);
  }

  storage.set(LEGACY_SETTINGS_KEY, { ...settings, [MIGRATION_FLAG_KEY]: true });
}

// ───── 公开接口 ─────

export function listPresets() {
  migrateIfNeeded();
  const map = _readAll();
  return Object.values(map)
    .map(normalizePreset)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getPreset(id) {
  if (!id) return null;
  migrateIfNeeded();
  const map = _readAll();
  return map[id] ? normalizePreset(map[id]) : null;
}

export function getCurrentPresetId() {
  migrateIfNeeded();
  const id = presetStorage.get(CURRENT_KEY);
  return typeof id === 'string' && id ? id : '';
}

export function getCurrentPreset() {
  const id = getCurrentPresetId();
  return id ? getPreset(id) : null;
}

export function setCurrentPresetId(id) {
  const map = _readAll();
  if (id && !map[id]) {
    log.warn(`setCurrentPresetId 找不到预设: ${id}`);
    return false;
  }
  presetStorage.set(CURRENT_KEY, id || '');
  syncEngineFromActive();
  eventBus.emit(EVENTS.PRESET_ACTIVATED, { kind: 'regex', id });
  return true;
}

export function createPreset(partial = {}) {
  migrateIfNeeded();
  const preset = normalizePreset({
    ...partial,
    id: genId(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  const map = _readAll();
  map[preset.id] = preset;
  _writeAll(map);
  eventBus.emit(EVENTS.PRESET_CREATED, { kind: 'regex', id: preset.id });
  log.info(`创建预设: ${preset.id} (${preset.name})`);
  return preset;
}

export function updatePreset(id, patch = {}) {
  if (!id) return null;
  const map = _readAll();
  const existing = map[id];
  if (!existing) return null;
  const merged = normalizePreset({
    ...existing,
    ...patch,
    id,
    createdAt: existing.createdAt,
    updatedAt: Date.now()
  });
  map[id] = merged;
  _writeAll(map);
  // 如果是当前 active，同步到引擎
  if (getCurrentPresetId() === id) {
    syncEngineFromPreset(merged);
  }
  eventBus.emit(EVENTS.PRESET_UPDATED, { kind: 'regex', id });
  return merged;
}

export function deletePreset(id) {
  if (!id) return false;
  const map = _readAll();
  if (!map[id]) return false;
  delete map[id];
  _writeAll(map);
  if (getCurrentPresetId() === id) {
    presetStorage.set(CURRENT_KEY, '');
    syncEngineFromActive();
  }
  eventBus.emit(EVENTS.PRESET_DELETED, { kind: 'regex', id });
  log.info(`删除预设: ${id}`);
  return true;
}

export function duplicatePreset(id, { nameSuffix = ' 副本' } = {}) {
  const source = getPreset(id);
  if (!source) return null;
  return createPreset({
    ...source,
    name: `${source.name}${nameSuffix}`
  });
}

export function renamePreset(id, newName) {
  return updatePreset(id, { name: String(newName || '').trim() || '未命名预设' });
}

// ───── 规则级操作 ─────

export function addRule(presetId, ruleInput = {}) {
  const preset = getPreset(presetId);
  if (!preset) return null;
  const rule = normalizeRule({
    ...ruleInput,
    id: genRuleId()
  });
  const rules = [...preset.rules, rule];
  return updatePreset(presetId, { rules });
}

export function updateRule(presetId, ruleId, patch = {}) {
  const preset = getPreset(presetId);
  if (!preset) return null;
  const rules = preset.rules.map((r) => r.id === ruleId ? normalizeRule({ ...r, ...patch, id: r.id }) : r);
  return updatePreset(presetId, { rules });
}

export function deleteRule(presetId, ruleId) {
  const preset = getPreset(presetId);
  if (!preset) return null;
  const rules = preset.rules.filter((r) => r.id !== ruleId);
  return updatePreset(presetId, { rules });
}

export function moveRule(presetId, ruleId, direction) {
  const preset = getPreset(presetId);
  if (!preset) return null;
  const idx = preset.rules.findIndex((r) => r.id === ruleId);
  if (idx < 0) return null;
  const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= preset.rules.length) return null;
  const rules = [...preset.rules];
  [rules[idx], rules[targetIdx]] = [rules[targetIdx], rules[idx]];
  return updatePreset(presetId, { rules });
}

// ───── 黑名单 ─────

export function setBlacklist(presetId, blacklist) {
  const normalized = Array.isArray(blacklist)
    ? blacklist.map((s) => String(s || '').trim()).filter(Boolean)
    : [];
  return updatePreset(presetId, { blacklist: Array.from(new Set(normalized)) });
}

// ───── 导入 / 导出 ─────

export function exportAll() {
  migrateIfNeeded();
  return {
    version: 1,
    exportedAt: Date.now(),
    presets: Object.values(_readAll()).map(normalizePreset)
  };
}

export function importPresets(payload) {
  migrateIfNeeded();
  if (!payload || typeof payload !== 'object') return { added: 0 };
  const list = Array.isArray(payload.presets) ? payload.presets : [];
  const map = _readAll();
  let added = 0;
  for (const item of list) {
    const normalized = normalizePreset({
      ...item,
      id: genId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    map[normalized.id] = normalized;
    added += 1;
  }
  if (added > 0) {
    _writeAll(map);
    eventBus.emit(EVENTS.PRESET_IMPORTED, { kind: 'regex', count: added });
  }
  return { added };
}

export function resetAll() {
  presetStorage.set(STORAGE_KEY, {});
  presetStorage.set(CURRENT_KEY, '');
  syncEngineFromActive();
  log.info('已清空所有正则预设');
}

// ───── 与 regex-extractor 引擎同步 ─────

/**
 * 把指定 preset 的 rules + blacklist 灌入 regex-extractor 模块级状态，
 * 使现有 extractTagContent 调用路径自动使用最新规则。
 *
 * 通过动态 import 避免循环依赖。
 */
async function syncEngineFromPreset(preset) {
  if (!preset) return;
  try {
    const engine = await import('./regex-extractor.js');
    if (typeof engine.setCurrentRules === 'function') {
      engine.setCurrentRules(JSON.parse(JSON.stringify(preset.rules || [])));
    }
    if (typeof engine.setContentBlacklist === 'function') {
      engine.setContentBlacklist(JSON.parse(JSON.stringify(preset.blacklist || [])));
    }
  } catch (error) {
    log.warn('同步到 regex-extractor 失败', { error });
  }
}

function syncEngineFromActive() {
  const active = getCurrentPreset();
  if (active) {
    return syncEngineFromPreset(active);
  }
  // 没有 active 预设：清空引擎状态
  return syncEngineFromPreset({ rules: [], blacklist: [] });
}

/**
 * 工具引用查询：返回引用了指定 preset 的工具 id 列表。
 * 通过动态 import 避免循环依赖（tool-manager / tool-registry 反查 regexPresetId 字段）。
 */
export async function findLinkedTools(presetId) {
  if (!presetId) return [];
  try {
    const reg = await import('./tool-registry.js');
    const list = (typeof reg.getToolList === 'function') ? reg.getToolList(false) : [];
    return list
      .filter((tool) => {
        const full = typeof reg.getToolFullConfig === 'function' ? reg.getToolFullConfig(tool.id) : null;
        return full?.extraction?.regexPresetId === presetId;
      })
      .map((t) => t.id);
  } catch (_) {
    return [];
  }
}

export { RULE_TYPES };

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
  addRule,
  updateRule,
  deleteRule,
  moveRule,
  setBlacklist,
  exportAll,
  importPresets,
  resetAll,
  findLinkedTools,
  RULE_TYPES
};
