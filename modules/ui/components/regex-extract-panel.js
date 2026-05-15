/**
 * YouYou Toolkit - 正则提取预设面板
 *
 * 详见 docs/PHASE3_ARCHITECTURE.md §2（正则提取改为完整预设管理器）。
 *
 * 设计简化（v1 iter 1）：
 *   - 编辑即保存：任何字段变更直接写入 store
 *   - 规则排序用 ▲▼ 按钮（拖拽留到 iter 2）
 *   - 黑名单用 textarea 一行一个（chip-group 留到 iter 2）
 *   - 添加规则只填类型 + 值，name/description 自动留空
 *   - 新建预设、导入、清空走 window.prompt/confirm（自定义 dialog 留到 iter 2）
 *
 * 引擎同步：切换 active preset 或编辑 active preset 时，store 自动把 rules+blacklist
 * 灌到 regex-extractor 模块级状态，使现有 extractTagContent 调用路径自动用最新规则。
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

import store, { RULE_TYPES } from '../../regex-preset-store.js';
import { extractTagContent } from '../../regex-extractor.js';
import { logger } from '../../core/logger-service.js';

const log = logger.createScope('RegexExtractPanel');

const RULE_TYPE_OPTIONS = [
  { value: RULE_TYPES.INCLUDE, label: 'include — 提取标签' },
  { value: RULE_TYPES.EXCLUDE, label: 'exclude — 排除标签' },
  { value: RULE_TYPES.REGEX_INCLUDE, label: 'regex_include — 正则提取' },
  { value: RULE_TYPES.REGEX_EXCLUDE, label: 'regex_exclude — 正则排除' }
];

function unwrap($container) {
  if (!$container) return null;
  if ($container.length !== undefined && typeof $container.get === 'function') {
    return $container.get(0);
  }
  return $container;
}

function loadState() {
  return {
    presets: store.listPresets(),
    selectedId: store.getCurrentPresetId(),
    testInput: '',
    testOutput: '',
    linkedTools: {}
  };
}

function findSelected(state) {
  if (!state.selectedId) return null;
  return state.presets.find((p) => p.id === state.selectedId) || null;
}

function buildPresetSection(state, refresh) {
  const rows = state.presets.length
    ? state.presets.map((preset) => {
        const linked = state.linkedTools[preset.id] || [];
        const enabledCount = preset.rules.filter((r) => r.enabled !== false).length;
        return listRow({
          name: preset.name,
          desc: `${preset.rules.length} 条规则（${enabledCount} 启用） · ${preset.blacklist.length} 黑名单${linked.length ? ` · 被 ${linked.length} 个工具引用` : ''}`,
          active: preset.id === state.selectedId,
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
                const linkedToolIds = state.linkedTools[preset.id] || [];
                let msg = `删除预设 "${preset.name}" ？`;
                if (linkedToolIds.length) {
                  msg += `\n\n注意：以下 ${linkedToolIds.length} 个工具引用了此预设，删除后它们的提取将失效：\n  ${linkedToolIds.join(', ')}`;
                }
                if (!window.confirm(msg)) return;
                store.deletePreset(preset.id);
                if (state.selectedId === preset.id) state.selectedId = store.getCurrentPresetId();
                refresh();
              }
            })
          ]
        });
      })
    : [el('div', {
        style: { padding: '24px 0', textAlign: 'center', color: 'var(--yyt-text-muted)', fontSize: '12px' },
        text: '暂无预设。点击右上角"+ 新建预设"开始。'
      })];

  return flowSection({
    heading: '预设选择',
    icon: '🔖',
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

function buildBasicSection(state, refresh) {
  const preset = findSelected(state);
  if (!preset) return null;

  const linked = state.linkedTools[preset.id] || [];

  return flowSection({
    heading: '基本信息',
    icon: 'ⓘ',
    content: [
      formRow({
        label: '预设名',
        control: textInput({
          value: preset.name,
          onChange: (v) => { store.updatePreset(preset.id, { name: v }); refresh(); }
        })
      }),
      formRow({
        label: '描述',
        control: textInput({
          value: preset.description,
          placeholder: '可选 — 备注用途',
          onChange: (v) => { store.updatePreset(preset.id, { description: v }); }
        })
      }),
      el('div', {
        style: {
          marginTop: '10px',
          padding: '10px 12px',
          background: 'var(--yyt-surface-2)',
          borderRadius: 'var(--yyt-radius-sm)',
          fontSize: '11px',
          color: 'var(--yyt-text-muted)',
          lineHeight: '1.7'
        },
        html: linked.length
          ? `<strong style="color:var(--yyt-text)">被引用：</strong>${linked.map((id) => `<span style="display:inline-block;padding:2px 8px;border-radius:999px;background:var(--yyt-accent-soft);color:var(--yyt-accent);font-weight:600;margin-right:4px;">${id}</span>`).join('')}`
          : '<strong style="color:var(--yyt-text)">被引用：</strong>暂无工具引用此预设。可在工具配置面板的"提取配置"区将工具绑定到本预设。'
      })
    ]
  });
}

function buildRuleRow(preset, rule, index, totalCount, refresh) {
  const row = el('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto',
      gap: '10px',
      alignItems: 'center',
      padding: '12px 0',
      borderTop: index === 0 ? 'none' : '1px solid var(--yyt-border)',
      opacity: rule.enabled === false ? '0.5' : '1'
    }
  });

  const moveBox = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } });
  const upBtn = button({
    label: '▲', size: 'small', variant: 'ghost', title: '上移',
    disabled: index === 0,
    onClick: () => { store.moveRule(preset.id, rule.id, 'up'); refresh(); }
  });
  const downBtn = button({
    label: '▼', size: 'small', variant: 'ghost', title: '下移',
    disabled: index === totalCount - 1,
    onClick: () => { store.moveRule(preset.id, rule.id, 'down'); refresh(); }
  });
  for (const b of [upBtn, downBtn]) {
    b.el.style.padding = '2px 8px';
    b.el.style.minHeight = 'auto';
    b.el.style.fontSize = '10px';
  }
  moveBox.appendChild(upBtn.el);
  moveBox.appendChild(downBtn.el);
  row.appendChild(moveBox);

  const nameBox = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' } });
  const nameInput = textInput({
    value: rule.name || '',
    placeholder: '规则名（可选）',
    onChange: (v) => store.updateRule(preset.id, rule.id, { name: v })
  });
  nameInput.el.style.fontSize = '12px';
  nameInput.el.style.padding = '6px 10px';
  nameBox.appendChild(nameInput.el);
  if (rule.description) {
    nameBox.appendChild(el('div', {
      text: rule.description,
      style: { fontSize: '10px', color: 'var(--yyt-text-muted)' }
    }));
  }
  row.appendChild(nameBox);

  const typeSelect = selectInput({
    value: rule.type,
    options: RULE_TYPE_OPTIONS,
    onChange: (v) => { store.updateRule(preset.id, rule.id, { type: v }); refresh(); }
  });
  typeSelect.el.style.fontSize = '11px';
  typeSelect.el.style.padding = '6px 10px';
  row.appendChild(typeSelect.el);

  const isRegexType = rule.type === RULE_TYPES.REGEX_INCLUDE || rule.type === RULE_TYPES.REGEX_EXCLUDE;
  const valueInput = textInput({
    value: rule.value || '',
    placeholder: isRegexType ? '正则表达式...' : '标签名（如 content）',
    onChange: (v) => store.updateRule(preset.id, rule.id, { value: v })
  });
  valueInput.el.style.fontSize = '12px';
  valueInput.el.style.padding = '6px 10px';
  valueInput.el.style.fontFamily = 'ui-monospace, monospace';
  row.appendChild(valueInput.el);

  const actions = el('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } });
  const enableToggle = toggle({
    checked: rule.enabled !== false,
    onChange: (v) => { store.updateRule(preset.id, rule.id, { enabled: v }); refresh(); }
  });
  enableToggle.el.style.padding = '0';
  enableToggle.el.style.border = 'none';
  enableToggle.el.style.background = 'transparent';
  actions.appendChild(enableToggle.el);
  actions.appendChild(button({
    label: '×', size: 'small', variant: 'danger', title: '删除规则',
    onClick: () => {
      if (!window.confirm('删除这条规则？')) return;
      store.deleteRule(preset.id, rule.id);
      refresh();
    }
  }).el);
  row.appendChild(actions);

  return row;
}

function buildRulesSection(state, refresh) {
  const preset = findSelected(state);
  if (!preset) return null;

  const rows = preset.rules.length
    ? preset.rules.map((rule, idx) => buildRuleRow(preset, rule, idx, preset.rules.length, refresh))
    : [el('div', {
        style: { padding: '14px 0', color: 'var(--yyt-text-muted)', fontSize: '12px' },
        text: '尚无规则。点击右上角"+ 新增规则"开始添加。'
      })];

  return flowSection({
    heading: '提取规则',
    icon: '📜',
    actions: [
      el('span', {
        text: '按顺序依次应用',
        style: { fontSize: '11px', color: 'var(--yyt-text-muted)' }
      }),
      button({
        label: '+ 新增规则', size: 'small',
        onClick: () => {
          store.addRule(preset.id, { type: RULE_TYPES.INCLUDE, value: '', enabled: true });
          refresh();
        }
      })
    ],
    content: rows
  });
}

function buildBlacklistSection(state, refresh) {
  const preset = findSelected(state);
  if (!preset) return null;

  const textarea = el('textarea', {
    className: 'yyt-textarea',
    attrs: { rows: '4', placeholder: '每行一个关键词，命中即跳过该提取块（按子串匹配，不区分大小写）' },
    style: { width: '100%', resize: 'vertical' }
  });
  textarea.value = (preset.blacklist || []).join('\n');
  textarea.addEventListener('change', () => {
    const list = textarea.value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    store.setBlacklist(preset.id, list);
  });

  return flowSection({
    heading: '内容黑名单',
    icon: '⛔',
    content: [
      el('div', {
        className: 'yyt-form-hint',
        text: '提取出的内容块如果包含任意关键词，则跳过该块。',
        style: { marginBottom: '8px' }
      }),
      textarea
    ]
  });
}

function buildTestSection(state) {
  const preset = findSelected(state);
  if (!preset) return null;

  const inputArea = el('textarea', {
    className: 'yyt-textarea',
    attrs: { rows: '6', placeholder: '粘贴测试文本（如 AI 回复原文）...' },
    style: { width: '100%', resize: 'vertical', fontFamily: 'ui-monospace, monospace', fontSize: '12px' }
  });
  inputArea.value = state.testInput || '';
  inputArea.addEventListener('input', () => { state.testInput = inputArea.value; });

  const outputBox = el('div', {
    style: {
      padding: '12px',
      background: 'var(--yyt-bg-base)',
      border: '1px solid var(--yyt-border)',
      borderRadius: 'var(--yyt-radius-sm)',
      fontFamily: 'ui-monospace, monospace',
      fontSize: '11px',
      lineHeight: '1.7',
      color: 'var(--yyt-text-muted)',
      maxHeight: '240px',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      minHeight: '60px'
    }
  });
  if (state.testOutput) {
    outputBox.textContent = state.testOutput;
    outputBox.style.color = 'var(--yyt-text)';
  } else {
    outputBox.textContent = '// 点击"运行测试"看提取结果';
  }

  return flowSection({
    heading: '测试提取',
    icon: '🔍',
    actions: [
      button({
        label: '▶ 运行测试', size: 'small', variant: 'primary',
        onClick: () => {
          const text = inputArea.value;
          if (!text.trim()) {
            state.testOutput = '// 测试输入为空';
            outputBox.textContent = state.testOutput;
            outputBox.style.color = 'var(--yyt-text-muted)';
            return;
          }
          try {
            const result = extractTagContent(text, preset.rules || [], preset.blacklist || []);
            state.testOutput = result || '// 没有提取到内容';
            outputBox.textContent = state.testOutput;
            outputBox.style.color = result ? 'var(--yyt-text)' : 'var(--yyt-text-muted)';
          } catch (error) {
            state.testOutput = `// 测试出错：${error?.message || error}`;
            outputBox.textContent = state.testOutput;
            outputBox.style.color = 'var(--yyt-error, #ef4444)';
          }
        }
      }),
      button({
        label: '清空输出', size: 'small', variant: 'ghost',
        onClick: () => {
          state.testOutput = '';
          outputBox.textContent = '// 点击"运行测试"看提取结果';
          outputBox.style.color = 'var(--yyt-text-muted)';
        }
      })
    ],
    content: [
      el('div', {
        className: 'yyt-form-hint',
        text: '使用当前预设的规则 + 黑名单提取，结果与运行时一致。',
        style: { marginBottom: '8px' }
      }),
      el('div', {
        className: 'yyt-form-label',
        text: '测试输入',
        style: { marginBottom: '4px' }
      }),
      inputArea,
      el('div', {
        className: 'yyt-form-label',
        text: '提取结果',
        style: { marginTop: '12px', marginBottom: '4px' }
      }),
      outputBox
    ]
  });
}

function buildFooter(refresh) {
  const footer = el('div', {
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
      if (!window.confirm('确定清空所有正则预设？此操作不可撤销。')) return;
      store.resetAll();
      refresh();
    }
  }).el);
  footer.appendChild(right);

  return footer;
}

export const RegexExtractPanel = {
  id: 'regexExtractPanel',

  renderTo($container) {
    const containerEl = unwrap($container);
    if (!containerEl) return;

    if (containerEl._yytRegexPanelCleanup) {
      try { containerEl._yytRegexPanelCleanup(); } catch (_) {}
    }

    const state = loadState();

    function refresh() {
      RegexExtractPanel.renderTo($container);
    }

    const root = el('div', {
      className: 'yyt-regex-preset-panel',
      style: { display: 'flex', flexDirection: 'column', height: '100%' }
    });

    const sections = [
      buildPresetSection(state, refresh),
      buildBasicSection(state, refresh),
      buildRulesSection(state, refresh),
      buildBlacklistSection(state, refresh),
      buildTestSection(state)
    ].filter(Boolean);
    for (const s of sections) root.appendChild(s.el);

    const footer = buildFooter(refresh);
    root.appendChild(footer);

    containerEl.innerHTML = '';
    containerEl.appendChild(root);

    containerEl._yytRegexPanelCleanup = () => {
      for (const c of sections) {
        try { c.destroy(); } catch (_) {}
      }
      delete containerEl._yytRegexPanelCleanup;
    };

    // 异步查找被引用工具
    Promise.all(state.presets.map(async (preset) => {
      try {
        const tools = await store.findLinkedTools(preset.id);
        return [preset.id, tools];
      } catch (_) {
        return [preset.id, []];
      }
    })).then((entries) => {
      const newLinked = {};
      for (const [id, tools] of entries) newLinked[id] = tools;
      let changed = false;
      for (const id of Object.keys(newLinked)) {
        const prev = state.linkedTools[id] || [];
        if (prev.join(',') !== newLinked[id].join(',')) { changed = true; break; }
      }
      if (changed && containerEl._yytRegexPanelCleanup) {
        state.linkedTools = newLinked;
        refresh();
      }
    });
  },

  destroy(container) {
    const containerEl = unwrap(container);
    if (containerEl?._yytRegexPanelCleanup) {
      try { containerEl._yytRegexPanelCleanup(); } catch (_) {}
    }
  },

  getStyles() {
    return `
      .yyt-regex-preset-panel { gap: 0; }
    `;
  }
};

export default RegexExtractPanel;
