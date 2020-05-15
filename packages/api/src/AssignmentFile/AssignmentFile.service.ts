import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssignmentFile, CreateAssignmentFileInput, UpdateAssignmentFileInput } from './AssignmentFile.entity';

@Injectable()
export class AssignmentFileService {
  constructor(
    @InjectRepository(AssignmentFile)
      private readonly assignmentFileRepository: Repository<AssignmentFile>
  ) {}

  async findAll(): Promise<AssignmentFile[]> {
    return this.assignmentFileRepository.find({ relations: ['assignment', 'author'] });
  }

  async findByAssignment(assignmentId: string): Promise<AssignmentFile[]> {
    return this.assignmentFileRepository.find({ where: { assignmentId }, relations: ['assignment', 'author'] });
  }

  async findByUser(authorId: string): Promise<AssignmentFile[]> {
    return this.assignmentFileRepository.find({ where: { authorId }, relations: ['assignment', 'author'] });
  }

  async create(
    assignmentFileInput: CreateAssignmentFileInput
  ): Promise<AssignmentFile> {
    return this.assignmentFileRepository.create(assignmentFileInput).save();
  }

  async update(
    updateInput: UpdateAssignmentFileInput
  ): Promise<AssignmentFile | undefined> {
    await this.assignmentFileRepository.update({ id: updateInput.id }, updateInput);
    return this.assignmentFileRepository.findOne({ id: updateInput.id }, { relations: ['assignment', 'author'] });
  }

  async delete(assignmentFileId: string): Promise<boolean> {
    const { affected } = await this.assignmentFileRepository.delete({ id: assignmentFileId });
    if (affected && affected > 0) return true;
    return false;
  }
}
