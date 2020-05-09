import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { FriendRequestsInput, FriendRequests } from './FriendRequests.entity';
import { FriendRequestsService } from './FriendRequests.service';

@Resolver('FriendRequests')
export class FriendRequestsResolver {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  // no use case to dump all the friend_request table
  @UseGuards(GQLAuthGuard)
  @Query(() => [FriendRequests])
  friendRequests() {
    return this.friendRequestsService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [FriendRequests])
  getFriendRequestsFromMe(@CurrentUser() user: User) {
    return this.friendRequestsService.findByFrom(user.id);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [FriendRequests])
  getFriendRequestsToMe(@CurrentUser() user: User) {
    return this.friendRequestsService.findByTo(user.id);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => FriendRequests)
  createFriendRequest(@Args('createFriendRequest') friendRequestsInput: FriendRequestsInput) {
    return this.friendRequestsService.create(friendRequestsInput);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => FriendRequests)
  updateFriendRequest(@Args('updateFriendRequest') friendRequestsInput: FriendRequestsInput) {
    return this.friendRequestsService.updateFriendRequest(friendRequestsInput);
  }
}
