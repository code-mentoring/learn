import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { FriendsService } from './Friends.service';
import { Friends, FriendsInput, UserFriendOutput } from './Friends.entity';

@Resolver('Friends')
export class FriendsResolver {
  constructor(
    private readonly friendsService: FriendsService
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [UserFriendOutput])
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
