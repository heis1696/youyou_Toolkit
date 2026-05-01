/**
 * YouYou Toolkit - 日志查看面板组件
 * @description 实时日志查看器，支持级别过滤、搜索、导出
 */

import { logger, LOG_LEVEL } from '../../core/logger-service.js';
import { eventBus } from '../../core/event-bus.js';
import { getJQuery, isContainerValid, escapeHtml } from '../utils.js';

const PANEL_ID = 'yyt-logger-panel';
const LEVEL_FILTERS = [
  { level: null, label: '全部', icon: 'fa-list' },
  { level: LOG_LEVEL.DEBUG, label: 'DEBUG', icon: 'fa-bug' },
  { level: LOG_LEVEL.INFO, label: 'INFO', icon: 'fa-circle-info' },
  { level: LOG_LEVEL.WARN, label: 'WARN', icon: 'fa-triangle-exclamation' },
  { level: LOG_LEVEL.ERROR, label: 'ERROR', icon: 'fa-circle-exclamation' }
];

function levelCssClass(level) {
  switch (level) {
    case LOG_LEVEL.DEBUG: return 'yyt-log-debug';
    case LOG_LEVEL.INFO: return 'yyt-log-info';
    case LOG_LEVEL.WARN: return 'yyt-log-warn';
    case LOG_LEVEL.ERROR: return 'yyt-log-error';
    default: return '';
  }
}

function formatTime(ts) {
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${String(d.getMilliseconds()).padStart(3, '0')}`;
}

export const LoggerPanel = {
  id: 'loggerPanel',

  render() {
    const stats = logger.getStats();
    return `
      <div class="yyt-logger-panel" id="${PANEL_ID}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${LEVEL_FILTERS.map((f, i) =>
              `<button class="yyt-log-filter-btn ${i === 0 ? 'yyt-active' : ''}" data-level="${f.level ?? ''}">
                <i class="fa-solid ${f.icon}"></i> ${f.label}
              </button>`
            ).join('')}
          </div>
          <div class="yyt-logger-search-bar">
            <input class="yyt-input yyt-logger-search-input" type="text"
                   placeholder="搜索 scope 或消息…" data-yyt-log-search>
          </div>
          <div class="yyt-logger-actions">
            <label class="yyt-logger-autoscroll-label" title="切换自动滚动">
              <input type="checkbox" data-yyt-log-autoscroll checked> 自动滚动
            </label>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-yyt-log-pause>
              <i class="fa-solid fa-pause"></i> 暂停
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-yyt-log-clear>
              <i class="fa-solid fa-eraser"></i> 清除
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-yyt-log-export>
              <i class="fa-solid fa-download"></i> 导出
            </button>
          </div>
        </div>

        <div class="yyt-logger-stats">
          <span class="yyt-logger-stat">共 <strong>${stats.total}</strong> 条</span>
          ${['ERROR', 'WARN', 'INFO', 'DEBUG'].map(l =>
            `<span class="yyt-logger-stat yyt-log-${l.toLowerCase()}">${l}: <strong>${stats.byLevel[l] || 0}</strong></span>`
          ).join('')}
        </div>

        <div class="yyt-logger-list" data-yyt-log-list>
          <div class="yyt-logger-empty">暂无日志记录</div>
        </div>
      </div>
    `;
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;

    const self = this;
    let currentLevel = null;
    let paused = false;
    let entryQueue = [];

    const $list = $container.find('[data-yyt-log-list]');
    const $search = $container.find('[data-yyt-log-search]');
    const $autoscroll = $container.find('[data-yyt-log-autoscroll]');
    const $pauseBtn = $container.find('[data-yyt-log-pause]');

    function renderEntries(entries) {
      if (!entries.length) {
        $list.html('<div class="yyt-logger-empty">暂无匹配的日志记录</div>');
        return;
      }
      $list.html(entries.map(e => `
        <div class="yyt-log-entry ${levelCssClass(e.level)}" data-log-id="${e.id}">
          <span class="yyt-log-time">${formatTime(e.timestamp)}</span>
          <span class="yyt-log-level">${logger.levelLabel(e.level)}</span>
          <span class="yyt-log-scope">${escapeHtml(e.scope)}</span>
          <span class="yyt-log-msg">${escapeHtml(e.message)}</span>
          ${e.data !== undefined ? `<span class="yyt-log-data">${escapeHtml(typeof e.data === 'object' ? JSON.stringify(e.data) : String(e.data))}</span>` : ''}
        </div>
      `).join(''));
    }

    function refreshList() {
      const search = $search.val()?.trim() || '';
      const { entries } = logger.getEntries({
        level: currentLevel,
        search: search || undefined,
        limit: 500
      });
      renderEntries(entries);
      if ($autoscroll.is(':checked')) {
        requestAnimationFrame(() => {
          $list[0].scrollTop = $list[0].scrollHeight;
        });
      }
    }

    function flushQueue() {
      if (paused || !entryQueue.length) return;
      const entries = entryQueue;
      entryQueue = [];
      refreshList();
    }

    this._onLogEntry = (entry) => {
      if (paused) return;
      if (currentLevel !== null && entry.level < currentLevel) return;
      const search = $search.val()?.trim().toLowerCase() || '';
      if (search) {
        const inScope = entry.scope.toLowerCase().includes(search);
        const inMsg = entry.message.toLowerCase().includes(search);
        if (!inScope && !inMsg) return;
      }
      entryQueue.push(entry);
      if (entryQueue.length >= 50) {
        flushQueue();
      } else {
        if (!this._flushTimer) {
          this._flushTimer = setTimeout(() => {
            this._flushTimer = null;
            flushQueue();
            self._updateStats($container);
          }, 250);
        }
      }
    };

    eventBus.on('logger:entry', this._onLogEntry);

    $container.on('click.yytLogger', '[data-yyt-log-filter-group] .yyt-log-filter-btn', (e) => {
      $container.find('[data-yyt-log-filter-group] .yyt-log-filter-btn').removeClass('yyt-active');
      $(e.currentTarget).addClass('yyt-active');
      const val = $(e.currentTarget).data('level');
      currentLevel = val === '' ? null : val;
      refreshList();
      self._updateStats($container);
    });

    $search.on('input.yytLogger', () => {
      refreshList();
    });

    $container.on('click.yytLogger', '[data-yyt-log-pause]', () => {
      paused = !paused;
      $pauseBtn.toggleClass('yyt-active', paused);
      $pauseBtn.html(paused
        ? '<i class="fa-solid fa-play"></i> 继续'
        : '<i class="fa-solid fa-pause"></i> 暂停');
      if (!paused) {
        entryQueue = [];
        refreshList();
        self._updateStats($container);
      }
    });

    $container.on('click.yytLogger', '[data-yyt-log-clear]', () => {
      logger.clear();
      $list.html('<div class="yyt-logger-empty">日志已清除</div>');
      self._updateStats($container);
    });

    $container.on('click.yytLogger', '[data-yyt-log-export]', () => {
      const { entries } = logger.getEntries({ limit: 10000 });
      const json = JSON.stringify(entries.map(e => ({
        time: new Date(e.timestamp).toISOString(),
        level: logger.levelLabel(e.level),
        scope: e.scope,
        message: e.message,
        data: e.data
      })), null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `yyt-logs-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    refreshList();
  },

  _updateStats($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    const stats = logger.getStats();
    const $statsBar = $container.find('.yyt-logger-stats');
    if (!$statsBar.length) return;
    $statsBar.html(`
      <span class="yyt-logger-stat">共 <strong>${stats.total}</strong> 条</span>
      ${['ERROR', 'WARN', 'INFO', 'DEBUG'].map(l =>
        `<span class="yyt-logger-stat yyt-log-${l.toLowerCase()}">${l}: <strong>${stats.byLevel[l] || 0}</strong></span>`
      ).join('')}
    `);
  },

  destroy($container) {
    const $ = getJQuery();
    if (this._onLogEntry) {
      eventBus.off('logger:entry', this._onLogEntry);
      this._onLogEntry = null;
    }
    if (this._flushTimer) {
      clearTimeout(this._flushTimer);
      this._flushTimer = null;
    }
    if (!$ || !isContainerValid($container)) return;
    $container.off('.yytLogger');
  },

  getStyles() {
    return `
      .yyt-logger-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 10px;
      }

      .yyt-logger-toolbar {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        padding: 10px 12px;
        border-radius: var(--yyt-radius);
        background: rgba(255, 255, 255, 0.025);
        border: 1px solid var(--yyt-border-soft);
      }

      .yyt-logger-filter-btns {
        display: flex;
        gap: 4px;
      }

      .yyt-log-filter-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border: 1px solid var(--yyt-border);
        border-radius: 8px;
        background: var(--yyt-surface);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .yyt-log-filter-btn:hover {
        background: var(--yyt-surface-hover);
        color: var(--yyt-text);
      }

      .yyt-log-filter-btn.yyt-active {
        background: var(--yyt-accent-soft);
        border-color: var(--yyt-accent);
        color: var(--yyt-accent);
      }

      .yyt-logger-search-bar {
        flex: 1;
        min-width: 140px;
      }

      .yyt-logger-search-input {
        min-height: 34px !important;
        font-size: 12px !important;
      }

      .yyt-logger-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .yyt-logger-autoscroll-label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: var(--yyt-text-muted);
        cursor: pointer;
      }

      .yyt-logger-stats {
        display: flex;
        gap: 14px;
        padding: 6px 12px;
        font-size: 11px;
        color: var(--yyt-text-muted);
      }

      .yyt-logger-stat strong {
        color: var(--yyt-text);
      }

      .yyt-logger-stat.yyt-log-error strong { color: var(--yyt-error); }
      .yyt-logger-stat.yyt-log-warn strong { color: var(--yyt-warning); }
      .yyt-logger-stat.yyt-log-info strong { color: var(--yyt-accent); }
      .yyt-logger-stat.yyt-log-debug strong { color: var(--yyt-text-muted); }

      .yyt-logger-list {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        border-radius: var(--yyt-radius);
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid var(--yyt-border-soft);
        font-family: "Cascadia Code", "Fira Code", "Consolas", monospace;
        font-size: 12px;
        line-height: 1.55;
      }

      .yyt-logger-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--yyt-text-muted);
        font-size: 13px;
      }

      .yyt-log-entry {
        display: grid;
        grid-template-columns: 90px 52px 140px 1fr;
        gap: 8px;
        align-items: baseline;
        padding: 4px 11px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.02);
        min-width: 0;
      }

      .yyt-log-entry:hover {
        background: rgba(255, 255, 255, 0.03);
      }

      .yyt-log-time {
        color: var(--yyt-text-muted);
        flex-shrink: 0;
      }

      .yyt-log-level {
        font-weight: 700;
        font-size: 10px;
        text-transform: uppercase;
        flex-shrink: 0;
      }

      .yyt-log-scope {
        color: var(--yyt-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .yyt-log-msg {
        color: var(--yyt-text);
        word-break: break-word;
        min-width: 0;
      }

      .yyt-log-data {
        grid-column: 1 / -1;
        padding: 4px 8px;
        margin-top: 2px;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.25);
        color: var(--yyt-text-muted);
        font-size: 11px;
        white-space: pre-wrap;
        word-break: break-all;
        max-height: 120px;
        overflow-y: auto;
      }

      .yyt-log-debug .yyt-log-level { color: var(--yyt-text-muted); }
      .yyt-log-info .yyt-log-level { color: var(--yyt-accent); }
      .yyt-log-warn .yyt-log-level { color: var(--yyt-warning); }
      .yyt-log-error .yyt-log-level { color: var(--yyt-error); }

      .yyt-log-error {
        background: rgba(248, 113, 113, 0.06);
      }

      .yyt-log-warn {
        background: rgba(251, 191, 36, 0.04);
      }

      @media screen and (max-width: 768px) {
        .yyt-log-entry {
          grid-template-columns: 70px 44px 100px 1fr;
          gap: 4px;
          padding: 4px 8px;
          font-size: 11px;
        }
        .yyt-logger-toolbar {
          gap: 6px;
        }
      }
    `;
  }
};

export default LoggerPanel;
