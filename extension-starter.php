<?php
/**
 * Plugin Name:       FleekDash Extension Starter
 * Plugin URI:        https://github.com/fleekdash/extension-starter
 * Description:       The reference FleekDash extension scaffold: one iframe app route, one native dashboard page, one settings field, declarative data sources, typed SDK usage. Rename ids/prefixes and build from here.
 * Version:           0.2.0
 * Requires at least: 6.5
 * Requires PHP:      8.0
 * Requires Plugins:  fleekdash
 * Author:            FleekDash
 * Author URI:        https://fleekdash.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

defined('ABSPATH') || exit;

const FLEEKDASH_STARTER_ID = 'extension-starter';
const FLEEKDASH_STARTER_REGISTRY = 'FleekDash\Integration\Registry';
const FLEEKDASH_STARTER_REGISTRAR = 'FleekDash\Extension\ExtensionAppRegistrar';

/**
 * True when the host FleekDash carries the declarative app registrar -
 * `fleekdash.json` is then the single writer (manifest sync owns the row,
 * lifecycle reconcile handles is_active) and every imperative path below
 * stays dormant. Only released FleekDash builds predating the registrar
 * still execute the PHP fallback.
 */
function fleekdash_starter_has_declarative_registrar(): bool
{
    return \class_exists(FLEEKDASH_STARTER_REGISTRAR);
}

/**
 * Register/re-sync the app route in the FleekDash registry.
 *
 * Legacy fallback for FleekDash releases without the declarative registrar:
 * this register() still owns the row there, so the payload MUST keep
 * mirroring the manifest on every forwarded field (`requires` key order
 * wp/fleekdash/php is significant because the discovery layer normalizes
 * it). Once your minimum supported FleekDash ships the registrar, delete
 * this function plus the hooks below entirely.
 */
function fleekdash_starter_register(): void
{
    if (fleekdash_starter_has_declarative_registrar() || !\class_exists(FLEEKDASH_STARTER_REGISTRY)) {
        return;
    }

    $page = 'dist/pages/app.html';
    if (!\is_file(__DIR__ . '/' . $page)) {
        if (\function_exists('fleekdash_log_error')) {
            \fleekdash_log_error('[extension-starter] dist build missing - run `pnpm build` in the extension dir.');
        }
        return;
    }

    // Do not expose an integration whose declared FleekDash requirement is unmet.
    if (!\defined('FLEEKDASH_VERSION') || \version_compare((string) FLEEKDASH_VERSION, '2.6.7', '<')) {
        return;
    }

    $registry = FLEEKDASH_STARTER_REGISTRY;
    $registry::register([
        'integration_id' => FLEEKDASH_STARTER_ID,
        'name' => 'Extension Starter',
        'description' => 'The reference FleekDash extension scaffold: one iframe app route, one native dashboard page, one settings field, declarative data sources, typed SDK usage. Rename and build from here.',
        'version' => '0.2.0',
        'author' => 'FleekDash',
        'author_uri' => 'https://fleekdash.com',
        'integration_type' => 'standalone',
        'plugin_file' => \plugin_basename(__FILE__),
        'icon' => 'sparkles',
        'kind' => 'app',
        'source' => 'external',
        'source_label' => 'Plugin',
        'category' => 'developer',
        // Key order matters for the parity hash: the manifest discovery
        // normalizes `requires` to wp/fleekdash/php - mirror it exactly.
        'requires' => [
            'wp' => '6.5',
            'fleekdash' => '2.6.7',
            'php' => '8.0',
        ],
        'tags' => ['starter', 'template', 'reference'],
        'settings_schema' => [
            'welcome_text' => [
                'type' => 'string',
                'label' => 'Welcome text',
                'description' => 'Shown on the starter app page - demonstrates getIntegrationSettings().',
                'default' => 'Hello from FleekDash',
            ],
        ],
        'routes' => [
            [
                'path' => 'extension-starter',
                'title' => 'Starter App',
                'component_url' => \add_query_arg(
                    'fleekdash_sdk_url',
                    \plugins_url('public/sdk/fleekdash-sdk.js', \defined('FLEEKDASH_PLUGIN_FILE') ? FLEEKDASH_PLUGIN_FILE : __FILE__),
                    \plugins_url($page, __FILE__)
                ),
                'icon' => 'sparkles',
                'permissions' => ['authenticated'],
                // First-party same-origin page - no iframe sandbox flags needed.
                'sandbox_mode' => 'none',
            ],
        ],
    ]);
}

add_action('plugins_loaded', 'fleekdash_starter_register', 30);

register_activation_hook(__FILE__, static function (): void {
    if (fleekdash_starter_has_declarative_registrar()) {
        return; // manifest sync creates/activates the row on the next request
    }
    if (!\defined('FLEEKDASH_VERSION') || \version_compare((string) FLEEKDASH_VERSION, '2.6.7', '<')) {
        return;
    }
    fleekdash_starter_register();
    if (\class_exists(FLEEKDASH_STARTER_REGISTRY)) {
        $registry = FLEEKDASH_STARTER_REGISTRY;
        $registry::activate(FLEEKDASH_STARTER_ID);
    }
});

register_deactivation_hook(__FILE__, static function (): void {
    if (fleekdash_starter_has_declarative_registrar()) {
        return; // reconcileActivation flips is_active on the next sync
    }
    if (\class_exists(FLEEKDASH_STARTER_REGISTRY)) {
        $registry = FLEEKDASH_STARTER_REGISTRY;
        $registry::deactivate(FLEEKDASH_STARTER_ID);
    }
});

/**
 * Demo REST endpoints backing the manifest `data_sources[]`.
 *
 * The `ext-rest` connector fetches each declared `rest_route` (site-relative,
 * mounted under /wp-json automatically) and projects the payload onto the
 * declared `shape`. What a source returns is your data — these return static
 * demo values; replace with real queries.
 *
 * Contract per shape:
 * - metric-cards: a card array (or {cards: [...]}) of
 *   {id: string, value: number, format?, currency?, growth?, changeValue?,
 *   changeType?, sparkline?}. The first card re-keys to the source id, so a
 *   widget item bound to `ext.<id>.<name>` resolves it.
 * - table-rows: an array of row objects. `columns` on the manifest drives
 *   the grid; undeclared columns derive from the first row.
 */
function fleekdash_starter_rest_cards(): WP_REST_Response
{
    return new WP_REST_Response([
        [
            'id' => 'ext.' . FLEEKDASH_STARTER_ID . '.cards',
            'value' => 1284,
            'format' => 'number',
            'growth' => 12.5,
            'changeValue' => '+12.5%',
            'changeType' => 'positive',
            'sparkline' => [
                ['date' => '2026-10-01', 'value' => 940],
                ['date' => '2026-10-08', 'value' => 1010],
                ['date' => '2026-10-15', 'value' => 1160],
                ['date' => '2026-10-22', 'value' => 1284],
            ],
        ],
    ]);
}

function fleekdash_starter_rest_tasks(): WP_REST_Response
{
    return new WP_REST_Response([
        ['id' => 'task-1', 'title' => 'Wire the iframe route', 'assignee' => 'Ada', 'status' => 'done'],
        ['id' => 'task-2', 'title' => 'Declare a native page', 'assignee' => 'Grace', 'status' => 'in-progress'],
        ['id' => 'task-3', 'title' => 'Bind a data source', 'assignee' => 'Linus', 'status' => 'todo'],
    ]);
}

add_action('rest_api_init', static function (): void {
    $authenticated = static function (): bool {
        return \is_user_logged_in();
    };
    \register_rest_route('extension-starter/v1', '/cards', [
        'methods' => 'GET',
        'callback' => 'fleekdash_starter_rest_cards',
        'permission_callback' => $authenticated,
    ]);
    \register_rest_route('extension-starter/v1', '/tasks', [
        'methods' => 'GET',
        'callback' => 'fleekdash_starter_rest_tasks',
        'permission_callback' => $authenticated,
    ]);
});
