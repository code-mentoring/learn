export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AssignmentFile = {
   __typename?: 'AssignmentFile';
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  content: Scalars['String'];
};

export type Assignment = {
   __typename?: 'Assignment';
  id: Scalars['String'];
  description: Scalars['String'];
};

export type Module = {
   __typename?: 'Module';
  id: Scalars['String'];
  name: Scalars['String'];
  icon: Scalars['String'];
  type: Scalars['String'];
  previousId?: Maybe<Scalars['String']>;
  pathId: Scalars['String'];
  previous?: Maybe<Module>;
  path: Path;
};

export type Path = {
   __typename?: 'Path';
  id: Scalars['String'];
  name: Scalars['String'];
  icon: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
};


export type UserPreferences = {
   __typename?: 'UserPreferences';
  id: Scalars['String'];
  userId: Scalars['String'];
  practiceGoal: Scalars['Float'];
  why: Scalars['String'];
  codingAbility: Scalars['Float'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  profileImage: Scalars['String'];
  userPreferences?: Maybe<UserPreferences>;
  createdAt: Scalars['DateTime'];
};

export type LoginOutput = {
   __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  users: Array<User>;
  me: User;
  verifyToken: Scalars['Boolean'];
  paths: Array<Path>;
  getPathByName: Path;
  assignments: Array<Assignment>;
  assignmentFiles: Array<AssignmentFile>;
  modules: Array<Module>;
  pathModules: Array<Module>;
};


export type QueryVerifyTokenArgs = {
  accessToken: Scalars['String'];
};


export type QueryGetPathByNameArgs = {
  name: Scalars['String'];
};


export type QueryPathModulesArgs = {
  pathId: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createUser: User;
  updatePreferences: UserPreferences;
  login: LoginOutput;
  createPath: Path;
  joinPath: Scalars['Boolean'];
  createAssignment: Assignment;
  createAssignmentFile: AssignmentFile;
  updateModule: Module;
  deleteAssignmentFile: Scalars['Boolean'];
  createModule: Module;
  deleteModule: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationUpdatePreferencesArgs = {
  preferences: UserPreferencesInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreatePathArgs = {
  path: PathInput;
};


export type MutationJoinPathArgs = {
  pathId: Scalars['String'];
};


export type MutationCreateAssignmentArgs = {
  assignment: AssignmentInput;
};


export type MutationCreateAssignmentFileArgs = {
  assignmentFile: AssignmentFileInput;
};


export type MutationUpdateModuleArgs = {
  update: UpdateModuleInput;
};


export type MutationDeleteAssignmentFileArgs = {
  assignmentFileId: Scalars['String'];
};


export type MutationCreateModuleArgs = {
  module: ModuleInput;
};


export type MutationDeleteModuleArgs = {
  moduleId: Scalars['String'];
};

export type UserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserPreferencesInput = {
  practiceGoal?: Maybe<Scalars['Float']>;
  why?: Maybe<Scalars['String']>;
  codingAbility?: Maybe<Scalars['Float']>;
};

export type PathInput = {
  name: Scalars['String'];
  icon: Scalars['String'];
  description: Scalars['String'];
};

export type AssignmentInput = {
  description: Scalars['String'];
};

export type AssignmentFileInput = {
  name: Scalars['String'];
  type: Scalars['String'];
  content: Scalars['String'];
};

export type UpdateModuleInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  type?: Maybe<ModuleType>;
  previousId?: Maybe<Scalars['String']>;
  pathId?: Maybe<Scalars['String']>;
};

export enum ModuleType {
  Assignment = 'assignment',
  Lesson = 'lesson'
}

export type ModuleInput = {
  name: Scalars['String'];
  icon: Scalars['String'];
  type: Scalars['String'];
  previousId?: Maybe<Scalars['String']>;
  pathId: Scalars['String'];
};
