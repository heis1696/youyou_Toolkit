/**
 * YouYou Toolkit - Fallback Provider (迷你 SQL 解释器 + JSON 持久化)
 *
 * 当宿主未安装 Authority 时使用。功能降级但接口与 AuthorityProvider 一致。
 *
 * 支持的 SQL 子集（按 docs/PHASE3_ARCHITECTURE.md #9 设计）：
 *   - CREATE TABLE [IF NOT EXISTS] name (col_def, ..., PRIMARY KEY (cols))
 *   - CREATE INDEX (no-op)
 *   - DROP TABLE [IF EXISTS] name
 *   - INSERT INTO name [(cols)] VALUES (?, ?, ...)  → 命中 PK 视为 upsert
 *   - SELECT [cols|*] FROM name [WHERE col op ? AND ...] [ORDER BY col [ASC|DESC]] [LIMIT n] [OFFSET n]
 *   - UPDATE name SET col=?, col=? [WHERE ...]
 *   - DELETE FROM name [WHERE ...]
 *
 * 不支持：JOIN / GROUP BY / HAVING / 嵌套查询 / 函数调用 / OR (只有 AND)
 */

import { logger } from './logger-service.js';
import { toolStorage } from './storage-service.js';
import { PROVIDER_KIND } from './tool-data-provider.js';

const log = logger.createScope('FallbackProvider');

const STORAGE_KEY = 'provider_fallback_v1';

// ────────── SQL 解析器 ──────────

function _splitTopLevelCommas(s) {
  const out = [];
  let depth = 0;
  let buf = '';
  for (const ch of s) {
    if (ch === '(') depth += 1;
    else if (ch === ')') depth -= 1;
    if (ch === ',' && depth === 0) {
      if (buf.trim()) out.push(buf);
      buf = '';
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) out.push(buf);
  return out;
}

function parseCreateTable(stmt) {
  const m = stmt.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);
  if (!m) return null;
  const name = m[1];
  const body = m[2];
  const parts = _splitTopLevelCommas(body);
  const columns = [];
  let pkCols = [];
  for (const part of parts) {
    const t = part.trim();
    const pkM = t.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);
    if (pkM) {
      pkCols = pkM[1].split(',').map((s) => s.trim());
      continue;
    }
    const colM = t.match(/^(\w+)\s+(\w+)/);
    if (colM) {
      columns.push({ name: colM[1], type: colM[2].toUpperCase(), raw: t });
      if (/PRIMARY\s+KEY/i.test(t) && !pkCols.length) {
        pkCols = [colM[1]];
      }
    }
  }
  return { name, columns, pkCols };
}

function parseInsert(stmt) {
  const m = stmt.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);
  if (!m) return null;
  const name = m[1];
  const cols = m[2] ? m[2].split(',').map((s) => s.trim()) : null;
  const phCount = (m[3].match(/\?/g) || []).length;
  return { name, cols, paramCount: phCount };
}

function _parseWhereClause(s) {
  const parts = s.split(/\s+AND\s+/i);
  const conds = [];
  for (const part of parts) {
    const eqM = part.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);
    if (eqM) {
      const op = eqM[2] === '<>' ? '!=' : eqM[2];
      conds.push({ col: eqM[1], op, placeholder: true });
      continue;
    }
    const nullM = part.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);
    if (nullM) {
      conds.push({ col: nullM[1], op: nullM[2] ? 'IS NOT NULL' : 'IS NULL', placeholder: false });
      continue;
    }
    throw new Error(`FallbackProvider 不支持的 WHERE 子句: "${part}"`);
  }
  return conds;
}

function parseSelect(stmt) {
  const m = stmt.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);
  if (!m) return null;
  const colsRaw = m[1].trim();
  const name = m[2];
  const rest = m[3];

  const whereM = rest.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i);
  const orderM = rest.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i);
  const limitM = rest.match(/\bLIMIT\s+(\d+)/i);
  const offsetM = rest.match(/\bOFFSET\s+(\d+)/i);

  return {
    name,
    cols: colsRaw === '*' ? null : colsRaw.split(',').map((s) => s.trim()),
    where: whereM ? _parseWhereClause(whereM[1].trim()) : null,
    orderBy: orderM ? { col: orderM[1], dir: (orderM[2] || 'ASC').toUpperCase() } : null,
    limit: limitM ? parseInt(limitM[1], 10) : null,
    offset: offsetM ? parseInt(offsetM[1], 10) : null
  };
}

function parseUpdate(stmt) {
  const m = stmt.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);
  if (!m) return null;
  const name = m[1];
  const setStr = m[2];
  const whereStr = m[3];
  const setCols = setStr.split(',').map((part) => {
    const sm = part.trim().match(/^(\w+)\s*=\s*\?$/);
    if (!sm) throw new Error(`FallbackProvider 不支持的 SET 子句: "${part}"`);
    return sm[1];
  });
  return {
    name,
    setCols,
    where: whereStr ? _parseWhereClause(whereStr.trim()) : null
  };
}

function parseDelete(stmt) {
  const m = stmt.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);
  if (!m) return null;
  return {
    name: m[1],
    where: m[2] ? _parseWhereClause(m[2].trim()) : null
  };
}

function _valuesEqual(a, b) {
  if (a === b) return true;
  if (a === null || a === undefined) return b === null || b === undefined;
  if (b === null || b === undefined) return false;
  if (typeof a === 'number' || typeof b === 'number') return Number(a) === Number(b);
  return String(a) === String(b);
}

function _valuesCmp(a, b) {
  if (a === b) return 0;
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a) < String(b) ? -1 : 1;
}

function _evalCondition(row, cond, paramQueue) {
  const v = row[cond.col];
  if (cond.op === 'IS NULL') return v === null || v === undefined;
  if (cond.op === 'IS NOT NULL') return v !== null && v !== undefined;
  const target = paramQueue.shift();
  switch (cond.op) {
    case '=': return _valuesEqual(v, target);
    case '!=': return !_valuesEqual(v, target);
    case '>': return _valuesCmp(v, target) > 0;
    case '<': return _valuesCmp(v, target) < 0;
    case '>=': return _valuesCmp(v, target) >= 0;
    case '<=': return _valuesCmp(v, target) <= 0;
    default: return false;
  }
}

function _rowMatches(row, where, params) {
  if (!where || !where.length) return true;
  const queue = Array.isArray(params) ? [...params] : [];
  for (const cond of where) {
    if (!_evalCondition(row, cond, queue)) return false;
  }
  return true;
}

// ────────── FallbackProvider ──────────

export class FallbackProvider {
  constructor() {
    this.kind = PROVIDER_KIND.FALLBACK;
    this._tables = new Map();
    this._migrations = new Set();
    this._initialized = false;
    this._dirty = false;
    this._saveTimer = null;
  }

  async init() {
    try {
      const persisted = toolStorage.get(STORAGE_KEY) || {};
      this._migrations = new Set(Array.isArray(persisted.migrations) ? persisted.migrations : []);
      this._tables = new Map();
      for (const [name, table] of Object.entries(persisted.tables || {})) {
        this._tables.set(name, {
          schema: table.schema || { name, columns: [], pkCols: [] },
          rows: Array.isArray(table.rows) ? table.rows : []
        });
      }
      this._initialized = true;
      log.info('FallbackProvider 初始化完成', {
        tables: this._tables.size,
        migrations: this._migrations.size
      });
      return true;
    } catch (error) {
      log.error('FallbackProvider 初始化失败', { error: error?.message || error });
      this._initialized = false;
      return false;
    }
  }

  async dispose() {
    this._flushSave(true);
    this._tables.clear();
    this._migrations.clear();
    this._initialized = false;
  }

  async migrate({ migrations } = {}) {
    this._ensureReady();
    const applied = [];
    const skipped = [];
    for (const m of migrations || []) {
      if (!m?.id || !m?.statement) continue;
      if (this._migrations.has(m.id)) {
        skipped.push(m.id);
        continue;
      }
      const ddl = m.statement.trim();
      if (/^CREATE\s+TABLE/i.test(ddl)) {
        const schema = parseCreateTable(ddl);
        if (!schema) throw new Error(`无法解析 CREATE TABLE: ${ddl}`);
        if (!this._tables.has(schema.name)) {
          this._tables.set(schema.name, { schema, rows: [] });
        }
      } else if (/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(ddl)) {
        // no-op for fallback
      } else if (/^DROP\s+TABLE/i.test(ddl)) {
        const dropM = ddl.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);
        if (dropM) this._tables.delete(dropM[1]);
      } else if (/^ALTER\s+TABLE/i.test(ddl)) {
        log.warn('FallbackProvider 不支持 ALTER TABLE，跳过', { id: m.id });
      } else {
        log.warn('FallbackProvider 跳过未识别 DDL', { id: m.id, statement: ddl });
      }
      this._migrations.add(m.id);
      applied.push(m.id);
    }
    this._markDirty();
    return { applied, skipped };
  }

  async query({ statement, params = [] } = {}) {
    this._ensureReady();
    const sel = parseSelect(statement);
    if (!sel) throw new Error(`无法解析 SELECT: ${statement}`);
    const table = this._tables.get(sel.name);
    if (!table) return { columns: sel.cols || [], rows: [], rowCount: 0 };

    let rows = table.rows.filter((r) => _rowMatches(r, sel.where, params));
    if (sel.orderBy) {
      const dir = sel.orderBy.dir === 'DESC' ? -1 : 1;
      rows = [...rows].sort((a, b) => _valuesCmp(a[sel.orderBy.col], b[sel.orderBy.col]) * dir);
    }
    if (sel.offset) rows = rows.slice(sel.offset);
    if (Number.isFinite(sel.limit)) rows = rows.slice(0, sel.limit);

    let columns;
    let outRows = rows;
    if (sel.cols) {
      outRows = rows.map((r) => {
        const o = {};
        for (const c of sel.cols) o[c] = r[c] === undefined ? null : r[c];
        return o;
      });
      columns = sel.cols;
    } else {
      columns = table.schema?.columns?.map((c) => c.name)
        || (outRows[0] ? Object.keys(outRows[0]) : []);
    }
    return { columns, rows: outRows, rowCount: outRows.length };
  }

  async execute({ statement, params = [] } = {}) {
    this._ensureReady();
    const trimmed = String(statement || '').trim();
    const head = trimmed.split(/\s+/)[0].toUpperCase();
    let result;
    if (head === 'INSERT') result = this._doInsert(trimmed, params);
    else if (head === 'UPDATE') result = this._doUpdate(trimmed, params);
    else if (head === 'DELETE') result = this._doDelete(trimmed, params);
    else throw new Error(`FallbackProvider 不支持的 execute 语句: ${statement}`);
    return result;
  }

  _doInsert(stmt, params) {
    const ins = parseInsert(stmt);
    if (!ins) throw new Error(`无法解析 INSERT: ${stmt}`);
    const table = this._tables.get(ins.name);
    if (!table) throw new Error(`表不存在: ${ins.name}`);

    const cols = ins.cols || (table.schema.columns || []).map((c) => c.name);
    if (!cols.length) throw new Error(`表 ${ins.name} 无列定义`);
    if (params.length !== cols.length) {
      throw new Error(`INSERT 参数数量不匹配 (期望 ${cols.length}, 实际 ${params.length})`);
    }
    const row = {};
    for (let i = 0; i < cols.length; i += 1) row[cols[i]] = params[i];

    const pkCols = table.schema?.pkCols || [];
    const isUpsert = /^INSERT\s+OR\s+REPLACE/i.test(stmt);
    if (pkCols.length) {
      const idx = table.rows.findIndex((r) =>
        pkCols.every((c) => _valuesEqual(r[c], row[c]))
      );
      if (idx >= 0) {
        if (isUpsert) {
          table.rows[idx] = row;
          this._markDirty();
          return { rowsAffected: 1, lastInsertRowid: idx + 1 };
        }
        throw new Error(`PRIMARY KEY 冲突 (${pkCols.join(',')})`);
      }
    }
    table.rows.push(row);
    this._markDirty();
    return { rowsAffected: 1, lastInsertRowid: table.rows.length };
  }

  _doUpdate(stmt, params) {
    const upd = parseUpdate(stmt);
    if (!upd) throw new Error(`无法解析 UPDATE: ${stmt}`);
    const table = this._tables.get(upd.name);
    if (!table) return { rowsAffected: 0, lastInsertRowid: null };

    const setCount = upd.setCols.length;
    if (params.length < setCount) {
      throw new Error(`UPDATE 参数不足 (SET 需要 ${setCount}, 实际 ${params.length})`);
    }
    const setParams = params.slice(0, setCount);
    const whereParams = params.slice(setCount);

    let count = 0;
    for (const row of table.rows) {
      if (_rowMatches(row, upd.where, whereParams)) {
        for (let i = 0; i < setCount; i += 1) row[upd.setCols[i]] = setParams[i];
        count += 1;
      }
    }
    if (count > 0) this._markDirty();
    return { rowsAffected: count, lastInsertRowid: null };
  }

  _doDelete(stmt, params) {
    const del = parseDelete(stmt);
    if (!del) throw new Error(`无法解析 DELETE: ${stmt}`);
    const table = this._tables.get(del.name);
    if (!table) return { rowsAffected: 0, lastInsertRowid: null };

    const before = table.rows.length;
    table.rows = table.rows.filter((r) => !_rowMatches(r, del.where, params));
    const removed = before - table.rows.length;
    if (removed > 0) this._markDirty();
    return { rowsAffected: removed, lastInsertRowid: null };
  }

  async batch({ statements } = {}) {
    this._ensureReady();
    const results = [];
    for (const s of statements || []) {
      const head = String(s.statement || '').trim().split(/\s+/)[0].toUpperCase();
      if (head === 'SELECT') {
        const r = await this.query(s);
        results.push({ kind: 'query', ...r });
      } else {
        const r = await this.execute(s);
        results.push({ kind: 'exec', ...r });
      }
    }
    return { results };
  }

  async transaction({ statements } = {}) {
    this._ensureReady();
    const snapshot = this._snapshot();
    try {
      const { results } = await this.batch({ statements });
      this._flushSave(true);
      return { committed: true, results };
    } catch (error) {
      this._restore(snapshot);
      log.warn('FallbackProvider 事务回滚', { error: error?.message || error });
      throw error;
    }
  }

  async paginate({ statement, params = [], page = {} } = {}) {
    this._ensureReady();
    const limit = Number.isFinite(page?.limit) ? page.limit : 50;
    const offset = Number.isFinite(page?.offset) ? page.offset : 0;
    const paged = `${statement} LIMIT ${limit} OFFSET ${offset}`;
    return this.query({ statement: paged, params });
  }

  async backup() {
    this._ensureReady();
    return this._snapshot();
  }

  async export() {
    return this.backup();
  }

  async import(data) {
    this._ensureReady();
    this._restore(data || {});
    this._markDirty();
    this._flushSave(true);
  }

  describe() {
    return {
      kind: this.kind,
      initialized: this._initialized,
      tables: this._tables.size,
      migrations: this._migrations.size,
      tableNames: [...this._tables.keys()]
    };
  }

  // ── 内部 ──

  _snapshot() {
    const tables = {};
    for (const [name, t] of this._tables) {
      tables[name] = {
        schema: t.schema,
        rows: JSON.parse(JSON.stringify(t.rows))
      };
    }
    return {
      migrations: [...this._migrations],
      tables
    };
  }

  _restore(snapshot) {
    this._migrations = new Set(Array.isArray(snapshot?.migrations) ? snapshot.migrations : []);
    this._tables = new Map();
    for (const [name, t] of Object.entries(snapshot?.tables || {})) {
      this._tables.set(name, {
        schema: t.schema || { name, columns: [], pkCols: [] },
        rows: Array.isArray(t.rows) ? t.rows : []
      });
    }
  }

  _markDirty() {
    this._dirty = true;
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._flushSave(false), 300);
  }

  _flushSave(force) {
    if (this._saveTimer) {
      clearTimeout(this._saveTimer);
      this._saveTimer = null;
    }
    if (!this._dirty && !force) return;
    try {
      toolStorage.set(STORAGE_KEY, this._snapshot());
      this._dirty = false;
    } catch (error) {
      log.error('FallbackProvider 持久化失败', { error: error?.message || error });
    }
  }

  _ensureReady() {
    if (!this._initialized) throw new Error('FallbackProvider 尚未初始化');
  }
}

export default FallbackProvider;
