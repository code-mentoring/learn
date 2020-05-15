import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Assignment, CreateAssignmentInput, UpdateAssignmentInput } from './Assignment.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment) private readonly assignmentRepository: Repository<Assignment>
  ) {}

  async findAll(): Promise<Assignment[]> {
    return this.assignmentRepository.find({ relations: ['module'] });
  }

  async create(assignmentInput: CreateAssignmentInput): Promise<Assignment> {
    return this.assignmentRepository.create(assignmentInput).save();
  }

  async findByModule(moduleId: string): Promise<Assignment[]> {
    return this.assignmentRepository.find({ where: { moduleId }, relations: ['module'] });
  }

  async update(
    updateInput: UpdateAssignmentInput
  ): Promise<Assignment | undefined> {
    await this.assignmentRepository.update({ id: updateInput.id }, updateInput);
    return this.assignmentRepository.findOne({ id: updateInput.id }, { relations: ['module'] });
  }

  async delete(assignmentId: string): Promise<boolean> {
    const { affected } = await this.assignmentRepository.delete({ id: assignmentId });
    if (affected && affected > 0) return true;
    return false;
  }
}
