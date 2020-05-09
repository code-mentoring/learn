import faker from 'faker';

import { UserInput } from '../../User/User.entity';
import { UserPreferencesInput } from '../../UserPreferences/UserPreferences.entity';
import { PathInput } from '../../Path/Path.entity';

export const randomUserInput = (input: Partial<UserInput> = {}): UserInput => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'secret',
  ...input
});

export const randomUserPreferenceInput = (): UserPreferencesInput => ({
  practiceGoal: Math.floor(Math.random() * 4) + 1,
  why: faker.lorem.sentence(),
  codingAbility: Math.floor(Math.random() * 10) + 1
});

export const randomPath = (input: Partial<PathInput> = {}): PathInput => ({
  name: faker.lorem.word(),
  icon: faker.lorem.word(),
  description: faker.lorem.words(10),
  ...input
});
