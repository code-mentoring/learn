import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lesson } from './Lesson.entity';
import { LessonResolver } from './Lesson.resolver';
import { LessonService } from './Lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  providers: [LessonResolver, LessonService]
})
export class LessonModule {}
