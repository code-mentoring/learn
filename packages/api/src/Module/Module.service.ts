import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EModule, Module, ModuleInput, UpdateModuleInput } from './Module.entity';
import { Path } from '../Path/Path.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(EModule) private readonly moduleRepository: Repository<EModule>,
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

    const newModule = new EModule();
    newModule.name = moduleInput.name;
    newModule.icon = moduleInput.icon;
    newModule.type = moduleInput.type;

    const path = await Path.findOne({ id: moduleInput.path });
    if (!path) throw new NotFoundException();
    newModule.path = path;

    let previous: EModule | undefined;
    if (moduleInput.previous) {
      previous = await EModule.findOne({ id: moduleInput.previous });
      if (!previous) throw new NotFoundException();
      newModule.previous = previous;
    }

    return newModule.save();
  }

  async update(
    updateInput: UpdateModuleInput
  ): Promise<Module> {

    const { path, previous } = updateInput;
    const module = await this.moduleRepository.findOne(updateInput.id, { relations: ['path', 'previous'] });
    if (!module) throw new NotFoundException('Module not found');
    Object.assign(module, updateInput);

    if (path) {
      const newPath = await this.pathRepository.findOne(path);
      if (!newPath) throw new NotFoundException('Path not found');
      module.path = newPath;
    }
    if (previous) {
      const newPrevious = await this.moduleRepository.findOne(previous);
      if (!newPrevious) throw new NotFoundException('Previous module not found');
      module.previous = newPrevious;
    }
    return this.moduleRepository.save(module);

  }

  async delete(
    moduleId: string
  ): Promise<Boolean> {
    const module = await this.moduleRepository.findOne(moduleId);
    if (!module) throw new NotFoundException('Module not found');
    try {
      await this.moduleRepository.delete(module);
      return true;
    } catch (e) {
      return false;
    }
  }

}
