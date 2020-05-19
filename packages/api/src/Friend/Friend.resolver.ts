import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { FriendService } from './Friend.service';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { Friend, FriendStatus, FriendOutput } from './Friend.entity';

@Resolver('Friend')
export class FriendResolver {
  constructor(
    private readonly friendService: FriendService
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Friend])
  getUserFriends(@Args('userId') userId: string) {
    return this.friendService.findByUser(userId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => FriendOutput)
  createFriendship(
    @CurrentUser() user: User,
    @Args('toId') toId: string
  ) {
    return this.friendService.create(user.id, toId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Friend)
  respondToFriendRequest(
    @Args('user1Id') user1Id: string,
    @Args('user2Id') user2Id: string,
    @Args('response') response: FriendStatus
  ) {
    return this.friendService.update({ user1Id, user2Id, status: response, since: new Date() });
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async deleteFriendship(
    @CurrentUser() user: User,
    @Args('friendId') friendId: string
  ) {
    return this.friendService.delete(user.id, friendId);
  }
}
