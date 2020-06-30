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
  ) { }

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

  /**
   * Return a list of paths user has or has not joined
   * @param userId User's ID
   * @param notJoined Filter for paths user has NOT joined yet
   */
  async findByUser(
    userId: string,
    notJoined: boolean = false
  ): Promise<Path[]> {
    const qb = this.pathRepository.createQueryBuilder('path');

    // Return paths that the user has not joined yet
    if (notJoined) {
      return qb
        .where(`path.id NOT IN ${
          qb.subQuery()
            .select('pu.pathId').from(PathUser, 'pu')
            .where('pu."userId" = :userId', { userId })
            .getQuery()
        }`)
        .getMany();
    }

    // Otherwise return paths user belongs to
    return qb
      .leftJoin(PathUser, 'pu', 'pu."pathId" = path."id"')
      .where('pu."userId" = :userId', { userId })
      .getMany();
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
