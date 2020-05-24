import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { StorySectionService } from './StorySection.service';
import { StorySection, CreateStorySectionInput } from './StorySection.entity';

@Resolver(() => StorySection)
export class StorySectionResolver {
  constructor(private readonly storySectionService: StorySectionService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [StorySection])
  lessonStorySections(@Args('lessonId') lessonId: string) {
    return this.storySectionService.findByLesson(lessonId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => StorySection)
  createStorySection(
    @Args('storySectionInput') storySectionInput: CreateStorySectionInput
  ) {
    return this.storySectionService.create(storySectionInput);
  }

}
