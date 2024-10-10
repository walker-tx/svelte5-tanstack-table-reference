<script lang="ts">
    import * as UserProfileService from '$lib/services/user-profile';
    import FlexRender from '$lib/table/flex-render.svelte';
    import {
        createColumnHelper,
        createSvelteTable,
        getCoreRowModel,
        renderComponent,
        type RowSelectionState,
        type Updater
    } from '$lib/table/index';
    import type { PageData } from './$types';
    import TableCheckbox from './_components/table-checkbox.svelte';
    import { getHighlighter } from '$lib/highlighting';

    let { data }: PageProps<PageData> = $props();
    const { userProfiles } = data;

    // Create a column helper for the user profile data.
    // It's not necessary, but it helps with type stuff.
    const colHelp = createColumnHelper<UserProfileService.UserProfile>();

    // Define the columns using the column helper.
    const columnDefs = [
        // Add a column for selection
        colHelp.display({
            header: 'Select',
            cell: ({ row }) =>
                renderComponent(TableCheckbox, {
                    checked: row.getIsSelected(),
                    onchange: () => {
                        row.toggleSelected();
                    }
                })
        }),
        colHelp.accessor('name', { header: 'Name' }),
        colHelp.accessor('age', { header: 'Age' }),
        colHelp.accessor('email', { header: 'Email' }),
        colHelp.accessor('phone', { header: 'Phone' })
    ];

    let rowSelectionState: RowSelectionState = $state({});

    // Create the table.
    const table = createSvelteTable({
        data: userProfiles,
        columns: columnDefs,
        state: {
            get rowSelection() {
                return rowSelectionState;
            }
        },
        onRowSelectionChange: (updater: Updater<RowSelectionState>) => {
            if (updater instanceof Function) {
                rowSelectionState = updater(rowSelectionState);
            } else {
                rowSelectionState = updater;
            }
        },
        getCoreRowModel: getCoreRowModel()
    });
</script>

<div>
    <h2>Actions</h2>
    <hr />
    <button onclick={() => table.toggleAllRowsSelected()}>
        {#if table.getIsAllRowsSelected()}
            Deselect All
        {:else}
            Select All
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

<h3>Selection State</h3>

{#await getHighlighter()}
    {@const jsonString = JSON.stringify(table.getState().rowSelection, null, 2)}
    <pre><code>{jsonString}</code></pre>
{:then highlighter}
    {@const jsonString = JSON.stringify(table.getState().rowSelection, null, 2)}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html highlighter(jsonString)}
{/await}

<!-- <Highlight
    language={highlightJsonLanguage}
    code={JSON.stringify(table.getState().rowSelection, null, 2)}
/> -->

<style>
    table {
        width: 100%;
        max-width: 960px;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid black;
        padding: 8px;
    }
</style>
