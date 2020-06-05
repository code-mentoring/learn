import 'jest-extended';

import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { appImports } from '../../src/App.module';
import { DatabaseService } from '../../src/Database/Database.service';
import * as random from '../../src/Database/seeders/random';
import { SeederService } from '../../src/Database/seeders/Seeders.service';
import { UpdateModuleInput } from '../../src/Module/Module.entity';
import { UserPreferences, UserPreferencesInput } from '../../src/UserPreferences/UserPreferences.entity';
import {
  Assignment,
  AssignmentFile,
  Character,
  CreateAssignmentFileInput,
  CreateAssignmentInput,
  CreateModuleInput,
  Friend,
  FriendOutput,
  LoginOutput,
  Module,
  Path,
  PathInput,
  User,
  UserInput,
  Concept,
  CreateConceptInput,
  UserConcept,
  UpdateConceptInput
} from '../../types';
import mutations from './mutations';
import queries from './queries';
import { TestLogger } from './TestLogger.service';
import { UserWithPassword } from '../../src/User/User.entity';
import { CreateCharacterInput, UpdateCharacterInput } from '../../src/Character/Character.entity';
import { UpdatePathInput } from '../../src/Path/Path.entity';


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
  static createUser(user: UserInput = random.userInput()): Promise<User> {
    return this._request('createUser', mutations.createUser, { user });
  }

  static async login(
    email: string,
    password: string,
    storeToken = true
  ): Promise<LoginOutput> {
    const res = await this._request<LoginOutput>('login', mutations.login, {
      email,
      password
    });
    if (storeToken) this.token = res.accessToken;
    return res;
  }

  static createPath(path: PathInput = random.pathInput()): Promise<Path> {
    return this._request('createPath', mutations.createPath, { path });
  }

  static joinPath(pathId: string): Promise<Boolean> {
    return this._request('joinPath', mutations.joinPath, { pathId });
  }

  static updatePath(path: UpdatePathInput): Promise<Path> {
    return this._request('updatePath', mutations.updatePath, { path });
  }

  static updatePreferences(preferences: UserPreferencesInput): Promise<UserPreferences> {
    return this._request('updatePreferences', mutations.updatePreferences, { preferences });
  }

  static createAssignment(assignment: CreateAssignmentInput): Promise<Assignment> {
    return this._request('createAssignment', mutations.createAssignment, { assignment });
  }

  static updateAssignment(assignment: UpdateAssignmentInput): Promise<Assignment> {
    return this._request('updateAssignment', mutations.updateAssignment, { assignment });
  }

  static deleteAssignment(assignmentId: string): Promise<Assignment> {
    return this._request('deleteAssignment', mutations.deleteAssignment, { assignmentId });
  }

  static createAssignmentFile(assignmentFile: CreateAssignmentFileInput): Promise<AssignmentFile> {
    return this._request('createAssignmentFile', mutations.createAssignmentFile, { assignmentFile });
  }

  static createFriendship(toId: String): Promise<FriendOutput> {
    return this._request('createFriendship', mutations.createFriendship, { toId });
  }

  static respondToFriendRequest(
    user1Id: string,
    user2Id: string,
    response: string
  ): Promise<Friend> {
    return this._request('respondToFriendRequest', mutations.respondToFriendRequest, { user1Id, user2Id, response });
  }

  static deleteFriendship(friendId: string): Promise<Boolean> {
    return this._request('deleteFriendship', mutations.deleteFriendship, { friendId });
  }

  static createModule(module: CreateModuleInput): Promise<Module> {
    return this._request('createModule', mutations.createModule, { module });
  }

  static updateModule(module: UpdateModuleInput): Promise<Module> {
    return this._request('updateModule', mutations.updateModule, { module });
  }

  static deleteModule(moduleId: string): Promise<Module> {
    return this._request('deleteModule', mutations.deleteModule, { moduleId });
  }

  static createCharacter(character: CreateCharacterInput): Promise<Character> {
    return this._request('createCharacter', mutations.createCharacter, { character });
  }

  static updateCharacter(character: UpdateCharacterInput): Promise<Character> {
    return this._request('updateCharacter', mutations.updateCharacter, { character });
  }

  static deleteCharacter(id: string): Promise<Boolean> {
    return this._request('deleteCharacter', mutations.deleteCharacter, { id });
  }

  static createConcept(concept: CreateConceptInput): Promise<Concept> {
    return this._request('createConcept', mutations.createConcept, { concept });
  }

  static learnConcept(conceptId: string): Promise<Boolean> {
    return this._request('learnConcept', mutations.learnConcept, { conceptId })
  }

  static updateConcept(concept: UpdateConceptInput): Promise<Concept> {
    return this._request('updateConcept', mutations.updateConcept, { concept });
  }
  // ------------------------------------------------------------------- Queries

  static getPathByName(name: string): Promise<Path> {
    return this._request('getPathByName', queries.getPathByName, { name });
  }

  static me(): Promise<User> {
    return this._request('me', queries.me);
  }

  static search(query: string): Promise<UserWithPassword[]> {
    return this._request('searchUsers', queries.search, { query });
  }

  static modules(): Promise<Module[]> {
    return this._request('modules', queries.modules);
  }

  static getUserFriends(userId: string): Promise< Friend[] > {
    return this._request('getUserFriends', queries.getUserFriends, { userId });
  }

  static getCharacters(): Promise<Character[]> {
    return this._request('getCharacters', queries.getCharacters);
  }

  static getConceptByName(name: string): Promise<Concept> {
    return this._request('getConceptByName', queries.getConceptByName, { name });
  }
  
  static users(): Promise<User[]> {
    return this._request('users', queries.users);
  }

  static getAssignments(): Promise<Assignment[]> {
      return this._request('assignments', queries.assignments);
    }

  // ----------------------------------------------------------------- Workflows
  static async workflowSignup() {
    const userInput = random.userInput();
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
  private static async _request<T>(
    name: string,
    query: string,
    variables?: any
  ): Promise<T> {
    const res = await request(this.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${this.token}`)
      .send({ query, variables });

    if (res.body.errors) throw new Error(res.body.errors[0].message);
    return res.body.data[name];
  }
}
