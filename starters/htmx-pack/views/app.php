<?php
/**
 * Full-document view for admin.php?action=fleekdash_htmxpack_app.
 * Runs inside wp-admin (cookie auth + capability gate upstream), emits a
 * clean page - no wp-admin chrome - with vendored htmx + Alpine from
 * FleekDash\Extension\ExtensionAssets. Never loads assets from a CDN.
 */

defined('ABSPATH') || exit;

if (!\class_exists('FleekDash\Extension\ExtensionAssets')) {
    \wp_die(\esc_html__('This pack requires FleekDash ' . FLEEKDASH_HTMXPACK_MIN_CORE . ' or newer (ExtensionAssets).', 'fleekdash-htmxpack'));
}

$rest_nonce = \wp_create_nonce('wp_rest');
$css_url = \plugins_url('assets/pack.css', __DIR__ . '/bootstrap.php');
?>
<!DOCTYPE html>
<html <?php \language_attributes(); ?>>
<head>
<meta charset="<?php \bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php \esc_html_e('HTMX Pack', 'fleekdash-htmxpack'); ?></title>
<link rel="stylesheet" href="<?php echo \esc_url($css_url); ?>">
<?php
// Vendored FleekDash assets: htmx (sync) + Alpine (defer). This is the
// only sanctioned way to load them - do not add CDN <script> tags.
\FleekDash\Extension\ExtensionAssets::renderScriptTags(['htmx', 'alpinejs']);
?>
</head>
<body
    class="hxp-body"
    hx-headers='<?php echo \esc_attr(\wp_json_encode(['X-WP-Nonce' => $rest_nonce])); ?>'
>
    <main class="hxp-wrap">
        <header class="hxp-head">
            <h1><?php \esc_html_e('HTMX Pack - Notes', 'fleekdash-htmxpack'); ?></h1>
            <button
                type="button"
                class="hxp-btn"
                hx-get="<?php echo \esc_url(fleekdash_htmxpack_rest_url()); ?>"
                hx-target="#notes-list"
                hx-swap="outerHTML"
            ><?php \esc_html_e('Refresh', 'fleekdash-htmxpack'); ?></button>
        </header>

        <!-- Initial render is server-side; later updates come from htmx swaps. -->
        <?php echo fleekdash_htmxpack_fragment_list(); ?>

        <!-- Alpine island: local-only state (character counter + disabled submit). -->
        <form
            class="hxp-form"
            x-data="{ text: '', max: 280 }"
            x-on:htmx:after-request.window="if ($event.detail.elt === $el) { text = ''; $el.reset(); }"
            hx-post="<?php echo \esc_url(fleekdash_htmxpack_rest_url()); ?>"
            hx-target="#notes-list"
            hx-swap="outerHTML"
        >
            <textarea
                name="text"
                rows="2"
                x-model="text"
                x-bind:maxlength="max"
                placeholder="<?php \esc_attr_e('Write a note...', 'fleekdash-htmxpack'); ?>"
                required
            ></textarea>
            <div class="hxp-form-foot">
                <span class="hxp-count" x-text="text.length + ' / ' + max"></span>
                <button type="submit" class="hxp-btn hxp-btn-primary" x-bind:disabled="text.trim().length === 0">
                    <?php \esc_html_e('Add note', 'fleekdash-htmxpack'); ?>
                </button>
            </div>
        </form>
    </main>
</body>
</html>
