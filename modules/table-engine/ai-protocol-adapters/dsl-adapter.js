/**
 * YouYou Toolkit - DSL 协议适配器（<tableEdit> 标签）
 *
 * 议题 #15 Task C（v1.0.201+）：
 *   当前主链的默认协议。复用 table-json-sanitizer 现有的
 *   parseIncrementalEdits 函数（已经做了 5 层 JSON 清洗 + 松散对象兜底）。
 *
 * 触发条件：
 *   text 包含 <tableEdit> ... </tableEdit> 标签
 *   或包含 insertRow/updateRow/deleteRow 关键字
 *
 * 输出：{ mode: 'incremental', edits: [{op, tableIndex, rowIndex?, data?}] }
 */

import { parseIncrementalEdits } from '../table-json-sanitizer.js';

const EDIT_TAG_RE = /<tableEdit>[\s\S]*?<\/tableEdit>/i;
const COMMAND_RE = /(insertRow|updateRow|deleteRow)\s*\(/;

export const dslAdapter = Object.freeze({
  formatId: 'dsl',
  displayName: '<tableEdit> DSL 增量协议',

  detect(text) {
    if (!text || typeof text !== 'string') return false;
    return EDIT_TAG_RE.test(text) || COMMAND_RE.test(text);
  },

  parse(text) {
    const edits = parseIncrementalEdits(text);
    if (!Array.isArray(edits) || edits.length === 0) return null;
    return { mode: 'incremental', edits, tables: null };
  }
});

export default dslAdapter;
