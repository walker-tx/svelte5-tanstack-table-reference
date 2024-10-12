<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    type Props = {
        data: LayoutData;
        children: Snippet;
    };

    let { children, data }: Props = $props();
    const { currentExample, nextExample, previousExample, readmeHtml } = $derived(data);
</script>

<div class="layout-wrapper">
    <nav>
        <div>
            <a href="/" style="font-size:1em;font-weight:bold;">Tanstack Table v8 + Svelte 5</a>
        </div>
        <div>
            <a href={__GITHUB_URL__} target="_blank">GitHub Repo</a>
        </div>
    </nav>

    <header>
        <h1>{currentExample.title}</h1>
        <hr style="width:100%" />
        <a href="{__GITHUB_URL__}/tree/main/{currentExample.githubPath}">
            Link to Example Source
        </a>
    </header>

    <div class="content-wrapper">
        {@render children()}

        <h2>Explanation</h2>

        <hr />

        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html readmeHtml}
    </div>

    <hr style="width:100%;" />

    <footer>
        <div>
            {#if previousExample}
                <a href={previousExample.pathname}>Previous: {previousExample.title}</a>
            {/if}
        </div>
        <div>
            {#if nextExample}
                <a href={nextExample.pathname}>Next: {nextExample.title}</a>
            {/if}
        </div>
    </footer>
</div>

<style>
    nav {
        padding: 1rem 0px;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
    }

    footer {
        display: flex;
        justify-content: space-between;
        padding: 2rem 0px;
    }

    .layout-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .content-wrapper {
        flex-grow: 1;
    }
</style>
