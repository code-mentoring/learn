import { Module } from '@nestjs/common';
import { CMS } from '../CMS/CMS';
import { QuestionResolver } from './Question.resolver';
import { CMSModule } from '../CMS';

@Module({
  imports: [CMSModule],
  providers: [QuestionResolver, CMS]
})
export class QuestionModule {}
