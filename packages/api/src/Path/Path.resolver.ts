import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CMS } from '../CMS/CMS';
import { ModuleUnion } from '../Module/Module.entity';
import { PathUserService } from '../PathUser/PathUser.service';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { Path, PathInput, UpdatePathInput } from './Path.entity';
import { PathService } from './Path.service';

@Resolver(() => Path)
export class PathResolver {
  constructor(
    private readonly pathService: PathService,
    private readonly pathUserService: PathUserService,
    private readonly cms: CMS
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Path])
  paths(
    @Args('onlyJoined', {
      description: 'Only get the current user\'s paths',
      nullable: true,
      defaultValue: false
    }) onlyJoined: boolean,
    @Args('notJoined', {
      description: 'Only get paths the current user has not joined',
      nullable: true,
      defaultValue: false
    }) notJoined: boolean,
    @CurrentUser() user: User
  ) {
    if (onlyJoined || notJoined) return this.pathService.findByUser(user.id, notJoined);
    return this.pathService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => Path)
  path(@Args('id') id: string) {
    return this.pathService.findById(id);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Path)
  createPath(@Args('path') path: PathInput) {
    return this.pathService.create(path);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async joinPath(
    @Args('pathId') pathId: string,
    @CurrentUser() user: User
  ) {
    return Boolean(await this.pathService.addUserToPath(user.id, pathId));
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async joinPaths(
    @Args('paths', { type: () => [String] }) paths: string[],
    @CurrentUser() user: User
  ) {
    return Boolean(await this.pathService.addUserToPath(user.id, paths));
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Path)
  async updatePath(
    @Args('path') path: UpdatePathInput
  ) {
    return this.pathService.update(path);
  }

  // ---------------------------------------------------------------------------
  // -------------------------------------------------------------------- Fields
  // ---------------------------------------------------------------------------

  @ResolveField(() => Number)
  async progress(
    @CurrentUser() user: User,
    @Parent() path: Path
  ) {
    return (await this.pathUserService.getProgress(user.id, path.id)) || 0;
  }

  @ResolveField(() => [ModuleUnion])
  async modules(
    @Parent() path: Path
  ) {
    return this.cms.findModulesByPathId(path.id);
  }
}
