<?php
/**
 * htmx-pack bootstrap - routes, REST endpoints and capabilities for a
 * hypermedia-first FleekDash extension pack.
 *
 * Unlike the SDK-driven starter this pack renders PHP: the iframe route
 * loads admin.php?action=fleekdash_htmxpack_app (cookie auth, capability
 * gate) which emits a full HTML document. htmx then swaps fragments
 * produced by the REST endpoints below; Alpine handles local-only state.
 *
 * Registration is deliberately imperative: component_url needs
 * admin_url(), which fleekdash.json cannot express - and a manifest
 * without a `routes` key is not route-managed, so ExtensionAppRegistrar
 * leaves this row alone (see starter README, "Why no declarative route").
 */

defined('ABSPATH') || exit;

const FLEEKDASH_HTMXPACK_ID = 'htmx-pack';
const FLEEKDASH_HTMXPACK_REGISTRY = 'FleekDash\Integration\Registry';
const FLEEKDASH_HTMXPACK_REST_NS = 'htmxpack/v1';
const FLEEKDASH_HTMXPACK_PAGE_ACTION = 'fleekdash_htmxpack_app';
const FLEEKDASH_HTMXPACK_CAP = 'edit_posts';
// Declared floor for the first release shipping ExtensionAssets - kept
// as requires metadata only. The runtime gate checks class_exists()
// directly: released 2.6.8/2.6.9 builds predate the class and backports
// may carry it on older version strings, so version_compare is wrong
// in both directions.
const FLEEKDASH_HTMXPACK_MIN_CORE = '2.6.10';
const FLEEKDASH_HTMXPACK_ASSETS = 'FleekDash\Extension\ExtensionAssets';
const FLEEKDASH_HTMXPACK_META_KEY = 'fleekdash_htmxpack_notes';

/**
 * Register the app row + iframe route. Always on: the route cannot be
 * declared in fleekdash.json because component_url must be built with
 * admin_url() to survive subdirectory installs. A routes-less manifest
 * is skipped by the declarative registrar, so no double-registration.
 */
function fleekdash_htmxpack_register(): void
{
    if (!\class_exists(FLEEKDASH_HTMXPACK_REGISTRY)) {
        return;
    }

    // Functional gate: the pack needs ExtensionAssets regardless of what
    // FLEEKDASH_VERSION claims (2.6.8/2.6.9 shipped without it). Surface
    // the rejection instead of skipping silently.
    if (!\class_exists(FLEEKDASH_HTMXPACK_ASSETS)) {
        \add_action('admin_notices', static function (): void {
            echo '<div class="notice notice-error"><p>'
                . \esc_html__('HTMX Pack requires a newer FleekDash (ExtensionAssets missing) - update FleekDash and reload.', 'fleekdash-htmxpack')
                . '</p></div>';
        });
        return;
    }

    $registry = FLEEKDASH_HTMXPACK_REGISTRY;
    $registry::register([
        'integration_id' => FLEEKDASH_HTMXPACK_ID,
        'name' => 'HTMX Pack',
        'description' => 'Hypermedia-first extension pack: PHP-rendered page, htmx fragments over REST, Alpine islands. Vendored assets only - no CDN, no build step.',
        'version' => '0.1.0',
        'author' => 'FleekDash',
        'author_uri' => 'https://fleekdash.com',
        'integration_type' => 'standalone',
        'plugin_file' => \plugin_basename(__DIR__ . '/htmx-pack.php'),
        'icon' => 'code',
        'kind' => 'app',
        'source' => 'external',
        'source_label' => 'Plugin',
        'category' => 'developer',
        'requires' => [
            'wp' => '6.5',
            'fleekdash' => FLEEKDASH_HTMXPACK_MIN_CORE,
            'php' => '8.0',
        ],
        'tags' => ['starter', 'template', 'htmx', 'alpine', 'hypermedia'],
        'routes' => [
            [
                'path' => 'htmx-pack',
                'title' => 'HTMX Pack',
                // Imperative routes must append fleekdash_sdk_url themselves -
                // resolveRoute() only injects it for declarative manifest
                // routes, and without it the iframe never posts
                // INTEGRATION_READY, so the shell keeps the loading overlay.
                'component_url' => \add_query_arg(
                    'fleekdash_sdk_url',
                    fleekdash_htmxpack_sdk_url(),
                    \admin_url('admin.php?action=' . FLEEKDASH_HTMXPACK_PAGE_ACTION)
                ),
                'icon' => 'code',
                // Same capability the page and REST endpoints enforce -
                // the shell hides the route for users who cannot open it.
                'permissions' => [FLEEKDASH_HTMXPACK_CAP],
                // First-party same-origin page - no iframe sandbox flags needed.
                'sandbox_mode' => 'none',
            ],
        ],
    ]);
}

add_action('plugins_loaded', 'fleekdash_htmxpack_register', 30);

/* -------------------------------------------------------------------------
 * App page: admin.php?action=fleekdash_htmxpack_app
 * Runs inside wp-admin (cookie auth); emits the full document and exits
 * before admin chrome renders.
 * ---------------------------------------------------------------------- */

add_action('admin_action_' . FLEEKDASH_HTMXPACK_PAGE_ACTION, 'fleekdash_htmxpack_render_app');

function fleekdash_htmxpack_render_app(): void
{
    if (!\current_user_can(FLEEKDASH_HTMXPACK_CAP)) {
        \wp_die(\esc_html__('Sorry, you are not allowed to open this pack.', 'fleekdash-htmxpack'), '', ['response' => 403]);
    }

    \nocache_headers();
    \header('Content-Type: text/html; charset=utf-8');
    require __DIR__ . '/views/app.php';
    exit;
}

/* -------------------------------------------------------------------------
 * REST fragment endpoints - htmx targets.
 * GET/POST/DELETE return text/html fragments served through
 * rest_pre_serve_request (the same raw-response path the core uses for
 * SSE streams). permission_callback re-checks the capability: cookie auth
 * + X-WP-Nonce (wp_rest) which views/app.php embeds via hx-headers.
 * ---------------------------------------------------------------------- */

add_action('rest_api_init', 'fleekdash_htmxpack_register_rest');

function fleekdash_htmxpack_register_rest(): void
{
    // Shared auth policy: cookie auth + wp_rest nonce + capability check,
    // same middleware the core routes use. Guarded: an old/absent core
    // must not fatal every REST request site-wide.
    $caps = \class_exists('FleekDash\Libs\API\RouteAuthMiddleware')
        ? \FleekDash\Libs\API\RouteAuthMiddleware::capability(FLEEKDASH_HTMXPACK_CAP)
        : static fn (): bool => \current_user_can(FLEEKDASH_HTMXPACK_CAP);

    \register_rest_route(FLEEKDASH_HTMXPACK_REST_NS, '/notes', [
        [
            'methods' => 'GET',
            'permission_callback' => $caps,
            'callback' => static function (): \WP_REST_Response {
                return new \WP_REST_Response(fleekdash_htmxpack_fragment_list());
            },
        ],
        [
            'methods' => 'POST',
            'permission_callback' => $caps,
            'callback' => static function (\WP_REST_Request $request) {
                $text = \trim((string) $request->get_param('text'));
                $length = \function_exists('mb_strlen') ? \mb_strlen($text) : \strlen($text);
                if ($text === '' || $length > 280) {
                    return new \WP_Error(
                        'htmxpack_note_invalid',
                        'Note text must be 1-280 characters.',
                        ['status' => 422]
                    );
                }
                $ok = fleekdash_htmxpack_update(static function (array $notes) use ($text): array {
                    \array_unshift($notes, [
                        'id' => (string) \wp_generate_uuid4(),
                        'text' => $text,
                        'done' => false,
                        'created' => \time(),
                    ]);
                    return $notes;
                });
                if (!$ok) {
                    return fleekdash_htmxpack_write_error(false);
                }
                return new \WP_REST_Response(fleekdash_htmxpack_fragment_list());
            },
            'args' => [
                'text' => ['type' => 'string', 'required' => true],
            ],
        ],
    ]);

    \register_rest_route(FLEEKDASH_HTMXPACK_REST_NS, '/notes/(?P<id>[a-z0-9-]+)', [
        [
            'methods' => 'POST',
            'permission_callback' => $caps,
            'callback' => static function (\WP_REST_Request $request) {
                $note = fleekdash_htmxpack_toggle((string) $request->get_param('id'));
                if (\is_wp_error($note)) {
                    return $note;
                }
                if ($note === null) {
                    return new \WP_Error('htmxpack_note_missing', 'Note not found.', ['status' => 404]);
                }
                return new \WP_REST_Response(fleekdash_htmxpack_fragment_row($note));
            },
        ],
        [
            'methods' => 'DELETE',
            'permission_callback' => $caps,
            'callback' => static function (\WP_REST_Request $request) {
                $result = fleekdash_htmxpack_delete((string) $request->get_param('id'));
                if (\is_wp_error($result)) {
                    return $result;
                }
                if (!$result) {
                    return new \WP_Error('htmxpack_note_missing', 'Note not found.', ['status' => 404]);
                }
                return new \WP_REST_Response(fleekdash_htmxpack_fragment_list());
            },
        ],
        'args' => [
            'id' => ['type' => 'string', 'pattern' => '^[a-z0-9-]+$'],
        ],
    ]);
}

/**
 * Serve the pack's fragment responses as text/html instead of the REST
 * default JSON envelope. Mirrors the core's rest_pre_serve_request use.
 */
add_filter('rest_pre_serve_request', 'fleekdash_htmxpack_serve_html', 10, 4);

function fleekdash_htmxpack_serve_html(bool $served, \WP_REST_Response $result, \WP_REST_Request $request): bool
{
    if ($served || !\str_starts_with((string) $request->get_route(), '/' . FLEEKDASH_HTMXPACK_REST_NS . '/')) {
        return $served;
    }

    $body = $result->get_data();
    if (!\is_string($body)) {
        return $served; // WP_Error payloads keep the JSON envelope
    }

    \header('Content-Type: text/html; charset=utf-8');
    // Fragments are per-user (user meta): forbid intermediary reuse.
    \header('Cache-Control: private, no-store, must-revalidate');
    echo $body; // fragments are escaped at render time
    return true;
}

/* -------------------------------------------------------------------------
 * Storage + fragment renderers
 *
 * Notes are scoped to the current user via user meta: personal state is
 * the right demo shape and cross-user writes cannot collide. Mutations
 * run through fleekdash_htmxpack_update() which compare-and-swaps on the
 * stored value (update_user_meta's $prev_value is enforced in the UPDATE
 * statement), so two tabs mutating at once cannot silently drop a write.
 * ---------------------------------------------------------------------- */

/**
 * Normalize stored meta into the item list. The meta value is always an
 * envelope `['items' => [...]]`; a bare list is tolerated for readers so
 * a hand-edited or legacy row still renders.
 *
 * @return array<int, array{id: string, text: string, done: bool, created: int}>
 */
function fleekdash_htmxpack_items($raw): array
{
    if (!\is_array($raw)) {
        return [];
    }
    if (isset($raw['items']) && \is_array($raw['items'])) {
        return \array_values($raw['items']);
    }
    return \array_values($raw); // legacy bare list
}

/**
 * @return array<int, array{id: string, text: string, done: bool, created: int}>
 */
function fleekdash_htmxpack_notes(): array
{
    return fleekdash_htmxpack_items(
        \get_user_meta(\get_current_user_id(), FLEEKDASH_HTMXPACK_META_KEY, true)
    );
}

/**
 * Read-mutate-compare-and-swap loop: $mutator receives the current list
 * and returns the next one; the write only lands when the stored value
 * still equals what was read. Retries a few times on contention.
 *
 * The value is wrapped in `['items' => ...]` because update_user_meta's
 * $prev_value predicate is skipped for empty() values - a bare [] would
 * silently degrade the CAS into an unconditional write. Absent rows take
 * the add_user_meta(..., unique: true) path; that check is a
 * SELECT-then-INSERT (no db-level unique index), so a first-note race
 * can still create duplicate rows - the merge-repair below collapses
 * them by union of note ids on the next read.
 *
 * @param callable(array<int, array{id: string, text: string, done: bool, created: int}>): array<int, array{id: string, text: string, done: bool, created: int}> $mutator
 * @return bool false when every CAS attempt lost - callers must surface an error
 */
function fleekdash_htmxpack_update(callable $mutator): bool
{
    $uid = \get_current_user_id();
    for ($attempt = 0; $attempt < 4; $attempt++) {
        // Read ALL rows for the key: add_user_meta(unique) is a
        // SELECT-then-INSERT without a db-level unique constraint, so a
        // first-note race can leave duplicate rows. Items are merged by
        // union on note id - a duplicate row can only add notes, never
        // remove them, so merging a stale envelope cannot resurrect a
        // deleted note (deleted ids simply are not in any row).
        $rows = \get_user_meta($uid, FLEEKDASH_HTMXPACK_META_KEY, false);
        $count = \is_array($rows) ? \count($rows) : 0;

        $seen = [];
        $merged = [];
        $converged = $count > 0;
        foreach ($rows as $row) {
            if (!\is_array($row) || !isset($row['items'])) {
                $converged = false;
            }
            foreach (fleekdash_htmxpack_items($row) as $note) {
                $id = (string) ($note['id'] ?? '');
                if ($id !== '' && !isset($seen[$id])) {
                    $seen[$id] = true;
                    $merged[] = $note;
                }
            }
        }

        $next = \array_values($mutator($merged));
        $env = ['items' => $next];
        if ($next === $merged && $converged) {
            return true; // every row is already a proper envelope with the desired items
        }

        $anchor = -1;
        $wrote = false;
        if ($count === 0) {
            $wrote = \add_user_meta($uid, FLEEKDASH_HTMXPACK_META_KEY, $env, true);
        } else {
            // CAS anchor: the first non-empty row. A conditional UPDATE on
            // its exact stored value atomically lands the merged+mutated
            // envelope and migrates a legacy bare list in one step.
            foreach ($rows as $i => $row) {
                if (!empty($row)) {
                    $anchor = $i;
                    break;
                }
            }
            if ($anchor === -1) {
                // Every row is an unpredicatable empty value - a unique add
                // can never pass while they exist, so overwrite in place.
                // The only write shape without a value predicate: a racer's
                // insert between read and write would be overwritten, which
                // is why this path is the last resort for corrupt rows only.
                $wrote = (bool) \update_user_meta($uid, FLEEKDASH_HTMXPACK_META_KEY, $env);
            } else {
                $wrote = (bool) \update_user_meta($uid, FLEEKDASH_HTMXPACK_META_KEY, $env, $rows[$anchor]);
                if (!$wrote) {
                    // update_user_meta also returns false when the stored
                    // value already equals $env - re-read to disambiguate
                    // a real CAS miss from an equal-value no-op.
                    \wp_cache_delete($uid, 'user_meta');
                    $wrote = \in_array($env, \get_user_meta($uid, FLEEKDASH_HTMXPACK_META_KEY, false), true);
                }
            }
        }

        if ($wrote) {
            // Collapse the other snapshot rows, each deleted by its exact
            // observed value: rows a racer rewrote no longer match and
            // survive, and rows inserted after the read were never seen.
            // A row whose snapshot value equals $env is never deleted:
            // delete_metadata matches by value, not row identity, so the
            // predicate would also hit the anchor we just wrote (e.g.
            // rows [A] + [B], deleting note A writes {B} into the anchor
            // while the duplicate already holds {B}). Rows carrying $env
            // are redundant mirrors - safe to keep, never safe to delete.
            // Empty-string/false/null rows cannot carry a value predicate
            // in delete_metadata - they are left in place (items() yields
            // nothing for them, so they stay inert).
            foreach ($rows as $i => $row) {
                if ($i === $anchor || $row === $env || '' === $row || false === $row || null === $row) {
                    continue;
                }
                \delete_user_meta($uid, FLEEKDASH_HTMXPACK_META_KEY, $row);
            }
            return true;
        }
        // CAS lost: a failed conditional update leaves the user_meta
        // object cache stale, so the next iteration would re-read (and
        // re-fail on) the same value - invalidate before re-reading.
        \wp_cache_delete($uid, 'user_meta');
    }
    return false;
}

/**
 * @return \WP_Error|null
 */
function fleekdash_htmxpack_write_error(bool $ok)
{
    return $ok ? null : new \WP_Error(
        'htmxpack_write_conflict',
        'Could not save your change - please try again.',
        ['status' => 409]
    );
}

/**
 * @return array{id: string, text: string, done: bool, created: int}|\WP_Error|null
 */
function fleekdash_htmxpack_toggle(string $id)
{
    $toggled = null;
    $ok = fleekdash_htmxpack_update(static function (array $notes) use ($id, &$toggled): array {
        foreach ($notes as $i => $note) {
            if (($note['id'] ?? '') === $id) {
                $notes[$i]['done'] = empty($note['done']);
                $toggled = $notes[$i];
                break;
            }
        }
        return $notes;
    });
    return fleekdash_htmxpack_write_error($ok) ?? $toggled;
}

/**
 * @return bool|\WP_Error
 */
function fleekdash_htmxpack_delete(string $id)
{
    $found = false;
    $ok = fleekdash_htmxpack_update(static function (array $notes) use ($id, &$found): array {
        $keep = \array_values(\array_filter($notes, static fn ($note) => ($note['id'] ?? '') !== $id));
        $found = \count($keep) !== \count($notes);
        return $keep;
    });
    return fleekdash_htmxpack_write_error($ok) ?? $found;
}

function fleekdash_htmxpack_rest_url(string $path = ''): string
{
    return \rest_url(FLEEKDASH_HTMXPACK_REST_NS . '/notes' . $path);
}

/**
 * The only SDK URL this pack ever emits - identical to what
 * ExtensionAppRegistrar::resolveRoute() appends to declarative routes.
 * views/app.php accepts fleekdash_sdk_url strictly equal to this.
 */
function fleekdash_htmxpack_sdk_url(): string
{
    return \plugins_url(
        'public/sdk/fleekdash-sdk.js',
        \defined('FLEEKDASH_PLUGIN_FILE') ? \FLEEKDASH_PLUGIN_FILE : __FILE__
    );
}

/**
 * Compare two URLs ignoring http<->https scheme drift: sites with an
 * http siteurl serving https admin produce the same SDK file under both
 * schemes. Host, port and path must still match exactly, so an arbitrary
 * same-origin URL (uploads, reflected endpoints) is rejected.
 */
function fleekdash_htmxpack_same_url(string $a, string $b): bool
{
    $normalize = static fn (string $u): string => \preg_replace('#^https?://#i', '//', \untrailingslashit($u));
    return \hash_equals($normalize($a), $normalize($b));
}

require __DIR__ . '/views/fragments.php';

/* -------------------------------------------------------------------------
 * Lifecycle - mirrors extension-starter.php.
 * ---------------------------------------------------------------------- */

register_activation_hook(__DIR__ . '/htmx-pack.php', static function (): void {
    fleekdash_htmxpack_register();
    if (\class_exists(FLEEKDASH_HTMXPACK_REGISTRY)) {
        $registry = FLEEKDASH_HTMXPACK_REGISTRY;
        $registry::activate(FLEEKDASH_HTMXPACK_ID);
    }
});

register_deactivation_hook(__DIR__ . '/htmx-pack.php', static function (): void {
    if (\class_exists(FLEEKDASH_HTMXPACK_REGISTRY)) {
        $registry = FLEEKDASH_HTMXPACK_REGISTRY;
        $registry::deactivate(FLEEKDASH_HTMXPACK_ID);
    }
});
