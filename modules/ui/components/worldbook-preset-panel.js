/**
 * YouYou Toolkit - 世界书预设面板（议题 #45 Stage 3C 改写）
 *
 * 接入 PresetManagerBase；只保留世界书特有的编辑器（基本信息 + 选中世界书）。
 * 列表 / 导入 / 导出 / 新建 / 删除 / 重命名 由 base 统一处理。
 *
 * 词条级 override UI 留 iter 3。
 */

import {
  formRow,
  textInput,
  selectInput,
  toggle,
  button,
  listRow,
  el,
  appendChild
} from './controls/index.js';

import store, { BINDING_MODES } from '../../worldbook-preset-store.js';
import { getAvailableWorldbooks, getCachedAvailableWorldbooks } from '../../tool-worldbook-service.js';
import { dialog } from './controls/dialog.js';
import { logger } from '../../core/logger-service.js';
import { createPresetManagerPanel } from './preset-manager-base.js';

const log = logger.createScope('WorldbookPresetPanel');

function modeLabel(mode) {
  return mode === BINDING_MODES.CUSTOM ? '自定义' : '跟随角色卡';
}

function toggleBookInPreset(preset, bookName, enabled) {
  const list = [...preset.bookList];
  const idx = list.findIndex((b) => b.bookName === bookName);
  if (idx >= 0) {
    list[idx] = { ...list[idx], enabled };
  } else {
    list.push({ bookName, enabled, entryOverrides: {} });
  }
  store.updatePreset(preset.id, { bookList: list });
}

function removeBookFromPreset(preset, bookName) {
  const list = preset.bookList.filter((b) => b.bookName !== bookName);
  store.updatePreset(preset.id, { bookList: list });
}

/**
 * 多选 dialog：从可用世界书列表中勾选要加入预设的项。
 */
async function openAddBooksDialog(preset, refresh) {
  let all = getCachedAvailableWorldbooks();
  if (!all.length) {
    try { all = await getAvailableWorldbooks(); } catch (_) {}
  }
  const existing = new Set(preset.bookList.map((b) => b.bookName));
  const candidates = all.filter((n) => !existing.has(n));

  if (!candidates.length) {
    await dialog.confirm({
      title: '没有可添加的世界书',
      message: '宿主未提供更多可用世界书，或缓存内全部已加入此预设。',
      confirmText: '确定'
    });
    return;
  }

  // 构建搜索 + 多选 list body
  const body = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } });

  const searchInput = el('input', {
    className: 'yyt-input',
    attrs: { type: 'text', placeholder: `搜索 ${candidates.length} 本世界书…`, autocomplete: 'off' },
    style: { padding: '7px 10px', fontSize: '12px' }
  });
  body.appendChild(searchInput);

  const listWrapper = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '320px', overflowY: 'auto' } });
  const checkedSet = new Set();
  const rowItems = [];
  for (const name of candidates) {
    const row = el('label', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 10px',
        cursor: 'pointer',
        borderRadius: 'var(--yyt-radius-sm, 6px)',
        background: 'var(--yyt-surface-2, rgba(255,255,255,0.03))',
        fontSize: '12px'
      }
    });
    const cb = el('input', { attrs: { type: 'checkbox', value: name } });
    cb.addEventListener('change', () => {
      if (cb.checked) checkedSet.add(name);
      else checkedSet.delete(name);
    });
    row.appendChild(cb);
    row.appendChild(el('span', { text: name, style: { color: 'var(--yyt-text)' } }));
    listWrapper.appendChild(row);
    rowItems.push({ el: row, search: name.toLowerCase() });
  }
  body.appendChild(listWrapper);

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    for (const item of rowItems) {
      item.el.style.display = (!q || item.search.includes(q)) ? '' : 'none';
    }
  });

  dialog.custom({
    title: `添加世界书（${candidates.length} 项可选）`,
    width: '480px',
    body,
    buttons: [
      { label: '取消', variant: 'ghost', onClick: (close) => close(null) },
      {
        label: '全选可见',
        variant: 'ghost',
        onClick: () => {
          for (const cb of listWrapper.querySelectorAll('input[type=checkbox]')) {
            const row = cb.closest('label');
            if (!row || row.style.display !== 'none') {
              cb.checked = true;
              checkedSet.add(cb.value);
            }
          }
        }
      },
      {
        label: '添加选中',
        variant: 'primary',
        onClick: (close) => {
          const picked = Array.from(checkedSet);
          if (!picked.length) { close(null); return; }
          const newItems = picked.map((bookName) => ({
            bookName,
            enabled: true,
            entryOverrides: {}
          }));
          const updated = [...preset.bookList, ...newItems];
          store.updatePreset(preset.id, { bookList: updated });
          close(picked.length);
        }
      }
    ]
  }).result.then((added) => {
    if (added && refresh) refresh();
  });
}

function renderEditor(preset, { onChange, readonly, refresh }) {
  const wrapper = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } });

  // 基本信息
  appendChild(wrapper, formRow({
    label: '描述',
    control: textInput({
      value: preset.description,
      placeholder: '可选 — 备注用途',
      disabled: readonly,
      onChange: (v) => onChange({ description: v })
    })
  }));
  appendChild(wrapper, formRow({
    label: '绑定模式',
    hint: '跟随角色卡 = 注入当前角色绑定的世界书；自定义 = 用下方手动选择的列表',
    control: selectInput({
      value: preset.bindingMode,
      disabled: readonly,
      options: [
        { value: BINDING_MODES.CHARACTER_CARD, label: '跟随角色卡（动态）' },
        { value: BINDING_MODES.CUSTOM, label: '自定义（固定列表）' }
      ],
      onChange: (v) => { onChange({ bindingMode: v }); refresh && refresh(); }
    })
  }));
  appendChild(wrapper, toggle({
    label: '包含禁用词条',
    hint: '开启后：源世界书中已禁用的词条可被本预设强制启用并注入',
    checked: preset.includeDisabled,
    disabled: readonly,
    onChange: (v) => onChange({ includeDisabled: v })
  }));

  // 选中的世界书
  const isCharacterMode = preset.bindingMode === BINDING_MODES.CHARACTER_CARD;
  const availableBooks = getCachedAvailableWorldbooks();

  const bookListWrapper = el('div', { style: { display: 'flex', flexDirection: 'column' } });

  const headerRow = el('div', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', gap: '8px' }
  });
  headerRow.appendChild(el('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
    el('div', {
      text: isCharacterMode ? '随角色卡注入的世界书' : '选中的世界书',
      style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' }
    }),
    el('div', {
      text: isCharacterMode
        ? '以下来自当前角色卡的世界书将被注入；可单独关闭某本（不影响其他工具）'
        : '本预设固定注入下列世界书；点击"+ 添加"从可用列表多选',
      style: { fontSize: '11px', color: 'var(--yyt-text-muted)', lineHeight: '1.5' }
    })
  ));

  const headerActions = el('div', { style: { display: 'flex', gap: '6px' } });
  if (!isCharacterMode && !readonly) {
    headerActions.appendChild(button({
      label: '+ 添加',
      size: 'small',
      onClick: () => openAddBooksDialog(preset, refresh)
    }).el);
  }
  headerActions.appendChild(button({
    label: '🔄 刷新',
    size: 'small',
    variant: 'ghost',
    onClick: async () => {
      try { await getAvailableWorldbooks(); } catch (e) { log.warn('刷新失败', { e }); }
      refresh && refresh();
    }
  }).el);
  headerRow.appendChild(headerActions);

  appendChild(bookListWrapper, headerRow);

  let rows = [];
  if (isCharacterMode) {
    if (!availableBooks.length) {
      rows = [el('div', {
        style: { padding: '14px 0', color: 'var(--yyt-text-muted)', fontSize: '12px' },
        text: '当前角色卡未绑定世界书 — 切换到"自定义"可以手动选择任意世界书。'
      })];
    } else {
      rows = availableBooks.map((bookName) => {
        const existing = preset.bookList.find((b) => b.bookName === bookName);
        const enabled = existing ? existing.enabled !== false : true;
        return listRow({
          name: bookName,
          desc: enabled ? '已启用 · 整本注入' : '已禁用',
          actions: [
            toggle({
              checked: enabled,
              disabled: readonly,
              onChange: (v) => toggleBookInPreset(preset, bookName, v)
            })
          ]
        });
      });
    }
  } else if (!preset.bookList.length) {
    rows = [el('div', {
      style: { padding: '14px 0', color: 'var(--yyt-text-muted)', fontSize: '12px' },
      text: '点击右上角"+ 添加"选择世界书加入此预设。'
    })];
  } else {
    rows = preset.bookList.map((book) => listRow({
      name: book.bookName,
      desc: book.enabled === false ? '已禁用' : '已启用 · 整本注入',
      actions: [
        toggle({
          checked: book.enabled !== false,
          disabled: readonly,
          onChange: (v) => toggleBookInPreset(preset, book.bookName, v)
        }),
        ...(readonly ? [] : [button({
          label: '×',
          size: 'small',
          variant: 'ghost',
          title: '从预设移除',
          onClick: () => { removeBookFromPreset(preset, book.bookName); refresh && refresh(); }
        })])
      ]
    }));
  }

  for (const r of rows) {
    if (r?.el) appendChild(bookListWrapper, r.el);
    else if (r instanceof Node) appendChild(bookListWrapper, r);
  }
  appendChild(wrapper, bookListWrapper);

  return wrapper;
}

function renderListItemMeta(preset) {
  const meta = [`${modeLabel(preset.bindingMode)}`, `${preset.bookList.length} 本`];
  if (preset.includeDisabled) meta.push('含禁用');
  return meta;
}

export const WorldbookPresetPanel = createPresetManagerPanel({
  id: 'worldbookPresetPanel',
  kind: 'worldbook',
  panelTitle: '世界书预设',
  panelHint: '管理世界书注入预设。工具配置中通过预设 ID 引用，可绑定角色卡（动态）或固定列表。',
  store,
  renderEditor,
  renderListItemMeta
});

export default WorldbookPresetPanel;
