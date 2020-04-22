import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Path } from './Path.entity';
import { PathResolver } from './Path.resolver';
import { PathService } from './Path.service';

@Module({
  imports: [TypeOrmModule.forFeature([Path])],
  providers: [PathResolver, PathService],
  exports: [PathService],
})
export class PathModule {}
