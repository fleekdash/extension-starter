# htmx-pack - hypermedia-first FleekDash extension pack

A copy-and-extend starter for **PHP-rendered FleekDash extensions**: no
build step, no CDN, no JavaScript bundler, **no pack stylesheet**. The
server renders HTML; htmx swaps fragments; Alpine islands handle local
state; **Fleek UI** (`fleek-ui.css`) supplies every visual: tokens,
Tailwind utilities, `fui-*` component classes. This is the pack shape
agent-generated extensions use (see the F3 extension vision: LLMs
produce auditable PHP + HTML far more reliably than bundled React).

```
htmx-pack/
├── htmx-pack.php        Plugin header → bootstrap.php
├── bootstrap.php        register() + admin.php page + REST fragment endpoints + caps
├── fleekdash.json       Metadata + requires (no `routes` key - see below)
└── views/
    ├── app.php          Full-document page (fleek-ui.css + vendored htmx/Alpine + SDK ready)
    └── fragments.php    Shared fragment renderers (escaped, utility classes only)
```

## How it fits together

```
iframe ──GET──▶ /wp-admin/admin.php?action=fleekdash_htmxpack_app
                   │  cookie auth + current_user_can('edit_posts')
                   ▼  views/app.php: full HTML document
                      · ExtensionAssets::renderLinkTags([ExtensionAssets::FLEEK_UI])
                      · ExtensionAssets::renderScriptTags(['htmx','alpinejs'])
                      · <body class="fleek-ui">  ← scoped base reset lives here
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
loader. `renderLinkTags([ExtensionAssets::FLEEK_UI])` emits the vendored
`fleek-ui.css` `<link>`; `renderScriptTags(['htmx', 'alpinejs'])` emits
the vendored `<script>` tags (htmx synchronous, Alpine `defer`). Pack
pages render outside `wp_head`, so the helper emits tags instead of
enqueueing. **Never reference a CDN** - vendoring is a hard requirement
so packs are auditable and work offline.

**Styling - Fleek UI, not pack CSS.** There is no `pack.css`: every
visual comes from `fleek-ui.css`, generated from the same design tokens
as the host shell. Rules for authoring views:

- `<body class="fleek-ui">` (or any wrapper element) opts into the
  scoped base reset + typography - outside it, nothing is reset.
- Compose **Tailwind utilities** + **`fui-*` component classes**
  (`fui-btn`, `fui-input`, `fui-card`, `fui-badge`, `fui-skeleton`).
- **Never write a hex color, a custom color class, or a pack
  stylesheet.** Semantic tokens (`bg-card`, `text-muted-foreground`,
  `border-border`, `bg-primary`, `text-destructive`, `bg-popover`…)
  re-resolve automatically when the user switches theme, palette or
  dark/light - hardcoded colors do not.
- State-dependent classes are emitted **server-side** (see the is-done
  ternary in `fragments.php`) - no client-side class toggling needed.
- Dark mode works via the `.dark` class the host puts on the iframe
  `<html>`; `dark:` utilities and `.dark` token overrides respond to it.
- Alpine needs `x-cloak` on anything hidden until boot - the base layer
  ships the `[x-cloak]` rule. htmx busy states use `htmx-indicator` /
  `htmx-indicator-hide`.
- The full class inventory + component snippets live in the Fleek UI
  authoring guide (`docs/future/fleek-ui/technical-reference/`) and the
  copyable blocks under `packages/design-system/snippets/`.

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
`class_exists(ExtensionAssets)` + `method_exists('renderLinkTags')` -
the functional check because released builds may carry partial
backports); activation → `register()` + `activate`; deactivation →
`deactivate`. Notes are stored per-user in `FLEEKDASH_HTMXPACK_META_KEY`
user meta: personal state is the honest demo shape and cross-user
writes cannot collide.

## Install

Copy `starters/htmx-pack/` into `wp-content/plugins/`, rename the
`htmxpack`/`htmx-pack`/`FLEEKDASH_HTMXPACK_*` identifiers, then activate.
Requires a FleekDash build shipping `ExtensionAssets::renderLinkTags`
and the `fleek-ui` handle. The route appears in the FleekDash shell as
**HTMX Pack** on the next registry sync.

## What to extend

| Need | Where |
|---|---|
| Another list/detail screen | New fragment renderer + REST route in `bootstrap.php`; new `hx-*` target in `app.php` |
| Richer client state (modal, tabs) | Alpine `x-data` islands - copy a block from `packages/design-system/snippets/` |
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
- **Zero pack CSS:** duplicating tokens per pack is what made old packs
  drift from the active theme. `fleek-ui.css` exists so a pack can be
  complete without a single authored style rule.

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
