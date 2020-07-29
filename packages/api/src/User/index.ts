import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserWithPassword } from './User.entity';
import { UserResolver } from './User.resolver';
import { UserService } from './User.service';
import { UserPreferences } from '../UserPreferences/UserPreferences.entity';
import { UserPreferencesService } from '../UserPreferences/UserPreferences.service';
import { PathService } from '../Path/Path.service';
import { PathUser } from '../PathUser/PathUser.entity';
import { Path } from '../Path/Path.entity';
import { Role } from '../Role/Role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserWithPassword,
      UserPreferences,
      Path,
      PathUser,
      Role
    ])
  ],
  providers: [
    UserResolver,
    UserService,
    UserWithPassword,
    UserPreferencesService,
    PathService
  ],
  exports: [UserService]
})
export class UserModule {}
