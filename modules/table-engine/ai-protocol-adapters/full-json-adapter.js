/**
 * YouYou Toolkit - 全量 JSON envelope 协议适配器
 *
 * 议题 #15 Task C（v1.0.201+）：
 *   兜底协议，AI 输出完整的 {tables:[...]} envelope（v1.0.175 处理过的格式）。
 *   复用 table-json-sanitizer.parseFullReplacement。
 */

import { parseFullReplacement } from '../table-json-sanitizer.js';

export const fullJsonAdapter = Object.freeze({
  formatId: 'full-json',
  displayName: 'JSON envelope 全量协议',

  detect(text) {
    if (!text || typeof text !== 'string') return false;
    // 检测 ```json``` 代码块或 { 开头的 JSON 对象（含 "tables" 字段）
    return /```json/i.test(text) || /\{[\s\S]*?"tables"\s*:/i.test(text);
  },

  parse(text) {
    const parsed = parseFullReplacement(text);
    if (!parsed) return null;

    let tables = null;
    if (Array.isArray(parsed)) {
      tables = parsed;
    } else if (parsed && Array.isArray(parsed.tables)) {
      tables = parsed.tables;
    } else if (parsed && typeof parsed === 'object') {
      // 兜底：取第一个 array 类型的字段
      for (const v of Object.values(parsed)) {
        if (Array.isArray(v)) { tables = v; break; }
      }
    }
    if (!Array.isArray(tables) || tables.length === 0) return null;
    return { mode: 'full', edits: null, tables };
  }
});

export default fullJsonAdapter;
