/**
 * YouYou Toolkit - AI 协议适配器注册中心
 *
 * 议题 #15 Task C（v1.0.201+）：
 *   用户提议「AI 输出任何格式都统一翻译成内部 op」。
 *   当前主链只支持 <tableEdit> DSL + JSON envelope。本注册中心扩展支持
 *   多种 AI 协议格式（包括 shujuku sqlite 模式的 SQL 协议）。
 *
 * 统一输出格式：
 *   { mode: 'incremental'|'full', edits?: [], tables?: [], rawFormat: string }
 *   - incremental: edits = [{op:'insertRow'|'updateRow'|'deleteRow', tableIndex, rowIndex?, data?}]
 *   - full: tables = [...]
 *
 * 添加新协议的步骤：
 *   1. 新建 <name>-adapter.js
 *   2. 实现 { formatId, detect(text), parse(text): {mode, edits/tables} }
 *   3. 在本文件 protocolRegistry 数组按优先级插入
 */

import { logger } from '../../core/logger-service.js';
import { dslAdapter } from './dsl-adapter.js';
import { sqlAdapter } from './sql-adapter.js';
import { fullJsonAdapter } from './full-json-adapter.js';

let _log;
function getLog() {
  if (!_log) _log = logger.createScope('AiProtocolAdapter');
  return _log;
}

/**
 * 注册表 — 顺序很重要：
 *   1. DSL（最严格，<tableEdit> 标签包裹）
 *   2. SQL（<sql> 标签或 INSERT/UPDATE/DELETE 关键字）
 *   3. JSON envelope（兜底，{ tables: [...] }）
 */
export const protocolRegistry = Object.freeze([
  dslAdapter,
  sqlAdapter,
  fullJsonAdapter
]);

/**
 * 自动探测 AI 响应格式并解析为统一 op 格式。
 * @param {string} text - AI 原始响应
 * @returns {{ mode: string, edits: Array|null, tables: Array|null, rawFormat: string } | null}
 */
export function parseAiResponseAuto(text) {
  if (!text || typeof text !== 'string') return null;

  for (const adapter of protocolRegistry) {
    let matched = false;
    try {
      matched = adapter.detect(text);
    } catch (err) {
      getLog().warn(`adapter ${adapter.formatId} detect 抛错`, err);
      continue;
    }
    if (!matched) continue;

    try {
      const parsed = adapter.parse(text);
      if (parsed && (parsed.mode === 'incremental' || parsed.mode === 'full')) {
        const hasPayload = (parsed.mode === 'incremental' && Array.isArray(parsed.edits) && parsed.edits.length > 0)
          || (parsed.mode === 'full' && Array.isArray(parsed.tables) && parsed.tables.length > 0);
        if (hasPayload) {
          getLog().info('AI 协议适配器命中', {
            formatId: adapter.formatId,
            mode: parsed.mode,
            editsCount: parsed.edits?.length,
            tablesCount: parsed.tables?.length
          });
          return { ...parsed, rawFormat: adapter.formatId };
        }
      }
    } catch (err) {
      getLog().warn(`adapter ${adapter.formatId} parse 抛错，尝试下一个`, err);
    }
  }
  getLog().warn('parseAiResponseAuto: 无适配器命中', { responseLength: text.length });
  return null;
}
