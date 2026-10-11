<?php
/**
 * Plugin Name:       FleekDash Extension Starter
 * Plugin URI:        https://github.com/fleekdash/extension-starter
 * Description:       Reference FleekDash extension — one iframe app route, one settings field, typed SDK usage. Rename ids/prefixes and build from here.
 * Version:           0.1.0
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

/**
 * Register/re-sync the app route in the FleekDash registry.
 *
 * Transitional model: `fleekdash.json` declares the extension (Hub card,
 * requirements, settings); routes still go through Registry::register()
 * until the manifest absorbs them.
 */
function fleekdash_starter_register(): void
{
    if (!\class_exists(FLEEKDASH_STARTER_REGISTRY)) {
        return;
    }

    $page = 'dist/pages/app.html';
    if (!\is_file(__DIR__ . '/' . $page)) {
        if (\function_exists('fleekdash_log_error')) {
            \fleekdash_log_error('[extension-starter] dist build missing — run `pnpm build` in the extension dir.');
        }
        return;
    }

    // Do not expose an integration whose declared FleekDash requirement is unmet.
    if (\defined('FLEEKDASH_VERSION') && \version_compare((string) FLEEKDASH_VERSION, '2.6.7', '<')) {
        return;
    }

    $registry = FLEEKDASH_STARTER_REGISTRY;
    $registry::register([
        'integration_id' => FLEEKDASH_STARTER_ID,
        'name' => 'Extension Starter',
        'description' => 'Reference FleekDash extension scaffold.',
        'version' => '0.1.0',
        'author' => 'FleekDash',
        'integration_type' => 'standalone',
        'plugin_file' => \plugin_basename(__FILE__),
        'icon' => 'sparkles',
        'source' => 'external',
        'category' => 'developer',
        'requires' => [
            'wp' => '6.5',
            'php' => '8.0',
            'fleekdash' => '2.6.7',
        ],
        'settings_schema' => [
            'welcome_text' => [
                'type' => 'string',
                'label' => 'Welcome text',
                'description' => 'Shown on the starter app page — demonstrates getIntegrationSettings().',
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
                // First-party same-origin page — no iframe sandbox flags needed.
                'sandbox_mode' => 'none',
            ],
        ],
    ]);
}

add_action('plugins_loaded', 'fleekdash_starter_register', 30);

register_activation_hook(__FILE__, static function (): void {
    fleekdash_starter_register();
    if (\class_exists(FLEEKDASH_STARTER_REGISTRY)) {
        $registry = FLEEKDASH_STARTER_REGISTRY;
        $registry::activate(FLEEKDASH_STARTER_ID);
    }
});

register_deactivation_hook(__FILE__, static function (): void {
    if (\class_exists(FLEEKDASH_STARTER_REGISTRY)) {
        $registry = FLEEKDASH_STARTER_REGISTRY;
        $registry::deactivate(FLEEKDASH_STARTER_ID);
    }
});
