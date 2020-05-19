import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { AssignmentFile, CreateAssignmentFileInput, UpdateAssignmentFileInput } from './AssignmentFile.entity';
import { AssignmentFileService } from './AssignmentFile.service';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';

@Resolver('AssignmentFile')
export class AssignmentFileResolver {
  constructor(private readonly assignmentFileService: AssignmentFileService) {}

  @UseGuards(GQLAuthGuard)
  @Mutation(() => AssignmentFile)
  createAssignmentFile(
    @CurrentUser() user: User,
    @Args('assignmentFile') assignmentFile: CreateAssignmentFileInput
  ) {
    return this.assignmentFileService.create(user.id, assignmentFile);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [AssignmentFile])
  assignmentFiles(@Args('assignmentId') assignmentId: string) {
    return this.assignmentFileService.findByAssignment(assignmentId);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [AssignmentFile])
  userAssignmentFiles(@Args('authorId') authorId: string) {
    return this.assignmentFileService.findByUser(authorId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => AssignmentFile)
  updateAssignmentFile(
    @CurrentUser() user: User,
    @Args('file') file: UpdateAssignmentFileInput
  ) {
    return this.assignmentFileService.update(user.id, file);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  deleteAssignmentFile(@Args('assignmentFileId') assignmentFileId: string) {
    return this.assignmentFileService.delete(assignmentFileId);
  }
}
