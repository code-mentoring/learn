import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserModule } from './UserModule.entity';

@Injectable()
export class UserModuleService {
  constructor(
    @InjectRepository(UserModule) private readonly userModuleRepository: Repository<UserModule>
  ) {}

  async findByUser(userId: string): Promise<UserModule[]> {
    const userModules = await this.userModuleRepository.find({
      where: { userId },
      relations: ['module']
    });
    if (!userModules) throw new NotFoundException('UserModule not found');
    return userModules;
  }

  async update(
    userId: string,
    moduleId: string,
    completedAt: Date
  ): Promise<UserModule | undefined> {
    const { affected } = await this.userModuleRepository.update(
      { userId, moduleId }, { completedAt }
    );
    if (affected && (affected === 1)) {
      return this.userModuleRepository.findOne({
        where: { userId, moduleId },
        relations: ['module'] });
    }
    throw new NotFoundException('UserModule not found');
  }
}
