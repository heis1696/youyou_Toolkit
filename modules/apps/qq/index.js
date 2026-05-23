/**
 * YouYou Toolkit - QQ App Entry (Phase B)
 *
 * 由 floating-ball 在初始化阶段调用 registerQQApp(...) 注册 QQ App。
 * 单例 qqStorage（避免 controller 每次 _buildContext 都新建 StorageService 实例
 * 导致 _cache 不共享）。
 */

import { createQQStorage } from './qq-storage.js';
import { createHomeView } from './views/qq-home-view.js';
import { injectQQStyles } from './qq-styles.js';
import { QQ_APP_ID } from './qq-types.js';
import { createOrchestrator } from './orchestrator.js';
import { eventBus } from '../../core/event-bus.js';

const QQ_ICON_SVG = `
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M12 2.4c-3.7 0-6.7 2.7-6.7 7 0 1.4.4 2.7 1 3.9-.4.9-1 1.8-1.6 2.5-.4.4-.2 1.1.4 1.2 1.7.2 3.1-.2 4.1-.8.9.3 1.8.4 2.8.4s1.9-.1 2.8-.4c1 .6 2.4 1 4.1.8.6-.1.8-.8.4-1.2-.6-.7-1.2-1.6-1.6-2.5.6-1.2 1-2.5 1-3.9 0-4.3-3-7-6.7-7Z"
          fill="#fff" stroke="none"/>
    <circle cx="9.5" cy="9.5" r="1.1" fill="#1a3a5a"/>
    <circle cx="14.5" cy="9.5" r="1.1" fill="#1a3a5a"/>
  </svg>
`;

export function registerQQApp({ floatingBall, parentStorage, parentLogger, targetDoc }) {
  if (!floatingBall || typeof floatingBall.registerApp !== 'function') {
    throw new Error('registerQQApp: floatingBall 必填且需支持 registerApp');
  }
  if (!parentStorage || typeof parentStorage.namespace !== 'function') {
    throw new Error('registerQQApp: parentStorage 必填');
  }

  const logger = parentLogger?.createScope?.(`App:${QQ_APP_ID}`)
    || parentLogger
    || { log() {}, warn() {}, error() {} };

  const appStorage = parentStorage.namespace('apps').namespace(QQ_APP_ID);
  const qqStorage = createQQStorage({ storage: appStorage, logger });

  if (targetDoc) {
    try { injectQQStyles(targetDoc); } catch (err) {
      logger?.warn?.(`注入 QQ 样式失败: ${err?.message || err}`);
    }
  }

  const rootView = createHomeView({ qqStorage, logger, targetDoc });

  const orchestrator = createOrchestrator({ qqStorage, logger, eventBus });
  try {
    orchestrator.install();
  } catch (err) {
    logger?.error?.(`orchestrator.install 失败: ${err?.message || err}`, err);
  }

  const innerUnregister = floatingBall.registerApp({
    id: QQ_APP_ID,
    label: 'QQ',
    icon: QQ_ICON_SVG,
    iconColor: 'linear-gradient(140deg, #4a90d9 0%, #2c5fa1 100%)',
    title: 'QQ',
    group: 'apps',
    groupTitle: '应用',
    order: 30,
    rootView,
  });

  const unregister = () => {
    try { orchestrator.uninstall(); } catch (err) {
      logger?.warn?.(`orchestrator.uninstall 失败: ${err?.message || err}`);
    }
    try { innerUnregister?.(); } catch (_) {}
  };

  return { unregister, qqStorage, orchestrator };
}
