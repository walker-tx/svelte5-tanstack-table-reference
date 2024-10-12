<script lang="ts">
    import { type UserProfile } from '$lib/services/user-profile';
    import { FlexRender, renderComponent } from '$lib/table';
    import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table/index';
    import type { PageData } from './$types';
    import DataTableCellCountdown from './_components/data-table-cell-countdown.svelte';

    let { data }: PageProps<PageData> = $props();
    const { userProfiles } = data;

    // Create a column helper for the user profile data.
    // It's not necessary, but it helps with type stuff.
    const colHelp = createColumnHelper<UserProfile>();

    // Define the columns using the column helper.
    // This is a basic example. Check other examples for more complexity.
    const columnDefs = [
        colHelp.accessor('name', { header: 'Name' }),
        colHelp.accessor('age', { header: 'Age' }),
        colHelp.accessor('phone', { header: 'Phone' }),
        colHelp.accessor('birthdate', {
            header: 'Birthday Countdown',
            // Use renderComponent to render a Svelte component in a cell.
            cell: ({ cell }) => renderComponent(DataTableCellCountdown, { value: cell.getValue() })
        })
    ];

    // Create the table.
    const table = createSvelteTable({
        data: userProfiles,
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel()
    });
</script>

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
