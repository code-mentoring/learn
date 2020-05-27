import { Inject, Injectable } from '@nestjs/common';
import Listr from 'listr';
import { Connection, Repository } from 'typeorm';

import { UserService } from '../../User/User.service';
import { DatabaseService } from '../Database.service';
import { UserPreferencesService } from '../../UserPreferences/UserPreferences.service';
import * as random from './random';
import { UserWithPassword } from '../../User/User.entity';
import { Path } from '../../Path/Path.entity';
import { PathService } from '../../Path/Path.service';
import { CharacterService } from '../../Character/Character.service';
import { Character } from '../../Character/Character.entity';
import { ModuleService } from '../../Module/Module.service';
import { Module, ModuleType } from '../../Module/Module.entity';
import { Assignment } from '../../Assignment/Assignment.entity';
import { AssignmentService } from '../../Assignment/Assignment.service';
import { AssignmentFileService } from '../../AssignmentFile/AssignmentFile.service';
import { Concept } from '../../Concept/Concept.entity';
import { ConceptService } from '../../Concept/Concept.service';
import { FriendService } from '../../Friend/Friend.service';
import { FriendStatus } from '../../Friend/Friend.entity';
import { LessonService } from '../../Lesson/Lesson.service';
import { Lesson } from '../../Lesson/Lesson.entity';
import { StorySectionService } from '../../StorySection/StorySection.service';


interface CTX {
  users: UserWithPassword[];
  paths: Path[];
  characters: Character[];
  modules: Module[];
  assignments: Assignment[];
  concepts: Concept[];
  lessons: Lesson[];
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
    public friendService: FriendService,
    public characterService: CharacterService,
    public lessonService: LessonService,
    public storySectionService: StorySectionService
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

  async seedCharacters(): Promise<Character[]> {
    return Promise.all(['Ellie', 'Folke'].map(async name => this.characterService.create(
      { name: name.toLowerCase(), displayName: name }
    )));
  }

  // Seed as many paths as characters we have
  // Each user joins to first path
  async seedPaths(users: UserWithPassword[], characters: Character[]) {
    let pathIcons = ['html', 'js', 'css', 'react', 'nodejs'];
    pathIcons = pathIcons.slice(0, characters.length);

    return Promise.all(pathIcons.map(async (pathIcon, i) => {
      const newPath = await this.pathService.create(
        random.pathInput({
          name: `Path ${pathIcon}`,
          icon: pathIcon,
          characterId: characters[i].id
        })
      );

      if (i === 0) {
        users.map(async user => this.pathService.addUserToPath(user.id, newPath.id));
      }

      return newPath;
    }));
  }

  // Seed 4 modules for each path
  async seedModules(paths: Path[]) {
    const res = await Promise.all(paths.map(async path => {
      const modulesType = [
        ModuleType.assignment, ModuleType.lesson, ModuleType.assignment, ModuleType.lesson
      ];
      const newModules: Module[] = [];
      let previousId: string | undefined;
      /* eslint-disable no-restricted-syntax, no-await-in-loop  */
      for (const type of modulesType) {
        const newModule = await this.moduleService.create(
          random.moduleInput(path.id,
            { previousId, icon: path.icon, type })
        );
        previousId = newModule.id;
        newModules.push(newModule);
      }
      return newModules;
    }));

    return res.flat();

  }

  async seedAssignment(modules: Module[]) {
    return Promise.all(modules
      .filter(m => m.type === ModuleType.assignment)
      .map(async module => this.assignmentService.create(random.assignmentInput(module.id))));
  }

  // For each assignment first user has 1 assignment file
  async seedAssignmentFile(assignments: Assignment[], users: UserWithPassword[]) {
    return Promise.all(assignments.map(assignment => this.assignmentFileService.create(
      users[0].id,
      random.assignmentFileInput(assignment.id)
    )));
  }

  // seed number of concepte evently on number of modules.
  async seedConcept(
    modules: Module[],
    users: UserWithPassword[],
    numConcept: number = 6,
    numModule: number = 2
  ) : Promise<Concept[]> {
    const numMod = (numModule < modules.length) ? numModule : modules.length;
    return Promise.all(Array(numConcept).fill(undefined).map(async (_, i) => {
      const concept = await this.conceptService.create(
        random.conceptInput(modules[i % numMod].id)
      );

      if (i === 0) {
        await this.conceptService.addUserConcept(concept.id, users[0].id);
      }
      return concept;
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

  // seed number of lesson evently on number of modules.
  async seedLessons(
    modules: Module[],
    numLesson: number = 6,
    numModule: number = 1
  ): Promise<Lesson[]> {
    const numMod = (numModule < modules.length) ? numModule : modules.length;
    return Promise.all(Array(numLesson)
      .fill(undefined)
      .map((_, i) => this.lessonService.create((modules[i % numMod].id))));
  }

  // per concept per storySection
  // for now: add all concept to lesson[0], target to evently linked to each lesson.
  async seedStorySections(
    concept: Concept[],
    lesson: Lesson[]
  ) {
    return Promise.all(Array(concept.length).fill(undefined).map(async (_, i) => {
      await this.storySectionService.create(
        random.storySectionInput(
          i + 1,
          lesson[0].id,
          concept[i].id
        )
      );
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
          ctx.paths = await this.seedPaths(ctx.users, ctx.characters);
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
          ctx.concepts = await this.seedConcept(ctx.modules, ctx.users);
        }
      },
      {
        title: 'Create lesson',
        task: async (ctx: CTX) => {
          ctx.lessons = await this.seedLessons(ctx.modules);
        }
      },
      {
        title: 'Create story sections',
        task: async (ctx: CTX) => {
          await this.seedStorySections(ctx.concepts, ctx.lessons);
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
