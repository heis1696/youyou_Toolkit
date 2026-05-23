/**
 * YouYou Toolkit - 表格模板预设面板（议题 #45 Stage 3D 新建）
 *
 * 接入 PresetManagerBase。
 *
 * 本期范围（基础 CRUD）：
 *   - 基本信息：name / description
 *   - promptTemplate textarea
 *   - tables JSON 只读预览（让用户知道模板包含哪些表）
 *   - 导入/导出
 *
 * 复杂 schema 编辑器（添加/删除表、列定义、默认行）留 #47 填表工作台同步设计。
 */

import {
  formRow,
  textInput,
  el,
  appendChild
} from './controls/index.js';

import {
  getAllTableTemplates,
  getTableTemplate,
  saveTableTemplate,
  deleteTableTemplate,
  renameTableTemplate,
  getUserTableTemplates,
  exportUserTemplates,
  importTemplates
} from '../../table-engine/table-template-service.js';

import { DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID } from '../../table-engine/table-schema-service.js';
import { logger } from '../../core/logger-service.js';
import { createPresetManagerPanel } from './preset-manager-base.js';

const log = logger.createScope('TableTemplatePanel');

// 当前激活模板：由 tableWorkbench config 维护，本面板不直接控制 — 仅提供 currentId 视觉
let _stickyCurrentId = '';

function isBuiltinTemplate(id) {
  return id === DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID;
}

const tableTemplateStoreAdapter = {
  listPresets() {
    return getAllTableTemplates().map((t) => ({
      // 内置模板用 builtin_table_<id> 让 PresetManagerBase 显示 builtin badge + 锁编辑
      id: isBuiltinTemplate(t.id) ? `builtin_table_${t.id}` : t.id,
      name: t.name,
      description: t.description || '',
      promptTemplate: t.promptTemplate || '',
      tables: t.tables || [],
      _rawId: t.id,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt
    }));
  },

  getPreset(id) {
    if (!id) return null;
    const rawId = id.startsWith('builtin_table_') ? id.slice('builtin_table_'.length) : id;
    const t = getTableTemplate(rawId);
    if (!t) return null;
    return {
      id: isBuiltinTemplate(t.id) ? `builtin_table_${t.id}` : t.id,
      name: t.name,
      description: t.description || '',
      promptTemplate: t.promptTemplate || '',
      tables: t.tables || [],
      _rawId: t.id,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt
    };
  },

  getCurrentPresetId() { return _stickyCurrentId || ''; },

  setCurrentPresetId(id) { _stickyCurrentId = id || ''; return true; },

  createPreset(partial) {
    const name = String(partial?.name || '').trim() || '新建模板';
    const result = saveTableTemplate({
      name,
      description: partial?.description || '',
      promptTemplate: partial?.promptTemplate || '',
      tables: Array.isArray(partial?.tables) ? partial.tables : []
    });
    if (!result?.success) return null;
    return { id: result.template.id, ...result.template, _rawId: result.template.id };
  },

  updatePreset(id, patch) {
    if (!id) return null;
    const rawId = id.startsWith('builtin_table_') ? id.slice('builtin_table_'.length) : id;
    if (isBuiltinTemplate(rawId)) {
      log.warn('拒绝修改内置表格模板');
      return null;
    }
    const existing = getTableTemplate(rawId);
    if (!existing) return null;
    const result = saveTableTemplate({ ...existing, ...patch, id: rawId });
    if (!result?.success) return null;
    return { id: result.template.id, ...result.template, _rawId: result.template.id };
  },

  deletePreset(id) {
    if (!id) return false;
    const rawId = id.startsWith('builtin_table_') ? id.slice('builtin_table_'.length) : id;
    const result = deleteTableTemplate(rawId);
    return !!result?.success;
  },

  duplicatePreset(id, opts = {}) {
    const source = this.getPreset(id);
    if (!source) return null;
    const suffix = opts.nameSuffix || ' 副本';
    return this.createPreset({
      name: `${source.name}${suffix}`,
      description: source.description,
      promptTemplate: source.promptTemplate,
      tables: source.tables
    });
  },

  renamePreset(id, newName) {
    if (!id || !newName) return null;
    const rawId = id.startsWith('builtin_table_') ? id.slice('builtin_table_'.length) : id;
    const result = renameTableTemplate(rawId, newName);
    if (!result?.success) return null;
    return this.getPreset(result.template?.id || rawId);
  },

  exportAll() {
    return exportUserTemplates();
  },

  importPresets(payload) {
    const result = importTemplates(payload, { overwrite: false });
    return { added: result?.imported || 0, skipped: result?.skipped || 0 };
  },

  resetAll() {
    const userTemplates = getUserTableTemplates();
    for (const t of userTemplates) {
      try { deleteTableTemplate(t.id); } catch (_) {}
    }
  }
};

function renderEditor(preset, { onChange, readonly }) {
  const wrapper = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } });

  appendChild(wrapper, formRow({
    label: '描述',
    control: textInput({
      value: preset.description || '',
      placeholder: '可选 — 备注用途',
      disabled: readonly,
      onChange: (v) => onChange({ description: v })
    })
  }));

  // promptTemplate
  appendChild(wrapper, el('div', {
    text: '填表提示词模板',
    style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' }
  }));
  appendChild(wrapper, el('div', {
    text: '可使用宏：{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} 等。留空使用默认模板。',
    style: { fontSize: '11px', color: 'var(--yyt-text-muted)', lineHeight: '1.6', marginBottom: '4px' }
  }));
  const promptArea = el('textarea', {
    className: 'yyt-textarea',
    attrs: {
      rows: '8',
      placeholder: '可选 — 自定义填表提示词',
      disabled: readonly ? 'disabled' : null
    },
    style: { width: '100%', resize: 'vertical', fontFamily: 'ui-monospace, monospace', fontSize: '12px' }
  });
  promptArea.value = preset.promptTemplate || '';
  promptArea.addEventListener('change', () => {
    if (readonly) return;
    onChange({ promptTemplate: promptArea.value });
  });
  appendChild(wrapper, promptArea);

  // tables JSON 只读预览
  appendChild(wrapper, el('div', {
    text: `表格结构（${(preset.tables || []).length} 张表）`,
    style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)', marginTop: '6px' }
  }));
  appendChild(wrapper, el('div', {
    text: '本面板只展示表结构 JSON。复杂 schema 编辑（增删表、列定义、默认行）将在填表工作台中提供。',
    style: { fontSize: '11px', color: 'var(--yyt-text-muted)', lineHeight: '1.6', marginBottom: '4px' }
  }));

  const tablePreviewBox = el('pre', {
    style: {
      padding: '10px 12px',
      background: 'var(--yyt-bg-base)',
      border: '1px solid var(--yyt-border)',
      borderRadius: 'var(--yyt-radius-sm, 6px)',
      fontFamily: 'ui-monospace, monospace',
      fontSize: '11px',
      lineHeight: '1.6',
      color: 'var(--yyt-text-secondary)',
      maxHeight: '260px',
      overflow: 'auto',
      whiteSpace: 'pre',
      margin: '0'
    }
  });
  try {
    tablePreviewBox.textContent = JSON.stringify(preset.tables || [], null, 2);
  } catch (_) {
    tablePreviewBox.textContent = '// 无法序列化';
  }
  appendChild(wrapper, tablePreviewBox);

  return wrapper;
}

function renderListItemMeta(preset) {
  const tablesCount = (preset.tables || []).length;
  const meta = [`${tablesCount} 张表`];
  if (preset.promptTemplate) meta.push('自定义模板');
  return meta;
}

export const TableTemplatePanel = createPresetManagerPanel({
  id: 'tableTemplatePanel',
  kind: 'table',
  panelTitle: '表格模板',
  panelHint: '管理填表工作台的表格结构模板。在填表面板顶部工具栏可快速加载/保存当前模板。',
  store: tableTemplateStoreAdapter,
  renderEditor,
  renderListItemMeta,
  ioKind: 'template'
});

export default TableTemplatePanel;
