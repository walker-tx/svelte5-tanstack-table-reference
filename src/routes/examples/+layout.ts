import exampleRegistry from '$lib/services/example-registry';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	const exampleData = exampleRegistry.find((entry) => entry.pathname === url.pathname);

	if (!exampleData) {
		throw Error(`Example not found: ${url.pathname}`);
	}

	return { exampleData };
};
