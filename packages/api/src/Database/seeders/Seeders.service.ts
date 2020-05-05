import { Inject, Injectable } from '@nestjs/common';
import faker from 'faker';
import Listr from 'listr';
import { Connection, Repository } from 'typeorm';

import { UserInput } from '../../User/User.entity';
import { UserService } from '../../User/User.service';
import { DatabaseService } from '../Database.service';
import { UserPreferencesInput } from '../../UserPreferences/UserPreferences.entity';
import { UserPreferencesService } from '../../UserPreferences/UserPreferences.service';


@Injectable()
export class SeederService {

  /**
   * Initializes the database service
   * @param connection The connection, which gets injected
   */
  constructor(
    @Inject('Connection') public connection: Connection,
    public userService: UserService,
    public userPreferencesService: UserPreferencesService
  ) { }

  db = new DatabaseService(this.connection);

  /**
   * Returns the repository of the given entity
   * @param entity The database entity to get the repository from
   */
  async getRepository<T>(entity: string): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }

  randomUserInput(input: Partial<UserInput> = {}): UserInput {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'secret',
      ...input
    };
  }

  randomUserPreferenceInput(): UserPreferencesInput {
    return {
      practiceGoal: Math.floor(Math.random() * 4) + 1,
      why: faker.lorem.sentence(),
      codingAbility: Math.floor(Math.random() * 10) + 1
    };
  }

  /**
   * Seeds users in the database
   * @param num Number of users you want to create
   */
  async seedUsers(num: number = 3) {
    return Promise.all(Array(num).fill(undefined).map(async (_, i) => {
      const user = await this.userService.create(
        this.randomUserInput({ email: `user${i}@test.com` })
      );

      if (i % 2 === 0) {
        await this.userPreferencesService.update(
          user.id,
          this.randomUserPreferenceInput()
        );
      }
    }));
  }

  /**
   * Seeds all entities in the database
   */
  async seedAll() {
    await new Listr([
      {
        title: 'Reset DB',
        task: async () => {
          this.db.DANGEROUSLY_RESET_DATABASE();
        }
      },
      {
        title: 'Create users',
        task: async () => {
          await this.seedUsers();
        }
      }
    ]).run();
  }
}
