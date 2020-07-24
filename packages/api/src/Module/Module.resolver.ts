import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { ModuleUnion, ModuleLesson, Module } from './Module.entity';
import { ModuleService } from './Module.service';
import { UserModuleService } from '../UserModule/UserModule.service';


@Resolver(() => ModuleLesson)
export class ModuleResolver {
  constructor(
    private readonly moduleService: ModuleService,
    private readonly userModuleService: UserModuleService
  ) { }

  // // Needed for union resolve
  // @ResolveField(() => ModuleUnion)
  // __resolveType(value: Module) {
  //   switch (value.type) {
  //     case ModuleType.assignment: return ModuleAssignment;
  //     case ModuleType.lesson: return ModuleLesson;
  //     default: return null;
  //   }
  // }

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

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async joinModule(
    @CurrentUser() user: User,
    @Args('moduleId') moduleId: string
  ) {
    return Boolean(await this.moduleService.addUserToModule(user.id, moduleId));
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
