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

export type StorySection = {
   __typename?: 'StorySection';
  content: Scalars['String'];
};

export type Lesson = {
   __typename?: 'Lesson';
  storySections: Array<StorySection>;
  questions: Array<Question>;
};

export type Question = QuestionMultiChoice | QuestionMemory | QuestionDragDrop | QuestionBugHighlight;

export type QuestionMultiChoice = {
   __typename?: 'QuestionMultiChoice';
  id: Scalars['String'];
  type: QuestionType;
  options: Array<Scalars['String']>;
  code: Scalars['String'];
};

export enum QuestionType {
  MultiChoice = 'multiChoice',
  Memory = 'memory',
  DragDrop = 'dragDrop',
  BugHighlight = 'bugHighlight'
}

export type QuestionMemory = {
   __typename?: 'QuestionMemory';
  id: Scalars['String'];
  type: QuestionType;
  pairs: Array<Array<Scalars['String']>>;
};

export type QuestionDragDrop = {
   __typename?: 'QuestionDragDrop';
  id: Scalars['String'];
  type: QuestionType;
  options: Array<Scalars['String']>;
  code: Scalars['String'];
};

export type QuestionBugHighlight = {
   __typename?: 'QuestionBugHighlight';
  id: Scalars['String'];
  type: QuestionType;
  code: Scalars['String'];
};

export type ModuleAssignment = {
   __typename?: 'ModuleAssignment';
  id: Scalars['String'];
  name: Scalars['String'];
  icon: Scalars['String'];
  type: Scalars['String'];
  previousId?: Maybe<Scalars['String']>;
  pathId: Scalars['String'];
  previous?: Maybe<Module>;
  completed: Scalars['Boolean'];
  lesson: Lesson;
  assignment: Assignment;
};

export type Module = ModuleAssignment | ModuleLesson;

export type ModuleLesson = {
   __typename?: 'ModuleLesson';
  id: Scalars['String'];
  name: Scalars['String'];
  icon: Scalars['String'];
  type: Scalars['String'];
  previousId?: Maybe<Scalars['String']>;
  pathId: Scalars['String'];
  previous?: Maybe<Module>;
  completed: Scalars['Boolean'];
  lesson: Lesson;
};

export type Assignment = {
   __typename?: 'Assignment';
  id: Scalars['String'];
  description: Scalars['String'];
  moduleId: Scalars['String'];
  module: ModuleAssignment;
};

export type Character = {
   __typename?: 'Character';
  id: Scalars['String'];
  name: Scalars['String'];
  displayName: Scalars['String'];
  path?: Maybe<Path>;
};

export type Path = {
   __typename?: 'Path';
  id: Scalars['String'];
  name: Scalars['String'];
  icon: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
  modules: Array<Module>;
  character?: Maybe<Character>;
  characterId?: Maybe<Scalars['String']>;
  progress: Scalars['Float'];
};


export type UserPreferences = {
   __typename?: 'UserPreferences';
  id: Scalars['String'];
  userId: Scalars['String'];
  practiceGoal: Scalars['Float'];
  why: Scalars['String'];
  codingAbility: Scalars['Float'];
};

export type UserModule = {
   __typename?: 'UserModule';
  id: Scalars['String'];
  userId: Scalars['String'];
  moduleId: Scalars['String'];
  path: Path;
  completedAt?: Maybe<Scalars['DateTime']>;
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

export type AssignmentFile = {
   __typename?: 'AssignmentFile';
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  content: Scalars['String'];
  assignmentId: Scalars['String'];
  authorId: Scalars['String'];
  assignment: Assignment;
  author: User;
};

export type LoginOutput = {
   __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
};

export type Concept = {
   __typename?: 'Concept';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  icon: Scalars['String'];
  taughtInId: Scalars['String'];
  taughtIn: ModuleLesson;
  storySection: StorySection;
};

export type UserConcept = {
   __typename?: 'UserConcept';
  id: Scalars['String'];
  userId: Scalars['String'];
  conceptId: Scalars['String'];
  learned: Scalars['DateTime'];
  concept: Concept;
  user: User;
};

export type Friend = {
   __typename?: 'Friend';
  id: Scalars['String'];
  user1Id: Scalars['String'];
  user2Id: Scalars['String'];
  requested: Scalars['DateTime'];
  status: Scalars['String'];
  initiator: Scalars['String'];
  since?: Maybe<Scalars['DateTime']>;
  user1: User;
  user2: User;
};

export type FriendOutput = {
   __typename?: 'FriendOutput';
  id: Scalars['String'];
  user1Id: Scalars['String'];
  user2Id: Scalars['String'];
  requested: Scalars['DateTime'];
  status: Scalars['String'];
  initiator: Scalars['String'];
  since?: Maybe<Scalars['DateTime']>;
};

export type Query = {
   __typename?: 'Query';
  assignmentFiles: Array<AssignmentFile>;
  userAssignmentFiles: Array<AssignmentFile>;
  assignments: Array<Assignment>;
  moduleAssignments: Array<Assignment>;
  users: Array<User>;
  searchUsers: Array<User>;
  me: User;
  verifyToken: Scalars['Boolean'];
  characters: Array<Character>;
  lesson: ModuleLesson;
  concepts: Array<Concept>;
  concept: Concept;
  userLearnedConcepts: Array<UserConcept>;
  myFriends: Array<Friend>;
  modules: Array<Module>;
  pathModules: Array<Module>;
  paths: Array<Path>;
  path: Path;
  questions: Array<Question>;
  lessonStorySections: Array<StorySection>;
};


export type QueryAssignmentFilesArgs = {
  assignmentId: Scalars['String'];
};


export type QueryUserAssignmentFilesArgs = {
  authorId: Scalars['String'];
};


export type QueryModuleAssignmentsArgs = {
  moduleId: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  query: Scalars['String'];
};


export type QueryVerifyTokenArgs = {
  accessToken: Scalars['String'];
};


export type QueryLessonArgs = {
  id: Scalars['String'];
};


export type QueryConceptArgs = {
  name: Scalars['String'];
};


export type QueryMyFriendsArgs = {
  userId: Scalars['String'];
};


export type QueryPathModulesArgs = {
  pathId: Scalars['String'];
};


export type QueryPathsArgs = {
  notJoined?: Maybe<Scalars['Boolean']>;
  onlyJoined?: Maybe<Scalars['Boolean']>;
};


export type QueryPathArgs = {
  id: Scalars['String'];
};


export type QueryQuestionsArgs = {
  type?: Maybe<Scalars['String']>;
  moduleIndex: Scalars['Float'];
  pathId: Scalars['String'];
};


export type QueryLessonStorySectionsArgs = {
  lessonId: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createAssignmentFile: AssignmentFile;
  updateAssignmentFile: AssignmentFile;
  deleteAssignmentFile: Scalars['Boolean'];
  createUser: User;
  updatePreferences: UserPreferences;
  login: LoginOutput;
  createCharacter: Character;
  updateCharacter: Character;
  deleteCharacter: Scalars['Boolean'];
  createConcept: Concept;
  updateConcept: Concept;
  deleteConcept: Scalars['Boolean'];
  learnConcept: Scalars['Boolean'];
  createFriendship: FriendOutput;
  respondToFriendRequest: Friend;
  deleteFriendship: Scalars['Boolean'];
  joinModule: Scalars['Boolean'];
  createPath: Path;
  joinPath: Scalars['Boolean'];
  joinPaths: Scalars['Boolean'];
  updatePath: Path;
  completeModule: UserModule;
};


export type MutationCreateAssignmentFileArgs = {
  assignmentFile: CreateAssignmentFileInput;
};


export type MutationUpdateAssignmentFileArgs = {
  file: UpdateAssignmentFileInput;
};


export type MutationDeleteAssignmentFileArgs = {
  assignmentFileId: Scalars['String'];
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


export type MutationCreateCharacterArgs = {
  character: CreateCharacterInput;
};


export type MutationUpdateCharacterArgs = {
  character: UpdateCharacterInput;
};


export type MutationDeleteCharacterArgs = {
  id: Scalars['String'];
};


export type MutationCreateConceptArgs = {
  concept: CreateConceptInput;
};


export type MutationUpdateConceptArgs = {
  concept: UpdateConceptInput;
};


export type MutationDeleteConceptArgs = {
  conceptId: Scalars['String'];
};


export type MutationLearnConceptArgs = {
  conceptId: Scalars['String'];
};


export type MutationCreateFriendshipArgs = {
  toId: Scalars['String'];
};


export type MutationRespondToFriendRequestArgs = {
  response: Scalars['String'];
  user2Id: Scalars['String'];
  user1Id: Scalars['String'];
};


export type MutationDeleteFriendshipArgs = {
  friendId: Scalars['String'];
};


export type MutationJoinModuleArgs = {
  moduleId: Scalars['String'];
};


export type MutationCreatePathArgs = {
  path: PathInput;
};


export type MutationJoinPathArgs = {
  pathId: Scalars['String'];
};


export type MutationJoinPathsArgs = {
  paths: Array<Scalars['String']>;
};


export type MutationUpdatePathArgs = {
  path: UpdatePathInput;
};


export type MutationCompleteModuleArgs = {
  moduleName: Scalars['String'];
};

export type CreateAssignmentFileInput = {
  name: Scalars['String'];
  type: Scalars['String'];
  content: Scalars['String'];
  assignmentId: Scalars['String'];
};

export type UpdateAssignmentFileInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  assignmentId?: Maybe<Scalars['String']>;
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

export type CreateCharacterInput = {
  name: Scalars['String'];
  displayName: Scalars['String'];
};

export type UpdateCharacterInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
};

export type CreateConceptInput = {
  name: Scalars['String'];
  icon: Scalars['String'];
  description: Scalars['String'];
  taughtInId: Scalars['String'];
};

export type UpdateConceptInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  taughtInId?: Maybe<Scalars['String']>;
};

export type PathInput = {
  name: Scalars['String'];
  icon: Scalars['String'];
  description: Scalars['String'];
  characterId?: Maybe<Scalars['String']>;
};

export type UpdatePathInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  characterId?: Maybe<Scalars['String']>;
};
