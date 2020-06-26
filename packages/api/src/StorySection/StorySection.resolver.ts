import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { StorySectionService } from './StorySection.service';
import { StorySection, CreateStorySectionInput } from './StorySection.entity';
import { CMS } from '../CMS/CMS';

@Resolver(() => StorySection)
export class StorySectionResolver {
  constructor(
    private readonly storySectionService: StorySectionService,
    private readonly cms: CMS
  ) {}

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

  @UseGuards(GQLAuthGuard)
  @ResolveField()
  async content(@Parent() story: StorySection) {
    const { order, lesson: { module: { name, path: { name: pathName } } } } = story;
    const moduleIndex = story.lesson.module.path.modules.findIndex(m => m.name === name);

    return this.cms.findStory(pathName, moduleIndex, order);
  }

}
