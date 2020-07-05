import { Module } from '@nestjs/common';
import { CMS } from '../CMS/CMS';
import { QuestionResolver } from './Question.resolver';

@Module({
  imports: [CMS],
  providers: [CMS, QuestionResolver]
})
export class QuestionModule {}
