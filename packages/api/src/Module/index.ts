import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Module as ModuleEntity } from './Module.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModuleEntity])
  ]
})
export class ModuleModule {}
