import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { EPath, PathInput } from './Path.entity';
import { PathService } from './Path.service';

@Resolver('Path')
export class PathResolver {
  constructor(private readonly pathService: PathService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [EPath])
  paths() {
    return this.pathService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => EPath)
  createPath(@Args('pathInput') pathInput: PathInput) {
    return this.pathService.create(pathInput);
  }
}
