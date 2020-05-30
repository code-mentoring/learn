import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Module as EModule } from './Module.entity';
import { ModuleResolver } from './Module.resolver';
import { ModuleService } from './Module.service';
import { UserModule } from '../UserModule/UserModule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EModule, UserModule])
  ],
  providers: [ModuleResolver, ModuleService]
})
export class ModuleModule {}
