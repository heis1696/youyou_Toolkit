/**
 * YouYou Toolkit - AI 响应 JSON 清洗器
 * @description 多层清洗流水线，处理 AI 返回的损坏 JSON / 增量编辑标签
 */

const EDIT_TAG_REGEX = /<tableEdit>([\s\S]*?)<\/tableEdit>/g;

const FENCED_REGEX = /```(?:json)?\s*([\s\S]*?)```/gi;

const INCREMENTAL_LINE_REGEX = /(insertRow|updateRow|deleteRow)\s*\(/g;

function extractLastTableEditBlock(text) {
  const matches = [];
  let match;
  EDIT_TAG_REGEX.lastIndex = 0;
  while ((match = EDIT_TAG_REGEX.exec(text)) !== null) {
    matches.push(match[1].trim());
  }
  return matches.length > 0 ? matches[matches.length - 1] : '';
}

function parseEditsFromBlock(block) {
  const edits = [];
  const lines = block.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  let buffer = '';
  for (const line of lines) {
    buffer += line;
    if (buffer.includes('(') && buffer.includes(')')) {
      const funcMatch = buffer.match(/(insertRow|updateRow|deleteRow)\s*\(\s*(-?\d+)\s*,?\s*(-?\d+)?\s*,?\s*(.*?)?\)\s*;?\s*$/);
      if (funcMatch) {
        const op = funcMatch[1];
        const tableIndex = parseInt(funcMatch[2], 10);
        const secondArg = funcMatch[3] !== undefined ? parseInt(funcMatch[3], 10) : undefined;

        let data = {};
        const trailing = funcMatch[4];
        if (trailing) {
          try {
            data = JSON.parse(trailing);
          } catch (_) {
            data = parseLooseObject(trailing);
          }
        }

        if (op === 'insertRow') {
          edits.push({ op, tableIndex, rowIndex: -1, data: secondArg !== undefined && typeof secondArg === 'number' && !trailing ? {} : (typeof secondArg === 'number' ? data : (typeof secondArg === 'object' ? secondArg : data)) });
          if (op === 'insertRow' && secondArg !== undefined && typeof secondArg === 'object') {
            edits[edits.length - 1].data = secondArg;
          }
        } else {
          edits.push({ op, tableIndex, rowIndex: secondArg ?? -1, data });
        }
      }
      buffer = '';
    }
  }

  return edits;
}

function parseLooseObject(str) {
  if (!str || typeof str !== 'string') return {};
  const result = {};
  const cleaned = str.replace(/^\{|\}$/g, '').trim();
  if (!cleaned) return result;

  const pairs = splitTopLevel(cleaned, ',');
  for (const pair of pairs) {
    const colonIdx = pair.indexOf(':');
    if (colonIdx < 0) continue;
    const key = pair.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '');
    let value = pair.slice(colonIdx + 1).trim();
    value = value.replace(/^["']|["']$/g, '');
    if (key) result[key] = value;
  }
  return result;
}

function splitTopLevel(str, delimiter) {
  const parts = [];
  let depth = 0;
  let current = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      current += ch;
      if (ch === stringChar && str[i - 1] !== '\\') inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
      current += ch;
      continue;
    }
    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') depth--;
    if (ch === delimiter && depth === 0) {
      parts.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function cleanJsonCandidate(text) {
  let cleaned = text.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
  cleaned = cleaned.replace(/'/g, '"');
  return cleaned;
}

function tryUnwrapStringLayers(text) {
  let result = text;
  for (let i = 0; i < 3; i++) {
    if ((result.startsWith('"') && result.endsWith('"')) ||
        (result.startsWith("'") && result.endsWith("'"))) {
      try {
        const inner = JSON.parse(result);
        if (typeof inner === 'string') result = inner;
        else break;
      } catch (_) {
        break;
      }
    } else {
      break;
    }
  }
  return result;
}

export function parseIncrementalEdits(text) {
  const block = extractLastTableEditBlock(text);
  if (!block) return null;
  const edits = parseEditsFromBlock(block);
  return edits.length > 0 ? edits : null;
}

export function parseFullReplacement(text) {
  const candidates = [];
  const push = (v) => { const s = String(v || '').trim(); if (s && !candidates.includes(s)) candidates.push(s); };

  FENCED_REGEX.lastIndex = 0;
  let m;
  while ((m = FENCED_REGEX.exec(text)) !== null) push(m[1]);

  push(text);

  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) push(text.slice(firstBrace, lastBrace + 1));

  const firstBracket = text.indexOf('[');
  const lastBracket = text.lastIndexOf(']');
  if (firstBracket >= 0 && lastBracket > firstBracket) push(text.slice(firstBracket, lastBracket + 1));

  for (const raw of candidates) {
    let parsed = null;

    try { parsed = JSON.parse(raw); } catch (_) {}

    if (!parsed) {
      try { parsed = JSON.parse(cleanJsonCandidate(raw)); } catch (_) {}
    }

    if (!parsed) {
      const unwrapped = tryUnwrapStringLayers(raw);
      if (unwrapped !== raw) {
        try { parsed = JSON.parse(unwrapped); } catch (_) {}
        if (!parsed) {
          try { parsed = JSON.parse(cleanJsonCandidate(unwrapped)); } catch (_) {}
        }
      }
    }

    if (parsed) {
      let tables = null;
      if (Array.isArray(parsed)) tables = parsed;
      else if (Array.isArray(parsed.tables)) tables = parsed.tables;
      else if (parsed.data && Array.isArray(parsed.data.tables)) tables = parsed.data.tables;
      if (tables) return tables;
    }
  }

  return null;
}

export function sanitizeAIResponse(text) {
  if (!text || typeof text !== 'string') return { mode: 'empty', edits: null, tables: null };

  const edits = parseIncrementalEdits(text);
  if (edits) return { mode: 'incremental', edits, tables: null };

  const tables = parseFullReplacement(text);
  if (tables) return { mode: 'full', edits: null, tables };

  return { mode: 'empty', edits: null, tables: null };
}
