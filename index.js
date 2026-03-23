/**
 * YouYou Toolkit - SillyTavern 工具插件
 * @version 0.6.2
 * @description 一个轻量级的 SillyTavern 工具插件框架，支持API连接、预设管理、正则提取、独立窗口系统、工具提示词、破限词和上下文注入
 * @author YouYou
 */

import { createBootstrap } from './modules/app/bootstrap.js';
import { createPopupShell } from './modules/app/popup-shell.js';
import { createPublicApi } from './modules/app/public-api.js';

const SCRIPT_ID = 'youyou_toolkit';
const SCRIPT_VERSION = '0.6.2';
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
  uiState: {
    currentPopup: null,
    currentOverlay: null,
    currentMainTab: 'apiPresets',
    currentSubTab: {}
  }
};

const popupShell = createPopupShell(appContext);
const bootstrap = createBootstrap(appContext, {
  openPopup: popupShell.openPopup
});

const YouYouToolkit = createPublicApi(appContext, {
  init: bootstrap.init,
  loadModules: bootstrap.loadModules,
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