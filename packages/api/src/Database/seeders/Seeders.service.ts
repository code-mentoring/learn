import { Inject, Injectable } from '@nestjs/common';
import Listr from 'listr';
import { Connection, Repository } from 'typeorm';

import { UserService } from '../../User/User.service';
import { DatabaseService } from '../Database.service';
import { UserPreferencesService } from '../../UserPreferences/UserPreferences.service';
import { PathService } from '../../Path/Path.service';
import { randomUserInput, randomUserPreferenceInput, randomPath } from './random';
import { UserWithPassword } from '../../User/User.entity';

interface CTX {
  users: UserWithPassword[];
}

@Injectable()
export class SeederService {

  /**
   * Initializes the database service
   * @param connection The connection, which gets injected
   */
  constructor(
    @Inject('Connection') public connection: Connection,
    public userService: UserService,
    public userPreferencesService: UserPreferencesService,
    public pathService: PathService
  ) { }

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
  async seedUsers(num: number = 3): Promise<UserWithPassword[]> {
    return Promise.all(Array(num).fill(undefined).map(async (_, i) => {
      const user = await this.userService.create(
        randomUserInput({ email: `user${i}@test.com` })
      );

      if (i % 2 === 0) {
        await this.userPreferencesService.update(
          user.id,
          randomUserPreferenceInput()
        );
      }
      return user;
    }));
  }

  async seedPaths(users: UserWithPassword[]) {
    const paths = [
      { name: 'javascript', icon: 'js' },
      { name: 'css', icon: 'css' },
      { name: 'html  ', icon: 'html' }
    ];
    return Promise.all(paths.map(async (path, i) => {
      const newPath = await this.pathService.create(
        randomPath({ name: path.name, icon: path.icon })
      );
      if (i === 0) {
        await this.pathService.addUserToPath(newPath.id, users[0].id);
      }
      return newPath;
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
        task: async (ctx: CTX) => {
          ctx.users = await this.seedUsers();
        }
      },
      {
        title: 'Create paths',
        task: async (ctx: CTX) => {
          await this.seedPaths(ctx.users);
        }
      }
    ]).run();
  }
}
