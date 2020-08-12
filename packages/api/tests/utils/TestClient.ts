import 'jest-extended';

import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { Type } from '@nestjs/common';
import { appImports } from '../../src/App.module';
import { UpdateAssignmentFileInput } from '../../src/AssignmentFile/AssignmentFile.entity';
import { CreateCharacterInput, UpdateCharacterInput } from '../../src/Character/Character.entity';
import { CMS } from '../../src/CMS/CMS';
import { DatabaseService } from '../../src/Database/Database.service';
import * as random from '../../src/Database/seeders/random';
import { SeederService } from '../../src/Database/seeders/Seeders.service';
import { UpdatePathInput } from '../../src/Path/Path.entity';
import { UserWithPassword } from '../../src/User/User.entity';
import { UserPreferences, UserPreferencesInput } from '../../src/UserPreferences/UserPreferences.entity';
import {
  Assignment,
  AssignmentFile,
  Character,
  Concept,
  CreateAssignmentFileInput,
  CreateConceptInput,
  Friend,
  FriendOutput,
  LoginOutput,
  Module,
  Path,
  PathInput,
  UpdateConceptInput,
  User,
  UserModule,
  UserInput,
  BeginLesson
} from '../../types';
import mutations from './mutations';
import queries from './queries';
import { TestLogger } from './TestLogger.service';
import { UserModuleService } from '../../src/UserModule/UserModule.service';


/**
 * A helper class to test the API
 */
export abstract class TestClient {
  static module: TestingModule;

  static cms: CMS;

  static db: DatabaseService;

  static seeder: SeederService;

  static app: any;

  static token: string;


  static get<TInput = any>(t: Type<TInput>) {
    return this.module.get(t);
  }


  /**
   * Reset the entire database
   */
  static async resetDatabase(initial?: boolean) {
    await this.db.DANGEROUSLY_RESET_DATABASE();
    if (initial) await this.workflowInitial();
  }

  /**
   * Starts a testing NestJS server
   * @param resetDatabase Reset the database
   */
  static async start(resetDatabase = true) {
    this.module = await Test.createTestingModule({
      imports: appImports,
      providers: [TestLogger],
      exports: [TestLogger]
    }).compile();

    this.cms = await this.module.resolve(CMS);
    this.db = await this.module.resolve(DatabaseService);
    this.seeder = await this.module.get(SeederService);
    if (resetDatabase) await this.resetDatabase();

    this.app = this.module.createNestApplication();
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

  static completeModule(moduleName: string): Promise<UserModule> {
    return this._request('completeModule', mutations.completeModule, { moduleName });
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

  static createAssignmentFile(assignmentFile: CreateAssignmentFileInput): Promise<AssignmentFile> {
    return this._request('createAssignmentFile', mutations.createAssignmentFile, { assignmentFile });
  }

  static updateAssignmentFile(file: UpdateAssignmentFileInput): Promise<AssignmentFile> {
    return this._request('updateAssignmentFile', mutations.updateAssignmentFile, { file });
  }

  static deleteAssignmentFile(assignmentFileId: string): Promise<AssignmentFile> {
    return this._request('deleteAssignmentFile', mutations.deleteAssignmentFile, { assignmentFileId });
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

  // static joinModule(moduleId: string): Promise<Boolean> {
  //   return this._request('joinModule', mutations.joinModule, { moduleId });
  // }

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
    return this._request('learnConcept', mutations.learnConcept, { conceptId });
  }

  static updateConcept(concept: UpdateConceptInput): Promise<Concept> {
    return this._request('updateConcept', mutations.updateConcept, { concept });
  }

  static beginLesson(id: string): Promise<BeginLesson> {
    return this._request('beginLesson', mutations.beginLesson, { id });
  }

  static completeLesson(answers: string, id: string): Promise<boolean> {
    return this._request('completeLesson', mutations.completeLesson, { answers, id });
  }

  // ------------------------------------------------------------------- Queries

  static path(id: string): Promise<Path> {
    return this._request('path', queries.path, { id });
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

  static myFriends(userId: string): Promise<Friend[]> {
    return this._request('myFriends', queries.myFriends, { userId });
  }

  static characters(): Promise<Character[]> {
    return this._request('characters', queries.characters);
  }

  static concept(name: string): Promise<Concept> {
    return this._request('concept', queries.concept, { name });
  }

  static users(): Promise<User[]> {
    return this._request('users', queries.users);
  }

  static getAssignments(): Promise<Assignment[]> {
    return this._request('assignments', queries.assignments);
  }

  static getAssignmentFiles(assignmentId: string): Promise<AssignmentFile[]> {
    return this._request('assignmentFiles', queries.assignmentFiles, { assignmentId });
  }

  // ----------------------------------------------------------------- Workflows
  static async workflowInitial() {
    await this.seeder.seedPaths();
  }

  static async workflowSignup() {
    const userInput = random.userInput();
    const user = await this.createUser(userInput);
    const { accessToken } = await this.login(user.email, userInput.password);
    return { password: userInput.password, user, accessToken };
  }

  static async workflowLesson(lessonID1 = 'html-introduction', lessonID2 = 'html-text') {
    const umService = this.get(UserModuleService);
    const { user: me } = await this.workflowSignup();
    const mod1 = this.cms.findLessonById(lessonID1);
    const mod2 = this.cms.findLessonById(lessonID2);
    const { lesson: lesson1, secret: secret1 } = await this.beginLesson(mod1.id);
    const { lesson: lesson2, secret: secret2 } = await this.beginLesson(mod2.id);
    const answers1 = await umService.prepareLessonAnswer(lesson1.id, secret1);
    const answers2 = await umService.prepareLessonAnswer(lesson2.id, secret2);

    return { me, mod1, mod2, lesson1, lesson2, secret1, secret2, answers1, answers2 };
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

    if (res.body.errors) {
      throw new Error(res.body.errors[0].message);
    }
    return res.body.data[name];
  }
}
