import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EModule } from './Module.entity';
import { ModuleResolver } from './Module.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([EModule])
  ],
  providers: [ModuleResolver]
})
export class ModuleModule {}
