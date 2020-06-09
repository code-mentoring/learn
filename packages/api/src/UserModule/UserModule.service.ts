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
}
