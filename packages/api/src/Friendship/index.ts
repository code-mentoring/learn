import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendshipResolver } from './Friendship.resolver';
import { FriendshipService } from './Friendship.service';
import { Friendship } from './Friendship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friendship])
  ],
  providers: [FriendshipResolver, FriendshipService],
  exports: [FriendshipService]
})
export class FriendshipModule {}
