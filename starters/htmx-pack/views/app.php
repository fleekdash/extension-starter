<?php
/**
 * Full-document view for admin.php?action=fleekdash_htmxpack_app.
 * Runs inside wp-admin (cookie auth + capability gate upstream), emits a
 * clean page - no wp-admin chrome - with vendored htmx + Alpine from
 * FleekDash\Extension\ExtensionAssets. Never loads assets from a CDN.
 */

defined('ABSPATH') || exit;

if (!\class_exists('FleekDash\Extension\ExtensionAssets')) {
    \wp_die(\esc_html__('This pack needs a newer FleekDash version. Please update FleekDash and reload this page.', 'fleekdash-htmxpack'));
}

$rest_nonce = \wp_create_nonce('wp_rest');
$css_url = \plugins_url('assets/pack.css', \dirname(__DIR__) . '/htmx-pack.php');

// The pack itself appends fleekdash_sdk_url to component_url (imperative
// routes get no injection from resolveRoute). Accept only the exact URL
// this site would produce - a same-host check alone would still let a
// caller smuggle an arbitrary same-origin script into the page.
$sdk_url = '';
$sdk_candidate = isset($_GET['fleekdash_sdk_url'])
    ? \sanitize_text_field(\wp_unslash((string) $_GET['fleekdash_sdk_url']))
    : '';
if ($sdk_candidate !== '' && fleekdash_htmxpack_same_url(fleekdash_htmxpack_sdk_url(), $sdk_candidate)) {
    $sdk_url = $sdk_candidate;
}
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
<?php if ($sdk_url !== '') : ?>
<script src="<?php echo \esc_url($sdk_url); ?>"></script>
<script>
// The FleekDash iframe stays behind its loading overlay until the SDK
// reports INTEGRATION_READY; init() reads the nonces/integration id the
// host already placed on this URL and posts it for us.
if (window.FleekDashSDK) {
    window.FleekDashSDK.init({ integration_id: '<?php echo \esc_js(FLEEKDASH_HTMXPACK_ID); ?>' });
}
</script>
<?php endif; ?>
<script>
// REST error bodies keep the JSON envelope; extract a safe short message.
// Named function because Alpine x-on expressions cannot contain try/catch.
window.hxpErrorMessage = function (xhr) {
    try {
        const body = JSON.parse(xhr && xhr.responseText ? xhr.responseText : '');
        const msg = body && body.message ? String(body.message) : '';
        return msg.replace(/<[^>]*>/g, '').slice(0, 200) || 'Request failed - please try again.';
    } catch (e) {
        return 'Request failed - please try again.';
    }
};
</script>
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

        <!-- Error surface for failed requests (409 CAS conflict, 4xx, network).
             htmx keeps the JSON envelope for WP_Error - surface its message. -->
        <p
            class="hxp-error"
            role="alert"
            x-data="{ message: '' }"
            x-on:htmx:response-error.window="message = window.hxpErrorMessage($event.detail.xhr)"
            x-on:htmx:send-error.window="message = 'Request failed - please try again.'"
            x-on:htmx:after-request.window="if ($event.detail.successful) { message = '' }"
            x-show="message !== ''"
            x-text="message"
        ></p>

        <!-- Alpine island: local-only state (character counter + disabled submit).
             The draft survives failed submissions - detail.successful guards the reset. -->
        <form
            class="hxp-form"
            x-data="{ text: '', max: 280 }"
            x-on:htmx:after-request.window="if ($event.detail.elt === $el && $event.detail.successful) { text = ''; $el.reset(); }"
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
