import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ConceptService } from './Concept.service';
import { Concept, ConceptInput } from './Concept.entity';

@Resolver('concept')
export class ConceptResolver {
    constructor(private readonly conceptService: ConceptService) { }


    @Query(_type => [Concept])
    getConcepts(){
        return this.conceptService.findConcepts();
    }

    @Query(_type => Concept)
    getConceptByName(@Args('name') name: string) {
        return this.conceptService.findByName(name);
    }

    @Mutation(_type => Concept)
    createConcept(@Args('concept') concept: ConceptInput) {
        return this.conceptService.createConcept(concept)
    }

}