<script lang="ts">
  import * as UserService from '$lib/services/user-profile';
  import FlexRender from '$lib/table/flex-render.svelte';
  import { createColumnHelper, createSvelteTable, getCoreRowModel } from '$lib/table/index';

  // Create a column helper for the user profile data.
  // It's not necessary, but it helps with type stuff.
  const colHelp = createColumnHelper<UserService.UserProfile>();

  // Define the columns using the column helper.
  const columnDefs = [
    colHelp.accessor('name', { header: 'Name' }),
    colHelp.accessor('age', { header: 'Age' }),
    colHelp.accessor('email', { header: 'Email' }),
    colHelp.accessor('phone', { header: 'Phone' })
  ];

  let dataState = $state(UserService.generate(10));

  // Create the table.
  const table = createSvelteTable({
    // To be reactive, the data field needs to be a getter.
    get data() {
      return dataState;
    },
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel()
  });

  function prependRecord() {
    // The data object needs to be reassigned
    dataState = [UserService.generate(1)[0], ...dataState];
  }

  function popRecord() {
    // The data object needs to be reassigned
    dataState = dataState.slice(0, dataState.length - 1);
  }
</script>

<div class="actions-wrapper">
  <h2>Actions</h2>
  <button onclick={() => prependRecord()}> Prepend a Record </button>
  <button onclick={() => popRecord()}> Pop a Record </button>
</div>
<hr />

<h2>Table</h2>
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

<style>
  table {
    width: 100%;
    max-width: 960px;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid black;
    padding: 8px;
  }

  .actions-wrapper {
    margin-bottom: 1rem;
  }
</style>
