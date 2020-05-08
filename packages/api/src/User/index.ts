import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserWithPassword } from './User.entity';
import { UserResolver } from './User.resolver';
import { UserService } from './User.service';
import { UserPreferences } from '../UserPreferences/UserPreferences.entity';
import { UserPreferencesService } from '../UserPreferences/UserPreferences.service';
import { FriendRequests } from '../FriendRequests/FriendRequests.entity';
import { FriendRequestsService } from '../FriendRequests/FriendRequests.service';


@Module({
  imports: [TypeOrmModule.forFeature([
    UserWithPassword,
    UserPreferences,
    FriendRequests
  ])],
  providers: [
    UserResolver,
    UserService,
    UserWithPassword,
    UserPreferencesService,
    FriendRequestsService
  ],
  exports: [UserService]
})
export class UserModule {}
