# 8 张默认表的 sourceData 指令

> 来源文件：`Reference/shujuku-spv3.7/src/shared/table-defaults/`
> 每张表定义包含 6 段指令：note / initNode / deleteNode / updateNode / insertNode / ddl

---

## 1. 全局数据表（global_state, uid: sheet_dCudvUnH, orderNo: 0）

### note
```
记录当前主角所在地点及时间相关参数。此表有且仅有一行。
- 列1: 主角当前所在地点 - 主角当前所在的具体场景名称。
- 列2: 当前时间 - 游戏世界的当前时间。格式："YYYY-MM-DD HH:MM"，初始化时如果剧情没有明确具体的日期和时间，则必须根据世界观和设定自行设定一个明确的日期时间。
- 列3: 上轮场景时间 - 上一轮交互结束时的时间。
- 列4: 经过的时间 - 根据当前与上轮时间计算得出的文本描述（如："几分钟"）。
```

### initNode
```
插入一条关于当前世界状态的记录。
```

### deleteNode
```
禁止删除。
```

### updateNode
```
当主角从当前所在区域离开时，更新所在地点。每轮必须更新时间。
SQL示例: UPDATE global_state SET current_location = '新地点', prev_scene_time = cur_time, cur_time = '2024-03-15 16:00', elapsed_time = '约1小时' WHERE row_id = 1;
```

### insertNode
```
禁止操作。
```

### ddl
```sql
CREATE TABLE global_state ( -- 全局数据表
  row_id INTEGER PRIMARY KEY, -- 行号
  current_location TEXT NOT NULL, -- 主角当前所在地点
  cur_time TEXT NOT NULL CHECK(cur_time GLOB '????-??-?? ??:??'), -- 当前时间
  prev_scene_time TEXT CHECK(prev_scene_time IS NULL OR prev_scene_time GLOB '????-??-?? ??:??'), -- 上轮场景时间
  elapsed_time TEXT -- 经过的时间
);
```

---

## 2. 主角信息表（protagonist_info, uid: sheet_DpKcVGqg, orderNo: 1）

### note
```
记录主角的核心身份信息。此表有且仅有一行。
- 列1: 人物名称 - 主角的名字。
- 列2: 性别/年龄 - 主角的生理性别和年龄。
- 列3: 外貌特征 - 对主角外貌的客观文字描写。
- 列4: 职业/身份 - 主角在社会中的主要角色。
- 列5: 过往经历 - 记录主角的背景故事和后续的关键经历，随剧情增量更新，不超过300字，超过时需压缩。
- 列6: 性格特点 - 对主角核心性格的概括。
```

### initNode
```
游戏初始化时，插入主角的唯一条目。
```

### deleteNode
```
禁止删除。
```

### updateNode
```
'过往经历'列会根据剧情发展持续增量更新，当主角各项状态发生改变时更新。
SQL示例: UPDATE protagonist_info SET past_experience = '更新后的经历内容', occupation = '新职业' WHERE row_id = 1;
```

### insertNode
```
禁止操作。
```

### ddl
```sql
CREATE TABLE protagonist_info ( -- 主角信息表
  row_id INTEGER PRIMARY KEY, -- 行号
  char_name TEXT NOT NULL, -- 人物名称
  gender_age TEXT NOT NULL, -- 性别/年龄
  appearance TEXT, -- 外貌特征
  occupation TEXT, -- 职业/身份
  past_experience TEXT, -- 过往经历
  personality TEXT -- 性格特点
);
```

---

## 3. 重要角色表（important_characters, uid: sheet_NcBlYRH5, orderNo: 2）

### note
```
记录所有关键NPC的详细信息和动态状态。
- 列1: 姓名 - NPC的名字。
- 列2: 性别/年龄 - NPC的生理性别和年龄。
- 列3: 一句话介绍 – 用不超过15字概括角色身份背景，不含主观评价。
- 列4: 外貌特征 - 对NPC外貌和当前衣着的详细描述，对女性角色可包含身材描写；对男性角色无需描写。
- 列5: 持有的重要物品 - NPC拥有的关键重要物品列表，用分号分隔。
- 列6: 是否离场 - 判断该角色是否能直接与主角互动，填写"是"或"否"。
- 列7: 过往经历 - 记录角色背景与关键事件，随剧情增量更新，不超过300字，超过时需压缩。
```

### initNode
```
游戏初始化时为当前在场的重要人物分别插入一个条目。
```

### deleteNode
```
禁止删除。
```

### updateNode
```
已有角色的状态、关系、想法或经历变化时更新；若角色死亡需在姓名旁标注（已死亡）。
SQL示例: UPDATE important_characters SET is_absent = '是', past_experience = '新增经历...' WHERE name = '角色名';
```

### insertNode
```
剧情中有未记录的重要人物登场时添加。
SQL示例: INSERT INTO important_characters (row_id, name, gender_age, brief_intro, appearance, key_items, is_absent, past_experience) VALUES ((SELECT MAX(row_id)+1 FROM important_characters), '角色名', '女/20', '简介', '外貌描述', '物品', '否', '经历');
```

### ddl
```sql
CREATE TABLE important_characters ( -- 重要角色表
  row_id INTEGER PRIMARY KEY, -- 行号
  name TEXT NOT NULL UNIQUE, -- 姓名
  gender_age TEXT NOT NULL, -- 性别/年龄
  brief_intro TEXT CHECK(brief_intro IS NULL OR LENGTH(brief_intro) <= 20), -- 一句话介绍
  appearance TEXT, -- 外貌特征
  key_items TEXT, -- 持有的重要物品
  is_absent TEXT NOT NULL DEFAULT '否' CHECK(is_absent IN ('是', '否')), -- 是否离场
  past_experience TEXT -- 过往经历
);
```

---

## 4. 主角技能表（protagonist_skills, uid: sheet_lEARaBa8, orderNo: 3）

### note
```
记录主角获得的所有技能项目。
- 列1: 技能名称 - 技能的名称。
- 列2: 技能类型 - 技能的类别（如："被动"、"主动"）。
- 列3: 等级/阶段 - 技能的当前等级或阶段。
- 列4: 效果描述 - 技能在当前等级下的具体效果。
```

### initNode
```
游戏初始化时，根据设定为主角添加初始技能。
```

### deleteNode
```
技能因剧情被剥夺或替换时删除。
SQL示例: DELETE FROM protagonist_skills WHERE skill_name = '被剥夺的技能';
```

### updateNode
```
已有技能被升级时更新其等级/阶段和效果描述。
SQL示例: UPDATE protagonist_skills SET skill_level = 'Lv.3', effect_desc = '新效果描述' WHERE skill_name = '火球术';
```

### insertNode
```
主角获得新的技能时添加。
SQL示例: INSERT INTO protagonist_skills (row_id, skill_name, skill_type, skill_level, effect_desc) VALUES ((SELECT MAX(row_id)+1 FROM protagonist_skills), '新技能', '主动', 'Lv.1', '效果描述');
```

### ddl
```sql
CREATE TABLE protagonist_skills ( -- 主角技能表
  row_id INTEGER PRIMARY KEY, -- 行号
  skill_name TEXT NOT NULL UNIQUE, -- 技能名称
  skill_type TEXT NOT NULL CHECK(skill_type IN ('被动', '主动')), -- 技能类型
  skill_level TEXT, -- 等级/阶段
  effect_desc TEXT -- 效果描述
);
```

---

## 5. 背包物品表（inventory, uid: sheet_in05z9vz, orderNo: 4）

### note
```
记录主角拥有的所有物品、装备。
- 列1: 物品名称 - 物品的名称。
- 列2: 数量 - 拥有的数量。
- 列3: 描述/效果 - 物品的功能或背景描述。
- 列4: 类别 - 物品的类别（如："武器"、"消耗品"、"杂物"）。
```

### initNode
```
游戏初始化时，根据剧情与设定添加主角的初始携带物品。
```

### deleteNode
```
物品被完全消耗、丢弃或摧毁时删除。
SQL示例: DELETE FROM inventory WHERE item_name = '已消耗物品';
SQL示例(批量): DELETE FROM inventory WHERE quantity <= 0;
```

### updateNode
```
获得已有的物品，使其数量增加时更新，已有物品状态变化时更新。
SQL示例: UPDATE inventory SET quantity = quantity + 3 WHERE item_name = '治疗药水';
SQL示例(多列): UPDATE inventory SET quantity = quantity - 1, description = '已损坏' WHERE item_name = '铁剑';
```

### insertNode
```
主角获得背包中没有的全新物品时添加。
SQL示例: INSERT INTO inventory (row_id, item_name, quantity, description, category) VALUES ((SELECT MAX(row_id)+1 FROM inventory), '新物品', 1, '物品描述', '杂物');
```

### ddl
```sql
CREATE TABLE inventory ( -- 背包物品表
  row_id INTEGER PRIMARY KEY, -- 行号
  item_name TEXT NOT NULL UNIQUE, -- 物品名称
  quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0), -- 数量
  description TEXT, -- 描述/效果
  category TEXT NOT NULL -- 类别
);
```

---

## 6. 任务与事件表（quests_events, uid: sheet_etak47Ve, orderNo: 5）

### note
```
记录所有当前正在进行的任务。
- 列1: 任务名称 - 任务的标题。
- 列2: 任务类型 - "主线任务"或"支线任务"。
- 列3: 发布者 - 发布该任务的角色或势力。
- 列4: 详细描述 - 任务的目标和要求。
- 列5: 当前进度 - 对任务完成度的简要描述。
- 列6: 任务时限 - 完成任务的剩余时间。
- 列7: 奖励 - 完成任务可获得的奖励。
- 列8: 惩罚 - 任务失败的后果。
```

### initNode
```
游戏初始化时，根据剧情与设定添加一条主线剧情。
```

### deleteNode
```
任务完成、失败或过期时删除。
SQL示例: DELETE FROM quests_events WHERE quest_name = '已完成的任务';
```

### updateNode
```
任务取得关键进展时进行更新。
SQL示例: UPDATE quests_events SET current_progress = '已完成第一阶段', time_limit = '剩余3天' WHERE quest_name = '拯救公主';
```

### insertNode
```
主角接取或触发新的主线或支线任务时添加。
SQL示例: INSERT INTO quests_events (row_id, quest_name, quest_type, issuer, detail_desc, current_progress, time_limit, reward, penalty) VALUES ((SELECT MAX(row_id)+1 FROM quests_events), '新任务', '支线任务', '村长', '任务描述', '刚接取', '7天', '金币100', '声望降低');
```

### ddl
```sql
CREATE TABLE quests_events ( -- 任务与事件表
  row_id INTEGER PRIMARY KEY, -- 行号
  quest_name TEXT NOT NULL UNIQUE, -- 任务名称
  quest_type TEXT NOT NULL CHECK(quest_type IN ('主线任务', '支线任务')), -- 任务类型
  issuer TEXT, -- 发布者
  detail_desc TEXT, -- 详细描述
  current_progress TEXT, -- 当前进度
  time_limit TEXT, -- 任务时限
  reward TEXT, -- 奖励
  penalty TEXT -- 惩罚
);
```

---

## 7. 纪要表（chronicle, uid: sheet_3NoMc1wI, orderNo: 6）

### note
```
轮次日志，每轮交互后必须立即插入一条新记录。
- 列1: 时间跨度 - 本轮事件发生的精确时间范围。
- 列2: 地点 - 本轮事件发生的地点，从大到小描述。
- 列3: 纪要 - 以第三方视角客观记录本轮事件，不得加入推测、情绪化语言、负面解读或主观判断。内容必须基于正文明确发生的事实，不得补充未出现的情节，不少于300字，结尾部分禁止进行总结或者升华。
- 列4: 概要 - 30字以内，一句话概括纪要内容。
- 列5: 编码索引 - 格式为 AMXXXX，XXXX从0001递增。
```

### initNode
```
故事初始化时，插入一条新记录用于记录初始化剧情。
```

### deleteNode
```
禁止删除。
```

### updateNode
```
禁止操作。
```

### insertNode
```
每轮交互结束后插入一条新记录。
SQL示例: INSERT INTO chronicle (row_id, time_span, location, chronicle_text, summary, code_index) VALUES ((SELECT MAX(row_id)+1 FROM chronicle), '2024-03-15 14:00~15:00', '王城·中央广场', '本轮纪要内容...', '一句话概括', 'AM0002');
```

### ddl
```sql
CREATE TABLE chronicle ( -- 纪要表
  row_id INTEGER PRIMARY KEY, -- 行号
  time_span TEXT NOT NULL, -- 时间跨度
  location TEXT NOT NULL, -- 地点
  chronicle_text TEXT NOT NULL, -- 纪要
  summary TEXT CHECK(summary IS NULL OR LENGTH(summary) <= 40), -- 概览
  code_index TEXT NOT NULL UNIQUE CHECK(code_index GLOB 'AM[0-9][0-9][0-9][0-9]') -- 编码索引
);
```

---

## 8. 选项表（options, uid: sheet_OptionsNew, orderNo: 7）

### note
```
记录每轮主角可以进行的动作选项。此表有且仅有一行。
- 列1: 选项一 – 以第三人称描述主角可采取的合理行动，偏向策略或推进剧情。
- 列2: 选项二 – 以第三人称描述主角可采取的中立行动，不偏向任何立场。
- 列3: 选项三 – 以第三人称描述主角可采取的善意行动，体现帮助、保护或安抚。
- 列4: 选项四 – 以第三人称描述主角可采取的 NSFW 相关行动，但必须符合剧情逻辑，不得代替主角说话。
所有选项必须使用第三人称（如"主角尝试…"，"主角决定…"），不得代替主角发言；必须紧扣当前剧情；四个选项需风格明确、互不重复。
```

### initNode
```
游戏初始化时，生成四个初始选项。
```

### deleteNode
```
禁止删除。
```

### updateNode
```
每轮交互后必须更新此表，根据当前剧情生成新的四个选项覆盖原有内容。
SQL示例: UPDATE options SET option_1 = '新选项一', option_2 = '新选项二', option_3 = '新选项三', option_4 = '新选项四' WHERE row_id = 1;
```

### insertNode
```
禁止操作。
```

### ddl
```sql
CREATE TABLE options ( -- 选项表
  row_id INTEGER PRIMARY KEY, -- 行号
  option_1 TEXT NOT NULL, -- 选项一
  option_2 TEXT NOT NULL, -- 选项二
  option_3 TEXT NOT NULL, -- 选项三
  option_4 TEXT NOT NULL -- 选项四
);
```
