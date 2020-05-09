import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EModule, Module, ModuleInput } from './Module.entity';
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

}
