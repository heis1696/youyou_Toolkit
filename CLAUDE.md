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

`modules/storage.js` still exists as a compatibility layer; prefer `modules/core/storage-service.js` for new storage work.

### Tool definition vs runtime model

There are two separate layers for tools:
- `modules/tool-manager.js` — persists and normalizes user-managed tool definitions
- `modules/tool-registry.js` — builds the runtime-facing tool model used by the UI, built-in tools, dynamic custom tool tabs, and runtime diagnostics

When changing persisted tool schemas or custom-tool import/export, start in `tool-manager.js`.
When changing execution-facing config, UI-visible runtime state, or navigation/tab structure, start in `tool-registry.js`.

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

### UI architecture

The UI is centered on `modules/ui/index.js`, which registers panels with `ui-manager.js`.

Important pieces:
- `modules/ui/index.js` — primary UI entry point and panel registration
- `modules/ui/ui-manager.js` — component lifecycle and aggregated styles
- `modules/ui/components/tool-config-panel-factory.js` — shared config-panel factory used by built-in and dynamic custom tools
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

There is currently no checked-in `docs/HOST_REGRESSION_CHECKLIST.md` even though older docs may mention it.
Some docs still refer to older version labels or earlier architecture wording. When docs and source disagree, prefer the current source in `index.js`, `package.json`, and `modules/`.

## Practical guidance for edits

- Prefer `modules/app/*` for startup, popup, and public-API changes.
- Prefer `modules/ui/index.js` over `modules/ui-components.js` for new UI wiring.
- Prefer `modules/core/storage-service.js` over `modules/storage.js` for new persistence work.
- Treat `modules/tool-automation-service.js` as the source of truth for automatic execution behavior.
- Treat `modules/tool-trigger.js` as the source of truth for manual execution and extraction preview.
- Rebuild after source changes; `dist/bundle.js` and `dist/bundle.iife.js` are generated artifacts, not the place to make manual edits.
