import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

import { Path, EPath, PathInput } from './Path.entity';

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
}
