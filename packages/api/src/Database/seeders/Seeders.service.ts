import { Inject, Injectable } from '@nestjs/common';
import Listr from 'listr';
import { Connection, Repository } from 'typeorm';

import { Assignment } from '../../Assignment/Assignment.entity';
import { AssignmentService } from '../../Assignment/Assignment.service';
import { AssignmentFileService } from '../../AssignmentFile/AssignmentFile.service';
import { Character } from '../../Character/Character.entity';
import { CharacterService } from '../../Character/Character.service';
import { ConceptService } from '../../Concept/Concept.service';
import { FriendStatus } from '../../Friend/Friend.entity';
import { FriendService } from '../../Friend/Friend.service';
import { Module } from '../../Module/Module.entity';
import { ModuleService } from '../../Module/Module.service';
import { Path } from '../../Path/Path.entity';
import { PathService } from '../../Path/Path.service';
import { UserWithPassword } from '../../User/User.entity';
import { UserService } from '../../User/User.service';
import { UserPreferencesService } from '../../UserPreferences/UserPreferences.service';
import { DatabaseService } from '../Database.service';
import * as random from './random';
import { CMS } from '../../CMS/CMS';
import { RoleService } from '../../Role/Role.service';
import { RoleType } from '../../Role/RoleType.enum';

interface CTX {
  users: UserWithPassword[];
  paths: Path[];
  characters: Character[];
  modules: Module[];
  assignments: Assignment[];
}

@Injectable()
export class SeederService {
  /**
   * Initializes the database service
   * @param connection The connection, which gets injected
   */
  constructor(
    @Inject('Connection') public connection: Connection,
    public cms: CMS,
    public userService: UserService,
    public userPreferencesService: UserPreferencesService,
    public pathService: PathService,
    public moduleService: ModuleService,
    public assignmentService: AssignmentService,
    public assignmentFileService: AssignmentFileService,
    public conceptService: ConceptService,
    public friendService: FriendService,
    public characterService: CharacterService,
    public roleService: RoleService
  ) {}

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
  async seedUsers(num: number = 4): Promise<UserWithPassword[]> {
    return Promise.all(
      Array(num)
        .fill(undefined)
        .map(async (_, i) => {
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
        })
    );
  }

  async seedCharacters(num: number = 3): Promise<Character[]> {
    return Promise.all(
      Array(num)
        .fill(undefined)
        .map(async () => this.characterService.create(random.characterInput()))
    );
  }

  async seedPaths(
    users: UserWithPassword[] = [],
    characters: Character[] = []
  ) {
    const paths = [
      { id: 'js', name: 'Javascript', icon: 'js' },
      { id: 'css', name: 'CSS', icon: 'css' },
      { id: 'html', name: 'HTML', icon: 'html' }
    ];

    return Promise.all(
      paths.map(async (path, i) => {
        let newPath = new Path();

        if (i % 2 === 0 && i < characters.length) {
          newPath = await this.pathService.create(
            random.pathInput({ ...path, characterId: characters[i].id })
          );
        } else {
          newPath = await this.pathService.create(random.pathInput(path));
        }
        if (i === 0 && users.length) {
          await this.pathService.addUserToPath(users[0].id, newPath.id);
        }
        return newPath;
      })
    );
  }

  async seedConcept(
    numConcept: number = 3,
    numModule: number = 2,
    users: UserWithPassword[]
  ) {
    const modules = Object.values(this.cms.modules);
    const numMod = numModule < modules.length ? numModule : modules.length;
    return Promise.all(
      Array(numConcept)
        .fill(undefined)
        .map(async (_, i) => {
          const concept = await this.conceptService.create(
            random.conceptInput(modules[i % numMod].id)
          );

          if (i === 0) {
            await this.conceptService.addUserConcept(concept.id, users[0].id);
          }
        })
    );
  }

  async seedFriend(users: UserWithPassword[]) {
    if (users.length > 1) {
      await this.friendService.create(users[0].id, users[1].id);
    }
    if (users.length > 2) {
      await this.friendService.create(users[2].id, users[0].id);
      await this.friendService.update({
        user1Id: users[0].id,
        user2Id: users[2].id,
        status: FriendStatus.accepted,
        since: new Date()
      });
    }
    if (users.length > 3) {
      await this.friendService.create(users[0].id, users[3].id);
      await this.friendService.update({
        user1Id: users[0].id,
        user2Id: users[3].id,
        status: FriendStatus.rejected
      });
    }
  }

  /**
   *  Add Roles
   */

  async seedRoles() {
    await this.roleService.create({
      name: RoleType.ADMIN,
      description: 'Site Admin'
    });
    await this.roleService.create({
      name: RoleType.MENTOR,
      description: 'Site Mentor'
    });
    await this.roleService.create({
      name: RoleType.STUDENT,
      description: 'Site STUDENT'
    });
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
        title: 'Create Roles',
        task: async () => {
          await this.seedRoles();
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
          ctx.paths = await this.seedPaths(ctx.users, ctx.characters);
        }
      },
      // {
      //   title: 'Create module',
      //   task: async (ctx: CTX) => {
      //     ctx.modules = await this.seedModules(ctx.paths);
      //   }
      // },
      // {
      //   title: 'Create assignment',
      //   task: async (ctx: CTX) => {
      //     ctx.assignments = await this.seedAssignment(ctx.modules);
      //   }
      // },
      // {
      //   title: 'Create assignmentFile',
      //   task: async (ctx: CTX) => {
      //     await this.seedAssignmentFile(ctx.assignments, ctx.users);
      //   }
      // },
      {
        title: 'Create concepts',
        task: async (ctx: CTX) => {
          await this.seedConcept(3, 2, ctx.users);
        }
      },
      {
        title: 'Create friend',
        task: async (ctx: CTX) => {
          await this.seedFriend(ctx.users);
        }
      }
    ]).run();
  }
}
