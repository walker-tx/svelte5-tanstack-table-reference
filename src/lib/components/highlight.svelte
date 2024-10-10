<script lang="ts">
    import { type BundledLanguage, codeToHtml } from 'shiki/bundle-web.mjs';
    import { themes } from '../highlight';

    type Props = {
        code: string;
        lang: BundledLanguage;
    };

    let { code, lang }: Props = $props();

    async function highlight(code: string) {
        const highlightedCode = await codeToHtml(code, {
            lang,
            themes
        });

        return highlightedCode;
    }
</script>

{#await highlight(code)}
    <pre><code>{code}</code></pre>
{:then highlightedCode}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html highlightedCode}
{/await}
