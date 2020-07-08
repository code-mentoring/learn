import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CMS } from '../CMS/CMS';
import { StorySection } from './StorySection.entity';

@Resolver(() => StorySection)
export class StorySectionResolver {
  constructor(
    private readonly cms: CMS
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [StorySection])
  lessonStorySections(@Args('lessonId') lessonId: string) {
    return this.cms.findModuleById(lessonId);
  }
}
