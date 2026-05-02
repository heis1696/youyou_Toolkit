/**
 * YouYou Toolkit - 表格单元格右键菜单
 * @description 单例模式，在单元格点击位置显示操作菜单
 */
import { getJQuery, getTargetDocument } from '../utils.js';

let currentInstance = null;

export class TableCellPopupMenu {
  constructor() {
    if (currentInstance) currentInstance.destroy();
    currentInstance = this;
    this.$menu = null;
    this._onClickOutside = null;
  }

  show(x, y, context = {}) {
    const $ = getJQuery();
    const doc = getTargetDocument();
    if (!$ || !doc) return;

    this.destroy();

    const items = this._buildItems(context);
    if (items.length === 0) return;

    const menuHtml = items.map(item => `
      <div class="yyt-cell-menu-item" data-action="${item.action}">
        ${item.label}
      </div>
    `).join('');

    this.$menu = $(`
      <div class="yyt-cell-popup-menu">
        ${menuHtml}
      </div>
    `);

    const $body = $(doc.body);
    this.$menu.css({ left: x + 'px', top: y + 'px' });
    $body.append(this.$menu);

    this.$menu.on('click.yytCellMenu', '.yyt-cell-menu-item', (e) => {
      const action = $(e.currentTarget).attr('data-action');
      this.destroy();
      if (context.onAction) context.onAction(action);
    });

    this._onClickOutside = (e) => {
      if (this.$menu && !this.$menu[0].contains(e.target)) {
        this.destroy();
      }
    };
    setTimeout(() => {
      if (this._onClickOutside) {
        $(doc).on('mousedown.yytCellMenu', this._onClickOutside);
      }
    }, 0);
  }

  _buildItems(context) {
    if (Array.isArray(context.items) && context.items.length > 0) {
      return context.items;
    }

    const items = [];
    const rowIndex = Number.isFinite(context.rowIndex) ? context.rowIndex : -1;
    const colKey = context.colKey || '';

    if (colKey) {
      items.push({ label: '编辑单元格', action: `edit:${colKey}` });
      items.push({ label: '清空单元格', action: `clear:${colKey}` });
    }

    if (rowIndex >= 0) {
      items.push({ label: '上方插入行', action: 'insert-row-above' });
      items.push({ label: '下方插入行', action: 'insert-row-below' });
      items.push({ label: '删除此行', action: 'delete-row' });
    }

    return items;
  }

  destroy() {
    const $ = getJQuery();
    const doc = getTargetDocument();
    if (this.$menu) {
      this.$menu.off('.yytCellMenu');
      this.$menu.remove();
      this.$menu = null;
    }
    if (this._onClickOutside && doc) {
      $(doc).off('mousedown.yytCellMenu', this._onClickOutside);
      this._onClickOutside = null;
    }
    if (currentInstance === this) currentInstance = null;
  }

  static destroy() {
    if (currentInstance) currentInstance.destroy();
  }
}

export function getPopupMenuStyles() {
  return `
    .yyt-cell-popup-menu {
      position: fixed;
      z-index: 99999;
      min-width: 140px;
      padding: 4px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(24,28,36,0.97);
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      backdrop-filter: blur(12px);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .yyt-cell-menu-item {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      color: rgba(255,255,255,0.8);
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.1s;
    }
    .yyt-cell-menu-item:hover {
      background: rgba(123,183,255,0.15);
      color: #fff;
    }
  `;
}
