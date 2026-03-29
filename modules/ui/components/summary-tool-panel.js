/**
 * YouYou Toolkit - 摘要工具面板组件
 * @description 精简版工具配置面板
 * @version 4.1.0
 */

import { createToolConfigPanel } from './tool-config-panel-factory.js';

export const SummaryToolPanel = createToolConfigPanel({
  id: 'summaryToolPanel',
  toolId: 'summaryTool',
  postResponseHint: '点击“立即执行一次”后，调用额外模型进行摘要解析。',
  extractionPlaceholder: '每行一个标签，如 boo_FM\n或 regex:<boo_FM>([\\s\\S]*?)</boo_FM>',
  previewDialogId: 'summary-extraction-preview',
  defaultInjectionOrder: 10000,
  lorebookLogTag: 'SummaryToolPanel'
});

export default SummaryToolPanel;