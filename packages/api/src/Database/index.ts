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
import { Module as CMModule } from '../Module/Module.entity';
import { ModuleService } from '../Module/Module.service';
import { Assignment } from '../Assignment/Assignment.entity';
import { AssignmentService } from '../Assignment/Assignment.service';
import { Concept } from '../Concept/Concept.entity';
import { ConceptService } from '../Concept/Concept.service';
import { UserConcept } from '../UserConcepts/UserConcept.entity';
import { UserConceptService } from '../UserConcepts/UserConcept.service';
import { Friend } from '../Friend/Friend.entity';
import { FriendService } from '../Friend/Friend.service';
import { AssignmentFile } from '../AssignmentFile/AssignmentFile.entity';
import { AssignmentFileService } from '../AssignmentFile/AssignmentFile.service';
import { CharacterService } from '../Character/Character.service';
import { Character } from '../Character/Character.entity';
import { UserModule } from '../UserModule/UserModule.entity';


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
      CMModule,
      Assignment,
      AssignmentFile,
      Concept,
      UserConcept,
      Friend,
      Character,
      UserModule
    ])
  ],
  providers: [
    DatabaseService,
    SeederService,
    UserService,
    UserPreferencesService,
    PathService,
    ModuleService,
    AssignmentService,
    AssignmentFileService,
    ConceptService,
    UserConceptService,
    FriendService,
    CharacterService
  ],
  exports: [DatabaseService, SeederService]
})
export class DatabaseModule { }
