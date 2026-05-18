/**
 * YouYou Toolkit - 填表模板服务
 *
 * 议题 #15 修订版（v1.0.169）：
 *   - 保留原有"全局模板库"职责（库 CRUD + import/export）
 *   - 新增"当前激活全局模板"概念
 *   - 新增三模式解析：inherit_global / chat_override / preset_link
 *   - 与 table-chat-scope-service / table-isolation-service 接合
 *
 * 全局模板库（旧 API，不动）：
 *   - getAllTableTemplates / getTableTemplate / saveTableTemplate / ...
 *
 * 当前激活全局模板（新）：
 *   storage `tableWorkbenchTemplates.activeId` = templateId
 *
 * 三模式解析（新）：
 *   resolveActiveTemplate({chatId?, isolationKey?}) → { template, mode, source }
 *     按 chat-scope-service 读 chat 级覆盖：
 *       null / inherit_global → 用全局 activeId 模板
 *       chat_override         → templateStr 反序列化
 *       preset_link           → presetName 查全局库
 */

import { storage } from '../core/storage-service.js';
import { logger } from '../core/logger-service.js';
import {
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID,
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME,
  DEFAULT_TABLE_WORKBENCH_TABLES,
  parseTableWorkbenchTemplate,
  validateTableDraftDeep
} from './table-schema-service.js';
import { cloneTableValue, TABLE_TEMPLATE_SCOPE_MODE } from './table-types.js';
import { tableChatScope } from './table-chat-scope-service.js';
import { tableIsolation } from './table-isolation-service.js';

const templateStorage = storage.namespace('tableWorkbenchTemplates');
const TEMPLATE_LIST_KEY = 'templates';
const ACTIVE_TEMPLATE_ID_KEY = 'activeId';

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TableTemplate');
  return _log;
}

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function createTemplateId(prefix = 'template') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeTemplate(value = {}) {
  // 议题 #15 Bug #33 修复：兼容多种导入格式
  //   - youyou 原生：{ name, tables: [...] }
  //   - shujuku 导出：{ mate:{type:'chatSheets'}, sheet_0:{...}, sheet_1:{...} }
  //   - shujuku 包装：{ tables: { sheet_0:{...} } } 之类的嵌套
  let tables;
  if (Array.isArray(value?.tables)) {
    tables = cloneTableValue(value.tables);
  } else if (value?.tables && typeof value.tables === 'object') {
    // value.tables 是对象 → 走 shujuku {sheet_xxx} 解析
    tables = parseTableWorkbenchTemplate(value.tables);
    if (!Array.isArray(tables) || tables.length === 0) {
      getLog().warn('normalizeTemplate: value.tables 对象但解析为空', { keys: Object.keys(value.tables || {}).slice(0, 10) });
    }
  } else if (value && typeof value === 'object' && Object.keys(value).some((k) => k.startsWith('sheet_'))) {
    // 整个 value 就是 shujuku 模板根对象（导入文件常见）
    tables = parseTableWorkbenchTemplate(value);
    if (!Array.isArray(tables) || tables.length === 0) {
      getLog().warn('normalizeTemplate: 检测到 shujuku 根对象但解析为空', { sheetKeys: Object.keys(value).filter((k) => k.startsWith('sheet_')).slice(0, 10) });
    } else {
      getLog().info('normalizeTemplate: 识别为 shujuku 格式', { sheetCount: tables.length });
    }
  } else {
    tables = [];
  }
  const validation = validateTableDraftDeep({ tables });
  const id = normalizeString(value?.id, createTemplateId());
  return {
    id,
    name: normalizeString(value?.name, '未命名模板'),
    description: normalizeString(value?.description, ''),
    tables: validation.tables || tables,
    promptTemplate: normalizeString(value?.promptTemplate, ''),
    createdAt: normalizeString(value?.createdAt, new Date().toISOString()),
    updatedAt: normalizeString(value?.updatedAt, new Date().toISOString())
  };
}

// ════════════════════════════════════════════════════════════════
// 全局模板库（旧 API，签名不动）
// ════════════════════════════════════════════════════════════════

export function getBuiltinTableTemplates() {
  return [normalizeTemplate({
    id: DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID,
    name: DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME,
    description: '包含全局数据、主角、重要角色、技能、背包、任务、纪要和选项表。',
    tables: cloneTableValue(DEFAULT_TABLE_WORKBENCH_TABLES)
  })];
}

export function getUserTableTemplates() {
  const stored = templateStorage.get(TEMPLATE_LIST_KEY, []);
  return Array.isArray(stored) ? stored.map(normalizeTemplate) : [];
}

export function getAllTableTemplates() {
  const builtin = getBuiltinTableTemplates();
  const user = getUserTableTemplates();
  const ids = new Set(builtin.map(template => template.id));
  return [...builtin, ...user.filter(template => !ids.has(template.id))];
}

export function getTableTemplate(templateId) {
  const id = normalizeString(templateId, '');
  return getAllTableTemplates().find(template => template.id === id) || null;
}

export function saveTableTemplate(templateInput = {}) {
  const now = new Date().toISOString();
  const template = normalizeTemplate({
    ...templateInput,
    id: normalizeString(templateInput.id, createTemplateId()),
    updatedAt: now,
    createdAt: normalizeString(templateInput.createdAt, now)
  });
  const userTemplates = getUserTableTemplates();
  const nextTemplates = userTemplates.filter(item => item.id !== template.id);
  nextTemplates.push(template);
  templateStorage.set(TEMPLATE_LIST_KEY, nextTemplates);
  return { success: true, template };
}

export function deleteTableTemplate(templateId) {
  const id = normalizeString(templateId, '');
  if (!id || id === DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID) {
    return { success: false, error: '内置模板不能删除。' };
  }
  const nextTemplates = getUserTableTemplates().filter(template => template.id !== id);
  templateStorage.set(TEMPLATE_LIST_KEY, nextTemplates);
  // 删除的若是当前激活模板，回退到默认
  if (getActiveGlobalTemplateId() === id) {
    setActiveGlobalTemplateId(DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID);
  }
  return { success: true };
}

export function renameTableTemplate(templateId, newName) {
  const id = normalizeString(templateId, '');
  if (!id || id === DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID) {
    return { success: false, error: '内置模板不能重命名。' };
  }
  const name = normalizeString(newName, '');
  if (!name) return { success: false, error: '名称不能为空。' };
  const existing = getTableTemplate(id);
  if (!existing) return { success: false, error: '模板不存在。' };
  return saveTableTemplate({ ...existing, name });
}

export function exportUserTemplates() {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    templates: getUserTableTemplates()
  };
}

export function importTemplates(payload, { overwrite = false } = {}) {
  let rawList;
  if (Array.isArray(payload)) {
    rawList = payload;
  } else if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.templates)) rawList = payload.templates;
    else if (payload.template && typeof payload.template === 'object') rawList = [payload.template];
    else rawList = [payload];
  } else {
    return { success: false, imported: 0, skipped: 0, errors: ['无效的导入数据格式。'] };
  }
  getLog().info('importTemplates 开始', { rawListCount: rawList.length, overwrite });
  const existingIds = new Set(getUserTableTemplates().map(t => t.id));
  let imported = 0, skipped = 0;
  const errors = [];
  for (const raw of rawList) {
    try {
      const template = normalizeTemplate(raw);
      getLog().info('importTemplates 单条', {
        id: template.id,
        name: template.name,
        tableCount: Array.isArray(template.tables) ? template.tables.length : 0,
        firstTableName: template.tables?.[0]?.name || ''
      });
      if (!overwrite && existingIds.has(template.id)) { skipped++; continue; }
      saveTableTemplate(template);
      existingIds.add(template.id);
      imported++;
    } catch (e) {
      errors.push(normalizeString(e?.message, '未知错误'));
      getLog().error('importTemplates 单条失败', e);
    }
  }
  getLog().info('importTemplates 完成', { imported, skipped, errorCount: errors.length });
  return { success: true, imported, skipped, errors };
}

// ════════════════════════════════════════════════════════════════
// 当前激活全局模板（议题 #15 新增）
// ════════════════════════════════════════════════════════════════

/**
 * 读取当前激活的全局模板 ID
 * 若未设置则返回 DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID
 */
export function getActiveGlobalTemplateId() {
  const stored = templateStorage.get(ACTIVE_TEMPLATE_ID_KEY, '');
  const id = normalizeString(stored, DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID);
  // 校验该 ID 仍存在；不存在则回退到默认
  const template = getTableTemplate(id);
  return template ? id : DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID;
}

/**
 * 设置当前激活全局模板
 */
export function setActiveGlobalTemplateId(templateId) {
  const id = normalizeString(templateId, DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID);
  templateStorage.set(ACTIVE_TEMPLATE_ID_KEY, id);
  getLog().info('全局激活模板已切换', { templateId: id });
  return id;
}

/**
 * 读取当前激活的全局模板对象（保证返回非空）
 */
export function getActiveGlobalTemplate() {
  const id = getActiveGlobalTemplateId();
  return getTableTemplate(id) || getBuiltinTableTemplates()[0];
}

// ════════════════════════════════════════════════════════════════
// 模板三模式解析（议题 #15 §A D3）
// ════════════════════════════════════════════════════════════════

/**
 * 把模板对象序列化为字符串（chat_override 模式用）
 */
function templateToString(template) {
  try {
    return JSON.stringify(template);
  } catch (err) {
    getLog().error('templateToString 失败', err);
    return '';
  }
}

/**
 * 从字符串反序列化为模板对象
 */
function templateFromString(str) {
  if (!str || typeof str !== 'string') return null;
  try {
    const parsed = JSON.parse(str);
    return normalizeTemplate(parsed);
  } catch (err) {
    getLog().warn('templateFromString 反序列化失败', err);
    return null;
  }
}

/**
 * 解析当前生效的模板（按 chat × isolationKey × scope-mode 三模式）
 *
 * @param {Object} [opts]
 * @param {string} [opts.chatId]
 * @param {string} [opts.isolationKey]
 * @returns {{
 *   template: Object,
 *   mode: string,
 *   source: { templateId?: string, presetName?: string, fromArchive?: boolean }
 * }}
 */
export function resolveActiveTemplate({ chatId, isolationKey } = {}) {
  const iso = isolationKey === undefined ? tableIsolation.getKey() : isolationKey;
  const scopeState = tableChatScope.getTemplateScope(iso, chatId);

  // 没有 chat 级 scope state → inherit_global
  if (!scopeState || scopeState.mode === TABLE_TEMPLATE_SCOPE_MODE.INHERIT_GLOBAL) {
    const template = getActiveGlobalTemplate();
    getLog().info('resolveActiveTemplate: inherit_global', {
      chatId, isolationKey: iso,
      templateId: template?.id || '',
      templateName: template?.name || '',
      tableCount: Array.isArray(template?.tables) ? template.tables.length : 0,
      firstTableName: template?.tables?.[0]?.name || ''
    });
    return {
      template,
      mode: TABLE_TEMPLATE_SCOPE_MODE.INHERIT_GLOBAL,
      source: { templateId: template?.id || '' }
    };
  }

  // chat_override → templateStr 反序列化
  if (scopeState.mode === TABLE_TEMPLATE_SCOPE_MODE.CHAT_OVERRIDE) {
    const template = templateFromString(scopeState.templateStr);
    if (template) {
      return {
        template,
        mode: TABLE_TEMPLATE_SCOPE_MODE.CHAT_OVERRIDE,
        source: {}
      };
    }
    // 反序列化失败 → 降级到 inherit_global
    getLog().warn('chat_override templateStr 反序列化失败，降级到 inherit_global');
    const fallback = getActiveGlobalTemplate();
    return {
      template: fallback,
      mode: TABLE_TEMPLATE_SCOPE_MODE.INHERIT_GLOBAL,
      source: { templateId: fallback?.id || '', fallback: true }
    };
  }

  // preset_link → 查全局库
  if (scopeState.mode === TABLE_TEMPLATE_SCOPE_MODE.PRESET_LINK) {
    const presetName = scopeState.presetName || '';
    // preset_link 用 presetName 索引全局库（shujuku 风格用 name 而非 id）
    const all = getAllTableTemplates();
    const found = all.find((t) => t.name === presetName) || all.find((t) => t.id === presetName);
    if (found) {
      return {
        template: found,
        mode: TABLE_TEMPLATE_SCOPE_MODE.PRESET_LINK,
        source: { presetName, templateId: found.id }
      };
    }
    // preset 已删除 → 降级
    getLog().warn('preset_link 指向的全局预设不存在，降级到 inherit_global', { presetName });
    const fallback = getActiveGlobalTemplate();
    return {
      template: fallback,
      mode: TABLE_TEMPLATE_SCOPE_MODE.INHERIT_GLOBAL,
      source: { templateId: fallback?.id || '', presetName, fallback: true }
    };
  }

  // 未知 mode → inherit_global
  const fallback = getActiveGlobalTemplate();
  return {
    template: fallback,
    mode: TABLE_TEMPLATE_SCOPE_MODE.INHERIT_GLOBAL,
    source: { templateId: fallback?.id || '', unknownMode: scopeState.mode }
  };
}

// ════════════════════════════════════════════════════════════════
// chat 级操作（议题 #15 新增）
// ════════════════════════════════════════════════════════════════

/**
 * 把一个模板存为 chat 局部 override
 * 归档当前状态（如果有）后再覆盖
 *
 * @param {Object} template - 完整模板对象
 * @param {Object} [opts] - { chatId?, isolationKey?, source? }
 */
export function applyTemplateAsChatOverride(template, opts = {}) {
  if (!template || typeof template !== 'object') {
    return { success: false, error: '模板不能为空' };
  }
  const normalized = normalizeTemplate(template);
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;

  // 先归档当前（若有）
  tableChatScope.archiveCurrentTemplate(iso, opts.chatId);

  const result = tableChatScope.setTemplateScope({
    mode: TABLE_TEMPLATE_SCOPE_MODE.CHAT_OVERRIDE,
    templateStr: templateToString(normalized),
    source: opts.source || 'ui'
  }, iso, opts.chatId);

  getLog().info('applyTemplateAsChatOverride', { chatId: opts.chatId, isolationKey: iso, templateName: normalized.name });
  return { success: true, scopeState: result };
}

/**
 * 把当前 chat 链接到一个全局预设
 *
 * @param {string} presetNameOrId - 全局预设名或 ID
 * @param {Object} [opts] - { chatId?, isolationKey?, source? }
 */
export function linkPresetToChat(presetNameOrId, opts = {}) {
  const presetName = normalizeString(presetNameOrId, '');
  if (!presetName) return { success: false, error: 'presetName 不能为空' };

  // 校验预设存在
  const all = getAllTableTemplates();
  const found = all.find((t) => t.name === presetName) || all.find((t) => t.id === presetName);
  if (!found) return { success: false, error: '找不到指定的全局预设' };

  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;

  // 先归档当前（若有）
  tableChatScope.archiveCurrentTemplate(iso, opts.chatId);

  const result = tableChatScope.setTemplateScope({
    mode: TABLE_TEMPLATE_SCOPE_MODE.PRESET_LINK,
    presetName: found.name,  // 用 name 索引（shujuku 风格）
    source: opts.source || 'ui'
  }, iso, opts.chatId);

  getLog().info('linkPresetToChat', { chatId: opts.chatId, isolationKey: iso, presetName: found.name });
  return { success: true, scopeState: result };
}

/**
 * 重置当前 chat × isolationKey 的模板作用域（回到 inherit_global）
 *
 * @param {Object} [opts] - { chatId?, isolationKey?, archive?: 是否先归档当前 }
 */
export function resetChatTemplateScope(opts = {}) {
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;
  if (opts.archive !== false) {
    tableChatScope.archiveCurrentTemplate(iso, opts.chatId);
  }
  tableChatScope.clearTemplateScope(iso, opts.chatId);
  getLog().info('resetChatTemplateScope', { chatId: opts.chatId, isolationKey: iso });
  return { success: true };
}

/**
 * 列出当前 chat × isolationKey 的模板归档
 * （转发给 chat-scope-service 便于上层统一调用）
 */
export function listChatTemplateArchives(opts = {}) {
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;
  return tableChatScope.listTemplateArchives(iso, opts.chatId);
}

/**
 * 从归档恢复模板状态
 */
export function restoreChatTemplateArchive(index, opts = {}) {
  const iso = opts.isolationKey === undefined ? tableIsolation.getKey() : opts.isolationKey;
  const restored = tableChatScope.restoreTemplateArchive(index, iso, opts.chatId);
  return restored ? { success: true, scopeState: restored } : { success: false, error: '归档不存在' };
}

// ════════════════════════════════════════════════════════════════
// Default export — 保留旧 API + 加入新 API
// ════════════════════════════════════════════════════════════════

export default {
  // 全局模板库（旧）
  getBuiltinTableTemplates,
  getUserTableTemplates,
  getAllTableTemplates,
  getTableTemplate,
  saveTableTemplate,
  deleteTableTemplate,
  renameTableTemplate,
  exportUserTemplates,
  importTemplates,

  // 当前激活全局模板（新）
  getActiveGlobalTemplateId,
  setActiveGlobalTemplateId,
  getActiveGlobalTemplate,

  // 三模式解析（新）
  resolveActiveTemplate,

  // chat 级操作（新）
  applyTemplateAsChatOverride,
  linkPresetToChat,
  resetChatTemplateScope,
  listChatTemplateArchives,
  restoreChatTemplateArchive
};
