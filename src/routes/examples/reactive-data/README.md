---
title: Reactive Data Example
intro: This example demonstrates how to use reactive data in a Svelte component.
---

This example demonstrates how to use reactive data in a Svelte component.

First and foremost, the variable that you're using to store your data needs to be a rune:

```ts
let dataState = $state(generateData(10));
```

Next, the `data` property of the table needs to be a getter:

```ts
const table = createSvelteTable({
  // 👇 Getter
  get data() {
    return dataState;
  },
  columns: columnDefs,
  getCoreRowModel: getCoreRowModel()
});
```

Finally, you must _reassign_ the variable in order to re-render the table:

```ts
function prependRecord(newRecord) {
  dataState = [newRecord, ...dataState];
}

function popRecord() {
  dataState = dataState.slice(0, dataState.length - 1);
}
```
