import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EModule } from './Module.entity';
import { ModuleResolver } from './Module.resolver';
import { ModuleService } from './Module.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EModule])
  ],
  providers: [ModuleResolver, ModuleService]
})
export class ModuleModule {}
