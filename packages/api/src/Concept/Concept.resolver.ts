import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CMS } from '../CMS/CMS';
import { LessonModule } from '../Lesson';
import { Roles } from '../Role/Role.guard';
import { CurrentUser } from '../User/CurrentUser.decorator';
import { User } from '../User/User.entity';
import { UserConcept } from '../UserConcepts/UserConcept.entity';
import { UserConceptService } from '../UserConcepts/UserConcept.service';
import { Concept, CreateConceptInput, UpdateConceptInput } from './Concept.entity';
import { ConceptService } from './Concept.service';


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

  @Roles('admin')
  @Mutation(() => Concept)
  createConcept(@Args('concept') concept: CreateConceptInput) {
    return this.conceptService.create(concept);
  }

  @Roles('admin')
  @Mutation(() => Concept)
  updateConcept(@Args('concept') concept: UpdateConceptInput) {
    return this.conceptService.update(concept);
  }

  @Roles('admin')
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
