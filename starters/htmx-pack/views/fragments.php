<?php
/**
 * Fragment renderers for htmx swaps. Every renderer returns a string of
 * HTML - always escape user data with esc_html()/esc_url()/esc_attr()
 * and never interpolate raw option/request values.
 *
 * Styling is pure Fleek UI: utilities + fui-* classes only - no pack
 * stylesheet, no hex literals, no custom selectors. State-dependent
 * styling is emitted server-side (see the is-done ternary below).
 */

defined('ABSPATH') || exit;

const FLEEKDASH_HTMXPACK_LIST_CAP = 200;

/**
 * Whole <ul id="notes-list"> - returned by GET/POST/DELETE /notes so the
 * list re-renders wholesale after any mutation (simplest swap contract).
 * Rendering is capped so a long history cannot blow up the fragment
 * response; older notes remain in storage, just not rendered here.
 */
function fleekdash_htmxpack_fragment_list(): string
{
    $notes = fleekdash_htmxpack_notes();
    $shown = \array_slice($notes, 0, FLEEKDASH_HTMXPACK_LIST_CAP);
    $hidden = \count($notes) - \count($shown);
    \ob_start();
    ?>
    <ul id="notes-list" class="flex flex-col gap-2">
        <?php if ($shown === []) : ?>
            <li class="rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground" x-data><?php \esc_html_e('No notes yet - add the first one below.', 'fleekdash-htmxpack'); ?></li>
        <?php endif; ?>
        <?php foreach ($shown as $note) : ?>
            <?php echo fleekdash_htmxpack_fragment_row($note); ?>
        <?php endforeach; ?>
        <?php if ($hidden > 0) : ?>
            <li class="rounded-lg border border-dashed border-border bg-card p-4 text-center text-sm text-muted-foreground">
                <?php echo \esc_html(\sprintf(
                    /* translators: %d: number of notes not rendered */
                    \_n('%d older note not shown.', '%d older notes not shown.', $hidden, 'fleekdash-htmxpack'),
                    $hidden
                )); ?>
            </li>
        <?php endif; ?>
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
    $done = !empty($note['done']);
    \ob_start();
    ?>
    <li class="fui-card flex items-center gap-2.5 px-3 py-2.5" x-data="{ busy: false }">
        <button
            type="button"
            class="fui-btn fui-btn-ghost h-7 w-7 p-0 hover:text-primary"
            x-bind:disabled="busy"
            x-on:click="busy = true"
            x-on:htmx:after-request="busy = false"
            hx-post="<?php echo \esc_url(fleekdash_htmxpack_rest_url('/' . $id)); ?>"
            hx-target="closest li"
            hx-swap="outerHTML"
            aria-label="<?php \esc_attr_e('Toggle done', 'fleekdash-htmxpack'); ?>"
        ><?php echo $done ? '&#10003;' : '&#9675;'; ?></button>
        <span class="flex-1 break-words<?php echo $done ? ' text-muted-foreground line-through' : ''; ?>"><?php echo \esc_html((string) ($note['text'] ?? '')); ?></span>
        <button
            type="button"
            class="fui-btn fui-btn-ghost h-7 w-7 p-0 hover:text-destructive"
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
