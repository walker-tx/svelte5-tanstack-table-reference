<script lang="ts">
    import Highlight from '$lib/components/highlight.svelte';
    import type { UserProfile } from '$lib/services/user-profile';
    import FlexRender from '$lib/table/flex-render.svelte';
    import {
        createColumnHelper,
        createSvelteTable,
        getCoreRowModel,
        getExpandedRowModel,
        renderComponent,
        type ExpandedState
    } from '$lib/table/index';
    import type { PageData } from './$types';
    import ExpandButton from './_components/expand-button.svelte';

    let { data }: PageProps<PageData> = $props();
    const { userProfiles } = data;

    // Create a column helper for the user profile data.
    // It's not necessary, but it helps with type stuff.
    const colHelp = createColumnHelper<UserProfile>();

    // Define the columns using the column helper.
    const columnDefs = [
        // Add a column for expansion
        colHelp.display({
            id: 'expansion',
            cell: ({ row }) =>
                renderComponent(ExpandButton, {
                    onclick: row.getToggleExpandedHandler(),
                    canExpand: row.getCanExpand(),
                    isExpanded: row.getIsExpanded()
                })
        }),
        colHelp.accessor('name', { header: 'Name' }),
        colHelp.accessor('age', { header: 'Age' }),
        colHelp.accessor('email', { header: 'Email' }),
        colHelp.accessor('phone', { header: 'Phone' })
    ];

    // Create a state for the expanded rows.
    let expandedState: ExpandedState = $state({});

    // Create the table.
    const table = createSvelteTable({
        data: userProfiles,
        columns: columnDefs,
        state: {
            get expanded() {
                return expandedState;
            }
        },
        // Define the getter for sub-rows.
        getSubRows: (row) => row.friends,
        // Add an updater for the expanded state.
        onExpandedChange(updater) {
            if (updater instanceof Function) {
                expandedState = updater(expandedState);
            } else {
                expandedState = updater;
            }
        },
        getCoreRowModel: getCoreRowModel(),
        // Include the expanded row model
        getExpandedRowModel: getExpandedRowModel()
    });
</script>

<div>
    <h2>Actions</h2>
    <hr />
    <button onclick={table.getToggleAllRowsExpandedHandler()}>
        {#if table.getIsAllRowsExpanded()}
            Collapse All
        {:else}
            Expand All
        {/if}
    </button>
</div>

<h2>Table Demo</h2>

<hr />

<table>
    <thead>
        <tr>
            {#each table.getHeaderGroups() as headerGroup}
                {#each headerGroup.headers as header}
                    <th>
                        <FlexRender
                            content={header.column.columnDef.header}
                            context={header.getContext()}
                        />
                    </th>
                {/each}
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each table.getRowModel().rows as row}
            <tr>
                {#each row.getVisibleCells() as cell}
                    <td>
                        <FlexRender
                            content={cell.column.columnDef.cell}
                            context={cell.getContext()}
                        />
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<h2>Debug</h2>

<hr />

<h3>Expanded State</h3>

<Highlight lang={'json'} code={JSON.stringify(expandedState, null, 2)} />
