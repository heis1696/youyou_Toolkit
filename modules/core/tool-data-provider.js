/**
 * YouYou Toolkit - 工具数据 Provider 接口与工厂
 *
 * 详见 docs/PHASE3_ARCHITECTURE.md #9 (持久化重构 + Authority 接入)
 *
 * 双轨架构：
 *   - AuthorityProvider (首选): 检测到 window.STAuthority 时使用，走真 SQLite
 *   - FallbackProvider (兜底): 没装 Authority 时使用，走 storage-service JSON + 迷你 SQL 解释器
 *
 * 调用方：
 *   const provider = await getToolDataProvider();
 *   await provider.migrate({ migrations: [...] });
 *   const result = await provider.query({ statement: 'SELECT ...', params: [] });
 *   const exec = await provider.execute({ statement: 'INSERT ...', params: [...] });
 */

import { logger } from './logger-service.js';

const log = logger.createScope('ToolDataProvider');

export const PROVIDER_KIND = Object.freeze({
  AUTHORITY: 'authority',
  FALLBACK: 'fallback'
});

/**
 * @typedef {Object} ToolDataMigration
 * @property {string} id          - 迁移唯一 ID
 * @property {string} statement   - SQL DDL 语句
 */

/**
 * @typedef {Object} ToolDataQueryResult
 * @property {string[]} columns
 * @property {Array<Object>} rows
 * @property {number} rowCount
 * @property {Object} [page]
 */

/**
 * @typedef {Object} ToolDataExecResult
 * @property {number} rowsAffected
 * @property {number|null} lastInsertRowid
 */

/**
 * @typedef {Object} IToolDataProvider
 * @property {string} kind
 * @property {() => Promise<boolean>} init
 * @property {() => Promise<void>} dispose
 * @property {(input: { migrations: ToolDataMigration[] }) => Promise<{applied: string[], skipped: string[]}>} migrate
 * @property {(input: { statement: string, params?: any[] }) => Promise<ToolDataQueryResult>} query
 * @property {(input: { statement: string, params?: any[] }) => Promise<ToolDataExecResult>} execute
 * @property {(input: { statements: Array<{ statement: string, params?: any[] }> }) => Promise<{results: any[]}>} batch
 * @property {(input: { statements: Array<{ statement: string, params?: any[] }> }) => Promise<{committed: boolean, results: any[]}>} transaction
 * @property {() => Promise<Object>} backup
 * @property {() => Promise<Object>} export
 * @property {(data: any) => Promise<void>} import
 * @property {() => Object} describe
 */

let _provider = null;
let _initPromise = null;

function _detectAuthoritySdk() {
  if (typeof window === 'undefined') return null;
  try {
    const local = window.STAuthority?.AuthoritySDK;
    if (local) return local;
  } catch (_) { /* ignore */ }
  try {
    if (window.parent && window.parent !== window) {
      const parentSdk = window.parent.STAuthority?.AuthoritySDK;
      if (parentSdk) return parentSdk;
    }
  } catch (_) { /* cross-origin */ }
  return null;
}

async function _createProvider({ preferAuthority = true, extensionVersion = '1.0.149' } = {}) {
  if (preferAuthority && _detectAuthoritySdk()) {
    const { AuthorityProvider } = await import('./authority-provider.js');
    return new AuthorityProvider({ extensionVersion });
  }
  const { FallbackProvider } = await import('./fallback-provider.js');
  return new FallbackProvider();
}

/**
 * 获取 Provider 单例，首次调用时根据宿主探测自动选择实现。
 * @returns {Promise<IToolDataProvider>}
 */
export async function getToolDataProvider(options = {}) {
  if (_provider) return _provider;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    let provider = await _createProvider({ preferAuthority: true, ...options });
    let ok = await provider.init();
    if (!ok && provider.kind === PROVIDER_KIND.AUTHORITY) {
      log.warn('AuthorityProvider 初始化失败，降级到 FallbackProvider');
      try { await provider.dispose(); } catch (_) { /* ignore */ }
      provider = await _createProvider({ preferAuthority: false });
      ok = await provider.init();
    }
    if (!ok) {
      log.error(`Provider 全部初始化失败 (kind=${provider.kind})`);
    } else {
      log.info(`Provider 初始化完成: kind=${provider.kind}`);
    }
    _provider = provider;
    return provider;
  })();

  return _initPromise;
}

/**
 * 同步访问已初始化的 Provider（未初始化返回 null）
 */
export function getCurrentProvider() {
  return _provider;
}

/**
 * 显式构造 Provider，绕过单例（测试 / 调试用）。
 */
export async function createProvider(options = {}) {
  const provider = await _createProvider(options);
  await provider.init();
  return provider;
}

/**
 * 销毁单例（测试 / 卸载用）。
 */
export async function disposeToolDataProvider() {
  if (_provider) {
    try { await _provider.dispose(); } catch (_) { /* ignore */ }
    _provider = null;
  }
  _initPromise = null;
}

export { _detectAuthoritySdk as detectAuthoritySdk };
