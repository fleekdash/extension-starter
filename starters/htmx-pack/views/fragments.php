<?php
/**
 * Fragment renderers for htmx swaps. Every renderer returns a string of
 * HTML - always escape user data with esc_html()/esc_url()/esc_attr()
 * and never interpolate raw option/request values.
 */

defined('ABSPATH') || exit;

/**
 * Whole <ul id="notes-list"> - returned by GET/POST/DELETE /notes so the
 * list re-renders wholesale after any mutation (simplest swap contract).
 */
function fleekdash_htmxpack_fragment_list(): string
{
    $notes = fleekdash_htmxpack_notes();
    \ob_start();
    ?>
    <ul id="notes-list" class="hxp-notes">
        <?php if ($notes === []) : ?>
            <li class="hxp-empty" x-data><?php \esc_html_e('No notes yet - add the first one below.', 'fleekdash-htmxpack'); ?></li>
        <?php endif; ?>
        <?php foreach ($notes as $note) : ?>
            <?php echo fleekdash_htmxpack_fragment_row($note); ?>
        <?php endforeach; ?>
    </ul>
    <?php
    return (string) \ob_get_clean();
}

/**
 * One <li> - returned by POST /notes/{id} (toggle) with hx-swap="outerHTML"
 * so a single row updates in place.
 *
 * @param array{id: string, text: string, done: bool, created: int} $note
 */
function fleekdash_htmxpack_fragment_row(array $note): string
{
    $id = (string) ($note['id'] ?? '');
    \ob_start();
    ?>
    <li class="hxp-note<?php echo !empty($note['done']) ? ' is-done' : ''; ?>" x-data="{ busy: false }">
        <button
            type="button"
            class="hxp-toggle"
            x-bind:disabled="busy"
            x-on:click="busy = true"
            hx-post="<?php echo \esc_url(fleekdash_htmxpack_rest_url('/' . $id)); ?>"
            hx-target="closest li"
            hx-swap="outerHTML"
            aria-label="<?php \esc_attr_e('Toggle done', 'fleekdash-htmxpack'); ?>"
        ><?php echo !empty($note['done']) ? '&#10003;' : '&#9675;'; ?></button>
        <span class="hxp-text"><?php echo \esc_html((string) ($note['text'] ?? '')); ?></span>
        <button
            type="button"
            class="hxp-delete"
            hx-delete="<?php echo \esc_url(fleekdash_htmxpack_rest_url('/' . $id)); ?>"
            hx-target="#notes-list"
            hx-swap="outerHTML"
            hx-confirm="<?php \esc_attr_e('Delete this note?', 'fleekdash-htmxpack'); ?>"
            aria-label="<?php \esc_attr_e('Delete note', 'fleekdash-htmxpack'); ?>"
        >&times;</button>
    </li>
    <?php
    return (string) \ob_get_clean();
}
