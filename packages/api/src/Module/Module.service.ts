import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Module, ModuleInput, UpdateModuleInput } from './Module.entity';
import { UserModule } from '../UserModule/UserModule.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module) private readonly moduleRepository: Repository<Module>,
    @InjectRepository(UserModule) private readonly userModuleRepository: Repository<UserModule>
  ) {}

  async findAll(): Promise<Module[]> {
    return this.moduleRepository.find({ relations: ['previous', 'path'] });
  }

  async findByPath(pathId: string): Promise<Module[]> {
    return this.moduleRepository.find({ where: { pathId }, relations: ['previous', 'path'] });
  }

  async create(
    moduleInput: ModuleInput
  ): Promise<Module> {
    return this.moduleRepository.create(moduleInput).save();
  }

  async addUserToModule(
    userId: string,
    moduleId: string
  ): Promise<UserModule> {
    return this.userModuleRepository.create({ userId, moduleId }).save();
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
