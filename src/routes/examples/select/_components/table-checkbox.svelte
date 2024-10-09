<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';

    type Props = {} & HTMLInputAttributes;

    let { ...inputProps }: Props = $props();
</script>

<input type="checkbox" {...inputProps} />

<style></style>
