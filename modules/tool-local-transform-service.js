/**
 * YouYou Toolkit - 本地文本转换服务
 * @description 为本地工具提供纯文本转换能力
 */

const ESCAPE_PAIRS = [
  {
    key: 'newline',
    plain: /\r\n|\r|\n/g,
    escaped: /\\n/g,
    replacement: '\\n',
    unescaped: '\n'
  },
  {
    key: 'doubleQuote',
    plain: /"/g,
    escaped: /\\"/g,
    replacement: '\\"',
    unescaped: '"'
  },
  {
    key: 'singleQuote',
    plain: /'/g,
    escaped: /\\'/g,
    replacement: "\\'",
    unescaped: "'"
  }
];

const PUNCTUATION_PAIRS = [
  { key: 'comma', from: /,/g, to: '，' },
  { key: 'period', from: /\./g, to: '。' },
  { key: 'exclamation', from: /!/g, to: '！' },
  { key: 'question', from: /\?/g, to: '？' },
  { key: 'semicolon', from: /;/g, to: '；' },
  { key: 'colon', from: /:/g, to: '：' },
  { key: 'leftParen', from: /\(/g, to: '（' },
  { key: 'rightParen', from: /\)/g, to: '）' }
];

export const LOCAL_PROCESSOR_TYPES = {
  ESCAPE_TRANSFORM: 'escape_transform',
  PUNCTUATION_TRANSFORM: 'punctuation_transform'
};

function normalizeProcessorOptions(options = {}) {
  if (!options || typeof options !== 'object') {
    return {};
  }

  return Object.entries(options).reduce((result, [key, value]) => {
    result[key] = value === true;
    return result;
  }, {});
}

function applyEscapeTransform(text, processor = {}) {
  const direction = processor?.direction === 'unescape' ? 'unescape' : 'escape';
  const options = normalizeProcessorOptions(processor?.options);

  return ESCAPE_PAIRS.reduce((result, item) => {
    if (options[item.key] !== true) {
      return result;
    }

    if (direction === 'unescape') {
      return result.replace(item.escaped, item.unescaped);
    }

    return result.replace(item.plain, item.replacement);
  }, String(text || ''));
}

function applyPunctuationTransform(text, processor = {}) {
  const direction = processor?.direction || 'en_to_zh';
  if (direction !== 'en_to_zh') {
    return String(text || '');
  }

  const options = normalizeProcessorOptions(processor?.options);

  return PUNCTUATION_PAIRS.reduce((result, item) => {
    if (options[item.key] !== true) {
      return result;
    }

    return result.replace(item.from, item.to);
  }, String(text || ''));
}

export function runLocalTextTransform(toolConfig, sourceText) {
  const processor = toolConfig?.processor || {};
  const type = processor?.type || '';
  const input = String(sourceText || '');

  switch (type) {
    case LOCAL_PROCESSOR_TYPES.ESCAPE_TRANSFORM:
      return applyEscapeTransform(input, processor);
    case LOCAL_PROCESSOR_TYPES.PUNCTUATION_TRANSFORM:
      return applyPunctuationTransform(input, processor);
    default:
      return input;
  }
}

export default {
  LOCAL_PROCESSOR_TYPES,
  runLocalTextTransform
};