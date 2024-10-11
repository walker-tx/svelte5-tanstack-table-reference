In this guide, we'll extend your knowledge of creating a table in Svelte by
focusing on handling reactive data.

**Before proceeding, you should already know how to create and render a basic
table.**

### Adding Data to a `$state` Rune

The first step is to make the data reactive by storing it in a `$state`. In
Svelte 5, `$state` is a signal that allows you to track and update state changes
in a reactive manner. This ensures that when the data changes, the table will
automatically update to reflect those changes.

```svelte
<script lang="ts">
  type Props = {
    data: PageData;
  };

  let { data }: Props = $props();
  let { userProfiles } = data;

  // Create a reactive state for the user profiles data using a $state rune.
  let dataState = $state(userProfiles);
</script>
```

### Creating the Table

To make the table reactive, we need to pass the `data` property as a getter
function to `createSvelteTable`. This approach ensures that the table
dynamically responds to changes in `dataState`.

<!-- prettier-ignore-start -->
```svelte
<script lang="ts">
  import { type UserProfile } from '$lib/services/user-profile'; // [!code ++]
  import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table'; // [!code ++]

  type Props = {
    data: PageData;
  };

  let { data }: Props = $props();
  let { userProfiles } = data;

  let dataState = $state(userProfiles);

  const colHelp = createColumnHelper<UserProfile>(); // [!code ++]

  const columnDefs = [ // [!code ++]
    colHelp.accessor('name', { header: 'Name' }), // [!code ++]
    colHelp.accessor('age', { header: 'Age' }), // [!code ++]
    colHelp.accessor('email', { header: 'Email' }), // [!code ++]
    colHelp.accessor('phone', { header: 'Phone' }) // [!code ++]
  ]; // [!code ++]

  const table = createSvelteTable({ // [!code ++]
    // The data field is defined as a getter to ensure it is reactive.
    get data() { // [!code ++]
      return dataState; // [!code ++]
    }, // [!code ++]
    columns: columnDefs, // [!code ++]
    getCoreRowModel: getCoreRowModel() // [!code ++]
  }); // [!code ++]
</script>
```
<!-- prettier-ignore-end -->

- **Reactive Data**: By implementing the `data` property as a getter, any change
  to `dataState` will automatically trigger the table to re-render with the
  updated data.
- **Benefit**: This setup makes the table's data handling straightforward and
  automatically keeps it in sync with state changes.

### Mutating Data

We will create two functions to modify the table data: one to add a record at
the beginning and another to remove the last record. It's crucial to reassign
the `dataState` variable when updating the data to ensure reactivity.

<!-- prettier-ignore-start -->
```svelte
<script lang="ts">
  import { type UserProfile } from '$lib/services/user-profile';
  import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table';

  type Props = {
    data: PageData;
  };

  let { data }: Props = $props();
  let { userProfiles } = data;

  let dataState = $state(userProfiles);

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [
    colHelp.accessor('name', { header: 'Name' }),
    colHelp.accessor('age', { header: 'Age' }),
    colHelp.accessor('email', { header: 'Email' }),
    colHelp.accessor('phone', { header: 'Phone' })
  ];

  const table = createSvelteTable({
    get data() {
      return dataState;
    },
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel()
  });

  function prependRecord() { // [!code ++]
    dataState = [UserProfileService.getOne(), ...dataState]; // [!code ++]
  } // [!code ++]

  function popRecord() { // [!code ++]
    dataState = dataState.slice(0, dataState.length - 1); // [!code ++]
  } // [!code ++]
</script>

<div class="actions-wrapper"> // [!code ++]
  <h2>Actions</h2> // [!code ++]
  <hr /> // [!code ++]
  <button onclick={() => prependRecord()}> Prepend a Record </button> // [!code ++]
  <button onclick={() => popRecord()}> Pop a Record </button> // [!code ++]
</div> // [!code ++]
```
<!-- prettier-ignore-end -->

> 🗒️ Note: The `dataState` variable must be reassigned after mutation
> (`dataState = ...`) to ensure that the change is detected and triggers an
> update in the UI.

### Rendering the Table in the Markup

Finally, we render the table using Svelte's templating syntax. Since the table
data is reactive, it will automatically update when you modify `dataState` using
the functions created above.

```svelte
<table>
  <thead>
    <tr>
      {#each table.getHeaderGroups() as headerGroup}
        {#each headerGroup.headers as header}
          <th>
            <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
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
            <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
```
