import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendResolver } from './Friend.resolver';
import { FriendService } from './Friend.service';
import { Friend } from './Friend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friend])
  ],
  providers: [FriendResolver, FriendService],
  exports: [FriendService]
})
export class FriendModule {}
