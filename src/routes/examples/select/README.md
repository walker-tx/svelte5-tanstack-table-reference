# Select Example

This example demonstrates how to use reactive data in a Svelte component.

First make a state variable that will hold the selection state:

```ts
let rowSelectionState: RowSelectionState = $state({});
```

Next, the `state.rowSelection` property of the table needs to be a getter, and the `onRowSelectionChange` property needs to be a function that updates the state:

```ts
const table = createSvelteTable({
	data: [...],
	columns: [...],
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
