import { escapeHtml, getJQuery, isContainerValid, getTargetDocument } from './utils.js';

// ============================================================
// 自定义下拉框
// ============================================================

function mergeClassNames(...values) {
  return values
    .flat(Infinity)
    .flatMap((value) => String(value || '').split(/\s+/))
    .map((value) => value.trim())
    .filter(Boolean)
    .join(' ');
}

function buildAttributeString(attributes = {}) {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => {
      if (value === true) {
        return key;
      }
      return `${key}="${escapeHtml(String(value))}"`;
    })
    .join(' ');
}

function resolveSelectedOption(options = [], selectedValue = '', placeholder = '') {
  const resolvedValue = String(selectedValue ?? '');
  const selectedOption = options.find((option) => option.value === resolvedValue)
    || options.find((option) => option.disabled !== true)
    || null;

  if (selectedOption) {
    return selectedOption;
  }

  return {
    value: resolvedValue,
    label: placeholder || resolvedValue || '请选择',
    disabled: false
  };
}

function extractSelectClasses(className = '') {
  return String(className || '')
    .split(/\s+/)
    .map((value) => value.trim())
    .filter((value) => value && value !== 'yyt-select' && value !== 'yyt-native-select-bridge');
}

function getCustomSelectRoot($container, $native) {
  const $ = getJQuery();
  if (!$ || !$native?.length) {
    return null;
  }

  const targetSelector = $native.attr('id')
    ? `#${$native.attr('id')}`
    : ($native.attr('data-yyt-select-key') ? `[data-yyt-select-key="${$native.attr('data-yyt-select-key')}"]` : '');

  if (!targetSelector) {
    return null;
  }

  const $roots = $container.find('[data-yyt-custom-select]');
  const $root = $roots.filter((_, element) => String($(element).attr('data-yyt-select-target') || '') === targetSelector);
  return $root.length ? $root.first() : null;
}

function resolveCustomSelectEventDocument($container) {
  const containerElement = $container?.[0];
  if (containerElement?.ownerDocument) {
    return containerElement.ownerDocument;
  }

  if (typeof window.parent !== 'undefined' && window.parent !== window && window.parent.document) {
    return window.parent.document;
  }

  return document;
}

function resolveCustomSelectRoots($container) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return null;
  }

  const $roots = $container.find('[data-yyt-custom-select]');
  return $roots.length ? $roots : null;
}

function resolveCustomSelectNative($container, $root) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return null;
  }

  const $embeddedNative = $root.find('[data-yyt-select-native]').first();
  if ($embeddedNative.length) {
    return $embeddedNative;
  }

  const targetSelector = String($root.attr('data-yyt-select-target') || '').trim();
  if (!targetSelector) {
    return null;
  }

  const $native = $container.find(targetSelector).first();
  return $native.length ? $native : null;
}

const customSelectPortalStates = new WeakMap();
const CUSTOM_SELECT_PORTAL_LAYER_ID = 'yyt-select-portal-layer';

function resolveOwnerDocument(subject = null) {
  if (subject?.jquery && subject[0]?.ownerDocument) {
    return subject[0].ownerDocument;
  }

  if (subject?.ownerDocument) {
    return subject.ownerDocument;
  }

  if (subject?.nodeType === 9) {
    return subject;
  }

  return getTargetDocument();
}

function getCustomSelectPortalState(subject = null) {
  const targetDoc = resolveOwnerDocument(subject);
  let state = customSelectPortalStates.get(targetDoc);
  if (!state) {
    state = {
      targetDoc,
      layer: null,
      activeRoot: null,
      activeDropdown: null,
      placeholder: null,
      cleanup: null
    };
    customSelectPortalStates.set(targetDoc, state);
  }
  return state;
}

function ensureCustomSelectPortalLayer(subject = null) {
  const targetDoc = resolveOwnerDocument(subject);
  if (!targetDoc?.body) {
    return null;
  }

  const state = getCustomSelectPortalState(targetDoc);
  if (state.layer && state.layer.isConnected) {
    return state.layer;
  }

  let layer = targetDoc.getElementById(CUSTOM_SELECT_PORTAL_LAYER_ID);
  if (!layer) {
    layer = targetDoc.createElement('div');
    layer.id = CUSTOM_SELECT_PORTAL_LAYER_ID;
    layer.className = 'yyt-select-portal-layer';
    targetDoc.body.appendChild(layer);
  }

  state.layer = layer;
  return layer;
}

function resolveCustomSelectTrigger($root) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return null;
  }

  const $trigger = $root.find('[data-yyt-select-trigger]').first();
  return $trigger.length ? $trigger : $root.find('.yyt-select-trigger').first();
}

function resolveCustomSelectDropdown($root) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return null;
  }

  const state = getCustomSelectPortalState($root);
  if (state.activeRoot === $root[0] && state.activeDropdown) {
    return $(state.activeDropdown);
  }

  const $dropdown = $root.find('[data-yyt-select-dropdown]').first();
  return $dropdown.length ? $dropdown : $root.find('.yyt-select-dropdown').first();
}

function clearFloatingDropdownPresentation(dropdownElement) {
  if (!dropdownElement) {
    return;
  }

  dropdownElement.classList.remove('yyt-floating-open');
  dropdownElement.removeAttribute('data-yyt-floating');
  dropdownElement.removeAttribute('data-yyt-floating-placement');
  dropdownElement.style.position = '';
  dropdownElement.style.top = '';
  dropdownElement.style.left = '';
  dropdownElement.style.right = '';
  dropdownElement.style.width = '';
  dropdownElement.style.minWidth = '';
  dropdownElement.style.maxWidth = '';
  dropdownElement.style.maxHeight = '';
  dropdownElement.style.visibility = '';
  dropdownElement.style.zIndex = '';
}

function isEventInsideCustomSelect(target, subject = null) {
  if (!target) {
    return false;
  }

  const state = getCustomSelectPortalState(subject || target);
  if (state.activeRoot?.contains?.(target) || state.activeDropdown?.contains?.(target)) {
    return true;
  }

  return Boolean(target.closest?.('[data-yyt-custom-select], .yyt-select-portal-layer'));
}

function attachCustomSelectPortalListeners(state) {
  if (!state?.targetDoc || typeof state.cleanup === 'function') {
    return;
  }

  const targetDoc = state.targetDoc;
  const targetWindow = targetDoc.defaultView || window;

  const onMouseDown = (event) => {
    if (!state.activeRoot || !state.activeDropdown) {
      return;
    }

    if (isEventInsideCustomSelect(event.target, targetDoc)) {
      return;
    }

    closeActiveCustomSelectDropdown(targetDoc);
  };

  const onKeyDown = (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    const activeRoot = state.activeRoot;
    closeActiveCustomSelectDropdown(targetDoc);

    const $ = getJQuery();
    if ($ && activeRoot) {
      resolveCustomSelectTrigger($(activeRoot))?.trigger('focus');
    }
  };

  const onResize = () => {
    repositionActiveCustomSelectDropdown(targetDoc);
  };

  const onScroll = () => {
    repositionActiveCustomSelectDropdown(targetDoc);
  };

  targetDoc.addEventListener('mousedown', onMouseDown, true);
  targetDoc.addEventListener('keydown', onKeyDown, true);
  targetWindow.addEventListener('resize', onResize);
  targetDoc.addEventListener('scroll', onScroll, true);

  state.cleanup = () => {
    targetDoc.removeEventListener('mousedown', onMouseDown, true);
    targetDoc.removeEventListener('keydown', onKeyDown, true);
    targetWindow.removeEventListener('resize', onResize);
    targetDoc.removeEventListener('scroll', onScroll, true);
  };
}

function detachCustomSelectPortalListeners(state) {
  if (typeof state?.cleanup === 'function') {
    state.cleanup();
  }
  if (state) {
    state.cleanup = null;
  }
}

function positionFloatingCustomSelectDropdown(state) {
  const $ = getJQuery();
  if (!$ || !state?.activeRoot || !state?.activeDropdown) {
    return;
  }

  const targetDoc = state.targetDoc;
  if (!targetDoc?.body?.contains?.(state.activeRoot)) {
    closeActiveCustomSelectDropdown(targetDoc);
    return;
  }

  const $root = $(state.activeRoot);
  const $trigger = resolveCustomSelectTrigger($root);
  const dropdownElement = state.activeDropdown;
  const targetWindow = targetDoc?.defaultView || window;

  if (!$trigger?.length || !dropdownElement?.isConnected || !$root[0]?.isConnected) {
    closeActiveCustomSelectDropdown(targetDoc);
    return;
  }

  const rect = $trigger[0].getBoundingClientRect();
  const viewportWidth = targetWindow.innerWidth || targetDoc.documentElement?.clientWidth || 0;
  const viewportHeight = targetWindow.innerHeight || targetDoc.documentElement?.clientHeight || 0;
  const margin = 12;
  const gap = 8;
  const availableBelow = Math.max(0, viewportHeight - rect.bottom - margin - gap);
  const availableAbove = Math.max(0, rect.top - margin - gap);
  const openAbove = availableBelow < 220 && availableAbove > availableBelow;
  const availableHeight = openAbove ? availableAbove : availableBelow;
  const maxHeight = Math.max(120, Math.floor(availableHeight || 0));

  dropdownElement.setAttribute('data-yyt-floating', 'true');
  dropdownElement.setAttribute('data-yyt-floating-placement', openAbove ? 'top' : 'bottom');
  dropdownElement.classList.add('yyt-floating-open');

  const triggerWidth = Math.ceil(rect.width);
  const maxWidth = Math.max(triggerWidth, Math.floor(viewportWidth - margin * 2));
  const previousWidth = dropdownElement.style.width;
  const previousMinWidth = dropdownElement.style.minWidth;
  const previousMaxWidth = dropdownElement.style.maxWidth;
  const previousVisibility = dropdownElement.style.visibility;

  dropdownElement.style.width = 'max-content';
  dropdownElement.style.minWidth = `${triggerWidth}px`;
  dropdownElement.style.maxWidth = `${maxWidth}px`;
  dropdownElement.style.visibility = 'hidden';

  const measuredWidth = Math.ceil(dropdownElement.scrollWidth || dropdownElement.getBoundingClientRect().width || triggerWidth);
  const width = Math.max(triggerWidth, Math.min(maxWidth, measuredWidth));
  const contentHeight = Math.min(dropdownElement.scrollHeight || maxHeight, maxHeight);

  dropdownElement.style.width = previousWidth;
  dropdownElement.style.minWidth = previousMinWidth;
  dropdownElement.style.maxWidth = previousMaxWidth;
  dropdownElement.style.visibility = previousVisibility;

  let left = Math.round(rect.left);
  if (left + width > viewportWidth - margin) {
    left = Math.max(margin, Math.round(viewportWidth - margin - width));
  }
  left = Math.max(margin, left);

  let top = openAbove
    ? Math.round(rect.top - gap - contentHeight)
    : Math.round(rect.bottom + gap);
  top = Math.max(margin, Math.min(top, Math.round(viewportHeight - margin - contentHeight)));

  dropdownElement.style.position = 'fixed';
  dropdownElement.style.top = `${top}px`;
  dropdownElement.style.left = `${left}px`;
  dropdownElement.style.right = 'auto';
  dropdownElement.style.width = `${width}px`;
  dropdownElement.style.minWidth = `${triggerWidth}px`;
  dropdownElement.style.maxWidth = `${maxWidth}px`;
  dropdownElement.style.maxHeight = `${Math.floor(maxHeight)}px`;
  dropdownElement.style.visibility = '';
  dropdownElement.style.zIndex = '10050';
}

export function closeActiveCustomSelectDropdown(subject = null) {
  const $ = getJQuery();
  const state = getCustomSelectPortalState(subject);
  if (!$ || !state?.activeRoot) {
    return;
  }

  const rootElement = state.activeRoot;
  const dropdownElement = state.activeDropdown;
  const placeholder = state.placeholder;
  const $root = $(rootElement);
  const $trigger = resolveCustomSelectTrigger($root);

  if (dropdownElement) {
    clearFloatingDropdownPresentation(dropdownElement);

    if (placeholder?.parentNode) {
      placeholder.parentNode.insertBefore(dropdownElement, placeholder);
    } else if (rootElement?.isConnected) {
      rootElement.appendChild(dropdownElement);
    } else {
      dropdownElement.remove();
    }
  }

  placeholder?.parentNode?.removeChild(placeholder);

  $root.removeClass('yyt-open');
  $trigger?.attr('aria-expanded', 'false');

  state.activeRoot = null;
  state.activeDropdown = null;
  state.placeholder = null;
  detachCustomSelectPortalListeners(state);
}

export function repositionActiveCustomSelectDropdown(subject = null) {
  const state = getCustomSelectPortalState(subject);
  if (!state?.activeRoot || !state?.activeDropdown) {
    return;
  }

  positionFloatingCustomSelectDropdown(state);
}

export function openCustomSelectDropdown($root) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return;
  }

  const $resolvedRoot = $root.first();
  const $trigger = resolveCustomSelectTrigger($resolvedRoot);
  const $dropdown = resolveCustomSelectDropdown($resolvedRoot);
  if (!$trigger?.length || !$dropdown?.length || $trigger.prop('disabled')) {
    return;
  }

  const state = getCustomSelectPortalState($resolvedRoot);
  if (state.activeRoot === $resolvedRoot[0]) {
    positionFloatingCustomSelectDropdown(state);
    return;
  }

  closeActiveCustomSelectDropdown($resolvedRoot);

  const layer = ensureCustomSelectPortalLayer($resolvedRoot);
  if (!layer) {
    return;
  }

  const dropdownElement = $dropdown[0];
  const placeholder = state.targetDoc.createComment('yyt-select-dropdown-placeholder');
  dropdownElement.parentNode?.insertBefore(placeholder, dropdownElement);
  layer.appendChild(dropdownElement);

  state.activeRoot = $resolvedRoot[0];
  state.activeDropdown = dropdownElement;
  state.placeholder = placeholder;

  $resolvedRoot.addClass('yyt-open');
  $trigger.attr('aria-expanded', 'true');

  attachCustomSelectPortalListeners(state);
  positionFloatingCustomSelectDropdown(state);
}

function resolveCustomSelectRootFromOption($container, $option) {
  const $ = getJQuery();
  if (!$ || !$option?.length) {
    return null;
  }

  const $inlineRoot = $option.closest('[data-yyt-custom-select]');
  if ($inlineRoot.length) {
    return $inlineRoot.first();
  }

  const state = getCustomSelectPortalState($option);
  if (state.activeRoot && state.activeDropdown?.contains?.($option[0])) {
    const $root = $(state.activeRoot);
    return $container.has(state.activeRoot).length ? $root : null;
  }

  return null;
}

export function closeCustomSelectDropdown($root) {
  const state = getCustomSelectPortalState($root);
  if ($root?.length && state.activeRoot && state.activeRoot !== $root[0]) {
    return;
  }

  closeActiveCustomSelectDropdown($root);
}

export function toggleCustomSelectDropdown($root) {
  const state = getCustomSelectPortalState($root);
  if ($root?.length && state.activeRoot === $root[0]) {
    closeActiveCustomSelectDropdown($root);
    return;
  }

  openCustomSelectDropdown($root);
}

function updateCustomSelectUi($container, $root, $native = null) {
  const $ = getJQuery();
  if (!$ || !$root?.length) {
    return;
  }

  const $resolvedNative = $native || resolveCustomSelectNative($container, $root);
  if (!$resolvedNative?.length) {
    return;
  }

  const options = Array.isArray($resolvedNative.data('yytCustomSelectOptions'))
    ? $resolvedNative.data('yytCustomSelectOptions')
    : [];
  const selectedOption = resolveSelectedOption(options, $resolvedNative.val(), $root.attr('data-yyt-select-placeholder') || '');
  const selectedValue = String(selectedOption.value ?? '');
  const selectedLabel = String(selectedOption.label ?? '');
  const disabled = $resolvedNative.is(':disabled');

  $root.find('.yyt-select-value')
    .text(selectedLabel)
    .attr('data-value', selectedValue)
    .data('value', selectedValue);

  const $dropdown = resolveCustomSelectDropdown($root);
  const $options = $dropdown?.length ? $dropdown.find('[data-yyt-select-option]') : $root.find('[data-yyt-select-option]');
  $options.each((_, element) => {
    const $option = $(element);
    const isSelected = String($option.attr('data-value') || '') === selectedValue;
    $option.toggleClass('yyt-selected', isSelected).attr('aria-selected', String(isSelected));
  });

  const $trigger = $root.find('[data-yyt-select-trigger]').first();
  $trigger.prop('disabled', disabled);
  if (disabled) {
    closeCustomSelectDropdown($root);
    $root.removeClass('yyt-open');
    $trigger.attr('aria-expanded', 'false');
  }
}

export function normalizeCustomSelectOptions(options = []) {
  return Array.isArray(options)
    ? options.map((option) => {
      if (option && typeof option === 'object' && !Array.isArray(option)) {
        const optionValue = String(option.value ?? '');
        const optionLabel = String(option.label ?? option.text ?? option.name ?? optionValue);
        return {
          value: optionValue,
          label: optionLabel,
          disabled: option.disabled === true
        };
      }

      const optionValue = String(option ?? '');
      return {
        value: optionValue,
        label: optionValue,
        disabled: false
      };
    })
    : [];
}

export function renderCustomSelectControl(config = {}) {
  const {
    selectedValue = '',
    options = [],
    placeholder = '请选择',
    disabled = false,
    includeNative = true,
    nativeTag = 'input',
    nativeType = 'hidden',
    rootAttributes = {},
    nativeAttributes = {},
    triggerAttributes = {},
    dropdownAttributes = {},
    optionAttributes = {},
    optionClass = '',
    optionTextClass = ''
  } = config;

  const normalizedOptions = normalizeCustomSelectOptions(options);
  const selectedOption = resolveSelectedOption(normalizedOptions, selectedValue, placeholder);
  const resolvedDisabled = disabled === true || normalizedOptions.length === 0;

  const rootAttributeString = buildAttributeString({
    ...rootAttributes,
    class: mergeClassNames('yyt-custom-select', rootAttributes.class),
    'data-yyt-custom-select': rootAttributes['data-yyt-custom-select'] ?? 'true',
    'data-yyt-select-placeholder': placeholder
  });

  const triggerAttributeString = buildAttributeString({
    type: 'button',
    ...triggerAttributes,
    class: mergeClassNames('yyt-select-trigger', triggerAttributes.class),
    'data-yyt-select-trigger': triggerAttributes['data-yyt-select-trigger'] ?? 'true',
    'aria-haspopup': triggerAttributes['aria-haspopup'] ?? 'listbox',
    'aria-expanded': triggerAttributes['aria-expanded'] ?? 'false',
    disabled: resolvedDisabled ? true : triggerAttributes.disabled
  });

  const dropdownAttributeString = buildAttributeString({
    ...dropdownAttributes,
    class: mergeClassNames('yyt-select-dropdown', dropdownAttributes.class),
    'data-yyt-select-dropdown': dropdownAttributes['data-yyt-select-dropdown'] ?? 'true',
    role: dropdownAttributes.role ?? 'listbox'
  });

  const nativeMarkup = includeNative
    ? (() => {
        const commonAttributes = {
          ...nativeAttributes,
          class: mergeClassNames(nativeAttributes.class),
          'data-yyt-select-native': nativeAttributes['data-yyt-select-native'] ?? 'true',
          disabled: resolvedDisabled ? true : nativeAttributes.disabled
        };

        if (nativeTag === 'select') {
          const nativeAttributeString = buildAttributeString(commonAttributes);
          return `<select ${nativeAttributeString}>${normalizedOptions.map((option) => `
            <option value="${escapeHtml(option.value)}" ${option.value === String(selectedOption.value ?? '') ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}>${escapeHtml(option.label)}</option>
          `).join('')}</select>`;
        }

        const nativeAttributeString = buildAttributeString({
          type: nativeType,
          value: selectedOption.value,
          ...commonAttributes
        });
        return `<input ${nativeAttributeString}>`;
      })()
    : '';

  return `
    <div ${rootAttributeString}>
      ${nativeMarkup}
      <button ${triggerAttributeString}>
        <span class="${escapeHtml(mergeClassNames('yyt-select-value'))}" data-value="${escapeHtml(selectedOption.value)}">${escapeHtml(selectedOption.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${dropdownAttributeString}>
        ${normalizedOptions.map((option) => {
          const isSelected = option.value === String(selectedOption.value ?? '');
          const optionAttributeString = buildAttributeString({
            type: 'button',
            ...optionAttributes,
            class: mergeClassNames('yyt-select-option', optionClass, optionAttributes.class, isSelected ? 'yyt-selected' : ''),
            'data-yyt-select-option': optionAttributes['data-yyt-select-option'] ?? 'true',
            'data-value': option.value,
            role: optionAttributes.role ?? 'option',
            'aria-selected': isSelected ? 'true' : 'false',
            disabled: option.disabled ? true : optionAttributes.disabled
          });
          return `
            <button ${optionAttributeString}>
              <span class="${escapeHtml(mergeClassNames('yyt-option-text', optionTextClass))}">${escapeHtml(option.label)}</span>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function destroyEnhancedCustomSelects($container, namespace = 'yytCustomSelect') {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return;
  }

  const eventDocument = resolveCustomSelectEventDocument($container);
  const state = getCustomSelectPortalState(eventDocument);
  if (state.activeRoot && $container.has(state.activeRoot).length) {
    closeActiveCustomSelectDropdown(eventDocument);
  }

  $container.off(`.${namespace}`);
  $(eventDocument).off(`click.${namespace}`);
  $(eventDocument).off(`mousedown.${namespace}`);

  $container.find('[data-yyt-enhanced-select="true"]').remove();
  $container.find('.yyt-native-select-bridge').each((_, element) => {
    const $native = $(element);
    const originalStyle = $native.attr('data-yyt-original-style');
    if (originalStyle !== undefined) {
      if (originalStyle) {
        $native.attr('style', originalStyle);
      } else {
        $native.removeAttr('style');
      }
    } else {
      $native.removeAttr('style');
    }

    $native
      .removeClass('yyt-native-select-bridge')
      .removeAttr('data-yyt-original-style')
      .removeAttr('data-yyt-select-key')
      .removeData('yytCustomSelectOptions');
  });
}

export function enhanceNativeSelects($container, config = {}) {
  const $ = getJQuery();
  if (!$ || !isContainerValid($container)) {
    return;
  }

  const {
    namespace = 'yytCustomSelect',
    selectors = []
  } = config;
  const selectorList = Array.isArray(selectors) ? selectors.filter(Boolean) : [selectors].filter(Boolean);
  if (selectorList.length === 0) {
    return;
  }

  destroyEnhancedCustomSelects($container, namespace);

  const selector = selectorList.join(', ');
  const eventDocument = resolveCustomSelectEventDocument($container);

  $container.find(selector).each((index, element) => {
    const $native = $(element);
    const selectId = String($native.attr('id') || '').trim();
    const selectKey = selectId || `yyt-select-${Date.now()}-${index}`;
    const targetSelector = selectId ? `#${selectId}` : `[data-yyt-select-key="${selectKey}"]`;
    const dropdownId = `${selectKey}-dropdown`;
    const extraClasses = extractSelectClasses($native.attr('class'));
    const originalStyle = $native.attr('style');
    const options = $native.find('option').map((_, optionElement) => {
      const $option = $(optionElement);
      return {
        value: String($option.attr('value') ?? $option.val() ?? ''),
        label: $option.text(),
        disabled: $option.is(':disabled')
      };
    }).get();

    $native
      .attr('data-yyt-original-style', originalStyle ?? '')
      .attr('data-yyt-select-key', selectKey)
      .addClass('yyt-native-select-bridge')
      .css('display', 'none')
      .data('yytCustomSelectOptions', options);

    const customHtml = renderCustomSelectControl({
      includeNative: false,
      selectedValue: $native.val(),
      options,
      disabled: $native.is(':disabled'),
      placeholder: options[0]?.label || '请选择',
      rootAttributes: {
        class: mergeClassNames(extraClasses),
        style: originalStyle || undefined,
        'data-yyt-enhanced-select': 'true',
        'data-yyt-select-target': targetSelector
      },
      triggerAttributes: {
        id: `${selectKey}-trigger`,
        'aria-controls': dropdownId
      },
      dropdownAttributes: {
        id: dropdownId
      }
    });

    $native.after(customHtml);
    const $root = getCustomSelectRoot($container, $native);
    updateCustomSelectUi($container, $root, $native);
  });

  $container.on(`click.${namespace}`, '[data-yyt-select-trigger]', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const $trigger = $(event.currentTarget);
    if ($trigger.prop('disabled')) {
      return;
    }

    const $root = $trigger.closest('[data-yyt-custom-select]');
    toggleCustomSelectDropdown($root);
  });

  $container.on(`change.${namespace}`, selector, (event) => {
    const $native = $(event.currentTarget);
    const options = $native.find('option').map((_, optionElement) => {
      const $option = $(optionElement);
      return {
        value: String($option.attr('value') ?? $option.val() ?? ''),
        label: $option.text(),
        disabled: $option.is(':disabled')
      };
    }).get();
    $native.data('yytCustomSelectOptions', options);
    const $root = getCustomSelectRoot($container, $native);
    updateCustomSelectUi($container, $root, $native);
  });

  $(eventDocument).off(`click.${namespace}`).on(`click.${namespace}`, (event) => {
    if (isEventInsideCustomSelect(event.target, eventDocument)) {
      return;
    }

    const $roots = resolveCustomSelectRoots($container);
    if (!$roots?.length) {
      return;
    }

    closeActiveCustomSelectDropdown(eventDocument);
    $roots.filter('.yyt-open')
      .removeClass('yyt-open')
      .find('[data-yyt-select-trigger]')
      .attr('aria-expanded', 'false');
  });

  $(eventDocument).off(`mousedown.${namespace}`, '.yyt-select-portal-layer [data-yyt-select-option]')
    .on(`mousedown.${namespace}`, '.yyt-select-portal-layer [data-yyt-select-option]', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const $option = $(event.currentTarget);
      if ($option.prop('disabled')) {
        return;
      }

      const $root = resolveCustomSelectRootFromOption($container, $option);
      if (!$root?.length) {
        return;
      }

      const $native = resolveCustomSelectNative($container, $root);
      if (!$native?.length) {
        return;
      }

      const value = String($option.attr('data-value') || '');
      $native.val(value).trigger('change');
      updateCustomSelectUi($container, $root, $native);
      closeCustomSelectDropdown($root);
    });
}
