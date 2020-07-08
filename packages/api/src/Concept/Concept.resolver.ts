import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ConceptService } from './Concept.service';
import { Concept, CreateConceptInput, UpdateConceptInput } from './Concept.entity';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { UserConceptService } from '../UserConcepts/UserConcept.service';
import { UserConcept } from '../UserConcepts/UserConcept.entity';
import { LessonModule } from '../Lesson';
import { CMS } from '../CMS/CMS';

@Resolver(Concept)
export class ConceptResolver {
  constructor(
    private readonly conceptService: ConceptService,
    private readonly userConceptService: UserConceptService,
    private readonly cms: CMS
  ) { }

  @UseGuards(GQLAuthGuard)
  @Query(() => [Concept])
  concepts() {
    return this.conceptService.findConcepts();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => Concept)
  concept(@Args('name') name: string) {
    return this.conceptService.findByName(name);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [UserConcept])
  async userLearnedConcepts(@CurrentUser() user: User) {
    return this.userConceptService.findByUser(user.id);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Concept)
  createConcept(@Args('concept') concept: CreateConceptInput) {
    return this.conceptService.create(concept);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Concept)
  updateConcept(@Args('concept') concept: UpdateConceptInput) {
    return this.conceptService.update(concept);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  deleteConcept(@Args('conceptId') conceptId: string) {
    return this.conceptService.delete(conceptId);
  }

  // TODO: Make this more locked down
  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async learnConcept(
    @Args('conceptId') conceptId: string,
    @CurrentUser() user: User
  ) {
    return Boolean(await this.conceptService.addUserConcept(conceptId, user.id));
  }

  // ---------------------------------------------------------------------------
  // -------------------------------------------------------------------- Fields
  // ---------------------------------------------------------------------------

  @ResolveField(() => LessonModule)
  async taughtIn(
    @Parent() concept: Concept
  ) {
    return this.cms.findModuleById(concept.taughtInId);
  }
}
