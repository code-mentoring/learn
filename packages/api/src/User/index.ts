import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserWithPassword } from './User.entity';
import { UserResolver } from './User.resolver';
import { UserService } from './User.service';
import { UserPreferences } from '../UserPreferences/UserPreferences.entity';
import { UserPreferencesService } from '../UserPreferences/UserPreferences.service';
import { FriendRequest } from '../FriendRequest/FriendRequest.entity';
import { FriendRequestService } from '../FriendRequest/FriendRequest.service';
import { Friend } from '../Friend/Friend.entity';
import { FriendService } from '../Friend/Friend.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserWithPassword,
    UserPreferences,
    FriendRequest,
    Friend
  ])],
  providers: [
    UserResolver,
    UserService,
    UserWithPassword,
    UserPreferencesService,
    FriendRequestService,
    FriendService
  ],
  exports: [UserService]
})
export class UserModule {}
