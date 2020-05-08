import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Assignment, AssignmentInput } from './Assignment.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment) private readonly assignmentRepository: Repository<Assignment>
  ) {}

  async findAll(): Promise<Assignment[]> {
    return this.assignmentRepository.find();
  }

  async create(assignmentInput: AssignmentInput): Promise<Assignment> {
    return this.assignmentRepository.create(assignmentInput).save();
  }
}
