/**
 * YouYou Toolkit - 工具操作辅助（议题 #37 Design A）
 *
 * 提供 tools sub-nav toolbar 触发的几类对话框：
 *   - 新建工具 / 编辑工具
 *   - 导入工具 JSON / 导出工具 JSON
 *   - 删除工具确认
 *
 * 所有对话框用新版 dialog.custom / dialog.confirm，控件用 controls 库。
 * 不再使用 tool-manage-panel.js 里的 jQuery + HTML 字符串模式。
 */

import { dialog } from './controls/dialog.js';
import { textInput, selectInput, el, button as buttonControl } from './controls/index.js';
import { openImportDialog as centerImport, openExportDialog as centerExport } from '../../io/import-export-center.js';
import {
  getAllTools,
  getTool,
  saveTool,
  deleteTool,
  exportTools,
  importTools,
  resetTools
} from '../../tool-manager.js';
import { ensureToolRuntimeConfig } from '../../tool-registry.js';
import { logger } from '../../core/logger-service.js';

const log = logger.createScope('ToolActions');

const CATEGORY_OPTIONS = [
  { value: 'api', label: 'API' },
  { value: 'prompt', label: 'Prompt' },
  { value: 'utility', label: 'Utility' }
];

/**
 * 新建/编辑工具对话框。
 * @param {string|null} toolId - 为 null 时为新建
 * @returns {Promise<string|null>} 保存的 toolId，取消返回 null
 */
export async function showToolEditDialog(toolId = null) {
  const existing = toolId ? getTool(toolId) : null;
  const isEdit = !!existing;

  const nameCtrl = textInput({
    value: existing?.name || '',
    placeholder: '工具名称'
  });
  const categoryCtrl = selectInput({
    value: existing?.category || 'utility',
    options: CATEGORY_OPTIONS
  });
  const descCtrl = textInput({
    value: existing?.description || '',
    placeholder: '工具描述'
  });
  const timeoutCtrl = el('input', {
    className: 'yyt-input',
    attrs: { type: 'number', min: '1000' },
    style: { padding: '7px 10px', fontSize: '12px' }
  });
  timeoutCtrl.value = String(existing?.config?.execution?.timeout || 60000);
  const retriesCtrl = el('input', {
    className: 'yyt-input',
    attrs: { type: 'number', min: '0', max: '10' },
    style: { padding: '7px 10px', fontSize: '12px' }
  });
  retriesCtrl.value = String(existing?.config?.execution?.retries ?? 3);

  function buildField(label, controlEl, hint = '') {
    const wrap = el('div', { className: 'yyt-form-group', style: { margin: '0 0 12px 0' } });
    wrap.appendChild(el('label', {
      text: label,
      style: { fontSize: '12px', fontWeight: '600', color: 'var(--yyt-text-secondary, rgba(255,255,255,0.55))', display: 'block', marginBottom: '4px' }
    }));
    wrap.appendChild(controlEl);
    if (hint) {
      wrap.appendChild(el('div', {
        text: hint,
        style: { fontSize: '11px', color: 'var(--yyt-text-muted)', marginTop: '4px' }
      }));
    }
    return wrap;
  }

  const body = el('div', { style: { display: 'flex', flexDirection: 'column' } });
  const row1 = el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } });
  row1.appendChild(buildField('工具名称', nameCtrl.el));
  row1.appendChild(buildField('分类', categoryCtrl.el));
  body.appendChild(row1);
  body.appendChild(buildField('描述', descCtrl.el));
  const row2 = el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' } });
  row2.appendChild(buildField('超时时间 (ms)', timeoutCtrl));
  row2.appendChild(buildField('重试次数', retriesCtrl));
  body.appendChild(row2);

  const inst = dialog.custom({
    title: isEdit ? `编辑工具「${existing.name}」` : '新建工具',
    width: '480px',
    body,
    buttons: [
      { label: '取消', variant: 'ghost', onClick: (close) => close(null) },
      {
        label: isEdit ? '保存' : '创建',
        variant: 'primary',
        onClick: (close) => {
          const name = String(nameCtrl.get() || '').trim();
          if (!name) {
            nameCtrl.el.focus();
            return;
          }
          const id = toolId || `tool_${Date.now()}`;
          const success = saveTool(id, {
            name,
            category: categoryCtrl.get(),
            description: String(descCtrl.get() || '').trim(),
            promptTemplate: existing?.promptTemplate || '',
            extractTags: Array.isArray(existing?.extractTags) ? existing.extractTags : [],
            config: {
              execution: {
                timeout: Math.max(1000, parseInt(timeoutCtrl.value, 10) || 60000),
                retries: Math.max(0, parseInt(retriesCtrl.value, 10) || 3)
              },
              api: existing?.config?.api || { preset: '', useBypass: false, bypassPreset: '' },
              messages: Array.isArray(existing?.config?.messages) ? existing.config.messages : [],
              context: {
                depth: existing?.config?.context?.depth || 3,
                includeTags: Array.isArray(existing?.config?.context?.includeTags) ? existing.config.context.includeTags : [],
                excludeTags: Array.isArray(existing?.config?.context?.excludeTags) ? existing.config.context.excludeTags : []
              },
              worldbooks: {
                enabled: existing?.config?.worldbooks?.enabled === true,
                selected: Array.isArray(existing?.config?.worldbooks?.selected) ? existing.config.worldbooks.selected : []
              }
            },
            enabled: existing?.enabled !== false
          });
          if (!success) {
            log.warn('saveTool 失败', { id });
            return;
          }
          try { ensureToolRuntimeConfig(id); } catch (err) { log.warn('ensureToolRuntimeConfig 异常', { err }); }
          close(id);
        }
      }
    ]
  });

  setTimeout(() => nameCtrl.el.focus(), 0);
  return inst.result;
}

/**
 * 删除工具确认。
 */
export async function confirmDeleteTool(toolId) {
  const tool = getTool(toolId);
  if (!tool) return false;
  const ok = await dialog.confirm({
    title: '删除工具',
    message: `确定删除工具「${tool.name}」？此操作不可撤销。`,
    confirmText: '删除',
    danger: true
  });
  if (!ok) return false;
  return deleteTool(toolId);
}

/**
 * 导出工具到 JSON，弹下载 / 复制 dialog。
 */
export function showExportToolsDialog() {
  centerExport('tool');
}

/**
 * 导入工具 JSON。覆盖模式 vs 合并模式。
 * @returns {Promise<{success: boolean, imported: number}|null>}
 */
export async function showImportToolsDialog() {
  return centerImport('tool');
}

/**
 * 重置所有工具确认 + 执行。
 */
export async function confirmResetTools() {
  const ok = await dialog.confirm({
    title: '重置所有工具',
    message: '此操作会删除所有自定义工具与预设，不可撤销。内置工具不受影响。',
    confirmText: '重置',
    danger: true
  });
  if (!ok) return false;
  resetTools();
  return true;
}

export {
  getAllTools,
  getTool
};
