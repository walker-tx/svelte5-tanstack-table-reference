<script lang="ts">
    type Props = {
        onclick: () => void;
        canExpand: boolean;
        isExpanded: boolean;
    };

    let { onclick, canExpand, isExpanded }: Props = $props();
</script>

<button {onclick} hidden={!canExpand} style="">
    {isExpanded ? '▼' : '▶'}
</button>

<style>
    button {
        display: block;
        margin: 0 auto;
    }

    button[hidden] {
        display: none;
    }
</style>
