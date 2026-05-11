/**
 * YouYou Toolkit - 填表世界书同步服务
 * @description 将填表结果同步为世界书条目，使主对话 AI 能读到最新表数据
 */

import { getTopWindow } from '../tool-execution-context.js';
import { logger } from '../core/logger-service.js';

const log = logger.createScope('TableWorldbookSync');

const ENTRY_COMMENT_PREFIX = 'YYT-填表数据';

function getTavernHelper() {
  try {
    if (typeof TavernHelper !== 'undefined' && TavernHelper) return TavernHelper;
  } catch (_) {}
  const topWindow = getTopWindow();
  return topWindow?.TavernHelper || null;
}

function formatTablesAsReadableText(tables) {
  if (!Array.isArray(tables) || tables.length === 0) return '';
  const sections = [];
  for (const table of tables) {
    if (!table || table.enabled === false) continue;
    const name = table.name || '未命名表';
    const cols = Array.isArray(table.columns) ? table.columns : [];
    const rows = Array.isArray(table.rows) ? table.rows : [];
    if (rows.length === 0) continue;
    const colKeys = cols.map(c => c.key);
    const colTitles = cols.map(c => c.title || c.key);
    const header = `| ${colTitles.join(' | ')} |`;
    const separator = `| ${colTitles.map(() => '---').join(' | ')} |`;
    const dataRows = rows.map(row => {
      const cells = row.cells || {};
      return `| ${colKeys.map(k => String(cells[k] ?? '').replace(/\|/g, '｜').replace(/\n/g, ' ')).join(' | ')} |`;
    });
    sections.push(`### ${name}\n${header}\n${separator}\n${dataRows.join('\n')}`);
  }
  return sections.join('\n\n');
}

function mergeTablesWithSchema(runtimeTables, configTables) {
  if (!Array.isArray(runtimeTables) || runtimeTables.length === 0) return configTables || [];
  if (!Array.isArray(configTables) || configTables.length === 0) return runtimeTables;

  return configTables.map((schema, index) => {
    const runtime = runtimeTables[index];
    if (!runtime) return schema;
    return {
      ...schema,
      name: schema.name || runtime.name || '',
      columns: Array.isArray(schema.columns) && schema.columns.length > 0
        ? schema.columns
        : (Array.isArray(runtime.columns) ? runtime.columns : []),
      rows: Array.isArray(runtime.rows) ? runtime.rows : (Array.isArray(schema.rows) ? schema.rows : []),
      enabled: runtime.enabled !== undefined ? runtime.enabled : schema.enabled
    };
  });
}

export async function syncTablesToWorldbook(tables, config) {
  const syncConfig = config?.worldbookSync;
  if (!syncConfig?.enabled) return { skipped: true, reason: 'disabled' };

  const targetBook = String(syncConfig.targetBook || '').trim();
  if (!targetBook) return { skipped: true, reason: 'no_target_book' };

  const helper = getTavernHelper();
  if (!helper) return { success: false, error: 'TavernHelper 不可用' };
  if (typeof helper.getLorebookEntries !== 'function') return { success: false, error: 'getLorebookEntries 不可用' };
  if (typeof helper.setLorebookEntries !== 'function' && typeof helper.createLorebookEntries !== 'function') {
    return { success: false, error: '世界书写入 API 不可用' };
  }

  const entryComment = String(syncConfig.entryComment || ENTRY_COMMENT_PREFIX).trim();
  const mergedTables = mergeTablesWithSchema(tables, Array.isArray(config?.tables) ? config.tables : []);
  const content = formatTablesAsReadableText(mergedTables);
  if (!content) return { skipped: true, reason: 'empty_tables' };

  try {
    const entries = await Promise.resolve(helper.getLorebookEntries(targetBook));
    const existing = Array.isArray(entries) ? entries.find(e => e.comment === entryComment) : null;

    if (existing && existing.uid) {
      await Promise.resolve(helper.setLorebookEntries(targetBook, [{
        uid: existing.uid,
        comment: entryComment,
        content,
        enabled: true,
        type: 'constant',
        position: 'before_character_definition',
        order: 100,
        prevent_recursion: true
      }]));
      log.info(`世界书条目已更新：${entryComment} → ${targetBook}`);
      return { success: true, action: 'updated', entryComment, targetBook };
    }

    if (typeof helper.createLorebookEntries === 'function') {
      await Promise.resolve(helper.createLorebookEntries(targetBook, [{
        comment: entryComment,
        content,
        keys: [],
        enabled: true,
        type: 'constant',
        position: 'before_character_definition',
        order: 100,
        prevent_recursion: true
      }]));
      log.info(`世界书条目已创建：${entryComment} → ${targetBook}`);
      return { success: true, action: 'created', entryComment, targetBook };
    }

    return { success: false, error: 'createLorebookEntries 不可用' };
  } catch (error) {
    log.warn('世界书同步失败:', error);
    return { success: false, error: error?.message || '世界书同步失败' };
  }
}

export default { syncTablesToWorldbook, mergeTablesWithSchema };
