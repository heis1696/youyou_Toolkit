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
  el
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

function renderEditor(preset, { onChange, readonly, refresh }) {
  const wrapper = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } });

  // 基本信息
  wrapper.appendChild(formRow({
    label: '描述',
    control: textInput({
      value: preset.description,
      placeholder: '可选 — 备注用途',
      disabled: readonly,
      onChange: (v) => onChange({ description: v })
    })
  }));
  wrapper.appendChild(formRow({
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
  wrapper.appendChild(toggle({
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
  bookListWrapper.appendChild(el('div', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }
  },
    el('div', {
      text: '选中的世界书',
      style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' }
    }),
    (() => {
      const actions = el('div', { style: { display: 'flex', gap: '6px' } });
      if (!isCharacterMode && !readonly) {
        actions.appendChild(button({
          label: '+ 添加',
          size: 'small',
          onClick: async () => {
            const all = getCachedAvailableWorldbooks();
            const existing = new Set(preset.bookList.map((b) => b.bookName));
            const candidates = all.filter((n) => !existing.has(n));
            if (!candidates.length) {
              await dialog.confirm({
                title: '没有可添加的世界书',
                message: '缓存里已被全部加入或宿主未提供。',
                confirmText: '确定'
              });
              return;
            }
            const pick = await dialog.prompt({
              title: '添加世界书',
              message: `候选列表：\n${candidates.join(', ')}`,
              defaultValue: candidates[0] || '',
              placeholder: '世界书名（必须存在于宿主）'
            });
            if (!pick) return;
            const updated = [...preset.bookList, { bookName: pick, enabled: true, entryOverrides: {} }];
            store.updatePreset(preset.id, { bookList: updated });
            refresh && refresh();
          }
        }).el);
      }
      actions.appendChild(button({
        label: '🔄 刷新',
        size: 'small',
        variant: 'ghost',
        onClick: async () => {
          try { await getAvailableWorldbooks(); } catch (e) { log.warn('刷新失败', { e }); }
          refresh && refresh();
        }
      }).el);
      return actions;
    })()
  ));

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
    if (r?.el) bookListWrapper.appendChild(r.el);
    else if (r instanceof Node) bookListWrapper.appendChild(r);
  }
  wrapper.appendChild(bookListWrapper);

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
