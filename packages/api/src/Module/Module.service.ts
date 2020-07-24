import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CMS } from '../CMS/CMS';
import { UserModule } from '../UserModule/UserModule.entity';
import { Module } from './Module.entity';


@Injectable()
export class ModuleService {
  constructor(
    private readonly cms: CMS,
    @InjectRepository(UserModule) private readonly userModuleRepository: Repository<UserModule>
  ) {}

  async findAll() {
    return this.cms.modules;
  }

  findByPathId(pathId: string): Module[] {
    return this.cms.findModulesByPathId(pathId);
  }

  async addUserToModule(
    userId: string,
    moduleId: string
  ): Promise<UserModule> {
    return this.userModuleRepository.create({ userId, moduleId }).save();
  }
}
