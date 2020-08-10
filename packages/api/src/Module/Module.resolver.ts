import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { UserModuleService } from '../UserModule/UserModule.service';
import { Module, ModuleLesson, ModuleUnion } from './Module.entity';
import { ModuleService } from './Module.service';


@Resolver(() => ModuleLesson)
export class ModuleResolver {
  constructor(
    private readonly moduleService: ModuleService,
    private readonly userModuleService: UserModuleService
  ) { }

  @UseGuards(GQLAuthGuard)
  @Query(() => [ModuleUnion])
  modules() {
    return this.moduleService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [ModuleUnion])
  pathModules(@Args('pathId') pathId: string) {
    return this.moduleService.findByPathId(pathId);
  }

  // ---------------------------------------------------------------------------
  // -------------------------------------------------------------------- Fields
  // ---------------------------------------------------------------------------

  @ResolveField(() => Boolean)
  async completed(
    @CurrentUser() user: User,
    @Parent() module: Module
  ) {
    return Boolean(await this.userModuleService.findOne(user.id, module.id));
  }
}
