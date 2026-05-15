/**
 * YouYou Toolkit - 世界书预设面板
 *
 * 详见 docs/PHASE3_ARCHITECTURE.md §7（世界书注入预设）+ §12（预设面板合并）。
 *
 * 设计简化（v1）：
 *   - 编辑即保存：任何字段变更直接写入 store，不再有 draft / save 按钮
 *   - 词条覆盖（entryOverrides）UI 留到迭代 2，本期只暴露整本启停
 *   - "添加世界书"用浏览器 prompt，UI dialog 留到迭代 2
 *
 * 使用 modules/ui/components/controls 控件库构建 DOM。
 */

import {
  flowSection,
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
import { logger } from '../../core/logger-service.js';

const log = logger.createScope('WorldbookPresetPanel');

function unwrap($container) {
  if (!$container) return null;
  if ($container.length !== undefined && typeof $container.get === 'function') {
    return $container.get(0);
  }
  return $container;
}

function selectedId(state) {
  if (state.selectedId) return state.selectedId;
  const list = state.presets;
  return list.length ? list[0].id : '';
}

function findSelected(state) {
  const id = selectedId(state);
  return id ? state.presets.find((p) => p.id === id) || null : null;
}

function modeLabel(mode) {
  return mode === BINDING_MODES.CUSTOM ? '自定义' : '跟随角色卡';
}

function loadState() {
  return {
    presets: store.listPresets(),
    selectedId: store.getCurrentPresetId(),
    availableBooks: getCachedAvailableWorldbooks()
  };
}

/**
 * 构建预设列表 section。
 */
function buildPresetSection(state, refresh) {
  const rows = state.presets.length
    ? state.presets.map((preset) => listRow({
        name: preset.name,
        desc: `${modeLabel(preset.bindingMode)} · ${preset.bookList.length} 本世界书${preset.includeDisabled ? ' · 含禁用' : ''}`,
        active: preset.id === selectedId(state),
        onClick: () => {
          store.setCurrentPresetId(preset.id);
          state.selectedId = preset.id;
          refresh();
        },
        actions: [
          button({
            label: '复制', size: 'small', variant: 'ghost', title: '复制此预设',
            onClick: (e) => {
              e.stopPropagation();
              const copy = store.duplicatePreset(preset.id);
              if (copy) {
                store.setCurrentPresetId(copy.id);
                state.selectedId = copy.id;
              }
              refresh();
            }
          }),
          button({
            label: '✎', size: 'small', variant: 'ghost', title: '重命名',
            onClick: (e) => {
              e.stopPropagation();
              const newName = window.prompt('预设名', preset.name);
              if (newName != null) {
                store.renamePreset(preset.id, newName);
                refresh();
              }
            }
          }),
          button({
            label: '×', size: 'small', variant: 'danger', title: '删除',
            onClick: (e) => {
              e.stopPropagation();
              if (!window.confirm(`删除预设 "${preset.name}" ？`)) return;
              store.deletePreset(preset.id);
              if (state.selectedId === preset.id) state.selectedId = '';
              refresh();
            }
          })
        ]
      }))
    : [el('div', {
        style: {
          padding: '24px 0',
          textAlign: 'center',
          color: 'var(--yyt-text-muted)',
          fontSize: '12px'
        },
        text: '暂无预设。点击右上角"+ 新建预设"开始。'
      })];

  return flowSection({
    heading: '预设选择',
    icon: '📚',
    actions: [
      button({
        label: '+ 新建预设', size: 'small',
        onClick: () => {
          const name = window.prompt('新预设名', '新预设');
          if (name == null) return;
          const created = store.createPreset({ name: name || '新预设' });
          store.setCurrentPresetId(created.id);
          state.selectedId = created.id;
          refresh();
        }
      })
    ],
    content: rows
  });
}

/**
 * 构建基本信息 section。
 */
function buildBasicSection(state, refresh) {
  const preset = findSelected(state);
  if (!preset) return null;

  return flowSection({
    heading: '基本信息',
    icon: 'ⓘ',
    content: [
      formRow({
        label: '预设名',
        control: textInput({
          value: preset.name,
          onChange: (v) => {
            store.updatePreset(preset.id, { name: v });
            refresh();
          }
        })
      }),
      formRow({
        label: '描述',
        control: textInput({
          value: preset.description,
          placeholder: '可选 — 备注用途',
          onChange: (v) => {
            store.updatePreset(preset.id, { description: v });
          }
        })
      }),
      formRow({
        label: '绑定模式',
        hint: '跟随角色卡 = 注入当前角色绑定的世界书；自定义 = 用下方手动选择的列表',
        control: selectInput({
          value: preset.bindingMode,
          options: [
            { value: BINDING_MODES.CHARACTER_CARD, label: '跟随角色卡（动态）' },
            { value: BINDING_MODES.CUSTOM, label: '自定义（固定列表）' }
          ],
          onChange: (v) => {
            store.updatePreset(preset.id, { bindingMode: v });
            refresh();
          }
        })
      }),
      toggle({
        label: '包含禁用词条',
        hint: '开启后：源世界书中已禁用的词条可被本预设强制启用并注入（仅在词条覆盖中勾选时生效）',
        checked: preset.includeDisabled,
        onChange: (v) => {
          store.updatePreset(preset.id, { includeDisabled: v });
        }
      })
    ]
  });
}

/**
 * 构建"选中的世界书" section。
 */
function buildBooksSection(state, refresh) {
  const preset = findSelected(state);
  if (!preset) return null;

  const isCharacterMode = preset.bindingMode === BINDING_MODES.CHARACTER_CARD;

  let rows = [];
  if (isCharacterMode) {
    if (!state.availableBooks.length) {
      rows = [el('div', {
        style: { padding: '14px 0', color: 'var(--yyt-text-muted)', fontSize: '12px' },
        text: '当前角色卡未绑定世界书 — 切换到"自定义"可以手动选择任意世界书。'
      })];
    } else {
      rows = state.availableBooks.map((bookName) => {
        const existing = preset.bookList.find((b) => b.bookName === bookName);
        const enabled = existing ? existing.enabled !== false : true;
        return listRow({
          name: bookName,
          desc: enabled ? '已启用 · 整本注入' : '已禁用',
          actions: [
            toggle({
              checked: enabled,
              onChange: (v) => toggleBookInPreset(preset, bookName, v)
            })
          ]
        });
      });
    }
  } else {
    if (!preset.bookList.length) {
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
            onChange: (v) => toggleBookInPreset(preset, book.bookName, v)
          }),
          button({
            label: '×', size: 'small', variant: 'danger', title: '从预设移除',
            onClick: () => removeBookFromPreset(preset, book.bookName, refresh)
          })
        ]
      }));
    }
  }

  const actions = [];
  if (!isCharacterMode) {
    actions.push(button({
      label: '+ 添加', size: 'small',
      onClick: () => {
        const all = getCachedAvailableWorldbooks();
        const existing = new Set(preset.bookList.map((b) => b.bookName));
        const candidates = all.filter((n) => !existing.has(n));
        if (!candidates.length) {
          window.alert('没有可添加的世界书（缓存里已被全部加入或宿主未提供）');
          return;
        }
        const pick = window.prompt(`输入要添加的世界书名（可选：\n${candidates.join('\n')}\n）`, candidates[0] || '');
        if (!pick) return;
        const updated = [...preset.bookList, { bookName: pick, enabled: true, entryOverrides: {} }];
        store.updatePreset(preset.id, { bookList: updated });
        refresh();
      }
    }));
  }
  actions.push(button({
    label: '🔄 刷新世界书列表', size: 'small', variant: 'ghost',
    onClick: async () => {
      try {
        const books = await getAvailableWorldbooks();
        state.availableBooks = books;
      } catch (error) {
        log.warn('刷新世界书列表失败', { error });
      }
      refresh();
    }
  }));

  return flowSection({
    heading: '选中的世界书',
    icon: '📑',
    actions,
    content: rows
  });
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

function removeBookFromPreset(preset, bookName, refresh) {
  const list = preset.bookList.filter((b) => b.bookName !== bookName);
  store.updatePreset(preset.id, { bookList: list });
  refresh();
}

/**
 * 构建 footer（导入 / 导出）。
 */
function buildFooter(state, refresh) {
  const footer = el('div', {
    className: 'yyt-panel-footer',
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 20px',
      borderTop: '1px solid var(--yyt-border)'
    }
  });

  const left = el('div', { style: { display: 'flex', gap: '8px' } });
  left.appendChild(button({
    label: '📥 导入', size: 'small',
    onClick: () => {
      const text = window.prompt('粘贴导出的 JSON：');
      if (!text) return;
      try {
        const payload = JSON.parse(text);
        const result = store.importPresets(payload);
        window.alert(`导入完成：新增 ${result.added} 条`);
        refresh();
      } catch (error) {
        window.alert(`导入失败：${error?.message || error}`);
      }
    }
  }).el);
  left.appendChild(button({
    label: '📤 导出', size: 'small',
    onClick: () => {
      const text = JSON.stringify(store.exportAll(), null, 2);
      try {
        navigator.clipboard?.writeText?.(text);
        window.alert('已复制到剪贴板');
      } catch (_) {
        window.prompt('导出 JSON（复制保存）：', text);
      }
    }
  }).el);
  footer.appendChild(left);

  const right = el('div', { style: { display: 'flex', gap: '8px' } });
  right.appendChild(button({
    label: '清空所有预设', size: 'small', variant: 'danger',
    onClick: () => {
      if (!window.confirm('确定清空所有世界书预设？此操作不可撤销。')) return;
      store.resetAll();
      refresh();
    }
  }).el);
  footer.appendChild(right);

  return footer;
}

/**
 * 主面板对象。
 */
export const WorldbookPresetPanel = {
  id: 'worldbookPresetPanel',

  renderTo($container) {
    const containerEl = unwrap($container);
    if (!containerEl) return;

    // 清理上一次实例
    if (containerEl._yytWorldbookPanelCleanup) {
      try { containerEl._yytWorldbookPanelCleanup(); } catch (_) {}
    }

    const state = loadState();

    function refresh() {
      WorldbookPresetPanel.renderTo($container);
    }

    const root = el('div', {
      className: 'yyt-worldbook-preset-panel',
      style: { display: 'flex', flexDirection: 'column', height: '100%' }
    });

    const presetSection = buildPresetSection(state, refresh);
    root.appendChild(presetSection.el);

    const basicSection = buildBasicSection(state, refresh);
    if (basicSection) root.appendChild(basicSection.el);

    const booksSection = buildBooksSection(state, refresh);
    if (booksSection) root.appendChild(booksSection.el);

    const footer = buildFooter(state, refresh);
    root.appendChild(footer);

    containerEl.innerHTML = '';
    containerEl.appendChild(root);

    // 注册清理函数
    const childrenToDestroy = [presetSection, basicSection, booksSection].filter(Boolean);
    containerEl._yytWorldbookPanelCleanup = () => {
      for (const c of childrenToDestroy) {
        try { c.destroy(); } catch (_) {}
      }
      delete containerEl._yytWorldbookPanelCleanup;
    };

    // 异步加载世界书列表
    if (!state.availableBooks.length) {
      getAvailableWorldbooks().then((books) => {
        if (containerEl._yytWorldbookPanelCleanup) {
          state.availableBooks = books;
          refresh();
        }
      }).catch((error) => {
        log.warn('加载世界书列表失败', { error });
      });
    }
  },

  destroy(container) {
    const containerEl = unwrap(container);
    if (containerEl?._yytWorldbookPanelCleanup) {
      try { containerEl._yytWorldbookPanelCleanup(); } catch (_) {}
    }
  },

  getStyles() {
    // 主要样式都复用 styles/main.css 已有的 yyt- 前缀类，只补 panel 局部
    return `
      .yyt-worldbook-preset-panel { gap: 0; }
    `;
  }
};

export default WorldbookPresetPanel;
