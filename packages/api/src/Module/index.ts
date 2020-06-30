import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../UserModule/UserModule.entity';
import { UserModuleService } from '../UserModule/UserModule.service';
import { Module as EModule } from './Module.entity';
import { ModuleResolver } from './Module.resolver';
import { ModuleService } from './Module.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EModule, UserModule])
  ],
  providers: [ModuleResolver, ModuleService, UserModuleService]
})
export class ModuleModule {}
