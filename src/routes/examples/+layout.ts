import exampleRegistry from '$lib/services/example-registry';
import type { LayoutLoad } from './$types';

type ExampleEntry = (typeof exampleRegistry)[number];

export const load: LayoutLoad = async ({ url }) => {
  const exampleIndex = exampleRegistry.findIndex((entry) => entry.pathname === url.pathname);

  if (exampleIndex === -1) {
    throw Error(`Example not found: ${url.pathname}`);
  }

  const currentExample: ExampleEntry = exampleRegistry[exampleIndex];
  const nextExample: ExampleEntry | undefined = exampleRegistry[exampleIndex + 1];
  const previousExample: ExampleEntry | undefined = exampleRegistry[exampleIndex - 1];

  const globs = import.meta.glob<{ default: string }>(`./*/README.md`);
  const exampleGlob = await globs[`./${currentExample.id}/README.md`]();

  return {
    nextExample,
    previousExample,
    currentExample: exampleRegistry[exampleIndex],
    readmeHtml: exampleGlob.default
  };
};
