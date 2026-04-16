/**
 * YouYou Toolkit - 填表工作台表单渲染器
 * @description 基于 schema 渲染最小配置表单，并负责表单取值
 */

import {
  bindDialogEvents,
  createDialogHtml,
  escapeHtml,
  getJQuery,
  getTargetDocument,
  isContainerValid,
  normalizeCustomSelectOptions,
  renderCustomSelectControl,
  showToast
} from '../utils.js';
import {
  createEmptyTableColumn,
  createEmptyTableDefinition,
  deriveTableDraftFromTables,
  validateTableDraft,
  compileTableDraftToTables
} from '../../table-engine/table-schema-service.js';

export const TABLE_FORM_RENDERER_STYLES = `
  .yyt-dialog.yyt-table-editor-dialog {
    border-radius: 24px;
    border-color: rgba(123, 183, 255, 0.18);
    background:
      radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 62%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 28%),
      var(--yyt-bg-base);
    box-shadow: 0 30px 84px rgba(0, 0, 0, 0.6), 0 0 48px rgba(123, 183, 255, 0.08);
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-header {
    padding: 18px 22px;
    border-bottom-color: rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.018) 100%);
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-title {
    font-size: 16px;
    font-weight: 800;
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-body.yyt-table-editor-dialog-body {
    padding: 20px;
    background: rgba(255, 255, 255, 0.01);
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-footer.yyt-table-editor-dialog-footer {
    justify-content: space-between;
    border-top-color: rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.014) 100%);
  }

  .yyt-table-editor-dialog-note {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.62);
    line-height: 1.65;
  }

  .yyt-table-form-grid {
    display: grid;
    gap: 14px;
  }

  .yyt-table-form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .yyt-table-form-field label {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-form-field-desc {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.72);
  }

  .yyt-table-form-field textarea.yyt-textarea,
  .yyt-table-form-field .yyt-input,
  .yyt-table-form-field .yyt-select,
  .yyt-table-form-field .yyt-custom-select {
    width: 100%;
  }

  .yyt-table-form-field button.yyt-select-trigger {
    width: 100%;
    text-align: left;
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
  }

  .yyt-table-form-field button.yyt-select-option {
    width: 100%;
    border: 1px solid transparent;
    background: linear-gradient(180deg, #1c2737 0%, #151e2c 100%);
    color: inherit;
    text-align: left;
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
  }

  .yyt-table-form-field button.yyt-select-option:hover {
    background: linear-gradient(180deg, #243247 0%, #1a2638 100%);
    border-color: rgba(123, 183, 255, 0.22);
    transform: translateY(-1px);
  }

  .yyt-table-form-field button.yyt-select-option.yyt-selected {
    background: linear-gradient(135deg, rgba(123, 183, 255, 0.28) 0%, rgba(72, 119, 190, 0.22) 100%);
    border-color: rgba(123, 183, 255, 0.4);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .yyt-table-form-field .yyt-select-dropdown {
    z-index: 24;
  }

  .yyt-table-form-inline-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: var(--yyt-text);
    font-weight: 700;
  }

  .yyt-table-form-inline-checkbox input {
    width: 18px;
    height: 18px;
    margin: 0;
    accent-color: var(--yyt-accent);
  }

  .yyt-table-editor {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-table-editor-shell {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 18px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(12, 16, 24, 0.32);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 34px rgba(0, 0, 0, 0.16);
  }

  .yyt-table-editor-shell-compact {
    padding: 16px;
  }

  .yyt-table-editor-banner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(123, 183, 255, 0.2);
    background: radial-gradient(280px 120px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 70%), rgba(123, 183, 255, 0.05);
  }

  .yyt-table-editor-banner-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .yyt-table-editor-banner-title {
    font-size: 14px;
    font-weight: 900;
    color: var(--yyt-text);
  }

  .yyt-table-editor-banner-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .yyt-table-editor-chip {
    display: inline-flex;
    align-items: center;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.3px;
    color: var(--yyt-text);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.08);
  }

  .yyt-table-editor-toolbar,
  .yyt-table-editor-section-head,
  .yyt-table-editor-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .yyt-table-editor-toolbar {
    align-items: flex-start;
  }

  .yyt-table-editor-muted {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.68);
  }

  .yyt-table-editor-stack {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-table-editor-empty {
    padding: 16px;
    border-radius: 18px;
    border: 1px dashed rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.03);
  }

  .yyt-table-editor-card {
    padding: 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(10, 14, 22, 0.2);
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 36px rgba(0, 0, 0, 0.18);
  }

  .yyt-table-editor-card-title {
    font-size: 14px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-editor-card-subtitle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .yyt-table-editor-meta {
    display: grid;
    grid-template-columns: minmax(220px, 1fr) minmax(0, 1fr);
    gap: 12px;
  }

  .yyt-table-editor-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
  }

  .yyt-table-editor-section-title {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.82);
  }

  .yyt-table-editor-section-desc {
    font-size: 11px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.56);
  }

  .yyt-table-editor-columns {
    display: grid;
    gap: 10px;
  }

  .yyt-table-editor-column {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(140px, 0.75fr) auto;
    gap: 10px;
    align-items: end;
    padding: 12px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
  }

  .yyt-table-editor-input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .yyt-table-editor-input-group span {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.66);
  }

  .yyt-table-editor-grid-wrap {
    overflow-x: auto;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(8, 12, 18, 0.36);
  }

  .yyt-table-editor-grid {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    background: rgba(8, 12, 18, 0.72);
  }

  .yyt-table-editor-grid th,
  .yyt-table-editor-grid td {
    padding: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: top;
  }

  .yyt-table-editor-grid th {
    text-align: left;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.78);
    background: rgba(255, 255, 255, 0.04);
  }

  .yyt-table-editor-grid td:last-child,
  .yyt-table-editor-grid th:last-child {
    border-right: none;
    width: 60px;
  }

  .yyt-table-editor-grid tr:last-child td {
    border-bottom: none;
  }

  .yyt-table-editor-grid textarea,
  .yyt-table-editor-grid input,
  .yyt-table-editor-column input,
  .yyt-table-editor-meta input,
  .yyt-table-editor-meta textarea {
    width: 100%;
  }

  .yyt-table-editor-grid textarea {
    min-height: 54px;
    resize: vertical;
  }

  @media (max-width: 900px) {
    .yyt-table-editor-meta {
      grid-template-columns: 1fr;
    }

    .yyt-table-editor-column {
      grid-template-columns: 1fr;
    }
  }
`;

function cloneValue(value) {
  if (value === undefined) return undefined;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (_) {
    return value;
  }
}

function getFieldStringValue(field, value) {
  if (field.type === 'json') {
    const sourceValue = value === undefined ? field.emptyValue : value;
    if (typeof sourceValue === 'string') {
      return sourceValue;
    }

    try {
      return JSON.stringify(sourceValue ?? null, null, 2);
    } catch (_) {
      return String(sourceValue ?? '');
    }
  }

  return String(value ?? '');
}

function renderCustomSelect(field = {}, selectedValue = '') {
  const fieldName = String(field.name || '').trim();
  const fieldId = `yyt-table-field-${fieldName}`;
  const valueId = `${fieldId}-value`;
  const dropdownId = `${fieldId}-dropdown`;
  const normalizedOptions = normalizeCustomSelectOptions(field.options || []);

  return renderCustomSelectControl({
    selectedValue,
    options: normalizedOptions,
    placeholder: normalizedOptions[0]?.label || '请选择',
    rootAttributes: {
      'data-table-custom-select': 'true'
    },
    nativeAttributes: {
      class: 'yyt-table-select-native',
      id: valueId,
      'data-table-field': fieldName,
      'data-field-type': 'select'
    },
    triggerAttributes: {
      id: fieldId,
      'data-table-select-trigger': 'true',
      'aria-controls': dropdownId
    },
    dropdownAttributes: {
      id: dropdownId,
      'data-table-select-dropdown': 'true'
    },
    optionAttributes: {
      'data-table-select-option': 'true'
    }
  });
}

function getRowCellValue(row = {}, column = {}, index = 0) {
  const cells = row && typeof row === 'object' ? row.cells : null;
  if (Array.isArray(cells)) {
    return String(cells[index] ?? '');
  }

  if (cells && typeof cells === 'object') {
    if (cells[column.key] !== undefined) {
      return String(cells[column.key] ?? '');
    }

    if (cells[column.title] !== undefined) {
      return String(cells[column.title] ?? '');
    }
  }

  return '';
}

function normalizeDraftForRender(draft = {}) {
  return deriveTableDraftFromTables(compileTableDraftToTables(draft));
}

function renderTableEditorRow(table = {}, row = {}, tableIndex = 0, rowIndex = 0) {
  const columns = Array.isArray(table.columns) ? table.columns : [];

  return `
    <tr data-table-editor-row="${rowIndex}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${escapeHtml(String(row?.name || ''))}" placeholder="行名">
      </td>
      ${columns.map((column, columnIndex) => `
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${columnIndex}"
                    rows="2"
                    placeholder="${escapeHtml(column.title || column.key || `列${columnIndex + 1}`)}">${escapeHtml(getRowCellValue(row, column, columnIndex))}</textarea>
        </td>
      `).join('')}
      <td>
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-row" data-table-index="${tableIndex}" data-row-index="${rowIndex}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `;
}

function renderTableEditorCard(table = {}, tableIndex = 0, options = {}) {
  const columns = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];
  const tableName = String(table?.name || '').trim();
  const tableNote = String(table?.note || '').trim();
  const showDeleteTable = options.showDeleteTable !== false;
  const deleteButtonHtml = showDeleteTable
    ? `
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-table" data-table-index="${tableIndex}">
          <i class="fa-solid fa-trash"></i> 删除表格
        </button>
      `
    : '';
  const summaryParts = [
    `表格 ${tableIndex + 1}`,
    `${columns.length} 列`,
    `${rows.length} 行`
  ];
  if (tableNote) {
    summaryParts.push('已填写说明');
  }

  return `
    <div class="yyt-table-editor-card" data-table-editor-table="${tableIndex}">
      <div class="yyt-table-editor-card-head">
        <div>
          <div class="yyt-table-editor-card-title">${escapeHtml(tableName || `表格 ${tableIndex + 1}`)}</div>
          <div class="yyt-table-editor-card-subtitle">${escapeHtml(summaryParts.join(' · '))}</div>
        </div>
        ${deleteButtonHtml}
      </div>

      <div class="yyt-table-editor-meta">
        <div class="yyt-table-editor-input-group">
          <span>表格名</span>
          <input type="text" class="yyt-input" data-table-editor-table-name value="${escapeHtml(String(table?.name || ''))}" placeholder="例如：角色状态表">
        </div>
        <div class="yyt-table-editor-input-group">
          <span>表格说明</span>
          <textarea class="yyt-textarea yyt-code-textarea-small" data-table-editor-table-note rows="2" placeholder="给模型解释此表的作用">${escapeHtml(String(table?.note || ''))}</textarea>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <div>
            <div class="yyt-table-editor-section-title">列定义</div>
            <div class="yyt-table-editor-section-desc">先声明每一列的显示标题与字段 key，运行时会按这里的结构写入表格状态。</div>
          </div>
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-column" data-table-index="${tableIndex}">
            <i class="fa-solid fa-plus"></i> 新增列
          </button>
        </div>
        <div class="yyt-table-editor-columns">
          ${columns.length ? columns.map((column, columnIndex) => `
            <div class="yyt-table-editor-column" data-table-editor-column="${columnIndex}">
              <div class="yyt-table-editor-input-group">
                <span>列标题</span>
                <input type="text" class="yyt-input" data-table-editor-column-title value="${escapeHtml(String(column?.title || ''))}" placeholder="例如：属性">
              </div>
              <div class="yyt-table-editor-input-group">
                <span>字段 key</span>
                <input type="text" class="yyt-input" data-table-editor-column-key value="${escapeHtml(String(column?.key || ''))}" placeholder="attribute_name">
              </div>
              <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-column" data-table-index="${tableIndex}" data-column-index="${columnIndex}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          `).join('') : '<div class="yyt-table-editor-empty"><div class="yyt-table-editor-section-title">当前没有列定义</div><div class="yyt-table-editor-muted">先新增一列，再继续填写行内容。</div></div>'}
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <div>
            <div class="yyt-table-editor-section-title">行内容</div>
            <div class="yyt-table-editor-section-desc">每一行对应一组字段值，单元格内容会按列顺序映射到当前表定义。</div>
          </div>
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-row" data-table-index="${tableIndex}">
            <i class="fa-solid fa-plus"></i> 新增行
          </button>
        </div>
        <div class="yyt-table-editor-grid-wrap">
          <table class="yyt-table-editor-grid">
            <thead>
              <tr>
                <th>行名</th>
                ${columns.map((column, columnIndex) => `<th>${escapeHtml(column?.title || column?.key || `列${columnIndex + 1}`)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map((row, rowIndex) => renderTableEditorRow(table, row, tableIndex, rowIndex)).join('') : `
                <tr>
                  <td colspan="${Math.max(columns.length + 2, 2)}">
                    <div class="yyt-table-editor-empty">
                      <div class="yyt-table-editor-section-title">当前没有行内容</div>
                      <div class="yyt-table-editor-muted">可先新增一行，再逐列补齐单元格数据。</div>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderTableDefinitionDialogBody(table = {}, tableIndex = 0, options = {}) {
  const columns = Array.isArray(table?.columns) ? table.columns : [];
  const rows = Array.isArray(table?.rows) ? table.rows : [];
  const mode = options.mode === 'create' ? 'create' : 'edit';
  const title = mode === 'create' ? '新增表格' : '编辑单张表格';
  const subtitle = mode === 'create'
    ? '先完成这张表的结构与内容，再保存回表定义列表。创建完成后可继续追加其它表。'
    : '先完成单张表的结构与内容，再保存回表定义列表。这里不会直接改动其它表。';
  const modeChip = mode === 'create' ? '创建模式' : '单表编辑';

  return `
    <div class="yyt-table-editor yyt-table-editor-shell yyt-table-editor-shell-compact" data-table-dialog-root>
      <div class="yyt-table-editor-banner">
        <div class="yyt-table-editor-banner-copy">
          <div class="yyt-table-editor-banner-title">${title}</div>
          <div class="yyt-table-editor-muted">${subtitle}</div>
        </div>
        <div class="yyt-table-editor-banner-meta">
          <span class="yyt-table-editor-chip">${modeChip}</span>
          <span class="yyt-table-editor-chip">${columns.length} 列</span>
          <span class="yyt-table-editor-chip">${rows.length} 行</span>
        </div>
      </div>
      ${renderTableEditorCard(table, tableIndex, { showDeleteTable: false })}
    </div>
  `;
}

function renderTableDefinitionsEditorBody(draft = {}) {
  const tables = Array.isArray(draft?.tables) ? draft.tables : [];
  const totalColumns = tables.reduce((sum, table) => sum + (Array.isArray(table?.columns) ? table.columns.length : 0), 0);
  const totalRows = tables.reduce((sum, table) => sum + (Array.isArray(table?.rows) ? table.rows.length : 0), 0);

  return `
    <div class="yyt-table-editor-shell">
      <div class="yyt-table-editor-banner">
        <div class="yyt-table-editor-banner-copy">
          <div class="yyt-table-editor-banner-title">表定义编辑器</div>
          <div class="yyt-table-editor-muted">结构化维护 tables 草稿。保存或执行时会自动编译为 runtime tables，无需手写 JSON。</div>
        </div>
        <div class="yyt-table-editor-banner-meta">
          <span class="yyt-table-editor-chip">${tables.length} 张表</span>
          <span class="yyt-table-editor-chip">${totalColumns} 列</span>
          <span class="yyt-table-editor-chip">${totalRows} 行</span>
        </div>
      </div>
      <div class="yyt-table-editor-toolbar">
        <div class="yyt-table-editor-muted">建议先补齐表格名与列定义，再录入行内容，避免后续频繁调整列结构。</div>
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-primary" data-table-editor-action="add-table">
          <i class="fa-solid fa-plus"></i> 新增表格
        </button>
      </div>
      <div class="yyt-table-editor-stack">
        ${tables.length ? tables.map((table, tableIndex) => renderTableEditorCard(table, tableIndex)).join('') : `
          <div class="yyt-table-editor-empty">
            <div class="yyt-table-editor-section-title">还没有表定义</div>
            <div class="yyt-table-editor-muted">点击右侧“新增表格”开始配置表名、列结构和行内容。</div>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderTableDefinitionsField(field = {}, values = {}) {
  const fieldName = String(field.name || '').trim();
  const label = escapeHtml(field.label || fieldName);
  const description = field.description ? `<div class="yyt-table-form-field-desc">${escapeHtml(field.description)}</div>` : '';
  const draft = normalizeDraftForRender({
    tables: Array.isArray(values[fieldName]) ? values[fieldName] : []
  });

  return `
    <div class="yyt-table-form-field" data-table-form-item="${escapeHtml(fieldName)}">
      <label>${label}</label>
      <div class="yyt-table-editor" data-table-field="${escapeHtml(fieldName)}" data-field-type="tableDefinitions" data-table-definition-root>
        ${renderTableDefinitionsEditorBody(draft)}
      </div>
      ${description}
    </div>
  `;
}

function openTableDefinitionDialog($container, table = {}, callbacks = {}) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return null;
  }

  const mode = callbacks.mode === 'create' ? 'create' : 'edit';
  const dialogId = `yyt-table-definition-dialog-${Date.now()}`;
  const dialogHtml = createDialogHtml({
    id: dialogId,
    title: mode === 'create' ? '新增表格' : '编辑表格',
    body: renderTableDefinitionDialogBody(table, 0, { mode }),
    wide: true,
    width: 'min(900px, calc(100vw - 32px))',
    dialogClass: 'yyt-table-editor-dialog',
    bodyClass: 'yyt-table-editor-dialog-body',
    footerClass: 'yyt-table-editor-dialog-footer'
  });

  $container.append(dialogHtml);
  $container.find(`#${dialogId}-save`).html(`<i class="fa-solid fa-check"></i> ${mode === 'create' ? '添加表格' : '保存表格'}`);
  $container.find(`#${dialogId}-cancel`).html('<i class="fa-solid fa-arrow-left"></i> 返回');
  $container.find(`#${dialogId}-cancel`).before('<div class="yyt-table-editor-dialog-note">保存后会把当前表写回表定义列表，不会直接影响其它表。</div>');

  bindDialogEvents($container, dialogId, {
    onSave: (closeDialog) => {
      const $dialogRoot = $container.find(`#${dialogId}-overlay [data-table-dialog-root]`);
      const validation = validateTableDraft(readTableDefinitionsDraft($dialogRoot));
      if (!validation.valid) {
        showToast('error', validation.errors.join('\n'));
        return;
      }

      if (typeof callbacks.onSave === 'function') {
        callbacks.onSave(validation.tables[0] || createEmptyTableDefinition(1));
      }
      closeDialog();
    },
    onClose: () => {
      if (typeof callbacks.onClose === 'function') {
        callbacks.onClose();
      }
    }
  });

  return dialogId;
}

function renderField(field = {}, values = {}) {
  const fieldName = String(field.name || '').trim();
  if (!fieldName) {
    return '';
  }

  if (field.type === 'tableDefinitions') {
    return renderTableDefinitionsField(field, values);
  }

  const value = values[fieldName];
  const label = escapeHtml(field.label || fieldName);
  const description = field.description ? `<div class="yyt-table-form-field-desc">${escapeHtml(field.description)}</div>` : '';
  const rows = Number.isFinite(field.rows) ? field.rows : 6;

  if (field.type === 'checkbox') {
    return `
      <div class="yyt-table-form-field" data-table-form-item="${escapeHtml(fieldName)}">
        <label class="yyt-table-form-inline-checkbox">
          <input type="checkbox" data-table-field="${escapeHtml(fieldName)}" data-field-type="checkbox" ${value === true ? 'checked' : ''}>
          <span>${label}</span>
        </label>
        ${description}
      </div>
    `;
  }

  if (field.type === 'select') {
    return `
      <div class="yyt-table-form-field" data-table-form-item="${escapeHtml(fieldName)}">
        <label for="yyt-table-field-${escapeHtml(fieldName)}">${label}</label>
        ${renderCustomSelect(field, value)}
        ${description}
      </div>
    `;
  }

  return `
    <div class="yyt-table-form-field" data-table-form-item="${escapeHtml(fieldName)}">
      <label for="yyt-table-field-${escapeHtml(fieldName)}">${label}</label>
      <textarea class="yyt-textarea yyt-code-textarea ${field.type === 'json' ? '' : 'yyt-code-textarea-small'}"
                id="yyt-table-field-${escapeHtml(fieldName)}"
                data-table-field="${escapeHtml(fieldName)}"
                data-field-type="${escapeHtml(field.type || 'textarea')}"
                rows="${rows}">${escapeHtml(getFieldStringValue(field, value))}</textarea>
      ${description}
    </div>
  `;
}

function readTableDefinitionsDraft($root) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return { tables: [] };
  }

  const tables = $root.find('[data-table-editor-table]').map((tableIndex, tableElement) => {
    const $table = $(tableElement);
    const columns = $table.find('[data-table-editor-column]').map((columnIndex, columnElement) => {
      const $column = $(columnElement);
      return {
        title: String($column.find('[data-table-editor-column-title]').val() || ''),
        key: String($column.find('[data-table-editor-column-key]').val() || '')
      };
    }).get();

    const rows = $table.find('[data-table-editor-row]').map((rowIndex, rowElement) => {
      const $row = $(rowElement);
      return {
        name: String($row.find('[data-table-editor-row-name]').val() || ''),
        cells: $row.find('[data-table-editor-cell]').map((cellIndex, cellElement) => String($(cellElement).val() || '')).get()
      };
    }).get();

    return {
      name: String($table.find('[data-table-editor-table-name]').val() || ''),
      note: String($table.find('[data-table-editor-table-note]').val() || ''),
      columns,
      rows
    };
  }).get();

  return { tables };
}

function createEmptyEditorRow(columns = [], rowIndex = 1) {
  return {
    name: `行${rowIndex}`,
    cells: Array.from({ length: Array.isArray(columns) ? columns.length : 0 }, () => '')
  };
}

function rerenderTableDefinitionsRoot($root, field = {}, draft = {}) {
  $root.html(renderTableDefinitionsEditorBody(normalizeDraftForRender(draft)));
}

export function bindTableFormEvents($container, schema = [], options = {}) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return;
  }

  const fields = Array.isArray(schema) ? schema : [];
  const resolveField = ($root) => {
    const fieldName = String($root.attr('data-table-field') || '').trim();
    return fields.find((field) => String(field?.name || '').trim() === fieldName) || { name: fieldName };
  };
  const notifyChange = () => {
    if (typeof options.onChange === 'function') {
      options.onChange();
    }
  };

  $container.off('.yytTableForm');

  $container.on('click.yytTableForm', '[data-table-definition-root] [data-table-editor-action]', (event) => {
    event.preventDefault();

    const $target = $(event.currentTarget);
    const action = String($target.attr('data-table-editor-action') || '').trim();
    const $root = $target.closest('[data-table-definition-root]');
    if (!$root.length) {
      return;
    }

    const field = resolveField($root);
    const draft = readTableDefinitionsDraft($root);
    const tables = Array.isArray(draft.tables) ? draft.tables : [];
    const tableIndex = Number.parseInt($target.attr('data-table-index') || '', 10);
    const columnIndex = Number.parseInt($target.attr('data-column-index') || '', 10);
    const rowIndex = Number.parseInt($target.attr('data-row-index') || '', 10);

    if (action === 'add-table') {
      openTableDefinitionDialog($container, createEmptyTableDefinition(tables.length + 1), {
        mode: 'create',
        onSave: (nextTable) => {
          const nextDraft = readTableDefinitionsDraft($root);
          const nextTables = Array.isArray(nextDraft.tables) ? nextDraft.tables : [];
          nextTables.push(nextTable);
          rerenderTableDefinitionsRoot($root, field, { tables: nextTables });
          notifyChange();
        }
      });
      return;
    }

    if (action === 'delete-table' && Number.isInteger(tableIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      tables.splice(tableIndex, 1);
    }

    if (action === 'add-column' && Number.isInteger(tableIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      const table = tables[tableIndex] || {};
      const nextColumns = Array.isArray(table.columns) ? table.columns : [];
      const nextColumn = createEmptyTableColumn(nextColumns.length + 1, nextColumns);
      table.columns = [...nextColumns, { key: nextColumn.key, title: nextColumn.title }];
      table.rows = (Array.isArray(table.rows) ? table.rows : []).map((row, index) => ({
        name: String(row?.name || `行${index + 1}`),
        cells: [...(Array.isArray(row?.cells) ? row.cells : []), '']
      }));
    }

    if (action === 'delete-column' && Number.isInteger(tableIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      const table = tables[tableIndex] || {};
      const columns = Array.isArray(table.columns) ? table.columns : [];
      if (Number.isInteger(columnIndex) && columnIndex >= 0 && columnIndex < columns.length) {
        table.columns = columns.filter((_, index) => index !== columnIndex);
        table.rows = (Array.isArray(table.rows) ? table.rows : []).map((row, index) => {
          const cells = Array.isArray(row?.cells) ? [...row.cells] : [];
          cells.splice(columnIndex, 1);
          return {
            name: String(row?.name || `行${index + 1}`),
            cells
          };
        });
      }
    }

    if (action === 'add-row' && Number.isInteger(tableIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      const table = tables[tableIndex] || {};
      const columns = Array.isArray(table.columns) ? table.columns : [];
      const rows = Array.isArray(table.rows) ? table.rows : [];
      table.rows = [...rows, createEmptyEditorRow(columns, rows.length + 1)];
    }

    if (action === 'delete-row' && Number.isInteger(tableIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      const table = tables[tableIndex] || {};
      const rows = Array.isArray(table.rows) ? table.rows : [];
      if (Number.isInteger(rowIndex) && rowIndex >= 0 && rowIndex < rows.length) {
        table.rows = rows.filter((_, index) => index !== rowIndex);
      }
    }

    rerenderTableDefinitionsRoot($root, field, { tables });
    notifyChange();
  });

  $container.on('input.yytTableForm', '[data-table-definition-root] input, [data-table-definition-root] textarea', () => {
    notifyChange();
  });

  $container.on('click.yytTableForm', '[data-table-select-trigger]', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const $trigger = $(event.currentTarget);
    const $select = $trigger.closest('[data-table-custom-select]');
    const isOpen = $select.hasClass('yyt-open');

    $container.find('[data-table-custom-select].yyt-open')
      .not($select)
      .removeClass('yyt-open')
      .find('[data-table-select-trigger]')
      .attr('aria-expanded', 'false');

    $select.toggleClass('yyt-open', !isOpen);
    $trigger.attr('aria-expanded', String(!isOpen));
  });

  $container.on('click.yytTableForm', '[data-table-select-option]', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const $option = $(event.currentTarget);
    const $select = $option.closest('[data-table-custom-select]');
    const value = String($option.attr('data-value') || '');
    const label = $option.find('.yyt-option-text').text();

    $select.find('.yyt-table-select-native').val(value).trigger('change');
    $select.find('.yyt-select-value').text(label).attr('data-value', value).data('value', value);
    $select.find('[data-table-select-option]').removeClass('yyt-selected').attr('aria-selected', 'false');
    $option.addClass('yyt-selected').attr('aria-selected', 'true');
    $select.removeClass('yyt-open');
    $select.find('[data-table-select-trigger]').attr('aria-expanded', 'false');
    notifyChange();
  });

  $container.on('change.yytTableForm', '[data-table-field][data-field-type="select"]', () => {
    notifyChange();
  });

  $container.on('change.yytTableForm', '[data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title]', (event) => {
    const $root = $(event.currentTarget).closest('[data-table-definition-root]');
    if (!$root.length) {
      return;
    }

    const field = resolveField($root);
    rerenderTableDefinitionsRoot($root, field, readTableDefinitionsDraft($root));
    notifyChange();
  });

  const targetDoc = getTargetDocument();

  $(targetDoc).off('click.yytTableFormSelect').on('click.yytTableFormSelect', (event) => {
    if (!$(event.target).closest($container).length) {
      $container.find('[data-table-custom-select].yyt-open')
        .removeClass('yyt-open')
        .find('[data-table-select-trigger]')
        .attr('aria-expanded', 'false');
    }
  });
}

export function destroyTableFormEvents($container) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return;
  }

  $container.off('.yytTableForm');
  $(getTargetDocument()).off('click.yytTableFormSelect');
}

export function renderTableForm(schema = [], values = {}) {
  const fields = Array.isArray(schema) ? schema : [];
  return `
    <div class="yyt-table-form-grid">
      ${fields.map((field) => renderField(field, values)).join('')}
    </div>
  `;
}

export function readTableFormValues($container, schema = []) {
  const fields = Array.isArray(schema) ? schema : [];
  const values = {};
  const errors = [];

  fields.forEach((field) => {
    const fieldName = String(field?.name || '').trim();
    if (!fieldName) {
      return;
    }

    const $field = $container.find(`[data-table-field="${fieldName}"]`);
    if (!$field.length) {
      return;
    }

    if (field.type === 'tableDefinitions') {
      const validation = validateTableDraft(readTableDefinitionsDraft($field));
      if (!validation.valid) {
        validation.errors.forEach((message) => {
          errors.push(`${field.label || fieldName}：${message}`);
        });
        return;
      }

      values[fieldName] = cloneValue(validation.tables);
      return;
    }

    if (field.type === 'checkbox') {
      values[fieldName] = $field.is(':checked');
      return;
    }

    const rawValue = String($field.val() || '');

    if (field.type === 'json') {
      const trimmed = rawValue.trim();
      if (!trimmed) {
        values[fieldName] = cloneValue(field.emptyValue);
        return;
      }

      try {
        values[fieldName] = JSON.parse(trimmed);
      } catch (error) {
        errors.push(`${field.label || fieldName} 不是合法 JSON：${error?.message || String(error)}`);
      }
      return;
    }

    values[fieldName] = rawValue;
  });

  return {
    values,
    errors
  };
}

export default {
  TABLE_FORM_RENDERER_STYLES,
  bindTableFormEvents,
  destroyTableFormEvents,
  renderTableForm,
  readTableFormValues
};