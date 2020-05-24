import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lesson } from './Lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>
  ) {}

  async findByModule(moduleId: string): Promise<Lesson[]> {
    return this.lessonRepository.find({ where: { moduleId }, relations: ['module', 'module.path', 'module.previous'] });
  }

  async create(moduleId: string): Promise<Lesson> {
    return this.lessonRepository.create({ moduleId }).save();
  }

}
