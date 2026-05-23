/**
 * YouYou Toolkit - Bypass (AI 指令预设) IO Handler
 *
 * 包装 bypass-manager.js 的导出/导入。
 * 支持 3 种输入格式：prompt-group 数组、envelope、原始预设
 * 含宏替换归一化（$0 → {{toolContentMacro}} 等）
 */

import { logger } from '../../core/logger-service.js';
import { storage } from '../../core/storage-service.js';

const BYPASS_PRESETS_KEY = 'bypass_presets';
const log = logger.createScope('BypassIO');

const MACRO_MAP = {
  '$0': '{{toolContentMacro}}',
  '$1': '{{lastUserMessage}}',
  '$4': '{{lastAiMessage}}',
  '$8': '{{extractedContent}}',
  '$C': '{{toolWorldbookContent}}'
};

function looksLikePromptGroupMessage(msg) {
  return msg && typeof msg === 'object' && typeof msg.content === 'string' && !msg.name && !Array.isArray(msg.messages);
}

function normalizeImportedContent(text) {
  if (typeof text !== 'string') return text;
  let result = text;
  for (const [from, to] of Object.entries(MACRO_MAP)) {
    result = result.split(from).join(to);
  }
  return result;
}

function normalizeImportedRole(role) {
  if (typeof role !== 'string') return 'user';
  const r = role.toLowerCase();
  if (r === 'system' || r === 'user' || r === 'assistant') return r;
  return 'user';
}

function normalizeMessage(msg) {
  if (!msg || typeof msg !== 'object') return null;
  return {
    role: normalizeImportedRole(msg.role),
    content: normalizeImportedContent(msg.content || '')
  };
}

function genId() {
  return `bypass_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export const bypassHandler = {
  kind: 'bypass',
  displayName: 'AI 指令预设',
  supportsOverwrite: true,

  parse(raw) {
    if (!raw || typeof raw !== 'object') return null;

    // 格式 1：prompt-group 数组 → 包装成单条预设
    if (Array.isArray(raw) && raw.length > 0 && raw.every(looksLikePromptGroupMessage)) {
      const messages = raw.map(normalizeMessage).filter(Boolean);
      log.info('格式探测命中', { formatId: 'prompt-group', messageCount: messages.length });
      return [{
        id: genId(),
        name: '导入填表指令预设',
        description: '由外部填表提示词组导入。',
        enabled: true,
        messages
      }];
    }

    // 格式 2：envelope { presets: [...] }
    let items;
    if (Array.isArray(raw)) {
      items = raw;
    } else if (Array.isArray(raw.presets)) {
      items = raw.presets;
    } else {
      items = [raw];
    }

    const valid = items.filter(p => p && typeof p === 'object');
    if (valid.length === 0) return null;

    // 归一化 messages
    for (const preset of valid) {
      if (Array.isArray(preset.messages)) {
        preset.messages = preset.messages.map(normalizeMessage).filter(Boolean);
      }
    }

    log.info('格式探测命中', { formatId: 'preset-array', count: valid.length });
    return valid.length > 0 ? valid : null;
  },

  applyImport(parsed, { overwrite = false } = {}) {
    if (!parsed?.length) return { imported: 0, skipped: 0, errors: [] };
    const saved = storage.get(BYPASS_PRESETS_KEY, {});
    let imported = 0, skipped = 0;
    for (const preset of parsed) {
      if (!preset || typeof preset !== 'object') continue;
      const id = preset.id || genId();
      if (!overwrite && saved[id]) { skipped++; continue; }
      saved[id] = {
        ...preset,
        id,
        name: preset.name || '未命名预设',
        description: preset.description || '',
        enabled: preset.enabled !== false,
        updatedAt: Date.now()
      };
      imported++;
    }
    if (imported > 0) storage.set(BYPASS_PRESETS_KEY, saved);
    log.info('applyImport', { imported, skipped });
    return { imported, skipped, errors: [] };
  },

  serialize(options = {}) {
    const all = Object.values(storage.get(BYPASS_PRESETS_KEY, {}));
    if (options.selectedId) {
      const found = all.find(p => p.id === options.selectedId);
      return {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        presets: found ? [found] : all
      };
    }
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      presets: all
    };
  }
};
