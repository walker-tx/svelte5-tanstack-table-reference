<script>
    import { ModeWatcher, mode } from 'mode-watcher';

    let { children } = $props();
</script>

<ModeWatcher />

<svelte:head>
    <link rel="stylesheet" href="/normalize.css" type="text/css" />
    <link rel="stylesheet" href="/shiki.css" type="text/css" />
    {#if $mode === 'dark'}
        <link rel="stylesheet" href="/sakura-dark.css" type="text/css" />
    {:else}
        <link rel="stylesheet" href="/sakura.css" type="text/css" />
    {/if}
</svelte:head>

<main class="wrapper">
    {@render children()}
</main>

<style>
    .wrapper {
        width: 100%;
        max-width: 960px;
        margin: 0px auto;
        height: 100svh;
    }

    @media (max-width: 960px) {
        .wrapper {
            padding: 0px 1rem;
        }
    }
</style>
