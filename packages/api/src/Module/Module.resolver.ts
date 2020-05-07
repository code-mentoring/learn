import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { Module, ModuleInput, EModule } from './Module.entity';

@Resolver(() => Module)
export class ModuleResolver {

  @UseGuards(GQLAuthGuard)
  @Query(() => [Module])
  modules() {
    return EModule.find();
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Module)
  createModule(
    @Args('module') module: ModuleInput,
    @Args('pathId') pathId: string,
    @Args('previousId', { nullable: true }) previousId?: string
  ) {
    return EModule.create({ ...module, pathId, previousId }).save();
  }

  // ---------------------------------------------------------------------------
  // -------------------------------------------------------------------- Fields
  // ---------------------------------------------------------------------------

  @ResolveField(() => EModule)
  async path(@Parent() module: EModule) {
    return EModule.findOne({ pathId: module.pathId });
  }

}
