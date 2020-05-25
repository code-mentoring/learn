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
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: [
        'module',
        'module.path',
        'module.path.character',
        'module.previous',
        'storySection',
        'storySection.teaches'
      ]
    });

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
