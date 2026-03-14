/**
 * YouYou Toolkit - Core模块入口
 * @description 导出核心服务和工具
 * @version 1.1.0
 */

// ============================================================
// 存储服务
// ============================================================

export { 
  storage, 
  toolStorage, 
  presetStorage, 
  windowStorage, 
  StorageService,
  getStorage,
  loadSettings,
  saveSettings 
} from './storage-service.js';

// ============================================================
// 事件总线
// ============================================================

export { EventBus, eventBus, EVENTS } from './event-bus.js';

// ============================================================
// 设置服务 (v0.5 新增)
// ============================================================

export { 
  settingsService, 
  SettingsService, 
  DEFAULT_SETTINGS 
} from './settings-service.js';
