import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ConceptService } from './Concept.service';
import { Concept, ConceptInput } from './Concept.entity';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from '../Auth/GQLAuth.guard';

@Resolver('concept')
export class ConceptResolver {
    constructor(private readonly conceptService: ConceptService) { }

    @UseGuards(GQLAuthGuard)
    @Query(_type => [Concept])
    getConcepts(){
        return this.conceptService.findConcepts();
    }

    @UseGuards(GQLAuthGuard)
    @Query(_type => Concept)
    getConceptByName(@Args('name') name: string) {
        return this.conceptService.findByName(name);
    }

    @UseGuards(GQLAuthGuard)
    @Mutation(_type => Concept)
    createConcept(@Args('concept') concept: ConceptInput) {
        return this.conceptService.createConcept(concept)
    }

    @UseGuards(GQLAuthGuard)
    @Mutation(_type => Concept)
    updateConcept(@Args('update') concept: ConceptInput) {
        return this.conceptService.updateConcept(concept)
    }
    
    @UseGuards(GQLAuthGuard)
    @Mutation(_type => Concept)
    deleteConcept(@Args('delete') concept: ConceptInput) {
        return this.conceptService.deleteConcept(concept)
    }

}