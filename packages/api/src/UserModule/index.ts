import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWithPassword } from '../User/User.entity';
import { UserService } from '../User/User.service';
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
    TypeOrmModule.forFeature([
      UserModule,
      PathUser,
      Path,
      UserWithPassword
    ])],
  providers: [
    UserModuleResolver,
    UserModuleService,
    UserModule,
    PathUserService,
    PathService,
    CMS,
    UserService,
    UserWithPassword
  ],
  exports: [UserModuleService]
})
export class UserModuleModule {}
