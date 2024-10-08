<script lang="ts">
	import { PUBLIC_GITHUB_REPO_URL } from '$env/static/public';
	import exampleRegistry from '$lib/services/example-registry';
	import { createSvelteTable } from '$lib/table';
	import FlexRender from '$lib/table/flex-render.svelte';
	import { renderSnippet } from '$lib/table/render-component';
	import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
	import { createRawSnippet } from 'svelte';

	const colHelp = createColumnHelper<(typeof exampleRegistry)[number]>();

	const linkCell = createRawSnippet<[{ href: string; text: string }]>((props) => {
		const { href, text } = props();
		return {
			render: () => `<a href="${href}">${text}</a>`
		};
	});

	const columnDefs = [
		colHelp.accessor('title', { header: 'Title' }),
		colHelp.accessor('pathname', {
			header: 'Demo',
			cell({ cell }) {
				return renderSnippet(linkCell, { href: cell.getValue(), text: 'Link to Demo' });
			}
		}),
		colHelp.accessor('githubPath', {
			header: 'GitHub',
			cell({ cell }) {
				const href = `${PUBLIC_GITHUB_REPO_URL}/tree/main/${cell.getValue()}`;
				return renderSnippet(linkCell, { href, text: 'Link to GitHub' });
			}
		})
	];

	const table = createSvelteTable({
		data: exampleRegistry,
		columns: columnDefs,
		getCoreRowModel: getCoreRowModel()
	});
</script>

<h1>Tanstack Table v8 + Svelte 5 Reference</h1>

<h2>Overview</h2>

<p>
	The official Svelte 5 adpater for TanStack Table will release alongside the v9 of the TanStack
	Table library. As of writing this, TanStack Table v9 is still under development. In the meantime,
	you can use Svelte 5 with TanStack Table by creating your own "adapter" in your Svelte 5 project
	for TanStack Table v8, which is the current production version of TansTack Table.
</p>

<p>
	You can use this site and its repository on github as a reference for implementing your own
	adapter.
</p>

<p>This site is rudamentary on purpose.</p>

<h2>Examples</h2>
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

<h2>Questions you may have</h2>

<h3>Why not just use the alpha (v9) branch?</h3>

<p>
	Alpha is under development. It changes very frequently, and therefor breaks very frequently. While
	things are so volatile, maintainers and contributors can't be expected to support it.
</p>

<p>
	This applies to both <code>@tanstack/table-core</code> and <code>@tanstack/table-svelte</code>.
</p>

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
</style>
