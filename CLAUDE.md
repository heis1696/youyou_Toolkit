# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and development commands

- Install dependencies: `npm install`
- Production bundle (minified ESM): `npm run build`
- Development bundle (unminified ESM): `npm run build:dev`
- IIFE bundle: `npm run build:iife`
- Watch and rebuild on file changes: `npm run watch`
- One-off local dev build: `npm run dev`

## Testing and validation

This repository does not currently define npm `test` or `lint` scripts in `package.json`.

Validation is primarily:
- bundling successfully with `npm run build`
- host-environment regression testing inside SillyTavern / TavernHelper

For host regression coverage, the most relevant checklist is `docs/HOST_REGRESSION_CHECKLIST.md`, especially for changes touching:
- `modules/tool-trigger.js`
- `modules/tool-output-service.js`
- `modules/context-injector.js`

There is no built-in command for running a single automated test because no automated test runner is configured.

## Repository purpose

This project is a configurable toolchain platform for the SillyTavern / TavernHelper host environment.
The current main capabilities described in the repo docs are:
- API configuration and preset management
- custom tool management
- regex/rule-based extraction
- manual tool execution and extraction preview
- writeback of tool output into the latest assistant message
- unified popup-based UI for configuration and diagnostics

## High-level architecture

### Entry and app shell

`index.js` is intentionally thin now. It builds a shared app context, creates the popup shell, creates bootstrap services, exposes `window.YouYouToolkit`, and starts initialization.

The app-level coordination has been split into:
- `modules/app/bootstrap.js` — lazy module loading, startup initialization, base style injection, menu registration
- `modules/app/popup-shell.js` — popup window, main/sub-tab routing, content mounting, compatibility fallback loading
- `modules/app/public-api.js` — global facade exposed as `YouYouToolkit`

When changing startup behavior, popup behavior, or public API exposure, start with these files rather than expanding `index.js`.

### Core foundation

`modules/core/` provides the shared infrastructure used across the repo:
- `event-bus.js` — cross-module event system
- `storage-service.js` — primary storage abstraction; prefers host storage and falls back to `localStorage`
- `settings-service.js` — cached global settings for executor, debug, and UI groups

The repo is in a transition where newer code should prefer `modules/core/storage-service.js`, while `modules/storage.js` remains as a compatibility layer.

### Tool runtime model

The central runtime source of truth is `modules/tool-registry.js`.

It is responsible for:
- default built-in tools
- merging built-in and user-managed tools
- compatibility normalization between old and new config shapes
- runtime status/diagnostic fields used by the UI and execution flow

If a change affects how tools are configured or resolved at runtime, check `tool-registry.js` first.

### Manual execution and writeback flow

The current tool execution chain is:

`tool-trigger -> tool-output-service -> tool-prompt-service -> api-connection -> context-injector`

Responsibilities:
- `modules/tool-trigger.js` builds execution context for manual runs and extraction preview; the filename remains for compatibility, but the old automatic trigger runtime has been removed
- `modules/tool-output-service.js` is the direct execution layer for output modes, especially `post_response_api`
- `modules/tool-prompt-service.js` builds request messages from `promptTemplate`, variables, and bypass messages
- `modules/api-connection.js` resolves effective API config/presets and sends requests through host-compatible paths
- `modules/context-injector.js` writes tool output back into the latest assistant slot/message and maintains injected context state

For bugs around manual execution, extraction preview, or writeback failures, inspect this chain in order.

### Output modes

Tool execution behavior is organized around two output modes in `modules/tool-output-service.js`:
- `follow_ai` — does not issue the extra post-response request chain
- `post_response_api` — performs an additional API call, extracts tool output, and writes it back into the latest assistant message

The writeback path is especially sensitive to host message identity, swipe identity, and slot binding fields.

### Tool definition split

There are two related but distinct layers:
- `modules/tool-manager.js` — CRUD/import/export for user-defined tool definitions
- `modules/tool-registry.js` — normalized runtime view used by the execution pipeline and UI

When editing user tool persistence or editor-facing schemas, check `tool-manager.js`.
When editing runtime behavior, diagnostics, bindings, or merged config resolution, check `tool-registry.js`.

### UI architecture

The UI has been consolidated around `modules/ui/index.js` as the primary entry point.

Important structure:
- `modules/ui/index.js` — registers panels and exports render helpers
- `modules/ui/ui-manager.js` — component lifecycle and style aggregation
- `modules/ui/components/` — actual panel implementations
- `modules/ui/components/tool-config-panel-factory.js` — shared factory logic for tool config panels
- `modules/ui-components.js` — compatibility facade; prefer `modules/ui/index.js` for new UI wiring

The main user experience is a single popup shell rather than independent windows. `modules/window-manager.js` is still present but is described in repo docs as extension/compatibility capability rather than the default path.

### Compatibility and lazy loading

This codebase keeps several compatibility modules while moving newer code toward the app/core/ui split.

Notable examples:
- `modules/storage.js` remains for older storage calls
- `modules/ui-components.js` remains as a compatibility facade
- `modules/prompt-editor.js` remains mainly as compatibility functionality
- `modules/tool-executor.js` still exists for older execution paths and generic scheduling, but manual compatibility fallback should stay minimal

When adding new code, prefer the newer main path instead of extending compatibility layers unless the task specifically requires backward compatibility.

## Host-environment assumptions

This plugin is designed to run inside SillyTavern / TavernHelper and relies on host-provided runtime capabilities. The code expects browser/host globals and host message/writeback semantics rather than a standalone Node app architecture.

That matters for:
- message reads in `tool-trigger.js`
- API dispatch behavior in `api-connection.js`
- UI integration and popup mounting
- writeback behavior in `context-injector.js`

Be careful not to “simplify” host-specific logic that exists to handle host-side message identity, swipe handling, or refresh quirks.

## Important docs to consult

- `README.md` — product-level overview and current capabilities
- `docs/ARCHITECTURE_ANALYSIS.md` — current architecture and execution flow
- `docs/HOST_REGRESSION_CHECKLIST.md` — manual host regression checklist for manual execution / writeback behavior
- `docs/API_DOCUMENTATION.md` — public API surface and usage notes
- `docs/EXTENSION_GUIDE.md` — how to add or extend functionality

## Practical guidance for edits

- Prefer editing the thin app-shell modules under `modules/app/` instead of pushing orchestration back into `index.js`.
- Prefer `modules/ui/index.js` over `modules/ui-components.js` for new UI wiring.
- Prefer `modules/core/storage-service.js` over `modules/storage.js` for new storage usage.
- For manual execution / writeback bugs, validate against the manual host regression checklist, not just a successful bundle.
- Keep in mind that `dist/bundle.js` is the built artifact produced from `index.js` via esbuild.
