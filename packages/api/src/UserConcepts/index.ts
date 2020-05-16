import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserConcept } from './UserConcept.entity';
import { UserConceptService } from './UserConcept.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserConcept])],
  providers: [UserConceptService],
  exports: [UserConceptService]
})
export class UserConceptModule { }
