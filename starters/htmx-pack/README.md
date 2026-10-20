# htmx-pack — hypermedia-first FleekDash extension pack

A copy-and-extend starter for **PHP-rendered FleekDash extensions**: no
build step, no CDN, no JavaScript bundler. The server renders HTML;
htmx swaps fragments; Alpine islands handle local state. This is the
pack shape agent-generated extensions use (see the F3 extension vision:
LLMs produce auditable PHP + HTML far more reliably than bundled React).

```
htmx-pack/
├── htmx-pack.php        Plugin header → bootstrap.php
├── bootstrap.php        register() + admin.php page + REST fragment endpoints + caps
├── fleekdash.json       Metadata + requires (no `routes` key — see below)
├── views/
│   ├── app.php          Full-document page (vendored htmx + Alpine)
│   └── fragments.php    Shared fragment renderers (escaped)
└── assets/pack.css      Minimal styles (.hxp- prefixed)
```

## How it fits together

```
iframe ──GET──▶ /wp-admin/admin.php?action=fleekdash_htmxpack_app
                   │  cookie auth + current_user_can('edit_posts')
                   ▼  views/app.php: full HTML document
                      · ExtensionAssets::renderScriptTags(['htmx','alpinejs'])
                      · hx-headers='{"X-WP-Nonce": "<wp_rest nonce>"}' on <body>
                      · initial list rendered server-side (no fetch flash)
        htmx ─────▶ /wp-json/htmxpack/v1/notes  (GET/POST/DELETE)
                   │  REST cookie auth + X-WP-Nonce header + capability gate
                   ▼  fragments.php → text/html via rest_pre_serve_request
                      (same raw-response hook the core uses for SSE streams)
```

## The contract (what you may rely on)

**Assets.** `FleekDash\Extension\ExtensionAssets` is the only sanctioned
loader: `renderScriptTags(['htmx', 'alpinejs'])` emits `<script>` tags
pointing at vendored copies under `public/vendor/` in the FleekDash
plugin (htmx synchronous, Alpine `defer`). Pack pages render outside
`wp_head`, so the helper emits tags instead of enqueueing. **Never
reference a CDN** — vendoring is a hard requirement so packs are
auditable and work offline.

**Page route.** `component_url` must come from `admin_url()` (or
`rest_url()`) so subdirectory installs keep working — which is exactly
why the route is registered imperatively in `bootstrap.php` and
`fleekdash.json` carries **no `routes` key**: a routes-less `kind: app`
manifest is not route-managed, and `ExtensionAppRegistrar` leaves the
row untouched (no double registration). The admin.php action hooks
`admin_action_<action>`; output a complete document and `exit` before
admin chrome renders.

**Auth model.** Two layers, both required:

- Page load: `admin.php` runs under normal wp-admin cookie auth; the
  handler re-checks `current_user_can(FLEEKDASH_HTMXPACK_CAP)`.
- Fragment/API calls: REST cookie auth needs `X-WP-Nonce` with a
  `wp_rest` nonce. `views/app.php` mints one with
  `wp_create_nonce('wp_rest')` and ships it on `<body hx-headers>` —
  inherited by every htmx request including swapped-in content. Every
  REST route re-checks the same capability in `permission_callback`.

**Fragments.** Register REST routes, return `WP_REST_Response` with an
HTML string, then let `rest_pre_serve_request` serve it as `text/html`.
Non-string payloads (WP_Error) keep the JSON envelope so htmx's
`responseError` handling still gets structured errors. Escape at render
time (`esc_html`, `esc_attr`, `esc_url`); never interpolate raw request
or option data.

**Lifecycle.** `plugins_loaded` → `register()` (gated on
`FLEEKDASH_VERSION` ≥ min core); activation → `register()` + `activate`;
deactivation → `deactivate`. Storage here is a single option
(`update_option` with autoload off) — swap for CPT/tables as needed.

## Install

Copy `starters/htmx-pack/` into `wp-content/plugins/`, rename the
`htmxpack`/`htmx-pack`/`FLEEKDASH_HTMXPACK_*` identifiers, then activate.
Requires FleekDash ≥ 2.6.8 (ExtensionAssets). The route appears in the
FleekDash shell as **HTMX Pack** on the next registry sync.

## What to extend

| Need | Where |
|---|---|
| Another list/detail screen | New fragment renderer + REST route in `bootstrap.php`; new `hx-*` target in `app.php` |
| Richer client state (modal, tabs) | Alpine `x-data` islands — keep it local; anything shared goes through htmx |
| A JSON API (not fragments) | Return a normal array from the REST callback — the HTML filter only touches string bodies under this namespace |
| Settings page | Add `settings_schema` to `register()` (and `settings` to the manifest); read via `FleekDash\Extension\ExtensionSettingsStore` |
| Agent-generated packs | This directory is the reference shape; agents copy it, then edit `bootstrap.php` + `views/` only |

## Deliberate choices

- **Imperative route, no manifest `routes`:** `component_url` needs
  `admin_url()` — unexpressible in static JSON. Documented above.
- **Server-rendered initial list:** avoids a load-time `hx-get` flash.
- **`hx-confirm` for deletes:** native confirm, zero JS to audit.
- **Options-table storage:** the smallest honest demo; the swap contract
  (fragment out, mutation in) is identical for CPT/meta storage.
- **No FleekDash SDK:** this pack renders inside the same-origin admin
  frame and talks REST directly; the SDK is for JS-app extensions.
