/**
 * YouYou Toolkit - SQL 协议适配器（shujuku sqlite 模式兼容）
 *
 * 议题 #15 Task C（v1.0.201+）：
 *   兼容 shujuku sqlite 模式 AI 输出的 SQL 语句：
 *     INSERT INTO table_xxx (col_1, col_2) VALUES ('v1', 'v2');
 *     UPDATE table_xxx SET col_1 = 'v1' WHERE row_id = 3;
 *     DELETE FROM table_xxx WHERE row_id = 3;
 *
 * 触发条件：
 *   text 包含 <sql>...</sql> 标签
 *   或包含 INSERT INTO / UPDATE / DELETE FROM 关键字（独立行）
 *
 * 转换为统一 op 格式：
 *   - INSERT → { op:'insertRow', tableIndex, data:{col:val,...} }
 *   - UPDATE → { op:'updateRow', tableIndex, rowIndex, data:{col:val,...} }
 *   - DELETE → { op:'deleteRow', tableIndex, rowIndex }
 *
 * 当前实现支持基础语法子集（足够覆盖 shujuku 协议）：
 *   - 表名解析：'table_0' / 'sheet_0' / 数字尾缀视为 tableIndex
 *     'main_character' / 任意非数字尾缀 → tableIndex 0（fallback，未来按 sheetUid → 索引映射可改）
 *   - WHERE 仅识别 `row_id = N` 取 rowIndex
 *   - 不支持 JOIN / subquery / 函数调用（shujuku 也不需要）
 */

const SQL_TAG_RE = /<sql>([\s\S]*?)<\/sql>/gi;
const SQL_STMT_RE = /(INSERT\s+INTO\s+\S+[\s\S]*?;)|(UPDATE\s+\S+\s+SET[\s\S]*?;)|(DELETE\s+FROM\s+\S+[\s\S]*?;)/gi;

function stripQuotes(s) {
  if (typeof s !== 'string') return s;
  const t = s.trim();
  if ((t.startsWith("'") && t.endsWith("'")) || (t.startsWith('"') && t.endsWith('"'))) {
    return t.slice(1, -1).replace(/''/g, "'").replace(/\\'/g, "'");
  }
  return t;
}

function tableNameToIndex(tableName) {
  // 表名结尾数字作为 tableIndex（shujuku 风格 table_0 / sheet_3）
  const m = String(tableName || '').match(/(\d+)$/);
  if (m) return parseInt(m[1], 10);
  return 0; // fallback
}

function parseWhereRowId(whereClause) {
  // 只识别 `row_id = N` 形式
  const m = String(whereClause || '').match(/row_id\s*=\s*(\d+)/i);
  return m ? parseInt(m[1], 10) : -1;
}

function parseInsert(stmt) {
  // INSERT INTO table_0 (col_1, col_2) VALUES ('v1', 'v2');
  const m = stmt.match(/INSERT\s+INTO\s+(\S+)\s*\(([^)]*)\)\s*VALUES\s*\(([^)]*)\)/i);
  if (!m) return null;
  const tableName = m[1];
  const colsRaw = m[2];
  const valsRaw = m[3];
  const cols = colsRaw.split(',').map((s) => s.trim());
  const vals = valsRaw.split(',').map((s) => stripQuotes(s.trim()));
  const data = {};
  cols.forEach((col, i) => {
    if (col !== 'row_id' && vals[i] !== undefined) data[col] = vals[i];
  });
  return { op: 'insertRow', tableIndex: tableNameToIndex(tableName), data };
}

function parseUpdate(stmt) {
  // UPDATE table_0 SET col_1 = 'v1', col_2 = 'v2' WHERE row_id = 3;
  const m = stmt.match(/UPDATE\s+(\S+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?$/i);
  if (!m) return null;
  const tableName = m[1];
  const setClause = m[2];
  const whereClause = m[3];
  const data = {};
  // 简单按 , 切（不处理嵌套），按 = 拆 key/val
  const pairs = setClause.split(/,(?![^()]*\))/);
  for (const pair of pairs) {
    const eq = pair.indexOf('=');
    if (eq < 0) continue;
    const k = pair.slice(0, eq).trim();
    const v = stripQuotes(pair.slice(eq + 1).trim());
    if (k && k !== 'row_id') data[k] = v;
  }
  return { op: 'updateRow', tableIndex: tableNameToIndex(tableName), rowIndex: parseWhereRowId(whereClause), data };
}

function parseDelete(stmt) {
  // DELETE FROM table_0 WHERE row_id = 3;
  const m = stmt.match(/DELETE\s+FROM\s+(\S+)\s+WHERE\s+([\s\S]+?);?$/i);
  if (!m) return null;
  return { op: 'deleteRow', tableIndex: tableNameToIndex(m[1]), rowIndex: parseWhereRowId(m[2]) };
}

function parseStatements(sqlText) {
  const edits = [];
  SQL_STMT_RE.lastIndex = 0;
  let m;
  while ((m = SQL_STMT_RE.exec(sqlText)) !== null) {
    const stmt = m[0].trim();
    let edit = null;
    if (/^INSERT/i.test(stmt)) edit = parseInsert(stmt);
    else if (/^UPDATE/i.test(stmt)) edit = parseUpdate(stmt);
    else if (/^DELETE/i.test(stmt)) edit = parseDelete(stmt);
    if (edit) edits.push(edit);
  }
  return edits;
}

export const sqlAdapter = Object.freeze({
  formatId: 'sql',
  displayName: 'SQL 协议（INSERT/UPDATE/DELETE）',

  detect(text) {
    if (!text || typeof text !== 'string') return false;
    if (SQL_TAG_RE.test(text)) { SQL_TAG_RE.lastIndex = 0; return true; }
    SQL_TAG_RE.lastIndex = 0;
    // 关键字检测：必须是独立语句（避免误判 prompt 里的描述）
    return /\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b/i.test(text);
  },

  parse(text) {
    let sqlText = '';
    // 优先用 <sql> 标签内容
    SQL_TAG_RE.lastIndex = 0;
    let m;
    let buf = [];
    while ((m = SQL_TAG_RE.exec(text)) !== null) {
      buf.push(m[1]);
    }
    if (buf.length > 0) {
      sqlText = buf.join('\n');
    } else {
      // 兜底：从全文提取 SQL 语句
      sqlText = text;
    }

    const edits = parseStatements(sqlText);
    if (!Array.isArray(edits) || edits.length === 0) return null;
    return { mode: 'incremental', edits, tables: null };
  }
});

export default sqlAdapter;
