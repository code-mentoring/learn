import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { User, UserInput } from './User.entity';
import { UserService } from './User.service';

@Resolver('User')
export class UserResolver {

  constructor(private readonly userService: UserService) { }

  @UseGuards(GQLAuthGuard)
  @Query(() => [User])
  users() {
    console.log('here');
    return []
  }

  @Mutation(() => User)
  createUser(
    @Args({ name: 'user', type: () => UserInput }) user: UserInput
  ) {
    return this.userService.create(user);
  }
}
