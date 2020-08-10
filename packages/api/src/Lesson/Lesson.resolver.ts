import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CMS } from '../CMS/CMS';
import { ModuleLesson } from '../Module/Module.entity';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { UserModuleService } from '../UserModule/UserModule.service';

@ObjectType()
class BeginLesson {
  @Field()
  secret: string;

  @Field()
  lesson: ModuleLesson;
}

@Resolver(() => ModuleLesson)
export class LessonResolver {
  constructor(
    private readonly cms: CMS,
    private readonly userModuleService: UserModuleService
  ) { }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => BeginLesson)
  async beginLesson(
    @Args('id') id: string,
    @CurrentUser() user: User
  ): Promise<BeginLesson> {
    const lesson = this.cms.findLessonById(id);
    if (!lesson) throw new NotFoundException(`Lesson '${id}' could not be found`);
    const secret = await this.userModuleService.beginModule(user.id, id);
    return { lesson, secret };
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async completeLesson(
    @Args('id') id: string,
    @Args('answers') answers: string,
    @CurrentUser() user: User
  ) {
    return this.userModuleService.completeLesson(user.id, id, answers);
  }
}
