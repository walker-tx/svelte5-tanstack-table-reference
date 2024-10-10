This example renders a simple table that has no state or interactivity.

Start out by creating a column helper. It's not necessary, but it makes typescript a bit easier:

```svelte
<script lang="ts">
  import { createColumnHelper } from '$lib/table/index';
  import { UserProfile } from '$lib/models';

  const colHelp = createColumnHelper<UserProfile>();
</script>
```

Next, define your columns. You can use `renderComponent` or `renderSnippet` to render components or snippets in your cells, but it's not necessary for this example:

```svelte
<script lang="ts">
  // ...

  const columnDefs = [
    colHelp.accessor('name', { header: 'Name' }),
    colHelp.accessor('age', { header: 'Age' }),
    colHelp.accessor('email', { header: 'Email' }),
    colHelp.accessor('phone', { header: 'Phone' })
  ];
</script>
```

Now, all that is left is to assemble the brain for our table:

```svelte
<script lang="ts">
  // ...

  const table = createSvelteTable({
    data: [
      /* ... */
    ],
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel()
  });
</script>
```

Kind of overkill, to be sure.

As for the markup:

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

Since our table logic only grabs POJO's and not components, we don't need ot use `FlexRender` here. Use `FlexRender` when you'll also need to render things like components and snippets.

Here's an example of that:

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
