import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GQLAuthGuard } from '../Auth/GQLAuth.guard';
import { CMS } from '../CMS/CMS';
import { Question, QuestionType } from './Question.entity';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly cms: CMS) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [Question])
  questions(
    @Args('pathName') pathName: string,
    @Args('moduleIndex') moduleIndex: number,
    @Args('type', { nullable: true }) type: QuestionType
  ) {
    const questions = <Question[]> this.cms.findQuestions(pathName, moduleIndex);

    if (type) {
      return questions.filter(q => q.type === type);
    }
    return questions;
  }
}
