/**
 * YouYou Toolkit - 填表世界书同步服务
 * @description 将填表结果同步为多条世界书条目：Wrapper 包裹 + 每表独立条目 + Order 分配
 */

import { getTopWindow } from '../tool-execution-context.js';
import { logger } from '../core/logger-service.js';
import { buildUsedOrderSet, allocOrder, allocConsecutiveOrderBlock } from './table-worldbook-order-service.js';
import { normalizePosition, applyPlacementToEntry } from './table-worldbook-placement-service.js';

const log = logger.createScope('TableWorldbookSync');

const COMMENT_PREFIX = 'YYT-';

function getTavernHelper() {
  try {
    if (typeof TavernHelper !== 'undefined' && TavernHelper) return TavernHelper;
  } catch (_) {}
  const topWindow = getTopWindow();
  return topWindow?.TavernHelper || null;
}

function esc(text) {
  return String(text ?? '').replace(/\|/g, '｜').replace(/\n/g, ' ');
}

function formatTableMarkdown(table) {
  const cols = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];
  if (rows.length === 0) return '';
  const colKeys = cols.map(c => c.key);
  const colTitles = cols.map(c => c.title || c.key);
  const header = `| ${colTitles.join(' | ')} |`;
  const separator = `| ${colTitles.map(() => '---').join(' | ')} |`;
  const dataRows = rows.map(row => {
    const cells = row.cells || {};
    return `| ${colKeys.map(k => esc(cells[k])).join(' | ')} |`;
  });
  return `# ${table.name || '未命名表'}\n\n${header}\n${separator}\n${dataRows.join('\n')}`;
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
      enabled: runtime.enabled !== undefined ? runtime.enabled : schema.enabled,
      exportConfig: schema.exportConfig || runtime.exportConfig || { enabled: false }
    };
  });
}

function buildEntryComment(tableName) {
  const name = String(tableName || '').trim();
  return name ? `${COMMENT_PREFIX}${name}` : `${COMMENT_PREFIX}填表数据`;
}

function buildWrapperComment(tag, suffix) {
  return `${COMMENT_PREFIX}Wrapper-${suffix}`;
}

function needsUpdate(existing, desired) {
  if (!existing) return true;
  return existing.content !== desired.content
    || existing.enabled !== desired.enabled
    || existing.type !== desired.type
    || existing.position !== desired.position
    || existing.prevent_recursion !== desired.prevent_recursion
    || existing.order !== desired.order;
}

async function upsertEntry(helper, targetBook, entries, comment, entryData, usedOrders) {
  const existing = entries.find(e => e.comment === comment);

  if (existing && existing.uid) {
    if (!needsUpdate(existing, entryData)) {
      usedOrders.add(existing.order || 0);
      return { action: 'skipped', comment };
    }
    await Promise.resolve(helper.setLorebookEntries(targetBook, [{
      uid: existing.uid,
      ...entryData
    }]));
    log.info(`世界书条目已更新：${comment}`);
    return { action: 'updated', comment };
  }

  if (typeof helper.createLorebookEntries === 'function') {
    await Promise.resolve(helper.createLorebookEntries(targetBook, [{
      comment,
      keys: [],
      ...entryData
    }]));
    log.info(`世界书条目已创建：${comment}`);
    return { action: 'created', comment };
  }

  return { action: 'failed', comment, error: 'createLorebookEntries 不可用' };
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

  const configTables = Array.isArray(config?.tables) ? config.tables : [];
  const mergedTables = mergeTablesWithSchema(tables, configTables);
  const tablesWithData = mergedTables.filter(t => t && t.enabled !== false && Array.isArray(t.rows) && t.rows.length > 0);
  if (tablesWithData.length === 0) return { skipped: true, reason: 'empty_tables' };

  const wrapperConfig = config?.wrapperConfig || {};
  const wrapperEnabled = wrapperConfig.enabled !== false;

  try {
    let entries = await Promise.resolve(helper.getLorebookEntries(targetBook));
    if (!Array.isArray(entries)) entries = [];
    const usedOrders = buildUsedOrderSet(entries);

    const results = [];

    // Determine which tables have custom export enabled
    const customTables = tablesWithData.filter(t => t.exportConfig?.enabled === true);
    const globalTables = tablesWithData.filter(t => t.exportConfig?.enabled !== true);

    // 1. Wrapper block (3-depth consecutive: Start + GlobalReadable + End)
    let globalReadableContent = '';
    if (globalTables.length > 0) {
      globalReadableContent = globalTables.map(t => formatTableMarkdown(t)).join('\n\n');
    }

    if (wrapperEnabled && (globalReadableContent || customTables.length > 0)) {
      const wrapperTag = wrapperConfig.wrapperTag || '最新数据与记录';
      const wrapperHint = wrapperConfig.wrapperHint || '';
      const wrapperPlacement = wrapperConfig.wrapperPlacement || {};
      const preferredOrder = wrapperPlacement.order || 50000;

      const blockBase = allocConsecutiveOrderBlock(usedOrders, 3, preferredOrder, 1, 99999);
      const wrapperPos = normalizePosition(wrapperPlacement.position, 'before_character_definition');
      const wrapperDepth = Number.isFinite(wrapperPlacement.depth) ? wrapperPlacement.depth : 2;

      // WrapperStart
      const startContent = `<${wrapperTag}>\n${wrapperHint}`;
      results.push(await upsertEntry(helper, targetBook, entries,
        buildWrapperComment(wrapperTag, 'Start'),
        applyPlacementToEntry({
          content: startContent,
          enabled: true,
          type: 'constant',
          order: blockBase,
          prevent_recursion: true
        }, { position: wrapperPos, depth: wrapperDepth })
      , usedOrders));

      // Global Readable (only if there are tables without custom export)
      if (globalReadableContent) {
        results.push(await upsertEntry(helper, targetBook, entries,
          `${COMMENT_PREFIX}全局数据`,
          applyPlacementToEntry({
            content: globalReadableContent,
            enabled: true,
            type: 'constant',
            order: blockBase + 1,
            prevent_recursion: true
          }, { position: wrapperPos, depth: wrapperDepth })
        , usedOrders));
      }

      // WrapperEnd
      results.push(await upsertEntry(helper, targetBook, entries,
        buildWrapperComment(wrapperTag, 'End'),
        applyPlacementToEntry({
          content: `</${wrapperTag}>`,
          enabled: true,
          type: 'constant',
          order: blockBase + 2,
          prevent_recursion: true
        }, { position: wrapperPos, depth: wrapperDepth })
      , usedOrders));

    } else if (globalReadableContent) {
      // No wrapper — write a single global entry
      const order = allocOrder(usedOrders, 50000, 1, 99999);
      results.push(await upsertEntry(helper, targetBook, entries,
        `${COMMENT_PREFIX}全局数据`,
        {
          content: globalReadableContent,
          enabled: true,
          type: 'constant',
          position: 'before_character_definition',
          order,
          prevent_recursion: true
        }
      , usedOrders));
    }

    // 2. Per-table custom entries
    for (const table of customTables) {
      const ec = table.exportConfig || {};
      const entryName = ec.entryName || table.name || '未命名表';
      const comment = buildEntryComment(entryName);
      const content = formatTableMarkdown(table);
      if (!content) continue;

      const placement = ec.entryPlacement || {};
      const pos = normalizePosition(placement.position, 'before_character_definition');
      const order = allocOrder(usedOrders, placement.order || 50000, 1, 99999);
      const entryType = ec.entryType === 'keyword' ? 'keyword' : 'constant';

      results.push(await upsertEntry(helper, targetBook, entries,
        comment,
        applyPlacementToEntry({
          content,
          enabled: true,
          type: entryType,
          order,
          prevent_recursion: ec.preventRecursion !== false
        }, { position: pos, depth: placement.depth || 2 })
      , usedOrders));
    }

    // 3. Cleanup stale entries
    const desiredComments = new Set(results.map(r => r.comment).filter(Boolean));
    const staleEntries = entries.filter(e => {
      if (!e.comment || !e.comment.startsWith(COMMENT_PREFIX)) return false;
      return !desiredComments.has(e.comment);
    });
    if (staleEntries.length > 0) {
      const uids = staleEntries.map(e => e.uid).filter(Boolean);
      if (uids.length > 0 && typeof helper.deleteLorebookEntries === 'function') {
        await Promise.resolve(helper.deleteLorebookEntries(targetBook, uids));
        log.info(`已清理 ${uids.length} 个旧世界书条目`);
      }
    }

    const created = results.filter(r => r.action === 'created').length;
    const updated = results.filter(r => r.action === 'updated').length;
    log.info(`世界书同步完成：${created} 创建, ${updated} 更新, ${staleEntries.length} 清理`);

    return {
      success: true,
      results,
      stats: { created, updated, cleaned: staleEntries.length },
      targetBook
    };

  } catch (error) {
    log.warn('世界书同步失败:', error);
    return { success: false, error: error?.message || '世界书同步失败' };
  }
}

export default { syncTablesToWorldbook, mergeTablesWithSchema };
