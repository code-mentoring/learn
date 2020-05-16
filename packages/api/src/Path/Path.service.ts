import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PathUser } from '../PathUser/PathUser.entity';
import { Path, PathInput } from './Path.entity';
import { Character, CharacterCreateInput } from '../Character/Character.entity';

@Injectable()
export class PathService {
  constructor(
    @InjectRepository(Path) private readonly pathRepository: Repository<Path>,
    @InjectRepository(PathUser) private readonly pathUserRepository: Repository<PathUser>,
    @InjectRepository(Character) private readonly characterRepository: Repository<Character>
  ) {}

  async findAll(): Promise<Path[]> {
    return this.pathRepository.find({ relations: ['character'] });
  }

  async findByName(name: string): Promise<Path> {
    const path = await this.pathRepository.findOne({ where: { name }, relations: ['character'] });
    if (!path) throw new NotFoundException('Path not found');
    return path;
  }

  async create(pathInput: PathInput, characterInput: CharacterCreateInput): Promise<Path> {
    const character = await this.characterRepository.create(characterInput).save();
    return this.pathRepository.create({ ...pathInput, character }).save();
  }

  async addUserToPath(pathId: string, userId: string) {
    return this.pathUserRepository.create({ userId, pathId }).save();
  }
}
