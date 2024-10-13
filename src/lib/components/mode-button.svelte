<script lang="ts">
    import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-svelte';
    import { mode, toggleMode } from 'mode-watcher';
</script>

<button class="mode-button" onclick={toggleMode}>
    {#if $mode === 'dark'}
        <MoonIcon />
    {:else if $mode === 'light'}
        <SunIcon />
    {:else}
        <SunMoonIcon />
    {/if}
</button>

<style>
    .mode-button {
        background: none;
        color: var(--color-text);
        border: none;
        border-radius: 100%;
        height: 42px;
        width: 42px;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
