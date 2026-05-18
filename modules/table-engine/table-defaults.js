/**
 * YouYou Toolkit - 填表工作台默认值与常量
 *
 * 议题 #15 #16 第一阶段（v1.0.191+）：
 *   从 1433 行 table-schema-service.js 拆出无依赖的常量段（line 26-275），
 *   减小 schema-service 体积。这里只放纯数据，不放逻辑。
 *
 * 拆分原则：
 *   - 无任何外部依赖（除 cloneTableValue 这种基础工具）
 *   - 不引用 schema-service 自己的函数
 *   - schema-service 仍然 re-export 这些常量（向后兼容）
 *
 * 后续阶段（#16 stage 2/3/...）：
 *   - normalize 函数族拆 → table-normalize-service.js
 *   - validate 函数族拆 → table-validation-service.js
 *   - config CRUD 拆 → table-config-service.js
 *   - schema-service 最终瘦身到只保留 form-schema / draft 转换
 */

export const TABLE_WORKBENCH_RUNTIME_STATUS = Object.freeze({
  IDLE: 'idle',
  RUNNING: 'running',
  SUCCESS: 'success',
  ERROR: 'error',
  ABORTED: 'aborted',
  SKIPPED: 'skipped'
});

export const TABLE_FILL_MODE = Object.freeze({
  INCREMENTAL: 'incremental',
  FULL: 'full'
});

export const DEFAULT_TABLE_WORKBENCH_PROMPT_TEMPLATE = `请根据当前对话与当前表格基底，对结构化 tables 数据做增量更新。

要求：
1. 只依据当前对话内容更新，不要臆造未出现的信息。
2. 保持原有表结构；没有依据时保留原值。
3. 优先用 <tableEdit> 增量 DSL（精确不破坏锁定字段）。
4. 表格级 AI 操作说明：
{{tableGuidance}}
5. 本次运行 scope：
{{tableScopeGuidance}}
6. 优先参考当前 assistant 回复：{{lastAiMessage}}

当前表格基底 JSON：
{{toolContentMacro}}`;

/**
 * 议题 #15 #21 + #31：响应契约 — 优先 <tableEdit> 增量 DSL。
 * sanitizer (table-json-sanitizer.js) 主链先尝试 parseIncrementalEdits，
 * 失败时退回到 parseFullReplacement（JSON envelope，v1.0.175 已支持 unwrap）。
 */
export const TABLE_WORKBENCH_RESPONSE_CONTRACT = `输出要求 — 用 <tableEdit>...</tableEdit> 增量 DSL：

  insertRow(tableIndex, {"0": "值1", "1": "值2"})     # 新增行；tableIndex 是表的 0 基索引
  updateRow(tableIndex, rowIndex, {"1": "新值"})      # 只列出要改的列，未提及的列保留原值
  deleteRow(tableIndex, rowIndex)                     # 删除行；rowIndex 0 基不含表头

约定：
- tableIndex / rowIndex 都是 0 基整数（rowIndex 不含表头行）
- data 对象的键是列索引字符串（"0"、"1"、"2" …），不是列名
- 多条指令放在同一个 <tableEdit> 块内，按顺序执行
- 没有变更时输出空块 <tableEdit></tableEdit>
- 不要附加解释、Markdown 代码块标记或额外 JSON

示例：
<tableEdit>
insertRow(0, {"0": "南宫姬怜", "1": "女/17", "2": "白发异瞳"})
updateRow(0, 1, {"3": "好奇上进", "5": "穿越者"})
deleteRow(1, 0)
</tableEdit>

如确实需要全量替换整张表，也可以直接返回 JSON：
  {"tables": [{...}, {...}]}
但应该尽量优先用 DSL（流量小、不影响锁字段）。`;

const TABLE_WORKBENCH_COLUMN_TYPES = Object.freeze([
  { value: 'text', label: '文本' },
  { value: 'number', label: '数字' },
  { value: 'boolean', label: '布尔' },
  { value: 'date', label: '日期' },
  { value: 'json', label: 'JSON' }
]);

export const DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE = 'text';

export const TABLE_WORKBENCH_COLUMN_TYPE_OPTIONS = Object.freeze(
  TABLE_WORKBENCH_COLUMN_TYPES.map((option) => Object.freeze({ ...option }))
);

export const DEFAULT_TABLE_WORKBENCH_TEMPLATE_ID = 'default_story_state';
export const DEFAULT_TABLE_WORKBENCH_TEMPLATE_NAME = '默认剧情状态模板';

// ════════════════════════════════════════════════════════════════
// 默认 8 张表（剧情状态模板）
// ════════════════════════════════════════════════════════════════

function createDefaultColumn(key, title, description = '', type = DEFAULT_TABLE_WORKBENCH_COLUMN_TYPE) {
  return {
    key,
    title,
    description,
    type,
    required: false
  };
}

function createDefaultTable({ id, name, note, aiInstructions, columns }) {
  return {
    id,
    name,
    note,
    enabled: true,
    aiInstructions: {
      init: aiInstructions?.init || '',
      create: aiInstructions?.create || '',
      update: aiInstructions?.update || '',
      delete: aiInstructions?.delete || ''
    },
    columns,
    rows: []
  };
}

export const DEFAULT_TABLE_WORKBENCH_TABLES = Object.freeze([
  createDefaultTable({
    id: 'default_global_state',
    name: '全局数据表',
    note: '记录当前主角所在地点及时间相关参数。此表通常有且仅有一行。',
    aiInstructions: {
      init: '插入一条关于当前世界状态的记录。',
      create: '通常禁止新增；除非表为空且需要初始化。',
      update: '当地点或时间发生变化时更新此表；每轮应根据剧情更新时间相关字段。',
      delete: '禁止删除。'
    },
    columns: [
      createDefaultColumn('location', '主角当前所在地点', '主角当前所在的具体场景名称。'),
      createDefaultColumn('current_time', '当前时间', '游戏世界的当前时间；如剧情没有明确时间，可根据世界观给出合理时间。'),
      createDefaultColumn('previous_scene_time', '上轮场景时间', '上一轮交互结束时的时间。'),
      createDefaultColumn('elapsed_time', '经过的时间', '根据当前与上轮时间计算出的文本描述。')
    ]
  }),
  createDefaultTable({
    id: 'default_protagonist_profile',
    name: '主角信息',
    note: '记录主角的核心身份信息。此表通常有且仅有一行。',
    aiInstructions: {
      init: '初始化时插入主角的唯一条目。',
      create: '禁止新增多名主角；除非表为空且需要初始化。',
      update: '当主角身份、外貌、经历或性格有明确变化时更新。',
      delete: '禁止删除。'
    },
    columns: [
      createDefaultColumn('name', '人物名称', '主角的名字。'),
      createDefaultColumn('gender_age', '性别/年龄', '主角的性别与年龄。'),
      createDefaultColumn('appearance', '外貌特征', '对主角外貌的客观文字描写。'),
      createDefaultColumn('identity', '职业/身份', '主角在社会或剧情中的主要身份。'),
      createDefaultColumn('history', '过往经历', '主角背景故事与关键经历，随剧情增量更新。'),
      createDefaultColumn('personality', '性格特点', '对主角核心性格的概括。')
    ]
  }),
  createDefaultTable({
    id: 'default_important_characters',
    name: '重要角色表',
    note: '记录关键 NPC 或重要角色的信息和动态状态。',
    aiInstructions: {
      init: '初始化时为当前在场的重要人物分别插入条目。',
      create: '剧情中有未记录的重要人物登场时新增。',
      update: '已有角色的状态、关系、想法、经历或持有物变化时更新。',
      delete: '通常禁止删除；角色离场时优先更新"是否离场"。'
    },
    columns: [
      createDefaultColumn('name', '姓名', '角色姓名。'),
      createDefaultColumn('gender_age', '性别/年龄', '角色的性别与年龄。'),
      createDefaultColumn('summary', '一句话介绍', '用简短文字概括角色身份背景。'),
      createDefaultColumn('appearance', '外貌特征', '对角色外貌和当前衣着的客观描写。'),
      createDefaultColumn('important_items', '持有的重要物品', '角色拥有的关键物品，用分号分隔。'),
      createDefaultColumn('offstage', '是否离场', '判断该角色当前是否已经离场，填写"是"或"否"。', 'boolean'),
      createDefaultColumn('history', '过往经历', '角色背景与关键事件，随剧情增量更新。')
    ]
  }),
  createDefaultTable({
    id: 'default_protagonist_skills',
    name: '主角技能表',
    note: '记录主角获得的技能、能力或阶段性成长。',
    aiInstructions: {
      init: '初始化时根据设定添加主角的初始技能。',
      create: '主角获得新技能或新能力时新增。',
      update: '已有技能升级、降级或效果变化时更新。',
      delete: '技能被剧情剥夺、替换或失效时删除。'
    },
    columns: [
      createDefaultColumn('skill_name', '技能名称', '技能或能力名称。'),
      createDefaultColumn('skill_type', '技能类型', '技能类别，例如主动、被动、天赋等。'),
      createDefaultColumn('level', '等级/阶段', '技能当前等级、熟练度或阶段。'),
      createDefaultColumn('effect', '效果描述', '技能在当前阶段下的具体效果。')
    ]
  }),
  createDefaultTable({
    id: 'default_inventory',
    name: '背包物品表',
    note: '记录主角拥有的物品、装备或消耗品。',
    aiInstructions: {
      init: '初始化时根据剧情与设定添加主角的初始携带物品。',
      create: '主角获得背包中没有的全新物品时新增。',
      update: '已有物品数量、状态或描述变化时更新。',
      delete: '物品被完全消耗、丢弃或摧毁时删除。'
    },
    columns: [
      createDefaultColumn('item_name', '物品名称', '物品名称。'),
      createDefaultColumn('quantity', '数量', '拥有数量。', 'number'),
      createDefaultColumn('description', '描述/效果', '物品功能、效果或背景描述。'),
      createDefaultColumn('category', '类别', '物品类别，例如武器、消耗品、杂物等。')
    ]
  }),
  createDefaultTable({
    id: 'default_quests_events',
    name: '任务与事件表',
    note: '记录当前正在进行或需要持续追踪的任务与事件。',
    aiInstructions: {
      init: '初始化时根据剧情与设定添加主要任务或关键事件。',
      create: '主角接取、触发或发现新的任务与事件时新增。',
      update: '任务取得关键进展、目标变化或时限变化时更新。',
      delete: '任务完成、失败、过期或不再需要追踪时删除。'
    },
    columns: [
      createDefaultColumn('quest_name', '任务名称', '任务或事件标题。'),
      createDefaultColumn('quest_type', '任务类型', '主线、支线、个人、突发事件等。'),
      createDefaultColumn('issuer', '发布者', '发布任务或触发事件的角色、地点或势力。'),
      createDefaultColumn('detail', '详细描述', '任务目标、事件背景和要求。'),
      createDefaultColumn('progress', '当前进度', '对完成度或当前阶段的简要描述。'),
      createDefaultColumn('deadline', '任务时限', '完成任务的剩余时间或截止条件。'),
      createDefaultColumn('reward', '奖励', '完成后可能获得的奖励。'),
      createDefaultColumn('penalty', '惩罚', '失败或错过后的后果。')
    ]
  }),
  createDefaultTable({
    id: 'default_memo_log',
    name: '纪要表',
    note: '记录每轮或关键片段发生的事件纪要，用于后续回顾。',
    aiInstructions: {
      init: '故事初始化时插入一条记录，用于记录初始化剧情。',
      create: '每轮交互结束后，若发生了值得记录的新事件，则插入一条新纪要。',
      update: '通常禁止更新历史纪要；只有明显事实错误时才修正。',
      delete: '禁止删除。'
    },
    columns: [
      createDefaultColumn('time_span', '时间跨度', '本轮事件发生的时间范围。'),
      createDefaultColumn('location', '地点', '本轮事件发生地点。'),
      createDefaultColumn('memo', '纪要', '以第三方视角客观记录本轮发生的事实。'),
      createDefaultColumn('summary', '概览', '一句话概括纪要内容。'),
      createDefaultColumn('index_code', '编码索引', '用于后续检索的简短编码。')
    ]
  }),
  createDefaultTable({
    id: 'default_options',
    name: '选项表',
    note: '记录每轮主角可以采取的行动选项。此表通常有且仅有一行。所有选项使用第三人称，不代替主角发言，并紧扣当前剧情。',
    aiInstructions: {
      init: '初始化时生成四个初始行动选项。',
      create: '通常禁止新增；除非表为空且需要初始化。',
      update: '每轮交互后根据当前剧情生成新的四个选项并覆盖原有内容。',
      delete: '禁止删除。'
    },
    columns: [
      createDefaultColumn('option_1', '选项一', '偏向策略、推进剧情或解决当前问题的行动。'),
      createDefaultColumn('option_2', '选项二', '偏向谨慎观察、收集信息或保持中立的行动。'),
      createDefaultColumn('option_3', '选项三', '偏向帮助、保护、沟通或安抚的行动。'),
      createDefaultColumn('option_4', '选项四', '偏向冒险、试探、改变局势或关系互动的行动。')
    ]
  })
]);
