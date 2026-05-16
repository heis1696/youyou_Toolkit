/**
 * YouYou Toolkit - 预设系统启动 / 内置预设注入 / 一次性存量迁移
 *
 * 议题 #45 Stage 2 — 关键基础设施。
 *
 * 职责：
 *   1. 注册内置正则预设（不写存储，由 store 在 listPresets 时合并）。
 *   2. 注册内置世界书预设（当前为空，留钩子）。
 *   3. 一次性把老的 lossy 镜像字段迁移到预设 ID 引用：
 *      - tool.extraction.selectors → 创建/绑定 regexPresetId
 *      - tool.worldbooks.{enabled,selected} → 创建 worldbookPresetId
 *
 * 启动调用点：modules/app/bootstrap.js（ensurePresetSystem）
 *   必须在 toolAutomationService.init() 之前；否则自动触发可能用到老字段路径。
 *
 * Blocker 保护：迁移过程任一步抛异常 → abort，不写新字段、不设 done flag、保留老字段。
 */

import { presetStorage, storage } from './core/storage-service.js';
import { logger } from './core/logger-service.js';
import * as regexPresetStore from './regex-preset-store.js';
import * as worldbookPresetStore from './worldbook-preset-store.js';

const log = logger.createScope('PresetBootstrap');

const MIGRATION_DONE_KEY = 'migration_v45_done';
const MIGRATION_BACKUP_KEY = 'migration_v45_backup';
const TOOL_CONFIG_STORAGE_KEY = 'tool_configs';

// ────────────────────────────────────────────────
// 内置正则预设定义
// ────────────────────────────────────────────────
//
// 对应当前 3 个内置 AI 工具的 default selectors：
//   summaryTool       → ['boo_FM']
//   statusBlock       → ['status_block']
//   youyouReview      → ['youyou']
// 脚本工具（escapeTransformTool / punctuationTransformTool）默认 selectors 为空，无需绑预设。

const BUILTIN_REGEX_PRESETS = [
  {
    id: 'builtin_regex_summary',
    name: '内置 · 总结提取',
    description: '提取 <boo_FM> 标签内容（对应内置「记忆压缩」工具）',
    rules: [
      { id: 'r_builtin_summary_1', type: 'include', value: 'boo_FM', enabled: true, name: '总结标签', description: '' }
    ],
    blacklist: []
  },
  {
    id: 'builtin_regex_status_block',
    name: '内置 · 状态栏提取',
    description: '提取 <status_block> 标签内容（对应内置「状态栏」工具）',
    rules: [
      { id: 'r_builtin_status_1', type: 'include', value: 'status_block', enabled: true, name: '状态标签', description: '' }
    ],
    blacklist: []
  },
  {
    id: 'builtin_regex_youyou',
    name: '内置 · 优优锐评提取',
    description: '提取 <youyou> 标签内容（对应内置「优优锐评」工具）',
    rules: [
      { id: 'r_builtin_youyou_1', type: 'include', value: 'youyou', enabled: true, name: '优优标签', description: '' }
    ],
    blacklist: []
  }
];

const BUILTIN_WORLDBOOK_PRESETS = [
  // 当前为空，留接口
];

/**
 * 把内置 selectors 与 builtin 预设的规则集对比，命中则返回 builtin id。
 * 用于迁移时尽量复用内置预设而不是创建重复迁移预设。
 */
function findMatchingBuiltinRegex(selectors) {
  if (!Array.isArray(selectors) || selectors.length === 0) return null;
  const norm = selectors.map((s) => String(s || '').trim()).filter(Boolean).sort().join('|');
  if (!norm) return null;
  for (const builtin of BUILTIN_REGEX_PRESETS) {
    const builtinIncludes = builtin.rules
      .filter((r) => r.type === 'include' && r.enabled !== false)
      .map((r) => r.value)
      .sort()
      .join('|');
    if (builtinIncludes === norm) return builtin.id;
  }
  return null;
}

/**
 * 注入内置预设到 store。
 */
export function registerBuiltinPresets() {
  try {
    if (typeof regexPresetStore._setBuiltinPresets === 'function') {
      regexPresetStore._setBuiltinPresets(BUILTIN_REGEX_PRESETS);
    }
    if (typeof worldbookPresetStore._setBuiltinPresets === 'function') {
      worldbookPresetStore._setBuiltinPresets(BUILTIN_WORLDBOOK_PRESETS);
    }
    log.info('内置预设已注册', {
      regex: BUILTIN_REGEX_PRESETS.length,
      worldbook: BUILTIN_WORLDBOOK_PRESETS.length
    });
  } catch (error) {
    log.error('注册内置预设失败', { error });
  }
}

// ────────────────────────────────────────────────
// 一次性存量迁移
// ────────────────────────────────────────────────

/**
 * Selectors → include 规则数组（去重，丢空值）。
 */
function selectorsToIncludeRules(selectors) {
  const seen = new Set();
  const out = [];
  for (const raw of (Array.isArray(selectors) ? selectors : [])) {
    const s = String(raw || '').trim();
    if (!s || seen.has(s)) continue;
    seen.add(s);
    // 'regex:' 前缀按 regex_include 处理（兼容老 mirror 输出）
    if (s.startsWith('regex:')) {
      const v = s.slice(6).trim();
      if (v) out.push({ type: 'regex_include', value: v, enabled: true, name: '', description: '' });
    } else {
      out.push({ type: 'include', value: s, enabled: true, name: '', description: '' });
    }
  }
  return out;
}

/**
 * 单个工具 config 的迁移（非破坏性：只在没有 presetId 时绑）。
 * 返回更新后的 config（如果有变更）或 null（无变更）。
 */
function migrateOneToolConfig(toolId, toolName, config) {
  const next = JSON.parse(JSON.stringify(config || {}));
  let dirty = false;

  // ── 正则预设迁移 ──
  const extraction = next.extraction || {};
  if (!extraction.regexPresetId) {
    const selectors = Array.isArray(extraction.selectors) ? extraction.selectors : [];
    if (selectors.length > 0) {
      const builtinId = findMatchingBuiltinRegex(selectors);
      if (builtinId) {
        extraction.regexPresetId = builtinId;
        dirty = true;
        log.info(`工具 ${toolId} 绑定内置正则预设: ${builtinId}`);
      } else {
        const created = regexPresetStore.createPreset({
          name: `${toolName || toolId}_迁移_正则`,
          description: `自老版本 selectors 自动迁移（${selectors.length} 项）`,
          rules: selectorsToIncludeRules(selectors),
          blacklist: []
        });
        if (created?.id) {
          extraction.regexPresetId = created.id;
          dirty = true;
          log.info(`工具 ${toolId} 创建迁移正则预设: ${created.id}`);
        }
      }
      next.extraction = extraction;
    }
  }

  // ── 世界书预设迁移 ──
  const worldbooks = next.worldbooks || {};
  if (!worldbooks.presetId) {
    if (worldbooks.enabled === true && Array.isArray(worldbooks.selected) && worldbooks.selected.length > 0) {
      const created = worldbookPresetStore.createPreset({
        name: `${toolName || toolId}_迁移_世界书`,
        description: `自老版本 worldbooks.selected 自动迁移（${worldbooks.selected.length} 本）`,
        bindingMode: 'custom',
        includeDisabled: false,
        bookList: worldbooks.selected.map((bookName) => ({
          bookName: String(bookName || ''),
          enabled: true,
          entryOverrides: {}
        })).filter((b) => b.bookName)
      });
      if (created?.id) {
        worldbooks.presetId = created.id;
        dirty = true;
        log.info(`工具 ${toolId} 创建迁移世界书预设: ${created.id}`);
      }
      next.worldbooks = worldbooks;
    }
  }

  return dirty ? next : null;
}

/**
 * 一次性迁移：把 tool_configs 里所有工具的 lossy 镜像字段迁移到 preset id 引用。
 * 失败时不写 done flag，下次启动会重试。
 */
export function runMigrationOnce() {
  try {
    if (presetStorage.get(MIGRATION_DONE_KEY) === true) {
      return { skipped: true, reason: 'already_done' };
    }

    const toolConfigs = storage.get(TOOL_CONFIG_STORAGE_KEY) || {};
    if (!toolConfigs || typeof toolConfigs !== 'object') {
      log.info('无工具配置需要迁移');
      presetStorage.set(MIGRATION_DONE_KEY, true);
      return { skipped: true, reason: 'no_configs' };
    }

    // dump 备份
    presetStorage.set(MIGRATION_BACKUP_KEY, {
      ts: Date.now(),
      version: 'v45',
      snapshot: toolConfigs
    });

    let migratedCount = 0;
    const updated = { ...toolConfigs };

    for (const [toolId, cfg] of Object.entries(toolConfigs)) {
      if (!cfg || typeof cfg !== 'object') continue;
      const next = migrateOneToolConfig(toolId, cfg.name, cfg);
      if (next) {
        updated[toolId] = next;
        migratedCount += 1;
      }
    }

    if (migratedCount > 0) {
      storage.set(TOOL_CONFIG_STORAGE_KEY, updated);
    }

    presetStorage.set(MIGRATION_DONE_KEY, true);
    log.info(`迁移完成`, { migratedCount, total: Object.keys(toolConfigs).length });

    return { skipped: false, migratedCount, total: Object.keys(toolConfigs).length };
  } catch (error) {
    // 失败时不写 done flag，保留老字段，下次启动重试
    log.error('迁移失败，已 abort，老字段保留', { error });
    return { skipped: false, error: error?.message || String(error), aborted: true };
  }
}

/**
 * 启动入口：注册内置预设 + 跑迁移。
 * 应在 bootstrap.js 早期、自动化服务初始化之前调用。
 */
export function ensurePresetSystem() {
  registerBuiltinPresets();
  return runMigrationOnce();
}

export {
  BUILTIN_REGEX_PRESETS,
  BUILTIN_WORLDBOOK_PRESETS,
  MIGRATION_DONE_KEY,
  MIGRATION_BACKUP_KEY
};

export default {
  registerBuiltinPresets,
  runMigrationOnce,
  ensurePresetSystem
};
