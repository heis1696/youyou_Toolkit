/**
 * YouYou Toolkit - 填表模板服务
 * @description 管理 tableWorkbench 的全局结构模板库
 */

import { storage } from '../core/storage-service.js';
import {
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID,
  DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME,
  DEFAULT_TABLE_WORKBENCH_TABLES,
  validateTableDraftDeep
} from './table-schema-service.js';
import { cloneTableValue } from './table-types.js';

const templateStorage = storage.namespace('tableWorkbenchTemplates');
const TEMPLATE_LIST_KEY = 'templates';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function createTemplateId(prefix = 'template') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeTemplate(value = {}) {
  const tables = cloneTableValue(Array.isArray(value.tables) ? value.tables : []);
  const validation = validateTableDraftDeep({ tables });
  const id = normalizeString(value.id, createTemplateId());
  return {
    id,
    name: normalizeString(value.name, '未命名模板'),
    description: normalizeString(value.description, ''),
    tables: validation.tables || tables,
    promptTemplate: normalizeString(value.promptTemplate, ''),
    createdAt: normalizeString(value.createdAt, new Date().toISOString()),
    updatedAt: normalizeString(value.updatedAt, new Date().toISOString())
  };
}

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
  return { success: true };
}

export default {
  getBuiltinTableTemplates,
  getUserTableTemplates,
  getAllTableTemplates,
  getTableTemplate,
  saveTableTemplate,
  deleteTableTemplate
};
