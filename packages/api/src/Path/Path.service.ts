import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

import { Path, EPath, PathInput } from './Path.entity';
// import { EPathUser, PathUser } from './PathUser.entity';

@Injectable()
export class PathService {
  constructor(
    @InjectRepository(Path)
    private readonly pathRepository: Repository<Path>
  ) {}

  async findAll(): Promise<EPath[]> {
    return this.pathRepository.find();
  }

  async create(pathInput: PathInput): Promise<EPath> {
    const path = new Path();
    path.id = uuid.v4();
    Object.assign(path, pathInput);
    return this.pathRepository.save(path);
  }

  // async createPathUser(userId: string, pathId: string): Promise<EPathUser> {
  //   try {
  //     const {id} = await PathUser.create({userId, pathId}).save();
  //     const pathUser = await PathUser.findOne({where: {id}})
  //     if(!pathUser) throw new Error('NOT FOUND');
  //     return pathUser;
  //   } catch(e) {
  //     throw new Error(e);
  //   }
  // }
}

