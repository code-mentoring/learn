import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
// import { User } from '../User/User.entity';
import { FriendRequestsInput, FriendRequests, ConfirmRejectInput } from './FriendRequests.entity';
import { FriendRequestsService } from './FriendRequests.service';

@Resolver('FriendRequests')
export class FriendRequestsResolver {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  // no use case to dump all the friend_request table
  // @UseGuards(GQLAuthGuard)
  // @Query(() => [FriendRequests])
  // friendRequests() {
  //   return this.friendRequestsService.findAll();
  // }

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

  // @UseGuards(GQLAuthGuard)
  // @Mutation(() => FriendRequests)
  // updateFriendRequest(@Args('updateInput') updateInput: FriendRequestsInput) {
  //   return this.friendRequestsService.updateFriendRequest(updateInput);
  // }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  confirmRejectRequest(@Args('input') input: ConfirmRejectInput) {
    return this.friendRequestsService.confirmRejectRequest(input);
  }
}
