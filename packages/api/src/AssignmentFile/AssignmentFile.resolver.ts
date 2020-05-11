import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { AssignmentFile, AssignmentFileInput } from './AssignmentFile.entity';
import { AssignmentFileService } from './AssignmentFile.service';

@Resolver('AssignmentFile')
export class AssignmentFileResolver {
  constructor(private readonly assignmentFileService: AssignmentFileService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [AssignmentFile])
  assignmentFiles() {
    return this.assignmentFileService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => AssignmentFile)
  createAssignmentFile(@Args('assignmentFile') assignmentFile: AssignmentFileInput) {
    return this.assignmentFileService.create(assignmentFile);
  }
}