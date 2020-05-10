import { Test, TestingModule } from '@nestjs/testing';
import 'jest-extended';
import request from 'supertest';

import { appImports } from '../../src/App.module';
import { DatabaseService } from '../../src/Database/Database.service';
import { SeederService } from '../../src/Database/seeders/Seeders.service';
import { LoginOutput, Path, PathInput, User, UserInput, FriendRequestsInput, FriendRequests, FriendsInput, Friends } from '../../types';
import mutations from './mutations';
import queries from './queries';
import { TestLogger } from './TestLogger.service';
import { UserPreferencesInput, UserPreferences } from '../../src/UserPreferences/UserPreferences.entity';

/**
 * A helper class to test the API
 */
export abstract class TestClient {
  static db: DatabaseService;

  static seeder: SeederService;

  static app: any;

  static token: string;


  /**
   * Reset the entire database
   */
  static async resetDatabase() {
    await this.db.DANGEROUSLY_RESET_DATABASE();
  }

  /**
   * Starts a testing NestJS server
   * @param resetDatabase Reset the database
   */
  static async start(resetDatabase = true) {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: appImports,
      providers: [TestLogger],
      exports: [TestLogger]
    }).compile();

    this.db = await moduleFixture.resolve(DatabaseService);
    this.seeder = await moduleFixture.get(SeederService);
    if (resetDatabase) await this.resetDatabase();


    this.app = moduleFixture.createNestApplication();
    this.app.useLogger(this.app.get(TestLogger));
    await this.app.init();
  }

  /**
   * Stops the NestJS testing server
   */
  static async stop() {
    await this.app.close();
  }


  // ----------------------------------------------------------------- Mutations
  static createUser(user: UserInput = this.seeder.randomUserInput()): Promise<User> {
    return this._request('createUser', mutations.createUser, { user });
  }

  static async login(email: string, password: string, storeToken = true): Promise<LoginOutput> {
    const res = await this._request<LoginOutput>('login', mutations.login, { email, password });
    if (storeToken) this.token = res.accessToken;
    return res;
  }

  static createPath(path: PathInput): Promise<Path> {
    return this._request('createPath', mutations.createPath, { path });
  }

  static joinPath(pathId: string): Promise<Boolean> {
    return this._request('joinPath', mutations.joinPath, { pathId });
  }

  static updatePreferences(preferences: UserPreferencesInput): Promise<UserPreferences> {
    return this._request('updatePreferences', mutations.updatePreferences, { preferences });
  }

  static createFriendRequest(friendRequest: FriendRequestsInput): Promise<FriendRequests> {
    return this._request('createFriendRequest', mutations.createFriendRequest, {friendRequest});
  }

  static updateFriendRequest(friendRequest: FriendRequestsInput): Promise<FriendRequests> {
    return this._request('updateFriendRequest', mutations.updateFriendRequest, { friendRequest });
  }
  
  static addFriend(friend: FriendsInput): Promise<Friends> {
    return this._request('addFriend', mutations.addFriend, { friend });
  }

  // ------------------------------------------------------------------- Queries

  static getPathByName(name: string): Promise<Path> {
    return this._request('getPathByName', queries.getPathByName, { name });
  }

  static me(): Promise<User> {
    return this._request('me', queries.me);
  }

  static friendRequests(): Promise< [FriendRequests] > {
    return this._request('friendRequests', queries.friendRequests);
  }

  static getFriendRequestsFromMe(): Promise< [FriendRequests] > {
    return this._request('getFriendRequestsFromMe', queries.getFriendRequestsFromMe);
  }

  static getFriendRequestsToMe(): Promise< [FriendRequests] > {
    return this._request('getFriendRequestsToMe', queries.getFriendRequestsToMe);
  }

  static getUserFriends(userId: String): Promise< [User] > {
    return this._request('getUserFriends', queries.getUserFriends, { userId });
  }

  static friends(): Promise< [Friends] > {
    return this._request('friends', queries.friends);
  }

  static getMyFridendsById(id: String): Promise< [Friends] > {
    return this._request('getMyFridendsById', queries.getMyFridendsById, { id });
  }


  // ----------------------------------------------------------------- Workflows
  static async workflowSignup() {
    const userInput = this.seeder.randomUserInput();
    const user = await this.createUser(userInput);
    const { accessToken } = await this.login(user.email, userInput.password);
    return { password: userInput.password, user, accessToken };
  }

  // ----------------------------------------------------------------- Private
  /**
   * Queries the local API and returns result
   * @param name Name of query
   * @param query GQL Query or mutation to run
   * @param variables Variables to pass if needed
   */
  private static async _request<T>(name: string, query: string, variables?: any): Promise<T> {

    const res = await request(this.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${this.token}`)
      .send({ query, variables });

    if (res.body.errors) throw new Error(res.body.errors[0].message);
    return res.body.data[name];
  }
}
