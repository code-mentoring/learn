import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { User, UserInput, Me } from './User.entity';
import { UserService } from './User.service';
import { CurrentUser } from './CurrentUser.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => Me)
  me(@CurrentUser() user: any) {
    return user;
  }

  @Mutation(() => User)
  createUser(@Args({ name: 'user', type: () => UserInput }) user: UserInput) {
    return this.userService.create(user);
  }
}
