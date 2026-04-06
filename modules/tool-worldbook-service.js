import { getTopWindow } from './tool-execution-context.js';

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
    console.warn('[ToolWorldbookService] 获取角色绑定世界书失败:', error);
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
      console.warn('[ToolWorldbookService] 获取全部世界书列表失败:', error);
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
      console.warn('[ToolWorldbookService] 从 SillyTavern 获取世界书列表失败:', error);
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

export async function buildSelectedWorldbookContent(toolConfig) {
  const selectedBooks = normalizeBookNameList(toolConfig?.worldbooks?.selected);
  if (toolConfig?.worldbooks?.enabled !== true || selectedBooks.length === 0) {
    return '';
  }

  const helper = getTavernHelper();
  if (!helper || typeof helper.getLorebookEntries !== 'function') {
    console.warn('[ToolWorldbookService] TavernHelper.getLorebookEntries 不可用，无法读取世界书内容。');
    return '';
  }

  const blocks = [];

  for (const bookName of selectedBooks) {
    try {
      const entries = await helper.getLorebookEntries(bookName);
      const activeEntries = Array.isArray(entries)
        ? entries.filter(entry => entry?.enabled !== false)
        : [];
      const entryText = activeEntries
        .map(getEntryText)
        .filter(Boolean)
        .join('\n\n');

      if (entryText) {
        blocks.push(`[世界书：${bookName}]\n${entryText}`);
      }
    } catch (error) {
      console.warn(`[ToolWorldbookService] 读取世界书失败: ${bookName}`, error);
    }
  }

  return blocks.join('\n\n');
}

export default {
  getCachedAvailableWorldbooks,
  getLastWorldbookDiagnostics,
  getAvailableWorldbooks,
  buildSelectedWorldbookContent
};
