import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { appImports } from '../../src/App.module';
import { DatabaseService } from '../../src/Database/Database.service';
import { User, UserInput } from '../../types';
import mutations from './mutations';

/**
 * A helper class to test the API
 */
export abstract class TestClient {
  static db: DatabaseService;

  static app: any;


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
      imports: appImports
    }).compile();

    this.db = await moduleFixture.resolve(DatabaseService);
    if (resetDatabase) await this.resetDatabase();


    this.app = moduleFixture.createNestApplication();
    await this.app.init();
  }

  /**
   * Stops the NestJS testing server
   */
  static async stop() {
    await this.app.close();
  }


  // ----------------------------------------------------------------- Mutations
  static createUser(user: UserInput): Promise<User> {
    return this._request('createUser', mutations.createUser, { user });
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
      .send({ query, variables });

    if (res.body.errors) throw new Error(res.body.errors[0].message);
    return res.body.data[name];
  }
}
