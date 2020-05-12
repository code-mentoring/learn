import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssignmentFile, AssignmentFileInput, UpdateAssignmentFileInput } from './AssignmentFile.entity';

@Injectable()
export class AssignmentFileService {
  constructor(
    @InjectRepository(AssignmentFile)
      private readonly assignmentFileRepository: Repository<AssignmentFile>
  ) {}

  async findAll(): Promise<AssignmentFile[]> {
    return this.assignmentFileRepository.find();
  }

  async findByName(name: string): Promise<AssignmentFile> {
    const assignmentFile = await this.assignmentFileRepository
      .findOne({ where: { name } });
    if (!assignmentFile) throw new NotFoundException('Assignment File not found');
    return assignmentFile;
  }

  async create(
    assignmentFileInput: AssignmentFileInput
  ): Promise<AssignmentFile> {
    return this.assignmentFileRepository.create(assignmentFileInput).save();
  }

  async update(
    updateInput: UpdateAssignmentFileInput
  ): Promise<AssignmentFile | undefined> {
    await this.assignmentFileRepository.update({ id: updateInput.id }, updateInput);
    return this.assignmentFileRepository.findOne({ id: updateInput.id }, { relations: ['assignment', 'author'] });
  }

  async delete(
    assignmentFileId: string
  ): Promise<Boolean> {
    return Boolean(await this.assignmentFileRepository.delete({ id: assignmentFileId }));
  }
}
