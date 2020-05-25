import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lesson } from './Lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>
  ) {}

  async findById(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.module', 'module')
      .leftJoinAndSelect('module.path', 'path')
      .leftJoinAndSelect('path.character', 'character')
      .leftJoinAndSelect('module.previous', 'previous')
      .leftJoinAndSelect('lesson.storySection', 'storySection')
      .leftJoinAndSelect('storySection.teaches', 'teaches')
      .where('lesson.id = :id', { id })
      .orderBy('storySection.order', 'ASC')
      .getOne();

    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async findByModule(moduleId: string): Promise<Lesson[]> {
    return this.lessonRepository.find({ where: { moduleId }, relations: ['module', 'module.path', 'module.previous'] });
  }

  async create(moduleId: string): Promise<Lesson> {
    return this.lessonRepository.create({ moduleId }).save();
  }

}
