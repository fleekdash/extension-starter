# FleekDash Extension Starter

The reference scaffold for a FleekDash extension: a WordPress plugin, a
`fleekdash.json` manifest, one iframe app route, one settings field, and the
typed `FleekDashSDK` surface already wired up.

**Clone it, rename it, build it, activate it.** You get a working extension
running inside the FleekDash workspace in about ten minutes, and every line
is written the way FleekDash expects extensions to be written.

## What you get

```
extension-starter/
├── fleekdash.json           kind:app manifest: Hub card, requirements,
│                            settings fields, declarative routes
├── extension-starter.php    WP plugin bootstrap: Requires Plugins header,
│                            lifecycle hooks, legacy Registry fallback
├── pages/app.html           iframe entry: theme CSS preload + fleekdash-sdk.js
├── src/                     React app: SDK init, THEME_CHANGED listener,
│                            getIntegrationSettings + getWordPressData demos
├── vite.config.ts           builds pages/*.html into dist/ (base "./")
├── contracts/               vendored @fleekdash/contracts (typed SDK + manifest)
└── package.json             pnpm scripts and the contracts dependency
```

> **Working inside the FleekDash monorepo?** This README is written for the
> public mirror. In `packages/extension-starter` the contracts dependency
> resolves via `workspace:*` (no `contracts/` directory) and the manifest
> `$schema` points at `../extension-contracts`. The sync script rewrites both
> when mirroring, so copy users of the monorepo package should consume this
> package in place or read the synced repo instead.

## From clone to running extension

1. **Copy this directory** to `wp-content/plugins/<your-slug>/` on a
   WordPress site that runs FleekDash.
2. **Rename everything.** The checklist:
   - `extension-starter.php` to `<slug>.php`
   - the `extension-starter` id and route path in `fleekdash.json`
   - the `INTEGRATION_ID` constant in `src/App.tsx` (it must match the new manifest id)
   - the legacy fallback in `extension-starter.php`: integration id, name, description, tags, settings, and route path
   - `FLEEKDASH_STARTER_*` constants and `fleekdash_starter_*` function names
   - the plugin header (name, description, URIs)
3. **Build:** `pnpm install && pnpm build`. Confirm `dist/pages/app.html`
   exists.
4. **Activate** the plugin in wp-admin. The FleekDash Hub shows your card and
   `#/app/<your-slug>` mounts your page.

Want a faster iteration loop? The [`fleekdash/devkit`](https://github.com/fleekdash/devkit)
canvas runs your built page inside a mock FleekDash host, with no WordPress
install needed at all.

## How the pieces fit

Your UI runs **inside a FleekDash iframe** (the `component_url` on the route).
Everything host side goes through `window.FleekDashSDK`, typed here via the
vendored `@fleekdash/contracts` package, so there is no hand copied SDK types
file to drift out of date.

### `fleekdash.json` is the contract

The manifest declares your id, routes, settings, requirements and metadata.
It is validated by FleekDash's `ExtensionManifest::validate()` at runtime and
by CI here against `contracts/schema/fleekdash-manifest.schema.json`. Keep
the `$schema` key in place and your editor autocompletes every field.

### Two ways an extension registers

Modern FleekDash (>= 2.6.7) carries `ExtensionAppRegistrar`, which reads the
manifest's `routes` and registers them automatically. The
`Registry::register()` call in `extension-starter.php` is a dormant fallback
for older hosts only: it never runs when the declarative registrar exists,
and it mirrors the manifest field for field so an old host produces the
identical stored manifest. Once your minimum FleekDash version ships the
registrar, the fallback can be deleted entirely.

### Settings

Fields declared under `settings` in the manifest are served to your iframe
through `sdk.getIntegrationSettings()`. To inject fields into FleekDash's own
settings sections instead, use `sections` (or the
`fleekdash_register_settings_fields()` PHP helper).

### Sandbox modes

`sandbox_mode: "none"` is right for same origin, first party pages like this
starter. Use `"strict"` when the iframe loads untrusted or remote content.

## Where to go next

- [`fleekdash/devkit`](https://github.com/fleekdash/devkit) for a no-WordPress
  dev loop with fixture data and a live SDK call log
- [`fleekdash/extensions`](https://github.com/fleekdash/extensions) for real,
  larger reference extensions (`todo-system` is the full API tour)
- [`fleekdash/snippets`](https://github.com/fleekdash/snippets) when your idea
  is small enough to be a single PHP file

## Contributing

Issues and pull requests are welcome. The canonical source of this scaffold
lives in the private FleekDash monorepo and this repository is a synced
mirror, so accepted changes are ported back upstream by the maintainers
before the next sync.

## License

GPL-2.0-or-later, same as WordPress and FleekDash.
