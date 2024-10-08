# Svelte 5 + TanStack Table v8 Reference

TanStack v8's own adapter for Svelte (`@tanstack/svelte-table`) won't work with
Svelte 5 due to its usage of internal packages. This reference project
demonstrates a workaround for that.

TanStack Table v9 will have official support for Svelte 5, but (as of the time that this is being written) it is not yet released.

# How to Use This Reference

## The Table Implementation for Svelte 5

A TanStack Table implementation for Svelte 5 can be found in the
`src/lib/table` directory. This is a copy of the work performed in [this
PR](https://github.com/TanStack/table/pull/5403), but updated to accomodate the
latest version of Svelte 5, and some feature requests.

This implementation is simply a suggestion, so your implementation should meet
your own needs.

## Examples

You can find examples and their docs in the `src/routes/examples` directory.

Each example is roughly documented in a `README.md` file in its directory.

# Issues & Requests

## Bugs & Typos

It's quite possible that there are issues in the way that I've implemented
and/or documented some of the examples. If you find any, please submit an issue
or a PR.

## Missing Examples

Think an example is missing? Submit a request in issues, or submit a PR.
