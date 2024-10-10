When you don't want to make an entire component for a small piece of reusable
code, snippets are a great way to encapsulate and reuse logic. In this example,
we'll create snippets for rendering text in a `<strong>` tag and email addresses
as clickable mailto links.

### Defining Snippets

Snippets can be defined in Svelte either directly in the markup or in the script
tag. Here, we use two methods to define our snippets:

> 🗒️ NOTE: The implementation of snippets within this repo only works with
> snippets that take one argument.

#### Markup Snippet

Using Svelte's `{#snippet ...}` block, you can define a reusable snippet directly in your component's markup. For example, the snippet `strongSnippet` is defined to render its content in a `<strong>` tag:

```svelte
{#snippet strongSnippet(content: string)}
    <strong>{content}</strong>
{/snippet}
```

#### Script Snippet

Snippets can also be created programmatically in the script tag using the
`createRawSnippet` function. This approach is useful when you do not need
to use a Svelte component in your snippet.

```svelte
<script lang="ts">
  import { createRawSnippet } from 'svelte';

  const mailtoSnippet = createRawSnippet<[string]>((email) => {
    const emailAddress = email();
    return {
      render: () => `<a href="mailto:${emailAddress}">${emailAddress}</a>`
    };
  });
</script>
```

This `mailtoSnippet` generates a clickable email link, using the provided email address.

### Column Definitions

Next, we define a set of columns for our table. The column definition array
specifies how each cell should be rendered, and this is where `renderSnippet`
comes in. This function allows you to use the snippets defined earlier to
customize the cell content.

Here's an example of how we use `renderSnippet` with our snippets in the column
definitions:

```svelte
<script lang="ts">
  import { createColumnHelper } from '$lib/table/index';
  import * as UserService from '$lib/services/user-profile';

  const colHelp = createColumnHelper<UserService.UserProfile>();

  const columnDefs = [
    colHelp.accessor('name', {
      header: 'Name',
      cell: ({ cell }) => renderSnippet(strongSnippet, cell.getValue())
    }),
    colHelp.accessor('age', { header: 'Age' }),
    colHelp.accessor('email', {
      header: 'Email',
      cell: ({ cell }) => renderSnippet(mailtoSnippet, cell.getValue())
    }),
    colHelp.accessor('phone', { header: 'Phone' })
  ];
</script>
```

> 🗒️ NOTE: You can also use `renderSnippet` with the `header` field of each
> column.

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
