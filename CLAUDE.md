# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and development commands

- Install dependencies: `npm install`
- Production ESM bundle: `npm run build` → writes `dist/bundle.js`
- Development ESM bundle: `npm run build:dev` → writes `dist/bundle.js` without minification
- IIFE bundle: `npm run build:iife` → writes `dist/bundle.iife.js`
- Watch mode: `npm run watch`
- One-off local dev build: `npm run dev` (build only; it does not start a dev server)

This repo does not define npm `test` or `lint` scripts.
There is no built-in command for running a single automated test because no automated test runner is configured.

Validation is primarily:
- `npm run build`
- host-environment verification inside SillyTavern / TavernHelper for changes that touch execution, automation, writeback, or popup UI

## Scope and active code

The active plugin code is the root package (`index.js`, `modules/`, `styles/`, `docs/`).
`Reference/` contains external/reference material and should not be treated as the primary runtime code path.
`dist/` is generated output.

## Repository purpose

YouYou Toolkit is a configurable toolchain plugin for the SillyTavern / TavernHelper host environment.

The current repo is centered on:
- API configuration and preset management
- built-in and custom tool management
- extraction preview and rule/tag-based extraction
- manual tool execution
- automatic post-response tool execution for enabled tools
- writeback of tool output into the latest assistant message
- a single popup workspace UI for configuration and diagnostics

## High-level architecture

### Thin entry and bootstrap shell

`index.js` is intentionally thin. It creates the shared app context, wires the popup shell and public API, exposes `window.YouYouToolkit`, and immediately calls bootstrap initialization.

Main orchestration lives in:
- `modules/app/bootstrap.js` — loads modules, injects CSS, applies saved UI theme, registers the magic-wand menu item, and initializes the automation service
- `modules/app/popup-shell.js` — renders the single popup workspace, main/sub-tab navigation, and lazy-loads compatibility panels
- `modules/app/public-api.js` — exposes the host-facing `YouYouToolkit` facade, including automation controls

Prefer changing these modules instead of expanding `index.js`.

### Core services

`modules/core/` holds shared infrastructure:
- `event-bus.js` — cross-module events
- `storage-service.js` — preferred storage abstraction for new code
- `settings-service.js` — cached global settings, including automation/debug/UI settings
- `logger-service.js` — singleton `LoggerService` with in-memory ring buffer (default 2000 entries), scoped loggers via `createScope()`, level filtering (DEBUG/INFO/WARN/ERROR), and EventBus push; used throughout table-engine and UI for structured diagnostics

`modules/storage.js` still exists as a compatibility layer; prefer `modules/core/storage-service.js` for new storage work.

### Tool definition vs runtime model

There are two separate layers for tools:
- `modules/tool-manager.js` — persists and normalizes user-managed tool definitions
- `modules/tool-registry.js` — builds the runtime-facing tool model used by the UI, built-in tools, dynamic custom tool tabs, and runtime diagnostics

When changing persisted tool schemas or custom-tool import/export, start in `tool-manager.js`.
When changing execution-facing config, UI-visible runtime state, or navigation/tab structure, start in `tool-registry.js`.

### Tool worldbook integration

`modules/tool-worldbook-service.js` — resolves available worldbooks from TavernHelper / SillyTavern APIs and builds selected worldbook content for tool execution context. Provides `getAvailableWorldbooks()` for the UI worldbook picker and `buildSelectedWorldbookContent()` used by the table-engine and tool execution chain to inject worldbook text into prompts.

### Execution context and runtime flows

`modules/tool-execution-context.js` is the shared context builder for both manual and automatic runs. It resolves the target assistant message and computes the slot identity keys used by writeback:
- `slotBindingKey`
- `slotRevisionKey`
- `slotTransactionId`

Two main entry paths exist:
- `modules/tool-automation-service.js` — automatic lifecycle, driven by host events and deduped per message/content revision
- `modules/tool-trigger.js` — manual execution and extraction preview entry point

The main extra-model/writeback chain is:

`tool-output-service -> tool-prompt-service -> api-connection -> context-injector`

Responsibilities:
- `modules/tool-output-service.js` — builds request messages from extracted conversation context, calls the extra API path, extracts tool output, and records writeback metadata
- `modules/tool-prompt-service.js` — turns `promptTemplate` and variables into request messages
- `modules/api-connection.js` — resolves effective API config/preset and dispatches the request
- `modules/context-injector.js` — writes tool output back into the latest assistant slot/message and confirms refresh state

For bugs involving execution, extraction preview, or failed writeback, inspect that chain in order after verifying the execution context.

### Output-mode behavior

The current codebase supports multiple manual execution paths:
- `post_response_api` — manual and automatic extra-model execution path
- `follow_ai` — manual execution path handled by `toolOutputService.runToolFollowAiManual()`
- `local_transform` — local text transform path handled in `modules/tool-trigger.js` via `tool-local-transform-service.js`, then written back through `context-injector`
- compatibility fallback — older execution path routed through `modules/tool-executor.js`

Automatic execution currently runs only auto-eligible `post_response_api` tools via `modules/tool-automation-service.js`.

### Table engine (填表工作台)

`modules/table-engine/` (15 files) is a self-contained subsystem for structured-table extraction, AI-driven update, and writeback. It has its own layered architecture:

**Types and identity** (`table-types.js`):
- Defines all shared constants (`TABLE_RUN_SOURCES`, `TABLE_RUN_SCOPE`, `TABLE_STATE_LOAD_MODE`, `TABLE_EDIT_OPERATIONS`, `TABLE_LOCK_SCOPE`), identity helpers (`createRuntimeTableId`, `ensureTableId`), and value objects (`createTableTargetSnapshot`, `normalizeTableBoundState`, `createEmptyTableBoundState`).
- All table-engine modules import types from here; changes to the data model start in `table-types.js`.

**Configuration and schema** (`table-schema-service.js`):
- Owns the full workbench config lifecycle: defaults, normalization, validation, load, save, and template application.
- Contains the default 8-table story-state schema (全局数据, 主角信息, 重要角色, 技能, 背包, 任务, 纪要, 选项), column-type system, draft compilation, and deep validation with per-cell issue tracking.
- `getTableWorkbenchConfig()` / `saveTableWorkbenchConfig()` are the primary read/write entry points.

**State management** (`table-state-service.js`):
- Reads/writes per-assistant-slot table state and binding pointers on chat messages via host `chat[]` array.
- `loadBoundStateOrTemplate()` delegates to the history resolver for fallback chain (exact → binding → history → template → empty).
- `commitBoundState()` performs fresh-target validation before writing.

**Target resolution** (`table-target-resolver.js`):
- Bridges the existing `tool-execution-context` into a table-specific `targetSnapshot` with all slot keys.
- Provides `validateTableTargetSnapshot()` for stale-target detection before commit.

**History reconstruction** (`table-history-service.js`):
- Implements the 5-level load fallback: exact revision match → binding-key fallback → previous-message history → template seed → empty state.

**Update pipeline** (`table-update-service.js`):
- Main execution orchestrator. `runManualTableUpdate()` / `runAutoTableUpdate()` build the execution context, resolve target, load state, build request (full or incremental), send API call, parse response, apply scope/lock filtering, compute diff, and trigger writeback.
- Incremental mode appends `<tableEdit>` instructions to the prompt and applies parsed edits through `applyIncrementalEdits()`.
- Full mode expects `{ "tables": [...] }` JSON and merges by scope.

**Writeback** (`table-writeback-service.js`):
- Commits the next table state, then optionally mirrors to the assistant message body and/or syncs to a worldbook entry.

**AI response parsing** (`table-json-sanitizer.js`):
- Multi-layer parser: tries `<tableEdit>` incremental blocks first, then fenced JSON, then brace/bracket extraction, with loose-object fallback and string-layer unwrapping.
- Returns `{ mode: 'incremental' | 'full' | 'empty', edits?, tables? }`.

**Scope** (`table-scope-service.js`):
- Resolves which tables are editable per run: `enabled` (all enabled), `selected` (user-picked subset), or `current` (single active table).

**Locks** (`table-lock-service.js`):
- Cell/row/column-level locks stored in `boundState.meta.locks`, keyed by `tableIndex:rowIndex:columnKey` hash.
- Used during incremental edit application to protect locked cells from AI mutation.

**Diff** (`table-diff-service.js`):
- Computes `new / updated / unchanged / deleted / kept` per-row status between previous and next tables for UI highlight.

**Provider seam** (`table-provider-service.js`):
- Thin adapter that currently delegates to the native `buildRequest`/`sendRequest`/`parseResponse` chain; designed for future provider swap.

**Templates** (`table-template-service.js`):
- CRUD for table structure templates stored in a namespaced storage bucket. Built-in template is the default 8-table story-state schema.

**Guide** (`table-guide-service.js`):
- Per-chat guide config (active template, scope overrides) stored separately from the main config and merged at load time.

**Worldbook sync** (`table-worldbook-sync-service.js`):
- Writes the latest table data as a markdown-table worldbook entry via TavernHelper API, enabling the main AI to read current table state.

**Editing guidance for table-engine:**
- Changing the table data model or adding new constants: start in `table-types.js`.
- Changing config schema, column types, validation, or default tables: start in `table-schema-service.js`.
- Changing execution flow, prompt building, or response parsing: start in `table-update-service.js` and `table-json-sanitizer.js`.
- Changing state persistence or history fallback: start in `table-state-service.js` and `table-history-service.js`.
- Do not simplify the slot-key / revision-key / binding-key logic; it ensures reliable state across swipes and rerolls.

### UI architecture

The UI is centered on `modules/ui/index.js`, which registers panels with `ui-manager.js`.

Important pieces:
- `modules/ui/index.js` — primary UI entry point and panel registration
- `modules/ui/ui-manager.js` — component lifecycle and aggregated styles
- `modules/ui/utils.js` — shared UI utilities: `PanelState` lightweight state container, HTML escaping (`escapeHtml`), toast/top-notice system, dialog helpers, form I/O (`getFormApiConfig`/`fillFormWithConfig`), JSON download/file reading, jQuery access (`getJQuery`), and container validation; also re-exports all custom-select functions from `custom-select.js` for backwards compatibility — new UI components should import from here
- `modules/ui/custom-select.js` — extracted custom dropdown select widget with portal-based positioning; provides `enhanceNativeSelects`, `destroyEnhancedCustomSelects`, `renderCustomSelectControl`, and 6 other dropdown lifecycle functions
- `modules/ui/components/tool-config-panel-factory.js` — shared config-panel factory used by built-in and dynamic custom tools
- `modules/ui/components/logger-panel.js` — real-time log viewer panel; subscribes to `eventBus` logger entries, supports level filtering (DEBUG/INFO/WARN/ERROR), search, and log export
- `modules/ui/components/local-transform-tool-panel-factory.js` — generic factory for local text-transform tool panels; produces config UI, extraction preview, and direction/option grids for any `local_transform` tool
- `modules/ui/components/escape-transform-tool-panel.js` — escape/unescape tool panel, created via `local-transform-tool-panel-factory`
- `modules/ui/components/punctuation-transform-tool-panel.js` — Chinese punctuation replacement tool panel, created via `local-transform-tool-panel-factory`
- `modules/ui/components/table-cell-popup-menu.js` — singleton right-click context menu for table cells in the table-workbench panel; provides copy/lock/insert/delete actions
- `modules/ui/components/table-form-renderer.js` — schema-driven form renderer for the table workbench; renders table/column/row editors with inline validation, type selectors, and custom dropdown integration
- `modules/ui/components/youyou-review-panel.js` — mini config panel for the "小幽点评" built-in tool, created via `tool-config-panel-factory`
- `modules/app/popup-shell.js` — renders navigation using `tool-registry.js` and mounts the correct panel for each tab/sub-tab

The `tools` page is dynamic: built-in tool sub-tabs come from `tool-registry.js`, and custom tool sub-tabs are generated from `tool-manager.js` definitions at runtime.

`modules/ui-components.js` and `modules/prompt-editor.js` are compatibility/lazy-loaded modules, not the preferred primary path for new UI work.

### Host-environment assumptions

This plugin is designed for SillyTavern / TavernHelper and depends on host globals and message semantics rather than a standalone Node runtime.

Be careful with code that touches:
- host event subscription and timing in `modules/tool-automation-service.js`
- assistant message resolution in `modules/tool-execution-context.js`
- manual execution entry in `modules/tool-trigger.js`
- writeback and refresh confirmation in `modules/context-injector.js`

Do not casually simplify message identity, swipe handling, content fingerprinting, slot keys, or refresh confirmation logic; those behaviors exist to make same-slot rerolls, swipes, and writeback reliable in the host environment.

## Documentation to consult

- `README.md` — current product overview and active feature scope
- `docs/FRAMEWORK_ARCHITECTURE.md` — maintainer-oriented framework map and routing between major runtime layers
- `docs/ARCHITECTURE_ANALYSIS.md` — architecture walkthrough
- `docs/API_DOCUMENTATION.md` — public API and execution model
- `docs/CHANGELOG.md` — recent behavior changes and migration history

- `docs/HOST_REGRESSION_CHECKLIST.md` — manual test cases for UI refactor phases and regression guard
Some docs still refer to older version labels or earlier architecture wording. When docs and source disagree, prefer the current source in `index.js`, `package.json`, and `modules/`.

## Practical guidance for edits

- Prefer `modules/app/*` for startup, popup, and public-API changes.
- Prefer `modules/ui/index.js` over `modules/ui-components.js` for new UI wiring.
- Prefer `modules/core/storage-service.js` over `modules/storage.js` for new persistence work.
- Prefer `modules/ui/utils.js` for shared UI utilities (escaping, toast, dialogs, dropdowns, form I/O) when building new panels.
- Treat `modules/tool-automation-service.js` as the source of truth for automatic execution behavior.
- Treat `modules/tool-trigger.js` as the source of truth for manual execution and extraction preview.
- Treat `modules/table-engine/table-types.js` as the canonical data model for the table-engine subsystem.
- Treat `modules/table-engine/table-schema-service.js` as the source of truth for table configuration and validation.
- Treat `modules/table-engine/table-update-service.js` as the main orchestrator for table execution (manual and auto).
- Rebuild after source changes; `dist/bundle.js` and `dist/bundle.iife.js` are generated artifacts, not the place to make manual edits.
