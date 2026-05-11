/**
 * YouYou Toolkit - 世界书条目放置配置服务
 * @description 规范化 position/depth/order，提供内置表默认放置值
 */

export const VALID_POSITIONS = Object.freeze([
  'at_depth_as_system',
  'before_character_definition',
  'after_character_definition'
]);

export function normalizePosition(raw, fallback = 'before_character_definition') {
  const s = String(raw || '').trim().toLowerCase();
  if (s === 'at_depth_as_system' || s === 'system') return 'at_depth_as_system';
  if (s === 'before_char' || s === 'before_character' || s === 'before_character_definition' || s === '0') return 'before_character_definition';
  if (s === 'after_char' || s === 'after_character' || s === 'after_character_definition' || s === '1') return 'after_character_definition';
  return fallback;
}

export function normalizePlacementConfig(raw = {}, fallback = {}) {
  const defaultPlacement = fallback.position ? fallback : DEFAULT_PLACEMENT;
  return {
    position: normalizePosition(raw.position, defaultPlacement.position),
    depth: Number.isFinite(Number(raw.depth)) ? Math.floor(Number(raw.depth)) : defaultPlacement.depth,
    order: Number.isFinite(Number(raw.order)) ? Math.floor(Number(raw.order)) : defaultPlacement.order
  };
}

export const DEFAULT_PLACEMENT = Object.freeze({
  position: 'before_character_definition',
  depth: 2,
  order: 50000
});

export function applyPlacementToEntry(entry, placement) {
  if (!placement) return entry;
  const result = { ...entry, position: placement.position };
  if (placement.position === 'at_depth_as_system') {
    result.depth = placement.depth;
  } else {
    delete result.depth;
  }
  return result;
}

export function isEntryPlacementMatched(entry, placement) {
  if (!entry || !placement) return false;
  if (entry.position !== placement.position) return false;
  if (placement.position === 'at_depth_as_system') {
    return entry.depth === placement.depth;
  }
  return true;
}
