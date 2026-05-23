/**
 * YouYou Toolkit - Import/Export Center
 *
 * 统一管理所有模块的导入导出。三层架构：
 *
 *   Center ─── 流程编排 + UI dialog + 错误兜底
 *     │
 *     └─ ModuleHandler（协议对象）─── 序列化 / 持久化 / 合并策略
 *           │
 *           └─ FormatAdapter（协议对象）─── 格式探测 + 解析归一化
 *
 * ModuleHandler 协议：
 *   { kind, displayName, supportsOverwrite?,
 *     parse(raw) → parsed,
 *     applyImport(parsed, options) → { imported, skipped, errors },
 *     serialize(options?) → payload }
 *
 * FormatAdapter 协议：
 *   { formatId, displayName, detect(raw) → bool, parse(raw) → normalized }
 */

import { logger } from '../core/logger-service.js';
import { dialog, el } from '../ui/components/controls/index.js';

const log = logger.createScope('IOCenter');

const _handlers = new Map();

// ════════════════════════════════════════════════════════════════
// 注册
// ════════════════════════════════════════════════════════════════

export function registerHandler(handler) {
  if (!handler?.kind) throw new Error('IOCenter: handler.kind required');
  _handlers.set(handler.kind, handler);
  log.info('handler registered', { kind: handler.kind, displayName: handler.displayName || '' });
}

export function getHandler(kind) { return _handlers.get(kind) || null; }
export function hasHandler(kind) { return _handlers.has(kind); }

// ════════════════════════════════════════════════════════════════
// 核心：import / export
// ════════════════════════════════════════════════════════════════

export function importData(kind, raw, options = {}) {
  const handler = _handlers.get(kind);
  if (!handler) return { success: false, errors: [`未注册 ${kind} handler`] };
  try {
    const parsed = handler.parse(raw);
    if (!parsed) return { success: false, errors: ['无法识别的导入格式'] };
    const result = handler.applyImport(parsed, options);
    log.info('importData', { kind, imported: result.imported, skipped: result.skipped });
    return { success: true, ...result };
  } catch (err) {
    log.error('importData failed', { kind, err });
    return { success: false, errors: [err?.message || '导入失败'] };
  }
}

export function exportData(kind, options = {}) {
  const handler = _handlers.get(kind);
  if (!handler) throw new Error(`未注册 ${kind} handler`);
  return handler.serialize(options);
}

// ════════════════════════════════════════════════════════════════
// UI Dialog
// ════════════════════════════════════════════════════════════════

export async function openImportDialog(kind, uiOptions = {}) {
  const handler = _handlers.get(kind);
  if (!handler) {
    await dialog.confirm({ title: '不支持', message: `未注册 ${kind} handler`, confirmText: '确定' });
    return null;
  }

  const textarea = el('textarea', {
    className: 'yyt-textarea',
    attrs: { placeholder: '粘贴导出的 JSON' },
    style: { width: '100%', minHeight: '180px', fontSize: '12px', fontFamily: 'monospace' }
  });

  const body = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } });
  body.appendChild(textarea);

  let overwriteCheckbox = null;
  if (handler.supportsOverwrite && uiOptions.supportsOverwrite !== false) {
    const label = el('label', {
      style: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--yyt-text-secondary)' }
    });
    overwriteCheckbox = el('input', { attrs: { type: 'checkbox' } });
    label.appendChild(overwriteCheckbox);
    label.appendChild(el('span', { text: '覆盖模式（不勾选则合并/跳过已有）' }));
    body.appendChild(label);
  }

  const inst = dialog.custom({
    title: `导入${handler.displayName || ''}`,
    width: '520px',
    body,
    buttons: [
      { label: '取消', variant: 'ghost', onClick: (close) => close(null) },
      {
        label: '从文件…',
        variant: 'ghost',
        onClick: () => {
          const fi = el('input', { attrs: { type: 'file', accept: 'application/json,.json' } });
          fi.addEventListener('change', () => {
            const f = fi.files?.[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = () => { textarea.value = String(r.result || ''); textarea.focus(); };
            r.readAsText(f);
          });
          fi.click();
        }
      },
      {
        label: '导入',
        variant: 'primary',
        onClick: async (close) => {
          const raw = textarea.value.trim();
          if (!raw) { close(null); return; }
          let payload;
          try { payload = JSON.parse(raw); } catch (err) {
            await dialog.confirm({ title: 'JSON 解析失败', message: String(err?.message || err), confirmText: '确定' });
            return;
          }
          const overwrite = overwriteCheckbox?.checked || false;
          const result = importData(kind, payload, { overwrite });
          close(result);
        }
      }
    ]
  });

  setTimeout(() => textarea.focus(), 0);
  return inst.result;
}

export async function openExportDialog(kind, options = {}) {
  const handler = _handlers.get(kind);
  if (!handler) {
    await dialog.confirm({ title: '不支持', message: `未注册 ${kind} handler`, confirmText: '确定' });
    return;
  }

  let payload;
  try { payload = exportData(kind, options); } catch (err) {
    await dialog.confirm({ title: '导出失败', message: String(err?.message || err), confirmText: '确定' });
    return;
  }

  const json = JSON.stringify(payload, null, 2);
  const textarea = el('textarea', {
    className: 'yyt-textarea',
    style: { width: '100%', minHeight: '220px', fontSize: '12px', fontFamily: 'monospace' }
  });
  textarea.value = json;
  textarea.readOnly = true;

  dialog.custom({
    title: `导出${handler.displayName || ''}`,
    width: '600px',
    body: textarea,
    buttons: [
      { label: '关闭', variant: 'ghost', onClick: (close) => close(null) },
      {
        label: '复制到剪贴板',
        variant: 'ghost',
        onClick: async () => {
          try { await navigator.clipboard.writeText(json); } catch (_) {
            textarea.select();
            try { document.execCommand('copy'); } catch (_a) { /* noop */ }
          }
        }
      },
      {
        label: '下载 JSON',
        variant: 'primary',
        onClick: () => {
          try {
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = el('a', { attrs: { href: url, download: `${kind}_${Date.now()}.json` } });
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
              try { document.body.removeChild(a); } catch (_) { /* noop */ }
              try { URL.revokeObjectURL(url); } catch (_) { /* noop */ }
            }, 100);
          } catch (err) { log.warn('download failed', { err }); }
        }
      }
    ]
  });
}
