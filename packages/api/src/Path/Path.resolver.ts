import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { PathInput, Path } from './Path.entity';
import { PathService } from './Path.service';

@Resolver('Path')
export class PathResolver {
  constructor(private readonly pathService: PathService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Path])
  paths() {
    return this.pathService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => Path)
  getPathByName(@Args('name') name: string) {
    return this.pathService.findByName(name);
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
    return Boolean(await this.pathService.addUserToPath(pathId, user.id));
  }
}
