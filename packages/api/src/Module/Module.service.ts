import { Injectable } from '@nestjs/common';
import { CMS } from '../CMS/CMS';
import { Module } from './Module.entity';


@Injectable()
export class ModuleService {
  constructor(private readonly cms: CMS) {}

  async findAll() {
    return this.cms.modules;
  }

  findByPathId(pathId: string): Module[] {
    return this.cms.findModulesByPathId(pathId);
  }
}
