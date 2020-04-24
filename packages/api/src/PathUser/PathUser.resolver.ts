import { UseGuards } from '@nestjs/common';
import {  Resolver, Args, Mutation } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import {  EPathUser } from './PathUser.entity';
import { PathUserService } from './PathUser.service';

@Resolver('PathUser')
export class PathUserResolver {
  constructor(private readonly pathUserService: PathUserService) {}

  @UseGuards(GQLAuthGuard)
  @Mutation(() => EPathUser)
  createPathUser(@Args('userId') userId: string,@Args('pathId') pathId: string) {
    return this.pathUserService.create(userId, pathId);
  }
}
