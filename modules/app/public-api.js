/**
 * YouYou Toolkit - 对外 API 组装模块
 * @description 负责组装并返回全局公开 API 门面
 */

export function createPublicApi(context, services = {}) {
  const { constants, modules } = context;
  const { SCRIPT_ID, SCRIPT_VERSION } = constants;
  const { init, loadModules, addMenuItem, popupShell } = services;

  return {
    version: SCRIPT_VERSION,
    id: SCRIPT_ID,

    init,

    openPopup: popupShell?.openPopup,
    closePopup: popupShell?.closePopup,
    switchMainTab: popupShell?.switchMainTab,
    switchSubTab: popupShell?.switchSubTab,

    addMenuItem,

    getStorage: () => modules.storageModule,
    getApiConnection: () => modules.apiConnectionModule,
    getPresetManager: () => modules.presetManagerModule,
    getUi: () => modules.uiModule,
    getUiModule: () => modules.uiModule,
    getUiComponents: () => modules.uiComponentsModule,
    getRegexExtractor: () => modules.regexExtractorModule,
    getToolManager: () => modules.toolManagerModule,
    getToolExecutor: () => modules.toolExecutorModule,
    getToolTrigger: () => modules.toolTriggerModule,
    getAutoTriggerDiagnostics: (options) => modules.toolTriggerModule?.getAutoTriggerDiagnostics?.(options) || null,
    getWindowManager: () => modules.windowManagerModule,
    getToolRegistry: () => modules.toolRegistryModule,
    getPromptEditor: () => modules.promptEditorModule,
    getSettingsService: () => modules.settingsServiceModule,
    getBypassManager: () => modules.bypassManagerModule,
    getVariableResolver: () => modules.variableResolverModule,
    getContextInjector: () => modules.contextInjectorModule,
    getToolPromptService: () => modules.toolPromptServiceModule,
    getToolOutputService: () => modules.toolOutputServiceModule,

    async getApiConfig() {
      await loadModules();
      return modules.storageModule ? modules.storageModule.loadSettings().apiConfig : null;
    },

    async saveApiConfig(config) {
      await loadModules();
      if (modules.apiConnectionModule) {
        modules.apiConnectionModule.updateApiConfig(config);
        return true;
      }
      return false;
    },

    async getPresets() {
      await loadModules();
      return modules.presetManagerModule ? modules.presetManagerModule.getAllPresets() : [];
    },

    async sendApiRequest(messages, options) {
      await loadModules();
      if (modules.apiConnectionModule) {
        return modules.apiConnectionModule.sendApiRequest(messages, options);
      }
      throw new Error('API模块未加载');
    },

    async testApiConnection() {
      await loadModules();
      if (modules.apiConnectionModule) {
        return modules.apiConnectionModule.testApiConnection();
      }
      return { success: false, message: 'API模块未加载' };
    },

    registerTool(id, config) {
      return modules.toolRegistryModule?.registerTool(id, config) || false;
    },

    unregisterTool(id) {
      return modules.toolRegistryModule?.unregisterTool(id) || false;
    },

    getToolList() {
      return modules.toolRegistryModule?.getToolList() || [];
    },

    createWindow(options) {
      return modules.windowManagerModule?.createWindow(options) || null;
    },

    closeWindow(id) {
      modules.windowManagerModule?.closeWindow(id);
    }
  };
}

export default createPublicApi;