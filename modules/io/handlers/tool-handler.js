/**
 * YouYou Toolkit - Tool Definition IO Handler
 *
 * 包装 tool-manager.js 的工具导入/导出。
 * 数据结构：{ tools: { [id]: def }, presets: { [name]: data } }
 * 覆盖模式清空后导入，合并模式保留已有再叠加。
 */

import { logger } from '../../core/logger-service.js';
import { exportTools, importTools } from '../../tool-manager.js';

const log = logger.createScope('ToolIO');

export const toolHandler = {
  kind: 'tool',
  displayName: '工具',
  supportsOverwrite: true,

  parse(raw) {
    if (!raw || typeof raw !== 'object') return null;
    if (!raw.tools && !raw.presets) return null;
    log.info('格式探测命中', {
      formatId: 'tool-envelope',
      toolCount: raw.tools ? Object.keys(raw.tools).length : 0,
      presetCount: raw.presets ? Object.keys(raw.presets).length : 0
    });
    return raw;
  },

  applyImport(parsed, { overwrite = false } = {}) {
    if (!parsed) return { imported: 0, skipped: 0, errors: [] };
    // importTools 接收 JSON string，中心传的是 parsed object
    const jsonString = JSON.stringify(parsed);
    const result = importTools(jsonString, { overwrite });
    log.info('applyImport', {
      toolsImported: result.toolsImported || 0,
      presetsImported: result.presetsImported || 0
    });
    return {
      imported: (result.toolsImported || 0) + (result.presetsImported || 0),
      skipped: 0,
      errors: result.success === false ? [result.message || '导入失败'] : []
    };
  },

  serialize() {
    // exportTools 返回 JSON string，需要 parse 回来
    const jsonString = exportTools();
    try { return JSON.parse(jsonString); } catch (_) { return JSON.parse(jsonString); }
  }
};
