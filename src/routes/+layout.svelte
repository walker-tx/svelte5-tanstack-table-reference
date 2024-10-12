<script>
    import { browser } from '$app/environment';
    import { ModeWatcher } from 'mode-watcher';
    import '../styles/normalize.css';
    import '../styles/sakura.css';
    import '../styles/shiki.css';
    import './app.css';

    let { children } = $props();
</script>

{#if browser}
    <ModeWatcher />
{/if}

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
