import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseService } from './Database.service';
import { TypeORMModule } from './TypeORM.module';
import { SeederService } from './seeders/Seeders.service';
import { UserService } from '../User/User.service';
import { UserWithPassword } from '../User/User.entity';
import { UserPreferences } from '../UserPreferences/UserPreferences.entity';
import { UserPreferencesService } from '../UserPreferences/UserPreferences.service';
import { PathService } from '../Path/Path.service';
import { Path } from '../Path/Path.entity';
import { PathUser } from '../PathUser/PathUser.entity';
import { CharacterService } from '../Character/Character.service';
import { Character } from '../Character/Character.entity';


/**
 * Main Database Module, used in App.module and testing
 */
@Module({
  imports: [
    TypeORMModule,
    TypeOrmModule.forFeature([
      UserWithPassword,
      UserPreferences,
      Path,
      PathUser,
      Character
    ])
  ],
  providers: [
    DatabaseService,
    SeederService,
    UserService,
    UserPreferencesService,
    PathService,
    CharacterService
  ],
  exports: [DatabaseService, SeederService]
})
export class DatabaseModule { }
