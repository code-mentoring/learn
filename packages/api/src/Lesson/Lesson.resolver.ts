import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { Lesson } from './Lesson.entity';
import { LessonService } from './Lesson.service';

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => Lesson)
  lesson(@Args('id') id: string) {
    return this.lessonService.findById(id);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [Lesson])
  moduleLessons(@Args('moduleId') moduleId: string) {
    return this.lessonService.findByModule(moduleId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Lesson)
  createLesson(
    @Args('moduleId') moduleId: string
  ) {
    return this.lessonService.create(moduleId);
  }

}
