import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendsResolver } from './Friends.resolver';
import { FriendsService } from './Friends.service';
import { Friends } from './Friends.entity';
import { UserService } from '../User/User.service';
import { UserWithPassword } from '../User/User.entity';

// I do not understand why I need import UserWithPassword and UserService
@Module({
  imports: [
    TypeOrmModule.forFeature([Friends, UserWithPassword])
  ],
  providers: [FriendsResolver, FriendsService, UserService],
  exports: [FriendsService]
})
export class FriendsModule {}
