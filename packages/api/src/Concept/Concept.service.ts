import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Concept, CreateConceptInput, UpdateConceptInput } from './Concept.entity';
import { UserConcept } from '../UserConcepts/UserConcept.entity';

@Injectable()
export class ConceptService {
  constructor(
    @InjectRepository(Concept) private readonly conceptRepository: Repository<Concept>,
    @InjectRepository(UserConcept) private readonly userConceptRepository: Repository<UserConcept>
  ) {}

  async findConcepts(): Promise<Concept[]> {
    return this.conceptRepository.find({ relations: ['taughtIn'] });
  }

  async findByName(name: string): Promise<Concept> {
    const concept = await this.conceptRepository.findOne({ where: { name }, relations: ['taughtIn'] });
    if (!concept) throw new NotFoundException('Concept not found');
    return concept;
  }

  async create(conceptInput: CreateConceptInput): Promise<Concept> {
    return this.conceptRepository.create(conceptInput).save();
  }

  async addUserConcept(conceptId: string, userId: string): Promise<UserConcept> {
    return this.userConceptRepository.create({ userId, conceptId, learned: new Date() }).save();
  }

  async update(updateInput: UpdateConceptInput): Promise<Concept | undefined> {
    await this.conceptRepository.update({ id: updateInput.id }, updateInput);
    return this.conceptRepository.findOne({ id: updateInput.id }, { relations: ['taughtIn'] });
  }

  async delete(conceptId: string): Promise<boolean> {
    const { affected } = await this.conceptRepository.delete({ id: conceptId });
    if (affected && affected > 0) return true;
    return false;
  }
}
