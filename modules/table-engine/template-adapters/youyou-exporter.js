/**
 * YouYou Toolkit - YouYou 原生模板导出适配器（占位）
 *
 * 议题 #15 模板适配器架构（v1.0.186+）：
 *   本轮仅占位，对应 table-template-service.exportUserTemplates 的现有行为。
 *   下轮配合 UI 格式选择 dropdown 时，shujuku-exporter 和 sillytavern-exporter 一起做。
 */

export const youyouExporter = Object.freeze({
  formatId: 'youyou',
  displayName: 'YouYou 原生 (.json)',
  fileExtension: '.json',
  mimeType: 'application/json',

  /**
   * 序列化模板列表为 youyou 原生导出格式。
   * @param {Array} templates - 标准化后的模板对象数组
   * @returns {{ version: number, exportedAt: string, templates: Array }}
   */
  serialize(templates) {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      templates: Array.isArray(templates) ? templates : []
    };
  }
});

export default youyouExporter;
