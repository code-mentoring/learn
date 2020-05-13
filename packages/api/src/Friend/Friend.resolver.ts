import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { FriendService } from './Friend.service';
import { Friend, FriendInput, UserFriendOutput } from './Friend.entity';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';

@Resolver('Friend')
export class FriendResolver {
  constructor(
    private readonly friendsService: FriendService
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [UserFriendOutput])
  getUserFriends(@Args('userId') userId: string) {
    return this.friendsService.findUserFriendsById(userId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Friend)
  async addFriend(
    @Args('friendInput') friendInput: FriendInput
  ) {
    return this.friendsService.create(friendInput);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async deleteFriend(
    @CurrentUser() user: User,
    @Args('friendId') friendId: string
  ) {
    return this.friendsService.delete(user.id, friendId);
  }
}
