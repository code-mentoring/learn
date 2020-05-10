import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { User } from '../User/User.entity';
import { FriendsService } from './Friends.service';
import { Friends, FriendsInput } from './Friends.entity';

@Resolver('Friends')
export class FriendsResolver {
  constructor(
    private readonly friendsService: FriendsService
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [User])
  getUserFriends(@Args('userId') userId: string) {
    return this.friendsService.findUserFriendsById(userId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Friends)
  async addFriend(
    @Args('friend') friend: FriendsInput
  ) {
    return this.friendsService.create(friend);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async deleteFriend(
    @Args('friend') friend: FriendsInput
  ) {
    return this.friendsService.delete(friend);
  }
}
