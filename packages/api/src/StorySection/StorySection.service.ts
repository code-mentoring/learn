import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStorySectionInput, StorySection } from './StorySection.entity';

@Injectable()
export class StorySectionService {
  constructor(
    @InjectRepository(StorySection)
    private readonly storySectionRepository: Repository<StorySection>
  ) {}

  async findByLesson(lessonId: string): Promise<StorySection[]> {
    return this.storySectionRepository.find({ where: { lessonId }, relations: ['lesson', 'concept'] });
  }

  async create(storySectionInput: CreateStorySectionInput): Promise<StorySection> {
    return this.storySectionRepository.create(storySectionInput).save();
  }

}
