/**
 * YouYou Toolkit - Authority Provider
 *
 * 通过 window.STAuthority.AuthoritySDK 访问真后端 SQLite。
 * 详见 docs/PHASE3_ARCHITECTURE.md #9 + 参考项目调研归档 B。
 */

import { logger } from './logger-service.js';
import { PROVIDER_KIND, detectAuthoritySdk } from './tool-data-provider.js';

const log = logger.createScope('AuthorityProvider');

const EXTENSION_ID = 'third-party/youyou-toolkit';
const EXTENSION_DISPLAY_NAME = 'YouYou Toolkit';
const DEFAULT_DATABASE = 'main';

export class AuthorityProvider {
  constructor({ extensionVersion = '1.0.149' } = {}) {
    this.kind = PROVIDER_KIND.AUTHORITY;
    this._client = null;
    this._extensionVersion = extensionVersion;
    this._initialized = false;
  }

  async init() {
    const sdk = detectAuthoritySdk();
    if (!sdk) {
      log.error('未检测到 window.STAuthority.AuthoritySDK');
      return false;
    }
    try {
      this._client = await sdk.init({
        extensionId: EXTENSION_ID,
        displayName: EXTENSION_DISPLAY_NAME,
        version: this._extensionVersion,
        installType: 'local',
        declaredPermissions: { sql: { private: true } }
      });
      this._initialized = true;
      log.info('AuthorityProvider 初始化成功', { extensionId: EXTENSION_ID });
      return true;
    } catch (error) {
      log.error('AuthorityProvider 初始化失败', { error: error?.message || error });
      this._initialized = false;
      return false;
    }
  }

  async dispose() {
    this._client = null;
    this._initialized = false;
  }

  async migrate({ migrations, database = DEFAULT_DATABASE, tableName } = {}) {
    this._ensureReady();
    const payload = { database, migrations };
    if (tableName) payload.tableName = tableName;
    const result = await this._client.sql.migrate(payload);
    return {
      applied: result?.applied || [],
      skipped: result?.skipped || [],
      tableName: result?.tableName,
      latestId: result?.latestId
    };
  }

  async query({ statement, params = [], database = DEFAULT_DATABASE, page = undefined } = {}) {
    this._ensureReady();
    const payload = { database, statement, params };
    if (page) payload.page = page;
    const result = await this._client.sql.query(payload);
    return {
      columns: result.columns || [],
      rows: result.rows || [],
      rowCount: result.rowCount ?? (result.rows?.length || 0),
      page: result.page
    };
  }

  async execute({ statement, params = [], database = DEFAULT_DATABASE } = {}) {
    this._ensureReady();
    const result = await this._client.sql.exec({ database, statement, params });
    return {
      rowsAffected: result.rowsAffected ?? 0,
      lastInsertRowid: result.lastInsertRowid ?? null
    };
  }

  async batch({ statements, database = DEFAULT_DATABASE } = {}) {
    this._ensureReady();
    const normalized = (statements || []).map((s) => ({
      mode: s.mode || (/^\s*SELECT/i.test(s.statement) ? 'query' : 'exec'),
      statement: s.statement,
      params: s.params || []
    }));
    const result = await this._client.sql.batch({ database, statements: normalized });
    return { results: result?.results || [] };
  }

  async transaction({ statements, database = DEFAULT_DATABASE } = {}) {
    this._ensureReady();
    const normalized = (statements || []).map((s) => ({
      mode: s.mode || (/^\s*SELECT/i.test(s.statement) ? 'query' : 'exec'),
      statement: s.statement,
      params: s.params || []
    }));
    const result = await this._client.sql.transaction({ database, statements: normalized });
    return {
      committed: !!result?.committed,
      results: result?.results || []
    };
  }

  async paginate({ statement, params = [], database = DEFAULT_DATABASE, page = {} } = {}) {
    this._ensureReady();
    return this.query({ statement, params, database, page });
  }

  async pageAll({ statement, params = [], database = DEFAULT_DATABASE, pageSize = 200, maxPages } = {}) {
    this._ensureReady();
    const result = await this._client.sql.pageAll(
      { database, statement, params },
      { pageSize, maxPages }
    );
    return {
      columns: result.columns || [],
      rows: result.rows || [],
      rowCount: result.rowCount ?? (result.rows?.length || 0)
    };
  }

  async backup() {
    log.warn('backup() 暂未实现，AuthorityProvider 走 Authority 内置备份');
    return { kind: 'authority', timestamp: Date.now() };
  }

  async export() {
    log.warn('export() 暂未实现，AuthorityProvider 走 Authority 内置导出');
    return { kind: 'authority', timestamp: Date.now() };
  }

  async import(/* data */) {
    log.warn('import() 暂未实现，AuthorityProvider 走 Authority 内置导入');
  }

  describe() {
    return {
      kind: this.kind,
      initialized: this._initialized,
      extensionId: EXTENSION_ID,
      database: DEFAULT_DATABASE,
      hasClient: !!this._client
    };
  }

  _ensureReady() {
    if (!this._initialized || !this._client) {
      throw new Error('AuthorityProvider 尚未初始化');
    }
  }
}

export default AuthorityProvider;
