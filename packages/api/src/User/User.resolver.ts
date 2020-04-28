import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { User, UserInput } from './User.entity';
import { UserService } from './User.service';
import { CurrentUser } from './CurrentUser.decorator';
import { UserPreferences, UserPreferencesInput } from '../UserPreferences/UserPreferences.entity';

@Resolver('User')
export class UserResolver {

  constructor(private readonly userService: UserService) { }

  @UseGuards(GQLAuthGuard)
  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => User)
  me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => User)
  createUser(@Args({ name: 'user', type: () => UserInput }) user: UserInput) {
    return this.userService.create(user);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => UserPreferences)
  updatePreferences(@CurrentUser() user: User, @Args({ name: 'input', type: () => UserPreferencesInput }) input: UserPreferencesInput) {
    return this.userService.updatePreferences(user.id, input);
  }
}
