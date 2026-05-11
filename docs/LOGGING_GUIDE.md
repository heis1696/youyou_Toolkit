# YouYou Toolkit 日志编写指南

## 日志服务概览

项目使用 `modules/core/logger-service.js` 提供的统一日志单例 `logger`。

**核心能力：**
- 内存环形缓冲（默认容量 2000 条，上限 10000）
- 四级日志：`DEBUG → INFO → WARN → ERROR`
- 作用域（Scope）隔离，每条日志自动携带作用域名
- 通过 `EventBus` 推送新条目，UI 面板实时更新
- 自动转发到浏览器控制台（`console.debug/log/warn/error`）
- 支持查询、过滤、搜索、统计、导出

---

## API 参考

### 导入

```js
// 标准导入
import { logger } from './core/logger-service.js';           // 同级目录
import { logger } from '../core/logger-service.js';           // 子目录
import { logger } from '../../core/logger-service.js';        // 更深层级

// 如需日志级别常量（如设置面板、日志面板）
import { logger, LOG_LEVEL } from '../../core/logger-service.js';
```

### 创建作用域

每个模块应在文件顶部创建一个专属作用域：

```js
const log = logger.createScope('MyModuleName');
```

作用域名称使用 **PascalCase**，应简短且能唯一标识该模块。

### 日志调用

作用域 logger 提供五个方法，签名统一为 `(message, data?)`：

```js
log.debug(msg, data);   // 开发诊断信息，生产环境默认不显示
log.info(msg, data);     // 常规操作记录（等同于 log.log）
log.log(msg, data);      // log 的别名，内部调用 info
log.warn(msg, data);     // 非致命异常、降级、兼容性警告
log.error(msg, data);    // 错误、异常、操作失败
```

- `message` — `string`，简明描述发生了什么
- `data` — 可选，结构化附加上下文（对象、数组等），不要拼接进 message 字符串

---

## 日志级别使用规范

### DEBUG

用于开发阶段的诊断信息，生产环境默认关闭（`minLevel = INFO`）。

```js
log.debug('解析结果', { parsed, raw });
log.debug('请求构建完成', { messages, config });
```

**适用场景：** 中间状态、请求/响应细节、条件分支命中情况、内部调度细节。

### INFO / LOG

记录正常流程中的关键节点，用于确认"系统按预期运行"。

```js
log.info('模块初始化完成');
log.info(`工具已注册: ${id}`);
log.info(`世界书同步完成 [${chatId}]：${created} 创建, ${updated} 更新`);
log.info('手动执行开始: ${tool.name}', { executionPath });
```

**适用场景：** 初始化完成、注册/注销、同步/写入完成、配置变更确认、操作开始/完成确认。

### WARN

非致命问题，系统仍能运行但值得注意。

```js
log.warn('工具不存在:', toolId);
log.warn('SillyTavern存储不可用，使用localStorage');
log.warn(`无法分配 ${blockSize} 个连续 order 槽位`);
log.warn('目标已变更', { reason: validation.reason });
```

**适用场景：** 降级回退、缺失可选依赖、配置不完整、兼容性问题、数据校验不通过但不中断流程。

### ERROR

操作失败或异常，需要关注和处理。

```js
log.error('组件渲染失败', { error });
log.error('存储失败:', { error: e });
log.error('工具执行失败', { toolId, error });
log.error('注入失败: 缺少 sourceMessageId');
```

**适用场景：** 异常捕获、必要资源不可用、操作链中断、catch 块中的错误记录。

**重要：** `catch` 块中的错误**必须**记录 `log.error`，不要只通过返回值静默传播。

---

## 编写规则

### 1. 必须通过 logger 写日志，禁止直接使用 console.*

```js
// ✅ 正确
log.error('写入失败', { error });

// ❌ 错误 — 绕过日志系统，UI 面板看不到
console.error('[MyModule] 写入失败:', error);
```

**项目中已不存在 `console.*` 遗留调用**（仅 `logger-service.js` 自身的转发除外）。新代码不允许添加。

### 2. 禁止使用 _log() 转发器模式

不要创建 `_log(...)` 方法统一转发到单一级别。每个调用点必须根据场景选择正确的级别：

```js
// ✅ 每个调用点使用正确级别
log.info('开始执行工具: ${toolId}');
log.debug('构建了 3 条消息');
log.error('工具执行失败', { error });

// ❌ 转发器模式 — 所有日志都是同一个级别，无法区分严重性
_log('开始执行工具: ${toolId}');   // 全是 debug？全是 info？
_log('工具执行失败', error);       // 失败也应该是 error！
```

**历史教训：** 旧版 `tool-output-service`、`context-injector`、`tool-prompt-service`、`bypass-manager` 的 `_log()` 全部转发到 `log.debug`，导致整个执行链在生产环境完全静默。`tool-automation-service` 的 `_log()` 全部转发到 `log.info`，导致错误用 `info` 级别记录。

### 3. data 参数用对象，不要拼字符串

```js
// ✅ 结构化，日志面板可展开查看
log.warn('更新工具运行时状态失败:', { toolId, error });

// ❌ 难以解析
log.warn(`更新工具运行时状态失败: toolId=${toolId}, error=${error}`);
```

### 4. message 保持简短、可读、独一无二

```js
// ✅ 一眼能定位
log.error('jQuery不可用');
log.info(`工具已注册: ${id}`);

// ❌ 信息不足或过于泛化
log.error('出错了');
log.info('done');
```

### 5. 使用文件级常量作用域，不要内联创建

```js
// ✅ 标准模式
const log = logger.createScope('MyModule');
// ... 模块内所有地方使用 log

// ✅ 可接受：懒初始化（仅用于延迟加载模块，如 table-update-service）
function getLog() {
  return logger.createScope('TableUpdate');
}

// ❌ 每次调用都创建新作用域
function doSomething() {
  const log = logger.createScope('MyModule');
}
```

### 6. 日志放在关键路径，不要在每一步都打

```js
// ✅ 关键节点
log.info('模块初始化完成');
log.error('组件渲染失败', error);

// ❌ 过度日志化
log.info('步骤1开始');
log.info('步骤1完成');
```

---

## 已注册的作用域清单

以下是项目中所有已创建的作用域及其所在文件：

| 作用域名 | 文件 | 日志量级 |
|----------|------|----------|
| `Bootstrap` | `index.js`, `modules/app/bootstrap.js` | 少量（log/error） |
| `PopupShell` | `modules/app/popup-shell.js` | 少量（log/error） |
| `WindowManager` | `modules/window-manager.js` | 极少（error） |
| `UI` | `modules/ui/index.js` | 中等（log/error） |
| `UIManager` | `modules/ui/ui-manager.js` | 中等（log/warn/error） |
| `UIUtils` | `modules/ui/utils.js` | 极少（log） |
| `UIComponents` | `modules/ui-components.js` | 少量（error） |
| `StorageService` | `modules/core/storage-service.js` | 少量（warn/error） |
| `EventBus` | `modules/core/event-bus.js` | 中等（debug/warn/error） |
| `VariableResolver` | `modules/variable-resolver.js` | 极少（debug） |
| `ToolAutomation` | `modules/tool-automation-service.js` | 丰富（info/warn/error/debug） |
| `ExecutionContext` | `modules/tool-execution-context.js` | 极少（error） |
| `ToolPromptService` | `modules/tool-prompt-service.js` | 少量（debug/error） |
| `ToolOutputService` | `modules/tool-output-service.js` | 丰富（info/debug/warn/error） |
| `ToolTrigger` | `modules/tool-trigger.js` | 中等（info/warn/error） |
| `ApiConnection` | `modules/api-connection.js` | 少量（warn/debug/error） |
| `RegexExtractor` | `modules/regex-extractor.js` | 中等（warn/error） |
| `ToolRegistry` | `modules/tool-registry.js` | 较多（log/warn/error） |
| `ToolManager` | `modules/tool-manager.js` | 少量（info/error） |
| `ToolExecutor` | `modules/tool-executor.js` | 少量（warn/error） |
| `PresetManager` | `modules/preset-manager.js` | 少量（info/error） |
| `PromptEditor` | `modules/prompt-editor.js` | 中等（log/warn/error） |
| `ContextInjector` | `modules/context-injector.js` | 丰富（info/warn/error/debug） |
| `BypassManager` | `modules/bypass-manager.js` | 少量（info/debug） |
| `ToolWorldbookService` | `modules/tool-worldbook-service.js` | 中等（warn） |
| `TableUpdate` | `modules/table-engine/table-update-service.js` | 丰富（info/warn/error/debug） |
| `TableState` | `modules/table-engine/table-state-service.js` | 少量（debug/warn/error） |
| `TableWriteback` | `modules/table-engine/table-writeback-service.js` | 少量（warn/error） |
| `TableTarget` | `modules/table-engine/table-target-resolver.js` | 少量（warn） |
| `TableSchema` | `modules/table-engine/table-schema-service.js` | 少量（info/warn） |
| `TableTemplate` | `modules/table-engine/table-template-service.js` | 少量（info） |
| `TableProvider` | `modules/table-engine/table-provider-service.js` | 极少（error） |
| `TableGuide` | `modules/table-engine/table-guide-service.js` | 极少（已接入，暂无调用点） |
| `TableWorldbookSync` | `modules/table-engine/table-worldbook-sync-service.js` | 中等（info/warn） |
| `TableWBOrder` | `modules/table-engine/table-worldbook-order-service.js` | 少量（warn） |
| `TableWorkbench` | `modules/ui/components/table-workbench-panel.js` | 少量（debug） |

### 仍无日志但不需要接入的模块

以下模块为纯计算/纯数据/兼容层，无 IO、无状态、无错误路径，不需要接入日志：

- `modules/storage.js` — 兼容层，透传 `core/storage-service.js`
- `modules/tool-local-transform-service.js` — 纯文本转换
- `modules/app/public-api.js` — 纯门面组装
- `modules/table-engine/table-diff-service.js` — 纯计算
- `modules/table-engine/table-lock-service.js` — 内存计算
- `modules/table-engine/table-scope-service.js` — 纯范围计算
- `modules/table-engine/table-history-service.js` — 纯状态重建
- `modules/table-engine/table-json-sanitizer.js` — 纯文本清理
- `modules/table-engine/table-types.js` — 类型常量和工具函数
- `modules/table-engine/table-worldbook-placement-service.js` — 纯配置规范化

---

## 日志面板 UI

日志面板位于 `modules/ui/components/logger-panel.js`，用户可在弹窗中查看实时日志，支持：

- 按级别过滤（全部 / DEBUG / INFO / WARN / ERROR）
- 按作用域过滤
- 关键词搜索（匹配作用域名和消息内容）
- 自动滚动 / 暂停
- 清空日志
- 导出为 JSON

设置面板（`settings-panel.js`）中可调节日志级别阈值。

---

## 日志相关配置

```js
logger.setLevel(LOG_LEVEL.DEBUG);   // 显示所有级别
logger.setLevel(LOG_LEVEL.INFO);    // 默认，隐藏 DEBUG
logger.setLevel(LOG_LEVEL.WARN);    // 仅显示警告和错误
logger.setLevel(LOG_LEVEL.ERROR);   // 仅显示错误

logger.setMaxSize(5000);            // 调整环形缓冲容量（100 ~ 10000）
logger.clear();                     // 清空所有日志
```

---

## 新模块接入检查清单

为新模块添加日志时，确认以下事项：

1. **导入 logger** — `import { logger } from '../core/logger-service.js';`（路径按实际层级）
2. **创建作用域** — `const log = logger.createScope('ModuleName');`
3. **按场景选级别** — 成功用 `info`，降级用 `warn`，失败用 `error`，诊断用 `debug`
4. **不使用 console.*** — 所有日志输出走 logger
5. **不使用 _log() 转发器** — 每个调用点直接用正确级别
6. **作用域名不重复** — 参考上方已注册作用域清单，避免冲突
7. **catch 块必须记日志** — 不要只返回错误对象，至少 `log.error`
