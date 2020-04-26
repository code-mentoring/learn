import faker from 'faker';
import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository, getRepository } from 'typeorm';
import Listr from 'listr';
import bcrypt from 'bcrypt';

import { UserWithPassword } from '../../User/User.entity';
import { DatabaseService } from '../Database.service';

@Injectable()
export class SeederService {

  /**
   * Initializes the database service
   * @param connection The connection, which gets injected
   */
  constructor(@Inject('Connection') public connection: Connection) { }

  db = new DatabaseService(this.connection);

  /**
   * Returns the repository of the given entity
   * @param entity The database entity to get the repository from
   */
  async getRepository<T>(entity: string): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }

  /**
   * Seeds users in the database
   * @param num Number of users you want to create
   */
  async seedUsers(num: number = 3) {
    return Promise.all(Array(num).fill(undefined).map(async (_, i) => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      return getRepository<UserWithPassword>('user').create({
        firstName,
        lastName,
        email: `user${i}@test.com`,
        password: await bcrypt.hash(`user${i}123`, 10)
      }).save();
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
