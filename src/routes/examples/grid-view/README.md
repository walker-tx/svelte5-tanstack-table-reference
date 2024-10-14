This guide walks you through converting the [basic table example](/examples/basic) into a grid view.

### Why would I use a table library for a grid view?

Though much of the rendering API will be put to the side for this example, a
grid view still benefits from the `table` object's features such as state
management.

### Creating the Table

We're going to start from the basic table example and convert it into a grid.

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table';
  import { type UserProfile, userProfiles } from '$lib/services/user-profile';

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [
    colHelp.accessor('name', { header: 'Name' }),
    colHelp.accessor('age', { header: 'Age' }),
    colHelp.accessor('email', { header: 'Email' }),
    colHelp.accessor('phone', { header: 'Phone' })
  ];

  const table = createSvelteTable({
    data: userProfiles,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel()
  });
</script>
```

### Making the Card Snippet

To display the data, we'll make a simple snippet (or component). This one accepts a `UserProfile` object as a parameter.

<!-- prettier-ignore-start -->
```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table';
  import { type UserProfile, userProfiles } from '$lib/services/user-profile';

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [
    colHelp.accessor('name', { header: 'Name' }),
    colHelp.accessor('age', { header: 'Age' }),
    colHelp.accessor('email', { header: 'Email' }),
    colHelp.accessor('phone', { header: 'Phone' })
  ];

  const table = createSvelteTable({
    data: userProfiles,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel()
  });
</script>

{#snippet profileCard(userProfile: UserProfile)} // [!code ++]
    <div class="data-card"> // [!code ++]
        <header> // [!code ++]
            <strong>{userProfile.name}</strong> // [!code ++]
        </header> // [!code ++]
        <div class="data-card-metadata"> // [!code ++]
            <p>Age: {userProfile.age}</p> // [!code ++]
            <p>Email: {userProfile.email}</p> // [!code ++]
            <p>Phone: {userProfile.phone}</p> // [!code ++]
        </div> // [!code ++]
    </div> // [!code ++]
{/snippet} // [!code ++]

<style> // [!code ++]
    .data-card { /* [!code ++] */
        border: 1px solid; /* [!code ++] */
        padding: 10px; /* [!code ++] */
    } /* [!code ++] */

    .data-card header { /* [!code ++] */
        border-bottom: 1px solid; /* [!code ++] */
        margin-bottom: 8px; /* [!code ++] */
    } /* [!code ++] */

    .data-card .data-card-metadata p { /* [!code ++] */
        white-space: nowrap; /* [!code ++] */
        overflow: hidden; /* [!code ++] */
        text-overflow: ellipsis; /* [!code ++] */
        margin: 0; /* [!code ++] */
    } /* [!code ++] */
</style> // [!code ++]
```
<!-- prettier-ignore-end -->

### Displaying the Grid

Now, we can display the grid by grabbing the `rows` array from `table.getCoreRowModel()`. As we iterate over each entry, we'll use the `row`'s `original` property to pass the `UserProfile` object to the `profileCard` snippet.

<!-- prettier-ignore-start -->
```svelte
<!-- +page.svelte -->
<script lang="ts">
  // ...script from above...
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

<div class="data-grid"> // [!code ++]
  {#each table.getCoreRowModel().rows as row} // [!code ++]
    {@render profileCard(row.original)} // [!code ++]
  {/each} // [!code ++]
</div> // [!code ++]

<style>
  .data-grid { /* [!code ++] */
    display: grid; /* [!code ++] */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* [!code ++] */
    gap: 10px; /* [!code ++] */
  } /* [!code ++] */

  /* ...rest of the styles... */
</style>
```
<!-- prettier-ignore-end -->

Now that the grid is rendered, you can apply more functionality to it using the table API, such as sorting, filtering, or pagination.
