/**
 * YouYou Toolkit - IO Handler Registration
 *
 * 在 bootstrap 阶段调用 registerAllHandlers() 注册所有模块的导入导出 handler。
 * 新增模块时在此文件添加 import + registerHandler 即可。
 */

import { registerHandler } from './import-export-center.js';
import { templateHandler } from './handlers/template-handler.js';
import { apiPresetHandler } from './handlers/api-preset-handler.js';
import { bypassHandler } from './handlers/bypass-handler.js';
import { regexPresetHandler } from './handlers/regex-preset-handler.js';
import { worldbookPresetHandler } from './handlers/worldbook-preset-handler.js';
import { toolHandler } from './handlers/tool-handler.js';
import { settingsHandler } from './handlers/settings-handler.js';

export function registerAllHandlers() {
  registerHandler(templateHandler);
  registerHandler(apiPresetHandler);
  registerHandler(bypassHandler);
  registerHandler(regexPresetHandler);
  registerHandler(worldbookPresetHandler);
  registerHandler(toolHandler);
  registerHandler(settingsHandler);
}
