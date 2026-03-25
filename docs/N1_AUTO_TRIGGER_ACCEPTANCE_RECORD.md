# N1 宿主自动触发链验收记录

> 用途：记录 `A10 / A11 / A12 / A13` 在真实宿主环境中的最终验收结果  
> 关联文档：`docs/HOST_REGRESSION_CHECKLIST.md`、`docs/AUTO_TRIGGER_CHAIN_HARDENING_PLAN.md`、`docs/OPTIMIZATION_PROGRESS.md`

## 一、环境基线

- 验收日期：
- 宿主环境版本：
- 是否启用 TavernHelper：
- 监听器设置：
  - `ignoreAutoTrigger =`
  - `useGenerationAfterCommandsFallback =`
  - `useMessageReceivedFallback =`
  - `ignoreQuietGeneration =`
  - `debounceMs =`

## 二、统一诊断抓手

- 控制台日志：`[youyou_trigger]`
- `YouYouToolkit.getAutoTriggerDiagnostics({ historyLimit: 8 })`
- `YouYouToolkit.getToolTrigger().getToolTriggerManagerState()`
- 工具页“最近触发诊断”折叠区

建议在每一项测试后至少补记：

- 控制台关键日志：
- `lastEventDebugSnapshot` 摘要：
- `recentSessionHistory` 结论：
- `diagnostics.summary.phaseCounts`：
- `diagnostics.summary.consistency`：
- `diagnostics.verdictHints`：

---

## 三、A10 验收记录：高时序 baseline

- 宿主操作：
- 关键日志：
- `lastEventDebugSnapshot`：
- `recentSessionHistory`：
- 结果：通过 / 不通过
- 备注：

## 四、A11 验收记录：历史 replay

- 宿主操作：
- 关键日志：
- `lastEventDebugSnapshot`：
- `recentSessionHistory`：
- 结果：通过 / 不通过
- 备注：

## 五、A12 验收记录：`regenerate / swipe`

- 宿主操作：
- 关键日志：
- `lastEventDebugSnapshot`：
- `recentSessionHistory`：
- 重点字段：
  - `generationStartedByUserIntent =`
  - `generationUserIntentSource =`
  - `generationUserIntentDetail =`
- 结果：通过 / 不通过
- 备注：

## 六、A13 验收记录：非用户意图 generation

- 宿主操作：
- 关键日志：
- `lastEventDebugSnapshot`：
- `recentSessionHistory`：
- 重点字段：
  - `generationStartedByUserIntent =`
  - `generationUserIntentSource =`
- 结果：通过 / 不通过
- 备注：

---

## 七、N1 总结结论

- A10：通过 / 不通过
- A11：通过 / 不通过
- A12：通过 / 不通过
- A13：通过 / 不通过
- 最终结论：
  - N1 通过 -> 进入 N2 写回链宿主专项
  - N1 不通过 -> 回到第三轮自动触发定向补修
- 建议下一步：
- 备注：
