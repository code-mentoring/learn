import faker from 'faker';

import { UserInput } from '../../User/User.entity';
import { UserPreferencesInput } from '../../UserPreferences/UserPreferences.entity';
import { PathInput } from '../../Path/Path.entity';
import { CharacterCreateInput } from '../../Character/Character.entity';

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

export const randomCharacterInput = (): CharacterCreateInput => ({
  name: faker.name.firstName(),
  displayName: faker.name.lastName()
});

export const randomPath = (input: Partial<PathInput> = {}, name: string): PathInput => ({
  name,
  icon: faker.lorem.word(),
  description: faker.lorem.words(10),
  ...input
});
