import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserWithPassword } from './User.entity';
import { UserResolver } from './User.resolver';
import { UserService } from './User.service';
import { UserPreferences } from '../UserPreferences/UserPreferences.entity';
import { UserPreferencesService } from '../UserPreferences/UserPreferences.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserWithPassword, UserPreferences])],
  providers: [UserResolver, UserService, UserWithPassword, UserPreferencesService],
  exports: [UserService]
})
export class UserModule {}
