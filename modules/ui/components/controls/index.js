/**
 * YouYou Toolkit - Prefab 控件库 barrel export
 *
 * 详见 docs/PHASE3_ARCHITECTURE.md §1（UI 控件 Prefab 化）。
 *
 * 控件契约：
 *   每个工厂函数返回 { el, _id, _kind, _children, on, off, get, set, getControl, destroy, ... }
 *   - el:        渲染 DOM 根节点
 *   - _id:       通过 options.id 传入的标识，用于 getControl(id) 查找
 *   - _kind:     控件种类常量（'button' / 'textInput' / ...）
 *   - _children: 容器型控件的子控件数组 / Map；非容器为 null
 *   - on/off:    事件订阅（'click' / 'change' / 'input' / 'blur' 等）
 *   - get/set:   值控件读写当前值；非值控件 no-op
 *   - getControl(id): 沿 _children 递归查找
 *   - destroy:   清理事件 + 解除 DOM 挂载 + 递归销毁子控件
 *
 * Passthrough（v1.0.216）：
 *   所有控件支持 { style, className, attrs } 透传到根节点：
 *   - style:     Object.assign 到根节点 inline style（覆盖控件默认值）
 *   - className: classList.add 追加到根节点（不覆盖已有 class）
 *   - attrs:     setAttribute 到根节点（覆盖控件默认属性）
 *
 * 容器型控件（flowSection / formRow / listRow）的 _children 会把内嵌控件登记进去，
 * 调用 root.getControl('name') 可以一路找到任意层级深处的子控件。
 *
 * 样式：所有控件直接复用 styles/main.css 已有的 yyt- 前缀类（详见 PANEL_LAYOUT_AUDIT.md），
 * 不引入额外 CSS。
 */

export { button } from './button.js';
export { textInput } from './text-input.js';
export { selectInput } from './select-input.js';
export { toggle } from './toggle.js';
export { divider } from './divider.js';
export { zoneTitle } from './zone-title.js';
export { formRow } from './form-row.js';
export { listRow } from './list-row.js';
export { flowSection } from './flow-section.js';
export { dialog } from './dialog.js';
export { toolbar } from './toolbar.js';
export { presetListItem } from './preset-list-item.js';
export { chipGroup } from './chip-group.js';

export { el, baseControl, createEmitter, findControl, appendChild } from './_internal.js';
