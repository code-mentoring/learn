import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssignmentFile } from './AssignmentFile.entity';
import { AssignmentFileResolver } from './AssignmentFile.resolver';
import { AssignmentFileService } from './AssignmentFile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssignmentFile])
  ],
  providers: [AssignmentFileResolver, AssignmentFileService],
  exports: [AssignmentFileService]
})
export class AssignmentFileModule {}
