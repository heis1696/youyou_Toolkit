/**
 * YouYou Toolkit - 正则提取预设面板（议题 #45 Stage 3B 改写）
 *
 * 接入 PresetManagerBase；保留正则特有的：
 *   - 编辑器：基本信息 + 规则列表（HTML5 拖拽排序）+ 黑名单（chipGroup）
 *   - extras：测试提取
 *
 * 列表 / 导入 / 导出 / 新建 / 删除 / 重命名 由 base 处理。
 */

import {
  formRow,
  textInput,
  selectInput,
  toggle,
  button,
  chipGroup,
  el,
  appendChild
} from './controls/index.js';

import store, { RULE_TYPES } from '../../regex-preset-store.js';
import { extractTagContent } from '../../regex-extractor.js';
import { logger } from '../../core/logger-service.js';
import { createPresetManagerPanel } from './preset-manager-base.js';

const log = logger.createScope('RegexExtractPanel');

const RULE_TYPE_OPTIONS = [
  { value: RULE_TYPES.INCLUDE, label: 'include — 提取标签' },
  { value: RULE_TYPES.EXCLUDE, label: 'exclude — 排除标签' },
  { value: RULE_TYPES.REGEX_INCLUDE, label: 'regex_include — 正则提取' },
  { value: RULE_TYPES.REGEX_EXCLUDE, label: 'regex_exclude — 正则排除' }
];

// 模块级测试输入持久化（跨重渲染保留）
const _testStateByPresetId = new Map();

// ─── 规则行（含拖拽排序，议题 #45 Stage 3B inline 实现，不抽通用控件）─────
function buildRuleRow(preset, rule, index, totalCount, refresh, readonly) {
  const row = el('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto',
      gap: '10px',
      alignItems: 'center',
      padding: '10px 0',
      borderTop: index === 0 ? 'none' : '1px solid var(--yyt-border)',
      opacity: rule.enabled === false ? '0.55' : '1'
    },
    attrs: {
      draggable: readonly ? null : 'true',
      'data-rule-id': rule.id
    }
  });

  // 拖拽手柄
  const dragHandle = el('div', {
    style: {
      cursor: readonly ? 'default' : 'grab',
      padding: '4px',
      color: 'var(--yyt-text-muted)',
      fontSize: '14px',
      userSelect: 'none'
    },
    text: '⋮⋮',
    title: readonly ? '内置预设不可重排' : '拖动排序'
  });
  row.appendChild(dragHandle);

  // 上下移按钮（备选）
  const moveBox = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } });
  const upBtn = button({
    label: '▲', size: 'small', variant: 'ghost', title: '上移',
    disabled: readonly || index === 0,
    style: { padding: '0 6px', minHeight: 'auto', fontSize: '9px' },
    onClick: () => { store.moveRule(preset.id, rule.id, 'up'); refresh(); }
  });
  const downBtn = button({
    label: '▼', size: 'small', variant: 'ghost', title: '下移',
    disabled: readonly || index === totalCount - 1,
    style: { padding: '0 6px', minHeight: 'auto', fontSize: '9px' },
    onClick: () => { store.moveRule(preset.id, rule.id, 'down'); refresh(); }
  });
  moveBox.appendChild(upBtn.el);
  moveBox.appendChild(downBtn.el);
  row.appendChild(moveBox);

  const nameBox = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' } });
  const nameInput = textInput({
    value: rule.name || '',
    placeholder: '规则名（可选）',
    disabled: readonly,
    style: { fontSize: '12px', padding: '6px 10px' },
    onChange: (v) => store.updateRule(preset.id, rule.id, { name: v })
  });
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
    disabled: readonly,
    options: RULE_TYPE_OPTIONS,
    style: { fontSize: '11px', padding: '6px 10px' },
    onChange: (v) => { store.updateRule(preset.id, rule.id, { type: v }); refresh(); }
  });
  row.appendChild(typeSelect.el);

  const isRegexType = rule.type === RULE_TYPES.REGEX_INCLUDE || rule.type === RULE_TYPES.REGEX_EXCLUDE;
  const valueInput = textInput({
    value: rule.value || '',
    placeholder: isRegexType ? '正则表达式...' : '标签名（如 content）',
    disabled: readonly,
    style: { fontSize: '12px', padding: '6px 10px', fontFamily: 'ui-monospace, monospace' },
    onChange: (v) => store.updateRule(preset.id, rule.id, { value: v })
  });
  row.appendChild(valueInput.el);

  const actions = el('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } });
  const enableToggle = toggle({
    checked: rule.enabled !== false,
    disabled: readonly,
    style: { padding: '0', border: 'none', background: 'transparent' },
    onChange: (v) => { store.updateRule(preset.id, rule.id, { enabled: v }); refresh(); }
  });
  actions.appendChild(enableToggle.el);
  if (!readonly) {
    actions.appendChild(button({
      label: '×', size: 'small', variant: 'ghost', title: '删除规则',
      onClick: () => {
        store.deleteRule(preset.id, rule.id);
        refresh();
      }
    }).el);
  }
  row.appendChild(actions);

  return row;
}

// HTML5 drag-and-drop binding helper（inline 实现，未抽通用控件）
function bindRulesDragAndDrop(listContainer, preset, refresh) {
  let draggingId = null;

  listContainer.addEventListener('dragstart', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const ruleEl = target.closest('[data-rule-id]');
    if (!ruleEl) return;
    draggingId = ruleEl.getAttribute('data-rule-id');
    ruleEl.style.opacity = '0.4';
    try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', draggingId); } catch (_) {}
  });

  listContainer.addEventListener('dragend', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement) target.style.opacity = '';
    draggingId = null;
  });

  listContainer.addEventListener('dragover', (e) => {
    if (!draggingId) return;
    e.preventDefault();
    try { e.dataTransfer.dropEffect = 'move'; } catch (_) {}
  });

  listContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!draggingId) return;
    const targetEl = (e.target instanceof HTMLElement) ? e.target.closest('[data-rule-id]') : null;
    if (!targetEl) return;
    const targetId = targetEl.getAttribute('data-rule-id');
    if (!targetId || targetId === draggingId) return;

    // 计算需要移动的步数 + 方向
    const cur = store.getPreset(preset.id);
    if (!cur) return;
    const fromIdx = cur.rules.findIndex((r) => r.id === draggingId);
    const toIdx = cur.rules.findIndex((r) => r.id === targetId);
    if (fromIdx < 0 || toIdx < 0) return;

    // 一次性 reorder：把 dragging 插入 target 位置
    const newRules = [...cur.rules];
    const [moved] = newRules.splice(fromIdx, 1);
    newRules.splice(toIdx, 0, moved);
    store.updatePreset(preset.id, { rules: newRules });
    refresh();
  });
}

// ─── renderEditor：基本信息 + 规则 + 黑名单 ─────
function renderEditor(preset, { onChange, readonly, refresh }) {
  const wrapper = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } });

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

  // 规则区
  const rulesHeading = el('div', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }
  },
    el('div', {
      text: '提取规则（按顺序应用）',
      style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' }
    }),
    !readonly ? button({
      label: '+ 新增规则',
      size: 'small',
      onClick: () => {
        store.addRule(preset.id, { type: RULE_TYPES.INCLUDE, value: '', enabled: true });
        refresh && refresh();
      }
    }).el : el('span', { text: '内置预设只读', style: { fontSize: '11px', color: 'var(--yyt-text-muted)' } })
  );
  appendChild(wrapper, rulesHeading);

  const rulesContainer = el('div');
  if (preset.rules.length) {
    for (let i = 0; i < preset.rules.length; i++) {
      rulesContainer.appendChild(
        buildRuleRow(preset, preset.rules[i], i, preset.rules.length, refresh, readonly)
      );
    }
    if (!readonly) bindRulesDragAndDrop(rulesContainer, preset, refresh);
  } else {
    rulesContainer.appendChild(el('div', {
      style: { padding: '14px 0', color: 'var(--yyt-text-muted)', fontSize: '12px' },
      text: '尚无规则。点击右上角"+ 新增规则"开始添加。'
    }));
  }
  appendChild(wrapper, rulesContainer);

  // 黑名单（chipGroup）
  appendChild(wrapper, el('div', {
    text: '内容黑名单',
    style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)', marginTop: '6px', marginBottom: '4px' }
  }));
  appendChild(wrapper, el('div', {
    text: '提取出的内容块若包含任一关键词则跳过该块（不区分大小写）。',
    style: { fontSize: '11px', color: 'var(--yyt-text-muted)', marginBottom: '6px' }
  }));
  if (readonly) {
    appendChild(wrapper, el('div', {
      style: { fontSize: '12px', color: 'var(--yyt-text-muted)' },
      text: preset.blacklist.length ? preset.blacklist.join('、') : '（空）'
    }));
  } else {
    const chipsCtrl = chipGroup({
      values: preset.blacklist,
      placeholder: '输入关键词回车添加',
      chipVariant: 'danger',
      onChange: (values) => store.setBlacklist(preset.id, values)
    });
    appendChild(wrapper, chipsCtrl.el);
  }

  return wrapper;
}

// ─── renderExtras：测试提取 ─────
function renderExtras(preset) {
  if (!preset) return null;
  const wrapper = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } });

  appendChild(wrapper, el('div', {
    text: '测试提取',
    style: { fontSize: '12px', fontWeight: '700', color: 'var(--yyt-text)' }
  }));

  const testState = _testStateByPresetId.get(preset.id) || { input: '', output: '' };
  _testStateByPresetId.set(preset.id, testState);

  const inputArea = el('textarea', {
    className: 'yyt-textarea',
    attrs: { rows: '5', placeholder: '粘贴测试文本（如 AI 回复原文）...' },
    style: { width: '100%', resize: 'vertical', fontFamily: 'ui-monospace, monospace', fontSize: '12px' }
  });
  inputArea.value = testState.input;
  inputArea.addEventListener('input', () => { testState.input = inputArea.value; });
  appendChild(wrapper, inputArea);

  const outputBox = el('div', {
    style: {
      padding: '10px',
      background: 'var(--yyt-bg-base)',
      border: '1px solid var(--yyt-border)',
      borderRadius: 'var(--yyt-radius-sm)',
      fontFamily: 'ui-monospace, monospace',
      fontSize: '11px',
      lineHeight: '1.6',
      color: 'var(--yyt-text-muted)',
      maxHeight: '200px',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      minHeight: '50px'
    }
  });
  outputBox.textContent = testState.output || '// 点击"运行测试"看提取结果';

  const runBtn = button({
    label: '▶ 运行测试',
    size: 'small',
    variant: 'primary',
    onClick: () => {
      const text = inputArea.value;
      if (!text.trim()) {
        testState.output = '// 测试输入为空';
        outputBox.textContent = testState.output;
        outputBox.style.color = 'var(--yyt-text-muted)';
        return;
      }
      try {
        const result = extractTagContent(text, preset.rules || [], preset.blacklist || []);
        testState.output = result || '// 没有提取到内容';
        outputBox.textContent = testState.output;
        outputBox.style.color = result ? 'var(--yyt-text)' : 'var(--yyt-text-muted)';
      } catch (error) {
        testState.output = `// 测试出错：${error?.message || error}`;
        outputBox.textContent = testState.output;
        outputBox.style.color = 'var(--yyt-danger, #f87171)';
      }
    }
  });
  appendChild(wrapper, runBtn.el);
  appendChild(wrapper, outputBox);

  return wrapper;
}

function renderListItemMeta(preset) {
  const enabledCount = preset.rules.filter((r) => r.enabled !== false).length;
  return [
    `${preset.rules.length} 规则（${enabledCount} 启用）`,
    `${preset.blacklist.length} 黑名单`
  ];
}

export const RegexExtractPanel = createPresetManagerPanel({
  id: 'regexExtractPanel',
  kind: 'regex',
  panelTitle: '正则提取预设',
  panelHint: '管理多个提取规则集，工具配置中通过预设 ID 引用。规则按顺序应用，可拖拽排序。',
  store,
  renderEditor,
  renderExtras,
  renderListItemMeta
});

export default RegexExtractPanel;
