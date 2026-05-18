/**
 * YouYou Toolkit - 模板格式适配器注册中心
 *
 * 议题 #15 模板适配器架构（v1.0.186+）：
 *   - 注册中心收集所有 importer / exporter
 *   - importTemplateAuto 按注册顺序探测，第一个 detect 命中且 parse 成功的胜出
 *   - 失败时返回 null，调用方自行兜底
 *
 * 添加新格式的步骤：
 *   1. 新建 modules/table-engine/template-adapters/<format>-importer.js
 *   2. 实现 { formatId, displayName, detect, parse } 接口
 *   3. 在本文件 importerRegistry 数组里按优先级插入
 *
 * 设计原则（跟项目惯例对齐）：
 *   - object literal 风格，不用 class 继承
 *   - detect 宽松（够格被尝试），parse 严格（失败抛错或返回 null）
 *   - 每个 importer 自洽，不互相依赖
 */

import { logger } from '../../core/logger-service.js';
import { youyouImporter } from './youyou-importer.js';
import { shujukuImporter } from './shujuku-importer.js';
import { youyouExporter } from './youyou-exporter.js';

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('TemplateAdapter');
  return _log;
}

// ════════════════════════════════════════════════════════════════
// 注册中心
// ════════════════════════════════════════════════════════════════

/**
 * Importer 注册表。顺序很重要 — 先严格的 youyou 原生，后宽松的 shujuku。
 * 如果两个 importer 都 detect 命中同一份数据（理论上不应该），用第一个。
 */
export const importerRegistry = Object.freeze([
  youyouImporter,    // 优先 youyou 原生：value.tables is array
  shujukuImporter,   // 然后 shujuku：value 含 sheet_xxx
  // 未来：sillytavernLorebookImporter, ...
]);

/**
 * Exporter 注册表（占位，本轮 v1.0.186 仅 youyou 一种）。
 */
export const exporterRegistry = Object.freeze([
  youyouExporter
]);

// ════════════════════════════════════════════════════════════════
// 自动识别 + 解析
// ════════════════════════════════════════════════════════════════

/**
 * 自动探测格式并解析为 youyou 标准模板对象。
 *
 * @param {*} raw - 原始模板数据（任何格式）
 * @returns {{ tables: Array, name?: string, description?: string, promptTemplate?: string, formatId: string } | null}
 *          解析成功返回带 formatId 的标准模板；全部 importer 都不匹配返回 null
 */
export function importTemplateAuto(raw) {
  if (raw === null || raw === undefined) return null;

  for (const importer of importerRegistry) {
    let detected = false;
    try {
      detected = importer.detect(raw);
    } catch (err) {
      getLog().warn(`importer ${importer.formatId} detect 抛错`, err);
      continue;
    }
    if (!detected) continue;

    try {
      const parsed = importer.parse(raw);
      if (parsed && Array.isArray(parsed.tables)) {
        getLog().info('适配器命中', {
          formatId: importer.formatId,
          displayName: importer.displayName,
          tableCount: parsed.tables.length,
          firstTableName: parsed.tables[0]?.name || ''
        });
        return { ...parsed, formatId: importer.formatId };
      } else {
        getLog().warn(`importer ${importer.formatId} parse 返回无效结构`, {
          hasResult: !!parsed,
          hasTablesArray: Array.isArray(parsed?.tables)
        });
      }
    } catch (err) {
      getLog().warn(`importer ${importer.formatId} parse 抛错，尝试下一个`, err);
    }
  }

  getLog().warn('importTemplateAuto: 无适配器命中', {
    isObject: raw && typeof raw === 'object',
    isArray: Array.isArray(raw),
    keys: raw && typeof raw === 'object' ? Object.keys(raw).slice(0, 10) : []
  });
  return null;
}

// ════════════════════════════════════════════════════════════════
// 自动选择 + 序列化（占位）
// ════════════════════════════════════════════════════════════════

/**
 * 选择 exporter 并序列化模板列表。本轮固定走 youyouExporter。
 *
 * @param {Array} templates - 标准化后的模板对象数组
 * @param {string} [formatId='youyou'] - 目标格式 id
 * @returns {*} 序列化后的对象（调用方自行 JSON.stringify）
 */
export function exportTemplatesAs(templates, formatId = 'youyou') {
  const exporter = exporterRegistry.find((e) => e.formatId === formatId) || youyouExporter;
  return exporter.serialize(templates);
}
