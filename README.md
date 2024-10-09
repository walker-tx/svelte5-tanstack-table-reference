[Link to Deployed Site](https://svelte5-and-tanstack-table-v8.vercel.app/)

# Svelte 5 + TanStack Table v8 Reference

TanStack v8's own adapter for Svelte (`@tanstack/svelte-table`) won't work with
Svelte 5 due to its usage of the `svelte/internal` package. This SvelteKit
project demonstrates a workaround for this issue while TanStack Table v9 (and
the official Svelte 5 adapter) is still under development.

# How to Use This Reference

## Implementing TanStack Table in Svelte 5

A TanStack Table adapter is essentially an implementation of the
`@tanstack/table-core` package that integrates a framework's state management
and rendering API's with the core table logic. It's actually quite simple to
create your own adapter, and that's what this project demonstrates.

A TanStack Table implementation for Svelte 5 can be found in the `src/lib/table`
directory. This is a loose copy of the work performed in [this
PR](https://github.com/TanStack/table/pull/5403), but updated to accommodate the
latest version of Svelte 5, and some feature requests. You can use the adapter
by copying the `table` directory into your own project.

Some documentation is available in the [`/src/lib/table` folder](./src/lib/table/README.md).

The `examples` route also contains examples of how to use the table implementation.

## Examples

Examples live in the `src/routes/examples` directory. They demonstrate how to
use the table implementation in various scenarios.

Each example is roughly documented in a `README.md` file in its directory.

# Issues & Requests

## Bugs & Typos

It's quite possible that there are issues in the way that I've implemented
and/or documented some of the examples. If you find any, please submit an issue
or a PR.

## Missing Examples

Think an example is missing? Submit a request in issues, or submit a PR.
