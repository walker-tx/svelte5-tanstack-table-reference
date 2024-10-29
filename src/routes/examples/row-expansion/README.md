In this guide, we'll focus on enhancing a table by adding expandable rows that
allow users to show and hide nested data. We'll go through the steps of creating
an expansion button component, defining the columns with an expansion control,
setting up a reactive state for row expansion, and ensuring that the table
properly handles nested data.

**You should already know how to make a basic table before proceeding.**

> 🗒️ Note: This process works for tables with hierarchical data structures.

### Creating the Expansion Button

We start by creating a simple expansion button component called `ExpandButton`.
This component will handle the expansion control rendering for each row in the
table.

```svelte
<!-- expand-button.svelte -->
<script lang="ts">
  type Props = {
    onclick: () => void;
    canExpand: boolean;
    isExpanded: boolean;
  };

  let { onclick, canExpand, isExpanded }: Props = $props();
</script>

<button disabled={!canExpand} {onclick}>
  {#if canExpand}
    {isExpanded ? '▼' : '▶'}
  {/if}
</button>
```

### Creating an Expansion Column

Next, we define the table columns using a column helper, with a specific focus
on adding an expansion column that uses the `ExpandButton` component.

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { createColumnHelper, renderComponent } from '$lib/table';
  import ExpandButton from './_components/expand-button.svelte';
  import { type UserProfile } from '$lib/services/user-profile';

  // Create a column helper for the user profile data.
  const colHelp = createColumnHelper<UserProfile>();

  // Define the columns including a column for row expansion.
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
</script>
```

The expansion button's `onclick` event toggles the expansion state of the
respective row when clicked.

### Setting Up Expansion State

To manage the row expansion state reactively, we use a `$state` rune to create a
reactive signal that tracks which rows are expanded.

```svelte
<script lang="ts">
  import { createColumnHelper, renderComponent } from '$lib/table'; // [!code --]
  import { type ExpandedState, createColumnHelper, renderComponent } from '$lib/table'; // [!code ++]
  import ExpandButton from './_components/expand-button.svelte';
  import { type UserProfile } from '$lib/services/user-profile';

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [
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

  // Define a reactive state to track the row expansion state.
  let expandedState: ExpandedState = $state({}); // [!code ++]
</script>
```

### Setting Up the Table with Sub-Rows

When setting up the table, we need to configure both the expansion state and
define how sub-rows are retrieved. This setup enables the hierarchical data
display.

<!-- prettier-ignore-start -->
```svelte
<script lang="ts">
   import {
    type ExpandedState,
    createColumnHelper,
    renderComponent,
    createSvelteTable, // [!code ++]
    getCoreRowModel, // [!code ++]
    getExpandedRowModel // [!code ++]
  } from '$lib/table';
  import ExpandButton from './_components/expand-button.svelte';
  import { type UserProfile } from '$lib/services/user-profile'; // [!code --]
  import { type UserProfile, userProfiles } from '$lib/services/user-profile'; // [!code ++]

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [
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

  // Define a reactive state to track the row expansion state.
  let expandedState: ExpandedState = $state({});

  // Create the table with expansion configuration
  const table = createSvelteTable({ // [!code ++]
    data: userProfiles, // [!code ++]
    columns: columnDefs, // [!code ++]
    state: { // [!code ++]
      get expanded() { // [!code ++]
        return expandedState; // [!code ++]
      } // [!code ++]
    }, // [!code ++]
    getSubRows: (row) => row.friends, // [!code ++]
    onExpandedChange(updater) { // [!code ++]
      if (updater instanceof Function) { // [!code ++]
        expandedState = updater(expandedState); // [!code ++]
      } else { // [!code ++]
        expandedState = updater; // [!code ++]
      } // [!code ++]
    }, // [!code ++]
    getCoreRowModel: getCoreRowModel(), // [!code ++]
    getExpandedRowModel: getExpandedRowModel() // [!code ++]
  }); // [!code ++]
</script>
```
<!-- prettier-ignore-end -->

### Rendering the Table with Expansion Controls

Finally, we render the table and include a button that allows users to expand or
collapse all rows at once.

```svelte
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

The expanded rows will automatically be included in the table's row model,
thanks to the `getExpandedRowModel` plugin. The table will show both parent rows
and their expanded children when the expansion state changes.
