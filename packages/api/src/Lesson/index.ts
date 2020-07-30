import { Module } from '@nestjs/common';
import { CMSModule } from '../CMS';
import { CMS } from '../CMS/CMS';
import { LessonResolver } from './Lesson.resolver';
import { UserModuleModule } from '../UserModule';


@Module({
  imports: [CMSModule, UserModuleModule],
  providers: [LessonResolver, CMS]
})
export class LessonModule {}
