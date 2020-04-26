import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PathUser } from '../PathUser/PathUser.entity';
import { Path, PathInput } from './Path.entity';

@Injectable()
export class PathService {
  constructor(
    @InjectRepository(Path) private readonly pathRepository: Repository<Path>,
    @InjectRepository(PathUser) private readonly pathUserRepository: Repository<PathUser>
  ) {}

  async findAll(): Promise<Path[]> {
    return this.pathRepository.find();
  }

  async findByName(name: string): Promise<Path> {
    const path = await this.pathRepository.findOne({ where: { name } });
    if (!path) throw new NotFoundException('Path not found');
    return path;
  }

  async create(pathInput: PathInput): Promise<Path> {
    return this.pathRepository.create(pathInput).save();
  }

  async addUserToPath(pathId: string, userId: string) {
    return this.pathUserRepository.create({ userId, pathId }).save();
  }
}
