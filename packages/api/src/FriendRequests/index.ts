import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendRequests } from './FriendRequests.entity';
import { FriendRequestsResolver } from './FriendRequests.resolver';
import { FriendRequestsService } from './FriendRequests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequests])
  ],
  providers: [FriendRequestsResolver, FriendRequestsService],
  exports: [FriendRequestsService]
})
export class FriendRequestsModule {}
