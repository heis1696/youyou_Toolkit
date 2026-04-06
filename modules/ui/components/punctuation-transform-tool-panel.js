/**
 * YouYou Toolkit - 中文标点替换工具面板组件
 */

import { createLocalTransformToolPanel } from './local-transform-tool-panel-factory.js';

export const PunctuationTransformToolPanel = createLocalTransformToolPanel({
  id: 'punctuationTransformToolPanel',
  toolId: 'punctuationTransformTool',
  previewDialogId: 'punctuation-transform-extraction-preview',
  previewTitle: '中文标点替换提取预览',
  heroHint: '从最近 AI 消息提取文本后，在本地把英文标点替换成中文标点，再按所选方式写回。',
  extractionPlaceholder: '每行一个标签，如 content\n或 regex:<content>([\\s\\S]*?)</content>',
  processorDirections: [
    {
      key: 'en_to_zh',
      label: '英文转中文',
      description: '按勾选项把英文标点替换为中文标点。'
    }
  ],
  processorOptions: [
    { key: 'comma', label: '逗号 ,', description: '替换为中文逗号。' },
    { key: 'period', label: '句号 .', description: '替换为中文句号。' },
    { key: 'exclamation', label: '感叹号 !', description: '替换为中文感叹号。' },
    { key: 'question', label: '问号 ?', description: '替换为中文问号。' },
    { key: 'semicolon', label: '分号 ;', description: '替换为中文分号。' },
    { key: 'colon', label: '冒号 :', description: '替换为中文冒号。' },
    { key: 'leftParen', label: '左括号 (', description: '替换为中文左括号。' },
    { key: 'rightParen', label: '右括号 )', description: '替换为中文右括号。' }
  ]
});

export default PunctuationTransformToolPanel;