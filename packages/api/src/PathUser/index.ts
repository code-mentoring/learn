import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PathUser } from './PathUser.entity';
import { PathUserResolver } from './PathUser.resolver';
import { PathUserService } from './PathUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([PathUser])],
  providers: [PathUserResolver, PathUserService],
  exports: [PathUserService]
})
export class PathUserModule {}
