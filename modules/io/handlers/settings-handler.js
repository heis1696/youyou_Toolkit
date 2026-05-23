/**
 * YouYou Toolkit - Settings IO Handler
 *
 * 全局设置导出（仅导出，不支持导入）。
 * 包装 storage-service 的 exportAll。
 */

import { logger } from '../../core/logger-service.js';
import { storage } from '../../core/storage-service.js';

const log = logger.createScope('SettingsIO');

export const settingsHandler = {
  kind: 'settings',
  displayName: '全局设置',
  supportsOverwrite: false,

  parse() {
    // 不支持导入
    return null;
  },

  applyImport() {
    return { imported: 0, skipped: 0, errors: ['全局设置不支持导入'] };
  },

  serialize() {
    const data = storage.exportAll();
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      data
    };
  }
};
