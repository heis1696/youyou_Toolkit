# YouYou Toolkit 代码瘦身与结构收口方案

> 创建时间：2026-03-25  
> 适用基线：`0.6.2 + Unreleased`（Phase 1 ~ Phase 5 已完成后的主线）  
> 关联文档：`docs/OPTIMIZATION_PROGRESS.md`、`docs/API_DOCUMENTATION.md`、`docs/EXTENSION_GUIDE.md`

## 一、文档目标

这份文档不再重复说明 Phase 1 ~ Phase 5 为什么成立，而是聚焦**后收口阶段**要解决的事情：

1. 压缩启动期不再属于主路径的模块装载
2. 继续降低 popup shell 对兼容层的感知强度
3. 把 legacy / compatibility 能力从“默认存在”改成“显式按需加载”
4. 让文档对“当前主路径”和“兼容能力”做更清楚的边界标注

换句话说，这一轮不是大重构，而是**减重、收口、降噪**。

---

## 二、当前判断

Phase 1 ~ Phase 5 已经把主架构收敛到以下稳定主路径：

```text
index.js
  -> modules/app/bootstrap.js
  -> modules/app/popup-shell.js
  -> modules/app/public-api.js

tool-trigger
  -> tool-output-service
  -> tool-prompt-service
  -> api-connection
  -> context-injector

modules/ui/index.js
  -> ui-manager
  -> components/*
```

当前最值得继续瘦身的对象，不再是主链本身，而是以下历史残留：

- `ui-components.js`：兼容 UI facade
- `prompt-editor.js`：兼容提示词分段编辑能力
- `tool-executor.js`：兼容执行入口
- `storage.js`：旧存储 API 适配层
- `window-manager.js`：扩展窗口能力（非主工具箱路径）

这些模块并非必须立刻删除，但不应继续被误解为“当前主路径的一部分”。

---

## 三、本轮范围

### 3.1 包含

1. 启动期 legacy 模块减载
2. popup shell 的兼容分支继续收口
3. 自动触发链对兼容执行入口的惰性加载
4. README / API / 扩展 / 贡献 / 进度 / 更新日志同步收口

### 3.2 不包含

1. 不重写自动触发状态机
2. 不改写楼层写回主逻辑
3. 不推翻 `tool-registry.js` 当前运行态模型
4. 不删除所有 compatibility API

---

## 四、当前执行结果（2026-03-25）

### 已完成的代码收口

1. `bootstrap.js` 已不再在启动期无条件装载 `ui-components.js` 与 `prompt-editor.js`
2. `bootstrap.js` 已新增 `loadLegacyModule(moduleKey)`，用于显式按需加载兼容模块
3. `popup-shell.js` 已改为仅在 UI 主入口不可用时，才按需加载 `ui-components.js`
4. `popup-shell.js` 中的提示词分段编辑路径已改为按需加载 `prompt-editor.js`
5. `tool-trigger.js` 已移除对 `tool-executor.js` 的静态导入，兼容执行入口改为惰性加载
6. `getApiConfig()` 已直接使用 `api-connection.js` 的主接口，而不再绕回 `storage.js` 读取
7. `api-connection.js`、`preset-manager.js`、`regex-extractor.js` 已改为优先使用 `core/storage-service.js` 主接口

### 当前仍保留但已明确降级的能力

1. `ui-components.js`：仅用于兼容旧 UI 调用
2. `prompt-editor.js`：仅用于兼容分段提示词编辑路径
3. `tool-executor.js`：仍保留调度器与兼容执行语义，但自动主链已不直接依赖它
4. `storage.js`：仍作为旧接口适配层保留
5. `window-manager.js`：仍作为扩展窗口能力保留

---

## 五、建议的后续动作

### S1. 继续减少启动期装载

若后续允许继续收口，可继续评估：

- `tool-executor.js` 是否也改为由公开 API / compatibility 调用方按需装载
- `window-manager.js` 是否改为由 `createWindow()` 首次调用时再装载

### S2. 存储接口收口

当前已经完成第一批收口：

- `api-connection.js`
- `preset-manager.js`
- `regex-extractor.js`

后续若继续推进，可再检查是否还存在边缘模块直接依赖旧 `storage.js` 接口。

建议中期继续把：

- 其余仍可能间接依赖 `storage.js` 语义的边缘逻辑

从 `storage.js` 旧接口迁移到 `core/storage-service.js` 主接口。

### S3. 兼容能力集中归档

建议未来把以下内容集中放入一类“Compatibility / Legacy”章节：

- `getUiComponents()`
- `getPromptEditor()`
- `tool-executor` 的 legacy 执行函数
- `storage.js` 的旧 API

这样新维护者可以更快分清“当前主路径”与“历史保留能力”。

---

## 六、验收标准

本轮瘦身收口完成后，应至少满足：

1. 主工具箱打开与主/子标签切换不回归
2. 自定义工具配置页仍可正常渲染
3. 自动触发链仍走 `tool-trigger -> tool-output-service` 主路径
4. 手动执行中的 compatibility 回退仍可正常工作
5. README / API / 扩展 / 贡献 / 进度 / 变更文档已同步说明新的主路径与 compatibility 边界
6. `npm run build` 构建通过

---

## 七、实施清单

1. 新增瘦身专项文档，固定本轮范围与非目标。
2. 将 `ui-components.js`、`prompt-editor.js` 从启动期常驻装载改为显式按需加载。
3. 将 `tool-trigger.js` 对 `tool-executor.js` 的静态依赖改为兼容路径惰性加载。
4. 在公开 API 文档中补充 `loadLegacyModule(moduleKey)` 用法与兼容模块说明。
5. 在 README / 扩展指南 / 贡献指南中明确当前主路径与 legacy 能力的边界。
6. 在进度文档与更新日志中登记本轮瘦身收口结果。
7. 执行 `npm run build`，确认本轮收口未破坏主路径。

---

## 八、下一施工优先级建议（2026-03-25）

当前这轮“代码瘦身与结构收口”应视为**第一轮主路径降噪**，而不是彻底完成态。

下一轮建议按以下顺序推进：

1. **先做 N1 宿主自动触发链验收**  
   先验证 A10 / A11 / A12 / A13 是否在真实宿主中全部通过，避免把“自动触发专项残余风险”和“新一轮结构减重”混在一起。

2. **若 N1 通过，再做 S2：存储接口收口**  
   重点把 `api-connection.js`、`preset-manager.js`、`regex-extractor.js` 从 `storage.js` 旧接口逐步收口到 `core/storage-service.js`。

3. **最后再评估 S3：启动期剩余 compatibility 模块减载**  
   例如再决定 `tool-executor.js`、`window-manager.js` 是否还需要继续保留启动期常驻装载。

### 为什么不建议现在继续扩改代码面

因为自动触发链目前仍处于“代码闭环完成、宿主最终验收未完成”的状态。

若此时继续扩大 `storage / executor / window manager` 方向的代码改动面，一旦出现宿主边界问题，就很难区分到底是：

- 自动触发专项本身仍有残留问题
- 还是新一轮结构瘦身引入了新的时序副作用

因此更稳妥的口径是：

> **先 N1，后 S2，再 S3。**
