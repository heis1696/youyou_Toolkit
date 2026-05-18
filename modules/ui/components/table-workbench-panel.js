/**
 * YouYou Toolkit - 填表工作台 popup tab 启动器
 *
 * 议题 #15 #13 任务：瘦身原 1441 行 panel 为简洁 launcher（popup tab 入口）。
 *
 * 行为：
 *   - tab 内渲染一个 launcher 卡片：标题 + 描述 + 当前状态 chips + 主按钮
 *   - "打开填表工作台" 按钮 → openTableWorkbenchWindow()（独立窗口承载实际功能）
 *   - "立即填表" 按钮 → runManualTableUpdate()（快捷入口）
 *
 * 删除的旧功能：
 *   - drawer (renderTableEditorDrawer)
 *   - 字段结构编辑 (renderFieldStructure)
 *   - 数据行编辑 (renderDataRowsWorkspace)
 *   - 单表诊断 (renderSingleTableDiagnostics)
 *   - 高级诊断 (renderAdvancedDiagnostics)
 *   - 内嵌 prompt textarea / 内嵌正则 rule-list / 内嵌 worldbook checkbox 列表
 *   - 模板管理内嵌 modal
 *
 * 这些功能已迁移到：
 *   - 模板管理 → 预设管理 sub-tab（议题 #12 已完成）
 *   - prompt / worldbook / 正则 → 各自预设管理（议题 #15 §C 决策）
 *   - 字段/数据/单元格编辑 → 数据编辑器窗口 (#11)
 *   - 全局配置 → 工具台窗口 (#10)
 */

import { getJQuery, isContainerValid, showToast } from '../utils.js';
import { logger } from '../../core/logger-service.js';
import { getTableWorkbenchConfig } from '../../table-engine/table-schema-service.js';
import { resolveActiveTemplate } from '../../table-engine/table-template-service.js';
import { tableIsolation } from '../../table-engine/table-isolation-service.js';
import { runManualTableUpdate } from '../../table-engine/table-update-service.js';
import { openTableWorkbenchWindow } from './table-workbench-window.js';

const log = logger.createScope('TableWorkbenchPanel');

const CSS = `
.yyt-twb-launcher {
  padding: 20px;
  display: flex; flex-direction: column; gap: 16px;
  max-width: 760px; margin: 0 auto;
}
.yyt-twb-launcher h1 {
  font-size: 20px; font-weight: 700; color: var(--yyt-text);
  display: flex; align-items: center; gap: 10px;
  margin: 0;
}
.yyt-twb-launcher h1 .icon {
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--yyt-accent-soft); color: var(--yyt-accent);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 15px;
}
.yyt-twb-launcher-desc {
  color: var(--yyt-text-secondary); font-size: 13px;
  line-height: 1.7;
}
.yyt-twb-launcher-chips {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.yyt-twb-launcher-chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 9px; border-radius: 999px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
  background: var(--yyt-surface-2); color: var(--yyt-text-secondary);
  border: 1px solid var(--yyt-border);
}
.yyt-twb-launcher-chip.preset { color: var(--yyt-accent); background: var(--yyt-accent-soft); border-color: rgba(123,183,255,0.18); }
.yyt-twb-launcher-chip.mode { color: #a78bfa; background: rgba(167,139,250,0.12); border-color: rgba(167,139,250,0.18); }
.yyt-twb-launcher-actions {
  display: flex; gap: 10px; flex-wrap: wrap;
  margin-top: 4px;
}
.yyt-twb-launcher-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 20px;
  border: 1px solid var(--yyt-border-strong);
  border-radius: 8px;
  background: var(--yyt-surface-2);
  color: var(--yyt-text);
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all 0.12s ease;
  font-family: inherit;
}
.yyt-twb-launcher-btn:hover { background: var(--yyt-surface-3); }
.yyt-twb-launcher-btn-primary {
  background: var(--yyt-accent); color: var(--yyt-on-accent);
  border-color: transparent; font-weight: 700;
}
.yyt-twb-launcher-btn-primary:hover { background: var(--yyt-accent-strong); }
.yyt-twb-launcher-hint {
  margin-top: 4px;
  padding: 10px 14px;
  background: var(--yyt-surface-2);
  border-left: 3px solid var(--yyt-accent);
  border-radius: 4px;
  color: var(--yyt-text-secondary);
  font-size: 12px; line-height: 1.7;
}
.yyt-twb-launcher-hint code {
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 11px; padding: 1px 5px; border-radius: 3px;
  background: var(--yyt-bg-base); color: var(--yyt-accent);
}
`;

let _stylesInjected = false;
function injectStyles() {
  if (_stylesInjected) return;
  const head = (window.parent && window.parent.document ? window.parent.document : document).head;
  const style = document.createElement('style');
  style.id = 'yyt-twb-launcher-styles';
  style.textContent = CSS;
  head.appendChild(style);
  _stylesInjected = true;
}

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function loadStatus() {
  let cfg = {};
  try { cfg = getTableWorkbenchConfig() || {}; } catch (_) {}
  const runtime = cfg.runtime || {};
  let templateName = '默认';
  try {
    const resolved = resolveActiveTemplate({});
    templateName = resolved?.template?.name || templateName;
  } catch (_) {}
  let isolationKey = '';
  try { isolationKey = tableIsolation.getKey(); } catch (_) {}
  return {
    cfg,
    runtime,
    templateName,
    isolationKey,
    triggerMode: cfg.automation?.enabled ? '自动' : '手动'
  };
}

export const TableWorkbenchPanel = {
  id: 'tableWorkbenchPanel',

  render() {
    injectStyles();
    const status = loadStatus();
    const lastRunHint = status.runtime?.lastStatus === 'success'
      ? '上次成功'
      : status.runtime?.lastStatus === 'failed'
        ? '上次失败'
        : status.runtime?.lastRunAt > 0 ? '已运行' : '从未运行';

    return `
      <div class="yyt-twb-launcher">
        <h1>
          <span class="icon"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
          填表工作台
        </h1>
        <div class="yyt-twb-launcher-desc">
          从对话内容提取结构化数据，自动维护表格状态。点击下方按钮打开独立工作台窗口配置 AI 绑定、模板和填表行为；数据编辑可从工作台内部进入。
        </div>

        <div class="yyt-twb-launcher-chips">
          <span class="yyt-twb-launcher-chip mode">模式 ${esc(status.triggerMode)}</span>
          <span class="yyt-twb-launcher-chip preset">模板: ${esc(status.templateName)}</span>
          ${status.isolationKey ? `<span class="yyt-twb-launcher-chip">隔离: ${esc(status.isolationKey)}</span>` : ''}
          <span class="yyt-twb-launcher-chip">${esc(lastRunHint)}</span>
        </div>

        <div class="yyt-twb-launcher-actions">
          <button class="yyt-twb-launcher-btn yyt-twb-launcher-btn-primary" data-twb-action="open-window">
            <i class="fa-solid fa-table-cells"></i> 打开填表工作台
          </button>
          <button class="yyt-twb-launcher-btn" data-twb-action="run-now">
            <i class="fa-solid fa-play"></i> 立即填表
          </button>
        </div>

        <div class="yyt-twb-launcher-hint">
          <strong>v1.0.169 重写说明：</strong> 旧版面板的配置面和数据编辑已分别迁移到<b>工作台窗口</b>和<b>数据编辑器窗口</b>。
          模板/正则/世界书/AI 指令的内容编辑请在 <code>预设管理</code> 主 tab 完成；本入口只做启动与快捷运行。
        </div>
      </div>
    `;
  },

  bindEvents($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    const self = this;

    $container.off('.twb');

    $container.on('click.twb', '[data-twb-action="open-window"]', () => {
      try {
        openTableWorkbenchWindow();
      } catch (err) {
        log.error('打开工作台窗口异常', err);
        showToast('error', `打开失败：${err?.message || err}`);
      }
    });

    $container.on('click.twb', '[data-twb-action="run-now"]', async () => {
      try {
        const result = await runManualTableUpdate();
        if (result?.success) {
          showToast('success', '填表完成');
        } else {
          showToast('error', `填表失败：${result?.error || '未知'}`);
        }
        // 重新渲染以更新 chip 状态
        if (typeof self.renderTo === 'function') {
          self.renderTo($container);
        }
      } catch (err) {
        log.error('立即填表异常', err);
        showToast('error', `异常：${err?.message || err}`);
      }
    });
  },

  /**
   * 兼容旧调用：renderTo($container) — ui-manager 用
   */
  renderTo($container) {
    const $ = getJQuery();
    if (!$ || !isContainerValid($container)) return;
    $container.html(this.render());
    this.bindEvents($container);
  }
};

export default TableWorkbenchPanel;
