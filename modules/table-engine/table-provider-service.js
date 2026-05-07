/**
 * YouYou Toolkit - 填表 provider 服务
 * @description 为 tableWorkbench 预留执行 provider seam，首版仍接当前 native 链
 */

function createNativeProvider() {
  return {
    mode: 'native',
    async buildRequest(deps = {}, options = {}) {
      if (typeof deps.buildRequest !== 'function') {
        throw new Error('table_provider_missing_build_request');
      }
      return deps.buildRequest(options);
    },
    async sendRequest(deps = {}, request = null, options = {}) {
      if (typeof deps.sendRequest !== 'function') {
        throw new Error('table_provider_missing_send_request');
      }
      return deps.sendRequest(request?.messages || [], options.config || {}, options.abortSignal || null);
    },
    parseResponse(deps = {}, responseText = '') {
      if (typeof deps.parseResponse !== 'function') {
        throw new Error('table_provider_missing_parse_response');
      }
      return deps.parseResponse(responseText);
    }
  };
}

export function getTableProvider() {
  return createNativeProvider();
}
