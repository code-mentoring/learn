import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseService } from './Database.service';
import { TypeORMModule } from './TypeORM.module';
import { SeederService } from './seeders/Seeders.service';
import { UserService } from '../User/User.service';
import { UserWithPassword } from '../User/User.entity';
import { UserPreferences } from '../UserPreferences/UserPreferences.entity';
import { UserPreferencesService } from '../UserPreferences/UserPreferences.service';


/**
 * Main Database Module, used in App.module and testing
 */
@Module({
  imports: [
    TypeORMModule,
    TypeOrmModule.forFeature([
      UserWithPassword,
      UserPreferences
    ])
  ],
  providers: [DatabaseService, SeederService, UserService, UserPreferencesService],
  exports: [DatabaseService, SeederService]
})
export class DatabaseModule { }
