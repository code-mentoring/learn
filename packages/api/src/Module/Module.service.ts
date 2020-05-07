import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EModule, ModuleInput, Module } from './Module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(EModule) private readonly moduleRepository: Repository<EModule>
  ) {}

  async findAll(): Promise<Module[]> {
    return this.moduleRepository.find();
  }

  async create(module: ModuleInput, pathId: string, previousId?: string): Promise<Module> {
    return this.moduleRepository.create({ ...module, pathId, previousId }).save();
  }

}
