import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './UserModule.entity';
import { UserModuleService } from './UserModule.service';
import { UserModuleResolver } from './UserModule.resolver';
import { PathUserService } from '../PathUser/PathUser.service';
import { PathService } from '../Path/Path.service';
import { Path } from '../Path/Path.entity';
import { PathUser } from '../PathUser/PathUser.entity';
import { CMS } from '../CMS/CMS';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModule, PathUser, Path])
  ],
  providers: [UserModuleResolver, UserModuleService, PathUserService, PathService, CMS]
})
export class UserModuleModule {}
