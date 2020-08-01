import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Assignment } from '../Assignment/Assignment.entity';
import { AssignmentService } from '../Assignment/Assignment.service';
import { AssignmentFile } from '../AssignmentFile/AssignmentFile.entity';
import { AssignmentFileService } from '../AssignmentFile/AssignmentFile.service';
import { Character } from '../Character/Character.entity';
import { CharacterService } from '../Character/Character.service';
import { Concept } from '../Concept/Concept.entity';
import { ConceptService } from '../Concept/Concept.service';
import { Friend } from '../Friend/Friend.entity';
import { FriendService } from '../Friend/Friend.service';
import { ModuleService } from '../Module/Module.service';
import { Path } from '../Path/Path.entity';
import { PathService } from '../Path/Path.service';
import { PathUser } from '../PathUser/PathUser.entity';
import { PathUserService } from '../PathUser/PathUser.service';
import { UserWithPassword } from '../User/User.entity';
import { UserService } from '../User/User.service';
import { UserConcept } from '../UserConcepts/UserConcept.entity';
import { UserConceptService } from '../UserConcepts/UserConcept.service';
import { UserModule } from '../UserModule/UserModule.entity';
import { UserModuleService } from '../UserModule/UserModule.service';
import { UserPreferences } from '../UserPreferences/UserPreferences.entity';
import { UserPreferencesService } from '../UserPreferences/UserPreferences.service';
import { DatabaseService } from './Database.service';
import { SeederService } from './seeders/Seeders.service';
import { TypeORMModule } from './TypeORM.module';
import { CMS } from '../CMS/CMS';

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
    CMS,
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
    CharacterService,
    PathUserService,
    UserModuleService
  ],
  exports: [DatabaseService, SeederService]
})
export class DatabaseModule {}
