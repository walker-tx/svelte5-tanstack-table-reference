<script lang="ts">
    import Highlight from '$lib/components/highlight.svelte';
    import ModeButton from '$lib/components/mode-button.svelte';
    import exampleRegistry from '$lib/services/example-registry';
    import { createSvelteTable, renderSnippet } from '$lib/table';
    import FlexRender from '$lib/table/flex-render.svelte';
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
                const href = `${__GITHUB_URL__}/tree/main/${cell.getValue()}`;
                return renderSnippet(linkCell, { href, text: 'Link to GitHub' });
            }
        })
    ];

    const table = createSvelteTable({
        data: exampleRegistry,
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel()
    });

    const tableDirectoryUrl = __GITHUB_URL__ + '/tree/main/src/lib/table';
</script>

<header>
    <div>
        <h1 style="margin-bottom: 0">Tanstack Table v8 + Svelte 5</h1>
        <p style="font-size: small; margin: 0">
            A reference for making awesome tables using TanStack Table and Svelte 5. Right now.
        </p>
        <a href={__GITHUB_URL__} style="font-size: medium;" target="_blank" rel="nofollow">
            GitHub Repository
        </a>
    </div>
    <div>
        <ModeButton />
    </div>
</header>

<hr />

<h2>Overview</h2>

<hr />

<p>
    The <code>@tanstack/table-svelte</code> adapter doesn't support Svelte 5 because it uses the
    <code>svelte/internal</code> package, which is being deprecated. TanStack Table's official Svelte
    5 adapter is slated to be released alongside TanStack Table v9, which is still in alpha. As a result,
    the core library is in a state of flux, and the Svelte adapter is not yet stable.
</p>

<p>
    This site, and its repository on <a href={__GITHUB_URL__}>GitHub</a>, were made to be a
    reference to help developers implement their own adapter for TanStack Table v8 (which is stable)
    and Svelte 5. Thus, isolating your work from any volatility in the <code>alpha</code> branch of the
    core library.
</p>

<p>Treat this reference as a cookbook, full of recipes.</p>

<h2>Project Setup</h2>

<hr />

<p>
    To get started, you'll need to install the core library and the Svelte adapter. You can do this
    by running the following command:
</p>

<Highlight lang="shell" code="pnpm i -D @tanstack/table-core" />

<p>
    Then, you'll need to copy the contents of the <code>src/lib/table</code> directory into your project
    directory.
</p>

<p>
    You can find those files <a href={tableDirectoryUrl}>here</a>, or grab a zip of that directory
    by
    <a href="https://download-directory.github.io/?url={encodeURIComponent(tableDirectoryUrl)}"
        >clicking here</a
    >.
</p>

<p>Now, you can get cooking!</p>

<h2>Examples</h2>

<hr />

<table class="examples-table">
    <thead>
        <tr>
            {#each table.getHeaderGroups() as headerGroup}
                {#each headerGroup.headers as header}
                    <th>
                        <FlexRender
                            content={header.column.columnDef.header}
                            context={header.getContext()}
                        />
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
                        <FlexRender
                            content={cell.column.columnDef.cell}
                            context={cell.getContext()}
                        />
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<h2>Questions you may have</h2>

<hr />

<h3>Why not just use the alpha (v9) branch?</h3>

<p>
    TanStack Table v9 is currently under development - it's in alpha. It changes very frequently,
    and therefore breaks very frequently. While things are so volatile, maintainers and contributors
    can't be expected to support it.
</p>

<p>
    This volatility applies to both <code>@tanstack/table-core</code> and
    <code>@tanstack/table-svelte</code>.
</p>

<h3>How can I share feedback, or get help?</h3>

<p>
    Submit an issue on GitHub if you'd like to share some feedback or need help. All feedback will
    help in the maintenance of this project, in addition to the development of the official TanStack
    Table adapter for Svelte 5.
</p>

<p style="font-weight: bold;">
    Also, please DO NOT submit an issue that you have with this project on the official TanStack
    Table repository. ONLY submit an issue there if you're sure that it's a problem with the core
    library, and not this project or your own implementation.
</p>

<hr />

<footer style="font-size:small">
    Developed and maintained by <a
        href="https://github.com/walker-tx"
        target="_blank"
        rel="nofollow">walker-tx</a
    >. <a href="https://walkertx.dev">Hire me</a>.
</footer>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h2 {
        margin-top: 2rem;
    }

    footer {
        padding: 2rem 0px;
    }
</style>
