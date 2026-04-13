/**
 * YouYou Toolkit - 填表工作台表单渲染器
 * @description 基于 schema 渲染最小配置表单，并负责表单取值
 */

import { escapeHtml } from '../utils.js';

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

function renderField(field = {}, values = {}) {
  const fieldName = String(field.name || '').trim();
  if (!fieldName) {
    return '';
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
  renderTableForm,
  readTableFormValues
};
