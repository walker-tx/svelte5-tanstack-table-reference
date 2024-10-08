<script lang="ts">
	import { highlightJson } from '$lib/highlight';
	import { type UserProfile } from '$lib/services/user-profile';
	import FlexRender from '$lib/table/flex-render.svelte';
	import {
		createColumnHelper,
		createSvelteTable,
		getCoreRowModel,
		renderComponent,
		type RowSelectionState,
		type Updater
	} from '$lib/table/index';
	import type { PageData } from './$types';
	import TableCheckbox from './_components/table-checkbox.svelte';

	const { data }: { data: PageData } = $props();

	// Create a column helper for the user profile data.
	// It's not necessary, but it helps with type stuff.
	const colHelp = createColumnHelper<UserProfile>();

	// Define the columns using the column helper.
	const columnDefs = [
		// Add a column for selection
		colHelp.display({
			header: 'Select',
			cell: ({ row }) =>
				renderComponent(TableCheckbox, {
					get checked() {
						return row.getIsSelected();
					},
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
	let userData = $state(data.userData);

	// Create the table.
	const table = createSvelteTable({
		data: userData,
		columns: columnDefs,
		state: {
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

<h1>Table with Selection</h1>

<div class="actions-wrapper">
	<h2>Actions</h2>
	<button onclick={() => table.toggleAllRowsSelected()}>
		{#if table.getIsAllRowsSelected()}
			Deselect All
		{:else}
			Select All
		{/if}
	</button>
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
<hr />
<h2>Debug</h2>
<h3>Selection State</h3>
<div class="code-wrapper">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<pre><code>{@html highlightJson(JSON.stringify(table.getState().rowSelection, null, 2))}</code
		></pre>
</div>

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

	.code-wrapper {
		border: 1px solid black;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}
</style>
