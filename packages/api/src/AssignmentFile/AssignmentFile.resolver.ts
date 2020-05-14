import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { AssignmentFile, AssignmentFileInput, UpdateAssignmentFileInput } from './AssignmentFile.entity';
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

  @UseGuards(GQLAuthGuard)
  @Query(() => [AssignmentFile])
  assignmentAssignmentFiles(@Args('assignmentId') assignmentId: string) {
    return this.assignmentFileService.findByAssignment(assignmentId);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [AssignmentFile])
  userAssignmentFiles(@Args('authorId') authorId: string) {
    return this.assignmentFileService.findByUser(authorId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => AssignmentFile)
  updateAssignmentFile(@Args('update') update: UpdateAssignmentFileInput) {
    return this.assignmentFileService.update(update);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  deleteAssignmentFile(@Args('assignmentFileId') assignmentFileId: string) {
    return this.assignmentFileService.delete(assignmentFileId);
  }
}
