<script lang="ts">
    import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table';
    import type { UserProfile } from '$lib/services/user-profile';
    import type { PageData } from './$types';

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
        colHelp.accessor('email', { header: 'Email' }),
        colHelp.accessor('phone', { header: 'Phone' })
    ];

    // Create the table.
    const table = createSvelteTable({
        data: userProfiles,
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel()
    });
</script>

{#snippet profileCard(userProfile: UserProfile)}
    <div class="data-card">
        <header>
            <strong>{userProfile.name}</strong>
        </header>
        <div class="data-card-metadata">
            <p>Age: {userProfile.age}</p>
            <p>Email: {userProfile.email}</p>
            <p>Phone: {userProfile.phone}</p>
        </div>
    </div>
{/snippet}

<h2>Table Demo</h2>

<hr />

<div class="data-grid">
    {#each table.getCoreRowModel().rows as row}
        {@render profileCard(row.original)}
    {/each}
</div>

<style>
    .data-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 10px;
    }

    .data-card {
        border: 1px solid;
        padding: 10px;
    }

    .data-card header {
        border-bottom: 1px solid;
        margin-bottom: 8px;
    }

    .data-card .data-card-metadata p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
    }
</style>
