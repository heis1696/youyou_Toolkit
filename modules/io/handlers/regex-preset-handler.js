/**
 * YouYou Toolkit - Regex Preset IO Handler
 *
 * 包装 regex-preset-store.js 的导出/导入。
 * 导入总是 append（生成新 ID），不做去重。
 */

import { logger } from '../../core/logger-service.js';
import store from '../../regex-preset-store.js';

const log = logger.createScope('RegexPresetIO');

export const regexPresetHandler = {
  kind: 'regexPreset',
  displayName: '正则提取预设',
  supportsOverwrite: false,

  parse(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const list = Array.isArray(raw.presets) ? raw.presets : (Array.isArray(raw) ? raw : null);
    if (!list || list.length === 0) return null;
    log.info('格式探测命中', { formatId: 'envelope', count: list.length });
    return list;
  },

  applyImport(parsed) {
    if (!parsed?.length) return { imported: 0, skipped: 0, errors: [] };
    const result = store.importPresets({ presets: parsed });
    log.info('applyImport', { added: result.added || 0 });
    return { imported: result.added || 0, skipped: 0, errors: [] };
  },

  serialize(options = {}) {
    const all = store.exportAll();
    if (options.selectedId) {
      const found = (all.presets || []).find(p => p.id === options.selectedId);
      return {
        version: 1,
        exportedAt: Date.now(),
        presets: found ? [found] : (all.presets || [])
      };
    }
    return all;
  }
};
