<script lang="ts">
    import { UserProfileService, type UserProfile } from '$lib/services/user-profile';
    import FlexRender from '$lib/table/flex-render.svelte';
    import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table/index';
    import type { PageData } from './$types';

    let { data }: PageProps<PageData> = $props();
    let { userProfiles } = data;

    // Create a column helper for the user profile data.
    // It's not necessary, but it helps with type stuff.
    const colHelp = createColumnHelper<UserProfile>();

    // Define the columns using the column helper.
    const columnDefs = [
        colHelp.accessor('name', { header: 'Name' }),
        colHelp.accessor('age', { header: 'Age' }),
        colHelp.accessor('email', { header: 'Email' }),
        colHelp.accessor('phone', { header: 'Phone' })
    ];

    let dataState = $state(userProfiles);

    // Create the table.
    const table = createSvelteTable({
        // To be reactive, the data field needs to be a getter.
        get data() {
            return dataState;
        },
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel()
    });

    function prependRecord() {
        // The data object needs to be reassigned
        dataState = [UserProfileService.getOne(), ...dataState];
    }

    function popRecord() {
        // The data object needs to be reassigned
        dataState = dataState.slice(0, dataState.length - 1);
    }
</script>

<div class="actions-wrapper">
    <h2>Actions</h2>
    <hr />
    <button onclick={() => prependRecord()}> Prepend a Record </button>
    <button onclick={() => popRecord()}> Pop a Record </button>
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
