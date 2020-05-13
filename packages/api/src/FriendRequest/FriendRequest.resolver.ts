import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { FriendRequest, ConfirmRejectInput } from './FriendRequest.entity';
import { FriendRequestService } from './FriendRequest.service';
import { User } from '../User/User.entity';

@Resolver('FriendRequest')
export class FriendRequestResolver {
  constructor(private readonly friendRequestsService: FriendRequestService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [FriendRequest])
  getFriendsRequestFromMe(@CurrentUser() useId: string) {
    return this.friendRequestsService.findByFrom(useId);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [FriendRequest])
  getFriendsRequestToMe(@CurrentUser() useId: string) {
    return this.friendRequestsService.findByTo(useId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => FriendRequest)
  requestFriendship(
    @CurrentUser() user: User,
    @Args('toId') toId: string
  ) {
    return this.friendRequestsService.create(user.id, toId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  confirmRejectRequest(@Args('input') input: ConfirmRejectInput) {
    return this.friendRequestsService.confirmRejectRequest(input);
  }
}
