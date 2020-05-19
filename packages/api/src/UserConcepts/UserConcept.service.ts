import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserConcept } from './UserConcept.entity';

@Injectable()
export class UserConceptService {
  constructor(
    @InjectRepository(UserConcept) private readonly userConceptRepository: Repository<UserConcept>
  ) {}

  async findByUser(userId: string): Promise<UserConcept[]> {
    return this.userConceptRepository.find({ where: { userId }, relations: ['user', 'concept', 'concept.taughtIn'] });
  }

}
