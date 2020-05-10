import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { FriendRequestsInput, FriendRequests, ConfirmRejectInput } from './FriendRequests.entity';
import { FriendRequestsService } from './FriendRequests.service';

@Resolver('FriendRequests')
export class FriendRequestsResolver {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [FriendRequests])
  getFriendRequestsFromMe(@CurrentUser() useId: string) {
    return this.friendRequestsService.findByFrom(useId);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [FriendRequests])
  getFriendRequestsToMe(@CurrentUser() useId: string) {
    return this.friendRequestsService.findByTo(useId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => FriendRequests)
  createFriendRequest(@Args('createInput') createInput: FriendRequestsInput) {
    return this.friendRequestsService.create(createInput);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  confirmRejectRequest(@Args('input') input: ConfirmRejectInput) {
    return this.friendRequestsService.confirmRejectRequest(input);
  }
}
