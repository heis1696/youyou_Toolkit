/**
 * YouYou Toolkit - UI管理器
 * @description 统一管理已注册 UI 组件的生命周期与样式聚合；不负责 popup shell 路由控制
 * @version 1.0.0
 */

import { eventBus, EVENTS } from '../core/event-bus.js';
import { getJQuery, isContainerValid } from './utils.js';

// ============================================================
// UI管理器类
// ============================================================

class UIManager {
  constructor() {
    /** @type {Map<string, Object>} 已注册的组件 */
    this.components = new Map();
    
    /** @type {Map<string, Object>} 活跃的组件实例 */
    this.activeInstances = new Map();
    
    /** @type {Object} 依赖注入 */
    this.dependencies = {};
    
    /** 当前标签页（仅保留给兼容层查询，不作为 popup shell 主路由源） */
    this.currentTab = 'main';
    
    /** 当前子标签页（仅保留给兼容层查询，不作为 popup shell 主路由源） */
    this.currentSubTab = {};
    
    /** 初始化状态 */
    this.initialized = false;
  }

  // ============================================================
  // 初始化
  // ============================================================

  /**
   * 初始化UI管理器
   * @param {Object} options
   */
  init(options = {}) {
    if (this.initialized) return;
    
    this.dependencies = options.services || {};
    
    // 订阅事件
    this._subscribeEvents();
    
    this.initialized = true;
    eventBus.emit(EVENTS.UI_INITIALIZED);
    
    console.log('[UIManager] 初始化完成');
  }

  // ============================================================
  // 组件注册
  // ============================================================

  /**
   * 注册组件
   * @param {string} id - 组件ID
   * @param {Object} component - 组件配置
   * @returns {boolean}
   */
  register(id, component) {
    if (!id || !component) {
      console.warn('[UIManager] 无效的组件注册');
      return false;
    }
    
    this.components.set(id, {
      id,
      ...component,
      render: component.render || (() => ''),
      bindEvents: component.bindEvents || (() => {}),
      destroy: component.destroy || (() => {}),
      getStyles: component.getStyles || (() => '')
    });
    
    return true;
  }

  /**
   * 注销组件
   * @param {string} id
   */
  unregister(id) {
    this.destroyInstance(id);
    this.components.delete(id);
  }

  /**
   * 获取组件
   * @param {string} id
   * @returns {Object|undefined}
   */
  getComponent(id) {
    return this.components.get(id);
  }

  // ============================================================
  // 渲染
  // ============================================================

  /**
   * 渲染组件
   * @param {string} id - 组件ID
   * @param {HTMLElement|Object} container - 容器
   * @param {Object} props - 属性
   */
  render(id, container, props = {}) {
    const $ = getJQuery();
    if (!$) {
      console.error('[UIManager] jQuery不可用');
      return;
    }

    const component = this.components.get(id);
    if (!component) {
      console.warn(`[UIManager] 组件不存在: ${id}`);
      return;
    }

    let $container;
    if (typeof container === 'string') {
      $container = $(container);
    } else if (container && container.jquery) {
      $container = container;
    } else if (container) {
      $container = $(container);
    }

    if (!isContainerValid($container)) {
      console.warn(`[UIManager] 容器不存在`);
      return;
    }

    this.activeInstances.forEach((instance, instanceId) => {
      const sameContainer = instance?.container?.length && $container.length
        && instance.container[0] === $container[0];
      if (sameContainer && instanceId !== id) {
        this.destroyInstance(instanceId);
      }
    });

    // 销毁旧实例
    this.destroyInstance(id);

    // 渲染
    if (typeof component.renderTo === 'function') {
      component.renderTo($container, {
        ...props,
        dependencies: this.dependencies
      });
    } else {
      const html = component.render({
        ...props,
        dependencies: this.dependencies
      });
      $container.html(html);

      // 绑定事件
      component.bindEvents($container, this.dependencies);
    }

    // 保存实例
    this.activeInstances.set(id, {
      container: $container,
      component,
      props
    });

    // 发送渲染完成事件
    eventBus.emit(EVENTS.UI_RENDER_REQUESTED, { componentId: id });
  }

  /**
   * 销毁组件实例
   * @param {string} id
   */
  destroyInstance(id) {
    const instance = this.activeInstances.get(id);
    if (!instance) return;
    
    instance.component.destroy(instance.container);
    this.activeInstances.delete(id);
  }

  // ============================================================
  // 标签页管理
  // ============================================================

  /**
   * 切换标签页
   * @param {string} tabId
   */
  switchTab(tabId) {
    const oldTab = this.currentTab;
    this.currentTab = tabId;
    eventBus.emit(EVENTS.UI_TAB_CHANGED, { tabId, oldTab });
  }

  /**
   * 获取当前标签页
   * @returns {string}
   */
  getCurrentTab() {
    return this.currentTab;
  }

  /**
   * 切换子标签页
   * @param {string} mainTab
   * @param {string} subTab
   */
  switchSubTab(mainTab, subTab) {
    this.currentSubTab[mainTab] = subTab;
    eventBus.emit(EVENTS.UI_SUBTAB_CHANGED, { mainTab, subTab });
  }

  /**
   * 获取当前子标签页
   * @param {string} mainTab
   * @returns {string}
   */
  getCurrentSubTab(mainTab) {
    return this.currentSubTab[mainTab] || '';
  }

  // ============================================================
  // 样式管理
  // ============================================================

  /**
   * 获取所有组件样式
   * @returns {string}
   */
  getAllStyles() {
    let styles = '';
    this.components.forEach((component, id) => {
      if (component.getStyles) {
        styles += component.getStyles();
      }
    });
    return styles;
  }

  /**
   * 注入样式到页面
   * @param {Document} targetDocument
   */
  injectStyles(targetDocument = document) {
    const styleId = 'yyt-component-styles';
    if (targetDocument.getElementById(styleId)) return;
    
    const style = targetDocument.createElement('style');
    style.id = styleId;
    style.textContent = this.getAllStyles();
    (targetDocument.head || targetDocument.documentElement).appendChild(style);
  }

  // ============================================================
  // 依赖注入
  // ============================================================

  /**
   * 设置依赖
   * @param {string} name
   * @param {*} service
   */
  setDependency(name, service) {
    this.dependencies[name] = service;
  }

  /**
   * 获取依赖
   * @param {string} name
   * @returns {*}
   */
  getDependency(name) {
    return this.dependencies[name];
  }

  // ============================================================
  // 私有方法
  // ============================================================

  /**
   * 订阅事件
   * @private
   */
  _subscribeEvents() {
    // 监听预设更新事件，重新渲染相关组件
    eventBus.on(EVENTS.PRESET_UPDATED, () => {
      // 可以在这里触发特定组件的重新渲染
    });
    
    // 监听工具更新事件
    eventBus.on(EVENTS.TOOL_UPDATED, () => {
      // 可以在这里触发特定组件的重新渲染
    });
  }
}

// ============================================================
// 单例实例
// ============================================================

export const uiManager = new UIManager();
export { UIManager };
export default uiManager;