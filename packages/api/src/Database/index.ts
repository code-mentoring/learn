import { Module } from '@nestjs/common';

import { DatabaseService } from './Database.service';
import { TypeORMModule } from './TypeORM.module';
import { SeederService } from './seeders/Seeders.service';

/**
 * Main Database Module, used in App.module and testing
 */
@Module({
  imports: [TypeORMModule],
  providers: [DatabaseService, SeederService],
  exports: [DatabaseService, SeederService]
})
export class DatabaseModule { }
