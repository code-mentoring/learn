import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concept, ConceptInput } from './Concept.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConceptService {
    constructor( @InjectRepository(Concept) private readonly conceptRepository: Repository<Concept> ) {}

    async findConcepts(): Promise<Concept[]> {
        return await this.conceptRepository.find();
    }

    async findByName(name: string): Promise<Concept> {
        const concept = await this.conceptRepository.findOne({ where: { name } });
        if(!concept) throw new NotFoundException('Concept not found');
        return concept;
    }

    async createConcept(conceptInput: ConceptInput): Promise<Concept> {
        return await this.conceptRepository.create(conceptInput).save();
    }

    async updateConcept(conceptInput: ConceptInput): Promise<Concept> {
        const { name, description } = conceptInput;
        const concept = await this.findByName(name);
        if(!concept) throw new NotFoundException(`Concept ${name} not found`);
        concept.description = description;
        await concept.save()
        return concept;
    }

    async deleteConcept(conceptInput: ConceptInput): Promise<void> {
        const { name } = conceptInput;
        const conceptDeleted = await this.conceptRepository.delete({name})
        if(!conceptDeleted.affected) throw new NotFoundException(`Concept ${name} not found`);

        console.log(conceptDeleted)

    }
}