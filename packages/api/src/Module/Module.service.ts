import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Module, CreateModuleInput, UpdateModuleInput } from './Module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module) private readonly moduleRepository: Repository<Module>
  ) {}

  async findAll(): Promise<Module[]> {
    return this.moduleRepository.find({ relations: ['previous', 'path'] });
  }

  async findByPath(pathId: string): Promise<Module[]> {
    return this.moduleRepository.find({ where: { pathId }, relations: ['previous', 'path'] });
  }

  async create(
    moduleInput: CreateModuleInput
  ): Promise<Module> {
    return this.moduleRepository.create(moduleInput).save();
  }

  async update(
    updateInput: UpdateModuleInput
  ): Promise<Module | undefined> {
    await this.moduleRepository.update({ id: updateInput.id }, updateInput);
    return this.moduleRepository.findOne({ id: updateInput.id }, { relations: ['previous', 'path'] });
  }

  async delete(
    moduleId: string
  ): Promise<Boolean> {
    const { affected } = await this.moduleRepository.delete({ id: moduleId });
    if (affected && affected > 0) return true;
    return false;
  }
}
