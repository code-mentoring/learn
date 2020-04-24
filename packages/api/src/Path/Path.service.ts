import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PathUser } from '../PathUser/PathUser.entity';
import { EPath, Path, PathInput } from './Path.entity';

@Injectable()
export class PathService {
  constructor(
    @InjectRepository(Path) private readonly pathRepository: Repository<Path>,
    @InjectRepository(PathUser) private readonly pathUserRepository: Repository<PathUser>
  ) {}

  async findAll(): Promise<EPath[]> {
    return this.pathRepository.find();
  }

  async create(pathInput: PathInput): Promise<EPath> {
    const path = new Path();
    Object.assign(path, pathInput);
    return this.pathRepository.save(path);
  }

  async addUserToPath(pathId: string, userId: string) {
    return this.pathUserRepository.create({ userId, pathId }).save();
    // const path = await this.pathRepository.findOneOrFail({ where: { id: pathId }, relations: ['users'] });
    // const user = await this.userRepository.findOneOrFail({ where: { id: userId } });
    // path.users.push(user);
    // return this.pathRepository.save(path);
  }
}
