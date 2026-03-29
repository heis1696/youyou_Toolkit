/**
 * YouYou Toolkit - 弹窗壳与标签路由模块
 * @description 负责主弹窗、主/子标签切换以及内容装配
 */

export function createPopupShell(context) {
  const { constants, topLevelWindow, modules, caches, uiState } = context;
  const { SCRIPT_ID, SCRIPT_VERSION, POPUP_ID } = constants;
  const popupDragState = {
    cleanup: null
  };
  const scrollSurfaceState = {
    cleanups: []
  };

  function log(...args) {
    console.log(`[${SCRIPT_ID}]`, ...args);
  }

  function logError(...args) {
    console.error(`[${SCRIPT_ID}]`, ...args);
  }

  async function ensureLegacyModule(moduleKey) {
    if (modules[moduleKey]) {
      return modules[moduleKey];
    }

    const loadLegacyModule = context?.services?.loadLegacyModule;
    if (typeof loadLegacyModule !== 'function') {
      return null;
    }

    try {
      return await loadLegacyModule(moduleKey);
    } catch (error) {
      logError(`兼容模块加载失败: ${moduleKey}`, error);
      return null;
    }
  }

  function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
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

    const activeSubTabId = uiState.currentSubTab[tabId] || mainConfig.subTabs?.[0]?.id || '';
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

    const activeSubTabId = uiState.currentSubTab[tabId] || mainConfig.subTabs?.[0]?.id || '';
    const subConfig = mainConfig.subTabs?.find(item => item.id === activeSubTabId);
    return subConfig?.description || mainConfig.description || '在这里管理当前工具的模板、配置与调试能力。';
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

    const currentPageChip = popup.querySelector('.yyt-shell-current-page');
    if (currentPageChip) {
      currentPageChip.textContent = displayName;
    }

    const currentPageDesc = popup.querySelector('.yyt-shell-current-desc');
    if (currentPageDesc) {
      currentPageDesc.textContent = description;
    }
  }

  function cleanupPopupDrag() {
    if (typeof popupDragState.cleanup === 'function') {
      popupDragState.cleanup();
      popupDragState.cleanup = null;
    }
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
      '.yyt-select-dropdown'
    ].join(',')));
  }

  function shouldPreserveWheelTarget(target) {
    const scrollableInner = target?.closest?.([
      'textarea',
      '.yyt-preview-pre',
      '.yyt-select-dropdown',
      '.yyt-dialog-body'
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

      if (!isRootContentSurface || wheelContainer !== container) {
        event.stopPropagation();
      }
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
      ...popup.querySelectorAll('.yyt-tab-content.active'),
      ...popup.querySelectorAll('.yyt-tab-content.active .yyt-sub-content'),
      ...popup.querySelectorAll('.yyt-settings-content'),
      ...popup.querySelectorAll('.yyt-tool-list')
    ];

    [...new Set(surfaces)].forEach(bindDragScroll);
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
    cleanupPopupDrag();
    cleanupScrollableSurfaces();

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
    uiState.currentMainTab = tabName;

    const $ = getJQuery();
    if (!$ || !uiState.currentPopup) return;

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
    uiState.currentSubTab[mainTab] = subTab;

    const $ = getJQuery();
    if (!$ || !uiState.currentPopup) return;

    $(uiState.currentPopup).find('.yyt-sub-nav-item').removeClass('active');
    $(uiState.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${subTab}"]`).addClass('active');

    void renderSubTabContent(mainTab, subTab);
    updatePopupStatus();
    refreshScrollableSurfaces();
  }

  function renderSubNav(mainTab, subTabs) {
    const $ = getJQuery();
    if (!$ || !uiState.currentPopup || !subTabs) return;

    const currentSub = uiState.currentSubTab[mainTab] || subTabs[0]?.id;

    const subNavHtml = subTabs.map(tab => `
      <div class="yyt-sub-nav-item ${tab.id === currentSub ? 'active' : ''}" data-subtab="${tab.id}">
        <i class="fa-solid ${tab.icon || 'fa-file'}"></i>
        <span>${tab.name}</span>
      </div>
    `).join('');

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

    switch (tabName) {
      case 'apiPresets':
        if (modules.uiModule?.renderApiPanel) {
          modules.uiModule.renderApiPanel($content);
        } else {
          const uiCompatibilityModule = await ensureLegacyModule('uiComponentsModule');
          if (uiCompatibilityModule?.render) {
            uiCompatibilityModule.render($content);
          }
        }
        break;

      case 'toolManage':
        if (modules.uiModule?.renderToolPanel) {
          modules.uiModule.renderToolPanel($content);
        } else {
          const uiCompatibilityModule = await ensureLegacyModule('uiComponentsModule');
          if (uiCompatibilityModule?.renderTool) {
            uiCompatibilityModule.renderTool($content);
          }
        }
        break;

      case 'regexExtract':
        if (modules.uiModule?.renderRegexPanel) {
          modules.uiModule.renderRegexPanel($content);
        } else {
          const uiCompatibilityModule = await ensureLegacyModule('uiComponentsModule');
          if (uiCompatibilityModule?.renderRegex) {
            uiCompatibilityModule.renderRegex($content);
          }
        }
        break;

      case 'tools':
        if (toolConfig?.hasSubTabs && toolConfig.subTabs?.length > 0) {
          const activeSubTab = uiState.currentSubTab[tabName] || toolConfig.subTabs[0].id;
          await renderSubTabContent(tabName, activeSubTab);
        } else {
          $content.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>工具配置加载失败</span></div>');
        }
        break;

      case 'bypass':
        if (modules.uiModule?.renderBypassPanel) {
          modules.uiModule.renderBypassPanel($content);
        } else {
          $content.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>破限词面板加载失败</span></div>');
        }
        break;

      case 'settings':
        if (modules.uiModule?.renderSettingsPanel) {
          modules.uiModule.renderSettingsPanel($content);
        } else {
          $content.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>设置面板加载失败</span></div>');
        }
        break;

      default:
        renderToolWindow(tabName, $content);
        break;
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
      const subToolConfig = mainToolConfig.subTabs?.find(st => st.id === subTab);

      if (subToolConfig) {
        let $subContent = $mainContent.find('.yyt-sub-content');
        if (!$subContent.length) {
          $mainContent.html('<div class="yyt-sub-content"></div>');
          $subContent = $mainContent.find('.yyt-sub-content');
        }

        switch (subToolConfig.component) {
          case 'SummaryToolPanel':
            if (modules.uiModule?.renderSummaryToolPanel) {
              modules.uiModule.renderSummaryToolPanel($subContent);
            } else {
              const uiCompatibilityModule = await ensureLegacyModule('uiComponentsModule');
              if (uiCompatibilityModule?.SummaryToolPanel) {
                uiCompatibilityModule.SummaryToolPanel.renderTo($subContent);
              } else {
                $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>摘要工具加载失败</span></div>');
              }
            }
            break;

          case 'StatusBlockPanel':
            if (modules.uiModule?.renderStatusBlockPanel) {
              modules.uiModule.renderStatusBlockPanel($subContent);
            } else {
              const uiCompatibilityModule = await ensureLegacyModule('uiComponentsModule');
              if (uiCompatibilityModule?.StatusBlockPanel) {
                uiCompatibilityModule.StatusBlockPanel.renderTo($subContent);
              } else {
                $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>主角状态栏加载失败</span></div>');
              }
            }
            break;

          case 'YouyouReviewPanel':
            if (modules.uiModule?.renderYouyouReviewPanel) {
              modules.uiModule.renderYouyouReviewPanel($subContent);
            } else {
              const uiCompatibilityModule = await ensureLegacyModule('uiComponentsModule');
              if (uiCompatibilityModule?.YouyouReviewPanel) {
                uiCompatibilityModule.YouyouReviewPanel.renderTo($subContent);
              } else {
                $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>小幽点评加载失败</span></div>');
              }
            }
            break;

          case 'GenericToolConfigPanel':
            await renderGenericToolConfigPanel(subToolConfig, $subContent);
            break;

          default:
            $subContent.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>功能开发中...</span></div>');
        }
      }

      return;
    }

    const $content = $mainContent.find('.yyt-sub-content');
    if (!$content.length) return;

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

    refreshScrollableSurfaces();
  }

  async function renderGenericToolConfigPanel(subToolConfig, $container) {
    const $ = getJQuery();
    if (!$ || !$container?.length || !subToolConfig?.id) return;

    try {
      let panel = caches.dynamicToolPanelCache.get(subToolConfig.id);

      if (!panel) {
        const module = await import('../ui/components/tool-config-panel-factory.js');
        const createToolConfigPanel = module?.createToolConfigPanel;

        if (typeof createToolConfigPanel !== 'function') {
          throw new Error('通用工具面板工厂不可用');
        }

        panel = createToolConfigPanel({
          id: `${subToolConfig.id}Panel`,
          toolId: subToolConfig.id,
          postResponseHint: `点击“立即执行一次”后，调用额外模型执行“${subToolConfig.name || subToolConfig.id}”。`,
          extractionPlaceholder: '每行一个标签，如 custom_tag\n或 regex:<custom_tag>([\\s\\S]*?)</custom_tag>',
          previewDialogId: `${subToolConfig.id}-extraction-preview`,
          previewTitle: `${subToolConfig.name || subToolConfig.id} 提取预览`
        });

        caches.dynamicToolPanelCache.set(subToolConfig.id, panel);
      }

      panel.renderTo($container);
      refreshScrollableSurfaces();
    } catch (error) {
      console.error(`[${SCRIPT_ID}] 自定义工具面板加载失败:`, error);
      $container.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>自定义工具面板加载失败</span></div>');
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
    const promptEditorModule = modules.promptEditorModule || await ensureLegacyModule('promptEditorModule');

    if (!$ || !promptEditorModule) {
      $container.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>提示词编辑器模块未加载</span></div>');
      return;
    }

    const tool = modules.toolManagerModule?.getTool(toolId);
    const messages = tool?.config?.messages || [];
    const segments = promptEditorModule.messagesToSegments
      ? promptEditorModule.messagesToSegments(messages)
      : promptEditorModule.DEFAULT_PROMPT_SEGMENTS;

    const editor = new promptEditorModule.PromptEditor({
      containerId: `yyt-prompt-editor-${toolId}`,
      segments,
      onChange: (newSegments) => {
        const newMessages = promptEditorModule.segmentsToMessages
          ? promptEditorModule.segmentsToMessages(newSegments)
          : [];
        log('提示词已更新:', newMessages.length, '条消息');
      }
    });

    $container.html(`<div id="yyt-prompt-editor-${toolId}" class="yyt-prompt-editor-container"></div>`);
    editor.init($container.find(`#yyt-prompt-editor-${toolId}`));

    const editorStyles = promptEditorModule.getPromptEditorStyles
      ? promptEditorModule.getPromptEditorStyles()
      : '';
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

  function openPopup() {
    if (uiState.currentPopup) {
      log('弹窗已存在');
      return;
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

    const contentHtml = tools.map(tool => `
      <div class="yyt-tab-content ${tool.id === uiState.currentMainTab ? 'active' : ''}" data-tab="${tool.id}">
        <!-- 内容将动态渲染 -->
      </div>
    `).join('');

    const popupHtml = `
      <div class="yyt-popup" id="${POPUP_ID}">
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
        </div>

        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-topbar">
              <div class="yyt-shell-topbar-main">
                <div class="yyt-shell-kicker">Workspace</div>
                <div class="yyt-shell-heading">统一工具工作台</div>
                <div class="yyt-shell-overview-text">将 API、工具、提取规则、破限词与执行诊断收口到一个更紧凑的工作区里，优先保证可读性和可操作空间。</div>
              </div>
              <div class="yyt-shell-topbar-side">
                <div class="yyt-shell-current-card">
                  <span class="yyt-shell-current-label">当前页面</span>
                  <strong class="yyt-shell-current-page">${escapeHtml(currentDisplayName)}</strong>
                  <span class="yyt-shell-current-desc">${escapeHtml(currentDescription)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">主页面</span>
                    <strong class="yyt-shell-stat-value">${tools.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">默认工具</span>
                    <strong class="yyt-shell-stat-value">${defaultToolCount}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">自定义工具</span>
                    <strong class="yyt-shell-stat-value">${customToolCount}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">页面导航</span>
                    <span class="yyt-shell-sidebar-hint">${tools.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${mainNavHtml}
                  </div>
                  <div class="yyt-shell-sidebar-note">
                    保存后，手动执行与写回链都会以最新配置为准。
                  </div>
                </div>
              </aside>

              <section class="yyt-shell-main">
                <div class="yyt-shell-main-header">
                  <div class="yyt-shell-main-heading-block">
                    <div class="yyt-shell-main-label">当前页面</div>
                    <div class="yyt-shell-main-title">${escapeHtml(currentDisplayName)}</div>
                    <div class="yyt-shell-main-description">${escapeHtml(currentDescription)}</div>
                  </div>
                  <div class="yyt-shell-main-actions">
                    <div class="yyt-shell-main-meta">
                      <i class="fa-solid fa-circle-info"></i>
                      <span>保存后手动执行与写回链会使用最新配置</span>
                    </div>
                  </div>
                </div>

                <div class="yyt-sub-nav" style="display: none;">
                  <!-- 次级顶栏将动态渲染 -->
                </div>

                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${contentHtml}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="yyt-popup-footer">
          <div class="yyt-popup-footer-left">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">当前：${escapeHtml(currentDisplayName)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API、工具、提取与诊断统一入口。
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${SCRIPT_ID}-close-btn">关闭</button>
          </div>
        </div>
      </div>
    `;

    const tempDiv = targetDoc.createElement('div');
    tempDiv.innerHTML = popupHtml;
    uiState.currentPopup = tempDiv.firstElementChild;
    targetDoc.body.appendChild(uiState.currentPopup);

    $(uiState.currentPopup).find('.yyt-popup-close').on('click', closePopup);
    $(uiState.currentPopup).find(`#${SCRIPT_ID}-close-btn`).on('click', closePopup);
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