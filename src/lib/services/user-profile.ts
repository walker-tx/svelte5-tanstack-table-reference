import { fakerEN_US as faker } from '@faker-js/faker';

export type UserProfile = {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  birthdate: string;
  friends: UserProfile[];
};

export class UserProfileService {
  /**
   * Generates a single user profile with random data.
   *
   * @returns {UserProfile} An object containing the following properties:
   */
  /**
   * Generates a single user profile with a specified number of friends.
   *
   * @param nFriends - The number of friends to include in the user profile. Defaults to 0.
   * @returns A `UserProfile` object containing the generated user profile data.
   */
  static getOne(nFriends: number = 0): UserProfile {
    const age = faker.number.int({ min: 18, max: 99 });

    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age,
      birthdate: faker.date.birthdate({ mode: 'age', min: age, max: age }).toUTCString(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'national' }),
      friends: this.list(nFriends)
    };
  }

  /**
   * Generates a list of user profiles.
   *
   * @param n - The number of user profiles to generate.
   * @param nFriends - The number of friends each user profile should have. Defaults to 0.
   * @returns An array of user profiles.
   */
  static list(n: number, nFriends: number = 0): UserProfile[] {
    return Array.from({ length: n }, () => this.getOne(nFriends));
  }
}
