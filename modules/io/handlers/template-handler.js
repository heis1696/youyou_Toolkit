/**
 * YouYou Toolkit - Template IO Handler
 *
 * 模板模块的导入导出 handler。
 * parse: 解包批量格式 → 逐条走 formatAdapters 探测 + 解析
 * applyImport: 调用 table-template-service 持久化
 * serialize: 调用 table-template-service 导出
 */

import { logger } from '../../core/logger-service.js';
import { youyouImporter } from '../../table-engine/template-adapters/youyou-importer.js';
import { shujukuImporter } from '../../table-engine/template-adapters/shujuku-importer.js';
import {
  getUserTableTemplates,
  saveTableTemplate,
  exportUserTemplates
} from '../../table-engine/table-template-service.js';

const log = logger.createScope('TemplateIO');

const FORMAT_ADAPTERS = [youyouImporter, shujukuImporter];

function unwrapToItems(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object') {
    if (Array.isArray(raw.templates)) return raw.templates;
    if (raw.template && typeof raw.template === 'object') return [raw.template];
    return [raw];
  }
  return [];
}

function detectAndParseItem(item) {
  for (const adapter of FORMAT_ADAPTERS) {
    try {
      if (adapter.detect(item)) {
        const parsed = adapter.parse(item);
        if (parsed) {
          log.info('格式探测命中', {
            formatId: adapter.formatId,
            templateName: parsed.name || '',
            tableCount: Array.isArray(parsed.tables) ? parsed.tables.length : 0
          });
          return { ...parsed, _formatId: adapter.formatId };
        }
      }
    } catch (err) {
      log.warn(`adapter ${adapter.formatId} failed`, { err: err?.message });
    }
  }
  log.warn('格式探测未命中', { keys: item && typeof item === 'object' ? Object.keys(item).slice(0, 6) : [] });
  return null;
}

export const templateHandler = {
  kind: 'template',
  displayName: '模板',
  supportsOverwrite: true,
  formatAdapters: FORMAT_ADAPTERS,

  parse(raw) {
    const items = unwrapToItems(raw);
    const parsed = [];
    for (const item of items) {
      const result = detectAndParseItem(item);
      if (result) parsed.push(result);
    }
    return parsed.length > 0 ? parsed : null;
  },

  applyImport(parsed, { overwrite = false } = {}) {
    if (!parsed?.length) return { imported: 0, skipped: 0, errors: [] };
    const existingIds = new Set(getUserTableTemplates().map(t => t.id));
    let imported = 0, skipped = 0;
    const errors = [];
    for (const item of parsed) {
      try {
        const id = item.id || `template_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
        if (!overwrite && existingIds.has(id)) { skipped++; continue; }
        saveTableTemplate({
          ...item,
          id,
          name: item.name || '未命名模板',
          description: item.description || '',
          promptTemplate: item.promptTemplate || '',
          tables: item.tables || []
        });
        existingIds.add(id);
        imported++;
      } catch (err) {
        errors.push(err?.message || '未知错误');
        log.error('applyImport item failed', { err });
      }
    }
    return { imported, skipped, errors };
  },

  serialize() {
    return exportUserTemplates();
  }
};
