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
  friendRequests: Array<FriendRequests>;
  getFriendRequestsFromMe: Array<FriendRequests>;
  getFriendRequestsToMe: Array<FriendRequests>;
  getMyFriends: Array<Friends>;
  friends: Array<Friends>;
  getMyFridendsById: Array<Friends>; 
};


export type QueryVerifyTokenArgs = {
  accessToken: Scalars['String'];
};


export type QueryGetPathByNameArgs = {
  name: Scalars['String'];
};

export type QueryGetMyFridendsByIdArgs = {
  userId: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createUser: User;
  updatePreferences: UserPreferences;
  login: LoginOutput;
  createPath: Path;
  joinPath: Scalars['Boolean'];
  createFriendRequest: FriendRequests;
  updateFriendRequest: FriendRequests;
  addFriend: Friends;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationUpdatePreferencesArgs = {
  input: UserPreferencesInput;
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

export type MutationCreateFriendRequestArgs = {
  createFriendRequest: FriendRequestsInput;
};

export type MutationUpdateFriendRequestRequestArgs = {
  updateFriendRequest: FriendRequestsInput;
};

export type MutationAddFriendRequestArgs = {
  friend: FriendsInput;
};

export type UserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserPreferencesInput = {
  practiceGoal: Scalars['Float'];
  why: Scalars['String'];
  codingAbility: Scalars['Float'];
};

  export type PathInput = {
    name: Scalars['String'];
    icon: Scalars['String'];
    description: Scalars['String'];
  };
  
  export type Friends = {
  id: Scalars['String'];
  user1Id: Scalars['String'];
  user2Id: Scalars['String'];
  since: Scalars['DateTime'];
};

export type FriendsInput = {
  user1Id: Scalars['String'];
  user2Id: Scalars['String'];
};

export type FriendRequests = {
  id: Scalars['String'];
  from: Scalars['String'];
  to: Scalars['String'];
  accepted: Scalars['Boolean'];
  requested: Scalars['DateTime'];
};

export type FriendRequestsInput = {
  from: Scalars['String'];
  to: Scalars['String'];
  accepted: Scalars['String'];
};
