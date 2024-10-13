In this guide, we'll focus on enhancing a table by adding a selection state that
allows users to select rows using checkboxes. We'll go through the steps of
creating a checkbox wrapper component, defining the columns with a selection
column, setting up a reactive state for row selection, and ensuring that the
table responds to selection changes.

**You should already know how to make a basic table before proceeding.**

> 🗒️ Note: This process works for all kinds of table state.

### Creating the Checkbox Wrapper

We start by creating a simple checkbox wrapper component called `TableCheckbox`.
This component will handle the checkbox rendering for each row in the table.

```svelte
<!-- table-checkbox.svelte -->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  type Props = {} & HTMLInputAttributes;

  let { ...inputProps }: Props = $props();
</script>

<input type="checkbox" {...inputProps} />
```

### Creating a Selection Column

Next, we define the table columns using a column helper, with a specific focus
on adding a selection column that uses the `TableCheckbox` component.

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { createColumnHelper, renderComponent } from '$lib/table';
  import TableCheckbox from './_components/table-checkbox.svelte';
  import { type UserProfile } from '$lib/services/user-profile';

  // Create a column helper for the user profile data.
  const colHelp = createColumnHelper<UserProfile>();

  // Define the columns including a column for row selection.
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
</script>
```

The checkbox's `onchange` event toggles the selection of the respective row when
clicked.

### Setting Up Selection State

To manage the row selection state reactively, we use a `$state` rune to create a
reactive signal that tracks which rows are selected.

```svelte
<script lang="ts">
  import { type RowSelectionState } from '$lib/table'; // [!code --]
  import { type RowSelectionState, createColumnHelper, renderComponent } from '$lib/table'; // [!code ++]
  import TableCheckbox from './_components/table-checkbox.svelte';
  import { type UserProfile } from '$lib/services/user-profile';

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [
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

  // Define a reactive state to track the row selection state.
  let rowSelectionState: RowSelectionState = $state({}); // [!code ++]
</script>
```

### Creating the Updater Function

To handle changes in the row selection state, we define an updater function.
This function will be called whenever a row's selection state changes.

<!-- prettier-ignore-start -->
```svelte
<script lang="ts">
  import { type RowSelectionState, createColumnHelper, renderComponent } from '$lib/table'; // [!code --]
  import { // [!code ++]
    type RowSelectionState, // [!code ++]
    type Updater, // [!code ++]
    createColumnHelper, // [!code ++]
    renderComponent // [!code ++]
  } from '$lib/table'; // [!code ++]
  import TableCheckbox from './_components/table-checkbox.svelte';
  import { type UserProfile } from '$lib/services/user-profile';

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [
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

  function onRowSelectionChange(updater: Updater<RowSelectionState>) { // [!code ++]
    // Update the selection state by reassigning the $state // [!code ++]
    if (updater instanceof Function) { // [!code ++]
      rowSelectionState = updater(rowSelectionState); // [!code ++]
    } else { // [!code ++]
      rowSelectionState = updater; // [!code ++]
    } // [!code ++]
  } // [!code ++]
</script>
```
<!-- prettier-ignore-end -->

- **State Update**: The updater function modifies the `rowSelectionState`,
  ensuring that the state rune and the table itself are synchronized.
- **Reactivity**: Reassigning the `$state` triggers the reactive updates
  automatically.

### Setting Up the Table

When setting up the table, it is essential to make the `rowSelection` state a
getter to ensure reactivity. This way, the table automatically updates when the
selection state changes.

```svelte
<script lang="ts">
  import {
    type RowSelectionState,
    type Updater,
    createColumnHelper,
    renderComponent // [!code --]
    renderComponent, // [!code ++]
    createSvelteTable, // [!code ++]
    getCoreRowModel // [!code ++]
  } from '$lib/table';
  import TableCheckbox from './_components/table-checkbox.svelte';
  import { type UserProfile } from '$lib/services/user-profile'; // [!code --]
  import { type UserProfile, userProfiles } from '$lib/services/user-profile'; // [!code ++]

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [
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

  function onRowSelectionChange(updater: Updater<RowSelectionState>) {
    if (updater instanceof Function) {
      rowSelectionState = updater(rowSelectionState);
    } else {
      rowSelectionState = updater;
    }
  }

  // Create the table and bind the row selection state using a getter.
  const table = createSvelteTable({ // [!code ++]
    data: userProfiles, // [!code ++]
    columns: columnDefs, // [!code ++]
    state: { // [!code ++]
      get rowSelection() { // [!code ++]
        return rowSelectionState; // [!code ++]
      } // [!code ++]
    }, // [!code ++]
    onRowSelectionChange: onRowSelectionChange, // [!code ++]
    getCoreRowModel: getCoreRowModel() // [!code ++]
  }); // [!code ++]
</script>
```

### Rendering the Table in the Markup

Finally, we render the table and include a button that allows users to toggle
the selection of all rows at once.

```svelte
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
