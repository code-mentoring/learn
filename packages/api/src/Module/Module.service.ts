import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModule } from '../UserModule/UserModule.entity';
import { Module, CreateModuleInput, UpdateModuleInput } from './Module.entity';

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
    moduleInput: CreateModuleInput
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
    const { affected } = await this.moduleRepository.delete({ id: moduleId });
    if (affected && affected > 0) return true;
    return false;
  }
}
