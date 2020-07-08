import { Module } from '@nestjs/common';

import { CMS } from '../CMS/CMS';
import { LessonResolver } from './Lesson.resolver';
import { CMSModule } from '../CMS';

@Module({
  imports: [CMSModule],
  providers: [LessonResolver, CMS]
})
export class LessonModule {}
