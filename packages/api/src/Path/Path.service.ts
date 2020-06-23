import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PathUser } from '../PathUser/PathUser.entity';
import { Path, PathInput, UpdatePathInput } from './Path.entity';

@Injectable()
export class PathService {
  constructor(
    @InjectRepository(Path) private readonly pathRepository: Repository<Path>,
    @InjectRepository(PathUser) private readonly pathUserRepository: Repository<PathUser>
  ) {}

  async findAll(): Promise<Path[]> {
    return this.pathRepository.find({ relations: ['character'] });
  }

  async findById(id: string): Promise<Path> {
    const path = await this.pathRepository.findOne({ where: { id }, relations: ['character'] });
    if (!path) throw new NotFoundException('Path not found');
    return path;
  }

  async findByName(name: string): Promise<Path> {
    const path = await this.pathRepository.findOne({ where: { name }, relations: ['character'] });
    if (!path) throw new NotFoundException('Path not found');
    return path;
  }

  async findByUser(userId: string): Promise<PathUser[]> {
    const userPaths = await this.pathUserRepository.find({
      relations: ['path'],
      where: { userId }
    });
    return userPaths;
  }

  async create(pathInput: PathInput): Promise<Path> {
    return this.pathRepository.create(pathInput).save();
  }

  async addUserToPath(userId: string, paths?: string | string[]) {

    if (Array.isArray(paths)) {
      return Promise.all(paths.map(async path => {
        await this.pathUserRepository.create({ userId, pathId: path }).save();
      }));
    }
    return this.pathUserRepository.create({ userId, pathId: paths }).save();

  }

  async update(pathInput: UpdatePathInput): Promise<Path | undefined> {
    const { affected } = await this.pathRepository.update({ id: pathInput.id }, pathInput);
    if (affected && (affected === 1)) return this.pathRepository.findOne(pathInput.id);
    throw new NotFoundException('Path not found');
  }
}
