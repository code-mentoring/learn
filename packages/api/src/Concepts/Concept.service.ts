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
}