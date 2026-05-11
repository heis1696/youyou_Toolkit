/**
 * YouYou Toolkit - 世界书 Order 分配服务
 * @description 碰撞检测 + 连续分配，确保注入条目 order 不冲突
 */

import { logger } from '../core/logger-service.js';

const log = logger.createScope('TableWBOrder');

export function buildUsedOrderSet(entries) {
  const used = new Set();
  if (!Array.isArray(entries)) return used;
  for (const entry of entries) {
    const order = entry?.order;
    if (Number.isFinite(order)) used.add(Math.floor(order));
  }
  return used;
}

export function allocOrder(usedSet, preferred = 50000, min = 1, max = 99999) {
  for (let i = preferred; i <= max; i++) {
    if (!usedSet.has(i)) {
      usedSet.add(i);
      return i;
    }
  }
  for (let i = min; i < preferred; i++) {
    if (!usedSet.has(i)) {
      usedSet.add(i);
      return i;
    }
  }
  log.warn('无可用 order 槽位');
  usedSet.add(preferred);
  return preferred;
}

export function allocConsecutiveOrderBlock(usedSet, blockSize, preferred = 50000, min = 1, max = 99999) {
  const maxStart = max - blockSize + 1;

  for (let start = preferred; start <= maxStart; start++) {
    let free = true;
    for (let j = 0; j < blockSize; j++) {
      if (usedSet.has(start + j)) { free = false; break; }
    }
    if (free) {
      for (let j = 0; j < blockSize; j++) usedSet.add(start + j);
      return start;
    }
  }

  for (let start = min; start < preferred && start <= maxStart; start++) {
    let free = true;
    for (let j = 0; j < blockSize; j++) {
      if (usedSet.has(start + j)) { free = false; break; }
    }
    if (free) {
      for (let j = 0; j < blockSize; j++) usedSet.add(start + j);
      return start;
    }
  }

  log.warn(`无法分配 ${blockSize} 个连续 order 槽位`);
  for (let j = 0; j < blockSize; j++) usedSet.add(preferred + j);
  return preferred;
}
