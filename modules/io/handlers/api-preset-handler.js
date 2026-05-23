/**
 * YouYou Toolkit - API Preset IO Handler
 *
 * 包装 preset-manager.js 的导出/导入。
 * parse: 解包单条/数组 → 统一为数组
 * applyImport: 按 name 去重 + 覆盖/跳过
 * serialize: 导出全部或指定 name
 */

import { logger } from '../../core/logger-service.js';
import {
  getAllPresets,
  exportPresets,
  importPresets as importRaw
} from '../../preset-manager.js';

const log = logger.createScope('ApiPresetIO');

export const apiPresetHandler = {
  kind: 'apiPreset',
  displayName: 'API 预设',
  supportsOverwrite: true,

  parse(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const items = Array.isArray(raw) ? raw : [raw];
    const valid = items.filter(p => p && typeof p === 'object' && typeof p.name === 'string' && p.name && p.apiConfig && typeof p.apiConfig === 'object');
    if (valid.length === 0) return null;
    log.info('格式探测命中', { formatId: 'api-preset', count: valid.length });
    return valid;
  },

  applyImport(parsed, { overwrite = false } = {}) {
    if (!parsed?.length) return { imported: 0, skipped: 0, errors: [] };
    // importPresets 接收 JSON string
    const jsonString = JSON.stringify(parsed.length === 1 ? parsed[0] : parsed);
    const result = importRaw(jsonString, { overwrite });
    log.info('applyImport', { imported: result.imported || 0 });
    return {
      imported: result.imported || 0,
      skipped: 0,
      errors: result.success === false ? [result.message || '导入失败'] : []
    };
  },

  serialize(options = {}) {
    if (options.selectedId) {
      const jsonString = exportPresets(options.selectedId);
      try {
        const single = JSON.parse(jsonString);
        return { version: 1, exportedAt: new Date().toISOString(), presets: [single] };
      } catch (_) { /* fallback */ }
    }
    const jsonString = exportPresets();
    try {
      const all = JSON.parse(jsonString);
      return { version: 1, exportedAt: new Date().toISOString(), presets: Array.isArray(all) ? all : [all] };
    } catch (_) {
      return { version: 1, exportedAt: new Date().toISOString(), presets: [] };
    }
  }
};
