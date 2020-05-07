import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { Module, ModuleInput, EModule } from './Module.entity';
import { ModuleService } from './Module.service';

@Resolver(() => Module)
export class ModuleResolver {
  constructor(private readonly moduleService: ModuleService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Module])
  modules() {
    return this.moduleService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Module)
  createModule(
    @Args('module') module: ModuleInput,
    @Args('pathId') pathId: string,
    @Args('previousId', { nullable: true }) previousId?: string
  ) {
    return this.moduleService.create(module, pathId, previousId);
  }

  // ---------------------------------------------------------------------------
  // -------------------------------------------------------------------- Fields
  // ---------------------------------------------------------------------------

  @ResolveField(() => EModule)
  async path(@Parent() module: EModule) {
    return EModule.findOne({ pathId: module.pathId });
  }

  @ResolveField(() => EModule)
  async previous(@Parent() module: EModule) {
    return EModule.findOne({ id: module.previousId });
  }

}
