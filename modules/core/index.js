/**
 * YouYou Toolkit - Core模块入口
 * @description 导出核心服务和工具
 * @version 1.0.0
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