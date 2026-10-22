# htmx-pack - hypermedia-first FleekDash extension pack

A copy-and-extend starter for **PHP-rendered FleekDash extensions**: no
build step, no CDN, no JavaScript bundler. The server renders HTML;
htmx swaps fragments; Alpine islands handle local state. This is the
pack shape agent-generated extensions use (see the F3 extension vision:
LLMs produce auditable PHP + HTML far more reliably than bundled React).

```
htmx-pack/
├── htmx-pack.php        Plugin header → bootstrap.php
├── bootstrap.php        register() + admin.php page + REST fragment endpoints + caps
├── fleekdash.json       Metadata + requires (no `routes` key - see below)
├── views/
│   ├── app.php          Full-document page (vendored htmx + Alpine + SDK ready)
│   └── fragments.php    Shared fragment renderers (escaped)
└── assets/pack.css      Minimal styles (.hxp- prefixed)
```

## How it fits together

```
iframe ──GET──▶ /wp-admin/admin.php?action=fleekdash_htmxpack_app
                   │  cookie auth + current_user_can('edit_posts')
                   ▼  views/app.php: full HTML document
                      · ExtensionAssets::renderScriptTags(['htmx','alpinejs'])
                      · same-origin-validated fleekdash_sdk_url + SDK.init()
                        (posts INTEGRATION_READY - lifts the host overlay)
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
reference a CDN** - vendoring is a hard requirement so packs are
auditable and work offline.

**Ready signal.** The host keeps a new iframe behind a loading overlay
until the MessageBus delivers `INTEGRATION_READY`. Imperative routes do
not get `fleekdash_sdk_url` injected by `resolveRoute()` - the pack
appends it to `component_url` itself via `add_query_arg()` in
`bootstrap.php` (same `plugins_url('public/sdk/fleekdash-sdk.js')` the
core uses). `views/app.php` emits the SDK tag only when the param
matches that exact URL, then calls
`FleekDashSDK.init({ integration_id })`, which reads the nonces from
the URL and posts ready. Standalone visits (no `fleekdash_sdk_url`
param) simply skip the SDK. Do not hand-post ready messages: the SDK is
the protocol owner.

**Page route.** `component_url` must come from `admin_url()` (or
`rest_url()`) so subdirectory installs keep working - which is exactly
why the route is registered imperatively in `bootstrap.php` and
`fleekdash.json` carries **no `routes` key**: a routes-less `kind: app`
manifest is not route-managed, and `ExtensionAppRegistrar` leaves the
row untouched (no double registration). The admin.php action hooks
`admin_action_<action>`; output a complete document and `exit` before
admin chrome renders.

**Auth model.** Two layers, both required - and the route declares the
same capability so the shell hides it from users who cannot open it:

- Route visibility: `permissions: ['edit_posts']` on the registered
  route (matches the handlers below, not the generic `authenticated`).
- Page load: `admin.php` runs under normal wp-admin cookie auth; the
  handler re-checks `current_user_can(FLEEKDASH_HTMXPACK_CAP)`.
- Fragment/API calls: REST cookie auth needs `X-WP-Nonce` with a
  `wp_rest` nonce. `views/app.php` mints one with
  `wp_create_nonce('wp_rest')` and ships it on `<body hx-headers>` -
  inherited by every htmx request including swapped-in content. Every
  REST route re-checks the same capability in `permission_callback`.

**Fragments.** Register REST routes, return `WP_REST_Response` with an
HTML string, then let `rest_pre_serve_request` serve it as `text/html`.
Non-string payloads (WP_Error) keep the JSON envelope so htmx's
`responseError` handling still gets structured errors. Escape at render
time (`esc_html`, `esc_attr`, `esc_url`); never interpolate raw request
or meta data.

**Failure hygiene.** htmx only swaps on success, but it still fires
`htmx:after-request` for errors - always check
`$event.detail.successful` before resetting forms or busy states (the
form keeps its draft on failure; the toggle re-enables itself).

**Lifecycle.** `plugins_loaded` → `register()` (gated on
`class_exists(ExtensionAssets)` and `FLEEKDASH_VERSION` ≥ min core - the
class check is the functional gate because released 2.6.8/2.6.9 builds
predate it); activation → `register()` + `activate`; deactivation →
`deactivate`. Notes are stored per-user in `FLEEKDASH_HTMXPACK_META_KEY`
user meta: personal state is the honest demo shape and cross-user
writes cannot collide.

## Install

Copy `starters/htmx-pack/` into `wp-content/plugins/`, rename the
`htmxpack`/`htmx-pack`/`FLEEKDASH_HTMXPACK_*` identifiers, then activate.
Requires FleekDash ≥ 2.6.10 (the first release shipping ExtensionAssets;
2.6.8/2.6.9 predate it). The route appears in the FleekDash shell as
**HTMX Pack** on the next registry sync.

## What to extend

| Need | Where |
|---|---|
| Another list/detail screen | New fragment renderer + REST route in `bootstrap.php`; new `hx-*` target in `app.php` |
| Richer client state (modal, tabs) | Alpine `x-data` islands - keep it local; anything shared goes through htmx |
| A JSON API (not fragments) | Return a normal array from the REST callback - the HTML filter only touches string bodies under this namespace |
| Settings page | Add `settings_schema` to `register()` (and `settings` to the manifest); read via `FleekDash\Extension\ExtensionSettingsStore` |
| Agent-generated packs | This directory is the reference shape; agents copy it, then edit `bootstrap.php` + `views/` only |

## Deliberate choices

- **Imperative route, no manifest `routes`:** `component_url` needs
  `admin_url()` - unexpressible in static JSON. Documented above.
- **Server-rendered initial list:** avoids a load-time `hx-get` flash.
- **`hx-confirm` for deletes:** native confirm, zero JS to audit.
- **Per-user storage:** `update_user_meta` beats a global option for a
  notes demo - notes are personal and concurrent users cannot clobber
  each other.
- **SDK for ready only:** the pack talks REST directly; the SDK exists
  solely to lift the host's loading overlay (plus whatever host calls a
  pack later wants).

## Accepted limitations

- **Same-user concurrent edits:** mutations run compare-and-swap
  through `fleekdash_htmxpack_update()`: an envelope value so the
  `$prev_value` predicate always engages, `add_user_meta(unique)` for
  the first write, duplicate rows merged by id when a first-note race
  slips through (WordPress enforces no unique index on user meta), and
  object-cache invalidation between retries. A lost write surfaces as
  a 409 in the error region. It is still read-modify-write at the
  storage layer - packs that outgrow it move to per-note meta rows or
  a custom table; the fragment contract does not change.
- **No offline preview:** the devkit canvas mocks the MessageBus host,
  which this pack does not use. Preview is `wp-admin` on a dev site
  (or a future `fd-dev --php` wrapper).
