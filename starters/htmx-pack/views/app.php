<?php
/**
 * Full-document view for admin.php?action=fleekdash_htmxpack_app.
 * Runs inside wp-admin (cookie auth + capability gate upstream), emits a
 * clean page - no wp-admin chrome - with vendored htmx + Alpine +
 * fleek-ui.css from FleekDash\Extension\ExtensionAssets. Never loads
 * assets from a CDN, never ships a pack stylesheet: Fleek UI tokens,
 * utilities and fui-* classes are the whole visual contract.
 */

defined('ABSPATH') || exit;

if (!\class_exists('FleekDash\Extension\ExtensionAssets')
    || !\method_exists('FleekDash\Extension\ExtensionAssets', 'renderLinkTags')) {
    \wp_die(\esc_html__('This pack needs a newer FleekDash version. Please update FleekDash and reload this page.', 'fleekdash-htmxpack'));
}

$rest_nonce = \wp_create_nonce('wp_rest');

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
<?php
// Fleek UI stylesheet: tokens + utilities + fui-* + scoped base. Host
// theme/palette vars override its starter defaults automatically.
\FleekDash\Extension\ExtensionAssets::renderLinkTags([\FleekDash\Extension\ExtensionAssets::FLEEK_UI]);
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
    class="fleek-ui p-6"
    hx-headers='<?php echo \esc_attr(\wp_json_encode(['X-WP-Nonce' => $rest_nonce])); ?>'
>
    <main class="mx-auto flex max-w-xl flex-col gap-4">
        <header class="flex items-center justify-between gap-3">
            <h1 class="text-xl font-semibold"><?php \esc_html_e('HTMX Pack - Notes', 'fleekdash-htmxpack'); ?></h1>
            <button
                type="button"
                class="fui-btn fui-btn-outline"
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
            class="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            role="alert"
            x-data="{ message: '' }"
            x-on:htmx:response-error.window="message = window.hxpErrorMessage($event.detail.xhr)"
            x-on:htmx:send-error.window="message = 'Request failed - please try again.'"
            x-on:htmx:after-request.window="if ($event.detail.successful) { message = '' }"
            x-show="message !== ''"
            x-cloak
            x-text="message"
        ></p>

        <!-- Alpine island: local-only state (character counter + disabled submit).
             The draft survives failed submissions - detail.successful guards the reset. -->
        <form
            class="fui-card flex flex-col gap-2 p-3"
            x-data="{ text: '', max: 280 }"
            x-on:htmx:after-request.window="if ($event.detail.elt === $el && $event.detail.successful) { text = ''; $el.reset(); }"
            hx-post="<?php echo \esc_url(fleekdash_htmxpack_rest_url()); ?>"
            hx-target="#notes-list"
            hx-swap="outerHTML"
        >
            <textarea
                name="text"
                class="fui-input h-auto resize-y py-2"
                rows="2"
                x-model="text"
                x-bind:maxlength="max"
                placeholder="<?php \esc_attr_e('Write a note...', 'fleekdash-htmxpack'); ?>"
                required
            ></textarea>
            <div class="flex items-center justify-between">
                <span class="text-xs text-muted-foreground" x-text="text.length + ' / ' + max"></span>
                <button type="submit" class="fui-btn fui-btn-primary" x-bind:disabled="text.trim().length === 0">
                    <?php \esc_html_e('Add note', 'fleekdash-htmxpack'); ?>
                </button>
            </div>
        </form>
    </main>
</body>
</html>
