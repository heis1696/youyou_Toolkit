/**
 * YouYou Toolkit - YouYou 原生模板导入适配器
 *
 * 议题 #15 模板适配器架构（v1.0.186+）：
 *   - object literal 风格，跟项目惯例一致（无 class 继承）
 *   - detect 宽松判断（够格被尝试），parse 严格转换
 *   - 失败时返回 null，让注册中心尝试下一个 importer
 *
 * youyou 原生格式：
 *   {
 *     id?: string,
 *     name?: string,
 *     description?: string,
 *     tables: [ { id, name, columns:[{key,title,...}], rows:[{cells:{...}}], ... } ],
 *     promptTemplate?: string
 *   }
 *
 * 也支持导出文件外层包裹：
 *   { version, exportedAt, templates: [<上述对象>] }  ← 这种 importTemplates 已先拆开
 */

import { cloneTableValue } from '../table-types.js';

export const youyouImporter = Object.freeze({
  formatId: 'youyou',
  displayName: 'YouYou 原生 (tables 数组)',

  /**
   * 探测能否处理：raw 必须是对象，且 tables 字段是数组。
   * 注意：空数组 [] 也算 youyou 格式（用户新建空模板）。
   */
  detect(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return false;
    return Array.isArray(raw.tables);
  },

  /**
   * 解析为 youyou 标准模板对象。
   * 返回 { tables, name?, description? } 或抛错。
   */
  parse(raw) {
    if (!raw || typeof raw !== 'object') {
      throw new Error('youyou-importer: raw 不是对象');
    }
    const tables = Array.isArray(raw.tables) ? cloneTableValue(raw.tables) : [];
    return {
      id: raw.id || undefined,
      tables,
      name: typeof raw.name === 'string' ? raw.name : '',
      description: typeof raw.description === 'string' ? raw.description : '',
      promptTemplate: typeof raw.promptTemplate === 'string' ? raw.promptTemplate : '',
      createdAt: raw.createdAt || undefined,
      updatedAt: raw.updatedAt || undefined
    };
  }
});

export default youyouImporter;
