---
title: Row Selection Example
intro: This example demonstrates how to implement row selections.
---

This example demonstrates how to implement row selections.

First make a state variable that will hold the selection state:

```ts
let rowSelectionState: RowSelectionState = $state({});
```

Next, the `state.rowSelection` property of the table needs to be a getter, and the `onRowSelectionChange` property needs to be a function that updates the state:

```ts
const table = createSvelteTable({
	data: [...],
	columns: columnDefs,
	state: {
		get rowSelection() {
			return rowSelectionState;
		}
	},
	onRowSelectionChange: (updater: Updater<RowSelectionState>)=> {
		if (updater instanceof Function) {
			rowSelectionState = updater(rowSelectionState);
		} else {
			rowSelectionState = updater;
		}
	},
	getCoreRowModel: getCoreRowModel()
});
```

Finally, use TanStack table's select API to interact with the selection state:

```ts
// (defined before table, of course)
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
  })
  // ... more columns
];
```
