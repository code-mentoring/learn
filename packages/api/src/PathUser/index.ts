import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PathUser } from './PathUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PathUser])]
})
export class PathUserModule {}
