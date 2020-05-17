import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Assignment } from './Assignment.entity';
import { AssignmentResolver } from './Assignment.resolver';
import { AssignmentService } from './Assignment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment])
  ],
  providers: [AssignmentResolver, AssignmentService],
  exports: [AssignmentService]
})
export class AssignmentModule {}
