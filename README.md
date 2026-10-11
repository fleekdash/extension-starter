# FleekDash Extension Starter

The reference scaffold for a FleekDash extension (`kind: app`): a WordPress
plugin + `fleekdash.json` manifest + one iframe route + one settings field +
the typed `FleekDashSDK` surface.

This directory is the **source of truth** for the public
`fleekdash/extension-starter` repository — it lives inside the monorepo so
it evolves in the same commit as the contract surface it consumes
(`@fleekdash/contracts` via `workspace:*`). The public repo is a synced
mirror (see "Syncing" below).

## What you get

```
extension-starter/
├── fleekdash.json           kind:app manifest — Hub card, requires, settings
├── extension-starter.php    WP plugin bootstrap — Requires Plugins: fleekdash,
│                            plugins_loaded → Registry::register (routes),
│                            activation/deactivation lifecycle
├── pages/app.html           iframe entry — theme-CSS preload + fleekdash-sdk.js
├── src/                     React app — SDK init, THEME_CHANGED listener,
│                            getIntegrationSettings() + getWordPressData() demos
├── vite.config.ts           pages/*.html → dist/ build (base "./")
└── package.json             @fleekdash/contracts for typed SDK + manifest
```

## Using it (extension authors)

1. Copy this directory to `wp-content/plugins/<your-slug>/`.
2. Rename: `extension-starter.php` → `<slug>.php`; replace `extension-starter`,
   `FLEEKDASH_STARTER_*` constants, `fleekdash_starter_*` functions, and the
   `extension-starter` route path.
3. `pnpm install && pnpm build` → `dist/pages/app.html` must exist.
4. Activate in wp-admin → the Hub card and `#/app/extension-starter` route
   appear.

Your UI runs **inside a FleekDash iframe** (`component_url`). Everything
host-side goes through `window.FleekDashSDK` — typed here via
`@fleekdash/contracts` (no more hand-copied `fleekdash-sdk-types.ts`).

## Contract notes

- `fleekdash.json` is validated by `ExtensionManifest::validate()` — the
  `$schema` key gives editor autocomplete against the vendored schema.
- Routes are transitional: today they register via
  `Registry::register([... 'routes' => [...]])` in PHP (see bootstrap);
  when the manifest gains `routes`, migrate there.
- `settings` fields are served to the iframe via
  `sdk.getIntegrationSettings()`; to inject fields into FleekDash's own
  settings sections use `sections` (or `fleekdash_register_settings_fields()`).
- iframe sandbox: `sandbox_mode: "none"` is right for same-origin
  first-party pages; use `"strict"` for untrusted/remote content.

## Syncing to the public repo

`fleekdash/extension-starter` is produced by
`node packages/extension-starter/scripts/sync-public-repo.mjs` — run it
manually from the monorepo, or dispatch the thin wrapper
`.github/workflows/sync-extension-starter.yml` once Actions are enabled
(currently billing-blocked on the private repo). The script:

- mirrors this package to the public repo root (minus `node_modules/`,
  `dist/`, and itself),
- vendors `packages/extension-contracts/` into `contracts/` — a source-only
  package, so the `file:./contracts` dependency needs no build step,
- rewrites the dep `"workspace:*"` → `"file:./contracts"` and repoints the
  manifest `$schema` to `./contracts/schema/...`.

The shipped `.github/workflows/ci.yml` is dormant inside the monorepo (only
repo-root workflows execute) and becomes the public repo's CI — public-repo
Actions are free. Once `@fleekdash/contracts` is on npm, the sync can point
the dependency at the published version instead of vendoring.
