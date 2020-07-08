import { createUnionType, Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Assignment } from '../Assignment/Assignment.entity';
import { Lesson } from '../Lesson/Lesson.entity';


export enum ModuleType {
  assignment = 'assignment',
  lesson = 'lesson'
}

registerEnumType(ModuleType, { name: 'ModuleType' });

@ObjectType()
export class ModuleBase {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  type: ModuleType;

  @Field({ nullable: true })
  previousId?: string;

  @Field()
  pathId: string;

  // eslint-disable-next-line no-use-before-define
  @Field(() => ModuleUnion, { nullable: true })
  previous?: Module;

  @Field(() => Boolean)
  completed?: boolean;
}


@ObjectType()
export class ModuleAssignment extends ModuleBase {
  @Field(() => Assignment)
  assignment: Assignment;
}

@ObjectType()
export class ModuleLesson extends ModuleBase {
  @Field(() => Lesson)
  lesson: Lesson;
}


// ----------------------------------------------------------------------- Union
export type Module =
  ModuleAssignment |
  ModuleLesson;

export const ModuleUnion = createUnionType({
  name: 'Module',
  types: () => [ModuleAssignment, ModuleLesson],
  resolveType(value) {
    switch (value.type) {
      case ModuleType.assignment: return ModuleAssignment;
      case ModuleType.lesson: return ModuleLesson;
      default: return null;
    }
  }
});
