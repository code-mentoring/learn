import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendRequest } from './FriendRequest.entity';
import { FriendRequestResolver } from './FriendRequest.resolver';
import { FriendRequestService } from './FriendRequest.service';
import { Friend } from '../Friend/Friend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequest, Friend])
  ],
  providers: [FriendRequestResolver, FriendRequestService],
  exports: [FriendRequestService]
})
export class FriendRequestModule {}
