/**
 * YouYou Toolkit - 填表 schema 工具助手
 *
 * 议题 #15 #16 阶段 2（v1.0.193+）：
 *   从 table-schema-service.js 拆出与模板格式无关的纯工具函数。
 *   v1.0.186 已经 export 给 template-adapters/shujuku-importer 使用，
 *   现在正式独立到本模块，schema-service 仍 re-export 保持向后兼容。
 *
 * 拆分原则：
 *   - 纯函数，无副作用，无外部依赖（除标准 JS）
 *   - 不引用 schema-service 或任何 service
 *   - 后续 normalize / validate / config 模块都可以依赖本模块
 */

function normalizeString(value, fallback = '') {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

/**
 * 把任意值规范化为 cell 内容（用于行内单元格）。
 * - null/undefined → 空字符串
 * - 字符串 → 原样
 * - 其它 → JSON.stringify（带缩进），失败回退 String()
 */
export function normalizeCellValue(value) {
  if (value === undefined || value === null) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch (_) {
    return String(value);
  }
}

/**
 * 把任意名称规范化为 column key（仅 a-z0-9_，开头结尾不带下划线）。
 * 注意：中文会被全部替换为下划线，最终归零 → fallback。
 *
 * @param {string} value - 原始 key/title
 * @param {string} [fallback='col'] - 兜底
 * @returns {string}
 */
export function sanitizeColumnKey(value, fallback = 'col') {
  const normalized = normalizeString(value, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return normalized || fallback;
}

/**
 * 在 usedKeys 集合中分配唯一的 column key。
 * 冲突时追加 _2、_3、…
 *
 * @param {string} baseKey - 期望的 key（会先 sanitize）
 * @param {Set<string>} [usedKeys=new Set()] - 已用 key 集合（会被 mutate 加入新 key）
 * @returns {string} 最终分配的唯一 key
 */
export function ensureUniqueColumnKey(baseKey, usedKeys = new Set()) {
  const base = sanitizeColumnKey(baseKey, 'col');
  let candidate = base;
  let suffix = 2;

  while (usedKeys.has(candidate)) {
    candidate = `${base}_${suffix}`;
    suffix += 1;
  }

  usedKeys.add(candidate);
  return candidate;
}
