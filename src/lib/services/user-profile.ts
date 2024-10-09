import { fakerEN_US as faker } from '@faker-js/faker';

export type UserProfile = {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
};

export class UserProfileService {
  /**
   * Generates a single user profile with random data.
   *
   * @returns {UserProfile} An object containing the following properties:
   */
  static getOne(): UserProfile {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 99 }),
      email: faker.internet.email(),
      phone: faker.phone.number()
    };
  }

  static list(n: number): UserProfile[] {
    return Array.from({ length: n }, () => this.getOne());
  }
}
