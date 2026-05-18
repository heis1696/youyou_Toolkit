import { getTopWindow } from './tool-execution-context.js';
import { logger } from './core/logger-service.js';
import * as worldbookPresetStore from './worldbook-preset-store.js';

const log = logger.createScope('ToolWorldbookService');

let cachedWorldbooks = [];
let lastWorldbookDiagnostics = null;

function getTavernHelper() {
  try {
    if (typeof TavernHelper !== 'undefined' && TavernHelper) {
      return TavernHelper;
    }
  } catch (error) {
    // ignore direct global access errors
  }

  const topWindow = getTopWindow();
  return topWindow?.TavernHelper || null;
}

function getSillyTavernApi() {
  try {
    if (typeof SillyTavern !== 'undefined' && SillyTavern) {
      return SillyTavern;
    }
  } catch (error) {
    // ignore direct global access errors
  }

  const topWindow = getTopWindow();
  return topWindow?.SillyTavern || null;
}

function normalizeBookNameList(value) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.map((item) => String(item || '').trim()).filter(Boolean)));
}

function summarizeValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        return item.name || item.id || item.title || JSON.stringify(item);
      }
      return String(item ?? '');
    });
  }

  if (value && typeof value === 'object') {
    const summary = {};
    Object.keys(value).forEach((key) => {
      const current = value[key];
      if (Array.isArray(current)) {
        summary[key] = current.map((item) => {
          if (typeof item === 'string') return item;
          if (item && typeof item === 'object') {
            return item.name || item.id || item.title || '[object]';
          }
          return String(item ?? '');
        });
      } else if (current && typeof current === 'object') {
        summary[key] = '[object]';
      } else {
        summary[key] = current;
      }
    });
    return summary;
  }

  return value;
}

function getEntryText(entry = {}) {
  const content = typeof entry.content === 'string' ? entry.content.trim() : '';
  if (!content) return '';

  const title = [entry.comment, entry.key, entry.keysecondary, entry.text]
    .map(value => String(value || '').trim())
    .find(Boolean);

  return title && title !== content
    ? `## ${title}\n${content}`
    : content;
}

export function getCachedAvailableWorldbooks() {
  return Array.isArray(cachedWorldbooks) ? [...cachedWorldbooks] : [];
}

export function getLastWorldbookDiagnostics() {
  return lastWorldbookDiagnostics ? { ...lastWorldbookDiagnostics } : null;
}

async function resolveCharacterWorldbooks(helper) {
  if (!helper || typeof helper.getCharLorebooks !== 'function') {
    return [];
  }

  try {
    const charLorebooks = await Promise.resolve(helper.getCharLorebooks({ type: 'all' }));
    return normalizeBookNameList([
      charLorebooks?.primary,
      charLorebooks?.secondary,
      ...(Array.isArray(charLorebooks?.additional) ? charLorebooks.additional : [])
    ]);
  } catch (error) {
    log.warn('获取角色绑定世界书失败:', error);
    return [];
  }
}

async function resolveAllWorldbooks(helper, stApi) {
  if (helper && typeof helper.getLorebooks === 'function') {
    try {
      const books = normalizeBookNameList(await Promise.resolve(helper.getLorebooks()));
      if (books.length > 0) {
        return books;
      }
    } catch (error) {
      log.warn('获取全部世界书列表失败:', error);
    }
  }

  if (stApi && typeof stApi.getWorldBooks === 'function') {
    try {
      const books = await Promise.resolve(stApi.getWorldBooks());
      const names = normalizeBookNameList(Array.isArray(books)
        ? books.map((book) => book?.name ?? book)
        : []);
      if (names.length > 0) {
        return names;
      }
    } catch (error) {
      log.warn('从 SillyTavern 获取世界书列表失败:', error);
    }
  }

  return [];
}

export async function getAvailableWorldbooks() {
  const helper = getTavernHelper();
  const stApi = getSillyTavernApi();

  const diagnostics = {
    checkedAt: Date.now(),
    hasGlobalTavernHelper: (() => {
      try {
        return typeof TavernHelper !== 'undefined' && !!TavernHelper;
      } catch (error) {
        return false;
      }
    })(),
    hasParentTavernHelper: !!getTopWindow()?.TavernHelper,
    hasGlobalSillyTavern: (() => {
      try {
        return typeof SillyTavern !== 'undefined' && !!SillyTavern;
      } catch (error) {
        return false;
      }
    })(),
    hasParentSillyTavern: !!getTopWindow()?.SillyTavern,
    helperKeys: helper ? Object.keys(helper).sort() : [],
    stKeys: stApi ? Object.keys(stApi).sort() : [],
    getLorebooksType: typeof helper?.getLorebooks,
    getCharLorebooksType: typeof helper?.getCharLorebooks,
    getLorebookEntriesType: typeof helper?.getLorebookEntries,
    getWorldBooksType: typeof stApi?.getWorldBooks,
    characterWorldbooks: [],
    allWorldbooks: [],
    combinedWorldbooks: [],
    rawResults: {},
    errors: []
  };

  try {
    diagnostics.rawResults.getLorebooks = helper && typeof helper.getLorebooks === 'function'
      ? summarizeValue(await Promise.resolve(helper.getLorebooks()))
      : '[unavailable]';
  } catch (error) {
    diagnostics.errors.push(`getLorebooks: ${error?.message || error}`);
  }

  try {
    diagnostics.rawResults.getCharLorebooks = helper && typeof helper.getCharLorebooks === 'function'
      ? summarizeValue(await Promise.resolve(helper.getCharLorebooks({ type: 'all' })))
      : '[unavailable]';
  } catch (error) {
    diagnostics.errors.push(`getCharLorebooks: ${error?.message || error}`);
  }

  try {
    diagnostics.rawResults.getWorldBooks = stApi && typeof stApi.getWorldBooks === 'function'
      ? summarizeValue(await Promise.resolve(stApi.getWorldBooks()))
      : '[unavailable]';
  } catch (error) {
    diagnostics.errors.push(`getWorldBooks: ${error?.message || error}`);
  }

  const characterWorldbooks = await resolveCharacterWorldbooks(helper);
  const allWorldbooks = await resolveAllWorldbooks(helper, stApi);
  const books = normalizeBookNameList([...characterWorldbooks, ...allWorldbooks]);

  diagnostics.characterWorldbooks = [...characterWorldbooks];
  diagnostics.allWorldbooks = [...allWorldbooks];
  diagnostics.combinedWorldbooks = [...books];
  lastWorldbookDiagnostics = diagnostics;

  cachedWorldbooks = books;
  return [...books];
}

/**
 * 从工具配置或预设 ID 解析"应注入哪些世界书 + 其内容"。
 * 议题 #45 Stage 5：runtime 直读 worldbook 预设 ID，老字段（worldbooks.enabled / worldbooks.selected）废弃。
 *
 * @param {Object|string} arg - 工具配置或预设 ID 字符串
 * @returns {Promise<string>} 合并后的世界书内容；无绑定/未命中返回 ''
 */
export async function buildSelectedWorldbookContent(arg) {
  // 入参规范化：toolConfig → presetId
  let presetId = '';
  if (typeof arg === 'string') {
    presetId = arg;
  } else if (arg && typeof arg === 'object') {
    presetId = arg?.worldbooks?.presetId || '';
  }

  if (!presetId) return '';

  const preset = worldbookPresetStore.getPreset(presetId);
  if (!preset) {
    log.warn(`buildSelectedWorldbookContent: 预设不存在 ${presetId}`);
    return '';
  }

  // 解析最终 bookList：character_card 模式从角色卡动态拉，并被 preset.bookList 覆盖
  const includeDisabledEntries = preset.includeDisabled === true;
  let resolvedBooks = [];

  if (preset.bindingMode === 'character_card') {
    const helper = getTavernHelper();
    const stApi = getSillyTavernApi();
    const characterBooks = await resolveCharacterWorldbooks(helper);
    const overrides = new Map(
      (preset.bookList || []).map((b) => [String(b.bookName || ''), b])
    );
    for (const bookName of normalizeBookNameList(characterBooks)) {
      const ov = overrides.get(bookName);
      if (ov && ov.enabled === false) continue;
      resolvedBooks.push(bookName);
    }
  } else {
    // custom 模式：直接用 preset.bookList 中 enabled !== false 的
    resolvedBooks = (preset.bookList || [])
      .filter((b) => b && b.bookName && b.enabled !== false)
      .map((b) => b.bookName);
  }

  resolvedBooks = normalizeBookNameList(resolvedBooks);
  if (resolvedBooks.length === 0) return '';

  const helper = getTavernHelper();
  if (!helper || typeof helper.getLorebookEntries !== 'function') {
    log.warn('TavernHelper.getLorebookEntries 不可用，无法读取世界书内容。');
    return '';
  }

  const bookOverrideMap = new Map(
    (preset.bookList || []).map((b) => [b.bookName, b.entryOverrides || {}])
  );

  const blocks = [];

  for (const bookName of resolvedBooks) {
    try {
      const entries = await helper.getLorebookEntries(bookName);
      const entryList = Array.isArray(entries) ? entries : [];
      const entryOverrides = bookOverrideMap.get(bookName) || {};
      const filtered = entryList
        .filter((entry) => includeDisabledEntries || (entry?.enabled !== false && !entry?.disable))
        .filter((entry) => {
          const ov = entryOverrides[String(entry?.uid ?? '')];
          if (ov && typeof ov.enabled === 'boolean') return ov.enabled;
          return true;
        });
      const entryText = filtered
        .map(getEntryText)
        .filter(Boolean)
        .join('\n\n');

      if (entryText) {
        blocks.push(`[世界书：${bookName}]\n${entryText}`);
      }
    } catch (error) {
      log.warn(`读取世界书失败: ${bookName}`, error);
    }
  }

  return blocks.join('\n\n---\n\n');
}

export async function getEntriesForBook(bookName) {
  if (!bookName) return [];
  const helper = getTavernHelper();
  if (!helper || typeof helper.getLorebookEntries !== 'function') return [];
  try {
    const entries = await helper.getLorebookEntries(bookName);
    return Array.isArray(entries) ? entries : [];
  } catch (err) {
    log.warn(`getEntriesForBook 失败: ${bookName}`, err);
    return [];
  }
}

export default {
  getCachedAvailableWorldbooks,
  getLastWorldbookDiagnostics,
  getAvailableWorldbooks,
  getEntriesForBook,
  buildSelectedWorldbookContent
};
