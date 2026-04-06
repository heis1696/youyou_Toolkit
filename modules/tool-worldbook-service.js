import { getTopWindow } from './tool-execution-context.js';

let cachedWorldbooks = [];

function getTavernHelper() {
  const topWindow = getTopWindow();
  return topWindow?.TavernHelper || null;
}

function normalizeBookNameList(value) {
  if (!Array.isArray(value)) return [];
  return value.map(item => String(item || '').trim()).filter(Boolean);
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

export async function getAvailableWorldbooks() {
  const helper = getTavernHelper();
  if (!helper || typeof helper.getLorebooks !== 'function') {
    cachedWorldbooks = [];
    return [];
  }

  try {
    const books = normalizeBookNameList(await Promise.resolve(helper.getLorebooks()));
    cachedWorldbooks = books;
    return [...books];
  } catch (error) {
    console.warn('[ToolWorldbookService] 获取世界书列表失败:', error);
    cachedWorldbooks = [];
    return [];
  }
}

export async function buildSelectedWorldbookContent(toolConfig) {
  const selectedBooks = normalizeBookNameList(toolConfig?.worldbooks?.selected);
  if (toolConfig?.worldbooks?.enabled !== true || selectedBooks.length === 0) {
    return '';
  }

  const helper = getTavernHelper();
  if (!helper || typeof helper.getLorebookEntries !== 'function') {
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
  getAvailableWorldbooks,
  buildSelectedWorldbookContent
};
