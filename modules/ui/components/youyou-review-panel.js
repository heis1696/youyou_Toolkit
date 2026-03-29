/**
 * YouYou Toolkit - 小幽点评面板组件
 * @description 精简版工具配置面板
 */

import { createToolConfigPanel } from './tool-config-panel-factory.js';

export const YouyouReviewPanel = createToolConfigPanel({
  id: 'youyouReviewPanel',
  toolId: 'youyouReview',
  postResponseHint: '点击“立即执行一次”后，调用额外模型在末尾生成小幽点评与剧情钩子。',
  extractionPlaceholder: '每行一个标签，如 youyou\n或 regex:<youyou>([\\s\\S]*?)</youyou>',
  previewDialogId: 'youyou-review-extraction-preview',
  previewTitle: '小幽点评提取预览'
});

export default YouyouReviewPanel;