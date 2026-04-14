/**
 * YouYou Toolkit - 填表工作台表单渲染器
 * @description 基于 schema 渲染最小配置表单，并负责表单取值
 */

import { escapeHtml, getJQuery, isContainerValid } from '../utils.js';
import {
  createEmptyTableColumn,
  createEmptyTableDefinition,
  deriveTableDraftFromTables,
  validateTableDraft,
  compileTableDraftToTables
} from '../../table-engine/table-schema-service.js';

export const TABLE_FORM_RENDERER_STYLES = `
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
  .yyt-table-form-field .yyt-select {
    width: 100%;
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

  .yyt-table-editor-toolbar,
  .yyt-table-editor-section-head,
  .yyt-table-editor-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
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
    border-radius: 16px;
    border: 1px dashed rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.03);
  }

  .yyt-table-editor-card {
    padding: 14px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.035);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-table-editor-card-title {
    font-size: 14px;
    font-weight: 800;
    color: var(--yyt-text);
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
  }

  .yyt-table-editor-section-title {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.82);
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
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
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
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .yyt-table-editor-grid {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    background: rgba(8, 12, 18, 0.42);
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
    background: rgba(255, 255, 255, 0.03);
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

function renderOptions(options = [], selectedValue = '') {
  return options.map((option) => {
    const optionValue = String(option?.value ?? '');
    const optionLabel = String(option?.label ?? optionValue);
    const selected = optionValue === String(selectedValue ?? '') ? 'selected' : '';
    return `<option value="${escapeHtml(optionValue)}" ${selected}>${escapeHtml(optionLabel)}</option>`;
  }).join('');
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

function renderTableEditorCard(table = {}, tableIndex = 0) {
  const columns = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows : [];

  return `
    <div class="yyt-table-editor-card" data-table-editor-table="${tableIndex}">
      <div class="yyt-table-editor-card-head">
        <div class="yyt-table-editor-card-title">表格 ${tableIndex + 1}</div>
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-table" data-table-index="${tableIndex}">
          <i class="fa-solid fa-trash"></i> 删除表格
        </button>
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
          <div class="yyt-table-editor-section-title">列定义</div>
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
          `).join('') : '<div class="yyt-table-editor-empty"><div class="yyt-table-editor-muted">当前没有列定义，先新增一列。</div></div>'}
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <div class="yyt-table-editor-section-title">行内容</div>
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
                    <div class="yyt-table-editor-muted">当前没有行内容，可先新增一行。</div>
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

function renderTableDefinitionsEditorBody(draft = {}) {
  const tables = Array.isArray(draft?.tables) ? draft.tables : [];

  return `
    <div class="yyt-table-editor-toolbar">
      <div class="yyt-table-editor-muted">结构化编辑表定义；保存或运行时会自动编译为 runtime tables。</div>
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-primary" data-table-editor-action="add-table">
        <i class="fa-solid fa-plus"></i> 新增表格
      </button>
    </div>
    <div class="yyt-table-editor-stack">
      ${tables.length ? tables.map((table, tableIndex) => renderTableEditorCard(table, tableIndex)).join('') : `
        <div class="yyt-table-editor-empty">
          <div class="yyt-table-editor-muted">还没有表定义。点击右侧“新增表格”开始配置。</div>
        </div>
      `}
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
        <select class="yyt-select" id="yyt-table-field-${escapeHtml(fieldName)}" data-table-field="${escapeHtml(fieldName)}" data-field-type="select">
          ${renderOptions(field.options || [], value)}
        </select>
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
      tables.push(createEmptyTableDefinition(tables.length + 1));
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

  $container.on('change.yytTableForm', '[data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title]', (event) => {
    const $root = $(event.currentTarget).closest('[data-table-definition-root]');
    if (!$root.length) {
      return;
    }

    const field = resolveField($root);
    rerenderTableDefinitionsRoot($root, field, readTableDefinitionsDraft($root));
    notifyChange();
  });
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
  renderTableForm,
  readTableFormValues
};