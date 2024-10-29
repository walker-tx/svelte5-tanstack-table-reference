import type { UserProfile } from '$lib/services/user-profile';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const userProfileResponse = await fetch('/api/user-profile/10');
  const userProfileJson: UserProfile[] = await userProfileResponse.json();

  // This is hacky, but it will work with prerendering
  for (const profile of userProfileJson) {
    const friendsResponse = await fetch(`/api/user-profile/5`);
    profile.friends = await friendsResponse.json();
  }

  return {
    userProfiles: userProfileJson
  };
};
