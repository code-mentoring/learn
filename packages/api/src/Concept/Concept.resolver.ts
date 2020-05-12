import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ConceptService } from './Concept.service';
import { Concept, ConceptInput, UpdateConceptInput } from './Concept.entity';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';

@Resolver('concept')
export class ConceptResolver {
  constructor(private readonly conceptService: ConceptService) { }

  @UseGuards(GQLAuthGuard)
  @Query(() => [Concept])
  getConcepts() {
    return this.conceptService.findConcepts();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => Concept)
  getConceptByName(@Args('name') name: string) {
    return this.conceptService.findByName(name);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Concept)
  createConcept(@Args('concept') concept: ConceptInput) {
    return this.conceptService.create(concept);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Concept)
  updateConcept(@Args('update') update: UpdateConceptInput) {
    return this.conceptService.update(update);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  deleteConcept(@Args('conceptId') conceptId: string) {
    return this.conceptService.delete(conceptId);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async learnConcept(@Args('conceptId') conceptId: string,
  @CurrentUser() user: User) {
    return Boolean(await this.conceptService.addUserConcept(conceptId, user.id));
  }
}
