This guide walks through the process of creating a table in Svelte 5 using a
column helper, defining column definitions, setting up the table, and rendering
it in the markup.

### Defining the Column Helper

A column helper is a utility that simplifies the creation of column definitions,
especially when working with typed data. It ensures that the column definitions
have the correct data types and structure, making your code more robust and
easier to maintain.

```svelte
<script lang="ts">
  import { createColumnHelper } from '$lib/table';
  import { type UserProfile } from '$lib/services/user-profile';

  const colHelp = createColumnHelper<UserProfile>();
</script>
```

### Making the Column Definitions

Using the column helper, we define the columns that our table will display. Each
column is associated with a specific field from the data and has a header label.

<!-- prettier-ignore-start -->
```svelte
<script lang="ts">
  import { createColumnHelper } from '$lib/table'; // [!code ++]
  import { type UserProfile } from '$lib/services/user-profile';

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [ // [!code ++]
    colHelp.accessor('age', { header: 'Age' }), // [!code ++]
    colHelp.accessor('email', { header: 'Email' }), // [!code ++]
    colHelp.accessor('phone', { header: 'Phone' }) // [!code ++]
  ]; // [!code ++]
</script>
```
<!-- prettier-ignore-end -->

- **Field Access**: The first argument to each `accessor` method specifies the
  field to extract from each data record (e.g., `name`, `age`, `email`, and
  `phone`).
- **Header Label**: The `header` property defines what will be displayed in the
  table header for each column.

This approach clearly maps each column to its respective field in the data,
making the table definition concise and easy to understand.

### Setting Up the Table

After defining the columns, the next step is to set up the table using the
`createSvelteTable` function. This function initializes the table with the
specified data, columns, and core row model.

<!-- prettier-ignore-start -->
```svelte
<script lang="ts">
  import { createColumnHelper } from '$lib/table'; // [!code --]
  import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table'; // [!code ++]
  import { type UserProfile } from '$lib/services/user-profile'; // [!code --]
  import { type UserProfile, userProfiles } from '$lib/services/user-profile'; // [!code ++]

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [
    colHelp.accessor('name', { header: 'Name' }),
    colHelp.accessor('age', { header: 'Age' }),
    colHelp.accessor('email', { header: 'Email' }),
    colHelp.accessor('phone', { header: 'Phone' })
  ];

  const table = createSvelteTable({ // [!code ++]
    data: userProfiles, // [!code ++]
    columns: columnDefs, // [!code ++]
    getCoreRowModel: getCoreRowModel() // [!code ++]
  }); // [!code ++]
</script>
```
<!-- prettier-ignore-end -->

For more information on row models, refer to the [Row Model
Documentation](https://tanstack.com/table/latest/docs/guide/row-models).

### Rendering the Table

Finally, the table structure is created using Svelte's templating syntax. This
includes rendering both the header and the body of the table dynamically.

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

Since all of the are plain old JavaScript objects (POJO's), we don't need to use
`FlexRender` to render the cells. Use `FlexRender` when you need to render
components or snippets.
