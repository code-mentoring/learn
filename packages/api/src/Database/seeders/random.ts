import faker from 'faker';

import { CreateAssignmentInput } from '../../Assignment/Assignment.entity';
import { CreateAssignmentFileInput } from '../../AssignmentFile/AssignmentFile.entity';
import { CreateCharacterInput } from '../../Character/Character.entity';
import { CreateModuleInput, ModuleType } from '../../Module/Module.entity';
import { PathInput } from '../../Path/Path.entity';
import { UserInput } from '../../User/User.entity';
import { UserPreferencesInput } from '../../UserPreferences/UserPreferences.entity';


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

export const randomCharacterInput = (): CreateCharacterInput => ({
  name: faker.name.firstName(),
  displayName: faker.name.lastName()
});

export const randomPath = (input: Partial<PathInput> = {}, name: string): PathInput => ({
  name,
  icon: faker.lorem.word(),
  description: faker.lorem.words(10),
  ...input
});

const moduleTypeArr = Object.keys(ModuleType);

export const randomModule = (
  name: string,
  pathId: string,
  input: Partial<CreateModuleInput> = {}
): CreateModuleInput => ({
  name,
  icon: faker.lorem.word(),
  type: (moduleTypeArr as ModuleType[])[Math.floor(
    Math.random() * (moduleTypeArr as ModuleType[]).length
  )],
  pathId,
  ...input
});

export const randomAssignment = (
  moduleId: string,
  input: Partial<CreateAssignmentInput> = {}
): CreateAssignmentInput => ({
  description: faker.lorem.words(10),
  moduleId,
  ...input
});

export const randomAssignmentFile = (
  assignmentId: string,
  input: Partial<CreateAssignmentFileInput> = {}
): CreateAssignmentFileInput => ({
  name: faker.lorem.words(2),
  type: faker.lorem.word(),
  content: faker.lorem.words(10),
  assignmentId,
  ...input
});
