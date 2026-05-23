/**
 * YouYou Toolkit - IO Handler Registration
 *
 * 在 bootstrap 阶段调用 registerAllHandlers() 注册所有模块的导入导出 handler。
 * 新增模块时在此文件添加 import + registerHandler 即可。
 */

import { registerHandler } from './import-export-center.js';
import { templateHandler } from './handlers/template-handler.js';

export function registerAllHandlers() {
  registerHandler(templateHandler);
}
