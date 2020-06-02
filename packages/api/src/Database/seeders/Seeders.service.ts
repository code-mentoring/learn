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

  /**
   * Seeds as many paths as characters we have
   * and each user joins to first path
   */
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

  /**
   * Seeds 4 modules for each path (2 assignments and 2 lessons)
   */
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


  /**
   * Seeds assignment to each module with type as assignment
   */
  async seedAssignment(modules: Module[]) {
    return Promise.all(modules
      .filter(m => m.type === ModuleType.assignment)
      .map(async module => this.assignmentService.create(random.assignmentInput(module.id))));
  }

  /**
   * For each assignment first user has 1 assignment file
   */
  async seedAssignmentFile(assignments: Assignment[], users: UserWithPassword[]) {
    return Promise.all(assignments.map(assignment => this.assignmentFileService.create(
      users[0].id,
      random.assignmentFileInput(assignment.id)
    )));
  }

  /**
   * Seeds 16 concepts for each module.
   * Adds userConcept of first concept of each module to first user
   */
  async seedConcept(
    modules: Module[],
    users: UserWithPassword[],
    num: number = 16
  ) : Promise<Concept[]> {

    // TODO: add concept icons
    const icons = ['check', 'minus', 'plus', 'x', 'lock'];

    const concepts = await Promise.all(modules.map(async (m, i) =>
      Promise.all(Array(num).fill(undefined).map(async () => {
        const concept = await this.conceptService.create(
          random.conceptInput(m.id, { icon: icons[Math.floor(Math.random() * icons.length)] })
        );
        if (i === 0) {
          await this.conceptService.addUserConcept(concept.id, users[0].id);
        }
        return concept;
      }))));
    return concepts.flat();
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
   * Seeds 4 lessons for each module
   * @param numLesson Number of lessons you want to create per module
   * @param numModule Number of modules you want to add lessons
   */
  async seedLessons(
    modls: Module[],
    numLesson: number = 4,
    numModule: number = 4
  ): Promise<Lesson[]> {
    const numMod = (numModule < modls.length) ? numModule : modls.length;
    const modules = modls.slice(0, numMod);

    const lessons = await Promise.all(modules.map(async module =>
      Promise.all(Array(numLesson)
        .fill(undefined)
        .map(async () => this.lessonService.create(module.id)))));
    return lessons.flat();
  }

  /**
   * per concept per storySection
   * number of storySection per Lesson = number of cocept / number of lesson
   */
  async seedStorySections(
    concepts: Concept[],
    lessons: Lesson[]
  ) {
    // group concepts by moduleId
    type ModuleConcepts = {
      moduleId: String,
      concepts: Concept[]
    };
    const moduleConcepts: ModuleConcepts[] = [];
    concepts.map(concept => {
      const mc = moduleConcepts.find(c => c.moduleId === concept.moduleId);
      return mc ? mc.concepts.push(concept)
        : moduleConcepts.push({ moduleId: concept.moduleId, concepts: [concept] });
    });

    // group lessons by moduleId
    type ModuleLessons = {
      moduleId: String,
      lessons: Lesson[]
    };
    const moduleLessons: ModuleLessons[] = [];
    lessons.map(lesson => {
      const mlesson = moduleLessons.find(l => l.moduleId === lesson.moduleId);
      return mlesson ? mlesson.lessons.push(lesson)
        : moduleLessons.push({ moduleId: lesson.moduleId, lessons: [lesson] });
    });

    await Promise.all(moduleConcepts.map(async mc => {
      const ml = moduleLessons.find(l => l.moduleId === mc.moduleId);
      if (ml !== undefined) {
        const numSotryPerLesson = Math.floor(mc.concepts.length / ml.lessons.length);
        await Promise.all(ml.lessons.map(async (lesson, i) => {
          for (let x = 0; x < numSotryPerLesson; x += 1) {
            await this.storySectionService.create(
              random.storySectionInput(
                x + 1,
                lesson.id,
                mc.concepts[numSotryPerLesson * i + x].id
              )
            );
          }
        }));
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
