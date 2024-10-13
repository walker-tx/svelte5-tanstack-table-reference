<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import ModeButton from '$lib/components/mode-button.svelte';

    type Props = {
        data: LayoutData;
        children: Snippet;
    };

    let { children, data }: Props = $props();
    const { currentExample, nextExample, previousExample, readmeHtml } = $derived(data);
</script>

<svelte:head>
    <title>
        {currentExample.title} | Tanstack Table v8 + Svelte 5 Reference
    </title>
</svelte:head>

<div class="layout-wrapper">
    <nav>
        <div class="nav-title">
            <a href="/" style="">
                <h4>Tanstack Table v8 + Svelte 5</h4>
            </a>
            <a style="font-size:medium" href={__GITHUB_URL__} target="_blank" rel="nofollow"
                >GitHub Repo</a
            >
        </div>
        <div style="display:flex;align-items:center;">
            <ModeButton />
        </div>
    </nav>

    <header>
        <h1>{currentExample.title}</h1>
        <hr style="width:100%" />
        <h6>Useful Links</h6>
        <ul class="links-list">
            <li>
                <a
                    href="{__GITHUB_URL__}/tree/main/{currentExample.githubPath}"
                    target="_blank"
                    rel="nofollow"
                >
                    Page Source
                </a>
            </li>
            {#each currentExample?.links ?? [] as { href, title }}
                <li>
                    <a {href}>{title}</a>
                </li>
            {/each}
        </ul>
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
        <div class="footer-links">
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
        </div>
        <p style="font-size:small;margin-top:1em">
            Developed and maintained by <a
                href="https://github.com/walker-tx"
                target="_blank"
                rel="nofollow">walker-tx</a
            >.
        </p>
    </footer>
</div>

<style>
    nav {
        padding: 1rem 0px;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
    }

    nav .nav-title h4 {
        margin: 0px;
    }

    footer {
        padding: 2rem 0px;
    }

    .footer-links {
        display: flex;
        justify-content: space-between;
    }

    .layout-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .content-wrapper {
        flex-grow: 1;
    }

    .links-list {
        list-style-type: none;
        padding: 0px;
        display: flex;
        gap: 1em;
        font-size: medium;
    }
</style>
