import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { FriendshipService } from './Friendship.service';
import { UserFriendshipOutput, Friendship, ConfirmRejectInput } from './Friendship.entity';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';

@Resolver('Friendship')
export class FriendshipResolver {
  constructor(
    private readonly friendshipService: FriendshipService
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [UserFriendshipOutput])
  getUserFriends(@Args('userId') userId: string) {
    return this.friendshipService.findUserFriendsById(userId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Friendship)
  requestFriendship(
    @CurrentUser() user: User,
    @Args('toId') toId: string
  ) {
    return this.friendshipService.createRequest(user.id, toId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  confirmRejectRequest(@Args('input') input: ConfirmRejectInput) {
    return this.friendshipService.confirmRejectRequest(input);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async deleteFriend(
    @CurrentUser() user: User,
    @Args('friendId') friendId: string
  ) {
    return this.friendshipService.delete(user.id, friendId);
  }
}
