import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { Assignment, AssignmentInput } from './Assignment.entity';
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
  @Mutation(() => Assignment)
  createAssignment(@Args('assignment') assignment: AssignmentInput) {
    return this.assignmentService.create(assignment);
  }
}
