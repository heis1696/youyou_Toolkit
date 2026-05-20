/**
 * YouYou Toolkit - 应用启动与初始化模块
 * @description 负责模块加载、样式注入、启动初始化与菜单入口注册
 */

import { logger } from '../core/logger-service.js';
import mainCss from '../../styles/main.css';
import { showToast, showTopNotice } from '../ui/utils.js';

export function createBootstrap(context, options = {}) {
  const { constants, topLevelWindow, modules } = context;
  const {
    SCRIPT_ID,
    SCRIPT_VERSION,
    MENU_ITEM_ID,
    MENU_CONTAINER_ID
  } = constants;

  let moduleLoadPromise = null;
  let uiInitialized = false;

  const scopeLogger = logger.createScope('Bootstrap');

  logger.setToastHandler((type, message, opts) => {
    if (opts.toast) {
      showToast(opts.toast === true ? type : opts.toast, message, opts.duration);
    }
    if (opts.topNotice) {
      const noticeOpts = typeof opts.topNotice === 'object' ? opts.topNotice : {};
      showTopNotice(type, message, noticeOpts);
    }
  });

  function log(...args) {
    scopeLogger.log(args.join(' '));
  }

  function logError(...args) {
    scopeLogger.error(args.join(' '));
  }

  async function loadModules() {
    if (moduleLoadPromise) {
      return moduleLoadPromise;
    }

    moduleLoadPromise = (async () => {
      try {
        modules.storageModule = await import('../core/storage-service.js');
        modules.apiConnectionModule = await import('../api-connection.js');
        modules.presetManagerModule = await import('../preset-manager.js');
        modules.uiModule = await import('../ui/index.js');
        modules.regexExtractorModule = await import('../regex-extractor.js');
        modules.toolManagerModule = await import('../tool-manager.js');
        modules.toolExecutorModule = await import('../tool-executor.js');
        modules.windowManagerModule = await import('../window-manager.js');
        modules.toolRegistryModule = await import('../tool-registry.js');
        modules.settingsServiceModule = await import('../core/settings-service.js');
        modules.bypassManagerModule = await import('../bypass-manager.js');
        modules.variableResolverModule = await import('../variable-resolver.js');
        modules.contextInjectorModule = await import('../context-injector.js');
        modules.toolPromptServiceModule = await import('../tool-prompt-service.js');
        modules.toolOutputServiceModule = await import('../tool-output-service.js');
        modules.toolAutomationServiceModule = await import('../tool-automation-service.js');
        modules.toolDataProviderModule = await import('../core/tool-data-provider.js');
        modules.presetBootstrapModule = await import('../preset-bootstrap.js');
        modules.floatingBallModule = await import('../ui/floating-ball/index.js');

        // Provider 异步初始化（探测 Authority / Fallback），不阻塞模块加载
        try {
          modules.toolDataProviderModule.getToolDataProvider({ extensionVersion: SCRIPT_VERSION })
            .then((provider) => {
              scopeLogger.log(`Provider 就绪: ${provider.kind}`);
            })
            .catch((err) => {
              scopeLogger.error(`Provider 初始化异常: ${err?.message || err}`);
            });
        } catch (err) {
          scopeLogger.error(`Provider 启动异常: ${err?.message || err}`);
        }

        if (modules.toolOutputServiceModule?.toolOutputService && modules.apiConnectionModule) {
          modules.toolOutputServiceModule.toolOutputService.setApiConnection(modules.apiConnectionModule);
        }

        return true;
      } catch (error) {
        moduleLoadPromise = null;
        logError('模块加载失败，使用内置功能:', error);
        logError('已加载模块:', Object.keys(modules).filter((key) => modules[key]));
        return false;
      }
    })();

    return moduleLoadPromise;
  }



  function injectStyles() {
    const styleId = `${SCRIPT_ID}-styles`;
    const targetDoc = topLevelWindow.document || document;

    if (targetDoc.getElementById(styleId)) return;

    const style = targetDoc.createElement('style');
    style.id = styleId;
    style.textContent = mainCss;
    (targetDoc.head || targetDoc.documentElement).appendChild(style);

    log('样式已注入');
  }

  function injectComponentStyles() {
    const targetDoc = topLevelWindow.document || document;

    if (modules.uiModule?.getAllStyles) {
      const uiStyleId = `${SCRIPT_ID}-ui-styles`;
      if (!targetDoc.getElementById(uiStyleId)) {
        const uiStyle = targetDoc.createElement('style');
        uiStyle.id = uiStyleId;
        uiStyle.textContent = modules.uiModule.getAllStyles();
        (targetDoc.head || targetDoc.documentElement).appendChild(uiStyle);
      }
    }

  }

  async function applySavedTheme() {
    try {
      const { applyUiPreferences } = await import('../ui/components/settings-panel.js');
      if (modules.settingsServiceModule?.settingsService) {
        const uiSettings = modules.settingsServiceModule.settingsService.getUiSettings();
        if (uiSettings && uiSettings.theme) {
          const targetDoc = topLevelWindow.document || document;
          applyUiPreferences(uiSettings, targetDoc);
          log(`主题已应用: ${uiSettings.theme}`);
        }
      }
    } catch (themeError) {
      log('主题加载失败:', themeError);
    }
  }

  function addMenuItem() {
    const $ = topLevelWindow.jQuery || window.jQuery;

    if (!$) {
      logError('jQuery 未找到，延迟重试...');
      setTimeout(addMenuItem, 1000);
      return;
    }

    const parentDoc = topLevelWindow.document || document;
    const extensionsMenu = $('#extensionsMenu', parentDoc);

    if (!extensionsMenu.length) {
      log('魔棒菜单未找到，延迟重试...');
      setTimeout(addMenuItem, 2000);
      return;
    }

    const existingItem = $(`#${MENU_CONTAINER_ID}`, extensionsMenu);
    if (existingItem.length > 0) {
      log('菜单项已存在');
      return;
    }

    const $menuContainer = $(`<div class="extension_container interactable" id="${MENU_CONTAINER_ID}" tabindex="0"></div>`);
    const menuItemHtml = `
      <div class="list-group-item flex-container flexGap5 interactable" id="${MENU_ITEM_ID}" title="打开 YouYou 工具箱">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou 工具箱</span>
      </div>
    `;

    const $menuItem = $(menuItemHtml);

    $menuItem.on('click', function onMenuClick(event) {
      event.stopPropagation();
      log('菜单项被点击');

      const exMenuBtn = $('#extensionsMenuButton', parentDoc);
      if (exMenuBtn.length && extensionsMenu.is(':visible')) {
        exMenuBtn.trigger('click');
      }

      if (typeof options.openPopup === 'function') {
        options.openPopup();
      }
    });

    $menuContainer.append($menuItem);
    extensionsMenu.append($menuContainer);

    log('菜单项已添加到魔棒区');
  }

  async function init() {
    log(`初始化开始... 版本: ${SCRIPT_VERSION}`);

    await injectStyles();

    const modulesLoaded = await loadModules();
    if (modulesLoaded) {
      log('所有模块加载成功');
    } else {
      log('部分模块加载失败，使用可用功能');
    }

    if (!uiInitialized && modules.uiModule?.initUI) {
      try {
        await modules.uiModule.initUI({
          services: modules,
          autoInjectStyles: false,
          targetDocument: topLevelWindow.document || document
        });
        uiInitialized = true;
        log('UI 装配中心已初始化');
      } catch (uiError) {
        logError('UI 模块初始化失败:', uiError);
      }
    }

    if (modules.uiModule) {
      injectComponentStyles();
      await applySavedTheme();
    }

    // 议题 #45 Stage 2：注册内置预设 + 一次性存量迁移（必须在自动化服务前）
    if (modules.presetBootstrapModule?.ensurePresetSystem) {
      try {
        const result = modules.presetBootstrapModule.ensurePresetSystem();
        if (result?.aborted) {
          log(`预设系统迁移失败已 abort，老字段保留: ${result.error}`);
        } else if (result?.skipped) {
          log(`预设系统已就绪（${result.reason}）`);
        } else {
          log(`预设系统迁移完成（${result.migratedCount}/${result.total} 工具）`);
        }
      } catch (err) {
        logError('预设系统初始化异常:', err);
      }
    }

    if (modules.toolAutomationServiceModule?.toolAutomationService) {
      const initialized = modules.toolAutomationServiceModule.toolAutomationService.init();
      log(initialized ? '自动化生命周期服务已初始化' : '自动化生命周期服务初始化未完成，等待宿主事件源重试');
    }

    const targetDoc = topLevelWindow.document || document;
    if (targetDoc.readyState === 'loading') {
      targetDoc.addEventListener('DOMContentLoaded', () => {
        setTimeout(addMenuItem, 1000);
      });
    } else {
      setTimeout(addMenuItem, 1000);
    }

    if (modules.floatingBallModule?.floatingBall) {
      try {
        modules.floatingBallModule.floatingBall.init({
          targetDocument: topLevelWindow.document || document,
          targetWindow: topLevelWindow || window,
          openPopup: options.openPopup,
        });
      } catch (fbError) {
        logError('浮球初始化失败:', fbError);
      }
    }

    log('初始化完成');
  }

  return {
    loadModules,
    injectStyles,
    addMenuItem,
    init,
    log,
    logError
  };
}

export default createBootstrap;