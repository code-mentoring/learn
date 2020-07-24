import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CMS } from '../CMS/CMS';
import { UserModule } from '../UserModule/UserModule.entity';
import { UserModuleService } from '../UserModule/UserModule.service';
import { ModuleResolver } from './Module.resolver';
import { ModuleService } from './Module.service';
import { CMSModule } from '../CMS';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserModule]),
    CMSModule
  ],
  providers: [
    ModuleResolver,
    ModuleService,
    UserModuleService,
    CMS
  ]
})
export class ModuleModule {}
