/**
 * YouYou Toolkit - 转义处理工具面板组件
 */

import { createLocalTransformToolPanel } from './local-transform-tool-panel-factory.js';

export const EscapeTransformToolPanel = createLocalTransformToolPanel({
  id: 'escapeTransformToolPanel',
  toolId: 'escapeTransformTool',
  previewDialogId: 'escape-transform-extraction-preview',
  previewTitle: '转义处理提取预览',
  heroHint: '从最近 AI 消息提取文本后，在本地执行转义或去转义，再按所选方式写回。',
  extractionPlaceholder: '每行一个标签或正则，例如：\ncontent\nregex:<content>([\\s\\S]*?)</content>',
  processorDirections: [
    {
      key: 'escape',
      label: '转义',
      description: '把原始字符转换成转义序列。'
    },
    {
      key: 'unescape',
      label: '去转义',
      description: '把转义序列还原成原始字符。'
    }
  ],
  processorOptions: [
    {
      key: 'doubleQuote',
      label: '双引号',
      description: '处理 " 与 \\"。'
    },
    {
      key: 'singleQuote',
      label: '单引号',
      description: '处理 \' 与 \\\'。'
    },
    {
      key: 'newline',
      label: '换行符',
      description: '处理换行与 \\n。'
    }
  ]
});

export default EscapeTransformToolPanel;