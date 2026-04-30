/**
 * YouYou Toolkit - 弹窗壳与标签路由模块
 * @description 负责主弹窗、主/子标签切换以及内容装配
 */

import { eventBus, EVENTS } from '../core/event-bus.js';
import { destroyEnhancedCustomSelects, enhanceNativeSelects } from '../ui/utils.js';
import { PromptEditor, DEFAULT_PROMPT_SEGMENTS, messagesToSegments, segmentsToMessages, getPromptEditorStyles } from '../prompt-editor.js';

export function createPopupShell(context) {
  const { constants, topLevelWindow, modules, caches, uiState } = context;
  const { SCRIPT_ID, SCRIPT_VERSION, POPUP_ID } = constants;
  const popupDragState = {
    cleanup: null
  };
  const popupEventState = {
    cleanups: []
  };
  const scrollSurfaceState = {
    cleanups: []
  };
  const panelHostState = {
    current: null
  };

  function isSidebarCollapsed() {
    return Boolean(uiState.sidebarCollapsed);
  }

  function toggleSidebar() {
    uiState.sidebarCollapsed = !uiState.sidebarCollapsed;

    const popup = uiState.currentPopup;
    if (!popup) return;

    const sidebar = popup.querySelector('.yyt-shell-sidebar');
    const workspace = popup.querySelector('.yyt-shell-workspace');
    const toggleBtn = popup.querySelector('.yyt-sidebar-toggle i');

    if (sidebar) {
      sidebar.classList.toggle('yyt-collapsed', uiState.sidebarCollapsed);
    }
    if (workspace) {
      workspace.classList.toggle('yyt-sidebar-collapsed', uiState.sidebarCollapsed);
    }
    if (toggleBtn) {
      toggleBtn.className = uiState.sidebarCollapsed
        ? 'fa-solid fa-angles-right'
        : 'fa-solid fa-angles-left';
    }

    refreshScrollableSurfaces();
  }

  function log(...args) {
    console.log(`[${SCRIPT_ID}]`, ...args);
  }

  function logError(...args) {
    console.error(`[${SCRIPT_ID}]`, ...args);
  }

  function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getJQuery() {
    return topLevelWindow.jQuery || window.jQuery;
  }

  function getTargetDocument() {
    return topLevelWindow.document || document;
  }


  function getTabDisplayName(tabId) {
    if (!tabId) return '未选择页面';

    const mainConfig = modules.toolRegistryModule?.getToolConfig(tabId);
    if (!mainConfig) {
      return tabId;
    }

    if (!mainConfig.hasSubTabs) {
      return mainConfig.name || tabId;
    }

    const activeSubTabId = resolveActiveSubTabId(tabId);
    const subConfig = mainConfig.subTabs?.find(item => item.id === activeSubTabId);

    if (subConfig?.name) {
      return `${mainConfig.name} / ${subConfig.name}`;
    }

    return mainConfig.name || tabId;
  }

  function getTabDescription(tabId) {
    if (!tabId) return '请选择左侧导航中的页面进行配置或排查。';

    const mainConfig = modules.toolRegistryModule?.getToolConfig(tabId);
    if (!mainConfig) {
      return '当前页面描述暂不可用。';
    }

    if (!mainConfig.hasSubTabs) {
      return mainConfig.description || '在这里管理当前页面的配置和操作。';
    }

    const activeSubTabId = resolveActiveSubTabId(tabId);
    const subConfig = mainConfig.subTabs?.find(item => item.id === activeSubTabId);
    return subConfig?.description || mainConfig.description || '在这里管理当前工具的模板、配置与调试能力。';
  }

  function resolveActiveSubTabId(mainTab, preferredSubTab = '') {
    const mainConfig = modules.toolRegistryModule?.getToolConfig(mainTab);
    if (!mainConfig?.hasSubTabs || !Array.isArray(mainConfig.subTabs) || mainConfig.subTabs.length === 0) {
      return '';
    }

    const requestedSubTab = String(preferredSubTab || uiState.currentSubTab[mainTab] || '').trim();
    const hasRequestedSubTab = requestedSubTab && mainConfig.subTabs.some(item => item?.id === requestedSubTab);
    const nextSubTab = hasRequestedSubTab ? requestedSubTab : (mainConfig.subTabs[0]?.id || '');

    if (nextSubTab && uiState.currentSubTab[mainTab] !== nextSubTab) {
      uiState.currentSubTab[mainTab] = nextSubTab;
    }

    return nextSubTab;
  }

  function updatePopupStatus() {
    const popup = uiState.currentPopup;
    if (!popup) return;

    const displayName = getTabDisplayName(uiState.currentMainTab);
    const description = getTabDescription(uiState.currentMainTab);

    const label = popup.querySelector('.yyt-popup-active-label');
    if (label) {
      label.textContent = `当前：${displayName}`;
    }

    const breadcrumb = popup.querySelector('.yyt-shell-breadcrumb');
    if (breadcrumb) {
      breadcrumb.textContent = displayName;
    }

    const title = popup.querySelector('.yyt-shell-main-title');
    if (title) {
      title.textContent = displayName;
    }

    const summary = popup.querySelector('.yyt-shell-main-description');
    if (summary) {
      summary.textContent = description;
    }
  }

  function cleanupPopupDrag() {
    if (typeof popupDragState.cleanup === 'function') {
      popupDragState.cleanup();
      popupDragState.cleanup = null;
    }
  }

  function cleanupPopupEvents() {
    if (!Array.isArray(popupEventState.cleanups)) return;

    popupEventState.cleanups.forEach((cleanup) => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    });

    popupEventState.cleanups = [];
  }

  function cleanupScrollableSurfaces() {
    if (!Array.isArray(scrollSurfaceState.cleanups)) return;

    scrollSurfaceState.cleanups.forEach((cleanup) => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    });

    scrollSurfaceState.cleanups = [];
  }

  function sameHostContainer(left, right) {
    if (!left || !right) return false;

    const leftElement = left.jquery ? left[0] : left;
    const rightElement = right.jquery ? right[0] : right;
    return Boolean(leftElement && rightElement && leftElement === rightElement);
  }

  function destroyActivePanelHost(options = {}) {
    const { container = null } = options;
    const activeHost = panelHostState.current;
    if (!activeHost) {
      return;
    }

    if (container && !sameHostContainer(activeHost.container, container)) {
      return;
    }

    try {
      if (typeof activeHost.destroy === 'function') {
        activeHost.destroy(activeHost.container);
      }
    } catch (error) {
      logError('销毁动态面板 host 失败', error);
    }

    if (modules.uiModule?.uiManager?.destroyContainerInstance) {
      modules.uiModule.uiManager.destroyContainerInstance(activeHost.container);
    }

    panelHostState.current = null;
  }

  function registerActivePanelHost(container, host = {}) {
    panelHostState.current = {
      key: host.key || '',
      container,
      destroy: typeof host.destroy === 'function' ? host.destroy : null
    };
  }

  function refreshMainNavigation() {
    const $ = getJQuery();
    if (!$ || !uiState.currentPopup) return;

    const tools = modules.toolRegistryModule?.getToolList() || [];
    const $mainNav = $(uiState.currentPopup).find('.yyt-main-nav');
    if (!$mainNav.length) return;

    const mainNavHtml = tools.map(tool => `
      <div class="yyt-main-nav-item ${tool.id === uiState.currentMainTab ? 'active' : ''}" data-tab="${tool.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${escapeHtml(tool.icon || 'fa-file')}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${escapeHtml(tool.name || tool.id)}</span>
          <span class="yyt-main-nav-desc">${escapeHtml(tool.description || '进入此页面进行配置、查看或维护。')}</span>
        </div>
      </div>
    `).join('');

    $mainNav.html(mainNavHtml);
    $(uiState.currentPopup).find('.yyt-main-nav-item').on('click', function onMainTabClick() {
      const tab = $(this).data('tab');
      if (tab) {
        switchMainTab(tab);
      }
    });

    const $sidebarHint = $(uiState.currentPopup).find('.yyt-shell-sidebar-hint');
    if ($sidebarHint.length) {
      $sidebarHint.text(`${tools.length} tabs`);
    }
  }

  function refreshPopupMetrics() {
    const $ = getJQuery();
    if (!$ || !uiState.currentPopup) return;

    const tools = modules.toolRegistryModule?.getToolList() || [];
    const toolsRootConfig = modules.toolRegistryModule?.getToolConfig('tools');
    const toolSubTabs = Array.isArray(toolsRootConfig?.subTabs) ? toolsRootConfig.subTabs : [];
    const customToolCount = toolSubTabs.filter(tab => tab?.isCustom).length;
    const defaultToolCount = toolSubTabs.filter(tab => !tab?.isCustom).length;

    const $popup = $(uiState.currentPopup);
    const $stats = $popup.find('.yyt-shell-sidebar-stats');
    if ($stats.length) {
      $stats.find('.yyt-shell-sidebar-stat').eq(0).find('.yyt-shell-sidebar-stat-value').text(String(tools.length));
      $stats.find('.yyt-shell-sidebar-stat').eq(1).find('.yyt-shell-sidebar-stat-value').text(String(defaultToolCount));
      $stats.find('.yyt-shell-sidebar-stat').eq(2).find('.yyt-shell-sidebar-stat-value').text(String(customToolCount));
    }
  }

  function ensureActiveMainTabStillExists() {
    const tools = modules.toolRegistryModule?.getToolList() || [];
    if (!tools.length) return null;

    if (!tools.some(tool => tool.id === uiState.currentMainTab)) {
      uiState.currentMainTab = tools[0].id;
    }

    return uiState.currentMainTab;
  }

  async function refreshCurrentPanel(options = {}) {
    const { rebuildNavigation = false, reRenderSubNav = false } = options;
    const $ = getJQuery();
    if (!$ || !uiState.currentPopup) return;

    destroyActivePanelHost();

    const activeMainTab = ensureActiveMainTabStillExists();
    if (!activeMainTab) return;

    if (rebuildNavigation) {
      refreshMainNavigation();
      refreshPopupMetrics();
    }

    const toolConfig = modules.toolRegistryModule?.getToolConfig(activeMainTab);
    const hasSubTabs = Boolean(toolConfig?.hasSubTabs);
    const $subNav = $(uiState.currentPopup).find('.yyt-sub-nav');
    const $content = $(uiState.currentPopup).find('.yyt-content-inner');

    if (rebuildNavigation && $content.length) {
      const knownTabs = new Set($content.find('.yyt-tab-content').map((_, el) => $(el).data('tab')).get());
      (modules.toolRegistryModule?.getToolList() || []).forEach((tool) => {
        if (!knownTabs.has(tool.id)) {
          $content.append(`<div class="yyt-tab-content" data-tab="${escapeHtml(tool.id)}"></div>`);
        }
      });
      $content.find('.yyt-tab-content').each((_, el) => {
        const tabId = $(el).data('tab');
        if (!(modules.toolRegistryModule?.getToolList() || []).some(tool => tool.id === tabId)) {
          $(el).remove();
        }
      });
    }

    $(uiState.currentPopup).find('.yyt-main-nav-item').removeClass('active');
    $(uiState.currentPopup).find(`.yyt-main-nav-item[data-tab="${activeMainTab}"]`).addClass('active');
    $(uiState.currentPopup).find('.yyt-tab-content').removeClass('active');
    $(uiState.currentPopup).find(`.yyt-tab-content[data-tab="${activeMainTab}"]`).addClass('active');

    if (hasSubTabs) {
      $subNav.show();
      if (reRenderSubNav || rebuildNavigation) {
        renderSubNav(activeMainTab, toolConfig.subTabs);
      }
    } else {
      $subNav.hide();
    }

    await renderTabContent(activeMainTab);
    updatePopupStatus();
    refreshScrollableSurfaces();
  }

  function bindPopupEvents() {
    if (!uiState.currentPopup) return;

    cleanupPopupEvents();

    const refreshCurrentPresetPanel = () => {
      if (uiState.currentMainTab === 'apiPresets') {
        void refreshCurrentPanel();
        return;
      }

      if (uiState.currentMainTab === 'tools') {
        void refreshCurrentPanel({ reRenderSubNav: true });
      }
    };

    const refreshToolsPanel = () => {
      if (uiState.currentMainTab === 'tools') {
        void refreshCurrentPanel({ rebuildNavigation: true, reRenderSubNav: true });
      } else {
        refreshPopupMetrics();
      }
    };

    const refreshToolRuntimePanel = () => {
      if (uiState.currentMainTab === 'tools') {
        void refreshCurrentPanel({ rebuildNavigation: false, reRenderSubNav: false });
      }
    };

    const refreshBypassPanel = () => {
      if (uiState.currentMainTab === 'bypass' || uiState.currentMainTab === 'tools') {
        void refreshCurrentPanel({ reRenderSubNav: uiState.currentMainTab === 'tools' });
      }
    };

    [
      EVENTS.PRESET_CREATED,
      EVENTS.PRESET_UPDATED,
      EVENTS.PRESET_DELETED
    ].forEach((eventName) => {
      popupEventState.cleanups.push(eventBus.on(eventName, refreshCurrentPresetPanel));
    });

    [
      EVENTS.TOOL_REGISTERED,
      EVENTS.TOOL_UPDATED,
      EVENTS.TOOL_UNREGISTERED
    ].forEach((eventName) => {
      popupEventState.cleanups.push(eventBus.on(eventName, refreshToolsPanel));
    });

    popupEventState.cleanups.push(eventBus.on(EVENTS.TOOL_RUNTIME_UPDATED, refreshToolRuntimePanel));

    [
      EVENTS.BYPASS_PRESET_CREATED,
      EVENTS.BYPASS_PRESET_UPDATED,
      EVENTS.BYPASS_PRESET_DELETED
    ].forEach((eventName) => {
      popupEventState.cleanups.push(eventBus.on(eventName, refreshBypassPanel));
    });
  }

  function isInteractiveScrollTarget(target) {
    return Boolean(target?.closest?.([
      'input',
      'textarea',
      'select',
      'button',
      'a',
      'label',
      'summary',
      'details',
      '[contenteditable="true"]',
      '.yyt-dialog',
      '.yyt-select-dropdown',
      '.yyt-select-portal-layer'
    ].join(',')));
  }

  function shouldPreserveWheelTarget(target) {
    const scrollableInner = target?.closest?.([
      'textarea',
      '.yyt-preview-pre',
      '.yyt-select-dropdown',
      '.yyt-select-portal-layer',
      '.yyt-dialog-body',
      '.yyt-worldbook-list',
      '.yyt-tool-panel',
      '.yyt-panel-section'
    ].join(','));

    if (!scrollableInner) {
      return false;
    }

    return scrollableInner.scrollHeight > scrollableInner.clientHeight + 2
      || scrollableInner.scrollWidth > scrollableInner.clientWidth + 2;
  }

  function isNearestScrollableSurface(container, target) {
    return target?.closest?.('.yyt-scrollable-surface') === container;
  }

  function getPreferredWheelContainer(rootContainer, target) {
    if (!rootContainer || !target) return null;

    const nativeScrollable = target.closest?.([
      '.yyt-worldbook-list',
      '.yyt-select-dropdown',
      '.yyt-select-portal-layer',
      '.yyt-dialog-body',
      '.yyt-preview-pre',
      '.yyt-tool-panel',
      '.yyt-panel-section'
    ].join(','));

    if (nativeScrollable
      && (nativeScrollable.classList?.contains('yyt-select-portal-layer') || rootContainer.contains(nativeScrollable))
      && (nativeScrollable.scrollHeight > nativeScrollable.clientHeight + 2
        || nativeScrollable.scrollWidth > nativeScrollable.clientWidth + 2)) {
      return nativeScrollable;
    }

    const candidates = [
      target.closest?.('.yyt-tool-list'),
      target.closest?.('.yyt-settings-content'),
      target.closest?.('.yyt-sub-content'),
      target.closest?.('.yyt-tab-content.active'),
      rootContainer
    ].filter(Boolean);

    return candidates.find((candidate) => {
      if (candidate !== rootContainer && !rootContainer.contains(candidate)) {
        return false;
      }

      return candidate.scrollHeight > candidate.clientHeight + 2
        || candidate.scrollWidth > candidate.clientWidth + 2;
    }) || rootContainer;
  }

  function resetPopupScrollState({ mainTab = null, includeSubContent = false } = {}) {
    const popup = uiState.currentPopup;
    if (!popup) return;

    const content = popup.querySelector('.yyt-content');
    if (content) {
      content.scrollTop = 0;
      content.scrollLeft = 0;
    }

    const tabSelector = mainTab
      ? `.yyt-tab-content[data-tab="${mainTab}"]`
      : '.yyt-tab-content.active';
    const activeTab = popup.querySelector(tabSelector);
    if (activeTab) {
      activeTab.scrollTop = 0;
      activeTab.scrollLeft = 0;
    }

    if (!includeSubContent) {
      return;
    }

    const subContainers = activeTab?.querySelectorAll('.yyt-sub-content') || [];
    subContainers.forEach((container) => {
      container.scrollTop = 0;
      container.scrollLeft = 0;
    });
  }

  function bindDragScroll(container) {
    const targetDoc = getTargetDocument();
    if (!container || !targetDoc) return;

    container.classList.add('yyt-scrollable-surface');

    let isPointerDown = false;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let startScrollTop = 0;
    let canScrollX = false;
    let canScrollY = false;

    const stopDragging = () => {
      isPointerDown = false;
      isDragging = false;
      container.classList.remove('yyt-scroll-dragging');
    };

    const onMouseDown = (event) => {
      if (event.button !== 0) return;
      if (isInteractiveScrollTarget(event.target)) return;
      if (!isNearestScrollableSurface(container, event.target)) return;

      canScrollX = container.scrollWidth > container.clientWidth + 2;
      canScrollY = container.scrollHeight > container.clientHeight + 2;

      if (!canScrollX && !canScrollY) {
        return;
      }

      event.stopPropagation();

      isPointerDown = true;
      isDragging = false;
      startX = event.clientX;
      startY = event.clientY;
      startScrollLeft = container.scrollLeft;
      startScrollTop = container.scrollTop;
    };

    const onMouseMove = (event) => {
      if (!isPointerDown) return;

      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const movedEnough = Math.abs(dx) > 4 || Math.abs(dy) > 4;

      if (!movedEnough && !isDragging) {
        return;
      }

      isDragging = true;
      container.classList.add('yyt-scroll-dragging');

      if (canScrollX) {
        container.scrollLeft = startScrollLeft - dx;
      }

      if (canScrollY) {
        container.scrollTop = startScrollTop - dy;
      }

      event.preventDefault();
    };

    const onMouseUp = () => {
      stopDragging();
    };

    const onWheel = (event) => {
      if (event.ctrlKey) return;
      if (shouldPreserveWheelTarget(event.target)) return;

      const isRootContentSurface = container.classList.contains('yyt-content');
      if (!isRootContentSurface && !isNearestScrollableSurface(container, event.target)) {
        return;
      }

      const wheelContainer = getPreferredWheelContainer(container, event.target);

      if (!wheelContainer) {
        return;
      }

      if (wheelContainer !== container && !container.contains(wheelContainer)) {
        return;
      }

      const hasScrollableOverflow = wheelContainer.scrollHeight > wheelContainer.clientHeight + 2
        || wheelContainer.scrollWidth > wheelContainer.clientWidth + 2;

      if (!hasScrollableOverflow) {
        return;
      }

      if (Math.abs(event.deltaY) > 0) {
        wheelContainer.scrollTop += event.deltaY;
      }

      if (Math.abs(event.deltaX) > 0) {
        wheelContainer.scrollLeft += event.deltaX;
      }

      event.preventDefault();
      event.stopPropagation();
    };

    const onDragStart = (event) => {
      if (isDragging) {
        event.preventDefault();
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('dragstart', onDragStart);
    targetDoc.addEventListener('mousemove', onMouseMove);
    targetDoc.addEventListener('mouseup', onMouseUp);

    scrollSurfaceState.cleanups.push(() => {
      stopDragging();
      container.classList.remove('yyt-scrollable-surface');
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('dragstart', onDragStart);
      targetDoc.removeEventListener('mousemove', onMouseMove);
      targetDoc.removeEventListener('mouseup', onMouseUp);
    });
  }

  function refreshScrollableSurfaces() {
    const popup = uiState.currentPopup;
    if (!popup) return;

    cleanupScrollableSurfaces();

    const surfaces = [
      ...popup.querySelectorAll('.yyt-shell-sidebar .yyt-main-nav'),
      ...popup.querySelectorAll('.yyt-sub-nav'),
      ...popup.querySelectorAll('.yyt-content'),
      ...popup.querySelectorAll('.yyt-settings-content'),
      ...popup.querySelectorAll('.yyt-tool-list')
    ];

    [...new Set(surfaces)].forEach(bindDragScroll);
  }

  function getStartupScreenHtml(tools) {
    const primaryModules = (tools || []).slice(0, 6).map(tool => `
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${escapeHtml(tool.icon || 'fa-file')}"></i>
        <span>${escapeHtml(tool.name || tool.id)}</span>
      </div>
    `).join('');

    return `
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou 工具箱</div>
          <div class="yyt-startup-screen-desc">集中管理 API 预设、自定义工具、提取规则、Ai指令预设与诊断流程。每次刷新后都会重新显示，便于快速回到介绍入口。</div>
          <div class="yyt-startup-screen-modules">
            ${primaryModules}
          </div>
          <div class="yyt-startup-screen-status">
            <i class="fa-solid fa-sparkles"></i>
            <span>工作台已准备就绪，后续打开将直接进入主界面。</span>
          </div>
          <button type="button" class="yyt-btn yyt-btn-primary yyt-startup-enter">
            <i class="fa-solid fa-arrow-right"></i>
            <span>进入工具箱</span>
          </button>
        </div>
      </div>
    `;
  }

  function bindStartupScreen(tools) {
    const $ = getJQuery();
    if (!$ || !uiState.currentPopup || uiState.startupScreenDismissed) {
      return;
    }

    const $body = $(uiState.currentPopup).find('.yyt-popup-body');
    const $shell = $body.find('.yyt-popup-shell');
    if (!$body.length || !$shell.length || $body.find('[data-yyt-startup-screen]').length) {
      return;
    }

    $shell.attr('data-yyt-startup-visible', 'true');
    $body.prepend(getStartupScreenHtml(tools));
    $body.find('.yyt-startup-enter').on('click', () => {
      $body.find('[data-yyt-startup-screen]').remove();
      $shell.removeAttr('data-yyt-startup-visible');
      uiState.startupScreenDismissed = true;
      refreshScrollableSurfaces();
    });
  }

  function enablePopupDrag() {
    const targetDoc = getTargetDocument();
    const popup = uiState.currentPopup;
    const header = popup?.querySelector('.yyt-popup-header');

    if (!popup || !header || !targetDoc) {
      return;
    }

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let popupStartLeft = 0;
    let popupStartTop = 0;
    let previousUserSelect = '';

    const getViewport = () => ({
      width: topLevelWindow.innerWidth || targetDoc.documentElement?.clientWidth || window.innerWidth || 0,
      height: topLevelWindow.innerHeight || targetDoc.documentElement?.clientHeight || window.innerHeight || 0
    });

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const stopDragging = () => {
      if (!isDragging) return;
      isDragging = false;
      popup.classList.remove('yyt-popup-dragging');
      targetDoc.body.style.userSelect = previousUserSelect;
    };

    const onMouseMove = (event) => {
      if (!isDragging || !uiState.currentPopup) return;

      const dx = event.clientX - dragStartX;
      const dy = event.clientY - dragStartY;
      const { width, height } = getViewport();
      const popupWidth = popup.offsetWidth || 0;
      const popupHeight = popup.offsetHeight || 0;
      const maxLeft = Math.max(0, width - popupWidth);
      const maxTop = Math.max(0, height - popupHeight);

      popup.style.left = `${clamp(popupStartLeft + dx, 0, maxLeft)}px`;
      popup.style.top = `${clamp(popupStartTop + dy, 0, maxTop)}px`;
      popup.style.transform = 'none';
      popup.style.right = 'auto';
      popup.style.bottom = 'auto';
    };

    const onMouseUp = () => {
      stopDragging();
    };

    const onMouseDown = (event) => {
      if (event.button !== 0) return;
      if (event.target?.closest('.yyt-popup-close')) return;

      isDragging = true;
      dragStartX = event.clientX;
      dragStartY = event.clientY;

      const rect = popup.getBoundingClientRect();
      popupStartLeft = rect.left;
      popupStartTop = rect.top;

      popup.style.left = `${rect.left}px`;
      popup.style.top = `${rect.top}px`;
      popup.style.transform = 'none';
      popup.style.right = 'auto';
      popup.style.bottom = 'auto';
      popup.classList.add('yyt-popup-dragging');

      previousUserSelect = targetDoc.body.style.userSelect || '';
      targetDoc.body.style.userSelect = 'none';
      event.preventDefault();
    };

    header.addEventListener('mousedown', onMouseDown);
    targetDoc.addEventListener('mousemove', onMouseMove);
    targetDoc.addEventListener('mouseup', onMouseUp);

    popupDragState.cleanup = () => {
      stopDragging();
      header.removeEventListener('mousedown', onMouseDown);
      targetDoc.removeEventListener('mousemove', onMouseMove);
      targetDoc.removeEventListener('mouseup', onMouseUp);
    };
  }

  function closePopup() {
    destroyActivePanelHost();
    cleanupPopupDrag();
    cleanupPopupEvents();
    cleanupScrollableSurfaces();

    const $ = getJQuery();
    if ($ && uiState.currentPopup) {
      const $popup = $(uiState.currentPopup);
      destroyEnhancedCustomSelects($popup, 'yytPopupToolConfigSelect');
      destroyEnhancedCustomSelects($popup, 'yytPromptEditorSelect');
    }

    if (uiState.currentPopup) {
      uiState.currentPopup.remove();
      uiState.currentPopup = null;
    }

    if (uiState.currentOverlay) {
      uiState.currentOverlay.remove();
      uiState.currentOverlay = null;
    }

    log('弹窗已关闭');
  }

  function switchMainTab(tabName) {
    destroyActivePanelHost();
    uiState.currentMainTab = tabName;

    const $ = getJQuery();
    if (!$ || !uiState.currentPopup) return;

    resetPopupScrollState({ mainTab: tabName, includeSubContent: true });

    $(uiState.currentPopup).find('.yyt-main-nav-item').removeClass('active');
    $(uiState.currentPopup).find(`.yyt-main-nav-item[data-tab="${tabName}"]`).addClass('active');

    const toolConfig = modules.toolRegistryModule?.getToolConfig(tabName);
    if (toolConfig?.hasSubTabs) {
      $(uiState.currentPopup).find('.yyt-sub-nav').show();
      renderSubNav(tabName, toolConfig.subTabs);
    } else {
      $(uiState.currentPopup).find('.yyt-sub-nav').hide();
    }

    $(uiState.currentPopup).find('.yyt-tab-content').removeClass('active');
    $(uiState.currentPopup).find(`.yyt-tab-content[data-tab="${tabName}"]`).addClass('active');

    void renderTabContent(tabName);
    updatePopupStatus();
    refreshScrollableSurfaces();
  }

  function switchSubTab(mainTab, subTab) {
    destroyActivePanelHost();
    uiState.currentSubTab[mainTab] = subTab;

    const $ = getJQuery();
    if (!$ || !uiState.currentPopup) return;

    resetPopupScrollState({ mainTab, includeSubContent: true });

    $(uiState.currentPopup).find('.yyt-sub-nav-item').removeClass('active');
    $(uiState.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${subTab}"]`).addClass('active');

    void renderSubTabContent(mainTab, subTab);
    updatePopupStatus();
    refreshScrollableSurfaces();
  }

  function renderSubNav(mainTab, subTabs) {
    const $ = getJQuery();
    if (!$ || !uiState.currentPopup || !subTabs) return;

    const currentSub = resolveActiveSubTabId(mainTab, uiState.currentSubTab[mainTab] || subTabs[0]?.id);
    const groups = mainTab === 'tools'
      ? [
          {
            key: 'ai',
            title: 'AI 工具',
            items: subTabs.filter(tab => (tab?.toolKind || 'ai') !== 'script')
          },
          {
            key: 'script',
            title: '脚本工具',
            items: subTabs.filter(tab => tab?.toolKind === 'script')
          }
        ].filter(group => group.items.length > 0)
      : [
          {
            key: 'default',
            title: '',
            items: subTabs
          }
        ];

    const subNavHtml = groups.map(group => {
      const titleHtml = group.title
        ? `<div class="yyt-sub-nav-group-title">${escapeHtml(group.title)}</div>`
        : '';
      const itemsHtml = group.items.map(tab => `
        <div class="yyt-sub-nav-item ${tab.id === currentSub ? 'active' : ''}" data-subtab="${tab.id}">
          <i class="fa-solid ${tab.icon || 'fa-file'}"></i>
          <span>${escapeHtml(tab.name || tab.id)}</span>
        </div>
      `).join('');

      return `
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${group.key}">
          ${titleHtml}
          <div class="yyt-sub-nav-group-items">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('');

    $(uiState.currentPopup).find('.yyt-sub-nav').html(subNavHtml);
    $(uiState.currentPopup).find('.yyt-sub-nav-item').on('click', function onSubTabClick() {
      const subTab = $(this).data('subtab');
      switchSubTab(mainTab, subTab);
    });

    refreshScrollableSurfaces();
  }

  async function renderTabContent(tabName) {
    const $ = getJQuery();
    if (!$ || !uiState.currentPopup) return;

    const $content = $(uiState.currentPopup).find(`.yyt-tab-content[data-tab="${tabName}"]`);
    if (!$content.length) return;

    const toolConfig = modules.toolRegistryModule?.getToolConfig(tabName);

    // tools 页走 sub-tab 路由
    if (tabName === 'tools') {
      const activeSubTab = resolveActiveSubTabId(tabName);
      if (toolConfig?.hasSubTabs && activeSubTab) {
        await renderSubTabContent(tabName, activeSubTab);
      } else {
        $content.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>工具配置加载失败</span></div>');
      }
      refreshScrollableSurfaces();
      return;
    }

    // 查主 tab 路由表
    const handled = modules.uiModule?.renderMainTab?.(tabName, $content);
    if (!handled) {
      // 未注册在路由表中的 tab → 通用工具窗口
      renderToolWindow(tabName, $content);
    }

    refreshScrollableSurfaces();
  }

  async function renderSubTabContent(mainTab, subTab) {
    const $ = getJQuery();
    if (!$ || !uiState.currentPopup) return;

    const $mainContent = $(uiState.currentPopup).find(`.yyt-tab-content[data-tab="${mainTab}"]`);
    if (!$mainContent.length) return;

    const mainToolConfig = modules.toolRegistryModule?.getToolConfig(mainTab);
    if (mainToolConfig?.hasSubTabs) {
      const activeSubTab = resolveActiveSubTabId(mainTab, subTab);
      const subToolConfig = mainToolConfig.subTabs?.find(st => st.id === activeSubTab);
      let $subContent = $mainContent.find('.yyt-sub-content');
      if (!$subContent.length) {
        $mainContent.html('<div class="yyt-sub-content"></div>');
        $subContent = $mainContent.find('.yyt-sub-content');
      }

      if (!subToolConfig) {
        $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>当前子页面不存在或已失效</span></div>');
        resetPopupScrollState({ mainTab, includeSubContent: true });
        refreshScrollableSurfaces();
        return;
      }

      const componentName = subToolConfig.component;

      // GenericToolConfigPanel 由 panel factory 动态创建
      if (componentName === 'GenericToolConfigPanel') {
        await renderGenericToolConfigPanel(subToolConfig, $subContent);
        resetPopupScrollState({ mainTab, includeSubContent: true });
        refreshScrollableSurfaces();
        return;
      }

      // 查子 tab 路由表
      destroyActivePanelHost({ container: $subContent });
      const hostKey = modules.uiModule?.renderSubTabComponent?.(componentName, $subContent);

      if (hostKey) {
        registerActivePanelHost($subContent, { key: hostKey });
      } else {
        $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>功能开发中...</span></div>');
      }
      resetPopupScrollState({ mainTab, includeSubContent: true });
      refreshScrollableSurfaces();
      return;
    }

    const $content = $mainContent.find('.yyt-sub-content');
    if (!$content.length) return;

    destroyActivePanelHost({ container: $content });

    switch (subTab) {
      case 'config':
        renderToolConfig(mainTab, $content);
        break;
      case 'prompts':
        await renderPromptEditor(mainTab, $content);
        break;
      case 'presets':
        renderToolPresets(mainTab, $content);
        break;
      default:
        $content.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>功能开发中...</span></div>');
    }

    resetPopupScrollState({ mainTab, includeSubContent: true });
    refreshScrollableSurfaces();
  }

  async function renderGenericToolConfigPanel(subToolConfig, $container) {
    const $ = getJQuery();
    if (!$ || !$container?.length || !subToolConfig?.id) return;

    destroyActivePanelHost({ container: $container });

    try {
      let createPanel = caches.dynamicToolPanelCache.get(subToolConfig.id);

      if (!createPanel) {
        const module = await import('../ui/components/tool-config-panel-factory.js');
        const createToolConfigPanel = module?.createToolConfigPanel;

        if (typeof createToolConfigPanel !== 'function') {
          throw new Error('通用工具面板工厂不可用');
        }

        createPanel = () => createToolConfigPanel({
          id: `${subToolConfig.id}Panel`,
          toolId: subToolConfig.id,
          postResponseHint: `点击”立即执行一次”后，调用额外模型执行”${subToolConfig.name || subToolConfig.id}”。`,
          extractionPlaceholder: '每行一个标签，如 custom_tag\n或 regex:<custom_tag>([\\s\\S]*?)</custom_tag>',
          previewDialogId: `${subToolConfig.id}-extraction-preview`,
          previewTitle: `${subToolConfig.name || subToolConfig.id} 提取预览`
        });

        caches.dynamicToolPanelCache.set(subToolConfig.id, createPanel);
      }

      const panel = createPanel();
      panel.renderTo($container);
      registerActivePanelHost($container, {
        key: subToolConfig.id,
        destroy: typeof panel?.destroy === 'function'
          ? ($hostContainer) => panel.destroy($hostContainer)
          : null
      });
      refreshScrollableSurfaces();
    } catch (error) {
      panelHostState.current = null;
      console.error(`[${SCRIPT_ID}] 自定义工具面板加载失败:`, error);
      $container.html('<div class=”yyt-empty-state-small”><i class=”fa-solid fa-exclamation-triangle”></i><span>自定义工具面板加载失败</span></div>');
    }
  }

  function renderToolWindow(toolId, $container) {
    const $ = getJQuery();
    if (!$) return;

    const toolConfig = modules.toolRegistryModule?.getToolConfig(toolId);
    if (!toolConfig) {
      $container.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>工具配置不存在</span></div>');
      return;
    }

    const currentSub = uiState.currentSubTab[toolId] || toolConfig.subTabs?.[0]?.id || 'config';

    $container.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${currentSub}">
          <!-- 子内容将在此渲染 -->
        </div>
      </div>
    `);

    void renderSubTabContent(toolId, currentSub);
  }

  function renderToolConfig(toolId, $container) {
    const $ = getJQuery();
    if (!$) return;

    const tool = modules.toolManagerModule?.getTool(toolId);
    const apiPresets = modules.presetManagerModule?.getAllPresets() || [];
    const boundPreset = modules.toolRegistryModule?.getToolApiPreset(toolId) || '';

    const presetOptions = apiPresets.map(p =>
      `<option value="${escapeHtml(p.name)}" ${p.name === boundPreset ? 'selected' : ''}>${escapeHtml(p.name)}</option>`
    ).join('');

    $container.html(`
      <div class="yyt-panel">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-plug"></i>
            <span>API预设绑定</span>
          </div>
          <div class="yyt-form-group">
            <label>选择API预设</label>
            <select class="yyt-select" id="yyt-tool-api-preset">
              <option value="">使用当前配置</option>
              ${presetOptions}
            </select>
          </div>
          <button class="yyt-btn yyt-btn-primary" id="yyt-save-tool-preset">
            <i class="fa-solid fa-save"></i> 保存绑定
          </button>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>执行配置</span>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>超时时间 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${tool?.config?.execution?.timeout || 60000}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>重试次数</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${tool?.config?.execution?.retries || 3}">
            </div>
          </div>
        </div>
      </div>
    `);

    enhanceNativeSelects($container, {
      namespace: 'yytPopupToolConfigSelect',
      selectors: ['#yyt-tool-api-preset']
    });

    $container.find('#yyt-save-tool-preset').on('click', function onSavePresetClick() {
      const presetName = $container.find('#yyt-tool-api-preset').val();
      modules.toolRegistryModule?.setToolApiPreset(toolId, presetName);
      const toastr = topLevelWindow.toastr;
      if (toastr) {
        toastr.success('API预设绑定已保存', 'YouYou 工具箱');
      }
    });
  }

  async function renderPromptEditor(toolId, $container) {
    const $ = getJQuery();

    if (!$) {
      $container.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>提示词编辑器模块未加载</span></div>');
      return;
    }

    const tool = modules.toolManagerModule?.getTool(toolId);
    const messages = tool?.config?.messages || [];
    const segments = messagesToSegments(messages) || DEFAULT_PROMPT_SEGMENTS;

    const editor = new PromptEditor({
      containerId: `yyt-prompt-editor-${toolId}`,
      segments,
      onChange: (newSegments) => {
        const newMessages = segmentsToMessages(newSegments);
        log('提示词已更新:', newMessages.length, '条消息');
      }
    });

    $container.html(`<div id="yyt-prompt-editor-${toolId}" class="yyt-prompt-editor-container"></div>`);
    editor.init($container.find(`#yyt-prompt-editor-${toolId}`));

    const editorStyles = getPromptEditorStyles();
    if (editorStyles) {
      const styleId = 'yyt-prompt-editor-styles';
      const targetDoc = topLevelWindow.document || document;
      if (!targetDoc.getElementById(styleId)) {
        const style = targetDoc.createElement('style');
        style.id = styleId;
        style.textContent = editorStyles;
        (targetDoc.head || targetDoc.documentElement).appendChild(style);
      }
    }
  }

  function renderToolPresets(toolId, $container) {
    const $ = getJQuery();
    if (!$) return;

    $container.html(`
      <div class="yyt-panel">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-bookmark"></i>
            <span>工具预设</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" style="margin-left: auto;">
              <i class="fa-solid fa-plus"></i> 新建
            </button>
          </div>
          <div class="yyt-empty-state-small">
            <i class="fa-solid fa-bookmark"></i>
            <span>暂无保存的预设</span>
          </div>
        </div>
      </div>
    `);
  }

  // ============================================================
  // Shell HTML builders
  // ============================================================

  function buildShellHeaderHtml() {
    return `
      <div class="yyt-popup-header">
        <div class="yyt-popup-brand">
          <div class="yyt-popup-title-row">
            <div class="yyt-popup-title">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>YouYou 工具箱</span>
            </div>
            <span class="yyt-popup-version">v${SCRIPT_VERSION}</span>
          </div>
          <div class="yyt-popup-subtitle">工具编排、配置与调试工作台</div>
        </div>
        <div class="yyt-popup-header-actions">
          <div class="yyt-popup-drag-hint">
            <i class="fa-solid fa-grip-lines"></i>
            <span>拖动窗口</span>
          </div>
          <button class="yyt-popup-close" title="关闭">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
      </div>`;
  }

  function buildShellSidebarHtml(tools, defaultToolCount, customToolCount) {
    const collapsed = isSidebarCollapsed();
    const mainNavHtml = tools.map(tool => `
      <div class="yyt-main-nav-item ${tool.id === uiState.currentMainTab ? 'active' : ''}" data-tab="${tool.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${escapeHtml(tool.icon || 'fa-file')}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${escapeHtml(tool.name || tool.id)}</span>
          <span class="yyt-main-nav-desc">${escapeHtml(tool.description || '进入此页面进行配置、查看或维护。')}</span>
        </div>
      </div>
    `).join('');

    return `
      <aside class="yyt-shell-sidebar${collapsed ? ' yyt-collapsed' : ''}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">页面导航</span>
            <span class="yyt-shell-sidebar-hint">${tools.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${collapsed ? '展开侧栏' : '折叠侧栏'}">
              <i class="fa-solid ${collapsed ? 'fa-angles-right' : 'fa-angles-left'}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${mainNavHtml}
          </div>
          <div class="yyt-shell-sidebar-note">
            保存后，手动执行与写回链都会以最新配置为准。
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${tools.length}</span>
              <span class="yyt-shell-sidebar-stat-label">主页面</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${defaultToolCount}</span>
              <span class="yyt-shell-sidebar-stat-label">默认工具</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${customToolCount}</span>
              <span class="yyt-shell-sidebar-stat-label">自定义工具</span>
            </div>
          </div>
        </div>
      </aside>`;
  }

  function buildShellMainHeaderHtml(displayName, description) {
    return `
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${escapeHtml(displayName)}</div>
          <div class="yyt-shell-main-description">${escapeHtml(description)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>保存后执行链会立即使用最新配置</span>
          </div>
        </div>
      </div>`;
  }

  function buildShellContentHtml(tools, currentMainTab) {
    return tools.map(tool => `
      <div class="yyt-tab-content ${tool.id === currentMainTab ? 'active' : ''}" data-tab="${tool.id}">
      </div>
    `).join('');
  }

  function buildShellFooterHtml(displayName) {
    return `
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">当前：${escapeHtml(displayName)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API、工具、提取与诊断统一入口。
            </div>
          </div>
        </div>
      </div>`;
  }

  // ============================================================
  // Popup open / close
  // ============================================================

  async function openPopup() {
    if (uiState.currentPopup) {
      log('弹窗已存在');
      return;
    }

    const ensureModulesLoaded = context?.services?.loadModules;
    if (typeof ensureModulesLoaded === 'function') {
      await ensureModulesLoaded();
    }

    const $ = getJQuery();
    const targetDoc = getTargetDocument();

    if (!$) {
      logError('jQuery 未找到，无法创建弹窗');
      return;
    }

    const tools = modules.toolRegistryModule?.getToolList() || [];
    if (!tools.length) {
      logError('工具列表为空，无法创建弹窗');
      return;
    }

    if (!tools.some(tool => tool.id === uiState.currentMainTab)) {
      uiState.currentMainTab = tools[0].id;
    }

    const toolsRootConfig = modules.toolRegistryModule?.getToolConfig('tools');
    const toolSubTabs = Array.isArray(toolsRootConfig?.subTabs) ? toolsRootConfig.subTabs : [];
    const customToolCount = toolSubTabs.filter(tab => tab?.isCustom).length;
    const defaultToolCount = toolSubTabs.filter(tab => !tab?.isCustom).length;
    const currentDisplayName = getTabDisplayName(uiState.currentMainTab);
    const currentDescription = getTabDescription(uiState.currentMainTab);

    uiState.currentOverlay = targetDoc.createElement('div');
    uiState.currentOverlay.className = 'yyt-popup-overlay';
    uiState.currentOverlay.addEventListener('click', (e) => {
      if (e.target === uiState.currentOverlay) {
        closePopup();
      }
    });
    targetDoc.body.appendChild(uiState.currentOverlay);

    const sidebarCollapsed = isSidebarCollapsed();
    const popupHtml = `
      <div class="yyt-popup" id="${POPUP_ID}">
        ${buildShellHeaderHtml()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${sidebarCollapsed ? ' yyt-sidebar-collapsed' : ''}">
              ${buildShellSidebarHtml(tools, defaultToolCount, customToolCount)}
              <section class="yyt-shell-main">
                ${buildShellMainHeaderHtml(currentDisplayName, currentDescription)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${buildShellContentHtml(tools, uiState.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${buildShellFooterHtml(currentDisplayName)}
      </div>
    `;

    const tempDiv = targetDoc.createElement('div');
    tempDiv.innerHTML = popupHtml;
    uiState.currentPopup = tempDiv.firstElementChild;
    targetDoc.body.appendChild(uiState.currentPopup);

    $(uiState.currentPopup).find('.yyt-popup-close').on('click', closePopup);
    $(uiState.currentPopup).find('.yyt-sidebar-toggle').on('click', toggleSidebar);
    bindPopupEvents();
    $(uiState.currentPopup).find('.yyt-main-nav-item').on('click', function onMainTabClick() {
      const tab = $(this).data('tab');
      if (tab) {
        switchMainTab(tab);
      }
    });

    enablePopupDrag();

    void renderTabContent(uiState.currentMainTab);

    const currentToolConfig = modules.toolRegistryModule?.getToolConfig(uiState.currentMainTab);
    if (currentToolConfig?.hasSubTabs) {
      $(uiState.currentPopup).find('.yyt-sub-nav').show();
      renderSubNav(uiState.currentMainTab, currentToolConfig.subTabs);
    }

    updatePopupStatus();
    bindStartupScreen(tools);
    refreshScrollableSurfaces();

    log('弹窗已打开');
  }

  return {
    openPopup,
    closePopup,
    switchMainTab,
    switchSubTab,
    renderTabContent,
    renderSubTabContent
  };
}

export default createPopupShell;