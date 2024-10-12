# Table Adapter for Svelte

This folder contains a custom adapter for Svelte 5.

## Prerequisites

Make sure you have `@tanstack/table-core` installed:

```bash
pnpm install @tanstack/table-core
```

## Usage

### Defining Columns

Column definitions are very similar to the existing adapter for TanStack Table
v8.

```svelte
<script lang="ts">
  import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table';

  type UserProfile = {
    // Shape of the data
  };

  // 💡 Create a column helper for the user profile data.
  // It's not necessary, but it helps with typescript stuff.
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
    data: [
      /* ... */
    ],
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel()
  });
</script>
```

> 🔗 Link: The code abode came from the [basic
> example](/src/routes/examples/basic).

If you want to render a component in a cell or header, you can use the
`renderComponent` or `renderSnippet` functions.

```svelte
<script lang="ts">
  import TableCheckbox from './_components/table-checkbox.svelte';

  const columnDefs = [
    // 💡 Rendering a component using renderComponent
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

    // 💡 Rendering a snippet using renderSnippet
    colHelp.accessor('githubPath', {
      header: 'GitHub',
      cell({ cell }) {
        const href = `${__GITHUB_URL__}/tree/main/${cell.getValue()}`;
        return renderSnippet(linkCell, { href, text: 'Link to GitHub' });
      }
    })
  ];

  // ... define and use table
</script>
```

> 🔗 Link: The code abode came from the [select
> example](/src/routes/examples/select), and the
> [homepage](/src/routes/+page.svelte).

> 📝 NOTE: `renderSnippet` will only accept a snippet that takes one argument.

### Rendering the Table

This is very similar to the existing adapter for TanStack Table, but here,
you'll use `FlexRender`.

```svelte
<script lang="ts">
  import { FlexRender } from '$lib/flex-render';

  const table = createSvelteTable({
    /* ... */
  });
</script>

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

> 🔗 Link: The code abode came from the [select
> example](/src/routes/examples/select).

If your table only has POJO's, you don't need to use `FlexRender`:

```svelte
<table>
  <thead>
    <tr>
      {#each table.getHeaderGroups() as headerGroup}
        {#each headerGroup.headers as header}
          <th>{header.column.columnDef.header}</th>
        {/each}
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each table.getRowModel().rows as row}
      <tr>
        {#each row.getVisibleCells() as cell}
          <td>{cell.getValue()}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
```

> 🔗 Link: The code abode came from the [basic example](/src/routes/basic).

### State

In this adapter, state is used very similarly to the SolidJS adapter since both
Svelte 5 and SolidJS use signals.

For each state that you'd like reactivity for, you'll need to create a rune, and
an updater function.

```svelte
<script lang="ts">
  // ... imports

  type UserProfile = {
    // Shape of the data
  };

  const colHelp = createColumnHelper<UserProfile>();

  // Define the columns using the column helper.
  const columnDefs = [
    // Add a column for selection
    colHelp.display({
      header: 'Select',
      cell: ({ row }) =>
        renderComponent(TableCheckbox, {
          // In this case, `row.getIsSelected()` is only needed if you're starting with an
          // initial state.
          checked: row.getIsSelected(),
          onchange: () => {
            row.toggleSelected();
          }
        })
    })
    // ... more columns
  ];

  // Create a rune for the row selection state.
  let rowSelectionState: RowSelectionState = $state({});

  // Create the table.
  const table = createSvelteTable({
    data: [
      /* ... */
    ],
    columns: columnDefs,
    state: {
      // This needs to be a getter to keep the state reactive.
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

<button onclick={() => table.toggleAllRowsSelected()}> Toggle All Selected </button>

<!-- Table markup -->
```

> 🔗 Link: The code abode came from the [select
> example](/src/routes/examples/select).

## Examples

Check out the `examples` route for functional examples.
