import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { Assignment } from './Assignment.entity';
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

}
