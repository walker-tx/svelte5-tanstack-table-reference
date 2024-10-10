import type { UserProfile } from '$lib/services/user-profile';
import type { PageLoad } from './$types';
import readme from './README.md';

export const load: PageLoad = async ({ fetch }) => {
  const userProfileResponse = await fetch('/api/user-profile/10');
  const userProfileJson: UserProfile[] = await userProfileResponse.json();

  return {
    userProfiles: userProfileJson,
    readme
  };
};
