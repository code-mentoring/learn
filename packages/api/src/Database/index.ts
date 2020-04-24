import { Module } from '@nestjs/common';

import { DatabaseService } from './Database.service';
import { TypeORMModule } from './TypeORM.module';

/**
 * Main Database Module, used in App.module and testing
 */
@Module({
  imports: [TypeORMModule],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule { }
