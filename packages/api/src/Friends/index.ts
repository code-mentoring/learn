import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendsResolver } from './Friends.resolver';
import { FriendsService } from './Friends.service';
import { Friends } from './Friends.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friends])
  ],
  providers: [FriendsResolver, FriendsService],
  exports: [FriendsService]
})
export class FriendsModule {}
