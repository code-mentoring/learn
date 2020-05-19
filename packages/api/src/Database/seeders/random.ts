import faker from 'faker';

import { CreateAssignmentInput } from '../../Assignment/Assignment.entity';
import { CreateAssignmentFileInput } from '../../AssignmentFile/AssignmentFile.entity';
import { CreateModuleInput, ModuleType } from '../../Module/Module.entity';
import { UserInput } from '../../User/User.entity';
import { UserPreferencesInput } from '../../UserPreferences/UserPreferences.entity';
import { PathInput } from '../../Path/Path.entity';


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

export const moduleTypeArr = Object.keys(ModuleType) as ModuleType[];

export const moduleInput = (
  name: string,
  pathId: string,
  input: Partial<CreateModuleInput> = {}
): CreateModuleInput => ({
  name,
  icon: faker.lorem.word(),
  type: moduleTypeArr[Math.floor(Math.random() * moduleTypeArr.length)],
  pathId,
  ...input
});

export const assignmentInput = (
  moduleId: string,
  input: Partial<CreateAssignmentInput> = {}
): CreateAssignmentInput => ({
  description: faker.lorem.words(10),
  moduleId,
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
