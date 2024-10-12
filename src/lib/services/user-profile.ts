import { fakerEN_US as faker } from '@faker-js/faker';

export type UserProfile = {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  birthdate: string;
};

export class UserProfileService {
  /**
   * Generates a single user profile with random data.
   *
   * @returns {UserProfile} An object containing the following properties:
   */
  static getOne(): UserProfile {
    const age = faker.number.int({ min: 18, max: 99 });

    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age,
      birthdate: faker.date.birthdate({ mode: 'age', min: age, max: age }).toUTCString(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'national' })
    };
  }

  static list(n: number): UserProfile[] {
    return Array.from({ length: n }, () => this.getOne());
  }
}
