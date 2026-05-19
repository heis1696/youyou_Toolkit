/**
 * YouYou Toolkit - API 预设面板（议题 #45 Stage 3A 重写）
 *
 * 完全重写：从 jQuery + HTML 字符串 → controls 库 + PresetManagerBase。
 *
 * 设计：
 *   - API 预设的 "name" 既作 id 又作显示名（preset-manager.js 用 name 作主键）
 *   - 提供 store 适配器把 preset-manager.js 的 name-based API 映射成 id-based
 *   - hasSwitchToButton: true（API 预设需要"加载"按钮触发 switchToPreset）
 *   - 编辑器：useMainApi / stream / url / apiKey / model / max_tokens / temperature / top_p
 */

import {
  formRow,
  textInput,
  toggle,
  el,
  appendChild
} from './controls/index.js';

import {
  getAllPresets,
  getPreset as getPresetByName,
  createPreset as createPresetRaw,
  updatePreset as updatePresetRaw,
  deletePreset as deletePresetRaw,
  duplicatePreset as duplicatePresetRaw,
  renamePreset as renamePresetRaw,
  switchToPreset,
  getActivePresetName,
  exportPresets as exportRaw,
  importPresets as importRaw
} from '../../preset-manager.js';

import { logger } from '../../core/logger-service.js';
import { createPresetManagerPanel } from './preset-manager-base.js';

const log = logger.createScope('ApiPresetPanel');

// ─── store 适配器：name ↔ id ─────
const apiStoreAdapter = {
  listPresets() {
    return getAllPresets().map((p) => ({
      id: p.name,
      name: p.name,
      description: p.description || '',
      apiConfig: p.apiConfig || {},
      starred: p.starred === true,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }));
  },

  getPreset(id) {
    if (!id) return null;
    const p = getPresetByName(id);
    if (!p) return null;
    return { id: p.name, ...p, description: p.description || '' };
  },

  getCurrentPresetId() {
    return getActivePresetName() || '';
  },

  setCurrentPresetId(id) {
    if (!id) return false;
    try {
      return !!switchToPreset(id);
    } catch (err) {
      log.warn('switchToPreset 失败', { err });
      return false;
    }
  },

  createPreset(partial) {
    const name = String(partial?.name || '').trim();
    if (!name) {
      log.warn('createPreset: name 缺失');
      return null;
    }
    const result = createPresetRaw({
      name,
      description: partial?.description || '',
      apiConfig: partial?.apiConfig || {}
    });
    if (!result?.success) {
      log.warn('createPreset 失败', { msg: result?.message });
      return null;
    }
    return { id: result.preset.name, ...result.preset, description: result.preset.description || '' };
  },

  updatePreset(id, patch) {
    if (!id) return null;
    const result = updatePresetRaw(id, patch);
    if (!result?.success) {
      log.warn('updatePreset 失败', { id, msg: result?.message });
      return null;
    }
    return { id: result.preset.name, ...result.preset, description: result.preset.description || '' };
  },

  deletePreset(id) {
    if (!id) return false;
    try {
      const result = deletePresetRaw(id);
      return !!(result?.success ?? result === true);
    } catch (err) {
      log.warn('deletePreset 失败', { err });
      return false;
    }
  },

  duplicatePreset(id, opts = {}) {
    if (!id) return null;
    const suffix = opts.nameSuffix || '_副本';
    const newName = `${id}${suffix}`;
    try {
      const result = duplicatePresetRaw(id, newName);
      if (!result?.success) return null;
      return { id: result.preset.name, ...result.preset, description: result.preset.description || '' };
    } catch (err) {
      log.warn('duplicatePreset 失败', { err });
      return null;
    }
  },

  renamePreset(id, newName) {
    if (!id || !newName) return null;
    try {
      const result = renamePresetRaw(id, newName);
      if (!result?.success) return null;
      return { id: result.preset?.name || newName, ...result.preset, description: result.preset?.description || '' };
    } catch (err) {
      log.warn('renamePreset 失败', { err });
      return null;
    }
  },

  exportAll() {
    const json = exportRaw();
    try {
      return { version: 1, exportedAt: Date.now(), presets: JSON.parse(json) };
    } catch (_) {
      return { version: 1, exportedAt: Date.now(), presets: [] };
    }
  },

  importPresets(payload) {
    if (!payload || typeof payload !== 'object') return { added: 0 };
    const list = Array.isArray(payload.presets) ? payload.presets : [payload];
    const json = JSON.stringify(list);
    const result = importRaw(json, { overwrite: false });
    return { added: result?.imported || 0 };
  },

  resetAll() {
    // preset-manager.js 没有 resetAll API；逐个删除
    const all = getAllPresets();
    for (const p of all) {
      try { deletePresetRaw(p.name); } catch (_) {}
    }
  }
};

// ─── renderEditor：API 配置字段 ─────
function renderEditor(preset, { onChange, readonly }) {
  const wrapper = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } });

  const cfg = preset.apiConfig || {};

  appendChild(wrapper, formRow({
    label: '描述',
    control: textInput({
      value: preset.description || '',
      placeholder: '可选 — 备注用途',
      disabled: readonly,
      onChange: (v) => onChange({ description: v })
    })
  }));

  appendChild(wrapper, toggle({
    label: '使用主 API',
    hint: '开启后忽略下方 URL/Key/Model，直接复用 SillyTavern 主连接',
    checked: cfg.useMainApi !== false,
    disabled: readonly,
    onChange: (v) => onChange({ apiConfig: { ...cfg, useMainApi: v } })
  }));

  appendChild(wrapper, toggle({
    label: '流式输出（stream）',
    hint: '逐字接收响应',
    checked: cfg.stream === true,
    disabled: readonly,
    onChange: (v) => onChange({ apiConfig: { ...cfg, stream: v } })
  }));

  appendChild(wrapper, formRow({
    label: 'API URL',
    control: textInput({
      value: cfg.url || '',
      placeholder: 'https://api.example.com/v1',
      disabled: readonly,
      onChange: (v) => onChange({ apiConfig: { ...cfg, url: v } })
    })
  }));

  appendChild(wrapper, formRow({
    label: 'API Key',
    control: textInput({
      value: cfg.apiKey || '',
      placeholder: 'sk-...',
      disabled: readonly,
      attrs: { type: 'password' },
      onChange: (v) => onChange({ apiConfig: { ...cfg, apiKey: v } })
    })
  }));

  appendChild(wrapper, formRow({
    label: '模型',
    control: textInput({
      value: cfg.model || '',
      placeholder: 'gpt-4 / gemini-pro / claude-...',
      disabled: readonly,
      onChange: (v) => onChange({ apiConfig: { ...cfg, model: v } })
    })
  }));

  // 数值参数（一行三列）
  const paramsRow = el('div', {
    style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }
  });

  function paramInput(label, key, defaultVal, step = '1') {
    const wrap = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } });
    wrap.appendChild(el('label', {
      text: label,
      style: { fontSize: '11px', color: 'var(--yyt-text-secondary)', fontWeight: '600' }
    }));
    const input = el('input', {
      className: 'yyt-input',
      attrs: { type: 'number', step, disabled: readonly ? 'disabled' : null },
      style: { padding: '6px 10px', fontSize: '12px' }
    });
    input.value = String(cfg[key] ?? defaultVal);
    input.addEventListener('change', () => {
      const v = Number(input.value);
      if (Number.isFinite(v)) {
        onChange({ apiConfig: { ...cfg, [key]: v } });
      }
    });
    wrap.appendChild(input);
    return wrap;
  }

  paramsRow.appendChild(paramInput('max_tokens', 'max_tokens', 4096, '1'));
  paramsRow.appendChild(paramInput('temperature', 'temperature', 0.7, '0.05'));
  paramsRow.appendChild(paramInput('top_p', 'top_p', 0.9, '0.05'));

  appendChild(wrapper, paramsRow);

  return wrapper;
}

function renderListItemMeta(preset) {
  const cfg = preset.apiConfig || {};
  const meta = [];
  if (cfg.useMainApi !== false) meta.push('主 API');
  else meta.push(cfg.model || '自定义');
  if (preset.starred) meta.push('★');
  return meta;
}

export const ApiPresetPanel = createPresetManagerPanel({
  id: 'apiPresetPanel',
  kind: 'api',
  panelTitle: 'API 预设',
  panelHint: '管理多组 API 连接配置。点击"加载"激活某个预设作为当前 API；其他工具可在配置面板中按预设名引用。',
  store: apiStoreAdapter,
  renderEditor,
  renderListItemMeta,
  hasSwitchToButton: true,
  onSwitchTo: (id) => {
    try { switchToPreset(id); } catch (err) { log.warn('switchToPreset', { err }); }
  }
});

export default ApiPresetPanel;
