import type { UserProfile } from '$lib/services/user-profile';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const userProfileResponse = await fetch('/api/user-profile/10?nFriends=3');
  const userProfileJson: UserProfile[] = await userProfileResponse.json();

  return {
    userProfiles: userProfileJson
  };
};
