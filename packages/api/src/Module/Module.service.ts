import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Module, ModuleInput, UpdateModuleInput } from './Module.entity';
import { Path } from '../Path/Path.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module) private readonly moduleRepository: Repository<Module>,
    @InjectRepository(Path) private readonly pathRepository: Repository<Path>
  ) {}

  async findAll(): Promise<Module[]> {
    return this.moduleRepository.find({ relations: ['previous', 'path'] });
  }

  async findByPath(pathId: string): Promise<Module[]> {
    const path = await this.pathRepository.findOne({ where: { id: pathId } });
    if (!path) throw new NotFoundException();
    return this.moduleRepository.find({ where: { path }, relations: ['previous', 'path'] });
  }

  async create(
    moduleInput: ModuleInput
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
    return Boolean(await this.moduleRepository.delete({ id: moduleId }));
  }
}
