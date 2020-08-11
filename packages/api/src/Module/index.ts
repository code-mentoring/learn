import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CMS } from '../CMS/CMS';
import { UserModule } from '../UserModule/UserModule.entity';
import { UserModuleService } from '../UserModule/UserModule.service';
import { ModuleResolver } from './Module.resolver';
import { ModuleService } from './Module.service';
import { CMSModule } from '../CMS';
import { UserWithPassword } from '../User/User.entity';
import { UserService } from '../User/User.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModule, UserWithPassword]),
    CMSModule
  ],
  providers: [
    ModuleResolver,
    ModuleService,
    UserModuleService,
    UserWithPassword,
    UserService,
    CMS
  ]
})
export class ModuleModule {}
