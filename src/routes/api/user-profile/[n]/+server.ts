import { UserProfileService } from '$lib/services/user-profile';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async ({ params, url }) => {
  const n = parseInt(params.n, 10);
  const nFriends = parseInt(url.searchParams.get('nFriends') ?? '0', 10);

  if (isNaN(n)) error(400, `Expected a number, but received '${params.n}'`);

  const profiles = UserProfileService.list(n, nFriends);

  return json(profiles);
};
