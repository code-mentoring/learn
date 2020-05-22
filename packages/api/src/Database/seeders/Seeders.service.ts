import { Inject, Injectable } from '@nestjs/common';
import Listr from 'listr';
import { Connection, Repository } from 'typeorm';

import { UserService } from '../../User/User.service';
import { DatabaseService } from '../Database.service';
import { UserPreferencesService } from '../../UserPreferences/UserPreferences.service';
import { PathService } from '../../Path/Path.service';
import * as random from './random';
import { UserWithPassword } from '../../User/User.entity';
import { Path } from '../../Path/Path.entity';
import { ModuleService } from '../../Module/Module.service';
import { Module, ModuleType } from '../../Module/Module.entity';
import { Assignment } from '../../Assignment/Assignment.entity';
import { AssignmentService } from '../../Assignment/Assignment.service';
import { AssignmentFileService } from '../../AssignmentFile/AssignmentFile.service';
import { ConceptService } from '../../Concept/Concept.service';
import { FriendService } from '../../Friend/Friend.service';
import { FriendStatus } from '../../Friend/Friend.entity';


interface CTX {
  users: UserWithPassword[];
  paths: Path[];
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
    public userService: UserService,
    public userPreferencesService: UserPreferencesService,
    public pathService: PathService,
    public moduleService: ModuleService,
    public assignmentService: AssignmentService,
    public assignmentFileService: AssignmentFileService,
    public conceptService: ConceptService,
    public friendService: FriendService
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
  async seedUsers(num: number = 4): Promise<UserWithPassword[]> {
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

  async seedPaths(users: UserWithPassword[]) {
    const paths = [
      { name: 'javascript', icon: 'js' },
      { name: 'css', icon: 'css' },
      { name: 'html  ', icon: 'html' }
    ];
    return Promise.all(paths.map(async (path, i) => {
      const newPath = await this.pathService.create(
        random.pathInput({ name: path.name, icon: path.icon })
      );
      if (i === 0) {
        await this.pathService.addUserToPath(users[0].id, newPath.id);
      }
      return newPath;
    }));
  }

  // seed modules onto path[0]
  async seedModules(paths: Path[]) {
    const modules = [
      { name: 'Intro to JS', type: ModuleType.lesson },
      { name: 'Variables', type: ModuleType.assignment },
      { name: 'Functions', type: ModuleType.lesson },
      { name: 'Basic Maths', type: ModuleType.assignment }
    ];

    let previousId : string;
    return Promise.all(modules.map(async (_, i) => {
      const newModule = await this.moduleService.create(
        random.moduleInput(modules[i].name, paths[0].id, { type: modules[i].type, previousId })
      );
      previousId = newModule.id;
      return newModule;
    }));
  }

  async seedAssignment(modules: Module[]) {
    const assignments: Assignment[] = [];
    modules.map(async (_, i) => {
      if (modules[i].type === ModuleType.assignment) {
        assignments.push(await this.assignmentService.create(
          random.assignmentInput(modules[i].id)
        ));
      }
    });
    return assignments;
  }

  async seedAssignmentFile(assignments: Assignment[], users: UserWithPassword[]) {
    await this.assignmentFileService.create(
      users[0].id,
      random.assignmentFileInput(assignments[0].id)
    );
  }

  async seedConcept(
    numConcept: number = 3,
    numModule: number = 2,
    modules: Module[],
    users: UserWithPassword[]
  ) {
    const numMod = (numModule < modules.length) ? numModule : modules.length;
    return Promise.all(Array(numConcept).fill(undefined).map(async (_, i) => {
      const concept = await this.conceptService.create(
        random.conceptInput(modules[i % numMod].id)
      );

      if (i === 0) {
        await this.conceptService.addUserConcept(concept.id, users[0].id);
      }
    }));
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
          ctx.paths = await this.seedPaths(ctx.users);
        }
      },
      {
        title: 'Create module',
        task: async (ctx: CTX) => {
          ctx.modules = await this.seedModules(ctx.paths);
        }
      },
      {
        title: 'Create assignment',
        task: async (ctx: CTX) => {
          ctx.assignments = await this.seedAssignment(ctx.modules);
        }
      },
      {
        title: 'Create assignmentFile',
        task: async (ctx: CTX) => {
          await this.seedAssignmentFile(ctx.assignments, ctx.users);
        }
      },
      {
        title: 'Create concept',
        task: async (ctx: CTX) => {
          await this.seedConcept(3, 2, ctx.modules, ctx.users);
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
