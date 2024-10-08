import { generate } from '$lib/services/user-profile';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return { userData: generate(10) };
};
