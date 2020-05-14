import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { Assignment, AssignmentInput, UpdateAssignmentInput } from './Assignment.entity';
import { AssignmentService } from './Assignment.service';

@Resolver('Assignment')
export class AssignmentResolver {
  constructor(private readonly assignmentService: AssignmentService) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Assignment])
  assignments() {
    return this.assignmentService.findAll();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [Assignment])
  moduleAssignments(@Args('moduleId') moduleId: string) {
    return this.assignmentService.findByModule(moduleId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Assignment)
  createAssignment(@Args('assignment') assignment: AssignmentInput) {
    return this.assignmentService.create(assignment);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Assignment)
  updateAssignment(@Args('update') update: UpdateAssignmentInput) {
    return this.assignmentService.update(update);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  deleteAssignment(@Args('assignmentId') assignmentId: string) {
    return this.assignmentService.delete(assignmentId);
  }
}
