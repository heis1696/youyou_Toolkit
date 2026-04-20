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
  validateTableDraftDeep,
  compileTableDraftToTables,
  TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS,
  DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE
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
  .yyt-table-editor-card-head,
  .yyt-table-editor-card-head-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .yyt-table-editor-card-head-main {
    align-items: flex-start;
  }

  .yyt-table-editor-card-actions,
  .yyt-table-editor-row-actions,
  .yyt-table-editor-column-actions,
  .yyt-table-editor-move-controls {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
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

  .yyt-table-editor-validation-summary {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 100, 100, 0.28);
    background: rgba(255, 100, 100, 0.08);
  }

  .yyt-table-editor-validation-summary.yyt-warning-only {
    border-color: rgba(255, 196, 87, 0.28);
    background: rgba(255, 196, 87, 0.08);
  }

  .yyt-table-editor-validation-title {
    font-size: 12px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-editor-validation-list {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: rgba(255, 255, 255, 0.84);
    font-size: 12px;
    line-height: 1.6;
  }

  .yyt-table-editor-card.yyt-has-error,
  .yyt-table-editor-grid tr.yyt-has-error {
    border-color: rgba(255, 100, 100, 0.26);
  }

  .yyt-table-editor-grid tr.yyt-has-error td,
  .yyt-table-editor-grid tr.yyt-has-error th {
    background: rgba(255, 100, 100, 0.04);
  }

  .yyt-table-editor-grid textarea.yyt-table-cell-error,
  .yyt-table-editor-grid input.yyt-table-cell-error,
  .yyt-table-editor-grid select.yyt-table-cell-error,
  .yyt-table-editor-meta input.yyt-table-cell-error,
  .yyt-table-editor-meta textarea.yyt-table-cell-error {
    border-color: rgba(255, 100, 100, 0.55);
    box-shadow: 0 0 0 1px rgba(255, 100, 100, 0.14);
    background: rgba(255, 100, 100, 0.08);
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

function moveArrayItem(items = [], fromIndex = -1, toIndex = -1) {
  if (!Array.isArray(items)) {
    return [];
  }

  if (
    !Number.isInteger(fromIndex)
    || !Number.isInteger(toIndex)
    || fromIndex < 0
    || toIndex < 0
    || fromIndex >= items.length
    || toIndex >= items.length
    || fromIndex === toIndex
  ) {
    return [...items];
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, item);
  return nextItems;
}

export function buildMoveControls(actionPrefix, indices = {}, options = {}) {
  const size = Number.isInteger(options.size) ? options.size : 0;
  const currentIndex = Number.isInteger(options.currentIndex) ? options.currentIndex : -1;
  const disableUp = currentIndex <= 0;
  const disableDown = currentIndex < 0 || currentIndex >= size - 1;
  const dataAttributes = Object.entries(indices)
    .filter(([, value]) => Number.isInteger(value))
    .map(([key, value]) => `data-${key}="${value}"`)
    .join(' ');

  return `
    <div class="yyt-table-editor-move-controls">
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${actionPrefix}-up" ${dataAttributes} ${disableUp ? 'disabled' : ''}>
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${actionPrefix}-down" ${dataAttributes} ${disableDown ? 'disabled' : ''}>
        <i class="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  `;
}

function getColumnTypeLabel(value = '') {
  const match = TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS.find((option) => option.value === value);
  return match?.label || '文本';
}

function renderColumnTypeOptions(selectedValue = DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE) {
  return TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS.map((option) => `
    <option value="${escapeHtml(option.value)}" ${option.value === selectedValue ? 'selected' : ''}>${escapeHtml(option.label)}</option>
  `).join('');
}

function cloneValue(value) {
  if (value === undefined) return undefined;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (_) {
    return value;
  }
}

function clampTableIndex(tableCount = 0, currentIndex = 0) {
  if (!Number.isInteger(tableCount) || tableCount <= 0) {
    return 0;
  }

  if (!Number.isInteger(currentIndex) || currentIndex < 0) {
    return 0;
  }

  return Math.min(currentIndex, tableCount - 1);
}

function normalizeDraftForRender(draft = {}) {
  const sourceDraft = draft && typeof draft === 'object' ? draft : {};
  return deriveTableDraftFromTables(Array.isArray(sourceDraft.tables) ? sourceDraft.tables : []);
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

function buildIssueLocationKey(issue = {}) {
  return [
    Number.isInteger(issue?.tableIndex) ? issue.tableIndex : -1,
    Number.isInteger(issue?.rowIndex) ? issue.rowIndex : -1,
    Number.isInteger(issue?.columnIndex) ? issue.columnIndex : -1,
    String(issue?.cellKey || '')
  ].join(':');
}

function summarizeValidation(validation = {}, limit = 6) {
  const issues = Array.isArray(validation?.issues) ? validation.issues : [];
  if (!issues.length) {
    return '';
  }

  const errorCount = Number(validation?.summary?.errorCount) || 0;
  const warningCount = Number(validation?.summary?.warningCount) || 0;
  const title = errorCount > 0
    ? `发现 ${errorCount} 个错误${warningCount > 0 ? `，另有 ${warningCount} 个提示` : ''}`
    : `当前有 ${warningCount} 个提示`;
  const previewItems = issues.slice(0, Math.max(1, limit)).map((issue) => `<li>${escapeHtml(issue?.message || '')}</li>`).join('');
  const moreHint = issues.length > limit
    ? `<li>还有 ${issues.length - limit} 条未展开，请先修正上面这些。</li>`
    : '';
  const summaryClass = errorCount > 0 ? '' : ' yyt-warning-only';

  return `
    <div class="yyt-table-editor-validation-summary${summaryClass}" data-table-validation-summary>
      <div class="yyt-table-editor-validation-title">${escapeHtml(title)}</div>
      <ul class="yyt-table-editor-validation-list">${previewItems}${moreHint}</ul>
    </div>
  `;
}

export function applyDraftValidationState($root, validation = null) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return validation;
  }

  $root.find('[data-table-validation-summary]').remove();
  $root.find('.yyt-table-cell-error').removeClass('yyt-table-cell-error');
  $root.find('.yyt-has-error').removeClass('yyt-has-error');

  const normalizedValidation = validation || validateTableDraftDeep(readTableDefinitionsDraft($root));
  const issues = Array.isArray(normalizedValidation?.issues) ? normalizedValidation.issues : [];
  const issueKeySet = new Set(issues.filter((issue) => issue?.severity !== 'warning').map((issue) => buildIssueLocationKey(issue)));
  const columnIssueSet = new Set(issues.filter((issue) => issue?.severity !== 'warning').map((issue) => `${issue?.tableIndex ?? -1}:${issue?.columnIndex ?? -1}`));
  const tableIssueSet = new Set(issues.filter((issue) => issue?.severity !== 'warning').map((issue) => `${issue?.tableIndex ?? -1}`));

  if (issues.length > 0) {
    $root.prepend(summarizeValidation(normalizedValidation));
  }

  $root.find('[data-table-editor-table]').each((tableIndex, tableElement) => {
    const $table = $(tableElement);
    if (tableIssueSet.has(`${tableIndex}`)) {
      $table.addClass('yyt-has-error');
    }

    $table.find('[data-table-editor-column]').each((columnIndex, columnElement) => {
      const $column = $(columnElement);
      if (columnIssueSet.has(`${tableIndex}:${columnIndex}`)) {
        $column.addClass('yyt-has-error');
        $column.find('[data-table-editor-column-title], [data-table-editor-column-key], [data-table-editor-column-type], [data-table-editor-column-description]').addClass('yyt-table-cell-error');
      }
    });

    $table.find('[data-table-editor-row]').each((rowIndex, rowElement) => {
      const $row = $(rowElement);
      let rowHasError = false;
      $row.find('[data-table-editor-cell]').each((columnIndex, cellElement) => {
        const columnKey = String($table.find(`[data-table-editor-column="${columnIndex}"] [data-table-editor-column-key]`).val() || '').trim();
        const locationKey = [tableIndex, rowIndex, columnIndex, columnKey].join(':');
        if (issueKeySet.has(locationKey)) {
          rowHasError = true;
          $(cellElement).addClass('yyt-table-cell-error');
        }
      });

      if (rowHasError) {
        $row.addClass('yyt-has-error');
      }
    });
  });

  return normalizedValidation;
}

function renderTableEditorRow(table = {}, row = {}, tableIndex = 0, rowIndex = 0) {
  const columns = Array.isArray(table.columns) ? table.columns : [];
  const moveControls = buildMoveControls('row', { 'table-index': tableIndex, 'row-index': rowIndex }, {
    currentIndex: rowIndex,
    size: columns.length >= 0 ? (Array.isArray(table.rows) ? table.rows.length : 0) : 0
  });

  return `
    <tr data-table-editor-row="${rowIndex}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${escapeHtml(String(row?.name || ''))}" placeholder="可留空，默认会自动命名">
      </td>
      ${columns.map((column, columnIndex) => {
        const columnKey = String(column?.key || '').trim();
        return `
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${columnIndex}"
                    data-column-key="${escapeHtml(columnKey)}"
                    rows="2"
                    placeholder="${escapeHtml(column.title || column.key || `列${columnIndex + 1}`)}">${escapeHtml(getRowCellValue(row, column, columnIndex))}</textarea>
        </td>
      `;
      }).join('')}
      <td>
        <div class="yyt-table-editor-row-actions">
          ${moveControls}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-row" data-table-index="${tableIndex}" data-row-index="${rowIndex}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `;
}

export function renderTableEditorCard(table = {}, tableIndex = 0, options = {}) {
  const columns = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];
  const tableName = String(table?.name || '').trim();
  const showDeleteTable = options.showDeleteTable !== false;
  const moveControls = buildMoveControls('table', { 'table-index': tableIndex }, {
    currentIndex: tableIndex,
    size: Number.isInteger(options.totalTables) ? options.totalTables : 0
  });
  const deleteButtonHtml = showDeleteTable
    ? `
        <div class="yyt-table-editor-card-actions">
          ${moveControls}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-table" data-table-index="${tableIndex}">
            <i class="fa-solid fa-trash"></i> 删除表格
          </button>
        </div>
      `
    : '';

  return `
    <div class="yyt-table-editor-card" data-table-editor-table="${tableIndex}">
      <div class="yyt-table-editor-card-head">
        <div class="yyt-table-editor-card-head-main">
          <div class="yyt-table-editor-card-title">${escapeHtml(tableName || `表格 ${tableIndex + 1}`)}</div>
          <div class="yyt-table-editor-muted">直接把这张表当普通表格编辑：先写表头，再填每一行数据。</div>
        </div>
        ${deleteButtonHtml}
      </div>

      <div class="yyt-table-editor-meta">
        <div class="yyt-table-editor-input-group">
          <span>表格名称</span>
          <input type="text" class="yyt-input" data-table-editor-table-name value="${escapeHtml(String(table?.name || ''))}" placeholder="例如：角色状态表">
        </div>
        <div class="yyt-table-editor-input-group">
          <span>这张表是做什么的</span>
          <textarea class="yyt-textarea yyt-code-textarea-small" data-table-editor-table-note rows="2" placeholder="例如：记录角色当前状态、数值或备注">${escapeHtml(String(table?.note || ''))}</textarea>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <div>
            <div class="yyt-table-editor-section-title">表头设置</div>
            <div class="yyt-table-editor-section-desc">列标题就是你看到的表头。内部名一般不用改，留空也会自动生成。</div>
          </div>
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-column" data-table-index="${tableIndex}">
            <i class="fa-solid fa-plus"></i> 新增一列
          </button>
        </div>
        <div class="yyt-table-editor-grid-wrap">
          <table class="yyt-table-editor-grid">
            <thead>
              <tr>
                <th>表头名称</th>
                <th>内部名</th>
                <th>类型</th>
                <th>必填</th>
                <th>说明</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${columns.length ? columns.map((column, columnIndex) => `
                <tr class="yyt-table-editor-column" data-table-editor-column="${columnIndex}">
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-title value="${escapeHtml(String(column?.title || ''))}" placeholder="例如：属性">
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-key value="${escapeHtml(String(column?.key || ''))}" placeholder="可留空自动生成">
                  </td>
                  <td>
                    <select class="yyt-select" data-table-editor-column-type>
                      ${renderColumnTypeOptions(String(column?.type || DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE))}
                    </select>
                  </td>
                  <td>
                    <label class="yyt-table-editor-column-required yyt-table-editor-column-required-inline">
                      <input type="checkbox" data-table-editor-column-required ${column?.required === true ? 'checked' : ''}>
                      <span>必填</span>
                    </label>
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-description value="${escapeHtml(String(column?.description || ''))}" placeholder="可不填">
                  </td>
                  <td>
                    <div class="yyt-table-editor-column-actions">
                      ${buildMoveControls('column', { 'table-index': tableIndex, 'column-index': columnIndex }, {
                        currentIndex: columnIndex,
                        size: columns.length
                      })}
                      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-column" data-table-index="${tableIndex}" data-column-index="${columnIndex}">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="6">
                    <div class="yyt-table-editor-empty">
                      <div class="yyt-table-editor-section-title">还没有表头</div>
                      <div class="yyt-table-editor-muted">先新增一列，填上你想展示的表头名称。</div>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <div>
            <div class="yyt-table-editor-section-title">表格内容</div>
            <div class="yyt-table-editor-section-desc">下面每一行就是一条数据。第一列只是给这行起个名字，不填也可以。</div>
          </div>
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-row" data-table-index="${tableIndex}">
            <i class="fa-solid fa-plus"></i> 新增一行
          </button>
        </div>
        <div class="yyt-table-editor-grid-wrap">
          <table class="yyt-table-editor-grid">
            <thead>
              <tr>
                <th>这一行名称</th>
                ${columns.map((column, columnIndex) => `<th>${escapeHtml(column?.title || column?.key || `列${columnIndex + 1}`)}</th>`).join('')}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${rows.length ? rows.map((row, rowIndex) => renderTableEditorRow(table, row, tableIndex, rowIndex)).join('') : `
                <tr>
                  <td colspan="${Math.max(columns.length + 2, 2)}">
                    <div class="yyt-table-editor-empty">
                      <div class="yyt-table-editor-section-title">还没有数据行</div>
                      <div class="yyt-table-editor-muted">先新增一行，再按表格方式把每个单元格填进去。</div>
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

function renderTableDefinitionsEditorBody(draft = {}, options = {}) {
  const normalizedDraft = normalizeDraftForRender(draft);
  const tables = Array.isArray(normalizedDraft?.tables) ? normalizedDraft.tables : [];
  const totalColumns = tables.reduce((sum, table) => sum + (Array.isArray(table?.columns) ? table.columns.length : 0), 0);
  const totalRows = tables.reduce((sum, table) => sum + (Array.isArray(table?.rows) ? table.rows.length : 0), 0);
  const mode = options.mode === 'focused' ? 'focused' : 'full';
  const currentTableIndex = clampTableIndex(tables.length, Number.parseInt(options.currentTableIndex, 10));

  if (mode === 'focused') {
    const activeTable = tables[currentTableIndex] || null;
    return `
      <div class="yyt-table-editor-shell">
        <div class="yyt-table-editor-banner">
          <div class="yyt-table-editor-banner-copy">
            <div class="yyt-table-editor-banner-title">当前表编辑区</div>
            <div class="yyt-table-editor-muted">左边切表，右边看编译和校验；中间只专心改当前这张表。</div>
          </div>
          <div class="yyt-table-editor-banner-meta">
            <span class="yyt-table-editor-chip">${tables.length} 张表</span>
            <span class="yyt-table-editor-chip">${totalColumns} 列</span>
            <span class="yyt-table-editor-chip">${totalRows} 行</span>
          </div>
        </div>
        <div class="yyt-table-editor-toolbar">
          <div class="yyt-table-editor-muted">先写表头，再填内容；顺序不对可以在左侧快速调整。</div>
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-primary" data-table-editor-action="add-table">
            <i class="fa-solid fa-plus"></i> 新增表格
          </button>
        </div>
        ${activeTable ? renderTableEditorCard(activeTable, currentTableIndex, { totalTables: tables.length }) : `
          <div class="yyt-table-editor-empty">
            <div class="yyt-table-editor-section-title">还没有表格</div>
            <div class="yyt-table-editor-muted">先新增一张表，再开始写表头和内容。</div>
          </div>
        `}
      </div>
    `;
  }

  return `
    <div class="yyt-table-editor-shell">
      <div class="yyt-table-editor-banner">
        <div class="yyt-table-editor-banner-copy">
          <div class="yyt-table-editor-banner-title">表格编辑器</div>
          <div class="yyt-table-editor-muted">像改普通表格一样改这里。保存或运行时会自动整理成系统要用的格式。</div>
        </div>
        <div class="yyt-table-editor-banner-meta">
          <span class="yyt-table-editor-chip">${tables.length} 张表</span>
          <span class="yyt-table-editor-chip">${totalColumns} 列</span>
          <span class="yyt-table-editor-chip">${totalRows} 行</span>
        </div>
      </div>
      <div class="yyt-table-editor-toolbar">
        <div class="yyt-table-editor-muted">先写表头，再填内容；顺序不对就直接上移下移。</div>
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-primary" data-table-editor-action="add-table">
          <i class="fa-solid fa-plus"></i> 新增表格
        </button>
      </div>
      <div class="yyt-table-editor-stack">
        ${tables.length ? tables.map((table, tableIndex) => renderTableEditorCard(table, tableIndex, { totalTables: tables.length })).join('') : `
          <div class="yyt-table-editor-empty">
            <div class="yyt-table-editor-section-title">还没有表格</div>
            <div class="yyt-table-editor-muted">点“新增表格”，先起名字，再加表头和内容。</div>
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
      ${renderTableDefinitionsEditorField(field, draft, { description })}
    </div>
  `;
}

export function renderTableDefinitionsEditorField(field = {}, draft = {}, options = {}) {
  const fieldName = String(field.name || '').trim();
  const description = typeof options.description === 'string'
    ? options.description
    : (field.description ? `<div class="yyt-table-form-field-desc">${escapeHtml(field.description)}</div>` : '');
  const mode = options.mode === 'focused' ? 'focused' : 'full';
  const currentTableIndex = Number.parseInt(options.currentTableIndex, 10);

  return `
    <div class="yyt-table-editor" data-table-field="${escapeHtml(fieldName)}" data-field-type="tableDefinitions" data-table-definition-root data-table-editor-mode="${mode}" data-current-table-index="${Number.isInteger(currentTableIndex) ? currentTableIndex : 0}">
      ${renderTableDefinitionsEditorBody(draft, { mode, currentTableIndex })}
    </div>
    ${description}
  `;
}

export function renderTableAuxiliaryFields(schema = [], values = {}, options = {}) {
  const fields = Array.isArray(schema) ? schema : [];
  const includeFieldNames = Array.isArray(options.includeFieldNames)
    ? new Set(options.includeFieldNames.map((item) => String(item || '').trim()).filter(Boolean))
    : null;
  const excludeFieldNames = Array.isArray(options.excludeFieldNames)
    ? new Set(options.excludeFieldNames.map((item) => String(item || '').trim()).filter(Boolean))
    : null;

  const renderedFields = fields.filter((field) => {
    const fieldName = String(field?.name || '').trim();
    if (!fieldName) {
      return false;
    }
    if (includeFieldNames && !includeFieldNames.has(fieldName)) {
      return false;
    }
    if (excludeFieldNames && excludeFieldNames.has(fieldName)) {
      return false;
    }
    return field.type !== 'tableDefinitions';
  }).map((field) => renderField(field, values)).join('');

  if (!renderedFields) {
    return '';
  }

  return `
    <div class="yyt-table-form-grid">
      ${renderedFields}
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
      const validation = validateTableDraftDeep(readTableDefinitionsDraft($dialogRoot));
      applyDraftValidationState($dialogRoot, validation);
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

export function readTableDefinitionsDraft($root) {
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
        key: String($column.find('[data-table-editor-column-key]').val() || ''),
        description: String($column.find('[data-table-editor-column-description]').val() || ''),
        type: String($column.find('[data-table-editor-column-type]').val() || DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE),
        required: $column.find('[data-table-editor-column-required]').is(':checked')
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
  const mode = String($root.attr('data-table-editor-mode') || '').trim() === 'focused' ? 'focused' : 'full';
  const currentTableIndex = Number.parseInt($root.attr('data-current-table-index') || '0', 10);
  const normalizedDraft = normalizeDraftForRender(draft);
  const nextIndex = clampTableIndex(Array.isArray(normalizedDraft.tables) ? normalizedDraft.tables.length : 0, currentTableIndex);

  $root.attr('data-current-table-index', String(nextIndex));
  $root.html(renderTableDefinitionsEditorBody(normalizedDraft, { mode, currentTableIndex: nextIndex }));
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
  const notifyTableMutation = (payload = {}) => {
    if (typeof options.onTableMutation === 'function') {
      options.onTableMutation(payload);
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
          notifyTableMutation({
            action: 'add-table',
            tableIndex: nextTables.length - 1,
            draft: { tables: nextTables }
          });
          notifyChange();
        }
      });
      return;
    }

    if (action === 'delete-table' && Number.isInteger(tableIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      tables.splice(tableIndex, 1);
      rerenderTableDefinitionsRoot($root, field, { tables });
      notifyTableMutation({
        action: 'delete-table',
        tableIndex,
        draft: { tables }
      });
      notifyChange();
      return;
    }

    if (action === 'move-table-up' && Number.isInteger(tableIndex)) {
      const nextTables = moveArrayItem(tables, tableIndex, tableIndex - 1);
      rerenderTableDefinitionsRoot($root, field, { tables: nextTables });
      notifyTableMutation({
        action: 'move-table-up',
        tableIndex,
        nextTableIndex: Math.max(0, tableIndex - 1),
        draft: { tables: nextTables }
      });
      notifyChange();
      return;
    }

    if (action === 'move-table-down' && Number.isInteger(tableIndex)) {
      const nextTables = moveArrayItem(tables, tableIndex, tableIndex + 1);
      rerenderTableDefinitionsRoot($root, field, { tables: nextTables });
      notifyTableMutation({
        action: 'move-table-down',
        tableIndex,
        nextTableIndex: Math.min(nextTables.length - 1, tableIndex + 1),
        draft: { tables: nextTables }
      });
      notifyChange();
      return;
    }

    if (action === 'add-column' && Number.isInteger(tableIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      const table = tables[tableIndex] || {};
      const nextColumns = Array.isArray(table.columns) ? table.columns : [];
      const nextColumn = createEmptyTableColumn(nextColumns.length + 1, nextColumns);
      table.columns = [...nextColumns, nextColumn];
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

    if (action === 'move-column-up' && Number.isInteger(tableIndex) && Number.isInteger(columnIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      const table = tables[tableIndex] || {};
      const columns = Array.isArray(table.columns) ? table.columns : [];
      table.columns = moveArrayItem(columns, columnIndex, columnIndex - 1);
      table.rows = (Array.isArray(table.rows) ? table.rows : []).map((row, index) => ({
        name: String(row?.name || `行${index + 1}`),
        cells: moveArrayItem(Array.isArray(row?.cells) ? row.cells : [], columnIndex, columnIndex - 1)
      }));
      rerenderTableDefinitionsRoot($root, field, { tables });
      notifyChange();
      return;
    }

    if (action === 'move-column-down' && Number.isInteger(tableIndex) && Number.isInteger(columnIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      const table = tables[tableIndex] || {};
      const columns = Array.isArray(table.columns) ? table.columns : [];
      table.columns = moveArrayItem(columns, columnIndex, columnIndex + 1);
      table.rows = (Array.isArray(table.rows) ? table.rows : []).map((row, index) => ({
        name: String(row?.name || `行${index + 1}`),
        cells: moveArrayItem(Array.isArray(row?.cells) ? row.cells : [], columnIndex, columnIndex + 1)
      }));
      rerenderTableDefinitionsRoot($root, field, { tables });
      notifyChange();
      return;
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

    if (action === 'move-row-up' && Number.isInteger(tableIndex) && Number.isInteger(rowIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      const table = tables[tableIndex] || {};
      table.rows = moveArrayItem(Array.isArray(table.rows) ? table.rows : [], rowIndex, rowIndex - 1);
      rerenderTableDefinitionsRoot($root, field, { tables });
      notifyChange();
      return;
    }

    if (action === 'move-row-down' && Number.isInteger(tableIndex) && Number.isInteger(rowIndex) && tableIndex >= 0 && tableIndex < tables.length) {
      const table = tables[tableIndex] || {};
      table.rows = moveArrayItem(Array.isArray(table.rows) ? table.rows : [], rowIndex, rowIndex + 1);
      rerenderTableDefinitionsRoot($root, field, { tables });
      notifyChange();
      return;
    }

    rerenderTableDefinitionsRoot($root, field, { tables });
    applyDraftValidationState($root);
    notifyChange();
  });

  $container.on('input.yytTableForm', '[data-table-definition-root] input, [data-table-definition-root] textarea', (event) => {
    const $root = $(event.currentTarget).closest('[data-table-definition-root]');
    if ($root.length) {
      applyDraftValidationState($root);
    }
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

  $container.on('blur.yytTableForm', '[data-table-definition-root] [data-table-editor-cell], [data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title], [data-table-definition-root] [data-table-editor-column-type], [data-table-definition-root] [data-table-editor-column-required]', (event) => {
    const $root = $(event.currentTarget).closest('[data-table-definition-root]');
    if ($root.length) {
      applyDraftValidationState($root);
    }
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
      const validation = validateTableDraftDeep(readTableDefinitionsDraft($field));
      applyDraftValidationState($field, validation);
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
  renderTableEditorCard,
  renderTableDefinitionsEditorField,
  renderTableAuxiliaryFields,
  readTableDefinitionsDraft,
  readTableFormValues,
  applyDraftValidationState,
  buildMoveControls
};
