import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { User, UserInput } from './User.entity';
import { UserService } from './User.service';
import { CurrentUser } from './CurrentUser.decorator';
import { UserPreferences, UserPreferencesInput } from '../UserPreferences/UserPreferences.entity';
import { UserPreferencesService } from '../UserPreferences/UserPreferences.service';
import { FriendRequests } from '../FriendRequests/FriendRequests.entity';
import { FriendRequestsService } from '../FriendRequests/FriendRequests.service';
import { Friends } from '../Friends/Friends.entity';
import { FriendsService } from '../Friends/Friends.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userPreferencesService: UserPreferencesService,
    private readonly friendRequestsService: FriendRequestsService,
    private readonly friendsService: FriendsService
  ) { }

  @UseGuards(GQLAuthGuard)
  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => User)
  me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation(() => User)
  createUser(@Args({ name: 'user', type: () => UserInput }) user: UserInput) {
    return this.userService.create(user);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => UserPreferences)
  updatePreferences(
    @CurrentUser() user: User,
    @Args('preferences', { type: () => UserPreferencesInput }) preferences: UserPreferencesInput
  ) {
    return this.userPreferencesService.update(user.id, preferences);
  }

  // ---------------------------------------------------------------------------
  // -------------------------------------------------------------------- Fields
  // ---------------------------------------------------------------------------

  @ResolveField(() => UserPreferences)
  async userPreferences(@Parent() user: User) {
    const userPreferences = await this.userPreferencesService.findByUser(user.id);
    return userPreferences;
  }

  @ResolveField(() => [FriendRequests])
  async friendRequestFrom(@Parent() @CurrentUser() user: User) {
    const friendRequestFrom = await this.friendRequestsService.findByTo(user.id);
    return friendRequestFrom;
    }
  
  @ResolveField(() => [FriendRequests])
  async friendRequestTo(@Parent() @CurrentUser() user: User) {
    const friendRequestTo = await this.friendRequestsService.findByFrom(user.id);
    return friendRequestTo;
    }

  @ResolveField(() => [Friends])
  async friends(@Parent() @CurrentUser() user: User) {
    const friendRequestTo = await this.friendsService.findbyOneId(user.id);
    return friendRequestTo;
    }  
}
