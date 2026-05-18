/**
 * YouYou Toolkit - AI 响应 JSON 清洗器
 * 多层清洗流水线，处理 AI 返回的损坏 JSON / 增量编辑标签
 * 对标 shujuku v3.7 的 sanitizeJsonPipeline + coerceLooseRowObject
 */

const EDIT_TAG_REGEX = /<tableEdit>([\s\S]*?)<\/tableEdit>/gi;
const FENCED_REGEX = /```(?:json)?\s*([\s\S]*?)```/gi;

// ════════════════════════════════════════════════════════════════
// JSON 清洗管线 — 5 层修复
// ════════════════════════════════════════════════════════════════

function normalizeQuotesLayer(jsonStr) {
  if (typeof jsonStr !== 'string' || !jsonStr) return jsonStr;
  return jsonStr.replace(/[“”「」『』＂]/g, '"');
}

function getNextNonWhitespaceMeta(text, startIndex) {
  for (let i = startIndex; i < text.length; i++) {
    if (!/\s/.test(text[i])) return { char: text[i], index: i };
  }
  return { char: '', index: -1 };
}

function isLikelyJsonValueStart(char) {
  return !!char && (char === '"' || char === '{' || char === '[' ||
    char === '-' || /\d/.test(char) || char === 't' || char === 'f' || char === 'n');
}

function isLikelyStringCloser(text, quoteIndex, stringKind, containerType) {
  const nextMeta = getNextNonWhitespaceMeta(text, quoteIndex + 1);
  const nextChar = nextMeta.char;
  if (!nextChar) return stringKind !== 'key';
  if (stringKind === 'key') return nextChar === ':';
  if (nextChar === '}' || nextChar === ']') return true;
  if (nextChar !== ',') return false;
  const afterComma = getNextNonWhitespaceMeta(text, nextMeta.index + 1).char;
  if (!afterComma) return true;
  if (containerType === 'object') return afterComma === '"' || afterComma === '}';
  if (containerType === 'array') return afterComma === ']' || isLikelyJsonValueStart(afterComma);
  return isLikelyJsonValueStart(afterComma) || afterComma === '}' || afterComma === ']';
}

function escapeUnescapedQuotesLayer(jsonStr) {
  if (typeof jsonStr !== 'string') return { success: false, result: jsonStr, error: 'not a string' };
  let result = '';
  let inString = false;
  let escapeNext = false;
  let currentStringKind = null;
  const containerStack = [];
  const getTop = () => containerStack.length ? containerStack[containerStack.length - 1] : null;
  const markParentDone = () => {
    const p = getTop();
    if (p) p.expecting = 'commaOrEnd';
  };

  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i];
    if (escapeNext) { result += char; escapeNext = false; continue; }
    if (inString) {
      if (char === '\\') { result += char; escapeNext = true; continue; }
      if (char === '"') {
        const top = getTop();
        if (isLikelyStringCloser(jsonStr, i, currentStringKind, top?.type || null)) {
          result += char;
          inString = false;
          if (currentStringKind === 'key' && top?.type === 'object') top.expecting = 'colon';
          else markParentDone();
          currentStringKind = null;
        } else {
          result += '\\"';
        }
        continue;
      }
      result += char;
      continue;
    }
    if (char === '"') {
      result += char; inString = true;
      const top = getTop();
      currentStringKind = top && top.type === 'object' && (top.expecting === 'key' || top.expecting === 'keyOrEnd') ? 'key' : 'value';
      continue;
    }
    if (char === '{') { result += char; containerStack.push({ type: 'object', expecting: 'keyOrEnd' }); continue; }
    if (char === '[') { result += char; containerStack.push({ type: 'array', expecting: 'valueOrEnd' }); continue; }
    if (char === ':') { result += char; const t = getTop(); if (t?.type === 'object') t.expecting = 'value'; continue; }
    if (char === ',') { result += char; const t = getTop(); if (t?.type === 'object') t.expecting = 'key'; if (t?.type === 'array') t.expecting = 'value'; continue; }
    if (char === '}' || char === ']') { result += char; containerStack.pop(); markParentDone(); continue; }
    result += char;
  }
  return { success: true, result, error: null };
}

function sanitizeControlCharsLayer(jsonStr) {
  if (typeof jsonStr !== 'string' || !jsonStr) return jsonStr;
  let result = '', inString = false, escapeNext = false;
  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i];
    if (escapeNext) { result += char; escapeNext = false; continue; }
    if (char === '\\') { result += char; if (inString) escapeNext = true; continue; }
    if (char === '"') { result += char; inString = !inString; continue; }
    if (inString) {
      if (char === '\n') { result += '\\n'; continue; }
      if (char === '\r') { result += '\\r'; continue; }
      if (char === '\t') { result += '\\t'; continue; }
      if (char === '\0') { result += '\\u0000'; continue; }
    }
    result += char;
  }
  return result;
}
function removeTrailingCommasLayer(jsonStr) {
  if (typeof jsonStr !== 'string' || !jsonStr) return jsonStr;
  let result = '', inString = false, escapeNext = false;
  for (let i = 0; i < jsonStr.length; i++) {
    const char = jsonStr[i];
    if (escapeNext) { result += char; escapeNext = false; continue; }
    if (char === '\\') { result += char; if (inString) escapeNext = true; continue; }
    if (char === '"') { result += char; inString = !inString; continue; }
    if (!inString && char === ',') {
      const nextChar = getNextNonWhitespaceMeta(jsonStr, i + 1).char;
      if (nextChar === '}' || nextChar === ']') continue;
    }
    result += char;
  }
  return result;
}

function fixNumericKeysLayer(jsonStr) {
  if (typeof jsonStr !== 'string' || !jsonStr) return jsonStr;
  return jsonStr.replace(/([{,]\s*)(-?\d+)(\s*:)/g, '$1"$2"$3');
}

function sanitizeJsonPipeline(jsonStr) {
  if (typeof jsonStr !== 'string') {
    return { success: false, result: jsonStr, layersApplied: [], error: 'Input is not a string' };
  }
  const layersApplied = [];
  let current = jsonStr;

  const normalized = normalizeQuotesLayer(current);
  if (normalized !== current) layersApplied.push('normalizeQuotes');
  current = normalized;

  const escaped = escapeUnescapedQuotesLayer(current);
  if (!escaped.success) return { success: false, result: current, layersApplied, error: escaped.error };
  if (escaped.result !== current) layersApplied.push('escapeUnescapedQuotes');
  current = escaped.result;

  const ctrl = sanitizeControlCharsLayer(current);
  if (ctrl !== current) layersApplied.push('sanitizeControlChars');
  current = ctrl;

  const noTrailing = removeTrailingCommasLayer(current);
  if (noTrailing !== current) layersApplied.push('removeTrailingCommas');
  current = noTrailing;

  const fixedKeys = fixNumericKeysLayer(current);
  if (fixedKeys !== current) layersApplied.push('fixNumericKeys');
  current = fixedKeys;

  return { success: true, result: current, layersApplied, error: null };
}

// ════════════════════════════════════════════════════════════════
// 松散对象解析
// ════════════════════════════════════════════════════════════════

function splitTopLevelSegments(text, delimiterChar = ',') {
  if (typeof text !== 'string' || !text) return [];
  const segments = [];
  let current = '', inString = false, escapeNext = false;
  let braceDepth = 0, bracketDepth = 0, parenDepth = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (escapeNext) { current += char; escapeNext = false; continue; }
    if (char === '\\') { current += char; if (inString) escapeNext = true; continue; }
    if (char === '"') { current += char; inString = !inString; continue; }
    if (!inString) {
      if (char === '{') braceDepth++;
      else if (char === '}') braceDepth = Math.max(0, braceDepth - 1);
      else if (char === '[') bracketDepth++;
      else if (char === ']') bracketDepth = Math.max(0, bracketDepth - 1);
      else if (char === '(') parenDepth++;
      else if (char === ')') parenDepth = Math.max(0, parenDepth - 1);
      else if (char === delimiterChar && braceDepth === 0 && bracketDepth === 0 && parenDepth === 0) {
        if (current.trim()) segments.push(current.trim());
        current = '';
        continue;
      }
    }
    current += char;
  }
  if (current.trim()) segments.push(current.trim());
  return segments;
}

function findTopLevelDelimiterIndex(text, delimiterChar = ':') {
  if (typeof text !== 'string' || !text) return -1;
  let inString = false, escapeNext = false;
  let braceDepth = 0, bracketDepth = 0, parenDepth = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (escapeNext) { escapeNext = false; continue; }
    if (char === '\\') { if (inString) escapeNext = true; continue; }
    if (char === '"') { inString = !inString; continue; }
    if (!inString) {
      if (char === '{') braceDepth++;
      else if (char === '}') braceDepth = Math.max(0, braceDepth - 1);
      else if (char === '[') bracketDepth++;
      else if (char === ']') bracketDepth = Math.max(0, bracketDepth - 1);
      else if (char === '(') parenDepth++;
      else if (char === ')') parenDepth = Math.max(0, parenDepth - 1);
      else if (char === delimiterChar && braceDepth === 0 && bracketDepth === 0 && parenDepth === 0) return i;
    }
  }
  return -1;
}

function tryParseLooseJsonValue(rawValue) {
  if (typeof rawValue !== 'string') return { success: true, value: rawValue, error: null };
  const trimmed = rawValue.trim();
  if (!trimmed) return { success: false, value: null, error: 'Empty value' };
  const normalizedValue = (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ? `"${trimmed.slice(1, -1).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}"`
    : trimmed;
  const wrapped = `[${normalizedValue}]`;
  try { return { success: true, value: JSON.parse(wrapped)[0], error: null }; }
  catch (e) {
    const sanitized = sanitizeJsonPipeline(wrapped);
    if (sanitized.success) {
      try { return { success: true, value: JSON.parse(sanitized.result)[0], error: null }; }
      catch (_) { /* fall through */ }
    }
    return { success: false, value: null, error: e?.message || 'Failed to parse loose value' };
  }
}
function parseLooseObjectKey(rawKey) {
  const trimmed = typeof rawKey === 'string' ? rawKey.trim() : '';
  if (!trimmed) return null;
  if (/^-?\d+$/.test(trimmed)) return trimmed;
  const parsed = tryParseLooseJsonValue(trimmed);
  if (parsed.success && (typeof parsed.value === 'string' || typeof parsed.value === 'number')) return String(parsed.value);
  return trimmed.replace(/^["']|["']$/g, '');
}

function coerceLooseRowObject(jsonStr) {
  if (typeof jsonStr !== 'string') return { success: false, result: null, recoveredKeys: [], error: 'not a string' };
  const trimmed = jsonStr.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
    return { success: false, result: null, recoveredKeys: [], error: 'not an object literal' };
  }
  const body = trimmed.slice(1, -1).trim();
  if (!body) return { success: true, result: {}, recoveredKeys: [], error: null };
  const segments = splitTopLevelSegments(body, ',').filter(Boolean);
  if (!segments.length) return { success: false, result: null, recoveredKeys: [], error: 'no segments' };

  const result = {};
  let nextAutoKey = 0;
  for (const segment of segments) {
    const colonIndex = findTopLevelDelimiterIndex(segment, ':');
    if (colonIndex !== -1) {
      const parsedKey = parseLooseObjectKey(segment.slice(0, colonIndex));
      const parsedValue = tryParseLooseJsonValue(segment.slice(colonIndex + 1));
      if (!parsedKey || !parsedValue.success) {
        return { success: false, result: null, recoveredKeys: Object.keys(result), error: `Failed segment: ${segment}` };
      }
      result[parsedKey] = parsedValue.value;
      const numKey = parseInt(parsedKey, 10);
      if (!isNaN(numKey) && String(numKey) === parsedKey) nextAutoKey = Math.max(nextAutoKey, numKey + 1);
      continue;
    }
    const parsedValue = tryParseLooseJsonValue(segment);
    if (!parsedValue.success) {
      return { success: false, result: null, recoveredKeys: Object.keys(result), error: `Failed value: ${segment}` };
    }
    while (Object.prototype.hasOwnProperty.call(result, String(nextAutoKey))) nextAutoKey++;
    result[String(nextAutoKey)] = parsedValue.value;
    nextAutoKey++;
  }
  const recoveredKeys = Object.keys(result).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  if (!recoveredKeys.length) return { success: false, result: null, recoveredKeys: [], error: 'no keys recovered' };
  return { success: true, result, recoveredKeys, error: null };
}

// ════════════════════════════════════════════════════════════════
// tableEdit 标签提取
// ════════════════════════════════════════════════════════════════
function normalizeAiResponseText(text) {
  if (typeof text !== 'string') return '';
  let cleaned = text.trim();
  cleaned = cleaned.replace(/'\s*\+\s*'/g, '');
  if (cleaned.startsWith("'") && cleaned.endsWith("'")) cleaned = cleaned.slice(1, -1);
  cleaned = cleaned.replace(/\\n/g, '\n');
  cleaned = cleaned.replace(/\\\\"/g, '\\"');
  cleaned = cleaned.replace(/：/g, ':');
  return cleaned;
}

function extractTableEditBlocks(text) {
  const cleaned = normalizeAiResponseText(text);
  if (!cleaned) return [];

  const matches = [];
  EDIT_TAG_REGEX.lastIndex = 0;
  let m;
  while ((m = EDIT_TAG_REGEX.exec(cleaned)) !== null) {
    const inner = m[1];
    if (inner && inner.trim()) matches.push(inner);
  }
  if (matches.length) return matches;

  // fallback: comment blocks containing commands near tableEdit tags
  const hasCommands = (s) => /(insertRow|updateRow|deleteRow)\s*\(/.test(s);
  const commentRe = /<!--([\s\S]*?)-->/g;
  const candidates = [];
  while ((m = commentRe.exec(cleaned)) !== null) {
    if (hasCommands(m[1])) candidates.push(m[1]);
  }
  return candidates;
}

// ════════════════════════════════════════════════════════════════
// 指令重组：处理 AI 把一条指令拆成多行的情况
// ════════════════════════════════════════════════════════════════

function reconstructCommandLines(rawText) {
  const lines = rawText.split(/\r?\n/);
  const commandLines = [];
  let buffer = '';
  let isInJsonBlock = false;

  for (const rawLine of lines) {
    let line = rawLine.trim();
    if (!line) continue;
    if (!isInJsonBlock && line.includes('//') && !line.includes('"//') && !line.includes("'//")) {
      line = line.split('//')[0].trim();
    }
    if (!line) continue;
    const isNewCommand = /^(insertRow|updateRow|deleteRow)\s*\(/.test(line);
    if (isNewCommand && !isInJsonBlock) {
      if (buffer) commandLines.push(buffer);
      buffer = line;
    } else {
      buffer += (buffer ? ' ' : '') + line;
    }
    if (buffer) {
      const opens = (buffer.match(/\{/g) || []).length;
      const closes = (buffer.match(/\}/g) || []).length;
      isInJsonBlock = opens > closes;
    }
  }
  if (buffer) commandLines.push(buffer);

  // 二次处理：拆分挤在一行里的多条指令
  const result = [];
  for (const line of commandLines) {
    const pattern = /(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g;
    const positions = [];
    let match;
    while ((match = pattern.exec(line)) !== null) {
      positions.push(match.index + (match[0].length - match[1].length));
    }
    if (positions.length <= 1) {
      result.push(line.replace(/;\s*$/, ''));
    } else {
      for (let i = 0; i < positions.length; i++) {
        const start = positions[i];
        const end = i + 1 < positions.length ? positions[i + 1] : line.length;
        const sub = line.substring(start, end).replace(/;\s*$/, '').trim();
        if (sub) result.push(sub);
      }
    }
  }
  return result;
}

// ════════════════════════════════════════════════════════════════
// 单条指令解析
// ════════════════════════════════════════════════════════════════

function parseCommandLine(rawLine) {
  try {
    let line = rawLine;
    if (line.match(/\)\s*;?\s*\/\/.*$/)) line = line.replace(/\/\/.*$/, '').trim();
    if (!line) return null;
    const match = line.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);
    if (!match) return null;
    const command = match[1];
    const argsString = match[2];
    const firstBracket = argsString.indexOf('{');
    if (firstBracket === -1) {
      return { command, args: JSON.parse(`[${argsString}]`), line };
    }

    const paramsPart = argsString.substring(0, firstBracket).trim();
    let jsonPart = argsString.substring(firstBracket);
    const initialArgs = JSON.parse(`[${paramsPart.replace(/,$/, '')}]`);

    // 尝试直接解析
    try {
      return { command, args: [...initialArgs, JSON.parse(jsonPart)], line };
    } catch (_) { /* fall through to recovery */ }

    // 恢复链：先尝试原始松散解析
    const looseOriginal = coerceLooseRowObject(jsonPart);
    if (looseOriginal.success) {
      return { command, args: [...initialArgs, looseOriginal.result], line };
    }

    // 再尝试清洗管线
    const sanitized = sanitizeJsonPipeline(jsonPart);
    if (!sanitized.success) return null;

    try {
      return { command, args: [...initialArgs, JSON.parse(sanitized.result)], line };
    } catch (_) { /* fall through */ }

    // 最后尝试清洗后松散解析
    const looseSanitized = coerceLooseRowObject(sanitized.result);
    if (looseSanitized.success) {
      return { command, args: [...initialArgs, looseSanitized.result], line };
    }
    return null;
  } catch (e) {
    return null;
  }
}

// ════════════════════════════════════════════════════════════════
// 公共 API
// ════════════════════════════════════════════════════════════════

function normalizeCommandToEdit(parsed) {
  if (!parsed) return null;
  const { command, args } = parsed;
  if (command === 'insertRow') {
    const tableIndex = typeof args[0] === 'number' ? args[0] : 0;
    const data = (typeof args[1] === 'object' && args[1] !== null) ? args[1] : {};
    return { op: command, tableIndex, data };
  }
  if (command === 'deleteRow') {
    const tableIndex = typeof args[0] === 'number' ? args[0] : 0;
    const rowIndex = typeof args[1] === 'number' ? args[1] : 0;
    return { op: command, tableIndex, rowIndex };
  }
  if (command === 'updateRow') {
    const tableIndex = typeof args[0] === 'number' ? args[0] : 0;
    const rowIndex = typeof args[1] === 'number' ? args[1] : 0;
    const data = (typeof args[2] === 'object' && args[2] !== null) ? args[2] : {};
    return { op: command, tableIndex, rowIndex, data };
  }
  return null;
}

function parseIncrementalEdits(text) {
  const blocks = extractTableEditBlocks(text);
  if (!blocks.length) return null;

  const edits = [];
  const failedLines = [];
  for (const block of blocks) {
    const stripped = block.replace(/<!--|-->/g, '').trim();
    if (!stripped) continue;
    const lines = reconstructCommandLines(stripped);
    for (const line of lines) {
      const parsed = parseCommandLine(line);
      const edit = normalizeCommandToEdit(parsed);
      if (edit) {
        edits.push(edit);
      } else if (line && /^(insertRow|updateRow|deleteRow)/.test(line)) {
        // v1.0.192：记录解析失败的行（疑似 AI 给的指令但解析失败 → 后续会以空行写入）
        failedLines.push(line.slice(0, 200));
      }
    }
  }

  // 通过 console.warn 直接 surface（不依赖 logger 因为 sanitizer 是纯函数模块）
  if (failedLines.length > 0) {
    try {
      console.warn('[TableJsonSanitizer] parseIncrementalEdits: %d 条指令解析失败', failedLines.length, failedLines);
    } catch (_) {}
  }
  return edits.length ? edits : null;
}
function parseFullReplacement(text) {
  // 尝试 fenced code block
  FENCED_REGEX.lastIndex = 0;
  let m;
  while ((m = FENCED_REGEX.exec(text)) !== null) {
    const inner = m[1].trim();
    if (!inner) continue;
    try { return JSON.parse(inner); }
    catch (_) {
      const sanitized = sanitizeJsonPipeline(inner);
      if (sanitized.success) {
        try { return JSON.parse(sanitized.result); } catch (_) { /* continue */ }
      }
    }
  }

  // 尝试直接解析整段文本
  const trimmed = text.trim();
  try { return JSON.parse(trimmed); }
  catch (_) { /* fall through */ }

  // 尝试清洗后解析
  const sanitized = sanitizeJsonPipeline(trimmed);
  if (sanitized.success) {
    try { return JSON.parse(sanitized.result); } catch (_) { /* fall through */ }
  }

  // 尝试提取最外层 { } 或 [ ]
  const braceStart = trimmed.indexOf('{');
  const bracketStart = trimmed.indexOf('[');
  let start = -1, openChar = '', closeChar = '';
  if (braceStart !== -1 && (bracketStart === -1 || braceStart < bracketStart)) {
    start = braceStart; openChar = '{'; closeChar = '}';
  } else if (bracketStart !== -1) {
    start = bracketStart; openChar = '['; closeChar = ']';
  }
  if (start === -1) return null;

  let depth = 0, end = -1, inStr = false, esc = false;
  for (let i = start; i < trimmed.length; i++) {
    const c = trimmed[i];
    if (esc) { esc = false; continue; }
    if (c === '\\' && inStr) { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (!inStr) {
      if (c === openChar) depth++;
      else if (c === closeChar) { depth--; if (depth === 0) { end = i; break; } }
    }
  }
  if (end === -1) return null;

  const extracted = trimmed.substring(start, end + 1);
  try { return JSON.parse(extracted); }
  catch (_) {
    const s = sanitizeJsonPipeline(extracted);
    if (s.success) { try { return JSON.parse(s.result); } catch (_) { /* give up */ } }
  }
  return null;
}

function sanitizeAIResponse(text) {
  if (!text || typeof text !== 'string') return { mode: 'empty', edits: null, tables: null };

  // v1.0.201 Task C 注：完整协议适配器（DSL/SQL/JSON envelope）在 update-service
  // 调用本函数前已经先 try parseAiResponseAuto。这里保留兜底的 DSL → JSON envelope
  // 链路（不依赖 adapter，避免循环 import，保证 ESM bundle 不挂）

  const edits = parseIncrementalEdits(text);
  if (edits) return { mode: 'incremental', edits, tables: null };

  const full = parseFullReplacement(text);
  if (full) {
    let tablesArr = null;
    if (Array.isArray(full)) {
      tablesArr = full;
    } else if (full && Array.isArray(full.tables)) {
      tablesArr = full.tables;
    } else if (full && typeof full === 'object') {
      for (const v of Object.values(full)) {
        if (Array.isArray(v)) { tablesArr = v; break; }
      }
    }
    if (Array.isArray(tablesArr)) {
      return { mode: 'full', edits: null, tables: tablesArr };
    }
  }

  return { mode: 'empty', edits: null, tables: null };
}

// ════════════════════════════════════════════════════════════════
// Exports
// ════════════════════════════════════════════════════════════════

export {
  sanitizeJsonPipeline,
  coerceLooseRowObject,
  parseCommandLine,
  reconstructCommandLines,
  extractTableEditBlocks,
  parseIncrementalEdits,
  parseFullReplacement,
  sanitizeAIResponse,
};
