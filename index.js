/**
 * YouYou Toolkit - SillyTavern 工具插件
 * @version 1.0.61
 * @description 一个运行在 SillyTavern / TavernHelper 宿主中的可配置工具链平台，支持 API 预设、工具管理、自动触发、楼层写回与统一 UI 装配
 * @author YouYou
 */

import { createBootstrap } from './modules/app/bootstrap.js';
import { createPopupShell } from './modules/app/popup-shell.js';
import { createPublicApi } from './modules/app/public-api.js';

const SCRIPT_ID = 'youyou_toolkit';
const SCRIPT_VERSION = '1.0.61';
const MENU_ITEM_ID = `${SCRIPT_ID}-menu-item`;
const MENU_CONTAINER_ID = `${SCRIPT_ID}-menu-container`;
const POPUP_ID = `${SCRIPT_ID}-popup`;

const topLevelWindow = (typeof window.parent !== 'undefined' ? window.parent : window);

const appContext = {
  constants: {
    SCRIPT_ID,
    SCRIPT_VERSION,
    MENU_ITEM_ID,
    MENU_CONTAINER_ID,
    POPUP_ID
  },
  topLevelWindow,
  modules: {
    storageModule: null,
    apiConnectionModule: null,
    uiModule: null,
    presetManagerModule: null,
    uiComponentsModule: null,
    regexExtractorModule: null,
    toolManagerModule: null,
    toolExecutorModule: null,
    toolTriggerModule: null,
    windowManagerModule: null,
    toolRegistryModule: null,
    promptEditorModule: null,
    settingsServiceModule: null,
    bypassManagerModule: null,
    variableResolverModule: null,
    contextInjectorModule: null,
    toolPromptServiceModule: null,
    toolOutputServiceModule: null
  },
  caches: {
    dynamicToolPanelCache: new Map()
  },
  services: {
    loadModules: null,
    loadLegacyModule: null
  },
  uiState: {
    currentPopup: null,
    currentOverlay: null,
    currentMainTab: 'apiPresets',
    currentSubTab: {},
    startupScreenDismissed: false
  }
};

const popupShell = createPopupShell(appContext);
const bootstrap = createBootstrap(appContext, {
  openPopup: popupShell.openPopup
});

appContext.services.loadModules = bootstrap.loadModules;
appContext.services.loadLegacyModule = bootstrap.loadLegacyModule;

const YouYouToolkit = createPublicApi(appContext, {
  init: bootstrap.init,
  loadModules: bootstrap.loadModules,
  loadLegacyModule: bootstrap.loadLegacyModule,
  addMenuItem: bootstrap.addMenuItem,
  popupShell
});

if (typeof window !== 'undefined') {
  window.YouYouToolkit = YouYouToolkit;

  if (typeof window.parent !== 'undefined' && window.parent !== window) {
    try {
      window.parent.YouYouToolkit = YouYouToolkit;
    } catch (error) {
      // 跨域情况下可能会失败，忽略
    }
  }
}

export default YouYouToolkit;

bootstrap.init();

console.log(`[${SCRIPT_ID}] 模块加载完成`);