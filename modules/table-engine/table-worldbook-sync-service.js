/**
 * YouYou Toolkit - 填表世界书同步服务
 *
 * 议题 #15 #19 + 议题 #15 §F A2 修复（v1.0.169+）：
 *   - 条目 comment 前缀升级为 [YY:chatId=${normalized_id}] 严格边界格式
 *   - sync 时严格 WHERE：只操作前缀属于当前 chatId 的条目，不污染其他 chat
 *   - 加 isOwnedByChat helper 防误伤
 *
 * Comment 格式约定：
 *   `YYT-[YY:chatId=${normalized}]-${tableName|Wrapper-Start|Wrapper-End|全局数据}`
 *   normalized = chatId 去掉 \[\]= 等可能干扰边界的字符
 *
 * 旧前缀（`YYT-[${chatId}]-`）保持识别能力（向后兼容存量数据），但新建只写新格式。
 */

import { getTopWindow } from '../tool-execution-context.js';
import { logger } from '../core/logger-service.js';
import { buildUsedOrderSet, allocOrder, allocConsecutiveOrderBlock } from './table-worldbook-order-service.js';
import { normalizePosition, applyPlacementToEntry } from './table-worldbook-placement-service.js';

const log = logger.createScope('TableWorldbookSync');

const COMMENT_PREFIX = 'YYT-';
const CHAT_ID_TAG_START = '[YY:chatId=';
const CHAT_ID_TAG_END = ']';

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

/**
 * 规范化 chatId，去掉可能干扰边界匹配的字符
 */
function normalizeChatIdForComment(chatId) {
  return normalizeString(chatId, 'default_chat').replace(/[\[\]=]/g, '_');
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
  // 议题 #15 Bug #33-F：旧实现按 index 拿 configTables 的 columns 替换 runtime columns，
  //   但激活模板切换后 configTables（=config.tables 旧快照）的 schema 跟 runtime 的 row.cells.key
  //   完全错位（同 #33-B/C 模式但漏修了 worldbook-sync 这层）。
  //
  // 新实现：直接用 runtime tables（applyIncrementalEdits 后已包含正确 columns + rows）。
  //   按表 id 匹配 configTables，仅在 runtime 缺 exportConfig 等 worldbook 元数据时回填。
  //   不再用 configTables 的 columns 覆盖 runtime columns（这正是 row.cells 显示空的根因）。
  if (!Array.isArray(runtimeTables) || runtimeTables.length === 0) return [];

  const schemaById = new Map();
  if (Array.isArray(configTables)) {
    for (const schema of configTables) {
      const id = schema?.id || schema?.key;
      if (id) schemaById.set(id, schema);
    }
  }

  return runtimeTables.map((runtime) => {
    const matchedSchema = runtime?.id ? schemaById.get(runtime.id) : null;
    return {
      ...runtime,
      // runtime 优先，schema 仅回填 exportConfig 等 worldbook 元数据
      exportConfig: runtime?.exportConfig || matchedSchema?.exportConfig || { enabled: false },
      enabled: runtime?.enabled !== false
    };
  });
}

// ────────────────────────────────────────────────────────────────
// Comment 前缀（新格式 + 旧格式向后兼容识别）
// ────────────────────────────────────────────────────────────────

function buildChatPrefix(chatId) {
  // 新格式：YYT-[YY:chatId=xxx]-
  return `${COMMENT_PREFIX}${CHAT_ID_TAG_START}${normalizeChatIdForComment(chatId)}${CHAT_ID_TAG_END}-`;
}

function buildLegacyChatPrefix(chatId) {
  // 旧格式：YYT-[chatId]- （v1.0.168 及以下版本写入）
  return `${COMMENT_PREFIX}[${normalizeString(chatId, 'default_chat')}]-`;
}

/**
 * 判断 comment 是否属于指定 chatId（识别新旧两种格式）
 * 议题 #15 A2 修复核心 helper：sync 时只动属于自己 chat 的条目，不误伤其他 chat。
 */
function isOwnedByChat(comment, chatId) {
  if (!comment || typeof comment !== 'string') return false;
  const newPrefix = buildChatPrefix(chatId);
  if (comment.startsWith(newPrefix)) return true;
  const legacyPrefix = buildLegacyChatPrefix(chatId);
  if (comment.startsWith(legacyPrefix)) return true;
  return false;
}

/**
 * 过滤出属于指定 chatId 的 entries
 */
function filterEntriesByChat(entries, chatId) {
  if (!Array.isArray(entries)) return [];
  return entries.filter((e) => isOwnedByChat(e?.comment, chatId));
}

function buildEntryComment(chatId, tableName) {
  const prefix = buildChatPrefix(chatId);
  const name = String(tableName || '').trim();
  return name ? `${prefix}${name}` : `${prefix}填表数据`;
}

function buildWrapperComment(chatId, tag, suffix) {
  return `${buildChatPrefix(chatId)}Wrapper-${suffix}`;
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

async function upsertEntry(helper, targetBook, entries, comment, entryData, usedOrders, chatId) {
  // 议题 #15 A2 关键防御：upsert 前再次校验 entry 属于当前 chat（防止 comment hash 冲突跨 chat 误更新）
  const existing = entries.find(e => e.comment === comment);
  if (existing && chatId && !isOwnedByChat(existing.comment, chatId)) {
    log.warn(`upsert 跳过：现有条目 comment "${comment}" 不属于当前 chat`, { chatId });
    return { action: 'skipped', comment, reason: 'cross_chat_collision' };
  }

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

async function resolveTargetBook(config) {
  const syncConfig = config?.worldbookSync;
  const injectionMode = syncConfig?.injectionMode || 'character_card';
  const helper = getTavernHelper();

  if (injectionMode === 'target_book') {
    const targetBook = String(syncConfig?.targetBook || '').trim();
    if (!targetBook) return { error: 'no_target_book' };
    return { targetBook };
  }

  if (injectionMode === 'character_card') {
    if (helper) {
      if (typeof helper.getCurrentCharPrimaryLorebook === 'function') {
        const r = await Promise.resolve(helper.getCurrentCharPrimaryLorebook());
        if (r) return { targetBook: String(r) };
      }
      if (typeof helper.getCharLorebooks === 'function') {
        const r = await Promise.resolve(helper.getCharLorebooks());
        if (r?.primary) return { targetBook: String(r.primary) };
      }
    }
    return { error: 'no_character_lorebook' };
  }

  if (injectionMode === 'auto_create') {
    if (helper) {
      if (typeof helper.getOrCreateChatWorldbook === 'function') {
        try {
          const name = await Promise.resolve(helper.getOrCreateChatWorldbook('current'));
          if (name) return { targetBook: String(name) };
        } catch (err) { log.warn('getOrCreateChatWorldbook 失败', err); }
      }
      if (typeof helper.getOrCreateChatLorebook === 'function') {
        try {
          const name = await Promise.resolve(helper.getOrCreateChatLorebook());
          if (name) return { targetBook: String(name) };
        } catch (err) { log.warn('getOrCreateChatLorebook 失败', err); }
      }
    }
    return { error: 'chat_worldbook_unavailable' };
  }

  return { error: 'unknown_injection_mode' };
}

export async function syncTablesToWorldbook(tables, config) {
  const syncConfig = config?.worldbookSync;
  if (!syncConfig?.enabled) return { skipped: true, reason: 'disabled' };

  const resolved = await resolveTargetBook(config);
  if (resolved.error) return { skipped: true, reason: resolved.error };
  const targetBook = resolved.targetBook;

  const helper = getTavernHelper();
  if (!helper) return { success: false, error: 'TavernHelper 不可用' };
  if (typeof helper.getLorebookEntries !== 'function') return { success: false, error: 'getLorebookEntries 不可用' };
  if (typeof helper.setLorebookEntries !== 'function' && typeof helper.createLorebookEntries !== 'function') {
    return { success: false, error: '世界书写入 API 不可用' };
  }

  const chatId = resolveCurrentChatId();
  const chatPrefix = buildChatPrefix(chatId);

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
        buildWrapperComment(chatId, wrapperTag, 'Start'),
        applyPlacementToEntry({
          content: startContent,
          enabled: true,
          type: 'constant',
          order: blockBase,
          prevent_recursion: true
        }, { position: wrapperPos, depth: wrapperDepth })
      , usedOrders, chatId));

      // Global Readable (only if there are tables without custom export)
      if (globalReadableContent) {
        results.push(await upsertEntry(helper, targetBook, entries,
          `${chatPrefix}全局数据`,
          applyPlacementToEntry({
            content: globalReadableContent,
            enabled: true,
            type: 'constant',
            order: blockBase + 1,
            prevent_recursion: true
          }, { position: wrapperPos, depth: wrapperDepth })
        , usedOrders, chatId));
      }

      // WrapperEnd
      results.push(await upsertEntry(helper, targetBook, entries,
        buildWrapperComment(chatId, wrapperTag, 'End'),
        applyPlacementToEntry({
          content: `</${wrapperTag}>`,
          enabled: true,
          type: 'constant',
          order: blockBase + 2,
          prevent_recursion: true
        }, { position: wrapperPos, depth: wrapperDepth })
      , usedOrders, chatId));

    } else if (globalReadableContent) {
      // No wrapper — write a single global entry
      const order = allocOrder(usedOrders, 50000, 1, 99999);
      results.push(await upsertEntry(helper, targetBook, entries,
        `${chatPrefix}全局数据`,
        {
          content: globalReadableContent,
          enabled: true,
          type: 'constant',
          position: 'before_character_definition',
          order,
          prevent_recursion: true
        }
      , usedOrders, chatId));
    }

    // 2. Per-table custom entries
    for (const table of customTables) {
      const ec = table.exportConfig || {};
      const entryName = ec.entryName || table.name || '未命名表';
      const entryType = ec.entryType === 'keyword' ? 'keyword' : 'constant';
      const placement = ec.entryPlacement || {};
      const pos = normalizePosition(placement.position, 'before_character_definition');

      const buildContent = (t) => {
        const hasData = Array.isArray(t.rows) && t.rows.length > 0 && Array.isArray(t.columns) && t.columns.length > 0;
        if (!hasData) return '';
        return ec.injectionTemplate ? expandInjectionTemplate(ec.injectionTemplate, t) : formatTableMarkdown(t);
      };

      if (ec.splitByRow) {
        if (ec.extraIndexPlacement?.position && ec.extraIndexPlacement.position !== placement.position) {
          log.info(`splitByRow 模式下 extraIndexPlacement 不生效 [${entryName}]`);
        }
        const rows = Array.isArray(table.rows) ? table.rows : [];
        for (let ri = 0; ri < rows.length; ri++) {
          const rowName = rows[ri]?.name || `${entryName}-行${ri + 1}`;
          const rowComment = buildEntryComment(chatId, rowName);
          const miniTable = { ...table, name: rowName, rows: [rows[ri]] };
          const content = buildContent(miniTable);
          if (!content) continue;
          const order = allocOrder(usedOrders, placement.order || 50000, 1, 99999);
          results.push(await upsertEntry(helper, targetBook, entries,
            rowComment,
            applyPlacementToEntry({
              content, enabled: true, type: entryType, order,
              prevent_recursion: ec.preventRecursion !== false
            }, { position: pos, depth: placement.depth || 2 })
          , usedOrders, chatId));
        }
      } else {
        const comment = buildEntryComment(chatId, entryName);
        const content = buildContent(table);
        if (!content) continue;
        const order = allocOrder(usedOrders, placement.order || 50000, 1, 99999);
        results.push(await upsertEntry(helper, targetBook, entries,
          comment,
          applyPlacementToEntry({
            content, enabled: true, type: entryType, order,
            prevent_recursion: ec.preventRecursion !== false
          }, { position: pos, depth: placement.depth || 2 })
        , usedOrders, chatId));

        // extraIndexPlacement: create a second entry at alternate position
        const eip = ec.extraIndexPlacement;
        if (eip && eip.position && eip.position !== placement.position) {
          const extraPos = normalizePosition(eip.position, 'before_character_definition');
          const extraComment = `${comment}-extra`;
          const extraOrder = allocOrder(usedOrders, eip.order || 50000, 1, 99999);
          results.push(await upsertEntry(helper, targetBook, entries,
            extraComment,
            applyPlacementToEntry({
              content, enabled: true, type: entryType, order: extraOrder,
              prevent_recursion: ec.preventRecursion !== false
            }, { position: extraPos, depth: eip.depth || 2 })
          , usedOrders, chatId));
        }
      }
    }

    // 3. Cleanup stale entries — only for this chat (议题 #15 A2：用 isOwnedByChat 识别新旧两种前缀格式)
    const desiredComments = new Set(results.map(r => r.comment).filter(Boolean));
    const staleEntries = entries.filter(e => {
      if (!e.comment || !isOwnedByChat(e.comment, chatId)) return false;
      return !desiredComments.has(e.comment);
    });
    if (staleEntries.length > 0) {
      const uids = staleEntries.map(e => e.uid).filter(Boolean);
      if (uids.length > 0 && typeof helper.deleteLorebookEntries === 'function') {
        await Promise.resolve(helper.deleteLorebookEntries(targetBook, uids));
        log.info(`已清理 ${uids.length} 个旧世界书条目 [${chatId}]`);
      }
    }

    const created = results.filter(r => r.action === 'created').length;
    const updated = results.filter(r => r.action === 'updated').length;
    log.info(`世界书同步完成 [${chatId}]：${created} 创建, ${updated} 更新, ${staleEntries.length} 清理`);

    return {
      success: true,
      results,
      stats: { created, updated, cleaned: staleEntries.length },
      targetBook,
      chatId
    };

  } catch (error) {
    log.warn('世界书同步失败:', error);
    return { success: false, error: error?.message || '世界书同步失败' };
  }
}

/**
 * 清除当前 chat 的所有已注入世界书条目
 */
export async function clearChatWorldbookEntries(config) {
  const resolved = await resolveTargetBook(config);
  if (resolved.error) return { success: false, error: resolved.error };
  const targetBook = resolved.targetBook;

  const helper = getTavernHelper();
  if (!helper || typeof helper.getLorebookEntries !== 'function') {
    return { success: false, error: 'TavernHelper 不可用' };
  }

  const chatId = resolveCurrentChatId();

  try {
    let entries = await Promise.resolve(helper.getLorebookEntries(targetBook));
    if (!Array.isArray(entries)) return { success: true, cleaned: 0 };

    const staleEntries = entries.filter(e => e.comment && isOwnedByChat(e.comment, chatId));
    if (staleEntries.length === 0) return { success: true, cleaned: 0, targetBook };

    const uids = staleEntries.map(e => e.uid).filter(Boolean);
    if (uids.length > 0 && typeof helper.deleteLorebookEntries === 'function') {
      await Promise.resolve(helper.deleteLorebookEntries(targetBook, uids));
      log.info(`已清除 ${uids.length} 个世界书条目 [${chatId}]`);
    }
    return { success: true, cleaned: uids.length, targetBook };
  } catch (error) {
    log.warn('清除世界书条目失败:', error);
    return { success: false, error: error?.message || '清除失败' };
  }
}

function expandInjectionTemplate(template, table) {
  let result = template;
  result = result.replace(/\{\{tableName\}\}/g, table.name || '未命名表');
  if (result.includes('{{tableContent}}')) {
    result = result.replace(/\{\{tableContent\}\}/g, formatTableMarkdown(table));
  }
  const cols = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];
  const firstRow = rows[0];
  if (firstRow) {
    for (const col of cols) {
      const key = col?.key;
      if (!key) continue;
      const placeholder = `{{${key}}}`;
      if (!result.includes(placeholder)) continue;
      const value = String(firstRow.cells?.[key] ?? '');
      result = result.split(placeholder).join(value);
    }
  }
  return result;
}

export default { syncTablesToWorldbook, clearChatWorldbookEntries, mergeTablesWithSchema };
