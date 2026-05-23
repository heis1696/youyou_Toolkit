/**
 * YouYou Toolkit - PresetManagerBase factory
 *
 * 议题 #45 Stage 2A — 抽取 4 个预设面板（API / 正则 / 世界书 / 表格模板）共有的三段式骨架。
 *
 * 三段式：
 *   ┌──────────────────────────────────────┐
 *   │ flowSection "预设选择"               │
 *   │   listRow × N  + 顶部 toolbar(新建)  │
 *   ├──────────────────────────────────────┤
 *   │ flowSection "编辑器"  (renderEditor) │
 *   │   ↓                                  │
 *   │ flowSection "扩展区"  (renderExtras) │  ← 可选，正则的"测试提取"用这个
 *   ├──────────────────────────────────────┤
 *   │ toolbar(导入 / 导出 / 清空)          │
 *   └──────────────────────────────────────┘
 *
 * 通用行为：
 *   - 编辑即保存：renderEditor 通过 onChange(patch) 写入 store
 *   - 内置预设（id 以 builtin_ 开头）禁止删除/重命名/编辑（renderEditor 应自己处理 readonly）
 *   - 新建预设 / 删除 / 导入 / 清空全走 dialog 控件，不用 window.prompt/confirm
 *   - 列表用 presetListItem 控件（active 状态点 + builtin badge + meta chip）
 *
 * 用法：
 *   const panel = createPresetManagerPanel({
 *     id: 'regexPresetPanel',
 *     kind: 'regex',
 *     panelTitle: '正则提取预设',
 *     panelHint: '管理多个提取规则集，工具配置中通过预设 ID 引用',
 *     store: { ... 必需的 CRUD 方法 ... },
 *     renderEditor(preset, { onChange, readonly }) → DOMNode,
 *     renderExtras(preset) → DOMNode | null,
 *     renderListItemMeta(preset) → string[]   // 显示在 listRow 右侧的 meta chip
 *   })
 */

import {
  flowSection,
  button,
  presetListItem,
  toolbar,
  dialog,
  el
} from './controls/index.js';

import { logger } from '../../core/logger-service.js';
import { hasHandler, openImportDialog as centerImport, openExportDialog as centerExport } from '../../io/import-export-center.js';

const log = logger.createScope('PresetManagerBase');

function unwrap($container) {
  if (!$container) return null;
  if ($container.length !== undefined && typeof $container.get === 'function') {
    return $container.get(0);
  }
  return $container;
}

function isBuiltinId(id) {
  return typeof id === 'string' && id.startsWith('builtin_');
}

export function createPresetManagerPanel(spec = {}) {
  const {
    id,
    kind = 'generic',
    panelTitle = '预设管理',
    panelHint = '',
    store,
    renderEditor,
    renderExtras = null,
    renderListItemMeta = null,
    hasSwitchToButton = false,
    onSwitchTo = null,
    ioKind = null
  } = spec;

  if (!store || typeof store.listPresets !== 'function') {
    throw new Error('createPresetManagerPanel: store 缺少必要的 listPresets 方法');
  }
  if (typeof renderEditor !== 'function') {
    throw new Error('createPresetManagerPanel: 必须提供 renderEditor');
  }

  return {
    id,
    kind,

    renderTo($container) {
      const containerEl = unwrap($container);
      if (!containerEl) return;

      // v1.0.197 fix #1：跨 kind 切换也保留 store 记录的当前选中，不再清空

      if (containerEl._yytPresetPanelCleanup) {
        try { containerEl._yytPresetPanelCleanup(); } catch (_) {}
      }

      const refresh = () => this.renderTo($container);
      const presets = store.listPresets();
      const currentId = typeof store.getCurrentPresetId === 'function'
        ? store.getCurrentPresetId()
        : '';

      const root = el('div', {
        className: 'yyt-preset-manager-panel',
        style: { display: 'flex', flexDirection: 'column', gap: '14px' }
      });

      // ── 标题（可选） ──
      if (panelTitle || panelHint) {
        const heroEl = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } });
        if (panelTitle) {
          heroEl.appendChild(el('div', {
            text: panelTitle,
            style: { fontSize: '15px', fontWeight: '700', color: 'var(--yyt-text)' }
          }));
        }
        if (panelHint) {
          heroEl.appendChild(el('div', {
            text: panelHint,
            style: { fontSize: '12px', color: 'var(--yyt-text-secondary)', lineHeight: '1.6' }
          }));
        }
        root.appendChild(heroEl);
      }

      const sectionCleanups = [];

      // ── 预设列表区 ──
      const listInnerContainer = el('div', { style: { display: 'flex', flexDirection: 'column' } });
      if (presets.length === 0) {
        listInnerContainer.appendChild(el('div', {
          text: '暂无预设。点击下方"新建"创建第一个预设。',
          style: { fontSize: '12px', color: 'var(--yyt-text-muted)', padding: '12px 0', textAlign: 'center' }
        }));
      } else {
        for (const preset of presets) {
          const isActive = preset.id === currentId;
          const isBuiltin = isBuiltinId(preset.id);
          const metaChips = (typeof renderListItemMeta === 'function')
            ? (renderListItemMeta(preset) || [])
            : [];

          const actions = [];
          if (hasSwitchToButton && typeof onSwitchTo === 'function') {
            actions.push(button({
              label: isActive ? '✓ 已加载' : '加载',
              size: 'small',
              variant: isActive ? 'ghost' : 'primary',
              disabled: isActive,
              onClick: (e) => {
                e.stopPropagation();
                try { onSwitchTo(preset.id); } catch (err) { log.warn('onSwitchTo 异常', { err }); }
                refresh();
              }
            }));
          }
          actions.push(button({
            label: '复制', size: 'small', variant: 'ghost', title: '复制为用户预设',
            onClick: async (e) => {
              e.stopPropagation();
              try {
                const copy = store.duplicatePreset(preset.id);
                if (copy?.id && typeof store.setCurrentPresetId === 'function') {
                  store.setCurrentPresetId(copy.id);
                }
                refresh();
              } catch (err) { log.warn('duplicate 异常', { err }); }
            }
          }));
          if (!isBuiltin) {
            actions.push(button({
              label: '✎', size: 'small', variant: 'ghost', title: '重命名',
              onClick: async (e) => {
                e.stopPropagation();
                const newName = await dialog.prompt({
                  title: '重命名预设',
                  defaultValue: preset.name,
                  placeholder: '预设名',
                  validate: (v) => (!v ? '名称不能为空' : null)
                });
                if (newName && newName !== preset.name) {
                  store.renamePreset(preset.id, newName);
                  refresh();
                }
              }
            }));
            actions.push(button({
              label: '×', size: 'small', variant: 'ghost', title: '删除',
              onClick: async (e) => {
                e.stopPropagation();
                const ok = await dialog.confirm({
                  title: '删除预设',
                  message: `确认删除「${preset.name}」？此操作不可撤销。`,
                  confirmText: '删除',
                  danger: true
                });
                if (ok) {
                  store.deletePreset(preset.id);
                  refresh();
                }
              }
            }));
          }

          const item = presetListItem({
            id: preset.id,
            name: preset.name,
            desc: preset.description,
            active: isActive,
            builtin: isBuiltin,
            metaChips,
            actions,
            onClick: () => {
              if (typeof store.setCurrentPresetId === 'function') {
                store.setCurrentPresetId(preset.id);
              }
              refresh();
            }
          });
          listInnerContainer.appendChild(item.el);
        }
      }

      const newPresetBtn = button({
        label: '+ 新建预设',
        size: 'small',
        variant: 'primary',
        onClick: async () => {
          const name = await dialog.prompt({
            title: '新建预设',
            placeholder: '预设名（必填）',
            validate: (v) => (!v ? '名称不能为空' : null)
          });
          if (!name) return;
          try {
            const created = store.createPreset({ name });
            if (created?.id && typeof store.setCurrentPresetId === 'function') {
              store.setCurrentPresetId(created.id);
            }
            refresh();
          } catch (err) {
            log.warn('createPreset 失败', { err });
            await dialog.confirm({
              title: '创建失败',
              message: String(err?.message || err),
              confirmText: '确定'
            });
          }
        }
      });

      const listSection = flowSection({
        heading: '预设选择',
        icon: '📋',
        actions: [newPresetBtn.el],
        content: [listInnerContainer]
      });
      sectionCleanups.push(listSection);
      root.appendChild(listSection.el);

      // ── 编辑器区 ──
      const selected = currentId ? presets.find((p) => p.id === currentId) : null;
      if (selected) {
        let editorContent = null;
        try {
          editorContent = renderEditor(selected, {
            readonly: false,
            onChange: (patch) => {
              if (!patch || typeof patch !== 'object') return;
              try {
                store.updatePreset(selected.id, patch);
              } catch (err) {
                log.warn('updatePreset 失败', { err });
              }
            },
            refresh
          });
        } catch (err) {
          log.error('renderEditor 异常', { err });
          editorContent = el('div', {
            text: `编辑器渲染异常：${err?.message || err}`,
            style: { color: 'var(--yyt-danger, #f87171)', fontSize: '12px' }
          });
        }

        const editorSection = flowSection({
          heading: `编辑「${selected.name}」`,
          icon: '✎',
          content: [editorContent].filter(Boolean)
        });
        sectionCleanups.push(editorSection);
        root.appendChild(editorSection.el);

        // renderExtras 区（如：正则的"测试提取"）
        if (typeof renderExtras === 'function') {
          let extras = null;
          try { extras = renderExtras(selected, { refresh }); } catch (err) {
            log.warn('renderExtras 异常', { err });
          }
          if (extras) {
            const extrasSection = flowSection({
              heading: '附加',
              icon: '🔧',
              content: [extras]
            });
            sectionCleanups.push(extrasSection);
            root.appendChild(extrasSection.el);
          }
        }
      } else if (presets.length > 0) {
        root.appendChild(el('div', {
          text: '请在上方列表选择一个预设以编辑',
          style: {
            fontSize: '12px',
            color: 'var(--yyt-text-muted)',
            padding: '16px',
            textAlign: 'center',
            border: '1px dashed var(--yyt-border, rgba(255,255,255,0.08))',
            borderRadius: 'var(--yyt-radius-sm, 6px)'
          }
        }));
      }

      // ── 底部 toolbar：导入 / 导出 / 清空 ──
      const importBtn = button({
        label: '⬆ 导入',
        size: 'small',
        variant: 'ghost',
        onClick: async () => {
          if (ioKind && hasHandler(ioKind)) {
            const result = await centerImport(ioKind);
            if (result && (result.imported > 0 || result.success)) refresh();
          } else {
            await openImportDialog(store, refresh);
          }
        }
      });
      const exportBtn = button({
        label: '⬇ 导出',
        size: 'small',
        variant: 'ghost',
        onClick: () => {
          if (ioKind && hasHandler(ioKind)) {
            centerExport(ioKind);
          } else {
            openExportDialog(store, kind);
          }
        }
      });
      const clearBtn = button({
        label: '清空全部',
        size: 'small',
        variant: 'ghost',
        onClick: async () => {
          const ok = await dialog.confirm({
            title: '清空所有预设',
            message: '此操作会删除所有用户预设（内置预设不受影响），不可撤销。',
            confirmText: '清空',
            danger: true
          });
          if (ok && typeof store.resetAll === 'function') {
            store.resetAll();
            refresh();
          }
        }
      });

      const footer = toolbar({
        items: [importBtn, exportBtn, clearBtn],
        align: 'end',
        gap: '8px'
      });
      root.appendChild(footer.el);

      containerEl.innerHTML = '';
      containerEl.appendChild(root);

      containerEl._yytPresetPanelCleanup = () => {
        for (const s of sectionCleanups) {
          try { s.destroy(); } catch (_) {}
        }
        delete containerEl._yytPresetPanelCleanup;
      };
    },

    destroy(container) {
      const containerEl = unwrap(container);
      if (containerEl?._yytPresetPanelCleanup) {
        try { containerEl._yytPresetPanelCleanup(); } catch (_) {}
      }
    },

    getStyles() { return ''; }
  };
}

// ────────────────────────────────────────────────
// 导入 / 导出 helpers
// ────────────────────────────────────────────────

async function openImportDialog(store, refresh) {
  if (typeof store.importPresets !== 'function') {
    await dialog.confirm({ title: '不支持导入', message: '当前预设类型不支持导入。', confirmText: '确定' });
    return;
  }

  const textarea = el('textarea', {
    className: 'yyt-textarea',
    attrs: { placeholder: '粘贴导出的 JSON' },
    style: { width: '100%', minHeight: '180px', fontSize: '12px', fontFamily: 'monospace' }
  });

  const inst = dialog.custom({
    title: '导入预设',
    width: '520px',
    body: textarea,
    buttons: [
      { label: '取消', variant: 'ghost', onClick: (close) => close(null) },
      {
        label: '从文件…',
        variant: 'ghost',
        onClick: () => {
          const fileInput = el('input', {
            attrs: { type: 'file', accept: 'application/json,.json' }
          });
          fileInput.addEventListener('change', () => {
            const f = fileInput.files?.[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = () => {
              textarea.value = String(reader.result || '');
              textarea.focus();
            };
            reader.readAsText(f);
          });
          fileInput.click();
        }
      },
      {
        label: '导入',
        variant: 'primary',
        onClick: async (close) => {
          const raw = textarea.value.trim();
          if (!raw) { close(null); return; }
          let payload;
          try {
            payload = JSON.parse(raw);
          } catch (err) {
            await dialog.confirm({
              title: 'JSON 解析失败',
              message: String(err?.message || err),
              confirmText: '确定'
            });
            return;
          }
          try {
            const result = store.importPresets(payload);
            close(result);
          } catch (err) {
            await dialog.confirm({
              title: '导入失败',
              message: String(err?.message || err),
              confirmText: '确定'
            });
          }
        }
      }
    ]
  });
  setTimeout(() => textarea.focus(), 0);
  const result = await inst.result;
  if (result && (result.added > 0 || result.imported > 0)) {
    refresh();
  }
}

function openExportDialog(store, kind) {
  if (typeof store.exportAll !== 'function') {
    dialog.confirm({ title: '不支持导出', message: '当前预设类型不支持导出。', confirmText: '确定' });
    return;
  }
  const payload = store.exportAll();
  const json = JSON.stringify(payload, null, 2);

  const textarea = el('textarea', {
    className: 'yyt-textarea',
    style: { width: '100%', minHeight: '220px', fontSize: '12px', fontFamily: 'monospace' }
  });
  textarea.value = json;
  textarea.readOnly = true;

  dialog.custom({
    title: `导出 ${kind || ''} 预设`,
    width: '600px',
    body: textarea,
    buttons: [
      { label: '关闭', variant: 'ghost', onClick: (close) => close(null) },
      {
        label: '复制到剪贴板',
        variant: 'ghost',
        onClick: async () => {
          try {
            await navigator.clipboard.writeText(json);
          } catch (_) {
            textarea.select();
            try { document.execCommand('copy'); } catch (_) {}
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
            const a = el('a', {
              attrs: {
                href: url,
                download: `${kind || 'preset'}_${Date.now()}.json`
              }
            });
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
              try { document.body.removeChild(a); } catch (_) {}
              try { URL.revokeObjectURL(url); } catch (_) {}
            }, 100);
          } catch (err) {
            log.warn('下载失败', { err });
          }
        }
      }
    ]
  });
}

export default createPresetManagerPanel;
