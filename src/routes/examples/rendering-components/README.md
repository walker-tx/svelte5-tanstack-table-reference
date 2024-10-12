In this guide, we will walk through the process of rendering Svelte components
inside table cells. This allows you to insert more complex or dynamic content
within the table structure.

**You should already know how to make a basic table before proceeding.**

### Make a Component

Start out by making a component that you want to render inside the table. For
this example, we'll use a countdown timer component.

```svelte
<!-- countdown.svelte -->
<script lang="ts" module>
  type CountdownString = `${string}d ${string}h ${string}m ${string}s`;

  function getCountdown(date: Date): CountdownString {
    const now = new Date();
    let targetDate = new Date(now.getFullYear(), date.getMonth(), date.getDate());

    // If the target date is in the past, set it to the next year
    if (targetDate.getTime() < now.getTime()) {
      targetDate = new Date(now.getFullYear() + 1, date.getMonth(), date.getDate());
    }

    const delta = targetDate.getTime() - now.getTime();

    const dys = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((delta % (1000 * 60)) / 1000);

    return `${zPad(dys, 3)}d ${zPad(hrs, 2)}h ${zPad(mins, 2)}m ${zPad(secs, 2)}s`;
  }

  function zPad(num: number, size: number) {
    return num.toString().padStart(size, '0');
  }
</script>

<script lang="ts">
  type Props = {
    value: string | Date;
  };

  let { value }: Props = $props();
  const date = new Date(value);

  let countdown: CountdownString = $state(`000d 00h 00m 00s`);

  $effect.pre(() => {
    countdown = getCountdown(date);

    const interval = setInterval(() => {
      countdown = getCountdown(date);
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<span class="countdown">{countdown}</span>

<style>
  .countdown {
    font-family: monospace;
  }
</style>
```

### Column Definitions

Next, we define a set of columns for our table. The column definition array
specifies how each cell should be rendered, and this is where `renderComponent`
comes in. This function allows you to use the components defined earlier to
customize the cell content.

Here's an example of how we use `renderComponent` in the column
definitions:

<!-- prettier-ignore-start -->
```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { createColumnHelper } from '$lib/table'; 
  import { type UserProfile } from '$lib/services/user-profile'; 
  import Countdown from './countdown.svelte';

  const colHelp = createColumnHelper<UserProfile>(); 

  const columnDefs = [ 
    colHelp.accessor('name', { header: 'Name' }), 
    colHelp.accessor('age', { header: 'Age' }), 
    colHelp.accessor('phone', { header: 'Phone' }) 
    colHelp.accessor('birthdate', { 
        header: 'Birthday Countdown', 
        // Use renderComponent to render a Svelte component in a cell.
        cell: ({ cell }) => renderComponent(Countdown, { value: cell.getValue() }) 
    }) 
  ];
</script>
```
<!-- prettier-ignore-end -->

> 🗒️ NOTE: You can also use `renderColumn` with the `header` field of each
> column.

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
  import Countdown from './countdown.svelte';

  const colHelp = createColumnHelper<UserProfile>();

  const columnDefs = [ 
    colHelp.accessor('name', { header: 'Name' }), 
    colHelp.accessor('age', { header: 'Age' }), 
    colHelp.accessor('phone', { header: 'Phone' }) 
    colHelp.accessor('birthdate', { 
        header: 'Birthday Countdown', 
        cell: ({ cell }) => renderComponent(Countdown, { value: cell.getValue() }) 
    }) 
  ];

  const table = createSvelteTable({ // [!code ++]
    data: userProfiles, // [!code ++]
    columns: columnDefs, // [!code ++]
    getCoreRowModel: getCoreRowModel() // [!code ++]
  }); // [!code ++]
</script>

```
<!-- prettier-ignore-end -->

### Rendering the Table

Finally, to render the table itself, we use the `FlexRender` component.
`FlexRender` is responsible for dynamically rendering the table's cells based on
the content and context provided.

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
