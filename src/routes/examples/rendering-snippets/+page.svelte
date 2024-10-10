<script lang="ts">
    import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table/index';
    import * as UserService from '$lib/services/user-profile';
    import type { PageData } from './$types';
    import { renderSnippet, FlexRender } from '$lib/table';
    import { createRawSnippet } from 'svelte';

    let { data }: PageProps<PageData> = $props();
    const { userProfiles } = data;

    const mailtoSnippet = createRawSnippet<[string]>((email) => {
        const emailAddress = email();
        return {
            render: () => `<a href="mailto:${emailAddress}">${emailAddress}</a>`
        };
    });

    // Create a column helper for the user profile data.
    // It's not necessary, but it helps with type stuff.
    const colHelp = createColumnHelper<UserService.UserProfile>();

    // Define the columns using the column helper.
    // This is a basic example. Check other examples for more complexity.
    const columnDefs = [
        colHelp.accessor('name', {
            header: 'Name',
            cell: ({ cell }) => renderSnippet(strongSnippet, cell.getValue())
        }),
        colHelp.accessor('age', { header: 'Age' }),
        colHelp.accessor('email', {
            header: 'Email',
            cell: ({ cell }) => renderSnippet(mailtoSnippet, cell.getValue())
        }),
        colHelp.accessor('phone', { header: 'Phone' })
    ];

    // Create the table.
    const table = createSvelteTable({
        data: userProfiles,
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel()
    });
</script>

{#snippet strongSnippet(content: string)}
    <strong>{content}</strong>
{/snippet}

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
