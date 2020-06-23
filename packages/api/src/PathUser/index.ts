import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PathUser } from './PathUser.entity';
import { PathUserService } from './PathUser.service';
import { Path } from '../Path/Path.entity';
import { PathService } from '../Path/Path.service';

@Module({
  imports: [TypeOrmModule.forFeature([PathUser, Path])],
  providers: [PathUserService, PathService],
  exports: [PathUserService]
})
export class PathUserModule {}
