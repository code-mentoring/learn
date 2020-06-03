import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PathUser } from './PathUser.entity';
import { Path } from '../Path/Path.entity';

@Injectable()
export class PathUserService {
  constructor(
    @InjectRepository(Path) private readonly pathRepository: Repository<Path>,
    @InjectRepository(PathUser) private readonly pathUserRepository: Repository<PathUser>
  ) {}

  async updatePathUserProgress(
    userId: string,
    pathId: string,
    numCompletedModule: number
  ): Promise<PathUser | undefined> {
    const path = await this.pathRepository.findOne(
      { where: { id: pathId },
        relations: ['modules'] }
    );
    if (!path) { throw new NotFoundException('Path not found'); }

    let progress = 0;
    const numPathModule = path.modules.length;

    if (numPathModule !== 0) {
      progress = Math.floor((numCompletedModule / numPathModule) * 100);
    }

    const completed = progress === 100;

    const { affected } = await this.pathUserRepository.update(
      { userId, pathId },
      { progress, completed }
    );
    if (affected && (affected === 1)) return this.pathUserRepository.findOne({ userId, pathId });
    throw new NotFoundException('PathUser not found');
  }
}
