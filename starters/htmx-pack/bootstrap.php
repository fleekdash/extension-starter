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
const FLEEKDASH_HTMXPACK_MIN_CORE = '2.6.8';
const FLEEKDASH_HTMXPACK_OPTION = 'fleekdash_htmxpack_notes';

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

    if (!\defined('FLEEKDASH_VERSION') || \version_compare((string) FLEEKDASH_VERSION, FLEEKDASH_HTMXPACK_MIN_CORE, '<')) {
        return; // requires ExtensionAssets (core 2.6.8+) for vendored htmx/Alpine
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
                'component_url' => \admin_url('admin.php?action=' . FLEEKDASH_HTMXPACK_PAGE_ACTION),
                'icon' => 'code',
                'permissions' => ['authenticated'],
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
    $caps = static function (): bool {
        return \current_user_can(FLEEKDASH_HTMXPACK_CAP);
    };

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
                if ($text === '' || \mb_strlen($text) > 280) {
                    return new \WP_Error(
                        'htmxpack_note_invalid',
                        'Note text must be 1-280 characters.',
                        ['status' => 422]
                    );
                }
                $notes = fleekdash_htmxpack_notes();
                \array_unshift($notes, [
                    'id' => (string) \wp_generate_uuid4(),
                    'text' => $text,
                    'done' => false,
                    'created' => \time(),
                ]);
                \update_option(FLEEKDASH_HTMXPACK_OPTION, $notes, false);
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
                if (!fleekdash_htmxpack_delete((string) $request->get_param('id'))) {
                    return new \WP_Error('htmxpack_note_missing', 'Note not found.', ['status' => 404]);
                }
                return new \WP_REST_Response(fleekdash_htmxpack_fragment_list());
            },
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
    echo $body; // fragments are escaped at render time
    return true;
}

/* -------------------------------------------------------------------------
 * Storage + fragment renderers
 * ---------------------------------------------------------------------- */

/**
 * @return array<int, array{id: string, text: string, done: bool, created: int}>
 */
function fleekdash_htmxpack_notes(): array
{
    $notes = \get_option(FLEEKDASH_HTMXPACK_OPTION, []);
    return \is_array($notes) ? $notes : [];
}

/**
 * @return array{id: string, text: string, done: bool, created: int}|null
 */
function fleekdash_htmxpack_toggle(string $id): ?array
{
    $notes = fleekdash_htmxpack_notes();
    foreach ($notes as $i => $note) {
        if (($note['id'] ?? '') === $id) {
            $notes[$i]['done'] = empty($note['done']);
            \update_option(FLEEKDASH_HTMXPACK_OPTION, $notes, false);
            return $notes[$i];
        }
    }
    return null;
}

function fleekdash_htmxpack_delete(string $id): bool
{
    $notes = fleekdash_htmxpack_notes();
    $keep = \array_values(\array_filter($notes, static fn ($note) => ($note['id'] ?? '') !== $id));
    if (\count($keep) === \count($notes)) {
        return false;
    }
    \update_option(FLEEKDASH_HTMXPACK_OPTION, $keep, false);
    return true;
}

function fleekdash_htmxpack_rest_url(string $path = ''): string
{
    return \rest_url(FLEEKDASH_HTMXPACK_REST_NS . '/notes' . $path);
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
