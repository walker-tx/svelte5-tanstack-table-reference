import { faker } from '@faker-js/faker';

export type UserProfile = {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
};

export function generate(n: number): UserProfile[] {
  const profiles: UserProfile[] = [];
  for (let i = 0; i < n; i++) {
    profiles.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 99 }),
      email: faker.internet.email(),
      phone: faker.phone.number()
    });
  }
  return profiles;
}
