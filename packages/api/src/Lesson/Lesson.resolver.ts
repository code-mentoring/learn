import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CMS } from '../CMS/CMS';
import { Lesson } from './Lesson.entity';

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(
    private readonly cms: CMS
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => Lesson)
  lesson(
    @Args('id') id: string
  ) {
    return this.cms.findLessonById(id);
  }

}
