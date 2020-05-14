import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { FriendService } from './Friend.service';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { Friend, CreateFriendInput, FriendStatus, FriendOutput } from './Friend.entity';

@Resolver('Friend')
export class FriendResolver {
  constructor(
    private readonly friendService: FriendService
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Friend])
  getUserFriends(@Args('userId') userId: string) {
    return this.friendService.findUserFriendsById(userId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => FriendOutput)
  createFriend(@Args('friendInput') friendInput: CreateFriendInput) {
    return this.friendService.create(friendInput);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Friend)
  confirmRejectRequest(
    @Args('id') id: string,
    @Args('response') response: FriendStatus
  ) {
    return this.friendService.update({ id, status: response, since: new Date() });
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async deleteFriend(
    @CurrentUser() user: User,
    @Args('friendId') friendId: string
  ) {
    return this.friendService.delete(user.id, friendId);
  }
}
