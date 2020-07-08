import faker from 'faker';

import { CreateAssignmentFileInput } from '../../AssignmentFile/AssignmentFile.entity';
import { CreateCharacterInput } from '../../Character/Character.entity';
import { CreateConceptInput } from '../../Concept/Concept.entity';
import { PathInput } from '../../Path/Path.entity';
import { UserInput } from '../../User/User.entity';
import { UserPreferencesInput } from '../../UserPreferences/UserPreferences.entity';


export const userInput = (
  input: Partial<UserInput> = {}
): UserInput => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'secret',
  ...input
});

export const userPreferenceInput = (
  input: Partial<UserPreferencesInput> = {}
): UserPreferencesInput => ({
  practiceGoal: Math.floor(Math.random() * 4) + 1,
  why: faker.lorem.sentence(),
  codingAbility: Math.floor(Math.random() * 10) + 1,
  ...input
});

export const pathInput = (
  input: Partial<PathInput> = {}
): PathInput => ({
  name: faker.random.word(),
  icon: faker.lorem.word(),
  description: faker.lorem.words(10),
  ...input
});

export const assignmentFileInput = (
  assignmentId: string,
  input: Partial<CreateAssignmentFileInput> = {}
): CreateAssignmentFileInput => ({
  name: faker.lorem.words(2),
  type: faker.lorem.word(),
  content: faker.lorem.words(10),
  assignmentId,
  ...input
});

export const conceptInput = (
  taughtInId: string,
  input: Partial<CreateConceptInput> = {}
): CreateConceptInput => ({
  name: faker.lorem.words(2),
  icon: faker.lorem.word(),
  description: faker.lorem.words(10),
  taughtInId,
  ...input
});

export const characterInput = (): CreateCharacterInput => ({
  name: faker.name.lastName(),
  displayName: faker.name.firstName()
});
