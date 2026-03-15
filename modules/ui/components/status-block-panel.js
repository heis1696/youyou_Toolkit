/**
 * YouYou Toolkit - 主角状态栏面板组件
 * @description 精简版工具配置面板
 * @version 4.1.0
 */

import { createToolConfigPanel } from './tool-config-panel-factory.js';

export const StatusBlockPanel = createToolConfigPanel({
  id: 'statusBlockPanel',
  toolId: 'statusBlock',
  postResponseHint: '监听 AI 回复结束后，调用额外模型生成主角状态栏。',
  extractionPlaceholder: '每行一个标签，如 status_block\n或 regex:<status_block>([\\s\\S]*?)</status_block>',
  previewDialogId: 'status-extraction-preview',
  defaultInjectionOrder: 10001,
  lorebookLogTag: 'StatusBlockPanel'
});

export default StatusBlockPanel;