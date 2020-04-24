import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PathUser, EPathUser } from './PathUser.entity';

@Injectable()
export class PathUserService {
  constructor(
    @InjectRepository(PathUser)
    private readonly pathUserRepository: Repository<PathUser>
  ) { }


  // async findAll(): Promise<PathUser[]> {
  //   return this.pathUserRepository.find();
  // }

  async create(userId: string, pathId: string): Promise<EPathUser> {
    try {
      const {id} = await this.pathUserRepository.create({userId, pathId}).save();
      const pathUser = await this.pathUserRepository.findOne({where: {id}})
      if(!pathUser) throw new Error('NOT FOUND');
      return pathUser;
    } catch(e) {
      throw new Error(e);
    }
  }
}
