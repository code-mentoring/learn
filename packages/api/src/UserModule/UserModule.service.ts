import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModule } from './UserModule.entity';

@Injectable()
export class UserModuleService {
  constructor(
    @InjectRepository(UserModule) private readonly userModuleRepository: Repository<UserModule>
  ) { }

  async findByUser(userId: string): Promise<UserModule[]> {
    const userModules = await this.userModuleRepository.find({
      where: { userId },
      relations: ['path']
    });
    if (!userModules) throw new NotFoundException('UserModule not found');
    return userModules;
  }

  async countCompleted(userId: string, pathId: string): Promise<number> {
    return this.userModuleRepository.count({
      where: { userId, path: { id: pathId } }
    });
  }

  async findOne(userId: string, moduleId: string) {
    return this.userModuleRepository.findOne({
      where: { userId, moduleId },
      relations: ['user']
    });
  }

  async create(
    userId: string,
    moduleId: string
  ) {
    return this.userModuleRepository.create({ userId, moduleId }).save();
  }

}
