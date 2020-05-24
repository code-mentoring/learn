import { Inject, Injectable } from '@nestjs/common';
import Listr from 'listr';
import { Connection, Repository } from 'typeorm';

import { UserService } from '../../User/User.service';
import { DatabaseService } from '../Database.service';
import { UserPreferencesService } from '../../UserPreferences/UserPreferences.service';
import * as random from './random';
import { UserWithPassword } from '../../User/User.entity';
import { PathService } from '../../Path/Path.service';
import { CharacterService } from '../../Character/Character.service';
import { Path } from '../../Path/Path.entity';
import { Character } from '../../Character/Character.entity';

interface CTX {
  users: UserWithPassword[];
  characters: Character[];
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
    public pathService: PathService,
    public characterService: CharacterService
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
        random.userInput({ email: `user${i}@test.com` })
      );

      if (i % 2 === 0) {
        await this.userPreferencesService.update(
          user.id,
          random.userPreferenceInput()
        );
      }
      return user;
    }));
  }

  async seedCharacters(num: number = 3): Promise<Character[]> {
    return Promise.all(Array(num).fill(undefined).map(async () => this.characterService.create(
      random.characterInput()
    )));
  }


  async seedPaths(users: UserWithPassword[], characters: Character[]) {
    const paths = [
      { name: 'javascript', icon: 'js' },
      { name: 'css', icon: 'css' },
      { name: 'html  ', icon: 'html' }
    ];

    return Promise.all(paths.map(async (path, i) => {
      let newPath = new Path();

      if ((i % 2 === 0) && (i < characters.length)) {
        newPath = await this.pathService.create(
          random.pathInput({ name: path.name, icon: path.icon, characterId: characters[i].id })
        );
      } else {
        newPath = await this.pathService.create(
          random.pathInput({ name: path.name, icon: path.icon })
        );
      }
      if (i === 0) {
        await this.pathService.addUserToPath(users[0].id, newPath.id);
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
        title: 'Create characters',
        task: async (ctx: CTX) => {
          ctx.characters = await this.seedCharacters();
        }
      },
      {
        title: 'Create paths',
        task: async (ctx: CTX) => {
          await this.seedPaths(ctx.users, ctx.characters);
        }
      }
    ]).run();
  }
}
